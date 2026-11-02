import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";
import { classify } from "@/lib/commentReplies/classify";
import { selectTemplate } from "@/lib/commentReplies/selectTemplate";
import { fingerprint, wordCount } from "@/lib/commentReplies/normalise";
import {
  bodiesUsedOnArticle,
  loadLibrary,
  logDecision,
  notePattern,
  recentlyUsedBodies,
} from "@/lib/commentReplies/store";

/**
 * Louis's replies to study comments, with no AI of any kind.
 *
 * This used to send every comment to gpt-4o-mini and post whatever came back.
 * Louis, 2026-11-02: "OpenAI is not used by anything but the Louis AI chat
 * bot." So the model is gone and a library of replies he has approved takes
 * its place, with deterministic rules choosing which one fits.
 *
 * WHAT THIS WILL AND WILL NOT DO, measured on all 571 real comments:
 *
 *   replied    7   1.2%   short reactions - "God is good", "Bible study", "Yes"
 *   review   113  19.8%   on Louis's list: prayer, testimony, questions, grief
 *   skipped  451  79.0%   nothing matched, so nothing is said
 *
 * The low number is the point, not a defect. People write paragraphs about
 * their own lives in these threads - 364 of the 571 run past 13 words - and
 * Louis answered each one differently; of his 64 hand-written replies, 62 are
 * unique. There is no library that can answer those honestly. His rule: "I
 * prefer an unanswered comment over an inappropriate automated response."
 *
 * The length ceiling per category is what enforces that. A comment that merely
 * contains "yes" or "thank you" but runs to forty words is a reflection, and
 * goes to review rather than getting "Amen." under it.
 *
 * AUTO_COMMENT_REPLIES:
 *   unset / anything else  nothing runs
 *   shadow                 decide and log, post nothing - start here
 *   on                     post the replies
 *
 * ?dryRun=1 shows what a run would do without writing anything at all.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How long a comment is left for the humans before Louis answers it. */
const MIN_AGE_MINUTES = 60;

/**
 * Newest first, then back through the history, and as many as it can manage
 * in one go (Louis, 2026-11-02: "we own the app... we dont need to trickle
 * what would block us?").
 *
 * He is right, and the old per-run caps were me being careful about nothing.
 * There is no model, so no cost per comment; these are our own tables, so no
 * platform rate limit; and the backtest says only about 1% of comments get a
 * reply at all - 6 of 571. "All of them at once" is six replies. The caution
 * was protecting against a flood that cannot happen.
 *
 * The one limit left is the query's own 600-row page, which is well past the
 * whole history.
 */
const EXAMINE_PER_RUN = 600;

/** Nothing to say to "👍". */
const MIN_COMMENT_CHARS = 2;

type CommentRow = {
  id: string;
  article_slug: string;
  user_id: string | null;
  user_name: string | null;
  content: string;
  created_at: string;
};

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

/**
 * Comments this job has already ruled on. The parent_id check above catches
 * anything that got a reply; this catches the ones it decided to skip or send
 * to review, so a skipped comment is not re-examined and re-logged every
 * fifteen minutes for the rest of its life.
 */
