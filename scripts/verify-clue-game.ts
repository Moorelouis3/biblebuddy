/** npm run verify:clue-game: the Bible Clue Game: its cards, its question bank, the multiple-choice rules and what players may see. */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { GENESIS_CARDS } from "../lib/clueGame/decks/genesis";
import { ALL_CLUE_CARDS, CLUE_DECKS, poolFor } from "../lib/clueGame/catalog";
import { isCorrectGuess } from "../lib/clueGame/answer";
import { artKey } from "../lib/clueGame/ref";
import { kjvStaticUrl } from "../lib/chapterStaticData";
import { createMatch, reduceClueMatch, soloSetup, publicView, poolForSelection, neededForMatch, DEFAULT_CLUE_SETTINGS, ROUND_INTRO_MS, SOLO_SETTINGS, speedPoints, type ClueMatch, type ClueSelection } from "../lib/clueGame/engine";
import { BANK_ITEMS, BOOK_INDEX, CLUE_BANK, MIN_ROUND, bookItems, booksWithQuestions, chaptersWithQuestions, cleanSelection, selectionFromKeys, selectionLabel, selectionStatus, selectionToKeys } from "../lib/clueGame/bank";
// Every book file in the registry, as the server has it.
import "../lib/clueGame/bank/all";
import { chainPostText } from "../lib/clueGame/server";
import { LEVEL_PICKER } from "../lib/clueGame/types";
import { readClueChallenge } from "../components/feed/ClueChallengePost";

let n = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  n += 1;
  console.log(`  ok  ${name}`);
};
const cards = ALL_CLUE_CARDS;

ok("Genesis is the 52-card roster: 25 people, 15 places, 12 keywords, numbered 1-52", () => {
  assert.equal(GENESIS_CARDS.length, 52);
  assert.deepEqual(GENESIS_CARDS.map((c) => c.number), Array.from({ length: 52 }, (_, i) => i + 1));
  const by = (k: string) => GENESIS_CARDS.filter((c) => c.category === k).length;
  assert.deepEqual([by("person"), by("place"), by("keyword")], [25, 15, 12]);
  assert.equal(new Set(GENESIS_CARDS.map((c) => c.id)).size, 52);
});

ok("every card: five clues, a teaching paragraph, accepted answers, art files that exist", () => {
  for (const c of GENESIS_CARDS) {
    assert.equal(c.clues.length, 5, c.id);
    assert.ok(c.teaching && c.teaching.split(/\s+/).length >= 25, `${c.id} teaching`);
    for (const p of [c.art.mystery, c.art.reveal]) if (p) assert.ok(existsSync(`public${p}`), `${c.id}: ${p}`);
    if (c.study) assert.ok(c.study.href.startsWith("/"), `${c.id} study link`);
  }
});

ok("every clue reference opens real KJV verses", () => {
  for (const c of GENESIS_CARDS) {
    for (const clue of [...c.clues, ...(c.altTopClues || [])]) {
      const file = `public${kjvStaticUrl(clue.ref.book, clue.ref.chapter)}`;
      assert.ok(existsSync(file), `${c.id}: ${clue.ref.label} (${file})`);
      const verses = (JSON.parse(readFileSync(file, "utf8")) as Array<{ number: number }>).filter(
        (v) => v.number >= clue.ref.verseStart && v.number <= clue.ref.verseEnd,
      );
      assert.equal(verses.length, clue.ref.verseEnd - clue.ref.verseStart + 1, `${c.id}: ${clue.ref.label}`);
    }
  }
});

ok("approved clues: Noah's 5-point, Adam's revised set; giveaways stay low", () => {
  const noah = cards.get("noah")!;
  assert.equal(noah.clues[0].text, "God found me righteous in a world of unrighteousness.");
  for (const clue of noah.clues.slice(0, 3)) assert.ok(!/\b(ark|flood)\b/i.test(clue.text), clue.text);
  assert.equal(cards.get("adam")!.clues[4].ref.label, "Genesis 2:7");
  // Louis, 2026-11-22: a Genesis deck's clues come only from Genesis.
  for (const c of GENESIS_CARDS) {
    for (const clue of [...c.clues, ...(c.altTopClues || [])]) assert.equal(clue.ref.book, "Genesis", `${c.id}: ${clue.ref.label}`);
  }
});

