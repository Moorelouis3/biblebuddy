export type FirstChroniclesFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesFiveRawNotes(rawText: string): FirstChroniclesFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 5:${startVerse}` : `1 Chronicles 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Chronicles 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_FIVE_RAW_NOTES = `# FirstChronicles 5:1-3
# ⚖️ Reuben Loses The Firstborn Right
---
## ⚖️ For He Was The Firstborn

The firstborn son normally received a double share of everything his father owned.

He also became the family's next leader after his father died.

Reuben was Jacob's oldest son by birth order alone.

That birth order should have settled everything.

👶 Reuben was Jacob's oldest son

💰 Firstborn meant a double share

👑 Firstborn meant future leadership

📖 This chapter overturns that order

## 💔 He Defiled His Father's Bed

This refers to Reuben sleeping with his father's concubine Bilhah.

Genesis thirty five records that act happening years before this chapter.

Bilhah had been Rachel's handmaid and Jacob's own wife by that point.

That betrayal cost Reuben his father's trust for the rest of his life.

😔 Reuben slept with Bilhah

📜 Genesis thirty five records it

👩 Bilhah was Jacob's own wife

📖 It cost him his father's trust

## 👑 His Birthright Was Given Unto The Sons Of Joseph

The birthright did not vanish once Reuben lost it.

It passed instead to Joseph's two sons Ephraim and Manasseh.

Each of them received a full tribal inheritance in the land.

That gave Joseph's line a double share instead of Reuben's.

👑 Birthright passed to Joseph's line

👬 Ephraim and Manasseh each inherited

🗺️ Two tribes instead of one

📖 Joseph received the double share

## 👑 For Judah Prevailed Above His Brethren

Judah did not receive the double inheritance Joseph got.

He received something bigger instead, the ruling line itself.

That line eventually produces King David centuries later.

It ultimately leads all the way to Jesus Christ.

👑 Judah got the ruling line

🗡️ He got leadership instead

🌟 David comes from this line

📖 It leads all the way to Jesus

## 👶 The Sons Of Reuben Were Hanoch And Pallu Hezron And Carmi

These four names are the actual next generation after Reuben.

The birthright discussion just before this was a necessary detour.

Exodus six lists these same four sons in the very same order.

The genealogy now moves forward normally after that detour.

👶 Four actual sons of Reuben

🔀 The detour is now finished

📜 Exodus six matches this list

📖 The line continues forward normally

# FirstChronicles 5:4-6
# ⛓️ Joel's Line Ends In Captivity
---
## 👶 The Sons Of Joel Shemaiah His Son Gog His Son Shimei His Son

This is not a list of six brothers living at once.

Each his son marks one generation forward in time.

Shemaiah is Joel's son.

Gog is Shemaiah's son.

Six generations pass by in one short verse.

That shows how condensed a genealogy list can become.

👶 Not six brothers together

⏳ Each his son means one generation

🔗 Shemaiah then Gog then on down

📖 Six generations in one verse

## ⛓️ Whom Tilgathpilneser King Of Assyria Carried Away Captive

Tilgathpilneser was a real Assyrian king, also called Tiglathpileser the Third.

He ruled Assyria during the eighth century before Christ.

Assyria was rising into the most powerful empire of that era.

Beerah's own capture here previews the exile the whole chapter ends with.

👑 Tilgathpilneser was a real king

🏛️ He ruled the Assyrian empire

📅 This happened in the eighth century

📖 It previews the whole chapter's ending

## 👑 He Was Prince Of The Reubenites

Prince here does not mean a king's son the way it sounds today.

It means the recognized leader of the entire Reubenite tribe.

Beerah held that position right up until his own capture.

The tribe's last known leader disappears into Assyrian captivity.

👑 Prince means tribal leader here

❌ Not a king's royal son

⛓️ Beerah led until his capture

📖 The tribe's last leader vanishes here

# FirstChronicles 5:7-10
# 🐑 Bela's Wide Territory And The Hagarite War
---
## 👥 His Brethren By Their Families Were The Chief Jeiel And Zechariah

His brethren refers to the wider Reubenite clans beyond Beerah's direct line.

Jeiel and Zechariah led their own separate branches of the tribe.

Genealogies often named several chiefs instead of just one ruling family.

Reuben's tribe clearly had more than a single center of leadership.

👥 His brethren means wider clans

👤 Jeiel led one branch

🧑 Zechariah led another branch

📖 Leadership was spread, not single

## 🗺️ Bela Who Dwelt In Aroer Even Unto Nebo And Baalmeon

Aroer, Nebo, and Baalmeon were real towns east of the Jordan River.

They sat inside territory that had once belonged to Moab.

Numbers thirty two describes Reuben requesting this exact land from Moses.

Bela's family had settled deep into that promised territory by this point.

🗺️ Aroer Nebo Baalmeon were real towns

🏜️ Once part of Moab's territory

📜 Numbers thirty two records the request

📖 The family settled the land

## 🌊 Eastward He Inhabited Unto The Entering In Of The Wilderness From The River Euphrates

This does not describe one small farm along the riverbank.

It reached from Gilead all the way toward the Euphrates River.

The Euphrates was one of the great rivers of the ancient world.

Reuben's tribe controlled a genuinely vast eastern frontier.

🌊 The Euphrates was a major river

🗺️ The land stretched east toward it

🐑 A vast frontier, not a farm

📖 Reuben held real, wide territory

## 🐄 Because Their Cattle Were Multiplied In The Land Of Gilead

Reuben and Gad had asked for this land back in the book of Numbers.

Their stated reason then was the same reason given here.

Gilead offered rich grazing that their growing herds badly needed.

This verse quietly confirms that old request had actually worked out.

🐄 Cattle needed room to grow

📜 Numbers records the original request

🌾 Gilead offered rich grazing land

📖 The old plan had worked

## ⚔️ In The Days Of Saul They Made War With The Hagarites

Hagarites were a nomadic people descended from Hagar, Abraham's servant.

Genesis sixteen tells the story of Hagar and her son Ishmael.

This war happened during the reign of Israel's first king Saul.

Reuben's tribe had to fight to hold the land it settled.

⚔️ Hagarites descended from Hagar

📜 Genesis sixteen tells her story

👑 This happened under King Saul

📖 The land had to be defended

## 🏕️ They Dwelt In Their Tents Throughout All The East Land Of Gilead

Winning the war did not mean they built permanent cities right away.

Tents show these families still lived a partly nomadic lifestyle.

That fit a people whose wealth was mostly cattle, not buildings.

Herding families followed their animals more than they built houses.

🏕️ Victory did not mean cities yet

🐑 Wealth was cattle, not buildings

🚶 A partly nomadic lifestyle continued

📖 Herds shaped how they lived

# FirstChronicles 5:11-15
# 🏞️ Gad's Family In Bashan
---
## 🏞️ The Children Of Gad Dwelt Over Against Them In The Land Of Bashan Unto Salcah

Over against them means directly across a border from Reuben's territory.

Bashan was a fertile region north of Gilead, famous for its rich pasture.

Salcah marked the far eastern edge of that same territory.

Two tribes settled side by side across the same eastern frontier.

🏞️ Bashan was fertile pastureland

🗺️ Salcah marked its eastern edge

👬 Gad settled next to Reuben

📖 Two tribes shared one frontier

## 👑 Joel The Chief And Shapham The Next

Chief and next describe a clear ranking among Gad's leaders.

Joel held the top position over the tribe's affairs.

Shapham served directly under him in a second position.

Even a family genealogy recorded an organized chain of command.

👑 Joel was the top leader

🥈 Shapham held the second rank

📋 Leadership followed a clear order

📖 Even genealogies noted rank

## 🔢 Their Brethren Of The House Of Their Fathers Were Seven

Seven names are listed here, then the text simply counts them.

Naming a specific number showed the record was exact, not estimated.

None of these seven men appears again anywhere else in the Bible.

A precise count still mattered even for names with no other story.

🔢 Seven brothers named and counted

✅ The number confirms exact record

🤐 None appears again elsewhere

📖 Precision mattered without a story

## 🔗 These Are The Children Of Abihail The Son Of Huri

This verse stacks six generations back to back in one long sentence.

A chain this long served as a kind of legal proof.

It showed exactly how this family's claim to the land traced back.

Long genealogies often worked like a land deed written in names.

🔗 Six generations stacked together

📜 The chain proved family claim

🏞️ It traced their right to the land

📖 Names could work like a deed

## 👑 Ahi The Son Of Abdiel The Son Of Guni Chief Of The House Of Their Fathers

Ahi led a separate branch from Joel's family named earlier.

Gad's tribe again shows more than one leading family line.

Chief of the house of their fathers repeats the same leadership title used before.

Large tribes commonly organized themselves around several family heads at once.

👑 Ahi led a separate branch

👬 Gad had multiple family heads

🔁 The same title repeats here

📖 Large tribes had many leaders

# FirstChronicles 5:16-17
# 📜 Recorded Under Two Kings
---
## 🏘️ They Dwelt In Gilead In Bashan And In Her Towns

This summarizes the entire eastern settlement in one line.

Gilead and Bashan together covered a huge stretch of land.

Her towns refers to all the smaller settlements inside that region.

Three related tribes had built real, permanent communities there.

🏘️ One line summarizes it all

🗺️ Gilead and Bashan were vast

🏡 Her towns means smaller settlements

📖 Real communities, not just camps

## 🌾 In All The Suburbs Of Sharon Upon Their Borders

This Sharon is not the well known coastal plain near the Mediterranean Sea.

It was a separate district located inside Gilead and Bashan instead.

The Bible sometimes reuses a place name in more than one region.

Readers should not confuse this Sharon with the famous one near the coast.

🏘️ A different Sharon than the coast

🗺️ Located inside Gilead and Bashan

🔁 Place names could repeat regions

📖 Do not confuse the two Sharons

## 📜 All These Were Reckoned By Genealogies In The Days Of Jotham King Of Judah And In The Days Of Jeroboam King Of Israel

By this point Israel had split into two separate kingdoms.

Jotham ruled the southern kingdom of Judah at this time.

Jeroboam the Second ruled the northern kingdom of Israel at the same time.

Dating this record under both kings ties it to one specific window of history.

📜 Two kingdoms existed by now

👑 Jotham ruled Judah in the south

🏰 Jeroboam ruled Israel in the north

📖 One record, dated to both reigns

# FirstChronicles 5:18-22
# ⚔️ The Eastern Tribes Go To War
---
## 🛡️ Men Able To Bear Buckler And Sword And To Shoot With Bow And Skilful In War

A buckler was a small round shield carried in one hand.

These men trained with the sword, the bow, and the shield together.

Skilful in war means they were trained soldiers, not just farmers with weapons.

Herding families could still field a genuinely disciplined army.

🛡️ Buckler means a small shield

🗡️ Trained with sword and bow

🎯 Skilful means trained, not just armed

📖 Herders fielded a real army

## 🔢 Four And Forty Thousand Seven Hundred And Threescore

Threescore is an old way of saying sixty.

Added together, this whole number equals forty four thousand seven hundred sixty men.

That is an enormous army for three related tribes to raise.

Chronicles again cared about giving an exact, countable number.

🔢 Threescore means sixty

➕ Total is forty four thousand seven hundred sixty

🛡️ An enormous combined army

📖 Chronicles counted it exactly

## ⚔️ They Made War With The Hagarites With Jetur And Nephish And Nodab

Jetur, Nephish, and Nodab were three sons of Ishmael, Abraham's other son.

Genesis twenty five lists all three among Ishmael's twelve sons.

These Hagarite groups were literally cousins to Reuben, Gad, and Manasseh.

Old family lines from Abraham were still fighting each other generations later.

👤 Jetur Nephish Nodab were Ishmael's sons

📜 Genesis twenty five names all three

👬 The two sides were cousins

📖 Old family lines still clashed

## 🙏 They Cried To God In The Battle And He Was Intreated Of Them

Intreated is an older word for answered or persuaded by a plea.

These men called out to God in the middle of actual fighting.

God responded to that cry while the battle was still underway.

Their prayer was urgent, not something planned ahead of time.

🙏 Intreated means God answered

⚔️ They prayed during the battle

👂 God responded to their cry

📖 An urgent prayer, not a plan

## 🤝 Because They Put Their Trust In Him

The text gives one clear reason for their victory here.

It was not their weapons or their large numbers alone.

Their trust in God is named as the deciding factor.

This line sets up a painful contrast with verse twenty five later.

🤝 Trust is named as the reason

🛡️ Not weapons or numbers alone

🙏 God gets credit for the win

📖 This sets up a later contrast

## 💰 Of Their Camels Fifty Thousand And Of Sheep Two Hundred And Fifty Thousand

These numbers describe the plunder taken after the battle ended.

Fifty thousand camels alone represented enormous wealth in that world.

Livestock like this functioned as currency, not just as food.

A victory this size reshaped the winning tribes' entire economy.

💰 Livestock functioned as real wealth

🐪 Fifty thousand camels captured

🐑 Massive numbers of sheep too

📖 The win reshaped their economy

## ⚔️ For There Fell Down Many Slain Because The War Was Of God

Chronicles gives this war a clear theological label here.

It calls it a war of God, not just a tribal raid.

That claim ties the victory directly back to their trust in verse twenty.

The chapter frames this battle as something God himself accomplished.

⚔️ Called a war of God

🙏 Tied back to their trust

✅ More than a tribal raid

📖 God is credited with the win

# FirstChronicles 5:23-24
# 🏔️ Manasseh's Half Tribe Grows
---
## 🏞️ The Children Of The Half Tribe Of Manasseh Dwelt In The Land

Manasseh was actually split between two separate territories.

Half of the tribe settled east of the Jordan River with Reuben and Gad.

The other half settled west of the Jordan with the rest of Israel.

Only the eastern half is being counted here, not the whole tribe.

🏞️ Manasseh was split in two

🗺️ Half settled east of the Jordan

🧭 Half settled west of the Jordan

📖 This verse covers the eastern half

## 🏔️ They Increased From Bashan Unto Baalhermon And Senir And Unto Mount Hermon

This half tribe kept expanding its territory further north over time.

Baalhermon and Senir were both landmarks near Mount Hermon itself.

Mount Hermon was a massive, snow capped peak on Israel's northern edge.

Reaching that far marked real, sustained growth for this smaller tribe.

🏔️ Mount Hermon marked their far edge

📈 The tribe kept expanding north

❄️ Hermon was a snow capped peak

📖 Real growth for a smaller tribe

## 💪 Even Epher And Ishi And Eliel And Azriel And Jeremiah And Hodaviah And Jahdiel Mighty Men Of Valour Famous Men

Mighty men of valour was a formal title for proven warriors.

Famous men meant their reputation reached beyond their own tribe.

Seven leaders are named here, each earning both titles at once.

These titles marked real respect, not just family standing.

💪 Valour means proven courage

🌟 Famous means widely known

👥 Seven leaders named here

📖 Earned titles, not just birth

# FirstChronicles 5:25-26
# 💔 Exiled For Idolatry
---
## 💔 They Transgressed Against The God Of Their Fathers

Transgressed means they broke a covenant they had already agreed to keep.

The God of their fathers points back to Abraham, Isaac, and Jacob.

This was not a small slip but a real, deliberate break.

Their earlier trust in God, seen back in verse twenty, did not last.

💔 Transgressed means broke the covenant

👴 Points back to Abraham Isaac Jacob

⚠️ A deliberate break, not a slip

📖 Earlier trust did not last

## 😔 Went A Whoring After The Gods Of The People Of The Land

Whoring here is not describing literal sexual sin at all.

It is a common Old Testament picture for breaking covenant loyalty.

Israel's relationship with God was often described using marriage language.

Worshiping other gods was pictured as a kind of spiritual unfaithfulness.

😔 Whoring pictures broken loyalty here

💍 God's covenant used marriage language

🙅 Not literal sexual sin

📖 Worship elsewhere meant unfaithfulness

## ⚠️ Whom God Destroyed Before Them

These are the very same nations God had cleared out for Israel.

That clearing out was itself an act of God's judgment on them.

Reuben, Gad, and Manasseh then adopted the gods of the people God removed.

The irony here is sharp and clearly intentional.

⚠️ Same nations God had removed

⚖️ Their removal was God's judgment

🔁 The tribes copied their gods

📖 A sharp, intentional irony

## 👑 The God Of Israel Stirred Up The Spirit Of Pul King Of Assyria

Pul and Tilgathpilneser named earlier turn out to be the very same king.

Assyrian kings sometimes appear under more than one name in the Bible.

Stirred up means God moved this foreign king to act on his own ambition.

God used a pagan ruler's own plans to carry out real judgment.

👑 Pul and Tilgathpilneser are one king

🔁 Assyrian kings had multiple names

🕹️ God stirred up his ambition

📖 A pagan king served God's judgment

## 🌍 He Carried Them Away Unto Halah And Habor And Hara And To The River Gozan Unto This Day

Halah, Habor, and Gozan were all real regions inside the Assyrian empire.

Second Kings records this same deportation happening to Israel's northern kingdom too.

These eastern tribes were actually the first Israelites ever carried into exile.

Unto this day means the years still felt permanent when this was written.

🌍 Real regions inside Assyria

📜 Second Kings records this too

⏳ The first tribes taken away

📖 A loss that still felt permanent
`.trim();

export const FIRST_CHRONICLES_FIVE_PERSONAL_SECTIONS = parseFirstChroniclesFiveRawNotes(FIRST_CHRONICLES_FIVE_RAW_NOTES);
