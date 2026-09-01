# Ignacio Diago Valeta Portfolio

Interactive portfolio for Ignacio Diago Valeta, AI Engineer focused on LLM orchestration, RAG pipelines, computer vision, and intelligent information processing.

Live site: [portfolio-chat-aouj.onrender.com](https://portfolio-chat-aouj.onrender.com/)

## Why This Portfolio Exists

The idea came from looking at the hiring process from an interviewer's perspective. If I were reviewing a candidate, I would want to ask questions directly to their CV and quickly understand how their experience fits the role.

This portfolio turns that idea into a practical interface: a professional website with an integrated AI chat that can answer questions about my background, projects, skills, and experience.

## Tech Stack

- Frontend: HTML, CSS, and vanilla JavaScript. No bundler, no npm dependencies
- Backend: Python proxy server (standard library only)
- AI: DeepSeek V4 Flash API, streamed over SSE
- Deployment: Render

## Features

- **AI Chat**: Ask anything about Ignacio's background, projects, and skills. The
  assistant answers strictly from the data in the CV
- **Bilingual**: Full ES / EN support, switchable at any point
- **Light and dark**: Follows the system preference by default, with a manual toggle
  that persists
- **Responsive**: Single-column layout below 760 px, no horizontal scroll
- **No dependencies**: No npm, no build step, no external fonts or CDNs. Everything is
  served from the repository

## Run Locally

Set the DeepSeek API key and start the Python server:

```bash
export DEEPSEEK_API_KEY="your_api_key"
python server.py
```

On Windows PowerShell:

```powershell
$env:DEEPSEEK_API_KEY="your_api_key"
python server.py
```

Then open:

```text
http://localhost:8000
```

## Project Structure

- `index.html` defines the page shell, sections and metadata (SEO, Open Graph, JSON-LD).
- `styles.css` contains the full visual design. No preprocessor.
- `app.js` holds the bilingual content, renders every section and drives the chat.
- `config.js` is the single source of truth for the assistant context. Editing it changes
  how the assistant answers.
- `server.py` serves the static files and proxies DeepSeek requests without exposing the
  API key.
- `resume.pdf` is the CV linked from the page.

## Security

The DeepSeek API key is never exposed to the browser. Requests go through the Python server, which reads the key from the `DEEPSEEK_API_KEY` environment variable and applies basic rate limiting.

## License

MIT
