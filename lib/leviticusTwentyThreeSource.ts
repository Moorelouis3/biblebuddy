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
# 🗓️ God's Calendar Of Appointed Feasts
---
## 🗣️ And The LORD Spake Unto Moses

God speaks these words directly to Moses.

This exact sentence opens a new block five separate times in this chapter.

Each time it marks the start of fresh instructions.

The whole festival calendar comes straight from God, not from Moses.

🗣️ Marks the start of new instructions

🔁 Repeats five times through this chapter

📜 Moses did not invent this calendar

📖 God's own voice sets each feast

---
## 📅 Concerning The Feasts Of The LORD

"Feasts" means far more than a party thrown whenever people feel like it.

The Hebrew word behind it means an appointed time.

Israel did not choose when these days landed.

God set the exact date on His own calendar.

📅 Feasts means an appointed set time

🗓️ God set the date, not Israel

🤝 The same word describes meeting God

📖 A fixed calendar, not a choice

---
## 🙋 Holy Convocations

A convocation is a required gathering, not an optional one.

"Holy" means the day itself is set apart from ordinary time.

Everyone in the community was expected to stop and come together.

This exact phrase returns again and again through the whole chapter.

🙋 Convocation means a required gathering

✨ Holy means set apart from normal days

👥 The whole community had to attend

📖 This phrase repeats through the chapter

---
## 📋 Even These Are My Feasts

God calls this calendar "my feasts," not Israel's own idea.

He is claiming direct ownership over how the year gets organized.

Seven appointed times are about to be listed one at a time.

The rest of this chapter simply unpacks this one claim in detail.

📋 My feasts means God owns the calendar

🗓️ Seven appointed times are coming next

🗺️ This line works like a roadmap

📖 The chapter unpacks this one claim

---
## 🛠️ Six Days Shall Work Be Done

Before naming a single yearly festival, the chapter states the weekly pattern first.

Six days belong to ordinary work and daily life.

Every festival that follows either interrupts or echoes this base rhythm.

The familiar weekly rhythm comes before any new yearly one.

🛠️ Six days were for ordinary work

🔁 Every festival breaks from this rhythm

📆 The weekly pattern comes before the yearly

📖 Familiar rhythm anchors the new festivals

---
## 😴 The Sabbath Of Rest, An Holy Convocation

This does not describe a single special holiday.

The weekly Sabbath itself gets counted among God's "feasts."

It happens every single week, not once a year like the others.

It is the most frequent appointment on the whole calendar.

😴 Sabbath counted as a feast too

🔁 It happens every single week

🥇 Most frequent appointment on the calendar

📖 Traces back to Genesis 2

---
## 🏠 In All Your Dwellings

This phrase marks something different about the weekly Sabbath.

Later festivals in this chapter required travel to the tabernacle.

The Sabbath needed no such trip to a shrine.

Rest was built into daily life no matter where someone lived.

🏠 Kept at home, no travel required

📍 Different from the coming yearly feasts

🔁 Built into daily life everywhere

📖 Rest did not depend on location

# Leviticus 23:5-8
# 🐑 Passover And The Bread Without Yeast
---
## 🗓️ The Fourteenth Day Of The First Month

The first month was called Abib, later renamed Nisan.

It falls in springtime, close to our March and April.

Israel's whole religious year begins here, not in the fall.

This reset ties the calendar to the month God rescued them from Egypt.

🗓️ First month is Abib, later Nisan

🌱 Falls in springtime, March to April

🔄 The year restarts at the Exodus

📖 Every calendar points back to rescue

---
## 🌆 At Even Is The LORD's Passover

"Even" means evening, the twilight between sunset and full dark.

That exact window was already fixed for the first Passover in Egypt.

This yearly feast ties straight back to that one specific night.

God spared Israel's firstborn at exactly this hour long ago.

🌆 Even means evening twilight

🔗 Matches the timing set in Egypt

🇪🇬 Recalls the night of the Exodus

📖 One hour, remembered every year

---
## 🍞 The Feast Of Unleavened Bread

Passover and Unleavened Bread sound like one holiday but are not.

They are two separate feasts that sit back to back on the calendar.

Unleavened Bread begins the very next day and runs a full week.

Most people remember them together as one long Exodus memorial.

🍞 Two separate feasts, not one

📅 Runs a full seven days

🔗 Often remembered as one memorial

