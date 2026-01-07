-- Enable Row Level Security on user_signups table
ALTER TABLE public.user_signups ENABLE ROW LEVEL SECURITY;

-- Allow SELECT for analytics (all authenticated users can read signup counts)
CREATE POLICY user_signups_select_all
ON public.user_signups
FOR SELECT
USING (true);

