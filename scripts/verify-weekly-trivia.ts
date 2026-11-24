/**
 * Weekly Bible Trivia checks (lib/clueGame/weekly.ts). Offline: the real
 * question bank, no database. Run: npm run verify:weekly-trivia
 */
import "../lib/clueGame/bank/all";
import { CLUE_BANK } from "../lib/clueGame/bank";
import { WEEKLY_THEMES, drawWeek, isPostingTime, nextTheme, themePool, weekKeyFor, weeklyPostText } from "../lib/clueGame/weekly";
import { readClueChallenge } from "../components/feed/ClueChallengePost";

let failed = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
  if (!ok) failed++;
};

const bank = [...CLUE_BANK.values()];

for (const t of WEEKLY_THEMES) {
  const pool = themePool(t, bank);
  check(`theme ${t.key} has at least 10 questions`, pool.length >= 10, `${pool.length}`);
}
check("the first week is The 12 Disciples", nextTheme([], () => true).key === "twelve_disciples");

// Rotation: every theme once before any comes back, so no back and forth.
const history: Array<{ key: string; week: string }> = [];
for (let i = 0; i < WEEKLY_THEMES.length * 2; i++) {
  const t = nextTheme(history, () => true);
  history.push({ key: t.key, week: `2027-${String(Math.floor(i / 28) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}` });
}
const firstRound = new Set(history.slice(0, WEEKLY_THEMES.length).map((h) => h.key));
check("every theme has a week before any repeats", firstRound.size === WEEKLY_THEMES.length);
check("the second round keeps the same order", history[WEEKLY_THEMES.length].key === history[0].key);

const disciples = themePool(WEEKLY_THEMES[0], bank);
const w1 = drawWeek(disciples, new Set(), 20261124);
check("a week is 10 different questions", w1.length === 10 && new Set(w1.map((q) => q.id)).size === 10);
const w2 = drawWeek(disciples, new Set(w1.map((q) => q.id)), 20270302);
check("the theme's next week uses new questions", w2.every((q) => !w1.some((p) => p.id === q.id)));

// Weeks start Tuesday 12:00 New York (17:00 UTC in winter, 16:00 in summer).
check("Tue 24 Nov 11:59 NY is still last week", weekKeyFor(new Date("2026-11-24T16:59:00Z")) === "2026-11-17");
check("Tue 24 Nov 12:00 NY starts the week", weekKeyFor(new Date("2026-11-24T17:00:00Z")) === "2026-11-24");
check("Mon 30 Nov night is the same week", weekKeyFor(new Date("2026-12-01T04:00:00Z")) === "2026-11-24");
check("summer: Tue 12:00 EDT is 16:00 UTC", weekKeyFor(new Date("2027-06-08T16:00:00Z")) === "2027-06-08");
check("posting time: not before noon", !isPostingTime(new Date("2026-11-24T16:00:00Z")));
check("posting time: noon Tuesday", isPostingTime(new Date("2026-11-24T17:00:00Z")));
check("posting time: not Wednesday", !isPostingTime(new Date("2026-11-25T17:00:00Z")));

// The Feed card reads the post text back.
const weekly = { key: "twelve_disciples", title: "The 12 Disciples", intro: WEEKLY_THEMES[0].intro, week: "2026-11-24" };
const open = readClueChallenge(weeklyPostText({ id: "W261124", weekly, attempts: 3, leaderName: "Louis Moore", leaderScore: 8420 }));
check("feed card reads the open week", !!open?.weekly && open.weekly.title === "The 12 Disciples" && !open.weekly.closed && open.played === 3 && open.leader === "Louis Moore" && open.leaderScore === 8420 && open.id === "W261124");
check("feed card keeps the intro", open?.weekly?.intro === WEEKLY_THEMES[0].intro, open?.weekly?.intro);
const fresh = readClueChallenge(weeklyPostText({ id: "W261124", weekly, attempts: 0, leaderName: null, leaderScore: null }));
check("feed card with nobody yet", fresh?.played === 0 && fresh.leader === null);
const done = readClueChallenge(weeklyPostText({ id: "W261124", weekly: { ...weekly, closed: true, winner: { userId: "x", name: "Ann Lee", score: 9100 } }, attempts: 5, leaderName: "Ann Lee", leaderScore: 9100 }));
check("feed card reads the winner", !!done?.weekly?.closed && done.weekly.winner?.name === "Ann Lee" && done.weekly.winner.score === 9100);
check("a weekly post is not read as a chain post", !open?.chain);

if (failed) {
  console.log(`\n${failed} failed`);
  process.exit(1);
}
console.log("\nAll weekly trivia checks pass.");
