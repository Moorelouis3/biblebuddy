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
    // 1. Fetch authentication statistics from Postgres via RPC.
    //    You must create this function in your Supabase SQL editor:
    //
    //    create or replace function get_auth_user_stats()
    //    returns table (
    //      total_users bigint,
    //      signups_last_30_days bigint,
    //      logins_last_24h bigint,
    //      logins_last_7_days bigint,
    //      logins_last_30_days bigint
    //    )
    //    language sql
    //    security definer
    //    set search_path = public
    //    as $$
    //      select
    //        count(*) as total_users,
    //        count(*) filter (where created_at >= now() - interval '30 days') as signups_last_30_days,
    //        count(*) filter (where last_sign_in_at >= now() - interval '24 hours') as logins_last_24h,
    //        count(*) filter (where last_sign_in_at >= now() - interval '7 days') as logins_last_7_days,
    //        count(*) filter (where last_sign_in_at >= now() - interval '30 days') as logins_last_30_days
    //      from auth.users;
    //    $$;
    //
    const { data: authStats, error: authStatsError } = await supabase.rpc(
      "get_auth_user_stats"
    );

    if (authStatsError) {
      console.error("Error fetching auth user stats:", authStatsError);
      throw authStatsError;
    }

    // Normalise RPC result (can be single object or array)
    const stats = Array.isArray(authStats) ? authStats[0] : authStats;

    const logins_last_24h = Number(stats?.logins_last_24h ?? 0);
    const logins_last_7_days = Number(stats?.logins_last_7_days ?? 0);
    const logins_last_30_days = Number(stats?.logins_last_30_days ?? 0);
    const signups_last_30_days = Number(stats?.signups_last_30_days ?? 0);
    const total_users = Number(stats?.total_users ?? 0);

    // 2. Total notes (keep existing logic)
    const { count: total_notes } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      logins_last_24h,
      logins_last_7_days,
      logins_last_30_days,
      signups_last_30_days,
      total_users,
      total_notes: total_notes ?? 0,
    });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}



