export type EzekielFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyRawNotes(rawText: string): EzekielFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 40:${startVerse}` : `Ezekiel 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Ezekiel 40 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_RAW_NOTES = `# Ezekiel 40:1-4
# 📏 The Man With The Measuring Reed
---
## 📅 In The Five And Twentieth Year Of Our Captivity

Twenty five years is exactly half of a fifty year jubilee cycle.

Ezekiel was a priest who once measured his whole life by those cycles.

This midpoint fell in the middle of captivity.

That timing was not a small detail.

It meant freedom still moved on God's own timetable.

God had not stopped counting on Israel's behalf.

📅 Twenty five years marks half a jubilee
⏳ Ezekiel once tracked life by jubilees
🕊️ Freedom still ran on God's clock
📖 God kept counting even in exile

## 🏚️ In The Fourteenth Year After That The City Was Smitten

Ezekiel gives two different ways of counting this same year.

One count runs from his own captivity in Babylon.

The other counts from the day Jerusalem fell.

That second count mattered most to a broken nation.

Fourteen years had now passed since the temple burned down.

This whole vision arrives exactly when hope would have felt hardest to hold.

🗓️ Two countings mark the very same year
🔥 Jerusalem had fallen fourteen years earlier
💔 Hope had worn thin by then
📖 God speaks when hope is hardest

## ✋ The Hand Of The LORD Was Upon Me

"The hand of the LORD" means God took hold of Ezekiel with sudden, overwhelming force.

It is not a literal hand touching him.

Ezekiel felt this same force all the way back in chapter one.

Using the phrase again here signals something just as weighty is coming.

This vision carries the same divine weight as his very first one.

✋ The LORD's hand means divine power seizing him
⚡ It struck him with sudden force
🔁 This phrase first opened chapter one
📖 The same weight returns in this vision

## 🌄 In The Visions Of God Brought He Me

Ezekiel is not physically carried to this place.

He sees it in a vision, the same way he saw earlier ones.

Chapters eight and thirty seven already used this same kind of vision.

His body stayed in Babylon the entire time.

🌄 Ezekiel travels in a vision, not his body
🧠 His spirit sees what his eyes do not
🔁 Chapters eight and thirty seven did the same
📖 Visions carried him, not distance

## ⛰️ Set Me Upon A Very High Mountain

No mountain near Jerusalem reaches the height this picture suggests.

Many scholars read this as symbolic imagery.

They do not think it describes a literal peak.

Isaiah pictured God's mountain the same way, lifted above every other mountain.

The height pictures God's house raised above everything else in Israel's life.

⛰️ No real peak matches this height
📖 Isaiah pictured God's mountain the same way
👑 Height shows God's house above all else
➡️ The vision speaks in pictures, not geography

## 🏙️ As The Frame Of A City On The South

Scholars are honestly divided on what this exact detail pictures.

The Hebrew phrase behind it is one of the hardest in the whole book to translate.

Many believe it points forward to the city described later in chapter forty eight.

Even an unclear detail was still worth recording for Ezekiel to see.

🏙️ A city like structure sits to the south
❓ Scholars are divided on the exact picture
🔮 It may point to chapter forty eight's city
📖 Even unclear details were worth keeping

## 🥉 Whose Appearance Was Like The Appearance Of Brass

This guide's bronze like glow matches other heavenly beings in Ezekiel's visions.

Chapter one described feet that gleamed like polished brass.

Daniel later described a similar figure in almost the same words.

Many believe this is an angel sent to walk Ezekiel through the vision.

🥉 Brass colored glow marks a heavenly being
🔁 Chapter one used this same image
👼 Many see an angelic guide here
📖 Shining brass signals holy authority

## 📏 A Line Of Flax In His Hand, And A Measuring Reed

"A line of flax" was a long cord woven from flax fiber, used for measuring big distances.

"A reed" was a stiff plant stalk used for shorter, exact measurements.

Carrying both tools shows the guide came fully prepared.

He could measure everything from the outer wall down to the smallest chamber.

Nothing about this coming temple would be left vague or approximate.

📏 Flax cord measured the big distances
🌾 A reed measured smaller, exact spaces
🧰 Both tools came ready for the whole job
📖 Nothing about this house stayed vague

## 📢 Declare All That Thou Seest To The House Of Israel

Ezekiel is not just shown this vision for himself.

He is told plainly to pass every detail on to the exiles around him.

A people who had lost their temple needed proof that God still had a house in mind for them.

This whole chapter exists because a broken people needed something to hope for.

📢 Ezekiel must tell Israel everything
😢 The exiles had lost their temple
🏡 God still had a house planned
📖 Hope needed a detailed promise

# Ezekiel 40:5-8
# 🧱 Measuring The Wall And The East Gate
---
## 🧱 A Wall On The Outside Of The House Round About

This wall was not built for defense against an army.

It marked the outer boundary of a holy space.

Anyone standing outside it knew exactly where ordinary ground ended.

Holy ground began on the other side of that line.

God's presence always came with a boundary attached.

🧱 The wall marked a holy boundary
🚷 It was not built for defense
📍 Ordinary ground ended at this line
📖 God's presence always had a boundary

## 📏 A Measuring Reed Of Six Cubits Long By The Cubit And An Hand Breadth

A regular cubit measured about eighteen inches, elbow to fingertip.

Ezekiel's cubit added a hand breadth, about three more inches.

That made his cubit close to twenty inches long.

Six of those cubits made one reed, about ten feet long.

Every measurement in this vision uses this same longer cubit.

📏 A regular cubit was about eighteen inches
➕ This cubit added a hand breadth
📐 That made it close to twenty inches
📖 Every measurement here uses this cubit

## 🪜 Went Up The Stairs Thereof

Reaching this first gate already required climbing stairs.

Every gate in this vision sits above the ground it opens onto.

Approaching God's house meant stepping up, not just stepping in.

That small detail starts a pattern the whole chapter keeps repeating.

🪜 The gate required climbing stairs
⬆️ Every gate in this vision sits higher
🚶 Approaching God meant stepping up
📖 This pattern repeats through the whole chapter

## 🚪 Every Little Chamber Was One Reed Long, And One Reed Broad

These "little chambers" were small guard rooms built into the gate passage.

Many scholars believe gatekeepers, likely Levites, used them to screen who came through.

A gate watched this closely was never a casual entrance.

Every person who crossed this threshold was checked first.

🚪 Little chambers were small guard rooms
👮 Levites likely used them to screen visitors
🛡️ The gate was carefully guarded
📖 Entering God's house was never casual

## 🏛️ He Measured Also The Porch Of The Gate Within

A "porch" here means a covered entry area, like a portico before a doorway.

This porch sat on the inside of the gate, not the outside.

Visitors passed through the gate structure fully before reaching open ground.

The design slowed every approach down on purpose.

🏛️ A porch means a covered entry area
🚪 This porch sat on the inside
🚶 Visitors passed fully through before reaching open ground
📖 The design slowed every approach on purpose

# Ezekiel 40:9-16
# 🌴 The East Gate In Full Detail
---
## 🚶 The Porch Of The Gate Was Inward

This porch faced toward the court, not toward the outside world.

Every step through this gate pulled a visitor further into sacred space.

Nothing about the design pointed people back out.

The whole structure pointed in one direction, toward God's presence.

🚶 The porch faced toward the court
➡️ Every step pulled visitors further in
🚫 Nothing pointed back toward the outside
📖 The whole design pointed toward God

## 👮 The Little Chambers Of The Gate Eastward Were Three On This Side, And Three On That Side

Six guard rooms lined this one gate alone, three on each side.

That is a lot of security for a single entrance.

This gate faced east, the same direction the glory of the LORD once left the old temple.

Guarding this particular gate carried extra weight for that reason.

👮 Six guard rooms lined this gate
🔐 That is heavy security for one entrance
🌅 This gate faced east, toward the glory's path
📖 This direction carried extra weight

## 📐 He Measured The Breadth Of The Entry Of The Gate, Ten Cubits

Ten of Ezekiel's long cubits comes to about seventeen feet wide.

Picture two lanes of modern traffic side by side.

An opening that wide could move a steady stream of worshippers at once.

This was never meant to be a narrow, single file entrance.

📐 Ten cubits is about seventeen feet wide
🚗 Picture two traffic lanes side by side
👥 Crowds of worshippers could move through together
📖 This entrance was never meant to be narrow

## 🚪 Door Against Door

"Door against door" means the doors on both ends of the gate lined up in a straight row.

Someone standing at one end could look straight through to the other.

That same straight line idea shows up again later with the gates further inside.

Nothing in this complex was built crooked or out of line.

🚪 Door against door means a straight line up
👀 A visitor could see straight through the gate
📏 Later inner gates follow this same line
📖 Nothing in God's house was crooked

## 🔢 Posts Of Threescore Cubits

"Threescore" is an old word for sixty.

Sixty of Ezekiel's long cubits comes to about a hundred feet.

That is the length of the wall running around the whole gate complex.

A single old word like this can hide a very large number.

🔢 Threescore is an old word for sixty
📏 Sixty cubits comes to about a hundred feet
🧱 That covers the whole gate complex wall
📖 Old words can hide large numbers

## 🪟 There Were Narrow Windows To The Little Chambers

These windows were built narrow on purpose, wider on the inside than the outside.

That shape let light in.

It also kept the gate protected from outside threats.

Many ancient gate towers across the region used this exact same style.

Function and holiness worked together in even this small detail.

🪟 Windows were narrow on purpose
💡 Light got in, danger stayed out
🏯 Ancient gate towers used this same style
📖 Even small details served a real purpose

## 🌴 Upon Each Post Were Palm Trees

Palm trees carved into these posts were not just decoration.

Solomon's original temple used this exact same image on its walls and doors.

In the ancient world, the palm pictured lasting life and blessing.

Repeating this image here tied the coming temple back to the one Israel had lost.

🌴 Palm trees decorated every gate post
🏛️ Solomon's temple used this same image
🌿 Palms pictured lasting life and blessing
📖 This tied the new temple to the old

# Ezekiel 40:17-19
# 🏟️ The Outer Court And Its Pavement
---
## 🏟️ There Were Chambers, And A Pavement Made For The Court Round About

A "pavement" here means a hard, level stone floor covering the ground.

This was the first open court a worshipper would actually walk across.

Before this point, every space described was part of a gate passage.

The courtyard finally opens the picture up beyond just doorways.

🏟️ A pavement means a hard stone floor
🚶 This was the first open courtyard
🚪 Earlier spaces were only gate passages
📖 The picture finally opens up

## 🏘️ Thirty Chambers Were Upon The Pavement

Thirty separate rooms lined the edge of this one courtyard alone.

A complex this size could support storage, meals, and gathering space for many people at once.

This was never a small, quiet shrine tucked into a corner.

It was built to serve a whole restored nation.

🏘️ Thirty rooms lined this courtyard
📦 Space for storage, meals, and gathering
🏙️ This was no small, quiet shrine
📖 It was built for a whole nation

## 🪨 The Lower Pavement

Calling this the "lower" pavement means another, higher level pavement existed further in.

The ground itself rose step by step the closer it came to the center.

Height in this design was not random.

Elevation itself marked the difference between ordinary space and holier space.

🪨 Lower pavement means another level sat higher
⬆️ The ground rose closer to the center
📏 Height here was never random
📖 Elevation marked ordinary space from holy space

## 📐 An Hundred Cubits Eastward And Northward

A hundred of Ezekiel's long cubits comes to about a hundred and seventy feet.

That is close to the length of half a football field.

This vision's temple was far larger than the one Israel had lost.

A space this size was already preaching a message of hope.

📐 About a hundred seventy feet across
🏈 That is close to half a football field
📈 This temple was far larger than the old
📖 Size itself carried a message of hope

# Ezekiel 40:20-23
# 🧭 The North Gate Of The Outer Court
---
## 📏 After The Measure Of The First Gate

This north gate matched the east gate in every single measurement.

Nothing about it was smaller, larger, or less carefully built.

God's house gave no entrance less honor than another.

Every side of approach received the exact same care.

📏 This gate matched the first one exactly
⚖️ No entrance was built as less important
🙌 God's house honored every side equally
📖 Every approach received the same care

## 🪜 They Went Up Unto It By Seven Steps

Seven steps led up to every gate in the outer wall.

Climbing those steps was the first physical act of approaching this house.

A worshipper felt the ascent in their own legs before seeing anything inside.

Coming near to God here was never a flat, easy walk.

🪜 Seven steps led up to each outer gate
🦵 Visitors felt the climb in their own legs
🚶 Approaching God was never a flat walk
📖 Ascending was part of approaching God

## 🎯 The Gate Of The Inner Court Was Over Against The Gate Toward The North

"Over against" means lined up directly opposite.

Someone standing at the outer north gate could look straight through to the inner north gate beyond it.

Every pair of gates on this site shared that same straight line.

The whole complex lined up like one long, deliberate hallway toward the center.

🎯 Over against means lined up directly opposite
👀 Outer and inner gates faced each other
📏 Every gate pair shared this straight line
📖 The whole site aimed toward the center

# Ezekiel 40:24-27
# ☀️ The South Gate Of The Outer Court
---
## 📋 According To These Measures

This exact phrase repeats again and again across this chapter.

That repetition can feel tedious to read.

It was not tedious to Ezekiel's first audience.

Hearing the same careful standard applied to every single gate proved nothing here was improvised.

📋 This phrase repeats on purpose
😴 It can feel tedious to a modern reader
🔁 Repetition proved nothing was improvised
📖 Every gate met the same careful standard

## 🏯 In The Arches Thereof Round About

"Arches" likely describes recessed alcoves or small porch like spaces along the gate passage.

Some translations render this same word as "porches" or "vestibules" instead.

Whatever the exact shape, these spaces appear at every single gate in the vision.

A small, hard to translate word still shaped the whole building's design.

🏯 Arches likely means recessed alcove spaces
📜 Other translations call them porches
🔁 They appear at every single gate
📖 One word shaped the whole design

## 📏 He Measured From Gate To Gate Toward The South An Hundred Cubits

A hundred cubits here comes to about a hundred and seventy feet again.

That is the same wide distance already seen on the north side.

The outer court formed a perfectly even square around the whole complex.

Balance like this was never left to chance.

📏 About a hundred seventy feet again
🧭 The same distance appeared on the north side
🔲 The outer court formed an even square
📖 This balance was never left to chance

# Ezekiel 40:28-31
# 🔑 The South Gate Of The Inner Court
---
## 🔑 He Brought Me To The Inner Court By The South Gate

This vision's temple has two separate courts, not just one.

The outer court anyone could walk through once inside the wall.

The inner court sat closer to the altar and the temple building itself.

Each ring moved a worshipper one step closer to God's presence.

🔑 This temple has two separate courts
🚶 The outer court was open once inside
🎯 The inner court sat closer to the altar
📖 Each ring moved worshippers closer to God

## 🪜 The Going Up To It Had Eight Steps

The outer gates each needed seven steps to climb.

This inner gate needed eight.

One extra step marked one more level of nearness to God.

The climb itself kept growing the closer a person came to the center.

🪜 Outer gates needed seven steps
➕ This inner gate added one more
📈 Each extra step marked more nearness
📖 The climb grew closer to the center

## 🏯 The Arches Thereof Were Toward The Utter Court

"Utter" is an old word that simply means outer.

Every inner gate's porch faced back toward the court a visitor had just left.

The design kept connecting each new space to the one before it.

Nothing here felt disconnected from where a worshipper had already been.

🏯 Utter is an old word for outer
👀 Each porch faced back toward the last court
🔗 Every space connected to the one before it
📖 Nothing here felt disconnected

# Ezekiel 40:32-37
# 🔑 The East And North Gates Of The Inner Court
---
## 🌅 He Brought Me Into The Inner Court Toward The East

This chapter describes gates on the east, north, and south sides of the complex.

No gate is ever described facing west.

The temple building itself stood on the west side, backed against that direction.

Every gate aimed a worshipper toward the building, never away from it.

🌅 Gates appear on the east, north, and south
🚫 No gate ever faces west
🏛️ The temple building stood on the west side
📖 Every gate aimed worshippers toward God's house

## 🔁 He Brought Me To The North Gate

By now the same measurements have appeared six separate times.

Six gates, one on each side of two courts, all matched exactly.

That kind of consistency does not happen by accident.

God's house displayed total order in every direction.

🔁 The same pattern repeated six times
🔲 Six gates all matched exactly
🎯 This consistency was no accident
📖 God's house showed order everywhere

# Ezekiel 40:38-43
# 🔪 Tables For The Sacrifices
---
## 🚿 Where They Washed The Burnt Offering

Before an animal could be burned on the altar, parts of it had to be washed first.

Leviticus already required washing the inner parts and the legs of the animal.

This small chamber existed just to make that washing step possible, every single time.

Worship here required real, physical labor, not just a quick ritual gesture.

🚿 The offering had to be washed first
📜 Leviticus already required this exact step
🏠 A whole chamber existed just for this
📖 Worship took real, physical labor

## 🔪 Two Tables On This Side, And Two Tables On That Side

Four tables sat right at the entrance to this one gate alone.

Having multiple tables let several animals be prepared for sacrifice at the same time.

A whole nation bringing offerings again needed a system that could handle real volume.

🔪 Four tables stood at this one gate
⚙️ Multiple tables allowed several sacrifices at once
👥 A whole nation needed real capacity
📖 Worship on this scale needed a working system

## 🐑 The Burnt Offering And The Sin Offering And The Trespass Offering

These three offerings each served a different purpose under the law.

A burnt offering was fully consumed as an act of total devotion.

A sin offering dealt with wrongdoing a person had not meant to commit.

A trespass offering repaid a specific debt or wrong done to God or to another person.

🐑 Burnt offerings showed total devotion
😔 Sin offerings covered unintentional wrongdoing
💰 Trespass offerings repaid a specific debt
📖 Each offering served its own purpose

## 🔪 Eight Tables, Whereupon They Slew Their Sacrifices

Eight separate tables appear just around this one entrance.

A ruined, empty temple could never have needed a setup this large.

This detail quietly promises a future where worship is thriving again, not barely surviving.

Hope here is hidden inside a list of furniture.

🔪 Eight tables stood ready at one gate
🏚️ A ruined temple never needed this much
🌱 This promises worship thriving again
📖 Hope hid inside a list of furniture

## 🪨 Of Hewn Stone

"Hewn" means cut and shaped by a tool, not left as a rough, natural rock.

These tables were built to last, not thrown together for one use.

Permanent materials like this were common in Israel's most important structures.

A table meant to serve forever was worth the extra work.

🪨 Hewn means cut and shaped by tool
🏗️ These tables were built to last
🏛️ Permanent materials marked important structures
📖 Worship worth keeping was worth building well

## 🪝 Hooks, An Hand Broad, Fastened Round About

These hooks held carcasses in place while they were prepared for the altar.

A hand's breadth is about three inches, enough to firmly hold real weight.

Even this small detail shows how carefully this whole process was planned out.

Nothing about temple worship was left to figure out on the spot.

🪝 Hooks held carcasses during preparation
📏 A hand's breadth is about three inches
🧠 Every detail here was planned ahead
📖 Nothing was left to figure out later

# Ezekiel 40:44-49
# 🎶 The Singers, The Priests, And The Porch
---
## 🎶 The Chambers Of The Singers

Worship music had its own permanent rooms in this vision's temple.

King David had already organized Levites into formal singing groups generations earlier.

Giving singers a dedicated space shows how seriously God's house treated music.

Music counted here as real worship, not decoration.

🎶 Singers had their own permanent rooms
👑 David had organized Levite singers earlier
🙏 Music counted as real worship here
📖 Even music had a planned place

## 🏠 The Keepers Of The Charge Of The House

This group of priests cared for the temple building itself.

Their work covered the structure, the furnishings, and the daily upkeep.

Someone had to be responsible for the ordinary, practical side of God's house.

Even sacred space still needed people tending to its daily needs.

🏠 This group maintained the temple building
🧹 Their work covered daily upkeep
🙌 Even holy space needed practical care
📖 God's house still needed daily tending

## 👑 These Are The Sons Of Zadok

Zadok was a priest who stayed loyal to King David during a rebellion led by David's own son.

When Solomon finally became king, Zadok was the priest who anointed him.

Another priest named Abiathar backed the wrong side and lost his place in the end.

Zadok's descendants are given sole charge of the altar here, a reward that outlasted his own lifetime.

👑 Zadok stayed loyal during a royal rebellion
🤴 He anointed Solomon as king
⚖️ Another priest backed the wrong side
📖 Loyalty outlived Zadok's own lifetime

## 🔲 An Hundred Cubits Long, And An Hundred Cubits Broad, Foursquare

"Foursquare" means perfectly even on every side, a true square shape.

That same word describes the New Jerusalem much later in the book of Revelation.

A perfect square pictured completeness, nothing lacking and nothing uneven.

This court's shape was already preaching a message before a single sacrifice was offered.

🔲 Foursquare means a perfect, even square
🏙️ Revelation uses this same word later
✅ A square pictured total completeness
📖 The shape itself carried a message

## 🏛️ Pillars By The Posts

Two freestanding pillars once stood at the porch of Solomon's original temple, named Jachin and Boaz.

This new vision does not name its pillars the same way.

Many believe the detail still echoes that same famous entrance.

Even small architectural echoes tied this future hope back to what Israel had already lost.

🏛️ Solomon's temple had two named pillars
🤫 This vision never names its own pillars
🔁 The detail likely echoes that same entrance
📖 Small echoes tied old hope to new hope
`.trim();

export const EZEKIEL_FORTY_PERSONAL_SECTIONS = parseEzekielFortyRawNotes(EZEKIEL_FORTY_RAW_NOTES);
