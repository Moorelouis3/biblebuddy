import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleGrid from "@/components/BlogArticleGrid";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/blogContent";

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
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-8 text-slate-950 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-4">
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

        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0056fd]">Bible Buddy Blog</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.02em] text-slate-950 md:text-4xl">
            Bible study articles that help Scripture make sense.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Church history, verse breakdowns, Bible study tips, and Christian foundations written to help everyday readers understand God&apos;s Word more clearly.
          </p>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <Link
            href="/blog"
            className="shrink-0 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white"
          >
            All Articles
          </Link>
          {BLOG_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="shrink-0 rounded-full border border-[#d8e3ec] bg-white px-4 py-2 text-sm font-black text-slate-700 transition hover:border-[#0056fd] hover:text-[#0056fd]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <BlogArticleGrid articles={BLOG_ARTICLES} />

        <section className="mt-16 rounded-[20px] border border-[#dce7f5] bg-white p-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0056fd]">
            Read with clarity
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Create your free Bible Buddy account and start studying today.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Go beyond reading with guided audio, study notes, devotional plans, trivia, and daily Bible habits that actually stick.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex rounded-full bg-[#0056fd] px-7 py-4 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
          >
            Create Free Account
          </Link>
        </section>
      </section>
    </main>
  );
}
