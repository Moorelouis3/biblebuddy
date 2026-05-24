create table if not exists public.moderator_deleted_comments (
  id uuid primary key default gen_random_uuid(),
  comment_id text not null,
  comment_kind text not null,
  source_label text,
  context_title text,
  content text,
  author_user_id uuid,
  author_name text,
  deleted_by uuid references auth.users(id) on delete set null,
  deleted_by_name text,
  deleted_at timestamptz not null default now(),
  deleted_ids text[] default '{}'::text[]
);

create index if not exists moderator_deleted_comments_deleted_at_idx
  on public.moderator_deleted_comments (deleted_at desc);

create index if not exists moderator_deleted_comments_deleted_by_idx
  on public.moderator_deleted_comments (deleted_by);
