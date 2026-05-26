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

type StudyFilter = "all" | "done" | "started";

const FEATURED_STUDY_ORDER = [
  "The Wrestling of Jacob",
  "The Testing of Joseph",
  "The Deliverance of Moses",
  "The Presence of God",
  "Holiness Before God",
  "The Wilderness Journey",
  "The Rebellion in the Wilderness",
  "The Promised Land Ahead",
  "The Calling of Moses",
  "The Heart of David",
  "The Rise of Esther",
  "The Faith of Job",
  "The Wisdom of Proverbs",
  "The Courage of Daniel",
  "The Tempting of Jesus",
  "The Disciples of Jesus",
  "The Transforming of Paul",
  "Women of the Bible",
];
const KEEP_DEVOTIONAL_TITLES = new Set(FEATURED_STUDY_ORDER);
const FEATURED_STUDY_ORDER_INDEX = new Map(
  FEATURED_STUDY_ORDER.map((title, index) => [title, index]),
);
const CHAPTER_JOURNEY_TITLES = new Set(FEATURED_STUDY_ORDER);
const CHAPTER_JOURNEY_TASK_TOTAL = 6;

function isChapterJourney(title: string) {
  return CHAPTER_JOURNEY_TITLES.has(title);
}

function getStudyScriptureRange(title: string) {
  const ranges: Record<string, string> = {
    "The Creation of the World": "Genesis 1 & 2",
    "The Fall of Man": "Genesis 3 & 4",
    "The Flood of Noah": "Genesis 5-10",
    "The Obedience of Abraham": "Genesis 11-25",
    "The Promise Through Isaac": "Genesis 26 & 27",
    "The Wrestling of Jacob": "Genesis 28-36",
    "The Testing of Joseph": "Genesis 37-50",
    "The Deliverance of Moses": "Exodus 1-18",
    "The Covenant at Sinai": "Exodus 19-24",
    "The Presence of God": "Exodus 25-40",
    "Holiness Before God": "Leviticus 1-27",
    "The Wilderness Journey": "Numbers 1-14",
    "The Rebellion in the Wilderness": "Numbers 15-25",
    "The Promised Land Ahead": "Numbers 26-36",
    "The Rise of Esther": "Esther 1-10",
    "The Wisdom of Proverbs": "Proverbs 1-31",
    "The Courage of Daniel": "Daniel 1-6",
  };

  return ranges[title] ?? null;
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

type DevotionalsPageProps = {
  embedded?: boolean;
  onStudySelect?: (devotionalId: string) => void;
};

export default function DevotionalsPage({ embedded = false, onStudySelect }: DevotionalsPageProps = {}) {
  const router = useRouter();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [studyFilter, setStudyFilter] = useState<StudyFilter>("all");
  const [loading, setLoading] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
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
      actionLabel: "Devotionals",
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
    if (title === "The Deliverance of Moses") {
      return "/TheDeliveranceofMoses.png";
    }
    if (title === "The Covenant at Sinai") {
      return "/TheCovenantatSinai.png";
    }
    if (title === "The Presence of God") {
      return "/ThePresenceofGod.png";
    }
    if (title === "Holiness Before God") {
      return "/ThegolinessbeforeGod.png";
    }
    if (title === "The Wilderness Journey") {
      return "/Wildernessjourneycover.png";
    }
    if (title === "The Rebellion in the Wilderness") {
      return "/RebellionintheWilderness.png";
    }
    if (title === "The Promised Land Ahead") {
      return "/promieslandcover.png";
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
    if (title === "The Promise Through Isaac") {
      return "/ThePromiseThroughIsaac.png";
    }
    if (title === "The Wrestling of Jacob") {
      return "/TheWrestlingofJacob.png";
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
    if (title === "The Flood of Noah") {
      return "/Floodofnoah.png";
    }
    return null;
  };

  const getDevotionalVisual = (devotional: Devotional) => {
    const coverImage = getCoverImage(devotional.title);
    if (coverImage) {
      return (
        <div className="overflow-visible rounded-xl">
          <img
            src={coverImage}
            alt={`${devotional.title} cover`}
            className="aspect-[3/4] w-full object-contain drop-shadow-sm transition duration-300 group-hover:scale-[1.02]"
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
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-[#b9dcf4] bg-gradient-to-br from-[#eaf5ff] via-white to-sky-50 px-4 py-6 text-center shadow-sm">
        <div className="text-3xl md:text-5xl mb-3">📖</div>
        <div className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
          {devotional.title}
        </div>
        <div className="mt-2 text-xs md:text-sm text-gray-600">
          {devotional.total_days} part Bible study
        </div>
      </div>
    );
  };

  const visibleDevotionals = useMemo(() => devotionals
    .filter((devotional) => KEEP_DEVOTIONAL_TITLES.has(devotional.title))
    .sort((a, b) => {
      const aOrder = FEATURED_STUDY_ORDER_INDEX.get(a.title);
      const bOrder = FEATURED_STUDY_ORDER_INDEX.get(b.title);

      if (aOrder !== undefined || bOrder !== undefined) {
        return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER);
      }

      return 0;
    }), [devotionals]);

  const bibleStudyStats = useMemo(() => {
    const completed = visibleDevotionals.filter((study) => progressByDevotional[study.id]?.isComplete).length;
    const started = visibleDevotionals.filter((study) => {
      const progress = progressByDevotional[study.id];
      return progress && progress.percent > 0 && !progress.isComplete;
    }).length;

    return {
      studies: visibleDevotionals.length,
      completed,
      started,
    };
  }, [progressByDevotional, visibleDevotionals]);

  const filteredDevotionals = useMemo(() => {
    if (studyFilter === "all") return visibleDevotionals;

    return visibleDevotionals.filter((study) => {
      const progress = progressByDevotional[study.id] ?? buildEmptyProgress(study);
      if (studyFilter === "done") return progress.isComplete;
      return progress.percent > 0 && !progress.isComplete;
    });
  }, [progressByDevotional, studyFilter, visibleDevotionals]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const requestedStudy = new URLSearchParams(window.location.search).get("study")?.trim();
    if (!requestedStudy || visibleDevotionals.length === 0) return;

    const matchedStudy = visibleDevotionals.find(
      (devotional) => devotional.title.toLowerCase() === requestedStudy.toLowerCase(),
    );

    if (matchedStudy) {
      router.replace(`/bible-studies/${matchedStudy.id}`);
    }
  }, [router, visibleDevotionals]);

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
          <h1 className="text-3xl font-bold mb-8">Devotionals</h1>
          <div className="text-gray-500">Loading devotionals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${embedded ? "" : "min-h-screen"} bb-bible-studies-page bg-[var(--bb-background,#f4f8ff)] text-[var(--bb-text-primary,#111827)]`}>
      <div className={`${embedded ? "px-0 py-0" : "px-4 py-5 md:py-8"} max-w-6xl mx-auto`}>
        <div className="bb-bible-studies-hero mb-3 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-4 shadow-sm md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)] md:text-4xl">Devotionals</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--bb-text-secondary,#5f6368)]">
                Pick a focused study and move through it at your own pace.
              </p>
            </div>
          </div>
        </div>

        <div className="bb-card mb-4 overflow-hidden rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 shadow-sm">
          {/* HEADER */}
          <div className="w-full text-left">
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-3 gap-2 text-center">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setStudyFilter("all");
                  }}
                  className={`rounded-2xl px-3 py-2 transition ${
                    studyFilter === "all"
                      ? "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-sm"
                      : "bg-[var(--bb-surface-soft,#f8fbff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  }`}
                >
                  <p className="text-lg font-black">{bibleStudyStats.studies}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-wide sm:text-[10px] ${studyFilter === "all" ? "text-white/90" : "text-[var(--bb-text-secondary,#5f6368)]"}`}>All Studies</p>
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setStudyFilter("started");
                  }}
                  className={`rounded-2xl px-3 py-2 transition ${
                    studyFilter === "started"
                      ? "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-sm"
                      : "bg-[var(--bb-surface-soft,#f8fbff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  }`}
                >
                  <p className="text-lg font-black">{bibleStudyStats.started}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-wide sm:text-[10px] ${studyFilter === "started" ? "text-white/90" : "text-[var(--bb-text-secondary,#5f6368)]"}`}>Started</p>
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setStudyFilter("done");
                  }}
                  className={`rounded-2xl px-3 py-2 transition ${
                    studyFilter === "done"
                      ? "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-sm"
                      : "bg-[var(--bb-surface-soft,#f8fbff)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
                  }`}
                >
                  <p className="text-lg font-black">{bibleStudyStats.completed}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-wide sm:text-[10px] ${studyFilter === "done" ? "text-white/90" : "text-[var(--bb-text-secondary,#5f6368)]"}`}>Done Studies</p>
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT - Collapsible */}
          {isInstructionsExpanded && (
            <div className="px-6 pb-6 border-t border-blue-200/50">
              <div className="pt-4 space-y-4">
                <h3 className="text-base font-semibold text-gray-900">A Journey Through The Bible</h3>

                <p className="text-gray-700 leading-relaxed">
                  Bible Buddy studies are built as one connected journey through Scripture. Start with <strong>The Creation of the World</strong>, then keep moving study by study so the Bible unfolds in order instead of feeling like random pieces.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Every study has chapters, and every chapter has the same five-task flow. You can finish a chapter in one sitting, or spread the tasks out across different days.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">1. Chapter Intro</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      The intro sets the scene before you read. It shows where the chapter begins, why it matters, and what to watch for.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">2. Read The Scripture</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      This is where you read the actual Bible chapter. The study helps you understand it, but Scripture stays at the center.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">3. Deep Chapter Notes</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      The notes slow down and teach the chapter section by section. They explain verses, words, history, themes, and why the chapter matters.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">4. Trivia Questions</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Trivia checks what you understood from the chapter. It helps the main events, people, and ideas stick.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">5. Scrambled Word Game</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Scrambled helps you practice important Bible words from the chapter. It turns names, places, and key ideas into quick memory work.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">6. Reflection</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Reflection helps you respond personally to what you studied. It gives you space to think, pray, and apply the chapter to real life.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm">
                  The goal is not to rush through a list. The goal is to walk through the whole Bible with order, context, practice, and real understanding.
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

        {filteredDevotionals.length === 0 ? (
          <div className="text-gray-500">
            {studyFilter === "all"
              ? "No Bible studies available yet. Check back soon!"
              : `No ${studyFilter === "done" ? "done" : "started"} Bible studies yet.`}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {filteredDevotionals.map((devotional) => {
              const progress = progressByDevotional[devotional.id] ?? buildEmptyProgress(devotional);
              const isComplete = progress.isComplete;
              const card = (
                <div className={`bb-bible-study-card group flex h-full flex-col rounded-[18px] border p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-3 ${
                  isComplete ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent-soft,#eaf5ff)]" : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]"
                }`}>
                  <div className="relative">
                    {getDevotionalVisual(devotional)}
                    {isComplete ? (
                      <span className="absolute right-2 top-2 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[var(--bb-button-text,#ffffff)] shadow-sm">
                        Done
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-3 text-center">
                    <h3 className="text-sm font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-base md:text-lg">
                      {devotional.title}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold leading-tight text-[var(--bb-text-muted,#6b7280)] sm:text-xs">
                      {getStudyScriptureRange(devotional.title) ?? `${devotional.total_days} part study`}
                    </p>
                    <div className="mt-auto pt-3">
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f8fbff)]">
                        <div
                          className="h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-500"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs font-black text-[var(--bb-text-primary,#111827)]">
                        {isComplete ? "Completed" : progress.percent > 0 ? "Continue" : "Start"}
                      </p>
                    </div>
                  </div>
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
                    if (embedded && onStudySelect) {
                      onStudySelect(devotional.id);
                    } else {
                      router.push(`/bible-studies/${devotional.id}`);
                    }
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
                      if (embedded && onStudySelect) {
                        onStudySelect(devotional.id);
                      } else {
                        router.push(`/bible-studies/${devotional.id}`);
                      }
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
