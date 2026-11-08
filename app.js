// Contenido bilingüe. Fuentes: CV vigente (iDiagoValeta/resume, 2026-09-02) y, para los
// proyectos, los README y descripciones de los repositorios públicos (2026-11-07).
const T = {
  es: {
    skip: 'Saltar al contenido', cv: 'Descargar CV', cv_full: 'Ver el CV completo',
    lang_label: 'Switch to English', theme_label: 'Cambiar tema',
    role: 'AI Engineer en Inditex',
    nav_about: 'Sobre mí', nav_chat: 'Pregúntale a mi CV', nav_chat_short: 'Pregúntale', nav_exp: 'Experiencia', nav_proj: 'Proyectos', nav_contact: 'Contacto',
    lede: 'Llevo sistemas de IA y NLP del prototipo a producción.',
    now: [
      ['Ahora', 'AI Engineer en Inditex, A Coruña.'],
      ['Construyo', 'Herramientas open source.'],
      ['Me interesa', 'Modelos locales, privacidad y agentes autónomos.'],
    ],
    about: [
      'Creo que la buena tecnología es la que se nota poco y resuelve mucho. Me atraen los modelos que corren donde están los datos, los agentes que saben cuándo parar y preguntar, y las herramientas que evitan reinventar lo que ya existe.',
      'Pasé varios años enseñando matemáticas, física e historia de la computación, y me quedó una convicción: entender a fondo cómo funciona algo es la mejor forma de construir lo siguiente. Por eso no me caso con ninguna herramienta y elijo la que mejor resuelve cada problema.',
      'Graduado en Ingeniería Informática por la UPV, hoy soy **AI Engineer en Inditex**, en A Coruña, después de llevar sistemas de IA a producción como **Technical Lead en Auro AI** y en **Grupo CEU**. Fuera del trabajo construyo herramientas open source y mantengo **La Terminal**, un diario tecnológico que se publica solo cada día.',
    ],
    chat_title: 'Asistente con el contexto de mi CV',
    chat_lead: 'Responde únicamente con información real de mi trayectoria, en el idioma en que le escribas.',
    chat_ph: 'Escribe tu pregunta', chat_send: 'Enviar', chat_clear: 'Limpiar',
    chat_note: 'Máximo 6 preguntas por minuto y 40 al día.',
    chat_welcome: 'Hola. Pregúntame por la experiencia, los proyectos o la formación de Ignacio.',
    chat_limit: 'Has alcanzado el límite de preguntas por ahora. Vuelve a intentarlo más tarde o escribe a nadiva1243@gmail.com.',
    chat_fail: 'No he podido responder ahora mismo. Inténtalo de nuevo en unos segundos.',
    exp: [
      { date: 'Desde sep 2026', role: 'AI Engineer', org: 'Inditex',
        desc: '' },
      { date: 'Jun a sep 2026', role: 'Technical Lead', org: 'Auro AI',
        desc: 'Liderazgo técnico de un asistente de IA que analiza facturas de energía y telecomunicaciones por WhatsApp y cambia al usuario a la tarifa más competitiva del mercado español. Responsable del back-end: un **monorepo de seis aplicaciones** con **zero-downtime deployments** y rollback automático. Definí los estándares de ingeniería de un equipo de cuatro personas.' },
      { date: 'Oct 2025 a jun 2026', role: 'AI & Back-End Developer', org: 'Grupo Educativo CEU',
        desc: 'Desarrollo y despliegue de **GPT-CEU**, asistente de IA generativa para las **tres universidades del grupo** en web y WhatsApp, con routing por perfil para estudiantes, profesorado y personal. Integración de LLMs con las fuentes de datos institucionales mediante pipelines de NLP, con información académica en tiempo real **en producción**.' },
      { date: 'Feb a jun 2025', role: 'Museum Guide & Technical Workshop Instructor', org: 'Museo de Informática, UPV',
        desc: 'Diseño e impartición de talleres de robótica, criptografía y programación, y visitas guiadas sobre la historia de la computación.' },
      { date: 'Ene 2022 a ene 2025', role: 'Private Tutor', org: 'Superprof',
        desc: 'Formación personalizada en matemáticas, física y dibujo técnico para secundaria y bachillerato.' },
    ],
    proj: [
      { t: 'MonkeyGrab', img: 'images/projects/monkeygrab.jpg', video: 'videos/monkeygrab.mp4', alt: 'Respuesta de MonkeyGrab citando el documento y la página de origen',
        d: 'Un NotebookLM de código abierto que funciona en local: consulta tus documentos con modelos abiertos sin que ningún dato salga de tu equipo. Genera resúmenes, esquemas y tests, entiende texto e imágenes en castellano, inglés y valenciano, y combina hybrid search con reranking. Trabajo de fin de grado.',
        links: [['Código', 'https://github.com/iDiagoValeta/localOllamaRAG'], ['Memoria del TFG', 'https://github.com/iDiagoValeta/academic-monkeygrab']] },
      { t: 'mouseketool', img: 'images/projects/mouseketool.jpg', video: 'videos/mouseketool.mp4', alt: 'Veredicto de mouseketool con ventajas e inconvenientes de cada candidato',
        d: 'Antes de construir, comprueba si ya existe. Un MCP server y una Agent Skill que localizan proyectos open source en GitHub, revisan su código y emiten un veredicto: reutilizar, adaptar, partir de uno o construir desde cero.',
        links: [['Código', 'https://github.com/iDiagoValeta/mouseketool']] },
      { t: 'La Terminal', img: 'images/projects/la-terminal.jpg', video: 'videos/la-terminal.mp4', alt: 'Portada de La Terminal',
        d: 'Publicación tecnológica en español generada de forma autónoma cada día: un pipeline de LLMs recopila fuentes, elimina duplicados, selecciona y redacta las noticias, y las publica sin servidor ni base de datos.',
        links: [['Web', 'https://idiagovaleta.github.io/automated-news/'], ['Código', 'https://github.com/iDiagoValeta/automated-news']] },
      { t: 'jev-decision-gate', img: 'images/projects/jev-decision-gate.jpg', video: 'videos/jev-decision-gate.mp4', alt: 'jev-decision-gate bloqueando una acción irreversible',
        d: 'Permission gate para coding agents: bloquea acciones irreversibles antes de su ejecución, aprueba automáticamente el trabajo rutinario y solo escala a una persona cuando es necesario. Incluye una variante que decide con un modelo local.',
        links: [['Código', 'https://github.com/iDiagoValeta/jev-decision-gate'], ['Variante local', 'https://github.com/iDiagoValeta/ollaya-decision-gate']] },
    ],
    more_proj: 'Más proyectos en GitHub',
    contact_big: '¿Hablamos?',
    contact_lead: 'Abierto a conversar sobre proyectos interesantes.',
  },
  en: {
    skip: 'Skip to content', cv: 'Download CV', cv_full: 'View the full CV',
    lang_label: 'Cambiar a español', theme_label: 'Toggle theme',
    role: 'AI Engineer at Inditex',
    nav_about: 'About', nav_chat: 'Ask my CV', nav_chat_short: 'Ask', nav_exp: 'Experience', nav_proj: 'Projects', nav_contact: 'Contact',
    lede: 'I take AI and NLP systems from prototype to production.',
    now: [
      ['Now', 'AI Engineer at Inditex, A Coruña.'],
      ['Building', 'Open source tools.'],
      ['Into', 'Local models, privacy and autonomous agents.'],
    ],
    about: [
      'I believe good technology is the kind you barely notice and that solves a lot. I am drawn to models that run where the data lives, agents that know when to stop and ask, and tools that avoid reinventing what already exists.',
      'I spent several years teaching mathematics, physics and the history of computing, and it left me with a conviction: understanding deeply how something works is the best way to build the next thing. That is why I am not wedded to any tool and pick whichever solves each problem best.',
      'A Computer Engineering graduate from UPV, I am now an **AI Engineer at Inditex**, in A Coruña, after taking AI systems to production as **Technical Lead at Auro AI** and at **Grupo CEU**. Outside work I build open source tools and run **La Terminal**, a tech digest that publishes itself every day.',
    ],
    chat_title: 'An assistant with the context of my CV',
    chat_lead: 'It answers only with real information from my career, in the language you write in.',
    chat_ph: 'Type your question', chat_send: 'Send', chat_clear: 'Clear',
    chat_note: 'Up to 6 questions per minute and 40 per day.',
    chat_welcome: 'Hi. Ask me about Ignacio’s experience, projects or education.',
    chat_limit: 'You have reached the question limit for now. Try again later or write to nadiva1243@gmail.com.',
    chat_fail: 'I could not answer right now. Try again in a few seconds.',
    exp: [
      { date: 'Since Sep 2026', role: 'AI Engineer', org: 'Inditex',
        desc: '' },
      { date: 'Jun to Sep 2026', role: 'Technical Lead', org: 'Auro AI',
        desc: 'Technical leadership of an AI assistant that analyses energy and telecom bills over WhatsApp and switches users to the most competitive tariff in Spain. Owned the back-end: a **six-app monorepo** with **zero-downtime deployments** and automatic rollback. Defined the engineering standards for a team of four.' },
      { date: 'Oct 2025 to Jun 2026', role: 'AI & Back-End Developer', org: 'Grupo Educativo CEU',
        desc: 'Built and deployed **GPT-CEU**, a generative AI assistant serving the group’s **three universities** over web and WhatsApp, with role-based routing for students, faculty and staff. Integrated LLMs with institutional data sources through NLP pipelines, delivering real-time academic information **in production**.' },
      { date: 'Feb to Jun 2025', role: 'Museum Guide & Technical Workshop Instructor', org: 'Museo de Informática, UPV',
        desc: 'Designed and delivered workshops on robotics, cryptography and programming, and led guided tours on the history of computing.' },
      { date: 'Jan 2022 to Jan 2025', role: 'Private Tutor', org: 'Superprof',
        desc: 'Personalised tuition in mathematics, physics and technical drawing for secondary and pre-university students.' },
    ],
    proj: [
      { t: 'MonkeyGrab', img: 'images/projects/monkeygrab.jpg', video: 'videos/monkeygrab.mp4', alt: 'A MonkeyGrab answer citing the source document and page',
        d: 'An open source, local NotebookLM: query your documents with open models without any data leaving your machine. It generates summaries, outlines and quizzes, understands text and images in Spanish, English and Valencian, and combines hybrid search with reranking. Final degree project.',
        links: [['Code', 'https://github.com/iDiagoValeta/localOllamaRAG'], ['Thesis', 'https://github.com/iDiagoValeta/academic-monkeygrab']] },
      { t: 'mouseketool', img: 'images/projects/mouseketool.jpg', video: 'videos/mouseketool.mp4', alt: 'A mouseketool verdict with pros and cons per candidate',
        d: 'Before you build it, check it exists. An MCP server and Agent Skill that find open source projects on GitHub, review their code and deliver a verdict: reuse, adapt, use as a base or build from scratch.',
        links: [['Code', 'https://github.com/iDiagoValeta/mouseketool']] },
      { t: 'La Terminal', img: 'images/projects/la-terminal.jpg', video: 'videos/la-terminal.mp4', alt: 'La Terminal front page',
        d: 'A Spanish tech publication generated autonomously every day: an LLM pipeline collects sources, removes duplicates, curates and writes the stories, and publishes them with no server or database.',
        links: [['Website', 'https://idiagovaleta.github.io/automated-news/'], ['Code', 'https://github.com/iDiagoValeta/automated-news']] },
      { t: 'jev-decision-gate', img: 'images/projects/jev-decision-gate.jpg', video: 'videos/jev-decision-gate.mp4', alt: 'jev-decision-gate blocking an irreversible action',
        d: 'A permission gate for coding agents: blocks irreversible actions before they run, auto-approves routine work and only escalates to a human when it matters. Includes a variant that decides with a local model.',
        links: [['Code', 'https://github.com/iDiagoValeta/jev-decision-gate'], ['Local variant', 'https://github.com/iDiagoValeta/ollaya-decision-gate']] },
    ],
    more_proj: 'More projects on GitHub',
    contact_big: 'Let’s talk',
    contact_lead: 'Open to conversations about interesting projects.',
  },
};

