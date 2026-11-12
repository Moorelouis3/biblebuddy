/**
 * Rebuild the formatting of The Beginning of Everything from the print
 * interior (2026-11-12). Formatting only: it is a hard error if one letter or
 * digit of the wording changes.
 *
 *   npx tsx scripts/build-beginning-formatting.ts [--write] [path/to/interior.pdf]
 *
 * Without --write it reports and touches nothing.
 * With --write it rewrites data/beginning-of-everything/days-*.json in place.
 * scripts/apply-beginning-book-days.ts then puts those rows live.
 *
 * ── WHY ───────────────────────────────────────────────────────────────────
 * This study was the only one in the app with no formatting markup at all -
 * not one #, *, > or ** across its 21 days, while all 24 other studies have it
 * on every day. Its text had been imported out of the print interior, and that
 * book letter-spaces its section headings and Scripture references:
 *
 *     I N T H E B E G I N N I N G G O D
 *
 * The import kept those spaces as literal characters and threw away the
 * structure that gave them meaning. So 216 headings and references were left
 * sitting mid-sentence, spelled out one letter at a time, glued to the
 * paragraph that followed, and the 35-54 paragraphs each day has in the book
 * arrived as 6 to 9 blocks of 1,200-1,900 characters. That is the wall of text
 * Louis reported on 2026-11-09, and it was never a parser or renderer fault:
 * the renderer already draws everything Proverbs shows.
 *
 * ── HOW THE STRUCTURE IS RECOVERED ────────────────────────────────────────
 * The interior PDF still carries all of it, as layout:
 *
 *   section heading    letter-spaced, size 10, centred (x < 220)
 *   Scripture quote    the bold face at body size, indented (x > 70)
 *   its reference      letter-spaced, size 7.5, right-aligned (x > 230)
 *   italic emphasis    the italic face at body size (firmament, tohu and bohu)
 *   bold emphasis      the bold face inside a body line (quoted KJV phrases)
 *   list item          a line whose own bullet glyph sits 14 units to its left
 *   paragraph break    a vertical gap of more than 19 units
 *
 * The bullet is a size-7 four-pointed star set at the item's baseline plus
 * 2.95, and the text stream emits it just after its item. All 161 in the book
 * match exactly one item line, so the pairing needs no guessing. Only 65 of
 * them are inside the imported teaching sections; the rest belong to the day's
 * front matter, which the app does not carry. The old flattened text left each
 * star stranded at the END of its item ("Seth ✦"), which is how a list of
 * names reads today. They become real markdown list items, so the app draws
 * its own bullet, the way Proverbs' lists do.
 *
 * The letter-spaced runs keep their word boundaries as separate text items, so
 * "I N | T H E | B E G I N N I N G | G O D" reads back as four words with no
 * guessing. Word boundaries come only from whitespace-only items, never from
 * inserting a space between adjacent glyph items, so kerning cannot invent a
 * word break.
 *
 * Font ids (g_d0_fN) are assigned per page load and are NOT stable, so pages
 * are read once, in order, from page 1, and the three faces at body size are
 * then resolved by behaviour rather than by id - body is the commonest, bold
 * is the one that carries the indented lines opening with a quotation mark,
 * italic is the third. All three are asserted.
 *
 * Each stored day turns out to be one app-written opening paragraph (it is not
 * in the print book at all) followed by the book's teaching section verbatim.
 * The opening paragraph is carried through untouched; it has no authoritative
 * paragraph structure to restore.
 *
 * ── THE SAFEGUARD ─────────────────────────────────────────────────────────
 * Nothing here rewrites prose. No model is involved. For every day the
 * rebuilt markdown is stripped back to letters and digits and compared with
 * the live row recorded in
 * data/beginning-devotional-days-backup-2026-11-12.json. All 21 must match
 * exactly or the script writes nothing.
 *
 * ── IF A DAY'S WORDING IS EVER EDITED ─────────────────────────────────────
 * Edit the markdown in data/beginning-of-everything/days-*.json and re-run
 * the apply script. Do not re-run this one: it compares against the 12
 * November backup and would fail. It is a one-off migration kept for the
 * record and for the next study that arrives out of a print interior the
 * same way.
 */
import fs from "node:fs";
import path from "node:path";
import { BIBLE_BOOKS } from "../lib/bibleBookChapters";

const WRITE = process.argv.includes("--write");
const PDF_PATH =
  process.argv.slice(2).find((arg) => arg.toLowerCase().endsWith(".pdf")) ||
  path.join("tmp", "boe", "print", "The_Beginning_of_Everything_PRINT_READY.pdf");

