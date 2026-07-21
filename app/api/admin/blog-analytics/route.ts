import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BLOG_ARTICLES } from "@/lib/blogContent";

type BlogAnalyticsWindowKey = "today" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "this_month" | "lifetime";

type BlogPageViewRow = {
  article_slug: string;
  session_id: string;
  created_at: string;
};

function getBlogAnalyticsWindowKey(req: NextRequest): BlogAnalyticsWindowKey {
  const raw = req.nextUrl.searchParams.get("window");
  return raw === "today" ||
    raw === "yesterday" ||
    raw === "24h" ||
    raw === "7d" ||
    raw === "30d" ||
    raw === "90d" ||
    raw === "this_month" ||
    raw === "lifetime"
    ? raw
    : "today";
}

function getBlogAnalyticsDateRange(windowKey: BlogAnalyticsWindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  if (windowKey === "today") return { start: todayStart, end: null as Date | null, label: "Today" };
  if (windowKey === "yesterday") {
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    return { start: yesterdayStart, end: todayStart, label: "Yesterday" };
  }
  if (windowKey === "7d") return { start: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), end: null, label: "Last 7 days" };
  if (windowKey === "30d") return { start: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), end: null, label: "Last 30 days" };
  if (windowKey === "90d") return { start: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), end: null, label: "Last 90 days" };
  if (windowKey === "this_month") return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: null, label: "This month" };
  if (windowKey === "lifetime") return { start: new Date(0), end: null, label: "Lifetime" };
  return { start: new Date(now.getTime() - 24 * 60 * 60 * 1000), end: null, label: "Last 24 hours" };
}

function getPreviousBlogAnalyticsDateRange(windowKey: BlogAnalyticsWindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  if (windowKey === "today") {
    const previousStart = new Date(todayStart);
    previousStart.setDate(previousStart.getDate() - 1);
    return { start: previousStart, end: todayStart };
  }
  if (windowKey === "yesterday") {
    const previousEnd = new Date(todayStart);
    previousEnd.setDate(previousEnd.getDate() - 1);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - 1);
    return { start: previousStart, end: previousEnd };
  }
  if (windowKey === "24h") {
    const end = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return { start: new Date(end.getTime() - 24 * 60 * 60 * 1000), end };
  }
  if (windowKey === "7d") {
    const end = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return { start: new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000), end };
  }
  if (windowKey === "30d") {
    const end = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return { start: new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000), end };
  }
  if (windowKey === "90d") {
    const end = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    return { start: new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000), end };
  }
  return null;
}

