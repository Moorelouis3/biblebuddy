import type { SupabaseClient } from "@supabase/supabase-js";
import { computeProductHealth, EVIDENCE_LABEL, type Metric } from "./productHealth";
import { PRODUCT_RELEASES } from "./productHealthReleases";

/**
 * The weekly and monthly Product Health write-up, generated on demand.
 *
 * ON DEMAND ONLY. Nothing here is scheduled, nothing is emailed, and the UI
 * says so. There is a cron system in this repo and a working SES sender, so
 * wiring a Monday send would be easy - and that is exactly why it is worth
 * being explicit that it has not been done, rather than leaving a button that
 * implies a report is already arriving somewhere.
 *
 * Every figure comes from the same functions the dashboard uses. The report
 * cannot say anything the page does not, and it inherits the evidence states,
 * so "we do not know" survives into the write-up instead of being smoothed
 * into a round number.
 */

export type ReportPeriod = "weekly" | "monthly";

const fmt = (m: Metric) => {
  if (m.value == null) return `${m.label}: ${EVIDENCE_LABEL[m.evidence]}${m.note ? ` (${m.note})` : ""}`;
  const unit = m.unit === "percent" ? "%" : "";
  const denom = m.denominator != null ? ` of ${m.denominator}` : "";
  const prev = m.previous != null ? ` (was ${m.previous}${unit})` : "";
  return `${m.label}: ${m.value}${unit}${denom}${prev}`;
};

export async function buildProductHealthReport(
  admin: SupabaseClient,
  period: ReportPeriod,
  now = new Date(),
): Promise<{ title: string; markdown: string; generatedAt: string }> {
  const window = period === "weekly" ? "7d" : "30d";
  const data = await computeProductHealth(admin, "overview", window, now);
  const o = (data as { overview: unknown }).overview as {
    headline: Metric[];
    systems: { system: string; measure: string; metric: Metric }[];
    retentionByCohort: { label: string; cohortSize: number; retained: number; rate: number; eligible: boolean }[];
    focus: { title: string; detail: string }[];
    banner: { title: string; detail: string };
    playStore: { status: string; detail: string };
  };

  const label = period === "weekly" ? "Weekly Product Health report" : "Monthly Product Health review";
  const span = period === "weekly" ? "the last 7 days" : "the last 30 days";

  const moved = o.headline.filter((m) => m.value != null && m.previous != null && m.evidence === "live");
  const improved = moved.filter((m) => (m.value as number) > (m.previous as number));
  const declined = moved.filter((m) => (m.value as number) < (m.previous as number));
  const uncertain = o.headline.filter((m) => m.evidence !== "live");
  const gaps = o.systems.filter((s) => s.metric.evidence === "missing_tracking" || s.metric.evidence === "source_unavailable");

  const recentReleases = PRODUCT_RELEASES.filter((r) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) return false;
    const age = (now.getTime() - new Date(`${r.date}T00:00:00Z`).getTime()) / 86_400_000;
    return age >= 0 && age <= (period === "weekly" ? 7 : 30);
  });

  const lines: string[] = [
    `# ${label}`,
    "",
    `Covering ${span} to ${now.toISOString().slice(0, 10)}. All times Europe/Berlin. Compared against the equal-length period immediately before.`,
    "",
    "## What changed",
    recentReleases.length
      ? recentReleases.map((r) => `- **${r.what}** — ${r.date} (${r.verified ? `verified: ${r.evidence}` : "owner-reported"}). Expected: ${r.expected}.`).join("\n")
      : "- No releases recorded in this period.",
    "",
    "## What improved",
    improved.length ? improved.map((m) => `- ${fmt(m)}`).join("\n") : "- Nothing moved up on a comparison strong enough to report.",
    "",
    "## What needs attention",
    declined.length ? declined.map((m) => `- ${fmt(m)}`).join("\n") : "- Nothing moved down on a comparison strong enough to report.",
    "",
    "## What is uncertain",
    [
      ...uncertain.map((m) => `- ${m.label}: ${EVIDENCE_LABEL[m.evidence]}${m.note ? ` — ${m.note}` : ""}`),
      ...gaps.map((g) => `- ${g.system}: ${g.metric.note || EVIDENCE_LABEL[g.metric.evidence]}`),
      `- Google Play: ${o.playStore.status}. ${o.playStore.detail}`,
    ].join("\n"),
    "",
    "## Next actions",
    o.focus.map((f, i) => `${i + 1}. **${f.title}** — ${f.detail}`).join("\n"),
    "",
    "## The numbers",
    ...o.headline.map((m) => `- ${fmt(m)}`),
    "",
    ...o.systems.map((s) => `- ${s.system} · ${s.measure}: ${fmt(s.metric)}`),
    "",
    "### Day 7 study retention by signup week",
    ...o.retentionByCohort.map((c) =>
      c.eligible
        ? `- Week of ${c.label}: ${c.rate}% (${c.retained} of ${c.cohortSize})`
        : `- Week of ${c.label}: not eligible yet (${c.cohortSize} signups, fewer than 7 days old)`,
    ),
    "",
    "## Limitations",
    "- Attributed activity is not proof of cause. An email click followed by study does not mean the email produced the study.",
    "- Email opens are excluded from every success measure: all of them are proxy or scanner fetches.",
    "- Platform is only known where master_actions.device_info carries a user agent, which is a minority of rows. Everything else is Unknown, not web.",
    "- Percentages on a cohort smaller than 20 people are shown with their denominator and marked as too small to read.",
    "- This report is generated on demand. It is not scheduled and it is not emailed to anyone.",
    "",
  ];

  return { title: label, markdown: lines.join("\n"), generatedAt: now.toISOString() };
}
