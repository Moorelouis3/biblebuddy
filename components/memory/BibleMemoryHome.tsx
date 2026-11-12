"use client";

/**
 * Bible Memory, the third game under Games (2026-11-12).
 *
 * Three views in one screen: the saved verses, the picker that adds one, and
 * a practice session. They are views rather than routes so a session cannot
 * be reloaded half way into a broken state, and Back from the Games tab
 * always lands on the list.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { listMemoryVerses, onMemoryVersesChange, removeMemoryVerse } from "@/lib/bibleMemory";
import { cleanVerseText, formatReference, memoryLabel, type MemoryLabel, type MemoryVerse } from "@/lib/bibleMemoryGames";
import MemoryPractice from "./MemoryPractice";
import MemoryVersePicker from "./MemoryVersePicker";

type View = "list" | "add" | "practice";
type LoadState = "loading" | "ready" | "failed" | "signed-out";

const LABEL_STYLES: Record<MemoryLabel, string> = {
  New: "bg-[#e0e7ff] text-[#3730a3]",
  Practising: "bg-[#fef3c7] text-[#92400e]",
  "Ready for review": "bg-[#dcfce7] text-[#166534]",
};

const primaryButton =
  "rounded-xl bg-[var(--bb-button,#2563eb)] px-5 py-3.5 text-base font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95";
const cardClass = "rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm";

export default function BibleMemoryHome() {
  const [userId, setUserId] = useState<string | null>(null);
  const [verses, setVerses] = useState<MemoryVerse[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [view, setView] = useState<View>("list");
  const [removing, setRemoving] = useState<string | null>(null);
  const [removeFailed, setRemoveFailed] = useState(false);

  const load = useCallback(async (id: string, quiet = false) => {
    if (!quiet) setState("loading");
    try {
      setVerses(await listMemoryVerses(id));
      setState("ready");
    } catch {
      // A failed read is not "no verses saved". Say so and offer another try.
      if (!quiet) setState("failed");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      const id = data.user?.id ?? null;
      setUserId(id);
      if (!id) {
        setState("signed-out");
        return;
      }
      void load(id);
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  // A verse added from the picker (or anywhere else on the page) shows up
  // without a reload.
  useEffect(() => {
    if (!userId) return;
    return onMemoryVersesChange(() => void load(userId, true));
  }, [userId, load]);

  async function remove(verse: MemoryVerse) {
    if (!userId || removing) return;
    if (!window.confirm(`Remove ${formatReference(verse)} from Bible Memory? Its practice progress goes with it.`)) return;
    setRemoving(verse.id);
    setRemoveFailed(false);
    const ok = await removeMemoryVerse(userId, verse.id);
    setRemoving(null);
    if (!ok) setRemoveFailed(true);
  }

  const now = new Date();
  const shell = "mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-28 pt-4";

  if (view === "practice" && userId) {
    return (
      <div className={shell}>
        <MemoryPractice
          userId={userId}
          verses={verses}
          onFinished={() => void load(userId, true)}
          onExit={() => {
            setView("list");
            void load(userId, true);
          }}
        />
      </div>
    );
  }

  if (view === "add" && userId) {
    return (
      <div className={shell}>
        <MemoryVersePicker userId={userId} saved={verses} onAdded={() => void load(userId, true)} onClose={() => setView("list")} />
      </div>
    );
  }

  return (
    <div className={shell}>
      <header>
        <Link href="/bible-study-games" className="text-sm font-bold text-[var(--bb-text-muted,#6b7280)]">
          ← Games
        </Link>
        <h1 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#111827)]">Bible Memory</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Save a verse, then practise it a few minutes at a time.
        </p>
      </header>

      {state === "loading" ? (
        <p className="py-10 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Loading your verses...</p>
      ) : null}

      {state === "signed-out" ? (
        <div className={cardClass}>
          <p className="text-base font-bold text-[var(--bb-text-primary,#111827)]">Sign in to save verses and keep your progress.</p>
          <Link href="/login?next=/bible-study-games/memory" className={`${primaryButton} mt-4 inline-block`} style={{ color: "var(--bb-button-text,#ffffff)" }}>
            Sign in
          </Link>
        </div>
      ) : null}

      {state === "failed" ? (
        <div className={`${cardClass} text-center`}>
          <p className="text-base font-bold text-[var(--bb-text-primary,#111827)]">Your verses did not load.</p>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            They are still saved. Check your connection and try again.
          </p>
          <button type="button" onClick={() => userId && void load(userId)} className={`${primaryButton} mt-4`}>
            Try again
          </button>
        </div>
      ) : null}

      {state === "ready" && verses.length === 0 ? (
        <div className={`${cardClass} text-center`}>
          <p className="text-4xl" aria-hidden="true">
            🧠
          </p>
          <h2 className="mt-3 text-xl font-black text-[var(--bb-text-primary,#111827)]">Add your first verse</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            Pick one here, or tap &ldquo;Add to Bible Memory&rdquo; on the Verse of the Day or on any verse number in the Bible.
          </p>
          <button type="button" onClick={() => setView("add")} className={`${primaryButton} mt-5 w-full`}>
            Choose a verse
          </button>
        </div>
      ) : null}

      {state === "ready" && verses.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => setView("practice")} className={`${primaryButton} flex-1`}>
              Start practice
            </button>
            <button
              type="button"
              onClick={() => setView("add")}
              className="flex-1 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-3.5 text-base font-black text-[var(--bb-text-primary,#111827)]"
            >
              + Add a verse
            </button>
          </div>
          <p className="text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Five quick questions. Verses you find hard come back sooner.
          </p>

          {removeFailed ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              That verse was not removed. Check your connection and try again.
            </p>
          ) : null}

          <h2 className="mt-2 text-sm font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
            My verses ({verses.length})
          </h2>
          <ul className="flex flex-col gap-3">
            {verses.map((verse) => {
              const label = memoryLabel(verse, now);
              return (
                <li key={verse.id} className={cardClass}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">
                      {formatReference(verse)}{" "}
                      <span className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{verse.translation}</span>
                    </p>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${LABEL_STYLES[label]}`}>{label}</span>
                  </div>
                  <p className="mt-2 font-serif text-[15px] font-semibold leading-6 text-[var(--bb-text-secondary,#374151)]">
                    {cleanVerseText(verse.verse_text)}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
                      {verse.last_practised_at
                        ? `${verse.correct_count} right · ${verse.mistake_count} to review`
                        : "Not practised yet"}
                    </p>
                    <button
                      type="button"
                      onClick={() => void remove(verse)}
                      disabled={removing === verse.id}
                      className="text-xs font-black text-[var(--bb-text-muted,#6b7280)] underline disabled:opacity-50"
                    >
                      {removing === verse.id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
