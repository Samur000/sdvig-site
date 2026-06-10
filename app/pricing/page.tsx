import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PricingCards } from "@/components/sections/PricingCards";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Тарифы",
  description:
    "Начни бесплатно. Заплати только если хочешь облачную синхронизацию между устройствами.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-16">
        <Container>
          <div className="text-center max-w-[820px] mx-auto">
            <h1 className="text-h1 text-text-primary">Тарифы</h1>
            <p className="mt-8 text-[18px] md:text-[20px] text-text-secondary leading-relaxed">
              Начни бесплатно.
              <br />
              Заплати только если хочешь облако.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <PricingCards />

          <div className="mt-20 text-center max-w-[760px] mx-auto">
            <p className="text-[16px] text-text-secondary">
              Все планы включают: автоматические обновления, HTTPS, защиту от
              потери данных.
            </p>
            <Link
              href="/pricing/compare"
              className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-accent hover:text-accent-dark underline decoration-2 underline-offset-4"
            >
              Сравнить все возможности
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
