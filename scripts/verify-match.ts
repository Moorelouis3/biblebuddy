/**
 * Bible Buddy Match: the board rules, checked offline (npm run verify:match).
 * Same idiom as the other verify scripts: plain asserts, no test framework.
 */
import assert from "node:assert/strict";
import {
  canExtend,
  createBoard,
  findLine,
  goalsMet,
  lineIsValid,
  MATCH_LEVELS,
  ORB,
  playLine,
  reshuffle,
  seededRng,
  type Board,
  type IdSource,
  type Pos,
  type Tile,
} from "../lib/match/engine";

let passed = 0;
function ok(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
}

/** Rows of letters: upper case = a Light Burst of that kind, "*" = an All Match orb. */
function board(rows: string[], ids: IdSource = { next: 1 }): Board {
  return rows.map((line) =>
    line.split("").map((ch) => {
      if (ch === "*") return { id: ids.next++, type: ORB, power: "orb" } as Tile;
      if (ch >= "A" && ch <= "Z") return { id: ids.next++, type: ch.toLowerCase(), power: "light" } as Tile;
      return { id: ids.next++, type: ch } as Tile;
    }),
  );
}
const p = (r: number, c: number): Pos => ({ r, c });
const FILL = ["p", "q", "r", "s", "t", "u", "v"];
const rng = () => seededRng(7);
const total = (o: Record<string, number>) => Object.values(o).reduce((a, n) => a + n, 0);

const PLAIN = ["abcdefg", "cdefgab", "efgabcd", "gabcdef", "bcdefga", "defgabc", "fgabcde"];

ok("a new board always has a line to make, for both boards", () => {
  for (const level of MATCH_LEVELS) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const b = createBoard(level.types, seededRng(seed), { next: 1 });
      assert.equal(b.length, 9, "9 rows");
      assert.equal(b[0].length, 7, "7 columns");
      assert.ok(findLine(b));
    }
  }
});

ok("a line links touching tiles of one kind in any of 8 directions, never twice, never across a gap", () => {
  const b = board(["aax", "xay", "yyy"]);
  assert.ok(canExtend(b, [p(0, 0)], p(0, 1)), "sideways");
  assert.ok(canExtend(b, [p(0, 0), p(0, 1)], p(1, 1)), "down");
  assert.ok(canExtend(b, [p(0, 0)], p(1, 1)), "diagonal");
  assert.equal(canExtend(b, [p(0, 0), p(0, 1)], p(0, 0)), false, "not the same tile twice");
  assert.equal(canExtend(b, [p(0, 0)], p(0, 2)), false, "a different kind");
  assert.equal(canExtend(b, [p(0, 0)], p(2, 2)), false, "not touching");
});

ok("fewer than 3, or a broken line, does nothing and costs nothing", () => {
  const b = board(PLAIN);
  const res = playLine(b, [p(0, 0), p(1, 1)], FILL, rng(), { next: 100 });
  assert.equal(res.valid, false);
  assert.equal(res.final, b);
  assert.equal(lineIsValid(board(["aaxa"]), [p(0, 0), p(0, 1), p(0, 3)]), false);
});

