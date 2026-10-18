/**
 * Pulls the days out of a printed Bible Buddy book and writes them as the same
 * day-NN.md files scripts/apply-tempting-book-days.ts already reads, so a book
 * Louis has published can be pushed back into the app as the study's text.
 *
 *   node scripts/extract-book-days.mjs \
 *     --pdf "C:/Users/Moore/Downloads/21_Women_of_the_Bible_Interior.pdf" \
 *     --out data/women-book-days
 *
 * The interior is a laid-out PDF, not a manuscript, so this reads it back the
 * way it was set: pdfjs gives every glyph run with its font and position, and
 * the layout is distinctive enough to recover the markdown from it.
 *
 *   58pt numeral        a day opens here
 *   24pt centred        that day's title
 *   20pt centred        the epigraph verse, with its reference at 9.5pt
 *   13pt letterspaced   a section heading   -> ## Heading
 *   11.2pt regular      body
 *   11.2pt italic       Scripture and emphasis -> *text*
 *   11.2pt bold         emphasis            -> **text**
 *   31pt single letter  the drop cap opening the first paragraph
 *   8.6pt               running head and folio, both thrown away
 *
 * Lines are grouped by baseline, paragraphs by the gap between baselines, and a
 * paragraph that runs over a page break is rejoined when the last line of the
 * page does not end a sentence.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdfjsPath = require.resolve("pdfjs-dist/legacy/build/pdf.mjs");
const { getDocument } = await import(`file://${pdfjsPath}`);

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}

const PDF = arg("pdf");
const OUT = arg("out");
if (!PDF || !OUT) {
  console.error("Usage: node scripts/extract-book-days.mjs --pdf <interior.pdf> --out <dir>");
  process.exit(1);
}

const BODY = 11.2;
const near = (a, b, tolerance = 0.6) => Math.abs(a - b) <= tolerance;

/** "M A D E  B Y  T H E  H A N D S" -> "MADE BY THE HANDS". */
function unspaceLetters(text) {
  return text.replace(/(?:[^s] ){2,}[^s]/g, (match) => match.replace(/ /g, ""));
}

function unspace(text) {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (!/^(\S ?)+$/.test(collapsed)) return collapsed;
  // Every other character is a space in letterspaced setting; words are two.
  return collapsed
    .split("  ")
    .map((word) => word.split(" ").join(""))
    .join(" ");
}

