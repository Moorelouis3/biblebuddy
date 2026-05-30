import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureWeeklyGroupPollPost } from "@/lib/weeklyGroupPollAdmin";
import { ensureWeeklyGroupQuestionPost } from "@/lib/weeklyGroupQuestionAdmin";
import { ensureWeeklyGroupSeriesPost } from "@/lib/weeklyGroupSeriesPostAdmin";
import { ensureWeeklyGroupTriviaPost } from "@/lib/weeklyGroupTriviaAdmin";
import { GROUP_SCHEDULE_TIME_ZONE } from "@/lib/groupScheduleTimeZone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function getBerlinWeekday(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    weekday: "short",
  }).format(date) as "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
}

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

  const { data: groups, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, created_at")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });

  if (groupError) {
    return NextResponse.json({ error: groupError.message || "Could not load official study group." }, { status: 500 });
  }

  const targetGroup =
    groups?.find((row) => row.name === "Bible Buddy Study Group") ??
    groups?.find((row) => row.name === "Hope Nation") ??
    null;

  if (!targetGroup) {
    return NextResponse.json({ error: "Official study group not found." }, { status: 404 });
  }

  const now = new Date();
  const weekday = getBerlinWeekday(now);

  try {
    let result:
      | Awaited<ReturnType<typeof ensureWeeklyGroupSeriesPost>>
      | Awaited<ReturnType<typeof ensureWeeklyGroupTriviaPost>>
      | Awaited<ReturnType<typeof ensureWeeklyGroupPollPost>>
      | Awaited<ReturnType<typeof ensureWeeklyGroupQuestionPost>>;

    switch (weekday) {
      case "Mon":
        result = await ensureWeeklyGroupSeriesPost(supabaseAdmin, targetGroup.id, "update_monday", null, now);
        break;
      case "Tue":
        result = await ensureWeeklyGroupTriviaPost(supabaseAdmin, targetGroup.id, null, now);
        break;
      case "Wed":
        result = await ensureWeeklyGroupPollPost(supabaseAdmin, targetGroup.id, null, now);
        break;
      case "Thu":
        result = await ensureWeeklyGroupQuestionPost(supabaseAdmin, targetGroup.id, null, now);
        break;
      case "Fri":
        result = await ensureWeeklyGroupSeriesPost(supabaseAdmin, targetGroup.id, "who_was_this_friday", null, now);
        break;
      case "Sat":
        result = await ensureWeeklyGroupSeriesPost(supabaseAdmin, targetGroup.id, "bible_study_saturday", null, now);
        break;
      case "Sun":
      default:
        result = await ensureWeeklyGroupSeriesPost(supabaseAdmin, targetGroup.id, "prayer_request_sunday", null, now);
        break;
    }

    return NextResponse.json({ weekday, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not publish recurring group post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
