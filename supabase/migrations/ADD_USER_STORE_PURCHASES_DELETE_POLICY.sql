alter table public.user_store_purchases enable row level security;

drop policy if exists "Users can delete their own store purchases" on public.user_store_purchases;
create policy "Users can delete their own store purchases"
  on public.user_store_purchases
  for delete
  using (auth.uid() = user_id);
