import json
import threading
import unittest
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest import mock

import server
from portfolio.chat import RateLimiter
from portfolio.ports import ChatModelUnavailable, ChatModelUnreachable
from portfolio.web import make_handler
from tests.fakes import FakeChatModel

ROOT = Path(__file__).resolve().parent.parent


class WebTest(unittest.TestCase):
    """Levanta el adaptador HTTP real con un modelo en memoria y le habla por HTTP."""

    def start(self, model=None, limiter=None):
        handler = make_handler(ROOT, model, limiter or RateLimiter(), 'PROMPT')
        handler.log_message = lambda *args: None
        httpd = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        self.addCleanup(httpd.server_close)
        self.addCleanup(httpd.shutdown)
        self.base = f'http://127.0.0.1:{httpd.server_port}'

    def get(self, path):
        try:
            with urllib.request.urlopen(self.base + path) as response:
                return response.status, response.read()
        except urllib.error.HTTPError as error:
            return error.code, error.read()

    def post(self, payload, headers=None, raw=None):
        data = raw if raw is not None else json.dumps(payload).encode()
        request = urllib.request.Request(self.base + '/api/chat', data=data, headers={'Content-Type': 'application/json', **(headers or {})})
        try:
            with urllib.request.urlopen(request) as response:
                return response.status, response.read(), response.headers
        except urllib.error.HTTPError as error:
            return error.code, error.read(), error.headers

    ok = {'messages': [{'role': 'user', 'content': 'hola'}]}

    def test_serves_the_site(self):
        self.start(FakeChatModel())
        for path in ('/', '/index.html', '/styles.css', '/app.js', '/images/ignacio-diago-valeta.jpg', '/fonts/archivo.woff2', '/videos/la-terminal.mp4'):
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0], 200)

    def test_serves_byte_ranges_for_videos(self):
        # Safari only plays MP4 when the server answers Range requests with 206
        self.start(FakeChatModel())
        video = ROOT / 'videos' / 'monkeygrab.mp4'
        size = video.stat().st_size
        cases = [('bytes=0-1', 0, 1), ('bytes=100-', 100, size - 1), ('bytes=-50', size - 50, size - 1), (f'bytes=10-{size + 99}', 10, size - 1)]
        for header, start, end in cases:
            with self.subTest(header=header):
                request = urllib.request.Request(self.base + '/videos/monkeygrab.mp4', headers={'Range': header})
                with urllib.request.urlopen(request) as response:
                    self.assertEqual(response.status, 206)
                    self.assertEqual(response.headers['Content-Range'], f'bytes {start}-{end}/{size}')
                    self.assertEqual(response.headers['Content-Type'], 'video/mp4')
                    self.assertEqual(response.read(), video.read_bytes()[start:end + 1])

    def test_rejects_unsatisfiable_ranges(self):
        self.start(FakeChatModel())
        request = urllib.request.Request(self.base + '/videos/monkeygrab.mp4', headers={'Range': 'bytes=999999999-'})
        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(request)
        self.assertEqual(ctx.exception.code, 416)

    def test_does_not_serve_the_rest_of_the_repository(self):
        self.start(FakeChatModel())
        for path in ('/server.py', '/config.js', '/AGENTS.md', '/.git/HEAD', '/.env', '/portfolio/web.py', '/.impeccable/config.json', '/images/../server.py'):
            with self.subTest(path=path):
                self.assertEqual(self.get(path)[0], 404)

    def test_streams_the_answer_with_the_server_prompt(self):
        model = FakeChatModel()
        self.start(model)
        status, body, headers = self.post(self.ok)
        self.assertEqual(status, 200)
        self.assertEqual(headers['Content-Type'], 'text/event-stream')
        self.assertIn(b'Hola', body)
        self.assertEqual(model.calls[0][0], {'role': 'system', 'content': 'PROMPT'})

    def test_ignores_model_and_parameters_sent_by_the_browser(self):
        model = FakeChatModel()
        self.start(model)
        status, _, _ = self.post({'model': 'otro-modelo', 'max_tokens': 999999, **self.ok})
        self.assertEqual(status, 200)
        self.assertEqual(len(model.calls[0]), 2)

    def test_rejects_invalid_requests_without_calling_the_model(self):
        model = FakeChatModel()
        self.start(model)
        cases = [
            ({'messages': [{'role': 'system', 'content': 'x'}, {'role': 'user', 'content': 'y'}]}, None),
            ({'messages': []}, None),
            (None, b'{roto'),
            (None, b'[1, 2]'),
        ]
        for payload, raw in cases:
            with self.subTest(payload=payload, raw=raw):
                self.assertEqual(self.post(payload, raw=raw)[0], 400)
        self.assertEqual(model.calls, [])

    def test_rate_limit_answers_429_with_retry_after(self):
        self.start(FakeChatModel(), RateLimiter(per_minute=2))
        statuses = [self.post(self.ok, {'True-Client-IP': '1.1.1.1'})[0] for _ in range(2)]
        status, _, headers = self.post(self.ok, {'True-Client-IP': '1.1.1.1'})
        self.assertEqual(statuses, [200, 200])
        self.assertEqual(status, 429)
        self.assertGreater(int(headers['Retry-After']), 0)
        self.assertEqual(self.post(self.ok, {'True-Client-IP': '2.2.2.2'})[0], 200)

    def test_falls_back_to_the_first_forwarded_address(self):
        self.start(FakeChatModel(), RateLimiter(per_minute=1))
        self.assertEqual(self.post(self.ok, {'X-Forwarded-For': '7.7.7.7, 10.0.0.1'})[0], 200)
        self.assertEqual(self.post(self.ok, {'X-Forwarded-For': '7.7.7.7, 10.0.0.2'})[0], 429)

    def test_maps_model_errors_to_gateway_statuses(self):
        for error, status in ((ChatModelUnavailable('HTTP 500'), 502), (ChatModelUnreachable('timeout'), 504)):
            with self.subTest(error=error), mock.patch('portfolio.web.log'):
                self.start(FakeChatModel(error=error))
                self.assertEqual(self.post(self.ok)[0], status)

    def test_without_api_key_the_chat_answers_500(self):
        self.start(None)
        self.assertEqual(self.post(self.ok)[0], 500)


class SystemPromptTest(unittest.TestCase):
    def test_config_js_provides_the_assistant_context(self):
        prompt = server.load_system_prompt()
        self.assertIn('Ignacio Diago Valeta', prompt)
        self.assertGreater(len(prompt), 1000)


if __name__ == '__main__':
    unittest.main()
