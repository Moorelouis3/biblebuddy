"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import { getUnlockedBooks } from "../../lib/readingProgress";

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

export default function ReadingPage() {
  const [bookPage, setBookPage] = useState(0);
  const [unlockedBooks, setUnlockedBooks] = useState<string[]>(["Matthew"]);

  // load unlocked books from readingProgress helper
  useEffect(() => {
    const unlocked = getUnlockedBooks(BOOKS);
    setUnlockedBooks(unlocked);
  }, []);

  // book pagination
  const startIndex = bookPage * BOOKS_PER_PAGE;
  const visibleBooks = BOOKS.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  const hasPrevPage = bookPage > 0;
  const hasNextPage = startIndex + BOOKS_PER_PAGE < BOOKS.length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">Bible Reading Plan</h1>
        <p className="mb-4">
          We walk together one book and one chapter at a time.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* LOUIS TALKING */}
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <p className="mb-2">
                This is the Bible Reading Plan section of the app. From here we
                pick one book at a time and walk through it together.
              </p>
              <p>
                We start in <span className="font-semibold">Matthew</span>. As
                you finish each book, the next one unlocks so nothing feels
                overwhelming.
              </p>
            </div>
          </div>

          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {visibleBooks.map((book) => {
                const unlocked = unlockedBooks.includes(book);

                const baseClasses =
                  "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                // UNLOCKED BOOKS
                if (unlocked) {
                  // only Matthew has a path right now
                  if (book === "Matthew") {
                    return (
                      <Link
                        key={book}
                        href="/reading/books/matthew"
                        className={`${baseClasses} bg-orange-100 border-orange-300 pulse-matthew`}
                      >
                        <p className="font-semibold">{book}</p>
                        <p className="text-[11px] mt-1">
                          Start here with Jesus. This is your first path.
                        </p>
                      </Link>
                    );
                  }

                  // future unlocked books – no page yet, but show they are open
                  return (
                    <div
                      key={book}
                      className={`${baseClasses} bg-orange-100 border-orange-300`}
                    >
                      <p className="font-semibold">{book}</p>
                      <p className="text-[11px] mt-1">
                        This book is unlocked. Content is coming soon.
                      </p>
                    </div>
                  );
                }

                // LOCKED BOOKS (no link)
                return (
                  <div
                    key={book}
                    className={`${baseClasses} bg-gray-100 border-gray-300 text-gray-400 opacity-80 cursor-default`}
                  >
                    <p className="font-semibold">{book}</p>
                    <p className="text-[11px] mt-1">
                      Locked until you finish the previous book.
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

          {/* animations */}
          <style jsx>{`
            .pulse-matthew {
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
    </div>
  );
}
