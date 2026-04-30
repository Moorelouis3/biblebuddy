import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function clip(text: string, max = 1200) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > max ? `${normalized.slice(0, max).trim()}...` : normalized;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey || !openAiKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const originalPostTitle = typeof body?.originalPostTitle === "string" ? body.originalPostTitle.trim() : "";
  const originalPostContent = typeof body?.originalPostContent === "string" ? body.originalPostContent.trim() : "";
  const targetCommentContent = typeof body?.targetCommentContent === "string" ? body.targetCommentContent.trim() : "";
  const targetDisplayName = typeof body?.targetDisplayName === "string" ? body.targetDisplayName.trim() : "Buddy";

  if (!groupId || !originalPostContent || !targetCommentContent) {
    return NextResponse.json({ error: "Missing auto reply context." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("user_id", userData.user.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "Join the study group first before generating replies." }, { status: 403 });
  }

  const openai = new OpenAI({ apiKey: openAiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            "You write short, natural reply drafts for a Bible study group host. " +
            "Reply directly to the person's comment while matching the topic of the original post. " +
            "Keep it warm, specific, thoughtful, and human. " +
            "Use 1 to 3 short sentences. " +
            "Do not mention AI. Do not use hashtags. Do not use emojis unless absolutely necessary. " +
            "Do not sound robotic, preachy, or overly formal. " +
            "Return only the reply text.",
        },
        {
          role: "user",
          content:
            `Original post title: ${clip(originalPostTitle || "No title", 160)}\n\n` +
            `Original post content:\n${clip(stripHtml(originalPostContent), 1400)}\n\n` +
            `Comment from ${targetDisplayName}:\n${clip(stripHtml(targetCommentContent), 700)}\n\n` +
            "Write a reply draft I can post back to that person.",
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "";
    if (!reply) {
      return NextResponse.json({ error: "Could not generate a reply draft." }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[AUTO_REPLY] Failed to generate reply draft", error);
    return NextResponse.json({ error: "Could not generate a reply draft right now." }, { status: 500 });
  }
}
