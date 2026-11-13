"use client";

/**
 * One book's word search: the grid, the word list under it, the details for
 * a found word, and the finish (2026-11-13).
 *
 * Laid out for a phone held upright: progress on top, the grid as wide as the
 * screen allows, the words below in two columns where a thumb can reach them.
 * Nothing interrupts a find - a found word simply becomes tappable, and the
 * explanation and its verse open only when the person asks for them.
 *
 * The grid comes from (book, seed) and nothing else, so what is saved is the
 * seed and the words found. Completion is recorded once, on the first finish,
 * and "Play again" never touches it: it only swaps the seed and clears the
 * found words for the new grid.
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { fetchStaticJson, kjvStaticUrl } from "@/lib/chapterStaticData";
import { supabase } from "@/lib/supabaseClient";
import { useMemoryVerse } from "@/lib/useMemoryVerse";
import type { WordSearchBook, WordSearchWord } from "@/lib/wordSearchData";
import { generatePuzzle, newSeed } from "@/lib/wordSearchGame";
import { getWordSearchProgress, saveWordSearchProgress, type WordSearchProgress } from "@/lib/wordSearchProgress";
import WordSearchGrid from "./WordSearchGrid";

type LoadState = "loading" | "ready" | "failed";

const BOOKS_HREF = "/bible-study-games/word-search";
const cardClass = "rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm";
const primaryButton =
  "block w-full rounded-xl bg-[var(--bb-button,#2563eb)] px-5 py-3.5 text-center text-base font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95";
const quietButton =
  "block w-full rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-3.5 text-center text-base font-black text-[var(--bb-text-primary,#111827)]";

function readerHref(book: string, chapter: number) {
  return `/bible/${encodeURIComponent(book.toLowerCase())}/${chapter}`;
}

export default function WordSearchGame({ book }: { book: WordSearchBook }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [progress, setProgress] = useState<WordSearchProgress | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const [openWord, setOpenWord] = useState<WordSearchWord | null>(null);
  const [justFinished, setJustFinished] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const finishRef = useRef<HTMLDivElement | null>(null);

  const letters = useMemo(() => book.words.map((word) => word.letters), [book]);

  // Open the book: resume the saved grid, or start one and save its seed at
  // once so that leaving after a minute still comes back to the same letters.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      const id = data.user?.id ?? null;
      setUserId(id);
      if (!id) {
        // Signed out: playable, just not saved.
        setProgress({ book: book.slug, seed: newSeed(), found: [], completed_at: null, completions: 0 });
        setState("ready");
        return;
      }
      try {
        const saved = await getWordSearchProgress(id, book.slug);
        if (cancelled) return;
        if (saved) {
          setProgress({ ...saved, found: saved.found.filter((word) => letters.includes(word)) });
        } else {
          const fresh: WordSearchProgress = { book: book.slug, seed: newSeed(), found: [], completed_at: null, completions: 0 };
          setProgress(fresh);
          void saveWordSearchProgress(id, fresh).then((ok) => {
            if (!ok && !cancelled) setSaveFailed(true);
          });
        }
        setState("ready");
      } catch {
        // A failed read is not "never played". Starting a new grid here would
        // overwrite the real one, so stop and offer another try.
        if (!cancelled) setState("failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book, letters, attempt]);

  // The grid depends on the seed alone, so finding a word (which replaces
  // `progress`) must not rebuild it. Pulling the seed out first makes that
  // the only thing the memo watches.
  const seed = progress?.seed ?? null;
  const puzzle = useMemo(() => (seed === null ? null : generatePuzzle(book.slug, letters, seed)), [book.slug, letters, seed]);

  const found = useMemo(() => progress?.found ?? [], [progress]);
  const foundSet = useMemo(() => new Set(found), [found]);
  const allFound = Boolean(progress) && found.length >= letters.length;

  const persist = useCallback(
    (next: WordSearchProgress) => {
      setProgress(next);
      if (!userId) return;
      void saveWordSearchProgress(userId, next).then((ok) => setSaveFailed(!ok));
    },
    [userId],
  );

  const handleFound = useCallback(
    (word: string) => {
      if (!progress || progress.found.includes(word)) return;
      const nextFound = [...progress.found, word];
      const finished = nextFound.length >= letters.length;
      const firstFinish = finished && !progress.completed_at;
      persist({
        ...progress,
        found: nextFound,
        completed_at: finished ? progress.completed_at ?? new Date().toISOString() : progress.completed_at,
        completions: finished ? progress.completions + 1 : progress.completions,
      });
      if (finished) {
        setJustFinished(true);
        window.setTimeout(() => finishRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
      // Logged once per book, the first time it is finished. The points
      // engine scores this action once per book name, so a replay could not
      // score again even if it were logged - but there is no reason to log it.
      if (firstFinish && userId) {
        void logActionToMasterActions(userId, ACTION_TYPE.word_search_book_completed, book.book).catch(() => {});
      }
    },
    [progress, letters.length, persist, userId, book.book],
  );

  function playAgain() {
    if (!progress) return;
    setJustFinished(false);
    setOpenWord(null);
    persist({ ...progress, seed: newSeed(), found: [] });
    window.scrollTo({ top: 0 });
  }

  const shell = "mx-auto flex w-full max-w-2xl flex-col gap-3 px-3 pb-28 pt-3 sm:px-4";

  if (state === "loading" || (state === "ready" && (!progress || !puzzle))) {
    return (
      <div className={shell}>
        <p className="py-16 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Loading the {book.book} puzzle...</p>
      </div>
    );
  }

  if (state === "failed" || !progress || !puzzle) {
    return (
      <div className={shell}>
        <div className={`${cardClass} text-center`}>
          <p className="text-base font-bold text-[var(--bb-text-primary,#111827)]">Your {book.book} puzzle did not load.</p>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Your progress is still saved. Check your connection and try again.
          </p>
          <button type="button" onClick={() => { setState("loading"); setAttempt((value) => value + 1); }} className={`${primaryButton} mt-4`}>
            Try again
          </button>
          <Link href={BOOKS_HREF} className={`${quietButton} mt-3`} style={{ color: "var(--bb-text-primary,#111827)" }}>
            Choose another book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <Link href={BOOKS_HREF} className="text-sm font-bold text-[var(--bb-text-muted,#6b7280)]" style={{ color: "var(--bb-text-muted,#6b7280)" }}>
            ← Books
          </Link>
          {/* Wraps instead of cutting off: "1 Thessalonians" does not fit one
              line beside the counter on a 320px phone. */}
          <h1 className="text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{book.book}</h1>
        </div>
        <p
          className="shrink-0 rounded-full bg-[var(--bb-accent-soft,#eaf2ff)] px-3 py-1.5 text-sm font-black text-[var(--bb-accent,#2563eb)]"
          aria-live="polite"
        >
          {found.length} of {letters.length} found
        </p>
      </header>

      {saveFailed ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
          Your last find did not save. Check your connection; it will save with your next one.
        </p>
      ) : null}

      {allFound ? (
        <div ref={finishRef} className={`${cardClass} text-center`}>
          <p className="text-4xl" aria-hidden="true">
            {justFinished ? "🎉" : "✅"}
          </p>
          <h2 className="mt-2 text-xl font-black text-[var(--bb-text-primary,#111827)]">
            {justFinished ? `You finished ${book.book}!` : `${book.book} is complete`}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            All {letters.length} words found. Tap any word below to read about it.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href={readerHref(book.book, 1)} className={primaryButton} style={{ color: "var(--bb-button-text,#ffffff)" }}>
              Read {book.book}
            </Link>
            <button type="button" onClick={playAgain} className={quietButton}>
              Play again
            </button>
            <Link href={BOOKS_HREF} className={quietButton} style={{ color: "var(--bb-text-primary,#111827)" }}>
              Choose another book
            </Link>
          </div>
        </div>
      ) : null}

      <WordSearchGrid key={`${book.slug}-${progress.seed}`} puzzle={puzzle} found={found} onFound={handleFound} disabled={allFound} />

      <section aria-label="Words to find">
        <p className="mb-2 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
          {allFound ? "Tap a word to read about it." : "Drag across a word, or tap its first and last letter. Tap a found word to read about it."}
        </p>
        {/* Pills that wrap, not a fixed two-column table: short words share a
            row, so on a phone the whole list sits under the grid in three or
            four lines instead of six. Found pills stay 44px tall to tap. */}
        <ul className="flex flex-wrap gap-2">
          {book.words.map((word) => {
            const isFound = foundSet.has(word.letters);
            return (
              <li key={word.letters}>
                {isFound ? (
                  <button
                    type="button"
                    onClick={() => setOpenWord(word)}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-full border-2 border-[#166534] bg-[#f0fdf4] px-3.5 text-[13px] font-black text-[#166534]"
                  >
                    <span aria-hidden="true">✓</span>
                    <span className="line-through decoration-2">{word.label}</span>
                    <span aria-hidden="true">›</span>
                    <span className="sr-only">found. Open details</span>
                  </button>
                ) : (
                  <div className="flex min-h-[44px] items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3.5 text-[13px] font-black text-[var(--bb-text-primary,#111827)]">
                    {word.label}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {openWord ? <WordDetails book={book} word={openWord} userId={userId} onClose={() => setOpenWord(null)} /> : null}
    </div>
  );
}

// ───────────────────────── word details ─────────────────────────

/**
 * The sheet a found word opens: what it has to do with this book, the verse
 * itself, a way into the reader, and "Add to Bible Memory".
 *
 * Portalled to <body> so no transformed ancestor can move a fixed panel off
 * screen.
 */
function WordDetails({
  book,
  word,
  userId,
  onClose,
}: {
  book: WordSearchBook;
  word: WordSearchWord;
  userId: string | null;
  onClose: () => void;
}) {
  const requestKey = `${book.slug}|${word.chapter}|${word.verse}`;
  const [loaded, setLoaded] = useState<{ key: string; text: string | null } | null>(null);
  const verseText = loaded?.key === requestKey ? loaded.text : null;
  const verseState: "loading" | "ready" | "failed" = loaded?.key !== requestKey ? "loading" : loaded.text ? "ready" : "failed";

  useEffect(() => {
    let cancelled = false;
    void fetchStaticJson<Array<{ number: number; text: string }>>(kjvStaticUrl(book.book, word.chapter)).then((chapter) => {
      if (cancelled) return;
      const text = chapter?.find((row) => row.number === word.verse)?.text ?? null;
      setLoaded({ key: requestKey, text: text ? text.replace(/\s+/g, " ").trim() : null });
    });
    return () => {
      cancelled = true;
    };
  }, [book.book, word.chapter, word.verse, requestKey]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const memory = useMemoryVerse(
    userId,
    verseText ? { book: book.book, chapter: word.chapter, verse: word.verse, translation: "KJV", text: verseText } : null,
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${word.label} in ${book.book}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-2xl font-black tracking-wide text-gray-900">{word.label}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-200 text-lg font-black text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="mt-2 text-base font-bold leading-6 text-gray-900">{word.explanation}</p>

        <div className="mt-4 rounded-2xl bg-gray-50 p-4">
          <p className="text-sm font-black text-gray-700">{word.reference} · KJV</p>
          {verseState === "loading" ? <p className="mt-2 text-sm font-semibold text-gray-500">Loading the verse...</p> : null}
          {verseState === "ready" ? <p className="mt-2 font-serif text-[15px] font-semibold leading-6 text-gray-800">{verseText}</p> : null}
          {verseState === "failed" ? (
            <p className="mt-2 text-sm font-semibold text-gray-500">The verse did not load here. You can still open it in the Bible.</p>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link href={readerHref(book.book, word.chapter)} className={primaryButton} style={{ color: "var(--bb-button-text,#ffffff)" }}>
            Open {book.book} {word.chapter} in the Bible
          </Link>
          {userId && verseText ? (
            <button
              type="button"
              onClick={() => void memory.toggle()}
              disabled={memory.busy}
              aria-pressed={memory.saved}
              className={`block w-full rounded-xl border px-5 py-3.5 text-center text-base font-black ${
                memory.saved ? "border-green-600 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-900"
              }`}
            >
              {memory.failed ? "Did not save. Tap to retry" : memory.saved ? "✓ In Bible Memory" : "🧠 Add to Bible Memory"}
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
