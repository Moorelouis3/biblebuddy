/**
 * The Bible Clue Game's rules, as one pure state machine.
 *
 * Solo play runs it in the browser. Private rooms run this SAME module on the
 * server (app/api/clue-game/rooms): every action carries the time it happened
 * (`now`) and the deal is seeded, so the server is the one clock and the one
 * judge, and every player sees the same timers, guesses, penalties and awards.
 * Nothing in here reads the clock, the network or Math.random.
 *
 * A round (Louis, 2026-11-22, "Version 2"): 10 distinct cards. Each card is
 * dealt face down with its category and a silhouette; clues come one at a time
 * from 5 points down to 1, 12 seconds each. A correct guess wins the current
 * points and the card at once. A wrong guess costs the guessing side the
 * current points, and that player is done for this clue. Waiting is free. If
 * the 1-point clue runs out nobody gets the card. After a short reveal the next
 * card is dealt automatically (no Next button). Highest score after the last
 * card wins.
 */

import { isCorrectGuess } from "./answer";
import type { Clue, ClueCard } from "./types";

export type ClueSettings = {
  /** Seconds each clue stays up before the next one. */
  clueSeconds: number;
  /** Cards per round. */
  roundSize: number;
  /** How long the reveal stays before the next card is dealt. */
  revealSeconds: number;
  /** A side reaching this ends the round early; null = play every card. */
  targetScore: number | null;
  /** Playtest default true: a wrong guess can take a score below zero. */
  allowNegative: boolean;
  /** Playtest default 1: official guesses per player per clue. */
  guessesPerClue: number;
};

/**
 * The playtest defaults (Louis, 2026-11-22). Change them here: negative
 * scores and one guess per player per clue are the two to revisit after
 * playtesting.
 */
export const DEFAULT_CLUE_SETTINGS: ClueSettings = {
  clueSeconds: 12,
  roundSize: 10,
  revealSeconds: 5,
  targetScore: null,
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
  revealedAt: number | null;
};

export type ClueMatch = {
  settings: ClueSettings;
  sides: ClueSide[];
  players: CluePlayer[];
  /** Card ids in deal order: the whole round, fixed at the start. */
  deck: string[];
  /**
   * Which 5-point clue each card uses: 0 = the card's own clues[0], n =
   * altTopClues[n-1]. Fixed at the start, so a challenge replays the exact
   * clues everybody saw.
   */
  topClue: Record<string, number>;
  /** How many cards have been dealt. */
  dealt: number;
  phase: "ready" | "clue" | "reveal" | "over";
  round: ClueRound | null;
  /** A host pause (same-room discussion). Timers stand still while set. */
  pausedAt: number | null;
  scores: Record<string, number>;
  /** Won cards, by side, oldest first. */
  piles: Record<string, string[]>;
  /** Cards nobody guessed. */
  missed: string[];
  winnerSideIds: string[];
  log: ClueEvent[];
};

export const pointsForClue = (clueIndex: number) => 5 - clueIndex;

/**
 * The round's opening (Louis, 2026-11-22): the deck is shuffled, the round's
 * cards are dealt onto the draw pile one by one, then the first card comes
 * off it. Callers deal the first card at now + ROUND_INTRO_MS, so its first
 * clue's clock starts after the show; nobody can guess or wait before then.
 */
export const ROUND_INTRO_MS = 4200;
export const INTRO_SHUFFLE_MS = 1500;
export const INTRO_DEAL_EACH_MS = 220;

