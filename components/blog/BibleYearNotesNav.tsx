import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blogContent";

// Previous / next day links for the Bible in One Year Study Notes series
// (2026-09-19). Derived from BLOG_ARTICLES at build time, same pattern as
// ChapterNav: a link only appears once that day's article really exists, so
// a future day never produces a broken link.
export default function BibleYearNotesNav({ slug }: { slug: string }) {
  const current = BLOG_ARTICLES.find((article) => article.slug === slug);
  if (!current || !current.bibleYearDay) return null;

  const byDay = new Map(
    BLOG_ARTICLES.filter((article) => article.bibleYearDay).map((article) => [article.bibleYearDay as number, article]),
  );
  const previous = byDay.get(current.bibleYearDay - 1) || null;
  const next = byDay.get(current.bibleYearDay + 1) || null;
  if (!previous && !next) return null;

  return (
    <nav aria-label="Bible in One Year day navigation" className="mt-10 grid grid-cols-2 gap-3">
      {previous ? (
        <Link
          href={previous.canonicalPath}
          className="rounded-2xl border border-[#dce8ff] bg-white px-4 py-3 transition hover:border-[#0056fd]"
        >
          <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">← Previous day</span>
          <span className="mt-1 block text-base font-black text-slate-950">Day {previous.bibleYearDay} Study Notes</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.canonicalPath}
          className="rounded-2xl border border-[#dce8ff] bg-white px-4 py-3 text-right transition hover:border-[#0056fd]"
        >
          <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">Next day →</span>
          <span className="mt-1 block text-base font-black text-slate-950">Day {next.bibleYearDay} Study Notes</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
