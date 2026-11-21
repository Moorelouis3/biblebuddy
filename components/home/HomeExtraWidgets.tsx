"use client";

/**
 * The widgets that are new with the customizable Home (lib/homeWidgets.ts).
 * The dashboard's own sections stay where they always were (HomeScreen); these
 * are the extra ones a reader can add from the gallery.
 *
 * Every one reads data and links the app already has - nothing here keeps a
 * second copy of anything:
 * - Study Guide: lib/libraryCatalog (the published catalogue and the reader's
 *   progress), opened the way the Library's Continue Studying opens a study.
 * - Ask Lil Louis: the real chat at /chat, the question handed over through
 *   lib/louisHandoff.ts.
 * - Continue Reading: completed_chapters, the reader at /bible/<book>/<n>.
 * - Bible in One Year: the plan day HomeScreen already loads, its audio route.
 * - Study Notes: the notes table and /notes. Saved Verses: user_bookmarks.
 * - Group Study Countdown: lib/communityEvents, the study's own sign-up page.
 * - Buddies, Messages, Prayer Requests: buddies and buddy_requests, the unread-count API
 *   and feed_posts, each opening the screen that already does the job.
 *
 * All colours come from the theme tokens, so a Bible Cover dresses them like
 * every other card.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  availability,
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";
import { communityEventStartsAt, getUpcomingCommunityEvent, upcomingEventHref } from "../../lib/communityEvents";
import { leaveQuestionForLouis } from "../../lib/louisHandoff";
import { BIBLE_BOOKS, getBookTotalChapters } from "../../lib/bibleBookChapters";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../../lib/bibleInOneYearPlan";
import { getBibleYearAudioApiSrc } from "../../lib/bibleYearAudio";
import { BIBLE_YEAR_PLAN_HREF } from "../../lib/bibleYearProgress";
import { fetchVotdEntriesByIds, type VerseOfTheDayEntry } from "../../lib/verseOfTheDayContent";
import type { WidgetSize } from "../../lib/homeWidgets";

/* ---------- shared pieces ---------- */

