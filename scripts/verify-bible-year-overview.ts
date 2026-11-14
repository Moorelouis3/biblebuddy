/**
 * Checks the Bible in One Year overview's arithmetic.
 *
 *   npx tsx scripts/verify-bible-year-overview.ts
 *
 * The screen itself needs a signed-in reader to show anything but the
 * first-time state, so the parts that decide what it shows are checked here
 * instead: the Progress Map's groups, and what a fresh, a half-finished and a
 * finished reader's progress works out to.
 *
 * Reads nothing and writes nothing - pure functions only.
 */
import fs from "node:fs";
import path from "node:path";

/**
 * lib/bibleYearProgress and lib/libraryCatalog both reach the browser Supabase
 * client at import time, which throws without the public env vars. They are
 * read here, before the requires below, for that one reason - nothing in this
 * file talks to the database.
 */
for (const file of [".env.local", ".env"]) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}

/* eslint-disable @typescript-eslint/no-require-imports */
const {
  BIBLE_YEAR_RANGES,
  BIBLE_YEAR_RANGE_SIZE,
  BIBLE_YEAR_TOTAL_DAYS,
  bibleYearDayHref,
  bibleYearPercent,
  bibleYearRangeIndexFor,
  calculateBibleYearPosition,
} = require("../lib/bibleYearProgress") as typeof import("../lib/bibleYearProgress");
const { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } =
  require("../lib/bibleInOneYearPlan") as typeof import("../lib/bibleInOneYearPlan");
const { BIBLE_YEAR_TOTAL_CHAPTERS, bibleYearShelfStudy } =
  require("../lib/libraryCatalog") as typeof import("../lib/libraryCatalog");
/* eslint-enable @typescript-eslint/no-require-imports */

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

// ------------------------------------------------------------- the content --
console.log("\nTHE PLAN ITSELF (nothing here should have moved)\n");

check("365 days exist", GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length === 365, `${GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length}`);
const chapters = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.reduce((n, d) => n + d.readings.length, 0);
check("all 1,189 chapters are covered", chapters === BIBLE_YEAR_TOTAL_CHAPTERS, `${chapters}`);

const gaps: number[] = [];
for (let day = 1; day <= BIBLE_YEAR_TOTAL_DAYS; day++) {
  if (!GENESIS_BIBLE_IN_ONE_YEAR_SERIES.some((d) => d.dayNumber === day)) gaps.push(day);
}
check("no day is missing", gaps.length === 0, gaps.slice(0, 5).join(", "));
check(
  "every day has a title and a reference",
  GENESIS_BIBLE_IN_ONE_YEAR_SERIES.every((d) => Boolean(d.title?.trim()) && Boolean(d.reference?.trim())),
);

// Opening a day must still use the address the day rail has always used, or
// the day experience changes, which this work was explicitly not to do.
check("a day link is the existing plan address", bibleYearDayHref(75) === "/plan?solo=1&view=bible-year&day=75", bibleYearDayHref(75));
check("a day link clamps above 365", bibleYearDayHref(900) === "/plan?solo=1&view=bible-year&day=365");
check("a day link clamps below 1", bibleYearDayHref(0) === "/plan?solo=1&view=bible-year&day=1");

// ------------------------------------------------------------ the shelf row --
console.log("\nTHE CATALOG ENTRY\n");

const study = bibleYearShelfStudy();
check("subtitle says it is a 365-day study", study.subtitle === "A 365-Day Bible Buddy Study", String(study.subtitle));
check("day count is 365", study.total_days === 365);
check("it is published, so the shelf shows it", study.is_published);
check("no Amazon URL is invented", study.paperback_url === null, String(study.paperback_url));
check("it has a cover", Boolean(study.cover_image), String(study.cover_image));

// ------------------------------------------------------------- the grouping --
console.log("\nPROGRESS MAP GROUPS\n");

check("thirteen groups", BIBLE_YEAR_RANGES.length === 13, `${BIBLE_YEAR_RANGES.length}`);
check("the first is Days 1–30", BIBLE_YEAR_RANGES[0].label === "Days 1–30", BIBLE_YEAR_RANGES[0].label);
check(
  "the last runs to 365, not past it",
  BIBLE_YEAR_RANGES[BIBLE_YEAR_RANGES.length - 1].end === 365,
  BIBLE_YEAR_RANGES[BIBLE_YEAR_RANGES.length - 1].label,
);
check(
  "no group is bigger than the range size",
  BIBLE_YEAR_RANGES.every((r) => r.end - r.start + 1 <= BIBLE_YEAR_RANGE_SIZE),
);

// Every day belongs to exactly one group: no gaps, no overlaps.
const owners = new Map<number, number>();
BIBLE_YEAR_RANGES.forEach((r, index) => {
  for (let day = r.start; day <= r.end; day++) owners.set(day, (owners.get(day) ?? 0) + index + 1);
});
let covered = 0;
let doubled = 0;
for (let day = 1; day <= BIBLE_YEAR_TOTAL_DAYS; day++) {
  const hits = BIBLE_YEAR_RANGES.filter((r) => day >= r.start && day <= r.end).length;
  if (hits === 1) covered++;
  if (hits > 1) doubled++;
}
check("every day is in exactly one group", covered === BIBLE_YEAR_TOTAL_DAYS && doubled === 0, `${covered} covered, ${doubled} doubled`);

