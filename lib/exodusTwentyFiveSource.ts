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
## 🎁 That They Bring Me An Offering

**"Offering"** means a gift, not a tax collected by force.

Moses is partway through forty days alone with God on the mountain.

This is the first thing God asks him to say to Israel.

The entire tabernacle begins with an invitation, not an order.

🎁 Offering means a gift, not a tax

⛰️ Moses is still on the mountain

📜 This is God's very first request

📖 The tabernacle begins with an invitation

## 🙌 Willingly With His Heart

God does not want gifts given out of guilt or pressure.

**"Willingly"** means each person chooses freely to give.

No tax is assigned to anyone by a fixed amount.

Exodus 35 later shows the people giving far more than needed.

Moses actually has to tell them to stop giving.

That flood of generosity traces back to this one condition.

🙌 Willingly means freely chosen, not forced

🚫 No tax or fixed amount required

💰 Exodus 35 shows people giving too much

📖 Generosity here traces back to one condition

## 🥇 Gold And Silver And Brass

These three metals are listed in order from most valuable to least.

Gold covers the most sacred objects, kept closest to God's presence.

Silver becomes the sockets that hold the structure together.

**"Brass"** here means bronze, a mix of copper and tin.

Bronze covered the parts everyone could see and touch.

The metal used on an object marks how close it sits to God.

🥇 Gold, silver, brass listed by value

🏛️ Gold covers the most sacred objects

🔩 Silver forms the structural sockets

📖 Materials marked closeness to God

## 🧵 Blue And Purple And Scarlet And Fine Linen And Goats' Hair

Blue, purple, and scarlet were the three most expensive dyes in the ancient world.

Each color came from a rare shellfish or crushed insect.

**"Fine linen"** was tightly woven cloth, famous as an Egyptian export.

Israel had just left Egypt as slaves.

Now that same fabric serves God instead of Pharaoh.

**"Goats' hair"** was coarser and cheaper, used for the outer tent covering.

Even the plain, ordinary material had a place in God's house.

🧵 Blue, purple, scarlet were the priciest dyes

🐚 Each came from shellfish or insects

🇪🇬 Fine linen recalls Egypt's famous weaving

📖 Even goats' hair earned a place in worship

## 🌊 Rams' Skins Dyed Red And Badgers' Skins And Shittim Wood

**"Badgers' skins"** is an old translation guess.

Most scholars now think it means the tough, waterproof hide of a sea creature.

That hide became the tent's weatherproof outer layer.

**"Shittim wood"** means acacia, a hard wood that resists rot.

Acacia trees grow naturally in the Sinai desert, exactly where Israel was camped.

Every material on this list was something the people could actually find around them.

🌊 Badgers' skins likely means waterproof hide

🌵 Shittim wood is acacia, a desert wood

📍 Acacia grew right where Israel camped

📖 God used materials the people already had

## 🕯️ Spices For Anointing Oil And For Sweet Incense

This oil was pure olive oil, kept burning in the lampstand described later in this chapter.

**"Sweet incense"** was a specially mixed fragrance, burned only for God, never for ordinary use.

Exodus 30 later gives the exact recipe for this incense.

It also warns against copying that scent for anything ordinary.

Light and fragrance were both part of worship, not just furniture and cloth.

🕯️ Oil kept the lampstand burning

🌸 Sweet incense was a specially mixed scent

📜 Exodus 30 gives its exact recipe

📖 Worship included smell and light, not just objects

## 💍 Onyx Stones And Stones To Be Set In The Ephod

The **"ephod"** and **"breastplate"** were pieces of the high priest's clothing.

Exodus does not describe those garments in detail until chapter 28.

God had already planned the whole priesthood before Moses knew any of its details.

The offering list and the priesthood were designed together, as one connected system.

👔 Ephod and breastplate are priestly garments

📅 Not described in detail until Exodus 28

🧩 God planned the priesthood before its details

➡️ Offering and priesthood were one connected plan

## 🏠 Let Them Make Me A Sanctuary

**"Sanctuary"** simply means a place set apart as holy.

God does not need shelter, since he owns the whole earth already.

He wants a place his people can build for him, together.

That act of building becomes part of the worship itself.

🏠 Sanctuary means a set apart holy place

🌍 God already owns the whole earth

