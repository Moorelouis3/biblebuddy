"use client";

/**
 * One book's word search: the grid, the word list under it, the details for
 * a found word, and the finish (2026-11-13).
 *
 * Game look since 2026-11-24 (Louis: "on the same level as the trivia and the
 * Bible matching game"): the book's own painted scene, the Match gold frame
 * and plaque, a 3-2-1 start, a clock, points for every word with a speed
 * bonus and a streak multiplier, three hints, and the Trivia ending (stars,
 * the score counting up, confetti). The rules are in lib/wordSearchScore.ts.
 *
 * Laid out for a phone held upright: the score bar on top, the grid as wide as
 * the screen allows, the words below where a thumb can reach them.
 *
 * The grid comes from (book, seed) and nothing else, so what is saved is the
 * seed and the words found. Completion is recorded once, on the first finish,
 * and "Play again" never touches it: it only swaps the seed and clears the
 * found words for the new grid. Points, the clock and stars belong to one
 * sitting; the best result is kept on the device as a personal record.
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Countdown, FloatPoints, GameHud, GameResults, GameStage, GameTopBar } from "@/components/games/GameStage";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { fetchStaticJson, kjvStaticUrl } from "@/lib/chapterStaticData";
import { bookScene } from "@/lib/games/bookScene";
import { matchSound } from "@/lib/match/sound";
import { supabase } from "@/lib/supabaseClient";
import { useMemoryVerse } from "@/lib/useMemoryVerse";
import type { WordSearchBook, WordSearchWord } from "@/lib/wordSearchData";
import { generatePuzzle, newSeed, placementCells, type Cell } from "@/lib/wordSearchGame";
import { getWordSearchProgress, saveWordSearchProgress, type WordSearchProgress } from "@/lib/wordSearchProgress";
import {
  formatClock,
  HINT_COST,
  HINTS_PER_GRID,
  readBest,
  saveBest,
  scoreFind,
  starsFor,
  type WordSearchBest,
} from "@/lib/wordSearchScore";
import WordSearchGrid from "./WordSearchGrid";

type LoadState = "loading" | "ready" | "failed";
type Phase = "intro" | "countdown" | "play" | "done";

const BOOKS_HREF = "/bible-study-games/word-search";

function readerHref(book: string, chapter: number) {
  return `/bible/${encodeURIComponent(book.toLowerCase())}/${chapter}`;
}

const CALLOUTS: Record<number, string> = { 3: "Amen!", 5: "Hallelujah!", 8: "Glory!" };

export default function WordSearchGame({ book }: { book: WordSearchBook }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [progress, setProgress] = useState<WordSearchProgress | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const [openWord, setOpenWord] = useState<WordSearchWord | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  // This sitting: the clock, the points, the streak, the hints.
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreBump, setScoreBump] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hint, setHint] = useState<{ cell: Cell; letters: string } | null>(null);
  const [newest, setNewest] = useState<string | null>(null);
  const [float, setFloat] = useState<{ id: number; text: string } | null>(null);
  const [callout, setCallout] = useState<{ id: number; text: string } | null>(null);
  const [foundThisSitting, setFoundThisSitting] = useState(0);
  const [result, setResult] = useState<{ stars: number; score: number; seconds: number; record: boolean; best: WordSearchBest | null } | null>(null);
  const lastFindAt = useRef(0);
  const streak = useRef(0);
  const secondsRef = useRef(0);

  const scene = useMemo(() => bookScene(book.book, 1), [book.book]);
  const letters = useMemo(() => book.words.map((word) => word.letters), [book]);
  const [best, setBest] = useState<WordSearchBest | null>(null);
  useEffect(() => {
    const id = window.setTimeout(() => setBest(readBest(book.slug)), 0);
    return () => window.clearTimeout(id);
  }, [book.slug]);

  // Open the book: resume the saved grid, or start one and save its seed at
  // once so that leaving after a minute still comes back to the same letters.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      const id = data.user?.id ?? null;
      setUserId(id);
      if (!id) {
        // Signed out: playable, just not saved.
        setProgress({ book: book.slug, seed: newSeed(), found: [], completed_at: null, completions: 0 });
        setState("ready");
        return;
      }
      try {
        const saved = await getWordSearchProgress(id, book.slug);
        if (cancelled) return;
        if (saved) {
          setProgress({ ...saved, found: saved.found.filter((word) => letters.includes(word)) });
        } else {
          const fresh: WordSearchProgress = { book: book.slug, seed: newSeed(), found: [], completed_at: null, completions: 0 };
          setProgress(fresh);
          void saveWordSearchProgress(id, fresh).then((ok) => {
            if (!ok && !cancelled) setSaveFailed(true);
          });
        }
        setState("ready");
      } catch {
        // A failed read is not "never played". Starting a new grid here would
        // overwrite the real one, so stop and offer another try.
        if (!cancelled) setState("failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book, letters, attempt]);

  // The grid depends on the seed alone, so finding a word (which replaces
  // `progress`) must not rebuild it. Pulling the seed out first makes that
  // the only thing the memo watches.
  const seed = progress?.seed ?? null;
  const puzzle = useMemo(() => (seed === null ? null : generatePuzzle(book.slug, letters, seed)), [book.slug, letters, seed]);

  const found = useMemo(() => progress?.found ?? [], [progress]);
  const foundSet = useMemo(() => new Set(found), [found]);
  const allFound = Boolean(progress) && found.length >= letters.length;

  // The clock runs only while playing and while the page is on screen.
  useEffect(() => {
    if (phase !== "play") return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const persist = useCallback(
    (next: WordSearchProgress) => {
      setProgress(next);
      if (!userId) return;
      void saveWordSearchProgress(userId, next).then((ok) => setSaveFailed(!ok));
    },
    [userId],
  );

  function startSitting() {
    secondsRef.current = 0;
    setSeconds(0);
    setScore(0);
    setHintsUsed(0);
    setHint(null);
    setNewest(null);
    setFoundThisSitting(0);
    setResult(null);
    streak.current = 0;
    lastFindAt.current = 0;
    matchSound.unlock();
    setPhase("countdown");
  }

  const finishSitting = useCallback(
    (finalScore: number, wordsFound: number, hints: number) => {
      const secs = secondsRef.current;
      const stars = starsFor(secs, wordsFound, hints);
      const record = saveBest(book.slug, { score: finalScore, stars, seconds: secs });
      const nextBest = readBest(book.slug);
      setBest(nextBest);
      setResult({ stars, score: finalScore, seconds: secs, record, best: nextBest });
      window.setTimeout(() => setPhase("done"), 700);
    },
    [book.slug],
  );

  const handleFound = useCallback(
    (word: string) => {
      if (!progress || progress.found.includes(word)) return;
      const nextFound = [...progress.found, word];
      const finished = nextFound.length >= letters.length;
      const firstFinish = finished && !progress.completed_at;
      persist({
        ...progress,
        found: nextFound,
        completed_at: finished ? progress.completed_at ?? new Date().toISOString() : progress.completed_at,
        completions: finished ? progress.completions + 1 : progress.completions,
      });

      // Points: a speed bonus for a quick find, multiplied by the streak.
      const since = secondsRef.current - lastFindAt.current;
      lastFindAt.current = secondsRef.current;
      const scored = scoreFind(since, streak.current);
      streak.current = scored.streak;
      const nextScore = score + scored.points;
      setScore(nextScore);
      setScoreBump((n) => n + 1);
      setFloat({ id: Date.now(), text: `+${scored.points}${scored.multiplier > 1 ? ` ×${scored.multiplier}` : ""}` });
      const shout = CALLOUTS[scored.streak];
      if (shout) setCallout({ id: Date.now(), text: shout });
      setNewest(word);
      if (hint?.letters === word) setHint(null);
      matchSound.crack();
      matchSound.match(Math.min(scored.streak, 6));
      if (scored.multiplier > 1) window.setTimeout(() => matchSound.power(), 120);
      const sitting = foundThisSitting + 1;
      setFoundThisSitting(sitting);

      if (finished) finishSitting(nextScore, sitting, hintsUsed);
      // Logged once per book, the first time it is finished. The points
      // engine scores this action once per book name, so a replay could not
      // score again even if it were logged - but there is no reason to log it.
      if (firstFinish && userId) {
        void logActionToMasterActions(userId, ACTION_TYPE.word_search_book_completed, book.book).catch(() => {});
      }
    },
    [progress, letters.length, persist, userId, book.book, score, hint, foundThisSitting, hintsUsed, finishSitting],
  );

  const onMiss = useCallback(() => {
    streak.current = 0;
  }, []);

  function takeHint() {
    if (!puzzle || hintsUsed >= HINTS_PER_GRID || hint) return;
    const left = puzzle.placements.filter((placement) => !foundSet.has(placement.letters));
    if (!left.length) return;
    const pick = left[Math.floor(Math.random() * left.length)];
    setHint({ cell: placementCells(pick)[0], letters: pick.letters });
    setHintsUsed((n) => n + 1);
    setScore((value) => Math.max(0, value - HINT_COST));
    matchSound.power();
  }

  function playAgain() {
    if (!progress) return;
    setOpenWord(null);
    persist({ ...progress, seed: newSeed(), found: [] });
    startSitting();
  }

  if (state === "loading" || (state === "ready" && (!progress || !puzzle))) {
    return (
      <GameStage scene={scene}>
        <style>{WS_CSS}</style>
        <GameTopBar title={book.book} sub="Word Search" back={BOOKS_HREF} />
        <p className="bbws-note py-16 text-center">Loading the {book.book} puzzle...</p>
      </GameStage>
    );
  }

  if (state === "failed" || !progress || !puzzle) {
    return (
      <GameStage scene={scene}>
        <GameTopBar title={book.book} sub="Word Search" back={BOOKS_HREF} />
        <div className="bbg-col">
          <div className="bbg-parch text-center">
            <p className="bbg-serif text-lg font-bold">Your {book.book} puzzle did not load.</p>
            <p className="mt-1 text-sm font-semibold">Your progress is still saved. Check your connection and try again.</p>
            <div className="mt-4 flex flex-col gap-2">
              <button type="button" onClick={() => { setState("loading"); setAttempt((value) => value + 1); }} className="bbg-btn bbg-btn-green">
                Try again
              </button>
              <Link href={BOOKS_HREF} className="bbg-btn bbg-btn-cream">
                Choose another book
              </Link>
            </div>
          </div>
        </div>
      </GameStage>
    );
  }

  const hintsLeft = HINTS_PER_GRID - hintsUsed;
  const playing = phase === "play" || phase === "countdown";

  return (
    <GameStage scene={scene}>
      <style>{WS_CSS}</style>
      <GameTopBar title={book.book} sub="Word Search" back={BOOKS_HREF} />

      <div className="bbg-col">
        {saveFailed ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
            Your last find did not save. Check your connection; it will save with your next one.
          </p>
        ) : null}

        {phase === "intro" ? (
          <div className="bbg-parch text-center">
            <p className="bbg-serif text-[13px] font-bold uppercase tracking-[0.16em]">Bible Word Search</p>
            <h2 className="bbg-serif mt-1 text-[28px] font-black leading-tight">{book.book}</h2>
            <p className="mt-2 text-[15px] font-semibold leading-6">
              {letters.length} words from {book.book} are hidden in the letters. Find them fast for bonus points, and keep a streak going.
            </p>
            {best ? (
              <p className="bbws-best mt-3">
                🏆 Your best: {best.score.toLocaleString()} points · {"★".repeat(best.stars)}
              </p>
            ) : null}
            <div className="mt-4 flex flex-col gap-2">
              {allFound ? (
                <>
                  <button type="button" onClick={playAgain} className="bbg-btn bbg-btn-green">
                    ▶ Play a new grid
                  </button>
                  <p className="text-[13px] font-semibold">You have found every word in this grid. A new grid hides the same words in new places.</p>
                </>
              ) : (
                <button type="button" onClick={startSitting} className="bbg-btn bbg-btn-green">
                  ▶ {found.length ? `Continue (${found.length}/${letters.length})` : "Play"}
                </button>
              )}
              <Link href={BOOKS_HREF} className="bbg-btn bbg-btn-cream">
                Choose another book
              </Link>
            </div>
          </div>
        ) : null}

        {playing || phase === "done" ? (
          <div className="relative">
            <GameHud
              items={[
                { label: "Found", value: `${found.length}/${letters.length}` },
                { label: "Time", value: formatClock(seconds) },
                { label: "Score", value: score.toLocaleString(), bump: scoreBump },
              ]}
            />
            {float ? <FloatPoints key={float.id} id={float.id} text={float.text} /> : null}
          </div>
        ) : null}

        {phase !== "intro" ? (
          <WordSearchGrid
            key={`${book.slug}-${progress.seed}`}
            puzzle={puzzle}
            found={found}
            onFound={handleFound}
            onMiss={onMiss}
            disabled={allFound || phase !== "play"}
            hint={hint?.cell ?? null}
            newest={newest}
          />
        ) : null}

        {phase === "play" && !allFound ? (
          <div className="flex justify-center gap-2">
            <button type="button" onClick={takeHint} disabled={hintsLeft <= 0 || Boolean(hint)} className="bbg-btn bbg-btn-cream bbg-btn-small">
              💡 Hint ({hintsLeft} left)
            </button>
          </div>
        ) : null}

        {phase !== "intro" ? (
          <section aria-label="Words to find" className="bbws-words">
            <ul className="flex flex-wrap justify-center gap-2">
              {book.words.map((word) => {
                const isFound = foundSet.has(word.letters);
                return (
                  <li key={word.letters}>
                    {isFound ? (
                      <button type="button" onClick={() => setOpenWord(word)} className={`bbws-pill is-found${newest === word.letters ? " is-new" : ""}`}>
                        <span aria-hidden="true">✓</span>
                        <span className="line-through decoration-2">{word.label}</span>
                        <span aria-hidden="true">›</span>
                        <span className="sr-only">found. Open details</span>
                      </button>
                    ) : (
                      <div className="bbws-pill">{word.label}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="bbws-note mt-2 text-center">
              {phase === "play" && !allFound
                ? "Drag across a word, or tap its first and last letter. Tap a found word to read about it."
                : "Tap a found word to read about it."}
            </p>
            {allFound && phase === "play" ? (
              <div className="mt-3 flex flex-col gap-2">
                <button type="button" onClick={playAgain} className="bbg-btn bbg-btn-green">
                  Play a new grid
                </button>
                <Link href={BOOKS_HREF} className="bbg-btn bbg-btn-cream">
                  Choose another book
                </Link>
              </div>
            ) : null}
          </section>
        ) : null}
      </div>

      {phase === "countdown" ? <Countdown onDone={() => setPhase("play")} /> : null}
      {callout ? (
        <span key={callout.id} className="bbg-callout" aria-hidden="true">
          {callout.text}
        </span>
      ) : null}

      {phase === "done" && result ? (
        <div className="bbws-overlay" role="dialog" aria-modal="true" aria-label={`${book.book} complete`}>
          <div className="bbg-col">
            <GameResults
              heading={`${book.book} complete!`}
              name="Bible Word Search"
              stars={result.stars}
              score={result.score}
              lines={
                <>
                  <p>
                    All {letters.length} words in {formatClock(result.seconds)}
                    {hintsUsed ? ` · ${hintsUsed} hint${hintsUsed === 1 ? "" : "s"}` : ""}
                  </p>
                  {result.record ? (
                    <p className="bbws-record">🏆 New personal best!</p>
                  ) : result.best ? (
                    <p className="text-[15px]">Your best: {result.best.score.toLocaleString()} points</p>
                  ) : null}
                </>
              }
            >
              <Link href={readerHref(book.book, 1)} className="bbg-btn bbg-btn-green">
                📖 Read {book.book}
              </Link>
              <button type="button" onClick={() => setPhase("play")} className="bbg-btn bbg-btn-cream">
                See the words
              </button>
              <button type="button" onClick={playAgain} className="bbg-btn bbg-btn-cream">
                Play a new grid
              </button>
              <Link href={BOOKS_HREF} className="bbg-btn bbg-btn-cream">
                Choose another book
              </Link>
            </GameResults>
          </div>
        </div>
      ) : null}

      {openWord ? <WordDetails book={book} word={openWord} userId={userId} onClose={() => setOpenWord(null)} /> : null}
    </GameStage>
  );
}

const WS_CSS = `
.bbws-note { font-size:12px; font-weight:700; color:#fff3dc; text-shadow: 0 1px 2px rgba(0,0,0,.75); }
.bbws-best { display:inline-block; padding:4px 14px; border-radius:999px; background: rgba(138,90,18,.12); font-weight:800; font-size:14px; }
.bbws-record { font-weight:900; color:#1f6b3a !important; animation: bbg-pop-in .4s .9s both; }
.bbws-words { margin-top:2px; }
.bbws-pill { display:flex; align-items:center; gap:6px; min-height:40px; padding: 0 14px; border-radius:999px; font-family: Georgia, serif; font-weight:800; font-size:14px;
  color:#3b2412; background: linear-gradient(180deg,#fff6dd,#efd9a6); border:2px solid #b8893c; box-shadow: 0 2px 0 #7a5320; }
.bbws-pill.is-found { color:#fff8dc; background: linear-gradient(180deg,#3d9a5c,#1f6b3a); border-color:#14502a; box-shadow: 0 2px 0 #0e3a1e; cursor:pointer; }
.bbws-pill.is-new { animation: bbg-pop-in .4s cubic-bezier(.2,.9,.3,1.5); }
.bbws-overlay { position:fixed; inset:0; z-index:75; overflow-y:auto; padding: calc(24px + env(safe-area-inset-top)) 14px calc(24px + env(safe-area-inset-bottom));
  background: rgba(20,12,4,.55); backdrop-filter: blur(2px); }
`;

// ───────────────────────── word details ─────────────────────────

/**
 * The sheet a found word opens: what it has to do with this book, the verse
 * itself, a way into the reader, and "Add to Bible Memory".
 *
 * Portalled to <body> so no transformed ancestor can move a fixed panel off
 * screen.
 */
