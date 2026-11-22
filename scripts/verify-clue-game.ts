/** npm run verify:clue-game: the Bible Clue Game's cards and round rules. */
import assert from "node:assert/strict";
import { GENESIS_CARDS } from "../lib/clueGame/decks/genesis";
import { isCorrectGuess } from "../lib/clueGame/answer";
import { createMatch, reduceClueMatch, soloSetup, canGuess, shuffleCards, DEFAULT_CLUE_SETTINGS, type ClueMatch } from "../lib/clueGame/engine";
import { existsSync, readFileSync } from "node:fs";
import { kjvStaticUrl } from "../lib/chapterStaticData";

let n = 0;
const ok = (name: string, fn: () => void) => { fn(); n += 1; console.log(`  ok  ${name}`); };
const cards = new Map(GENESIS_CARDS.map((c) => [c.id, c]));

ok("every card has five clues with references, art on disk, a category", () => {
  for (const c of GENESIS_CARDS) {
    assert.equal(c.clues.length, 5, c.id);
    for (const clue of c.clues) assert.ok(clue.text && clue.ref.chapter > 0 && clue.ref.verseEnd >= clue.ref.verseStart, `${c.id}: ${clue.ref.label}`);
    assert.ok(existsSync(`public${c.art}`), c.art);
    assert.ok(["person", "place", "thing"].includes(c.category));
  }
  assert.equal(new Set(GENESIS_CARDS.map((c) => c.id)).size, GENESIS_CARDS.length);
});

ok("every clue reference opens real KJV verses (the reveal's Scripture sheet)", () => {
  for (const c of GENESIS_CARDS) {
    for (const clue of c.clues) {
      const file = `public${kjvStaticUrl(clue.ref.book, clue.ref.chapter)}`;
      assert.ok(existsSync(file), `${c.id}: ${clue.ref.label} has no chapter file ${file}`);
      const verses = (JSON.parse(readFileSync(file, "utf8")) as Array<{ number: number }>).filter(
        (v) => v.number >= clue.ref.verseStart && v.number <= clue.ref.verseEnd,
      );
      assert.equal(verses.length, clue.ref.verseEnd - clue.ref.verseStart + 1, `${c.id}: ${clue.ref.label}`);
    }
  }
});

ok("Noah's 5-point clue is the approved one, and ark/flood wait for the 1-point clue", () => {
  const noah = cards.get("noah")!;
  assert.equal(noah.clues[0].text, "God found me righteous in a world of unrighteousness.");
  assert.equal(noah.clues[0].ref.label, "Genesis 7:1");
  for (const clue of noah.clues.slice(0, 4)) assert.ok(!/\b(ark|flood)\b/i.test(clue.text), clue.text);
});

ok("answers: case, punctuation, 'the', accepted spellings and small typos", () => {
  const noah = cards.get("noah")!;
  assert.ok(isCorrectGuess(noah, "noah"));
  assert.ok(isCorrectGuess(noah, "  NOAH! "));
  assert.ok(isCorrectGuess(cards.get("god")!, "The LORD"));
  assert.ok(isCorrectGuess(cards.get("eve")!, "Eva"));
  assert.ok(!isCorrectGuess(cards.get("eve")!, "Ava"), "no typo tolerance on 3 letters");
  assert.ok(isCorrectGuess({ answer: "Abraham", accepted: [] }, "Abrahm"));
  assert.ok(!isCorrectGuess(cards.get("cain")!, "Abel"));
  assert.ok(!isCorrectGuess(cards.get("cain")!, ""));
});

ok("the shuffle is seeded: same seed, same deal order", () => {
  const ids = GENESIS_CARDS.map((c) => c.id);
  assert.deepEqual(shuffleCards(ids, 42), shuffleCards(ids, 42));
  assert.equal(shuffleCards(ids, 42).slice().sort().join(), ids.slice().sort().join());
});

const start = (seed = 1) => reduceClueMatch(createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed }), { type: "deal", now: 0 }, cards);
const answerOf = (m: ClueMatch) => cards.get(m.round!.cardId)!.answer;

ok("a right guess on the first clue wins 5 and the card", () => {
  const m = reduceClueMatch(start(), { type: "guess", now: 1000, playerId: "me", text: answerOf(start()) }, cards);
  assert.equal(m.phase, "reveal");
  assert.equal(m.scores.me, 5);
  assert.deepEqual(m.piles.me, [m.round!.cardId]);
});

