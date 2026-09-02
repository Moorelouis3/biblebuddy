## data/blog-topics-queue.json: the "existing 27" behind the Pinterest batch includes already-published slugs
Now that all 13 Pinterest posts are dequeued, the front of that queue is
can-you-lose-your-salvation, how-to-spend-1-hour-with-god, and
what-does-the-bible-say-about-fear - all three already live on the site
(published weeks ago, under lib/blogContent.ts). Worth checking the rest
of that "existing 27" for other duplicates before the routine works
through it next, or a future run may try to recreate a slug that already
exists.

## Held back and discarded: duplicate Armor of God post
While processing today's batch, the agent wrote a second "Armor of God"
post (the-armor-of-god-explained, pillar length, 4,500+ words) from
content-buddy's separate queue before realizing the Pinterest batch's
own armor-of-god-explained (focused, ~1,700 words) covers the same
topic. To avoid two near-duplicate Armor of God posts live at once, and
because the session's stop hook blocks ending with untracked files, the
longer draft was deleted rather than left sitting unpublished
indefinitely. If Louis wants a deeper pillar-length Armor of God piece
later, it can be rewritten fresh under a different angle/slug.

## New blog post touches contested doctrine: names of God
"The Names of God and What They Mean" (/blog/names-of-god-meanings) is
careful to separate the formal divine names Scripture actually
attributes to God (Elohim, YHWH/I AM, El Shaddai, El Elyon, Adonai) from
the popular compound "Jehovah-X" titles - only Jehovah Jireh, Jehovah
Nissi, and Jehovah Shalom actually appear as compound words in the KJV
text (as memorial place names, not self-descriptions), while Jehovah
Rapha, Rohi, and Tsidkenu are later titles drawn from descriptive
phrases and never appear as compound words in the KJV. Please review for
doctrinal accuracy before wide promotion.

## New blog post touches contested doctrine: biblical numbers
"Biblical Numbers and Their Meanings" (/blog/biblical-numbers-meanings)
draws a hard line between numeric patterns Scripture actually repeats
with real citations (7 = completion, 40 = testing, 12 = God's people,
3 = resurrection, 666 = Revelation 13:18's literal claim) versus popular
numerology with no textual support (5 = grace, 66 books as
"meaningful") - it explicitly states the second group has no scriptural
backing rather than presenting it as established fact. Please review
where that line is drawn before it gets wide promotion, since numerology
is an area where readers push back hard in either direction.

## New blog posts on fallback banners: Pinterest funnel batch
11 posts from the 2026-09-01 Pinterest funnel batch had no `bannerImage`
in data/blog-topics-queue.json, so each reused its category's fallback
banner: armor-of-god-explained, genesis-1-explained, genesis-2-explained,
garden-of-eden-four-rivers, biblical-numbers-meanings, and
men-who-walked-with-god are on /Whatisthebiblebanner.png (bible-insights
or verse-breakdowns); who-was-adam, who-was-eve, and
inspiring-biblical-characters are on /5thingsholdingmenback.png
(character-studies); who-is-god-as-a-father and
lessons-from-the-life-of-jesus are on /anxietyarticlebanner.jpg
(christian-foundations). Louis may want custom Pinterest-matched banners
for these since they are the pin-facing posts.

## New blog post touches contested doctrine: eternal security
The blog writer agent just published "Can You Lose Your Salvation? What
the Bible Says" (/blog/can-you-lose-your-salvation). This covers eternal
security / "once saved always saved" vs. conditional security, a topic
sincere Christians genuinely disagree on. The post presents both views
honestly (John 10:28-29, Romans 8:38-39, Philippians 1:6 for eternal
security; Hebrews 6:4-6, Hebrews 10:26-27, 2 Peter 2:20-21 for
conditional security) without preaching one as settled fact, per the
format spec's doctrinal-sensitivity rule. Louis should read it himself
since this ships unreviewed.

## New blog post on fallback banner: What Does the Bible Say About Fear?
The blog writer agent just published "What Does the Bible Say About Fear?"
(/blog/what-does-the-bible-say-about-fear). Its topics-queue.json entry
had no `bannerImage`, so it reused the christian-foundations category
fallback (`/anxietyarticlebanner.jpg`, same banner as the anxiety post).
Louis may want to swap in a custom banner for this one later.

## Level 2 upgrade agent can't reach Life Buddy's API
The scheduled Level 2 upgrade run at 2026-08-15 12:26 UTC couldn't pull the
queue at all — the container's network egress proxy blocks
life-buddy-production.up.railway.app with a 403 (confirmed via both curl and
WebFetch, so it's a policy denial, not a flaky connection). This means the
Level 2 pipeline is fully stuck: no chapter can be pulled, converted, or
reported complete until this environment's egress allowlist includes that
Railway domain. Needs an admin to add it to the session/environment's egress
policy.

## New blog post on fallback banner: What Does Selah Mean in the Bible?
The blog writer agent just published "What Does Selah Mean in the Bible?"
(/blog/what-does-selah-mean). Its topics-queue.json entry had no
`bannerImage`, so it reused the bible-insights category fallback
(`/Whatisthebiblebanner.png`). Louis may want to swap in a custom banner
for this one later.

## Blog writer ran on the wrong queue for part of today's batch request
Louis asked (in chat, not via IDEAS.md) for 13 blog posts written today.
The agent initially pulled from content-buddy's `blog/topics-queue.json`
(the regular backlog) and wrote 11 posts from its front before realizing,
partway through, that Louis actually meant the 13-post Pinterest funnel
batch that another session had just added to `data/blog-topics-queue.json`
in this repo (see the "Pinterest funnel batch" commit, 2026-09-01). The
11 wrong-queue posts are real, fully verified, published content (KJV
checked, tsc/lint clean) - not wasted, just not the urgent batch. The
correct 13 Pinterest posts are being written now in the same session.
One of the 11, "The Armor of God Explained" (the-armor-of-god-explained,
pillar length), duplicates the topic of the Pinterest batch's own
"armor-of-god-explained" (focused length) - it was written and verified
but held back, NOT published, to avoid two near-duplicate Armor of God
posts live at once. It sits on disk if Louis wants it published later
under a different angle, or it can be discarded.

## New blog post touches contested doctrine: Christianity and science
"Can You Be a Christian and Believe in Science?" (/blog/christian-and-science)
presents young earth, old earth, and evolutionary creation neutrally, states
explicitly that sincere Christians land in different places, and does not
pick a winner. Flagging per the format spec's doctrinal-sensitivity rule.

## New blog post touches contested doctrine: what happens to those who never heard of Jesus
"What Happens to People Who Never Heard of Jesus?" (/blog/people-who-never-heard-of-jesus)
states plainly that Scripture does not give a complete, certain answer and
that claiming full certainty either way goes beyond the text. Flagging per
the format spec's doctrinal-sensitivity rule so Louis can read it himself.

## Bible in One Year days waiting on local audio render
Scripts through Day 80 are written and pushed, but none of them have been
rendered — this environment has no OPENAI_API_KEY or Supabase service key.
Run `npx tsx scripts/render-pending-bible-year-days.ts` on a machine that
has those keys; it auto-detects every day with a script but no current
audio and renders/uploads them in one batch. This line will be updated as
the day writer keeps going rather than getting a new entry per day.
Also: Louis flagged Day 65's rendered audio as sounding very short. The
Day 65 script itself is normal length (4 chapters, 6 blocks, ~7 min of
teaching/opening/closing text, in line with other 4-chapter days), so this
can't be checked from the day-writer environment (no keys to inspect the
actual stored file) — worth a listen/re-render check on the machine that
has the keys.
