-- ============================================================
-- Add Public Profile Columns to profile_stats
-- Run this in Supabase SQL Editor.
-- ============================================================

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS bio                text,
  ADD COLUMN IF NOT EXISTS location           text,
  ADD COLUMN IF NOT EXISTS profile_image_url  text,
  ADD COLUMN IF NOT EXISTS last_active_at     timestamptz,
  ADD COLUMN IF NOT EXISTS profile_is_public  boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS display_name       text;
