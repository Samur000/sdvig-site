import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

function AppStoreBadge() {
  return (
    <a
      href={SITE.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Скачать в App Store"
      className="group inline-flex items-center gap-3 px-5 py-3 bg-[#0A0A0B] text-white border-[3px] border-[var(--border)] rounded-xl shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)] transition-all duration-150 ease-out min-w-[200px]"
    >
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="currentColor"
        aria-hidden
      >
        <path d="M17.564 12.65c-.027-2.7 2.207-3.997 2.31-4.06-1.258-1.84-3.213-2.092-3.91-2.122-1.665-.168-3.25.978-4.094.978-.844 0-2.142-.953-3.523-.928-1.815.027-3.488 1.054-4.42 2.677-1.886 3.27-.483 8.106 1.357 10.762.9 1.301 1.973 2.764 3.388 2.71 1.36-.054 1.873-.879 3.516-.879s2.106.879 3.546.852c1.466-.025 2.394-1.327 3.292-2.633 1.038-1.512 1.466-2.978 1.493-3.054-.033-.014-2.864-1.099-2.892-4.358-.003-.001-.063-.025-.063.055zM14.86 4.846c.747-.901 1.249-2.156 1.111-3.402-1.077.044-2.378.717-3.146 1.617-.69.794-1.29 2.061-1.128 3.293 1.196.092 2.412-.604 3.163-1.508z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-[0.05em] opacity-80">
          Скачать в
        </span>
        <span className="text-[19px] font-semibold -mt-0.5">App Store</span>
      </span>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href={SITE.googlePlayUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Скачать в Google Play"
      className="group inline-flex items-center gap-3 px-5 py-3 bg-[#0A0A0B] text-white border-[3px] border-[var(--border)] rounded-xl shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--border)] transition-all duration-150 ease-out min-w-[200px]"
    >
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden>
        <defs>
          <linearGradient id="gp-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#00A0FF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient id="gp-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00FF7F" />
            <stop offset="1" stopColor="#00C853" />
          </linearGradient>
          <linearGradient id="gp-orange" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FFC107" />
            <stop offset="1" stopColor="#FF8E00" />
          </linearGradient>
          <linearGradient id="gp-red" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
        </defs>
        <path d="M3 1.5 L13.5 12 3 22.5 z" fill="url(#gp-blue)" />
        <path d="M3 1.5 L17.4 9.5 13.5 12 z" fill="url(#gp-green)" />
        <path d="M3 22.5 L17.4 14.5 13.5 12 z" fill="url(#gp-red)" />
        <path
          d="M17.4 9.5 L21 11.5 c0.7 0.4 0.7 1 0 1.4 L17.4 14.5 13.5 12 z"
          fill="url(#gp-orange)"
        />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-[0.05em] opacity-80">
          Скачать в
        </span>
        <span className="text-[19px] font-semibold -mt-0.5">Google Play</span>
      </span>
    </a>
  );
}

export function Download() {
  return (
    <section
      id="download"
      className="bg-bg-secondary py-24 md:py-[140px] border-y-[1px] border-[var(--border)]"
    >
      <Container>
        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="text-h2 text-text-primary">Готов попробовать?</h2>
          <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary">
            Открой на любом устройстве.
            <br />
            Данные синхронизируются автоматически.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>

          <p className="mt-10 text-[16px]">
            <Link
              href={SITE.webApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent underline decoration-2 underline-offset-4 font-semibold"
            >
              Или открой веб-версию в браузере →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
