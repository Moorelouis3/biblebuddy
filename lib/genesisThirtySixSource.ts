export type GenesisThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtySixRawNotes(rawText: string): GenesisThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 36:${startVerse}` : `Genesis 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 36 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_SIX_RAW_NOTES = `# Genesis 36:1-5
# 📜 The Family Esau Built In Canaan
---
## 📜 Now These Are The Generations Of Esau

"Generations" here does not mean children only.

It means the recorded family history that came from one person.

Genesis already gave the generations of Adam, Noah, and Ishmael.

Now it turns to record the generations of Esau.

Scripture usually finishes the side line of a family first.

Then it returns to the line that carries God's promise.

📜 Generations means a recorded family line

👴 Genesis already covered Adam and Noah

🔀 The side line gets recorded first

📖 Then the story returns to Jacob

## 🔴 Who Is Edom

"Edom" means red.

Esau earned that name years earlier by trading his birthright for a bowl of red stew.

That single trade cost him his place as firstborn.

The name followed him for the rest of his life.

It now names his entire nation too.

🔴 Edom means red

🥣 Named for the red stew he traded

👑 That trade cost him his birthright

📖 The name now covers his whole nation

## 👰 Esau Took His Wives Of The Daughters Of Canaan

Esau married women from the Canaanite people.

Abraham had gone to great lengths to keep Isaac from marrying a Canaanite.

He sent his own servant back to distant relatives instead of allowing that.

Esau ignored that entire pattern.

His choice later caused real grief for his mother Rebekah.

👰 Esau married Canaanite women

🙏 Abraham avoided this for Isaac

💔 Rebekah grieved over these marriages

📖 Esau broke a pattern his family kept

## 🧩 Aholibamah The Daughter Of Anah The Daughter Of Zibeon The Hivite

This verse calls Anah "the daughter of Zibeon."

Later in this same chapter, Anah is listed among Zibeon's sons instead.

Hebrew family words for son and daughter could stretch to cover a wider family line.

The text is not contradicting itself.

It is simply using looser terms for descent than a modern reader expects.

👩 Aholibamah was one of Esau's wives

🧩 Anah is called both son and daughter

📚 Hebrew kinship words stretched loosely

📖 The text is not contradicting itself

## 👶 Which Were Born Unto Him In The Land Of Canaan

Esau had five sons, and all five were born before he ever left Canaan.

Eliphaz and Reuel came from his first two wives.

Jeush, Jaalam, and Korah came from Aholibamah.

These five names anchor every genealogy the rest of this chapter builds.

Every duke and king named later traces back to one of these five sons.

👶 Esau had five sons total

📋 Eliphaz and Reuel came first

🌿 Jeush, Jaalam, and Korah followed

📖 Every later duke traces to one

# Genesis 36:6-8
# ⛰️ Esau Moves To Mount Seir
---
## 🚶 Went Into The Country From The Face Of His Brother Jacob

"From the face of" is an old way of saying away from someone.

This does not mean the brothers were enemies again.

God had already brought Esau and Jacob back together in chapter thirty three.

Esau simply moved his household to a different region.

Jacob remained behind in the land God had promised his family.

🚶 From the face of means away from

🤝 The brothers were already reconciled

🌍 Jacob stayed in the promised land

📖 Esau chose to settle elsewhere

## 🐑 Could Not Bear Them Because Of Their Cattle

"Bear" here means the land could not support or sustain them.

Both Esau and Jacob had grown enormously wealthy in flocks and herds.

There was simply not enough pasture and water for both households at once.

This is the same problem Abraham and Lot faced generations earlier.

That separation was practical, not a sign of any lasting conflict.

🐑 Bear means the land could not support

🌾 Both brothers had grown very wealthy

💧 Pasture and water ran short for both

📖 This echoes Abraham and Lot's split

## 🔴 Thus Dwelt Esau In Mount Seir

Esau settled permanently in the mountains of Seir, southeast of the Dead Sea.

This region became the permanent homeland of his descendants.

The text repeats that Esau is Edom, tying the man to the nation.

From here forward, Edom is both his name and his people's name.

⛰️ Esau settled permanently in Seir

🏠 Seir became his family's homeland

🔴 Esau and Edom are the same name

📖 The man's name became a nation's name

# Genesis 36:9-14
# 👑 The Father Of The Edomites
---
## 👴 The Father Of The Edomites In Mount Seir

"Father" here does not mean Esau personally raised every Edomite.

It means he stands as the ancestor the whole nation traces back to.

The Bible uses this same idea for Abraham, Ishmael, and many others.

Esau is now the founding figure of an entire people, not just one family.

👴 Father means founding ancestor here

🌎 Esau founded an entire nation

📚 The Bible uses this pattern often

📖 One man became a whole people's start

## 🧠 The Sons Of Eliphaz Were Teman, Omar, Zepho, And Gatam, And Kenaz

Eliphaz was Esau's firstborn son through Adah.

His five sons became the heads of their own family branches.

Teman later became one of the most respected regions in all of Edom.

The book of Job even calls one of Job's friends Eliphaz the Temanite.

That connection likely runs back to this very family line.

🧠 Eliphaz had five recorded sons

📍 Teman became a respected Edomite region

📖 Job's friend Eliphaz was a Temanite

➡️ One family name echoes generations later

## 👩 Timna Was Concubine To Eliphaz Esau's Son

A "concubine" was a wife of lower legal standing than a primary wife.

Her children were still recognized as real members of the family line.

Timna herself was a Horite, one of the people already living in Seir.

Her placement here shows Esau's family mixing with the local population.

👩 Concubine means a lesser status wife

👶 Her children still counted as family

🏔️ Timna came from the local Horites

➡️ Esau's family mixed with Seir's people

## ⚔️ She Bare To Eliphaz Amalek

Amalek is named here for the first time in the entire Bible.

He became the father of the Amalekites, a people Israel would fight for centuries.

Moses, Saul, and David all faced Amalekite armies long after this quiet verse.

A single grandson's name here quietly sets up centuries of future conflict.

⚔️ Amalek's first mention in scripture

👶 He was Esau's grandson through Timna

🗡️ His people fought Israel for centuries

📖 One name here shapes later history

# Genesis 36:15-19
# 🏘️ Dukes Of Esau's Sons
---
## 👑 These Were Dukes Of The Sons Of Esau

"Duke" does not mean a European nobleman in this verse.

The Hebrew word behind it means chief, or head of a clan.

As Esau's family grew, each branch became its own clan with its own leader.

The King James translators simply borrowed a familiar English title for the office.

👑 Duke means chief or clan leader

🏕️ Each family branch got its own leader

📚 The translators borrowed a familiar title

➡️ One word covers many small clans

## 🧩 Duke Korah, Duke Gatam, And Duke Amalek

Korah appears here as a son of Eliphaz, alongside Gatam and Amalek.

Later in this same chapter, Korah is listed as a son of Aholibamah instead.

Many scholars believe this name may have been copied into the wrong list.

The text does not explain the difference, and honest readers should say so.

🧩 Korah appears in two different lists

📖 Later verses put him under Aholibamah

🤔 Many scholars suspect a copying issue

➡️ Honest study admits what is unclear

## 🔴 These Are The Sons Of Esau, Who Is Edom, And These Are Their Dukes

This line closes the entire first genealogy of Esau's own children.

Three wives produced five sons, and those five sons produced clan chiefs.

The chapter now turns to a different family entirely, the Horites of Seir.

Esau's family record stands complete before the story moves on.

🔴 This closes Esau's own family list

👰 Three wives produced five sons total

🏔️ The chapter next turns to the Horites

📖 One family record now stands complete

# Genesis 36:20-25
# 🪨 The Horites Who Lived There First
---
## 🏔️ These Are The Sons Of Seir The Horite, Who Inhabited The Land

The Horites lived in the mountains of Seir long before Esau ever arrived.

Seir was both a man's name and the name of this whole region.

Moses records their family line even though this people would not last.

The book of Deuteronomy later says God removed the Horites to make room for Edom.

🏔️ Horites lived in Seir before Esau

👤 Seir named both a man and a region

📖 Deuteronomy explains their later removal

➡️ God cleared room for Esau's family

## 👩 Lotan's Sister Was Timna

This Timna is very likely the same woman who later became Eliphaz's concubine.

That means Amalek's mother came from this Horite family, not from Esau's side.

Amalek's ancestry runs through two very different peoples at once.

The Bible often traces a person's roots through more than one family line.

👩 Timna the Horite likely reappears later

👶 Amalek's mother was a Horite woman

🧬 His ancestry blends two different peoples

📖 Family lines here run in two directions

## 🐴 This Was That Anah That Found The Mules In The Wilderness

The King James Version says Anah found mules while he was out in the wilderness.

The original Hebrew word here is genuinely hard to translate with certainty.

Many scholars believe it more likely describes Anah discovering hot springs instead.

Either way, Moses is marking Anah as known for one specific discovery.

🐴 The KJV word here is "mules"

🌊 Many scholars read it as hot springs

❓ The Hebrew word is genuinely uncertain

📖 Anah was remembered for this discovery

## 🐴 As He Fed The Asses Of Zibeon His Father

Anah was doing ordinary shepherd's work when he made his famous discovery.

He was tending his father Zibeon's donkeys, not searching for anything unusual.

Many important discoveries in scripture happen to people doing quiet, everyday work.

Anah's story shows an ordinary task turning into something worth remembering.

🐴 Anah was tending his father's donkeys

🔍 His discovery came during normal work

📖 Scripture often finds meaning in routine tasks

➡️ An ordinary day became worth recording

# Genesis 36:26-30
# 🕳️ The Horite Clans Fade From History
---
## 👨 The Children Of Ezer Are These, Bilhan, And Zaavan, And Akan

Moses records the sons of several more Horite family heads by name.

None of these names appear again anywhere else in the Bible.

Recording a forgotten people this carefully still mattered enough to preserve.

Scripture often keeps a record of nations that history would otherwise lose entirely.

👨 These Horite sons appear only here

📚 None are named again in scripture

🕳️ This people would eventually disappear

📖 God's record outlasts a forgotten nation

## 🏰 These Are The Dukes That Came Of Hori, Among Their Dukes In The Land Of Seir

This closes the record of the Horite clan leaders in Seir.

The Horites once ruled this whole mountainous region on their own.

Deuteronomy later says Esau's descendants destroyed and replaced them completely.

The people who once owned this land left behind only a list of names.

🏰 This closes the Horite leadership list

⛰️ Horites once ruled all of Seir

⚔️ Esau's descendants later replaced them

📖 A whole nation shrank to a list

# Genesis 36:31-39
# 🏰 Kings Who Ruled Before Israel Had Kings
---
## 👑 These Are The Kings That Reigned In The Land Of Edom

A "duke" led one single clan, but a "king" ruled the whole nation together.

Edom moved from separate family clans into one unified kingdom.

This shows real political growth happening within just a few generations.

Esau's descendants built something more organized than a loose collection of families.

👑 King means ruler of the whole nation

🏕️ Duke only led a single clan

📈 Edom grew into one kingdom

📖 Esau's family became truly organized

## 📖 Before There Reigned Any King Over The Children Of Israel

Edom had a working line of kings long before Israel crowned Saul.

This might look like Esau's family got ahead in the world.

God's covenant, though, never depended on who built a kingdom first.

The promise ran through Jacob's line no matter how Edom's history looked.

📖 Edom had kings before Israel did

👑 Esau's line looked ahead for a while

🤝 God's covenant never depended on that

➡️ The promise still ran through Jacob

## 🔁 Reigned In His Stead

This exact phrase repeats seven times across just a few verses.

Each new king comes from a different city and a different family.

Edom's throne clearly did not pass automatically from father to son.

A kingdom without one steady royal family often faces more instability.

🔁 This phrase repeats seven times here

🏙️ Each king came from a new city

👨‍👦 The throne did not pass by birth

📖 Edom lacked one lasting royal family

## ⚔️ Who Smote Midian In The Field Of Moab

"Smote" is an old word that simply means struck down in battle.

Hadad defeated the Midianites, descendants of one of Abraham's sons through Keturah.

The battle happened inside Moab's territory, the land of Lot's other descendants.

This detail marks Hadad as Edom's most militarily successful king by far.

⚔️ Smote means defeated in battle

👥 Midian descended from Abraham through Keturah

🗺️ The fight happened inside Moab's land

📖 Hadad stood out as a warrior king

## 👩 His Wife's Name Was Mehetabel, The Daughter Of Matred, The Daughter Of Mezahab

No other king in this list gets his wife or her family named.

Hadar's extra detail suggests he was remembered more clearly than the kings before him.

Ancient genealogies often named a wife's family to show her social standing.

Mehetabel's family line likely carried some real weight within Edom.

👩 Only Hadar's wife is named here

📚 Extra detail suggests he was well remembered

👴 Naming her family showed her standing

📖 Some family lines carried real weight

# Genesis 36:40-43
# 🗺️ Edom's Territories And Esau's Legacy
---
## 🗺️ According To Their Families, After Their Places, By Their Names

Earlier in this chapter, Esau's dukes were listed by their fathers and family lines.

This second list organizes the very same leaders by territory instead.

Ancient records often kept more than one way of tracking the same information.

One family tree, one map, both pointing to the same growing nation.

🗺️ This list groups dukes by territory

👨‍👦 The earlier list grouped them by family

📚 Records kept more than one system

📖 Both lists describe the same nation

## 🔴 He Is Esau The Father Of The Edomites

Genesis now closes the record of Esau's family for good.

Years earlier, God told Rebekah that two nations were growing inside her.

Esau's nation grew strong, wealthy, and organized, exactly as God had said.

The next chapter turns fully to Jacob's family and to Joseph.

Even the brother who lost the covenant still received a real blessing from God.

🔴 Esau's family record closes here

🤰 God told Rebekah of two nations

👑 Edom grew strong just as promised

📖 God blessed even the passed over brother
`.trim();

export const GENESIS_THIRTY_SIX_PERSONAL_SECTIONS = parseGenesisThirtySixRawNotes(GENESIS_THIRTY_SIX_RAW_NOTES);
