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

// ---- 2026-11-19: the popup was wired but nothing opened it ----
//
// From 15 Nov to 19 Nov production recorded 0 real popups against 74 Bible
// in One Year finishes and 7+ four-task study finishes. Bible in One Year set
// its popup state to null on completion (a June change nobody undid), and the
// study page only opened it from the legacy section modal no four-task day
// reaches. These hold the wiring itself.

const journey = read("components/DashboardJourneyExperience.tsx");
const studyPage = read("app/devotionals/[id]/page.tsx");
const sliceFrom = (source: string, start: string, length = 6000) => {
  const at = source.indexOf(start);
  assert.ok(at >= 0, `${start} exists`);
  return source.slice(at, at + length);
};

check("Bible in One Year: a new finish opens the popup with that day", () => {
  const body = sliceFrom(journey, "async function markBibleYearDayCardsComplete(");
  assert.ok(body.includes("if (celebrate && !dayWasFullyComplete && newlyCompletedCards.length > 0) {"));
  assert.ok(body.includes("setBibleYearCompletionModalDay(day);"));
  // Somewhere, something must open it - a state only ever set to null is
  // exactly the bug.
  assert.ok(/setBibleYearCompletionModalDay\((?!null)/.test(journey), "the popup state is set to a day somewhere");
});

check("Bible in One Year: background catch-up records the day but does not pop up", () => {
  assert.ok(journey.includes('markBibleYearDayCardsComplete(day, ["reflection"], { celebrate: false })'));
});

check("Bible in One Year: the popup carries the plan's own book", () => {
  const modal = sliceFrom(journey, "function renderBibleYearCompletionModal()", 2500);
  assert.ok(modal.includes('devotionalTitle="Bible in One Year"'));
  assert.ok(modal.includes("url: BIBLE_YEAR_PAPERBACK_URL"));
});

check("study page: the fourth ticked part opens the popup, any order", () => {
  assert.ok(studyPage.includes("const isFourTaskDayFinished = (day: DevotionalDay) =>"));
  assert.ok(studyPage.includes("setCelebrationDay(arm.day);"));
  // Every part a reader does here arms it: Overview, Reading, Trivia, and
  // both kinds of Discussion box.
  const arms = (studyPage.match(/armDayCelebration\((?:dayNumber|day\.day_number)\);/g) || []).length;
  assert.ok(arms >= 5, `five places arm the popup, found ${arms}`);
  const intro = sliceFrom(studyPage, "const handleIntroComplete = async", 300);
  assert.ok(intro.includes("armDayCelebration(dayNumber);"));
  const reader = sliceFrom(studyPage, "const handlePlanReaderChapterComplete = async", 600);
  assert.ok(reader.includes("armDayCelebration(day.day_number);"));
});

check("study page: finding an old reply never arms it", () => {
  // onUserHasPosted fires when a thread loads and the reader had already
  // posted - that is discovery, not finishing.
  for (const block of studyPage.split("onUserHasPosted={() => {").slice(1)) {
    const body = block.slice(0, block.indexOf("}}"));
    assert.ok(!body.includes("armDayCelebration"), "onUserHasPosted does not arm the popup");
  }
});

check("study page: the reading tick counts a chapter already read, as the day row does", () => {
  const helper = sliceFrom(studyPage, "const isFourTaskDayFinished = (day: DevotionalDay) =>", 700);
  assert.ok(helper.includes("completedReaderChapterKeys.has("));
  assert.ok(studyPage.includes("const wisdomReadingDone = dayProgress?.reading_completed === true || readerChapterDone;"));
});

check("dashboard study day: a chapter read elsewhere does not swallow the finish", () => {
  const complete = sliceFrom(journey, "async function completeDevotionalDay(", 1500);
  assert.ok(complete.includes("const alreadyComplete = isDevotionalDashboardDayFinished();"));
  assert.ok(journey.includes("celebratedDevotionalDaysRef.current.has(celebrationKey)"));
});

check("tracking goes to an absolute address that survives the page closing", () => {
  const tracker = read("lib/wisdomOfProverbsProducts.ts");
  assert.ok(tracker.includes("fetch(`${window.location.origin}/api/landing-analytics`"));
  assert.ok(tracker.includes("keepalive: true"));
});

check("admin: previews are not readers, and coverage is against the completion record", () => {
  assert.ok(dashboard.includes("const dayPopupRows = dayPopupRowsAll.filter((row) => !isPreviewPath(row.page_path));"));
  assert.ok(dashboard.includes('.eq("action_type", "bible_in_one_year_day_completed")'));
  assert.ok(dashboard.includes("bibleYearCoverage: rateOrNull(bibleYearShown, bibleYearFinished.length)"));
  // A study's devotional_day_completed is the Overview tick, never a finished day.
  const section = sliceFrom(dashboard, "const DAY_POPUP_SINCE", 6000);
  assert.ok(!section.includes('.eq("action_type", "devotional_day_completed")'));
});

console.log(`\n${passed} checks passed.`);
