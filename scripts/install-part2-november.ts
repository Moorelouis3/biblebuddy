/**
 * Installs the six approved November Part 2 emails as dated campaign rows.
 *
 *   npx tsx scripts/install-part2-november.ts             # install / refresh copy + dates (PAUSED)
 *   npx tsx scripts/install-part2-november.ts --preview   # write HTML to tmp/, touch nothing
 *   npx tsx scripts/install-part2-november.ts --schedule  # print the calendar and collisions
 *   npx tsx scripts/install-part2-november.ts --test you@example.com [--email 1]
 *   npx tsx scripts/install-part2-november.ts --arm       # let them send
 *   npx tsx scripts/install-part2-november.ts --disarm    # pause all six
 *
 * Same contract as scripts/install-genesis-campaign.ts, deliberately:
 *
 *  - INSTALLING NEVER ARMS. New rows are written `paused` and an existing row
 *    keeps whatever status it has, so re-running to fix a typo can neither
 *    start a send nor stop one that is in flight.
 *  - EVERY ROW GETS A scheduled_for. An armed row with no date reads to
 *    /api/cron/email-campaign-send as "post this to the whole list now" -
 *    that is how a Friday lesson reached 917 people on a Tuesday in October.
 *  - Re-installing refreshes subject, body and date and leaves send history
 *    alone. `email_campaign_sends` is keyed (campaign_id, email), so nobody
 *    can be sent the same email twice no matter how often this is run.
 *
 * The copy is in lib/email/partTwoNovemberContent.ts, which is generated from
 * docs/EMAIL_APPROVED_COPY.md. Read that file's header before changing wording.
 *
 * 12 NOVEMBER IS NOT HERE, on purpose. Its approved body was never stored, and
 * the plan rates it an exact duplicate of the 28 October send. See the content
 * file's header.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { PART_TWO_NOVEMBER, type PartTwoEmail } from "../lib/email/partTwoNovemberContent";
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

/**
 * 8am Eastern, the hour every other broadcast uses. November dates are all
 * EST (US clocks went back on 1 November), so that is a flat 13:00 UTC.
 */
const sendAtUtc = (e: PartTwoEmail) => `${e.sendDate}T13:00:00Z`;

const ids = PART_TWO_NOVEMBER.map((e) => e.id);

/** What else is already armed on these dates, in our own system. */
async function collisions() {
  const db = admin();
  const dates = PART_TWO_NOVEMBER.map((e) => e.sendDate);
  const { data, error } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, status, scheduled_for")
    .eq("status", "sending")
    .not("campaign_id", "in", `(${ids.join(",")})`);
  if (error) throw new Error(error.message);
  return (data ?? []).filter((r) => r.scheduled_for && dates.includes(r.scheduled_for.slice(0, 10)));
}

async function schedule() {
  console.log(`\n  ${PART_TWO_NOVEMBER.length} Part 2 emails:\n`);
  for (const e of PART_TWO_NOVEMBER) {
    const day = new Date(`${e.sendDate}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short" });
    console.log(`  ${e.sendDate} ${day}  ${e.id.padEnd(32)} ${e.subject}`);
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
  mkdirSync("tmp/part2-november", { recursive: true });
  for (const e of PART_TWO_NOVEMBER) {
    writeFileSync(`tmp/part2-november/${e.id}.html`, renderFridayLessonHtml(e));
    writeFileSync(`tmp/part2-november/${e.id}.txt`, renderFridayLessonText(e));
    console.log(`  wrote tmp/part2-november/${e.id}.html`);
  }
}

async function install() {
  const db = admin();
  for (const e of PART_TWO_NOVEMBER) {
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
      scheduled_for: sendAtUtc(e),
      target_groups: ["active", "quiet", "inactive"],
      rate_per_second: 5,
      max_per_run: 1000,
      notes:
        `Part 2 November, ${e.sendDate}. Approved by Louis 2026-11-11. ` +
        `Posted by /api/cron/email-campaign-send. ` +
        `DO NOT CLEAR scheduled_for: an armed row with no date reads to the batch sender as "send to everyone now".`,
      // Installing never arms.
      ...(existing ? {} : { status: "paused" }),
    };

    const { error } = await db.from("email_campaigns").upsert(row, { onConflict: "campaign_id" });
    if (error) throw new Error(`${e.id}: ${error.message}`);

    const { count } = await db
      .from("email_campaign_sends")
      .select("*", { count: "exact", head: true })
      .eq("campaign_id", e.id);
    console.log(
      `  ${existing ? "refreshed" : "created  "} ${e.id.padEnd(32)} ${e.sendDate}  ` +
        `status=${existing?.status ?? "paused"}  already_sent=${count ?? 0}`,
    );
  }
}

async function setStatus(status: "sending" | "paused") {
  const db = admin();
  const now = new Date().toISOString().slice(0, 10);
  for (const e of PART_TWO_NOVEMBER) {
    const { error } = await db.from("email_campaigns").update({ status }).eq("campaign_id", e.id);
    if (error) throw new Error(`${e.id}: ${error.message}`);
    const past = e.sendDate < now ? "  <- DATED IN THE PAST, goes on the next tick" : "";
    console.log(`  ${status === "sending" ? "ARMED " : "paused"} ${e.id}  (${e.sendDate})${past}`);
  }
}

async function test(address: string) {
  const n = Number(value("--email") ?? "1");
  const email: PartTwoEmail | undefined = PART_TWO_NOVEMBER[n - 1];
  if (!email) throw new Error(`--email must be 1..${PART_TWO_NOVEMBER.length}`);
  const { sendEmail } = await import("../lib/email/sesSender");
  const fill = (v: string) => v.replace(/\{\{\s*first_name\s*\}\}/g, "friend");
  const sent = await sendEmail({
    to: address,
    subject: fill(email.subject),
    html: fill(renderFridayLessonHtml(email)),
    text: fill(renderFridayLessonText(email)),
    campaignId: email.id,
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
