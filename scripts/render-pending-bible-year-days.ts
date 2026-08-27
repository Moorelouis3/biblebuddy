/**
 * Render and publish every Bible in One Year day that has a script but no
 * audio in storage yet.
 *
 * The day writer agent runs in the cloud, where there is no OPENAI_API_KEY and
 * no Supabase service key, so it can only write the script and push it. This
 * closes the loop from a machine that does have the keys:
 *
 *   npx tsx scripts/render-pending-bible-year-days.ts
 *
 * It asks storage which days are actually missing rather than trusting a list,
 * so it is safe to run any time and will not re-render or re-charge for a day
 * that is already published. Pass --dry to see what it would do.
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

/** The days that have a script, read straight from the renderer's DAY_SCRIPTS map. */
function daysWithScripts(): number[] {
  const source = readFileSync("scripts/render-bible-year-day.ts", "utf8");
  const block = source.slice(source.indexOf("const DAY_SCRIPTS"));
  const body = block.slice(0, block.indexOf("};"));
  return [...body.matchAll(/^\s*(\d+):/gm)].map((m) => Number(m[1])).sort((x, y) => x - y);
}

async function publishedDays(days: number[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const live = new Set<number>();
  for (const day of days) {
    const path = getBibleYearAudioStoragePath(day);
    const folder = path.slice(0, path.lastIndexOf("/"));
    const name = path.slice(path.lastIndexOf("/") + 1);
    const { data } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).list(folder, { search: name });
    if (data?.some((item) => item.name === name)) live.add(day);
  }
  return live;
}

async function main() {
  const scripted = daysWithScripts();
  const live = await publishedDays(scripted);
  const pending = scripted.filter((day) => !live.has(day));

  console.log(`${scripted.length} days scripted, ${live.size} already published.`);
  if (!pending.length) {
    console.log("Nothing pending.");
    return;
  }

  console.log(`Pending: ${pending.join(", ")}`);
  if (dryRun) return;

  for (const day of pending) {
    console.log(`\n--- day ${day} ---`);
    execFileSync("npx", ["tsx", "scripts/render-bible-year-day.ts", `--day=${day}`, "--upload"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  }
  console.log(`\nDone. Published ${pending.length} day(s).`);
}

void main();
