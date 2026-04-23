# Ignacio Diago Valeta Portfolio

Interactive portfolio for Ignacio Diago Valeta, AI Engineer focused on LLM fine-tuning, RAG, computer vision, and multi-agent systems.

Live site: [portfolio-chat-aouj.onrender.com](https://portfolio-chat-aouj.onrender.com/)

## Why This Portfolio Exists

The idea came from looking at the hiring process from an interviewer's perspective. If I were reviewing a candidate, I would want to ask questions directly to their CV and quickly understand how their experience fits the role.

This portfolio turns that idea into a practical interface: a professional website with an integrated AI chat that can answer questions about my background, projects, skills, and experience.

## Preview

https://github.com/user-attachments/assets/68340cf7-de77-44ee-ae84-0b51651d1d8c

### Header

![Portfolio header](images/1.png)

### AI Chat

![AI chat section](images/2.png)

### Experience

![Experience section](images/3.png)

These screenshots show three key parts of the portfolio. The site also includes additional sections for skills, projects, education, contact, and other professional details.

## Tech Stack

- Frontend: HTML, CSS, and vanilla JavaScript
- Backend: Python proxy server
- AI: Google Gemini 2.5 Flash API
- Deployment: Render

## Run Locally

Set the Gemini API key and start the Python server:

```bash
export GEMINI_API_KEY="your_api_key"
python server.py
```

On Windows PowerShell:

```powershell
$env:GEMINI_API_KEY="your_api_key"
python server.py
```

Then open:

```text
http://localhost:8000
```

## Project Structure

- `index.html` defines the portfolio sections and page metadata.
- `styles.css` contains the visual design and responsive layout.
- `app.js` handles client-side interactions.
- `config.js` contains the AI assistant context.
- `server.py` serves the site and proxies Gemini requests without exposing the API key.

## Security

The Gemini API key is never exposed to the browser. Requests go through the Python server, which reads the key from the `GEMINI_API_KEY` environment variable and applies basic rate limiting.

## License

MIT
