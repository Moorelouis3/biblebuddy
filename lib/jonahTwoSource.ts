export type JonahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJonahTwoRawNotes(rawText: string): JonahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JonahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jonah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jonah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jonah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Jonah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jonah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jonah 2:${startVerse}` : `Jonah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jonah 2 sections, received " + sections.length);
  }

  return sections;
}

const JONAH_TWO_RAW_NOTES = `# Jonah 2:1-3
# 🙏 Praying From Inside The Fish
---
## 🙏 Jonah Prayed Unto The LORD His God

Chapter one showed Jonah sailing as far from God as he could.

Chapter two opens with him praying instead.

The phrase "his God" shows the relationship was never actually over.

Even outright rebellion did not erase it.

Prayer often begins right where running finally fails.

God had stayed Jonah's God through the whole flight.

🏃 Chapter one was Jonah in flight
🙏 Chapter two opens with him in prayer
🤝 His God shows the bond held
➡️ Running from God never ends it

## 🐋 Out Of The Fish's Belly

The "great fish" from chapter one is never named as a specific species.

Scripture is not interested in zoology here.

It is interested in Jonah being kept alive somewhere he should have drowned.

Centuries later, Jesus pointed to this as a sign of His own three days in the grave.

A creature built to kill became the place God used to save a life instead.

🐋 No species is ever named
💀 Jonah should have drowned there instead
⏳ Three days inside became a lasting sign
➡️ Jesus later claimed that same sign

## 😖 I Cried By Reason Of Mine Affliction

"Affliction" means deep distress, not a passing inconvenience.

Jonah is not describing mild discomfort.

He is describing the kind of suffering that strips away every illusion of control.

Almost every line in this prayer echoes wording found elsewhere in the Psalms.

Jonah is praying the way someone prays who has memorized Scripture long before they ever needed it.

😖 Affliction means deep distress
🚫 Not a small inconvenience
📜 The prayer echoes lines from the Psalms
📖 Jonah prays what he had memorized

## 🔥 The Belly Of Hell

This does not mean the fiery hell most readers picture.

The Hebrew word here is Sheol, the general realm of the dead.

Jonah is using it to describe how close to death he actually came.

To him, the fish's belly felt like the grave itself.

He was praying from what felt like the edge of death, not a place of punishment.

🔥 Not the fiery hell readers picture
⚰️ Sheol means the realm of the dead
🐋 The fish's belly felt like a grave
📖 Jonah prayed from the edge of death

## ⛵ Thou Hadst Cast Me Into The Deep

The sailors were the ones who actually threw Jonah into the sea.

Jonah does not blame them at all.

He says God cast him in, not the crew.

He sees past the human hands to the hand controlling everything behind them.

Nothing that happened to him was outside God's control.

⛵ Sailors physically threw him overboard
👆 Jonah credits God, not the crew
🎯 He sees God's hand behind theirs
📖 Nothing happened outside God's control

## 🌊 All Thy Billows And Thy Waves Passed Over Me

"Billows" means large, swelling waves, stacked above the ordinary ones.

Naming waves and billows together is not just repetition.

Hebrew poetry often says the same thing twice in different words for emphasis.

This exact wording also appears in Psalm forty two.

Jonah's prayer keeps borrowing lines the way a person recites what they already know by heart.

🌊 Billows means large stacked waves
🔁 Hebrew poetry repeats an idea for emphasis
📜 Psalm forty two uses this same wording
📖 Jonah prays in borrowed, familiar words

# Jonah 2:4-6
# 🌊 Sinking To The Very Bottom
---
## 🏃 I Am Cast Out Of Thy Sight

Back in chapter one, Jonah chose to flee the LORD's presence.

Now he describes being cast out of it instead.

Running from God and being cut off from God feel like two very different things.

Jonah is speaking in the middle of his worst moment, not a settled fact.

He feels abandoned even while God is already working to save him.

🏃 Chapter one was Jonah in flight
⛓️ Now he feels forced out instead
😢 He speaks from his lowest moment
➡️ God was rescuing him the whole time

## 👀 Yet I Will Look Again Toward Thy Holy Temple

Jonah could not possibly see the temple from inside a fish.

"Toward" describes the direction faithful Israelites prayed, not an actual sightline.

Daniel prayed the same way, facing Jerusalem from a foreign country.

Even in despair, Jonah still turns his prayer toward God's house.

Hope breaks into the sentence the moment he says "yet."

👀 He could not actually see the temple
🧭 Toward describes the direction of prayer
📜 Daniel prayed the same way
📖 Hope breaks in with the word yet

## 🌊 The Waters Compassed Me About, Even To The Soul

"Compassed" means surrounded completely, with no gap or escape.

This was not water lapping at his feet.

"Even to the soul" means the danger reached past his body into his very life.

Jonah is describing a threat that touched more than just his body.

🌊 Compassed means surrounded completely
🚫 No gap or escape remained
💔 The danger reached his very soul
📖 It threatened more than just his body

## 🔒 The Depth Closed Me Round About

"Depth" here means the open sea itself.

"Closed me round about" pictures water sealing shut around him like a trap.

There was no gap left anywhere to swim toward the surface.

This is the sealed, trapped feeling right before someone goes under for good.

🌊 Depth means the open sea itself
🔒 Closed round about pictures a sealed trap
🚫 No gap was left to escape through
📖 This is the feeling right before going under

## 🌿 The Weeds Were Wrapped About My Head

This is one small, physical detail inside a poetic prayer.

Seaweed does not tangle around a swimmer near the surface.

It tangles around someone pulled down deep.

The detail grounds the whole prayer in something Jonah actually felt.

A drowning person remembers exactly what touched their own head.

🌿 Weeds means tangled seaweed
⬇️ This happens only far below the surface
🧠 It is a detail only memory supplies
📖 Real experience grounds this poetic prayer

## ⛰️ I Went Down To The Bottoms Of The Mountains

Ancient Israelites pictured mountains with roots reaching down into the deep below the sea.

Jonah says he sank all the way down to those roots.

That is the lowest point anyone in his world could imagine reaching.

He is not exaggerating for effect.

He is describing the farthest possible distance from dry land and light.

⛰️ Mountains were believed to have undersea roots
⬇️ Jonah sank to the lowest possible point
🌑 This is the farthest point from light
📖 He describes true, not exaggerated, distance

## 🔓 The Earth With Her Bars Was About Me For Ever

"Bars" pictures the earth sealed shut like a locked prison gate.

Jonah believed he was shut in down there for good.

"For ever" describes how final the moment felt, not a literal prediction.

He had given up any hope of escaping on his own.

🔒 Bars pictures a sealed prison gate
⬇️ Jonah believed he was shut in for good
😔 He had given up hope of escape
📖 The moment felt permanent, though it was not

## 🆙 Yet Hast Thou Brought Up My Life From Corruption

"Corruption" here means decay, the pit where a body is buried and rots.

Jonah is describing a rescue from the edge of actual death, not rough weather.

The single word "yet" reverses everything the sentence before it just said.

God pulled his life back up from somewhere people do not return from.

⚰️ Corruption means decay or the grave
🔁 Yet reverses the sentence before it
🆙 God pulled his life back up
📖 This is a rescue from death itself

# Jonah 2:7-8
# 💭 The Turn Back To God
---
## 😵 When My Soul Fainted Within Me

"Fainted" here means his strength and hope were completely gone.

This is the lowest point in the entire prayer.

Jonah is not describing light headedness.

He is describing the moment just before giving up completely.

😵 Fainted means hope and strength were gone
📉 This is the prayer's lowest point
🚫 Not simple light headedness
📖 It is the edge of giving up completely

## 🔑 I Remembered The LORD

"Remembered" is the turning word of the whole prayer.

It does not mean Jonah simply recalled a forgotten fact.

In Scripture, remembering God usually means returning to Him in covenant faithfulness.

The moment Jonah remembers, the prayer itself begins turning upward.

🔑 Remembered is the prayer's turning word
🧠 More than recalling a forgotten fact
🤝 It means returning in covenant faithfulness
📖 The prayer turns upward from this point

## 📍 My Prayer Came In Unto Thee, Into Thine Holy Temple

Jonah was nowhere near the actual temple building.

He means his prayer reached God the same way a prayer inside the temple would.

Distance and location never actually blocked it.

A sincere prayer from inside a fish reached God just as surely as one spoken in Jerusalem.

📍 Jonah was nowhere near the real temple
📨 His prayer still reached God directly
🚫 Distance never actually blocked it
📖 Sincere prayer reaches God from anywhere

## 🚫 They That Observe Lying Vanities

"Vanities" is a word the Old Testament uses again and again for idols.

It means something empty and worthless, with no real power behind it.

The sailors back in chapter one each cried out to their own gods first.

None of those gods could do anything for them.

Jonah contrasts that emptiness with the LORD who actually hears and saves.

🚫 Vanities means idols with no real power
⛵ The sailors cried to their own gods first
😶 Those gods could do nothing
📖 Jonah contrasts that with the LORD who saves

## ❤️ Forsake Their Own Mercy

"Mercy" here is the Hebrew idea of God's steady, covenant love.

People who cling to idols are not just making a small mistake.

They are walking away from mercy that was already available to them.

Jonah states this as a flat warning, not a passing comment.

Clinging to something empty always costs something real.

❤️ Mercy means God's steady covenant love
🚶 Idolatry means walking away from that love
⚠️ This is a warning, not a side note
📖 Clinging to emptiness always costs something

# Jonah 2:9-10
# 🏖️ Salvation Is Of The LORD
---
## 🐑 I Will Sacrifice Unto Thee With The Voice Of Thanksgiving

A thanksgiving sacrifice in Israel was not a silent ritual.

It came with the worshiper speaking out loud about what God had done.

"Voice" means Jonah intends to tell this rescue story to other people.

Gratitude that stays silent was not what this offering pictured.

🐑 Thanksgiving offerings were not silent rituals
🗣️ Voice means speaking the story out loud
👥 Jonah plans to tell others, not hide it
📖 Real gratitude in Scripture gets spoken aloud

## 🙏 I Will Pay That That I Have Vowed

People in the Bible often made specific vows to God in the middle of danger.

Jacob did this at Bethel, and Hannah did it before Samuel was born.

Scripture never records the exact words of Jonah's vow.

What matters here is that he commits to actually keep it.

🙏 Vows made in danger appear often in Scripture
🏛️ Jacob and Hannah both made similar vows
❓ Jonah's exact words are never recorded
📖 Keeping the vow matters more than naming it

## ⭐ Salvation Is Of The LORD

This is the single line the whole book turns on.

No sailor's skill saved the ship in chapter one.

No effort of Jonah's own saved him from the sea.

Every attempt at rescue in this book failed except God's own.

Jonah states the book's whole point in four short words.

⭐ This line is the book's turning point
⛵ Sailors could not save the ship themselves
🏃 Jonah could not save himself by running
📖 Only God's rescue actually worked

## 🐋 The LORD Spake Unto The Fish

God does not negotiate with the fish or coax it along.

He simply speaks, and it obeys.

This matches a pattern across Scripture of God commanding wind, sea, and creatures directly.

The fish was never a wild accident.

It was an instrument following orders the whole time.

🐋 God speaks, the fish simply obeys
🌬️ This matches God commanding wind and sea elsewhere
🎯 The fish was no accident
📖 It was an instrument under God's control

## 🤢 It Vomited Out Jonah Upon The Dry Land

"Vomited" is a deliberately undignified way for a prophet's rescue to end.

There is no graceful landing here, only an unpleasant one.

God's mercy did not need to look impressive to still be real.

Jonah is back on dry land, right where his assignment was always waiting.

🤢 Vomited is a deliberately undignified image
🚫 Rescue did not need to look graceful
❤️ Mercy was still real either way
➡️ Jonah lands right back at his assignment
`.trim();

export const JONAH_TWO_PERSONAL_SECTIONS = parseJonahTwoRawNotes(JONAH_TWO_RAW_NOTES);
