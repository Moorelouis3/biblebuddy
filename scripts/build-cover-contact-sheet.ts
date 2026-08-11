// scripts/build-cover-contact-sheet.ts
//
// Tiles every pending cover candidate into one grid image so a whole run can be
// judged at the size the covers are actually seen — small, in the Bible in One
// Year carousel. Reading 70 briefs is slow; scanning 70 thumbnails is not.
//
//   npx tsx scripts/build-cover-contact-sheet.ts
//   npx tsx scripts/build-cover-contact-sheet.ts --days=32-100 --cell=200
//
// Writes to public/cover-candidates/contact-sheet.png (gitignored with the
// rest of the candidates).

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, "data", "bible-year-cover-candidates.json");
const OUT_PATH = join(ROOT, "public", "cover-candidates", "contact-sheet.png");

type Manifest = {
  days: Record<
    string,
    { dayNumber: number; title: string; candidates: Array<{ file: string; status: string }> }
  >;
};

function arg(name: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : null;
}

async function main() {
  const cell = Math.max(80, Number(arg("cell") || 200));
  const columns = Math.max(1, Number(arg("columns") || 8));
  const label = 22;

  let from = 1;
  let to = 365;
  const range = arg("days");
  if (range) {
    const [a, b] = range.split("-").map(Number);
    if (Number.isInteger(a) && Number.isInteger(b) && b >= a) {
      from = a;
      to = b;
    }
  }

  if (!existsSync(MANIFEST_PATH)) throw new Error("No candidate manifest yet.");
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;

  // Newest candidate per day — that is the one just generated.
  const entries = Object.values(manifest.days)
    .filter((d) => d.dayNumber >= from && d.dayNumber <= to)
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map((d) => {
      const usable = d.candidates.filter((c) => c.status !== "rejected");
      const pick = usable[usable.length - 1] || d.candidates[d.candidates.length - 1];
      return pick ? { dayNumber: d.dayNumber, file: join(ROOT, "public", pick.file.replace(/^\//, "")) } : null;
    })
    .filter((e): e is { dayNumber: number; file: string } => !!e && existsSync(e.file));

  if (!entries.length) throw new Error("No candidate images found on disk.");

  const rows = Math.ceil(entries.length / columns);
  const cellH = cell + label;
  const width = columns * cell;
  const height = rows * cellH;

  const composites: sharp.OverlayOptions[] = [];
  for (let i = 0; i < entries.length; i += 1) {
    const x = (i % columns) * cell;
    const y = Math.floor(i / columns) * cellH;

    composites.push({
      input: await sharp(entries[i].file).resize(cell, cell, { fit: "cover" }).png().toBuffer(),
      left: x,
      top: y + label,
    });
    composites.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${label}">
           <text x="6" y="${label - 7}" font-family="Segoe UI, Arial, sans-serif"
                 font-size="13" fill="#EEE">Day ${entries[i].dayNumber}</text>
         </svg>`,
      ),
      left: x,
      top: y,
    });
  }

  const sheet = await sharp({
    create: { width, height, channels: 3, background: { r: 17, g: 17, b: 20 } },
  })
    .composite(composites)
    .png()
    .toBuffer();

  writeFileSync(OUT_PATH, sheet);
  console.log(`${entries.length} cover(s) -> ${OUT_PATH} (${width}x${height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
