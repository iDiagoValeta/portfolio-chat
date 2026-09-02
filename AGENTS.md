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
    → server.py (Validates, rate-limits 60 req/min/IP, 30s timeout, injects DEEPSEEK_API_KEY)
      → DeepSeek Chat Completions API
        ← text/event-stream (SSE)
    ← Forward SSE chunks transparently
  ← Client accumulates delta.content (discards delta.reasoning_content)
```

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
| `server.py` | Dual-stack HTTP server + proxy to DeepSeek API. Enforces rate limiting (60 req/min/IP), request size validation (100 KB), and timeouts. Uses standard library only. |
| `app.js` | Bilingual text dictionary (`T`), DOM rendering for all sections, theme switching, language toggle, and SSE chat streaming logic. |
| `config.js` | **Single Source of Truth for AI Context (`PORTFOLIO_INFO`)**. System prompt sent to DeepSeek. Strict constraint: no information not present in the CV may enter this file. |
| `styles.css` | All styling. Pure vanilla CSS tokens, media queries, dark/light definitions. Must increment cache-busting version `?v=N` in `index.html` on change. |
| `index.html` | Semantic HTML shell, SEO meta tags, Open Graph, Twitter cards, and JSON-LD schema. Section contents are rendered dynamically by `app.js`. |
| `resume.pdf` | Linked CV document. Syncs with `iDiagoValeta/resume`. |
| `.agents/` | Agent customizations: skills (`.agents/skills/`) and modular rules (`.agents/rules/`). |

---

## 4. Universal Agent Guidelines & Invariants

### 1. Zero External Dependencies & No Idle Animation Loops
- **Never add npm dependencies**, package managers, or external CDN scripts/stylesheets/fonts.
- All fonts are served locally from `fonts/` (`Fira Code`, `Inter`, `Instrument Serif`).
- **Never introduce continuous `requestAnimationFrame` loops** or permanent canvas rendering cycles for idle elements. All transitions must be event-driven CSS transitions (`:hover`, `:active`, `:focus-visible`).
- Always respect `@media (prefers-reduced-motion: reduce)`.

### 2. Theme Harmony (Light / Dark)
- Respect system preference by default (`prefers-color-scheme: dark`) with manual override persisted in `localStorage.dark`.
- The theme applies via class `.dark` or `.light` on `<html>`.
- Tokens are declared in `:root` (light), `@media (prefers-color-scheme: dark)` guarded by `:root:not(.light)`, and overridden by `html.dark` and `html.light`.
- Avatar switches image source dynamically in `applyDark()`.

### 3. Bilingual Integrity (ES / EN)
- All copy lives in the `T` dictionary in `app.js` with `es` and `en` keys.
- DOM elements use `data-i18n="key"` and `data-i18n-ph="key"` for placeholders.
- Adding any text requires updating **both** languages in `T` and adding the corresponding `data-i18n` attribute.

### 4. Assistant Context & Hallucination Prevention
- When modifying `config.js`, **never invent skills, companies, dates, or experiences**. All data must match Ignacio's real CV (`resume.pdf`).
- The assistant answers strictly from the CV data and reflects a professional AI Engineer persona.

### 5. Chat Streaming & SSE
- The client reads Server-Sent Events (`text/event-stream`).
- Only `delta.content` is appended to the message bubble.
- `delta.reasoning_content` (internal thinking tokens) is strictly discarded and never rendered to the user.
- Typing dots indicator remains visible while `reasoning_content` is being streamed and vanishes once `content` arrives.
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
