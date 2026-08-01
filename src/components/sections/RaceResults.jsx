import { useRef, useState } from 'react';
import SectionHeading from '../SectionHeading';
import MediaBackdrop from '../MediaBackdrop';
import { projects, media } from '../../data/profile';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { useCoarsePointer } from '../../hooks/useReducedMotion';

function ResultCard({ project, position, coarse }) {
  const [flipped, setFlipped] = useState(false);
  const podium = position <= 3;

  return (
    <div
      data-reveal
      className="flip-card h-[19rem] transition-transform duration-300 hover:scale-[1.02]"
      data-flipped={coarse && flipped ? 'true' : 'false'}
    >
      <div className="flip-inner relative h-full w-full">
        {/* FRONT */}
        <div className="flip-face panel clip-broadcast carbon-weave absolute inset-0 flex flex-col justify-between p-5 transition-colors duration-300 hover:border-f1-red/60 hover:shadow-[0_0_28px_-6px_rgba(232,0,45,0.55)]">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`font-display text-3xl font-black leading-none ${
                podium ? 'text-f1-red' : 'text-white/25'
              }`}
            >
              P{position}
            </span>
            <div className="flex flex-col items-end gap-1.5">
              {project.medal && <span className="text-2xl leading-none">{project.medal}</span>}
              {project.badge && (
                <span className="clip-tab bg-f1-red px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em]">
                  {project.badge}
                </span>
              )}
              {project.fastestLap && (
                <span className="flex items-center gap-1 border border-[#a020f0]/50 px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-[#c77dff]">
                  ⏱ FASTEST LAP
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-black uppercase leading-tight">
              {project.name}
            </h3>
            <p className="mt-1 font-heading text-sm font-semibold uppercase tracking-wider text-teal">
              {project.subtitle}
            </p>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-white/12 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            {coarse ? (
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="font-mono text-[10px] tracking-[0.2em] text-muted underline decoration-f1-red underline-offset-4"
              >
                TAP FOR TELEMETRY →
              </button>
            ) : (
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                HOVER FOR TELEMETRY →
              </span>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back panel clip-broadcast absolute inset-0 flex flex-col justify-between border-f1-red/40 p-5">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-teal" aria-hidden="true" />
              <span className="font-display text-[10px] font-bold tracking-[0.24em] text-teal">
                TELEMETRY
              </span>
            </div>
            <h3 className="font-display text-base font-black uppercase leading-tight">
              {project.name}
            </h3>
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted">
              {project.blurb}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex flex-wrap items-center gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="clip-tab bg-f1-red px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.16em] transition-opacity hover:opacity-85"
                >
                  VIEW REPO ↗
                </a>
              ) : (
                <span className="font-mono text-[10px] tracking-[0.16em] text-white/35">
                  REPO PRIVATE
                </span>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-teal/50 px-2.5 py-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-teal transition-colors hover:bg-teal/10"
                >
                  LIVE ↗
                </a>
              )}
            </span>
            {coarse && (
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="font-mono text-[10px] tracking-[0.18em] text-muted"
              >
                ← BACK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RaceResults() {
  const ref = useRef(null);
  const coarse = useCoarsePointer();
  useGsapReveal(ref, { stagger: 0.07 });

  return (
    <section
      id="results"
      ref={ref}
      className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <MediaBackdrop {...media.results} />

      {/* z-10 keeps content above the positioned backdrop layer */}
      <div className="relative z-10">
        <SectionHeading
          kicker="RACE RESULTS"
          title="Classified"
          accent="Finishers"
          sub={`${projects.length} builds classified. Flip a card for telemetry and the repository.`}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ResultCard key={p.name} project={p} position={i + 1} coarse={coarse} />
          ))}
        </div>
      </div>
    </section>
  );
}
