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

const HIDDEN_DEVOTIONAL_TITLES = new Set([
  "The Calling of Moses",
]);

const FEATURED_DEVOTIONAL_TITLE = "The Testing of Joseph";
const CHAPTER_JOURNEY_TITLES = new Set(["The Wisdom of Proverbs", "The Testing of Joseph"]);
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
      return "/courageofdaniel.png";
    }
    if (title === "The Rise of Esther") {
      return "/RiseofEsther.png";
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
      if (a.title === FEATURED_DEVOTIONAL_TITLE) return -1;
      if (b.title === FEATURED_DEVOTIONAL_TITLE) return 1;
      return 0;
    }), [devotionals]);

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
    </div>
  );
}
