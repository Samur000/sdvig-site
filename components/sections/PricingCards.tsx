"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { LinkButton, Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

type Tier = {
  id: string;
  num: string;
  name: string;
  hint: string;
  monthly: number | null;
  yearly: number | null;
  yearlyOriginal?: number;
  features: string[];
  cta: { label: string; href?: string; disabled?: boolean };
  badge?: string;
  highlight?: boolean;
  comingSoon?: boolean;
};

const tiers: Tier[] = [
  {
    id: "free",
    num: "01",
    name: "Free",
    hint: "Для одного устройства",
    monthly: 0,
    yearly: 0,
    features: [
      "Все 4 модуля: день, задачи, финансы, привычки",
      "Локальное хранение",
      "E2EE шифрование",
      "Помодоро без ограничений",
      "Без рекламы",
      "Экспорт в JSON",
    ],
    cta: { label: "Открыть в браузере", href: SITE.webApp },
  },
  {
    id: "plus",
    num: "02",
    name: "Plus",
    hint: "Для синхронизации между устройствами",
    monthly: 299,
    yearly: 2870,
    yearlyOriginal: 3588,
    features: [
      "Всё из Free",
      "Облачная синхронизация на всех устройствах",
      "Автоматический бэкап",
      "Восстановление из бэкапа в 1 клик",
      "Приоритетная поддержка",
    ],
    cta: { label: "Попробовать", href: `${SITE.webApp}/billing` },
    badge: "Популярный",
    highlight: true,
  },
  {
    id: "pro",
    num: "03",
    name: "Pro",
    hint: "AI-функции в разработке",
    monthly: null,
    yearly: null,
    features: [
      "Всё из Plus",
      "AI-помощник по задачам",
      "Автоматическая категоризация",
      "Умные напоминания",
      "Контекстные предложения",
    ],
    cta: { label: "В разработке", disabled: true },
    badge: "Скоро",
    comingSoon: true,
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-14">
        <button
          onClick={() => setYearly(false)}
          className={cn(
            "text-[16px] font-semibold transition-colors",
            !yearly ? "text-text-primary" : "text-text-muted hover:text-text-primary",
          )}
        >
          Ежемесячно
        </button>
        <button
          onClick={() => setYearly(!yearly)}
          aria-label="Переключить тип оплаты"
          className="relative w-14 h-8 rounded-full border-2 border-[var(--border)] bg-bg-elevated transition-colors"
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-6 h-6 rounded-full border-2 border-[var(--border)] bg-accent transition-transform duration-200",
              yearly && "translate-x-6",
            )}
          />
        </button>
        <button
          onClick={() => setYearly(true)}
          className={cn(
            "text-[16px] font-semibold transition-colors",
            yearly ? "text-text-primary" : "text-text-muted hover:text-text-primary",
          )}
        >
          Раз в год
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-accent text-white text-[12px] font-bold">
            −20%
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {tiers.map((tier) => {
          const price = yearly ? tier.yearly : tier.monthly;
          const period = yearly ? "/год" : "/мес";
          return (
            <div
              key={tier.id}
              className={cn(
                "relative bg-bg-elevated rounded-2xl p-8 flex flex-col",
                tier.highlight
                  ? "border-[3px] border-accent shadow-[var(--shadow-hover)]"
                  : "border-[3px] border-[var(--border)] shadow-[var(--shadow-hard)]",
                tier.comingSoon && "opacity-70",
              )}
            >
              {tier.badge && (
                <span
                  className={cn(
                    "absolute -top-3 left-8 inline-flex items-center px-3 py-1 rounded-full border-2 border-[var(--border)] text-[12px] font-bold uppercase tracking-wide",
                    tier.highlight
                      ? "bg-accent text-white"
                      : "bg-bg-elevated text-text-primary",
                  )}
                >
                  {tier.badge}
                </span>
              )}

              <div className="font-mono text-[14px] text-text-muted mb-3">
                {tier.num}
              </div>
              <h3 className="text-[28px] font-bold text-text-primary leading-tight">
                {tier.name}
              </h3>
              <p className="mt-2 text-[15px] text-text-secondary min-h-[44px]">
                {tier.hint}
              </p>

              <div className="my-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tier.id}-${yearly ? "y" : "m"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {price === null ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-[56px] font-bold text-text-primary leading-none">
                          —
                        </span>
                        <span className="text-[16px] text-text-muted">
                          будет позже
                        </span>
                      </div>
                    ) : price === 0 ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-[56px] font-bold text-text-primary leading-none">
                          0 ₽
                        </span>
                        <span className="text-[16px] text-text-muted">
                          навсегда
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[56px] font-bold text-text-primary leading-none tabular-nums">
                            {formatPrice(price)} ₽
                          </span>
                          <span className="text-[16px] text-text-muted">
                            {period}
                          </span>
                        </div>
                        {yearly && tier.yearlyOriginal && (
                          <p className="mt-2 text-[14px] text-success font-semibold">
                            экономия{" "}
                            {formatPrice(tier.yearlyOriginal - price)} ₽
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[15px] text-text-primary"
                  >
                    <span
                      className={cn(
                        "shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-[var(--border)]",
                        tier.comingSoon ? "bg-bg-secondary" : "bg-accent",
                      )}
                    >
                      {tier.comingSoon ? (
                        <X size={12} strokeWidth={3} className="text-text-muted" />
                      ) : (
                        <Check size={12} strokeWidth={3} className="text-white" />
                      )}
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {tier.cta.disabled ? (
                <Button variant="secondary" disabled className="w-full">
                  {tier.cta.label}
                </Button>
              ) : tier.cta.href ? (
                <LinkButton
                  href={tier.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta.label}
                </LinkButton>
              ) : (
                <Button variant="secondary" className="w-full">
                  {tier.cta.label}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
