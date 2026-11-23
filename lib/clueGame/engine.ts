/**
 * The Bible Clue Game's rules, as one pure state machine.
 *
 * Solo play runs it in the browser. Private rooms run this SAME module on the
 * server (app/api/clue-game/rooms): every action carries the time it happened
 * (`now`) and the deal is seeded, so the server is the one clock and the one
 * judge. Nothing in here reads the clock, the network or Math.random.
 *
 * How it plays (Louis, 2026-11-22, after playing it with Jessica: the five
 * moving clues were too fast to follow and she quit):
 *  - Setup picks a book, all or some chapters, and Beginner or Medium. A match
 *    draws 10 distinct questions from that selection only (lib/clueGame/bank),
 *    spread across the chosen chapters, avoiding ones the players just saw.
 *  - Each round deals a mystery card with ONE short question and four choices
 *    A-D. A single 10-second countdown runs its full time, even when everyone
 *    has answered.
 *  - Each player may lock in one answer, private until the reveal, or let the
 *    time run out. At zero: the FIRST right answer gets +1 (one scorer per
 *    question, 2026-11-23), later right answers 0, wrong -1, no answer 0.
 *  - The reveal shows the answer, a short explanation and the verse, then the
 *    next countdown starts by itself.
 *  - After ten rounds the highest score wins. Tied leaders, and only they,
 *    play a tiebreaker from unused questions of the same selection: one
 *    attempt each, the first right answer received wins at once; if nobody
 *    gets it, a fresh question. If the selection runs out: a shared win.
 */

import type { ClueCategory, ClueLevel, ClueRef } from "./types";

/** A playable question with its art resolved (lib/clueGame/bank builds these). */
export type BankItem = {
  id: string;
  book: string;
  chapter: number;
  level: ClueLevel;
  category: ClueCategory;
  question: string;
  choices: [string, string, string, string];
  answer: number;
  explanation: string;
  ref: ClueRef;
  /** The right answer as text. */
  answerText: string;
  /** Card art when the answer is one of the deck's cards. */
  mystery?: string;
  reveal?: string;
  teaching?: string;
  study?: { label: string; href: string };
};

export type ClueSelection = { book: string; chapters: number[] | "all"; level: ClueLevel };

export type ClueSettings = {
  /** Seconds a question stays open. */
  answerSeconds: number;
  /** Seconds the reveal stays before the next question. */
  revealSeconds: number;
  /** Questions (rounds) per match. */
  roundSize: number;
  pointsRight: number;
  pointsWrong: number;
};

export const DEFAULT_CLUE_SETTINGS: ClueSettings = {
  answerSeconds: 10,
  revealSeconds: 7,
  roundSize: 10,
  pointsRight: 1,
  pointsWrong: -1,
};

/** A player (rooms are one player per side; sides stay for the shared types). */
export type ClueSide = { id: string; name: string };
export type CluePlayer = { id: string; name: string; sideId: string };

/**
 * The match's opening: the deck is shuffled and dealt onto the pile while the
 * instruction is on screen. The first question opens after it.
 */
export const ROUND_INTRO_MS = 6500;
export const INTRO_SHUFFLE_MS = 1500;
export const INTRO_DEAL_EACH_MS = 220;

export type ClueAnswer = { choice: number; at: number };

export type ClueRound = {
  /** The question's id. */
  cardId: string;
  /** Display order of the four choices: order[i] is the question's choice index shown as letter i. */
  order: [number, number, number, number];
  openAt: number;
  closesAt: number;
  /** Locked answers by player (choice = display index 0-3). */
  answers: Record<string, ClueAnswer>;
  tiebreak: boolean;
  revealedAt: number | null;
  /** Points each player got for this question (regular rounds). */
  points: Record<string, number>;
  /** Tiebreak only: who answered right first. */
  winnerId: string | null;
};