📖 Passover starts it, this continues it

---
## 🚫 Seven Days Ye Must Eat Unleavened Bread

"Unleavened" means made without yeast, so the bread never rises.

Israel left Egypt in such a hurry there was no time to wait.

Flat bread became a lasting symbol of that sudden departure.

Eating it every year puts the reader back in that rushed night.

🚫 Unleavened means made without yeast

🏃 Recalls Israel's rushed escape from Egypt

🔁 Eaten every year to remember that night

📖 Explained fully back in Exodus 12

---
## 🙅 No Servile Work Therein

"Servile work" means a person's regular job or business.

That is a narrower ban than the total work stop on the weekly Sabbath.

Some ordinary tasks, like preparing food, were still allowed this day.

The size of the ban actually shows how solemn a day was meant to be.

🙅 Servile work means a regular job

⚖️ Narrower than the weekly Sabbath ban

🍳 Food preparation was still allowed

📖 Ban size signals how solemn a day is

---
## 🔥 An Offering Made By Fire Unto The LORD Seven Days

This week was never just a week off from work.

Every single one of the seven days included an offering at the altar.

Two required assemblies bookended the whole festival, one on the first day and one on the last.

Rest and worship moved together the entire week.

🔥 An offering happened every single day

📚 Worship, not just rest, filled the week

🔖 Bookended by two holy convocations

📖 Rest and worship never separated

# Leviticus 23:9-14
# 🌾 The First Sheaf Of The Harvest
---
## 🌾 When Ye Be Come Into The Land

Israel was still wandering the wilderness when this law was given.

Nobody in the camp had farmed anything yet.

God is writing rules for a life they had not started living.

The covenant already treats the promised land as a settled fact.

🌾 Given before Israel farmed anything

⏳ Written for a future not yet reached

🤝 Treats the land as already settled

📖 God plans further ahead than His people

---
## 🥇 A Sheaf Of The Firstfruits Of Your Harvest

A "sheaf" is a bundle of freshly cut grain stalks.

"Firstfruits" means the very first portion gathered, before anything else.

Bringing this bundle to the priest happened before eating any new grain.

The gesture publicly admitted the whole harvest belonged to God first.

🌾 Sheaf means a bundle of cut grain

🥇 Firstfruits means the very first part

🙏 Given before eating any new grain

📖 Admits the whole crop is God's

---
## 🙌 He Shall Wave The Sheaf Before The LORD

"Wave" is not a figure of speech here.

The priest physically lifted the bundle and moved it toward the altar and back.

The same motion shows up for other offerings, like the peace offering.

The gesture pictured a gift being handed over and handed back accepted.

🙌 Wave means an actual physical motion

🔗 Same gesture used for peace offerings

🔄 Pictures a gift given and accepted

📖 A visible sign, not just words

---
## 📆 On The Morrow After The Sabbath

"Morrow" simply means the next day.

Exactly which Sabbath this points to has been debated for centuries.

What stays clear either way is that the date could not shift.

This offering was tied to one fixed day, not a flexible one.

📆 Morrow means the next day

❓ Which sabbath is genuinely debated

📌 The real point is a fixed date

📖 Not flexible, no matter the harvest

---
## 🐑 An He Lamb Without Blemish Of The First Year

"He lamb" means a male lamb, not a female one.

"Of the first year" means under twelve months old.

That is young, but not a newborn animal either.

Pairing this lamb with grain made the day a full act of worship.

🐑 He lamb means a male lamb

🕐 First year means under twelve months

🌾 Paired with grain for full worship

📖 Grain and animal offered together

---
## 📏 Two Tenth Deals Of Fine Flour Mingled With Oil

A "tenth deal" measured close to two quarts of flour.

That was one tenth of a larger unit called an ephah.

Mixing in oil turned plain flour into a rich, burnable offering.

A modern reader can picture two quart sized bags of flour.

📏 Tenth deal is about two quarts

🫒 Oil enriched the plain flour

🔥 Prepared specifically to be burned

📖 A small amount made rich, not plain

---
## 🍷 The Fourth Part Of An Hin

A "hin" measured a bit more than a gallon of liquid.

A fourth part of that came to close to a quart of wine.

This wine was poured out at the altar, never drunk by anyone.

Giving something away completely made the point stronger than keeping some back.

🍷 A hin is just over a gallon

