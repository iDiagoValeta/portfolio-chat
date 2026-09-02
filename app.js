import { PORTFOLIO_INFO } from './config.js?v=52';

// Contenido bilingüe. Fuente: CV vigente (iDiagoValeta/resume), 2026-09-02.
const T = {
  es: {
    skip: 'Saltar al contenido', cv: 'CV',
    nav_exp: 'Experiencia', nav_proj: 'Proyectos', nav_chat: 'Chat', nav_contact: 'Contacto',
    role: 'AI & Back-End Engineer',
    about_k: 'SOBRE MÍ',
    about_v: 'AI & Back-End Engineer especializado en la orquestación de sistemas LLM, arquitecturas RAG y back ends escalables en producción. Graduado en Ingeniería Informática por la UPV.',
    news_link: 'La Terminal',
    proj_code: 'Código',
    proj_demo: 'Web en vivo',
    exp_title: 'Experiencia', proj_title: 'Proyectos',
    edu_title: 'Formación', chat_title: 'Pregunta a la IA', contact_title: 'Contacto',
    chat_lead: 'Asistente con el contexto completo del perfil. Responde con los datos reales del CV.',
    chat_ph: 'Escribe tu pregunta', chat_send: 'Enviar',
    chat_head: 'Asistente', chat_clear: 'Limpiar', foot: 'A Coruña, España', clock_k: 'HORA LOCAL',
    chat_welcome: 'Hola. Tengo el contexto completo del perfil de Ignacio: experiencia, proyectos, stack y formación. ¿Qué quieres saber?',
    chat_user_avatar: 'TÚ',
    chat_suggestions: ['¿Qué hizo en Auro AI?', '¿Qué experiencia tiene con RAG?', '¿Qué stack domina?', '¿Dónde trabaja ahora?'],
    contact_lead: 'Disponible para hablar de proyectos con impacto real.',
    exp: [
      { role: 'AI Engineer', note: '', company: 'Inditex · Graduate program', date: 'SEP 2026 → ACTUAL', lead: true,
        desc: 'Incorporación al **graduate program de tecnología** de Inditex.' },
      { role: 'Technical Lead', note: '', company: 'Auro AI · Valencia', date: 'JUN 2026 → SEP 2026',
        desc: 'Dirección técnica de un asistente de IA que lee facturas de energía y telecomunicaciones por WhatsApp y cambia al usuario a la mejor tarifa de España. A cargo del back end: un **monorepo TypeScript de seis apps** sobre PostgreSQL, Docker y Google Cloud Platform, con **despliegues sin caída**. Definición del **estándar de ingeniería del equipo**.', },
      { role: 'AI & Back-End Developer', note: '', company: 'Grupo Educativo CEU · Valencia', date: 'OCT 2025 → JUN 2026',
        desc: '**GPT-CEU**, asistente de IA generativa para las **tres universidades del grupo** por web y WhatsApp, con enrutado por rol para estudiantes, profesorado y personal. Modelos de lenguaje conectados a fuentes institucionales mediante Azure Functions y **pipelines RAG**, respondiendo con información académica en tiempo real **en producción**.' },
      { role: 'Guía e instructor de talleres técnicos', note: '', company: 'Museo de Informática, UPV · Valencia', date: 'FEB 2025 → JUN 2025',
        desc: 'Diseño e impartición de talleres de robótica, criptografía y programación, y visitas guiadas sobre historia de la computación.' },
      { role: 'Profesor particular', note: '', company: 'Superprof · Valencia', date: 'ENE 2022 → ENE 2025',
        desc: 'Formación personalizada en matemáticas, física y dibujo técnico para secundaria y preuniversitario.' },
    ],
    proj: [
      {
        t: 'MonkeyGrab',
        tech: 'Ollama · ChromaDB · LlamaIndex · React · Flask',
        d: 'Sistema RAG multilingüe para PDFs centrado en privacidad, sin dependencias de APIs externas. Recuperación híbrida semántica y léxica. Proyecto final de grado (UPV).',
        repo: 'https://github.com/iDiagoValeta/localOllamaRAG',
      },
      {
        t: 'OCR a CRM',
        tech: 'Azure Functions · Document Intelligence · GPT-4 · RapidFuzz',
        d: 'Sustituyó la digitalización manual externalizada de matrículas manuscritas por un pipeline serverless que escribe directo en el CRM. En producción en CEU.',
        repo: 'https://github.com/iDiagoValeta/ocr-crm-pipeline',
      },
      {
        t: 'La Terminal',
        tech: 'TypeScript · Eleventy 3 · DeepSeek · GitHub Actions',
        d: 'Diario estático de noticias tech y repositorios trending en español, publicado cada día en GitHub Pages. Pipeline serverless automatizado con curación LLM (DeepSeek) y validación JSON Schema sin servidor ni base de datos.',
        repo: 'https://github.com/iDiagoValeta/automated-news',
        demo: 'https://idiagovaleta.github.io/automated-news/',
      },
    ],
    edu: [
      { t: 'Universitat Politècnica de València', d: 'Ingeniería Informática, especialidad en Computación', y: '2026' },
    ],
  },
  en: {
    skip: 'Skip to content', cv: 'CV',
    nav_exp: 'Experience', nav_proj: 'Projects', nav_chat: 'Chat', nav_contact: 'Contact',
    role: 'AI & Back-End Engineer',
    about_k: 'ABOUT ME',
    about_v: 'AI & Back-End Engineer focused on production: LLM orchestration, RAG systems, and scalable serverless architectures. Computer Science graduate from UPV.',
    news_link: 'La Terminal',
    proj_code: 'Code',
    proj_demo: 'Live Demo',
    exp_title: 'Experience', proj_title: 'Projects',
    edu_title: 'Education', chat_title: 'Ask the AI', contact_title: 'Contact',
    chat_lead: 'Assistant with full context of the profile. Answers with the real data from the CV.',
    chat_ph: 'Type your question', chat_send: 'Send',
    chat_head: 'Assistant', chat_clear: 'Clear', foot: 'A Coruña, Spain', clock_k: 'LOCAL TIME',
    chat_welcome: 'Hi. I have full context on Ignacio: experience, projects, stack and education. What would you like to know?',
    chat_user_avatar: 'YOU',
    chat_suggestions: ['What did he do at Auro AI?', 'What RAG experience does he have?', 'What is his stack?', 'Where does he work now?'],
    contact_lead: 'Open to talking about projects with real impact.',
    exp: [
      { role: 'AI Engineer', note: '', company: 'Inditex · Graduate program', date: 'SEP 2026 → PRESENT', lead: true,
        desc: 'Joining the Inditex **technology graduate program**.' },
      { role: 'Technical Lead', note: '', company: 'Auro AI · Valencia', date: 'JUN 2026 → SEP 2026',
        desc: 'Led the technical development of an AI assistant that reads energy and telecom bills over WhatsApp and switches users to the best tariff in Spain. In charge of the back end: a **six-app TypeScript monorepo** over PostgreSQL, Docker and Google Cloud Platform, with **zero-downtime deploys**. Defined the team\'s **engineering standard**.', },
      { role: 'AI & Back-End Developer', note: '', company: 'Grupo Educativo CEU · Valencia', date: 'OCT 2025 → JUN 2026',
        desc: 'Developed and deployed **GPT-CEU**, a generative AI assistant serving the group’s **three universities** over web and WhatsApp, with role-aware routing for students, faculty and staff. Connected language models to institutional data sources through serverless Azure Functions and **RAG pipelines**, answering with real-time academic information **in production**.' },
      { role: 'Museum guide & technical workshop instructor', note: '', company: 'Museo de Informática, UPV · Valencia', date: 'FEB 2025 → JUN 2025',
        desc: 'Designed and delivered technical workshops on robotics, cryptography and programming, and led guided visits on the history of computing.' },
      { role: 'Private tutor', note: '', company: 'Superprof · Valencia', date: 'JAN 2022 → JAN 2025',
        desc: 'Personalized instruction in mathematics, physics and technical drawing for secondary and pre-university students.' },
    ],
    proj: [
      {
        t: 'MonkeyGrab',
        tech: 'Ollama · ChromaDB · LlamaIndex · React · Flask',
        d: 'Privacy-focused multilingual RAG system for PDFs with zero external API dependencies. Hybrid semantic and lexical retrieval. Final degree project (UPV).',
        repo: 'https://github.com/iDiagoValeta/localOllamaRAG',
      },
      {
        t: 'OCR to CRM',
        tech: 'Azure Functions · Document Intelligence · GPT-4 · RapidFuzz',
        d: 'Replaced outsourced manual digitization of handwritten enrollment forms with a serverless pipeline writing straight into the CRM. Running in production at CEU.',
        repo: 'https://github.com/iDiagoValeta/ocr-crm-pipeline',
      },
      {
        t: 'La Terminal',
        tech: 'TypeScript · Eleventy 3 · DeepSeek · GitHub Actions',
        d: 'Daily static tech news and trending open-source digest in Spanish, published daily to GitHub Pages. Serverless pipeline powered by LLM curation (DeepSeek) and JSON Schema validation without database or server.',
        repo: 'https://github.com/iDiagoValeta/automated-news',
        demo: 'https://idiagovaleta.github.io/automated-news/',
      },
    ],
    edu: [
      { t: 'Universitat Politècnica de València', d: 'Computer Engineer, Computing specialization', y: '2026' },
    ],
  },
};

