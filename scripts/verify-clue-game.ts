/** npm run verify:clue-game: the Bible Clue Game's cards, rules and what players may see. */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { GENESIS_CARDS } from "../lib/clueGame/decks/genesis";
import { ALL_CLUE_CARDS, CLUE_DECKS, poolFor } from "../lib/clueGame/catalog";
import { isCorrectGuess } from "../lib/clueGame/answer";
import { artKey } from "../lib/clueGame/ref";
import { kjvStaticUrl } from "../lib/chapterStaticData";
import { createMatch, reduceClueMatch, soloSetup, canGuess, publicView, shuffleCards, DEFAULT_CLUE_SETTINGS, type ClueMatch } from "../lib/clueGame/engine";

let n = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  n += 1;
  console.log(`  ok  ${name}`);
};
const cards = ALL_CLUE_CARDS;
const S = DEFAULT_CLUE_SETTINGS.clueSeconds * 1000;
const R = DEFAULT_CLUE_SETTINGS.revealSeconds * 1000;

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
  const adam = cards.get("adam")!;
  assert.equal(adam.clues[1].ref.label, "Luke 3:23–38");
  assert.equal(adam.clues[4].ref.label, "Genesis 2:7");
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

ok("a round is 10 distinct cards, seeded: same seed, same round", () => {
  const a = createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 42 });
  const b = createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 42 });
  assert.equal(a.deck.length, 10);
  assert.equal(new Set(a.deck).size, 10);
  assert.deepEqual(a.deck, b.deck);
  assert.deepEqual(a.topClue, b.topClue);
  assert.deepEqual(shuffleCards(["x", "y", "z"], 7), shuffleCards(["x", "y", "z"], 7));
});

const start = (seed = 1, settings = {}) =>
  reduceClueMatch(createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed, settings }), { type: "deal", now: 0 }, cards);
const answerOf = (m: ClueMatch) => cards.get(m.round!.cardId)!.answer;

ok("right on the first clue: +5 and the card; the next card deals itself after the reveal", () => {
  let m = reduceClueMatch(start(), { type: "guess", now: 1000, playerId: "me", text: answerOf(start()) }, cards);
  assert.equal(m.phase, "reveal");
  assert.equal(m.scores.me, 5);
  assert.equal(m.piles.me.length, 1);
  m = reduceClueMatch(m, { type: "tick", now: 1000 + R - 1 }, cards);
  assert.equal(m.phase, "reveal");
  m = reduceClueMatch(m, { type: "tick", now: 1000 + R }, cards);
  assert.equal(m.phase, "clue");
  assert.equal(m.dealt, 2);
});

ok("wrong costs the clue's points (negative allowed); waiting is free; 12 seconds a clue", () => {
  const m = reduceClueMatch(start(), { type: "guess", now: 1000, playerId: "me", text: "Goliath" }, cards);
  assert.equal(m.scores.me, -5);
  assert.equal(m.round!.clueIndex, 1);
  let w = reduceClueMatch(start(), { type: "tick", now: S - 1 }, cards);
  assert.equal(w.round!.clueIndex, 0);
  w = reduceClueMatch(w, { type: "tick", now: S }, cards);
  assert.equal(w.round!.clueIndex, 1);
  assert.equal(w.scores.me, 0);
  const off = reduceClueMatch(start(1, { allowNegative: false }), { type: "guess", now: 1, playerId: "me", text: "Goliath" }, cards);
  assert.equal(off.scores.me, 0);
});

ok("after the 1-point clue nobody gets the card; a guess after the clock ran out counts for nothing", () => {
  let m = reduceClueMatch(start(), { type: "tick", now: 5 * S }, cards);
  assert.equal(m.phase, "reveal");
  assert.equal(m.round!.outcome?.kind, "missed");
  const late = start();
  const g = reduceClueMatch(late, { type: "guess", now: S + 5, playerId: "me", text: answerOf(late) }, cards);
  assert.equal(g, late);
  m = reduceClueMatch(m, { type: "tick", now: 5 * S + R }, cards);
  assert.equal(m.dealt, 2);
});

