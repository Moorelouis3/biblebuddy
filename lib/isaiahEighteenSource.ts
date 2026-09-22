export type IsaiahEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahEighteenRawNotes(rawText: string): IsaiahEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 18:${startVerse}` : `Isaiah 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Isaiah 18 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_EIGHTEEN_RAW_NOTES = `# Isaiah 18:1-2
# 🛶 Messengers From Beyond The Nile
---
## 🌍 Woe To The Land Shadowing With Wings

"Woe" announces coming trouble before any details are given.

This land sits far south of Egypt, along the upper Nile.

"Shadowing with wings" is a strange picture to modern ears.

Many scholars believe it describes the buzzing hum of huge insect swarms along the riverbanks.

Others connect it to the sound of many sails moving across the water.

The reader hears this land before ever being told its name.

🌍 Woe opens a warning about a nation
🐝 Wings may picture insect swarms
⛵ Or the sound of moving sails
📖 The land is heard before it is named

---
## 🗺️ Beyond The Rivers Of Ethiopia

"Ethiopia" here does not mean the modern country by that name today.

It translates the Hebrew word "Cush," a kingdom south of Egypt.

Cush covered much of what is now Sudan, along the upper Nile.

The Nile splits into several channels and tributaries in that region.

"The rivers of Ethiopia" simply means those branching waters of the upper Nile.

This was one of the most powerful kingdoms in Africa during Isaiah's lifetime.

🗺️ Ethiopia here means the kingdom Cush
🏞️ Cush sat south of ancient Egypt
🌊 Rivers means the branching upper Nile
📖 Cush was a major African power

---
## 🌊 Sendeth Ambassadors By The Sea

"The sea" does not mean an ocean in this verse.

Ancient writers sometimes called the wide Nile River a sea because of its size.

Cush's king is sending official messengers along that great river.

These ambassadors carried a message north, likely seeking help against a shared enemy.

Assyria was threatening nearly every nation in this part of the world at the time.

A journey down the Nile was the fastest way to reach neighboring kingdoms.

🌊 The sea here means the Nile
👑 Cush's king sends official messengers
⚔️ Assyria threatened nations across the region
📖 The Nile carried the message north

---
## 🛶 Vessels Of Bulrushes Upon The Waters

"Bulrushes" means papyrus reeds that grew thick along the Nile.

Egyptians and Cushites bundled these reeds together to build light, fast boats.

A basket of bulrushes once hid the infant Moses on this same river.

These reed boats could not carry heavy cargo, but they moved quickly.

Speed mattered more than size for a message racing toward danger.

The choice of boat says everything about how urgent this mission was.

🌾 Bulrushes means thick papyrus reeds
🛶 Reeds were bundled into light boats
👶 The same reeds once hid baby Moses
📖 Speed mattered more than cargo space

---
## 🏃 Go, Ye Swift Messengers

This is the message Cush's ambassadors are told to carry.

"Swift" means the messengers were expected to hurry without delay.

Cush likely hoped to convince other nations to join against Assyria.

Judah itself was one of the nations these messengers may have reached.

Isaiah later names an actual Cushite king, Tirhakah, who tried to help Judah.

This single command carries an entire nation's urgent foreign policy in four words.

🏃 Swift means hurry without delay
🤝 Cush hoped for allies against Assyria
👑 Isaiah later names king Tirhakah
📖 One command carried a nation's urgent plan

---
## 👤 A Nation Scattered And Peeled

This phrase most likely describes the Cushites themselves, not another people.

"Peeled" means smooth skinned, without much visible body hair.

Ancient historians often described the people of Cush as unusually tall.

"Scattered" may point to how spread out and separated their territory was.

Isaiah is describing a striking, easily recognized people before they even arrive.

A reader who never saw Cush could still picture exactly who these messengers were.

👤 This describes the Cushites themselves
✨ Peeled means smooth skinned
📏 Ancient writers called them unusually tall
📖 A vivid picture before they even arrive

---
## 📐 Meted Out And Trodden Down, Whose Land The Rivers Have Spoiled

"Meted out" means measured or divided, like land marked off by boundary lines.

The Nile's many branches naturally divided Cush's territory into separate sections.

"Trodden down" describes a people conquered by stronger powers in the past.

Egypt ruled over Cush for long stretches of ancient history.

Later, Cush grew strong enough to rule Egypt in return.

Power kept shifting between these two ancient neighbors for centuries.

📐 Meted out means measured and divided
🌊 The Nile's branches divided their land
⚔️ Trodden down points to past conquest
📖 Power kept shifting between two neighbors

# Isaiah 18:3-6
# 🎺 A Sign The Whole World Will See
---
## 🌍 All Ye Inhabitants Of The World, And Dwellers On The Earth

Isaiah suddenly turns from Cush to address every nation on earth at once.

This message is not just for Judah or Cush alone.

"Inhabitants" and "dwellers" both mean the same thing, said twice for emphasis.

Something is about to happen that concerns the whole world, not one region.

Prophecy often widens its lens like this right before naming God's own action.

The reader is being told to pay close attention before the scene even starts.

🌍 Every nation is addressed at once
🔁 Inhabitants and dwellers repeat for emphasis
👀 Something worldwide is about to happen
📖 Attention is called before the action starts

---
## 🚩 When He Lifteth Up An Ensign On The Mountains

An "ensign" is a raised banner or flag used as a visible signal.

Mountains gave a signal like this the widest possible view for miles around.

Ancient armies and messengers used banners to gather people from a distance.

No one needed to be told with words once the banner went up.

This is God's own signal, not a human army's battle flag.

Everyone is meant to watch the mountains for what happens next.

🚩 Ensign means a raised signal banner
⛰️ Mountains gave the widest possible view
👁️ People gathered by sight, not words
📖 This signal belongs to God, not armies

---
## 📯 When He Bloweth A Trumpet, Hear Ye

Ancient trumpets were usually made from a ram's horn, called a shofar.

A trumpet reached people who were too far away to see the banner.

Trumpets in the Old Testament announced war, worship, and important warnings alike.

Sight and sound together meant no one had an excuse to miss the signal.

Both the eyes and the ears are called to attention in this one verse.

📯 Trumpets were often made from ram's horn
👂 Sound reached those too far to see
⚔️ Trumpets announced war and warnings
📖 Sight and sound together demand attention

---
## 🛑 I Will Take My Rest, And I Will Consider In My Dwelling Place

This does not mean God is being lazy or checking out.

"Rest" here means calm, unhurried confidence, not idleness.

"My dwelling place" refers to heaven, where God's throne sits above everything.

God is watching the coming events from complete control, not confusion.

He does not need to rush in and react like a worried ruler would.

Calm certainty is the whole point of this picture.

🛑 This is not laziness or absence
😌 Rest means calm, unhurried confidence
👑 His dwelling place is heaven's throne
📖 God watches from complete control

---
## ☀️ Like A Clear Heat Upon Herbs, And Like A Cloud Of Dew In The Heat Of Harvest

Isaiah gives two pictures side by side for how God watches.

A clear, cloudless heat can quietly wither a whole field of plants.

A cloud of dew during harvest brings brief, welcome relief from that same heat.

One picture is harsh, the other is gentle, but both happen quietly and steadily.

God's patience can feel like either one, depending on what a nation needs.

Nothing about His watching is loud or rushed.

☀️ Clear heat quietly withers a field
💧 Dew brings brief, welcome relief
⚖️ One picture is harsh, one gentle
📖 God's patience is quiet and steady

---
## 🌿 He Shall Cut Off The Sprigs With Pruning Hooks

Isaiah pictures a farmer trimming a vineyard before the grapes are ready.

"Sprigs" and "branches" mean the young growing shoots of the plant.

A "pruning hook" was a curved blade used to cut back unwanted growth.

The bud is still forming and the grape is still sour when this cutting happens.

God is describing Himself as that farmer, acting before a threat fully matures.

He stops the danger early, not after it has already caused harm.

🌿 Sprigs means young growing shoots
🔪 A pruning hook cut back unwanted growth
🍇 The grape is still sour and unripe
📖 God stops danger before it fully grows

---
## 🐦 Left Together Unto The Fowls Of The Mountains, And To The Beasts Of The Earth

The branches that get cut away picture a defeated army, not literal plants anymore.

Being left unburied was one of the worst fates imaginable in the ancient world.

Birds of prey and wild animals feed on whatever is left behind.

"Fowls shall summer" and "beasts shall winter" means this goes on through every season.

Nothing about this defeat is quick or partial.

It is complete, lasting, and impossible to hide from view.

🐦 The branches now picture a defeated army
⚰️ Staying unburied was a severe disgrace
🦁 Birds and beasts feed all year long
📖 The defeat is complete and lasting

# Isaiah 18:7
# 🎁 A Gift Finally Reaches Zion
---
## 🎁 In That Time Shall The Present Be Brought Unto The LORD Of Hosts

"The present" means a gift or tribute, offered willingly rather than taken by force.

"LORD of hosts" is a title for God as commander over heaven's armies.

The nation bringing this gift is Cush, the same people named back in verse one.

They once sent messengers seeking allies against Assyria.

Now they arrive with an entirely different purpose.

A distant, feared nation ends up honoring God instead of only seeking help from men.

🎁 The present means a willing gift
👑 LORD of hosts names God as commander
🔁 The same Cush from verse one returns
📖 A feared nation ends up honoring God

---
## ⛰️ To The Place Of The Name Of The LORD Of Hosts, The Mount Zion

"Mount Zion" is the hill in Jerusalem where God's Temple stood.

"The place of the name" means the exact spot chosen for God's presence.

This far off African kingdom is pictured traveling all the way to worship there.

Isaiah repeats this same hope in other chapters, nations streaming toward Zion.

The chapter opened with a search for political allies.

It closes with that same nation searching for God instead.

⛰️ Mount Zion was Jerusalem's temple hill
📍 God chose this exact place for His name
🌍 A distant kingdom travels there to worship
📖 A search for allies becomes worship of God
`.trim();

export const ISAIAH_EIGHTEEN_PERSONAL_SECTIONS = parseIsaiahEighteenRawNotes(ISAIAH_EIGHTEEN_RAW_NOTES);
