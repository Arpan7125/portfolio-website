import { useEffect, useState } from 'react';
import { driver } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

const START = new Date(driver.careerStart).getTime();

function format(elapsedMs) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor(elapsedMs % 1000);

  return `${String(hours).padStart(5, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

/**
 * The signature element: a live lap timer counting from the career start,
 * sitting top-right in a timing strip that mirrors the bottom broadcast bar.
 * rAF at full millisecond precision normally; one tick per second when the
 * viewer has asked for reduced motion.
 */
export default function LapTimer() {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(() => Date.now() - START);

  useEffect(() => {
    if (reduced) {
      setElapsed(Date.now() - START);
      const id = setInterval(() => setElapsed(Date.now() - START), 1000);
      return () => clearInterval(id);
    }

    let frame;
    const tick = () => {
      setElapsed(Date.now() - START);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/92 backdrop-blur-md">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-3 px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-f1-red" aria-hidden="true" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-f1-red">
            Live
          </span>
          <span className="hidden truncate font-mono text-[10px] tracking-[0.18em] text-white/40 sm:inline">
            {driver.name} · CAR {driver.number}
          </span>
        </div>

        <div className="flex shrink-0 items-baseline gap-2">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 sm:inline">
            Career Lap Time
          </span>
          <span
            className="font-mono text-xs font-semibold tabular-nums text-teal sm:text-sm"
            role="timer"
            aria-live="off"
            aria-label="Time elapsed since career start in January 2022"
          >
            {format(elapsed)}
          </span>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-f1-red via-teal to-transparent opacity-70"
      />
    </div>
  );
}
