
"use client";
export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import "../../styles/pulse.css";
import DashboardDailyWelcomeModal from "../../components/DashboardDailyWelcomeModal";
import LouisDailyTasksModal, { fetchLouisDailyChecklistData, type ChecklistData, type TaskState } from "../../components/LouisDailyTasksModal";
import { FeatureTourModal } from "../../components/FeatureTourModal";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { getCurrentBook, getCompletedChapters, isBookComplete, getTotalCompletedChapters } from "../../lib/readingProgress";
import { getProfileStats, syncCurrentStreakToProfileStats } from "../../lib/profileStats";
import { getDailyRecommendation, type DailyRecommendation } from "../../lib/dailyRecommendation";
import { buildLouisRecommendationHandoff, storeLouisRouteHandoff } from "../../lib/louisRouteHandoff";
import {
  ensureLouisDailyTaskCycle,
  getBibleBuddyLocalDayKey,
  getLouisDailyTaskCycleStartedAt,
  getLouisDailyTaskTimeLeftMs,
  hasLouisDailyTaskBonusAwarded,
  hasSeenLouisDailyTaskCelebration,
  hasActiveLouisDailyTaskCycle,
  rememberLouisDailyTaskBonusAwarded,
  rememberLouisDailyTaskCelebrationSeen,
} from "../../lib/louisDailyFlow";
import { LouisAvatar } from "../../components/LouisAvatar";
import { ModalShell } from "../../components/ModalShell";
import { triggerPoints } from "../../components/PointsPop";

import AdSlot from "../../components/AdSlot";
import { useFeatureRenderPriority } from "../../components/FeatureRenderPriorityContext";
import { ACTION_TYPE } from "../../lib/actionTypes";
import DashboardJourneyExperience from "../../components/DashboardJourneyExperience";
import DashboardDailyTaskCallout from "../../components/DashboardDailyTaskCallout";
import {
  buildPersistedFeatureTours,
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureTourKey,
  type FeatureToursState,
} from "../../lib/featureTours";
import { LEVEL_DEFINITIONS, calculateWeightedPoints, getLevelInfoFromPoints } from "../../lib/levelSystem";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";

const JESSICA_BONUS_USER_ID = "66c16399-092a-43c0-96c0-e4de78c0debc";
const JESSICA_BONUS_ACTION_LABEL = "admin_bonus_points:1000:jessica-april-2026";
const JESSICA_BONUS_POPUP_KEY = "bb:bonus-popup:jessica-1000:v1";
const ENABLE_DAILY_DASHBOARD_WELCOME_FLOW = true;

