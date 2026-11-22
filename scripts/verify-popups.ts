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
import { existsSync } from "node:fs";
import { BIRTHDAY_HEADLINE, isBirthdayWindow, msUntilBirthdayChange } from "../lib/birthday";
import { liveCatalog, LOCAL_POPUP_SIGNALS, POPUP_CATALOG, TIPS_CATALOG } from "../lib/popups/catalog";
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

// The five that were their own components until 2026-11-15. The checks
// written before they joined the list still describe what they always did,
// so those run with these five switched off; their own checks are at the end
// and switch everything on.
const MOVED_IN = ["beginning_of_everything_2026", "bible_lock_2026_11", "new_games_2026_11", "weekly_prayer", "weekly_poll"];
const everythingOn = Object.fromEntries(POPUP_CATALOG.map((popup) => [popup.id, { enabled: true }]));
const allOn = Object.fromEntries(POPUP_CATALOG.filter((popup) => !MOVED_IN.includes(popup.id)).map((popup) => [popup.id, { enabled: true }]));

const NO_COVER = "__noCover";
const NO_HOME = "__noHome";
const base = (over: Partial<DecideInput> & { [NO_COVER]?: true; [NO_HOME]?: true } = {}): DecideInput => ({
  now: NOW,
  pathname: "/dashboard",
  catalog: POPUP_CATALOG,
  settings: allOn,
  history: {},
  devices: new Set(),
  // Has a Bible Cover on, so the covers headline is out of the way of the
  // ordinary rules below; the headline has its own checks at the end.
  usedActions: new Set<string>(["bible_cover_chosen"]),
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
  // Every scenario has a Bible Cover on unless it says otherwise (noCover
  // below), so the covers headline does not take over checks written before it.
  ...(NO_COVER in over ? {} : { usedActions: new Set([...(over.usedActions ?? []), "bible_cover_chosen"]) }),
  // Home already arranged, so the "Make Home yours" popup stays out of the
  // checks written before it; its own checks at the end pass NO_HOME.
  ...(NO_HOME in over
    ? {}
    : {
        usedActions: new Set([
          ...(over.usedActions ?? []),
          ...(NO_COVER in over ? [] : ["bible_cover_chosen"]),
          "home_customized",
        ]),
      }),
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
  base({ pathname: "/bible-trivia", usedActions: new Set(["bible_cover_chosen", "feed_post_thought", "understand_verse_of_the_day"]), ...over });

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
  const local = new Set<string>(LOCAL_POPUP_SIGNALS);
  for (const popup of POPUP_CATALOG) for (const action of popup.usedWhen) assert.ok(known.has(action) || local.has(action), `${popup.id}: ${action}`);
});

