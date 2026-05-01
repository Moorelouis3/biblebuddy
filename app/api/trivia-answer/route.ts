import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ACTION_TYPE } from '@/lib/actionTypes';

// Server-side Supabase client with service role (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    const { userId, questionId, username, isCorrect, book } = await request.json();

    console.log('Trivia answer API called:', { userId, questionId, username, isCorrect, book });

    if (!userId || !questionId || isCorrect === undefined || !book) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, questionId, isCorrect, book' },
        { status: 400 }
      );
    }

    // Format action_label (genesis01 -> genesis_01)
    const actionLabel = questionId.replace(/(\w+)(\d+)/, "$1_$2");

    // Check if user has ever answered this question before (correct or incorrect)
    const { data: existing, error: selectError } = await supabase
      .from('trivia_question_progress')
      .select('id, is_correct')
      .eq('user_id', userId)
      .eq('book', book)
      .eq('question_id', questionId)
      .maybeSingle();

    if (selectError) {
      console.error("Error checking trivia progress:", selectError);
      return NextResponse.json({ error: "Failed to record trivia progress" }, { status: 500 });
    }

    const isFirstAnswerForQuestion = !existing;
    const isFirstCorrectForQuestion = isCorrect === true && existing?.is_correct !== true;

    if (isFirstAnswerForQuestion) {
      console.log("Inserting first trivia answer:", {
        userId,
        actionType: ACTION_TYPE.trivia_question_answered,
        actionLabel,
        username,
      });

      const { error: attemptError } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.trivia_question_answered,
        action_label: actionLabel,
        username: username || "User",
      });

      if (attemptError) {
        console.error("Error inserting trivia attempt:", attemptError);
        return NextResponse.json({ error: "Failed to record trivia answer" }, { status: 500 });
      }
    }

    let awardedPoint = false;

    // Award 1 point only the first time a user gets a question correct.
    if (isFirstCorrectForQuestion) {
      const { error: correctError } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.trivia_question_correct,
        action_label: actionLabel,
        username: username || "User",
      });
      if (correctError) {
        console.error("Error inserting trivia correct:", correctError);
        return NextResponse.json({ error: "Failed to record trivia answer" }, { status: 500 });
      }
      awardedPoint = true;
    }

    // Keep progress sticky once a question has ever been answered correctly.
    console.log("Attempting to upsert trivia progress:", { userId, book, questionId, isCorrect });

    let progressError;
    if (existing) {
      // Update progress
      const { error } = await supabase
        .from('trivia_question_progress')
        .update({
          is_correct: existing.is_correct === true || isCorrect === true,
          answered_at: new Date().toISOString()
        })
        .eq('id', existing.id);
      progressError = error;
    } else {
      // First time answering this question
      const { error } = await supabase
        .from('trivia_question_progress')
        .insert({
          user_id: userId,
          book: book,
          question_id: questionId,
          is_correct: isCorrect
        });
      progressError = error;
    }

    if (progressError) {
      console.error('Error recording trivia progress:', progressError);
      console.error('Progress error details:', JSON.stringify(progressError, null, 2));
      return NextResponse.json(
        { error: 'Failed to record trivia progress' },
        { status: 500 }
      );
    }

    // Keep profile_stats.trivia_questions_answered aligned with unique answered questions.
    const { count: uniqueAnsweredCount, error: statsCountError } = await supabase
      .from("trivia_question_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (statsCountError) {
      console.error("Error counting trivia_question_progress for profile_stats sync:", statsCountError);
    } else {
      const { error: statsUpdateError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            trivia_questions_answered: uniqueAnsweredCount || 0,
          },
          { onConflict: "user_id" },
        );

      if (statsUpdateError) {
        console.error("Error updating profile_stats trivia_questions_answered:", statsUpdateError);
      }
    }

    console.log('Successfully recorded trivia progress');
    console.log('Successfully inserted trivia answer into master_actions and trivia_question_progress');
    return NextResponse.json({ success: true, awardedPoint });
  } catch (error) {
    console.error('Unexpected error in trivia-answer API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