const PALETTES = [
  { id: 'lime', name: 'Electric Lime', color: '#c2ef4e' },
  { id: 'emerald', name: 'Cyber Emerald', color: '#10b981' },
  { id: 'amber', name: 'Warm Amber', color: '#f59e0b' },
  { id: 'cyan', name: 'Neon Cyan', color: '#06b6d4' },
  { id: 'mono', name: 'Monochrome', color: '#e4e4e7' },
];

let currentPalette = localStorage.getItem('portfolio_palette') || 'lime';

const STORAGE_KEY = 'portfolio_chat_history_v3';
const CHAT_TIMEOUT = 60000;

let lang = localStorage.getItem('lang') || 'es';
const savedDark = localStorage.getItem('dark');
let dark = savedDark !== null ? savedDark !== 'false' : true;
let chatHistory = [];
let isProcessing = false;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Enfasis controlado: **texto** pasa a <strong> despues de escapar, nunca antes.
const fmt = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// --- Chat: sanitizado, markdown e historial (sin cambios respecto a la versión anterior) ---

function sanitizeHtml(html) {
  if (!html) return '';
  const allowedTags = new Set(['P', 'BR', 'STRONG', 'EM', 'CODE', 'UL', 'OL', 'LI']);
  const temp = document.createElement('div');
  temp.innerHTML = html;
  temp.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((attr) => {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
    });
    if (!allowedTags.has(el.tagName)) {
      const parent = el.parentNode;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
    }
  });
  return temp.innerHTML;
}

