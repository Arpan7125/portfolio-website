/**
 * 3D Tilt Cards — CSS 3D Transform with Mouse/Gyroscope
 * Applies perspective rotateX/rotateY based on cursor position
 * Falls back to DeviceOrientationEvent on mobile
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const SELECTORS = [
  '.work-card',
  '.skill-card',
  '.exp-card',
  '.achievement-card',
  '.info-card',
  '.stat-bubble'
].join(', ');

let gyroSupported = false;
let gyroBeta = 0, gyroGamma = 0;
let activeCard = null;
let rafId = null;

function initTiltCards() {
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll(SELECTORS);
  cards.forEach(card => {
    // Enable 3D transform style
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.willChange = 'transform';

    // Ensure inner content doesn't get distorted
    const inner = card.querySelector('.work-card-inner, .skill-items, .exp-list, .ach-desc, .info-value, .stat-num');
    if (inner) {
      inner.style.transformStyle = 'preserve-3d';
      inner.style.transform = 'translateZ(20px)';
    }

    // Mouse events for desktop
    if (!isMobile) {
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      card.addEventListener('mouseenter', onMouseEnter);
    }
  });

  // Gyroscope for mobile
  if (isMobile && window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ requires permission
      const requestBtn = document.createElement('button');
      requestBtn.textContent = 'Enable 3D Tilt';
      requestBtn.style.cssText = `
        position: fixed; bottom: 1rem; right: 1rem; z-index: 1000;
        padding: 0.75rem 1.25rem; background: var(--black); color: var(--white);
        border: none; border-radius: var(--radius-pill); font-weight: 600;
        cursor: pointer; font-family: var(--font-primary);
      `;
      requestBtn.addEventListener('click', async () => {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            enableGyroscope();
            requestBtn.remove();
          }
        } catch (e) {
          console.log('Gyroscope permission denied');
        }
      });
      document.body.appendChild(requestBtn);
    } else {
      // Android and others
      enableGyroscope();
    }
  }
}

function enableGyroscope() {
  gyroSupported = true;
  window.addEventListener('deviceorientation', onDeviceOrientation, true);
}

function onDeviceOrientation(e) {
  if (!gyroSupported) return;

  // beta: front-to-back tilt (-180 to 180), gamma: left-to-right tilt (-90 to 90)
  gyroBeta = e.beta || 0;
  gyroGamma = e.gamma || 0;

  // Clamp values
  gyroBeta = Math.max(-40, Math.min(40, gyroBeta));
  gyroGamma = Math.max(-40, Math.min(40, gyroGamma));

  applyGyroToActiveCard();
}

function applyGyroToActiveCard() {
  if (!activeCard) return;

  // Convert to rotation (inverted for natural feel)
  const rx = -gyroBeta * 0.5;  // front-back tilt -> rotateX
  const ry = gyroGamma * 0.5;  // left-right tilt -> rotateY

  activeCard.style.transform = `
    perspective(1000px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    scale3d(1.02, 1.02, 1.02)
  `;
}

function onMouseEnter(e) {
  activeCard = e.currentTarget;
  activeCard.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
}

function onMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  // Calculate mouse position relative to card center (-1 to 1)
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseX = (e.clientX - centerX) / (rect.width / 2);
  const mouseY = (e.clientY - centerY) / (rect.height / 2);

  // Clamp to prevent over-rotation
  const clamp = (val, max) => Math.max(-max, Math.min(max, val));
  const rx = clamp(-mouseY * 12, 12);  // Max 12deg
  const ry = clamp(mouseX * 12, 12);

  // Apply transform with CSS custom properties for smooth interpolation
  card.style.transform = `
    perspective(1000px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    scale3d(1.02, 1.02, 1.02)
  `;

  // Add subtle shadow based on tilt
  const shadowX = ry * 2;
  const shadowY = rx * 2;
  card.style.boxShadow = `
    ${shadowX}px ${shadowY}px 24px rgba(0, 0, 0, 0.08),
    ${shadowX * 0.5}px ${shadowY * 0.5}px 8px rgba(0, 0, 0, 0.04)
  `;
}

function onMouseLeave(e) {
  const card = e.currentTarget;

  card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.boxShadow = '';

  // Reset inner content
  const inner = card.querySelector('[style*="translateZ"]');
  if (inner) {
    inner.style.transform = 'translateZ(20px)';
  }

  if (activeCard === card) {
    activeCard = null;
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTiltCards);
} else {
  initTiltCards();
}

export { initTiltCards };