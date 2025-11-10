import { PORTFOLIO_INFO } from './config.js';

// Estado del chat
let isProcessing = false;
let conversationHistory = [];

// Elementos del DOM (se inicializarán cuando el DOM esté listo)
let chatInput, sendButton, chatMessages, clearChatButton, chatStatus;

// Constantes
const STORAGE_KEY = 'portfolio_chat_history';
const CHAT_TIMEOUT = 30000; // 30 segundos
const MAX_REQUEST_SIZE = 100000; // 100KB

// Función para sanitizar HTML (prevenir XSS)
function sanitizeHtml(html) {
    if (!html) return '';
    
    // Lista de tags permitidos
    const allowedTags = ['p', 'br', 'strong', 'em', 'code', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'];
    
    // Crear un elemento temporal para parsear
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Obtener todos los elementos
    const allElements = temp.querySelectorAll('*');
    
    // Remover scripts y eventos peligrosos
    allElements.forEach(el => {
        // Remover atributos de eventos
        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        });
        
        // Si el tag no está permitido, reemplazar por su contenido
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            const parent = el.parentNode;
            while (el.firstChild) {
                parent.insertBefore(el.firstChild, el);
            }
            parent.removeChild(el);
        }
    });
    
    // Escapar contenido de texto para prevenir inyección
    const walker = document.createTreeWalker(
        temp,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
        
        // Pero permitir los tags que ya procesamos
        const temp2 = document.createElement('div');
        temp2.innerHTML = escaped;
        if (temp2.textContent === text) {
            textNode.textContent = text; // No había HTML, mantener original
        } else {
            // Había HTML, pero ya fue procesado, usar el texto escapado y luego desescapar tags permitidos
            const final = escaped
                .replace(/&lt;(\/?)(p|br|strong|em|code|ul|ol|li|h[1-4]|hr|table|thead|tbody|tr|th|td)(\s[^&]*?)?&gt;/gi, '<$1$2$3>');
            textNode.textContent = final;
        }
    });
    
    return temp.innerHTML;
}

// Función para guardar historial en localStorage
function saveChatHistory() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    } catch (e) {
        console.warn('No se pudo guardar el historial:', e);
    }
}

// Función para cargar historial desde localStorage
function loadChatHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                conversationHistory = parsed;
                return true;
            }
        }
    } catch (e) {
        console.warn('No se pudo cargar el historial:', e);
    }
    return false;
}

// Función para restaurar mensajes del historial
function restoreChatMessages() {
    if (conversationHistory.length === 0) return;
    
    // Limpiar mensajes actuales excepto el inicial
    const initialMessage = chatMessages.querySelector('.message-bot:first-child');
    chatMessages.innerHTML = '';
    if (initialMessage) {
        chatMessages.appendChild(initialMessage);
    }
    
    // Restaurar mensajes del historial
    conversationHistory.forEach(msg => {
        if (msg.role === 'user' && msg.parts && msg.parts[0] && msg.parts[0].text) {
            addMessage(msg.parts[0].text, true);
        } else if (msg.role === 'model' && msg.parts && msg.parts[0] && msg.parts[0].text) {
            addMessage(msg.parts[0].text, false);
        }
    });
}

// Función para exportar conversación
function exportConversation() {
    let text = 'Conversación del Portfolio Chat\n';
    text += '================================\n\n';
    
    conversationHistory.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'Usuario' : 'Asistente';
        const content = msg.parts && msg.parts[0] && msg.parts[0].text ? msg.parts[0].text : '';
        text += `${index + 1}. ${role}:\n${content}\n\n`;
    });
    
    // Crear blob y descargar
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversacion-portfolio-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para inicializar los elementos del DOM
function initializeElements() {
    chatInput = document.getElementById('chatInput');
    sendButton = document.getElementById('sendButton');
    chatMessages = document.getElementById('chatMessages');
    clearChatButton = document.getElementById('clearChat');
    chatStatus = document.getElementById('chatStatus');
    
    // Verificar que todos los elementos existen
    if (!chatInput || !sendButton || !chatMessages || !clearChatButton || !chatStatus) {
        console.error('Error: No se pudieron encontrar todos los elementos del DOM');
        return false;
    }
    
    // [CAMBIO APLICADO]
    // Se eliminó el bloque que verificaba GEMINI_API_KEY en el cliente.
    // El chat está listo para usarse, asumiendo que el servidor proxy
    // tiene la clave API configurada.
    
    return true;
}

