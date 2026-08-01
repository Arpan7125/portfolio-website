import { useRef } from 'react';
import SectionHeading from '../SectionHeading';
import { trophies } from '../../data/profile';
import { useGsapReveal } from '../../hooks/useGsapReveal';

export default function TrophyCabinet() {
  const ref = useRef(null);
  useGsapReveal(ref, { stagger: 0.08 });

  return (
    <section id="trophies" ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        kicker="TROPHY CABINET"
        title="Podium"
        accent="Finishes"
        sub="Silverware, credentials and the results that stuck."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {trophies.map((t) => {
          const accent = t.accent === 'red' ? 'text-f1-red' : 'text-teal';
          const border = t.accent === 'red' ? 'hover:border-f1-red/50' : 'hover:border-teal/50';

          return (
            <article
              key={t.title}
              data-reveal
              className={`panel clip-broadcast carbon-weave flex items-start gap-4 p-5 transition-colors duration-300 ${border}`}
            >
              <span
                className="grid h-12 w-12 shrink-0 place-items-center border border-white/12 bg-black/40 text-2xl"
                aria-hidden="true"
              >
                {t.icon}
              </span>

              <div className="min-w-0">
                <h3
                  className={`font-display text-sm font-bold uppercase leading-snug tracking-wide ${accent}`}
                >
                  {t.title}
                </h3>
                <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-muted">
                  {t.detail}
                </p>
                {t.placeholder && (
                  <p className="mt-2 inline-block border border-dashed border-white/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Awaiting details
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
