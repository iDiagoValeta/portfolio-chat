# AGENTS.md

Welcome! This repository contains the personal interactive portfolio of **Ignacio Diago Valeta** (AI & Back-End Engineer).
This document provides universal instructions, architectural principles, and operational constraints for any AI coding agent (Antigravity, Cursor, Codex, Claude Code, Windsurf, Roo, etc.) working in this codebase.

---

## 1. Project Overview & Architecture

A zero-dependency, ultra-fast web portfolio featuring an integrated streaming AI assistant that answers questions strictly about Ignacio's background, projects, and skills.

### Tech Stack
- **Frontend**: Semantic HTML5, Vanilla CSS3 (custom property tokens), ES6+ Vanilla JavaScript. No npm packages, no bundlers, no external CDNs.
- **Backend**: Python 3 standard library proxy HTTP server (`server.py`).
- **AI Integration**: DeepSeek V4 Flash API (via `/api/gemini` proxy route with SSE streaming).
- **Deployment**: Render (`Procfile`).

### Chat Request Flow
```
Browser (app.js)
  → POST /api/gemini (Python local server / proxy)
    → server.py (Validates the conversation, rate-limits, fixes model + params, injects the
                 system prompt from config.js and DEEPSEEK_API_KEY, 30s timeout)
      → DeepSeek Chat Completions API
        ← text/event-stream (SSE)
    ← Forward SSE chunks transparently
  ← Client accumulates delta.content (discards delta.reasoning_content)
```

The client sends only `{ "messages": [...] }` (user and assistant turns). The server owns the
model (`deepseek-v4-flash`), the generation parameters and the system prompt, so the proxy can
never be used as open access to the API.

Rate limits (in memory, reset on restart): 6 messages/min and 40/day per visitor IP, 600/day in
total. The visitor IP comes from `True-Client-IP` (set by Cloudflare in front of Render), then
`CF-Connecting-IP`, then the first `X-Forwarded-For` entry. A 429 carries `Retry-After`.


---

## 2. Essential Commands

### Local Development
```bash
# Set DeepSeek API Key (or define DEEPSEEK_API_KEY in a local .env file)
export DEEPSEEK_API_KEY="your_api_key"

# Run server (default port: 8000, or override via PORT environment variable)
python3 server.py
# Example with custom port:
PORT=8001 python3 server.py
```
The server serves all static files and handles the API proxy under `http://localhost:<PORT>/`.

### Production Deployment
- Deployed on **Render.com** using the `Procfile`:
  ```
  web: python server.py
  ```
- `DEEPSEEK_API_KEY` is configured in the Render dashboard environment variables.

---

## 3. Directory & File Map

| Path | Purpose & Agent Responsibilities |
|---|---|
| `server.py` | Dual-stack HTTP server and DeepSeek proxy. Validates conversations, enforces per-IP and global rate limits, 100 KB request cap and timeouts. Standard library only. |
| `app.js` | Bilingual text dictionary (`T`), DOM rendering for all sections, theme switching, language toggle, and SSE chat streaming logic. |
| `config.js` | **Single Source of Truth for AI Context (`PORTFOLIO_INFO`)**. Read by `server.py` at startup and injected as the system prompt (restart the server after editing). Only facts from the CV or from Ignacio's public repositories may enter this file. |
| `images/projects/` | Project previews: frames captured from each repository's own demo and a screenshot of La Terminal. |
| `styles.css` | All styling. Pure vanilla CSS tokens, media queries, dark/light definitions. Must increment cache-busting version `?v=N` in `index.html` on change. |
| `index.html` | Semantic HTML shell, SEO meta tags, Open Graph, Twitter cards, and JSON-LD schema. Section contents are rendered dynamically by `app.js`. |
| `resume.pdf` | Linked CV document. Syncs with `iDiagoValeta/resume`. |
| `.agents/` | Agent customizations: skills (`.agents/skills/`) and modular rules (`.agents/rules/`). |