// Se cambia la clave cuando el contexto del asistente cambia: un historial antiguo guardado en el
// navegador se reenvía al modelo y le hace repetir respuestas desactualizadas.
const STORAGE_KEY = 'portfolio_chat_history_v4';
const CHAT_TIMEOUT = 60000;

let lang = localStorage.getItem('lang') === 'en' ? 'en' : 'es';
let chatHistory = [];
let isProcessing = false;

const $ = (id) => document.getElementById(id);
const motion = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Enfasis controlado: **texto** pasa a <strong> despues de escapar, nunca antes.
// Cada mención de una empresa o de La Terminal enlaza a su web. GPT-CEU no cuenta: es el proyecto, no la institución.
const ORGS = [
  ['Grupo Educativo CEU', 'https://www.ceu.es/'], ['Grupo CEU', 'https://www.ceu.es/'],
  ['Auro AI', 'https://aurobot.ai/'], ['Inditex', 'https://www.inditex.com/'],
  ['La Terminal', 'https://idiagovaleta.github.io/automated-news/'],
];
const ORG_RE = new RegExp(`(?<![\\w-])(${ORGS.map(([n]) => n).join('|')})(?![\\w-])`, 'g');
const linkOrgs = (html) => html.replace(ORG_RE, (name) => `<a class="org-link" href="${ORGS.find(([n]) => n === name)[1]}" target="_blank" rel="noopener">${name}</a>`);
const fmt = (s) => linkOrgs(esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'));
const external = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';

// --- Chat: sanitizado, markdown e historial ---

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

// role: 'user' | 'bot' | 'error'. El texto del usuario entra por textContent, nunca como HTML.
function appendMsg(role, content, smooth = false) {
  const msgs = $('chatMsgs');
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'msg-user' : 'msg-bot'}${role === 'error' ? ' msg-error' : ''}`;
  div.innerHTML = '<div class="msg-body"></div>';
  const body = div.querySelector('.msg-body');
  if (role === 'user') {
    const p = document.createElement('p');
    p.textContent = content;
    body.appendChild(p);
  } else {
    body.innerHTML = content;
  }
  msgs.appendChild(div);
  if (smooth) msgs.scrollTo({ top: msgs.scrollHeight, behavior: motion() });
  else msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function clearChat() {
  chatHistory = [];
  saveChatHistory();
  restoreChat();
  $('chatInput').focus();
}

function restoreChat() {
  $('chatMsgs').innerHTML = '';
  if (chatHistory.length === 0) {
    appendMsg('bot', `<p>${esc(T[lang].chat_welcome)}</p>`);
    return;
  }
  chatHistory.forEach((msg) => {
    const text = msg?.content || '';
    if (!text) return;
    if (msg.role === 'user') appendMsg('user', text);
    if (msg.role === 'assistant') appendMsg('bot', sanitizeHtml(mdToHtml(text)));
  });
}

async function requestGemini(userMessage, onToken) {
  chatHistory.push({ role: 'user', content: userMessage });

  // El servidor fija modelo, parámetros y contexto (config.js); aquí solo va la conversación.
  const requestBody = { messages: chatHistory };

  let response;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT);
    try {
      response = await fetch('/api/chat', {
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
    // Reintenta una vez solo si el servidor pide una espera corta; un tope diario no se arregla esperando.
    const retryAfter = Number(response.headers.get('Retry-After')) || 0;
    if (response.status === 429 && attempt === 0 && retryAfter > 0 && retryAfter <= 20) {
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      continue;
    }
    break;
  }

  if (response.status === 429) throw new Error(T[lang].chat_limit);

  if (!response.ok) {
    let message = T[lang].chat_fail;
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
        if (json.error) throw new Error(json.error.message || T[lang].chat_fail);
        const token = json.choices?.[0]?.delta?.content;
        if (token) { fullText += token; onToken(fullText); }
      } catch (error) {
        if (error.message && error.message !== 'Unexpected end of JSON input') throw error;
      }
    }
  }

  if (!fullText) throw new Error(T[lang].chat_fail);

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
  appendMsg('user', userText, true);

  // Los puntos siguen mientras el modelo razona y se sustituyen por el texto con el primer token.
  const live = appendMsg('bot', '<div class="typing"><span></span><span></span><span></span></div>');
  const body = live.querySelector('.msg-body');

  try {
    await requestGemini(userText, (fullText) => {
      body.innerHTML = sanitizeHtml(mdToHtml(fullText));
      $('chatMsgs').scrollTop = $('chatMsgs').scrollHeight;
    });
  } catch (error) {
    live.remove();
    if (chatHistory.at(-1)?.role === 'user') { chatHistory.pop(); saveChatHistory(); }
    appendMsg('error', `<p>${esc(error.name === 'AbortError' ? T[lang].chat_fail : (error.message || T[lang].chat_fail))}</p>`);
  } finally {
    isProcessing = false;
    $('chatSend').disabled = false;
  }
}

// --- Tema ---

function applyDark(dark) {
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.classList.toggle('light', !dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#221a10' : '#f1e9dd');
}

function toggleDark() {
  const dark = !document.documentElement.classList.contains('dark');
  applyDark(dark);
  try { localStorage.setItem('dark', String(dark)); } catch (_e) {}
}


// --- Secciones ---


function renderAbout(paragraphs, now) {
  $('aboutText').innerHTML = paragraphs.map((p) => `<p>${fmt(p)}</p>`).join('');
  $('nowList').innerHTML = now.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${linkOrgs(esc(v))}</dd></div>`).join('');
}

