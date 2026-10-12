/**
 * Installs the 12 Friday teaching lessons as campaign rows.
 *
 *   npx tsx scripts/install-friday-series.ts            # install / refresh copy
 *   npx tsx scripts/install-friday-series.ts --preview  # write HTML to tmp/, send nothing
 *   npx tsx scripts/install-friday-series.ts --test you@example.com [--lesson 1]
 *   npx tsx scripts/install-friday-series.ts --arm      # let the Friday cron send
 *   npx tsx scripts/install-friday-series.ts --disarm   # pause the whole series
 *
 * Installing is safe to repeat: it refreshes subject, body and settings and
 * leaves send history alone. It will not arm anything - that is --arm, and
 * Louis makes that call after reading the preview.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import {
  orderedLessons,
  renderFridayLessonHtml,
  renderFridayLessonText,
  SERIES_START,
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

const lessons = orderedLessons();

async function preview() {
  mkdirSync("tmp/friday-preview", { recursive: true });
  for (const lesson of lessons) {
    const file = `tmp/friday-preview/${String(lesson.position).padStart(2, "0")}-${lesson.id}.html`;
    // The preview fills the placeholders so it looks like a real delivery.
    const html = renderFridayLessonHtml(lesson)
      .replace(/\{\{first_name\}\}/g, "Louis")
      .replace(/\{\{UNSUBSCRIBE\}\}/g, "https://www.mybiblebuddy.net/api/email/unsubscribe?e=preview");
    writeFileSync(file, html);
    console.log(`  ${file}`);
  }
  // One index so all twelve can be read in a single pass.
  const index = lessons
    .map(
      (l) =>
        `<li style="margin:0 0 10px;"><a href="${String(l.position).padStart(2, "0")}-${l.id}.html">` +
        `<strong>${l.position}. ${l.subject}</strong></a><br>` +
        `<span style="color:#667085;font-size:13px;">${l.id}</span></li>`,
    )
    .join("\n");
  writeFileSync(
    "tmp/friday-preview/index.html",
    `<!doctype html><meta charset="utf-8"><title>Friday series preview</title>` +
      `<body style="font-family:Arial,sans-serif;max-width:640px;margin:40px auto;padding:0 16px;">` +
      `<h1>Friday teaching series</h1><p>12 lessons, Fridays 8am Eastern, starting ${SERIES_START}.</p>` +
      `<ol style="line-height:1.5;padding-left:20px;">${index}</ol></body>`,
  );
  console.log("  tmp/friday-preview/index.html");
}

async function install() {
  const db = admin();
  const { data: existing } = await db
    .from("email_campaigns")
    .select("campaign_id, status")
    .in("campaign_id", lessons.map((l) => l.id));
  const statusOf = new Map((existing ?? []).map((r) => [r.campaign_id, r.status]));

  for (const lesson of lessons) {
    // Never flip a live lesson back to paused by re-running an install.
    const status = statusOf.get(lesson.id) ?? "paused";
    const row = {
      campaign_id: lesson.id,
      subject: lesson.subject,
      html: renderFridayLessonHtml(lesson),
      text: renderFridayLessonText(lesson),
      status,
      kind: "marketing",
      target_groups: ["active", "quiet", "inactive"],
      rate_per_second: 5,
      max_per_run: 900,
      notes:
        `Friday teaching series, lesson ${lesson.position} of 12. ` +
        `Sent by /api/cron/friday-teaching, Fridays 8am America/New_York. ` +
        `Source copy: lib/email/fridayTeachingSeriesContent.ts.`,
    };
    const { error } = await db.from("email_campaigns").upsert(row, { onConflict: "campaign_id" });
    if (error) throw new Error(`${lesson.id}: ${error.message}`);
    console.log(`  ${statusOf.has(lesson.id) ? "updated" : "created"}  ${lesson.id.padEnd(34)} [${status}]`);
  }
}

async function setArmed(armed: boolean) {
  const db = admin();
  const { error } = await db
    .from("email_campaigns")
    .update({ status: armed ? "sending" : "paused" })
    .in("campaign_id", lessons.map((l) => l.id));
  if (error) throw new Error(error.message);
  console.log(armed
    ? "ARMED. The Friday cron will now send these on Fridays, 8am Eastern."
    : "Paused. Nothing in the series will send.");
}

async function test(to: string) {
  const { sendEmail, sesSendingEnabled } = await import("../lib/email/sesSender");
  const { unsubscribeUrl } = await import("../lib/email/unsubscribeLink");
  if (!sesSendingEnabled()) throw new Error("SES is not configured in this environment.");

  const which = Number(value("--lesson") || 1);
  const lesson = lessons.find((l) => l.position === which);
  if (!lesson) throw new Error(`no lesson at position ${which}`);

  const fill = (v: string) => v.replace(/\{\{first_name\}\}/g, "Louis");
  const result = await sendEmail({
    to,
    subject: `[TEST] ${fill(lesson.subject)}`,
    html: fill(renderFridayLessonHtml(lesson)),
    text: fill(renderFridayLessonText(lesson)),
    unsubscribeUrl: unsubscribeUrl(to),
    tags: { campaign: `test-${lesson.id}` },
  });
  // Deliberately NOT recorded in email_campaign_sends: a test must not consume
  // the real send slot for that address.
  console.log(result.sent ? `Test lesson ${which} sent to ${to}.` : `Not sent: ${result.reason} ${result.detail ?? ""}`);
}

async function main() {
  if (has("--preview")) return preview();
  if (has("--arm")) return setArmed(true);
  if (has("--disarm")) return setArmed(false);
  const to = value("--test");
  if (to) return test(to);
  await install();
  console.log("\nInstalled, all paused. Nothing sends until --arm.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
