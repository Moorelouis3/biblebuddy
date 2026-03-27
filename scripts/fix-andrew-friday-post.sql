-- Fix the already-published "Who was Andrew in the Bible?" recurring post
-- Run this in the Supabase SQL editor

do $$
declare
  founder_user_id uuid;
  founder_display_name text;
  andrew_html text;
begin
  select id
  into founder_user_id
  from auth.users
  where lower(email) = 'moorelouis3@gmail.com'
  limit 1;

  if founder_user_id is null then
    raise exception 'Founder user not found for moorelouis3@gmail.com';
  end if;

  select coalesce(display_name, username, 'Louis')
  into founder_display_name
  from public.profile_stats
  where user_id = founder_user_id
  limit 1;

  andrew_html :=
    '<p><strong>This week we are looking at Andrew.</strong></p>' ||
    '<p>Andrew was one of the first men Jesus called, and before that he had been a disciple of John the Baptist. He was Peter''s brother, but Scripture keeps showing that Andrew had his own steady kind of faith long before he is remembered as standing near louder people. The first thing Andrew did after meeting Jesus was go find Peter and bring him to the Lord. That tells you a lot about him right away: Andrew was not trying to build his own name, he wanted other people to meet Jesus too. He may not be the loudest disciple in the story, but he is one of the clearest pictures of quiet faithfulness and humble evangelism.</p>' ||
    '<h2>Why Andrew matters</h2>' ||
    '<ul><li>He keeps bringing people to Jesus.</li><li>He shows that influence does not have to be loud to be powerful.</li><li>He reminds us that helping others get closer to Christ is real ministry.</li></ul>' ||
    '<p>Andrew brings Peter. He helps bring the boy with the loaves and fish. He keeps showing up as someone willing to connect people to Jesus without needing the spotlight for himself.</p>' ||
    '<h2>Where to read it in the Bible</h2>' ||
    '<ul><li>John 1:35-42</li><li>John 6:8-9</li><li>John 12:20-22</li><li>Matthew 4:18-20</li></ul>' ||
    '<h2>The real takeaway</h2>' ||
    '<p>Andrew reminds us that some of the strongest kingdom work happens quietly. Not every calling looks dramatic from the outside. Some people are builders, introducers, and faithful connectors. Heaven notices that kind of obedience.</p>' ||
    '<p><strong>Drop into the comments after you read:</strong> Do you relate more to loud leadership or quiet faithfulness?</p>';

  update public.group_posts
  set
    user_id = founder_user_id,
    display_name = founder_display_name,
    content = andrew_html
  where category = 'who_was_this_friday'
    and title = 'Who was Andrew in the Bible?';

  update public.weekly_group_series_posts
  set
    created_by = founder_user_id,
    content_html = andrew_html
  where series_key = 'who_was_this_friday'
    and title = 'Who was Andrew in the Bible?';
end $$;
