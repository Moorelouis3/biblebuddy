-- ─────────────────────────────────────────────────────────────────────────────
-- Step 1: Add media columns to group_posts
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE group_posts
  ADD COLUMN IF NOT EXISTS media_url TEXT,
  ADD COLUMN IF NOT EXISTS link_url  TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- Step 2: Create the post-media Storage bucket (public)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-media',
  'post-media',
  true,
  52428800,  -- 50 MB max file size (videos)
  ARRAY['image/jpeg','image/jpg','image/png','image/gif','image/webp','image/heic',
        'video/mp4','video/webm','video/quicktime','video/mov']
)
ON CONFLICT (id) DO UPDATE
  SET file_size_limit   = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ─────────────────────────────────────────────────────────────────────────────
-- Step 3: RLS policies for storage.objects
-- ─────────────────────────────────────────────────────────────────────────────

-- Anyone can read/view images (public feed)
CREATE POLICY "post-media: public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'post-media');

-- Authenticated users can upload to their own subfolder (userId/filename)
CREATE POLICY "post-media: authenticated upload to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Authenticated users can delete their own files
CREATE POLICY "post-media: authenticated delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-media'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
