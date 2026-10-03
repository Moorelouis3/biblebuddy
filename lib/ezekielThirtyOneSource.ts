export type EzekielThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyOneRawNotes(rawText: string): EzekielThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 31:${startVerse}` : `Ezekiel 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 31 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_ONE_RAW_NOTES = `# Ezekiel 31:1-2
# 😮 Who Can Match Egypt's Greatness
---
## 📅 In The Eleventh Year, In The Third Month, In The First Day

This date pins the prophecy to a specific day, not a vague season.

The eleventh year is counted from King Jehoiachin's exile, Ezekiel's usual calendar.

That same year also saw Jerusalem itself fall to Babylon.

Egypt's warning and Jerusalem's fall share almost the same stretch of time.

📅 Marks an exact date, not a vague time
🔢 The eleventh year counts from Jehoiachin's exile
🏙️ Jerusalem fell to Babylon in this same year
📖 Egypt's warning lands right beside Jerusalem's fall

## 🗣️ Speak Unto Pharaoh King Of Egypt, And To His Multitude

God sends Ezekiel to speak directly to Pharaoh, not just about him.

Multitude means Egypt's whole population, not just its soldiers.

This message is aimed at an entire nation's pride, top to bottom.

🗣️ God speaks directly to Pharaoh himself
👥 Multitude means Egypt's entire population
🇪🇬 The warning targets a whole nation
📖 Pride here reaches far beyond one king

## ❓ Whom Art Thou Like In Thy Greatness

This question opens a riddle Pharaoh is not expecting.

God is about to compare Egypt to a nation that already fell.

The comparison is not a compliment, it is a warning in disguise.

Pharaoh will not realize the answer until the very end of the chapter.

❓ The question opens a hidden riddle
🌲 God compares Egypt to a fallen nation
⚠️ The comparison warns more than it flatters
📖 The full answer waits until the last verse

# Ezekiel 31:3-4
# 🌲 The Assyrian, A Cedar In Lebanon
---
## 🌲 The Assyrian Was A Cedar In Lebanon

Assyria had already fallen before Ezekiel ever spoke this prophecy.

Cedars of Lebanon were famous across the ancient world for their size and strength.

Kings used them as a natural symbol of royal power and glory.

Comparing a nation to this tree was comparing it to the tallest, strongest thing people knew.

🌲 Assyria had already fallen by this point
🏔️ Lebanon's cedars were famous for size and strength
👑 Kings used the cedar as a power symbol
📖 Egypt is compared to the greatest tree known

## 🌳 With A Shadowing Shroud, And Of An High Stature

Shroud here does not mean a burial cloth, it means a thick covering.

The cedar's branches formed a canopy wide enough to cast deep shade.

High stature simply means the tree stood taller than everything around it.

Both details picture a nation towering over every neighbor it could see.

🌳 Shroud means thick covering, not a burial cloth
☀️ Canopy was wide enough to block the sun
📏 High stature means standing taller than everything else
📖 Picture is a nation towering over neighbors

## 🔝 His Top Was Among The Thick Boughs

The top of the tree reached into the thickest part of its own canopy.

That phrase pictures a tree so tall it seems to disappear into its own branches.

Assyria's empire, at its height, felt just as endless and self contained.

🔝 Top reaching into the thickest branches
🌲 The tree seems to vanish into itself
🏰 Assyria's empire felt endless at its height
📖 Great height can start to feel self contained

## 🌊 The Waters Made Him Great, The Deep Set Him Up On High

Assyria's heartland sat along the Tigris river, rich with water and trade.

The deep pictures a vast, constant water supply feeding the empire's growth.

Rivers running round about his plants means irrigation reaching every corner of the land.

Water was the real root of this nation's greatness, not just military force.

🌊 Assyria's land sat along the rich Tigris river
💧 The deep pictures constant, abundant water
🌱 Rivers reached irrigation to every corner
📖 Water was the true root of Assyria's greatness

# Ezekiel 31:5-6
# 🐦 Nests In His Boughs, Nations In His Shadow
---
## 🌿 His Boughs Were Multiplied, And His Branches Became Long

The tree's growth matched the flood of water feeding its roots.

More water meant more branches and more reach.

Assyria's empire grew the exact same way, resource by resource, conquest by conquest.

🌿 Growth matched the water feeding its roots
💧 More water meant more branches and reach
🗺️ Assyria grew resource by resource, conquest by conquest
📖 Abundance fed the growth of pride

## 🐦 All The Fowls Of Heaven Made Their Nests In His Boughs

Birds nesting in the branches picture smaller nations finding shelter under a bigger one.

A strong empire often let weaker states live under its protection.

That protection always came with control attached.

Assyria, at its peak, played this role for many smaller kingdoms.

🐦 Birds nesting pictures smaller nations sheltering
🛡️ A strong empire offered protection to weaker states
🔗 Protection always came bundled with control
📖 Assyria played this role for many kingdoms

## 🌍 Under His Shadow Dwelt All Great Nations

This is the high point of the whole picture, total dominance.

Shadow here means Assyria's influence covered nation after nation at once.

Every great power of that era answered to Assyria in some way.

The chapter already knows this will not last forever.

🌍 This marks the height of Assyria's dominance
🌑 Shadow means influence covering many nations
👑 Every great power answered to Assyria
📖 No empire stays at this height forever

# Ezekiel 31:7-9
# 🌳 Fairer Than Every Tree In Eden
---
## 💧 His Root Was By Great Waters

A tree's beauty always traces back to what feeds its root.

Great waters means the tree never lacked what it needed to thrive.

Assyria's beauty, in this picture, was never really its own creation.

Every bit of its glory depended on resources it did not make itself.

💧 Beauty traces back to what feeds the root
🌊 Great waters means constant, reliable supply
🎁 Assyria's glory was never its own creation
📖 Borrowed resources built a borrowed beauty

## 🏞️ The Cedars In The Garden Of God Could Not Hide Him

The garden of God is Eden, the same garden from Genesis.

Ezekiel pictures Eden as if it still held a forest of trees.

Even those legendary trees could not match or outshine this one.

The comparison reaches for the highest standard anyone could imagine.

🏞️ Garden of God means Eden from Genesis
🌲 Ezekiel pictures Eden as a forest of trees
🚫 Even Eden's trees could not match him
📖 The comparison reaches for the highest standard

## 🚫 Nor Any Tree In The Garden Of God Was Like Unto Him

This line repeats the same point a second time, on purpose.

Repetition in Hebrew poetry usually means pay close attention here.

No tree anywhere, real or legendary, compared to this one.

The reader is meant to feel just how impossibly great this nation seemed.

🔁 The point repeats a second time on purpose
📜 Repetition in Hebrew poetry signals importance
🚫 No tree anywhere compared to this one
📖 The nation seemed impossibly great

## 😒 All The Trees Of Eden, That Were In The Garden Of God, Envied Him

Envy is a strange thing to picture coming from trees in paradise.

Ezekiel personifies Eden's own trees to make the point land harder.

Even paradise itself, in this picture, wanted what Assyria had.

Pride grows fastest in the very places that already seem blessed.

😒 Envy pictured coming from trees in paradise
🎭 Ezekiel personifies Eden's trees for effect
🌴 Even paradise wanted what Assyria had
📖 Pride grows fastest where blessing already exists

# Ezekiel 31:10-12
# ⚔️ Cut Down For His Pride
---
## 📈 Because Thou Hast Lifted Up Thyself In Height

Lifted up in height means Assyria took pride in its own size.

The tree did not grow tall by accident.

In this charge, it grew proud on purpose.

God names pride as the real reason judgment is coming.

📈 Lifted up means taking pride in size
👑 Growth became a source of arrogance
⚖️ Pride is named as the real charge
📖 Judgment follows pride, not just size

## 💓 His Heart Is Lifted Up In His Height

Heart lifted up is another way to say the mind grew proud.

This is pride on the inside, not just outward growth.

Outward height and inward pride grew together, side by side.

Scripture often pairs these two kinds of pride as a single root problem.

💓 Heart lifted up means the mind grew proud
🌱 This pride grew on the inside too
🤝 Outward height and inward pride grew together
📖 Scripture treats both as one root problem

## 😈 Delivered Him Into The Hand Of The Mighty One Of The Heathen

The mighty one of the heathen points to Babylon, the empire that actually ended Assyria.

History records Babylon and its allies destroying Assyria's capital, Nineveh, years before this.

The very empire about to threaten Egypt had already brought Assyria down.

Pharaoh is being warned by a story everyone already knew was true.

😈 Mighty one of the heathen points to Babylon
🏛️ Babylon's armies had already destroyed Nineveh
🔁 The same empire now threatens Egypt
📖 Pharaoh is warned by known, recent history

## 🗡️ Strangers, The Terrible Of The Nations, Have Cut Him Off

Terrible here means feared and ruthless, not evil in a vague sense.

Strangers means foreign armies with no loyalty to Assyria at all.

The same word already described Babylon's army earlier in this book.

A feared nation can still meet an army more feared than itself.

🗡️ Terrible means feared and ruthless
🌍 Strangers means foreign armies with no loyalty
🔁 The same word already described Babylon elsewhere
📖 A feared nation can meet one more feared

## 🌊 His Boughs Are Broken By All The Rivers Of The Land

The same rivers that once fed this tree's growth now surround its wreckage.

Every resource that built the empire is still there.

Only the empire itself is gone.

Verse four showed waters making him great.

Verse twelve shows those same waters surrounding his fall.

🌊 The same rivers now surround its wreckage
💔 Every resource remains, the empire does not
🔁 Verse four's growth becomes verse twelve's ruin
📖 Reversal is one of Ezekiel's favorite tools

# Ezekiel 31:13-14
# 🦅 A Warning Written In The Ruins
---
## 🦅 Upon His Ruin Shall All The Fowls Of The Heaven Remain

Birds once nested proudly in these branches back in verse six.

Now birds simply rest on a fallen trunk instead.

The picture flips from shelter to scavenging in a single image.

Greatness and ruin can use the exact same picture, pointed in opposite directions.

🦅 Birds once nested proudly in these branches
🪵 Now they rest on a fallen trunk
🔁 The picture flips from shelter to scavenging
📖 One image can point two opposite directions

## 🚫 None Of All The Trees By The Waters Exalt Themselves

This whole parable has a clear purpose, not just a sad ending.

Other proud nations are meant to look at this and change course.

Trees by the waters means any nation with Assyria's same resources and reach.

The warning is aimed outward, past Assyria, at everyone watching.

🎯 The parable has a clear purpose
👀 Other proud nations are meant to watch
🌊 Trees by the waters means similar nations
📖 The warning is aimed past Assyria, outward

## ⚰️ Delivered Unto Death, To The Nether Parts Of The Earth

Nether parts of the earth describes Sheol, the realm of the dead.

Ancient readers pictured the dead gathered together below the ground.

This is not the later idea of hell as punishment.

It is simply death's shared destination for everyone.

Even the mightiest tree ends up there, same as everyone else.

⚰️ Nether parts of the earth means Sheol
👥 The dead were pictured gathered below ground
🚫 This is not hell as later understood
📖 Everyone ends in the same place eventually

# Ezekiel 31:15-17
# ⚰️ Mourning Reaches Even Lebanon
---
## 😭 In The Day When He Went Down To The Grave I Caused A Mourning

God describes mourning as something He Himself causes, not just allows.

This is a formal funeral scene, written for a nation, not a person.

The grave here again points to Sheol, the shared realm of the dead.

Even a nation's death gets marked with real grief in this picture.

😭 God Himself causes this mourning
⚰️ This is a funeral scene for a nation
🪦 The grave again points to Sheol
📖 Even a nation's death gets real grief

## 🌊 I Covered The Deep For Him, And I Restrained The Floods Thereof

The deep and the floods are the same waters that once made this tree great.

Covering and restraining pictures those same waters pausing in grief.

Nature itself stops moving for a moment to mark this death.

The very resource that built the empire now shares in mourning it.

🌊 Waters that built the tree now pause
💧 Covering and restraining pictures grief in nature
🌳 Nature stops moving to mark this death
📖 The builder of the empire mourns its fall

## 🌲 I Caused Lebanon To Mourn For Him

Lebanon itself, the forest this cedar came from, is pictured grieving.

Fainted here means the trees of the field went limp with grief.

The grief spreads outward from the tree to the whole forest around it.

Even the landscape itself cannot stay unmoved by a fall this large.

🌲 Lebanon itself is pictured grieving
😵 Fainted means the trees went limp with grief
🌍 Grief spreads from the tree to the forest
📖 Even the landscape cannot stay unmoved

## 💥 I Made The Nations To Shake At The Sound Of His Fall

News of Assyria's fall rattled nations far beyond its own borders.

A single empire's collapse can send shockwaves through an entire region.

Other kings would have felt real fear watching this happen.

If Assyria could fall this hard, no throne nearby felt fully safe.

💥 News of Assyria's fall rattled distant nations
🌍 One collapse can shake an entire region
😨 Other kings felt real fear watching this
📖 No nearby throne still felt fully safe

## 😌 Shall Be Comforted In The Nether Parts Of The Earth

Comforted here is a strange, dark kind of comfort.

The other fallen trees of Eden feel less alone once Assyria joins them.

Shared ruin can feel like company, even though it brings no real relief.

Misery finding company is not the same thing as misery finding healing.

😌 Comforted here is a strange, dark comfort
🤝 Fallen trees feel less alone once Assyria joins
💔 Shared ruin can feel like company
📖 Company is not the same as healing

# Ezekiel 31:18
# 👑 This Is Pharaoh And All His Multitude
---
## ❓ To Whom Art Thou Thus Like In Glory And In Greatness

This question echoes the exact same question from verse two.

The riddle that opened the chapter now comes back around to close it.

By now the reader already knows this cannot end well for Pharaoh.

❓ This echoes the question from verse two
🔁 The riddle returns to close the chapter
⚠️ The reader already senses the answer
📖 Pharaoh is about to hear it plainly

## ⚰️ Thou Shalt Lie In The Midst Of The Uncircumcised

Uncircumcised marks someone as outside God's covenant people.

Being buried among the uncircumcised was considered a shameful, dishonorable burial.

This was not just death, it was death without honor attached.

Pharaoh's end is pictured as both a military and a social disgrace.

⚰️ Uncircumcised marks someone outside the covenant
💔 Burial among them was considered shameful
🚫 This death carried no honor at all
📖 Pharaoh's end is military and social disgrace

## 👑 This Is Pharaoh And All His Multitude, Saith The Lord GOD

The riddle finally gets its answer in the chapter's very last line.

Pharaoh is the Assyrian cedar all along, just wearing Egypt's crown instead.

Multitude means his whole nation falls under this same warning, not Pharaoh alone.

Greatness borrowed from God's gifts can be lifted up in pride and still come down.

👑 The riddle gets its answer here
🌲 Pharaoh is the Assyrian cedar, wearing Egypt's crown
🇪🇬 Multitude means the whole nation is warned
📖 Borrowed greatness can still fall through pride`.trim();

export const EZEKIEL_THIRTY_ONE_PERSONAL_SECTIONS = parseEzekielThirtyOneRawNotes(EZEKIEL_THIRTY_ONE_RAW_NOTES);
