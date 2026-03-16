-- Add time-of-day support for Bible study series scheduling
-- Run once in Supabase SQL Editor

ALTER TABLE public.series_schedules
ADD COLUMN IF NOT EXISTS start_at timestamptz;

UPDATE public.series_schedules
SET start_at = COALESCE(start_at, start_date::timestamp AT TIME ZONE 'UTC')
WHERE start_date IS NOT NULL;

SELECT series_id, start_date, start_at
FROM public.series_schedules
ORDER BY created_at DESC
LIMIT 20;
