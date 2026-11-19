/**
 * npm run verify:profile-gate
 *
 * Mandatory profile completion (Louis, 2026-11-19, priority High): first name,
 * last name and a profile picture before anyone uses the app. Placeholder
 * names do not count. It must not be skippable, survive a refresh or a deep
 * link, and never trap someone away from logout, support, deletion or auth.
 *
 * Offline. Half of this runs the shared rule (lib/profileCompleteness.ts) on
 * real-shaped rows; the other half asserts the source of the gate, the API
 * and the shell, like the other verify:* scripts.
 */
import fs from "node:fs";
import path from "node:path";
import {
  evaluateProfile,
  isPlaceholderName,
  isProfileGateExemptPath,
  validateFullName,
} from "../lib/profileCompleteness";
import { isPublicPath } from "../lib/publicRoutes";

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

const PHOTO = "https://example.supabase.co/storage/v1/object/public/avatars/u1/avatar.jpg?v=1";
const EMAIL = "mary.smith42@example.com";

// --- The rule ---------------------------------------------------------------

// New user with nothing (no profile_stats row yet).
{
  const r = evaluateProfile(null, EMAIL);
  check(!r.complete, "new user with no row should be incomplete");
  check(r.missing.firstName && r.missing.lastName && r.missing.photo, "new user should be missing all three");
}

// Existing user missing a last name.
{
  const r = evaluateProfile({ display_name: "Mary", profile_image_url: PHOTO }, EMAIL);
  check(!r.complete, "single name should be incomplete");
  check(r.missing.lastName && !r.missing.photo, "single name: only the last name is missing");
  check(r.firstName === "Mary", "single real name should prefill the first name");
}

// Placeholder names, in every spelling the app or a form has produced.
for (const name of [
  "BibleBuddy User",
  "Bible Buddy User",
  "bible_buddy_user",
  "Bible Buddy Member",
  "Buddy",
  "User",
  "Guest User",
  "user_1a2b3c",
  "User 189DE35E",
  "mary.smith42",
]) {
  const r = evaluateProfile({ display_name: name, profile_image_url: PHOTO }, EMAIL);
  check(!r.complete, `"${name}" must not count as a complete name`);
  check(isPlaceholderName(name, EMAIL), `"${name}" should be a placeholder`);
  check(r.firstName === "" || !/buddy|user|member/i.test(r.firstName), `"${name}" must not be prefilled as a name`);
}
check(!validateFullName("Bible Buddy", "User").ok, "the save path must refuse Bible Buddy User");
check(!validateFullName("Buddy", "Member").ok, "the save path must refuse a placeholder last word");
check(!validateFullName("", "Smith").ok, "the save path must require a first name");
check(!validateFullName("Mary", "").ok, "the save path must require a last name");
check(!validateFullName("Mary2", "Smith").ok, "digits are not a name");
check(!validateFullName("Mary", "mary@x.com").ok, "an email is not a name");

// The official account keeps its chosen name (it posts the Verse of the Day).
check(!isPlaceholderName("Bible Buddy"), '"Bible Buddy" is the brand account\'s name, not a placeholder');

// User without a picture.
{
  const r = evaluateProfile({ display_name: "John Smith", profile_image_url: null }, EMAIL);
  check(!r.complete && r.missing.photo && !r.missing.firstName && !r.missing.lastName, "no picture: only the photo is missing");
  const blank = evaluateProfile({ display_name: "John Smith", profile_image_url: "   " }, EMAIL);
  check(!blank.complete, "a blank picture URL is not a picture");
}

// Completed users pass, including names that are not US-shaped.
for (const [first, last] of [
  ["John", "Smith"],
  ["Ng", "Li"],
  ["Jean-Baptiste", "O'Neill"],
  ["Pieter", "van der Westhuizen"],
  ["Анна", "Иванова"],
]) {
  const r = evaluateProfile({ display_name: `${first} ${last}`, profile_image_url: PHOTO }, EMAIL);
  check(r.complete, `"${first} ${last}" with a picture should be complete`);
  check(validateFullName(first, last).ok, `"${first} ${last}" should be accepted on save`);
}
// username is the fallback the app has always used when display_name is empty.
check(evaluateProfile({ display_name: null, username: "John Smith", profile_image_url: PHOTO }).complete, "username fallback should count");

// --- Where the gate applies -------------------------------------------------

