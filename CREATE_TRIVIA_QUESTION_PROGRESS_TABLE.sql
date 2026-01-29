-- =====================================================
-- Create trivia_question_progress table with RLS policies
-- =====================================================
--
-- PURPOSE: Track user progress on trivia questions
-- Records whether each question was answered correctly
-- Used to filter out correctly answered questions from future sessions
--
-- Run this in Supabase SQL Editor
-- =====================================================

-- Create table
CREATE TABLE public.trivia_question_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book text NOT NULL,
  question_id text NOT NULL,
  is_correct boolean NOT NULL,
  answered_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add UNIQUE constraint (one record per user per question)
CREATE UNIQUE INDEX trivia_question_progress_user_question_unique
ON public.trivia_question_progress (user_id, book, question_id);

-- Add unique constraint for upsert conflict detection
ALTER TABLE public.trivia_question_progress
ADD CONSTRAINT trivia_question_progress_user_question_constraint UNIQUE (user_id, book, question_id);

-- Enable RLS
ALTER TABLE public.trivia_question_progress ENABLE ROW LEVEL SECURITY;

-- SELECT policy (users can only see their own progress)
CREATE POLICY "trivia_question_progress_select_own"
ON public.trivia_question_progress
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT policy (users can only insert their own progress)
CREATE POLICY "trivia_question_progress_insert_own"
ON public.trivia_question_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE policy (users can only update their own progress)
CREATE POLICY "trivia_question_progress_update_own"
ON public.trivia_question_progress
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE policy (users can only delete their own progress)
CREATE POLICY "trivia_question_progress_delete_own"
ON public.trivia_question_progress
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);