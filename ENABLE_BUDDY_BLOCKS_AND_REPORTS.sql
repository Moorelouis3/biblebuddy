-- Enable buddy blocking and reporting for direct messages
-- Run once in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.buddy_blocks (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_user_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason           text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blocker_user_id, blocked_user_id),
  CHECK (blocker_user_id <> blocked_user_id)
);

ALTER TABLE public.buddy_blocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "buddy_blocks_select_parties" ON public.buddy_blocks;
CREATE POLICY "buddy_blocks_select_parties" ON public.buddy_blocks
  FOR SELECT TO authenticated
  USING (auth.uid() = blocker_user_id OR auth.uid() = blocked_user_id);

DROP POLICY IF EXISTS "buddy_blocks_insert_blocker" ON public.buddy_blocks;
CREATE POLICY "buddy_blocks_insert_blocker" ON public.buddy_blocks
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = blocker_user_id AND blocker_user_id <> blocked_user_id);

DROP POLICY IF EXISTS "buddy_blocks_delete_blocker" ON public.buddy_blocks;
CREATE POLICY "buddy_blocks_delete_blocker" ON public.buddy_blocks
  FOR DELETE TO authenticated
  USING (auth.uid() = blocker_user_id);

CREATE TABLE IF NOT EXISTS public.buddy_reports (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_user_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id   uuid REFERENCES public.conversations(id) ON DELETE SET NULL,
  reason            text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  CHECK (reporter_user_id <> reported_user_id)
);

ALTER TABLE public.buddy_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "buddy_reports_select_own" ON public.buddy_reports;
CREATE POLICY "buddy_reports_select_own" ON public.buddy_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = reporter_user_id);

DROP POLICY IF EXISTS "buddy_reports_insert_own" ON public.buddy_reports;
CREATE POLICY "buddy_reports_insert_own" ON public.buddy_reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_user_id AND reporter_user_id <> reported_user_id);

DROP POLICY IF EXISTS "messages_insert_sender" ON public.messages;
CREATE POLICY "messages_insert_sender" ON public.messages
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1
      FROM public.conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id_1 = auth.uid() OR conversations.user_id_2 = auth.uid())
    )
    AND NOT EXISTS (
      SELECT 1
      FROM public.buddy_blocks bb
      JOIN public.conversations c
        ON c.id = messages.conversation_id
      WHERE (bb.blocker_user_id = c.user_id_1 AND bb.blocked_user_id = c.user_id_2)
         OR (bb.blocker_user_id = c.user_id_2 AND bb.blocked_user_id = c.user_id_1)
    )
  );

SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('buddy_blocks', 'buddy_reports', 'messages')
ORDER BY tablename, policyname;