const exempt = (p: string) => isProfileGateExemptPath(p, isPublicPath);
for (const p of [
  "/",
  "/login",
  "/signup",
  "/reset-password",
  "/auth/callback",
  "/logout",
  "/delete-account",
  "/contact",
  "/privacy",
  "/terms",
  "/community-guidelines",
  "/blog",
  "/blog/what-does-it-mean-to-fear-god",
  "/app",
  "/login/",
]) {
  check(exempt(p), `${p} must stay reachable without a complete profile`);
}
// Deep links into the app are gated.
for (const p of ["/dashboard", "/bible/john/3", "/bb-feed", "/settings", "/profile/abc", "/devotionals/1/day/3", "/reading-plans"]) {
  check(!exempt(p), `${p} must be gated`);
}

// --- The gate ---------------------------------------------------------------

const GATE = path.join("components", "ProfileCompletionGate.tsx");
const gate = read(GATE);
check(/PROFILE_COMPLETION_COPY/.test(gate), `${GATE}: the agreed copy is not shown`);
check(!/onClose|aria-label="Close"|closeOnBackdrop/.test(gate), `${GATE}: the step must have no way to dismiss it`);
check(/hidePage \? null : children/.test(gate), `${GATE}: an incomplete profile must not render the page underneath`);
check(!/resolvedRef/.test(gate), `${GATE}: the old "checked once per load, never again" ref is back`);
check(/onAuthStateChange/.test(gate), `${GATE}: the gate should re-check on every sign-in (web and native)`);
check(/if \(readError\)[\s\S]{0,200}"error"/.test(gate), `${GATE}: a failed read must be "unknown" with a retry, not "incomplete"`);
check(/Try again/.test(gate), `${GATE}: the retry button is gone`);
check(/\$\{window\.location\.origin\}\/api\/profile\/complete/.test(gate), `${GATE}: fetch must use an absolute URL (CapacitorHttp)`);
check(/timeoutSignal\(/.test(gate), `${GATE}: network calls must be time-bounded`);
check(/\.from\("avatars"\)/.test(gate), `${GATE}: the picture should go to the existing avatars bucket`);
check(/href="\/delete-account"/.test(gate) && /href="\/contact"/.test(gate) && /signOut\(\)/.test(gate),
  `${GATE}: log out, support and account deletion must be reachable from the step`);
check(/isPublicPath/.test(gate), `${GATE}: the gate must read the same public list as proxy.ts`);

const SHELL = path.join("components", "AppShell.tsx");
const shell = read(SHELL);
check(/<ProfileCompletionGate>\{children\}<\/ProfileCompletionGate>/.test(shell), `${SHELL}: page content must be wrapped in the gate`);
check(/useProfileGateBlocking\(\)/.test(shell), `${SHELL}: popups must be held back while the gate is up`);
check(!/checkFullNameRequirement|handleSaveRequiredFullName/.test(shell), `${SHELL}: the dead second name gate is back`);

const LAYOUT = path.join("app", "layout.tsx");
check(!/<DisplayNamePromptGate/.test(read(LAYOUT)), `${LAYOUT}: the old milestone-only prompt is mounted again`);

const PROXY = "proxy.ts";
check(/from "\.\/lib\/publicRoutes"/.test(read(PROXY)), `${PROXY}: the public list must come from lib/publicRoutes.ts`);

// --- The server -------------------------------------------------------------

const API = path.join("app", "api", "profile", "complete", "route.ts");
const api = read(API);
check(/validateFullName\(/.test(api), `${API}: names must be validated server-side`);
check(/avatars\/\$\{user\.id\}\//.test(api), `${API}: a picture must be in the user's own avatars folder`);
check(/storage[\s\S]{0,40}\.from\("avatars"\)[\s\S]{0,40}\.list\(/.test(api), `${API}: the uploaded picture must be confirmed to exist`);
check(/auth\.getUser\(token\)/.test(api), `${API}: the caller must be authenticated`);
check(!/profile_completed|profile_complete:/.test(api), `${API}: completeness must stay derived, never a stored flag`);

const GATE_LIB = path.join("lib", "accountGate.ts");
check(/evaluateProfile\(/.test(read(GATE_LIB)), `${GATE_LIB}: the in-context gate must use the shared rule`);

if (failures.length) {
  console.error(`verify:profile-gate FAILED with ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("verify:profile-gate passed. Name, surname and picture are required before the app opens, and the doors out stay open.");
