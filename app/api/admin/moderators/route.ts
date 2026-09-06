import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  MODERATORS,
  MODERATOR_USER_IDS,
  loadModeratorSettings,
  postModeratorComment,
  resolveOfficialGroupId,
} from "@/lib/moderatorEngagement";

// Louis's control panel API for the moderator engagement system.
// GET: settings + review queue + recent action log with outcome metrics
// (did the author reply after the moderator engaged, how many other real
// users joined). POST: approve (optionally edited) / reject / rate / flag
// queue items, delete a posted moderator comment, and update per-moderator
// settings including the global pause.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

async function requireLouis(request: NextRequest): Promise<{ supabase: SupabaseClient } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const supabaseAuth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error } = await supabaseAuth.auth.getUser(token);
  if (error || (userData.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return {
    supabase: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }),
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { supabase } = auth;

  try {
    const settings = await loadModeratorSettings(supabase);
    const { data: actions, error: actionsError } = await supabase
      .from("moderator_actions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(120);
    if (actionsError) throw new Error(actionsError.message);

    // Outcome metrics for posted comments: did the author come back, and
    // how many other real members joined after the moderator engaged.
    const postedComments = (actions || []).filter(
      (action) => action.action_type === "comment" && action.status === "posted" && action.target_post_id && action.posted_at,
    );
    const outcomes: Record<string, { authorReplied: boolean; newParticipants: number }> = {};
    if (postedComments.length) {
      const postIds = Array.from(new Set(postedComments.map((action) => action.target_post_id)));
      const { data: replies } = await supabase
        .from("group_posts")
        .select("parent_post_id, user_id, created_at")
        .in("parent_post_id", postIds)
        .limit(2000);
      for (const action of postedComments) {
        const after = (replies || []).filter(
          (reply) =>
            reply.parent_post_id === action.target_post_id &&
            reply.created_at > action.posted_at &&
            !MODERATOR_USER_IDS.includes(reply.user_id),
        );
        outcomes[action.id] = {
          authorReplied: after.some((reply) => reply.user_id === action.target_user_id),
          newParticipants: new Set(after.filter((reply) => reply.user_id !== action.target_user_id).map((reply) => reply.user_id)).size,
        };
      }
    }

    return NextResponse.json({
      moderators: MODERATORS.map((mod) => ({ key: mod.key, displayName: mod.displayName, userId: mod.userId })),
      settings: Object.fromEntries(settings.entries()),
      queue: (actions || []).filter((action) => action.status === "queued"),
      log: (actions || []).filter((action) => action.status !== "queued"),
      outcomes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load moderator data." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { supabase } = auth;
  const body = await request.json().catch(() => null);
  const op = typeof body?.op === "string" ? body.op : "";

  try {
    if (op === "approve") {
      const actionId = String(body.actionId || "");
      const editedText = typeof body.text === "string" ? body.text.trim() : "";
      const { data: action, error } = await supabase
        .from("moderator_actions")
        .select("*")
        .eq("id", actionId)
        .eq("status", "queued")
        .maybeSingle();
      if (error || !action) return NextResponse.json({ error: "Queue item not found." }, { status: 404 });
      const finalText = editedText || (action.generated_text || "").trim();
      if (!finalText) return NextResponse.json({ error: "No comment text - edit it first." }, { status: 400 });
      const moderator = MODERATORS.find((mod) => mod.key === action.moderator_key);
      if (!moderator) return NextResponse.json({ error: "Unknown moderator." }, { status: 400 });
      const groupId = await resolveOfficialGroupId(supabase);
      const { data: targetPost } = await supabase
        .from("group_posts")
        .select("id, category")
        .eq("id", action.target_post_id)
        .maybeSingle();
      if (!targetPost) {
        await supabase.from("moderator_actions").update({ status: "skipped", reason: `${action.reason} (target post deleted)` }).eq("id", actionId);
        return NextResponse.json({ error: "Target post no longer exists; item skipped." }, { status: 410 });
      }
      const resultPostId = await postModeratorComment(supabase, moderator, groupId, targetPost.id, targetPost.category, finalText);
      await supabase
        .from("moderator_actions")
        .update({ status: "posted", final_text: finalText, result_post_id: resultPostId, posted_at: new Date().toISOString() })
        .eq("id", actionId);
      return NextResponse.json({ ok: true, resultPostId });
    }

    if (op === "reject") {
      const { error } = await supabase
        .from("moderator_actions")
        .update({ status: "rejected", flag_note: typeof body.note === "string" ? body.note : null })
        .eq("id", String(body.actionId || ""))
        .eq("status", "queued");
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    if (op === "rate") {
      const rating = Number(body.rating);
      const { error } = await supabase
        .from("moderator_actions")
        .update({
          rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null,
          flag_note: typeof body.note === "string" && body.note.trim() ? body.note.trim() : undefined,
        })
        .eq("id", String(body.actionId || ""));
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    if (op === "delete_comment") {
      const actionId = String(body.actionId || "");
      const { data: action } = await supabase
        .from("moderator_actions")
        .select("id, result_post_id, reason")
        .eq("id", actionId)
        .maybeSingle();
      if (!action?.result_post_id) return NextResponse.json({ error: "No posted comment on this action." }, { status: 404 });
      const { error } = await supabase.from("group_posts").delete().eq("id", action.result_post_id);
      if (error) throw new Error(error.message);
      await supabase
        .from("moderator_actions")
        .update({ status: "rejected", reason: `${action.reason || ""} (comment deleted by Louis)`.trim() })
        .eq("id", actionId);
      return NextResponse.json({ ok: true });
    }

    if (op === "settings") {
      const key = String(body.moderatorKey || "");
      const valid = key === "global" || MODERATORS.some((mod) => mod.key === key);
      if (!valid) return NextResponse.json({ error: "Unknown moderator key." }, { status: 400 });
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (typeof body.enabled === "boolean") patch.enabled = body.enabled;
      if (typeof body.autoComments === "boolean") patch.auto_comments = body.autoComments;
      if (Number.isInteger(body.maxLikesPerDay)) patch.max_likes_per_day = body.maxLikesPerDay;
      if (Number.isInteger(body.maxCommentsPerDay)) patch.max_comments_per_day = body.maxCommentsPerDay;
      if (Number.isInteger(body.minDelayMinutes)) patch.min_delay_minutes = body.minDelayMinutes;
      if (typeof body.personality === "string") patch.personality = body.personality.trim() || null;
      if (typeof body.prohibitedTopics === "string") patch.prohibited_topics = body.prohibitedTopics.trim() || null;
      const { error } = await supabase.from("moderator_settings").update(patch).eq("moderator_key", key);
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown op." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Moderator admin action failed." },
      { status: 500 },
    );
  }
}
