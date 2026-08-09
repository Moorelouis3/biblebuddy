-- First touch attribution for signups.
--
-- signup_source is LAST touch: the thing the visitor clicked right before
-- signing up. A blog promo click sends them to /signup?src=blog, so anyone who
-- found us on Pinterest, read a blog post, then signed up was recorded as
-- "Blog" and the Pinterest origin was lost. These two columns keep the
-- original channel alongside it, so the traffic source page can say
-- "Blog (from Pinterest)" instead of crediting only one of them.
--
-- Safe to run more than once. Existing rows keep NULL - first touch is only
-- known for signups from here on.

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS signup_first_touch_source TEXT;

ALTER TABLE public.profile_stats
  ADD COLUMN IF NOT EXISTS signup_first_touch_referrer TEXT;

CREATE INDEX IF NOT EXISTS profile_stats_signup_first_touch_source_idx
  ON public.profile_stats (signup_first_touch_source);
