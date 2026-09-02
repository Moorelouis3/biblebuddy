import Link from "next/link";

/**
 * The Games tab's landing page. This used to redirect straight to trivia,
 * which left Scrambled invisible - Louis, 2026-09-02: the games button
 * "should lead with the scrambled or trivia page". So it leads with both.
 */
export default function BibleStudyGamesPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-28 pt-4">
      <header>
        <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">Games</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Test what you remember after reading and studying Scripture.
        </p>
      </header>

      <Link
        href="/bible-trivia"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ede9fe] text-2xl" aria-hidden="true">
          ❓
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">Bible Trivia</span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            How well do you know the books and people of the Bible?
          </span>
        </span>
      </Link>

      <Link
        href="/bible-study-games/scrambled"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dcfce7] text-2xl" aria-hidden="true">
          🔤
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">Scrambled</span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Unscramble the verse before the hints run out.
          </span>
        </span>
      </Link>
    </div>
  );
}
