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
 */
export default function PaperbackStrip({ href, title }: { href: string | null | undefined; title?: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 flex items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#e3ecf8)] bg-[var(--bb-surface-soft,#f7faff)] px-4 py-3 transition hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
    >
      <span aria-hidden className="text-xl">
        📕
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">
          Prefer it in print?
        </span>
        <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
          {title ? `${title} as a paperback` : "Get the paperback"}
        </span>
      </span>
      <span className="shrink-0 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">Buy →</span>
    </a>
  );
}
