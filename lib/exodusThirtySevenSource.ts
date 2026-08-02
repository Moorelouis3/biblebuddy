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
# 📦 Bezaleel Builds The Ark
---
## 🌵 Made The Ark Of Shittim Wood

"Shittim wood" means acacia, a hard desert wood that resists rot and insects.

A cubit was about the length from an elbow to a fingertip.

That put the finished ark at about the size of a small coffee table.

Bezaleel is named here as the one who built it with his own hands.

Chapters twenty five through thirty one only planned this object.

This chapter finally shows it getting made.

The plan God gave on the mountain is now real wood and gold.

🌵 Shittim wood means acacia wood
📏 A cubit spans elbow to fingertip
📦 About the size of a small coffee table
📖 The mountain's plan becomes wood and gold

## ✨ Overlaid It With Pure Gold Within And Without

"Overlaid" means the plain wood core was covered in a layer of gold.

"Within and without" means every surface got that gold, not just the outside.

The inside would never be seen again once the mercy seat sealed the lid shut.

Bezaleel gave that hidden gold the same care as the gold everyone would see.

Some work is only ever seen by God.

✨ Overlaid means covered in gold
👁️ Within and without means every surface
🔒 The inside would never be seen again
📖 Some work is only ever seen by God

## 👑 Made A Crown Of Gold To It Round About

A "crown" here does not mean a king's headpiece.

It means a raised gold rim running around the ark's top edge.

Think of a decorative lip circling the rim of a box.

That rim likely also kept the ark's heavy lid from sliding out of place.

Beauty and function were built into the same object.

👑 Crown means a decorative rim, not a headpiece
📦 It ran around the ark's top edge
🔒 The rim likely kept the lid in place
➡️ Beauty and function shared one design

## 🔥 Cast For It Four Rings Of Gold

"Cast" means the gold was melted and poured into a mold.

Later in this chapter the lampstand gets hammered by hand instead.

Two different techniques served two different objects.

Four rings, two on each side, gave the ark four fixed points to lift from.

Every ring existed for one purpose, carrying the ark without anyone touching it directly.

🔥 Cast means poured molten gold into a mold
🔨 The lampstand later gets hammered instead
⚖️ Four rings gave four lifting points
➡️ The ark moved without being touched

## 🪵 Made Staves Of Shittim Wood, To Bear The Ark

"Staves" are the long poles slid through the ark's rings to carry it.

They are shaped from the same acacia wood as the ark itself.

They are then covered in gold to match.

Chapter twenty five already commanded that these poles must never be removed from the rings.

This verse shows that command actually being carried out, not just written down.

The ark stayed ready to move, whether camp had just arrived or was about to leave.

🪵 Staves are the ark's carrying poles
🌵 Same wood as the ark, gold covered too
🚫 Chapter twenty five said never remove them
➡️ The ark stayed always ready to move

# Exodus 37:6-9
# 👼 The Mercy Seat Takes Shape
---
## ✨ He Made The Mercy Seat Of Pure Gold

The "mercy seat" was a solid slab of gold that served as the ark's lid.

Unlike the ark beneath it, this was not wood covered in gold.

It was gold all the way through.

Its name ties to the Hebrew idea of atonement, a covering over sin.

This was likely the single most valuable object in the whole tabernacle.

God's seat sat above a covering for sin, not above bare wood.

✨ Mercy seat means a solid gold lid
🪵 The ark below it was wood plus gold
🩸 Its name ties to atonement, covering sin
📖 God's seat sat above a covering for sin

## 🔨 Beaten Out Of One Piece Made He Them

"Cherubims" were angelic guardian figures, not the soft, childlike kind pictured today.

"Beaten out of one piece" means hammered from a single block of gold.

Nothing here was cast separately and then joined together.

That technique meant shaping a full figure without ever cutting or welding a seam.

The seat and its guardians came from one unbroken piece of metal.

🔨 Beaten means hammered from one block
👼 Cherubims were angelic guardian figures
🚫 No welds or seams anywhere
📖 One craftsman shaped it all by hand

## 🕊️ Spread Out Their Wings On High, And Covered The Mercy Seat

The two cherubim faced each other with their wings arched up over the gold seat.

Together those wings formed a kind of canopy above the mercy seat.

That shape pictured the mercy seat as a throne, guarded on both sides.

Ezekiel later describes cherubim surrounding God's throne in a very similar way.

This small gold box carried the same picture as heaven's own throne room.

🕊️ Wings arched up formed a canopy
👑 The mercy seat is pictured as a throne
🔗 Ezekiel later describes a similar scene
📖 A small box echoed heaven's throne room

## 👀 Even To The Mercy Seatward Were The Faces Of The Cherubims

The two cherubim looked at each other, and both also looked down at the seat.

Their gaze never turned outward toward the room or the priest.

It stayed fixed on the one spot where God said He would meet with Moses.

Chapter twenty five already named that exact meeting place.

Even carved gold figures pointed to one single meeting place with God.

