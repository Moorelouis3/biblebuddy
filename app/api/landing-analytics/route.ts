import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_EVENTS = new Set([
  "landing_page_visit",
  "clicked_start_journey",
  "started_onboarding",
  "viewed_onboarding_intro",
  "viewed_question_1",
  "viewed_question_2",
  "viewed_question_3_age",
  "viewed_question_3_focus",
  "viewed_question_4",
  "viewed_question_5",
  "completed_question_1",
  "completed_question_2",
  "completed_question_3_age",
  "completed_question_3_focus",
  "completed_question_4",
  "completed_question_5",
  "viewed_results_loading",
  "viewed_results_page",
  "reached_results_page",
  "clicked_yes_start_my_journey",
  "started_guest_journey",
  "viewed_create_account_modal",
  "opened_create_account_modal",
  "created_free_account",
  "created_account_successfully",
  "closed_onboarding",
]);

const MASTER_ACTION_BY_EVENT: Record<string, string> = {
  landing_page_visit: "landing_page_visited",
  clicked_start_journey: "landing_cta_clicked",
  started_onboarding: "onboarding_intro_started",
  viewed_onboarding_intro: "onboarding_intro_viewed",
  completed_question_1: "onboarding_question_completed",
  completed_question_2: "onboarding_question_completed",
  completed_question_3_age: "onboarding_question_completed",
  completed_question_3_focus: "onboarding_question_completed",
  completed_question_4: "onboarding_question_completed",
  completed_question_5: "onboarding_question_completed",
  viewed_results_page: "onboarding_results_viewed",
  reached_results_page: "onboarding_results_viewed",
  clicked_yes_start_my_journey: "onboarding_journey_started",
  started_guest_journey: "onboarding_journey_started",
  created_free_account: "user_signup",
  created_account_successfully: "user_signup",
  closed_onboarding: "onboarding_intro_skipped",
};

function cleanText(value: unknown, fallback = "unknown") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 500) : fallback;
}

export async function POST(request: Request) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = cleanText(body.event_name || body.eventName);
  if (!ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: false, error: "Unsupported event" }, { status: 400 });
  }

  const adminSupabase = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const sessionId = cleanText(body.session_id || body.sessionId);
  const source = cleanText(body.source, "Direct / Unknown");
  const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 1000) : null;
  const pagePath = typeof body.page_path === "string" ? body.page_path.slice(0, 500) : "/";
  const metadata = typeof body.metadata === "object" && body.metadata !== null ? body.metadata : {};
  const userId = typeof body.user_id === "string" ? body.user_id : null;

  const { error } = await adminSupabase.from("landing_page_events").insert({
    event_name: eventName,
    session_id: sessionId,
    user_id: userId,
    source,
    referrer,
    page_path: pagePath,
    metadata,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const masterActionType = MASTER_ACTION_BY_EVENT[eventName];
  if (masterActionType) {
    const lowerAgent = request.headers.get("user-agent") || "";
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(lowerAgent);
    const questionMatch = eventName.match(/question_(\d)/);
    const labelParts = [
      `event=${eventName}`,
      `source=${source}`,
      questionMatch ? `question=${questionMatch[1]}` : "",
    ].filter(Boolean);
    const { error: masterActionError } = await adminSupabase.from("master_actions").insert({
      user_id: userId,
      session_id: sessionId,
      username: userId ? "Bible Buddy User" : "Anonymous Visitor",
      action_type: masterActionType,
      action_label: `BibleBuddy Funnel | ${labelParts.join(" | ")}`,
      journey_day: null,
      account_status: userId ? "guest_or_free" : "anonymous",
      device_info: {
        device: isMobile ? "mobile" : "desktop",
        userAgent: lowerAgent.slice(0, 500),
      },
      event_metadata: {
        landingEvent: eventName,
        source,
        referrer,
        pagePath,
        ...metadata,
      },
    });
    if (masterActionError) {
      console.warn("[LANDING_ANALYTICS] master_actions mirror skipped:", masterActionError.message);
    }
  }

  return NextResponse.json({ ok: true });
}
