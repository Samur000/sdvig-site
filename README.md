# Сдвиг — sdvig.app

Маркетинговый сайт + библиотека гайдов для приложения «Сдвиг». Стек: Next.js 16
(App Router) + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide.

## Команды

```bash
npm install        # установить зависимости
npm run dev        # дев-сервер на http://localhost:3000
npm run build      # production-сборка
npm run start      # запуск production-сборки
```

## Структура

```
app/
  (root)              лендинг — sdvig.app/
  about/              о проекте
  changelog/          что нового
  contacts/           контакты
  library/            библиотека гайдов
    [slug]/           отдельный гайд
  pricing/            тарифы
    compare/          таблица сравнения тарифов
  privacy/            политика конфиденциальности (152-ФЗ)
  terms/              публичная оферта (заглушка)
  globals.css         CSS-переменные, типографика, утилиты
  layout.tsx          корневой layout с Navbar / Footer / ThemeProvider
  icon.svg            фавикон
  apple-icon.svg      apple-touch-icon
  opengraph-image.tsx динамическая OG-картинка 1200×630
  robots.ts           robots.txt
  sitemap.ts          sitemap.xml
components/
  layout/             Navbar, Footer
  sections/           секции лендинга и тарифов
  ui/                 Button, Card, Accordion, Pill, Badge, Container, ThemeToggle, Section
  illustrations/      SVG-иллюстрации (мозг, иконки, граф, стрик), плейсхолдер скриншота
  ThemeProvider.tsx   обёртка над next-themes (data-theme="light|dark")
content/
  legal/privacy.md    исходник политики (отображается через структуру в lib/privacy-content.ts)
lib/
  cn.ts               clsx + tailwind-merge
  site.ts             центр конфига (URL, контакты, реквизиты)
  library.ts          данные гайдов (slug, заголовок, тело, категория)
  privacy-content.ts  структурированный текст политики
public/
  illustrations/      место для финальных иллюстраций
  screenshots/        место для финальных скриншотов модулей
```

## Дизайн-система

CSS-переменные определены в `app/globals.css` и проброшены в Tailwind через
`@theme inline`. Используй классы:

- `bg-bg-primary` / `bg-bg-secondary` / `bg-bg-elevated`
- `text-text-primary` / `text-text-secondary` / `text-text-muted`
- `bg-accent` / `text-accent` / `border-accent` (тил `#1A9E75`)
- Бордер всегда: `border-[var(--border)]`
- Тени: `shadow-[var(--shadow-hard)]` / `shadow-[var(--shadow-hard-lg)]` / `shadow-[var(--shadow-hover)]`
- Типографика: классы-утилиты `.text-h1 .text-h2 .text-h3 .text-h4 .text-body-lg .text-body .text-body-sm .text-caption`

Тёмная тема — `data-theme="dark"` на `<html>`. Переключатель в navbar
(`components/ui/ThemeToggle.tsx`) использует `next-themes`.

## Что осталось сделать (плейсхолдеры)

1. Заменить `BrainIllustration` на финальную иллюстрацию мозга для Hero
   (`components/illustrations/BrainIllustration.tsx`).
2. Заменить `ScreenshotPlaceholder` на реальные скриншоты модулей
   (`components/illustrations/ScreenshotPlaceholder.tsx` или картинки в
   `public/screenshots/`).
3. Пополнить `lib/library.ts` реальным контентом гайдов (сейчас 6 примеров
   с плейсхолдерным текстом).
4. Заполнить страницу `/terms` — сейчас заглушка.
5. Подставить реальные ссылки на App Store и Google Play в `lib/site.ts`
   (`appStoreUrl`, `googlePlayUrl`).
6. Подключить аналитику (Plausible/Umami) через `app/layout.tsx`.
7. Добавить домен `sdvig.app` в `metadataBase` (уже выставлено в `layout.tsx`,
   проверь, что совпадает с продакшен-URL).

## Контакты в коде

Все ссылки на email, Telegram, веб-приложение и реквизиты ИП — централизованы
в `lib/site.ts`. Меняй там — поменяется по всему сайту (Navbar, Footer,
Download, страницы About / Contacts / Privacy / Terms).