ok("one guess per player per clue, and two racing right answers award the card once", () => {
  const sides = [{ id: "a", name: "A" }, { id: "b", name: "B" }];
  const players = [{ id: "a", name: "A", sideId: "a" }, { id: "b", name: "B", sideId: "b" }];
  let m = reduceClueMatch(createMatch({ cards: GENESIS_CARDS, sides, players, seed: 3 }), { type: "deal", now: 0 }, cards);
  m = reduceClueMatch(m, { type: "guess", now: 1, playerId: "a", text: "Goliath" }, cards);
  assert.ok(!canGuess(m, "a"));
  assert.equal(m.round!.clueIndex, 0, "B can still guess this clue");
  const answer = answerOf(m);
  m = reduceClueMatch(m, { type: "guess", now: 2, playerId: "b", text: answer }, cards);
  const after = reduceClueMatch(m, { type: "guess", now: 3, playerId: "a", text: answer }, cards);
  assert.equal(after.scores.b, 5);
  assert.equal(after.piles.a.length + after.piles.b.length, 1);
});

ok("the round ends after 10 cards; highest score wins", () => {
  let m = start(9);
  for (let i = 0; i < 10; i += 1) {
    const t = m.round!.clueStartedAt; // when this card was dealt
    if (i % 2 === 0) m = reduceClueMatch(m, { type: "guess", now: t + 1, playerId: "me", text: answerOf(m) }, cards);
    else m = reduceClueMatch(m, { type: "tick", now: t + 5 * S }, cards);
    m = reduceClueMatch(m, { type: "tick", now: m.round!.revealedAt! + R }, cards);
  }
  assert.equal(m.phase, "over");
  assert.equal(m.dealt, 10);
  assert.equal(m.scores.me, 25);
  assert.deepEqual(m.winnerSideIds, ["me"]);
});

ok("a host pause stops the clock; resume carries on where it was", () => {
  let m = start();
  m = reduceClueMatch(m, { type: "pause", now: 5000 }, cards);
  m = reduceClueMatch(m, { type: "tick", now: 60_000 }, cards);
  assert.equal(m.round!.clueIndex, 0);
  m = reduceClueMatch(m, { type: "resume", now: 60_000 }, cards);
  m = reduceClueMatch(m, { type: "tick", now: 60_000 + S - 5000 - 1 }, cards);
  assert.equal(m.round!.clueIndex, 0);
  m = reduceClueMatch(m, { type: "tick", now: 60_000 + S - 5000 }, cards);
  assert.equal(m.round!.clueIndex, 1);
});

ok("a player's view holds no answer, reference or later clue before the reveal", () => {
  const m = reduceClueMatch(start(), { type: "tick", now: S }, cards); // on clue 2
  const card = cards.get(m.round!.cardId)!;
  const json = JSON.stringify(publicView(m, cards, S));
  assert.ok(!json.includes(card.teaching.slice(0, 30)), "teaching");
  for (const clue of card.clues) assert.ok(!json.includes(clue.ref.label), clue.ref.label);
  assert.ok(!json.includes(card.clues[2].text), "a later clue");
  assert.ok(!json.includes(`"${card.id}"`), "card id");
  assert.ok(!json.includes(`"answer"`), "answer field");
  const won = reduceClueMatch(m, { type: "guess", now: S + 1, playerId: "me", text: card.answer }, cards);
  assert.ok(JSON.stringify(publicView(won, cards, S + 1)).includes(card.answer));
});

ok("a challenge replays the exact round: same cards, order and clue variants", () => {
  const original = createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 77 });
  const replay = createMatch({ cards: GENESIS_CARDS, ...soloSetup(), seed: 1, cardIds: original.deck, topClue: original.topClue });
  assert.deepEqual(replay.deck, original.deck);
  assert.deepEqual(replay.topClue, original.topClue);
});

console.log(`\n${n} checks passed.`);
