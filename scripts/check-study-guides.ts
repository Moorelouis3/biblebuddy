/**
 * Does every published study guide follow the Wisdom of Proverbs format?
 *
 *   npm run check:study-guides            every published study, every day, read from the database
 *   npm run check:study-guides -- --all   unpublished studies too
 *
 * Read-only. Exits 1 if any published day breaks a rule in
 * lib/studyGuideFormat.ts (a missing day, a missing reading, a wall of text,
 * a broken heading, a question cut in two). Warnings do not fail it.
 *
 * Run it after importing or editing a study, and before publishing one. The
 * rules in words: docs/STUDY_GUIDE_FORMAT.md.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { checkStudyGuide, type StudyGuideDay } from "../lib/studyGuideFormat";

config({ path: ".env.local" });

const ALL = process.argv.includes("--all");

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are needed in .env.local");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data: studies, error } = await supabase
    .from("devotionals")
    .select("id,title,total_days,is_published,sort_order")
    .order("sort_order", { ascending: true, nullsFirst: false });
  if (error) throw new Error(`devotionals: ${error.message}`);

  let failed = 0;
  for (const study of (studies || []).filter((row) => ALL || row.is_published)) {
    // 60 days is the longest study; the 1000-row cap is nowhere near.
    const { data: days, error: daysError } = await supabase
      .from("devotional_days")
      .select("day_number,day_title,devotional_text,bible_reading_book,bible_reading_chapter,reflection_question")
      .eq("devotional_id", study.id)
      .order("day_number", { ascending: true })
      .limit(1000);
    if (daysError) throw new Error(`${study.title}: ${daysError.message}`);

    const results = checkStudyGuide(Number(study.total_days) || 0, (days || []) as StudyGuideDay[]);
    const errors = results.filter((result) => result.finding.level === "error");
    const warnings = results.filter((result) => result.finding.level === "warning");
    const label = `${study.title} (${(days || []).length}/${study.total_days} days${study.is_published ? "" : ", not published"})`;
    if (errors.length === 0) {
      console.log(`  ok  ${label}${warnings.length ? `, ${warnings.length} warning(s)` : ""}`);
    } else {
      if (study.is_published) failed += 1;
      console.log(`${study.is_published ? "FAIL" : "note"}  ${label}: ${errors.length} problem(s) on ${new Set(errors.map((e) => e.day)).size} day(s)`);
      for (const result of errors.slice(0, 12)) console.log(`        day ${result.day}: ${result.finding.message}`);
      if (errors.length > 12) console.log(`        ... and ${errors.length - 12} more`);
    }
    if (process.argv.includes("--warnings")) {
      for (const result of warnings) console.log(`        (day ${result.day}: ${result.finding.message})`);
    }
  }

  if (failed) {
    console.error(`\n${failed} published study guide(s) do not follow the format. See docs/STUDY_GUIDE_FORMAT.md.`);
    process.exit(1);
  }
  console.log("\nEvery published study guide follows the format.");
}

main().catch((problem) => {
  console.error(problem);
  process.exit(1);
});
