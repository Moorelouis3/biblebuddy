"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import { isBookComplete } from "../../lib/readingProgress";
import { supabase } from "../../lib/supabaseClient";

// All 66 books of the Bible - standard Bible order (Genesis → Revelation)
const BOOKS_BIBLE_ORDER = [
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

const BOOKS_PER_PAGE = 12;

export default function BiblePage() {
  const [bookPage, setBookPage] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookStates, setBookStates] = useState<Record<string, { complete: boolean }>>({});
  const [loading, setLoading] = useState(false); // No loading delay for static book list

  // book pagination
  const startIndex = bookPage * BOOKS_PER_PAGE;
  const visibleBooks = BOOKS_BIBLE_ORDER.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  const hasPrevPage = bookPage > 0;
  const hasNextPage = startIndex + BOOKS_PER_PAGE < BOOKS_BIBLE_ORDER.length;

  // Get user ID and load book completion states
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      try {
        // Get completion states for all books (no loading delay)
        const states: Record<string, { complete: boolean }> = {};
        for (const book of BOOKS_BIBLE_ORDER) {
          const complete = await isBookComplete(user.id, book);
          states[book] = { complete };
        }
        setBookStates(states);
      } catch (err) {
        console.error("Error loading book states:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The Bible</h1>
        
        {/* LOUIS CALLOUT BUBBLE */}
        <div className="mb-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <LouisAvatar />
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 text-sm leading-relaxed text-gray-800 flex-1">
            <p>These are all the books of the Bible. Pick one and let's start reading.</p>
          </div>
        </div>

        {/* HELPER LINKS */}
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/reading" className="text-blue-600 hover:underline">
            Don't know where to start? Try the Reading Plan →
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                  {visibleBooks.map((book) => {
                    const isComplete = bookStates[book]?.complete ?? false;

                    const baseClasses =
                      "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                    // All books are unlocked - no locking behavior
                    // Add open=true query param to indicate Open Bible mode
                    const href = `/reading/books/${encodeURIComponent(book.toLowerCase())}?open=true`;

                    // Determine styling: complete = blue, default = white
                    let cardClasses = "bg-white border-blue-200";
                    if (isComplete) {
                      cardClasses = "bg-blue-100 border-blue-300";
                    }

                    return (
                      <Link
                        key={book}
                        href={href}
                        className={`${baseClasses} block ${cardClasses} hover:shadow-md hover:scale-[1.02] transition`}
                      >
                        <p className="font-semibold">{book}</p>
                        <p className="text-[11px] mt-1">
                          {isComplete
                            ? "Completed. You've finished this book."
                            : "Click to read this book."}
                        </p>
                      </Link>
                    );
                  })}
            </div>

            {/* BOOK PAGINATION */}
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

              <span className="text-gray-600 text-xs">
                Page {bookPage + 1} of {Math.ceil(BOOKS_BIBLE_ORDER.length / BOOKS_PER_PAGE)}
              </span>

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
