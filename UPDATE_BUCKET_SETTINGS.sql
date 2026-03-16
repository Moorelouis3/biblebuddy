-- ─────────────────────────────────────────────────────────────────────────────
-- UPDATE post-media bucket: raise file size limit to 200 MB + allow videos
-- Run once in Supabase SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE storage.buckets
SET
  file_size_limit   = 209715200,  -- 200 MB
  allowed_mime_types = ARRAY[
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'image/webp', 'image/heic',
    'video/mp4', 'video/quicktime', 'video/webm', 'video/mov', 'video/mpeg'
  ]
WHERE id = 'post-media';

-- Verify:
SELECT id, file_size_limit, allowed_mime_types FROM storage.buckets WHERE id = 'post-media';
