import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";

/**
 * Louis replies to study comments by himself now (Louis, 2026-10-17).
 *
 * There was already an Auto Reply button on every comment: it drafted a reply
 * with gpt-4o-mini and dropped it in the box for Louis to send. He asked for
 * the pressing to stop - "instead of me pressing auto comment it does it
 * automatically" - so this runs it on a schedule instead. Same model, same
 * prompt, same account; the only thing that changed is who starts it.
 *
 * An hour's delay is deliberate. Replying the second somebody posts reads as
 * a bot and, worse, it lands before anybody else in the study has had a
 * chance to answer - which is the opposite of what the thread is for.
 *
 * Only top-level comments. A reply to a reply would have to hang off the same
 * parent, and then neither this job nor a reader could tell which of the two
 * it was answering.
 *
 * The backlog (514 unanswered comments going back to February when this was
 * written) is drained a handful per run rather than all at once. Nobody wants
 * eleven notifications in a minute, and a wall of replies arriving together
 * looks like exactly the machine this is trying not to look like.
 *
 * Switch it off with AUTO_COMMENT_REPLIES=off in Vercel; ?dryRun=1 shows what
 * a run would do without writing anything.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How long a comment is left for the humans before Louis answers it. */
const MIN_AGE_MINUTES = 60;
/** Newer than this counts as "fresh" and is answered first. */
const FRESH_WINDOW_DAYS = 7;
const MAX_FRESH_PER_RUN = 6;
const MAX_BACKLOG_PER_RUN = 4;
/** Nothing to say to "👍". */
const MIN_COMMENT_CHARS = 12;

type CommentRow = {
  id: string;
  article_slug: string;
  user_id: string | null;
  user_name: string | null;
  content: string;
  created_at: string;
};

function clip(text: string, max = 700) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > max ? `${normalized.slice(0, max).trim()}...` : normalized;
}

/**
 * "bible-chapter-proverbs-17" -> "Proverbs 17", so the model knows what the
 * person was reading. The slug is all the context there is: comments hang off
 * a chapter, not off a devotional day.
 */
function readableSlug(slug: string) {
  return slug
    .replace(/^bible-chapter-/, "")
    .replace(/^bible-in-one-year-day-(\d+)-/, "Bible in One Year day $1: ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

async function writeReply(openai: OpenAI, comment: CommentRow) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        // Word for word the prompt behind the Auto Reply button, so the
        // replies that arrive on their own read like the ones Louis sent.
        content:
          "You write short, natural reply drafts for a Bible study group host. " +
          "Reply directly to the person's comment while matching the topic of the original post. " +
          "Keep it warm, specific, thoughtful, and human. " +
          "Use 1 to 3 short sentences. " +
          "Do not start with the person's name. Avoid using their name unless it is truly needed for clarity. " +
          "Do not mention AI. Do not use hashtags. Do not use emojis unless absolutely necessary. " +
          "Do not sound robotic, preachy, or overly formal. " +
          "Return only the reply text.",
      },
      {
        role: "user",
        content:
          `Original post title: ${readableSlug(comment.article_slug)}\n\n` +
          `Original post content:\nA Bible Buddy study of ${readableSlug(comment.article_slug)}.\n\n` +
          `Comment from ${comment.user_name || "a Bible Buddy"}:\n${clip(comment.content)}\n\n` +
          "Write a reply draft I can post back to that person.",
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}

/** Comments Louis has already answered, by the id of the comment answered. */
async function fetchAnswered(admin: SupabaseClient, louisUserId: string) {
  const answered = new Set<string>();
  const { data } = await admin
    .from("article_comments")
    .select("parent_id")
    .eq("user_id", louisUserId)
    .not("parent_id", "is", null)
    .limit(5000);
  for (const row of data || []) if (row.parent_id) answered.add(row.parent_id as string);
  return answered;
}

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if ((process.env.AUTO_COMMENT_REPLIES || "").toLowerCase() === "off") {
    return NextResponse.json({ ok: true, skipped: "AUTO_COMMENT_REPLIES=off" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!url || !serviceKey || !openAiKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const louisUserId = await resolveLouisUserId(admin);
  if (!louisUserId) return NextResponse.json({ error: "No Louis account." }, { status: 500 });

  const { data: louisProfile } = await admin
    .from("profile_stats")
    .select("display_name")
    .eq("user_id", louisUserId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || "Louis Moore";

  const cutoff = new Date(Date.now() - MIN_AGE_MINUTES * 60_000).toISOString();
  const { data: candidates, error } = await admin
    .from("article_comments")
    .select("id, article_slug, user_id, user_name, content, created_at")
    .eq("is_deleted", false)
    .is("parent_id", null)
    .neq("user_id", louisUserId)
    .lte("created_at", cutoff)
    .order("created_at", { ascending: false })
    .limit(600);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const answered = await fetchAnswered(admin, louisUserId);
  const open = (candidates || []).filter(
    (c): c is CommentRow =>
      Boolean(c.user_id) && !answered.has(c.id) && String(c.content || "").trim().length >= MIN_COMMENT_CHARS,
  );

  const freshFrom = Date.now() - FRESH_WINDOW_DAYS * 24 * 3600_000;
  const fresh = open.filter((c) => new Date(c.created_at).getTime() >= freshFrom).slice(0, MAX_FRESH_PER_RUN);
  // Newest of the old first: a comment from last month is likelier to be read
  // again than one from February.
  const backlog = open
    .filter((c) => new Date(c.created_at).getTime() < freshFrom)
    .slice(0, MAX_BACKLOG_PER_RUN);
  const batch = [...fresh, ...backlog];

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      openTotal: open.length,
      wouldReply: batch.length,
      fresh: fresh.length,
      backlog: backlog.length,
      sample: batch.slice(0, 5).map((c) => ({
        slug: c.article_slug,
        from: c.user_name,
        age_days: Math.round((Date.now() - new Date(c.created_at).getTime()) / 86_400_000),
        comment: clip(c.content, 90),
      })),
    });
  }

  const openai = new OpenAI({ apiKey: openAiKey });
  let posted = 0;
  const failures: string[] = [];

  for (const comment of batch) {
    try {
      const reply = await writeReply(openai, comment);
      if (!reply) {
        failures.push(`${comment.id}: empty reply`);
        continue;
      }
      // parent_id is the claim on this comment as well as the thread it joins:
      // the next run sees it through fetchAnswered and leaves this one alone.
      const { error: insertError } = await admin.from("article_comments").insert({
        article_slug: comment.article_slug,
        user_id: louisUserId,
        user_name: louisName,
        content: reply,
        parent_id: comment.id,
        // So /comments-admin can show Louis which replies went out on their
        // own and which he typed - his idea, 2026-10-17.
        is_auto: true,
      });
      if (insertError) {
        failures.push(`${comment.id}: ${insertError.message}`);
        continue;
      }
      posted += 1;
    } catch (replyError) {
      failures.push(`${comment.id}: ${replyError instanceof Error ? replyError.message : "failed"}`);
    }
  }

  return NextResponse.json({
    ok: true,
    posted,
    openTotal: open.length,
    remaining: Math.max(0, open.length - posted),
    failures: failures.slice(0, 5),
  });
}
