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
          className="group overflow-hidden rounded-[28px] border border-[#d8e3ec] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#0056fd]/35 hover:shadow-[0_24px_60px_rgba(0,86,253,0.12)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#eaf2ff]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 42vw, (min-width: 768px) 44vw, 92vw"
            />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-slate-500">
              <span>{article.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{article.readTime}</span>
            </div>
            <h2 className="text-2xl font-black leading-tight text-slate-950">{article.title}</h2>
            <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-600">
              {article.description}
            </p>
            <span className="mt-5 inline-flex items-center text-sm font-black text-[#0056fd]">
              Read article
              <span className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
