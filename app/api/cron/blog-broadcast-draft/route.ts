import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildBroadcastDraft, pickPostsSince, renderBroadcastHtml } from "@/lib/blogBroadcast";

// Drafts the twice-weekly studies email (Tue + Fri). It only ever writes a
// DRAFT - Louis reviews and presses send on /admin/email-broadcasts.
// Nothing here can put an email in front of a reader.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
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

  try {
    // Never stack drafts: if one is already waiting for review, leave it.
    const { data: pending } = await supabase
      .from("blog_email_broadcasts")
      .select("id, created_at")
      .eq("status", "draft")
      .limit(1)
      .maybeSingle();
    if (pending) {
      return NextResponse.json({ ok: true, skipped: true, reason: "A draft is already waiting for review.", draftId: pending.id });
    }

    const { data: lastSent } = await supabase
      .from("blog_email_broadcasts")
      .select("sent_at")
      .eq("status", "sent")
      .order("sent_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const posts = pickPostsSince(lastSent?.sent_at ?? null);
    if (!posts.length) {
      return NextResponse.json({ ok: true, skipped: true, reason: "No posts to send." });
    }

    const draft = buildBroadcastDraft(posts);
    const { data: created, error } = await supabase
      .from("blog_email_broadcasts")
      .insert({
        subject: draft.subject,
        intro: draft.intro,
        post_slugs: draft.postSlugs,
        body_html: renderBroadcastHtml(draft.intro, draft.postSlugs),
        status: "draft",
      })
      .select("id, subject")
      .single();
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, draftId: created.id, subject: created.subject, posts: draft.postSlugs });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not draft the broadcast." },
      { status: 500 },
    );
  }
}
