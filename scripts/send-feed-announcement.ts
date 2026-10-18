/**
 * The one-off DM telling active members the feed is live.
 *
 * Louis, 2026-10-18. The problem it exists for, measured the day before: in
 * thirty days he started 107 threads in the community and everybody else
 * started one. Nineteen other people posted 65 times and every one of those
 * was a reply to him. People are here; nothing starts without him, and most
 * of them do not know the feed changed.
 *
 * A DM rather than an email or a push: every recorded email open on this list
 * is a proxy fetch, push is unreliable on this app, and people already reply
 * to his welcome DM - one of them asked, on the day this was written, "is
 * there a chat among the other believers too?".
 *
 * It writes through the same tables as app/api/send-welcome-dm - one
 * conversation per pair, a message from Louis, a direct_message notification
 * - rather than inventing a second way to send a DM.
 *
 *   npx tsx scripts/send-feed-announcement.ts --dry-run
 *   npx tsx scripts/send-feed-announcement.ts --limit=200
 *
 * Resumable by construction: it skips anybody whose conversation with Louis
 * already contains this message, so a run that dies halfway finishes on the
 * next one and nobody is messaged twice.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1).trim()]),
);

const db = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL as string,
  env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { persistSession: false } },
);

const LOUIS_ID = "669d4404-5eee-49ee-a112-2ecbd573e22a";

/** Active means they did something in the app in this window. */
const ACTIVE_DAYS = 30;

/**
 * The line that marks this campaign in a thread.
 *
 * Dedupe is done by looking for it rather than by a sent-table, because
 * there is no schema change to make and the message itself is the record:
 * if it is in the thread, they got it.
 */
const MARKER = "no matter how hard I try to keep my algorithm clean";

function messageFor(firstName: string | null) {
  // No name on record means no name in the greeting. Two thirds of this
  // list signed up with an email handle and nothing else, and "Hey friend"
  // to 737 people is the mail-merge smell this message cannot afford.
  return `Hey${firstName ? ` ${firstName}` : ""} 👋

Something that always bothered me about social media: no matter how hard I try to keep my algorithm clean, things still show up that I never wanted to see.

So I built us our own. It's the **Feed** 📱 — in the menu at the bottom of the app.

It has three tabs:

🌎 **Community** — everybody in Bible Buddy. What people are studying, what they finished, questions, photos. This is the main wall.

🤝 **Buddies** — only the people you've added. Your own circle.

👤 **My Feed** — your page. Everything you post lives here, so people can see what you've been studying.

👇🏾 **Why I'm messaging you**

You're one of the most active people in Bible Buddy, and a feed only comes alive when the people who actually show up start posting in it.

✍🏾 This week, post one thing — your study, your notes, you at church. Anything.

❤️ Then read somebody else's and encourage them.

The more we post, the better it gets at putting the right things in front of everybody.

[Open the Feed](/bb-feed)

I read all of it, and I'll reply.

— Louis`;
}

/**
 * "Louis Moore III" -> "Louis", "SILVIA" -> "Silvia", a handle or nothing
 * -> null.
 *
 * All-caps is title-cased, because the dry run greeted somebody as SILVIA
 * and a message that shouts your own name back at you is not from a person.
 */
function firstNameOf(source: string | null | undefined): string | null {
  const text = (source || "").trim();
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean);

  // "Rev. Dr. Immanuel" should not be greeted as "Rev." - step past a title.
  const titles = new Set(["mr", "mrs", "ms", "miss", "dr", "rev", "pastor", "ps", "bro", "sis", "sr", "st"]);
  const first = words.find((word) => !titles.has(word.replace(/\./g, "").toLowerCase())) || "";

  if (!first || first.length > 20 || !/\p{L}/u.test(first)) return null;

  /**
   * A handle is not a name.
   *
   * Email signup fills first_name from the local part of the address, so
   * "crystalgood1977" and "sam.ade.ralph25" arrive looking like names.
   * Digits, @ and dots give them away.
   */
  if (/[\d@_]/.test(first) || first.includes(".")) return null;

  if (first === first.toUpperCase()) {
    return first.charAt(0) + first.slice(1).toLowerCase();
  }
  return first;
}

/**
 * Every user's first name, from wherever one exists.
 *
 * profile_stats.display_name is empty for most of this list - anonymous
 * accounts never collected one - so auth metadata is the second look:
 * Google and Apple sign-in put a real full name there. It is worth the
 * seven pages it costs for only 31 more names, because those 31 are real
 * people with real names, and the alternative is greeting them as nobody.
 */
async function namesFromAuth(): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  for (let page = 1; page < 50; page += 1) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`auth lookup failed: ${error.message}`);
    for (const user of data.users) {
      const meta = (user.user_metadata || {}) as Record<string, string | undefined>;
      const name =
        firstNameOf(meta.firstName) ||
        firstNameOf(meta.first_name) ||
        firstNameOf(meta.full_name) ||
        firstNameOf(meta.name) ||
        firstNameOf(meta.display_name);
      if (name) names.set(user.id, name);
    }
    if (data.users.length < 1000) break;
  }
  return names;
}

