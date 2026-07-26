export type ExodusTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyFiveRawNotes(rawText: string): ExodusTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 25:${startVerse}` : `Exodus 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 25 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_FIVE_RAW_NOTES = `# Exodus 25:1-9

# 🎁 Bring Me An Offering

---

## 💛 Every Man That Giveth It Willingly With His Heart Ye Shall Take My Offering

God had just met with Moses on the mountain in chapter 24; now the very next instruction is about building Him a place to stay. But the materials for that place are not to be collected by force or by census tax. Only gifts given willingly count toward the sanctuary, so from the very first verse, worship here is tied to a willing heart, not a required quota.

💛 The offering had to come from a willing heart, not a forced tax

🏕️ This immediately follows the covenant ceremony of chapter 24

🙌 Worship is tied to willingness from the very first instruction

---

## 🥇 Gold, And Silver, And Brass

These three metals are listed in descending value, and that order matters for the whole tabernacle. Gold will cover the innermost, holiest objects like the ark and mercy seat, silver will be used for the sockets that hold the structure together, and brass (properly bronze, a copper alloy) will be used for the outer altar that anyone could approach. The metal used for an object literally marks how close to God's presence that object sits.

🥇 The order gold, silver, brass matches a scale of holiness, not just value

🏛️ Gold goes on the innermost furniture, brass on what sits outside

📏 Where an object sits determines which metal covers it

---

## 🧵 Blue, And Purple, And Scarlet, And Fine Linen, And Goats' Hair

Blue, purple, and scarlet were the most expensive dyes in the ancient world, each one extracted from rare shellfish or insects at enormous cost. Fine linen was tightly woven Egyptian cotton-like cloth, a callback to the very land Israel had just left, now used for something holy instead of Pharaoh's projects. Goats' hair was a coarser, cheaper material used for the outer tent covering, showing that even humble materials had a place in God's house.

🧵 Blue, purple, and scarlet were the three most expensive dyes available

🇪🇬 Fine linen recalls Egypt's famous weaving, now repurposed for worship

🐐 Goats' hair provided the plainer, functional layer of the tent

---

## 🐏 Rams' Skins Dyed Red, And Badgers' Skins, And Shittim Wood

**"Badgers' skins"** is an old translation choice; most scholars now think it means the tough, waterproof hide of a sea creature like a dugong or porpoise, used as a weatherproof outer layer over the tent. **"Shittim wood"** is acacia wood, a hard, dense, naturally rot-resistant timber that grows in the Sinai desert, exactly the kind of wood available to a nation camped in the wilderness and exactly durable enough to last for the tabernacle's centuries of use.

🌊 Badgers' skins likely means tough, waterproof hide, used as protection from weather

🌵 Shittim wood is acacia, a hard desert wood that resists rot

📍 Every material listed was something actually available to Israel in the wilderness

---

## 💍 Onyx Stones, And Stones To Be Set In The Ephod, And In The Breastplate

The **"ephod"** and **"breastplate"** are pieces of the high priest's clothing, not described until Exodus 28. Mentioning them here, three chapters early, shows that God was already planning the whole priestly system before giving a single detail about it, the offering list and the priesthood were designed together from the start.

💍 The ephod and breastplate are priestly garments not detailed until Exodus 28

🧩 Naming them here shows the whole system was planned as one unit

---

## 🏠 Let Them Make Me A Sanctuary; That I May Dwell Among Them

This is the whole reason for the entire tabernacle project stated in a single line. The word **"sanctuary"** simply means a set-apart, holy place. God does not ask for a house because He needs shelter; He asks for one so that His presence can dwell in the middle of the camp, among ordinary people, instead of staying distant on a mountain top they could not approach.

🏠 A sanctuary is simply a set-apart, holy place

🤝 God wants to dwell among the people, not remain distant on the mountain

📖 This one verse is the purpose statement for the next fifteen chapters of instructions

---

## 📐 After The Pattern Of The Tabernacle... Shewed Thee

Moses is told to build according to a **"pattern"** he was shown, meaning God gave him something like a vision or model to copy exactly, not creative freedom to design it himself. Hebrews 8:5 later looks back at this exact verse and says the earthly tabernacle was only "a shadow of heavenly things," a copy of something real that exists in heaven.

📐 A pattern here means an exact model to copy, not free design

☁️ Moses was shown this pattern, likely in vision, during his time on the mountain

🌌 Hebrews 8:5 calls the whole earthly tabernacle a shadow of a heavenly original

# Exodus 25:10-16

# 📦 The Ark Of The Covenant

---

## 📏 Two Cubits And A Half...A Cubit And A Half...A Cubit And A Half

A **"cubit"** was the ancient measurement from an adult's elbow to fingertip, roughly a foot and a half. That makes the ark of the covenant about three feet nine inches long and two feet three inches wide and tall, small enough to be carried by a few men, not a massive structure at all.

📏 A cubit is roughly the length from elbow to fingertip, about a foot and a half

📦 By that measure, the ark was only about 3'9" long and 2'3" wide and tall

🚶 Its small size meant it was portable, carried rather than fixed in place

---

## ✨ Overlay It With Pure Gold, Within And Without

The ark's core was ordinary acacia wood, but it was covered in gold both inside and out, even on surfaces no human being would ever see once it was sealed shut. That detail matters: nothing about this object was meant to be halfway holy or cut corners where nobody was looking.

✨ The wood core was covered in gold on every surface, seen or unseen

👁️ Even the inside, which no one would ever view again once sealed, was still gold

🎯 Nothing about the ark's construction was meant to cut corners

---

## 💍 Cast Four Rings Of Gold... Put Them Into The Rings By The Sides Of The Ark

The rings and staves (long carrying poles) were built into the ark's original design, not added later as an afterthought. Verse 15 goes on to say the staves were never to be removed from the rings, meaning the ark stayed permanently ready to be carried at any moment, since Israel would spend the next forty years as a moving camp.

💍 Rings and carrying staves were part of the ark's original design, not an add-on

🚫 The staves were never to be taken out, so it stayed ready to move at all times

🏕️ This fit a nation that would spend forty years traveling, not settled in one place

---

## 📜 Thou Shalt Put Into The Ark The Testimony Which I Shall Give Thee

**"The testimony"** is another name for the two stone tablets of the Ten Commandments, called that because they testified to, or bore witness of, the covenant agreement made between God and Israel back in chapter 24. This name, "ark of the testimony," becomes one of the ark's most common titles throughout the rest of the Old Testament.

📜 "The testimony" refers to the two stone tablets of the Ten Commandments

⚖️ They are called testimony because they bore witness to the covenant just made

🏷️ "Ark of the testimony" becomes one of the ark's regular titles later in Scripture

# Exodus 25:17-22

# 👼 The Mercy Seat

---

## ✨ Thou Shalt Make A Mercy Seat Of Pure Gold

The **"mercy seat"** was a solid gold slab that served as the lid of the ark, and its Hebrew name is tied to the word for atonement, covering over sin. This is the exact spot where, once a year on the Day of Atonement described in Leviticus 16, the high priest would sprinkle blood to cover the nation's sin for another year.

✨ The mercy seat was a solid gold lid for the ark, not a separate object

🩸 Its name connects to atonement, the covering over of sin

📅 Leviticus 16 describes blood being sprinkled here once a year on the Day of Atonement

---

## 🔨 Two Cherubims Of Gold, Of Beaten Work Shalt Thou Make Them

**"Cherubims"** (the plural form of cherub) are a class of angelic being, not the round-cheeked infants later art would make them into; in Scripture they consistently function as guardians of holy space, the same kind of being placed at the entrance to Eden in Genesis 3:24 after Adam and Sin. **"Beaten work"** means hammered out of a single piece of gold, not cast in a mold or assembled from separate parts, an extremely difficult and skilled kind of metalwork.

👼 Cherubims are guardian angelic beings, not the cherub-infants of later art

🚪 The same kind of being guarded the entrance to Eden in Genesis 3:24

🔨 "Beaten work" means hammered from one solid piece of gold, not cast or assembled

---

## 🕊️ The Cherubims Shall Stretch Forth Their Wings On High, Covering The Mercy Seat

The two golden cherubim faced each other with wings spread up and over the mercy seat, forming a kind of canopy or throne above the gold lid. This imagery pictures the mercy seat as God's throne on earth, with the cherubim serving as its guardians, exactly matching how cherubim are described surrounding God's throne in Ezekiel's visions later.

🕊️ Their wings formed a canopy over the mercy seat, framing it like a throne

👑 This pictures the mercy seat as God's throne on earth

🔗 Ezekiel later sees cherubim surrounding God's throne in a very similar way

---

## 🗣️ There I Will Meet With Thee, And I Will Commune With Thee From Above The Mercy Seat

This is the specific spot God names as His meeting point with Moses and, through him, with the whole nation. **"Commune"** simply means to talk with or converse with, so this single object becomes the designated place where heaven and earth exchange words, the very reason the entire structure is called the "tent of meeting" elsewhere in Exodus.

🗣️ "Commune" simply means to talk with or converse with

📍 The mercy seat is the specific spot God designates for meeting with Israel

⛺ This is why the whole structure gets called the "tent of meeting" elsewhere

# Exodus 25:23-30

# 🍞 The Table Of Shewbread

---

## 🪵 Thou Shalt Also Make A Table Of Shittim Wood

Like the ark, the table was built from acacia wood and then overlaid with gold, but at roughly three feet by a foot and a half, it was sized like ordinary furniture, since its purpose was to display food, not house the covenant tablets.

🪵 The table used the same shittim (acacia) wood and gold overlay as the ark

📏 At about 3 feet by 1.5 feet, it was sized like an actual piece of furniture

🍽️ Its purpose was to display food, unlike the ark's purpose of housing the tablets

---

## 🎀 A Border Of An Hand Breadth Round About

A **"hand breadth"** was a small unit of measure, about the width of a hand, roughly three to four inches. This decorative gold rim ran around the table's edge, likely both to finish it beautifully and to help keep items from sliding off during travel.

🎀 A hand breadth is a small unit of measure, about three to four inches

✨ This gold rim finished the table's edge decoratively

🚚 It likely also helped keep items in place while the table was being carried

---

## 🍶 Dishes... Spoons... Covers... Bowls, To Cover Withal

This list of gold vessels was for serving alongside the bread: dishes to hold it, spoons for incense, and bowls and covers for the drink offerings (wine) that accompanied the bread. Every piece of equipment needed for this ongoing meal was specified in advance, down to the smallest utensil.

🍶 These vessels served the bread and its accompanying wine offerings

🥄 The "spoons" specifically held incense set alongside the bread

📋 Every utensil needed was specified in advance, down to the smallest piece

---

## 🍞 Thou Shalt Set Upon The Table Shewbread Before Me Alway

**"Shewbread"** literally means "bread of the presence" or "bread of display." Leviticus 24:5-9 later explains that twelve loaves, one for each tribe of Israel, sat on this table at all times and were replaced weekly, a constant, physical reminder that all twelve tribes stood continually in God's presence, even when their people were miles away going about ordinary life.

🍞 Shewbread means "bread of the presence," bread constantly on display before God

🔢 Leviticus 24 explains twelve loaves represented the twelve tribes

⏳ The word "alway" means this bread was never absent, only ever replaced

# Exodus 25:31-40

# 🕎 The Golden Candlestick

---

## 🔨 Thou Shalt Make A Candlestick Of Pure Gold: Of Beaten Work Shall The Candlestick Be Made

Like the cherubim, the entire lampstand, base, shaft, and all six branches together, was hammered from a single solid piece of gold rather than cast or welded together from parts. That level of craftsmanship demanded exceptional skill, and Exodus later credits Bezaleel, filled with the Spirit of God, as the craftsman able to execute it.

🔨 The whole lampstand was hammered from one solid piece of gold, not assembled

🎨 This required an extraordinary level of metalworking skill

✝️ Bezaleel, described as filled with God's Spirit for the work, later builds it

---

## 🌿 Six Branches Shall Come Out Of The Sides Of It; Three Branches... Out Of The One Side, And Three Branches... Out Of The Other Side

The design was one central shaft with three branches curving up from each side, for a total of seven lamps altogether once the main shaft's own lamp is counted. Seven is the number of completeness throughout Scripture, and later Jewish and Christian writers alike saw this seven-branched shape as a picture of complete, perfect light.

🌿 Six side branches plus the central shaft made seven lamps total

7️⃣ Seven is the number of completeness used throughout Scripture

💡 The shape became a lasting picture of complete, perfect light

---

## 🌸 Bowls Made Like Unto Almonds, With A Knop And A Flower

A **"knop"** is an old word for an ornamental knob or bud shape, carved here to look like an almond blossom. The almond tree was the first tree to bloom each year in the region, so its blossom already symbolized new life and awakening; that same almond imagery reappears later in Numbers 17 when Aaron's rod miraculously buds, blossoms, and produces almonds overnight as proof of his priesthood.

🌸 A knop is an ornamental bud shape, carved here like an almond blossom

🌱 Almond trees bloomed first each year, symbolizing new life and awakening

🪄 The same almond imagery reappears when Aaron's rod buds in Numbers 17

---

## 🔧 The Tongs Thereof, And The Snuffdishes Thereof, Shall Be Of Pure Gold

**"Snuffdishes"** were small trays used to catch the burnt wick trimmings when the lamps were tended, and **"tongs"** were the tool used to trim the wicks themselves. Even these purely maintenance tools, the least glamorous part of the whole design, were still required to be made of pure gold, not a cheaper metal.

🔧 Snuffdishes caught the trimmed, burnt wick pieces from the lamps

✂️ Tongs were the tool used to trim the wicks

🥇 Even these small maintenance tools had to be made of pure gold

---

## ⚖️ Of A Talent Of Pure Gold Shall He Make It, With All These Vessels

A **"talent"** was the largest unit of weight in the ancient world, roughly seventy-five pounds. That means the lampstand and all of its accompanying gold tools together were hammered from a single, enormous mass of gold, an almost unimaginable amount of wealth poured into one piece of tabernacle furniture.

⚖️ A talent was roughly seventy-five pounds, the largest weight unit of the era

💰 The entire lampstand and its tools came from that one massive block of gold

😮 This represents an enormous concentration of wealth in a single object

---

## 📐 Look That Thou Make Them After Their Pattern, Which Was Shewed Thee In The Mount

The chapter closes exactly the way it opened, back at the pattern God showed Moses on the mountain in verse 9. Nothing in the tabernacle's furniture was left to human invention from beginning to end; every object, right down to a lamp's decorative knops, matched a design Moses had already been shown before he ever picked up a tool.

📐 This closing line echoes the same "pattern" language from verse 9

🔁 The chapter is bookended by the same instruction: build exactly what was shown

🛠️ Nothing in this furniture list was left to human invention`;

export const EXODUS_TWENTY_FIVE_PERSONAL_SECTIONS = parseExodusTwentyFiveRawNotes(EXODUS_TWENTY_FIVE_RAW_NOTES);
