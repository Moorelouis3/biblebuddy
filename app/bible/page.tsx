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

export default function BiblePage() {
  const [bookStates, setBookStates] = useState<Record<string, { complete: boolean }>>({});

  // Get user ID and load book completion states
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        const completionEntries = await Promise.all(
          BOOKS_BIBLE_ORDER.map(async (book) => {
            const complete = await isBookComplete(user.id, book);
            return [book, { complete }] as const;
          }),
        );

        const states = Object.fromEntries(completionEntries) as Record<string, { complete: boolean }>;
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
            <p>These are all the books of the Bible. Pick one and let&apos;s start reading.</p>
          </div>
        </div>

        {/* HELPER LINKS */}
        <div className="mb-4 text-sm text-gray-600">
          <Link href="/reading-plans" className="text-blue-600 hover:underline">
            Don&apos;t know where to start? Try the Reading Plan →
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* BOOK GRID */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mt-2">
                  {BOOKS_BIBLE_ORDER.map((book) => {
                    const isComplete = bookStates[book]?.complete ?? false;

                    const baseClasses =
                      "relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm";

                    // All books are unlocked and open directly in the full Bible reader.
                    const href = `/Bible/${encodeURIComponent(book.toLowerCase())}/1`;

                    // Determine styling: complete = green, default = white
                    let cardClasses = "bg-white border-blue-200";
                    if (isComplete) {
                      cardClasses = "bg-emerald-50 border-emerald-300";
                    }

                    return (
                      <Link
                        key={book}
                        href={href}
                        className={`${baseClasses} block ${cardClasses} hover:shadow-md hover:scale-[1.02] transition`}
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
          </div>
        </div>
      </div>
    </div>
  );
}
