import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Service role client bypasses RLS
  const adminSupabase = createClient(url, serviceKey);

  const { data: devotionals, error: devError } = await adminSupabase
    .from("devotionals")
    .select("id, title, total_days")
    .order("created_at", { ascending: true });

  if (devError || !devotionals) {
    return NextResponse.json({ error: "Failed to fetch devotionals" }, { status: 500 });
  }

  // Fetch all day 1 rows across all users (bypasses RLS)
  const { data: progress, error: progError } = await adminSupabase
    .from("devotional_progress")
    .select("user_id, devotional_id")
    .eq("day_number", 1);

  if (progError) {
    return NextResponse.json({ error: "Failed to fetch devotional progress" }, { status: 500 });
  }

  const progressRows = progress || [];

  const stats = devotionals.map((dev) => {
    const rows = progressRows.filter((r) => r.devotional_id === dev.id);
    const usersStarted = new Set(rows.map((r) => r.user_id)).size;
    return { id: dev.id, title: dev.title, total_days: dev.total_days, usersStarted };
  });

  return NextResponse.json({ stats });
}
