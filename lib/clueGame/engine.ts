/**
 * The Bible Clue Game's rules, as one pure state machine.
 *
 * Solo play runs it in the browser. Invite rooms, online matchmaking and
 * team matches must run this SAME module on the server: every action carries
 * the time it happened (`now`) and the shuffle is seeded, so given the same
 * actions in the same order every player sees the same timers, guesses,
 * penalties and card awards. Nothing in here reads the clock, the network or
 * Math.random.
 *
 * A round: a card is dealt; its category and a silhouette show; clues are
 * revealed one at a time from 5 points down to 1, each for `clueSeconds`. A
 * correct guess wins the current points and the card. A wrong guess costs the
 * guessing side the current points, and that player is done for this clue.
 * Waiting is free. If the 1-point clue runs out, nobody gets the card.
 * The match ends when the deck runs out or a side reaches `targetScore`.
 */

import { isCorrectGuess } from "./answer";
import type { ClueCard } from "./types";

export type ClueSettings = {
  /** Seconds each clue stays up before the next one. */
  clueSeconds: number;
  /** First side to reach this wins. 21 for the full 52-card deck. */
  targetScore: number;
  /** Playtest default true: a wrong guess can take a score below zero. */
  allowNegative: boolean;
  /** Playtest default 1: official guesses per player per clue. */
  guessesPerClue: number;
};

/**
 * The playtest defaults (Louis, 2026-11-22). Change them here: negative
 * scores and one guess per player per clue are the two meant to be revisited
 * after playtesting.
 */
export const DEFAULT_CLUE_SETTINGS: ClueSettings = {
  clueSeconds: 10,
  targetScore: 21,
  allowNegative: true,
  guessesPerClue: 1,
};

/** A player or a team. Points and won cards belong to the side. */
export type ClueSide = { id: string; name: string };
export type CluePlayer = { id: string; name: string; sideId: string };

export type ClueEvent =
  | { type: "deal"; at: number; cardId: string }
  | { type: "clue"; at: number; cardId: string; clueIndex: number }
  | { type: "wrong"; at: number; cardId: string; clueIndex: number; playerId: string; sideId: string; guess: string; points: number }
  | { type: "correct"; at: number; cardId: string; clueIndex: number; playerId: string; sideId: string; guess: string; points: number }
  | { type: "missed"; at: number; cardId: string }
  | { type: "over"; at: number; winnerSideIds: string[] };

export type ClueRound = {
  cardId: string;
  /** 0 is the 5-point clue, 4 the 1-point clue. */
  clueIndex: number;
  clueStartedAt: number;
  /** Official guesses this clue, by player. */
  guesses: Record<string, number>;
  /** Players who chose to wait for the next clue. */
  waiting: string[];
  outcome: null | { kind: "won"; sideId: string; playerId: string; points: number; guess: string } | { kind: "missed" };
};

export type ClueMatch = {
  settings: ClueSettings;
  sides: ClueSide[];
  players: CluePlayer[];
  /** Card ids in deal order. */
  deck: string[];
  /** How many cards have been dealt. */
  dealt: number;
  phase: "ready" | "clue" | "reveal" | "over";
  round: ClueRound | null;
  scores: Record<string, number>;
  /** Won cards, by side, oldest first. */
  piles: Record<string, string[]>;
  /** Cards nobody guessed. */
  missed: string[];
  winnerSideIds: string[];
  log: ClueEvent[];
};

export const pointsForClue = (clueIndex: number) => 5 - clueIndex;

