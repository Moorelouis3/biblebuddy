-- Louis, 2026-11-21: 64% of November's blog views (2,350 of 3,672) carried no
-- referrer and could not be split into people, the app and bots, because the
-- view row kept nothing about the browser that made it. This keeps the user
-- agent so the split can be made at read time (SCANNER_UA in
-- lib/productHealth.ts for bots, the "BibleBuddyApp" marker for the app).
--
-- Additive and nullable. Rows before this date stay NULL and mean "unknown".
alter table blog_page_views add column if not exists user_agent text;
