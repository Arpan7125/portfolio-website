import { useRef, useState } from 'react';
import SectionHeading from '../SectionHeading';
import TyreBadge, { COMPOUND } from '../TyreBadge';
import Flag from '../Flag';
import { driver, stats, tyreSkills, compoundLegend } from '../../data/profile';
import { useGsapReveal, useInViewOnce } from '../../hooks/useGsapReveal';
import { useCountUp } from '../../hooks/useCountUp';

function StatTile({ label, value, active }) {
  const count = useCountUp(value, active);
  return (
    <div className="panel clip-broadcast px-4 py-4 text-center" data-reveal>
      <div className="font-display text-3xl font-black text-teal sm:text-4xl">{count}</div>
      <div className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.16em] text-muted">
        {label}
      </div>
    </div>
  );
}

function SkillGauge({ label, compound, level, active }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4" data-reveal>
      <TyreBadge compound={compound} size={32} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="truncate font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
            {label}
          </span>
          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted">{level}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden bg-kerb">
          <div
            className="h-full transition-[width] duration-1000 ease-out"
            style={{
              width: active ? `${level}%` : '0%',
              backgroundColor: COMPOUND[compound].ring,
              transitionDelay: '120ms',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** F1 helmet, drawn inline so it inherits theme colours and costs no request. */
function Helmet({ className = '' }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <path
        d="M60 8c30 0 46 20 46 44 0 10-2 18-5 24H62c-16 0-26-8-26-20 0-9 6-15 16-17l30-6c-4-10-14-15-22-15-16 0-28 12-28 30 0 6 1 11 3 16l-9 6C22 62 18 52 18 42 18 22 34 8 60 8z"
        fill="#E8002D"
      />
      <path
        d="M52 44c-8 2-12 6-12 12 0 8 7 13 18 13h38c-2 4-5 7-8 9H58c-19 0-31-9-31-22 0-11 8-19 21-22z"
        fill="#0A0A0A"
        opacity="0.35"
      />
      <path d="M14 62l10-6c5 12 15 20 30 22v14H42c-16 0-26-12-28-30z" fill="#141414" />
      <rect x="30" y="86" width="60" height="8" rx="2" fill="#00D2BE" />
      <path d="M60 8c8 0 15 1 21 4l-8 14c-5-2-9-3-13-3z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

export default function DriverProfile() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useGsapReveal(ref);
  useInViewOnce(ref, () => setActive(true));

  return (
    <section id="driver" ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        kicker="DRIVER PROFILE"
        title="The"
        accent="Driver"
        sub="Entry details, season statistics and compound allocation for car 71."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Driver card */}
        <div className="panel clip-broadcast carbon-weave relative overflow-hidden" data-reveal>
          <div className="absolute right-4 top-2 font-display text-[7rem] font-black leading-none text-white/[0.04]">
            {driver.number}
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <img
                src={driver.photo}
                alt="Arpan Mukherjee"
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
                className="h-24 w-24 shrink-0 object-cover object-top grayscale-[0.25]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)' }}
              />
              <Helmet className="h-20 w-20 shrink-0 opacity-90" />
            </div>

            <h3 className="mt-6 font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
              {driver.first}
              <br />
              <span className="text-f1-red">{driver.last}</span>
            </h3>

            <dl className="mt-6 space-y-0 border-t border-white/10 font-mono text-sm">
              {[
                [
                  'Nationality',
                  <span key="n" className="flex items-center justify-end gap-2">
                    <Flag code={driver.flagCode} label={driver.nationality} />
                    {driver.nationality}
                  </span>,
                ],
                ['Team', driver.team],
                ['Secondment', driver.secondTeam],
                ['Race Number', driver.number],
                ['Status', <span key="s" className="text-teal">ON TRACK</span>],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5"
                >
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">{k}</dt>
                  <dd className="text-right text-white/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Stats + gauges */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <StatTile key={s.label} {...s} active={active} />
            ))}
          </div>

          <div className="panel clip-broadcast p-5 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3" data-reveal>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em]">
                Compound Allocation
              </h3>
              <div className="flex flex-wrap gap-3">
                {compoundLegend.map((c) => (
                  <span key={c.compound} className="flex items-center gap-1.5">
                    <TyreBadge compound={c.compound} size={18} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      {c.name} · {c.meaning}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {tyreSkills.map((s) => (
                <SkillGauge key={s.label} {...s} active={active} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
