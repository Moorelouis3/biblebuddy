// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMatthewCurrentStep } from "../../lib/readingProgress";
import { supabase } from "../../lib/supabaseClient";

const MATTHEW_CHAPTERS = 28;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

const STREAK_KEY = "bbReadingStreakDays";
const LAST_DATE_KEY = "bbReadingLastDate";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("buddy");

  const [streakDays, setStreakDays] = useState<number>(0);
  const [daysSinceLastReading, setDaysSinceLastReading] = useState<number>(0);

  const [currentMatthewStep, setCurrentMatthewStep] = useState(0);

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

  // load reading progress from localStorage
  useEffect(() => {
    const step = getMatthewCurrentStep(TOTAL_ITEMS);
    setCurrentMatthewStep(step);
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

  // subtitle for reading card
  let readingSubtitle: string;

  if (currentMatthewStep === 0) {
    readingSubtitle = "Start your Bible reading plan here.";
  } else if (currentMatthewStep === 1) {
    readingSubtitle = "Continue Matthew 1.";
  } else {
    readingSubtitle = `Continue Matthew ${currentMatthewStep}.`;
  }

  // Louis message with streak
  let louisMessage = "";

  if (daysSinceLastReading === 0 && streakDays > 1) {
    louisMessage = `You are on a ${streakDays} day Bible reading streak. Let us keep it going.`;
  } else if (daysSinceLastReading === 0 && streakDays === 1) {
    louisMessage = "You showed up today. This is the start of your new Bible streak.";
  } else if (daysSinceLastReading > 0 && streakDays > 1) {
    louisMessage = `You were on a ${streakDays} day streak. It has been ${daysSinceLastReading} days since your last time here. No shame, let us start fresh today.`;
  } else {
    louisMessage = `It has been ${daysSinceLastReading} days since your last time here. No shame, let us pick up where you left off.`;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* MAIN CONTENT – CENTERED COLUMN ONLY */}
      <div className="max-w-lg mx-auto px-4 mt-8">
        {/* GREETING */}
        <div className="mb-4">
          <p className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </p>
          <p className="text-sm text-gray-700 text-center mt-1">
            {louisMessage}
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="flex flex-col gap-4">
          {/* HOW TO STUDY THE BIBLE COURSE */}
          <Link href="/lessons">
            <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📘 How to study the Bible</h2>
              <p className="text-gray-700 mt-1">
                A short course that shows you exactly how to read, take notes, and
                build a strong Bible study habit.
              </p>
            </div>
          </Link>

          {/* YOUR BIBLE READING PLAN */}
          <Link href="/reading">
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📅 Your Bible reading plan</h2>
              <p className="text-gray-700 mt-1">{readingSubtitle}</p>
            </div>
          </Link>

          {/* NOTES */}
          <Link href="/notes">
            <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📝 Notes</h2>
              <p className="text-gray-700 mt-1">
                All your Bible notes saved in one place.
              </p>
            </div>
          </Link>

          {/* BIBLE BUDDIES */}
          <Link href="/bible-buddies">
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">🤝 Bible Buddies</h2>
              <p className="text-gray-700 mt-1">
                Meet some of the Bible Buddies.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
