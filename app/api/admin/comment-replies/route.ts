import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadLibrary } from "@/lib/commentReplies/store";

/**
 * Louis's panel for the zero-AI study-comment replier.
 *
 * GET  - the library, what it has decided lately, the review list, and the
 *        short comments it keeps seeing with no rule to match them.
 * POST - approve / disable a template, add one, disable a rule, and clear a
 *        pattern off the list.
 *
 * Deliberately no AI anywhere in here either: an admin page that could write a
 * template with a model would be the same leak by another door.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

async function requireLouis(request: NextRequest): Promise<{ supabase: SupabaseClient } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const supabaseAuth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error } = await supabaseAuth.auth.getUser(token);
  if (error || (userData.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return { supabase: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }) };
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const db = auth.supabase;

  const library = await loadLibrary(db);

  const [log, patterns, allTemplates] = await Promise.all([
    db.from("comment_reply_log").select("*").order("created_at", { ascending: false }).limit(200),
    db.from("comment_reply_patterns").select("*").eq("status", "new").order("seen_count", { ascending: false }).limit(50),
    db.from("comment_reply_templates").select("*").order("category_slug", { ascending: true }).limit(500),
  ]);

  const rows = log.data || [];
  const since = Date.now() - 30 * 86_400_000;
  const last30 = rows.filter((r) => new Date(r.created_at as string).getTime() >= since);
  const tally = (action: string) => last30.filter((r) => r.action === action).length;

  // The review list is the useful half of this page: comments the system
  // deliberately refused to answer, newest first, for Louis to answer himself.
  const review = rows.filter((r) => r.action === "review").slice(0, 60);
  const reviewIds = review.map((r) => r.comment_id as string);
  const { data: reviewComments } = reviewIds.length
    ? await db.from("article_comments").select("id, article_slug, user_name, content, created_at").in("id", reviewIds)
    : { data: [] as Array<Record<string, unknown>> };
  const byId = new Map((reviewComments || []).map((c) => [c.id as string, c]));

  return NextResponse.json({
    librarySource: library.source,
    categories: library.categories,
    rules: library.rules,
    templates: allTemplates.data ?? library.templates,
    stats: {
      last30Total: last30.length,
      replied: tally("replied"),
      review: tally("review"),
      skipped: tally("skipped"),
      shadow: tally("shadow"),
      // The whole point, stated plainly on the page.
      aiCalls: 0,
    },
    review: review.map((r) => ({
      ...r,
      comment: byId.get(r.comment_id as string) ?? null,
    })),
    patterns: patterns.data || [],
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const db = auth.supabase;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON." }, { status: 400 });
  }
  const action = String(body.action || "");

  if (action === "approveTemplate" || action === "disableTemplate") {
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    const patch = action === "approveTemplate" ? { approved: true, enabled: true } : { enabled: false };
    const { error } = await db.from("comment_reply_templates").update(patch).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "addTemplate") {
    const categorySlug = String(body.categorySlug || "");
    const text = String(body.body || "").trim();
    if (!categorySlug || !text) return NextResponse.json({ error: "categorySlug and body required." }, { status: 400 });
    // Added by hand by Louis, so it is approved on the spot. Anything the
    // pattern finder proposes arrives with approved = false instead.
    const { error } = await db
      .from("comment_reply_templates")
      .insert({ category_slug: categorySlug, body: text, approved: true, enabled: true, source: "seed" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "disableRule") {
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    const { error } = await db.from("comment_reply_rules").update({ enabled: false }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "dismissPattern" || action === "handlePattern") {
    const fingerprint = String(body.fingerprint || "");
    if (!fingerprint) return NextResponse.json({ error: "fingerprint required." }, { status: 400 });
    const { error } = await db
      .from("comment_reply_patterns")
      .update({ status: action === "dismissPattern" ? "dismissed" : "handled", reviewed_at: new Date().toISOString() })
      .eq("fingerprint", fingerprint);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
}
