/**
 * One-off announcement post for a community event (2026-09-23, Louis).
 *
 * WHY THIS EXISTS: the 31 daily Proverbs posts only start on October 1, and
 * nothing has ever run through that pipeline for real - only dry runs. This
 * posts a hand-written announcement as Louis in the Bible Buddy group through
 * the SAME code path the daily posts use (same author resolution, same HTML
 * paragraph format, same in-app link button, same notification fan-out), so a
 * genuinely useful "one week to go" post doubles as the rehearsal.
 *
 * The text is NOT generated here. Write it in a markdown file and pass it in.
 *
 *   FILE FORMAT
 *   -----------
 *   # The title of the post
 *
 *   First paragraph.
 *
 *   Second paragraph. Blank lines separate paragraphs, exactly like typing
 *   in the app. A line that is only **bold** stays bold.
 *
 *   USAGE
 *   -----
 *   Dry run (default - writes nothing, prints the post and the audience):
 *     npx tsx scripts/post-community-event-announcement.ts --file=drafts/one-week-to-go.md
 *
 *   Send it for real:
 *     ... --file=drafts/one-week-to-go.md --send --audience=group
 *
 *   --audience=group    (default) a normal Louis post: the group broadcast
 *                       trigger notifies the whole Bible Buddy group. Use this
 *                       for recruiting - it reaches people who have not joined.
 *   --audience=members  notifies only people signed up for the event (and with
 *                       --reminders-only, only those with reminders on). This
 *                       is the exact path the October daily posts take.
 *   --link=/events/wisdom-of-proverbs   in-app button under the post.
 *                       /devotionals, /events and /books paths render as a
 *                       real in-app button; anything else opens a browser.
 */

import "dotenv/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { insertGroupPostWithRetry } from "../lib/groupPostInsert";
import { resolveLouis, SITE_URL } from "../lib/communityEventDailyPost";
import { BIBLE_BUDDY_GROUP_ID } from "../lib/communityEventDays";

const POST_CATEGORY = "general";
const NOTIFICATION_TYPE = "group_post";
const NOTIFY_CHUNK = 100;
const PAGE_SIZE = 1000;

type Args = {
  file: string;
  send: boolean;
  audience: "group" | "members";
  remindersOnly: boolean;
  eventSlug: string;
  link: string | null;
  /** Notify an existing post instead of creating a new one. */
  postId: string | null;
  /** Only notify this many people this run (staged rollout / smoke test). */
  limit: number | null;
};

