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
  const featuredArticle = BLOG_ARTICLES[0];
  const secondaryArticles = BLOG_ARTICLES.slice(1, 3);
  const remainingArticles = BLOG_ARTICLES.slice(3);

  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-10 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black text-slate-950">
            Bible Buddy
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#0056fd] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(0,86,253,0.22)]"
          >
            Start Free
          </Link>
        </div>

        <div className="mb-10">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0056fd]">
              Bible Buddy Blog
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              Bible study articles that help Scripture make sense.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Clear articles, verse breakdowns, church history, and study helps for people who want to understand what they are reading.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group overflow-hidden rounded-[30px] border border-[#d8e3ec] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#0056fd]/35"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-slate-500">
                  <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#0056fd]">
                    Featured
                  </span>
                  <span>{featuredArticle.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {featuredArticle.description}
                </p>
                <p className="mt-5 text-sm font-black text-[#0056fd]">Read article -&gt;</p>
              </div>
            </Link>

            <div className="grid gap-6">
              {secondaryArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group overflow-hidden rounded-[28px] border border-[#d8e3ec] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#0056fd]/35"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 34vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <span>{article.category}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-black leading-tight text-slate-950">{article.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 flex gap-3 overflow-x-auto pb-2">
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
              className="shrink-0 rounded-full border border-[#d8e3ec] bg-white px-4 py-2 text-sm font-black text-slate-700"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <BlogArticleGrid articles={remainingArticles} />

        <section className="mt-10 rounded-[28px] border border-[#b7ccff] bg-[#eaf2ff] p-6 text-center md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0056fd]">
            Understand the Bible daily
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Start your Bible in One Year journey with Bible Buddy.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600">
            Listen through Scripture, open study notes, test yourself with trivia, and join the community discussion.
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
