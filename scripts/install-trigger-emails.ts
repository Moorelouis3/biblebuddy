/**
 * Arms (or pauses) the three behaviour-triggered emails.
 *
 *   npx tsx scripts/install-trigger-emails.ts           # install, paused
 *   npx tsx scripts/install-trigger-emails.ts --arm     # let the triggers send
 *   npx tsx scripts/install-trigger-emails.ts --disarm  # stop all three
 *   npx tsx scripts/install-trigger-emails.ts --status  # what is armed now
 *
 * WHAT THE ROW IS FOR. These three crons write their own copy per person -
 * the study they stalled on, the length of their streak, the devotional they
 * just finished - so unlike a campaign there is no body to store. The row is
 * purely the on switch: isArmed() in lib/email/triggerEmails.ts sends only
 * when a row with this id says 'sending'. Without one, each cron still runs
 * and still reports who it WOULD reach, and sends nothing.
 *
 * WHY kind = 'transactional'. The batch sender at
 * /api/cron/email-campaign-send takes any marketing row that is armed and
 * undated and posts it to the whole list. These rows are armed and undated
 * by design, because the trigger decides who is due rather than a column.
 * 'transactional' keeps them out of that query; the TRIGGER_IDS exclusion in
 * that route is the second lock, for the day somebody changes a kind from
 * the dashboard.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local", quiet: true });

const TRIGGERS = [
  {
    id: "study-nudge",
    subject: "(per-person) you left a study part way",
    notes:
      "Behaviour trigger 1. Sent by /api/cron/study-nudge, 15:00 UTC daily. " +
      "Body is written per person by the route; this row is only the on switch.",
  },
  {
    id: "streak-at-risk",
    subject: "(per-person) your streak ends tonight",
    notes:
      "Behaviour trigger 2. Sent by /api/cron/streak-at-risk, 23:00 UTC daily " +
      "(late evening Eastern, so there is still an evening left to save it). " +
      "Body is written per person by the route; this row is only the on switch.",
  },
  {
    id: "finished-devotional",
    subject: "(per-person) you finished a devotional",
    notes:
      "Behaviour trigger 3. Sent by /api/cron/finished-devotional, 16:00 UTC daily. " +
      "Body is written per person by the route; this row is only the on switch.",
  },
];

const args = process.argv.slice(2);
const has = (flag: string) => args.includes(flag);

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function install(status: "sending" | "paused") {
  const db = admin();
  for (const trigger of TRIGGERS) {
    const { error } = await db.from("email_campaigns").upsert(
      {
        campaign_id: trigger.id,
        subject: trigger.subject,
        html: "",
        text: "",
        status,
        // Keeps it out of the batch sender. See the header.
        kind: "transactional",
        // No scheduled_for on purpose: the trigger decides who is due.
        rate_per_second: 5,
        max_per_run: 100,
        notes: trigger.notes,
      },
      { onConflict: "campaign_id" },
    );
    if (error) throw new Error(`${trigger.id}: ${error.message}`);
    console.log(`  ${trigger.id.padEnd(22)} [${status}]`);
  }
}

async function status() {
  const db = admin();
  const { data } = await db
    .from("email_campaigns")
    .select("campaign_id, status, kind, last_run_at")
    .in("campaign_id", TRIGGERS.map((t) => t.id));
  if (!data?.length) return console.log("  none installed - every trigger is reporting only.");
  for (const row of data) {
    console.log(
      `  ${String(row.campaign_id).padEnd(22)} ${String(row.status).padEnd(9)} ` +
        `${String(row.kind).padEnd(14)} last run ${row.last_run_at ?? "never"}`,
    );
  }
}

async function main() {
  if (has("--status")) return status();
  if (has("--arm")) {
    await install("sending");
    return console.log("\nARMED. All three will send on their next cron run.");
  }
  if (has("--disarm")) {
    await install("paused");
    return console.log("\nPaused. All three are back to reporting only.");
  }
  await install("paused");
  console.log("\nInstalled, paused. Nothing sends until --arm.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