const SEED_DIR = path.join("data", "beginning-of-everything");
const SEED_FILES = ["days-01-07.json", "days-08-14.json", "days-15-21.json"];
const BACKUP_PATH = path.join("data", "beginning-devotional-days-backup-2026-11-12.json");
const TOTAL_DAYS = 21;

const BODY_SIZE = 10.4;
const HEADING_SIZE = 10;
const REFERENCE_SIZE = 7.5;
const PULL_QUOTE_REF_SIZE = 8;
const PARAGRAPH_GAP = 19;

type Run = { f: string; s: number; t: string };
type Line = { page: number; y: number; x: number; x2: number; text: string; runs: Run[] };

/** Letters and digits only - the one thing that must not change. */
const skeleton = (text: string) => text.normalize("NFC").replace(/[^A-Za-z0-9]/g, "").toLowerCase();

const collapse = (text: string) => text.replace(/\s+/g, "").trim();
const maxSize = (line: Line) => Math.max(...line.runs.map((run) => run.s));
const near = (a: number, b: number) => Math.abs(a - b) < 0.6;

/** A line the book sets letter-spaced: single glyphs separated by single spaces. */
const isLetterSpaced = (line: Line) => /^(?:[A-Z0-9’'",.:?!–-]\s){3,}[A-Z0-9’'",.:?!–-]?\s*$/.test(line.text);

const isRunningHeader = (line: Line) => {
  const text = collapse(line.text);
  if (/^—\d+—$/.test(text)) return true;
  if (/^DAY\d+$/.test(text) && maxSize(line) <= 7.6) return true;
  if (text === "THEBEGINNINGOFEVERYTHING" && maxSize(line) <= 7.6) return true;
  return false;
};

/**
 * The words of a letter-spaced line. A break comes only from a whitespace-only
 * text item, so two adjacent glyph items are always the same word.
 */
function spacedWords(line: Line): string[] {
  const words: string[] = [];
  let current = "";
  for (const run of line.runs) {
    if (!run.t.trim()) {
      if (current) words.push(current);
      current = "";
      continue;
    }
    current += run.t.replace(/\s+/g, "");
  }
  if (current) words.push(current);
  return words;
}

const MINOR_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "nor", "of", "in", "on", "at", "to",
  "for", "from", "with", "by", "over", "into", "than", "up",
]);

function titleCase(words: string[]) {
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && MINOR_WORDS.has(lower.replace(/[^a-z]/g, ""))) return lower;
      return lower.replace(/^([a-z])/, (c) => c.toUpperCase());
    })
    .join(" ");
}

const BOOK_BY_KEY = new Map(BIBLE_BOOKS.map((book) => [collapse(book).toUpperCase(), book]));

/**
 * "GENESIS1:1" -> "Genesis 1:1", "1PETER1:19" -> "1 Peter 1:19".
 * Built from the collapsed form, so a split glyph item cannot put a space
 * inside a book name. A book the canon list does not spell the same way -
 * the interior writes PSALM, the list says Psalms - keeps the book's own
 * wording; references are never changed, only re-cased.
 */
function formatReference(line: Line) {
  const raw = collapse(line.text);
  const match = raw.match(/^([0-9]?)([A-Z]+)(.*)$/);
  if (!match) return raw;
  const [, ordinal, letters, rest] = match;
  const key = `${ordinal}${letters}`;
  const book = BOOK_BY_KEY.get(key) || titleCase([letters]);
  const name = BOOK_BY_KEY.get(key) ? book : `${ordinal ? `${ordinal} ` : ""}${book}`;
  return `${name} ${rest}`.replace(/\s+/g, " ").trim();
}

