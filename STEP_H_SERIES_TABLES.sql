-- ============================================================
-- STEP H: Structured Series Lesson Tables
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Start date set by leader (one per series)
CREATE TABLE IF NOT EXISTS public.series_schedules (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  series_id   uuid REFERENCES public.group_series(id) ON DELETE CASCADE,
  group_id    uuid,
  start_date  date NOT NULL,
  created_by  uuid REFERENCES auth.users(id),
  created_at  timestamptz DEFAULT now(),
  UNIQUE(series_id)
);

-- 2. Per-user, per-week progress
CREATE TABLE IF NOT EXISTS public.series_week_progress (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  series_id           uuid REFERENCES public.group_series(id) ON DELETE CASCADE,
  week_number         int NOT NULL,
  reading_completed   boolean DEFAULT false,
  notes_completed     boolean DEFAULT false,
  trivia_completed    boolean DEFAULT false,
  reflection_posted   boolean DEFAULT false,
  completed_at        timestamptz,
  created_at          timestamptz DEFAULT now(),
  UNIQUE(user_id, series_id, week_number)
);

-- 3. Trivia scores (one per user per week — used for leaderboard)
CREATE TABLE IF NOT EXISTS public.series_trivia_scores (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  series_id       uuid REFERENCES public.group_series(id) ON DELETE CASCADE,
  week_number     int NOT NULL,
  score           int NOT NULL,
  total_questions int NOT NULL DEFAULT 10,
  taken_at        timestamptz DEFAULT now(),
  UNIQUE(user_id, series_id, week_number)
);

-- 4. Reflection responses
CREATE TABLE IF NOT EXISTS public.series_reflections (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  series_id           uuid REFERENCES public.group_series(id) ON DELETE CASCADE,
  week_number         int NOT NULL,
  parent_reflection_id uuid REFERENCES public.series_reflections(id) ON DELETE CASCADE,
  content             text NOT NULL,
  like_count          int NOT NULL DEFAULT 0,
  display_name        text,
  profile_image_url   text,
  created_at          timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.series_reflection_likes (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reflection_id uuid REFERENCES public.series_reflections(id) ON DELETE CASCADE,
  user_id       uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at    timestamptz DEFAULT now(),
  UNIQUE(reflection_id, user_id)
);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE public.series_schedules     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series_week_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series_trivia_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series_reflections   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series_reflection_likes ENABLE ROW LEVEL SECURITY;

-- series_schedules
CREATE POLICY "ss_select" ON public.series_schedules FOR SELECT TO authenticated USING (true);
CREATE POLICY "ss_insert_leader" ON public.series_schedules FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.group_members
    WHERE group_id = series_schedules.group_id
      AND user_id = auth.uid() AND role = 'leader' AND status = 'approved'));
CREATE POLICY "ss_update_leader" ON public.series_schedules FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.group_members
    WHERE group_id = series_schedules.group_id
      AND user_id = auth.uid() AND role = 'leader' AND status = 'approved'));

-- series_week_progress
CREATE POLICY "swp_select" ON public.series_week_progress FOR SELECT TO authenticated USING (true);
CREATE POLICY "swp_insert" ON public.series_week_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "swp_update" ON public.series_week_progress FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- series_trivia_scores
CREATE POLICY "sts_select" ON public.series_trivia_scores FOR SELECT TO authenticated USING (true);
CREATE POLICY "sts_insert" ON public.series_trivia_scores FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "sts_update" ON public.series_trivia_scores FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- series_reflections
CREATE POLICY "sr_select"      ON public.series_reflections FOR SELECT TO authenticated USING (true);
CREATE POLICY "sr_insert"      ON public.series_reflections FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "sr_delete_own"  ON public.series_reflections FOR DELETE TO authenticated USING (user_id = auth.uid());

-- series_reflection_likes
CREATE POLICY "srl_select"      ON public.series_reflection_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "srl_insert"      ON public.series_reflection_likes FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "srl_delete_own"  ON public.series_reflection_likes FOR DELETE TO authenticated USING (user_id = auth.uid());

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_series_schedules_series     ON public.series_schedules (series_id);
CREATE INDEX IF NOT EXISTS idx_swp_user_series_week        ON public.series_week_progress (user_id, series_id, week_number);
CREATE INDEX IF NOT EXISTS idx_sts_series_week             ON public.series_trivia_scores (series_id, week_number);
CREATE INDEX IF NOT EXISTS idx_sr_series_week              ON public.series_reflections (series_id, week_number, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sr_parent                   ON public.series_reflections (parent_reflection_id);
CREATE INDEX IF NOT EXISTS idx_srl_reflection             ON public.series_reflection_likes (reflection_id);