function parseArgs(argv: string[]): Args {
  const get = (name: string) => {
    const hit = argv.find((a) => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : null;
  };
  const file = get("file");
  if (!file) throw new Error("Pass the post text with --file=path/to/post.md");
  const audience = (get("audience") || "group") as Args["audience"];
  if (audience !== "group" && audience !== "members") throw new Error("--audience must be group or members");
  return {
    file,
    send: argv.includes("--send"),
    audience,
    remindersOnly: argv.includes("--reminders-only"),
    eventSlug: get("event") || "wisdom-of-proverbs",
    link: get("link"),
    postId: get("post-id"),
    limit: get("limit") ? Number(get("limit")) : null,
  };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** **bold** and [text](/path) survive; everything else is escaped. */
function inline(text: string) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/** Same shape as the daily posts: <p> per paragraph, empty <p> between them. */
function buildAnnouncement(raw: string) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let title = "";
  if (lines[0]?.startsWith("# ")) title = lines.shift()!.slice(2).trim();
  const paragraphs = lines
    .join("\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  if (!title) throw new Error('The file needs a title on the first line, like "# One week to go".');
  if (!paragraphs.length) throw new Error("The file has a title but no body paragraphs.");

  const html: string[] = [];
  paragraphs.forEach((block, index) => {
    if (index > 0) html.push("<p></p>");
    // A paragraph can be several lines that belong together (a list).
    block.split("\n").forEach((line) => html.push(`<p>${inline(line.trim())}</p>`));
  });
  const plain = [title, "", ...paragraphs.flatMap((p) => [p, ""])].join("\n").trim();
  return { title, content: html.join(""), plain };
}

/**
 * Everyone approved in the group, minus the author.
 *
 * 2026-09-23: the notify_group_broadcast_post trigger does this by itself on
 * insert, but it takes ~2 minutes to write all ~6,450 rows inside the insert's
 * own transaction - long enough that the client call can look like it failed
 * while the fan-out is still running. So the post is inserted with the trigger
 * skipped and the fan-out happens here instead: chunked, counted, and safe to
 * re-run (loadAlreadyNotified means nobody is notified twice).
 */
async function loadApprovedGroupMembers(supabase: SupabaseClient, groupId: string) {
  const userIds: string[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("group_members")
      .select("user_id")
      .eq("group_id", groupId)
      .eq("status", "approved")
      .order("user_id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`group_members: ${error.message}`);
    const rows = (data as Array<{ user_id: string }> | null) || [];
    rows.forEach((row) => userIds.push(row.user_id));
    if (rows.length < PAGE_SIZE) break;
  }
  return [...new Set(userIds)];
}

/** Who already has a notification for this post, so a re-run never doubles up. */
async function loadAlreadyNotified(supabase: SupabaseClient, postId: string) {
  const seen = new Set<string>();
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("notifications")
      .select("user_id")
      .eq("post_id", postId)
      .eq("type", NOTIFICATION_TYPE)
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`notifications: ${error.message}`);
    const rows = (data as Array<{ user_id: string }> | null) || [];
    rows.forEach((row) => seen.add(row.user_id));
    if (rows.length < PAGE_SIZE) break;
  }
  return seen;
}

async function loadEventMembers(supabase: SupabaseClient, eventSlug: string, remindersOnly: boolean) {
  const userIds: string[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    let query = supabase
      .from("community_event_members")
      .select("user_id")
      .eq("event_slug", eventSlug)
      .order("user_id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (remindersOnly) query = query.eq("reminders", true);
    const { data, error } = await query;
    if (error) throw new Error(`community_event_members: ${error.message}`);
    const rows = (data as Array<{ user_id: string }> | null) || [];
    rows.forEach((row) => userIds.push(row.user_id));
    if (rows.length < PAGE_SIZE) break;
  }
  return userIds;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing.");
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const raw = fs.readFileSync(path.resolve(args.file), "utf8");
  const post = buildAnnouncement(raw);
  const louis = await resolveLouis(supabase);
  const linkUrl = args.link ? (args.link.startsWith("http") ? args.link : `${SITE_URL}${args.link}`) : null;

  // group   -> everyone approved in the Bible Buddy group
  // members -> just the people signed up for the event
  const broadcast = args.audience === "group";
  const audience = broadcast
    ? await loadApprovedGroupMembers(supabase, BIBLE_BUDDY_GROUP_ID)
    : await loadEventMembers(supabase, args.eventSlug, args.remindersOnly);
  const groupRoute = `/study-groups/${BIBLE_BUDDY_GROUP_ID}/chat`;

  console.log("─".repeat(70));
  console.log(post.plain);
  console.log("─".repeat(70));
  console.log("Author:      ", louis.displayName, `(${louis.userId})`);
  console.log("Group:       ", BIBLE_BUDDY_GROUP_ID);
  console.log("Link button: ", linkUrl || "(none)");
  console.log(
    "Audience:    ",
    broadcast
      ? `${audience.length} approved group member(s) - EVERYONE in Bible Buddy`
      : `${audience.length} event member(s)${args.remindersOnly ? " with reminders on" : ""}`,
  );
  if (args.postId) console.log("Existing post:", args.postId, "(notifying only, no new post)");
  if (args.limit) console.log("Limit:        ", args.limit, "recipient(s) this run");

  if (process.argv.includes("--show-html")) {
    console.log("\nSTORED HTML:\n" + post.content);
  }

  if (!args.send) {
    console.log("\nDRY RUN - nothing was written. Re-run with --send to post it.");
    return;
  }

  let postId = args.postId;
  if (!postId) {
    postId = crypto.randomUUID();
    await insertGroupPostWithRetry(
      supabase,
      {
        id: postId,
        group_id: BIBLE_BUDDY_GROUP_ID,
        user_id: louis.userId,
        display_name: louis.displayName,
        title: post.title,
        category: POST_CATEGORY,
        content: post.content,
        link_url: linkUrl,
      },
      // Always ours to send: the insert-time trigger is unreliable from the
      // service role, and skipping it means nobody can be notified twice.
      { skipInsertNotifications: true },
    );
    console.log("\nPosted:", postId);
  }

  const already = await loadAlreadyNotified(supabase, postId);
  const pending = audience.filter((userId) => userId !== louis.userId && !already.has(userId));
  const batch = args.limit ? pending.slice(0, args.limit) : pending;
  const message = `${louis.displayName} posted in Bible Buddy Study Group`;
  let sent = 0;
  for (let i = 0; i < batch.length; i += NOTIFY_CHUNK) {
    const chunk = batch.slice(i, i + NOTIFY_CHUNK).map((userId) => ({
      user_id: userId,
      type: NOTIFICATION_TYPE,
      from_user_id: louis.userId,
      from_user_name: louis.displayName,
      article_slug: groupRoute,
      post_id: postId,
      comment_id: null,
      message,
      is_read: false,
    }));
    const { error } = await supabase.from("notifications").insert(chunk);
    if (error) throw new Error(`notifications insert: ${error.message}`);
    sent += chunk.length;
    if (sent % 1000 === 0) console.log("  notified", sent, "of", batch.length);
  }
  console.log("Notified:", sent, already.size ? `(${already.size} already had one)` : "");
  console.log(`Open it: ${SITE_URL}/study-groups/${BIBLE_BUDDY_GROUP_ID}/chat`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