export type ClueMatch = {
  settings: ClueSettings;
  selection: ClueSelection;
  sides: ClueSide[];
  players: CluePlayer[];
  /** The ten question ids in deal order, fixed at the start. */
  deck: string[];
  /** Unused questions from the same selection, for tiebreaks, in order. */
  spare: string[];
  seed: number;
  dealt: number;
  phase: "ready" | "question" | "reveal" | "over";
  round: ClueRound | null;
  /** Rounds already revealed, oldest first. */
  done: ClueRound[];
  /** Solo / host pause: timers stand still while set. */
  pausedAt: number | null;
  scores: Record<string, number>;
  /** Tied leaders playing the tiebreaker (empty outside it). */
  tiebreakers: string[];
  winnerSideIds: string[];
};

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
export function shuffleCards<T>(ids: T[], seed: number): T[] {
  const rand = seeded(seed);
  const out = ids.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The choice order for a question in this match: shuffled, the same for every player. */
function choiceOrder(seed: number, id: string, salt: number): [number, number, number, number] {
  let h = (seed ^ salt) >>> 0;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 0x01000193) >>> 0;
  return shuffleCards([0, 1, 2, 3], h) as [number, number, number, number];
}

/** The questions a selection may use. */
export function poolForSelection(items: BankItem[], sel: ClueSelection): BankItem[] {
  return items.filter(
    (q) => q.book === sel.book && q.level === sel.level && (sel.chapters === "all" || sel.chapters.includes(q.chapter)),
  );
}

/** A match needs 10 questions plus at least one fresh one for a tiebreak. */
export const neededForMatch = (settings: ClueSettings = DEFAULT_CLUE_SETTINGS) => settings.roundSize + 1;

/**
 * Pick the match's questions: spread across the chosen chapters (round-robin
 * over shuffled chapters), never the same question twice, and questions in
 * `avoid` (seen in the last match) only when the pool needs them.
 */
export function drawQuestions(pool: BankItem[], seed: number, count: number, avoid: string[] = []): { deck: string[]; spare: string[] } {
  const avoidSet = new Set(avoid);
  const shuffled = shuffleCards(pool, seed);
  // Fresh questions first, then the ones seen last time.
  const ordered = [...shuffled.filter((q) => !avoidSet.has(q.id)), ...shuffled.filter((q) => avoidSet.has(q.id))];
  const byChapter = new Map<number, BankItem[]>();
  for (const q of ordered) byChapter.set(q.chapter, [...(byChapter.get(q.chapter) || []), q]);
  const chapters = shuffleCards([...byChapter.keys()], seed ^ 0x9e3779b9);
  const deck: string[] = [];
  // Round-robin, taking fresh questions before seen ones across all chapters.
  for (const pass of [false, true]) {
    let added = true;
    while (deck.length < count && added) {
      added = false;
      for (const ch of chapters) {
        if (deck.length >= count) break;
        const next = (byChapter.get(ch) || []).find((q) => !deck.includes(q.id) && avoidSet.has(q.id) === pass);
        if (next) {
          deck.push(next.id);
          added = true;
        }
      }
    }
  }
  const spare = ordered.map((q) => q.id).filter((id) => !deck.includes(id));
  return { deck, spare };
}

export function createMatch(input: {
  /** The whole bank (or just the selection's pool). */
  items: BankItem[];
  selection: ClueSelection;
  sides: ClueSide[];
  players: CluePlayer[];
  seed: number;
  settings?: Partial<ClueSettings>;
  /** A frozen match (a challenge): exactly these questions, in this order. */
  cardIds?: string[];
  /** Questions seen in the last match: used only if the pool needs them. */
  avoid?: string[];
}): ClueMatch {
  const settings = { ...DEFAULT_CLUE_SETTINGS, ...(input.settings || {}) };
  const pool = poolForSelection(input.items, input.selection);
  let deck: string[];
  let spare: string[];
  if (input.cardIds?.length) {
    deck = input.cardIds.slice();
    spare = shuffleCards(pool.map((q) => q.id), input.seed).filter((id) => !deck.includes(id));
  } else {
    ({ deck, spare } = drawQuestions(pool, input.seed, settings.roundSize, input.avoid));
  }
  // A small selection (one chapter with 5 questions) plays as many as it has
  // (2026-11-23); a tie with no question left is a shared win (advance()).
  settings.roundSize = deck.length;
  return {
    settings,
    selection: input.selection,
    sides: input.sides,
    players: input.players,
    deck,
    spare,
    seed: input.seed,
    dealt: 0,
    phase: "ready",
    round: null,
    done: [],
    pausedAt: null,
    scores: Object.fromEntries(input.sides.map((s) => [s.id, 0])),
    tiebreakers: [],
    winnerSideIds: [],
  };
}

