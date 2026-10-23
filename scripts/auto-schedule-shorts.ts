import { execFileSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Picks, renders and books shorts without anyone approving them.
 *
 * Louis, 2026-10-23: "i dont need to approve them just start sending but make
 * sure its real post that make sense, no atheist post, or long post that get
 * cut off." Approval was the bottleneck - the schedule ran dry on 30 September
 * and 83 candidates sat waiting - so the judgement that used to happen by eye
 * happens here instead, and it has to be strict because nothing looks at these
 * before they are public.
 *
 * WHAT IS REFUSED, and why each rule exists:
 *
 *  - Anything about atheists or atheism. Louis asked for it directly, and his
 *    own Threads data agrees: those posts draw an argument, not a reader.
 *  - Anything that would be cut off on screen. The limits are not invented -
 *    they are the 90th percentile of the 312 shorts that have actually gone
 *    out, so nine in ten of his own published shorts would still pass.
 *  - Anything without finished text and a background. The YouTube-origin
 *    candidates are remakes that need a vision pass first; they are not ready
 *    and would render empty.
 *  - Anything already rendered or already scheduled, so a rerun is safe.
 *
 *   npx tsx scripts/auto-schedule-shorts.ts --dry-run
 *   npx tsx scripts/auto-schedule-shorts.ts --limit=14
 */

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const SCHEDULE = join(ROOT, "data", "shorts-schedule.json");
const OUT_DIR = join(ROOT, "tmp", "shorts", "out");

const arg = (name: string, fallback?: string) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};
const DRY = process.argv.includes("--dry-run");
const LIMIT = Number(arg("limit", "14"));

/**
 * The two slots, on Louis's clock.
 *
 * The schedule file holds US EASTERN - upload-shorts.mjs is run with
 * --tz-offset=-04:00 - so a Berlin time has to be converted per date rather
 * than once. It genuinely matters this month: Berlin leaves summer time on 25
 * October and the US on 1 November, so for that week the gap is five hours
 * instead of six, and a fixed Eastern time would drift an hour off.
 */
const BERLIN_SLOTS = ["05:00", "17:00"];

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

