ALTER TABLE profile_stats
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS traffic_source TEXT,
ADD COLUMN IF NOT EXISTS bible_experience_level TEXT;

UPDATE profile_stats
SET onboarding_completed = FALSE;