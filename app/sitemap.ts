import type { MetadataRoute } from "next";
import { guides } from "@/lib/library";

const BASE = "https://sdvig.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/pricing",
    "/pricing/compare",
    "/library",
    "/security",
    "/privacy",
    "/terms",
    "/about",
    "/changelog",
    "/contacts",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE}/library/${g.slug}`,
    lastModified: new Date(g.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideRoutes];
}