📏 A fourth part is about a quart

💧 Poured out, never drunk by anyone

📖 Giving it all away was the point

---
## 🌽 Neither Bread, Nor Parched Corn, Nor Green Ears

This names three forms of the new grain harvest.

Baked bread, roasted kernels, and fresh unripe heads still on the stalk.

All three stayed off limits until the firstfruits offering was made.

Hunger was never treated as a reason to skip ahead of God.

🌽 Names three forms of new grain

⏳ All off limits before the offering

🚫 Hunger did not earn an exception

📖 God's portion came before the appetite

---
## 📜 A Statute For Ever Throughout Your Generations

This phrase marks a permanent law, not a temporary rule.

It binds every future generation, not only the wilderness years.

The exact same wording returns again later in this chapter.

God is not planning a short season of obedience here.

📜 Marks a permanent, lasting law

🔁 Not limited to the wilderness years

📖 The same phrase repeats later

➡️ Built for every future generation

# Leviticus 23:15-22
# 🎉 Fifty Days To The Feast Of Weeks
---
## 🔢 Seven Sabbaths Shall Be Complete

Seven sabbaths here means seven full weeks, forty nine days total.

The count started right from the firstfruits offering already described.

This deliberate counting linked two separate harvest festivals into one span.

Nothing about this festival happened on a random or convenient date.

🔢 Seven sabbaths means forty nine days

🔗 Counted from the firstfruits offering

📅 Links two festivals into one span

📖 Every date here was deliberate

---
## 5️⃣0️⃣ Ye Shall Number Fifty Days

Forty nine counted days plus one more lands on day fifty.

That number gives this festival its other, more familiar name.

"Pentecost" comes from the Greek word for fiftieth.

The book of Acts uses that same name for this same festival.

🧮 Forty nine days plus one equals fifty

🔤 Pentecost is Greek for fiftieth

📖 Acts 2 names this same festival

➡️ One number, two different names

---
## 🍞 Baken With Leaven

A reader might expect every festival bread to match Passover's unleavened loaves.

These loaves were deliberately baked with leaven instead.

This is one of the only leavened offerings allowed anywhere in the law.

It pictured ordinary daily bread rather than the rushed bread of the Exodus.

🍞 Baked with leaven, unlike Passover

⚡ Rare exception among offerings in the law

🏠 Pictures ordinary, everyday bread

📖 A different memory than the Exodus

---
## 🍞 Ye Shall Offer A New Meat Offering Unto The LORD

In the King James Bible, "meat" once simply meant food in general.

"Meat offering" actually names a grain offering, not animal meat.

This new grain offering marked a shift from barley to wheat.

The earlier firstfruits used barley, the first grain ready in spring.

🍞 Meat offering means a grain offering

🔤 Meat once just meant food

🌾 Marks a shift from barley to wheat

📖 Different grain, same pattern of giving

---
## 🐑 Seven Lambs Without Blemish Of The First Year

Ten animals were required together on this one single day.

That made it one of the largest single day offerings in the whole calendar.

The sheer size of the requirement said something about the day itself.

Fifty days of counting built toward a genuinely major celebration.

🐑 Ten animals offered in one day

📊 One of the largest single day totals

🎉 Size reflected how major the day was

📖 Fifty days built to this moment

---
## 🐐 One Kid Of The Goats For A Sin Offering

Even a joyful harvest festival still required a sin offering.

Celebration in Israel's worship never skipped the need for atonement.

Gratitude and guilt were never treated as separate subjects.

A full harvest table still sat next to an honest reckoning with sin.

🐐 A sin offering appears on a feast day

📖 Explained fully back in Leviticus 4

🙏 Gratitude and atonement were never separate

➡️ Celebration did not excuse the need for atonement

---
## 👤 They Shall Be Holy To The LORD For The Priest

After being waved before God, this bread and these lambs changed hands.

They became the priest's own food, not leftovers thrown away.

This was one of the regular ways priests were fed from Israel's offerings.

The same support system was already explained back in chapter 22.

👤 Became the priest's own food

🔗 Same system explained in chapter 22

🍞 One of many ways priests were fed

📖 Nothing offered to God went to waste

---
## 📢 Ye Shall Proclaim On The Selfsame Day

Unleavened Bread and Tabernacles each stretch across a full week.

This Feast of Weeks lasted only one single day.

