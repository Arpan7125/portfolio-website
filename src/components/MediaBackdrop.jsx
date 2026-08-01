import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useMediaQuery } from '../hooks/useReducedMotion';

/**
 * Photo / video backdrop layer.
 *
 * Degrades in this order, so the site looks intentional at every step:
 *   video  -> only on a fine pointer, wide viewport, full motion, and once
 *             the element is actually in view
 *   poster -> everywhere else (mobile, reduced motion, video still loading)
 *   none   -> if neither asset is configured, renders nothing at all and the
 *             existing gradient design shows through untouched
 *
 * A scrim always sits on top so body copy keeps its contrast ratio.
 */
export default function MediaBackdrop({
  video,
  poster,
  opacity = 0.3,
  scrim = 'radial',
  className = '',
}) {
  const hostRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  const reduced = useReducedMotion();
  const wideEnough = useMediaQuery('(min-width: 768px)');
  const finePointer = useMediaQuery('(pointer: fine)');

  // Video is a nice-to-have, never a requirement: hold it back on phones,
  // touch devices and for anyone who asked for less motion.
  const wantsVideo = Boolean(video) && !reduced && wideEnough && finePointer;

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !wantsVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [wantsVideo]);

  // Pause off-screen so a backdrop never burns CPU it isn't earning.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  if (!video && !poster) return null;

  const scrims = {
    radial:
      'bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.88)_60%,#0A0A0A_100%)]',
    bottom: 'bg-gradient-to-b from-tarmac/70 via-tarmac/85 to-tarmac',
    flat: 'bg-tarmac/80',
  };

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {poster && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: playing ? 0 : opacity }}
        />
      )}

      {wantsVideo && inView && (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: playing ? opacity : 0 }}
        />
      )}

      {/* Contrast scrim + broadcast tint */}
      <div className={`absolute inset-0 ${scrims[scrim] ?? scrims.radial}`} />
      <div className="absolute inset-0 bg-gradient-to-tr from-f1-red/[0.06] via-transparent to-teal/[0.05]" />
    </div>
  );
}
