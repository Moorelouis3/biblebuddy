import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";

type BlogArticleGridProps = {
  articles: BlogArticle[];
  compact?: boolean;
};

export default function BlogArticleGrid({ articles, compact = false }: BlogArticleGridProps) {
  return (
    <div className={`grid ${compact ? "gap-x-8 gap-y-10 md:grid-cols-2" : "gap-x-8 gap-y-12 md:grid-cols-2"}`}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group block transition hover:-translate-y-0.5"
        >
          <article className="overflow-hidden rounded-[18px] border border-[#dce7f5] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition duration-300 group-hover:shadow-[0_28px_65px_rgba(15,23,42,0.1)]">
            <div className={`relative overflow-hidden bg-[#eef4ff] ${compact ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 44vw, 92vw"
              />
            </div>

            <div className={compact ? "p-5" : "p-6"}>
              <div className="flex flex-wrap items-center gap-3 text-[0.78rem] font-black uppercase tracking-[0.16em] text-[#6a7890]">
                <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-[#0056fd]">
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>

              <h2 className={`mt-4 font-black leading-snug tracking-[-0.025em] text-slate-950 ${compact ? "text-[1.25rem] sm:text-[1.4rem]" : "text-[1.55rem] sm:text-[1.8rem]"}`}>
                {article.title}
              </h2>

              <p className={`mt-4 line-clamp-3 text-slate-500 ${compact ? "text-[0.96rem] leading-7" : "text-[1rem] leading-8"}`}>
                {article.description}
              </p>

              <span className={`mt-6 inline-flex border border-[#dce7f5] bg-white font-black uppercase tracking-[0.14em] text-[#07162f] transition group-hover:border-[#0056fd] group-hover:text-[#0056fd] ${compact ? "px-4 py-2.5 text-[0.7rem]" : "px-5 py-3 text-[0.74rem]"}`}>
                Read more
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
