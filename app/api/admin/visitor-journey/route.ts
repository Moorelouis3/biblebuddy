import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// One visitor's story, step by step (Louis, 2026-09-09: "came from
// Facebook, came to landing page, clicked start studying, opened a
// devotional - I need to know what these people are doing"). Stitches
// together landing_page_events, blog_page_views and master_actions for a
// single visitor (by session id and/or user id) into a readable timeline.
// Fed by the Traffic Sources drill-down on /admin/analytics.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type JourneyStep = {
  at: string;
  label: string;
  detail?: string | null;
  link?: string | null;
};

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
  return {
    supabase: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }),
  };
}

const ACTION_LABELS: Record<string, string> = {
  user_login: "Came back (logged in)",
  user_signup: "Signed up",
  dashboard_viewed: "Opened the app home",
  devotional_opened: "Opened a devotional",
  devotionals_viewed: "Browsed devotionals",
  devotional_day_completed: "Completed a devotional day",
  bible_reader_viewed: "Opened the Bible",
  chapter_completed: "Finished a Bible chapter",
  chapter_notes_reviewed: "Read chapter study notes",
  bible_in_one_year_day_viewed: "Opened a Bible in One Year day",
  bible_year_audio_played: "Played a day's audio",
  bible_year_audio_completed: "Finished a day's audio",
  study_group_feed_viewed: "Visited the Group",
  group_message_sent: "Commented in the Group",
  trivia_started: "Started trivia",
  trivia_question_correct: "Answered trivia",
  blog_post_viewed: "Read a blog post",
  understand_verse_of_the_day: "Opened Verse of the Day",
  reading_plan_chapter_completed: "Finished a plan chapter",
};

function prettifyAction(actionType: string) {
  return ACTION_LABELS[actionType] || actionType.replace(/_/g, " ").replace(/^\w/, (char) => char.toUpperCase());
}

function metadataText(metadata: unknown, keys: string[]) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return "";
  for (const key of keys) {
    const value = (metadata as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { supabase } = auth;

  const id = (request.nextUrl.searchParams.get("id") || "").trim();
  if (!id || id.length > 100) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  try {
    const [bySession, byUser] = await Promise.all([
      supabase
        .from("landing_page_events")
        .select("event_name, session_id, user_id, source, referrer, page_path, metadata, created_at")
        .eq("session_id", id)
        .order("created_at", { ascending: true })
        .limit(300),
      supabase
        .from("landing_page_events")
        .select("event_name, session_id, user_id, source, referrer, page_path, metadata, created_at")
        .eq("user_id", id)
        .order("created_at", { ascending: true })
        .limit(300),
    ]);
    const landingRowsRaw = [...(bySession.data || []), ...(byUser.data || [])];
    const seenLanding = new Set<string>();
    const landingRows = landingRowsRaw.filter((row) => {
      const key = `${row.event_name}:${row.created_at}`;
      if (seenLanding.has(key)) return false;
      seenLanding.add(key);
      return true;
    });

    // A session id can resolve to a user id once they created an account.
    const userId =
      landingRows.map((row) => row.user_id).find((value): value is string => Boolean(value)) ||
      (id.length === 36 ? id : null);

    const [blogBySession, blogByUser] = await Promise.all([
      supabase
        .from("blog_page_views")
        .select("article_slug, referrer, created_at, session_id, user_id")
        .eq("session_id", id)
        .order("created_at", { ascending: true })
        .limit(100),
      userId
        ? supabase
            .from("blog_page_views")
            .select("article_slug, referrer, created_at, session_id, user_id")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .limit(100)
        : Promise.resolve({ data: [] as any[] }),
    ]);
    const blogRows = [...(blogBySession.data || []), ...((blogByUser as any).data || [])];

    let actionRows: Array<{ action_type: string; action_label: string | null; created_at: string }> = [];
    let visitorLabel = `Session ${id.slice(0, 8)}`;
    if (userId) {
      const [{ data: actions }, { data: profile }] = await Promise.all([
        supabase
          .from("master_actions")
          .select("action_type, action_label, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: true })
          .limit(400),
        supabase.from("profile_stats").select("display_name, username, account_type").eq("user_id", userId).maybeSingle(),
      ]);
      actionRows = actions || [];
      visitorLabel = profile?.display_name || profile?.username || `User ${userId.slice(0, 8)}`;
    }

    const steps: JourneyStep[] = [];
    for (const row of landingRows) {
      const at = row.created_at || "";
      if (row.event_name === "landing_page_visit" || row.event_name === "landing_page_visited") {
        const referrer = row.referrer || metadataText(row.metadata, ["referrer", "document_referrer", "initial_referrer"]);
        const cleanPath = (row.page_path || "/").split("?")[0].replace(/\/{2,}/g, "/") || "/";
        steps.push({
          at,
          label: cleanPath === "/" ? "Arrived on the landing page" : `Arrived on ${cleanPath}`,
          detail: referrer ? `came from ${referrer}` : "typed the address / no referrer",
          link: referrer || null,
        });
      } else if (row.event_name === "video_played") {
        steps.push({ at, label: "Started the landing video" });
      } else if (row.event_name === "video_completed") {
        steps.push({ at, label: "Watched the landing video to the end" });
      } else if (row.event_name === "guest_account_created") {
        steps.push({ at, label: "Became a new user (started studying as guest)" });
      } else if (row.event_name === "created_free_account" || row.event_name === "created_account_successfully") {
        steps.push({ at, label: "Created a full account" });
      } else if (row.event_name === "start_button_clicked" || row.event_name === "cta_clicked") {
        steps.push({ at, label: "Clicked Start Studying" });
      }
    }
    for (const row of blogRows) {
      // article_slug may be a bare slug or a full legacy path.
      const rawSlug = row.article_slug || "unknown";
      const path = rawSlug.startsWith("/") ? rawSlug : `/blog/${rawSlug}`;
      const postName = (path.split("/").filter(Boolean).pop() || "unknown").replace(/-/g, " ");
      steps.push({
        at: row.created_at || "",
        label: `Read blog post: ${postName}`,
        detail: row.referrer && !/mybiblebuddy/i.test(row.referrer) ? `came from ${row.referrer}` : null,
        link: `https://www.mybiblebuddy.net${path}`,
      });
    }
    for (const row of actionRows) {
      steps.push({
        at: row.created_at,
        label: prettifyAction(row.action_type),
        detail: row.action_label && row.action_label.length < 90 ? row.action_label : null,
      });
    }

    steps.sort((a, b) => (a.at || "").localeCompare(b.at || ""));

    // Collapse runs of the same label into one step with a count.
    const collapsed: Array<JourneyStep & { count: number }> = [];
    for (const step of steps) {
      const previous = collapsed[collapsed.length - 1];
      if (previous && previous.label === step.label) {
        previous.count += 1;
        continue;
      }
      collapsed.push({ ...step, count: 1 });
    }

    const lastAt = collapsed.length ? collapsed[collapsed.length - 1].at : null;
    const minutesSinceLast = lastAt ? Math.floor((Date.now() - new Date(lastAt).getTime()) / 60000) : null;

    return NextResponse.json({
      visitorLabel,
      userId,
      steps: collapsed.slice(0, 60).map((step) => ({
        at: step.at,
        label: step.count > 1 ? `${step.label} (x${step.count})` : step.label,
        detail: step.detail || null,
        link: step.link || null,
      })),
      leftAgoMinutes: minutesSinceLast,
      becameUser: Boolean(userId),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load journey." },
      { status: 500 },
    );
  }
}
