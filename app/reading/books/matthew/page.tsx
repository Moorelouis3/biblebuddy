"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { getMatthewCurrentStep } from "../../../../lib/readingProgress";

const MATTHEW_CHAPTERS = 28; // real chapters 1–28
const CHAPTERS_PER_PAGE = 12;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

export default function MatthewPage() {
  // currentChapter is now loaded from readingProgress helper
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapterPage, setChapterPage] = useState(0);

  // collapsed or open Louis bubble
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

  // load current step from localStorage (via helper)
  useEffect(() => {
    const step = getMatthewCurrentStep(TOTAL_ITEMS);
    setCurrentChapter(step);
  }, []);

  // how many chapters you have finished, not counting the overview
  const finishedChapters = Math.max(0, currentChapter - 1);
  const progressPercent =
    (finishedChapters / MATTHEW_CHAPTERS) * 100;

  // chapter pagination
  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapterCount = Math.min(
    CHAPTERS_PER_PAGE,
    TOTAL_ITEMS - chapterStartIndex
  );
  const visibleChapters = Array.from(
    { length: visibleChapterCount },
    (_, i) => chapterStartIndex + i
  );
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage =
    chapterStartIndex + CHAPTERS_PER_PAGE < TOTAL_ITEMS;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The Gospel of Matthew</h1>
        <p className="text-gray-700 mb-4">
          Proving that Jesus was the true Messiah.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          {/* LOUIS SUMMARY BUBBLE */}
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={48} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              {/* speech bubble tail */}
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />

              {/* content */}
              {summaryCollapsed ? (
                <p className="text-sm">Matthew overview</p>
              ) : (
                <div className="space-y-3">
                  <p>
Matthew is the best place to begin because you meet Jesus right away.
He shows a Jewish audience living under Roman pressure that Jesus is the promised King and Savior.
Start with the Matthew overview, then we will walk through the chapters together.
                  </p>

                  
                </div>
              )}

  
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress in Matthew</span>
              <span>
                {progressPercent.toFixed(0)}% ({finishedChapters} /{" "}
                {MATTHEW_CHAPTERS} chapters finished)
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* CHAPTER GRID */}
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {visibleChapters.map((chapter) => {
                const unlocked = chapter <= currentChapter;
                const done = chapter < currentChapter;
                const current = chapter === currentChapter;

                let stateClasses =
                  "bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default";

                if (done) {
                  stateClasses =
                    "bg-green-100 border-green-300 text-green-800 cursor-pointer";
                } else if (current) {
                  stateClasses =
                    "bg-blue-100 border-blue-300 text-blue-800 cursor-pointer";
                }

                // label and description
                let title = `Matthew ${chapter}`;
                let description = "";

                if (chapter === 0) {
                  title = "Matthew overview";
                  description = current
                    ? "Start here. This is your first step."
                    : done
                    ? "Finished. You can move on to Matthew 1."
                    : "Locked until you start this path.";
                } else {
                  description = done
                    ? "Finished."
                    : current
                    ? "This is your next chapter."
                    : "Locked until you finish the previous chapter.";
                }

                const content = (
                  <>
                    <p className="font-semibold">{title}</p>
                    <p className="text-[11px] mt-1">{description}</p>
                    {chapter > 0 && !unlocked && (
                      <div className="absolute right-2 top-2 text-black/70">
                        🔒
                      </div>
                    )}
                  </>
                );

                if (!unlocked) {
                  return (
                    <div
                      key={chapter}
                      className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm ${stateClasses}`}
                    >
                      {content}
                    </div>
                  );
                }

                // links: overview has its own page, chapters use chapter1, chapter2, etc.
                const href =
                  chapter === 0
                    ? "/reading/books/matthew/chapters/overview"
                    : `/reading/books/matthew/chapters/chapter${chapter}`;

                return (
                  <Link
                    key={chapter}
                    href={href}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm ${stateClasses}`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            {/* chapter pagination and bottom nav */}
            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-blue-600">
              <button
                type="button"
                onClick={() =>
                  hasPrevChapterPage && setChapterPage((p) => p - 1)
                }
                disabled={!hasPrevChapterPage}
                className={`hover:underline ${
                  !hasPrevChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Previous chapters
              </button>

              <Link href="/dashboard" className="hover:underline">
                Home
              </Link>

              <button
                type="button"
                onClick={() =>
                  hasNextChapterPage && setChapterPage((p) => p + 1)
                }
                disabled={!hasNextChapterPage}
                className={`hover:underline ${
                  !hasNextChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Next chapters
              </button>
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = "/reading")}
              className="text-xs sm:text-sm text-blue-600 hover:underline mt-1"
            >
              Change book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
