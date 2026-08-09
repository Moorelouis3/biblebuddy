import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleGrid from "@/components/BlogArticleGrid";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import BlogTopNav from "@/components/blog/BlogTopNav";
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
    <main className="min-h-screen bg-[#f7fafc] px-4 py-4 text-slate-950 sm:px-6">
      <BlogTopNav />
      <section className="mx-auto max-w-[1240px]">
        <BlogCategoryNav />

        <BlogHeroSlider articles={heroArticles} />

        <section className="mt-12">
          <BlogArticleGrid articles={gridArticles} compact />
        </section>
      </section>
    </main>
  );
}
