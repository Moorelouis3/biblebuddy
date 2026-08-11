import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_YEAR_AUDIO_BUCKET } from "../lib/bibleYearAudio";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

/**
 * Publishes rendered episodes to the tts-audio bucket, backing up whatever is
 * currently live to tmp/backup-old-audio/ first. Upload is upsert, so the old
 * object is gone once this runs - the local copy is the only way back.
 */

function arg(name: string, fallback?: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}

const days = (arg("days", "1-10") as string).split("-").map(Number);
const from = days[0];
const to = days[1] ?? days[0];
const skipBackup = process.argv.includes("--no-backup");
const dryRun = process.argv.includes("--dry-run");

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function main() {
  const supabase = admin();
  const backupDir = join(process.cwd(), "tmp", "backup-old-audio");
  mkdirSync(backupDir, { recursive: true });

  for (let day = from; day <= to; day += 1) {
    const padded = String(day).padStart(3, "0");
    const storagePath = `bible-in-one-year/day-${padded}/day-${padded}-audio.mp3`;
    const localPath = join(process.cwd(), "tmp", "bible-in-one-year", `day-${padded}`, `day-${padded}-audio.mp3`);

    if (!existsSync(localPath)) {
      console.log(`day ${padded}  SKIP - no rendered file at ${localPath}`);
      continue;
    }

    if (!skipBackup) {
      const backupPath = join(backupDir, `day-${padded}-audio.mp3`);
      if (existsSync(backupPath)) {
        console.log(`day ${padded}  backup already exists`);
      } else {
        const { data, error } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).download(storagePath);
        if (error || !data) {
          console.log(`day ${padded}  no live version to back up (${error?.message ?? "empty"})`);
        } else {
          writeFileSync(backupPath, Buffer.from(await data.arrayBuffer()));
          console.log(`day ${padded}  backed up -> ${backupPath}`);
        }
      }
    }

    const audio = readFileSync(localPath);
    if (dryRun) {
      console.log(`day ${padded}  DRY RUN would upload ${(audio.length / 1048576).toFixed(1)} MB`);
      continue;
    }

    const { error } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).upload(storagePath, audio, {
      contentType: "audio/mpeg",
      upsert: true,
    });
    if (error) throw new Error(`day ${padded} upload failed: ${error.message}`);
    console.log(`day ${padded}  PUBLISHED ${(audio.length / 1048576).toFixed(1)} MB -> ${storagePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
