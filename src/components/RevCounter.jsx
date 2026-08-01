import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const R = 78;
const START_ANGLE = -130;
const SWEEP = 260;
const ARC_LEN = (SWEEP / 360) * 2 * Math.PI * R;

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r, from, to) {
  const [x1, y1] = polar(cx, cy, r, from);
  const [x2, y2] = polar(cx, cy, r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

const TICKS = Array.from({ length: 13 }, (_, i) => i);

/**
 * Rev counter that sweeps to redline on load. Purely decorative —
 * hidden from assistive tech.
 */
export default function RevCounter({ target = 0.82, size = 200 }) {
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setArmed(true), 200);
    return () => clearTimeout(id);
  }, []);

  const filled = armed ? target : 0;
  const needleAngle = START_ANGLE + SWEEP * (reduced ? target : filled);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id="rev-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2BE" />
          <stop offset="65%" stopColor="#00D2BE" />
          <stop offset="100%" stopColor="#E8002D" />
        </linearGradient>
      </defs>

      {/* Track */}
      <path
        d={arcPath(100, 100, R, START_ANGLE, START_ANGLE + SWEEP)}
        fill="none"
        stroke="#1e1e1e"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Redline zone */}
      <path
        d={arcPath(100, 100, R, START_ANGLE + SWEEP * 0.82, START_ANGLE + SWEEP)}
        fill="none"
        stroke="#E8002D"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Live fill */}
      <path
        d={arcPath(100, 100, R, START_ANGLE, START_ANGLE + SWEEP)}
        fill="none"
        stroke="url(#rev-fill)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={ARC_LEN}
        strokeDashoffset={ARC_LEN * (1 - filled)}
        style={{
          transition: reduced ? 'none' : 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Tick marks */}
      {TICKS.map((i) => {
        const deg = START_ANGLE + (SWEEP / 12) * i;
        const [x1, y1] = polar(100, 100, R - 12, deg);
        const [x2, y2] = polar(100, 100, R - 19, deg);
        const [lx, ly] = polar(100, 100, R - 32, deg);
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i >= 10 ? '#E8002D' : '#555'}
              strokeWidth="2"
            />
            {i % 2 === 0 && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={i >= 10 ? '#E8002D' : '#666'}
                fontSize="9"
                fontFamily="'IBM Plex Mono', monospace"
              >
                {i}
              </text>
            )}
          </g>
        );
      })}

      {/* Needle */}
      <g
        style={{
          transform: `rotate(${needleAngle}deg)`,
          transformOrigin: '100px 100px',
          transition: reduced ? 'none' : 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <line x1="100" y1="100" x2="100" y2="38" stroke="#E8002D" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="100" r="7" fill="#0A0A0A" stroke="#E8002D" strokeWidth="2" />

      {/* Readout sits in the open bottom sector, clear of the tick labels */}
      <text
        x="100"
        y="172"
        textAnchor="middle"
        fill="#fff"
        fontSize="20"
        fontWeight="700"
        fontFamily="Orbitron, sans-serif"
      >
        {Math.round((reduced ? target : filled) * 12 * 10) / 10}
      </text>
      <text
        x="100"
        y="190"
        textAnchor="middle"
        fill="#A0A0A0"
        fontSize="9"
        letterSpacing="2"
        fontFamily="'IBM Plex Mono', monospace"
      >
        RPM ×1000
      </text>
    </svg>
  );
}
