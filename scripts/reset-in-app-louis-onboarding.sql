-- Resets the in-app Louis onboarding / feature tour state for all members.
-- This does NOT touch the main sign-in onboarding flow.
-- After running this, everyone will see the new in-app Louis onboarding again.

update profile_stats
set feature_tours = null;