ok("art file names do not spell the answer (the silhouette is shown to every player)", () => {
  for (const c of GENESIS_CARDS) {
    if (!c.art.mystery) continue;
    assert.ok(!c.art.mystery.toLowerCase().includes(c.id), c.art.mystery);
    assert.ok(c.art.mystery.includes(artKey(c.id)));
  }
});

ok("deck picker: 66 books, Genesis the only playable Beta deck", () => {
  assert.equal(CLUE_DECKS.length, 66);
  assert.deepEqual(CLUE_DECKS.filter((d) => d.available).map((d) => d.id), ["genesis"]);
  assert.equal(CLUE_DECKS.filter((d) => d.testament === "old").length, 39);
  assert.equal(poolFor(["exodus"]).length, 0);
});

ok("answers: case, punctuation, 'the', accepted spellings, small typos on long names", () => {
  assert.ok(isCorrectGuess(cards.get("noah")!, "  NOAH! "));
  assert.ok(isCorrectGuess(cards.get("god")!, "The LORD"));
  assert.ok(isCorrectGuess(cards.get("abraham")!, "Abram"));
  assert.ok(isCorrectGuess(cards.get("abraham")!, "Abrahm"));
  assert.ok(!isCorrectGuess(cards.get("cain")!, "Abel"));
  assert.ok(!isCorrectGuess(cards.get("cain")!, ""));
});


/* ---------- the question bank (multiple choice since 2026-11-22) ---------- */

const V = (ch: number) => JSON.parse(readFileSync(`public/kjv/genesis/${ch}.json`, "utf8")) as Array<{ number: number }>;

ok("bank: every Genesis chapter 1-50 has at least 11 questions per level", () => {
  assert.deepEqual(chaptersWithQuestions("genesis"), Array.from({ length: 50 }, (_, i) => i + 1));
  for (let ch = 1; ch <= 50; ch += 1) {
    for (const level of ["beginner", "medium"] as const) {
      const count = BANK_ITEMS.filter((q) => q.chapter === ch && q.level === level).length;
      assert.ok(count >= 11, `Genesis ${ch} ${level}: ${count}`);
    }
  }
});

ok("bank: unique ids, four different choices, one right answer, a verse in its own chapter that exists", () => {
  const ids = new Set<string>();
  for (const q of BANK_ITEMS) {
    assert.ok(!ids.has(q.id), `${q.id} duplicate`);
    ids.add(q.id);
    assert.equal(q.choices.length, 4, q.id);
    assert.equal(new Set(q.choices).size, 4, `${q.id} choices repeat`);
    assert.ok(q.answer >= 0 && q.answer <= 3, q.id);
    assert.ok(q.question.trim() && q.explanation.trim(), `${q.id} text`);
    assert.equal(q.ref.chapter, q.chapter, `${q.id} ref chapter`);
    const verses = V(q.ref.chapter).filter((v) => v.number >= q.ref.verseStart && v.number <= q.ref.verseEnd);
    assert.equal(verses.length, q.ref.verseEnd - q.ref.verseStart + 1, `${q.id} verses`);
  }
});

const sel = (chapters: number[] | "all", level: ClueSelection["level"] = "beginner"): ClueSelection => ({ book: "genesis", chapters, level });
const two = () => ({
  sides: [{ id: "a", name: "Ann" }, { id: "b", name: "Ben" }],
  players: [{ id: "a", name: "Ann", sideId: "a" }, { id: "b", name: "Ben", sideId: "b" }],
});
const A = DEFAULT_CLUE_SETTINGS.answerSeconds * 1000;
const R = DEFAULT_CLUE_SETTINGS.revealSeconds * 1000;

