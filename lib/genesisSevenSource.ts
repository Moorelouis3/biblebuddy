export type GenesisSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisSevenRawNotes(rawText: string): GenesisSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 7:${startVerse}` : `Genesis 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Genesis 7 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_SEVEN_RAW_NOTES = `# Genesis 7:1-5
# 🚢 The Final Command Before The Rain
---
## 🏠 Come Thou And All Thy House Into The Ark

"House" here means Noah's whole family, not a building.

God speaks directly to Noah alone, even though seven others will also enter.

Noah is treated as the head whose obedience carries his whole family to safety.

This same pattern repeats later when one person's faith shelters an entire household.

🏠 House means Noah's whole family

🗣️ God speaks to Noah alone

👪 One man's obedience shelters a family

📖 A leader's faith can protect a household

## 🐑 Of Every Clean Beast Thou Shalt Take To Thee By Sevens

A "clean" animal was one considered fit for eating and for sacrifice to God.

That distinction existed long before Moses later spelled out the details in Leviticus.

Noah takes seven of each clean animal instead of only two.

The extra animals leave enough alive for both breeding and offering a sacrifice.

Genesis eight shows exactly why the extra pairs were needed.

🐏 Clean means fit for food and sacrifice

📜 Leviticus later explains the same rule

🔢 Seven clean animals instead of only two

📖 Extra clean animals supply Genesis eight's sacrifice

## 👫 The Male And His Female

"His female" is an old way of saying "its mate."

Modern readers might expect the phrase "the male and the female" instead.

The Bible uses this exact male and female pairing four separate times in this chapter alone.

That repetition is not accidental wording.

It stresses that every kind of creature entered as a breeding pair, not as a random crowd.

👫 His female means its mate

🔁 The phrase repeats four times

💑 Every kind entered as a pair

➡️ Pairing points toward future breeding

## 🐍 Beasts That Are Not Clean By Two

Unclean animals still matter to God even though they are fewer in number here.

Two of each unclean animal is enough to keep every species alive.

Unclean did not mean impure or evil, only unfit for Israel's later sacrifices and diet.

God preserves every kind of creature, not only the useful ones.

🐍 Unclean means unfit for sacrifice

🔢 Two of each unclean animal

🌍 Every species survives, not only useful ones

📖 God's care covers creatures beyond human use

## 🕊️ Of Fowls Also Of The Air By Sevens

Birds receive the same sevens pattern already used for clean land animals.

That detail shows birds mattered enough to get extra pairs too.

Doves and other birds will matter again once the flood waters start to recede.

Genesis eight later sends one of these very birds out to search for dry land.

🕊️ Birds get sevens like clean animals

🐦 Extra birds show they mattered too

🌊 Birds return later in the story

➡️ Genesis eight sends a bird searching for land

## 🌱 To Keep Seed Alive Upon The Face Of All The Earth

"Seed" here means offspring, the next generation of every living creature.

The goal was never survival for its own sake.

God wanted life to continue and fill the earth again after the flood.

This same word "seed" later becomes one of the most important words in the whole Bible.

🌱 Seed means the next generation

🎯 Survival was never the final goal

🌍 Life was meant to fill the earth again

📖 Seed becomes a major word later in scripture

## ⏳ Yet Seven Days

God gives one more week before the rain actually starts.

Noah has already spent years building the ark and warning people.

This final seven day countdown is the last opportunity before judgment falls.

God's patience stretches out even after the ark stands finished and ready.

⏳ One more week before the rain

🔨 Years of building already finished

⚠️ A last chance before judgment

📖 God's patience stretches to the very end

## 🌧️ Forty Days And Forty Nights

Forty is a number that shows up again and again across scripture.

Moses later fasts forty days on the mountain.

Israel wanders forty years in the wilderness.

Jesus is tested in the wilderness for forty days too.

The number marks a long season of testing.

🌧️ Forty rain days start the flood

📿 Moses fasts forty days later

🏜️ Israel wanders forty years too

📖 Forty often marks a season of testing

## 💀 Every Living Substance That I Have Made Will I Destroy

"Substance" here means every living thing with breath and life, not property or wealth.

God names Himself as the maker of every creature about to be destroyed.

That detail makes the coming judgment personal rather than distant or automatic.

The same God who created life is the one who now takes it away in judgment.

💀 Substance means every living creature

🛠️ God made what He now judges

⚖️ Creation and judgment come from the same hand

📖 Judgment here is personal, not automatic

## ✅ Noah Did According Unto All That The LORD Commanded Him

This exact line already appeared in Genesis six.

Now it appears again here.

Repeating it shows Noah's obedience was steady, not a one time decision.

He built the ark, gathered the animals, and entered right on schedule.

Scripture rarely repeats a line word for word without a reason.

✅ This same line appeared in Genesis six

🔁 Repetition shows steady obedience

🚢 Noah built, gathered, and entered on time

📖 Scripture repeats lines on purpose

# Genesis 7:6-10
# 🐾 Noah And The Animals Enter The Ark
---
## 📅 Noah Was Six Hundred Years Old

Noah's age here is not a small detail to skip past.

People in this early part of Genesis lived far longer than people do today.

Six hundred years old marked Noah as an old man even by that standard.

His long life meant decades of building, warning, and waiting before this exact day arrived.

📅 Six hundred years old at the flood

👴 Early Genesis people lived very long lives

⏳ Decades passed before this exact day

📖 A long life led to this moment

## 🌊 The Flood Of Waters Was Upon The Earth

This is the first time the word "flood" appears in the whole Bible.

The Hebrew word behind it points to a specific, overwhelming, catastrophic deluge.

It is not the same word used for an ordinary river overflowing its banks.

Genesis is marking this event as one of a kind.

🌊 Flood is used here for the first time

🔤 The Hebrew word means catastrophic deluge

🚫 Not the word for an overflowing river

📖 Genesis marks this as one of a kind

## 👪 Noah Went In, And His Sons, And His Wife, And His Sons' Wives

Eight people total enter the ark according to this verse.

Noah, his wife, his three sons, and their three wives make up the group.

The book of First Peter later calls this exact number eight souls saved through water.

No outsider joins this family at all.

👪 Eight people total enter the ark

🚢 Wife, sons, and their wives all join

🔟 First Peter later calls them eight souls

📖 No outsider joins this family at all

## 💧 Because Of The Waters Of The Flood

Fear and obedience work together here, not against each other.

Noah is not calm because he lacks feeling.

He is calm because he trusts God's own warning.

Real faith can still take real danger seriously.

💧 Fear and obedience work together

🙏 Noah trusts God's warning completely

😨 Calm does not mean fearless

📖 Real faith still takes danger seriously

## 🐛 Of Every Thing That Creepeth Upon The Earth

"Creepeth" is an old word for crawling close to the ground.

It describes small creatures like insects, lizards, and other crawling animals.

These are easy to overlook next to bigger animals like cattle and fowl.

Genesis makes sure even the smallest creatures are named and saved.

🐛 Creepeth means crawling close to the ground

🦎 It covers insects, lizards, and small animals

🐄 Bigger animals are named separately too

📖 Even the smallest creatures are saved

## 🚪 There Went In Two And Two Unto Noah

The animals come to Noah on their own.

He does not have to hunt them down.

This detail shows God directing the animals, not Noah's own skill.

Two and two was already the standard pattern from verses two and three.

🚪 Animals arrive to Noah on their own

🕊️ God directs the animals, not Noah

🔢 Two and two is the same pattern

📖 The scene looks calm, not chaotic

## ✔️ As God Had Commanded Noah

Obedience bookends this whole opening scene, closing it the way it began.

God commanded every step, from the ark to the animals.

Every detail in these first ten verses followed that command exactly.

Obedience, not chance, explains why everything lines up so well.

✔️ The chapter opens and closes on command

🛠️ Every step traces back to God's word

🎯 Nothing here happens by chance

📖 Obedience explains why it all lines up

## 📆 After Seven Days

The seven day window promised back in verse four has now closed.

God's timeline held exactly as He said it would.

This is the last calm moment before the rain actually begins.

Everything from here forward happens quickly and without pause.

📆 The seven day window has closed

⏰ God's timeline held exactly as promised

🌫️ The last calm moment before rain

➡️ Everything speeds up from here

# Genesis 7:11-16
# 🌧️ The Flood Begins
---
## 📅 In The Six Hundredth Year Of Noah's Life

Genesis gives an exact calendar date for the very start of the flood.

Year, month, and day are all recorded, not just "a long time ago."

This kind of precision is rare in ancient writing outside of official records.

Genesis is telling this story as real history, not as legend.

📅 An exact year, month, and day

🗂️ This reads like an official record

📜 Precision like this is rare in ancient writing

📖 Genesis presents the flood as real history

## 🌊 All The Fountains Of The Great Deep Broken Up

"The deep" is the same word used for the dark waters back in Genesis one.

Ancient readers pictured huge stores of water sitting under the earth's surface.

Those hidden waters now burst upward all at once.

This is not a normal storm.

🌊 The deep echoes Genesis one's waters

🕳️ Ancient readers pictured water under the earth

💥 Hidden waters burst upward all at once

📖 This is no ordinary storm

## 🪟 The Windows Of Heaven Were Opened

Ancient people pictured the sky as a solid dome holding back water above it.

"Windows" describes openings in that dome, letting the upper waters pour down.

Genesis one already describes waters being separated above and below the sky.

Genesis seven now shows both of those waters breaking loose together.

🪟 Windows means openings in the sky

🌌 Ancient readers pictured a solid sky dome

💧 Upper waters now pour down freely

📖 Waters above and below break loose together

## 📆 In The Selfsame Day

"Selfsame" is an old word that simply means "that very same day."

The phrase stresses that everything happened exactly when God said it would.

There is no delay between God's word and God's action here.

Genesis wants the reader to notice how precisely the timing lines up.

📆 Selfsame means that very same day

⏱️ Timing matches God's word exactly

🚫 No delay between word and action

📖 Genesis highlights precise timing on purpose

## 👪 Shem, And Ham, And Japheth

Noah's three sons are named individually here instead of grouped as "his sons."

Genesis ten later traces the entire population of the earth back to these three men.

Shem's line leads toward Abraham and eventually toward Israel's whole story.

Naming them here plants a seed the rest of the Bible will grow from.

👪 Shem, Ham, and Japheth named directly

🌍 Genesis ten traces nations back to them

🌱 Shem's line eventually leads to Abraham

📖 Naming them plants a seed for later

## 🐾 Every Beast After His Kind

"After his kind" is a phrase repeated four separate times in this one verse.

The same phrase first appeared back in Genesis one during the days of creation.

Repeating it here shows the flood does not erase the order God originally built.

Every kind of creature keeps its own place, even inside a single crowded ark.

🐾 The phrase repeats four times here

🔗 It echoes Genesis one's creation language

🗂️ Every kind keeps its own place

📖 The flood does not erase God's order

## 🐦 Every Bird Of Every Sort

"Every sort" points to variety inside each bird kind, not a brand new category.

It stresses variety, small birds and large birds, common birds and rare ones alike.

None of them are left out of God's rescue plan.

The ark carries far more variety than a modern reader might first imagine.

🐦 Every kind and size of bird

🌈 Common and rare birds both included

🚫 No bird is left behind

📖 The ark holds more variety than expected

## 🫁 Wherein Is The Breath Of Life

"Breath of life" is the same phrase used when God formed Adam back in Genesis two.

It points to air breathing creatures, the ones that need lungs and open air to live.

That detail matters later, since sea creatures are never mentioned as needing the ark.

The flood is described from the point of view of land and air, not the ocean.

🫁 Breath of life echoes Genesis two

🌬️ It means creatures that breathe air

🐟 Sea creatures are never mentioned here

📖 The flood story stays on land and air

## 🔢 Two And Two Of All Flesh

Two and two here repeats the exact pairing pattern from verses two and three.

"All flesh" is a wide phrase covering every living, breathing creature on land.

The repetition confirms the plan is being carried out exactly as instructed.

Nothing was skipped, forgotten, or done differently once the actual moment arrived.

🔢 The same pairing pattern repeats again

🌐 All flesh covers every land creature

✅ The plan is carried out exactly

📖 Nothing was skipped once the moment came

## 🚪 And The LORD Shut Him In

God, not Noah, closes the door of the ark.

This is the only line in the whole chapter where God acts with His own hand.

Once that door shuts, the choice to enter ends for everyone else outside.

Jesus later uses this same picture of a door that eventually shuts for good.

🚪 God shuts the door, not Noah

✋ God acts with His own hand here

⏰ The choice to enter is now over

📖 Jesus later echoes this same door image

# Genesis 7:17-24
# 🌊 The Waters Cover The Earth
---
## 🌧️ The Flood Was Forty Days Upon The Earth

This forty days marks how long the actual rain kept falling.

It is separate from the one hundred fifty days mentioned later in this same chapter.

The rain caused the flood to begin, but the flood itself lasted much longer.

Two different numbers are tracking two different parts of the same event.

🌧️ Forty days is the rain itself

🔢 One hundred fifty days is longer

⏳ The flood outlasts the rain

📖 Two numbers track two different stages

## 🛶 The Waters Increased, And Bare Up The Ark

"Bare up" is an old way of saying "lifted and carried."

The rising water becomes the very thing that keeps the ark safe.

What looked like pure danger actually becomes the ark's support.

The same water that destroys everything else now carries Noah's family to safety.

🛶 Bare up means lifted and carried

📈 Rising water becomes the ark's support

🔄 Danger and safety come from one source

📖 The flood carries Noah's family to safety

## ⬆️ It Was Lift Up Above The Earth

Once the ark leaves the ground, nothing on land can reach it anymore.

The ark is no longer resting on anything solid at all.

It floats completely at the mercy of the water and of God's protection.

Noah's family is now fully dependent on the ark holding together.

⬆️ The ark leaves solid ground completely

🌊 Nothing on land can reach it now

🙏 The ark depends fully on God's protection

📖 Total dependence replaces total control

## 💦 The Waters Prevailed, And Were Increased Greatly

"Prevailed" means the water was winning, overpowering everything in its path.

The word repeats several times across this section for a reason.

Genesis wants the reader to feel the flood getting worse and worse, not settling.

Each repeated verse adds to a growing wall of water.

💦 Prevailed means the water overpowered everything

🔁 The word repeats across this section

📈 The flood keeps getting worse

📖 Repetition makes the reader feel the rise

## ⛵ The Ark Went Upon The Face Of The Waters

The ark now floats freely with no set direction of its own.

Noah cannot steer it toward safety or away from danger.

The ark was never built with sails, oars, or a rudder.

Its safety depends entirely on God's care, not on human navigation.

⛵ The ark floats with no set direction

🧭 Noah cannot steer it anywhere

🚫 No sails, oars, or rudder exist

📖 Safety depends on God, not navigation

## ⛰️ All The High Hills That Were Under The Whole Heaven

"Under the whole heaven" is Bible language for total coverage, everywhere in sight.

Many scholars believe ancient writers used "whole earth" language the way modern people say "everyone showed up."

Bible scholars still debate whether this means the whole globe or the whole known world of that time.

Either reading agrees on the same point.

⛰️ Total coverage of every high hill

🗣️ Ancient writers often used total language loosely

🌍 Scholars debate global versus regional extent

📖 Both readings agree nothing escaped

## 📏 Fifteen Cubits Upward Did The Waters Prevail

A cubit was an ancient measurement close to eighteen inches, about the length of a forearm.

Fifteen cubits works out to about twenty two feet of water above the highest points.

That depth was enough to lift the ark clear over every hill Noah could see.

The measurement gives a real, physical picture instead of a vague description.

📏 A cubit is about eighteen inches

🌊 Fifteen cubits is about twenty two feet

⛰️ Enough to clear every visible hill

📖 A real measurement, not a vague guess

## 🏔️ And The Mountains Were Covered

Even the tallest points Noah could see disappeared under the water.

There was nowhere left to climb, hide, or wait it out.

The judgment reaches every possible place of escape.

Nothing about this flood is partial or halfway.

🏔️ Even the tallest points disappeared

🚫 No higher ground left to reach

⚖️ The judgment reaches everywhere

📖 Nothing about this flood is partial

## ☠️ All Flesh Died That Moved Upon The Earth

Genesis lists the categories carefully: fowl, cattle, beast, creeping thing, and man.

That list matches the exact categories named earlier when the animals entered the ark.

Nothing that stayed outside the ark survives this judgment.

The list is not random, it mirrors the earlier entry list on purpose.

☠️ The same categories from the entry list

🐦 Fowl, cattle, beast, and creeping things named

🚫 Nothing outside the ark survives

📖 The lists mirror each other on purpose

## 🫁 All In Whose Nostrils Was The Breath Of Life

"Nostrils" marks these out as the land creatures that breathe air, not sea creatures.

Fish and other water creatures are never mentioned as dying or as needing rescue.

They do not breathe air through nostrils the way land animals and people do.

The flood story focuses on air breathing life from beginning to end.

🫁 Nostrils points to air breathing creatures

🐟 Fish are never mentioned as dying

🌬️ Water creatures do not need air

📖 The story focuses on air breathing life

## 🧹 Every Living Substance Was Destroyed Which Was Upon The Face Of The Ground

Genesis repeats this same judgment a second time, almost word for word.

Genesis often repeats a statement like this to show finality, not to pad the story.

Man, cattle, creeping things, and fowl are named again, one final time.

The repetition makes sure no reader mistakes how complete the destruction really was.

🧹 The judgment is restated a second time

🔁 Repetition signals finality, not padding

📋 The same categories are named again

📖 No reader could mistake how complete it was

## 🕊️ Noah Only Remained Alive, And They That Were With Him In The Ark

Out of the entire world, one family and one boatload of animals survive.

"Only" is a small word carrying an enormous weight in this sentence.

Everything outside the ark's shelter is gone.

Being inside the ark is what saves them, not personal effort alone.

🕊️ Only one family survives the flood

⚖️ Only carries enormous weight here

🚪 Everything outside the ark is gone

📖 Being inside the ark is what saves

## 📆 The Waters Prevailed Upon The Earth An Hundred And Fifty Days

"An hundred" is simply the old way of writing "a hundred."

One hundred fifty days is much longer than the forty days of rain from verse twelve.

The rain stopped long before the flood waters actually began going back down.

Genesis eight picks up exactly at this one hundred fifty day mark.

📆 An hundred means a hundred

🔢 One hundred fifty days total

⏳ Far longer than the forty days of rain

➡️ Genesis eight starts at this exact point
`.trim();

export const GENESIS_SEVEN_PERSONAL_SECTIONS = parseGenesisSevenRawNotes(GENESIS_SEVEN_RAW_NOTES);
