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
    const actionLabel = questionId.replace(/(\w+)(\d+)/, '$1_$2');

    console.log('Inserting trivia answer:', { userId, actionType: ACTION_TYPE.trivia_question_answered, actionLabel, username });

    // Insert into master_actions using service role (bypasses RLS)
    const { error: insertError } = await supabase
      .from('master_actions')
      .insert({
        user_id: userId,
        action_type: ACTION_TYPE.trivia_question_answered,
        action_label: actionLabel,
        username: username || 'User'
      });

    if (insertError) {
      console.error('Error inserting trivia answer:', insertError);
      return NextResponse.json(
        { error: 'Failed to record trivia answer' },
        { status: 500 }
      );
    }

    // Insert or update trivia_question_progress
    console.log('Attempting to upsert trivia progress:', { userId, book, questionId, isCorrect });
    


    // Check if user has ever answered this question before (correct or incorrect)
    const { data: existing, error: selectError } = await supabase
      .from('trivia_question_progress')
      .select('id, is_correct')
      .eq('user_id', userId)
      .eq('book', book)
      .eq('question_id', questionId)
      .maybeSingle();

    let progressError;
    if (existing) {
      // Update progress (do not increment correct count, DB trigger handles XP)
      const { error } = await supabase
        .from('trivia_question_progress')
        .update({
          is_correct: isCorrect,
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
      // No direct XP/leveling logic here; DB trigger handles it
    }

    if (progressError) {
      console.error('Error recording trivia progress:', progressError);
      console.error('Progress error details:', JSON.stringify(progressError, null, 2));
      return NextResponse.json(
        { error: 'Failed to record trivia progress' },
        { status: 500 }
      );
    }

    console.log('Successfully recorded trivia progress');
    console.log('Successfully inserted trivia answer into master_actions and trivia_question_progress');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in trivia-answer API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}