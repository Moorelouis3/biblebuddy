
"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState, type MouseEvent } from "react";
import DashboardDailyWelcomeModal from "../../components/DashboardDailyWelcomeModal";
import Link from "next/link";
import "../../styles/pulse.css";
import DashboardCards from "../../components/DashboardCards";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentBook, getCompletedChapters, isBookComplete, getTotalCompletedChapters } from "../../lib/readingProgress";
import { getProfileStats } from "../../lib/profileStats";

import AdSlot from "../../components/AdSlot";
import { FeatureTourModal } from "../../components/FeatureTourModal";
import { useFeatureRenderPriority } from "../../components/FeatureRenderPriorityContext";
import { getDailyRecommendation, type DailyRecommendation } from "../../lib/dailyRecommendation";
import { ACTION_TYPE } from "../../lib/actionTypes";
import {
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureTourKey,
  type FeatureToursState,
} from "../../lib/featureTours";
import { LEVEL_DEFINITIONS, calculateWeightedPoints, getLevelInfoFromPoints } from "../../lib/levelSystem";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";

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
  // All useState declarations appear first, before any useEffect
  const [showDailyWelcome, setShowDailyWelcome] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [lastAction, setLastAction] = useState<{ action_type: string; action_label: string } | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const router = useRouter();
  const { featureToursEnabled } = useFeatureRenderPriority();
  const [userName, setUserName] = useState<string>("buddy");
  const [userId, setUserId] = useState<string | null>(null);
  const [streakDays, setStreakDays] = useState<number>(0);
  const [daysSinceLastReading, setDaysSinceLastReading] = useState<number>(0);
  const [currentMatthewStep, setCurrentMatthewStep] = useState(0);
  const [totalCompletedChapters, setTotalCompletedChapters] = useState<number>(0);
  const [currentBook, setCurrentBook] = useState<string | null>(null);
  const [isLoadingLevel, setIsLoadingLevel] = useState<boolean>(true);
  const [levelInfo, setLevelInfo] = useState<{
    level: number;
    levelName: string;
    identityText: string;
    encouragementText: string;
    totalPoints: number;
    levelStart: number;
    levelEnd: number;
    pointsToNextLevel: number;
    progressPercent: number;
  } | null>(null);
  const [showLevelInfoModal, setShowLevelInfoModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [mobileAdDismissed, setMobileAdDismissed] = useState<boolean>(false);
  const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null; last_active_date: string | null; verse_of_the_day_shown?: string | null } | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [featureToursLoaded, setFeatureToursLoaded] = useState(false);
  const [activeTourKey, setActiveTourKey] = useState<FeatureTourKey | null>(null);
  const [pendingTourNavigation, setPendingTourNavigation] = useState<string | null>(null);
  const [isSavingFeatureTour, setIsSavingFeatureTour] = useState(false);
  const [dashboardTourStep, setDashboardTourStep] = useState(-1);
  const [dashboardTourAnchor, setDashboardTourAnchor] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [dashboardTourCanAdvance, setDashboardTourCanAdvance] = useState(false);
  const dashboardTourAdvanceTimeoutRef = useRef<number | null>(null);
  const [dailyRecommendationCard, setDailyRecommendationCard] = useState<DailyRecommendation | null>(null);
  const [isDailyRecommendationLoading, setIsDailyRecommendationLoading] = useState(true);
  const [isOwnerDashboard, setIsOwnerDashboard] = useState(false);
  const [ownerQuickStats, setOwnerQuickStats] = useState({
    signups24h: 0,
    activeUsers24h: 0,
    totalUsers: 0,
  });
  const [loadingOwnerQuickStats, setLoadingOwnerQuickStats] = useState(false);

  useEffect(() => {
    if (!userId) return;

    void trackNavigationActionOnce({
      userId,
      username: userName,
      actionType: ACTION_TYPE.dashboard_viewed,
      actionLabel: "Dashboard",
      dedupeKey: "dashboard-viewed",
    }).catch((error) => {
      console.error("[NAV] Failed to track dashboard view:", error);
    });
  }, [userId, userName]);

  // Daily Welcome Overlay logic (with dev override)
  useEffect(() => {
    if (typeof window === "undefined") return;
    // DEV OVERRIDE: show overlay if ?showWelcome=1 is in the URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("showWelcome") === "1") {
      setShowDailyWelcome(true);
      setIsReturningUser(false);
      setLastAction(null);
      setRecommendation(null);
      return;
    }
    // Only run after profile loads
    if (!profile) return;

    // Get today's date string (YYYY-MM-DD)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Only show overlay if not already open and date is not today
    if (!showDailyWelcome && profile.verse_of_the_day_shown !== todayStr) {
      setShowDailyWelcome(true);
      setIsReturningUser(false);
      setLastAction(null);
      setRecommendation(null);
    }
  }, [profile, showDailyWelcome]);

  // Daily Welcome Modal close handler
  const handleCloseDailyWelcome = async () => {
    setShowDailyWelcome(false);
    // Update verse_of_the_day_shown in profile_stats to today
    if (userId) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const todayStr = `${yyyy}-${mm}-${dd}`;
      await supabase
        .from("profile_stats")
        .update({ verse_of_the_day_shown: todayStr })
        .eq("user_id", userId);
      // Update local profile state so overlay doesn't show again until tomorrow
      setProfile((prev) => prev ? { ...prev, verse_of_the_day_shown: todayStr } : prev);
    }
  };

  const TOUR_COPY: Record<FeatureTourKey, { title: string; body: string }> = {
    dashboard: {
      title: "Welcome to Bible Buddy",
      body: "Let me show you how your dashboard works so you know exactly where to go inside the app.",
    },
    bible: {
      title: "Welcome to The Bible Section",
      body: "This is where you can start reading Scripture, follow reading plans, and explore books of the Bible.",
    },
    guided_studies: {
      title: "Welcome to Bible Study Tools",
      body: "This is where you can follow structured studies designed to help you understand Scripture step by step.",
    },
    bible_references: {
      title: "Welcome to Bible References",
      body: "This section helps you quickly explore people, places, and keywords to understand biblical context.",
    },
    bible_trivia: {
      title: "🎮 Welcome to Bible Study Games",
      body: "This is where you can reinforce what you’ve learned through trivia and Scripture-based games like Scrambled.",
    },
    notes: {
      title: "Welcome to Notes",
      body: "Use this section to capture insights, organize your study thoughts, and keep track of what God is teaching you.",
    },
    chat_widget: {
      title: "Welcome to Chat with Louis",
      body: "This chat lets you ask Bible questions instantly while you study so you can stay focused in your reading flow. Louis has been carefully trained for hours on biblical content and designed to search Scripture, filter out nonsense, and prioritize clear, Scripture-grounded answers. It’s like having a Bible study partner built directly into your reading experience.",
    },
    bible_study_hub: {
      title: "Welcome to Bible Study Tools",
      body: "Join the discussion and explore the Bible by topic. Dive into insights, tools, and foundational studies to grow your understanding.",
    },
  };

  const DASHBOARD_TOUR_STEPS: Array<{
    title: string;
    body: string;
    spotlight: "overview" | "level" | "recommendation" | "bible" | "group" | "tools" | "games" | "invite" | null;
  }> = [
    {
      title: "This is your dashboard",
      body: "This is where you can access every part of Bible Buddy and move through the app from one place.",
      spotlight: "overview",
    },
    {
      title: "This is your level",
      body: "Every meaningful action you take inside Bible Buddy increases your level and reflects your growth over time.",
      spotlight: "level",
    },
    {
      title: "This is your daily recommendation",
      body: "This helps you know what to do next based on your activity inside Bible Buddy.",
      spotlight: "recommendation",
    },
    {
      title: "This is The Bible",
      body: "Here you can read the Bible, switch translations, and save your progress as you go.",
      spotlight: "bible",
    },
    {
      title: "This is the Bible Study Group",
      body: "Study the Bible with other Bible Buddy users through weekly studies and daily community activity.",
      spotlight: "group",
    },
    {
      title: "This is Bible Study Tools",
      body: "This is a collection of devotionals, reading plans, keyword databases, and your own Bible study notes.",
      spotlight: "tools",
    },
    {
      title: "This is Bible Study Games",
      body: "Here you can play Bible study games to reinforce what you are reading in Scripture.",
      spotlight: "games",
    },
    {
      title: "Invite another Bible Buddy",
      body: "Use this to invite another person to join Bible Buddy and study with you inside the app.",
      spotlight: "invite",
    },
  ];

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
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🔨 Bible Study Tools</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Find reading plans, devotionals, and practical tools to go deeper in Scripture.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📚 Bible References</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Look up people, places, and keywords to understand context instantly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🎮 Bible Study Games</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Use Trivia and Scrambled to turn Scripture into active learning.
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

  const BIBLE_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        📖 The Bible
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is where you read Scripture inside Bible Buddy.
        <br />
        Everything is designed to keep your reading, progress, and notes in one place.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🔤 Choose Your Translation</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Select from three translations:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• WEB – World English Bible</li>
          <li>• ASV – American Standard Version</li>
          <li>• KJV – King James Version</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can switch translations anytime while reading.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📚 Browse the Books</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• View books in Biblical order</li>
          <li>• Or sort them Alphabetically</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Click any book to see its chapters.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 Read a Chapter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you open a chapter, you’ll see:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• A short overview from Little Louis explaining what’s happening</li>
          <li>• The full chapter text</li>
          <li>• Verse numbers for easy reference</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Everything stays clean and distraction-free.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">⬅️➡️ Navigate Easily</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Under each chapter you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Go to the Previous or Next chapter</li>
          <li>• Return to the book overview</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🧠 Go Deeper</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Below the chapter, you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Tap “Read [Chapter] Notes” for a full breakdown</li>
          <li>• Tap “Take Notes” to write your own thoughts</li>
          <li>• Mark the chapter as Completed</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Completed chapters appear highlighted so you can track your progress.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🤖 Use Little Louis Anytime</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Tap the chat icon to ask questions about:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Scripture</li>
          <li>• History</li>
          <li>• Context</li>
          <li>• Meaning</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Your AI Bible Buddy is always available.</p>
      </section>
    </div>
  );

  const GUIDED_STUDIES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        🔨 Bible Study Tools
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Structured ways to go deeper in Scripture.
        <br />
        Choose the format that fits how you like to learn.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 Bible Reading Plans</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Reading Plans guide you through Scripture in a structured order.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Instead of choosing randomly, you follow a clear path — whether that’s reading the entire Bible, focusing on specific themes, or moving through the story in a logical flow.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Pick a plan, follow the chapters, and let your progress build over time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🌅 Devotionals</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Devotionals are short, focused daily readings.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Each devotional includes:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• A selected passage</li>
          <li>• Reflection or explanation</li>
          <li>• Practical application</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          They’re designed to help you stay consistent and connect Scripture to everyday life.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🎯 Choose Your Style</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want structure.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want reflection.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Some days you may want a focused tool to keep moving.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Bible Study Tools gives you flexible ways to keep studying.</p>
      </section>
    </div>
  );

  const BIBLE_REFERENCES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        📚 Welcome to Bible References
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Most people understand the overall story of the Bible.
      </p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        But deep understanding comes from knowing the people, places, and key words behind the story.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">👤 People</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Explore thousands of biblical figures.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Learn:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Who they were</li>
          <li>• Where they lived</li>
          <li>• What role they played</li>
          <li>• How they connect to the bigger story</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Understanding the people brings Scripture to life.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📍 Places</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">The Bible happened in real locations.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">See:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Cities</li>
          <li>• Regions</li>
          <li>• Nations</li>
          <li>• Geographic context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Knowing where events happened helps you understand why they happened.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🔑 Key Words</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Many powerful truths in Scripture depend on specific words.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Important biblical terms</li>
          <li>• Repeated themes</li>
          <li>• Cultural meanings</li>
          <li>• Original context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          You cannot fully grasp the message if you don’t understand the words.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🧠 Go Deeper</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Bible References is your context engine.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When something feels unclear, look it up.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Clarity leads to confidence.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Context leads to understanding.</p>
      </section>
    </div>
  );

  const BIBLE_TRIVIA_TOUR_CONTENT = (
    <div className="space-y-4">
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Test what you know, strengthen what you learn, and discover what you miss.
        Bible Study Games turns Scripture into active learning.
      </p>

      <section className="space-y-1.5">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Two different games</h2>
      </section>

      <section className="space-y-1.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Trivia</h3>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Trivia to test what you remember with questions from what you read in a flashcard-style Bible game.
        </p>
      </section>

      <section className="space-y-1.5">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Scrambled</h3>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Scrambled, a word-unscrambling game, to lock key chapter words into your memory.
        </p>
      </section>

      <section className="space-y-1.5">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Grow through repetition</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Use Bible Study Games after reading a chapter, finishing a book, or completing a study.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Learning happens best when you apply what you read.
        </p>
      </section>
    </div>
  );

  const NOTES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        📝 Welcome to Notes
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Reading Scripture is powerful.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Writing it down makes it transformational.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Taking notes helps you slow down, reflect, and truly understand what you’re reading.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">✍️ Why Notes Matter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you write:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• You process Scripture more deeply</li>
          <li>• You remember what you study</li>
          <li>• You see patterns and connections</li>
          <li>• You build your own personal commentary over time</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Faith grows when reflection becomes intentional.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📚 Two Ways to Take Notes</h2>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 Guided Notes (GROW Method)</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Use the GROW method to structure your study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• G — Get the passage</li>
          <li>• R — Research the context</li>
          <li>• O — Observe what stands out</li>
          <li>• W — Write your reflection</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          This helps you go deeper instead of just reading quickly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🗒 Free Form Notes</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Prefer to write freely?</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>• Create personal reflections</li>
          <li>• Record prayers</li>
          <li>• Write sermon notes</li>
          <li>• Capture insights while reading</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          No structure required — just your thoughts and Scripture.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">🔁 Your Notes Stay Organized</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Notes are connected to books and chapters so you can revisit them anytime.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Over time, this becomes your personal Bible study archive.
        </p>
      </section>
    </div>
  );

  // load user first name from Supabase
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        setUserId(data.user.id);
        setIsOwnerDashboard(data.user.email === "moorelouis3@gmail.com");
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
    if (!isOwnerDashboard) return;

    async function loadOwnerQuickStats() {
      setLoadingOwnerQuickStats(true);
      try {
        const fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const [signupsResult, actionsResult, totalUsersResponse] = await Promise.all([
          supabase
            .from("user_signups")
            .select("id", { count: "exact", head: true })
            .gte("created_at", fromDate),
          supabase
            .from("master_actions")
            .select("user_id")
            .gte("created_at", fromDate),
          fetch("/api/admin/total-users"),
        ]);

        if (signupsResult.error || actionsResult.error || !totalUsersResponse.ok) {
          console.error("[DASHBOARD_OWNER_STATS] Error loading quick stats:", {
            signupsError: signupsResult.error,
            actionsError: actionsResult.error,
            totalUsersError: totalUsersResponse.ok ? null : totalUsersResponse.statusText,
          });
          setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0 });
          setLoadingOwnerQuickStats(false);
          return;
        }

        const totalUsersPayload = await totalUsersResponse.json();

        const activeUsers24h = new Set(
          (actionsResult.data || [])
            .map((row) => row.user_id)
            .filter((value): value is string => typeof value === "string" && value.length > 0)
        ).size;

        setOwnerQuickStats({
          signups24h: signupsResult.count ?? 0,
          activeUsers24h,
          totalUsers: totalUsersPayload.totalUsers ?? 0,
        });
      } catch (error) {
        console.error("[DASHBOARD_OWNER_STATS] Unexpected error:", error);
        setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0 });
      }
      setLoadingOwnerQuickStats(false);
    }

    void loadOwnerQuickStats();
  }, [isOwnerDashboard]);

  function renderOwnerQuickStatsRow() {
    if (!isOwnerDashboard) return null;

    return (
      <div className="mb-4">
        <Link href="/admin/analytics" className="block">
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition">
            {[
              { label: "Signups 24h", value: ownerQuickStats.signups24h, tones: "bg-gray-100 border-gray-200" },
              { label: "Active 24h", value: ownerQuickStats.activeUsers24h, tones: "bg-blue-100 border-blue-200" },
              { label: "Total Users", value: ownerQuickStats.totalUsers, tones: "bg-red-100 border-red-200" },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-xl border px-3 py-4 text-center ${card.tones}`}
              >
                <p className="text-2xl font-bold text-gray-900">
                  {loadingOwnerQuickStats ? "..." : card.value}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-700">{card.label}</p>
              </div>
            ))}
          </div>
        </Link>
      </div>
    );
  }

  useEffect(() => {
    async function loadFeatureTours() {
      if (!featureToursEnabled || !userId) return;

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
  }, [featureToursEnabled, userId]);

  useEffect(() => {
    if (!featureToursEnabled) {
      setActiveTourKey(null);
      setPendingTourNavigation(null);
      setFeatureToursLoaded(false);
    }
  }, [featureToursEnabled]);

  useEffect(() => {
    if (activeTourKey === "dashboard") {
      setDashboardTourStep(-1);
      setDashboardTourAnchor(null);
      setDashboardTourCanAdvance(false);
    }
  }, [activeTourKey]);

  useEffect(() => {
    return () => {
      if (dashboardTourAdvanceTimeoutRef.current) {
        clearTimeout(dashboardTourAdvanceTimeoutRef.current);
      }
    };
  }, []);

  function getVisibleDashboardTourTarget(spotlight: NonNullable<(typeof DASHBOARD_TOUR_STEPS)[number]["spotlight"]>) {
    const targets = Array.from(document.querySelectorAll(`[data-dashboard-tour="${spotlight}"]`));

    for (const target of targets) {
      if (!(target instanceof HTMLElement)) continue;
      const rect = target.getBoundingClientRect();
      const styles = window.getComputedStyle(target);
      const isVisible =
        styles.display !== "none" &&
        styles.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0;

      if (isVisible) {
        return target;
      }
    }

    return null;
  }

  useEffect(() => {
    if (activeTourKey !== "dashboard" || dashboardTourStep < 0) return;

    setDashboardTourCanAdvance(false);

    const spotlight = DASHBOARD_TOUR_STEPS[dashboardTourStep]?.spotlight;
    if (!spotlight) return;

    const timeout = window.setTimeout(() => {
      const target = getVisibleDashboardTourTarget(spotlight);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        const rect = target.getBoundingClientRect();
        setDashboardTourAnchor({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [activeTourKey, dashboardTourStep]);

  useEffect(() => {
    if (activeTourKey !== "dashboard" || dashboardTourStep < 0) return;

    const timeout = window.setTimeout(() => {
      setDashboardTourCanAdvance(true);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [activeTourKey, dashboardTourStep]);

  useEffect(() => {
    if (activeTourKey !== "dashboard" || dashboardTourStep < 0) return;

    function refreshDashboardTourAnchor() {
      const spotlight = DASHBOARD_TOUR_STEPS[dashboardTourStep]?.spotlight;
      if (!spotlight) return;
      const target = getVisibleDashboardTourTarget(spotlight);
      if (target instanceof HTMLElement) {
        const rect = target.getBoundingClientRect();
        setDashboardTourAnchor({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    }

    window.addEventListener("resize", refreshDashboardTourAnchor);
    window.addEventListener("scroll", refreshDashboardTourAnchor, true);
    return () => {
      window.removeEventListener("resize", refreshDashboardTourAnchor);
      window.removeEventListener("scroll", refreshDashboardTourAnchor, true);
    };
  }, [activeTourKey, dashboardTourStep]);

  async function handleTourUnderstand() {
    if (activeTourKey === "dashboard" && dashboardTourStep < 0) {
      setDashboardTourCanAdvance(false);
      setDashboardTourAnchor(null);
      if (dashboardTourAdvanceTimeoutRef.current) {
        clearTimeout(dashboardTourAdvanceTimeoutRef.current);
      }
      dashboardTourAdvanceTimeoutRef.current = window.setTimeout(() => {
        setDashboardTourStep(0);
        dashboardTourAdvanceTimeoutRef.current = null;
      }, 160);
      return;
    }

    if (activeTourKey === "dashboard" && dashboardTourStep < DASHBOARD_TOUR_STEPS.length - 1) {
      setDashboardTourCanAdvance(false);
      setDashboardTourAnchor(null);
      if (dashboardTourAdvanceTimeoutRef.current) {
        clearTimeout(dashboardTourAdvanceTimeoutRef.current);
      }
      dashboardTourAdvanceTimeoutRef.current = window.setTimeout(() => {
        setDashboardTourStep((current) => current + 1);
        dashboardTourAdvanceTimeoutRef.current = null;
      }, 160);
      return;
    }

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
    setDashboardTourStep(-1);
    setDashboardTourAnchor(null);
    setDashboardTourCanAdvance(false);
    if (dashboardTourAdvanceTimeoutRef.current) {
      clearTimeout(dashboardTourAdvanceTimeoutRef.current);
      dashboardTourAdvanceTimeoutRef.current = null;
    }

    if (nextPath) {
      router.push(nextPath);
    }
  }

  function handleTourClose() {
    const nextPath = pendingTourNavigation;
    setActiveTourKey(null);
    setPendingTourNavigation(null);
    setDashboardTourStep(-1);
    setDashboardTourAnchor(null);
    setDashboardTourCanAdvance(false);
    if (dashboardTourAdvanceTimeoutRef.current) {
      clearTimeout(dashboardTourAdvanceTimeoutRef.current);
      dashboardTourAdvanceTimeoutRef.current = null;
    }

    if (nextPath) {
      router.push(nextPath);
    }
  }

  function handleCardClick(
    event: MouseEvent<HTMLAnchorElement>,
    tourKey: FeatureTourKey | "bible_buddy_tv",
    path: string
  ) {
    const dashboardCardLabelMap: Partial<Record<FeatureTourKey | "bible_buddy_tv", string>> = {
      bible: "The Bible",
      bible_study_hub: "Bible Study Group",
      guided_studies: "Bible Study Tools",
      bible_buddy_tv: "Bible Buddy TV",
      bible_trivia: "Bible Study Games",
    };

    if (userId) {
      const actionLabel = dashboardCardLabelMap[tourKey] || path;
      void trackNavigationActionOnce({
        userId,
        username: userName,
        actionType: ACTION_TYPE.dashboard_card_opened,
        actionLabel,
        dedupeKey: `dashboard-card:${actionLabel}`,
      }).catch((error) => {
        console.error("[NAV] Failed to track dashboard card click:", error);
      });
    }

    if (!featureToursEnabled || tourKey === "bible_buddy_tv") {
      router.push(path);
      return;
    }

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
    let didCancel = false;
    async function loadLevelDataAndMaybeResetCredits() {
      if (!userId) {
        setIsLoadingLevel(false);
        return;
      }

      setIsLoadingLevel(true);
      try {
        // 1. Call API route to reset daily credits if needed
        const resetRes = await fetch("/api/reset-daily-credits", {
          method: "POST",
        });
        let resetJson: { ok: boolean; reset?: boolean; daily_credits?: number } = { ok: false };
        try {
          resetJson = await resetRes.json();
        } catch {}

        // 2. Fetch profile_stats for dashboard display
        const { data, error } = await supabase
          .from("profile_stats")
          .select("total_actions, is_paid, daily_credits, last_active_date, verse_of_the_day_shown")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        const profileData = data;
        if (profileData) {
          setProfile({
            is_paid: profileData.is_paid === true,
            daily_credits:
              typeof resetJson.daily_credits === "number"
                ? resetJson.daily_credits
                : typeof profileData.daily_credits === "number"
                ? profileData.daily_credits
                : 0,
            last_active_date: profileData.last_active_date ?? null,
            verse_of_the_day_shown: profileData.verse_of_the_day_shown ?? null,
          });
        }

        const [
          actionsResult,
          groupPostsResult,
          groupLikeGivenResult,
          feedPostsResult,
        ] = await Promise.all([
          supabase
            .from("master_actions")
            .select("action_type")
            .eq("user_id", userId),
          supabase
            .from("group_posts")
            .select("id, parent_post_id, like_count")
            .eq("user_id", userId),
          supabase
            .from("group_post_likes")
            .select("post_id", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("feed_posts")
            .select("reaction_counts")
            .eq("user_id", userId),
        ]);

        const actionTypes = (actionsResult.data || [])
          .map((row) => row.action_type)
          .filter((actionType): actionType is string => typeof actionType === "string" && actionType !== "group_message_sent");

        const groupPosts = groupPostsResult.data || [];
        const groupRootPostCount = groupPosts.filter((post) => !post.parent_post_id).length;
        const groupCommentCount = groupPosts.filter((post) => !!post.parent_post_id).length;
        const groupLikesReceivedCount = groupPosts.reduce((total, post) => total + (post.like_count || 0), 0);
        const groupLikeGivenCount = groupLikeGivenResult.count || 0;
        const feedLikesReceivedCount = (feedPostsResult.data || []).reduce((total, post) => {
          const reactionCounts = post.reaction_counts && typeof post.reaction_counts === "object"
            ? post.reaction_counts as Record<string, number>
            : {};
          return total + Object.values(reactionCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
        }, 0);

        const weightedPoints = calculateWeightedPoints({
          actionTypes,
          groupRootPostCount,
          groupCommentCount,
          groupLikeGivenCount,
          likesReceivedCount: groupLikesReceivedCount + feedLikesReceivedCount,
        });

        const levelData = getLevelInfoFromPoints(weightedPoints.totalPoints);
        const { level, levelName, identityText, encouragementText, levelStart, levelEnd, progressPercent, totalPoints, pointsToNextLevel } = levelData;

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
          totalPoints,
          levelStart,
          levelEnd,
          pointsToNextLevel,
          progressPercent,
        };

        if (!didCancel) {
          setLevelInfo(levelInfoData);
          setMotivationalMessage(randomMessage);
        }

        // Write current_level back to profile_stats so other components can read it
        supabase
          .from("profile_stats")
          .update({ current_level: level })
          .eq("user_id", userId)
          .then(() => {});

      } catch (err) {
        if (!didCancel) {
          console.warn("Error loading level data:", err);
        }
      } finally {
        if (!didCancel) setIsLoadingLevel(false);
      }
    }
    loadLevelDataAndMaybeResetCredits();
    return () => {
      didCancel = true;
    };
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

  function buildDailyRecommendationCardCopy(recommendationItem: DailyRecommendation | null) {
    if (!recommendationItem) {
      return { title: null, subtitle: null };
    }

    const cta = recommendationItem.primaryButtonText;
    const href = recommendationItem.primaryButtonHref;
    const category = recommendationItem.category;
    const liveStudyMatch =
      recommendationItem.contextLine.match(/^(.+?) is live in your Bible Study Group\./i) ||
      recommendationItem.contextLine.match(/^You are partway through (.+?)\./i);
    const liveStudyTitle = liveStudyMatch?.[1]?.trim() || null;
    const continueWeekMatch = cta.match(/Continue Week\s+(\d+)/i);
    const startWeekMatch = cta.match(/Start Week\s+(\d+)/i);
    const liveStudyWeek = continueWeekMatch?.[1] || startWeekMatch?.[1] || null;
    const devotionalTitleMatch =
      recommendationItem.contextLine.match(/of the (.+?) devotional/i) ||
      recommendationItem.contextLine.match(/middle of the (.+?) devotional/i) ||
      recommendationItem.contextLine.match(/^You already started (.+?)\./i);
    const devotionalTitleFromCard = recommendationItem.cardTitle
      ?.replace(/^Continue\s+/i, "")
      ?.replace(/^Start\s+/i, "")
      ?.trim();
    const devotionalTitle = devotionalTitleFromCard || devotionalTitleMatch?.[1]?.trim() || null;
    const continueDayMatch = cta.match(/Continue Day\s+(\d+)/i);
    const startDayMatch = cta.match(/Start Day\s+(\d+)/i);

    if (liveStudyTitle && liveStudyWeek) {
      return {
        title: `Week ${liveStudyWeek} Bible Study Ready`,
        subtitle: `Week ${liveStudyWeek} of the ${liveStudyTitle} Bible study is now ready.`,
      };
    }

    if (category === "devotional" && devotionalTitle && continueDayMatch) {
      const nextDay = parseInt(continueDayMatch[1], 10);
      const lastDay = Math.max(nextDay - 1, 1);
      return {
        title: `Continue with ${devotionalTitle}`,
        subtitle: `You left off on Day ${lastDay}. Continue Day ${nextDay} today.`,
      };
    }

    if (category === "devotional" && devotionalTitle && startDayMatch) {
      return {
        title: `Start ${devotionalTitle}`,
        subtitle: "Day 1 is ready when you are.",
      };
    }

    if (category === "devotional" && /view devotionals/i.test(cta)) {
      return {
        title: "Continue with a devotional",
        subtitle: "Pick up where you left off and keep your devotional rhythm going.",
      };
    }

    if (category === "profile" && /finish profile/i.test(cta)) {
      return {
        title: "Set up your Bible Buddy profile",
        subtitle: "Add a profile picture and short bio so other Bible Buddies can get to know you.",
      };
    }

    if (category === "general" && /turn on push alerts/i.test(cta)) {
      return {
        title: "Stay connected with Bible Buddy",
        subtitle: "Turn on notifications so you can hear about new messages, group updates, and activity in the app.",
      };
    }

    if (category === "reading_plan" && /read /i.test(cta)) {
      const nextReadMatch = cta.match(/Read\s+(.+)/i);
      const previousReadMatch = recommendationItem.contextLine.match(/finished\s+(.+?)\s+in the Bible Buddy Reading Plan/i);
      const nextRead = nextReadMatch?.[1]?.trim() || "your next chapter";
      const previousRead = previousReadMatch?.[1]?.trim();
      return {
        title: "Continue your reading plan",
        subtitle: previousRead
          ? `You read ${previousRead} last time. Continue with ${nextRead}.`
          : `${nextRead} is ready when you are.`,
      };
    }

    if (category === "reading_plan" && /continue reading plan/i.test(cta)) {
      return {
        title: "Continue your reading plan",
        subtitle: "Pick up where you left off and keep your reading plan moving.",
      };
    }

    if (category === "bible" && /read /i.test(cta)) {
      const nextReadMatch = cta.match(/Read\s+(.+)/i);
      const previousReadMatch = recommendationItem.contextLine.match(/finished\s+(.+?)\./i);
      const nextRead = nextReadMatch?.[1]?.trim() || "your next chapter";
      const previousRead = previousReadMatch?.[1]?.trim();
      return {
        title: "Continue reading the Bible",
        subtitle: previousRead
          ? `You read ${previousRead} last time. Continue with ${nextRead}.`
          : `${nextRead} is ready for you next.`,
      };
    }

    if (category === "bible" && /open the bible/i.test(cta)) {
      return {
        title: "Continue reading the Bible",
        subtitle: "Open the Bible and keep your reading habit moving today.",
      };
    }

    if (category === "trivia" && /play bible trivia/i.test(cta)) {
      return {
        title: "Play a round of Bible Trivia",
        subtitle: "Test your Bible knowledge and see what is sticking from your reading.",
      };
    }

    if ((category === "games" || href.includes("/bible-study-games/scrambled/")) && /play scrambled/i.test(cta)) {
      const scrambledMatch = recommendationItem.contextLine.match(/^You finished\s+(.+?)\s+(\d+)\s+in Scrambled\./i);
      const nextChapterMatch = recommendationItem.recommendationLine.match(/Try\s+(.+?)\s+(\d+)\s+next\./i);
      const scoreMatch = recommendationItem.recommendationLine.match(/You got\s+(\d+)\/(\d+)\s+words right/i);
      const book = scrambledMatch?.[1]?.trim() || nextChapterMatch?.[1]?.trim() || "this book";
      const lastChapter = scrambledMatch?.[2]?.trim() || null;
      const nextChapter = nextChapterMatch?.[2]?.trim() || null;
      const score = scoreMatch ? `${scoreMatch[1]}/${scoreMatch[2]}` : null;

      return {
        title: "Play another round of Scrambled",
        subtitle: score && lastChapter && nextChapter
          ? `Last time you got ${score} for ${book} ${lastChapter}. Try ${book} ${nextChapter} now.`
          : "Jump back into Scrambled and see how many Bible words you can unscramble next.",
      };
    }

    if (category === "group" && /open bible study group/i.test(cta)) {
      return {
        title: "Join the Bible Study Group",
        subtitle: "Follow the live study and see what other Bible Buddies are learning.",
      };
    }

    if (category === "group" && /check group activity/i.test(cta)) {
      return {
        title: "See what is new in your group",
        subtitle: "Open the group and catch up on the latest study conversation.",
      };
    }

    if (category === "reference" && /explore people/i.test(cta)) {
      return {
        title: "Explore another Bible person",
        subtitle: "Learn more about the people behind the story you are reading.",
      };
    }

    if (category === "reference" && /explore places/i.test(cta)) {
      return {
        title: "Explore another Bible place",
        subtitle: "A little context can make the next chapter land more clearly.",
      };
    }

    if (category === "reference" && /explore keywords/i.test(cta)) {
      return {
        title: "Study another Bible keyword",
        subtitle: "Open one more Bible word and make your reading easier to follow.",
      };
    }

    if (category === "upgrade" && /see pro/i.test(cta)) {
      return {
        title: "See what Bible Buddy Pro unlocks",
        subtitle: "Take a look at what opens up when the daily limits are gone.",
      };
    }

    if (recommendationItem.cardTitle || recommendationItem.cardSubtitle) {
      return {
        title: recommendationItem.cardTitle || "Your next step in Bible Buddy",
        subtitle: recommendationItem.cardSubtitle || recommendationItem.recommendationLine,
      };
    }

    let subtitle = recommendationItem.recommendationLine;

    if (/continue day/i.test(cta)) {
      const dayMatch = cta.match(/Day\s+(\d+)/i);
      subtitle = dayMatch
        ? `Continue Day ${dayMatch[1]} of ${devotionalTitle || "your devotional"}.`
        : `Continue ${devotionalTitle || "your devotional"} today.`;
    } else if (/start day/i.test(cta)) {
      subtitle = devotionalTitle
        ? `Start ${devotionalTitle} today.`
        : "Start a devotional today.";
    } else if (/continue reading plan/i.test(cta)) {
      subtitle = "Continue your reading plan where you left off.";
    } else if (/read /i.test(cta)) {
      const readMatch = cta.match(/Read\s+(.+)/i);
      subtitle = readMatch
        ? `Continue reading with ${readMatch[1]}.`
        : "Continue reading in the Bible today.";
    } else if (/view devotionals/i.test(cta)) {
      subtitle = "Continue one of your devotionals today.";
    } else if (/explore people/i.test(cta)) {
      subtitle = "Explore another person in the Bible today.";
    } else if (/explore places/i.test(cta)) {
      subtitle = "Explore another place in the Bible today.";
    } else if (/explore keywords/i.test(cta)) {
      subtitle = "Explore another Bible keyword today.";
    } else if (/do trivia/i.test(cta)) {
      subtitle = "Play a round of Bible trivia today.";
    } else if (/open study group/i.test(cta)) {
      subtitle = "Open this week's live study in your group.";
    } else if (/open bible/i.test(cta)) {
      subtitle = "Continue reading in the Bible today.";
    }

    return {
      title: "Your next step in Bible Buddy",
      subtitle,
    };
  }

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
  const dailyRecommendationCardCopy = buildDailyRecommendationCardCopy(dailyRecommendationCard);
  const inviteLink = typeof window !== "undefined" ? `${window.location.origin}/signup` : "https://www.biblebuddy.com/signup";
  const inviteText = "I've been using Bible Buddy to read and study the Bible. Come join me.";

  async function handleInviteBuddy() {
    if (userId) {
      void trackNavigationActionOnce({
        userId,
        username: userName,
        actionType: ACTION_TYPE.invite_buddy_opened,
        actionLabel: "Invite a Bible Buddy",
        dedupeKey: "dashboard-invite-buddy",
      }).catch((error) => {
        console.error("[NAV] Failed to track invite buddy click:", error);
      });
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Bible Buddy",
          text: inviteText,
          url: inviteLink,
        });
        return;
      } catch {
        // fall through to sms fallback
      }
    }

    if (typeof window !== "undefined") {
      window.location.href = `sms:?&body=${encodeURIComponent(`${inviteText} ${inviteLink}`)}`;
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadDailyRecommendationCard() {
      if (!userId) {
        setDailyRecommendationCard(null);
        return;
      }

      try {
        const { data } = await supabase
          .from("profile_stats")
          .select("level_1_skipped_date")
          .eq("user_id", userId)
          .maybeSingle();

        let suppressLevel1 = false;
        if (data?.level_1_skipped_date) {
          const skippedDate = new Date(data.level_1_skipped_date);
          const diffDays = Math.floor((Date.now() - skippedDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays < 3) suppressLevel1 = true;
        }

        const nextRecommendation = await getDailyRecommendation(userId, suppressLevel1);
        if (!cancelled) setDailyRecommendationCard(nextRecommendation);
      } catch (error) {
        if (!cancelled) {
          console.warn("Error loading daily recommendation card:", error);
          setDailyRecommendationCard(null);
        }
      } finally {
        if (!cancelled) setIsDailyRecommendationLoading(false);
      }
    }

    void loadDailyRecommendationCard();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <>
      {/* Daily Welcome Overlay (isolated, safe) */}
      <DashboardDailyWelcomeModal
        open={showDailyWelcome}
        onClose={handleCloseDailyWelcome}
        isReturningUser={isReturningUser}
        lastAction={lastAction}
        recommendation={recommendation}
        userId={userId}
      />
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

        {renderOwnerQuickStatsRow()}

        {/* DASHBOARD CARDS */}
        <DashboardCards
          profile={profile}
          membershipStatus={membershipStatus ?? ""}
          daysRemaining={daysRemaining}
          isLoadingLevel={isLoadingLevel}
          levelInfo={levelInfo}
          userName={userName}
          handleCardClick={(event, card, href) => handleCardClick(event, card as any, href)}
          setShowLevelInfoModal={setShowLevelInfoModal}
          isLoadingRecommendation={isDailyRecommendationLoading}
          dailyRecommendation={dailyRecommendationCard}
          dailyRecommendationCardTitle={dailyRecommendationCardCopy.title}
          dailyRecommendationCardSubtitle={dailyRecommendationCardCopy.subtitle}
          onInviteBuddy={handleInviteBuddy}
          dashboardTourSpotlight={activeTourKey === "dashboard" ? DASHBOARD_TOUR_STEPS[dashboardTourStep]?.spotlight ?? null : null}
        />
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

        {renderOwnerQuickStatsRow()}

        {/* DASHBOARD CARDS */}
        <DashboardCards
          profile={profile}
          membershipStatus={membershipStatus ?? ""}
          daysRemaining={daysRemaining}
          isLoadingLevel={isLoadingLevel}
          levelInfo={levelInfo}
          userName={userName}
          handleCardClick={(event, card, href) => handleCardClick(event, card as any, href)}
          setShowLevelInfoModal={setShowLevelInfoModal}
          isLoadingRecommendation={isDailyRecommendationLoading}
          dailyRecommendation={dailyRecommendationCard}
          dailyRecommendationCardTitle={dailyRecommendationCardCopy.title}
          dailyRecommendationCardSubtitle={dailyRecommendationCardCopy.subtitle}
          onInviteBuddy={handleInviteBuddy}
          dashboardTourSpotlight={activeTourKey === "dashboard" ? DASHBOARD_TOUR_STEPS[dashboardTourStep]?.spotlight ?? null : null}
        />
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

      {featureToursEnabled && activeTourKey && (
        <FeatureTourModal
          isOpen={true}
          title={activeTourKey === "dashboard" && dashboardTourStep >= 0 ? DASHBOARD_TOUR_STEPS[dashboardTourStep]?.title ?? TOUR_COPY.dashboard.title : TOUR_COPY[activeTourKey].title}
          body={activeTourKey === "dashboard" && dashboardTourStep >= 0 ? DASHBOARD_TOUR_STEPS[dashboardTourStep]?.body ?? TOUR_COPY.dashboard.body : "Do you want me to give you a quick tour of how the app works?"}
          primaryButtonText={
            activeTourKey === "dashboard"
              ? dashboardTourStep < 0
                ? "Yes"
                : "Next"
              : activeTourKey === "bible_trivia"
                ? "Play Now"
                : "Got it"
          }
          secondaryButtonText={activeTourKey === "dashboard" && dashboardTourStep < 0 ? "Later" : undefined}
          onSecondary={activeTourKey === "dashboard" ? handleTourClose : undefined}
          variant={activeTourKey === "dashboard" ? (dashboardTourStep < 0 ? "prompt" : "speech-bubble") : "default"}
          anchorRect={activeTourKey === "dashboard" && dashboardTourStep >= 0 ? dashboardTourAnchor : null}
          canAdvance={activeTourKey === "dashboard" ? dashboardTourCanAdvance : true}
          closeOnBackdrop={!(activeTourKey === "dashboard" && dashboardTourStep >= 0)}
          content={
            activeTourKey === "dashboard"
              ? undefined
              : activeTourKey === "bible"
              ? BIBLE_TOUR_CONTENT
              : activeTourKey === "guided_studies"
              ? GUIDED_STUDIES_TOUR_CONTENT
                : activeTourKey === "bible_references"
                ? BIBLE_REFERENCES_TOUR_CONTENT
              : activeTourKey === "bible_trivia"
              ? BIBLE_TRIVIA_TOUR_CONTENT
                  : activeTourKey === "notes"
                  ? NOTES_TOUR_CONTENT
              : undefined
          }
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
                  <p className="mb-2">You earn weighted points across Bible Buddy, such as:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📖 Finishing a Bible chapter, devotional day, or reading plan chapter</li>
                    <li>👤 Learning people, places, keywords, and taking notes</li>
                    <li>👥 Posting in the group, commenting, and joining community activity</li>
                    <li>❤️ Liking posts or comments, and earning likes from other Buddies</li>
                    <li>🎯 Trivia, study opens, highlights, and other meaningful app actions</li>
                  </ul>
                  <p className="mt-3 text-sm">Bigger study actions are worth more points than lighter actions like likes.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">⚖️ How Points Work</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Higher-point actions</p>
                      <p>Finishing chapters, completing devotionals, reading plans, learning references, and creating notes carry the most weight.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Mid-point actions</p>
                      <p>Posting in the study group, replying to people, opening studies, and community participation all help you level up too.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Lower-point actions</p>
                      <p>Likes still count, but they are worth less than finishing a real study action like a chapter or devotional day.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">Earned engagement counts too</p>
                      <p>If other Buddies like your posts or comments, that also gives you points because your activity is helping the community.</p>
                    </div>
                  </div>
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
                    {LEVEL_DEFINITIONS.map((definition) => (
                      <div key={definition.level} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-900">
                          Level {definition.level} – {definition.levelName}
                          {" "}
                          <span className="text-xs font-medium text-gray-500">
                            ({definition.minPoints.toLocaleString()} to {definition.maxPoints !== null ? definition.maxPoints.toLocaleString() : `${definition.minPoints.toLocaleString()}+`} pts)
                          </span>
                        </p>
                        <p className="text-sm">{definition.identityText}</p>
                      </div>
                    ))}
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


    </div>
    </>
  );
}

