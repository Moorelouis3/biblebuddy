import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";

export default function BlogArticleGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group block transition hover:-translate-y-0.5"
        >
          <article className="overflow-hidden rounded-[24px] border border-[#dce7f5] bg-white shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4ff]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 44vw, 92vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07162f]/68 via-[#07162f]/18 to-transparent p-5">
                <span className="inline-flex rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#07162f]">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <h2 className="text-[1.22rem] font-black leading-tight tracking-[-0.02em] text-slate-950 sm:text-[1.35rem]">
                {article.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[0.8rem] font-semibold text-slate-500">
                <span className="font-bold text-slate-600">Bible Buddy</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span>{article.readTime}</span>
              </div>
              <p className="mt-4 line-clamp-3 text-[0.98rem] leading-7 text-slate-600">
                {article.description}
              </p>
              <span className="mt-5 inline-flex rounded-full border border-[#dce7f5] px-4 py-2 text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#07162f] transition group-hover:border-[#0056fd] group-hover:text-[#0056fd]">
                Read more
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
