import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blogContent";

// Previous / next chapter links for the "<Book> <N> Explained" library
// (2026-09-17). Derived from BLOG_ARTICLES at build time, so a link only
// appears once that chapter's article really exists: Genesis 5 gains its
// "Genesis 6" link automatically the day Genesis 6 is published, and a
// missing chapter never produces a broken link.
//
// Book order and chapter counts mirror scripts/chapter-blog-queue.mjs.
const BOOKS: Array<[string, number]> = [
  ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36], ["Deuteronomy", 34],
  ["Joshua", 24], ["Judges", 21], ["Ruth", 4], ["1 Samuel", 31], ["2 Samuel", 24],
  ["1 Kings", 22], ["2 Kings", 25], ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10],
  ["Nehemiah", 13], ["Esther", 10], ["Job", 42], ["Psalm", 150], ["Proverbs", 31],
  ["Ecclesiastes", 12], ["Song of Solomon", 8], ["Isaiah", 66], ["Jeremiah", 52], ["Lamentations", 5],
  ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14], ["Joel", 3], ["Amos", 9],
  ["Obadiah", 1], ["Jonah", 4], ["Micah", 7], ["Nahum", 3], ["Habakkuk", 3],
  ["Zephaniah", 3], ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4], ["Matthew", 28],
  ["Mark", 16], ["Luke", 24], ["John", 21], ["Acts", 28], ["Romans", 16],
  ["1 Corinthians", 16], ["2 Corinthians", 13], ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4],
  ["Colossians", 4], ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6], ["2 Timothy", 4],
  ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5], ["1 Peter", 5],
  ["2 Peter", 3], ["1 John", 5], ["2 John", 1], ["3 John", 1], ["Jude", 1], ["Revelation", 22],
];

const CHAPTERS = BOOKS.flatMap(([book, count]) =>
  Array.from({ length: count }, (_, i) => ({
    label: `${book} ${i + 1}`,
    slug: `${book.toLowerCase().replace(/\s+/g, "-")}-${i + 1}-explained`,
  })),
);
const INDEX_BY_SLUG = new Map(CHAPTERS.map((chapter, index) => [chapter.slug, index]));
const PUBLISHED = new Set(BLOG_ARTICLES.map((article) => article.slug));

export default function ChapterNav({ slug }: { slug: string }) {
  const index = INDEX_BY_SLUG.get(slug);
  if (index === undefined) return null;
  const previous = index > 0 && PUBLISHED.has(CHAPTERS[index - 1].slug) ? CHAPTERS[index - 1] : null;
  const next = index < CHAPTERS.length - 1 && PUBLISHED.has(CHAPTERS[index + 1].slug) ? CHAPTERS[index + 1] : null;
  if (!previous && !next) return null;

  return (
    <nav aria-label="Chapter navigation" className="mt-10 grid grid-cols-2 gap-3">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="rounded-2xl border border-[#dce8ff] bg-white px-4 py-3 transition hover:border-[#0056fd]"
        >
          <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">← Previous chapter</span>
          <span className="mt-1 block text-base font-black text-slate-950">{previous.label} Explained</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="rounded-2xl border border-[#dce8ff] bg-white px-4 py-3 text-right transition hover:border-[#0056fd]"
        >
          <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#0056fd]">Next chapter →</span>
          <span className="mt-1 block text-base font-black text-slate-950">{next.label} Explained</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
