import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const adminSupabase = createClient(url, serviceKey);

  const { data, error } = await adminSupabase
    .from("master_actions")
    .select("user_id, action_label")
    .eq("action_type", "reading_plan_chapter_completed");

  if (error) {
    return NextResponse.json({ error: "Failed to fetch reading plan actions" }, { status: 500 });
  }

  const rows = data || [];

  // Extract plan name from action_label (format: "Plan Name: Chapter Label")
  // Group by plan name and count distinct users
  const planUserMap = new Map<string, Set<string>>();

  for (const row of rows) {
    if (!row.action_label || !row.user_id) continue;
    const colonIndex = row.action_label.indexOf(": ");
    const planName = colonIndex !== -1 ? row.action_label.slice(0, colonIndex) : row.action_label;
    if (!planUserMap.has(planName)) planUserMap.set(planName, new Set());
    planUserMap.get(planName)!.add(row.user_id);
  }

  const stats = Array.from(planUserMap.entries()).map(([title, users]) => ({
    title,
    usersStarted: users.size,
  }));

  return NextResponse.json({ stats });
}