export function WidgetCard({ children, className = "", size }: { children: ReactNode; className?: string; size: WidgetSize }) {
  return (
    <div
      className={`bb-hw h-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-sm ${
        size === "s" ? "p-2.5" : "p-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Title({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
      <span aria-hidden>{icon}</span>
      {children}
    </p>
  );
}

const BUTTON =
  "inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[var(--bb-button,#111827)] px-4 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-110";

function Calm({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">{children}</p>;
}

/* ---------- study catalogue, shared by every study widget and the gallery ---------- */

type StudyShelf = { studies: LibraryStudy[]; progress: Record<string, StudyProgress> };
let shelfCache: { userId: string | null; at: number; promise: Promise<StudyShelf> } | null = null;

/** One read of the catalogue and progress for all study widgets on the page. */
export function loadStudyShelf(userId: string | null): Promise<StudyShelf> {
  if (shelfCache && shelfCache.userId === userId && Date.now() - shelfCache.at < 60_000) return shelfCache.promise;
  const promise = (async () => {
    const [studies, progress] = await Promise.all([
      fetchLibraryStudies(),
      userId ? fetchProgressByStudy(userId) : Promise.resolve({} as Record<string, StudyProgress>),
    ]);
    return { studies, progress };
  })();
  shelfCache = { userId, at: Date.now(), promise };
  promise.catch(() => {
    shelfCache = null;
  });
  return promise;
}

/** A guide's own page: the day list (as Continue Studying in the Library), or its sign-up before it opens. */
export function studyHref(studyId: string, started: boolean) {
  const signUp = upcomingEventHref(studyId);
  if (signUp) return signUp;
  return started ? `/devotionals/${studyId}` : `/plan?view=bible_studies&study=${encodeURIComponent(studyId)}`;
}

/* ---------- Study Guide (one per guide) ---------- */

export function StudyGuideWidget({ studyId, userId, size }: { studyId: string; userId: string | null; size: WidgetSize }) {
  const [shelf, setShelf] = useState<StudyShelf | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadStudyShelf(userId)
      .then((value) => !cancelled && setShelf(value))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const study = shelf?.studies.find((s) => s.id === studyId) ?? null;
  if (!shelf) {
    return (
      <WidgetCard size={size}>
        {failed ? <Calm>Couldn&apos;t load this study.</Calm> : <div className="h-24 animate-pulse rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]" />}
      </WidgetCard>
    );
  }
  if (!study) {
    return (
      <WidgetCard size={size}>
        <Title icon="📚">Study Guide</Title>
        <Calm>This study is no longer in the Library.</Calm>
      </WidgetCard>
    );
  }

  const p = withTotals(shelf.progress[study.id], study.total_days);
  const started = p.completedDays > 0;
  const { comingSoon, label } = availability(study, started);
  const href = studyHref(study.id, started);
  const action = p.isComplete ? "Read Again" : started ? `Continue Day ${p.nextDay}` : comingSoon ? "Sign Up" : "Start Study";

  if (size === "s") {
    return (
      <Link href={href} className="bb-hw flex h-full flex-col rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-sm">
        {study.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={study.cover_image} alt={study.title} className={`aspect-[2/3] w-full rounded-lg object-cover ${comingSoon ? "grayscale" : ""}`} />
        ) : null}
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
          <span className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]" style={{ width: `${p.percent}%` }} />
        </span>
        <span className="mt-1 block truncate text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
          {started ? (p.isComplete ? "Completed" : `Day ${p.nextDay}`) : comingSoon ? "Soon" : "Start"}
        </span>
      </Link>
    );
  }

  return (
    <WidgetCard size={size}>
      <div className="flex gap-3">
        {study.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={study.cover_image} alt="" className={`h-28 w-[75px] shrink-0 rounded-lg object-cover shadow ${comingSoon ? "grayscale" : ""}`} />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <Title icon="📚">Study Guide</Title>
          <p className="mt-1 line-clamp-2 text-base font-black leading-tight text-[var(--bb-text-primary,#111827)]">{study.title}</p>
          <p className="mt-0.5 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
            {comingSoon && label ? label : started ? `Day ${Math.min(p.nextDay, study.total_days)} of ${study.total_days} · ${p.percent}%` : `${study.total_days} days`}
          </p>
          {started ? (
            <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
              <span className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]" style={{ width: `${p.percent}%` }} />
            </span>
          ) : null}
          <Link href={href} className={`${BUTTON} mt-auto self-start`} style={{ marginTop: 10 }}>
            {action} →
          </Link>
        </div>
      </div>
    </WidgetCard>
  );
}

/* ---------- Ask Lil Louis ---------- */

export function AskLilLouisWidget({ size }: { size: WidgetSize }) {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  if (size === "s") {
    return (
      <Link href="/chat" className="bb-hw flex h-full flex-col items-center justify-center gap-1 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 text-center shadow-sm">
        <span className="text-2xl" aria-hidden>💬</span>
        <span className="text-[11px] font-black leading-tight text-[var(--bb-text-primary,#111827)]">Ask Lil Louis</span>
      </Link>
    );
  }

  const send = () => {
    const trimmed = question.trim();
    if (trimmed) leaveQuestionForLouis(trimmed);
    router.push("/chat");
  };

  return (
    <WidgetCard size={size}>
      <Title icon="💬">Ask Lil Louis</Title>
      <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">Ask anything about the Bible.</p>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Why did God test Abraham?"
          aria-label="Your question for Lil Louis"
          maxLength={2000}
          className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-3 text-sm font-semibold text-[var(--bb-text-primary,#111827)] outline-none placeholder:text-[var(--bb-text-muted,#9ca3af)] focus:border-[var(--bb-accent,#2f7fe8)]"
        />
        <button type="submit" className={BUTTON} aria-label="Ask Lil Louis">
          Ask
        </button>
      </form>
    </WidgetCard>
  );
}

/* ---------- Continue Reading ---------- */

function readerHref(book: string, chapter: number) {
  return `/bible/${encodeURIComponent(book.toLowerCase())}/${chapter}`;
}

function nextChapter(book: string, chapter: number): { book: string; chapter: number } {
  const total = getBookTotalChapters(book);
  if (total && chapter < total) return { book, chapter: chapter + 1 };
  const index = BIBLE_BOOKS.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  const following = index >= 0 ? BIBLE_BOOKS[index + 1] : undefined;
  return following ? { book: following, chapter: 1 } : { book, chapter };
}

function titleCase(book: string) {
  const known = BIBLE_BOOKS.find((b) => b.toLowerCase() === book.toLowerCase());
  return known ?? book.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ContinueReadingWidget({ userId, size }: { userId: string | null; size: WidgetSize }) {
  const [last, setLast] = useState<{ book: string; chapter: number } | null | undefined>(undefined);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void supabase
      .from("completed_chapters")
      .select("book, chapter")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setLast(error ? null : data ? { book: String(data.book), chapter: Number(data.chapter) } : null);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const next = last ? nextChapter(titleCase(last.book), last.chapter) : { book: "Genesis", chapter: 1 };
  const href = readerHref(next.book, next.chapter);
  const lastLine = last ? `Last read ${titleCase(last.book)} ${last.chapter}` : "Start at the beginning";

  if (size === "s") {
    return (
      <Link href={href} className="bb-hw flex h-full flex-col justify-center rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2.5 shadow-sm">
        <span className="text-xl" aria-hidden>🔖</span>
        <span className="mt-1 text-[11px] font-black leading-tight text-[var(--bb-text-primary,#111827)]">
          {next.book} {next.chapter}
        </span>
      </Link>
    );
  }
  return (
    <WidgetCard size={size}>
      <Title icon="🔖">Continue Reading</Title>
      <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">
        {next.book} {next.chapter}
      </p>
      <p className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{last === undefined ? " " : lastLine}</p>
      <Link href={href} className={`${BUTTON} mt-3`}>
        Open the Bible →
      </Link>
    </WidgetCard>
  );
}

/* ---------- Bible in One Year ---------- */

export function BibleInOneYearWidget({
  planDay,
  completedDays,
  planFinished,
  size,
}: {
  planDay: number | null;
  completedDays: number;
  planFinished: boolean;
  size: WidgetSize;
}) {
  const day = planDay ?? 1;
  const entry = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => d.dayNumber === day) ?? null;
  const percent = Math.round((completedDays / 365) * 100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => audioRef.current?.pause(), []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getBibleYearAudioApiSrc(day));
      audioRef.current.addEventListener("ended", () => setPlaying(false));
      audioRef.current.addEventListener("pause", () => setPlaying(false));
      audioRef.current.addEventListener("play", () => setPlaying(true));
    }
    if (audioRef.current.paused) void audioRef.current.play().catch(() => setPlaying(false));
    else audioRef.current.pause();
  };

  return (
    <WidgetCard size={size}>
      <Title icon="📅">Bible in One Year</Title>
      <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">
        {planFinished ? "Plan complete" : `Day ${day} of 365`}
      </p>
      {entry && !planFinished ? (
        <p className="text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
          {entry.title} · {entry.reference}
        </p>
      ) : null}
      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
        <span className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]" style={{ width: `${percent}%` }} />
      </span>
      {size === "l" && entry?.summary ? (
        <p className="mt-2 line-clamp-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">{entry.summary}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={BIBLE_YEAR_PLAN_HREF} className={BUTTON}>
          {planFinished ? "View plan" : completedDays === 0 ? `Start Day ${day}` : `Continue Day ${day}`} →
        </Link>
        {!planFinished ? (
          <button
            type="button"
            onClick={toggleAudio}
            className="inline-flex min-h-[40px] items-center rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 text-sm font-black text-[var(--bb-text-primary,#111827)]"
            aria-pressed={playing}
          >
            {playing ? "⏸ Pause" : "▶ Listen"}
          </button>
        ) : null}
      </div>
    </WidgetCard>
  );
}

/* ---------- Study Notes ---------- */

type NoteRow = { id: string; book: string | null; chapter: number | null; passage: string | null; write: string | null; created_at: string };

function plain(text: string | null | undefined) {
  return (text || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

export function StudyNotesWidget({ userId, size }: { userId: string | null; size: WidgetSize }) {
  const [note, setNote] = useState<NoteRow | null | undefined>(undefined);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void supabase
      .from("notes")
      .select("id, book, chapter, passage, write, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => !cancelled && setNote(error ? null : ((data as NoteRow | null) ?? null)));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const preview = note ? plain(note.write) || plain(note.passage) : "";
  return (
    <WidgetCard size={size}>
      <Title icon="📝">Study Notes</Title>
      {note === undefined ? (
        <div className="mt-2 h-10 animate-pulse rounded-lg bg-[var(--bb-surface-soft,#eef2f7)]" />
      ) : note ? (
        <>
          <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#111827)]">
            {note.book ? `${note.book} ${note.chapter ?? ""}`.trim() : "Your latest note"}
          </p>
          {preview ? <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">{preview}</p> : null}
        </>
      ) : (
        <Calm>No notes yet. Write down what you are learning.</Calm>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href="/notes" className={BUTTON}>
          {note ? "Open notes" : "Start a note"} →
        </Link>
      </div>
    </WidgetCard>
  );
}

/* ---------- Saved Verses ---------- */

export function SavedVersesWidget({ userId, size }: { userId: string | null; size: WidgetSize }) {
  const [verse, setVerse] = useState<VerseOfTheDayEntry | null | undefined>(undefined);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from("user_bookmarks")
        .select("content_id")
        .eq("user_id", userId)
        .eq("content_type", "daily_verse")
        .order("created_at", { ascending: false })
        .limit(1);
      if (cancelled) return;
      const id = !error && data?.[0]?.content_id;
      if (!id) {
        setVerse(null);
        return;
      }
      const entries = await fetchVotdEntriesByIds([id as string]).catch(() => []);
      if (!cancelled) setVerse(entries[0] ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <WidgetCard size={size}>
      <Title icon="🔖">Saved Verses</Title>
      {verse === undefined ? (
        <div className="mt-2 h-12 animate-pulse rounded-lg bg-[var(--bb-surface-soft,#eef2f7)]" />
      ) : verse ? (
        <>
          <p className="mt-1.5 line-clamp-3 font-serif text-[15px] leading-snug text-[var(--bb-text-primary,#111827)]">
            “{verse.verse_text}”
          </p>
          <p className="mt-1 text-xs font-black text-[var(--bb-text-muted,#6b7280)]">{verse.reference}</p>
        </>
      ) : (
        <Calm>Save a Verse of the Day with its bookmark and it appears here.</Calm>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {verse ? (
          <Link href={readerHref(verse.book, verse.chapter)} className={BUTTON}>
            Open in the Bible →
          </Link>
        ) : null}
        <Link
          href="/bookmarks"
          className="inline-flex min-h-[40px] items-center rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 text-sm font-black text-[var(--bb-text-primary,#111827)]"
        >
          All saved
        </Link>
      </div>
    </WidgetCard>
  );
}

/* ---------- Group Study Countdown ---------- */

export function GroupCountdownWidget({ size }: { size: WidgetSize }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const event = getUpcomingCommunityEvent(new Date(now));
  if (!event) {
    return (
      <WidgetCard size={size}>
        <Title icon="⏳">Group Study Countdown</Title>
        <Calm>No group study is scheduled yet. The next one shows up here.</Calm>
      </WidgetCard>
    );
  }
  const ms = Math.max(0, Date.parse(communityEventStartsAt(event)) - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return (
    <WidgetCard size={size}>
      <Title icon="⏳">Next Group Study</Title>
      <p className="mt-1 line-clamp-2 text-base font-black text-[var(--bb-text-primary,#111827)]">{event.title}</p>
      <p className="text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
        Starts in {days} day{days === 1 ? "" : "s"}, {hours} hour{hours === 1 ? "" : "s"}
      </p>
      <Link href={`/events/${event.slug}?join=1&src=home_widget`} className={`${BUTTON} mt-3`}>
        Sign up →
      </Link>
    </WidgetCard>
  );
}

/* ---------- Buddies ---------- */

export function BuddiesWidget({ userId, size }: { userId: string | null; size: WidgetSize }) {
  const [counts, setCounts] = useState<{ buddies: number; pending: number } | null>(null);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      const [accepted, pending] = await Promise.all([
        // Buddies are rows in buddies (either side), as the feed reads them.
        supabase
          .from("buddies")
          .select("user_id_1", { count: "exact", head: true })
          .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`),
        supabase
          .from("buddy_requests")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending")
          .eq("receiver_id", userId),
      ]);
      if (!cancelled) setCounts({ buddies: accepted.count ?? 0, pending: pending.count ?? 0 });
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <WidgetCard size={size}>
      <Title icon="🤝">Buddies</Title>
      {counts ? (
        <>
          <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">
            {counts.buddies} {counts.buddies === 1 ? "buddy" : "buddies"}
          </p>
          <p className="text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            {counts.pending ? `${counts.pending} buddy request${counts.pending === 1 ? "" : "s"} waiting` : "Study alongside friends."}
          </p>
        </>
      ) : (
        <div className="mt-2 h-10 animate-pulse rounded-lg bg-[var(--bb-surface-soft,#eef2f7)]" />
      )}
      <Link href="/bb-feed" className={`${BUTTON} mt-3`}>
        Open the feed →
      </Link>
    </WidgetCard>
  );
}