🤝 The people build it together

📖 Building becomes an act of worship

## 🤝 That I May Dwell Among Them

This is the reason for the entire tabernacle, stated in one line.

God does not want to stay distant on a mountain top no one can approach.

He wants to live in the middle of the camp, among ordinary people.

Every measurement and material in the chapters ahead exists to make room for that one goal.

🏕️ Dwelling among them is the whole point

⛰️ God refuses to stay distant on a mountain

👥 He chooses to live among ordinary people

📖 Every later chapter serves this one goal

## 📐 According To All That I Shew Thee

**"Shew"** is an old word for show.

God is not asking Moses to design anything from his own imagination.

Moses was shown an exact model, likely in a vision, during his time on the mountain.

Hebrews 8:5 later looks back at this exact verse.

It calls the whole earthly tabernacle a shadow of something real that exists in heaven.

👀 Shew is an old word for show

🚫 Moses invents nothing on his own

🌌 He was shown an exact model to copy

📖 Hebrews 8:5 quotes this exact verse

# Exodus 25:10-16
# 📦 The Ark Of The Covenant
---
## 📏 Two Cubits And A Half Shall Be The Length Thereof

**"Cubit"** was the ancient measure from an elbow to a fingertip.

That distance was close to a foot and a half.

By that measure, the ark was about three feet nine inches long.

It stood about two feet three inches wide and the same tall.

An object that size could be carried by only a few men.

📏 Cubit means elbow to fingertip length

📦 About 3 feet 9 inches long

🚶 Small enough to carry by hand

📖 A portable box, not a monument

## ✨ Overlay It With Pure Gold

The ark's core was ordinary wood, covered completely in gold.

Gold went on the inside and the outside alike.

No one would ever see the inside again once the lid was set in place.

God still required gold there anyway.

Nothing about this object was allowed to be holy on the outside only.

✨ Gold covered both inside and outside

👁️ The unseen inside still got gold

🎯 Nothing here cut a hidden corner

📖 Holiness was not just for show

## 👑 A Crown Of Gold Round About

**"Crown"** here does not mean a king's headpiece.

It means a raised gold molding that ran around the top edge of the ark.

That rim likely helped hold the mercy seat lid firmly in place once it was set on top.

Even a small decorative detail like this served a real, practical purpose.

👑 Crown means a raised gold rim

📦 It ran around the ark's top edge

🔒 The rim likely helped seat the lid

📖 Small details still served real purposes

## 💍 Cast Four Rings Of Gold For It

Four gold rings were fixed to the ark's four corners, two on each side.

These rings were not decorative extras.

They were the anchor points for the poles that would carry the ark.

Every part of the design already assumed this box would travel.

💍 Four gold rings sat at the corners

🚫 Not decoration, but functional anchor points

🚶 Poles would slide through these rings

📖 The design assumed constant travel

## 🪵 That The Ark May Be Borne With Them

**"Staves"** means long carrying poles.

They were made of the same shittim wood as the ark, then covered in gold.

The poles slid through the four rings from the verse before.

That let several men lift and carry the ark without ever touching the holy object itself.

🪵 Staves means long wooden carrying poles

✨ Gold covered the poles like the ark

💍 Poles slid through the corner rings

📖 Men carried the ark without touching it

## 🚫 They Shall Not Be Taken From It

This staves rule is different from anything said about the table or the altar later in this chapter.

The poles were never to be removed from the rings, not even between trips.

The ark stayed permanently ready to move.

Israel would spend the next forty years as a traveling camp, not a settled nation.

🚫 Staves were never removed from the rings

🏕️ The ark stayed always ready to move

📆 Israel would travel for forty years

📖 Readiness was built into the design

## 📜 Thou Shalt Put Into The Ark The Testimony

**"The testimony"** is another name for the two stone tablets of the Ten Commandments.

They are called testimony because they testified to the covenant Israel had just agreed to in chapter 24.

**"Ark of the testimony"** becomes one of the ark's most common titles later in the Old Testament.

The box was never meant to sit empty.

It existed to hold God's own words.

📜 Testimony means the two stone tablets

⚖️ They testified to the covenant in chapter 24

🏷️ Ark of the testimony becomes a common title

📖 The ark existed to hold God's words