---

## 4. Universal Agent Guidelines & Invariants

### 1. Zero External Dependencies & One Animation Loop
- **Never add npm dependencies**, package managers, or external CDN scripts/stylesheets/fonts.
- All fonts are served locally from `fonts/`: `Archivo` (variable weight and width) for text and titles, `JetBrains Mono` only for code inside chat answers.
- No full-viewport `filter: blur()`, `mix-blend-mode`, `backdrop-filter` or fixed overlay layers: they dropped Chrome to ~26 fps on this site.
- **One animation loop only:** the wave background (`startWaves()` in `app.js`, drawn on `canvas#waves`). It renders at 1:1 resolution and about 30 fps, pauses with the tab hidden and draws a single still frame under `prefers-reduced-motion`. No other `requestAnimationFrame` loops or canvas cycles. Any change to it must keep Chrome at 60 fps with the CPU slowed 4x, including a 2560x1440 retina screen (measure it: a retina-resolution canvas fell to 25 fps there).
- No gradients, no rounded corners, no loud colours. Flat surfaces and 1px hairlines.
- Always respect `@media (prefers-reduced-motion: reduce)`.

### 2. Theme Harmony (Light / Dark)
- Dark by default (the site's base look); the visitor can switch to light, persisted in `localStorage.dark`.
- The theme applies via class `.dark` or `.light` on `<html>`.
- Tokens are declared in `:root` and `html.dark` (dark) and overridden by `html.light`.
- An inline script in `<head>` applies the class before first paint; `PRODUCT.md` and `DESIGN.md` record the product and the visual system (a component datasheet: one identity, no palette switcher).

### 3. Bilingual Integrity (ES / EN)
- All copy lives in the `T` dictionary in `app.js` with `es` and `en` keys.
- DOM elements use `data-i18n="key"` and `data-i18n-ph="key"` for placeholders.
- Adding any text requires updating **both** languages in `T` and adding the corresponding `data-i18n` attribute.

### 4. Assistant Context & Hallucination Prevention
- When modifying `config.js`, **never invent skills, companies, dates, or experiences**. All data must match Ignacio's real CV (`resume.pdf`) or his public repositories.
- The assistant answers strictly from the CV data and reflects a professional AI Engineer persona.

### 5. Chat Streaming & SSE
- The client reads Server-Sent Events (`text/event-stream`).
- Only `delta.content` is appended to the message bubble.
- `delta.reasoning_content` (internal thinking tokens) is strictly discarded and never rendered to the user.
- Typing dots indicator remains visible while `reasoning_content` is being streamed and vanishes once `content` arrives; the amber lamp stays lit until the answer finishes.
- Rate limit handling: automatic retry with backoff on 429 errors.

### 6. XSS Sanitization & DOM Safety
- AI responses pass through `markdownToHtml()` → `sanitizeHtml()`.
- Whitelist HTML tags only; strip all inline `on*` event handlers.
- User input is inserted into the DOM strictly via `textContent` (never `innerHTML`).

### 7. CSS Cache-Busting
- Every edit to `styles.css` requires incrementing the query parameter in `index.html`:
  ```html
  <link rel="stylesheet" href="styles.css?v=N">
  ```

---

## 5. Agent Customizations Ecosystem (`.agents/`)

This repository follows the open `.agents` standard:

- **Skills**:
  - `ui-ux-design` ([.agents/skills/ui-ux-design/SKILL.md](.agents/skills/ui-ux-design/SKILL.md)): Enriched with StyleSeed and UI-UX Pro Max design intelligence, anti-patterns, typography, color palettes, and quality gate rubric.
- **Rules**:
  - [.agents/rules/frontend.md](.agents/rules/frontend.md): Frontend & CSS guidelines.
  - [.agents/rules/assistant.md](.agents/rules/assistant.md): Context and prompt constraints.
  - [.agents/rules/security.md](.agents/rules/security.md): Security & sanitization standards.
