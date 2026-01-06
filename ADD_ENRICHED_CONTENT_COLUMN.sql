-- Add enriched_content column to bible_chapters table
-- This column stores HTML with pre-applied highlights for people, places, and keywords

ALTER TABLE public.bible_chapters
ADD COLUMN IF NOT EXISTS enriched_content TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.bible_chapters.enriched_content IS 'HTML content with pre-applied highlights for people, places, and keywords. Generated once at save-time to avoid runtime DOM mutation.';

