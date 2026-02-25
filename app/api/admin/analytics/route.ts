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

    // Active Users RPC windows
    const now = new Date();
    const nowISO = now.toISOString();
    const windows = {
      active_users_24h: [new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), nowISO],
      active_users_7d:  [new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), nowISO],
      active_users_30d: [new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(), nowISO],
      active_users_1y:  [new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString(), nowISO],
    };

    async function getActiveUsersCount(start_ts, end_ts) {
      const { data, error } = await supabase.rpc("get_active_users_count", { start_ts, end_ts });
      if (error) throw error;
      // Supabase RPC returns array or single value depending on config
      return Array.isArray(data) ? Number(data[0]) : Number(data);
    }

    const [
      active_users_24h,
      active_users_7d,
      active_users_30d,
      active_users_1y,
    ] = await Promise.all([
      getActiveUsersCount(...windows.active_users_24h),
      getActiveUsersCount(...windows.active_users_7d),
      getActiveUsersCount(...windows.active_users_30d),
      getActiveUsersCount(...windows.active_users_1y),
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



