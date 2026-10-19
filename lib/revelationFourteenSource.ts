export type RevelationFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationFourteenRawNotes(rawText: string): RevelationFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 14:${startVerse}` : `Revelation 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Revelation 14 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_FOURTEEN_RAW_NOTES = `# Revelation 14:1-5
# 🐑 The Lamb And The Hundred Forty And Four Thousand
---
## 🐑 A Lamb Stood On The Mount Sion

The Lamb here is Jesus, already pictured this way many times earlier in Revelation.

Mount Sion is another name for Jerusalem, the city built on God's chosen hill.

The beast in the last chapter was last seen standing on the sand of the sea.

The Lamb now stands on solid, chosen ground instead.

One picture is instability.

The other is permanence.

🐑 Lamb pictures Jesus here

⛰️ Mount Sion means Jerusalem

🌊 The beast stood on shifting sand

📖 The Lamb stands on chosen ground

---

## 🔢 An Hundred Forty And Four Thousand

This same number already appeared earlier in Revelation chapter seven.

There it named a group sealed from every tribe of Israel.

The number pictures the complete, counted people of God.

It is likely symbolic rather than a literal headcount.

Either way, this group belongs to God completely.

🔢 This number names a sealed group

📜 Chapter seven first introduced them

🧮 The number pictures completeness

📖 This group belongs to God

---

## 🏷️ His Father's Name Written In Their Foreheads

This mark goes on the same body part the beast used in chapter thirteen.

The beast stamped its followers with a mark of ownership there.

God marks his own people with a name there instead.

A name pictures identity and belonging, not a label.

Everyone's forehead eventually carries one claim or the other.

🏷️ A name marks true belonging

👹 The beast marked foreheads too

🙌 God marks his people instead

➡️ Every forehead carries one claim

---

## 🌊 The Voice Of Many Waters

This same picture already described Jesus's own voice in chapter one.

Many waters means a huge, roaring ocean or waterfall.

The sound pictures something vast and impossible to ignore.

Heaven's worship here is loud, not quiet or timid.

🌊 Many waters means a roaring ocean

🔊 The sound is huge and loud

🗣️ Jesus's voice sounded this way too

📖 Heaven's worship here is loud

---

## 🎵 Harpers Harping With Their Harps

Harps already appeared earlier in Revelation as an instrument of heavenly worship.

A harper is simply someone who plays the harp.

This phrase repeats the same word three times on purpose, for emphasis.

The whole scene is built entirely around worship, not noise for its own sake.

🎵 Harpers means harp players

🔁 The phrase repeats on purpose

🙏 Harps already pictured worship before

📖 This whole scene centers on worship

---

## 🎶 They Sung As It Were A New Song

A new song already appeared in Revelation chapter five, before the throne.

New here points to a song that could not be sung before this moment happened.

Only people who have lived through something specific can genuinely sing about it.

This song belongs only to those who were actually redeemed.

🎶 A new song appeared before too

🆕 New means never sung before now

🙋 Only the redeemed can sing it

📖 This song belongs to the redeemed

---

## 💰 Which Were Redeemed From The Earth

Redeemed means bought back at a price, like a slave purchased out of slavery.

Revelation chapter five already named the price as Jesus's own blood.

From the earth means pulled out of a world living apart from God.

This song can only be sung by people who know they were bought.

💰 Redeemed means bought back

🩸 Jesus's own blood paid the price

🌍 They were pulled from the world

📖 Only the bought can sing this

---

## 🤍 Not Defiled With Women, For They Are Virgins

This phrase is symbolic, not a literal rule about marriage or sex.

Virgins here pictures total faithfulness, the opposite of spiritual adultery.

Later chapters in Revelation picture Babylon as an unfaithful woman.

This group stands opposite that picture completely.

Their loyalty to God never wavered, not even once.

🤍 Virgins pictures total faithfulness

💔 Babylon pictures unfaithfulness later on

🙌 This group stands opposite Babylon

📖 Their loyalty never wavered once

---

## 🧭 These Are They Which Follow The Lamb Whithersoever He Goeth

Whithersoever is an old word meaning wherever, no matter the direction.

Following here means complete, ongoing obedience, not a one time decision.

This group does not pick and choose which commands to keep.

Their defining mark is total devotion, not perfection.

🧭 Whithersoever means wherever he goes

🐑 Following pictures total obedience

🙅 They do not pick commands

📖 Their mark is total devotion

---

## 🌾 Being The Firstfruits Unto God And To The Lamb

Firstfruits was the first and best portion of a harvest, given to God.

Old Testament law required Israel to offer this portion before using the rest.

Calling this group firstfruits suggests more are still to come later.

They are the first installment of a much larger harvest.

🌾 Firstfruits means the harvest's first portion

📜 Old Testament law required this offering

➡️ More people are still to come

📖 They are the first of many

---

## 🗣️ In Their Mouth Was Found No Guile

Guile means deceit, or deliberately misleading someone.

This group's words matched their hearts completely.

They are also called without fault before God's throne in this same verse.

Without fault here means declared clean by God, not self made perfection.

Their blamelessness was given to them, not earned by them.

🗣️ Guile means deceit or lying

💯 Their words matched their hearts

🧼 Without fault means declared clean

📖 Their blamelessness was a gift

# Revelation 14:6-8
# 📢 Two Angels Announce Judgment And Babylon's Fall
---
## 📯 Having The Everlasting Gospel To Preach

Gospel means good news, the same word used throughout the New Testament.

Everlasting means this news never changes and never expires.

This angel preaches to every nation, kindred, tongue, and people on earth.

No person anywhere is left without a chance to hear it.

📯 Gospel means good news

♾️ Everlasting means it never changes

🌍 Every nation gets to hear it

📖 No one is left out

---

## 🙏 Fear God, And Give Glory To Him

Fear here means deep reverence and awe, not simple terror.

Giving glory means recognizing out loud who truly deserves honor.

This call goes out right as final judgment is beginning.

Even at the very end, the invitation to turn to God still stands.

🙏 Fear means deep reverence here

👑 Glory means honoring who deserves it

⏳ This call comes right at the end

📖 The invitation still stands even now

---

## ⏰ For The Hour Of His Judgment Is Come

The hour marks a specific, appointed turning point, not a vague future.

Judgment here means God actively settling accounts with the whole earth.

This announcement signals the story is now moving toward its conclusion.

What was promised for ages is finally arriving.

⏰ The hour means an appointed time

⚖️ Judgment means settling accounts

📣 This signals the story's turn

📖 What was promised is arriving

---

## 🌌 Worship Him That Made Heaven, And Earth, And The Sea, And The Fountains Of Waters

This list names every part of the created world at once.

The call is to worship the Creator, not anything he created.

Chapter thirteen already showed a beast demanding worship for himself instead.

True worship always points back to who actually made everything.

🌌 This list names the whole creation

🙌 Worship belongs to the Creator

👹 The beast demanded worship instead

📖 Worship points back to the Maker

---

## 🏙️ Babylon Is Fallen, Is Fallen

Babylon pictures a proud, corrupt world power opposed to God.

Saying it twice copies the style of old prophets announcing certain judgment.

This news is announced here even though it has not fully happened yet.

In God's plan, Babylon's end is already as good as settled.

🏙️ Babylon pictures corrupt world power

🔁 Saying it twice shows certainty

📜 Old prophets announced news this way

📖 Babylon's end is already settled

---

## 🍷 The Wine Of The Wrath Of Her Fornication

Fornication here is a picture, not a literal report about marriage.

It pictures unfaithfulness to God, the same picture used for idol worship.

Wine pictures intoxication, something that spreads and affects everyone who drinks it.

Babylon's corruption spread the same way, pulling whole nations along with it.

💔 Fornication pictures unfaithfulness to God

🍷 Wine pictures spreading intoxication

🌍 Whole nations got pulled in

📖 Her corruption spread like wine

# Revelation 14:9-13
# ⚠️ A Warning Against The Mark, And Rest For The Dead
---
## 👹 If Any Man Worship The Beast And His Image

Chapter thirteen already explained this beast and the image built to honor him.

This third angel now speaks the warning out loud, plainly, for everyone.

No one who hears this message can claim they were never told.

God's warnings always come before his judgments, never after.

👹 This beast was explained in chapter thirteen

📣 The warning is spoken plainly here

👂 No one can say they were not told

📖 Warnings always come before judgment

---

## 🍷 Without Mixture Into The Cup Of His Indignation

Wine in that culture was often mixed with water to soften it.

Without mixture means this cup is served at full, undiluted strength.

Indignation means righteous anger, not a loss of control.

God's judgment here is not softened or held back in any way.

🍷 Wine was usually mixed with water

💯 Without mixture means full strength

😠 Indignation means righteous anger

📖 This judgment is not softened

---

## 🔥 Tormented With Fire And Brimstone

Brimstone is an old word for sulfur, a substance that burns with a strong smell.

Fire and brimstone already appeared in the story of Sodom and Gomorrah.

That same pairing of words signals total, final destruction here too.

This judgment echoes the most severe judgment the Bible already recorded.

🔥 Brimstone is an old word for sulfur

🏙️ Sodom faced this same pairing before

💥 It signals total destruction

📖 This echoes the Bible's worst judgment

---

## 👀 In The Presence Of The Holy Angels, And In The Presence Of The Lamb

This judgment happens openly, witnessed rather than hidden away somewhere.

The Lamb who died to save people also watches this moment happen.

Nothing about this judgment is secret or carried out quietly.

Every choice made on earth eventually gets witnessed in heaven.

👀 This judgment is witnessed, not hidden

🐑 The Lamb himself watches it happen

🤫 Nothing here stays secret

📖 Earthly choices get witnessed in heaven

---

## 💨 The Smoke Of Their Torment Ascendeth Up For Ever And Ever

Smoke rising pictures something still ongoing, not a single quick moment.

For ever and ever emphasizes that this outcome never reaches an end.

This is one of the most sobering pictures in the whole book.

Scripture states this plainly instead of softening it for comfort.

💨 Rising smoke pictures something ongoing

♾️ For ever and ever means no end

😨 This is a sobering picture

📖 Scripture states this plainly

---

## ⏳ Here Is The Patience Of The Saints

Patience here means staying faithful while suffering continues without relief.

Saints simply means ordinary believers set apart for God.

This same phrase already appeared in chapter thirteen's description of hard times.

Enduring through a hard season is itself a form of faith.

⏳ Patience means staying faithful while suffering

🙏 Saints means ordinary believers

🔁 Chapter thirteen already used this phrase

📖 Endurance itself is a form of faith

---

## ✝️ Blessed Are The Dead Which Die In The Lord

This blessing comes right after describing the fate of those who worship the beast.

Dying in the Lord means dying while still trusting and following God.

The timing of this statement is deliberate, placed right beside its opposite.

One fate ends in torment.

The other ends in blessing.

✝️ Dying in the Lord means dying faithful

⚖️ This sits right beside the opposite fate

🙏 The placement here is deliberate

📖 One fate ends, the other blesses

---

## 😌 That They May Rest From Their Labours, And Their Works Do Follow Them

Rest here means relief after a long life of hard, faithful work.

Labours means the daily effort and hardship of following God on earth.

Works following them means their faithful lives still matter after death.

Nothing done faithfully for God is ever truly wasted.

😌 Rest means relief after hard work

💪 Labours means daily faithful effort

📜 Their works still matter after death

📖 Faithful work is never wasted

# Revelation 14:14-16
# 🌾 The Son Of Man Reaps The Harvest
---
## 👤 One Sat Like Unto The Son Of Man

Son of man is a title both Daniel and Jesus himself used often.

It points directly to Jesus, now pictured in his role as final judge.

This is the same Jesus already seen earlier in Revelation as the Lamb.

The one who died to save is also the one who judges.

👤 Son of man points to Jesus

📜 Daniel used this title too

🐑 He is also the Lamb

📖 The Savior is also the judge

---

## 👑 A Golden Crown

A crown pictures real authority and the right to rule.

Earlier in Revelation, other crowns were offered or claimed by other figures.

This crown belongs to the one who actually holds final authority.

Every false claim to a crown eventually meets this real one.

👑 A crown pictures real authority

🎭 Other figures claimed crowns earlier

✅ This crown holds true authority

📖 Every false crown meets this one

---

## 🌾 A Sharp Sickle

A sickle is a curved farming tool used to cut down grain at harvest.

In the Bible, harvest often pictures the end of an age or season.

Jesus himself used harvest this way in his own teaching.

A sickle in his hand means the appointed ending has arrived.

🌾 A sickle cuts grain at harvest

📖 Harvest pictures the end of an age

🗣️ Jesus used this picture too

➡️ The appointed ending has arrived

---

## 🌾 The Harvest Of The Earth Is Ripe

Ripe means fully ready, not a moment early or late.

This harvest pictures gathering God's people at exactly the right time.

Nothing about the timing here is random or rushed.

God's timing is always exact, even when it feels delayed to us.

🌾 Ripe means fully ready now

⏳ The timing is exact, not early

🎯 This gathers God's own people

📖 God's timing is never rushed

---

## 🌾 The Earth Was Reaped

This short line describes the harvest actually being completed.

Grain harvests in the Bible usually picture a gathering of God's people, not judgment.

A different harvest, the grape harvest, comes next with a very different meaning.

This gathering is completed before the next, harder scene even begins.

🌾 This harvest is now complete

🙌 Grain harvests picture God's people

🍇 A different harvest comes next

📖 One gathering ends before the next begins

# Revelation 14:17-20
# 🍇 The Angel Gathers The Grapes Of Wrath
---
## 🍇 He Also Having A Sharp Sickle

This is now the second sickle introduced in this same chapter.

The first sickle gathered grain.

This one is about to gather grapes instead.

Both tools look the same, but they picture two different harvests.

One harvest gathers God's people.

The other gathers judgment.

🌾 The first sickle gathered grain

🍇 This sickle will gather grapes

🔁 Both tools look identical

📖 One gathers people, one gathers judgment

---

## 🔥 Which Had Power Over Fire

This angel comes from the altar, the same place prayers were pictured rising earlier.

Fire at the altar already pictured God answering his people's prayers for justice.

This angel's role connects directly back to those earlier prayers.

The prayers of suffering believers are not forgotten in this book.

🔥 This angel comes from the altar

🙏 The altar already pictured prayers rising

⚖️ This connects to those same prayers

📖 Suffering prayers are not forgotten

---

## 🍇 Gather The Clusters Of The Vine Of The Earth

Clusters means bunches of grapes, ready and grouped together on the vine.

The vine of the earth pictures humanity's wickedness grown to its full extent.

This is a harvest of judgment, the opposite of the grain harvest before it.

What grew in rebellion is now gathered for exactly that reason.

🍇 Clusters means grouped bunches of grapes

🌍 This vine pictures earth's wickedness

⚖️ This harvest is judgment, not blessing

📖 What grew in rebellion gets gathered

---

## 🍇 For Her Grapes Are Fully Ripe

Ripe here means wickedness has reached its full, appointed measure.

This is the same word used earlier for the grain harvest, but with the opposite meaning.

God waits for the right moment before he acts, even in judgment.

Nothing here happens a single moment too early.

🍇 Ripe means wickedness is fully grown

🔁 The same word picked the grain harvest

⏳ God waits for the right moment

📖 Nothing here happens too early

---

## 🍷 The Great Winepress Of The Wrath Of God

A winepress was a stone pit used to crush grapes by stomping on them.

This same picture already appeared in the prophets Isaiah and Joel.

Crushing grapes into wine becomes a picture for crushing judgment.

An ordinary harvest tool becomes a picture of God's final judgment.

🍷 A winepress crushed grapes by foot

📜 Isaiah and Joel used this picture

⚖️ Crushing pictures God's judgment

📖 An ordinary tool pictures final judgment

---

## 👣 Trodden Without The City

Trodden means trampled or crushed underfoot.

Without the city means outside Jerusalem's walls, not inside them.

Judgment happening outside the city echoes other judgments pictured the same way.

Even the location of this scene carries meaning.

👣 Trodden means trampled underfoot

🏙️ Without means outside the city

🔁 Other judgments used this same picture

📖 Even the location carries meaning

---

## 🐎 Blood Came Out Of The Winepress, Even Unto The Horse Bridles

This is vivid, exaggerated imagery, common in this kind of ancient writing.

A horse bridle sits near the animal's mouth, high off the ground.

The picture stresses the sheer scale of this judgment, not an exact measurement.

Apocalyptic writing often paints in extremes to make its point land.

🐎 A bridle sits high on a horse

📏 This pictures scale, not a measurement

✍️ Ancient writing often used extremes

📖 Extremes here make the point land

---

## 📏 A Thousand And Six Hundred Furlongs

A furlong was an ancient measure of distance, about one eighth of a mile.

Sixteen hundred furlongs adds up to about the length of the land of Israel.

Many scholars believe this number pictures the whole land, not one exact spot.

This judgment reaches the full length of the land, start to finish.

📏 A furlong is about an eighth mile

🗺️ This distance spans the whole land

🤔 Many scholars read this as symbolic

📖 Judgment reaches the land, start to finish
`.trim();

export const REVELATION_FOURTEEN_PERSONAL_SECTIONS = parseRevelationFourteenRawNotes(REVELATION_FOURTEEN_RAW_NOTES);
