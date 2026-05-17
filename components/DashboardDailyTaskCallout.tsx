"use client";

import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import { ColorPicker } from "./ColorPicker";
import { ModalShell } from "./ModalShell";
import ScrambledGamePlayer from "./ScrambledGamePlayer";
import TriviaGamePlayer from "./TriviaGamePlayer";
import CommentSection from "./comments/CommentSection";
import type { TaskState } from "./LouisDailyTasksModal";
import { triggerPoints } from "./PointsPop";
import { ACTION_TYPE } from "../lib/actionTypes";
import { consumeCreditAction } from "../lib/creditClient";
import { supabase } from "../lib/supabaseClient";
import { markChapterDone } from "../lib/readingProgress";
import { getProverbsChapterNotesFallback, withNotesTimeout } from "../lib/proverbsChapterNotesFallback";
import { getScrambledBook, getScrambledChapter } from "../lib/scrambledGameData";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaBook, getTriviaChapter } from "../lib/triviaGameData";
import { deleteHighlight, fetchHighlights, upsertHighlight } from "../lib/verseHighlightingApi";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes } from "../lib/bibleNotes";

type Props = {
  task: TaskState | null;
  userId: string | null;
  onClose: () => void;
  onProgressUpdated: (completedTask?: TaskState) => void;
  variant?: "modal" | "inline";
  enableDashboardSkip?: boolean;
};

type DevotionalRow = {
  id: string;
  title: string;
  total_days: number | null;
};

type DevotionalDayRow = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
};

type DayProgressRow = {
  day_number: number;
  is_completed: boolean;
  reading_completed: boolean;
  reflection_text: string | null;
};

type BibleApiVerse = {
  verse: number;
  text: string;
};

type BibleApiResponse = {
  reference: string;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
  verses: BibleApiVerse[];
};

type InlineBibleTranslation = "kjv" | "asv" | "web";

const INLINE_BIBLE_TRANSLATIONS: Array<{ value: InlineBibleTranslation; label: string }> = [
  { value: "kjv", label: "KJV" },
  { value: "asv", label: "ASV" },
  { value: "web", label: "WEB" },
];

