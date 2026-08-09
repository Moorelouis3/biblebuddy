"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BLOG_CATEGORIES } from "@/lib/blogContent";

type BlogCategoryNavProps = {
  activeCategorySlug?: string;
};

export default function BlogCategoryNav({ activeCategorySlug }: BlogCategoryNavProps) {
  const router = useRouter();
  const isAllActive = !activeCategorySlug;

  return (
    <nav aria-label="Blog categories" className="mb-10">
      {/* Mobile: one dropdown instead of three wrapped rows of pills. */}
      <div className="relative sm:hidden">
        <select
          aria-label="Choose a blog category"
          value={activeCategorySlug || ""}
          onChange={(event) => {
            const slug = event.target.value;
            router.push(slug ? `/blog/category/${slug}` : "/blog");
          }}
          className="w-full appearance-none rounded-2xl border border-[#d8e3ec] bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.06)] outline-none focus:border-[#0056fd]"
        >
          <option value="">All Articles</option>
          {BLOG_CATEGORIES.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Desktop: the pill row. */}
      <div className="hidden flex-wrap gap-2.5 sm:flex">
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
      </div>
    </nav>
  );
}