It was the shortest of Israel's three required pilgrimage festivals.

Even one day still carried the same strict no work rule.

📢 A single day, not a week long feast

🚶 Shortest of the three pilgrimage festivals

🙅 Still carried a strict no work rule

📖 Short in length, not in weight

---
## 🌾 Thou Shalt Not Make Clean Riddance Of The Corners Of Thy Field

This law suddenly shifts from festival worship to everyday farming ethics.

Landowners had to deliberately leave the edges of their fields unharvested.

This exact command is what lets Ruth glean grain later in scripture.

God's calendar of feasts and God's concern for the poor sit side by side.

🌾 Field edges had to stay unharvested

📖 This law lets Ruth glean in Ruth 2

🔀 A sudden shift to farming ethics

➡️ Worship and care for the poor connect

---
## 🤝 Thou Shalt Leave Them Unto The Poor, And To The Stranger

"Stranger" here means a foreigner living among Israel.

That person had no inherited land of their own to farm.

This law was placed right after a joyful harvest festival on purpose.

Gratitude for a full harvest was meant to overflow into generosity.

🤝 Stranger means a foreigner living nearby

🏡 Someone without inherited land of their own

🎉 Placed right after a harvest festival

📖 Gratitude was meant to overflow into giving

# Leviticus 23:23-25
# 📯 A Trumpet Blast In The Seventh Month
---
## 7️⃣ In The Seventh Month, In The First Day Of The Month

The seventh month was later called Tishri.

It fell in early autumn, after the spring and summer harvests.

Three major solemn observances cluster together inside this one month.

Trumpets, the Day of Atonement, and Tabernacles all land here.

📆 Seventh month, Tishri, falls in autumn

🍂 Shift from harvest feasts to solemn ones

📦 Three major festivals cluster together

📖 One month, three major appointments

---
## 📯 A Memorial Of Blowing Of Trumpets

The "trumpet" here was a ram's horn, called a shofar.

It was not a metal instrument like a modern trumpet.

"Memorial" means the sound was meant to prompt remembering.

The blast called the whole community to stop and think of God.

📯 Trumpet means a ram's horn shofar

🧠 Memorial means a sound meant to remind

🔔 A call to attention, not an announcement

📖 Sound turned the mind back to God

---
## 🙅 Ye Shall Do No Servile Work Therein

This chapter gives surprisingly few details about this particular day.

A reader might assume that means the day mattered less.

Numbers chapter 29 fills in the specific offering list this verse only summarizes.

The brevity here reflects a shorter description, not a smaller day.

🙅 Very brief compared to other festivals

📖 Numbers 29 fills in the offerings

📯 The trumpet blast defines this day

➡️ Short description does not mean small day

# Leviticus 23:26-32
# 🕊️ The Day Of Atonement
---
## 🕊️ There Shall Be A Day Of Atonement

This is the same Day of Atonement given full detail back in Leviticus 16.

That earlier chapter described the high priest entering the Most Holy Place.

This chapter does not repeat those details.

It only fixes the date on the yearly calendar.

🕊️ Same day detailed back in Leviticus 16

👤 High priest entered the Most Holy Place

📅 This chapter just fixes the date

📖 One ceremony, described in two places

---
## 🙋 It Shall Be An Holy Convocation Unto You

This is the most solemn day of Israel's entire year.

It still gets called by the exact same term as lighter festivals.

Solemn fasting and joyful celebration share one identical category here.

The word did not distinguish between heavy days and happy ones.

🙋 Same term used for lighter feasts

⚖️ Solemn and celebratory share one category

📖 First used back in verse 2

➡️ One word covers very different moods

---
## 😔 Ye Shall Afflict Your Souls

This phrase is the Bible's standard way of describing fasting and humility.

It does not mean any form of physical self harm.

Jewish tradition has long understood this as a command to fast.

This day is still observed today and is called Yom Kippur.

😔 Means fasting and humility, not harm

🍽️ Understood as a command to fast

📅 Still observed today as Yom Kippur

📖 An old command still kept now

---
## 🔥 Offer An Offering Made By Fire Unto The LORD

Even on a day defined by fasting, an offering was still required.

Atonement and worship were never treated as two separate acts.

Skipping the meal never counted as enough on its own.

Both fasting and offering had to happen together on this one day.

🔥 An offering was still required