// Función para convertir markdown básico a HTML
function markdownToHtml(text) {
    if (!text) return '';
    
    let html = text;
    
    // Procesar línea por línea para manejar diferentes elementos
    const lines = html.split('\n');
    const processedLines = [];
    let inList = false;
    let listType = 'ul'; // 'ul' o 'ol'
    let inTable = false;
    let tableRows = [];
    
    for (let i = 0; i < lines.length; i++) {
        const originalLine = lines[i];
        const line = originalLine.trim();
        
        // Detectar tablas markdown (debe tener al menos 3 columnas)
        const pipeCount = (line.match(/\|/g) || []).length;
        if (line.includes('|') && pipeCount >= 2) {
            // Verificar si es línea de separación de tabla (|---|---|)
            const isSeparator = line.match(/^\|[\s\-\|:]+\|$/);
            
            if (!isSeparator) {
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                }
                // Usar la línea original para preservar espacios
                tableRows.push(originalLine);
            }
            continue;
        } else {
            // Si estábamos en una tabla, procesarla antes de continuar
            if (inTable && tableRows.length > 0) {
                processedLines.push(processMarkdownTable(tableRows));
                tableRows = [];
                inTable = false;
            }
        }
        
        // Detectar títulos
        if (line.match(/^#{1,4}\s+/)) {
            if (inList) {
                processedLines.push('</' + listType + '>');
                inList = false;
            }
            const match = line.match(/^(#{1,4})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const title = match[2];
                processedLines.push(`<h${level}>${title}</h${level}>`);
            }
            continue;
        }
        
        // Detectar separadores horizontales
        if (line.match(/^[-*_]{3,}$/)) {
            if (inList) {
                processedLines.push('</' + listType + '>');
                inList = false;
            }
            processedLines.push('<hr>');
            continue;
        }
        
        // Detectar listas con viñetas
        const listMatch = line.match(/^[\*\-\+] (.+)$/);
        if (listMatch) {
            if (inList && listType !== 'ul') {
                processedLines.push('</' + listType + '>');
                inList = false;
            }
            if (!inList) {
                processedLines.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            processedLines.push('<li>' + listMatch[1] + '</li>');
            continue;
        }
        
        // Detectar listas numeradas
        const numberedListMatch = line.match(/^\d+\.\s+(.+)$/);
        if (numberedListMatch) {
            if (inList && listType !== 'ol') {
                processedLines.push('</' + listType + '>');
                inList = false;
            }
            if (!inList) {
                processedLines.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            processedLines.push('<li>' + numberedListMatch[1] + '</li>');
            continue;
        }
        
        // Si no es lista, cerrar la lista si estaba abierta
        if (inList && line !== '') {
            processedLines.push('</' + listType + '>');
            inList = false;
        }
        
        // Agregar la línea normal
        if (line !== '' || processedLines.length === 0) {
            processedLines.push(line);
        }
    }
    
    // Cerrar listas o tablas abiertas
    if (inList) {
        processedLines.push('</' + listType + '>');
    }
    if (inTable && tableRows.length > 0) {
        processedLines.push(processMarkdownTable(tableRows));
    }
    
    html = processedLines.join('\n');
    
    // Convertir negritas **texto** o __texto__
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Convertir cursivas *texto* o _texto_ (evitar conflictos con listas y negritas)
    // Solo procesar si no está dentro de tags HTML - usar método más compatible
    // Primero procesar las que no están dentro de tags
    html = html.replace(/([^<>\s]|^)\*([^*<>\n]+)\*([^<>\s]|$)/g, function(match, before, text, after) {
        // Verificar que no estemos dentro de un tag HTML
        if (before === '<' || after === '>') return match;
        return before + '<em>' + text + '</em>' + after;
    });
    html = html.replace(/([^<>\s]|^)_([^_<>\n]+)_([^<>\s]|$)/g, function(match, before, text, after) {
        if (before === '<' || after === '>') return match;
        return before + '<em>' + text + '</em>' + after;
    });
    
    // Convertir código inline `código`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convertir saltos de línea dobles a párrafos
    html = html.split(/\n\n+/).map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';
        
        // Si ya tiene HTML estructurado, no envolver en <p>
        if (paragraph.includes('<ul>') || paragraph.includes('<ol>') || 
            paragraph.includes('<li>') || paragraph.includes('<h') || 
            paragraph.includes('<hr>') || paragraph.includes('<table>')) {
            return paragraph;
        }
        
        // Convertir saltos de línea simples a <br>
        paragraph = paragraph.replace(/\n/g, '<br>');
        return '<p>' + paragraph + '</p>';
    }).join('');
    
    return html;
}

// Función para procesar tablas markdown
function processMarkdownTable(rows) {
    if (rows.length === 0) return '';
    
    let html = '<table>';
    
    // Primera fila es el encabezado
    if (rows.length > 0) {
        html += '<thead><tr>';
        const headerCells = rows[0].split('|').filter(cell => cell.trim() !== '');
        headerCells.forEach(cell => {
            html += '<th>' + cell.trim() + '</th>';
        });
        html += '</tr></thead>';
    }
    
    // Resto de filas son datos
    if (rows.length > 1) {
        html += '<tbody>';
        for (let i = 1; i < rows.length; i++) {
            html += '<tr>';
            const cells = rows[i].split('|').filter(cell => cell.trim() !== '');
            cells.forEach(cell => {
                html += '<td>' + cell.trim() + '</td>';
            });
            html += '</tr>';
        }
        html += '</tbody>';
    }
    
    html += '</table>';
    return html;
}

// Función para agregar mensaje al chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'message-user' : 'message-bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<span style="font-size: 1.2em;">🐵</span>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Si es usuario, mostrar texto plano; si es bot, renderizar markdown
    if (isUser) {
        const p = document.createElement('p');
        p.textContent = content;
        messageContent.appendChild(p);
    } else {
        // Sanitizar HTML antes de insertar
        const html = markdownToHtml(content);
        messageContent.innerHTML = sanitizeHtml(html);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Función para mostrar mensaje de carga
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-bot';
    messageDiv.id = 'loading-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-loading';
    messageContent.innerHTML = '<span></span><span></span><span></span>';
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Función para remover mensaje de carga
function removeLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// Función para hacer scroll al final del chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para enviar mensaje a Gemini API
async function sendMessageToGemini(userMessage) {
    try {
        chatStatus.textContent = 'Pensando...';
        chatStatus.style.color = '#6366f1';
        
        // Agregar mensaje del usuario al historial
        conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });
        
        // Guardar historial
        saveChatHistory();
        
        // Construir el contenido para la API
        // Si es el primer mensaje, incluir el contexto del portfolio
        // Si no, usar el historial de conversación
        const contents = [
            // 1. El prompt del sistema (las instrucciones de config.js)
            {
                role: 'user',
                parts: [{ text: PORTFOLIO_INFO }]
            },
            // 2. Una respuesta ficticia para que el modelo "active" su rol
            {
                role: 'model',
                parts: [{ text: 'Entendido. Estoy listo para actuar como el asistente de Ignacio.' }]
            },
            // 3. El historial de conversación real
            ...conversationHistory
        ];
        
        // Preparar el contenido para la API
        const requestBody = {
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };
        
        // Llamar a la API de Gemini a través del servidor proxy (evita problemas de CORS)
        // El servidor proxy está en server.py y lee la API key de config.js
        // Usar ruta relativa para que funcione desde cualquier subdirectorio
        
        // [CAMBIO APLICADO]
        // Ruta de API simplificada. El servidor python (server.py)
        // ya maneja las rutas '/api/gemini' y '/portfolio-chat/api/gemini'.
        const apiPath = '/api/gemini';
        
        // Crear AbortController para timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CHAT_TIMEOUT);
        
        try {
            const response = await fetch(
                apiPath,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                    signal: controller.signal
                }
            );
            
            if (!response.ok) {
                let errorMessage = 'Error al conectar con la API';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || errorMessage;
                    console.error('Error de API:', errorData);
                } catch (e) {
                    console.error('Error al parsear respuesta:', e);
                    errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            
            // Verificar si hay candidatos en la respuesta
            if (!data.candidates || data.candidates.length === 0) {
                console.error('Respuesta sin candidatos:', data);
                throw new Error('La API no devolvió ninguna respuesta');
            }
            
            // Extraer la respuesta
            const botResponse = data.candidates[0]?.content?.parts[0]?.text || 
                              'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.';
            
            // Agregar respuesta al historial
            conversationHistory.push({
                role: 'model',
                parts: [{ text: botResponse }]
            });
            
            // Guardar historial
            saveChatHistory();
            
            chatStatus.textContent = 'Listo para chatear';
            chatStatus.style.color = '#10b981';
            
            return botResponse;
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
        
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Stack trace:', error.stack);
        chatStatus.textContent = 'Error de conexión';
        chatStatus.style.color = '#ef4444';
        
        // Mensajes de error más específicos
        const errorMsg = error.message || String(error);
        
        if (error.name === 'AbortError' || errorMsg.includes('timeout') || errorMsg.includes('aborted')) {
            return 'Error: La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.';
        } else if (errorMsg.includes('API_KEY') || errorMsg.includes('API key') || errorMsg.includes('401')) {
            return 'Error: La API key no es válida o ha expirado. Por favor, verifica tu configuración y obtén una nueva key en https://makersuite.google.com/app/apikey';
        } else if (errorMsg.includes('quota') || errorMsg.includes('429')) {
            return 'Error: Se ha excedido la cuota de la API. Por favor, intenta más tarde o verifica tu plan de Google AI Studio.';
        } else if (errorMsg.includes('CORS') || errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
            return 'Error de conexión: No se pudo conectar con el servidor proxy. Asegúrate de que el servidor Python (server.py) esté ejecutándose en el puerto 8000.';
        } else if (errorMsg.includes('403')) {
            return 'Error: Acceso denegado. Verifica que tu API key tenga los permisos necesarios y que el modelo gemini-2.5-flash-preview-09-2025 esté disponible en tu región.';
        } else {
            return `Error: ${errorMsg}. Por favor, verifica tu conexión a internet, tu API key y que el modelo esté disponible. Revisa la consola del navegador (F12) para más detalles.`;
        }
    }
}

// Función para manejar el envío de mensajes
async function handleSendMessage() {
    const message = chatInput.value.trim();
    
    // Validación de entrada
    if (!message || isProcessing) return;
    
    // Sanitizar entrada del usuario (remover caracteres peligrosos)
    const sanitizedMessage = message
        .replace(/[<>]/g, '') // Remover < y >
        .trim();
    
    if (!sanitizedMessage) return;
    
    // Validar longitud del mensaje
    if (sanitizedMessage.length > 2000) {
        addMessage('El mensaje es demasiado largo. Por favor, limita tu mensaje a 2000 caracteres.', false);
        return;
    }
    
    // [CAMBIO APLICADO]
    // Se eliminó la comprobación de la API key en el cliente.
    /*
    if (GEMINI_API_KEY === 'TU_API_KEY_AQUI' || !GEMINI_API_KEY) {
        addMessage('Por favor, configura tu API key de Gemini en el archivo config.js primero.', false);
        return;
    }
    */
    
    // Agregar mensaje del usuario (usar mensaje sanitizado)
    addMessage(sanitizedMessage, true);
    chatInput.value = '';
    sendButton.disabled = true;
    isProcessing = true;
    
    // Mostrar mensaje de carga
    addLoadingMessage();
    
    try {
        // Obtener respuesta de Gemini
        const response = await sendMessageToGemini(message);
        
        // Remover mensaje de carga y agregar respuesta
        removeLoadingMessage();
        addMessage(response, false);
        
    } catch (error) {
        removeLoadingMessage();
        addMessage('Lo siento, ocurrió un error. Por favor, intenta de nuevo.', false);
    } finally {
        isProcessing = false;
        sendButton.disabled = false;
        chatInput.focus();
    }
}

// Función para inicializar los event listeners
function initializeEventListeners() {
    if (!chatInput || !sendButton || !clearChatButton) {
        console.error('Error: No se pueden agregar event listeners, elementos no encontrados');
        return;
    }
    
    // Event Listeners del chat
    sendButton.addEventListener('click', handleSendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    clearChatButton.addEventListener('click', () => {
        // Mantener solo el mensaje inicial
        const initialMessage = chatMessages.querySelector('.message-bot:first-child');
        chatMessages.innerHTML = '';
        if (initialMessage) {
            chatMessages.appendChild(initialMessage);
        }
        conversationHistory = [];
        // Limpiar localStorage
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('No se pudo limpiar el historial:', e);
        }
        chatStatus.textContent = 'Listo para chatear';
        chatStatus.style.color = '#10b981';
    });
    
    // Botón exportar conversación
    const exportChatButton = document.getElementById('exportChat');
    if (exportChatButton) {
        exportChatButton.addEventListener('click', () => {
            if (conversationHistory.length === 0) {
                addMessage('No hay conversación para exportar.', false);
                return;
            }
            exportConversation();
        });
    }
    
    // Event Listener para el menú hamburguesa
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const nav = document.querySelector('.nav');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.contains('nav-open');
            nav.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-open') && 
                !nav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                nav.classList.remove('nav-open');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Función para inicializar smooth scroll mejorado tipo HONOR
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                // Scroll ultra suave con duración personalizada
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil si está abierto
                const nav = document.querySelector('.nav');
                if (nav) {
                    nav.classList.remove('nav-open');
                    const navToggle = document.getElementById('navToggle');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                }
                
                // Actualizar estado activo en navegación
                updateActiveNavLink(href);
            }
        });
    });
}

