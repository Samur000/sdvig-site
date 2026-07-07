import type { Metadata } from "next";
import { FileText, Lock, ShieldAlert } from "lucide-react";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { termsMeta, termsSummary, termsSections } from "@/lib/terms-content";

export const metadata: Metadata = {
  title: termsMeta.title,
  description:
    "Условия использования приложения «Сдвиг» (SDViGApp): права на приложение, правила использования, ответственность сторон и порядок обработки пользовательских данных.",
};

const summaryIcons = [FileText, Lock, ShieldAlert];

export default function TermsPage() {
  return (
    <LegalDoc
      meta={termsMeta}
      summary={termsSummary}
      summaryIcons={summaryIcons}
      sections={termsSections}
    />
  );
}
