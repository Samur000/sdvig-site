import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Brain,
  Cpu,
  Filter,
  Fingerprint,
  KeyRound,
  Lock,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Архитектура безопасности",
  description:
    "Как SDViGApp гарантирует, что данные принадлежат только пользователю: разделение идентификации и шифрования, E2EE, OPAQUE PAKE, Passkeys, Biometric Wrap.",
};

type Feature = {
  icon: LucideIcon;
  title: string;
  tag: string;
  text: string;
};

const phaseAFeatures: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Строгий Verify-First",
    tag: "анти-сквоттинг",
    text: "Юзер не попадает в приложение до подтверждения почты. Email → 6-значный OTP → подтверждение → только тогда создаётся аккаунт и Мастер-Пароль. Это исключает захват чужих ящиков и «мёртвые души» в БД.",
  },
  {
    icon: KeyRound,
    title: "Гибкая Recovery Phrase",
    tag: "три способа сохранить",
    text: "После создания пароля предлагаем сохранить ключ восстановления тремя способами: скопировать текст, отсканировать QR-код или сохранить PDF (с предупреждением не класть его в незашифрованные облака). Шаг можно пропустить — но он станет обязательным позже.",
  },
  {
    icon: Filter,
    title: "Защита от спам-бомбинга",
    tag: "circuit breaker",
    text: "Эндпоинты защищены жёсткими лимитами по IP. Внедрён автоматический рубильник для почтового сервиса Resend: если bounce-rate превышает 5%, отправка кодов приостанавливается, чтобы домен не улетел в блэклист.",
  },
  {
    icon: RotateCcw,
    title: "OS-Kill Resume",
    tag: "защита стейта",
    text: "Если ты свернул SDViGApp, чтобы посмотреть OTP-код в почте, и iOS/Android выгрузил приложение из памяти — прогресс не теряется. Приложение вернёт тебя прямо на экран ввода кода.",
  },
  {
    icon: Cpu,
    title: "HMAC вместо bcrypt",
    tag: "криптография кодов",
    text: "6-значные коды хэшируются через быстрый HMAC-SHA256 с серверным секретом, а не тяжёлым bcrypt. Это исключает подбор кодов даже при полном дампе базы данных (так делают AWS и Twilio). Атомарная проверка попыток на уровне PostgreSQL — против Race Conditions.",
  },
];

const phaseBFeatures: Feature[] = [
  {
    icon: Sparkles,
    title: "Вход в один клик",
    tag: "Apple / Google SSO",
    text: "Кнопки Apple и Google. Новичкам после клика предложат один раз придумать Мастер-Пароль для шифрования — и больше пароли не понадобятся.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Wrap",
    tag: "Face ID / отпечаток",
    text: "После первого входа с паролем Мастер-Ключ оборачивается ключом из Secure Enclave (аппаратного чипа телефона). Дальше приложение открывается просто по лицу — без запросов в сеть.",
  },
  {
    icon: Award,
    title: "Upsell безопасности",
    tag: "момент мотивации",
    text: "Если ты пропустил сохранение Recovery Phrase на старте, мы попросим сделать это перед включением Face ID. Идеальный момент: ты сам хочешь удобства, и мы объясняем, что без ключа потеряешь данные при смене девайса.",
  },
  {
    icon: Brain,
    title: "Memory Decay",
    tag: "тренировка памяти",
    text: "Чтобы ты не забыл пароль за месяцы использования биометрии, раз в 14 дней приложение мягко попросит ввести его руками. На 30-й день биометрия жёстко блокируется до успешного ввода пароля.",
  },
  {
    icon: AlertTriangle,
    title: "Сброс при взломе",
    tag: "чужой палец / лицо",
    text: "Если в настройки ОС телефона будет добавлен чужой отпечаток или лицо — локальные ключи аппаратно самоуничтожаются. SDViGApp попросит пароль.",
  },
];