// Función para actualizar el enlace activo en la navegación
function updateActiveNavLink(href) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// Función mejorada para scroll reveal tipo HONOR con crossfade
function initializeScrollReveal() {
    // Todas las secciones excepto hero
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase visible con retraso escalonado para elementos hijos
                entry.target.classList.add('visible');
                
                // Animar elementos internos con stagger
                const children = entry.target.querySelectorAll('.stat, .skill-card, .project-card, .contact-link');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observador para actualizar navegación activa según scroll
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    updateActiveNavLink('#' + id);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('section[id]').forEach(section => {
        navObserver.observe(section);
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (initializeElements()) {
            // Cargar historial guardado
            if (loadChatHistory()) {
                restoreChatMessages();
            }
            
            initializeEventListeners();
            initializeSmoothScroll();
            initializeScrollReveal();
            initializeHeaderEffects();
            initializeScrollToTop();
            initializeDarkMode();
            updateScrollProgress();
            
            // Siempre volver al inicio al cargar
            window.scrollTo(0, 0);
        }
    });
} else {
    // El DOM ya está listo
    if (initializeElements()) {
        // Cargar historial guardado
        if (loadChatHistory()) {
            restoreChatMessages();
        }
        
        initializeEventListeners();
        initializeSmoothScroll();
        initializeScrollReveal();
        initializeHeaderEffects();
        initializeScrollToTop();
        initializeDarkMode();
        updateScrollProgress();
        
        // Siempre volver al inicio al cargar
        window.scrollTo(0, 0);
    }
}

