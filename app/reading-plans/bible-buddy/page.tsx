"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { getBookTotalChapters, getCompletedChapters } from "../../../lib/readingProgress";

// The Bible Buddy Reading Plan order (exactly as requested)
const PLAN_BOOKS: string[] = [
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
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

type CompletedMap = Record<string, number[]>;

export default function BibleBuddyReadingPlanPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [completedByBook, setCompletedByBook] = useState<CompletedMap>({});
  const [planProgressPercent, setPlanProgressPercent] = useState<number>(0);
  const [totalChaptersInPlan, setTotalChaptersInPlan] = useState<number>(0);
  const [completedChaptersInPlan, setCompletedChaptersInPlan] = useState<number>(0);
  const [openBook, setOpenBook] = useState<string | null>(PLAN_BOOKS[0]);
  const [lastReadLocation, setLastReadLocation] = useState<{ book: string; chapter: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Precompute total chapters in plan (does not depend on user)
  useEffect(() => {
    let total = 0;
    for (const book of PLAN_BOOKS) {
      total += getBookTotalChapters(book);
    }
    setTotalChaptersInPlan(total);
  }, []);

  // Load user and reading progress for all plan books
  useEffect(() => {
    async function loadUserAndProgress() {
      try {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const uid = user.id;
        setUserId(uid);

        // Load completed chapters for each book in the plan
        const completedMap: CompletedMap = {};
        let totalCompleted = 0;

        for (const book of PLAN_BOOKS) {
          const bookKey = book.toLowerCase().trim();
          const completed = await getCompletedChapters(uid, bookKey);
          completedMap[book] = completed;
          totalCompleted += completed.length;
        }

        setCompletedByBook(completedMap);
        setCompletedChaptersInPlan(totalCompleted);

        // Compute overall plan progress
        if (totalChaptersInPlan > 0) {
          const percent = Math.min(
            100,
            (totalCompleted / totalChaptersInPlan) * 100
          );
          setPlanProgressPercent(percent);
        }

        // Determine "last read" location:
        // - Find the furthest completed chapter in plan order
        // - If nothing completed, default to first chapter of first book
        let lastBook: string | null = null;
        let lastChapter = 0;

        PLAN_BOOKS.forEach((book) => {
          const completed = completedMap[book] || [];
          if (completed.length > 0) {
            const maxChapter = Math.max(...completed);
            // Later books in the PLAN_BOOKS array take precedence
            lastBook = book;
            lastChapter = maxChapter;
          }
        });

        if (!lastBook) {
          // Nothing completed yet – start at first book + chapter 1
          setLastReadLocation({ book: PLAN_BOOKS[0], chapter: 1 });
        } else {
          setLastReadLocation({ book: lastBook, chapter: lastChapter });
        }
      } catch (err) {
        console.error("[BIBLE_BUDDY_PLAN] Error loading reading plan progress:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserAndProgress();
  }, [totalChaptersInPlan]);

  const handleOpenChapter = (book: string, chapter: number) => {
    const slug = encodeURIComponent(book.toLowerCase().trim());
    // Reuse the existing Bible chapter overlay route.
    // When the user marks the chapter done there and closes it,
    // they'll be returned to this reading plan page.
    router.push(`/Bible/${slug}/${chapter}`);
  };

  const renderBookChapters = (book: string) => {
    const totalChapters = getBookTotalChapters(book);
    const completed = completedByBook[book] || [];
    const completedSet = new Set(completed);

    const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

    return (
      <div className="mt-3 mb-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {chapters.map((chapter) => {
            const done = completedSet.has(chapter);

            let stateClasses =
              "bg-gray-100 border-gray-300 text-gray-500 cursor-pointer";
            if (done) {
              stateClasses =
                "bg-green-100 border-green-300 text-green-800 cursor-pointer";
            }

            return (
              <button
                key={chapter}
                type="button"
                onClick={() => handleOpenChapter(book, chapter)}
                className={`relative rounded-xl border px-3 py-2 text-xs sm:text-sm text-left shadow-sm transition ${stateClasses}`}
              >
                <p className="font-semibold">
                  {book} {chapter}
                </p>
                <p className="text-[11px] mt-1">
                  {done ? "Finished." : "Tap to read this chapter"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          The Bible Buddy Reading Plan
        </h1>
        <p className="text-gray-700 mb-6">
          A guided, story-focused order that walks you through the Bible using the same
          Bible pages you already read in Bible Buddy.
        </p>

        {/* COVER + INTRO CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3">
                <img
                  src="/images/bible-buddy-reading-plan.png"
                  alt="The Bible Buddy Reading Plan cover"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                This plan helps you move through the Bible in a way that highlights
                the story of Jesus and the early church first, then walks back through
                the Old Testament and the rest of the New Testament.
              </p>
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                Every time you open a chapter, you're taken to the same Bible
                experience you already use — with highlights, people, places, keywords,
                and notes — and every completed chapter still counts toward your
                levels and Bible stats.
              </p>

              {/* PLAN PROGRESS */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Plan progress</span>
                  <span>
                    {completedChaptersInPlan} / {totalChaptersInPlan || "–"} chapters
                    read
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${planProgressPercent.toFixed(1)}%` }}
                  />
                </div>
              </div>

              {/* CONTINUE SECTION */}
              {lastReadLocation && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenChapter(
                        lastReadLocation.book,
                        lastReadLocation.chapter
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Continue in{" "}
                    {`${lastReadLocation.book} ${lastReadLocation.chapter}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOOKS SECTION */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Books</h2>
          <p className="text-sm text-gray-700 mb-4">
            Tap a book to expand its chapters. When you open a chapter, the Bible
            pops up in a full reader — and when you close it, you&apos;re right back here.
          </p>

          <div className="divide-y divide-gray-200">
            {PLAN_BOOKS.map((book) => {
              const totalChapters = getBookTotalChapters(book);
              const completed = completedByBook[book] || [];
              const finishedCount = completed.length;
              const bookPercent = Math.min(
                100,
                (finishedCount / totalChapters) * 100
              );

              const isOpen = openBook === book;

              return (
                <div key={book} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenBook(isOpen ? null : book)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{book}</p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {finishedCount} / {totalChapters} chapters finished
                      </p>
                      <div className="mt-1 h-1.5 rounded-full bg-gray-200 overflow-hidden max-w-xs">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${bookPercent}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-3 text-gray-500">
                      {isOpen ? "▴" : "▾"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2">
                      {renderBookChapters(book)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