ok("setup: All Chapters, one chapter and several chapters, at both levels, draw 10 distinct questions from the selection only", () => {
  for (const level of ["beginner", "medium"] as const) {
    for (const chapters of ["all", [7], [3, 22, 41]] as Array<number[] | "all">) {
      const s = sel(chapters, level);
      assert.ok(selectionStatus(s).enough, JSON.stringify(s));
      for (let seed = 1; seed <= 25; seed += 1) {
        const m = createMatch({ items: BANK_ITEMS, selection: s, ...soloSetup(), seed });
        assert.equal(m.deck.length, 10);
        assert.equal(new Set(m.deck).size, 10);
        for (const id of [...m.deck, ...m.spare]) {
          const q = CLUE_BANK.get(id)!;
          // With the level picker off (2026-11-23) a game mixes every level.
          if (LEVEL_PICKER) assert.equal(q.level, level, `${id} level`);
          if (chapters !== "all") assert.ok(chapters.includes(q.chapter), `${id} outside ${chapters}`);
        }
        assert.ok(m.spare.length >= 1, "a fresh question is kept for a tiebreak");
        assert.ok(!m.spare.some((id) => m.deck.includes(id)));
      }
    }
  }
});

ok("setup: several chapters are spread out (3 chapters: no chapter gets more than 4 of 10)", () => {
  for (let seed = 1; seed <= 40; seed += 1) {
    const m = createMatch({ items: BANK_ITEMS, selection: sel([3, 22, 41]), ...soloSetup(), seed });
    const by = new Map<number, number>();
    for (const id of m.deck) by.set(CLUE_BANK.get(id)!.chapter, (by.get(CLUE_BANK.get(id)!.chapter) || 0) + 1);
    assert.equal(by.size, 3);
    assert.ok(Math.max(...by.values()) <= 4, JSON.stringify([...by]));
  }
});

ok("setup: a selection that cannot fill 10 + a tiebreak says so (never borrows from other chapters or levels)", () => {
  const tiny = BANK_ITEMS.filter((q) => q.chapter === 1 && q.level === "beginner").slice(0, 7);
  assert.equal(poolForSelection(tiny, sel([1])).length, 7);
  const m = createMatch({ items: tiny, selection: sel([1]), ...soloSetup(), seed: 3 });
  assert.equal(m.deck.length, 7, "only what the selection has");
  assert.ok(m.deck.every((id) => tiny.some((q) => q.id === id)));
  assert.equal(neededForMatch(), 11);
});

ok("rematch: the next game rotates in fresh questions (none repeated while the selection has fresh ones)", () => {
  const s = sel([12, 13]);
  const first = createMatch({ items: BANK_ITEMS, selection: s, ...soloSetup(), seed: 11 });
  const seen = [...first.deck];
  const second = createMatch({ items: BANK_ITEMS, selection: s, ...soloSetup(), seed: 12, avoid: seen });
  assert.equal(second.deck.filter((id) => seen.includes(id)).length, 0);
  // The third game takes every fresh one left (pool minus 20, up to 10), then reuses the least recent.
  const pool = poolForSelection(BANK_ITEMS, s).length;
  const third = createMatch({ items: BANK_ITEMS, selection: s, ...soloSetup(), seed: 13, avoid: [...seen, ...second.deck] });
  assert.equal(new Set(third.deck).size, 10);
  assert.equal(third.deck.filter((id) => !seen.includes(id) && !second.deck.includes(id)).length, Math.min(10, pool - 20));
});

ok("selection round trip through a room's deck_ids, and bad input is cleaned", () => {
  for (const s of [sel("all"), sel([5], "medium"), sel([1, 2, 50])]) assert.deepEqual(selectionFromKeys(selectionToKeys(s)), s);
  assert.deepEqual(cleanSelection({ book: "x", chapters: [0, 99, 4, 4], level: "expert" }), sel([4]));
  // Hard is a level since 2026-11-23.
  assert.deepEqual(cleanSelection({ book: "genesis", chapters: [4], level: "hard" }), sel([4], "hard"));
  assert.deepEqual(cleanSelection(null), sel("all"));
});