async function fetchDecided(admin: SupabaseClient) {
  const decided = new Set<string>();
  const { data } = await admin.from("comment_reply_log").select("comment_id").limit(20000);
  for (const row of data || []) if (row.comment_id) decided.add(row.comment_id as string);
  return decided;
}

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const mode = (process.env.AUTO_COMMENT_REPLIES || "").toLowerCase();
  if (mode !== "on" && mode !== "shadow") {
    return NextResponse.json({ ok: true, skipped: "AUTO_COMMENT_REPLIES is not on or shadow" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
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

  const [answered, decided, library] = await Promise.all([
    fetchAnswered(admin, louisUserId),
    fetchDecided(admin),
    loadLibrary(admin),
  ]);

  const open = (candidates || []).filter(
    (c): c is CommentRow =>
      Boolean(c.user_id) &&
      !answered.has(c.id) &&
      !decided.has(c.id) &&
      String(c.content || "").trim().length >= MIN_COMMENT_CHARS,
  );

  // `open` is already newest first - the query orders by created_at desc and
  // the filters below it preserve that - so taking the head of it is "start
  // with the newest and work back" without any extra sorting.
  const batch = open.slice(0, EXAMINE_PER_RUN);

  const recent = await recentlyUsedBodies(admin, louisUserId);
  const counts = { replied: 0, review: 0, skipped: 0 };
  const preview: Array<Record<string, unknown>> = [];
  const failures: string[] = [];

  for (const comment of batch) {
    const decision = classify(comment.content, library.categories, library.rules);
    const fp = fingerprint(comment.content);
    const words = wordCount(comment.content);

    if (decision.action !== "replied") {
      counts[decision.action] += 1;
      if (!dryRun) {
        await logDecision(admin, {
          commentId: comment.id,
          articleSlug: comment.article_slug,
          fingerprint: fp,
          wordCount: words,
          categorySlug: decision.categorySlug,
          ruleId: decision.ruleId,
          confidence: decision.confidence,
          templateId: null,
          action: decision.action,
          reason: decision.reason,
        });
        if (decision.reason === "no rule matched") await notePattern(admin, fp, comment.content, words);
      }
      preview.push({ action: decision.action, category: decision.categorySlug, reason: decision.reason, comment: comment.content.slice(0, 90) });
      continue;
    }

    const usedHere = await bodiesUsedOnArticle(admin, comment.article_slug, louisUserId);
    const template = selectTemplate(
      library.templates.filter((t) => t.categorySlug === decision.categorySlug),
      { usedOnArticle: usedHere, recentlyUsed: recent },
    );

    if (!template) {
      // A category with nothing approved in it is a skip, never a guess.
      counts.skipped += 1;
      if (!dryRun) {
        await logDecision(admin, {
          commentId: comment.id,
          articleSlug: comment.article_slug,
          fingerprint: fp,
          wordCount: words,
          categorySlug: decision.categorySlug,
          ruleId: decision.ruleId,
          confidence: decision.confidence,
          templateId: null,
          action: "skipped",
          reason: `no approved template in ${decision.categorySlug}`,
        });
      }
      continue;
    }

    preview.push({ action: "replied", category: decision.categorySlug, comment: comment.content.slice(0, 90), reply: template.body });

    if (dryRun) {
      counts.replied += 1;
      continue;
    }

    if (mode === "shadow") {
      counts.replied += 1;
      await logDecision(admin, {
        commentId: comment.id,
        articleSlug: comment.article_slug,
        fingerprint: fp,
        wordCount: words,
        categorySlug: decision.categorySlug,
        ruleId: decision.ruleId,
        confidence: decision.confidence,
        templateId: template.id,
        action: "shadow",
        reason: `${decision.reason} -> "${template.body}"`,
      });
      continue;
    }

    const { error: insertError } = await admin.from("article_comments").insert({
      article_slug: comment.article_slug,
      user_id: louisUserId,
      user_name: louisName,
      content: template.body,
      parent_id: comment.id,
      is_auto: true,
    });
    if (insertError) {
      failures.push(`${comment.id}: ${insertError.message}`);
      continue;
    }

    counts.replied += 1;
    recent.unshift(template.body);
    await logDecision(admin, {
      commentId: comment.id,
      articleSlug: comment.article_slug,
      fingerprint: fp,
      wordCount: words,
      categorySlug: decision.categorySlug,
      ruleId: decision.ruleId,
      confidence: decision.confidence,
      templateId: template.id,
      action: "replied",
      reason: decision.reason,
    });
    // times_used is only meaningful for database templates; a seed fallback has
    // no row to bump, and failing to bump it must not fail the run.
    try {
      await admin
        .from("comment_reply_templates")
        .update({ times_used: template.timesUsed + 1, last_used_at: new Date().toISOString() })
        .eq("id", template.id);
    } catch {
      /* seed template, or the table is not there yet */
    }
  }

  return NextResponse.json({
    ok: true,
    mode: dryRun ? "dryRun" : mode,
    library: library.source,
    openTotal: open.length,
    examined: batch.length,
    ...counts,
    aiCalls: 0,
    failures: failures.slice(0, 5),
    preview: preview.slice(0, 10),
  });
}
