import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type TrialProfile = {
  user_id: string;
  username: string | null;
  display_name: string | null;
  profile_image_url: string | null;
  is_paid: boolean | null;
  membership_status: string | null;
  member_badge: string | null;
  pro_expires_at: string | null;
  total_actions: number | null;
  current_level: number | null;
  current_streak: number | null;
  chapters_completed_count: number | null;
  notes_created_count: number | null;
  trivia_questions_answered: number | null;
  last_active_at: string | null;
  last_active_date: string | null;
  created_at: string | null;
};

function formatTimeLeft(expiresAt: string | null) {
  if (!expiresAt) return "Upgraded";
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return "Expired";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return `${days}d ${hours}h ${minutes}m`;
}

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const supabaseAuth = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: profiles, error: profileError } = await supabase
    .from("profile_stats")
    .select("user_id, username, display_name, profile_image_url, is_paid, membership_status, member_badge, pro_expires_at, total_actions, current_level, current_streak, chapters_completed_count, notes_created_count, trivia_questions_answered, last_active_at, last_active_date, created_at")
    .or("member_badge.eq.pro_trial,pro_expires_at.not.is.null")
    .order("pro_expires_at", { ascending: false, nullsFirst: false })
    .limit(200);

  if (profileError) {
    return NextResponse.json({ error: profileError.message || "Could not load Pro trials." }, { status: 500 });
  }

  const rows = (profiles || []) as TrialProfile[];
  const userIds = rows.map((row) => row.user_id).filter(Boolean);

  const { data: actionRows } = userIds.length > 0
    ? await supabase
        .from("master_actions")
        .select("user_id, action_type")
        .in("user_id", userIds)
    : { data: [] };

  const actionMap = new Map<string, { loginCount: number; comments: number; reflections: number }>();
  (actionRows || []).forEach((action: any) => {
    const current = actionMap.get(action.user_id) ?? { loginCount: 0, comments: 0, reflections: 0 };
    if (action.action_type === "user_login") current.loginCount += 1;
    if (String(action.action_type || "").includes("comment")) current.comments += 1;
    if (String(action.action_type || "").includes("reflection")) current.reflections += 1;
    actionMap.set(action.user_id, current);
  });

  const now = Date.now();
  const trials = rows.map((profile) => {
    const expiresAt = profile.pro_expires_at;
    const expiresMs = expiresAt ? new Date(expiresAt).getTime() : 0;
    const activity = actionMap.get(profile.user_id) ?? { loginCount: 0, comments: 0, reflections: 0 };
    const upgraded = profile.is_paid === true && profile.membership_status === "pro" && !profile.pro_expires_at;

    return {
      userId: profile.user_id,
      username: profile.username ?? profile.display_name ?? "Unknown",
      displayName: profile.display_name ?? profile.username ?? "Unknown",
      profileImageUrl: profile.profile_image_url,
      isPaid: profile.is_paid === true,
      membershipStatus: profile.membership_status ?? "free",
      upgraded,
      status: upgraded ? "upgraded" : expiresMs > now ? "active" : "expired",
      proExpiresAt: expiresAt,
      timeLeft: formatTimeLeft(expiresAt),
      xpPoints: profile.total_actions ?? 0,
      currentLevel: profile.current_level ?? 1,
      currentStreak: profile.current_streak ?? 0,
      loginCount: activity.loginCount,
      commentCount: activity.comments,
      reflectionCount: activity.reflections,
      chaptersRead: profile.chapters_completed_count ?? 0,
      notesCreated: profile.notes_created_count ?? 0,
      triviaAnswered: profile.trivia_questions_answered ?? 0,
      lastActiveAt: profile.last_active_at ?? profile.last_active_date,
      createdAt: profile.created_at,
    };
  });

  const summary = {
    total: trials.length,
    active: trials.filter((trial) => trial.status === "active").length,
    expired: trials.filter((trial) => trial.status === "expired").length,
    upgraded: trials.filter((trial) => trial.status === "upgraded").length,
  };

  return NextResponse.json({ trials, summary });
}
