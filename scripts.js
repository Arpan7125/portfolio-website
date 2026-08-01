/* ═══════════════════════════════════════════════════════════════
   SHARED SCRIPTS — Cursor, Nav Indicator, Scroll Reveal, Magnetic
   ═══════════════════════════════════════════════════════════════ */

// ── CUSTOM CURSOR ────────────────────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

function lerp(a,b,t){ return a + (b-a)*t; }
(function animRing() {
  rx = lerp(rx, mx, 0.12);
  ry = lerp(ry, my, 0.12);
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// Hover expand on interactives
document.querySelectorAll('a, button, .work-card, .skill-card, .exp-card, .achievement-card, .info-card, .stat-bubble, .form-input, .form-textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── NAV PILL INDICATOR ───────────────────────────────────────
const indicator  = document.getElementById('navIndicator');
const navLinks   = document.querySelectorAll('.nav-link');
const activeLink = document.querySelector('.nav-link.active');

function positionIndicator(link) {
  if (!link || !indicator) return;
  const pill = link.closest('.nav-pill');
  const pillRect = pill.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  indicator.style.left   = (linkRect.left - pillRect.left) + 'px';
  indicator.style.width  = linkRect.width + 'px';
}

if (activeLink) {
  // Set initial position after fonts load
  window.addEventListener('load', () => positionIndicator(activeLink));
  // Also set immediately
  setTimeout(() => positionIndicator(activeLink), 100);
}

// Hover preview
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => positionIndicator(link));
  link.addEventListener('mouseleave', () => positionIndicator(activeLink));
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'),
        parseInt(entry.target.dataset.delay || 0));
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = el.dataset.delay || (i * 60);
  revealObserver.observe(el);
});

// ── MAGNETIC BUTTONS ─────────────────────────────────────────
document.querySelectorAll('.btn-cta, .btn-secondary, .btn-connect, .nav-cta, .btn-submit').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width/2;
    const dy = e.clientY - rect.top  - rect.height/2;
    btn.style.transform = `translate(${dx*.2}px, ${dy*.3}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── SMOOTH PAGE TRANSITION ───────────────────────────────────
// Add a fade-in on page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity .4s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ── 3D TILT + PARALLAX (CSS variables) ─────────────────────────
(function init3DTiltAndParallax() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canTilt = !prefersReduced && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;

  // Scroll depth for hero decorations
  const hero = document.querySelector('.hero');
  const heroHeight = hero ? () => hero.getBoundingClientRect().height || 1 : () => 1;

  let rafScroll = 0;
  function updateScrollVars() {
    rafScroll = 0;
    const h = hero ? heroHeight() : 1;
    const rect = hero ? hero.getBoundingClientRect() : { top: 0, height: h };
    // 0..1 as hero moves out of view
    const t = Math.min(1, Math.max(0, (-rect.top) / (rect.height || 1)));
    root.style.setProperty('--scrollT', t.toFixed(4));
    root.style.setProperty('--scrollY', String(window.scrollY || 0));
  }

  if (hero) {
    updateScrollVars();
    window.addEventListener('scroll', () => {
      if (!rafScroll) rafScroll = requestAnimationFrame(updateScrollVars);
    }, { passive: true });
    window.addEventListener('resize', () => updateScrollVars());
  }

  // Tilt system for elements
  const tiltEls = canTilt ? document.querySelectorAll('.tilt3d') : [];

  function resetTilt(el) {
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--tz', '0px');
    el.style.setProperty('--hx', '50%');
    el.style.setProperty('--hy', '50%');
    el.style.setProperty('--active', '0');
  }

  function applyTilt(el, clientX, clientY) {
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const nx = (x / rect.width) * 2 - 1;  // -1..1
    const ny = (y / rect.height) * 2 - 1; // -1..1

    const max = Number(el.dataset.maxTilt || 10); // degrees
    const rx = (-ny * max).toFixed(3);
    const ry = (nx * max).toFixed(3);

    // Gloss position 0..100%
    const hx = (x / rect.width) * 100;
    const hy = (y / rect.height) * 100;

    el.style.setProperty('--rx', rx + 'deg');
    el.style.setProperty('--ry', ry + 'deg');
    el.style.setProperty('--tz', '10px');
    el.style.setProperty('--hx', hx.toFixed(2) + '%');
    el.style.setProperty('--hy', hy.toFixed(2) + '%');
    el.style.setProperty('--active', '1');
  }

  tiltEls.forEach(el => {
    resetTilt(el);

    let raf = 0;
    let lastEvent = null;

    el.addEventListener('pointerenter', () => {
      el.style.willChange = 'transform';
    });

    el.addEventListener('pointerleave', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lastEvent = null;
      resetTilt(el);
      el.style.willChange = '';
    });

    el.addEventListener('pointermove', (e) => {
      if (!lastEvent) lastEvent = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!lastEvent) return;
        applyTilt(el, lastEvent.clientX, lastEvent.clientY);
        lastEvent = null;
      });
    });
  });
})();

