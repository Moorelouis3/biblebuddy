import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleGrid from "@/components/BlogArticleGrid";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import BlogHeroSlider from "@/components/blog/BlogHeroSlider";
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

export default function BlogPage() {
  const heroArticles = BLOG_ARTICLES.slice(0, 5);
  const gridArticles = BLOG_ARTICLES.slice(5);

  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-8 text-slate-950 sm:px-6">
      <section className="mx-auto max-w-[1240px]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black text-slate-950">
            Bible Buddy
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-black text-slate-700 transition hover:text-[#0056fd]">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#0056fd] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
            >
              Start Free
            </Link>
          </div>
        </div>

        <BlogCategoryNav />

        <BlogHeroSlider articles={heroArticles} />

        <section className="mt-12">
          <BlogArticleGrid articles={gridArticles} compact />
        </section>
      </section>
    </main>
  );
}
