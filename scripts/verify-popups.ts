/**
 * npm run verify:popups
 *
 * Checks the popup rules in lib/popups/decide.ts against the three journeys
 * in docs/POPUP_SYSTEM_PROPOSAL.md, and the catalog against a few promises
 * (unique ids, the underlined words end the headline, real action names).
 * Offline: no network, no database.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ACTION_TYPE } from "../lib/actionTypes";
import { COMMUNITY_EVENTS, communityEventStartsAt, getCommunityEvent, getCommunityEventState } from "../lib/communityEvents";
import { POPUP_CATALOG, TIPS_CATALOG } from "../lib/popups/catalog";
import {
  decide,
  HOURS_BETWEEN_POPUPS,
  MAX_AUTOMATIC_DISPLAYS,
  MAX_POPUPS_PER_WEEK,
  nextEligibleAfterClose,
  sameVisit,
  type DecideInput,
  type PopupHistory,
} from "../lib/popups/decide";

const NOW = new Date("2026-11-20T09:00:00Z");
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86_400_000).toISOString();
const hoursAgo = (hours: number) => new Date(NOW.getTime() - hours * 3_600_000).toISOString();

const allOn = Object.fromEntries(POPUP_CATALOG.map((popup) => [popup.id, { enabled: true }]));

const base = (over: Partial<DecideInput> = {}): DecideInput => ({
  now: NOW,
  pathname: "/dashboard",
  catalog: POPUP_CATALOG,
  settings: allOn,
  history: {},
  devices: new Set(),
  usedActions: new Set<string>(),
  // Already in the study that is recruiting, so the checks written before the
  // sign-up popup existed still describe what they always did. The sign-up's
  // own checks are at the end and hand in an empty set.
  joinedEvents: new Set(["obedience-of-abraham"]),
  accountCreatedAt: daysAgo(30),
  busy: null,
  shownThisVisit: false,
  lastAutomaticAt: null,
  automaticInLast7Days: 0,
  ...over,
});

const seen = (over: Partial<PopupHistory> = {}): PopupHistory => ({
  version: 1,
  displayCount: 1,
  lastShownAt: daysAgo(1),
  dismissedAt: null,
  ctaClickedAt: null,
  completedAt: null,
  neverAgain: false,
  nextEligibleAt: null,
  ...over,
});

/** Somebody who already uses the two discovery features, so only tutorials are in play. */
const triviaOnly = (over: Partial<DecideInput> = {}) =>
  base({ pathname: "/bible-trivia", usedActions: new Set(["feed_post_thought", "understand_verse_of_the_day"]), ...over });

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`  ok  ${name}`);
};

console.log("Catalog");

check("ids are unique", () => {
  const ids = POPUP_CATALOG.map((popup) => popup.id);
  assert.equal(new Set(ids).size, ids.length);
});

check("the underlined words end the headline", () => {
  for (const popup of POPUP_CATALOG) assert.ok(popup.headline.endsWith(popup.headlineAccent), popup.id);
});

check("every 'already uses it' action is a real action type", () => {
  const known = new Set<string>(Object.values(ACTION_TYPE));
  for (const popup of POPUP_CATALOG) for (const action of popup.usedWhen) assert.ok(known.has(action), `${popup.id}: ${action}`);
});

check("copy stays short enough for a phone", () => {
  for (const popup of POPUP_CATALOG) {
    assert.ok(popup.headline.length <= 34, `${popup.id} headline`);
    assert.ok(popup.description.length <= 130, `${popup.id} description`);
    assert.ok(popup.steps.length <= 4, `${popup.id} steps`);
  }
});

console.log("Rules");

check("everything switched off shows nothing", () => {
  assert.equal(decide(base({ settings: {} })).chosen, null);
});

check("new user, day 1, in the reader: the reader tutorial", () => {
  const result = decide(base({ accountCreatedAt: hoursAgo(2), pathname: "/bible/genesis/1" }));
  assert.equal(result.chosen?.id, "tutorial_reader_study_notes");
});

check("new user, day 1, on the dashboard: nothing", () => {
  assert.equal(decide(base({ accountCreatedAt: hoursAgo(2) })).chosen, null);
});