export type ClueAction =
  | { type: "deal"; now: number }
  | { type: "tick"; now: number }
  | { type: "answer"; now: number; playerId: string; choice: number }
  | { type: "pause"; now: number }
  | { type: "resume"; now: number };

export type ClueBank = Map<string, BankItem>;

function openRound(match: ClueMatch, id: string, openAt: number, tiebreak: boolean): ClueRound {
  return {
    cardId: id,
    order: choiceOrder(match.seed, id, tiebreak ? 0x7f4a7c15 : 0x2545f491),
    openAt,
    closesAt: openAt + match.settings.answerSeconds * 1000,
    answers: {},
    tiebreak,
    revealedAt: null,
    points: {},
    winnerId: null,
  };
}

/** Is this display choice the right one? */
export function isRightChoice(item: BankItem, round: Pick<ClueRound, "order">, choice: number): boolean {
  return round.order[choice] === item.answer;
}

/** Can this player answer the open question right now? */
export function canAnswer(match: ClueMatch, playerId: string, now: number): boolean {
  const r = match.round;
  if (match.phase !== "question" || !r || match.pausedAt !== null) return false;
  if (now < r.openAt || now >= r.closesAt) return false; // not open yet, or closed (late)
  if (r.answers[playerId]) return false; // one answer per question
  if (!match.players.some((p) => p.id === playerId)) return false;
  if (r.tiebreak && !match.tiebreakers.includes(playerId)) return false;
  return true;
}

function leaders(match: ClueMatch): string[] {
  const best = Math.max(...match.sides.map((s) => match.scores[s.id] ?? 0));
  return match.sides.filter((s) => (match.scores[s.id] ?? 0) === best).map((s) => s.id);
}

/** Close the open question: score it (regular rounds) and show the reveal. */
function close(match: ClueMatch, at: number, bank: ClueBank): ClueMatch {
  const r = match.round!;
  const item = bank.get(r.cardId);
  const points: Record<string, number> = {};
  const scores = { ...match.scores };
  if (!r.tiebreak && item) {
    // One point per question: only the FIRST right answer received scores
    // (Louis, 2026-11-23). Wrong is still -1, so a fast guess costs.
    let firstRight: string | null = null;
    let firstAt = Infinity;
    for (const p of match.players) {
      const a = r.answers[p.id];
      if (a && isRightChoice(item, r, a.choice) && a.at < firstAt) {
        firstAt = a.at;
        firstRight = p.id;
      }
    }
    for (const p of match.players) {
      const a = r.answers[p.id];
      const right = !!a && isRightChoice(item, r, a.choice);
      const pts = !a ? 0 : right ? (p.id === firstRight ? match.settings.pointsRight : 0) : match.settings.pointsWrong;
      points[p.id] = pts;
      scores[p.sideId] = (scores[p.sideId] ?? 0) + pts;
    }
  }
  return { ...match, scores, phase: "reveal", round: { ...r, revealedAt: at, points } };
}

