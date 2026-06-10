import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Что нового",
  description: "Список релизов и улучшений SDViGApp.",
};

const releases = [
  {
    version: "0.9.0",
    date: "5 мая 2026",
    title: "Веб-версия и параллакс на лендинге",
    notes: [
      "Запустили web.sdvig.app — полнофункциональная PWA",
      "Новый сайт sdvig.app в стиле необрутализма",
      "Тёмная тема, синхронизация настроек",
    ],
  },
  {
    version: "0.8.0",
    date: "12 апреля 2026",
    title: "Модуль привычек без стриков",
    notes: [
      "Привычки теперь показывают паттерны, а не счётчики дней",
      "Можно пропустить день без сброса прогресса",
      "Добавили статистику по дням недели",
    ],
  },
  {
    version: "0.7.0",
    date: "8 марта 2026",
    title: "Помодоро встроен в задачу",
    notes: [
      "Старт таймера прямо из карточки задачи",
      "Автозапуск следующего интервала по желанию",
      "Звуковые уведомления (можно отключить)",
    ],
  },
  {
    version: "0.6.0",
    date: "20 февраля 2026",
    title: "Финансы — учёт за 3 секунды",
    notes: [
      "Быстрый ввод траты по горячей клавише",
      "Иконки и категории по умолчанию",
      "Месячный отчёт с разбивкой",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[820px] mx-auto">
            <p className="text-caption text-accent mb-4">Релизы</p>
            <h1 className="text-h1 text-text-primary">Что нового</h1>
            <p className="mt-8 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[640px]">
              Без хайпа и маркетинговых релизов раз в квартал. Просто что
              реально появилось в продукте.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="max-w-[820px] mx-auto">
            {releases.map((r) => (
              <div
                key={r.version}
                className="border-t-[1px] border-[var(--border)] py-10 grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                <div className="md:col-span-3">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-bg-elevated border-2 border-[var(--border)] font-mono text-[13px] font-bold mb-2">
                    v{r.version}
                  </div>
                  <div className="text-[14px] text-text-muted">{r.date}</div>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-h3 text-text-primary mb-5">{r.title}</h2>
                  <ul className="space-y-3 list-disc pl-6 marker:text-accent">
                    {r.notes.map((n) => (
                      <li
                        key={n}
                        className="text-[16px] text-text-secondary leading-relaxed"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
