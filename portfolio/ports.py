"""Puerto hacia el modelo de lenguaje.

La web y los tests solo conocen este contrato. Cambiar de proveedor es escribir otro adaptador,
como ya pasó al pasar de Gemini a DeepSeek.
"""

from __future__ import annotations

from typing import Iterator, Protocol


class ChatModelUnavailable(Exception):
    """El proveedor respondió con un error."""


class ChatModelUnreachable(Exception):
    """No se pudo conectar con el proveedor o se agotó el tiempo."""


class ChatModel(Protocol):
    def stream(self, messages: list[dict]) -> Iterator[bytes]:
        """Devuelve la respuesta como eventos SSE en formato Chat Completions, tal como llegan.

        Los errores de conexión o del proveedor se lanzan antes del primer fragmento, como
        ChatModelUnreachable o ChatModelUnavailable.
        """
        ...
