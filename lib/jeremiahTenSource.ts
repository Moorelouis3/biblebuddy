export type JeremiahTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTenRawNotes(rawText: string): JeremiahTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 10:${startVerse}` : `Jeremiah 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 10 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TEN_RAW_NOTES = `# Jeremiah 10:1-5
# 😨 Learn Not The Way Of The Heathen
---
## 😨 Be Not Dismayed At The Signs Of Heaven

"Signs of heaven" means strange events in the sky.

A comet or an eclipse counts as a sign like this.

Babylonian astrologers built entire belief systems around reading events like these.

A strange sky could throw a whole city into panic.

God tells his people not to live controlled by that fear.

Fearing the sky puts trust in something only God controls.

🌠 Signs of heaven means sky omens
😱 Comets and eclipses caused real panic
🔭 Babylon built religion around the sky
📖 God says do not fear the sky

## 🌲 One Cutteth A Tree Out Of The Forest

A false god started out as a tree in the forest.

A workman picked out the tree and marked it for cutting.

He cut it down using nothing more than an axe.

His own hands shaped the wood into a human figure.

The idol's whole origin story is ordinary lumber and tools.

🌲 A false god began as a tree
🪓 A workman cut it down himself
🔨 Human hands shaped the wood
📖 Ordinary lumber does not become powerful

## 💰 They Deck It With Silver And With Gold

Once the wood was carved, workers dressed it up.

"Deck" means to decorate or cover something in fine material.

Silver and gold covered the plain wood underneath.

Nails and hammers held the decorations firmly in place.

A decorated idol was still the same powerless wood as before.

Expensive decoration cannot give a lifeless object real power.

💰 Deck means to decorate something
🪙 Silver and gold covered plain wood
🔩 Nails held the decorations in place
📖 Decoration cannot give an object power

## 🌴 They Are Upright As The Palm Tree, But Speak Not

The idol could stand up straight like a palm tree.

Standing still was the only thing it could do on its own.

It could not speak, walk, or move without being carried.

"Be not afraid of them" is God's direct instruction here.

A god that must be carried cannot rescue anyone who carries it.

🌴 Upright like a palm tree
🚶 It cannot walk on its own
🗣️ It cannot speak at all
➡️ A carried god cannot save anyone

# Jeremiah 10:6-10
# 👑 None Like Unto Thee, O LORD
---
## 👑 There Is None Like Unto Thee, O LORD

This verse answers the whole idol argument from before it.

Every idol just described was made by human hands.

God was never made by anyone.

"Great" here points to a reputation that reaches every nation.

No carved image could ever compete with a God like that.

👑 This verse answers the idol argument
🪵 Every idol was made by hands
♾️ God was never made by anyone
📖 No idol competes with a God like this

## 🪵 The Stock Is A Doctrine Of Vanities

"Stock" means the block of wood an idol gets carved from.

A "doctrine of vanities" means a whole belief system built on emptiness.

People had built entire religions around a decorated piece of wood.

Every teaching from that religion inherited the same emptiness.

A doctrine is only as solid as the god behind it.

🪵 Stock means the block of wood
📜 Doctrine of vanities means empty teaching
⛪ Whole religions were built on wood
📖 A doctrine is as solid as its god

## 🗺️ Silver Spread Into Plates Is Brought From Tarshish

Tarshish was a distant trading port, likely far to the west.

Uphaz was another far off source of fine gold.

Scholars are not certain exactly where Uphaz was located.

Merchants traveled great distances just to import shiny metal.

Craftsmen worked that silver and gold onto a plain block of wood.

All that effort still ended in the same powerless statue.

🗺️ Tarshish was a distant trading port
✨ Uphaz was another far off source
🚢 Merchants imported metal from far away
📖 Effort could not fix a powerless statue

## ✅ The LORD Is The True God, He Is The Living God

This is the direct opposite of everything just said about idols.

Idols cannot move, speak, or act on their own.

God is described here as both true and alive.

His anger alone is strong enough to shake the earth.

No nation can hold steady against a God like that.

✅ God is called true and living
🚫 Idols cannot move or speak
🌍 His anger can shake the earth
📖 No nation can stand against him

# Jeremiah 10:11-16
# 🌩️ He Hath Made The Earth By His Power
---
## 🔤 Thus Shall Ye Say Unto Them

This one verse switches languages from Hebrew into Aramaic.

That switch does not happen anywhere else in this chapter.

Aramaic was the common trade language of that region.

Writing in that language let nearby nations read the message directly.

The message itself is simple.

Gods that made nothing will vanish completely.

A God who truly made the heavens has nothing to fear from that comparison.

🔤 This verse switches into Aramaic
🌍 Aramaic was the common regional language
📨 Nearby nations could read it directly
📖 Empty gods will vanish completely

## 🌍 He Hath Made The Earth By His Power

Every idol so far was built by human hands.

God made the entire earth without anyone's help.

"Discretion" here means wisdom and understanding, not caution.

God did not just create the world.

He designed it with real intelligence.

A God with that kind of power cannot be carved from a tree.

🌍 God made the earth by his power
🧠 Discretion means wisdom, not caution
🏗️ God designed the world with intelligence
📖 That kind of God cannot be carved

## 💨 There Is No Breath In Them

God gave Adam the breath of life back in Genesis.

A molten image can look impressive.

But it will never breathe.

"Confounded" means embarrassed or put to shame.

Every craftsman who makes an idol is quietly shamed by his own work.

He usually does not even realize it.

A lifeless statue can never replace a living, breathing God.

💨 God gave Adam the breath of life
🗿 A molten image will never breathe
😳 Confounded means put to shame
📖 A statue cannot replace a living God

## 🎁 The Portion Of Jacob Is Not Like Them

"Portion" here means the share a person actually receives.

Other nations inherited land, treasure, and false gods.

Israel's real portion was God himself.

"Rod of his inheritance" pictures Israel as God's own claimed tribe.

Everything else in this chapter gets destroyed.

This relationship does not.

🎁 Portion means a person's real inheritance
🏞️ Other nations inherited land and idols
🤝 Israel's portion was God himself
📖 That relationship survives everything else

# Jeremiah 10:17-22
# ⛺ My Tabernacle Is Spoiled
---
## 🎒 Gather Up Thy Wares Out Of The Land

"Wares" means goods a person owns and could carry away.

This command pictures someone packing quickly before a siege.

"Inhabitant of the fortress" refers to Jerusalem itself.

Jerusalem felt protected and secure inside its walls.

That sense of safety was about to be proven false.

God was telling his people the danger was no longer far away.

🎒 Wares means goods a person owns
🏃 The command pictures a rushed packing
🏰 Fortress refers to Jerusalem itself
📖 Jerusalem's safety was about to end

## 🪨 I Will Sling Out The Inhabitants Of The Land

A sling launches a stone hard and fast toward a target.

God pictures throwing the people out of their own land the same way.

This was not going to be a slow, gentle departure.

Exile would happen suddenly and with real force.

"That they may find it so" means they would finally feel what they ignored.

🪨 A sling launches a stone with force
💨 God pictures a sudden violent removal
⏱️ Exile would not happen slowly
📖 They would finally feel what they ignored

## ⛺ My Tabernacle Is Spoiled, And All My Cords Are Broken

Jeremiah speaks here as if he himself is a fallen tent.

"Tabernacle" in this verse simply means a tent.

Cords and curtains are parts of a simple tent.

Ropes held the fabric walls in place.

Every piece that once held his home together had snapped.

His children being gone describes exile as a kind of death.

No one was left to rebuild what had fallen apart.

⛺ Jeremiah pictures himself as a fallen tent
🪢 Cords and curtains held the tent together
💔 His children being gone felt like death
📖 No one was left to rebuild it

## 🐑 The Pastors Are Become Brutish

"Pastors" here means the shepherds, the kings and priests meant to lead.

"Brutish" means acting without sense, like an animal.

These leaders had stopped seeking God's guidance.

Because the shepherds failed, the whole flock scattered.

Bad leadership at the top always reaches the people at the bottom.

🐑 Pastors means the nation's shepherds
🐂 Brutish means acting without sense
🙅 These leaders stopped seeking God
📖 Bad leaders scatter the whole flock

# Jeremiah 10:23-25
# 🙏 O LORD, Correct Me, But With Judgment
---
## 🧭 The Way Of Man Is Not In Himself

This line admits something humbling in the middle of a hard chapter.

No person can fully control the direction of his own life.

"That walketh to direct his steps" pictures someone steering their own path alone.

Even the strongest human effort cannot guarantee the outcome.

Real security was never going to come from self reliance.

🧭 This line admits something humbling
🚶 No person fully controls his own path
💪 Human effort cannot guarantee the outcome
📖 Security was never found in self reliance

## ⚖️ O LORD, Correct Me, But With Judgment

Jeremiah is not asking to avoid discipline altogether.

He is asking for correction measured by real justice.

He does not want it driven by raw anger.

"Lest thou bring me to nothing" shows real fear of being wiped out.

This is a plea for correction instead of ruin.

Even a prophet needed to ask God for that kind of mercy.

⚖️ Jeremiah asks for justice, not avoidance
🔥 He wants judgment, not raw anger
🙏 He fears being completely wiped out
📖 He asks for correction, not destruction

## 🌍 Pour Out Thy Fury Upon The Heathen That Know Thee Not

The prayer suddenly shifts direction in this verse.

Jeremiah now asks God's anger to fall on the nations instead of Judah.

"That know thee not" describes people with no relationship to God at all.

"That call not on thy name" describes people who never even tried to pray.

Jeremiah wants mercy for his own people.

He wants justice for their attackers.

🔄 The prayer suddenly shifts direction
🌍 Jeremiah asks judgment to fall on nations
🙈 Know thee not means no relationship with God
📖 Jeremiah wants mercy for his own people

## 🍽️ They Have Eaten Up Jacob, And Devoured Him

"Eaten up" and "devoured" both picture a nation swallowed whole.

"Jacob" here stands for the whole nation descended from him.

This same devouring image already appeared earlier in the book.

The chapter that opened with a warning against idols ends with a prayer.

Even in judgment, Jeremiah still turns his eyes back toward God.

🍽️ Eaten up pictures being swallowed whole
👤 Jacob stands for the whole nation
🔁 This image already appeared earlier
📖 The chapter ends turned back toward God
`.trim();

export const JEREMIAH_TEN_PERSONAL_SECTIONS = parseJeremiahTenRawNotes(JEREMIAH_TEN_RAW_NOTES);
