import F1Car from './F1Car';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * The car that flashes across the hero on a track line, trailing speed
 * streaks and a spark burst. Skipped entirely under reduced motion.
 */
export default function HeroCar() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[12%] z-[1] h-32 overflow-hidden"
    >
      {/* Track line the car runs along */}
      <div className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="animate-car-run absolute bottom-2 left-0 w-[190px] sm:w-[240px]">
        {/* Speed streaks trailing the car */}
        <div className="absolute right-full top-1/2 flex w-40 -translate-y-1/2 flex-col gap-2 pr-2">
          {[0.5, 0.85, 0.35].map((o, i) => (
            <span
              key={i}
              className="block h-px bg-gradient-to-l from-f1-red to-transparent"
              style={{ opacity: o, width: `${60 + i * 26}%`, marginLeft: 'auto' }}
            />
          ))}
        </div>

        <F1Car className="w-full drop-shadow-[0_0_18px_rgba(232,0,45,0.45)]" />

        {/* Floor sparks kicking off the plank */}
        <span className="animate-spark-flicker absolute bottom-1 left-[26%] h-1 w-6 bg-gradient-to-l from-[#FFC400] to-transparent" />
      </div>
    </div>
  );
}
