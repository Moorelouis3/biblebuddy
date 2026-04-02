import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "@/lib/actionTypes";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const { userId, bookName, bookSlug, chapter, questionId, answer, reference, username } = await request.json();

    if (!userId || !bookName || !bookSlug || !chapter || !questionId || !answer) {
      return NextResponse.json(
        { error: "Missing required fields: userId, bookName, bookSlug, chapter, questionId, answer" },
        { status: 400 }
      );
    }

    const actionLabel = `${bookName} ${chapter} - ${questionId} - ${answer.toLowerCase()}${reference ? ` (${reference})` : ""}`;

    let finalUsername = typeof username === "string" && username.trim().length > 0 ? username.trim() : null;

    if (!finalUsername) {
      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("display_name, username")
        .eq("user_id", userId)
        .maybeSingle();

      finalUsername =
        profileStats?.display_name?.trim() ||
        profileStats?.username?.trim() ||
        "User";
    }

    const { error: insertError } = await supabase
      .from("master_actions")
      .insert({
        user_id: userId,
        username: finalUsername,
        action_type: ACTION_TYPE.scrambled_word_answered,
        action_label: actionLabel,
      });

    if (insertError) {
      console.error("Error inserting scrambled answer:", insertError);
      return NextResponse.json(
        { error: insertError.message || "Failed to record scrambled answer" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error in scrambled-answer API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
