"""Adaptador HTTP: sirve la web y expone el chat en POST /api/chat."""

from __future__ import annotations

import json
import socket
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

from portfolio.chat import InvalidConversation, RateLimiter, build_conversation
from portfolio.ports import ChatModel, ChatModelUnavailable, ChatModelUnreachable

MAX_BODY = 100_000  # 100 KB

# Solo se sirve lo que forma parte de la web. El resto del repositorio (código, documentación,
# .git, configuración de agentes) no es público aunque esté en la misma carpeta.
PUBLIC_FILES = {'/index.html', '/styles.css', '/app.js', '/favicon.svg', '/resume.pdf', '/robots.txt', '/sitemap.txt'}
PUBLIC_DIRS = ('/fonts/', '/images/')


def is_public(path: str) -> bool:
    if '..' in path or '/.' in path:
        return False
    return path in PUBLIC_FILES or path.startswith(PUBLIC_DIRS)


def make_handler(root: Path, chat_model: ChatModel | None, limiter: RateLimiter, system_prompt: str):
    """Construye la clase de handler con sus dependencias ya resueltas."""

    class PortfolioHandler(SimpleHTTPRequestHandler):
        extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.woff2': 'font/woff2'}

        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(root), **kwargs)

        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            if urlsplit(self.path or '').path.endswith(('.js', '.css', '.html')):
                self.send_header('Cache-Control', 'no-cache')
            super().end_headers()

        def do_OPTIONS(self):
            self.send_response(204)
            self.end_headers()

        def public_path(self) -> str | None:
            path = urlsplit(self.path).path
            if path == '/':
                path = '/index.html'
            return path if is_public(path) else None

        def do_GET(self):
            path = self.public_path()
            if path is None:
                self.send_error(404)
                return
            self.path = path
            super().do_GET()

        def do_HEAD(self):
            path = self.public_path()
            if path is None:
                self.send_error(404)
                return
            self.path = path
            super().do_HEAD()

        def do_POST(self):
            if urlsplit(self.path).path != '/api/chat':
                self.send_error(404)
                return
            self.handle_chat()

        def send_json_error(self, status, message, retry_after=None):
            self.send_response(status)
            self.send_header('Content-Type', 'application/json')
            if retry_after is not None:
                self.send_header('Retry-After', str(retry_after))
            self.end_headers()
            self.wfile.write(json.dumps({'error': {'message': message, 'code': status}}).encode('utf-8'))

        def visitor(self) -> str:
            """IP real del visitante. En Render, Cloudflare la pone en True-Client-IP;
            X-Forwarded-For solo como respaldo porque el cliente puede falsificarla."""
            for header in ('True-Client-IP', 'CF-Connecting-IP'):
                value = (self.headers.get(header) or '').strip()
                if value:
                    return value
            forwarded = (self.headers.get('X-Forwarded-For') or '').split(',')[0].strip()
            return forwarded or self.client_address[0]

        def handle_chat(self):
            if chat_model is None:
                self.send_json_error(500, 'API Key no configurada')
                return
            try:
                length = int(self.headers.get('Content-Length', 0))
            except ValueError:
                length = 0
            if length > MAX_BODY:
                self.send_json_error(413, f'Request demasiado grande. Máximo: {MAX_BODY} bytes')
                return
            if length <= 0:
                self.send_json_error(400, 'Request body vacío')
                return
            try:
                payload = json.loads(self.rfile.read(length).decode('utf-8'))
                if not isinstance(payload, dict):
                    raise InvalidConversation('Se esperaba un objeto JSON')
                messages = build_conversation(payload.get('messages'), system_prompt)
            except (ValueError, UnicodeDecodeError) as error:
                self.send_json_error(400, f'Petición no válida: {error}')
                return

            visitor = self.visitor()
            retry_after = limiter.check(visitor)
            if retry_after is not None:
                self.send_json_error(429, 'Demasiadas solicitudes. Por favor, intenta más tarde.', retry_after)
                return

            chunks = chat_model.stream(messages)
            try:
                first = next(chunks, b'')
            except ChatModelUnavailable as error:
                log(f'IP: {visitor} - {error}')
                self.send_json_error(502, 'El servicio de IA no está disponible ahora mismo')
                return
            except ChatModelUnreachable as error:
                log(f'IP: {visitor} - {error}')
                self.send_json_error(504, 'No se pudo conectar con el servicio de IA')
                return
            except Exception as error:  # noqa: BLE001 - cualquier fallo inesperado se responde como 500
                log(f'IP: {visitor} - {error}')
                self.send_json_error(500, 'Error interno del servidor')
                return

            # Pass-through del SSE: cada fragmento se reenvía en cuanto llega
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('X-Accel-Buffering', 'no')
            self.end_headers()
            try:
                for chunk in _chain(first, chunks):
                    self.wfile.write(chunk)
                    self.wfile.flush()
            except (BrokenPipeError, ConnectionResetError):
                pass  # El visitante cerró la pestaña a mitad de respuesta
            except Exception as error:  # noqa: BLE001 - un corte del proveedor a mitad de respuesta
                log(f'IP: {visitor} - stream cortado: {error}')

        def log_message(self, format, *args):
            # Las peticiones al chat no se registran: llevan la IP del visitante
            if args and '/api/chat' in str(args[0]):
                return
            super().log_message(format, *args)

    return PortfolioHandler


def _chain(first: bytes, rest):
    if first:
        yield first
    yield from rest


def log(message: str) -> None:
    print(f'[ERROR] {datetime.now().isoformat()} - {message}')


class DualStackHTTPServer(ThreadingHTTPServer):
    """Escucha en :: con IPv4 mapeado; evita ERR_CONNECTION_REFUSED con localhost resolviendo a ::1."""

    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


def serve(handler, port: int) -> None:
    try:
        httpd = DualStackHTTPServer(('::', port), handler)
    except OSError:
        httpd = ThreadingHTTPServer(('0.0.0.0', port), handler)
        print(f'Aviso: solo IPv4 en el puerto {port}. Si localhost no responde, prueba http://127.0.0.1:{port}/')
    print(f'Servidor iniciado en http://127.0.0.1:{port}/')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nDeteniendo el servidor...')
        httpd.shutdown()
