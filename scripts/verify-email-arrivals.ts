/**
 * The regression test for counting email clicks ourselves (2026-11-09).
 *
 *   npm run verify:email-arrivals
 *
 * Why this exists. SES click tracking was turned off on purpose so that email
 * links could open the Bible Buddy app instead of Chrome: the only way SES
 * could count a click was to rewrite every href through awstrack.me, and a
 * phone matches the domain the reader actually taps. That cost the click
 * number, and this is its replacement - we count the arriving instead of the
 * leaving, off the utm tags the email links already carry.
 *
 * The failure modes worth guarding are all quiet ones. Nothing here would
 * throw, crash or look wrong in a browser; the numbers would just be subtly
 * untrue, or absent, and nobody would know for weeks. So this pins:
 *
 *   * the recorder fires ONLY on utm_source=email, once per campaign and
 *     path, and never on a second render;
 *   * it never polls - MEMORY database-outages-polling, three outages from an
 *     eight-second interval;
 *   * nothing identifying a person travels in the URL;
 *   * the absolute-URL fetch survives CapacitorHttp, which hangs forever on a
 *     relative one;
 *   * reports count distinct readers, not raw rows, so a reload is not a
 *     second person;
 *   * historical SES click rows are still read and still shown.
 *
 * Offline. No network, no Supabase, no browser: the recorder's decision is
 * modelled in the same shape the component uses, and the rest is asserted
 * against the source of the files themselves.
 */
import { readFileSync } from "node:fs";

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

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const recorder = read("components/EmailArrivalRecorder.tsx");
const route = read("app/api/email/arrival/route.ts");
const migration = read("supabase/migrations/20261109_email_arrivals.sql");
const health = read("lib/productHealth.ts");
const tabs = read("lib/productHealthTabs.ts");
const campaigns = read("app/api/admin/campaigns/route.ts");
const layout = read("app/layout.tsx");

/* ------------------------------------------------------------------ */
/* The recorder's decision, modelled                                   */
/* ------------------------------------------------------------------ */

/**
 * The same rule the component applies, in the same order: email only, then
 * once per campaign and path. Written out rather than imported because the
 * component is a React client component that wants a browser.
 */
function arrivalDecision(search: string, pathname: string, alreadySeen: Set<string>) {
  const params = new URLSearchParams(search);
  if ((params.get("utm_source") || "").toLowerCase() !== "email") return { record: false, key: "" };
  const campaign = (params.get("utm_campaign") || "").trim().slice(0, 100) || null;
  const key = `bb:arrival:${campaign || "none"}:${pathname}`;
  if (alreadySeen.has(key)) return { record: false, key };
  alreadySeen.add(key);
  return { record: true, key, campaign };
}

