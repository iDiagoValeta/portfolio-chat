"""Adaptador del puerto ChatModel contra la API de DeepSeek."""

from __future__ import annotations

import json
import urllib.error
import urllib.request
from typing import Iterator

from portfolio.ports import ChatModelUnavailable, ChatModelUnreachable

API_URL = 'https://api.deepseek.com/chat/completions'


class DeepSeekChatModel:
    """Fija el modelo y los parámetros: el navegador nunca los elige."""

    def __init__(self, api_key: str, url: str = API_URL, model: str = 'deepseek-v4-flash', timeout: float = 30):
        self.api_key = api_key
        self.url = url
        self.model = model
        self.timeout = timeout

    def stream(self, messages: list[dict]) -> Iterator[bytes]:
        body = {
            'model': self.model,
            'messages': messages,
            'temperature': 0.7,
            'max_tokens': 8192,
            'reasoning_effort': 'low',
            'stream': True,
        }
        request = urllib.request.Request(self.url, data=json.dumps(body).encode('utf-8'))
        request.add_header('Content-Type', 'application/json')
        request.add_header('Authorization', f'Bearer {self.api_key}')
        try:
            response = urllib.request.urlopen(request, timeout=self.timeout)
        except urllib.error.HTTPError as error:
            # No se propaga el cuerpo de DeepSeek: puede describir la cuenta o la clave
            raise ChatModelUnavailable(f'DeepSeek HTTP {error.code}') from None
        except (urllib.error.URLError, TimeoutError) as error:
            raise ChatModelUnreachable(str(getattr(error, 'reason', error))) from None
        with response:
            # read1 devuelve lo que ya ha llegado: los fragmentos SSE pasan al navegador sin esperar
            while chunk := response.read1(1024):
                yield chunk
