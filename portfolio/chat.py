"""Núcleo del chat: valida la conversación y aplica los límites de uso.

No hace red ni HTTP. Recibe datos y un reloj y devuelve decisiones, así que se prueba sin
servidor y sin la API del modelo.
"""

from __future__ import annotations

import threading
import time
from collections import defaultdict, deque
from datetime import datetime, timezone

# El navegador solo aporta la conversación: el prompt de sistema lo pone el servidor.
MAX_MESSAGES = 20
MAX_USER_CHARS = 2000  # las respuestas del asistente solo las acota el tamaño máximo de la petición

DAY = 86400


class InvalidConversation(ValueError):
    """La conversación que envía el navegador no tiene el formato esperado."""


def build_conversation(messages: object, system_prompt: str) -> list[dict]:
    """Devuelve el prompt de sistema seguido de los últimos turnos válidos del usuario y el asistente.

    Rechaza cualquier rol que no sea user o assistant: un mensaje system del navegador podría
    sustituir las instrucciones del asistente.
    """
    if not isinstance(messages, list) or not messages:
        raise InvalidConversation('Falta la conversación')
    clean = []
    for msg in messages[-MAX_MESSAGES:]:
        if not isinstance(msg, dict) or msg.get('role') not in ('user', 'assistant'):
            raise InvalidConversation('Mensaje con formato no válido')
        content = msg.get('content')
        if not isinstance(content, str) or not content.strip():
            raise InvalidConversation('Mensaje vacío')
        if msg['role'] == 'user' and len(content) > MAX_USER_CHARS:
            raise InvalidConversation('Mensaje demasiado largo')
        clean.append({'role': msg['role'], 'content': content})
    if clean[-1]['role'] != 'user':
        raise InvalidConversation('El último mensaje debe ser del usuario')
    return [{'role': 'system', 'content': system_prompt}, *clean]


class RateLimiter:
    """Límites por visitante (por minuto y por día) y un tope global diario.

    El tope global protege el saldo de la API aunque alguien rote direcciones. Vive en memoria:
    un reinicio del servicio lo pone a cero.
    """

    def __init__(self, per_minute: int = 6, per_day: int = 40, global_per_day: int = 600, clock=time.time):
        self.per_minute = per_minute
        self.per_day = per_day
        self.global_per_day = global_per_day
        self._clock = clock
        self._lock = threading.Lock()
        self._visits = defaultdict(deque)  # {visitante: deque[timestamp]} de las últimas 24 h
        self._day = None
        self._day_count = 0

    def check(self, visitor: str) -> int | None:
        """Registra la petición y devuelve None, o los segundos que hay que esperar si se supera un límite."""
        now = self._clock()
        today = datetime.fromtimestamp(now, timezone.utc).date()
        with self._lock:
            if self._day != today:
                self._day = today
                self._day_count = 0
                # Una vez al día se olvidan los visitantes sin actividad reciente
                for key in [k for k, q in self._visits.items() if not q or now - q[-1] > DAY]:
                    del self._visits[key]
            if self._day_count >= self.global_per_day:
                tomorrow = datetime.combine(today, datetime.min.time(), timezone.utc).timestamp() + DAY
                return int(tomorrow - now) + 1

            visits = self._visits[visitor]
            while visits and now - visits[0] >= DAY:
                visits.popleft()
            if len(visits) >= self.per_day:
                return int(visits[0] + DAY - now) + 1
            last_minute = [ts for ts in visits if now - ts < 60]
            if len(last_minute) >= self.per_minute:
                return int(last_minute[0] + 60 - now) + 1

            visits.append(now)
            self._day_count += 1
            return None
