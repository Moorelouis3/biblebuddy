export type LamentationsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLamentationsTwoRawNotes(rawText: string): LamentationsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LamentationsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Lamentations\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Lamentations 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Lamentations\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Lamentations\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Lamentations 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Lamentations 2:${startVerse}` : `Lamentations 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Lamentations 2 sections, received " + sections.length);
  }

  return sections;
}

const LAMENTATIONS_TWO_RAW_NOTES = `# Lamentations 2:1-3
# 😢 Covered The Daughter Of Zion With A Cloud
---
## 😢 Covered The Daughter Of Zion With A Cloud

A cloud here pictures anger blocking something, not weather.

"Daughter of Zion" names Jerusalem and her people together.

Thick cloud cover once marked God's presence at the temple.

Here the same picture marks God's anger instead of His presence.

The cloud that once meant nearness now means distance.

🌥️ Cloud here means blocking, not weather

👑 Daughter of Zion names Jerusalem's people

🏛️ Cloud once marked God's presence

📖 Now the cloud marks His anger

---
## 🦶 Remembered Not His Footstool

Footstool here pictures the ark of the covenant in the temple.

Ancient kings rested their feet on a stool before the throne.

The ark served that same role under God's unseen throne.

Losing it meant losing the one visible sign of His presence.

Even that sacred sign, God allowed the enemy to destroy.

🦶 Footstool pictures the ark of the covenant

👑 Kings once rested their feet before a throne

🕍 The ark held that same role for God

📖 Even that sacred sign was allowed to fall

---
## 🌊 Swallowed Up All The Habitations Of Jacob

Swallowed up pictures total destruction, nothing left standing.

Habitations simply means homes and dwelling places.

Jacob here names the whole nation descended from him.

Every home across the land shared in this same ruin.

No corner of ordinary life escaped this judgment.

🌊 Swallowed up means total destruction

🏠 Habitations simply means ordinary homes

👪 Jacob names the whole nation

📖 No home escaped this judgment

---
## 🕯️ Polluted The Kingdom And The Princes Thereof

Polluted here means defiled and stripped of what made it sacred.

The kingdom was meant to be set apart under God's covenant.

Princes names the ruling family, not simply important men.

Even the throne itself did not escape this disgrace.

What was once holy was now treated as common.

🕯️ Polluted means defiled and stripped bare

👑 The kingdom was meant to stay sacred

🤴 Princes names the ruling family itself

📖 Even the throne did not escape disgrace

---
## 🐂 Cut Off All The Horn Of Israel

A horn pictures strength, the way an ox fights with its horns.

Horn of Israel means the nation's power and pride.

Cutting it off pictures that strength stripped completely away.

A nation that once gored its enemies could no longer fight back.

The same image will return before this poem ends.

🐂 A horn pictures strength like an ox

💪 Horn of Israel means the nation's power

✂️ Cutting it off means stripping that strength

📖 Israel could no longer fight back

---
## ✋ Drawn Back His Right Hand From Before The Enemy

God's right hand pictures His power to protect and fight for His people.

Here God pulls that same hand back and refuses to defend them.

The enemy succeeds only because God allowed it this time.

This was not a weaker God, but a God choosing to step back.

✋ God's right hand pictures His power

🛡️ Here He pulls that hand back

⚔️ The enemy succeeds only by God's choice

📖 This was God stepping back, not losing power

# Lamentations 2:4-6
# 🏹 Bent His Bow Like An Enemy
---
## 🏹 Bent His Bow Like An Enemy

This does not describe an actual enemy army first.

It describes God Himself acting the way an attacker would.

A bow bent and aimed pictures a deliberate, targeted strike.

Judah's true enemy in this verse is the LORD, not Babylon alone.

🏹 God Himself acts like an attacker here

🎯 A bent bow pictures a deliberate strike

⚔️ Babylon is not named as the true force

📖 The LORD stands behind this judgment

---
## 👁️ Slew All That Were Pleasant To The Eye

Pleasant to the eye means the young and attractive of the city.

Tabernacle here points to the temple, the most sacred ground in Jerusalem.

Killing them there made the loss both personal and deeply sacred.

Even the safest place in the city offered no shelter.

👁️ Pleasant to the eye names the young

🕍 Tabernacle here means the temple itself

💔 Death reached even the most sacred ground

📖 No place in the city offered shelter

---
## 🎯 The LORD Was As An Enemy

This line says plainly what the chapter has been showing all along.

God did not merely allow the disaster, He became the force behind it.

Swallowing up Israel's palaces pictures total, deliberate destruction.

Lamentations never lets the reader soften this into bad luck.

🎯 This line states the truth plainly

🏰 God became the force behind the ruin

💥 Swallowing palaces pictures total destruction

📖 This was never simple bad luck

---
## ⛺ As If It Were Of A Garden

A garden booth was a temporary shelter, not a permanent building.

Comparing the temple to that flimsy structure pictures how easily it fell.

Something meant to last forever was torn down like a garden hut.

The comparison makes the loss feel even more sudden and cheap.

⛺ A garden booth was flimsy and temporary

🏚️ The temple is compared to that same structure

💨 Something meant to last fell with ease

📖 The loss felt sudden and cheap

---
## 🎉 Caused The Solemn Feasts And Sabbaths To Be Forgotten

Solemn feasts were Israel's yearly festivals like Passover and Tabernacles.

Sabbaths were the weekly day set apart for rest and worship.

Without the temple standing, both patterns simply stopped happening.

Losing the rhythm of worship was its own kind of grief.

🎉 Solemn feasts were Israel's yearly festivals

🗓️ Sabbaths were the weekly rest day

🛑 Both patterns simply stopped happening

📖 Losing that rhythm was its own grief

---
## 👑 The King And The Priest

These were Judah's two most protected offices.

The king ruled the nation, the priest served at the temple.

Even they were not shielded from this judgment.

No position in Judah stood above this disaster.

👑 The king ruled over the nation

🙏 The priest served at the temple

🚫 Neither office was shielded here

📖 No position stood above this disaster

# Lamentations 2:7-9
# 🔥 Cast Off His Altar
---
## 🔥 Cast Off His Altar

Cast off means God Himself rejected His own altar.

The altar was the center of all temple worship and sacrifice.

God turning against His own altar is the harshest image so far.

This was not an enemy's crime alone, it was God's own verdict.

🔥 Cast off means God rejected the altar

🕍 The altar was the center of worship

⚖️ God Himself delivered this harsh verdict

📖 This judgment came from God, not only Babylon

---
## 🤢 Abhorred His Sanctuary

Abhorred means God treated the sanctuary as something detestable.

The sanctuary was the most sacred space in the whole nation.

Reading this as God's own reaction makes the loss sharper still.

The very place built to hold His presence, He now despised.

🤢 Abhorred means treated as detestable

🏛️ The sanctuary was the most sacred space

💔 God Himself despised His own temple

📖 This loss cuts sharper than any other

---
## 📢 As In The Day Of A Solemn Feast

Solemn feast normally named Israel's joyful festival days.

Here the phrase describes the noise enemies made inside the temple.

A word tied to worship is turned into a word for violence.

Even familiar language carries a bitter new meaning in this poem.

🎉 Solemn feast once meant a joyful day

📢 Here it describes the enemy's noise

🔄 A worship word is turned to violence

📖 Familiar words now carry bitter meaning

---
## 📏 Stretched Out A Line

A measuring line was normally a builder's tool for construction.

Here God uses it to destroy on purpose, not to build.

Stretching it out pictures a planned act, not a stray disaster.

Even the tools of building became tools of judgment.

📏 A line was normally a builder's tool

🔨 Here it was used to destroy

🎯 This destruction was planned, not random

📖 Building tools became tools of judgment

---
## 🚪 Her Gates Are Sunk Into The Ground

Gates were the city's center for business and daily life.

Sunk into the ground pictures total collapse, not simple damage.

A gate that no longer stands cannot be entered or defended.

The city's main entrance had become a pile of rubble.

🚪 Gates were centers of daily city life

🏚️ Sunk means total collapse, not damage

🛑 A fallen gate cannot be defended

📖 The entrance had become a ruin

---
## 📜 Her Prophets Find No Vision

Vision here means a message God gave a prophet to speak.

Losing the law meant Israel's teachers had nothing left to teach.

Losing prophetic vision meant God had stopped speaking for now.

Both of Israel's main sources of guidance went silent at once.

📜 Vision means a message from God

📚 Losing the law silenced Israel's teachers

🤐 Losing vision meant God stopped speaking

📖 Both sources of guidance fell silent together

# Lamentations 2:10-12
# 😭 The Elders Sit Upon The Ground And Keep Silence
---
## 😭 The Elders Sit Upon The Ground And Keep Silence

Sitting on the ground was a physical act of mourning.

Keeping silence meant the elders had nothing left to say.

Elders normally led decisions and spoke with authority in the city.

Here the city's wisest voices had gone completely quiet.

🪑 Sitting on the ground showed mourning

🤐 Silence meant nothing left to say

🧓 Elders normally led with authority

📖 The wisest voices had gone quiet

---
## 👘 Girded Themselves With Sackcloth

Dust on the head pictured a person brought low, like dirt itself.

Sackcloth was rough, uncomfortable material worn only during deep grief.

Both actions made inner pain visible on the outside for everyone.

Grief this size could not stay hidden or private.

🌫️ Dust on the head pictured being brought low

👘 Sackcloth was rough cloth worn in grief

👀 These actions made pain visible outwardly

📖 This grief could not stay hidden

---
## 👧 The Virgins Of Jerusalem Hang Down Their Heads

Virgins here names the city's young unmarried women.

Hanging the head down pictures shame and deep sorrow together.

Even those with their whole lives still ahead shared this grief.

No age group in Jerusalem escaped this disaster.

👧 Virgins names the city's young women

😔 Hanging heads pictured shame and sorrow

🌱 Even the youngest shared this grief

📖 No age group was spared here

---
## 🫀 Mine Eyes Do Fail With Tears

Ancient Hebrew often located deep emotion in the body's core.

Eyes failing with tears means crying until there is nothing left.

Bowels troubled describes overwhelming inner anguish, not a digestive complaint.

This language makes grief feel as real as any physical wound.

🫀 Hebrew located emotion deep in the body

😭 Eyes failing means crying until exhausted

🚫 This is not a literal digestive complaint

📖 Grief here feels as real as injury

---
## 🍼 The Children And The Sucklings Swoon In The Streets

Sucklings means infants still nursing at their mother's breast.

Swoon here means collapsing from hunger, not simply feeling faint.

This was happening in public streets, not hidden away.

Famine reached the most helpless people in the city first.

🍼 Sucklings means infants still nursing

😵 Swoon means collapsing from hunger

🛣️ This happened openly in the streets

📖 Famine struck the most helpless first

---
## 🌾 Where Is Corn And Wine

Corn and wine simply named basic food and drink.

Children were asking their mothers for food that no longer existed.

A child's simple question becomes one of the chapter's saddest lines.

Innocence makes this particular grief harder to read than the rest.

🌾 Corn and wine meant basic food

🍽️ Children asked for food that was gone

😢 A child's question became deeply painful

📖 Innocence makes this grief harder to read

---
## 🤱 Poured Out Into Their Mothers' Bosom

This pictures children dying in their mother's arms.

Bosom here simply means the chest, held close in comfort.

Even that small comfort could not stop the dying.

The image closes this section on its most painful note.

🤱 This pictures dying in a mother's arms

💔 Bosom here means the chest held close

🚫 Comfort alone could not stop the dying

📖 This closes the section on deep pain

# Lamentations 2:13-15
# ❓ What Thing Shall I Take To Witness For Thee
---
## ❓ What Thing Shall I Take To Witness For Thee

This question admits that no comparison feels strong enough.

Witness here means something comparable, a measure to hold the pain against.

The poet searches for a parallel and comes up empty.

Some grief resists being measured against anything else at all.

❓ This question admits no comparison fits

⚖️ Witness means a measure to compare against

🔍 The poet searches and finds nothing

📖 Some grief resists being measured at all

---
## 🌊 Thy Breach Is Great Like The Sea

Breach here pictures a wound or a broken wall, not a crack.

Comparing it to the sea makes the wound feel endless.

A sea has no visible edge or bottom to reach.

Some pain truly does feel that wide and that deep.

🌊 Breach pictures a wound or broken wall

♾️ The sea gives the wound no edge

📏 Some pain truly feels that vast

📖 Healing feels as distant as crossing the sea

---
## 🗣️ Thy Prophets Have Seen Vain And Foolish Things

Vain and foolish things means messages that were simply false.

These prophets claimed to speak for God but did not.

Their job was to warn the people before disaster struck.

Instead they offered comfort that had no truth behind it.

🗣️ Vain and foolish means simply false

🎭 These prophets claimed to speak for God

⚠️ Their job was to warn in time

📖 They offered comfort with no truth behind it

---
## 📦 Seen For Thee False Burdens

Burden was the technical word used for a prophet's message.

A true burden carried a real word from the LORD.

A false burden only sounded like one.

Believing the wrong burden helped lead the nation into this disaster.

📦 Burden was the word for a prophecy

✅ A true burden carried God's real word

❌ A false burden only sounded like one

📖 Believing false burdens helped cause this disaster

---
## 👏 All That Pass By Clap Their Hands At Thee

Clapping hands here was a gesture of mockery, not applause.

Hissing and wagging the head were insults aimed at someone defeated.

Strangers passing by felt free to openly ridicule the ruined city.

Public shame added a fresh wound on top of the destruction.

👏 Clapping here meant mockery, not applause

😠 Hissing and wagging the head were insults

🚶 Strangers felt free to ridicule openly

📖 Public shame added a fresh wound

---
## 👑 The Perfection Of Beauty

This title once described Jerusalem's reputation among every nearby nation.

People used to travel there just to see the city.

Mockers now repeat that same title with bitter sarcasm.

Past praise is used here as the sharpest possible insult.

👑 This once named Jerusalem's famous reputation

🧳 Travelers once came just to see it

😏 Mockers repeat the title with sarcasm

📖 Past praise now cuts as a fresh insult

# Lamentations 2:16-17
# 👄 All Thine Enemies Have Opened Their Mouth Against Thee
---
## 👄 All Thine Enemies Have Opened Their Mouth Against Thee

Opening the mouth here pictures a predator ready to attack.

Hissing and gnashing teeth are both images borrowed from animals.

The enemies are pictured less as soldiers and more as beasts.

Describing them this way shows how total the cruelty felt.

👄 Open mouth pictures a predator attacking

🐺 Hissing and gnashing borrow animal images

⚔️ Enemies are pictured as beasts, not soldiers

📖 This shows how total the cruelty felt

---
## ⏳ This Is The Day That We Looked For

Enemies had waited a long time for this exact moment.

Finding and seeing it confirms their long awaited revenge.

Their joy makes Judah's loss feel even more bitter.

Patience in hatred is still hatred, fully satisfied here.

⏳ Enemies waited a long time for this

🎯 Finding it confirmed their long revenge

💔 Their joy made the loss more bitter

📖 Patient hatred is still hatred fulfilled

---
## 📜 Fulfilled His Word That He Had Commanded In The Days Of Old

This disaster did not come out of nowhere.

Prophets had warned about this exact kind of judgment for generations.

God is shown keeping His word, even the hard parts of it.

What looks sudden here was actually promised long in advance.

📜 This was not a sudden, random event

📢 Prophets had warned of this for generations

⚖️ God kept His word, even the hard parts

📖 What looked sudden was promised long ago

---
## 🐂 Set Up The Horn Of Thine Adversaries

Horn again pictures strength and power, the same image from before.

Here it is the enemy's horn that gets lifted up high.

The very symbol once used for Israel's strength now belongs to Babylon.

Power in this chapter moves from one side to the other completely.

🐂 Horn again pictures strength and power

⬆️ Here the enemy's horn is lifted up

🔄 This symbol shifted from Israel to Babylon

📖 Power moved completely to the other side

# Lamentations 2:18-19
# 🧱 O Wall Of The Daughter Of Zion
---
## 🧱 O Wall Of The Daughter Of Zion

This does not mean the stone wall itself spoke aloud.

The wall stands in for the whole grieving city at once.

Giving a wall a voice shows how deep the lament runs here.

Even the structures of the city seem to join the weeping.

🧱 The wall does not literally speak here

🏙️ It stands in for the whole city

😭 Giving it a voice shows deep lament

📖 Even structures seem to join the weeping

---
## 👁️ Let Not The Apple Of Thine Eye Cease

Apple of the eye is an old idiom for the pupil.

The pupil is the most sensitive, most protected part of the eye.

The phrase asks for tears that never stop or grow numb.

Numbness would mean the grief had stopped meaning anything at all.

👁️ Apple of the eye means the pupil

🛡️ The pupil is the eye's most protected part

💧 This asks for tears that never stop

📖 Numb grief would mean grief stopped mattering

---
## 🌙 In The Beginning Of The Watches

Watches were the divisions soldiers used to split up night duty.

Each watch marked a set stretch of hours until dawn.

Praying at the start of each watch meant praying through the whole night.

This was grief that refused to wait for morning.

🌙 Watches were the divisions of night duty

⏰ Each watch marked hours until dawn

🙏 Praying through every watch meant praying all night

📖 This grief refused to wait for morning

---
## 💧 Pour Out Thine Heart Like Water

Pouring out the heart means holding nothing back in prayer.

Water poured out cannot be gathered up or taken back again.

The image pictures total honesty, not a polite or careful prayer.

God is invited to see every bit of this raw grief.

💧 Pouring out the heart means total honesty

🚫 Water poured out cannot be gathered back

🙏 This is not a polite, careful prayer

📖 God is invited to see raw grief

# Lamentations 2:20-22
# 📏 Children Of A Span Long
---
## 📏 Children Of A Span Long

A span long describes a very small infant, barely grown.

This verse asks God to look at a horror born from siege famine.

Mothers eating their own children was the worst outcome of ancient sieges.

The prayer does not hide this horror, it puts it in front of God.

📏 A span long describes a tiny infant

😱 This names the worst siege famine horror

🙏 The prayer puts this horror before God

📖 Nothing here is hidden or softened

---
## 🏛️ Shall The Priest And The Prophet Be Slain In The Sanctuary

Priests and prophets were meant to be protected inside sacred space.

Killing them there broke every expectation about that space's safety.

The question forces God to look directly at that specific horror.

Nowhere in the city remained safe by this point in the siege.

🙏 Priests and prophets should be protected

🏛️ Killing them broke the sanctuary's safety

❓ The question forces God to look directly

📖 Nowhere in the city remained safe

---
## 💀 The Young And The Old Lie On The Ground In The Streets

This pictures bodies left unburied in the open streets.

Age offered no protection, the young and the old died together.

Burial mattered deeply in this culture, making this image especially bleak.

The chapter repeats "not pitied" to make the point plain.

💀 Bodies were left unburied in the streets

👶 Age gave no protection from this death

⚰️ Burial mattered deeply, making this scene bleak

📖 Not pitied repeats to make the point plain

---
## 🎉 Called As In A Solemn Day My Terrors Round About

Solemn day again echoes the festival language from earlier in the chapter.

Here the gathering is not for worship but for terror.

The same word returns one final time with the same bitter twist.

This chapter keeps using worship language to describe judgment instead.

🎉 Solemn day echoes earlier festival language

😱 This gathering brought terror, not worship

🔄 The same twist returns one last time

📖 Worship language describes judgment throughout this chapter

---
## 👶 Those That I Have Swaddled And Brought Up

Swaddled means wrapped and cared for as a newborn infant.

These were children Jerusalem herself had raised with love.

The same enemy that Judah feared ended up destroying them.

The chapter closes on the loss of a whole generation, not just a city.

👶 Swaddled means wrapped and cared for

❤️ These were children raised with love

💔 The enemy ended up destroying them

📖 A whole generation was lost here
`.trim();

export const LAMENTATIONS_TWO_PERSONAL_SECTIONS = parseLamentationsTwoRawNotes(LAMENTATIONS_TWO_RAW_NOTES);