const futurePhases = [
  {
    label: "Фаза D",
    eta: "Через 1–2 года",
    title: "OPAQUE PAKE",
    text: "Абсолютный Zero-Knowledge. Сервер вообще перестаёт получать пароли пользователей — даже в виде хэшей. Это математически исключает оффлайн-брутфорс, даже если сервер Timeweb будет полностью скомпрометирован.",
  },
  {
    label: "Фаза E",
    eta: "Когда Passkeys-инфра дозреет",
    title: "Passkeys E2EE",
    text: "Полный отказ от паролей. Сам Passkey будет генерировать 32-байтный ключ шифрования — один device, один ключ, одна биометрия.",
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[860px]">
            <p className="text-caption text-accent mb-4">
              Архитектура безопасности
            </p>
            <h1 className="text-h1 text-text-primary">
              Твои данные —
              <br />
              математически только твои.
            </h1>
            <p className="mt-10 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[720px]">
              Не маркетинговая «приватность важна», а конкретная инженерия.
              Ниже — как именно мы это построили и куда движемся. Архитектура
              спроектирована под стандарты безопасности 2026 года, решает
              проблему конверсии и защищает нас от регуляторов и утечек баз
              данных.
            </p>
          </div>
        </Container>
      </section>

      {/* Key concept */}
      <section className="bg-bg-primary py-12">
        <Container>
          <div className="max-w-[1100px] bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-8 md:p-12 shadow-[var(--shadow-hard-lg)]">
            <p className="text-caption text-accent mb-3">
              Ключевая концепция
            </p>
            <h2 className="text-h3 text-text-primary mb-4">
              Идентификация{" "}
              <span className="font-mono text-text-muted px-2">≠</span>{" "}
              Шифрование
            </h2>
            <p className="text-[16px] md:text-[17px] text-text-secondary leading-relaxed max-w-[820px] mb-10">
              Мы навсегда разделяем доказательство серверу,{" "}
              <span className="text-text-primary font-semibold">кто ты</span>,
              и способ расшифровки локальной базы. Это позволяет добавлять
              любые входы (Apple/Google SSO, Passkeys) без переписывания
              логики E2EE и без компрометации данных.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-bg-secondary border-2 border-[var(--border)] rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[var(--border)] bg-bg-elevated mb-4">
                  <UserCheck size={22} strokeWidth={2.2} />
                </div>
                <h3 className="text-h4 text-text-primary mb-2">
                  Идентификация
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  Доказательство серверу, кто ты. Email + код, Apple/Google,
                  Passkeys — это всё про «впустить или нет».
                </p>
              </div>
              <div className="bg-bg-secondary border-2 border-[var(--border)] rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[var(--border)] bg-accent text-white mb-4">
                  <KeyRound size={22} strokeWidth={2.2} />
                </div>
                <h3 className="text-h4 text-text-primary mb-2">Шифрование</h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  Как расшифровывается локальная база. Мастер-пароль и
                  Recovery Phrase — отдельные сущности, не зависящие от способа
                  входа.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Phases timeline indicator */}
      <section className="bg-bg-primary pt-12 pb-4">
        <Container>
          <div className="max-w-[1100px]">
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <PhaseTimelineItem
                num="A"
                label="В релизе"
                state="active"
              />
              <PhaseTimelineItem
                num="B"
                label="Через 3–6 месяцев"
                state="next"
              />
              <PhaseTimelineItem
                num="C · D · E"
                label="Долгосрочный roadmap"
                state="future"
              />
            </ol>
          </div>
        </Container>
      </section>

      {/* Phase A */}
      <PhaseSection
        anchor="phase-a"
        badge="Фаза А"
        status="В релизе сейчас"
        statusTone="accent"
        title="Email-First фундамент"
        subtitle="Надёжный вход по email, закрывающий критические уязвимости обычных стартапов."
        features={phaseAFeatures}
      />

      {/* Phase B */}
      <PhaseSection
        anchor="phase-b"
        badge="Фаза B"
        status="Через 3–6 месяцев"
        statusTone="muted"
        title="Интеграция SSO и биометрии"
        subtitle="Когда мы получим аккаунты разработчиков Apple и Google, выкатим «магию UX», которая сравняет нас с 1Password."
        features={phaseBFeatures}
      />

      {/* Future */}
      <section
        id="future"
        className="bg-bg-primary py-16 md:py-20 scroll-mt-24"
      >
        <Container>
          <div className="max-w-[1100px]">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-bg-elevated border-2 border-[var(--border)] font-mono text-[12px] font-bold uppercase tracking-wider">
                Фазы C · D · E
              </span>
              <span className="text-caption text-text-muted">
                Долгосрочный roadmap
              </span>
            </div>
            <h2 className="text-h2 text-text-primary mb-4">
              Куда мы движемся дальше
            </h2>
            <p className="text-[18px] text-text-secondary leading-relaxed mb-12 max-w-[720px]">
              Ещё более жёсткое Zero-Knowledge и постепенный отказ от
              паролей как класса.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {futurePhases.map((p) => (
                <div
                  key={p.label}
                  className="relative bg-bg-secondary border-[2px] border-dashed border-[var(--border)] rounded-2xl p-7 md:p-8"
                >
                  <span className="absolute -top-3 left-6 inline-flex items-center px-3 py-1 rounded-full bg-bg-primary border-2 border-[var(--border)] font-mono text-[12px] font-bold uppercase tracking-wider">
                    {p.label}
                  </span>
                  <div className="mt-2 flex items-center gap-3 mb-3">
                    <Lock
                      size={20}
                      strokeWidth={2.2}
                      className="text-text-muted shrink-0"
                    />
                    <span className="text-[12px] font-mono uppercase tracking-wider text-text-muted">
                      {p.eta}
                    </span>
                  </div>
                  <h3 className="text-h3 text-text-primary mb-3">{p.title}</h3>
                  <p className="text-[16px] text-text-secondary leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA + back */}
      <section className="bg-bg-primary pb-24 md:pb-[140px] pt-8 md:pt-12">
        <Container>
          <div className="max-w-[820px] mx-auto bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-10 md:p-14 shadow-[var(--shadow-hard-lg)] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-[var(--border)] bg-accent text-white mb-6 shadow-[6px_6px_0_var(--border)]">
              <ShieldCheck size={28} strokeWidth={2.2} />
            </div>
            <h2 className="text-h3 text-text-primary mb-4">
              Вопросы по безопасности?
            </h2>
            <p className="text-[17px] text-text-secondary leading-relaxed mb-8 max-w-[560px] mx-auto">
              Если важно понимать детали реализации перед тем, как доверить
              нам свои данные — напиши. Ответим конкретно.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton href={`mailto:${SITE.email}`} variant="primary">
                <Mail size={18} strokeWidth={2.5} />
                Написать в команду
              </LinkButton>
              <Link
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] font-semibold text-text-secondary hover:text-accent underline decoration-2 underline-offset-4"
              >
                {SITE.telegramHandle} в Telegram
              </Link>
            </div>
          </div>

          <div className="max-w-[820px] mx-auto mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] text-text-muted hover:text-accent underline decoration-2 underline-offset-4"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              На главную
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function PhaseTimelineItem({
  num,
  label,
  state,
}: {
  num: string;
  label: string;
  state: "active" | "next" | "future";
}) {
  const dotClass =
    state === "active"
      ? "bg-accent border-[var(--border)]"
      : state === "next"
        ? "bg-bg-elevated border-[var(--border)]"
        : "bg-bg-secondary border-[var(--border)] border-dashed";

  const labelClass =
    state === "active" ? "text-accent" : "text-text-muted";

  const anchor =
    state === "active"
      ? "phase-a"
      : state === "next"
        ? "phase-b"
        : "future";

  return (
    <li className="flex items-center gap-4 bg-bg-elevated border-2 border-[var(--border)] rounded-xl px-4 py-3.5">
      <span
        className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border-2 font-mono text-[14px] font-bold tabular-nums ${dotClass} ${state === "active" ? "text-white" : "text-text-primary"}`}
      >
        {num.length > 2 ? "•" : num}
      </span>
      <div className="min-w-0 flex-1">
        <a
          href={`#${anchor}`}
          className="block text-[14px] font-semibold text-text-primary hover:text-accent transition-colors truncate"
        >
          {num.length > 2 ? `Фазы ${num}` : `Фаза ${num}`}
        </a>
        <span className={`text-[12px] font-mono uppercase tracking-wider ${labelClass}`}>
          {label}
        </span>
      </div>
    </li>
  );
}

function PhaseSection({
  anchor,
  badge,
  status,
  statusTone,
  title,
  subtitle,
  features,
}: {
  anchor: string;
  badge: string;
  status: string;
  statusTone: "accent" | "muted";
  title: string;
  subtitle: string;
  features: Feature[];
}) {
  return (
    <section
      id={anchor}
      className="bg-bg-primary py-16 md:py-20 scroll-mt-24"
    >
      <Container>
        <div className="max-w-[1100px]">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-bg-elevated border-2 border-[var(--border)] font-mono text-[12px] font-bold uppercase tracking-wider">
              {badge}
            </span>
            <span
              className={`inline-flex items-center gap-2 text-caption ${statusTone === "accent" ? "text-accent" : "text-text-muted"}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${statusTone === "accent" ? "bg-accent" : "bg-text-muted/60"}`}
                aria-hidden
              />
              {status}
            </span>
          </div>
          <h2 className="text-h2 text-text-primary mb-4">{title}</h2>
          <p className="text-[18px] text-text-secondary leading-relaxed mb-10 md:mb-12 max-w-[820px]">
            {subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                feature={f}
                num={i + 1}
                tone={statusTone}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({
  feature,
  num,
  tone,
}: {
  feature: Feature;
  num: number;
  tone: "accent" | "muted";
}) {
  const Icon = feature.icon;
  const iconWrap =
    tone === "accent"
      ? "bg-accent text-white"
      : "bg-bg-secondary text-text-primary";

  return (
    <div className="bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-6 md:p-7 shadow-[var(--shadow-hard)] flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl border-2 border-[var(--border)] flex items-center justify-center ${iconWrap}`}
        >
          <Icon size={22} strokeWidth={2.2} />
        </div>
        <span className="font-mono text-[13px] text-text-muted tabular-nums pt-1">
          {String(num).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="text-h4 text-text-primary leading-tight">
          {feature.title}
        </h3>
        <span className="inline-block mt-1.5 text-[11px] font-mono uppercase tracking-[0.08em] text-text-muted">
          {feature.tag}
        </span>
        <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">
          {feature.text}
        </p>
      </div>
    </div>
  );
}
