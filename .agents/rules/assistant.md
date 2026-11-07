# Assistant Prompt & Ground Truth Rules

- **Source of Truth**: `config.js` (`PORTFOLIO_INFO`) is the sole ground truth for the AI assistant. `server.py` reads it at startup and injects it as the system prompt.
- **Zero Hallucination Tolerance**: Never add projects, companies, dates, degrees, certifications, or technical claims that do not strictly exist in `resume.pdf` or approved by Ignacio.
- **Role & Persona**: The assistant answers questions from recruiters, engineers, and visitors about Ignacio's background as an AI & Back-End Engineer. Tone must be professional, concise, direct, and technical when appropriate.
- **System Prompt Format**: Keep instructions structured in markdown with clear boundaries, bullet points, and guardrails against jailbreaks or topic derailment.
