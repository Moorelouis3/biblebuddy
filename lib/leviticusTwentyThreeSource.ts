export type LeviticusTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyThreeRawNotes(rawText: string): LeviticusTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Leviticus 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+23:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Leviticus\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 23:${startVerse}` : `Leviticus 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Leviticus 23 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_THREE_RAW_NOTES = `# Leviticus 23:1-4
# 🗓️ The LORD's Appointed Feasts
---
## 🗣️ And The LORD Spake Unto Moses, Saying
This line opens a brand new block of instructions, and it repeats five times through this chapter (verses 1, 9, 23, 26, and 33), each time marking the start of a fresh section. It's God's own voice giving Moses this entire festival calendar directly, not something Moses came up with on his own.
🗣️ Marks the start of a brand-new block of instruction
🔁 The same phrase repeats five times through this chapter
📜 The whole festival calendar comes straight from God, not Moses
---
## 📅 Concerning The Feasts Of The LORD
"Feasts" translates a Hebrew word meaning an "appointed time" or "set meeting" - not a party thrown whenever people feel like it, but a fixed date on God's own calendar. Israel didn't invent these days; they were told exactly when to show up.
📅 "Feasts" means an appointed, fixed meeting time
🗓️ Set by God's calendar, not by human choice
🤝 The same word is used elsewhere for meeting God at the tabernacle
---
## 🙋 Holy Convocations
A "convocation" is a required sacred assembly - not an optional gathering, but a summons for the whole community to stop and come together. "Holy" marks the day itself as set apart from ordinary time.
🙋 A required assembly, not something optional
✨ "Holy" marks the day as set apart from ordinary time
👥 The whole community was expected to show up
---
## 📋 Even These Are My Feasts
God claims direct ownership of this calendar with the word "my." This line launches the list that follows: seven appointed times spread across the year - the weekly Sabbath, Passover, Unleavened Bread, Firstfruits, Weeks, Trumpets, the Day of Atonement, and Tabernacles.
📋 "My feasts" - God claims direct ownership of the calendar
7️⃣ Previews the seven appointed times still to come
🗺️ Works like a roadmap for the rest of the chapter
---
## 🛠️ Six Days Shall Work Be Done
Before listing any yearly festival, the chapter starts with the pattern underneath all of them: six days of ordinary labor. This sets the baseline rhythm that every other festival either interrupts or echoes.
🛠️ Establishes the ordinary six-day work rhythm
🔁 The baseline every other festival breaks from
📆 The weekly pattern is given before the yearly one
---
## 😴 The Seventh Day Is The Sabbath Of Rest
The weekly Sabbath is counted among the "feasts" even though it happens every single week instead of once a year. It's the first and most frequent appointment on God's whole calendar, tracing back to God's own rest in Genesis 2:2-3.
😴 Counted as a "feast" despite happening every week
🌍 Traces back to God's own rest in Genesis 2:2-3
🥇 The most frequent appointment on this entire calendar
---
## 🏠 In All Your Dwellings
Unlike the yearly festivals coming up, which required travel to the tabernacle, the weekly Sabbath was kept everywhere Israelites lived. Rest didn't depend on being near a shrine - it was built into daily life no matter where someone was.
🏠 Kept at home, unlike the travel-required yearly feasts
📍 Didn't depend on nearness to the tabernacle
🔁 Built into daily life everywhere, every single week

# Leviticus 23:5-8
# 🐑 Passover And Unleavened Bread
---
## 🗓️ The Fourteenth Day Of The First Month
The "first month" is Abib, later called Nisan, which falls in springtime, roughly our March-April. Israel's whole religious year began here, not in the fall - a deliberate reset tied to the month God rescued them from Egypt.
🗓️ The first month is Abib, later called Nisan
🌱 Falls in springtime, roughly March-April today
🔄 Israel's religious year restarted here, tied to the Exodus
---
## 🌆 At Even Is The LORD's Passover
"Even" means evening, specifically the twilight between sunset and full dark - the exact time boundary given for the very first Passover in Exodus 12:6. The yearly celebration ties straight back to the original night God spared Israel's firstborn.
🌆 "Even" means twilight, between sunset and dark
🔗 Matches the timing given for the first Passover in Exodus 12:6
🇪🇬 Directly recalls the actual night of the Exodus
---
## 🍞 The Feast Of Unleavened Bread
This festival begins the very next day after Passover and runs a full week. Passover and Unleavened Bread are technically two separate feasts back-to-back, but they were often thought of together as one extended Exodus memorial.
🍞 Begins the day right after Passover
📅 Runs a full seven days
🔗 Often treated as one connected Exodus memorial
---
## 🚫 Seven Days Ye Must Eat Unleavened Bread
"Unleavened" means made without yeast, so the bread doesn't rise. Exodus 12:34 explains why: Israel left Egypt in such a hurry there wasn't time to let dough rise, so flat bread became a lasting symbol of that sudden departure.
🚫 "Unleavened" means made without yeast
🏃 Recalls Israel's rushed departure from Egypt
📖 The original reason is explained in Exodus 12:34
---
## 🙅 No Servile Work Therein
"Servile work" means one's regular job or business, a slightly narrower category than the total work-ban on the weekly Sabbath. That's why some routine tasks, like food preparation, were still allowed on this festival day but not on the Sabbath itself.
🙅 "Servile work" means one's regular job or business
⚖️ Narrower than the total ban on the weekly Sabbath
🍳 Food preparation was typically still allowed
---
## 🔥 An Offering Made By Fire Unto The LORD Seven Days
Every one of these seven days included a fire offering at the altar, not just the first and last. The festival wasn't only a week off work - it was a week of continuous worship, bookended by two required sacred assemblies.
🔥 Offerings were made on every one of the seven days
📚 Not just a week off, but a week of continuous worship
🔖 Bookended by holy convocations on day one and day seven
---
## 7️⃣ In The Seventh Day Is An Holy Convocation
The festival closes the same way it opened, with a required sacred assembly and no regular work. This bookend pattern - holy day, ordinary days between, holy day - shows up again later in this chapter with Tabernacles.
7️⃣ Closes the festival the same way it opened
📚 A bookend pattern: holy day, then holy day again
🔁 The same shape repeats later in this chapter with Tabernacles

# Leviticus 23:9-14
# 🌾 The Sheaf Of Firstfruits
---
## 🌾 When Ye Be Come Into The Land
This law was given while Israel was still wandering in the wilderness, decades before they'd farm anything. It's written ahead of time for a life they hadn't started living yet - one more sign this covenant assumed the promised land as a settled fact.
🌾 Given before Israel had any farmland yet
⏳ Written in advance for a future they hadn't reached
🤝 Assumes the promised land as an already-settled fact
---
## 🥇 A Sheaf Of The Firstfruits Of Your Harvest
A "sheaf" is a bundle of freshly cut grain stalks, and "firstfruits" means the very first portion gathered, before the rest of the harvest. Bringing this bundle to the priest before eating any new crop publicly admitted the whole harvest belonged to God first.
🌾 A "sheaf" is a bundle of freshly cut grain stalks
🥇 "Firstfruits" means the very first part harvested
🙏 Publicly acknowledged the whole crop as God's first
---
## 🙌 He Shall Wave The Sheaf Before The LORD
"Wave" describes an actual physical motion - the priest lifted the grain bundle and moved it toward the altar and back, a gesture also used for other offerings like the peace offering in Leviticus 7:30. The motion symbolized presenting a gift and having it handed back accepted.
🙌 A literal back-and-forth waving motion
🔗 The same gesture is used for peace offerings in Leviticus 7:30
🔄 Symbolized giving to God and receiving it back as accepted
---
## 📆 On The Morrow After The Sabbath
"Morrow" means the next day. Bible interpreters have long debated exactly which Sabbath this refers to, but either way the timing anchored this offering to a specific, unmovable date rather than "whenever the harvest happens to be ready."
📆 "Morrow" means the next day
❓ Exactly which "sabbath" is meant has long been debated
📌 The real point was a fixed date, not a flexible one
---
## 🐑 An He Lamb Without Blemish Of The First Year
"He lamb" means a male lamb, and "of the first year" means under twelve months old - young, but not a newborn. Pairing this animal with the grain offering made the day a complete act of worship, not just a harvest custom.
🐑 "He lamb" means a male lamb
🕐 "Of the first year" means under twelve months old
🌾 Paired with the grain offering for a complete act of worship
---
## 🔥 For A Burnt Offering Unto The LORD
A burnt offering, explained fully back in Leviticus 1, was completely consumed on the altar with nothing kept back. Pairing this total-giving sacrifice with the first grain harvested made one clear statement: the whole crop, like the whole lamb, belonged to God.
🔥 A burnt offering was entirely consumed, no leftovers
📖 Explained fully back in Leviticus 1
🌾 Made the same total-giving point as the firstfruits grain
---
## 📏 Two Tenth Deals Of Fine Flour Mingled With Oil
A "tenth deal" was roughly two quarts, one-tenth of a larger dry measure called an ephah. Mixing the flour with oil made it a rich, ready-to-burn offering rather than plain grain.
📏 A "tenth deal" is about two quarts, a tenth of an ephah
🫒 Oil enriched the offering rather than leaving it plain
🔥 Prepared specifically to be burned on the altar
---
## 🍷 The Drink Offering... The Fourth Part Of An Hin
A "hin" was a liquid measure a bit over a gallon, so a fourth part came to roughly a quart of wine. Drink offerings were poured out at the altar, not drunk - a way of giving something valuable completely away rather than consuming it.
🍷 A "hin" is a liquid measure a bit over a gallon
📏 A fourth part is roughly a quart of wine
💧 Poured out completely, never consumed by anyone
---
## 🌽 Neither Bread, Nor Parched Corn, Nor Green Ears
This lists three forms of the new grain harvest - baked bread, roasted kernels, and fresh unripe heads still on the stalk. All three were off-limits until the firstfruits offering was made, no matter how hungry or ready the crop looked.
🌽 Covers three forms: bread, roasted grain, fresh heads
⏳ All off-limits until the firstfruits offering was made
🚫 No exception for hunger or how ready the harvest looked
---
## 📜 A Statute For Ever Throughout Your Generations
This phrase marks a permanent law, binding every future generation, not a temporary rule for the wilderness years alone. The same wording shows up again later in this chapter for several other feasts.
📜 Marks a permanent, generation-spanning law
🔁 Not limited to just the wilderness years
📖 The same phrase recurs for other feasts later in this chapter

# Leviticus 23:15-22
# 🎉 The Feast Of Weeks And Gleaning For The Poor
---
## 🔢 Ye Shall Count Unto You... Seven Sabbaths Shall Be Complete
Starting from the firstfruits offering just described, Israel had to count off seven full weeks - seven sabbaths, or 49 days. This deliberate counting period connected two harvest festivals into one continuous, tracked span of time.
🔢 Seven sabbaths means seven full weeks, 49 days
🔗 Counted starting from the firstfruits offering
📅 Linked two harvest festivals into one tracked span
---
## 📆 From The Day That Ye Brought The Sheaf Of The Wave Offering
This ties the starting point of the count directly to the firstfruits ceremony just described. The two festivals were never meant to be understood separately, but as one continuous arc from first grain to full harvest bread.
📆 Directly tied to the firstfruits ceremony just described
🔗 Not two separate holidays, but one continuous arc
🌾 Runs from the first grain all the way to full harvest bread
---
## 5️⃣0️⃣ Ye Shall Number Fifty Days
Forty-nine counted days plus one more lands on day fifty, which is exactly where this festival gets its other, more familiar name. "Pentecost" comes from the Greek word for "fiftieth," used in Acts 2:1 for this same festival.
5️⃣0️⃣ 49 counted days plus one more equals fifty
🔤 "Pentecost" is Greek for "fiftieth"
📖 The same festival appears again in Acts 2:1
---
## 🍞 Ye Shall Offer A New Meat Offering Unto The LORD
"Meat offering" in the King James Bible is old English for a grain offering, not meat in the modern sense - "meat" once simply meant food in general. This new grain offering marked the shift from the earlier barley firstfruits to this later wheat harvest.
🍞 "Meat offering" is old English for a grain offering
🔤 "Meat" once just meant food in general
🌾 Marks the shift from barley firstfruits to wheat harvest
---
## 🍞 Two Wave Loaves... Baken With Leaven
Unlike the unleavened bread required back at Passover, these festival loaves were deliberately baked WITH leaven. This is one of the only offerings in the whole law allowed to contain leaven, since it represented everyday bread rather than the rushed, unrisen bread of the Exodus.
🍞 Deliberately baked with leaven, unlike Passover bread
⚡ One of very few leavened offerings allowed in the law
🏠 Represented everyday bread, not the Exodus's rushed departure
---
## 🐑 Seven Lambs... One Young Bullock, And Two Rams
This full slate of animals - ten in total - made this one of the largest single-day offering requirements in the whole festival calendar, reflecting how significant this fiftieth-day celebration was in Israel's yearly rhythm.
🐑 Ten animals offered together in one single day
📊 One of the largest single-day requirements in the calendar
🎉 Reflects how major this festival was
---
## 🌬️ An Offering Made By Fire, Of Sweet Savour Unto The LORD
"Sweet savour" describes a pleasing smell rising from the altar, language used throughout Leviticus to describe an offering God accepts with pleasure rather than as a burden. It's human language describing God's response in terms people could understand.
🌬️ "Sweet savour" means a pleasing smell from the altar
😊 Describes God's pleasure, not a burden being carried
🔁 A phrase repeated constantly throughout Leviticus
---
## 🐐 One Kid Of The Goats For A Sin Offering
Even a joyful harvest festival still included a sin offering, explained fully in Leviticus 4. Celebration in Israel's worship never skipped over the need for atonement, even on a day defined by gratitude and abundance.
🐐 A sin offering appears even on a celebration day
📖 The sin offering itself is explained in Leviticus 4
🙏 Gratitude and atonement were never treated as separate
---
## 👤 They Shall Be Holy To The LORD For The Priest
After being waved before God, this bread and these lambs became the priest's own portion to eat - one of the ways priests were fed from the offerings they helped present, the same system explained back in chapter 22.
👤 Became the priest's food after being waved
🔗 The same support system explained back in chapter 22
🍞 One of many ways priests were fed from offerings
---
## 📢 Ye Shall Proclaim On The Selfsame Day
Unlike Unleavened Bread or Tabernacles, which each stretch across seven days, this Feast of Weeks was a single-day holy convocation - the shortest of the three required pilgrimage festivals (see Deuteronomy 16:16), yet still carrying the same no-work requirement as the week-long feasts.
📢 A single-day festival, unlike the week-long feasts
🚶 One of three required pilgrimage festivals in Deuteronomy 16:16
🙅 Still carried the same no-work requirement
---
## 🌾 Thou Shalt Not Make Clean Riddance Of The Corners Of Thy Field
Right in the middle of festival worship, this law suddenly shifts to everyday farming ethics: landowners had to deliberately leave the edges of their fields unharvested. This exact law is what lets Ruth glean grain and survive in the book of Ruth.
🌾 Landowners had to leave field edges unharvested
📖 This exact law lets Ruth glean and survive in Ruth 2
🔀 A sudden shift from festival law to farming ethics
---
## 🤝 Thou Shalt Leave Them Unto The Poor, And To The Stranger
"Stranger" here means a foreigner living among Israel, someone without inherited land of their own to farm. Placing this law right after a joyful harvest festival ties generosity toward the vulnerable directly to gratitude for God's provision.
🤝 "Stranger" means a foreigner living among Israel
🏡 Specifically someone without inherited land of their own
🎉 Links generosity directly to festival gratitude

# Leviticus 23:23-25
# 📯 The Feast Of Trumpets
---
## 7️⃣ In The Seventh Month, In The First Day Of The Month
The seventh month, later called Tishri, fell in early autumn. After several spring and summer harvest festivals, the fall brings a cluster of three major solemn observances packed close together: Trumpets, the Day of Atonement, and Tabernacles.
7️⃣ The seventh month, Tishri, falls in early autumn
🍂 Shifts from harvest festivals to solemn fall observances
📦 Three major festivals cluster together in this one month
---
## 🙏 Shall Ye Have A Sabbath
Calling this day "a sabbath" links it to the weekly rest pattern from the start of the chapter, even though it falls on a fixed yearly date rather than every seventh day. Several festivals in this chapter borrow this same "sabbath" language for their required rest.
🙏 Borrows "sabbath" language for a yearly festival
🔁 Echoes the weekly rest pattern from earlier in the chapter
📅 A fixed yearly date, not a recurring seven-day cycle
---
## 📯 A Memorial Of Blowing Of Trumpets
The "trumpet" here was a ram's horn, called a shofar, not a metal instrument. Its blast served as a memorial - a sound meant to make the whole community stop and remember God, not simply announce an event.
📯 The "trumpet" was a ram's horn, a shofar
🧠 "Memorial" means a sound meant to prompt remembering
🔔 A call to attention, not just an announcement
---
## 🙅 Ye Shall Do No Servile Work Therein
Compared to the other feasts, this chapter gives surprisingly few details about what happened on this day beyond the trumpet blast and the work ban. Numbers 29:1-6 fills in the specific offering list this verse only summarizes.
🙅 Very brief compared to other festivals in this chapter
📖 Numbers 29:1-6 fills in the specific offerings
📯 The trumpet blast remains this day's defining feature
---
## 🔥 Ye Shall Offer An Offering Made By Fire Unto The LORD
Even with few details given, this closing line ensures worship, not just rest, marked this day. Every festival in this chapter pairs a work-stoppage with some kind of offering - rest alone was never the whole point.
🔥 Worship, not just rest, defined this day
🔁 Every festival pairs rest with an offering
🎯 Rest alone was never the complete requirement

# Leviticus 23:26-32
# 🕊️ The Day Of Atonement
---
## 🕊️ The Tenth Day Of This Seventh Month... A Day Of Atonement
This is the same Day of Atonement given full ceremonial detail back in Leviticus 16 - the one day each year the high priest entered the Most Holy Place to make atonement for the whole nation's sin. This chapter doesn't repeat those details, it only fixes the date on the yearly calendar.
🕊️ The same day fully detailed back in Leviticus 16
👤 The one day the high priest entered the Most Holy Place
📅 This chapter only fixes the date, not the ceremony
---
## 🙋 It Shall Be An Holy Convocation Unto You
Even this single, most solemn day of the year still gets called a "holy convocation," the exact same term used for lighter, more celebratory festivals throughout this chapter. Solemnity and celebration both used the identical category of sacred assembly.
🙋 Uses the same "holy convocation" term as lighter feasts
⚖️ Solemn and celebratory days share this one category
📖 The term first appeared back in verse 2
---
## 😔 Ye Shall Afflict Your Souls
"Afflict your souls" is the Bible's standard phrase for fasting and deep humility, not physical self-harm. Jewish tradition has long understood this command as the basis for a full day of fasting on this date, still observed today as Yom Kippur.
😔 Means fasting and humility, not self-harm
🍽️ Understood as the basis for a full day of fasting
📅 Still observed today as Yom Kippur
---
## 🔥 Offer An Offering Made By Fire Unto The LORD
Even this most solemn, fasting-focused day of the year still included the same offering-by-fire requirement given for every other festival, tying atonement and worship together rather than treating fasting as enough on its own.
🔥 Even a fasting day still included an offering
🔗 Ties atonement directly to ongoing worship
⚖️ Fasting alone wasn't treated as sufficient
---
## 🚫 Ye Shall Do No Work In That Same Day
Notice this verse drops the narrower "servile work" language used for other festivals and simply says "no work" - the strictest work-ban in this entire chapter outside the weekly Sabbath itself.
🚫 Drops to a stricter "no work" than other festivals
📊 Matches only the weekly Sabbath in strictness
⚖️ The most serious work-ban in this whole chapter
---
## 💀 He Shall Be Cut Off From Among His People
Refusing to fast and humble oneself on this specific day carried the same severe "cut off" penalty used elsewhere in Leviticus for serious violations of holy things, including chapter 22. Skipping this day was never treated as a small oversight.
💀 Carries the same severe penalty as other serious violations
🔗 The same "cut off" language is used in chapter 22
⚠️ Never treated as a minor oversight
---
## ⚡ The Same Soul Will I Destroy From Among His People
This verse pairs with the one before it, giving matching penalties for two different failures on this one day: not fasting, and doing regular work. Together they show how seriously this single day was guarded compared to the rest of the calendar.
⚡ Matches the previous verse's penalty for a second failure
📊 Two specific failures, two matching penalties
🛡️ Shows how carefully this one day was guarded
---
## 📜 Ye Shall Do No Manner Of Work
"No manner of work" restates the ban in its strongest, most all-encompassing form yet, closing off any argument about which specific tasks might still count as acceptable.
📜 The strongest, most all-encompassing wording yet
🚫 Closes off any argument about exceptions
🔁 A deliberate restatement for emphasis
---
## 📜 A Statute For Ever Throughout Your Generations In All Your Dwellings
The same permanent, everywhere-applicable language used for Unleavened Bread back in verse 14 returns here, tying this most serious day into the same unbroken, generation-spanning system as the lighter festivals.
📜 Repeats the same permanent-law phrase from verse 14
🔗 Ties this solemn day to the same ongoing system
🌍 Applies everywhere Israel would ever live
---
## 🌙 From Even Unto Even Shall Ye Celebrate Your Sabbath
This gives the exact time boundary for the fast: starting the evening before, at twilight on the ninth day, and running until the following evening - roughly 24 hours, matching how a Hebrew day was generally counted from evening to evening.
🌙 Runs a full evening-to-evening cycle, about 24 hours
📅 Starts the evening before the actual tenth day
🕐 Matches how a Hebrew day was generally counted
---
## 😴 A Sabbath Of Rest
This day gets called a "sabbath of rest" using an intensified Hebrew phrase also used for the weekly Sabbath itself - the strongest possible rest language in the whole chapter, reserved for only the most solemn days.
😴 Uses the strongest rest phrase in the whole chapter
🔗 The same intensified phrase used for the weekly Sabbath
🏆 Reserved only for the most solemn days on the calendar

# Leviticus 23:33-38
# 🌿 Tabernacles Announced And The Feasts Summarized
---
## 🌿 The Feast Of Tabernacles For Seven Days
"Tabernacles" translates a Hebrew word meaning temporary shelters or booths - the festival's whole point, explained later in this chapter, was living outdoors in makeshift huts to remember Israel's wilderness years.
🌿 "Tabernacles" means temporary shelters or booths
🏕️ Centered on living outdoors in makeshift huts
🏜️ Meant to recall Israel's years wandering the wilderness
---
## 🥇 On The First Day Shall Be An Holy Convocation
Like Unleavened Bread earlier in the chapter, this seven-day festival opens with a required holy assembly and a work ban - the same bookend pattern used for that spring festival now repeats for this fall one.
🥇 Opens with a required holy assembly
🔁 The same bookend pattern as Unleavened Bread
🍂 A fall counterpart to that spring festival's shape
---
## 🔥 Seven Days Ye Shall Offer An Offering Made By Fire Unto The LORD
Like Unleavened Bread, every one of these seven main festival days included its own fire offering - continuous worship throughout the week, not a single sacrifice covering the whole festival at once.
🔥 Every one of the seven days had its own offering
🔁 Matches the same pattern used for Unleavened Bread
📆 Continuous worship, not a single one-time sacrifice
---
## 8️⃣ On The Eighth Day Shall Be An Holy Convocation
Tabernacles technically runs eight days total - seven days of the festival itself, plus one extra closing day tacked on right after. This extra eighth day is treated almost as its own separate mini-holiday, later called Shemini Atzeret in Jewish tradition.
8️⃣ An extra eighth day follows the main seven
🎉 Treated almost as its own separate holiday
📖 Later called Shemini Atzeret in Jewish tradition
---
## 🤝 It Is A Solemn Assembly
"Solemn assembly" suggests a closing gathering, a deliberate pause to mark the end of the festival season rather than starting something new. It's less about celebration and more about a final, quiet close.
🤝 "Solemn assembly" means a closing gathering
🔚 Marks the deliberate end of the festival season
🤫 A quieter close rather than a new celebration
---
## 📋 These Are The Feasts Of The LORD
This verse signals a summary, wrapping up the full list before one more detail about Tabernacles follows. It functions like a closing recap in the middle of the chapter, echoing the same recap language back in verse 4.
📋 Signals a summary, wrapping up the full list
🔁 Echoes the opening recap language from verse 4
📚 One final Tabernacles detail still follows after this
---
## 📅 Every Thing Upon His Day
This phrase emphasizes that each offering had its own specific, assigned day - nothing was interchangeable or could be shifted to a more convenient date. The whole calendar ran on fixed, non-negotiable timing.
📅 Each offering was tied to one specific day
🚫 Nothing was interchangeable or flexible
🗓️ The whole calendar ran on fixed timing
---
## 🎁 A Burnt Offering, And A Meat Offering, A Sacrifice, And Drink Offerings
This lists the four basic offering types used across every festival in this chapter - burnt, grain, general sacrifice, and drink - each explained fully back in Leviticus 1-7, the building blocks of every festival's worship.
🎁 Lists the four basic offering types used throughout
📖 Each type is explained fully back in Leviticus 1-7
🧱 The building blocks of every festival's worship
---
## ➕ Beside The Sabbaths Of The LORD... Beside All Your Freewill Offerings
This closing note makes clear the festival calendar didn't replace or cancel any other ongoing worship obligation - the weekly Sabbath, personal gifts, vows, and freewill offerings from earlier chapters all continued right alongside this yearly schedule.
➕ These festivals didn't cancel other obligations
🔗 Weekly Sabbaths, vows, and freewill gifts continued too
📅 The yearly calendar stacked on top of ongoing worship

# Leviticus 23:39-44
# 🏕️ Living In Booths
---
## 🍇 When Ye Have Gathered In The Fruit Of The Land
This verse ties Tabernacles to the fall fruit and grape harvest, the last major harvest of Israel's agricultural year. Coming right after the grain harvests earlier in the chapter, this festival closes out the entire farming calendar with a week of celebration.
🍇 Tied to the fall fruit and grape harvest
📅 The last major harvest of Israel's year
🎉 Closes the entire farming calendar with celebration
---
## 🌳 The Boughs Of Goodly Trees, Branches Of Palm Trees
This verse names four specific plants: fruit-bearing trees, palm branches, leafy thick-branched trees, and willows growing by streams. Jewish tradition later combined these into a bundle called the lulav, still waved during Sukkot celebrations today.
🌳 Names four specific plants tied to local geography
🎋 Later combined into a bundle called the lulav
📅 Still used in Sukkot celebrations today
---
## 🎉 Ye Shall Rejoice Before The LORD Your God Seven Days
Unlike the Day of Atonement's fasting and affliction just described, Tabernacles is explicitly commanded to be joyful - a full week of celebration, making it one of the most festive dates on Israel's entire calendar.
🎉 Explicitly commanded to be joyful, not solemn
🔀 A sharp contrast with the fasting of Atonement
🏆 One of the most festive weeks on the whole calendar
---
## 📆 Seven Days In The Year... In The Seventh Month
This confirms Tabernacles as a once-a-year, week-long festival fixed to this specific month. By this point in the chapter, the seventh month alone has held three major observances: Trumpets, Atonement, and now Tabernacles.
📆 A once-a-year, fixed-month festival
📦 The seventh month alone holds three major feasts
🗓️ Confirms this fixed date, permanently
---
## 🏕️ Ye Shall Dwell In Booths Seven Days
"Booths" were temporary, open-topped shelters built from branches, not sturdy houses. The whole nation was meant to physically live outside their normal homes for this one week every year.
🏕️ Booths were temporary, branch-built shelters
🏠 Not sturdy houses, deliberately impermanent
🇮🇱 The whole nation lived this way for one week yearly
---
## 🇮🇱 All That Are Israelites Born Shall Dwell In Booths
"Israelites born" specifies this applied to the native community broadly - a nationwide shared experience meant to be remembered together, not an obligation resting on just a few families or the priesthood alone.
🇮🇱 Applied broadly to the native community
🤝 A shared national experience, not a priestly-only duty
📅 Everyone remembered the wilderness the same way, together
---
## 🏜️ That Your Generations May Know
This states the festival's purpose plainly: teaching. Future generations who never experienced the wilderness firsthand would still physically feel a small piece of it every year, keeping the memory alive through action instead of just a story told once.
🏜️ States the festival's purpose plainly: teaching
👶 Aimed especially at generations who never lived it
🔁 Memory kept alive through yearly action, not just story
---
## 🇪🇬 When I Brought Them Out Of The Land Of Egypt
Like the closing lines of chapter 22, this ties the whole festival back to the Exodus rescue as the foundation for everything else - Israel's yearly calendar, start to finish, keeps circling back to this one defining act of God.
🇪🇬 Ties the festival back to the Exodus rescue
🔗 Echoes the same closing pattern from chapter 22
🔄 The whole calendar circles back to this one event
---
## 📢 Moses Declared Unto The Children Of Israel The Feasts Of The LORD
The chapter ends simply, confirming Moses actually delivered every one of these instructions to the people. Nothing was left unspoken between Moses and God alone - the whole calendar is now public knowledge for the whole nation to keep.
📢 Confirms Moses actually delivered these instructions
🤝 Nothing stayed private between Moses and God
📖 The whole yearly calendar is now public for all Israel
`;

export const LEVITICUS_TWENTY_THREE_PERSONAL_SECTIONS = parseLeviticusTwentyThreeRawNotes(
  LEVITICUS_TWENTY_THREE_RAW_NOTES,
);
