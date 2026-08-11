// scripts/generate-bible-year-cover-briefs.ts
//
// Writes the day-specific creative brief (LAYER 2) for Bible in One Year
// covers into data/bible-year-cover-briefs.json.
//
// This is the step that decides what each cover actually DEPICTS. The plan's
// own summaries are boilerplate for 335 of 365 days, so without this the image
// model is handed a title and nothing else and returns generic scenery.
//
// Text only — this never calls the image API and never costs image credits.
// Read the briefs and edit any of them before generating the artwork.
//
//   npx tsx scripts/generate-bible-year-cover-briefs.ts --day=31
//   npx tsx scripts/generate-bible-year-cover-briefs.ts --days=31-40
//   npx tsx scripts/generate-bible-year-cover-briefs.ts --missing --limit=50
//
// Flags:
//   --day=N        one day
//   --days=A-B     inclusive range
//   --missing      every day that has no brief yet
//   --limit=N      cap how many days this run touches (default 25)
//   --force        rewrite briefs that already exist (skips source:"human")
//   --print        print each brief as it is written

import { config } from "dotenv";
import { existsSync } from "fs";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";
import {
  type CoverBrief,
  readCoverBriefs,
  writeCoverBriefs,
} from "../lib/bibleYearCoverBriefs";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const TEXT_MODEL = "gpt-4o-mini";

function arg(name: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : null;
}
const hasFlag = (name: string) => process.argv.includes(`--${name}`);

const SYSTEM_PROMPT = `You are the art director for "Bible Buddy", writing creative briefs for the cover art of a 365-day Bible reading plan.

Each cover is poster key art for a prestige biblical historical epic — think a major film poster, not devotional illustration.

Given a day's title and assigned chapters, you pick the SINGLE most powerful visual moment in that reading and describe it so an image model can render it.

Rules:
- Choose ONE specific moment, not a montage and not "people in biblical times".
- The focal subject must be something that can DOMINATE a square frame.
- Be concrete and physical: what is made of what, who is doing what, where the light comes from.
- Stay strictly within what the assigned chapters actually describe. Never invent events. Never depict God as a human figure — represent divine presence as cloud, fire, light or storm.
- Much of the Bible is violent: sacrifice, battle, plague, execution. Depict these with REVERENT RESTRAINT and never graphically. No blood, no wounds, no gore, no corpses, no weapons striking a person, no suffering shown on a body. Convey it indirectly instead — through smoke rising from an altar, a bowed head, a raised hand, firelight, a drawn curtain, an aftermath seen at a distance, the faces of witnesses.
- This applies to animals too. Never describe a sacrificed, dead, butchered or "freshly offered" animal, and never place one on an altar. Show the altar carrying only FIRE, SMOKE, INCENSE, GRAIN, OIL or BREAD, or show livestock alive, standing and unharmed nearby. An altar ablaze with a column of smoke says "sacrifice" without depicting one.
- These are hard limits: a brief that describes blood, injury or a killed animal is rejected outright by the image system, and that day produces no cover at all.
- Describe only the scene. Do NOT mention typography, titles, text, lettering, captions or the day number — those are added separately.
- Keep it under 160 words of flowing prose, no headings and no bullet points.

Answer with the brief only.`;

function userPrompt(day: {
  dayNumber: number;
  title: string;
  reference: string;
  readings?: Array<{ book: string; chapter: number }>;
}) {
  const chapters = (day.readings || [])
    .map((r) => `${r.book} ${r.chapter}`)
    .join(", ");
  return [
    `Day ${day.dayNumber} of 365.`,
    `Cover title: "${day.title}"`,
    `Reading: ${day.reference}${chapters ? ` (${chapters})` : ""}`,
    "",
    "Write the creative brief for this day's cover.",
  ].join("\n");
}

async function writeBrief(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Text API ${response.status}: ${(await response.text()).slice(0, 300)}`,
    );
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Text API returned no content.");
  return text;
}

function resolveTargetDays(existing: Record<string, CoverBrief>): number[] {
  const single = arg("day");
  if (single) return [Number(single)];

  const range = arg("days");
  if (range) {
    const [from, to] = range.split("-").map(Number);
    if (!Number.isInteger(from) || !Number.isInteger(to) || to < from) {
      throw new Error(`Invalid --days range: ${range}`);
    }
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  }

  if (hasFlag("missing")) {
    return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((d) => d.dayNumber).filter(
      (d) => !existing[String(d)],
    );
  }

  throw new Error("Pass one of --day=N, --days=A-B, or --missing.");
}

async function main() {
  const force = hasFlag("force");
  const print = hasFlag("print");
  const limit = Math.max(1, Number(arg("limit") || 25));

  const file = readCoverBriefs();
  const targets = resolveTargetDays(file.days).slice(0, limit);

  console.log(`Writing briefs for ${targets.length} day(s) with ${TEXT_MODEL}`);

  let written = 0;
  let skipped = 0;
  let failed = 0;

  for (const dayNumber of targets) {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find(
      (d) => d.dayNumber === dayNumber,
    );
    if (!day) {
      console.warn(`  Day ${dayNumber}: not in the plan, skipping`);
      continue;
    }

    const current = file.days[String(dayNumber)];
    // Never silently overwrite a brief someone edited by hand.
    if (current && (!force || current.source === "human")) {
      skipped += 1;
      if (current.source === "human" && force) {
        console.log(`  Day ${dayNumber}: hand-edited, left alone`);
      }
      continue;
    }

    try {
      const brief = await writeBrief(userPrompt(day));
      file.days[String(dayNumber)] = {
        dayNumber,
        title: day.title,
        reference: day.reference,
        brief,
        source: "model",
        updatedAt: new Date().toISOString(),
      };
      writeCoverBriefs(file);
      written += 1;
      console.log(`  Day ${dayNumber} "${day.title}"`);
      if (print) console.log(`    ${brief.replace(/\n/g, "\n    ")}\n`);
    } catch (error) {
      failed += 1;
      console.error(`  Day ${dayNumber} FAILED: ${(error as Error).message}`);
      if (failed >= 3) {
        throw new Error("Aborting: 3 brief failures.");
      }
    }
  }

  console.log(
    `\nDone. ${written} written, ${skipped} already had one, ${failed} failure(s).`,
  );
  console.log("Read and edit data/bible-year-cover-briefs.json before generating art.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
