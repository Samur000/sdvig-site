import type { Metadata } from "next";
import { Cookie, BarChart3, ShieldOff } from "lucide-react";
import { LegalDoc } from "@/components/legal/LegalDoc";
import {
  cookieMeta,
  cookieSummary,
  cookieSections,
} from "@/lib/cookie-content";

export const metadata: Metadata = {
  title: cookieMeta.title,
  description:
    "Как сайт «Сдвиг» (SDViGApp) использует файлы cookie и аналогичные технологии: какие данные собираются, на каком основании, на какой срок и как ими управлять.",
};

const summaryIcons = [Cookie, BarChart3, ShieldOff];

export default function CookiePage() {
  return (
    <LegalDoc
      meta={cookieMeta}
      summary={cookieSummary}
      summaryIcons={summaryIcons}
      sections={cookieSections}
    />
  );
}
