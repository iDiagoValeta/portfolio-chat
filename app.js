import { PORTFOLIO_INFO } from './config.js';

const T = {
  es: {
    nav: ['Inicio', 'Sobre mí', 'Experiencia', 'Habilidades', 'Proyectos', 'Contacto'],
    hero_eyebrow: '// AI Engineer · Valencia, España',
    hero_role: 'LLM Fine-tuning · Computer Vision · Multi-Agente',
    hero_desc: 'Ingeniero especializado en adaptar redes neuronales a problemas reales — desde el fine-tuning hasta el despliegue en producción.',
    hero_btn1: 'Ver proyectos',
    hero_btn2: 'Chat IA',
    about_title: 'Sobre mí',
    about_p1: 'Ingeniero Informático por la <strong>Universitat Politècnica de València (UPV)</strong>, especializado en IA aplicada. Mi trabajo consiste en adaptar redes neuronales — LLMs y sistemas de Computer Vision — para resolver problemas concretos mediante fine-tuning y optimización arquitectural.',
    about_p2: 'Actualmente trabajo como <strong>AI & Back-End Developer en CEU Educational Group</strong>, donde he desarrollado y desplegado <strong>GPT-CEU</strong>, un asistente generativo con OpenAI API y RAG pipelines que optimiza flujos académicos y administrativos.',
    stat1: 'En producción',
    stat2: 'Repos GitHub',
    stat3: 'Certificaciones',
    stat4: 'Idiomas',
    exp_title: 'Experiencia',
    exp: [
      { date: 'Oct 2025 – Presente', role: 'AI & Back-End Developer', company: 'CEU Educational Group · Valencia', desc: 'Desarrollo y despliegue de GPT-CEU — asistente generativo con RAG pipelines. Integración de LLMs con fuentes de datos institucionales para staff y estudiantes.' },
      { date: 'Feb 2025 – Jun 2025', role: 'Instructor de Talleres & Guía', company: 'Museo de Informática UPV · Valencia', desc: 'Talleres técnicos de Robótica, Criptografía y Programación. Comunicación técnica adaptada a audiencias diversas.' },
      { date: 'Ene 2022 – Ene 2025', role: 'Tutor Particular', company: 'Superprof · Valencia', desc: 'Formación personalizada en Matemáticas, Física y Dibujo Técnico a nivel preuniversitario.' },
    ],
    skills_title: 'Habilidades',
    skills: ['LLMs & NLP', 'Computer Vision', 'ML Frameworks', 'MLOps & Tools', 'Programación'],
    proj_title: 'Proyectos destacados',
    proj_live: 'Ver en web',
    proj_gh: 'Ver en GitHub',
    proj_hf: 'Ver en HuggingFace',
    project_cards: [
      {
        title: 'GPT-CEU',
        desc: 'Asistente generativo desplegado en producción para el CEU Educational Group. Integra OpenAI API con RAG pipelines sobre fuentes de datos institucionales, optimizando flujos académicos y administrativos para toda la comunidad universitaria.',
      },
      {
        title: 'localOllamaRAG',
        desc: 'Trabajo de Fin de Grado. Solución RAG on-premises open-source para extracción de información relevante en documentos. Búsqueda híbrida (semántica + keyword) sin dependencias cloud.',
      },
      {
        title: 'Llama 3.2 1B — ORPO Fine-tuning',
        desc: 'Pipeline de fine-tuning con ORPO preference optimization sobre Llama 3.2 1B. Tutorial completo con notebook y modelo GGUF publicado en HuggingFace Hub listo para despliegue con Ollama.',
      },
      {
        title: 'Reconocimiento ASL en tiempo real',
        desc: 'Clasificador ASL en tiempo real usando MediaPipe para extracción de landmarks y Vision Transformers (ViT) con TensorFlow/Keras. Inferencia live por webcam y transfer learning sobre un dataset personalizado.',
      },
      {
        title: 'Pipeline documental multi-agente',
        desc: 'Sistema multi-agente con CrewAI que automatiza la creación de informes PDF. Agentes especializados en investigación, análisis y verificación con flujo coordinado y exportación final vía ReportLab.',
      },
    ],
    certs_title: 'Certificaciones',
    cert_cards: [
      'Machine Learning y Ciencia de Datos',
      'Python para Ciencia de Datos',
      'Fundamentos de Linux',
      'SQL y R para Análisis de Datos',
      'Fundamentos Matemáticos de ML',
    ],
    cert_more: '+ más en curso',
    chat_title: 'Chat IA',
    chat_sub: 'Chat con contexto completo sobre mi perfil — desarrollado con Gemini 2.5 Flash.',
    chat_head_title: 'Asistente IA · Ignacio Diago',
    chat_head_sub: 'Asistente IA · listo',
    chat_user_avatar: 'Tú',
    chat_welcome: 'Hola, soy el asistente de Ignacio. Tengo contexto completo sobre su perfil — experiencia, proyectos, habilidades y educación. ¿Qué te gustaría saber?',
    chat_placeholder: 'Pregunta sobre experiencia, proyectos, habilidades...',
    clear_chat: 'Limpiar chat',
    send_label: 'Enviar',
    suggestions: ['¿En qué proyectos trabaja?', '¿Qué tecnologías domina?', '¿Cuál es su experiencia?', '¿Disponible para prácticas?'],
    contact_title: 'Contacto',
    contact_sub: '¿Interesado en colaborar? No dudes en escribir.',
    footer: '© 2025 Ignacio Diago Valeta · AI Engineer',
    cv_btn: 'CV',
    chips: ['LLM Fine-tuning · PEFT/QLoRA', 'Computer Vision · ViT', 'Multi-Agente'],
    proj_badge_prod: 'Producción',
    proj_badge_tfg: 'TFG',
    edu_label: '// EDUCACIÓN',
    edu_degree: 'B.Sc. Ingeniería Informática',
    edu_uni: 'Universitat Politècnica de València · 2022–2026',
    edu_desc: 'Especialización en Computación — algoritmos, IA, Machine Learning y arquitectura de software.',
    lang_label: '// IDIOMAS',
    lang_names: ['Español', 'English', 'Valencià'],
    lang_native: 'Nativo',
    lang_b2: 'B2 Cambridge',
    lang_val: 'Nativo · GVA',
    clock_label: '// HORA LOCAL',
    theme_label: 'Cambiar tema',
    top_label: 'Volver arriba',
  },
  en: {
    nav: ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'],
    hero_eyebrow: '// AI Engineer · Valencia, Spain',
    hero_role: 'LLM Fine-tuning · Computer Vision · Multi-Agent',
    hero_desc: 'Engineer specialized in adapting neural networks to real-world problems — from fine-tuning all the way to production deployment.',
    hero_btn1: 'View projects',
    hero_btn2: 'AI Chat',
    about_title: 'About me',
    about_p1: 'Computer Engineer from the <strong>Universitat Politècnica de València (UPV)</strong>, specializing in applied AI. My work focuses on adapting neural networks — LLMs and Computer Vision systems — to solve concrete problems through fine-tuning and architectural optimization.',
    about_p2: 'Currently working as <strong>AI & Back-End Developer at CEU Educational Group</strong>, where I developed and deployed <strong>GPT-CEU</strong>, a generative AI assistant using OpenAI API and RAG pipelines that streamlines academic and administrative workflows.',
    stat1: 'In production',
    stat2: 'GitHub repos',
    stat3: 'Certifications',
    stat4: 'Languages',
    exp_title: 'Experience',
    exp: [
      { date: 'Oct 2025 – Present', role: 'AI & Back-End Developer', company: 'CEU Educational Group · Valencia', desc: 'Developed and deployed GPT-CEU — a generative assistant with RAG pipelines. Integrated LLMs with institutional data sources for staff and students.' },
      { date: 'Feb 2025 – Jun 2025', role: 'Workshop Instructor & Museum Guide', company: 'UPV Informatics Museum · Valencia', desc: 'Technical workshops on Robotics, Cryptography and Programming. Adapted technical communication to diverse audiences.' },
      { date: 'Jan 2022 – Jan 2025', role: 'Private Tutor', company: 'Superprof · Valencia', desc: 'Tailored one-on-one instruction in Mathematics, Physics and Technical Drawing to pre-university students.' },
    ],
    skills_title: 'Skills',
    skills: ['LLMs & NLP', 'Computer Vision', 'ML Frameworks', 'MLOps & Tools', 'Programming'],
    proj_title: 'Featured projects',
    proj_live: 'View online',
    proj_gh: 'View on GitHub',
    proj_hf: 'View on HuggingFace',
    project_cards: [
      {
        title: 'GPT-CEU',
        desc: 'Production generative assistant for CEU Educational Group. It combines the OpenAI API with RAG pipelines over institutional data sources, streamlining academic and administrative workflows for the university community.',
      },
      {
        title: 'localOllamaRAG',
        desc: 'Final degree project. Open-source, on-premises RAG solution for extracting relevant information from documents. Hybrid search (semantic + keyword) with no cloud dependencies.',
      },
      {
        title: 'Llama 3.2 1B — ORPO Fine-tuning',
        desc: 'Fine-tuning pipeline using ORPO preference optimization on Llama 3.2 1B. Complete tutorial with notebook and a GGUF model published on HuggingFace Hub, ready for Ollama deployment.',
      },
      {
        title: 'ASL Real-time Gesture Recognition',
        desc: 'Real-time ASL classifier using MediaPipe for landmark extraction and Vision Transformers (ViT) with TensorFlow/Keras. Live webcam inference and transfer learning on a custom dataset.',
      },
      {
        title: 'Multi-Agent Document Pipeline',
        desc: 'Multi-agent CrewAI system that automates PDF report generation. Specialized research, analysis and verification agents coordinate the workflow and export the final document through ReportLab.',
      },
    ],
    certs_title: 'Certifications',
    cert_cards: [
      'Machine Learning & Data Science',
      'Python for Data Science',
      'Linux Fundamentals',
      'SQL & R for Data Analysis',
      'Mathematical Foundations of ML',
    ],
    cert_more: '+ more in progress',
    chat_title: 'AI Chat',
    chat_sub: 'Chat with full profile context — powered by Gemini 2.5 Flash.',
    chat_head_title: 'AI Assistant · Ignacio Diago',
    chat_head_sub: 'AI assistant · ready',
    chat_user_avatar: 'You',
    chat_welcome: "Hi, I'm Ignacio's assistant. I have full context about his profile — experience, projects, skills and education. What would you like to know?",
    chat_placeholder: 'Ask about experience, projects, skills...',
    clear_chat: 'Clear chat',
    send_label: 'Send',
    suggestions: ['What projects is he working on?', 'Which technologies does he know?', 'What is his experience?', 'Available for internships?'],
    contact_title: 'Contact',
    contact_sub: 'Interested in collaborating? Feel free to reach out.',
    footer: '© 2025 Ignacio Diago Valeta · AI Engineer',
    cv_btn: 'CV',
    chips: ['LLM Fine-tuning · PEFT/QLoRA', 'Computer Vision · ViT', 'Multi-Agent'],
    proj_badge_prod: 'Production',
    proj_badge_tfg: 'Thesis',
    edu_label: '// EDUCATION',
    edu_degree: 'B.Sc. Computer Engineering',
    edu_uni: 'Universitat Politècnica de València · 2022–2026',
    edu_desc: 'Computing specialization — algorithms, AI, Machine Learning and software architecture.',
    lang_label: '// LANGUAGES',
    lang_names: ['Spanish', 'English', 'Valencian'],
    lang_native: 'Native',
    lang_b2: 'B2 Cambridge',
    lang_val: 'Native · GVA',
    clock_label: '// LOCAL TIME',
    theme_label: 'Toggle theme',
    top_label: 'Back to top',
  }
};

