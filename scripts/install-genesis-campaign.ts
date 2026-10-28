/**
 * Installs the four Genesis study emails as dated campaign rows.
 *
 *   npx tsx scripts/install-genesis-campaign.ts             # install / refresh copy + dates (PAUSED)
 *   npx tsx scripts/install-genesis-campaign.ts --preview   # write HTML to tmp/, touch nothing
 *   npx tsx scripts/install-genesis-campaign.ts --schedule  # print the calendar and collisions
 *   npx tsx scripts/install-genesis-campaign.ts --test you@example.com [--email 1]
 *   npx tsx scripts/install-genesis-campaign.ts --arm       # let them send
 *   npx tsx scripts/install-genesis-campaign.ts --disarm    # pause all four
 *
 * Same contract as scripts/install-friday-series.ts, deliberately:
 *
 *  - INSTALLING NEVER ARMS. Rows are written `paused`, and the batch sender
 *    only ever looks at `status='sending'`. So installing is safe to repeat
 *    and safe to do before approval.
 *  - EVERY ROW GETS A scheduled_for. An armed row with no date reads to
 *    /api/cron/email-campaign-send as "post this to the whole list now" -
 *    that is how a Friday lesson reached 917 people on a Tuesday in October.
 *  - Re-installing refreshes subject, body and date and leaves send history
 *    alone. `email_campaign_sends` is keyed (campaign_id, email), so nobody
 *    can be sent the same email twice no matter how often this is run.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { GENESIS_EMAILS, genesisEmailById, type GenesisEmail } from "../lib/email/genesisStudyCampaign";
import { renderFridayLessonHtml, renderFridayLessonText } from "../lib/email/fridayTeachingSeries";

config({ path: ".env.local", quiet: true });

const args = process.argv.slice(2);
const has = (flag: string) => args.includes(flag);
const value = (flag: string) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1] ?? null;
};

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const ids = GENESIS_EMAILS.map((e) => e.id);

/** What else is already armed on these dates, in our own system. */
async function collisions() {
  const db = admin();
  const dates = GENESIS_EMAILS.map((e) => e.sendDate);
  const { data } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, status, scheduled_for")
    .eq("status", "sending")
    .not("campaign_id", "in", `(${ids.join(",")})`);
  const clashes = (data ?? []).filter((r) => r.scheduled_for && dates.includes(r.scheduled_for.slice(0, 10)));
  return clashes;
}

async function schedule() {
  console.log(`\n  ${GENESIS_EMAILS.length} Genesis emails:\n`);
  for (const e of GENESIS_EMAILS) {
    console.log(`  ${e.sendDate}  ${e.id.padEnd(36)} ${e.subject}`);
  }
  const clashes = await collisions();
  if (clashes.length) {
    console.log(`\n  COLLISIONS - already ARMED on the same day:\n`);
    for (const c of clashes) console.log(`  ${c.scheduled_for?.slice(0, 10)}  ${c.campaign_id}  ${c.subject}`);
  } else {
    console.log(`\n  No armed campaign shares any of these dates.`);
  }
  console.log();
}

function preview() {
  mkdirSync("tmp/genesis-campaign", { recursive: true });
  for (const e of GENESIS_EMAILS) {
    writeFileSync(`tmp/genesis-campaign/${e.id}.html`, renderFridayLessonHtml(e));
    writeFileSync(`tmp/genesis-campaign/${e.id}.txt`, renderFridayLessonText(e));
    console.log(`  wrote tmp/genesis-campaign/${e.id}.html`);
  }
}

async function install() {
  const db = admin();
  for (const e of GENESIS_EMAILS) {
    const { data: existing } = await db
      .from("email_campaigns")
      .select("campaign_id, status")
      .eq("campaign_id", e.id)
      .maybeSingle();

    const row = {
      campaign_id: e.id,
      subject: e.subject,
      html: renderFridayLessonHtml(e),
      text: renderFridayLessonText(e),
      kind: "marketing",
      scheduled_for: e.sendAtUtc,
      target_groups: ["active", "quiet", "inactive"],
      rate_per_second: 5,
      max_per_run: 1000,
      notes:
        `Genesis study campaign, ${e.sendDate}. Posted by /api/cron/email-campaign-send. ` +
        `DO NOT CLEAR scheduled_for: an armed row with no date reads to the batch sender as "send to everyone now".`,
      // Installing never arms. An existing row keeps whatever status it has,
      // so re-running to fix a typo cannot disarm a campaign mid-send.
      ...(existing ? {} : { status: "paused" }),
    };

    const { error } = await db.from("email_campaigns").upsert(row, { onConflict: "campaign_id" });
    if (error) throw new Error(`${e.id}: ${error.message}`);

    const { count } = await db
      .from("email_campaign_sends")
      .select("*", { count: "exact", head: true })
      .eq("campaign_id", e.id);
    console.log(
      `  ${existing ? "refreshed" : "created  "} ${e.id.padEnd(36)} ${e.sendDate}  ` +
        `status=${existing?.status ?? "paused"}  already_sent=${count ?? 0}`,
    );
  }
}

async function setStatus(status: "sending" | "paused") {
  const db = admin();
  for (const e of GENESIS_EMAILS) {
    const { error } = await db.from("email_campaigns").update({ status }).eq("campaign_id", e.id);
    if (error) throw new Error(`${e.id}: ${error.message}`);
    console.log(`  ${status === "sending" ? "ARMED " : "paused"} ${e.id}  (${e.sendDate})`);
  }
  if (status === "sending") {
    console.log(`\n  Email 1 is dated in the past, so it goes out on the next ten-minute tick.`);
    console.log(`  The other three wait for their dates.\n`);
  }
}

async function test(address: string) {
  const n = Number(value("--email") ?? "1");
  const email: GenesisEmail | undefined = GENESIS_EMAILS[n - 1];
  if (!email) throw new Error(`--email must be 1..${GENESIS_EMAILS.length}`);
  const { sendEmail } = await import("../lib/email/sesSender");
  const fill = (v: string) => v.replace(/\{\{\s*first_name\s*\}\}/g, "friend");
  const sent = await sendEmail({
    to: address,
    subject: fill(email.subject),
    html: fill(renderFridayLessonHtml(email)),
    text: fill(renderFridayLessonText(email)),
  });
  console.log(`  test ${email.id} -> ${address}: ${JSON.stringify(sent)}`);
}

async function main() {
  if (has("--schedule")) return schedule();
  if (has("--preview")) return preview();
  if (has("--arm")) return setStatus("sending");
  if (has("--disarm")) return setStatus("paused");
  const t = value("--test");
  if (t) return test(t);
  await install();
  console.log(`\n  Installed PAUSED. Nothing will send until --arm.\n`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

void genesisEmailById;
