import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const adminSupabase = createClient(url, serviceKey);

  const { data: devotionals, error: devError } = await adminSupabase
    .from("devotionals")
    .select("id, title, total_days")
    .order("created_at", { ascending: true });

  if (devError || !devotionals) {
    return NextResponse.json({ error: "Failed to fetch devotionals" }, { status: 500 });
  }

  // Fetch all progress rows across all users and all devotionals
  const { data: progress, error: progError } = await adminSupabase
    .from("devotional_progress")
    .select("user_id, devotional_id, day_number, is_completed, completed_at")
    .order("completed_at", { ascending: false });

  if (progError) {
    return NextResponse.json({ error: "Failed to fetch devotional progress" }, { status: 500 });
  }

  const progressRows = progress || [];

  // Get all unique user IDs that have any progress
  const allUserIds = [...new Set(progressRows.map((r) => r.user_id).filter(Boolean))];

  // Fetch usernames from profile_stats
  let usernameMap = new Map<string, string>();
  if (allUserIds.length > 0) {
    const { data: profiles } = await adminSupabase
      .from("profile_stats")
      .select("user_id, username")
      .in("user_id", allUserIds);
    if (profiles) {
      for (const p of profiles) {
        if (p.user_id && p.username) usernameMap.set(p.user_id, p.username);
      }
    }
  }

  const stats = devotionals.map((dev) => {
    const devRows = progressRows.filter((r) => r.devotional_id === dev.id);

    // Build per-user summary
    const userSummary = new Map<
      string,
      { highestDay: number; daysCompleted: number; lastActivity: string }
    >();

    for (const row of devRows) {
      const uid = row.user_id;
      if (!uid) continue;
      const existing = userSummary.get(uid);
      const rowDate = row.completed_at ?? "";
      if (!existing) {
        userSummary.set(uid, {
          highestDay: row.day_number,
          daysCompleted: row.is_completed ? 1 : 0,
          lastActivity: rowDate,
        });
      } else {
        if (row.day_number > existing.highestDay) existing.highestDay = row.day_number;
        if (row.is_completed) existing.daysCompleted += 1;
        if (rowDate > existing.lastActivity) existing.lastActivity = rowDate;
      }
    }

    const users = [...userSummary.entries()].map(([user_id, data]) => ({
      user_id,
      username: usernameMap.get(user_id) ?? "Unknown",
      highestDay: data.highestDay,
      daysCompleted: data.daysCompleted,
      finished: data.daysCompleted >= dev.total_days,
      lastActivity: data.lastActivity,
    }));

    // Sort: finished first, then by highest day descending
    users.sort((a, b) => {
      if (a.finished !== b.finished) return a.finished ? -1 : 1;
      return b.highestDay - a.highestDay;
    });

    return {
      id: dev.id,
      title: dev.title,
      total_days: dev.total_days,
      usersStarted: users.length,
      usersCompleted: users.filter((u) => u.finished).length,
      users,
    };
  });

  return NextResponse.json({ stats });
}