/** A seeded shuffle (mulberry32), so a server and a replay deal the same order. */
export function shuffleCards(ids: string[], seed: number): string[] {
  let a = seed >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = ids.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function createMatch(input: {
  cards: ClueCard[];
  sides: ClueSide[];
  players: CluePlayer[];
  seed: number;
  settings?: Partial<ClueSettings>;
}): ClueMatch {
  const settings = { ...DEFAULT_CLUE_SETTINGS, ...(input.settings || {}) };
  return {
    settings,
    sides: input.sides,
    players: input.players,
    deck: shuffleCards(input.cards.map((c) => c.id), input.seed),
    dealt: 0,
    phase: "ready",
    round: null,
    scores: Object.fromEntries(input.sides.map((s) => [s.id, 0])),
    piles: Object.fromEntries(input.sides.map((s) => [s.id, [] as string[]])),
    missed: [],
    winnerSideIds: [],
    log: [],
  };
}

export type ClueAction =
  | { type: "deal"; now: number }
  | { type: "tick"; now: number }
  | { type: "guess"; now: number; playerId: string; text: string }
  | { type: "wait"; now: number; playerId: string };

/** Can this player still make an official guess on the current clue? */
export function canGuess(match: ClueMatch, playerId: string): boolean {
  const r = match.round;
  if (match.phase !== "clue" || !r || r.outcome) return false;
  if (!match.players.some((p) => p.id === playerId)) return false;
  return (r.guesses[playerId] || 0) < match.settings.guessesPerClue;
}

/** Milliseconds left on the current clue (0 outside a clue). */
export function msLeft(match: ClueMatch, now: number): number {
  const r = match.round;
  if (match.phase !== "clue" || !r) return 0;
  return Math.max(0, r.clueStartedAt + match.settings.clueSeconds * 1000 - now);
}

function leaders(match: ClueMatch): string[] {
  const best = Math.max(...match.sides.map((s) => match.scores[s.id] ?? 0));
  return match.sides.filter((s) => (match.scores[s.id] ?? 0) === best).map((s) => s.id);
}

function endIfDone(match: ClueMatch, now: number): ClueMatch {
  const reached = match.sides.filter((s) => (match.scores[s.id] ?? 0) >= match.settings.targetScore).map((s) => s.id);
  if (reached.length === 0 && match.dealt < match.deck.length) return match;
  // Target reached, or the deck ran out: the highest score wins (ties share it).
  const winnerSideIds = leaders(match);
  return { ...match, phase: "over", winnerSideIds, log: [...match.log, { type: "over", at: now, winnerSideIds }] };
}

function nextClueOrMiss(match: ClueMatch, now: number): ClueMatch {
  const r = match.round!;
  if (r.clueIndex >= 4) {
    return {
      ...match,
      phase: "reveal",
      round: { ...r, outcome: { kind: "missed" } },
      missed: [...match.missed, r.cardId],
      log: [...match.log, { type: "missed", at: now, cardId: r.cardId }],
    };
  }
  const clueIndex = r.clueIndex + 1;
  return {
    ...match,
    round: { ...r, clueIndex, clueStartedAt: now, guesses: {}, waiting: [] },
    log: [...match.log, { type: "clue", at: now, cardId: r.cardId, clueIndex }],
  };
}

/** True when nobody left on this clue can still guess or is still thinking. */
function everyoneDone(match: ClueMatch): boolean {
  const r = match.round!;
  return match.players.every((p) => r.waiting.includes(p.id) || (r.guesses[p.id] || 0) >= match.settings.guessesPerClue);
}

export function reduceClueMatch(match: ClueMatch, action: ClueAction, cards: Map<string, ClueCard>): ClueMatch {
  switch (action.type) {
    case "deal": {
      if (match.phase !== "ready" && match.phase !== "reveal") return match;
      if (match.phase === "reveal") {
        const done = endIfDone(match, action.now);
        if (done.phase === "over") return done;
      }
      if (match.dealt >= match.deck.length) return endIfDone(match, action.now);
      const cardId = match.deck[match.dealt];
      return {
        ...match,
        dealt: match.dealt + 1,
        phase: "clue",
        round: { cardId, clueIndex: 0, clueStartedAt: action.now, guesses: {}, waiting: [], outcome: null },
        log: [...match.log, { type: "deal", at: action.now, cardId }, { type: "clue", at: action.now, cardId, clueIndex: 0 }],
      };
    }
    case "tick": {
      if (match.phase !== "clue" || !match.round) return match;
      // A late tick can owe more than one clue (a backgrounded tab): catch up.
      let m = match;
      while (m.phase === "clue" && m.round && action.now >= m.round.clueStartedAt + m.settings.clueSeconds * 1000) {
        m = nextClueOrMiss(m, m.round.clueStartedAt + m.settings.clueSeconds * 1000);
      }
      return m;
    }
    case "wait": {
      if (match.phase !== "clue" || !match.round) return match;
      const r = match.round;
      if (r.waiting.includes(action.playerId) || !match.players.some((p) => p.id === action.playerId)) return match;
      const m = { ...match, round: { ...r, waiting: [...r.waiting, action.playerId] } };
      // Everyone is waiting or out of guesses: no reason to sit out the timer.
      return everyoneDone(m) ? nextClueOrMiss(m, action.now) : m;
    }
    case "guess": {
      if (!canGuess(match, action.playerId) || !match.round) return match;
      const text = action.text.trim();
      if (!text) return match;
      const player = match.players.find((p) => p.id === action.playerId)!;
      const r = match.round;
      const card = cards.get(r.cardId);
      if (!card) return match;
      const points = pointsForClue(r.clueIndex);
      const guesses = { ...r.guesses, [player.id]: (r.guesses[player.id] || 0) + 1 };
      if (isCorrectGuess(card, text)) {
        return {
          ...match,
          phase: "reveal",
          round: { ...r, guesses, outcome: { kind: "won", sideId: player.sideId, playerId: player.id, points, guess: text } },
          scores: { ...match.scores, [player.sideId]: (match.scores[player.sideId] ?? 0) + points },
          piles: { ...match.piles, [player.sideId]: [...(match.piles[player.sideId] || []), r.cardId] },
          log: [...match.log, { type: "correct", at: action.now, cardId: r.cardId, clueIndex: r.clueIndex, playerId: player.id, sideId: player.sideId, guess: text, points }],
        };
      }
      const before = match.scores[player.sideId] ?? 0;
      const after = match.settings.allowNegative ? before - points : Math.max(0, before - points);
      const m: ClueMatch = {
        ...match,
        round: { ...r, guesses },
        scores: { ...match.scores, [player.sideId]: after },
        log: [...match.log, { type: "wrong", at: action.now, cardId: r.cardId, clueIndex: r.clueIndex, playerId: player.id, sideId: player.sideId, guess: text, points }],
      };
      return everyoneDone(m) ? nextClueOrMiss(m, action.now) : m;
    }
  }
}

/** One player on one side: the solo table. */
export function soloSetup(name = "You") {
  return {
    sides: [{ id: "me", name }],
    players: [{ id: "me", name, sideId: "me" }],
  };
}
