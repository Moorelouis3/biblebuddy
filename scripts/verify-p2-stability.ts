/**
 * The P2 items from docs/STABILITY_VERIFICATION_2026-11-09.md.
 *
 *   npm run verify:p2-stability
 *
 * Five separate things, one test, because they are one idea: a screen should
 * never present a failure as a fact, and a button should never stay down.
 *
 *   P2-1  six screens rendered an empty state after a failed read, with no
 *         skeleton and nothing in the console. They get the LoadFailedNotice
 *         the five siblings already have - driven by a CHECKED ERROR, not a
 *         catch, because supabase-js does not throw.
 *   P2-2  the reset-password screen had no exit if its bootstrap threw at all:
 *         isValidToken stays null and the spinner runs for the life of the tab.
 *   P2-3  the photo composer awaits supabase.storage, which DOES throw, with
 *         no try around it - so the Post button never came back up. The one
 *         genuine lock-up in the whole audit.
 *   P2-4  the four auth doors showed "TypeError: Failed to fetch" to readers.
 *   P2-5  two reads that mean "everyone" or "all of it" had no limit, against
 *         tables the API truncates at 1000 rows without saying so.
 */
import { readFileSync } from "node:fs";
import { authErrorMessage, isUnreachableAuthError } from "../lib/authErrorMessage";

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}`);
  }
}

const read = (p: string) => readFileSync(p, "utf8");

// -- P2-1 - the screens that said "nothing here" after a failed read ---------

const SILENT_SCREENS = [
  "app/bible-trivia/books/page.tsx",
  "app/bible-trivia/people/page.tsx",
  "components/TriviaBookClient.tsx",
  "components/GroupPostThread.tsx",
  "app/devotionals/[id]/day/[dayNumber]/page.tsx",
];

for (const file of SILENT_SCREENS) {
  const source = read(file);
  check(`${file} can say it could not load`, /LoadFailedNotice/.test(source));
  check(`${file} has a failure state to say it with`, /setFailed\(/.test(source));
  check(
    `${file} offers a way to try again`,
    /onRetry=/.test(source) || /setReloadKey\(/.test(source),
  );
}

// ScrambledUpgradeGate is the odd one out. Its paid check is unreachable while
// CORE_STUDY_IS_FREE is true, so a retry screen there would be a retry screen
// nobody can reach. What it needed was to stop concluding "not paid" from a
// read that failed, and put an upgrade wall in front of someone who had paid.
const gate = read("components/ScrambledUpgradeGate.tsx");
check("the scrambled gate looks at the error on its access check", /const \{ data: profileStats, error \}/.test(gate));
check(
  "and a failed access check lets the reader play rather than locking them out",
  /if \(error\) \{[\s\S]{0,320}setIsPaid\(true\)[\s\S]{0,120}setShowUpgradeModal\(false\)/.test(gate),
);

// -- P2-2 - the reset-password spinner ---------------------------------------

const reset = read("app/reset-password/page.tsx");
check(
  "the reset-password bootstrap cannot leave the spinner running",
  /void checkToken\(\)[\s\S]{0,400}catch/.test(reset) && /setIsValidToken\(false\)/.test(reset),
);

// -- P2-3 - the photo composer lock ------------------------------------------

const feed = read("app/bb-feed/page.tsx");
const uploadIndex = feed.indexOf('supabase.storage.from("post-media").upload');
check("the photo upload is still there to check", uploadIndex > 0);
check(
  "the storage upload is inside a try - it is the one call that really throws",
  feed.slice(Math.max(0, uploadIndex - 500), uploadIndex).includes("try {"),
);
check(
  "a failed upload releases the Post button",
  /catch[\s\S]{0,400}setSubmitting\(false\)/.test(feed.slice(uploadIndex, uploadIndex + 900)),
);

// -- P2-4 - what the auth doors say ------------------------------------------

check(
  "a dropped connection is recognised by name",
  isUnreachableAuthError({ name: "AuthRetryableFetchError", message: "TypeError: Failed to fetch", status: 0 }),
);
check(
  "and by the raw fetch message, whatever wrapped it",
  isUnreachableAuthError({ message: "TypeError: Failed to fetch" }),
);
check("an aborted request counts too", isUnreachableAuthError({ name: "AbortError", message: "The operation was aborted" }));
check(
  "a wrong password is NOT a connection problem",
  !isUnreachableAuthError({ name: "AuthApiError", message: "Invalid login credentials", status: 400 }),
);
check("nothing at all is not a connection problem", !isUnreachableAuthError(null));

check(
  "a reader never sees the words TypeError or fetch",
  (() => {
    const text = authErrorMessage({ name: "AuthRetryableFetchError", message: "TypeError: Failed to fetch", status: 0 });
    return !/TypeError/i.test(text) && !/fetch/i.test(text) && text.length > 20;
  })(),
);
check(
  "a real auth message is passed through untouched",
  authErrorMessage({ name: "AuthApiError", message: "Invalid login credentials", status: 400 }) ===
    "Invalid login credentials",
);
check(
  "an empty message still says something",
  authErrorMessage({ name: "AuthApiError", message: "", status: 500 }).length > 10,
);

for (const door of [
  "app/signup/page.tsx",
  "app/login/page.tsx",
  "app/page.tsx",
  "app/reset-password/page.tsx",
]) {
  const source = read(door);
  check(`${door} runs auth errors through the shared wording`, /authErrorMessage\(/.test(source));
  check(
    `${door} no longer shows a raw error.message to the reader`,
    !/setError\(error\.message\)/.test(source) && !/setError\(signupError\.message\)/.test(source),
  );
}

// -- P2-5 - reads that meant "everyone" ---------------------------------------

const devotional = read("app/devotionals/[id]/page.tsx");
const profile = read("app/profile/[userId]/page.tsx");

check(
  "the three community-progress reads are bounded on purpose",
  /const STARTER_ROW_LIMIT = \d+;/.test(devotional) &&
    (devotional.match(/\.limit\(STARTER_ROW_LIMIT\)/g) || []).length === 3,
);
check(
  "the activity log is bounded on purpose",
  /\.limit\(ACTION_LOG_LIMIT\)/.test(profile) && /const ACTION_LOG_LIMIT = \d+;/.test(profile),
);
check(
  "the bounded reads take the most recent rows, not an arbitrary thousand",
  // \s rather than \n: git rewrites line endings in the working copy, and a
  // check that depends on which ones are on disk today is not a check.
  /\.order\("created_at", \{ ascending: false \}\)\s*\.limit\(STARTER_ROW_LIMIT\)/.test(devotional),
);

// -- Report --------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed.`);
if (failures.length) {
  for (const f of failures) console.error(`  failed: ${f}`);
  process.exit(1);
}
