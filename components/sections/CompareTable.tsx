"use client";

import { Fragment, useEffect, useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAVBAR_HEIGHT } from "@/lib/useNavbarVisibility";

type Cell = boolean | "soon" | "—";

type Row = { label: string; free: Cell; plus: Cell; pro: Cell };

type Group = { title: string; rows: Row[] };

const groups: Group[] = [
  {
    title: "Базовые возможности",
    rows: [
      {
        label: "Все модули (день, задачи, финансы, привычки)",
        free: true,
        plus: true,
        pro: true,
      },
      { label: "Локальное хранение", free: true, plus: true, pro: true },
      { label: "E2EE шифрование", free: true, plus: true, pro: true },
      { label: "Помодоро без ограничений", free: true, plus: true, pro: true },
      { label: "Без рекламы", free: true, plus: true, pro: true },
      { label: "Экспорт и импорт данных", free: true, plus: true, pro: true },
    ],
  },
  {
    title: "Синхронизация и поддержка",
    rows: [
      { label: "Облачная синхронизация", free: false, plus: true, pro: true },
      { label: "Автоматический бэкап", free: false, plus: true, pro: true },
      { label: "Восстановление в 1 клик", free: false, plus: true, pro: true },
      { label: "Приоритетная поддержка", free: false, plus: true, pro: true },
    ],
  },
  {
    title: "Новое (в разработке)",
    rows: [
      {
        label: "Новые модули по мере выхода",
        free: false,
        plus: false,
        pro: "soon",
      },
      { label: "AI-помощник по задачам", free: false, plus: false, pro: "soon" },
      { label: "Умные напоминания", free: false, plus: false, pro: "soon" },
      {
        label: "Контекстные предложения",
        free: false,
        plus: false,
        pro: "soon",
      },
    ],
  },
];

const columns = [
  { name: "Free", note: "Бесплатно" },
  { name: "Plus", note: "200 ₽/мес", highlight: true },
  { name: "Pro", note: "Скоро" },
] as const;

function CellMark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent border-2 border-[var(--border)]">
        <Check size={14} strokeWidth={3} className="text-white" />
      </span>
    );
  }
  if (value === "soon") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-bg-secondary border-2 border-[var(--border)] text-[11px] font-bold uppercase tracking-wide text-text-muted">
        Скоро
      </span>
    );
  }
  return <Minus size={18} className="text-text-muted" />;
}

export function CompareTable() {
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const update = (entry?: IntersectionObserverEntry) => {
      if (entry) {
        setNavVisible(entry.isIntersecting && entry.intersectionRatio > 0);
        return;
      }
      const rect = header.getBoundingClientRect();
      setNavVisible(rect.bottom > 1);
    };

    const observer = new IntersectionObserver(([entry]) => update(entry), {
      threshold: [0, 0.01, 1],
    });
    observer.observe(header);
    update();

    return () => observer.disconnect();
  }, []);

  const stickyTop = navVisible ? NAVBAR_HEIGHT : 0;

  return (
    <div className="overflow-x-auto lg:overflow-visible -mx-5 lg:mx-0 px-5 lg:px-0">
      <table className="w-full min-w-[680px] border-collapse bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)]">
        <thead
          className="sticky z-40 bg-bg-secondary transition-[top] duration-300 ease-out"
          style={{ top: stickyTop }}
        >
          <tr className="border-b-[2px] border-[var(--border)]">
            <th
              className="sticky z-40 text-left p-5 text-[15px] font-bold text-text-primary min-w-[280px] bg-bg-secondary shadow-[inset_0_-2px_0_var(--border)] transition-[top] duration-300 ease-out"
              style={{ top: stickyTop }}
            >
              Возможность
            </th>
            {columns.map((col) => (
              <th
                key={col.name}
                className={cn(
                  "sticky z-40 p-5 text-center border-l-[1px] border-[var(--border)] min-w-[140px] shadow-[inset_0_-2px_0_var(--border)] transition-[top] duration-300 ease-out",
                  col.highlight
                    ? "bg-[color-mix(in_srgb,var(--accent)_10%,var(--bg-secondary))]"
                    : "bg-bg-secondary",
                )}
                style={{ top: stickyTop }}
              >
                <div className="text-[20px] font-bold text-text-primary">
                  {col.name}
                </div>
                <div className="text-[13px] text-text-muted mt-1">{col.note}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group, gi) => (
            <Fragment key={`g-${gi}`}>
              <tr className="bg-bg-secondary border-y-[1px] border-[var(--border)]">
                <td
                  colSpan={4}
                  className="px-5 py-3 text-caption text-text-muted"
                >
                  {group.title}
                </td>
              </tr>
              {group.rows.map((row, ri) => (
                <tr
                  key={`${gi}-${ri}`}
                  className="border-b-[1px] border-[var(--border)] last:border-b-0"
                >
                  <td className="p-5 text-[15px] text-text-primary">
                    {row.label}
                  </td>
                  <td className="p-5 text-center border-l-[1px] border-[var(--border)]">
                    <div className="inline-flex items-center justify-center">
                      <CellMark value={row.free} />
                    </div>
                  </td>
                  <td className="p-5 text-center border-l-[1px] border-[var(--border)] bg-accent/5">
                    <div className="inline-flex items-center justify-center">
                      <CellMark value={row.plus} />
                    </div>
                  </td>
                  <td className="p-5 text-center border-l-[1px] border-[var(--border)]">
                    <div className="inline-flex items-center justify-center">
                      <CellMark value={row.pro} />
                    </div>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
