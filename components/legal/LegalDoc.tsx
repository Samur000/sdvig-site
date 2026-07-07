import Link from "next/link";
import { Mail, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { LegalTocBar } from "@/components/legal/LegalTocBar";
import type {
  LegalBlock,
  LegalMeta,
  LegalSection,
  LegalSummary,
} from "@/lib/legal-content";

const INLINE_TOC_ID = "legal-inline-toc";

function renderBlock(block: LegalBlock, key: number) {
  if (block.type === "p") {
    return (
      <p key={key} className="text-text-secondary">
        {block.text}
      </p>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 key={key} className="text-h4 text-text-primary mt-8 mb-3">
        {block.text}
      </h3>
    );
  }
  return (
    <ul key={key} className="space-y-3 list-disc pl-6 marker:text-accent">
      {block.items.map((item, i) => (
        <li key={i} className="text-text-secondary leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

type LegalDocProps = {
  meta: LegalMeta;
  summary: LegalSummary[];
  summaryIcons: LucideIcon[];
  sections: LegalSection[];
  /** Optional related documents shown under the hero. */
};

export function LegalDoc({
  meta,
  summary,
  summaryIcons,
  sections,
}: LegalDocProps) {
  return (
    <>
      <LegalTocBar sections={sections} triggerId={INLINE_TOC_ID} />

      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[820px]">
            <p className="text-caption text-accent mb-4">{meta.edition}</p>
            <h1 className="text-h1 text-text-primary">{meta.title}</h1>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[14px]">
              <div className="bg-bg-secondary border-2 border-[var(--border)] rounded-xl p-4">
                <div className="text-text-muted text-caption mb-1">Оператор</div>
                <div className="font-semibold text-text-primary">
                  {meta.operator}
                </div>
              </div>
              <div className="bg-bg-secondary border-2 border-[var(--border)] rounded-xl p-4">
                <div className="text-text-muted text-caption mb-1">
                  Email юридический
                </div>
                <a
                  href={`mailto:${meta.emailLegal}`}
                  className="font-semibold text-accent hover:underline underline-offset-4"
                >
                  {meta.emailLegal}
                </a>
              </div>
              <div className="bg-bg-secondary border-2 border-[var(--border)] rounded-xl p-4">
                <div className="text-text-muted text-caption mb-1">Сайт</div>
                <a
                  href={meta.site}
                  className="font-semibold text-accent hover:underline underline-offset-4 break-all"
                >
                  {meta.site}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px]">
            {summary.map((s, i) => {
              const Icon = summaryIcons[i] ?? summaryIcons[0];
              return (
                <div
                  key={s.title}
                  className="bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow-hard)]"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[var(--border)] bg-accent text-white mb-4">
                    {Icon ? <Icon size={22} strokeWidth={2} /> : null}
                  </div>
                  <h3 className="text-h4 text-text-primary mb-2">{s.title}</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-3">
              <div id={INLINE_TOC_ID} className="lg:sticky lg:top-24">
                <h4 className="text-caption text-text-muted mb-4">Содержание</h4>
                <nav>
                  <ol className="flex flex-col gap-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex items-start gap-3 text-[14px] text-text-secondary hover:text-accent transition-colors py-1"
                        >
                          <span className="font-mono text-text-muted shrink-0 w-5 tabular-nums">
                            {s.num}.
                          </span>
                          <span>{s.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <article className="space-y-12">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32 md:scroll-mt-36"
                  >
                    <div className="flex items-baseline gap-4 mb-6 pb-4 border-b-2 border-[var(--border)]">
                      <span className="font-mono text-[20px] text-accent font-bold tabular-nums">
                        {section.num}
                      </span>
                      <h2 className="text-h3 text-text-primary">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-5 text-[16px] leading-relaxed">
                      {section.content.map((b, i) => renderBlock(b, i))}
                    </div>
                  </section>
                ))}
              </article>

              <div className="mt-20 bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-8 md:p-10 shadow-[var(--shadow-hard-lg)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-h3 text-text-primary">
                      Остались вопросы?
                    </h3>
                    <p className="mt-2 text-[16px] text-text-secondary">
                      Напиши нам — отвечаем в течение пары рабочих дней.
                    </p>
                  </div>
                  <a
                    href={`mailto:${meta.emailLegal}`}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent text-white border-[3px] border-[var(--border)] rounded-xl font-bold shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
                  >
                    <Mail size={18} strokeWidth={2.5} />
                    {meta.emailLegal}
                  </a>
                </div>
              </div>

              <p className="mt-12 text-[14px] text-text-muted">
                <Link
                  href="/"
                  className="hover:text-accent underline decoration-2 underline-offset-4"
                >
                  ← На главную
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ScrollToTop />
    </>
  );
}
