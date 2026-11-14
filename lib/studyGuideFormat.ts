/**
 * The study guide format, as rules a script can check (2026-11-14).
 *
 * The Wisdom of Proverbs is the approved look for every study guide day:
 * short paragraphs, section headings, Scripture in quote cards, lists as emoji
 * bullets. docs/STUDY_GUIDE_FORMAT.md says it in words; this says it in code,
 * so a new or re-imported study is measured against the same thing.
 *
 * Why it exists: The Beginning of Everything and 21 Women of the Bible were
 * imported out of their print interiors and arrived as walls of text - one
 * heading a day, 250-word paragraphs, headings broken across two lines,
 * questions cut in half. Nothing flagged it. The renderer was never the
 * problem; the stored text was.
 *
 * Pure: no database, no React. Used by scripts/check-study-guides.ts.
 */

export type StudyGuideDay = {
  day_number: number;
  day_title?: string | null;
  devotional_text?: string | null;
  bible_reading_book?: string | null;
  bible_reading_chapter?: number | string | null;
  reflection_question?: string | null;
};

export type FormatFinding = { level: "error" | "warning"; message: string };

/** No ordinary paragraph may be longer than this. Proverbs' longest is 43. */
export const MAX_PARAGRAPH_WORDS = 90;
/** A day this long must have section headings. */
export const HEADINGS_REQUIRED_FROM_WORDS = 600;
/** At least one heading for every this many words, on a long day. */
export const WORDS_PER_HEADING = 450;

const EMOJI = /\p{Extended_Pictographic}/u;
const isHeading = (line: string) => /^\s{0,3}#{1,4}\s/.test(line);
const words = (text: string) => text.split(/\s+/).filter(Boolean).length;

export function splitBlocks(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function checkStudyGuideDay(day: StudyGuideDay): FormatFinding[] {
  const findings: FormatFinding[] = [];
  const error = (message: string) => findings.push({ level: "error", message });
  const warning = (message: string) => findings.push({ level: "warning", message });
  const text = String(day.devotional_text || "").replace(/\r\n/g, "\n");

  // The four parts of a study guide day are The Big Picture (this text),
  // Today's Reading, Today's Trivia and Discussion. The last three are built
  // from these fields, so a missing one is a missing section.
  if (!String(day.day_title || "").trim()) error("no day title");
  if (!String(day.bible_reading_book || "").trim() || !day.bible_reading_chapter) {
    error("no Bible reading assigned, so Today's Reading and Today's Trivia have nothing to open");
  }
  if (!String(day.reflection_question || "").trim()) warning("no reflection question for the Discussion");

  const total = words(text);
  if (total < 120) {
    error(`The Big Picture is ${total} words: missing or a stub`);
    return findings;
  }

  const blocks = splitBlocks(text);
  const headings = blocks.filter((block) => isHeading(block.split("\n")[0]));
  const quotes = blocks.filter((block) => block.startsWith(">"));

  for (const block of blocks) {
    const first = block.split("\n")[0];
    if (isHeading(first)) {
      if (block.split("\n").filter(isHeading).length > 1) error(`a heading broken across lines: ${block.replace(/\n/g, " / ")}`);
      continue;
    }
    if (block.startsWith(">")) continue;
    if (/^\s*([*-]|\d+\.)\s/.test(first) || /^\*\*\d+\./.test(first)) continue; // lists and numbered steps
    if (/^\*[^*]/.test(first) && block.endsWith("*")) continue; // an italic prayer paragraph
    const count = words(block);
    if (count > MAX_PARAGRAPH_WORDS) error(`a ${count}-word paragraph (limit ${MAX_PARAGRAPH_WORDS}): "${block.slice(0, 50)}..."`);
  }

  for (let i = 1; i < blocks.length; i += 1) {
    // A section heading straight over its first sub-heading (## then ###) is
    // fine, and Proverbs does it. Two of the same level is the import defect.
    const level = (block: string) => (block.match(/^\s*(#+)/)?.[1].length ?? 0);
    if (isHeading(blocks[i]) && isHeading(blocks[i - 1]) && level(blocks[i]) <= level(blocks[i - 1])) error(`two headings in a row: "${blocks[i - 1]}" / "${blocks[i]}"`);
    // The import cut some questions in two: a bold line with no end, then "1. **rest?**".
    if (/^\*\*[^*]+[^*.?!:]\*\*$/.test(blocks[i - 1]) && /^\d+\.\s/.test(blocks[i])) {
      error(`a question cut in two: "${blocks[i - 1]}" / "${blocks[i].slice(0, 30)}..."`);
    }
  }

  if (total >= HEADINGS_REQUIRED_FROM_WORDS) {
    const needed = Math.min(6, Math.floor(total / WORDS_PER_HEADING));
    if (headings.length < needed) error(`${headings.length} heading(s) for ${total} words (at least ${needed})`);
  }

  if (/(?:[A-Z] ){4,}[A-Z]\b/.test(text)) error("letter-spaced text left over from a print import");
  if (/^#{5,}\s/m.test(text) || /<\/?(div|span|p|br)\b/i.test(text)) error("markup the reader does not draw (HTML or a deep heading)");

  const bullets = text.split("\n").filter((line) => /^\s*[*-]\s/.test(line));
  const plain = bullets.filter((line) => !EMOJI.test(line.slice(0, 12)));
  if (plain.length) warning(`${plain.length} list item(s) without an emoji, e.g. "${plain[0].slice(0, 40)}"`);
  if (quotes.length === 0) warning("no Scripture quote card");

  return findings;
}

/** Every day from 1 to totalDays, once each, each one passing. */
export function checkStudyGuide(totalDays: number, days: StudyGuideDay[]): Array<{ day: number | null; finding: FormatFinding }> {
  const out: Array<{ day: number | null; finding: FormatFinding }> = [];
  const byNumber = new Map<number, StudyGuideDay[]>();
  for (const day of days) byNumber.set(day.day_number, [...(byNumber.get(day.day_number) || []), day]);
  for (let n = 1; n <= totalDays; n += 1) {
    const found = byNumber.get(n) || [];
    if (found.length === 0) out.push({ day: n, finding: { level: "error", message: "the day is missing" } });
    if (found.length > 1) out.push({ day: n, finding: { level: "error", message: `${found.length} rows for one day` } });
    for (const day of found.slice(0, 1)) for (const finding of checkStudyGuideDay(day)) out.push({ day: n, finding });
  }
  for (const n of byNumber.keys()) {
    if (n < 1 || n > totalDays) out.push({ day: n, finding: { level: "error", message: `a day outside 1-${totalDays}` } });
  }
  return out;
}
