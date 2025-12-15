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
    // 1. Logins in last 24 hours (distinct user_id)
    const { count: logins24h } = await supabase
      .from("app_logins")
      .select("user_id", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    // Get distinct user_ids for last 24 hours
    const { data: logins24hData } = await supabase
      .from("app_logins")
      .select("user_id")
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    const logins_last_24h = new Set(logins24hData?.map((l) => l.user_id) || []).size;

    // 2. Logins in last 7 days (distinct user_id)
    const { data: logins7dData } = await supabase
      .from("app_logins")
      .select("user_id")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
    const logins_last_7_days = new Set(logins7dData?.map((l) => l.user_id) || []).size;

    // 3. Logins in last 30 days (distinct user_id)
    const { data: logins30dData } = await supabase
      .from("app_logins")
      .select("user_id")
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
    const logins_last_30_days = new Set(logins30dData?.map((l) => l.user_id) || []).size;

    // 4. Signups in last 30 days (from auth.users)
    const res = await fetch(`${url}/auth/v1/admin/users`, {
      headers: {
        apiKey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    const usersJson = await res.json();
    const users = usersJson.users ?? [];

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const signups_last_30_days = users.filter((user: any) => {
      const createdAt = user.created_at
        ? new Date(user.created_at)
        : user.identities?.length > 0
        ? new Date(user.identities[0].created_at)
        : new Date(0);
      return createdAt >= thirtyDaysAgo;
    }).length;

    // 5. Total users (from auth.users)
    const total_users = users.length;

    // 6. Total notes (keep existing logic)
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

