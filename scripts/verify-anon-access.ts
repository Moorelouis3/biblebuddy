/**
 * Asserts that no personal data can be read with the publishable key.
 *
 *   npm run verify:anon-access
 *
 * On 9 November 2026 six relations handed their rows to anyone holding the
 * publishable key, which ships inside the website's JavaScript: every signup
 * email address, every group membership, and the text of people's own study
 * notes with their names beside them. Four of them were also writable, because
 * three tables had row level security switched off and one view was an
 * auto-updatable window past the policies on the table underneath.
 * `scripts/close-anon-access-2026-11-09.sql` closed all six.
 *
 * This script is the guard against it coming back. It signs in as nobody, asks
 * each relation for one row, and fails if a row comes back. It never prints a
 * value — only the relation name and how many rows it got — so it is safe to
 * run anywhere and safe to keep in a public repository.
 *
 * Needs the network, like verify:deletion-grace. Run it after any change to a
 * policy, to row level security, or to a view.
 */
import fs from "node:fs";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k: string) => (env.match(new RegExp("^" + k + "=(.*)$", "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");

const URL_ = get("NEXT_PUBLIC_SUPABASE_URL");
const ANON = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");
if (!URL_ || !ANON) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

/** Must return nothing to a caller who is not signed in. */
const MUST_BE_CLOSED = [
  "user_signups",            // every signup email address
  "study_group_members",     // view over group_members; was also writable
  "group_members",
  "weekly_bible_report_sent",
  "reading_sessions",
  "featured_bible_characters",
  "notes",                   // people's own study notes
  "notes_with_users",        // view over notes joined to auth.users
  "ses_campaign_stats",      // view: campaign sends, opens, clicks
  "profile_stats",
  "messages",
  "email_subscribers",
  "bug_reports",
  "completed_chapters",
];

/**
 * Published content the app serves to logged-out readers on purpose (the blog,
 * the chapter library, the landing pages). Listed so that a future reader can
 * see the difference was deliberate and not an oversight.
 */
const PUBLIC_ON_PURPOSE = [
  "bible_chapters",
  "bible_notes",
  "bible_people_notes",
  "devotionals",
  "devotional_days",
  "keywords_in_the_bible",
  "places_in_the_bible_notes",
  "verse_of_the_day_entries",
  "community_event_day_posts",
];

async function anonRows(table: string): Promise<{ status: number; rows: number }> {
  const r = await fetch(`${URL_}/rest/v1/${table}?select=*&limit=1`, { headers: { apikey: ANON! } });
  if (r.status !== 200 && r.status !== 206) return { status: r.status, rows: 0 };
  const body = await r.json();
  return { status: r.status, rows: Array.isArray(body) ? body.length : 0 };
}

async function main() {
  const failures: string[] = [];

  console.log("Reading with the publishable key, not signed in.\n");
  console.log("must return nothing:");
  for (const t of MUST_BE_CLOSED) {
    const { status, rows } = await anonRows(t);
    const open = rows > 0;
    if (open) failures.push(t);
    console.log(`  ${open ? "OPEN  " : "closed"}  ${t.padEnd(28)} http ${status}, ${rows} row(s)`);
  }

  console.log("\npublic on purpose (not asserted, listed for contrast):");
  for (const t of PUBLIC_ON_PURPOSE) {
    const { status, rows } = await anonRows(t);
    console.log(`  ${rows > 0 ? "public" : "empty "}  ${t.padEnd(28)} http ${status}, ${rows} row(s)`);
  }

  if (failures.length) {
    console.error(
      `\nFAIL: ${failures.length} relation(s) hand rows to anyone with the publishable key: ${failures.join(", ")}.` +
        `\nSee scripts/close-anon-access-2026-11-09.sql for what closed them last time.`,
    );
    process.exit(1);
  }
  console.log("\nOK: nothing personal is readable without signing in.");
}

main().catch((err) => {
  console.error("verify-anon-access could not run:", err);
  process.exit(1);
});
