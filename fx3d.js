/* ============================================================
   fx3d.js — efectos 3D sin dependencias (canvas 2D + proyección
   en perspectiva). Mantiene la estética botánica: polen flotante
   con profundidad y constelaciones entre partículas.
   ============================================================ */

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mod(value, range) {
  return ((value % range) + range) % range;
}

export function initFx3d() {
  if (prefersReducedMotion()) return;
  const canvas = document.getElementById('fx3d');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = 0;
  let h = 0;
  let inkRgb = [35, 32, 26];
  let accentRgb = [109, 125, 90];
  let particles = [];
  let raf = null;
  let last = performance.now();
  let t = 0;
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;

  const refreshColors = () => {
    const css = getComputedStyle(document.documentElement);
    try {
      inkRgb = hexToRgb(css.getPropertyValue('--ink').trim());
      accentRgb = hexToRgb(css.getPropertyValue('--accent').trim());
    } catch (_e) {}
  };

  const seedParticles = () => {
    const count = Math.round(Math.min(110, (w * h) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: 0.15 + Math.random() * 0.85,        // profundidad: tamaño, alpha y paralaje
      vy: -(4 + Math.random() * 14),
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2,
      vspin: (Math.random() - 0.5) * 1.6,
      petal: Math.random() < 0.22,
      accent: Math.random() < 0.4,
    }));
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedParticles();
  };

  // coordenadas en pantalla reutilizadas para las constelaciones
  const sx = [];
  const sy = [];
  const sz = [];

  const drawPollen = (dt, scroll) => {
    let n = 0;
    for (const p of particles) {
      p.y += p.vy * p.z * dt;
      p.spin += p.vspin * dt;
      const px = p.x + Math.sin(t * 0.5 + p.phase) * p.sway * p.z + mx * 26 * p.z;
      const py = p.y + my * 18 * p.z - scroll * 0.06 * p.z;
      const xx = mod(px, w + 24) - 12;
      const yy = mod(py, h + 24) - 12;
      sx[n] = xx;
      sy[n] = yy;
      sz[n] = p.z;
      n += 1;
      const rgb = p.accent ? accentRgb : inkRgb;
      const a = 0.08 + p.z * 0.24;
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
      if (p.petal) {
        const r = 2.2 + p.z * 3.4;
        ctx.save();
        ctx.translate(xx, yy);
        ctx.rotate(p.spin);
        // el "volteo" del pétalo simula rotación fuera del plano
        ctx.scale(1, 0.45 + 0.4 * Math.sin(t * 0.8 + p.phase));
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        const r = 0.7 + p.z * 1.7;
        ctx.beginPath();
        ctx.arc(xx, yy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // constelaciones: hilos entre partículas cercanas
    const LINK = 90;
    ctx.lineWidth = 1;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const dx = sx[i] - sx[j];
        const dy = sy[i] - sy[j];
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        const a = (1 - Math.sqrt(d2) / LINK) * 0.09 * Math.min(sz[i], sz[j]);
        ctx.strokeStyle = `rgba(${inkRgb[0]},${inkRgb[1]},${inkRgb[2]},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(sx[i], sy[i]);
        ctx.lineTo(sx[j], sy[j]);
        ctx.stroke();
      }
    }
  };

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;
    const scroll = window.scrollY;
    ctx.clearRect(0, 0, w, h);
    drawPollen(dt, scroll);
    raf = requestAnimationFrame(frame);
  };

  if (!isCoarsePointer()) {
    window.addEventListener('pointermove', (e) => {
      tmx = (e.clientX / w) * 2 - 1;
      tmy = (e.clientY / h) * 2 - 1;
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });

  window.addEventListener('resize', resize);
  new MutationObserver(refreshColors).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  refreshColors();
  resize();
  raf = requestAnimationFrame(frame);
}

/* Tilt 3D con perspectiva en tarjetas; el brillo (glare) se mueve
   con --gx / --gy, definidos en CSS. */
export function initTilt() {
  if (prefersReducedMotion() || isCoarsePointer()) return;
  document.querySelectorAll('.proj-card, .cert-card, .stat').forEach((card) => {
    let raf = null;
    let rx = 0;
    let ry = 0;
    let lift = 0;
    let trx = 0;
    let tryy = 0;
    let tlift = 0;

    const apply = () => {
      rx += (trx - rx) * 0.18;
      ry += (tryy - ry) * 0.18;
      lift += (tlift - lift) * 0.18;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(${lift.toFixed(2)}px)`;
      if (Math.abs(rx - trx) + Math.abs(ry - tryy) + Math.abs(lift - tlift) > 0.05) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = null;
        if (trx === 0 && tryy === 0 && tlift === 0) {
          card.style.transform = '';
          card.style.transition = '';
        }
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply); };

    card.addEventListener('pointerenter', () => {
      // sin transición de transform: el tilt lo interpola el rAF
      card.style.transition = 'border-color var(--t), box-shadow var(--t), background var(--t)';
      tlift = -4;
      kick();
    });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tryy = nx * 7;
      trx = -ny * 6;
      card.style.setProperty('--gx', `${(((nx + 1) / 2) * 100).toFixed(1)}%`);
      card.style.setProperty('--gy', `${(((ny + 1) / 2) * 100).toFixed(1)}%`);
      kick();
    });
    card.addEventListener('pointerleave', () => {
      trx = 0;
      tryy = 0;
      tlift = 0;
      kick();
    });
  });
}