check("copy stays short enough for a phone", () => {
  for (const popup of POPUP_CATALOG) {
    assert.ok(popup.headline.length <= 34, `${popup.id} headline`);
    // A popup with no steps has their room for words (the birthday message,
    // Louis's exact copy, is 160).
    assert.ok(popup.description.length <= (popup.steps.length ? 130 : 170), `${popup.id} description`);
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
  assert.ok(asks > 0 && asks < coordinator.search(/setOpen\(\{\s*popup,/));
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
  // Public on Google Play since 2026-11-22 (BETA_OPEN = false): the Android
  // ask goes straight to the listing, and /android redirects there too.
  assert.ok(beta.includes("BETA_OPEN = false"));
  assert.equal(android?.cta.href, "https://play.google.com/store/apps/details?id=net.mybiblebuddy.app");
  assert.equal(android?.cta.external, true);
  assert.ok(readFileSync("app/android/page.tsx", "utf8").includes("permanentRedirect(PLAY_LISTING_URL)"));
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
  // The birthday headline (lib/birthday.ts) is out of the way: already answered.
  const birthdayDone = { bible_buddy_birthday_2026: seen({ ctaClickedAt: daysAgo(1) }) };
  assert.equal(decide(notMember({ now: before, history: birthdayDone })).chosen?.id, SIGNUP_ID);
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

check("the designed artwork is only a look: files exist, same handlers, a visible way out", () => {
  const poster = signupPopup.event!.poster!;
  assert.ok(poster, "Abraham is drawn with Louis's artwork");
  assert.ok(readFileSync("public" + poster.desktop).length > 50_000);
  assert.ok(readFileSync("public" + poster.mobile).length > 50_000);
  assert.equal(poster.ctaLabel.toUpperCase(), "SIGN UP FOR THE FREE STUDY");
  // The desktop image does not say when it starts; the phone and the alt text do.
  assert.ok(poster.alt.includes("December 1st"));
  assert.ok(poster.features.some((feature) => feature.text.includes("December 1st")));
  const shell = readFileSync("components/popups/FeaturePopup.tsx", "utf8");
  const drawn = shell.slice(shell.indexOf("function PosterSignup("), shell.indexOf("small pictures of the real thing"));
  assert.ok(drawn.includes("onClick={onCta}") && drawn.includes('onClose("later")') && drawn.includes('onClose("close_button")'));
  // It registers nothing itself.
  assert.ok(!drawn.includes("joinCommunityEvent") && !drawn.includes("supabase"));
});

console.log("Every popup is in the one system (2026-11-15)");

const everything = (over: Partial<DecideInput> = {}) =>
  base({ settings: everythingOn, joinedEvents: new Set(["obedience-of-abraham", "beginning-of-everything"]), ...over });
const used = new Set(["feed_post_thought", "understand_verse_of_the_day"]);

check("the five that had their own timers are entries in the list", () => {
  for (const id of MOVED_IN) assert.ok(POPUP_CATALOG.some((popup) => popup.id === id), id);
});

check("their own components and triggers are gone", () => {
  for (const file of [
    "components/BeginningOfEverythingPopup.tsx",
    "components/WeeklyFeedPopup.tsx",
    "components/CommunityEventDayPopup.tsx",
    "components/ProverbsLaunchPopup.tsx",
    "components/WisdomBookPopup.tsx",
    "app/api/popups/community-event-day/route.ts",
  ]) {
    assert.ok(!existsSync(file), file);
  }
  const shell = readFileSync("components/AppShell.tsx", "utf8");
  for (const name of ["NewGamesPopup", "BibleLockPopup", "WeeklyFeedPopup", "BeginningOfEverythingPopup", "CommunityEventDayPopup"]) {
    assert.ok(!shell.includes(`<${name}`), `AppShell still mounts ${name}`);
  }
  // The two that kept their approved look only draw now.
  for (const file of ["components/NewGamesPopup.tsx", "components/BibleLockPopup.tsx"]) {
    const view = readFileSync(file, "utf8");
    for (const own of ["supabase", "setTimeout(attempt", "user_popups_seen", "/api/landing-analytics"]) assert.ok(!view.includes(own), `${file}: ${own}`);
  }
});

check("the coordinator draws all of them, and nothing else decides", () => {
  assert.ok(coordinator.includes('open.popup.custom === "new_games"') && coordinator.includes('open.popup.custom === "bible_lock"'));
  assert.ok(coordinator.includes("liveCatalog(new Date())"));
  assert.ok(coordinator.includes("loadWeekly(popup.weekly)"));
  const route = readFileSync("app/api/popups/weekly-feed/route.ts", "utf8");
  assert.ok(!route.includes("seenError"), "the weekly route no longer decides who has been asked");
});

check("the same one-per-visit, 20-hour and weekly limits hold for them", () => {
  assert.equal(decide(everything({ shownThisVisit: true })).chosen, null);
  assert.equal(decide(everything({ lastAutomaticAt: hoursAgo(5) })).chosen, null);
  assert.equal(decide(everything({ automaticInLast7Days: MAX_POPUPS_PER_WEEK })).chosen, null);
  assert.equal(decide(everything({ busy: "typing" })).chosen, null);
});

check("new games: everyone once, not on the games pages", () => {
  assert.equal(decide(everything({ usedActions: used })).chosen?.id, "new_games_2026_11");
  assert.notEqual(decide(everything({ usedActions: used, pathname: "/bible-study-games" })).chosen?.id, "new_games_2026_11");
});

check("somebody who saw one of them before it moved in is not shown it again", () => {
  assert.ok(coordinator.includes("popup.seenBeforeIsFinal"));
  for (const id of ["beginning_of_everything_2026", "bible_lock_2026_11", "new_games_2026_11"]) {
    assert.equal(POPUP_CATALOG.find((popup) => popup.id === id)?.seenBeforeIsFinal, true, id);
  }
  // What the coordinator turns such a row into.
  const before = { new_games_2026_11: seen({ displayCount: MAX_AUTOMATIC_DISPLAYS }) };
  assert.notEqual(decide(everything({ usedActions: used, history: before })).chosen?.id, "new_games_2026_11");
});

check("Bible Lock: only a phone that can run it and has not set it up", () => {
  const lock = (over: Partial<DecideInput> = {}) => everything({ usedActions: used, history: { new_games_2026_11: seen({ ctaClickedAt: daysAgo(1) }) }, ...over });
  assert.notEqual(decide(lock()).chosen?.id, "bible_lock_2026_11");
  assert.equal(decide(lock({ devices: new Set(["bible_lock_ready"]) })).chosen?.id, "bible_lock_2026_11");
  assert.ok(coordinator.includes("status.supported && status.chosen === 0 && !status.locked"));
});

check("the Beginning invitation: not for members, after Abraham, ends with the live study", () => {
  const invite = POPUP_CATALOG.find((popup) => popup.id === "beginning_of_everything_2026")!;
  assert.equal(invite.expiresAt, "2026-11-28T23:00:00.000Z");
  assert.ok(readFileSync("public" + invite.event!.poster!.desktop).length > 50_000);
  const neither = everything({ joinedEvents: new Set<string>() });
  assert.equal(decide(neither).chosen?.id, "signup_obedience_of_abraham");
  assert.equal(decide(everything({ joinedEvents: new Set(["obedience-of-abraham"]) })).chosen?.id, "beginning_of_everything_2026");
  assert.notEqual(decide(everything({ joinedEvents: new Set(["obedience-of-abraham"]), now: new Date("2026-11-29T00:00:00Z") })).chosen?.id, "beginning_of_everything_2026");
  // Joining a study that is open is starting it.
  assert.ok(coordinator.includes("router.push(eventDayStudyPath(study.devotionalId, 1))"));
});

check("prayer and poll come round once a week, in the shared card", () => {
  const thisWeek = liveCatalog(NOW);
  const nextWeek = liveCatalog(new Date(NOW.getTime() + 7 * 86_400_000));
  for (const id of ["weekly_prayer", "weekly_poll"]) {
    const now = thisWeek.find((popup) => popup.id === id)!;
    const later = nextWeek.find((popup) => popup.id === id)!;
    assert.equal(later.version, now.version + 1, id);
    assert.equal(now.custom, undefined, `${id} is drawn by the shared card`);
    // Answered or closed this week: not again this week, but again next week.
    // Next week is inside the birthday window; that headline is already answered.
    const quiet = { usedActions: used, history: { bible_buddy_birthday_2026: seen({ ctaClickedAt: daysAgo(1) }), new_games_2026_11: seen({ ctaClickedAt: daysAgo(1) }), weekly_prayer: seen({ version: thisWeek.find((p) => p.id === "weekly_prayer")!.version, ctaClickedAt: hoursAgo(30) }), weekly_poll: seen({ version: thisWeek.find((p) => p.id === "weekly_poll")!.version, dismissedAt: hoursAgo(30), nextEligibleAt: nextEligibleAfterClose(new Date(hoursAgo(30))) }) } };
    assert.equal(decide(everything({ ...quiet, catalog: thisWeek })).chosen, null);
    assert.ok(["weekly_prayer", "weekly_poll"].includes(decide(everything({ ...quiet, catalog: nextWeek, now: new Date(NOW.getTime() + 7 * 86_400_000) })).chosen?.id || ""));
  }
  // They wait their turn behind everything that is not weekly.
  assert.equal(decide(everything({ usedActions: used, catalog: thisWeek })).chosen?.id, "new_games_2026_11");
  assert.notEqual(decide(everything({ usedActions: used, catalog: thisWeek, pathname: "/bb-feed" })).chosen?.weekly, "prayer");
});

check("the poll is answered in the popup, and an answer is not a dismissal", () => {
  const shell = readFileSync("components/popups/FeaturePopup.tsx", "utf8");
  assert.ok(shell.includes("function PollOptions(") && shell.includes("poll && !poll.voted ? null"));
  assert.ok(coordinator.includes("/weekly-poll/vote") && coordinator.includes("if (voted) {"));
});

check("the Features report still gets the new-games events it reads", () => {
  assert.ok(coordinator.includes('shown: "new_games_popup_impression"') && coordinator.includes("track(also.clicked"));
  const report = readFileSync("lib/newFeaturesReport.ts", "utf8");
  assert.ok(report.includes('"new_games_popup_impression"'));
});

console.log("Headline level");

const noCover = (over: Partial<DecideInput> = {}) => base({ usedActions: new Set<string>(), ...over, [NO_COVER]: true });

check("the covers headline beats every other popup", () => {
  assert.equal(decide(noCover({ pathname: "/bible/genesis/1" })).chosen?.id, "bible_covers_2026_11");
  assert.equal(decide(noCover({ pathname: "/bible-trivia" })).chosen?.id, "bible_covers_2026_11");
});

check("a headline may go past the weekly limit, nothing else may", () => {
  assert.equal(decide(noCover({ automaticInLast7Days: 3 })).chosen?.id, "bible_covers_2026_11");
  assert.equal(decide(base({ pathname: "/bible-trivia", automaticInLast7Days: 3 })).chosen, null);
});

check("a headline keeps every other rule", () => {
  assert.equal(decide(noCover({ busy: "reading" })).chosen, null);
  assert.equal(decide(noCover({ shownThisVisit: true })).chosen, null);
  assert.equal(decide(noCover({ lastAutomaticAt: hoursAgo(5) })).chosen, null);
});

check("nobody who already has a cover is told about covers", () => {
  assert.notEqual(decide(base({ pathname: "/bible/genesis/1" })).chosen?.id, "bible_covers_2026_11");
});

check("not on the Settings page, where the shelf already is", () => {
  assert.notEqual(decide(noCover({ pathname: "/settings" })).chosen?.id, "bible_covers_2026_11");
});

console.log("\nFirst birthday (one window for the hat and the popup)");

// lib/birthday.ts. Berlin is UTC+1 on both dates.
const at = (iso: string) => new Date(iso);
const BDAY = "bible_buddy_birthday_2026";
const bday = (iso: string) => decide(base({ now: at(iso), settings: everythingOn })).chosen?.id;

check("the window opens at 00:00 Berlin on 21 November, not a second before", () => {
  assert.equal(isBirthdayWindow(at("2026-11-20T22:59:59.999Z")), false);
  assert.equal(isBirthdayWindow(at("2026-11-20T23:00:00.000Z")), true);
});

check("the window closes at 00:00 Berlin on 1 December", () => {
  assert.equal(isBirthdayWindow(at("2026-11-30T22:59:59.999Z")), true);
  assert.equal(isBirthdayWindow(at("2026-11-30T23:00:00.000Z")), false);
  assert.equal(isBirthdayWindow(at("2027-11-21T12:00:00Z")), false);
});

check("the popup follows the same two instants as the hat", () => {
  assert.notEqual(bday("2026-11-20T22:59:59.999Z"), BDAY);
  assert.equal(bday("2026-11-20T23:00:00.000Z"), BDAY);
  assert.equal(bday("2026-11-30T22:59:59.999Z"), BDAY);
  assert.notEqual(bday("2026-11-30T23:00:00.000Z"), BDAY);
});

check("the birthday asks for a review and offers no Maybe later", () => {
  const popup = POPUP_CATALOG.find((p) => p.id === BDAY)!;
  assert.equal(popup.cta.review, true);
  assert.equal(popup.hideLater, true);
  assert.equal(popup.headline, BIRTHDAY_HEADLINE);
});

check("a tab left open switches at the boundary", () => {
  assert.equal(msUntilBirthdayChange(at("2026-11-30T22:59:00.000Z")), 60_000);
  assert.equal(msUntilBirthdayChange(at("2026-12-01T00:00:00Z")), null);
});

console.log("\nMake Home yours (the widget Home)");

const HOME = "home_widgets_2026_11";
const homeOnly = { [HOME]: { enabled: true } };

check("offered to someone who has never arranged Home", () => {
  assert.equal(decide(base({ settings: homeOnly, [NO_HOME]: true })).chosen?.id, HOME);
});

check("never to someone who already arranged Home", () => {
  assert.notEqual(decide(base({ settings: homeOnly })).chosen?.id, HOME);
});

check("its button opens Home in edit mode", () => {
  assert.equal(POPUP_CATALOG.find((p) => p.id === HOME)!.cta.href, "/dashboard?edit=1");
});

console.log(`\n${passed} checks passed.`);
