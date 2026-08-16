"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

/**
 * Chapter route.
 *
 * This page is deliberately tiny. It picks a reader and nothing else.
 *
 * The full reader carries what every chapter in the Bible might need: study
 * note popups, featured characters, level ups, the daily checklist, Bible
 * Year deep study. One of those paths reaches the whole-Bible study notes,
 * which the bundler emits as a 33 MB JavaScript chunk. Genesis 1 uses none
 * of it, but while both readers lived in one file it had to download all of
 * it before a verse could appear.
 *
 * Splitting them here puts each reader in its own chunk, so Genesis 1 fetches
 * only the code it actually uses.
 */

const GenesisOneReader = dynamic(() => import("../../../../components/GenesisOneReader"), {
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

  if (book === "genesis" && chapter === 1) return <GenesisOneReader />;
  return <FullChapterReader />;
}
