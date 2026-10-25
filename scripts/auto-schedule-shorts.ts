import { execFileSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Keeps shorts posting without anyone touching it.
 *
 * Louis, 2026-10-23: "why can you just take the best threads and make shorts...
 * then post 2 of them a day on facebook and IG and i wanna increase youtube
 * shorts to 12 a day, 1 every other hour starting from now... and it
 * automaticly refills itself i wanna be out of it.. everything stems from
 * threads."
 *
 * So this is the whole loop in one pass, and it is meant to be run on a timer
 * rather than by a person:
 *
 *   1. if the candidate pool is low, build more from the best Threads posts;
 *   2. refuse anything that should not go out (see `why`);
 *   3. render what is left;
 *   4. book it, keeping a few days always in hand.
 *
 * TWELVE a day to YouTube, every other hour, and TWO of those twelve also go
 * to Facebook and Instagram. The slot grid runs on odd hours from 05:00 so
 * that 05:00 and 17:00 - the two he asked for - are part of the twelve rather
 * than extra posts on top.
 *
 *   npx tsx scripts/auto-schedule-shorts.ts --dry-run
 *   npx tsx scripts/auto-schedule-shorts.ts
 */

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const SCHEDULE = join(ROOT, "data", "shorts-schedule.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const OUT_DIR = join(ROOT, "tmp", "shorts", "out");

const arg = (name: string, fallback?: string) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};
const DRY = process.argv.includes("--dry-run");

/** Twelve a day, every other hour, on Louis's clock. */
const BERLIN_SLOTS = ["05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00", "01:00", "03:00"];
/** The two of the twelve that also go to Facebook and Instagram. */
const CROSSPOST_AT = new Set(["05:00", "17:00"]);
/** How far ahead to keep booked. Enough that a failed run is not a gap. */
const DAYS_AHEAD = Number(arg("days", "3"));
/** Build more candidates when fewer than this are usable. */
const REFILL_BELOW = 40;
const REFILL_COUNT = 60;

function offsetMinutes(timeZone: string, at: Date): number {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone, hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const p = Object.fromEntries(f.formatToParts(at).map((x) => [x.type, x.value])) as Record<string, string>;
  const asUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour) % 24, Number(p.minute), Number(p.second));
  return (asUtc - at.getTime()) / 60000;
}

/**
 * A Berlin wall-clock slot, as the US Eastern date and time the schedule file
 * stores, plus the instant itself so past slots can be skipped.
 *
 * Converted per date, not once: Berlin and the States change clocks a week
 * apart, and a fixed offset would drift an hour across that week.
 */
