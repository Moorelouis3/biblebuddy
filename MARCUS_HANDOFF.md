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
through Day 58 (lib/bibleYearDayFiftyEightScript.ts, Joshua 8-11,
"Conquest and Covenant Obedience" — Ai retaken cleanly right after
Achan's sin cost the first attempt; Joshua stopping the whole campaign to
build an altar on Mount Ebal and read the entire law, blessings and
curses, aloud to every man, woman, child, and stranger; the Gibeonites
tricking Israel into a peace treaty with moldy bread and worn sandals,
and Israel keeping the oath even after the deception is exposed because
it was sworn in the LORD's name; the five-king battle at Gibeon where
hailstones kill more than the sword and Joshua asks the sun to stand
still over Gibeon and the moon over Ajalon; the southern campaign's city
list (Makkedah, Libnah, Lachish, Eglon, Hebron, Debir) falling in the
same complete-obedience pattern Achan's shortcut had broken; the northern
coalition under Jabin of Hazor with horses and chariots "as the sand upon
the sea shore," broken at the waters of Merom with only Hazor itself
burned; and the chapter closing on "the land rested from war," with a
throwaway mention that Anakim giants survive in Gaza, Gath, and Ashdod —
the cities that raise Goliath later); Day 57
(lib/bibleYearDayFiftySevenScript.ts, Joshua 4-7,
"Memorial Stones, Jericho, and Achan" — the twelve memorial stones taken
from the Jordan riverbed and set up at Gilgal so a child years later would
ask what they mean and get a true answer; the whole wilderness-born
generation circumcised on enemy soil before any fighting starts, and
Gilgal named for God "rolling away the reproach of Egypt"; manna ceasing
the morning after Israel first eats the land's produce; the captain of
the LORD's host meeting Joshua outside Jericho and telling him to remove
his sandals, echoing Moses at the burning bush; Jericho's wall falling
after seven silent days of marching and one shout, with Rahab's household
pulled out safe and the city's silver and gold devoted to the LORD's
treasury rather than looted; and Achan's hidden theft from Jericho's
plunder costing Israel thirty-six lives at Ai before he is exposed by lot
and confesses exactly what he took and where he buried it); Day 56
(lib/bibleYearDayFiftySixScript.ts, Deuteronomy 34;
Joshua 1-3, "Moses Dies and Joshua Leads" — Moses viewing the whole land
from Pisgah and dying there, buried by God himself in a grave nobody has
ever found ("no man knoweth of his sepulchre unto this day"); Joshua's
book opening with no pause to grieve ("Moses my servant is dead; now
therefore arise") and God repeating Moses's own promise back to him word
for word ("as I was with Moses, so I will be with thee"); the two and a
half tribes east of the Jordan pledging loyalty before Joshua has led
anything yet; Rahab hiding the two spies in Jericho and confessing faith
in the God of Israel before Israel has even arrived at her gate; and
Israel crossing the Jordan on dry ground behind the ark, the priests
stepping into the flooded river before the water stops rather than
after; Day 55 (lib/bibleYearDayFiftyFiveScript.ts, Deuteronomy 30-33,
"Choose Life and Receive Moses' Blessing" — the restoration promise if
Israel returns after exile ("the LORD thy God will circumcise thine
heart"), the "choose life" passage where Moses insists the command is not
in heaven or beyond the sea but near enough to touch, Moses at a hundred
and twenty handing Joshua the charge in public and ordering the law read
aloud every seven years at Tabernacles, God telling Moses plainly (before
Israel has even crossed the Jordan) that they will fall into idolatry and
having him write the Song of Moses as future testimony against them, the
Song itself (the Rock, the eagle and the apple of the eye, Jeshurun
growing fat and kicking, the vengeance and healing that belong to God
alone, and Moses sent up Nebo to see the land but not enter it because of
Meribah), and Moses blessing every tribe by name before he dies, closing
on "underneath are the everlasting arms"; Day 54
(lib/bibleYearDayFiftyFourScript.ts, Deuteronomy 26-29,
"Blessing, Curse, and Covenant Renewal" — most recent: the firstfruits
basket with its recited creed ("A Syrian ready to perish was my father"),
the third-year tithe and the mutual "avouching" between Israel and God,
the law stones plastered and written on Mount Ebal, the twelve curses
recited antiphonally between Gerizim and Ebal with the whole nation
answering amen, the full blessings-and-curses of chapter 28 (its 68-verse
curse half echoing Leviticus 26 from Day 38, now aimed at the generation
about to actually live it), and Moses renewing the covenant in Moab with
the line "the secret things belong unto the Lord our God, but those
things which are revealed belong unto us and to our children"; Day 53
(lib/bibleYearDayFiftyThreeScript.ts, Deuteronomy 22-25, "Everyday
Faithfulness" — the lost-property and roof-battlement laws, the
virginity-tokens dispute, who is excluded from the assembly and the
Ammonite/Moabite exclusion that gets revisited once Ruth's story arrives,
the escaped-servant and usury laws, divorce and the newly married man's
year off from war, gleaning tied to "remember you were a slave in Egypt,"
and the closing set — forty stripes, the unmuzzled ox, levirate marriage
and the shoe-loosing ceremony, honest weights, and the command to
remember Amalek; Day 52 (lib/bibleYearDayFiftyTwoScript.ts, Deuteronomy
18-21, "Prophets, Cities, and Justice" — the Levites' portion and
the promise of a prophet like Moses in place of divination and magic,
cities of refuge set apart for someone who kills by accident, the
two-or-three-witness rule and the "eye for eye" ceiling that caps
punishment rather than expanding it, the laws of war and their real
exemptions (a new house, an unharvested vineyard, an unfinished
engagement, even plain fear), the unsolved-murder heifer ritual, the
captive woman's required month of mourning before anything else, the
unloved wife's firstborn kept from being passed over, the rebellious son,
and the law that a hanged body cannot stay up past sundown — the line
Paul later quotes to describe the cross; Day 51
(lib/bibleYearDayFiftyOneScript.ts, Deuteronomy 14-17, "Worship, Justice,
and Leadership" — clean and unclean food as a daily marker of identity,
the third-year tithe for the Levite, stranger, fatherless, and widow, the
seven-year release of debt and the warning against watching the calendar
to avoid lending, a servant who stays by choice with his ear pierced to
the doorpost, the firstborn animals set apart, the three pilgrim feasts
(Passover, Weeks, Tabernacles) with giving scaled to what each person
actually has, judges warned against bribes paired with a warning against
imitation worship at the altar, and a law for a king Israel has not asked
for yet — no multiplying horses, wives, or gold, and a lifelong
requirement to read his own copy of the law; Day 50 (lib/bibleYearDayFiftyScript.ts,
Deuteronomy 10-13, "Covenant Loyalty From the Heart" — new tablets carried in
an ark, the Levites set apart with God himself as their only inheritance,
Moses's summary question ("what does the Lord your God require of you?"),
circumcising the heart, the blessing and curse set on Mount Gerizim and
Mount Ebal, tearing down the land's old worship sites in favor of one
chosen place, the everyday-meat-versus-sacrifice distinction and the
blood prohibition, and the warning against a real sign attached to a
false god, even from a prophet, a brother, a wife, or a whole city; Day
49 (lib/bibleYearDayFortyNineScript.ts, Deuteronomy 6-9, "Love God and
Remember Grace" — the Shema and the command to
love God with everything, the warning about forgetting him once the
houses are built and the stomachs are full, why Israel was chosen at all
(not because they were many, but because God loved them and kept a
promise), the wilderness testing and the manna ("man doth not live by
bread only"), and Moses retelling the golden calf and his forty-day
intercession from the inside — the only reason, he says, there is anyone
left to be reading this today; Day 48
(lib/bibleYearDayFortyEightScript.ts, Deuteronomy 2-5,
"Remembering the Journey and the Covenant" — the thirty-eight
wilderness years recapped, Edom and Moab spared on purpose while Sihon is
destroyed after refusing peace, Og of Bashan and his nine-cubit iron bed
frame, Moses's request to cross the Jordan refused with Joshua charged to
finish the job instead, the warning against idolatry paired with a promise
that God can still be found after exile, and the covenant at Horeb retold
with the Ten Commandments restated almost word for word (the Sabbath's
reasoning now tied to the Egypt deliverance rather than creation); Day 47
(lib/bibleYearDayFortySevenScript.ts, Numbers 34-36;
Deuteronomy 1, "Land Boundaries and Moses Looks Back" — the
land's border drawn out point by point, Eleazar and Joshua plus one named
leader per tribe appointed to divide it, the Levites' forty-eight
scattered cities including the six cities of refuge, the law separating
murder from accidental killing (no ransom either way, blood pollutes the
land), Zelophehad's daughters ruled to marry within their own tribe so
Manasseh keeps its land — closing the book of Numbers — and then
Deuteronomy opens with Moses himself retelling the journey and the spies
in his own voice, owning his exclusion from the land while laying the
blame on the people who caused it; Day 46 (lib/bibleYearDayFortySixScript.ts, Numbers 30-33,
"Vows, Victory, and the Journey Reviewed" — the law on
binding vows and when a father or husband can void a woman's, the war
of vengeance on Midian that kills Balaam and closes Moses's public
life (including the hard passage where Moses orders the complicit
women and boys killed and only the virgin girls spared — read plainly,
not softened), the officers' report that not one Israelite soldier was
lost, Reuben and Gad's request to settle east of the Jordan and Moses's
Kadesh-barnea rebuke before he agrees to their compromise, and the
forty-two-station itinerary of the whole wilderness journey that Moses
wrote down himself, with Aaron's death folded into the list without a
pause. Note: like Days 38 and 45, this day's four chapters run long in
raw scripture (~19.7k characters), so expect its runtime above the
other days — that's the fixed reading, not a mistake; Day 45
(lib/bibleYearDayFortyFiveScript.ts, Numbers 26-29, "A New Generation
Counted" — the second census after the Baal-Peor plague shows almost
the same total as the first census forty years earlier despite every
man from that first count now dead except Caleb and Joshua,
Zelophehad's five daughters get the inheritance law changed in their
favor, Moses learns he will die outside the land and asks God for a
shepherd for the people rather than a pardon for himself, Joshua is
publicly commissioned, and the chapter closes with the fixed calendar
of daily, monthly, and feast offerings including Tabernacles'
descending 70-bull count); Day 44 (lib/bibleYearDayFortyFourScript.ts, Numbers 22-25,
"Balaam, Blessing, and Compromise" — Balak hires Balaam to
curse Israel, Balaam's donkey sees the angel of the Lord before the
prophet does, four oracles that turn every attempted curse into a
blessing and end with the messianic "Star out of Jacob" prophecy, and
the Baal-Peor apostasy that costs 24,000 lives until Phinehas stops the
plague — Balaam later advised that very seduction once he found out he
could not curse Israel outright; Day 43 covered Numbers 18-21,
"Provision, Judgment, and the Bronze Serpent" — priestly and
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
