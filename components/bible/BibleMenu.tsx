"use client";

/**
 * The Bible tab's menu: every book, with its own picture.
 *
 * Built from Louis's mock-up (2026-11-26: "make the bible menu better"), the
 * same day-and-a-bit after the Games menu got the same treatment, and in the
 * same look: a centred header with a gold badge, then dark glass rows. Each
 * row is a book's painted thumbnail, its name, and where the reader stands
 * in it. A finished book gets the gold edge.
 *
 * Five tabs: All Books, Old Testament, New Testament, My Progress (the three
 * numbers that used to sit in a pop-up, plus the books in progress and
 * finished) and Favorites (a star on each row, kept on the phone).
 *
 * Colours come from the selected Bible Cover (the --bb-* variables), like
 * components/games/GamesMenu.tsx, so the menu matches the cover instead of
 * one fixed brown.
 *
 * Progress is ONE read of completed_chapters. The page this replaces asked
 * once per book to tick the finished ones (66 requests) and twice more per
 * book when the stats pop-up opened.
 *
 * Pictures: public/bible-menu/<book>.webp, made by
 * scripts/make-bible-menu-thumbs.mjs from Louis's originals.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { getBookTotalChapters } from "@/lib/bibleBookChapters";
import { BIBLE_MENU_THUMBS } from "@/lib/bibleMenuThumbs.generated";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { supabase } from "@/lib/supabaseClient";
import { bookMatches, bookName } from "@/lib/i18n/bookNames";
import { useT } from "@/lib/i18n/useT";

const OLD_TESTAMENT = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
];
const NEW_TESTAMENT = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];
const BOOKS = [...OLD_TESTAMENT, ...NEW_TESTAMENT];
const TOTAL_CHAPTERS = 1189;

type Tab = "all" | "old" | "new" | "progress" | "favorites";
type Progress = { state: "loading" } | { state: "failed" } | { state: "ready"; done: Record<string, number> };

const GOLD = "var(--bb-accent,#e9b45a)";
const TEXT = "var(--bb-text-primary,#fbf3e4)";
const SOFT = "var(--bb-text-secondary,#e9dcc6)";
const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

const slug = (book: string) => book.toLowerCase().replace(/\s+/g, "-");
const thumbs = new Set<string>(BIBLE_MENU_THUMBS);
const favoritesKey = (userId: string) => `bb:bible-favorites:v1:${userId}`;

/**
 * Every chapter this reader has finished, counted per book, in one read.
 * Paged, because a reader near the end of the Bible has more rows than one
 * response will carry (1,000). Throws when a page fails: "you have read
 * nothing" is never the answer to a read that did not work.
 */
