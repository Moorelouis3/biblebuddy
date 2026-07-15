import type { Metadata } from "next";
import Image from "next/image";
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
  const [featuredArticle, ...remainingArticles] = BLOG_ARTICLES;
  const spotlightArticles = remainingArticles.slice(0, 2);
  const gridArticles = remainingArticles.slice(2);

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

        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0056fd]">Bible Buddy Blog</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.02em] text-slate-950 md:text-[3.1rem]">
            Articles that help the Bible make sense.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Church history, verse breakdowns, Bible study tips, and Christian foundations written to help everyday readers understand God&apos;s Word more clearly.
          </p>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
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

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group block"
          >
            <article className="overflow-hidden rounded-[22px] border border-[#dce7f5] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.07)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_28px_65px_rgba(15,23,42,0.11)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4ff]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 60vw, 92vw"
                />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-[0.74rem] font-black uppercase tracking-[0.18em] text-[#6a7890]">
                  <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-[#0056fd]">
                    {featuredArticle.category}
                  </span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="mt-4 text-[1.8rem] font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-[2.15rem]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-slate-600 sm:text-[1.03rem]">
                  {featuredArticle.description}
                </p>
                <span className="mt-6 inline-flex border border-[#dce7f5] bg-white px-5 py-3 text-[0.72rem] font-black uppercase tracking-[0.16em] text-[#07162f] transition group-hover:border-[#0056fd] group-hover:text-[#0056fd]">
                  Read article
                </span>
              </div>
            </article>
          </Link>

          <div className="grid gap-6">
            {spotlightArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <article className="overflow-hidden rounded-[22px] border border-[#dce7f5] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.06)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4ff]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 34vw, 92vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#6a7890]">
                      <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-[#0056fd]">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-[1.28rem] font-black leading-tight tracking-[-0.025em] text-slate-950">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-[0.95rem] leading-7 text-slate-600">
                      {article.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <BlogArticleGrid articles={gridArticles} compact />
        </section>
      </section>
    </main>
  );
}
