import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isMissingViewsTable(message?: string | null) {
  return /blog_page_views|schema cache|does not exist|could not find the table/i.test(message || "");
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const articleSlug = typeof body?.article_slug === "string" ? body.article_slug.trim().slice(0, 500) : "";
  const sessionId = typeof body?.session_id === "string" ? body.session_id.trim().slice(0, 200) : "";
  const referrer = typeof body?.referrer === "string" ? body.referrer.slice(0, 1000) : null;

  const isTrackablePath =
    articleSlug.startsWith("/bible-study-hub/") ||
    articleSlug.startsWith("/bible-study-tips/") ||
    articleSlug.startsWith("/blog/");

  if (!isTrackablePath || !sessionId) {
    return NextResponse.json({ ok: false, error: "Invalid view payload." }, { status: 400 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  let userId: string | null = null;

  if (token) {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (anonKey) {
      const supabaseAuth = createClient(supabaseUrl, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data: userData } = await supabaseAuth.auth.getUser(token);
      userId = userData.user?.id || null;
    }
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // The browser that made the view, so no-referrer traffic can be split into
  // people, the app (the "BibleBuddyApp" marker) and bots at read time
  // (Louis, 2026-11-21). See ADD_BLOG_PAGE_VIEWS_USER_AGENT.sql.
  const userAgent = (request.headers.get("user-agent") || "").slice(0, 300) || null;

  const row = {
    article_slug: articleSlug,
    session_id: sessionId,
    user_id: userId,
    referrer,
  };

  let { error } = await supabaseAdmin.from("blog_page_views").insert({ ...row, user_agent: userAgent });

  // A database without the user_agent column yet must still count the view.
  if (error && /user_agent/i.test(error.message || "")) {
    ({ error } = await supabaseAdmin.from("blog_page_views").insert(row));
  }

  if (error) {
    if (isMissingViewsTable(error.message)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
