"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { getBookCurrentStep, isChapterUnlocked, isChapterCompleted, getCompletedChapters } from "../../../../lib/readingProgress";
import { supabase } from "../../../../lib/supabaseClient";

const MATTHEW_CHAPTERS = 28; // real chapters 1–28
const CHAPTERS_PER_PAGE = 12;

export default function MatthewPage() {
  // currentChapter is now loaded from readingProgress helper
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterPage, setChapterPage] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  // collapsed or open Louis bubble
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

  // load current step and completed chapters from database
  useEffect(() => {
    async function loadProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const step = await getBookCurrentStep(user.id, "matthew", MATTHEW_CHAPTERS + 1);
        // If using dynamic system, currentChapter represents the next chapter to read (1-29)
        // If step is 0, we start at chapter 1
        setCurrentChapter(step === 0 ? 1 : step);

        // Get completed chapters using the helper
        const completed = await getCompletedChapters(user.id, "matthew");
        setCompletedChapters(completed);
      }
    }
    loadProgress();
  }, []);

  // Calculate finished chapters and progress
  // All chapters from 1 to (currentChapter - 1) are finished, plus any explicitly completed
  const finishedChapters = completedChapters.length;
  const progressPercent = Math.min(100, (finishedChapters / MATTHEW_CHAPTERS) * 100);

  // chapter pagination - only show chapters 1-28 (no overview)
  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapterCount = Math.min(
    CHAPTERS_PER_PAGE,
    MATTHEW_CHAPTERS - chapterStartIndex
  );
  const visibleChapters = Array.from(
    { length: visibleChapterCount },
    (_, i) => chapterStartIndex + i + 1 // Start from chapter 1, not 0
  );
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage =
    chapterStartIndex + CHAPTERS_PER_PAGE < MATTHEW_CHAPTERS;

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
                // Use completedChapters array to determine state
                const unlocked = completedChapters.includes(chapter - 1) || chapter === 1 || chapter <= currentChapter;
                const done = completedChapters.includes(chapter);
                const current = chapter === currentChapter && !done;

                let stateClasses =
                  "bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default";

                if (done) {
                  stateClasses =
                    "bg-green-100 border-green-300 text-green-800 cursor-pointer";
                } else if (current) {
                  stateClasses =
                    "bg-blue-100 border-blue-300 text-blue-800 cursor-pointer";
                }

                // label and description (no overview, only chapters 1-28)
                const title = `Matthew ${chapter}`;
                const description = done
                  ? "Finished."
                  : current
                  ? "This is your next chapter."
                  : "Locked until you finish the previous chapter.";

                const content = (
                  <>
                    <p className="font-semibold">{title}</p>
                    <p className="text-[11px] mt-1">{description}</p>
                    {!unlocked && (
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

                // All chapters use dynamic route (no overview)
                const href = `/Bible/matthew/${chapter}`;

                return (
                  <Link
                    key={chapter}
                    href={href}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm block ${stateClasses}`}
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

            <Link
              href="/reading"
              className="text-xs sm:text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Change book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