# Exodus 25:17-22
# 👼 The Mercy Seat
---
## ✨ Thou Shalt Make A Mercy Seat Of Pure Gold

The **"mercy seat"** was a solid slab of gold that served as the ark's lid.

Its Hebrew name connects to the word for atonement, the covering over of sin.

Leviticus 16 describes the high priest sprinkling blood here once a year, on the Day of Atonement.

This lid was not decoration.

It was the most important surface in the whole tabernacle.

✨ Mercy seat means the ark's gold lid

🩸 Its name connects to atonement, covering sin

📅 Leviticus 16 describes blood sprinkled here yearly

📖 This lid was the tabernacle's most important surface

## 👼 Two Cherubims Of Gold Of Beaten Work

**"Cherubims"** are a class of angelic being, not the round cheeked infants later art imagined.

In Scripture, cherubim consistently guard holy space.

Genesis 3:24 places the same kind of being at the entrance to Eden.

**"Beaten work"** means hammered from one solid piece of gold, not cast in a mold.

One cherub stood on each end of the mercy seat, facing inward.

👼 Cherubims are guardian angels, not infants

🚪 The same beings guarded Eden's entrance

🔨 Beaten work means hammered from one piece

📖 Guardians framed the holiest object in Israel

## 🕊️ Stretch Forth Their Wings On High

The two cherubim spread their wings up and over the mercy seat.

Together the wings formed a kind of canopy above the gold lid.

That image pictures the mercy seat as a throne, with wings as its covering.

Ezekiel later sees cherubim surrounding God's throne in a very similar way.

🕊️ Wings formed a canopy over the seat

👑 The image pictures a throne, not a box

🔗 Ezekiel later echoes this same picture

📖 The mercy seat functioned as God's throne

## 👀 Their Faces Shall Look One To Another

The two cherubim did not face outward toward the room.

They faced each other, with their eyes turned down toward the mercy seat between them.

That posture points every line of sight toward the same spot, the place of atonement.

Nothing about this design pulled attention away from where blood would be sprinkled.

👀 Cherubim faced each other, not outward

📍 Their gaze pointed to the mercy seat

🩸 Every line of sight met the atonement spot

📖 The design centers attention on one place

## 📦 Put The Mercy Seat Above Upon The Ark

The mercy seat sat as a lid directly on top of the ark.

Verse 21 repeats the instruction to place the testimony tablets inside first.

That repetition is not an accident.

It ties the golden throne above to the stone law hidden beneath it.

Mercy is pictured sitting directly above the law, never replacing it.

📦 The mercy seat sat as the ark's lid

📜 The testimony tablets go inside first

🔗 Gold throne sits above stone law

📖 Mercy sits above the law, not against it

## 📍 There I Will Meet With Thee

God names this exact spot as his meeting point with Moses.

Every other instruction about the tabernacle flows from this one promise.

This single object becomes the designated place where heaven speaks to earth.

That is why the whole structure later gets called the tent of meeting.

📍 God names this His meeting point

🗣️ Heaven and earth exchange words here

⛺ Source of the name tent of meeting

📖 Every other instruction flows from this promise

## 🗣️ I Will Commune With Thee From Above The Mercy Seat

**"Commune"** simply means to talk with or converse with someone.

God promises ongoing conversation, not a single one time appearance.

That conversation happens specifically from between the two cherubim, above the mercy seat.

Every command Moses receives for Israel from this point on comes from that exact spot.

🗣️ Commune means to talk with someone

🔁 God promises ongoing conversation, not one visit

📍 Speech comes from between the cherubim

📖 Every future command traces back to this spot

# Exodus 25:23-30
# 🍞 The Table Of Shewbread
---
## 🪵 Thou Shalt Also Make A Table Of Shittim Wood

Like the ark, this table used shittim wood covered in gold.

At about three feet by a foot and a half, it was sized like ordinary furniture.

Its purpose was to display food, not to house the covenant tablets.

Two objects, same materials, completely different jobs.

🪵 Same wood and gold as the ark

📏 About 3 feet by 1 foot 6 inches

🍽️ Built to display food, not tablets

📖 Same materials, two very different purposes

## 👑 Make Thereto A Crown Of Gold Round About

Gold covered the whole table, just as it covered the ark.

