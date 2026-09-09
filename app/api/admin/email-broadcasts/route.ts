import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadRecipients, renderBroadcastHtml, unsubscribeUrl } from "@/lib/blogBroadcast";

// Louis's control over the twice-weekly studies email: read the drafts,
// edit them, send a test to himself, then send for real. Sending is the
// only thing here that touches a reader, and only he can trigger it.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const FROM = process.env.BROADCAST_FROM || "Louis at Bible Buddy <louis@mybiblebuddy.net>";

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

/** One send through Resend. Returns null on success, else the error text. */
async function sendOne(apiKey: string, to: string, subject: string, html: string) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        html: html.replace(/\{\{UNSUBSCRIBE\}\}/g, unsubscribeUrl(to)),
        headers: { "List-Unsubscribe": `<${unsubscribeUrl(to)}>` },
      }),
    });
    if (!response.ok) return (await response.text()).slice(0, 200);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "send failed";
  }
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

  return NextResponse.json({
    broadcasts: broadcasts || [],
    recipientCount,
    senderReady: Boolean(process.env.RESEND_API_KEY),
    from: FROM,
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
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
          { error: "No RESEND_API_KEY set yet, so nothing can be sent. Add it in Vercel and redeploy." },
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

      if (op === "test") {
        const failure = await sendOne(apiKey, ADMIN_EMAIL, `[TEST] ${draft.subject}`, html);
        if (failure) return NextResponse.json({ error: failure }, { status: 502 });
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

      const recipients = await loadRecipients(supabase);
      let sent = 0;
      const failures: string[] = [];
      for (const email of recipients) {
        const failure = await sendOne(apiKey, email, draft.subject, html);
        if (failure) failures.push(`${email}: ${failure}`);
        else sent += 1;
      }

      await supabase
        .from("blog_email_broadcasts")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          recipient_count: sent,
          send_error: failures.length ? failures.slice(0, 5).join(" | ") : null,
        })
        .eq("id", id);

      return NextResponse.json({ ok: true, sent, failed: failures.length });
    }

    return NextResponse.json({ error: "Unknown op." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Broadcast action failed." },
      { status: 500 },
    );
  }
}
