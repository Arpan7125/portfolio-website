/**
 * Side-profile F1 car, drawn inline so it inherits theme colours,
 * scales cleanly and costs no network request.
 * viewBox is 260x86 with the car facing right.
 */
export default function F1Car({ className = '', livery = '#E8002D', accent = '#00D2BE' }) {
  return (
    <svg viewBox="0 0 260 86" className={className} aria-hidden="true" fill="none">
      {/* Front wing */}
      <path d="M2 66 h44 l-4 8 H4 z" fill={livery} />
      <path d="M6 62 h38 l-2 4 H8 z" fill={accent} opacity="0.85" />

      {/* Nose cone */}
      <path d="M40 58 C 56 56, 68 52, 84 50 L 96 50 L 96 64 L 42 66 z" fill={livery} />

      {/* Floor / sidepod */}
      <path d="M96 50 C 118 48, 140 50, 168 54 L 196 58 L 196 68 L 96 68 z" fill={livery} />
      <path d="M104 54 C 126 52, 146 54, 166 58 L 166 63 L 104 63 z" fill="#0A0A0A" opacity="0.45" />

      {/* Airbox + engine cover */}
      <path d="M120 50 C 124 34, 136 30, 146 32 C 156 34, 162 44, 168 54 z" fill={livery} />
      <path d="M132 36 C 138 32, 146 33, 150 38 L 138 40 z" fill="#0A0A0A" opacity="0.55" />

      {/* Halo + cockpit */}
      <path
        d="M100 48 C 106 34, 122 32, 130 38"
        stroke="#0A0A0A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="114" cy="46" rx="9" ry="5" fill="#0A0A0A" opacity="0.75" />

      {/* Rear wing */}
      <path d="M206 20 h48 v9 h-48 z" fill={livery} />
      <path d="M212 29 h10 v26 h-10 z" fill={livery} opacity="0.9" />
      <path d="M206 31 h48 v4 h-48 z" fill={accent} opacity="0.9" />

      {/* Wheels */}
      <g>
        <circle cx="72" cy="62" r="20" fill="#141414" stroke="#2a2a2a" strokeWidth="2" />
        <circle cx="72" cy="62" r="9" fill="#1f1f1f" stroke={accent} strokeWidth="2" />
        <circle cx="196" cy="60" r="23" fill="#141414" stroke="#2a2a2a" strokeWidth="2" />
        <circle cx="196" cy="60" r="10" fill="#1f1f1f" stroke={accent} strokeWidth="2" />
      </g>

      {/* Car number */}
      <text
        x="150"
        y="62"
        fill="#fff"
        fontSize="13"
        fontWeight="900"
        fontFamily="Orbitron, sans-serif"
        opacity="0.9"
      >
        71
      </text>
    </svg>
  );
}
