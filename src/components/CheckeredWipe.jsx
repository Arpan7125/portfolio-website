import { useEffect, useRef } from 'react';
import F1Car from './F1Car';
import { gsap, ScrollTrigger } from '../hooks/useGsapReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Checkered flag divider between major sections. The band wipes in from the
 * left when scrolled into view and a car runs the length of it; under
 * reduced motion the band is simply present and the car is omitted.
 */
export default function CheckeredWipe({ className = '', car = true }) {
  const bandRef = useRef(null);
  const carRef = useRef(null);
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const band = bandRef.current;
    const root = rootRef.current;
    if (!band || !root) return;

    if (reduced) {
      gsap.set(band, { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(band, { clipPath: 'inset(0 100% 0 0)' });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.inOut' },
      });
      tl.to(band, { clipPath: 'inset(0 0% 0 0)', duration: 0.9 });

      if (carRef.current) {
        gsap.set(carRef.current, { xPercent: -140, opacity: 0 });
        tl.to(carRef.current, { opacity: 1, duration: 0.15 }, 0);
        tl.to(
          carRef.current,
          { xPercent: 1100, duration: 1.15, ease: 'power1.in' },
          0
        );
        tl.to(carRef.current, { opacity: 0, duration: 0.2 }, 1.0);
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top 92%',
        once: true,
        onEnter: () => tl.play(),
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden ${className}`}
    >
      {car && !reduced && (
        <div ref={carRef} className="absolute -top-3 left-0 z-10 w-16 will-change-transform">
          <F1Car className="w-full drop-shadow-[0_0_10px_rgba(232,0,45,0.6)]" />
        </div>
      )}
      <div ref={bandRef} className="checkered h-4 w-full opacity-80" />
      <div className="h-px w-full bg-gradient-to-r from-f1-red via-teal to-transparent opacity-60" />
    </div>
  );
}
