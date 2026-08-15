export type FirstChroniclesFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesFourRawNotes(rawText: string): FirstChroniclesFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 4:${startVerse}` : `1 Chronicles 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 1 Chronicles 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_FOUR_RAW_NOTES = `# FirstChronicles 4:1-4
# 🌾 Judah's Family Line Continues
---
## 📜 The Sons Of Judah Pharez Hezron And Carmi And Hur And Shobal

This list does not name five sons born in one single generation.

Ancient genealogies often grouped clan leaders from several generations under one heading.

Pharez was Judah's actual son, but Hur lived generations later.

Chronicles compresses centuries into a short list like this one.

📜 Not one generation of brothers

⏳ Clan leaders spanned many years

👶 Pharez was Judah's real son

📖 Chronicles compresses long centuries

## 🏘️ These Are The Families Of The Zorathites

Zorathites means the people who lived in the town of Zorah.

Zorah sat in the lowlands of Judah, near the border with Philistia.

This same town later becomes the birthplace of Samson.

A small family note here quietly connects to a much bigger story.

🏘️ Zorathites means people of Zorah

🗺️ Zorah bordered Philistine territory

💪 Samson was born in Zorah

📖 A small note ties to Samson

## 👩 The Name Of Their Sister Was Hazelelponi

Chronicles rarely names women inside its long lists of sons.

Hazelelponi gets named here for no stated reason at all.

Her name likely means something like the shade turns toward me.

Even an unexplained detail like this one was worth preserving.

👩 Women are rarely named here

❓ No reason is given

🌤️ Her name has a poetic meaning

📖 Even small details were preserved

## 🏙️ The Sons Of Hur The Firstborn Of Ephratah The Father Of Bethlehem

Ephratah was another name closely tied to the town of Bethlehem.

Hur's family line helped settle and establish that very town.

Bethlehem later becomes the birthplace of King David.

Centuries after that, the same town becomes the birthplace of Jesus.

🏙️ Ephratah connects to Bethlehem

👨‍👩‍👧 Hur's family helped settle it

👑 David was born in Bethlehem

📖 Jesus was born there too

# FirstChronicles 4:5-8
# 👨‍👩‍👧 Ashur's Family In Tekoa
---
## 🏘️ Ashur The Father Of Tekoa Had Two Wives Helah And Naarah

Tekoa was a small town south of Bethlehem, up in the hill country.

The prophet Amos later comes from this exact same town.

Having two wives was common for men building a large family line.

Ashur's own family grows through both women named here.

🏘️ Tekoa sat south of Bethlehem

📜 Amos later comes from Tekoa

💍 Two wives built the family

📖 Both lines are recorded here

## 👶 These Were The Sons Of Naarah

Naarah's four sons are simply listed here by name.

None of them becomes important anywhere else in the Bible.

A genealogy still recorded every branch, not only the famous ones.

Every name mattered enough to preserve, even without a story.

👶 Four sons of Naarah

🤐 None appears again

📋 Every branch was recorded

📖 Names mattered without a story

## 💍 And The Sons Of Helah Were Zereth And Jezoar And Ethnan

Helah was Ashur's other wife, alongside Naarah.

Three more sons are named through her line.

Two wives, two separate lists, kept the whole family clear.

Chronicles wanted no branch of Judah left out.

💍 Helah was Ashur's other wife

👶 Three sons through her line

📋 Two wives, two clear lists

📖 No branch was left out

## 👤 Coz Begat Anub And Zobebah And The Families Of Aharhel

Coz begins a new branch, separate from Ashur's own family.

Aharhel is named as the son of a man called Harum.

Little else is known about this particular family line.

Chronicles still gave it a permanent place in the record.

👨‍👩‍👧 A new family branch begins

👤 Aharhel was Harum's son

❓ Little else is known

📖 Still given a permanent record

# FirstChronicles 4:9-10
# 🙏 Jabez's Honorable Name And Prayer
---
## ⏸️ Jabez Was More Honourable Than His Brethren

This short story interrupts a long list of names for a reason.

Jabez stands out here as unusually honorable among his own brothers.

Chronicles rarely pauses its genealogies to tell an actual story.

When it does stop like this, the moment is worth noticing.

⏸️ The genealogy pauses here

🌟 Jabez stood out as honorable

📜 Chronicles rarely tells stories

📖 A pause here signals importance

## 😢 His Mother Called His Name Jabez Saying Because I Bare Him With Sorrow

Jabez sounds like the Hebrew word for sorrow or pain.

His own mother named him after the hard pain of his birth.

Ancient names often described the exact moment a child arrived.

Carrying a name like that every day was not a small thing.

😢 Jabez sounds like sorrow

👩 His mother named him after pain

📛 Names described the moment of birth

📖 He carried that name daily

## 🙏 Oh That Thou Wouldest Bless Me

Jabez opens his prayer with a bold, direct request for blessing.

He does not soften the request or apologize for asking.

A name built on sorrow did not stop him from asking boldly.

Sincere prayer does not require polished or careful language.

🙏 A bold, direct opening request

😢 His name was built on sorrow

🗣️ He did not soften the ask

📖 Sincere prayer does not need polish

## 🗺️ And Enlarge My Coast

Coast here does not mean an ocean shoreline at all.

It means the borders of the land Jabez's family controlled.

Jabez is asking God to expand his family's territory and influence.

This request reaches beyond blessing alone into real, practical growth.

🗺️ Coast means land border here

📈 He asked for more territory

🙏 A bold request to God

📖 Blessing led to real growth

## ✋ And That Thine Hand Might Be With Me

God's hand being with someone is an Old Testament picture of active help.

Jabez wanted more than success alone.

He wanted God's ongoing presence with him.

Real security, in Jabez's mind, came from God's hand, not just land.

✋ God's hand means His help

🙏 He wanted presence, not success

🛡️ Land alone offered no security

📖 Security came from God's hand

## 🛡️ That Thou Wouldest Keep Me From Evil That It May Not Grieve Me

Jabez's final request was protection from evil and its pain.

Grieve here means the sorrow and pain that evil can cause.

His own name was already built on sorrow from before he was born.

He was asking God to keep that same pain from following him.

🛡️ He asked for protection from evil

😢 Grieve means sorrow and pain

📛 His name was built on sorrow

📖 He asked the pain to stop

## ✅ And God Granted Him That Which He Requested

Jabez's whole prayer is answered in this one short line.

A single honest prayer earned three full verses in Scripture.

Most names in this chapter get no story at all.

Jabez shows a sincere prayer to God is never wasted.

✅ The prayer was fully answered

📜 Three verses for one prayer

🤐 Most names get no story

📖 A sincere prayer was never wasted

# FirstChronicles 4:11-12
# 🏘️ Eshton's Family And The Men Of Rechah
---
## 👨‍👩‍👧 Chelub The Brother Of Shuah Begat Mehir Which Was The Father Of Eshton

This verse traces four generations in a single short line.

Chelub, Mehir, and Eshton each connect one father to the next.

Shuah is named only to identify Chelub as his brother.

Genealogies often used a brother's name just to place someone correctly.

👨‍👩‍👧 Four generations in one line

🔗 Each name links to the next

👥 Shuah just identifies Chelub

📖 Names placed people correctly

## 🏠 Eshton Begat Bethrapha And Paseah And Tehinnah The Father Of Irnahash

Bethrapha likely means house of healing in the original language.

Names like this often described a family's trade or reputation.

Irnahash may point to a town whose name meant city of the serpent.

Even strange sounding names usually carried a real, understandable meaning.

🏠 Bethrapha may mean house of healing

🐍 Irnahash may mean city of serpent

🏷️ Names described trade or reputation

📖 Strange names still had meaning

## 🗺️ These Are The Men Of Rechah

Rechah was likely the name of a small town or district.

No other verse in the Bible mentions this place again.

The men named just before this line apparently lived there.

A single unexplained place name can still mark a real location.

🗺️ Rechah was likely a town

🔎 Never mentioned elsewhere

👥 These men lived there

📖 A real, if unknown, place

# FirstChronicles 4:13-15
# ⚔️ Othniel's Line And Caleb Son Of Jephunneh
---
## ⚔️ The Sons Of Kenaz Othniel And Seraiah

This Othniel is the same man who becomes Israel's first judge.

Judges chapter three tells how he defeats a foreign king and rescues Israel.

He also marries Caleb's own daughter Achsah earlier in the story.

A name in a list here connects directly to a real hero.

⚔️ Othniel becomes Israel's first judge

📜 Judges three tells his rescue

💍 He married Caleb's daughter

📖 A list name, a real hero

## 👶 And The Sons Of Othniel Hathath

Othniel's own son Hathath is named here with no further story.

Many sons in this chapter appear only once, then disappear entirely.

Being the son of a famous judge guaranteed no fame of his own.

Chronicles still recorded him simply because he belonged to the family.

👶 Hathath was Othniel's son

🤐 No further story given

⚔️ Fame was not inherited

📖 Recorded simply for belonging

## 👶 And Meonothai Begat Ophrah

Meonothai and his son Ophrah get only this one bare mention.

Ophrah shares its name with a town mentioned elsewhere in the Bible.

The Bible often reuses place names for people.

Not every name needs a big story to belong in the record.

👶 Meonothai and Ophrah named briefly

🏘️ Ophrah shares a town's name

🔁 Names often reused for places

📖 A brief mention still counts

## 🔨 Seraiah Begat Joab The Father Of The Valley Of Charashim For They Were Craftsmen

Charashim is the Hebrew word for craftsmen or skilled workers.

This valley of craftsmen was likely named for the trade practiced there.

Joab is called its father because his family founded or led that trade.

The text even explains its own name, since craftsmen means Charashim.

🔨 Charashim means craftsmen

🏞️ The valley took its trade's name

👨‍🏭 Joab led that trade

📖 The text explains its own name

## 🕵️ The Sons Of Caleb The Son Of Jephunneh Iru Elah And Naam

This Caleb is not the same Caleb son of Hezron from chapter two.

Caleb son of Jephunneh is the famous spy from the book of Numbers.

He was one of only two spies who trusted God to take the land.

Chronicles keeps both men named Caleb straight by naming their fathers.

❓ A different Caleb than chapter two

🕵️ This Caleb was the famous spy

🙌 He trusted God over fear

📖 Fathers' names kept them straight

## 🔁 And The Sons Of Elah Even Kenaz

Elah is Caleb's own son, named just above this line.

Kenaz here is Elah's son, sharing a name used earlier in the chapter.

Reused names across a family were common in ancient Israel.

Context, not the name alone, tells the reader which man is meant.

👶 Kenaz was Caleb's grandson

🔁 The name repeats from earlier

📛 Reused names were common

📖 Context tells them apart

# FirstChronicles 4:16-20
# 👑 More Sons Of Judah And An Egyptian Princess
---
## 🗺️ The Sons Of Jehaleleel Ziph And Ziphah Tiria And Asareel

Ziph names both a man here and a place in the wilderness of Judah.

David later hides in that same wilderness of Ziph.

He was fleeing from King Saul at the time.

The men of Ziph even betray David's location to Saul twice.

🗺️ Ziph names a wilderness region

🏃 David later hid there

⚠️ Men of Ziph betrayed him

📖 One name, person and place

## 🙋 The Sons Of Ezra Were Jether And Mered And Epher And Jalon

This Ezra is not the famous priest who later leads Israel home from exile.

The name Ezra simply means helper in the original Hebrew language.

Four sons are named here, all otherwise unknown in Scripture.

A shared name did not always mean a shared story.

❓ Not the famous priest Ezra

📛 Ezra means helper

👶 Four otherwise unknown sons

📖 Same name, different story

## 👩 Miriam And Shammai And Ishbah The Father Of Eshtemoa

Miriam here is a different woman from Moses's famous sister.

Naming a daughter after a beloved figure was common in Israel.

Eshtemoa was a real town later given to the priestly tribe of Levi.

A single family list can quietly touch a much larger map.

👩 A different Miriam than Moses's sister

📛 Naming after beloved figures was common

🏘️ Eshtemoa was a real town

📖 Small lists touch a larger map

## 📛 His Wife Jehudijah Bare Jered The Father Of Gedor

Jehudijah is not a normal personal name in the Hebrew text.

The word simply means the Jewess, or the Jewish woman.

Mered had more than one wife, so this title told them apart.

Calling her the Jewess also sets up a clear contrast with Bithiah.

📛 Jehudijah means the Jewess

💍 Mered had more than one wife

🔀 The title told the wives apart

📖 It contrasts her with Bithiah

## 👑 These Are The Sons Of Bithiah The Daughter Of Pharaoh Which Mered Took

Bithiah was an actual Egyptian princess, Pharaoh's own daughter.

Mered, a man from Judah's tribe, married her at some point.

Her name in Hebrew likely means daughter of the Lord.

An outsider from Egypt's royal house became part of Israel's own family.

👑 Bithiah was Pharaoh's daughter

💍 She married Mered of Judah

📛 Her name means daughter of the Lord

📖 An outsider joined Israel's family

## 🔀 The Sons Of His Wife Hodiah The Sister Of Naham

Hodiah may be yet another name for the same wife called Jehudijah.

Ancient Hebrew often gave one woman more than one recorded name.

Naham is named only to identify whose sister Hodiah was.

Small connecting details like this held the family record together.

👩 Possibly the same wife as Jehudijah

📛 One woman, more than one name

👥 Naham identifies her family

📖 Small details held it together

## 🏰 The Father Of Keilah The Garmite And Eshtemoa The Maachathite

Keilah was a walled town David later rescues from a Philistine raid.

Garmite and Maachathite simply describe which smaller clan a man belonged to.

These labels worked much like a modern last name tied to a hometown.

A brief note here quietly sets up a much bigger rescue story later.

🏰 Keilah was a walled town

🛡️ David later rescues Keilah

📛 Garmite names a smaller clan

📖 A note sets up a later story

## 👤 The Sons Of Shimon Amnon And Rinnah Benhanan And Tilon

This Shimon is a different man from Simeon, Jacob's own son.

His sons round out one more small branch of Judah's family.

None of these four names appears again anywhere else in Scripture.

Chronicles kept every branch, famous or not, in its permanent record.

👤 A different man than Simeon

👶 Four sons named here

🤐 None appears again

📖 Every branch kept in the record

## 📕 And The Sons Of Ishi Were Zoheth And Benzoheth

Ishi here is simply another Judahite family head, not a famous figure.

Zoheth and Benzoheth appear only this once in the whole Bible.

This verse quietly closes out Judah's long genealogy for the chapter.

Simeon's own genealogy begins in the very next verse.

👤 Ishi was a family head

🤐 Named only this once

📕 Closes Judah's genealogy section

📖 Simeon's genealogy begins next

# FirstChronicles 4:21-23
# 🧵 Shelah's Line, Linen Workers, And Potters
---
## 👶 The Sons Of Shelah The Son Of Judah

Shelah was Judah's third son, born through his wife Bathshua.

Genesis thirty eight tells how Shelah was withheld from marrying Tamar.

That broken promise led Tamar to trick Judah into fathering Pharez instead.

This short line still gives Shelah's own descendants their rightful place.

👶 Shelah was Judah's third son

📜 Genesis 38 tells his story

💔 A broken promise involved Tamar

📖 His own line still counted

## 🧵 The Families Of The House Of Them That Wrought Fine Linen

Wrought fine linen means they wove high quality cloth from flax.

This family became known as skilled linen weavers for many generations.

Fine linen was expensive and often used for priestly garments.

A trade could define an entire family's identity in ancient Israel.

🧵 Wrought means skillfully made

👘 Fine linen was costly cloth

⛪ Often used for priestly garments

📖 Trade defined family identity

## 👤 Jokim And The Men Of Chozeba And Joash And Saraph

These four names open a short, obscure branch of Shelah's family.

Chozeba is likely just another spelling of the town Achzib in Judah.

None of these men is ever mentioned again in Scripture.

Chronicles still gave this small, forgotten branch its own place.

👤 Four names from Shelah's line

🏘️ Chozeba likely means Achzib

🤐 Never mentioned again

📖 A forgotten branch, still recorded

## 🗺️ Who Had The Dominion In Moab And Jashubilehem And These Are Ancient Things

This line describes a family that once ruled or settled inside Moab.

Moab was a foreign nation east of the Dead Sea, often hostile to Israel.

Ancient things simply means this record came from very old sources.

The chapter does not explain further exactly how this rule happened.

🗺️ Moab was a foreign nation

👑 This family once ruled there

📜 Ancient things means an old source

📖 The details are not explained

## 🏺 These Were The Potters And Those That Dwelt Among Plants And Hedges

Potters were craftsmen who shaped clay into jars, bowls, and other vessels.

Plants and hedges likely describes gardens near where these potters lived.

Naming a trade inside a genealogy was not unusual in this book.

Judah's family included farmers, weavers, and skilled craftsmen alike.

🏺 Potters shaped clay vessels

🌿 They lived near gardens

🔨 Trades appear inside genealogies

📖 Judah's family held many trades

## 👑 There They Dwelt With The King For His Work

These craftsmen worked directly for the king, not for themselves alone.

Kings needed steady supplies of pottery, cloth, and other everyday goods.

Working for the royal household could offer real security and steady income.

A trade family's skill quietly served the whole nation's daily needs.

👑 They worked for the king

🏺 Kings needed steady goods

💰 Royal work brought security

📖 Their skill served the nation

# FirstChronicles 4:24-27
# 👥 The Sons Of Simeon
---
## 🔀 The Sons Of Simeon Were Nemuel And Jamin Jarib Zerah And Shaul

The genealogy now shifts away from Judah to a different son of Jacob.

Simeon was Jacob's second son, born through his wife Leah.

Genesis forty six names six sons of Simeon instead of five here.

Two of the names here, Jarib and Zerah, do not appear in that older list at all.

🔀 The focus shifts to Simeon

👶 Simeon was Jacob's second son

📜 Genesis 46 lists six sons, not five

📖 Even genealogies did not always match

## 🔗 Shallum His Son Mibsam His Son Mishma His Son

This line moves straight down four generations from Shaul.

Each name is simply father to son, one after another.

No extra detail is given about any of these three men.

A bare line like this still preserved the family's continuity.

👨‍👩‍👧 Four generations, father to son

🔗 One straight line down

❓ No extra detail given

📖 Continuity was still preserved

## 🔗 And The Sons Of Mishma Hamuel His Son Zacchur His Son Shimei His Son

The line continues three more generations past Mishma.

Shimei, the last name here, becomes the focus of the very next verse.

Chronicles often narrows a wide list down to one key figure.

That narrowing is exactly what happens here with Shimei.

🔗 Three more generations listed

🎯 Shimei becomes the focus next

📉 The list narrows to one man

📖 A pattern used often in Chronicles

## 👨‍👩‍👧‍👦 Shimei Had Sixteen Sons And Six Daughters

Twenty two children is an unusually large family, even for this book.

Shimei's own household stands out sharply against the rest of Simeon's tribe.

Large families like this often reflected multiple wives working together.

The very next line explains exactly why this size stood out.

👨‍👩‍👧‍👦 Twenty two children total

📈 An unusually large family

💍 Likely multiple wives involved

📖 Its size sets up the next line

## 📉 His Brethren Had Not Many Children Neither Did All Their Family Multiply Like To The Children Of Judah

Simeon's tribe as a whole grew far more slowly than Judah's did.

Jacob's own blessing in Genesis forty nine predicted Simeon would be scattered.

Genesis said Simeon's family would be divided and spread among the other tribes.

This slow growth is that old prophecy quietly playing out generations later.

📉 Simeon grew slowly overall

🔮 Genesis 49 predicted this

🌍 Simeon would be scattered

📖 Prophecy playing out over time

# FirstChronicles 4:28-33
# 🏙️ Simeon's Cities And Villages
---
## 🏙️ They Dwelt At Beersheba And Moladah And Hazarshual

Beersheba was a major southern city, tied to Abraham and Isaac before this.

Simeon's tribe settled inside land that technically belonged to Judah's larger territory.

Joshua nineteen explains that Judah's share was simply too large for one tribe.

Simeon received cities carved directly out of Judah's own inheritance.

🏙️ Beersheba was a major city

🗺️ Simeon settled inside Judah's land

📜 Joshua 19 explains this arrangement

📖 A tribe within a tribe

## 🏘️ And At Bethuel And At Hormah And At Ziklag

Ziklag becomes far more famous later, long after this list was written.

A Philistine king named Achish later gives Ziklag to David as a hideout.

David used Ziklag as his base during his years fleeing King Saul.

A quiet name in a list here becomes a major setting later.

🏘️ Ziklag appears here first

🏃 David later hides there

👑 Achish gave it to him

📖 A quiet name, later famous

## ⏳ These Were Their Cities Unto The Reign Of David

This phrase marks when this particular list stopped being accurate.

Something changed about these cities once David became king.

The text does not say exactly what changed or why.

A small phrase like this hints at history the chapter leaves out.

⏳ The list stops at David's reign

🔄 Something changed after that

❓ The reason is not given

📖 A hint of unwritten history

## 🔢 Etam And Ain Rimmon And Tochen And Ashan Five Cities

Five separate villages are simply counted and named here together.

Naming and counting mattered because these cities marked real tribal boundaries.

Boundaries like these decided who owned land, water, and grazing rights.

A careful list protected a tribe's actual claim to its own territory.

🔢 Five villages counted here

🗺️ Boundaries were marked by cities

💧 Land and water rights mattered

📖 Lists protected tribal claims

## 🔗 These Were Their Habitations And Their Genealogy

This list ties two things together on purpose.

Where a family lived and who they were proved the same thing.

For Simeon's tribe, land and family history were never separate.

This whole section exists to settle exactly what Simeon's family could claim.

🔗 Land and family are linked

🏡 Belonging proved through land

📜 The record settled real claims

📖 Place and identity, tied together

# FirstChronicles 4:34-38
# 📜 The Princes Of Simeon's Families
---
## 👤 And Meshobab And Jamlech And Joshah The Son Of Amaziah

These names open a new list of family leaders within Simeon's tribe.

None of these men is mentioned anywhere else in the Bible.

Chronicles still gave each one a permanent place in this record.

A name recorded once still mattered enough to be written down.

👤 New leaders named here

🤐 None appears elsewhere

📋 Still permanently recorded

📖 One mention still mattered

## 🔗 And Joel And Jehu The Son Of Josibiah The Son Of Seraiah The Son Of Asiel

This single line stacks four generations back to back.

Genealogies sometimes used a long father chain to prove a claim.

Naming that many ancestors showed this family's lineage was solid.

A long chain like this was a mark of credibility, not filler.

🔗 Four generations stacked here

✅ Long chains proved lineage

📜 A mark of credibility

📖 Not filler, but proof

## 👥 And Elioenai And Jaakobah And Jeshohaiah And Asaiah And Adiel And Jesimiel And Benaiah

Seven more princes are simply listed here, one after another.

None of these seven becomes significant anywhere else in the Bible.

A list this long shows how many leaders Simeon's growing clans needed.

Growth, not fame, is the real point of a list like this.

👥 Seven more princes named

🤐 None becomes significant later

📈 Shows Simeon's real growth

📖 Growth was the real point

## 👑 These Mentioned By Their Names Were Princes In Their Families

Princes here does not mean sons of a king, the way it usually sounds.

It means leaders or heads of their own smaller family clans.

A long chain of names just before this verse names these very men.

Every name in that chain led up to this one summary line.

👑 Princes means clan leaders

❌ Not sons of a king

🔗 A long chain led here

📖 One line for many names

## 📈 And The House Of Their Fathers Increased Greatly

This short line explains why so many princes needed naming at all.

Simeon's smaller clans were growing large enough to need real leadership.

Growth like this required more structure, not just more names.

Even a scattered tribe, as Genesis predicted, could still grow strong in parts.

📈 Their families grew large

🏛️ Growth required real leadership

🔮 Even a scattered tribe grew

📖 Strength within a scattered tribe

# FirstChronicles 4:39-41
# 🌿 Simeon Moves To Gedor
---
## 🐑 They Went To The Entrance Of Gedor Even Unto The East Side Of The Valley

Simeon's growing families needed more room than their original cities offered.

This entrance of Gedor sat on the east side of a valley.

This Gedor is likely a different place than the Gedor named earlier in Judah's line.

A growing tribe simply needed new ground to settle.

🐑 Simeon needed more room

🗺️ Sat on a valley's east side

❓ Likely a different Gedor

📖 A tribe seeking new ground

## 🌾 They Found Fat Pasture And Good And The Land Was Wide And Quiet And Peaceable

Fat pasture simply means rich, healthy grazing land for animals.

Wide, quiet, and peaceable describes a place with plenty of open room.

There was no real conflict there to fight over.

Finding land like this was a genuine answer to a real need.

Not every chapter in the Bible ends in war or hardship.

🌾 Fat pasture means rich land

🕊️ Wide and peaceable, no conflict

✅ A real answer to their need

📖 Not every story ends in hardship

## 👨‍👩‍👧 For They Of Ham Had Dwelt There Of Old

They of Ham refers to descendants of Ham, one of Noah's three sons.

Ham's descendants had settled this land long before Simeon ever arrived.

The Bible often links Ham's family line to Egypt and Canaan's peoples.

This detail quietly explains who actually lived here before Simeon moved in.

👨‍👩‍👧 They of Ham means Ham's descendants

📜 Noah's son Ham started this line

🗺️ Linked to Egypt and Canaan

📖 Explains who lived there first

## 👑 Those Written By Name Came In The Days Of Hezekiah King Of Judah

This action happened during Hezekiah's reign, generations after the earlier city list.

Hezekiah was one of Judah's most faithful kings, known for major reform.

Simeon's expansion into new land happened under a strong king's watch.

The timing here was likely not an accident.

👑 Happened under King Hezekiah

✅ Hezekiah was a faithful reformer

📈 Simeon expanded during his reign

📖 The timing was likely not chance

## ⚔️ And Smote Their Tents And The Habitations That Were Found There

This was not a peaceful move into empty, unclaimed land.

Simeon's men fought and drove out the people already living there.

Tents suggest these Hamite groups still lived a partly nomadic lifestyle.

Israel's own conquest of Canaan was still quietly continuing generations later.

⚔️ This was not a peaceful move

🏕️ Tents suggest a nomadic people

🗡️ Simeon drove the residents out

📖 Conquest continued generations later

## 🏠 And Destroyed Them Utterly Unto This Day And Dwelt In Their Rooms

Unto this day means the writer's own time, long after this actually happened.

Dwelt in their rooms simply means Simeon settled into that very same land.

This detail is not a celebration of violence for its own sake.

It is proof that God's old promise of land was still being fulfilled.

📅 Unto this day means the writer's time

🏠 Simeon settled into that land

❌ Not a celebration of violence

📖 Proof God's promise was fulfilled

# FirstChronicles 4:42-43
# 🏔️ Simeon Defeats The Last Of The Amalekites
---
## 🏔️ Even Of The Sons Of Simeon Five Hundred Men Went To Mount Seir

Mount Seir was the mountainous homeland of Edom, Esau's own descendants.

Five hundred men marching there was a real military expedition, not a migration.

Naming an exact number shows Chronicles cared about precise, verifiable details.

This detail also confirms Simeon's tribe was still active generations later.

🏔️ Mount Seir was Edom's land

⚔️ A real military expedition

🔢 An exact number given

📖 Proof Simeon stayed active

## 👥 Having For Their Captains Pelatiah And Neariah And Rephaiah And Uzziel

Four named captains led this expedition, all sons of the same man, Ishi.

Naming actual leaders, not just a tribe, made this record feel like real history.

These four names appear nowhere else in the entire Bible.

A single military campaign still earned a permanent place in Scripture.

👥 Four captains, sons of Ishi

📜 Named leaders felt like real history

🤐 Never mentioned elsewhere

📖 One campaign, permanently recorded

## ⚔️ And They Smote The Rest Of The Amalekites That Were Escaped

The rest that escaped points back to King Saul's earlier war with Amalek.

First Samuel fifteen tells how Saul was commanded to destroy Amalek completely.

Saul disobeyed and let some Amalekites survive that first campaign.

Generations later, Simeon quietly finished the job Saul had left undone.

👑 Points back to Saul's war

📜 First Samuel 15 tells that story

⚠️ Saul left the task unfinished

📖 Simeon finished what Saul left undone

## 🏡 And Dwelt There Unto This Day

This short closing line ends the chapter on quiet, lasting settlement.

A tribe once told it would be scattered found solid ground here.

Genesis forty nine's old prophecy about Simeon was not the whole story.

Even scattered, this family still found a real and lasting home.

🏡 The chapter ends in settlement

🔮 The prophecy was not the whole story

🕊️ Even scattered, they found a home

📖 A lasting place despite the prophecy
`.trim();

export const FIRST_CHRONICLES_FOUR_PERSONAL_SECTIONS = parseFirstChroniclesFourRawNotes(FIRST_CHRONICLES_FOUR_RAW_NOTES);
