"use client";

import { useEffect, useRef, useState } from "react";

export type NavbarVisibility = {
  /** True when the navbar should be hidden (user is scrolling DOWN past the top zone). */
  hidden: boolean;
  /** True when scrolled past the very top — used to enable the navbar's bottom border. */
  scrolled: boolean;
};

const TOP_THRESHOLD = 80;
const DELTA_THRESHOLD = 6;

/**
 * Tracks scroll direction and exposes whether the sticky navbar should be
 * hidden (scroll-down) or shown (scroll-up / near top). Multiple consumers
 * subscribe independently — each runs the same logic and stays in sync, so a
 * separate provider is not required.
 */
export function useNavbarVisibility(): NavbarVisibility {
  const [state, setState] = useState<NavbarVisibility>({
    hidden: false,
    scrolled: false,
  });
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastY.current = window.scrollY;

    const update = () => {
      const y = Math.max(0, window.scrollY);
      const scrolled = y > 8;
      const dy = y - lastY.current;

      setState((prev) => {
        let nextHidden = prev.hidden;

        if (y < TOP_THRESHOLD) {
          nextHidden = false;
        } else if (Math.abs(dy) > DELTA_THRESHOLD) {
          nextHidden = dy > 0;
        }

        if (prev.hidden === nextHidden && prev.scrolled === scrolled) {
          return prev;
        }
        return { hidden: nextHidden, scrolled };
      });

      lastY.current = y;
    };

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        update();
        rafId.current = null;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  return state;
}

export const NAVBAR_HEIGHT = 72;
