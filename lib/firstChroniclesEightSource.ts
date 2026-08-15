export type FirstChroniclesEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesEightRawNotes(rawText: string): FirstChroniclesEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 8:${startVerse}` : `1 Chronicles 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 8 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_EIGHT_RAW_NOTES = `# FirstChronicles 8:1-5
# 📜 Benjamin's Family Record
---
## 👶 Now Benjamin Begat Bela His Firstborn

Benjamin was Jacob's youngest son, born through Rachel.

Rachel died giving birth to him, as Genesis thirty five records.

This chapter opens a second detailed record of Benjamin's family.

First Chronicles seven already gave Benjamin's line for a military count.

This one builds toward a much bigger name, King Saul himself.

👶 Benjamin was Jacob's youngest son

😢 Rachel died giving birth to him

📜 This is Benjamin's second family record

📖 It builds toward King Saul

## 🔢 Nohah The Fourth And Rapha The Fifth

Five sons complete Benjamin's opening list here.

Bela, Ashbel, Aharah, Nohah, and Rapha make up the full count.

Genesis forty six lists Benjamin's sons with some different names.

Chronicles sometimes named grandsons where Genesis named only sons.

🔢 Five sons complete this opening list

📚 Genesis forty six names them differently

👨‍👩‍👧‍👦 Chronicles sometimes lists grandsons instead

📖 Both records track the same family

## 👦 The Sons Of Bela

Addar, Gera, and Abihud belonged to the next generation after Benjamin himself.

They begin a longer list that continues into the next verse.

Abishua and Naaman and Ahoah are named right after them.

Each name likely marked the head of its own smaller family group.

👦 These are Bela's own sons

📋 The list continues into the next verse

🏘️ Each name led a smaller family

📖 Bela's branch was already large

## 🔁 And Gera And Shephuphan And Huram

Gera is not a new name in this list.

It already appeared once earlier in this same section.

Repeated names like this show up often in these old family records.

It usually points to two different men sharing one common name.

🔁 Gera's name appears twice here

👥 Likely two different men, same name

📜 Repeated names were common back then

📖 Careful readers expect this pattern

# FirstChronicles 8:6-7
# 🚶 Ehud's Family Moves On
---
## 🏘️ The Inhabitants Of Geba

Geba was a town inside Benjamin's own tribal land.

Heads of the fathers means the leading men of each family branch.

This title marks leadership, not simply the oldest man alive.

These men led the Benjamite families living in and around Geba.

🏘️ Geba sat inside Benjamin's territory

👑 Heads of the fathers means family leaders

🧓 It marks leadership, not just age

📖 These men led Geba's families

## 🚚 And They Removed Them To Manahath

Removed here means these families were forced to relocate.

Manahath was another town, likely not far from Geba.

Benjamin's history includes a terrible civil war in the book of Judges.

That war very nearly wiped the whole tribe out.

A move like this may reflect the tribe rebuilding and resettling later.

🚚 Removed means forced relocation

⚔️ Judges records a civil war against Benjamin

💔 The tribe nearly disappeared then

📖 This may show Benjamin resettling later

## 👶 He Removed Them And Begat Uzza And Ahihud

Naaman, Ahiah, and Gera were among the families forced to relocate.

Two new sons then appear, Uzza and Ahihud.

The family kept growing during the very same move.

Chronicles tracks both movement and birth in the very same verse.

🚶 Naaman, Ahiah, and Gera relocated

👶 Uzza and Ahihud are new names

🌱 The family grew during the move

📖 Chronicles records both in one line

# FirstChronicles 8:8-11
# 🌍 Shaharaim's Family In Moab
---
## 🗺️ In The Country Of Moab

Moab was a nation east of the Dead Sea, often at odds with Israel.

Shaharaim begat children there after he had sent his first two wives away.

Sent away means he divorced them.

A Benjamite family living outside Israel's own borders was unusual.

🗺️ Moab sat east of the Dead Sea

💔 Sent away means he divorced them

🌍 He had children while living there

📖 This shows Benjamite ties beyond Israel

## 👩 Hushim And Baara Were His Wives

Hushim and Baara are named as the wives Shaharaim sent away.

Naming both wives directly is a rare level of detail.

Most genealogies only name the sons, not always the mothers.

This small detail hints at a real family story behind it.

👩 Hushim and Baara were his first wives

📝 Naming wives directly is unusual here

👶 Most lists skip naming mothers

📖 A real story sits behind this line

## 💍 Of Hodesh His Wife

Hodesh was a third wife, married sometime after the first two left.

Jobab, Zibia, Mesha, and Malcham were the sons she bore him.

Jeuz, Shachia, and Mirma follow right after in the very next verse.

Shaharaim's family kept expanding through this new marriage.

💍 Hodesh was his third wife

👶 She bore him several sons

📈 The family kept growing

📖 A new marriage restarted the line

## 📋 These Were His Sons Heads Of The Fathers

Heads of the fathers means these sons became leaders of their own family groups.

It is not simply a label for the oldest man alive.

Chronicles uses this exact closing phrase again and again.

It works like a stamp marking one family record as finished.

📋 This line closes Hodesh's branch

👑 Heads of the fathers means future leaders

🔖 Chronicles repeats this closing phrase

📖 It marks one record as complete

## 👶 Of Hushim He Begat Abitub And Elpaal

Hushim was one of the two wives Shaharaim had already sent away.

Even so, sons through her are still recorded here by name.

Elpaal becomes an important name in the very next section.

Being divorced did not erase a mother's place in the family record.

👩 Hushim was one of the divorced wives

👶 Her sons are still recorded

⭐ Elpaal becomes important next

📖 Divorce did not erase her record

# FirstChronicles 8:12-13
# 🏘️ Elpaal's Sons Build Towns
---
## 🏗️ Who Built Ono And Lod

Ono and Lod were real towns on Israel's coastal plain.

Built most likely means Shamed founded or rebuilt these towns.

Lod later appears in the New Testament under the Greek name Lydda.

Acts nine records Peter healing a man there.

🏗️ Shamed founded or rebuilt these towns

🗺️ Ono and Lod sat on the coastal plain

✝️ Lod later became Lydda in Acts

📖 Peter healed a man there

## 🏘️ With The Towns Thereof

This short phrase means the smaller villages surrounding Ono and Lod.

A town in this era usually controlled nearby farmland and hamlets.

Founding one town often meant founding a small cluster of settlements.

Elpaal's family controlled real territory, not just two isolated cities.

🏘️ Towns thereof means the surrounding villages

🌾 Towns controlled nearby farmland too

📍 Founding one town meant founding several

📖 Elpaal's family held real territory

## 🏔️ The Inhabitants Of Aijalon

Aijalon was another Benjamite town with its own famous history.

Joshua ten records the sun standing still over Aijalon's valley.

That miracle happened during Joshua's battle to defend Gibeon.

Beriah and Shema later led the families settled in that same valley.

🏔️ Aijalon had its own valley

☀️ Joshua ten records the sun standing still there

⚔️ That happened during Joshua's war for Gibeon

📖 Beriah and Shema later led that valley

## 🏙️ Who Drove Away The Inhabitants Of Gath

Gath was a major Philistine city, later famous as Goliath's hometown.

Driving away its people means Beriah and Shema won real ground from them.

This chapter is about to introduce Saul, Israel's first king.

Saul's whole reign later becomes defined by war against these same Philistines.

🏙️ Gath was a major Philistine city

🥊 Beriah and Shema won ground from them

👑 Saul's story is coming next

📖 His reign means constant war with Philistines

# FirstChronicles 8:14-18
# 📜 More Sons Of Beriah And Elpaal
---
## 👦 And Ahio Shashak And Jeremoth

Ahio, Shashak, and Jeremoth begin a longer list of Beriah's own sons.

Shashak will lead his own family branch later in this chapter.

Genealogies often plant a name early and return to it later.

Watching for repeated names helps a reader follow the whole family tree.

👦 These are Beriah's own sons

⭐ Shashak returns later in this chapter

🌳 Genealogies plant names for later

📖 Repeated names tie the tree together

## 🔁 And Zebadiah And Arad And Ader

Zebadiah's name will appear again in just a few verses.

Two different men can easily share one name in these old lists.

Arad and Ader round out this part of Beriah's family.

Careful readers do not assume every repeated name is the same person.

🔁 Zebadiah's name repeats soon

👥 Two men can share one name

👦 Arad and Ader close this group

📖 Do not assume they are the same

## 📋 The Sons Of Beriah

Michael, Ispah, and Joha finish Beriah's own list of sons.

That family began earlier in this section.

Beriah was already named as a leader over Aijalon in that earlier passage.

His family clearly grew into a large and respected branch.

📋 This closes Beriah's son list

🏔️ Beriah already led Aijalon

👨‍👩‍👧‍👦 His family grew large

📖 A respected branch of Benjamin

## 🔄 Ishmerai Also And Jezliah

Ishmerai, Jezliah, and Jobab belong back to Elpaal's family, not a new one.

Zebadiah, Meshullam, Hezeki, and Heber were named just before these names.

Chronicles often circles back to a family after a short detour.

Elpaal's branch turns out to be one of the largest in this chapter.

🔄 This returns to Elpaal's family

👦 More sons follow the earlier group

🔁 Chronicles often circles back like this

📖 Elpaal's branch grew very large

# FirstChronicles 8:19-21
# 👨‍👩‍👧‍👦 The Sons Of Shimhi
---
## ❓ And Jakim And Zichri And Zabdi

Shimhi is a man the reader meets only through these sons.

He has not been named anywhere earlier in this chapter.

Chronicles sometimes introduces a family head only through his sons' names.

The reader learns who a man was by seeing his children listed first.

👦 These open Shimhi's family list

❓ Shimhi himself is not named directly

📜 Chronicles sometimes works backward like this

📖 Sons reveal the father here

## 🔤 And Elienai And Zilthai And Eliel

Elienai, Zilthai, and Eliel continue Shimhi's family with three more sons.

Several of these names share a similar sound, like Eliel and Elienai.

Hebrew names often built on the same root word for God, El.

Naming children after God was a common way to honor Him.

👦 Three more sons of Shimhi

🔤 Several names share a similar sound

🙏 Many built on the Hebrew word for God

📖 Naming honored God directly

## 🔢 Adaiah And Beraiah And Shimrath

Adaiah, Beraiah, and Shimrath complete Shimhi's family of nine sons total.

That closes out this family's list.

Nine sons was a large family, even for this era.

A large family here likely meant real influence within the tribe.

📋 This closes Shimhi's family list

🔢 Nine sons in total

👨‍👩‍👧‍👦 A large family for this time

📖 Size often meant real influence

# FirstChronicles 8:22-27
# ⚔️ Shashak's And Jeroham's Sons
---
## 👨‍👦 And Ishpan And Heber And Eliel

Shashak already appeared once in this chapter, as one of Beriah's sons.

Now Shashak has grown up and started his own family line.

His own sons open with Ishpan, Heber, and Eliel.

Genealogies often follow a man from being a son to becoming a father.

👦 Shashak's family list opens here

🌳 Shashak was Beriah's son

👨‍👦 He now has his own sons

📖 Genealogies track a whole lifetime

## 🔁 And Abdon And Zichri And Hanan

These three sons continue Shashak's family.

Zichri is a common name that will appear again later in this section.

Common names like this repeat constantly across these old records.

Each Zichri belonged to a completely separate branch of the family.

👦 Three more of Shashak's sons

🔁 Zichri repeats again later

📜 Common names repeated often

📖 Different branches, same name

## 📛 Antothijah

Antothijah is an unusual name that sounds like the town Anathoth.

Anathoth was a real town in Benjamin's territory, already named in First Chronicles seven.

Many scholars believe this name marked a family connection to that town.

A person's name could quietly point to a specific place they came from.

📛 Antothijah echoes the town Anathoth

🏘️ Anathoth sat in Benjamin's land

📚 Names could mark a hometown

📖 This name likely points to Anathoth

## 👨‍👩‍👧‍👦 Sons Of Jeroham

Jeroham heads a completely different family from the one just covered.

Athaliah appears here as a man's name, one of Jeroham's own sons.

The Bible also uses this same name for a wicked queen in Second Kings.

One Hebrew name could belong to both a man and a woman.

👨‍👩‍👧‍👦 This opens Jeroham's family

👤 Athaliah is a son here

👑 A queen later shares this name

📖 Names crossed both genders

## 🔁 The Sons Of Jeroham

Jaresiah, Eliah, and Zichri close out Jeroham's family record.

Zichri appears here for a second time in this same section.

This is a completely different man from the Zichri named earlier in this passage.

Two families, one shared name, recorded just a few verses apart.

📋 This closes Jeroham's family list

🔁 Zichri appears a second time

👥 A different man, same name

📖 Two families share one name

# FirstChronicles 8:28-32
# 🏙️ Jerusalem And Gibeon's Families
---
## 🏙️ These Dwelt In Jerusalem

Chief men marks these leaders as important and respected figures.

By their generations means this record spanned many family lines, not just one.

Some of those very families lived right in Jerusalem itself.

At this point in Israel's history, Jerusalem was not yet fully Israel's own city.

📋 This closes the long leader list

👑 Chief men marks real importance

🏙️ Some families lived in Jerusalem

📖 Jerusalem was not yet fully Israel's

## 👑 The Father Of Gibeon

Father of Gibeon is a title, not a literal birth relationship.

It marks this man as the founder or leader of that settlement.

Gibeon later becomes important as the place where the tabernacle once stood.

First Kings three records Solomon worshiping there early in his reign.

👑 Father of Gibeon means its founder

🏕️ Gibeon later held the tabernacle

🙏 Solomon worshiped there early on

📖 One title, a whole city's history

## 🔁 His Firstborn Son Abdon And Zur And Kish

Kish is named here as one of Gibeon's grandsons.

This is not the same Kish who becomes Saul's father a few verses later.

Families in this era often reused the same names across generations.

Watching for these repeats keeps the family tree from becoming confusing.

👦 Kish appears here as Gibeon's grandson

❓ Not the same Kish as Saul's father

🔁 Names repeated across generations

📖 Careful reading keeps names straight

## 📛 Baal

Baal here is simply a personal name, not the pagan storm god.

In Hebrew, baal originally just meant lord or master.

Early Israelites sometimes used it as part of a name before it became linked to idol worship.

A few verses later, this same family swaps out baal names for safer ones.

📛 Baal here is just a personal name

📜 The word originally meant lord

🕰️ Early names used it more freely

➡️ Later verses swap these names out

## 🏙️ Dwelt With Their Brethren In Jerusalem

Over against them means directly across from or facing them.

This closes out the Gibeon family section, first named a few verses earlier.

Mikloth's son Shimeah settled near his relatives using that same layout.

Two branches of one family ended up living side by side in the same city.

📋 This closes the Gibeon section

🏙️ Shimeah settled in Jerusalem too

↔️ Over against means facing each other

📖 Family branches lived side by side

# FirstChronicles 8:33-40
# 👑 The Family That Gave Israel Its First King
---
## 👴 And Ner Begat Kish And Kish Begat Saul

Ner appears here as Kish's own father, making him Saul's grandfather.

First Samuel fourteen describes Ner and Kish as brothers instead, both sons of Abiel.

Old family records did not always agree on every single generation.

Either way, this same family produced Saul, Israel's very first king.

👴 Ner is named as Kish's father here

📚 Samuel describes them as brothers instead

📜 Old records did not always agree

📖 This family gave Israel its first king

## 🤝 And Saul Begat Jonathan And Malchishua And Abinadab And Eshbaal

Jonathan became famous as David's closest friend.

Malchishua and Abinadab died alongside Saul in the same battle.

First Samuel thirty one records those sons dying with Saul on Mount Gilboa.

Only one son of Saul, Eshbaal, survived that final battle against the Philistines.

🤝 Jonathan was David's closest friend

⚔️ Three sons died with Saul at Gilboa

🏔️ That battle happened on Mount Gilboa

📖 Only Eshbaal survived it

## 📛 Eshbaal

Eshbaal means man of Baal, using baal in its older, harmless sense of lord.

Second Samuel calls this same son Ishbosheth instead.

Bosheth means shame, and later scribes used it to replace baal names.

They made this swap once baal became too closely tied to the pagan god.

📛 Eshbaal means man of Baal

🔄 Second Samuel calls him Ishbosheth

💔 Bosheth means shame

📖 Scribes swapped the name later

## 👶 The Son Of Jonathan Was Meribbaal

Meribbaal is the very same son Second Samuel calls Mephibosheth.

He was crippled in both feet after a fall as a small child.

His nurse was fleeing the news that Saul and Jonathan had died.

David later showed him great kindness for Jonathan's sake, in Second Samuel nine.

👶 Meribbaal is Mephibosheth in Samuel

🦵 He was crippled as a small child

🏃 His nurse was fleeing that day

📖 David later showed him kindness

## 🔢 Azel Had Six Sons

These six sons lived several generations after Jonathan.

Second Samuel twenty one records some of Saul's descendants being put to death later.

This full list shows that Saul's family line did not die out completely.

A genealogy like this quietly answers a question the story itself leaves open.

🔢 Six sons, several generations from Jonathan

⚰️ Second Samuel records some later deaths

🌳 The line did not die out

📖 This list answers an open question

## 💪 Mighty Men Of Valour Archers

Mighty men of valour is the same military phrase used back in First Chronicles seven.

Archers were skilled specialists, not ordinary foot soldiers.

An hundred and fifty descendants show Benjamin still growing many generations later.

The tribe that nearly vanished in the book of Judges ends this chapter strong.

💪 Mighty men of valour repeats from chapter seven

🏹 Archers were skilled specialists

🔢 An hundred and fifty descendants total

📖 Benjamin ends this chapter strong
`.trim();

export const FIRST_CHRONICLES_EIGHT_PERSONAL_SECTIONS = parseFirstChroniclesEightRawNotes(FIRST_CHRONICLES_EIGHT_RAW_NOTES);
