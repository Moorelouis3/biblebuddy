export type EzekielFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyOneRawNotes(rawText: string): EzekielFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 41:${startVerse}` : `Ezekiel 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 41 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_ONE_RAW_NOTES = `# Ezekiel 41:1-4
# 📏 The Holy Place And The Holiest Of All
---
## 📏 Six Cubits Broad On The One Side

A "post" here means a doorframe pillar, not a mailbox post.

Six of Ezekiel's long cubits comes to about ten feet.

Both doorposts leading into this room measured that same thick width.

A doorway framed by ten foot pillars already announced this room's importance.

Nothing about entering this space would feel ordinary.

📏 A post means a doorframe pillar
📐 Six cubits is about ten feet
🚪 Both sides of the door matched
📖 Nothing about this entrance felt ordinary

## 🏕️ The Breadth Of The Tabernacle

This chapter calls the temple building itself the tabernacle.

That word originally named the portable tent Israel carried through the wilderness.

Reusing it here ties this future stone temple back to that first traveling tent.

The dwelling place changed shape, but the word for it never changed.

God's address moved from a tent to a permanent house.

🏕️ Tabernacle first named the wilderness tent
🧵 This stone temple reuses that same word
🔗 One word links old tent to new house
📖 God's dwelling grew from tent to house

## 📐 The Breadth Of The Door Was Ten Cubits

Ten of Ezekiel's long cubits comes to about seventeen feet wide.

That matched the width of the main east gate back in chapter forty.

The doorway leading into the Holy Place was no narrow slit.

A crowd of priests could pass through it without crowding each other.

This was a working entrance, built for daily use.

📐 Ten cubits is about seventeen feet
🔁 That matches the east gate's width
🚶 Priests could pass through without crowding
📖 This was a working entrance built for priests

## 🏛️ The Length Thereof, Forty Cubits, And The Breadth, Twenty Cubits

Forty cubits comes to about sixty seven feet long.

Twenty cubits comes to about thirty three feet wide.

This was the Holy Place, the outer room where priests served daily.

It was about the footprint of a small modern chapel.

Only priests on duty ever walked this room, never ordinary worshippers.

🏛️ Forty cubits is about sixty seven feet
📏 Twenty cubits is about thirty three feet
🙏 This room was the Holy Place
📖 Only priests on duty entered here

## 🚶 Then Went He Inward

The guide did not stop at the Holy Place.

He kept walking the prophet further into the building.

Every step moved Ezekiel closer to the most sacred room in the whole complex.

Nothing paused between one room and the next.

Approaching God here always meant moving forward, not standing still.

🚶 The guide kept moving further inward
🎯 Ezekiel was headed to the most sacred space
🔒 Only the holiest areas lay ahead
📖 Approaching God here meant moving forward

## 📏 The Breadth Of The Door, Seven Cubits

Seven cubits comes to about eleven and a half feet wide.

That is narrower than the ten cubit door leading into the Holy Place.

Every doorway deeper into this complex grows a little tighter than the one before it.

Chapter forty already showed the same pattern at the outer gates.

Nearness to God here was never casual or automatic.

📏 Seven cubits is about eleven feet
📉 This door is narrower than the last
🔁 Chapter forty showed this same shrinking pattern
📖 Nearness to God was never automatic

## 🕍 This Is The Most Holy Place

The guide finally says in plain words what this room is.

Most of this vision so far has been measured in silence, with no explanation given.

This room is the Most Holy Place, the innermost chamber of the whole temple.

In Solomon's temple this exact room once held the Ark of the Covenant.

Only the high priest could ever enter it, and only once a year.

🕍 The guide names the room out loud
🤫 Most of this vision is measured in silence
📦 Solomon's Ark once sat in this room
📖 Only the high priest entered once a year

# Ezekiel 41:5-11
# 🧱 The Wall And The Side Chambers
---
## 🧱 The Wall Of The House, Six Cubits

This is the main wall of the temple building itself, not an outer courtyard wall.

Six cubits comes to about ten feet thick.

A wall this thick could carry enormous weight above it.

That kind of mass also protected the holiest room from anything outside.

Nothing about this building was made thin or fragile.

🧱 This wall belongs to the temple itself
📐 Six cubits is about ten feet thick
🏗️ A wall this thick could bear real weight
📖 Nothing holy here was built fragile

## 🏘️ Thirty In Order

The side chambers were stacked three stories high against the temple wall.

Thirty separate rooms lined each one of those three levels.

That comes to ninety small rooms surrounding just the main building.

These rooms likely stored tools, supplies, and treasures used in temple service.

🏘️ Three stories of chambers lined the wall
🔢 Thirty rooms sat on each level
➕ That totals ninety rooms in all
📖 These rooms likely stored temple supplies

## 🪢 They Might Have Hold, But They Had Not Hold In The Wall

This odd sounding phrase describes a building technique, not a contradiction.

The side chambers rested on ledges built into the outside of the wall.

Their beams never actually pierced into the temple's own sacred wall.

The chambers had real support without weakening the holiest wall in Israel.

🪢 This phrase describes a building method
🪜 Chambers rested on ledges outside the wall
🧱 Beams never pierced the sacred wall
📖 Support came without weakening holy walls

## 📈 An Enlarging, And A Winding About Still Upward

Each of the three stories of side chambers grew a little wider than the one below it.

The temple wall itself grew thinner as it rose.

That extra space freed up room for wider chambers higher up.

Many ancient Near Eastern buildings used this same stepped, widening design.

📈 Each story grew wider than the last
📉 The temple wall grew thinner going up
🏗️ A thinner wall freed room for wider chambers
📖 This stepped design was common back then

## 🧱 The Foundations Of The Side Chambers Were A Full Reed

A "reed" here is a measuring rod made of six long cubits.

Six cubits comes to about ten feet.

The whole side chamber structure sat raised on a foundation about ten feet tall.

That platform lifted the chambers well above the surrounding ground.

🧱 A reed is a rod of six cubits
📏 Six cubits is about ten feet
⬆️ The chambers sat on a raised foundation
📖 This platform lifted them above the ground

## 🧱 The Thickness Of The Wall Which Was For The Side Chamber Without

This is a second, separate wall, surrounding the whole chamber structure.

It sat five cubits thick, about eight feet.

That is distinct from the six cubit wall of the temple itself just inside it.

Two different walls worked together, each carrying its own load.

🧱 This is a separate outer wall
📏 Five cubits is about eight feet thick
🔀 It differs from the temple's inner wall
📖 Two walls each carried their own job

## 📏 The Wideness Of Twenty Cubits Round About

Twenty cubits comes to about thirty three feet.

This was the gap between the side chamber structure and the outer buildings further out.

A walkway this wide gave workers and priests clear room to move around the whole structure.

Nothing in this design crowded one building right up against another.

📏 Twenty cubits is about thirty three feet
🚶 This gap sat between two structures
🏗️ Workers had clear room to move around
📖 Nothing here was built crowded together

## 🚪 One Door Toward The North, And Another Door Toward The South

The side chambers were not accessed from inside the temple itself.

Separate doors on the north and south let workers come and go from outside.

That kept ordinary foot traffic completely away from the sacred rooms within.

The design protected the temple's holiness even in its practical, working spaces.

🚪 Chambers were not entered from inside the temple
🧭 Doors sat on the north and south sides
🚷 Ordinary foot traffic stayed away from holy rooms
📖 Holiness was protected even in working spaces

# Ezekiel 41:12-15
# 🏛️ The Separate Place And The Whole Complex
---
## 🏛️ The Separate Place At The End Toward The West

A separate place was a distinct building behind the temple, to the west.

Scholars are honestly divided on exactly what this structure was used for.

Some think it stored equipment.

Others think it simply kept the area behind the temple clear and set apart.

It measured about a hundred and seventeen feet broad.

That is a huge building for a role the text never fully explains.

🏛️ A separate place stood west of the temple
❓ Scholars are divided on its exact use
📦 Some think it stored temple equipment
📖 Its own name means set apart

## 📏 He Measured The House, An Hundred Cubits Long

A hundred cubits comes to about a hundred and seventy feet.

The temple, the separate place, and the building behind it all measured that same length.

Three completely different structures lined up to the exact same number.

That kind of match was never an accident in this vision.

📏 This equals about a hundred seventy feet
🏛️ The temple matched this same length
🏢 The separate place matched it too
📖 Matching numbers were never an accident here

## 📐 The Breadth Of The Face Of The House Toward The East

This measurement covers the east facing front of the whole complex.

It also comes to a hundred cubits, about a hundred and seventy feet.

The east side matched the west side exactly.

This building formed a perfect square when viewed from above.

📐 This measures the east facing front
📏 It also equals a hundred seventy feet
🔲 East and west sides matched exactly
📖 The whole complex formed a perfect square

## 🏢 The Galleries Thereof On The One Side And On The Other

A gallery here means a covered walkway or balcony along the building's side.

These galleries ran the length of the building, connecting it to the inner temple.

Calling out the galleries by name shows this was not just a plain storage block.

It had the same kind of finished walkways found closer to the main sanctuary.

🏢 A gallery is a covered walkway
🔗 Galleries connected this building to the temple
✨ This was not a plain storage block
📖 Finished walkways reached even this far building

# Ezekiel 41:16-20
# 🌴 Cherubims And Palm Trees On Every Wall
---
## 🪵 Cieled With Wood Round About

Cieled is an old spelling of ceiled, meaning covered or paneled.

Here it describes wood paneling lining the inside walls, floor to window level.

A temple built from stone still felt warm inside because of this wood lining.

Craftsmen cared about how this room looked and felt, not only how it measured.

🪵 Cieled is an old spelling of ceiled
🪚 It means wood paneling lined the walls
🔥 Wood made the inside feel warm
📖 Craftsmen cared how this room felt

## 📐 By All The Wall Round About Within And Without, By Measure

Every single wall in this vision was measured, not just the obvious ones.

That includes walls seen from inside the building and walls seen only from outside.

Nothing about this house was left to guesswork, inside or out.

The same careful standard from chapter forty continues here without a single gap.

📐 Every wall here was measured
👁️ Inside and outside walls both counted
🧮 Nothing was left to guesswork
📖 The same careful standard continues from chapter forty

## 😇 Made With Cherubims And Palm Trees

Cherubims does not mean small, childlike angels with wings and arrows.

In the Bible cherubim are powerful guardian beings who stand watch over sacred space.

Carvings like this covered the walls everywhere a person could look.

The whole room reminded a worshipper that angels guarded what sat inside it.

😇 Cherubims are not childlike angels here
🛡️ They are powerful guardian beings
🌴 Palm trees and cherubim covered every wall
📖 Angels guarded what sat inside this room

## 👤 Every Cherub Had Two Faces

Earlier in this book, the cherubim Ezekiel saw each had four faces.

Here, on these carved wall images, each cherub shows only two.

One face looked like a man, the other like a young lion.

A full vision can carry more detail than a carved picture ever could.

👤 Earlier cherubim in this book had four faces
🎭 These carved ones show only two
🧑 One face was a man, one a lion
📖 Carvings simplified what the full vision showed

## 🦁 The Face Of A Young Lion Toward The Palm Tree On The Other Side

A man's face pictured the highest dignity among living creatures on earth.

A young lion's face pictured raw strength and fearless power.

Together the two faces paired human worth with untamed strength in one image.

Chapter one used these same two faces among its larger set of four.

🧑 A man's face pictured human dignity
🦁 A young lion pictured raw strength
🤝 Together they paired worth and power
📖 Chapter one used these same two faces

# Ezekiel 41:21-23
# 🪵 The Wooden Table Before The LORD
---
## ⬜ The Posts Of The Temple Were Squared

Squared means each post formed a perfect right angle, not a rounded column.

Every doorpost in this vision shared that same precise, even shape.

A squared post could not lean or warp out of true over time.

Precision here was not mere decoration.

It was a statement about God's own order.

⬜ Squared means a perfect right angle
🚪 Every doorpost shared this same shape
📏 Squared posts stayed true over time
📖 Precision itself made a statement about God

## 🪵 This Is The Table That Is Before The LORD

This wooden altar was not used for burning sacrifices.

Its size and material match the incense altar described back in the tabernacle.

Calling it a table ties it to the bread that always sat before God.

Even a small piece of furniture carried a specific, named purpose.

🪵 This altar was not for burning sacrifices
🕯️ It matches the tabernacle's incense altar
🍞 Table ties it to bread before God
📖 Every piece of furniture had a named purpose

## 🚪 The Temple And The Sanctuary Had Two Doors

This verse names two separate doors, not one single entrance.

One door led into the Holy Place, the temple's larger outer room.

The other led into the Most Holy Place, the sanctuary at the very center.

Two doors meant two very different levels of access to God.

🚪 Two separate doors are named here
🙏 One opened into the Holy Place
🕍 The other opened into the Most Holy Place
📖 Two doors meant two levels of access

# Ezekiel 41:24-26
# 🌴 Doors That Matched The Walls
---
## 🚪 Two Leaves Apiece, Two Turning Leaves

Leaves here means door panels, not plant leaves.

Each door was built from two separate panels instead of one solid slab.

Both panels could turn or fold, much like old double doors in a grand building.

A door this size needed to move easily despite its massive weight.

🚪 Leaves means door panels, not plant leaves
🔀 Each door had two separate panels
🔄 Panels could turn and fold open
📖 A door this size still moved easily

## 🪵 Thick Planks Upon The Face Of The Porch Without

This porch sat at the very front entrance, facing outward toward the court.

Even this outward facing surface was covered in thick, heavy wood planks.

Nothing about the exterior was left bare or plain.

The care given to hidden interior rooms matched the care given to the front door.

🪵 Thick planks covered the outward facing porch
👀 This was the very first thing visitors saw
🎨 Nothing on the exterior was left bare
📖 Interior care matched the care at the front

## 🌴 Upon The Side Chambers Of The House, And Thick Planks

This same decoration reached all the way to the side chambers.

Cherubim, palm trees, and thick wood covered those walls too.

Those side chambers were the plain, working rooms built for storage, not display.

Even spaces no worshipper would ever notice still received this same careful finish.

Holiness in this vision was never reserved for only the rooms people could see.

🌴 This decoration reached the side chambers too
📦 Side chambers were plain, working storage rooms
👁️ Unseen spaces still got a careful finish
📖 Holiness was not reserved for visible rooms
`.trim();

export const EZEKIEL_FORTY_ONE_PERSONAL_SECTIONS = parseEzekielFortyOneRawNotes(EZEKIEL_FORTY_ONE_RAW_NOTES);
