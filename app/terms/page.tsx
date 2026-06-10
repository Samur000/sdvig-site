import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Публичная оферта",
  description: "Документ находится в разработке.",
};

export default function TermsPage() {
  return (
    <section className="bg-bg-primary py-24 md:py-[140px] min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-[640px] mx-auto bg-bg-elevated border-[3px] border-[var(--border)] rounded-2xl p-12 md:p-16 shadow-[var(--shadow-hard-lg)] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-[var(--border)] bg-accent text-white mb-8 shadow-[6px_6px_0_var(--border)]">
            <FileText size={28} strokeWidth={2} />
          </div>
          <h1 className="text-h2 text-text-primary">Публичная оферта</h1>
          <p className="mt-6 text-[18px] text-text-secondary leading-relaxed">
            Документ находится в разработке. Вернись позже — добавим финальную
            версию вместе с реквизитами.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-white border-[3px] border-[var(--border)] rounded-xl font-bold shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hover)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            На главную
          </Link>
        </div>
      </Container>
    </section>
  );
}
