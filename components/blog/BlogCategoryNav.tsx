"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/blogContent";

/**
 * The blog's topic menu (rebuilt 2026-09-19). It used to be a row of pills
 * that wrapped onto two lines under the site menu - Louis: "it looks weird
 * with the top menu then the second menu 2 rows deep". Now it is one line:
 * where you are on the left, and a Topics dropdown on the right, with the
 * number of articles next to each topic. Same shape on a phone.
 */
export default function BlogCategoryNav({ activeCategorySlug }: { activeCategorySlug?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const counts = new Map<string, number>();
  for (const article of BLOG_ARTICLES) {
    counts.set(article.categorySlug, (counts.get(article.categorySlug) || 0) + 1);
  }
  const active = BLOG_CATEGORIES.find((category) => category.slug === activeCategorySlug);

  return (
    <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#e3e8f0] pb-3">
      <div className="flex min-w-0 items-baseline gap-2">
        <Link href="/blog" className="text-lg font-black tracking-tight text-slate-950 hover:text-[#0056fd]">
          Blog
        </Link>
        {active ? (
          <>
            <span aria-hidden="true" className="text-[#b6c0cf]">/</span>
            <span className="truncate text-sm font-black text-[#0056fd]">{active.name}</span>
          </>
        ) : null}
      </div>

      <div ref={wrapRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-full border border-[#d8e3ec] bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-[#0056fd] hover:text-[#0056fd]"
        >
          Topics
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open ? (
          <div
            role="menu"
            className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-[#e3e8f0] bg-white py-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
          >
            <MenuItem href="/blog" label="All articles" count={BLOG_ARTICLES.length} active={!activeCategorySlug} onPick={() => setOpen(false)} />
            <div className="my-1.5 h-px bg-[#eef2f7]" />
            {BLOG_CATEGORIES.map((category) => (
              <MenuItem
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                label={category.name}
                count={counts.get(category.slug) || 0}
                active={category.slug === activeCategorySlug}
                onPick={() => setOpen(false)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MenuItem({
  href,
  label,
  count,
  active,
  onPick,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onPick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-black transition hover:bg-[#f2f7ff] ${
        active ? "text-[#0056fd]" : "text-slate-700"
      }`}
    >
      <span className="truncate">{label}</span>
      <span className="shrink-0 text-xs font-bold text-[#8a95a6]">{count}</span>
    </Link>
  );
}
