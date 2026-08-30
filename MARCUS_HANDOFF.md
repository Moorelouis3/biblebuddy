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
through Day 43 (lib/bibleYearDayFortyThreeScript.ts, Numbers 18-21,
"Provision, Judgment, and the Bronze Serpent" — most recent: priestly and
Levite duties spelled out right after Korah, the red heifer ordinance for
cleansing from death, Miriam's death and Moses striking the rock instead
of speaking to it at Meribah, Edom refusing passage and Aaron dying on
Mount Hor, the fiery serpents and the bronze serpent lifted up on a pole,
and victories over Sihon and Og opening the road east of the Jordan;
Day 42 covered Numbers 14-17,
"Rebellion and God's Chosen Priesthood" — the nation refuses
to go up after the spies' report, God sentences that generation to forty
years, laws for offerings "in the land" are given anyway as proof the
promise still stands, Korah's rebellion is swallowed and burned, and
Aaron's rod buds overnight to settle the priesthood question for good;
Day 41 covered Numbers 10-13,
"Journey, Complaints, and Spies" — the trumpets, the cloud
finally lifting off Sinai after nearly a year camped there, then Israel
unraveling fast — complaining at Taberah, craving quail at
Kibroth-hattaavah, Miriam and Aaron turning on Moses over the Cushite
wife, and the twelve spies bringing back two opposite reports of the
same land; Day 40 covered Numbers 6-9, "Blessing,
Dedication, and Passover" — the Nazirite vow, the priestly
blessing, twelve days of identical tribal offerings at the tabernacle's
dedication, the Levites publicly set apart in place of the firstborn,
and a second Passover made for anyone unclean or far off on the first
one; Day 39 covered Numbers 2-5, "Camp Order and Purity" — the tribes
camp in a fixed order around the tabernacle, the Levites are numbered
and split into three carrying families in place of Israel's firstborn,
then the camp gets laws for purity, restitution, and the test for a
suspected wife; Day 38 covered
Leviticus 25-27; Numbers 1, "Jubilee, Covenant, and Israel Counted" — the
sabbath year and the Jubilee reset, blessing and curse, vows and
valuations, then Numbers opens with the tribe-by-tribe census and the
Levites set apart from it. Note: Day 38's four assigned chapters run
unusually long in raw text (~26k characters of scripture alone, mostly
the census numbers in Numbers 1), so expect its runtime to land well
above the other 4-chapter days — that's the fixed reading, not a
mistake, and scripture was not trimmed to compensate; Day 37 covered
Leviticus 21-24, "Priests, Feasts, and Sacred Order," priestly holiness
and the blemish rules for who may serve at the altar, the sacred
calendar (Sabbath, Passover, Firstfruits, Weeks, Trumpets, the Day of
Atonement, Tabernacles), the lamp and showbread, and the blasphemer
stoned with the "eye for eye" ceiling on punishment; Day 36 covered Leviticus 17-20,
"Holy Living Before a Holy God," the holiness code: where blood belongs,
sexual and family boundaries, love your neighbor as yourself, honest
weights, and the penalties chapter enforcing it all; Day 35 covered
Leviticus 13-16, "The Day of Atonement," leprosy diagnosis and cleansing,
house mildew, bodily discharges, and the two goats; Day 34 covered
Leviticus 9-12, "Worship, Holiness, and Clean Living,"
Aaron's first day serving, Nadab and Abihu's death, clean/unclean laws,
and childbirth purification; Day 33 covered Leviticus 5-8, "Guilt,
Consecration, and Priests," the sliding-scale guilt offering and
Aaron's consecration; Day 32 covered Leviticus 1-4, "Offerings and
Atonement," opening Leviticus; Day 31 covered Exodus 37-40, "The
Tabernacle Is Finished," closing out Exodus; Day 30 covered Exodus
33-36, "God's Presence Is Enough"; Day 29 covered Aaron's ordination
and the golden calf, Day 28 covered the tabernacle instructions, Day 27
covered the covenant law and its sealing in blood, Day 26 covered the
Ten Commandments, Day 25 covered the sea crossing through the manna,
Day 24 covered Passover and the final plagues, Day 23 covered Pharaoh's
first refusal and the first three plagues, Day 22 opened Exodus, Day 21
closed out Genesis), each verified with `tsc --noEmit`. None of them have been rendered or
uploaded from this environment: it has no OPENAI_API_KEY and no Supabase
service credentials, by design. Run
`npx tsx scripts/render-pending-bible-year-days.ts` locally (it checks
storage and only renders what is actually missing, so it's safe to re-run
any time). Check each printed cast line for any non-person names (add
offenders to NOT_A_PERSON in lib/bibleYearAutoCast.ts and re-render if so).
This entry will keep being updated in place as later days get written —
it is not meant to grow a new block per day.