function previewOf(message: string) {
  const firstLine = message.split("\n").find((line) => line.trim()) || "";
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}...` : firstLine;
}

async function activeUserIds(): Promise<string[]> {
  const since = new Date(Date.now() - ACTIVE_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const ids = new Set<string>();

  // master_actions is the honest record of doing something in the app -
  // reading a chapter, finishing a day, playing a game - rather than merely
  // opening it.
  for (let from = 0; from < 200_000; from += 1000) {
    const { data, error } = await db
      .from("master_actions")
      .select("user_id")
      .gte("created_at", since)
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    for (const row of data) if (row.user_id) ids.add(row.user_id as string);
    if (data.length < 1000) break;
  }

  ids.delete(LOUIS_ID);
  return [...ids];
}

async function alreadySent(conversationId: string): Promise<boolean> {
  const { data } = await db
    .from("messages")
    .select("id")
    .eq("conversation_id", conversationId)
    .eq("sender_id", LOUIS_ID)
    .ilike("content", `%${MARKER}%`)
    .limit(1);
  return Boolean(data && data.length);
}

async function sendTo(userId: string, firstName: string | null): Promise<"sent" | "skipped" | "failed"> {
  const [uid1, uid2] = LOUIS_ID < userId ? [LOUIS_ID, userId] : [userId, LOUIS_ID];

  const { data: existing } = await db
    .from("conversations")
    .select("id")
    .eq("user_id_1", uid1)
    .eq("user_id_2", uid2)
    .maybeSingle();

  let conversationId = existing?.id as string | undefined;

  if (conversationId && (await alreadySent(conversationId))) return "skipped";

  if (!conversationId) {
    const { data: created, error } = await db
      .from("conversations")
      .insert({ user_id_1: uid1, user_id_2: uid2 })
      .select("id")
      .single();
    if (error || !created) return "failed";
    conversationId = created.id as string;
  }

  const content = messageFor(firstName);
  const now = new Date().toISOString();

  const { error: messageError } = await db.from("messages").insert({
    conversation_id: conversationId,
    sender_id: LOUIS_ID,
    content,
    created_at: now,
  });
  if (messageError) return "failed";

  const preview = previewOf(content);
  await db
    .from("conversations")
    .update({ last_message_at: now, last_message_preview: preview })
    .eq("id", conversationId);

  await db.from("notifications").insert({
    user_id: userId,
    type: "direct_message",
    from_user_id: LOUIS_ID,
    from_user_name: "Louis Moore",
    article_slug: `/messages/${conversationId}`,
    message: preview,
    is_read: false,
  });

  return "sent";
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitArg = args.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : Number.POSITIVE_INFINITY;

  const ids = await activeUserIds();
  console.log(`active in the last ${ACTIVE_DAYS} days: ${ids.length}`);

  const profiles: Array<{ user_id: string; display_name: string | null; username: string | null }> = [];
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db
      .from("profile_stats")
      .select("user_id, display_name, username")
      .in("user_id", ids.slice(i, i + 200));
    // Checked, because this failing quietly is what made the first dry run
    // claim 252 people out of 1,253: at 500 ids the URL is long enough that
    // the request dies, and an unread error just looks like a short list.
    if (error) throw new Error(`profile lookup failed: ${error.message}`);
    profiles.push(...((data || []) as typeof profiles));
  }

  const authNames = await namesFromAuth();
  const nameFor = (profile: { user_id: string; display_name: string | null }) =>
    firstNameOf(profile.display_name) || authNames.get(profile.user_id) || null;

  if (dryRun) {
    console.log(`profiles found: ${profiles.length}`);
    const named = profiles.filter((p) => nameFor(p)).length;
    console.log(`greeted by name: ${named} | greeted as "Hey 👋": ${profiles.length - named}`);
    console.log("\nsample greetings:");
    for (const p of profiles.filter((x) => nameFor(x)).slice(0, 3)) {
      console.log(`  Hey ${nameFor(p)} 👋`);
    }
    console.log("\n--- the message as it will arrive ---\n");
    console.log(messageFor(null));
    return;
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const profile of profiles) {
    if (sent >= limit) break;
    const result = await sendTo(profile.user_id, nameFor(profile));
    if (result === "sent") sent += 1;
    else if (result === "skipped") skipped += 1;
    else failed += 1;
    if ((sent + skipped + failed) % 50 === 0) {
      console.log(`  ...${sent} sent, ${skipped} already had it, ${failed} failed`);
    }
  }

  console.log(`\nsent ${sent}, skipped ${skipped} who already had it, ${failed} failed`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
