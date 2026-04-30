-- Add native action-button support to direct messages
-- Run this once in the Supabase SQL Editor

ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS action_label text,
  ADD COLUMN IF NOT EXISTS action_href text;
