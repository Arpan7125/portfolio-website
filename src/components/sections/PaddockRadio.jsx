import { useRef, useState } from 'react';
import SectionHeading from '../SectionHeading';
import { channels, contactEmail } from '../../data/profile';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BARS = Array.from({ length: 28 }, (_, i) => i);

function Waveform({ reduced }) {
  return (
    <div className="flex h-10 w-full items-center gap-[3px]" aria-hidden="true">
      {BARS.map((i) => (
        <span
          key={i}
          className="min-w-[2px] flex-1 origin-center bg-teal"
          style={{
            height: '100%',
            transform: reduced ? `scaleY(${0.2 + ((i * 7) % 10) / 12})` : undefined,
            animation: reduced
              ? 'none'
              : `radio-bar ${0.7 + (i % 5) * 0.13}s ease-in-out ${(i % 7) * 0.09}s infinite`,
            opacity: 0.35 + ((i % 5) / 10),
          }}
        />
      ))}
    </div>
  );
}

export default function PaddockRadio() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ callsign: '', frequency: '', message: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  useGsapReveal(ref);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError('');
  };

  const transmit = (e) => {
    e.preventDefault();

    if (!form.callsign.trim() || !form.frequency.trim() || !form.message.trim()) {
      setError('ALL CHANNELS REQUIRED — complete the log before transmitting.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.frequency.trim())) {
      setError('FREQUENCY INVALID — check the email address.');
      return;
    }

    const subject = `Paddock Radio — ${form.callsign.trim()}`;
    const body = `Callsign: ${form.callsign.trim()}\nFrequency: ${form.frequency.trim()}\n\n${form.message.trim()}\n`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const field =
    'w-full border border-white/12 bg-black/40 px-3 py-2.5 font-mono text-sm text-white placeholder:text-white/25 transition-colors focus:border-teal focus:outline-none';
  const label =
    'mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted';

  return (
    <section id="radio" ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        kicker="PADDOCK RADIO"
        title="Open a"
        accent="Channel"
        sub="Box, box. Pick a frequency or file a transmission in the log below."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Radio deck */}
        <div className="panel clip-broadcast carbon-weave p-5 sm:p-6" data-reveal>
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted">FREQUENCY</div>
              <div className="font-display text-2xl font-black tabular-nums text-teal">
                71.25 <span className="text-sm text-muted">MHz</span>
              </div>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-f1-red">
              <span className="animate-blink h-1.5 w-1.5 rounded-full bg-f1-red" aria-hidden="true" />
              LIVE
            </span>
          </div>

          <Waveform reduced={reduced} />

          <div className="mt-6 space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-3 border border-white/12 bg-black/30 px-4 py-3 transition-colors duration-200 hover:border-f1-red/60 hover:bg-f1-red/[0.07]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xs font-bold uppercase tracking-[0.16em]">
                      {c.label}
                    </span>
                    <span className="block truncate font-mono text-[11px] text-muted">
                      {c.handle}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-muted transition-colors group-hover:text-f1-red">
                  OPEN CHANNEL ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Transmission log */}
        <form onSubmit={transmit} className="panel clip-broadcast p-5 sm:p-6" data-reveal noValidate>
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-f1-red" aria-hidden="true" />
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em]">
              Transmission Log
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className={label} htmlFor="callsign">
                Callsign / Name
              </label>
              <input
                id="callsign"
                className={field}
                value={form.callsign}
                onChange={update('callsign')}
                placeholder="e.g. Team Principal"
                autoComplete="name"
              />
            </div>

            <div>
              <label className={label} htmlFor="frequency">
                Frequency / Email
              </label>
              <input
                id="frequency"
                type="email"
                className={field}
                value={form.frequency}
                onChange={update('frequency')}
                placeholder="you@team.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className={label} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className={`${field} resize-y`}
                value={form.message}
                onChange={update('message')}
                placeholder="Box this lap…"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 border-l-2 border-f1-red bg-f1-red/10 px-3 py-2 font-mono text-[11px] tracking-wider text-f1-red">
              {error}
            </p>
          )}

          {sent && (
            <p role="status" className="mt-4 border-l-2 border-teal bg-teal/10 px-3 py-2 font-mono text-[11px] tracking-wider text-teal">
              MESSAGE RECEIVED — your mail client is composing the transmission.
            </p>
          )}

          <button
            type="submit"
            className="clip-broadcast mt-5 w-full bg-f1-red px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            Transmit →
          </button>

          <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-wider text-white/35">
            Opens your mail client addressed to {contactEmail}. Nothing is sent to a third party.
          </p>
        </form>
      </div>
    </section>
  );
}
