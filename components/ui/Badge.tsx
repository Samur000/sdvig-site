import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "accent" | "outline";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-bg-elevated border-2 border-[var(--border)] text-text-primary",
    accent: "bg-accent border-2 border-[var(--border)] text-white",
    outline: "bg-transparent border-2 border-[var(--border)] text-text-primary",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
