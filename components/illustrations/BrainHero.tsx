"use client";

import { motion } from "framer-motion";
import { BrainIllustration } from "./BrainIllustration";

type Orbiter = {
  emoji: string;
  bg: string;
  startAngle: number;
};

// Orbit radius in % of container width — matches the dashed ring (inset 8% → radius ~42%)
const ORBIT_RADIUS_PCT = 42;
const ORBIT_DURATION = 28; // seconds per full revolution
const ICON_SIZE = 60;

const orbiters: Orbiter[] = [
  { emoji: "📝", bg: "#FCD34D", startAngle: -90 },
  { emoji: "📅", bg: "#F472B6", startAngle: -30 },
  { emoji: "💸", bg: "#86EFAC", startAngle: 30 },
  { emoji: "🎯", bg: "#93C5FD", startAngle: 90 },
  { emoji: "✅", bg: "#FDBA74", startAngle: 150 },
  { emoji: "⏱️", bg: "#C4B5FD", startAngle: 210 },
];

export function BrainHero() {
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto">
      {/* Dashed orbit ring */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="absolute inset-[8%] rounded-full border-[2px] border-dashed border-[var(--text-muted)]/25 pointer-events-none"
      />

      {/* Brain card in center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative w-[240px] h-[240px] md:w-[280px] md:h-[280px] border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)] bg-bg-elevated overflow-hidden">
          <BrainIllustration className="w-full h-full" />
        </div>
      </motion.div>

      {/* Rotating orbit arm — all icons travel along the dashed ring together */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          duration: ORBIT_DURATION,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {orbiters.map((o, i) => (
          <OrbiterItem key={i} {...o} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

function OrbiterItem({
  emoji,
  bg,
  startAngle,
  index,
}: Orbiter & { index: number }) {
  const rad = (startAngle * Math.PI) / 180;
  const leftPct = Number((50 + ORBIT_RADIUS_PCT * Math.cos(rad)).toFixed(3));
  const topPct = Number((50 + ORBIT_RADIUS_PCT * Math.sin(rad)).toFixed(3));

  return (
    <div
      className="absolute"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        marginLeft: -ICON_SIZE / 2,
        marginTop: -ICON_SIZE / 2,
        width: ICON_SIZE,
        height: ICON_SIZE,
      }}
    >
      {/* Pop-in entrance: scale 0 → 1 with springy easing */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.5 + index * 0.08,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Counter-rotate so the icon stays upright while orbiting */}
        <motion.div
          className="w-full h-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: ORBIT_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="w-full h-full rounded-2xl border-[3px] border-[var(--border)] flex items-center justify-center shadow-[4px_4px_0_var(--border)]"
            style={{ background: bg, fontSize: 30 }}
          >
            <span aria-hidden>{emoji}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
