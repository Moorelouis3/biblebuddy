// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentBook, getCompletedChapters, isBookComplete, getTotalCompletedChapters } from "../../lib/readingProgress";

const MATTHEW_CHAPTERS = 28;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

const STREAK_KEY = "bbReadingStreakDays";
const LAST_DATE_KEY = "bbReadingLastDate";

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

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("buddy");

  const [streakDays, setStreakDays] = useState<number>(0);
  const [daysSinceLastReading, setDaysSinceLastReading] = useState<number>(0);

  const [currentMatthewStep, setCurrentMatthewStep] = useState(0);
  
  // Preloaded reading plan data
  const [totalCompletedChapters, setTotalCompletedChapters] = useState<number>(0);
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const [isLoadingLevel, setIsLoadingLevel] = useState<boolean>(true);
  const [levelInfo, setLevelInfo] = useState<{
    level: number;
    chaptersRead: number;
    levelStart: number;
    levelEnd: number;
    progressPercent: number;
    chaptersNeededForNext: number;
    nextLevel: number;
  } | null>(null);

  // load user first name from Supabase
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        const meta: any = data.user.user_metadata || {};
        const first =
          meta.firstName ||
          meta.first_name ||
          (data.user.email ? data.user.email.split("@")[0] : null) ||
          "friend";

        setUserName(first);
      }
    }

    loadUser();
  }, []);

  // Preload reading plan data (read-only, for dashboard display)
  useEffect(() => {
    async function preloadReadingPlanData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingLevel(false);
        return;
      }

      try {
        setIsLoadingLevel(true);
        
        // Check localStorage cache first
        const cacheKey = `bb_level_data_${user.id}`;
        const cacheTimestampKey = `bb_level_data_timestamp_${user.id}`;
        const cachedData = typeof window !== "undefined" ? window.localStorage.getItem(cacheKey) : null;
        const cachedTimestamp = typeof window !== "undefined" ? window.localStorage.getItem(cacheTimestampKey) : null;
        
        // Use cache if less than 5 minutes old
        if (cachedData && cachedTimestamp) {
          const cacheAge = Date.now() - Number(cachedTimestamp);
          if (cacheAge < 5 * 60 * 1000) { // 5 minutes
            try {
              const parsed = JSON.parse(cachedData);
              setLevelInfo(parsed.levelInfo);
              setTotalCompletedChapters(parsed.totalCompletedChapters);
              setCurrentBook(parsed.currentBook);
              setIsLoadingLevel(false);
              return; // Use cached data
            } catch (e) {
              // Cache parse error, continue to fetch fresh data
            }
          }
        }
        
        // Get current active book
        const activeBook = await getCurrentBook(user.id, BOOKS);
        setCurrentBook(activeBook);

        // Get total completed chapters count across all books (using shared function)
        // This is the SAME function used by Bible Study Stats modal
        const totalCount = await getTotalCompletedChapters(user.id, BOOKS);
        console.log("[DASHBOARD] Total completed chapters:", totalCount);
        setTotalCompletedChapters(totalCount);

        // Calculate level based on chapters read (same source as Bible Study Stats)
        const chaptersRead = totalCount;
        let level = 1;
        let levelStart = 0;
        let levelEnd = 9;

        if (chaptersRead >= 1000 && chaptersRead <= 1188) {
          level = 9;
          levelStart = 1000;
          levelEnd = 1188;
        } else if (chaptersRead >= 700 && chaptersRead <= 999) {
          level = 8;
          levelStart = 700;
          levelEnd = 999;
        } else if (chaptersRead >= 400 && chaptersRead <= 699) {
          level = 7;
          levelStart = 400;
          levelEnd = 699;
        } else if (chaptersRead >= 200 && chaptersRead <= 399) {
          level = 6;
          levelStart = 200;
          levelEnd = 399;
        } else if (chaptersRead >= 100 && chaptersRead <= 199) {
          level = 5;
          levelStart = 100;
          levelEnd = 199;
        } else if (chaptersRead >= 50 && chaptersRead <= 99) {
          level = 4;
          levelStart = 50;
          levelEnd = 99;
        } else if (chaptersRead >= 30 && chaptersRead <= 49) {
          level = 3;
          levelStart = 30;
          levelEnd = 49;
        } else if (chaptersRead >= 10 && chaptersRead <= 29) {
          level = 2;
          levelStart = 10;
          levelEnd = 29;
        } else {
          level = 1;
          levelStart = 0;
          levelEnd = 9;
        }

        // Calculate progress within current level
        const progressInLevel = chaptersRead - levelStart;
        const levelSpan = levelEnd - levelStart + 1;
        const progressPercent = Math.min(100, Math.max(0, (progressInLevel / levelSpan) * 100));

        // Calculate next level info
        const nextLevel = level < 10 ? level + 1 : 10;
        const nextLevelStart = nextLevel === 10 ? 1189 : 
          nextLevel === 9 ? 1000 :
          nextLevel === 8 ? 700 :
          nextLevel === 7 ? 400 :
          nextLevel === 6 ? 200 :
          nextLevel === 5 ? 100 :
          nextLevel === 4 ? 50 :
          nextLevel === 3 ? 30 :
          nextLevel === 2 ? 10 : 0;
        const chaptersNeededForNext = Math.max(0, nextLevelStart - chaptersRead);

        const levelInfoData = {
          level,
          chaptersRead,
          levelStart,
          levelEnd,
          progressPercent,
          chaptersNeededForNext,
          nextLevel,
        };

        console.log("[DASHBOARD] Level calculation:", {
          chaptersRead,
          level,
          levelStart,
          levelEnd,
          progressPercent,
          chaptersNeededForNext,
          nextLevel,
        });

        setLevelInfo(levelInfoData);

        // Save to cache
        if (typeof window !== "undefined") {
          const cacheKey = `bb_level_data_${user.id}`;
          const cacheTimestampKey = `bb_level_data_timestamp_${user.id}`;
          const cacheData = {
            levelInfo: levelInfoData,
            totalCompletedChapters: totalCount,
            currentBook: activeBook,
          };
          window.localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          window.localStorage.setItem(cacheTimestampKey, String(Date.now()));
        }
      } catch (err) {
        console.error("Error preloading reading plan data:", err);
      } finally {
        setIsLoadingLevel(false);
      }
    }

    preloadReadingPlanData();
  }, []);

  // simple local streak system stored in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    let storedStreak = Number(
      window.localStorage.getItem(STREAK_KEY) || "0"
    );
    const lastDateStr = window.localStorage.getItem(LAST_DATE_KEY);

    // first time ever
    if (!lastDateStr) {
      storedStreak = 1;
      window.localStorage.setItem(STREAK_KEY, String(storedStreak));
      window.localStorage.setItem(LAST_DATE_KEY, todayStr);
      setStreakDays(storedStreak);
      setDaysSinceLastReading(0);
      return;
    }

    const lastDate = new Date(lastDateStr + "T00:00:00");
    const diffMs = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // opened again on the same day
    if (diffDays === 0) {
      if (!storedStreak) storedStreak = 1;
      setStreakDays(storedStreak);
      setDaysSinceLastReading(0);
      return;
    }

    // yesterday – continue streak
    if (diffDays === 1) {
      storedStreak = storedStreak ? storedStreak + 1 : 1;
      window.localStorage.setItem(STREAK_KEY, String(storedStreak));
      window.localStorage.setItem(LAST_DATE_KEY, todayStr);
      setStreakDays(storedStreak);
      setDaysSinceLastReading(1);
      return;
    }

    // gap of 2+ days or time weirdness – reset streak
    storedStreak = 1;
    window.localStorage.setItem(STREAK_KEY, String(storedStreak));
    window.localStorage.setItem(LAST_DATE_KEY, todayStr);
    setStreakDays(storedStreak);
    setDaysSinceLastReading(diffDays > 0 ? diffDays : 0);
  }, []);

  // subtitle for reading card (based on preloaded progress)
  const readingSubtitle = totalCompletedChapters === 0
    ? "Start your Bible reading plan here"
    : "Continue reading your Bible here";

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* MAIN CONTENT – CENTERED COLUMN ONLY */}
      <div className="max-w-lg mx-auto px-4 mt-8">
        {/* GREETING */}
        <div className="mb-4">
          <p className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="flex flex-col gap-4">
          {/* BIBLE READING PROGRESS CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            {isLoadingLevel ? (
              // Loading skeleton with animated dots
              <>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold">📘 Loading</h2>
                  <div className="flex gap-1 items-center h-6">
                    <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
                    <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
                    <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Keep going. You're building a daily habit.
                </p>
                
                {/* Progress Bar Skeleton */}
                <div className="mb-3">
                  <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-blue-300 rounded-full w-1/3 animate-pulse"></div>
                  </div>
                </div>

                {/* Progress Text Skeleton */}
                <div className="flex items-center gap-1">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="flex gap-1 items-center">
                    <span className="text-gray-500 text-sm animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
                    <span className="text-gray-500 text-sm animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
                    <span className="text-gray-500 text-sm animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
                  </div>
                </div>
              </>
            ) : levelInfo ? (
              // Actual content
              <>
                <h2 className="text-xl font-semibold mb-2">📘 Level {levelInfo.level}</h2>
                <p className="text-gray-700 text-sm mb-4">
                  Keep going. You're building a daily habit.
                </p>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Progress Text */}
                <p className="text-sm text-gray-600">
                  {levelInfo.level < 10
                    ? `${levelInfo.chaptersNeededForNext} more chapters to reach Level ${levelInfo.nextLevel}`
                    : "Bible completed 🎉"}
                </p>
              </>
            ) : null}
          </div>

          {/* THE BIBLE */}
          <Link href="/reading">
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📖 The Bible</h2>
              <p className="text-gray-700 mt-1">{readingSubtitle}</p>
            </div>
          </Link>

          {/* MY NOTES */}
          <Link href="/notes">
            <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📝 My Notes</h2>
              <p className="text-gray-700 mt-1">
                All your Bible notes saved in one place.
              </p>
            </div>
          </Link>

          {/* PEOPLE IN THE BIBLE */}
          <Link href="/people-in-the-bible">
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">👥 People in the Bible</h2>
              <p className="text-gray-700 mt-1">
                Meet the real people of the Bible
              </p>
            </div>
          </Link>

          <Link href="/places-in-the-bible">
            <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📍 Places in the Bible</h2>
              <p className="text-gray-700 mt-1">
                Explore the important places of Scripture
              </p>
            </div>
          </Link>

          <Link href="/keywords-in-the-bible">
            <div className="bg-red-100 border border-red-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">🔑 Keywords in the Bible</h2>
              <p className="text-gray-700 mt-1">
                Understand important Bible words and ideas
              </p>
            </div>
          </Link>

          {/* GET MORE BIBLE STUDY HELP CARD */}
          <Link href="https://joinhopenation.com/" target="_blank">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold mb-1">📘 Get more Bible study help</h2>
              <p className="text-gray-700 text-sm mb-2">Join our free community</p>
              <p className="text-gray-500 text-xs mb-4">
                Join our free community to study the Bible with others, ask questions, and grow together.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Join our free community
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
