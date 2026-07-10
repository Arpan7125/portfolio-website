/**
 * Parallax Scroll Effects — Multi-layer depth on scroll
 * Hero deco circles, section backgrounds, subtle translateY
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ticking = false;
let scrollY = 0;

function initParallax() {
  if (prefersReducedMotion) return;

  // Elements to parallax
  const heroDeco1 = document.querySelector('.deco-circle.c1');
  const heroDeco2 = document.querySelector('.deco-circle.c2');
  const heroContent = document.querySelector('.hero-content');
  const sections = document.querySelectorAll('section');

  if (!heroDeco1 && !heroDeco2 && !heroContent) return;

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

function onScroll() {
  scrollY = window.scrollY || window.pageYOffset;

  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

function updateParallax() {
  ticking = false;

  // Hero decorative circles - opposite direction, different speeds
  const heroDeco1 = document.querySelector('.deco-circle.c1');
  const heroDeco2 = document.querySelector('.deco-circle.c2');
  const heroContent = document.querySelector('.hero-content');

  if (heroDeco1) {
    const speed = 0.15;
    const y = scrollY * speed;
    heroDeco1.style.transform = `translate(${y * 0.5}px, ${y}px)`;
  }

  if (heroDeco2) {
    const speed = -0.1;
    const y = scrollY * speed;
    heroDeco2.style.transform = `translate(${y * 0.3}px, ${y}px)`;
  }

  // Hero content - subtle parallay (slower than scroll)
  if (heroContent) {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
        heroContent.style.transform = `translateY(${progress * 30}px)`;
        heroContent.style.opacity = 1 - progress * 0.3;
      }
    }
  }

  // Section backgrounds - subtle translateY based on scroll progress
  document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Check if section is in viewport
    if (rect.bottom > 0 && rect.top < viewportHeight) {
      const progress = (viewportHeight - rect.top) / (viewportHeight + sectionHeight);
      const translateY = (progress - 0.5) * 20; // -10px to +10px

      // Only apply to sections with background or decorative elements
      const bgElements = section.querySelectorAll('.section-bg, .deco-shape, .floating-shape');
      bgElements.forEach(el => {
        el.style.transform = `translateY(${translateY}px)`;
      });
    }
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax);
} else {
  initParallax();
}

export { initParallax };