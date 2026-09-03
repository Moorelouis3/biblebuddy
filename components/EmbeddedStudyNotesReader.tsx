"use client";

/**
 * The real Bible reader, embedded (2026-09-03).
 *
 * Bible in One Year Study Notes used to be a separate stack of summary
 * cards. Louis's approved design replaces them with the actual Scripture
 * for the day's assigned chapters, read exactly like the main Bible:
 * same KJV text, same Study Mode underlines, same tappable phrases, same
 * inline Insight Card explanations - because it IS the same code
 * (VerseHighlighter) fed by the same loaders ChapterInsightReader uses.
 * Nothing here duplicates Scripture or notes; update a chapter's notes and
 * both readers change together.
 *
 * Deliberately absent, per the spec: book/chapter menus, the translation
 * dropdown (this reader is KJV-only, the notes are cut from KJV text),
 * audio transport, and the Trivia/Scrambled tabs. Just chapter tabs,
 * Study Mode, and the Scripture.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { VerseHighlighter } from "./VerseHighlighter";
import { getBundledChapter } from "../lib/bundledChapterText";
import { deriveInsightCards, loadInsightCards, type InsightCardPhrase } from "../lib/insightCards";
import { fetchStaticJson, kjvStaticUrl, studyNotesStaticUrl } from "../lib/chapterStaticData";
import type { BibleReaderStudySection } from "../lib/bibleReaderStudyNotes";

type Verse = { number: number; text: string };

export type EmbeddedChapterRef = { book: string; chapter: number };

type ChapterData = {
  loading: boolean;
  verses: Verse[];
  insightPhrases: InsightCardPhrase[];
  studySections?: BibleReaderStudySection[];
};

function displayBook(book: string) {
  return book
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function chapterKey(ref: EmbeddedChapterRef) {
  return `${ref.book.toLowerCase()}|${ref.chapter}`;
}

export default function EmbeddedStudyNotesReader({
  chapters,
  onFirstInteraction,
}: {
  /** The day's assigned chapters, straight from the plan configuration. */
  chapters: EmbeddedChapterRef[];
  /** Fired once, on the first tap inside the Scripture - the day view uses
      it to mark the Study Notes task complete. */
  onFirstInteraction?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataByKey, setDataByKey] = useState<Record<string, ChapterData>>({});
  const [studyModeOn, setStudyModeOn] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollPositions = useRef<Record<string, number>>({});
  const interactedRef = useRef(false);

  const active = chapters[Math.min(activeIndex, chapters.length - 1)] ?? chapters[0];
  const activeKey = active ? chapterKey(active) : "";
  const activeData = activeKey ? dataByKey[activeKey] : undefined;

  // Load the active chapter with the exact same fallbacks the main reader
  // uses: bundled verses, then the static KJV file, then the live API; the
  // hand-built phrase map when one exists, otherwise the phrase map derived
  // from the chapter's own notes and its KJV text.
  useEffect(() => {
    if (!active || dataByKey[activeKey]) return;
    let cancelled = false;
    setDataByKey((current) => ({
      ...current,
      [activeKey]: { loading: true, verses: [], insightPhrases: [] },
    }));

    void (async () => {
      const book = active.book.toLowerCase();
      let verses: Verse[] = getBundledChapter(book, active.chapter);
      if (!verses.length) {
        verses = (await fetchStaticJson<Verse[]>(kjvStaticUrl(book, active.chapter))) ?? [];
      }
      if (!verses.length) {
        try {
          const reference = `${book.replace(/\s+/g, "+")}+${active.chapter}`;
          const response = await fetch(`https://bible-api.com/${reference}?translation=kjv`);
          if (response.ok) {
            const data = (await response.json()) as { verses?: Array<{ verse: number; text: string }> };
            verses = (data.verses || []).map((v) => ({ number: v.verse, text: v.text.trim() }));
          }
        } catch {
          // Falls through to the empty state below.
        }
      }
      if (cancelled) return;

      let insightPhrases = await loadInsightCards(book, active.chapter);
      let studySections: BibleReaderStudySection[] | undefined;
      if (!insightPhrases.length) {
        const cached = await fetchStaticJson<{ sections?: BibleReaderStudySection[] }>(
          studyNotesStaticUrl(book, active.chapter),
        );
        if (Array.isArray(cached?.sections)) {
          studySections = cached.sections;
        } else {
          try {
            const response = await fetch(
              `/api/study-notes?book=${encodeURIComponent(book)}&chapter=${active.chapter}`,
            );
            const data = (await response.json()) as { sections?: BibleReaderStudySection[] };
            studySections = Array.isArray(data.sections) ? data.sections : [];
          } catch {
            studySections = [];
          }
        }
        if (studySections?.length && verses.length) {
          insightPhrases = deriveInsightCards(studySections, verses);
        }
      }
      if (cancelled) return;

      setDataByKey((current) => ({
        ...current,
        [activeKey]: { loading: false, verses, insightPhrases, studySections },
      }));
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  // Switching chapters: restore that chapter's reading position (top on the
  // first visit), per the spec.
  useEffect(() => {
    const panel = scrollRef.current;
    if (!panel) return;
    panel.scrollTop = scrollPositions.current[activeKey] ?? 0;
  }, [activeKey, activeData?.loading]);

  const tabs = useMemo(
    () => chapters.map((ref) => ({ ref, key: chapterKey(ref), label: `${displayBook(ref.book)} ${ref.chapter}` })),
    [chapters],
  );

  if (!active) return null;

  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--bb-card-border,#dbe7f4)] bg-white">
      {/* Chapter tabs + a static KJV label - no dropdowns in here */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--bb-card-border,#dbe7f4)] px-3 pt-1">
        <div
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Assigned chapters"
        >
          {tabs.map((tab, index) => {
            const isActive = index === Math.min(activeIndex, chapters.length - 1);
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  const panel = scrollRef.current;
                  if (panel) scrollPositions.current[activeKey] = panel.scrollTop;
                  setActiveIndex(index);
                }}
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-black transition ${
                  isActive
                    ? "border-[var(--bb-accent,#2f7fe8)] text-[var(--bb-accent,#2f7fe8)]"
                    : "border-transparent text-[var(--bb-text-muted,#6b7280)] hover:text-[var(--bb-text-primary,#111827)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span className="shrink-0 rounded-lg border border-[var(--bb-card-border,#dbe7f4)] px-2.5 py-1 text-xs font-black text-[var(--bb-text-secondary,#4b5563)]">
          KJV
        </span>
      </div>

      {/* The same Study Mode switch the main reader carries */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#dbe7f4)] px-4 py-2">
        <span className="flex min-w-0 items-center gap-2">
          <span className="text-base leading-none" aria-hidden="true">📖</span>
          <span className="min-w-0">
            <span className="block text-sm font-black leading-5 text-[var(--bb-text-primary,#111827)]">Study Mode</span>
            <span className="block truncate text-xs font-semibold leading-4 text-[var(--bb-text-muted,#6b7280)]">
              {studyModeOn ? "Every note is listed under its verse." : "Tap underlined words to explore"}
            </span>
          </span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={studyModeOn}
          aria-label="Study Mode"
          onClick={() => setStudyModeOn((on) => !on)}
          className={`relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors ${
            studyModeOn ? "bg-[var(--bb-accent,#2f7fe8)]" : "bg-slate-300"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform ${
              studyModeOn ? "translate-x-[20px]" : ""
            }`}
          />
        </button>
      </div>

      {/* The Scripture panel: its own contained scroll, so a five-chapter day
          never makes the lesson page a mile long. */}
      <div
        ref={scrollRef}
        onScroll={(event) => {
          scrollPositions.current[activeKey] = event.currentTarget.scrollTop;
        }}
        onClickCapture={() => {
          if (interactedRef.current) return;
          interactedRef.current = true;
          onFirstInteraction?.();
        }}
        className="max-h-[62vh] overflow-y-auto overscroll-contain px-3 py-3 sm:max-h-[560px] sm:px-4"
      >
        {activeData && !activeData.loading && activeData.verses.length ? (
          <VerseHighlighter
            book={displayBook(active.book)}
            chapter={active.chapter}
            verses={activeData.verses}
            insightPhrases={activeData.insightPhrases}
            studySections={activeData.studySections}
            studyModeOn={studyModeOn}
            onStudyModeChange={setStudyModeOn}
            hideStudyModeHeader
          />
        ) : activeData && !activeData.loading ? (
          <p className="px-2 py-8 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Could not load {displayBook(active.book)} {active.chapter}. Check your connection and try again.
          </p>
        ) : (
          <div className="grid gap-3 px-2 py-4">
            {[0, 1, 2, 3, 4].map((line) => (
              <div key={line} className="h-4 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
