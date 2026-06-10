export function BrainIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Иллюстрация мозга"
    >
      <defs>
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="var(--text-muted)"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="400" height="400" fill="var(--bg-elevated)" />
      <rect width="400" height="400" fill="url(#grid)" />

      {/* Left lobe */}
      <path
        d="M 100 140 Q 80 110 110 90 Q 140 70 175 85 Q 195 70 200 90 L 200 290 Q 175 305 145 290 Q 105 280 95 250 Q 75 220 90 195 Q 75 175 100 140 Z"
        fill="var(--accent)"
        stroke="var(--border)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Right lobe */}
      <path
        d="M 300 140 Q 320 110 290 90 Q 260 70 225 85 Q 205 70 200 90 L 200 290 Q 225 305 255 290 Q 295 280 305 250 Q 325 220 310 195 Q 325 175 300 140 Z"
        fill="var(--bg-elevated)"
        stroke="var(--border)"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Brain folds */}
      <path
        d="M 130 130 Q 145 145 130 165 Q 115 180 135 200"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 155 110 Q 170 130 155 150"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 130 230 Q 150 245 140 270"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M 270 130 Q 255 145 270 165 Q 285 180 265 200"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 245 110 Q 230 130 245 150"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 270 230 Q 250 245 260 270"
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Sparkles around */}
      <g stroke="var(--border)" strokeWidth="4" strokeLinecap="round">
        <line x1="60" y1="80" x2="60" y2="100" />
        <line x1="50" y1="90" x2="70" y2="90" />
        <line x1="340" y1="100" x2="340" y2="120" />
        <line x1="330" y1="110" x2="350" y2="110" />
        <line x1="60" y1="320" x2="60" y2="340" />
        <line x1="50" y1="330" x2="70" y2="330" />
        <line x1="340" y1="310" x2="340" y2="330" />
        <line x1="330" y1="320" x2="350" y2="320" />
      </g>

      {/* Bolt */}
      <path
        d="M 200 175 L 185 215 L 200 215 L 195 245 L 215 205 L 200 205 L 205 175 Z"
        fill="var(--accent)"
        stroke="var(--border)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
