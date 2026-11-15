/**
 * npm run verify:day-complete
 *
 * The day-complete popup is ONE template for every study (Louis, 2026-11-15).
 * These hold the promises that make that true, and the ones about the book:
 * it is only offered when there is a real Amazon address, it is never in the
 * way of the study, and what people do with the popup is counted - once, for
 * all studies together. Offline: it reads the source.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`  ok  ${name}`);
};

const read = (path: string) => readFileSync(path, "utf8");
const popup = read("components/DevotionalDayCompletionModal.tsx");
const route = read("app/api/landing-analytics/route.ts");
const dashboard = read("lib/adminDashboard.ts");

check("one template: the popup reads the study's own row, and names no study", () => {
  assert.ok(popup.includes('.from("devotionals")') && popup.includes("cover_image, paperback_url, total_days"));
  for (const title of ["Proverbs", "Abraham", "Beginning of Everything", "Higher Hope", "Tempting", "21 Women"]) {
    assert.ok(!popup.includes(`"${title}`), `${title} is not written into the popup`);
  }
});

check("every screen that finishes a day opens the same popup", () => {
  assert.ok(read("app/devotionals/[id]/day/[dayNumber]/page.tsx").includes("devotionalId={devotionalId}"));
  assert.ok(read("app/devotionals/[id]/page.tsx").includes("devotionalId={devotionalId}"));
  const journey = read("components/DashboardJourneyExperience.tsx");
  assert.ok(journey.includes("devotionalId={currentDevotionalId || null}"));
  // Bible in One Year used to have a dark card of its own.
  assert.ok(journey.includes("book={{ coverImage: BIBLE_YEAR_SHELF_COVER, url: BIBLE_YEAR_PAPERBACK_URL }}"));
  assert.ok(!journey.includes("Congratulations, you finished Day"));
});

check("no Amazon address, no book card", () => {
  assert.ok(popup.includes("const bookUrl = validBookUrl("));
  assert.ok(popup.includes("const showBook = isCelebration && Boolean(bookUrl);"));
  assert.ok(popup.includes("{showBook && bookUrl ? ("));
  assert.ok(!/coming soon/i.test(popup.replace(/\/\*[\s\S]*?\*\//g, "")));
});

check("the study is always the main button, and the book never replaces it", () => {
  const book = popup.indexOf('aria-label="Get the book"');
  const main = popup.indexOf("onClick={handlePrimary}", book);
  assert.ok(book > 0 && main > book, "Start Day comes after the book card, as its own button");
});

check("the popup does not invent a locked day", () => {
  // The first version read the group-study calendar and would have told
  // people a day was closed that the app lets them open.
  assert.ok(!popup.includes("isCommunityEventDayUnlocked"));
  assert.ok(popup.includes("nextDayAvailability"));
});

check("the last day celebrates the whole study", () => {
  assert.ok(popup.includes("You finished the whole study!") && popup.includes("Study complete"));
});

check("every answer is counted, and none of it is study activity", () => {
  const start = route.indexOf("const MASTER_ACTION_BY_EVENT");
  const mapped = route.slice(start, route.indexOf("};", start));
  for (const event of [
    "day_complete_popup_shown",
    "day_complete_book_shown",
    "day_complete_next_clicked",
    "day_complete_bookshelf_clicked",
    "day_complete_closed",
    "study_guide_amazon_clicked",
  ]) {
    assert.ok(popup.includes(`"${event}"`), `${event} is sent`);
    assert.ok(route.includes(`"${event}"`), `${event} is accepted`);
    assert.ok(!mapped.includes(event), `${event} is not study activity`);
  }
  assert.ok(!/from\("master_actions"\)/.test(popup));
});

check("the admin page has one Completed day popup section, for all studies together", () => {
  assert.ok(dashboard.includes("const dayCompletePopup = {"));
  assert.ok(dashboard.includes('placement === "day_complete"'));
  const view = read("components/admin/AnalyticsDashboardView.tsx");
  assert.equal((view.match(/>Completed day popup</g) || []).length, 1);
});

console.log(`\n${passed} checks passed.`);
