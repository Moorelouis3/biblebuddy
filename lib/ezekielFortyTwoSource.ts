export type EzekielFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyTwoRawNotes(rawText: string): EzekielFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 42:${startVerse}` : `Ezekiel 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 42 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_TWO_RAW_NOTES = `# Ezekiel 42:1-4
# 🧭 The North Chambers And Their Doors
---
## 🧭 Into The Utter Court, The Way Toward The North

Utter is an old word for outer, not furious or bitter.

This court sits outside the inner courts measured back in chapter forty.

The guide now leads Ezekiel toward the chambers on the north side.

Every direction in this vision carries meaning, not just travel.

🧭 Utter means outer, not furious
🏛️ This court sits outside the inner one
🚶 The guide now heads north
📖 Every direction in this vision matters

## 🏢 Over Against The Separate Place

This building sat across from the separate place introduced in chapter forty one.

That separate place stood behind the temple, further to the west.

These north chambers sat across the open yard instead, facing a different direction entirely.

Each structure in this complex had its own assigned position, nothing placed at random.

🏢 This recalls chapter forty one's separate place
🧭 These chambers face a different direction
📐 Each building had an assigned position
📖 Nothing in this complex sat randomly

## 📐 The Length Of An Hundred Cubits Was The North Door

A hundred cubits comes to about a hundred seventy feet long.

That matched the exact length of the east gate measured back in chapter forty.

This whole north door shared the same grand scale as the main gate into the complex.

Nothing about this side entrance felt smaller or less important.

📐 About a hundred seventy feet long
🔁 This matches the east gate's length
🚪 The north door matched that scale
📖 This entrance never felt smaller or unimportant

## 📏 Over Against The Twenty Cubits Which Were For The Inner Court

Twenty cubits comes to about thirty three feet.

This measurement ties these chambers to the inner court's open space.

The building also faced the stone pavement that lined the outer court.

Sitting between both courts, these chambers touched both the holy and the common spaces.

📏 Twenty cubits is about thirty three feet
🏛️ This ties the chambers to the inner court
🪨 The building also faced the outer pavement
📖 These chambers touched both holy and common ground

## 🏛️ Gallery Against Gallery In Three Stories

A gallery here means a walkway or balcony that runs along a building's side.

Chapter forty one described this same three story gallery design on the side chambers there.

Seeing it again on this separate north building shows one single architectural style across the whole complex.

Nothing in this vision was improvised room by room.

🏢 A gallery means a walkway or balcony
🔁 Chapter forty one used this same design
🏗️ One architectural style ran through the complex
📖 Nothing here was improvised room by room

## 🚶 A Walk Of Ten Cubits Breadth Inward

Ten cubits comes to about seventeen feet wide.

This walkway ran along the front of the chambers, facing inward toward the court.

A path this wide let priests and workers move freely without crowding each other.

Even the walking space in this vision was carefully planned, not left over.

🚶 Ten cubits is about seventeen feet
🧱 This walkway faced inward toward the court
🙌 Priests could move freely without crowding
📖 Even walking space here was carefully planned

## 📏 A Way Of One Cubit

One cubit alone comes to less than two feet.

This tiny gap likely separated the walkway from the chamber wall itself.

Even a single cubit got its own exact measurement in this vision.

No space here was left vague or approximate.

📏 One cubit is less than two feet
🧱 This gap sat between walkway and wall
🔍 Even a tiny space got measured
📖 Nothing here was left vague

## 🧭 Their Doors Toward The North

These chambers opened only toward the north, away from the inner holy spaces.

That kept ordinary foot traffic from ever crossing paths with the priests inside the temple.

A separate door meant a separate kind of access for a separate kind of room.

Direction itself protected what happened inside these walls.

🚪 Doors opened only toward the north
🚷 Ordinary traffic stayed away from holy spaces
🔑 Separate doors meant separate kinds of access
📖 Direction itself protected what happened inside

# Ezekiel 42:5-6
# 📉 Chambers That Narrowed Going Up
---
## 📉 The Upper Chambers Were Shorter

These upper rooms had less usable floor space than the rooms below them.

The galleries, open walkways running along each level, took up more room the higher the building went.

Less open gallery space below left more room for the lower chambers instead.

Every level balanced the same tradeoff between walkway and storage space.

📉 Upper rooms had less floor space
🏗️ Galleries took up more room above
🏠 Lower chambers kept more open space
📖 Every level balanced walkway against storage

## 🏛️ Not Pillars As The Pillars Of The Courts

The outer courts measured back in chapter forty stood on rows of visible pillars.

These chamber buildings used solid walls instead of pillars.

A pillar holds up weight but still leaves open space underneath it.

A solid wall holds up the same weight without any open space below.

🏛️ Courts in chapter forty used pillars
🧱 These chambers used solid walls instead
🕳️ Pillars leave open space underneath them
📖 Solid walls leave no open space below

## 📉 Straitened More Than The Lowest And The Middlemost

Straitened is an old word meaning narrowed or pressed in.

This top floor had less usable space than the two floors beneath it.

Walls built solid instead of propped on pillars took up more of the available room.

The building actually grew tighter the higher it rose, not wider.

📉 Straitened means narrowed or pressed in
🏢 The top floor had the least space
🧱 Solid walls took up more room
📖 This building grew tighter going up

# Ezekiel 42:7-11
# 🧱 The Outer Wall And The South Chambers
---
## 🧱 The Wall That Was Without

Without here means outside, not lacking something.

This separate wall ran along the outer edge of the chamber building, facing the utter court.

It stood apart from the chambers themselves, like a low screening wall in front of them.

Even this plain boundary wall got its own careful measurement.

🧱 Without means outside, not lacking
📐 This wall ran along the outer edge
🛡️ It stood apart from the chambers themselves
📖 Even this plain wall got measured

## 📏 The Length Thereof Was Fifty Cubits

Fifty cubits comes to about eighty three feet long.

That matched the length of the chambers it stood in front of.

The wall and the building behind it shared the exact same measurement.

Matching numbers again confirmed this was planned, not approximate.

📏 Fifty cubits is about eighty three feet
🔁 This matched the chambers behind it
📐 Wall and building shared one measurement
📖 Matching numbers confirmed careful planning

## 🏛️ Before The Temple Were An Hundred Cubits

A hundred cubits comes to about a hundred seventy feet.

That space ran in front of the temple itself, twice the length of the outer chambers.

The inner building sat on a taller platform, so its full length doubled the outer one.

This doubling pattern echoes the same doubled proportions seen back in chapter forty.

🏛️ About a hundred seventy feet long
✖️ This doubled the outer chamber's length
⬆️ The inner platform sat taller and longer
📖 Chapter forty showed this same doubling

## 🚪 The Entry On The East Side

This is the doorway used to actually walk into these chambers.

Visitors reached it only after first entering the utter court from outside.

The entrance faced east, the same direction as the complex's main gate in chapter forty.

A building's holiness never erased the need for an ordinary, working front door.

🚪 This entrance let people into the chambers
🧭 It faced east, like the main gate
🚶 Visitors reached it from the utter court
📖 Even holy buildings needed working doors

## 🧱 The Chambers Were In The Thickness Of The Wall

These chambers on the east side sat built directly into the wall's own thick body.

That is different from the chapter forty one chambers, which rested on ledges outside the main wall.

Here the chamber space came from the wall's own thickness, not an added structure.

The builders used every part of this complex with purpose.

🧱 These chambers sat inside the wall itself
🔀 Chapter forty one's chambers rested outside instead
🏗️ This space came from the wall's own thickness
📖 Every part of this complex had purpose

## 📐 According To Their Fashions, And According To Their Doors

Fashions here means designs or patterns, not clothing styles.

These south side chambers were built to match the north side chambers exactly.

Same length, same width, same doors, same everything.

One single design repeated itself on both sides of the complex.

📐 Fashions means designs, not clothing styles
🔁 South chambers matched the north chambers
📏 Same length, width, and doors throughout
📖 One design repeated on both sides

# Ezekiel 42:12-14
# 🙏 Holy Chambers For The Priests
---
## 🚪 A Door In The Head Of The Way

This describes a second entrance at the start of the walkway on the south side.

It mirrored the east facing entry already described for the north chambers.

Every side of this complex got its own clearly marked way in.

Nothing here depended on guesswork to find the right door.

🚪 This names a second south side entrance
🔁 It mirrored the east facing entry
🧭 Every side had its own clear way in
📖 Nothing here depended on guesswork

## 🙏 They Be Holy Chambers

God names these rooms holy chambers, not storage rooms or offices.

Holy here means set apart for God's own use, never ordinary.

Priests, not just anyone, could enter and work inside them.

Calling a room holy changed everything about how it could be used.

🙏 Holy chambers, not storage or offices
✨ Holy means set apart for God
👤 Only priests could enter and work here
📖 The name changed how it could be used

## 🍞 Shall Eat The Most Holy Things

Most holy things were specific portions of certain offerings set aside for priests alone.

This was not casual snacking, it was part of the priest's actual pay for serving God.

Eating these portions inside a holy room kept the offering's holiness intact.

God provided for the people who served Him, even through what they ate.

🍞 These were specific portions for priests
💰 This counted as the priest's pay
🏠 Eating them here kept holiness intact
📖 God provided for those who served Him

## 📦 The Meat Offering, And The Sin Offering, And The Trespass Offering

Meat offering here means a grain offering, not a meat sacrifice.

A sin offering atoned for unintentional wrongs against God's law.

A trespass offering repaid a specific wrong done against God or another person.

Naming all three together shows every kind of offering had its holy portion protected.

🌾 Meat offering means grain, not meat
🙇 Sin offering covered unintentional wrongs
🤝 Trespass offering repaid a specific wrong
📖 Every kind of offering had protected portions

## 🚷 They Shall Not Go Out Of The Holy Place Into The Utter Court

A priest could not walk straight from serving at the altar into the public court.

Ministry clothes carried holiness that could spread onto anything they touched outside.

Keeping priests inside a little longer protected ordinary people from that spreading holiness.

Holiness here worked almost like a boundary that needed careful crossing.

🚷 Priests could not walk straight outside
✨ Holy garments could spread holiness to others
🛡️ This protected ordinary people outside
📖 Holiness needed careful, deliberate crossing

## 👕 Shall Put On Other Garments

Priests changed out of their ministry clothes before rejoining the general public.

Those special garments were worn only for service at the altar.

Ordinary clothes let a priest move freely among the people again.

Changing clothes marked the exact moment ministry ended and everyday life began.

👕 Priests changed out of ministry clothes
🕯️ Special garments were only for altar service
🚶 Ordinary clothes let priests rejoin daily life
📖 Changing clothes marked that exact moment

# Ezekiel 42:15-20
# 🧱 The Final Measurement And The Boundary Wall
---
## 📏 Made An End Of Measuring The Inner House

This marks the finish line for measuring everything inside the temple complex.

Three full chapters of careful measuring, chapters forty through forty two, come to a close here.

Only the outer boundary of the whole complex remained to be measured.

Nothing about this vision rushed through any part of the work.

📏 This finishes the inner measurements
📚 Three chapters of measuring come to a close
🧭 Only the outer boundary remained
📖 Nothing in this vision was rushed

## 🧭 Brought Me Forth Toward The Gate Whose Prospect Is Toward The East

Prospect here is an old word for the direction something faces.

The guide now leads Ezekiel back out through the main east gate.

That same east gate opened chapter forty, so the vision ends where it began.

Starting and ending at the same gate frames the entire temple tour.

🧭 Prospect means the direction something faces
🚪 The same east gate from chapter forty
🔄 The vision ends where it began
📖 One gate frames the entire tour

## 📐 He Measured The East Side With The Measuring Reed, Five Hundred Reeds

A reed equals six cubits, about ten feet, as chapter forty one explained.

Five hundred reeds comes to about five thousand feet, nearly a mile.

That huge number measures the outer boundary of the entire temple complex, not a single building.

This final wall surrounds everything measured so far in one vast square.

📏 A reed is about ten feet
📐 Five hundred reeds is nearly a mile
🗺️ This measures the whole complex boundary
📖 One vast wall surrounds everything so far

## 🔁 He Measured The North Side, Five Hundred Reeds, With The Measuring Reed Round About

The north, south, and west sides each measured that exact same five hundred reeds.

Four sides matching perfectly means this complex formed a true square, not just a rough rectangle.

Chapter forty one already showed smaller matching numbers meant deliberate design, never an accident.

The same pattern now confirms itself on the largest possible scale in this whole vision.

🔁 North, south, and west matched exactly
🔲 Four equal sides make a true square
🧩 Matching numbers always meant deliberate design
📖 This pattern holds at the largest scale

## 🏯 He Measured It By The Four Sides

This verse confirms what the last three verses already showed one side at a time.

All four sides together prove the whole complex formed a perfect square.

A square shape pictured total balance, with no side longer than another.

Symmetry ran through this entire vision, from the smallest door to the largest wall.

🏯 This confirms the complex is a square
🔲 All four sides matched perfectly
⚖️ A square pictures total balance
📖 Symmetry ran through the whole vision

## 🧱 It Had A Wall Round About, Five Hundred Reeds Long, And Five Hundred Broad

This single outer wall enclosed the entire temple complex on every side.

Five hundred reeds long and five hundred reeds broad confirms the perfect square one final time.

Some ancient manuscripts actually read cubits instead of reeds in these verses.

Many scholars believe reeds fit the vision's grand, almost otherworldly scale better than cubits would.

🧱 One wall enclosed the whole complex
🔲 Five hundred by five hundred confirms the square
📜 Some manuscripts read cubits instead of reeds
📖 Either way, the scale was meant to awe

## 🕊️ To Make A Separation Between The Sanctuary And The Profane Place

Profane here does not mean cursing, it means ordinary or common.

This wall's whole purpose was to mark a clear line between holy and common ground.

Nobody could wander into God's sacred space by accident ever again.

The entire vision, chapters forty through forty two, ends by drawing that one final line.

🕊️ Profane means ordinary, not cursing
🚧 This wall marked holy from common ground
🚷 Nobody could wander in by accident
📖 The whole vision ends on that one line
`.trim();

export const EZEKIEL_FORTY_TWO_PERSONAL_SECTIONS = parseEzekielFortyTwoRawNotes(EZEKIEL_FORTY_TWO_RAW_NOTES);
