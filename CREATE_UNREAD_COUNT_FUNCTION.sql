-- Run this ONCE in the Supabase SQL editor.
--
-- Returns all conversation IDs that have unread messages FOR the given user
-- (i.e. messages sent by the OTHER person that have not been read yet).
-- Using a server-side function avoids passing hundreds of UUIDs in a URL
-- parameter, which breaks for accounts like Louis that have many conversations.

CREATE OR REPLACE FUNCTION get_unread_conversation_ids(p_user_id uuid)
RETURNS TABLE(conversation_id uuid)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT m.conversation_id
  FROM messages m
  INNER JOIN conversations c ON m.conversation_id = c.id
  WHERE (c.user_id_1 = p_user_id OR c.user_id_2 = p_user_id)
    AND m.sender_id != p_user_id
    AND m.read_at IS NULL;
$$;
