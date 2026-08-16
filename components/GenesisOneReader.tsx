"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { VerseHighlighter } from "./VerseHighlighter";
import BrowserTtsButton from "./BrowserTtsButton";
import { GENESIS_ONE_KJV } from "../lib/genesisOneText";
import { getBibleChapterTtsSrc } from "../lib/bibleChapterTts";
import { BIBLE_READING_BACKGROUND_VOLUME, getBibleReadingBackgroundTracks } from "../lib/bibleReadingBackgroundMusic";
import { getBookTotalChapters, isChapterCompleted, markChapterDone } from "../lib/readingProgress";
import { supabase } from "../lib/supabaseClient";
import type { TriviaChapterPack } from "../lib/triviaGameData";
import type { ScrambledChapterPack } from "../lib/scrambledGameData";

/**
 * The Genesis 1 reader, on its own.
 *
 * The shared chapter page carries everything every chapter in the Bible might
 * need: study note popups, featured characters, level ups, the daily
 * checklist, Bible Year deep study. Genesis 1 needs none of it, and one of
 * those paths drags in the whole-Bible notes as a 33 MB JavaScript chunk.
 *
 * So Genesis 1 gets its own page with only what it uses. Its verses are
 * bundled, its notes come from the server as data, and the games load when
 * their tab is opened. Nothing here reaches the aggregator.
 */

const TriviaGamePlayer = dynamic(() => import("./TriviaGamePlayer"), { ssr: false });
const ScrambledGamePlayer = dynamic(() => import("./ScrambledGamePlayer"), { ssr: false });
const CommentSection = dynamic(() => import("./comments/CommentSection"), { ssr: false });

const BOOK = "Genesis";
const CHAPTER = 1;

type Verse = { number: number; text: string };
type Translation = "kjv" | "asv" | "web";
type Tab = "scripture" | "trivia" | "scrambled";

const ALL_BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
  "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];

