// scripts/generate-bible-year-covers.ts
//
// Generates candidate cover art for Bible in One Year days and writes them to
// public/cover-candidates/ for review at /admin/covers.
//
// Nothing here touches a live day. Approving a candidate is a separate step in
// the admin UI; until then these files are ignored by git and unused by the app.
//
//   npx tsx scripts/generate-bible-year-covers.ts --days=31-40
//   npx tsx scripts/generate-bible-year-covers.ts --day=31 --variants=3
//   npx tsx scripts/generate-bible-year-covers.ts --missing --limit=20
//
// Flags:
//   --day=N            one day
//   --days=A-B         inclusive range
//   --missing          every day without an approved cover
//   --limit=N          cap how many days this run touches (default 25)
//   --variants=N       candidates per day (default 1)
//   --quality=low|medium|high   image quality (default medium)
//   --dry-run          build prompts and title overlays, skip the API call

import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";
import { BIBLE_YEAR_APPROVED_COVER_DAYS } from "../lib/bibleYearApprovedCovers";
import {
  BIBLE_YEAR_COVER_SIZE,
  buildBibleYearCoverPrompt,
  buildBibleYearCoverTitleSvg,
} from "../lib/bibleYearCoverStyle";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const ROOT = process.cwd();
const CANDIDATE_DIR = join(ROOT, "public", "cover-candidates");
const MANIFEST_PATH = join(ROOT, "data", "bible-year-cover-candidates.json");
const IMAGE_MODEL = "gpt-image-1";

type CandidateRecord = {
  dayNumber: number;
  title: string;
  reference: string;
  candidates: Array<{
    file: string;
    createdAt: string;
    prompt: string;
    quality: string;
    status: "pending" | "approved" | "rejected";
  }>;
};

type Manifest = { generatedAt: string; days: Record<string, CandidateRecord> };

function arg(name: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : null;
}
const hasFlag = (name: string) => process.argv.includes(`--${name}`);

function readManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) return { generatedAt: "", days: {} };
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
  } catch {
    return { generatedAt: "", days: {} };
  }
}

function writeManifest(manifest: Manifest) {
  mkdirSync(join(ROOT, "data"), { recursive: true });
  manifest.generatedAt = new Date().toISOString();
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

function resolveTargetDays(): number[] {
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
    const approved = new Set<number>([
      ...BIBLE_YEAR_APPROVED_COVER_DAYS,
      // Days 1-30 were hand-made before this pipeline existed.
      ...Array.from({ length: 30 }, (_, i) => i + 1),
    ]);
    return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((d) => d.dayNumber).filter(
      (d) => !approved.has(d),
    );
  }

  throw new Error("Pass one of --day=N, --days=A-B, or --missing.");
}

async function generateArtwork(prompt: string, quality: string): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      prompt,
      size: `${BIBLE_YEAR_COVER_SIZE}x${BIBLE_YEAR_COVER_SIZE}`,
      quality,
      n: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`Image API ${response.status}: ${(await response.text()).slice(0, 400)}`);
  }

  const payload = (await response.json()) as {
    data?: Array<{ b64_json?: string; url?: string }>;
  };
  const item = payload.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
  if (item?.url) return Buffer.from(await (await fetch(item.url)).arrayBuffer());
  throw new Error("Image API returned no image data.");
}

/** Flat dark plate so a --dry-run still shows the real title composition. */
async function placeholderArtwork(): Promise<Buffer> {
  return sharp({
    create: {
      width: BIBLE_YEAR_COVER_SIZE,
      height: BIBLE_YEAR_COVER_SIZE,
      channels: 3,
      background: { r: 26, g: 18, b: 10 },
    },
  })
    .png()
    .toBuffer();
}

async function compositeCover(artwork: Buffer, day: { dayNumber: number; title: string; reference: string }) {
  const svg = buildBibleYearCoverTitleSvg({
    dayNumber: day.dayNumber,
    title: day.title,
    reference: day.reference,
  });

  return sharp(artwork)
    .resize(BIBLE_YEAR_COVER_SIZE, BIBLE_YEAR_COVER_SIZE, { fit: "cover" })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}

async function main() {
  const dryRun = hasFlag("dry-run");
  const quality = arg("quality") || "medium";
  const variants = Math.max(1, Number(arg("variants") || 1));
  const limit = Math.max(1, Number(arg("limit") || 25));

  const targets = resolveTargetDays().slice(0, limit);
  const manifest = readManifest();

  console.log(
    `Generating covers for ${targets.length} day(s), ${variants} variant(s) each` +
      `${dryRun ? " [DRY RUN — no API calls]" : ` at quality=${quality}`}`,
  );

  let made = 0;
  let failed = 0;

  for (const dayNumber of targets) {
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => d.dayNumber === dayNumber);
    if (!day) {
      console.warn(`  Day ${dayNumber}: not in the plan, skipping`);
      continue;
    }

    const padded = String(dayNumber).padStart(3, "0");
    const dir = join(CANDIDATE_DIR, `day-${padded}`);
    mkdirSync(dir, { recursive: true });

    const record: CandidateRecord = manifest.days[String(dayNumber)] || {
      dayNumber,
      title: day.title,
      reference: day.reference,
      candidates: [],
    };
    record.title = day.title;
    record.reference = day.reference;

    const prompt = buildBibleYearCoverPrompt({
      dayNumber,
      title: day.title,
      reference: day.reference,
    });

    for (let variant = 0; variant < variants; variant += 1) {
      const index = record.candidates.length + 1;
      const fileName = `candidate-${index}.png`;
      try {
        const artwork = dryRun ? await placeholderArtwork() : await generateArtwork(prompt, quality);
        const cover = await compositeCover(artwork, day);
        writeFileSync(join(dir, fileName), cover);

        record.candidates.push({
          file: `/cover-candidates/day-${padded}/${fileName}`,
          createdAt: new Date().toISOString(),
          prompt,
          quality: dryRun ? "dry-run" : quality,
          status: "pending",
        });
        made += 1;
        console.log(`  Day ${dayNumber} "${day.title}" -> ${fileName}`);
      } catch (error) {
        failed += 1;
        console.error(`  Day ${dayNumber} FAILED: ${(error as Error).message}`);
        // Stop the whole run rather than burn credits on a systemic failure
        // (bad key, quota, model name) repeated across hundreds of days.
        if (failed >= 3) {
          manifest.days[String(dayNumber)] = record;
          writeManifest(manifest);
          throw new Error("Aborting: 3 consecutive image failures.");
        }
      }
    }

    manifest.days[String(dayNumber)] = record;
    writeManifest(manifest);
  }

  console.log(`\nDone. ${made} candidate(s) written, ${failed} failure(s).`);
  console.log("Review them at /admin/covers (run the app locally, sign in as admin).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