const SKILL_DETAILS = {
  0: [['Fine-tuning PEFT/QLoRA', 95], ['RAG Pipelines', 92], ['LangChain / LlamaIndex', 88], ['HuggingFace Transformers', 90], ['OpenAI API', 93], ['Prompt Engineering', 88]],
  1: [['Vision Transformers (ViT)', 85], ['Transfer Learning', 88], ['OpenCV', 82], ['MediaPipe', 80], ['Real-time Inference', 83]],
  2: [['PyTorch', 90], ['TensorFlow / Keras', 85], ['Scikit-learn', 88], ['Hyperparameter Optimization', 80]],
  3: [['Git / Linux', 85], ['HuggingFace Hub', 90], ['Weights & Biases', 75], ['Docker', 60]],
  4: [['Python', 95], ['SQL', 80], ['R', 72], ['C', 68], ['NumPy / Pandas', 88]],
};

const STORAGE_KEY = 'portfolio_chat_history';
const CHAT_TIMEOUT = 60000;

let lang = localStorage.getItem('lang') || 'es';
let dark = localStorage.getItem('dark') === 'true';
let chatHistory = [];
let typedTimer = null;
let isProcessing = false;

const $ = (id) => document.getElementById(id);
const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };

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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
  } catch (_error) {}
}

function loadChatHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) chatHistory = parsed;
  } catch (_error) {
    chatHistory = [];
  }
}

function applyDark() {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('dark', String(dark));
}

function startTyped(id, text) {
  const el = $(id);
  if (!el) return;
  clearTimeout(typedTimer);
  el.textContent = '';
  let i = 0;
  const next = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      typedTimer = setTimeout(next, 38);
    }
  };
  next();
}

function renderExp(exp) {
  const wrap = $('expList');
  if (!wrap) return;
  wrap.innerHTML = exp.map((e) => `
    <div class="exp-item reveal">
      <div class="exp-date">${e.date}</div>
      <div class="exp-role">${e.role}</div>
      <div class="exp-company">${e.company}</div>
      <div class="exp-desc">${e.desc}</div>
    </div>`).join('');
  observeReveal();
}

function renderSkillTab(idx) {
  document.querySelectorAll('.skill-tab').forEach((tab, i) => tab.classList.toggle('active', i === idx));
  const list = $('skillList');
  const skills = SKILL_DETAILS[idx] || [];
  list.innerHTML = skills.map(([name, pct]) => `
    <div class="skill-row">
      <span class="skill-row-name">${name}</span>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-pct="${pct}"></div></div>
      <span class="skill-row-pct">${pct}%</span>
    </div>`).join('');

  requestAnimationFrame(() => {
    list.querySelectorAll('.skill-row').forEach((row, i) => {
      setTimeout(() => {
        row.classList.add('show');
        const fill = row.querySelector('.skill-bar-fill');
        if (fill) fill.style.width = `${fill.dataset.pct}%`;
      }, i * 55);
    });
  });
}

