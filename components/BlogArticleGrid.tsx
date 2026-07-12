import Link from "next/link";
import type { BlogArticle } from "@/lib/blogContent";

export default function BlogArticleGrid({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group flex min-h-[230px] flex-col rounded-[24px] border border-[#d8e3ec] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#0056fd]/35 hover:shadow-[0_24px_60px_rgba(0,86,253,0.12)]"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#0056fd]">
              {article.category}
            </span>
            <span className="text-xs font-bold text-slate-500">{article.readTime}</span>
          </div>

          <h2 className="text-2xl font-black leading-tight text-slate-950">{article.title}</h2>
          <p className="mt-3 flex-1 text-sm font-semibold leading-6 text-slate-600">
            {article.description}
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-black text-[#0056fd]">
            Read article
            <span className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
