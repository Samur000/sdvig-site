"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ATTEMPTS = [
  // each attempt: a smooth bezier curve that rises then breaks
  { d: "M 70 250 C 90 240, 110 220, 130 180 S 160 110, 175 95", end: { x: 175, y: 95 } },
  { d: "M 220 250 C 240 240, 255 215, 270 180 S 290 130, 300 110", end: { x: 300, y: 110 } },
  { d: "M 345 250 C 360 244, 370 230, 380 210 S 395 175, 400 165", end: { x: 400, y: 165 } },
];

const PATH_LEN = 260;

export function ZigzagGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three sequential reveals across the middle of the scroll.
  const reveal1 = useTransform(scrollYProgress, [0.15, 0.4], [PATH_LEN, 0]);
  const reveal2 = useTransform(scrollYProgress, [0.3, 0.55], [PATH_LEN, 0]);
  const reveal3 = useTransform(scrollYProgress, [0.45, 0.7], [PATH_LEN, 0]);
  const reveals = [reveal1, reveal2, reveal3];

  // Dot opacity: appear at end of each reveal
  const dot1 = useTransform(scrollYProgress, [0.38, 0.45], [0, 1]);
  const dot2 = useTransform(scrollYProgress, [0.53, 0.6], [0, 1]);
  const dot3 = useTransform(scrollYProgress, [0.68, 0.75], [0, 1]);
  const dots = [dot1, dot2, dot3];

  return (
    <div
      ref={ref}
      className="w-full max-w-[480px] mx-auto"
      style={{ position: "relative" }}
      aria-hidden
    >
      <svg
        viewBox="0 0 480 320"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="1" />
          </linearGradient>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="20"
            y="20"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--text-muted)"
              strokeOpacity="0.18"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Card frame */}
        <rect
          x="2"
          y="2"
          width="476"
          height="316"
          rx="20"
          fill="var(--bg-elevated)"
          stroke="var(--border)"
          strokeWidth="3"
        />

        {/* Window dots */}
        <g transform="translate(20 20)">
          <circle cx="6" cy="6" r="4.5" fill="var(--error)" stroke="var(--border)" strokeWidth="1.5" />
          <circle cx="22" cy="6" r="4.5" fill="var(--warning)" stroke="var(--border)" strokeWidth="1.5" />
          <circle cx="38" cy="6" r="4.5" fill="var(--success)" stroke="var(--border)" strokeWidth="1.5" />
        </g>

        {/* Grid */}
        <rect x="20" y="56" width="440" height="240" fill="url(#grid)" rx="8" />

        {/* Y axis labels */}
        <g
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="var(--text-muted)"
        >
          <text x="36" y="80">100%</text>
          <text x="42" y="160">50%</text>
          <text x="50" y="240">0%</text>
        </g>

        {/* X axis baseline */}
        <line
          x1="60"
          y1="252"
          x2="450"
          y2="252"
          stroke="var(--border)"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        {/* Mini caption */}
        <text
          x="240"
          y="44"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="700"
          fill="var(--text-muted)"
          letterSpacing="2"
        >
          ПРОГРЕСС × ВРЕМЯ
        </text>

        {/* Three attempts */}
        {ATTEMPTS.map((a, i) => (
          <g key={i}>
            <motion.path
              d={a.d}
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={PATH_LEN}
              style={{ strokeDashoffset: reveals[i] }}
            />
          </g>
        ))}

        {/* End points (red dots — "broken") */}
        {ATTEMPTS.map((a, i) => (
          <motion.g key={`dot-${i}`} style={{ opacity: dots[i] }}>
            <circle
              cx={a.end.x}
              cy={a.end.y}
              r="11"
              fill="var(--error)"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <line
              x1={a.end.x - 4}
              y1={a.end.y - 4}
              x2={a.end.x + 4}
              y2={a.end.y + 4}
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1={a.end.x + 4}
              y1={a.end.y - 4}
              x2={a.end.x - 4}
              y2={a.end.y + 4}
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.g>
        ))}

        {/* Start points (small dots) */}
        {[
          { x: 70, y: 250 },
          { x: 220, y: 250 },
          { x: 345, y: 250 },
        ].map((p, i) => (
          <circle
            key={`start-${i}`}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="var(--accent)"
            stroke="var(--border)"
            strokeWidth="2"
          />
        ))}

        {/* Bottom labels */}
        <g
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="var(--text-muted)"
          textAnchor="middle"
        >
          <text x="70" y="280">попытка 1</text>
          <text x="220" y="280">попытка 2</text>
          <text x="345" y="280">попытка 3</text>
        </g>
      </svg>
    </div>
  );
}
