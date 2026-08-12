export type FirstKingsSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsSixRawNotes(rawText: string): FirstKingsSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsSix\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsSix\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsSix\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 6:${startVerse}` : `1 Kings 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Kings 6 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_SIX_RAW_NOTES = `# FirstKingsSix 6:1-4
# 🏗️ Solomon Begins To Build The House
---
## 📅 In The Month Zif, Which Is The Second Month

Zif was the name of a month in Israel's early calendar, before it was renamed.

It fell in springtime, close to modern April and May.

Later in Israel's history this same month came to be called Iyar.

Solomon started construction close to the start of the region's dry building season.

📅 Zif was Israel's second calendar month

🌱 It fell in springtime, near April and May

🔄 Later renamed Iyar in Jewish tradition

📖 Solomon began building in the dry season

## 🔗 In The Four Hundred And Eightieth Year After The Children Of Israel Were Come Out Of The Land Of Egypt

This verse ties the exodus straight to the temple's first stone.

Four hundred eighty years had passed since Israel left Egypt under Moses.

That is the only verse in the whole Bible giving this exact span of years.

The house finally being built showed that God's long promise was not forgotten.

🔗 This links the exodus to the temple

🕰️ Four hundred eighty years had passed

📜 No other verse states this exact number

📖 A long promise was finally kept

## 🏗️ He Began To Build The House Of The LORD

Everything in chapter five was preparation, cedar cut, stone dressed, workers organized.

This verse is where preparation finally becomes construction.

Israel had worshipped at a portable tent for generations before this moment.

A permanent house for God's presence had never existed until now.

🏗️ Chapter five was all preparation

🔨 This verse starts real construction

⛺ Israel had only had a portable tent

📖 A permanent house had never existed

## 📏 The Length Thereof Was Threescore Cubits, And The Breadth Thereof Twenty Cubits, And The Height Thereof Thirty Cubits

A cubit was an ancient measure close to the length of a man's forearm.

It equaled about eighteen inches, a little less than two modern feet.

Threescore is an old way of saying sixty.

So the house measured close to ninety feet long, thirty feet wide, and forty five feet tall.

That is close to the size of a small modern church sanctuary.

📏 A cubit was close to eighteen inches

🔢 Threescore means sixty

📐 The house was about ninety feet long

📖 It was sized like a small sanctuary

## 🚪 The Porch Before The Temple

A porch here was an entrance hall standing in front of the main building.

It matched the twenty cubit width of the house itself.

Second Chronicles adds a striking detail this book leaves out, the porch stood one hundred twenty cubits high.

Visitors walked through this tall entrance before ever reaching the main room.

🚪 A porch was an entrance hall

📏 It matched the house's width

🏰 Chronicles says it stood very tall

📖 Visitors entered through it first

## 🪟 He Made Windows Of Narrow Lights

"Lights" is an old word for windows or window openings.

"Narrow lights" means the windows were slim, more like tall slits than modern glass panes.

Narrow openings let light and air in while still keeping the walls strong.

Ancient temples were not built for a view, they were built for the presence of God.

🪟 Lights is an old word for windows

📏 Narrow lights means slim window slits

💨 Narrow openings still let in air

📖 The temple was not built for a view

# FirstKingsSix 6:5-10
# 🧱 Chambers Built Against The Wall
---
## 🧱 Against The Wall Of The House He Built Chambers Round About

Solomon added a ring of small side rooms wrapped around the temple's outer walls.

These chambers did not stand alone, they leaned against the temple's own stone walls.

Later books describe rooms like these holding the temple's treasures and equipment.

The main sanctuary stayed simple while these side rooms did the practical work.

🧱 Side chambers wrapped around the temple

🏛️ They leaned on the temple's own walls

💰 Later texts describe them holding treasures

📖 The sanctuary itself stayed simple

## 📦 Both Of The Temple And Of The Oracle

"Temple" here names the main hall, the larger front room of the house.

"Oracle" names something different, the small inner room at the very back.

The oracle held the ark of the covenant and was also called the Most Holy Place.

Every side chamber wrapped around both of these rooms, not just one.

🏛️ Temple means the larger main hall

📦 Oracle means the innermost holy room

✨ The oracle held the ark

📖 Chambers wrapped around both rooms

## 🏢 The Nethermost Chamber Was Five Cubits Broad, And The Middle Was Six Cubits Broad, And The Third Seven Cubits Broad

"Nethermost" is an old word for the lowest or bottom level.

The side chambers were stacked three stories high around the temple.

Each story grew one cubit wider than the story below it.

That small growth in width came from a clever trick explained in the next verse.

🏢 Nethermost means the bottom floor

🔼 Three floors of chambers stacked up

📏 Each floor grew slightly wider

📖 The next verse explains why

## 🪜 That The Beams Should Not Be Fastened In The Walls Of The House

"Narrowed rests" were ledges built into the outer wall, each one stepping outward slightly.

Builders rested the floor beams for each story on these ledges instead of drilling into the temple wall.

That is why each higher floor could be a little wider than the one below it.

The temple's own sacred stone walls were never cut into for these side rooms.

🪜 Narrowed rests were stepped wall ledges

🪵 Beams rested on ledges, not drilled holes

📈 That is why each floor grew wider

📖 The sacred wall stayed uncut

## 🔇 Neither Hammer Nor Axe Nor Any Tool Of Iron Heard In The House, While It Was In Building

Every stone arrived at the building site already cut and shaped.

Workers finished all the cutting and fitting work at the quarry, far from the temple site.

That meant no hammering and no loud construction noise at the temple itself.

Iron tools were also linked with weapons and war in that world.

🔨 Stones arrived already cut and shaped

⛏️ Cutting happened far at the quarry

🔇 No construction noise at the temple site

📖 Iron was linked with weapons and war

## 🚪 The Door For The Middle Chamber Was In The Right Side Of The House

Only the middle floor of chambers had a door leading in from outside.

From that single entrance, workers used winding stairs to reach every other level.

Going up, the stairs led to the third floor above.

Going down, they must have led to the lowest floor as well.

🚪 Only the middle floor had an outside door

🌀 Winding stairs connected every level

⬆️ Stairs led up to the top floor

📖 One entrance served three whole floors

## 🏠 And Covered The House With Beams And Boards Of Cedar

This verse marks the house's outer shell being complete.

Cedar beams held up the roof structure across the whole building.

Cedar boards then covered that frame, giving the roof its finished surface.

The next few verses turn from the outside shell to what waited inside.

🏠 The house's outer shell was complete

🪵 Cedar beams held up the roof

🪚 Cedar boards finished the roof surface

📖 The story now moves inside

## 🔁 They Rested On The House With Timber Of Cedar

This verse circles back to finish the side chamber detail from earlier in the section.

Each chamber level stood five cubits high, close to seven and a half feet.

Cedar timber again did the structural work, just as it did for the temple's own roof.

Even the practical, workaday side rooms were built with the same costly wood as the sanctuary.

🔁 This verse returns to the side chambers

📏 Each chamber level stood five cubits high

🪵 Cedar timber framed these rooms too

📖 Even side rooms used costly wood

# FirstKingsSix 6:11-14
# 📜 The LORD's Word To Solomon
---
## 📜 And The Word Of The LORD Came To Solomon, Saying

God interrupts the construction details with a direct message.

This is not Solomon praying and receiving an answer, this word simply comes to him.

It happens partway through construction, not before it and not after it.

Building a house for God did not replace hearing directly from God.

📜 God interrupts with a direct message

🗣️ The word simply comes to Solomon

🏗️ It arrives mid construction

📖 Building did not replace hearing from God

## ⚖️ If Thou Wilt Walk In My Statutes, And Execute My Judgments, And Keep All My Commandments To Walk In Them

God attaches a clear condition to what happens next.

"Statutes" and "judgments" and "commandments" are three ways of naming God's law given through Moses.

The temple itself was never the point of the covenant, obedience was.

A beautiful building could not replace a faithful king and a faithful people.

📏 God attaches a real condition here

⚖️ Statutes, judgments, and commandments all mean God's law

🏛️ The temple was never the real point

📖 Obedience mattered more than the building

## 🔗 Then Will I Perform My Word With Thee, Which I Spake Unto David Thy Father

This points back to a promise God made to David, not to Solomon directly.

Second Samuel records God promising David an everlasting house and throne through his son.

Solomon is watching that old promise begin to take real shape.

The temple being built is proof that God keeps promises made a generation earlier.

🔗 This promise was first made to David

📜 Second Samuel records the original promise

👑 Solomon watches it take shape

📖 God keeps promises across generations

## 🏛️ And I Will Dwell Among The Children Of Israel, And Will Not Forsake My People Israel

This is the real purpose behind the entire building project.

God is not promising to live trapped inside a building.

He is promising His ongoing presence with the whole nation, not just with one structure.

The temple would become the visible sign of a promise bigger than any building.

🏛️ This names the project's real purpose

🚫 God is not trapped inside a building

🤝 His presence was with the whole nation

📖 The temple was a sign, not a container

## 🔁 So Solomon Built The House, And Finished It

This short line repeats almost exactly what verse nine already said.

Repeating it here marks a clear pause before the story moves to the interior details.

Everything from here forward describes what the house looked like inside.

The outer construction phase of this chapter is officially finished.

🔁 This line repeats verse nine closely

⏸️ It marks a pause in the story

🚪 The chapter now moves inside

📖 The outer construction phase ends here

# FirstKingsSix 6:15-18
# 🪵 Cedar Boards Within The House
---
## 🪨 He Built The Walls Of The House Within With Boards Of Cedar

Outside, the temple looked like plain, heavy stone.

Inside, not a single stone surface was left showing.

Cedar boards lined every interior wall from floor to ceiling.

The costliest material available covered everything a worshipper could actually see or touch.

🪨 Outside looked like plain stone

🪵 Inside was fully lined with cedar

👁️ No stone surface was left visible

📖 The costliest material touched every eye

## 🌲 Covered The Floor Of The House With Planks Of Fir

Fir was a lighter, paler wood than the deep, reddish cedar.

Builders used it here for the floor, a practical choice for something people would walk on.

Cedar handled the walls and ceiling, fir handled the floor underfoot.

Even the flooring in God's house used a costly, imported wood rather than plain stone.

🌲 Fir was a lighter colored wood

👣 It floored the space people walked on

🪵 Cedar handled walls, fir handled floors

📖 Even the floor used costly wood

## 📦 Even For The Oracle, Even For The Most Holy Place

This verse marks off a room inside the room, twenty cubits square at the back of the house.

"Oracle" and "most holy place" are two names for this exact same inner room.

It sat behind the forty cubit long main hall, sealed off from the rest of the building.

This small back room mattered more than the entire rest of the structure around it.

📐 Twenty cubits marked off the innermost room

📦 Oracle means the most holy place

🚪 It sat sealed behind the main hall

📖 This small room mattered most of all

## 🏛️ And The House, That Is, The Temple Before It, Was Forty Cubits Long

This verse clarifies that "temple" here means the larger front room, not the whole building.

Forty cubits works out to about sixty feet long.

Add the twenty cubit oracle behind it and the total interior runs close to ninety feet.

Two very different sized rooms sat back to back inside one building.

🏛️ Temple here means the larger front room

📏 Forty cubits was about sixty feet

➕ Together the rooms ran close to ninety feet

📖 Two different sized rooms sat back to back

## 🌱 The Cedar Of The House Within Was Carved With Knops And Open Flowers

"Knops" is an old word for carved, rounded bud shapes, like a flower before it opens.

"Open flowers" were the fuller, blossomed carving right beside them.

Craftsmen carved this pattern across the cedar panels lining the walls.

The pattern likely echoed the natural, growing world, much like the garden imagery elsewhere in the tabernacle.

🌱 Knops were carved bud shapes

🌸 Open flowers were fuller carved blossoms

🪵 This pattern covered the cedar panels

📖 It echoed growing, natural imagery

## 🔁 All Was Cedar, There Was No Stone Seen

This line repeats the point from verse fifteen, but even more firmly.

Every visible interior surface, walls, ceiling, and carved panels, was wood.

Stone still held the building up, it simply never showed itself.

The strength of stone stayed hidden, only the beauty of cedar was on display.

🔁 This repeats an earlier point firmly

🪵 Every visible surface was cedar

🪨 Stone still held up the structure

📖 Strength stayed hidden, beauty was on display

# FirstKingsSix 6:19-22
# 🥇 The Oracle Overlaid With Pure Gold
---
## 📦 And The Oracle He Prepared In The House Within, To Set There The Ark Of The Covenant Of The LORD

Everything about the oracle's design existed to hold one object.

The ark of the covenant carried the stone tablets of the law inside it.

This same ark had traveled with Israel through the wilderness for generations before this room ever existed.

A portable box finally received a permanent home built specifically to hold it.

📦 The oracle existed to hold one object

📜 The ark held the stone tablets

⛺ It had traveled with Israel for generations

📖 A portable box finally had a home

## 📐 The Oracle In The Forepart Was Twenty Cubits In Length, And Twenty Cubits In Breadth, And Twenty Cubits In The Height Thereof

Length, breadth, and height all matched at twenty cubits each.

That makes the oracle a perfect cube, close to thirty feet on every side.

A cube shape appears again much later in the Bible describing the New Jerusalem in Revelation.

Perfect, balanced proportions marked this room as different from every other space in the temple.

📐 All three measurements matched at twenty cubits

🧊 The oracle formed a perfect cube

🏙️ Revelation later describes a cube shaped city

📖 Perfect proportions marked this room as different

## 🥇 And He Overlaid It With Pure Gold

Every visible surface inside the oracle was covered in solid gold, not just gold paint.

"Pure gold" specifies the highest, most refined quality available.

Covering an entire thirty foot cube in gold represented an almost unimaginable cost.

No expense was spared for the one room meant to hold the ark.

🥇 Every surface was covered in gold

✨ Pure gold meant the highest quality

💰 The cost was almost unimaginable

📖 No expense was spared for this room

## 🕯️ And So Covered The Altar Which Was Of Cedar

This altar stood just outside the oracle, in front of its entrance.

Second Chronicles calls this the incense altar, used for burning incense daily.

Even though its frame was ordinary cedar wood, its surface was still covered in gold.

Nothing near the ark's resting place was left plain or unfinished.

🕯️ This altar stood just outside the oracle

📜 Chronicles calls it the incense altar

🪵 Cedar formed its frame underneath the gold

📖 Nothing near the ark stayed plain

## 🥇 So Solomon Overlaid The House Within With Pure Gold

Gold now spreads from the oracle out across the entire interior of the house.

This was not one gilded room inside a plain building.

The whole inside of God's house shone with the same costly covering.

Verse fifteen described cedar covering every wall, now gold covers that same cedar.

🥇 Gold spread across the whole interior

🚫 This was not just one gilded room

🏛️ The entire house shone with gold

📖 Gold now covered the cedar underneath

## ⛓️ And He Made A Partition By The Chains Of Gold Before The Oracle

Gold chains formed a visible boundary marking off the oracle's entrance.

This barrier stood in addition to any curtain or wall separating the rooms.

A worshipper walking through the temple would see, before ever reaching it, that the next room was set apart.

Some boundaries in God's house were meant to be seen before they were ever crossed.

⛓️ Gold chains marked the oracle's entrance

🚧 This barrier added to any curtain

👁️ Visitors could see the room was set apart

📖 Some boundaries were meant to be seen first

## 🔁 And The Whole House He Overlaid With Gold, Until He Had Finished All The House

This verse restates the scale of the project one more time, for emphasis.

"Until he had finished" shows gold covered every remaining surface, not just the impressive parts.

Repetition like this is common in these chapters, driving home just how total the covering was.

By the end, gold was not an accent, it was the surface of nearly the entire interior.

🔁 This restates the project's full scale

🥇 Every remaining surface received gold

📢 Repetition emphasizes how total it was

📖 Gold was the surface, not an accent

## 🪑 Also The Whole Altar That Was By The Oracle He Overlaid With Gold

This confirms the same incense altar from verse twenty again, now fully finished.

Every piece of furniture standing near the ark's room received the identical gold treatment.

Nothing structural inside the temple was left in its raw, unfinished wood state.

The chapter has now covered walls, floors, and every nearby altar in gold.

🔁 This confirms the same altar again

🪑 Every nearby piece got the same treatment

🚫 Nothing stayed in raw wood

📖 Gold now covered walls, floors, and altars

# FirstKingsSix 6:23-30
# 👼 Two Cherubims Of Olive Tree
---
## 👼 Within The Oracle He Made Two Cherubims Of Olive Tree

Cherubims are heavenly beings the Bible often connects with guarding sacred space.

Genesis places a cherub guarding the entrance to Eden after Adam and Eve were sent out.

Solomon chose olive wood for these statues instead of the cedar used everywhere else.

Olive wood was extremely hard and dense, well suited to holding a heavy gold covering.

👼 Cherubims are heavenly guardian beings

🌳 Genesis shows a cherub guarding Eden

🫒 Olive wood was harder than cedar

📖 It could support a heavy gold covering

## 📏 Each Ten Cubits High

Ten cubits works out to about fifteen feet tall.

That made each statue close to three times the height of a grown man.

Two figures this size would have filled the twenty cubit cube of the oracle.

Their sheer size alone would have overwhelmed anyone allowed to see them.

📏 Ten cubits was close to fifteen feet

🧍 That was about three times human height

📦 Their size filled the oracle's cube shape

📖 Their scale alone was overwhelming

## 🪽 Five Cubits Was The One Wing Of The Cherub, And Five Cubits The Other Wing Of The Cherub

Each cherub had two wings spreading out from its body.

Each wing measured five cubits, close to seven and a half feet.

Both wings together on one cherub already reached the same width as the whole statue was tall.

Every measurement in this room seems to circle back to matching, balanced numbers.

🪽 Each cherub had two wings

📏 Each wing measured about seven feet

⚖️ Wingspan matched the statue's height

📖 The numbers keep circling back to balance

## 🖐️ From The Uttermost Part Of The One Wing Unto The Uttermost Part Of The Other Were Ten Cubits

"Uttermost part" means the very tip, the farthest edge of the wing.

Measured tip to tip, one cherub's wingspan reached ten cubits, the same as its full height.

A single statue was therefore as wide as it was tall, wingtip to wingtip.

That kind of exact symmetry does not happen by accident in a building this carefully planned.

🖐️ Uttermost part means the farthest tip

📏 Wingspan matched the statue's full height

🔲 Each cherub was as wide as tall

📖 This symmetry was planned, not accidental

## 👯 And The Other Cherub Was Ten Cubits, Both The Cherubims Were Of One Measure And One Size

The two statues were not simply similar, they were made to be identical.

Same height, same wingspan, same exact proportions on both figures.

Two matched guardians likely stood facing each other, framing the space between them.

The ark of the covenant would rest directly beneath their outstretched wings.

👯 The two statues were made identical

📐 Same height, wingspan, and proportions

🤝 They likely faced one another

📖 The ark would rest beneath their wings

## 📦 And He Set The Cherubims Within The Inner House

"Inner house" is another name for the oracle, the same room described since verse nineteen.

Solomon placed both massive statues permanently inside this innermost, most restricted room.

Almost no one, not even most priests, would ever walk in far enough to see them closely.

The most impressive craftsmanship in the entire temple was hidden from nearly everyone.

📦 Inner house means the oracle again

👼 Both statues stood in this innermost room

🚫 Almost no one could see them closely

📖 The best craftsmanship stayed hidden

## 🪽 The Wing Of The One Touched The One Wall, And The Wing Of The Other Cherub Touched The Other Wall

Each cherub stretched one wing all the way out to touch its own side wall.

That detail confirms the oracle's twenty cubit width exactly matched the statues' combined wingspan.

Nothing in the room was left as empty, wasted space.

The wings physically reached from one wall of God's house to the other.

🪽 Each outer wing touched its side wall

📐 This confirms the room's exact width

🚫 No space in the room was wasted

📖 Wings reached from wall to wall

## 🤝 And Their Wings Touched One Another In The Midst Of The House

While each cherub's outer wing touched a side wall, its inner wing met the other cherub's wing.

That meeting point sat exactly in the center of the room.

Picture a canopy of wings meeting overhead, unbroken from one wall to the other.

The two guardians formed one continuous covering rather than standing as two separate statues.

🤝 Inner wings met at the center

📍 The meeting point was the room's midpoint

🕊️ Picture one unbroken canopy of wings

📖 Two guardians formed one covering

## 🥇 And He Overlaid The Cherubims With Gold

Like everything else in the oracle, these towering wood statues disappeared under gold.

The hard olive wood underneath gave the gold a strong, stable frame to cling to.

No bare wood was left showing on figures this prominent.

Even the guardians watching over the ark matched the room's total covering of gold.

🥇 The statues were fully covered in gold

🫒 Olive wood gave the gold a strong frame

🚫 No bare wood was left showing

📖 Even the guardians matched the room's gold

## 🎨 He Carved All The Walls Of The House Round About With Carved Figures Of Cherubims And Palm Trees And Open Flowers

This carving pattern did not stay inside the oracle alone.

"Within and without" means both the inner oracle and the larger outer hall received the same design.

Cherubims, palm trees, and open flowers repeated across every wall in the entire building.

One unified pattern tied the whole interior together, from the most sacred room outward.

🎨 The carving spread beyond the oracle

🏛️ Within and without means both rooms

🌴 Cherubims, palms, and flowers repeated everywhere

📖 One pattern unified the whole interior

## 🥇 And The Floor Of The House He Overlaid With Gold, Within And Without

Gold now covers the very last unfinished surface, the floor itself.

Walls, ceiling, altar, statues, and now the floor all matched in gold.

"Within and without" again confirms this covered both the oracle and the outer main hall.

A worshipper standing anywhere inside this house stood on solid gold.

🥇 Gold now covered the floor too

🧱 Walls, altar, statues, and floor all matched

📦 Within and without means both rooms again

📖 Worshippers stood on solid gold

# FirstKingsSix 6:31-35
# 🚪 Doors Of Olive Tree And Fir Tree
---
## 🚪 And For The Entering Of The Oracle He Made Doors Of Olive Tree

A physical doorway marked the entrance into the oracle, not just a curtain or open gap.

Solomon chose the same durable olive wood used for the cherubim statues.

Anyone approaching the ark's room first had to pass through this specific doorway.

The entrance itself was built to match the seriousness of what stood beyond it.

🚪 A real doorway marked the oracle's entrance

🫒 Olive wood matched the cherubim statues

👣 Visitors had to pass through this door

📖 The entrance matched what stood beyond it

## 📏 The Lintel And Side Posts Were A Fifth Part Of The Wall

A "lintel" is the horizontal beam sitting across the top of a doorway.

"Side posts" are the vertical beams framing each side of the door.

Together they measured one fifth the width of the oracle's twenty cubit wall.

Even a doorframe's exact proportion mattered enough in this room to be written down.

📏 A lintel is the beam over a door

🚪 Side posts are the vertical door frames

🔢 Together they measured one fifth the wall

📖 Even doorframe proportions were recorded

## 🚪 The Two Doors Also Were Of Olive Tree

The oracle's entrance used two separate door panels rather than one large door.

Craftsmen carved the same recurring pattern from the walls onto these doors too.

Cherubims, palm trees, and open flowers appeared again, keeping the design consistent throughout.

Nothing in this room, down to the doors themselves, broke from the pattern.

🚪 The oracle used two separate door panels

🎨 The wall's carving pattern repeated here

🌴 Cherubims, palms, and flowers appeared again

📖 Nothing broke from the pattern

## 🥇 And Overlaid Them With Gold, And Spread Gold Upon The Cherubims, And Upon The Palm Trees

Gold now reaches all the way to the carved doors themselves.

The gold was not just laid flat, it was worked carefully into the raised carving.

Every cherub and palm tree carved into the wood received its own individual gold covering.

Even the smallest carved detail on the smallest surface still received full attention.

🥇 Gold reached the carved doors themselves

🎨 Gold was worked into the raised carving

👼 Each cherub and palm got individual gold

📖 Even small details received full attention

## 📏 So Also Made He For The Door Of The Temple Posts Of Olive Tree, A Fourth Part Of The Wall

This second doorway led into the larger outer hall, not the oracle.

Its door frame measured a fourth of the wall's width, slightly larger than the oracle's fifth.

A bigger, more public room got a slightly bigger, more prominent entrance.

Proportion, not just material, marked out which room mattered more.

🚪 This second door led to the outer hall

📏 Its frame measured a fourth of the wall

🏛️ The more public room got the bigger door

📖 Proportion marked which room mattered more

## 🌲 And The Two Doors Were Of Fir Tree

This outer doorway used fir instead of the costlier olive wood used at the oracle.

"Leaves" here means door panels, and "folding" means each door split into two hinged sections.

Folding doors like these could open wide for a whole procession or crowd to pass through.

Even the door mechanism matched the room's purpose, one for solemn entry, one for public gathering.

🌲 This outer door used fir, not olive

🚪 Leaves means panels, folding means hinged sections

👥 Folding doors could open wide for crowds

📖 The mechanism matched each room's purpose

## 🌴 And He Carved Thereon Cherubims And Palm Trees And Open Flowers

The same carved pattern appears a third time, now on the outer fir doors.

"Fitted upon the carved work" means the gold was shaped precisely to follow every groove and edge.

This was not a flat gold sheet laid on top, it was gold molded into the design itself.

By the end of the chapter, one single pattern had covered nearly every surface in the house.

🌴 The same carved pattern appears again

🎯 Fitted means gold followed every groove exactly

🚫 This was not a flat gold sheet

📖 One pattern covered nearly the whole house

# FirstKingsSix 6:36-38
# 🗓️ Seven Years In Building It
---
## 🧱 And He Built The Inner Court With Three Rows Of Hewed Stone, And A Row Of Cedar Beams

The inner court was an open, walled space surrounding the temple building itself.

Its boundary wall alternated material, three courses of cut stone topped by one course of cedar beams.

This same building method appears again later for Solomon's own palace complex.

The temple was not one isolated building, it stood inside a larger courtyard system.

🧱 The inner court surrounded the temple

🪨 Three stone courses topped by cedar beams

🏛️ The same method built Solomon's palace later

📖 The temple stood inside a larger courtyard

## 🔁 In The Fourth Year Was The Foundation Of The House Of The LORD Laid, In The Month Zif

This verse repeats the starting date already given back in verse one.

Repeating it here bookends the whole chapter with matching start and finish dates.

The fourth year of Solomon's reign now has a name attached to the beginning of a historic project.

Every date recorded here ties the temple firmly to real, known history rather than legend.

🔁 This repeats the chapter's opening date

🔖 It bookends the chapter with matching dates

👑 The fourth year began this historic project

📖 Real dates tie the temple to history

## 🗓️ And In The Eleventh Year, In The Month Bul, Which Is The Eighth Month, Was The House Finished

Bul was the eighth month on Israel's early calendar, close to modern October and November.

Solomon began building in his fourth year and finished in his eleventh.

That means construction ran seven full years from foundation to completion.

An enormous project this size, done with hand tools and imported materials, took close to a decade.

🗓️ Bul was the eighth month, near fall

📅 Building ran from year four to year eleven

🔢 That totaled seven full years

📖 A massive project took nearly a decade

## 📐 So Was He Seven Years In Building It

"Fashion" is an old word for design or pattern.

This confirms the finished house matched every detail planned for it from the very start.

The chapter opened with a bare date and a set of dimensions.

It closes with a fully finished, gold covered house built exactly the way it was designed.

📐 Fashion means the original design

✅ The finished house matched the plan exactly

🏁 The chapter closes where it opened, with completion

📖 A bare plan became a finished house`.trim();

export const FIRST_KINGS_SIX_PERSONAL_SECTIONS = parseFirstKingsSixRawNotes(FIRST_KINGS_SIX_RAW_NOTES);
