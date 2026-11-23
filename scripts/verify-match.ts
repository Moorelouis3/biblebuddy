/**
 * Bible Buddy Match: the board rules, checked offline (npm run verify:match).
 * Same idiom as the other verify scripts: plain asserts, no test framework.
 * Swap rules since 2026-11-22 (lib/match/engine.ts).
 */
import assert from "node:assert/strict";
import {
  adjacent,
  COLS,
  createBoard,
  findMove,
  findRuns,
  goalsMet,
  MATCH_LEVELS,
  ORB,
  playSwap,
  jubilee,
  reshuffle,
  ROWS,
  seededRng,
  swapWorks,
  tileArt,
  type Board,
  type IdSource,
  type Pos,
  type Tile,
} from "../lib/match/engine";
import { existsSync } from "node:fs";

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

ok("a new board has nothing lined up and at least one swap, for every board", () => {
  for (const level of MATCH_LEVELS) {
    for (let seed = 1; seed <= 20; seed += 1) {
      const b = createBoard(level.types, seededRng(seed), { next: 1 });
      assert.equal(b.length, ROWS, "9 rows");
      assert.equal(b[0].length, COLS, "7 columns");
      assert.equal(findRuns(b).length, 0, `${level.id}: dealt a run`);
      assert.ok(findMove(b), `${level.id}: no swap`);
    }
  }
});

ok("only side-by-side or above/below tiles swap, never diagonals or far apart", () => {
  assert.ok(adjacent(p(0, 0), p(0, 1)));
  assert.ok(adjacent(p(0, 0), p(1, 0)));
  assert.ok(!adjacent(p(0, 0), p(1, 1)));
  assert.ok(!adjacent(p(0, 0), p(0, 2)));
  assert.ok(!adjacent(p(0, 0), p(0, 0)));
});

ok("a swap that lines nothing up is not a move: nothing changes", () => {
  const b = board(["abcd", "bcda", "cdab"]);
  assert.equal(swapWorks(b, p(0, 0), p(0, 1)), false);
  const res = playSwap(b, p(0, 0), p(0, 1), FILL, rng(), { next: 100 });
  assert.equal(res.valid, false);
  assert.equal(res.final, b);
  assert.equal(res.steps.length, 0);
});

