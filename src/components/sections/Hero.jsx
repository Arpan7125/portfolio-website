import { Suspense, lazy, useRef } from 'react';
import RevCounter from '../RevCounter';
import HeroCar from '../HeroCar';
import { driver } from '../../data/profile';
import { useReducedMotion, useCoarsePointer } from '../../hooks/useReducedMotion';

const Sparks = lazy(() => import('../Sparks'));

export default function Hero({ onStartRace }) {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const ref = useRef(null);

  // Particles are expensive; skip them entirely for reduced motion and touch.
  const showSparks = !reduced && !coarse;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[calc(100svh-2.5rem)] items-center overflow-hidden pb-24 pt-16"
    >
      {/* Headlight beams cutting diagonally across the tarmac */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-40 top-[-10%] h-[140%] w-72 rotate-[18deg] bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent blur-2xl"
          style={{ animation: reduced ? 'none' : 'headlight-drift 9s ease-in-out infinite' }}
        />
        <div
          className="absolute right-[-6rem] top-[-20%] h-[150%] w-96 rotate-[-14deg] bg-gradient-to-b from-f1-red/[0.12] via-f1-red/[0.04] to-transparent blur-3xl"
          style={{ animation: reduced ? 'none' : 'headlight-drift 11s ease-in-out 1.2s infinite' }}
        />
        <div className="absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent" />
      </div>

      {/* Tarmac grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 45%, #000 30%, transparent 100%)',
        }}
      />

      {showSparks && (
        <Suspense fallback={null}>
          <Sparks />
        </Suspense>
      )}

      <HeroCar />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="clip-tab bg-f1-red px-3 py-1 font-mono text-[11px] font-bold tracking-[0.24em]">
                RACE ENTRY
              </span>
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted">
                CAR {driver.number} · {driver.code}
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-teal">
                <span className="animate-blink h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                GREEN FLAG
              </span>
            </div>

            <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight">
              <span className="block text-[13vw] sm:text-[9vw] lg:text-[5.5rem]">
                {driver.first}
              </span>
              <span className="block text-[13vw] text-outline sm:text-[9vw] lg:text-[5.5rem]">
                {driver.last}
              </span>
            </h1>

            {/* Livery underline */}
            <div className="mt-5 flex max-w-md items-center gap-1.5">
              <span className="animate-livery h-1.5 flex-[3] bg-f1-red" />
              <span
                className="animate-livery h-1.5 flex-1 bg-teal"
                style={{ animationDelay: '0.55s' }}
              />
              <span
                className="animate-livery h-1.5 w-8 bg-white/70"
                style={{ animationDelay: '0.7s' }}
              />
            </div>

            <p className="mt-7 font-heading text-xl font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-2xl">
              {driver.subtitle}
            </p>

            <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted">
              MCA candidate at CHRIST University. I build backend systems, ship them on
              cloud-native infrastructure, and wire AI into the parts that need it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartRace}
                className="animate-drs clip-broadcast group relative bg-f1-red px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99]"
              >
                <span className="relative z-10">Start Race →</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-white/15 transition-transform duration-300 group-hover:scale-x-100"
                />
              </button>

              <div className="font-mono text-[11px] leading-relaxed tracking-[0.16em] text-muted">
                <div className="text-teal">DRS ENABLED</div>
                <div>SECTOR 1 · READY</div>
              </div>
            </div>
          </div>

          {/* Rev counter */}
          <div className="flex justify-center lg:justify-end">
            <div className="panel clip-broadcast carbon-weave p-6">
              <RevCounter target={0.86} size={210} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted sm:block"
      >
        ▼ FORMATION LAP
      </div>
    </section>
  );
}
