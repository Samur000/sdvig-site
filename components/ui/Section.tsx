import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "primary" | "secondary";
  spacing?: "default" | "sm" | "none";
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  className,
  variant = "primary",
  spacing = "default",
  containerClassName,
  children,
  id,
  ...props
}: SectionProps) {
  const variantClass =
    variant === "secondary" ? "bg-bg-secondary" : "bg-bg-primary";
  const spacingClass =
    spacing === "default"
      ? "py-24 md:py-[140px]"
      : spacing === "sm"
        ? "py-16 md:py-24"
        : "";
  return (
    <section
      id={id}
      className={cn(variantClass, spacingClass, className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
