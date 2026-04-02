import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "@/lib/actionTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function buildScoreTitle(score: number, total: number, chapterLabel: string) {
  const wordLabel = score === 1 ? "word" : "words";
  return `I just unscrambled ${score} of ${total} ${wordLabel} in ${chapterLabel}.`;
}

function buildScoreBody(score: number, chapterLabel: string) {
  const wordLabel = score === 1 ? "word" : "words";
  return `I just unscrambled ${score} ${wordLabel} from ${chapterLabel}. How many can you score?`;
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
  const bookSlug = typeof body?.bookSlug === "string" ? body.bookSlug.trim().toLowerCase() : "";
  const chapter = Number(body?.chapter);
  const score = Number(body?.score);
  const total = Number(body?.total);

  if (!bookSlug || !Number.isFinite(chapter) || !Number.isFinite(score) || !Number.isFinite(total)) {
    return NextResponse.json({ error: "Missing share details." }, { status: 400 });
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

  const { data: groups, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, created_at")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });

  if (groupError) {
    return NextResponse.json({ error: groupError.message || "Could not load official study group." }, { status: 500 });
  }

  const targetGroup =
    groups?.find((row) => row.name === "Bible Buddy Study Group") ??
    groups?.find((row) => row.name === "Hope Nation") ??
    null;

  if (!targetGroup) {
    return NextResponse.json({ error: "Official study group not found." }, { status: 404 });
  }

  const { data: membership, error: membershipError } = await supabaseAdmin
    .from("group_members")
    .select("status")
    .eq("group_id", targetGroup.id)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message || "Could not verify group membership." }, { status: 500 });
  }

  if (membership?.status !== "approved") {
    return NextResponse.json({ error: "Join the study group first to share your score." }, { status: 403 });
  }

  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { data: existingShare, error: existingError } = await supabaseAdmin
    .from("group_posts")
    .select("id, created_at")
    .eq("group_id", targetGroup.id)
    .eq("user_id", userData.user.id)
    .eq("category", "general")
    .like("link_url", "/bible-study-games/scrambled/%")
    .ilike("title", "I just unscrambled%")
    .gte("created_at", todayStart.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message || "Could not check today's shared score." }, { status: 500 });
  }

  if (existingShare) {
    return NextResponse.json({ error: "You already shared a Scrambled score today.", alreadySharedToday: true }, { status: 429 });
  }

  const { data: profile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  const displayName =
    profile?.display_name?.trim() ||
    profile?.username?.trim() ||
    userData.user.user_metadata?.firstName ||
    userData.user.user_metadata?.first_name ||
    (userData.user.email ? userData.user.email.split("@")[0] : null) ||
    "Buddy";

  const bookName = toTitleCase(bookSlug);
  const chapterLabel = `${bookName} ${chapter}`;
  const linkUrl = `/bible-study-games/scrambled/${bookSlug}/${chapter}`;
  const title = buildScoreTitle(score, total, chapterLabel);
  const content = buildScoreBody(score, chapterLabel);

  const { data: newPost, error: insertError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: targetGroup.id,
      user_id: userData.user.id,
      display_name: displayName,
      title,
      category: "general",
      content,
      link_url: linkUrl,
    })
    .select("id, title, content, link_url, created_at")
    .single();

  if (insertError || !newPost) {
    return NextResponse.json({ error: insertError?.message || "Could not share your score right now." }, { status: 500 });
  }

  await supabaseAdmin.from("master_actions").insert({
    user_id: userData.user.id,
    username: displayName,
    action_type: ACTION_TYPE.group_message_sent,
    action_label: `Shared Scrambled score in ${chapterLabel}`,
  });

  return NextResponse.json({
    ok: true,
    post: newPost,
    groupId: targetGroup.id,
  });
}
