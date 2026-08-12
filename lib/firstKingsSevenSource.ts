export type FirstKingsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsSevenRawNotes(rawText: string): FirstKingsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsSeven\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsSeven\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsSeven\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 7:${startVerse}` : `1 Kings 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Kings 7 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_SEVEN_RAW_NOTES = `# FirstKingsSeven 7:1-6
# 🏰 Solomon Builds His Own House
---
## 🏛️ Solomon Was Building His Own House Thirteen Years

Chapter six ended with the temple finished in seven years.

This verse turns to a completely different building, Solomon's own royal palace.

His personal house took almost twice as long as God's house.

The order still matters, the temple was built and finished first.

🏛️ This is Solomon's own palace

⏳ It took thirteen years to build

📏 Nearly double the temple's seven years

📖 The temple was still built first

## 🌲 The House Of The Forest Of Lebanon

This new building was not actually located in Lebanon.

It earned that nickname because of its huge cedar pillars.

Rows of tall cedar columns made the hall look like a cedar forest.

Cedar itself was imported from Lebanon, the timber's original source.

🌲 Named for its forest of pillars

🏛️ Located in Jerusalem, not Lebanon

🪵 Cedar came from Lebanon originally

📖 The nickname described its look

## 📏 The Length Thereof Was An Hundred Cubits, And The Breadth Thereof Fifty Cubits, And The Height Thereof Thirty Cubits

A cubit measured close to eighteen inches, about a forearm's length.

That makes this hall close to one hundred fifty feet long.

It ran about seventy five feet wide and forty five feet tall.

This single hall alone was larger than the entire temple building.

📏 A cubit was about eighteen inches

📐 The hall ran about one fifty feet

🏛️ It was larger than the temple

📖 This was Solomon's grandest secular building

## 🏗️ Upon Four Rows Of Cedar Pillars, With Cedar Beams Upon The Pillars

Four long rows of cedar columns ran the length of the hall.

Heavy cedar beams stretched across the tops of the pillars.

Those beams supported the roof structure high above the floor.

The design likely resembled a huge covered colonnade.

It was probably not a solid walled room.

🏛️ Four rows of pillars ran the hall

🪵 Cedar beams connected the pillars

🏗️ Beams carried the roof's weight

📖 It resembled a huge covered colonnade

## 🔢 That Lay On Forty Five Pillars, Fifteen In A Row

Three of the four pillar rows carried the roof beams directly.

Fifteen pillars stood in each of those three rows.

Three rows of fifteen pillars adds up to forty five total.

That many columns gave the building a genuinely massive footprint.

🔢 Fifteen pillars stood in each row

➕ Three rows totaled forty five pillars

🏛️ The footprint was truly massive

📖 This matched the scale of a palace

## 🪟 Windows In Three Rows, And Light Was Against Light In Three Ranks

"Light" was an old word for a window opening.

The building had three separate tiers of windows stacked one above another.

Windows on opposite walls lined up directly across from each other.

That arrangement let daylight flow straight through the entire hall.

🪟 Light is an old word for windows

🏢 Windows were stacked in three tiers

↔️ Windows on each side lined up

📖 Daylight passed straight through the hall

## 🚪 He Made A Porch Of Pillars

This porch was a separate, smaller structure attached to the great hall.

It measured fifty cubits long and thirty cubits wide, close to seventy five feet by forty five feet.

A thick beam and additional pillars stood in front, forming its own entrance.

Even a side entrance in this palace complex was an impressive structure on its own.

🚪 A separate porch was added

📏 It measured about seventy five feet long

🏗️ A thick beam formed its front

📖 Even the entrance was impressive

# FirstKingsSeven 7:7-12
# ⚖️ The Porch Of Judgment And The Great Court
---
## ⚖️ Then He Made A Porch For The Throne Where He Might Judge, Even The Porch Of Judgment

This was yet another separate structure, dedicated purely to Solomon's royal court cases.

Israel's king served as the nation's highest judge for the hardest disputes.

The porch of judgment was where Solomon heard cases and sat on his throne.

First Kings three already showed Solomon judging two women over a disputed infant.

⚖️ This porch was built for judging

👑 The king served as Israel's judge

🪑 Solomon's throne stood in this room

📖 Chapter three showed him judging a case

## 🪵 It Was Covered With Cedar From One Side Of The Floor To The Other

Cedar paneling lined the porch of judgment from wall to wall.

This matched the same costly cedar covering used throughout the palace complex.

A courtroom this important was never going to be left in plain, bare stone.

Even a working government building reflected the same wealth as the rest of Solomon's kingdom.

🪵 Cedar covered it from floor to floor

🏛️ It matched the rest of the complex

💰 No expense was spared here either

📖 Government buildings reflected royal wealth too

## 🏠 His House Where He Dwelt Had Another Court Within The Porch, Which Was Of The Like Work

This introduces yet a third distinct building, Solomon's private residence.

It was separate from both the house of the forest of Lebanon and the porch of judgment.

This private house had its own enclosed courtyard, built with the same fine craftsmanship.

Solomon's palace complex was really a cluster of several connected buildings, not one house.

🏠 This names Solomon's private residence

🏛️ It stood apart from the other buildings

🌳 It had its own enclosed courtyard

📖 The palace was several buildings together

## 👑 Solomon Made Also An House For Pharaoh's Daughter, Whom He Had Taken To Wife

First Kings three already mentioned Solomon's marriage to an Egyptian princess.

This verse reveals she received her own dedicated house within the palace complex.

Marrying a pharaoh's daughter was a major diplomatic alliance, not simply a personal choice.

This same marriage becomes a warning sign much later in First Kings eleven.

👑 Pharaoh's daughter was Solomon's wife

🏠 She received her own dedicated house

🤝 The marriage sealed a political alliance

📖 It becomes a warning later in the book

## 🪨 All These Were Of Costly Stones, According To The Measures Of Hewed Stones, Sawed With Saws

"Hewed" stones were cut and shaped, not left rough from the quarry.

Workers used saws to cut these stones to precise, matching sizes.

This matches the same quiet construction method described back in chapter six.

Every wall in this whole complex, palace and temple alike, used this costly stonework.

🪨 Hewed means cut and shaped stone

🪚 Saws cut stones to precise sizes

🔁 This matches chapter six's method

📖 Palace and temple shared the same craft

## 📏 The Foundation Was Of Costly Stones, Even Great Stones, Stones Of Ten Cubits, And Stones Of Eight Cubits

These foundation stones measured up to fifteen feet and twelve feet long.

Stones this enormous required serious engineering just to move and set in place.

A foundation this massive was built to support buildings meant to last for centuries.

The size of the stones people never saw still mattered to the builders.

📏 Foundation stones reached up to fifteen feet

🏗️ Moving stones this size took real skill

🏛️ The foundation was built to last centuries

📖 Even hidden stones were built with care

## 🧱 The Great Court Round About Was With Three Rows Of Hewed Stones, And A Row Of Cedar Beams

A great court surrounded the entire building complex like an outer boundary wall.

Its wall alternated material, three layers of cut stone topped by one layer of cedar.

This exact pattern already appeared for the temple's inner court back in chapter six.

The palace grounds and the temple grounds were built to match one another.

🧱 A great court surrounded the whole complex

🔁 Its wall matched the temple's inner court

🪨 Three stone layers topped by cedar

📖 Palace and temple grounds matched each other

# FirstKingsSeven 7:13-14
# 🔨 Hiram The Craftsman Out Of Tyre
---
## 🙋 And King Solomon Sent And Fetched Hiram Out Of Tyre

This Hiram is a completely different person from Hiram, king of Tyre, in chapter five.

Sharing the same name caused real confusion for readers across many generations.

This second Hiram was a skilled craftsman, not a ruler or head of state.

Watch for this same name carrying two very different identities through the rest of the chapter.

🙋 This Hiram is not the earlier king

👑 The other Hiram ruled Tyre as king

🔨 This Hiram was a hired craftsman

📖 Two different men share one name

## 👩 He Was A Widow's Son Of The Tribe Of Naphtali, And His Father Was A Man Of Tyre, A Worker In Brass

Hiram had one Israelite parent and one parent from Tyre, a mixed heritage.

His mother came from the tribe of Naphtali, one of Israel's twelve tribes.

His father, now dead, had worked in the same brass trade from the city of Tyre.

That mixed background gave Hiram deep skill in a craft Israel had little experience with.

👩 His mother was from Naphtali

🌊 His father came from Tyre

🔨 His father worked in brass too

📖 His mixed heritage brought rare skill

## 🎯 And He Was Filled With Wisdom, And Understanding, And Cunning To Work All Works In Brass

"Cunning" in this old sense simply means highly skilled, not sneaky or dishonest.

These same three words, wisdom, understanding, and cunning, describe Solomon's own gift back in chapter three.

Craftsmanship this advanced is described the same way as royal, God given wisdom.

Skilled work with metal was treated as a genuine gift, not just a trade.

🎯 Cunning meant highly skilled, not sneaky

🧠 The same words describe Solomon's wisdom

🔨 Skilled craft was treated as a gift

📖 Metalwork this advanced was no mere trade

## 🚶 And He Came To King Solomon, And Wrought All His Work

Hiram traveled from Tyre specifically to work under Solomon's direction.

Every piece of brasswork described for the rest of this chapter came from his hands.

One craftsman is personally responsible for the temple's massive metal furnishings.

The next several sections describe exactly what "all his work" actually included.

🚶 Hiram traveled to Israel to work

🔨 He personally made all the brasswork

👤 One craftsman built the temple's metalwork

📖 The next sections describe that work

# FirstKingsSeven 7:15-22
# 🏛️ The Two Pillars, Jachin And Boaz
---
## 📏 For He Cast Two Pillars Of Brass, Of Eighteen Cubits High Apiece

Eighteen cubits works out to about twenty seven feet tall.

That is close to the height of a two and a half story building.

Hiram cast these pillars from molten brass.

He did not carve them from stone.

Two colossal freestanding columns were about to stand at the temple's front entrance.

📏 Eighteen cubits was about twenty seven feet

🏢 That equaled two and a half stories

🔥 The pillars were cast from molten brass

📖 They stood at the temple's entrance

## ⭕ And A Line Of Twelve Cubits Did Compass Either Of Them About

A "line" here means a measuring cord, used to measure around something round.

Twelve cubits works out to close to eighteen feet around the pillar's circumference.

Dividing that circumference gives each pillar a width close to six feet wide.

These were not slender decorative columns, they were massive, thick freestanding towers.

📏 A line meant a measuring cord

⭕ Twelve cubits was about eighteen feet around

📐 Each pillar measured about six feet wide

📖 These were massive, not slender columns

## 🎩 And He Made Two Chapiters Of Molten Brass, To Set Upon The Tops Of The Pillars

A "chapiter" is an old word for a decorative capital, the crown piece atop a column.

Each capital measured five cubits high, close to seven and a half feet.

Together the two capitals added significant extra height above the pillars themselves.

The tops of these pillars were treated as their own separate work of art.

🎩 Chapiter is an old word for capital

📏 Each capital stood about seven feet tall

🏛️ Capitals added height above the pillars

📖 The pillar tops were their own artwork

## 🕸️ And Nets Of Checker Work, And Wreaths Of Chain Work, For The Chapiters

"Checker work" describes a woven, latticed brass pattern, like a decorative net.

"Wreaths of chain work" describes twisted chains looped and layered like braided rope.

Seven of these chain wreaths decorated each capital, fourteen in total across both pillars.

Picture ornate metal lacework wrapped around the top of each towering pillar.

🕸️ Checker work meant a woven brass lattice

⛓️ Chain work meant twisted, layered chains

🔗 Seven wreaths decorated each capital

📖 Picture ornate metal lacework at the top

## 🍎 To Cover The Chapiters That Were Upon The Top, With Pomegranates

Pomegranates were a common fruit throughout ancient Israel, full of seeds inside a tough skin.

Craftsmen cast rows of bronze pomegranates and hung them around each capital's network.

Two hundred pomegranates decorated each capital, four hundred across both pillars in total.

This same pomegranate pattern also decorated the high priest's robe hem back in Exodus.

🍎 Pomegranates were a familiar seeded fruit

🎨 Bronze pomegranates ringed each capital

🟠 Two hundred decorated each capital

📖 The same pattern decorated the priest's robe

## 🌸 The Chapiters That Were Upon The Top Of The Pillars Were Of Lily Work In The Porch, Four Cubits

Lily flowers appear repeatedly throughout the temple's decoration, as they did in chapter six.

This lily shaped section of each capital measured four cubits, close to six feet.

The pillars combined multiple decorative layers, chain work, pomegranates, and lily carving, in one design.

Nature imagery, fruit, flowers, and later cherubim, filled almost every surface of Solomon's temple.

🌸 Lily work matched other temple decoration

📏 This section measured about six feet

🎨 Several decorative layers combined on one pillar

📖 Nature imagery filled the whole temple

## 📛 He Set Up The Right Pillar, And Called The Name Thereof Jachin

Jachin means "he will establish" or "he establishes" in Hebrew.

This pillar stood on the right side as a worshipper faced the temple entrance.

Giving a pillar an actual name shows these were far more than decoration.

The name itself declared a promise about God's faithfulness to His house.

📛 Jachin means he will establish

➡️ It stood on the right side

🏛️ Naming it showed real meaning

📖 The name declared God's own faithfulness

## 📛 He Set Up The Left Pillar, And Called The Name Thereof Boaz

Boaz means "in him is strength" or simply "strength."

This pillar stood on the left side, paired with Jachin on the right.

Read together, the two names form something close to one sentence, he establishes in strength.

Worshippers walked between these two named promises every time they entered the temple.

📛 Boaz means in him is strength

⬅️ It stood on the left side

🤝 Together the names form one message

📖 Worshippers passed between these promises

## ✅ So Was The Work Of The Pillars Finished

This line brings the description of both towering pillars to a close.

Cast brass, decorative capitals, chain work, pomegranates, and lily carving all came together here.

Two named, freestanding pillars now stood in front of the temple entrance, Jachin and Boaz.

Anyone approaching the temple saw these two pillars before they saw anything else inside.

✅ This closes the pillar description

🏛️ Every decorative layer is now complete

👀 The pillars stood before the entrance

📖 They were the first thing visitors saw

# FirstKingsSeven 7:23-26
# 🌊 The Molten Sea
---
## 🌊 And He Made A Molten Sea, Ten Cubits From The One Brim To The Other

The "molten sea" was a massive round brass basin.

Workers cast it from molten metal instead of hammering it into shape.

Ten cubits across works out to a width close to fifteen feet.

Calling something this large a "sea" gives a sense of just how enormous it was.

This single basin became one of the temple's most famous and recognizable objects.

🌊 The sea was a massive cast basin

📏 It measured about fifteen feet across

🌐 The name reflected its huge size

📖 It became the temple's most famous basin

## 📏 It Was Round All About, And His Height Was Five Cubits

The basin stood five cubits tall, close to seven and a half feet.

That made it taller than most grown men standing beside it.

A rim line of thirty cubits, close to forty five feet, wrapped completely around it.

Priests would have needed steps or a raised platform just to reach the water inside.

📏 The sea stood about seven feet tall

🧍 It stood taller than a grown man

⭕ Its rim measured about forty five feet

📖 Priests likely needed steps to reach it

## 🌱 Under The Brim Of It Round About There Were Knops Compassing It

"Knops" were decorative rounded bud shapes, the same carved detail used inside the temple in chapter six.

These knops ringed the entire basin just underneath its rim, ten to every cubit.

That works out to close to three hundred small decorative bumps wrapped fully around the sea.

Even a purely functional water basin received the same careful, decorative attention as the sanctuary itself.

🌱 Knops were carved, rounded bud shapes

🔁 They matched carving from chapter six

🔢 Close to three hundred knops ringed the basin

📖 Even a basin got careful decoration

## 🐂 It Stood Upon Twelve Oxen, Three Looking Toward The North, And Three Toward The West, And Three Toward The South, And Three Toward The East

This does not mean twelve living animals literally held up the basin.

Twelve life sized bronze ox statues formed the base the sea rested on.

Three oxen faced each of the four compass directions, twelve total surrounding the basin.

Twelve is also the number of Israel's tribes, a detail hard to miss in this design.

🐂 Twelve bronze ox statues formed the base

🧭 Three oxen faced each compass direction

🔢 Twelve total oxen surrounded the sea

📖 Twelve also echoed Israel's tribes

## 🪣 And It Contained Two Thousand Baths

A "bath" was an ancient liquid measurement, close to six modern gallons.

Two thousand baths adds up to close to twelve thousand gallons of water.

That is enough water to fill several modern residential swimming pools.

Priests used this water for washing before they served at the temple.

🪣 A bath equaled about six gallons

🔢 Two thousand baths meant twelve thousand gallons

💧 That could fill several swimming pools

📖 Priests used this water for washing

# FirstKingsSeven 7:27-31
# 🛠️ The Ten Bases Of Brass, Part One
---
## 🛠️ And He Made Ten Bases Of Brass

A "base" here was a heavy, wheeled brass stand, not a simple platform.

Ten identical bases were cast, each one built to carry its own basin later in the chapter.

Each base measured four cubits long, four cubits wide, and three cubits tall.

That works out to close to six feet square and four and a half feet high.

🛠️ A base was a wheeled brass stand

🔟 Ten identical bases were built

📐 Each measured about six feet square

📖 Each base would carry its own basin

## 📦 They Had Borders, And The Borders Were Between The Ledges

Each base was built like an open box frame.

It was not one heavy, solid block.

"Ledges" were horizontal cross panels.

"Borders" were the decorative frames running between them.

This paneled, frame based construction let the base stay strong.

It also kept the whole base lighter overall.

Ancient metalworkers clearly understood how to balance strength against the weight of solid brass.

📦 Each base was an open frame

🖼️ Borders were frames between panels

⚖️ This design balanced strength and weight

📖 Metalworkers understood real engineering tradeoffs

## 🦁 And On The Borders That Were Between The Ledges Were Lions, Oxen, And Cherubims

Craftsmen carved these three specific images into every base's decorative borders.

Lions represented strength and royal power throughout the ancient Near East.

Oxen represented steady service and labor, and cherubims represented God's own guarding presence.

The same combination of images tied these practical wash stands back to the temple's larger themes.

🦁 Lions represented strength and royal power

🐂 Oxen represented steady labor and service

👼 Cherubims represented God's guarding presence

📖 Even wash stands carried temple themes

## 🛞 And Every Base Had Four Brasen Wheels, And Plates Of Brass

Real functioning wheels were attached to the four corners of every base.

These were not decorative wheel shapes, they let the massive bases actually be moved.

Second Chronicles confirms these bases could be rolled to wherever water was needed in the courtyard.

A basin this heavy needed real wheels to be useful at all.

🛞 Four real wheels sat on each base

🚫 These were functional, not decorative

🚚 The bases could be rolled around

📖 Wheels made a heavy basin useful

## 🔩 The Four Corners Thereof Had Undersetters

"Undersetters" were small brass support brackets, reinforcing the base's structure underneath its corners.

They held the weight steady at each corner, keeping the frame from twisting or bending.

The full weight of the base, plus a basin full of water, rested on these small brackets.

This level of structural detail shows the builders solved real engineering problems, not just artistic ones.

🔩 Undersetters were small support brackets

📐 They held the corners steady

⚖️ They carried the weight of water

📖 Builders solved real engineering problems too

# FirstKingsSeven 7:32-37
# ⚙️ The Ten Bases Of Brass, Part Two
---
## 🔧 Under The Borders Were Four Wheels

An "axletree" is an old word for an axle, the rod a wheel spins around.

Each base's four wheels connected through axles fixed directly into the frame.

The wheel itself measured a cubit and a half tall, close to two and a quarter feet.

This description reads almost like an engineering blueprint.

It is far more technical than a simple artistic note.

🔧 Axletree is an old word for axle

🛞 Axles connected each wheel to the frame

📏 Each wheel stood about two feet tall

📖 This reads like an engineering blueprint

## 🏎️ And The Work Of The Wheels Was Like The Work Of A Chariot Wheel

Chariot wheels were a familiar sight throughout the ancient world, built for speed and heavy loads.

"Naves" were the wheel's center hub, and "felloes" were the curved outer rim pieces.

"Spokes" connected the center hub out to that outer rim, just like a modern wagon wheel.

Solomon's craftsmen borrowed proven military engineering and applied it to temple furniture.

🏎️ Chariot wheels were familiar, sturdy designs

🎯 Naves were the wheel's center hub

🔘 Felloes were the curved outer rim

📖 Temple furniture borrowed military engineering

## 🔁 There Were Four Undersetters To The Four Corners Of One Base

This repeats and confirms the same support bracket detail already given for every base.

"Of the very base itself" clarifies these brackets were cast as one solid piece with the frame.

Nothing was bolted on separately or added afterward as a weaker patch.

The whole base, brackets included, came out of a single continuous casting process.

🔁 This confirms the earlier support brackets

🔗 Brackets were cast as one piece

🚫 Nothing was bolted on separately

📖 The whole base was one solid casting

## ⭕ In The Top Of The Base Was There A Round Compass Of Half A Cubit High

A circular rim, about nine inches tall, ran around the very top of each base.

This rim was the exact spot where the laver, or washing basin, would sit.

Its ledges and borders repeated the same decorative pattern already carved into the base below.

Every part of the base, top to bottom, matched the rest in both design and craftsmanship.

⭕ A rim about nine inches tall topped it

🪣 This rim held the washing basin

🎨 The same pattern repeated at the top

📖 Every part of the base matched

## 🔟 All Of Them Had One Casting, One Measure, And One Size

This verse confirms all ten bases were built as exact, identical copies of one another.

"One casting" means they came from the same mold, not ten separately designed pieces.

Identical furniture across the temple courtyard reflected the same balance seen everywhere in this chapter.

Precision and consistency mattered as much to these builders as size and cost did.

🔟 All ten bases were exact copies

🎯 One casting meant the same mold

⚖️ Consistency mattered as much as size

📖 Precision was valued as much as cost

# FirstKingsSeven 7:38-40
# 🪣 The Lavers And Hiram's Finished Work
---
## 🪣 Then Made He Ten Lavers Of Brass

A "laver" was a large brass basin used for washing, smaller than the great molten sea.

Forty baths works out to close to two hundred forty gallons of water in a single laver.

Ten of these lavers sat, one each, on the ten wheeled bases just described.

Together they gave priests many separate washing stations instead of relying on one central basin.

🪣 A laver was a washing basin

🔢 Each held about two hundred forty gallons

🔟 Ten lavers sat on the ten bases

📖 Priests got many separate washing stations

## ↔️ And He Put Five Bases On The Right Side Of The House, And Five On The Left Side

The ten wheeled bases and their lavers split evenly across the temple's courtyard.

Five stood on the right side, and five stood on the left side of the building.

The great molten sea itself sat apart from these, on the right side toward the south.

Even the courtyard's furniture layout followed a deliberate, balanced arrangement.

↔️ Five bases stood on each side

🌊 The great sea sat apart, on the right

🧭 It faced toward the south

📖 The layout followed a balanced plan

## 🧹 And Hiram Made The Lavers, And The Shovels, And The Basons

"Shovels" here were small brass tools used for clearing ashes off the altar.

"Basons" were smaller bowls used to catch and carry sacrificial blood.

These smaller working tools mattered just as much as the massive pillars and the great sea.

A functioning temple needed everyday practical equipment alongside its grandest showpieces.

🧹 Shovels cleared ashes from the altar

🩸 Basons carried sacrificial blood

🔧 Small tools mattered as much as showpieces

📖 A working temple needed practical equipment

## ✅ So Hiram Made An End Of Doing All The Work That He Made King Solomon For The House Of The LORD

This line marks the moment Hiram's entire brass building project finally wraps up.

Pillars, capitals, the great sea, ten bases, ten lavers, shovels, and basons all came from his hands.

One skilled craftsman from Tyre built nearly every piece of metal furniture in Solomon's temple.

The next verses step back and list everything he made, one final time, in summary.

✅ Hiram's brass work is now complete

🔨 He personally made every piece listed

👤 One craftsman built the temple's metalwork

📖 The next verses summarize it all

# FirstKingsSeven 7:41-45
# 📋 A Summary Of Everything Hiram Made
---
## 📋 The Two Pillars, And The Two Bowls Of The Chapiters

This begins a full recap list of every brass object Hiram built for the temple.

Nothing new is introduced here, every item already appeared earlier in this chapter.

Ancient record keeping often repeated an inventory list like this at the close of a project.

A formal summary confirmed the full order had actually been delivered in full.

📋 This begins a full recap list

🔁 Every item already appeared earlier

📜 Ancient records often closed with a list

📖 A summary confirmed the order was complete

## 🍎 And Four Hundred Pomegranates For The Two Networks

Two hundred pomegranates decorated each of the two pillar capitals, exactly as earlier verses in this chapter described.

Multiplied across both pillars, that comes to exactly four hundred pomegranates total.

Seeing the exact total written out here shows just how much decorative brasswork this really was.

Small details, repeated hundreds of times, added up to an enormous overall project.

🍎 Two hundred pomegranates decorated each capital

➕ Four hundred total across both pillars

🔢 The total shows the project's scale

📖 Small details added up to a huge project

## 🔟 And The Ten Bases, And Ten Lavers On The Bases

This recap confirms the ten wheeled bases and their ten matching lavers one more time.

Together with the pillars and the sea, these items formed the temple's main furnishings.

Everything named so far served practical, priestly functions, washing, carrying, and cleansing.

The list is building toward the smaller, more precious items still to come.

🔟 Ten bases and ten lavers are confirmed

🧼 These served practical priestly functions

📋 The list is building toward smaller items

📖 Function came before decoration in this list

## ✨ All These Vessels, Which Hiram Made To King Solomon For The House Of The LORD, Were Of Bright Brass

"Bright brass" describes brass that was polished until it shone like gold from a distance.

Every single item on this entire list, pillars, sea, bases, lavers, tools, shared this same finish.

Brass was far less costly than gold, but it was still treated with real care and craftsmanship.

This closes the section on Hiram's brasswork before the chapter turns to Solomon's gold vessels.

✨ Bright brass was polished to shine

🔁 Every listed item shared this finish

💰 Brass cost far less than gold

📖 The chapter now turns to gold vessels

# FirstKingsSeven 7:46-48
# 🏺 Where It Was Cast, And Solomon's Gold Vessels
---
## 🏞️ In The Plain Of Jordan Did The King Cast Them, In The Clay Ground Between Succoth And Zarthan

All this brasswork was not cast at the temple site itself in Jerusalem.

Solomon had it cast in a river valley far to the east, near the Jordan River.

That region's clay rich soil worked perfectly for shaping large molds for molten metal.

Succoth and Zarthan were both towns located in that same fertile stretch of the Jordan valley.

🏞️ Casting happened in the Jordan valley

🏺 Clay rich soil suited large molds

📍 Succoth and Zarthan marked the location

📖 The work happened far from Jerusalem

## ⚖️ And Solomon Left All The Vessels Unweighed, Because They Were Exceeding Many

Normally a king's treasury carefully weighed and recorded every valuable object made.

This project involved so much brass that the usual careful weighing was simply skipped.

"Neither was the weight of the brass found out" means no final total was ever calculated.

The sheer volume of metal used for this project defied normal royal accounting.

⚖️ Vessels were normally carefully weighed

🚫 This time the weighing was skipped

📊 No final total was ever calculated

📖 The volume of metal defied accounting

## 🔄 The Altar Of Gold, And The Table Of Gold

The chapter now shifts from Hiram's brass items to Solomon's own gold furnishings.

"The altar of gold" refers to the incense altar, standing just outside the oracle.

"The table of gold" held the shewbread, twelve loaves representing Israel's twelve tribes.

Chapter six already described these same two objects being built, and this verse confirms they were finished.

🔄 The chapter shifts from brass to gold

🕯️ The gold altar burned incense

🍞 The gold table held the shewbread

📖 Chapter six already introduced both objects

# FirstKingsSeven 7:49-51
# 🥇 The Golden Furnishings And The Chapter's Close
---
## 🕎 The Candlesticks Of Pure Gold, Five On The Right Side, And Five On The Left, Before The Oracle

The tabernacle in Moses' day had only one seven branched golden candlestick.

Solomon's temple upgraded this to ten separate candlesticks, five on each side of the room.

They stood just in front of the oracle, lighting the space leading to the ark's room.

"With the flowers, and the lamps, and the tongs of gold" describes their matching decorative fittings.

🕎 The tabernacle had only one candlestick

🔟 Solomon's temple had ten candlesticks total

↔️ Five stood on each side

📖 They lit the space before the oracle

## ✂️ The Bowls, And The Snuffers, And The Basons, And The Spoons, And The Censers Of Pure Gold

"Snuffers" were small tools used to trim the wick and put out a lamp's flame.

"Censers" were small vessels used to carry burning incense during priestly service.

Even the smallest working tools in daily temple use were made from pure gold.

Nothing that touched God's presence, however small or ordinary its job, was made from a lesser metal.

✂️ Snuffers trimmed lamp wicks

🔥 Censers carried burning incense

🥇 Even small tools were made of gold

📖 Nothing near God used a lesser metal

## 🚪 And The Hinges Of Gold, Both For The Doors Of The Inner House, The Most Holy Place, And For The Doors Of The House, To Wit, Of The Temple

Even the door hinges throughout the building were crafted from solid gold.

This includes both the oracle's inner doors and the outer doors of the main hall.

A visitor's hand would touch gold the instant they opened either set of doors.

This small, almost invisible detail shows just how completely gold covered this entire building.

🚪 Even door hinges were made of gold

📦 Inner and outer doors both had gold

✋ A visitor's hand touched gold at the door

📖 Gold covered even the smallest details

## ✅ So Was Ended All The Work That King Solomon Made For The House Of The LORD

This line closes out the entire construction project described across chapters six and seven.

Every pillar, basin, tool, and gold fitting mentioned since chapter six is now finished.

Two full chapters describe a building project that actually took seven years to complete.

The temple stood ready, but nothing had been placed inside it yet.

✅ The full building project is now finished

📜 Chapters six and seven cover it all

⏳ The real project took seven years

📖 The temple stood ready but empty

## 👑 Solomon Brought In The Things Which David His Father Had Dedicated

David never built the temple himself, but he spent years collecting materials for it.

First Chronicles records David setting aside large amounts of silver, gold, and valuable items for this purpose.

Solomon now formally moved his father's saved treasures into the finished building's storerooms.

This closes the chapter by tying the son's completed temple back to the father's original vision.

👑 David collected treasures for the temple

📜 First Chronicles records his preparations

🏛️ Solomon moved those treasures in

📖 The finished temple fulfilled David's vision`.trim();

export const FIRST_KINGS_SEVEN_PERSONAL_SECTIONS = parseFirstKingsSevenRawNotes(FIRST_KINGS_SEVEN_RAW_NOTES);
