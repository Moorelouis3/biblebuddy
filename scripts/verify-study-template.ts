/**
 * npm run verify:study-template
 *
 * Every study guide uses the Wisdom of Proverbs template, and there is one
 * shelf. Offline: it reads the source, like the other verify:* scripts.
 *
 * This exists because the layout used to be chosen by matching a study's
 * TITLE against hand-kept lists, in two different files that did not agree.
 * On 12 November 2026 three studies were on the Proverbs template and 23 were
 * not - 16 on a six-task layout and 7 on a fallback with no Reading, Trivia or
 * Discussion slot at all. Nothing errored; a study just came out wrong and
 * stayed wrong until somebody opened it. It cost two launches and at least one
 * reader who answered a reflection, got no credit for it and could not open
 * the next day. docs/STUDY_LAYOUT_LISTS.md is the history.
 *
 * So the check is not "are the lists right". It is "are the lists gone".
 */
import fs from "node:fs";
import path from "node:path";

const STUDY_PAGE = path.join("app", "devotionals", "[id]", "page.tsx");
const DAY_MODAL = path.join("components", "DevotionalDayModal.tsx");
const DASHBOARD = path.join("components", "DashboardJourneyExperience.tsx");
const LIBRARY = path.join("components", "library", "LibraryPage.tsx");
const OLD_SHELF = path.join("app", "devotionals", "page.tsx");

const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
};
const read = (file: string) => {
  if (!fs.existsSync(file)) {
    failures.push(`missing ${file}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
};

// 1. The study page hands every study the template, with no title in the way.
const studyPage = read(STUDY_PAGE);
const predicate = studyPage.match(/function isModernStudyPlanTitle\([^)]*\)\s*\{([\s\S]*?)\n\}/);
check(Boolean(predicate), `${STUDY_PAGE}: isModernStudyPlanTitle not found`);
if (predicate) {
  const body = predicate[1].trim();
  check(body === "return true;", `${STUDY_PAGE}: isModernStudyPlanTitle is conditional again - "${body.slice(0, 80)}"`);
}

// 2. The day modal agrees. It used to carry its own, different list, so a
// study could have the four slots on one screen and not on the other.
const modal = read(DAY_MODAL);
const modalFlag = modal.match(/const useSeriesLikeProverbsLayout = ([^;]+);/);
check(Boolean(modalFlag), `${DAY_MODAL}: useSeriesLikeProverbsLayout not found`);
if (modalFlag) {
  check(
    modalFlag[1].trim() === "true",
    `${DAY_MODAL}: useSeriesLikeProverbsLayout is conditional again - "${modalFlag[1].trim().slice(0, 80)}"`,
  );
}
for (const gone of ["isTestingOfJoseph", "isObedienceOfAbraham", "isRiseOfEsther"]) {
  check(!modal.includes(`const ${gone} =`), `${DAY_MODAL}: the per-study flag ${gone} is back`);
}

// 3. One shelf. The app tab and /library render the same component.
const dashboard = read(DASHBOARD);
check(
  dashboard.includes('import BibleStudiesLibraryPage from "./library/LibraryPage"'),
  `${DASHBOARD}: the Library tab should render components/library/LibraryPage`,
);
check(
  !dashboard.includes('from "../app/devotionals/page"'),
  `${DASHBOARD}: the old shelf (app/devotionals/page.tsx) is being imported again`,
);

// 4. The old shelf is a redirect, not a screen.
const oldShelf = read(OLD_SHELF);
check(oldShelf.includes('redirect("/library")'), `${OLD_SHELF}: should redirect to /library`);
check(!oldShelf.includes('"use client"'), `${OLD_SHELF}: the old client shelf is back`);
check(oldShelf.length < 4000, `${OLD_SHELF}: should be a redirect, but it is ${oldShelf.length} characters`);

// 5. The shelf can be embedded, which is what lets Back come back to it.
const library = read(LIBRARY);
check(library.includes("embedded"), `${LIBRARY}: should accept an embedded prop`);
check(library.includes("onStudySelect"), `${LIBRARY}: should accept onStudySelect`);
check(
  /if \(embedded && onStudySelect\)/.test(library),
  `${LIBRARY}: embedded taps should call onStudySelect instead of navigating`,
);

if (failures.length) {
  console.error(`verify:study-template FAILED with ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("verify:study-template passed. Every study gets the Proverbs template, and there is one shelf.");
