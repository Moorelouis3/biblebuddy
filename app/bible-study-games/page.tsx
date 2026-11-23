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


      {/* Bible Buddy Match, 2026-11-22: on the page so Louis can test it on different phones. */}
      <Link
        href="/bible-study-games/match?from=games"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: "#0056FD" }} aria-hidden="true">
          💎
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">
            Bible Buddy Match{" "}
            <span className="ml-1 rounded-full px-2 py-0.5 align-middle text-[10px] font-black uppercase tracking-wide" style={{ backgroundColor: "#f4d35e", color: "#2a2205" }}>
              New
            </span>
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Connect the tiles and walk through Genesis, board by board.
          </span>
        </span>
      </Link>

      {/* Bible Trivia (2026-11-23): the Bible Clue game, renamed, replaced the old Bible Trivia card and game. */}
      <Link
        href="/bible-study-games/clue?from=games"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: "#1d5a37" }} aria-hidden="true">
          🃏
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">Bible Trivia</span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Any book, any chapter, ten seconds each. Play solo, with friends, or take a challenge.
          </span>
        </span>
      </Link>

      {/* Scrambled left the Games page on 2026-11-23 (Louis: "remove scrambled from the games
          page"). The game itself and its other doors (the prompt after chapter trivia) stay. */}

      {/* Bible Memory, 2026-11-12. The third game: save a verse, practise it. */}
      <Link
        href="/bible-study-games/memory"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fef3c7] text-2xl" aria-hidden="true">
          🧠
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">Bible Memory</span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Save a verse and learn it by heart, a few minutes at a time.
          </span>
        </span>
      </Link>

      {/* Bible Word Search, 2026-11-13. One puzzle for each of the 66 books. */}
      <Link
        href="/bible-study-games/word-search"
        className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dbeafe] text-2xl" aria-hidden="true">
          🔎
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">Bible Word Search</span>
          <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Find the people, places and themes of every book.
          </span>
        </span>
      </Link>
    </div>
  );
}