/** Play one regular question: open it, let answers in, run the clock out. */
function start2(seed = 5) {
  let m = createMatch({ items: BANK_ITEMS, selection: sel("all"), ...two(), seed });
  m = reduceClueMatch(m, { type: "deal", now: 1000 }, CLUE_BANK);
  return m;
}
const rightIdx = (m: ClueMatch) => m.round!.order.indexOf(CLUE_BANK.get(m.round!.cardId)!.answer as 0);
const wrongIdx = (m: ClueMatch) => (rightIdx(m) + 1) % 4;

ok("a question stays open the full 10 seconds even when both have answered", () => {
  let m = start2();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "answer", now: t0 + 500, playerId: "a", choice: rightIdx(m) }, CLUE_BANK);
  m = reduceClueMatch(m, { type: "answer", now: t0 + 700, playerId: "b", choice: wrongIdx(m) }, CLUE_BANK);
  m = reduceClueMatch(m, { type: "tick", now: t0 + A - 1 }, CLUE_BANK);
  assert.equal(m.phase, "question");
  m = reduceClueMatch(m, { type: "tick", now: t0 + A }, CLUE_BANK);
  assert.equal(m.phase, "reveal");
});

ok("one answer per player per question; a second tap or a late answer changes nothing", () => {
  let m = start2();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "answer", now: t0 + 100, playerId: "a", choice: wrongIdx(m) }, CLUE_BANK);
  const again = reduceClueMatch(m, { type: "answer", now: t0 + 200, playerId: "a", choice: rightIdx(m) }, CLUE_BANK);
  assert.equal(again, m, "second answer ignored");
  const late = reduceClueMatch(m, { type: "answer", now: t0 + A, playerId: "b", choice: rightIdx(m) }, CLUE_BANK);
  assert.equal(late, m, "answer at zero rejected");
  const early = reduceClueMatch(start2(), { type: "answer", now: 999, playerId: "b", choice: 0 }, CLUE_BANK);
  assert.equal(early.round!.answers.b, undefined, "before it opens");
  const stranger = reduceClueMatch(m, { type: "answer", now: t0 + 300, playerId: "zed", choice: 0 }, CLUE_BANK);
  assert.equal(stranger, m, "only players in the match");
});

ok("two-player 10-question match: only the fastest right answer scores, wrong is −1, no answer is 0", () => {
  let m = start2(21);
  const expected = { a: 0, b: 0 };
  for (let q = 0; q < 10; q += 1) {
    assert.equal(m.phase, "question");
    assert.equal(m.dealt, q + 1);
    const t0 = m.round!.openAt;
    // a: right, wrong, nothing in turn; b: always right.
    const plan = q % 3;
    if (plan === 0) m = reduceClueMatch(m, { type: "answer", now: t0 + 1000, playerId: "a", choice: rightIdx(m) }, CLUE_BANK);
    if (plan === 1) m = reduceClueMatch(m, { type: "answer", now: t0 + 1000, playerId: "a", choice: wrongIdx(m) }, CLUE_BANK);
    m = reduceClueMatch(m, { type: "answer", now: t0 + 9000, playerId: "b", choice: rightIdx(m) }, CLUE_BANK);
    expected.a += plan === 0 ? 1 : plan === 1 ? -1 : 0;
    // b is right but slower whenever a was right first: 0, not +1 (2026-11-23).
    expected.b += plan === 0 ? 0 : 1;
    m = reduceClueMatch(m, { type: "tick", now: t0 + A }, CLUE_BANK);
    assert.equal(m.round!.points.a, plan === 0 ? 1 : plan === 1 ? -1 : 0);
    assert.equal(m.round!.points.b, plan === 0 ? 0 : 1, "only the first right answer scores");
    m = reduceClueMatch(m, { type: "tick", now: t0 + A + R }, CLUE_BANK);
  }
  assert.equal(m.phase, "over");
  assert.deepEqual(m.scores, expected);
  assert.deepEqual(m.winnerSideIds, ["b"]);
  assert.equal(m.done.length, 10);
});