ok("a line of 3 clears those 3, counts them once, and new tiles drop in", () => {
  const b = board(["aaa", "bcd", "efg"]);
  const res = playLine(b, [p(0, 0), p(0, 1), p(0, 2)], FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  assert.equal(res.removed.a, 3);
  assert.equal(res.steps[0].made.length, 0);
  assert.equal(Object.keys(res.steps[0].dropFrom).length, 3);
  assert.equal(res.final.flat().filter(Boolean).length, 9);
});

ok("a line of 5 clears all 5 (every tile counted), and a Light Burst drops in at the top of the last tile's column", () => {
  const b = board(["aaaaa", "bcdef", "cdefb"]);
  const line = [p(0, 0), p(0, 1), p(0, 2), p(0, 3), p(0, 4)];
  const s = playLine(b, line, FILL, rng(), { next: 100 }).steps[0];
  assert.equal(s.made.length, 1);
  assert.equal(s.made[0].tile.power, "light");
  assert.equal(s.made[0].tile.type, "a");
  assert.deepEqual({ r: s.made[0].r, c: s.made[0].c }, { r: 0, c: 4 });
  assert.equal(s.removed.a, 5);
  assert.equal(s.cleared.length, 5, "the last tile goes too");
  for (const q of line) assert.equal(s.afterClear[q.r][q.c], null);
  assert.equal(s.afterFill[0][4]!.power, "light");
});

ok("a Light Burst in a line sweeps its whole row; every tile counted once", () => {
  const b = board(["bcdef", "aAabc", "cdefb"]);
  const s = playLine(b, [p(1, 0), p(1, 1), p(1, 2)], FILL, rng(), { next: 100 }).steps[0];
  assert.deepEqual(s.beams, [{ row: 1 }]);
  assert.equal(s.cleared.length, 5, "the whole row");
  assert.equal(total(s.removed), 5);
});

ok("a line of 7 leaves an All Match orb instead", () => {
  const b = board(["aaaaaaa", "bcdefgb", "cdefgbc"]);
  const line = Array.from({ length: 7 }, (_, c) => p(0, c));
  const s = playLine(b, line, FILL, rng(), { next: 100 }).steps[0];
  assert.equal(s.made[0].tile.type, ORB);
  assert.equal(s.removed.a, 7);
});

ok("an orb joins any line and clears every tile of that line's kind", () => {
  const b = board(["b*bcd", "cdbeb", "bdecf"]);
  assert.ok(canExtend(b, [p(0, 0)], p(0, 1)), "orb joins a b line");
  assert.ok(canExtend(b, [p(0, 0), p(0, 1)], p(0, 2)), "and the line carries on as b");
  const bs = b.flat().filter((t) => t?.type === "b").length;
  const res = playLine(b, [p(0, 0), p(0, 1), p(0, 2)], FILL, rng(), { next: 100 });
  assert.equal(res.steps[0].orbType, "b");
  assert.equal(res.removed.b, bs, "every b on the board, once");
  assert.equal(res.removed[ORB], undefined, "the orb is used up, not collected");
  assert.equal(lineIsValid(board(["***"]), [p(0, 0), p(0, 1), p(0, 2)]), false, "a line of only orbs is nothing");
});

ok("overlapping clears (an orb that also catches Light Bursts) count each tile once and fire each burst once", () => {
  const b = board(["b*bcd", "cdBeb", "bdecB"]);
  const s = playLine(b, [p(0, 0), p(0, 1), p(0, 2)], FILL, rng(), { next: 100 }).steps[0];
  assert.deepEqual(s.beams.map((x) => x.row).sort(), [1, 2]);
  const keys = new Set(s.cleared.map((x) => `${x.r},${x.c}`));
  assert.equal(keys.size, s.cleared.length, "no cell twice");
  assert.equal(total(s.removed), s.cleared.length - 1, "everything but the orb is counted");
});

ok("no line left: the board reshuffles with the same tiles and gains one", () => {
  const stuck = board(PLAIN);
  assert.equal(findLine(stuck), null);
  const next = reshuffle(stuck, seededRng(3));
  const ids = (x: Board) => x.flat().map((t) => t!.id).sort((m, n) => m - n);
  assert.deepEqual(ids(next), ids(stuck));
  assert.ok(findLine(next));
});

ok("goals are met exactly at the target, including on the last move", () => {
  const goals = MATCH_LEVELS[0].goals;
  assert.equal(goalsMet(goals, { sun: 8, globe: 8, tree: 7 }), false);
  assert.equal(goalsMet(goals, { sun: 9, globe: 8, tree: 8 }), true);
});

ok("the two boards as briefed: 7 kinds each, 3 goals of 8, 28 moves, the tree shared", () => {
  const [creation, eden] = MATCH_LEVELS;
  assert.deepEqual(creation.types, ["sun", "moon", "star", "globe", "tree", "lion", "lamb"]);
  assert.deepEqual(eden.types, ["adam", "eve", "orange", "fig", "water-drop", "dove", "tree"]);
  assert.deepEqual(creation.goals.map((g) => `${g.type}${g.count}`), ["sun8", "globe8", "tree8"]);
  assert.deepEqual(eden.goals.map((g) => `${g.type}${g.count}`), ["orange8", "dove8", "tree8"]);
  assert.equal(creation.moves + eden.moves, 56);
});

ok("a long random game never breaks the board (always full, always a line, ids unique)", () => {
  for (const level of MATCH_LEVELS) {
    const r = seededRng(99);
    const ids = { next: 1 };
    let b = createBoard(level.types, r, ids);
    for (let turn = 0; turn < 200; turn += 1) {
      const line = findLine(b)!;
      const res = playLine(b, line, level.types, r, ids);
      assert.ok(res.valid);
      b = res.final;
      assert.equal(b.flat().filter(Boolean).length, 63);
      assert.ok(findLine(b));
      assert.equal(new Set(b.flat().map((t) => t!.id)).size, 63);
    }
  }
});

console.log(`\n${passed} checks passed.`);
