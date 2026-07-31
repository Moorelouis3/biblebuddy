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
# 🔢 A New Census After The Plague
---
## 🔢 It Came To Pass After The Plague
This census happens immediately after the deadly plague from chapter 25, which killed 24,000 people over Israel's sin at Baalpeor. God orders a fresh headcount right after this disaster, not before it.

This is the second national census in the book of Numbers. The first one, back in chapter 1, counted the generation that left Egypt. Almost 38 years have passed since then, and that whole generation has died in the wilderness except for two men.

🔢 The second census in the book of Numbers, about 38 years after the first

⚰️ Comes right after the 24,000 deaths in chapter 25

🔑 A fresh count for a mostly new generation

## 👨‍👦 Eleazar The Son Of Aaron The Priest
Aaron himself died back in Numbers 20, and his son Eleazar took over as high priest. This is one of the first times Eleazar is shown leading alongside Moses instead of Aaron.

👨‍👦 Aaron already died in Numbers 20; Eleazar is the new high priest

🤝 Moses and Eleazar now lead this count together

🔑 A quiet sign that the old generation's leaders are passing too

## 🏕️ The Plains Of Moab By Jordan Near Jericho
This location is Israel's final camp before crossing into the Promised Land. It sits east of the Jordan River, directly across from the city of Jericho, which will be the first city Israel conquers in the book of Joshua.

🏕️ Israel's last stop before entering Canaan

🌊 East of the Jordan River, facing Jericho

🔑 Everything from here forward is preparation for the conquest

## ⚔️ From Twenty Years Old And Upward, All That Are Able To Go To War
This census only counts men age twenty and up who can fight, the exact same standard used in chapter 1. It's a military census for the coming conquest of Canaan, not a count of the whole population.

⚔️ Same age threshold as the first census in chapter 1

🪖 A count of fighting men, not total population

🔑 This army will soon need to actually take the land by force

## 📋 Take The Sum Of All The Congregation
This command is worded almost exactly like the opening of chapter 1's census, which was no accident. The book of Numbers is bookended by two very similar counts, one at the start of the wilderness wandering and one at the very end of it, right before entering Canaan.

📋 Nearly identical wording to the chapter 1 census command

📖 Numbers opens and nearly closes with a census

🔑 A deliberate literary bookend for the whole wilderness journey

# Numbers 26:5-11
# ⚰️ Reuben, And The Family Line Of Korah
---
## 👑 Reuben, The Eldest Son Of Israel
Reuben was Jacob's actual firstborn son, but he lost the special rights of the firstborn generations earlier for sleeping with his father's concubine, confirmed in Genesis 49:3-4. His tribe is still listed first here out of respect for birth order, even without the extra blessing.

👑 Reuben was Jacob's literal firstborn son

📉 He lost the firstborn blessing back in Genesis 49:3-4

🔑 Still listed first here, honoring birth order alone

## 🏘️ Hanoch, Pallu, Hezron, And Carmi
These are Reuben's four sons, each becoming the head of his own family clan (the Hanochites, Palluites, Hezronites, and Carmites). Listing clans by founder's name was the standard way Israel organized and tracked its tribes.

🏘️ Four sons, four family clans within the tribe of Reuben

📛 Each clan is named directly after its founding son

🔑 This same name-a-clan pattern repeats for every tribe in this chapter

## 🔢 Reubenites Numbered Forty And Three Thousand, Seven Hundred And Thirty
Reuben's count dropped slightly from 46,500 in the first census to 43,730 here, a loss of about 2,770 men over 38 years. Small compared to some of the tribe swings later in this chapter.

🔢 43,730 now, down from 46,500 in Numbers 1

📊 A modest drop compared to other tribes in this same census

🔑 Sets the pattern of every tribe's number changing over the wilderness years

## 👶 The Sons Of Pallu; Eliab
The text zooms in from Pallu's whole clan down to one specific family, Eliab's, because that family is about to be connected to one of the most infamous rebellions in the wilderness.