check("a tutorial never appears outside its section", () => {
  const result = decide(base({ pathname: "/bb-feed" }));
  assert.ok(result.chosen?.kind !== "tutorial");
});

check("an announcement does not appear in the section it announces", () => {
  const verdict = decide(base({ pathname: "/bb-feed" })).verdicts.find((item) => item.id === "discover_feed");
  assert.equal(verdict?.reason, "already in that section");
});

check("one per visit: moving to another section does not earn a second", () => {
  const result = decide(base({ pathname: "/bible-trivia", shownThisVisit: true }));
  assert.equal(result.chosen, null);
  assert.equal(result.blockedBy, "one already shown this visit");
});

check("20 hours between popups, across visits", () => {
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(5) })).chosen, null);
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(21) })).chosen?.id, "tutorial_trivia");
});

check("three in a week is the ceiling", () => {
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(30), automaticInLast7Days: 3 })).chosen, null);
});

check("busy means nothing, whatever is eligible", () => {
  const result = decide(base({ pathname: "/bible/genesis/1", busy: "typing" }));
  assert.equal(result.chosen, null);
  assert.equal(result.blockedBy, "busy: typing");
});

check("an experienced user is not taught what they already do", () => {
  const usedActions = new Set(POPUP_CATALOG.flatMap((popup) => popup.usedWhen));
  for (const pathname of ["/dashboard", "/bible/john/3", "/bible-trivia", "/bb-feed", "/devotionals/x/day/2"]) {
    assert.equal(decide(base({ pathname, usedActions })).chosen, null, pathname);
  }
});

check("a returning user who never opened the feed hears about it on the dashboard", () => {
  const usedActions = new Set(["understand_verse_of_the_day"]);
  assert.equal(decide(base({ usedActions })).chosen?.id, "discover_feed");
});

check("closing it snoozes it for two weeks, then it may return once", () => {
  const closed = seen({ dismissedAt: daysAgo(1), nextEligibleAt: nextEligibleAfterClose(new Date(daysAgo(1))) });
  const history = { tutorial_trivia: closed };
  assert.equal(decide(triviaOnly({ history })).chosen, null);
  const later = new Date(NOW.getTime() + 14 * 86_400_000);
  assert.equal(decide(triviaOnly({ now: later, history })).chosen?.id, "tutorial_trivia");
});

check("closed twice: never again on its own", () => {
  const history = { tutorial_trivia: seen({ displayCount: 2, nextEligibleAt: daysAgo(1) }) };
  assert.equal(decide(triviaOnly({ history })).chosen, null);
});

check("tapping the button, or 'don't show again', ends it", () => {
  for (const past of [seen({ ctaClickedAt: daysAgo(3) }), seen({ neverAgain: true })]) {
    assert.equal(decide(triviaOnly({ history: { tutorial_trivia: past } })).chosen, null);
  }
});

check("only a new content version brings a finished popup back", () => {
  const history = { tutorial_trivia: seen({ ctaClickedAt: daysAgo(40) }) };
  const bumped = POPUP_CATALOG.map((popup) => (popup.id === "tutorial_trivia" ? { ...popup, version: 2 } : popup));
  assert.equal(decide(triviaOnly({ history })).chosen, null);
  assert.equal(decide(triviaOnly({ history, catalog: bumped })).chosen?.id, "tutorial_trivia");
});

check("an expired popup is never chosen", () => {
  const settings = { ...allOn, tutorial_trivia: { enabled: true, expiresAt: daysAgo(1) } };
  assert.equal(decide(triviaOnly({ settings })).chosen, null);
});

check("something with an end date goes before something that can wait", () => {
  const settings = { ...allOn, discover_verse_of_the_day: { enabled: true, expiresAt: new Date(NOW.getTime() + 86_400_000).toISOString() } };
  assert.equal(decide(base({ settings })).chosen?.id, "discover_verse_of_the_day");
});

