/**
 * Inline SVG flags. Emoji flags are not rendered on Windows (they fall back to
 * region-letter pairs), so circuit stops draw them instead.
 */
const FLAGS = {
  IN: (
    <>
      <rect width="24" height="5.33" y="0" fill="#FF9933" />
      <rect width="24" height="5.34" y="5.33" fill="#fff" />
      <rect width="24" height="5.33" y="10.67" fill="#138808" />
      <circle cx="12" cy="8" r="2.1" fill="none" stroke="#000080" strokeWidth="0.5" />
      <circle cx="12" cy="8" r="0.4" fill="#000080" />
    </>
  ),
  GB: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.9" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3.2" />
    </>
  ),
};

export default function Flag({ code, label, className = 'h-4 w-6' }) {
  const flag = FLAGS[code];
  if (!flag) return null;

  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} shrink-0 border border-white/20`}
      role="img"
      aria-label={label ?? code}
    >
      {flag}
    </svg>
  );
}
