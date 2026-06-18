"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { isBookComplete, getCurrentBook, getCompletedChapters, getTotalCompletedChapters } from "../../lib/readingProgress";
import { supabase } from "../../lib/supabaseClient";

// All 66 books of the Bible - standard Bible order (Genesis → Revelation)
const BOOKS = [
  // Old Testament
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
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
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
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
  // New Testament
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
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
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

// overview + 28 chapters
const MATTHEW_TOTAL_ITEMS = 28 + 1;

export default function ReadingPage() {
  const [currentActiveBook, setCurrentActiveBook] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("buddy");
  const [bookStates, setBookStates] = useState<Record<string, { complete: boolean }>>({});
  const [loading, setLoading] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [stats, setStats] = useState<{
    booksCompleted: number;
    chaptersCompleted: number;
    bibleCompletionPercent: number;
  } | null>(null);

  // Apply alphabetical sort if toggle is ON
  const booksToDisplay = alphabeticalOrder
    ? [...BOOKS].sort((a, b) => a.localeCompare(b))
    : BOOKS;

  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Get user ID and name
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
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

  useEffect(() => {
    if (!userId) return;

    void trackNavigationActionOnce({
      userId,
      username: userName,
      actionType: ACTION_TYPE.bible_reader_viewed,
      actionLabel: "The Bible",
      dedupeKey: "bible-reader-viewed",
    }).catch((error) => {
      console.error("[NAV] Failed to track Bible reader view:", error);
    });
  }, [userId, userName]);

  // Load book states from database (background, non-blocking)
  useEffect(() => {
    async function loadBookStates() {
      if (!userId) return;

      try {
        // Get current active book
        const active = await getCurrentBook(userId, BOOKS);
        setCurrentActiveBook(active);

        const completionEntries = await Promise.all(
          BOOKS.map(async (book) => {
            const complete = await isBookComplete(userId, book);
            return [book, { complete }] as const;
          }),
        );
        const states = Object.fromEntries(completionEntries) as Record<string, { complete: boolean }>;
        setBookStates(states);
      } catch (err) {
        console.error("Error loading book states:", err);
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
        // Count completed chapters across all books (using shared function)
        const totalChaptersCompleted = await getTotalCompletedChapters(userId, BOOKS);
        let totalBooksCompleted = 0;

        for (const book of BOOKS) {
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
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">The Bible</h1>
          </div>
          {/* Alphabetical Order Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-700 text-sm">Alphabetical Order</span>
            <div className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                checked={alphabeticalOrder}
                onChange={(e) => {
                  setAlphabeticalOrder(e.target.checked);
                }}
                className="sr-only"
              />
              <div
                className={`block w-10 h-5 rounded-full transition-colors ${
                  alphabeticalOrder ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
              <div
                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                  alphabeticalOrder ? "transform translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {false ? <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                The Bible is 66 books written over more than 1,500 years, telling one connected story of who God is and how He meets us right where we are.
              </p>
              <p>
                This is just God's Word — and I'm here to help you understand it as you read.
              </p>
            </div>
          </div> : null}

          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mt-2">
              {booksToDisplay.map((book) => {
                const isComplete = bookStates[book]?.complete ?? false;
                const baseClasses =
                  "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                const href = `/reading/books/${encodeURIComponent(book.toLowerCase())}`;

                const cardClasses = isComplete
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-gray-100 border-gray-300";

                return (
                  <Link
                    key={book}
                    href={href}
                    onClick={() => {
                      if (!userId) return;

                      void trackNavigationActionOnce({
                        userId,
                        username: userName,
                        actionType: ACTION_TYPE.bible_book_opened,
                        actionLabel: book,
                        dedupeKey: `bible-book-opened:${book.toLowerCase()}`,
                      }).catch((error) => {
                        console.error("[NAV] Failed to track Bible book click:", error);
                      });
                    }}
                    className={`${baseClasses} block ${cardClasses}`}
                  >
                    <p className="font-semibold">{book}</p>
                    <p className={`text-[11px] mt-1 ${isComplete ? "text-emerald-800" : "text-gray-700"}`}>
                      {isComplete
                        ? "Completed. You've finished this book."
                        : "Click to read this book."}
                    </p>
                  </Link>
                );
              })}
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-center pt-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setShowStatsModal(true)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                📘 Your Bible Study Stats
              </button>
            </div>
          </div>
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
