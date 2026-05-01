create table if not exists public.group_recurring_post_overrides (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.study_groups (id) on delete cascade,
  schedule_key text not null,
  week_key text not null,
  override_payload jsonb not null,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint group_recurring_post_overrides_unique unique (group_id, schedule_key, week_key)
);

create index if not exists idx_group_recurring_post_overrides_group_week
  on public.group_recurring_post_overrides (group_id, week_key);

create index if not exists idx_group_recurring_post_overrides_group_schedule
  on public.group_recurring_post_overrides (group_id, schedule_key);

create or replace function public.touch_group_recurring_post_overrides_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_group_recurring_post_overrides_updated_at on public.group_recurring_post_overrides;

create trigger trg_group_recurring_post_overrides_updated_at
before update on public.group_recurring_post_overrides
for each row
execute function public.touch_group_recurring_post_overrides_updated_at();