/** Ten questions with nobody answering: 0-0, a tie. */
function tied(seed = 8, s: ClueSelection = sel("all")) {
  let m = createMatch({ items: BANK_ITEMS, selection: s, ...two(), seed });
  m = reduceClueMatch(m, { type: "deal", now: 1000 }, CLUE_BANK);
  for (let q = 0; q < 10; q += 1) m = reduceClueMatch(m, { type: "tick", now: m.round!.openAt + A + R }, CLUE_BANK);
  return m;
}

ok("tie: only the tied leaders play a tiebreaker, on a question nobody has seen this match", () => {
  const m = tied();
  assert.equal(m.phase, "question");
  assert.ok(m.round!.tiebreak);
  assert.deepEqual(m.tiebreakers.sort(), ["a", "b"]);
  assert.ok(!m.deck.includes(m.round!.cardId));
  assert.ok(!m.done.some((d) => d.cardId === m.round!.cardId));
  if (LEVEL_PICKER) assert.equal(CLUE_BANK.get(m.round!.cardId)!.level, "beginner", "same selection");
  const v = publicView(m, CLUE_BANK, m.round!.openAt, "a");
  assert.equal(v.round!.quiz.correct, undefined);
});

ok("tiebreaker: one try each; the first right answer wins at once", () => {
  let m = tied();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "answer", now: t0 + 2000, playerId: "a", choice: wrongIdx(m) }, CLUE_BANK);
  assert.equal(m.phase, "question", "a wrong try does not end it");
  assert.equal(reduceClueMatch(m, { type: "answer", now: t0 + 2100, playerId: "a", choice: rightIdx(m) }, CLUE_BANK), m, "one try");
  m = reduceClueMatch(m, { type: "answer", now: t0 + 3000, playerId: "b", choice: rightIdx(m) }, CLUE_BANK);
  assert.equal(m.phase, "reveal");
  assert.equal(m.round!.winnerId, "b");
  m = reduceClueMatch(m, { type: "tick", now: t0 + 3000 + R }, CLUE_BANK);
  assert.equal(m.phase, "over");
  assert.deepEqual(m.winnerSideIds, ["b"]);
  assert.deepEqual(m.scores, { a: 0, b: 0 }, "a tiebreak does not change points");
});

ok("tiebreaker: if nobody gets it, a fresh unseen question; if the selection runs out, a shared win", () => {
  let m = tied();
  const first = m.round!.cardId;
  m = reduceClueMatch(m, { type: "tick", now: m.round!.closesAt + R }, CLUE_BANK);
  assert.ok(m.round!.tiebreak);
  assert.notEqual(m.round!.cardId, first);
  // A selection of exactly 11 questions: the one spare is used, then a shared win.
  const eleven = BANK_ITEMS.filter((q) => q.chapter === 2 && q.level === "medium").slice(0, 11);
  let n2 = createMatch({ items: eleven, selection: sel([2], "medium"), ...two(), seed: 4 });
  n2 = reduceClueMatch(n2, { type: "deal", now: 1000 }, CLUE_BANK);
  for (let q = 0; q < 10; q += 1) n2 = reduceClueMatch(n2, { type: "tick", now: n2.round!.openAt + A + R }, CLUE_BANK);
  assert.ok(n2.round!.tiebreak);
  n2 = reduceClueMatch(n2, { type: "tick", now: n2.round!.closesAt + R }, CLUE_BANK);
  assert.equal(n2.phase, "over");
  assert.deepEqual(n2.winnerSideIds.sort(), ["a", "b"]);
});

