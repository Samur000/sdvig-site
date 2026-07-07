import type { Metadata } from "next";
import { FileText, CreditCard, RotateCcw } from "lucide-react";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { offerMeta, offerSummary, offerSections } from "@/lib/offer-content";

export const metadata: Metadata = {
  title: offerMeta.title,
  description:
    "Условия предоставления доступа к платным функциям приложения «Сдвиг» (SDViGApp): тарифы Plus и Pro, порядок оплаты, пробный период и возврат средств.",
};

const summaryIcons = [FileText, CreditCard, RotateCcw];

export default function OfferPage() {
  return (
    <LegalDoc
      meta={offerMeta}
      summary={offerSummary}
      summaryIcons={summaryIcons}
      sections={offerSections}
    />
  );
}