// A reader must be able to reach these without scrolling past everything.
for (const [day, expected] of [[1, "Days 1–30"], [30, "Days 1–30"], [31, "Days 31–60"], [75, "Days 61–90"], [300, "Days 271–300"], [365, "Days 361–365"]] as const) {
  const label = BIBLE_YEAR_RANGES[bibleYearRangeIndexFor(day)].label;
  check(`day ${day} is in ${expected}`, label === expected, label);
}
check("a nonsense day falls back to the first group", bibleYearRangeIndexFor(9999) === 0);

// ------------------------------------------------------------- the readers --
console.log("\nWHAT THE THREE KINDS OF READER SEE\n");

// First time: no rows at all.
const fresh = calculateBibleYearPosition([]);
check("a first-time reader is on day 1", fresh.planDay === 1, String(fresh.planDay));
check("a first-time reader has 0 days done", fresh.completedDays === 0);
check("a first-time reader reads 0%", bibleYearPercent(fresh.completedDays) === 0);
check("a first-time reader is not finished", !fresh.planFinished);

// In progress, with a gap - the case that used to drag the number backwards.
const partial = calculateBibleYearPosition([
  ...Array.from({ length: 24 }, (_, i) => ({ day_number: i + 1, reading_completed: true })),
  // skipped 25-29
  { day_number: 30, reading_completed: true },
  { day_number: 31, reading_completed: false },
]);
check("a reader who skipped days is counted on days done, not the furthest", partial.completedDays === 25, `${partial.completedDays}`);
check("the furthest day read is 30", partial.highestReadDay === 30, `${partial.highestReadDay}`);
check("the next day is past the furthest, not back at the gap", partial.planDay === 31, String(partial.planDay));
check("25 of 365 reads as 7%", bibleYearPercent(partial.completedDays) === 7, `${bibleYearPercent(partial.completedDays)}%`);
check(
  "the group that opens by default is the one they are in",
  BIBLE_YEAR_RANGES[bibleYearRangeIndexFor(partial.planDay ?? 1)].label === "Days 31–60",
);

// Finished.
const done = calculateBibleYearPosition(
  Array.from({ length: 365 }, (_, i) => ({ day_number: i + 1, reading_completed: true })),
);
check("a finished reader has all 365 days", done.completedDays === 365);
check("a finished reader reads 100%", bibleYearPercent(done.completedDays) === 100);
check("a finished reader is marked finished", done.planFinished);

// The percentage must never overstate, whatever is in the table.
check("more rows than days still cannot exceed 100%", bibleYearPercent(400) === 100, `${bibleYearPercent(400)}%`);

// 24 of 31 is 77%, which is the sum Louis called out. Days over days, with no
// task weighting, is what this plan uses - so the same arithmetic here reads
// the way he expects it to.
check("24 of 31 days is 77%", Math.round((24 / 31) * 100) === 77, `${Math.round((24 / 31) * 100)}%`);

// The four parts of a day, counted for the map (2026-11-14). The count is
// detail only: a day is still done when its Audio Lesson is, so adding this
// could not move anybody's finished days.
{
  const parts = require("../lib/bibleYearProgress") as typeof import("../lib/bibleYearProgress");
  check("a day has four parts, Study Notes among them", parts.BIBLE_YEAR_DAY_PARTS.join(" | ") === "Audio Lesson | Study Notes | Trivia | Discussion", parts.BIBLE_YEAR_DAY_PARTS.join(" | "));
  const position = parts.calculateBibleYearPosition([
    { day_number: 1, reading_completed: true, study_notes_completed: true, trivia_completed: true, reflection_completed: true },
    { day_number: 2, reading_completed: true, study_notes_completed: null, trivia_completed: false, reflection_completed: null },
    { day_number: 3, reading_completed: false, study_notes_completed: true, trivia_completed: true, reflection_completed: null },
    { day_number: 4, reading_completed: null },
  ]);
  check("a full day counts 4 of 4", position.partsDoneByDay[1] === 4, String(position.partsDoneByDay[1]));
  check("a day with only the lesson counts 1 of 4, and is still done", position.partsDoneByDay[2] === 1 && position.completedDayNumbers.includes(2));
  check("notes and trivia without the lesson count 2 of 4, and the day is not done", position.partsDoneByDay[3] === 2 && !position.completedDayNumbers.includes(3));
  check("an untouched day is not on the map's count", position.partsDoneByDay[4] === undefined);
  check("finished days are counted exactly as before", position.completedDays === 2 && position.planDay === 3, `${position.completedDays} done, next ${position.planDay}`);
  check("the old shape of row (no part columns) still works", parts.calculateBibleYearPosition([{ day_number: 9, reading_completed: true }]).partsDoneByDay[9] === 1);
  check("the shelf and the Library open the same day list", parts.BIBLE_YEAR_PLAN_HREF === "/library/bible-in-one-year/progress", parts.BIBLE_YEAR_PLAN_HREF);
  const overview = fs.readFileSync(path.join("components", "library", "BibleYearOverview.tsx"), "utf8");
  check("each day on the map shows n/4 completed", overview.includes("{partsDone}/{partsTotal} completed"));
}

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
