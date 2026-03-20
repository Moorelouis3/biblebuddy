-- Allow senders to edit their own direct messages
-- Run once in the Supabase SQL Editor

DROP POLICY IF EXISTS "messages_update_own" ON public.messages;

CREATE POLICY "messages_update_own" ON public.messages
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1
      FROM public.conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id_1 = auth.uid() OR conversations.user_id_2 = auth.uid())
    )
    AND NOT EXISTS (
      SELECT 1
      FROM public.messages newer_messages
      WHERE newer_messages.conversation_id = messages.conversation_id
        AND newer_messages.sender_id = auth.uid()
        AND (
          newer_messages.created_at > messages.created_at
          OR (newer_messages.created_at = messages.created_at AND newer_messages.id <> messages.id)
        )
    )
  )
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
      FROM public.messages newer_messages
      WHERE newer_messages.conversation_id = messages.conversation_id
        AND newer_messages.sender_id = auth.uid()
        AND (
          newer_messages.created_at > messages.created_at
          OR (newer_messages.created_at = messages.created_at AND newer_messages.id <> messages.id)
        )
    )
  );

SELECT policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'messages'
ORDER BY policyname;
