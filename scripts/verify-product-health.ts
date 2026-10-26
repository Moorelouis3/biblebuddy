/**
 * Checks the Product Health metrics against the database directly.
 *
 * Not a unit test of the formatting - a check that the numbers the dashboard
 * reports are the numbers the tables actually contain, that denominators are
 * present wherever a percentage is, and that a missing source comes back as a
 * missing source rather than a zero.
 *
 *   npx tsx scripts/verify-product-health.ts
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import { computeProductHealth, EVIDENCE_LABEL, type Metric } from "../lib/productHealth";
import { computeTab } from "../lib/productHealthTabs";
import { buildProductHealthReport } from "../lib/productHealthReport";
import { dashboardRanges } from "../lib/adminDashboard";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k: string) => (env.match(new RegExp("^" + k + "=(.*)$", "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
const db = createClient(get("NEXT_PUBLIC_SUPABASE_URL")!, get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};
const show = (m: Metric) =>
  `${m.label}: ${m.value ?? "—"}${m.unit === "percent" && m.value != null ? "%" : ""}` +
  `${m.denominator != null ? ` of ${m.denominator}` : ""} [${EVIDENCE_LABEL[m.evidence]}]`;

async function main() {
  const now = new Date();

  console.log("\n=== OVERVIEW (30d) ===");
  const res = await computeProductHealth(db as never, "overview", "30d", now);
  const o = (res as { overview: unknown }).overview as {
    headline: Metric[];
    systems: { system: string; metric: Metric }[];
    retentionByCohort: { label: string; cohortSize: number; retained: number; rate: number; eligible: boolean }[];
    topDevotionals: { title: string; starts: number }[];
    featureAdoption: Metric[];
    banner: { title: string; detail: string };
  };
  o.headline.forEach((m) => console.log("   ", show(m)));

  console.log("\n--- invariants ---");
  check("four headline cards", o.headline.length === 4);
  check(
    "every percentage carries a denominator",
    o.headline.filter((m) => m.unit === "percent").every((m) => m.denominator != null),
  );
  check(
    "no metric reports a value while claiming a missing source",
    [...o.headline, ...o.systems.map((s) => s.metric)].every((m) => m.evidence !== "source_unavailable" || m.value == null),
  );
  check(
    "rates on a cohort under 20 are flagged, not presented as fact",
    o.headline.every((m) => m.unit !== "percent" || (m.denominator ?? 0) >= 20 || m.evidence !== "live"),
  );
  check("six systems in the health table", o.systems.length === 6, o.systems.map((s) => s.system).join(", "));
  check("banner is generated, not canned", Boolean(o.banner.title) && Boolean(o.banner.detail));

  console.log("\n--- cohort eligibility ---");
  o.retentionByCohort.forEach((c) =>
    console.log(`    ${c.label}: ${c.cohortSize} signups, ${c.eligible ? `${c.retained} retained (${c.rate}%)` : "NOT ELIGIBLE"}`),
  );
  check(
    "a cohort younger than 7 days is never given a rate",
    o.retentionByCohort.every((c) => c.eligible || c.rate === 0),
  );

  console.log("\n--- cross-checking against the tables directly ---");
  const { current } = dashboardRanges("30d", now);
  const { count: acceptedDirect } = await db
    .from("buddy_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "accepted")
    .gte("updated_at", current.start.toISOString())
    .lt("updated_at", current.end.toISOString());
  const buddyCard = o.headline.find((m) => m.label === "Buddy connections");
  check("buddy connections match a direct count", buddyCard?.value === (acceptedDirect ?? 0), `dashboard ${buddyCard?.value} vs table ${acceptedDirect}`);

  // email_engagement, not profile_stats: see SIGNUP_TABLE in lib/productHealth.ts.
  // head:true returns a null count on this filtered query, so the rows are
  // read and counted instead of trusting it.
  const { data: signupRows } = await db
    .from("email_engagement")
    .select("user_id")
    .gte("registered_at", current.start.toISOString())
    .lt("registered_at", current.end.toISOString())
    .not("user_id", "is", null)
    .neq("user_id", "669d4404-5eee-49ee-a112-2ecbd573e22a");
  const signupsDirect = (signupRows || []).length;
  const activation = o.headline.find((m) => m.label === "First-study activation");
  check("activation denominator equals registrations in the period (email_engagement)", activation?.denominator === (signupsDirect ?? 0), `dashboard ${activation?.denominator} vs table ${signupsDirect}`);

  // The bug these guard against: a query that fails with an EMPTY error
  // message, whose null count is then read as 0, turning a failed read into a
  // confident zero. It rendered the landing conversion as 0% of 6,064 visits.
  const { countSignups } = await import("../lib/productHealth");
  const signupCount = await countSignups(db as never, current.start, current.end);
  check("countSignups returns a number, never a silent null", signupCount.count != null, JSON.stringify(signupCount));
  check("countSignups agrees with the table", signupCount.count === signupsDirect, `helper ${signupCount.count} vs table ${signupsDirect}`);

  const landingRow = o.systems.find((s) => s.system === "Landing page");
  const landingNumerator =
    landingRow && landingRow.metric.value != null && landingRow.metric.denominator
      ? Math.round((landingRow.metric.value / 100) * landingRow.metric.denominator)
      : null;
  check(
    "landing conversion is built on the real signup count",
    landingNumerator != null && Math.abs(landingNumerator - signupsDirect) <= 3,
    `implied ${landingNumerator} vs signups ${signupsDirect}`,
  );

  const devRow = o.systems.find((s) => s.system === "Devotionals");
  check(
    "a zero denominator is never shown as a 0% rate",
    !devRow || devRow.metric.denominator !== 0 || devRow.metric.evidence !== "live",
    devRow ? `${devRow.metric.value} of ${devRow.metric.denominator} [${devRow.metric.evidence}]` : "",
  );
  check(
    "no percentage anywhere exceeds 100",
    [...o.headline, ...o.systems.map((s) => s.metric)].every((m) => m.unit !== "percent" || m.value == null || m.value <= 100),
    [...o.headline, ...o.systems.map((s) => s.metric)].filter((m) => (m.value ?? 0) > 100 && m.unit === "percent").map((m) => `${m.label}=${m.value}%`).join(", "),
  );

  console.log("\n--- date boundaries ---");
  const r7 = dashboardRanges("7d", now);
  const r30 = dashboardRanges("30d", now);
  check("7d current window is 7 days", Math.round((r7.current.end.getTime() - r7.current.start.getTime()) / 86400000) === 7);
  check("previous window does not overlap current", r7.previous.end.getTime() <= r7.current.start.getTime());
  check("30d is longer than 7d", r30.current.start < r7.current.start);

  console.log("\n=== DETAIL TABS ===");
  for (const tab of ["acquisition", "retention", "devotionals", "community", "releases"] as const) {
    const data = await computeTab(db as never, tab, "30d", now);
    const metrics = data.sections.flatMap((s) => s.metrics);
    const bad = metrics.filter((m) => m.evidence === "source_unavailable");
    console.log(`  ${tab}: ${data.sections.length} sections, ${metrics.length} metrics, ${(data.tables || []).length} tables${bad.length ? ` — UNAVAILABLE: ${bad.map((b) => b.label).join(", ")}` : ""}`);
    check(`${tab} returns something`, data.sections.length > 0 || (data.tables || []).length > 0);
    check(`${tab}: percentages all carry denominators`, metrics.every((m) => m.unit !== "percent" || m.denominator != null || m.value == null));
  }

  console.log("\n--- missing-tracking is distinguishable from zero ---");
  const dev = await computeTab(db as never, "devotionals", "30d", now);
  const watch = dev.sections.flatMap((s) => s.metrics).find((m) => m.label === "Watch time");
  check("TV watch time reports missing tracking, not 0", watch?.evidence === "missing_tracking" && watch.value === null);
  const ret = await computeTab(db as never, "retention", "30d", now);
  const unknownPlatform = ret.sections.flatMap((s) => s.metrics).find((m) => m.label === "Unknown platform");
  check("unknown platform is labelled, not folded into web", Boolean(unknownPlatform), unknownPlatform ? `${unknownPlatform.value} actions` : "");

  console.log("\n=== REPORTS ===");
  const weekly = await buildProductHealthReport(db as never, "weekly", now);
  check("weekly report has every required heading", ["What changed", "What improved", "What needs attention", "What is uncertain", "Next actions", "Limitations"].every((h) => weekly.markdown.includes(`## ${h}`)));
  check("weekly report contains no placeholder text", !/lorem|TODO|XXX|sample data/i.test(weekly.markdown));
  console.log(`  weekly report: ${weekly.markdown.split("\n").length} lines`);

  console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
    process.exit(failures === 0 ? 0 : 1);

}

void main();
