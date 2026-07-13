import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";

export default function BlogArticleGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group block transition hover:-translate-y-0.5"
        >
          <article className="relative">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-[#eef4ff] shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 44vw, 92vw"
              />
            </div>
            <div className="absolute left-5 top-[calc(56.25%-18px)] z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-white bg-[#edf3ff] shadow-[0_10px_22px_rgba(15,23,42,0.08)]">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#6d93ff]" />
            </div>
            <div className="px-1 pt-10">
              <h2 className="text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.7rem]">
                {article.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[0.82rem] font-medium text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-400">◌</span>
                  Bible Buddy
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-400">◷</span>
                  {article.readTime}
                </span>
              </div>
              <p className="mt-5 line-clamp-3 text-[1rem] leading-8 text-slate-500">
                {article.description}
              </p>
              <span className="mt-6 inline-flex border border-[#e7ebf1] bg-white px-6 py-3 text-[0.72rem] font-black uppercase tracking-[0.14em] text-[#07162f] transition group-hover:border-[#0056fd] group-hover:text-[#0056fd]">
                Read more
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