/** After a reveal: the next regular question, the end, or a (fresh) tiebreak question. */
function advance(match: ClueMatch, at: number): ClueMatch {
  const finished = match.round ? [...match.done, match.round] : match.done;
  const base = { ...match, done: finished };
  if (match.round?.tiebreak && match.round.winnerId) {
    return { ...base, phase: "over", round: null, winnerSideIds: [match.round.winnerId], tiebreakers: [] };
  }
  if (!match.round?.tiebreak && match.dealt < match.deck.length) {
    return { ...base, dealt: match.dealt + 1, phase: "question", round: openRound(match, match.deck[match.dealt], at, false) };
  }
  const top = match.tiebreakers.length ? match.tiebreakers : leaders(match);
  if (top.length <= 1 || match.players.length <= 1) {
    return { ...base, phase: "over", round: null, winnerSideIds: top, tiebreakers: [] };
  }
  // A fresh question the players have not seen in this match.
  const used = new Set(finished.map((r) => r.cardId));
  const next = match.spare.find((id) => !used.has(id));
  if (!next) return { ...base, phase: "over", round: null, winnerSideIds: top, tiebreakers: [] }; // the selection ran out: a shared win
  return { ...base, phase: "question", tiebreakers: top, round: openRound(match, next, at, true) };
}

export function reduceClueMatch(match: ClueMatch, action: ClueAction, bank: ClueBank): ClueMatch {
  if (match.phase === "over") return match;
  switch (action.type) {
    case "deal": {
      if (match.phase !== "ready" || match.deck.length === 0) return match;
      return { ...match, dealt: 1, phase: "question", round: openRound(match, match.deck[0], action.now, false) };
    }
    case "pause": {
      if (match.pausedAt !== null || match.phase === "ready") return match;
      return { ...match, pausedAt: action.now };
    }
    case "resume": {
      if (match.pausedAt === null) return match;
      if (!match.round) return { ...match, pausedAt: null };
      const shift = action.now - match.pausedAt;
      const r = match.round;
      return {
        ...match,
        pausedAt: null,
        round: { ...r, openAt: r.openAt + shift, closesAt: r.closesAt + shift, revealedAt: r.revealedAt === null ? null : r.revealedAt + shift },
      };
    }
    case "tick": {
      let m = match;
      // Catch up on everything that came due (a device that slept, a server poll).
      for (let guard = 0; guard < 40 && m.phase !== "over" && m.pausedAt === null && m.round; guard += 1) {
        const r = m.round;
        if (m.phase === "question" && action.now >= r.closesAt) {
          m = close(m, r.closesAt, bank);
          continue;
        }
        if (m.phase === "reveal" && r.revealedAt !== null && action.now >= r.revealedAt + m.settings.revealSeconds * 1000) {
          m = advance(m, r.revealedAt + m.settings.revealSeconds * 1000);
          continue;
        }
        break;
      }
      return m;
    }
    case "answer": {
      if (!canAnswer(match, action.playerId, action.now)) return match;
      const choice = Math.floor(Number(action.choice));
      if (!(choice >= 0 && choice <= 3)) return match;
      const r = match.round!;
      const answers = { ...r.answers, [action.playerId]: { choice, at: action.now } };
      let m: ClueMatch = { ...match, round: { ...r, answers } };
      if (r.tiebreak) {
        const item = bank.get(r.cardId);
        // The first right answer the server receives wins the tiebreak at once.
        if (item && isRightChoice(item, r, choice)) {
          m = { ...m, round: { ...m.round!, winnerId: action.playerId } };
          return close(m, action.now, bank);
        }
        // Everyone has used their attempt without a right answer: show it, then a fresh question.
        if (m.tiebreakers.every((id) => answers[id])) return close(m, action.now, bank);
      }
      // Regular questions stay open the full time, even when everyone has answered.
      return m;
    }
  }
}

export function soloSetup(id = "me", name = "You") {
  return {
    sides: [{ id, name }],
    players: [{ id, name, sideId: id }],
  };
}

/* ---------- what a player's device is allowed to see ---------- */

export type PublicCard = {
  id: string;
  category: ClueCategory;
  mystery?: string;
  /** Present only once revealed. */
  answer?: string;
  reveal?: string;
  teaching?: string;
  study?: { label: string; href: string };
  /** The question it came with, once revealed (for Study). */
  quiz?: PublicQuestion;
};

