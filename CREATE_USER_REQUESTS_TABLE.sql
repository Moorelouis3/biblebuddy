-- Create user_requests table for Contact Us feature
CREATE TABLE IF NOT EXISTS public.user_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  screenshot_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_requests ENABLE ROW LEVEL SECURITY;

-- INSERT policy: authenticated users can insert their own requests
CREATE POLICY user_requests_insert_own
ON public.user_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- SELECT policy: admin/service role can read all rows
CREATE POLICY user_requests_admin_select_all_service_role
ON public.user_requests
FOR SELECT
TO service_role
USING (true);

-- SELECT policy: admin email can read all rows
CREATE POLICY user_requests_admin_select_all_email
ON public.user_requests
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'moorelouis3@gmail.com'
);

-- No UPDATE or DELETE policies (append-only table)
-- Users do NOT need to read their own messages yet

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_requests_created_at ON public.user_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_requests_user_id ON public.user_requests(user_id);

