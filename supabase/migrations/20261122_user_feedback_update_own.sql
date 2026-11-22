-- The feedback survey ("Could you write us a 2-3 sentence review...") saves with an
-- upsert on user_id. People could insert and read their own row but not update it,
-- so anyone who already had a row (a second submit, or a submit after dismissing the
-- banner, which writes one) got "Failed to submit feedback". Own row only.
-- Applied to production in the SQL editor on 2026-11-22.
create policy user_feedback_update_own on public.user_feedback
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
