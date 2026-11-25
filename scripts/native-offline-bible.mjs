/**
 * Packs the whole King James Bible into the app itself.
 *
 *   node scripts/native-offline-bible.mjs
 *
 * Why: the phone apps are a window onto the website, so with no signal there
 * is no app. All anyone got was the "You're offline" screen
 * (native/www/offline.html), the one screen that is built into the app
 * rather than served from the site. On iPhone that is the whole story,
 * because Apple switches off the offline cache the website uses.
 *
 * The Bible text is 7.4 MB. Other Bible apps are 60 to 480 MB and carry at
 * least one Bible inside them; ours was 6 MB and carried nothing
 * (docs/SPEED_REPORT_2026-11-25.md, step 4). So the offline screen becomes a
 * Bible reader, and this script gives it the text.
 *
 * It reads public/kjv/<book>/<chapter>.json, the same files the online
 * reader uses, and writes native/www/bible/:
 *
 *   books.js        the 66 books in order, with their chapter counts
 *   <book>.js       one file per book, every chapter in it
 *
 * They are scripts, not JSON, on purpose. The offline page loads a book by
 * adding a <script> tag, which works the same from the app's local origin on
 * both platforms. A fetch() from that page is the thing that has hung
 * before inside the iOS app.
 *
 * The output is not committed (it is a copy of public/kjv). Every app build
 * runs this just before `npx cap sync`, which is what copies native/www into
 * the app. See codemagic.yaml and .github/workflows/ios-build.yml.
 *
 * It only reaches people in a NEW APP BUILD. See NEXT_BUILD.md.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const KJV = join(process.cwd(), "public", "kjv");
const OUT = join(process.cwd(), "native", "www", "bible");

const BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
  "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation",
];

const slugOf = (book) => book.toLowerCase().trim().replace(/\s+/g, "-");

function main() {
  if (!existsSync(KJV)) throw new Error(`No Bible text at ${KJV}`);
  const folders = new Set(readdirSync(KJV));

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const index = [];
  let bytes = 0;

  for (const name of BOOKS) {
    // The text folders spell one book differently; accept either.
    const slug = [slugOf(name), slugOf(name).replace("song-of-solomon", "song-of-songs")].find((s) => folders.has(s));
    if (!slug) throw new Error(`No text folder for ${name}`);

    const chapterNumbers = readdirSync(join(KJV, slug))
      .map((file) => Number(file.replace(/\.json$/, "")))
      .filter((n) => Number.isInteger(n) && n > 0)
      .sort((a, b) => a - b);
    if (!chapterNumbers.length) throw new Error(`No chapters for ${name}`);
    // Every chapter from 1 to the last, with none missing.
    chapterNumbers.forEach((n, i) => {
      if (n !== i + 1) throw new Error(`${name} is missing chapter ${i + 1}`);
    });

    const chapters = chapterNumbers.map((n) => {
      const verses = JSON.parse(readFileSync(join(KJV, slug, `${n}.json`), "utf8"));
      if (!Array.isArray(verses) || !verses.length) throw new Error(`${name} ${n} has no verses`);
      // Verse numbers run 1, 2, 3... so the position is the number.
      return verses.map((verse, i) => {
        if (Number(verse.number) !== i + 1) throw new Error(`${name} ${n}: verse ${i + 1} is out of order`);
        return String(verse.text || "").replace(/\s+/g, " ").trim();
      });
    });

    const body = `window.__bbBook(${JSON.stringify(slug)},${JSON.stringify(chapters)});\n`;
    writeFileSync(join(OUT, `${slug}.js`), body);
    bytes += Buffer.byteLength(body);
    index.push({ s: slug, n: name, c: chapters.length });
  }

  if (index.length !== 66) throw new Error(`Expected 66 books, packed ${index.length}`);
  const chapterTotal = index.reduce((sum, book) => sum + book.c, 0);
  if (chapterTotal !== 1189) throw new Error(`Expected 1189 chapters, packed ${chapterTotal}`);

  writeFileSync(join(OUT, "books.js"), `window.__bbBooks(${JSON.stringify(index)});\n`);
  console.log(`offline Bible: ${index.length} books, ${chapterTotal} chapters, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
}

main();