function main() {
  console.log("Counting email arrivals\n");

  const seen = new Set<string>();
  check(
    "an email link is recorded",
    arrivalDecision("?utm_source=email&utm_campaign=day3", "/library", seen).record === true,
  );
  check(
    "the same link on the same page is not recorded twice",
    arrivalDecision("?utm_source=email&utm_campaign=day3", "/library", seen).record === false,
  );
  check(
    "a different campaign on the same page is its own arrival",
    arrivalDecision("?utm_source=email&utm_campaign=day4", "/library", seen).record === true,
  );
  check(
    "the same campaign landing somewhere else is its own arrival",
    arrivalDecision("?utm_source=email&utm_campaign=day4", "/dashboard", seen).record === true,
  );
  check(
    "a visit with no utm tags is not an email arrival",
    arrivalDecision("", "/library", new Set()).record === false,
  );
  check(
    "somebody else's campaign is not counted as ours",
    arrivalDecision("?utm_source=threads&utm_campaign=day3", "/library", new Set()).record === false,
  );
  check(
    "UTM_SOURCE=EMAIL still counts, whatever case the link was written in",
    arrivalDecision("?utm_source=EMAIL", "/library", new Set()).record === true,
  );
  check(
    "an email link with no campaign still counts as an arrival",
    arrivalDecision("?utm_source=email", "/library", new Set()).record === true,
  );

  /* ---------------------------------------------------------------- */
  /* The promises the recorder makes                                   */
  /* ---------------------------------------------------------------- */

  check(
    "the recorder never polls",
    !/setInterval|setTimeout\s*\(/.test(recorder),
  );
  check(
    "the recorder marks the arrival BEFORE the request, so a slow network cannot double-send",
    recorder.indexOf("markRecorded(key)") < recorder.indexOf("await fetch("),
  );
  check(
    "the fetch is absolute, which is what CapacitorHttp needs to not hang forever",
    recorder.includes("`${window.location.origin}/api/email/arrival`"),
  );
  check(
    "the request outlives the landing page's redirect to /dashboard",
    /keepalive:\s*true/.test(recorder),
  );
  check(
    "a failed count is silent - it must never reach a reader",
    /\.catch\(\(\) => \{/.test(recorder),
  );
  check(
    "the recorder is mounted once, in the root layout",
    layout.includes("<EmailArrivalRecorder />") &&
      (layout.split("<EmailArrivalRecorder />").length - 1) === 1,
  );
  check(
    "it does not use useSearchParams, which would force every page into a Suspense boundary",
    // The comment in the component explains why not, so this looks for the
    // call and the import rather than the word.
    !recorder.includes("useSearchParams(") && !/import[^;]*useSearchParams/.test(recorder),
  );

  /* ---------------------------------------------------------------- */
  /* Nothing that identifies a person goes in a URL                     */
  /* ---------------------------------------------------------------- */

  check(
    "the person is read from the Supabase session, not from the link",
    recorder.includes("supabase.auth.getSession()") && route.includes("auth.getUser(token)"),
  );
  check(
    "no email address or recipient token is put into the URL",
    !/utm_[a-z]*\s*=\s*.*email_address|[?&](e|eid|rid|recipient|sub)=/.test(recorder),
  );
  check(
    "the query string is stripped before the path is stored",
    route.includes('raw.split(/[?#]/)[0]'),
  );
  check(
    "the arrival table is service-role only, so the publishable key cannot read who read what",
    /enable row level security/.test(migration) && /for all to service_role/.test(migration),
  );

  /* ---------------------------------------------------------------- */
  /* The write                                                          */
  /* ---------------------------------------------------------------- */

  check(
    "a missing table is treated as ok rather than an error in a reader's face",
    route.includes("isMissingTable") && route.includes("{ ok: true, stored: false }"),
  );
  check(
    "an arrival inside the app is distinguishable from one in a browser",
    route.includes("BibleBuddyApp") && route.includes("is_native"),
  );
  check(
    "the route refuses a path that is not a path",
    route.includes('if (!raw.startsWith("/")) return ""'),
  );

  /* ---------------------------------------------------------------- */
  /* What the dashboard does with it                                    */
  /* ---------------------------------------------------------------- */

  check(
    "arrivals are counted by distinct reader, not by row",
    health.includes("function distinctArrivals") && tabs.includes("distinctArrivals(arrivals.rows)"),
  );
  check(
    "the email panel shows arrivals",
    tabs.includes('label: "Arrived from email"'),
  );
  check(
    "historical SES clicks are still read and still shown",
    tabs.includes('by("click")') && tabs.includes('label: "Human clicks"'),
  );
  check(
    "the scanner filter is kept for clicks and deliberately not applied to arrivals",
    tabs.includes("SCANNER_UA.test") && !/arrivals\.rows[\s\S]{0,120}SCANNER_UA/.test(tabs),
  );
  check(
    "Email → study prefers arrivals but still falls through to clicks for older windows",
    health.includes("const arrivals = await emailArrivals(") &&
      health.includes('const clicks = events.rows.filter((e) => e.event_type === "click"'),
  );
  check(
    "per-campaign arrivals are paged, because PostgREST caps every response at 1000 rows",
    campaigns.includes("from += 1000") && campaigns.includes("arrivalsTruncated"),
  );
  check(
    "a missing arrivals table does not fail the whole campaigns page",
    /if \(arrivalError\) break;/.test(campaigns),
  );

  /* ---------------------------------------------------------------- */
  /* The storage decision, so it is not quietly undone                  */
  /* ---------------------------------------------------------------- */

  check(
    "arrivals live in their own table, not as a new event_type on email_events",
    migration.includes("create table if not exists public.email_arrivals") &&
      !/alter table public\.email_events/i.test(migration),
  );
  check(
    "the migration alters nothing that already exists",
    !/\balter table\b/i.test(migration.replace(/alter table public\.email_arrivals enable row level security;/gi, "")),
  );

  console.log("");
  if (failures.length) {
    console.log(`${passed} passed, ${failures.length} failed:`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`${passed} passed, 0 failed.`);
}

main();
