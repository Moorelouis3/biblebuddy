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

  const { error } = await adminSupabase.from("landing_page_events").insert({
    event_name: eventName,
    session_id: cleanText(body.session_id || body.sessionId),
    user_id: typeof body.user_id === "string" ? body.user_id : null,
    source: cleanText(body.source, "Direct / Unknown"),
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 1000) : null,
    page_path: typeof body.page_path === "string" ? body.page_path.slice(0, 500) : "/",
    metadata: typeof body.metadata === "object" && body.metadata !== null ? body.metadata : {},
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
