import { useEffect, useRef, useState } from 'react';
import F1Car from './F1Car';
import { useReducedMotion, useMediaQuery } from '../hooks/useReducedMotion';

/**
 * Right-edge telemetry rail: the car drives down the track as the page
 * scrolls, doubling as a read-out of how far through the lap you are.
 */
export default function ScrollCar() {
  const carRef = useRef(null);
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  // 1280px is the first width where the rail clears the max-w-6xl content column.
  const isLarge = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    if (reduced || !isLarge) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);

      const rail = railRef.current;
      const car = carRef.current;
      if (rail && car) {
        const travel = rail.clientHeight - car.clientHeight;
        car.style.transform = `translateY(${travel * p}px)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, isLarge]);

  if (reduced || !isLarge) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-16 right-2 top-14 z-40 hidden w-11 xl:block"
    >
      {/* Kerb-striped track */}
      <div ref={railRef} className="relative h-full w-full">
        <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-white/[0.07]" />
        <div
          className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-f1-red to-teal"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Car, nose-down, riding the rail */}
        <div ref={carRef} className="absolute left-0 top-0 w-11">
          <F1Car className="w-full rotate-90 drop-shadow-[0_0_12px_rgba(232,0,45,0.5)]" />
        </div>

        {/* Lap progress read-out */}
        <span className="absolute -left-1 bottom-[-1.75rem] font-mono text-[9px] tabular-nums tracking-widest text-muted">
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
