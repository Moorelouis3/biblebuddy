#!/usr/bin/env node
/**
 * Points a study at its printed edition on Amazon.
 *
 *   node --env-file=.env.local scripts/link-printed-edition.mjs "Higher Hope" B0XXXXXXXX
 *   node --env-file=.env.local scripts/link-printed-edition.mjs --list
 *
 * `devotionals.paperback_url` is what makes components/devotionals/PaperbackStrip
 * render on the study page and on every day page. It is null until the book is
 * Live on Amazon, because the ASIN does not exist until then: KDP takes up to
 * 72 hours to review, and nothing about the book is addressable before it does.
 *
 * So this is the last step of publishing a study's book, run the day the Live
 * email arrives rather than the day the book is submitted. It is a script
 * rather than a SQL snippet because the URL has a shape (/dp/<ASIN>) and
 * getting it wrong puts a dead link on a live page.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error("Missing Supabase credentials. Run with: node --env-file=.env.local");
  process.exit(1);
}
const db = createClient(url, key);

const [, , titleArg, asinArg] = process.argv;

if (titleArg === "--list" || !titleArg) {
  const { data, error } = await db
    .from("devotionals")
    .select("title, paperback_url, is_published")
    .eq("is_published", true)
    .order("title");
  if (error) throw new Error(error.message);
  for (const d of data) {
    console.log(`${d.paperback_url ? "linked  " : "NO LINK "} ${d.title}${d.paperback_url ? "  " + d.paperback_url : ""}`);
  }
  if (!titleArg) console.log(`\nusage: link-printed-edition.mjs "<study title>" <ASIN>`);
  process.exit(0);
}

if (!/^B0[A-Z0-9]{8}$/.test(asinArg || "")) {
  console.error(`"${asinArg}" does not look like an Amazon ASIN (B0 followed by 8 characters).`);
  process.exit(1);
}

const { data: rows, error: findError } = await db.from("devotionals").select("id, title, paperback_url").eq("title", titleArg);
if (findError) throw new Error(findError.message);
if (!rows.length) {
  console.error(`No study called "${titleArg}". Run with --list to see the titles.`);
  process.exit(1);
}
if (rows.length > 1) {
  console.error(`${rows.length} studies are called "${titleArg}". Fix the duplicate before linking.`);
  process.exit(1);
}

const target = `https://www.amazon.com/dp/${asinArg}`;
// Check the page actually exists before putting it in front of readers.
const res = await fetch(target, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (BibleBuddy link check)" } });
if (!res.ok) {
  console.error(`${target} returned ${res.status}. Not linking a page that does not load.`);
  process.exit(1);
}

const { error: updateError } = await db.from("devotionals").update({ paperback_url: target }).eq("id", rows[0].id);
if (updateError) throw new Error(updateError.message);
console.log(`${rows[0].title}: ${rows[0].paperback_url || "(none)"} -> ${target}`);
process.exit(0);
