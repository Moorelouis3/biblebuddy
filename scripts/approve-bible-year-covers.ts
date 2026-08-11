// scripts/approve-bible-year-covers.ts
//
// Bulk version of the approve action in app/api/admin/covers/route.ts, for when
// a whole run needs accepting and clicking through the admin UI one day at a
// time is not reasonable. The behaviour is deliberately identical to the route:
//
//   1. copy the chosen candidate to public/day<N>cover.png
//   2. mark it approved in the manifest (and reject the day's other candidates)
//   3. add the day to BIBLE_YEAR_APPROVED_COVER_DAYS
//
// It picks the NEWEST candidate that is not already rejected, so a cover that
// was rejected (e.g. a truncated title) can never be approved by accident.
//
//   npx tsx scripts/approve-bible-year-covers.ts --days=31-100 --dry-run
//   npx tsx scripts/approve-bible-year-covers.ts --days=31-100
//
// Flags:
//   --days=A-B   inclusive range (required)
//   --dry-run    report what would happen, change nothing

import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, "data", "bible-year-cover-candidates.json");
const APPROVED_PATH = join(ROOT, "lib", "bibleYearApprovedCovers.ts");
const PUBLIC_DIR = join(ROOT, "public");

type Candidate = { file: string; status: "pending" | "approved" | "rejected" };
type Manifest = {
  generatedAt: string;
  days: Record<string, { dayNumber: number; title: string; candidates: Candidate[] }>;
};

function arg(name: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : null;
}
const dryRun = process.argv.includes("--dry-run");

function readApprovedDays(): number[] {
  if (!existsSync(APPROVED_PATH)) return [];
  const source = readFileSync(APPROVED_PATH, "utf8");
  const match = source.match(/BIBLE_YEAR_APPROVED_COVER_DAYS:\s*number\[\]\s*=\s*\[([\s\S]*?)\]/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((piece) => Number(piece.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function writeApprovedDays(days: number[]) {
  const unique = Array.from(new Set(days)).sort((a, b) => a - b);
  const header = readFileSync(APPROVED_PATH, "utf8").split("export const")[0];
  const body =
    unique.length === 0
      ? "export const BIBLE_YEAR_APPROVED_COVER_DAYS: number[] = [];\n"
      : `export const BIBLE_YEAR_APPROVED_COVER_DAYS: number[] = [\n${unique
          .map((day) => `  ${day},`)
          .join("\n")}\n];\n`;
  writeFileSync(APPROVED_PATH, `${header}${body}`);
}

function main() {
  const range = arg("days");
  if (!range) throw new Error("Pass --days=A-B.");
  const [from, to] = range.split("-").map(Number);
  if (!Number.isInteger(from) || !Number.isInteger(to) || to < from) {
    throw new Error(`Invalid --days range: ${range}`);
  }

  if (!existsSync(MANIFEST_PATH)) throw new Error("No candidate manifest.");
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;

  const approved = readApprovedDays();
  let done = 0;
  const skipped: string[] = [];

  for (let dayNumber = from; dayNumber <= to; dayNumber += 1) {
    const record = manifest.days[String(dayNumber)];
    if (!record) {
      skipped.push(`day ${dayNumber}: no candidates`);
      continue;
    }

    const usable = record.candidates.filter((c) => c.status !== "rejected");
    const candidate = usable[usable.length - 1];
    if (!candidate) {
      skipped.push(`day ${dayNumber}: every candidate is rejected`);
      continue;
    }

    const source = join(PUBLIC_DIR, candidate.file.replace(/^\//, ""));
    if (!existsSync(source)) {
      skipped.push(`day ${dayNumber}: file missing (${candidate.file})`);
      continue;
    }

    const destination = join(PUBLIC_DIR, `day${dayNumber}cover.png`);
    if (dryRun) {
      console.log(`  would approve day ${dayNumber}: ${candidate.file} -> /day${dayNumber}cover.png`);
      done += 1;
      continue;
    }

    copyFileSync(source, destination);
    if (!existsSync(destination)) throw new Error(`Copy failed for day ${dayNumber}.`);

    for (const other of record.candidates) {
      if (other !== candidate && other.status === "approved") other.status = "rejected";
    }
    candidate.status = "approved";
    approved.push(dayNumber);
    done += 1;
    console.log(`  day ${dayNumber} -> /day${dayNumber}cover.png`);
  }

  if (!dryRun) {
    writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
    writeApprovedDays(approved);
  }

  console.log(`\n${dryRun ? "[DRY RUN] " : ""}${done} day(s) approved.`);
  if (skipped.length) {
    console.log(`\n${skipped.length} skipped:`);
    for (const line of skipped) console.log(`  ${line}`);
  }
  if (!dryRun && done) {
    console.log(
      "\nCovers resolve at module load, so restart the dev server to see them locally.",
    );
    console.log(
      "To go live they must be committed and deployed — lib/bibleYearApprovedCovers.ts " +
        "plus the new public/day*cover.png files.",
    );
  }
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
