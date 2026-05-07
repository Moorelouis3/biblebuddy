import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSeriesWeekNotesActionEvent, parseSeriesWeekNotesWeekNumber } from "@/lib/seriesWeekNotesTracking";
import { isSeriesWeekComplete, toSeriesWeekProgressState } from "@/lib/seriesWeekProgress";
import { ACTION_TYPE } from "@/lib/actionTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FinisherProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  is_paid: boolean | null;
  member_badge: string | null;
};

type GroupMemberRow = {
  user_id: string;
  role: string | null;
  display_name: string | null;
};

type RouteContext = {
  params: Promise<{
    groupId: string;
    seriesId: string;
    weekNum: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { groupId, seriesId, weekNum } = await context.params;
  const parsedWeekNum = Number(weekNum);

  if (!groupId || !seriesId || !Number.isFinite(parsedWeekNum) || parsedWeekNum <= 0) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

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

  const { data: membership, error: membershipError } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("user_id", currentUserId)
    .maybeSingle();

  if (membershipError || !membership) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const [{ data: groupMembers, error: membersError }, { data: seriesRow, error: seriesError }] = await Promise.all([
    supabaseAdmin
      .from("group_members")
      .select("user_id, role, display_name")
      .eq("group_id", groupId)
      .eq("status", "approved"),
    supabaseAdmin
      .from("group_series")
      .select("title")
      .eq("id", seriesId)
      .maybeSingle(),
  ]);

  if (membersError) {
    return NextResponse.json({ error: "Could not load group members." }, { status: 500 });
  }

  if (seriesError) {
    return NextResponse.json({ error: "Could not load series." }, { status: 500 });
  }

  const memberRows = ((groupMembers || []) as GroupMemberRow[]);
  const memberIds = memberRows.map((row) => row.user_id).filter(Boolean);
  if (memberIds.length === 0) {
    return NextResponse.json({ finishers: [] });
  }
  const memberIdSet = new Set(memberIds);

  const roleMap = new Map<string, string | null>();
  const memberDisplayNameMap = new Map<string, string | null>();
  memberRows.forEach((row) => {
    roleMap.set(row.user_id, row.role || null);
    memberDisplayNameMap.set(row.user_id, row.display_name || null);
  });

  const [progressRes, triviaRes, notesRes, reflectionsRes, profilesRes] = await Promise.all([
    supabaseAdmin
      .from("series_week_progress")
      .select("user_id, reading_completed, notes_completed, trivia_completed, reflection_posted")
      .eq("series_id", seriesId)
      .eq("week_number", parsedWeekNum),
    supabaseAdmin
      .from("series_trivia_scores")
      .select("user_id")
      .eq("series_id", seriesId)
      .eq("week_number", parsedWeekNum),
    supabaseAdmin
      .from("master_actions")
      .select("user_id, action_type, action_label")
      .in("action_type", [ACTION_TYPE.series_week_notes_opened, ACTION_TYPE.study_group_article_opened])
      .ilike("action_label", `%Week ${parsedWeekNum} Notes%`),
    supabaseAdmin
      .from("series_reflections")
      .select("user_id, display_name, profile_image_url")
      .eq("series_id", seriesId)
      .eq("week_number", parsedWeekNum),
    supabaseAdmin
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, is_paid, member_badge")
      .in("user_id", memberIds),
  ]);

  if (progressRes.error) {
    console.error("[WEEK_FINISHERS_API] progress query failed", progressRes.error);
    return NextResponse.json({ error: "Could not load week finishers." }, { status: 500 });
  }

  if (triviaRes.error) {
    console.error("[WEEK_FINISHERS_API] trivia query failed", triviaRes.error);
  }
  if (notesRes.error) {
    console.error("[WEEK_FINISHERS_API] notes actions query failed", notesRes.error);
  }
  if (reflectionsRes.error) {
    console.error("[WEEK_FINISHERS_API] reflections query failed", reflectionsRes.error);
  }
  if (profilesRes.error) {
    console.error("[WEEK_FINISHERS_API] profiles query failed", profilesRes.error);
  }

  const progressMap = new Map<string, { reading: boolean; notes: boolean; trivia: boolean; reflection: boolean }>();

  (progressRes.data || []).forEach((row) => {
    if (!row.user_id) return;
    progressMap.set(row.user_id, toSeriesWeekProgressState(row));
  });

  ((triviaRes.error ? [] : triviaRes.data) || []).forEach((row) => {
    if (!row.user_id) return;
    if (!memberIdSet.has(row.user_id)) return;
    const existing = progressMap.get(row.user_id) ?? toSeriesWeekProgressState();
    progressMap.set(row.user_id, { ...existing, trivia: true });
  });

  ((notesRes.error ? [] : notesRes.data) || []).forEach((row) => {
    if (!row.user_id) return;
    if (!memberIdSet.has(row.user_id)) return;
    if (!isSeriesWeekNotesActionEvent(row.action_type, row.action_label)) return;
    if (parseSeriesWeekNotesWeekNumber(row.action_label, seriesRow?.title) !== parsedWeekNum) return;
    const existing = progressMap.get(row.user_id) ?? toSeriesWeekProgressState();
    progressMap.set(row.user_id, { ...existing, notes: true });
  });

  ((reflectionsRes.error ? [] : reflectionsRes.data) || []).forEach((row) => {
    if (!row.user_id) return;
    if (!memberIdSet.has(row.user_id)) return;
    const existing = progressMap.get(row.user_id) ?? toSeriesWeekProgressState();
    progressMap.set(row.user_id, { ...existing, reflection: true });
  });

  const reflectionIdentityMap = new Map<string, { display_name: string | null; profile_image_url: string | null }>();
  ((reflectionsRes.error ? [] : reflectionsRes.data) || []).forEach((row) => {
    if (!row.user_id) return;
    if (!memberIdSet.has(row.user_id)) return;
    if (!reflectionIdentityMap.has(row.user_id)) {
      reflectionIdentityMap.set(row.user_id, {
        display_name: "display_name" in row ? (row.display_name ?? null) : null,
        profile_image_url: "profile_image_url" in row ? (row.profile_image_url ?? null) : null,
      });
    }
  });

  const profileMap = new Map<string, FinisherProfileRow>();
  (((profilesRes.error ? [] : profilesRes.data) || []) as FinisherProfileRow[]).forEach((row) => {
    profileMap.set(row.user_id, row);
  });

  const finishers = memberIds
    .filter((userId) => isSeriesWeekComplete(progressMap.get(userId) ?? toSeriesWeekProgressState()))
    .map((userId) => {
      const profile = profileMap.get(userId);
      const reflectionIdentity = reflectionIdentityMap.get(userId);
      return {
        user_id: userId,
        display_name:
          profile?.display_name
          || reflectionIdentity?.display_name
          || profile?.username
          || memberDisplayNameMap.get(userId)
          || "Bible Buddy",
        profile_image_url: profile?.profile_image_url || reflectionIdentity?.profile_image_url || null,
        member_badge: profile?.member_badge || null,
        is_paid: profile?.is_paid === true,
        group_role: roleMap.get(userId) ?? null,
      };
    });

  return NextResponse.json({ finishers });
}
