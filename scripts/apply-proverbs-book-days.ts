/**
 * Apply the new Wisdom of Proverbs book content to the live devotional
 * (2026-09-05). Reads the 31 adapted day JSONs produced from the book
 * interior and updates devotional_days in place - titles, devotional text,
 * and reflection questions. Reading assignments (Proverbs N) are untouched.
 *
 *   npx tsx scripts/apply-proverbs-book-days.ts <dir-with-day-NN.json> [--dry]
 *
 * A full backup of the previous rows is in
 * data/proverbs-devotional-days-backup-2026-09-05.json.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "c0ca300a-c0e9-47b8-84c5-99aca743a203";
const DRY = process.argv.includes("--dry");
const dir = process.argv[2];

async function main() {
  if (!dir || !fs.existsSync(dir)) throw new Error("Pass the directory holding day-NN.json files");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const files = fs.readdirSync(dir).filter((f) => /^day-\d{2}\.json$/.test(f)).sort();
  if (files.length !== 31) throw new Error(`Expected 31 day files, found ${files.length}`);

  const seen = new Set<number>();
  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    const day = Number(raw.day_number);
    const title = String(raw.day_title || "").trim();
    const text = String(raw.devotional_text || "").trim();
    const question = String(raw.reflection_question || "").trim();
    if (!day || day < 1 || day > 31 || seen.has(day)) throw new Error(`${file}: bad day_number ${raw.day_number}`);
    if (title.length < 4) throw new Error(`${file}: missing title`);
    if (text.length < 2500) throw new Error(`${file}: devotional_text suspiciously short (${text.length})`);
    if (question.length < 10 || !question.includes("?")) throw new Error(`${file}: reflection_question looks wrong`);
    seen.add(day);

    if (DRY) {
      console.log(`[dry] Day ${day}: "${title}" (${text.length} chars) Q: ${question.slice(0, 60)}...`);
      continue;
    }
    const { error, count } = await supabase
      .from("devotional_days")
      .update({ day_title: title, devotional_text: text, reflection_question: question }, { count: "exact" })
      .eq("devotional_id", DEVOTIONAL_ID)
      .eq("day_number", day);
    if (error) throw new Error(`Day ${day}: ${error.message}`);
    if (count !== 1) throw new Error(`Day ${day}: expected to update 1 row, updated ${count}`);
    console.log(`updated Day ${day}: ${title}`);
  }

  if (!DRY) {
    // The devotional's own description takes the book's back-cover framing.
    const description =
      "Proverbs has 31 chapters. This study gives you one for each day of the month. " +
      "Every day follows the same path: read the actual chapter, understand what is happening in it, " +
      "see where it connects to the rest of Scripture, bring it into your real life, answer questions " +
      "that are hard to dodge, do one concrete thing, and pray about it honestly. " +
      "This is not a book of daily encouragement. It is a study built to change how you make decisions.";
    const { error } = await supabase
      .from("devotionals")
      .update({ description, subtitle: "A 31-Day Bible Buddy Study" })
      .eq("id", DEVOTIONAL_ID);
    if (error) throw new Error(`devotional description: ${error.message}`);
    console.log("updated devotional description + subtitle");
  }
  console.log(DRY ? "Dry run complete." : "All 31 days updated from the book.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
