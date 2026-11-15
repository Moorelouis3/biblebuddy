/**
 * npm run verify:book-links
 *
 * A study's "buy the book" link has to do two things: go somewhere real, and
 * leave a trace when it is tapped. On 15 November 2026 neither was true
 * everywhere: Bible in One Year had been Live on Amazon for weeks with no
 * link in the app, the strip on every study day recorded nothing, and the
 * Library button's tap was refused by the analytics route as an unknown
 * event. This holds those three shut. Offline: it reads the source.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BIBLE_YEAR_PAPERBACK_URL } from "../lib/bibleYearBook";

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`  ok  ${name}`);
};

const read = (path: string) => readFileSync(path, "utf8");

check("Bible in One Year has a book address, in the Amazon /dp/<ASIN> shape", () => {
  assert.match(String(BIBLE_YEAR_PAPERBACK_URL), /^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}$/);
});

check("both Bible in One Year screens read that one address", () => {
  assert.ok(read("lib/libraryCatalog.ts").includes("paperback_url: BIBLE_YEAR_PAPERBACK_URL"));
  assert.ok(read("components/bibleinoneyear/BibleInOneYearLandingPage.tsx").includes("const PAPERBACK_URL = BIBLE_YEAR_PAPERBACK_URL;"));
});

check("the strip on a study day records a tap, and says where it was", () => {
  const strip = read("components/devotionals/PaperbackStrip.tsx");
  assert.ok(strip.includes('trackWisdomBookEvent("study_guide_amazon_clicked"'));
  assert.ok(read("app/devotionals/[id]/day/[dayNumber]/page.tsx").includes('placement="study_day"'));
  assert.ok(read("app/devotionals/[id]/page.tsx").includes('placement="study_page"'));
});

check("the analytics route accepts the tap, and it is not study activity", () => {
  const route = read("app/api/landing-analytics/route.ts");
  assert.ok(route.includes('"study_guide_amazon_clicked"'));
  const start = route.indexOf("const MASTER_ACTION_BY_EVENT");
  assert.ok(!route.slice(start, route.indexOf("};", start)).includes("study_guide_amazon_clicked"));
});

check("a book tap is sent in a way the iPhone app can finish", () => {
  const helper = read("lib/wisdomOfProverbsProducts.ts");
  assert.ok(helper.includes("${window.location.origin}/api/landing-analytics"));
  assert.ok(helper.includes("keepalive: true"));
});

console.log(`\n${passed} checks passed.`);
