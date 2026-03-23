# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos esenciales

### Ejecutar en local

```bash
# Linux / macOS
export GEMINI_API_KEY='tu_api_key'
python server.py

# Windows CMD
set GEMINI_API_KEY=tu_api_key
python server.py

# Windows PowerShell
$env:GEMINI_API_KEY='tu_api_key'
python server.py
```

El servidor escucha en `http://localhost:8000` (puerto configurable vía variable de entorno `PORT`).

### Despliegue en producción

El proyecto está desplegado en Render.com. El `Procfile` define el comando de arranque:
```
web: python server.py
```
La variable de entorno `GEMINI_API_KEY` debe configurarse en el panel de Render.

---

## Arquitectura

Este proyecto es un **portfolio web estático + backend proxy Python**, sin bundler, sin framework frontend, sin dependencias npm.

### Flujo de una petición de chat

```
Navegador (app.js)
  → POST /api/gemini  (al propio servidor Python)
    → server.py  (valida, aplica rate limiting, reenvía)
      → Google Gemini API  (con la API key del servidor)
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
| `config.js` | **Fuente de verdad del contexto de IA.** Exporta `PORTFOLIO_INFO`, el prompt de sistema enviado a Gemini en cada petición. Modificar este archivo cambia cómo responde el asistente. |
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

El historial se guarda en `localStorage` con la clave `portfolio_chat_history` en formato nativo de Gemini:
```js
{ role: 'user' | 'model', parts: [{ text: '...' }] }
```
En cada petición, `app.js` antepone el bloque `PORTFOLIO_INFO` como turno inicial del sistema antes de enviar el historial real. Si la API devuelve un 429, el cliente espera 20 segundos y reintenta automáticamente una vez.

### Seguridad XSS

Las respuestas del bot pasan por `markdownToHtml()` → `sanitizeHtml()` antes de insertarse en el DOM. `sanitizeHtml()` usa una whitelist de tags HTML permitidos y elimina cualquier atributo `on*`. El texto del usuario se inserta siempre via `textContent` (nunca `innerHTML`).

### CSS cache-busting

Cada vez que se modifica `styles.css`, hay que incrementar el número de versión en `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=N">
```