A **"crown"** here again means a raised molding, not a king's headpiece.

This gold rim ran around the tabletop's upper edge.

The same word and the same craftsmanship link the ark and the table together.

✨ Gold overlay matched the ark's treatment

👑 Crown means a raised rim, not a headpiece

📦 The rim ran around the top edge

📖 Shared language links the ark and table

## ✋ A Border Of An Hand Breadth Round About

A **"hand breadth"** was a small unit of measure, about three or four inches.

This was a second border, lower than the gold crown from the verse before.

The border likely kept the vessels of bread and wine from sliding off during travel.

A small design choice protected what sat on top of it.

✋ Hand breadth means about three to four inches

📏 A second, lower border than the crown

🍞 It likely kept the vessels from sliding

📖 Small details protected what mattered on top

## 💍 Put The Rings In The Four Corners

Four gold rings were attached to the table's four legs.

These match the four rings already built into the ark's design.

The whole tabernacle's furniture followed the same portable pattern.

Nothing in this house of God was meant to stay fixed in one spot.

💍 Four rings sat at the table's legs

📦 This matches the ark's own rings

🔁 One portable pattern across all the furniture

📖 Nothing here was built to stay still

## 📍 Over Against The Border Shall The Rings Be

The rings were not placed just anywhere.

They sat high up, close to the border.

That border was the decorative rim described in verse 25.

The placement was on purpose.

Think about carrying a full tray of drinks.

Hold it low and loose and everything slides.

Grip it near the top edge and it stays flat.

The poles slid through these rings and the table stayed level while men carried it.

📍 The rings sat high, near the border

⚖️ High placement kept the table level

🍞 The bread stayed on it while it moved

📖 God designed the carrying, not just the object

## ✨ That The Table May Be Borne With Them

The carrying poles for the table were shittim wood covered in gold.

That matched the ark's own poles exactly.

These poles slid through the rings from the verse before.

The table was always ready to travel with the rest of the camp.

🪵 Table poles matched the ark's poles

✨ Both were shittim wood covered in gold

💍 Poles slid through the rings already placed

📖 The table stayed ready to travel too

## 🍶 Dishes And Spoons And Covers And Bowls To Cover Withal

This list of gold vessels served the bread and its accompanying wine offering.

**"Dishes"** held the bread itself.

**"Spoons"** held incense set alongside it.

**"Covers"** and **"bowls"** handled the drink offering poured with the meal.

Every utensil this table would ever need was specified before it was even built.

🍶 Vessels served both bread and wine

🥄 Spoons specifically carried incense

📋 Every needed utensil was specified in advance

📖 Nothing about this meal was left unplanned

## 🍞 Thou Shalt Set Upon The Table Shewbread Before Me Alway

**"Shewbread"** literally means bread of the presence, bread on constant display before God.

Leviticus 24 later explains that twelve loaves sat here, one for each tribe of Israel.

Those loaves were replaced weekly, never left to grow old or stale.

The word **"alway"** means this bread was never actually absent, only ever replaced.

Twelve tribes stood continually in God's presence through this bread.

That stayed true even when their people were far away living ordinary life.

🍞 Shewbread means bread of God's presence

🔢 Twelve loaves represented the twelve tribes

🔁 Loaves were replaced weekly, never stale

📖 Alway means never absent, only replaced

# Exodus 25:31-40
# 🕎 The Golden Candlestick
---
## 🔨 Of Beaten Work Shall The Candlestick Be Made

The whole lampstand was hammered from one solid piece of gold.

That includes the base, the shaft, and all six branches together.

Nothing was cast in a mold or welded from separate parts.

That level of craftsmanship demanded extraordinary skill.

Exodus later names Bezaleel, filled with God's Spirit, as the craftsman able to do it.

🔨 One solid piece, not assembled parts

🎨 This demanded extraordinary metalworking skill

✝️ Bezaleel later builds it, filled with God's Spirit

📖 Skill itself became part of the offering

## 🌿 Six Branches Shall Come Out Of The Sides Of It

The design was one central shaft with three branches curving up from each side.

That makes seven lamps total once the shaft's own lamp is counted.

**"Seven"** is the number of completeness used throughout Scripture.

Later Jewish and Christian writers alike saw this shape as a picture of complete light.

