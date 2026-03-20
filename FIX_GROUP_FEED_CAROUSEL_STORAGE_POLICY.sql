-- Allow the original group-carousel/{userId}/filename upload path in post-media
-- Run this only if you want the current deployed scheduler to work without a redeploy

DROP POLICY IF EXISTS "post-media: group carousel upload" ON storage.objects;
CREATE POLICY "post-media: group carousel upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-media'
  AND (storage.foldername(name))[1] = 'group-carousel'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

SELECT policyname, cmd
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname LIKE 'post-media:%'
ORDER BY policyname;
