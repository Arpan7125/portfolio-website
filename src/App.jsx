import { useCallback, useRef } from 'react';
import GrainOverlay from './components/GrainOverlay';
import CheckeredWipe from './components/CheckeredWipe';
import LapTimer from './components/LapTimer';
import Hero from './components/sections/Hero';
import DriverProfile from './components/sections/DriverProfile';
import RaceCalendar from './components/sections/RaceCalendar';
import ConstructorStandings from './components/sections/ConstructorStandings';
import Garage from './components/sections/Garage';
import RaceResults from './components/sections/RaceResults';
import TrophyCabinet from './components/sections/TrophyCabinet';
import PaddockRadio from './components/sections/PaddockRadio';
import BroadcastBar from './components/sections/BroadcastBar';
import ScrollCar from './components/ScrollCar';
import { sections } from './data/profile';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const wipeRef = useRef(null);
  const reduced = useReducedMotion();

  /** Full-screen checkered wipe, then scroll to the driver profile. */
  const startRace = useCallback(() => {
    const target = document.getElementById('driver');
    const wipe = wipeRef.current;

    if (reduced || !wipe) {
      target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      return;
    }

    wipe.style.transition = 'none';
    wipe.style.transform = 'translateX(-100%)';
    wipe.style.opacity = '1';
    // Force a reflow so the reset above is committed before animating.
    void wipe.offsetWidth;
    wipe.style.transition = 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)';
    wipe.style.transform = 'translateX(0)';

    setTimeout(() => {
      target?.scrollIntoView({ behavior: 'auto' });
      wipe.style.transition = 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)';
      wipe.style.transform = 'translateX(100%)';
      setTimeout(() => {
        wipe.style.opacity = '0';
      }, 760);
    }, 780);
  }, [reduced]);

  return (
    <>
      <a
        href="#driver"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-f1-red focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>

      <GrainOverlay />
      <LapTimer />
      <ScrollCar />

      {/* Section nav — desktop only, sits clear of the lap timer */}
      <nav
        aria-label="Sections"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-f1-red"
          >
            <span className="h-px w-4 bg-current transition-all duration-200 group-hover:w-7" />
            {s.label}
          </a>
        ))}
      </nav>

      {/* Clearance for the fixed timing strip */}
      <div className="h-10" aria-hidden="true" />

      <main>
        <Hero onStartRace={startRace} />
        <CheckeredWipe />
        <DriverProfile />
        <CheckeredWipe />
        <RaceCalendar />
        <CheckeredWipe />
        <ConstructorStandings />
        <CheckeredWipe />
        <Garage />
        <CheckeredWipe />
        <RaceResults />
        <CheckeredWipe />
        <TrophyCabinet />
        <CheckeredWipe />
        <PaddockRadio />
      </main>

      {/* Clearance for the fixed broadcast bar */}
      <div className="h-14" aria-hidden="true" />
      <BroadcastBar />

      {/* Full-screen wipe used by START RACE */}
      <div
        ref={wipeRef}
        aria-hidden="true"
        className="checkered pointer-events-none fixed inset-0 z-[65] opacity-0"
        style={{ transform: 'translateX(-100%)' }}
      />
    </>
  );
}
