export type EzekielFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyThreeRawNotes(rawText: string): EzekielFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+43:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 43 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+43:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+43:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 43 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 43,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 43:${startVerse}` : `Ezekiel 43:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 43 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_THREE_RAW_NOTES = `# Ezekiel 43:1-5
# 👁️ The Glory Returns
---
## 🚪 The Gate That Looketh Toward The East

This is the same east gate measured back in chapter forty.

It faces the rising sun, the most honored direction in this vision.

Back in chapters ten and eleven, the glory of the LORD left the temple through this exact gate.

Now the vision brings everything full circle.

What left through the east is about to return through the east.

🚪 The east gate matches chapter forty
📉 The glory left through this gate before
🔁 The vision now reverses that departure
📖 What left in judgment now returns in mercy

## 🌅 The Glory Of The God Of Israel Came From The Way Of The East

Glory means the visible presence of God himself, not a mood or a feeling.

When it departed back in chapter eleven, it paused on a mountain east of the city before leaving.

Now it comes back from that same direction.

The path of judgment becomes the path of return.

👑 Glory means God's own visible presence
🏔️ It paused east of the city
🔁 It now returns from that direction
📖 Judgment's path becomes the path of return

## 🌊 His Voice Was Like A Noise Of Many Waters

This exact description already appeared in chapter one, describing the sound around the living creatures.

It means an overwhelming roaring sound, like a crashing ocean.

No single human voice sounds like this.

The sound itself announces that someone greater than a man is speaking.

🌊 Means an overwhelming roaring sound
🔁 The same phrase appeared in chapter one
👂 No ordinary human voice sounds like this
📖 The sound itself announces God's arrival

## ✨ The Earth Shined With His Glory

This is not a figure of speech for a pleasant feeling.

The vision describes an actual, visible brightness spreading across the ground.

A similar light filled Solomon's temple the day it was first dedicated.

Here that light fills the whole landscape outside the temple as well.

✨ The brightness was completely real
🏛️ Filled Solomon's temple at its dedication
🌍 Here it spreads across the whole landscape
📖 God's presence can fill more than a building

## 😳 I Fell Upon My Face

Ezekiel reacts to this vision the same way he has before.

Falling on the face was the normal human response to seeing God's glory directly.

It is not fear alone.

It is the only posture that makes sense in front of something this large.

😳 Falling down was Ezekiel's normal reaction
👁️ Seeing God's glory caused this response
🙇 It is not only fear
📖 Some sights only leave room for worship

## 🏛️ The Inner Court

Chapters forty through forty two already mapped out the temple in careful detail.

There was an outer court for the general public and an inner court much closer to the altar.

The spirit brings Ezekiel into that closer, more sacred space.

Each step inward in this vision is a step toward greater holiness.

🏛️ The inner court sits closer to the altar
🗺️ Chapters forty through forty two mapped this layout
👣 The spirit brings Ezekiel further inward
📖 Nearness in this vision means greater holiness

## 🌟 The Glory Of The LORD Filled The House

The same phrase once described Solomon's temple in the Book of Kings.

Back then, the glory filled the house at its opening.

Later, in chapters ten and eleven, that same glory left because of what the people had done.

This verse marks its full return to the same house.

🌟 This same phrase described Solomon's temple
🔁 That earlier glory later left the temple
🏠 Now the glory returns to the house
📖 What left in judgment comes back in grace

# Ezekiel 43:6-9
# 🔥 No More Defiling My Name
---
## 🗣️ I Heard Him Speaking Unto Me Out Of The House

The voice comes from inside the temple itself, not from the man standing beside Ezekiel.

The man is the measuring guide who has led this whole temple tour since chapter forty.

Here, for the first time, God himself begins to speak directly.

🗣️ The voice comes from inside the house
📏 The man is the guide from chapter forty
👆 God himself now begins speaking directly
📖 The guide leads, but God gives the words

## 👑 The Place Of My Throne, And The Place Of The Soles Of My Feet

A throne pictures a king's seat of ruling authority.

The soles of the feet picture a resting place, like a footstool.

Other passages call the ark, and later the temple, God's footstool on earth.

Together these two images mean God is choosing to rule from here and to rest here.

👑 Throne pictures God's ruling authority
🦶 Soles of the feet pictures a footstool
🏠 Other passages call the temple God's footstool
📖 God chooses to rule and rest here

## ♾️ Dwell In The Midst Of The Children Of Israel For Ever

Earlier in this book, God's presence left the temple because of the nation's sin.

This promise is bigger than that earlier departure.

For ever means this is not a temporary visit like the ones before it.

➡️ Earlier, God's presence had already left once
⏳ For ever means not just a visit
🏡 This promise outlasts every past departure
📖 God is promising permanent nearness this time

## 🚫 My Holy Name... No More Defile

A name in scripture carries someone's whole reputation and character.

To defile God's name means to drag his reputation into shame through sin.

The people's own actions had already done exactly that before the exile.

🚫 Defile means to drag something into shame
📛 A name carries a person's whole reputation
💔 The people's own sin had done this
📖 God's reputation is tied to his people's choices

## 💔 By Their Whoredom

Whoredom here is not a literal accusation against every person.

Prophets regularly used this word as a picture for chasing after other gods.

Hosea and earlier chapters of Ezekiel use the exact same picture.

Israel had been unfaithful to God the way a spouse is unfaithful in a marriage.

💔 Whoredom pictures chasing after other gods
🔁 Hosea and Ezekiel both use this image
💍 Israel's idolatry is pictured as unfaithfulness
📖 Spiritual unfaithfulness breaks a real relationship

## ⚰️ The Carcases Of Their Kings In Their High Places

Carcases means dead bodies.

Some of Judah's kings were buried extremely close to the temple grounds, or worshiped at shrines nearby called high places.

Death and idol worship that close to God's house made the whole area ritually unclean.

⚰️ Carcases means dead bodies
🏺 High places were local shrines to other gods
📍 Kings were buried too close to the temple
📖 Uncleanness that close to God mattered deeply

## 🚪 Their Threshold By My Thresholds, And Their Post By My Posts

A threshold is the strip of floor at a doorway, and a post is a doorframe beam.

Judah's kings had apparently built their own palace entrance right against the temple's own entrance.

That blurred the line between a king's house and God's house.

🚪 Threshold means the floor at a doorway
🏛️ Posts means the beams of a doorframe
👑 Kings built their palace against the temple
📖 Blurring that line dishonored God's house

## 🧱 The Wall Between Me And Them

A wall should have kept something common clearly separated from something holy.

Instead, that boundary had worn down to almost nothing in practice.

The problem was not the stones themselves.

It was how carelessly the people had already treated the line those stones were meant to protect.

🧱 A wall should mark off the holy
📉 That boundary had worn down to nothing
😔 The failure was carelessness, not architecture
📖 A forgotten boundary still has real consequences

## 🔥 Wherefore I Have Consumed Them In Mine Anger

Consumed here means destroyed, the way fire consumes dry wood.

This sentence explains why the exile happened at all.

The defiling of God's name was not a small offense.

It carried real consequences that reached an entire nation.

🔥 Consumed means destroyed, like fire burning wood
📜 This explains why the exile happened
⚖️ Defiling God's name was never a small offense
📖 Sin against God's holiness carries real weight

## 🙏 Now Let Them Put Away Their Whoredom

This is not only a warning about the past.

It is a condition attached to the promise of verse seven.

God's permanent presence depends on the people actually changing their ways.

🙏 A call to change, not only history
🤝 Connects back to the promise in verse seven
🔑 Lasting presence depends on real change
📖 God's promises often come with real conditions

# Ezekiel 43:10-12
# 📐 The Law Of The House
---
## 😳 Shew The House To The House Of Israel

Shew is an old word that simply means show.

Ezekiel is told to describe this entire vision to the people back home in exile.

The goal is not just information about measurements and rooms.

😳 Shew is an old word for show
🏠 Ezekiel must describe this vision to the exiles
🎯 The goal is more than architecture
📖 This vision was meant to be shared

## 😔 That They May Be Ashamed Of Their Iniquities

Iniquities means sins, especially the kind that twist something good into something wrong.

This shame is not meant to crush the people.

It is meant to wake them up toward honest repentance.

A good kind of shame is often the first step back toward God.

😔 Iniquities means sins that twist what is good
🎯 This shame aims at repentance, not despair
👣 Shame here aims at a first step
📖 Honest shame can lead someone back to God

## 📏 Let Them Measure The Pattern

This measuring is not simply a technical exercise for builders.

Chapters forty through forty two already gave the exact pattern in careful detail.

Studying that pattern was meant to shape how the people thought about holiness itself.

📏 Measuring is not just a builder's task
🗺️ Chapters forty through forty two gave the pattern
🧠 Studying it was meant to shape their thinking
📖 A pattern can teach more than dimensions

## ✍️ Write It In Their Sight

Writing this down made the vision permanent and official.

A spoken vision can be forgotten or argued about later.

A written one becomes something the people can return to and check themselves against.

✍️ Writing made the vision permanent
🗣️ A spoken message can fade or get disputed
📖 A written one stays open to being checked
➡️ This vision was meant to outlast the moment

## 📖 This Is The Law Of The House

Law here means more than a rulebook.

It is the full set of instructions, in architecture and ritual, that shapes how God is approached.

Everything shown across chapters forty through forty three falls under this one heading.

📜 Law here means a full set of instructions
🏛️ It covers architecture and ritual together
🗺️ Gathers chapters forty through forty three
📖 One heading ties the whole vision together

## ⛰️ Upon The Top Of The Mountain... Most Holy

Earlier parts of the temple had different levels of holiness depending on how close they sat to the altar.

Here, the entire mountaintop around the temple is called most holy.

The boundary of holiness has widened compared to what it used to be.

⛰️ The whole mountaintop is called most holy
📈 Holiness here reaches further than before
🗺️ Earlier sections had more limited holy zones
📖 God's holiness now stretches over the whole area

# Ezekiel 43:13-17
# 📐 The Measurements Of The Altar
---
## 📏 The Cubit Is A Cubit And An Hand Breadth

A regular cubit was about the length of a forearm, close to eighteen inches.

This verse specifies a longer cubit, adding the width of a hand on top of that.

That makes this special cubit close to twenty one inches, a little taller than a yardstick.

Every measurement from here forward in the chapter uses this longer cubit.

📏 A regular cubit was about a forearm's length
✋ This longer cubit adds a hand's width
📐 It comes out near twenty one inches
📖 Every number after this uses the longer cubit

## 🪜 The Settle

A settle is a ledge, like a wide step partway up the altar's side.

Picture a wedding cake shape, where each tier sits a little narrower than the one below it.

The altar in this vision was built in stepped tiers rather than as one flat block.

🪜 A settle is a ledge on the altar
🎂 Picture a tiered shape, narrower near the top
🧱 The altar rose in stages, not flat
📖 Even an altar's shape carried careful design

## 🐮 Four Horns

Horns were pointed projections built onto the four top corners of the altar.

Priests splashed sacrificial blood onto these horns during offerings.

In other passages, grabbing hold of an altar's horns was even treated as a plea for mercy and protection.

🐮 Horns were projections on the altar's top corners
🩸 Blood from offerings was placed on them
🙏 Grabbing the horns elsewhere meant pleading for mercy
📖 Even a corner of the altar carried meaning

## ⬜ Twelve Cubits Long, Twelve Broad, Square In The Four Squares

A perfect square shape mattered in this vision, not just the size.

Equal sides on every edge pictured balance and completeness.

This altar measured about twenty one feet across using the longer cubit from verse thirteen.

⬜ A perfect square meant balance and completeness
📐 Equal sides on every edge, not just size
📏 About twenty one feet across in modern terms
📖 Even geometry carried meaning in this vision

## 🪨 His Stairs Shall Look Toward The East

An older law in Exodus forbids steps up to an altar, so priests would not expose themselves while climbing.

This altar instead uses stairs.

Some scholars believe special priestly clothing may have solved that same concern elsewhere.

The stairs also face east, matching the very gate this whole chapter opened with.

🪨 An older law had forbidden altar steps
👘 Priestly clothing likely addressed that same concern here
🧭 The stairs face east, like the gate
📖 Even the stairs match the chapter's direction

# Ezekiel 43:18-21
# 🩸 Dedicating A New Altar
---
## 📜 These Are The Ordinances Of The Altar In The Day When They Shall Make It

Ordinances means the specific rules for how something must be done.

Building the altar was only step one.

A brand new altar still had to be formally set apart before anyone could use it for worship.

📜 Ordinances means specific rules for a task
🧱 Building the altar alone was not enough
🙏 A new altar still needed setting apart
📖 Even sacred objects needed a dedication process

## 👳 The Priests The Levites... Of The Seed Of Zadok

Zadok was a priest who stayed loyal to Solomon during a dangerous struggle over the throne.

A rival priestly line was removed from service because of that same conflict, recorded in the Book of Kings.

Ezekiel's vision restricts future priesthood specifically to Zadok's faithful family line.

👳 Zadok stayed loyal during Solomon's struggle
⚔️ A rival priestly line lost its place
🔑 Ezekiel limits future priests to Zadok's family
📖 Loyalty in one generation shaped the next one

## 🐂 A Young Bullock For A Sin Offering

A bullock is a young bull.

A sin offering dealt with guilt and impurity, clearing the way for proper worship to continue.

This was the very first sacrifice ever offered on this brand new altar.

🐂 Bullock means a young bull
🩸 A sin offering dealt with guilt and impurity
🆕 This was the altar's very first sacrifice
📖 Worship began here with cleansing, not celebration

## 🔺 Put It On The Four Horns Of It

This recalls the four horns already described back in verse fifteen.

Applying blood to each corner symbolically covered the entire altar, not only one spot.

No side of the altar was left untouched by this ritual.

🔺 This recalls the horns from verse fifteen
🩸 Blood on each corner meant full coverage
🧭 Every side of the altar was included
📖 A whole object was cleansed, not one spot

## 🧼 Thus Shalt Thou Cleanse And Purge It

Cleanse and purge both describe ritual purification, not scrubbing away dirt.

A brand new altar still carried the ordinary impurity of this broken world around it.

It had to be purified before God would accept anything offered on it.

🧼 Cleanse and purge mean ritual purification
🌍 Even a new altar was not automatically clean
✅ Purification came before any offering was accepted
📖 Newness alone did not make something holy

## 🔥 He Shall Burn It... Without The Sanctuary

Burning the bullock outside the sanctuary matches the pattern for sin offerings in the Law of Moses.

The guilt the offering carried was removed completely outside the holy area, not inside it.

This kept the place of guilt removal separate from the place of worship.

🔥 This matches the sin offering pattern
🚪 It happened outside the sanctuary, not inside it
🗑️ The guilt was carried fully away
📖 Removing guilt and entering holiness were kept separate

# Ezekiel 43:22-27
# 🗓️ Seven Days Of Consecration
---
## 🐐 On The Second Day Thou Shalt Offer A Kid Of The Goats

This dedication did not happen in a single afternoon.

Each day built on the one before it, moving the altar step by step toward being fully set apart.

The goat on day two kept that steady progress moving forward.

🐐 This was a multi day process
📅 Day two builds on what day one started
🪜 Each stage moved the altar closer to holy
📖 Consecration here was a process, not a moment

## ✨ Without Blemish

Blemish means a physical flaw, like an injury, a disease, or a missing part.

Every animal offered during these seven days had to be the very best of the flock.

Giving God a damaged or inferior animal would have treated the whole process as unimportant.

✨ Blemish means a physical flaw or defect
🏆 Only the very best animals qualified
🚫 A damaged offering would have shown carelessness
📖 Worship here demanded a person's very best

## 🧂 The Priests Shall Cast Salt Upon Them

Salt in the ancient world symbolized lasting preservation and a sealed agreement.

Numbers eighteen even calls a related promise a covenant of salt.

Adding salt here marked this offering as part of a binding, lasting relationship, not a one time gift.

🧂 Salt symbolized lasting preservation
📜 Numbers eighteen calls a related promise salt's covenant
🤝 It marked this as a lasting relationship
📖 Even a seasoning carried covenant meaning here

## 🗓️ Seven Days Shalt Thou Prepare Every Day A Goat

Seven days frequently marks a complete cycle in scripture, like the seven days of creation.

The ordination of Israel's first priests back in Exodus also lasted exactly seven days.

This dedication deliberately follows that same complete pattern.

🗓️ Seven days often marks a complete cycle
🏛️ Creation itself followed a seven day pattern
👳 The first priests were ordained over seven days
📖 This dedication follows that same complete shape

## 🙇 They Shall Consecrate Themselves

Consecrate means to set apart for a sacred purpose.

It was not only the altar being purified during this week.

The priests serving at that altar needed their own purification as well.

🙇 Consecrate means set apart for sacred use
🧱 The altar was not the only thing purified
👳 The priests needed their own purification too
📖 A holy place needs holy people serving it

## 🌅 Upon The Eighth Day, And So Forward

Seven full days complete the cycle, and the eighth day begins something brand new.

Circumcision in the Law was also performed on a baby's eighth day, marking a similar fresh start.

Regular worship at this altar only begins after the entire process is finished, not partway through it.

🌅 The eighth day marks a fresh beginning
👶 Circumcision used this same eighth day pattern
⏳ Regular worship waited until the process finished
📖 Some beginnings only come after real completion

## 🤝 And I Will Accept You

This single sentence is the entire point of the long process before it.

Every measurement, sacrifice, and washing across this chapter was building toward this one moment of acceptance.

Being accepted by God, not the architecture itself, was always the real goal.

🤝 This sentence is the whole chapter's point
🧱 Every measurement was building toward this moment
🎯 Acceptance by God, not architecture, was the goal
📖 The whole process ends in restored fellowship`.trim();

export const EZEKIEL_FORTY_THREE_PERSONAL_SECTIONS = parseEzekielFortyThreeRawNotes(EZEKIEL_FORTY_THREE_RAW_NOTES);
