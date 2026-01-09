-- Add dismissed_from_inbox column to user_feedback and user_requests tables
-- Add UPDATE policies so admin can dismiss items

-- Add column to user_feedback
ALTER TABLE public.user_feedback
ADD COLUMN IF NOT EXISTS dismissed_from_inbox BOOLEAN DEFAULT false;

-- Add column to user_requests
ALTER TABLE public.user_requests
ADD COLUMN IF NOT EXISTS dismissed_from_inbox BOOLEAN DEFAULT false;

-- Add UPDATE policy for admin on user_feedback (to allow dismissing items)
DROP POLICY IF EXISTS "user_feedback_admin_update_all" ON public.user_feedback;
CREATE POLICY "user_feedback_admin_update_all"
ON public.user_feedback
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

-- Add UPDATE policy for admin on user_requests (to allow dismissing items)
DROP POLICY IF EXISTS "user_requests_admin_update_all" ON public.user_requests;
CREATE POLICY "user_requests_admin_update_all"
ON public.user_requests
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

-- Add comments
COMMENT ON COLUMN public.user_feedback.dismissed_from_inbox IS 'When true, this feedback item is hidden from the admin inbox (but not deleted from database)';
COMMENT ON COLUMN public.user_requests.dismissed_from_inbox IS 'When true, this request item is hidden from the admin inbox (but not deleted from database)';

