import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  countActionsToday,
  gatherCandidates,
  generateModeratorComment,
  likePostAsModerator,
  loadModeratorSettings,
  pickModerator,
  postModeratorComment,
  resolveOfficialGroupId,
} from "@/lib/moderatorEngagement";

// The moderator engagement heartbeat. Runs hourly in the cloud (Vercel
// cron, no laptop needed). Each run: scores recent community activity,
// auto-likes a couple of the highest-priority posts under per-moderator
// daily caps, and posts at most one persona comment automatically - Louis
// reviews AFTER the fact at /moderator-admin, where he can edit, delete,
// rate, or pause any moderator. A comment only lands in the queue when
// generation failed and there is no text to post. Roughly a third of runs
// deliberately do nothing so activity never looks metronomic.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function hashString(value: string) {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const dryRun = Boolean(request.nextUrl.searchParams.get("dryRun"));
  const force = Boolean(request.nextUrl.searchParams.get("force"));

  try {
    const settings = await loadModeratorSettings(supabase);
    const global = settings.get("global");
    if (global && global.enabled === false) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Automation paused (global)." });
    }

    // Natural distribution: skip ~1 in 3 runs entirely.
    const hourKey = new Date().toISOString().slice(0, 13);
    if (!force && !dryRun && hashString(hourKey) % 3 === 0) {
      return NextResponse.json({ ok: true, skipped: true, reason: "Quiet hour (natural distribution)." });
    }

    const groupId = await resolveOfficialGroupId(supabase);
    const candidates = await gatherCandidates(supabase, groupId);

    const liked: Array<{ moderator: string; postId: string; priority: number }> = [];
    const queued: Array<{ moderator: string; postId: string; priority: number; status: string }> = [];
    const considered = candidates.slice(0, 20).map((candidate) => ({
      postId: candidate.postId,
      priority: candidate.priority,
      reason: candidate.reason,
      title: candidate.title,
      ageMinutes: candidate.ageMinutes,
      replyCount: candidate.replyCount,
      moderatorReplied: candidate.moderatorReplied,
      realUserReplied: candidate.realUserReplied,
    }));

    if (dryRun) {
      return NextResponse.json({ ok: true, dryRun: true, groupId, considered });
    }

    // --- LIKES (auto, capped) -------------------------------------------
    let likesThisRun = 0;
    for (const candidate of candidates) {
      if (likesThisRun >= 2) break;
      if (candidate.priority > 6 && hashString(candidate.postId) % 2 === 0) continue;
      const moderator = pickModerator(candidate);
      if (candidate.likedByModerator.has(moderator.userId)) continue;
      const modSettings = settings.get(moderator.key);
      if (!modSettings?.enabled) continue;
      if ((await countActionsToday(supabase, moderator.key, "like")) >= (modSettings.max_likes_per_day ?? 10)) continue;
      const wasNew = await likePostAsModerator(supabase, moderator, candidate.postId);
      if (!wasNew) continue;
      await supabase.from("moderator_actions").insert({
        moderator_key: moderator.key,
        moderator_user_id: moderator.userId,
        action_type: "like_post",
        target_post_id: candidate.postId,
        target_user_id: candidate.authorUserId,
        target_preview: (candidate.title || candidate.content).slice(0, 160),
        status: "posted",
        reason: candidate.reason,
        priority: candidate.priority,
        posted_at: new Date().toISOString(),
      });
      liked.push({ moderator: moderator.key, postId: candidate.postId, priority: candidate.priority });
      likesThisRun += 1;
    }

    // --- ONE COMMENT DRAFT PER RUN --------------------------------------
    const commentCandidate = candidates.find(
      (candidate) =>
        candidate.priority <= 5 &&
        !candidate.moderatorReplied &&
        !candidate.realUserReplied &&
        candidate.ageMinutes >= 20,
    );
    if (commentCandidate) {
      const moderator = pickModerator(commentCandidate);
      const modSettings = settings.get(moderator.key);
      const commentsToday = await countActionsToday(supabase, moderator.key, "comment");
      if (
        modSettings?.enabled &&
        commentCandidate.ageMinutes >= (modSettings.min_delay_minutes ?? 25) &&
        commentsToday < (modSettings.max_comments_per_day ?? 3)
      ) {
        const generation = await generateModeratorComment(
          moderator,
          commentCandidate,
          modSettings.personality,
          modSettings.prohibited_topics,
        );
        // Comments post automatically (Louis reviews after the fact from
        // the dashboard - edit or delete there). A draft only lands in the
        // queue when generation failed and there is no text to post.
        const autoPost = Boolean(modSettings.auto_comments) && Boolean(generation.text);
        let status = "queued";
        let resultPostId: string | null = null;
        let postedAt: string | null = null;
        if (autoPost && generation.text) {
          resultPostId = await postModeratorComment(
            supabase,
            moderator,
            groupId,
            commentCandidate.postId,
            commentCandidate.category,
            generation.text,
          );
          status = "posted";
          postedAt = new Date().toISOString();
        }
        await supabase.from("moderator_actions").insert({
          moderator_key: moderator.key,
          moderator_user_id: moderator.userId,
          action_type: "comment",
          target_post_id: commentCandidate.postId,
          target_user_id: commentCandidate.authorUserId,
          target_preview: (commentCandidate.title || commentCandidate.content).slice(0, 160),
          generated_text: generation.text,
          final_text: autoPost ? generation.text : null,
          status,
          reason: generation.error
            ? `${commentCandidate.reason} (draft failed: ${generation.error} - write or retry from the dashboard)`
            : commentCandidate.reason,
          priority: commentCandidate.priority,
          result_post_id: resultPostId,
          posted_at: postedAt,
        });
        queued.push({ moderator: moderator.key, postId: commentCandidate.postId, priority: commentCandidate.priority, status });
      }
    }

    return NextResponse.json({ ok: true, groupId, liked, queued, consideredCount: candidates.length });
  } catch (error) {
    console.error("[MOD_ENGAGEMENT] Failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Engagement run failed." },
      { status: 500 },
    );
  }
}