ok("swapping into a row of 3 clears those 3, counts them once, and new tiles drop in", () => {
  // Swapping (1,2) up into row 0 makes a a a.
  const b = board(["aabd", "cdae", "efgh"]);
  const res = playSwap(b, p(0, 2), p(1, 2), FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  const s = res.steps[0];
  assert.equal(s.removed.a, 3);
  assert.deepEqual(s.cleared.map((q) => `${q.r},${q.c}`).sort(), ["0,0", "0,1", "0,2"]);
  assert.equal(res.final.flat().filter(Boolean).length, 12, "full again");
});

ok("a column of 3 clears the same way", () => {
  const b = board(["axc", "aqc", "bad"]);
  const res = playSwap(b, p(2, 0), p(2, 1), FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  assert.equal(res.steps[0].removed.a, 3);
});

ok("a run of 4 clears all 4 and earns a Light Burst that drops in from the top", () => {
  const b = board(["aaxa", "bcad", "defg"]);
  const res = playSwap(b, p(0, 2), p(1, 2), FILL, rng(), { next: 100 });
  const s = res.steps[0];
  assert.equal(s.removed.a, 4, "every matched tile goes");
  assert.equal(s.made.length, 1);
  assert.equal(s.made[0].tile.power, "light");
  assert.equal(s.made[0].tile.type, "a");
  assert.equal(s.made[0].r, 0);
  assert.equal(s.afterFill[0][s.made[0].c]!.power, "light");
});

ok("a run of 5 or more earns an All Match orb", () => {
  const b = board(["aaxaa", "bcade", "defgh"]);
  const res = playSwap(b, p(0, 2), p(1, 2), FILL, rng(), { next: 100 });
  const s = res.steps[0];
  assert.equal(s.removed.a, 5);
  assert.equal(s.made[0].tile.type, ORB);
});

ok("a Light Burst caught in a clear sweeps its whole row; every tile counted once", () => {
  const b = board(["bcdefg", "aAxabc", "cdaefg"]);
  const res = playSwap(b, p(1, 2), p(2, 2), FILL, rng(), { next: 100 });
  const s = res.steps[0];
  assert.deepEqual(s.beams, [{ row: 1 }]);
  assert.equal(s.cleared.length, 6, "the whole row");
  assert.equal(total(s.removed), 6);
});

ok("a run of 4 down earns a Pillar of Fire, which sweeps its whole column", () => {
  const b = board(["axbc", "aqcd", "xade", "aefg"]);
  const res = playSwap(b, p(2, 0), p(2, 1), FILL, rng(), { next: 100 });
  assert.equal(res.steps[0].made[0].tile.power, "pillar");
  // A Pillar of Fire caught in a row of 3 clears its whole column.
  const col = board(["bcd", "xde", "cef", "def"]);
  col[1][0] = { id: 999, type: "a", power: "pillar" } as Tile;
  col[1][1] = { id: 998, type: "a" } as Tile;
  col[0][2] = { id: 997, type: "a" } as Tile;
  const s2 = playSwap(col, p(0, 2), p(1, 2), FILL, rng(), { next: 100 }).steps[0];
  assert.deepEqual(s2.beams, [{ col: 0 }]);
  for (let r = 0; r < 4; r += 1) assert.ok(s2.cleared.some((q) => q.r === r && q.c === 0));
});

ok("an L or T earns a Trumpet Blast; going off clears the 3x3 around it", () => {
  // Row a a _ a, and a column of a below the gap: swapping the a in makes an L.
  const b = board(["aaxa", "bcae", "fgah"]);
  const res = playSwap(b, p(0, 2), p(0, 3), FILL, rng(), { next: 100 });
  // (0,0)(0,1)(0,2) across and (0,2)(1,2)(2,2) down cross at (0,2).
  assert.equal(res.steps[0].made[0].tile.power, "blast");
  const blast = board(["bcdef", "cdefb", "deAfc", "efbcd", "fbcde"]);
  blast[2][2] = { id: 999, type: "a", power: "blast" } as Tile;
  blast[2][3] = { id: 998, type: "a" } as Tile;
  blast[1][4] = { id: 997, type: "a" } as Tile;
  blast[2][4] = { id: 996, type: "x" } as Tile;
  const s = playSwap(blast, p(2, 4), p(1, 4), FILL, rng(), { next: 100 }).steps[0];
  assert.deepEqual(s.beams.find((x) => x.blast)?.blast, { r: 2, c: 2 });
  for (let r = 1; r <= 3; r += 1) for (let c = 1; c <= 3; c += 1) assert.ok(s.cleared.some((q) => q.r === r && q.c === c), "in the blast");
});

ok("combo: a Light Burst and a Pillar of Fire swapped together sweep a whole row and a whole column", () => {
  const b = board(["bcdef", "cdefb", "deAfc", "efbcd"]);
  b[2][3] = { id: 999, type: "f", power: "pillar" } as Tile;
  const res = playSwap(b, p(2, 2), p(2, 3), FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  const cleared = new Set(res.steps[0].cleared.map((q) => `${q.r},${q.c}`));
  for (let c = 0; c < 5; c += 1) assert.ok(cleared.has(`2,${c}`), "the row");
  for (let r = 0; r < 4; r += 1) assert.ok(cleared.has(`${r},3`), "the column where it landed");
});

ok("combo: two Trumpet Blasts make a 5x5 blast; a Trumpet with a Light Burst sweeps 3 rows and 3 columns", () => {
  const big = board(["bcdefbc", "cdefbcd", "defbcde", "efbcdef", "fbcdefb", "bcdefbc"]);
  big[2][2] = { id: 900, type: "d", power: "blast" } as Tile;
  big[2][3] = { id: 901, type: "e", power: "blast" } as Tile;
  const five = playSwap(big, p(2, 2), p(2, 3), FILL, rng(), { next: 100 });
  const cl = new Set(five.steps[0].cleared.map((q) => `${q.r},${q.c}`));
  for (let r = 0; r <= 4; r += 1) for (let c = 1; c <= 5; c += 1) assert.ok(cl.has(`${r},${c}`), `5x5 missing ${r},${c}`);
  const mix = board(["bcdefbc", "cdefbcd", "defbcde", "efbcdef", "fbcdefb", "bcdefbc"]);
  mix[2][2] = { id: 900, type: "d", power: "blast" } as Tile;
  mix[2][3] = { id: 901, type: "e", power: "light" } as Tile;
  const wide = playSwap(mix, p(2, 2), p(2, 3), FILL, rng(), { next: 100 });
  const rowsHit = new Set(wide.steps[0].beams.filter((x) => x.row !== undefined).map((x) => x.row));
  const colsHit = new Set(wide.steps[0].beams.filter((x) => x.col !== undefined).map((x) => x.col));
  assert.ok([1, 2, 3].every((r) => rowsHit.has(r)) && [2, 3, 4].every((c) => colsHit.has(c)), "3 rows and 3 columns");
});

ok("combo: an orb swapped with a power-up turns every tile of that kind into power-ups that all go off", () => {
  const b = board(["*Abc", "dbae", "aefa", "bcde"]);
  const res = playSwap(b, p(0, 0), p(0, 1), FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  // Four a's become sweeps, so far more than the four a's clear.
  assert.ok(res.steps[0].beams.length >= 4, "every a went off");
  assert.ok(res.steps[0].cleared.length > 8, "the sweeps took more than the a's");
});

ok("a 2x2 square clears its four and earns a Dove; a Dove flies to a kind the goals still need", () => {
  const b = board(["bbcd", "cbde", "bdef", "efgh"]);
  // Swap (2,0) b up... the b at (2,0) moves to (1,0): b b / b b square at rows 0-1, cols 0-1.
  const res = playSwap(b, p(1, 0), p(2, 0), FILL, rng(), { next: 100 });
  assert.ok(res.valid, "a square is a move");
  assert.equal(res.steps[0].removed.b, 4);
  assert.ok(res.steps[0].made.some((m) => m.tile.power === "dove"), "made a Dove");
  const withDove = board(["xcde", "cdex", "defc", "efcd"]);
  withDove[0][0] = { id: 950, type: "dove-power", power: "dove" } as Tile;
  const flew = playSwap(withDove, p(0, 0), p(0, 1), FILL, rng(), { next: 100 }, ["x"]);
  assert.ok(flew.valid);
  const flight = flew.steps[0].beams.find((x) => x.dove);
  assert.ok(flight, "the Dove flew");
  const to = flight!.dove!.to;
  assert.equal(withDove[to.r][to.c]!.type, "x", "to a tile the goals need");
});

ok("the Jubilee: spare moves become sweeps that all go off on a won board (up to 8)", () => {
  const level = MATCH_LEVELS[5];
  const ids = { next: 1 };
  const b = createBoard(level.types, seededRng(3), ids);
  const res = jubilee(b, 12, level.types, seededRng(4), ids);
  assert.ok(res.valid);
  assert.equal(res.steps[0].beams.length, 8, "8 sweeps, not 12");
  assert.ok(res.points > 0);
  assert.equal(jubilee(b, 0, level.types, seededRng(4), ids).valid, false, "no spare moves, no Jubilee");
});

ok("swap an orb with a tile: every tile of that kind clears; two orbs clear the board", () => {
  const b = board(["*abc", "dbae", "aefa"]);
  const res = playSwap(b, p(0, 0), p(0, 1), FILL, rng(), { next: 100 });
  assert.ok(res.valid);
  assert.equal(res.steps[0].orbType, "a");
  assert.equal(res.steps[0].removed.a, 4);
  const two = board(["**bc", "dbae", "aefa"]);
  const all = playSwap(two, p(0, 0), p(0, 1), FILL, rng(), { next: 100 });
  assert.equal(all.steps[0].cleared.length, 12);
});

ok("chains: new lines after the fall clear too, and are worth more", () => {
  for (let seed = 1; seed <= 60; seed += 1) {
    const level = MATCH_LEVELS[0];
    const r = seededRng(seed);
    const ids = { next: 1 };
    const b = createBoard(level.types, r, ids);
    const [a, c] = findMove(b)!;
    const res = playSwap(b, a, c, level.types, r, ids);
    for (let i = 1; i < res.steps.length; i += 1) assert.ok(res.steps[i].points >= res.steps[i].cleared.length * 10 * (i + 1), "chain bonus");
  }
});

ok("no swap left: the board reshuffles with the same tiles and has a swap again", () => {
  const types = ["a", "b", "c", "d", "e", "f", "g"];
  const b = createBoard(types, seededRng(5), { next: 1 });
  const again = reshuffle(b, seededRng(6));
  assert.deepEqual(again.flat().map((t) => t!.type).sort(), b.flat().map((t) => t!.type).sort());
  assert.ok(findMove(again));
  assert.equal(findRuns(again).length, 0);
});

ok("goals are met exactly at the target", () => {
  const goals = MATCH_LEVELS[0].goals;
  assert.equal(goalsMet(goals, { sun: 8, globe: 8, tree: 7 }), false);
  assert.equal(goalsMet(goals, { sun: 9, globe: 8, tree: 8 }), true);
});

ok("the boards: Creation and Eden first, numbered in order, every tile has art", () => {
  assert.equal(MATCH_LEVELS[0].id, "creation");
  assert.equal(MATCH_LEVELS[1].id, "eden");
  assert.ok(MATCH_LEVELS.length <= 500);
  MATCH_LEVELS.forEach((l, i) => {
    assert.equal(l.number, i + 1);
    assert.ok(l.types.length >= 4, l.id);
    for (const g of l.goals) assert.ok(l.types.includes(g.type), `${l.id}: goal ${g.type} is not one of its tiles`);
    for (const t of l.types) assert.ok(existsSync(`public${tileArt(t)}`), `${l.id}: missing tile art ${t}`);
    if (l.backgrounds) for (const bg of [l.backgrounds.phone, l.backgrounds.desktop]) assert.ok(existsSync(`public${bg}`), `${l.id}: missing ${bg}`);
  });
  assert.equal(new Set(MATCH_LEVELS.map((l) => l.id)).size, MATCH_LEVELS.length);
});

ok("a long random game never breaks the board (always full, nothing left lined up, a swap, ids unique)", () => {
  for (const level of MATCH_LEVELS) {
    const r = seededRng(99);
    const ids = { next: 1 };
    let b = createBoard(level.types, r, ids);
    for (let turn = 0; turn < 120; turn += 1) {
      const [a, c] = findMove(b)!;
      const res = playSwap(b, a, c, level.types, r, ids);
      assert.ok(res.valid);
      b = res.final;
      assert.equal(b.flat().filter(Boolean).length, ROWS * COLS);
      assert.equal(findRuns(b).length, 0, `${level.id}: a run was left on the board`);
      assert.ok(findMove(b));
      assert.equal(new Set(b.flat().map((t) => t!.id)).size, ROWS * COLS);
    }
  }
});

console.log(`\n${passed} checks passed.`);
