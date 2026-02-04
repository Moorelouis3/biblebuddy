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
    let correctCountUpdated = false;
    if (existing) {
      // Update progress (do not increment correct count)
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
      // Only increment trivia_correct_count if correct and first time
      if (isCorrect) {
        const { error: updateError } = await supabase
          .from('profile_stats')
          .update({
            trivia_correct_count: supabase.raw('trivia_correct_count + 1')
          })
          .eq('user_id', userId);
        if (updateError) {
          console.error('Error incrementing trivia_correct_count:', updateError);
        } else {
          correctCountUpdated = true;
        }
      }
    }

    // Always recalculate total_actions after possible correct count update
    if (correctCountUpdated) {
      try {
        const recalcRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/recalculate-total-actions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
        if (!recalcRes.ok) {
          const errText = await recalcRes.text();
          console.error('Failed to recalculate total_actions:', errText);
        }
      } catch (err) {
        console.error('Error calling recalculate-total-actions API:', err);
      }
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