/** Resolve which of the three faces at body size is body, bold and italic. */
function resolveFaces(lines: Line[]) {
  const chars = new Map<string, number>();
  for (const line of lines) {
    for (const run of line.runs) {
      if (!near(run.s, BODY_SIZE) || !run.t.trim()) continue;
      chars.set(run.f, (chars.get(run.f) || 0) + run.t.length);
    }
  }
  const faces = [...chars.entries()].sort((a, b) => b[1] - a[1]).map(([face]) => face);
  if (faces.length !== 3) {
    throw new Error(`Expected 3 faces at body size, found ${faces.length}: ${faces.join(", ")}`);
  }
  const body = faces[0];

  // The Scripture pull-quotes are indented lines set wholly in the bold face
  // and opening with a quotation mark.
  const quoteFaces = new Map<string, number>();
  for (const line of lines) {
    if (!near(maxSize(line), BODY_SIZE) || line.x <= 70) continue;
    if (!/^\s*[“"]/.test(line.text)) continue;
    const used = new Set(line.runs.filter((run) => run.t.trim()).map((run) => run.f));
    if (used.size !== 1) continue;
    const [only] = [...used];
    if (only === body) continue;
    quoteFaces.set(only, (quoteFaces.get(only) || 0) + 1);
  }
  const bold = [...quoteFaces.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  if (!bold) throw new Error("Could not identify the bold face from the Scripture pull-quotes");
  const italic = faces.find((face) => face !== body && face !== bold);
  if (!italic) throw new Error("Could not identify the italic face");
  return { body, bold, italic };
}

/** Inline **bold** and *italic*, with the markers kept off the whitespace. */
function inlineEmphasis(line: Line, faces: { body: string; bold: string; italic: string }) {
  type Segment = { style: "plain" | "bold" | "italic"; text: string };
  const styleOf = (face: string): Segment["style"] =>
    face === faces.bold ? "bold" : face === faces.italic ? "italic" : "plain";

  const segments: Segment[] = [];
  for (const run of line.runs) {
    if (!run.t) continue;
    const style = run.t.trim() ? styleOf(run.f) : "plain";
    const last = segments[segments.length - 1];
    if (last && last.style === style) last.text += run.t;
    else segments.push({ style, text: run.t });
  }

  // A run of spaces between two spans of the same style belongs inside them.
  for (let i = 1; i < segments.length - 1; i += 1) {
    if (segments[i].style !== "plain" || segments[i].text.trim()) continue;
    if (segments[i - 1].style !== segments[i + 1].style) continue;
    if (segments[i - 1].style === "plain") continue;
    segments[i].style = segments[i - 1].style;
  }

  let out = "";
  for (const segment of segments) {
    if (segment.style === "plain" || !segment.text.trim()) {
      out += segment.text;
      continue;
    }
    const marker = segment.style === "bold" ? "**" : "*";
    const [, before, middle, after] = segment.text.match(/^(\s*)([\s\S]*?)(\s*)$/) as RegExpMatchArray;
    out += `${before}${marker}${middle}${marker}${after}`;
  }
  return out.replace(/\s+/g, " ").trim();
}

/**
 * A bold or italic phrase that wrapped across two lines in the book arrives as
 * two spans separated by a space - "**Of every clean beast thou** **shalt take
 * to thee by sevens**". That renders identically to one span, but it reads
 * badly in the stored markdown, so adjacent spans of the same kind are joined.
 */
function mergeAdjacentEmphasis(text: string) {
  let out = text;
  for (let pass = 0; pass < 4; pass += 1) {
    const next = out.replace(/\*\*(\s+)\*\*/g, "$1").replace(/(?<!\*)\*(\s+)\*(?!\*)/g, "$1");
    if (next === out) break;
    out = next;
  }
  return out;
}

async function readPdfLines(file: string): Promise<Line[]> {
  if (!fs.existsSync(file)) {
    throw new Error(
      `Print interior not found at ${file}. It is not committed (the repo is public and the ` +
        `interior is the book itself); pass its path as an argument.`,
    );
  }
  // Legacy build: the Node-friendly one. Pages are read in order from 1 so the
  // per-load font ids stay consistent across the whole document.
  const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(file)), useSystemFonts: false }).promise;
  const lines: Line[] = [];
  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    let lastY: number | null = null;
    let current: Line | null = null;
    const flush = () => {
      if (current && current.text.trim()) lines.push(current);
      current = null;
    };
    for (const item of content.items as any[]) {
      const y = Math.round(item.transform[5] * 100) / 100;
      const size = Math.round(Math.abs(item.transform[0]) * 10) / 10;
      if (lastY === null || Math.abs(y - lastY) > 0.6) {
        flush();
        current = { page: pageNumber, y, x: Math.round(item.transform[4] * 10) / 10, x2: 0, text: "", runs: [] };
      }
      lastY = y;
      if (!current) current = { page: pageNumber, y, x: Math.round(item.transform[4] * 10) / 10, x2: 0, text: "", runs: [] };
      current.runs.push({ f: item.fontName, s: size, t: item.str });
      current.text += item.str;
      current.x2 = Math.round((item.transform[4] + (item.width || 0)) * 10) / 10;
    }
    flush();
  }
  return lines;
}

function labelIndexes(lines: Line[], collapsed: string, size: number) {
  return lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => isLetterSpaced(line) && collapse(line.text) === collapsed && near(maxSize(line), size))
    .map(({ index }) => index);
}

type DayStats = { headings: number; quotes: number; paragraphs: number; bold: number; italic: number; listItems: number };

