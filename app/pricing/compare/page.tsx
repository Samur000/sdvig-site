import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CompareTable } from "@/components/sections/CompareTable";

export const metadata: Metadata = {
  title: "Сравнение тарифов",
  description: "Все возможности тарифов Free, Plus и Pro в одной таблице.",
};

export default function ComparePage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-12">
        <Container>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-accent font-semibold mb-8"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Все тарифы
          </Link>
          <h1 className="text-h2 text-center text-text-primary">
            Сравнение тарифов
          </h1>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <div className="max-w-[1100px] mx-auto">
            <CompareTable />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[15px] text-text-secondary hover:text-accent font-semibold"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
              Вернуться к тарифам
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
