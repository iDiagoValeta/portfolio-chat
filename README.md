# IGNACIO DIAGO VALETA — PORTFOLIO

```
░░██████░░
░█░░░░░░█░
░█░██░██░█
░█░░░░░░█░
░█░████░█░
░█░░░░░░█░
░░██████░░
░░░█░░█░░░
░░░████░░░
```

**AI Engineer** — LLM Fine-tuning · Computer Vision · Multi-Agent

🔗 [portfolio-chat-aouj.onrender.com](https://portfolio-chat-aouj.onrender.com/)

---

## 🛠 Stack

```
Frontend  →  HTML · CSS · Vanilla JS (sin bundler, sin framework)
Backend   →  Python (servidor proxy + rate limiting)
AI        →  Google Gemini 2.5 Flash API
Deploy    →  Render.com
```

## ⚡ Run local

```bash
# Linux / macOS
export GEMINI_API_KEY='tu_key'
python server.py

# Windows PowerShell
$env:GEMINI_API_KEY='tu_key'
python server.py
```

→ `http://localhost:8000`

## ✏️ Personalizar

| Archivo | Qué editar |
|---|---|
| `config.js` | Contexto del asistente IA (prompt del sistema) |
| `index.html` | Contenido de las secciones y meta SEO |
| `styles.css` | Tipografía, colores y diseño |

## 🔒 Seguridad

La API key nunca se expone al cliente — el servidor Python actúa de proxy y la lee desde `GEMINI_API_KEY` (variable de entorno). Rate limiting: 60 req/min por IP.

---

*MIT · 2025*
