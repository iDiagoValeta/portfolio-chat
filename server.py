#!/usr/bin/env python3
"""
Servidor proxy para la API de DeepSeek
Evita problemas de CORS y mantiene la API key segura en el servidor
"""

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import json
import socket
import urllib.error
import urllib.request
import os
import re
import threading
from pathlib import Path
import time
from collections import defaultdict, deque
from datetime import datetime, timezone

# Cargar variables desde un archivo .env local si existe (sin dependencias externas)
def load_dotenv():
    env_path = Path(__file__).parent / '.env'
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, _, value = line.partition('=')
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

# Obtener la API key desde una variable de entorno
def get_api_key():
    """Lee la API key desde una variable de entorno"""
    api_key = os.environ.get('DEEPSEEK_API_KEY')
    if not api_key:
        print("Error: La variable de entorno DEEPSEEK_API_KEY no está configurada.")
    return api_key

load_dotenv()
API_KEY = get_api_key()
DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"

# Configuración de seguridad
REQUEST_TIMEOUT = 30  # segundos
MAX_REQUEST_SIZE = 100000  # 100KB

# Límites del chat. Protegen el saldo de la API: el tope global aguanta aunque
# alguien rote IPs. Viven en memoria, así que un reinicio de Render los pone a cero.
IP_LIMIT_PER_MINUTE = 6
IP_LIMIT_PER_DAY = 40
GLOBAL_LIMIT_PER_DAY = 600

# El servidor fija el modelo y los parámetros: el cliente solo aporta la conversación,
# para que el proxy no sirva de acceso libre a la API con cualquier modelo o prompt.
MODEL = 'deepseek-v4-flash'
MAX_MESSAGES = 20
MAX_USER_CHARS = 2000  # las respuestas del asistente solo las acota MAX_REQUEST_SIZE

def load_system_prompt():
    """Lee PORTFOLIO_INFO de config.js, que sigue siendo la única fuente del contexto."""
    source = (Path(__file__).parent / 'config.js').read_text(encoding='utf-8')
    match = re.search(r'PORTFOLIO_INFO\s*=\s*`(.*?)`', source, re.S)
    if not match:
        raise RuntimeError('PORTFOLIO_INFO no encontrado en config.js')
    return match.group(1)

SYSTEM_PROMPT = load_system_prompt()

rate_lock = threading.Lock()
ip_requests = defaultdict(deque)  # {ip: deque[timestamp]} de las últimas 24 h
global_day = {'date': None, 'count': 0}

def check_rate_limit(client_ip):
    """Devuelve los segundos a esperar si se supera algún límite, o None si se admite."""
    now = time.time()
    today = datetime.now(timezone.utc).date()
    with rate_lock:
        if global_day['date'] != today:
            global_day['date'] = today
            global_day['count'] = 0
            # Una vez al día, olvidar IPs sin actividad reciente
            for ip in [ip for ip, q in ip_requests.items() if not q or now - q[-1] > 86400]:
                del ip_requests[ip]
        if global_day['count'] >= GLOBAL_LIMIT_PER_DAY:
            tomorrow = datetime.combine(today, datetime.min.time(), timezone.utc).timestamp() + 86400
            return int(tomorrow - now) + 1

        q = ip_requests[client_ip]
        while q and now - q[0] >= 86400:
            q.popleft()
        if len(q) >= IP_LIMIT_PER_DAY:
            return int(q[0] + 86400 - now) + 1
        last_minute = [ts for ts in q if now - ts < 60]
        if len(last_minute) >= IP_LIMIT_PER_MINUTE:
            return int(last_minute[0] + 60 - now) + 1

        q.append(now)
        global_day['count'] += 1
        return None

def build_upstream_request(request_data):
    """Construye la petición a DeepSeek con la conversación validada del cliente."""
    messages = request_data.get('messages')
    if not isinstance(messages, list) or not messages:
        raise ValueError('Falta la conversación')
    clean = []
    for msg in messages[-MAX_MESSAGES:]:
        if not isinstance(msg, dict) or msg.get('role') not in ('user', 'assistant'):
            raise ValueError('Mensaje con formato no válido')
        content = msg.get('content')
        if not isinstance(content, str) or not content.strip():
            raise ValueError('Mensaje vacío')
        if msg['role'] == 'user' and len(content) > MAX_USER_CHARS:
            raise ValueError('Mensaje demasiado largo')
        clean.append({'role': msg['role'], 'content': content})
    if clean[-1]['role'] != 'user':
        raise ValueError('El último mensaje debe ser del usuario')
    return {
        'model': MODEL,
        'messages': [{'role': 'system', 'content': SYSTEM_PROMPT}, *clean],
        'temperature': 0.7,
        'max_tokens': 8192,
        'reasoning_effort': 'low',
        'stream': True,
    }

class CORSRequestHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=Path(__file__).parent, **kwargs)
    
    def normalize_path(self, path):
        """Normaliza la ruta eliminando prefijos de subdirectorio duplicados"""
        # Eliminar el prefijo /portfolio-chat/ si existe
        if path.startswith('/portfolio-chat/'):
            path = path[len('/portfolio-chat'):]
        # Asegurar que empiece con /
        if not path.startswith('/'):
            path = '/' + path
        return path
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        path = (self.path or '').split('?', 1)[0]
        if path.endswith(('.js', '.css', '.html')):
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # Normalizar la ruta
        original_path = self.path
        self.path = self.normalize_path(self.path)
        
        # Si es la ruta raíz, servir index.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        
        try:
            super().do_GET()
        except Exception as e:
            # Si falla, restaurar el path original y reintentar
            self.path = original_path
            super().do_GET()

    def do_POST(self):
        # Normalizar la ruta
        self.path = self.normalize_path(self.path)
        
        # Manejar ambas rutas posibles de la API
        if self.path == '/api/gemini' or self.path == '/portfolio-chat/api/gemini':
            self.handle_gemini_request()
        else:
            super().do_POST()

    def send_json_error(self, status, message, retry_after=None):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        if retry_after is not None:
            self.send_header('Retry-After', str(retry_after))
        self.end_headers()
        self.wfile.write(json.dumps({"error": {"message": message, "code": status}}).encode('utf-8'))

    def client_ip(self):
        """IP real del visitante. En Render, Cloudflare la pone en True-Client-IP;
        X-Forwarded-For solo como respaldo porque el cliente puede falsificarla."""
        for header in ('True-Client-IP', 'CF-Connecting-IP'):
            value = (self.headers.get(header) or '').strip()
            if value:
                return value
        forwarded = (self.headers.get('X-Forwarded-For') or '').split(',')[0].strip()
        return forwarded or self.client_address[0]

    def handle_gemini_request(self):
        if not API_KEY:
            self.send_json_error(500, "API Key no configurada")
            return

        client_ip = self.client_ip()

        try:
            content_length = int(self.headers.get('Content-Length', 0))
        except ValueError:
            content_length = 0
        if content_length > MAX_REQUEST_SIZE:
            self.send_json_error(413, f"Request demasiado grande. Máximo: {MAX_REQUEST_SIZE} bytes")
            return
        if content_length <= 0:
            self.send_json_error(400, "Request body vacío")
            return

        try:
            request_data = json.loads(self.rfile.read(content_length).decode('utf-8'))
            if not isinstance(request_data, dict):
                raise ValueError('Se esperaba un objeto JSON')
            upstream_body = build_upstream_request(request_data)
        except (ValueError, UnicodeDecodeError) as e:
            self.send_json_error(400, f"Petición no válida: {e}")
            return

        retry_after = check_rate_limit(client_ip)
        if retry_after is not None:
            self.send_json_error(429, "Demasiadas solicitudes. Por favor, intenta más tarde.", retry_after)
            return

        req = urllib.request.Request(DEEPSEEK_API_URL, data=json.dumps(upstream_body).encode('utf-8'))
        req.add_header('Content-Type', 'application/json')
        req.add_header('Authorization', f'Bearer {API_KEY}')

        try:
            with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as response:
                # Pass-through del SSE: reenviar los chunks al cliente conforme llegan
                self.send_response(200)
                self.send_header('Content-Type', 'text/event-stream')
                self.send_header('Cache-Control', 'no-cache')
                self.send_header('X-Accel-Buffering', 'no')
                self.end_headers()
                while True:
                    chunk = response.read1(1024)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    self.wfile.flush()
        except urllib.error.HTTPError as e:
            # No reenviar el cuerpo de DeepSeek: puede describir la cuenta o la clave
            print(f"[ERROR] {datetime.now().isoformat()} - IP: {client_ip} - DeepSeek HTTP {e.code}")
            self.send_json_error(502, "El servicio de IA no está disponible ahora mismo")
        except urllib.error.URLError as e:
            print(f"[ERROR] {datetime.now().isoformat()} - IP: {client_ip} - {e}")
            self.send_json_error(504, "No se pudo conectar con la API de DeepSeek")
        except (BrokenPipeError, ConnectionResetError):
            pass  # El visitante cerró la pestaña a mitad de respuesta
        except Exception as e:
            print(f"[ERROR] {datetime.now().isoformat()} - IP: {client_ip} - {e}")
            self.send_json_error(500, "Error interno del servidor")

    def log_message(self, format, *args):
        # Personalizar los logs - evitar errores cuando args[0] no es una cadena
        try:
            if args and len(args) > 0:
                # Convertir el primer argumento a cadena si es necesario
                first_arg = str(args[0]) if args[0] is not None else ''
                if '/api/gemini' not in first_arg:
                    super().log_message(format, *args)
            else:
                super().log_message(format, *args)
        except Exception:
            # Si hay algún error, simplemente no loguear
            pass


class DualStackHTTPServer(ThreadingHTTPServer):
    """Escucha en :: con IPv4 mapeado; evita ERR_CONNECTION_REFUSED con localhost→::1."""

    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


def run_server(port=None):
    if port is None:
        port = int(os.environ.get('PORT', 8000))

    try:
        httpd = DualStackHTTPServer(("::", port), CORSRequestHandler)
    except OSError:
        httpd = ThreadingHTTPServer(("0.0.0.0", port), CORSRequestHandler)
        print(
            f"Aviso: solo IPv4 en el puerto {port}. "
            f"Si el navegador muestra conexión rechazada con localhost, prueba http://127.0.0.1:{port}/"
        )

    print(f"Servidor iniciado en puerto {port}")
    print(f"  http://127.0.0.1:{port}/  |  http://localhost:{port}/")
    print(f"API Key configurada: {'Sí' if API_KEY else 'No'}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nDeteniendo el servidor...")
        httpd.shutdown()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    run_server(port)