👶 A single name bridges into the next, more famous story

🔍 The genealogy narrows in on purpose here

🔑 Setting up the mention of Dathan and Abiram next

## ⚡ Nemuel, And Dathan, And Abiram... Famous In The Congregation
Dathan and Abiram are Eliab's sons, and "famous" here is used sarcastically. They were infamous, not celebrated, for leading a rebellion against Moses and Aaron alongside Korah back in Numbers 16.

⚡ Dathan and Abiram were Eliab's sons

🎭 "Famous" is used ironically here, not as a compliment

🔑 This is the same rebellion from Numbers 16, mentioned again a full ten chapters later

## 🌍 The Earth Opened Her Mouth, And Swallowed Them Up
This callback describes exactly what happened in Numbers 16:31-33 when the ground split open and swallowed Korah, Dathan, Abiram, and their households alive, as a direct judgment from God for their rebellion.

🌍 A direct callback to the earthquake-like judgment in Numbers 16

⚰️ Swallowed alive along with their households

🔑 Still remembered by name nearly forty years later

## 🔥 The Fire Devoured Two Hundred And Fifty Men, And They Became A Sign
Two hundred fifty men who joined Korah's rebellion by offering incense were separately killed by fire from the LORD in Numbers 16:35. "A sign" means a lasting warning marker, meant to be remembered by later generations as proof of what happens when people challenge God's chosen leaders.

🔥 250 men killed by fire, a separate judgment from the earth swallowing others

⚠️ "A sign" means a permanent warning for future generations

🔑 Numbers 16:38 says their firepans were hammered into plates covering the altar as a lasting reminder

## 🙏 Notwithstanding The Children Of Korah Died Not
This is a striking exception: Korah himself died, but his own sons survived. The sons of Korah later become a respected family of Levitical singers and gatekeepers, and their name appears in the titles of eleven different Psalms, like Psalm 42 and Psalm 84.

🙏 Korah died, but his sons lived on

🎵 The "sons of Korah" later wrote or are credited in eleven Psalms

🔑 Judgment fell on Korah personally, not automatically on his whole family line

# Numbers 26:12-14
# 📉 Simeon's Steep Decline
---
## 🏘️ Nemuel, Jamin, Jachin, Zerah, And Shaul
These five sons of Simeon each head their own clan, the same pattern used for Reuben. Two of Simeon's original six sons listed back in Genesis 46:10 don't appear in this list anymore, meaning those family lines had already died out by this point.

🏘️ Five family clans, matching the same naming pattern as Reuben

📉 Two of Simeon's original sons from Genesis 46:10 are missing here

🔑 Some family lines simply didn't survive to this census

## 📉 Twenty And Two Thousand And Two Hundred
Simeon's count collapses from 59,300 in the first census down to just 22,200 here, a loss of over 37,000 men, more than half the tribe. This is by far the steepest drop of any tribe in this entire chapter.

📉 Down from 59,300 to 22,200 -- over half the tribe gone

📊 The single largest percentage drop of any tribe in this census

🔑 A number this dramatic almost never happens by natural causes alone

## 🎯 Simeon's Collapse And The Plague At Baalpeor
The text doesn't explain this drop directly, but the timing makes the connection obvious: this census comes right after 24,000 died in the Baalpeor plague in chapter 25, and the man who led that specific sin, Zimri, was "a prince of a chief house among the Simeonites" (Numbers 25:14).

🎯 Simeon's own prince, Zimri, led the sin in chapter 25

⚖️ The tribe most tied to that sin suffers the steepest loss here

🔑 A quiet, numbers-only consequence the text lets the reader connect

# Numbers 26:15-18
# 🏘️ Gad's Family And Land To Come
---
## 🏘️ Zephon, Haggi, Shuni, Ozni, Eri, Arod, And Areli
Gad's seven sons each become their own clan, the largest number of family divisions listed for any tribe so far in this chapter.