/* Paralaje 3D del hero: el retrato rota en perspectiva con el ratón
   (en sintonía con la flor wireframe) y el texto se desplaza en capa. */
export function initHeroParallax() {
  if (prefersReducedMotion() || isCoarsePointer()) return;
  const frame = document.querySelector('.portrait-frame');
  const copy = document.querySelector('.hero-copy');
  if (!frame && !copy) return;

  let raf = null;
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;

  const apply = () => {
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    if (frame) frame.style.transform = `perspective(900px) rotateX(${(-my * 5).toFixed(2)}deg) rotateY(${(mx * 6).toFixed(2)}deg)`;
    if (copy) copy.style.transform = `translate3d(${(mx * 8).toFixed(1)}px, ${(my * 6).toFixed(1)}px, 0)`;
    if (Math.abs(mx - tmx) + Math.abs(my - tmy) > 0.002) {
      raf = requestAnimationFrame(apply);
    } else {
      raf = null;
    }
  };

  window.addEventListener('pointermove', (e) => {
    if (window.scrollY > window.innerHeight) return;  // solo mientras el hero es visible
    tmx = (e.clientX / window.innerWidth) * 2 - 1;
    tmy = (e.clientY / window.innerHeight) * 2 - 1;
    if (!raf) raf = requestAnimationFrame(apply);
  }, { passive: true });
}

/* Botones magnéticos: se desplazan sutilmente hacia el cursor. */
export function initMagnetic() {
  if (prefersReducedMotion() || isCoarsePointer()) return;
  document.querySelectorAll('.btn, .cv-btn, .contact-card').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(dx * 0.14).toFixed(1)}px, ${(dy * 0.18).toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* Nombre del hero: cada letra entra rotando en perspectiva. */
export function initHeroLetters() {
  if (prefersReducedMotion()) return;
  const el = document.querySelector('.hero-name');
  if (!el) return;
  let idx = 0;
  [...el.childNodes].forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) return;
    const frag = document.createDocumentFragment();
    for (const ch of node.textContent) {
      if (ch.trim() === '') continue;
      const span = document.createElement('span');
      span.className = 'ch';
      span.textContent = ch;
      span.style.setProperty('--i', idx);
      idx += 1;
      frag.appendChild(span);
    }
    node.replaceWith(frag);
  });
}

/* Cursor personalizado: punto + anillo que sigue con inercia y
   crece sobre elementos interactivos. Solo punteros finos. */
export function initCursor() {
  if (prefersReducedMotion() || isCoarsePointer()) return;
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.documentElement.classList.add('cursor-fx');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;

  const loop = () => {
    rx += (x - rx) * 0.16;
    ry += (y - ry) * 0.16;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };

  window.addEventListener('pointermove', (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    const hot = e.target.closest?.('a, button, input, .skill-chip');
    ring.classList.toggle('grow', Boolean(hot));
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  requestAnimationFrame(loop);
}

/* Intro bloom: la flor IDV se dibuja a trazo y se desvanece.
   Una vez por sesión. */
export function initIntro() {
  if (prefersReducedMotion()) return;
  let seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch (_e) {}
  if (seen) return;
  try { sessionStorage.setItem('introSeen', '1'); } catch (_e) {}

  const overlay = document.createElement('div');
  overlay.className = 'intro';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <svg viewBox="0 0 64 64" width="92" height="92" fill="none" stroke="currentColor" stroke-width="1.6">
      <circle cx="32" cy="32" r="4.5"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11" transform="rotate(60 32 32)"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11" transform="rotate(120 32 32)"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11" transform="rotate(180 32 32)"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11" transform="rotate(240 32 32)"/>
      <ellipse cx="32" cy="20" rx="5.5" ry="11" transform="rotate(300 32 32)"/>
    </svg>`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('out'), 900);
  setTimeout(() => overlay.remove(), 1450);
}

/* Ripple al hacer click — delegado para sobrevivir re-renders. */
export function initRipple() {
  if (prefersReducedMotion()) return;
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.('.btn, .cv-btn, .chat-send, .sugg, .skill-tab, .contact-card');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2.2;
    const span = document.createElement('span');
    span.className = 'fx-ripple';
    span.style.width = `${d}px`;
    span.style.height = `${d}px`;
    span.style.left = `${e.clientX - r.left - d / 2}px`;
    span.style.top = `${e.clientY - r.top - d / 2}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 700);
  });
}