🔗 Ties atonement directly to worship

⚖️ Fasting alone was not enough

📖 Both acts happened together

---
## 🚫 Ye Shall Do No Work In That Same Day

Other festivals in this chapter ban only "servile work," a narrower category.

This verse drops that narrower wording entirely.

It simply says no work of any kind.

That makes this the strictest ban in the whole chapter outside the Sabbath.

🚫 Drops to a stricter no work rule

📊 Matches only the weekly Sabbath

⚖️ The most serious ban in the chapter

📖 Wording itself signals the weight of the day

---
## 💀 He Shall Be Cut Off From Among His People

"Cut off" was a severe penalty used elsewhere in Leviticus for serious violations.

It marked someone as removed from the covenant community.

The same phrase appears for other serious violations back in chapter 22.

Skipping this one day was never treated as a small oversight.

💀 Cut off means removed from the community

🔗 Same phrase used in chapter 22

⚠️ Never treated as a minor mistake

📖 One missed day carried real weight

---
## ⚡ The Same Soul Will I Destroy From Among His People

This verse pairs directly with the one just before it.

Two different failures on this one day get two matching penalties.

Refusing to fast is one failure, doing regular work is the other.

Together they show exactly how carefully this single day was guarded.

⚡ Matches the previous verse's penalty

📊 Two failures, two matching penalties

🛡️ Shows how carefully this day was guarded

📖 Neither failure was treated as small

---
## 🌙 From Even Unto Even Shall Ye Celebrate Your Sabbath

This gives the exact time boundary for the fast.

It began the evening before, at twilight on the ninth day.

It ran until the following evening, close to twenty four hours later.

A Hebrew day was generally counted this same way, evening to evening.

🌙 Runs about twenty four hours total

📅 Starts the evening before the tenth day

🕐 Matches how a Hebrew day was counted

📖 A precise window, not a guess

---
## 😴 A Sabbath Of Rest

This might read like just another routine rest day.

The Hebrew phrase behind it is intensified, the strongest rest language in the chapter.

The exact same intensified phrase describes the weekly Sabbath itself.

Only the most solemn days on the calendar receive this wording.

😴 Uses the strongest rest phrase in the chapter

🔗 Same intensified phrase as the weekly Sabbath

🏆 Reserved for only the most solemn days

📖 Stronger words for the heaviest day

# Leviticus 23:33-38
# 🌿 Tabernacles Announced
---
## 🌿 The Feast Of Tabernacles For Seven Days

"Tabernacles" translates a word meaning temporary shelters or booths.

The whole point of this festival was living outdoors in makeshift huts.

That physical experience was meant to recall Israel's years in the wilderness.

A full week outside kept an old memory genuinely alive.

🌿 Tabernacles means temporary shelters or booths

🏕️ Centered on living outdoors for a week

🏜️ Recalled Israel's years in the wilderness

📖 A memory kept alive by action

---
## 8️⃣ On The Eighth Day Shall Be An Holy Convocation

Tabernacles might look like a clean seven day festival.

It actually runs eight days total once this extra day is counted.

Seven days belong to the main festival, then one closing day follows.

Jewish tradition later gave this extra day its own name, Shemini Atzeret.

🎊 An extra eighth day follows the seven

🎉 Treated almost as its own holiday

📖 Later called Shemini Atzeret

➡️ One festival, two distinct endings

---
## 🤝 It Is A Solemn Assembly

A "solemn assembly" describes a closing gathering, not a new celebration.

It marked a deliberate pause at the very end of the festival season.

This eighth day was quieter than the joyful week before it.

The whole festival calendar closed on a note of stillness, not a party.

🤝 Solemn assembly means a closing gathering

🔚 Marks the end of the festival season

🤫 Quieter than the week before it

📖 The calendar closes on stillness

---
## 📋 These Are The Feasts Of The LORD

This line signals a summary, wrapping up the whole list.

One more detail about Tabernacles still follows right after it.

The same recap language already appeared back in verse four.

The chapter is folding back on itself before finishing one last thought.

📋 Signals a summary of the whole list

🔁 Echoes the same wording from verse 4

📚 One more Tabernacles detail still follows

📖 The chapter recaps before it finishes

---
## 🎁 A Burnt Offering, And A Meat Offering, A Sacrifice, And Drink Offerings

This verse lists the four basic offering types used across every festival in this chapter.

