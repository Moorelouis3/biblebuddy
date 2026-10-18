-- Notifications cleanup, 2026-10-18.
--
-- The app side is done and shipped: nothing drains the broadcast queue any
-- more, and the bell hides the two broadcast types, so nobody is being sent
-- or shown "somebody posted" alerts as of this commit.
--
-- These four statements finish the job in the database itself. They are here
-- rather than already run because dropping triggers and deleting half a
-- million rows on a live database is not something an agent should do on its
-- own. Paste into the Supabase SQL editor:
--
--   https://supabase.com/dashboard/project/dntaonyrfdzedukvwcwk/sql/new
--
-- Statements 1 and 2 are the ones that matter. 3 is housekeeping and can wait.

-- 1. Stop writing "X posted in your group" to every member of the group.
--    This trigger is what produced 461,515 of the 495,594 notifications in
--    the table. For Louis's own posts it queues into
--    group_post_broadcast_queue, which nothing drains any more; for anybody
--    else's it inserts the notifications inline.
drop trigger if exists trg_notify_group_broadcast_post on public.group_posts;

-- 2. Stop telling your buddies every time you post in the feed.
--    notify_buddies_on_feed_post, one row per accepted buddy per post. Only 6
--    rows exist today because it reads buddy_requests rather than buddies,
--    but the feed is the main surface now and this grows with it.
drop trigger if exists on_feed_post_insert on public.feed_posts;

-- 3. Clear the backlog. The bell already filters these out, so this is about
--    the size of the table rather than what anybody sees. Run it in one go or
--    in batches, whichever the dashboard is happier with.
delete from public.notifications where type in ('group_post', 'buddy_posted');

delete from public.group_post_broadcast_queue where processed_at is null;

-- 4. Optional. Old like/reply alerts still carry '/dashboard?view=group' in
--    article_slug. The app ignores that for these types now and sends them to
--    the feed regardless, so this only tidies the stored value.
update public.notifications
set article_slug = case
      when post_id is not null and comment_id is not null
        then '/bb-feed?post=' || post_id || '&comment=' || comment_id
      when post_id is not null then '/bb-feed?post=' || post_id
      else '/bb-feed'
    end
where type in ('feed_post_liked','feed_post_commented','feed_post_replied',
               'group_post_liked','group_post_commented','group_post_replied','group_reply_liked')
  and (article_slug like '/study-groups/%' or article_slug like '/dashboard%');

-- Afterwards, this should be a small number instead of 478,389:
select count(*) filter (where is_read = false) as unread,
       count(*) as total
from public.notifications;

-- And tidy up the scratch table this investigation left behind:
drop table if exists public.zz_tmp_fn_defs;