// Exportar función para uso externo
window.exportConversation = exportConversation;

// Volver al inicio al recargar la página
window.addEventListener('load', () => {
    // Siempre volver al inicio al recargar
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

// También ejecutar cuando el DOM esté listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}

// Función para efectos del header
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Añadir clase scrolled
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Auto-hide header al hacer scroll hacia abajo
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add('hide');
                } else {
                    header.classList.remove('hide');
                }
                
                // Actualizar indicador de progreso de scroll
                updateScrollProgress();
                
                // Mostrar/ocultar botón scroll to top
                updateScrollToTopButton();
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Función para actualizar indicador de progreso de scroll
function updateScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
}

// Función para actualizar botón scroll to top
function updateScrollToTopButton() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
}

// Función para inicializar botón scroll to top
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Función para inicializar modo oscuro
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('portfolio_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (isDark) {
        document.documentElement.classList.add('dark-mode');
        darkModeToggle.setAttribute('aria-label', 'Activar modo claro');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark-mode');
        darkModeToggle.setAttribute('aria-label', 'Activar modo oscuro');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle al hacer clic
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        
        if (isDarkMode) {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('portfolio_theme', 'light');
            darkModeToggle.setAttribute('aria-label', 'Activar modo oscuro');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('portfolio_theme', 'dark');
            darkModeToggle.setAttribute('aria-label', 'Activar modo claro');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}