🏘️ Seven separate clans, more than any tribe listed before it

📛 Same founder-to-clan naming pattern continues

🔑 A large, spread-out tribe by family structure

## 📉 Forty Thousand And Five Hundred
Gad's number drops from 45,650 in the first census to 40,500 here, a loss of about 5,150 men, a real decline but nowhere near Simeon's collapse.

📉 Down from 45,650 to 40,500

📊 A meaningful loss, but modest next to Simeon's

🔑 Continues the pattern of shrinking tribes early in the chapter

## 📛 Gad's Name Means "Fortune" Or "A Troop"
When Gad was born to Leah's servant Zilpah, Leah declared "a troop cometh," giving him this name in Genesis 30:11. Tribes were often remembered by names picked in a specific emotional moment generations earlier.

📛 Gad's name comes from Leah's exclamation in Genesis 30:11

🎭 Names in Genesis were often given from a parent's immediate emotion

🔑 A small linguistic detail connecting this census back to Genesis

## 🗺️ A Tribe Bound For The Land East Of The Jordan
Gad will soon ask to settle on the east side of the Jordan River instead of crossing into Canaan proper, a request granted in Numbers 32 because the land there was especially good for their large herds.

🗺️ Gad later requests land outside Canaan itself, in Numbers 32

🐑 The east-of-Jordan land suited their livestock well

🔑 This same tribe's territory choice comes up again just six chapters later

# Numbers 26:19-22
# 👑 Judah, And The Line To David
---
## ⚰️ The Sons Of Judah Were Er And Onan; And Er And Onan Died In The Land Of Canaan
This is a direct callback to Genesis 38, where Er was struck dead by God for wickedness, and his brother Onan died for refusing to fulfill his duty to give Er's widow, Tamar, children. Both deaths happened generations earlier, back in Canaan, long before Israel ever went to Egypt.

⚰️ A callback to Genesis 38's account of Er and Onan's deaths

📖 Both died in Canaan, before Israel's time in Egypt even began

🔑 Neither name gets its own family clan here since neither left descendants

## 👨‍👩‍👦 Shelah, Pharez, And Zerah
These are Judah's surviving sons who do carry on family lines. Pharez and Zerah were both born through Tamar in the unusual story where Judah's own daughter-in-law tricked him into fathering them after Er and Onan's deaths.

👨‍👩‍👦 Three surviving sons, each founding their own clan

👩 Pharez and Zerah were both born to Tamar, not Judah's first wife

🔑 The whole line traces back through Genesis 38's difficult story

## 👑 Pharez's Sons: Hezron And Hamul
Pharez's line matters enormously beyond this chapter -- Hezron becomes an ancestor in the direct genealogical line leading to King David and, ultimately, to Jesus, traced in both Ruth 4:18-22 and Matthew 1:3.

👑 Hezron is a direct ancestor of King David

📜 Traced in both Ruth 4 and Matthew 1's genealogy of Jesus

🔑 A quiet name here carries huge weight later in Scripture

## 🔢 Threescore And Sixteen Thousand And Five Hundred
Judah's count rises from 74,600 to 76,500, making it the largest tribe in this entire census, just as it was the largest in the first census too. Judah stays the biggest tribe both times.

🔢 76,500, up slightly from 74,600 in Numbers 1

🥇 The largest tribe in both censuses

🔑 Judah's size matches its leading role among the tribes

# Numbers 26:23-27
# 📈 Issachar And Zebulun Grow
---
## 🏘️ Tola, Pua, Jashub, And Shimron
Issachar's four sons each found a clan. Tola's name later reappears in Judges 10:1, where a judge named Tola from this same tribe rises up to lead Israel generations later.

🏘️ Four family clans within Issachar

⚖️ A later judge named Tola, in Judges 10:1, shares this ancestor's name

🔑 Family names often echo forward into later Israelite history

