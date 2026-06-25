import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOUIS_EMAIL = "moorelouis3@gmail.com";

async function resolveLouisUserId(supabaseUrl: string, serviceKey: string, supabaseAdmin: any) {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  try {
    const response = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      },
    );

    if (response.ok) {
      const json = await response.json();
      const found = (json?.users ?? []).find((user: any) => user.email === LOUIS_EMAIL);
      if (found?.id) return found.id as string;
    }
  } catch {}

  try {
    const { data } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const found = (data?.users ?? []).find((user: any) => user.email === LOUIS_EMAIL);
    if (found?.id) return found.id as string;
  } catch {}

  return null;
}

function buildPreview(category: string, area: string, message: string) {
  const lead = `[Problem Report] ${category} - ${area}`;
  const detail = message.trim().replace(/\s+/g, " ");
  const preview = detail ? `${lead}: ${detail}` : lead;
  return preview.length > 120 ? `${preview.slice(0, 117)}...` : preview;
}

function buildStructuredMessage(params: {
  category: string;
  area: string;
  message: string;
  dayNumber?: number | null;
  dayTitle?: string | null;
  reference?: string | null;
  currentUrl?: string | null;
  source?: string | null;
  displayName?: string | null;
  username?: string | null;
}) {
  const lines = [
    "Problem Report",
    "",
    `Category: ${params.category}`,
    `Area: ${params.area}`,
  ];

  if (params.dayNumber) {
    lines.push(`Day: Day ${params.dayNumber}${params.dayTitle ? ` - ${params.dayTitle}` : ""}`);
  } else if (params.dayTitle) {
    lines.push(`Day: ${params.dayTitle}`);
  }

  if (params.reference) lines.push(`Reading: ${params.reference}`);
  if (params.source) lines.push(`Source: ${params.source}`);
  if (params.currentUrl) lines.push(`Page: ${params.currentUrl}`);

  const reporterLabel =
    params.displayName?.trim() ||
    (params.username?.trim() ? `@${params.username.trim()}` : null) ||
    "Bible Buddy user";
  lines.push(`Reporter: ${reporterLabel}`);
  lines.push("");
  lines.push("Message:");
  lines.push(params.message.trim());

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
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

  const body = await request.json().catch(() => null);
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const area = typeof body?.area === "string" ? body.area.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const dayNumber = Number.isFinite(Number(body?.dayNumber)) ? Number(body.dayNumber) : null;
  const dayTitle = typeof body?.dayTitle === "string" ? body.dayTitle.trim() : null;
  const reference = typeof body?.reference === "string" ? body.reference.trim() : null;
  const currentUrl = typeof body?.currentUrl === "string" ? body.currentUrl.trim() : null;
  const source = typeof body?.source === "string" ? body.source.trim() : null;

  if (!category || !area || !message) {
    return NextResponse.json({ error: "Category, area, and message are required." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUser = userData.user;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const louisUserId = await resolveLouisUserId(supabaseUrl, serviceKey, supabaseAdmin);
  if (!louisUserId) {
    return NextResponse.json({ error: "Could not route the report right now." }, { status: 500 });
  }

  const { data: reporterProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  const structuredMessage = buildStructuredMessage({
    category,
    area,
    message,
    dayNumber,
    dayTitle,
    reference,
    currentUrl,
    source,
    displayName: reporterProfile?.display_name ?? null,
    username: reporterProfile?.username ?? null,
  });

  if (currentUser.id === louisUserId) {
    const { error: inboxError } = await supabaseAdmin.from("louis_inbox_messages").insert({
      user_id: currentUser.id,
      kind: "problem_report",
      title: `Problem report: ${category}`,
      content: structuredMessage,
      meta: {
        category,
        area,
        dayNumber,
        dayTitle,
        reference,
        currentUrl,
        source,
      },
    });

    if (inboxError) {
      return NextResponse.json({ error: inboxError.message || "Could not save the report." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, conversationId: null, delivered: "inbox" });
  }

  const [uid1, uid2] = louisUserId < currentUser.id ? [louisUserId, currentUser.id] : [currentUser.id, louisUserId];
  const { data: existingConversation, error: conversationLookupError } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("user_id_1", uid1)
    .eq("user_id_2", uid2)
    .maybeSingle();

  if (conversationLookupError) {
    return NextResponse.json({ error: conversationLookupError.message || "Could not open a message thread." }, { status: 500 });
  }

  let conversationId = existingConversation?.id ?? null;

  if (!conversationId) {
    const { data: insertedConversation, error: conversationInsertError } = await supabaseAdmin
      .from("conversations")
      .insert({ user_id_1: uid1, user_id_2: uid2 })
      .select("id")
      .single();

    if (conversationInsertError || !insertedConversation) {
      return NextResponse.json({ error: conversationInsertError?.message || "Could not create a message thread." }, { status: 500 });
    }

    conversationId = insertedConversation.id;
  }

  const now = new Date().toISOString();
  const preview = buildPreview(category, area, message);

  const { error: messageError } = await supabaseAdmin.from("messages").insert({
    conversation_id: conversationId,
    sender_id: currentUser.id,
    content: structuredMessage,
    created_at: now,
  });

  if (messageError) {
    return NextResponse.json({ error: messageError.message || "Could not send the report." }, { status: 500 });
  }

  await supabaseAdmin
    .from("conversations")
    .update({
      last_message_at: now,
      last_message_preview: preview,
    })
    .eq("id", conversationId);

  const senderName =
    reporterProfile?.display_name?.trim() ||
    reporterProfile?.username?.trim() ||
    currentUser.email?.split("@")[0] ||
    "A buddy";

  const conversationRoute = `/messages/${conversationId}`;
  const { data: existingNotification } = await supabaseAdmin
    .from("notifications")
    .select("id")
    .eq("user_id", louisUserId)
    .eq("type", "direct_message")
    .eq("article_slug", conversationRoute)
    .eq("is_read", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingNotification?.id) {
    await supabaseAdmin
      .from("notifications")
      .update({
        from_user_id: currentUser.id,
        from_user_name: senderName,
        message: preview,
        created_at: now,
      })
      .eq("id", existingNotification.id);
  } else {
    await supabaseAdmin.from("notifications").insert({
      user_id: louisUserId,
      type: "direct_message",
      from_user_id: currentUser.id,
      from_user_name: senderName,
      article_slug: conversationRoute,
      message: preview,
      is_read: false,
      created_at: now,
    });
  }

  return NextResponse.json({ ok: true, conversationId, delivered: "dm" });
}
