import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getFileExtension(fileName: string) {
  const ext = fileName.split(".").pop()?.trim().toLowerCase();
  return ext && /^[a-z0-9]+$/.test(ext) ? ext : "jpg";
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

  const formData = await request.formData().catch(() => null);
  const conversationId = typeof formData?.get("conversationId") === "string" ? String(formData?.get("conversationId")) : "";
  const content = typeof formData?.get("content") === "string" ? String(formData?.get("content")).trim() : "";
  const photo = formData?.get("photo");
  const hasPhoto = photo instanceof File && photo.size > 0;

  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId." }, { status: 400 });
  }

  if (!content && !hasPhoto) {
    return NextResponse.json({ error: "Message is empty." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUserId = userData.user.id;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: conversation, error: conversationError } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .eq("id", conversationId)
    .maybeSingle();

  if (conversationError || !conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  if (conversation.user_id_1 !== currentUserId && conversation.user_id_2 !== currentUserId) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let imageUrl: string | null = null;

  if (hasPhoto) {
    const file = photo as File;
    const ext = getFileExtension(file.name);
    const path = `dm-photos/${conversationId}/${currentUserId}-${Date.now()}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await supabaseAdmin.storage.from("post-media").upload(path, Buffer.from(arrayBuffer), {
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

    if (uploadResult.error) {
      return NextResponse.json({ error: uploadResult.error.message || "Could not upload photo." }, { status: 500 });
    }

    const { data: publicUrlData } = supabaseAdmin.storage.from("post-media").getPublicUrl(path);
    imageUrl = publicUrlData?.publicUrl ?? null;
  }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      content,
      image_url: imageUrl,
    })
    .select("id, sender_id, content, image_url, read_at, created_at")
    .single();

  if (insertError || !inserted) {
    return NextResponse.json({ error: insertError?.message || "Could not send message." }, { status: 500 });
  }

  const previewText =
    content.length > 0
      ? content.length > 80
        ? `${content.slice(0, 80)}...`
        : content
      : "Photo";

  await supabaseAdmin
    .from("conversations")
    .update({
      last_message_at: inserted.created_at,
      last_message_preview: previewText,
    })
    .eq("id", conversationId);

  return NextResponse.json({
    ok: true,
    message: {
      ...inserted,
      action_label: null,
      action_href: null,
    },
    preview: previewText,
  });
}
