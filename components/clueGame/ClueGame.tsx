"use client";

/**
 * Bible Clue Game, presented by Bible Buddy: the solo card table.
 *
 * Everything that decides the game (timers, guesses, penalties, who gets the
 * card) is lib/clueGame/engine.ts. This file only draws the table and feeds
 * the engine actions with the time they happened, which is what lets rooms
 * and online matches run the same engine on the server later.
 *
 * Kept out of the Bible Cover remaps on purpose: the game has its own green
 * Genesis table, so it uses its own bb-clue-* classes and inline colours
 * rather than the bg-white / text-slate utilities the covers repaint.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { GENESIS_DECK } from "@/lib/clueGame/decks/genesis";
import {
  canGuess,
  createMatch,
  msLeft,
  pointsForClue,
  reduceClueMatch,
  soloSetup,
  type ClueAction,
  type ClueMatch,
} from "@/lib/clueGame/engine";
import type { ClueCard, ClueCategory, ClueRef } from "@/lib/clueGame/types";
import { kjvStaticUrl } from "@/lib/chapterStaticData";
import { trackFeatureEvent } from "@/lib/featureEvents";
import { supabase } from "@/lib/supabaseClient";

const ME = "me";
const deck = GENESIS_DECK;
const cardsById = new Map(deck.cards.map((c) => [c.id, c]));

const CATEGORY_LABEL: Record<ClueCategory, string> = { person: "Person", place: "Place", thing: "Thing" };

function newMatch(): ClueMatch {
  return createMatch({ cards: deck.cards, ...soloSetup("You"), seed: Date.now() % 2147483647 });
}

/* ---------- small pieces ---------- */

