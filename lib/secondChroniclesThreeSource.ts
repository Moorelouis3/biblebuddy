export type SecondChroniclesThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThreeRawNotes(rawText: string): SecondChroniclesThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 3:${startVerse}` : `2 Chronicles 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THREE_RAW_NOTES = `# SecondChronicles 3:1-2
# 🏔️ Building Begins On Mount Moriah
---
## ⛰️ In Mount Moriah

Mount Moriah is not a new place in the story.

It is the same mountain where Abraham once brought Isaac to offer him as a sacrifice.

God stopped Abraham there and provided a ram instead.

Centuries later, Solomon builds God's house on that very spot.

⛰️ Moriah is a specific named mountain

📖 Abraham offered Isaac there in Genesis 22

🐏 God provided a ram in his place

➡️ The same mountain now holds God's house

---

## ⚔️ Where The LORD Appeared Unto David His Father

This appearing did not happen in Solomon's lifetime.

It happened years earlier, to David, on this same threshingfloor.

David had sinned by taking a census, and a plague struck Israel.

An angel stood at this exact spot with a sword raised over Jerusalem.

David built an altar there and the plague stopped.

That mercy is why Solomon chooses this ground to build on.

👴 David his father means David personally

⚔️ An angel once stood at this spot

🛑 A deadly plague stopped right here

📖 Solomon builds on the site of mercy

---

## 🌾 In The Threshingfloor Of Ornan The Jebusite

A threshingfloor was a flat, open space where farmers separated grain from stalks.

It was usually just outside a city, on high, windy ground.

Ornan was a Jebusite, one of the Canaanite people living in Jerusalem before David.

David bought this exact plot from Ornan for full price rather than take it free.

An ordinary farmer's field became the ground for God's house.

🌾 A threshingfloor separated grain from stalks

🏙️ Ornan was a Jebusite living in Jerusalem

💰 David paid full price for the land

📖 A farmer's field became sacred ground

---

## 🗓️ In The Second Day Of The Second Month, In The Fourth Year Of His Reign

Solomon began construction in his fourth year as king.

The second month of the Hebrew calendar was later called Ziv, meaning brightness.

It fell in the springtime, around modern April or May.

Starting a project this large took years of planning before the first stone was cut.

The timing shows careful preparation, not a rushed decision.

👑 Solomon's fourth year as king

🌸 The second month was called Ziv

🗓️ Ziv fell in the spring season

📖 Years of planning came before this day

# SecondChronicles 3:3-4
# 📐 The House Takes Shape
---
## 📜 Solomon Was Instructed For The Building

Solomon did not design this temple from his own imagination.

His father David had already received a detailed plan before he died.

First Chronicles says David got that pattern directly from God and wrote it down.

Solomon is now building from a blueprint he did not draw himself.

The temple's design carries God's own instructions, passed through two kings.

📜 Solomon followed an existing plan

👴 David received the pattern from God

✍️ David wrote the plan down first

📖 God's instructions passed through two kings

---

## 📏 The Length By Cubits After The First Measure Was Threescore Cubits, And The Breadth Twenty Cubits

A cubit was an ancient measurement, about the length of a man's forearm.

Threescore is an old way of saying sixty.

So the main hall of the temple was about sixty cubits long, close to ninety feet.

The breadth of twenty cubits was about thirty feet wide.

That is close to the footprint of a small modern gymnasium.

📏 A cubit is about a forearm's length

🔢 Threescore means sixty

📐 The hall was about ninety feet long

📖 About thirty feet wide, like a court

---

## 📈 The Height Was An Hundred And Twenty

This measurement describes the porch, not the whole house.

An hundred and twenty cubits comes to about a hundred and eighty feet tall.

That is far taller than the thirty cubit height of the house itself.

Many scholars believe a copying error crept into this number.

Older translations give the porch a shorter, more workable height instead.

The number that survives today still puzzles many readers.

📏 This is the porch, not the house

📈 An hundred and twenty cubits is huge

⚖️ Far taller than the house behind it

📖 Many scholars suspect a copying error

---

## ✨ He Overlaid It Within With Pure Gold

Solomon covered the entire inside of the main hall in solid gold.

This was not a thin layer of paint or a few gold accents.

Every surface a worshiper could see was gold from floor to ceiling.

The wealth on display was meant to reflect the greatness of the God it honored.

✨ The whole inside was covered in gold

🏛️ Not paint, but real solid gold

👀 Every visible surface caught the light

📖 The gold matched the size of God's greatness

# SecondChronicles 3:5-7
# ✨ Gold, Wood, And Carved Cherubims
---
## 🪚 The Greater House He Cieled With Fir Tree

The greater house means the main hall, the largest room in the temple.

To cieled means to cover or panel the walls and ceiling with wood.

Fir tree was a lighter wood than the heavy cedar used elsewhere.

Workers lined this huge room in wood paneling before any gold went on top.

The wood gave the gold overlay something solid to attach to.

🏛️ The greater house is the main hall

🪚 Cieled means covered in wood paneling

🌲 Fir tree is lighter than cedar

📖 Wood paneling came before the gold

---

## 🌴 Set Thereon Palm Trees And Chains

Solomon decorated the gold paneling with carved palm trees and chain patterns.

Palm trees stood for a flourishing, well watered life in the ancient world.

The same image echoes the garden of Eden.

Eden was a paradise where God's presence lived among the trees.

These chains were decorative carvings, not functional metal links.

🌴 Palm trees pictured a flourishing life

🌿 The image echoes the garden of Eden

🔗 Chains here were decorative carvings

📖 The room felt like a garden with God

---

## 💎 Garnished The House With Precious Stones For Beauty

To garnish means to decorate or add finishing touches.

Solomon set real gemstones into the walls purely for their beauty.

Nothing about this was required for the room to function as a place of worship.

The stones existed only to make the house more glorious to look at.

💎 Garnish means to decorate

🏛️ Real gemstones were set into the walls

🎨 The stones served no practical function

📖 Beauty itself honored God

---

## 📍 The Gold Was Gold Of Parvaim

Parvaim was a place known for a particular kind of gold.

This is the only time this place name appears anywhere in the Bible.

The text does not tell us exactly where Parvaim was located.

Some scholars guess it was in Arabia or another gold trading region nearby.

Naming the gold's origin shows Solomon used a specific, prized source.

📍 Parvaim was a source of gold

❓ Its exact location is not certain

✨ Solomon used a specifically prized gold

📖 The name itself signals something rare

---

## 🚪 The Beams, The Posts, And The Walls Thereof, And The Doors Thereof, With Gold

Gold did not stop at the walls and ceiling.

Solomon covered the beams, the support posts, and even the doors in gold.

Every structural piece a person could see or touch was covered.

Nothing in this room was left in plain wood.

🪵 Beams and posts were gold covered too

🚪 Even the doors were overlaid in gold

👐 Every visible surface got the same treatment

📖 Nothing was left plain

---

## 👼 Graved Cherubims On The Walls

To grave means to carve a design into a surface.

Cherubims are angelic beings who guard the presence of God.

The first cherub in the Bible guarded the entrance to Eden after Adam and Eve sinned.

Now carved cherubim guard the walls of the room built for God to dwell in.

The same kind of guardian returns at the room built to hold His presence.

🖋️ Graved means carved into a surface

👼 Cherubims are guardians of God's presence

🚪 The first cherub guarded Eden's entrance

📖 Now they guard God's house instead

# SecondChronicles 3:8-9
# 🕍 The Most Holy House
---
## 🕍 The Most Holy House

The most holy house is often called the Holy of Holies.

It was the innermost room of the temple, where the ark of the covenant rested.

Only the high priest could enter this room, and only once a year.

Everyone else in Israel, priests included, stayed outside its curtain.

This was the most restricted, most sacred space in the entire nation.

🕍 Also called the Holy of Holies

📦 It held the ark of the covenant

🚫 Only the high priest could enter

📖 Entry happened just once each year

---

## ⬛ Twenty Cubits, And The Breadth Thereof Twenty Cubits

This room was exactly square, twenty cubits by twenty cubits.

The tabernacle's own Holy of Holies had followed the same design, ten cubits by ten cubits.

Solomon's version simply doubled that same perfect square.

A perfect cube shape appears again much later, in Revelation's description of the New Jerusalem.

God's dwelling place keeps this same shape across the whole story of the Bible.

⬛ The room was a perfect square

⛺ The tabernacle used the same shape

✖️ Solomon simply doubled the size

📖 Revelation later reuses this cube shape

---

## ⚖️ Overlaid It With Fine Gold, Amounting To Six Hundred Talents

A talent was a unit of weight, not a coin.

One talent weighed about seventy five pounds.

Six hundred talents of gold comes out to around twenty tons of pure gold.

That much gold covered a room only thirty feet across.

The sheer weight of gold in one small room is almost impossible to picture.

⚖️ A talent weighed about seventy five pounds

🔢 Six hundred talents is about twenty tons

📏 All for a room thirty feet wide

📖 An almost unimaginable amount of gold

---

## 🔩 The Weight Of The Nails Was Fifty Shekels Of Gold

A shekel was a much smaller unit of weight than a talent.

Fifty shekels of gold weighed a little over a pound.

Even the nails holding the gold panels in place were made of gold.

Nothing in this room, down to the smallest fastener, was left ordinary.

⚖️ A shekel is far smaller than a talent

🔩 Fifty shekels weighed about a pound

🔨 Even the nails were gold

📖 Nothing here was left ordinary

# SecondChronicles 3:10-13
# 🪽 Two Cherubims Guard The Ark's Room
---
## 🗿 Two Cherubims Of Image Work

Image work means a carved, three dimensional figure, not a flat picture.

These two cherubim were large wooden statues, later covered in gold.

That is different from the small cherubim woven into the tabernacle's curtain.

The ark's mercy seat also had two tiny cherubim of its own.

This new pair was built far larger, for this much bigger room.

🗿 Image work means a carved statue

🌳 Carved wood, later covered in gold

🧵 Different from the woven curtain cherubim

📖 Built new and much larger this time

---

## 📏 The Wings Of The Cherubims Were Twenty Cubits Long

Each cherub had two wings, and each single wing measured five cubits.

Two wings per cherub, times two cherubim, adds up to twenty cubits total.

That total exactly matched the width of the room they stood in.

The statues were sized to fill the entire room from wall to wall.

📏 Each wing measured five cubits

➗ Four wings together equal twenty cubits

📐 That matched the room's full width

📖 The statues filled the room completely

---

## 🖐️ Reaching To The Wall Of The House

Each cherub's outer wing stretched all the way to touch a side wall.

One cherub's wing touched the wall on one side of the room.

The other cherub's wing touched the wall on the opposite side.

Together they stretched the full width of the space, wall to wall.

🖐️ One outer wing touched each wall

↔️ The cherubim faced opposite side walls

📏 Together they spanned the whole room

📖 No gap was left uncovered

---

## 🤝 Joining To The Wing Of The Other Cherub

While the outer wings touched the walls, the inner wings met in the middle.

The two statues formed one continuous, unbroken line of wings across the room.

There was no gap between the two cherubim at the center of the space.

The image was one seamless covering, not two separate statues standing apart.

🤝 Inner wings touched each other

➡️ They formed one continuous line

🚫 No gap sat between them

📖 It read as one seamless covering

---

## 🧍 They Stood On Their Feet

Many carved guardian figures in the ancient world were shown reclining or resting.

These cherubim were carved standing upright instead, on their own feet.

A standing posture reads as active and alert, not passive.

The image pictured guardians on duty, not decorations at ease.

🧍 They stood upright, not reclining

🛡️ Standing suggested active guarding

👁️ Not a resting, passive pose

📖 These were guardians on duty

---

## 👀 Their Faces Were Inward

Their faces were turned inward, toward the middle of the room.

That is different from the two small cherubim on top of the ark.

Those smaller cherubim faced each other and looked down at the mercy seat.

These larger cherubim faced into the room instead, not down and not at each other.

👀 Faces turned toward the room's center

🔄 Different from the ark's smaller pair

⬇️ Those cherubim faced each other, looking down

📖 These faced into the room instead

# SecondChronicles 3:14
# 🧵 The Vail Between
---
## 🧵 The Vail Of Blue, And Purple, And Crimson, And Fine Linen

The vail was a heavy curtain hung across the entrance to the most holy house.

Blue, purple, and crimson were expensive dyed threads woven into the fabric.

Fine linen was a high quality cloth, not ordinary homespun material.

This curtain was the only thing separating sinful people from God's most sacred space.

A curtain like this later tore in two the moment Jesus died.

🧵 The vail was a heavy curtain

🎨 Blue, purple, and crimson were costly dyes

🚧 It separated people from God's space

📖 A similar curtain later tore at the cross

---

## 🪡 Wrought Cherubims Thereon

Wrought means crafted or worked by hand into a material.

These cherubim were woven or embroidered into the curtain's fabric.

That is different from the two large carved cherubim standing nearby.

Guardian figures appeared throughout this room in more than one form.

🧶 Wrought means worked by hand

🪡 These cherubim were woven into cloth

🗿 Different from the carved standing pair

📖 Guardians appeared in more than one form

# SecondChronicles 3:15-17
# 🏛️ Jachin And Boaz
---
## 🏛️ Two Pillars Of Thirty And Five Cubits High

Solomon set up two tall pillars in front of the temple, not holding up any roof.

Thirty and five cubits means thirty five cubits tall.

First Kings gives a different number, eighteen cubits, for these same pillars.

Some scholars believe the thirty five cubits here may be both pillars added together.

Either way, these were massive, freestanding columns meant to be seen from far off.

🏛️ Two pillars stood free, not structural

📏 About fifty two feet tall

👀 Built to be seen from far away

📖 First Kings gives a different number

---

## 👑 The Chapiter That Was On The Top Of Each Of Them Was Five Cubits

A chapiter is the decorated top piece of a pillar, also called a capital.

Each pillar's chapiter added another five cubits, about seven feet.

That crown shaped top was wider and more ornate than the plain shaft below it.

The decoration made sure these pillars looked finished, not like bare stone posts.

👑 Chapiter means the pillar's decorated top

📏 Each chapiter added about seven feet

🎨 Wider than the plain shaft below

📖 It gave the pillars a finished look

---

## 🔗 Chains, As In The Oracle

The oracle is another name for the most holy house, the innermost room.

Solomon decorated these outdoor pillars with the same style of chain carving used inside.

Repeating the pattern connected the entrance pillars visually to the most sacred space within.

A visitor saw the same design language before even stepping through the door.

🕍 Oracle refers to the most holy house

🔗 The same chain pattern was reused

🚪 It linked the entrance to the inner room

📖 The design matched, inside and out

---

## 🍎 An Hundred Pomegranates

Pomegranates were a fruit associated with abundance and fruitfulness in the ancient world.

Solomon hung a hundred carved pomegranates on the chains covering these pillars.

The high priest's robe also carried pomegranate shapes stitched around its hem.

The same fruit symbol tied the entrance pillars to the priest who served inside.

🍎 Pomegranates pictured abundance and fruitfulness

🔢 A hundred decorated the pillar chains

👔 The priest's robe used the same shape

📖 One symbol linked the pillars and the priest

---

## 🧭 One On The Right Hand, And The Other On The Left

Solomon placed one pillar on the south side of the entrance and one on the north.

Right and left are given from the viewpoint of someone standing facing the temple.

Two matching pillars framed the entrance like a grand gateway.

Anyone approaching the temple walked between them before reaching the door.

🧭 Right hand faced south, left faced north

🚪 They stood on either side of the entrance

🏛️ Together they framed a grand gateway

📖 Visitors walked between them to enter

---

## 🏗️ Called The Name Of That On The Right Hand Jachin

Naming a pillar might sound strange to a modern reader.

In the ancient world, giving something a name could carry a spoken blessing.

Jachin means he shall establish, or he will make firm.

The name spoken over this pillar declared that God would keep his dynasty standing.

📛 Naming a pillar carried real meaning

🏗️ Jachin means he shall establish

👑 It spoke a promise over the dynasty

📖 A pillar's name became a declaration

---

## 💪 The Name Of That On The Left Boaz

Boaz means in him is strength.

This second pillar's name declared where Israel's real strength would come from.

Not from armies or walls, but from God himself.

Two pillars together spoke one message before a visitor ever entered the temple.

💪 Boaz means in him is strength

🛡️ Strength came from God, not armies

🏛️ Both pillars spoke one shared message

📖 God establishes, and God is the strength`.trim();

export const SECOND_CHRONICLES_THREE_PERSONAL_SECTIONS = parseSecondChroniclesThreeRawNotes(SECOND_CHRONICLES_THREE_RAW_NOTES);
