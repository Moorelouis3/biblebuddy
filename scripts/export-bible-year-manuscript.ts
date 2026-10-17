import { mkdirSync, writeFileSync } from "fs";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";
import { getBibleYearDayContent } from "../lib/bibleYearDaysContent";

/**
 * The Bible in One Year manuscript, as one markdown file (Louis, 2026-10-17).
 *
 *   npx tsx scripts/export-bible-year-manuscript.ts
 *
 * Pulls the teaching out of all 365 days and leaves the Scripture behind.
 * That is the whole trick of the thing: in the app each section carries a
 * verseBlock, a reference the reader's Bible fills in at read time, so the
 * prose was never tangled up with the Bible text. Printing the Scripture
 * would add roughly three quarters of a million words and is not what a
 * one-year devotional does anyway - the reader opens their own Bible, which
 * is the point of giving them a reading for the day.
 *
 * What comes out is a manuscript a typesetter can work from directly: one H1
 * per day, the reading underneath it, then the writing. No app furniture, no
 * emoji headings, no audio cues.
 */

type DayOut = {
  dayNumber: number;
  title: string;
  reference: string;
  paragraphs: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  closing: string[];
};

function clean(text: string): string {
  return text
    // Audio cues and app furniture that mean nothing on a page.
    .replace(/\s*\[(pause|beat|music|sfx)[^\]]*\]\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const days: DayOut[] = [];
let missing: number[] = [];

for (const day of GENESIS_BIBLE_IN_ONE_YEAR_SERIES) {
  const { lesson } = getBibleYearDayContent(day);
  if (!lesson) {
    missing.push(day.dayNumber);
    continue;
  }
  days.push({
    dayNumber: lesson.dayNumber,
    title: lesson.title,
    reference: lesson.reference,
    paragraphs: (lesson.opening || []).map(clean).filter(Boolean),
    sections: (lesson.sections || []).map((section) => ({
      heading: clean(section.heading),
      // section.verseBlock is deliberately dropped: that is the Scripture.
      paragraphs: (section.teaching || []).map(clean).filter(Boolean),
    })),
    closing: (lesson.closing || []).map(clean).filter(Boolean),
  });
}

days.sort((a, b) => a.dayNumber - b.dayNumber);

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
let totalWords = 0;
const perDayWords = new Map<number, number>();
for (const d of days) {
  const n =
    d.paragraphs.reduce((sum, p) => sum + words(p), 0) +
    d.sections.reduce((sum, s) => sum + words(s.heading) + s.paragraphs.reduce((t, p) => t + words(p), 0), 0) +
    d.closing.reduce((sum, p) => sum + words(p), 0);
  perDayWords.set(d.dayNumber, n);
  totalWords += n;
}

const lines: string[] = [];
lines.push("# Bible in One Year");
lines.push("");
lines.push("*A 365-day journey through God's Word*");
lines.push("");
lines.push("Louis Moore III · Bible Buddy");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## How to use this book");
lines.push("");
lines.push(
  "Each day gives you a passage to read and a short study of it. Read the passage in your own Bible first - the reading is printed under the day's title - then read the day's pages. Fifteen minutes, once a day, and in a year you will have read the Bible from Genesis to Revelation.",
);
lines.push("");
lines.push("---");
lines.push("");

for (const d of days) {
  lines.push(`# Day ${d.dayNumber}`);
  lines.push("");
  lines.push(`## ${d.title}`);
  lines.push("");
  lines.push(`**Today's reading: ${d.reference}**`);
  lines.push("");
  for (const p of d.paragraphs) {
    lines.push(p);
    lines.push("");
  }
  for (const s of d.sections) {
    if (s.heading) {
      lines.push(`### ${s.heading}`);
      lines.push("");
    }
    for (const p of s.paragraphs) {
      lines.push(p);
      lines.push("");
    }
  }
  for (const p of d.closing) {
    lines.push(p);
    lines.push("");
  }
  lines.push("---");
  lines.push("");
}

mkdirSync("book", { recursive: true });
writeFileSync("book/bible-in-one-year-manuscript.md", lines.join("\n"), "utf8");

const avg = Math.round(totalWords / Math.max(1, days.length));
const shortest = [...perDayWords.entries()].sort((a, b) => a[1] - b[1]).slice(0, 5);
const longest = [...perDayWords.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

console.log(`days exported: ${days.length}${missing.length ? ` (missing: ${missing.join(", ")})` : ""}`);
console.log(`words of teaching: ${totalWords.toLocaleString()}`);
console.log(`average a day: ${avg.toLocaleString()}`);
console.log(`shortest days: ${shortest.map(([d, w]) => `${d} (${w})`).join(", ")}`);
console.log(`longest days: ${longest.map(([d, w]) => `${d} (${w})`).join(", ")}`);
console.log("written: book/bible-in-one-year-manuscript.md");
