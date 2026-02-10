import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { consumeCredit } from "@/lib/consumeCredit";
import { ACTION_TYPE, isActionType } from "@/lib/actionTypes";

type ConsumeCreditRequest = {
  actionType?: string;
};

type AllowedActionType =
  | typeof ACTION_TYPE.bible_in_one_year_day_viewed
  | typeof ACTION_TYPE.chapter_notes_viewed
  | typeof ACTION_TYPE.devotional_day_completed
  | typeof ACTION_TYPE.devotional_day_started
  | typeof ACTION_TYPE.devotional_day_viewed
  | typeof ACTION_TYPE.keyword_viewed
  | typeof ACTION_TYPE.note_started
  | typeof ACTION_TYPE.person_viewed
  | typeof ACTION_TYPE.place_viewed
  | typeof ACTION_TYPE.trivia_started;

const allowedActionTypes = new Set<AllowedActionType>([
  ACTION_TYPE.bible_in_one_year_day_viewed,
  ACTION_TYPE.chapter_notes_viewed,
  ACTION_TYPE.devotional_day_completed,
  ACTION_TYPE.devotional_day_started,
  ACTION_TYPE.devotional_day_viewed,
  ACTION_TYPE.keyword_viewed,
  ACTION_TYPE.note_started,
  ACTION_TYPE.person_viewed,
  ACTION_TYPE.place_viewed,
  ACTION_TYPE.trivia_started,
]);

function isAllowedActionType(value: string): value is AllowedActionType {
  return isActionType(value) && allowedActionTypes.has(value as AllowedActionType);
}

export async function POST(req: NextRequest) {
  let body: ConsumeCreditRequest;
  try {
    body = (await req.json()) as ConsumeCreditRequest;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request format" },
      { status: 400 }
    );
  }

  const actionType = typeof body.actionType === "string" ? body.actionType : "";
  if (!isAllowedActionType(actionType)) {
    return NextResponse.json(
      { ok: false, error: "Invalid action type" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (serviceKey && url) {
    const supabaseAdmin = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: profileStats } = await supabaseAdmin
      .from("profile_stats")
      .select("daily_credits, last_credit_reset")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileStats && profileStats.daily_credits === null) {
      const today = new Date().toISOString().slice(0, 10);
      await supabaseAdmin
        .from("profile_stats")
        .update({
          daily_credits: 5,
          last_credit_reset: profileStats.last_credit_reset ?? today,
        })
        .eq("user_id", user.id);
    }
  }

  const result = await consumeCredit(user.id, actionType);

  if (!result.ok && result.reason !== "no_credits") {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