function percentChange(current: number, previous: number) {
  if (previous <= 0 && current <= 0) return 0;
  if (previous <= 0) return 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function isWithinRange(created: Date, range: { start: Date; end: Date | null }) {
  return created >= range.start && (!range.end || created < range.end);
}

function getBlogSeriesBucket(windowKey: BlogAnalyticsWindowKey) {
  if (windowKey === "today" || windowKey === "24h" || windowKey === "yesterday") return "hour";
  if (windowKey === "90d") return "week";
  if (windowKey === "lifetime") return "month";
  return "day";
}

function startOfWeek(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const day = copy.getDay();
  const diff = (day + 6) % 7;
  copy.setDate(copy.getDate() - diff);
  return copy;
}

function bucketKeyAndLabel(date: Date, bucket: "hour" | "week" | "month" | "day") {
  if (bucket === "hour") {
    return {
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`,
      label: date.toLocaleTimeString("en-US", { hour: "numeric" }),
    };
  }
  if (bucket === "week") {
    const weekStart = startOfWeek(date);
    return { key: weekStart.toISOString().slice(0, 10), label: weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }) };
  }
  if (bucket === "month") {
    return { key: `${date.getFullYear()}-${date.getMonth() + 1}`, label: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }) };
  }
  return { key: date.toISOString().slice(0, 10), label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) };
}

function buildViewsSeries(rows: BlogPageViewRow[], windowKey: BlogAnalyticsWindowKey) {
  const bucket = getBlogSeriesBucket(windowKey);
  const counts = new Map<string, number>();
  const labelByKey = new Map<string, string>();

  rows.forEach((row) => {
    const { key, label } = bucketKeyAndLabel(new Date(row.created_at), bucket);
    counts.set(key, (counts.get(key) || 0) + 1);
    labelByKey.set(key, label);
  });

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({ label: labelByKey.get(key) || key, value }));
}

function buildVisitorsSeries(rows: BlogPageViewRow[], windowKey: BlogAnalyticsWindowKey) {
  const bucket = getBlogSeriesBucket(windowKey);
  const sessionsByKey = new Map<string, Set<string>>();
  const labelByKey = new Map<string, string>();

  rows.forEach((row) => {
    const { key, label } = bucketKeyAndLabel(new Date(row.created_at), bucket);
    if (!sessionsByKey.has(key)) sessionsByKey.set(key, new Set());
    sessionsByKey.get(key)!.add(row.session_id);
    labelByKey.set(key, label);
  });

  return Array.from(sessionsByKey.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, sessions]) => ({ label: labelByKey.get(key) || key, value: sessions.size }));
}

function titleForSlug(slug: string) {
  const catalogMatch = BLOG_ARTICLES.find(
    (article) => article.canonicalPath === slug || `/blog/${article.slug}` === slug
  );
  if (catalogMatch) return catalogMatch.title;
  const lastSegment = slug.split("/").filter(Boolean).pop() || slug;
  return lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function requireOwner(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey) return false;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  return data.user.email === "moorelouis3@gmail.com";
}

function isMissingViewsTable(message?: string | null) {
  return /blog_page_views|schema cache|does not exist|could not find the table/i.test(message || "");
}

export async function GET(req: NextRequest) {
  if (!(await requireOwner(req))) {
    return NextResponse.json({ error: "Owner only" }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  try {
    const windowKey = getBlogAnalyticsWindowKey(req);
    const range = getBlogAnalyticsDateRange(windowKey);
    const previousRange = getPreviousBlogAnalyticsDateRange(windowKey);
    const broadestStart = previousRange && previousRange.start < range.start ? previousRange.start : range.start;

    const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabaseAdmin
      .from("blog_page_views")
      .select("article_slug, session_id, created_at")
      .gte("created_at", broadestStart.toISOString())
      .limit(200000);

    if (error) {
      if (isMissingViewsTable(error.message)) {
        return NextResponse.json({
          window: windowKey,
          label: range.label,
          totalViews: 0,
          totalVisitors: 0,
          comparison: { current: 0, previous: 0, change: 0 },
          visitorsComparison: { current: 0, previous: 0, change: 0 },
          viewsSeries: [],
          visitorsSeries: [],
          topArticles: [],
          tableMissing: true,
          updatedAt: new Date().toISOString(),
        });
      }
      throw new Error(error.message);
    }

    const allRows = (data || []) as BlogPageViewRow[];
    const rangeRows = allRows.filter((row) => isWithinRange(new Date(row.created_at), range));
    const previousRangeRows = previousRange
      ? allRows.filter((row) => isWithinRange(new Date(row.created_at), previousRange))
      : [];

    const totalViews = rangeRows.length;
    const totalVisitors = new Set(rangeRows.map((row) => row.session_id)).size;
    const previousViews = previousRangeRows.length;
    const previousVisitors = new Set(previousRangeRows.map((row) => row.session_id)).size;

    const viewsByArticle = new Map<string, { views: number; visitors: Set<string> }>();
    rangeRows.forEach((row) => {
      const entry = viewsByArticle.get(row.article_slug) || { views: 0, visitors: new Set<string>() };
      entry.views += 1;
      entry.visitors.add(row.session_id);
      viewsByArticle.set(row.article_slug, entry);
    });

    const topArticles = Array.from(viewsByArticle.entries())
      .map(([slug, entry]) => ({
        slug,
        title: titleForSlug(slug),
        views: entry.views,
        visitors: entry.visitors.size,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 25);

    return NextResponse.json({
      window: windowKey,
      label: range.label,
      totalViews,
      totalVisitors,
      comparison: {
        current: totalViews,
        previous: previousViews,
        change: percentChange(totalViews, previousViews),
      },
      visitorsComparison: {
        current: totalVisitors,
        previous: previousVisitors,
        change: percentChange(totalVisitors, previousVisitors),
      },
      viewsSeries: buildViewsSeries(rangeRows, windowKey),
      visitorsSeries: buildVisitorsSeries(rangeRows, windowKey),
      topArticles,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[BLOG_ANALYTICS] Failed to load blog analytics:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load blog analytics." },
      { status: 500 }
    );
  }
}