## 📛 Issachar's Name Means "He Brings A Reward" Or "Hire"
Leah named Issachar this after trading her son Reuben's mandrakes to her sister Rachel in exchange for a night with Jacob, in Genesis 30:14-18, viewing the resulting pregnancy as her "reward" for that trade.

📛 Named after the mandrakes-for-a-night trade in Genesis 30:14-18

🌱 Mandrakes were folk-believed to help with fertility in the ancient world

🔑 An unusual and very human origin story behind a tribal name

## 📈 Threescore And Four Thousand And Three Hundred
Issachar's count grows from 54,400 to 64,300, one of the larger increases in this census, a gain of nearly 10,000 men over the wilderness years.

📈 Up from 54,400 to 64,300, a gain of almost 10,000

📊 One of the largest tribal increases in this whole chapter

🔑 Not every tribe shrank during the wilderness years; several grew

## 🏘️ Sered, Elon, And Jahleel
Zebulun's three sons each become a family clan. Zebulun was Leah's sixth and final son, born hoping Jacob would finally honor her for bearing him so many sons, according to Genesis 30:19-20.

🏘️ Three family clans within Zebulun

👩 Zebulun was Leah's sixth and final son (Genesis 30:19-20)

🔑 One more tribal name rooted in the rivalry between Jacob's wives

## 📈 Threescore Thousand And Five Hundred
Zebulun's number rises from 57,400 to 60,500, a modest but real increase, continuing the mixed pattern of growth and decline across the twelve tribes in this second census.

📈 Up slightly from 57,400 to 60,500

📊 A modest gain, unlike Issachar's larger jump

🔑 The twelve tribes show no single overall trend; each moved differently

# Numbers 26:28-34
# 👧 Manasseh, And Zelophehad's Daughters
---
## 👨‍👦 The Sons Of Joseph Were Manasseh And Ephraim
Even though Joseph himself never became a tribe of his own, his two sons Manasseh and Ephraim were formally adopted by Jacob as full tribes back in Genesis 48, each getting their own land inheritance, effectively giving Joseph a double portion among the twelve tribes.

👨‍👦 Joseph has no tribe of his own; his sons carry his inheritance instead

📜 Jacob formally adopted them as full tribes in Genesis 48

🔑 This is why the land is split among twelve tribes even though Levi gets none of it

## ⚔️ Machir Begat Gilead
Machir was Manasseh's son, and his descendant Gilead gives his name to the region east of the Jordan that Israel has just conquered from kings Sihon and Og in Numbers 21. Half of Manasseh's tribe will settle in this very land named after their own ancestor.

⚔️ Gilead is both a person's name here and a region east of the Jordan

🗺️ Half of Manasseh later settles in the Gilead region itself

🔑 A family name becomes a place name that still appears throughout the Old Testament

## 🏘️ Jeezer, Helek, Asriel, Shechem, Shemida, And Hepher
These six grandsons of Machir each head their own family clan within Manasseh, making Manasseh's family tree one of the most detailed listed in this whole chapter.

🏘️ Six clans, one of the largest family breakdowns in this census

📛 One more generation down than most of the other tribes list

🔑 Sets up the very next verse's unusual case

## 👧 Zelophehad... Had No Sons, But Daughters
Zelophehad died in the wilderness for his own sin, not as part of any group rebellion, according to Numbers 27:3, leaving no sons at all to inherit his portion of land, a real problem under a system where land normally passed only through sons.

👧 Zelophehad left no sons, only five daughters

⚖️ Under the normal system, his family line would lose its land inheritance

🔑 Sets up a major legal question the very next chapter has to resolve

## 📛 Mahlah, Noah, Hoglah, Milcah, And Tirzah
All five daughters are named individually here, unusual in a chapter almost entirely made up of male family lines. In Numbers 27, they will petition Moses directly and win the right to inherit their father's land, permanently changing Israelite inheritance law for any family without sons.

