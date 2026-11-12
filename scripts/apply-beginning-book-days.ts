/**
 * Apply the restored formatting of The Beginning of Everything to the live
 * devotional (2026-11-12). Same job, same shape, as the existing
 * scripts/apply-proverbs-book-days.ts did for Proverbs on 2026-09-05.
 *
 *   npx tsx scripts/apply-beginning-book-days.ts --backup-only
 *   npx tsx scripts/apply-beginning-book-days.ts --dry
 *   npx tsx scripts/apply-beginning-book-days.ts
 *
 * Reads the three seed files in data/beginning-of-everything and writes only
 * `devotional_text` on the 21 rows of this one devotional. Titles, reflection
 * questions, reading assignments, ids and timestamps are not touched, and
 * nothing outside DEVOTIONAL_ID can be reached from here.
 *
 * WHY THIS EXISTS. The study's text was imported out of the print interior.
 * The print book letter-spaces its section headings and its Scripture
 * references - "I N T H E B E G I N N I N G G O D" - and the import kept the
 * spaces and dropped the structure around them. So every day arrived as 6 to 9
 * blocks of 1,200-1,900 characters with its headings and references spelled
 * out one letter at a time in the middle of a sentence. It was the only study
 * in the app with no formatting markup at all.
 * scripts/build-beginning-formatting.ts rebuilds the formatting from the print
 * PDF and proves, letters and digits only, that no word changes.
 *
 * These are database rows, not code: whatever this script writes is live the
 * moment it finishes. There is no build to wait for.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "486cff66-b50e-488d-9330-3951589e6fa8"; // The Beginning of Everything
const TOTAL_DAYS = 21;
const SEED_DIR = path.join("data", "beginning-of-everything");
const SEED_FILES = ["days-01-07.json", "days-08-14.json", "days-15-21.json"];
export const BACKUP_PATH = path.join("data", "beginning-devotional-days-backup-2026-11-12.json");

const DRY = process.argv.includes("--dry");
const BACKUP_ONLY = process.argv.includes("--backup-only");

type SeedDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  reflection_question?: string;
};

export function readSeedDays(): SeedDay[] {
  const days: SeedDay[] = [];
  for (const file of SEED_FILES) {
    const full = path.join(SEED_DIR, file);
    if (!fs.existsSync(full)) throw new Error(`Missing seed file ${full}`);
    const parsed = JSON.parse(fs.readFileSync(full, "utf8"));
    if (!Array.isArray(parsed)) throw new Error(`${full} is not an array`);
    days.push(...parsed);
  }
  if (days.length !== TOTAL_DAYS) {
    throw new Error(`Expected ${TOTAL_DAYS} seed days, found ${days.length}`);
  }
  const seen = new Set<number>();
  for (const day of days) {
    const n = Number(day.day_number);
    if (!Number.isInteger(n) || n < 1 || n > TOTAL_DAYS || seen.has(n)) {
      throw new Error(`Bad or duplicate day_number ${day.day_number}`);
    }
    seen.add(n);
    if (!String(day.devotional_text || "").trim()) throw new Error(`Day ${n}: empty devotional_text`);
  }
  return days.sort((a, b) => a.day_number - b.day_number);
}

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env (.env.local)");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function main() {
  const supabase = client();

  // Always take a backup of what is live before writing anything.
  const { data: live, error: liveError } = await supabase
    .from("devotional_days")
    .select("*")
    .eq("devotional_id", DEVOTIONAL_ID)
    .order("day_number")
    .range(0, 999); // PostgREST caps responses at 1000 rows; be explicit.
  if (liveError) throw new Error(`Reading live rows: ${liveError.message}`);
  if (!live || live.length !== TOTAL_DAYS) {
    throw new Error(`Expected ${TOTAL_DAYS} live rows, found ${live?.length ?? 0}. Refusing to write.`);
  }

  if (!fs.existsSync(BACKUP_PATH)) {
    fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(live, null, 1)}\n`);
    console.log(`Backup written: ${BACKUP_PATH} (${live.length} rows)`);
  } else {
    console.log(`Backup already present, left alone: ${BACKUP_PATH}`);
  }
  if (BACKUP_ONLY) return;

  const seed = readSeedDays();
  let changed = 0;
  for (const day of seed) {
    const current = live.find((row: any) => Number(row.day_number) === day.day_number);
    if (!current) throw new Error(`Day ${day.day_number} missing from the live rows`);
    const next = day.devotional_text;
    if (current.devotional_text === next) {
      console.log(`Day ${String(day.day_number).padStart(2)}  unchanged`);
      continue;
    }
    changed++;
    const blocks = next.split(/\n\s*\n/).filter((block) => block.trim()).length;
    const was = String(current.devotional_text || "").split(/\n\s*\n/).filter((b) => b.trim()).length;
    console.log(
      `Day ${String(day.day_number).padStart(2)}  ${DRY ? "would update" : "updating"}  blocks ${was} -> ${blocks}`,
    );
    if (DRY) continue;
    const { error } = await supabase
      .from("devotional_days")
      .update({ devotional_text: next })
      .eq("devotional_id", DEVOTIONAL_ID)
      .eq("day_number", day.day_number);
    if (error) throw new Error(`Day ${day.day_number}: ${error.message}`);
  }
  console.log(`\n${DRY ? "Dry run." : "Done."} ${changed} of ${TOTAL_DAYS} days ${DRY ? "would change" : "changed"}.`);
}

if (process.argv[1] && process.argv[1].includes("apply-beginning-book-days")) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
