// scripts/recomposite-bible-year-covers.ts
//
// Rebuilds cover PNGs from CACHED ARTWORK — no image API calls, no cost.
//
// Covers are artwork + a composited title block. Every bug found in the
// typography layer so far (a truncated `d` attribute, a NaN coordinate that
// silently dropped a letter) required regenerating the artwork too, purely
// because the untitled art was never kept. generate-bible-year-covers.ts now
// writes artwork-<n>.png alongside each candidate, so any future typography fix
// is a free re-composite instead of a re-purchase.
//
//   npx tsx scripts/recomposite-bible-year-covers.ts --days=31-100
//   npx tsx scripts/recomposite-bible-year-covers.ts --days=31-100 --approved
//
// Flags:
//   --days=A-B   inclusive range (required)
//   --approved   also refresh the live public/day<N>cover.png for approved days

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";
import {
  BIBLE_YEAR_COVER_SIZE,
  buildBibleYearCoverTitleSvg,
} from "../lib/bibleYearCoverStyle";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const MANIFEST_PATH = join(ROOT, "data", "bible-year-cover-candidates.json");

type Candidate = { file: string; status: "pending" | "approved" | "rejected" };
type Manifest = {
  days: Record<string, { dayNumber: number; candidates: Candidate[] }>;
};

function arg(name: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : null;
}
const refreshApproved = process.argv.includes("--approved");

async function main() {
  const range = arg("days");
  if (!range) throw new Error("Pass --days=A-B.");
  const [from, to] = range.split("-").map(Number);
  if (!Number.isInteger(from) || !Number.isInteger(to) || to < from) {
    throw new Error(`Invalid --days range: ${range}`);
  }

  if (!existsSync(MANIFEST_PATH)) throw new Error("No candidate manifest.");
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;

  let rebuilt = 0;
  let live = 0;
  const noArtwork: number[] = [];

  for (let dayNumber = from; dayNumber <= to; dayNumber += 1) {
    const record = manifest.days[String(dayNumber)];
    const day = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => d.dayNumber === dayNumber);
    if (!record || !day) continue;

    for (const candidate of record.candidates) {
      if (candidate.status === "rejected") continue;

      const coverPath = join(PUBLIC_DIR, candidate.file.replace(/^\//, ""));
      const artworkPath = coverPath.replace(/candidate-(\d+)\.png$/, "artwork-$1.png");
      if (!existsSync(artworkPath)) {
        if (!noArtwork.includes(dayNumber)) noArtwork.push(dayNumber);
        continue;
      }

      const svg = buildBibleYearCoverTitleSvg({
        dayNumber,
        title: day.title,
        reference: day.reference,
      });
      const cover = await sharp(readFileSync(artworkPath))
        .resize(BIBLE_YEAR_COVER_SIZE, BIBLE_YEAR_COVER_SIZE, { fit: "cover" })
        .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
        .png()
        .toBuffer();
      writeFileSync(coverPath, cover);
      rebuilt += 1;

      if (refreshApproved && candidate.status === "approved") {
        writeFileSync(join(PUBLIC_DIR, `day${dayNumber}cover.png`), cover);
        live += 1;
      }
    }
  }

  console.log(`Rebuilt ${rebuilt} candidate(s) from cached artwork — no API calls.`);
  if (refreshApproved) console.log(`Refreshed ${live} live cover(s).`);
  if (noArtwork.length) {
    console.log(
      `\n${noArtwork.length} day(s) have no cached artwork and were skipped: ${noArtwork.join(", ")}`,
    );
    console.log("Those predate artwork caching and still need a paid regeneration.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
