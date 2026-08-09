import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BlogPostingSchema from "@/components/BlogPostingSchema";
import BlogPostBreaker from "@/components/blog/BlogPostBreaker";
import BlogPostBottom from "@/components/blog/BlogPostBottom";
import { getArticleEngagementKey, getBlogArticle } from "@/lib/blogContent";

type BlogPostShellProps = {
  slug: string;
  // The on-page H1. Defaults to the listing title with the 📖 prefix.
  title?: ReactNode;
  // Content shown between the title and the share/like breaker row.
  intro: ReactNode;
  // The rest of the article, shown after the breaker.
  children: ReactNode;
};

// Standard blog post page order: banner image, category breadcrumb, title,
// intro, share/like breaker, article body, then CTA + comments.
export default function BlogPostShell({ slug, title, intro, children }: BlogPostShellProps) {
  const article = getBlogArticle(slug);
  if (!article) return null;

  const engagementKey = getArticleEngagementKey(article);
  const path = `/blog/${article.slug}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <BlogPostingSchema slug={slug} />
      <article>
        <div className="mb-6">
          <Image
            src={article.image}
            alt={`${article.title} banner`}
            width={1600}
            height={1000}
            className="h-auto w-full rounded-[28px] object-cover shadow-[0_18px_48px_rgba(15,23,42,0.10)]"
            priority
          />
        </div>

        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
          <Link href="/blog" className="text-[#0056fd] transition hover:text-[#0049d8]">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href={`/blog/category/${article.categorySlug}`} className="text-[#0056fd] transition hover:text-[#0049d8]">
            {article.category}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="min-w-0 flex-1 truncate normal-case tracking-normal">{article.title}</span>
        </nav>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title ?? <>📖 {article.title}</>}
        </h1>

        {intro}

        <BlogPostBreaker articleSlug={engagementKey} path={path} title={article.title} />

        {children}
      </article>

      <BlogPostBottom articleSlug={engagementKey} />
    </div>
  );
}