function initSkillSlider() {
  const tabs = $('skillTabs');
  if (!tabs) return;
  const labels = T[lang].skills;
  tabs.innerHTML = labels.map((label, i) => `<button class="skill-tab${i === 0 ? ' active' : ''}" data-idx="${i}">${label}</button>`).join('');
  tabs.querySelectorAll('.skill-tab').forEach((btn) => {
    btn.addEventListener('click', () => renderSkillTab(Number(btn.dataset.idx)));
  });
  renderSkillTab(0);
}

function refreshSkillTabs() {
  const labels = T[lang].skills;
  document.querySelectorAll('.skill-tab').forEach((btn, i) => {
    btn.textContent = labels[i] || btn.textContent;
  });
}

function appendMsg(role, html) {
  const msgs = $('chatMsgs');
  const isBot = role === 'bot';
  const div = document.createElement('div');
  div.className = `msg ${isBot ? 'msg-bot' : 'msg-user'}`;
  div.innerHTML = `<div class="msg-avatar">${isBot ? 'AI' : T[lang].chat_user_avatar}</div><div class="msg-bubble">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function renderSuggestions(list) {
  const wrap = $('chatSuggestions');
  wrap.innerHTML = list.map((s) => `<button class="sugg" data-text="${s.replace(/"/g, '&quot;')}">${s}</button>`).join('');
  wrap.querySelectorAll('.sugg').forEach((btn) => {
    btn.addEventListener('click', () => sendMsg(btn.dataset.text || ''));
  });
}