/* ---------- Messages ---------- */

export function MessagesWidget({ userId, size }: { userId: string | null; size: WidgetSize }) {
  const [unread, setUnread] = useState<number | null>(null);
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        // The same count the header badge reads.
        const res = await fetch(`${window.location.origin}/api/messages/unread-count`, { headers: { authorization: `Bearer ${token}` } });
        const json = res.ok ? await res.json() : null;
        if (!cancelled) setUnread(typeof json?.count === "number" ? json.count : 0);
      } catch {
        if (!cancelled) setUnread(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const line = unread === null ? " " : unread ? `${unread} unread` : "All caught up";
  if (size === "s") {
    return (
      <Link href="/messages" className="bb-hw relative flex h-full flex-col items-center justify-center gap-1 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 text-center shadow-sm">
        <span className="text-2xl" aria-hidden>✉️</span>
        <span className="text-[11px] font-black leading-tight text-[var(--bb-text-primary,#111827)]">{line}</span>
      </Link>
    );
  }
  return (
    <WidgetCard size={size}>
      <Title icon="✉️">Messages</Title>
      <p className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">{line}</p>
      <Link href="/messages" className={`${BUTTON} mt-3`}>
        Open messages →
      </Link>
    </WidgetCard>
  );
}

/* ---------- Prayer Requests ---------- */

export function PrayerRequestsWidget({ size }: { size: WidgetSize }) {
  const [post, setPost] = useState<{ content: string; created_at: string } | null | undefined>(undefined);
  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("feed_posts")
      .select("content, created_at")
      .eq("post_type", "prayer_request")
      .eq("visibility", "community")
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data, error }) => !cancelled && setPost(error ? null : ((data?.[0] as { content: string; created_at: string }) ?? null)));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <WidgetCard size={size}>
      <Title icon="🙏">Prayer Requests</Title>
      {post === undefined ? (
        <div className="mt-2 h-10 animate-pulse rounded-lg bg-[var(--bb-surface-soft,#eef2f7)]" />
      ) : post ? (
        <p className="mt-1.5 line-clamp-3 text-sm font-semibold text-[var(--bb-text-primary,#111827)]">{plain(post.content)}</p>
      ) : (
        <Calm>No prayer requests right now.</Calm>
      )}
      <Link href="/bb-feed" className={`${BUTTON} mt-3`}>
        Pray with the community →
      </Link>
    </WidgetCard>
  );
}
