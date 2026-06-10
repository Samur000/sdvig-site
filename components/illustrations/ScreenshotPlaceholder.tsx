import { cn } from "@/lib/cn";

type Props = {
  label: string;
  hint?: string;
  emoji?: string;
  ratio?: "phone" | "wide";
  className?: string;
};

export function ScreenshotPlaceholder({
  label,
  hint,
  emoji = "🧠",
  ratio = "phone",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)] overflow-hidden",
        ratio === "phone" ? "aspect-[9/16] max-w-[320px]" : "aspect-[16/10]",
        className,
      )}
    >
      <div className="absolute top-0 inset-x-0 h-9 border-b-[1px] border-[var(--border)] flex items-center px-4 gap-2">
        <span className="block w-3 h-3 rounded-full bg-error border-2 border-[var(--border)]" />
        <span className="block w-3 h-3 rounded-full bg-warning border-2 border-[var(--border)]" />
        <span className="block w-3 h-3 rounded-full bg-success border-2 border-[var(--border)]" />
      </div>
      <div className="absolute inset-0 pt-9 flex flex-col items-center justify-center text-center px-6 gap-4">
        <div
          className="w-24 h-24 rounded-2xl border-[3px] border-[var(--border)] bg-accent flex items-center justify-center text-5xl shadow-[6px_6px_0_var(--border)]"
          aria-hidden
        >
          {emoji}
        </div>
        <p className="text-caption text-text-muted">Скриншот</p>
        <h4 className="text-h4 text-text-primary">{label}</h4>
        {hint && (
          <p className="text-[14px] text-text-secondary max-w-[220px]">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
