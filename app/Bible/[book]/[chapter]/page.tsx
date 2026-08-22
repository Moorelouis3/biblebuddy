"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { hasInsightCards } from "../../../../lib/insightCards";
import { hasStudyNotes } from "../../../../lib/chaptersWithNotes.generated";

/**
 * Chapter route.
 *
 * This page is deliberately tiny. It picks a reader and nothing else, and it
 * does so synchronously, from two small lookups, so no request stands between
 * the URL and the first verse.
 *
 * Genesis 1 is the standard. Every chapter that has study notes gets the same
 * Insight Card reader: chapters with a hand-built phrase map use it, every
 * other chapter derives its map from its notes (served as static JSON). Only
 * a chapter with no notes at all falls back to the full reader.
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

export default function ChapterPage() {
  const params = useParams();
  const book = decodeURIComponent(String(params.book || "")).trim().toLowerCase();
  const chapter = Number(params.chapter);

  if (hasInsightCards(book, chapter) || hasStudyNotes(book, chapter)) {
    return <ChapterInsightReader book={book} chapter={chapter} />;
  }
  return <FullChapterReader />;
}
