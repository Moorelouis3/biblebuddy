"use client";

/**
 * Bible Word Search: choose a book (2026-11-13).
 *
 * All 66, in Bible order, in two groups. Every book is open from the start -
 * nothing has to be unlocked - and each one says in words whether it is not
 * started, in progress or completed, so the state never depends on colour.
 *
 * Game look since 2026-11-24: the books are Match level coins on a painted
 * scene, a tick coin once finished, with the best stars from this device
 * under it (lib/wordSearchScore.ts).
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GameStage, GameTopBar } from "@/components/games/GameStage";
import { supabase } from "@/lib/supabaseClient";
import { trackFeatureEvent } from "@/lib/featureEvents";
import { OLD_TESTAMENT_COUNT, WORD_SEARCH_BOOKS, type WordSearchBook } from "@/lib/wordSearchData";
import { listWordSearchProgress, type WordSearchProgress } from "@/lib/wordSearchProgress";
import { readBest, type WordSearchBest } from "@/lib/wordSearchScore";

type LoadState = "loading" | "ready" | "failed";

const SCENE = { phone: "/games/match/ui/eden-phone.webp", desktop: "/games/match/ui/eden-desktop.webp" };

/** "1 Samuel" -> "1 Sa", "Genesis" -> "Gen", "Song of Solomon" -> "Song". */
function shortName(book: string): string {
  const numbered = book.match(/^(\d)\s+(\w+)/);
  if (numbered) return `${numbered[1]} ${numbered[2].slice(0, 2)}`;
  if (book.startsWith("Song")) return "Song";
  if (book === "Philippians") return "Phil";
  if (book === "Philemon") return "Phm";
  if (book === "Judges") return "Jdg";
  if (book === "Jude") return "Jude";
  return book.slice(0, 3);
}

