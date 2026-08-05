export type NumbersTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentySixRawNotes(rawText: string): NumbersTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 26:${startVerse}` : `Numbers 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 Numbers 26 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_SIX_RAW_NOTES = `# Numbers 26:1-4
# 🔢 A Census After The Plague
---
## ⚰️ After The Plague

The plague refers to the disaster in Numbers 25.

24,000 people died there for sinning with Moab at Baalpeor.

God orders this new count right after that judgment, not before it.

A census taken in the middle of grief marks a fresh start for Israel.

⚰️ 24,000 died in Numbers 25

🔥 Judgment struck through the Baalpeor plague

🔢 This census comes right after that loss

📖 God rebuilds the nation after judgment

## 👨‍👦 Eleazar The Son Of Aaron The Priest

Aaron himself died earlier, back in Numbers 20.

His son Eleazar became high priest right after that.

Here Eleazar leads this census beside Moses for the first time.

One generation of leaders is already stepping aside for the next.

👨‍👦 Aaron died back in Numbers 20

🙏 Eleazar became high priest next

🤝 He now leads beside Moses

📖 Leadership passes to the next generation

## 🏕️ The Plains Of Moab By Jordan Near Jericho

This is Israel's last camp before entering the promised land.

It sits east of the Jordan River.

Jericho sits directly across the river, the first city Israel will conquer.

Everything from here forward points toward that coming battle.

🏕️ Israel's final camp before Canaan

🌊 Located east of the Jordan River

🏙️ Jericho sits directly across the water

📖 The next chapters point toward conquest

## ⚔️ From Twenty Years Old And Upward

This age cutoff matches the very first census in Numbers 1.

Only men who could serve as soldiers were being counted.

The census leaves out women, children, and anyone too old to fight.

Israel was being measured for the battles still ahead of it.

⚔️ Same cutoff used in the first census

🪖 Only future soldiers are counted here

🚫 Women, children, and elders are left out

📖 Israel is being measured for battle

# Numbers 26:5-11
# ⚰️ Reuben, And The Line Of Korah
---
## 👑 Reuben, The Eldest Son Of Israel

Reuben was Jacob's actual firstborn son.

He lost the rights that came with that place years earlier.

Genesis 49 explains why, he slept with his father's concubine.

He is still listed first here out of respect for birth order alone.

👑 Reuben was Jacob's actual firstborn

📉 He lost his firstborn rights early

📖 Genesis 49 explains the reason why

➡️ Order here still honors his birth alone

## 📜 These Are The Families Of The Reubenites

Reuben had four sons, Hanoch, Pallu, Hezron, and Carmi.

Each one became the head of his own family clan.

This clan is counted at 43,730 men here.

That number fell only slightly from 46,500 in the first census.

👨‍👦 Reuben had four named sons

🏘️ Each son heads his own clan

🔢 The tribe drops from 46,500 to 43,730

📖 A small change opens this long census

## 🎭 Famous In The Congregation

Eliab's three sons are named here, Nemuel, Dathan, and Abiram.

Famous here is used with heavy irony.

Dathan and Abiram were infamous, not celebrated, for rebelling with Korah in Numbers 16.

They challenged Moses and Aaron, and through them, they challenged God himself.

👨‍👦 Eliab's three sons are named here

⚡ Dathan and Abiram led a revolt

🎭 Famous here really means infamous

📖 Rebelling against Moses meant rebelling against God

## 🌍 The Earth Opened Her Mouth, And Swallowed Them Up

This is the same judgment described fully in Numbers 16.

The ground split open and swallowed Korah, Dathan, Abiram, and their households alive.

Fire from the LORD then killed 250 more men who joined the revolt.

The text calls it a sign, a lasting warning for later generations.

🌍 The ground swallowed the rebels alive

🔥 Fire killed 250 more men

⚠️ A sign means a lasting warning

📖 Israel remembers this nearly forty years later

## 🙏 The Children Of Korah Died Not

Korah himself died in that judgment.

His own sons survived it completely.

Their descendants became a respected family of singers and gatekeepers in the temple.

Their name appears in the titles of eleven Psalms, including Psalm 42 and Psalm 84.

🙏 Korah died, his sons lived

🎵 Their line becomes temple singers

📜 Eleven Psalms carry their name

📖 Judgment fell on Korah, not his whole family

# Numbers 26:12-14
# 📉 Simeon's Steep Decline
---
## 🏘️ The Sons Of Simeon After Their Families

Simeon has five clans listed here, Nemuel, Jamin, Jachin, Zerah, and Shaul.

Genesis 46 originally listed six sons for Simeon.

One line, Ohad's, is simply missing by this point.

Family lines could die out completely during the wilderness years.

🏘️ Five clans are listed here

📜 Genesis 46 once listed six sons

📉 One family line has disappeared

📖 Not every family line survived the wilderness

## 📉 Twenty And Two Thousand And Two Hundred

Simeon's count falls from 59,300 to 22,200 here.

That is a loss of more than half the tribe.

It is the steepest drop of any tribe in this whole census.

Chapter 25 named a Simeonite prince, Zimri, as the man who led Israel into sin at Baalpeor.

📉 Down from 59,300 to 22,200

⚖️ Over half the tribe is gone

🎯 Simeon's own prince led that sin

📖 A number can hint at a hidden reason

# Numbers 26:15-18
# 🏘️ Gad's Family And Future Land
---
## 🏘️ The Children Of Gad After Their Families

Gad has seven clans listed here, more than any tribe so far.

Gad's name means fortune, or a troop.

Leah's servant Zilpah bore Gad, and Leah named him at his birth in Genesis 30.

A name chosen in one emotional moment could last for centuries.

🏘️ Seven clans, the most listed yet

📛 Gad's name means fortune or a troop

👩 Zilpah, Leah's servant, was his mother

📖 A birth name can outlast its owner

## 📉 Forty Thousand And Five Hundred

Gad's count falls from 45,650 to 40,500 here.

That is a real loss, but far smaller than Simeon's.

Gad will soon ask for land outside Canaan itself, east of the Jordan.

Numbers 32 grants that request because the land suited Gad's large herds.

📉 Down from 45,650 to 40,500

⚖️ A real loss, but a modest one

🗺️ Gad later settles east of the Jordan

📖 Numbers 32 grants that same request

# Numbers 26:19-22
# 👑 Judah, And The Line To David
---
## ⚰️ Er And Onan Died In The Land Of Canaan

This looks back to Genesis 38.

God struck Er dead there for wickedness.

His brother Onan died soon after for refusing to give Er's widow children.

Neither son left any descendants of his own.

⚰️ Er and Onan both died young

📖 Genesis 38 tells their full story

🚫 Onan refused his duty to Tamar

➡️ Neither man left a family line

## 👨‍👩‍👦 The Sons Of Judah After Their Families

Judah's surviving line runs through three sons, Shelah, Pharez, and Zerah.

Pharez and Zerah were both born to Tamar, not Judah's first wife.

Genesis 38 tells that hard story, where Tamar tricked Judah after Er and Onan's deaths.

Pain in the past still shaped the family's future.

👨‍👩‍👦 Three sons carry Judah's line forward

👩 Pharez and Zerah were born to Tamar

📖 Genesis 38 tells that difficult story

➡️ Pain in the past still shaped the future

## 👑 The Sons Of Pharez Were Hezron And Hamul

Hezron is not just another name in a long list.

He becomes a direct ancestor of King David.

Ruth 4 and Matthew 1 both trace that same line down to Jesus.

A quiet name in a census carries weight far beyond this chapter.

👑 Hezron leads toward King David

📜 Ruth 4 traces this same line

✝️ Matthew 1 carries it to Jesus

📖 A small name can hold huge weight

## 📈 Threescore And Sixteen Thousand And Five Hundred

Judah's count rises from 74,600 to 76,500 here.

That makes Judah the largest tribe in this census.

Judah was also the largest tribe in the first census, back in Numbers 1.

The tribe stays in the lead through the entire wilderness journey.

📈 Up from 74,600 to 76,500

🥇 Judah is the largest tribe here

🔁 It was also largest the first time

📖 Judah leads from Egypt to Canaan

# Numbers 26:23-27
# 📈 Issachar And Zebulun Grow
---
## 🏘️ The Sons Of Issachar After Their Families

Issachar's four sons each became the head of a clan, Tola, Pua, Jashub, and Shimron.

Issachar's name means he brings a reward, or hire.

Leah named him after trading her son's mandrakes for a night with Jacob in Genesis 30.

She saw the resulting pregnancy as her own reward for that trade.

🏘️ Four clans carry Issachar's name forward

📛 His name means reward or hire

🌱 Named after a mandrake trade in Genesis 30

📖 An odd trade gave a tribe its name

## 📈 Threescore And Four Thousand And Three Hundred

Issachar's count grows from 54,400 to 64,300 here.

That is a gain of almost 10,000 men.

Not every tribe shrank during the wilderness years.

Judges 10 later names a judge called Tola from this very tribe.

📈 Up from 54,400 to 64,300

🔢 A gain of almost 10,000 men

⚖️ A later judge named Tola shares this name

📖 Family names can echo generations later

## 🏘️ The Sons Of Zebulun After Their Families

Zebulun has three clans here, Sered, Elon, and Jahleel.

Zebulun was Leah's sixth and final son.

Genesis 30 says she hoped Jacob would finally honor her for so many sons.

One more tribal name rooted in the rivalry between Jacob's two wives.

🏘️ Three clans within the tribe of Zebulun

👩 Zebulun was Leah's sixth and final son

💔 Named from her hope for honor

📖 A family rivalry still shapes tribal names

## 📈 Threescore Thousand And Five Hundred

Zebulun's count rises from 57,400 to 60,500 here.

That is a modest gain, smaller than Issachar's jump.

The twelve tribes show no single pattern in this census.

Some grew, some shrank, and each moved for its own reason.

📈 Up from 57,400 to 60,500

📊 A smaller gain than Issachar's

🔀 No single pattern across the tribes

📖 Each tribe's story moves on its own

# Numbers 26:28-34
# 👧 Manasseh, And Zelophehad's Daughters
---
## 👨‍👦 The Sons Of Joseph After Their Families Were Manasseh And Ephraim

Joseph himself never became a tribe of his own.

Genesis 48 records how Jacob adopted Joseph's two sons as full tribes instead.

Manasseh and Ephraim each received their own land and their own count.

Joseph effectively received a double share among the twelve tribes.

👨‍👦 Joseph has no tribe of his own

📜 Jacob adopted his two sons in Genesis 48

🏞️ Each son received his own land

📖 Joseph's portion was doubled through his sons

## ⚔️ Machir Begat Gilead

Machir was Manasseh's son, and Gilead was Machir's son.

Gilead's name is also given to a whole region east of the Jordan.

Israel had just conquered that land from kings Sihon and Og in Numbers 21.

Half of Manasseh's tribe will settle in the very land named for their own ancestor.

⚔️ Gilead is both a man and a region

🗺️ Israel took that land in Numbers 21

🏕️ Half of Manasseh settles there

📖 A family name becomes a place name

## 👧 Zelophehad The Son Of Hepher Had No Sons, But Daughters

Zelophehad died in the wilderness for his own sin, not as part of any group revolt.

Numbers 27 explains that detail more fully.

He left no sons at all to inherit his share of land.

Under the normal system, a family without sons simply lost its inheritance.

⚰️ Zelophehad died for his own sin

👧 He left five daughters, no sons

📖 Numbers 27 explains that detail further

➡️ No land was left for his line

## 📛 The Names Of The Daughters Of Zelophehad

All five daughters are named individually here.

That is unusual in a chapter almost entirely made of male family lines.

Numbers 27 shows these five women petitioning Moses directly for their father's land.

They win, and Israel's inheritance law changes permanently because of them.

📛 Five daughters named individually here

📖 Numbers 27 tells what happens next

⚖️ They win the right to inherit

➡️ One family changed the whole law

## 📈 Fifty And Two Thousand And Seven Hundred

Manasseh's count explodes from 32,200 to 52,700 here.

That is a gain of over 20,000 men.

Manasseh was the smallest tribe in the first census.

Here it posts one of the largest gains in this entire count.

📈 Up from 32,200 to 52,700

🔢 A gain of over 20,000 men

📉 Manasseh had once been the smallest

📖 The smallest tribe posts the biggest gain

## 🏘️ These Are The Sons Of Gilead

Gilead's own line runs six clans deep, Jeezer, Helek, Asriel, Shechem, Shemida, and Hepher.

That is one of the most detailed family trees in this whole chapter.

One more generation is traced here than for most of the other tribes.

This detail sets up the very next verse about Zelophehad.

🏘️ Six clans trace back to Gilead

📚 One of the deepest trees here

🔎 One generation past most other tribes

➡️ This detail sets up what comes next

# Numbers 26:35-37
# 🏘️ Ephraim's Family
---
## 🏘️ The Sons Of Ephraim After Their Families

Ephraim's three sons, Shuthelah, Becher, and Tahan, each head a clan.

Ephraim was Joseph's younger son.

Genesis 48 says Jacob blessed him ahead of his older brother Manasseh on purpose.

The younger brother blessed ahead of the older is a pattern that repeats through Genesis.

🏘️ Three clans within the tribe of Ephraim

🤚 Jacob blessed Ephraim ahead of Manasseh

🔁 Younger over older is a Genesis pattern

📖 Genesis 48 records that choice

## 👶 The Sons Of Shuthelah: Of Eran, The Family Of The Eranites

This traces one more generation than most clan lists in this chapter.

Eran was Shuthelah's own son, not just another brother.

A family tree this detailed usually means that clan had grown large.

Ephraim's roots run deeper here than almost any other tribe listed.

👶 Eran was Shuthelah's own son

🌳 One extra generation traced here

📚 A sign the clan had grown large

📖 Ephraim's roots run deep in this list

## 📉 Thirty And Two Thousand And Five Hundred

Ephraim's count actually falls, from 40,500 to 32,500 here.

That is a loss of 8,000 men.

Ephraim will later become one of the most powerful tribes in Israel's history.

Joshua himself, Israel's next leader, comes from this very tribe.

📉 Down from 40,500 to 32,500

🔢 A loss of 8,000 men

🌟 Ephraim later becomes hugely important

📖 Joshua comes from this shrinking tribe

# Numbers 26:38-41
# 🏘️ Benjamin's Family
---
## 🏘️ The Sons Of Benjamin After Their Families

Benjamin's five sons, Bela, Ashbel, Ahiram, Shupham, and Hupham, each head a clan.

Benjamin was Jacob's youngest son.

Genesis 35 says Rachel died giving birth to him, on the road to Bethlehem.

He was the only one of the twelve tribal ancestors born in the promised land itself.

🏘️ Five clans within the tribe of Benjamin

👶 Jacob's youngest son, born last

💔 Rachel died giving birth to him

📖 Born in the land itself, in Genesis 35

## 👶 And The Sons Of Bela Were Ard And Naaman

Bela's own two sons get named individually here.

That is one more generation than most tribes receive in this list.

Ard and Naaman each head their own smaller clan within Benjamin.

A short tribe entry still holds real family detail.

👶 Ard and Naaman were Bela's sons

🌳 One extra generation traced here too

🏘️ Two smaller clans within Benjamin

📖 Even a short entry holds real detail

## 📈 Forty And Five Thousand And Six Hundred

Benjamin's count climbs from 35,400 to 45,600 here.

That is a gain of over 10,000 men.

Benjamin had been one of the smaller tribes in the first census.

This same tribe later produces Israel's first king, Saul, in 1 Samuel 9.

📈 Up from 35,400 to 45,600

🔢 A gain of over 10,000 men

👑 Benjamin later gives Israel its first king

📖 Saul comes from this growing tribe

# Numbers 26:42-47
# 🏘️ Dan And Asher's Families
---
## 🏘️ These Are The Sons Of Dan After Their Families

Dan traces back to just one son, Shuham, and one single clan.

Every other tribe in this chapter lists more than one family line.

Dan still becomes one of the larger tribes by population, even with only one clan.

A small family tree does not mean a small population.

🏘️ Just one clan, unlike any other tribe

📛 Dan's whole line runs through Shuham

📊 Still a large tribe by population

📖 Family size does not predict tribe size

## 📈 Threescore And Four Thousand And Four Hundred

Dan's count rises slightly, from 62,700 to 64,400 here.

That keeps Dan among the largest tribes in Israel.

It holds that rank in both censuses, despite having only one recorded clan.

Numbers here do not always match family structure in this chapter.

📈 Up from 62,700 to 64,400

🥈 Dan stays a large tribe both times

🏘️ Still only one clan on record

📖 Population and family count do not always match

## 🏘️ The Children Of Asher After Their Families

Asher's family tree runs two generations deep here.

Beriah's own sons, Heber and Malchiel, are named right alongside their father's brothers.

That level of detail matches what the chapter already gave for Manasseh's line.

A longer list can point to a large and well recorded family.

🏘️ Five clans across two generations

👶 Heber and Malchiel are Beriah's own sons

📚 As detailed as Manasseh's family tree

📖 A long list can mean a large family

## 👧 The Name Of The Daughter Of Asher Was Sarah

Sarah is named individually here, the same way Zelophehad's five daughters were named earlier.

She is the only daughter named among all twelve tribes outside that one family.

The text never explains why, it simply chooses to remember her by name.

Naming someone at all, without explanation, can still mean she mattered.

👧 Sarah is named on her own

📛 She shares a name with Abraham's wife

❓ No reason is given for including her

📖 A name alone can preserve a memory

## 📈 Fifty And Three Thousand And Four Hundred

Asher's count grows from 41,500 to 53,400 here.

That is a gain of almost 12,000 men.

Asher's name means happy.

Leah gave him that name after her servant Zilpah bore him, in Genesis 30.

📈 Up from 41,500 to 53,400

🔢 A gain of almost 12,000 men

📛 Asher's name simply means happy

📖 Named for a mother's joy in Genesis 30

# Numbers 26:48-51
# 🔢 Naphtali, And The Grand Total
---
## 🏘️ These Are The Sons Of Naphtali After Their Families

Naphtali's four sons, Jahzeel, Guni, Jezer, and Shillem, each head a clan.

Naphtali and Dan were full brothers, both born to Rachel's servant Bilhah.

Their two tribes move in opposite directions in this census.

Blood relation does not guarantee the same fortune.

🏘️ Four clans within the tribe of Naphtali

👨‍👦 Naphtali and Dan were full brothers

🔀 The two tribes move in opposite directions

📖 Family ties do not guarantee the same future

## 📉 Forty And Five Thousand And Four Hundred

Naphtali's count falls from 53,400 to 45,400 here.

That is a loss of 8,000 men.

It is one of the sharper declines in this whole census.

Only Simeon's collapse is worse than this among all twelve tribes.

📉 Down from 53,400 to 45,400

🔢 A loss of 8,000 men

📊 One of the sharper drops here

📖 Only Simeon fell farther than this

## 🔢 Six Hundred Thousand And A Thousand Seven Hundred And Thirty

The grand total across all twelve tribes is 601,730 fighting men.

The first census, almost 38 years earlier, counted 603,550.

Individual tribes shifted by tens of thousands in both directions.

The nation's overall size still barely moved at all.

🔢 601,730 fighting men counted here

📆 Almost 38 years since the first count

⚖️ Tribes shifted by tens of thousands each

📖 The whole nation's size held remarkably steady

# Numbers 26:52-56
# ⚖️ Dividing The Land By Lot
---
## ⚖️ Unto These The Land Shall Be Divided For An Inheritance

This is the whole reason this census exists.

Canaan's land is tied directly to the people just counted in this chapter.

That means this new generation, not their parents who died in the wilderness.

A headcount was never just paperwork, it decided who would receive land.

⚖️ Land is tied to this exact census

👥 Only the new generation receives it

🚫 Their parents never see this land

📖 A count decided a whole future

## 📏 To Many Thou Shalt Give The More Inheritance

Larger tribes receive more land here.

Smaller tribes receive correspondingly less.

Both amounts come directly from the population numbers just recorded in this chapter.

Land was measured by need, not by favor or rank.

📏 Bigger tribes get more land

📉 Smaller tribes get less

🔢 Both scale from this chapter's numbers

📖 Need decided the size of each share

## 🎲 The Land Shall Be Divided By Lot

A lot here works like drawing straws or casting marked stones.

It made the final choice feel entirely out of human hands.

Proverbs 16 later says the lot is cast, but the LORD decides it.

Fairness by population and impartiality by chance combine into one system here.

🎲 A lot means a random, God directed choice

🙏 It removed any chance of favoritism

📖 Proverbs 16 echoes this same idea

➡️ Two fairness systems work together here

## 📜 According To The Names Of The Tribes Of Their Fathers They Shall Inherit

Land inheritance runs strictly through family and tribal lines.

Those lines trace all the way back to each of Jacob's original sons.

Every future Israelite home connects back to this one ancestor list.

This chapter's long genealogies were never just record keeping, they were property deeds.

📜 Inheritance follows tribal bloodlines exactly

🏡 Every future home traces back this far

📋 This chapter's lists double as legal records

📖 A genealogy here works like a deed

# Numbers 26:57-62
# 🛕 The Levites, Counted Separately
---
## 👨‍👦 These Are They That Were Numbered Of The Levites After Their Families

Levi's three sons, Gershon, Kohath, and Merari, each head one of the tribe's main divisions.

Numbers 3 and 4 already assigned each division its own tabernacle duties.

One division carried the curtains, another the furniture, another the frame itself.

This structure was already familiar to Israel long before this census.

👨‍👦 Levi's three sons head three divisions

🎒 Numbers 3 and 4 assigned their duties

🛠️ Each group carried different tabernacle parts

📖 A structure already set long before this count

## ⚡ The Family Of The Korathites

The Korathites descend from Korah, the very man who led a revolt against Moses in Numbers 16.

His name is still listed here without shame or apology.

Verse 11 already made this point once, Korah died, but his family line did not.

Judgment fell on the man himself, not automatically on everyone who carried his name.

⚡ Korathites descend from Korah himself

🙅 Listed here without shame or hiding

🔁 Verse 11 already made this point

📖 Judgment fell on Korah, not his whole line

## 👵 Kohath Begat Amram

This names Moses and Aaron's own parents.

Amram's wife was Jochebed, called the daughter of Levi.

That makes Jochebed both Amram's aunt and his wife.

The Law had not yet banned marriages like this one, until Leviticus 18.

👨‍👩‍👧‍👦 Amram and Jochebed were Moses' parents

👵 Jochebed was Levi's own daughter

💍 She was Amram's aunt and his wife

📖 The Law later banned this same marriage

## 👶 She Bare Unto Amram Aaron And Moses, And Miriam Their Sister

This confirms three full siblings, Aaron, Moses, and Miriam, born to the same parents.

Miriam is the same sister who watched over baby Moses in the basket on the Nile.

Exodus 2 tells that story, and Exodus 15 shows her leading Israel's women in song.

One family shaped Israel's lawgiver, its first high priest, and its first named prophetess.

👶 Aaron, Moses, and Miriam were full siblings

🧺 Miriam watched over baby Moses in Exodus 2

🎶 She later led Israel's women in song

📖 One family shaped Israel's whole leadership

## 🔥 Nadab And Abihu Died, When They Offered Strange Fire

This looks back to Leviticus 10.

Aaron's two oldest sons offered incense God had not commanded them to bring.

Fire from the LORD struck them dead on the spot.

That is exactly why Eleazar, and not Nadab or Abihu, leads this census beside Moses.

🔥 Nadab and Abihu died instantly

📖 Leviticus 10 tells the full story

⚠️ Their worship was never commanded by God

➡️ Their deaths explain why Eleazar leads now

## 🔢 Twenty And Three Thousand, All Males From A Month Old And Upward

The Levites are counted differently from every other tribe in this chapter.

Every male counts here from one month old, not twenty years old.

They were never being counted for war.

They were counted instead for service at the tabernacle.

🔢 23,000 Levite males counted here

👶 Counted from one month old, not twenty

🛕 Counted for tabernacle service, not war

📖 A different calling meant a different count

# Numbers 26:63-65
# 🌟 Only Caleb And Joshua Remain
---
## 📜 These Are They That Were Numbered By Moses And Eleazar The Priest

The chapter closes by naming the same two men who opened it in verse 1.

That repetition forms a deliberate frame around the whole census.

Naming them again confirms the count was carried out under recognized leadership.

A formal document closes the same way it began.

📜 Moses and Eleazar close the frame

🔁 Verse 1 named them at the start

✅ This confirms the count's legitimacy

📖 A formal record ends the way it opened

## ⚰️ Not A Man Of Them Whom Moses And Aaron The Priest Numbered

This confirms that none of the men from the first census are still alive.

That first count happened almost 38 years earlier, at Sinai.

The entire adult generation that left Egypt has now died out completely.

A full generation has passed since Israel first left Egypt as free people.

⚰️ None of the first census survives

📆 Almost 38 years have passed

👥 A whole generation has died out

📖 One generation ends, another begins

## 🌟 Save Caleb The Son Of Jephunneh, And Joshua The Son Of Nun

These are the only two exceptions in the entire chapter.

Both men were among the twelve spies sent into Canaan back in Numbers 13.

They alone brought back a faithful report while the other ten spread fear.

Faith kept decades earlier is what let them live to see the promise now.

🌟 Only two men survive from before

🕵️ Both were faithful spies in Numbers 13

😨 Ten others spread fear instead

📖 Faith then is rewarded with life now
`.trim();

export const NUMBERS_TWENTY_SIX_PERSONAL_SECTIONS = parseNumbersTwentySixRawNotes(NUMBERS_TWENTY_SIX_RAW_NOTES);
