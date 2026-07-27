export type ExodusThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtySevenRawNotes(rawText: string): ExodusThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 37:${startVerse}` : `Exodus 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 37 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_SEVEN_RAW_NOTES = `# Exodus 37:1-5

# 🪵 Bezaleel Builds The Ark Himself

---

## 🪵 And Bezaleel Made The Ark Of Shittim Wood

This is the first time in the whole tabernacle story that one craftsman's name is attached directly to a specific finished object. Chapters 25-31 describe what God wants built; chapters 36-40 describe workers actually doing it, and here the text singles out Bezaleel by name as the one who personally shaped the most sacred object in the entire structure. Shittim (acacia) wood is the same hard, rot-resistant desert timber already introduced back in chapter 25 as the tabernacle's basic building material.

🪵 Bezaleel is named personally as the ark's actual builder

✍️ Chapters 25-31 planned it; chapters 36-40 show it getting built

🌵 Shittim wood is acacia, a durable desert timber first named in chapter 25

---

## 📏 Two Cubits And A Half...A Cubit And A Half...A Cubit And A Half

These are the exact same measurements God gave Moses back in chapter 25:10 -- about three feet nine inches long and two feet three inches wide and tall. Repeating the numbers here, verse for verse, confirms Bezaleel followed the mountain-given design precisely rather than adjusting or improvising anything.

📏 A cubit is roughly the length from elbow to fingertip, about a foot and a half

✅ These numbers match chapter 25:10's instructions exactly, without change

🎯 Precise repetition shows nothing was left to Bezaleel's own judgment

---

## ✨ Overlaid It With Pure Gold Within And Without

Just like the original instruction in chapter 25:11, the ark's wood core was covered in gold on every surface, including the inside no living person would ever see again once the lid went on. Bezaleel had no shortcut available here -- the hidden gold cost exactly as much skill and material as the visible gold.

✨ Every surface, seen or unseen, received the same gold covering

👁️ The inside gold would never be seen again once the ark was sealed

🎯 This matches chapter 25:11's original instruction word for word

---

## 👑 Made A Crown Of Gold To It Round About

A **"crown"** here is not a king's headpiece -- it's a raised gold rim or molding running around the top edge of the ark, like a decorative lip. Besides looking finished and rich, a rim like this would have helped keep the gold mercy-seat lid from sliding out of place once it was set on top.

👑 A "crown" here means a raised decorative rim, not a king's headpiece

🔒 This rim likely helped keep the mercy seat lid from sliding

✨ It matches chapter 25:11's instruction for this exact feature

---

## 🔥 Cast For It Four Rings Of Gold, To Be Set By The Four Corners

**"Cast"** means the gold was melted and poured into a mold, a different technique from the hammered "beaten work" used later for the cherubim and lampstand. Four rings, two low on each long side, gave the ark four fixed attachment points so it could be lifted and carried evenly by two poles running underneath.

🔥 "Cast" means poured molten gold into a mold, unlike hammered "beaten work"

⚖️ Four rings, two per side, let the ark be lifted evenly on two poles

📍 This matches the same ring placement instruction from chapter 25:12

---

## 🪵 Made Staves Of Shittim Wood, And Overlaid Them With Gold

**"Staves"** are the long carrying poles that slide through the ark's four rings. They're made of the same acacia wood as the ark itself, then gold-covered to match, so nothing touching the ark on its journeys was left as bare, ordinary wood.

🪵 "Staves" are the long wooden carrying poles for the ark

🌵 They're the same acacia wood as the ark, then gold-covered like it

🚶 This kept every part touching the ark consistent with its holiness

---

## 🚫 Put The Staves Into The Rings By The Sides Of The Ark, To Bear The Ark

Chapter 25:15 already commanded that these staves must never be removed from the rings, so the ark stayed permanently ready to move at a moment's notice. This verse shows that instruction actually being carried out, not just written down.

🚫 Chapter 25:15 said these staves must never be taken out of the rings

✅ This verse shows that exact command being physically carried out

🏕️ The ark stayed permanently travel-ready throughout Israel's wilderness years

# Exodus 37:6-9

# 👼 The Mercy Seat Takes Its Final Shape

---

## ✨ He Made The Mercy Seat Of Pure Gold

The **"mercy seat"** was a solid gold slab serving as the ark's lid, its name tied to the Hebrew word for atonement -- covering over sin. Unlike the ark's wood-and-gold-overlay construction, the mercy seat was solid gold all the way through, the most valuable object in the entire tabernacle by weight.

✨ "Mercy seat" is a solid gold lid, not wood covered in gold like the ark below it

🩸 Its name connects to atonement, the covering over of sin

💰 Solid gold made it likely the single most valuable object in the whole tabernacle

---

## 📏 Two Cubits And A Half... One Cubit And A Half

These measurements exactly match the ark's own length and width from verse 1, since the mercy seat had to sit as a precise-fitting lid on top of it, not a separate, loosely-placed cover.

📏 These dimensions exactly match the ark's length and width from verse 1

🔒 A precise fit mattered since this was a lid, not a loose cover

✅ This matches chapter 25:17's original measurement instruction

---

## 🔨 Beaten Out Of One Piece Made He Them

**"Beaten work"** means the two cherubim and the mercy seat slab underneath them were hammered out from a single, continuous mass of gold, not cast separately and welded on. That's an extraordinarily difficult technique, requiring the goldsmith to slowly shape three-dimensional figures out of solid metal without ever cutting or joining pieces.

🔨 "Beaten work" means hammered from one solid mass, not cast and joined

🎨 Shaping figures this way from solid gold demanded exceptional skill

👼 The cherubim and the seat beneath them were one unbroken piece of metal

---

## 👼 One Cherub On The End On This Side, And Another Cherub On The Other End

This repeats the "one piece" detail from the previous verse in different words, underlining that the two guardian figures rose up out of the same solid slab as the seat itself, one on each end, rather than being made separately and attached afterward.

👼 One cherub stood at each end of the same single gold slab

🔁 This restates verse 7's point that it's all one unbroken piece

🎯 Emphasis this heavy signals how important the detail was

---

## 🕊️ Spread Out Their Wings On High, And Covered... The Mercy Seat

The two cherubim faced each other with their wings arched up and over the gold seat between them, forming a kind of canopy or throne above it. This is the same posture Ezekiel later describes cherubim taking around God's throne in his visions, tying this earthly object to a heavenly pattern.

🕊️ Their wings arched up and over the seat, forming a canopy above it

👑 This pictures the mercy seat as a throne, with the cherubim as its guards

🔗 Ezekiel later describes cherubim surrounding God's throne in a similar way

---

## 👀 With Their Faces One To Another; Even To The Mercy Seatward Were The Faces

The cherubim looked at each other, and both of them also looked down toward the mercy seat between them. Their gaze wasn't outward, toward the room or the priest -- it stayed fixed on the exact spot where God said He would meet with Moses in chapter 25:22, a picture of constant, focused attention on that one meeting place.

👀 Both cherubim faced each other and looked down at the mercy seat itself

🚫 Their attention wasn't outward toward the room or the priest

📍 Their gaze stayed fixed on the meeting place named in chapter 25:22

# Exodus 37:10-16

# 🍞 The Table, Actually Made

---

## 🪵 He Made The Table Of Shittim Wood

The table was built from the same acacia wood as the ark, but sized very differently -- about three feet long, a foot and a half wide, and just over two feet tall, roughly the size of an ordinary side table. Its job was to display food, not to house the covenant tablets, so it didn't need the ark's small, dense proportions.

🪵 Same acacia wood as the ark, but shaped like ordinary furniture

📏 About 3 feet long, 1.5 feet wide, just over 2 feet tall

🍽️ Its purpose (displaying bread) was completely different from the ark's

---

## ✨ Overlaid It With Pure Gold, And Made Thereunto A Crown Of Gold

Like the ark, the table's wood core was fully gold-covered and finished with the same style of raised decorative rim described back in verse 2. The same gold-and-crown treatment given to the most sacred object in the tabernacle was also given to a table meant for holding bread.

✨ The same full gold covering used on the ark also covers this table

👑 It has the same "crown" style rim described for the ark in verse 2

🎯 Even ordinary-looking furniture got treated with full holiness

---

## ✋ A Border Of An Handbreadth Round About

A **"handbreadth"** is an old, hand-based unit of measure, roughly three to four inches wide. This raised wooden border, itself rimmed in its own smaller gold crown, ran around the table's edge -- likely both a finishing decoration and a practical lip to help keep vessels from sliding off during travel.

✋ A handbreadth is a small unit of measure, about three to four inches

🎀 This border got its own separate gold crown, distinct from the table's main rim

🚚 It likely helped keep dishes and bowls from sliding off while traveling

---

## 🦵 Cast For It Four Rings Of Gold... In The Four Feet Thereof

Unlike the ark, whose rings sat low on its solid sides, the table's rings were attached at its four legs ("feet"), since a table has open legs rather than a solid box shape. The rings still served the same purpose: giving fixed points for the carrying poles.

🦵 "Feet" here means the table's legs, unlike the ark's solid sides

🔩 A table's open-leg shape needed a different ring placement than a box

🚶 The purpose was still the same: fixed points for carrying poles

---

## 📍 Over Against The Border Were The Rings, The Places For The Staves

The rings sat positioned right near the decorative border from verse 12, close enough to the tabletop that the poles running through them would keep the table roughly level and stable while it was being carried, rather than tipping or dragging.

📍 The rings sat near the border, close to the tabletop itself

⚖️ This positioning kept the table stable and level while being carried

🚶 Placement mattered for a table meant to travel constantly with the camp

---

## 🪵 He Made The Staves Of Shittim Wood, And Overlaid Them With Gold

The same acacia-wood-and-gold combination used for the ark's carrying poles is repeated here for the table's poles, one more example of the tabernacle's builders reusing a single proven design across multiple pieces of furniture instead of inventing something new for each one.

🪵 Same wood-and-gold pole design as the ark's staves in verse 4

🔁 One proven design gets reused across different furniture pieces

🛠️ Consistency in method ran through the whole construction project

---

## 🍽️ The Vessels Which Were Upon The Table, His Dishes, And His Spoons

**"Dishes"** held the shewbread itself, and **"spoons"** most likely held incense set out alongside the bread, based on how the same word is used elsewhere in the Old Testament for incense vessels.

🍽️ Dishes were for the bread; spoons likely held incense beside it

📖 This matches other Old Testament uses of the same word for incense tools

🥇 Every serving piece, however small, was made of pure gold

---

## 🍷 His Bowls, And His Covers To Cover Withal, Of Pure Gold

The **"bowls"** and **"covers"** were used for the drink offering (wine) that accompanied the bread, based on Numbers 4:7's later description of this same table's furnishings. Every piece needed for this ongoing meal, food and drink alike, had already been fully accounted for back in chapter 25:29 and is now shown actually made.

🍷 Bowls and covers served the wine that accompanied the bread offering

📖 Numbers 4:7 later confirms this exact use for the table's furnishings

✅ Every serving piece planned in chapter 25:29 is now shown actually built

# Exodus 37:17-24

# 🕎 The Lampstand, Hammered Whole

---

## 🔨 He Made The Candlestick Of Pure Gold: Of Beaten Work

Like the cherubim, the entire lampstand -- base, central shaft, and every branch together -- was hammered from one solid mass of gold rather than cast or assembled from separate pieces. Chapter 31 already named Bezaleel as personally Spirit-filled for this kind of work, and this verse shows him actually pulling it off.

🔨 The whole lampstand was hammered from one solid piece, not assembled

✝️ Chapter 31 already named Bezaleel as Spirit-filled for exactly this skill

🎨 This is one of the most technically demanding objects in the tabernacle

---

## 🌸 His Shaft, And His Branch, His Bowls, His Knops, And His Flowers, Were Of The Same

A **"knop"** is an old word for an ornamental bud shape, here carved to look like an almond blossom. Every decorative part -- the central shaft, the branches, the cup-shaped "bowls," the bud-shaped "knops," and the flower shapes -- came from that same single piece of gold, none of it added on afterward.

🌸 A "knop" is an ornamental bud shape, styled here like an almond blossom

🌿 Shaft, branches, bowls, knops, and flowers all came from one gold mass

🔗 Nothing decorative was cast separately and attached later

---

## 🌿 Six Branches Going Out Of The Sides Thereof; Three... And Three

The design was one central shaft with three curving branches on each side, for seven total lamp positions once the center shaft's own lamp is counted. Seven is the number of completeness throughout the Bible, and this shape became a lasting picture of full, perfect light.

🌿 Three branches per side plus the center shaft made seven lamps total

7️⃣ Seven is the number of completeness used throughout Scripture

💡 The shape became a lasting picture of complete light

---

## 🌸 Three Bowls Made After The Fashion Of Almonds In One Branch... So Throughout The Six Branches

Each of the six side branches repeated the exact same almond-blossom pattern: three cup shapes, a bud, and a flower, all the way down every branch. That kind of exact repetition across six separate branches, all hammered from one connected piece, took enormous precision.

🌸 Each of the six branches repeated the identical almond-blossom pattern

🔁 The same three-part design (bowl, knop, flower) ran down every branch

🎯 Matching this pattern six times on one connected piece took real precision

---

## 🪄 In The Candlestick Were Four Bowls Made Like Almonds, His Knops, And His Flowers

These four extra almond-shaped bowls belonged to the central shaft itself, separate from the three found on each of the six branches. The almond imagery running through the whole lampstand echoes forward to Numbers 17, where Aaron's rod miraculously buds, blossoms, and produces almonds overnight as proof of his God-given priesthood.

🌸 These four almond bowls belonged to the central shaft, not the branches

🪄 The same almond imagery reappears when Aaron's rod buds in Numbers 17

✝️ That later sign confirmed the priesthood this very lampstand served

---

## 🔩 A Knop Under Two Branches Of The Same... According To The Six Branches

Three additional knops sat at the exact points where each pair of branches met the central shaft, functioning as both a structural joint and a decorative feature. Repeating the same knop-and-branch-pair pattern three times kept the whole structure visually balanced and symmetrical.

🔩 These knops mark the joints where each pair of branches meets the shaft

⚖️ Repeating the pattern three times kept the whole shape symmetrical

🎨 A structural joint here also doubled as a decorative element

---

## ✅ All Of It Was One Beaten Work Of Pure Gold

This closing summary confirms, one final time, that every knop, flower, bowl, branch, and the central shaft were never separate parts joined together -- the whole object, from base to flame, came from a single mass of hammered gold.

✅ This is the third time the chapter confirms it's all one unbroken piece

🔨 "Beaten work" ties back to the same technique used for the cherubim

🎯 No seams, joints, or welds existed anywhere in the finished lampstand

---

## 🔥 His Seven Lamps, And His Snuffers, And His Snuffdishes, Of Pure Gold

The seven small oil lamps themselves sat separately on top of the branches, and were removable for filling and cleaning, unlike the hammered gold structure beneath them. **"Snuffers"** trimmed the burnt wick tips, and **"snuffdishes"** were small trays that caught the trimmings -- even these purely maintenance tools were made of pure gold, not a cheaper metal.

🔥 The seven lamps sat on top, removable for filling and cleaning

✂️ "Snuffers" trimmed the burnt wick; "snuffdishes" caught the trimmings

🥇 Even these small maintenance tools were required to be pure gold

---

## ⚖️ Of A Talent Of Pure Gold Made He It, And All The Vessels Thereof

A **"talent"** was the largest unit of weight in the ancient world, roughly seventy-five pounds. The entire lampstand and every one of its gold tools came from that single, enormous mass of gold -- an almost unimaginable concentration of wealth in one piece of furniture.

⚖️ A talent was roughly seventy-five pounds, the largest ancient weight unit

💰 The whole lampstand and its tools came from that one block of gold

😮 This represents an enormous concentration of wealth in a single object

# Exodus 37:25-28

# 🔥 The Altar Of Incense Built

---

## ◻️ He Made The Incense Altar Of Shittim Wood... It Was Foursquare

**"Foursquare"** means perfectly square at the base -- about eighteen inches by eighteen inches -- and standing three feet tall, small enough to sit just outside the veil rather than take up much floor space. This matches the small size and location already described back in chapter 30:1-6.

◻️ "Foursquare" means a perfectly square base, about 18 by 18 inches

📏 Standing about 3 feet tall, it was compact, not a large structure

📖 This matches the size and description already given in chapter 30

---

## 🔺 The Horns Thereof Were Of The Same

**"Horns"** were raised, pointed projections at each of the altar's four top corners, carved from the same single wood block as the rest of the altar rather than attached separately. Chapter 30:10 already explained that blood was applied to these exact horns once a year on the Day of Atonement.

🔺 "Horns" are raised projections at each of the altar's four top corners

🪵 They were carved from the same wood block, not attached as separate pieces

🩸 Chapter 30:10 already described blood applied to these horns yearly

---

## ✨ Overlaid It With Pure Gold, Both The Top... And The Sides... And The Horns

Every surface of the altar -- top, sides, and horns alike -- got the same full gold covering, plus the same decorative crown-style rim already seen on the ark and the table. No part of this altar was left as plain wood or a lesser finish.

✨ Top, sides, and horns all received the same complete gold covering

👑 It got the same crown-style rim already used on the ark and table

🎯 No surface here was left as plain, uncovered wood

---

## 🔩 Two Rings Of Gold For It Under The Crown Thereof... To Bear It Withal

This smaller altar only needed two rings, not the ark and table's four, since its lighter weight and smaller size meant it could be carried safely on just one set of poles rather than four attachment points.

🔩 Only two rings were needed here, unlike the ark and table's four

⚖️ Its smaller size and lighter weight meant fewer attachment points sufficed

🚶 Still carried on poles, just with a simpler carrying system

---

## 🪵 He Made The Staves Of Shittim Wood, And Overlaid Them With Gold

The same acacia-and-gold pole design used for every other piece of tabernacle furniture is repeated one final time here, closing out a chapter built almost entirely around this one reused, proven method.

🪵 The same wood-and-gold pole design closes out this chapter

🔁 This is the fourth object in this chapter using this exact carrying-pole method

🛠️ One proven design served the ark, table, altar, and lampstand's needs alike

# Exodus 37:29

# 🧴 The Holy Oil And Incense, Ready

---

## 🧴 He Made The Holy Anointing Oil, And The Pure Incense Of Sweet Spices

Chapter 30 already gave the exact recipes for both of these: the anointing oil (myrrh, cinnamon, calamus, cassia, and olive oil) and the incense (stacte, onycha, galbanum, and frankincense). This verse confirms both were actually mixed and made, closing out a chapter about physical objects with the two substances that made those objects functionally holy rather than just beautiful.

📖 Chapter 30 already gave the full recipes for both the oil and the incense

🧴 This confirms both were actually mixed, not just planned

✨ These substances, not just the gold, are what made the objects holy in use

---

## 🧪 According To The Work Of The Apothecary

An **"apothecary"** was a trained specialist in mixing spices, perfumes, and medicines -- essentially the ancient world's pharmacist. Naming this specific profession shows that making the holy oil and incense correctly required real technical expertise, not just following a recipe casually.

🧪 An "apothecary" was a trained specialist in mixing spices and perfumes

👨‍🔬 This was essentially the ancient world's version of a pharmacist

🎯 Getting these mixtures right required genuine technical skill`;

export const EXODUS_THIRTY_SEVEN_PERSONAL_SECTIONS = parseExodusThirtySevenRawNotes(EXODUS_THIRTY_SEVEN_RAW_NOTES);