check("the reasons explain every popup, chosen or not", () => {
  const result = decide(base({ pathname: "/bible-trivia" }));
  assert.equal(result.verdicts.length, POPUP_CATALOG.length);
  assert.ok(result.verdicts.every((verdict) => verdict.reason.length > 0));
});

check("a visit ends after 30 quiet minutes, not on refresh", () => {
  assert.equal(sameVisit(new Date(NOW.getTime() - 5 * 60_000).toISOString(), NOW), true);
  assert.equal(sameVisit(new Date(NOW.getTime() - 31 * 60_000).toISOString(), NOW), false);
  assert.equal(sameVisit(null, NOW), false);
});

console.log("Coordinator");

const coordinator = readFileSync("components/popups/PopupCoordinator.tsx", "utf8");
const migration = readFileSync("supabase/migrations/20261113_popup_coordinator.sql", "utf8");
const analytics = readFileSync("app/api/landing-analytics/route.ts", "utf8");

check("the coordinator asks the database before it opens anything", () => {
  const asks = coordinator.indexOf('rpc("claim_popup"');
  assert.ok(asks > 0 && asks < coordinator.indexOf("setOpen({ popup"));
});

check("a popup never writes study activity", () => {
  assert.ok(!/from\("master_actions"\)\s*\.(insert|upsert|update)/.test(coordinator));
  const start = analytics.indexOf("const MASTER_ACTION_BY_EVENT");
  const mapped = analytics.slice(start, analytics.indexOf("};", start));
  for (const event of ["popup_shown", "popup_dismissed", "popup_cta_clicked", "popup_feature_adopted"]) {
    assert.ok(analytics.includes('"' + event + '"'), event + " is allowed");
    assert.ok(!mapped.includes(event), event + " is not study activity");
  }
});

check("the database holds the same limits as the rules", () => {
  assert.ok(migration.includes("interval '20 hours'") && HOURS_BETWEEN_POPUPS === 20);
  assert.ok(migration.includes(">= 3 then") && MAX_POPUPS_PER_WEEK === 3);
  assert.ok(migration.includes("display_count >= 2") && MAX_AUTOMATIC_DISPLAYS === 2);
});

check("the migration only adds: nothing a person has seen is removed", () => {
  assert.ok(!/(delete from|truncate|drop table|drop column)/i.test(migration));
});

