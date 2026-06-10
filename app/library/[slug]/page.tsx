import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  guides,
  getGuide,
  getAdjacentGuides,
  getCategoryLabel,
  formatGuideDate,
} from "@/lib/library";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const { prev, next } = getAdjacentGuides(slug);

  return (
    <article>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-accent font-semibold mb-12"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
              Все гайды
            </Link>

            <div className="flex items-center gap-4 flex-wrap text-[14px]">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-[12px] font-bold uppercase tracking-wide border-2 border-[var(--border)]">
                {getCategoryLabel(guide.category)}
              </span>
              <span className="font-mono text-text-muted">
                {formatGuideDate(guide.date)}
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-muted">
                {guide.readingTime} мин чтения
              </span>
            </div>

            <h1 className="mt-6 text-[36px] md:text-[56px] font-bold text-text-primary leading-[1.05] tracking-[-0.02em]">
              {guide.title}
            </h1>
            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed">
              {guide.excerpt}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-20 md:pb-24">
        <Container>
          <div className="max-w-[760px] mx-auto prose-sdvig text-text-primary">
            {guide.body.map((paragraph, i) => (
              <p key={i} className="text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px] border-t-[1px] border-[var(--border)] pt-16 md:pt-20">
        <Container>
          <div className="max-w-[920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {prev ? (
              <Link
                href={`/library/${prev.slug}`}
                className="group block p-6 md:p-8 bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
              >
                <span className="inline-flex items-center gap-2 text-[14px] text-text-muted font-semibold uppercase tracking-wide mb-4">
                  <ArrowLeft size={14} strokeWidth={2.5} />
                  Предыдущая
                </span>
                <h3 className="text-[20px] font-bold text-text-primary leading-tight group-hover:text-accent transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/library/${next.slug}`}
                className="group block p-6 md:p-8 bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 md:text-right"
              >
                <span className="inline-flex items-center gap-2 text-[14px] text-text-muted font-semibold uppercase tracking-wide mb-4 md:flex-row-reverse md:ml-auto">
                  Следующая
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
                <h3 className="text-[20px] font-bold text-text-primary leading-tight group-hover:text-accent transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