📛 Five daughters named individually, unusual for this chapter

⚖️ Numbers 27 shows them successfully changing inheritance law

🔑 A quiet mention here sets up one of the most significant legal moments for women in the Torah

## 📈 Fifty And Two Thousand And Seven Hundred
Manasseh's count explodes from just 32,200 in the first census to 52,700 here, an increase of over 20,000 men, by far the largest percentage growth of any tribe in this entire chapter.

📈 More than 20,000 men gained, the biggest jump in the whole census

📊 Manasseh goes from the smallest tribe in Numbers 1 to a mid-sized tribe here

🔑 A striking reversal from being the runt of the twelve tribes

# Numbers 26:35-37
# 🏘️ Ephraim's Family
---
## 🏘️ Shuthelah, Becher, And Tahan
Ephraim's three sons each head a clan. Ephraim was Joseph's younger son, yet Jacob deliberately blessed him ahead of his older brother Manasseh in Genesis 48:14-20, crossing his hands on purpose.

🏘️ Three family clans within Ephraim

🤚 A callback to Jacob's crossed-hands blessing in Genesis 48

🔑 The younger brother blessed ahead of the older, again a repeated pattern in Genesis

## 📛 Ephraim's Name Means "Fruitful"
Joseph named his second son Ephraim, saying "God hath caused me to be fruitful in the land of my affliction" in Genesis 41:52, a name of gratitude chosen while Joseph was still a slave-turned-official in Egypt, long before his brothers ever came looking for grain.

📛 Named for God's blessing even during Joseph's hardship in Egypt

🌾 Genesis 41:52 records Joseph's own words behind the name

🔑 A name of gratitude chosen years before Joseph's story with his brothers resolved

## 📉 Thirty And Two Thousand And Five Hundred
Ephraim's number actually drops from 40,500 to 32,500, a loss of 8,000 men, a surprising decline given that Ephraim will go on to become one of the most powerful and dominant tribes in Israel's later history.

📉 Down from 40,500 to 32,500

📊 A real decline despite Ephraim's later prominence

🔑 Joshua himself, Israel's next leader, comes from this shrinking tribe

# Numbers 26:38-41
# 🏘️ Benjamin's Family
---
## 🏘️ Bela, Ashbel, Ahiram, Shupham, And Hupham
Benjamin's five sons each found a clan. Benjamin was Jacob's youngest and most beloved son after Joseph, born to Rachel as she died in childbirth on the way to Bethlehem, according to Genesis 35:16-18.

🏘️ Five family clans within Benjamin

👶 Benjamin was Rachel's second son, born as she died (Genesis 35:16-18)

🔑 The youngest of all twelve tribal ancestors

## 📛 Benjamin's Name Means "Son Of The Right Hand"
Rachel, dying in childbirth, named him Ben-oni, "son of my sorrow," but Jacob renamed him Benjamin right afterward, according to Genesis 35:18, turning a name of grief into one of honor and strength.

📛 Rachel named him "son of my sorrow"; Jacob renamed him "son of the right hand"

💔 A name change from grief to honor, given in the same moment

🔑 The only tribal name deliberately changed by a parent right at birth

## 📈 Forty And Five Thousand And Six Hundred
Benjamin's count climbs from 35,400 to 45,600, a gain of over 10,000 men, one of the largest increases in the whole chapter for what had been one of the smallest tribes.

📈 Up from 35,400 to 45,600, a gain of over 10,000

📊 A major turnaround for a previously small tribe

🔑 Benjamin later produces Israel's first king, Saul, in 1 Samuel 9

# Numbers 26:42-47
# 🏘️ Dan And Asher's Families
---
## 🏘️ Shuham, The Only Son Of Dan
Unlike every other tribe listed, Dan traces back to just one son and a single family clan, the Shuhamites, even though Dan will go on to become one of the larger tribes numerically.

🏘️ Just one family clan, unlike every other tribe in this chapter

