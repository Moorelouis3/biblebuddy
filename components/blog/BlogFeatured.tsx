import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";
import { formatBlogDate } from "@/components/BlogArticleGrid";

/**
 * The top of /blog (2026-09-19). Replaces the full width auto playing hero
 * slider, which showed a huge picture with no words on it, so the newest
 * post was unreadable and the page felt like a gallery. Now: one featured
 * post with its headline on the picture, and the next four beside it as a
 * short list, the way a normal blog opens.
 */
export default function BlogFeatured({ articles }: { articles: BlogArticle[] }) {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <section className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      <Link
        href={`/blog/${lead.slug}`}
        className="group relative block overflow-hidden rounded-[22px] border border-[#e3e8f0] bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.10)]"
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <Image
            src={lead.image}
            alt={lead.title}
            fill
            priority
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 740px, 100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(4,10,24,0) 35%, rgba(4,10,24,0.85) 100%)" }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#8fc0ff]">
            Latest · {lead.category}
          </p>
          <h2 className="mt-2 text-xl font-black leading-tight text-white sm:text-3xl">{lead.title}</h2>
          <p className="mt-2 hidden max-w-2xl text-sm font-medium leading-6 text-[#d7e2f4] sm:line-clamp-2">
            {lead.description}
          </p>
          <p className="mt-2 text-xs font-bold text-[#a9bdd9]">
            {formatBlogDate(lead.publishedAt)} · {lead.readTime}
          </p>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        {rest.slice(0, 4).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex gap-3 rounded-2xl border border-[#e3e8f0] bg-white p-3 transition hover:border-[#c9dcff] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
          >
            <div className="relative h-[68px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-[#eef4ff]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="104px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#0056fd]">
                {article.category}
              </p>
              <h3 className="mt-1 line-clamp-2 text-sm font-black leading-snug text-slate-950">
                {article.title}
              </h3>
              <p className="mt-1 text-[11px] font-bold text-[#6d7789]">
                {formatBlogDate(article.publishedAt)} · {article.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
