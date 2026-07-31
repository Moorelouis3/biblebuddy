import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Receives Systeme.io CONTACT_TAG_ADDED webhooks. Systeme.io workflows add
// tags like bb-day1-opened / bb-day1-clicked when a funnel email is opened
// or clicked; we record those as email_funnel_events for the analytics page.
const TAG_PATTERN = /^bb-day(\d)-(opened|clicked)$/;

function isAuthorized(request: NextRequest, rawBody: string): boolean {
  const secret = process.env.SYSTEME_WEBHOOK_SECRET;
  if (!secret) return false;

  const signature = request.headers.get("x-webhook-signature") || "";
  if (signature) {
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    try {
      if (timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return true;
    } catch {
      // length mismatch falls through to direct compare
    }
    if (signature === secret) return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  if (!isAuthorized(request, rawBody)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tagName: string | undefined = payload?.tag?.name || payload?.tagName;
  const email: string | undefined =
    payload?.contact?.email || payload?.contact?.fields?.email || payload?.email;

  if (!tagName || !email) {
    // Not a shape we understand; acknowledge so Systeme.io does not retry forever
    return NextResponse.json({ ok: true, ignored: true });
  }

  const match = tagName.match(TAG_PATTERN);
  if (!match) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const emailDay = Number(match[1]);
  const eventType = match[2];

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const { data: signup } = await supabaseAdmin
      .from("user_signups")
      .select("user_id")
      .ilike("email", email)
      .limit(1)
      .maybeSingle();

    if (!signup?.user_id) {
      console.warn(`[SYSTEME_WEBHOOK] No user found for ${email}; skipping ${tagName}`);
      return NextResponse.json({ ok: true, ignored: true });
    }

    // One event per user/day/type: skip if already recorded
    const { data: existing } = await supabaseAdmin
      .from("email_funnel_events")
      .select("id")
      .eq("user_id", signup.user_id)
      .eq("email_day", emailDay)
      .eq("event_type", eventType)
      .limit(1)
      .maybeSingle();

    if (!existing) {
      const { error: insertError } = await supabaseAdmin.from("email_funnel_events").insert({
        user_id: signup.user_id,
        email_day: emailDay,
        event_type: eventType,
        event_data: { tag: tagName, source: "systeme_webhook" },
      });
      if (insertError) {
        console.error("[SYSTEME_WEBHOOK] Insert error:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, recorded: !existing });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[SYSTEME_WEBHOOK] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
