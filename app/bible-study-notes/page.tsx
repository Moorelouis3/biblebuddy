"use client";

import { useState } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import { isBookUnlocked } from "../../lib/readingProgress";

const BOOKS = [
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
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
];

const BOOKS_PER_PAGE = 12;
const MATTHEW_TOTAL_ITEMS = 28 + 1;

export default function BibleStudyNotesPage() {
  const [bookPage, setBookPage] = useState(0);

  // book pagination
  const startIndex = bookPage * BOOKS_PER_PAGE;
  const visibleBooks = BOOKS.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  const hasPrevPage = bookPage > 0;
  const hasNextPage = startIndex + BOOKS_PER_PAGE < BOOKS.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Bible Study Notes</h1>
        <p className="text-gray-700 mb-4">
          Review study notes for chapters you've completed.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* LOUIS TALKING */}
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                This is where you can review study notes for any chapter you've completed.
              </p>
              <p>
                Pick a book to see all its chapters. Chapters you've finished will be highlighted in green with notes available.
              </p>
            </div>
          </div>

          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {visibleBooks.map((book) => {
                const unlocked = isBookUnlocked(book, MATTHEW_TOTAL_ITEMS);

                const baseClasses =
                  "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                if (unlocked) {
                  // Create route for any book (e.g., "Mark" -> "/bible-study-notes/mark")
                  const href = `/bible-study-notes/${book.toLowerCase()}`;

                  return (
                    <Link
                      key={book}
                      href={href}
                      className={`${baseClasses} block ${
                        book === "Matthew"
                          ? "bg-indigo-100 border-indigo-300"
                          : "bg-white border-blue-200"
                      }`}
                    >
                      <p className="font-semibold">{book}</p>
                      <p className="text-[11px] mt-1">
                        {book === "Matthew"
                          ? "View study notes for Matthew chapters."
                          : "This book is now unlocked."}
                      </p>
                    </Link>
                  );
                }

                // locked books (no link)
                return (
                  <div
                    key={book}
                    className={`${baseClasses} bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default`}
                  >
                    <p className="font-semibold">{book}</p>
                    <p className="text-[11px] mt-1">
                      Locked until you finish Matthew.
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

              <Link href="/dashboard" className="hover:underline">
                Home
              </Link>

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
        </div>
      </div>
    </div>
  );
}

