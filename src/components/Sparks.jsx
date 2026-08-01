import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const options = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, width: 1400, height: 900 } },
    color: { value: ['#FF8A00', '#FFC400', '#FFFFFF', '#E8002D'] },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.15, max: 0.95 },
      animation: { enable: true, speed: 1.4, startValue: 'max', destroy: 'min' },
    },
    size: { value: { min: 0.6, max: 2.2 } },
    move: {
      enable: true,
      direction: 'top-right',
      speed: { min: 1.5, max: 5 },
      straight: false,
      outModes: { default: 'out' },
      gravity: { enable: true, acceleration: -2.5 },
    },
    life: {
      duration: { value: { min: 1.2, max: 3.2 }, sync: false },
      count: 0,
    },
    shadow: { enable: true, color: '#FF8A00', blur: 6 },
  },
  emitters: [
    {
      position: { x: 12, y: 96 },
      rate: { quantity: 3, delay: 0.14 },
      size: { width: 30, height: 0 },
    },
    {
      position: { x: 72, y: 99 },
      rate: { quantity: 2, delay: 0.22 },
      size: { width: 40, height: 0 },
    },
  ],
};

/**
 * Floor sparks. Lazy-loaded so the particles engine lands in its own chunk
 * and never blocks first paint; the caller decides whether to mount it at all.
 */
export default function Sparks() {
  return (
    <ParticlesProvider init={(engine) => loadSlim(engine)}>
      <Particles id="floor-sparks" className="pointer-events-none absolute inset-0" options={options} />
    </ParticlesProvider>
  );
}
