import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isMissingPromoTable(message?: string | null) {
  return /blog_promo_events|schema cache|does not exist|could not find the table/i.test(message || "");
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const eventType = body?.event_type === "impression" || body?.event_type === "click" ? body.event_type : "";
  const promo = typeof body?.promo === "string" ? body.promo.trim().slice(0, 100) : "";
  const postSlug = typeof body?.post_slug === "string" ? body.post_slug.trim().slice(0, 200) : "";
  const slotIndex = Number.isInteger(body?.slot_index) && body.slot_index >= 0 ? body.slot_index : 0;
  const sessionId = typeof body?.session_id === "string" ? body.session_id.trim().slice(0, 200) : "";

  if (!eventType || !promo || !postSlug || !sessionId) {
    return NextResponse.json({ ok: false, error: "Invalid promo event payload." }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  let userId: string | null = null;

  if (token) {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      const supabaseAuth = createClient(supabaseUrl, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data: userData } = await supabaseAuth.auth.getUser(token);
      userId = userData.user?.id || null;
    }
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await supabaseAdmin.from("blog_promo_events").insert({
    event_type: eventType,
    promo,
    post_slug: postSlug,
    slot_index: slotIndex,
    session_id: sessionId,
    user_id: userId,
  });

  if (error) {
    if (isMissingPromoTable(error.message)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
