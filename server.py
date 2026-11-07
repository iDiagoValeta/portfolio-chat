#!/usr/bin/env python3
"""Punto de arranque del portfolio: lee la configuración, construye las piezas y levanta el servidor.

Es el único sitio donde se instancian los adaptadores. Uso: python3 server.py (PORT cambia el puerto).
"""

import os
import re
from pathlib import Path

from portfolio.chat import RateLimiter
from portfolio.deepseek import DeepSeekChatModel
from portfolio.web import make_handler, serve

ROOT = Path(__file__).parent


def load_dotenv() -> None:
    """Carga un .env local si existe, sin dependencias externas. En Render las variables vienen del panel."""
    env_path = ROOT / '.env'
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, _, value = line.partition('=')
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def load_system_prompt() -> str:
    """Lee PORTFOLIO_INFO de config.js, la única fuente del contexto del asistente."""
    source = (ROOT / 'config.js').read_text(encoding='utf-8')
    match = re.search(r'PORTFOLIO_INFO\s*=\s*`(.*?)`', source, re.S)
    if not match:
        raise RuntimeError('PORTFOLIO_INFO no encontrado en config.js')
    return match.group(1)


def main() -> None:
    load_dotenv()
    api_key = os.environ.get('DEEPSEEK_API_KEY')
    if not api_key:
        print('Aviso: DEEPSEEK_API_KEY no está configurada; el chat responderá con un error.')
    chat_model = DeepSeekChatModel(api_key) if api_key else None
    handler = make_handler(ROOT, chat_model, RateLimiter(), load_system_prompt())
    serve(handler, int(os.environ.get('PORT', 8000)))


if __name__ == '__main__':
    main()
