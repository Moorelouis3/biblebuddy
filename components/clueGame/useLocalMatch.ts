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
import { ALL_CLUE_CARDS } from "@/lib/clueGame/catalog";
import { publicView, reduceClueMatch, type ClueAction, type ClueMatch } from "@/lib/clueGame/engine";
import { trackClue } from "@/lib/clueGame/track";

export function useLocalMatch(initial: () => ClueMatch, opts: { persistKey?: string; mode: "solo" | "challenge"; deckIds: string[] }) {
  const [match, setMatch] = useState<ClueMatch>(() => {
    if (opts.persistKey && typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(opts.persistKey);
        if (saved) {
          const m = JSON.parse(saved) as ClueMatch;
          if (m && m.phase !== "over") return reduceClueMatch(m, { type: "resume", now: Date.now() }, ALL_CLUE_CARDS);
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

  const act = useCallback((action: Omit<ClueAction, "now"> & { now?: number }) => {
    setMatch((m) => reduceClueMatch(m, { ...action, now: action.now ?? Date.now() } as ClueAction, ALL_CLUE_CARDS));
  }, []);

  // The clock.
  useEffect(() => {
    if (match.phase === "over" || match.phase === "ready") return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setMatch((m) => reduceClueMatch(m, { type: "tick", now: t }, ALL_CLUE_CARDS));
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
      const paused = reduceClueMatch(latest.current, { type: "pause", now: Date.now() }, ALL_CLUE_CARDS);
      try {
        if (paused.phase !== "over" && paused.phase !== "ready") window.localStorage.setItem(key, JSON.stringify(paused));
      } catch {}
      latest.current = paused;
      setMatch(paused);
    };
    const onShow = () => setMatch((m) => reduceClueMatch(m, { type: "resume", now: Date.now() }, ALL_CLUE_CARDS));
    const onVis = () => (document.visibilityState === "hidden" ? onHide() : onShow());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [opts.persistKey]);

  // Measurement: a started round, each card's outcome, the finished round.
  const logged = useRef(0);
  useEffect(() => {
    const fresh = match.log.slice(logged.current);
    logged.current = match.log.length;
    for (const e of fresh) {
      if (e.type === "deal" && match.dealt === 1) trackClue("clue_game_started", { mode: opts.mode, decks: opts.deckIds, cards: match.deck.length });
      if (e.type === "correct" || e.type === "missed") {
        trackClue("clue_game_card", {
          mode: opts.mode,
          card: e.cardId,
          outcome: e.type === "correct" ? "won" : "missed",
          points: e.type === "correct" ? e.points : 0,
          wrong_guesses: match.log.filter((x) => x.type === "wrong" && x.cardId === e.cardId).length,
        });
      }
      if (e.type === "over") {
        const side = match.sides[0]?.id;
        trackClue("clue_game_finished", { mode: opts.mode, decks: opts.deckIds, score: match.scores[side] ?? 0, won: (match.piles[side] || []).length, cards: match.deck.length });
      }
    }
  }, [match, opts.mode, opts.deckIds]);

  const view = useMemo(() => publicView(match, ALL_CLUE_CARDS, now), [match, now]);
  const reset = useCallback((next: ClueMatch) => {
    logged.current = 0;
    setMatch(next);
  }, []);
  return { match, view, now, act, reset };
}
