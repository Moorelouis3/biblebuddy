import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { consumeCredit } from "@/lib/consumeCredit";
import { ACTION_TYPE, isActionType } from "@/lib/actionTypes";

type ConsumeCreditRequest = {
  actionType?: string;
};

const allowedActionTypes = new Set([
  ACTION_TYPE.chapter_notes_viewed,
  ACTION_TYPE.devotional_day_started,
  ACTION_TYPE.trivia_started,
]);

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
  if (!isActionType(actionType) || !allowedActionTypes.has(actionType)) {
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

  const result = await consumeCredit(user.id, actionType);

  if (!result.ok && result.reason !== "no_credits") {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result, { status: 200 });
}