🌿 Three branches curved up from each side

🪔 Seven lamps total, shaft included

✨ Seven is Scripture's number of completeness

📖 The shape pictured complete, perfect light

## 🌸 Three Bowls Made Like Unto Almonds

A **"knop"** is an old word for an ornamental bud shape.

Each one was carved to look like an almond blossom.

The almond tree bloomed first each year in that region, ahead of every other tree.

Its blossom already stood for new life and a fresh start.

🌸 Knop means an ornamental bud shape

🌱 Carved to look like an almond blossom

📆 Almonds bloomed first each year there

📖 The shape pictured new life

## 🔢 Four Bowls Made Like Unto Almonds

Each side branch carried three almond bowls, but the central shaft carried four.

The extra bowl marked the central shaft as the piece the other six branches grew out from.

Numbers 17 later tells of Aaron's rod, which buds, blossoms, and produces almonds overnight as proof of his priesthood.

The same almond image marks both the lampstand and Aaron's own authority.

🔢 Central shaft got four bowls, branches three

🌳 The extra bowl marked the main shaft

🪄 Aaron's rod later buds in Numbers 17

📖 One almond image, two different proofs

## 🔗 A Knop Under Two Branches Of The Same

Verse 35 repeats the same phrase three times, once for each pair of branches.

Each knop sat at the exact point where a pair of branches met the central shaft.

That was not just decoration.

It marked and strengthened every joint where the metal actually had to bear weight.

🔁 The same phrase repeats three times

🔗 A knop marked each joint point

💪 Every joint also had to bear weight

📖 Beauty and structure shared the same spot

## ✨ All It Shall Be One Beaten Work Of Pure Gold

Verse 36 states plainly what the last several verses have been showing all along.

Shaft, branches, bowls, knops, and flowers were never separate pieces joined together.

They were one single piece of gold from the very start.

A design this unified left no seams for anyone to hide a shortcut in.

🔗 Shaft, branches, and flowers all connect

🚫 No seams to hide a shortcut in

✨ Unity itself was part of the design

📖 One piece, not several joined together

## 🔥 Thou Shalt Make The Seven Lamps Thereof

The **"lamps"** were small oil containers set on top of each branch, not the branches themselves.

Each one held oil and a wick, lit fresh every evening by the priests.

The lamps were set to shine **"over against it"**, meaning toward the table of shewbread across the room.

Light from one piece of furniture fell directly onto the bread of another.

🔥 Lamps were small oil containers on top

🕯️ Priests lit them fresh each evening

🍞 Their light aimed at the shewbread table

📖 One object's light fell on another

## ✂️ The Tongs Thereof And The Snuffdishes Thereof

**"Snuffdishes"** were small trays that caught the burnt wick trimmings.

**"Tongs"** were the tool used to trim the wicks themselves.

These were maintenance tools, the least glamorous part of the whole design.

They still had to be made of pure gold, not a cheaper metal.

🧹 Snuffdishes caught the burnt wick pieces

✂️ Tongs trimmed the wicks themselves

🥇 Even cleanup tools were made of gold

📖 Nothing here was allowed to be cheap

## ⚖️ Of A Talent Of Pure Gold Shall He Make It

A **"talent"** was the largest unit of weight in the ancient world.

It weighed close to seventy five pounds.

The lampstand and every one of its gold tools came from that single, massive block.

That much gold represented an almost unimaginable amount of wealth in one object.

⚖️ Talent means about seventy five pounds

💰 One huge block supplied the whole lampstand

😮 An enormous concentration of wealth

📖 Wealth itself became an offering

## 📐 Look That Thou Make Them After Their Pattern

The chapter closes exactly the way it opened, back at the pattern from verse nine.

Nothing in the tabernacle's furniture was left to human invention.

Every object, down to a lamp's decorative knops, matched a design Moses had already been shown.

He saw all of this before he ever picked up a single tool.

🔁 The chapter ends where it began

📐 Every detail matched a shown pattern

🚫 Nothing was left to human invention

📖 Moses built only what he was shown`.trim();

export const EXODUS_TWENTY_FIVE_PERSONAL_SECTIONS = parseExodusTwentyFiveRawNotes(EXODUS_TWENTY_FIVE_RAW_NOTES);
