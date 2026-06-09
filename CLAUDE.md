# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos esenciales

### Ejecutar en local

```bash
# Linux / macOS
export DEEPSEEK_API_KEY='tu_api_key'
python server.py

# Windows CMD
set DEEPSEEK_API_KEY=tu_api_key
python server.py

# Windows PowerShell
$env:DEEPSEEK_API_KEY='tu_api_key'
python server.py
```

Alternativamente, crea un archivo `.env` (ignorado por git) en la raíz con `DEEPSEEK_API_KEY=tu_api_key`; `server.py` lo carga automáticamente al arrancar, así no hace falta exportar la variable cada vez.

El servidor escucha en `http://localhost:8000` (puerto configurable vía variable de entorno `PORT`).

### Despliegue en producción

El proyecto está desplegado en Render.com. El `Procfile` define el comando de arranque:
```
web: python server.py
```
La variable de entorno `DEEPSEEK_API_KEY` debe configurarse en el panel de Render.

---

## Arquitectura

Este proyecto es un **portfolio web estático + backend proxy Python**, sin bundler, sin framework frontend, sin dependencias npm.

### Flujo de una petición de chat

```
Navegador (app.js)
  → POST /api/gemini  (al propio servidor Python; ruta heredada, sin renombrar)
    → server.py  (valida, aplica rate limiting, reenvía)
      → DeepSeek API  (con la API key del servidor)
        ← respuesta JSON
      ← respuesta JSON transparente
    ← respuesta al cliente
```

La razón del proxy es doble: evitar exponer la API key en el cliente y gestionar CORS.

### Archivos y responsabilidades

| Archivo | Rol |
|---|---|
| `server.py` | Servidor HTTP Python. Sirve los estáticos **y** actúa de proxy para `/api/gemini`. Implementa rate limiting (60 req/min/IP), timeout (30s) y validación de tamaño (100 KB). |
| `app.js` | Lógica completa del cliente: chat, modo oscuro, scroll reveal, header auto-hide, barra de progreso. Usa ES6 modules (`import` de `config.js`). |
| `config.js` | **Fuente de verdad del contexto de IA.** Exporta `PORTFOLIO_INFO`, el prompt de sistema (`role: system`) enviado a DeepSeek en cada petición. Modificar este archivo cambia cómo responde el asistente. |
| `fx3d.js` | Efectos visuales sin dependencias (canvas 2D + proyección en perspectiva): polen 3D con constelaciones, tilt 3D con glare, paralaje 3D del hero, letras del nombre con entrada 3D, cursor personalizado, intro bloom (1×/sesión), ripple en clicks y botones magnéticos. Respeta `prefers-reduced-motion` y punteros táctiles. El import en `app.js` lleva `?v=N` propio para cache-busting. |
| `styles.css` | Todo el CSS. Sin preprocesador. El tema se controla con la clase `html.dark-mode`. Cache-busting manual via `?v=N` en el `<link>` de `index.html`. |
| `index.html` | Estructura HTML única. Contiene meta SEO, Open Graph, Twitter Cards y JSON-LD. |

---

## Decisiones de diseño relevantes

### Tema oscuro/claro

- **El modo oscuro es el predeterminado.** `initializeDarkMode()` en `app.js` lee `localStorage.getItem('portfolio_theme')` y activa el oscuro si el valor no es `'light'`.
- El tema se aplica añadiendo/quitando la clase `dark-mode` en el elemento `<html>` (no en `body`).
- En CSS, el modo oscuro usa el selector `html.dark-mode` y el modo claro usa `html:not(.dark-mode)`. Las variables CSS (tokens) se redefinen en ambos bloques al inicio de `styles.css`.
- Para garantizar que no haya huecos negros al redimensionar la ventana, tanto `html` como `body` tienen `background-color` definido y `body` tiene `min-height: 100vh`.

### Secciones alternadas

Las secciones `#habilidades` y `#chat` tienen la clase `section-alt`, que en modo oscuro recibe un tinte muy sutil (`rgba(255,255,255,0.018)`) para crear separación visual sin romper la estética oscura.

### Historial del chat

El historial se guarda en `localStorage` con la clave `portfolio_chat_history_v2` en formato de mensajes de DeepSeek (compatible con OpenAI):
```js
{ role: 'user' | 'assistant', content: '...' }
```
En cada petición, `app.js` antepone el bloque `PORTFOLIO_INFO` como mensaje `{ role: 'system' }` antes de enviar el historial real. Si la API devuelve un 429, el cliente espera 20 segundos y reintenta automáticamente una vez.

Las respuestas llegan en **streaming** (SSE, `stream: true`): `server.py` reenvía los chunks tal cual (`text/event-stream`) y `app.js` acumula únicamente `delta.content`, descartando `delta.reasoning_content` (el razonamiento interno del modelo, que nunca se muestra). La burbuja del bot se va pintando token a token; mientras el modelo razona (aún sin `content`) se mantienen los *typing dots*.

### Seguridad XSS

Las respuestas del bot pasan por `markdownToHtml()` → `sanitizeHtml()` antes de insertarse en el DOM. `sanitizeHtml()` usa una whitelist de tags HTML permitidos y elimina cualquier atributo `on*`. El texto del usuario se inserta siempre via `textContent` (nunca `innerHTML`).

### CSS cache-busting

Cada vez que se modifica `styles.css`, hay que incrementar el número de versión en `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=N">
```
