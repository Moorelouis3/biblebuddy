export type EzekielTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyEightRawNotes(rawText: string): EzekielTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 28:${startVerse}` : `Ezekiel 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 28 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_EIGHT_RAW_NOTES = `# Ezekiel 28:1-5
# 💔 The Prince Of Tyrus Boasts
---
## 👑 I Am A God, I Sit In The Seat Of God

The prince of Tyrus was the human ruler of a rich island trading city, not a spirit or a myth.

He believed his own success proved he was divine.

Tyre sat on a rocky island just off the coast, guarded by water on every side.

That natural defense made the king feel completely untouchable.

God flatly answers that claim before judging anything else about him.

👑 Tyre was a rich island trading city
🌊 Water on every side felt like protection
💔 Its king boasted of being a god
📖 God answers the claim before judging the sin

## 💔 Thine Heart Is Lifted Up

Lifted up is an old way of describing pride.

It does not mean literal height.

It means a heart that has grown proud enough to stop depending on God.

The prince of Tyrus had every reason by his own measure to feel proud.

His city was rich, secure, and admired across the ancient world.

Pride like that always blinds a person to their own limits.

💔 Lifted up means proud
🙈 Pride blinds a person to limits
🏙️ Tyre was rich and admired everywhere
➡️ Confidence in riches replaced trust in God

## 📜 Thou Art Wiser Than Daniel

Daniel was a real person, a Hebrew prophet already famous in Ezekiel's own time for wisdom no one could match.

God says the prince of Tyrus believed even Daniel's wisdom fell short of his own.

That is not a compliment.

It shows exactly how far this king's pride had grown.

No secret could be hidden from him, or so he believed.

📜 Daniel was a real, famous prophet
👑 The king claimed greater wisdom
💔 Pride like this runs deep
📖 No human wisdom actually reaches that far

## 🧠 With Thy Wisdom And With Thine Understanding Thou Hast Gotten Thee Riches

This city's wealth came from real skill, not luck.

Tyre's merchants and sailors were famous across the ancient world for sharp trading.

Gold and silver piled up in its treasuries from decades of successful deals.

Skill like that can be a gift from God or a trap, depending on who gets the credit.

The king took all the credit for himself.

🧠 Real skill built this wealth
🚢 Tyre's traders were famous everywhere
🏦 Gold and silver filled the treasuries
➡️ Skill becomes a trap without credit to God

## ⚓ By Thy Great Wisdom And By Thy Traffick Hast Thou Increased Thy Riches

Traffick means trading, buying and selling goods by sea and by land.

Tyre was not a farming nation or a military conqueror.

Its entire economy ran on moving goods between other nations for profit.

The more that trade grew, the more the king's own pride grew with it.

Wealth and pride rose together in this city, step by step.

⚓ Traffick means trade, not crime
🚢 Tyre's whole economy ran on trade
📈 Trade and pride grew together here
📖 Riches without humility become dangerous

# Ezekiel 28:6-10
# ⚔️ Judgment On The Proud Prince
---
## ⚔️ Strangers Upon Thee, The Terrible Of The Nations

Strangers here means foreign invaders, a nation outside Tyre's own people.

Many scholars connect this directly to Babylon's king Nebuchadnezzar, who laid siege to Tyre not long after this prophecy.

The terrible of the nations means a feared, ruthless army.

Their swords fall on something unusual, the beauty of Tyre's wisdom itself, not just its walls.

A city proud of its cleverness is about to be humbled by force.

⚔️ Strangers means a foreign invading army
🏺 Many scholars connect this to Babylon
😨 Terrible of the nations means a feared army
➡️ Pride in wisdom could not stop swords

## ✨ Defile Thy Brightness

Brightness here means Tyre's shining reputation and splendor.

To defile something means to ruin it and make it unclean.

This city had been admired for its beauty and wealth across the ancient world.

That shine is about to be stripped away completely.

Reputation built on riches can be lost as fast as it was gained.

✨ Brightness means Tyre's shining reputation
💥 Defile means to ruin and make unclean
🏙️ The city was once widely admired
📖 Riches cannot protect a reputation forever

## ⚰️ Bring Thee Down To The Pit

The pit is an old way of describing the grave, the place of the dead.

Tyre pictured itself sitting safely in the middle of the sea, untouchable.

Instead, the king dies the same violent death as sailors lost in those same waters.

The sea that once protected the city becomes the place of its downfall.

What felt like safety turns out to be no safety at all.

⚰️ The pit means the grave
🌊 Tyre trusted the sea for safety
⚔️ The king dies a violent death instead
➡️ False safety still ends in judgment

## 🔁 Wilt Thou Yet Say Before Him That Slayeth Thee, I Am God

This question throws the king's own boast from verse two back at him.

He claimed divine status while alive and powerful.

God asks if he will dare repeat that claim while actually dying.

No one facing real death can convince themselves they control life.

Pride that sounds confident in comfort rarely survives contact with real danger.

🔁 This repeats the king's own boast
⚔️ It is asked at the moment of death
💔 Death exposes every false claim
📖 Real danger reveals what pride cannot survive

## 🔪 Die The Deaths Of The Uncircumcised

Uncircumcised marked someone as outside God's covenant people in the Old Testament.

For an Israelite reader, dying that kind of death meant dying without honor or covenant standing.

The king of Tyre was never part of that covenant to begin with.

Naming his death this way is a final insult, not a literal description of his body.

It tells the reader exactly how shameful and godless this death truly was.

🔪 Uncircumcised marked someone outside the covenant
💀 This death carried no honor
🌍 The king was never part of Israel's covenant
📖 The label names the shame, not the body

# Ezekiel 28:11-15
# 👑 A Lamentation For The King Of Tyrus
---
## 🎵 Take Up A Lamentation Upon The King Of Tyrus

A lamentation is a formal funeral song, sung to mourn someone as if they were already dead.

God tells Ezekiel to sing one for a king who is still alive and still boasting.

That is a deliberate insult, treating his pride as already finished and buried.

The prince judged in the verses before this one was punished for his own words.

Now the lens widens to call this ruler by his fuller royal title, the king of Tyrus.

🎵 Lamentation means a funeral song
💀 It is sung for a king still alive
💔 Treating pride as already dead is an insult
📖 The title widens from prince to king

## 📏 Sealest Up The Sum, Full Of Wisdom, And Perfect In Beauty

Sealest up the sum is an old idiom meaning the full measure, the complete package, nothing missing.

This king is described as flawless, by every standard his culture valued most.

That description sets up the chapter's real point.

No human ruler, however impressive, actually earns a description like that.

What follows explains exactly where praise like this leads.

📏 Sealest up the sum means the full measure
🧠 Wisdom and beauty are named together
👑 This paints an image of total perfection
➡️ Total perfection in a person never lasts

## 🌳 Thou Hast Been In Eden The Garden Of God

This does not mean a human king literally walked through the Garden of Eden.

The language borrows Eden's glory to describe this being's original splendor.

Many scholars see a deeper picture here, beyond just the human king of Tyre.

The text itself never names that deeper figure directly.

Either way, the picture is the same, beauty that was given, then lost.

🌳 Eden here is a picture, not a visit
👑 It paints an image of great splendor
📚 Many scholars see a deeper layer here
📖 Beauty was given, then it was lost

## 💎 Every Precious Stone Was Thy Covering

This verse names real gemstones, nine of them in a row.

They match the same stones later worn on Israel's high priest breastplate.

Being covered in jewels like this pictures glory given at creation, not earned.

That kind of covering was never about fashion.

It showed the honor this being started with, before anything went wrong.

💎 Nine real gemstones are named
👑 These stones also sit on Israel's priest
✨ The covering pictured pure, given glory
📖 Honor like this was never earned

## 🎼 The Workmanship Of Thy Tabrets And Of Thy Pipes Was Prepared In Thee

Tabrets are small hand drums, and pipes are simple wind instruments.

This line pictures a being created already full of music, built in from the very beginning.

It is not describing a musician who practiced and improved over time.

The gifting itself was part of how this being was made.

Beauty, music, and splendor all came packaged together at creation.

🎼 Tabrets means small hand drums
🎶 Pipes means simple wind instruments
🎵 Music was built in from creation
📖 Every gift here was given, not earned

## 👼 The Anointed Cherub That Covereth

A cherub is a class of angelic being, not the soft winged baby pictured in later art.

Anointed marks this cherub as set apart for a special, honored role.

That covereth likely describes a protective, guarding position close to God's own presence.

The text does not name this being directly.

Scholars are genuinely divided on how literally to read this verse.

What stays clear either way is that an honor once given was not kept.

👼 Cherub means a class of angelic being
🏆 Anointed means set apart for honor
🛡️ Covereth suggests a guarding role
📖 An honored position was given, then lost

## 🔥 In The Midst Of The Stones Of Fire

This does not describe ordinary rocks that happen to glow.

It pictures a dazzling, holy setting near God's own presence, far beyond ordinary experience.

Walked up and down suggests access and freedom to move through that holy space.

That kind of closeness to God was a privilege, not a right anyone could claim.

The next verse explains exactly how that privilege was lost.

🔥 Stones of fire pictures a dazzling, holy place
👣 Walking there meant having real access
🙏 Closeness to God is a privilege
➡️ The next verse explains what was lost

## ⏳ Perfect In Thy Ways From The Day That Thou Wast Created, Till Iniquity Was Found In Thee

Iniquity means sin, specifically sin that twists something that was originally good.

This being did not start out flawed.

Something changed, and that change is named plainly here.

Everything after this verse becomes judgment instead of praise.

Perfection is not permanent just because it was given at creation.

Even the highest created beauty can still choose to turn away from God.

📏 Perfect describes how this began
💔 Iniquity means sin that twists good
⏳ Something changed after creation
📖 Even great beauty can still turn away

# Ezekiel 28:16-19
# 🔥 The Fall Of The Covering Cherub
---
## 💰 By The Multitude Of Thy Merchandise They Have Filled The Midst Of Thee With Violence

Merchandise here points back to trade and gain, the same root sin named earlier for the prince of Tyrus.

The text ties that endless pursuit of gain directly to violence filling this being from the inside.

Gain by itself is not the problem.

Gain chased without limit crowds out everything else, including right and wrong.

The same root sin runs underneath both the human king and the deeper picture behind him.

💰 Merchandise means trade and gain
⚔️ Endless gain filled this being with violence
🔁 This echoes the prince's sin from verse five
📖 One root sin runs through the whole chapter

## 🚫 Cast Thee As Profane Out Of The Mountain Of God

Profane means something treated as unholy, no longer fit for a sacred place.

This being is removed from the holy ground it once had full access to.

Being thrown out of a holy place is a far heavier judgment than simply losing a title.

It means the relationship itself, not just the position, is broken.

What was once welcomed close to God is now pushed away entirely.

🚫 Profane means treated as unholy
⛰️ The mountain of God was once home
💔 This breaks the relationship, not just a title
➡️ Closeness to God can still be lost

## 🎁 Thou Hast Corrupted Thy Wisdom By Reason Of Thy Brightness

Wisdom and beauty were both gifts, named back in the lamentation that opened this section.

Here they become the very things that ruin this being.

Beauty admired too much eventually corrupts the wisdom that should have kept it in check.

A gift is never automatically safe just because it came from God.

How it gets used decides whether it builds or destroys.

🎁 Wisdom and beauty were both gifts
💔 Beauty here corrupted wisdom instead
⚠️ Gifts are not automatically safe
📖 How a gift is used decides everything

## 👀 Lay Thee Before Kings, That They May Behold Thee

This is not an honor.

It means a public, humiliating display, laid out where every other ruler can see exactly how far pride has fallen.

The same beauty once hidden in glory is now exposed as a warning to everyone watching.

Other kings are meant to learn something from watching this fall.

A private sin received a very public judgment.

👀 This display is humiliation, not honor
👑 Other kings are meant to watch and learn
💔 Hidden glory becomes a public warning
➡️ Private pride met public judgment

## 🏛️ Thou Hast Defiled Thy Sanctuaries By The Multitude Of Thine Iniquities

Sanctuaries means holy places, places meant to be set apart for worship.

This being is accused of corrupting the very things meant to stay pure.

The sin is named twice in this one verse, iniquities in general and the sin of trade specifically.

That repeats a sin that plainly points back to the same root problem running through this whole chapter.

Holiness cannot coexist with unlimited greed for long.

🏛️ Sanctuaries means holy, set apart places
💔 This being corrupted its own holy places
🔁 Trade sin is repeated from earlier verses
📖 Holiness cannot coexist with unlimited greed

## ⚰️ Bring Thee To Ashes Upon The Earth

Fire here comes from inside the one being judged, not from an outside attacker.

The very corruption described in this verse becomes the fire that consumes it.

Ashes is the lowest possible image for something once covered in precious stones and fire from God's own presence.

The contrast between where this being started and where it ends is deliberate.

Glory that forgets its source can burn itself out completely.

🔥 The fire comes from inside, not outside
💎 This was once covered in precious stones
⚰️ Ashes is the lowest possible ending
➡️ Glory without God can burn itself out

## 😲 Thou Shalt Be A Terror, And Never Shalt Thou Be Any More

This is a final, permanent ending, not a temporary setback.

Everyone who once admired this being's glory will instead be shocked at how completely it is gone.

The chapter that opened with a boast of being a god closes with total disappearance.

Pride that claims God's place eventually loses even its own place.

What stood as high as Eden ends as low as ashes.

⚰️ This ending is permanent, not temporary
😲 Former admirers are left in shock
💔 A claim to godhood ends in total loss
📖 What rose from Eden fell to ashes

# Ezekiel 28:20-23
# 🌊 Judgment Against Zidon
---
## 🧭 Set Thy Face Against Zidon

Set thy face against is an old way of saying commit fully to delivering a hard message.

Zidon, also spelled Sidon, was Tyre's sister city, another major Phoenician port along the same coast.

The two cities shared trade routes, wealth, and now the same kind of judgment.

Naming Zidon separately shows that Tyre's pride was not a one time problem in that region.

The whole Phoenician coast had grown proud together.

🧭 Set thy face means full commitment
⚓ Zidon was Tyre's sister port city
🤝 Both cities shared trade and wealth
📖 Pride had spread across the whole coast

## 👑 I Will Be Glorified In The Midst Of Thee

This does not mean Zidon will suddenly choose to honor God willingly.

God will be glorified through the judgment itself, whether Zidon agrees with it or not.

Sanctified here means set apart as holy, proven right in front of witnesses who doubted it.

God's reputation does not depend on anyone's permission or approval.

Judgment and glory are not opposites in this verse, they work together.

👑 Glorified does not require Zidon's agreement
⚖️ Sanctified means proven right publicly
🚫 God's reputation needs no one's permission
📖 Judgment and glory work together here

## 🔁 They Shall Know That I Am The LORD

This exact phrase repeats constantly throughout the book of Ezekiel, in judgment and in mercy alike.

It is less a threat and more a promise that God's actions will make His identity unmistakable.

Nations watching Tyre and Zidon fall are meant to draw the same conclusion as the exiled people of Israel.

There is only one true God, and every false claim eventually gets exposed.

The phrase ties this chapter back to the whole book's purpose.

🔁 This phrase repeats throughout Ezekiel
👀 Watching nations are meant to learn from it
🚫 Every false god claim gets exposed
📖 This phrase ties the whole book together

## 🦠 Pestilence, And Blood Into Her Streets

Pestilence means widespread deadly disease, the kind that could wipe out a city from the inside.

Paired with the sword, this verse names two different ways judgment can arrive, sickness and war.

Both were common and deeply feared threats in the ancient world.

Naming them together shows that no single kind of safety could protect Zidon.

A city built around trade routes still could not trade its way out of this judgment.

🦠 Pestilence means widespread deadly disease
⚔️ Sword means judgment by war
😨 Both were common ancient fears
➡️ No trade route could buy safety here

# Ezekiel 28:24-26
# 🌿 A Promise Restored To Israel
---
## 🌿 No More A Pricking Brier Unto The House Of Israel

A brier and a thorn both picture something small that still causes constant, nagging pain.

That is exactly what Israel's neighboring nations, including Tyre and Zidon, had been for years.

This verse promises that pain is coming to an end, not just for one city but for the whole region.

The judgment on Tyre and Zidon in this chapter was never only about those two cities.

It was always part of clearing the way for Israel's own future safety.

🌿 Brier and thorn picture small, constant pain
😤 Neighboring nations had despised Israel for years
🛑 This promises that pain will end
📖 Judgment on Tyre served Israel's future

## 🌍 Gathered The House Of Israel From The People Among Whom They Are Scattered

By Ezekiel's time, Israel had already been conquered and scattered into exile, far from their own land.

This verse promises an actual, physical return, not just a spiritual comfort.

In the sight of the heathen means other nations will watch this gathering happen.

A scattered, defeated people being brought home again was not something those nations expected to see.

God's promises are not quietly kept, they are proven in front of watching eyes.

🌍 Israel was scattered in exile by this point
🏡 This promises an actual return home
👀 Other nations are meant to watch it happen
📖 God proves His promises publicly

## 👤 My Servant Jacob

Jacob here means the whole nation descended from him, not the individual man from Genesis.

Calling the nation by his name recalls the original promise of land given generations earlier.

My servant is a title of honor, even after everything Israel had done to deserve exile.

The relationship was damaged by Israel's own sin, but it was never fully broken from God's side.

A name from Genesis becomes the anchor for a promise still being kept centuries later.

👤 Jacob here means the whole nation
🏞️ The name recalls the original land promise
🏆 My servant is a title of honor
📖 One old promise still anchors this new one

## 🏠 Build Houses, And Plant Vineyards

Building a permanent house and planting a vineyard both take years to pay off.

No one does either one while expecting to be attacked or driven out again soon.

This picture promises long term safety, not just a short pause in the fighting.

The chapter began with Tyre's false confidence in its own wealth.

It ends with Israel's real confidence, resting on God's protection instead.

That is the real difference between the two all along.

🏠 Building a house takes years of safety
🍇 Planting a vineyard means expecting to stay
🛡️ This pictures long term, not temporary peace
📖 Real confidence rests on God, not riches
`.trim();

export const EZEKIEL_TWENTY_EIGHT_PERSONAL_SECTIONS = parseEzekielTwentyEightRawNotes(EZEKIEL_TWENTY_EIGHT_RAW_NOTES);
