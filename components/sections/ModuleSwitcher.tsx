"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScreenshotPlaceholder } from "@/components/illustrations/ScreenshotPlaceholder";
import { cn } from "@/lib/cn";

type Module = {
  id: string;
  tab: string;
  emoji: string;
  title: string;
  text: string;
  bullets: string[];
  hint: string;
};

const modules: Module[] = [
  {
    id: "day",
    tab: "День",
    emoji: "☀️",
    title: "Видишь только то, что сегодня",
    text: "Главный экран — твой день. Не 200 задач списком. Не календарь на 3 месяца вперёд. Только то, на что ты можешь повлиять прямо сейчас. Помодоро встроен в задачу — без переключения между приложениями.",
    bullets: [
      "Только сегодняшние задачи на главном экране",
      "Помодоро встроен в задачу",
      "Быстрый ввод по горячей клавише",
      "Без обязательных тегов и проектов",
    ],
    hint: "Главный экран модуля",
  },
  {
    id: "tasks",
    tab: "Задачи",
    emoji: "✅",
    title: "Мысли летят быстро. SDViGApp успевает.",
    text: "Идея пришла в голову — кидаешь в инбокс одной кнопкой. Без выбора проекта, без тега, без приоритета. Просто текст. Разберёшь потом — когда будет настроение. Это снимает главное напряжение СДВГ-мозга: необходимость принять 5 решений ради одной заметки.",
    bullets: [
      "Один клик от мысли до записи",
      "Голосовой ввод",
      "Разбор когда есть силы — а не сразу",
      "Никаких обязательных полей",
    ],
    hint: "Инбокс задач",
  },
  {
    id: "money",
    tab: "Финансы",
    emoji: "💸",
    title: "Не банк. Не Excel. Просто понятно.",
    text: "Записал сколько потратил — увидел куда ушло. Без подключения к банку, без QR-кодов, без AI-категоризации. Просто учёт, который ты ведёшь сам — но настолько быстро, что не бесит. Категории уже есть. Иконки уже есть. Тебе остаётся ввести цифру и нажать кнопку.",
    bullets: [
      "Запись траты за 3 секунды",
      "Понятный отчёт за месяц",
      "Без интеграций с банками",
      "Без бюджетов, которые ты всё равно не выполнишь",
    ],
    hint: "Учёт трат",
  },
  {
    id: "habits",
    tab: "Привычки",
    emoji: "🌱",
    title: "Без стрик-шейминга",
    text: "В SDViGApp нет стриков. Потому что один пропущенный день не должен сбрасывать 30 дней работы. Вместо счётчиков — паттерны. Ты видишь, что чаще всего пьёшь воду по утрам, а медитируешь по вечерам. Это знание о себе, а не наказание за пропуск.",
    bullets: [
      "Никаких счётчиков дней подряд",
      "Паттерны вместо жёстких цифр",
      "Свои привычки — не из шаблона",
      "Можно пропустить и не страдать",
    ],
    hint: "Трекер привычек",
  },
];

const AUTO_INTERVAL = 6000;

export function ModuleSwitcher() {
  const [active, setActive] = useState(modules[0].id);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((current) => {
        const idx = modules.findIndex((m) => m.id === current);
        return modules[(idx + 1) % modules.length].id;
      });
    }, AUTO_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const current = modules.find((m) => m.id === active) || modules[0];

  return (
    <section
      id="features"
      className="bg-bg-secondary py-24 md:py-[140px] border-y-[1px] border-[var(--border)]"
    >
      <Container>
        <h2 className="text-h2 text-center text-text-primary">
          Что внутри SDViGApp
        </h2>
        <p className="mt-4 text-center text-[18px] text-text-secondary max-w-[640px] mx-auto">
          Четыре модуля, один ритм. Открыл — и работаешь, без сборки системы.
        </p>

        <div
          className="mt-16 max-w-[1120px] mx-auto bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)] p-6 md:p-12"
          onPointerDown={() => setPaused(true)}
        >
          <div className="flex flex-wrap gap-3 mb-10">
            {modules.map((m) => {
              const isActive = m.id === active;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActive(m.id);
                    setPaused(true);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-[var(--border)] font-semibold text-[15px] transition-all duration-150 ease-out",
                    isActive
                      ? "bg-accent text-white shadow-[var(--shadow-hard)]"
                      : "bg-bg-elevated text-text-primary hover:bg-bg-secondary hover:border-accent",
                  )}
                >
                  <span aria-hidden>{m.emoji}</span>
                  {m.tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full flex justify-center"
                >
                  <ScreenshotPlaceholder
                    label={current.tab}
                    hint={current.hint}
                    emoji={current.emoji}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <h3 className="text-h3 text-text-primary">{current.title}</h3>
                  <p className="mt-5 text-[18px] leading-relaxed text-text-secondary max-w-[520px]">
                    {current.text}
                  </p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {current.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[16px] text-text-primary"
                      >
                        <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent border-2 border-[var(--border)]">
                          <Check
                            size={14}
                            strokeWidth={3}
                            className="text-white"
                          />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
