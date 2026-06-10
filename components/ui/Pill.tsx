"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type PillProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  count?: number;
};

export function Pill({ className, active, count, children, ...props }: PillProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-150 ease-out border-2",
        active
          ? "bg-accent text-white border-[var(--border)] shadow-[var(--shadow-hard)]"
          : "bg-bg-elevated text-text-primary border-[var(--border)] hover:border-accent hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--border)]",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "font-mono tabular-nums",
            active ? "text-white/80" : "text-text-muted",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