function berlinSlot(ymd: string, hhmm: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  let instant = new Date(guess - offsetMinutes("Europe/Berlin", new Date(guess)) * 60000);
  instant = new Date(guess - offsetMinutes("Europe/Berlin", instant) * 60000);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(instant);
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value])) as Record<string, string>;
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour === "24" ? "00" : p.hour}:${p.minute}`, instant, berlin: hhmm };
}

// Limits from the 312 shorts already published - the 90th percentile of each,
// so nine in ten of his own would still pass.
const MAX_LINES = 10;
const MAX_CHARS = 320;
const MAX_LINE = 75;
const REFUSED = /\b(atheis[mt]|atheists)\b/i;

type Candidate = {
  id: string; title?: string; lines?: string[]; bg?: string; sourceText?: string;
  status?: string; origin?: string; score?: number; posted?: string;
};

const readJson = <T,>(p: string, fallback: T): T => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);

function usable(rows: Candidate[], booked: Set<string>) {
  const refusals: Record<string, number> = {};
  const passed: Candidate[] = [];
  for (const c of rows.filter((r) => r.status === "pending")) {
    const note = (r: string) => { refusals[r.replace(/\d+/g, "N")] = (refusals[r.replace(/\d+/g, "N")] || 0) + 1; };
    if (!c.lines?.length || !c.bg) { note("no finished text or background"); continue; }
    const text = c.lines.join(" ");
    if (REFUSED.test(text) || REFUSED.test(c.sourceText || "") || REFUSED.test(c.title || "")) { note("about atheism"); continue; }
    if (c.lines.length > MAX_LINES) { note(`${c.lines.length} lines, over ${MAX_LINES}`); continue; }
    if (text.length > MAX_CHARS) { note(`${text.length} characters, over ${MAX_CHARS}`); continue; }
    if (Math.max(...c.lines.map((l) => l.length)) > MAX_LINE) { note("a line too long for the screen"); continue; }
    if (booked.has(`${c.id}.mp4`)) { note("already scheduled"); continue; }
    passed.push(c);
  }
  passed.sort((a, b) => (b.score || 0) - (a.score || 0));
  // The same post run several times on Threads becomes several identical
  // candidates. Strongest airing wins; the rest go.
  const seen = new Set<string>();
  const good: Candidate[] = [];
  for (const c of passed) {
    const key = c.lines!.join(" ").toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
    if (seen.has(key)) { refusals["the same words as another candidate"] = (refusals["the same words as another candidate"] || 0) + 1; continue; }
    seen.add(key);
    good.push(c);
  }
  return { good, refusals };
}

let rows = readJson<Candidate[]>(PENDING, []);
let schedule = readJson<any[]>(SCHEDULE, []);
let booked = new Set(schedule.map((s) => s.file));

// 1. Refill from the best Threads posts when the pool runs down. This is the
//    "everything stems from threads" step, and the reason nobody has to feed it.
let { good, refusals } = usable(rows, booked);
if (good.length < REFILL_BELOW && !DRY) {
  console.log(`only ${good.length} usable candidates - building ${REFILL_COUNT} more from the best Threads posts`);
  try {
    execFileSync("npx", ["tsx", "scripts/build-shorts-batch.ts", `--count=${REFILL_COUNT}`, "--months=6"],
      { cwd: ROOT, stdio: "ignore", shell: true });
    rows = readJson<Candidate[]>(PENDING, []);
    ({ good, refusals } = usable(rows, booked));
  } catch (e) {
    console.log(`  refill failed, carrying on with what is here: ${String((e as Error).message).slice(0, 90)}`);
  }
}

// 2. Which slots are still empty, between now and DAYS_AHEAD out.
const taken = new Set(schedule.map((s) => `${s.date} ${s.time}`));
const now = Date.now();
const wanted: ReturnType<typeof berlinSlot>[] = [];
for (let day = 0; day <= DAYS_AHEAD; day++) {
  const ymd = new Date(now + day * 86400000).toISOString().slice(0, 10);
  for (const hhmm of BERLIN_SLOTS) {
    const slot = berlinSlot(ymd, hhmm);
    if (slot.instant.getTime() <= now + 15 * 60000) continue;   // past, or too soon to upload
    if (taken.has(`${slot.date} ${slot.time}`)) continue;
    wanted.push(slot);
  }
}
wanted.sort((a, b) => a.instant.getTime() - b.instant.getTime());

console.log(`${good.length} usable candidates, ${wanted.length} empty slots in the next ${DAYS_AHEAD} days`);
if (Object.keys(refusals).length) {
  console.log("refused:");
  for (const [r, n] of Object.entries(refusals).sort((a, b) => b[1] - a[1])) console.log(`   ${n} - ${r}`);
}

const queueRaw = readJson<any>(QUEUE, { shorts: [] });
const queueWrapper = Array.isArray(queueRaw) ? null : queueRaw;
const queueShorts: any[] = Array.isArray(queueRaw) ? queueRaw : (queueRaw.shorts || []);

const take = Math.min(good.length, wanted.length);
let bookedCount = 0;
const crossposted: string[] = [];
for (let i = 0; i < take; i++) {
  const c = good[i];
  const slot = wanted[i];
  const file = `${c.id}.mp4`;
  const alsoSocial = CROSSPOST_AT.has(slot.berlin);
  console.log(`  ${slot.berlin} Berlin ${slot.date} ${slot.time} ET  ${alsoSocial ? "YT+FB+IG" : "YT only "}  ${String(c.title || "").slice(0, 32)}`);
  if (DRY) continue;

  if (!existsSync(join(OUT_DIR, file))) {
    // render-short.ts renders from shorts-queue.json, so the candidate has to
    // be copied there first - the same thing the approval server does.
    if (!queueShorts.some((s: any) => s.id === c.id)) {
      queueShorts.push({ id: c.id, likes: c.score, posted: c.posted, title: c.title, lines: c.lines, bg: c.bg });
      writeFileSync(QUEUE, `${JSON.stringify(queueWrapper ? { ...queueWrapper, shorts: queueShorts } : queueShorts, null, 2)}\n`);
    }
    try {
      execFileSync("npx", ["tsx", "scripts/render-short.ts", `--id=${c.id}`], { cwd: ROOT, stdio: "ignore", shell: true });
    } catch (e) {
      console.log(`     render failed, left pending: ${String((e as Error).message).slice(0, 80)}`);
      continue;
    }
  }
  if (!existsSync(join(OUT_DIR, file))) { console.log("     render produced no file, left pending"); continue; }

  schedule.push({
    file, title: c.title || "Bible Buddy", likes: c.score || 0,
    date: slot.date, time: slot.time,
    caption: (c.sourceText || c.lines!.join(" ")).replace(/\s+/g, " ").trim().slice(0, 280),
    crosspost: alsoSocial,
  });
  booked.add(file);
  const row = rows.find((r) => r.id === c.id);
  if (row) row.status = "approved";
  if (alsoSocial) crossposted.push(file);
  bookedCount++;
}

if (!DRY && bookedCount) {
  writeFileSync(PENDING, `${JSON.stringify(rows, null, 2)}\n`);
  writeFileSync(SCHEDULE, `${JSON.stringify(schedule, null, 2)}\n`);
}
console.log(DRY
  ? "dry run - nothing rendered or booked"
  : `booked ${bookedCount}; ${crossposted.length} of them also go to Facebook and Instagram; schedule holds ${schedule.length}`);
