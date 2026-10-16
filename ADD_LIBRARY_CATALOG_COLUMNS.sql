-- Library catalog columns on `devotionals` (Louis, 2026-10-16)
-- Run this entire script in the Supabase SQL Editor.
--
-- The Plans -> Library redesign needs catalog facts that were only ever in
-- frontend source: which studies are visible (a FEATURED_STUDY_ORDER array),
-- the cover (a getCoverImage() title switch, duplicated in two files), the
-- start date (a NEXT_UP_START_LABEL string), and category and paperback link,
-- which did not exist anywhere. Library reads them from here instead.
--
-- Purely additive. No column is dropped, no row is deleted, and every existing
-- row keeps its id, so enrolments and devotional_progress are untouched.
-- Safe to run twice.

ALTER TABLE devotionals
  ADD COLUMN IF NOT EXISTS category       TEXT,     -- genesis-series | new-testament | wisdom | NULL
  ADD COLUMN IF NOT EXISTS cover_image    TEXT,     -- path under /public
  ADD COLUMN IF NOT EXISTS is_published   BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS available_from DATE,     -- NULL = available now
  ADD COLUMN IF NOT EXISTS paperback_url  TEXT,     -- NULL = no paperback yet
  ADD COLUMN IF NOT EXISTS sort_order     INTEGER;

COMMENT ON COLUMN devotionals.is_published IS
  'Shows on the Library shelf. Defaults false so a new row is never published by accident.';
COMMENT ON COLUMN devotionals.available_from IS
  'Release date. A future date renders the card in its Coming Soon state.';
COMMENT ON COLUMN devotionals.paperback_url IS
  'Real product URL. NULL means the Buy the Paperback button shows an unavailable state, never a broken link.';

-- Covers, lifted from getCoverImage() so the switch statements can go.
UPDATE devotionals SET cover_image = v.cover
FROM (VALUES
  ('The Tempting of Jesus',           '/tempting-of-jesus-cover.png'),
  ('The Wisdom of Proverbs',          '/Wisdomofproverbsnewcover.png'),
  ('The Testing of Joseph',           '/TheTestingofJospehnewcover.png'),
  ('The Obedience of Abraham',        '/obedienceofabraham28day.png'),
  ('The Creation of the World',       '/Day1cover.png'),
  ('The Fall of Man',                 '/thefallofman.png'),
  ('The Flood of Noah',               '/Floodofnoah.png'),
  ('The Promise Through Isaac',       '/ThePromiseThroughIsaac.png'),
  ('The Wrestling of Jacob',          '/TheWrestlingofJacob.png'),
  ('The Deliverance of Moses',        '/TheDeliveranceofMoses.png'),
  ('The Covenant at Sinai',           '/TheCovenantatSinai.png'),
  ('The Presence of God',             '/ThePresenceofGod.png'),
  ('Holiness Before God',             '/ThegolinessbeforeGod.png'),
  ('The Wilderness Journey',          '/Wildernessjourneycover.png'),
  ('The Rebellion in the Wilderness', '/RebellionintheWilderness.png'),
  ('The Promised Land Ahead',         '/promieslandcover.png'),
  ('The Disciples of Jesus',          '/disciplesofjesusdevotional.png'),
  ('Women of the Bible',              '/womenofthebible.png'),
  ('The Faith of Job',                '/faithofjob.png'),
  ('The Calling of Moses',            '/callingofmosesdevotional.png'),
  ('The Heart of David',              '/heartofdaviddevotional.png'),
  ('The Transforming of Paul',        '/transformingofpauldevotional.png'),
  ('The Courage of Daniel',           '/thecourageofdaniel.png'),
  ('The Rise of Esther',              '/theriseofester.png')
) AS v(title, cover)
WHERE devotionals.title = v.title;

-- Categories. Only the three the Library filters offer; anything else stays
-- NULL and appears under All Studies only, rather than being forced into a
-- bucket it does not belong in.
UPDATE devotionals SET category = 'genesis-series'
WHERE title IN (
  'The Creation of the World', 'The Fall of Man', 'The Flood of Noah',
  'The Obedience of Abraham', 'The Promise Through Isaac',
  'The Wrestling of Jacob', 'The Testing of Joseph'
);

UPDATE devotionals SET category = 'new-testament'
WHERE title IN (
  'The Tempting of Jesus', 'The Disciples of Jesus', 'The Transforming of Paul'
);

UPDATE devotionals SET category = 'wisdom'
WHERE title IN ('The Wisdom of Proverbs', 'The Faith of Job');

-- Visibility and order, matching FEATURED_STUDY_ORDER exactly as it stands
-- tonight: Proverbs, then Tempting of Jesus in the 1 November slot. Everything
-- else stays unpublished until it is deliberately turned on.
UPDATE devotionals SET is_published = true, sort_order = 1
WHERE title = 'The Wisdom of Proverbs';

UPDATE devotionals SET is_published = true, sort_order = 2, available_from = DATE '2026-11-01'
WHERE title = 'The Tempting of Jesus';

-- What the shelf will show after this runs.
SELECT title, category, total_days, is_published, available_from, sort_order, cover_image
FROM devotionals
ORDER BY is_published DESC, sort_order NULLS LAST, title;
