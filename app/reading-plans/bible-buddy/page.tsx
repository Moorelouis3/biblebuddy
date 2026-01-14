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

// Section definitions for the reading plan
const SECTIONS = [
  {
    id: "gospels-acts",
    header: "Gospels + Acts",
    description: "Start with the story of Jesus and the beginning of His church.",
    books: ["Matthew", "Mark", "Luke", "John", "Acts"],
    color: "blue",
  },
  {
    id: "law",
    header: "The Law (Torah)",
    description: "Go back to the beginning to meet God's chosen people and the laws He gave them.",
    books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
    color: "indigo",
  },
  {
    id: "historical",
    header: "Historical Books",
    description: "Learn the history of Israel, their leaders, victories, failures, and exile.",
    books: ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"],
    color: "teal",
  },
  {
    id: "wisdom",
    header: "Wisdom & Poetry",
    description: "Explore wisdom, worship, suffering, and everyday faith through poetry and reflection.",
    books: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"],
    color: "purple",
  },
  {
    id: "major-prophets",
    header: "Major Prophets",
    description: "Hear God's warnings, promises, and hope delivered through His prophets.",
    books: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"],
    color: "orange",
  },
  {
    id: "minor-prophets",
    header: "Minor Prophets",
    description: "Shorter prophetic books calling God's people to repentance, faithfulness, and hope.",
    books: ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"],
    color: "red",
  },
  {
    id: "letters",
    header: "Letters to the Church",
    description: "Learn how early Christians were taught to live out their faith in everyday life.",
    books: ["Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"],
    color: "yellow",
  },
  {
    id: "general-epistles",
    header: "General Epistles",
    description: "Practical teaching on faith, perseverance, suffering, and spiritual growth.",
    books: ["Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"],
    color: "green",
  },
  {
    id: "revelation",
    header: "Revelation",
    description: "A vision of Jesus as victorious King and the ultimate fulfillment of God's plan.",
    books: ["Revelation"],
    color: "pink",
  },
];

export default function BibleBuddyReadingPlanPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [completedByBook, setCompletedByBook] = useState<CompletedMap>({});
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
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

  // Load user and all progress with a single fast query
  useEffect(() => {
    async function loadUserAndProgress() {
      if (totalChaptersInPlan === 0) return;

      try {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const uid = user.id;
        setUserId(uid);

        // Single query for all completed chapters in this plan
        const planBookKeys = PLAN_BOOKS.map((book) => book.toLowerCase().trim());
        const { data, error } = await supabase
          .from("completed_chapters")
          .select("book, chapter")
          .eq("user_id", uid)
          .in("book", planBookKeys);

        if (error) {
          console.error("[BIBLE_BUDDY_PLAN] Error loading completed chapters:", error);
          setLoading(false);
          return;
        }

        // Initialize map with empty arrays for all books
        const completedMap: CompletedMap = {};
        PLAN_BOOKS.forEach((book) => {
          completedMap[book] = [];
        });

        // Group chapters by original book name
        (data || []).forEach((row: { book: string; chapter: number }) => {
          const matchBook = PLAN_BOOKS.find(
            (b) => b.toLowerCase().trim() === row.book.toLowerCase().trim()
          );
          if (!matchBook) return;
          completedMap[matchBook].push(row.chapter);
        });

        // Sort chapters inside each book
        Object.keys(completedMap).forEach((book) => {
          completedMap[book].sort((a, b) => a - b);
        });

        setCompletedByBook(completedMap);

        // Total completed chapters across the plan
        let totalCompleted = 0;
        PLAN_BOOKS.forEach((book) => {
          totalCompleted += completedMap[book]?.length || 0;
        });
        setCompletedChaptersInPlan(totalCompleted);

        // Compute overall plan progress
        if (totalChaptersInPlan > 0) {
          const percent = Math.min(
            100,
            (totalCompleted / totalChaptersInPlan) * 100
          );
          setPlanProgressPercent(percent);
        }

        // Determine "continue" location:
        // First incomplete chapter in PLAN_BOOKS order.
        let nextBook: string | null = null;
        let nextChapter = 1;

        outer: for (const book of PLAN_BOOKS) {
          const totalChapters = getBookTotalChapters(book);
          const completed = new Set(completedMap[book] || []);
          for (let ch = 1; ch <= totalChapters; ch++) {
            if (!completed.has(ch)) {
              nextBook = book;
              nextChapter = ch;
              break outer;
            }
          }
        }

        if (nextBook) {
          setLastReadLocation({ book: nextBook, chapter: nextChapter });
        } else {
          // Everything is complete – default to last chapter of the last book
          const lastBook = PLAN_BOOKS[PLAN_BOOKS.length - 1];
          const lastChapterNumber = getBookTotalChapters(lastBook);
          setLastReadLocation({ book: lastBook, chapter: lastChapterNumber });
        }
      } catch (err) {
        console.error("[BIBLE_BUDDY_PLAN] Error loading reading plan progress:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserAndProgress();
  }, [totalChaptersInPlan]);

  // Keep only the active section (where the current book lives) open on initial load
  useEffect(() => {
    if (lastReadLocation && !openSectionId) {
      const sectionForBook = SECTIONS.find((section) =>
        section.books.includes(lastReadLocation.book)
      );
      if (sectionForBook) {
        setOpenSectionId(sectionForBook.id);
      }
    } else if (!openSectionId && !lastReadLocation) {
      // Default: open the first section if nothing is set
      setOpenSectionId(SECTIONS[0]?.id ?? null);
    }
  }, [lastReadLocation]); // Only depend on lastReadLocation, not openSectionId

  const handleOpenChapter = (book: string, chapter: number) => {
    const slug = encodeURIComponent(book.toLowerCase().trim());
    // Reuse the existing Bible chapter overlay route.
    // Mark that we came from the Bible Buddy Reading Plan so the Bible page
    // can show a clear "back to plan" link instead of sending users elsewhere.
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("bbFromReadingPlan", "bible-buddy");
    }
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

        {/* COVER IMAGE (match devotional cover style) */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-xs w-full">
            <img
              src="/images/Thebiblebuddyreadingplan.png"
              alt="The Bible Buddy Reading Plan cover"
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </div>

        {/* INTRO PARAGRAPH */}
        <p className="text-gray-800 leading-relaxed text-base mb-8">
          The Bible Buddy Reading Plan guides you through the Bible in a story-focused order that starts with the life of Jesus and the early church. This helps you understand who Jesus is, what He taught, and why Christians believe what we believe today before moving back into the Old Testament to see where it all began and learn the history behind the faith.
        </p>

        {/* COVER + PROGRESS CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <div className="space-y-4">

            {/* PLAN PROGRESS */}
            <div>
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
              <div>
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

        {/* BOOKS SECTIONS (each section collapsible, only active section open) */}
        <div className="space-y-6">
          {SECTIONS.map((section) => {
            const colorClasses = {
              blue: "bg-blue-100 border-blue-200",
              indigo: "bg-indigo-100 border-indigo-200",
              teal: "bg-teal-100 border-teal-200",
              purple: "bg-purple-100 border-purple-200",
              orange: "bg-orange-100 border-orange-200",
              red: "bg-red-100 border-red-200",
              yellow: "bg-yellow-100 border-yellow-200",
              green: "bg-green-100 border-green-200",
              pink: "bg-pink-100 border-pink-200",
            };

            const isSectionOpen = openSectionId === section.id;

            return (
              <div
                key={section.id}
                className={`${colorClasses[section.color as keyof typeof colorClasses]} border rounded-xl p-5 shadow-sm`}
              >
                {/* Section header as dropdown toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenSectionId((current) =>
                      current === section.id ? null : section.id
                    )
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-1">{section.header}</h2>
                    <p className="text-gray-700 text-sm">
                      {section.description}
                    </p>
                  </div>
                  <span className="ml-3 text-gray-600 text-lg">
                    {isSectionOpen ? "▴" : "▾"}
                  </span>
                </button>

                {isSectionOpen && (
                  <div className="mt-4 space-y-2">
                  {section.books.map((book) => {
                    const totalChapters = getBookTotalChapters(book);
                    const completed = completedByBook[book] || [];
                    const finishedCount = completed.length;
                    const bookPercent = Math.min(
                      100,
                      (finishedCount / totalChapters) * 100
                    );

                    const isOpen = openBook === book;

                    // Locking logic: first book is always unlocked.
                    // Any other book unlocks only after ALL previous books in this plan
                    // are fully completed.
                    const bookIndex = PLAN_BOOKS.indexOf(book);
                    const previousBooks = PLAN_BOOKS.slice(0, bookIndex);
                    const previousAllComplete =
                      bookIndex === 0 ||
                      previousBooks.every((prevBook) => {
                        const prevTotal = getBookTotalChapters(prevBook);
                        const prevCompleted = completedByBook[prevBook] || [];
                        return prevCompleted.length >= prevTotal;
                      });
                    const isUnlocked = bookIndex === 0 || previousAllComplete;

                    return (
                      <div key={book} className="bg-white/60 rounded-lg p-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isUnlocked) {
                              return;
                            }
                            setOpenBook(isOpen ? null : book);
                          }}
                          className={`w-full flex items-center justify-between text-left ${
                            isUnlocked ? "" : "opacity-60 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                              {!isUnlocked && <span>🔒</span>}
                              <span>{book}</span>
                            </p>
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

                        {isUnlocked && isOpen && (
                          <div className="mt-3">
                            {renderBookChapters(book)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


