import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-bold transition-all duration-150 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border-[3px] border-[var(--border)] rounded-lg shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)]",
  secondary:
    "bg-bg-elevated text-text-primary border-2 border-[var(--border)] rounded-lg hover:bg-bg-secondary hover:border-accent",
  ghost:
    "bg-transparent text-text-secondary font-semibold underline decoration-2 underline-offset-4 hover:text-accent hover:decoration-accent",
};

const sizes: Record<Size, string> = {
  default: "px-8 py-3.5 text-[18px]",
  sm: "px-5 py-2 text-[14px]",
  lg: "px-10 py-4 text-[20px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const sizeClasses = variant === "ghost" ? "px-0 py-0 text-base" : sizes[size];
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizeClasses, className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const sizeClasses = variant === "ghost" ? "px-0 py-0 text-base" : sizes[size];
    return (
      <a
        ref={ref}
        className={cn(base, variants[variant], sizeClasses, className)}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";
