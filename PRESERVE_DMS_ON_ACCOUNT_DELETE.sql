-- Keep the other person's side of a DM thread when an account is deleted
-- (2026-09-21). Before this, deleting a login cascaded and removed whole
-- conversations, including messages the OTHER person wrote.
-- After this, the deleted user's id becomes NULL on the conversation and on
-- their messages (lib/accountDeletion.ts has already replaced their message
-- text with "This message was deleted."), and the Messages pages show the
-- missing participant as "Deleted account".

begin;

alter table public.conversations alter column user_id_1 drop not null;
alter table public.conversations alter column user_id_2 drop not null;
alter table public.messages alter column sender_id drop not null;

alter table public.conversations drop constraint if exists conversations_user_id_1_fkey;
alter table public.conversations add constraint conversations_user_id_1_fkey
  foreign key (user_id_1) references auth.users(id) on delete set null;

alter table public.conversations drop constraint if exists conversations_user_id_2_fkey;
alter table public.conversations add constraint conversations_user_id_2_fkey
  foreign key (user_id_2) references auth.users(id) on delete set null;

alter table public.messages drop constraint if exists messages_sender_id_fkey;
alter table public.messages add constraint messages_sender_id_fkey
  foreign key (sender_id) references auth.users(id) on delete set null;

commit;