function clearChat() {
  chatHistory = [];
  saveChatHistory();
  $('chatMsgs').innerHTML = '';
  appendMsg('bot', `<p>${T[lang].chat_welcome}</p>`);
}

function restoreChat() {
  $('chatMsgs').innerHTML = '';

  if (chatHistory.length === 0) {
    appendMsg('bot', `<p>${T[lang].chat_welcome}</p>`);
    return;
  }

  chatHistory.forEach((msg) => {
    const text = msg?.parts?.[0]?.text || '';
    if (!text) return;
    if (msg.role === 'user') appendMsg('user', `<p>${text}</p>`);
    if (msg.role === 'model') appendMsg('bot', sanitizeHtml(mdToHtml(text)));
  });
}

async function requestGemini(userMessage) {
  chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  const contents = [
    { role: 'user', parts: [{ text: PORTFOLIO_INFO }] },
    { role: 'model', parts: [{ text: 'Entendido. Estoy listo para actuar como el asistente de Ignacio.' }] },
    ...chatHistory,
  ];

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
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
    } catch (_error) {}
    throw new Error(message);
  }

  const data = await response.json();
  const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!botResponse) throw new Error('La API no devolvió ninguna respuesta');

  chatHistory.push({ role: 'model', parts: [{ text: botResponse }] });
  saveChatHistory();
  return botResponse;
}

async function sendMsg(text = '') {
  if (isProcessing) return;
  const input = $('chatInput');
  const userText = (text || input.value).trim().replace(/[<>]/g, '');
  if (!userText) return;

  isProcessing = true;
  $('chatSend').disabled = true;
  input.value = '';
  appendMsg('user', `<p>${userText}</p>`);

  const loader = document.createElement('div');
  loader.className = 'msg msg-bot';
  loader.innerHTML = '<div class="msg-avatar">AI</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  $('chatMsgs').appendChild(loader);
  $('chatMsgs').scrollTop = $('chatMsgs').scrollHeight;

  try {
    const reply = await requestGemini(userText);
    loader.remove();
    appendMsg('bot', sanitizeHtml(mdToHtml(reply)));
  } catch (error) {
    loader.remove();
    if (chatHistory.at(-1)?.role === 'user') {
      chatHistory.pop();
      saveChatHistory();
    }
    appendMsg('bot', `<p>${error.message || 'Lo siento, hubo un error. Por favor intenta de nuevo.'}</p>`);
  } finally {
    isProcessing = false;
    $('chatSend').disabled = false;
  }
}

