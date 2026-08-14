import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Blog view stats for Content Buddy's Blog page - real counts from
// blog_page_views (every reader, logged in or not), not a Google
// estimate. Same service-to-service auth as /api/stats/second-brain,
// failing CLOSED when the secret is missing.

function isAuthorized(request: NextRequest) {
  const secret = process.env.SECOND_BRAIN_STATS_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

type ViewRow = { article_slug: string; session_id: string | null; created_at: string };

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // The blog is young enough to aggregate in memory (the 100k cap is a
  // guard, not an expectation). If this ever hits the cap, move the
  // aggregation into a Postgres RPC instead of raising the cap.
  const { data, error, count } = await supabaseAdmin
    .from("blog_page_views")
    .select("article_slug, session_id, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(100000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data || []) as ViewRow[];
  const capped = rows.length === 100000;
  const now = Date.now();
  const cutoff30d = now - 30 * 24 * 60 * 60 * 1000;
  const cutoff24h = now - 24 * 60 * 60 * 1000;

  let views30d = 0;
  let views24h = 0;
  const sessions30d = new Set<string>();
  const daily = new Map<string, number>();
  const perPage30d = new Map<string, number>();
  const perPageLifetime = new Map<string, number>();

  for (const r of rows) {
    const t = new Date(r.created_at).getTime();
    perPageLifetime.set(r.article_slug, (perPageLifetime.get(r.article_slug) || 0) + 1);
    if (t >= cutoff30d) {
      views30d++;
      if (r.session_id) sessions30d.add(r.session_id);
      const day = r.created_at.slice(0, 10);
      daily.set(day, (daily.get(day) || 0) + 1);
      perPage30d.set(r.article_slug, (perPage30d.get(r.article_slug) || 0) + 1);
    }
    if (t >= cutoff24h) views24h++;
  }

  return NextResponse.json({
    totalViewsLifetime: count ?? rows.length,
    totalViews30d: views30d,
    views24h,
    uniqueVisitors30d: sessions30d.size,
    daily: [...daily.entries()].sort().map(([date, views]) => ({ date, views })),
    perPage: [...perPageLifetime.entries()]
      .map(([path, lifetime]) => ({ path, viewsLifetime: lifetime, views30d: perPage30d.get(path) || 0 }))
      .sort((a, b) => b.views30d - a.views30d || b.viewsLifetime - a.viewsLifetime),
    capped,
    generatedAt: new Date().toISOString(),
  });
}
