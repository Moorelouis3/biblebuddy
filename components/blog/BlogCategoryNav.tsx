"use client";

import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blogContent";

type BlogCategoryNavProps = {
  activeCategorySlug?: string;
};

export default function BlogCategoryNav({ activeCategorySlug }: BlogCategoryNavProps) {
  const isAllActive = !activeCategorySlug;

  return (
    <nav
      aria-label="Blog categories"
      className="mb-10 flex flex-wrap gap-2.5"
    >
      <Link
        href="/blog"
        aria-current={isAllActive ? "page" : undefined}
        className={`rounded-full px-4 py-2.5 text-sm font-black transition ${
          isAllActive
            ? "bg-[#0056fd] text-white shadow-[0_10px_24px_rgba(0,86,253,0.24)]"
            : "border border-[#d8e3ec] bg-white text-slate-700 hover:border-[#0056fd] hover:text-[#0056fd]"
        }`}
      >
        All Articles
      </Link>
      {BLOG_CATEGORIES.map((category) => {
        const isActive = category.slug === activeCategorySlug;
        return (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 text-sm font-black transition ${
              isActive
                ? "bg-[#0056fd] text-white shadow-[0_10px_24px_rgba(0,86,253,0.24)]"
                : "border border-[#d8e3ec] bg-white text-slate-700 hover:border-[#0056fd] hover:text-[#0056fd]"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