function mdToHtml(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const withMarkdown = escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/(?:^|\n)- (.+?)(?=\n|$)/g, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

  return withMarkdown
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => (paragraph.startsWith('<ul>') ? paragraph : `<p>${paragraph.replace(/\n/g, '<br>')}</p>`))
    .join('');
}

function saveChatHistory() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory)); } catch (_e) {}
}

function loadChatHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) chatHistory = parsed;
  } catch (_e) { chatHistory = []; }
}

function appendMsg(role, html, smooth = false) {
  const msgs = $('chatMsgs');
  const isBot = role === 'bot';
  const div = document.createElement('div');
  div.className = `msg ${isBot ? 'msg-bot' : 'msg-user'}`;
  div.innerHTML = `<div class="msg-avatar">${isBot ? 'AI' : T[lang].chat_user_avatar}</div><div class="msg-bubble">${html}</div>`;
  msgs.appendChild(div);
  if (smooth) msgs.scrollTo({ top: msgs.scrollHeight, behavior: 'smooth' });
  else msgs.scrollTop = msgs.scrollHeight;
}

function renderSuggestions(list) {
  const wrap = $('chatSuggestions');
  wrap.innerHTML = list.map((s) => `<button type="button" class="sugg" data-text="${esc(s)}">${esc(s)}</button>`).join('');
  wrap.querySelectorAll('.sugg').forEach((btn) => {
    btn.addEventListener('click', () => sendMsg(btn.dataset.text || ''));
  });
}

