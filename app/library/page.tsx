import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LibraryGrid } from "@/components/sections/LibraryGrid";

export const metadata: Metadata = {
  title: "Библиотека SDViGApp",
  description:
    "Гайды и заметки про СДВГ, фокус, привычки и продуктивность. Без шума и обязательного ежедневного чтения.",
};

export default function LibraryPage() {
  return (
    <>
      <section className="bg-bg-primary pt-20 md:pt-28 pb-16 md:pb-20">
        <Container>
          <div className="text-center max-w-[820px] mx-auto">
            <p className="text-caption text-accent mb-4">Библиотека · SDViGApp</p>
            <h1 className="text-h1 text-text-primary">Библиотека SDViGApp</h1>
            <p className="mt-8 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[680px] mx-auto">
              Всё, что мы пишем для своих. Без новостного шума, без
              обязательного ежедневного чтения. Возвращайся, когда действительно
              нужно.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-bg-primary pb-24 md:pb-[140px]">
        <Container>
          <LibraryGrid />
        </Container>
      </section>
    </>
  );
}
