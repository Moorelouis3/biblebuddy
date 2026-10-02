export type EzekielTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTenRawNotes(rawText: string): EzekielTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 10:${startVerse}` : `Ezekiel 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 10 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TEN_RAW_NOTES = `# Ezekiel 10:1-2
# 🔥 The Sapphire Throne And The Command To Scatter Fire
---
## 💎 The Appearance Of The Likeness Of A Throne

This is the same throne vision Ezekiel already described back in chapter one.

A sapphire stone is a deep blue gem, impossibly bright and precious.

The throne sits directly above the heads of the cherubim.

That detail confirms what chapter one only hinted at.

The living creatures from that first vision were always carrying God's throne.

💎 Sapphire stone means a deep blue gem

🪑 The throne sits above the cherubim

🔗 This links back to chapter one

📖 The creatures were always carrying God's throne

## ✋ Go In Between The Wheels, Even Under The Cherub

The man clothed with linen is the same figure introduced back in chapter nine.

God now sends him into the very center of this overwhelming vision.

The word cherub is singular here because it points to one specific being within the group.

Stepping among moving wheels and living creatures took real courage, even for someone obeying God directly.

✋ The man in linen appeared before

🎯 God sends him into the vision's center

🔎 Cherub here means one specific being

📖 Obeying God here took real courage

## 🔥 Fill Thine Hand With Coals Of Fire From Between The Cherubims

Coals of fire were burning embers taken directly from the heart of the vision.

Fire in this book almost always signals judgment, not comfort.

These coals are about to be thrown down upon Jerusalem itself.

This is the same city God warned repeatedly throughout the earlier chapters of this book.

🔥 Coals means burning embers from the vision

⚖️ Fire in Ezekiel usually signals judgment

🏙️ These coals are meant for Jerusalem

📖 The warnings are now becoming actions

## 🏙️ Scatter Them Over The City

Scattering burning coals over a city is a vivid picture of total destruction.

This fulfills the judgment the six men already carried out in chapter nine with their weapons.

That chapter showed people being struck down.

This chapter adds fire to the city itself.

Judgment here reaches both the people and the place they called home.

🔥 Scattering coals pictures total destruction

⚔️ Chapter nine already struck down the people

🏙️ This chapter adds fire to the city

📖 Judgment reaches both people and place

# Ezekiel 10:3-5
# ✨ The Glory Moves Toward The Threshold
---
## 🧭 The Cherubims Stood On The Right Side Of The House

The right side of the temple building was the south side, when facing the entrance.

Ezekiel notes exact positions throughout this vision, never vague directions.

That precision matters because this is a real building Ezekiel knew personally, not an abstract picture.

The vision is happening inside the actual temple in Jerusalem.

🧭 Right side here means the south side

📐 Ezekiel gives exact positions throughout

🏛️ This vision happens in the real temple

📖 Precision shows this is not abstract

## ☁️ The Cloud Filled The Inner Court

A cloud filling a holy space was already a familiar sign in Israel's history.

The same thing happened when the tabernacle and later Solomon's temple were first dedicated to God.

In those earlier moments, the cloud meant God had arrived to stay.

Here, the same cloud appears right as God is preparing to leave.

☁️ A filling cloud marked God's arrival before

🏛️ It happened at the tabernacle and temple

🔄 Here the same sign now means departure

📖 The same cloud can mark arrival or exit

## 🚪 The Glory Of The Lord Went Up From The Cherub, And Stood Over The Threshold

Chapter nine already said the glory lifted off the cherub.

Here that movement continues one more step closer to the door.

A threshold is the strip of floor right under a doorway, the very edge of leaving.

God's presence has not left the building yet, but it is no longer settled in its place.

This is a slow departure, not a sudden one.

✨ Chapter nine already showed this first step

🚪 Threshold means the floor under the doorway

🐢 This is a slow departure, not sudden

📖 God's presence is no longer settled

## ✨ The Court Was Full Of The Brightness Of The Lord's Glory

Even while leaving, God's presence still fills the space with overwhelming light.

Departure does not make God's glory any less real or any less powerful.

The brightness reaching the court shows how far this presence always extended beyond the inner chamber.

✨ Brightness fills the court even now

💪 Leaving does not shrink God's glory

📏 This presence always reached beyond one room

📖 Departure never means diminished glory

## 🔊 The Sound Of The Cherubims' Wings Was Heard Even To The Outer Court, As The Voice Of The Almighty God

Chapter one already compared this sound to the voice of the Almighty and the noise of great waters.

Here that same sound carries all the way to the outer court, far from where the cherubim stood.

The sheer volume shows the scale of what is happening inside the temple.

Something this loud could not be ignored by anyone nearby.

🔊 This sound was already compared to God's voice

📏 It reached the far outer court

😮 The volume shows the vision's scale

📖 Something this loud could not be ignored

# Ezekiel 10:6-8
# ✋ The Man In Linen Receives The Fire
---
## 🔁 Take Fire From Between The Wheels, From Between The Cherubims

God repeats the same command given back in verse two, almost word for word.

Repetition in this book usually marks something important enough to say twice.

The man clothed in linen now moves to actually carry out what he was told.

🔁 This repeats the command from verse two

📣 Repetition marks something important

✋ The man now acts on the command

📖 Obedience follows the second telling

## 🖐️ One Cherub Stretched Forth His Hand From Between The Cherubims Unto The Fire

This is not a lifeless statue reaching out.

The cherub is a living being, acting with its own hand and its own will.

Chapter one already described these creatures as full of motion, eyes, and spirit.

Here that same living detail becomes directly useful to the story.

🖐️ The cherub acts with its own hand

🫀 It is a living being, not a statue

👁️ Chapter one already showed its motion

📖 That living detail now matters directly

## 🔥 Put It Into The Hands Of Him That Was Clothed With Linen

The fire passes directly from a heavenly being into human hands.

This is the exact moment judgment moves from vision into action.

The man in linen now carries something that can actually scatter and burn.

🔥 Fire passes from heaven into human hands

➡️ Judgment moves from vision into action

✋ The man now holds something that can burn

📖 Vision has become a tool for judgment

## ✋ There Appeared In The Cherubims The Form Of A Man's Hand Under Their Wings

Chapter one already mentioned this exact detail, hands shaped like a man's under their wings.

At the time, it seemed like only a strange visual feature.

Now the reader sees exactly what those hands were for, grasping and passing fire.

A detail that once seemed decorative turns out to have a clear purpose.

✋ Chapter one already showed this detail

❓ It once seemed only decorative

🔥 Now it grasps and passes fire

📖 Hidden details often turn out purposeful

# Ezekiel 10:9-13
# 🔄 The Wheels Beside The Cherubim
---
## 🔗 The Four Wheels By The Cherubims, One Wheel By One Cherub

Each of the four cherubim has its own matching wheel beside it.

Chapter one described wheels moving beside the living creatures but never paired them this clearly, one to one.

That pairing confirms the wheels were never a separate machine.

They belong to the cherubim the same way a chariot wheel belongs to its chariot.

🔗 Each cherub has its own matching wheel

❓ Chapter one never paired them this clearly

🚫 The wheels were never a separate machine

📖 They belong to the cherubim directly

## 💎 The Appearance Of The Wheels Was As The Colour Of A Beryl Stone

Beryl is a pale green or blue gemstone, prized for how clear and bright it looks.

Chapter one already used this exact color and the same wheel within a wheel image.

Repeating the identical description on purpose ties this vision directly back to that first one.

Ezekiel wants the reader certain these are the same wheels, not a new and different sight.

💎 Beryl is a clear, bright gemstone

🔁 Chapter one already used this same image

🔗 The repeat ties both visions together

📖 These are the same wheels, not new ones

## 🧭 They Turned Not As They Went, But To The Place Whither The Head Looked They Followed It

These wheels never had to turn or steer in a different direction.

Wherever the living creature's face already looked, the wheel simply followed that way instead.

A normal wheel needs to turn to change direction.

These never did.

That kind of motion only makes sense for something far beyond anything Ezekiel had seen before.

🧭 The wheels never needed to turn

👁️ They followed wherever the face looked

🚫 Normal wheels must turn to change direction

📖 This motion was beyond anything ordinary

## 👁️ Full Of Eyes Round About, Even The Wheels That They Four Had

Eyes covering the wheels are not meant to be read as literal eyeballs stuck to metal.

They picture total awareness, nothing hidden and nothing missed.

A throne covered in eyes belongs to a God who sees everything, everywhere, all at once.

👁️ Eyes picture total awareness, not literal eyeballs

🙈 Nothing stays hidden from this throne

🌍 It sees everything, everywhere, at once

📖 Total awareness belongs to God alone

## ❓ It Was Cried Unto Them In My Hearing, O Wheel

This is one of the strangest lines in the whole vision.

Someone, or something, addresses the wheels directly, almost like calling out a name.

Many scholars believe it may simply be an exclamation of astonishment at what Ezekiel was seeing.

The Bible does not explain the moment further, and Ezekiel does not pretend to either.

❓ This line is genuinely strange

📣 Something addresses the wheels directly

🤷 It may be an exclamation of astonishment

📖 The text leaves this moment unexplained

# Ezekiel 10:14-17
# 👁️ Four Faces, One Living Creature
---
## 🐂 The First Face Was The Face Of A Cherub

Chapter one listed the first face as the face of an ox, not a cherub.

This chapter already calls the whole living creature a cherub by name.

Many scholars believe the cherub face just renames that same ox face, naming the creature as a whole.

The two descriptions are not contradicting each other.

They are looking at the same vision from two different angles.

🐂 Chapter one named this face an ox

🔎 This chapter calls it a cherub instead

🤝 Many scholars see these as the same face

📖 Both descriptions describe one same vision

## 🧑 The Second Face Was The Face Of A Man, And The Third The Face Of A Lion, And The Fourth The Face Of An Eagle

These three remaining faces match chapter one exactly, with no changes at all.

A man's face, a lion's face, and an eagle's face already carried their own meaning in that earlier vision.

Only the very first face changed its name here, from ox to cherub.

Everything else about these living beings stayed exactly the same.

🧑 The man's face matches chapter one

🦁 The lion's face matches chapter one

🦅 The eagle's face matches chapter one

📖 Only the first face's name changed here

## 🌊 This Is The Living Creature That I Saw By The River Of Chebar

Ezekiel directly tells the reader this is the exact same vision from chapter one.

The river Chebar was where his very first vision of God took place, in captivity in Babylon.

Naming that location again removes any doubt about what Ezekiel is seeing now.

🌊 Chebar was the site of his first vision

🔗 Ezekiel confirms this is the same vision

📍 Naming the place removes any doubt

📖 This connects both visions directly

## 🛫 When The Cherubims Lifted Up Their Wings To Mount Up From The Earth, The Same Wheels Also Turned Not From Beside Them

The wheels never fall behind or separate from the cherubim, even in flight.

Whatever lifts the cherubim off the ground lifts the wheels along with them.

This single moving structure never breaks apart into separate pieces.

🛫 The wheels rise together with the cherubim

🔗 Nothing ever separates from this structure

🧩 It moves as one single unit

📖 Nothing about this throne comes apart

## 🔗 The Spirit Of The Living Creature Was In Them

The wheels are not independently alive on their own.

They move only because the same spirit inside the living creatures reaches into them too.

Chapter one already described this same detail, spirit controlling every part of the vision at once.

One spirit animates every piece, down to the wheels themselves.

🚫 The wheels are not independently alive

🔗 One spirit reaches into every part

🔁 Chapter one already described this detail

📖 One spirit moves the whole structure

# Ezekiel 10:18-22
# 🚪 The Glory Departs Toward The East Gate
---
## 🔼 The Glory Of The Lord Departed From Off The Threshold Of The House, And Stood Over The Cherubims

This is the third step in a slow departure that started back in chapter nine.

First the glory rose from the cherub inside the Most Holy Place.

Then it moved to the threshold, the edge of the door.

Now it moves again, settling directly over the cherubim themselves.

Each step brings God's presence closer to actually leaving the building.

✨ This is the third step of departure

🚪 The glory already reached the threshold

🔼 Now it rests over the cherubim

📖 Each step moves closer to leaving

## 🌅 Every One Stood At The Door Of The East Gate Of The Lord's House

The east gate faced the rising sun, the most honored direction in the ancient world.

Later in this book, that same east gate becomes the exact place God's glory finally returns.

For now, the glory is heading out through it, not in.

The direction itself carries weight far beyond simple geography.

🌅 East faced the sun, a place of honor

🔁 This same gate later welcomes God's glory back

🚪 For now, the glory is heading out

📖 Direction here carries real theological weight

## ⏸️ And The Glory Of The God Of Israel Was Over Them Above

God's presence has still not actually left the temple grounds.

It hovers above the cherubim, paused at the very edge of departure.

This pause gives the next chapter room to finish what this one started.

Judgment often moves slower than people expect, even when it is certain.

⏸️ God's presence has not fully left yet

🔼 It hovers just above the cherubim

⏳ The next chapter finishes this departure

📖 Certain judgment can still move slowly

## 🧠 And I Knew That They Were The Cherubims

Ezekiel says plainly that he now knew these beings were cherubim.

That wording suggests he did not fully understand what he saw the first time, back in chapter one.

Sometimes a clearer picture only comes after watching the same vision again.

Ezekiel is not correcting himself.

He is finally naming what he always saw.

🧠 Ezekiel now understood what he once saw

❓ He may not have grasped it fully before

🔁 A second look often brings more clarity

📖 He is naming, not correcting, his first vision

## 🎯 They Went Every One Straight Forward

This closing line repeats something chapter one already said about these living beings.

They never wander, hesitate, or move off course.

That total certainty stands in sharp contrast to Jerusalem, the city they are leaving.

The temple below was filled with confusion, idolatry, and divided loyalty.

God's own throne, by contrast, never once doubts where it is going.

🎯 They moved with total certainty always

🏙️ Jerusalem below was full of confusion

⚖️ The throne never shared that confusion

📖 God's throne always knows where it is going
`.trim();

export const EZEKIEL_TEN_PERSONAL_SECTIONS = parseEzekielTenRawNotes(EZEKIEL_TEN_RAW_NOTES);
