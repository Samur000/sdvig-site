"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  NAVBAR_HEIGHT,
  useNavbarVisibility,
} from "@/lib/useNavbarVisibility";
import { Container } from "@/components/ui/Container";

type TocSection = {
  id: string;
  num: string;
  title: string;
};

type Props = {
  sections: TocSection[];
  /** id of the inline TOC element used as the "appear after" trigger. */
  triggerId: string;
};

export function LegalTocBar({ sections, triggerId }: Props) {
  const { hidden } = useNavbarVisibility();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Reveal the floating bar once the inline TOC has scrolled above the navbar.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const tocEl = document.getElementById(triggerId);
    if (!tocEl) return;

    const update = () => {
      const docBottom = tocEl.offsetTop + tocEl.offsetHeight;
      setShown(window.scrollY > docBottom - NAVBAR_HEIGHT);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [triggerId]);

  // Track the currently visible section using IntersectionObserver.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const map = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          map.set(entry.target.id, entry);
        }
        const visible = Array.from(map.values())
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT + 64}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("touchstart", onPointer, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("touchstart", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!shown && open) setOpen(false);
  }, [shown, open]);

  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <div
      ref={wrapRef}
      aria-hidden={!shown}
      className={cn(
        "fixed left-0 right-0 z-40 will-change-transform",
        "transition-[top,opacity,transform] duration-300 ease-out",
        "bg-[color-mix(in_srgb,var(--bg-primary)_94%,transparent)] backdrop-blur-md",
        "border-b-[1px] border-[var(--border)]",
        shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
      )}
      style={{ top: hidden ? 0 : NAVBAR_HEIGHT }}
    >
      <Container>
        <div className="h-12 md:h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="legal-toc-dropdown"
            className={cn(
              "inline-flex items-center gap-2 md:gap-2.5 px-3 py-1.5 rounded-lg border-2 border-[var(--border)]",
              "bg-bg-elevated text-text-primary",
              "transition-colors duration-150",
              "hover:border-accent",
              open && "border-accent",
            )}
          >
            <List
              size={16}
              strokeWidth={2.4}
              className="text-text-muted shrink-0"
            />
            <span className="text-[13px] md:text-[14px] font-semibold">
              Содержание
            </span>
            <ChevronDown
              size={14}
              strokeWidth={2.6}
              className={cn(
                "shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>

          {activeSection && (
            <div
              className="hidden sm:flex min-w-0 items-baseline gap-2 text-[13px] text-text-muted truncate max-w-[60%]"
              aria-live="polite"
            >
              <span className="font-mono tabular-nums shrink-0">
                {activeSection.num}.
              </span>
              <span className="truncate text-text-secondary">
                {activeSection.title}
              </span>
            </div>
          )}
        </div>
      </Container>

      {/* Dropdown panel */}
      <div
        id="legal-toc-dropdown"
        role="region"
        aria-label="Список разделов"
        className={cn(
          "absolute left-0 right-0 top-full",
          "bg-bg-primary border-b-[1px] border-[var(--border)]",
          "shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]",
          "origin-top transition-[opacity,transform] duration-200 ease-out",
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
      >
        <Container>
          <ol className="py-3 max-h-[min(60vh,420px)] overflow-y-auto flex flex-col gap-1">
            {sections.map((s) => {
              const active = s.id === activeId;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-start gap-3 py-2.5 px-3 rounded-lg text-[14px] transition-colors duration-150",
                      active
                        ? "bg-bg-secondary text-text-primary font-semibold"
                        : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono shrink-0 w-7 tabular-nums",
                        active ? "text-accent" : "text-text-muted",
                      )}
                    >
                      {s.num}.
                    </span>
                    <span className="leading-snug">{s.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>
    </div>
  );
}
