-- Fix RLS policies for devotionals tables
-- This allows: 
-- 1. Service role to insert/update/delete (for seeding and maintenance)
-- 2. Authenticated users to read (existing)
-- 3. Anon/public users to read (so devotionals are visible without login)

-- Note: Service role automatically bypasses RLS, but we add explicit policies for clarity

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "devotionals_select_all" ON public.devotionals;
DROP POLICY IF EXISTS "devotional_days_select_all" ON public.devotional_days;

-- Allow authenticated users to read devotionals and days
CREATE POLICY "devotionals_select_authenticated"
ON public.devotionals
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "devotional_days_select_authenticated"
ON public.devotional_days
FOR SELECT
TO authenticated
USING (true);

-- Allow anon/public users to read devotionals and days (so they show up without login)
CREATE POLICY "devotionals_select_anon"
ON public.devotionals
FOR SELECT
TO anon
USING (true);

CREATE POLICY "devotional_days_select_anon"
ON public.devotional_days
FOR SELECT
TO anon
USING (true);

