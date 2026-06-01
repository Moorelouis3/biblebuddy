import { getBibleReaderStudySections } from "../lib/bibleReaderStudyNotes";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";
import { getBibleYearDayContent } from "../lib/bibleYearDaysContent";

function referenceSpan(reference: string) {
  const match = reference.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)-(\d+)$/);
  if (!match) return null;
  return {
    book: match[1].trim(),
    chapter: Number(match[2]),
    startVerse: Number(match[3]),
    endVerse: Number(match[4]),
    size: Number(match[4]) - Number(match[3]) + 1,
  };
}

function referenceKey(book: string, chapter: number) {
  return `${book.toLowerCase()}:${chapter}`;
}

const dayRefsByChapter = new Map<string, Set<string>>();
const startDay = Number(process.env.AUDIT_START_DAY || 1);
const endDay = Number(process.env.AUDIT_END_DAY || 20);

for (const day of GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter((item) => item.dayNumber >= startDay && item.dayNumber <= endDay)) {
  for (const section of getBibleYearDayContent(day).studyNotesSections || []) {
    const parsed = referenceSpan(section.reference);
    if (!parsed) continue;
    const key = referenceKey(parsed.book, parsed.chapter);
    if (!dayRefsByChapter.has(key)) dayRefsByChapter.set(key, new Set());
    dayRefsByChapter.get(key)?.add(section.reference);
  }
}

let hasFailure = false;

const readings = GENESIS_BIBLE_IN_ONE_YEAR_SERIES
  .filter((item) => item.dayNumber >= startDay && item.dayNumber <= endDay)
  .flatMap((day) => day.readings);

const chaptersByBook = new Map<string, Set<number>>();
for (const reading of readings) {
  if (!chaptersByBook.has(reading.book)) chaptersByBook.set(reading.book, new Set());
  chaptersByBook.get(reading.book)?.add(reading.chapter);
}

for (const [book, chapters] of chaptersByBook) {
  for (const chapter of [...chapters].sort((a, b) => a - b)) {
  const key = referenceKey(book, chapter);
  const dayRefs = [...(dayRefsByChapter.get(key) || new Set())];
  const readerRefs = getBibleReaderStudySections(book, chapter).map((section) => section.reference);
  const missingInReader = dayRefs.filter((reference) => !readerRefs.includes(reference));
  const extraInReader = readerRefs.filter((reference) => !dayRefs.includes(reference));
  const oversizedReader = readerRefs.filter((reference) => {
    const parsed = referenceSpan(reference);
    return parsed ? parsed.size > 10 : false;
  });

  console.log(`${book} ${chapter}`);
  console.log(`  Day:    ${dayRefs.join(", ") || "(none)"}`);
  console.log(`  Reader: ${readerRefs.join(", ") || "(none)"}`);

  if (missingInReader.length || oversizedReader.length) {
    hasFailure = true;
    if (missingInReader.length) console.log(`  MISSING IN READER: ${missingInReader.join(", ")}`);
    if (oversizedReader.length) console.log(`  OVERSIZED READER: ${oversizedReader.join(", ")}`);
  }

  if (extraInReader.length) {
    console.log(`  EXTRA IN READER: ${extraInReader.join(", ")}`);
  }
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
