import { NextRequest, NextResponse } from "next/server";
import { getCloserSupabase } from "@/lib/closer/config";
import { getMetaEnv } from "@/lib/closer/meta";
import { processCommentsSequentially } from "@/lib/closer/process";
import type { CloserComment } from "@/lib/closer/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Threads is polled rather than pushed. Instagram and Facebook deliver
// comments over webhooks, but Threads webhook coverage for replies is not
// something this build could confirm against Meta's docs (blocked by the
// egress proxy here), so this takes the option that definitely works.
//
// Every reply is claimed through the same unique index as the webhook path,
// so re-polling the same reply is free: the second attempt loses the insert
// and is recorded as a duplicate rather than sent again.
//
// Scheduled from vercel.json. Fifteen minutes keeps the call volume low while
// staying inside the window where a reply still feels answered.

const THREADS_HOST = "https://graph.threads.net/v1.0";
const LOOKBACK_MS = 24 * 60 * 60 * 1000;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { threadsUserId, threadsToken } = getMetaEnv();
  if (!threadsUserId || !threadsToken) {
    return NextResponse.json({ ok: false, error: "Threads credentials are not configured." }, { status: 200 });
  }

  const supabase = getCloserSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Storage is not configured." }, { status: 200 });
  }

  const sinceIso = new Date(Date.now() - LOOKBACK_MS).toISOString();

  try {
    const postsUrl = new URL(`${THREADS_HOST}/${threadsUserId}/threads`);
    postsUrl.searchParams.set("fields", "id,timestamp");
    postsUrl.searchParams.set("since", sinceIso);
    postsUrl.searchParams.set("limit", "25");
    postsUrl.searchParams.set("access_token", threadsToken);

    const postsResponse = await fetch(postsUrl.toString());
    if (!postsResponse.ok) {
      const detail = await postsResponse.text();
      return NextResponse.json({ ok: false, error: `Threads posts fetch failed: ${detail.slice(0, 300)}` });
    }

    const posts = ((await postsResponse.json()) as { data?: Array<{ id?: string }> }).data || [];
    const comments: CloserComment[] = [];

    for (const post of posts) {
      if (!post.id) continue;

      const repliesUrl = new URL(`${THREADS_HOST}/${post.id}/replies`);
      repliesUrl.searchParams.set("fields", "id,text,username,timestamp");
      repliesUrl.searchParams.set("access_token", threadsToken);

      const repliesResponse = await fetch(repliesUrl.toString());
      if (!repliesResponse.ok) continue;

      const replies =
        ((await repliesResponse.json()) as { data?: Array<{ id?: string; text?: string; username?: string }> }).data ||
        [];

      for (const reply of replies) {
        if (!reply.id) continue;
        // Never answer ourselves.
        if (reply.username && reply.username === process.env.THREADS_USERNAME) continue;
        comments.push({
          platform: "threads",
          commentId: reply.id,
          postId: post.id,
          commenterHandle: reply.username || null,
          commenterId: null,
          text: reply.text || "",
        });
      }
    }

    if (!comments.length) return NextResponse.json({ ok: true, seen: 0, processed: 0 });

    const outcomes = await processCommentsSequentially(supabase, comments);
    const acted = outcomes.filter((o) => o.status !== "skipped_duplicate").length;
    return NextResponse.json({ ok: true, seen: comments.length, processed: acted });
  } catch (error) {
    console.error("[CLOSER] Threads poll failed:", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "unknown" });
  }
}
