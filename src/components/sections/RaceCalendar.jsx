import { useEffect, useRef } from 'react';
import SectionHeading from '../SectionHeading';
import Flag from '../Flag';
import { calendar } from '../../data/profile';
import { gsap, ScrollTrigger, useGsapReveal } from '../../hooks/useGsapReveal';
import { useReducedMotion, useMediaQuery } from '../../hooks/useReducedMotion';

/** Stylised circuit outline — a different squiggle per round. */
function CircuitTrace({ seed = 0, className = '' }) {
  const paths = [
    'M10 40 C 30 8, 62 8, 78 26 C 92 42, 70 52, 52 46 C 34 40, 26 58, 42 66 C 60 74, 92 66, 96 44',
    'M8 52 C 18 18, 54 10, 74 22 C 96 36, 84 60, 62 58 C 44 56, 40 72, 58 74 C 78 76, 96 62, 98 40',
    'M12 30 C 34 10, 70 14, 86 32 C 100 48, 78 70, 56 66 C 38 62, 20 70, 26 52 C 30 40, 48 42, 62 38',
    'M10 60 C 14 26, 44 8, 68 16 C 92 24, 96 50, 76 60 C 58 68, 40 56, 34 42',
  ];
  return (
    <svg viewBox="0 0 110 84" className={className} aria-hidden="true" fill="none">
      <path
        d={paths[seed % paths.length]}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CircuitStop({ stop, index, horizontal }) {
  const notes = (
    <ul className="space-y-2 font-mono text-[12px] leading-relaxed text-muted">
      {stop.notes.map((n) => (
        <li key={n} className="flex gap-2">
          <span className="mt-[7px] h-1 w-1 shrink-0 bg-f1-red" aria-hidden="true" />
          <span>{n}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article
      tabIndex={0}
      data-reveal={horizontal ? undefined : ''}
      className={`panel clip-broadcast carbon-weave group relative flex flex-col overflow-hidden transition-colors duration-300 hover:border-f1-red/50 focus-visible:border-f1-red/50 ${
        horizontal ? 'h-[26rem] w-[22rem] shrink-0' : 'w-full'
      }`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xs font-bold tracking-[0.2em] text-f1-red">
              {stop.round}
            </span>
            <Flag code={stop.flagCode} label={stop.country} />
          </div>
          <h3 className="mt-2 font-display text-xl font-black uppercase leading-tight">
            {stop.city}
          </h3>
          <p className="mt-1 font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
            {stop.venue}
          </p>
        </div>
        <CircuitTrace seed={index} className="h-14 w-16 shrink-0 text-teal/60" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 font-mono text-[11px] tracking-wider">
        <span className="text-muted">{stop.period}</span>
        <span className="clip-tab bg-teal/15 px-2 py-0.5 text-teal">{stop.status}</span>
      </div>

      <p className="px-5 pb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white/70">
        {stop.role}
      </p>

      {horizontal ? (
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-carbon/97 p-5 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 group-focus-visible:translate-y-0">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-f1-red" aria-hidden="true" />
            <span className="font-display text-[10px] font-bold tracking-[0.24em] text-f1-red">
              LAP NOTES
            </span>
          </div>
          {notes}
        </div>
      ) : (
        <div className="border-t border-white/10 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-f1-red" aria-hidden="true" />
            <span className="font-display text-[10px] font-bold tracking-[0.24em] text-f1-red">
              LAP NOTES
            </span>
          </div>
          {notes}
        </div>
      )}
    </article>
  );
}

export default function RaceCalendar() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const horizontal = isDesktop && !reduced;

  useGsapReveal(sectionRef);

  useEffect(() => {
    if (!horizontal) return;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top 2.5rem',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, pin);

    // Measure after the browser has laid out the surrounding sections,
    // not mid-commit, so the pin start lands in the right place.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [horizontal]);

  return (
    <section id="calendar" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="RACE CALENDAR"
          title="Season"
          accent="Schedule"
          sub="Four rounds so far — education, industry and the current campaign. Hover a circuit for lap notes."
        />
      </div>

      {horizontal ? (
        <div
          ref={pinRef}
          className="relative flex h-[calc(100svh-2.5rem)] items-center overflow-hidden"
        >
          <div ref={trackRef} className="flex items-center gap-6 px-[max(1.25rem,calc((100vw-72rem)/2+2rem))]">
            {calendar.map((stop, i) => (
              <div key={stop.round} className="flex items-center gap-6">
                <CircuitStop stop={stop} index={i} horizontal />
                {i < calendar.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex w-16 shrink-0 items-center justify-center font-mono text-xs tracking-[0.3em] text-white/25"
                  >
                    ———
                  </div>
                )}
              </div>
            ))}
            <div className="checkered h-[26rem] w-14 shrink-0 opacity-70" aria-hidden="true" />
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-8">
          {calendar.map((stop, i) => (
            <CircuitStop key={stop.round} stop={stop} index={i} horizontal={false} />
          ))}
        </div>
      )}
    </section>
  );
}
