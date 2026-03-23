/**
 * reformat-devotionals.mjs
 *
 * Fetches every devotional_day from Supabase, reformats the text into
 * short readable paragraphs using the Anthropic API, then updates the DB.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/reformat-devotionals.mjs
 *
 * Optional: only reformat a specific devotional title:
 *   DEVOTIONAL_TITLE="The Wisdom of Proverbs" ANTHROPIC_API_KEY=sk-ant-... node scripts/reformat-devotionals.mjs
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dntaonyrfdzedukvwcwk.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudGFvbnlyZmR6ZWR1a3Z3Y3drIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI1MzQ2NCwiZXhwIjoyMDc5ODI5NDY0fQ._0wEiXC1VkzjqWgos611n8CTy96GwzDQiKzhQO56sAE";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FILTER_TITLE = process.env.DEVOTIONAL_TITLE || null;

if (!ANTHROPIC_API_KEY) {
  console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a text formatter. Your job is to take dense devotional text and reformat it for easy mobile reading — matching the style of a well-written Christian devotional book.

RULES:
- Never change the words, meaning, or content. Only change the paragraph breaks.
- Maximum 3 sentences per paragraph. Most paragraphs should be 1-2 sentences.
- Very short punchy sentences (under 12 words) should usually stand alone on their own line.
- Bible quotes should always be on their own line, separated by blank lines above and below.
- Section transitions ("Here's the thing.", "That matters.", "That's what this is.") always stand alone.
- Lists of short items ("Your temper. Your loneliness. Your habits.") go on their own line.
- Preserve all original wording exactly — contractions, dashes, quotes, everything.
- Return only the reformatted text. No commentary, no explanation.`;

async function reformatText(text) {
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Please reformat this devotional text:\n\n${text}`,
      },
    ],
  });
  return message.content[0].text.trim();
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Fetching devotionals...");

  let devotionalQuery = supabase.from("devotionals").select("id, title");
  if (FILTER_TITLE) {
    devotionalQuery = devotionalQuery.eq("title", FILTER_TITLE);
  }
  const { data: devotionals, error: devError } = await devotionalQuery;

  if (devError || !devotionals) {
    console.error("Failed to fetch devotionals:", devError);
    process.exit(1);
  }

  console.log(`Found ${devotionals.length} devotional(s):`);
  devotionals.forEach((d) => console.log(`  - ${d.title}`));

  const devotionalIds = devotionals.map((d) => d.id);
  const { data: days, error: daysError } = await supabase
    .from("devotional_days")
    .select("id, devotional_id, day_number, day_title, devotional_text")
    .in("devotional_id", devotionalIds)
    .order("devotional_id")
    .order("day_number");

  if (daysError || !days) {
    console.error("Failed to fetch devotional days:", daysError);
    process.exit(1);
  }

  const devotionalMap = new Map(devotionals.map((d) => [d.id, d.title]));
  console.log(`\nTotal days to reformat: ${days.length}\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const day of days) {
    const title = devotionalMap.get(day.devotional_id) ?? "Unknown";
    const label = `${title} — Day ${day.day_number} (${day.day_title})`;

    if (!day.devotional_text || day.devotional_text.trim().length < 100) {
      console.log(`SKIP  ${label} (too short)`);
      skipped++;
      continue;
    }

    console.log(`REFORMATTING  ${label}...`);

    try {
      const reformatted = await reformatText(day.devotional_text);

      const { error: updateError } = await supabase
        .from("devotional_days")
        .update({ devotional_text: reformatted })
        .eq("id", day.id);

      if (updateError) {
        console.error(`  ERROR updating: ${updateError.message}`);
        failed++;
      } else {
        console.log(`  ✓ Done`);
        updated++;
      }
    } catch (err) {
      console.error(`  ERROR calling Claude: ${err.message}`);
      failed++;
    }

    // Small delay to avoid rate limits
    await sleep(500);
  }

  console.log(`\n=============================`);
  console.log(`Updated:  ${updated}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);
  console.log(`=============================`);
}

main();
