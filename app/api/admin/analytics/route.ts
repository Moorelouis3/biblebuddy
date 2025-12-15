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
    // Fetch all users from auth.users using service role key
    const res = await fetch(`${url}/auth/v1/admin/users`, {
      headers: {
        apiKey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    const usersJson = await res.json();
    const users = usersJson.users ?? [];

    // Calculate time thresholds in UTC
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Logins in last 24 hours (using last_sign_in_at)
    const logins_last_24h = users.filter((user: any) => {
      if (!user.last_sign_in_at) return false;
      const lastSignIn = new Date(user.last_sign_in_at);
      return lastSignIn >= dayAgo;
    }).length;

    // 2. Logins in last 7 days (using last_sign_in_at)
    const logins_last_7_days = users.filter((user: any) => {
      if (!user.last_sign_in_at) return false;
      const lastSignIn = new Date(user.last_sign_in_at);
      return lastSignIn >= weekAgo;
    }).length;

    // 3. Logins in last 30 days (using last_sign_in_at)
    const logins_last_30_days = users.filter((user: any) => {
      if (!user.last_sign_in_at) return false;
      const lastSignIn = new Date(user.last_sign_in_at);
      return lastSignIn >= monthAgo;
    }).length;

    // 4. Signups in last 30 days (from auth.users created_at)
    const signups_last_30_days = users.filter((user: any) => {
      const createdAt = user.created_at
        ? new Date(user.created_at)
        : user.identities?.length > 0
        ? new Date(user.identities[0].created_at)
        : new Date(0);
      return createdAt >= monthAgo;
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

