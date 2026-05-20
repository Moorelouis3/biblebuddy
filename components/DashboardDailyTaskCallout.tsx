"use client";

import { Component, type MouseEvent, type ReactNode, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import { LouisAvatar } from "./LouisAvatar";
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
import { getChapterNotesFallback, withNotesTimeout } from "../lib/proverbsChapterNotesFallback";
import { cacheChapterNotes, fetchBibleChapterNotes, getOfflineChapterNotes } from "../lib/chapterNotesOffline";
import { getScrambledBook, getScrambledChapter } from "../lib/scrambledGameData";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../lib/triviaCatalog";
import { getTriviaBook, getTriviaChapter } from "../lib/triviaGameData";
import { enrichBibleVerses, enrichPlainText } from "../lib/bibleHighlighting";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes } from "../lib/bibleNotes";
import { TASK_XP } from "../lib/progressionRewards";
import BrowserTtsButton from "./BrowserTtsButton";

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

type BibleDatabaseTerm = { type: "people" | "places" | "keywords"; name: string };
type NotesScriptureSelection = { reference: string; apiReference: string; book: string; chapter: number };

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

function normalizeInlinePopupMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-•*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseInlineBibleReference(reference: string): NotesScriptureSelection | null {
  const match = reference.match(/^((?:[1-3]\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+):(\d+)(?:\s*(?:-|to)\s*(\d+))?$/);
  if (!match) return null;

  const book = match[1].trim();
  const chapter = Number(match[2]);
  const startVerse = Number(match[3]);
  const endVerse = match[4] ? Number(match[4]) : null;
  if (!book || Number.isNaN(chapter) || Number.isNaN(startVerse)) return null;

  return {
    reference,
    apiReference: `${book} ${chapter}:${startVerse}${endVerse ? `-${endVerse}` : ""}`,
    book,
    chapter,
  };
}

function DatabaseTermTakeover({
  selectedTerm,
  termBurstKey,
  loadingTermNotes,
  termNotes,
  termNotesError,
  onClose,
  takeoverRef,
}: {
  selectedTerm: BibleDatabaseTerm;
  termBurstKey: number;
  loadingTermNotes: boolean;
  termNotes: string | null;
  termNotesError: string | null;
  onClose: () => void;
  takeoverRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={takeoverRef} className="relative min-h-[62vh] overflow-hidden rounded-[26px] bg-[var(--bb-card,#ffffff)] px-4 py-6 text-center text-[var(--bb-text-primary,#111827)]">
      <style>{`
        @keyframes word-discovery-smoke {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); filter: blur(0); }
          18% { opacity: 0.48; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--smoke-x)), calc(-50% + var(--smoke-y))) scale(1.35); filter: blur(5px); }
        }
        @keyframes word-discovery-card {
          0% { opacity: 0; transform: translateY(14px) scale(0.92); filter: blur(1px); }
          62% { opacity: 1; transform: translateY(-3px) scale(1.015); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .word-discovery-smoke span { animation: word-discovery-smoke 780ms ease-out both; }
        .word-discovery-card { animation: word-discovery-card 260ms cubic-bezier(0.16, 0.9, 0.22, 1) both; }
      `}</style>
      <div key={termBurstKey} className="word-discovery-smoke pointer-events-none absolute left-1/2 top-24 z-0" aria-hidden="true">
        <span className="absolute h-14 w-14 rounded-full bg-slate-300/45 [--smoke-x:-84px] [--smoke-y:-22px]" />
        <span className="absolute h-12 w-12 rounded-full bg-slate-200/50 [--smoke-x:72px] [--smoke-y:-32px]" />
        <span className="absolute h-10 w-10 rounded-full bg-rose-100/70 [--smoke-x:-16px] [--smoke-y:42px]" />
        <span className="absolute h-9 w-9 rounded-full bg-slate-300/35 [--smoke-x:96px] [--smoke-y:28px]" />
        <span className="absolute h-8 w-8 rounded-full bg-white/80 [--smoke-x:-104px] [--smoke-y:34px]" />
      </div>
      <div className="word-discovery-card relative z-10 mx-auto flex min-h-[58vh] max-w-xl flex-col items-center justify-center">
        <div className="mb-3 flex justify-center">
          <LouisAvatar mood="think" size={104} />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2f7fe8)]">
          {selectedTerm.type === "keywords" ? "Keyword" : selectedTerm.type === "places" ? "Place" : "Person"}
        </p>
        <h3 className="mt-1 text-4xl font-black leading-tight">{selectedTerm.name}</h3>
        <div className="mt-5 w-full px-2 py-2">
          {loadingTermNotes && !termNotes ? (
            <div className="space-y-3 py-6">
              <div className="h-3 rounded-full bg-white/80" />
              <div className="h-3 w-5/6 rounded-full bg-white/80" />
              <div className="h-3 w-2/3 rounded-full bg-white/80" />
            </div>
          ) : termNotes ? (
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => <h1 className="mb-3 mt-5 text-left text-xl font-black" {...props} />,
                p: ({ ...props }) => <p className="mb-4 text-left text-base font-medium leading-7" {...props} />,
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
        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-full bg-[var(--bb-button,#2f7fe8)] px-8 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ScriptureReferenceTakeover({
  selectedScripture,
  loading,
  scriptureHtml,
  error,
  onClose,
  takeoverRef,
}: {
  selectedScripture: NotesScriptureSelection;
  loading: boolean;
  scriptureHtml: string | null;
  error: string | null;
  onClose: () => void;
  takeoverRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={takeoverRef} className="relative min-h-[52vh] overflow-hidden rounded-[26px] bg-[var(--bb-card,#ffffff)] px-4 py-6 text-[var(--bb-text-primary,#111827)]">
      <div className="mx-auto flex min-h-[48vh] max-w-xl flex-col justify-center">
        <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[var(--bb-accent,#2f7fe8)]">Bible Reference</p>
        <h3 className="mt-1 text-center text-3xl font-black leading-tight">{selectedScripture.reference}</h3>
        <div className="mt-5 rounded-[22px] border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-surface-soft,#f6f8fb)] px-4 py-4">
          {loading ? (
            <div className="space-y-3 py-6">
              <div className="h-3 rounded-full bg-white/90" />
              <div className="h-3 w-5/6 rounded-full bg-white/90" />
              <div className="h-3 w-2/3 rounded-full bg-white/90" />
            </div>
          ) : scriptureHtml ? (
            <div
              className="chapter-notes-scripture-popup space-y-3 text-sm font-semibold leading-7 text-[var(--bb-text-secondary,#374151)] [&_.bible-highlight]:font-black"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Bible API text is escaped by enrichBibleVerses before known highlight spans are inserted.
              dangerouslySetInnerHTML={{ __html: scriptureHtml }}
            />
          ) : (
            <p className="py-6 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
              {error || "Could not load this verse right now."}
            </p>
          )}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--bb-button,#2f7fe8)] px-7 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
          >
            Back to Notes
          </button>
          <a
            href={`/Bible/${encodeURIComponent(selectedScripture.book.toLowerCase())}/${selectedScripture.chapter}`}
            className="rounded-full border border-[var(--bb-card-border,#e5e7eb)] bg-white px-7 py-3 text-sm font-black text-[var(--bb-text-primary,#111827)] shadow-sm transition hover:bg-[var(--bb-surface-soft,#f6f8fb)]"
          >
            Read Chapter
          </a>
        </div>
      </div>
    </div>
  );
}

function DashboardInlineBibleReader({
  book,
  chapter,
  chapterLabel,
  onDone,
  onDatabaseTermClick,
  termTakeover,
  variant = "inline",
}: {
  book: string;
  chapter: number;
  chapterLabel: string;
  onDone: () => Promise<void>;
  onDatabaseTermClick: (event: MouseEvent<HTMLDivElement>) => void;
  termTakeover?: ReactNode;
  variant?: "inline" | "modal";
}) {
  const [verses, setVerses] = useState<BibleApiVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [markingDone, setMarkingDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const readerRootRef = useRef<HTMLDivElement | null>(null);
  const bookDisplay = normalizeBibleBookDisplay(book);
  const isModal = variant === "modal";

  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `bb:dashboard-chapter-text:${bookDisplay}:${chapter}:kjv`;
        try {
          const cached = window.sessionStorage.getItem(cacheKey);
          if (cached) {
            const cachedVerses = JSON.parse(cached) as BibleApiVerse[];
            if (Array.isArray(cachedVerses) && cachedVerses.length > 0) {
              if (!cancelled) {
                setVerses(cachedVerses);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          // Session cache is just a smoothness helper.
        }

        const apiBook = normalizeBibleBookForApi(book);
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);
        const response = await fetch(`https://bible-api.com/${apiBook}+${chapter}?translation=kjv`, {
          signal: controller.signal,
        });
        window.clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Could not load ${chapterLabel}.`);
        }

        const data = (await response.json()) as BibleApiResponse;
        const nextVerses = Array.isArray(data.verses)
          ? data.verses.map((verse) => ({ verse: verse.verse, text: verse.text || "" })).filter((verse) => verse.text.trim())
          : [];
        if (nextVerses.length === 0) {
          throw new Error(`No text found for ${chapterLabel}.`);
        }

        if (!cancelled) {
          setVerses(nextVerses);
          try {
            window.sessionStorage.setItem(cacheKey, JSON.stringify(nextVerses));
          } catch {
            // Ignore cache quota/storage restrictions.
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setVerses([]);
          setError(loadError instanceof Error && loadError.name === "AbortError" ? "The chapter took too long to load." : "Could not load this chapter text.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadChapter();

    return () => {
      cancelled = true;
    };
  }, [book, bookDisplay, chapter, chapterLabel]);

  async function handleDone() {
    setMarkingDone(true);
    try {
      await onDone();
    } finally {
      setMarkingDone(false);
    }
  }

  return (
    <div
      ref={readerRootRef}
      className={`dashboard-inline-bible-reader dashboard-task-card-extension relative rounded-[24px] border shadow-sm ${isModal ? "flex h-full min-h-0 flex-col px-4 pb-5 pt-4" : "mt-2 px-3 pb-4 pt-3"}`}
      style={{
        backgroundColor: "var(--bb-reader-bg, #f8fbff)",
        borderColor: "var(--bb-reader-border, #bfdbfe)",
        color: "var(--bb-reader-text, #102a43)",
      }}
    >
      <style>{`
        .dashboard-inline-bible-reader .bible-highlight {
          color: var(--bb-reader-text, #102a43) !important;
          text-decoration-color: color-mix(in srgb, var(--bb-reader-text, #102a43) 48%, transparent) !important;
        }
        .dashboard-inline-bible-reader .bible-highlight:hover {
          color: var(--bb-accent, #2f7fe8) !important;
          text-decoration-color: color-mix(in srgb, var(--bb-reader-text, #102a43) 72%, transparent) !important;
        }
      `}</style>
      {termTakeover ? (
        termTakeover
      ) : loading ? (
        <p className="py-8 text-sm font-semibold" style={{ color: "var(--bb-reader-secondary, #334e68)" }}>Loading {chapterLabel}...</p>
      ) : error ? (
        <p className="py-8 text-sm font-bold text-red-600">{error}</p>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">Read The Chapter</p>
            <h3 className="mt-1 text-xl font-black leading-tight text-[var(--bb-reader-text,#102a43)]">{bookDisplay} {chapter}</h3>
          </div>
          <div className={`min-h-0 space-y-3 pr-1 ${isModal ? "flex-1 overflow-y-auto overscroll-contain" : ""}`} onClick={onDatabaseTermClick}>
            {verses.map((verse) => (
              <p
                key={verse.verse}
                className="rounded-lg px-1 py-0.5 text-base font-semibold leading-8"
                style={{
                  color: "var(--bb-reader-text, #102a43)",
                }}
              >
                <span
                  className="mr-2 inline-flex h-6 min-w-6 translate-y-[-1px] items-center justify-center rounded-full border px-1.5 align-middle text-xs font-black leading-none text-[var(--bb-accent)] transition hover:border-[var(--bb-accent)] hover:bg-[var(--bb-accent-soft)]"
                  style={{
                    backgroundColor: "var(--bb-reader-surface, #ffffff)",
                    borderColor: "var(--bb-reader-border, #bfdbfe)",
                    color: "var(--bb-accent, #2f7fe8)",
                  }}
                >
                  {verse.verse}
                </span>
                <span
                  className="inline [&_p]:inline"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Bible text is escaped before known database term spans are inserted.
                  dangerouslySetInnerHTML={{ __html: enrichPlainText(verse.text) }}
                />
              </p>
            ))}
          </div>
        </>
      )}

      {!loading && !error && !termTakeover ? (
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
  const [notesSelectedTerm, setNotesSelectedTerm] = useState<BibleDatabaseTerm | null>(null);
  const [notesTermBurstKey, setNotesTermBurstKey] = useState(0);
  const [notesTermNotes, setNotesTermNotes] = useState<string | null>(null);
  const [notesTermNotesError, setNotesTermNotesError] = useState<string | null>(null);
  const [notesTermLoading, setNotesTermLoading] = useState(false);
  const notesTermTakeoverRef = useRef<HTMLDivElement | null>(null);
  const notesTermReturnScrollYRef = useRef<number | null>(null);
  const [notesSelectedScripture, setNotesSelectedScripture] = useState<NotesScriptureSelection | null>(null);
  const [notesScriptureHtml, setNotesScriptureHtml] = useState<string | null>(null);
  const [notesScriptureError, setNotesScriptureError] = useState<string | null>(null);
  const [notesScriptureLoading, setNotesScriptureLoading] = useState(false);
  const notesScriptureTakeoverRef = useRef<HTMLDivElement | null>(null);
  const notesScriptureReturnScrollYRef = useRef<number | null>(null);
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
    setNotesSelectedTerm(null);
    setNotesTermNotes(null);
    setNotesTermNotesError(null);
    setNotesSelectedScripture(null);
    setNotesScriptureHtml(null);
    setNotesScriptureError(null);
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
        const fallbackNotes = await getOfflineChapterNotes(task.book, task.chapter);

        if (fallbackNotes && !cancelled) {
          setNotesText(fallbackNotes);
          setNotesLoading(false);
        }

        const { data: cached, error } = await withNotesTimeout(
          fetchBibleChapterNotes(supabase, task.book, task.chapter),
          fallbackNotes ? 1600 : 6500,
        );

        if (error) throw error;

        if (!cancelled) {
          const nextNotes = cached?.notes_text || fallbackNotes || "No notes are available for this chapter yet.";
          setNotesText(nextNotes);
          if (cached?.notes_text) cacheChapterNotes(task.book, task.chapter, cached.notes_text);
        }
      } catch (error: any) {
        const fallbackNotes = await getOfflineChapterNotes(task.book, task.chapter);
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

  function centerNotesTermTakeover(behavior: ScrollBehavior = "smooth") {
    const node = notesTermTakeoverRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centeredOffset = Math.max(12, (viewportHeight - rect.height) / 2);
    const nextTop = Math.max(0, window.scrollY + rect.top - centeredOffset);
    window.scrollTo({ top: nextTop, behavior });
  }

  function handleNotesDatabaseTermClick(event: MouseEvent<HTMLDivElement>) {
    const highlightElement = (event.target as HTMLElement).closest(".bible-highlight") as HTMLElement | null;
    if (!highlightElement) return;

    event.preventDefault();
    event.stopPropagation();

    const type = highlightElement.dataset.type as "people" | "places" | "keywords" | undefined;
    const term = highlightElement.dataset.term;
    if (!type || !term) return;

    notesTermReturnScrollYRef.current = window.scrollY;
    setNotesTermBurstKey((current) => current + 1);
    setNotesSelectedTerm({ type, name: resolveBibleReference(type, term) });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadNotesTermNotes() {
      if (!notesSelectedTerm) return;
      setNotesTermLoading(true);
      setNotesTermNotes(null);
      setNotesTermNotesError(null);

      try {
        const notes =
          notesSelectedTerm.type === "people"
            ? await getPersonPopupNotes(notesSelectedTerm.name)
            : notesSelectedTerm.type === "places"
              ? await getPlacePopupNotes(notesSelectedTerm.name)
              : await getKeywordPopupNotes(notesSelectedTerm.name);

        if (!cancelled) setNotesTermNotes(notes);
      } catch {
        if (!cancelled) setNotesTermNotesError("Could not load this word yet.");
      } finally {
        if (!cancelled) setNotesTermLoading(false);
      }
    }

    void loadNotesTermNotes();

    return () => {
      cancelled = true;
    };
  }, [notesSelectedTerm]);

  useEffect(() => {
    if (!notesSelectedTerm) return;
    let settleTimeout: number | null = null;
    const frame = window.requestAnimationFrame(() => {
      centerNotesTermTakeover("smooth");
      settleTimeout = window.setTimeout(() => centerNotesTermTakeover("smooth"), 120);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (settleTimeout !== null) window.clearTimeout(settleTimeout);
    };
  }, [notesSelectedTerm, notesTermLoading, notesTermNotes]);

  function closeNotesTermTakeover() {
    setNotesSelectedTerm(null);
    setNotesTermNotes(null);
    setNotesTermNotesError(null);
    const returnScrollY = notesTermReturnScrollYRef.current;
    if (typeof returnScrollY === "number") {
      window.requestAnimationFrame(() => window.scrollTo({ top: returnScrollY, behavior: "auto" }));
    }
  }

  function centerNotesScriptureTakeover(behavior: ScrollBehavior = "smooth") {
    const node = notesScriptureTakeoverRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const centeredOffset = Math.max(12, (viewportHeight - rect.height) / 2);
    const nextTop = Math.max(0, window.scrollY + rect.top - centeredOffset);
    window.scrollTo({ top: nextTop, behavior });
  }

  function handleNotesScriptureReferenceClick(event: MouseEvent<HTMLDivElement>) {
    const scriptureButton = (event.target as HTMLElement).closest(".scripture-ref-link") as HTMLElement | null;
    if (!scriptureButton) return;

    event.preventDefault();
    event.stopPropagation();

    const reference = scriptureButton.dataset.scriptureRef;
    if (!reference) return;

    const parsed = parseInlineBibleReference(reference);
    if (!parsed) return;

    notesScriptureReturnScrollYRef.current = window.scrollY;
    setNotesSelectedTerm(null);
    setNotesSelectedScripture(parsed);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadNotesScripture() {
      if (!notesSelectedScripture) {
        setNotesScriptureHtml(null);
        setNotesScriptureError(null);
        return;
      }

      setNotesScriptureLoading(true);
      setNotesScriptureHtml(null);
      setNotesScriptureError(null);

      try {
        const normalizedRef = notesSelectedScripture.apiReference.replace(/\s+/g, "+");
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 10000);
        const response = await fetch(`https://bible-api.com/${normalizedRef}?translation=kjv`, {
          signal: controller.signal,
        });
        window.clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Could not load this verse right now.");
        const payload = await response.json();
        const verses = Array.isArray(payload?.verses) ? payload.verses : [];
        const html = await enrichBibleVerses(verses);

        if (!cancelled) setNotesScriptureHtml(html);
      } catch (error) {
        if (!cancelled) {
          setNotesScriptureError(error instanceof Error && error.name === "AbortError" ? "The verse took too long to load." : "Could not load this verse right now.");
        }
      } finally {
        if (!cancelled) setNotesScriptureLoading(false);
      }
    }

    void loadNotesScripture();

    return () => {
      cancelled = true;
    };
  }, [notesSelectedScripture]);

  useEffect(() => {
    if (!notesSelectedScripture) return;
    let settleTimeout: number | null = null;
    const frame = window.requestAnimationFrame(() => {
      centerNotesScriptureTakeover("smooth");
      settleTimeout = window.setTimeout(() => centerNotesScriptureTakeover("smooth"), 120);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (settleTimeout !== null) window.clearTimeout(settleTimeout);
    };
  }, [notesSelectedScripture, notesScriptureLoading, notesScriptureHtml]);

  function closeNotesScriptureTakeover() {
    setNotesSelectedScripture(null);
    setNotesScriptureHtml(null);
    setNotesScriptureError(null);
    const returnScrollY = notesScriptureReturnScrollYRef.current;
    if (typeof returnScrollY === "number") {
      window.requestAnimationFrame(() => window.scrollTo({ top: returnScrollY, behavior: "auto" }));
    }
  }

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
      if (!error) triggerPoints(TASK_XP.notes);
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
    closeAndRefresh(true);
    void handleReadingMarkedComplete().catch((error) => {
      console.warn("[DASHBOARD_TASK] Reading completion sync failed:", error);
    });
  }

  async function closeNotesAndRefresh() {
    closeAndRefresh(true);
    void markNotesComplete().catch((error) => {
      console.warn("[DASHBOARD_TASK] Notes completion sync failed:", error);
    });
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
      if (!error) triggerPoints(TASK_XP.intro);
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

    if (!error) triggerPoints(TASK_XP.reflection);
  }

  async function closeIntroAndRefresh() {
    closeAndRefresh(true);
    void handleDevotionalIntroComplete().catch((error) => {
      console.warn("[DASHBOARD_TASK] Intro completion sync failed:", error);
    });
  }

  if (!task) return null;

  const isInline = variant === "inline";
  const inlineFrame = (children: ReactNode, className = "") => (
    <div className={`dashboard-task-card-extension mt-3 overflow-hidden border-t border-[var(--bb-card-border)] pt-3 ${className}`}>
      {children}
    </div>
  );
  const databaseTermTakeover = notesSelectedTerm ? (
    <DatabaseTermTakeover
      selectedTerm={notesSelectedTerm}
      termBurstKey={notesTermBurstKey}
      loadingTermNotes={notesTermLoading}
      termNotes={notesTermNotes}
      termNotesError={notesTermNotesError}
      onClose={closeNotesTermTakeover}
      takeoverRef={notesTermTakeoverRef}
    />
  ) : null;

  if (task.kind === "reading" && task.book && task.chapter) {
    const chapterLabel = task.chapterLabel || `${task.book} ${task.chapter}`;

    if (isInline) {
      return (
        <DashboardInlineBibleReader
          book={task.book}
          chapter={task.chapter}
          chapterLabel={chapterLabel}
          onDone={closeReadingAndRefresh}
          onDatabaseTermClick={handleNotesDatabaseTermClick}
          termTakeover={databaseTermTakeover}
        />
      );
    }

    return (
      <ModalShell isOpen={true} onClose={() => void closeReadingAndRefresh()} backdropColor="bg-black/65" closeOnBackdrop={false}>
        <div className="relative mx-2 flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[26px] border border-[var(--bb-card-border,#d7e4f7)] bg-[var(--bb-card,#ffffff)] p-3 shadow-2xl sm:mx-4">
          <button
            type="button"
            onClick={() => void closeReadingAndRefresh()}
            className="absolute right-5 top-5 z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)]/95 text-2xl font-light leading-none text-[var(--bb-text-primary,#111827)] shadow-lg backdrop-blur transition hover:brightness-95"
            aria-label="Close Bible reader"
          >
            x
          </button>
          <DashboardInlineBibleReader
            book={task.book}
            chapter={task.chapter}
            chapterLabel={chapterLabel}
            onDone={closeReadingAndRefresh}
            onDatabaseTermClick={handleNotesDatabaseTermClick}
            termTakeover={databaseTermTakeover}
            variant="modal"
          />
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
              <div className="hidden">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4f8fb7]">Task 6</p>
                  <h2 className="text-lg font-bold text-gray-900">Answer The Reflection Question</h2>
                  <p className="mt-1 text-sm text-gray-600">{chapterLabel}</p>
                </div>
                <button type="button" onClick={closeOnly} className="text-3xl font-light leading-none text-gray-700 transition hover:text-gray-950" aria-label="Close reflection">
                  Ã—
                </button>
              </div>
              <div className="px-1 py-3">
                <p className="mb-5 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
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
              <BrowserTtsButton text={devotionalDay.devotional_text} label="Listen to intro" />
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
              <BrowserTtsButton text={devotionalDay.devotional_text} label="Listen to intro" />
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
            {notesSelectedTerm ? (
              <DatabaseTermTakeover
                selectedTerm={notesSelectedTerm}
                termBurstKey={notesTermBurstKey}
                loadingTermNotes={notesTermLoading}
                termNotes={notesTermNotes}
                termNotesError={notesTermNotesError}
                onClose={closeNotesTermTakeover}
                takeoverRef={notesTermTakeoverRef}
              />
            ) : notesSelectedScripture ? (
              <ScriptureReferenceTakeover
                selectedScripture={notesSelectedScripture}
                loading={notesScriptureLoading}
                scriptureHtml={notesScriptureHtml}
                error={notesScriptureError}
                onClose={closeNotesScriptureTakeover}
                takeoverRef={notesScriptureTakeoverRef}
              />
            ) : notesLoading ? (
              <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p>
            ) : notesError ? (
              <p className="py-10 text-center text-sm text-red-500">{notesError}</p>
            ) : (
              <div className="max-w-none text-gray-800">
                <BrowserTtsButton text={notesText} label="Listen to chapter notes" />
                <ChapterNotesMarkdown onDatabaseTermClick={handleNotesDatabaseTermClick} onScriptureReferenceClick={handleNotesScriptureReferenceClick}>{notesText}</ChapterNotesMarkdown>
              </div>
            )}
          </div>
          {!notesSelectedTerm && !notesSelectedScripture && !notesLoading && !notesError ? (
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
            {notesSelectedTerm ? (
              <DatabaseTermTakeover
                selectedTerm={notesSelectedTerm}
                termBurstKey={notesTermBurstKey}
                loadingTermNotes={notesTermLoading}
                termNotes={notesTermNotes}
                termNotesError={notesTermNotesError}
                onClose={closeNotesTermTakeover}
                takeoverRef={notesTermTakeoverRef}
              />
            ) : notesSelectedScripture ? (
              <ScriptureReferenceTakeover
                selectedScripture={notesSelectedScripture}
                loading={notesScriptureLoading}
                scriptureHtml={notesScriptureHtml}
                error={notesScriptureError}
                onClose={closeNotesScriptureTakeover}
                takeoverRef={notesScriptureTakeoverRef}
              />
            ) : notesLoading ? (
              <p className="py-10 text-center text-sm text-gray-500">Loading notes...</p>
            ) : notesError ? (
              <p className="py-10 text-center text-sm text-red-500">{notesError}</p>
            ) : (
              <div className="max-w-none text-gray-800">
                <BrowserTtsButton text={notesText} label="Listen to chapter notes" />
                <ChapterNotesMarkdown onDatabaseTermClick={handleNotesDatabaseTermClick} onScriptureReferenceClick={handleNotesScriptureReferenceClick}>{notesText}</ChapterNotesMarkdown>
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
