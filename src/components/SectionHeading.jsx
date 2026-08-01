/** Broadcast-style section header: kicker tab, big display title, subline. */
export default function SectionHeading({ kicker, title, accent, sub, id }) {
  return (
    <header className="mb-10 md:mb-14" data-reveal>
      <div className="mb-4 flex items-center gap-3">
        <span className="clip-tab bg-f1-red px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.22em] text-white">
          {kicker}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
      </div>

      <h2
        id={id}
        className="font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
      >
        {title} {accent && <span className="text-f1-red">{accent}</span>}
      </h2>

      {sub && (
        <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-muted">{sub}</p>
      )}
    </header>
  );
}
