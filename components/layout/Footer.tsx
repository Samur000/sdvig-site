import Link from "next/link";
import { SITE } from "@/lib/site";
import { Mail, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const productLinks = [
  { label: "Возможности", href: "/#features" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Безопасность", href: "/security" },
  { label: "О проекте", href: "/about" },
  { label: "Что нового", href: "/changelog" },
  {
    label: "Открыть SDViGApp",
    href: SITE.webApp,
    external: true,
  },
];

const libraryLinks = [
  { label: "Все гайды", href: SITE.library },
  { label: "СДВГ", href: `${SITE.library}/?category=adhd` },
  { label: "Фокус", href: `${SITE.library}/?category=focus` },
  { label: "Привычки", href: `${SITE.library}/?category=habits` },
  { label: "Wellbeing", href: `${SITE.library}/?category=wellbeing` },
  { label: "Продуктивность", href: `${SITE.library}/?category=productivity` },
];

const legalLinks = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Публичная оферта", href: "/offer" },
  { label: "Согласие на обработку ПД", href: "/privacy#consent" },
  { label: "Cookie", href: "/cookie" },
];

const contactLinks = [
  {
    label: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    label: SITE.telegramHandle,
    href: SITE.telegram,
    external: true,
  },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold uppercase tracking-[0.05em] text-text-muted mb-5">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[16px] text-text-secondary hover:text-accent hover:underline underline-offset-4 decoration-2 transition-colors"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={href}
        className="text-[16px] text-text-secondary hover:text-accent hover:underline underline-offset-4 decoration-2 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-[1px] border-[var(--border)] bg-bg-primary">
      <div className="app-container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link
              href="/"
              aria-label="SDViGApp — на главную"
              className="inline-flex hover:opacity-80 transition-opacity"
            >
              <Logo height={32} />
            </Link>
            <p className="mt-5 text-[15px] text-text-secondary max-w-xs">
              Подстраивается под твой ритм.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--border)] text-text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <Send size={18} strokeWidth={2} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[var(--border)] text-text-muted hover:text-accent hover:border-accent transition-colors"
              >
                <Mail size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          <FooterColumn title="Продукт">
            {productLinks.map((l) => (
              <FooterLink key={l.label} href={l.href} external={l.external}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Библиотека">
            {libraryLinks.map((l) => (
              <FooterLink key={l.label} href={l.href} external>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Юридическое">
            {legalLinks.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Контакты">
            {contactLinks.map((l) => (
              <FooterLink key={l.label} href={l.href} external={l.external}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="border-t-[1px] border-[var(--border)]">
        <div className="app-container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[14px] text-text-muted">
            © {year} {SITE.legalEntity}
          </p>
          <p className="inline-flex items-center gap-2 text-[14px] text-text-muted">
            Все системы работают
            <span className="relative inline-flex items-center justify-center">
              <span className="absolute inline-flex w-3 h-3 rounded-full bg-success opacity-40 animate-ping" />
              <span className="relative inline-block w-2 h-2 rounded-full bg-success" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
