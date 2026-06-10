"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted ? resolvedTheme || theme : "light";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--border)] bg-bg-elevated hover:bg-bg-secondary transition-colors duration-150"
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} strokeWidth={2} />
        ) : (
          <Moon size={18} strokeWidth={2} />
        )
      ) : (
        <span className="block w-[18px] h-[18px]" />
      )}
    </button>
  );
}
