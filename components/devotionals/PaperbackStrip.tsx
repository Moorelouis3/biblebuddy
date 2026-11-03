"use client";

/**
 * "Buy the paperback", at the top of every day of a study (Louis,
 * 2026-10-17).
 *
 * It was only on the study's own page in the Library, which somebody who
 * opens day 12 from the shelf never passes. The day is also where the wish
 * actually turns up - you are reading, and you would rather be reading it in
 * print.
 *
 * Deliberately a strip and not a card: it sits above the study itself and has
 * to stay out of the way of the person who is here to read. Renders nothing
 * at all when the study has no paperback_url, so studies without a printed
 * edition are untouched.
 *
 * 2026-11-03: the words and the gold are now the ones on the full-size Amazon
 * button in components/library/studyGuideShared, so a reader meets the same
 * offer in the same language wherever it appears - "Buy the Physical Copy on
 * Amazon", never "paperback" in one place and "hardcover" in another. The
 * shape stays a strip, because where it sits was a separate decision and it
 * still holds: above somebody who is here to read.
 */
const AMAZON_GOLD_EDGE = "#c39037";

export default function PaperbackStrip({ href, title }: { href: string | null | undefined; title?: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 flex items-center gap-3 rounded-2xl border bg-[#fffaf1] px-4 py-3 transition hover:brightness-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99a45] focus-visible:ring-offset-2"
      style={{ borderColor: AMAZON_GOLD_EDGE }}
    >
      <span aria-hidden className="text-xl">
        📕
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-[#1d1208]">Prefer it in print?</span>
        <span className="block text-xs font-semibold text-[#8a6124]">
          {title ? `${title}, as a real book` : "Get the printed edition"}
        </span>
      </span>
      {/* The full wording needs room; a narrow phone gets the short form
          rather than a wrapped or clipped one. */}
      <span className="shrink-0 text-sm font-black text-[#8a6124]">
        <span className="hidden sm:inline">Buy the Physical Copy on Amazon →</span>
        <span className="sm:hidden">Buy →</span>
      </span>
    </a>
  );
}