ok("what a player sees: no answer, explanation or other players' choices until the question closes; then everything", () => {
  let m = start2();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "answer", now: t0 + 500, playerId: "b", choice: 2 }, CLUE_BANK);
  const forA = publicView(m, CLUE_BANK, t0 + 600, "a");
  const text = JSON.stringify(forA);
  const q = CLUE_BANK.get(m.round!.cardId)!;
  assert.equal(forA.round!.quiz.correct, undefined);
  assert.ok(!text.includes(q.explanation));
  assert.equal(forA.round!.answers, undefined, "b's choice stays private");
  assert.deepEqual(forA.round!.locked, ["b"], "only that b has locked in");
  assert.equal(forA.round!.mine, null);
  assert.equal(publicView(m, CLUE_BANK, t0 + 600, "b").round!.mine, 2, "reconnecting restores your own locked answer");
  assert.equal(forA.round!.card.answer, undefined);
  m = reduceClueMatch(m, { type: "tick", now: t0 + A }, CLUE_BANK);
  const after = publicView(m, CLUE_BANK, t0 + A, "a");
  assert.equal(after.round!.quiz.correct, rightIdx(m));
  assert.equal(after.round!.quiz.explanation, q.explanation);
  assert.equal(after.round!.answers!.b.choice, 2);
});

ok("the opening: nobody can answer during the instruction; the 10 seconds start after it", () => {
  let m = createMatch({ items: BANK_ITEMS, selection: sel("all"), ...two(), seed: 2 });
  m = reduceClueMatch(m, { type: "deal", now: 1000 + ROUND_INTRO_MS }, CLUE_BANK);
  assert.equal(reduceClueMatch(m, { type: "answer", now: 1500, playerId: "a", choice: 0 }, CLUE_BANK), m);
  assert.equal(m.round!.closesAt - m.round!.openAt, A);
});

ok("a pause stops the clock; resume carries on with the time that was left", () => {
  let m = start2();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "pause", now: t0 + 4000 }, CLUE_BANK);
  m = reduceClueMatch(m, { type: "tick", now: t0 + 60000 }, CLUE_BANK);
  assert.equal(m.phase, "question");
  m = reduceClueMatch(m, { type: "resume", now: t0 + 60000 }, CLUE_BANK);
  assert.equal(m.round!.closesAt - (t0 + 60000), 6000);
});

ok("a challenge replays the exact questions in the exact order", () => {
  const original = createMatch({ items: BANK_ITEMS, selection: sel([30, 31], "medium"), ...soloSetup(), seed: 99 });
  const replay = createMatch({ items: BANK_ITEMS, selection: sel([30, 31], "medium"), ...soloSetup(), seed: 1, cardIds: original.deck });
  assert.deepEqual(replay.deck, original.deck);
});

/* ---------- Bible Trivia: every book (2026-11-23) ---------- */

ok("store: all 66 books, every question sound (four different choices, a level, a real verse in its own chapter)", () => {
  assert.equal(booksWithQuestions().length, 66);
  const LEVELS = ["beginner", "medium", "hard"];
  let total = 0;
  for (const { id } of booksWithQuestions()) {
    const items = bookItems(id);
    assert.ok(items.length > 0, `${id} has questions`);
    for (const q of items) {
      total += 1;
      assert.ok(LEVELS.includes(q.level), `${q.id} level`);
      assert.equal(new Set(q.choices.map((c) => c.trim().toLowerCase())).size, 4, `${q.id} choices repeat`);
      assert.ok(q.answer >= 0 && q.answer <= 3, q.id);
      assert.ok(q.question.trim(), `${q.id} question`);
      assert.equal(q.ref.chapter, q.chapter, `${q.id} ref chapter`);
      const file = `public${kjvStaticUrl(q.ref.book, q.ref.chapter)}`;
      assert.ok(existsSync(file), `${q.id}: ${file}`);
    }
  }
  assert.ok(total >= 7000, `questions: ${total}`);
});