async function loadChapterCounts(userId: string): Promise<Record<string, number>> {
  const seen = new Set<string>();
  const PAGE = 1000;
  for (let from = 0; from < 5000; from += PAGE) {
    const { data, error } = await supabase
      .from("completed_chapters")
      .select("book, chapter")
      .eq("user_id", userId)
      .order("book", { ascending: true })
      .order("chapter", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    for (const row of data || []) seen.add(`${String(row.book || "").toLowerCase().trim()}|${Number(row.chapter)}`);
    if (!data || data.length < PAGE) break;
  }
  const done: Record<string, number> = {};
  for (const key of seen) {
    const book = key.slice(0, key.lastIndexOf("|"));
    done[book] = (done[book] || 0) + 1;
  }
  return done;
}

function Icon({ name, size = 18 }: { name: "book" | "scroll" | "cross" | "bars" | "star" | "search" | "chevron" | "check"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "book") return <svg {...common}><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.500V5C17 4.5 14 5 12 6.500z" /><path d="M12 6.500V19.5" /></svg>;
  if (name === "scroll") return <svg {...common}><path d="M7 4h11v13a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1h11v1" /><path d="M7 4a2 2 0 0 0-2 2v10" /><path d="M10 8h5M10 11.500h5" /></svg>;
  if (name === "cross") return <svg {...common} strokeWidth={2.4}><path d="M12 3v18M6.5 8.500h11" /></svg>;
  if (name === "bars") return <svg {...common} strokeWidth={2.6}><path d="M5 20v-6M12 20V9M19 20V4" /></svg>;
  if (name === "star") return <svg {...common}><path d="M12 3.500l2.6 5.4 5.9.800-4.300 4.1 1 5.900L12 16.900 6.800 19.700l1-5.900L3.5 9.700l5.900-.800z" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></svg>;
  if (name === "check") return <svg {...common} strokeWidth={3}><path d="M5 12.500l4.5 4.500L19 7.5" /></svg>;
  return <svg {...common} strokeWidth={2.4}><path d="M9 6l6 6-6 6" /></svg>;
}

function BookRow({
  book,
  done,
  known,
  favorite,
  onFavorite,
  onOpen,
}: {
  book: string;
  /** Chapters finished, or null while progress is unknown. */
  done: number | null;
  known: boolean;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  const t = useT();
  const shown = bookName(book, t.language);
  const total = getBookTotalChapters(book);
  const complete = done !== null && total > 0 && done >= total;
  const started = done !== null && done > 0 && !complete;
  const key = slug(book);

  return (
    <div
      className="bbm-row group relative flex items-center rounded-2xl transition hover:-translate-y-0.5"
      style={{
        background: complete
          ? `linear-gradient(180deg, ${mix(GOLD, 20)}, transparent), var(--bb-card,rgba(34,22,14,.86))`
          : "var(--bb-card,rgba(28,20,16,.72))",
        boxShadow: complete
          ? `inset 0 0 0 1.500px ${GOLD}, 0 0 20px ${mix(GOLD, 24)}, 0 8px 20px rgba(0,0,0,.3)`
          : `inset 0 0 0 1px ${mix(GOLD, 28)}, 0 6px 16px rgba(0,0,0,.26)`,
      }}
    >
      <Link
        href={`/reading/books/${encodeURIComponent(book.toLowerCase())}`}
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 p-2.5 pr-1 sm:gap-4 sm:p-3 sm:pr-1"
      >
        <span
          className="h-[58px] w-[84px] shrink-0 overflow-hidden rounded-xl sm:h-[68px] sm:w-[104px]"
          style={{ background: `linear-gradient(145deg, ${mix(GOLD, 45)}, ${mix(GOLD, 12)})`, boxShadow: "0 3px 10px rgba(0,0,0,.4)" }}
          aria-hidden="true"
        >
          {thumbs.has(key) ? (
            <img src={`/bible-menu/${key}.webp`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center" style={{ color: TEXT }}>
              <Icon name="book" size={26} />
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[17px] font-black leading-tight sm:text-[20px]" style={{ color: TEXT }}>
            {shown}
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold sm:text-[14px]" style={{ color: SOFT }}>
            {complete ? (
              <>
                <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full" style={{ background: "#2fa860", color: "#fff" }}>
                  <Icon name="check" size={11} />
                </span>
                {t("common.completed")}
              </>
            ) : started ? (
              <>
                <span className="h-[14px] w-[14px] shrink-0 rounded-full" style={{ background: `conic-gradient(${GOLD} ${Math.round(((done || 0) / total) * 360)}deg, ${mix(SOFT, 30)} 0deg)` }} />
                {t("bible.row.progress", { done: done || 0, total })}
              </>
            ) : known ? (
              <>
                <span className="h-[14px] w-[14px] shrink-0 rounded-full" style={{ boxShadow: `inset 0 0 0 1.500px ${mix(SOFT, 70)}` }} />
                {t("bible.row.notStarted")}
              </>
            ) : (
              <>{t.plural(total, "bible.row.chapters.one", "bible.row.chapters.other")}</>
            )}
          </span>
        </span>
      </Link>
      <button
        type="button"
        onClick={onFavorite}
        aria-pressed={favorite}
        aria-label={t(favorite ? "bible.favorite.remove" : "bible.favorite.add", { book: shown })}
        className="grid h-11 w-9 shrink-0 place-items-center"
        style={{ color: favorite ? GOLD : mix(SOFT, 55) }}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 3.500l2.6 5.4 5.9.800-4.300 4.1 1 5.900L12 16.900 6.800 19.700l1-5.900L3.5 9.700l5.900-.800z" />
        </svg>
      </button>
      <span className="pointer-events-none mr-2 hidden shrink-0 sm:block" style={{ color: TEXT }} aria-hidden="true">
        <Icon name="chevron" size={22} />
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-3 text-center" style={{ background: "var(--bb-card,rgba(28,20,16,.72))", boxShadow: `inset 0 0 0 1px ${mix(GOLD, 35)}` }}>
      <p className="text-[22px] font-black leading-tight sm:text-[28px]" style={{ color: TEXT }}>
        {value}
      </p>
      <p className="mt-0.5 text-[12px] font-bold sm:text-[13px]" style={{ color: SOFT }}>
        {label}
      </p>
    </div>
  );
}

export default function BibleMenu() {
  const t = useT();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("buddy");
  const [progress, setProgress] = useState<Progress>({ state: "loading" });
  const [reload, setReload] = useState(0);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [alphabetical, setAlphabetical] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (cancelled || !data.user) return;
      const meta = (data.user.user_metadata || {}) as Record<string, unknown>;
      const first = meta.firstName || meta.first_name || (data.user.email ? data.user.email.split("@")[0] : null) || "friend";
      setUserName(String(first));
      setUserId(data.user.id);
      try {
        const saved = JSON.parse(window.localStorage.getItem(favoritesKey(data.user.id)) || "[]");
        if (Array.isArray(saved)) setFavorites(saved.filter((book) => BOOKS.includes(book)));
      } catch {
        // Unreadable storage: no favorites yet, and the menu still works.
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username: userName,
      actionType: ACTION_TYPE.bible_reader_viewed,
      actionLabel: "The Bible",
      dedupeKey: "bible-reader-viewed",
    }).catch((error) => {
      console.error("[NAV] Failed to track Bible reader view:", error);
    });
  }, [userId, userName]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setProgress({ state: "loading" });
    loadChapterCounts(userId)
      .then((done) => {
        if (!cancelled) setProgress({ state: "ready", done });
      })
      .catch((error) => {
        // Every book still opens without this. The rows simply say how long
        // the book is instead of claiming it was never started.
        console.error("[BIBLE_MENU] Reading progress did not load:", error);
        if (!cancelled) setProgress({ state: "failed" });
      });
    return () => {
      cancelled = true;
    };
  }, [userId, reload]);

  const doneFor = (book: string): number | null => {
    if (progress.state !== "ready") return null;
    return Math.min(progress.done[book.toLowerCase()] || 0, getBookTotalChapters(book));
  };

  function toggleFavorite(book: string) {
    setFavorites((current) => {
      const next = current.includes(book) ? current.filter((item) => item !== book) : [...current, book];
      if (userId) {
        try {
          window.localStorage.setItem(favoritesKey(userId), JSON.stringify(next));
        } catch {
          // Full or blocked storage: the star still shows for this visit.
        }
      }
      return next;
    });
  }

  function opened(book: string) {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username: userName,
      actionType: ACTION_TYPE.bible_book_opened,
      actionLabel: book,
      dedupeKey: `bible-book-opened:${book.toLowerCase()}`,
    }).catch((error) => {
      console.error("[NAV] Failed to track Bible book click:", error);
    });
  }

  const totals = useMemo(() => {
    if (progress.state !== "ready") return null;
    let chapters = 0;
    let books = 0;
    for (const book of BOOKS) {
      const total = getBookTotalChapters(book);
      const done = Math.min(progress.done[book.toLowerCase()] || 0, total);
      chapters += done;
      if (total > 0 && done >= total) books += 1;
    }
    return { chapters, books, percent: Math.round((chapters / TOTAL_CHAPTERS) * 1000) / 10 };
  }, [progress]);

  const base =
    tab === "old" ? OLD_TESTAMENT
    : tab === "new" ? NEW_TESTAMENT
    : tab === "favorites" ? BOOKS.filter((book) => favorites.includes(book))
    : tab === "progress" ? BOOKS.filter((book) => (doneFor(book) || 0) > 0)
    : BOOKS;
  const needle = query.trim().toLowerCase();
  const filtered = needle ? base.filter((book) => bookMatches(book, needle)) : base;
  const shown = alphabetical ? [...filtered].sort((a, b) => bookName(a, t.language).localeCompare(bookName(b, t.language), t.locale, { numeric: true })) : filtered;

  const TABS: Array<{ key: Tab; label: string; icon: "book" | "scroll" | "cross" | "bars" | "star" }> = [
    { key: "all", label: t("bible.tab.all"), icon: "book" },
    { key: "old", label: t("bible.tab.old"), icon: "scroll" },
    { key: "new", label: t("bible.tab.new"), icon: "cross" },
    { key: "progress", label: t("bible.tab.progress"), icon: "bars" },
    { key: "favorites", label: t("bible.tab.favorites"), icon: "star" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-3 pb-28 pt-5 sm:px-4">
      <style>{`.bbm-tabs{scrollbar-width:none}.bbm-tabs::-webkit-scrollbar{display:none}.bbm-search::placeholder{color:${SOFT};opacity:.75}`}</style>

      <header className="flex flex-col items-center text-center">
        <span className="flex w-full items-center justify-center gap-4">
          <span className="h-px max-w-[220px] flex-1" style={{ background: `linear-gradient(90deg,transparent,${GOLD})` }} aria-hidden="true" />
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl"
            style={{ background: "var(--bb-card,#1c120a)", color: GOLD, boxShadow: `inset 0 0 0 2px ${GOLD}, 0 0 18px ${mix(GOLD, 35)}` }}
            aria-hidden="true"
          >
            <Icon name="book" size={30} />
          </span>
          <span className="h-px max-w-[220px] flex-1" style={{ background: `linear-gradient(90deg,${GOLD},transparent)` }} aria-hidden="true" />
        </span>
        <h1 className="mt-2 text-[40px] font-black leading-none sm:text-[52px]" style={{ color: TEXT, textShadow: `0 2px 18px ${mix(GOLD, 45)}, 0 2px 4px rgba(0,0,0,.5)` }}>
          {t("bible.title")}
        </h1>
        <p className="mt-2 text-[14px] font-semibold sm:text-[16px]" style={{ color: SOFT, textShadow: "0 1px 6px rgba(0,0,0,.6)" }}>
          {t("bible.subtitle")}
        </p>
      </header>

      <div className="bbm-tabs -mx-3 mt-4 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="tablist" aria-label={t("bible.tabs.label")}>
        {TABS.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.key)}
              className="flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-[14px] font-black transition sm:text-[15px]"
              style={
                active
                  ? { background: "var(--bb-button,#d99a3e)", color: "var(--bb-button-text,#2a1d05)", boxShadow: `0 0 14px ${mix(GOLD, 45)}, inset 0 1px 0 rgba(255,255,255,.45)` }
                  : { background: "var(--bb-card,rgba(28,20,16,.72))", color: TEXT, boxShadow: `inset 0 0 0 1px ${mix(GOLD, 30)}` }
              }
            >
              <span style={{ color: active ? "inherit" : GOLD }}>
                <Icon name={item.icon} size={17} />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <section
        className="mt-3 rounded-3xl p-3 sm:p-5"
        style={{ background: "var(--bb-surface-soft,rgba(20,13,9,.55))", boxShadow: `inset 0 0 0 1px ${mix(GOLD, 35)}, 0 14px 34px rgba(0,0,0,.35)` }}
      >
        {tab === "progress" ? (
          <div className="mb-3">
            {totals ? (
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <Stat label={t("bible.stat.books")} value={`${totals.books} / 66`} />
                <Stat label={t("bible.stat.chapters")} value={`${totals.chapters.toLocaleString(t.locale)} / ${TOTAL_CHAPTERS.toLocaleString(t.locale)}`} />
                <Stat label={t("bible.stat.percent")} value={`${totals.percent.toLocaleString(t.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`} />
              </div>
            ) : progress.state === "failed" ? (
              <div className="rounded-2xl p-4 text-center" style={{ background: "var(--bb-card,rgba(28,20,16,.72))", color: TEXT }}>
                <p className="text-[15px] font-bold">{t("bible.progress.failed")}</p>
                <button
                  type="button"
                  onClick={() => setReload((n) => n + 1)}
                  className="mt-3 rounded-xl px-5 py-2 text-[14px] font-black"
                  style={{ background: "var(--bb-button,#d99a3e)", color: "var(--bb-button-text,#2a1d05)" }}
                >
                  {t("common.tryAgain")}
                </button>
              </div>
            ) : (
              <p className="py-4 text-center text-[14px] font-bold" style={{ color: SOFT }}>
                {t("bible.progress.loading")}
              </p>
            )}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            className="flex min-w-0 flex-1 basis-full items-center gap-2.5 rounded-full px-4 py-2.5 sm:max-w-[420px] sm:basis-auto"
            style={{ background: "var(--bb-card,rgba(28,20,16,.72))", color: SOFT, boxShadow: `inset 0 0 0 1px ${mix(GOLD, 30)}` }}
          >
            <Icon name="search" size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("bible.search.placeholder")}
              aria-label={t("bible.search.label")}
              className="bbm-search ml-2 w-full min-w-0 bg-transparent text-[15px] font-semibold outline-none"
              style={{ color: TEXT }}
            />
          </label>
          <label className="ml-auto flex cursor-pointer items-center gap-2.5 text-[14px] font-bold" style={{ color: TEXT }}>
            <span className="mr-2">{t("bible.alphabetical")}</span>
            <input type="checkbox" checked={alphabetical} onChange={(event) => setAlphabetical(event.target.checked)} className="sr-only" />
            <span
              className="relative block h-[26px] w-[48px] rounded-full transition-colors"
              style={{ background: alphabetical ? "var(--bb-button,#d99a3e)" : mix(SOFT, 30) }}
              aria-hidden="true"
            >
              <span
                className="absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all"
                style={{ left: alphabetical ? 25 : 3, boxShadow: "0 1px 3px rgba(0,0,0,.4)" }}
              />
            </span>
          </label>
        </div>

        {shown.length ? (
          <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
            {shown.map((book) => (
              <BookRow
                key={book}
                book={book}
                done={doneFor(book)}
                known={progress.state === "ready"}
                favorite={favorites.includes(book)}
                onFavorite={() => toggleFavorite(book)}
                onOpen={() => opened(book)}
              />
            ))}
          </div>
        ) : (
          <p className="px-3 py-10 text-center text-[15px] font-bold" style={{ color: SOFT }}>
            {needle
              ? t("bible.empty.search", { query: query.trim() })
              : tab === "favorites"
                ? t("bible.empty.favorites")
                : tab === "progress"
                  ? progress.state === "ready"
                    ? t("bible.empty.progress")
                    : ""
                  : ""}
          </p>
        )}
      </section>
    </div>
  );
}
