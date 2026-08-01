import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered fade/rise for a container's children.
 * Under reduced motion the elements are simply left in their final state.
 *
 * @param {React.RefObject<HTMLElement>} ref  container to search within
 * @param {object} opts
 * @param {string} opts.selector  children to animate (default '[data-reveal]')
 * @param {number} opts.y         rise distance in px
 * @param {number} opts.stagger   seconds between children
 */
export function useGsapReveal(ref, { selector = '[data-reveal]', y = 36, stagger = 0.09 } = {}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, selector, y, stagger, reduced]);
}

/**
 * Fills bars/counters when a container scrolls into view.
 * Returns nothing; instead flips `active` via the supplied setter.
 */
export function useInViewOnce(ref, onEnter, { start = 'top 75%' } = {}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      onEnter();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter,
    });

    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, start, reduced]);
}

export { gsap, ScrollTrigger };