ok("store: the index matches the questions (the setup screen counts from it)", () => {
  for (const { id } of booksWithQuestions()) {
    const counts = new Map<string, number>();
    for (const q of bookItems(id)) counts.set(`${q.chapter}:${q.level}`, (counts.get(`${q.chapter}:${q.level}`) || 0) + 1);
    for (const [ch, row] of Object.entries(BOOK_INDEX[id].chapters)) {
      ["beginner", "medium", "hard"].forEach((lv, i) => assert.equal(row[i], counts.get(`${ch}:${lv}`) || 0, `${id} ${ch} ${lv}`));
    }
  }
  // Every chapter of every book can be played at Easy (the old trivia had 5 per chapter).
  for (const { id } of booksWithQuestions()) {
    for (const ch of chaptersWithQuestions(id)) assert.ok(selectionStatus({ book: id, chapters: [ch], level: "beginner" }).enough, `${id} ${ch}`);
  }
});

ok("short round: a chapter with 5 questions plays 5, ends without a tiebreak question, and a challenge replays it", () => {
  const s: ClueSelection = { book: "exodus", chapters: [3], level: "beginner" };
  const st = selectionStatus(s);
  assert.ok(st.count >= MIN_ROUND && st.round === Math.min(10, st.count));
  let m = createMatch({ items: bookItems("exodus"), selection: s, ...soloSetup(), seed: 5 });
  assert.equal(m.deck.length, st.round);
  assert.equal(m.settings.roundSize, m.deck.length);
  m = reduceClueMatch(m, { type: "deal", now: 1000 }, CLUE_BANK);
  for (let q = 0; q < m.deck.length; q += 1) m = reduceClueMatch(m, { type: "tick", now: m.round!.openAt + A + R }, CLUE_BANK);
  assert.equal(m.phase, "over");
  assert.equal(m.done.length, st.round);
  const replay = createMatch({ items: bookItems("exodus"), selection: s, ...soloSetup(), seed: 1, cardIds: m.deck });
  assert.deepEqual(replay.deck, m.deck);
});

ok("labels: Easy / Medium / Hard, real book names, chapter runs", () => {
  const lv = (s: string) => (LEVEL_PICKER ? ` · ${s}` : "");
  assert.equal(selectionLabel({ book: "genesis", chapters: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], level: "medium" }), `Genesis 25–36${lv("Medium")}`);
  assert.equal(selectionLabel({ book: "1-samuel", chapters: "all", level: "beginner" }), `1 Samuel · All chapters${lv("Easy")}`);
  assert.equal(selectionLabel({ book: "song-of-solomon", chapters: [2], level: "hard" }), `Song of Solomon 2${lv("Hard")}`);
});

ok("feed: chain posts, new challenge posts and old Bible Clue posts all read back as cards", () => {
  const uid = "0f8c2a3e-1111-4222-8333-944455556666";
  const chain = chainPostText({
    id: "AbC123xy",
    name: "Mark Smith",
    fromName: "Jess Brown",
    fromId: "x",
    userId: uid,
    deckName: "Genesis 25–36 · Medium",
    won: 10,
    total: 10,
    score: 10,
    chain: ["Louis Moore", "Jess Brown", "Mark Smith"],
  });
  const c = readClueChallenge(chain)!;
  assert.equal(c.id, "AbC123xy");
  assert.equal(c.name, "Mark Smith");
  assert.equal(c.selection, "Genesis 25–36 · Medium");
  assert.deepEqual(c.chain, { from: "Jess", won: 10, total: 10, names: ["Louis", "Jess", "Mark"], fromId: uid });
  assert.ok(chain.includes("A perfect round"));
  const fresh = readClueChallenge("🃏 Ann scored 7 in Exodus · All chapters · Easy on Bible Trivia. Can you beat it?\n\n[Play the challenge](https://www.mybiblebuddy.net/bible-study-games/clue/challenge/Zz12Yy34)")!;
  assert.equal(fresh.score, 7);
  assert.equal(fresh.chain, undefined);
  const old = readClueChallenge("🃏 Ann scored 5 in Genesis · All chapters · Beginner on the Bible Clue Game. Can you beat it?\n\n2 Buddies have played it. Bo leads with 6.\n\n[Play the challenge](https://www.mybiblebuddy.net/bible-study-games/clue/challenge/Zz12Yy34)")!;
  assert.equal(old.leader, "Bo");
  assert.equal(old.played, 2);
});