👀 Both cherubim faced the seat between them
🚫 Their gaze never turned outward
📍 That spot was God's meeting place
📖 Even the gold pointed toward God

# Exodus 37:10-16
# 🍞 The Table Gets Built
---
## 🪵 He Made The Table Of Shittim Wood

The table was built from the same acacia wood as the ark, shaped very differently.

It measured about three feet long, a foot and a half wide, and just over two feet tall.

That is about the size of an ordinary side table.

Its job was to display bread, not to house the stone tablets inside the ark.

One wood, one gold, two very different jobs.

🪵 Same wood as the ark, different shape
📏 About the size of a side table
🍞 Its job was to display bread
➡️ Same materials, very different purposes

## ✨ Overlaid It With Pure Gold, And Made Thereunto A Crown Of Gold

This table received the exact same treatment already given to the ark.

A full covering of gold, plus the same raised rim called a "crown."

The ark held the covenant tablets.

This table only held bread.

Even so, both received identical gold work.

Holiness here was not rationed by how important an object looked.

✨ Same full gold treatment as the ark
👑 Same crown style rim reused here
🍞 A bread table treated just as carefully
📖 Holiness was not rationed by importance

## ✋ A Border Of An Handbreadth Round About

A "handbreadth" was an old measure, about the width of four fingers held together.

This raised wooden border ran around the table's edge.

It was rimmed in its own small gold crown.

Picture a tray with a raised lip so nothing slides off the side.

That lip likely kept dishes and bowls in place while the table traveled with the camp.

Even a small rim was built with travel in mind.

✋ A handbreadth is about four fingers wide
🖼️ A raised lip ran around the edge
🍽️ It likely kept dishes from sliding off
📖 Built with travel in mind

## 🦵 Rings Upon The Four Corners That Were In The Four Feet Thereof

"Feet" here means the table's legs, since a table has open legs, not the ark's solid sides.

The rings sat near the border, close to the tabletop itself.

That placement kept the carrying poles level.

The table stayed steady when men lifted and carried it.

The ark's rings sat low on its sides.

This table's rings sat high, near the top.

Different shapes needed different placement, but the same purpose, carrying it safely.

🦵 Feet means the table's legs
📍 Rings sat high, near the border
⚖️ That kept the table level while moving
➡️ Different shape, same carrying purpose

## 🍽️ His Dishes, And His Spoons, And His Bowls, And His Covers

Four kinds of gold vessels sat on this table, each with its own job.

"Dishes" held the bread itself.

"Spoons" most likely held incense set out beside the bread.

"Bowls" and "covers" served the wine of the drink offering.

Numbers chapter four later confirms this exact use for the table's furnishings.

A whole meal sat ready on this table, not just a loaf of bread.

🍽️ Dishes held the bread itself
🕯️ Spoons likely held incense beside it
🍷 Bowls and covers served the wine
📖 A whole meal sat ready, not just bread

# Exodus 37:17-24
# 🕎 The Lampstand, Hammered Whole
---
## 🔨 Of Beaten Work Made He The Candlestick

The whole lampstand, base, shaft, and every branch, was hammered from one solid mass of gold.

None of it was cast separately or welded together.

Chapter thirty one already named Bezaleel as filled with skill for exactly this kind of work.

This verse shows him actually pulling it off.

A gift named in one chapter becomes a finished object in another.

🔨 Hammered from one solid mass of gold
🚫 Nothing cast or welded separately
✝️ Chapter thirty one named this exact gift
📖 A named gift becomes a finished object

## 🌸 His Bowls, His Knops, And His Flowers, Were Of The Same

A "knop" is an old word for an ornamental bud shape, carved here like an almond blossom.

Shaft, branches, bowls, knops, and flowers all came from that same single piece of gold.

None of the decoration was added on after the fact.

Every detail was already inside the gold before the hammer ever struck it.

🌸 A knop is an ornamental bud shape
🌿 All parts came from one gold mass
🚫 Nothing decorative was added later
📖 The detail was already in the gold

## 🌿 Six Branches Going Out Of The Sides Thereof, Three And Three

Three curving branches came out of each side of the central shaft.

That made seven total lamp positions once the center shaft's own lamp is counted.

Each branch repeated the same almond blossom pattern, a bowl, a bud, and a flower.

Seven is the number of completeness used throughout scripture.

This shape became a lasting picture of complete, unbroken light.

🌿 Three branches grew from each side
🔢 Seven lamps total, the number of completeness
🌸 Each branch repeated the almond pattern
📖 Complete light, not a partial glow

## 🪄 In The Candlestick Were Four Bowls Made Like Almonds

These four extra almond shaped bowls belonged to the central shaft, not the six side branches.

The same almond image reappears much later in Numbers seventeen.

There, Aaron's wooden rod miraculously buds, blossoms, and produces almonds overnight.

That later sign confirmed the very priesthood this lampstand stood ready to serve.

An image carved in gold here becomes a living miracle later on.

