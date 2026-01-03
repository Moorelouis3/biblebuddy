"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { getBookCurrentStep, isChapterUnlocked, isChapterCompleted, getCompletedChapters, getBookTotalChapters } from "../../../../lib/readingProgress";
import { supabase } from "../../../../lib/supabaseClient";

const CHAPTERS_PER_PAGE = 12;

// Book descriptions
const BOOK_DESCRIPTIONS: Record<string, string> = {
  matthew: "Proving that Jesus was the true Messiah.",
  mark: "The action-packed Gospel showing Jesus as the Servant.",
  luke: "A detailed account of Jesus's life and ministry.",
  john: "The spiritual Gospel emphasizing Jesus as God.",
  acts: "The birth and growth of the early church.",
  romans: "Paul's letter explaining the gospel of grace.",
};

const BOOK_INTROS: Record<string, string> = {
  matthew: "Matthew is the best place to begin because you meet Jesus right away. He shows a Jewish audience living under Roman pressure that Jesus is the promised King and Savior. Start with the Matthew overview, then we will walk through the chapters together.",
  mark: "Mark's Gospel moves fast and shows Jesus as the Servant who came to serve and give His life. Every chapter is packed with action and purpose.",
  luke: "Luke gives us the most complete picture of Jesus's life, carefully researched and beautifully told. You'll see Jesus's compassion for all people.",
  john: "John focuses on who Jesus really is - God in the flesh. This Gospel goes deep into the spiritual meaning of Jesus's words and works.",
  acts: "Watch as the church explodes from Jerusalem to the ends of the earth. See how the Holy Spirit empowered ordinary people to do extraordinary things.",
  romans: "This letter explains the heart of the gospel - how we're saved by faith, not by works. It's foundational for understanding Christianity.",
};

export default function BookPage() {
  const params = useParams();
  const bookParam = String(params.book);
  const bookKey = bookParam.toLowerCase();
  
  // Get book display name (capitalize first letter of each word)
  const bookDisplayName = bookParam
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const totalChapters = getBookTotalChapters(bookDisplayName);

  // currentChapter is now loaded from database
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterPage, setChapterPage] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // collapsed or open Louis bubble
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

  // Get user ID
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // load current step and completed chapters from database
  useEffect(() => {
    async function loadProgress() {
      if (!userId) return;

      try {
        setLoading(true);

        const step = await getBookCurrentStep(userId, bookKey, totalChapters);
        setCurrentChapter(step === 0 ? 1 : step);

        const completed = await getCompletedChapters(userId, bookKey);
        setCompletedChapters(completed);
      } catch (err) {
        console.error("Error loading progress:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadProgress();
    }
  }, [userId, bookKey, totalChapters]);

  // Calculate finished chapters and progress
  // All chapters from 1 to (currentChapter - 1) are finished, plus any explicitly completed
  const finishedChapters = completedChapters.length;
  const progressPercent = Math.min(100, (finishedChapters / totalChapters) * 100);

  // chapter pagination - only show chapters 1-totalChapters
  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapterCount = Math.min(
    CHAPTERS_PER_PAGE,
    totalChapters - chapterStartIndex
  );
  const visibleChapters = Array.from(
    { length: visibleChapterCount },
    (_, i) => chapterStartIndex + i + 1 // Start from chapter 1, not 0
  );
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage =
    chapterStartIndex + CHAPTERS_PER_PAGE < totalChapters;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The {bookDisplayName}</h1>
        <p className="text-gray-700 mb-4">
          {BOOK_DESCRIPTIONS[bookKey] || "Walk through this book chapter by chapter."}
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
                <p className="text-sm">{bookDisplayName} overview</p>
              ) : (
                <div className="space-y-3">
                  <p>
                    {BOOK_INTROS[bookKey] || `Let's walk through ${bookDisplayName} together, one chapter at a time.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress in {bookDisplayName}</span>
              <span>
                {progressPercent.toFixed(0)}% ({finishedChapters} /{" "}
                {totalChapters} chapters finished)
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
                // Use completedChapters array (already loaded from database)
                const unlocked = chapter === 1 || completedChapters.includes(chapter - 1) || chapter <= currentChapter;
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

                // label and description (no overview, only chapters 1-totalChapters)
                const title = `${bookDisplayName} ${chapter}`;
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

                // All chapters use dynamic route
                const href = `/Bible/${bookKey}/${chapter}`;

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
