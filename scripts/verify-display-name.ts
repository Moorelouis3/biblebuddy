/**
 * npm run verify:display-name
 *
 * The community feed shows a member's profile name next to their study
 * activity. On 2026-11-13 it was showing "Bible Buddy User" on real people's
 * posts, one of them 48 times.
 *
 * Two faults, and this guards both:
 *
 *  1. components/AppShell.tsx wrote the placeholder INTO the profile at OAuth
 *     signup - `saveSignupAttributionForUser(id, username || "Bible Buddy
 *     User")`, and that function sets display_name and username. 325 profiles
 *     carried it. It is worse than an empty name, because the feed already
 *     falls back gracefully on empty and the prompt below asks an unnamed
 *     account for a real name.
 *
 *  2. components/DisplayNamePromptGate.tsx asks a new account for its real
 *     name after the first meaningful action - but its placeholder check did
 *     not include "Bible Buddy User". So the accounts worst affected looked
 *     like they had already answered and were never asked. 165 of them were
 *     created after that prompt shipped.
 *
 * Offline, source-asserting, like the other verify:* scripts.
 */
import fs from "node:fs";
import path from "node:path";

const APP_SHELL = path.join("components", "AppShell.tsx");
const PROMPT_GATE = path.join("components", "DisplayNamePromptGate.tsx");

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

// 1. Nothing writes the placeholder onto a profile any more.
const appShell = read(APP_SHELL);
check(
  // No dotAll `s` flag: this project's TS target predates es2018 and tsc
  // rejects it (TS1501). It was never needed - [^)] already matches newlines,
  // and it is what keeps this inside the call's own parentheses instead of
  // running on to the next mention of the placeholder in a comment.
  !/saveSignupAttributionForUser\([^)]*"Bible Buddy User"/.test(appShell),
  `${APP_SHELL}: the placeholder is being passed to saveSignupAttributionForUser again`,
);
check(
  !/display_name:\s*"Bible Buddy User"|username:\s*"Bible Buddy User"/.test(appShell),
  `${APP_SHELL}: the placeholder is being written to a profile column again`,
);
check(
  /function usableName\(/.test(appShell),
  `${APP_SHELL}: usableName is gone - it is what keeps a placeholder out of the profile`,
);
// A real name or nothing: the name columns must be spread in conditionally.
check(
  /\.\.\.\(realName \? \{ display_name: realName, username: realName \} : \{\}\)/.test(appShell),
  `${APP_SHELL}: the name columns should only be written when there is a real name`,
);

// 2. The prompt recognises every placeholder this app has ever written, so
// the accounts carrying one actually get asked.
const gate = read(PROMPT_GATE);
const listed = gate.match(/const PLACEHOLDER_NAMES = new Set\(\[([\s\S]*?)\]\)/);
check(Boolean(listed), `${PROMPT_GATE}: PLACEHOLDER_NAMES not found`);
if (listed) {
  const body = listed[1].toLowerCase();
  for (const name of ["bible buddy user", "user", "new user", "guest", "anonymous"]) {
    check(body.includes(`"${name}"`), `${PROMPT_GATE}: PLACEHOLDER_NAMES no longer lists "${name}"`);
  }
  // bible-buddy@mybiblebuddy.net posts the Verse of the Day under the name
  // "Bible Buddy". Listing it as a placeholder would have the app asking its
  // own brand account to pick a different name.
  check(
    !/"bible buddy"/.test(body),
    `${PROMPT_GATE}: "bible buddy" is the brand account's real name, not a placeholder`,
  );
}
check(
  /PLACEHOLDER_NAMES\.has\(lower\)/.test(gate),
  `${PROMPT_GATE}: isPlaceholderDisplayName does not consult PLACEHOLDER_NAMES`,
);

// 2b. Louis's decisions, 2026-11-13. Each one is a choice someone could undo
// by accident later, so each one is asserted.
//
// Both names required.
check(/validateNamePart\(firstName, "first"\)/.test(gate), `${PROMPT_GATE}: the first name is no longer validated`);
check(/validateNamePart\(lastName, "last"\)/.test(gate), `${PROMPT_GATE}: the last name is no longer required`);
check(/autoComplete="given-name"/.test(gate) && /autoComplete="family-name"/.test(gate),
  `${PROMPT_GATE}: both name fields should be present and autofillable`);
// A name is not US-shaped. These must keep passing.
check(/\\p\{L\}/u.test(gate), `${PROMPT_GATE}: name validation should accept letters in any script`);
// Asked when activity publishes, not on a launch date. The old gate turned
// away 1,829 accounts that could never be asked.
check(!/FEATURE_LAUNCH_AT/.test(gate), `${PROMPT_GATE}: the launch-date gate is back, which excludes existing members`);
check(
  /COMMUNITY_MILESTONES\.has\(actionType/.test(gate),
  `${PROMPT_GATE}: the prompt should only open for actions that publish to the community`,
);
// A photo is never required.
check(!/photoFile\s*===?\s*null\s*\)\s*\{[^}]*setError/.test(gate), `${PROMPT_GATE}: a profile photo must stay optional`);
check(/initialsOf\(/.test(gate), `${PROMPT_GATE}: the initials fallback preview is gone`);
// The migration may not have run; saving must still work.
check(/isMissingNameColumn\(/.test(gate), `${PROMPT_GATE}: saving should fall back when first_name/last_name do not exist`);

// 3. The wall itself refuses a placeholder, so nothing publishes under one
// even if the prompt has not been answered yet.
const MILESTONES = path.join("lib", "communityMilestones.ts");
const milestones = read(MILESTONES);
check(/export function isPlaceholderName\(/.test(milestones), `${MILESTONES}: isPlaceholderName is gone`);
check(
  /isPlaceholderName\(named\.display_name \|\| named\.username\)/.test(milestones),
  `${MILESTONES}: milestone posts are no longer checked for a placeholder name`,
);
check(
  /needs a real name first/.test(milestones),
  `${MILESTONES}: the placeholder refusal reason is gone`,
);
// A dropped read must not silence everyone's milestones.
check(
  /if \(!prefsError && prefs\)/.test(milestones),
  `${MILESTONES}: a failed profile read should not be treated as a missing name`,
);
check(
  !/"bible buddy",/.test(milestones),
  `${MILESTONES}: "bible buddy" is the official account's real name, not a placeholder`,
);
// The Set has to be declared before the function that reads it.
const setAt = gate.indexOf("const PLACEHOLDER_NAMES");
const fnAt = gate.indexOf("function isPlaceholderDisplayName");
check(setAt > -1 && fnAt > -1 && setAt < fnAt, `${PROMPT_GATE}: declare PLACEHOLDER_NAMES above the function that uses it`);

// 3. An empty name must still count as a placeholder: that is what makes an
// account with no name get asked rather than silently showing a fallback.
check(
  /if \(!trimmed\) return true;/.test(gate),
  `${PROMPT_GATE}: an empty display name must still count as a placeholder`,
);

if (failures.length) {
  console.error(`verify:display-name FAILED with ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("verify:display-name passed. No placeholder is written to a profile, and the prompt asks everyone carrying one.");
