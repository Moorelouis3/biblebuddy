-- ============================================================
-- STEP B: Update Hope Nation description + current series
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Update Hope Nation's description
UPDATE public.study_groups
SET
  description = 'Hope Nation is the official Bible study community of Bible Buddy. Join us weekly for structured Bible studies, verse breakdowns, and daily faith conversations — a place to grow, connect, and go deeper in God''s Word together.',
  current_weekly_study = 'The Temptation of Jesus — Coming Soon'
WHERE name = 'Hope Nation';

-- 2. Update the current series title to "The Temptation of Jesus"
--    and set current_week = 0 to display "Coming Soon" in the app
UPDATE public.group_series
SET
  title        = 'The Temptation of Jesus',
  description  = 'A week-by-week study of Jesus'' 40 days in the wilderness — understanding the nature of temptation, spiritual warfare, and how to stand firm in faith.',
  current_week = 0
WHERE group_id = (SELECT id FROM public.study_groups WHERE name = 'Hope Nation')
  AND is_current = true;

-- 3. Verify
SELECT gs.name, gs.description, gs.current_weekly_study,
       gr.title AS series_title, gr.current_week, gr.total_weeks
FROM public.study_groups gs
LEFT JOIN public.group_series gr
  ON gr.group_id = gs.id AND gr.is_current = true
WHERE gs.name = 'Hope Nation';
