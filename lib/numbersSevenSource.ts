export type NumbersSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSevenRawNotes(rawText: string): NumbersSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 7:${startVerse}` : `Numbers 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Numbers 7 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SEVEN_RAW_NOTES = `# Numbers 7:1-3
# 🎁 The Princes Bring Wagons And Oxen
---
## ✨ Anointed It And Sanctified It

"Anointed" means oil was poured on as a formal act of dedication.

"Sanctified" means declared holy, set apart only for God's use.

This chapter actually rewinds the calendar.

Exodus 40:17 already dated the tabernacle's finishing to the first day of year two.

Numbers 1:1 dated the census just finished to a full month later.

So this whole chapter looks backward, filling in what happened right after Exodus 40.

✨ Anointed means oil poured on in dedication

🔑 Sanctified means declared holy for God

⏮️ This chapter looks backward in time

📖 It fills in what happened after Exodus 40

---
## 👑 The Princes Of Israel Heads Of The House Of Their Fathers

These are the same twelve tribal leaders already named in Numbers 1.

They are the men who helped Moses take the census.

The text is about to name every one of them again, one at a time.

Naming each leader by name shows every tribe mattered on its own.

👑 The same twelve leaders named in Numbers 1

🔢 They helped Moses take the census

📋 Each one gets named again individually

📖 Every tribe mattered on its own

---
## 🚚 Six Covered Wagons And Twelve Oxen

A "wagon" here was a simple cart pulled by oxen.

"Covered" means it had some kind of frame or canopy over it.

Two princes paired up to give one wagon together.

Each prince gave one ox on his own.

The reader does not learn why these gifts were needed until the next verses.

🚚 A wagon was a simple ox cart

🛖 Covered means it had a protective frame

🤝 Two princes shared the cost of one wagon

➡️ Their purpose is explained in the next verses

# Numbers 7:4-9
# 🚚 The Levites Receive The Wagons
---
## 🎯 To Every Man According To His Service

The wagons and oxen were not handed out evenly.

Each Levite family received exactly what matched its own assigned job.

Those jobs were already laid out in detail back in Numbers 4.

The gift fit the work instead of the work fitting the gift.

🎯 Each clan got what matched its job

📖 Those jobs were listed already in Numbers 4

🔑 The gift served the work, not the reverse

➡️ Everything here was planned, nothing random

---
## 🪢 Two Wagons And Four Oxen Unto The Sons Of Gershon

The Gershonites carried the tabernacle's fabric parts.

That included the curtains, the coverings, and the hangings.

Numbers 4:24 through 26 already spelled out that assignment.

Fabric is heavy but not as bulky as timber, so their clan needed fewer wagons.

🪢 Gershon carried curtains, coverings, and hangings

📖 That job was set earlier in Numbers 4

⚖️ Lighter cargo meant fewer wagons and oxen

➡️ The gift matched the weight of the job

---
## 🪵 Four Wagons And Eight Oxen Unto The Sons Of Merari

The Merarites carried the tabernacle's heavy frame.

That included the boards, the bars, the pillars, and the sockets.

Numbers 4:31 and 32 already spelled out that assignment.

Merari's clan received exactly double what Gershon's clan received.

Heavier, bulkier material simply needed more transport power.

🪵 Merari carried boards, bars, pillars, and sockets

📖 That job was set earlier in Numbers 4

➗ Merari received exactly double Gershon's share

➡️ Heavier cargo simply needed more power

---
## 🚫 Unto The Sons Of Kohath He Gave None

The Kohathites carried the tabernacle's holiest furniture.

That included the ark, the table, the altars, and the lampstand.

No wagon was given to them at all.

Numbers 4:15 already forbade them from even touching those objects directly.

Everything had to move on poles resting on human shoulders instead of wheels.

That rule mattered enough to matter later.

A man named Uzzah was struck dead for breaking it, in 2 Samuel 6.

🚫 Kohath received zero wagons and zero oxen

🏺 Their job was carrying the ark and altar

💪 Holy objects moved by hand, not wheels

📖 Breaking this rule later cost Uzzah his life

# Numbers 7:10-11
# 📅 Twelve Days, Twelve Princes
---
## 🔥 Offered For Dedicating Of The Altar

This is a narrower ceremony than the whole tabernacle dedication in verse one.

This one is aimed only at the altar of burnt offering out in the courtyard.

That altar was already described back in Exodus 27.

This is the exact place where Israel's daily sacrifices would happen from now on.

🔥 A narrower ceremony, focused only on the altar

📖 That altar was described earlier in Exodus 27

🔑 Daily sacrifices would happen here from now on

➡️ The next verses explain how the days worked

---
## 📅 Each Prince On His Day

God commands a twelve day sequence for this ceremony.

One leader brings his tribe's gift on his own day.

The tribes do not all arrive together for one shared ceremony.

That instruction is why the same offering gets written out in full, twelve times.

📅 God commands a sequence across twelve days

🔁 One tribe gives its gift per day

📋 Nothing is grouped into a single ceremony

📖 This is why the text repeats itself next

# Numbers 7:12-17
# 🥇 Judah Goes First, Nahshon's Offering
---
## 🥇 Nahshon The Son Of Amminadab, Of The Tribe Of Judah

Nahshon was already named as Judah's prince back in Numbers 1 and 2.

His sister Elisheba married Aaron, which made him the high priest's own brother by marriage.

Generations later, his family line runs through Boaz all the way to King David.

That same line eventually leads to Jesus, according to Matthew 1:4.

🥇 Already named as Judah's prince in Numbers 1

👪 His sister Elisheba married Aaron the priest

📖 His line runs through David to Jesus

➡️ His gift becomes the pattern for all twelve

---
## 🚩 Offered His Offering The First Day

Judah was Leah's fourth son, not Jacob's firstborn.

Yet his tribe leads the entire twelve day sequence.

This order follows the marching and camp plan God set up in Numbers 2.

Judah's standard led every march, so his tribe also gives first here.

🚩 Judah was Leah's fourth son, not the oldest

🗺️ Follows the camp plan in Numbers 2

🎖️ Judah's standard led every march

📖 Camp position decided who gave first

---
## 🥈 The Weight Thereof Was An Hundred And Thirty Shekels

A "charger" was a large, shallow silver platter, and a silver bowl went with it.

A "shekel of the sanctuary" was a fixed, official weight standard set in Exodus 30.

That standard existed so no one could shortchange a gift to God.

One hundred and thirty of these shekels comes to about three pounds of silver.

🥈 A charger was a large silver platter

⚖️ The sanctuary shekel was a fixed weight standard

📖 Set to prevent shortchanging a gift to God

➡️ About three pounds of silver, in one platter

---
## 🌾 Fine Flour Mingled With Oil For A Meat Offering

In KJV English, "meat offering" is an old term for a grain offering.

It has nothing to do with meat or flesh at all.

"Fine flour" meant wheat ground and sifted to remove the husk, the best quality available.

Mixing in olive oil was the standard way this offering always came with an animal sacrifice.

🌾 Meat offering means a grain offering

✨ Fine flour was the best, sifted wheat

🔑 Grain offerings always came with an animal sacrifice

📖 It never stood alone as its own gift

---
## 🥄 One Spoon Of Ten Shekels Of Gold, Full Of Incense

This "spoon" was a small, ladle shaped dish holding gold.

It was filled with the specially blended incense recipe given back in Exodus 30.

That incense would be burned on the separate golden altar just outside the veil.

That is a different altar than the one this whole chapter dedicates.

🥄 About a quarter pound of gold

🌿 Filled with the incense recipe from Exodus 30

🔑 Burned on the golden altar behind the veil

📖 A different altar than this chapter's

---
## 🐂 One Young Bullock, One Ram, One Lamb Of The First Year

A "young bullock" was a bull not yet full grown, the most costly animal in the gift.

"Of the first year" meant an animal under twelve months old.

That was the standard age required throughout Israel's whole sacrificial system.

A burnt offering was completely consumed on the altar, nothing held back.

That total surrender pictured complete dedication to God.

🐂 A young bullock was the costliest animal here

🐑 Means under twelve months old

🔥 Fully consumed, nothing kept back

📖 It pictured total dedication to God

---
## 🐐 One Kid Of The Goats For A Sin Offering

A "kid" is simply a young goat.

This was the standard sin offering animal required for a tribal leader.

That requirement was set earlier, in Leviticus 4.

It covered unintentional sin or ritual impurity, not open, defiant rebellion.

🐐 A kid is a young goat

📖 The standard sin offering for a leader

🔑 That requirement was set in Leviticus 4

➡️ It covered unintentional sin, not open rebellion

---
## 🐑 A Sacrifice Of Peace Offerings

Seventeen animals fall into this one category alone, the largest part of Judah's whole gift.

A peace offering was partly burned and partly eaten in a shared, celebratory meal.

This was not only the costliest category, it was also built for a joyful feast.

Every prince's offering ends with this same phrase, naming him one final time.

🐑 Seventeen animals, the largest single category

🍽️ Partly burned, partly eaten in a shared meal

🎉 Built for celebration, not just duty

📖 Each offering closes by naming the giver again

# Numbers 7:18-29
# 🌾 Issachar And Zebulun
---
## ⭐ Nethaneel The Son Of Zuar, Prince Of Issachar

"Nethaneel" means "God has given."

Issachar was Leah's fifth son, born back in Genesis 30.

Centuries later his tribe became known for a very specific kind of wisdom.

First Chronicles 12 calls them men who understood the times and knew what Israel ought to do.

⭐ Nethaneel means God has given

👪 Issachar was Leah's fifth son

🔑 That praise comes from 1 Chronicles 12

📖 His tribe later understood the times well

---
## 🔁 This Was The Offering Of Nethaneel The Son Of Zuar

Every item, every weight, and every animal in Nethaneel's offering matches Judah's gift exactly.

Nothing is skipped and nothing is shortened for the second prince.

The same explanations already given for Nahshon's offering apply here without change.

Scripture chose to spell out the whole gift again instead of summarizing it.

🔁 Every item here matches Judah's gift exactly

📋 Nothing is shortened for the second prince

🔑 The earlier explanations apply here unchanged

📖 Scripture spells out the whole gift again

---
## 🌾 Eliab The Son Of Helon, Prince Of The Children Of Zebulun

"Eliab" means "my God is father."

Zebulun was Leah's sixth and final son before her daughter Dinah was born.

That completed the last of Leah's own sons in Genesis 30.

These first three tribes to give, Judah, Issachar, and Zebulun, camped together on the east in Numbers 2.

🌾 Eliab means my God is father

👪 Zebulun was Leah's sixth and final son

🗺️ These three tribes camped together, on the east

📖 The order of giving matches the marching order

# Numbers 7:30-41
# 👑 Reuben And Simeon
---
## 👑 Elizur The Son Of Shedeur, Prince Of The Children Of Reuben

Reuben was Jacob's actual firstborn son, born back in Genesis 29.

Yet his tribe gives fourth, not first.

Birth order gave way completely to the marching camp plan of Numbers 2.

Reuben's group formed the second of four camps to set out, on the south side.

👑 Reuben was Jacob's actual firstborn son

🔽 His tribe still only gives fourth

🔑 Camp position overruled birth order here too

📖 The same pattern held true for Judah

---
## 🕊️ Shelumiel The Son Of Zurishaddai, Prince Of Simeon

"Shelumiel" means "God is my peace."

Simeon was Leah's second son, born back in Genesis 29.

His tribe camped directly alongside Reuben's, in the southern group of Numbers 2.

🕊️ Shelumiel means God is my peace

👪 Simeon was Leah's second son

🗺️ Camped alongside Reuben in the south

📖 Simeon's place was fixed back in Numbers 2

---
## ➕ This Was The Offering Of Shelumiel The Son Of Zurishaddai

This closing phrase repeats after every single prince's gift, twelve times in a row.

By the end of day five, five tribes have each given the identical offering.

That is already a running total of one thousand shekels of silver.

It also comes to fifty shekels of gold, with seven tribes still to come.

🔁 This same closing phrase repeats twelve times

➕ Already one thousand shekels of silver

🔢 Fifty shekels of gold given so far

📖 Seven more tribes will add the same amount

# Numbers 7:42-53
# ⛺ Gad And Ephraim
---
## ⛺ Eliasaph The Son Of Deuel, Prince Of Gad

"Eliasaph" means "God has added."

Gad was born to Zilpah, Leah's servant, back in Genesis 30.

His tribe's gift completes the southern camp group alongside Reuben and Simeon.

⛺ Eliasaph means God has added

👪 Gad was born to Zilpah, Leah's servant

🗺️ Gad completes the southern camp group

📖 That order was set back in Numbers 2

---
## 🌾 Elishama The Son Of Ammihud, Prince Of Ephraim

Ephraim was Joseph's younger son, formally adopted as a full tribe by Jacob himself.

That adoption happened back in Genesis 48.

Elishama's own family line matters later in the story too.

First Chronicles 7 traces it forward to Joshua, the man who leads Israel into the promised land.

🌾 Ephraim was Joseph's younger son, adopted by Jacob

📖 That adoption is recorded in Genesis 48

🔑 Elishama's line leads forward to Joshua

➡️ Day seven marks the halfway point

---
## 🔄 On The Seventh Day

Days one through six covered the eastern and southern camp groups.

Ephraim's gift on this day opens a new group, the western camp.

That group included Ephraim, Manasseh, and Benjamin.

These tribes marched right behind the Levites who carried the tabernacle itself.

🔄 This day begins the western camp's turn

🚶 Ephraim, Manasseh, and Benjamin marched together

🛖 They walked right behind the tabernacle

📖 That order was set in Numbers 2

# Numbers 7:54-65
# 🤝 Manasseh And Benjamin
---
## 🔀 Gamaliel The Son Of Pedahzur, Prince Of Manasseh

"Gamaliel" means "God is my reward."

Manasseh was Joseph's older son, yet he is listed after his younger brother here.

Jacob's crossed hand blessing back in Genesis 48 placed Ephraim ahead of Manasseh from that point on.

Ephraim's tribe already gave on day seven, and Manasseh's tribe waits until day eight.

🔀 Gamaliel means God is my reward

👴 Manasseh was Joseph's older son, listed after Ephraim

🔑 Younger led older from that point on

📖 That order follows Jacob's blessing in Genesis 48

---
## 🍼 Abidan The Son Of Gideoni, Prince Of Benjamin

"Abidan" means "my father is judge."

Benjamin was Jacob's youngest son and Rachel's second child.

Rachel died giving birth to him on the road near Bethlehem, in Genesis 35.

His tribe's gift completes the western camp group alongside Ephraim and Manasseh.

🍼 Abidan means my father is judge

👪 Benjamin was Jacob's youngest son

💔 Rachel died giving birth to him

📖 His gift completes the western camp group

---
## 🔢 This Was The Offering Of Abidan The Son Of Gideoni

By day nine, this same closing phrase has repeated nine times in a row.

Two thirds of Israel's tribes have now brought the identical offering.

The running total stands at eighteen hundred shekels of silver.

It also stands at ninety shekels of gold, with only the northern camp left.

🔁 The same closing phrase, nine times now

🔢 Two thirds of the tribes have given

⚖️ Eighteen hundred shekels of silver so far

📖 Only the northern camp group remains

# Numbers 7:66-77
# 🛡️ Dan And Asher
---
## 🛡️ Ahiezer The Son Of Ammishaddai, Prince Of Dan

"Ahiezer" means "my brother is help."

Dan was born to Bilhah, Rachel's servant, back in Genesis 30.

His tribe led the fourth and final camp group.

Numbers 2 specifically calls that group the rearward of all the camps, marching last.

🛡️ Ahiezer means my brother is help

👪 Dan was born to Bilhah, Rachel's servant

🔚 His camp group marched last of all

📖 That order was fixed in Numbers 2

---
## 🌰 Pagiel The Son Of Ocran, Prince Of Asher

"Pagiel" means "God has met" or "God has stepped in."

Asher was born to Zilpah, Leah's servant, back in Genesis 30.

His tribe joined Dan's rear guard group alongside Naphtali.

That placement was fixed back in Numbers 2.

🌰 Pagiel means God has met

👪 Asher was born to Zilpah, Leah's servant

🗺️ Joined Dan's rear guard group

📖 That placement was fixed in Numbers 2

# Numbers 7:78-83
# 🏁 Naphtali Completes The Twelve
---
## 🏁 Ahira The Son Of Enan, Prince Of Naphtali

"Ahira" can be read as "my brother is a friend" or "my brother is evil."

Ancient sources differ on which reading is right, so both are worth naming.

Naphtali was Bilhah's second son, born back in Genesis 30.

His tribe joined Dan and Asher to form the whole northern camp group.

That group marched last of all four, and now gives last too.

🏁 Ahira has two possible meanings

📖 Ancient sources differ on which is right

👪 Naphtali was Bilhah's second son

➡️ His group marched last, and gives last too

---
## 🔢 This Was The Offering Of Ahira The Son Of Enan

This closing phrase completes the twelfth and final day of giving.

The tribe of Levi never appears anywhere in this sequence.

Levi received the tabernacle service itself as its assignment, not land like the rest.

Every one of the twelve remaining tribes gets its own named day, none skipped, none doubled.

🔢 The twelfth and final day is complete

🚫 Levi never appears in this sequence

🔑 Levi's assignment was service, not land

📖 Every other tribe got exactly one day

# Numbers 7:84-89
# 👂 The Total, And God Speaks From The Mercy Seat
---
## 🥈 Twelve Chargers Of Silver, Twelve Silver Bowls, Twelve Spoons Of Gold

The summary tally confirms what the twelve identical paragraphs already showed.

Not one tribe gave more or less than another.

That held true whether a tribe's population was large or small.

Wealth or size never changed what was expected at God's altar.

🥈 The tally confirms every tribe gave equally

⚖️ Tribe size made no difference here

🔑 Equal giving was the whole point

📖 Nothing depended on wealth or size

---
## ⚖️ All The Silver Vessels Weighed Two Thousand And Four Hundred Shekels

The math checks out exactly across the whole chapter.

Two hundred shekels of silver came from each prince.

Twelve princes times two hundred shekels comes to twenty four hundred shekels total.

That comes to about sixty pounds of silver, given for the altar alone.

⚖️ Two hundred shekels per prince, times twelve

🔢 About sixty pounds of silver total

🔑 The text stays this precise throughout

📖 Given in a twelve day span

---
## 🍽️ Twenty And Four Bullocks, Sixty Rams, Sixty He Goats, Sixty Lambs

These animals belonged only to the peace offering category, not the whole chapter.

Together they total two hundred and four animals, out of two hundred fifty two given overall.

The peace offering category alone was by far the largest part of the whole ceremony.

That was the category built for a shared, celebratory meal, not just duty.

🍽️ Two hundred four animals in this category alone

🎉 The largest category of the whole ceremony

🔑 Built for a shared meal, not just duty

📖 Celebration made up most of this gift

---
## 🚶 Moses Was Gone Into The Tabernacle To Speak With Him

After twelve days centered on what the people gave, the scene suddenly shifts.

Moses goes in personally, alone, to speak with God.

The chapter moves from the people's generosity to God's own response.

🚶 Focus shifts from the people's gifts

🔀 A deliberate turn after twelve days

🔑 Moses goes in alone to speak

📖 God's own response comes next

---
## 🗣️ He Heard The Voice Of One Speaking Unto Him From Off The Mercy Seat

This directly fulfills God's own promise, given when the ark was first designed.

Exodus 25 records that promise, that God would meet and speak from above the mercy seat.

Everything built and dedicated up to this point existed for exactly this moment.

That promise was not only words, it actually happened here.

🗣️ Fulfills God's promise from Exodus 25

🏗️ Everything built up to now made this possible

🔑 The promise was not only words

📖 It actually happened, right here

---
## 📜 The Ark Of Testimony

"Testimony" refers to the stone tablets of the Ten Commandments kept inside the ark.

Exodus 25 first calls it by that name.

Exodus 40 confirms Moses placed the tablets inside.

The ark was not just a box, it physically held the terms of Israel's covenant with God.

📜 Testimony means the stone tablets inside

📖 First named this back in Exodus 25

🔑 Moses placed the tablets inside in Exodus 40

➡️ The covenant sat beneath where God's voice came
`.trim();

export const NUMBERS_SEVEN_PERSONAL_SECTIONS = parseNumbersSevenRawNotes(NUMBERS_SEVEN_RAW_NOTES);
