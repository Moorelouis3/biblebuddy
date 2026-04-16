insert into weekly_bible_report_buckets (user_id, bucket_day, updated_at)
select
  ps.user_id,
  'thursday',
  now()
from profile_stats ps
where lower(coalesce(ps.display_name, '')) = 'louis moore'
   or lower(coalesce(ps.username, '')) = 'louis moore'
   or lower(coalesce(ps.username, '')) = 'moorelouis3'
on conflict (user_id)
do update set
  bucket_day = excluded.bucket_day,
  updated_at = excluded.updated_at;
