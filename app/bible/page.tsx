"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isBookComplete } from "../../lib/readingProgress";
import { supabase } from "../../lib/supabaseClient";

// All 66 books of the Bible - sorted alphabetically for Open Bible view
const BOOKS_ALPHABETICAL = [
  "1 Chronicles",
  "1 Corinthians",
  "1 John",
  "1 Kings",
  "1 Peter",
  "1 Samuel",
  "1 Thessalonians",
  "1 Timothy",
  "2 Chronicles",
  "2 Corinthians",
  "2 John",
  "2 Kings",
  "2 Peter",
  "2 Samuel",
  "2 Thessalonians",
  "2 Timothy",
  "3 John",
  "Acts",
  "Amos",
  "Colossians",
  "Daniel",
  "Deuteronomy",
  "Ecclesiastes",
  "Ephesians",
  "Esther",
  "Exodus",
  "Ezekiel",
  "Ezra",
  "Galatians",
  "Genesis",
  "Habakkuk",
  "Haggai",
  "Hebrews",
  "Hosea",
  "Isaiah",
  "James",
  "Jeremiah",
  "Job",
  "Joel",
  "John",
  "Jonah",
  "Joshua",
  "Jude",
  "Judges",
  "Lamentations",
  "Leviticus",
  "Luke",
  "Malachi",
  "Mark",
  "Matthew",
  "Micah",
  "Nahum",
  "Nehemiah",
  "Numbers",
  "Obadiah",
  "Philemon",
  "Philippians",
  "Proverbs",
  "Psalms",
  "Revelation",
  "Romans",
  "Ruth",
  "Song of Solomon",
  "Titus",
  "Zechariah",
  "Zephaniah",
];

const BOOKS_PER_PAGE = 12;

export default function BiblePage() {
  const [bookPage, setBookPage] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookStates, setBookStates] = useState<Record<string, { complete: boolean }>>({});
  const [loading, setLoading] = useState(true);

  // book pagination
  const startIndex = bookPage * BOOKS_PER_PAGE;
  const visibleBooks = BOOKS_ALPHABETICAL.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  const hasPrevPage = bookPage > 0;
  const hasNextPage = startIndex + BOOKS_PER_PAGE < BOOKS_ALPHABETICAL.length;

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

  // Load book completion states from database
  useEffect(() => {
    async function loadBookStates() {
      if (!userId) return;

      try {
        setLoading(true);

        // Get completion states for all books
        const states: Record<string, { complete: boolean }> = {};
        for (const book of BOOKS_ALPHABETICAL) {
          const complete = await isBookComplete(userId, book);
          states[book] = { complete };
        }
        setBookStates(states);
      } catch (err) {
        console.error("Error loading book states:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadBookStates();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The Bible</h1>
        <p className="text-gray-700 mb-4">
          All books of the Bible, organized alphabetically. Every chapter is available to read.
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* BOOK GRID */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading books...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                  {visibleBooks.map((book) => {
                    const isComplete = bookStates[book]?.complete ?? false;

                    const baseClasses =
                      "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                    // All books are unlocked in Open Bible view
                    // Add query param to indicate Open Bible mode (no locking)
                    const href = `/reading/books/${book.toLowerCase()}?open=true`;

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
                    Page {bookPage + 1} of {Math.ceil(BOOKS_ALPHABETICAL.length / BOOKS_PER_PAGE)}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