export type PublicQuestion = {
  question: string;
  /** The book's name, e.g. "1 Samuel". */
  book?: string;
  chapter: number;
  /** The four choices in display order (A-D). */
  choices: string[];
  /** Present only once revealed. */
  correct?: number;
  explanation?: string;
  ref?: ClueRef;
};

export type PublicRound = {
  card: PublicCard;
  quiz: PublicQuestion;
  openAt: number;
  closesAt: number;
  revealedAt: number | null;
  tiebreak: boolean;
  /** Who has locked an answer (not what) while the question is open. */
  locked: string[];
  /** Your own locked answer, if any. */
  mine: number | null;
  /** After the reveal: everyone's answer and points. */
  answers?: Record<string, ClueAnswer>;
  points?: Record<string, number>;
  winnerId?: string | null;
};

export type PublicHistory = PublicCard & {
  quiz: PublicQuestion;
  tiebreak: boolean;
  answers: Record<string, ClueAnswer>;
  points: Record<string, number>;
  winnerId: string | null;
};

export type PublicMatch = {
  settings: ClueSettings;
  selection: ClueSelection;
  sides: ClueSide[];
  players: CluePlayer[];
  phase: ClueMatch["phase"];
  dealt: number;
  deckSize: number;
  pausedAt: number | null;
  scores: Record<string, number>;
  tiebreakers: string[];
  winnerSideIds: string[];
  round: PublicRound | null;
  /** Rounds already played, oldest first, with their answers (for the review). */
  history: PublicHistory[];
  /** Server clock at the time of this view, for a client clock offset. */
  serverNow: number;
};

function revealCard(item: BankItem): PublicCard {
  return { id: item.id, category: item.category, mystery: item.mystery, answer: item.answerText, reveal: item.reveal, teaching: item.teaching, study: item.study };
}

function questionFor(item: BankItem, order: ClueRound["order"], revealed: boolean): PublicQuestion {
  const choices = order.map((i) => item.choices[i]);
  // The book's name (from the verse label) is shown on the card from the start: it gives nothing away.
  const book = item.ref.book;
  if (!revealed) return { question: item.question, book, chapter: item.chapter, choices };
  return { question: item.question, book, chapter: item.chapter, choices, correct: order.indexOf(item.answer as 0), explanation: item.explanation, ref: item.ref };
}

/**
 * The match as one player may see it. Before a question closes: no answer,
 * no reveal art, and nobody else's choice (only that they have locked one).
 * The server sends only this; the full match never leaves it.
 */
export function publicView(match: ClueMatch, bank: ClueBank, now: number, viewerId?: string): PublicMatch {
  let round: PublicRound | null = null;
  const r = match.round;
  if (r) {
    const item = bank.get(r.cardId)!;
    const revealed = r.revealedAt !== null;
    round = {
      card: revealed ? revealCard(item) : { id: `hidden-${match.dealt}-${match.done.length}`, category: item.category, mystery: item.mystery },
      quiz: questionFor(item, r.order, revealed),
      openAt: r.openAt,
      closesAt: r.closesAt,
      revealedAt: r.revealedAt,
      tiebreak: r.tiebreak,
      locked: Object.keys(r.answers),
      mine: viewerId && r.answers[viewerId] ? r.answers[viewerId].choice : null,
      ...(revealed ? { answers: r.answers, points: r.points, winnerId: r.winnerId } : {}),
    };
  }
  const history: PublicHistory[] = match.done
    .map((d) => {
      const item = bank.get(d.cardId);
      if (!item) return null;
      return { ...revealCard(item), quiz: questionFor(item, d.order, true), tiebreak: d.tiebreak, answers: d.answers, points: d.points, winnerId: d.winnerId };
    })
    .filter((x): x is PublicHistory => !!x);
  return {
    settings: match.settings,
    selection: match.selection,
    sides: match.sides,
    players: match.players,
    phase: match.phase,
    dealt: match.dealt,
    deckSize: match.deck.length,
    pausedAt: match.pausedAt,
    scores: match.scores,
    tiebreakers: match.tiebreakers,
    winnerSideIds: match.winnerSideIds,
    round,
    history,
    serverNow: now,
  };
}
