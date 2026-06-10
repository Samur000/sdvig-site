import type { Metadata } from "next";
import { Mail, MessageCircle, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Как с нами связаться.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "Telegram",
    hint: "Отвечаем за пару часов в рабочее время",
    label: SITE.telegramHandle,
    href: SITE.telegram,
  },
  {
    icon: Mail,
    title: "Email",
    hint: "Для длинных вопросов и юридических дел",
    label: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Globe,
    title: "Веб-версия",
    hint: "Открой и попробуй прямо сейчас",
    label: SITE.webApp.replace("https://", ""),
    href: SITE.webApp,
  },
];

export default function ContactsPage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[820px] mx-auto">
            <p className="text-caption text-accent mb-4">Контакты</p>
            <h1 className="text-h1 text-text-primary">Напиши.</h1>
            <p className="mt-8 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[640px]">
              Любой вопрос, любой фидбек, любая идея. Мы маленькие — каждое
              сообщение читает живой человек.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[var(--border)] bg-accent text-white mb-4">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="text-h4 text-text-primary mb-1">{c.title}</h3>
                  <p className="text-[14px] text-text-muted mb-4">{c.hint}</p>
                  <span className="text-[16px] font-semibold text-accent break-all">
                    {c.label}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-16 max-w-[820px] mx-auto bg-bg-secondary border-2 border-[var(--border)] rounded-2xl p-6 md:p-8">
            <h3 className="text-h4 text-text-primary mb-3">
              Реквизиты юридического лица
            </h3>
            <p className="text-[15px] text-text-secondary leading-relaxed">
              {SITE.legalEntity}
              <br />
              По юридическим вопросам — {SITE.emailLegal}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