📛 Dan was one of the sons of Bilhah, Rachel's handmaid (Genesis 30:5-6)

🔑 A small family tree doesn't mean a small population

## 📈 Threescore And Four Thousand And Four Hundred
Dan's count rises slightly from 62,700 to 64,400, keeping Dan as one of the largest tribes in Israel in both censuses, despite having only one recorded family clan.

📈 Up slightly from 62,700 to 64,400

📊 One of the largest tribes despite the smallest family tree listed

🔑 Population size and number of clans don't line up evenly across tribes

## 🏘️ Jimna, Jesui, Beriah, Heber, And Malchiel
Asher's family tree runs two generations deep, with Beriah's own sons Heber and Malchiel listed by name, similar to the detail given for Manasseh's line earlier in the chapter.

🏘️ Five clans across two generations within Asher

📛 One of the more detailed family trees in this chapter

🔑 Sets up the one surprising detail in the very next verse

## 👧 The Name Of The Daughter Of Asher Was Sarah
Sarah is the only daughter named individually across all twelve tribes' family lists in this chapter, apart from Zelophehad's five daughters in Manasseh's section. Naming her at all, without explanation, suggests she held some kind of independent significance or memory worth preserving.

👧 The only individually named daughter outside Zelophehad's five

📛 Same name as Abraham's wife Sarah, generations earlier

🔑 The text doesn't explain why, but chooses to remember her by name anyway

## 📛 Dan's Name Means "He Judged," Asher's Means "Happy"
Rachel named Dan saying "God hath judged me" after finally having a son through her servant Bilhah, in Genesis 30:6, and Leah named Asher "happy" saying "the daughters will call me blessed" in Genesis 30:13 through her servant Zilpah.

📛 Dan: "he judged," tied to Rachel's long wait for a son

📛 Asher: "happy," tied to Leah's declaration of blessing

🔑 Both names come from the same servant-wife arrangement Jacob's two wives used

## 📈 Fifty And Three Thousand And Four Hundred
Asher's number grows from 41,500 to 53,400, a solid increase of almost 12,000 men over the wilderness years.

📈 Up from 41,500 to 53,400

📊 Another tribe that grew significantly during the wandering years

🔑 Continues the mixed pattern of growth and loss scattered unevenly across the twelve tribes

# Numbers 26:48-51
# 🏘️ Naphtali, And The Grand Total
---
## 🏘️ Jahzeel, Guni, Jezer, And Shillem
Naphtali's four sons each found a clan. Naphtali was Dan's full brother, both born to Bilhah, Rachel's handmaid, making these two tribes closely related by blood even though their numbers move in opposite directions in this census.

🏘️ Four family clans within Naphtali

👨‍👦 Naphtali and Dan were full brothers, both sons of Bilhah

🔑 Related tribes don't always share the same fortunes

## 📛 Naphtali's Name Means "My Wrestling"
Rachel named him this, saying "with great wrestlings have I wrestled with my sister, and I have prevailed," in Genesis 30:8, describing her long rivalry with Leah over children through their servants.

📛 Named for Rachel's rivalry with her sister Leah, per Genesis 30:8

👭 Reflects the tense competition between Jacob's two wives for children

🔑 One more tribal name rooted in Genesis's complicated family story

## 📉 Forty And Five Thousand And Four Hundred
Naphtali's count falls from 53,400 to 45,400, a loss of 8,000 men, one of the sharper declines in this census outside of Simeon's collapse.

📉 Down from 53,400 to 45,400

📊 One of the larger drops in this chapter, though nowhere near Simeon's

🔑 Closes out the tribe-by-tribe list on a declining note

## 🔢 Six Hundred Thousand And A Thousand Seven Hundred And Thirty
The grand total across all twelve tribes is 601,730 fighting men, remarkably close to the 603,550 counted almost 38 years earlier in chapter 1, a difference of only about 1,800 despite huge individual tribe swings in both directions.

