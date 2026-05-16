ALTER TABLE profile_stats
ADD COLUMN IF NOT EXISTS app_theme TEXT NOT NULL DEFAULT 'light';

ALTER TABLE profile_stats
DROP CONSTRAINT IF EXISTS profile_stats_app_theme_check;

ALTER TABLE profile_stats
ADD CONSTRAINT profile_stats_app_theme_check
CHECK (app_theme IN ('light', 'dark', 'blue', 'gold', 'purple'));