export default function GenesisOneReader() {
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("scripture");
  const [translation, setTranslation] = useState<Translation>("kjv");
  const [verses, setVerses] = useState<Verse[]>(() =>
    GENESIS_ONE_KJV.map((v) => ({ number: v.verse, text: v.text })),
  );

  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);
  const [translationMenuOpen, setTranslationMenuOpen] = useState(false);
  const [menuBook, setMenuBook] = useState<string | null>(null);
  const [menuShowBooks, setMenuShowBooks] = useState(false);
  const chapterMenuRef = useRef<HTMLDivElement | null>(null);
  const translationMenuRef = useRef<HTMLDivElement | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [triviaPack, setTriviaPack] = useState<TriviaChapterPack | null>(null);
  const [scrambledPack, setScrambledPack] = useState<ScrambledChapterPack | null>(null);

  // Other translations are not bundled, so they are fetched. KJV is instant.
  useEffect(() => {
    if (translation === "kjv") {
      setVerses(GENESIS_ONE_KJV.map((v) => ({ number: v.verse, text: v.text })));
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`https://bible-api.com/genesis+1?translation=${translation}`);
        if (!response.ok) throw new Error(`bible-api responded ${response.status}`);
        const data = (await response.json()) as { verses?: Array<{ verse: number; text: string }> };
        if (!cancelled && data.verses?.length) {
          setVerses(data.verses.map((v) => ({ number: v.verse, text: v.text.trim() })));
        }
      } catch (error) {
        console.warn("[GENESIS_ONE] Could not load translation:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [translation]);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      const id = data?.user?.id || null;
      setUserId(id);
      if (id) setCompleted(await isChapterCompleted(id, BOOK, CHAPTER));
    })();
  }, []);

  // The games are only needed once their tab is opened.
  useEffect(() => {
    if (tab === "scripture") return;

    let cancelled = false;
    void (async () => {
      try {
        if (tab === "trivia" && !triviaPack) {
          const { getTriviaChapter } = await import("../lib/triviaGameData");
          if (!cancelled) setTriviaPack(getTriviaChapter("genesis", CHAPTER));
        }
        if (tab === "scrambled" && !scrambledPack) {
          const { getScrambledChapter } = await import("../lib/scrambledGameData");
          if (!cancelled) setScrambledPack(getScrambledChapter("genesis", CHAPTER));
        }
      } catch (error) {
        console.warn("[GENESIS_ONE] Could not load game pack:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tab, triviaPack, scrambledPack]);

  useEffect(() => {
    if (!chapterMenuOpen && !translationMenuOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (!chapterMenuRef.current?.contains(target)) setChapterMenuOpen(false);
      if (!translationMenuRef.current?.contains(target)) setTranslationMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [chapterMenuOpen, translationMenuOpen]);

  const speechText = useMemo(
    () => verses.map((v) => `${v.number}. ${v.text}`).join(" "),
    [verses],
  );
  const audioSrc = useMemo(() => getBibleChapterTtsSrc(BOOK, CHAPTER, translation), [translation]);

  async function handleMarkComplete() {
    if (saving || completed || !userId) return;
    setSaving(true);
    try {
      await markChapterDone(userId, BOOK, CHAPTER);
      setCompleted(true);
    } catch (error) {
      console.warn("[GENESIS_ONE] Could not mark complete:", error);
    } finally {
      setSaving(false);
    }
  }

  const menuBookName = menuBook || BOOK;

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-2">
      <div className="mx-auto max-w-4xl">
        {/* Chapter and translation, then the reader tabs */}
        <div className="relative z-30 mb-4 overflow-visible rounded-[20px] border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5">
            <div className="relative" ref={chapterMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setChapterMenuOpen((open) => {
                    if (open) return false;
                    setMenuShowBooks(false);
                    setMenuBook(null);
                    return true;
                  });
                  setTranslationMenuOpen(false);
                }}
                aria-expanded={chapterMenuOpen}
                className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-lg font-black text-slate-900 transition hover:bg-slate-100"
              >
                {BOOK} {CHAPTER}
                <span aria-hidden="true" className="text-xs text-slate-400">▼</span>
              </button>

              {chapterMenuOpen ? (
                <div className="absolute left-0 top-full z-50 mt-2 w-[17rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
                  {menuShowBooks ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
                        <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Books</span>
                        <button
                          type="button"
                          onClick={() => setMenuShowBooks(false)}
                          className="rounded-lg px-2 py-1 text-xs font-black text-sky-600 transition hover:bg-slate-50"
                        >
                          Back
                        </button>
                      </div>
                      <div className="max-h-[16rem] overflow-y-auto p-2">
                        {ALL_BIBLE_BOOKS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setMenuBook(b);
                              setMenuShowBooks(false);
                            }}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-bold transition hover:bg-sky-50 ${
                              b === menuBookName ? "text-sky-600" : "text-slate-700"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
                        <span className="min-w-0 truncate text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                          {menuBookName}
                        </span>
                        <button
                          type="button"
                          onClick={() => setMenuShowBooks(true)}
                          className="shrink-0 rounded-lg px-2 py-1 text-xs font-black text-sky-600 transition hover:bg-slate-50"
                        >
                          All books
                        </button>
                      </div>
                      <div className="max-h-[16rem] overflow-y-auto p-2">
                        <div className="grid grid-cols-6 gap-1.5">
                          {Array.from({ length: getBookTotalChapters(menuBookName) }, (_, i) => i + 1).map((ch) => {
                            const isCurrent = menuBookName === BOOK && ch === CHAPTER;
                            return (
                              <button
                                key={ch}
                                type="button"
                                onClick={() => {
                                  setChapterMenuOpen(false);
                                  setMenuShowBooks(false);
                                  setMenuBook(null);
                                  if (!isCurrent) {
                                    router.push(
                                      `/Bible/${encodeURIComponent(menuBookName.toLowerCase())}/${ch}`,
                                    );
                                  }
                                }}
                                className={`rounded-lg px-1 py-1.5 text-xs font-black transition ${
                                  isCurrent ? "bg-sky-500 text-white" : "bg-slate-50 text-slate-700 hover:bg-sky-50"
                                }`}
                              >
                                {ch}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </div>

            <div className="relative" ref={translationMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setTranslationMenuOpen((open) => !open);
                  setChapterMenuOpen(false);
                }}
                aria-expanded={translationMenuOpen}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
              >
                {translation.toUpperCase()}
                <span aria-hidden="true" className="text-xs text-slate-400">▼</span>
              </button>

              {translationMenuOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
                  {(["kjv", "asv", "web"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setTranslation(option);
                        setTranslationMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-black transition ${
                        translation === option ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {option.toUpperCase()}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex">
            {([
              { id: "scripture", icon: "📖", label: "Scripture" },
              { id: "trivia", icon: "❓", label: "Trivia" },
              { id: "scrambled", icon: "🧩", label: "Scrambled" },
            ] as const).map((entry) => {
              const active = tab === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setTab(entry.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-w-0 flex-1 items-center justify-center gap-1 border-b-2 px-1 py-3 text-xs font-black transition sm:gap-1.5 sm:px-2 sm:text-sm ${
                    active ? "border-sky-500 text-sky-600" : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span aria-hidden="true">{entry.icon}</span>
                  {entry.label}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "scripture" ? (
          <>
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
              <BrowserTtsButton
                text={speechText}
                label={`Listen to ${BOOK} ${CHAPTER}`}
                audioSrc={audioSrc}
                backgroundMusicSrcs={getBibleReadingBackgroundTracks(BOOK, CHAPTER)}
                backgroundMusicVolume={BIBLE_READING_BACKGROUND_VOLUME}
                variant="transport"
              />
              <VerseHighlighter book={BOOK} chapter={CHAPTER} verses={verses} />
            </div>

            <button
              type="button"
              onClick={() => void handleMarkComplete()}
              disabled={saving || completed}
              className={`mb-6 w-full rounded-2xl border px-4 py-3 text-sm font-black transition ${
                completed
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : saving
                    ? "cursor-not-allowed border-sky-200 bg-sky-200 text-white"
                    : "border-sky-500 bg-sky-500 text-white hover:bg-sky-400"
              }`}
            >
              {completed ? "Chapter Completed" : saving ? "Saving..." : "Mark Chapter Completed"}
            </button>

            <div className="mb-10">
              <div className="mx-auto mb-4 max-w-2xl rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-50 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Chapter Discussion</p>
                <p className="mt-3 text-xl font-black leading-snug text-gray-950">
                  After reading {BOOK} {CHAPTER}, what is the one thing that stood out to you most, or that you learned
                  about God in this chapter?
                </p>
              </div>

              <CommentSection
                articleSlug={`bible-chapter-genesis-${CHAPTER}`}
                headingText={`${BOOK} ${CHAPTER} Discussion`}
                placeholderText="Start Typing Here"
                submitButtonText="Post Comment"
              />
            </div>
          </>
        ) : null}

        {tab === "trivia" ? (
          <div className="mb-6 overflow-hidden rounded-[20px] border border-slate-200 bg-gray-50">
            {triviaPack ? (
              <TriviaGamePlayer
                bookName={BOOK}
                bookSlug="genesis"
                chapter={triviaPack}
                compact
                hideSkipButton
                onClose={() => setTab("scripture")}
              />
            ) : (
              <p className="px-4 py-8 text-center text-sm font-semibold text-slate-500">Loading trivia...</p>
            )}
          </div>
        ) : null}

        {tab === "scrambled" ? (
          <div className="mb-6 overflow-hidden rounded-[20px] border border-slate-200 bg-[#f5f7fb]">
            {scrambledPack ? (
              <ScrambledGamePlayer
                bookName={BOOK}
                bookSlug="genesis"
                chapter={scrambledPack}
                compact
                onClose={() => setTab("scripture")}
              />
            ) : (
              <p className="px-4 py-8 text-center text-sm font-semibold text-slate-500">Loading scrambled...</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
