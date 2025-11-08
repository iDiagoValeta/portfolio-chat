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

# Leer la API key del archivo config.js
def get_api_key():
    config_path = Path(__file__).parent / 'config.js'
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Buscar la API key en el archivo
            import re
            match = re.search(r"GEMINI_API_KEY\s*=\s*['\"]([^'\"]+)['\"]", content)
            if match:
                return match.group(1)
    except Exception as e:
        print(f"Error leyendo config.js: {e}")
    return None

API_KEY = get_api_key()
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent"

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
            self.send_error(500, "API Key no configurada en config.js")
            return

        try:
            # Leer el cuerpo de la solicitud
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))

            # Preparar la solicitud a Gemini
            url = f"{GEMINI_API_URL}?key={API_KEY}"
            req = urllib.request.Request(url, data=json.dumps(request_data).encode('utf-8'))
            req.add_header('Content-Type', 'application/json')

            # Realizar la solicitud
            with urllib.request.urlopen(req) as response:
                response_data = response.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(response_data)

        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(error_body.encode('utf-8'))
        except Exception as e:
            self.send_error(500, f"Error interno: {str(e)}")

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

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print(f"Servidor iniciado en http://localhost:{port}")
    print(f"API Key configurada: {'Sí' if API_KEY else 'No (verifica config.js)'}")
    print("Presiona Ctrl+C para detener el servidor")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nDeteniendo el servidor...")
        httpd.shutdown()

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)