/** A Berlin wall-clock slot on a given day, as the Eastern date and time to store. */
function berlinSlotAsEastern(ymd: string, hhmm: string): { date: string; time: string } {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  // Two passes: the offset depends on the instant, which depends on the offset.
  let instant = new Date(guess - offsetMinutes("Europe/Berlin", new Date(guess)) * 60000);
  instant = new Date(guess - offsetMinutes("Europe/Berlin", instant) * 60000);
  const east = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(instant);
  const p = Object.fromEntries(east.map((x) => [x.type, x.value])) as Record<string, string>;
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour === "24" ? "00" : p.hour}:${p.minute}` };
}

// Limits from the 312 shorts that have actually been published - the 90th
// percentile of each, so nine in ten of his own published shorts would pass.
const MAX_LINES = 10;
const MAX_CHARS = 320;
const MAX_LINE = 75;
const REFUSED = /\b(atheis[mt]|atheists)\b/i;

type Candidate = {
  id: string; title?: string; lines?: string[]; bg?: string; sourceText?: string;
  status?: string; origin?: string; score?: number;
};

const rows: Candidate[] = JSON.parse(readFileSync(PENDING, "utf8"));
const schedule: any[] = existsSync(SCHEDULE) ? JSON.parse(readFileSync(SCHEDULE, "utf8")) : [];
const QUEUE = join(ROOT, "data", "shorts-queue.json");
// shorts-queue.json is {_note, shorts}, not a bare array.
const queueRaw: any = existsSync(QUEUE) ? JSON.parse(readFileSync(QUEUE, "utf8")) : { shorts: [] };
const queueWrapper = Array.isArray(queueRaw) ? null : queueRaw;
const queueShorts: any[] = Array.isArray(queueRaw) ? queueRaw : (queueRaw.shorts || []);
const alreadyBooked = new Set(schedule.map((s) => s.file));

function why(c: Candidate): string | null {
  if (!c.lines?.length || !c.bg) return "no finished text or background";
  const text = c.lines.join(" ");
  if (REFUSED.test(text) || REFUSED.test(c.sourceText || "") || REFUSED.test(c.title || "")) return "about atheism";
  if (c.lines.length > MAX_LINES) return `${c.lines.length} lines, over ${MAX_LINES}`;
  if (text.length > MAX_CHARS) return `${text.length} characters, over ${MAX_CHARS}`;
  const longest = Math.max(...c.lines.map((l) => l.length));
  if (longest > MAX_LINE) return `a line of ${longest} characters, over ${MAX_LINE}`;
  if (alreadyBooked.has(`${c.id}.mp4`)) return "already scheduled";
  return null;
}

const candidates = rows.filter((r) => r.status === "pending");
const refusals: Record<string, number> = {};
const passed: Candidate[] = [];
for (const c of candidates) {
  const reason = why(c);
  if (reason) { refusals[reason.replace(/\d+/g, "N")] = (refusals[reason.replace(/\d+/g, "N")] || 0) + 1; continue; }
  passed.push(c);
}
// Strongest first: score is the engagement the original Threads post earned.
passed.sort((a, b) => (b.score || 0) - (a.score || 0));

/**
 * The same short, twice.
 *
 * A post Louis ran several times on Threads becomes several candidates with
 * the same words - three of "Go to the gym. Read your Bible." were queued on
 * consecutive days in the first dry run. Two of them were character-identical
 * and the third swapped one verb. Posting that is the repetition he killed a
 * whole lane over, so the strongest airing of a text wins and the rest go.
 *
 * Compared on the words alone, ignoring case, punctuation and spacing, so a
 * swapped verb is still caught as different but a reflowed line is not.
 */
const seen = new Set<string>();
const good: Candidate[] = [];
for (const c of passed) {
  const key = c.lines!.join(" ").toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
  if (seen.has(key)) { refusals["the same words as another candidate"] = (refusals["the same words as another candidate"] || 0) + 1; continue; }
  seen.add(key);
  good.push(c);
}
const take = good.slice(0, LIMIT);

console.log(`${candidates.length} waiting, ${good.length} pass the rules, taking ${take.length}`);
if (Object.keys(refusals).length) {
  console.log("refused:");
  for (const [r, n] of Object.entries(refusals).sort((a, b) => b[1] - a[1])) console.log(`   ${n} - ${r}`);
}

/** The next free slot, from tomorrow, never backdating. */
function nextSlots(count: number) {
  const used = new Set(schedule.map((s) => `${s.date} ${s.time}`));
  const out: { date: string; time: string }[] = [];
  const day = new Date();
  day.setUTCDate(day.getUTCDate() + 1);
  for (let i = 0; out.length < count && i < 400; i++) {
    const ymd = new Date(day.getTime() + i * 86400000).toISOString().slice(0, 10);
    for (const slot of BERLIN_SLOTS) {
      if (out.length >= count) break;
      const booked = berlinSlotAsEastern(ymd, slot);
      const key = `${booked.date} ${booked.time}`;
      if (used.has(key)) continue;
      used.add(key);
      out.push(booked);
    }
  }
  return out;
}

const slots = nextSlots(take.length);
let booked = 0;
for (let i = 0; i < take.length; i++) {
  const c = take[i];
  const file = `${c.id}.mp4`;
  const slot = slots[i];
  const berlin = BERLIN_SLOTS[i % BERLIN_SLOTS.length];
  console.log(`  ${slot.date} ${slot.time} ET (${berlin} Berlin)  ${String(c.title || "").slice(0, 36).padEnd(36)} ${c.lines!.length} lines`);
  if (DRY) continue;

  if (!existsSync(join(OUT_DIR, file))) {
    // render-short.ts renders from shorts-queue.json, not from the candidate
    // list, so the candidate has to be put there first - the same copy the
    // approval server does when someone clicks approve. Without this every
    // render fails with "No short matched --id=".
    if (!queueShorts.some((s: any) => s.id === c.id)) {
      queueShorts.push({ id: c.id, likes: c.score, posted: (c as any).posted, title: c.title, lines: c.lines, bg: c.bg });
      writeFileSync(QUEUE, `${JSON.stringify(queueWrapper ? { ...queueWrapper, shorts: queueShorts } : queueShorts, null, 2)}\n`);
    }
    try {
      execFileSync("npx", ["tsx", "scripts/render-short.ts", `--id=${c.id}`], { cwd: ROOT, stdio: "ignore", shell: true });
    } catch (e) {
      console.log(`     render FAILED - left pending: ${String((e as Error).message).slice(0, 90)}`);
      continue;
    }
  }
  if (!existsSync(join(OUT_DIR, file))) { console.log("     render produced no file - left pending"); continue; }

  schedule.push({
    file,
    title: c.title || "Bible Buddy",
    likes: c.score || 0,
    date: slot.date,
    time: slot.time,
    caption: (c.sourceText || c.lines!.join(" ")).replace(/\s+/g, " ").trim().slice(0, 280),
  });
  const row = rows.find((r) => r.id === c.id);
  if (row) row.status = "approved";
  booked++;
}

if (!DRY) {
  writeFileSync(PENDING, `${JSON.stringify(rows, null, 2)}\n`);
  writeFileSync(SCHEDULE, `${JSON.stringify(schedule, null, 2)}\n`);
  console.log(`booked ${booked} of ${take.length} attempted; schedule now holds ${schedule.length}`);
} else {
  console.log("dry run - nothing rendered or booked");
}
