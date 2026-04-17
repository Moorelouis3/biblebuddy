import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "B";
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "B";
}

function buildFireBuddyShareHtml(
  buddies: Array<{
    rank: number;
    displayName: string;
    profileImageUrl: string | null;
    currentStreak: number;
    currentLevel: number | null;
  }>,
  threshold: number,
) {
  const intro =
    threshold >= 100
      ? "These Bible Buddies have kept the fire going for 100 days or more. That kind of consistency is rare."
      : threshold >= 60
        ? "These Bible Buddies have stayed active in the Word for 60 days or more. That is strong consistency."
        : "These Bible Buddies have stayed active in the Word for 30 days or more on Bible Buddy. Keep showing up.";

  const rows = buddies
    .map((buddy) => {
      const avatar = buddy.profileImageUrl
        ? `<img src="${escapeHtml(buddy.profileImageUrl)}" alt="${escapeHtml(buddy.displayName)}" style="width:48px;height:48px;border-radius:9999px;object-fit:cover;display:block;" />`
        : `<div style="width:48px;height:48px;border-radius:9999px;background:#4a9b6f;color:#ffffff;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;">${escapeHtml(getInitials(buddy.displayName))}</div>`;

      const progressPercent = Math.max(30, Math.min(100, Math.round((buddy.currentStreak / 100) * 100)));
      return `
        <div style="border:1px solid #e8e1d6;border-radius:22px;padding:14px 16px;background:#ffffff;margin-top:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;min-width:0;">
              <div style="font-weight:800;color:#111827;font-size:24px;line-height:1;">#${buddy.rank}</div>
              ${avatar}
              <div style="min-width:0;">
                <div style="font-weight:700;color:#111827;font-size:16px;line-height:1.3;">${escapeHtml(buddy.displayName)}</div>
                <div style="margin-top:4px;color:#6b7280;font-size:13px;line-height:1.4;">🔥 ${buddy.currentStreak} day streak${buddy.currentLevel ? ` • Level ${buddy.currentLevel}` : ""}</div>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-weight:800;color:#111827;font-size:20px;line-height:1;">${buddy.currentStreak}</div>
              <div style="margin-top:2px;color:#6b7280;font-size:12px;">days</div>
            </div>
          </div>
          <div style="margin-top:12px;height:10px;border-radius:9999px;background:#edf6ed;overflow:hidden;">
            <div style="height:100%;width:${progressPercent}%;border-radius:9999px;background:#6cab71;"></div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <p><strong>🔥 Congrats to these Bible Buddies</strong></p>
    <p>${escapeHtml(intro)}</p>
    <div style="margin-top:16px;">${rows}</div>
    <p style="margin-top:16px;">Keep getting in the Word. Keep the streak alive. Keep building.</p>
  `;
}

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

  const { groupId } = await context.params;
  const body = await request.json().catch(() => null);
  const threshold = typeof body?.threshold === "number" ? body.threshold : 30;

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, leader_user_id")
    .eq("id", groupId)
    .maybeSingle();

  if (groupError || !group) {
    return NextResponse.json({ error: "Study group not found." }, { status: 404 });
  }

  const { data: memberships, error: membershipError } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("status", "approved");

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message || "Could not load group members." }, { status: 500 });
  }

  const memberIds = Array.from(new Set((memberships || []).map((row) => row.user_id).filter(Boolean)));

  const { data: profiles, error: profilesError } = memberIds.length
    ? await supabaseAdmin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, current_streak, current_level")
        .in("user_id", memberIds)
    : { data: [], error: null };

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message || "Could not load buddy streaks." }, { status: 500 });
  }

  const buddies = (profiles || [])
    .filter((profile) => (profile.current_streak ?? 0) >= threshold)
    .sort((a, b) => (b.current_streak ?? 0) - (a.current_streak ?? 0))
    .slice(0, 10)
    .map((profile, index) => ({
      rank: index + 1,
      displayName: profile.display_name || profile.username || "Buddy",
      profileImageUrl: profile.profile_image_url ?? null,
      currentStreak: profile.current_streak ?? 0,
      currentLevel: profile.current_level ?? null,
    }));

  if (buddies.length === 0) {
    return NextResponse.json({ error: "No fire badge Bible buddies matched this filter yet." }, { status: 400 });
  }

  const postOwnerId = group.leader_user_id || userData.user.id;
  const { data: ownerProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", postOwnerId)
    .maybeSingle();

  const displayName = ownerProfile?.display_name || ownerProfile?.username || "Louis";
  const content = buildFireBuddyShareHtml(buddies, threshold);

  const { data: post, error: postError } = await supabaseAdmin
    .from("group_posts")
    .insert({
      group_id: groupId,
      user_id: postOwnerId,
      display_name: displayName,
      title: "🔥 Bible Buddy Fire Streaks",
      category: "general",
      content,
    })
    .select("id")
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: postError?.message || "Could not share the fire streak post." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    postId: post.id,
    sharedCount: buddies.length,
  });
}
