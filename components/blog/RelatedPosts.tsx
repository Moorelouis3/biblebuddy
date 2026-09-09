import Image from "next/image";
import Link from "next/link";
import { BLOG_ARTICLES, getBlogArticle } from "@/lib/blogContent";

// "Keep reading" - the related-posts block every WordPress blog ships with
// and we did not have (2026-09-09 blog audit). It does two jobs: gives a
// reader who finished a post somewhere to go instead of leaving (bounce is
// what quietly costs rankings), and hands Google a dense internal link
// graph, which is how crawl budget reaches the pages still stuck outside
// the index.
//
// Picking: same category first, newest first, then fill from the rest of
// the catalog so a thin category never renders an empty block.
function pickRelated(slug: string, limit = 3) {
  const current = getBlogArticle(slug);
  if (!current) return [];

  const others = BLOG_ARTICLES.filter((entry) => entry.slug !== slug);
  const byDateDesc = (a: typeof others[number], b: typeof others[number]) =>
    Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

  const sameCategory = others
    .filter((entry) => entry.categorySlug === current.categorySlug)
    .sort(byDateDesc);
  const rest = others
    .filter((entry) => entry.categorySlug !== current.categorySlug)
    .sort(byDateDesc);

  return [...sameCategory, ...rest].slice(0, limit);
}

export default function RelatedPosts({ slug }: { slug: string }) {
  const related = pickRelated(slug);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="mt-10 border-t border-[#dce8ff] pt-7">
      <h2 id="related-posts-heading" className="text-xl font-black tracking-tight text-slate-950">
        Keep reading
      </h2>
      <p className="mt-1 text-sm font-semibold text-[#41506b]">More studies you might like.</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {related.map((entry) => (
          <Link
            key={entry.slug}
            href={entry.canonicalPath}
            className="group block overflow-hidden rounded-[18px] border border-[#dce8ff] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4ff]">
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                loading="lazy"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 220px, 92vw"
              />
            </div>
            <div className="p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#0056fd]">{entry.category}</p>
              <p className="mt-1 line-clamp-2 text-sm font-black leading-snug text-slate-950">{entry.title}</p>
              <p className="mt-1 text-xs font-bold text-[#6d7789]">{entry.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
