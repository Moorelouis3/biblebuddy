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

## Bible in One Year: scripted days waiting on a local audio render
The Bible in One Year day writer agent has written and wired in scripts
through Day 18 (lib/bibleYearDayEighteenScript.ts, Genesis 43-44, "Judah
Defends Benjamin" — most recent), each verified with `tsc --noEmit`. None of
them have been rendered or uploaded from this environment: it has no
OPENAI_API_KEY and no Supabase service credentials, by design. Run
`npx tsx scripts/render-pending-bible-year-days.ts` locally (it checks
storage and only renders what is actually missing, so it's safe to re-run
any time). Check each printed cast line for any non-person names (add
offenders to NOT_A_PERSON in lib/bibleYearAutoCast.ts and re-render if so).
This entry will keep being updated in place as later days get written —
it is not meant to grow a new block per day.
