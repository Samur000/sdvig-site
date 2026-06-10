"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t-[1px] border-[var(--border)]">
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const num = String(i + 1).padStart(2, "0");
        return (
          <div
            key={item.id}
            className="border-b-[1px] border-[var(--border)]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className={cn(
                "w-full flex items-center gap-6 text-left py-7 md:py-8 px-2 md:px-4 transition-colors duration-150",
                "hover:bg-bg-secondary",
                isOpen && "bg-bg-secondary",
              )}
            >
              <span className="font-mono text-[15px] text-text-muted shrink-0 tabular-nums">
                {num}.
              </span>
              <span className="flex-1 text-[18px] md:text-[20px] font-semibold text-text-primary">
                {item.question}
              </span>
              <span
                className={cn(
                  "shrink-0 w-9 h-9 rounded-lg border-2 border-[var(--border)] flex items-center justify-center transition-transform duration-200",
                  isOpen && "rotate-45 bg-accent text-white",
                )}
              >
                <Plus size={18} strokeWidth={2.5} />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-2 md:px-4 pl-12 md:pl-16 pb-7 pr-4 md:pr-16 text-[17px] md:text-[18px] leading-relaxed text-text-secondary max-w-[820px]">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
