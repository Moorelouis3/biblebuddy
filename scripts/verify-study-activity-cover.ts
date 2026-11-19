/**
 * Feed Study Activity cards: which cover each one shows.
 *
 *   npm run verify:study-activity-cover
 *
 * Offline. Bible in One Year has no `devotionals` row, so its posts used to
 * fall back to the open-book placeholder. This proves they now get the real
 * cover, old posts included (the card keys on the sentence, not on metadata),
 * that a devotional study still gets its own cover, and that a post with no
 * cover on file still falls back.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// lib/libraryCatalog reaches the browser Supabase client at import time, which
// needs the public env vars to exist. Nothing here talks to the database, so a
// placeholder is enough when no .env.local is present.
process.env.NEXT_PUBLIC_SUPABASE_URL ||= "http://localhost:54321";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= "placeholder";

/* eslint-disable @typescript-eslint/no-require-imports */
const { readStudyActivity, milestoneSentence } =
  require("../lib/communityMilestones") as typeof import("../lib/communityMilestones");
const { resolveStudyActivityCover } =
  require("../lib/studyActivityCover") as typeof import("../lib/studyActivityCover");
const { BIBLE_YEAR_SHELF_COVER } =
  require("../lib/libraryCatalog") as typeof import("../lib/libraryCatalog");
/* eslint-enable @typescript-eslint/no-require-imports */

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok - ${label}`);
}

const BEGINNING_COVER = "https://example.test/beginning-cover.jpg";
const catalog = { "The Beginning of Everything": BEGINNING_COVER };

function coverFor(content: string, covers: Record<string, string> = catalog) {
  const activity = readStudyActivity(content);
  assert.ok(activity, `not recognised as study activity: ${content}`);
  return resolveStudyActivityCover(activity.title, covers);
}

check("the Bible in One Year cover file exists under public/", () => {
  assert.equal(BIBLE_YEAR_SHELF_COVER, "/bible-in-one-year-cover.png");
  assert.ok(fs.existsSync(path.join(process.cwd(), "public", BIBLE_YEAR_SHELF_COVER)));
});

check("old Bible in One Year Day 2 and Day 3 posts get the BIOY cover", () => {
  assert.equal(coverFor("✅ Finished Day 2 of Bible in One Year."), BIBLE_YEAR_SHELF_COVER);
  assert.equal(coverFor("✅ Finished Day 3 of Bible in One Year."), BIBLE_YEAR_SHELF_COVER);
});

check("a freshly written Bible in One Year post gets the BIOY cover", () => {
  const sentence = milestoneSentence("bible_in_one_year_day_completed", "Bible in One Year Day 143 Completed: Title");
  assert.ok(sentence);
  assert.equal(coverFor(sentence), BIBLE_YEAR_SHELF_COVER);
});

check("BIOY cover does not depend on the devotionals catalogue having loaded", () => {
  assert.equal(coverFor("✅ Finished Day 2 of Bible in One Year.", {}), BIBLE_YEAR_SHELF_COVER);
});

check("The Beginning of Everything keeps its own cover", () => {
  assert.equal(coverFor('✅ Completed Day 4 of "The Beginning of Everything".'), BEGINNING_COVER);
});

check("an unrelated activity with no cover falls back (null)", () => {
  assert.equal(coverFor("✅ Completed Day 1 of a Bible study."), null);
  assert.equal(coverFor("📖 Finished the book of Genesis."), null);
  assert.equal(coverFor('✅ Completed Day 1 of "Some Retired Study".'), null);
  assert.equal(resolveStudyActivityCover(null, catalog), null);
});

console.log(`\n${passed} checks passed`);