class TaskPlayerErrorBoundary extends Component<
  { taskKey: string; onClose: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[DASHBOARD TASK] Embedded task crashed:", error);
  }

  componentDidUpdate(previousProps: { taskKey: string }) {
    if (previousProps.taskKey !== this.props.taskKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white px-5 py-8 text-center">
          <h2 className="text-2xl font-black text-gray-900">This task needs a quick refresh</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
            Bible Buddy could not open this task cleanly. Close this and try again from the dashboard.
          </p>
          <button
            type="button"
            onClick={this.props.onClose}
            className="mt-6 rounded-full bg-[#7BAFD4] px-6 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3ca]"
          >
            Close
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function parseDevotionalTask(task: TaskState) {
  if (task.devotionalId && task.devotionalDayNumber) {
    return {
      devotionalId: task.devotionalId,
      dayNumber: task.devotionalDayNumber,
    };
  }
  if (!task.href) return null;
  const match = task.href.match(/\/(?:devotionals|bible-studies)\/([^/?]+)(?:\/day\/(\d+)|\?day=(\d+))/);
  if (!match) return null;
  return {
    devotionalId: decodeURIComponent(match[1]),
    dayNumber: Number(match[2] || match[3]),
  };
}

function chapterSlug(book: string, chapter: number) {
  return `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;
}

function normalizeBibleBookForApi(book: string) {
  return book.toLowerCase().replace(/\s+/g, "");
}

function normalizeBibleBookDisplay(book: string) {
  return book
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getHighlightColorCode(color: string) {
  switch (color) {
    case "yellow": return "#FFF9C4";
    case "green": return "#C8E6C9";
    case "blue": return "#BBDEFB";
    case "purple": return "#E1BEE7";
    case "orange": return "#FFE0B2";
    default:
      return "transparent";
  }
}

function normalizeInlinePopupMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function DashboardInlineBibleReader({
  book,
  chapter,
  chapterLabel,
  userId,
  onDone,
  onClose,
}: {
  book: string;
  chapter: number;
  chapterLabel: string;
  userId: string | null;
  onDone: () => Promise<void>;
  onClose: () => void;
}) {
  const [translation, setTranslation] = useState<InlineBibleTranslation>("kjv");
  const [verses, setVerses] = useState<BibleApiVerse[]>([]);
  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [picker, setPicker] = useState<{ verse: number; anchor: { x: number; y: number } } | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<{ type: "people" | "places" | "keywords"; name: string } | null>(null);
  const [termNotes, setTermNotes] = useState<string | null>(null);
  const [termNotesError, setTermNotesError] = useState<string | null>(null);
  const [loadingTermNotes, setLoadingTermNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markingDone, setMarkingDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bookDisplay = normalizeBibleBookDisplay(book);

  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setError(null);

      try {
        const apiBook = normalizeBibleBookForApi(book);
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 12000);
        const response = await fetch(`https://bible-api.com/${apiBook}+${chapter}?translation=${translation}`, {
          signal: controller.signal,
        });
        window.clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Could not load ${chapterLabel}.`);
        }

        const data = (await response.json()) as BibleApiResponse;
        if (!cancelled) {
          setVerses(data.verses || []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setVerses([]);
          setError(loadError instanceof Error && loadError.name === "AbortError" ? "The chapter took too long to load." : "Could not load this chapter.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadChapter();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, chapterLabel, translation]);

  useEffect(() => {
    let cancelled = false;

    async function loadHighlights() {
      if (!userId) {
        setHighlightMap({});
        return;
      }

      const saved = await fetchHighlights(book, chapter);
      if (cancelled) return;

      const next: Record<number, string> = {};
      saved.forEach((highlight) => {
        next[highlight.verse] = highlight.color;
      });
      setHighlightMap(next);
    }

    void loadHighlights();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, userId]);

  function openVerseColorPicker(verse: number, event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    if (target.closest(".bible-highlight")) return;
    const rect = target.getBoundingClientRect();
    setPicker({
      verse,
      anchor: {
        x: Math.min(window.innerWidth - 190, Math.max(12, rect.left + rect.width / 2 - 70)),
        y: rect.bottom + 8,
      },
    });
  }

  async function handleHighlightColorSelect(color: string | null) {
    if (!picker) return;
    const { verse } = picker;
    const previous = highlightMap[verse] || null;
    setPicker(null);

    if (!color || color === previous) {
      setHighlightMap((current) => {
        const next = { ...current };
        delete next[verse];
        return next;
      });
      await deleteHighlight(book, chapter, verse);
      return;
    }

    if (userId) {
      const creditResult = await consumeCreditAction(ACTION_TYPE.verse_highlighted, { userId });
      if (!creditResult.ok) return;
    }

    setHighlightMap((current) => ({ ...current, [verse]: color }));
    await upsertHighlight(book, chapter, verse, color);
  }

  function handleBibleTermClick(event: React.MouseEvent<HTMLDivElement>) {
    const highlightElement = (event.target as HTMLElement).closest(".bible-highlight") as HTMLElement | null;
    if (!highlightElement) return;

    event.preventDefault();
    event.stopPropagation();

    const type = highlightElement.dataset.type as "people" | "places" | "keywords" | undefined;
    const term = highlightElement.dataset.term;
    if (!type || !term) return;

    setSelectedTerm({ type, name: resolveBibleReference(type, term) });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadTermNotes() {
      if (!selectedTerm) return;
      setLoadingTermNotes(true);
      setTermNotes(null);
      setTermNotesError(null);

      try {
        const notes =
          selectedTerm.type === "people"
            ? await getPersonPopupNotes(selectedTerm.name)
            : selectedTerm.type === "places"
              ? await getPlacePopupNotes(selectedTerm.name)
              : await getKeywordPopupNotes(selectedTerm.name);

        if (!cancelled) setTermNotes(notes);
      } catch {
        if (!cancelled) setTermNotesError("Could not load this word yet.");
      } finally {
        if (!cancelled) setLoadingTermNotes(false);
      }
    }

    void loadTermNotes();

    return () => {
      cancelled = true;
    };
  }, [selectedTerm]);

  function closeTermPopup() {
    setSelectedTerm(null);
    setTermNotes(null);
    setTermNotesError(null);
  }

  async function handleDone() {
    setMarkingDone(true);
    try {
      await onDone();
    } finally {
      setMarkingDone(false);
    }
  }

  return (
    <div className="dashboard-task-card-extension mt-2 px-1 pb-2 pt-1">
      <div className="mb-4 flex justify-end">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="dashboard-bible-translation">
            Bible translation
          </label>
          <select
            id="dashboard-bible-translation"
            value={translation}
            onChange={(event) => setTranslation(event.target.value as InlineBibleTranslation)}
            className="rounded-full border border-[var(--bb-card-border)] bg-transparent px-3 py-2 text-xs font-black uppercase text-[var(--bb-text-primary)] outline-none transition focus:border-[var(--bb-accent)] focus:ring-2 focus:ring-[var(--bb-accent)]/20"
          >
            {INLINE_BIBLE_TRANSLATIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="bb-text-secondary py-8 text-sm font-semibold">Loading {chapterLabel}...</p>
      ) : error ? (
        <p className="py-8 text-sm font-bold text-red-600">{error}</p>
      ) : (
        <div className="space-y-3" onClick={handleBibleTermClick}>
          {verses.map((verse) => {
            const highlightColor = highlightMap[verse.verse];
            return (
              <p
                key={verse.verse}
                onClick={(event) => openVerseColorPicker(verse.verse, event)}
                className="bb-text-primary cursor-pointer rounded-lg px-1 py-1 text-base font-medium leading-8 transition"
                style={{ backgroundColor: highlightColor ? getHighlightColorCode(highlightColor) : "transparent" }}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openVerseColorPicker(verse.verse, event);
                  }}
                  className="mr-2 inline-flex min-w-7 translate-y-[-1px] items-center justify-center rounded-full border border-[var(--bb-card-border)] bg-transparent px-2 py-0.5 text-xs font-black text-[var(--bb-accent)] transition hover:border-[var(--bb-accent)] hover:bg-[var(--bb-accent-soft)]"
                  aria-label={`Highlight verse ${verse.verse}`}
                >
                  {verse.verse}
                </button>
                <span
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Bible text is escaped before enrichment.
                  dangerouslySetInnerHTML={{ __html: enrichPlainText(verse.text) }}
                />
              </p>
            );
          })}
        </div>
      )}

      <ColorPicker
        anchor={picker?.anchor || null}
        selectedColor={picker ? highlightMap[picker.verse] || null : null}
        onSelect={handleHighlightColorSelect}
        onClose={() => setPicker(null)}
      />

      {selectedTerm ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-5"
          onClick={closeTermPopup}
        >
          <div
            className="max-h-[72vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[var(--bb-card-border)] bg-[var(--bb-card,#ffffff)] p-5 text-[var(--bb-text-primary,#111827)] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
                  {selectedTerm.type === "keywords" ? "Keyword" : selectedTerm.type === "places" ? "Place" : "Person"}
                </p>
                <h3 className="mt-1 text-2xl font-black leading-tight">{selectedTerm.name}</h3>
              </div>
              <button
                type="button"
                onClick={closeTermPopup}
                className="rounded-full border border-[var(--bb-card-border)] px-3 py-1 text-sm font-black text-[var(--bb-text-secondary,#5f6368)]"
                aria-label="Close word notes"
              >
                Close
              </button>
            </div>
            {loadingTermNotes && !termNotes ? (
              <div className="space-y-3 py-6">
                <div className="h-3 rounded-full bg-gray-100" />
                <div className="h-3 w-5/6 rounded-full bg-gray-100" />
                <div className="h-3 w-2/3 rounded-full bg-gray-100" />
              </div>
            ) : termNotes ? (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-3 mt-5 text-xl font-black" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 text-sm font-medium leading-6" {...props} />,
                  strong: ({ ...props }) => <strong className="font-black" {...props} />,
                }}
              >
                {normalizeInlinePopupMarkdown(termNotes)}
              </ReactMarkdown>
            ) : (
              <p className="py-6 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">
                {termNotesError || "Could not load this word yet."}
              </p>
            )}
          </div>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => void handleDone()}
            disabled={markingDone}
            className="rounded-full bg-[var(--bb-button)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text)] transition hover:brightness-95 disabled:opacity-60"
          >
            {markingDone ? "Saving..." : "Mark as Completed"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function getTriviaSlugFromTask(task: TaskState) {
  if (!task.href) return null;
  const match = task.href.match(/\/bible-trivia\/([^/]+)\/(\d+)/);
  if (!match) return null;
  return {
    bookSlug: match[1],
    chapter: Number(match[2]),
  };
}

function getScrambledSlugFromTask(task: TaskState) {
  if (!task.href) return null;
  const match = task.href.match(/\/bible-study-games\/scrambled\/([^/]+)\/(\d+)/);
  if (!match) return null;
  return {
    bookSlug: match[1],
    chapter: Number(match[2]),
  };
}

export default function DashboardDailyTaskCallout({ task, userId, onClose, onProgressUpdated, variant = "modal", enableDashboardSkip = false }: Props) {
  const [devotional, setDevotional] = useState<DevotionalRow | null>(null);
  const [devotionalDay, setDevotionalDay] = useState<DevotionalDayRow | null>(null);
  const [dayProgress, setDayProgress] = useState<DayProgressRow | undefined>(undefined);
  const [devotionalLoading, setDevotionalLoading] = useState(false);
  const [devotionalError, setDevotionalError] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [notesMarkedComplete, setNotesMarkedComplete] = useState(false);
  const [interactiveTaskCompleted, setInteractiveTaskCompleted] = useState(false);
  const interactiveTaskCompletedRef = useRef(false);

  const devotionalTarget = useMemo(
    () => (task?.kind === "devotional" || task?.kind === "reflection" ? parseDevotionalTask(task) : null),
    [task],
  );
  const triviaTarget = useMemo(() => (task?.kind === "trivia" ? getTriviaSlugFromTask(task) : null), [task]);
  const scrambledTarget = useMemo(() => (task?.kind === "scrambled" ? getScrambledSlugFromTask(task) : null), [task]);

  const triviaPack = useMemo(() => {
    if (!triviaTarget) return null;
    const bookKey = CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.routeSlug === triviaTarget.bookSlug)?.key ?? triviaTarget.bookSlug;
    const book = getTriviaBook(bookKey);
    const chapter = getTriviaChapter(bookKey, triviaTarget.chapter);
    return book && chapter ? { book, chapter } : null;
  }, [triviaTarget]);

  const scrambledPack = useMemo(() => {
    if (!scrambledTarget) return null;
    const book = getScrambledBook(scrambledTarget.bookSlug);
    const chapter = getScrambledChapter(scrambledTarget.bookSlug, scrambledTarget.chapter);
    return book && chapter ? { book, chapter } : null;
  }, [scrambledTarget]);

  useEffect(() => {
    setInteractiveTaskCompleted(false);
    interactiveTaskCompletedRef.current = false;
  }, [task?.kind, task?.href, task?.chapterLabel]);

  function markInteractiveTaskComplete() {
    interactiveTaskCompletedRef.current = true;
    setInteractiveTaskCompleted(true);
  }

  function closeOnly() {
    onClose();
  }

  function closeAndRefresh(completed = false) {
    const completedTask = task ?? undefined;
    onClose();
    onProgressUpdated(completed || interactiveTaskCompletedRef.current || interactiveTaskCompleted ? completedTask : undefined);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadDevotional() {
      if (!userId || !devotionalTarget) return;
      setDevotionalLoading(true);
      setDevotionalError(null);

      try {
        const [{ data: devotionalData, error: devotionalErr }, { data: dayData, error: dayErr }, { data: progressData, error: progressErr }] =
          await Promise.all([
            supabase.from("devotionals").select("id, title, total_days").eq("id", devotionalTarget.devotionalId).maybeSingle(),
            supabase
              .from("devotional_days")
              .select("day_number, day_title, devotional_text, bible_reading_book, bible_reading_chapter, reflection_question")
              .eq("devotional_id", devotionalTarget.devotionalId)
              .eq("day_number", devotionalTarget.dayNumber)
              .maybeSingle(),
            supabase
              .from("devotional_progress")
              .select("day_number, is_completed, reading_completed, reflection_text")
              .eq("user_id", userId)
              .eq("devotional_id", devotionalTarget.devotionalId)
              .eq("day_number", devotionalTarget.dayNumber)
              .maybeSingle(),
          ]);

        if (devotionalErr) throw devotionalErr;
        if (dayErr) throw dayErr;
        if (progressErr) throw progressErr;
        if (!devotionalData || !dayData) throw new Error("Could not load this devotional day.");

        if (!cancelled) {
          setDevotional(devotionalData as DevotionalRow);
          setDevotionalDay(dayData as DevotionalDayRow);
          setDayProgress((progressData as DayProgressRow | null) ?? undefined);
        }
      } catch (error: any) {
        if (!cancelled) setDevotionalError(error?.message || "Could not load this devotional day.");
      } finally {
        if (!cancelled) setDevotionalLoading(false);
      }
    }

    void loadDevotional();

    return () => {
      cancelled = true;
    };
  }, [devotionalTarget, userId]);

  useEffect(() => {
    let cancelled = false;

    async function loadNotes() {
      if (task?.kind !== "notes" || !task.book || !task.chapter) return;
      setNotesLoading(true);
      setNotesError(null);
      setNotesMarkedComplete(task.done);

      try {
        const bookKey = task.book.toLowerCase().trim();
        const fallbackNotes = getProverbsChapterNotesFallback(task.book, task.chapter);
        const { data: cached, error } = await withNotesTimeout(
          supabase
            .from("bible_notes")
            .select("notes_text")
            .eq("book", bookKey)
            .eq("chapter", task.chapter)
            .maybeSingle(),
        );

        if (error) throw error;

        if (!cancelled) {
          setNotesText(cached?.notes_text || fallbackNotes || "No notes are available for this chapter yet.");
        }
      } catch (error: any) {
        const fallbackNotes = getProverbsChapterNotesFallback(task.book, task.chapter);
        if (!cancelled) {
          setNotesText(fallbackNotes || "No notes are available for this chapter yet.");
          setNotesError(fallbackNotes ? null : error?.message || "Could not load the chapter notes.");
        }
      } finally {
        if (!cancelled) setNotesLoading(false);
      }
    }

    void loadNotes();

    return () => {
      cancelled = true;
    };
  }, [task]);

  async function markNotesComplete() {
    if (!userId || !task?.book || !task.chapter || notesMarkedComplete) return;
    const chapterLabel = task.chapterLabel || `${task.book} ${task.chapter}`;
    const reviewOpenedLabel = `${chapterLabel} Review Opened`;

    await supabase.from("master_actions").insert({
      user_id: userId,
      action_type: ACTION_TYPE.chapter_notes_viewed,
      action_label: reviewOpenedLabel,
    });

    const { data: existingReviewed } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.chapter_notes_reviewed)
      .eq("action_label", reviewOpenedLabel)
      .limit(1)
      .maybeSingle();

    if (!existingReviewed) {
      const { error } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.chapter_notes_reviewed,
        action_label: reviewOpenedLabel,
      });
      if (!error) triggerPoints(5);
    }

    setNotesMarkedComplete(true);
  }

  async function handleReadingMarkedComplete() {
    if (!userId || !task?.book || !task.chapter) return;

    await markChapterDone(userId, task.book, task.chapter);

    if (task.devotionalId && task.devotionalDayNumber) {
      await supabase.from("devotional_progress").upsert(
        {
          user_id: userId,
          devotional_id: task.devotionalId,
          day_number: task.devotionalDayNumber,
          reading_completed: true,
        },
        { onConflict: "user_id,devotional_id,day_number" },
      );
    }
  }

  async function closeReadingAndRefresh() {
    await handleReadingMarkedComplete();
    closeAndRefresh(true);
  }

  async function closeNotesAndRefresh() {
    await markNotesComplete();
    closeAndRefresh(true);
  }

  async function handleDevotionalIntroComplete() {
    if (!userId || !devotionalTarget || !devotional) return;

    const { data: existingProgressData } = await supabase
      .from("devotional_progress")
      .select("is_completed")
      .eq("user_id", userId)
      .eq("devotional_id", devotionalTarget.devotionalId)
      .eq("day_number", devotionalTarget.dayNumber)
      .maybeSingle();
    const wasAlreadyCompleted = existingProgressData?.is_completed === true;

    await supabase.from("devotional_progress").upsert(
      {
        user_id: userId,
        devotional_id: devotionalTarget.devotionalId,
        day_number: devotionalTarget.dayNumber,
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,devotional_id,day_number" },
    );

    setDayProgress((prev) => ({
      day_number: devotionalTarget.dayNumber,
      is_completed: true,
      reading_completed: prev?.reading_completed ?? false,
      reflection_text: prev?.reflection_text ?? null,
    }));

    if (!wasAlreadyCompleted) {
      const { data } = await supabase.auth.getUser();
      const meta: any = data.user?.user_metadata || {};
      const username = meta.firstName || meta.first_name || (data.user?.email ? data.user.email.split("@")[0] : null) || "User";
      const { error } = await supabase.from("master_actions").insert({
        user_id: userId,
        username,
        action_type: ACTION_TYPE.devotional_day_completed,
        action_label: `${devotional.title} - Day ${devotionalTarget.dayNumber}`,
      });
      if (!error) triggerPoints(5);
    }

  }

  async function markReflectionComplete() {
    if (!userId || !devotionalTarget || !devotional) return;

    const actionLabel = `${devotional.title} - Day ${devotionalTarget.dayNumber}`;
    const { data: existing } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.devotional_reflection_saved)
      .eq("action_label", actionLabel)
      .limit(1)
      .maybeSingle();

    if (existing) return;

    const { data } = await supabase.auth.getUser();
    const meta: any = data.user?.user_metadata || {};
    const username = meta.firstName || meta.first_name || (data.user?.email ? data.user.email.split("@")[0] : null) || "User";

    const { error } = await supabase.from("master_actions").insert({
      user_id: userId,
      username,
      action_type: ACTION_TYPE.devotional_reflection_saved,
      action_label: actionLabel,
    });

    if (!error) triggerPoints(5);
  }

  async function closeIntroAndRefresh() {
    await handleDevotionalIntroComplete();
    closeAndRefresh(true);
  }

  if (!task) return null;

  const isInline = variant === "inline";
  const inlineFrame = (children: ReactNode, className = "") => (
    <div className={`dashboard-task-card-extension mt-3 overflow-hidden border-t border-[var(--bb-card-border)] pt-3 ${className}`}>
      {children}
    </div>
  );

  if (task.kind === "reading" && task.book && task.chapter) {
    const chapterLabel = task.chapterLabel || `${task.book} ${task.chapter}`;

    if (isInline) {
      return (
        <DashboardInlineBibleReader
          book={task.book}
          chapter={task.chapter}
          chapterLabel={chapterLabel}
          userId={userId}
          onClose={closeOnly}
          onDone={closeReadingAndRefresh}
        />
      );
    }

    const readerPath = `/Bible/${encodeURIComponent(task.book)}/${task.chapter}?from=louis-daily-task&embedded=chapter-text`;
    const readerPanel = (
      <div className={`relative flex w-full flex-col overflow-hidden bg-white ${isInline ? "h-[78vh] min-h-[560px]" : "h-[92vh]"}`}>
          <button
            type="button"
            onClick={() => void closeReadingAndRefresh()}
            className="absolute right-3 top-3 z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-200 bg-white/95 text-2xl font-light leading-none text-gray-700 shadow-lg backdrop-blur transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
            aria-label="Close Bible reader"
          >
            x
          </button>
        <iframe
          src={readerPath}
          title={`${chapterLabel} Bible reader`}
          className="min-h-0 flex-1 border-0 bg-white"
          loading="eager"
        />
      </div>
    );

    return (
      <ModalShell isOpen={true} onClose={() => void closeReadingAndRefresh()} backdropColor="bg-black/65" closeOnBackdrop={false}>
        <div className="relative mx-2 flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] border border-[#d7e4f7] bg-white shadow-2xl sm:mx-4">
          {readerPanel}
        </div>
      </ModalShell>
    );
  }

  if (task.kind === "devotional" || task.kind === "reflection") {
    if (devotionalDay && devotional) {
      const chapterLabel = `${devotionalDay.bible_reading_book} ${devotionalDay.bible_reading_chapter}`;

      if (task.kind === "reflection") {
        if (isInline) {
          return inlineFrame(
            <div className="relative bg-white">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4f8fb7]">Task 6</p>
                  <h2 className="text-lg font-bold text-gray-900">Answer The Reflection Question</h2>
                  <p className="mt-1 text-sm text-gray-600">{chapterLabel}</p>
                </div>
                <button type="button" onClick={closeOnly} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close reflection">
                  Ã—
                </button>
              </div>
              <div className="px-6 py-5">
                <p className="mb-5 text-xl font-black leading-snug text-gray-950">
                  {devotionalDay.reflection_question || "What stood out to you from this chapter?"}
                </p>
                <CommentSection
                  articleSlug={chapterSlug(devotionalDay.bible_reading_book, devotionalDay.bible_reading_chapter)}
                  headingText=""
                  placeholderText="Start Typing Here"
                  submitButtonText="Post Reflection"
                  variant="plain"
                  onPosted={() => {
                    void markReflectionComplete();
                    closeAndRefresh(true);
                  }}
                />
              </div>
            </div>,
          );
        }

        return (
          <ModalShell isOpen={true} onClose={closeOnly} backdropColor="bg-black/55" scrollable closeOnBackdrop={false}>
            <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4f8fb7]">Task 6</p>
                  <h2 className="text-lg font-bold text-gray-900">Answer The Reflection Question</h2>
                  <p className="mt-1 text-sm text-gray-600">{chapterLabel}</p>
                </div>
                <button type="button" onClick={closeOnly} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close reflection">
                  ×
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
                <p className="mb-5 text-xl font-black leading-snug text-gray-950">
                  {devotionalDay.reflection_question || "What stood out to you from this chapter?"}
                </p>
                <CommentSection
                  articleSlug={chapterSlug(devotionalDay.bible_reading_book, devotionalDay.bible_reading_chapter)}
                  headingText=""
                  placeholderText="Start Typing Here"
                  submitButtonText="Post Reflection"
                  variant="plain"
                  onPosted={() => {
                    void markReflectionComplete();
                    closeAndRefresh(true);
                  }}
                />
              </div>
            </div>
          </ModalShell>
        );
      }

      if (isInline) {
        return inlineFrame(
          <div className="relative">
            <div className="hidden">
              <div>
                <p className="bb-accent text-xs font-black uppercase tracking-widest">Task 1</p>
                <h2 className="bb-text-primary text-lg font-black">{chapterLabel}</h2>
                <p className="bb-text-secondary mt-1 text-sm font-semibold">
                  {devotionalDay.day_title}
                </p>
              </div>
              <button type="button" onClick={() => void closeIntroAndRefresh()} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close intro">
                Ã—
              </button>
            </div>
            <div className="px-1 py-3">
              <ChapterNotesMarkdown>{devotionalDay.devotional_text}</ChapterNotesMarkdown>
            </div>
            <div className="flex justify-end px-1 pb-1 pt-3">
              <button
                type="button"
                onClick={() => void closeIntroAndRefresh()}
                className="rounded-full bg-[var(--bb-button)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text)] transition hover:brightness-95"
              >
                Mark as Completed
              </button>
            </div>
          </div>,
        );
      }

      return (
        <ModalShell isOpen={true} onClose={() => void closeIntroAndRefresh()} backdropColor="bg-black/55" scrollable closeOnBackdrop={false}>
          <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4f8fb7]">Task 1</p>
                <h2 className="text-lg font-bold text-gray-900">{chapterLabel}</h2>
                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {devotionalDay.day_title}
                </p>
              </div>
              <button type="button" onClick={() => void closeIntroAndRefresh()} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close intro">
                ×
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
              <ChapterNotesMarkdown>{devotionalDay.devotional_text}</ChapterNotesMarkdown>
            </div>
          </div>
        </ModalShell>
      );
    }

    if (isInline) {
      return inlineFrame(
        <div className="p-6 text-center">
          <p className="text-sm font-semibold text-gray-900">{devotionalLoading ? "Loading Bible Study..." : devotionalError || "Could not open this task."}</p>
        </div>,
      );
    }

    return (
      <ModalShell isOpen={true} onClose={closeOnly} backdropColor="bg-black/45" closeOnBackdrop={false}>
        <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
          <p className="text-sm font-semibold text-gray-900">{devotionalLoading ? "Loading Bible Study..." : devotionalError || "Could not open this task."}</p>
        </div>
      </ModalShell>
    );
  }

  if (task.kind === "notes") {
    if (isInline) {
      return inlineFrame(
        <div className="relative">
          <div className="hidden">
            <div>
              <p className="bb-accent text-xs font-black uppercase tracking-widest">Chapter Notes</p>
              <h2 className="bb-text-primary text-base font-black">{task.chapterLabel || task.title}</h2>
            </div>
            <button type="button" onClick={() => void closeNotesAndRefresh()} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close notes">
              Ã—
            </button>
          </div>
          <div className="px-1 py-3">
            {notesLoading ? (
              <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p>
            ) : notesError ? (
              <p className="py-10 text-center text-sm text-red-500">{notesError}</p>
            ) : (
              <div className="max-w-none text-gray-800">
                <ChapterNotesMarkdown>{notesText}</ChapterNotesMarkdown>
              </div>
            )}
          </div>
          {!notesLoading && !notesError ? (
            <div className="flex justify-end px-1 pb-1 pt-3">
              <button
                type="button"
                onClick={() => void closeNotesAndRefresh()}
                className="animate-pulse rounded-full bg-[var(--bb-button)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text)] transition hover:brightness-95"
              >
                Mark as Completed
              </button>
            </div>
          ) : null}
        </div>,
        "mt-0 border-t-0 pt-0",
      );
    }

    return (
      <ModalShell isOpen={true} onClose={() => void closeNotesAndRefresh()} backdropColor="bg-black/55" scrollable closeOnBackdrop={false}>
        <div className="relative my-6 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Chapter Notes</p>
              <h2 className="text-base font-bold text-gray-900">{task.chapterLabel || task.title}</h2>
            </div>
            <button type="button" onClick={() => void closeNotesAndRefresh()} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close notes">
              ×
            </button>
          </div>
          <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
            {notesLoading ? (
              <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p>
            ) : notesError ? (
              <p className="py-10 text-center text-sm text-red-500">{notesError}</p>
            ) : (
              <div className="max-w-none text-gray-800">
                <ChapterNotesMarkdown>{notesText}</ChapterNotesMarkdown>
              </div>
            )}
          </div>
        </div>
      </ModalShell>
    );
  }

  if (task.kind === "trivia" && triviaPack) {
    if (isInline) {
      return inlineFrame(
        <TaskPlayerErrorBoundary taskKey={`${task.kind}:${task.href || task.chapterLabel || task.title}`} onClose={closeOnly}>
          <TriviaGamePlayer
            bookName={triviaPack.book.name}
            bookSlug={triviaPack.book.routeSlug}
            chapter={triviaPack.chapter}
            onClose={() => closeAndRefresh(interactiveTaskCompleted)}
            onComplete={markInteractiveTaskComplete}
            skipUpgradeGate
            compact
            enableDashboardSkip={enableDashboardSkip}
          />
        </TaskPlayerErrorBoundary>,
        "mt-0 border-t-0 pt-0",
      );
    }

    return (
      <ModalShell isOpen={true} onClose={closeOnly} backdropColor="bg-black/55" scrollable closeOnBackdrop={false}>
        <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <TaskPlayerErrorBoundary taskKey={`${task.kind}:${task.href || task.chapterLabel || task.title}`} onClose={closeOnly}>
            <TriviaGamePlayer
              bookName={triviaPack.book.name}
              bookSlug={triviaPack.book.routeSlug}
              chapter={triviaPack.chapter}
              onClose={() => closeAndRefresh(interactiveTaskCompleted)}
              onComplete={markInteractiveTaskComplete}
              skipUpgradeGate
            />
          </TaskPlayerErrorBoundary>
        </div>
      </ModalShell>
    );
  }

  if (task.kind === "scrambled" && scrambledPack) {
    if (isInline) {
      return inlineFrame(
        <ScrambledGamePlayer
          bookName={scrambledPack.book.name}
          bookSlug={scrambledPack.book.slug}
          chapter={scrambledPack.chapter}
          onClose={() => closeAndRefresh(interactiveTaskCompleted)}
          onComplete={markInteractiveTaskComplete}
          compact
        />,
        "mt-0 border-t-0 pt-0",
      );
    }

    return (
      <ModalShell isOpen={true} onClose={closeOnly} backdropColor="bg-black/55" scrollable closeOnBackdrop={false}>
        <div className="my-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <ScrambledGamePlayer
            bookName={scrambledPack.book.name}
            bookSlug={scrambledPack.book.slug}
            chapter={scrambledPack.chapter}
            onClose={() => closeAndRefresh(interactiveTaskCompleted)}
            onComplete={markInteractiveTaskComplete}
          />
        </div>
      </ModalShell>
    );
  }

  if (isInline) {
    return inlineFrame(
      <div className="p-6 text-center">
        <p className="text-sm font-semibold text-gray-900">This task could not be opened here.</p>
      </div>,
    );
  }

  return (
    <ModalShell isOpen={true} onClose={closeOnly} backdropColor="bg-black/45" closeOnBackdrop={false}>
      <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
        <p className="text-sm font-semibold text-gray-900">This task could not be opened here.</p>
      </div>
    </ModalShell>
  );
}
