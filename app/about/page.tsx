import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Кто стоит за SDViGApp и зачем мы это делаем.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[820px] mx-auto">
            <p className="text-caption text-accent mb-4">О проекте</p>
            <h1 className="text-h1 text-text-primary">
              Один человек.
              <br />
              Одна боль.
              <br />
              Один продукт.
            </h1>
            <p className="mt-10 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[680px]">
              SDViGApp — это инструмент, который собирает человек с СДВГ для людей
              с СДВГ. Без венчурного капитала, без отдела маркетинга, без
              миссии «изменить мир к лучшему». Просто продукт, которым удобно
              пользоваться.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Один разработчик",
                text: "Я делаю всё сам — фронтенд, бэкенд, дизайн, поддержку. Это медленнее, но честнее.",
              },
              {
                num: "02",
                title: "Без инвестиций",
                text: "Никто не торопит. Никто не требует роста. Развиваюсь на свои и платежи Plus.",
              },
              {
                num: "03",
                title: "Российский продукт",
                text: "Сервера в РФ. Оплата через СБП. Поддержка на русском. Без санкций и блокировок.",
              },
            ].map((c) => (
              <div
                key={c.num}
                className="bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow-hard)]"
              >
                <div className="font-mono text-[14px] text-text-muted mb-3">
                  {c.num}
                </div>
                <h3 className="text-h4 text-text-primary mb-2">{c.title}</h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-[820px] mx-auto text-center">
            <p className="text-[18px] text-text-secondary leading-relaxed">
              Хочешь рассказать историю, прислать фидбек или предложить
              сотрудничество — напиши в Telegram или на почту.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Написать в Telegram
              </LinkButton>
              <Link
                href={`mailto:${SITE.email}`}
                className="text-[16px] font-semibold text-text-secondary hover:text-accent underline decoration-2 underline-offset-4"
              >
                {SITE.email}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
