import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

const DAY_LABELS: Record<number, string> = {
  1: "Day 1 — Welcome",
  2: "Day 2 — God's word changes you",
  3: "Day 3 — Study no matter what (audio)",
  4: "Day 4 — Upgrade nudge (conditional)",
  5: "Day 5 — Study notes",
  6: "Day 6 — Community",
  7: "Day 7 — Why I built this",
  8: "Day 8 — One week in (conditional)",
};

type SendRow = {
  user_id: string;
  email_day: number;
  template_version: string | null;
  sent_at: string | null;
  created_at: string | null;
};

type EventRow = {
  user_id: string;
  email_day: number;
  event_type: string;
};

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
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
  if (userError || !userData.user || (userData.user.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const sends: SendRow[] = [];
    const pageSize = 1000;
    for (let from = 0; ; from += pageSize) {
      const { data, error } = await supabaseAdmin
        .from("email_funnel_sends")
        .select("user_id, email_day, template_version, sent_at, created_at")
        .order("created_at", { ascending: false })
        .range(from, from + pageSize - 1);
      if (error) throw new Error(error.message);
      sends.push(...((data as SendRow[]) || []));
      if (!data || data.length < pageSize) break;
    }

    const { data: eventsData, error: eventsError } = await supabaseAdmin
      .from("email_funnel_events")
      .select("user_id, email_day, event_type")
      .limit(50000);
    if (eventsError) throw new Error(eventsError.message);
    const events = (eventsData as EventRow[]) || [];

    const userIds = [...new Set(sends.map((s) => s.user_id))];
    const emailByUser = new Map<string, string>();
    for (let i = 0; i < userIds.length; i += 500) {
      const chunk = userIds.slice(i, i + 500);
      const { data: signups } = await supabaseAdmin
        .from("user_signups")
        .select("user_id, email")
        .in("user_id", chunk);
      for (const s of signups || []) emailByUser.set(s.user_id, s.email);
    }

    const now = new Date();
    const dayMs = 24 * 60 * 60 * 1000;
    const since24h = new Date(now.getTime() - dayMs).toISOString();
    const since7d = new Date(now.getTime() - 7 * dayMs).toISOString();

    const sentAtOf = (s: SendRow) => s.sent_at || s.created_at || "";

    const opens = events.filter((e) => e.event_type === "opened");
    const clicks = events.filter((e) => e.event_type === "clicked");

    const days = Array.from({ length: 8 }, (_, i) => i + 1).map((day) => {
      const daySends = sends.filter((s) => s.email_day === day);
      const dayOpens = new Set(opens.filter((e) => e.email_day === day).map((e) => e.user_id)).size;
      const dayClicks = new Set(clicks.filter((e) => e.email_day === day).map((e) => e.user_id)).size;
      return {
        day,
        label: DAY_LABELS[day] || `Day ${day}`,
        sent: daySends.length,
        sent24h: daySends.filter((s) => sentAtOf(s) >= since24h).length,
        opens: dayOpens,
        clicks: dayClicks,
        openRate: daySends.length ? Math.round((dayOpens / daySends.length) * 1000) / 10 : 0,
        clickRate: daySends.length ? Math.round((dayClicks / daySends.length) * 1000) / 10 : 0,
        recentSends: daySends.slice(0, 100).map((s) => ({
          email: emailByUser.get(s.user_id) || s.user_id,
          sentAt: sentAtOf(s),
          templateVersion: s.template_version,
        })),
      };
    });

    const uniqueOpeners = new Set(opens.map((e) => `${e.user_id}:${e.email_day}`)).size;
    const uniqueClickers = new Set(clicks.map((e) => `${e.user_id}:${e.email_day}`)).size;

    // Sends per calendar date for the last 14 days (for the mini chart)
    const sendsByDate: Array<{ date: string; count: number }> = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * dayMs);
      const dateStr = d.toISOString().slice(0, 10);
      sendsByDate.push({
        date: dateStr,
        count: sends.filter((s) => sentAtOf(s).slice(0, 10) === dateStr).length,
      });
    }

    return NextResponse.json({
      totals: {
        totalSent: sends.length,
        sent24h: sends.filter((s) => sentAtOf(s) >= since24h).length,
        sent7d: sends.filter((s) => sentAtOf(s) >= since7d).length,
        uniqueRecipients: userIds.length,
        totalOpens: uniqueOpeners,
        totalClicks: uniqueClickers,
        openRate: sends.length ? Math.round((uniqueOpeners / sends.length) * 1000) / 10 : 0,
        clickRate: sends.length ? Math.round((uniqueClickers / sends.length) * 1000) / 10 : 0,
      },
      days,
      sendsByDate,
      openClickTrackingLive: events.length > 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_ANALYTICS] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
