import { GEMINI_API_KEY, PORTFOLIO_INFO } from './config.js';

let isProcessing = false;
let conversationHistory = [];
let chatInput, sendButton, chatMessages, clearChatButton, chatStatus;

function initializeElements() {
    chatInput = document.getElementById('chatInput');
    sendButton = document.getElementById('sendButton');
    chatMessages = document.getElementById('chatMessages');
    clearChatButton = document.getElementById('clearChat');
    chatStatus = document.getElementById('chatStatus');
    if (!chatInput || !sendButton || !chatMessages || !clearChatButton || !chatStatus) {
        console.error('Error: No se pudieron encontrar todos los elementos del DOM');
        return false;
    }
    if (GEMINI_API_KEY === 'TU_API_KEY_AQUI' || !GEMINI_API_KEY) {
        chatStatus.textContent = '⚠️ API Key no configurada';
        chatStatus.style.color = '#fbbf24';
        sendButton.disabled = true;
        chatInput.placeholder = 'Configura tu API key en config.js primero';
    }
    return true;
}

function updateActiveNavLink(href) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

function initializeMenuHoverLogic() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            navLinks.forEach(l => l.classList.remove('hovering'));
            link.classList.add('hovering');
        });
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hovering');
        });
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const nav = document.querySelector('.nav');
                if (nav) {
                    nav.classList.remove('nav-open');
                    const navToggle = document.getElementById('navToggle');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                    }
                }
            }
            updateActiveNavLink(href);
        });
    });
}

function initializeScrollReveal() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
    sections.forEach(section => { observer.observe(section); });
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    updateActiveNavLink('#' + id);
                }
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('section[id]').forEach(section => {
        navObserver.observe(section);
    });
}

function initializeEventListeners() {
    if (!chatInput || !sendButton || !clearChatButton) {
        console.error('Error: No se pueden agregar event listeners, elementos no encontrados');
        return;
    }
    sendButton.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    clearChatButton.addEventListener('click', () => {
        const initialMessage = chatMessages.querySelector('.message-bot:first-child');
        chatMessages.innerHTML = '';
        if (initialMessage) {
            chatMessages.appendChild(initialMessage);
        }
        conversationHistory = [];
        chatStatus.textContent = 'Listo para chatear';
        chatStatus.style.color = '#10b981';
    });
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const nav = document.querySelector('.nav');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-open') && 
                !nav.contains(e.target) && 
                !navToggle.contains(e.target)) {
                nav.classList.remove('nav-open');
                navToggle.classList.remove('active');
            }
        });
    }
    initializeMenuHoverLogic();
}

// ... (resto de funciones sin cambios)

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (initializeElements()) {
            initializeEventListeners();
            initializeSmoothScroll();
            initializeScrollReveal();
            initializeHeaderEffects();
            if (window.location.hash === '#chat') {
                chatInput.focus();
            } else {
                window.scrollTo(0, 0);
            }
        }
    });
} else {
    if (initializeElements()) {
        initializeEventListeners();
        initializeSmoothScroll();
        initializeScrollReveal();
        initializeHeaderEffects();
        if (window.location.hash === '#chat') {
            chatInput.focus();
        } else {
            window.scrollTo(0, 0);
        }
    }
}
window.addEventListener('load', () => {
    if (!window.location.hash) { window.scrollTo(0, 0); }
});

function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    let lastScroll = 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 50) { header.classList.add('scrolled'); }
                else { header.classList.remove('scrolled'); }
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add('hide');
                } else { header.classList.remove('hide'); }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}
