"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function StreakCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Trigger transition when block is centered in viewport (~0.5).
  // Block is "in view" between roughly 0.25 and 0.75 of progress.
  // Transition zone: 0.35 -> 0.55 (during which 30 fades out, 0 fades in).
  const thirtyOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  const thirtyScale = useTransform(scrollYProgress, [0.3, 0.5], [1, 1.5]);
  const thirtyBlur = useTransform(scrollYProgress, [0.3, 0.5], [0, 14]);
  const thirtyFilter = useTransform(thirtyBlur, (b) => `blur(${b}px)`);

  const zeroOpacity = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const zeroScale = useTransform(scrollYProgress, [0.42, 0.6], [0.55, 1]);
  const zeroRotate = useTransform(scrollYProgress, [0.42, 0.6], [-12, 0]);

  // Particle explosion intensity peaks during transition
  const burstOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.42, 0.55],
    [0, 1, 0],
  );
  const burstScale = useTransform(scrollYProgress, [0.32, 0.55], [0.4, 1.3]);

  const [label, setLabel] = useState("дней подряд");
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      setLabel(p > 0.5 ? "всё сначала" : "дней подряд");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[420px] aspect-square mx-auto"
      style={{ position: "relative" }}
      aria-hidden
    >
      <div className="absolute inset-0 border-[3px] border-[var(--border)] rounded-2xl bg-bg-elevated shadow-[var(--shadow-hard-lg)] overflow-hidden">
        {/* corner decoration */}
        <div className="absolute top-4 left-4 flex gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm border-2 border-[var(--border)] bg-accent"
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-caption text-text-muted mb-4">СТРИК</span>

          <div className="relative h-[160px] w-[200px] flex items-center justify-center">
            {/* particle burst */}
            <motion.svg
              viewBox="-100 -100 200 200"
              width="200"
              height="200"
              className="absolute inset-0 m-auto pointer-events-none"
              style={{ opacity: burstOpacity, scale: burstScale }}
              aria-hidden
            >
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const r = 80;
                const x1 = Number((Math.cos(angle) * 25).toFixed(2));
                const y1 = Number((Math.sin(angle) * 25).toFixed(2));
                const x2 = Number((Math.cos(angle) * r).toFixed(2));
                const y2 = Number((Math.sin(angle) * r).toFixed(2));
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = ((i + 0.5) / 8) * Math.PI * 2;
                const r = 60;
                const cx = Number((Math.cos(angle) * r).toFixed(2));
                const cy = Number((Math.sin(angle) * r).toFixed(2));
                return (
                  <circle
                    key={`d-${i}`}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="var(--error)"
                  />
                );
              })}
            </motion.svg>

            <motion.span
              style={{
                opacity: thirtyOpacity,
                scale: thirtyScale,
                filter: thirtyFilter,
              }}
              className="absolute font-mono font-bold tracking-tight text-accent"
              suppressHydrationWarning
              aria-hidden
            >
              <span className="text-[140px] leading-none">30</span>
            </motion.span>
            <motion.span
              style={{
                opacity: zeroOpacity,
                scale: zeroScale,
                rotate: zeroRotate,
              }}
              className="absolute font-mono font-bold tracking-tight text-error"
              suppressHydrationWarning
              aria-hidden
            >
              <span className="text-[140px] leading-none">0</span>
            </motion.span>
          </div>

          <span
            className="mt-2 text-[18px] font-semibold text-text-secondary"
            suppressHydrationWarning
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