function clearChat() {
  chatHistory = [];
  saveChatHistory();
  $('chatMsgs').innerHTML = '';
  appendMsg('bot', `<p>${T[lang].chat_welcome}</p>`);
  $('chatInput').focus();
}

function restoreChat() {
  $('chatMsgs').innerHTML = '';
  if (chatHistory.length === 0) {
    appendMsg('bot', `<p>${T[lang].chat_welcome}</p>`);
    return;
  }
  chatHistory.forEach((msg) => {
    const text = msg?.content || '';
    if (!text) return;
    if (msg.role === 'user') appendMsg('user', `<p>${esc(text)}</p>`);
    if (msg.role === 'assistant') appendMsg('bot', sanitizeHtml(mdToHtml(text)));
  });
}

async function requestGemini(userMessage, onToken) {
  chatHistory.push({ role: 'user', content: userMessage });

  const requestBody = {
    model: 'deepseek-v4-flash',
    messages: [{ role: 'system', content: PORTFOLIO_INFO }, ...chatHistory],
    temperature: 0.7,
    max_tokens: 8192,
    reasoning_effort: 'low',
    stream: true,
  };

  let response;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT);
    try {
      response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
    if (response.status === 429 && attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 20000));
      continue;
    }
    break;
  }

  if (!response.ok) {
    let message = `Error HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.error?.message || message;
    } catch (_e) {}
    throw new Error(message);
  }

  // Lee el stream SSE y acumula solo delta.content (ignora delta.reasoning_content)
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === '[DONE]') continue;
      try {
        const json = JSON.parse(payload);
        if (json.error) throw new Error(json.error.message || 'Error de la API');
        const token = json.choices?.[0]?.delta?.content;
        if (token) { fullText += token; onToken(fullText); }
      } catch (error) {
        if (error.message && error.message !== 'Unexpected end of JSON input') throw error;
      }
    }
  }

  if (!fullText) throw new Error('La API no devolvió ninguna respuesta');

  chatHistory.push({ role: 'assistant', content: fullText });
  saveChatHistory();
  return fullText;
}

async function sendMsg(text = '') {
  if (isProcessing) return;
  const input = $('chatInput');
  const userText = (text || input.value).trim().replace(/[<>]/g, '');
  if (!userText) return;

  isProcessing = true;
  $('chatSend').disabled = true;
  input.value = '';
  appendMsg('user', `<p>${esc(userText)}</p>`, true);

  const loader = document.createElement('div');
  loader.className = 'msg msg-bot';
  loader.innerHTML = '<div class="msg-avatar">AI</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  $('chatMsgs').appendChild(loader);
  $('chatMsgs').scrollTop = $('chatMsgs').scrollHeight;
  const bubble = loader.querySelector('.msg-bubble');

  try {
    await requestGemini(userText, (fullText) => {
      bubble.innerHTML = sanitizeHtml(mdToHtml(fullText));
      $('chatMsgs').scrollTop = $('chatMsgs').scrollHeight;
    });
  } catch (error) {
    loader.remove();
    if (chatHistory.at(-1)?.role === 'user') { chatHistory.pop(); saveChatHistory(); }
    appendMsg('bot', `<p>${esc(error.message || 'Hubo un error. Inténtalo de nuevo.')}</p>`);
  } finally {
    isProcessing = false;
    $('chatSend').disabled = false;
  }
}

// --- Tema e idioma ---

function applyDark() {
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('light', !dark);
  localStorage.setItem('dark', String(dark));
}

function applyPalette(pal) {
  if (!PALETTES.some((p) => p.id === pal)) pal = 'lime';
  currentPalette = pal;
  localStorage.setItem('portfolio_palette', pal);
  document.documentElement.setAttribute('data-palette', pal);
  renderPalettePicker();
}

function renderPalettePicker() {
  const container = $('palettePicker');
  if (!container) return;
  container.innerHTML = PALETTES.map((p) => `
    <button type="button" class="pal-dot ${p.id === currentPalette ? 'active' : ''}" 
            data-palette="${p.id}" title="${p.name}" aria-label="Paleta ${p.name}"
            style="--dot-color:${p.color}">
    </button>
  `).join('');
  container.querySelectorAll('.pal-dot').forEach((btn) => {
    btn.addEventListener('click', () => applyPalette(btn.dataset.palette));
  });
}

function renderExp(list) {
  $('expList').innerHTML = list.map((j) => `
    <article class="job${j.lead ? ' lead-job' : ''}">
      <div class="job-h">
        <div class="job-t">${esc(j.role)}${j.note ? ` <small>(${esc(j.note)})</small>` : ''}</div>
        <div class="job-d">${esc(j.date)}</div>
      </div>
      <div class="job-c">${esc(j.company)}</div>
      <p>${fmt(j.desc)}</p>
      ${j.stats ? `<div class="stats">${j.stats.map(([v, k]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(k)}</span></div>`).join('')}</div>` : ''}
    </article>`).join('');
}

