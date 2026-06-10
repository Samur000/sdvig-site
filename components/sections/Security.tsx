"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Database,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
  {
    icon: KeyRound,
    title: "E2EE шифрование",
    text: "AES-256 на твоём устройстве. Если кто-то перехватит — увидит только зашифрованные байты.",
  },
  {
    icon: Database,
    title: "Локальное хранилище",
    text: "Все данные по умолчанию хранятся в браузере или на телефоне. Без облака, без серверов.",
  },
  {
    icon: EyeOff,
    title: "Без рекламы и трекеров",
    text: "Никаких пикселей Facebook, никакой Google Analytics, никаких рекламных профилей.",
  },
];

const sampleData = [
  { tag: "Заметка", value: "Купить молоко и хлеб" },
  { tag: "Привычка", value: "Пить воду по утрам" },
  { tag: "Финансы", value: "Остаток 12 480 ₽" },
];

const HEX = "0123456789abcdef";

// Deterministic pseudo-random hex generation (no Math.random — keeps SSR/CSR identical)
function hexFor(text: string, salt: number): string {
  let v = salt * 31 + 7;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      out += " ";
      continue;
    }
    v = (v * 9301 + 49297) % 233280;
    out += HEX[Math.floor((v / 233280) * 16)];
  }
  return out;
}