function applyLang() {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  const t = T[lang];

  document.querySelectorAll('.nav-links a').forEach((a, i) => { if (t.nav[i]) a.textContent = t.nav[i]; });
  $('langBtn').textContent = lang === 'es' ? 'EN' : 'ES';
  $('cvBtnLabel').textContent = t.cv_btn;
  $('heroEyebrow').textContent = t.hero_eyebrow;
  startTyped('heroRole', t.hero_role);
  $('heroDesc').textContent = t.hero_desc;
  $('heroBtn1').querySelector('span').textContent = ` ${t.hero_btn1}`;
  $('heroBtn2').querySelector('span').textContent = ` ${t.hero_btn2}`;
  $('aboutTitle').textContent = t.about_title;
  $('aboutP1').innerHTML = t.about_p1;
  $('aboutP2').innerHTML = t.about_p2;
  $('stat1Label').textContent = t.stat1;
  $('stat2Label').textContent = t.stat2;
  $('stat3Label').textContent = t.stat3;
  $('stat4Label').textContent = t.stat4;
  $('expTitle').textContent = t.exp_title;
  renderExp(t.exp);
  $('skillsTitle').textContent = t.skills_title;
  refreshSkillTabs();
  $('projTitle').textContent = t.proj_title;
  document.querySelectorAll('.proj-card').forEach((card, i) => {
    const project = t.project_cards[i];
    if (!project) return;
    const title = card.querySelector('[data-project-title]');
    const desc = card.querySelector('[data-project-desc]');
    if (title) title.textContent = project.title;
    if (desc) desc.textContent = project.desc;
  });
  document.querySelectorAll('[data-proj-link]').forEach((el) => {
    const type = el.dataset.projLink;
    const label = el.querySelector('.link-label');
    label.textContent = type === 'live' ? t.proj_live : type === 'hf' ? t.proj_hf : t.proj_gh;
  });
  setText('certsTitle', t.certs_title);
  document.querySelectorAll('.cert-name').forEach((el, i) => { if (t.cert_cards[i]) el.textContent = t.cert_cards[i]; });
  setText('certMore', t.cert_more);
  setText('chatTitle', t.chat_title);
  setText('chatSub', t.chat_sub);
  setText('chatHeadTitle', t.chat_head_title);
  setText('chatHeadSub', t.chat_head_sub);
  const chatInput = $('chatInput');
  if (chatInput) chatInput.placeholder = t.chat_placeholder;
  const clearChatBtn = $('clearChat');
  if (clearChatBtn) clearChatBtn.title = t.clear_chat;
  const chatSendBtn = $('chatSend');
  if (chatSendBtn) chatSendBtn.setAttribute('aria-label', t.send_label);
  renderSuggestions(t.suggestions);
  [0, 1, 2].forEach((i) => { setText('chip' + i, t.chips[i]); });
  setText('badge0', t.proj_badge_prod);
  setText('badge1', t.proj_badge_tfg);
  setText('eduLabel', t.edu_label);
  setText('eduDegree', t.edu_degree);
  setText('eduUni', t.edu_uni);
  setText('eduDesc', t.edu_desc);
  setText('langLabel', t.lang_label);
  if (t.lang_names) [1, 2, 3].forEach((i) => { setText('langName' + i, t.lang_names[i - 1]); });
  setText('langNative1', t.lang_native);
  setText('langB2', t.lang_b2);
  setText('langNative2', t.lang_val);
  setText('clockLabel', t.clock_label);
  setText('contactTitle', t.contact_title);
  setText('contactSub', t.contact_sub);
  setText('footerText', t.footer);
  document.querySelectorAll('.js-theme').forEach((btn) => btn.setAttribute('aria-label', t.theme_label || 'Toggle theme'));
  document.querySelector('.top-btn')?.setAttribute('aria-label', t.top_label || 'Back to top');
}

function initScroll() {
  const bar = document.querySelector('.scroll-bar');
  const nav = document.querySelector('.nav-wrap');
  const topBtn = document.querySelector('.top-btn');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('scrolled', y > 30);
    topBtn.classList.toggle('show', y > 400);

    document.querySelectorAll('section[id]').forEach((section) => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < bottom);
    });
  }, { passive: true });
}

function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach((el) => io.observe(el));
}

function initClock() {
  const tick = () => {
    const now = new Date();
    $('clockTime').textContent = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    $('clockDate').textContent = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
  };
  tick();
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  applyDark();
  loadChatHistory();

  document.querySelectorAll('.js-theme').forEach((btn) => {
    btn.addEventListener('click', () => {
      dark = !dark;
      applyDark();
    });
  });

  $('langBtn').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    applyLang();
    restoreChat();
  });

  $('navToggle').addEventListener('click', () => {
    $('navToggle').classList.toggle('open');
    $('navLinks').classList.toggle('open');
  });

  $('navLinks').querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      $('navToggle').classList.remove('open');
      $('navLinks').classList.remove('open');
    });
  });

  $('chatSend').addEventListener('click', () => sendMsg());
  $('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  });
  $('clearChat').addEventListener('click', clearChat);
  document.querySelector('.top-btn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  initSkillSlider();
  initScroll();
  initClock();
  observeReveal();
  applyLang();
  restoreChat();
});
