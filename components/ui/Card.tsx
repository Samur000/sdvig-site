import * as React from "react";
import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  shadow?: "none" | "default" | "lg";
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, shadow = "none", ...props }, ref) => {
    const shadowMap = {
      none: "",
      default: "shadow-[var(--shadow-hard)]",
      lg: "shadow-[var(--shadow-hard-lg)]",
    } as const;
    return (
      <div
        ref={ref}
        className={cn(
          "bg-bg-elevated border-[3px] border-[var(--border)] rounded-xl p-8",
          shadowMap[shadow],
          interactive &&
            "transition-all duration-150 ease-out cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";