check("outcome writes are actually sent (a bare `void supabase...` never is)", () => {
  const code = coordinator.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(!/void supabase\s*\.from/.test(code));
  assert.ok((code.match(/send\(/g) || []).length >= 4);
});

console.log("Store asks");

const iphone = new Set(["ios_web"] as const);
const everythingUsed = new Set(POPUP_CATALOG.flatMap((popup) => popup.usedWhen));

check("the App Store ask only exists on an iPhone browser", () => {
  assert.equal(decide(base({ usedActions: everythingUsed })).chosen, null);
  assert.equal(decide(base({ usedActions: everythingUsed, devices: iphone })).chosen?.id, "ask_app_store");
  assert.equal(decide(base({ usedActions: everythingUsed, devices: new Set(["android_web"] as const) })).chosen?.id, "ask_android_beta");
});

check("an ask waits behind a tutorial and behind an announcement", () => {
  assert.equal(decide(base({ devices: iphone, pathname: "/bible-trivia" })).chosen?.id, "tutorial_trivia");
  assert.equal(decide(base({ devices: iphone })).chosen?.kind, "announcement");
});

check("the App Store ask is under the same limits as everything else", () => {
  const on = { usedActions: everythingUsed, devices: iphone };
  assert.equal(decide(base({ ...on, shownThisVisit: true })).chosen, null);
  assert.equal(decide(base({ ...on, lastAutomaticAt: hoursAgo(3) })).chosen, null);
  assert.equal(decide(base({ ...on, lastAutomaticAt: hoursAgo(30), automaticInLast7Days: 3 })).chosen, null);
});

check("'don't show this again' and a tap both end the ask", () => {
  const on = { usedActions: everythingUsed, devices: iphone };
  assert.equal(decide(base({ ...on, history: { ask_app_store: seen({ neverAgain: true }) } })).chosen, null);
  assert.equal(decide(base({ ...on, history: { ask_app_store: seen({ ctaClickedAt: daysAgo(2) }) } })).chosen, null);
});

check("only asks offer 'don't show this again', and Tips lists none of them", () => {
  for (const popup of POPUP_CATALOG) assert.equal(Boolean(popup.offerNeverAgain), popup.kind === "ask", popup.id);
  assert.ok(TIPS_CATALOG.length > 0 && TIPS_CATALOG.every((popup) => popup.kind !== "ask"));
});

check("the old store popups stand down when the coordinator is on", () => {
  for (const file of ["components/AppStorePopup.tsx", "components/AndroidBetaPopup.tsx"]) {
    const source = readFileSync(file, "utf8");
    const guard = source.indexOf("if (coordinatorActive()) return;");
    assert.ok(guard > 0 && guard < source.indexOf("setOpen(true)"), file);
  }
});

check("the ask's facts match the app: store id, tester numbers", () => {
  const review = readFileSync("lib/appReviewPrompt.ts", "utf8");
  const beta = readFileSync("lib/androidBeta.ts", "utf8");
  const appStore = POPUP_CATALOG.find((popup) => popup.id === "ask_app_store");
  const android = POPUP_CATALOG.find((popup) => popup.id === "ask_android_beta");
  const storeId = appStore?.cta.href.split("/id")[1] ?? "missing";
  assert.ok(review.includes('"' + storeId + '"'), "App Store id");
  // The Android ask sends people to the two-step page and nowhere else.
  assert.equal(android?.cta.href, "/android");
  const page = readFileSync("components/AndroidBetaPage.tsx", "utf8");
  assert.ok(page.includes("Step 1") && page.includes("Step 2") && !page.includes("Step 3"));
  assert.ok(beta.includes("BETA_OPEN = true"));
});

check("there is exactly one master switch, and the coordinator reads it", () => {
  const source = readFileSync("lib/popups/switch.ts", "utf8");
  assert.equal((source.match(/export const COORDINATOR_ENABLED = (true|false);/g) || []).length, 1);
  assert.ok(coordinator.includes("if (!coordinatorActive()) return;"));
});

check("test mode can only tighten: the pretend-device switch stays localhost-only", () => {
  const source = readFileSync("lib/popups/switch.ts", "utf8");
  const pretend = source.slice(source.indexOf("export function testDevice"));
  assert.ok(pretend.includes("!onLocalhost()"));
});

check("the admin App tab counts the coordinator's store-popup taps", () => {
  const dashboard = readFileSync("lib/adminDashboard.ts", "utf8");
  assert.ok(dashboard.includes('.eq("event_name", "popup_cta_clicked")'));
  assert.ok(dashboard.includes('popupTapsIn("ask_app_store", r)') && dashboard.includes('popupTapsIn("ask_android_beta", r)'));
  // and the old action types are still read, so earlier weeks keep their numbers
  assert.ok(dashboard.includes('"appstore_popup_clicked"') && dashboard.includes('"android_beta_popup_clicked"'));
});

console.log("Study sign-up (The Obedience of Abraham)");

const SIGNUP_ID = "signup_obedience_of_abraham";
const signupPopup = POPUP_CATALOG.find((popup) => popup.id === SIGNUP_ID)!;
const notMember = (over: Partial<DecideInput> = {}) => base({ joinedEvents: new Set<string>(), ...over });

check("the sign-up is in the one list, as an ordinary announcement", () => {
  assert.ok(signupPopup && signupPopup.event);
  assert.equal(signupPopup.kind, "announcement");
  assert.equal(signupPopup.offerNeverAgain, undefined);
  assert.ok(!TIPS_CATALOG.some((popup) => popup.event), "a dated sign-up is not a tip");
});

check("the event record is what the popup says: 1 December 2026, 30 days", () => {
  const event = getCommunityEvent(signupPopup.event!.slug);
  assert.ok(event);
  assert.equal(event!.startDate, "2026-12-01");
  assert.equal(event!.totalDays, 30);
  assert.equal(signupPopup.cta.href, "/events/" + event!.slug);
  // The artwork is the approved banner on the event, and the file exists.
  assert.equal(signupPopup.event!.art, event!.heroBanner);
  assert.ok(readFileSync("public" + signupPopup.event!.art).length > 10_000);
});

check("the words are the approved ones", () => {
  assert.equal(signupPopup.pill.toUpperCase(), "COMING NEXT · LIVE BIBLE STUDY");
  assert.equal(signupPopup.headline.toUpperCase(), "THE OBEDIENCE OF ABRAHAM");
  assert.deepEqual(signupPopup.event!.facts.map((line) => line.toUpperCase()), ["30-DAY BIBLE STUDY", "STARTS DECEMBER 1ST"]);
  assert.equal(signupPopup.description, "Join us as we study the life of Abraham and discover what it means to trust and obey God.");
  assert.deepEqual(signupPopup.event!.bullets, [
    "📖 Daily Bible study",
    "🙏 Guided devotionals",
    "🤔 Reflection questions",
    "💬 Study together as a community",
    "❤️ 100% FREE!",
  ]);
  assert.equal(signupPopup.cta.label, "Sign Me Up");
  const shell = readFileSync("components/popups/FeaturePopup.tsx", "utf8");
  assert.ok(shell.includes('"Maybe Later"'));
});

check("somebody not signed up is asked, on the dashboard", () => {
  assert.equal(decide(notMember()).chosen?.id, SIGNUP_ID);
});

check("somebody already signed up is never asked", () => {
  const result = decide(base());
  assert.notEqual(result.chosen?.id, SIGNUP_ID);
  assert.equal(result.verdicts.find((verdict) => verdict.id === SIGNUP_ID)?.reason, "already signed up");
});

check("it takes its turn: same visit, 20-hour and weekly limits as every popup", () => {
  assert.equal(decide(notMember({ shownThisVisit: true })).chosen, null);
  assert.equal(decide(notMember({ lastAutomaticAt: hoursAgo(HOURS_BETWEEN_POPUPS - 1) })).chosen, null);
  assert.equal(decide(notMember({ automaticInLast7Days: MAX_POPUPS_PER_WEEK })).chosen, null);
});

check("it never interrupts: busy means nothing", () => {
  assert.equal(decide(notMember({ busy: "in the middle of a task" })).chosen, null);
});

check("with other popups eligible, the one with a date goes first, and the others get later visits", () => {
  const first = decide(notMember({ pathname: "/bible-trivia" }));
  assert.equal(first.chosen?.id, SIGNUP_ID);
  assert.equal(first.verdicts.find((verdict) => verdict.id === "tutorial_trivia")?.eligible, true);
  // Next visit, a day later, sign-up closed: the tutorial has its turn.
  const next = decide(notMember({ pathname: "/bible-trivia", history: { [SIGNUP_ID]: seen({ dismissedAt: daysAgo(1), nextEligibleAt: nextEligibleAfterClose(new Date(daysAgo(1))) }) } }));
  assert.equal(next.chosen?.id, "tutorial_trivia");
});

check("Maybe Later: two weeks, one more time, then never", () => {
  const closed = seen({ dismissedAt: daysAgo(1), nextEligibleAt: nextEligibleAfterClose(new Date(daysAgo(1))) });
  assert.notEqual(decide(notMember({ history: { [SIGNUP_ID]: closed } })).chosen?.id, SIGNUP_ID);
  assert.notEqual(decide(notMember({ history: { [SIGNUP_ID]: seen({ displayCount: MAX_AUTOMATIC_DISPLAYS }) } })).chosen?.id, SIGNUP_ID);
});

check("tapping Sign Me Up, or finishing the sign-up, ends it", () => {
  assert.notEqual(decide(notMember({ history: { [SIGNUP_ID]: seen({ ctaClickedAt: daysAgo(1) }) } })).chosen?.id, SIGNUP_ID);
  assert.notEqual(decide(notMember({ history: { [SIGNUP_ID]: seen({ completedAt: daysAgo(1) }) } })).chosen?.id, SIGNUP_ID);
});

check("it is not shown on the study's own page", () => {
  assert.notEqual(decide(notMember({ pathname: "/events/obedience-of-abraham" })).chosen?.id, SIGNUP_ID);
});

check("it stops by itself when the study starts, in Berlin time", () => {
  const event = getCommunityEvent("obedience-of-abraham")!;
  assert.equal(signupPopup.expiresAt, communityEventStartsAt(event));
  assert.equal(signupPopup.expiresAt, "2026-11-30T23:00:00.000Z");
  const before = new Date("2026-11-30T22:59:00Z");
  const after = new Date("2026-11-30T23:00:00Z");
  assert.equal(getCommunityEventState(event, before).phase, "countdown");
  assert.equal(getCommunityEventState(event, after).phase, "live");
  assert.equal(decide(notMember({ now: before })).chosen?.id, SIGNUP_ID);
  assert.notEqual(decide(notMember({ now: after })).chosen?.id, SIGNUP_ID);
  assert.equal(decide(notMember({ now: after })).verdicts.find((verdict) => verdict.id === SIGNUP_ID)?.reason, "expired");
  // Every event's start is a Berlin midnight, summer or winter.
  for (const each of COMMUNITY_EVENTS) assert.equal(getCommunityEventState(each, new Date(communityEventStartsAt(each))).phase, "live", each.slug);
});

check("the end date can be moved without a build", () => {
  const settings = { ...allOn, [SIGNUP_ID]: { enabled: true, expiresAt: daysAgo(1) } };
  assert.notEqual(decide(notMember({ settings })).chosen?.id, SIGNUP_ID);
  assert.notEqual(decide(notMember({ settings: { ...allOn, [SIGNUP_ID]: { enabled: false } } })).chosen?.id, SIGNUP_ID);
});

check("the button registers with the page's own join, and a tap is not a registration", () => {
  assert.ok(coordinator.includes("joinCommunityEvent(userId, slug, { source: \"popup\" })"));
  const tap = coordinator.indexOf('track("popup_cta_clicked"');
  const registered = coordinator.indexOf('track("popup_registration_completed"');
  assert.ok(tap > 0 && registered > tap);
  // Only a newly saved row counts: an existing member is not a new registration.
  assert.ok(coordinator.includes("if (!result.alreadyJoined) {"));
  const join = readFileSync("lib/communityEventJoin.ts", "utf8");
  assert.ok(join.includes('onConflict: "event_slug,user_id", ignoreDuplicates: true'));
  const allowed = readFileSync("app/api/landing-analytics/route.ts", "utf8");
  assert.ok(allowed.includes('"popup_registration_completed"'));
});

check("members are looked up before anything is shown, and unsure means quiet", () => {
  assert.ok(coordinator.includes('.from("community_event_members").select("event_slug")'));
  assert.ok(coordinator.includes("if (error) eventSlugs.forEach((slug) => joinedEvents.add(slug));"));
});

check("an unfinished account finishes on the study's page with the sign-up under way", () => {
  assert.ok(coordinator.includes('finishOnPage("join=1&src=popup")'));
  const page = readFileSync("app/events/[slug]/page.tsx", "utf8");
  assert.ok(page.includes('.get("join") !== "1"') && page.includes("autoJoinRef.current = true"));
});

check("no second popup system: no new component, no email, no push", () => {
  for (const sent of ["sendEmail", "push_subscriptions", "sendPush", "/api/email"]) assert.ok(!coordinator.includes(sent), sent);
  const shell = readFileSync("components/AppShell.tsx", "utf8");
  assert.ok(!/Abraham\w*Popup/.test(shell));
});

check("the admin analytics page reports sign-ups, taps and registrations apart", () => {
  const dashboard = readFileSync("lib/adminDashboard.ts", "utf8");
  assert.ok(dashboard.includes("studySignups") && dashboard.includes('"popup_registration_completed"'));
  const view = readFileSync("components/admin/AnalyticsDashboardView.tsx", "utf8");
  assert.ok(view.includes("Tapped Sign Me Up") && view.includes("Registered from it") && view.includes("Conversion"));
});

console.log(`\n${passed} checks passed.`);
