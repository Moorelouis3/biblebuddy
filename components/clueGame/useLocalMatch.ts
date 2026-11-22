"use client";

/**
 * A Bible Clue Game round run on the device: solo play and Feed challenges.
 * It feeds lib/clueGame/engine.ts the same actions a room's server does and
 * draws it through publicView, so the table cannot tell the difference.
 *
 * `persistKey` keeps an unfinished round (a challenge attempt) across a
 * reload: it is saved paused, and resumes where it stopped.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CLUE_BANK } from "@/lib/clueGame/bank";
import { publicView, reduceClueMatch, type ClueAction, type ClueMatch } from "@/lib/clueGame/engine";
import { trackClue } from "@/lib/clueGame/track";

/** An action without its time: the hook stamps it. */
type ClueActionInput = ClueAction extends infer A ? (A extends ClueAction ? Omit<A, "now"> & { now?: number } : never) : never;

export function useLocalMatch(initial: () => ClueMatch, opts: { persistKey?: string; mode: "solo" | "challenge"; deckIds: string[] }) {
  const [match, setMatch] = useState<ClueMatch>(() => {
    if (opts.persistKey && typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(opts.persistKey);
        if (saved) {
          const m = JSON.parse(saved) as ClueMatch;
          // Only a saved game from this version (the five-clue version had no `done`).
          if (m && m.phase !== "over" && Array.isArray(m.done)) return reduceClueMatch(m, { type: "resume", now: Date.now() }, CLUE_BANK);
        }
      } catch {}
    }
    return initial();
  });
  const [now, setNow] = useState(() => Date.now());
  // The latest match, readable synchronously when the page is closing.
  const latest = useRef(match);
  useEffect(() => {
    latest.current = match;
  }, [match]);

  // Omit applied to each kind of action, so an answer keeps its playerId and choice.
  const act = useCallback((action: ClueActionInput) => {
    setMatch((m) => reduceClueMatch(m, { ...action, now: action.now ?? Date.now() } as ClueAction, CLUE_BANK));
  }, []);

  // The clock.
  useEffect(() => {
    if (match.phase === "over" || match.phase === "ready") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setMatch((m) => reduceClueMatch(m, { type: "tick", now: t }, CLUE_BANK));
    }, 150);
    return () => window.clearInterval(id);
  }, [match.phase]);

  // Keep an unfinished challenge attempt; pause it when the page goes away.
  useEffect(() => {
    if (!opts.persistKey) return;
    try {
      if (match.phase === "over") window.localStorage.removeItem(opts.persistKey);
      else if (match.phase !== "ready") window.localStorage.setItem(opts.persistKey, JSON.stringify(match));
    } catch {}
  }, [match, opts.persistKey]);
  useEffect(() => {
    if (!opts.persistKey) return;
    const key = opts.persistKey;
    const onHide = () => {
      // Written straight away: a page that is closing may never run another render.
      const paused = reduceClueMatch(latest.current, { type: "pause", now: Date.now() }, CLUE_BANK);
      try {
        if (paused.phase !== "over" && paused.phase !== "ready") window.localStorage.setItem(key, JSON.stringify(paused));
      } catch {}
      latest.current = paused;
      setMatch(paused);
    };
    const onShow = () => setMatch((m) => reduceClueMatch(m, { type: "resume", now: Date.now() }, CLUE_BANK));
    const onVis = () => (document.visibilityState === "hidden" ? onHide() : onShow());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [opts.persistKey]);

  // Measurement: a started match, each card's outcome, the finished match.
  const logged = useRef({ started: false, done: 0, over: false });
  useEffect(() => {
    const l = logged.current;
    if (!l.started && match.phase !== "ready") {
      l.started = true;
      trackClue("clue_game_started", { mode: opts.mode, decks: opts.deckIds, cards: match.deck.length });
    }
    for (const d of match.done.slice(l.done)) {
      const a = d.answers.me;
      const pts = d.points.me ?? 0;
      trackClue("clue_game_card", { mode: opts.mode, card: d.cardId, outcome: pts > 0 ? "won" : a ? "wrong" : "skipped", points: pts, tiebreak: d.tiebreak });
    }
    l.done = match.done.length;
    if (!l.over && match.phase === "over") {
      l.over = true;
      const side = match.sides[0]?.id;
      const right = match.done.filter((d) => !d.tiebreak && (d.points[side] ?? 0) > 0).length;
      trackClue("clue_game_finished", { mode: opts.mode, decks: opts.deckIds, score: match.scores[side] ?? 0, won: right, cards: match.deck.length });
    }
  }, [match, opts.mode, opts.deckIds]);

  const view = useMemo(() => publicView(match, CLUE_BANK, now, "me"), [match, now]);
  const reset = useCallback((next: ClueMatch) => {
    logged.current = { started: false, done: 0, over: false };
    setMatch(next);
  }, []);
  return { match, view, now, act, reset };
}
