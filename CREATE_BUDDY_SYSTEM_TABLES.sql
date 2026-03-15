-- ============================================================
-- Buddy System Tables
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── buddy_requests ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.buddy_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (sender_id, receiver_id)
);

ALTER TABLE public.buddy_requests ENABLE ROW LEVEL SECURITY;

-- Users can send requests (insert where they are sender)
CREATE POLICY "buddy_requests_insert_own" ON public.buddy_requests
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Users can read requests where they are sender or receiver
CREATE POLICY "buddy_requests_select_parties" ON public.buddy_requests
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Receiver can update status (accept/reject)
CREATE POLICY "buddy_requests_update_receiver" ON public.buddy_requests
  FOR UPDATE TO authenticated
  USING (auth.uid() = receiver_id);

-- Sender can delete their own pending request (cancel)
CREATE POLICY "buddy_requests_delete_sender" ON public.buddy_requests
  FOR DELETE TO authenticated
  USING (auth.uid() = sender_id);

-- ── buddies ──────────────────────────────────────────────────
-- Convention: always store lower UUID as user_id_1
CREATE TABLE IF NOT EXISTS public.buddies (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id_2  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id_1, user_id_2),
  CHECK (user_id_1 < user_id_2)
);

ALTER TABLE public.buddies ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read buddies (for buddy counts on profiles)
CREATE POLICY "buddies_select_authenticated" ON public.buddies
  FOR SELECT TO authenticated USING (true);

-- Only allow insert via trigger (service role), but also allow direct insert
-- for the trigger function which runs as the invoker
CREATE POLICY "buddies_insert_parties" ON public.buddies
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Users can delete their own buddy relationships
CREATE POLICY "buddies_delete_parties" ON public.buddies
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- ── conversations ─────────────────────────────────────────────
-- Convention: always store lower UUID as user_id_1
CREATE TABLE IF NOT EXISTS public.conversations (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1            uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id_2            uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at      timestamptz,
  last_message_preview text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id_1, user_id_2),
  CHECK (user_id_1 < user_id_2)
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Users can read only their own conversations
CREATE POLICY "conversations_select_parties" ON public.conversations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Users can insert conversations they are part of
CREATE POLICY "conversations_insert_parties" ON public.conversations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Users can update (last_message_at, preview) for their conversations
CREATE POLICY "conversations_update_parties" ON public.conversations
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Users can delete their own conversations
CREATE POLICY "conversations_delete_parties" ON public.conversations
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- ── messages ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content         text NOT NULL,
  read_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can read messages in conversations they are part of
CREATE POLICY "messages_select_parties" ON public.messages
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id_1 = auth.uid() OR conversations.user_id_2 = auth.uid())
    )
  );

-- Users can insert messages where they are the sender and part of the conversation
CREATE POLICY "messages_insert_sender" ON public.messages
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id_1 = auth.uid() OR conversations.user_id_2 = auth.uid())
    )
  );

-- Users can update read_at on messages they received
CREATE POLICY "messages_update_read" ON public.messages
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id_1 = auth.uid() OR conversations.user_id_2 = auth.uid())
    )
    AND auth.uid() != sender_id
  );

-- ── Trigger: on buddy_request accepted → create buddies + conversation + notification ──
CREATE OR REPLACE FUNCTION public.handle_buddy_request_accepted()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  uid1 uuid;
  uid2 uuid;
  conv_id uuid;
  sender_name text;
BEGIN
  -- Only fire when status changes to 'accepted'
  IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN

    -- Determine ordered pair (lower UUID first)
    IF NEW.sender_id < NEW.receiver_id THEN
      uid1 := NEW.sender_id;
      uid2 := NEW.receiver_id;
    ELSE
      uid1 := NEW.receiver_id;
      uid2 := NEW.sender_id;
    END IF;

    -- Insert into buddies (ignore if already exists)
    INSERT INTO public.buddies (user_id_1, user_id_2)
    VALUES (uid1, uid2)
    ON CONFLICT (user_id_1, user_id_2) DO NOTHING;

    -- Insert conversation (ignore if already exists)
    INSERT INTO public.conversations (user_id_1, user_id_2)
    VALUES (uid1, uid2)
    ON CONFLICT (user_id_1, user_id_2) DO NOTHING
    RETURNING id INTO conv_id;

    -- Get receiver's display name for the notification
    SELECT COALESCE(display_name, username, 'Someone')
    INTO sender_name
    FROM public.profile_stats
    WHERE user_id = NEW.receiver_id;

    -- Notify the sender that their request was accepted
    INSERT INTO public.notifications (user_id, type, from_user_id, from_user_name, message)
    VALUES (
      NEW.sender_id,
      'buddy_accepted',
      NEW.receiver_id,
      sender_name,
      sender_name || ' accepted your Buddy request! 🎉'
    );

    -- Update updated_at
    NEW.updated_at := now();
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_buddy_request_accepted ON public.buddy_requests;
CREATE TRIGGER trg_buddy_request_accepted
  BEFORE UPDATE ON public.buddy_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_buddy_request_accepted();

-- ── Trigger: update updated_at on buddy_requests ─────────────
CREATE OR REPLACE FUNCTION public.set_buddy_request_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- NOTE: The notifications table may need a from_user_id column.
-- If it doesn't exist, run:
-- ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS from_user_id uuid REFERENCES auth.users(id);
