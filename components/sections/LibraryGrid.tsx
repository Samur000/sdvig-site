"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import {
  guides,
  guideCategories,
  getCategoryLabel,
  formatGuideDate,
} from "@/lib/library";

export function LibraryGrid() {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      const okCat = category === "all" || g.category === category;
      const okQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  }, [category, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: guides.length };
    for (const g of guides) map[g.category] = (map[g.category] || 0) + 1;
    return map;
  }, []);

  return (
    <div>
      <div className="max-w-[600px] mx-auto">
        <label className="relative block">
          <span className="sr-only">Поиск по гайдам</span>
          <Search
            size={20}
            strokeWidth={2.5}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по гайдам"
            className="w-full pl-14 pr-5 py-4 text-[16px] bg-bg-elevated border-[3px] border-[var(--border)] rounded-xl shadow-[var(--shadow-hard)] focus:outline-hidden focus:shadow-[var(--shadow-hover)] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all placeholder:text-text-muted"
          />
        </label>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {guideCategories.map((c) => (
          <Pill
            key={c.id}
            active={c.id === category}
            count={counts[c.id] || 0}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </Pill>
        ))}
      </div>

      <div className="mt-16 max-w-[820px] mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-text-secondary py-16">
            Ничего не нашлось. Попробуй другой запрос или категорию.
          </p>
        ) : (
          <ul className="border-t-[1px] border-[var(--border)]">
            {filtered.map((g) => (
              <li
                key={g.slug}
                className="border-b-[1px] border-[var(--border)]"
              >
                <Link
                  href={`/library/${g.slug}`}
                  className="group block py-8 px-2 md:px-4 hover:bg-bg-secondary transition-colors duration-150"
                >
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-[12px] font-bold uppercase tracking-wide border-2 border-[var(--border)]">
                      {getCategoryLabel(g.category)}
                    </span>
                    <span className="font-mono text-[13px] text-text-muted">
                      {formatGuideDate(g.date)}
                    </span>
                    <span className="text-[13px] text-text-muted">
                      {g.readingTime} мин чтения
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-[24px] md:text-[26px] font-bold text-text-primary leading-tight group-hover:text-accent transition-colors">
                        {g.title}
                      </h3>
                      <p className="mt-3 text-[16px] text-text-secondary leading-relaxed max-w-[640px]">
                        {g.excerpt}
                      </p>
                    </div>
                    <ArrowRight
                      size={28}
                      strokeWidth={2.5}
                      className="text-text-muted shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
