## Stale local main recurred again (2026-09-04, Psalms 6 run) — still unfixed at the environment level
Same class of issue as every entry below this one: this run's fresh checkout
had local `main` cached at the old "Esther 5" tip while `git fetch origin
main` immediately showed the real `origin/main` already at the current
"Psalms 5 / Bible in One Year Day 100" tip. Fixed the same way as before
(`git checkout -B main origin/main`) before touching any files, so nothing
was at risk this time. Noting only because this is now at least a fifth
occurrence across this routine and the Bible in One Year day writer, all
traceable to the same root cause flagged repeatedly below: whatever seeds
or caches the local `main` ref for a fresh session is not starting it at
the true current `origin/main`. Low severity this run (a plain fast
forward mismatch, not a force push or divergent history), but the pattern
itself is the thing worth fixing so a future run does not have to catch it
by hand every single time.

## Session started with a stale local main branch, unrelated history from origin
This run's fresh checkout had a local `main` branch pointing at an old commit
("Add Esther 5 study notes" / Day 44 era) while the actual work happened on a
detached HEAD sitting on the real, current origin/main (Day 90 / Job 39 era).
`git merge-base` between the two found no common ancestor at all — genuinely
unrelated histories, not just "behind." A plain `git fetch` confirmed
origin/main really is the Day 90/Job 39 tip; the stale local `main` was fixed
with `git checkout -B main origin/main` before committing and pushing, so
nothing was lost. This is the same class of problem the
`rescue/unpushed-bible-notes-2026-08-13` branch was created for before —
worth a look at how this environment seeds/updates the local `main` ref on
each fresh session, since a future run that pushes without noticing the
divergence risks either a rejected push or, worse, someone reaching for
`--force` on it.

Recurred in the very next Bible in One Year day writer run (2026-09-03,
Day 93 era): local `main` was again stale (Day 44 era) against the real
origin/main (Day 92 era). This run wrote a Day 45 script against the stale
base, then discovered on `git push` that Day 45 already existed upstream
(scripts run through Day 92). No data was lost — the stale local commit
was this run's own unpushed work, safely discarded with `git reset --hard
origin/main`, and the run re-targeted the actual next missing day (93).
But this is now two occurrences in a row for this same routine, so the
environment-seeding question above is worth prioritizing rather than
trusting each run to catch it by hand.

Third occurrence, same run type (2026-09-03, Day 95): this time local
`main` was stale but not divergent — `git merge-base` found a real common
ancestor, and the stale local branch happened to be several commits
*behind* a detached HEAD that already had this run's new commit stacked
correctly on top of the true origin/main tip. `git push origin main` still
failed (it pushes the stale local ref, not HEAD, while detached).
`git push origin HEAD:main` pushed the correct commit with no data lost,
then `git checkout -B main origin/main` re-synced the local branch. Three
for three now on this routine alone — worth fixing at the environment
level (make sure each fresh session's local `main` actually starts at
current origin/main) rather than relying on every run to diagnose it by
hand.

## Blog writer run 2026-09-02: duplicate Armor of God topic dequeued, zero posts written this run
Today's run took the front of content-buddy's blog/topics-queue.json,
which was still "The Armor of God Explained" (the-armor-of-god-explained,
pillar length). This is the same duplicate a previous run already found
and discarded (see the "Held back and discarded: duplicate Armor of God
post" entry below) - it duplicates the already-published
/blog/armor-of-god-explained (2026-09-01). That earlier run deleted its
draft but never removed the topic from content-buddy's queue, so it sat
at the front and would have forced every future run into the same dead
end.

Rather than write a third near-duplicate Armor of God post, this run
removed that entry from content-buddy's queue (no biblebuddy commit
needed since nothing was published) and is stopping cleanly with no post
written this run, per the queue-empty handling in the job description.
The queue's real next topic, "Is It a Sin to Doubt God?", is now at the
front for the next run.

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
Scripts through Day 115 are written and pushed, but none of them have been
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

## Urgent: origin/main was force pushed mid run today, replacing the whole shared branch history
This 2026-09-03 hourly chapter run started on a detached HEAD (`333e1e1`)
that had no common ancestor with `origin/main` (`ebdd3da`, the "Esther 5"
line) — the same divergence family flagged at the top of this file
several times before, but the worst variant yet: two genuinely separate,
independently verified forks of this entire project, one having reached
Job 1-42 and Psalms 1-2, the other having reached Esther 1-5, Nehemiah
6-13, and various Bible in One Year scripts through Day 96.
To be safe, the `ebdd3da` line's unique detached HEAD content was pushed
intact to `rescue/unpushed-bible-notes-2026-09-03` early in this run, a
full Esther 6 chapter was written and verified against that line, and it
was committed locally. Partway through logging that chapter, `git push
origin main` was rejected as non fast forward. `git fetch origin main`
then showed `origin/main` had been force pushed (`ebdd3da...333e1e1
main -> origin/main (forced update)`) to the `333e1e1` line, discarding
the `ebdd3da` line as the branch tip entirely. That line, including this
run's own local commit on top of it (the Esther 6 work, which turned out
to be unnecessary anyway since the `333e1e1` line already has its own
`estherSixSource.ts`), was pushed intact to a second rescue branch,
`rescue/pre-force-push-line-2026-09-03`, before anything else was
touched. `origin/main` itself was never written to during any of this,
so nothing on the live branch was damaged, but a force push that discards
an entire branch's history like this is exactly the outcome the earlier
entries in this file warned was a risk of the environment repeatedly
seeding fresh sessions with a stale or wrong local `main` ref. This
deserves a look from a person, not just another automated log: confirm
the force push to `origin/main` was intentional (and by whom or what), and
decide whether anything unique to the `ebdd3da` line (its own Esther 1-5
chapters, Nehemiah 6-13, the Bible in One Year scripts through Day 96) is
still wanted, since it now only exists on `rescue/pre-force-push-line-2026-09-03`
and would otherwise sit there indefinitely. This run reset its own local
`main` to the verified new `origin/main` tip and continued with normal
forward progress from there (next chapter after Psalms 2), rather than
attempting to resolve the force push itself.