🔢 601,730 total, almost identical to the 603,550 from Numbers 1

⚖️ Individual tribes shifted by tens of thousands, but the overall total barely moved

🔑 A whole generation died in the wilderness, yet the nation's total size held remarkably steady

# Numbers 26:52-56
# ⚖️ Dividing The Land By Lot
---
## ⚖️ To These The Land Shall Be Divided For An Inheritance
This is the whole reason this census exists: God ties Canaan's land distribution directly to the people just counted in this chapter, the new generation about to cross the Jordan, not their parents who died in the wilderness.

⚖️ Land inheritance is tied directly to this specific census

👥 Only this new generation will actually receive land in Canaan

🔑 Explains why this exact headcount matters so much right now

## 📏 To Many Thou Shalt Give The More Inheritance, And To Few The Less
Larger tribes get proportionally more land, and smaller tribes get proportionally less, based directly on the population numbers just recorded. This is a fairness principle: land per tribe scales with how many people actually need to live on it.

📏 Bigger tribes receive proportionally more land

⚖️ A fairness principle based directly on population size

🔑 Directly explains why the exact numbers in this chapter mattered enough to record

## 🎲 The Land Shall Be Divided By Lot
"Lot" means a method like drawing straws or casting marked stones, used to make the final decision feel entirely in God's hands rather than a human choice open to favoritism or argument, similar to Proverbs 16:33's "the lot is cast into the lap, but the whole disposing thereof is of the LORD."

🎲 "Lot" means a random, God-directed method of decision-making

🙏 Removes any accusation of human favoritism in who gets what land

🔑 Combines both fairness by population and impartiality by lot in one system

## 📜 According To The Names Of The Tribes Of Their Fathers They Shall Inherit
Land inheritance runs strictly through tribal and family lines traced back to each of Jacob's original sons, tying every future Israelite's home address back to this specific ancestor list.

📜 Land is tied permanently to family and tribal identity

🏡 Every family's future home connects back to this ancestor list

🔑 This chapter's genealogies aren't just record-keeping; they're literal property deeds

# Numbers 26:57-62
# 🛕 The Levites, Counted Separately
---
## 👨‍👦 Gershon, Kohath, And Merari
These are Levi's three original sons, each already established as the head of one of the three major Levite divisions back in Numbers 3-4, each responsible for carrying different parts of the tabernacle.

👨‍👦 Levi's three sons, matching the divisions from Numbers 3-4

🎒 Each division carried different tabernacle furniture and materials

🔑 A structure already familiar from earlier in the book

## 🏘️ Libnites, Hebronites, Mahlites, Mushites, And Korathites
These five clans all descend from Kohath specifically, the middle son of Levi, and notably, the Korathites are named right alongside the others despite their own ancestor Korah's rebellion and death in Numbers 16.

🏘️ Five Kohathite clans, including the Korathites

⚡ Named without shame despite Korah's own rebellion

🔑 Echoes verse 11's earlier point: judgment fell on Korah, not automatically his whole family

## 👨‍👩‍👧‍👦 Kohath Begat Amram... Amram's Wife Was Jochebed
This names Moses and Aaron's actual parents. Jochebed is specifically called "the daughter of Levi," born while the family was already living in Egypt, making her Amram's aunt as well as his wife, a marriage arrangement not unusual in this early period before the Law later restricted such unions in Leviticus 18:12.

👨‍👩‍👧‍👦 Jochebed was Levi's own daughter, Amram's aunt and wife

🍼 Born to Levi while the family was already settled in Egypt

🔑 This exact marriage type gets forbidden later, once the Law is given at Sinai

## 👶 She Bare Unto Amram Aaron And Moses, And Miriam Their Sister
This confirms the full sibling set: Aaron, Moses, and Miriam were all children of the same parents, Amram and Jochebed. Miriam is the same sister who watched over baby Moses in the basket on the Nile in Exodus 2:4-8 and later led Israel's women in song after the Red Sea crossing in Exodus 15:20-21.

