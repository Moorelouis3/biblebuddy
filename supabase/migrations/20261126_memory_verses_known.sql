-- Bible Memory: "I know it" (2026-11-26).
--
-- Louis: "do one verse at a time... once you get done with that, you can say
-- that you know it now or say keep studying... if you say that you know it,
-- then it goes to the master list, and then you can do the test version where
-- you test it on all the ones that you say that you know."
--
-- known_at is that word, and when it was given. Null means the verse is still
-- being learned, which is every verse saved before today: nobody had been
-- asked yet, so nobody is marked as knowing anything by this file.
--
-- Additive and safe to run twice. The existing update policy already lets a
-- person change their own rows, so no policy changes.

alter table public.memory_verses
  add column if not exists known_at timestamptz;
