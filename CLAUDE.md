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
| `server.py` | Servidor HTTP. Sirve los estáticos **y** actúa de proxy para `/api/gemini`. Rate limiting (60 req/min/IP), timeout (30s) y validación de tamaño (100 KB). Solo librería estándar. |
| `app.js` | Contenido bilingüe (objeto `T`), render de todas las secciones, tema, idioma y chat con streaming. |
| `config.js` | **Fuente de verdad del contexto de IA.** Exporta `PORTFOLIO_INFO`, el prompt de sistema enviado a DeepSeek. Modificarlo cambia cómo responde el asistente. Regla: aquí no entra ningún dato que no esté en el CV. |
| `styles.css` | Todo el CSS. Sin preprocesador. Cache-busting manual via `?v=N` en `index.html`. |
| `index.html` | Estructura, meta SEO, Open Graph, Twitter Cards y JSON-LD. El contenido de las secciones lo pinta `app.js`. |
| `resume.pdf` | CV enlazado desde la página. Se sincroniza con el repo `iDiagoValeta/resume`. |

## Decisiones de diseño relevantes

### Tema claro y oscuro

- **Por defecto se respeta el sistema.** `app.js` lee `localStorage.dark`; si no existe,
  consulta `prefers-color-scheme`.
- El tema se aplica con las clases `dark` o `light` en el elemento `<html>`.
- En CSS los tokens se definen en `:root` (claro), se redefinen bajo
  `@media (prefers-color-scheme: dark)` con el guardián `:root:not(.light)`, y otra vez
  bajo `html.dark` para que el conmutador gane en ambos sentidos.
- El avatar de la cabecera cambia de archivo según el tema (`applyDark`).

### Contenido bilingüe

Todo el texto vive en el objeto `T` de `app.js`, con las claves `es` y `en`. El HTML
marca los nodos con `data-i18n="clave"` y `data-i18n-ph="clave"` para los placeholders.
`applyLang()` recorre esos atributos y vuelve a pintar las secciones que se generan por
JavaScript. Para añadir una cadena basta con crear la clave en ambos idiomas y marcar el
nodo, sin tocar `applyLang`.

### Sin dependencias ni animación continua

No hay npm, ni bundler, ni fuentes externas: las tres tipografías se sirven desde
`fonts/`. La única animación es el indicador de escritura del chat, y se suprime bajo
`prefers-reduced-motion`. No debe introducirse ningún bucle `requestAnimationFrame`
permanente: la versión anterior lo tenía y penalizaba a los navegadores sin aceleración
por hardware.

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
