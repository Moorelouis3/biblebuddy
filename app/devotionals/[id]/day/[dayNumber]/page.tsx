"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BibleReadingModal from "@/components/BibleReadingModal";
import ChapterNotesMarkdown from "@/components/ChapterNotesMarkdown";
import CommentSection from "@/components/comments/CommentSection";
import { ModalShell } from "@/components/ModalShell";
import ScrambledGamePlayer from "@/components/ScrambledGamePlayer";
import TriviaGamePlayer from "@/components/TriviaGamePlayer";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { enrichPlainText } from "@/lib/bibleHighlighting";
import { supabase } from "@/lib/supabaseClient";
import { getScrambledBook, getScrambledChapter } from "@/lib/scrambledGameData";
import { getTriviaBook, getTriviaChapter } from "@/lib/triviaGameData";
import { triggerPoints } from "@/components/PointsPop";

type Devotional = {
  id: string;
  title: string;
  total_days: number | null;
};

type DevotionalDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
};

type Progress = {
  is_completed: boolean | null;
  reading_completed: boolean | null;
  completed_at?: string | null;
};

type Finisher = {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
  completed_at?: string | null;
};

type Breakdown = {
  intro: Finisher[];
  reading: Finisher[];
  notes: Finisher[];
  trivia: Finisher[];
  scrambled: Finisher[];
  reflection: Finisher[];
};

const TASK_BLUE = "#7BAFD4";

type DevotionalContentBlock =
  | { kind: "heading"; key: string; level: 1 | 2; html: string }
  | { kind: "paragraph"; key: string; html: string }
  | { kind: "quote"; key: string; html: string }
  | { kind: "list"; key: string; items: string[] }
  | { kind: "divider"; key: string };

