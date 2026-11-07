import json
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from portfolio.deepseek import DeepSeekChatModel
from portfolio.ports import ChatModelUnavailable, ChatModelUnreachable


class FakeDeepSeek(BaseHTTPRequestHandler):
    """API falsa: registra la petición y responde con un stream SSE o con un error."""

    received = []
    status = 200

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        FakeDeepSeek.received.append((body, self.headers['Authorization']))
        self.send_response(FakeDeepSeek.status)
        self.send_header('Content-Type', 'text/event-stream')
        self.end_headers()
        if FakeDeepSeek.status == 200:
            self.wfile.write(b'data: {"choices":[{"delta":{"content":"Hola"}}]}\n\ndata: [DONE]\n\n')

    def log_message(self, *args):
        pass


class DeepSeekChatModelTest(unittest.TestCase):
    def setUp(self):
        FakeDeepSeek.received = []
        FakeDeepSeek.status = 200
        self.httpd = ThreadingHTTPServer(('127.0.0.1', 0), FakeDeepSeek)
        threading.Thread(target=self.httpd.serve_forever, daemon=True).start()
        self.addCleanup(self.httpd.server_close)
        self.addCleanup(self.httpd.shutdown)
        self.url = f'http://127.0.0.1:{self.httpd.server_port}/'

    def test_sends_the_fixed_model_and_streams_the_answer(self):
        model = DeepSeekChatModel('test-key', url=self.url)
        messages = [{'role': 'system', 'content': 'P'}, {'role': 'user', 'content': 'hola'}]
        body = b''.join(model.stream(messages))
        sent, auth = FakeDeepSeek.received[0]
        self.assertIn(b'Hola', body)
        self.assertEqual(sent['model'], 'deepseek-v4-flash')
        self.assertTrue(sent['stream'])
        self.assertEqual(sent['messages'], messages)
        self.assertEqual(auth, 'Bearer test-key')

    def test_provider_errors_become_unavailable(self):
        FakeDeepSeek.status = 500
        with self.assertRaises(ChatModelUnavailable):
            next(DeepSeekChatModel('k', url=self.url).stream([]))

    def test_connection_errors_become_unreachable(self):
        with self.assertRaises(ChatModelUnreachable):
            next(DeepSeekChatModel('k', url='http://127.0.0.1:1/', timeout=2).stream([]))


if __name__ == '__main__':
    unittest.main()