const BULLET_GLYPH = "✦";
const BULLET_SIZE = 7;
/** A bullet sits 14 units left of its item and 2.95 above its baseline. */
const BULLET_INDENT = 14;
const BULLET_RISE = 2.95;

const isBullet = (line: Line) => line.text.trim() === BULLET_GLYPH && near(maxSize(line), BULLET_SIZE);

/**
 * Pair every bullet glyph with the line it marks. Returns the indices of the
 * bullets themselves (to drop) and of the items they open, plus each item's
 * left edge so a wrapped second line can be recognised as the same item.
 */
function findListItems(body: Line[]) {
  const bullets = new Set<number>();
  const starts = new Set<number>();
  const indents = new Map<number, number>();
  for (let i = 0; i < body.length; i += 1) {
    const line = body[i];
    if (!isBullet(line)) continue;
    bullets.add(i);
    const wanted = line.y - BULLET_RISE;
    let best = -1;
    for (let j = 0; j < body.length; j += 1) {
      if (j === i || body[j].page !== line.page || isBullet(body[j])) continue;
      if (Math.abs(body[j].y - wanted) > 1.2) continue;
      if (best !== -1) { best = -2; break; }     // ambiguous: leave it as prose
      best = j;
    }
    if (best >= 0) {
      starts.add(best);
      indents.set(best, body[best].x);
    }
  }
  return { bullets, starts, indents };
}

function buildDay(lines: Line[], from: number, to: number, rightMargin: Map<number, number>, faces: any) {
  const slice = lines.slice(from, to);

  // Skip the day's front matter: everything up to and including the
  // full-page pull quote's own centred reference.
  let start = 0;
  for (let i = 0; i < slice.length; i += 1) {
    const line = slice[i];
    if (isLetterSpaced(line) && near(maxSize(line), PULL_QUOTE_REF_SIZE) && line.x > 150 && line.x < 240) start = i + 1;
  }
  const body = slice
    .slice(start)
    .filter((line) => !isRunningHeader(line) && !(isLetterSpaced(line) && collapse(line.text) === "GOD’SSTORY"));

  const { bullets, starts, indents } = findListItems(body);

  const blocks: string[] = [];
  const stats: DayStats = { headings: 0, quotes: 0, paragraphs: 0, bold: 0, italic: 0, listItems: 0 };
  let paragraph: string[] = [];
  let quote: string[] = [];
  let list: string[] = [];
  let listIndent: number | null = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(mergeAdjacentEmphasis(paragraph.join(" ")));
    stats.paragraphs += 1;
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push(list.map((item) => `* ${mergeAdjacentEmphasis(item)}`).join("\n"));
    stats.listItems += list.length;
    list = [];
    listIndent = null;
  };
  const flushQuote = (reference: string | null) => {
    if (!quote.length) return;
    const text = mergeAdjacentEmphasis(quote.join(" ").replace(/\s+/g, " ").trim());
    blocks.push(`> ${text}${reference ? ` (${reference})` : ""}`);
    stats.quotes += 1;
    quote = [];
  };

  for (let i = 0; i < body.length; i += 1) {
    const line = body[i];
    const previous = body[i - 1];
    const size = maxSize(line);

    if (bullets.has(i)) continue; // the star itself; its item carries it

    if (starts.has(i)) {
      flushQuote(null);
      flushParagraph();
      listIndent = indents.get(i) ?? line.x;
      list.push(inlineEmphasis(line, faces));
      continue;
    }
    if (list.length && listIndent !== null && Math.abs(line.x - listIndent) < 1.5 && near(size, BODY_SIZE)) {
      list[list.length - 1] += ` ${inlineEmphasis(line, faces)}`; // a wrapped item
      continue;
    }
    flushList();

    if (isLetterSpaced(line) && near(size, HEADING_SIZE) && line.x < 220) {
      flushQuote(null);
      flushParagraph();
      blocks.push(`## ${titleCase(spacedWords(line))}`);
      stats.headings += 1;
      continue;
    }

    if (isLetterSpaced(line) && near(size, REFERENCE_SIZE) && line.x > 230) {
      flushQuote(formatReference(line));
      continue;
    }

    const glyphs = line.runs.filter((run) => run.t.trim());
    const wholelyBold = glyphs.length > 0 && glyphs.every((run) => run.f === faces.bold);
    if (near(size, BODY_SIZE) && wholelyBold && line.x > 70) {
      if (!quote.length) flushParagraph();
      quote.push(line.text.trim());
      continue;
    }

    flushQuote(null);

    // A new paragraph: a vertical gap on the same page, or - across a page
    // break, where the gap is invisible - a previous line that ended short of
    // the margin or finished a sentence.
    if (previous) {
      const samePage = line.page === previous.page;
      const broke = samePage
        ? previous.y - line.y > PARAGRAPH_GAP
        : previous.x2 < (rightMargin.get(previous.page) || 0) - 18 || /[.!?”’"]$/.test(previous.text.trim());
      if (broke) flushParagraph();
    }

    const markdown = inlineEmphasis(line, faces);
    if (markdown) paragraph.push(markdown);
  }
  flushList();
  flushQuote(null);
  flushParagraph();

  for (const block of blocks) {
    const prose = block.replace(/^\* /gm, "");
    stats.bold += (prose.match(/\*\*[\s\S]+?\*\*/g) || []).length;
    stats.italic += (prose.replace(/\*\*[\s\S]+?\*\*/g, "").match(/\*[\s\S]+?\*/g) || []).length;
  }
  return { blocks, stats };
}

