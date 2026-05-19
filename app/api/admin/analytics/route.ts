import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!serviceKey || !url || !anonKey) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  // Create Supabase client with service role key for admin queries
  const supabase = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {

    // Active Users = distinct users who did anything tracked in master_actions
    // OR had an app heartbeat in profile_stats within each time window.
    const now = new Date();
    const nowISO = now.toISOString();

    async function getActiveUsersCount(startISO: string) {
      const activeUserIds = new Set<string>();
      const startDay = startISO.slice(0, 10);

      const { data, error } = await supabase
        .from("master_actions")
        .select("user_id")
        .gte("created_at", startISO)
        .lte("created_at", nowISO);
      if (error) throw error;

      for (const row of data || []) {
        const userId = (row as { user_id: string | null }).user_id;
        if (userId) activeUserIds.add(userId);
      }

      const profileActivity = await supabase
        .from("profile_stats")
        .select("user_id, last_active_at, last_active_date")
        .or(`last_active_at.gte.${startISO},last_active_date.gte.${startDay}`);

      if (profileActivity.error && !/last_active_at/i.test(profileActivity.error.message || "")) {
        throw profileActivity.error;
      }

      const profileRows = profileActivity.error
        ? await supabase
            .from("profile_stats")
            .select("user_id, last_active_date")
            .gte("last_active_date", startDay)
        : profileActivity;

      if (profileRows.error) throw profileRows.error;

      for (const row of profileRows.data || []) {
        const profile = row as { user_id: string | null; last_active_at?: string | null; last_active_date?: string | null };
        if (!profile.user_id) continue;
        if (
          (profile.last_active_at && profile.last_active_at >= startISO) ||
          (!profile.last_active_at && profile.last_active_date && profile.last_active_date >= startDay)
        ) {
          activeUserIds.add(profile.user_id);
        }
      }

      return activeUserIds.size;
    }

    const [
      active_users_24h,
      active_users_7d,
      active_users_30d,
      active_users_1y,
    ] = await Promise.all([
      getActiveUsersCount(new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()),
      getActiveUsersCount(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      getActiveUsersCount(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      getActiveUsersCount(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    // Keep existing logic for other stats

    // 2. Total notes (keep existing logic)
    const { count: total_notes } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true });

    // 3. Check for bible_notes verification issues
    // Check for rows with empty or null notes_text as indicator of potential verification failures
    const { count: bible_notes_total } = await supabase
      .from("bible_notes")
      .select("*", { count: "exact", head: true });

    const { count: bible_notes_with_content } = await supabase
      .from("bible_notes")
      .select("*", { count: "exact", head: true })
      .not("notes_text", "is", null);

    // If there are rows but some have null notes_text, there might be verification issues
    const total = bible_notes_total ?? 0;
    const withContent = bible_notes_with_content ?? 0;
    const has_verification_issues = total > 0 && total > withContent;

    return NextResponse.json({
      active_users_24h,
      active_users_7d,
      active_users_30d,
      active_users_1y,
      total_notes: total_notes ?? 0,
      has_verification_issues,
    });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

