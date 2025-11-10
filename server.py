#!/usr/bin/env python3
"""
Servidor proxy para la API de Gemini
Evita problemas de CORS y mantiene la API key segura en el servidor
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import urllib.request
import urllib.parse
import os
from pathlib import Path
import time
from collections import defaultdict
from datetime import datetime

# Obtener la API key desde una variable de entorno
def get_api_key():
    """Lee la API key desde una variable de entorno"""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("Error: La variable de entorno GEMINI_API_KEY no está configurada.")
    return api_key

API_KEY = get_api_key()
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent"

# Configuración de seguridad
REQUEST_TIMEOUT = 30  # segundos
MAX_REQUEST_SIZE = 100000  # 100KB
RATE_LIMIT_REQUESTS = 60  # requests por ventana
RATE_LIMIT_WINDOW = 60  # segundos

# Rate limiting: {ip: [(timestamp1, timestamp2, ...)]}
rate_limit_store = defaultdict(list)

def is_rate_limited(client_ip):
    """Verifica si una IP ha excedido el límite de requests"""
    now = time.time()
    # Limpiar timestamps antiguos
    rate_limit_store[client_ip] = [
        ts for ts in rate_limit_store[client_ip]
        if now - ts < RATE_LIMIT_WINDOW
    ]
    
    # Verificar límite
    if len(rate_limit_store[client_ip]) >= RATE_LIMIT_REQUESTS:
        return True
    
    # Agregar timestamp actual
    rate_limit_store[client_ip].append(now)
    return False

class CORSRequestHandler(SimpleHTTPRequestHandler):
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

    def handle_gemini_request(self):
        if not API_KEY:
            self.send_error(500, "API Key no configurada")
            return

        # Obtener IP del cliente
        client_ip = self.client_address[0]
        
        # Verificar rate limiting
        if is_rate_limited(client_ip):
            self.send_response(429)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({
                "error": {
                    "message": "Demasiadas solicitudes. Por favor, intenta más tarde.",
                    "code": 429
                }
            })
            self.wfile.write(error_response.encode('utf-8'))
            return

        try:
            # Leer el cuerpo de la solicitud
            content_length = int(self.headers.get('Content-Length', 0))
            
            # Validar tamaño del request
            if content_length > MAX_REQUEST_SIZE:
                self.send_response(413)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({
                    "error": {
                        "message": f"Request demasiado grande. Máximo: {MAX_REQUEST_SIZE} bytes",
                        "code": 413
                    }
                })
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            if content_length == 0:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({
                    "error": {
                        "message": "Request body vacío",
                        "code": 400
                    }
                })
                self.wfile.write(error_response.encode('utf-8'))
                return
            
            post_data = self.rfile.read(content_length)
            
            # Validar JSON
            try:
                request_data = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({
                    "error": {
                        "message": f"JSON inválido: {str(e)}",
                        "code": 400
                    }
                })
                self.wfile.write(error_response.encode('utf-8'))
                return

            # Preparar la solicitud a Gemini con timeout
            url = f"{GEMINI_API_URL}?key={API_KEY}"
            req = urllib.request.Request(url, data=json.dumps(request_data).encode('utf-8'))
            req.add_header('Content-Type', 'application/json')

            # Realizar la solicitud con timeout
            try:
                with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as response:
                    response_data = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(response_data)
            except urllib.error.URLError as e:
                if 'timeout' in str(e).lower() or 'timed out' in str(e).lower():
                    self.send_response(504)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    error_response = json.dumps({
                        "error": {
                            "message": "Timeout al conectar con la API de Gemini",
                            "code": 504
                        }
                    })
                    self.wfile.write(error_response.encode('utf-8'))
                else:
                    raise

        except urllib.error.HTTPError as e:
            try:
                error_body = e.read().decode('utf-8')
            except:
                error_body = json.dumps({"error": {"message": str(e), "code": e.code}})
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(error_body.encode('utf-8'))
        except Exception as e:
            # Log del error (sin exponer detalles sensibles)
            error_msg = str(e)
            print(f"[ERROR] {datetime.now().isoformat()} - IP: {client_ip} - {error_msg}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_response = json.dumps({
                "error": {
                    "message": "Error interno del servidor",
                    "code": 500
                }
            })
            self.wfile.write(error_response.encode('utf-8'))

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

def run_server(port=None):
    if port is None:
        port = int(os.environ.get('PORT', 8000))
    
    server_address = ('0.0.0.0', port)  # Escuchar en todas las interfaces
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print(f"Servidor iniciado en puerto {port}")
    print(f"API Key configurada: {'Sí' if API_KEY else 'No'}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nDeteniendo el servidor...")
        httpd.shutdown()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    run_server(port)

