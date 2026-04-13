"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import UpgradeRequiredModal from "@/components/UpgradeRequiredModal";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import {
  BIBLE_GAME_BOOKS,
  BIBLE_GAME_ITEMS_PER_PAGE,
  FREE_TRIVIA_BOOK_KEYS,
} from "@/lib/bibleStudyGameCatalog";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { supabase } from "@/lib/supabaseClient";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "@/lib/triviaCatalog";

const CHAPTER_BASED_TOTALS: Record<string, number> = Object.fromEntries(
  CHAPTER_BASED_TRIVIA_BOOK_CONFIG.map((book) => [book.key, book.chapters * 5]),
);

const BOOK_TOTALS: Record<string, number> = Object.fromEntries(
  BIBLE_GAME_BOOKS.map((book) => [book.key, CHAPTER_BASED_TOTALS[book.key] ?? (book.key === "ruth" ? 50 : 100)]),
);

export default function BooksOfTheBiblePage() {
  const [progress, setProgress] = useState<Record<string, number>>(BOOK_TOTALS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return BIBLE_GAME_BOOKS;
    return BIBLE_GAME_BOOKS.filter((book) => book.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const startIndex = page * BIBLE_GAME_ITEMS_PER_PAGE;
  const visibleBooks = filteredBooks.slice(startIndex, startIndex + BIBLE_GAME_ITEMS_PER_PAGE);
  const hasPrevPage = page > 0;
  const hasNextPage = startIndex + BIBLE_GAME_ITEMS_PER_PAGE < filteredBooks.length;

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsPaid(false);
        setLoading(false);
        return;
      }

      setUserId(user.id);
      const meta: any = user.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          null
      );

      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("is_paid")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsPaid(!!profileStats?.is_paid);

      const [{ data: progressData, error: progressError }, { data: completionData, error: completionError }] = await Promise.all([
        supabase
          .from("trivia_question_progress")
          .select("book, is_correct")
          .eq("user_id", user.id),
        supabase
          .from("master_actions")
          .select("action_label")
          .eq("user_id", user.id)
          .eq("action_type", ACTION_TYPE.trivia_chapter_completed),
      ]);

      if (progressError || completionError) {
        console.error("Error fetching trivia progress:", progressError || completionError);
        setLoading(false);
        return;
      }

      const correctCounts: Record<string, number> = {};
      progressData?.forEach((entry) => {
        if (!entry.is_correct) {
          return;
        }

        const matchingChapterBook = CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((book) => entry.book.startsWith(`${book.key}:`));
        if (matchingChapterBook) {
          correctCounts[matchingChapterBook.key] = (correctCounts[matchingChapterBook.key] || 0) + 1;
          return;
        }

        if (entry.book in BOOK_TOTALS) {
          correctCounts[entry.book] = (correctCounts[entry.book] || 0) + 1;
        }
      });

      const completedChaptersByBook: Record<string, Set<number>> = {};
      completionData?.forEach((entry) => {
        const label = typeof entry.action_label === "string" ? entry.action_label : "";
        const matchingBook = BIBLE_GAME_BOOKS.find((book) => label.toLowerCase().startsWith(`${book.title.toLowerCase()} `));
        if (!matchingBook) {
          return;
        }

        const remainder = label.slice(matchingBook.title.length).trim();
        const chapterMatch = remainder.match(/^(\d+)\b/);
        if (!chapterMatch) {
          return;
        }

        if (!completedChaptersByBook[matchingBook.key]) {
          completedChaptersByBook[matchingBook.key] = new Set<number>();
        }

        completedChaptersByBook[matchingBook.key].add(Number(chapterMatch[1]));
      });

      const nextProgress = Object.fromEntries(
        BIBLE_GAME_BOOKS.map((book) => {
          const chapterBasedTotal = CHAPTER_BASED_TOTALS[book.key];
          const completedChapters = completedChaptersByBook[book.key]?.size ?? 0;
          const effectiveCorrectCount = chapterBasedTotal
            ? Math.max(correctCounts[book.key] || 0, completedChapters * 5)
            : (correctCounts[book.key] || 0);

          return [book.key, Math.max(0, (BOOK_TOTALS[book.key] ?? 100) - effectiveCorrectCount)];
        }),
      );

      setProgress(nextProgress);
      setLoading(false);
    }

    fetchProgress();
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.trivia_category_opened,
      actionLabel: "Books of the Bible page",
      dedupeKey: "trivia-books-page-viewed",
    }).catch((error) => console.error("[NAV] Failed to track trivia books page view:", error));
  }, [userId, username]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Books of the Bible</h1>
        <p className="text-gray-700 mb-4">Trivia based on the books of the Bible</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">Pick a book of the Bible and test what you remember from it.</p>
              <p>Genesis through Revelation are fully chapter based with five real questions in each chapter pack.</p>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mt-2 md:grid-cols-4">
              {visibleBooks.map((book) => {
                const isLocked = isPaid === false && !FREE_TRIVIA_BOOK_KEYS.has(book.key);
                const label = loading
                  ? "Loading..."
                  : `${progress[book.key] ?? BOOK_TOTALS[book.key] ?? 100} questions remaining`;

                const content = (
                  <>
                    <p className="font-semibold">{book.title}</p>
                    <p className="mt-1 text-[11px]">{label}</p>
                    {isLocked ? (
                      <div className="absolute inset-0 flex items-end justify-center rounded-xl bg-black/45 pb-3">
                        <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white">Pro Users Only</span>
                      </div>
                    ) : null}
                  </>
                );

                if (isLocked) {
                  return (
                    <button
                      key={book.key}
                      type="button"
                      onClick={() => setShowUpgradeModal(true)}
                      className="relative rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm shadow-sm transition"
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={book.key}
                    href={book.triviaHref}
                    onClick={() => {
                      if (!userId) return;
                      void trackNavigationActionOnce({
                        userId,
                        username,
                        actionType: ACTION_TYPE.trivia_pack_opened,
                        actionLabel: book.title,
                        dedupeKey: `trivia-pack:${book.key}`,
                      }).catch((error) => console.error("[NAV] Failed to track trivia pack click:", error));
                    }}
                    className="relative rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm shadow-sm transition hover:scale-[1.01] hover:shadow-md"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => hasPrevPage && setPage((current) => current - 1)}
                disabled={!hasPrevPage}
                className={`text-blue-600 hover:underline ${!hasPrevPage ? "cursor-default text-gray-300" : ""}`}
              >
                Previous books
              </button>

              <Link href="/bible-trivia" className="text-blue-600 hover:underline">
                Change category
              </Link>

              <button
                type="button"
                onClick={() => hasNextPage && setPage((current) => current + 1)}
                disabled={!hasNextPage}
                className={`text-blue-600 hover:underline ${!hasNextPage ? "cursor-default text-gray-300" : ""}`}
              >
                Next books
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpgradeRequiredModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
}