🌸 Four almond bowls belonged to the center shaft
🪄 The same image reappears in Numbers seventeen
✝️ Aaron's rod later budded real almonds
📖 A carved image became a living sign

## ✅ All Of It Was One Beaten Work Of Pure Gold

Three more knops sat exactly where each pair of branches met the central shaft.

Those joints were structural and decorative at the same time.

This closing line confirms, one final time, that nothing here was ever separate pieces joined together.

The whole object, from base to flame, came from a single hammered mass of gold.

Many shapes here were never more than one piece of gold, shaped by patient hands.

🔩 Knops marked the joints between branches
⚖️ Every joint was also a decoration
🚫 No seams anywhere in the finished piece
📖 Many shapes, only ever one piece of gold

## 🥇 His Seven Lamps, And His Snuffers, And His Snuffdishes, Of Pure Gold

The seven small oil lamps sat on top, removable for filling and cleaning.

"Snuffers" trimmed the burnt wick tips.

"Snuffdishes" caught the trimmings.

Even these small cleanup tools were made of pure gold, not a cheaper metal.

A "talent" was the largest unit of weight in the ancient world, about seventy five pounds.

The entire lampstand and every tool with it came from that one enormous mass of gold.

✂️ Snuffers trimmed the wick, snuffdishes caught the ash
🥇 Even cleanup tools were pure gold
⚖️ A talent was about seventy five pounds
📖 Even the mess here was made of gold

# Exodus 37:25-28
# 🔥 The Altar Of Incense
---
## ◻️ It Was Foursquare, The Horns Thereof Were Of The Same

"Foursquare" means a perfectly square base, about eighteen inches on each side.

Standing about three feet tall, this altar was small enough to fit just outside the inner veil.

"Horns" were raised points at each of its four top corners.

They were carved from the same wood block as the rest of the altar.

Chapter thirty already described blood applied to these exact horns once a year.

A small altar carried one of the most solemn moments in Israel's whole year.

◻️ Foursquare means a square base, about eighteen inches
📏 Standing about three feet tall
🔺 Horns were raised points at each corner
📖 Blood touched these horns once a year

## ✨ Made Unto It A Crown Of Gold Round About

Every surface of this altar, top, sides, and horns alike, received the same full gold covering.

It also got the same decorative rim already seen on the ark and the table.

No part of it was left as plain wood or a lesser finish.

By this point in the chapter, one standard covered every single object.

✨ Every surface got the same gold covering
👑 Same rim style as the ark and table
🚫 No plain wood left uncovered
📖 One standard for every object

## 🔩 Two Rings Of Gold For It Under The Crown Thereof

This altar only needed two rings, not the four used on the ark and the table.

Its smaller size and lighter weight meant fewer attachment points were enough.

It was still carried the same way, on poles slid through those rings.

A smaller object still deserved a carrying system built just for it.

🔩 Only two rings, unlike the ark's four
⚖️ Lighter weight needed fewer attachment points
🚶 Still carried the same way, on poles
➡️ Smaller objects still got their own design

## 🪵 He Made The Staves Of Shittim Wood, And Overlaid Them With Gold

The same wood and gold pole design already used for the ark and the table appears again here.

This is now the fourth object in this chapter carried the exact same way.

One proven design served completely different pieces of furniture.

Consistency itself was part of the plan, not an accident.

🪵 Same wood and gold pole design again
🔁 The fourth object built this exact way
🛠️ One design served many different pieces
📖 Consistency was part of the plan

# Exodus 37:29
# 🧴 The Holy Oil And Incense
---
## 🌿 He Made The Holy Anointing Oil, And The Pure Incense Of Sweet Spices

Chapter thirty already gave the exact recipe for the anointing oil.

Myrrh, cinnamon, sweet calamus, cassia, and olive oil made up that mixture.

The incense recipe in that same chapter called for stacte, onycha, galbanum, and frankincense.

This verse confirms both were actually mixed, not just planned on paper.

The oil and the incense, not just the gold, are what made these objects holy in use.

📖 Chapter thirty already gave both recipes
🌿 Oil combined myrrh, cinnamon, calamus, and cassia
🕯️ Incense combined stacte, onycha, galbanum, and frankincense
➡️ Oil and incense made objects holy in use

## 🧪 According To The Work Of The Apothecary

An "apothecary" was a trained specialist in mixing spices, perfumes, and medicines.

That role comes closest to the ancient world's pharmacist.

Naming this specific skill shows the mixture could not be made carelessly.

This chapter began with a craftsman's name attached to the ark.

It ends with a specialist's name attached to holy oil.

Every plan from the mountain has now become something Israel can actually use.

🧪 Apothecary means a trained specialist in mixtures
👨‍🔬 Close to the ancient world's pharmacist
🎯 The mixture required real skill, not guesswork
📖 The mountain's plan is now ready to use`.trim();

export const EXODUS_THIRTY_SEVEN_PERSONAL_SECTIONS = parseExodusThirtySevenRawNotes(EXODUS_THIRTY_SEVEN_RAW_NOTES);