/* ---------- solo game feel (2026-11-23) ---------- */

const soloSpeed = (seed = 5) => {
  let m = createMatch({ items: BANK_ITEMS, selection: sel("all"), ...soloSetup(), settings: SOLO_SETTINGS, seed });
  m = reduceClueMatch(m, { type: "deal", now: 1000 }, CLUE_BANK);
  return m;
};
const soloRight = (m: ClueMatch) => m.round!.order.indexOf(CLUE_BANK.get(m.round!.cardId)!.answer as 0);

ok("solo: answering shows the answer at once, and Next skips the rest of the reveal", () => {
  let m = soloSpeed();
  const t0 = m.round!.openAt;
  m = reduceClueMatch(m, { type: "answer", now: t0 + 1000, playerId: "me", choice: soloRight(m) }, CLUE_BANK);
  assert.equal(m.phase, "reveal", "no waiting for the clock");
  m = reduceClueMatch(m, { type: "next", now: t0 + 1500 }, CLUE_BANK);
  assert.equal(m.phase, "question");
  assert.equal(m.dealt, 2);
});

ok("speed points: 500-1,000 by speed; 3 in a row ×1.5, 5 in a row ×2; wrong is 0 and ends the streak", () => {
  assert.equal(speedPoints(10000, 10000), 1000);
  assert.equal(speedPoints(0, 10000), 500);
  let m = soloSpeed(8);
  const got: number[] = [];
  for (let q = 0; q < 6; q += 1) {
    const t0 = m.round!.openAt;
    const choice = q === 5 ? (soloRight(m) + 1) % 4 : soloRight(m);
    m = reduceClueMatch(m, { type: "answer", now: t0, playerId: "me", choice }, CLUE_BANK);
    got.push(m.round!.points.me);
    m = reduceClueMatch(m, { type: "next", now: t0 + 100 }, CLUE_BANK);
  }
  assert.deepEqual(got, [1000, 1000, 1500, 1500, 2000, 0]);
  assert.equal(m.streaks!.me, 0);
  assert.equal(m.scores.me, 7000);
});

ok("helpers: 50/50 takes away two wrong answers once; +5s adds five seconds once; rooms have neither", () => {
  let m = soloSpeed(9);
  const r0 = m.round!;
  m = reduceClueMatch(m, { type: "fifty", now: r0.openAt, playerId: "me" }, CLUE_BANK);
  assert.equal(m.round!.hidden!.length, 2);
  assert.ok(!m.round!.hidden!.includes(soloRight(m)), "never the right one");
  assert.equal(reduceClueMatch(m, { type: "answer", now: r0.openAt + 10, playerId: "me", choice: m.round!.hidden![0] }, CLUE_BANK).phase, "question", "a removed answer cannot be picked");
  assert.equal(reduceClueMatch(m, { type: "fifty", now: r0.openAt, playerId: "me" }, CLUE_BANK), m, "once a game");
  m = reduceClueMatch(m, { type: "extend", now: r0.openAt, playerId: "me" }, CLUE_BANK);
  assert.equal(m.round!.closesAt, r0.closesAt + 5000);
  assert.equal(reduceClueMatch(m, { type: "extend", now: r0.openAt, playerId: "me" }, CLUE_BANK), m, "once a game");
  const room = start2();
  assert.equal(reduceClueMatch(room, { type: "fifty", now: room.round!.openAt, playerId: "a" }, CLUE_BANK), room);
});

console.log(`\n${n} checks passed.`);
