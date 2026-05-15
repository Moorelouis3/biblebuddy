"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";

interface Devotional {
  id: string;
  title: string;
  description: string;
  total_days: number;
}

type DevotionalDayRow = {
  devotional_id: string;
  day_number: number;
  bible_reading_book: string | null;
  bible_reading_chapter: number | null;
};

type StudyProgressSummary = {
  completedSteps: number;
  totalSteps: number;
  completedDays: number;
  totalDays: number;
  percent: number;
  isComplete: boolean;
  label: string;
};

type StudyBuddyProgress = {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  profileHref: string;
  level: number;
  completedTasks: number;
  completedChapters: number;
  totalChapters: number;
  percent: number;
  label: string;
};

type StudyCommunitySummary = {
  total: number;
  avatars: StudyBuddyProgress[];
};

type StudyCommunityModal = {
  devotional: Devotional;
  page: number;
  total: number;
  rows: StudyBuddyProgress[];
};

const HIDDEN_DEVOTIONAL_TITLES = new Set([
  "The Calling of Moses",
  "The Tempting of Jesus",
  "The Disciples of Jesus",
  "Women of the Bible",
]);

const FEATURED_STUDY_ORDER = [
  "The Creation of the World",
  "The Fall of Man",
  "The Obedience of Abraham",
  "The Rise of Esther",
  "The Courage of Daniel",
  "The Testing of Joseph",
  "The Wisdom of Proverbs",
];
const FEATURED_STUDY_ORDER_INDEX = new Map(
  FEATURED_STUDY_ORDER.map((title, index) => [title, index]),
);
const CHAPTER_JOURNEY_TITLES = new Set(FEATURED_STUDY_ORDER);
const CHAPTER_JOURNEY_TASK_TOTAL = 6;

function isChapterJourney(title: string) {
  return CHAPTER_JOURNEY_TITLES.has(title);
}

