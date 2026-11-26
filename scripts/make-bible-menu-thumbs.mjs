/**
 * The Bible menu's book pictures (components/bible/BibleMenu.tsx).
 *
 *   node scripts/make-bible-menu-thumbs.mjs "<folder of Louis's originals>"
 *
 * The originals are one PNG per book, named after the book ("1 Samuel.png"),
 * around 2 MB each. A row shows its picture about 104 px wide, so this writes
 * a 320 px WebP per book into public/bible-menu/ (about 15 KB each) and the
 * list of books that have one into lib/bibleMenuThumbs.generated.ts. It also
 * writes a wide 1100 px banner per book into public/bible-menu/wide/ for the
 * book's chapter page. A book
 * with no picture falls back to a plain tile, so a missing file is never a
 * broken image.
 *
 * Not run at build. Run it again by hand when a picture is added or redone.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
  "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];

// Other spellings a file might arrive under.
const ALIASES = { psalm: "Psalms", "song of songs": "Song of Solomon", revelations: "Revelation" };

const source = process.argv[2];
if (!source || !fs.existsSync(source)) {
  console.error("Give the folder that holds the original pictures.");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "bible-menu");
const wideDir = path.join(outDir, "wide");
fs.mkdirSync(wideDir, { recursive: true });

const byName = new Map(BOOKS.map((book) => [book.toLowerCase(), book]));
const slug = (book) => book.toLowerCase().replace(/\s+/g, "-");
const made = new Set();
const unknown = [];

for (const file of fs.readdirSync(source)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const book = byName.get(name) || ALIASES[name];
  if (!book) {
    unknown.push(file);
    continue;
  }
  await sharp(path.join(source, file))
    .resize({ width: 320, height: 208, fit: "cover", position: "attention" })
    .webp({ quality: 76 })
    .toFile(path.join(outDir, `${slug(book)}.webp`));
  // The banner on the book's chapter page (app/reading/books/[book]).
  await sharp(path.join(source, file))
    .resize({ width: 1100, height: 440, fit: "cover", position: "attention", withoutEnlargement: false })
    .webp({ quality: 70 })
    .toFile(path.join(wideDir, `${slug(book)}.webp`));
  made.add(book);
}

const have = BOOKS.filter((book) => made.has(book) || fs.existsSync(path.join(outDir, `${slug(book)}.webp`)));
fs.writeFileSync(
  path.join(root, "lib", "bibleMenuThumbs.generated.ts"),
  `// Written by scripts/make-bible-menu-thumbs.mjs. Do not edit by hand.\n// The books that have a picture in public/bible-menu/.\nexport const BIBLE_MENU_THUMBS: readonly string[] = ${JSON.stringify(have.map(slug), null, 2)};\n`,
);

const missing = BOOKS.filter((book) => !have.includes(book));
console.log(`${made.size} pictures written, ${have.length} of 66 books have one.`);
if (missing.length) console.log("No picture for: " + missing.join(", "));
if (unknown.length) console.log("Not a book name, left alone: " + unknown.join(", "));