function WordDetails({
  book,
  word,
  userId,
  onClose,
}: {
  book: WordSearchBook;
  word: WordSearchWord;
  userId: string | null;
  onClose: () => void;
}) {
  const requestKey = `${book.slug}|${word.chapter}|${word.verse}`;
  const [loaded, setLoaded] = useState<{ key: string; text: string | null } | null>(null);
  const verseText = loaded?.key === requestKey ? loaded.text : null;
  const verseState: "loading" | "ready" | "failed" = loaded?.key !== requestKey ? "loading" : loaded.text ? "ready" : "failed";

  useEffect(() => {
    let cancelled = false;
    void fetchStaticJson<Array<{ number: number; text: string }>>(kjvStaticUrl(book.book, word.chapter)).then((chapter) => {
      if (cancelled) return;
      const text = chapter?.find((row) => row.number === word.verse)?.text ?? null;
      setLoaded({ key: requestKey, text: text ? text.replace(/\s+/g, " ").trim() : null });
    });
    return () => {
      cancelled = true;
    };
  }, [book.book, word.chapter, word.verse, requestKey]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const memory = useMemoryVerse(
    userId,
    verseText ? { book: book.book, chapter: word.chapter, verse: word.verse, translation: "KJV", text: verseText, source: "word_search" } : null,
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${word.label} in ${book.book}`}
        onClick={(event) => event.stopPropagation()}
        className="bbg-parch max-h-[85vh] w-full max-w-md overflow-y-auto"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="bbg-serif text-2xl font-black tracking-wide">{word.label}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="bbg-round" style={{ width: 40, height: 40, fontWeight: 900, color: "#3b2412" }}>
            ✕
          </button>
        </div>
        <p className="mt-2 text-base font-bold leading-6">{word.explanation}</p>

        <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(138,90,18,.1)" }}>
          <p className="text-sm font-black">{word.reference} · KJV</p>
          {verseState === "loading" ? <p className="mt-2 text-sm font-semibold">Loading the verse...</p> : null}
          {verseState === "ready" ? <p className="bbg-serif mt-2 text-[16px] font-semibold leading-7">{verseText}</p> : null}
          {verseState === "failed" ? <p className="mt-2 text-sm font-semibold">The verse did not load here. You can still open it in the Bible.</p> : null}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link href={readerHref(book.book, word.chapter)} className="bbg-btn bbg-btn-green">
            Open {book.book} {word.chapter}
          </Link>
          {userId && verseText ? (
            <button type="button" onClick={() => void memory.toggle()} disabled={memory.busy} aria-pressed={memory.saved} className="bbg-btn bbg-btn-cream">
              {memory.failed ? "Did not save. Tap to retry" : memory.saved ? "✓ In Bible Memory" : "🧠 Add to Bible Memory"}
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