function Silhouette({ category }: { category: ClueCategory }) {
  // Anonymous on purpose: the same shape for every card of a category, so the
  // silhouette tells you the category and nothing else.
  if (category === "place") {
    return (
      <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
        <path d="M8 98 L42 46 L60 70 L78 38 L112 98 Z" fill="currentColor" />
        <circle cx="88" cy="28" r="9" fill="currentColor" opacity=".55" />
      </svg>
    );
  }
  if (category === "thing") {
    return (
      <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
        <path d="M60 14 L70 46 L104 46 L77 66 L87 100 L60 80 L33 100 L43 66 L16 46 L50 46 Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
      <circle cx="60" cy="40" r="20" fill="currentColor" />
      <path d="M22 108 C22 78 40 64 60 64 C80 64 98 78 98 108 Z" fill="currentColor" />
      <text x="60" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0d2a1b" opacity=".55">?</text>
    </svg>
  );
}

function CardBack({ category }: { category: ClueCategory }) {
  return (
    <div className="bb-clue-cardface bb-clue-back">
      <div className="bb-clue-brand">BIBLE BUDDY</div>
      <div className="bb-clue-deckpill">GENESIS</div>
      <Silhouette category={category} />
      <div className="bb-clue-catband">{CATEGORY_LABEL[category].toUpperCase()}</div>
    </div>
  );
}

function PointDots({ clueIndex }: { clueIndex: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Worth ${pointsForClue(clueIndex)} points`}>
      {[5, 4, 3, 2, 1].map((p, i) => (
        <span key={p} className={`bb-clue-dot ${i === clueIndex ? "is-now" : i < clueIndex ? "is-past" : ""}`}>
          {p}
        </span>
      ))}
    </div>
  );
}

function Pile({ label, count, tone }: { label: string; count: number; tone: "win" | "miss" }) {
  return (
    <div className={`bb-clue-pile ${tone === "win" ? "is-win" : "is-miss"}`} data-pile={tone}>
      <div className="bb-clue-pilestack" aria-hidden="true">
        {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
          <span key={i} style={{ transform: `translate(${i * 2}px, ${-i * 2}px)` }} />
        ))}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-black uppercase tracking-[0.12em] opacity-75">{label}</div>
        <div className="text-lg font-black leading-none">{count}</div>
      </div>
    </div>
  );
}

/* ---------- Scripture sheet ---------- */

function ScriptureSheet({ target, onClose }: { target: ClueRef; onClose: () => void }) {
  const [verses, setVerses] = useState<Array<{ number: number; text: string }> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    fetch(kjvStaticUrl(target.book, target.chapter))
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((all: Array<{ number: number; text: string }>) => {
        if (live) setVerses(all.filter((v) => v.number >= target.verseStart && v.number <= target.verseEnd));
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [target]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="bb-clue-sheetwrap" role="dialog" aria-modal="true" aria-label={target.label} onClick={onClose}>
      <div className="bb-clue-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black">{target.label} <span className="text-xs font-bold opacity-60">KJV</span></h3>
          <button type="button" onClick={onClose} className="bb-clue-x" aria-label="Close">✕</button>
        </div>
        <div className="mt-3 max-h-[45vh] space-y-2 overflow-y-auto text-[15px] leading-relaxed">
          {verses
            ? verses.map((v) => (
                <p key={v.number}>
                  <sup className="mr-1 font-black opacity-60">{v.number}</sup>
                  {v.text.replace(/\s*\n\s*/g, " ")}
                </p>
              ))
            : failed
              ? <p className="opacity-70">This passage could not load. Open the chapter instead.</p>
              : <p className="opacity-60">Loading…</p>}
        </div>
        <Link
          href={`/bible/${encodeURIComponent(target.book.toLowerCase())}/${target.chapter}`}
          className="bb-clue-btn mt-4 w-full"
        >
          Read {target.book} {target.chapter} in the Bible
        </Link>
      </div>
    </div>
  );
}

/* ---------- the table ---------- */

export default function ClueGame() {
  const [match, setMatch] = useState<ClueMatch>(() => newMatch());
  const [now, setNow] = useState(() => Date.now());
  const [guess, setGuess] = useState("");
  const [flash, setFlash] = useState<null | { kind: "wrong" | "right"; text: string; key: number }>(null);
  const [sheet, setSheet] = useState<ClueRef | null>(null);
  const [leaving, setLeaving] = useState<null | "win" | "miss">(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const act = useCallback((action: ClueAction) => {
    setMatch((m) => reduceClueMatch(m, action, cardsById));
  }, []);

  // The clock: one tick a tenth of a second while a clue is up.
  useEffect(() => {
    if (match.phase !== "clue") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      act({ type: "tick", now: t });
    }, 100);
    return () => window.clearInterval(id);
  }, [match.phase, act]);

  // Who is playing, for the Features tab on /admin/analytics
  // (lib/newFeaturesReport.ts). One "opened" per visit.
  const userIdRef = useRef<string | null>(null);
  useEffect(() => {
    let live = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!live) return;
      userIdRef.current = data.user?.id ?? null;
      trackFeatureEvent("clue_game_opened", userIdRef.current, { deck: deck.id });
    });
    return () => {
      live = false;
    };
  }, []);

  // Read what the engine logged: the "Not it, -5" feedback, and the
  // measurement (a game dealt, each card's outcome, the finished game).
  const lastLogged = useRef(0);
  useEffect(() => {
    const fresh = match.log.slice(lastLogged.current);
    lastLogged.current = match.log.length;
    const uid = userIdRef.current;
    for (const e of fresh) {
      if (e.type === "wrong") setFlash({ kind: "wrong", text: `“${e.guess}” isn’t it. −${e.points}`, key: e.at + Math.random() });
      if (e.type === "correct") setFlash({ kind: "right", text: `+${e.points}`, key: e.at + Math.random() });
      if (e.type === "deal" && match.dealt === 1) trackFeatureEvent("clue_game_started", uid, { deck: deck.id, cards: match.deck.length });
      if (e.type === "correct" || e.type === "missed") {
        const wrong = match.log.filter((x) => x.type === "wrong" && x.cardId === e.cardId).length;
        trackFeatureEvent("clue_game_card", uid, {
          deck: deck.id,
          card: e.cardId,
          outcome: e.type === "correct" ? "won" : "missed",
          points: e.type === "correct" ? e.points : 0,
          wrong_guesses: wrong,
        });
      }
      if (e.type === "over") {
        trackFeatureEvent("clue_game_finished", uid, {
          deck: deck.id,
          score: match.scores[ME] ?? 0,
          won: (match.piles[ME] || []).length,
          cards: match.deck.length,
        });
      }
    }
  }, [match]);
  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 2200);
    return () => window.clearTimeout(id);
  }, [flash]);

  // Focus the guess box whenever a new clue comes up.
  const clueKey = match.round ? `${match.round.cardId}:${match.round.clueIndex}` : "";
  useEffect(() => {
    if (match.phase === "clue") inputRef.current?.focus({ preventScroll: true });
  }, [clueKey, match.phase]);

  const card: ClueCard | null = match.round ? cardsById.get(match.round.cardId) ?? null : null;
  const left = msLeft(match, now);
  const seconds = Math.ceil(left / 1000);
  const fraction = match.phase === "clue" ? left / (match.settings.clueSeconds * 1000) : 0;
  const score = match.scores[ME] ?? 0;
  const won = match.piles[ME] || [];
  const remaining = match.deck.length - match.dealt;
  const endsAfterReveal =
    match.phase === "reveal" && (score >= match.settings.targetScore || match.dealt >= match.deck.length);

  const submitGuess = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guess.trim() || !canGuess(match, ME)) return;
    act({ type: "guess", now: Date.now(), playerId: ME, text: guess });
    setGuess("");
  };

  const deal = () => {
    const outcome = match.round?.outcome;
    if (match.phase === "reveal" && outcome) {
      // Slide the card to its pile, then deal the next one.
      setLeaving(outcome.kind === "won" ? "win" : "miss");
      window.setTimeout(() => {
        setLeaving(null);
        setSheet(null);
        act({ type: "deal", now: Date.now() });
      }, 480);
      return;
    }
    act({ type: "deal", now: Date.now() });
  };

  const restart = () => {
    lastLogged.current = 0;
    setMatch(newMatch());
    setGuess("");
    setFlash(null);
  };

  const revealedClues = useMemo(() => {
    if (!card || !match.round) return [];
    const upTo = match.phase === "reveal" ? 4 : match.round.clueIndex;
    return card.clues.slice(0, upTo + 1).map((c, i) => ({ ...c, index: i }));
  }, [card, match.round, match.phase]);

  return (
    <div className="bb-clue-root">
      <style>{CLUE_CSS}</style>

      <div className="mx-auto w-full max-w-[560px] px-4 pb-32 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/bible-study-games" className="bb-clue-chip" aria-label="Back to games">←</Link>
          <div className="min-w-0 text-center">
            <h1 className="text-[19px] font-black leading-tight tracking-tight">Bible Clue Game</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-70">presented by Bible Buddy</p>
          </div>
          <div className="bb-clue-chip" title="Cards left in the deck">🂠 {remaining}</div>
        </div>

        {/* Scores and piles */}
        <div className="bb-clue-scorebar mt-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.12em] opacity-75">Your score</div>
            <div className={`bb-clue-score ${score < 0 ? "is-neg" : ""}`}>{score}</div>
            <div className="text-[11px] font-bold opacity-70">First to {match.settings.targetScore}</div>
          </div>
          <div className="flex gap-2">
            <Pile label="Won" count={won.length} tone="win" />
            <Pile label="Missed" count={match.missed.length} tone="miss" />
          </div>
        </div>

        {/* The table */}
        <div className="bb-clue-felt mt-4">
          {match.phase === "ready" ? (
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="bb-clue-deckstack" aria-hidden="true">
                <span /><span /><span />
              </div>
              <div>
                <p className="text-lg font-black">Genesis deck · {deck.cards.length} cards</p>
                <p className="mx-auto mt-1 max-w-[340px] text-sm font-semibold opacity-80">
                  One card at a time. Five clues, from 5 points down to 1, {match.settings.clueSeconds} seconds each.
                  Guess right to win the points and the card. A wrong guess costs the points it was worth. Waiting is free.
                </p>
              </div>
              <button type="button" onClick={deal} className="bb-clue-btn bb-clue-btn-big">Deal the first card</button>
            </div>
          ) : null}

          {(match.phase === "clue" || match.phase === "reveal") && card && match.round ? (
            <div className="flex flex-col items-center">
              <div
                key={card.id}
                className={`bb-clue-cardwrap ${match.phase === "reveal" ? "is-flipped" : ""} ${leaving === "win" ? "is-leaving-win" : leaving === "miss" ? "is-leaving-miss" : ""}`}
              >
                <div className="bb-clue-cardinner">
                  <CardBack category={card.category} />
                  <div className="bb-clue-cardface bb-clue-front">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.art} alt={card.answer} draggable={false} />
                  </div>
                </div>
              </div>

              {match.phase === "clue" ? (
                <>
                  <div className="mt-4 flex w-full items-center justify-between gap-3">
                    <PointDots clueIndex={match.round.clueIndex} />
                    <span className={`bb-clue-seconds ${seconds <= 3 ? "is-final" : ""}`} aria-live="polite">{seconds}</span>
                  </div>
                  <div className="bb-clue-timer mt-2" aria-hidden="true">
                    <span style={{ transform: `scaleX(${fraction})` }} className={seconds <= 3 ? "is-final" : ""} />
                  </div>

                  <ol className="mt-3 w-full space-y-2">
                    {revealedClues.map((c) => {
                      const current = c.index === match.round!.clueIndex;
                      return (
                        <li key={c.index} className={`bb-clue-clue ${current ? "is-current" : ""}`}>
                          <span className="bb-clue-cluepts">{pointsForClue(c.index)}</span>
                          <span>{c.text}</span>
                        </li>
                      );
                    })}
                  </ol>

                  <form onSubmit={submitGuess} className="mt-4 flex w-full gap-2">
                    <input
                      ref={inputRef}
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      disabled={!canGuess(match, ME)}
                      placeholder={canGuess(match, ME) ? `Who is it? (${pointsForClue(match.round.clueIndex)} points)` : "Waiting for the next clue…"}
                      className="bb-clue-input"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="go"
                      aria-label="Your guess"
                    />
                    <button type="submit" className="bb-clue-btn" disabled={!guess.trim() || !canGuess(match, ME)}>Guess</button>
                  </form>
                  <button
                    type="button"
                    onClick={() => act({ type: "wait", now: Date.now(), playerId: ME })}
                    className="bb-clue-wait mt-2"
                    disabled={match.round.waiting.includes(ME)}
                  >
                    {match.round.clueIndex < 4 ? "Wait for the next clue (free)" : "I don’t know (free)"}
                  </button>
                </>
              ) : null}

              {match.phase === "reveal" ? (
                <div className="mt-4 w-full text-center">
                  <p className="text-[12px] font-black uppercase tracking-[0.14em] opacity-75">
                    {CATEGORY_LABEL[card.category]}
                  </p>
                  <h2 className="text-3xl font-black">{card.answer}</h2>
                  <p className={`mt-1 text-sm font-black ${match.round.outcome?.kind === "won" ? "text-[#bff3c9]" : "text-[#ffd7a8]"}`}>
                    {match.round.outcome?.kind === "won"
                      ? `You got it on the ${pointsForClue(match.round.clueIndex)}-point clue · +${match.round.outcome.points}`
                      : "Nobody got this one. It goes to the missed pile."}
                  </p>
                  <ol className="mt-4 space-y-2 text-left">
                    {card.clues.map((c, i) => (
                      <li key={i} className="bb-clue-clue">
                        <span className="bb-clue-cluepts">{pointsForClue(i)}</span>
                        <span className="min-w-0">
                          {c.text}
                          <button type="button" onClick={() => setSheet(c.ref)} className="bb-clue-ref">
                            {c.ref.label}
                          </button>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <button type="button" onClick={deal} className="bb-clue-btn bb-clue-btn-big mt-5 w-full" disabled={leaving !== null}>
                    {endsAfterReveal ? "See the final score" : "Deal the next card"}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {match.phase === "over" ? (
            <div className="py-4 text-center">
              <p className="text-[12px] font-black uppercase tracking-[0.14em] opacity-75">Game over</p>
              <p className={`bb-clue-score mx-auto ${score < 0 ? "is-neg" : ""}`}>{score}</p>
              <p className="text-sm font-bold opacity-80">
                {score >= match.settings.targetScore
                  ? `You reached ${match.settings.targetScore}!`
                  : `${won.length} of ${match.deck.length} cards won`}
              </p>
              {won.length ? (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {won.map((id) => {
                    const c = cardsById.get(id)!;
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={id} src={c.art} alt={c.answer} className="bb-clue-thumb" />
                    );
                  })}
                </div>
              ) : null}
              <button type="button" onClick={restart} className="bb-clue-btn bb-clue-btn-big mt-5 w-full">Play again</button>
              <p className="mt-3 text-xs font-semibold opacity-70">
                More Genesis cards are on the way: the full deck is 52.
              </p>
            </div>
          ) : null}

          {flash ? (
            <div key={flash.key} className={`bb-clue-flash ${flash.kind === "wrong" ? "is-wrong" : "is-right"}`} role="status">
              {flash.text}
            </div>
          ) : null}
        </div>
      </div>

      {sheet ? <ScriptureSheet target={sheet} onClose={() => setSheet(null)} /> : null}
    </div>
  );
}

const CLUE_CSS = `
.bb-clue-root { min-height: 100%; color: #f2f7ef; background:
  radial-gradient(120% 80% at 50% 0%, #2c6b45 0%, #164a2e 45%, #0b2a1a 100%); }
.bb-clue-root :is(h1, h2, h3, p, li, span, label) { color: inherit; }
.bb-clue-sheet { color:#173b23; }
html[data-bb-cover] .bb-clue-root { background: radial-gradient(120% 80% at 50% 0%, rgba(44,107,69,.94) 0%, rgba(22,74,46,.95) 45%, rgba(11,42,26,.97) 100%); }
.bb-clue-chip { display:inline-flex; align-items:center; justify-content:center; min-width:40px; height:36px; padding:0 10px; border-radius:999px;
  background: rgba(0,0,0,.25); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); font-weight:900; font-size:14px; color:#f2f7ef; }
.bb-clue-scorebar { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 16px; border-radius:20px;
  background: rgba(0,0,0,.22); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); }
.bb-clue-score { font-size:44px; line-height:1; font-weight:900; letter-spacing:-.02em; color:#fff; }
.bb-clue-score.is-neg { color:#ffb4a8; }
.bb-clue-pile { display:flex; align-items:center; gap:10px; padding:8px 12px 8px 8px; border-radius:14px; background: rgba(0,0,0,.2); }
.bb-clue-pile.is-win { box-shadow: inset 0 0 0 1px rgba(191,243,201,.35); }
.bb-clue-pile.is-miss { box-shadow: inset 0 0 0 1px rgba(255,215,168,.25); opacity:.9; }
.bb-clue-pilestack { position:relative; width:26px; height:34px; }
.bb-clue-pilestack span { position:absolute; inset:0; border-radius:4px; background: linear-gradient(160deg,#3d7a50,#173f27); box-shadow: 0 0 0 1px rgba(255,255,255,.25); }
.bb-clue-felt { position:relative; padding:18px 16px 20px; border-radius:28px;
  background: radial-gradient(100% 70% at 50% 20%, #2f7a4c 0%, #1d5a37 55%, #134328 100%);
  box-shadow: inset 0 0 0 6px #5a3d22, inset 0 0 0 8px #3d2714, inset 0 10px 40px rgba(0,0,0,.35), 0 14px 40px rgba(0,0,0,.35); }
.bb-clue-deckstack { position:relative; width:110px; height:154px; }
.bb-clue-deckstack span { position:absolute; inset:0; border-radius:12px; background: linear-gradient(160deg,#3d7a50,#123a23);
  box-shadow: 0 0 0 2px rgba(240,235,200,.5), 0 8px 18px rgba(0,0,0,.35); }
.bb-clue-deckstack span:nth-child(2) { transform: translate(4px,-4px); }
.bb-clue-deckstack span:nth-child(3) { transform: translate(8px,-8px); }
.bb-clue-cardwrap { width: min(62vw, 230px); aspect-ratio: 560/788; perspective: 1200px; animation: bb-clue-deal .5s cubic-bezier(.2,.8,.2,1) both; }
.bb-clue-cardinner { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition: transform .7s cubic-bezier(.3,.7,.2,1); }
.bb-clue-cardwrap.is-flipped .bb-clue-cardinner { transform: rotateY(180deg); }
.bb-clue-cardface { position:absolute; inset:0; border-radius:16px; overflow:hidden; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  box-shadow: 0 0 0 2px rgba(240,235,200,.55), 0 16px 30px rgba(0,0,0,.4); }
.bb-clue-front { transform: rotateY(180deg); background:#0d2a1b; }
.bb-clue-front img { width:100%; height:100%; object-fit:cover; display:block; }
.bb-clue-back { display:flex; flex-direction:column; align-items:center; background: radial-gradient(90% 60% at 50% 45%, #2a6a43, #0f3320 80%); color:#e8f3df; }
.bb-clue-brand { margin-top:14%; font-size:13px; font-weight:800; letter-spacing:.28em; }
.bb-clue-deckpill { margin-top:6px; padding:2px 14px; border-radius:999px; background:#9cc56f; color:#163b20; font-size:11px; font-weight:900; letter-spacing:.22em; }
.bb-clue-sil { width:62%; margin:auto; color: rgba(5,20,12,.72); filter: drop-shadow(0 0 18px rgba(190,240,170,.35)); }
.bb-clue-catband { width:100%; padding:9px 0; text-align:center; background: rgba(4,18,10,.65); font-size:13px; font-weight:800; letter-spacing:.28em; }
.bb-clue-cardwrap.is-leaving-win { animation: bb-clue-to-win .48s ease-in forwards; }
.bb-clue-cardwrap.is-leaving-miss { animation: bb-clue-to-miss .48s ease-in forwards; }
@keyframes bb-clue-deal { from { transform: translate(40%, -60%) rotate(14deg) scale(.6); opacity:0; } to { transform:none; opacity:1; } }
@keyframes bb-clue-to-win { to { transform: translate(38%, -120%) scale(.18) rotate(-8deg); opacity:.2; } }
@keyframes bb-clue-to-miss { to { transform: translate(78%, -120%) scale(.18) rotate(8deg); opacity:.2; } }
.bb-clue-dot { display:inline-grid; place-items:center; width:28px; height:28px; border-radius:999px; font-size:13px; font-weight:900;
  background: rgba(0,0,0,.25); color: rgba(242,247,239,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.15); }
.bb-clue-dot.is-past { opacity:.4; }
.bb-clue-dot.is-now { background:#f4d35e; color:#2a2205; box-shadow: 0 0 0 3px rgba(244,211,94,.3); transform: scale(1.12); }
.bb-clue-seconds { font-size:22px; font-weight:900; min-width:32px; text-align:right; }
.bb-clue-seconds.is-final { color:#ffcf6e; animation: bb-clue-pulse .5s ease-in-out infinite alternate; }
@keyframes bb-clue-pulse { to { transform: scale(1.25); } }
.bb-clue-timer { width:100%; height:8px; border-radius:999px; background: rgba(0,0,0,.3); overflow:hidden; }
.bb-clue-timer span { display:block; height:100%; width:100%; transform-origin:left; background: linear-gradient(90deg,#9cc56f,#d7ef9a); transition: transform .1s linear; }
.bb-clue-timer span.is-final { background: linear-gradient(90deg,#f0a43a,#ffcf6e); }
.bb-clue-clue { display:flex; gap:10px; align-items:flex-start; padding:10px 12px; border-radius:14px; background: rgba(0,0,0,.18);
  font-size:15px; font-weight:600; line-height:1.4; opacity:.7; }
.bb-clue-clue.is-current { opacity:1; background: #f4f1e1; color:#173b23; font-weight:700; box-shadow: 0 6px 18px rgba(0,0,0,.25); animation: bb-clue-in .35s ease-out both; }
.bb-clue-felt .mt-4 .bb-clue-clue { opacity:1; }
@keyframes bb-clue-in { from { transform: translateY(6px); opacity:0; } to { transform:none; opacity:1; } }
.bb-clue-cluepts { flex:none; display:grid; place-items:center; width:24px; height:24px; border-radius:8px; background: rgba(0,0,0,.25); font-size:13px; font-weight:900; }
.bb-clue-clue.is-current .bb-clue-cluepts { background:#173b23; color:#f4f1e1; }
.bb-clue-ref { display:inline-block; margin-left:8px; padding:1px 8px; border-radius:999px; background: rgba(156,197,111,.22); color:#d7ef9a;
  font-size:12px; font-weight:800; text-decoration: underline; text-underline-offset:2px; }
.bb-clue-input { flex:1; min-width:0; height:48px; padding:0 14px; border-radius:14px; background:#f4f1e1; color:#173b23; font-size:16px; font-weight:700;
  border:none; outline:none; box-shadow: inset 0 0 0 2px rgba(23,59,35,.15); }
.bb-clue-input:focus { box-shadow: inset 0 0 0 2px #f4d35e; }
.bb-clue-input:disabled { opacity:.6; }
.bb-clue-btn { display:inline-flex; align-items:center; justify-content:center; height:48px; padding:0 18px; border-radius:14px; background:#f4d35e; color:#2a2205;
  font-size:15px; font-weight:900; box-shadow: 0 3px 0 #b8952a; }
.bb-clue-btn:disabled { opacity:.5; box-shadow:none; }
.bb-clue-btn-big { height:54px; font-size:16px; padding:0 26px; }
.bb-clue-wait { width:100%; height:40px; border-radius:12px; background: rgba(0,0,0,.2); color:#e8f3df; font-size:14px; font-weight:800;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }
.bb-clue-wait:disabled { opacity:.5; }
.bb-clue-flash { position:absolute; left:50%; top:12px; transform:translateX(-50%); padding:8px 14px; border-radius:999px; font-weight:900; font-size:14px;
  white-space:nowrap; animation: bb-clue-flash 2.2s ease both; box-shadow: 0 8px 20px rgba(0,0,0,.3); }
.bb-clue-flash.is-wrong { background:#7a1f15; color:#ffe1db; }
.bb-clue-flash.is-right { background:#f4d35e; color:#2a2205; font-size:20px; }
@keyframes bb-clue-flash { 0% { opacity:0; transform:translate(-50%,6px); } 12% { opacity:1; transform:translate(-50%,0); } 80% { opacity:1; } 100% { opacity:0; } }
.bb-clue-thumb { width:64px; border-radius:8px; box-shadow: 0 0 0 1px rgba(240,235,200,.5); }
.bb-clue-sheetwrap { position:fixed; inset:0; z-index:9999; display:flex; align-items:flex-end; justify-content:center; background: rgba(0,0,0,.5); }
.bb-clue-sheet { width:100%; max-width:560px; padding:18px 18px calc(18px + env(safe-area-inset-bottom)); border-radius:22px 22px 0 0; background:#f4f1e1; color:#173b23; }
.bb-clue-x { width:34px; height:34px; border-radius:999px; background: rgba(23,59,35,.1); font-weight:900; }
.bb-clue-sheet .bb-clue-btn { color:#2a2205; }
@media (prefers-reduced-motion: reduce) { .bb-clue-cardwrap, .bb-clue-cardinner, .bb-clue-clue, .bb-clue-flash { animation:none !important; transition:none !important; } }
`;
