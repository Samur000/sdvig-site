import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Сравнение тарифов",
  description: "Все возможности тарифов Free, Plus и Pro в одной таблице.",
};

type Cell = boolean | "soon" | "—";

type Row = { label: string; free: Cell; plus: Cell; pro: Cell };

type Group = { title: string; rows: Row[] };

const groups: Group[] = [
  {
    title: "Базовые возможности",
    rows: [
      { label: "Все модули (день, задачи, финансы, привычки)", free: true, plus: true, pro: true },
      { label: "Локальное хранение", free: true, plus: true, pro: true },
      { label: "E2EE шифрование", free: true, plus: true, pro: true },
      { label: "Помодоро без ограничений", free: true, plus: true, pro: true },
      { label: "Без рекламы", free: true, plus: true, pro: true },
      { label: "Экспорт в JSON", free: true, plus: true, pro: true },
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
    title: "AI (в разработке)",
    rows: [
      { label: "AI-помощник по задачам", free: false, plus: false, pro: "soon" },
      { label: "Автоматическая категоризация", free: false, plus: false, pro: "soon" },
      { label: "Умные напоминания", free: false, plus: false, pro: "soon" },
      { label: "Контекстные предложения", free: false, plus: false, pro: "soon" },
    ],
  },
];

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

export default function ComparePage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-accent font-semibold mb-8"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Все тарифы
          </Link>
          <h1 className="text-h2 text-center text-text-primary">
            Сравнение тарифов
          </h1>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="max-w-[1100px] mx-auto">
            <div className="overflow-x-auto lg:overflow-visible -mx-5 lg:mx-0 px-5 lg:px-0">
              <table className="w-full min-w-[680px] border-collapse bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)]">
              <thead className="lg:sticky lg:top-[72px] lg:z-20">
                <tr className="bg-bg-secondary border-b-[2px] border-[var(--border)] [&>th]:bg-bg-secondary">
                  <th className="text-left p-5 text-[15px] font-bold text-text-primary min-w-[280px] shadow-[inset_0_-2px_0_var(--border)]">
                    Возможность
                  </th>
                  {[
                    { name: "Free", note: "Бесплатно" },
                    { name: "Plus", note: "200 ₽/мес", highlight: true },
                    { name: "Pro", note: "Скоро" },
                  ].map((col) => (
                    <th
                      key={col.name}
                      className={cn(
                        "p-5 text-center border-l-[1px] border-[var(--border)] min-w-[140px] shadow-[inset_0_-2px_0_var(--border)]",
                        col.highlight && "[&]:bg-accent/10",
                      )}
                    >
                      <div className="text-[20px] font-bold text-text-primary">
                        {col.name}
                      </div>
                      <div className="text-[13px] text-text-muted mt-1">
                        {col.note}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group, gi) => (
                  <Fragment key={`g-${gi}`}>
                    <tr
                      className="bg-bg-secondary border-y-[1px] border-[var(--border)]"
                    >
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
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-accent font-semibold"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
              Вернуться к тарифам
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
