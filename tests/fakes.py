"""Dobles en memoria de los puertos, para probar sin red."""

from __future__ import annotations


class FakeChatModel:
    """Implementa ChatModel: devuelve fragmentos fijos o lanza el error indicado, y guarda lo que recibe."""

    def __init__(self, chunks=(b'data: {"choices":[{"delta":{"content":"Hola"}}]}\n\n', b'data: [DONE]\n\n'), error=None):
        self.chunks = list(chunks)
        self.error = error
        self.calls = []

    def stream(self, messages):
        self.calls.append(messages)
        if self.error:
            raise self.error
        yield from self.chunks


class FakeClock:
    """Reloj manual para el limitador: los tests avanzan el tiempo sin esperar."""

    def __init__(self, now: float = 1_800_000_000.0):
        self.now = now

    def __call__(self) -> float:
        return self.now

    def advance(self, seconds: float) -> None:
        self.now += seconds