function renderProj(list) {
  $('projList').innerHTML = list.map((p) => `
    <article class="proj-card">
      <div class="proj-top">
        <h3 class="proj-title">${esc(p.t)}</h3>
        ${p.tech ? `<div class="proj-tech">${esc(p.tech)}</div>` : ''}
      </div>
      <p class="proj-desc">${esc(p.d)}</p>
      <div class="proj-actions">
        ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener" class="proj-btn" aria-label="Ver repositorio de ${esc(p.t)}">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>${esc(T[lang].proj_code || 'Código')}</span>
        </a>` : ''}
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" class="proj-btn" aria-label="Ver demo web de ${esc(p.t)}">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
          <span>${esc(T[lang].proj_demo || 'Web')}</span>
        </a>` : ''}
      </div>
    </article>`).join('');
}

function renderEdu(list) {
  $('eduList').innerHTML = list.map((e) => `
    <div class="edu">
      <div><b>${esc(e.t)}</b><div class="job-c">${esc(e.d)}</div></div>
      <div class="job-d">${esc(e.y)}</div>
    </div>`).join('');
}

function applyLang() {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  const t = T[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = t[el.dataset.i18n];
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const v = t[el.dataset.i18nPh];
    if (typeof v === 'string') el.placeholder = v;
  });

  $('langBtn').textContent = lang === 'es' ? 'EN' : 'ES';
  renderExp(t.exp);
  renderProj(t.proj);
  renderEdu(t.edu);
  renderSuggestions(t.chat_suggestions);
  restoreChat();
}

function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const tick = () => {
    const ahora = new Date();
    el.textContent = fmt.format(ahora);
    el.setAttribute('datetime', ahora.toISOString());
  };
  tick();
  setInterval(tick, 1000);
}

// Halo ambiental suave reactivo al cursor (sin rastro residual)
function startAmbientSpotlight() {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  let scheduled = false;
  let clientX = window.innerWidth / 2;
  let clientY = window.innerHeight / 3;

  function update() {
    root.style.setProperty('--mouse-x', `${clientX}px`);
    root.style.setProperty('--mouse-y', `${clientY}px`);
    root.style.setProperty('--spotlight-opacity', '1');
    scheduled = false;
  }

  window.addEventListener('pointermove', (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    root.style.setProperty('--spotlight-opacity', '0');
  });
}

function init() {
  loadChatHistory();
  startClock();
  applyDark();
  applyPalette(currentPalette);
  applyLang();
  startAmbientSpotlight();

  $('themeBtn').addEventListener('click', () => { dark = !dark; applyDark(); });
  $('langBtn').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; applyLang(); });
  $('chatForm').addEventListener('submit', (e) => { e.preventDefault(); sendMsg(); });
  $('chatClear').addEventListener('click', clearChat);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