/** A seeded random stream (mulberry32). */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A seeded shuffle, so a server and a replay deal the same order. */
export function shuffleCards(ids: string[], seed: number): string[] {
  const rand = seeded(seed);
  const out = ids.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The clue a player sees for this card at this index, honouring the chosen 5-point variant. */
export function clueFor(card: ClueCard, clueIndex: number, topClue = 0): Clue {
  if (clueIndex === 0 && topClue > 0 && card.altTopClues?.[topClue - 1]) return card.altTopClues[topClue - 1];
  return card.clues[clueIndex];
}

export function createMatch(input: {
  /** The playable pool (one deck, or several books). */
  cards: ClueCard[];
  sides: ClueSide[];
  players: CluePlayer[];
  seed: number;
  settings?: Partial<ClueSettings>;
  /** A frozen round (a challenge): exactly these cards, in this order. */
  cardIds?: string[];
  topClue?: Record<string, number>;
}): ClueMatch {
  const settings = { ...DEFAULT_CLUE_SETTINGS, ...(input.settings || {}) };
  const deck = input.cardIds?.length
    ? input.cardIds.slice()
    : shuffleCards(input.cards.map((c) => c.id), input.seed).slice(0, settings.roundSize);
  let topClue = input.topClue;
  if (!topClue) {
    const rand = seeded(input.seed ^ 0x5bd1e995);
    topClue = {};
    for (const id of deck) {
      const card = input.cards.find((c) => c.id === id);
      const options = 1 + (card?.altTopClues?.length ?? 0);
      topClue[id] = options > 1 ? Math.floor(rand() * options) : 0;
    }
  }
  return {
    settings,
    sides: input.sides,
    players: input.players,
    deck,
    topClue,
    dealt: 0,
    phase: "ready",
    round: null,
    pausedAt: null,
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
  | { type: "wait"; now: number; playerId: string }
  | { type: "pause"; now: number }
  | { type: "resume"; now: number };

/** Can this player still make an official guess on the current clue? */
export function canGuess(match: ClueMatch, playerId: string): boolean {
  const r = match.round;
  if (match.phase !== "clue" || !r || r.outcome || match.pausedAt !== null) return false;
  if (!match.players.some((p) => p.id === playerId)) return false;
  return (r.guesses[playerId] || 0) < match.settings.guessesPerClue;
}

/** Milliseconds left on the current clue (0 outside a clue). Frozen while paused. */
export function msLeft(match: ClueMatch, now: number): number {
  const r = match.round;
  if (match.phase !== "clue" || !r) return 0;
  const at = match.pausedAt ?? now;
  return Math.max(0, r.clueStartedAt + match.settings.clueSeconds * 1000 - at);
}

/** Milliseconds until the next card is dealt after a reveal. */
export function msUntilDeal(match: ClueMatch, now: number): number {
  const r = match.round;
  if (match.phase !== "reveal" || !r?.revealedAt) return 0;
  const at = match.pausedAt ?? now;
  return Math.max(0, r.revealedAt + match.settings.revealSeconds * 1000 - at);
}

function leaders(match: ClueMatch): string[] {
  const best = Math.max(...match.sides.map((s) => match.scores[s.id] ?? 0));
  return match.sides.filter((s) => (match.scores[s.id] ?? 0) === best).map((s) => s.id);
}

/** Over when the round's cards are all played, or a side reached a set target. */
export function roundIsDone(match: ClueMatch): boolean {
  const target = match.settings.targetScore;
  const reached = target !== null && match.sides.some((s) => (match.scores[s.id] ?? 0) >= target);
  return reached || match.dealt >= match.deck.length;
}

function finish(match: ClueMatch, now: number): ClueMatch {
  const winnerSideIds = leaders(match);
  return { ...match, phase: "over", winnerSideIds, log: [...match.log, { type: "over", at: now, winnerSideIds }] };
}

function reveal(match: ClueMatch, at: number, outcome: ClueRound["outcome"]): ClueMatch["round"] {
  return { ...match.round!, outcome, revealedAt: at };
}

function nextClueOrMiss(match: ClueMatch, now: number): ClueMatch {
  const r = match.round!;
  if (r.clueIndex >= 4) {
    return {
      ...match,
      phase: "reveal",
      round: reveal(match, now, { kind: "missed" }),
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

function dealNext(match: ClueMatch, now: number): ClueMatch {
  if (roundIsDone(match)) return finish(match, now);
  const cardId = match.deck[match.dealt];
  return {
    ...match,
    dealt: match.dealt + 1,
    phase: "clue",
    round: { cardId, clueIndex: 0, clueStartedAt: now, guesses: {}, waiting: [], outcome: null, revealedAt: null },
    log: [...match.log, { type: "deal", at: now, cardId }, { type: "clue", at: now, cardId, clueIndex: 0 }],
  };
}

export function reduceClueMatch(match: ClueMatch, action: ClueAction, cards: Map<string, ClueCard>): ClueMatch {
  if (match.phase === "over") return match;
  switch (action.type) {
    case "pause": {
      if (match.pausedAt !== null || match.phase === "ready") return match;
      return { ...match, pausedAt: action.now };
    }
    case "resume": {
      if (match.pausedAt === null) return match;
      const shift = action.now - match.pausedAt;
      const r = match.round;
      return {
        ...match,
        pausedAt: null,
        round: r ? { ...r, clueStartedAt: r.clueStartedAt + shift, revealedAt: r.revealedAt === null ? null : r.revealedAt + shift } : r,
      };
    }
    case "deal": {
      // The first deal starts the round; after that, dealing is automatic
      // (tick) but an early deal from the reveal is allowed (solo "skip").
      if (match.phase === "ready" || match.phase === "reveal") return dealNext(match, action.now);
      return match;
    }
    case "tick": {
      if (match.pausedAt !== null) return match;
      let m = match;
      // A late tick can owe several steps (a backgrounded tab): catch up, each
      // step at the moment it was due, so the shared timeline stays exact.
      for (let guard = 0; guard < 20; guard += 1) {
        if (m.phase === "clue" && m.round && action.now >= m.round.clueStartedAt + m.settings.clueSeconds * 1000) {
          m = nextClueOrMiss(m, m.round.clueStartedAt + m.settings.clueSeconds * 1000);
          continue;
        }
        if (m.phase === "reveal" && m.round?.revealedAt && action.now >= m.round.revealedAt + m.settings.revealSeconds * 1000) {
          m = dealNext(m, m.round.revealedAt + m.settings.revealSeconds * 1000);
          continue;
        }
        break;
      }
      return m;
    }
    case "wait": {
      if (match.phase !== "clue" || !match.round || match.pausedAt !== null) return match;
      const r = match.round;
      if (action.now < r.clueStartedAt) return match; // still dealing
      if (r.waiting.includes(action.playerId) || !match.players.some((p) => p.id === action.playerId)) return match;
      const m = { ...match, round: { ...r, waiting: [...r.waiting, action.playerId] } };
      // Everyone is waiting or out of guesses: no reason to sit out the timer.
      return everyoneDone(m) ? nextClueOrMiss(m, action.now) : m;
    }
    case "guess": {
      if (!canGuess(match, action.playerId) || !match.round) return match;
      if (action.now < match.round.clueStartedAt) return match; // still dealing
      // The clock is the judge: a guess that arrives after its clue ran out
      // belongs to no clue.
      if (action.now >= match.round.clueStartedAt + match.settings.clueSeconds * 1000) return match;
      const text = action.text.trim().slice(0, 80);
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
          round: { ...r, guesses, outcome: { kind: "won", sideId: player.sideId, playerId: player.id, points, guess: text }, revealedAt: action.now },
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
export function soloSetup(id = "me", name = "You") {
  return {
    sides: [{ id, name }],
    players: [{ id, name, sideId: id }],
  };
}

/* ---------- what a player's device is allowed to see ---------- */

export type PublicCard = {
  id: string;
  category: ClueCard["category"];
  mystery?: string;
  /** Present only once revealed. */
  answer?: string;
  reveal?: string;
  clues?: Clue[];
  teaching?: string;
  study?: ClueCard["study"];
};

export type PublicMatch = Omit<ClueMatch, "deck" | "topClue" | "log" | "round"> & {
  deckSize: number;
  round: null | (Omit<ClueRound, "cardId"> & {
    card: PublicCard;
    /** Only the clues shown so far, text only until the reveal (no references: they give it away). */
    shownClues: string[];
  });
  /** Cards already revealed this round, in order, for Review Cards. */
  history: Array<PublicCard & { outcome: "won" | "missed"; sideId?: string; points?: number }>;
  /** Server clock at the time of this view, for a client clock offset. */
  serverNow: number;
  /** The last wrong guesses, for the "not it" feedback (no answers in them). */
  recentWrong: Array<{ at: number; playerId: string; guess: string; points: number }>;
};

function fullPublicCard(card: ClueCard, topClue: number): PublicCard {
  return {
    id: card.id,
    category: card.category,
    mystery: card.art.mystery,
    answer: card.answer,
    reveal: card.art.reveal,
    clues: card.clues.map((_, i) => clueFor(card, i, topClue)),
    teaching: card.teaching,
    study: card.study,
  };
}

/**
 * The match as a player may see it: the current card's answer, art,
 * references and later clues are left out until it is revealed. The server
 * sends only this; the full match never leaves it.
 */
export function publicView(match: ClueMatch, cards: Map<string, ClueCard>, now: number): PublicMatch {
  const { deck, topClue, log, round, ...rest } = match;
  let publicRound: PublicMatch["round"] = null;
  if (round) {
    const card = cards.get(round.cardId)!;
    const revealed = match.phase === "reveal" || match.phase === "over";
    const { cardId: _cardId, ...roundRest } = round;
    void _cardId;
    publicRound = {
      ...roundRest,
      card: revealed ? fullPublicCard(card, topClue[card.id] ?? 0) : { id: `hidden-${match.dealt}`, category: card.category, mystery: card.art.mystery },
      shownClues: card.clues.slice(0, revealed ? 5 : round.clueIndex + 1).map((_, i) => clueFor(card, i, topClue[card.id] ?? 0).text),
    };
  }
  const history: PublicMatch["history"] = [];
  for (const e of log) {
    if (e.type !== "correct" && e.type !== "missed") continue;
    // The current card joins the history once revealed.
    const card = cards.get(e.cardId);
    if (!card) continue;
    history.push({
      ...fullPublicCard(card, topClue[card.id] ?? 0),
      outcome: e.type === "correct" ? "won" : "missed",
      sideId: e.type === "correct" ? e.sideId : undefined,
      points: e.type === "correct" ? e.points : undefined,
    });
  }
  const recentWrong = log
    .filter((e): e is Extract<ClueEvent, { type: "wrong" }> => e.type === "wrong")
    .slice(-6)
    .map((e) => ({ at: e.at, playerId: e.playerId, guess: e.guess, points: e.points }));
  return { ...rest, deckSize: deck.length, round: publicRound, history, serverNow: now, recentWrong };
}