/** THE WOMAN WHO WAITED -> The Woman Who Waited. */
function titleCase(text) {
  const small = new Set(["a", "an", "and", "the", "of", "to", "in", "for", "by", "or", "at", "on", "with"]);
  return text
    .toLowerCase()
    .split(" ")
    .map((word, i) => (i > 0 && small.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ")
    .replace(/\bGod\b/gi, "God");
}

const doc = await getDocument({ url: PDF, useSystemFonts: true }).promise;

/** Every page as lines of styled runs, with the furniture dropped. */
async function readPage(number) {
  const page = await doc.getPage(number);
  await learnFonts(page);
  const content = await page.getTextContent();
  const byBaseline = new Map();

  for (const item of content.items) {
    if (!item.str.trim()) continue;
    const size = Math.hypot(item.transform[2], item.transform[3]);
    if (near(size, 8.6, 0.3)) continue; // running head and folio
    const y = Math.round(item.transform[5] * 2) / 2;
    const line = byBaseline.get(y) || { y, size, runs: [] };
    line.size = Math.max(line.size, size);
    line.runs.push({
      text: item.str,
      size,
      font: item.fontName,
      x: item.transform[4],
      width: item.width || 0,
    });
    byBaseline.set(y, line);
  }

  return [...byBaseline.values()]
    .sort((a, b) => b.y - a.y)
    .map((line) => ({ ...line, runs: line.runs.sort((a, b) => a.x - b.x) }));
}

/**
 * getTextContent only reports "sans-serif" for an embedded subset, so the real
 * name - EBGaramond-Italic, -Bold, -Medium - comes from the page's font objects,
 * which are only filled in once the operator list has been walked.
 */
const fontRoles = new Map();
async function learnFonts(page) {
  await page.getOperatorList();
  const content = await page.getTextContent();
  for (const item of content.items) {
    if (fontRoles.has(item.fontName)) continue;
    try {
      const font = page.commonObjs.get(item.fontName);
      fontRoles.set(item.fontName, (font?.name || "").toLowerCase());
    } catch {
      fontRoles.set(item.fontName, "");
    }
  }
}

const isItalic = (font) => (fontRoles.get(font) || "").includes("italic");
const isBold = (font) => (fontRoles.get(font) || "").includes("bold");
/** The medium weight is the one every heading, label and numeral is set in. */
const isDisplay = (font) => (fontRoles.get(font) || "").includes("medium");

/**
 * One line of set type back into a string. Runs that sit apart on the baseline
 * are separate words - the typesetter wrote the space, it is not in the glyphs -
 * and a run in the italic or bold font comes back wrapped in markdown.
 */
function renderLine(line) {
  let out = "";
  let mark = "";
  let previous = null;
  for (const run of line.runs) {
    if (previous) {
      const gap = run.x - (previous.x + previous.width);
      if (gap > 1.2 && !/\s$/.test(out)) out += " ";
    }
    const wanted = isBold(run.font) ? "**" : isItalic(run.font) ? "*" : "";
    if (wanted !== mark) {
      if (mark) out = `${out.trimEnd()}${mark} `;
      if (wanted) out += wanted;
      mark = wanted;
    }
    out += run.text;
    previous = run;
  }
  if (mark) out += mark;
  return out.replace(/\s+/g, " ").trim();
}

/**
 * A letterspaced line. Usually every run is one word and the spaces inside it
 * are kerning, but a short heading can arrive as a single run holding the whole
 * line - there the word gaps are wider spaces, so the gap-aware reading is the
 * one that keeps them.
 */
function renderCapsLine(line) {
  if (line.runs.length === 1) return unspaceLetters(renderLine(line));
  return line.runs
    .map((run) => run.text.replace(/\s+/g, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const days = [];
let current = null;
let pending = []; // paragraph being built
let lastY = null;
let lastLine = "";
let dropCap = "";
let numberMarker = "";
let lastWasReading = false;
let inEpigraph = false;

/**
 * A finished block, cleaned of what the line breaks did to it: emphasis that
 * was opened and closed again on each line, and the spaces that leaves sitting
 * in front of punctuation.
 */
function tidy(text) {
  return text
    .replace(/\*\* \*\*/g, " ")
    .replace(/\* \*(?!\*)/g, " ")
    .replace(/(\*+)\s+([,.;:!?’”)])/g, "$1$2")
    .replace(/\s*·\s*/g, " · ")
    .replace(/\s+/g, " ")
    .trim();
}

function flush() {
  const text = tidy(pending.join(" "));
  pending = [];
  if (!text || !current) return;
  current.blocks.push(text);
}

for (let number = 1; number <= doc.numPages; number++) {
  const lines = await readPage(number);
  const opener = lines.find((line) => near(line.size, 58, 6));

  if (opener) {
    flush();
    const dayNumber = Number(renderLine(opener).replace(/\D/g, ""));
    const titleLines = lines.filter((line) => near(line.size, 24, 2)).map(renderLine);
    current = { day: dayNumber, title: titleLines.join(" ").trim(), blocks: [] };
    days.push(current);
    lastY = null;
    lastLine = "";
  }

  if (!current) continue; // front matter

  for (const line of lines) {
    if (near(line.size, 58, 6) || near(line.size, 24, 2)) continue; // the opener itself

    // A raised capital shares its baseline with the second line of the
    // paragraph it opens, sitting out in the margin to the left of it.
    const first = line.runs[0];
    if (first && first.size > 18 && first.text.replace(/s/g, "").length === 1 && line.runs.length > 1) {
      const letter = first.text.replace(/s/g, "");
      line.runs = line.runs.slice(1);
      if (pending.length) pending[0] = letter + pending[0];
      else dropCap = letter;
    }

    const text = renderLine(line);
    if (!text) continue;

    // A drop cap on a baseline of its own: it opens the paragraph that is
    // already being built around it, not the line that comes next.
    if (line.size > 18 && text.replace(/\s/g, "").length === 1) {
      const letter = text.replace(/\s/g, "");
      if (pending.length) pending[0] = letter + pending[0];
      else dropCap = letter;
      lastY = line.y;
      continue;
    }

    // The word DAY above the numeral on a day's opening page.
    if (near(line.size, 11, 0.5) && renderCapsLine(line).toUpperCase() === "DAY") continue;

    // The epigraph verse, set large and centred, and the reference under it.
    // It runs to three or four lines, which are one quotation, not four.
    if (near(line.size, 20, 2)) {
      if (!inEpigraph) flush();
      inEpigraph = true;
      pending.push(text.replace(/\*/g, ""));
      lastY = line.y;
      continue;
    }
    inEpigraph = false;
    if (pending.length && (near(line.size, 9.5, 0.4) || near(line.size, 9, 0.3))) {
      pending.push(`(${renderCapsLine(line).replace(/([A-Z])([A-Z]+)/g, (m, a, b) => a + b.toLowerCase())})`);
      flush();
      lastY = line.y;
      continue;
    }

    // A section heading - or, right after "Today's Reading", the reading itself.
    const allDisplay = line.runs.every((run) => isDisplay(run.font));
    if (allDisplay || line.size > BODY + 0.8) {
      flush();
      const caps = renderCapsLine(line);
      // The number beside a question in the reflection list, set in the same
      // face as the headings. Like a drop cap, it belongs to the paragraph it
      // is sitting next to.
      if (/^\d{1,2}$/.test(caps)) {
        if (pending.length) pending[0] = `${caps}. ${pending[0]}`;
        else numberMarker = caps;
        lastY = line.y;
        continue;
      }

      const previous = current.blocks[current.blocks.length - 1] || "";
      // The reading, which is set in the heading face and can run over two
      // lines when a day has more than one passage.
      const reading = tidy(unspaceLetters(renderLine(line)))
        .replace(/([A-Za-z])(\d)/g, "$1 $2")
        .replace(/(\d)([A-Za-z])/g, "$1 $2");
      if (/^## Today's Reading$/i.test(previous)) {
        current.blocks.push(reading);
        lastWasReading = true;
      } else if (lastWasReading && /\d/.test(reading)) {
        // A reading with two or three passages wraps onto a second line.
        current.blocks[current.blocks.length - 1] = `${previous} ${reading}`.replace(/\s+/g, " ");
      } else {
        current.blocks.push(`## ${titleCase(caps)}`);
        lastWasReading = false;
      }
      lastY = line.y;
      lastLine = "";
      continue;
    }

    const gap = lastY == null ? null : lastY - line.y;
    const brokeAcrossPages = lastY == null;
    const endsSentence = /[.!?”"’']\s*$/.test(lastLine);

    if (gap != null && gap > 20) flush();
    else if (brokeAcrossPages && endsSentence) flush();

    if (dropCap) {
      pending.push(dropCap + text);
      dropCap = "";
    } else if (numberMarker) {
      pending.push(`${numberMarker}. ${text}`);
      numberMarker = "";
    } else {
      pending.push(text);
    }
    lastY = line.y;
    lastLine = text;
  }

  lastY = null; // next page starts a fresh run of baselines
}
flush();

/**
 * Lifts a section out of a day and returns its blocks. The reading and the
 * reflection questions become columns of their own on devotional_days, so they
 * come out of the body - the app renders them itself, and leaving them in would
 * print them twice.
 */
function takeSection(blocks, heading) {
  const start = blocks.findIndex((block) => block.toLowerCase() === `## ${heading.toLowerCase()}`);
  if (start === -1) return [];
  let end = start + 1;
  while (end < blocks.length && !blocks[end].startsWith("## ")) end += 1;
  return blocks.splice(start, end - start).slice(1);
}

const plain = (text) => text.replace(/\*+/g, "").trim();

fs.mkdirSync(OUT, { recursive: true });
for (const day of days) {
  const blocks = day.blocks.filter(Boolean);
  const reading = takeSection(blocks, "Today's Reading").map(plain).join(" ");
  // The column holds one question, so take the first one the section asks. The
  // text is read back off a printed page, so a question can arrive split across
  // two blocks: run the section together and cut at the first question mark.
  const start = blocks.findIndex((block) => /^## Reflection Questions$/i.test(block));
  const questions = [];
  if (start !== -1) {
    let end = start + 1;
    while (end < blocks.length && !blocks[end].startsWith("## ")) end += 1;
    const section = blocks
      .slice(start + 1, end)
      .map(plain)
      .filter((block) => !/^Take a few minutes/i.test(block))
      .join(" ")
      .replace(/^\d+\.\s*/, "");
    const first = section.match(/^(.{10,240}?\?)/s);
    // A number that belonged to the answer below can land mid-question when the
    // question wrapped; it is never part of what is being asked.
    if (first) questions.push(first[1].replace(/\s\d+\.\s+/g, " ").trim());
  }

  const title = day.title.replace(/\s+/g, " ").trim();
  const front = ["---", `day: ${day.day}`, `title: ${title}`];
  if (reading) front.push(`reading: ${reading}`);
  if (questions.length) front.push(`question: ${questions[0].replace(/^d+.s*/, "")}`);
  front.push("---", "");

  const file = path.join(OUT, `day-${String(day.day).padStart(2, "0")}.md`);
  fs.writeFileSync(file, `${front.join("\n")}${blocks.join("\n\n")}\n`);
}

const words = days.reduce((n, day) => n + day.blocks.join(" ").split(/\s+/).length, 0);
console.log(`${days.length} days, ${words.toLocaleString()} words -> ${OUT}`);
for (const day of days) {
  console.log(`  day ${String(day.day).padStart(2)}  ${day.blocks.join(" ").split(/\s+/).length
    .toString()
    .padStart(5)} words  ${day.title}`);
}
