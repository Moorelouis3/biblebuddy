/**
 * The content filter must never block Scripture.
 *
 * This is the failure that would matter in a Bible app: somebody quotes
 * Numbers 22 or Hosea 4 in the feed and is told their post is objectionable.
 * So every blocked term is checked against the whole KJV text shipped in
 * public/kjv, and any term that appears in Scripture fails this script.
 *
 *   npx tsx scripts/check-content-filter.ts
 */
import fs from "node:fs";
import path from "node:path";
import { BLOCKED_TERMS, checkContent } from "../lib/contentFilter";

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

const kjvDir = path.join(process.cwd(), "public", "kjv");

/** Every verse in the shipped KJV, lowercased. */
function loadScripture(): string {
  const parts: string[] = [];
  for (const book of fs.readdirSync(kjvDir)) {
    const bookDir = path.join(kjvDir, book);
    if (!fs.statSync(bookDir).isDirectory()) continue;
    for (const file of fs.readdirSync(bookDir)) {
      if (!file.endsWith(".json")) continue;
      const raw = JSON.parse(fs.readFileSync(path.join(bookDir, file), "utf8"));
      for (const verse of Object.values(raw) as { text?: string }[]) {
        if (verse?.text) parts.push(verse.text.toLowerCase());
      }
    }
  }
  return parts.join(" \n ");
}

console.log("\nLoading the KJV shipped in public/kjv…");
const scripture = loadScripture();
console.log(`  ${(scripture.length / 1_000_000).toFixed(1)}M characters of Scripture loaded.\n`);

console.log("Every blocked term must be absent from Scripture:");
const offenders: string[] = [];
for (const term of BLOCKED_TERMS) {
  const pattern = new RegExp(`\\b${term.replace(/\s+/g, "\\s+")}\\b`, "i");
  if (pattern.test(scripture)) offenders.push(term);
}
check(
  `none of the ${BLOCKED_TERMS.length} blocked terms appears in the KJV`,
  offenders.length === 0,
  offenders.length ? `IN SCRIPTURE: ${offenders.join(", ")}` : "",
);

console.log("\nReal verses that a naive word list would block:");
const verses: [string, string][] = [
  ["Numbers 22:28", "And the LORD opened the mouth of the ass, and she said unto Balaam, What have I done unto thee, that thou hast smitten me these three times?"],
  ["Revelation 17:1", "Come hither; I will shew unto thee the judgment of the great whore that sitteth upon many waters"],
  ["Mark 16:16", "but he that believeth not shall be damned"],
  ["Deuteronomy 23:2", "A bastard shall not enter into the congregation of the LORD"],
  ["2 Kings 18:27", "that they may eat their own dung, and drink their own piss with you?"],
  ["Matthew 5:22", "shall be in danger of hell fire"],
  ["Hosea 4:14", "for themselves are separated with whores, and they sacrifice with harlots"],
  ["Ezekiel 23:3", "and there were their breasts pressed, and there they bruised the teats of their virginity"],
  ["Genesis 25:6", "But unto the sons of the concubines, which Abraham had, Abraham gave gifts"],
];
for (const [ref, text] of verses) {
  const result = checkContent(text);
  check(`${ref} posts fine`, result.ok, result.ok ? "" : `blocked on "${result.matched}"`);
}

console.log("\nOrdinary posts must pass:");
for (const text of [
  "Finished day 3 today, the part about Cain really got me",
  "Please pray for my mum, she is in hospital",
  "What does 'selah' actually mean?",
  "I class this as the hardest chapter so far",
  "Shittim wood is used all through the tabernacle", // contains "shit" as a substring
  "Scunthorpe is where I grew up", // the classic false positive
  "shut up and listen", // must not match shit
  "he shot the arrow",
  "I was so chuffed",
]) {
  const r = checkContent(text);
  check(`"${text.slice(0, 44)}…"`, r.ok, r.ok ? "" : `blocked on "${r.matched}"`);
}

console.log("\nActually objectionable posts must be stopped:");
for (const text of [
  "you are a fucking idiot",
  "f u c k this app",
  "f*ck off",
  "shut up you retard",
  "go kill yourself",
  "check out this porn site",
  "f.u.c.k you",
  "what a b*tch",
]) {
  const r = checkContent(text);
  check(`"${text.slice(0, 44)}" is blocked`, !r.ok, r.ok ? "GOT THROUGH" : `caught "${r.matched}"`);
}

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
