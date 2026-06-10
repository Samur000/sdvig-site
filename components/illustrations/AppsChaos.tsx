"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type IconCfg = {
  emoji: string;
  bg: string;
  x: number;
  y: number;
  rot: number;
};

const apps: IconCfg[] = [
  { emoji: "📝", bg: "#FCD34D", x: -150, y: -90, rot: -8 },
  { emoji: "📅", bg: "#F472B6", x: 130, y: -120, rot: 12 },
  { emoji: "💸", bg: "#86EFAC", x: -180, y: 60, rot: -14 },
  { emoji: "🎯", bg: "#93C5FD", x: 170, y: 50, rot: 6 },
  { emoji: "✅", bg: "#FDBA74", x: -50, y: 130, rot: 4 },
  { emoji: "⏱️", bg: "#C4B5FD", x: 70, y: 140, rot: -10 },
  { emoji: "💭", bg: "#FCA5A5", x: 0, y: -150, rot: 0 },
];

function AppIcon({
  app,
  progress,
  index,
}: {
  app: IconCfg;
  progress: MotionValue<number>;
  index: number;
}) {
  // Tight stack at top of scroll, fully expanded by middle, slight drift after.
  // useScroll with offset ["start end", "end start"] -> 0 when block enters bottom of viewport,
  // 0.5 when block is centered, 1 when block exits top.
  // We want: collected (0) at progress 0..0.2, expanded (1) at 0.5+, stay expanded.
  const expand = useTransform(progress, [0.05, 0.5, 0.85], [0, 1, 1]);

  // Subtle stagger so icons don't all appear at the same scroll position.
  const stagger = index * 0.03;
  const stackJitterX = ((index % 3) - 1) * 6;
  const stackJitterY = (Math.floor(index / 3) - 1) * 6;
  const stackRot = ((index * 13) % 8) - 4;

  const x = useTransform(
    expand,
    [0 + stagger, 1 - stagger * 0.5],
    [stackJitterX, app.x],
  );
  const y = useTransform(
    expand,
    [0 + stagger, 1 - stagger * 0.5],
    [stackJitterY, app.y],
  );
  const rotate = useTransform(
    expand,
    [0 + stagger, 1 - stagger * 0.5],
    [stackRot, app.rot],
  );
  const scale = useTransform(expand, [0, 0.4, 1], [0.7, 1, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, zIndex: 10 + index }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-[3px] border-[var(--border)] flex items-center justify-center text-4xl md:text-5xl shadow-[6px_6px_0_var(--border)]"
        style={{ background: app.bg }}
      >
        {app.emoji}
      </div>
    </motion.div>
  );
}

export function AppsChaos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[480px] aspect-square mx-auto"
      style={{ position: "relative" }}
      aria-hidden
    >
      {apps.map((app, i) => (
        <AppIcon key={i} app={app} progress={scrollYProgress} index={i} />
      ))}
    </div>
  );
}