Burnt offerings, grain offerings, general sacrifices, and drink offerings.

Each one was already explained in detail back in Leviticus chapters one through seven.

These four together formed the building blocks of every single festival.

🎁 Lists the four basic offering types

📖 Explained fully back in Leviticus 1 to 7

🧱 The building blocks of every festival

➡️ Four types, repeated all year long

---
## ➕ Beside All Your Freewill Offerings

This calendar might look like it replaces every other form of worship.

It actually does not cancel a single ongoing obligation.

The weekly Sabbath, personal vows, and freewill gifts all continued right alongside it.

The yearly schedule stacked on top of daily and weekly worship, not instead of it.

➕ Does not cancel other obligations

🔗 Weekly Sabbaths and vows still continued

📅 The yearly calendar stacked on top

📖 Nothing here replaced ongoing worship

# Leviticus 23:39-44
# 🏕️ Seven Days Living In Booths
---
## 🍇 When Ye Have Gathered In The Fruit Of The Land

This ties Tabernacles to the fall fruit and grape harvest.

That was the last major harvest of Israel's entire farming year.

Grain harvests were already celebrated earlier in this same chapter.

This festival closes out the whole farming calendar with a week of joy.

🍇 Tied to the fall fruit harvest

📅 The last major harvest of the year

🎉 Closes the farming calendar with joy

📖 Every harvest eventually gets its own feast

---
## 🌳 The Boughs Of Goodly Trees, Branches Of Palm Trees

This verse names four specific plants tied to the local land.

Fruit bearing trees, palm branches, leafy branched trees, and willows by streams.

Jewish tradition later bundled these into a set called the lulav.

That same bundle is still waved during Sukkot celebrations today.

🌳 Names four specific local plants

🎋 Later bundled into the lulav

📅 Still used in Sukkot today

📖 An old command still shapes worship now

---
## 🎉 Ye Shall Rejoice Before The LORD Your God Seven Days

The Day of Atonement, just described, commanded fasting and humility.

Tabernacles commands the exact opposite response.

This festival is explicitly meant to be a joyful celebration.

It stands as one of the most festive weeks on Israel's whole calendar.

🎉 Explicitly commanded to be joyful

🔀 A sharp contrast with Atonement's fasting

🏆 One of the most festive weeks

📖 Solemn days and joyful days both belong

---
## 🏕️ Ye Shall Dwell In Booths Seven Days

"Booths" were temporary shelters built from branches.

They were never meant to be sturdy or permanent houses.

The whole nation left their normal homes for one full week.

Doing this physically, every year, kept the memory from fading into just a story.

🏕️ Booths means temporary branch shelters

🏠 Deliberately impermanent, not sturdy

🇮🇱 The whole nation moved outside together

📖 A memory kept alive through action

---
## 🏜️ That Your Generations May Know

This law names its own purpose directly.

The goal was teaching, not tradition for its own sake.

Future generations who never lived through the wilderness would still feel a piece of it.

One week each year, the whole nation relived a story instead of just hearing it.

🏜️ States the purpose plainly, teaching

👶 Aimed at generations who never lived it

🔁 Memory kept alive through yearly action

📖 A story felt, not only told

---
## 🇪🇬 When I Brought Them Out Of The Land Of Egypt

The chapter's very last festival still circles back to the Exodus.

Passover opened the chapter with this same rescue in view.

Booths closes the chapter by naming that rescue again.

Israel's whole yearly calendar keeps returning to this one defining act of God.

🇪🇬 Ties the final festival to the Exodus

🔄 The calendar circles back to one event

🔗 Matches how the chapter opened

📖 Every feast points back to rescue

---
## 📢 Moses Declared Unto The Children Of Israel The Feasts Of The LORD

The chapter ends by confirming Moses actually delivered these words.

Nothing here stayed private between Moses and God alone.

The whole festival calendar became public knowledge for the entire nation.

An appointed calendar not shared with the people would have accomplished nothing.

📢 Confirms Moses delivered the instructions

🤝 Nothing stayed private with God alone

📖 The calendar became public knowledge

➡️ A hidden calendar would help no one
`.trim();

export const LEVITICUS_TWENTY_THREE_PERSONAL_SECTIONS = parseLeviticusTwentyThreeRawNotes(
  LEVITICUS_TWENTY_THREE_RAW_NOTES,
);
