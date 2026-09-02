-- Community devotional event enrollment (Wisdom of Proverbs first).
-- One row per user per event: real participant counts, duplicate-proof
-- joins, join timestamps and the reminder opt-in the spec asks for.
CREATE TABLE IF NOT EXISTS public.community_event_members (
  event_slug   TEXT NOT NULL,
  user_id      UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  reminders    BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (event_slug, user_id)
);

ALTER TABLE public.community_event_members ENABLE ROW LEVEL SECURITY;

-- Anyone signed in (guests included) may see membership - it powers the real
-- participant count - but can only ever write their own row.
CREATE POLICY "community_event_members_select" ON public.community_event_members
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "community_event_members_insert" ON public.community_event_members
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "community_event_members_update" ON public.community_event_members
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
