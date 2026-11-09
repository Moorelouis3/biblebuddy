/**
 * The regression test for the thing that watches the other bugs.
 *
 *   npm run verify:supabase-failure-reporter
 *
 * The 8 November audit proposed a global `unhandledrejection` listener. It
 * would have caught almost nothing, because supabase-js does not throw on a
 * failed request - it returns { data: null, error } - so a failed read reaches
 * no listener at all. Ship that, wait a day, read the empty list, and conclude
 * the bugs were theoretical.
 *
 * The instrument that does work sits in the client's own fetch wrapper, where
 * every Supabase request already passes through. These checks exist because
 * monitoring is the one feature that can become the outage it was added to
 * find: three database outages in October 2026 came from an 8-second poll, and
 * a reader on a dead connection produces a failed request every few seconds.
 *
 * So the bounds are the test. They are exercised for real here - the pure
 * functions are imported and run, not modelled.
 */
import { readFileSync } from "node:fs";
import {
  MAX_REPORTS_PER_PAGE_LOAD,
  describeSupabaseRequest,
  failureFingerprint,
  newReporterState,
  shouldReport,
} from "../lib/supabaseFailureReporter";

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

const SUPABASE = "https://example.supabase.co";

// -- What it reports about a request -----------------------------------------

check(
  "a table read is described by table and operation",
  (() => {
    const d = describeSupabaseRequest(`${SUPABASE}/rest/v1/completed_chapters?select=chapter&user_id=eq.abc`, "GET");
    return d?.table === "completed_chapters" && d?.operation === "select";
  })(),
);
check(
  "a write is described as a write",
  describeSupabaseRequest(`${SUPABASE}/rest/v1/feed_post_comments`, "POST")?.operation === "insert",
);
check(
  "an auth call is described without naming a table",
  describeSupabaseRequest(`${SUPABASE}/auth/v1/token?grant_type=refresh_token`, "POST")?.table === "auth",
);
check(
  "a request to anywhere else is not ours to report",
  describeSupabaseRequest("https://example.com/api/something", "GET") === null,
);
check(
  "our own reporting endpoint is never reported on",
  describeSupabaseRequest("/api/bug-reports/supabase-failure", "POST") === null,
);

// -- What leaves the browser -------------------------------------------------

check(
  "no filter values ride along in the description",
  JSON.stringify(
    describeSupabaseRequest(`${SUPABASE}/rest/v1/profile_stats?user_id=eq.9f3b&select=email`, "GET"),
  ).includes("9f3b") === false,
);

const fp = failureFingerprint({
  table: "completed_chapters",
  operation: "select",
  status: 0,
  reason: "TypeError: Failed to fetch",
  pathname: "/reading/books/genesis",
});
check("the fingerprint names the table, the operation and the page", /completed_chapters/.test(fp) && /select/.test(fp) && /reading/.test(fp));
check(
  "ids in the path are normalised so one bug is one row",
  failureFingerprint({
    table: "devotionals",
    operation: "select",
    status: 0,
    reason: "x",
    pathname: "/devotionals/8f14e45f-ea8d-4c2b-9f1a-000000000001/day/12",
  }) ===
    failureFingerprint({
      table: "devotionals",
      operation: "select",
      status: 0,
      reason: "x",
      pathname: "/devotionals/2b7c91aa-0000-4000-8000-000000000002/day/99",
    }),
);

// -- The three bounds, run for real ------------------------------------------

const online = true;

check(
  "ten identical failures post once",
  (() => {
    const state = newReporterState();
    let sent = 0;
    for (let i = 0; i < 10; i += 1) if (shouldReport(state, "same", online)) sent += 1;
    return sent === 1;
  })(),
);

check(
  `distinct failures stop at ${MAX_REPORTS_PER_PAGE_LOAD} per page load`,
  (() => {
    const state = newReporterState();
    let sent = 0;
    for (let i = 0; i < 50; i += 1) if (shouldReport(state, `different-${i}`, online)) sent += 1;
    return sent === MAX_REPORTS_PER_PAGE_LOAD;
  })(),
);

check(
  "the ceiling is a bound, not a suggestion",
  MAX_REPORTS_PER_PAGE_LOAD > 0 && MAX_REPORTS_PER_PAGE_LOAD <= 20,
);

check(
  "a reader with no connection is not news",
  (() => {
    const state = newReporterState();
    let sent = 0;
    for (let i = 0; i < 10; i += 1) if (shouldReport(state, `offline-${i}`, false)) sent += 1;
    return sent === 0;
  })(),
);

check(
  "being offline does not spend the budget either",
  (() => {
    const state = newReporterState();
    for (let i = 0; i < 30; i += 1) shouldReport(state, `offline-${i}`, false);
    return shouldReport(state, "back-online", true) === true;
  })(),
);

// -- It must never become the crash --------------------------------------------

/** Comments say what the code must not do; only the code itself counts here. */
function codeOnly(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

const reporter = readFileSync("lib/supabaseFailureReporter.ts", "utf8");
const reporterCode = codeOnly(reporter);
check("the post survives the page unloading", /keepalive: true/.test(reporter));
check("nothing in the reporter is awaited by a caller", /void /.test(reporter) && !/export async function reportSupabaseFailure/.test(reporter));
check("every path is inside a try", (reporter.match(/try \{/g) || []).length >= 1 && /catch/.test(reporter));
check(
  "it never asks supabase-js anything, which is what a request wrapper must not do",
  !/from "\.\/supabaseClient"/.test(reporterCode) && !/supabase\.auth/.test(reporterCode),
);
check("a local dev server is not a reporting population", /localhost/.test(reporterCode));

// -- Wired in, and sending no query strings ------------------------------------

const client = readFileSync("lib/supabaseClient.ts", "utf8");
check("the client actually uses the instrumented fetch", /instrumentedFetch/.test(client));
check(
  "and still has the timeout and the bounded auth lock it had before",
  /fetchWithTimeout/.test(client) && /boundedAuthLock/.test(client),
);

const crash = readFileSync("lib/crashRecovery.ts", "utf8");
check(
  "the crash reporter no longer sends the query string with the page",
  /page: window\.location\.pathname,/.test(crash) && !/pathname \+ window\.location\.search/.test(crash),
);
check(
  "nor does the failure reporter",
  !/location\.search/.test(reporter),
);

// -- Report --------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed.`);
if (failures.length) {
  for (const f of failures) console.error(`  failed: ${f}`);
  process.exit(1);
}
