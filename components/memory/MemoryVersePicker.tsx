"use client";

/**
 * Choose a verse by book, chapter and verse, without typing any Scripture.
 *
 * The verse list is the chapter itself, read from the same King James files
 * the reader uses (public/kjv), so the words saved here are the words the
 * reader shows. That also answers "how many verses does this chapter have"
 * without a table of verse counts: the chapter knows.
 */

import { useEffect, useMemo, useState } from "react";
import { BIBLE_BOOKS, getBookTotalChapters } from "@/lib/bibleBookChapters";
import { fetchStaticJson, kjvStaticUrl } from "@/lib/chapterStaticData";
import { addMemoryVerse } from "@/lib/bibleMemory";
import { cleanVerseText, type MemoryVerse } from "@/lib/bibleMemoryGames";

type ChapterVerse = { number: number; text: string };

type Props = {
  userId: string;
  saved: readonly MemoryVerse[];
  onAdded: () => void;
  onClose: () => void;
};

const selectClass =
  "w-full rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-3 text-base font-bold text-[var(--bb-text-primary,#111827)]";

export default function MemoryVersePicker({ userId, saved, onAdded, onClose }: Props) {
  const [book, setBook] = useState("John");
  const [chapter, setChapter] = useState(3);
  // The last chapter that finished loading, tagged with what was asked for.
  // "Loading" is simply "the answer on hand is for a different request", so
  // switching book never flashes the previous chapter's verses.
  const [loaded, setLoaded] = useState<{ key: string; verses: ChapterVerse[] | null } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${book}|${chapter}|${attempt}`;
  const status: "loading" | "ready" | "failed" =
    loaded?.key !== requestKey ? "loading" : loaded.verses ? "ready" : "failed";
  const verses = loaded?.key === requestKey ? loaded.verses : null;
  const [savingVerse, setSavingVerse] = useState<number | null>(null);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());
  const [saveFailed, setSaveFailed] = useState(false);

  const totalChapters = getBookTotalChapters(book);

  useEffect(() => {
    let cancelled = false;
    void fetchStaticJson<ChapterVerse[]>(kjvStaticUrl(book, chapter)).then((data) => {
      if (cancelled) return;
      setLoaded({ key: requestKey, verses: Array.isArray(data) && data.length ? data : null });
    });
    return () => {
      cancelled = true;
    };
  }, [book, chapter, requestKey]);

  const savedKeys = useMemo(() => {
    const keys = new Set<string>(justAdded);
    for (const verse of saved) {
      if (verse.translation === "KJV" && !verse.verse_end) keys.add(`${verse.book}|${verse.chapter}|${verse.verse}`);
    }
    return keys;
  }, [saved, justAdded]);

  async function add(verse: ChapterVerse) {
    if (savingVerse !== null) return;
    setSavingVerse(verse.number);
    setSaveFailed(false);
    const result = await addMemoryVerse(userId, {
      book,
      chapter,
      verse: verse.number,
      translation: "KJV",
      text: verse.text,
    });
    setSavingVerse(null);
    if (result.status === "error") {
      setSaveFailed(true);
      return;
    }
    setJustAdded((current) => new Set(current).add(`${book}|${chapter}|${verse.number}`));
    onAdded();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-[var(--bb-text-primary,#111827)]">Add a verse</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] px-4 py-2 text-sm font-black text-[var(--bb-text-secondary,#374151)]"
        >
          Done
        </button>
      </div>

      <div className="grid grid-cols-[1fr_7rem] gap-2">
        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">Book</span>
          <select
            className={selectClass}
            value={book}
            onChange={(event) => {
              setBook(event.target.value);
              setChapter(1);
            }}
          >
            {BIBLE_BOOKS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">Chapter</span>
          <select className={selectClass} value={chapter} onChange={(event) => setChapter(Number(event.target.value))}>
            {Array.from({ length: totalChapters }, (_, index) => index + 1).map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Tap a verse to add it. King James Version.</p>

      {saveFailed ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          That verse did not save. Check your connection and tap it again.
        </p>
      ) : null}

      {status === "loading" ? (
        <p className="py-8 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Loading {book} {chapter}...
        </p>
      ) : null}

      {status === "failed" ? (
        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 text-center">
          <p className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">
            {book} {chapter} did not load.
          </p>
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="mt-3 rounded-full bg-[var(--bb-button,#2563eb)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
          >
            Try again
          </button>
        </div>
      ) : null}

      {status === "ready" && verses ? (
        <ul className="flex flex-col gap-2">
          {verses.map((verse) => {
            const isSaved = savedKeys.has(`${book}|${chapter}|${verse.number}`);
            return (
              <li key={verse.number}>
                <button
                  type="button"
                  disabled={isSaved || savingVerse !== null}
                  onClick={() => void add(verse)}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    isSaved
                      ? "border-[#16a34a] bg-[#f0fdf4]"
                      : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] hover:brightness-95"
                  }`}
                >
                  <span className="mt-0.5 w-7 shrink-0 text-sm font-black text-[var(--bb-accent,#2563eb)]">{verse.number}</span>
                  <span className="min-w-0 flex-1 text-[15px] font-semibold leading-6 text-[var(--bb-text-primary,#111827)]">
                    {cleanVerseText(verse.text)}
                  </span>
                  <span className="shrink-0 text-xs font-black text-[var(--bb-text-muted,#6b7280)]">
                    {isSaved ? "✓ Saved" : savingVerse === verse.number ? "Saving..." : "+ Add"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
