"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { supabase } from "@/lib/supabaseClient";
import type { TriviaBookPack } from "@/lib/triviaGameData";

type TriviaBookClientProps = {
  book: TriviaBookPack;
};

export default function TriviaBookClient({ book }: TriviaBookClientProps) {
  const CHAPTERS_PER_PAGE = 12;
  const [completedCount, setCompletedCount] = useState(0);
  const [playedCounts, setPlayedCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [chapterPage, setChapterPage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("trivia_question_progress")
        .select("book, question_id, is_correct")
        .eq("user_id", user.id);

      if (cancelled) {
        return;
      }

      if (error) {
        console.error("Error fetching trivia chapter progress:", error);
        setLoading(false);
        return;
      }

      const chapterCorrect = new Map<string, Set<string>>();
      data?.forEach((entry) => {
        if (!entry.book.startsWith(`${book.key}:`) || !entry.is_correct) {
          return;
        }

        if (!chapterCorrect.has(entry.book)) {
          chapterCorrect.set(entry.book, new Set());
        }

        chapterCorrect.get(entry.book)?.add(entry.question_id);
      });

      const nextPlayedCounts: Record<string, number> = {};
      let nextCompletedCount = 0;

      book.chapters.forEach((chapter) => {
        const answeredCorrectly = chapterCorrect.get(chapter.progressKey)?.size ?? 0;
        nextPlayedCounts[chapter.progressKey] = answeredCorrectly;
        if (answeredCorrectly >= chapter.questions.length) {
          nextCompletedCount += 1;
        }
      });

      setPlayedCounts(nextPlayedCounts);
      setCompletedCount(nextCompletedCount);
      setLoading(false);
    }

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [book]);

  const completionPercent = useMemo(() => {
    if (!book.chapters.length) {
      return 0;
    }

    return Math.round((completedCount / book.chapters.length) * 100);
  }, [book.chapters.length, completedCount]);

  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapters = book.chapters.slice(chapterStartIndex, chapterStartIndex + CHAPTERS_PER_PAGE);
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage = chapterStartIndex + CHAPTERS_PER_PAGE < book.chapters.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-1">The {book.name}</h1>
        <p className="text-gray-700 mb-4">Play trivia chapter by chapter through {book.name}.</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={48} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p>Pick a chapter and I&apos;ll give you five trivia questions from it.</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress in {book.name} Trivia</span>
              <span>
                {loading ? "Loading..." : `${completionPercent}% (${completedCount} / ${book.chapters.length} chapters complete)`}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {visibleChapters.map((chapter) => {
                const answeredCorrectly = playedCounts[chapter.progressKey] ?? 0;
                const isComplete = answeredCorrectly >= chapter.questions.length;
                const cardClasses = isComplete
                  ? "bg-green-100 border-green-300 text-green-800 cursor-pointer"
                  : "bg-gray-100 border-gray-300 text-gray-500 cursor-pointer";

                return (
                  <Link
                    key={chapter.progressKey}
                    href={`/bible-trivia/${book.routeSlug}/${chapter.chapter}`}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm block ${cardClasses}`}
                  >
                    <p className="font-semibold">{book.name} {chapter.chapter}</p>
                    <p className="text-[11px] mt-1">
                      {loading
                        ? "Loading..."
                        : isComplete
                          ? `Finished - ${answeredCorrectly}/${chapter.questions.length} correct`
                          : `5 questions in this chapter.`}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-blue-600">
              <button
                type="button"
                onClick={() => hasPrevChapterPage && setChapterPage((current) => current - 1)}
                disabled={!hasPrevChapterPage}
                className={`hover:underline ${!hasPrevChapterPage ? "text-gray-300 cursor-default" : ""}`}
              >
                Previous chapters
              </button>

              <Link href="/bible-trivia" className="hover:underline">
                Change category
              </Link>

              <button
                type="button"
                onClick={() => hasNextChapterPage && setChapterPage((current) => current + 1)}
                disabled={!hasNextChapterPage}
                className={`hover:underline ${!hasNextChapterPage ? "text-gray-300 cursor-default" : ""}`}
              >
                Next chapters
              </button>
            </div>

            <Link href="/bible-trivia/books" className="text-xs sm:text-sm text-blue-600 hover:underline mt-1 inline-block">
              Change book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
