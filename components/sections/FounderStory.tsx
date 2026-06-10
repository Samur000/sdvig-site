import { Container } from "@/components/ui/Container";

export function FounderStory() {
  return (
    <section className="bg-bg-primary py-24 md:py-[140px]">
      <Container>
        <h2 className="text-center font-bold text-[36px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-text-primary max-w-[760px] mx-auto">
          Я Самур.
          <br />
          Я сделал SDViGApp для себя.
        </h2>

        <div className="mt-16 max-w-[860px] mx-auto bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard-lg)] p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="shrink-0 mx-auto md:mx-0">
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[var(--border)] bg-accent flex items-center justify-center text-4xl shadow-[6px_6px_0_var(--border)]"
                aria-hidden
              >
                <span>🧑‍💻</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-5 text-[18px] md:text-[20px] leading-[1.7] text-text-secondary">
                <p>
                  Я фронтенд-разработчик с СДВГ.
                </p>
                <p>
                  Я перепробовал Notion, Todoist, TickTick, Things, Sunsama,
                  Akiflow. Ни одно не подошло.
                </p>
                <p>
                  Я сделал SDViGApp для себя. Опубликовал — оказалось, у других та
                  же проблема.
                </p>
                <p>
                  Сейчас я каждый день читаю фидбек и улучшаю продукт под
                  реальные сценарии, а не под маркетинг.
                </p>
                <p className="text-text-primary font-medium">
                  Это приложение собирает человек, у которого та же боль, что и
                  у тебя.
                </p>
              </div>
              <p className="mt-8 text-right text-[16px] font-semibold text-text-primary">
                — Самур
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
