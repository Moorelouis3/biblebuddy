-- Add dismissed_from_inbox column to user_feedback and user_requests tables
-- This allows admin to hide items from inbox without deleting them

-- Add to user_feedback
ALTER TABLE public.user_feedback
ADD COLUMN IF NOT EXISTS dismissed_from_inbox BOOLEAN DEFAULT false;

-- Add to user_requests
ALTER TABLE public.user_requests
ADD COLUMN IF NOT EXISTS dismissed_from_inbox BOOLEAN DEFAULT false;

-- Add comments
COMMENT ON COLUMN public.user_feedback.dismissed_from_inbox IS 'When true, this feedback item is hidden from the admin inbox (but not deleted from database)';
COMMENT ON COLUMN public.user_requests.dismissed_from_inbox IS 'When true, this request item is hidden from the admin inbox (but not deleted from database)';

