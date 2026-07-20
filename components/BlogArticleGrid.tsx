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
          <article className="overflow-hidden rounded-[18px] border border-[#dce7f5] bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition duration-300 group-hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4ff]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 44vw, 92vw"
              />
            </div>

            <div className={compact ? "p-4" : "p-5"}>
              <h2 className={`font-black leading-snug tracking-[-0.025em] text-slate-950 ${compact ? "text-[1.1rem]" : "text-[1.3rem]"}`}>
                {article.title}
              </h2>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
