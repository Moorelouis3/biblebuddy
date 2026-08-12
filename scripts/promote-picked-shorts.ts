import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Books slots for picked shorts that now have a script.
 *
 * Rendering is left to the approval server: it re-queues anything marked
 * approved without a video on startup, so this only has to do the bookkeeping.
 *
 *   npx tsx scripts/promote-picked-shorts.ts --dry-run
 *   npx tsx scripts/promote-picked-shorts.ts
 */

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const SCHEDULE = join(ROOT, "data", "shorts-schedule.json");
const SLOTS = ["02:00", "06:00", "12:00", "16:00", "20:00"];
const dryRun = process.argv.includes("--dry-run");

const readJson = <T,>(p: string, fallback: T): T =>
  existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback;

const rows = readJson<any[]>(PENDING, []);
const queueRaw = readJson<any>(QUEUE, { shorts: [] });
const queueWrapper = Array.isArray(queueRaw) ? null : queueRaw;
const shorts: any[] = Array.isArray(queueRaw) ? queueRaw : (queueRaw.shorts || []);
const schedule = readJson<any[]>(SCHEDULE, []);

const ready = rows.filter((r) => r.status === "picked" && r.lines?.length && r.bg);
console.log(`${ready.length} picked shorts have a script and are ready to book`);

const taken = new Set(schedule.map((r) => `${r.date} ${r.time}`));
const lastDate = schedule.map((r) => r.date).sort().pop();
const cursor = lastDate ? new Date(`${lastDate}T00:00:00Z`) : new Date();

function nextSlot() {
  for (let guard = 0; guard < 900; guard += 1) {
    const date = cursor.toISOString().slice(0, 10);
    for (const time of SLOTS) {
      const key = `${date} ${time}`;
      if (!taken.has(key)) { taken.add(key); return { date, time }; }
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  throw new Error("ran out of slots");
}

let booked = 0;
for (const row of ready) {
  const slot = nextSlot();
  if (!dryRun) {
    if (!shorts.some((s) => s.id === row.id)) {
      shorts.push({ id: row.id, likes: row.score, posted: row.posted, title: row.title, lines: row.lines, bg: row.bg });
    }
    schedule.push({
      file: `${row.id}.mp4`, title: row.title, likes: row.score,
      date: slot.date, time: slot.time,
      caption: (row.sourceText || row.lines.filter(Boolean).join(" ")).slice(0, 300),
    });
    row.status = "approved";
    row.scheduledFor = `${slot.date} ${slot.time}`;
  }
  booked += 1;
  if (booked <= 3) console.log(`  ${row.title} -> ${slot.date} ${slot.time}`);
}

if (!dryRun) {
  writeFileSync(QUEUE, JSON.stringify(queueWrapper ? { ...queueWrapper, shorts } : shorts, null, 2));
  writeFileSync(SCHEDULE, JSON.stringify(schedule, null, 2));
  writeFileSync(PENDING, JSON.stringify(rows, null, 2));
}

const dates = schedule.map((r) => r.date).sort();
const last = dates[dates.length - 1];
const daysOut = Math.round((new Date(`${last}T00:00:00Z`).getTime() - Date.now()) / 86400000);
console.log(`\n${dryRun ? "would book" : "booked"} ${booked}`);
console.log(`schedule now ${schedule.length} slots, through ${last} (${daysOut} days out)`);
if (!dryRun) console.log("Restart the approval server to render them.");
