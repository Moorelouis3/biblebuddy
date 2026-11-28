// Luther 1912 (public domain) from eBible.org's verse-per-line file into the
// same shape as public/kjv: public/luther1912/<book-slug>/<chapter>.json
//
// Source: https://ebible.org/Scriptures/deu1912_vpl.zip ("Lutherbibel 1912,
// Public Domain"). That edition is already laid out on the King James
// chapter and verse numbers (1,189 chapters, 31,102 verses, checked against
// public/kjv by this script), with Luther's own number in square brackets
// where the two differ ("[3:1]" at Joel 2:28). The brackets are dropped here,
// so every note, bookmark and progress row keyed to a King James verse lands
// on the same verse in German.
//
//   node scripts/import-luther-1912.mjs <deu1912_vpl.txt> . --write
import fs from "node:fs";
import path from "node:path";
const [src, repo, write] = [process.argv[2], process.argv[3], process.argv[4] === "--write"];
const CODES = { GEN:"genesis",EXO:"exodus",LEV:"leviticus",NUM:"numbers",DEU:"deuteronomy",JOS:"joshua",JDG:"judges",RUT:"ruth","1SA":"1-samuel","2SA":"2-samuel","1KI":"1-kings","2KI":"2-kings","1CH":"1-chronicles","2CH":"2-chronicles",EZR:"ezra",NEH:"nehemiah",EST:"esther",JOB:"job",PSA:"psalms",PRO:"proverbs",ECC:"ecclesiastes",SOL:"song-of-solomon",ISA:"isaiah",JER:"jeremiah",LAM:"lamentations",EZE:"ezekiel",DAN:"daniel",HOS:"hosea",JOE:"joel",AMO:"amos",OBA:"obadiah",JON:"jonah",MIC:"micah",NAH:"nahum",HAB:"habakkuk",ZEP:"zephaniah",HAG:"haggai",ZEC:"zechariah",MAL:"malachi",MAT:"matthew",MAR:"mark",LUK:"luke",JOH:"john",ACT:"acts",ROM:"romans","1CO":"1-corinthians","2CO":"2-corinthians",GAL:"galatians",EPH:"ephesians",PHI:"philippians",COL:"colossians","1TH":"1-thessalonians","2TH":"2-thessalonians","1TI":"1-timothy","2TI":"2-timothy",TIT:"titus",PHM:"philemon",HEB:"hebrews",JAM:"james","1PE":"1-peter","2PE":"2-peter","1JO":"1-john","2JO":"2-john","3JO":"3-john",JUD:"jude",REV:"revelation" };
const chapters = new Map();
for (const line of fs.readFileSync(src, "utf8").split(/\r?\n/)) {
  const m = line.match(/^(\S+) (\d+):(\d+) (.*)$/);
  if (!m) { if (line.trim()) console.log("skipped:", line.slice(0, 60)); continue; }
  const slug = CODES[m[1]]; if (!slug) throw new Error("unknown book " + m[1]);
  const key = slug + "/" + Number(m[2]);
  if (!chapters.has(key)) chapters.set(key, []);
  chapters.get(key).push({ number: Number(m[3]), text: m[4].replace(/\s*\[\d+(?::\d+)?b?\]\s*/g, " ").replace(/ {2,}/g, " ").trim() });
}
let diffs = 0, files = 0, empty = 0;
for (const [key, verses] of chapters) {
  const kjvFile = path.join(repo, "public/kjv", key + ".json");
  if (!fs.existsSync(kjvFile)) { console.log("no KJV chapter for", key); diffs++; continue; }
  const kjv = JSON.parse(fs.readFileSync(kjvFile, "utf8"));
  if (kjv.length !== verses.length) { diffs++; if (diffs < 15) console.log("verse count differs", key, "kjv", kjv.length, "lut", verses.length); }
  empty += verses.filter((v) => !v.text).length;
  if (write) { const out = path.join(repo, "public/luther1912", key + ".json"); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, JSON.stringify(verses)); files++; }
}
const kjvCount = fs.readdirSync(path.join(repo, "public/kjv")).reduce((n, b) => n + fs.readdirSync(path.join(repo, "public/kjv", b)).length, 0);
console.log({ chapters: chapters.size, kjvChapters: kjvCount, diffs, emptyVerses: empty, written: files });