export function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-bg-primary py-24 md:py-[140px]"
    >
      <Container>
        <div className="text-center max-w-[820px] mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-h2 text-text-primary"
          >
            Твои данные — только твои
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed"
          >
            Локальное хранение, E2EE-шифрование, никаких трекеров.
            <br className="hidden md:block" /> Даже мы не видим, что внутри.
          </motion.p>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* List */}
          <div className="order-2 lg:order-1">
            <ul className="flex flex-col gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.12,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex items-start gap-5"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-xl border-[3px] border-[var(--border)] bg-accent text-white flex items-center justify-center shadow-[4px_4px_0_var(--border)]">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-h4 text-text-primary mb-2">
                        {f.title}
                      </h3>
                      <p className="text-[16px] text-text-secondary leading-relaxed max-w-[420px]">
                        {f.text}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Lock illustration */}
          <div className="order-1 lg:order-2">
            <Padlock progress={scrollYProgress} />
          </div>
        </div>

        {/* CTA → детальная архитектура */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <Link
            href="/security"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-bg-elevated text-text-primary border-[3px] border-[var(--border)] rounded-xl font-bold shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)] transition-all duration-150"
          >
            <ShieldCheck
              size={20}
              strokeWidth={2.4}
              className="text-accent shrink-0"
            />
            <span>Подробнее об архитектуре безопасности</span>
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function Padlock({ progress }: { progress: MotionValue<number> }) {
  const [locked, setLocked] = useState(false);
  const [encState, setEncState] = useState(0);

  useMotionValueEvent(progress, "change", (p) => {
    setLocked(p > 0.33);
    // Encryption window: starts at p=0.30, fully encrypted by p=0.70
    const e = (p - 0.3) / 0.4;
    setEncState(Math.max(0, Math.min(1, e)));
  });

  // Shackle drops/lifts depending on lock state. We animate a vertical offset
  // (closed = down/seated, open = lifted up).
  const shackleVariants = {
    open: { y: -14 },
    closed: { y: 0 },
  };

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* Shackle */}
      <div className="relative h-[88px] flex items-end justify-center">
        <motion.svg
          viewBox="0 0 200 100"
          width="180"
          height="90"
          className="block"
          initial="open"
          animate={locked ? "closed" : "open"}
          variants={shackleVariants}
          transition={{
            duration: 0.45,
            ease: [0.5, 1.6, 0.4, 1],
          }}
        >
          {/* outer black stroke */}
          <path
            d="M 36 100 L 36 56 Q 36 14, 100 14 Q 164 14, 164 56 L 164 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* inner accent stroke */}
          <path
            d="M 36 100 L 36 56 Q 36 14, 100 14 Q 164 14, 164 56 L 164 100"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* impact spark when locking */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={
            locked
              ? { opacity: [0, 1, 0], scale: [0.6, 1.4, 1.6] }
              : { opacity: 0, scale: 0.6 }
          }
          transition={{ duration: 0.5 }}
        >
          <svg width="120" height="120" viewBox="-60 -60 120 120">
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const x1 = Number((Math.cos(a) * 18).toFixed(2));
              const y1 = Number((Math.sin(a) * 18).toFixed(2));
              const x2 = Number((Math.cos(a) * 36).toFixed(2));
              const y2 = Number((Math.sin(a) * 36).toFixed(2));
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
          </svg>
        </motion.div>
      </div>

      {/* Lock body */}
      <motion.div
        className="relative z-10 -mt-3 bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)] overflow-hidden"
        animate={
          locked
            ? { x: [0, -4, 4, -3, 3, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.45 }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b-[1px] border-[var(--border)] bg-bg-secondary">
          <div className="flex items-center gap-2">
            <span className="block w-2.5 h-2.5 rounded-full bg-error border-2 border-[var(--border)]" />
            <span className="block w-2.5 h-2.5 rounded-full bg-warning border-2 border-[var(--border)]" />
            <span className="block w-2.5 h-2.5 rounded-full bg-success border-2 border-[var(--border)]" />
            <span className="ml-3 text-[11px] font-mono text-text-muted tracking-wide">
              vault://my-data
            </span>
          </div>
          <motion.span
            animate={
              locked
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3, delay: locked ? 0.2 : 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider border-2 border-[var(--border)]"
          >
            <ShieldCheck size={11} strokeWidth={2.5} />
            Зашифровано
          </motion.span>
        </div>

        {/* Data rows */}
        <div className="p-6 font-mono text-[14px] flex flex-col gap-5">
          {sampleData.map((d, i) => (
            <DataRow
              key={i}
              tag={d.tag}
              value={d.value}
              salt={i + 1}
              progress={encState}
              index={i}
            />
          ))}
        </div>

        {/* Footer with keyhole */}
        <div className="flex items-center justify-center gap-3 px-5 py-3 border-t-[1px] border-[var(--border)] bg-bg-secondary">
          <motion.div
            className="w-7 h-7 rounded-full border-2 border-[var(--border)] flex items-center justify-center"
            animate={
              locked
                ? {
                    background: "var(--accent)",
                    rotate: 0,
                  }
                : {
                    background: "var(--bg-elevated)",
                    rotate: -90,
                  }
            }
            transition={{ duration: 0.4 }}
          >
            <div className="w-2 h-3 rounded-full bg-[var(--border)]" />
          </motion.div>
          <span className="font-mono text-[11px] text-text-muted">
            {locked ? "AES-256 · LOCKED" : "AES-256 · UNLOCKED"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function DataRow({
  tag,
  value,
  salt,
  progress,
  index,
}: {
  tag: string;
  value: string;
  salt: number;
  progress: number;
  index: number;
}) {
  // Cascade per row: row 0 starts encrypting at 0, row 1 at 0.18, row 2 at 0.36
  const rowOffset = index * 0.18;
  const localProgress = Math.max(
    0,
    Math.min(1, (progress - rowOffset) / 0.42),
  );
  const cutoff = Math.floor(localProgress * value.length);
  const encrypted = useMemo(() => hexFor(value, salt), [value, salt]);
  const encPart = encrypted.slice(0, cutoff);
  const plainPart = value.slice(cutoff);
  const isFullyEncrypted = cutoff >= value.length;

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.1em] text-text-muted mb-1.5 flex items-center gap-2">
        <span>{tag}</span>
        {isFullyEncrypted && (
          <span className="text-accent">●</span>
        )}
      </div>
      <div className="text-text-primary leading-snug">
        <span className="text-error/85">{encPart}</span>
        {plainPart && (
          <span className="relative">
            {/* scan-line indicator at the encryption edge */}
            {cutoff > 0 && cutoff < value.length && (
              <span className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-accent animate-pulse" />
            )}
            {plainPart}
          </span>
        )}
      </div>
    </div>
  );
}
