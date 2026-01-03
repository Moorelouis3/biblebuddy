"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import { isBookUnlocked, isBookComplete, getCurrentBook, getCompletedChapters } from "../../lib/readingProgress";
import { supabase } from "../../lib/supabaseClient";

const BOOKS = [
  // Gospels & Acts
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  // Law (Torah)
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  // History
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  // Wisdom & Poetry
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  // Major Prophets
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  // Minor Prophets
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  // Paul's Letters
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  // General Epistles
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  // Revelation
  "Revelation",
];

const BOOKS_PER_PAGE = 12;

// overview + 28 chapters
const MATTHEW_TOTAL_ITEMS = 28 + 1;

export default function ReadingPage() {
  const [bookPage, setBookPage] = useState(0);
  const [currentActiveBook, setCurrentActiveBook] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("buddy");
  const [bookStates, setBookStates] = useState<Record<string, { unlocked: boolean; complete: boolean }>>({});
  const [loading, setLoading] = useState(true);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [stats, setStats] = useState<{
    booksCompleted: number;
    chaptersCompleted: number;
    bibleCompletionPercent: number;
  } | null>(null);

  // book pagination
  const startIndex = bookPage * BOOKS_PER_PAGE;
  const visibleBooks = BOOKS.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  const hasPrevPage = bookPage > 0;
  const hasNextPage = startIndex + BOOKS_PER_PAGE < BOOKS.length;

  // Get user ID and name
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const meta: any = user.user_metadata || {};
        const first =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "friend";
        setUserName(first);
      } else {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // Load book states from database
  useEffect(() => {
    async function loadBookStates() {
      if (!userId) return;

      const startTime = Date.now();
      const minDelay = 3000; // 3 seconds minimum

      try {
        setLoading(true);

        // Get current active book
        const active = await getCurrentBook(userId, BOOKS);
        setCurrentActiveBook(active);

        // Get states for all books
        const states: Record<string, { unlocked: boolean; complete: boolean }> = {};
        for (const book of BOOKS) {
          const unlocked = await isBookUnlocked(userId, book);
          const complete = await isBookComplete(userId, book);
          states[book] = { unlocked, complete };
        }
        setBookStates(states);
      } catch (err) {
        console.error("Error loading book states:", err);
      } finally {
        setLoading(false);
        
        // Hide loading overlay after minimum 3 seconds from start
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDelay - elapsed);
        setTimeout(() => {
          setShowLoadingOverlay(false);
        }, remaining);
      }
    }

    if (userId) {
      loadBookStates();
    }
  }, [userId]);

  // Load stats when modal opens
  useEffect(() => {
    async function loadStats() {
      if (!showStatsModal || !userId) return;

      try {
        // Count completed chapters across all books
        let totalChaptersCompleted = 0;
        let totalBooksCompleted = 0;

        for (const book of BOOKS) {
          const completed = await getCompletedChapters(userId, book);
          totalChaptersCompleted += completed.length;
          
          // Check if book is complete (all chapters done)
          const isComplete = await isBookComplete(userId, book);
          if (isComplete) {
            totalBooksCompleted++;
          }
        }

        const bibleCompletionPercent = (totalChaptersCompleted / 1189) * 100;

        setStats({
          booksCompleted: totalBooksCompleted,
          chaptersCompleted: totalChaptersCompleted,
          bibleCompletionPercent: Math.round(bibleCompletionPercent * 10) / 10, // Round to 1 decimal
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    }

    loadStats();
  }, [showStatsModal, userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-95 z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg font-medium">Loading Your Reading Plan</p>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Bible Reading Plan</h1>
        <p className="text-gray-700 mb-4">
          We walk together one book and one chapter at a time.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* LOUIS TALKING */}
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                This is the Bible Reading Plan section of the app. From here we
                pick one book at a time and walk through it together.
              </p>
              <p>
                We start in <span className="font-semibold">Matthew</span>. All
                the other books stay locked until you finish the current book,
                so nothing feels overwhelming.
              </p>
            </div>
          </div>

          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {visibleBooks.map((book) => {
                const unlocked = bookStates[book]?.unlocked ?? false;
                const isComplete = bookStates[book]?.complete ?? false;
                const isActive = currentActiveBook === book;

                const baseClasses =
                  "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                if (unlocked) {
                  // Create route for any book (e.g., "Mark" -> "/reading/books/mark")
                  const href = `/reading/books/${book.toLowerCase()}`;

                  // Determine styling: active = orange, complete = blue, default = white
                  let cardClasses = "bg-white border-blue-200";
                  if (isActive) {
                    cardClasses = "bg-orange-100 border-orange-300 pulse-active-book";
                  } else if (isComplete) {
                    cardClasses = "bg-blue-100 border-blue-300";
                  }

                  return (
                    <Link
                      key={book}
                      href={href}
                      className={`${baseClasses} block ${cardClasses}`}
                    >
                      <p className="font-semibold">{book}</p>
                      <p className="text-[11px] mt-1">
                        {isActive
                          ? book === "Matthew"
                            ? "Start here with Jesus. This is your first path."
                            : "This is your current book."
                          : isComplete
                          ? "Completed. You've finished this book."
                          : "This book is now unlocked."}
                      </p>
                    </Link>
                  );
                }

                // locked books (no link)
                // Find the previous book in the reading plan order
                const bookIndex = BOOKS.findIndex(b => b === book);
                const previousBook = bookIndex > 0 ? BOOKS[bookIndex - 1] : null;
                const lockedSubtitle = previousBook 
                  ? `Locked until you finish ${previousBook}.`
                  : "Locked.";

                return (
                  <div
                    key={book}
                    className={`${baseClasses} bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default`}
                  >
                    <p className="font-semibold">{book}</p>
                    <p className="text-[11px] mt-1">
                      {lockedSubtitle}
                    </p>
                    <div className="absolute right-2 top-2 text-black/70">
                      🔒
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOOK PAGINATION + HOME */}
            <div className="flex items-center justify-between pt-2 text-xs sm:text-sm text-blue-600">
              <button
                type="button"
                onClick={() => hasPrevPage && setBookPage((p) => p - 1)}
                disabled={!hasPrevPage}
                className={`hover:underline ${
                  !hasPrevPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Previous books
              </button>

              <button
                type="button"
                onClick={() => setShowStatsModal(true)}
                className="hover:underline cursor-pointer"
              >
                📘 Your Bible Study Stats
              </button>

              <button
                type="button"
                onClick={() => hasNextPage && setBookPage((p) => p + 1)}
                disabled={!hasNextPage}
                className={`hover:underline ${
                  !hasNextPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Next books
              </button>
            </div>
          </div>

          {/* animations */}
          <style jsx>{`
            .pulse-active-book {
              animation: pulseScale 1.6s ease-in-out infinite;
              transform-origin: center;
            }

            @keyframes pulseScale {
              0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5);
              }
              40% {
                transform: scale(1.06);
                box-shadow: 0 0 0 14px rgba(249, 115, 22, 0);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
              }
            }
          `}</style>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowStatsModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowStatsModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                📊 {userName}, here's your Bible Study Stats
              </h2>
            </div>

            {/* Stats */}
            {stats ? (
              <div className="space-y-4">
                {/* Books Progress */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">📖 Books completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.booksCompleted} / 66
                  </p>
                </div>

                {/* Chapters Progress */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">📄 Chapters read</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.chaptersCompleted} / 1189
                  </p>
                </div>

                {/* Bible Completion Percentage */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">🔥 Bible completion</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.bibleCompletionPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading stats...</p>
              </div>
            )}

            {/* Close button at bottom */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowStatsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
