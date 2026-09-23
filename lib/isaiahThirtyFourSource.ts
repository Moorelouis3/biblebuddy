export type IsaiahThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyFourRawNotes(rawText: string): IsaiahThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 34:${startVerse}` : `Isaiah 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 34 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_FOUR_RAW_NOTES = `# Isaiah 34:1-4
# 📯 Come Near Ye Nations To Hear
---
## 📯 Come Near, Ye Nations, To Hear

This summons addresses every nation on earth at once.

Isaiah has spent many earlier chapters confronting one nation at a time.

Now the whole world is called together to hear the same announcement.

What follows is not a local warning, it is global judgment.

📯 Every nation is summoned at once
🌍 Isaiah once spoke to nations one by one
🗣️ Now the whole world hears together
📖 This warning is global, not local

## 📜 Let The Earth Hear, And All That Is Therein

"Therein" is an old word that simply means "in it."

This line piles up every possible way to say everyone, everywhere.

The earth, its people, and everything living on it are all included.

No one anywhere gets left out of this coming judgment.

📜 Therein is an old word for in it
🌐 This line stacks every way to say everyone
👥 People and the whole earth are included
📖 No one anywhere is left out

## 🔥 The Indignation Of The LORD Is Upon All Nations

"Indignation" means fierce anger provoked by real wrongdoing.

This is not a sudden outburst, it is settled judgment.

Earlier chapters singled out Assyria, Moab, and other specific nations.

Here the LORD's anger widens to cover every nation at once.

🔥 Indignation means fierce, justified anger
📛 This anger is settled judgment, not a mood
🗺️ Earlier chapters named nations one at a time
📖 Now every nation is included at once

## 🗡️ He Hath Utterly Destroyed Them, He Hath Delivered Them To The Slaughter

"Delivered to the slaughter" is a specific phrase for animals killed for sacrifice.

Applying it to entire nations pictures total, deliberate destruction.

This is not random chaos, it is judgment carried out on purpose.

The armies that once destroyed others are now destroyed themselves.

🗡️ Slaughter is a word for sacrificial killing
🎯 Applying it to nations pictures total destruction
⚖️ This destruction is deliberate, not random
📖 Destroyers are now destroyed themselves

## ⚰️ Their Slain Also Shall Be Cast Out

"Cast out" means left unburied, exposed instead of given a proper burial.

In this culture, denying burial was a public mark of deep shame.

These were not defeated soldiers given honor in death.

Their bodies were left as a visible sign of total defeat.

⚰️ Cast out means left without burial
😔 Denying burial was a mark of shame
🏳️ These soldiers received no honor in death
📖 Their bodies showed total, visible defeat

## 🏔️ The Mountains Shall Be Melted With Their Blood

This is not a literal claim that solid rock turns to liquid.

Hebrew poetry often uses huge, physical pictures to describe huge events.

The picture communicates bloodshed on a massive, overwhelming scale.

The whole landscape is pictured reacting to what happens to these nations.

🏔️ This is a picture, not a literal claim
📜 Hebrew poetry uses huge physical images often
🩸 The image pictures massive, overwhelming bloodshed
📖 Even the landscape reacts to this judgment

## ✨ All The Host Of Heaven Shall Be Dissolved

"Host of heaven" refers to the sun, moon, and stars.

Ancient nations often worshiped these very lights as gods.

Isaiah pictures them losing their light and fading away completely.

Even the things people trusted as unshakable are shown to fail.

✨ Host of heaven means the sun, moon, stars
🛐 Many ancient nations worshiped these lights
🌑 Isaiah pictures them fading away completely
📖 Even the unshakable is shown to fail

## 🌀 The Heavens Shall Be Rolled Together As A Scroll

A "scroll" was a long roll of writing material used before books existed.

Rolling one up made it small and easy to put away.

The sky itself is pictured being rolled up and put away like that.

The stars are then pictured falling like dead leaves off a vine.

📜 A scroll was a rolled up writing material
🌀 Rolling it up made it easy to store
🌌 The whole sky is pictured rolled away
📖 Stars fall like dead leaves off a vine

# Isaiah 34:5-8
# ⚔️ The Sword Of The LORD Falls On Edom
---
## ⚔️ For My Sword Shall Be Bathed In Heaven

A sword is a common Bible picture for God's judgment in battle.

"Bathed" pictures the sword being prepared, almost soaked and ready.

This preparation happens in heaven before it ever reaches earth.

The judgment about to fall has been planned, not improvised.

⚔️ Sword pictures God's judgment in battle
💧 Bathed pictures the sword made ready
☁️ This preparation happens in heaven first
📖 This judgment is planned, not improvised

## 🏔️ It Shall Come Down Upon Idumea

"Idumea" is another name for Edom, the nation descended from Esau.

Esau was Jacob's twin brother, and the two nations stayed rivals for centuries.

Edom often sided against Judah whenever Judah was in trouble.

This sword is aimed at a very specific, long standing enemy.

🏔️ Idumea is another name for Edom
👬 Edom descended from Esau, Jacob's twin
⚔️ Edom often turned against Judah
📖 This judgment targets a specific old enemy

## 📛 The People Of My Curse, To Judgment

This phrase names Edom as a people already under God's curse.

Genesis and other prophets record a long history of conflict with Edom.

This is not a sudden decision, it is the result of a long pattern.

Edom's own choices led directly to this moment.

📛 Edom is named as already cursed
📚 Other prophets record this long conflict
⏳ This judgment follows a long pattern
📖 Edom's own choices led to this

## 🩸 The Sword Of The LORD Is Filled With Blood

This verse pictures God's judgment using the language of animal sacrifice.

"Fatness" refers to the fat portions that were burned on the altar.

Lambs, goats, and rams were the normal animals offered there.

Edom's coming defeat is described the same way as a sacrifice.

🩸 This pictures judgment as animal sacrifice
🔥 Fatness means the fat burned on the altar
🐑 Lambs, goats, and rams were common offerings
📖 Edom's defeat is pictured as a sacrifice

## 🏙️ The LORD Hath A Sacrifice In Bozrah

"Bozrah" was the capital city of Edom.

Calling this a sacrifice makes the coming destruction sound formal and intentional.

This was not random violence, it is presented as an act of worship.

The very heart of Edom's power becomes the scene of judgment.

🏙️ Bozrah was Edom's capital city
🕯️ Calling this a sacrifice makes it formal
🙏 This destruction is framed as worship
📖 Edom's own capital becomes the judgment scene

## 🐂 The Unicorns Shall Come Down With Them

"Unicorns" here is the King James word for a large, powerful wild ox.

It does not mean the mythical horned horse a modern reader pictures.

This strong animal stands for Edom's strongest warriors and leaders.

Even the strongest among them are swept into this judgment.

🐂 Unicorns here means a large wild ox
🦄 It is not the mythical horned horse
💪 This animal pictures Edom's strongest warriors
📖 Even the strongest are swept into judgment

## ⚖️ The Day Of The LORD's Vengeance

"Vengeance" here means setting right a wrong, not random cruelty.

"Recompences" means paying back exactly what is owed.

This judgment answers "the controversy of Zion," how Edom treated God's people.

God is settling a specific account, not lashing out at random.

⚖️ Vengeance here means setting a wrong right
💰 Recompences means paying back what is owed
🏙️ This answers how Edom treated Zion
📖 God is settling a specific account

# Isaiah 34:9-11
# 🔥 The Land Becomes Burning Pitch
---
## 🛢️ The Streams Thereof Shall Be Turned Into Pitch

"Pitch" is a thick, black, sticky tar that burns easily.

Turning rivers into pitch pictures the whole land becoming fuel for fire.

This same picture appears in the destruction of Sodom and Gomorrah.

Edom's judgment is described using that same, well known disaster.

🛢️ Pitch is a thick, sticky, flammable tar
🔥 Rivers of pitch picture the land as fuel
🏚️ This echoes the destruction of Sodom
📖 The same disaster language returns for Edom

## 🌋 The Dust Thereof Into Brimstone

"Brimstone" is an old word for sulfur, a mineral that burns with a strong smell.

Brimstone and fire together were the exact judgment that fell on Sodom.

The same fire and sulfur are pictured falling on Edom now.

This is not a new kind of punishment, it is a familiar one returning.

🌋 Brimstone is an old word for sulfur
🔥 Brimstone and fire fell together on Sodom
🌪️ That same judgment now falls on Edom
📖 This punishment is familiar, not new

## 🚫 It Shall Not Be Quenched Night Nor Day

"Quenched" means put out, the way water puts out a fire.

This fire is pictured burning nonstop, with no relief at any hour.

The smoke rising from it never stops either.

The judgment on Edom is pictured lasting, not passing quickly.

🚫 Quenched means put out, like with water
🔥 This fire burns nonstop, day and night
💨 Smoke from it never stops rising
📖 This judgment lasts, it does not pass quickly

## ⏳ From Generation To Generation It Shall Lie Waste

This judgment is not pictured lifting after one lifetime.

It stretches out across many generations, one after another.

No traveler is pictured passing through this land again, ever.

The land itself becomes a permanent, empty warning.

⏳ This judgment lasts many generations
🚶 No traveler ever passes through again
🏜️ The land becomes permanently empty
📖 The land stands as a lasting warning

## 🦅 The Cormorant And The Bittern Shall Possess It

A "cormorant" is a large diving bird that lives near water and ruins.

A "bittern" is a marsh bird known for its strange, booming call.

Both birds thrive in abandoned, wild, uninhabited places.

Human life is gone, and only wilderness creatures remain.

🦅 Cormorant is a large diving bird
🦆 Bittern is a strange marsh bird
🏚️ Both birds thrive in abandoned places
📖 Human life is gone, only wilderness remains

## 📏 He Shall Stretch Out Upon It The Line Of Confusion

A measuring "line" and "stones" were normally tools for building a city.

Here they are used to formally declare the opposite, total emptiness.

This is a builder's tool turned into a tool for undoing.

Edom is measured out for ruin as carefully as a city is built.

📏 Line and stones were normally building tools
🌀 Here they declare total emptiness instead
🔨 A builder's tool is turned into ruin
📖 Edom is measured for ruin, not building

# Isaiah 34:12-15
# 🦉 A Court For Owls And Dragons
---
## 👑 They Shall Call The Nobles Thereof To The Kingdom, But None Shall Be There

This pictures a coronation with no one left to crown.

Edom's ruling class is completely gone, not just defeated.

There is no one left to even hold the title of king.

Leadership itself has disappeared, not just the current leader.

👑 This pictures a crown with no wearer
🏚️ Edom's ruling class is completely gone
❌ No one remains to hold the title
📖 Leadership itself has disappeared, not one leader

## 🌵 Thorns Shall Come Up In Her Palaces

"Nettles" and "brambles" are rough, thorny weeds that take over neglected ground.

Palaces were once symbols of Edom's wealth and power.

Now those same buildings are pictured overrun with weeds.

What once impressed visitors becomes a wild, abandoned ruin.

🌵 Nettles and brambles are rough thorny weeds
🏰 Palaces once showed Edom's wealth and power
🌱 Those buildings are now overrun with weeds
📖 What once impressed becomes an abandoned ruin

## 🐺 An Habitation Of Dragons, And A Court For Owls

"Dragons" here is the King James word for jackals, wild wolf like animals.

It does not mean the fire breathing creature a modern reader imagines.

A "court" once meant an open gathering space inside a palace.

That same royal space is now pictured full of scavenging animals instead.

🐺 Dragons here means jackals, not fire breathers
🔥 It is not the mythical fire breathing beast
🏛️ A court was an open palace space
📖 That royal space now holds wild animals

## 🏜️ The Wild Beasts Of The Desert Shall Meet With The Wild Beasts Of The Island

"Island" here likely means a dry, isolated wilderness area, not ocean land.

Two different kinds of wild creatures are pictured gathering in the same ruined place.

Animals that would not normally cross paths now share the same territory.

The land has become so empty that even the wildest creatures move in freely.

🏜️ Island here likely means dry wilderness
🐾 Two kinds of wild animals now meet
🗺️ Animals that never crossed paths now share it
📖 Wild creatures move in freely now

## 🐐 The Satyr Shall Cry To His Fellow

"Satyr" is the King James word for a wild goat.

Some ancient cultures pictured these creatures as part goat spirits.

Here it simply pictures a wild animal calling out in an empty land.

"Screech owl" is another creature completely at home in ruins.

🐐 Satyr here means a wild goat
👻 Some cultures pictured it as a spirit
📢 Here it just pictures a calling wild animal
📖 Screech owl is another ruin dwelling creature

## 🦉 There Shall The Great Owl Make Her Nest

This verse pictures birds not just visiting, but settling down permanently.

Nesting, laying eggs, and hatching young all describe long term habitation.

These are not passing scavengers, they are pictured raising families there.

The desolation is not temporary, it becomes a permanent home for wild birds.

🦉 Birds are pictured settling permanently, not visiting
🥚 Nesting and hatching describe long term habitation
👪 These birds are pictured raising families
📖 Desolation becomes a permanent home for birds

## 🦅 There Shall The Vultures Also Be Gathered, Every One With Her Mate

Vultures are birds that feed on the remains of the dead.

Their gathering pictures a land already full of death and ruin.

Even their mating pairs are pictured intact and undisturbed.

Nothing here interrupts the wildlife settling permanently into this ruin.

🦅 Vultures feed on the remains of the dead
💀 Their gathering pictures a land full of death
💑 Even their mating pairs stay undisturbed
📖 Wildlife settles permanently into this ruin

# Isaiah 34:16-17
# 📖 Seek Ye Out Of The Book Of The LORD
---
## 🔍 Seek Ye Out Of The Book Of The LORD, And Read

This invites the reader to check this prophecy against a written record.

"The book of the LORD" points to scripture as a reliable, lasting record.

God is confident enough in this word to invite readers to verify it.

This is not a vague guess about the future.

🔍 This invites readers to check the record
📚 Book of the LORD means a reliable record
✅ God invites readers to verify this word
➡️ This is not a vague guess

## 🔁 No One Of These Shall Fail, None Shall Want Her Mate

This circles back to the animals paired up in the previous section.

Every single detail of this prophecy is promised to come true exactly.

Even the smallest specifics, like paired mates, are guaranteed.

Nothing about this vision is left to chance.

🔁 This circles back to the paired animals
🎯 Every detail here is promised to come true
🔬 Even the smallest specifics are guaranteed
📖 Nothing about this vision is left to chance

## 🗣️ For My Mouth It Hath Commanded, And His Spirit It Hath Gathered Them

God's spoken word is pictured as the direct cause of everything described.

His Spirit is pictured actively gathering these creatures into place.

Nothing here happens by accident or coincidence.

What God speaks, God also brings to pass.

🗣️ God's spoken word causes what happens
🕊️ His Spirit actively gathers these creatures
🎲 Nothing here happens by accident
📖 What God speaks, God brings to pass

## 🎲 He Hath Cast The Lot For Them

Casting lots was an ancient way to make a decision by chance, similar to rolling dice.

Israelites once cast lots to divide the promised land among the tribes.

Here that same practice divides Edom's ruined land among wild animals instead.

A method once used for inheritance now assigns a ruin to its new residents.

🎲 Lots were an ancient way to decide
🗺️ Israel once divided the land by lots
🦉 Now animals inherit Edom's land by lots
📖 A tool for inheritance now assigns ruin

## 🔄 They Shall Possess It For Ever, From Generation To Generation Shall They Dwell Therein

This closes the chapter the same way it opened, with lasting permanence.

The wild creatures named earlier are not just visiting Edom's ruins.

They are promised this land as a permanent home, generation after generation.

Edom's judgment is not a phase that will eventually pass.

🔄 This closes the chapter with permanence
🏠 These creatures are not just visiting
⏳ This land is their home for generations
📖 Edom's judgment does not eventually pass
`.trim();

export const ISAIAH_THIRTY_FOUR_PERSONAL_SECTIONS = parseIsaiahThirtyFourRawNotes(ISAIAH_THIRTY_FOUR_RAW_NOTES);
