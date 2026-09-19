import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";

/**
 * The article card used on /blog and the category pages.
 *
 * Rebuilt 2026-09-19 (Louis: "its so big, not formatted like a blog, no
 * style, hard to navigate"). It was two enormous picture cards per row with
 * nothing but a title, so eight posts filled the screen. Now it is a real
 * blog grid: three across on a desktop, smaller pictures, and each card
 * carries the category, a two line summary, the date and the read time, so
 * you can tell posts apart without opening them.
 */

export function formatBlogDate(value: string) {
  const parsed = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogCardMeta({ article }: { article: BlogArticle }) {
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-[#6d7789]">
      <span>{formatBlogDate(article.publishedAt)}</span>
      <span aria-hidden="true">·</span>
      <span>{article.readTime}</span>
    </p>
  );
}

export default function BlogArticleGrid({
  articles,
  compact = false,
}: {
  articles: BlogArticle[];
  // Kept for the callers that pass it; the grid is compact by default now.
  compact?: boolean;
}) {
  void compact;
  return (
    <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3e8f0] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#c9dcff] hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[#eef4ff]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw"
            />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">
              {article.category}
            </p>
            <h2 className="mt-2 line-clamp-2 text-[1.05rem] font-black leading-snug tracking-[-0.02em] text-slate-950">
              {article.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-[#4b5563]">
              {article.description}
            </p>
            <div className="mt-auto">
              <BlogCardMeta article={article} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
