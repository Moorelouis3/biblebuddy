/**
 * The 66 books by name, per language.
 *
 * The ENGLISH name stays the key everywhere it already is one: web addresses
 * (/reading/books/john), file paths (public/kjv/john), and the progress
 * tables. A German name is only ever what is shown. Translating a key would
 * split a reader's progress in two.
 *
 * German names follow the Luther Bible, which is what German Protestants and
 * free churches say out loud: "1. Mose", not "Genesis"; "Offenbarung", not
 * "Apokalypse". German references use a comma: Johannes 3,16.
 */

import type { AppLanguage } from "./language";

const GERMAN: Record<string, string> = {
  genesis: "1. Mose",
  exodus: "2. Mose",
  leviticus: "3. Mose",
  numbers: "4. Mose",
  deuteronomy: "5. Mose",
  joshua: "Josua",
  judges: "Richter",
  ruth: "Rut",
  "1 samuel": "1. Samuel",
  "2 samuel": "2. Samuel",
  "1 kings": "1. Könige",
  "2 kings": "2. Könige",
  "1 chronicles": "1. Chronik",
  "2 chronicles": "2. Chronik",
  ezra: "Esra",
  nehemiah: "Nehemia",
  esther: "Ester",
  job: "Hiob",
  psalms: "Psalmen",
  psalm: "Psalm",
  proverbs: "Sprüche",
  ecclesiastes: "Prediger",
  "song of solomon": "Hoheslied",
  "song of songs": "Hoheslied",
  isaiah: "Jesaja",
  jeremiah: "Jeremia",
  lamentations: "Klagelieder",
  ezekiel: "Hesekiel",
  daniel: "Daniel",
  hosea: "Hosea",
  joel: "Joel",
  amos: "Amos",
  obadiah: "Obadja",
  jonah: "Jona",
  micah: "Micha",
  nahum: "Nahum",
  habakkuk: "Habakuk",
  zephaniah: "Zefanja",
  haggai: "Haggai",
  zechariah: "Sacharja",
  malachi: "Maleachi",
  matthew: "Matthäus",
  mark: "Markus",
  luke: "Lukas",
  john: "Johannes",
  acts: "Apostelgeschichte",
  romans: "Römer",
  "1 corinthians": "1. Korinther",
  "2 corinthians": "2. Korinther",
  galatians: "Galater",
  ephesians: "Epheser",
  philippians: "Philipper",
  colossians: "Kolosser",
  "1 thessalonians": "1. Thessalonicher",
  "2 thessalonians": "2. Thessalonicher",
  "1 timothy": "1. Timotheus",
  "2 timothy": "2. Timotheus",
  titus: "Titus",
  philemon: "Philemon",
  hebrews: "Hebräer",
  james: "Jakobus",
  "1 peter": "1. Petrus",
  "2 peter": "2. Petrus",
  "1 john": "1. Johannes",
  "2 john": "2. Johannes",
  "3 john": "3. Johannes",
  jude: "Judas",
  revelation: "Offenbarung",
};

function keyOf(englishName: string) {
  return String(englishName || "").trim().toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ");
}

/** The book's name as shown in this language. Unknown names come back unchanged. */
export function bookName(englishName: string, language: AppLanguage): string {
  if (language !== "de") return englishName;
  return GERMAN[keyOf(englishName)] ?? englishName;
}

/** "John 3:16" in English, "Johannes 3,16" in German. A single psalm is "Psalm 23". */
export function formatReference(
  englishBook: string,
  chapter: number | string,
  verse: number | string | null | undefined,
  language: AppLanguage,
  verseEnd?: number | string | null,
): string {
  const single = keyOf(englishBook) === "psalms" ? (language === "de" ? "Psalm" : "Psalm") : bookName(englishBook, language);
  const head = `${single} ${chapter}`;
  if (verse === null || verse === undefined || verse === "") return head;
  const range = verseEnd && Number(verseEnd) > Number(verse) ? `-${verseEnd}` : "";
  return `${head}${language === "de" ? "," : ":"}${verse}${range}`;
}

/** Does this search text match the book in either language? Used by the Bible menu search. */
export function bookMatches(englishName: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const german = GERMAN[keyOf(englishName)]?.toLowerCase() ?? "";
  return englishName.toLowerCase().includes(q) || german.includes(q) || german.replace(/\. /g, " ").includes(q);
}
