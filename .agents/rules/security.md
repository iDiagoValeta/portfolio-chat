# Security & Proxy Rules

- **API Key Protection**: Never expose `DEEPSEEK_API_KEY` in frontend files (`index.html`, `app.js`, `config.js`). It must remain strictly in environment variables read by `server.py`.
- **Backend Standard Library**: `server.py` must use Python's standard library only (`http.server`, `urllib.request`, `json`, `socket`, `time`, etc.). Do not introduce third-party dependencies like `flask`, `fastapi`, `requests`, or `aiohttp`.
- **Input Validation & Sanitization**:
  - `server.py` enforces a maximum payload limit of 100 KB and a 30-second upstream timeout.
  - Rate limiting is enforced at 60 requests per minute per client IP.
  - User messages inserted into the DOM must use `textContent`, never `innerHTML`.
  - Assistant messages rendered via markdown must be sanitized via `sanitizeHtml()` with a strict tag whitelist and removal of all event handlers (`on*`).