function renderExp(list) {
  $('expList').innerHTML = list.map((j) => `
    <li class="item">
      <div class="item-side">${esc(j.date)}</div>
      <div>
        <h3>${esc(j.role)}<span class="org">, ${linkOrgs(esc(j.org))}</span></h3>
        ${j.desc ? `<p>${fmt(j.desc)}</p>` : ''}
      </div>
    </li>`).join('');
}

// Los vídeos de los proyectos solo se descargan y reproducen mientras se ven, y solo el más
// visible: dos a la vez bajaban Chrome a 30 fps en pantallas retina. Con reduced motion se
// queda el fotograma fijo (poster) y no se descarga nada.
const videoRatios = new Map();
const videoObserver = 'IntersectionObserver' in window && new IntersectionObserver((entries) => {
  entries.forEach(({ target, intersectionRatio }) => videoRatios.set(target, intersectionRatio));
  const [top] = [...videoRatios].filter(([v, r]) => v.isConnected && r >= 0.25).sort((a, b) => b[1] - a[1]);
  videoRatios.forEach((_r, v) => { if (v !== top?.[0]) v.pause(); });
  top?.[0].play().catch(() => {});
}, { threshold: [0, 0.25, 0.5, 0.75, 1] });

function renderProj(list) {
  // El vídeo ocupa todo el ancho y lleva directamente al repositorio del proyecto.
  $('projList').innerHTML = list.map((p) => {
    const main = p.links[0]?.[1];
    const code = (p.links.find(([l]) => l === 'Código' || l === 'Code') || p.links[0])[1];
    return `
    <li class="project">
      <a class="shot" href="${esc(code)}" target="_blank" rel="noopener" aria-label="${esc(p.t)}">
        <video src="${esc(p.video)}" poster="${esc(p.img)}" aria-label="${esc(p.alt)}" width="880" height="495" muted loop playsinline preload="none"></video>
      </a>
      <div class="project-body">
        <h3>${main ? `<a href="${esc(main)}"${external(main)}>${esc(p.t)}</a>` : esc(p.t)}</h3>
        <p>${esc(p.d)}</p>
        <p class="links">${p.links.map(([l, u]) => `<a href="${esc(u)}"${external(u)}>${esc(l)}</a>`).join('')}</p>
      </div>
    </li>`;
  }).join('');
  if (!videoObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  videoObserver.disconnect();
  videoRatios.clear();
  $('projList').querySelectorAll('video').forEach((v) => { v.muted = true; videoObserver.observe(v); });
}


function applyLang() {
  try { localStorage.setItem('lang', lang); } catch (_e) {}
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
  $('langBtn').setAttribute('aria-label', t.lang_label);
  $('themeBtn').setAttribute('aria-label', t.theme_label);
  renderAbout(t.about, t.now);
  $('roleLine').innerHTML = linkOrgs(esc(t.role));
  renderExp(t.exp);
  renderProj(t.proj);
  restoreChat();
}

// Marca en el índice lateral la sección que se está leyendo. Solo reacciona al scroll.
function trackSections() {
  // Índice lateral en escritorio y barra superior en móvil y tableta: los dos marcan la misma sección.
  const links = [...document.querySelectorAll('.toc a, .topnav-links a')];
  const ids = [...new Set(links.map((a) => a.getAttribute('href').slice(1)))];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const on = a.getAttribute('href') === `#${entry.target.id}`;
        a.classList.toggle('active', on);
        // En la barra móvil solo se desplaza la fila de enlaces, nunca la página
        const row = a.closest('.topnav-links');
        if (on && row) row.scrollTo({ left: a.offsetLeft - row.offsetLeft - 16, behavior: motion() });
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  ids.forEach((id) => { const el = $(id); if (el) observer.observe(el); });
}

// --- Fondo: ondas desde puntos invisibles ---
// Seis emisores en posiciones al azar lanzan anillos ondulados cada 2,5 a 6 s, al azar.
// Cada anillo tiene su velocidad, alcance y deformación propios, y su contorno ondula
// mientras crece. El bucle se para solo con la pestaña oculta (requestAnimationFrame)
// y con reduced motion se dibuja un único fotograma quieto.
function startWaves() {
  const canvas = $('waves');
  const ctx = canvas.getContext('2d');
  const rand = (a, b) => a + Math.random() * (b - a);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0; let h = 0; let color = '';
  const readColor = () => { color = getComputedStyle(document.documentElement).getPropertyValue('--wave').trim(); };
  // Resolución 1:1 aunque la pantalla sea de alta densidad: son líneas finas y tenues de fondo,
  // y un lienzo retina de 2560x1440 bajaba a 25 fps con la CPU lenta.
  const resize = () => {
    const dpr = 1;
    w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const emitters = Array.from({ length: 6 }, () => ({ x: Math.random(), y: Math.random(), next: rand(0, 6) }));
  const rings = [];
  const spawn = (e, t, age = 0) => {
    const max = rand(260, 820);
    rings.push({
      x: e.x, y: e.y, born: t - age, speed: rand(28, 70), max,
      waves: Array.from({ length: 3 }, () => ({ f: Math.round(rand(3, 11)), a: rand(0.012, 0.05), p: rand(0, 6.28), s: rand(-1.4, 1.4) })),
    });
  };
  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color; ctx.lineWidth = 1;
    for (let i = rings.length - 1; i >= 0; i -= 1) {
      const r = rings[i];
      const radius = (t - r.born) * r.speed;
      if (radius > r.max) { rings.splice(i, 1); continue; }
      const life = radius / r.max;
      ctx.globalAlpha = Math.min(1, life * 8) * (1 - life) * 0.9;
      const cx = r.x * w; const cy = r.y * h;
      ctx.beginPath();
      for (let k = 0; k <= 96; k += 1) {
        const a = (k / 96) * Math.PI * 2;
        let d = 1;
        for (const wv of r.waves) d += wv.a * Math.sin(wv.f * a + wv.p + wv.s * t);
        const rr = radius * d;
        if (k === 0) ctx.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
        else ctx.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  readColor(); resize();
  new MutationObserver(() => { readColor(); if (still) draw(0); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  addEventListener('resize', () => { resize(); if (still) draw(0); });
  if (still) {
    emitters.forEach((e) => { for (let n = 0; n < 3; n += 1) spawn(e, 0, rand(1, 10)); });
    draw(0);
    return;
  }
  // Arranca con ondas ya en marcha para que el fondo no aparezca vacío
  emitters.forEach((e) => { for (let n = 0; n < 2; n += 1) spawn(e, 0, rand(0, 12)); });
  // Se redibuja a unos 30 fps: las ondas crecen despacio y así el scroll se queda casi todo el tiempo.
  let last = null; let clock = 0;
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (last !== null && now - last < 30) return;
    const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.1);
    last = now; clock += dt;
    for (const e of emitters) {
      e.next -= dt;
      if (e.next <= 0) { spawn(e, clock); e.next = rand(2.5, 6); }
    }
    draw(clock);
  };
  requestAnimationFrame(frame);
}

function init() {
  applyDark(document.documentElement.classList.contains('dark'));
  loadChatHistory();
  applyLang();
  trackSections();
  startWaves();

  $('themeBtn').addEventListener('click', toggleDark);
  $('langBtn').addEventListener('click', () => { lang = lang === 'es' ? 'en' : 'es'; applyLang(); });
  $('chatForm').addEventListener('submit', (e) => { e.preventDefault(); sendMsg(); });
  $('chatClear').addEventListener('click', clearChat);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
