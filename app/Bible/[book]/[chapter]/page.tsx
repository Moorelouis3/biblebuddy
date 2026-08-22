"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { hasInsightCards } from "../../../../lib/insightCards";
import type { BibleReaderStudySection } from "../../../../lib/bibleReaderStudyNotes";

/**
 * Chapter route.
 *
 * This page is deliberately tiny. It picks a reader and nothing else.
 *
 * Genesis 1 is the standard. Every chapter that has study notes gets the same
 * Insight Card reader: chapters with a hand-built phrase map straight away,
 * every other chapter with notes after one small fetch of its sections (the
 * reader derives the phrase map from them). Only a chapter with no notes at
 * all falls back to the full reader.
 *
 * The full reader carries what every chapter in the Bible might need: study
 * note popups, featured characters, level ups, the daily checklist, Bible
 * Year deep study. One of those paths reaches the whole-Bible study notes,
 * which the bundler emits as a 33 MB JavaScript chunk. Splitting the readers
 * here keeps that chunk out of the Insight Card reader entirely.
 */

const ChapterInsightReader = dynamic(() => import("../../../../components/ChapterInsightReader"), {
  ssr: false,
  loading: () => <ChapterLoadingShell />,
});

const FullChapterReader = dynamic(() => import("../../../../components/FullChapterReader"), {
  ssr: false,
  loading: () => <ChapterLoadingShell />,
});

function ChapterLoadingShell() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-2" aria-busy="true">
      <span className="sr-only">Loading chapter</span>
    </div>
  );
}

type ReaderChoice =
  | { kind: "pending" }
  | { kind: "insight"; sections: BibleReaderStudySection[] | null }
  | { kind: "full" };

export default function ChapterPage() {
  const params = useParams();
  const book = decodeURIComponent(String(params.book || "")).trim().toLowerCase();
  const chapter = Number(params.chapter);
  const hasMap = hasInsightCards(book, chapter);

  const [choice, setChoice] = useState<ReaderChoice>(() =>
    hasMap ? { kind: "insight", sections: null } : { kind: "pending" },
  );

  useEffect(() => {
    if (hasMap) {
      setChoice({ kind: "insight", sections: null });
      return;
    }
    let cancelled = false;
    setChoice({ kind: "pending" });
    void (async () => {
      try {
        const response = await fetch(`/api/study-notes?book=${encodeURIComponent(book)}&chapter=${chapter}`);
        const data = (await response.json()) as { sections?: BibleReaderStudySection[] };
        const sections = Array.isArray(data.sections) ? data.sections : [];
        if (cancelled) return;
        setChoice(sections.length ? { kind: "insight", sections } : { kind: "full" });
      } catch {
        if (!cancelled) setChoice({ kind: "full" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book, chapter, hasMap]);

  if (choice.kind === "pending") return <ChapterLoadingShell />;
  if (choice.kind === "insight") {
    return <ChapterInsightReader book={book} chapter={chapter} initialSections={choice.sections ?? undefined} />;
  }
  return <FullChapterReader />;
}
