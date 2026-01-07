// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentBook, getCompletedChapters, isBookComplete, getTotalCompletedChapters } from "../../lib/readingProgress";
import { getProfileStats } from "../../lib/profileStats";

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
  const [userId, setUserId] = useState<string | null>(null);

  const [streakDays, setStreakDays] = useState<number>(0);
  const [daysSinceLastReading, setDaysSinceLastReading] = useState<number>(0);  

  const [currentMatthewStep, setCurrentMatthewStep] = useState(0);
  
  // Preloaded reading plan data
  const [totalCompletedChapters, setTotalCompletedChapters] = useState<number>(0);
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const [isLoadingLevel, setIsLoadingLevel] = useState<boolean>(true);
  const [levelInfo, setLevelInfo] = useState<{
    level: number;
    levelName: string;
    identityText: string;
    encouragementText: string;
    totalActions: number;
    levelStart: number;
    levelEnd: number;
    progressPercent: number;
  } | null>(null);

  // load user first name from Supabase
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUserId(data.user.id);
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

  // Load level data based on total_actions
  useEffect(() => {
    async function loadLevelData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoadingLevel(false);
        return;
      }

      try {
        setIsLoadingLevel(true);
        
        // Get profile stats to read total_actions
        const profileStats = await getProfileStats(user.id);
        const totalActions = profileStats?.total_actions || 0;

        // Get current active book (for other dashboard features)
        const activeBook = await getCurrentBook(user.id, BOOKS);
        setCurrentBook(activeBook);

        // Get total completed chapters (for other dashboard features)
        const totalCount = await getTotalCompletedChapters(user.id, BOOKS);
        setTotalCompletedChapters(totalCount);

        // Calculate level based on total_actions
        let level = 1;
        let levelStart = 0;
        let levelEnd = 24;
        let levelName = "First Steps";
        let identityText = "You're just getting started. Every habit begins with a first step.";
        let encouragementText = "Keep going. Consistency starts here.";

        if (totalActions >= 10000) {
          level = 10;
          levelStart = 10000;
          levelEnd = 10000;
          levelName = "Bible Buddy";
          identityText = "You've made Bible study a true part of your life.";
          encouragementText = "Welcome home. You are a Bible Buddy.";
        } else if (totalActions >= 7000) {
          level = 9;
          levelStart = 7000;
          levelEnd = 9999;
          levelName = "Faithful Student";
          identityText = "You've shown long-term commitment to studying God's Word.";
          encouragementText = "Faithfulness matters. Keep walking forward.";
        } else if (totalActions >= 4000) {
          level = 8;
          levelStart = 4000;
          levelEnd = 6999;
          levelName = "Story Seeker";
          identityText = "You see how Scripture connects into one continuous story.";
          encouragementText = "Stay engaged. You're seeing the bigger picture.";
        } else if (totalActions >= 2000) {
          level = 7;
          levelStart = 2000;
          levelEnd = 3999;
          levelName = "Word Builder";
          identityText = "You're actively shaping your understanding of Scripture.";
          encouragementText = "You're building something lasting.";
        } else if (totalActions >= 1000) {
          level = 6;
          levelStart = 1000;
          levelEnd = 1999;
          levelName = "Deepening Faith";
          identityText = "You're studying with purpose and growing in understanding.";
          encouragementText = "Keep pressing in. This is meaningful growth.";
        } else if (totalActions >= 500) {
          level = 5;
          levelStart = 500;
          levelEnd = 999;
          levelName = "Rooted";
          identityText = "God's Word is becoming part of your rhythm and routine.";
          encouragementText = "You're building depth. Stay rooted.";
        } else if (totalActions >= 250) {
          level = 4;
          levelStart = 250;
          levelEnd = 499;
          levelName = "Scripture Explorer";
          identityText = "You're exploring people, places, and context beyond the surface.";
          encouragementText = "You're connecting the story. Keep exploring.";
        } else if (totalActions >= 100) {
          level = 3;
          levelStart = 100;
          levelEnd = 249;
          levelName = "Curious Reader";
          identityText = "You're asking questions, noticing details, and reading with intention.";
          encouragementText = "Stay curious. Understanding grows here.";
        } else if (totalActions >= 25) {
          level = 2;
          levelStart = 25;
          levelEnd = 99;
          levelName = "Getting Oriented";
          identityText = "You're learning how the Bible works and how to move through it with confidence.";
          encouragementText = "Keep going. You're building a daily habit.";
        } else {
          level = 1;
          levelStart = 0;
          levelEnd = 24;
          levelName = "First Steps";
          identityText = "You're just getting started. Every habit begins with a first step.";
          encouragementText = "Keep going. Consistency starts here.";
        }

        // Calculate progress within current level
        const progressInLevel = totalActions - levelStart;
        const levelSpan = levelEnd - levelStart + 1;
        const progressPercent = Math.min(100, Math.max(0, (progressInLevel / levelSpan) * 100));

        const levelInfoData = {
          level,
          levelName,
          identityText,
          encouragementText,
          totalActions,
          levelStart,
          levelEnd,
          progressPercent,
        };

        console.log("[DASHBOARD] Level calculation:", {
          totalActions,
          level,
          levelName,
          levelStart,
          levelEnd,
          progressPercent,
        });

        setLevelInfo(levelInfoData);
      } catch (err) {
        console.error("Error loading level data:", err);
      } finally {
        setIsLoadingLevel(false);
      }
    }

    loadLevelData();
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
                  Loading your level...
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
                </div>
              </>
            ) : levelInfo ? (
              // Actual content
              <>
                <h2 className="text-xl font-semibold mb-1">📘 Level {levelInfo.level}</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{levelInfo.levelName}</h3>
                <p className="text-gray-700 text-sm mb-4">
                  {levelInfo.identityText}
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

                {/* Encouragement Text */}
                <p className="text-sm text-gray-600 font-medium">
                  {levelInfo.encouragementText}
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
        </div>
      </div>
    </div>
  );
}
