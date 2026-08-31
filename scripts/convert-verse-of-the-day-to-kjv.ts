/**
 * Rewrite the Verse of the Day pools in KJV.
 *
 * Both pools shipped in a modern translation - the extras are plainly NIV
 * ("the Advocate", "very truly I tell you"). That is the wrong translation for
 * an app whose study notes all explain KJV wording, and NIV text is copyrighted,
 * so it should not be sitting in the repo at all.
 *
 * This fetches the KJV wording for every reference in both files and rewrites
 * the text in place. References, ranks, subtitles and explanations are left
 * exactly as they are.
 *
 *   npx tsx scripts/convert-verse-of-the-day-to-kjv.ts --dry
 *   npx tsx scripts/convert-verse-of-the-day-to-kjv.ts
 */
import fs from "fs";
import path from "path";

const DRY = process.argv.includes("--dry");
const ROOT = process.cwd();
const CORE = path.join(ROOT, "lib", "verseOfTheDay.ts");
const EXTRAS = path.join(ROOT, "lib", "verseOfTheDayExtras.ts");

const cache = new Map<string, string>();

async function fetchKjv(reference: string): Promise<string> {
  const hit = cache.get(reference);
  if (hit) return hit;

  const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`);
  if (!res.ok) throw new Error(`bible-api.com returned ${res.status}`);
  const json: any = await res.json();
  if (!Array.isArray(json?.verses) || !json.verses.length) throw new Error("no verses returned");

  // Join multi-verse references into one flowing line, and collapse the
  // newlines bible-api.com leaves at the end of each verse.
  const text = json.verses
    .map((v: any) => String(v.text || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ")
    .trim();

  if (!text) throw new Error("empty text");
  cache.set(reference, text);
  await new Promise((r) => setTimeout(r, 2100)); // ~15 requests per 30s
  return text;
}

/** Escape for a double-quoted TypeScript string literal. */
function quote(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function convertCore() {
  const original = fs.readFileSync(CORE, "utf8");
  let updated = original;
  let changed = 0;

  // Each entry is `reference: "X",` followed a line or two later by `text: "Y",`.
  const entries = [...original.matchAll(/reference: "([^"]+)",\s*\n\s*text: "((?:[^"\\]|\\.)*)",/g)];
  console.log(`${path.basename(CORE)}: ${entries.length} entries`);

  for (const match of entries) {
    const [whole, reference, currentText] = match;
    const kjv = await fetchKjv(reference);
    if (kjv === currentText) {
      console.log(`  same  ${reference}`);
      continue;
    }
    const replacement = `reference: "${quote(reference)}",\n    text: "${quote(kjv)}",`;
    updated = updated.replace(whole, replacement);
    changed += 1;
    console.log(`  kjv   ${reference.padEnd(20)} ${kjv.slice(0, 58)}...`);
  }

  if (!DRY && changed) fs.writeFileSync(CORE, updated);
  return changed;
}

async function convertExtras() {
  const original = fs.readFileSync(EXTRAS, "utf8");
  const lines = original.split(/\r?\n/);
  let changed = 0;

  const out: string[] = [];
  for (const line of lines) {
    // `Reference|rank|text` inside the raw template literal.
    const parts = line.split("|");
    if (parts.length !== 3 || !/^\d+$/.test(parts[1].trim())) {
      out.push(line);
      continue;
    }
    const reference = parts[0].trim();
    const kjv = await fetchKjv(reference);
    if (kjv === parts[2].trim()) {
      out.push(line);
      console.log(`  same  ${reference}`);
      continue;
    }
    out.push(`${reference}|${parts[1].trim()}|${kjv}`);
    changed += 1;
    console.log(`  kjv   ${reference.padEnd(20)} ${kjv.slice(0, 58)}...`);
  }

  console.log(`${path.basename(EXTRAS)}: ${changed} rewritten`);
  if (!DRY && changed) fs.writeFileSync(EXTRAS, out.join("\n"));
  return changed;
}

async function main() {
  const core = await convertCore();
  const extras = await convertExtras();
  console.log(`\n${core + extras} verse(s) rewritten in KJV${DRY ? " (dry run, nothing saved)" : ""}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
