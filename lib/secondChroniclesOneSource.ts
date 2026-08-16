export type SecondChroniclesOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesOneRawNotes(rawText: string): SecondChroniclesOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 1:${startVerse}` : `2 Chronicles 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Chronicles 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_ONE_RAW_NOTES = `# SecondChronicles 1:1-6
# 👑 Solomon Worships At Gibeon
---
## 👑 Strengthened In His Kingdom

Solomon's throne was not secure by default.

His older brother Adonijah had already tried to take it first.

David had ordered several dangerous rivals dealt with before he died.

This verse marks the moment those threats were finally behind Solomon.

Strengthened here describes real political security, not just a feeling of confidence.

👑 Strengthened means real political security

⚔️ Adonijah had tried to take the throne

🗡️ David ordered rivals dealt with first

📖 Solomon's throne was finally secure

## 📈 Magnified Him Exceedingly

To magnify someone means to make them great in the eyes of others.

This is not Solomon promoting himself.

God is the one doing the magnifying here.

The result was a king respected far beyond Israel's own borders.

Later chapters show foreign rulers like the queen of Sheba traveling to see that greatness firsthand.

📈 Magnified means made great

🙌 God is the one who magnifies

🌍 Respect would reach beyond Israel

📖 God's blessing built Solomon's reputation

## ⚔️ Captains Of Thousands And Of Hundreds

A captain of thousands led a unit of a thousand soldiers.

A captain of hundreds led a smaller unit inside that same structure.

Judges settled legal disputes among the people.

The chief of the fathers were the heads of Israel's family clans.

Solomon called every layer of leadership together for this trip, not just his inner circle.

⚔️ Captains led military units

⚖️ Judges settled legal disputes

👴 Chiefs of the fathers led family clans

📖 Solomon gathered every layer of leadership

## ⛰️ The High Place That Was At Gibeon

A high place was an elevated site used for worship and sacrifice.

Gibeon sat several miles northwest of Jerusalem.

Most high places in Israel's later history became sites of forbidden idol worship.

This one was different.

It legitimately held the tabernacle, the tent where God's presence had dwelled since the days of Moses.

⛰️ A high place is an elevated worship site

🗺️ Gibeon sat near Jerusalem

🚫 Most high places later turned to idols

📖 This one legitimately held the tabernacle

## ⛺ Which Moses The Servant Of The LORD Had Made In The Wilderness

The tabernacle was the portable tent Israel used for worship before the temple existed.

Moses built it centuries earlier, right after Israel left Egypt.

That means this exact tent had traveled through the wilderness and the conquest of Canaan.

It was still standing in Solomon's day.

Its presence at Gibeon connected Solomon directly back to Moses and the very beginning of Israel's worship.

⛺ The tabernacle was Israel's portable worship tent

📜 Moses built it after the Exodus

🕰️ It had survived for centuries

📖 It linked Solomon back to Moses

## 📦 The Ark Of God Had David Brought Up From Kirjathjearim

The ark was the gold covered chest that held the stone tablets of the law.

It represented God's throne and presence among His people.

David had already moved the ark itself to Jerusalem years earlier.

That means the ark and the tabernacle tent were sitting in two different cities at the same time.

Worship in Israel was, for this brief period, split between two locations.

📦 The ark held the tablets of the law

👑 It represented God's presence and throne

🏙️ David had moved it to Jerusalem

📖 Worship was split across two cities

## 🔥 Offered A Thousand Burnt Offerings Upon It

A burnt offering was completely consumed by fire on the altar.

None of the meat was kept back or eaten, unlike some other offering types.

A thousand of them at once was an extraordinary act, not a normal act of devotion.

This was Solomon starting his reign fully devoted to God, before he ever asked God for anything.

🔥 A burnt offering was fully consumed

🍖 No meat was kept back

🔢 A thousand offerings was extraordinary

📖 Solomon gave before he asked

# SecondChronicles 1:7-13
# 💭 Solomon Asks For Wisdom
---
## 🌙 In That Night Did God Appear Unto Solomon

God spoke to Solomon directly, most likely through a dream.

This was not a vague feeling or a quiet prompting.

It was a real, personal encounter.

God's opening question had no limit attached to it.

Ask what I shall give thee left the request completely open.

🌙 God appeared to Solomon at night

💬 This was a direct encounter

🎁 The offer had no stated limit

📖 God invited an honest request

## 📝 Hast Shewed Great Mercy Unto David My Father

Shewed is an old spelling of showed.

Solomon opens his answer with thanks, not with a request.

He points back to God's kindness toward his father David across David's whole reign.

Naming that history first shows real gratitude before asking for anything.

📝 Shewed is an old spelling of showed

🙏 Solomon opens with gratitude

👴 He points to God's kindness to David

📖 Thankfulness came before the request

## 🌍 A People Like The Dust Of The Earth In Multitude

This phrase is an old way of saying too many people to count.

It echoes God's own promise to Abraham back in Genesis.

There, God said Abraham's descendants would be as many as the dust of the earth.

Solomon is quietly reminding God of that centuries old promise.

He is asking God to keep being faithful to it now, in his own generation.

🌍 Dust of the earth means too many

📜 It echoes God's promise to Abraham

🔁 Solomon recalls that old promise

📖 He asks God to stay faithful to it

## 🚪 That I May Go Out And Come In Before This People

Go out and come in is an old idiom for leading a nation.

It has nothing to do with literally walking through a door.

The phrase covers the daily work of governing, judging, and leading an army.

Solomon is not asking for an easy life.

He is asking for the practical skill to actually do the job well.

🚪 Go out and come in means to lead

⚖️ It covers judging a people

🪖 It also covers leading in war

📖 Solomon asked for practical skill

## 💰 Hast Not Asked Riches, Wealth, Or Honour, Nor The Life Of Thine Enemies

God lists exactly what Solomon could have asked for and did not.

Riches and wealth would have made him personally comfortable.

Honour would have made him famous.

The life of his enemies would have let him remove every rival by name.

Solomon skipped every one of those tempting requests.

💰 Riches and wealth were on the table

🏆 Honour was on the table too

🗡️ He could have named his enemies

📖 Solomon skipped every tempting option

## ✅ Wisdom And Knowledge Is Granted Unto Thee

God gives Solomon exactly what he asked for.

Then God adds far more than Solomon requested.

Riches, wealth, and honour beyond any king before him or after him.

Asking for the right thing first did not mean Solomon missed out on everything else.

✅ God grants the wisdom requested

➕ God adds riches on top

👑 No king before or after compares

📖 The right request was not a sacrifice

## 🏙️ Reigned Over Israel

This short line closes out the trip to Gibeon.

Solomon returns from the high place to his own capital city.

The wisdom he just received did not stay a private conversation between him and God.

It would immediately be put to work.

The very next events in Solomon's story put that wisdom on public display.

🏙️ Solomon returns to Jerusalem

💭 The wisdom would not stay private

⚖️ It would soon be tested publicly

📖 God's gift moved straight into action

# SecondChronicles 1:14-17
# 🐎 Solomon's Chariots, Horses, And Wealth
---
## 🛡️ A Thousand And Four Hundred Chariots, And Twelve Thousand Horsemen

These numbers describe a massive military buildup.

Chariots functioned like ancient tanks, giving a huge advantage in open battle.

Twelve thousand horsemen formed a large standing cavalry force for this era.

This buildup was part of what God had just promised Solomon, wealth and power beyond any king before him.

🛡️ Chariots functioned like ancient tanks

🐎 Twelve thousand horsemen formed his cavalry

💪 This was a massive military buildup

📖 It fulfilled part of God's promise

## 🏰 Which He Placed In The Chariot Cities

Chariot cities were fortified towns built specifically to house and supply chariot forces.

Spreading them out across the kingdom meant Solomon could respond quickly no matter where a threat appeared.

This was organized military planning, not just a large stockpile sitting in one place.

🏰 Chariot cities housed military forces

🗺️ They were spread across the kingdom

⚡ This allowed a quick response anywhere

📖 Planning mattered as much as size

## 💰 Silver And Gold At Jerusalem As Plenteous As Stones

This is deliberate exaggeration, not a literal inventory count.

Silver and gold are described as common as the stones lying on the ground.

Cedar trees, normally rare and imported, are described as common as ordinary sycomore trees.

The point is not a precise count of anything.

The point is that Solomon's wealth had become almost impossible to measure.

💰 This is deliberate exaggeration

🪨 Silver was described like common stones

🌲 Cedar was described like common sycomore

📖 Wealth had become hard to measure

## 🐎 Solomon Had Horses Brought Out Of Egypt

This sounds like a simple trade deal on the surface.

Egypt was known for producing strong, well trained horses, so buying from there made practical sense.

There is real tension hiding underneath this detail.

Long before this, Deuteronomy warned Israel's future kings about exactly this pattern.

A king was not to multiply horses for himself or send people back to Egypt to get them.

Solomon's growing wealth was starting to bump against a boundary God had already set.

🐎 Egypt was known for strong horses

📈 Buying there made practical sense

📜 Deuteronomy warned against this pattern

📖 Solomon's growth pushed against a limit

## 🧵 The King's Merchants Received The Linen Yarn At A Price

Linen yarn was a valuable textile material, used to make fine cloth.

Solomon's merchants were official royal traders, not private business owners.

Buying the yarn at a set price kept the trade organized and profitable for the crown.

Solomon's wealth was not only inherited or given to him.

Part of it came from running an actual trade network.

🧵 Linen yarn was a valuable textile

👑 Merchants worked for the crown

💵 Trade was organized and profitable

📖 Wealth also came from trade

## ⚖️ A Chariot For Six Hundred Shekels Of Silver, And An Horse For An Hundred And Fifty

A shekel was a unit of weight used to measure silver, not a coin like modern money.

Six hundred shekels for a single chariot was a steep price.

A horse alone cost a hundred and fifty shekels.

These exact numbers show this was a real, tracked economy, not vague wealth.

⚖️ A shekel measured silver by weight

🚗 A chariot cost six hundred shekels

🐎 A horse cost a hundred fifty

📖 These were real, tracked prices

## 🌍 Brought They Out Horses For All The Kings Of The Hittites, And For The Kings Of Syria

The Hittites and Syrians were major powers north of Israel.

Solomon was not only buying chariots and horses for his own army.

He was reselling them to these northern kings for a profit.

Israel had become a trade middleman between Egypt and the powers to the north.

Solomon's wealth was strategic, not just given to him.

🌍 The Hittites and Syrians were major powers

💱 Solomon resold horses for profit

🔁 Israel became a trade middleman

📖 Solomon's wealth was strategic, not just given
`.trim();

export const SECOND_CHRONICLES_ONE_PERSONAL_SECTIONS = parseSecondChroniclesOneRawNotes(SECOND_CHRONICLES_ONE_RAW_NOTES);
