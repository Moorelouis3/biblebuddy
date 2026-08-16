export type SecondChroniclesFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesFiveRawNotes(rawText: string): SecondChroniclesFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 5:${startVerse}` : `2 Chronicles 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 5 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_FIVE_RAW_NOTES = `# SecondChronicles 5:1
# 🏛️ The Work Is Finished
---
## 🏗️ All The Work That Solomon Made For The House Of The LORD Was Finished

This single line closes years of construction work.

Solomon spent about seven years building the temple Chapters two through four just described.

Every measurement, every piece of bronze and gold, is finally in place.

The story now turns from building the house to filling it with God's presence.

🏗️ Building work is now complete

📖 About seven years of construction

🎉 Chapters two through four now close

➡️ Attention shifts to filling the house

---

## 🗡️ Solomon Brought In All The Things That David His Father Had Dedicated

These were not ordinary gifts David happened to save.

David dedicated captured plunder from his wars to the LORD instead of keeping it for himself.

First Chronicles eighteen already describes silver and gold David took from defeated nations for this purpose.

Solomon simply added those decades old treasures into the temple's own storage.

🗡️ David dedicated plunder from his wars

💰 First Chronicles eighteen names this silver and gold

🏛️ Solomon added it to temple storage

📖 Old victories now enrich God's house

---

## 🏦 The Silver, And The Gold, And All The Instruments, Put He Among The Treasures Of The House Of God

This phrase points to dedicated storage rooms built into the temple itself.

First Kings describes side chambers built around the temple's outer walls for exactly this.

Every valuable object collected across two building projects finally has one home.

Nothing sat scattered anymore once the temple doors were ready.

🏦 Treasures means dedicated storage rooms

🧱 First Kings describes side chambers for this

📦 Every valuable object now has one home

📖 Scattered gifts finally found their place

# SecondChronicles 5:2-3
# 👴 Gathering For The Feast
---
## 👑 Solomon Assembled The Elders Of Israel, And All The Heads Of The Tribes, The Chief Of The Fathers

These three titles do not describe three separate crowds.

Elders were respected older leaders who guided each town or tribe.

Heads of the tribes and chief fathers were the same leaders described from different angles.

Solomon called Israel's full leadership, not the whole nation, to witness this moment first.

👴 Elders were respected local leaders

👑 Heads of tribes led each tribe

👨‍👩‍👧 Chief fathers led extended families

📖 Israel's full leadership gathered first

---

## 🏰 Unto Jerusalem, To Bring Up The Ark Of The Covenant Of The LORD Out Of The City Of David, Which Is Zion

The city of David refers to the oldest, fortified section of Jerusalem.

David had captured this hill from the Jebusites and made it his home.

He had kept the ark there in a tent ever since Second Samuel six.

Now, decades later, the ark finally leaves that tent for a permanent house.

🏰 City of David means Jerusalem's oldest hill

⚔️ David captured it from the Jebusites

⛺ The ark had lived there in a tent

📖 The tent now gives way to the temple

---

## 📅 The Feast Which Was In The Seventh Month

The seventh month on Israel's calendar was called Tishri.

Tishri held the Feast of Tabernacles, a week long harvest celebration.

First Kings says the temple had already stood finished for almost a year by then.

Solomon still waited so the dedication would land inside a feast crowds already knew.

📅 Seventh month means the month Tishri

🌾 It held the Feast of Tabernacles

⏳ The temple had waited nearly a year

📖 Solomon timed it to the feast

---

## 👥 All The Men Of Israel Assembled Themselves Unto The King

Verse two named only Israel's leaders.

This verse widens the crowd to every man in the nation.

Unto the king shows Solomon standing at the center of this whole ceremony.

The builder of the house now leads the nation in dedicating it.

👥 Verse two named leaders only

🌍 This verse widens it to everyone

👑 The king stood at the center

📖 The builder now leads the dedication

# SecondChronicles 5:4-6
# 🐑 Bringing Up The Ark
---
## 📜 The Levites Took Up The Ark

This detail is not a small logistical note.

The law required only Levites to carry the ark, using poles through its rings.

First Chronicles thirteen already showed what went wrong when a cart carried it instead.

This time the ark moves exactly the way God commanded from the start.

📜 Only Levites were allowed to carry it

🪵 Poles through rings kept hands off it

⚠️ Chapter thirteen showed the cart disaster

📖 This time the law was followed

---

## ⛺ The Tabernacle Of The Congregation, And All The Holy Vessels

Tabernacle of the congregation refers to the original tent Moses built at Sinai.

That tent had stood at Gibeon this whole time, separate from David's tent for the ark.

Every vessel still used from that older, portable place of worship moved into the temple too.

This one trip retired the entire wilderness worship system for good.

⛺ Tabernacle of the congregation means Moses's original tent

🗺️ It had stood separately at Gibeon

🏺 Its vessels moved in with the ark

📖 This retired the wilderness worship system

---

## 👳 These Did The Priests And The Levites Bring Up

Priests and Levites were not the same group.

Priests were the specific descendants of Aaron allowed near the holiest objects.

Levites were the wider tribe who assisted with the rest of the work.

Moving the tabernacle's furnishings safely took both groups working together.

👳 Priests were Aaron's specific descendants

🧑‍🤝‍🧑 Levites were the wider assisting tribe

🤝 Both groups worked this move together

📖 Different roles served one shared task

---

## 🐑 Sacrificed Sheep And Oxen, Which Could Not Be Told Nor Numbered For Multitude

This sacrifice was not measured because it genuinely could not be counted.

So many animals were offered that record keepers gave up trying to total them.

First Kings describes this same moment using the identical phrase for scale.

The dedication opened with generosity too large for anyone to number.

🐑 Sheep and oxen were offered by then

🔢 Nobody could total the actual count

📜 First Kings records the same detail

📖 Generosity opened this whole dedication

# SecondChronicles 5:7-10
# 🕊️ The Ark Enters The Oracle
---
## 🕍 To The Oracle Of The House, Into The Most Holy Place

Oracle here means the innermost room of the temple, the Most Holy Place.

Only the high priest could enter that room, and only once a year.

The ark's final resting spot was the most restricted space in all of Israel.

Everything built across three chapters was leading toward this one exact room.

🕍 Oracle means the innermost holy room

🚫 Only the high priest could enter

🔒 The most restricted space in Israel

📖 Three chapters of building led here

---

## 🗿 Even Under The Wings Of The Cherubims

These cherubims are the two carved figures built back in chapter three.

Each one stood about fifteen feet tall inside the most holy place.

Their wings stretched wide enough to meet in the middle of the room.

The ark now sat directly beneath that spread of golden wings.

🗿 These cherubims were built in chapter three

📏 Each stood about fifteen feet tall

🪽 Their wings met above the room

📖 The ark sat beneath their wings

---

## 🪽 The Cherubims Covered The Ark And The Staves Thereof Above

The wings did not just decorate the room.

They stretched out until they fully covered both the ark and its carrying poles.

Nothing about the ark's resting place was left exposed or plain.

The most valuable object in Israel now sat shielded beneath solid gold wings.

🪽 Wings covered both the ark and poles

🚫 Nothing was left exposed or plain

✨ Solid gold shielded the ark completely

📖 Even the covering carried real design

---

## 🪵 The Ends Of The Staves Were Seen From The Ark Before The Oracle

Staves were the wooden poles slid through the ark's rings for carrying it.

Priests pulled them out slightly so their tips showed just inside the holy place.

Someone standing right outside the oracle's curtain could see those tips.

Anyone standing farther back in the temple could not see them at all.

🪵 Staves were the ark's carrying poles

👀 Their tips showed just inside the room

🚪 Invisible from farther back in the temple

📖 A small detail placed with real care

---

## 🕰️ And There It Is Unto This Day

This small phrase is a clue about when this book was actually written.

The author is saying the staves still sat exactly that way at the time of writing.

That means Chronicles was written well after Solomon's own lifetime.

A tiny detail like this quietly dates the whole record.

🕰️ This phrase hints at the writing date

✍️ The author wrote well after Solomon

🔍 A tiny detail carries real historical weight

📖 It quietly dates the whole record

---

## 📜 The Two Tables Which Moses Put Therein At Horeb

The two tables were the stone slabs holding the Ten Commandments.

Horeb is another name for Mount Sinai, used often in Deuteronomy.

By this point, nothing else remained inside the ark, not manna, not Aaron's rod.

Only the covenant document itself had survived the centuries inside it.

📜 The two tables held the Ten Commandments

🏔️ Horeb is another name for Sinai

🚫 No manna or rod remained inside

📖 Only the covenant itself had survived

---

## 🏔️ When The LORD Made A Covenant With The Children Of Israel, When They Came Out Of Egypt

This line ties the ark straight back to the Exodus story.

The covenant at Sinai came right after Israel left slavery in Egypt.

Centuries later, that same covenant document still sat inside this exact box.

The temple in Jerusalem now held the oldest promise in Israel's history.

🏜️ This ties the ark back to Egypt

🏔️ The covenant came right after the Exodus

📦 That document still sat in the ark

📖 The temple held Israel's oldest promise

# SecondChronicles 5:11-12
# 🎺 Priests And Singers United
---
## 🧼 All The Priests That Were Present Were Sanctified

Sanctified means set apart and made ceremonially clean for this specific service.

Priests normally purified themselves before their own scheduled turn to serve.

For this occasion, every single priest prepared himself, whether it was his turn or not.

The scale of the moment called for every priest to be ready at once.

🧼 Sanctified means ceremonially made clean

📅 Priests usually purified only for their turn

👥 Every priest prepared for this occasion

📖 The moment called for all of them

---

## 🔄 Did Not Then Wait By Course

Course refers to the normal rotation dividing priests into scheduled shifts.

First Chronicles twenty four already laid out that whole rotation system in detail.

For this one dedication, the rotation was set aside completely.

Every priest served together instead of waiting for his assigned week.

🔄 Course means the priests' scheduled rotation

📚 Chapter twenty four laid out that system

⏸️ The rotation paused for this one day

📖 Every priest served together at once

---

## 🎵 Of Asaph, Of Heman, Of Jeduthun, With Their Sons And Their Brethren

Asaph, Heman, and Jeduthun were the three worship leaders David appointed years earlier.

First Chronicles twenty five already describes David organizing their families into musical divisions.

Their sons and brothers carried on that same family assignment here.

Temple music was not random.

It ran through these three appointed families.

🎵 Asaph, Heman, Jeduthun led music under David

📚 Chapter twenty five set up their families

👨‍👦 Sons and brothers continued that assignment

📖 Temple music ran through appointed families

---

## 🎻 Being Arrayed In White Linen, Having Cymbals And Psalteries And Harps

Psalteries were stringed instruments similar to a small harp.

White linen marked the singers as ceremonially clean for this service.

That matches the same purity idea already explained for the priests in verse eleven.

Cymbals, psalteries, and harps combined into one coordinated musical group.

🎻 Psalteries were small stringed harps

🤍 White linen marked ceremonial purity

🔁 This matches verse eleven's priests

📖 Music and purity moved together here

---

## 🎺 An Hundred And Twenty Priests Sounding With Trumpets

One hundred twenty priests blew trumpets together at this single moment.

That is a massive number of trumpeters for one ceremony.

Trumpets in temple worship signaled celebration, not danger or war.

This much sound was meant to be impossible to ignore.

🎺 A hundred twenty priests blew trumpets

📯 A massive number for one ceremony

🎉 Trumpets here signaled celebration, not war

📖 The sound was impossible to ignore

# SecondChronicles 5:13-14
# ☁️ The Cloud Fills The House
---
## 🎶 The Trumpeters And Singers Were As One, To Make One Sound

Hundreds of musicians did not simply play at the same time.

They were as one means every instrument and voice landed together, perfectly timed.

That kind of unity took real practice, not a lucky coincidence.

One sound rose from the temple instead of hundreds of separate ones.

🎶 Hundreds of musicians played as one

⏱️ Every voice and note landed together

🎯 That unity took real practice

📖 One sound rose from many people

---

## 🔁 For He Is Good, For His Mercy Endureth For Ever

This exact line was not invented for this moment.

It is a set worship refrain that appears throughout the Psalms, including Psalm one hundred thirty six.

Singers across Israel's history used these same words to open and close worship.

A familiar phrase gave hundreds of voices one shared script to sing.

🔁 Psalm one hundred thirty six repeats it

🎤 It gave every voice a shared script

🙌 A familiar line united a huge crowd

📖 This refrain runs throughout the Psalms

---

## ☁️ The House Was Filled With A Cloud, Even The House Of The LORD

This was not an ordinary cloud drifting in from outside.

It was the visible sign of God's own presence, sometimes called the glory cloud.

The same cloud appeared when Moses finished the wilderness tabernacle in Exodus forty.

God was confirming something nobody in the room could miss.

He was fully accepting this new house as His own.

☁️ Not an ordinary weather cloud

✨ The visible sign of God's presence

⛺ The same cloud filled Exodus forty's tabernacle

📖 God confirmed He accepted this house

---

## 😮 The Priests Could Not Stand To Minister By Reason Of The Cloud

God's presence was not just visible.

It was physically overwhelming.

Trained priests, mid ceremony, had to stop because they could not keep working.

The same thing happened centuries earlier when Moses could not even enter the finished tabernacle.

The chapter closes with the temple now full of God Himself.

😮 God's presence physically overwhelmed the priests

⏸️ Trained priests had to stop working

⛺ The same happened to Moses at the tabernacle

📖 The temple was now full of God
`.trim();

export const SECOND_CHRONICLES_FIVE_PERSONAL_SECTIONS = parseSecondChroniclesFiveRawNotes(SECOND_CHRONICLES_FIVE_RAW_NOTES);