👶 Aaron, Moses, and Miriam were all full siblings

🧺 Miriam is the same sister from Exodus 2's basket-in-the-Nile story

🔑 One family produced Israel's lawgiver, first high priest, and first named prophetess

## ⚰️ Nadab And Abihu Died, When They Offered Strange Fire
This is a callback to Leviticus 10:1-2, where Aaron's two oldest sons offered unauthorized incense in a way God hadn't commanded, and were struck dead instantly by fire from the LORD, meaning the priesthood continued only through the two younger brothers, Eleazar and Ithamar.

⚰️ A callback to Leviticus 10's account of unauthorized worship

🔥 Struck dead by fire from the LORD immediately

🔑 This is exactly why Eleazar, not Nadab or Abihu, leads this census alongside Moses

## 🔢 Twenty And Three Thousand, All Males From A Month Old And Upward
The Levites are counted completely differently from the other twelve tribes: every male from just one month old, not twenty years old, because Levites weren't being counted for war, they were counted for tabernacle service instead.

🔢 23,000 Levite males, counted from one month old, not twenty years

🛕 Counted for tabernacle duty, not military service

🔑 A totally different purpose explains the totally different counting method

## 🚫 Not Numbered Among The Children Of Israel, Because There Was No Inheritance Given Them
The Levites are deliberately left out of the land-inheritance count from verses 52-56, because their "inheritance" was different by design; they would receive scattered cities and the tithe instead of one continuous tribal territory, explained further in Numbers 35 and Joshua 21.

🚫 Left out of the land-by-population system on purpose

🏙️ Levites received scattered cities and the tithe instead of territory

🔑 A different calling meant a completely different kind of provision

# Numbers 26:63-65
# 🌟 Only Caleb And Joshua Remain
---
## 📜 These Are They That Were Numbered By Moses And Eleazar The Priest
The chapter closes by naming the exact two men responsible for this count, matching how it opened in verse 1, a deliberate bookend confirming this whole census was conducted under proper, recognized leadership.

📜 Matches the naming in verse 1, closing the chapter's frame

✅ Confirms the count's legitimacy under recognized leadership

🔑 A formal close to a formal, official document

## ⚰️ Not A Man Of Them Whom Moses And Aaron... Numbered In The Wilderness Of Sinai
This confirms that literally none of the men counted in the first census, Numbers 1, taken at Sinai, are still alive for this second census, roughly 38 years later; the entire generation of adults who left Egypt has died out completely.

⚰️ Every single man from the first census in Numbers 1 has now died

📆 About 38 years separate the two censuses

🔑 A complete generational turnover, exactly as God had promised

## ⚖️ For The LORD Had Said, They Shall Surely Die In The Wilderness
This fulfills God's judgment from Numbers 14:28-35, given after Israel refused to enter Canaan out of fear following the twelve spies' report. God swore that whole unbelieving generation would die in the wilderness instead of ever reaching the Promised Land.

⚖️ A direct fulfillment of the judgment from Numbers 14:28-35

😨 That judgment followed Israel's fear after the spies' report

🔑 Decades later, the sentence has now been completely carried out

## 🌟 Save Caleb The Son Of Jephunneh, And Joshua The Son Of Nun
These are the two named exceptions, the only two adults from the entire first census still alive. Both were among the twelve spies sent into Canaan back in Numbers 13, and both gave a faithful, hopeful report while the other ten spread fear. Their faith back then is exactly why they alone survive to see the promise fulfilled now.

🌟 The only two survivors from the entire first generation

🕵️ Both were faithful spies among the twelve sent in Numbers 13

🔑 Faith kept then is rewarded with survival now, decades later
`;

export const NUMBERS_TWENTY_SIX_PERSONAL_SECTIONS = parseNumbersTwentySixRawNotes(NUMBERS_TWENTY_SIX_RAW_NOTES);
