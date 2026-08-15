export type FirstChroniclesSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesSevenRawNotes(rawText: string): FirstChroniclesSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 7:${startVerse}` : `1 Chronicles 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 7 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_SEVEN_RAW_NOTES = `# FirstChronicles 7:1-5
# 📜 Issachar's Fighting Men
---
## 🌾 The Sons Of Issachar Were Tola And Puah

Issachar was one of Jacob's twelve sons, born to Leah.

His name in Hebrew points to the idea of reward or wages.

Genesis thirty explains that name through a bargain over mandrakes.

This verse opens Issachar's own family record with four sons.

🌾 Issachar was Jacob's son through Leah

🎁 His name points to reward or wages

👨‍👩‍👧‍👦 Four sons open his family record

📖 Genesis thirty explains the naming

## 💪 Valiant Men Of Might In Their Generations

Valiant men of might is a specific military term, not a compliment.

It describes men who were trained and ready for battle.

Chronicles repeats this same phrase for tribe after tribe.

This particular count comes from the days of King David.

💪 Valiant men of might means trained soldiers

📋 The phrase repeats for every tribe

🔢 Tola's branch topped twenty two thousand men

📖 This count comes from David's reign

## 🔢 Two And Twenty Thousand And Six Hundred

This number was not an estimate.

Kings needed exact counts of fighting men for planning wars.

David is known elsewhere in Chronicles for ordering a census of Israel.

Issachar was a smaller tribe, yet its men were still fully counted.

🔢 The count was exact, not a guess

🛡️ Kings tracked fighting men for defense

👑 It connects to David's larger census

📖 Even a small tribe was fully counted

## ⚔️ Bands Of Soldiers For War Six And Thirty Thousand Men

This second army count belongs to Uzzi's branch of the family.

Six and thirty thousand men served here, a much bigger number.

That number is far larger than the twenty two thousand named before it.

The next verse explains exactly why the number grew so fast.

⚔️ This count belongs to Uzzi's branch

📈 Thirty six thousand is a big jump

❓ The next verse explains the reason

📖 Family size drove military size

## 👨‍👩‍👧‍👦 For They Had Many Wives And Sons

This line explains the sudden jump in numbers from before.

Having many wives was common among wealthy families in this era.

More wives meant more children, and more sons meant more soldiers.

Family size directly shaped how strong a tribe could be in war.

👨‍👩‍👧‍👦 Many wives explains the large numbers

📜 Polygamy was common among wealthy families

⚔️ More sons meant more soldiers

📖 Family size shaped military strength

## 🧮 Fourscore And Seven Thousand

Fourscore is an old way of saying eighty.

Fourscore and seven thousand means eighty seven thousand men in total.

Issachar was not one of the larger or more famous tribes.

Yet its full army still reached nearly ninety thousand soldiers.

🧮 Fourscore means eighty

🔢 The total reaches eighty seven thousand

🌾 Issachar was a smaller, quieter tribe

📖 Every tribe was still counted fully

# FirstChronicles 7:6-11
# 🛡️ Benjamin's Mighty Men
---
## 🏹 The Sons Of Benjamin Bela And Becher And Jediael

Benjamin was Jacob's youngest son, born to Rachel.

This list names only three of his sons here.

Genesis forty six and First Chronicles eight both give longer versions.

Chronicles often records the same tribe more than once for different reasons.

🏹 Benjamin was Jacob's youngest son

📚 Other chapters give longer versions

🎯 This list serves a military count

📖 Chronicles repeats tribes for different reasons

## 🏘️ Heads Of The House Of Their Fathers Mighty Men Of Valour

Mighty men of valour is the same military language used for Issachar.

It marks trained, capable fighters, not simply respected elders.

Bela's own branch reached over twenty two thousand such men.

Each name on this list stands for an entire household.

🏘️ Mighty men of valour means trained fighters

🔢 Bela's branch topped twenty two thousand men

👨‍👩‍👧‍👦 Each name stands for a household

📖 The census tracks households, not individuals

## 📛 Anathoth

Anathoth appears here simply as the name of one of Becher's sons.

The very same word later names a real town in Benjamin's land.

That town becomes famous as the hometown of the prophet Jeremiah.

A name given to a child could later be given to a town.

📛 Anathoth is named here as a person

🏘️ The same word later names a town

✍️ That town is Jeremiah's hometown

📖 Names could mark both people and places

## ⚔️ Fit To Go Out For War And Battle

This exact phrase closes out each family count in this section.

It marks men as approved and ready for actual combat.

Age, health, and training all factored into who qualified.

Bela's, Becher's, and Jediael's men combined reached well over fifty nine thousand.

⚔️ This phrase marks approved combat readiness

📏 Age, health, and training all mattered

➕ Three branches topped fifty nine thousand

📖 One tribe fielded a huge force

## 👤 Ehud

This Ehud is not the famous judge from the book of Judges.

That earlier Ehud also came from the tribe of Benjamin.

He killed the Moabite king Eglon and delivered Israel in Judges three.

Sharing a tribe and a name does not make two men the same person.

👤 This Ehud is not Judges' famous judge

🗡️ That Ehud killed King Eglon

🏹 Both men came from Benjamin

📖 Same name does not mean same person

# FirstChronicles 7:12-13
# ❓ A Missing Tribe
---
## 👥 Shuppim Also And Huppim The Children Of Ir

This verse is one of the hardest to follow in the chapter.

Shuppim and Huppim are named elsewhere as sons of Benjamin.

Here they appear connected to a man named Ir instead.

Many scholars believe this verse continues the Benjamin list from before it.

👥 Shuppim and Huppim also appear in Genesis

❓ Ir is not identified elsewhere

📚 Many scholars link this to Benjamin

📖 Old family records could blur over time

## 🔍 The Sons Of Aher

Aher is a strange name to end a genealogy on.

In Hebrew the word aher simply means another or a different one.

Many scholars believe this line stands in for the tribe of Dan.

Dan's genealogy is almost entirely missing from this book.

Judges eighteen records Dan later falling into idol worship.

Some believe that history explains why Dan's record was left so thin.

🔍 Aher means another in Hebrew

❓ It may stand in for Dan

📉 Dan's genealogy is nearly missing here

📖 Judges eighteen records Dan's idolatry

## 👶 The Sons Of Naphtali

Naphtali's family list here is short, just four sons in one line.

Bilhah was Rachel's handmaid.

Genesis thirty says Rachel gave her to Jacob to build a family.

Bilhah became the mother of both Dan and Naphtali.

Both of her sons receive unusually brief treatment in this chapter.

👶 Bilhah was Rachel's handmaid

📜 She became mother to Dan and Naphtali

📉 Both sons get brief treatment here

📖 Naphtali's whole line is one verse

# FirstChronicles 7:14-19
# 👑 Manasseh And Zelophehad's Daughters
---
## 👦 The Sons Of Manasseh Ashriel Whom She Bare

Manasseh was Joseph's firstborn son, born in Egypt.

Genesis forty eight records Jacob blessing younger Ephraim above him instead.

This genealogy is about to grow complicated fast.

Several parenthetical notes interrupt the list like scribal footnotes.

👦 Manasseh was Joseph's firstborn son

👇 Jacob blessed his younger brother instead

📝 Parenthetical notes interrupt this list

📖 Real detail is packed into it

## 🌍 But His Concubine The Aramitess Bare Machir The Father Of Gilead

A concubine held a recognized but lower status than a full wife.

Her children could still count as legitimate members of the family.

Machir became so important that his name later marked a whole region.

Numbers thirty two and Joshua seventeen both describe his descendants settling that land.

🌍 A concubine held a lower but real status

👶 Machir was her son

🗺️ Gilead the region is named after him

📖 Numbers and Joshua describe his land

## 👧 And Zelophehad Had Daughters

This short line points to a major story in the book of Numbers.

Zelophehad died with no sons, only daughters, five of them by name.

Numbers twenty seven records those daughters boldly asking Moses for an inheritance.

God ruled in their favor, and it became a lasting law.

👧 Zelophehad left only daughters

⚖️ They asked Moses for an inheritance

✅ God ruled in their favor

📖 It became a lasting inheritance law

## 👑 His Sister Hammoleketh Bare Ishod And Abiezer And Mahalah

Hammoleketh's name comes from a Hebrew word meaning the queen.

She is named here as the head of her own family branch.

Very few women in these genealogies are named and credited this directly.

Her son Abiezer later gives his name to a clan in Judges.

That clan produces the judge Gideon generations later.

👑 Hammoleketh's name means the queen

👩 She heads her own family branch

🌾 Her son Abiezer names a later clan

📖 That clan later produces Gideon

## 🏔️ These Were The Sons Of Gilead The Son Of Machir The Son Of Manasseh

This line closes out Manasseh's genealogy for now.

Gilead here is both a man's name and the region his family settled.

Four generations are now connected, Manasseh, Machir, Gilead, and their descendants.

That same family later plays a real role in Israel's wars east of the Jordan.

🏔️ This closes Manasseh's genealogy for now

🗺️ Gilead names both a man and a region

🔗 Four generations are now connected

📖 This family later fights east of Jordan

# FirstChronicles 7:20-24
# 😢 Ephraim's Loss And Beriah's Birth
---
## 👦 The Sons Of Ephraim Shuthelah And Bered His Son

Ephraim was Joseph's younger son, also born in Egypt.

Genesis forty eight records Jacob crossing his hands to bless him first.

That surprising blessing made Ephraim's tribe one of the most important later.

This genealogy is about to record a painful family loss.

👦 Ephraim was Joseph's younger son

🤲 Jacob blessed him above his brother

⭐ His tribe became very important later

📖 A painful loss comes next

## ⚔️ Whom The Men Of Gath That Were Born In That Land Slew

This killing likely happened while Jacob's family still lived in Egypt.

Some of Ephraim's own sons or grandsons traveled back toward Canaan.

Men from Gath, a city later known as a Philistine stronghold, killed them.

This shows Jacob's family kept some contact with Canaan during their years in Egypt.

⚔️ This happened while Israel lived in Egypt

🚶 Ephraim's family traveled back toward Canaan

🏙️ Gath later becomes a Philistine city

📖 Contact with Canaan never fully stopped

## 🐄 Because They Came Down To Take Away Their Cattle

Raiding another family's cattle was a real and often deadly practice.

Cattle represented wealth, food, and survival for an entire family.

Ephraim's sons died trying to take cattle that belonged to men of Gath.

The text records this plainly, without excusing or praising the raid.

🐄 Cattle meant wealth and survival

⚔️ Raiding cattle was common and dangerous

💀 Ephraim's sons died attempting a raid

📖 The text does not excuse the act

## 😢 Ephraim Their Father Mourned Many Days

Ephraim himself is the one grieving here, not a distant ancestor.

This means Joseph's own son lived long enough to bury his own sons.

Genealogies rarely pause to show raw grief this directly.

His brethren, meaning his extended family, came to comfort him.

😢 Ephraim grieved his own sons

👴 Joseph's son outlived his own children

💔 Genealogies rarely show grief this openly

📖 Family came to comfort him

## 👶 He Called His Name Beriah Because It Went Evil With His House

Naming a child after painful circumstances was common in this culture.

Beriah's name in Hebrew connects to the idea of misfortune.

Ephraim gave his next son a name that marked his family's grief.

Every time someone said Beriah's name, the family's loss was remembered.

👶 Naming often marked real circumstances

💔 Beriah's name points to misfortune

📛 The name preserved the family's grief

📖 A name could carry a whole story

## 🏗️ His Daughter Was Sherah Who Built Bethhoron The Nether And The Upper

Sherah is named here as Ephraim's daughter, not a son.

Built most likely means she directed or funded these towns.

It does not mean she personally laid every stone.

Bethhoron the nether and the upper were two connected hill towns.

Crediting a woman with founding cities was unusual for this kind of record.

🏗️ Sherah was Ephraim's daughter

🏘️ She founded or funded two towns

👩 Crediting a woman here was unusual

📖 Her name stands out in this list

# FirstChronicles 7:25-27
# 🏔️ The Line That Leads To Joshua
---
## ⏳ Rephah Was His Son Also Resheph And Telah His Son And Tahan His Son

This genealogy now moves forward several generations at a steady pace.

None of these names appear anywhere else in the Bible on their own.

Chronicles still records each one carefully, generation by generation.

The next few verses reveal exactly why this line was worth preserving.

⏳ Several generations pass quickly here

🤷 These names appear nowhere else

📜 Chronicles still records each one

📖 The next verses reveal why it matters

## 🎖️ Elishama His Son

Elishama is not just another name in this chain.

Numbers chapter one names an Elishama as leader of the tribe of Ephraim.

That leader helped Moses take the first wilderness census of Israel.

This genealogy quietly connects Ephraim's family tree to a known leader.

🎖️ Elishama led the tribe of Ephraim

📊 He helped Moses take the census

🗺️ This happened during the wilderness years

📖 The genealogy confirms his family line

## 📛 Non His Son

Non is simply an older spelling of the name Nun.

Nun is a name most readers will not recognize on its own.

His son, named next, is far more famous than he is.

The text is quietly building toward a major reveal.

📛 Non is an older spelling of Nun

🤫 His son is far more famous

🔜 The text builds toward a reveal

📖 One more name completes the line

## 🌟 Jehoshuah His Son

Jehoshuah is a fuller form of the name Joshua.

Numbers thirteen records Moses renaming Hoshea to this same name.

That man became Joshua, the leader who succeeded Moses.

This one line finally gives Joshua's own father a full family history.

🌟 Jehoshuah is a fuller form of Joshua

📜 Numbers thirteen records Moses renaming him

🚶 Joshua led Israel into the Promised Land

📖 This line gives Nun a family history

# FirstChronicles 7:28-29
# 🗺️ Ephraim And Manasseh's Land
---
## 🏘️ Their Possessions And Habitations Were Bethel And The Towns Thereof

Possessions and habitations simply means the land each family lived on.

Bethel sits right at the center of this list.

Genesis twenty eight records Jacob's dream of a ladder reaching to heaven there.

That same holy site now sits inside Ephraim's own tribal land.

🏘️ Possessions and habitations means their homeland

🪜 Bethel is where Jacob dreamed of a ladder

🗺️ Genesis twenty eight tells that story

📖 That site now belongs to Ephraim

## 🧭 Eastward Naaran And Westward Gezer

This verse describes Ephraim's territory by its outer edges.

Naaran marked the eastern border, and Gezer marked the western one.

That span stretched across a wide strip of the hill country.

Ephraim's land sat right in the heart of central Canaan.

🧭 Naaran marked the eastern edge

🗺️ Gezer marked the western edge

🌾 The land was fertile hill country

📖 Ephraim held the central heartland

## 🏛️ Shechem Also And The Towns Thereof

Shechem already carries deep history from earlier in Israel's story.

Genesis thirty three records Jacob buying land there and settling his family.

Joshua twenty four records Israel renewing its covenant with God at that place.

This verse confirms Shechem sat inside Ephraim's own tribal territory.

🏛️ Shechem carries deep earlier history

🏕️ Jacob bought land and settled there

📜 Israel renewed its covenant there

📖 It sat inside Ephraim's territory

## 🏙️ By The Borders Of The Children Of Manasseh

Four cities technically belonged to Manasseh's allotted territory here.

Judges chapter one records Manasseh failing to fully drive out earlier residents.

Megiddo is the most famous of these four cities.

It sits on a strategic valley that saw major battles for centuries.

🏙️ Four cities named in Manasseh's border

⚔️ Judges one records incomplete conquest here

🏰 Megiddo is the most famous city

📖 It saw major battles for centuries

## 👨‍👦‍👦 In These Dwelt The Children Of Joseph The Son Of Israel

This closing line ties the territory list back to one man, Joseph.

Ephraim and Manasseh together made up Joseph's inheritance in the land.

Genesis forty eight records Jacob splitting Joseph's blessing into two full tribes.

That decision gave Joseph a double portion among his brothers.

👨‍👦‍👦 The land belonged to Joseph's two sons

➗ Jacob split Joseph's blessing into two tribes

🎁 That gave Joseph a double portion

📖 Genesis forty eight records that choice

# FirstChronicles 7:30-34
# 🫒 Asher's Household
---
## 🫒 The Sons Of Asher Imnah And Isuah And Ishuai And Beriah

Asher was one of two sons born to Zilpah, Leah's handmaid.

Genesis thirty records Zilpah given to Jacob just as Bilhah was to Rachel.

This list of Asher's sons closely matches the one in Genesis forty six.

The same family record was preserved carefully across many generations.

🫒 Asher was Zilpah's son

👩 Zilpah was Leah's handmaid

📜 This list matches Genesis forty six

📖 The record stayed consistent over time

## 👩 And Serah Their Sister

Serah is named here as Asher's daughter, alongside his sons.

She also appears by name in Genesis forty six and Numbers twenty six.

Few women in Israel's tribal genealogies are named across three records like this.

Jewish tradition remembers her as living an unusually long life.

👩 Serah is Asher's daughter

📚 She appears in three separate genealogies

⏳ Tradition remembers her long life

📖 Few women are named this often

## 👶 Malchiel Who Is The Father Of Birzavith

Father of here does not always mean a direct, one generation parent.

It often marks someone as the founder of a family group.

Birzavith may name a family clan rather than a single town.

Genealogies used this phrase as a flexible way to mark leadership.

👶 Father of can mean founder, not parent

🏛️ It often marks a family's namesake

❓ Birzavith may be a clan, not a place

📖 The phrase marked origin and leadership

## 📋 These Are The Children Of Japhlet

This short line simply closes out one branch of the family list.

Chronicles uses phrases like this again and again to organize a long record.

It works like a scribe's bookmark, telling the reader one section just ended.

The very next verse immediately opens a new branch of Asher's family.

📋 This line closes one family branch

🔖 It works like a scribe's bookmark

📚 Chronicles repeats this pattern often

📖 A new branch begins right after

# FirstChronicles 7:35-40
# ⚔️ Asher's Army Total
---
## 👬 The Sons Of His Brother Helem

Helem is very likely another name for Hotham, named two verses earlier.

The Bible sometimes uses more than one name for the same person.

This kind of small variation shows up across this chapter.

Careful readers expect these shifts instead of assuming a mistake.

👬 Helem is likely Hotham's other name

🔀 The Bible often uses two names

✅ This is a variation, not a mistake

📖 This pattern repeats in this chapter

## 👤 Jephunneh

This Jephunneh belongs to the tribe of Asher, not Judah.

A far more famous Jephunneh fathered Caleb, one of the twelve spies.

That Caleb came from a different family, connected to the Kenizzites.

Sharing a name did not mean sharing a family line in ancient Israel.

👤 This Jephunneh is from Asher's tribe

🕵️ A different Jephunneh fathered Caleb

🌐 Caleb's family came from elsewhere

📖 Same name did not mean same family

## 👑 Choice And Mighty Men Of Valour Chief Of The Princes

Choice here means selected or elite, not merely acceptable.

These men stood above the ordinary fighting men already counted.

Chief of the princes marks them as leaders among Asher's family heads.

Every tribe in this chapter had its own layer of top ranking men.

👑 Choice means selected or elite

🎖️ These men led among Asher's family

📶 Every tribe had a top ranking layer

📖 Rank mattered as much as numbers

## 🧮 Apt To The War And To Battle Was Twenty And Six Thousand Men

Twenty six thousand men closes out Asher's own count.

This chapter alone records over one hundred seventy thousand fighting men.

That total covers only three tribes, Issachar, Benjamin, and Asher.

This whole chapter works like a military census, not just a family tree.

Every ordinary family still mattered enough to be counted by name.

🧮 Twenty six thousand closes Asher's count

➕ Three tribes topped one hundred seventy thousand

📊 This chapter reads like a census

📖 Every family was counted by name
`.trim();

export const FIRST_CHRONICLES_SEVEN_PERSONAL_SECTIONS = parseFirstChroniclesSevenRawNotes(FIRST_CHRONICLES_SEVEN_RAW_NOTES);
