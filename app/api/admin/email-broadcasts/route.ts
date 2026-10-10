import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadRecipients, renderBroadcastHtml, renderBroadcastText, unsubscribeUrl } from "@/lib/blogBroadcast";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";

// Louis's control over the twice-weekly studies email: read the drafts,
// edit them, send a test to himself, then send for real. Sending is the
// only thing here that touches a reader, and only he can trigger it.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ADMIN_EMAIL = "moorelouis3@gmail.com";

async function requireLouis(request: NextRequest): Promise<{ supabase: SupabaseClient } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const auth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  if (error || (data.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return { supabase: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }) };
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { supabase } = auth;

  const { data: broadcasts, error } = await supabase
    .from("blog_email_broadcasts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let recipientCount = 0;
  try {
    recipientCount = (await loadRecipients(supabase)).length;
  } catch {
    // Count is informational; never block the page on it.
  }

  const withText = (broadcasts || []).map((row: any) => ({
    ...row,
    body_text: renderBroadcastText(row.intro || "", row.post_slugs || []),
  }));

  return NextResponse.json({
    broadcasts: withText,
    recipientCount,
    // Both of these described Resend until 2026-10-10. Sending is SES now, so
    // the admin screen has to report on SES or it would show "ready" off a key
    // nothing uses any more.
    senderReady: sesSendingEnabled(),
    from: process.env.SES_FROM_ADDRESS || "(SES_FROM_ADDRESS not set)",
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { supabase } = auth;
  const body = await request.json().catch(() => null);
  const op = String(body?.op || "");
  const id = String(body?.id || "");

  try {
    if (op === "save") {
      const subject = String(body.subject || "").trim();
      const intro = String(body.intro || "").trim();
      const slugs: string[] = Array.isArray(body.postSlugs) ? body.postSlugs : [];
      if (!subject) return NextResponse.json({ error: "Subject is empty." }, { status: 400 });
      const { error } = await supabase
        .from("blog_email_broadcasts")
        .update({
          subject,
          intro,
          post_slugs: slugs,
          body_html: renderBroadcastHtml(intro, slugs),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("status", "draft");
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    // Louis sends the campaign from Systeme.io (their API cannot send one),
    // then marks it here so it leaves his queue and the next draft can be
    // scoped to posts published after this point.
    if (op === "sent") {
      const { error } = await supabase
        .from("blog_email_broadcasts")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", id)
        .eq("status", "draft");
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    if (op === "discard") {
      const { error } = await supabase
        .from("blog_email_broadcasts")
        .update({ status: "discarded" })
        .eq("id", id)
        .eq("status", "draft");
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    if (op === "test" || op === "send") {
      // Sending moved from Resend to our own SES sender (Louis, 2026-10-10).
      //
      // The old path looped over every recipient inside this request. At 5,196
      // subscribers that could never have finished - the function is killed at
      // five minutes - and it had no rate limit, no suppression check and no
      // way to resume. RESEND_API_KEY was never set, so it had also never
      // actually sent anything.
      //
      // Now "send" writes a row into email_campaigns and the
      // /api/cron/email-campaign-send job posts it in batches: rate limited,
      // suppression aware, and safe to interrupt.
      if (!sesSendingEnabled()) {
        return NextResponse.json(
          {
            error:
              "SES is not configured yet. Needs SES_SENDING_ENABLED=true, AWS_SES_ACCESS_KEY_ID, " +
              "AWS_SES_SECRET_ACCESS_KEY and SES_FROM_ADDRESS in Vercel.",
          },
          { status: 400 },
        );
      }

      const { data: draft } = await supabase
        .from("blog_email_broadcasts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!draft) return NextResponse.json({ error: "Draft not found." }, { status: 404 });
      const html = draft.body_html || renderBroadcastHtml(draft.intro || "", draft.post_slugs || []);
      const text = renderBroadcastText(draft.intro || "", draft.post_slugs || []);

      if (op === "test") {
        const result = await sendEmail({
          to: ADMIN_EMAIL,
          subject: `[TEST] ${draft.subject}`,
          html,
          text,
          unsubscribeUrl: unsubscribeUrl(ADMIN_EMAIL),
        });
        if (!result.sent) {
          return NextResponse.json({ error: result.detail || result.reason }, { status: 502 });
        }
        return NextResponse.json({ ok: true, testedTo: ADMIN_EMAIL });
      }

      if (draft.status !== "draft") {
        return NextResponse.json({ error: "That broadcast was already sent." }, { status: 409 });
      }
      // Claim it first: a double click must never send twice.
      const { data: claimed } = await supabase
        .from("blog_email_broadcasts")
        .update({ status: "sending" })
        .eq("id", id)
        .eq("status", "draft")
        .select("id")
        .maybeSingle();
      if (!claimed) return NextResponse.json({ error: "Already sending." }, { status: 409 });

      // One campaign id per broadcast, so a second press resumes the same send
      // instead of starting a new one that would mail everybody twice.
      const campaignId = `broadcast-${id}`;
      const { error: campaignError } = await supabase.from("email_campaigns").upsert(
        {
          campaign_id: campaignId,
          subject: draft.subject,
          html,
          text,
          status: "sending",
          notes: `blog_email_broadcasts.id = ${id}`,
        },
        { onConflict: "campaign_id" },
      );
      if (campaignError) {
        // Put it back so Louis can try again rather than losing the draft.
        await supabase.from("blog_email_broadcasts").update({ status: "draft" }).eq("id", id);
        return NextResponse.json({ error: campaignError.message }, { status: 500 });
      }

      const recipients = await loadRecipients(supabase);
      await supabase
        .from("blog_email_broadcasts")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          recipient_count: recipients.length,
        })
        .eq("id", id);

      return NextResponse.json({
        ok: true,
        queued: recipients.length,
        campaignId,
        note: "Queued. The cron posts it in batches - watch it with: npm run campaign -- status " + campaignId,
      });
    }

    return NextResponse.json({ error: "Unknown op." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Broadcast action failed." },
      { status: 500 },
    );
  }
}