function chapterSlug(book: string, chapter: number) {
  return `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;
}

function notesActionLabel(book: string, chapter: number) {
  return `${book} ${chapter} Review Opened`;
}

function buildEmptyProgress(devotional: Devotional): StudyProgressSummary {
  const totalSteps = isChapterJourney(devotional.title)
    ? Math.max(1, devotional.total_days * CHAPTER_JOURNEY_TASK_TOTAL)
    : Math.max(1, devotional.total_days);

  return {
    completedSteps: 0,
    totalSteps,
    completedDays: 0,
    totalDays: devotional.total_days,
    percent: 0,
    isComplete: false,
    label: `0/${devotional.total_days} ${isChapterJourney(devotional.title) ? "chapters" : "days"}`,
  };
}

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export default function DevotionalsPage() {
  const router = useRouter();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [tempDontShowAgain, setTempDontShowAgain] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [progressByDevotional, setProgressByDevotional] = useState<Record<string, StudyProgressSummary>>({});
  const [communityByDevotional, setCommunityByDevotional] = useState<Record<string, StudyCommunitySummary>>({});
  const [communityModal, setCommunityModal] = useState<StudyCommunityModal | null>(null);
  const [communityLoading, setCommunityLoading] = useState(false);

  // Load "Don't show again" preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem("devotional-instructions-dont-show-again");
    if (savedPreference === "true") {
      setDontShowAgain(true);
      setIsInstructionsExpanded(false); // Start collapsed if user dismissed
    }
  }, []);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null
      );
    });
  }, []);

  useEffect(() => {
    async function loadDevotionals() {
      try {
        const { data, error } = await supabase
          .from("devotionals")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading devotionals:", error);
          return;
        }

        setDevotionals(data || []);
      } catch (err) {
        console.error("Error loading devotionals:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDevotionals();
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.devotionals_viewed,
      actionLabel: "Bible Studies",
      dedupeKey: "devotionals-viewed",
    }).catch((error) => console.error("[NAV] Failed to track devotionals view:", error));
  }, [userId, username]);

  const handleToggleInstructions = () => {
    setIsInstructionsExpanded(!isInstructionsExpanded);
  };

  const handleCloseInstructions = () => {
    setIsInstructionsExpanded(false);
    
    // If "Don't show again" is checked, save preference
    if (tempDontShowAgain) {
      localStorage.setItem("devotional-instructions-dont-show-again", "true");
      setDontShowAgain(true);
    }
  };

  // Get cover image path based on devotional title
  const getCoverImage = (title: string): string | null => {
    if (title === "The Tempting of Jesus") {
      return "/newtempting.png";
    }
    if (title === "The Testing of Joseph") {
      return "/TheTestingofJospehnewcover.png";
    }
    if (title === "The Disciples of Jesus") {
      return "/disciplesofjesusdevotional.png";
    }
    if (title === "Women of the Bible") {
      return "/womenofthebible.png";
    }
    if (title === "The Wisdom of Proverbs") {
      return "/Wisdomofproverbsnewcover.png";
    }
    if (title === "The Faith of Job") {
      return "/faithofjob.png";
    }
    if (title === "The Calling of Moses") {
      return "/callingofmosesdevotional.png";
    }
    if (title === "The Heart of David") {
      return "/heartofdaviddevotional.png";
    }
    if (title === "The Obedience of Abraham") {
      return "/TheobedienceofAbraham.png";
    }
    if (title === "The Transforming of Paul") {
      return "/transformingofpauldevotional.png";
    }
    if (title === "The Courage of Daniel") {
      return "/thecourageofdaniel.png";
    }
    if (title === "The Rise of Esther") {
      return "/theriseofester.png";
    }
    if (title === "The Creation of the World") {
      return "/creationoftheworld.png";
    }
    if (title === "The Fall of Man") {
      return "/thefallofman.png";
    }
    return null;
  };

  const getDevotionalVisual = (devotional: Devotional) => {
    const coverImage = getCoverImage(devotional.title);
    if (coverImage) {
      return (
        <div className="overflow-hidden rounded-xl border border-white/70 bg-gray-100 shadow-sm">
          <img
            src={coverImage}
            alt={`${devotional.title} cover`}
            className="aspect-[3/4] w-full object-cover transition duration-300"
            style={{
              objectPosition:
                devotional.title === "The Testing of Joseph"
                  ? "center 30%"
                  : "center center",
              }}
          />
        </div>
      );
    }

    return (
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4 py-6 text-center shadow-sm">
        <div className="text-3xl md:text-5xl mb-3">📖</div>
        <div className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
          {devotional.title}
        </div>
        <div className="mt-2 text-xs md:text-sm text-gray-600">
          {devotional.total_days} chapter Bible study
        </div>
      </div>
    );
  };

  const visibleDevotionals = useMemo(() => devotionals
    .filter((devotional) => !HIDDEN_DEVOTIONAL_TITLES.has(devotional.title))
    .sort((a, b) => {
      const aOrder = FEATURED_STUDY_ORDER_INDEX.get(a.title);
      const bOrder = FEATURED_STUDY_ORDER_INDEX.get(b.title);

      if (aOrder !== undefined || bOrder !== undefined) {
        return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER);
      }

      return 0;
    }), [devotionals]);

  useEffect(() => {
    if (visibleDevotionals.length === 0) {
      setCommunityByDevotional({});
      return;
    }

    let cancelled = false;

    async function loadCommunityPreview() {
      try {
        const ids = visibleDevotionals.map((devotional) => devotional.id).join(",");
        const response = await fetch(`/api/devotionals/community-progress?ids=${encodeURIComponent(ids)}`);
        const payload = await response.json().catch(() => null);
        if (!response.ok) throw new Error(payload?.error || "Could not load study community.");
        if (!cancelled) setCommunityByDevotional(payload?.summaries || {});
      } catch (error) {
        console.error("[BIBLE_STUDIES] Error loading community progress:", error);
        if (!cancelled) setCommunityByDevotional({});
      }
    }

    void loadCommunityPreview();

    return () => {
      cancelled = true;
    };
  }, [visibleDevotionals]);

  async function openCommunityModal(devotional: Devotional, page = 0) {
    setCommunityLoading(true);
    try {
      const response = await fetch(
        `/api/devotionals/community-progress?devotionalId=${encodeURIComponent(devotional.id)}&page=${page}&pageSize=10`,
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || "Could not load study Buddies.");
      const selected = payload?.selected;
      setCommunityModal({
        devotional,
        page: selected?.page ?? page,
        total: selected?.total ?? 0,
        rows: selected?.rows ?? [],
      });
    } catch (error) {
      console.error("[BIBLE_STUDIES] Error loading community list:", error);
      setCommunityModal({ devotional, page, total: 0, rows: [] });
    } finally {
      setCommunityLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadStudyProgress() {
      const baseProgress = Object.fromEntries(
        visibleDevotionals.map((devotional) => [devotional.id, buildEmptyProgress(devotional)])
      );

      if (!userId || visibleDevotionals.length === 0) {
        setProgressByDevotional(baseProgress);
        return;
      }

      const devotionalIds = visibleDevotionals.map((devotional) => devotional.id);

      try {
        const [daysRes, progressRes] = await Promise.all([
          supabase
            .from("devotional_days")
            .select("devotional_id, day_number, bible_reading_book, bible_reading_chapter")
            .in("devotional_id", devotionalIds),
          supabase
            .from("devotional_progress")
            .select("devotional_id, day_number, is_completed, reading_completed")
            .eq("user_id", userId)
            .in("devotional_id", devotionalIds),
        ]);

        if (daysRes.error) throw daysRes.error;
        if (progressRes.error) throw progressRes.error;

        const days = (daysRes.data || []) as DevotionalDayRow[];
        const progressRows = progressRes.data || [];
        const progressLookup = new Map<string, any>();

        progressRows.forEach((row: any) => {
          progressLookup.set(`${row.devotional_id}:${row.day_number}`, row);
        });

        const chapterJourneyDays = days.filter((day) => {
          const devotional = visibleDevotionals.find((item) => item.id === day.devotional_id);
          return devotional && isChapterJourney(devotional.title) && day.bible_reading_book && day.bible_reading_chapter;
        });

        let actionRows: any[] = [];
        let reflectionSlugs = new Set<string>();

        if (chapterJourneyDays.length > 0) {
          const chapterSlugs = chapterJourneyDays.map((day) => chapterSlug(day.bible_reading_book || "", Number(day.bible_reading_chapter)));
          const [actionsRes, commentsRes] = await Promise.all([
            supabase
              .from("master_actions")
              .select("action_type, action_label")
              .eq("user_id", userId)
              .in("action_type", [
                ACTION_TYPE.chapter_notes_reviewed,
                ACTION_TYPE.chapter_notes_viewed,
                ACTION_TYPE.trivia_chapter_completed,
                ACTION_TYPE.scrambled_chapter_completed,
              ])
              .limit(5000),
            supabase
              .from("article_comments")
              .select("article_slug")
              .eq("user_id", userId)
              .eq("is_deleted", false)
              .in("article_slug", chapterSlugs)
              .limit(5000),
          ]);

          actionRows = actionsRes.data || [];
          reflectionSlugs = new Set((commentsRes.data || []).map((row: any) => row.article_slug));
        }

        const nextProgress: Record<string, StudyProgressSummary> = {};

        visibleDevotionals.forEach((devotional) => {
          const devotionalDays = days.filter((day) => day.devotional_id === devotional.id);

          if (isChapterJourney(devotional.title)) {
            let completedDays = 0;

            devotionalDays.forEach((day) => {
              const book = day.bible_reading_book || "";
              const chapter = Number(day.bible_reading_chapter);
              const progress = progressLookup.get(`${devotional.id}:${day.day_number}`);
              const chapterLabel = `${book} ${chapter}`;
              const chapterLabelLower = chapterLabel.toLowerCase();
              const noteLabel = notesActionLabel(book, chapter);

              const hasNotes = actionRows.some((row) =>
                (row.action_type === ACTION_TYPE.chapter_notes_reviewed || row.action_type === ACTION_TYPE.chapter_notes_viewed) &&
                row.action_label === noteLabel
              );
              const hasTrivia = actionRows.some((row) =>
                row.action_type === ACTION_TYPE.trivia_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabelLower)
              );
              const hasScrambled = actionRows.some((row) =>
                row.action_type === ACTION_TYPE.scrambled_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabelLower)
              );
              const hasReflection = reflectionSlugs.has(chapterSlug(book, chapter));
              const daySteps = [
                progress?.is_completed === true,
                progress?.reading_completed === true,
                hasNotes,
                hasTrivia,
                hasScrambled,
                hasReflection,
              ].filter(Boolean).length;

              if (daySteps >= CHAPTER_JOURNEY_TASK_TOTAL) completedDays += 1;
            });

            const totalChapters = Math.max(1, devotional.total_days);
            const percent = clampPercent((completedDays / totalChapters) * 100);

            nextProgress[devotional.id] = {
              completedSteps: completedDays,
              totalSteps: totalChapters,
              completedDays,
              totalDays: devotional.total_days,
              percent,
              isComplete: completedDays >= devotional.total_days,
              label: `${completedDays}/${devotional.total_days} chapters`,
            };
            return;
          }

          const completedDays = devotionalDays.filter((day) => {
            const progress = progressLookup.get(`${devotional.id}:${day.day_number}`);
            return progress?.is_completed === true;
          }).length;
          const totalDays = Math.max(1, devotional.total_days);
          const percent = clampPercent((completedDays / totalDays) * 100);

          nextProgress[devotional.id] = {
            completedSteps: completedDays,
            totalSteps: totalDays,
            completedDays,
            totalDays: devotional.total_days,
            percent,
            isComplete: completedDays >= devotional.total_days,
            label: `${completedDays}/${devotional.total_days} days`,
          };
        });

        if (!cancelled) setProgressByDevotional({ ...baseProgress, ...nextProgress });
      } catch (error) {
        console.error("[BIBLE_STUDIES] Error loading study progress:", error);
        if (!cancelled) setProgressByDevotional(baseProgress);
      }
    }

    void loadStudyProgress();

    return () => {
      cancelled = true;
    };
  }, [userId, visibleDevotionals]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Bible Studies</h1>
          <div className="text-gray-500">Loading Bible studies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 rounded-3xl border border-white bg-white/90 px-5 py-5 shadow-sm md:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5b8fb8]">Bible Buddy Library</p>
              <h1 className="mt-2 text-3xl font-black text-gray-950 md:text-4xl">Bible Studies</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-gray-600">
                Pick a study, finish each chapter step by step, and watch your shelf fill up as completed.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-[#eaf6ff] px-4 py-3">
                <p className="text-xl font-black text-gray-950">{visibleDevotionals.length}</p>
                <p className="text-[11px] font-bold text-gray-600">Studies</p>
              </div>
              <div className="rounded-2xl bg-[#eafff2] px-4 py-3">
                <p className="text-xl font-black text-gray-950">{visibleDevotionals.filter((study) => progressByDevotional[study.id]?.isComplete).length}</p>
                <p className="text-[11px] font-bold text-gray-600">Done</p>
              </div>
              <div className="rounded-2xl bg-[#fff5df] px-4 py-3">
                <p className="text-xl font-black text-gray-950">
                  {visibleDevotionals.filter((study) => {
                    const progress = progressByDevotional[study.id];
                    return progress && progress.percent > 0 && !progress.isComplete;
                  }).length}
                </p>
                <p className="text-[11px] font-bold text-gray-600">Started</p>
              </div>
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS CALLOUT */}
        <div className="bg-white border border-[#cfe5f6] rounded-2xl shadow-sm mb-6 overflow-hidden">
          {/* HEADER - Clickable */}
          <button
            type="button"
            onClick={handleToggleInstructions}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f3f9ff] transition"
          >
            <h2 className="text-lg font-semibold text-gray-900">📖 About Our Bible Studies</h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${isInstructionsExpanded ? '' : 'transform -rotate-90'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* CONTENT - Collapsible */}
          {isInstructionsExpanded && (
            <div className="px-6 pb-6 border-t border-blue-200/50">
              <div className="pt-4 space-y-4">
                <h3 className="text-base font-semibold text-gray-900">📖 How to Use These Bible Studies</h3>
                
                <p className="text-gray-700 leading-relaxed">
                  Each Bible study is meant to be done at a slow and intentional pace.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 1: Read the Bible Study Intro</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Start by reading the chapter intro. This sets the theme and helps you understand what's happening and why it matters.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 2: Read the Bible Passage</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Don't skip this. This is where the real power is — in God's actual Word.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 3: Reflect Honestly</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Sit with the reflection question and respond thoughtfully. Let it challenge you, not rush you.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm italic">
                  I recommend spending about 30 minutes on each full chapter session.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm">
                  If you stay consistent, you won't just finish a Bible study — you'll walk away stronger, wiser, and closer to God than when you started.
                </p>

                {/* FOOTER CONTROLS */}
                <div className="pt-4 border-t border-blue-200/50 flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempDontShowAgain}
                      onChange={(e) => setTempDontShowAgain(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Don't show this again</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleCloseInstructions}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {visibleDevotionals.length === 0 ? (
          <div className="text-gray-500">
            No Bible studies available yet. Check back soon!
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white bg-white/80 p-3 shadow-sm md:p-5">
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <p className="text-lg font-black text-gray-950">Your Study Shelf</p>
                <p className="text-sm font-semibold text-gray-500">Completed studies turn green while the covers stay clean.</p>
              </div>
              <span className="hidden rounded-full bg-[#eaf6ff] px-4 py-2 text-xs font-black text-[#3f6f91] sm:inline-flex">
                Keep building your shelf
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDevotionals.map((devotional) => {
              const progress = progressByDevotional[devotional.id] ?? buildEmptyProgress(devotional);
              const community = communityByDevotional[devotional.id];
              const isComplete = progress.isComplete;
              const card = (
                <div className={`group h-full rounded-3xl border p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  isComplete ? "border-emerald-200 bg-[#effdf4]" : "border-gray-200 bg-white"
                }`}>
                  <div className="grid grid-cols-[92px_1fr] gap-3 sm:grid-cols-1">
                    <div>{getDevotionalVisual(devotional)}</div>
                    <div className="flex min-w-0 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-base font-black leading-tight text-gray-950 md:text-lg">
                            {devotional.title}
                          </div>
                          {isComplete ? (
                            <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                              Done
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs font-bold text-gray-500">
                          {isChapterJourney(devotional.title) ? `${devotional.total_days} chapter journey` : `${devotional.total_days} part study`}
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs font-black text-gray-700">
                          <span>{progress.label}</span>
                          <span>{progress.percent}%</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${isComplete ? "bg-emerald-500" : "bg-[#7BAFD4]"}`}
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <p className="mt-3 text-sm font-black text-gray-950">
                          {isComplete ? "Completed study" : progress.percent > 0 ? "Continue study" : "Start study"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`mt-3 h-2 rounded-full ${isComplete ? "bg-emerald-300" : "bg-[#d7e8f5]"}`} />
                  {community && community.total > 0 ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void openCommunityModal(devotional, 0);
                      }}
                      className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white/85 px-3 py-2 text-left transition hover:border-[#7BAFD4] hover:bg-[#f7fbfd]"
                    >
                      <span className="flex min-w-0 items-center">
                        {community.avatars.slice(0, 5).map((buddy, index) => (
                          <span
                            key={buddy.userId}
                            className="-ml-2 grid h-8 w-8 place-items-center overflow-hidden rounded-full border-2 border-white bg-[#eaf6ff] text-xs font-black text-[#2f6685] first:ml-0"
                            style={{ zIndex: 10 - index }}
                            title={buddy.name}
                          >
                            {buddy.image ? (
                              <img src={buddy.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              buddy.name.charAt(0).toUpperCase()
                            )}
                          </span>
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-black text-gray-900">
                          {community.total} {community.total === 1 ? "Buddy is" : "Buddies are"} studying this
                        </span>
                        <span className="text-[11px] font-bold text-gray-500">Tap to see progress</span>
                      </span>
                    </button>
                  ) : (
                    <div className="mt-3 rounded-2xl border border-gray-100 bg-white/70 px-3 py-2 text-xs font-bold text-gray-400">
                      Be the first Buddy to start this study.
                    </div>
                  )}
                </div>
              );
              return (
                <div
                  key={devotional.id}
                  role="link"
                  tabIndex={0}
                  className="block w-full"
                  onClick={() => {
                    if (userId) {
                      void trackNavigationActionOnce({
                        userId,
                        username,
                        actionType: ACTION_TYPE.devotional_opened,
                        actionLabel: devotional.title,
                        dedupeKey: `devotional-opened:${devotional.id}`,
                      }).catch((error) => console.error("[NAV] Failed to track devotional click:", error));
                    }
                    router.push(`/devotionals/${devotional.id}`);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      if (userId) {
                        void trackNavigationActionOnce({
                          userId,
                          username,
                          actionType: ACTION_TYPE.devotional_opened,
                          actionLabel: devotional.title,
                          dedupeKey: `devotional-opened:${devotional.id}`,
                        }).catch((error) => console.error("[NAV] Failed to track devotional click:", error));
                      }
                      router.push(`/devotionals/${devotional.id}`);
                    }
                  }}
                >
                  {card}
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>
      {communityModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6"
          onClick={() => setCommunityModal(null)}
        >
          <div
            className="flex max-h-[82vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-gray-100 bg-[#f7fbfd] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8fb7]">Study Buddies</p>
                  <h2 className="mt-1 text-2xl font-black text-gray-950">{communityModal.devotional.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-gray-500">
                    Ranked by chapters completed, then total tasks finished.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCommunityModal(null)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg font-black text-gray-600 shadow-sm hover:bg-gray-50"
                  aria-label="Close study buddies"
                >
                  x
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {communityLoading ? (
                <div className="py-10 text-center text-sm font-bold text-gray-500">Loading Buddies...</div>
              ) : communityModal.rows.length === 0 ? (
                <div className="rounded-3xl border border-gray-100 bg-[#fbfcf8] p-6 text-center">
                  <p className="text-lg font-black text-gray-900">No Buddies yet</p>
                  <p className="mt-2 text-sm font-semibold text-gray-500">The first person to finish a task will show up here.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {communityModal.rows.map((buddy) => (
                    <a
                      key={buddy.userId}
                      href={buddy.profileHref}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-3 transition hover:border-[#7BAFD4]"
                    >
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#fef3c7] text-sm font-black text-[#9a6115]">
                        {buddy.rank}
                      </span>
                      <span className="grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]">
                        {buddy.image ? (
                          <img src={buddy.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          buddy.name.charAt(0).toUpperCase()
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-base font-black text-gray-950">{buddy.name}</span>
                        <span className="block text-xs font-bold text-gray-500">L{buddy.level} - {buddy.label}</span>
                        <span className="mt-1 block h-2 overflow-hidden rounded-full bg-white">
                          <span className="block h-full rounded-full bg-[#7BAFD4]" style={{ width: `${buddy.percent}%` }} />
                        </span>
                      </span>
                      <span className="text-right text-xs font-black text-gray-500">
                        {buddy.completedTasks} tasks
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
              <p className="text-xs font-bold text-gray-500">
                {communityModal.total > 0
                  ? `Showing ${communityModal.page * 10 + 1}-${Math.min((communityModal.page + 1) * 10, communityModal.total)} of ${communityModal.total}`
                  : "No Buddies yet"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void openCommunityModal(communityModal.devotional, Math.max(0, communityModal.page - 1))}
                  disabled={communityModal.page === 0 || communityLoading}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-black text-gray-700 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => void openCommunityModal(communityModal.devotional, communityModal.page + 1)}
                  disabled={communityLoading || (communityModal.page + 1) * 10 >= communityModal.total}
                  className="rounded-full bg-[#7BAFD4] px-4 py-2 text-sm font-black text-slate-950 disabled:opacity-40"
                >
                  Next 10
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
