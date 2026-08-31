/**
 * Render and publish every Bible in One Year day whose audio is missing OR
 * older than its script.
 *
 * The day writer agent runs in the cloud, where there is no OPENAI_API_KEY and
 * no Supabase service key, so it can only write the script and push it. This
 * closes the loop from a machine that does have the keys:
 *
 *   npx tsx scripts/render-pending-bible-year-days.ts
 *   npx tsx scripts/render-pending-bible-year-days.ts --dry
 *
 * WHY IT CHECKS DATES: this script used to ask only "does an audio file
 * exist?". When the agent rewrote days 13-32 to the Day 1 standard, audio for
 * those days already existed from an earlier draft, so the script reported
 * "nothing pending" and every one of those days quietly kept serving audio of
 * the OLD writing - for months. A day is now stale when its script file was
 * committed after its audio was uploaded, which catches a rewrite as well as a
 * first render.
 */
import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_YEAR_AUDIO_BUCKET, getBibleYearAudioStoragePath } from "../lib/bibleYearAudio";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const dryRun = process.argv.includes("--dry");
const RENDERER = "scripts/render-bible-year-day.ts";

/**
 * Day number -> the lib file holding that day's script, read out of the
 * renderer's own imports and DAY_SCRIPTS map so the two can never drift.
 */
function scriptFileByDay(): Map<number, string> {
  const source = readFileSync(RENDERER, "utf8");

  const fileByConst = new Map<string, string>();
  for (const m of source.matchAll(/^import \{ (BIBLE_YEAR_DAY_[A-Z_]+_SCRIPT) \} from "(\.\.\/lib\/[^"]+)"/gm)) {
    fileByConst.set(m[1], `${m[2].replace("../", "")}.ts`);
  }

  const block = source.slice(source.indexOf("const DAY_SCRIPTS"));
  const body = block.slice(0, block.indexOf("};"));

  const out = new Map<number, string>();
  for (const m of body.matchAll(/^\s*(\d+):\s*(BIBLE_YEAR_DAY_[A-Z_]+_SCRIPT)\s*,/gm)) {
    const file = fileByConst.get(m[2]);
    if (file) out.set(Number(m[1]), file);
  }
  return out;
}

/** When this file was last committed, as an epoch ms. 0 if git cannot say. */
function lastCommitMs(file: string): number {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim();
    return iso ? Date.parse(iso) : 0;
  } catch {
    return 0;
  }
}

type DayState = { day: number; reason: "missing" | "stale" | "current"; audioAt?: string; scriptAt?: string };

async function inspect(days: Map<number, string>): Promise<DayState[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const states: DayState[] = [];
  for (const [day, file] of [...days.entries()].sort((a, b) => a[0] - b[0])) {
    const path = getBibleYearAudioStoragePath(day);
    const folder = path.slice(0, path.lastIndexOf("/"));
    const name = path.slice(path.lastIndexOf("/") + 1);
    const { data } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).list(folder, { search: name });
    const hit = (data || []).find((item: any) => item.name === name) as any;

    if (!hit) {
      states.push({ day, reason: "missing" });
      continue;
    }

    // updated_at, not created_at: a re-render overwrites in place.
    const audioMs = Date.parse(hit.updated_at || hit.created_at || "") || 0;
    const scriptMs = lastCommitMs(file);
    const stale = scriptMs > 0 && audioMs > 0 && scriptMs > audioMs;
    states.push({
      day,
      reason: stale ? "stale" : "current",
      audioAt: new Date(audioMs).toISOString().slice(0, 16),
      scriptAt: new Date(scriptMs).toISOString().slice(0, 16),
    });
  }
  return states;
}

async function main() {
  const days = scriptFileByDay();
  if (!days.size) throw new Error("Could not read DAY_SCRIPTS out of the renderer.");

  const states = await inspect(days);
  const missing = states.filter((s) => s.reason === "missing");
  const stale = states.filter((s) => s.reason === "stale");
  const pending = [...missing, ...stale].sort((a, b) => a.day - b.day);

  console.log(`${states.length} days scripted: ${states.length - pending.length} current, ${missing.length} missing, ${stale.length} stale.`);
  for (const s of stale) {
    console.log(`  day ${String(s.day).padStart(3)} STALE  audio ${s.audioAt}  <  script ${s.scriptAt}`);
  }
  if (missing.length) console.log(`  missing: ${missing.map((s) => s.day).join(", ")}`);

  if (!pending.length) {
    console.log("Nothing pending.");
    return;
  }
  if (dryRun) {
    console.log(`\nWould render: ${pending.map((s) => s.day).join(", ")}`);
    return;
  }

  // Keep going when a day fails. Day 41 threw "No Scripture found for numbers
  // 13" and took days 42-54 down with it, so a single data gap cost thirteen
  // days of audio. Failures are collected and reported at the end instead.
  const failures: Array<{ day: number; message: string }> = [];

  for (const { day } of pending) {
    console.log(`\n--- day ${day} ---`);
    try {
      execFileSync("npx", ["tsx", RENDERER, `--day=${day}`, "--upload"], {
        stdio: "inherit",
        shell: process.platform === "win32",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push({ day, message });
      console.log(`  day ${day} FAILED, continuing: ${message.split("\n")[0]}`);
    }
  }

  console.log(`\nDone. Published ${pending.length - failures.length} of ${pending.length} day(s).`);
  if (failures.length) {
    console.log("Failed:");
    for (const f of failures) console.log(`  day ${f.day}: ${f.message.split("\n")[0]}`);
    process.exitCode = 1;
  }
}

void main();
