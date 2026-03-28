-- Ensure onboarding day sends are uniquely guarded per user/day
-- Run this once in the Supabase SQL Editor if you want to harden live.

CREATE TABLE IF NOT EXISTS public.onboarding_dm_sent (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_number integer     NOT NULL CHECK (day_number BETWEEN 1 AND 4),
  sent_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_dm_sent
  DROP CONSTRAINT IF EXISTS onboarding_dm_sent_pkey;

ALTER TABLE public.onboarding_dm_sent
  ADD CONSTRAINT onboarding_dm_sent_pkey PRIMARY KEY (user_id, day_number);

ALTER TABLE public.onboarding_dm_sent ENABLE ROW LEVEL SECURITY;

SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.onboarding_dm_sent'::regclass
ORDER BY conname;
