import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { publishGroupFeedCarouselItem, type GroupFeedCarouselQueueItem } from "@/lib/groupFeedCarouselScheduler";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);

  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { groupId } = await context.params;
  const body = (await request.json().catch(() => null)) as { queueId?: string } | null;
  const queueId = body?.queueId;

  if (!queueId) {
    return NextResponse.json({ error: "Missing queueId." }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: queueItem, error: queueError } = await supabaseAdmin
    .from("group_feed_carousel_queue")
    .select("id, group_id, created_by, post_style, title, caption, cover_image_url, scheduled_for, status, published_post_id, published_at")
    .eq("id", queueId)
    .eq("group_id", groupId)
    .maybeSingle();

  if (queueError || !queueItem) {
    return NextResponse.json({ error: queueError?.message || "Queued post not found." }, { status: 404 });
  }

  try {
    const result = await publishGroupFeedCarouselItem(
      supabaseAdmin,
      queueItem as GroupFeedCarouselQueueItem,
    );

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not publish queued carousel post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
