-- Guest lifecycle columns on profile_stats.
--
-- WHY
--
-- The app already writes these four columns in several places
-- (lib/guestSession.ts, components/DashboardJourneyExperience.tsx,
-- app/api/landing-onboarding/setup/route.ts). None of them exist, so every one
-- of those writes fails and is swallowed by a fallback. The guest label is lost.
--
-- Supabase Auth's `is_anonymous` covers "is this person a guest right now", and
-- /api/admin/total-users reads it for the headline count. What Auth cannot tell
-- you is that someone USED to be a guest and then signed up — the flag simply
-- flips and the history is gone.
--
-- `converted_from_guest_at` is the one that matters. It is the only way to
-- measure whether the whole free-platform funnel actually works:
-- blog post → guest → studied → made an account.
--
-- SAFE: additive only. Nothing is dropped, nothing is rewritten, no data moves.
-- Existing rows get NULLs. Safe to re-run.

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS account_type            text,
  ADD COLUMN IF NOT EXISTS guest_started_at        timestamptz,
  ADD COLUMN IF NOT EXISTS registered_at           timestamptz,
  ADD COLUMN IF NOT EXISTS converted_from_guest_at timestamptz;

COMMENT ON COLUMN public.profile_stats.account_type IS
  'guest | registered. Set when the row is created and updated on conversion. Supabase Auth is_anonymous remains the source of truth for current state.';
COMMENT ON COLUMN public.profile_stats.guest_started_at IS
  'When this person first entered as a guest, with no account.';
COMMENT ON COLUMN public.profile_stats.registered_at IS
  'When this person created a real account, whether or not they were a guest first.';
COMMENT ON COLUMN public.profile_stats.converted_from_guest_at IS
  'Set only when a guest became registered. The free-platform funnel metric.';

-- Backfill so the columns are not misleading on day one.
--
-- Everyone who already exists predates guest deep links, so they are registered.
-- created_at is used as a reasonable stand-in for registered_at; it is only ever
-- applied where the column is currently NULL, so a real value is never
-- overwritten. converted_from_guest_at is deliberately left NULL: we do not know
-- who converted historically, and inventing it would poison the metric.

UPDATE public.profile_stats
SET account_type = 'registered'
WHERE account_type IS NULL;

UPDATE public.profile_stats
SET registered_at = created_at
WHERE registered_at IS NULL
  AND created_at IS NOT NULL;

-- Fast lookups when reporting on the funnel.
CREATE INDEX IF NOT EXISTS profile_stats_account_type_idx
  ON public.profile_stats (account_type);
CREATE INDEX IF NOT EXISTS profile_stats_converted_from_guest_idx
  ON public.profile_stats (converted_from_guest_at)
  WHERE converted_from_guest_at IS NOT NULL;

-- Verify.
SELECT
  count(*)                                                    AS total_rows,
  count(*) FILTER (WHERE account_type = 'registered')          AS registered,
  count(*) FILTER (WHERE account_type = 'guest')               AS guests,
  count(*) FILTER (WHERE converted_from_guest_at IS NOT NULL)  AS converted_from_guest
FROM public.profile_stats;
