#!/usr/bin/env node
/**
 * Drive a mailing-list campaign from the terminal (Louis, 2026-10-09).
 *
 * The cron at /api/cron/email-campaign-send posts whatever is marked 'sending'.
 * This is how a campaign gets created, checked, started and stopped without
 * opening the Supabase SQL editor.
 *
 *   npm run campaign -- list
 *   npm run campaign -- new <id> --subject "..." --html file.html [--text file.txt] [--tag bb-x]
 *   npm run campaign -- status <id>
 *   npm run campaign -- test <id> --to you@example.com
 *   npm run campaign -- start <id> [--rate 5] [--max-per-run 250]
 *   npm run campaign -- pause <id>
 *
 * Nothing here sends anything itself. `start` only flips a row to 'sending';
 * the cron does the posting, ten minutes at a time, so an interrupted run
 * never double-sends.
 *
 * Warm-up matters more than speed. A new SES identity that posts 4,500 emails
 * on its first day gets throttled back into review whatever the quota says.
 * Start at --rate 2 --max-per-run 100 and raise it over a few days.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const args = process.argv.slice(2);
const command = args[0];
const positional = args.slice(1).filter((a) => !a.startsWith("--"));
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const die = (message) => {
  console.error(message);
  process.exit(1);
};

async function counts(campaignId) {
  const tally = { sent: 0, failed: 0, skipped: 0, pending: 0 };
  for (const status of Object.keys(tally)) {
    const { count } = await db
      .from("email_campaign_sends")
      .select("email", { count: "exact", head: true })
      .eq("campaign_id", campaignId)
      .eq("status", status);
    tally[status] = count ?? 0;
  }
  return tally;
}

async function subscriberTotal(tag) {
  let q = db.from("email_subscribers").select("email", { count: "exact", head: true });
  if (tag) q = q.contains("tags", [tag]);
  const { count } = await q;
  return count ?? 0;
}

if (command === "list") {
  const { data, error } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, status, rate_per_second, max_per_run, last_run_at")
    .order("created_at", { ascending: false });
  if (error) die(error.message);
  if (!data.length) {
    console.log("No campaigns yet. Create one with: npm run campaign -- new <id> --subject \"...\" --html file.html");
  } else {
    for (const c of data) {
      console.log(
        `${c.status.padEnd(8)} ${c.campaign_id.padEnd(34)} ${String(c.rate_per_second) + "/s"} x${c.max_per_run}  ${c.subject.slice(0, 40)}`,
      );
    }
  }
} else if (command === "new") {
  const id = positional[0] || die("usage: new <campaign-id> --subject \"...\" --html file.html");
  const subject = opt("subject") || die("--subject is required");
  const htmlFile = opt("html") || die("--html <file> is required");
  if (!fs.existsSync(htmlFile)) die(`no such file: ${htmlFile}`);
  const html = fs.readFileSync(htmlFile, "utf8");
  const textFile = opt("text");
  // A text part is not optional in practice - HTML-only mail scores worse with
  // spam filters - so one is derived if no file is given.
  const text = textFile
    ? fs.readFileSync(textFile, "utf8")
    : html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();

  const { error } = await db.from("email_campaigns").insert({
    campaign_id: id,
    subject,
    html,
    text,
    tag: opt("tag") || null,
    notes: opt("notes") || null,
  });
  if (error) die(error.message);
  const audience = await subscriberTotal(opt("tag"));
  console.log(`Created "${id}" as a draft. Audience: ${audience} subscriber(s).`);
  console.log(`Send yourself a copy first:  npm run campaign -- test ${id} --to you@example.com`);
} else if (command === "status") {
  const id = positional[0] || die("usage: status <campaign-id>");
  const { data, error } = await db.from("email_campaigns").select("*").eq("campaign_id", id).maybeSingle();
  if (error) die(error.message);
  if (!data) die(`no campaign called "${id}"`);
  const tally = await counts(id);
  const audience = await subscriberTotal(data.tag);
  console.log(`\n  ${id}`);
  console.log(`  subject    ${data.subject}`);
  console.log(`  status     ${data.status}`);
  console.log(`  audience   ${audience}${data.tag ? ` (tag: ${data.tag})` : " (whole list)"}`);
  console.log(`  rate       ${data.rate_per_second}/second, up to ${data.max_per_run} per run`);
  console.log(`  sent       ${tally.sent}`);
  console.log(`  failed     ${tally.failed}`);
  console.log(`  skipped    ${tally.skipped}`);
  console.log(`  pending    ${tally.pending}`);
  console.log(`  remaining  ${Math.max(0, audience - tally.sent - tally.failed - tally.skipped)}`);
  if (data.last_result) console.log(`  last run   ${JSON.stringify(data.last_result)}`);
  console.log("");
} else if (command === "test") {
  // The sending code is TypeScript inside the app, so the test copy is posted
  // by the deployed route rather than reimplemented here - one sender, one set
  // of suppression rules, no chance of the two drifting.
  const id = positional[0] || die("usage: test <campaign-id> --to you@example.com");
  const to = opt("to") || die("--to is required");
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    die(
      "Test sends need CRON_SECRET set (here and on Vercel).\n" +
        "Without it the endpoint would be an open relay, so it refuses.",
    );
  }
  const base = opt("base", "https://www.mybiblebuddy.net");
  const endpoint =
    `${base}/api/cron/email-campaign-send` +
    `?test=${encodeURIComponent(to)}&campaign=${encodeURIComponent(id)}`;
  const response = await fetch(endpoint, { headers: { authorization: `Bearer ${secret}` } });
  const payload = await response.json().catch(() => null);
  console.log(
    response.ok && payload?.ok
      ? `Sent a copy of "${id}" to ${to}.`
      : `Not sent (${response.status}): ${payload?.error || payload?.detail || payload?.reason || "unknown"}`,
  );
} else if (command === "start" || command === "pause") {
  const id = positional[0] || die(`usage: ${command} <campaign-id>`);
  const { data, error } = await db.from("email_campaigns").select("*").eq("campaign_id", id).maybeSingle();
  if (error) die(error.message);
  if (!data) die(`no campaign called "${id}"`);

  if (command === "pause") {
    const { error: e } = await db.from("email_campaigns").update({ status: "paused" }).eq("campaign_id", id);
    if (e) die(e.message);
    console.log(`Paused "${id}". The cron will skip it until you start it again.`);
  } else {
    const patch = { status: "sending" };
    if (opt("rate")) patch.rate_per_second = Number(opt("rate"));
    if (opt("max-per-run")) patch.max_per_run = Number(opt("max-per-run"));
    const audience = await subscriberTotal(data.tag);
    const tally = await counts(id);
    const remaining = Math.max(0, audience - tally.sent - tally.failed - tally.skipped);
    const { error: e } = await db.from("email_campaigns").update(patch).eq("campaign_id", id);
    if (e) die(e.message);
    console.log(`Started "${id}".`);
    console.log(`${remaining} to go, up to ${patch.max_per_run ?? data.max_per_run} every 10 minutes.`);
    console.log(`Stop it any time with: npm run campaign -- pause ${id}`);
  }
} else {
  console.log(fs.readFileSync(new URL(import.meta.url)).toString().split("\n").slice(2, 23).join("\n").replace(/^ \* ?/gm, ""));
}
