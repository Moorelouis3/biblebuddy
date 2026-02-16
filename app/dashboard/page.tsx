// app/dashboard/page.tsx
"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentBook, getCompletedChapters, isBookComplete, getTotalCompletedChapters } from "../../lib/readingProgress";
import { getProfileStats } from "../../lib/profileStats";
import AdSlot from "../../components/AdSlot";
import { FeatureTourModal } from "../../components/FeatureTourModal";
import {
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureTourKey,
  type FeatureToursState,
} from "../../lib/featureTours";

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
  const router = useRouter();
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
  const [showLevelInfoModal, setShowLevelInfoModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [mobileAdDismissed, setMobileAdDismissed] = useState<boolean>(false);
  const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null } | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [featureToursLoaded, setFeatureToursLoaded] = useState(false);
  const [activeTourKey, setActiveTourKey] = useState<FeatureTourKey | null>(null);
  const [pendingTourNavigation, setPendingTourNavigation] = useState<string | null>(null);
  const [isSavingFeatureTour, setIsSavingFeatureTour] = useState(false);

  const TOUR_COPY: Record<FeatureTourKey, { title: string; body: string }> = {
    dashboard: {
      title: "Welcome to your Dashboard",
      body: "This is your main study home where you can track your level, keep momentum, and jump into each Bible Buddy feature.",
    },
    bible: {
      title: "Welcome to The Bible Section",
      body: "This is where you can start reading Scripture, follow reading plans, and explore books of the Bible.",
    },
    guided_studies: {
      title: "Welcome to Guided Studies",
      body: "This is where you can follow structured studies designed to help you understand Scripture step by step.",
    },
    bible_reference: {
      title: "Welcome to Bible References",
      body: "This section helps you quickly explore people, places, and keywords to understand biblical context.",
    },
    bible_trivia: {
      title: "Welcome to Bible Trivia",
      body: "This is where you can test what you’ve learned and strengthen your Bible knowledge through quizzes.",
    },
    notes: {
      title: "Welcome to Notes",
      body: "Use this section to capture insights, organize your study thoughts, and keep track of what God is teaching you.",
    },
    chat_widget: {
      title: "Welcome to Chat with Louis",
      body: "This chat helps you ask Bible questions instantly while you study so you can stay focused in your reading flow.",
    },
  };

  const DASHBOARD_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Welcome to Your Dashboard
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is your Bible study command center. Here’s how everything works:
      </p>

      <div className="space-y-5">
        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📈 Level &amp; Points</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Complete actions, earn points, and level up.
            <br />Click the question mark on the card to learn how leveling works.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 The Bible</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Read Scripture here without distractions.
            <br />Your progress and study flow stay in one place.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🧭 Guided Studies</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Find reading plans, devotionals, and structured study guides to go deeper.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📚 Bible References</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Look up people, places, and keywords to understand context instantly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🎯 Bible Trivia</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Test your knowledge and reinforce what you’ve learned.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📝 Notes</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Create, save, and organize your personal Bible study notes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🤖 Little Louis (Chat Icon)</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Your AI Bible Buddy.
            <br />Ask questions about Scripture, history, or context anytime.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">⚙️ Menu (Top Right Corner)</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Access your profile, settings, analytics, and account details.
          </p>
        </section>
      </div>
    </div>
  );

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

  useEffect(() => {
    async function loadFeatureTours() {
      if (!userId) return;

      const { data, error } = await supabase
        .from("profile_stats")
        .select("feature_tours")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("[FEATURE_TOURS] Error loading feature_tours:", error);
        setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setFeatureToursLoaded(true);
        setActiveTourKey("dashboard");
        setPendingTourNavigation(null);
        return;
      }

      if (!data) {
        const { error: upsertError } = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: userId,
              feature_tours: { ...DEFAULT_FEATURE_TOURS },
            },
            { onConflict: "user_id" }
          );

        if (upsertError) {
          console.error("[FEATURE_TOURS] Error creating profile_stats row for tours:", upsertError);
        }

        setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setFeatureToursLoaded(true);
        setActiveTourKey("dashboard");
        setPendingTourNavigation(null);
        return;
      }

      const normalizedFeatureTours = normalizeFeatureTours(data.feature_tours);
      setFeatureTours(normalizedFeatureTours);
      setFeatureToursLoaded(true);

      if (normalizedFeatureTours.dashboard !== true) {
        setActiveTourKey("dashboard");
        setPendingTourNavigation(null);
      }
    }

    loadFeatureTours();
  }, [userId]);

  async function handleTourUnderstand() {
    if (!activeTourKey || !userId) return;

    setIsSavingFeatureTour(true);

    const mergedFeatureTours = {
      ...featureTours,
      [activeTourKey]: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: mergedFeatureTours,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[FEATURE_TOURS] Error updating feature_tours:", updateError);

      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: mergedFeatureTours,
          },
          { onConflict: "user_id" }
        );

      if (upsertError) {
        console.error("[FEATURE_TOURS] Error upserting feature_tours:", upsertError);
        setIsSavingFeatureTour(false);
        return;
      }
    }

    setFeatureTours(mergedFeatureTours);
    const nextPath = pendingTourNavigation;
    setActiveTourKey(null);
    setPendingTourNavigation(null);
    setIsSavingFeatureTour(false);

    if (nextPath) {
      router.push(nextPath);
    }
  }

  function handleTourClose() {
    const nextPath = pendingTourNavigation;
    setActiveTourKey(null);
    setPendingTourNavigation(null);

    if (nextPath) {
      router.push(nextPath);
    }
  }

  function handleCardClick(
    event: MouseEvent<HTMLAnchorElement>,
    tourKey: FeatureTourKey,
    path: string
  ) {
    if (!featureToursLoaded) {
      router.push(path);
      return;
    }

    event.preventDefault();

    if (featureTours[tourKey] === true) {
      router.push(path);
      return;
    }

    setActiveTourKey(tourKey);
    setPendingTourNavigation(path);
  }

  // Load Pro expiration data
  useEffect(() => {
    // Temporarily disabled for dashboard stabilization
    setMembershipStatus(null);
    setProExpiresAt(null);
  }, []);

  // Update countdown timer in real-time
  useEffect(() => {
    if (membershipStatus !== "pro" || !proExpiresAt) {
      setDaysRemaining(null);
      return;
    }

    function updateCountdown() {
      if (!proExpiresAt) {
        setDaysRemaining(null);
        return;
      }
      const expirationDate = new Date(proExpiresAt);
      const now = new Date();
      const diffMs = expirationDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [membershipStatus, proExpiresAt]);

  // Load level data based on total_actions (FAST - only queries total_actions)
  useEffect(() => {
    async function loadLevelData() {
      if (!userId) {
        setIsLoadingLevel(false);
        return;
      }

      setIsLoadingLevel(true);
      try {
        // FAST QUERY: Get total_actions plus daily credits/pay status from profile_stats
        const { data, error } = await supabase
          .from("profile_stats")
          .select("total_actions, is_paid, daily_credits")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        const totalActions = (data?.total_actions || 0) as number;
        if (data) {
          setProfile({
            is_paid: data.is_paid === true,
            daily_credits: typeof data.daily_credits === "number" ? data.daily_credits : 0,
          });
        }

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
          levelName = "Rooted";
          identityText = "You've built a strong foundation in Scripture.";
          encouragementText = "Welcome home. You are a Bible Buddy.";
        } else if (totalActions >= 7000) {
          level = 9;
          levelStart = 7000;
          levelEnd = 9999;
          levelName = "Wise Observer";
          identityText = "You understand context and purpose more clearly.";
          encouragementText = "Faithfulness matters. Keep walking forward.";
        } else if (totalActions >= 4000) {
          level = 8;
          levelStart = 4000;
          levelEnd = 6999;
          levelName = "Deep Reader";
          identityText = "You're comfortable slowing down and going deep.";
          encouragementText = "Stay engaged. You're seeing the bigger picture.";
        } else if (totalActions >= 2000) {
          level = 7;
          levelStart = 2000;
          levelEnd = 3999;
          levelName = "Pattern Seeker";
          identityText = "You notice themes, connections, and repetition.";
          encouragementText = "You're building something lasting.";
        } else if (totalActions >= 1000) {
          level = 6;
          levelStart = 1000;
          levelEnd = 1999;
          levelName = "Thoughtful Student";
          identityText = "You're studying with intention and reflection.";
          encouragementText = "Keep pressing in. This is meaningful growth.";
        } else if (totalActions >= 500) {
          level = 5;
          levelStart = 500;
          levelEnd = 999;
          levelName = "Story Builder";
          identityText = "You're starting to see the Bible as one big story.";
          encouragementText = "You're building understanding, not just habits.";
        } else if (totalActions >= 250) {
          level = 4;
          levelStart = 250;
          levelEnd = 499;
          levelName = "Scripture Explorer";
          identityText = "You're connecting people, places, and meaning.";
          encouragementText = "You're connecting the story. Keep exploring.";
        } else if (totalActions >= 100) {
          level = 3;
          levelStart = 100;
          levelEnd = 249;
          levelName = "Curious Reader";
          identityText = "You're asking good questions and digging deeper.";
          encouragementText = "Stay curious. Understanding grows here.";
        } else if (totalActions >= 25) {
          level = 2;
          levelStart = 25;
          levelEnd = 99;
          levelName = "Getting Oriented";
          identityText = "You're learning how the Bible fits together.";
          encouragementText = "Keep going. You're building a daily habit.";
        } else {
          level = 1;
          levelStart = 0;
          levelEnd = 24;
          levelName = "First Steps";
          identityText = "You're just getting started. Every habit begins here.";
          encouragementText = "Keep going. Consistency starts here.";
        }

        // Calculate progress within current level
        const progressInLevel = totalActions - levelStart;
        const levelSpan = levelEnd - levelStart + 1;
        const progressPercent = Math.min(100, Math.max(0, (progressInLevel / levelSpan) * 100));

        // Select random motivational message for this level
        const motivationalMessages: Record<number, string[]> = {
          1: [
            "Every journey starts with one step.",
            "You showed up. That matters.",
            "Small steps lead to lasting habits.",
          ],
          2: [
            "You're starting to find your rhythm.",
            "Consistency is forming.",
            "You're learning how this all fits together.",
          ],
          3: [
            "Great questions lead to deeper understanding.",
            "Your curiosity is a strength.",
            "You're learning to slow down and ask why.",
          ],
          4: [
            "You're connecting more than just verses.",
            "The Bible is becoming clearer.",
            "You're exploring with purpose.",
          ],
          5: [
            "You're seeing the bigger picture now.",
            "The story is starting to connect.",
            "You're building understanding, not just habits.",
          ],
          6: [
            "Your study is becoming intentional.",
            "Depth beats speed every time.",
            "You're growing steadily.",
          ],
          7: [
            "You notice what others might miss.",
            "Patterns are forming.",
            "Your understanding is maturing.",
          ],
          8: [
            "You're comfortable going deep.",
            "You've learned how to slow down.",
            "Depth is becoming natural.",
          ],
          9: [
            "You read with wisdom and awareness.",
            "Context matters — and you see it.",
            "Your understanding is strong.",
          ],
          10: [
            "You've built a solid foundation.",
            "Your study habits are deeply rooted.",
            "This is long-term growth.",
          ],
        };

        const messages = motivationalMessages[level] || motivationalMessages[1];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

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
        setMotivationalMessage(randomMessage);
      } catch (err) {
        console.warn("Error loading level data:", err);
      } finally {
        setIsLoadingLevel(false);
      }
    }

    loadLevelData();
  }, [userId]);

  // Load other dashboard data (separate, non-blocking)
  useEffect(() => {
    async function loadOtherDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      try {
        // Get current active book (for other dashboard features)
        const activeBook = await getCurrentBook(user.id, BOOKS);
        setCurrentBook(activeBook);

        // Get total completed chapters (for other dashboard features)
        const totalCount = await getTotalCompletedChapters(user.id, BOOKS);
        setTotalCompletedChapters(totalCount);
      } catch (err) {
        console.warn("Error loading other dashboard data:", err);
      }
    }

    loadOtherDashboardData();
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

  /**
   * FEATURE FLAG: Set to true to enable ads
   * 
   * To enable ads:
   * 1. Set ENABLE_ADS = true in this file
   * 2. Set ENABLE_ADS = true in components/AdSlot.tsx
   * 3. Add actual ad slot IDs from Google AdSense to the AdSlot components below
   * 4. Ensure Google AdSense script is loaded in app/layout.tsx (already added)
   * 
   * IMPORTANT: Ads are disabled by default. Only enable after:
   * - Getting approval from Google AdSense
   * - Testing thoroughly
   * - Ensuring ad slot IDs are correct
   * 
   * Ads will only show for:
   * - Logged-in users
   * - Free plan users (Pro users never see ads)
   */
  const ENABLE_ADS = false;

  // Determine if ads should be shown
  // Only show ads if:
  // - Feature flag is enabled
  // - User is logged in
  // - User is NOT a Pro member
  const shouldShowAds = ENABLE_ADS && userId && membershipStatus !== "pro";

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* DESKTOP LAYOUT: Left Ad | Content | Right Ad */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 mt-8 gap-6">
        {/* LEFT AD SLOT (Desktop Only) */}
        {shouldShowAds && (
          <aside className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <div className="mt-8">
              <AdSlot
                variant="vertical"
                format="300x250"
                className="sticky top-8"
              />
            </div>
          </aside>
        )}

        {/* MAIN CONTENT – CENTERED COLUMN */}
        <div className="flex-1 max-w-lg mx-auto">
        {/* GREETING */}
        <div className="mb-4">
          <p className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="flex flex-col gap-4">
          {/* BIBLE READING PROGRESS CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
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
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold">
                    📘 Level {levelInfo.level} "{levelInfo.levelName}"
                  </h2>
                  <button
                    onClick={() => setShowLevelInfoModal(true)}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    title="Learn about levels"
                  >
                    ?
                  </button>
                </div>
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

                {/* Actions remaining until next level */}
                <p className="text-sm text-gray-600 font-medium">
                  You have{" "}
                  {Math.max(0, levelInfo.levelEnd - levelInfo.totalActions + 1)}{" "}
                  actions until Level {levelInfo.level + 1}
                </p>
                {profile && profile.is_paid === false && (
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    Daily credits left: {profile.daily_credits ?? 0}
                  </p>
                )}
              </>
            ) : null}
          </div>

          {/* Pro Expiration Countdown Timer */}
          {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-blue-800 font-medium">
                ⏰ Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
              </p>
            </div>
          )}

          {/* THE BIBLE */}
          <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}>
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📖 The Bible</h2>
              <p className="text-gray-700 mt-1">{readingSubtitle}</p>
            </div>
          </Link>

          {/* GUIDED STUDIES HUB */}
          <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
            <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">Guided Studies</h2>
              <p className="text-gray-700 mt-1">Structured ways to study Scripture</p>
            </div>
          </Link>

          {/* BIBLE REFERENCE HUB */}
          <Link href="/bible-reference" onClick={(event) => handleCardClick(event, "bible_reference", "/bible-reference")}>
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">Bible References</h2>
              <p className="text-gray-700 mt-1">Tools to understand Scripture</p>
            </div>
          </Link>

          {/* BIBLE TRIVIA */}
          <Link href="/bible-trivia" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-trivia")}>
            <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">🎯 Bible Trivia</h2>
              <p className="text-gray-700 mt-1">
                Test your Bible knowledge
              </p>
            </div>
          </Link>

          {/* NOTES */}
          <Link href="/notes" onClick={(event) => handleCardClick(event, "notes", "/notes")}>
            <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📝 Notes</h2>
              <p className="text-gray-700 mt-1">
                Save and organize your Bible study notes
              </p>
            </div>
          </Link>

          {/* COMMUNITY */}
          <div
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"
            onClick={() => setShowCommunityModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setShowCommunityModal(true);
              }
            }}
          >
            <h2 className="text-xl font-semibold">Looking for community?</h2>
            <p className="text-gray-700 mt-1">Study Scripture with other believers</p>
          </div>
        </div>
        </div>

        {/* RIGHT AD SLOT (Desktop Only) */}
        {shouldShowAds && (
          <aside className="w-64 flex-shrink-0 sticky top-8 h-fit">
            <div className="mt-8">
              <AdSlot
                variant="vertical"
                format="300x250"
                className="sticky top-8"
              />
            </div>
          </aside>
        )}
      </div>

      {/* MOBILE LAYOUT: Content Only (Ads shown at bottom) */}
      <div className="lg:hidden max-w-lg mx-auto px-4 mt-8">
        {/* GREETING */}
        <div className="mb-4">
          <p className="text-2xl font-semibold text-center">
            Welcome back, {userName}!
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="flex flex-col gap-4">
          {/* BIBLE READING PROGRESS CARD */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
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
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold">
                    📘 Level {levelInfo.level} "{levelInfo.levelName}"
                  </h2>
                  <button
                    onClick={() => setShowLevelInfoModal(true)}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    title="Learn about levels"
                  >
                    ?
                  </button>
                </div>
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

                {/* Actions remaining until next level */}
                <p className="text-sm text-gray-600 font-medium">
                  You have{" "}
                  {Math.max(0, levelInfo.levelEnd - levelInfo.totalActions + 1)}{" "}
                  actions until Level {levelInfo.level + 1}
                </p>
                {profile && profile.is_paid === false && (
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    Daily credits left: {profile.daily_credits ?? 0}
                  </p>
                )}
              </>
            ) : null}
          </div>

          {/* Pro Expiration Countdown Timer */}
          {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-blue-800 font-medium">
                ⏰ Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
              </p>
            </div>
          )}

          {/* THE BIBLE */}
          <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}>
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📖 The Bible</h2>
              <p className="text-gray-700 mt-1">{readingSubtitle}</p>
            </div>
          </Link>

          {/* GUIDED STUDIES HUB */}
          <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
            <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">Guided Studies</h2>
              <p className="text-gray-700 mt-1">Structured ways to study Scripture</p>
            </div>
          </Link>

          {/* BIBLE REFERENCE HUB */}
          <Link href="/bible-reference" onClick={(event) => handleCardClick(event, "bible_reference", "/bible-reference")}>
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">Bible References</h2>
              <p className="text-gray-700 mt-1">Tools to understand Scripture</p>
            </div>
          </Link>

          {/* BIBLE TRIVIA */}
          <Link href="/bible-trivia" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-trivia")}>
            <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">🎯 Bible Trivia</h2>
              <p className="text-gray-700 mt-1">
                Test your Bible knowledge
              </p>
            </div>
          </Link>

          {/* NOTES */}
          <Link href="/notes" onClick={(event) => handleCardClick(event, "notes", "/notes")}>
            <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
              <h2 className="text-xl font-semibold">📝 Notes</h2>
              <p className="text-gray-700 mt-1">
                Save and organize your Bible study notes
              </p>
            </div>
          </Link>

          {/* COMMUNITY */}
          <div
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"
            onClick={() => setShowCommunityModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setShowCommunityModal(true);
              }
            }}
          >
            <h2 className="text-xl font-semibold">Looking for community?</h2>
            <p className="text-gray-700 mt-1">Study Scripture with other believers</p>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM AD BANNER (Fixed at bottom, above system UI) */}
      {shouldShowAds && !mobileAdDismissed && (
        <div 
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0)",
          }}
        >
          <div className="max-w-full mx-auto px-2 py-2 relative">
            {/* Dismiss Button */}
            <button
              onClick={() => setMobileAdDismissed(true)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 z-50 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss ad"
              title="Dismiss ad"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <AdSlot
              variant="horizontal"
              format="320x50"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Add bottom padding to mobile content when ad is shown (prevents content from being hidden behind ad) */}
      {shouldShowAds && !mobileAdDismissed && (
        <div className="lg:hidden h-20" />
      )}

      {activeTourKey && (
        <FeatureTourModal
          isOpen={true}
          title={TOUR_COPY[activeTourKey].title}
          body={TOUR_COPY[activeTourKey].body}
          content={activeTourKey === "dashboard" ? DASHBOARD_TOUR_CONTENT : undefined}
          isSaving={isSavingFeatureTour}
          onClose={handleTourClose}
          onUnderstand={handleTourUnderstand}
        />
      )}

      {/* Level Info Modal */}
      {showLevelInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">🧭 How Levels Work in Bible Buddy</h2>
                <button
                  onClick={() => setShowLevelInfoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6 text-gray-700">
                <p className="text-base leading-relaxed">
                  Bible Buddy isn't about speed, streaks, or competing with other people.
                  <br />
                  It's about understanding the Bible deeply, one step at a time.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">🔑 What Counts as Progress?</h3>
                  <p className="mb-2">You earn progress by completing actions, such as:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📖 Finishing a Bible chapter</li>
                    <li>👤 Learning about people in the Bible</li>
                    <li>🗺️ Discovering places in the Bible</li>
                    <li>🔍 Understanding key words and ideas</li>
                    <li>📝 Creating and saving notes</li>
                  </ul>
                  <p className="mt-3 text-sm">Each action = 1 point toward your growth</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">🧠 Why Levels Exist</h3>
                  <p className="mb-2">Levels help you:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>• See your personal growth over time</li>
                    <li>• Stay encouraged</li>
                    <li>• Build a deeper understanding of Scripture</li>
                  </ul>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>❌ No leaderboards</p>
                    <p>❌ No competition</p>
                    <p>✅ Just your journey with God</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">🏷️ Bible Buddy Levels</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 1 – First Steps</p>
                      <p className="text-sm">You're just getting started. Every habit begins here.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 2 – Getting Oriented</p>
                      <p className="text-sm">You're learning how the Bible fits together.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 3 – Curious Reader</p>
                      <p className="text-sm">You're asking good questions and digging deeper.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 4 – Scripture Explorer</p>
                      <p className="text-sm">You're connecting people, places, and meaning.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 5 – Story Builder</p>
                      <p className="text-sm">You're starting to see the Bible as one big story.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 6 – Thoughtful Student</p>
                      <p className="text-sm">You're studying with intention and reflection.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 7 – Pattern Seeker</p>
                      <p className="text-sm">You notice themes, connections, and repetition.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 8 – Deep Reader</p>
                      <p className="text-sm">You're comfortable slowing down and going deep.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 9 – Wise Observer</p>
                      <p className="text-sm">You understand context and purpose more clearly.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Level 10 – Rooted</p>
                      <p className="text-sm">You've built a strong foundation in Scripture.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">🙌 Final Encouragement</p>
                  <p className="text-sm text-blue-800">
                    There's no rush.
                    <br />
                    The goal isn't to finish fast — it's to understand deeply.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowLevelInfoModal(false)}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hope Nation Community Modal */}
      {showCommunityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hope Nation Community</h2>
                  <p className="text-sm text-gray-500 mt-1">A place to study the Bible together.</p>
                </div>
                <button
                  onClick={() => setShowCommunityModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Hope Nation is a Bible study community where believers come together to study Scripture, ask thoughtful questions, and grow in understanding through discussion and shared insight.
              </p>

              <ul className="list-none space-y-2 text-sm text-gray-700 mb-6">
                <li>📖 Group Bible studies</li>
                <li>💬 Scripture discussions and questions</li>
                <li>🤝 Encouragement and accountability</li>
              </ul>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => window.open("https://www.joinhopenation.com", "_blank", "noopener,noreferrer")}
                  className="inline-block rounded-lg bg-blue-600 text-white text-sm md:text-base font-semibold px-6 py-2.5 shadow-sm hover:bg-blue-700 transition"
                >
                  Join us in Hope Nation
                </button>
                <p className="text-xs text-gray-500 mt-2">Hope Nation is free to join.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
