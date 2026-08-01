import { useRef, useState } from 'react';
import SectionHeading from '../SectionHeading';
import TyreBadge from '../TyreBadge';
import { standings } from '../../data/profile';
import { useGsapReveal, useInViewOnce } from '../../hooks/useGsapReveal';
import { useCountUp } from '../../hooks/useCountUp';

const MAX_POINTS = Math.max(...standings.map((s) => s.points));

function StandingsRow({ row, active, delay }) {
  const points = useCountUp(row.points, active);

  return (
    <div
      data-reveal
      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-2 border-b border-white/10 px-3 py-4 transition-colors duration-200 hover:bg-white/[0.03] sm:grid-cols-[3rem_minmax(0,14rem)_1fr_5rem] sm:px-4"
    >
      <div className="flex items-center gap-2">
        <span
          className={`font-display text-xl font-black leading-none sm:text-2xl ${
            row.position === 1 ? 'text-f1-red' : 'text-white/40'
          }`}
        >
          {row.position}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <TyreBadge compound={row.compound} size={26} className="shrink-0" />
        <span className="truncate font-display text-sm font-bold uppercase tracking-wide sm:text-base">
          {row.constructor}
        </span>
      </div>

      <div className="col-span-3 sm:col-span-1 sm:col-start-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {row.tech.map((t) => (
            <span
              key={t}
              className="border border-white/12 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="h-1 w-full overflow-hidden bg-kerb">
          <div
            className="h-full bg-gradient-to-r from-f1-red to-teal transition-[width] duration-[1200ms] ease-out"
            style={{
              width: active ? `${(row.points / MAX_POINTS) * 100}%` : '0%',
              transitionDelay: `${delay}ms`,
            }}
          />
        </div>
      </div>

      <div className="col-start-3 row-start-1 text-right sm:col-start-4">
        <span className="font-display text-lg font-black tabular-nums text-teal sm:text-2xl">
          {points}
        </span>
        <span className="ml-1 font-mono text-[10px] tracking-widest text-muted">PTS</span>
      </div>
    </div>
  );
}

export default function ConstructorStandings() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useGsapReveal(ref);
  useInViewOnce(ref, () => setActive(true));

  return (
    <section id="standings" ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        kicker="CONSTRUCTOR STANDINGS"
        title="Championship"
        accent="Table"
        sub="Skill categories ranked as constructors, with the tech that scores the points."
      />

      <div className="panel clip-broadcast overflow-hidden" data-reveal>
        <div className="hidden grid-cols-[3rem_minmax(0,14rem)_1fr_5rem] gap-x-4 border-b border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:grid">
          <span>Pos</span>
          <span>Constructor</span>
          <span>Technology</span>
          <span className="text-right">Points</span>
        </div>

        {standings.map((row, i) => (
          <StandingsRow key={row.constructor} row={row} active={active} delay={i * 110} />
        ))}
      </div>
    </section>
  );
}
