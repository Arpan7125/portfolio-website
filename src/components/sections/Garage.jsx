import { useRef } from 'react';
import SectionHeading from '../SectionHeading';
import TyreBadge, { COMPOUND } from '../TyreBadge';
import { techInventory, engineerNotes, compoundLegend } from '../../data/profile';
import { useGsapReveal } from '../../hooks/useGsapReveal';

function Bay({ bay, compound, items }) {
  const color = COMPOUND[compound].ring;

  return (
    <div
      data-reveal
      className="panel clip-broadcast group relative overflow-hidden p-5 transition-colors duration-300 hover:border-white/25"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: color }}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">{bay}</h3>
        <TyreBadge compound={compound} size={24} className="shrink-0" />
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wider text-white/75"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Garage() {
  const ref = useRef(null);
  useGsapReveal(ref, { stagger: 0.06 });

  const total = techInventory.reduce((n, b) => n + b.items.length, 0);

  return (
    <section id="garage" ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        kicker="THE GARAGE"
        title="Technical"
        accent="Inventory"
        sub={`${total} parts across ${techInventory.length} bays. Compound marks how hot each bay is running right now.`}
      />

      {/* Race engineer's notes */}
      <div className="panel clip-broadcast carbon-weave mb-6 p-5 sm:p-7" data-reveal>
        <div className="mb-4 flex items-center gap-2">
          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
          <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-teal">
            Race Engineer&rsquo;s Notes
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {engineerNotes.map((note, i) => (
            <p key={note} className="flex gap-3 font-mono text-[12.5px] leading-relaxed text-muted">
              <span className="shrink-0 font-display text-xs font-bold text-f1-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{note}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3" data-reveal>
        {compoundLegend.map((c) => (
          <span key={c.compound} className="flex items-center gap-1.5">
            <TyreBadge compound={c.compound} size={18} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {c.name} · {c.meaning}
            </span>
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techInventory.map((b) => (
          <Bay key={b.bay} {...b} />
        ))}
      </div>
    </section>
  );
}
