/**
 * Installs the Friday emails as dated campaign rows.
 *
 *   npx tsx scripts/install-friday-series.ts             # install / refresh copy + dates
 *   npx tsx scripts/install-friday-series.ts --preview   # write HTML to tmp/, send nothing
 *   npx tsx scripts/install-friday-series.ts --schedule  # print the calendar
 *   npx tsx scripts/install-friday-series.ts --test you@example.com [--lesson 1]
 *   npx tsx scripts/install-friday-series.ts --arm       # let the Fridays send
 *   npx tsx scripts/install-friday-series.ts --disarm    # pause every Friday
 *
 * ONE EMAIL, TO EVERYBODY, EVERY FRIDAY (Louis, 2026-10-25). This was a
 * per-person drip until today, sent by /api/cron/friday-teaching, which is
 * now deleted. Each Friday is a date on FRIDAY_CALENDAR, and the ordinary
 * batch sender at /api/cron/email-campaign-send posts it.
 *
 * Installing is safe to repeat: it refreshes subject, body and date and
 * leaves send history alone, so nobody can receive a Friday twice. It will
 * not arm anything - that is --arm.
 *
 * EVERY ROW GETS A scheduled_for, with no way to skip it. An armed Friday row
 * with no date reads to the batch sender as "send this to everybody now", and
 * that is how lesson 1 reached 917 people on a Tuesday in October.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import {
  FRIDAY_CALENDAR,
  orderedLessons,
  renderFridayLessonHtml,
  renderFridayLessonText,
  scheduledFridays,
} from "../lib/email/fridayTeachingSeries";

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

const fridays = scheduledFridays();

function schedule() {
  console.log(`\n  ${fridays.length} Fridays, 8am Eastern:\n`);
  for (const slot of fridays) {
    console.log(`  ${slot.date}  ${slot.id.padEnd(36)} ${slot.email.subject}`);
  }
  const lessonIds = new Set(orderedLessons().map((l) => l.id));
  const unscheduled = orderedLessons().filter((l) => !FRIDAY_CALENDAR.some((s) => s.id === l.id));
  if (unscheduled.length) {
    console.log(`\n  NOT ON THE CALENDAR: ${unscheduled.map((l) => l.id).join(", ")}`);
  }
  const strays = FRIDAY_CALENDAR.filter((s) => !lessonIds.has(s.id) && !s.id.startsWith("friday-themed-"));
  if (strays.length) console.log(`\n  unrecognised ids: ${strays.map((s) => s.id).join(", ")}`);
}

async function preview() {
  mkdirSync("tmp/friday-preview", { recursive: true });
  for (const slot of fridays) {
    const file = `tmp/friday-preview/${slot.date}-${slot.id}.html`;
    // The preview fills the placeholders so it looks like a real delivery.
    writeFileSync(
      file,
      renderFridayLessonHtml(slot.email)
        .replace(/\{\{first_name\}\}/g, "Louis")
        .replace(/\{\{UNSUBSCRIBE\}\}/g, "https://www.mybiblebuddy.net/api/email/unsubscribe?e=preview"),
    );
    console.log(`  ${file}`);
  }
  const index = fridays
    .map(
      (slot) =>
        `<li style="margin:0 0 10px;"><a href="${slot.date}-${slot.id}.html">` +
        `<strong>${slot.date} &middot; ${slot.email.subject}</strong></a><br>` +
        `<span style="color:#667085;font-size:13px;">${slot.id}</span></li>`,
    )
    .join("\n");
  writeFileSync(
    "tmp/friday-preview/index.html",
    `<!doctype html><meta charset="utf-8"><title>Friday emails</title>` +
      `<body style="font-family:Arial,sans-serif;max-width:640px;margin:40px auto;padding:0 16px;">` +
      `<h1>Friday emails</h1><p>One email to everybody, Fridays 8am Eastern.</p>` +
      `<ol style="line-height:1.5;padding-left:20px;">${index}</ol></body>`,
  );
  console.log("  tmp/friday-preview/index.html");
}

async function install() {
  const db = admin();
  const { data: existing } = await db
    .from("email_campaigns")
    .select("campaign_id, status")
    .in("campaign_id", fridays.map((s) => s.id));
  const statusOf = new Map((existing ?? []).map((r) => [r.campaign_id, r.status]));

  for (const slot of fridays) {
    // Never flip a live Friday back to paused by re-running an install, and
    // never un-finish one that has already gone out.
    const status = statusOf.get(slot.id) ?? "paused";
    const row = {
      campaign_id: slot.id,
      subject: slot.email.subject,
      html: renderFridayLessonHtml(slot.email),
      text: renderFridayLessonText(slot.email),
      status,
      kind: "marketing",
      target_groups: ["active", "quiet", "inactive"],
      scheduled_for: slot.utc,
      rate_per_second: 5,
      max_per_run: 900,
      notes:
        `Friday email for ${slot.date}, 8am Eastern. Posted by ` +
        `/api/cron/email-campaign-send. DO NOT CLEAR scheduled_for: an armed ` +
        `row with no date reads to the batch sender as "send to everybody now". ` +
        `Source copy: lib/email/fridayTeachingSeriesContent.ts and ` +
        `lib/email/fridayThemedEmails.ts; calendar in fridayTeachingSeries.ts.`,
    };
    const { error } = await db.from("email_campaigns").upsert(row, { onConflict: "campaign_id" });
    if (error) throw new Error(`${slot.id}: ${error.message}`);
    console.log(`  ${slot.date}  ${slot.id.padEnd(36)} [${status}]`);
  }
}

async function setArmed(armed: boolean) {
  const db = admin();
  // Arming without a date is the one mistake that mails the whole list at
  // once, so the dates go on in the same statement.
  for (const slot of fridays) {
    const { error } = await db
      .from("email_campaigns")
      .update({ status: armed ? "sending" : "paused", scheduled_for: slot.utc })
      .eq("campaign_id", slot.id);
    if (error) throw new Error(`${slot.id}: ${error.message}`);
  }
  console.log(armed
    ? `ARMED. ${fridays.length} Fridays, each held by its own date. First: ${fridays[0].date}.`
    : "Paused. No Friday email will send.");
}

async function test(to: string) {
  const { sendEmail, sesSendingEnabled } = await import("../lib/email/sesSender");
  const { unsubscribeUrl } = await import("../lib/email/unsubscribeLink");
  if (!sesSendingEnabled()) throw new Error("SES is not configured in this environment.");

  const which = Number(value("--lesson") || 1);
  const slot = fridays[which - 1];
  if (!slot) throw new Error(`no Friday at slot ${which} (1-${fridays.length})`);

  const fill = (v: string) => v.replace(/\{\{first_name\}\}/g, "Louis");
  const result = await sendEmail({
    to,
    subject: `[TEST] ${fill(slot.email.subject)}`,
    html: fill(renderFridayLessonHtml(slot.email)),
    text: fill(renderFridayLessonText(slot.email)),
    unsubscribeUrl: unsubscribeUrl(to),
    tags: { campaign: `test-${slot.id}` },
  });
  // Deliberately NOT recorded in email_campaign_sends: a test must not consume
  // the real send slot for that address.
  console.log(result.sent ? `Test (${slot.date}) sent to ${to}.` : `Not sent: ${result.reason} ${result.detail ?? ""}`);
}

async function main() {
  if (has("--schedule")) return schedule();
  if (has("--preview")) return preview();
  if (has("--arm")) return setArmed(true);
  if (has("--disarm")) return setArmed(false);
  const to = value("--test");
  if (to) return test(to);
  await install();
  console.log("\nInstalled with dates. Each row kept whatever status it had; --arm turns them all on.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