function stripHeadingMarkdown(text: string) {
  return text.replace(/^#+\s*/, "").trim();
}

function renderInlineMarkdown(text: string) {
  return enrichPlainText(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function parseDevotionalContent(text: string, dayNumber: number): DevotionalContentBlock[] {
  if (!text) return [];

  return text
    .split(/\n\s*\n/)
    .map((rawBlock, index): DevotionalContentBlock | null => {
      const block = rawBlock.trim();
      if (!block) return null;
      const key = `${dayNumber}-${index}`;

      if (/^-{3,}$/.test(block)) return { kind: "divider", key };

      const headingMatch = block.match(/^(#{1,2})\s+(.+)$/);
      if (headingMatch) {
        return {
          kind: "heading",
          key,
          level: headingMatch[1].length === 1 ? 1 : 2,
          html: renderInlineMarkdown(stripHeadingMarkdown(headingMatch[2])),
        };
      }

      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const isList = lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line));
      if (isList) {
        return {
          kind: "list",
          key,
          items: lines.map((line) => renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))),
        };
      }

      const isQuote = lines.length > 0 && lines.every((line) => line.startsWith(">"));
      if (isQuote) {
        return {
          kind: "quote",
          key,
          html: renderInlineMarkdown(lines.map((line) => line.replace(/^>\s?/, "")).join(" ")),
        };
      }

      return {
        kind: "paragraph",
        key,
        html: renderInlineMarkdown(block.replace(/\n/g, " ")),
      };
    })
    .filter((block): block is DevotionalContentBlock => Boolean(block));
}

function normalizeBookKey(book: string) {
  const rawBookKey = book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  return rawBookKey === "songofsolomon" ? "songofsongs" : rawBookKey;
}

function chapterSlug(book: string, chapter: number) {
  return `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;
}

function notesActionLabel(book: string, chapter: number) {
  return `${book} ${chapter} Review Opened`;
}

function formatCompletedDate(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function CollapsibleTask({
  taskNumber,
  title,
  done,
  open,
  onToggle,
  children,
}: {
  taskNumber: number;
  title: string;
  done: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className={`overflow-hidden rounded-xl border bg-white shadow-sm ${done ? "border-emerald-300 shadow-[0_0_0_3px_rgba(16,185,129,0.14),0_10px_24px_rgba(16,185,129,0.12)]" : "border-gray-200"}`}>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${done && !open ? "bg-emerald-50" : "bg-gray-50 hover:bg-gray-100"}`}
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-gray-700">Task {taskNumber}</p>
          <h2 className="mt-1 text-xl font-black text-gray-950">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {done ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Done</span>
          ) : null}
          <span className={`text-2xl font-bold text-gray-500 transition ${open ? "rotate-45" : ""}`}>+</span>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="bg-white px-5 py-5">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function ProverbsStudyDayPage() {
  const params = useParams<{ id: string; dayNumber: string }>();
  const router = useRouter();
  const devotionalId = decodeURIComponent(params.id);
  const dayNumber = Number(params.dayNumber);

  const [userId, setUserId] = useState<string | null>(null);
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [day, setDay] = useState<DevotionalDay | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [notesDone, setNotesDone] = useState(false);
  const [triviaDone, setTriviaDone] = useState(false);
  const [scrambledDone, setScrambledDone] = useState(false);
  const [reflectionDone, setReflectionDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openTask, setOpenTask] = useState<number | null>(null);
  const [showReading, setShowReading] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showScrambled, setShowScrambled] = useState(false);
  const [finishers, setFinishers] = useState<Finisher[]>([]);
  const [breakdown, setBreakdown] = useState<Breakdown>({ intro: [], reading: [], notes: [], trivia: [], scrambled: [], reflection: [] });
  const [showBreakdown, setShowBreakdown] = useState(false);

  const chapterLabel = day ? `${day.bible_reading_book} ${day.bible_reading_chapter}` : "";
  const devotionalBlocks = useMemo(
    () => parseDevotionalContent(day?.devotional_text || "", dayNumber),
    [day?.devotional_text, dayNumber],
  );
  const bookKey = day ? normalizeBookKey(day.bible_reading_book) : "";
  const triviaBook = useMemo(() => (bookKey ? getTriviaBook(bookKey) : null), [bookKey]);
  const triviaChapter = useMemo(() => (day && bookKey ? getTriviaChapter(bookKey, day.bible_reading_chapter) : null), [bookKey, day]);
  const scrambledBook = useMemo(() => (bookKey ? getScrambledBook(bookKey) : null), [bookKey]);
  const scrambledChapter = useMemo(() => (day && bookKey ? getScrambledChapter(bookKey, day.bible_reading_chapter) : null), [bookKey, day]);

  async function loadAll() {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id ?? null;
    setUserId(uid);

    const [devotionalRes, dayRes] = await Promise.all([
      supabase.from("devotionals").select("id, title, total_days").eq("id", devotionalId).maybeSingle(),
      supabase
        .from("devotional_days")
        .select("day_number, day_title, devotional_text, bible_reading_book, bible_reading_chapter, reflection_question")
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber)
        .maybeSingle(),
    ]);

    const devotionalRow = devotionalRes.data as Devotional | null;
    const dayRow = dayRes.data as DevotionalDay | null;
    setDevotional(devotionalRow);
    setDay(dayRow);

    if (!uid || !dayRow || !devotionalRow) {
      setLoading(false);
      return;
    }

    const label = `${dayRow.bible_reading_book} ${dayRow.bible_reading_chapter}`;
    const noteLabel = notesActionLabel(dayRow.bible_reading_book, dayRow.bible_reading_chapter);
    const reflectionSlug = chapterSlug(dayRow.bible_reading_book, dayRow.bible_reading_chapter);

    const [progressRes, actionsRes, commentsRes] = await Promise.all([
      supabase
        .from("devotional_progress")
        .select("is_completed, reading_completed, completed_at")
        .eq("user_id", uid)
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber)
        .maybeSingle(),
      supabase
        .from("master_actions")
        .select("action_type, action_label, created_at")
        .eq("user_id", uid)
        .in("action_type", [
          ACTION_TYPE.chapter_notes_reviewed,
          ACTION_TYPE.chapter_notes_viewed,
          ACTION_TYPE.trivia_chapter_completed,
          ACTION_TYPE.scrambled_chapter_completed,
        ]),
      supabase
        .from("article_comments")
        .select("id")
        .eq("user_id", uid)
        .eq("article_slug", reflectionSlug)
        .eq("is_deleted", false)
        .limit(1),
    ]);

    const actions = actionsRes.data || [];
    setProgress((progressRes.data as Progress | null) ?? { is_completed: false, reading_completed: false, completed_at: null });
    setNotesDone(actions.some((row) => (row.action_type === ACTION_TYPE.chapter_notes_reviewed || row.action_type === ACTION_TYPE.chapter_notes_viewed) && row.action_label === noteLabel));
    setTriviaDone(actions.some((row) => row.action_type === ACTION_TYPE.trivia_chapter_completed && String(row.action_label || "").toLowerCase().startsWith(label.toLowerCase())));
    setScrambledDone(actions.some((row) => row.action_type === ACTION_TYPE.scrambled_chapter_completed && String(row.action_label || "").toLowerCase().startsWith(label.toLowerCase())));
    setReflectionDone(Boolean(commentsRes.data?.length));

    await loadFinishers(dayRow, devotionalRow);
    setLoading(false);
  }

  async function loadFinishers(dayRow: DevotionalDay, devotionalRow: Devotional | null = devotional) {
    const label = `${dayRow.bible_reading_book} ${dayRow.bible_reading_chapter}`;
    const noteLabel = notesActionLabel(dayRow.bible_reading_book, dayRow.bible_reading_chapter);
    const reflectionSlug = chapterSlug(dayRow.bible_reading_book, dayRow.bible_reading_chapter);
    const devotionalActionPrefix = devotionalRow?.title ? `${devotionalRow.title} - Day ${dayNumber}` : null;
    const normalizedBook = dayRow.bible_reading_book.toLowerCase().trim();

    const [
      introRes,
      introActionsRes,
      readingChaptersRes,
      readingActionsRes,
      notesActionsRes,
      triviaActionsRes,
      scrambledActionsRes,
      commentsRes,
    ] = await Promise.all([
      supabase
        .from("devotional_progress")
        .select("user_id, is_completed, reading_completed, completed_at")
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber),
      devotionalActionPrefix
        ? supabase
            .from("master_actions")
            .select("user_id, created_at, action_label")
            .eq("action_type", ACTION_TYPE.devotional_day_completed)
            .ilike("action_label", `${devotionalActionPrefix}%`)
            .order("created_at", { ascending: false })
            .limit(1000)
        : Promise.resolve({ data: [], error: null }),
      supabase
        .from("completed_chapters")
        .select("user_id, completed_at")
        .eq("book", normalizedBook)
        .eq("chapter", dayRow.bible_reading_chapter)
        .order("completed_at", { ascending: false })
        .limit(1000),
      supabase
        .from("master_actions")
        .select("user_id, action_type, action_label, created_at")
        .eq("action_type", ACTION_TYPE.chapter_completed)
        .ilike("action_label", `${label}%`)
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("master_actions")
        .select("user_id, action_type, action_label, created_at")
        .in("action_type", [
          ACTION_TYPE.chapter_notes_reviewed,
          ACTION_TYPE.chapter_notes_viewed,
        ])
        .eq("action_label", noteLabel)
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("master_actions")
        .select("user_id, action_type, action_label, created_at")
        .eq("action_type", ACTION_TYPE.trivia_chapter_completed)
        .ilike("action_label", `${label}%`)
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("master_actions")
        .select("user_id, action_type, action_label, created_at")
        .eq("action_type", ACTION_TYPE.scrambled_chapter_completed)
        .ilike("action_label", `${label}%`)
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("article_comments")
        .select("user_id, created_at")
        .eq("article_slug", reflectionSlug)
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .limit(1000),
    ]);

    if (introRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load intro/reading progress:", introRes.error);
    }
    if (introActionsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load intro actions:", introActionsRes.error);
    }
    if (readingChaptersRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load completed chapter readers:", readingChaptersRes.error);
    }
    if (readingActionsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load reading actions:", readingActionsRes.error);
    }
    if (notesActionsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load notes finishers:", notesActionsRes.error);
    }
    if (triviaActionsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load trivia finishers:", triviaActionsRes.error);
    }
    if (scrambledActionsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load Scrambled finishers:", scrambledActionsRes.error);
    }
    if (commentsRes.error) {
      console.error("[PROVERBS_FINISHERS] Could not load reflection finishers:", commentsRes.error);
    }

    const introDates = new Map<string, string | null>();
    const readingDates = new Map<string, string | null>();
    const notesDates = new Map<string, string | null>();
    const triviaDates = new Map<string, string | null>();
    const scrambledDates = new Map<string, string | null>();
    const reflectionDates = new Map<string, string | null>();

    const introIds = new Set(
      (introRes.data || [])
        .filter((row: any) => row.is_completed)
        .map((row: any) => {
          introDates.set(row.user_id, row.completed_at || null);
          return row.user_id;
        }),
    );
    (introActionsRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      introIds.add(row.user_id);
      if (!introDates.has(row.user_id)) introDates.set(row.user_id, row.created_at || null);
    });

    const readingIds = new Set(
      (introRes.data || [])
        .filter((row: any) => row.reading_completed)
        .map((row: any) => {
          readingDates.set(row.user_id, row.completed_at || null);
          return row.user_id;
        }),
    );
    (readingChaptersRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      readingIds.add(row.user_id);
      if (!readingDates.has(row.user_id)) readingDates.set(row.user_id, row.completed_at || null);
    });
    (readingActionsRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      readingIds.add(row.user_id);
      if (!readingDates.has(row.user_id)) readingDates.set(row.user_id, row.created_at || null);
    });

    const noteIds = new Set<string>();
    const triviaIds = new Set<string>();
    const scrambledIds = new Set<string>();

    (notesActionsRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      noteIds.add(row.user_id);
      if (!notesDates.has(row.user_id)) notesDates.set(row.user_id, row.created_at || null);
    });

    (triviaActionsRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      triviaIds.add(row.user_id);
      if (!triviaDates.has(row.user_id)) triviaDates.set(row.user_id, row.created_at || null);
    });

    (scrambledActionsRes.data || []).forEach((row: any) => {
      if (!row.user_id) return;
      scrambledIds.add(row.user_id);
      if (!scrambledDates.has(row.user_id)) scrambledDates.set(row.user_id, row.created_at || null);
    });

    const reflectionIds = new Set(
      (commentsRes.data || []).filter((row: any) => Boolean(row.user_id)).map((row: any) => {
        if (!reflectionDates.has(row.user_id)) reflectionDates.set(row.user_id, row.created_at || null);
        return row.user_id;
      }),
    );

    const inferDate = (id: string) =>
      notesDates.get(id) ||
      triviaDates.get(id) ||
      scrambledDates.get(id) ||
      reflectionDates.get(id) ||
      readingDates.get(id) ||
      null;

    // The chapter tasks are ordered. If a buddy has completed a later section,
    // they necessarily passed through the intro and reading even if older/private
    // progress rows are not visible to this viewer.
    const downstreamIds = new Set<string>([...readingIds, ...noteIds, ...triviaIds, ...scrambledIds, ...reflectionIds]);
    downstreamIds.forEach((id) => {
      if (!introIds.has(id)) {
        introIds.add(id);
        introDates.set(id, inferDate(id));
      }
    });
    const afterReadingIds = new Set<string>([...noteIds, ...triviaIds, ...scrambledIds, ...reflectionIds]);
    afterReadingIds.forEach((id) => {
      if (!readingIds.has(id)) {
        readingIds.add(id);
        readingDates.set(id, inferDate(id));
      }
    });

    const allUserIds = Array.from(new Set([...introIds, ...readingIds, ...noteIds, ...triviaIds, ...scrambledIds, ...reflectionIds].filter(Boolean)));
    if (allUserIds.length === 0) {
      setFinishers([]);
      setBreakdown({ intro: [], reading: [], notes: [], trivia: [], scrambled: [], reflection: [] });
      return;
    }

    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", allUserIds);

    const profileMap = new Map(
      (profiles || []).map((profile: any) => [
        profile.user_id,
        {
          user_id: profile.user_id,
          display_name: profile.display_name || profile.username || "Buddy",
          profile_image_url: profile.profile_image_url || null,
        } as Finisher,
      ]),
    );
    const resolve = (id: string, completedAt?: string | null): Finisher => ({
      ...(profileMap.get(id) ?? { user_id: id, display_name: id === userId ? "You" : "Buddy", profile_image_url: null }),
      completed_at: completedAt ?? null,
    });
    const make = (ids: Set<string>, dates: Map<string, string | null>) =>
      Array.from(ids).map((id) => resolve(id, dates.get(id)));

    const fullFinishers = allUserIds
      .filter((id) => introIds.has(id) && readingIds.has(id) && noteIds.has(id) && triviaIds.has(id) && scrambledIds.has(id) && reflectionIds.has(id))
      .map((id) => resolve(id));

    setFinishers(fullFinishers);
    setBreakdown({
      intro: make(introIds, introDates),
      reading: make(readingIds, readingDates),
      notes: make(noteIds, notesDates),
      trivia: make(triviaIds, triviaDates),
      scrambled: make(scrambledIds, scrambledDates),
      reflection: make(reflectionIds, reflectionDates),
    });
  }

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devotionalId, dayNumber]);

  async function markIntroComplete() {
    if (!userId || !devotional || !day) return;
    const now = new Date().toISOString();
    const { data: existingProgress } = await supabase
      .from("devotional_progress")
      .select("is_completed, completed_at")
      .eq("user_id", userId)
      .eq("devotional_id", devotionalId)
      .eq("day_number", dayNumber)
      .maybeSingle();
    const wasAlreadyCompleted = existingProgress?.is_completed === true;

    await supabase.from("devotional_progress").upsert(
      {
        user_id: userId,
        devotional_id: devotionalId,
        day_number: dayNumber,
        is_completed: true,
        completed_at: existingProgress?.completed_at || now,
      },
      { onConflict: "user_id,devotional_id,day_number" },
    );

    if (!wasAlreadyCompleted) {
      const { error } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.devotional_day_completed,
        action_label: `${devotional.title} - Day ${dayNumber} Intro Reading Completed`,
      });
      if (!error) triggerPoints(5);
    }

    setProgress((prev) => ({
      is_completed: true,
      reading_completed: prev?.reading_completed ?? false,
      completed_at: existingProgress?.completed_at || now,
    }));
    setOpenTask(null);
    await loadFinishers(day);
  }

  async function openNotes() {
    if (!userId || !day) return;
    setShowNotes(true);
    setNotesLoading(true);
    const label = notesActionLabel(day.bible_reading_book, day.bible_reading_chapter);
    await supabase.from("master_actions").insert({
      user_id: userId,
      action_type: ACTION_TYPE.chapter_notes_viewed,
      action_label: label,
    });
    const { data: existingReviewed } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
      .eq("action_label", label)
      .limit(1)
      .maybeSingle();

    if (!existingReviewed) {
      const { error } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.chapter_notes_reviewed,
        action_label: label,
      });
      if (!error) triggerPoints(5);
    }
    const { data } = await supabase
      .from("bible_notes")
      .select("notes_text")
      .eq("book", day.bible_reading_book.toLowerCase().trim())
      .eq("chapter", day.bible_reading_chapter)
      .maybeSingle();
    setNotesText(data?.notes_text || "No notes are available for this chapter yet.");
    setNotesLoading(false);
    setNotesDone(true);
    await loadFinishers(day);
  }

  async function markReflectionComplete() {
    if (!userId || !devotional) return;

    const actionLabel = `${devotional.title} - Day ${dayNumber}`;
    const { data: existing } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.devotional_reflection_saved)
      .eq("action_label", actionLabel)
      .limit(1)
      .maybeSingle();

    if (existing) return;

    const { error } = await supabase.from("master_actions").insert({
      user_id: userId,
      action_type: ACTION_TYPE.devotional_reflection_saved,
      action_label: actionLabel,
    });

    if (!error) triggerPoints(5);
  }

  async function markReadingComplete() {
    if (!userId || !day) return;
    await supabase.from("devotional_progress").upsert(
      {
        user_id: userId,
        devotional_id: devotionalId,
        day_number: dayNumber,
        reading_completed: true,
      },
      { onConflict: "user_id,devotional_id,day_number" },
    );
    setProgress((prev) => ({
      is_completed: prev?.is_completed ?? false,
      reading_completed: true,
      completed_at: prev?.completed_at ?? null,
    }));
    await loadFinishers(day);
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">Loading Bible study...</div>;
  }

  if (!devotional || !day) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 text-center">
        <p className="font-semibold text-gray-900">Could not load this Bible study.</p>
        <Link href="/devotionals" className="mt-4 inline-block text-blue-600 hover:underline">Back to Bible Studies</Link>
      </div>
    );
  }

  const introDone = progress?.is_completed === true;
  const readingDone = progress?.reading_completed === true;
  const introCompletedDate = formatCompletedDate(progress?.completed_at);
  const breakdownSections: Array<[string, Finisher[], string]> = [
    ["Task 1 Intro", breakdown.intro, "Intro completed"],
    ["Task 2 Reading", breakdown.reading, "Reading completed"],
    ["Task 3 Notes", breakdown.notes, "Notes completed"],
    ["Task 4 Trivia", breakdown.trivia, "Trivia completed"],
    ["Task 5 Scrambled", breakdown.scrambled, "Scrambled completed"],
    ["Task 6 Reflection", breakdown.reflection, "Reflection posted"],
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <button type="button" onClick={() => router.back()} className="mb-6 text-sm font-semibold text-[#5f86bd] hover:underline">
          Back
        </button>

        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4f8fb7]">{chapterLabel}</p>
          <h1 className="mt-1 text-2xl font-black text-gray-950">{day.day_title}</h1>
          <p className="mt-1 text-sm text-gray-500">{devotional.title}</p>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-bold text-gray-950">Chapter Finishers</p>
          <p className="mt-2 text-lg font-black text-gray-950">
            {finishers.length} {finishers.length === 1 ? "buddy has" : "buddies have"} finished all 6 tasks for {chapterLabel}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Intro, reading, notes, trivia, Scrambled, and reflection all completed.
          </p>
          {finishers.length === 0 ? (
            <p className="mt-5 text-sm leading-6 text-gray-600">
              No full finishers yet. Once buddies complete every task for this chapter, they will show up here.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {finishers.map((finisher) => (
                <div key={finisher.user_id} className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                  {finisher.profile_image_url ? (
                    <img src={finisher.profile_image_url} alt={finisher.display_name} className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7BAFD4] text-xs font-black text-slate-950">
                      {finisher.display_name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-bold text-gray-800">{finisher.display_name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 border-t border-gray-100 pt-4">
            <button type="button" onClick={() => setShowBreakdown((value) => !value)} className="text-sm font-black text-gray-950">
              {showBreakdown ? "Hide section breakdown" : "Show section breakdown"} +
            </button>
            {showBreakdown ? (
              <div className="mt-4 grid gap-3">
                {breakdownSections.map(([label, users, completionLabel]) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
                    <p className="text-xs font-black uppercase tracking-wide text-gray-500">{label} ({users.length})</p>
                    {users.length ? (
                      <div className="mt-3 flex flex-col gap-2">
                        {users.map((user) => (
                          <div key={`${label}-${user.user_id}`} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 shadow-sm">
                            <div className="flex min-w-0 items-center gap-2">
                              {user.profile_image_url ? (
                                <img src={user.profile_image_url} alt={user.display_name} className="h-7 w-7 rounded-full object-cover" />
                              ) : (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7BAFD4] text-xs font-black text-slate-950">
                                  {user.display_name.slice(0, 1).toUpperCase()}
                                </div>
                              )}
                              <span className="truncate text-sm font-bold text-gray-800">{user.display_name}</span>
                            </div>
                            <span className="shrink-0 text-xs font-semibold text-gray-500">
                              {completionLabel}{user.completed_at ? ` ${formatCompletedDate(user.completed_at)}` : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-700">No buddies yet.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <CollapsibleTask taskNumber={1} title="Bible Study Intro" done={introDone} open={openTask === 1} onToggle={() => setOpenTask(openTask === 1 ? null : 1)}>
            <h2 className="mb-5 text-2xl font-black leading-tight text-gray-950">{day.day_title}</h2>
            <div className="text-gray-700" style={{ fontSize: "1rem" }}>
              {devotionalBlocks.map((block) => {
                if (block.kind === "divider") {
                  return <hr key={block.key} className="my-6 border-gray-200" />;
                }

                if (block.kind === "heading") {
                  const className =
                    block.level === 1
                      ? "mb-3 mt-6 text-2xl font-black leading-tight tracking-normal text-gray-950 first:mt-0"
                      : "mb-3 mt-7 border-b border-gray-200 pb-2 text-xl font-black leading-tight tracking-normal text-gray-950";
                  const HeadingTag = block.level === 1 ? "h2" : "h3";
                  return (
                    <HeadingTag
                      key={block.key}
                      className={className}
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }

                if (block.kind === "quote") {
                  return (
                    <blockquote
                      key={block.key}
                      className="my-5 rounded-xl border-l-4 border-[#7BAFD4] bg-[#eef6fd] px-4 py-3 text-base font-semibold leading-relaxed text-gray-900"
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  );
                }

                if (block.kind === "list") {
                  return (
                    <ul key={block.key} className="mb-5 ml-5 list-disc space-y-2 leading-relaxed text-gray-800">
                      {block.items.map((item, index) => (
                        <li key={`${block.key}-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={block.key}
                    className="mb-4 leading-relaxed text-gray-800"
                    dangerouslySetInnerHTML={{ __html: block.html }}
                  />
                );
              })}
            </div>
            <div className="mt-6 flex justify-center border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={() => void markIntroComplete()}
                disabled={introDone}
                className={`w-full max-w-sm rounded-xl px-6 py-3 text-sm font-black shadow-sm ${introDone ? "bg-emerald-100 text-emerald-700" : "text-slate-950"}`}
                style={introDone ? undefined : { backgroundColor: TASK_BLUE }}
              >
                {introDone
                  ? `Intro Reading Completed${introCompletedDate ? ` ${introCompletedDate}` : ""}`
                  : "Mark as Completed"}
              </button>
            </div>
          </CollapsibleTask>

          <CollapsibleTask taskNumber={2} title={`Read "${chapterLabel}"`} done={readingDone} open={openTask === 2} onToggle={() => setOpenTask(openTask === 2 ? null : 2)}>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowReading(true)}
                className={`rounded-xl px-6 py-3 text-sm font-black shadow-sm ${readingDone ? "bg-emerald-100 text-emerald-700" : "text-slate-950"}`}
                style={readingDone ? undefined : { backgroundColor: TASK_BLUE }}
              >
                {readingDone ? `Read ${chapterLabel}` : `Read ${chapterLabel}`}
              </button>
            </div>
          </CollapsibleTask>

          <CollapsibleTask taskNumber={3} title="Chapter Notes" done={notesDone} open={openTask === 3} onToggle={() => setOpenTask(openTask === 3 ? null : 3)}>
            <div className="text-center">
              <p className="mx-auto mb-4 max-w-md text-sm leading-6 text-gray-600">Open the {chapterLabel} notes when you are ready to go deeper.</p>
              <button type="button" onClick={() => void openNotes()} className={`rounded-xl px-6 py-3 text-sm font-black shadow-sm ${notesDone ? "bg-emerald-100 text-emerald-700" : "text-slate-950"}`} style={notesDone ? undefined : { backgroundColor: TASK_BLUE }}>
                {notesDone ? "Open Notes Again" : "Open Chapter Notes"}
              </button>
            </div>
          </CollapsibleTask>

          <CollapsibleTask taskNumber={4} title="Trivia" done={triviaDone} open={openTask === 4} onToggle={() => setOpenTask(openTask === 4 ? null : 4)}>
            <div className="text-center">
              <p className="mx-auto mb-4 max-w-md text-sm leading-6 text-gray-600">Test what is sticking from {chapterLabel} with a short trivia round.</p>
              <button type="button" onClick={() => setShowTrivia(true)} disabled={!triviaBook || !triviaChapter} className="rounded-xl px-6 py-3 text-sm font-black text-slate-950 shadow-sm disabled:opacity-60" style={{ backgroundColor: triviaBook && triviaChapter ? TASK_BLUE : "#cbd5e1" }}>
                {triviaDone ? "Play Trivia Again" : "Start Trivia"}
              </button>
            </div>
          </CollapsibleTask>

          <CollapsibleTask taskNumber={5} title="Scrambled" done={scrambledDone} open={openTask === 5} onToggle={() => setOpenTask(openTask === 5 ? null : 5)}>
            <div className="text-center">
              <p className="mx-auto mb-4 max-w-md text-sm leading-6 text-gray-600">Slow down with key words from {chapterLabel} and lock them into memory.</p>
              <button type="button" onClick={() => setShowScrambled(true)} disabled={!scrambledBook || !scrambledChapter} className="rounded-xl px-6 py-3 text-sm font-black text-slate-950 shadow-sm disabled:opacity-60" style={{ backgroundColor: scrambledBook && scrambledChapter ? TASK_BLUE : "#cbd5e1" }}>
                {scrambledDone ? "Play Scrambled Again" : "Play Scrambled"}
              </button>
            </div>
          </CollapsibleTask>

          <CollapsibleTask taskNumber={6} title="Answer The Reflection Question" done={reflectionDone} open={openTask === 6} onToggle={() => setOpenTask(openTask === 6 ? null : 6)}>
            <p className="mb-4 text-xl font-black leading-snug text-gray-950">{day.reflection_question}</p>
            <CommentSection
              articleSlug={chapterSlug(day.bible_reading_book, day.bible_reading_chapter)}
              headingText=""
              placeholderText="Start Typing Here"
              submitButtonText="Post Reflection"
              variant="plain"
              onPosted={() => {
                setReflectionDone(true);
                void markReflectionComplete();
                void loadFinishers(day);
              }}
            />
          </CollapsibleTask>
        </div>
      </div>

      {showReading ? (
        <BibleReadingModal
          book={day.bible_reading_book}
          chapter={day.bible_reading_chapter}
          onClose={() => {
            setShowReading(false);
            void markReadingComplete();
          }}
          onMarkComplete={() => void markReadingComplete()}
        />
      ) : null}

      <ModalShell isOpen={showNotes} onClose={() => setShowNotes(false)} scrollable backdropColor="bg-black/55">
        <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f8fb7]">Chapter Notes</p>
              <h2 className="text-lg font-bold text-gray-900">{chapterLabel} Study Notes</h2>
            </div>
            <button type="button" onClick={() => setShowNotes(false)} className="text-2xl font-bold text-gray-500">x</button>
          </div>
          <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
            {notesLoading ? <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p> : <ChapterNotesMarkdown>{notesText}</ChapterNotesMarkdown>}
          </div>
        </div>
      </ModalShell>

      {showTrivia && triviaBook && triviaChapter ? (
        <ModalShell isOpen={showTrivia} onClose={() => { setShowTrivia(false); void loadAll(); }} scrollable backdropColor="bg-black/55">
          <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <TriviaGamePlayer
              bookName={triviaBook.name}
              bookSlug={triviaBook.routeSlug}
              chapter={triviaChapter}
              onComplete={() => {
                setTriviaDone(true);
                window.setTimeout(() => void loadFinishers(day), 500);
              }}
              onClose={() => { setShowTrivia(false); void loadAll(); }}
            />
          </div>
        </ModalShell>
      ) : null}

      {showScrambled && scrambledBook && scrambledChapter ? (
        <ModalShell isOpen={showScrambled} onClose={() => { setShowScrambled(false); void loadAll(); }} scrollable backdropColor="bg-black/55">
          <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <ScrambledGamePlayer
              bookName={scrambledBook.name}
              bookSlug={scrambledBook.slug}
              chapter={scrambledChapter}
              onComplete={() => {
                setScrambledDone(true);
                window.setTimeout(() => void loadFinishers(day), 500);
              }}
              onClose={() => { setShowScrambled(false); void loadAll(); }}
            />
          </div>
        </ModalShell>
      ) : null}
    </div>
  );
}
