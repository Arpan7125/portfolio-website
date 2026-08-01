const COMPOUND = {
  soft: { ring: '#E8002D', letter: 'S', label: 'Soft compound' },
  medium: { ring: '#FFD100', letter: 'M', label: 'Medium compound' },
  hard: { ring: '#FFFFFF', letter: 'H', label: 'Hard compound' },
};

/** F1 tyre marking: dark carcass with a coloured sidewall stripe. */
export default function TyreBadge({ compound = 'soft', size = 34, className = '' }) {
  const c = COMPOUND[compound] ?? COMPOUND.soft;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label={c.label}
    >
      <circle cx="20" cy="20" r="18.5" fill="#111" stroke="#2a2a2a" strokeWidth="1" />
      <circle cx="20" cy="20" r="15" fill="none" stroke={c.ring} strokeWidth="3.5" />
      <circle cx="20" cy="20" r="9.5" fill="#1a1a1a" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        fill={c.ring}
        fontSize="11"
        fontWeight="700"
        fontFamily="Orbitron, sans-serif"
      >
        {c.letter}
      </text>
    </svg>
  );
}

export { COMPOUND };