ok("a wrong guess costs the current points, can go negative, and moves on in solo", () => {
  const m = reduceClueMatch(start(), { type: "guess", now: 1000, playerId: "me", text: "Goliath" }, cards);
  assert.equal(m.scores.me, -5);
  assert.equal(m.round!.clueIndex, 1, "solo: no one left to guess, next clue");
});

ok("no negative scores when allowNegative is off", () => {
  const m0 = reduceClueMatch(createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 1, settings: { allowNegative: false } }), { type: "deal", now: 0 }, cards);
  const m = reduceClueMatch(m0, { type: "guess", now: 1, playerId: "me", text: "Goliath" }, cards);
  assert.equal(m.scores.me, 0);
});

ok("waiting is free and the timer walks the clues 5 to 1, then nobody gets the card", () => {
  let m = start();
  m = reduceClueMatch(m, { type: "wait", now: 500, playerId: "me" }, cards);
  assert.equal(m.round!.clueIndex, 1);
  assert.equal(m.scores.me, 0);
  m = reduceClueMatch(m, { type: "tick", now: 500 + 4 * DEFAULT_CLUE_SETTINGS.clueSeconds * 1000 }, cards);
  assert.equal(m.phase, "reveal");
  assert.equal(m.round!.outcome?.kind, "missed");
  assert.equal(m.missed.length, 1);
});

ok("a clue's points match its position: clue 3 is worth 3", () => {
  let m = start();
  m = reduceClueMatch(m, { type: "tick", now: 2 * 10_000 }, cards); // two clues later
  assert.equal(m.round!.clueIndex, 2);
  m = reduceClueMatch(m, { type: "guess", now: 20_001, playerId: "me", text: answerOf(m) }, cards);
  assert.equal(m.scores.me, 3);
});

ok("one official guess per player per clue (two-player table)", () => {
  const sides = [{ id: "a", name: "A" }, { id: "b", name: "B" }];
  const players = [{ id: "pa", name: "A", sideId: "a" }, { id: "pb", name: "B", sideId: "b" }];
  let m = reduceClueMatch(createMatch({ cards: GENESIS_CARDS, sides, players, seed: 3 }), { type: "deal", now: 0 }, cards);
  m = reduceClueMatch(m, { type: "guess", now: 1, playerId: "pa", text: "Goliath" }, cards);
  assert.equal(m.scores.a, -5);
  assert.equal(m.round!.clueIndex, 0, "B can still guess this clue");
  assert.ok(!canGuess(m, "pa"));
  const again = reduceClueMatch(m, { type: "guess", now: 2, playerId: "pa", text: answerOf(m) }, cards);
  assert.equal(again, m, "A's second guess on the same clue is ignored");
  m = reduceClueMatch(m, { type: "guess", now: 3, playerId: "pb", text: answerOf(m) }, cards);
  assert.equal(m.scores.b, 5);
  assert.equal(m.round!.outcome?.kind, "won");
});

ok("the match ends when the deck runs out, highest score wins", () => {
  let m = start(7);
  for (let i = 0; i < GENESIS_CARDS.length; i += 1) {
    m = reduceClueMatch(m, { type: "guess", now: i * 100 + 1, playerId: "me", text: i % 2 ? "nobody" : answerOf(m) }, cards);
    if (m.phase === "clue") m = reduceClueMatch(m, { type: "tick", now: i * 100 + 99_000 }, cards);
    m = reduceClueMatch(m, { type: "deal", now: i * 100 + 50 }, cards);
  }
  assert.equal(m.phase, "over");
  assert.deepEqual(m.winnerSideIds, ["me"]);
});

ok("reaching the target ends the match at the next deal", () => {
  let m = reduceClueMatch(createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 1, settings: { targetScore: 5 } }), { type: "deal", now: 0 }, cards);
  m = reduceClueMatch(m, { type: "guess", now: 1, playerId: "me", text: answerOf(m) }, cards);
  m = reduceClueMatch(m, { type: "deal", now: 2 }, cards);
  assert.equal(m.phase, "over");
  assert.equal(m.dealt, 1);
});

console.log(`\n${n} checks passed.`);
