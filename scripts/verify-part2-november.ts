/**
 * npm run verify:part2 — offline checks on the six November Part 2 emails.
 *
 * Reads the real modules and the real source text. Touches no network and no
 * database, so it runs in a second and cannot be affected by what is armed.
 *
 * What it is actually guarding:
 *
 *  - the copy survived the PDF recovery intact (no leftover private-use
 *    glyphs, no ⟦placeholder⟧ brackets, no reversed Hebrew);
 *  - every email still carries the personalisation token and the one CTA
 *    destination, and that destination is still a countable, public link;
 *  - nobody has quietly added a /study/<slug> link whose slug does not exist,
 *    which is the failure that answers 200 and still dead-ends a reader;
 *  - the 12 November email has not been added back, since its approved body
 *    was never stored;
 *  - the install script still cannot arm anything by itself.
 */
import { readFileSync } from "node:fs";
import { PART_TWO_NOVEMBER } from "../lib/email/partTwoNovemberContent";
import { renderFridayLessonHtml, renderFridayLessonText } from "../lib/email/fridayTeachingSeries";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    console.log(`  ok    ${name}`);
  } else {
    failures++;
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const CTA = "https://www.mybiblebuddy.net/events/beginning-of-everything";
const EXPECTED = [
  ["part2-nov-15-rivers-of-eden", "2026-11-15"],
  ["part2-nov-18-about-eve", "2026-11-18"],
  ["part2-nov-21-genesis-1", "2026-11-21"],
  ["part2-nov-24-why-noah", "2026-11-24"],
  ["part2-nov-27-noahs-ark", "2026-11-27"],
  ["part2-nov-30-after-the-flood", "2026-11-30"],
];

console.log("\nPart 2 November — the lineup\n");
check("six emails, no more and no fewer", PART_TWO_NOVEMBER.length === 6, `got ${PART_TWO_NOVEMBER.length}`);
for (const [id, date] of EXPECTED) {
  const e = PART_TWO_NOVEMBER.find((x) => x.id === id);
  check(`${id} is present and dated ${date}`, !!e && e.sendDate === date, e ? `dated ${e.sendDate}` : "missing");
}
check(
  "12 November is NOT here (its approved body was never stored)",
  !PART_TWO_NOVEMBER.some((e) => e.sendDate === "2026-11-12" || /nov-12/.test(e.id)),
);
check("dates are in order", PART_TWO_NOVEMBER.every((e, i, a) => i === 0 || a[i - 1].sendDate < e.sendDate));

console.log("\nEvery email, rendered\n");
for (const e of PART_TWO_NOVEMBER) {
  const html = renderFridayLessonHtml(e);
  const text = renderFridayLessonText(e);
  const both = html + "\n" + text;

  check(`${e.id}: personalisation token in HTML and text`, html.includes("{{first_name}}") && text.includes("{{first_name}}"));
  check(`${e.id}: the CTA destination is present`, html.includes(CTA) && text.includes(CTA));
  check(`${e.id}: exactly one CTA block`, e.blocks.filter((b) => b.type === "cta").length === 1);
  check(`${e.id}: signoff is Louis, Creator of Bible Buddy`, e.signoff?.title.startsWith("Creator of Bible Buddy") === true);
  check(`${e.id}: has a subject and a preheader`, !!e.subject && !!e.preheader);
  check(`${e.id}: nothing renders as the literal "undefined"`, !both.includes("undefined"));

  // The PDF recovery's own failure modes.
  const pua = [...both].some((c) => {
    const cp = c.codePointAt(0)!;
    return (cp >= 0xe000 && cp <= 0xf8ff) || (cp >= 0xf0000 && cp <= 0xffffd);
  });
  check(`${e.id}: no undecoded glyphs left from the PDF`, !pua);
  check(`${e.id}: no ⟦placeholder⟧ brackets left in the copy`, !/[⟦⟧]/.test(both));

  // A /study/<slug> link answers 200 even when the slug does not exist, then
  // redirects to /devotionals, which is behind the signup wall.
  check(`${e.id}: no /study/<slug> link (they fail silently)`, !/mybiblebuddy\.net\/study\//.test(both));
  // Any link we add has to be ours, or linkTagging cannot make the click countable.
  const foreign = [...both.matchAll(/https?:\/\/([^\s"'<>)]+)/g)]
    .map((m) => m[1].split("/")[0])
    .filter((h) => !/(^|\.)mybiblebuddy\.net$/.test(h) && !/supabase\.co$/.test(h));
  check(`${e.id}: every link is on our own domain`, foreign.length === 0, foreign.join(", "));
}

console.log("\nThe Hebrew the PDF reversed\n");
const eve = PART_TWO_NOVEMBER.find((e) => e.id === "part2-nov-18-about-eve")!;
const eveText = renderFridayLessonText(eve);
check("Chavvah reads chet-vav-he, not reversed", eveText.includes("חַוָּה"));
check("the reversed form is gone", !eveText.includes("הָּוַח"));

console.log("\nThe install script cannot arm by accident\n");
const installer = readFileSync("scripts/install-part2-november.ts", "utf8");
check("new rows are written paused", /status: "paused"/.test(installer));
check("arming is behind its own --arm flag", /has\("--arm"\)/.test(installer));
check("every row gets a scheduled_for", /scheduled_for: sendAtUtc\(e\)/.test(installer));
check(
  "the note warns against clearing scheduled_for",
  /DO NOT CLEAR scheduled_for/.test(installer),
);
check("sends are tagged with the campaign id so arrivals attribute", /campaignId: email\.id/.test(installer));

console.log(`\n${failures === 0 ? "All checks passed." : `${failures} check(s) FAILED.`}\n`);
process.exit(failures === 0 ? 0 : 1);