export default function WordSearchBooks() {
  const [state, setState] = useState<LoadState>("loading");
  const [rows, setRows] = useState<WordSearchProgress[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [bests, setBests] = useState<Record<string, WordSearchBest>>({});

  useEffect(() => {
    const id = window.setTimeout(() => {
      const map: Record<string, WordSearchBest> = {};
      for (const book of WORD_SEARCH_BOOKS) {
        const best = readBest(book.slug);
        if (best) map[book.slug] = best;
      }
      setBests(map);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const load = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    const id = data.user?.id ?? null;
    if (!id) return { rows: [] as WordSearchProgress[], ok: true };
    // One "opened" per visit to the list, so people who look and leave are
    // counted and not mistaken for people who never found the game.
    trackFeatureEvent("word_search_opened", id);
    try {
      return { rows: await listWordSearchProgress(id), ok: true };
    } catch {
      return { rows: [] as WordSearchProgress[], ok: false };
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void load().then((result) => {
      if (cancelled) return;
      setRows(result.rows);
      setState(result.ok ? "ready" : "failed");
    });
    return () => {
      cancelled = true;
    };
  }, [load, attempt]);

  const bySlug = useMemo(() => new Map(rows.map((row) => [row.book, row])), [rows]);
  const completed = rows.filter((row) => row.completed_at).length;

  function status(book: WordSearchBook) {
    const row = bySlug.get(book.slug);
    if (!row) return { text: "Not started", tone: "idle" as const };
    const inGrid = row.found.length;
    if (row.completed_at) return { text: "Completed", tone: "done" as const };
    if (inGrid === 0) return { text: "Not started", tone: "idle" as const };
    return { text: `${inGrid}/${book.words.length} found`, tone: "going" as const };
  }

  const group = (title: string, books: WordSearchBook[]) => (
    <section className="mt-2">
      <h2 className="bbwb-ribbon">{title}</h2>
      <ul className="bbwb-grid">
        {books.map((book) => {
          const current = state === "ready" ? status(book) : null;
          const best = bests[book.slug];
          const done = current?.tone === "done";
          return (
            <li key={book.slug}>
              <Link href={`/bible-study-games/word-search/${book.slug}`} className="bbwb-coin" aria-label={`${book.book}, ${current?.text ?? ""}`}>
                <span className={`bbwb-disc${done ? " is-done" : ""}`}>
                  {done ? null : <span className="bbwb-abbr">{shortName(book.book)}</span>}
                </span>
                <span className="bbwb-name">{book.book}</span>
                <span className={`bbwb-status is-${current?.tone ?? "idle"}`}>
                  {best ? <span className="bbwb-stars">{"★".repeat(best.stars)}</span> : null}
                  {current && !(done && best) ? current.text : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <GameStage scene={SCENE} dim={0.45}>
      <style>{BOOKS_CSS}</style>
      <GameTopBar title="Word Search" sub="Pick a book" back="/bible-study-games" />
      <div className="bbg-col">
        <div className="bbg-parch text-center">
          <p className="bbg-serif text-[16px] font-bold leading-6">One puzzle for every book of the Bible. Every book is open.</p>
          {state === "ready" ? (
            <p className="bbwb-count mt-2">
              <strong>{completed}</strong> of 66 books completed
            </p>
          ) : null}
        </div>

        {state === "failed" ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-700">Your progress did not load, so the books below show no status. It is still saved.</p>
            <button
              type="button"
              onClick={() => {
                setState("loading");
                setAttempt((value) => value + 1);
              }}
              className="mt-2 rounded-full bg-red-700 px-4 py-2 text-sm font-black text-white"
            >
              Try again
            </button>
          </div>
        ) : null}

        {group("Old Testament", WORD_SEARCH_BOOKS.slice(0, OLD_TESTAMENT_COUNT))}
        {group("New Testament", WORD_SEARCH_BOOKS.slice(OLD_TESTAMENT_COUNT))}
      </div>
    </GameStage>
  );
}

const BOOKS_CSS = `
.bbwb-count { display:inline-block; padding:4px 16px; border-radius:999px; background: rgba(138,90,18,.12); font-weight:800; font-size:14px; }
.bbwb-ribbon { margin: 6px auto 10px; width: min(100%, 320px); min-height:46px; display:flex; align-items:center; justify-content:center;
  font-family: Georgia, serif; font-weight:900; font-size:18px; color:#3b2412;
  background: url(/games/match/ui/level-name-plaque.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 4px 8px rgba(0,0,0,.4)); }
.bbwb-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px 8px; }
@media (min-width: 560px) { .bbwb-grid { grid-template-columns: repeat(4, minmax(0,1fr)); } }
.bbwb-coin { display:flex; flex-direction:column; align-items:center; text-decoration:none; color:inherit; transition: transform .1s; }
.bbwb-coin:active { transform: scale(.95); }
.bbwb-disc { position:relative; width: min(24vw, 96px); aspect-ratio:1; display:grid; place-items:center; padding-bottom:18%;
  background: url(/games/match/ui/level-coin-normal.webp) center / contain no-repeat; filter: drop-shadow(0 6px 8px rgba(0,0,0,.45)); }
.bbwb-disc.is-done { background-image: url(/games/match/ui/level-coin-completed.webp); }
.bbwb-abbr { font-family: Georgia, serif; font-weight:900; font-size: clamp(15px, 4.6vw, 21px); color:#fff6dc; text-shadow: 0 2px 0 #7a2e05, 0 0 6px rgba(0,0,0,.35); }
.bbwb-name { margin-top:2px; max-width:100%; padding: 2px 10px; border-radius:999px; background: rgba(255,246,221,.94); border:1.5px solid #b8893c;
  font-family: Georgia, serif; font-weight:800; font-size:12px; color:#3b2412; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bbwb-status { margin-top:3px; min-height:16px; font-size:11px; font-weight:800; color:#fff3dc; text-shadow: 0 1px 2px rgba(0,0,0,.8); display:flex; gap:4px; align-items:center; }
.bbwb-status.is-going { color:#ffe08a; }
.bbwb-status.is-done { color:#b9f5c6; }
.bbwb-stars { color:#f6c445; letter-spacing:1px; font-size:13px; }
`;
