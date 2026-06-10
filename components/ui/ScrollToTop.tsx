"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

type ScrollToTopProps = {
  /** Pixels of vertical scroll required before the button appears. */
  threshold?: number;
  /** Optional aria-label override. */
  label?: string;
};

export function ScrollToTop({
  threshold = 480,
  label = "Наверх",
}: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={cn(
        "fixed z-30 right-5 bottom-5 md:right-8 md:bottom-8",
        "inline-flex items-center justify-center",
        "w-12 h-12 md:w-14 md:h-14 rounded-xl",
        "bg-accent text-white border-[3px] border-[var(--border)]",
        "shadow-[var(--shadow-hard)]",
        "transition-all duration-200 ease-out will-change-transform",
        "hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5",
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)]",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp size={22} strokeWidth={2.6} />
    </button>
  );
}