const MATTHEW_CHAPTERS = 28;
const TOTAL_ITEMS = MATTHEW_CHAPTERS + 1; // overview + 28 chapters

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
  const router = useRouter();
  const { featureToursEnabled } = useFeatureRenderPriority();
  const [userName, setUserName] = useState<string>("buddy");
  const [userId, setUserId] = useState<string | null>(null);
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
  const [showStreakBadgeModal, setShowStreakBadgeModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showVerseOfTheDayModal, setShowVerseOfTheDayModal] = useState(false);
  const [showStreakMotivationModal, setShowStreakMotivationModal] = useState(false);
  const [showStreakMotivationTaskPrompt, setShowStreakMotivationTaskPrompt] = useState(false);
  const [pendingDailyStreakSequence, setPendingDailyStreakSequence] = useState(false);
  const [showLouisDailyTasksModal, setShowLouisDailyTasksModal] = useState(false);
  const [louisDailyTaskCycleStartedAt, setLouisDailyTaskCycleStartedAt] = useState<string | null>(null);
  const [showDailyTaskCelebrationModal, setShowDailyTaskCelebrationModal] = useState(false);
  const [pendingDailyTaskCelebrationModal, setPendingDailyTaskCelebrationModal] = useState(false);
  const [showJessicaBonusModal, setShowJessicaBonusModal] = useState(false);
  const [hasJessicaBonusAward, setHasJessicaBonusAward] = useState(false);
  const [isLoadingDailyTaskSummary, setIsLoadingDailyTaskSummary] = useState(true);
  const [dailyChecklistData, setDailyChecklistData] = useState<ChecklistData | null>(null);
  const [dailyTaskCompletedCount, setDailyTaskCompletedCount] = useState(0);
  const [dailyTaskTotalCount, setDailyTaskTotalCount] = useState(5);
  const [dailyTaskNextTitle, setDailyTaskNextTitle] = useState<string | null>(null);
  const [dailyTaskSummaryLine, setDailyTaskSummaryLine] = useState<string | null>(null);
  const [selectedDashboardTask, setSelectedDashboardTask] = useState<TaskState | null>(null);
  const dailyTaskPopupOpenRef = useRef(false);
  const [dailyTaskTimeLeftLabel, setDailyTaskTimeLeftLabel] = useState<string | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [proExpiresAt, setProExpiresAt] = useState<string | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [mobileAdDismissed, setMobileAdDismissed] = useState<boolean>(false);
  const [levelRefreshTick, setLevelRefreshTick] = useState(0);
  const [profile, setProfile] = useState<{ is_paid: boolean | null; daily_credits: number | null; last_active_date: string | null; verse_of_the_day_shown?: string | null; current_streak?: number | null; profile_image_url?: string | null; display_name?: string | null; username?: string | null } | null>(null);
  const [primaryRecommendation, setPrimaryRecommendation] = useState<DailyRecommendation | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [featureToursLoaded, setFeatureToursLoaded] = useState(false);
  const [activeTourKey, setActiveTourKey] = useState<FeatureTourKey | null>(null);
  const [pendingTourNavigation, setPendingTourNavigation] = useState<string | null>(null);
  const [isSavingFeatureTour, setIsSavingFeatureTour] = useState(false);
  const [isOwnerDashboard, setIsOwnerDashboard] = useState(false);
  const [ownerQuickStats, setOwnerQuickStats] = useState({
    signups24h: 0,
    activeUsers24h: 0,
    totalUsers: 0,
    upgrades24h: 0,
  });
  const [loadingOwnerQuickStats, setLoadingOwnerQuickStats] = useState(false);

  function getStreakMotivationSeenKey(currentUserId: string, dayKey: string) {
    return `bb:streak-motivation-seen:${currentUserId}:${dayKey}`;
  }

  function getDashboardDailySequenceSeenKey(currentUserId: string, dayKey: string) {
    return `bb:dashboard-daily-sequence-seen:${currentUserId}:${dayKey}`;
  }

  function getStreakPointsShownKey(currentUserId: string, dayKey: string) {
    return `bb:streak-points-shown:${currentUserId}:${dayKey}`;
  }

  function getStreakMotivation(streak: number) {
    const safeStreak = Math.max(0, Math.floor(streak));
    const toFire = Math.max(0, 30 - safeStreak);

    if (safeStreak >= 3650) {
      return {
        headline: `${safeStreak} day streak`,
        body: "Ten years of showing up is wild. This is no longer a phase. This is part of who you are now.",
         followUp: "Do you want to start your Daily Bible Tasks?",
      };
    }

    if (safeStreak === 30) {
      return {
        headline: "You earned the fire badge",
        body: "Congrats, you hit 30 days in a row and unlocked the fire badge. Great job showing up and staying consistent.",
         followUp: "Do you want to start your Daily Bible Tasks?",
      };
    }

    if (safeStreak === 0) {
      return {
        headline: "A fresh start",
        body: "Today is a perfect day to start a new Bible reading streak. One honest day with the Word can become something strong.",
         followUp: "Do you want to start your Daily Bible Tasks?",
      };
    }

    const exactDayMessages: Record<number, string> = {
      1: "Today is a perfect day to start a new Bible reading streak. Day 1 always matters because it means you showed up.",
      2: "Hey, this makes 2 days in a row. You are heating up now, and the habit is already starting to form.",
      3: "Wow, now you're cooking. Three days in a row of taking in the Word is a strong start.",
      4: "Okay, now you're just showing off. Four days in a row is the kind of momentum that changes people.",
      5: "Did you know if you hit 30 days logging in to Bible Buddy you earn the fire badge? You're already 5 days into the climb.",
      6: "Six days in a row is not random anymore. You're building rhythm now.",
      7: "One full week. That's how real consistency starts to look.",
      14: "Two full weeks in a row is strong. Your habit is getting roots now.",
      21: "Three weeks in. At this point you're proving you can live with this kind of consistency.",
      29: "You're right there. One more day and that fire badge is yours.",
    };

    if (exactDayMessages[safeStreak]) {
      return {
        headline: `${safeStreak} day streak`,
        body: exactDayMessages[safeStreak],
         followUp: "Do you want to start your Daily Bible Tasks?",
      };
    }

    const dayMod = safeStreak % 6;
    const phaseTemplates = (() => {
      if (safeStreak < 10) {
        return [
          `You're on day ${safeStreak}, and that early momentum matters more than people think. Keep protecting it.`,
          `${safeStreak} days in a row is a real start. The streak is young, but it's alive now.`,
          `Day ${safeStreak} means you're stacking days now, not just having random good moments.`,
        ];
      }
      if (safeStreak < 30) {
        return [
          `${safeStreak} days in a row is serious progress. Keep going, because you're only ${toFire} day${toFire === 1 ? "" : "s"} from the fire badge.`,
          `This is day ${safeStreak}, and your consistency is getting harder to ignore. The fire badge is coming into view now.`,
          `${safeStreak} days deep means this habit is starting to feel real. Stay with it and the fire badge gets closer fast.`,
        ];
      }
      if (safeStreak < 100) {
        return [
          `${safeStreak} days in a row is strong. You already earned the fire, and now you're building beyond the badge.`,
          `You are ${safeStreak} days into this streak now. That's the kind of consistency that starts shaping a life.`,
          `At ${safeStreak} days, this is bigger than motivation. This is discipline turning into identity.`,
        ];
      }
      if (safeStreak < 365) {
        return [
          `${safeStreak} days in a row is powerful. You're not just visiting the Word now. You're living near it.`,
          `${safeStreak} days deep and still going. That's the kind of faithfulness that keeps changing a person slowly and for real.`,
          `This streak is at ${safeStreak} days now. You have built something steady, and steady is strong.`,
        ];
      }
      return [
        `${safeStreak} days in a row is rare. You've built a long obedience kind of rhythm here.`,
        `You're sitting at ${safeStreak} straight days now. This is what faithfulness looks like over time.`,
        `${safeStreak} days deep means the habit is no longer fragile. It's part of your life now.`,
      ];
    })();

    return {
      headline: `${safeStreak} day streak`,
      body: phaseTemplates[dayMod % phaseTemplates.length],
       followUp: "Do you want to start your Daily Bible Tasks?",
    };
  }

  function formatChapterForSpeech(chapterLabel: string | null | undefined) {
    if (!chapterLabel) return "today's chapter";
    const match = chapterLabel.match(/^(.+)\s+(\d+)$/);
    if (!match) return chapterLabel;
    return `${match[1]} chapter ${match[2]}`;
  }

  function getChapterPreviewLine(task: TaskState | null) {
    const book = String(task?.book || "").toLowerCase();
    const chapter = task?.chapter ?? null;

    if (book === "genesis" && chapter === 39) {
      return "Joseph serves faithfully in Potiphar's house, refuses temptation, and stays faithful even after being falsely accused.";
    }

    if (book === "genesis" && chapter === 40) {
      return "Joseph listens to two troubled prisoners, interprets their dreams, and keeps trusting God while he is still waiting.";
    }

    if (book === "genesis" && chapter === 41) {
      return "Joseph is brought before Pharaoh, explains the dreams, and God lifts him from prison into leadership.";
    }

    if (book === "proverbs") {
      return "This chapter gives practical wisdom for walking with God, making better choices, and guarding your heart.";
    }

    return `This chapter is the focus for the devotional, reading, notes, trivia, and Scrambled today.`;
  }

  function buildDailyStreakTaskIntro(checklistData: ChecklistData | null) {
    const devotionalTask = checklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
    const readingTask = checklistData?.tasks.find((task) => task.kind === "reading") ?? null;
    const devotionalMatch = devotionalTask?.title.match(/^Do Day\s+(\d+)\s+of\s+(.+)$/i);
    const devotionalTitle = devotionalMatch?.[2]?.trim() || "your Bible study";
    const chapterText = formatChapterForSpeech(readingTask?.chapterLabel);

    if (checklistData?.allDone) {
      return {
        focusLine: "You already finished today's Bible study journey.",
        previewLine: "The next set of Bible tasks will unlock when the new daily cycle begins.",
        closingLine: "Nice work showing up and finishing the whole flow.",
      };
    }

    return {
      focusLine: `Today we are continuing ${devotionalTitle} with ${chapterText}.`,
      previewLine: getChapterPreviewLine(readingTask),
      closingLine: "So let's start today's Bible tasks.",
    };
  }

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

  useEffect(() => {
    let cancelled = false;

    async function loadPrimaryRecommendation() {
      if (!userId) return;
      try {
        const recommendation = await getDailyRecommendation(userId);
        if (!cancelled) {
          setPrimaryRecommendation(recommendation);
        }
      } catch (error) {
        console.error("[DASHBOARD] Failed to load primary recommendation:", error);
        if (!cancelled) {
          setPrimaryRecommendation(null);
        }
      }
    }

    void loadPrimaryRecommendation();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const TOUR_COPY: Partial<Record<FeatureTourKey, { title: string; body: string }>> = {
    bible: {
      title: "Welcome to The Bible Section",
      body: "This is where you can start reading Scripture, follow reading plans, and explore books of the Bible.",
    },
    bible_buddy_tv: {
      title: "Welcome to Bible Buddy TV",
      body: "This is where you can watch Bible shows, movies, sermons, documentaries, and animation inside Bible Buddy.",
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
      title: "ðŸŽ® Welcome to Bible Study Games",
      body: "This is where you can reinforce what youâ€™ve learned through trivia and Scripture-based games like Scrambled.",
    },
    notes: {
      title: "Welcome to Notes",
      body: "Use this section to capture insights, organize your study thoughts, and keep track of what God is teaching you.",
    },
    chat_widget: {
      title: "Welcome to Chat with Louis",
      body: "This chat lets you ask Bible questions instantly while you study so you can stay focused in your reading flow. Louis has been carefully trained for hours on biblical content and designed to search Scripture, filter out nonsense, and prioritize clear, Scripture-grounded answers. Itâ€™s like having a Bible study partner built directly into your reading experience.",
    },
    bible_study_hub: {
      title: "Welcome to Bible Study Tools",
      body: "Join the discussion and explore the Bible by topic. Dive into insights, tools, and foundational studies to grow your understanding.",
    },
  };

  const DASHBOARD_TOUR_CONTENT = (
    <div className="space-y-5">
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is your home base inside Bible Buddy. Everything starts here.
      </p>

      <div className="space-y-5">
        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🏆 Your Level</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            The first card you have is your level. Everything you do inside Bible Buddy gives you points, and those points help you level up.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📖 The Bible</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is your full Bible reader where you can highlight, save, and interact with the Word of God.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">👥 Bible Study Group</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you interact with other Bible Buddies inside of the app. We study the Bible together in the weekly series and daily conversations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🛠️ Bible Study Tools</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you can access all our Bible study tools, including devotionals, reading plans, and keyword databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">📺 Bible Buddy TV</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            This is where you can stream Bible shows, movies, sermons, documentaries, and more.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🎮 Bible Study Games</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Play our Bible-based games, including trivia and Scrabble-style challenges.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">🤝 Share Bible Buddy</h2>
          <p className="text-sm md:text-[15px] text-gray-600 leading-7">
            Do you think you know somebody else who would like to be a Bible Buddy? Then click this button to share the app with them.
          </p>
        </section>
      </div>

      <p className="text-sm md:text-[15px] font-medium text-gray-700 leading-7">
        👉 Just click one of the cards to start.
      </p>
    </div>
  );

  const BIBLE_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ“– The Bible
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        This is where you read Scripture inside Bible Buddy.
        <br />
        Everything is designed to keep your reading, progress, and notes in one place.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ”¤ Choose Your Translation</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Select from three translations:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ WEB â€“ World English Bible</li>
          <li>â€¢ ASV â€“ American Standard Version</li>
          <li>â€¢ KJV â€“ King James Version</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can switch translations anytime while reading.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“š Browse the Books</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ View books in Biblical order</li>
          <li>â€¢ Or sort them Alphabetically</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Click any book to see its chapters.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Read a Chapter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you open a chapter, youâ€™ll see:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ A short overview from Little Louis explaining whatâ€™s happening</li>
          <li>â€¢ The full chapter text</li>
          <li>â€¢ Verse numbers for easy reference</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Everything stays clean and distraction-free.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">â¬…ï¸âž¡ï¸ Navigate Easily</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Under each chapter you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Go to the Previous or Next chapter</li>
          <li>â€¢ Return to the book overview</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Go Deeper</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Below the chapter, you can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Tap â€œRead [Chapter] Notesâ€ for a full breakdown</li>
          <li>â€¢ Tap â€œTake Notesâ€ to write your own thoughts</li>
          <li>â€¢ Mark the chapter as Completed</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Completed chapters appear highlighted so you can track your progress.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ¤– Use Little Louis Anytime</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Tap the chat icon to ask questions about:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Scripture</li>
          <li>â€¢ History</li>
          <li>â€¢ Context</li>
          <li>â€¢ Meaning</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Your AI Bible Buddy is always available.</p>
      </section>
    </div>
  );

  const GUIDED_STUDIES_TOUR_CONTENT = (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        ðŸ”¨ Bible Study Tools
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Structured ways to go deeper in Scripture.
        <br />
        Choose the format that fits how you like to learn.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Bible Reading Plans</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Reading Plans guide you through Scripture in a structured order.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Instead of choosing randomly, you follow a clear path â€” whether thatâ€™s reading the entire Bible, focusing on specific themes, or moving through the story in a logical flow.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Pick a plan, follow the chapters, and let your progress build over time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸŒ… Devotionals</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Devotionals are short, focused daily readings.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Each devotional includes:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ A selected passage</li>
          <li>â€¢ Reflection or explanation</li>
          <li>â€¢ Practical application</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Theyâ€™re designed to help you stay consistent and connect Scripture to everyday life.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸŽ¯ Choose Your Style</h2>
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
        ðŸ“š Welcome to Bible References
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Most people understand the overall story of the Bible.
      </p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        But deep understanding comes from knowing the people, places, and key words behind the story.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ‘¤ People</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Explore thousands of biblical figures.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Learn:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Who they were</li>
          <li>â€¢ Where they lived</li>
          <li>â€¢ What role they played</li>
          <li>â€¢ How they connect to the bigger story</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Understanding the people brings Scripture to life.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“ Places</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">The Bible happened in real locations.</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">See:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Cities</li>
          <li>â€¢ Regions</li>
          <li>â€¢ Nations</li>
          <li>â€¢ Geographic context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Knowing where events happened helps you understand why they happened.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ”‘ Key Words</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Many powerful truths in Scripture depend on specific words.
        </p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Important biblical terms</li>
          <li>â€¢ Repeated themes</li>
          <li>â€¢ Cultural meanings</li>
          <li>â€¢ Original context</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          You cannot fully grasp the message if you donâ€™t understand the words.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Go Deeper</h2>
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
        ðŸ“ Welcome to Notes
      </h1>

      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Reading Scripture is powerful.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">Writing it down makes it transformational.</p>
      <p className="text-sm md:text-[15px] text-gray-600 leading-7">
        Taking notes helps you slow down, reflect, and truly understand what youâ€™re reading.
      </p>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">âœï¸ Why Notes Matter</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">When you write:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ You process Scripture more deeply</li>
          <li>â€¢ You remember what you study</li>
          <li>â€¢ You see patterns and connections</li>
          <li>â€¢ You build your own personal commentary over time</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          Faith grows when reflection becomes intentional.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“š Two Ways to Take Notes</h2>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Guided Notes (GROW Method)</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Use the GROW method to structure your study:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ G â€” Get the passage</li>
          <li>â€¢ R â€” Research the context</li>
          <li>â€¢ O â€” Observe what stands out</li>
          <li>â€¢ W â€” Write your reflection</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          This helps you go deeper instead of just reading quickly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ—’ Free Form Notes</h2>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">Prefer to write freely?</p>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">You can:</p>
        <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
          <li>â€¢ Create personal reflections</li>
          <li>â€¢ Record prayers</li>
          <li>â€¢ Write sermon notes</li>
          <li>â€¢ Capture insights while reading</li>
        </ul>
        <p className="text-sm md:text-[15px] text-gray-600 leading-7">
          No structure required â€” just your thoughts and Scripture.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ” Your Notes Stay Organized</h2>
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

        const [signupsResult, actionsResult, upgradesResult, totalUsersResponse] = await Promise.all([
          supabase
            .from("user_signups")
            .select("id", { count: "exact", head: true })
            .gte("created_at", fromDate),
          supabase
            .from("master_actions")
            .select("user_id")
            .gte("created_at", fromDate),
          supabase
            .from("master_actions")
            .select("id", { count: "exact", head: true })
            .eq("action_type", "user_upgraded")
            .gte("created_at", fromDate),
          fetch("/api/admin/total-users"),
        ]);

        if (signupsResult.error || actionsResult.error || upgradesResult.error || !totalUsersResponse.ok) {
          console.error("[DASHBOARD_OWNER_STATS] Error loading quick stats:", {
            signupsError: signupsResult.error,
            actionsError: actionsResult.error,
            upgradesError: upgradesResult.error,
            totalUsersError: totalUsersResponse.ok ? null : totalUsersResponse.statusText,
          });
          setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0, upgrades24h: 0 });
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
          upgrades24h: upgradesResult.count ?? 0,
        });
      } catch (error) {
        console.error("[DASHBOARD_OWNER_STATS] Unexpected error:", error);
        setOwnerQuickStats({ signups24h: 0, activeUsers24h: 0, totalUsers: 0, upgrades24h: 0 });
      }
      setLoadingOwnerQuickStats(false);
    }

    void loadOwnerQuickStats();
  }, [isOwnerDashboard]);

  function renderOwnerQuickStatsRow() {
    if (isOwnerDashboard) {
      return (
        <div className="mb-4">
          <Link href="/admin/analytics" className="block">
            <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md sm:gap-3 sm:p-3">
              {[
                { label: "Signups 24h", value: ownerQuickStats.signups24h, tones: "bg-gray-100 border-gray-200" },
                { label: "Active 24h", value: ownerQuickStats.activeUsers24h, tones: "bg-blue-100 border-blue-200" },
                { label: "Upgrades", value: ownerQuickStats.upgrades24h, tones: "bg-emerald-100 border-emerald-200" },
                { label: "Total Users", value: ownerQuickStats.totalUsers, tones: "bg-red-100 border-red-200" },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`rounded-xl border px-1.5 py-2 text-center sm:px-3 sm:py-4 ${card.tones}`}
                >
                  <p className="text-lg font-bold text-gray-900 sm:text-2xl">
                    {loadingOwnerQuickStats ? "..." : card.value}
                  </p>
                  <p className="mt-1 text-[9px] font-medium leading-tight text-gray-700 sm:text-xs">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </Link>
        </div>
      );
    }

    if (membershipStatus !== "pro" && profile?.is_paid !== true) {
      return (
        <div className="mb-4">
          <div className="mx-auto max-w-xl">
            <Link href="/upgrade" className="block">
              <div className="relative cursor-pointer rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] px-4 py-3 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#b7791f]" aria-hidden="true">
                  ↑
                </span>
                <div className="flex items-center gap-3 pr-7">
                  <div className="text-xl leading-none">👑</div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#8a4b14]">Go Deeper With Pro</p>
                    <p className="text-xs leading-relaxed text-gray-600">
                      Unlock the full devotional library and remove the daily credit wall.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    }

    return null;
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
        setPendingTourNavigation(null);
        return;
      }

      if (!data) {
        const { error: upsertError } = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: userId,
              feature_tours: buildPersistedFeatureTours(),
            },
            { onConflict: "user_id" }
          );

        if (upsertError) {
          console.error("[FEATURE_TOURS] Error creating profile_stats row for tours:", upsertError);
        }

        setFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setFeatureToursLoaded(true);
        setPendingTourNavigation(null);
        return;
      }

      const normalizedFeatureTours = normalizeFeatureTours(data.feature_tours);
      setFeatureTours(normalizedFeatureTours);
      setFeatureToursLoaded(true);
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
    if (!featureToursEnabled || !featureToursLoaded || activeTourKey || !userId) return;
    if (featureTours.dashboard !== true) {
      setPendingTourNavigation(null);
    }
  }, [activeTourKey, featureTours, featureToursEnabled, featureToursLoaded, userId]);

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
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[FEATURE_TOURS] Error updating feature_tours:", updateError);

      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
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

  async function handleCardClick(
    event: MouseEvent<HTMLAnchorElement>,
    tourKey: FeatureTourKey | "bible_buddy_tv" | "recommendation",
    path: string
  ) {
    const dashboardCardLabelMap: Partial<Record<FeatureTourKey | "bible_buddy_tv" | "recommendation", string>> = {
      bible: "The Bible",
      bible_study_hub: "Bible Study Group",
      guided_studies: "Bible Study Tools",
      bible_buddy_tv: "Bible Buddy TV",
      bible_trivia: "Bible Study Games",
      recommendation: "Recommended For You",
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

    event.preventDefault();

    if (tourKey === "recommendation" && primaryRecommendation) {
      const handoff = await buildLouisRecommendationHandoff(primaryRecommendation);
      if (handoff) {
        storeLouisRouteHandoff(handoff);
      }
    }

    router.push(path);
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
  const refreshLevelData = useCallback(() => {
    setLevelRefreshTick((value) => value + 1);
  }, []);

  const openLevelInfoModal = useCallback(() => {
    refreshLevelData();
    setShowLevelInfoModal(true);
  }, [refreshLevelData]);

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
          .select("total_actions, is_paid, daily_credits, last_active_date, verse_of_the_day_shown, current_streak, profile_image_url, display_name, username")
          .eq("user_id", userId)
          .maybeSingle();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        const profileData = data;
        const streakData = await syncCurrentStreakToProfileStats(userId).catch((error) => {
          console.error("[DASHBOARD] Failed to sync streak:", error);
          return null;
        });
        const resolvedCurrentStreak = streakData?.currentStreak ?? profileData?.current_streak ?? 0;
        setProfile({
          is_paid: profileData?.is_paid === true,
          daily_credits:
            typeof resetJson.daily_credits === "number"
              ? resetJson.daily_credits
              : typeof profileData?.daily_credits === "number"
                ? profileData.daily_credits
                : 0,
          last_active_date: profileData?.last_active_date ?? null,
          verse_of_the_day_shown: profileData?.verse_of_the_day_shown ?? null,
          current_streak: resolvedCurrentStreak,
          profile_image_url: profileData?.profile_image_url ?? null,
          display_name: profileData?.display_name ?? null,
          username: profileData?.username ?? null,
        });

        const [
          actionsResult,
          groupPostsResult,
          groupLikeGivenResult,
          feedPostsResult,
          peopleProgressResult,
          placesProgressResult,
          keywordsProgressResult,
        ] = await Promise.all([
          supabase
            .from("master_actions")
            .select("action_type, action_label")
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
          supabase
            .from("people_progress")
            .select("person_name", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("places_progress")
            .select("place_name", { count: "exact", head: true })
            .eq("user_id", userId),
          supabase
            .from("keywords_progress")
            .select("keyword_name", { count: "exact", head: true })
            .eq("user_id", userId),
        ]);

        const adminBonusActionRows = (actionsResult.data || []).filter((row) =>
          row?.action_label === JESSICA_BONUS_ACTION_LABEL,
        );
        if (!didCancel) {
          setHasJessicaBonusAward(adminBonusActionRows.length > 0);
        }

        const manualBonusPoints = adminBonusActionRows.reduce((total, row) => {
          const match = typeof row?.action_label === "string"
            ? row.action_label.match(/^admin_bonus_points:(\d+):/)
            : null;
          return total + (match ? Number(match[1]) || 0 : 0);
        }, 0);

        const streakAwardedPoints = (actionsResult.data || []).reduce((total, row) => {
          const match = typeof row?.action_label === "string"
            ? row.action_label.match(/^streak_day:(\d+):\d{4}-\d{2}-\d{2}$/)
            : null;
          return total + (match ? Number(match[1]) || 0 : 0);
        }, 0);

        const duplicateEntityViewActionTypes = new Set<string>([
          ACTION_TYPE.person_viewed,
          ACTION_TYPE.place_viewed,
          ACTION_TYPE.keyword_viewed,
        ]);

        const actionTypes = (actionsResult.data || [])
          .filter((row) => row?.action_label !== JESSICA_BONUS_ACTION_LABEL)
          .filter((row) => !duplicateEntityViewActionTypes.has(row?.action_type || ""))
          .filter((row) => {
            if (row?.action_type !== ACTION_TYPE.scrambled_word_answered) return true;
            return typeof row?.action_label === "string" ? !row.action_label.includes("[no-point]") : true;
          })
          .map((row) => row.action_type)
          .filter((actionType): actionType is string => typeof actionType === "string" && actionType !== "group_message_sent");

        const uniqueEntityPoints =
          (peopleProgressResult.count || 0) +
          (placesProgressResult.count || 0) +
          (keywordsProgressResult.count || 0);

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
          streakBonusPoints: streakAwardedPoints,
          manualBonusPoints,
        });

        const levelData = getLevelInfoFromPoints(weightedPoints.totalPoints + uniqueEntityPoints);
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
            "Context matters â€” and you see it.",
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
  }, [userId, levelRefreshTick]);

  useEffect(() => {
    function handlePointsChange() {
      refreshLevelData();
    }

    function handleStudyProgressChange() {
      refreshLevelData();
    }

    function handleVisibilityChange() {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        refreshLevelData();
      }
    }

    function handleWindowFocus() {
      refreshLevelData();
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === "bb:last-study-progress-change") {
        refreshLevelData();
      }
    }

    if (typeof document !== "undefined") {
      document.addEventListener("bb:points", handlePointsChange as EventListener);
      document.addEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
      window.addEventListener("focus", handleWindowFocus);
      window.addEventListener("storage", handleStorage);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("bb:points", handlePointsChange as EventListener);
        document.removeEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("bb:study-progress-changed", handleStudyProgressChange as EventListener);
        window.removeEventListener("focus", handleWindowFocus);
        window.removeEventListener("storage", handleStorage);
      }
    };
  }, [refreshLevelData]);

  useEffect(() => {
    if (typeof window === "undefined" || userId !== JESSICA_BONUS_USER_ID || !hasJessicaBonusAward) return;
    if (window.localStorage.getItem(JESSICA_BONUS_POPUP_KEY) === "1") return;
    setShowJessicaBonusModal(true);
  }, [hasJessicaBonusAward, userId]);

  useEffect(() => {
    if (!userId || !profile) return;
    if (!ENABLE_DAILY_DASHBOARD_WELCOME_FLOW) {
      setShowVerseOfTheDayModal(false);
      setPendingDailyStreakSequence(false);
      return;
    }
    const today = getBibleBuddyLocalDayKey();
    const dailySequenceSeenKey = getDashboardDailySequenceSeenKey(userId, today);
    setShowVerseOfTheDayModal(false);
    setPendingDailyStreakSequence(
      typeof window !== "undefined" && window.localStorage.getItem(dailySequenceSeenKey) !== "1",
    );
  }, [userId, profile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dispatchEvent(
      new CustomEvent("bb:dashboard-verse-modal-state", {
        detail: { open: showVerseOfTheDayModal },
      }),
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("bb:dashboard-verse-modal-state", {
          detail: { open: false },
        }),
      );
    };
  }, [showVerseOfTheDayModal]);

  useEffect(() => {
    if (!ENABLE_DAILY_DASHBOARD_WELCOME_FLOW) return;
    if (
      !userId ||
      !profile ||
      !pendingDailyStreakSequence ||
      showVerseOfTheDayModal ||
      typeof window === "undefined"
    ) return;
    const cycleStartedAt = hasActiveLouisDailyTaskCycle(userId)
      ? getLouisDailyTaskCycleStartedAt(userId)
      : ensureLouisDailyTaskCycle(userId);
    if (!cycleStartedAt) {
      setPendingDailyStreakSequence(false);
      return;
    }

    const dayKey = getBibleBuddyLocalDayKey();
    const seenKey = getStreakMotivationSeenKey(userId, dayKey);
    const dailySequenceSeenKey = getDashboardDailySequenceSeenKey(userId, dayKey);
    if (window.localStorage.getItem(dailySequenceSeenKey) === "1") {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      return;
    }
    if (window.localStorage.getItem(seenKey) === "1") {
      window.localStorage.setItem(dailySequenceSeenKey, "1");
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
      setPendingDailyStreakSequence(false);
      return;
    }

    setLouisDailyTaskCycleStartedAt(cycleStartedAt);
    setShowStreakMotivationTaskPrompt(true);
    setShowStreakMotivationModal(true);
    const streakPointsShownKey = getStreakPointsShownKey(userId, dayKey);
    if (window.localStorage.getItem(streakPointsShownKey) !== "1") {
      const streakPoints = Math.min(30, Math.max(0, profile.current_streak ?? 0));
      if (streakPoints > 0) {
        triggerPoints(streakPoints);
      }
      window.localStorage.setItem(streakPointsShownKey, "1");
    }
    window.localStorage.setItem(seenKey, "1");
    window.localStorage.setItem(dailySequenceSeenKey, "1");
    setPendingDailyStreakSequence(false);
  }, [userId, profile, pendingDailyStreakSequence, showVerseOfTheDayModal]);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    const existingCycle = getLouisDailyTaskCycleStartedAt(userId);
    if (existingCycle) {
      setLouisDailyTaskCycleStartedAt(existingCycle);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || !louisDailyTaskCycleStartedAt) {
      setDailyTaskTimeLeftLabel(null);
      return;
    }
    const currentUserId = userId;

    function formatTimeLeft(ms: number) {
      const totalMinutes = Math.max(0, Math.floor(ms / 60000));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      if (hours <= 0) return `${minutes}m`;
      return `${hours}h ${minutes}m`;
    }

    function updateTimeLeft() {
      setDailyTaskTimeLeftLabel(formatTimeLeft(getLouisDailyTaskTimeLeftMs(currentUserId)));
    }

    updateTimeLeft();
    const interval = window.setInterval(updateTimeLeft, 30000);
    return () => window.clearInterval(interval);
  }, [userId, louisDailyTaskCycleStartedAt]);

  useEffect(() => {
    dailyTaskPopupOpenRef.current = Boolean(selectedDashboardTask) || showLouisDailyTasksModal;
  }, [selectedDashboardTask, showLouisDailyTasksModal]);

  useEffect(() => {
    if (
      !pendingDailyTaskCelebrationModal ||
      dailyTaskPopupOpenRef.current ||
      !userId ||
      !louisDailyTaskCycleStartedAt ||
      hasSeenLouisDailyTaskCelebration(userId, louisDailyTaskCycleStartedAt)
    ) {
      return;
    }

    rememberLouisDailyTaskCelebrationSeen(userId, louisDailyTaskCycleStartedAt);
    setPendingDailyTaskCelebrationModal(false);
    setShowDailyTaskCelebrationModal(true);
  }, [pendingDailyTaskCelebrationModal, selectedDashboardTask, showLouisDailyTasksModal, userId, louisDailyTaskCycleStartedAt]);

  const loadDailyTaskSummary = useCallback(async () => {
    if (!userId || !profile || !louisDailyTaskCycleStartedAt) {
      setIsLoadingDailyTaskSummary(false);
      setDailyChecklistData(null);
      setDailyTaskCompletedCount(0);
      setDailyTaskTotalCount(5);
      setDailyTaskNextTitle(null);
      setDailyTaskSummaryLine(null);
      return;
    }

    setIsLoadingDailyTaskSummary(true);

    try {
      const checklistData = await fetchLouisDailyChecklistData(
        userId,
        profile.current_streak ?? 0,
        louisDailyTaskCycleStartedAt,
      );
      setDailyChecklistData(checklistData);
      setDailyTaskCompletedCount(checklistData.completedCount);
      setDailyTaskTotalCount(checklistData.tasks.length || 5);
      setDailyTaskNextTitle(checklistData.nextTaskTitle);
      setDailyTaskSummaryLine(checklistData.summaryLine);
      if (
        checklistData.allDone &&
        louisDailyTaskCycleStartedAt &&
        !hasSeenLouisDailyTaskCelebration(userId, louisDailyTaskCycleStartedAt)
      ) {
        if (!hasLouisDailyTaskBonusAwarded(userId, louisDailyTaskCycleStartedAt)) {
          rememberLouisDailyTaskBonusAwarded(userId, louisDailyTaskCycleStartedAt);
          triggerPoints(10);
        }
        if (dailyTaskPopupOpenRef.current) {
          setPendingDailyTaskCelebrationModal(true);
        } else {
          rememberLouisDailyTaskCelebrationSeen(userId, louisDailyTaskCycleStartedAt);
          setShowDailyTaskCelebrationModal(true);
        }
      }
    } catch (error) {
      console.error("[DASHBOARD] Could not load daily task summary:", error);
      setDailyChecklistData(null);
      setDailyTaskCompletedCount(0);
      setDailyTaskTotalCount(5);
      setDailyTaskNextTitle(null);
      setDailyTaskSummaryLine(null);
    } finally {
      setIsLoadingDailyTaskSummary(false);
    }
  }, [louisDailyTaskCycleStartedAt, profile, userId]);

  useEffect(() => {
    void loadDailyTaskSummary();
  }, [loadDailyTaskSummary]);

  useEffect(() => {
    function refreshDailyTaskSummary() {
      void loadDailyTaskSummary();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void loadDailyTaskSummary();
      }
    }

    window.addEventListener("focus", refreshDailyTaskSummary);
    window.addEventListener("bb:daily-task-progress-updated", refreshDailyTaskSummary);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshDailyTaskSummary);
      window.removeEventListener("bb:daily-task-progress-updated", refreshDailyTaskSummary);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadDailyTaskSummary]);

  useEffect(() => {
    function handleOpenLevelInfo() {
      openLevelInfoModal();
    }

    function handleOpenStreakInfo() {
      setShowStreakMotivationTaskPrompt(false);
      setShowStreakMotivationModal(true);
    }

    function handleOpenDailyTasks() {
      if (userId) {
        const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId) ?? ensureLouisDailyTaskCycle(userId);
        if (cycleStartedAt) {
          setLouisDailyTaskCycleStartedAt(cycleStartedAt);
        }
      }
      setShowLouisDailyTasksModal(true);
    }

    window.addEventListener("bb:dashboard-open-level-info", handleOpenLevelInfo);
    window.addEventListener("bb:dashboard-open-streak-info", handleOpenStreakInfo);
    window.addEventListener("bb:dashboard-open-daily-tasks", handleOpenDailyTasks);

    return () => {
      window.removeEventListener("bb:dashboard-open-level-info", handleOpenLevelInfo);
      window.removeEventListener("bb:dashboard-open-streak-info", handleOpenStreakInfo);
      window.removeEventListener("bb:dashboard-open-daily-tasks", handleOpenDailyTasks);
    };
  }, [openLevelInfoModal, userId]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("bb:dashboard-stats-sync", {
        detail: {
          level: levelInfo?.level ?? 1,
          streak: profile?.current_streak ?? 0,
        },
      }),
    );
  }, [levelInfo?.level, profile?.current_streak]);

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

  function handleOpenDailyTasksModal() {
    const cycleStartedAt = userId
      ? getLouisDailyTaskCycleStartedAt(userId) ?? ensureLouisDailyTaskCycle(userId)
      : null;
    if (cycleStartedAt) {
      setLouisDailyTaskCycleStartedAt(cycleStartedAt);
    }
    setShowLouisDailyTasksModal(true);
  }

  function handleDailyJourneyTaskClick(task: TaskState) {
    if (task.disabled) return;
    setSelectedDashboardTask(task);
  }

  const exploreLinks = [
    {
      key: "bible",
      title: "The Bible",
      subtitle: "Read the complete Bible here",
      href: "/reading",
      eyebrow: "Scripture",
      emoji: "📖",
      accent: "border-blue-200 bg-blue-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible", "/reading"),
    },
    {
      key: "group",
      title: "Bible Study Group",
      subtitle: "Study the Bible with us",
      href: "/study-groups",
      eyebrow: "Community",
      emoji: "👥",
      accent: "border-[#b8ddb8] bg-[#d4ecd4]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_study_hub", "/study-groups"),
    },
    {
      key: "tools",
      title: "Bible Study Tools",
      subtitle: "A collection of Bible study tools",
      href: "/guided-studies",
      eyebrow: "Study Tools",
      emoji: "🛠️",
      accent: "border-[#e8aeb5] bg-[#f6d6d9]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "guided_studies", "/guided-studies"),
    },
    {
      key: "tv",
      title: "Bible Buddy TV",
      subtitle: "Stream Bible shows, movies, sermons, and more",
      href: "/biblebuddy-tv",
      eyebrow: "Watch",
      emoji: "📺",
      accent: "border-violet-200 bg-[#efe7ff]",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_buddy_tv", "/biblebuddy-tv"),
    },
    {
      key: "games",
      title: "Bible Study Games",
      subtitle: "Play our Bible-based games",
      href: "/bible-study-games",
      eyebrow: "Play",
      emoji: "🎮",
      accent: "border-emerald-200 bg-emerald-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => void handleCardClick(event, "bible_trivia", "/bible-study-games"),
    },
    {
      key: "share",
      title: "Share Bible Buddy",
      subtitle: "Share by text, WhatsApp, or copy link.",
      href: "#share-bible-buddy",
      eyebrow: "Invite",
      emoji: "↗",
      accent: "border-gray-300 bg-gray-100",
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        void handleInviteBuddy();
      },
    },
  ];

  const streakMotivation = getStreakMotivation(profile?.current_streak ?? 0);
  const dailyStreakTaskIntro = buildDailyStreakTaskIntro(dailyChecklistData);

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f5f8ff_0%,#eef4ff_45%,#fbf8ef_100%)] pb-12">
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

        {/* MAIN CONTENT â€“ CENTERED COLUMN */}
        <div className="flex-1 max-w-2xl mx-auto">
        {renderOwnerQuickStatsRow()}

        <DashboardJourneyExperience
          userId={userId}
          userName={userName}
          profile={profile}
          levelInfo={levelInfo}
          primaryRecommendation={primaryRecommendation}
          checklistData={dailyChecklistData}
          isLoadingChecklist={isLoadingDailyTaskSummary}
          dailyTaskTimeLeftLabel={dailyTaskTimeLeftLabel}
          membershipStatus={membershipStatus}
          daysRemaining={daysRemaining}
          exploreLinks={exploreLinks}
          onOpenLevelInfo={openLevelInfoModal}
          onOpenStreakInfo={() => {
            setShowStreakMotivationTaskPrompt(false);
            setShowStreakMotivationModal(true);
          }}
          onOpenDailyTasks={handleOpenDailyTasksModal}
          onTaskClick={handleDailyJourneyTaskClick}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          onDevotionalChanged={() => {
            void loadDailyTaskSummary();
          }}
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
      <div className="lg:hidden max-w-2xl mx-auto px-4 mt-8">
        {renderOwnerQuickStatsRow()}

        <DashboardJourneyExperience
          userId={userId}
          userName={userName}
          profile={profile}
          levelInfo={levelInfo}
          primaryRecommendation={primaryRecommendation}
          checklistData={dailyChecklistData}
          isLoadingChecklist={isLoadingDailyTaskSummary}
          dailyTaskTimeLeftLabel={dailyTaskTimeLeftLabel}
          membershipStatus={membershipStatus}
          daysRemaining={daysRemaining}
          exploreLinks={exploreLinks}
          onOpenLevelInfo={openLevelInfoModal}
          onOpenStreakInfo={() => {
            setShowStreakMotivationTaskPrompt(false);
            setShowStreakMotivationModal(true);
          }}
          onOpenDailyTasks={handleOpenDailyTasksModal}
          onTaskClick={handleDailyJourneyTaskClick}
          cycleStartedAt={louisDailyTaskCycleStartedAt}
          onDevotionalChanged={() => {
            void loadDailyTaskSummary();
          }}
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

      {/* Level Info Modal */}
        <DashboardDailyWelcomeModal
          open={ENABLE_DAILY_DASHBOARD_WELCOME_FLOW && showVerseOfTheDayModal}
          onClose={() => {
            const today = getBibleBuddyLocalDayKey();
            setShowVerseOfTheDayModal(false);
            setProfile((prev) => (prev ? { ...prev, verse_of_the_day_shown: today } : prev));
            setPendingDailyStreakSequence(true);
          }}
        isReturningUser={true}
        userId={userId}
      />

        <ModalShell
          isOpen={ENABLE_DAILY_DASHBOARD_WELCOME_FLOW && showStreakMotivationModal && !showVerseOfTheDayModal}
          onClose={() => {
            setShowStreakMotivationModal(false);
            setShowStreakMotivationTaskPrompt(false);
          }}
          backdropColor="bg-black/45"
        >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-6 py-7 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood={(profile?.current_streak ?? 0) >= 30 ? "stareyes" : "wave"} size={66} />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#5f86bd]">
              Daily Streak
            </p>
              <h2 className="mt-2 flex items-center justify-center gap-2 text-3xl font-bold text-[#21304f]">
                <span
                  className={`leading-none ${(profile?.current_streak ?? 0) >= 30 ? "" : "grayscale opacity-60"}`}
                  aria-hidden="true"
                >
                  🔥
                </span>
                <span>{streakMotivation.headline}</span>
              </h2>
            <p className="mt-3 text-sm leading-7 text-[#4f678e]">
              {streakMotivation.body}
            </p>
              {showStreakMotivationTaskPrompt && (
                <>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#355487]">
                    {dailyStreakTaskIntro.focusLine}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4f678e]">
                    {dailyStreakTaskIntro.previewLine}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#355487]">
                    {dailyStreakTaskIntro.closingLine}
                  </p>
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowStreakMotivationModal(false);
                        setShowStreakMotivationTaskPrompt(false);
                      }}
                      className="inline-flex min-w-[140px] justify-center rounded-full bg-[#7BAFD4] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalShell>

      <LouisDailyTasksModal
        open={showLouisDailyTasksModal && !showVerseOfTheDayModal && !showStreakMotivationModal}
        onClose={() => {
          setShowLouisDailyTasksModal(false);
          void loadDailyTaskSummary();
        }}
        userId={userId}
        currentStreak={profile?.current_streak ?? 0}
        cycleStartedAt={louisDailyTaskCycleStartedAt}
      />

      <DashboardDailyTaskCallout
        task={selectedDashboardTask}
        userId={userId}
        onClose={() => setSelectedDashboardTask(null)}
        onProgressUpdated={() => {
          void loadDailyTaskSummary();
        }}
      />

      <ModalShell
        isOpen={showDailyTaskCelebrationModal}
        onClose={() => setShowDailyTaskCelebrationModal(false)}
        backdropColor="bg-black/45"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#edf5ff] via-[#f8fbff] to-[#eef7ff] px-6 py-8 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="wave" size={68} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#21304f]">Congrats!</h2>
            <p className="mt-3 text-base font-semibold text-[#355487]">
              You completed today&apos;s Bible task.
            </p>
              <p className="mt-2 text-sm leading-6 text-[#58709d]">
               All 5 tasks are done and your +10 bonus is locked in for this 24-hour cycle.
              </p>
            <button
              type="button"
              onClick={() => setShowDailyTaskCelebrationModal(false)}
              className="mt-5 inline-flex rounded-full bg-[#7aa7df] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
            >
              OK
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showJessicaBonusModal}
        onClose={() => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(JESSICA_BONUS_POPUP_KEY, "1");
          }
          setShowJessicaBonusModal(false);
        }}
        backdropColor="bg-black/50"
      >
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d7e4f7] bg-white shadow-2xl">
          <div className="bg-gradient-to-br from-[#fff7d9] via-[#fffdf4] to-[#fff1c2] px-6 py-8 text-center">
            <div className="flex justify-center">
              <LouisAvatar mood="stareyes" size={72} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#2b3550]">Hey Jessica</h2>
            <p className="mt-3 text-base leading-7 text-[#5b6480]">
              You have been awarded <span className="font-bold text-[#1f2937]">1000 bonus points</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.setItem(JESSICA_BONUS_POPUP_KEY, "1");
                }
                setShowJessicaBonusModal(false);
              }}
              className="mt-6 inline-flex rounded-full bg-[#7aa7df] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f93d3]"
            >
              Close
            </button>
          </div>
        </div>
      </ModalShell>

      {showLevelInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">How Levels Work in Bible Buddy</h2>
                <button
                  onClick={() => setShowLevelInfoModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6 text-gray-700">
                {isLoadingLevel ? (
                  <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Loading your latest level points...</p>
                  </div>
                ) : levelInfo ? (
                  <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">
                          Your Level
                        </p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">
                          Level {levelInfo.level} Bible Buddy
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {levelInfo.totalPoints.toLocaleString()} total points
                        </p>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                        {Math.round(levelInfo.progressPercent)}%
                      </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-3 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${Math.max(0, Math.min(100, levelInfo.progressPercent))}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                      <p className="font-medium text-gray-700">
                        {levelInfo.pointsToNextLevel > 0
                          ? `${levelInfo.pointsToNextLevel.toLocaleString()} points until Level ${levelInfo.level + 1}`
                          : "You are at the top level right now."}
                      </p>
                      <p className="text-gray-500">
                        {levelInfo.levelStart.toLocaleString()}
                        {" - "}
                        {levelInfo.levelEnd.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : null}

                <p className="text-base leading-relaxed">
                  Bible Buddy isn't about competing with other people.
                  <br />
                  It's about understanding the Bible deeply, one step at a time, and being rewarded for showing up consistently.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">What Counts as Progress?</h3>
                  <p className="mb-2">You earn weighted points across Bible Buddy, such as:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📖 Finishing a Bible chapter, devotional day, or reading plan chapter</li>
                    <li>🧠 Learning people, places, keywords, and taking notes</li>
                    <li>👥 Posting in the group, commenting, and joining community activity</li>
                    <li>❤️ Liking posts or comments, and earning likes from other Buddies</li>
                    <li>🔥 Keeping your streak alive by logging in each day</li>
                    <li>🎯 Trivia, study opens, highlights, and other meaningful app actions</li>
                  </ul>
                  <p className="mt-3 text-sm">Bigger study actions are worth more points than lighter actions like likes.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">How Points Work</h3>
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
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                      <p className="font-semibold text-gray-900">Streak bonus points</p>
                      <p>
                        Every day you log in on a streak, you get bonus level points equal to that streak day.
                        Day 1 gives you 1 bonus point. Day 10 gives you 10 bonus points. Day 45 gives you 45 bonus points.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Why Levels Exist</h3>
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
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Bible Buddy Levels</h3>
                  <div className="space-y-3">
                    {LEVEL_DEFINITIONS.map((definition) => (
                      <div key={definition.level} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-900">
                          Level {definition.level} Bible Buddy
                          {" "}
                          <span className="text-xs font-medium text-gray-500">
                            ({definition.minPoints.toLocaleString()} to {definition.maxPoints !== null ? definition.maxPoints.toLocaleString() : `${definition.minPoints.toLocaleString()}+`} pts)
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 mb-1">Final Encouragement</p>
                  <p className="text-sm text-blue-800">
                    There's no rush.
                    <br />
                    The goal isn't to finish fast - it's to understand deeply.
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

      {showStreakBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white">
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Streak Badge</h2>
                <button
                  onClick={() => setShowStreakBadgeModal(false)}
                  className="text-2xl font-bold text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                  <span
                    className={`text-3xl ${(profile?.current_streak ?? 0) >= 30 ? "" : "grayscale opacity-60"}`}
                    aria-hidden="true"
                  >
                    🔥
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{profile?.current_streak ?? 0} Day Streak</p>
                    <p className="text-sm text-gray-600">
                      {profile?.current_streak ?? 0 >= 30 ? "You earned the fire badge." : "Keep logging in daily to unlock the fire badge."}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7">
                  This is the streak badge. Hit <span className="font-semibold">30 days in a row</span> of logging in and you earn it.
                </p>

                <p className="text-sm leading-7">
                  Before 30 days, the fire stays gray. Once you reach 30 straight days, the badge turns fully active.
                </p>

                <p className="text-sm leading-7">
                  Your streak also gives you extra level points every day you keep it alive, so showing up daily helps you grow faster.
                </p>

                <button
                  onClick={() => setShowStreakBadgeModal(false)}
                  className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTourKey && TOUR_COPY[activeTourKey] ? (
        <FeatureTourModal
          isOpen={true}
          title={TOUR_COPY[activeTourKey].title}
          body={TOUR_COPY[activeTourKey].body}
          content={activeTourKey === "dashboard" ? DASHBOARD_TOUR_CONTENT : undefined}
          primaryButtonText="I understand"
          variant="default"
          anchorRect={null}
          canAdvance={true}
          closeOnBackdrop={true}
          isSaving={isSavingFeatureTour}
          onClose={handleTourClose}
          onUnderstand={handleTourUnderstand}
        />
      ) : null}


    </div>
    </>
  );
}


