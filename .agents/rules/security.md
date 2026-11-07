# Security & Proxy Rules

- **API Key Protection**: Never expose `DEEPSEEK_API_KEY` in frontend files (`index.html`, `app.js`, `config.js`). It must remain strictly in environment variables read by `server.py`.
- **Backend Standard Library**: `server.py` and `portfolio/` must use Python's standard library only (`http.server`, `urllib.request`, `json`, `socket`, `time`, etc.). Do not introduce third-party dependencies like `flask`, `fastapi`, `requests`, or `aiohttp`.
- **Input Validation & Sanitization**:
  - The server enforces a maximum payload limit of 100 KB and a 30-second upstream timeout.
  - Only files in `PUBLIC_FILES` and `PUBLIC_DIRS` (`portfolio/web.py`) are served; anything new the page needs must be added there, and nothing else in the repository may become public.
  - Rate limiting: 6 chat messages per minute and 40 per day per visitor IP, 600 per day in total.
  - The server fixes the model, generation parameters and system prompt; the client only sends user and assistant turns (user turns up to 2000 characters, last 20 turns).
  - User messages inserted into the DOM must use `textContent`, never `innerHTML`.
  - Assistant messages rendered via markdown must be sanitized via `sanitizeHtml()` with a strict tag whitelist and removal of all event handlers (`on*`).
