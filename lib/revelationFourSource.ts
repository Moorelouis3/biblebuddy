export type RevelationFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationFourRawNotes(rawText: string): RevelationFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 4:${startVerse}` : `Revelation 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Revelation 4 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_FOUR_RAW_NOTES = `# Revelation 4:1-2
# 🚪 A Door Opened In Heaven
---
## 🚪 A Door Was Opened In Heaven

A door opening in this vision means something hidden is about to be revealed.

John is not imagining this scene on his own.

He is given a direct, physical sight into heaven itself.

Everything in the chapters that follow flows out of what is shown through this door.

Nothing happening on earth escapes the throne room behind it.

🚪 A door pictures hidden things revealed

👀 John is given direct sight

🏛️ Heaven's throne room stands open

📖 Earth's story flows from this room

## 📯 As It Were Of A Trumpet

John describes the voice he hears as being like a trumpet.

A trumpet in the ancient world carried commands across a whole army or a whole city.

It was loud, clear, and impossible to miss or misunderstand.

This voice is not quiet or gentle.

It calls John the way a trumpet calls soldiers to attention.

📯 A trumpet carried commands far

⚔️ Armies and cities used trumpets

🔊 The voice is loud and clear

📖 God calls John to attention

## 🙋 Come Up Hither

"Come up hither" is a direct invitation, not a vague suggestion.

John is called out of his earthly vantage point completely.

He now sees the world from heaven's side instead of earth's.

The call is aimed straight at John, by name, not at a crowd.

What he sees next will shape the rest of this book.

🙋 Come up hither is a direct call

🌍 John leaves his earthly view behind

👁️ He sees from heaven's side now

📖 What he sees shapes this whole book

## 👁️ Immediately I Was In The Spirit

"In the spirit" describes a state of prophetic vision.

It is not a dream and not something John stumbled into by accident.

God brings him into this state on purpose, the same way He did in chapter one.

What follows is revelation, not imagination.

John is a witness here, not the author of what he sees.

👁️ In the spirit means prophetic vision

🚫 Not a dream or an accident

🎯 God brings this on purpose

📖 John witnesses, he does not invent

## 👑 A Throne Was Set In Heaven

Everything else in this chapter surrounds one single object, a throne.

A throne pictures absolute ruling authority, not just a chair someone sits in.

This throne was already set in place before John ever arrived to see it.

Nothing about God's rule began the moment John looked up.

It was already there, already settled, long before this vision started.

👑 A throne pictures ruling authority

🏛️ It was already set in place

⏳ God's rule did not just begin

📖 His authority was settled beforehand

# Revelation 4:3-5
# 👑 The Throne And Its Witnesses
---
## 💎 Like A Jasper And A Sardine Stone

"Jasper" and "sardine stone" are gemstones, not random words John reached for.

Many scholars believe jasper could appear as a brilliant, clear stone closer to a modern diamond than today's jasper.

Sardine stone was a deep red stone, likely close to what is now called carnelian.

John reaches for the most dazzling material language he knows to describe what he cannot fully put into words.

Human language strains to describe God's own appearance.

💎 Jasper and sardine stone are gemstones

✨ Jasper may have looked like diamond

🔴 Sardine stone resembled deep red carnelian

📖 Language strains to describe God's glory

## 🌈 A Rainbow Round About The Throne

A rainbow surrounding the throne is a picture most readers already know from Genesis.

After the flood, God used a rainbow as a sign of mercy and promise.

Here that same sign surrounds His own throne permanently.

Justice and judgment are about to fill this book.

Mercy still frames every bit of it from the very beginning.

🌈 A rainbow recalls God's mercy sign

🕊️ Genesis connects it to His promise

⚖️ Judgment fills the chapters ahead

📖 Mercy still frames all of it

## 🔢 Four And Twenty Elders

"Four and twenty" simply means twenty four, counted the older way.

Many scholars believe these elders represent all of God's redeemed people, twelve tribes of Israel and twelve apostles combined.

Elders in scripture usually picture mature leaders who represent a larger group.

These twenty four are not a random number.

They stand in for the whole family of God gathered in one place.

🔢 Four and twenty simply means twenty four

👴 Elders represent mature, trusted leaders

👪 They may picture all God's people

📖 One number stands for a whole family

## 👕 Clothed In White Raiment

"Raiment" is simply an old word for clothing.

White clothing in this culture pictured purity and victory, not just a clean outfit.

These elders are not dressed for mourning or shame.

They are dressed like people who already won something.

Their appearance alone announces a finished, settled victory.

👕 Raiment is an old word for clothing

🤍 White pictured purity and victory

🏆 These elders look like winners

📖 Their appearance announces finished victory

## 🏅 Crowns Of Gold

These are not crowns given to kings who still rule a kingdom.

The Greek word behind "crowns" here usually pictures a winner's wreath, not a royal crown.

It is the same picture used for a victor at the end of a race.

These elders already finished their race and already received their reward.

Later in this very book, they lay these crowns back down before God.

🏅 Crowns here picture a winner's wreath

🏁 It matches a victor at a race

🎉 These elders already received their reward

📖 They will lay the crowns down later

## ⚡ Lightnings And Thunderings And Voices

Lightning, thunder, and loud voices surrounded God's presence once before, at Mount Sinai.

That same combination announced His holiness and His power to a whole nation.

God's appearance in heaven uses the same signals His people already recognized on earth.

Nothing about His holiness has softened or quieted over time.

⚡ Lightning and thunder recall Mount Sinai

🏔️ Sinai announced God's holiness long ago

🔊 The same signals surround heaven's throne

📖 God's holiness has not softened

## 🕊️ The Seven Spirits Of God

"The seven Spirits of God" does not mean there are seven separate gods or seven lesser spirits.

Seven in this book consistently pictures completeness, not a literal headcount.

This phrase points to the Holy Spirit in the fullness of His work.

The seven lamps burning before the throne picture that same complete presence.

One Spirit, described in a way that shows He misses nothing.

🔢 Seven pictures completeness, not a headcount

🕊️ This names the Holy Spirit's fullness

🔥 Seven lamps picture that same presence

📖 One Spirit who misses nothing

# Revelation 4:6-8
# 🦁 Four Living Creatures
---
## 🌊 A Sea Of Glass Like Unto Crystal

A sea of glass pictures something perfectly calm and perfectly clear.

Ancient seas were usually feared as chaotic and dangerous.

This sea has been completely stilled, with nothing left to fear in it.

Later in this book, those who overcome stand on this very same sea.

Even what once pictured chaos now reflects God's own order.

🌊 A glass sea pictures perfect calm

😨 Seas were normally feared as chaotic

🧊 This sea has been fully stilled

📖 Chaos itself now reflects God's order

## 👁️ Four Beasts Full Of Eyes Before And Behind

"Beasts" here is an old word for living creatures, not monsters.

Eyes covering their whole bodies picture total, constant awareness.

Nothing happens in heaven or on earth that escapes their notice.

These are not frightening figures meant to scare the reader.

They picture a kind of watchfulness no human being could ever match.

👁️ Beasts means living creatures, not monsters

🔭 Eyes everywhere picture total awareness

🚫 Nothing escapes their constant notice

📖 Their watchfulness outmatches any human

## 🦁 The First Beast Was Like A Lion

These four faces echo a vision Ezekiel already saw centuries earlier.

A lion pictures strength and royal authority.

A calf pictures patient, faithful strength.

A human face pictures reason and intelligence.

An eagle pictures swiftness and a view from far above.

Together, these four faces picture the whole range of creation praising God.

🦁 Lion pictures strength and authority

🐂 Calf pictures patient, faithful service

🦅 Eagle pictures swiftness and vision

📖 Together they picture all creation praising God

## 🪽 Had Each Of Them Six Wings About Him

Six wings on each creature recall the seraphim Isaiah already saw in his own vision of God's throne.

Wings in this picture are not primarily about flight.

They picture readiness to act the instant God speaks.

Nothing about these creatures is sluggish or slow to respond.

🪽 Six wings recall Isaiah's seraphim

✈️ Wings here are not about flight

⚡ They picture instant readiness to act

📖 Nothing about them is slow to respond

## 👀 Full Of Eyes Within

Verse six already described eyes covering the outside of these creatures.

Here their inside is described the same way, full of eyes too.

There is no blind spot anywhere on them, inside or outside.

Their whole being is built for watching, not just their surface.

👁️ Eyes inside match the eyes outside

🚫 No blind spot exists anywhere

👀 Their whole being exists to watch

📖 Nothing in heaven misses anything here

## ⏰ They Rest Not Day And Night

These creatures never pause, never sleep, and never grow tired of this task.

Human worship comes and goes, interrupted by sleep, distraction, and exhaustion.

Their worship pictures something continuous, happening every single moment.

Heaven's praise of God never actually stops.

⏰ They never pause or grow tired

😴 Human worship is often interrupted

🔁 Their praise never actually stops

📖 Heaven's worship runs continuously

## 📣 Holy, Holy, Holy, LORD God Almighty

This exact triple cry was already spoken by the seraphim Isaiah saw in his own vision.

Saying a word three times in this language was a way of saying it completely, to the highest degree.

"Holy" means set apart, completely different from anything sinful or ordinary.

"Almighty" means there is no limit anywhere to His power.

Two different prophets, centuries apart, hear the exact same cry around His throne.

📣 Holy repeated three times means completely

✝️ Holy means set apart from sin

💪 Almighty means power without limit

📖 Two prophets hear the same cry

## ⏳ Which Was, And Is, And Is To Come

This phrase names God across all of time at once.

He already existed before anything else did.

He is fully present right now, in this very moment.

He will still be there after everything else ends.

No point in time ever catches God by surprise or leaves Him behind.

⏳ This names God across all time

🕰️ He already existed before everything

⏱️ He is fully present right now

📖 No moment ever leaves Him behind

# Revelation 4:9-11
# 👑 Casting Their Crowns Before The Throne
---
## ✨ Give Glory And Honour And Thanks

These three words describe three different ways of responding to God.

Glory means recognizing how great He truly is.

Honour means treating Him with the respect only He deserves.

Thanks means recognizing everything received from His hand.

All three responses belong together, not just one of them alone.

✨ Glory means recognizing His greatness

🙇 Honour means giving proper respect

🙏 Thanks means recognizing what He gave

📖 All three responses belong together

## ♾️ Who Liveth For Ever And Ever

Every earthly king these elders might compare God to eventually died.

This king never will.

His rule has no beginning and will have no end.

Worship offered to Him is never wasted on someone who might fade away.

👑 Earthly kings always eventually died

♾️ God's rule has no end

🛡️ Worship here is never wasted

📖 He never fades the way kings do

## 🪑 The Four And Twenty Elders Fall Down

Earlier in this chapter these elders were seated on their own thrones.

Here they leave those seats completely and fall to the ground.

Sitting pictured honor they had already received.

Falling down pictures honor freely given back to someone greater.

Even an honored seat is not worth keeping above worship.

🪑 They had been seated on thrones

⬇️ Now they fall completely to the ground

🎁 Falling down gives honor back

📖 No seat outranks true worship

## 🏅 Cast Their Crowns Before The Throne

These are the same winner's crowns already described earlier in this chapter.

The elders do not simply wear them quietly in God's presence.

They physically remove them and lay them down in front of the throne.

Every achievement these elders ever earned gets handed back to the one who made it possible.

🏅 These are the same crowns from before

👐 The elders physically remove them

🎁 Every reward gets handed back

📖 Achievement belongs to the one behind it

## ⚖️ Thou Art Worthy, O Lord

"Worthy" means deserving, having an actual right to something.

These elders are not flattering God with empty words.

They are stating a simple fact about who He actually is.

No one else in this entire scene receives this word.

Worth like this belongs to God alone.

⚖️ Worthy means truly deserving something

🚫 This is not empty flattery

🎯 It states a simple fact

📖 Worth like this belongs to God alone

## 🌌 For Thou Hast Created All Things

This is the first reason the elders give for God's worth.

Everything that exists, visible or invisible, began with Him.

Nothing in this universe made itself or appeared by accident.

Worship here starts by remembering who actually made everything in the first place.

🌌 Creation is the first reason given

🛠️ Everything that exists began with Him

🚫 Nothing made itself by accident

📖 Worship starts by remembering the Maker

## 😊 For Thy Pleasure They Are And Were Created

"Pleasure" here means God's own will and delight, not human enjoyment.

Creation did not happen because God needed anything.

It happened because He wanted it to exist.

Every created thing, past and present, still exists for that same reason today.

The whole vision closes on that simple, settled truth.

😊 Pleasure means God's own will and delight

🙅 God did not need creation

🎨 He simply wanted it to exist

📖 Everything still exists for that reason
`.trim();

export const REVELATION_FOUR_PERSONAL_SECTIONS = parseRevelationFourRawNotes(REVELATION_FOUR_RAW_NOTES);
