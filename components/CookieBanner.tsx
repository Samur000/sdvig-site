"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "sdvig_cookie_consent";
const CONSENT_VERSION = "2026-07-07";
const APPEAR_DELAY_MS = 600;
const EXIT_DURATION_MS = 350;

type StoredConsent = {
  accepted: boolean;
  date: string;
  version: string;
};

function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

function writeConsent(consent: StoredConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Private mode or storage disabled — fail silently.
  }
}

export function CookieBanner() {
  // `render` controls presence in the DOM; `entered` drives the slide/fade.
  const [render, setRender] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    const alreadyConsented =
      stored?.accepted === true && stored.version === CONSENT_VERSION;
    if (alreadyConsented) return;

    setRender(true);
    const showTimer = window.setTimeout(
      () => setEntered(true),
      APPEAR_DELAY_MS,
    );
    return () => window.clearTimeout(showTimer);
  }, []);

  const handleAccept = () => {
    writeConsent({
      accepted: true,
      date: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
    setEntered(false);
    window.setTimeout(() => setRender(false), EXIT_DURATION_MS);
  };

  if (!render) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о файлах cookie"
      className={cn(
        "fixed z-[60] pointer-events-none",
        "inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6",
        "sm:w-[460px]",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto",
          "bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl",
          "shadow-[var(--shadow-hard)]",
          "p-5 sm:p-6",
          "transition-[transform,opacity] ease-out will-change-transform",
          "motion-reduce:transition-none",
          entered
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0",
        )}
        style={{ transitionDuration: `${EXIT_DURATION_MS}ms` }}
      >
        <p className="text-[16px] font-bold text-text-primary">
          Секунду, пока ты не отвлёкся 🍪
        </p>
        <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-text-secondary">
          Мы печём cookies — цифровые, без калорий. Они помогают сайту
          работать быстрее и запоминают твои настройки, чтобы тебе не
          приходилось. Без рекламной слежки, честно.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            onClick={handleAccept}
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-2.5 rounded-lg font-bold text-[15px]",
              "bg-accent text-white",
              "border-2 border-[var(--border)] shadow-[var(--shadow-hard)]",
              "transition-all duration-150 ease-out",
              "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]",
              "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)]",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated",
              "motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0",
            )}
          >
            Окей
          </button>

          <Link
            href="/cookie"
            className="text-[14px] text-text-muted underline decoration-2 underline-offset-4 hover:text-text-primary transition-colors"
          >
            Что за куки?
          </Link>
        </div>
      </div>
    </div>
  );
}
