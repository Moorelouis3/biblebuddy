// lib/bibleYearCoverBriefs.ts
//
// LAYER 2 of the cover prompt: the day-specific creative brief.
//
// Why this exists: 335 of the 365 plan days carry an auto-generated summary
// ("Read Exodus 37-40: The Tabernacle Is Finished.") that describes no scene at
// all. Handed only that, an image model returns generic biblical scenery no
// matter how good the art direction is. The brief is where the actual picture
// comes from — the event, the focal subject, the figures, the light.
//
// Briefs are written once by scripts/generate-bible-year-cover-briefs.ts, kept
// in data/bible-year-cover-briefs.json, and are meant to be READ AND EDITED by
// hand before the matching image is generated.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type CoverBrief = {
  dayNumber: number;
  title: string;
  reference: string;
  /** The one moment the cover depicts, in prose, as sent to the image model. */
  brief: string;
  /** "model" until a human edits it; set to "human" to protect from rewrites. */
  source: "model" | "human";
  updatedAt: string;
};

export type CoverBriefFile = {
  generatedAt: string;
  days: Record<string, CoverBrief>;
};

export const COVER_BRIEFS_PATH = join(
  process.cwd(),
  "data",
  "bible-year-cover-briefs.json",
);

export function readCoverBriefs(): CoverBriefFile {
  if (!existsSync(COVER_BRIEFS_PATH)) return { generatedAt: "", days: {} };
  try {
    return JSON.parse(readFileSync(COVER_BRIEFS_PATH, "utf8")) as CoverBriefFile;
  } catch {
    return { generatedAt: "", days: {} };
  }
}

export function writeCoverBriefs(file: CoverBriefFile) {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  file.generatedAt = new Date().toISOString();
  writeFileSync(COVER_BRIEFS_PATH, `${JSON.stringify(file, null, 2)}\n`);
}

export function getCoverBrief(dayNumber: number): string | null {
  const brief = readCoverBriefs().days[String(dayNumber)]?.brief;
  return brief?.trim() ? brief.trim() : null;
}
