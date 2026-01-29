import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    console.log('Inserting trivia answer:', { userId, actionType: 'trivia_question_answered', actionLabel, username });

    // Insert into master_actions using service role (bypasses RLS)
    const { error: insertError } = await supabase
      .from('master_actions')
      .insert({
        user_id: userId,
        action_type: 'trivia_question_answered',
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
    const { error: progressError } = await supabase
      .from('trivia_question_progress')
      .upsert({
        user_id: userId,
        book: book,
        question_id: questionId,
        is_correct: isCorrect
      }, {
        onConflict: 'user_id,book,question_id'
      });

    if (progressError) {
      console.error('Error upserting trivia progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to record trivia progress' },
        { status: 500 }
      );
    }

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