async function main() {
  const backup = JSON.parse(fs.readFileSync(BACKUP_PATH, "utf8")) as any[];
  if (backup.length !== TOTAL_DAYS) throw new Error(`${BACKUP_PATH} holds ${backup.length} rows, expected ${TOTAL_DAYS}`);
  const liveByDay = new Map(backup.map((row) => [Number(row.day_number), String(row.devotional_text || "")]));

  const lines = await readPdfLines(PDF_PATH);
  const faces = resolveFaces(lines);
  console.log(`Read ${lines.length} lines. Faces: body ${faces.body}, bold ${faces.bold}, italic ${faces.italic}`);

  const rightMargin = new Map<number, number>();
  for (const line of lines) {
    if (!near(maxSize(line), BODY_SIZE)) continue;
    rightMargin.set(line.page, Math.max(rightMargin.get(line.page) || 0, line.x2));
  }

  const readings = labelIndexes(lines, "TODAY’SREADING", HEADING_SIZE);
  const reflections = labelIndexes(lines, "REFLECTIONQUESTIONS", HEADING_SIZE);
  if (readings.length !== TOTAL_DAYS || reflections.length !== TOTAL_DAYS) {
    throw new Error(`Found ${readings.length} reading labels and ${reflections.length} reflection labels, expected ${TOTAL_DAYS} of each`);
  }

  const rebuilt = new Map<number, string>();
  let failures = 0;
  for (let index = 0; index < TOTAL_DAYS; index += 1) {
    const dayNumber = index + 1;
    const live = liveByDay.get(dayNumber);
    if (!live) throw new Error(`Day ${dayNumber} missing from the backup`);

    const { blocks, stats } = buildDay(lines, readings[index], reflections[index], rightMargin, faces);

    // The day's opening paragraph is app-written and is not in the print book.
    const opening = live.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean)[0];
    const markdown = [opening, ...blocks].join("\n\n");

    const same = skeleton(markdown) === skeleton(live);
    // The bullet glyph is not a letter, so the skeleton check cannot see it
    // go missing. Every star stranded in the old text must become a list item.
    const starsBefore = (live.match(new RegExp(BULLET_GLYPH, "g")) || []).length;
    const listsMatch = stats.listItems === starsBefore;
    if (!same || !listsMatch) failures += 1;
    rebuilt.set(dayNumber, markdown);
    console.log(
      `Day ${String(dayNumber).padStart(2)}  ${same ? "words identical" : "!!! WORDS DIFFER"}` +
        `${listsMatch ? "" : `  !!! ${stats.listItems} list items for ${starsBefore} bullets`}` +
        `  headings ${stats.headings}  quotes ${String(stats.quotes).padStart(2)}` +
        `  paragraphs ${String(stats.paragraphs + 1).padStart(3)}` +
        `  list ${String(stats.listItems).padStart(2)}` +
        `  bold ${String(stats.bold).padStart(2)}  italic ${String(stats.italic).padStart(2)}`,
    );
  }

  if (failures) throw new Error(`${failures} day(s) failed the wording or bullet check. Nothing written.`);
  console.log(`\n${TOTAL_DAYS}/${TOTAL_DAYS} days rebuilt with identical words.`);

  if (!WRITE) {
    console.log("Dry run. Pass --write to update data/beginning-of-everything/days-*.json.");
    return;
  }
  for (const file of SEED_FILES) {
    const full = path.join(SEED_DIR, file);
    const days = JSON.parse(fs.readFileSync(full, "utf8")) as any[];
    for (const day of days) {
      const next = rebuilt.get(Number(day.day_number));
      if (!next) throw new Error(`${file}: no rebuild for day ${day.day_number}`);
      day.devotional_text = next;
    }
    fs.writeFileSync(full, `${JSON.stringify(days, null, 1)}\n`);
    console.log(`Wrote ${full}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
