export type EzekielOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielOneRawNotes(rawText: string): EzekielOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 1:${startVerse}` : `Ezekiel 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 1 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_ONE_RAW_NOTES = `# Ezekiel 1:1-3
# 🌊 A Priest Beside A Foreign River
---
## 📜 In The Thirtieth Year

The thirtieth year most likely counts Ezekiel's own age.

Priests normally began their temple service at age thirty.

Ezekiel turns thirty as a captive in Babylon instead.

The year he expected to start priestly work never comes.

Instead that year becomes the start of his work as a prophet.

📜 Thirty marked a priest's first year of service

🏛️ Ezekiel is in Babylon, not the temple

🔄 His priestly calling turns into a prophetic one

📖 God still called him far from home

## 🌊 By The River Of Chebar

Chebar was not a natural river.

It was a large canal carrying water from the Euphrates.

Babylon had resettled many Judean exiles in towns along it.

God did not wait for a temple or a holy place to speak.

He met Ezekiel beside an ordinary irrigation canal instead.

🌊 Chebar was a manmade canal, not a river

🏘️ Judean exiles were settled along it

🚫 No temple or holy site was needed

📖 God spoke beside an ordinary canal

## ⛓️ Among The Captives

The captives were Judeans taken from Jerusalem years earlier.

Babylon deported much of Judah's upper class in two major waves.

Ezekiel was part of the earlier deportation under King Jehoiachin.

He writes from inside that same exile, not from a safe distance.

⛓️ Captives were Judeans taken from Jerusalem

🏛️ Babylon deported Judah's upper class

👑 Ezekiel left with King Jehoiachin's group

📖 He writes from inside the exile

## ☁️ The Heavens Were Opened

This does not mean the sky physically tore open above him.

The phrase describes a sudden, supernatural unveiling of things normally hidden.

Isaiah and later John use the same picture for their own visions.

What follows is not a weather event.

It is God pulling back the curtain on the unseen world.

☁️ Heavens opened means a vision began

🚫 Not a literal tear in the sky

👁️ Isaiah and John saw visions the same way

📖 God pulled back the curtain on the unseen

## 👑 The Fifth Year Of King Jehoiachin's Captivity

Judah had no king of its own left on the throne.

So Ezekiel dates the vision by the exile of its last recognized king.

Jehoiachin was taken captive in the same deportation as Ezekiel.

This places the vision five years into that exile.

Historians place this moment at about 593 BC.

📅 No Judean king remained to date by

👑 Jehoiachin's exile set the new calendar

⏳ Five years had passed in captivity

📖 God's timeline did not depend on a throne

## 🏛️ Ezekiel The Priest, The Son Of Buzi

Ezekiel was born into a priestly family, not chosen into one.

His father Buzi is never mentioned again in scripture.

Naming him here simply confirms Ezekiel's priestly bloodline.

That bloodline makes his exile from the temple even more significant.

👨‍👦 Buzi is named only this one time

🏛️ Priesthood passed down through family line

⛓️ Ezekiel's bloodline makes exile heavier

📖 A priest with no temple to serve

## 🏺 The Land Of The Chaldeans

Chaldeans is another name for the Babylonians.

It originally named one tribal group that came to rule Babylon.

By Ezekiel's time the two names were used for the same empire.

This is the empire that will soon destroy Jerusalem itself.

🏺 Chaldeans and Babylonians name the same empire

👑 A tribe's name became an empire's name

🔥 Jerusalem's destroyer, named here in passing

📖 Ezekiel already lives inside that danger

## ✋ The Hand Of The LORD Was There Upon Him

This phrase does not describe a physical touch.

It describes being overwhelmed and taken over by God's power.

The phrase returns again and again throughout the book of Ezekiel.

Each time it marks the start of another overwhelming vision.

✋ Hand of the Lord means divine power

🚫 Not a literal physical touch

🔁 It returns again and again in Ezekiel

📖 It marks the start of a vision

# Ezekiel 1:4-8
# 🌪️ A Storm From The North
---
## 🌬️ Out Of The North

Storms rolling toward Judah often appeared to come from the north.

The Bible sometimes links the north with the mightiest invading armies.

Some ancient peoples also pictured their gods living in the north.

A vision beginning in the north already feels like a warning.

🌬️ Storms were pictured coming from the north

⚔️ The north often meant invading armies

🏔️ Some pictured their gods living there

📖 This beginning already feels like a warning

## 🔥 A Fire Infolding Itself

Infolding itself means the fire kept curling back into its own flame.

It was not a simple fire burning in one direction.

The flame constantly folded over itself like something alive.

This restless, self feeding fire signals something beyond nature.

🔥 Infolding means the fire folded on itself

🌀 Not an ordinary, steady flame

♻️ The fire kept feeding back into itself

📖 A fire that behaves beyond nature

## 🟡 The Colour Of Amber

Amber here does not mean fossilized tree resin.

The word describes a bright, glowing metal.

Many scholars believe it was something like glowing bronze or electrum.

The image is of light shining out from inside the fire.

🟡 Amber here means glowing metal

🚫 Not fossilized tree resin

✨ Possibly glowing bronze or electrum

📖 Light shines from inside the fire

## 👁️ The Likeness Of Four Living Creatures

Likeness means resemblance, not an exact, definable shape.

Ezekiel keeps reaching for comparisons because the real thing defies description.

These four creatures are later named cherubim in Ezekiel ten.

For now they simply appear, without any explanation of what they are.

👁️ Likeness means resemblance, not exact shape

🗣️ Ezekiel strains for the right comparison

👼 Later identified as cherubim in chapter ten

📖 Something here resists ordinary description

## 👀 Every One Had Four Faces, And Four Wings

Four faces meant these creatures could see in every direction at once.

Nothing could approach them from a blind side.

Four wings meant they were built for sudden, swift movement.

Together the faces and wings describe beings always alert and always ready.

👀 Four faces meant no blind side

🚀 Four wings meant instant movement

🛡️ Always alert, always ready

📖 Nothing could surprise these creatures

## 🦵 Their Feet Were Straight Feet

Straight feet means legs that did not bend like human knees.

They moved without ever turning around.

The sole was like the sole of a calf's foot, a split hoof.

These were not feet built for walking slowly through a room.

🦵 Straight feet means legs without knees

🐂 Soles were like a calf's hooves

🚫 Not built for slow, careful steps

📖 Built for sudden, direct motion

## ✨ Sparkled Like The Colour Of Burnished Brass

Burnished brass means bronze that has been polished until it shines.

Light would catch these feet and throw it back like a mirror.

Nothing about these creatures was dull or ordinary.

Glory here is visible, not hidden away.

✨ Burnished brass means polished, shining bronze

🪞 Light bounced off them like a mirror

🚫 Nothing dull or ordinary here

📖 Glory here is visible, not hidden

## ✋ The Hands Of A Man Under Their Wings

Wings alone would only explain how these creatures moved.

Hands explain that they were also able to act and do work.

A hand is a tool for grasping, building, and carrying a task through.

These creatures were built with purpose, not only with motion.

✋ Hands meant the ability to act

🛠️ A hand is a tool for work

🚫 Not only movement, also purpose

➡️ Power here always comes with purpose

# Ezekiel 1:9-14
# 🦅 Four Faces, One Spirit
---
## 🤝 Their Wings Were Joined One To Another

The wing of one creature touched the wing of the next.

Together they formed one connected, moving formation.

None of them acted alone or separately from the others.

This pictures total unity in how they carried out God's will.

🤝 Wings touched wing to wing

🧩 They formed one connected formation

🚫 None acted alone

📖 Total unity carried out God's will

## 🧭 They Turned Not When They Went

These creatures never needed to pivot or turn around.

Facing every direction already, they simply moved toward wherever they were sent.

There is no hesitation and no doubling back in this vision.

Obedience here looks like instant, direct motion.

🧭 No turning or pivoting needed

➡️ They moved straight toward their goal

🚫 No hesitation, no doubling back

📖 Obedience looked like instant motion

## 🦁 The Face Of A Man, And The Face Of A Lion

Each creature had all four faces at once, not just one each.

A man represents the height of intelligence and reason among creation.

A lion represents the greatest of wild animals.

An ox represents the greatest of working, domestic animals.

An eagle represents the greatest of birds in the sky.

Together the four faces picture the highest point of every kind of life.

🧑 Man represents the height of reason

🦁 Lion represents the greatest wild animal

🐂 Ox and eagle add tame animals and sky

📖 Together: the highest form of all creation

## 🙈 Two Covered Their Bodies

Two wings stayed lifted, joined to the wings beside them.

The other two wings covered the creature's own body.

Isaiah's seraphim cover themselves the same way in God's presence.

Even these powerful beings show a kind of reverence here.

🪽 Two wings stayed lifted and joined

🙈 Two wings covered their own bodies

👼 Isaiah's seraphim do the same thing

📖 Even powerful beings show reverence

## 🕊️ Whither The Spirit Was To Go, They Went

The spirit here is not a spirit belonging to the creatures themselves.

It points to God's own will directing their movement.

They did not choose a direction and then go.

They moved only where that will sent them.

🕊️ The spirit points to God's own will

🚫 Not a will of their own

➡️ They moved only where sent

📖 Obedience without independent direction

## 🔥 Like Burning Coals Of Fire

The space between the creatures looked like a bed of glowing coals.

It also looked like burning lamps moving among them.

The fire moved up and down, never staying still.

Motion and fire together build a picture of restless, living energy.

🔥 The space between them glowed like coals

🪔 It also looked like moving lamps

🔄 The fire never stayed still

📖 Restless energy fills this whole scene

## ⚡ Out Of The Fire Went Forth Lightning

Lightning here is not a passing detail.

It shows this fire had real, visible power breaking out of it.

The same fire that glowed quietly could suddenly flash and strike.

Power and brightness were never far apart in this vision.

⚡ Lightning showed real power in the fire

🔥 Quiet glow could suddenly flash

💥 Power and brightness stayed close together

📖 This fire was never fully calm

## 💨 Ran And Returned As The Appearance Of A Flash Of Lightning

These creatures moved faster than the eye could follow.

They would dart forward and snap back like a single flash.

There was no slow walking or gradual approach in this vision.

Everything about them moved at the speed of lightning itself.

💨 Faster than the eye could follow

🔁 Forward and back like one flash

🚫 No slow walking here

📖 Everything moved at lightning speed

# Ezekiel 1:15-21
# ⚙️ Wheels Within Wheels
---
## ⚙️ One Wheel Upon The Earth By The Living Creatures

A wheel is the last thing Ezekiel expects inside a vision full of living creatures.

Each creature has its own wheel resting on the ground beside it.

The wheel touches earth while the creatures themselves can fly.

Heaven and earth are connected in this single image.

⚙️ A wheel appears beside each creature

🌍 The wheel touches the ground

🕊️ The creatures themselves can fly

📖 Heaven and earth connect here

## 💎 The Colour Of A Beryl

Beryl is a precious stone, often pale green, blue, or gold in color.

It would have caught and reflected light the way a gem does.

Even the wheels in this vision shine like jewelry.

Nothing in this scene is plain or ordinary.

💎 Beryl is a shining precious stone

✨ It reflects light like a gem

🚫 Nothing here looks plain

📖 Even the wheels shine like jewels

## 🔄 A Wheel In The Middle Of A Wheel

This describes two wheels set at an angle inside each other.

Together they could move forward, sideways, or any direction at once.

A normal cart wheel can only roll the way it is facing.

These wheels never needed to turn to change direction.

⚙️ Two wheels crossed inside one another

🔄 They could move in any direction

🚫 No turning needed to change course

📖 Built to move freely, without limits

## 😳 Their Rings Were So High That They Were Dreadful

Rings here means the tall rims that circled each wheel.

Dreadful in this verse means awe inspiring, not simply scary.

Their height alone was enough to make Ezekiel feel small.

This is a vision built to overwhelm, not to comfort.

⭕ Rings means the tall wheel rims

😳 Dreadful means awe inspiring here

📏 Their height alone overwhelmed Ezekiel

📖 This vision was built to overwhelm

## 👁️ Full Of Eyes Round About Them Four

The rims of the wheels were covered in eyes on every side.

Eyes everywhere suggest total awareness, nothing hidden and nothing missed.

Even the parts of the vision that looked mechanical were alive with sight.

Nothing in God's throne room misses anything.

👁️ Eyes covered the rims on every side

🧠 Eyes everywhere means total awareness

⚙️ Even the wheels seemed alive

📖 Nothing near God's throne misses anything

## 🔼 Lifted Up From The Earth, The Wheels Were Lifted Up

The wheels did not move the creatures.

The creatures and wheels rose together, at the same moment.

Nothing here works the way machines normally work.

The connection between them is something deeper than mechanics.

🔼 Creatures and wheels rose together

⚙️ Wheels did not drive the motion

🚫 Not an ordinary machine

📖 A connection deeper than mechanics

## 🎯 The Spirit Of The Living Creature Was In The Wheels

The same spirit guiding the creatures also moved the wheels.

One single will controlled every part of this vision at once.

Nothing in the scene acted on its own power.

One purpose ran through creatures, wings, and wheels alike.

🕊️ One spirit moved creatures and wheels

🎯 One will controlled everything at once

🚫 Nothing acted on its own power

📖 One purpose ran through the whole vision

# Ezekiel 1:22-25
# 🔷 A Crystal Sky Above Them
---
## 🔷 The Terrible Crystal

Firmament is an old word for an expanse stretched out overhead.

Genesis one uses the same word for the sky that separates the waters.

Terrible here means awe inspiring, not frightening in the modern sense.

This platform shines like ice or crystal above the creatures' heads.

🔷 Firmament means a stretched out platform

🌌 The same word appears in Genesis one

😳 Terrible here means awe inspiring

📖 It shines like crystal above them

## 🪽 Under The Firmament Were Their Wings Straight

The wings beneath the platform stayed extended, not folded away.

Every creature still had two wings covering its own body.

Support and modesty appear together in the same posture.

Even holding up something massive, reverence is not dropped.

🪽 Wings stayed extended beneath the platform

🙈 Two wings still covered their bodies

🙏 Reverence continued even under pressure

📖 Strength and humility together

## 🌊 The Noise Of Great Waters, As The Voice Of The Almighty

Their wings made a sound Ezekiel compares to a roaring flood.

He also compares it to the voice of the Almighty himself.

No single sound in ordinary life was loud enough to describe it.

Ezekiel reaches for the two loudest sounds he knows and still falls short.

🌊 Wings sounded like a roaring flood

🗣️ Also compared to the Almighty's voice

📢 No ordinary sound was loud enough

📖 Human words still fall short here

## ⏸️ When They Stood, They Let Down Their Wings

Constant motion finally comes to a pause in this verse.

Stillness here is not weakness, only a change of posture.

A voice comes from above the platform the moment they stop.

Even silence in this vision is leading somewhere.

⏸️ Motion finally pauses here

🧍 Stillness is not weakness

🗣️ A voice comes the moment they stop

📖 Even silence leads somewhere

# Ezekiel 1:26-28
# 👑 The Glory Of The Lord
---
## 💎 The Likeness Of A Throne, As The Appearance Of A Sapphire Stone

Sapphire was one of the most valuable blue stones known in the ancient world.

A throne made to look like sapphire pictures royalty and extreme worth.

The storm, the creatures, and the wheels were never the main event.

They all exist only to support a throne above them.

💎 Sapphire was among the most valuable stones

👑 The throne pictures royalty and worth

⚙️ Creatures and wheels support this throne

📖 Everything in the vision leads here

## 🧑 The Appearance Of A Man Above Upon It

This does not mean God has an ordinary human body.

Ezekiel reaches for the closest comparison language allows.

A human shape is the nearest thing Ezekiel can compare this glory to.

The vision still stays just out of reach of plain description.

🙅 Not a claim that God has a body

🧑 A human shape was the closest comparison

🗣️ Language still falls short here

📖 Some things resist plain description

## 🔥 From The Appearance Of His Loins Even Upward And Downward

Ezekiel splits this description in half, upward and downward from the waist.

Above the waist, the glow looks like the amber already seen in verse four.

Below the waist, it looks like pure, surrounding fire.

Even this careful split cannot fully capture what Ezekiel is looking at.

📏 Described from the waist up and down

🟡 Upward looked like the earlier amber

🔥 Downward looked like surrounding fire

📖 Even a careful split falls short

## 🌈 The Bow That Is In The Cloud In The Day Of Rain

The bow in the cloud is a rainbow.

The same sign appears after the flood as God's promise to Noah.

Judgment and mercy sit side by side in this one image.

Even in an overwhelming vision, God's covenant promise is still visible.

🌈 The bow in the cloud is a rainbow

🕊️ The same sign followed Noah's flood

⚖️ Judgment and mercy appear together

📖 God's promise is still visible here

## ✨ The Likeness Of The Glory Of The LORD

Every image in this chapter was only ever a likeness, never the thing itself.

Storm, creatures, wheels, and throne were all pointing beyond themselves.

They were pointing to a glory words cannot fully hold.

Ezekiel does not stand and admire it.

He falls on his face the moment he understands what he is seeing.

✨ Every image was only a likeness

👉 All of it pointed beyond itself

🙇 Ezekiel falls on his face

📖 Words could not fully hold this glory`.trim();

export const EZEKIEL_ONE_PERSONAL_SECTIONS = parseEzekielOneRawNotes(EZEKIEL_ONE_RAW_NOTES);
