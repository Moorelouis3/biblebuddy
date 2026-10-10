#!/usr/bin/env node
/**
 * Put every account with an email address onto the mailing list.
 *
 * The list was built once from a Systeme export and nothing added to it
 * afterwards, so it drifted behind the app by one signup a day. The trigger in
 * 20261010_subscribe_new_signups.sql stops the drift going forward; this
 * catches up everyone who signed up before it existed.
 *
 *   npm run backfill-subscribers -- --dry-run
 *   npm run backfill-subscribers
 *
 * Safe to run repeatedly: it only inserts addresses that are not already
 * there, and never touches an existing row (someone's name, tags or
 * subscribed_at from the Systeme import must not be overwritten).
 *
 * Anyone on email_suppressions is skipped outright. They unsubscribed or hard
 * bounced; putting them back on the list would be wrong even though the sender
 * would catch it later.
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

const dryRun = process.argv.includes("--dry-run");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

async function allEmails(table) {
  const out = new Set();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from(table).select("email").range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data.length) break;
    data.forEach((r) => r.email && out.add(r.email.toLowerCase()));
    if (data.length < 1000) break;
  }
  return out;
}

const [subscribers, suppressed] = await Promise.all([
  allEmails("email_subscribers"),
  allEmails("email_suppressions"),
]);

const users = [];
for (let page = 1; ; page += 1) {
  const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) throw new Error(error.message);
  if (!data.users.length) break;
  users.push(...data.users);
  if (data.users.length < 1000) break;
}

const firstName = (user) => {
  const meta = user.user_metadata || {};
  const raw = meta.first_name || (meta.full_name || meta.name || "").split(" ")[0] || "";
  return raw.trim() || null;
};

const rows = [];
let skippedSuppressed = 0;
for (const user of users) {
  const email = (user.email || "").trim().toLowerCase();
  if (!email) continue;
  if (user.is_anonymous) continue;
  // Never re-add someone who asked to be left alone.
  if (suppressed.has(email)) {
    skippedSuppressed += 1;
    continue;
  }
  if (subscribers.has(email)) continue;
  rows.push({
    email,
    first_name: firstName(user),
    locale: "en",
    source: "app_backfill",
    tags: [],
    subscribed_at: user.created_at,
  });
}

console.log(`accounts with an email: ${users.filter((u) => u.email && !u.is_anonymous).length}`);
console.log(`already subscribed:     ${subscribers.size}`);
console.log(`skipped (unsubscribed): ${skippedSuppressed}`);
console.log(`to add:                 ${rows.length}`);

if (!rows.length) {
  console.log("\nNothing to do - the list is in sync.");
  process.exit(0);
}
if (dryRun) {
  console.log("\nDry run. Re-run without --dry-run to insert.");
  process.exit(0);
}

let added = 0;
for (let i = 0; i < rows.length; i += 500) {
  const batch = rows.slice(i, i + 500);
  // ignoreDuplicates so a row added by the trigger mid-run is left alone.
  const { error } = await db
    .from("email_subscribers")
    .upsert(batch, { onConflict: "email", ignoreDuplicates: true });
  if (error) {
    console.error(`batch at ${i} failed: ${error.message}`);
    process.exit(1);
  }
  added += batch.length;
  console.log(`  ${added}/${rows.length}`);
}

const after = await allEmails("email_subscribers");
console.log(`\nDone. email_subscribers: ${subscribers.size} -> ${after.size}`);
