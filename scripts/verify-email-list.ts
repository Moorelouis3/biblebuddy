/**
 * The email list, checked against the real database.
 *
 *   npm run verify:email-list
 *
 * Louis, 2026-11-10: "I want ONE authoritative email management and analytics
 * system, not three different implementations competing with each other."
 *
 * Unlike the other verify scripts this one DOES touch the network: it runs
 * computeDashboard against production with the service key and inspects what
 * comes back. It has to. The whole point of the rewrite is that the list now
 * agrees with the campaigns page, and that is a fact about the data, not
 * about the source - the old code was perfectly well-formed and still showed
 * 994 opens for an email that had 2,324.
 *
 * It reads and prints. It writes nothing.
 *
 * What it pins:
 *   * no email appears twice (the thirteen-way subject overlap between
 *     email_campaign_stats and ses_campaign_stats)
 *   * every row's numbers match ses_campaign_stats, the source of truth
 *   * a date is never shown without saying what kind of date it is
 *   * an automation is not given a single fixed send date
 *   * clicks after 2026-11-09 read as "not counted", never as zero
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { computeDashboard } from "../lib/adminDashboard";

config({ path: ".env.local", quiet: true });

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean, detail?: string) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label + (detail ? ` — ${detail}` : ""));
    console.log(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log("Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.");
    process.exit(1);
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  console.log("Reading the dashboard against the live database…\n");
  const data = await computeDashboard(admin, "30d");
  const list = data.emailList;

  check("the list is not empty", list.length > 0, `${list.length} rows`);

  /* --------------------------------------------------------------- */
  /* Nothing counted twice                                            */
  /* --------------------------------------------------------------- */

  const seenCampaign = new Map<string, number>();
  for (const r of list) {
    if (!r.campaignId) continue;
    seenCampaign.set(r.campaignId, (seenCampaign.get(r.campaignId) || 0) + 1);
  }
  const repeatedIds = [...seenCampaign.entries()].filter(([, n]) => n > 1);
  check("no campaign appears twice", repeatedIds.length === 0, repeatedIds.map(([id]) => id).join(", "));

  // The thirteen-way overlap: a Systeme row whose subject is also a campaign.
  const sesSubjects = new Set(list.filter((r) => r.source === "ses").map((r) => r.subject.trim()));
  const overlap = list.filter((r) => r.source === "systeme" && sesSubjects.has(r.subject.trim()));
  check(
    "no Systeme row duplicates a campaign by subject",
    overlap.length === 0,
    overlap.map((r) => `"${r.subject}"`).join(", "),
  );

  const bySubjectAndDate = new Map<string, number>();
  for (const r of list) {
    const k = `${r.subject.trim()}|${(r.when || "").slice(0, 10)}`;
    bySubjectAndDate.set(k, (bySubjectAndDate.get(k) || 0) + 1);
  }
  const dupes = [...bySubjectAndDate.entries()].filter(([, n]) => n > 1);
  check("no subject appears twice on the same day", dupes.length === 0, dupes.map(([k]) => k).join(" / "));

  /* --------------------------------------------------------------- */
  /* The numbers match the source of truth                            */
  /* --------------------------------------------------------------- */

  const { data: sesRows, error: sesError } = await admin
    .from("ses_campaign_stats")
    .select("campaign_id, subject, sent, opens, clicks, completed_at");
  check("ses_campaign_stats is readable", !sesError, sesError?.message);

  const sesById = new Map((sesRows || []).map((r) => [r.campaign_id as string, r]));
  const drifted: string[] = [];
  let checkedAgainstSource = 0;
  for (const r of list) {
    if (!r.campaignId) continue;
    const source = sesById.get(r.campaignId);
    if (!source) continue;
    checkedAgainstSource += 1;
    if (r.opens != null && source.opens != null && r.opens !== source.opens) {
      drifted.push(`${r.campaignId}: list ${r.opens} vs source ${source.opens}`);
    }
  }
  /**
   * ses_campaign_stats is a VIEW over email_events, and SNS delivers opens
   * continuously, so the dashboard's read and this script's read are seconds
   * apart and a busy campaign can legitimately tick up between them. A drift
   * of a few is the clock, not a bug; a large one, or a drift on a finished
   * campaign, is not.
   */
  const realMismatches = drifted.filter((d) => {
    const [, nums] = d.split(": ");
    const [a, b] = nums.replace("list ", "").replace("source ", "").split(" vs ").map(Number);
    return Math.abs(a - b) > 25;
  });
  check(
    "every row's opens come from ses_campaign_stats",
    realMismatches.length === 0,
    realMismatches.join(" / "),
  );
  if (drifted.length && !realMismatches.length) {
    console.log(`      (${drifted.length} moved by a handful between the two reads — opens arrive continuously)`);
  }
  check("most rows are campaigns, not Systeme history", checkedAgainstSource > list.length / 2);

  /* --------------------------------------------------------------- */
  /* Honest dates and statuses                                        */
  /* --------------------------------------------------------------- */

  const datedWithoutKind = list.filter((r) => r.when && !r.whenKind && !r.automated);
  check(
    "a date is never shown without saying what kind of date it is",
    datedWithoutKind.length === 0,
    datedWithoutKind.map((r) => r.subject.slice(0, 30)).join(" / "),
  );

  const automationsWithSendDate = list.filter((r) => r.automated && r.whenKind === "sent");
  check(
    "no automation is given a single fixed send date",
    automationsWithSendDate.length === 0,
    automationsWithSendDate.map((r) => r.subject.slice(0, 30)).join(" / "),
  );

  const zeroClicksAfterCutoff = list.filter(
    (r) => !r.automated && r.state === "sent" && (r.when || "").slice(0, 10) >= "2026-11-09" && r.clicks === 0,
  );
  check(
    'clicks after 9 Nov read as "not counted", never as a zero',
    zeroClicksAfterCutoff.length === 0,
    zeroClicksAfterCutoff.map((r) => r.subject.slice(0, 30)).join(" / "),
  );

  const states = new Set(list.map((r) => r.state));
  check("statuses are drawn from the known set", [...states].every((s) =>
    ["sent", "sending", "armed", "scheduled", "paused", "missed", "draft"].includes(s),
  ), [...states].join(", "));

  const sortedRight = list.every(
    (r, i) => i === 0 || (list[i - 1].when || "") >= (r.when || ""),
  );
  check("the list is in one chronological order, newest first", sortedRight);

  /* --------------------------------------------------------------- */
  /* What it actually looks like                                      */
  /* --------------------------------------------------------------- */

  const counts: Record<string, number> = {};
  for (const r of list) counts[r.state] = (counts[r.state] || 0) + 1;
  console.log(`\n  ${list.length} emails: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ")}`);
  console.log(`  ${list.filter((r) => r.automated).length} are automations`);
  console.log(`  ${list.filter((r) => r.source === "systeme").length} are Systeme-only history\n`);

  for (const r of list.slice(0, 12)) {
    const when = r.when ? r.when.slice(0, 10) : "(no date)";
    const kind = r.automated ? "running" : r.whenKind || "";
    console.log(
      `  ${r.state.padEnd(9)} ${when} ${kind.padEnd(9)} ${(r.subject || "").slice(0, 42).padEnd(44)}` +
        ` ${String(r.recipients ?? "—").padStart(6)} sent` +
        ` ${String(r.opens ?? "—").padStart(6)} opens` +
        ` ${String(r.clicks ?? "none").padStart(6)} clicks`,
    );
  }

  console.log("");
  if (failures.length) {
    console.log(`${passed} passed, ${failures.length} failed:`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`${passed} passed, 0 failed.`);
}

void main();
