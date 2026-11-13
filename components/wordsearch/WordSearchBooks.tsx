"use client";

/**
 * Bible Word Search: choose a book (2026-11-13).
 *
 * All 66, in Bible order, in two groups. Every book is open from the start -
 * nothing has to be unlocked - and each one says in words whether it is not
 * started, in progress or completed, so the state never depends on colour.
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { trackFeatureEvent } from "@/lib/featureEvents";
import { OLD_TESTAMENT_COUNT, WORD_SEARCH_BOOKS, type WordSearchBook } from "@/lib/wordSearchData";
import { listWordSearchProgress, type WordSearchProgress } from "@/lib/wordSearchProgress";

type LoadState = "loading" | "ready" | "failed";

export default function WordSearchBooks() {
  const [state, setState] = useState<LoadState>("loading");
  const [rows, setRows] = useState<WordSearchProgress[]>([]);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    const id = data.user?.id ?? null;
    if (!id) return { rows: [] as WordSearchProgress[], ok: true };
    // One "opened" per visit to the list, so people who look and leave are
    // counted and not mistaken for people who never found the game.
    trackFeatureEvent("word_search_opened", id);
    try {
      return { rows: await listWordSearchProgress(id), ok: true };
    } catch {
      return { rows: [] as WordSearchProgress[], ok: false };
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void load().then((result) => {
      if (cancelled) return;
      setRows(result.rows);
      setState(result.ok ? "ready" : "failed");
    });
    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const bySlug = useMemo(() => new Map(rows.map((row) => [row.book, row])), [rows]);
  const completed = rows.filter((row) => row.completed_at).length;

  function status(book: WordSearchBook) {
    const row = bySlug.get(book.slug);
    if (!row) return { text: "Not started", tone: "idle" as const };
    const inGrid = row.found.length;
    if (row.completed_at && (inGrid === 0 || inGrid >= book.words.length)) return { text: "✓ Completed", tone: "done" as const };
    if (row.completed_at) return { text: `✓ Completed · replay ${inGrid}/${book.words.length}`, tone: "done" as const };
    if (inGrid === 0) return { text: "Not started", tone: "idle" as const };
    return { text: `In progress · ${inGrid}/${book.words.length}`, tone: "going" as const };
  }

  const toneClass = {
    idle: "text-[var(--bb-text-muted,#6b7280)]",
    going: "text-[#92400e]",
    done: "text-[#166534]",
  };

  const group = (title: string, books: WordSearchBook[]) => (
    <section>
      <h2 className="mb-2 mt-2 text-sm font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">{title}</h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {books.map((book) => {
          const current = status(book);
          return (
            <li key={book.slug}>
              <Link
                href={`/bible-study-games/word-search/${book.slug}`}
                className={`flex min-h-[64px] flex-col justify-center rounded-2xl border bg-[var(--bb-card,#ffffff)] px-3 py-2.5 shadow-sm transition active:scale-[0.98] ${
                  current.tone === "done" ? "border-[#166534]" : "border-[var(--bb-card-border,#dbe7f4)]"
                }`}
              >
                <span className="truncate text-[15px] font-black text-[var(--bb-text-primary,#111827)]">{book.book}</span>
                <span className={`mt-0.5 truncate text-xs font-bold ${state === "ready" ? toneClass[current.tone] : "text-transparent"}`}>
                  {state === "ready" ? current.text : "·"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 pb-28 pt-4">
      <header>
        <Link href="/bible-study-games" className="text-sm font-bold text-[var(--bb-text-muted,#6b7280)]" style={{ color: "var(--bb-text-muted,#6b7280)" }}>
          ← Games
        </Link>
        <h1 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#111827)]">Bible Word Search</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          One puzzle for every book of the Bible. Pick any book.
        </p>
        {state === "ready" ? (
          <p className="mt-2 text-sm font-black text-[var(--bb-text-secondary,#374151)]">{completed} of 66 books completed</p>
        ) : null}
      </header>

      {state === "failed" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-700">
            Your progress did not load, so the books below show no status. It is still saved.
          </p>
          <button
            type="button"
            onClick={() => {
              setState("loading");
              setAttempt((value) => value + 1);
            }}
            className="mt-2 rounded-full bg-red-700 px-4 py-2 text-sm font-black text-white"
          >
            Try again
          </button>
        </div>
      ) : null}

      {group("Old Testament", WORD_SEARCH_BOOKS.slice(0, OLD_TESTAMENT_COUNT))}
      {group("New Testament", WORD_SEARCH_BOOKS.slice(OLD_TESTAMENT_COUNT))}
    </div>
  );
}
