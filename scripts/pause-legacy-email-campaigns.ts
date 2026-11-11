/**
 * Pause every scheduled legacy campaign and the old single welcome email.
 *
 *   npx tsx scripts/pause-legacy-email-campaigns.ts --dry
 *   npx tsx scripts/pause-legacy-email-campaigns.ts
 *   npx tsx scripts/pause-legacy-email-campaigns.ts --restore
 *
 * Louis, 2026-11-11: "pause all old emails that are scheduled we are building a
 * whole new thing - remove all old emails and welcome emails - we are building
 * it over with the first 5 welcome funnel first".
 *
 * PAUSE, NOT DELETE, and deliberately so. Louis's own written spec says it
 * twice: "Do not interpret 'all old emails are gone' as deleting welcome email
 * copy, subscriber records, unsubscribe history, email engagement analytics, or
 * live records without audit", and "Do not delete historical send records,
 * engagement data, or subscriber records."
 *
 * There is a concrete reason beyond following the instruction.
 * email_campaign_sends is keyed (campaign_id, email) and is the ONLY thing
 * stopping a subscriber receiving the same campaign twice - marketing_recipients
 * joins against it on every run. Deleting send history would not tidy anything
 * up; it would re-arm 68,188 duplicate sends the moment a paused campaign was
 * ever resumed. The same table is what makes the new five-step welcome funnel
 * idempotent, so it is load-bearing for the thing being built next.
 *
 * Pausing achieves everything "remove" needs to mean here: status 'paused' is
 * the one condition the sender checks, so a paused row can never fire. Nothing
 * is lost - copy, scheduled dates, send history, engagement rows and subscriber
 * records are all untouched - and --restore puts it back exactly.
 *
 * NOT TOUCHED: the four per-person app triggers (study-nudge, streak-at-risk,
 * finished-devotional, community-start-beginning-of-everything). Those are
 * product behaviour, not the campaign calendar, and nothing in the instruction
 * points at them.
 */
import { config } from "dotenv";
import { existsSync, writeFileSync } from "fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DRY = process.argv.includes("--dry");
const RESTORE = process.argv.includes("--restore");

/** The old single welcome email, replaced by the five-step funnel. */
const OLD_WELCOME = "welcome";

/** Per-person app triggers. Product behaviour, left running. */
const KEEP_RUNNING = new Set([
  "study-nudge",
  "streak-at-risk",
  "finished-devotional",
  "community-start-beginning-of-everything",
]);

type Row = { campaign_id: string; subject: string | null; kind: string; status: string; scheduled_for: string | null };

async function fetchAll(db: SupabaseClient): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("email_campaigns")
      .select("campaign_id, subject, kind, status, scheduled_for")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...((data as Row[]) || []));
    if (!data || data.length < 1000) break;
  }
  return rows;
}

async function main(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  console.log(DRY ? "[DRY RUN - nothing will be written]" : RESTORE ? "[RESTORE]" : "[LIVE]");
  const all = await fetchAll(db);

  if (RESTORE) {
    const file = "tmp/paused-campaigns-restore.json";
    if (!existsSync(file)) throw new Error(`No ${file}. Restore needs the list written by the pause run.`);
    const ids: string[] = JSON.parse(require("fs").readFileSync(file, "utf8"));
    console.log(`restoring ${ids.length} rows to status 'sending'`);
    if (DRY) return 0;
    const { error } = await db.from("email_campaigns").update({ status: "sending" }).in("campaign_id", ids);
    if (error) throw new Error(error.message);
    console.log("restored.");
    return 0;
  }

  // Everything currently able to send, minus the app triggers we keep.
  const targets = all.filter(
    (r) => r.status === "sending" && !KEEP_RUNNING.has(r.campaign_id),
  );
  const marketing = targets.filter((r) => r.kind === "marketing");
  const welcome = targets.filter((r) => r.campaign_id === OLD_WELCOME);
  const otherTransactional = targets.filter((r) => r.kind === "transactional" && r.campaign_id !== OLD_WELCOME);

  console.log(`\nscheduled legacy campaigns to pause: ${marketing.length}`);
  marketing
    .sort((a, b) => String(a.scheduled_for).localeCompare(String(b.scheduled_for)))
    .forEach((r) => console.log(`  ${String(r.scheduled_for ?? "no date").slice(0, 16)}  ${r.campaign_id}`));

  console.log(`\nold welcome email to pause: ${welcome.length}`);
  welcome.forEach((r) => console.log(`  ${r.campaign_id} | "${String(r.subject).slice(0, 50)}"`));
  if (welcome.length) {
    console.log("  NOTE: new signups receive NO welcome until welcome-1..5 exist.");
  }

  if (otherTransactional.length) {
    console.log(`\nleft running (app triggers, not the campaign calendar): ${otherTransactional.length}`);
    otherTransactional.forEach((r) => console.log(`  ${r.campaign_id}`));
  }

  const ids = [...marketing, ...welcome].map((r) => r.campaign_id);
  console.log(`\ntotal to pause: ${ids.length}`);
  console.log("NOT deleted: campaign copy, scheduled dates, email_campaign_sends history,");
  console.log("             engagement rows, subscriber records. Nothing is removed.");

  if (DRY || ids.length === 0) return 0;

  writeFileSync("tmp/paused-campaigns-restore.json", JSON.stringify(ids, null, 2));
  console.log("\nrestore list written to tmp/paused-campaigns-restore.json");

  let failures = 0;
  for (let i = 0; i < ids.length; i += 100) {
    const slice = ids.slice(i, i + 100);
    const { error } = await db.from("email_campaigns").update({ status: "paused" }).in("campaign_id", slice);
    if (error) {
      console.error(`  batch failed: ${error.message}`);
      failures += slice.length;
    }
  }

  // Read back rather than trust the write.
  const after = await fetchAll(db);
  const stillSending = after.filter((r) => ids.includes(r.campaign_id) && r.status !== "paused");
  console.log(`\npaused ${ids.length - stillSending.length} of ${ids.length}`);
  if (stillSending.length) {
    console.log("STILL SENDING:");
    stillSending.forEach((r) => console.log(`  ${r.campaign_id} is ${r.status}`));
  }
  const armedNow = after.filter(
    (r) => r.kind === "marketing" && r.status === "sending",
  );
  console.log(`marketing campaigns still armed anywhere: ${armedNow.length}`);

  return failures || stillSending.length ? 1 : 0;
}

main()
  .then((code) => {
    if (code) process.exit(code);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
