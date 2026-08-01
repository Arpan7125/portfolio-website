import { driver } from '../../data/profile';

function Field({ label, value, className = '', accent }) {
  return (
    <div className={`flex items-center gap-2 whitespace-nowrap px-3 sm:px-4 ${className}`}>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </span>
      <span
        className={`font-display text-[11px] font-bold uppercase tracking-wider ${
          accent ?? 'text-white'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/** Sticky F1 live-broadcast overlay strip. */
export default function BroadcastBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/92 backdrop-blur-md">
      <div className="checkered h-[3px] w-full opacity-60" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl items-center divide-x divide-white/10 overflow-x-auto py-2">
        <Field label="Driver" value={driver.name} accent="text-f1-red" />
        <Field
          label="Team"
          value={`${driver.team} / ${driver.secondTeam}`}
          className="hidden md:flex"
        />
        <Field label="Lap" value={driver.currentLap} />
        <Field
          label="Gap"
          value={driver.gapToLeader}
          className="hidden sm:flex"
          accent="text-white/70"
        />
        <Field label="DRS" value="OPEN" accent="text-teal" />
      </div>
    </div>
  );
}
