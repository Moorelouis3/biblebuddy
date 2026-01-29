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
    const { userId, questionId, username } = await request.json();

    console.log('Trivia answer API called:', { userId, questionId, username });

    if (!userId || !questionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, questionId' },
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

    console.log('Successfully inserted trivia answer into master_actions');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error in trivia-answer API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}