export type AmosNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosNineRawNotes(rawText: string): AmosNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 9:${startVerse}` : `Amos 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Amos 9 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_NINE_RAW_NOTES = `# Amos 9:1
# 👁️ The Lord Stands At The Altar
---
## 🏛️ I Saw The Lord Standing Upon The Altar

This altar was likely the one at Bethel.

Bethel was the shrine Amos condemned earlier in this book.

Standing upon it pictures God directly overseeing that very place.

The LORD is not watching from heaven at a distance.

He stands exactly where the sin is happening.

🏛️ Altar likely points to Bethel's shrine
👁️ God stands where the sin happens
🚫 He is not watching from a distance
📖 Judgment begins at the place of worship

## 🏗️ Smite The Lintel Of The Door, That The Posts May Shake

A lintel is the heavy beam across the top of a doorway.

It holds the whole structure together.

Striking it first means the building collapses from the top down.

This pictures a temple falling on the people inside it.

🏗️ Lintel means the beam over a doorway
💥 Hitting it collapses the whole structure
⛪ This temple falls on the people inside
📖 Judgment starts at the roof, not the door

## 🏃 He That Fleeth Of Them Shall Not Flee Away

Fleeth means running away to escape danger.

Normally a person who flees in time gets away safely.

This judgment reverses that outcome on purpose.

Running will not work this time.

🏃 Fleeth means running from danger
🚫 Running usually means getting away safely
🔒 That escape route is removed here
📖 Nowhere is safe this time

## 🚪 He That Escapeth Of Them Shall Not Be Delivered

Escapeth and delivered sound like the same idea said twice.

They are actually two separate doors, not one.

Someone could slip past the first danger and still face the second.

Together they close both doors at once.

🚪 Escapeth and delivered are two separate doors
🔐 Both doors are shut, not just one
🕳️ No gap is left for anyone
📖 Nothing about this judgment leaves a gap

# Amos 9:2-4
# 🌍 Nowhere Left To Hide
---
## ⚰️ Though They Dig Into Hell, Thence Shall Mine Hand Take Them

Hell here translates Sheol, the Hebrew word for the realm of the dead.

It does not describe a place of fiery torment.

Digging into it pictures going as low and hidden as possible.

Even that depth is not outside God's reach.

⚰️ Hell translates Sheol, the realm of the dead
🕳️ Digging there means hiding as low as possible
✋ God's hand still reaches that depth
📖 No depth is outside his reach

## ☁️ Though They Climb Up To Heaven, Thence Will I Bring Them Down

Heaven here names the opposite extreme from Sheol.

Together the two verses name every direction a person could run.

Down into the earth or up into the sky changes nothing.

God brings them back to face him either way.

☁️ Heaven is the opposite extreme from Sheol
🧭 Together these name every possible direction
⬇️ Up or down ends the same way
📖 God brings them back either way

## 🏔️ Hide Themselves In The Top Of Carmel

Carmel was a mountain range thick with forest.

People in that era used its caves and trees to hide from enemies.

God names a real, familiar hiding place, not an imaginary one.

Even a well known hideout offers no safety here.

🏔️ Carmel was a forested mountain range
🌲 Its caves and trees hid people before
📍 This is a real, familiar hideout
📖 Even a known hideout fails here

## 🌊 Hid From My Sight In The Bottom Of The Sea, Thence Will I Command The Serpent

The sea was the place ancient people feared most.

It was full of creatures no one could control.

Serpent here likely names a sea creature, not a snake on land.

Even the deepest, most feared place on earth answers to God.

🌊 The sea was the most feared place
🐍 Serpent likely names a sea creature
👑 Even it answers to God's command
📖 Nothing there escapes his authority

## ⛓️ Into Captivity Before Their Enemies, Thence Will I Command The Sword

Captivity usually meant survival.

Captives were kept alive because they were useful to their captors.

Even that supposed safety will not hold here.

The sword follows them into exile itself.

⛓️ Captivity usually meant staying alive
🗡️ The sword follows them into exile
🚫 That safety does not hold here
📖 No outcome counts as getting away

## 👀 I Will Set Mine Eyes Upon Them For Evil, And Not For Good

God's eyes upon someone usually describes his care and attention.

This verse flips that familiar phrase on purpose.

The same attention that once protected Israel now works against it.

Being watched by God is not automatically safety.

👀 God's eyes usually mean his care
🔄 This verse flips that familiar phrase
⚠️ The same attention now works against them
📖 Being watched is not automatic safety

# Amos 9:5-6
# 🌊 The One Who Shapes Earth And Sky
---
## 👑 The Lord GOD Of Hosts Is He That Toucheth The Land, And It Shall Melt

Lord GOD of hosts means the God who commands every army in heaven and on earth.

Toucheth describes the lightest possible contact, not a heavy blow.

Even that light touch is enough to melt solid ground.

Power this total never has to strain to act.

👑 Lord of hosts means ruler of every army
✋ Toucheth means the lightest possible touch
🔥 Even that touch melts solid ground
📖 This power never has to strain

## 🌊 And It Shall Rise Up Wholly Like A Flood, And Shall Be Drowned, As By The Flood Of Egypt

The flood of Egypt refers to the Nile River's yearly flooding.

That same picture already appeared back in chapter eight.

Egypt depended on that flood every single year.

Here the same rising and falling becomes a disaster instead.

🌊 Flood of Egypt means the Nile's yearly rise
🔁 This same picture appeared in chapter eight
⚠️ Egypt once depended on that same flood
📖 The land's own rhythm turns against it

## 🏗️ He That Buildeth His Stories In The Heaven

Stories here does not mean tales someone tells.

It means upper floors, the same word used for levels of a building.

God is pictured building the sky itself, floor by floor.

The one who built creation can also unmake it.

🏗️ Stories means upper floors of a building
☁️ God built the sky in levels
🔨 He is creation's own builder
📖 The builder can also unmake it

## 🧱 Hath Founded His Troop In The Earth

Troop here likely means a vault or arch, not a group of soldiers.

This image pairs with the stories just described above it.

Together the two pictures describe one single structure.

Creation is not a pile of random pieces.

It is one building under one builder.

🧱 Troop likely means an arch or vault
🏠 It pairs with the stories above it
🌍 Together they form one structure
📖 One builder made it top to bottom

## 🌧️ Calleth For The Waters Of The Sea, And Poureth Them Out Upon The Face Of The Earth

This pictures the water cycle, the sea's water eventually falling again as rain.

Ancient readers had no science to explain this, only the sight of it happening.

Amos credits the entire cycle to God's command, not to chance.

The LORD Is His Name closes the thought by naming exactly who holds that power.

🌧️ Pictures the sea's water returning as rain
🔬 Ancient readers only saw the effect
🙌 Amos credits the cycle to God
📖 The LORD is his name names that power

# Amos 9:7-8
# 🌐 No Nation Is Israel's Excuse
---
## 🌍 Are Ye Not As Children Of The Ethiopians Unto Me

Ethiopians here names the Cushites, a distant African nation.

Most Israelites had never seen anyone from that nation.

God asks if Israel is really any different to him.

Being chosen was always a gift, not an unbreakable guarantee.

🌍 Ethiopians names the distant Cushite nation
❓ God asks if Israel is truly different
🎁 Being chosen was always a gift
📖 A gift can still be lost

## 🚶 Have Not I Brought Up Israel Out Of The Land Of Egypt

This sounds like Israel's usual boast about the exodus.

The very next lines take that same boast and apply it elsewhere.

God brought up the Philistines and the Syrians in their own way too.

The exodus proves God's power, not Israel's exclusive claim on him.

🚶 This echoes Israel's usual exodus boast
🔄 The same language applies to enemies next
💪 It proves God's power, not Israel's claim
📖 No nation owns God by itself

## 🗺️ The Philistines From Caphtor

Caphtor is likely the island of Crete or a nearby region.

The Philistines, Israel's longtime enemies, had their own exodus story.

God names it with the same verb used for Israel leaving Egypt.

Israel's defining story was never unique to Israel alone.

🗺️ Caphtor likely names Crete or nearby
⚔️ Philistines had their own exodus story
🔁 The same verb describes both journeys
📖 Israel's story was not unique to Israel

## 📍 The Syrians From Kir

Kir's exact location is not certain today.

It was likely somewhere in the region of Assyria.

The Syrians, also called Arameans, were another regular enemy of Israel.

A third nation now stands alongside Israel with the same claim.

📍 Kir's location is not certain today
⚔️ Syrians were another regular enemy
🔁 A third nation shares this claim
📖 God guided more journeys than Israel's

## 👀 The Eyes Of The Lord GOD Are Upon The Sinful Kingdom

Sinful kingdom names Israel itself, stated as plainly as possible.

This echoes the eyes set for evil back in verse four.

God is not confused about who he is addressing.

The special relationship does not erase the sin underneath it.

👑 Sinful kingdom names Israel directly
👀 This echoes the eyes from verse four
🎯 God names exactly who he means
📖 The relationship does not erase the sin

## 🌱 I Will Not Utterly Destroy The House Of Jacob

Utterly means completely, down to the last trace.

Everything so far in this chapter has pointed toward total judgment.

This single line breaks that pattern on purpose.

A remnant will survive even though judgment itself is certain.

💯 Utterly means completely, no trace left
⚖️ Everything before pointed to total judgment
🌱 This line breaks that pattern
📖 A remnant survives judgment

# Amos 9:9-10
# 🌾 Sifted But Not Lost
---
## 🌾 I Will Sift The House Of Israel Among All Nations, Like As Corn Is Sifted In A Sieve

A sieve is a tool farmers shook grain through.

It separated the good kernels from husks and stones.

Sifting Israel among the nations pictures exile scattering the whole nation the same way.

A sieve is a tool for sorting, not simply for destroying.

🌾 Sieve separates good grain from waste
🌍 Exile scatters Israel among the nations
🌀 The process looks violent and chaotic
📖 Sifting sorts, it does not just destroy

## 🌱 Yet Shall Not The Least Grain Fall Upon The Earth

The least grain means the smallest, easiest to lose kernel in the batch.

A sieve naturally lets small pieces slip through and fall away.

God promises the opposite result here on purpose.

Even the smallest part of Israel will not be lost.

🌱 Least grain means the smallest kernel
🕳️ Sieves normally let small pieces fall
🤲 God promises the opposite result
📖 Even the smallest part is kept

## 🎯 All The Sinners Of My People Shall Die By The Sword

This line narrows the target from the whole nation to one group.

Sinners here means those who actively refused to turn from wrongdoing.

The sifting in verse nine separates exactly this group out.

Judgment and mercy are both happening at the same time, to different people.

🎯 This narrows judgment to one group
🚫 Sinners means those who refused to turn
🌾 This is exactly what the sieve separates
📖 Judgment and mercy happen together

## ⏳ Which Say, The Evil Shall Not Overtake Nor Prevent Us

Prevent in this old English sense means to arrive before something.

It does not mean to stop something from happening.

These people believed disaster would never even reach them in time.

False security like this is exactly what the sword proves wrong.

⏳ Prevent here means arriving first, not stopping
😌 They believed disaster would not reach them
🚫 Their confidence had no real promise behind it
📖 False security gets proven wrong

# Amos 9:11-12
# 👑 Raising The Fallen Kingdom
---
## 👑 In That Day Will I Raise Up The Tabernacle Of David That Is Fallen

Tabernacle of David does not mean a tent.

It means David's royal house and kingdom.

Fallen describes a kingdom broken apart, not a building that simply aged.

This is the first promise of restoration in the entire book.

👑 Tabernacle of David means his kingdom
💔 Fallen describes a broken kingdom
🔀 This is the book's first restoration promise
📖 The whole tone shifts at this line

## 🧱 And Close Up The Breaches Thereof

Breaches are gaps broken into a wall.

An enemy forces gaps like this open during a siege.

Closing them pictures careful repair, not a quick patch.

Restoration here takes real work, not a single instant fix.

🧱 Breaches means gaps broken into a wall
🛠️ Closing them pictures careful repair
🏰 The kingdom is pictured like a rebuilt wall
📖 Restoration takes real, steady work

## 📜 I Will Raise Up His Ruins, And I Will Build It As In The Days Of Old

Days of old points back to the kingdom's strongest years.

Those years were under kings David and Solomon.

This promise restores something familiar, not something brand new.

God's judgment in this book was never the final word on Israel.

📜 Days of old points to David and Solomon
🔁 This restores something familiar, not new
🏗️ God rebuilds what sin tore down
📖 Judgment was never the final word

## ⚔️ That They May Possess The Remnant Of Edom, And Of All The Heathen, Which Are Called By My Name

Edom was a neighboring nation with a long history of conflict against Israel.

Naming Edom points to old enemies finally coming under this restored kingdom.

Called by my name means these nations now belong to God.

This exact verse gets quoted later in the book of Acts about the Gentiles.

⚔️ Edom was a longtime rival nation
👑 Old enemies now come under this kingdom
🏷️ Called by my name means belonging to God
📖 Acts later quotes this verse for the Gentiles

# Amos 9:13-15
# 🍇 A Future Too Good To Rush
---
## 🌱 The Plowman Shall Overtake The Reaper

Normally a farmer plows and plants, then waits months for harvest.

Overtake means the next planting season arrives before harvest even finishes.

Harvests this constant describe a land producing far beyond its normal rhythm.

Abundance here is not occasional.

It is nonstop.

🌱 Normally planting and harvest are months apart
🏃 Overtake means planting catches up to harvest
🌾 This describes nonstop abundance
📖 The land's normal rhythm is overwhelmed

## 🍇 And The Treader Of Grapes Him That Soweth Seed

Treading grapes was how workers crushed the harvest to make wine.

Workers usually did this by foot, inside a large pit.

This repeats the same overlap from the line before it, now with grapes.

Two separate pictures make the exact same point twice.

🍇 Treading grapes crushed harvest for wine
🔁 This repeats the overlap from before
🌾 Two harvests make the same point
📖 This harvest never really stops

## 🏔️ The Mountains Shall Drop Sweet Wine, And All The Hills Shall Melt

This pictures entire hillsides covered in vineyards.

The harvest is so full that wine seems to drip from the ground itself.

Melt here describes hills seeming to soften and flow, not actually disappearing.

A future this good could not be captured in an ordinary sentence.

🏔️ Pictures hillsides covered in vineyards
🍷 Wine seems to drip from the land
🎨 Melt describes a flowing, soft image
📖 Ordinary language could not hold this future

## 🏠 I Will Bring Again The Captivity Of My People Of Israel

Bring again the captivity means reversing exile.

It means bringing the scattered people home.

This is the exact opposite of the scattering described earlier in this chapter.

The same hand that sifted Israel among the nations now gathers it back.

🏠 Bring again means reversing exile
🔄 This reverses the scattering from earlier
🤲 The same hand sifted and now gathers
📖 Judgment and restoration share one hand

## 🏚️ They Shall Build The Waste Cities, And Inhabit Them

Waste cities means towns left in ruins.

Those towns were abandoned after the judgment this book describes.

Rebuilding and living in them pictures daily life returning, not just survival.

Restoration reaches all the way down to ordinary, everyday places.

🏚️ Waste cities means towns left in ruins
🏘️ Rebuilding pictures daily life returning
🔁 The same ruined cities hold people again
📖 Restoration reaches ordinary, daily life

## 🍷 They Shall Plant Vineyards, And Drink The Wine Thereof, They Shall Also Make Gardens, And Eat The Fruit Of Them

Earlier in Israel's law, planting a vineyard without drinking its wine was named as a curse.

That curse was a punishment for disobedience.

This verse reverses that exact curse, line for line.

What sin once took away, restoration now gives back in full.

⚠️ Not drinking your own wine was a curse
🔄 This verse reverses that exact curse
🤲 Planters now get to enjoy the harvest
📖 What sin took, restoration returns

## 🌳 I Will Plant Them Upon Their Land, And They Shall No More Be Pulled Up Out Of Their Land

Planting a nation like a tree pictures permanence.

It describes something rooted rather than passing through.

Pulled up names exactly what exile had already done to them once.

This promise removes that exact threat for the future.

🌳 Planting pictures a permanent, rooted home
🪓 Pulled up names what exile already did
🚫 This promise removes that threat
📖 Inescapable judgment ends in an unshakable home

## 🗣️ Saith The LORD Thy God

Thy God makes this personal, not a statement about God in general.

This phrase closes the entire book on a relationship, not just a prediction.

Amos began with roaring judgment against nation after nation.

It ends with God speaking directly to his own people as their God.

🗣️ Thy God makes this personal
📘 This closes the entire book
⚡ Amos began with roaring judgment
📖 It ends with God as their own God
`.trim();

export const AMOS_NINE_PERSONAL_SECTIONS = parseAmosNineRawNotes(AMOS_NINE_RAW_NOTES);
