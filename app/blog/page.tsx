import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleGrid from "@/components/BlogArticleGrid";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import BlogTopNav from "@/components/blog/BlogTopNav";
import BlogFeatured from "@/components/blog/BlogFeatured";
import { BLOG_ARTICLES } from "@/lib/blogContent";

export const metadata: Metadata = {
  title: "Bible Buddy Blog | Bible Study Articles, Verse Breakdowns, and Church History",
  description:
    "Read Bible Buddy articles that help you understand Scripture, study the Bible, learn church history, and build a daily Bible habit.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Bible Buddy Blog",
    description:
      "Bible study articles, verse breakdowns, church history, and practical guides to help you understand Scripture.",
    url: "/blog",
    type: "website",
  },
};

// 18 posts a page, so the list ends somewhere instead of scrolling through
// every article ever written (Louis, 2026-09-19: "hard to navigate").
const PER_PAGE = 18;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const featured = BLOG_ARTICLES.slice(0, 5);
  const rest = BLOG_ARTICLES.slice(5);
  const totalPages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageArticles = rest.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-4 text-slate-950 sm:px-6">
      <BlogTopNav />
      <section className="mx-auto max-w-[1180px]">
        <BlogCategoryNav />

        {currentPage === 1 ? <BlogFeatured articles={featured} /> : null}

        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-4 border-b border-[#e3e8f0] pb-3">
            <h2 className="text-xl font-black tracking-tight text-slate-950">
              {currentPage === 1 ? "Latest articles" : `Articles · page ${currentPage}`}
            </h2>
            <p className="text-xs font-bold text-[#6d7789]">
              {BLOG_ARTICLES.length} studies
            </p>
          </div>

          <div className="mt-8">
            <BlogArticleGrid articles={pageArticles} />
          </div>

          {totalPages > 1 ? (
            <nav
              aria-label="Blog pages"
              className="mt-12 flex items-center justify-center gap-3 text-sm font-black"
            >
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
                  className="rounded-full border border-[#d8e3ec] bg-white px-5 py-2.5 text-slate-700 transition hover:border-[#0056fd] hover:text-[#0056fd]"
                >
                  ← Newer
                </Link>
              ) : (
                <span className="rounded-full border border-[#eef2f7] bg-white px-5 py-2.5 text-[#b6c0cf]">
                  ← Newer
                </span>
              )}
              <span className="text-xs font-bold text-[#6d7789]">
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="rounded-full border border-[#d8e3ec] bg-white px-5 py-2.5 text-slate-700 transition hover:border-[#0056fd] hover:text-[#0056fd]"
                >
                  Older →
                </Link>
              ) : (
                <span className="rounded-full border border-[#eef2f7] bg-white px-5 py-2.5 text-[#b6c0cf]">
                  Older →
                </span>
              )}
            </nav>
          ) : null}
        </section>
      </section>
    </main>
  );
}
