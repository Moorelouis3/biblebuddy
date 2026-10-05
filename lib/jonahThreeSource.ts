export type JonahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJonahThreeRawNotes(rawText: string): JonahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JonahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jonah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jonah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jonah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Jonah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jonah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jonah 3:${startVerse}` : `Jonah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jonah 3 sections, received " + sections.length);
  }

  return sections;
}

const JONAH_THREE_RAW_NOTES = `# Jonah 3:1-4
# 🔄 Jonah Gets A Second Chance
---
## 🔁 The Word Of The LORD Came Unto Jonah The Second Time

This exact command had already come to Jonah once before.

Chapter one ended with Jonah running from it instead of obeying.

God does not send a new prophet to replace him.

He sends the same word to the same man again.

Failure did not end Jonah's calling.

He simply called him back to it.

🔁 The command repeats word for word
🏃 Jonah had already run from it once
🎯 God sends no replacement prophet
📖 A failed calling can still be renewed

## 🏛️ Arise, Go Unto Nineveh, That Great City

Nineveh was the capital city of the Assyrian Empire.

Assyria was the most feared military power of that era.

"Great" here describes size and power, not moral goodness.

To Jonah, this was the capital of a nation he despised.

God sends him straight into the enemy's own capital.

🏛️ Nineveh was Assyria's capital city
⚔️ Assyria was the feared regional superpower
📏 Great describes size, not goodness
➡️ Jonah is sent to a hated enemy

## 📋 Preach Unto It The Preaching That I Bid Thee

A prophet's job was never to share his own opinion.

God tells Jonah exactly what to say before he says it.

Last time Jonah ran rather than deliver a message like this.

This time he is given no room to improvise.

The words belong to God, not the messenger.

📋 God dictates the exact message
🚫 Jonah cannot add his own opinion
🏃 Last time he ran from this duty
📖 The words are God's, not Jonah's

## 🚶 So Jonah Arose, And Went Unto Nineveh

In chapter one, Jonah arose and fled the opposite direction.

Here the same verb describes him arising and obeying instead.

Tarshish was west, away from Nineveh entirely.

This time he walks straight toward the city he was told to warn.

The exact words that once described his flight now describe his obedience.

🏃 Chapter one had him fleeing west
🧭 Tarshish was the opposite direction entirely
🚶 This time he walks straight to Nineveh
📖 The same verb now describes obedience

## 🏙️ Nineveh Was An Exceeding Great City Of Three Days' Journey

Ancient cities were often measured by how long it took to cross them.

"Three days' journey" describes walking through the city itself.

It likely includes the surrounding villages that supported it, not just the inner walls.

Nineveh was one of the largest cities in the ancient world.

A journey that long shows how impossibly big Jonah's assignment felt.

📏 Cities were measured by travel time
🚶 Three days describes crossing the whole area
🏙️ Nineveh was one of the largest ancient cities
➡️ The size made Jonah's task feel impossible

## 🚶 Jonah Began To Enter Into The City A Day's Journey

Jonah did not wait until he reached the city center to start preaching.

After about one day of walking, he already began crying out his message.

A city this large had crowds everywhere, not only at its center.

One day's walk was already enough to put the warning in front of thousands.

🚶 He started preaching after one day's walk
🏙️ He never reached the city center first
👥 Crowds filled the city everywhere
📖 One day was enough to warn thousands

## 🔢 Yet Forty Days, And Nineveh Shall Be Overthrown

"Forty days" is a number that shows up again and again in Scripture.

Forty days of rain once brought the flood.

Israel wandered the wilderness for forty years as well.

The number marks a fixed period of testing before something changes.

"Overthrown" means completely destroyed, not merely punished.

Jonah delivers a warning with a deadline, not a verdict already carried out.

🔢 Forty often marks a time of testing
🌧️ Forty days of rain brought the flood
🏜️ Israel wandered the wilderness forty years
📖 The warning carries a deadline, not a verdict

# Jonah 3:5-6
# 😨 Nineveh Believes And Mourns
---
## 🌍 The People Of Nineveh Believed God

Nineveh had no covenant history with the God of Israel.

They worshiped their own gods long before Jonah ever arrived.

Yet a single warning from a foreign prophet was enough to convince them.

Israel itself often ignored prophets who spoke for generations.

A whole pagan city believed faster than God's own people often did.

🌍 Nineveh worshiped its own gods before Jonah
👤 One foreign prophet's warning was enough
📉 Israel often ignored its own prophets
📖 A pagan city believed faster than Israel

## 🍽️ Proclaimed A Fast, And Put On Sackcloth

A fast meant the whole city stopped eating on purpose.

Going without food was a way to show they were serious.

Sackcloth was a rough, scratchy material, nothing like normal clothing.

Wearing it was a public signal of grief and humility.

Both actions told the same story without saying a word.

🍽️ Fasting meant going without food on purpose
🧵 Sackcloth was rough, uncomfortable material
😔 Wearing it signaled public grief and humility
➡️ Both actions spoke without saying a word

## 👑 From The Greatest Of Them Even To The Least Of Them

This response was not limited to the poor or the desperate.

It reached the wealthiest and most powerful people in the city too.

No social class excused itself from this fast.

The warning united an entire city, top to bottom.

👑 Even the wealthy and powerful joined in
🧑‍🌾 The poor joined in as well
🚫 No class excused itself from the fast
📖 The warning united the whole city

## 🏙️ The King Of Nineveh

"King" here likely means the ruler of the city itself.

It likely does not mean the emperor of the whole Assyrian Empire.

Many ancient Near Eastern cities had local kings ruling under a greater empire.

Scholars still debate exactly which Assyrian ruler this describes.

Whoever he was, even he could not ignore Jonah's warning.

🏙️ King likely means ruler of the city
👑 Not necessarily the Assyrian emperor himself
🏛️ Local kings often ruled under bigger empires
📖 Even this ruler could not ignore the warning

## 🪑 He Arose From His Throne, And He Laid His Robe From Him

The throne represented his authority and power.

His royal robe marked him as separate from ordinary people.

He deliberately removed both the moment he heard the warning.

This was a public, visible act of humility, not a private feeling.

The most powerful man in the city humbled himself first.

🪑 The throne represented his authority
👗 The robe marked his royal status
🙇 He removed both in public humility
➡️ The most powerful man led by example

## 🔥 Covered Him With Sackcloth, And Sat In Ashes

Sitting in ashes was one of the strongest ancient signs of grief.

It meant lowering himself to the dirtiest, most humble position possible.

A king sitting in ashes was almost unthinkable in that culture.

He did not simply order his people to repent.

He repented in exactly the same way he asked everyone else to.

🔥 Ashes marked the deepest kind of grief
⬇️ He lowered himself to the humblest position
😮 This was unthinkable for a king
📖 He repented the same way he asked others

# Jonah 3:7-9
# 📜 The King's Decree To The City
---
## 📜 The Decree Of The King And His Nobles

A decree was an official command with the force of law.

Breaking it was not a small matter in this culture.

"Nobles" refers to the king's top officials and advisors.

Their names joined his, showing the whole government agreed together.

This was not one man's opinion but the city's official response.

📜 A decree carried the force of law
⚖️ Breaking it was never a small matter
🧑‍⚖️ Nobles were the king's top officials
📖 The whole government united behind it

## 🐑 Let Neither Man Nor Beast, Herd Nor Flock, Taste Any Thing

The fast was not limited to the human population.

Herds and flocks were also kept from food and water.

Animals kept visibly hungry made the city's mourning impossible to miss.

This showed just how urgently the whole city wanted to turn things around.

Even the animals carried the weight of the city's fear.

🐑 The fast included herds and flocks too
🚫 Animals were kept from food and water
👀 Visible hunger made the mourning impossible to hide
📖 Even the animals carried the city's urgency

## 🔊 Cry Mightily Unto God

This was not a quiet, private prayer.

"Mightily" means with full force and desperate urgency.

Picture a whole city crying out loudly at the same time.

Their fear was too large for silence.

Desperation drove the volume, not mere ritual.

🔊 Mightily means with full, desperate force
🏙️ The whole city cried out together
😱 Their fear was too large for silence
➡️ Desperation drove the volume, not ritual

## 🔄 Turn Every One From His Evil Way

Sackcloth and ashes alone would not have been enough.

The decree demanded an actual change in behavior, not just appearance.

"Evil way" means the actual choices and actions each person was making.

Real repentance always requires more than looking sorry.

The decree asked for changed lives, not just changed clothing.

🧵 Sackcloth alone was not enough
🔄 Evil way means actual choices and actions
❌ Looking sorry was never the real goal
📖 Changed lives mattered more than changed clothing

## ✋ The Violence That Is In Their Hands

"Violence" names a specific sin, not a vague feeling of guilt.

Assyria was historically known for extreme cruelty in war.

Ancient records describe Assyrian armies terrorizing conquered peoples.

The decree names the exact sin this city was most guilty of.

Nineveh's repentance targeted the sin it was actually known for.

✋ Violence names a specific sin
⚔️ Assyria was known for wartime cruelty
📜 Records describe their harsh conquests
📖 The decree targeted their actual sin

## ❓ Who Can Tell If God Will Turn And Repent

The king does not assume forgiveness is guaranteed.

"Who can tell" admits he cannot control the outcome.

When God "repents" here, it means changing a planned action.

It never means God did something wrong and needed to correct it.

The king can only hope, not demand, that God will relent.

❓ Who can tell admits real uncertainty
🔄 God repenting means changing a planned action
🚫 It never means God did wrong
➡️ The king can only hope, not demand

## 🎯 That We Perish Not

This is the reason behind every single part of the decree.

The fasting, the sackcloth, the ashes, all aimed at this one outcome.

Perishing meant the destruction Jonah had already promised.

Every action in the chapter has been leading toward avoiding it.

The whole city staked everything on the hope that mercy was still possible.

🎯 This is the decree's real goal
🧵 Every ritual aimed at this one outcome
💀 Perishing meant the promised destruction
📖 The city hoped mercy was still possible

# Jonah 3:10
# 🕊️ God Sees And Relents
---
## 👀 God Saw Their Works, That They Turned From Their Evil Way

God did not respond to the sackcloth or the ashes alone.

He looked at what actually changed in how they lived.

"Turned" describes a real change in direction, not just a feeling of regret.

The external signs only mattered because something real stood behind them.

God weighed their actions, not just their appearance.

👀 God looked past the sackcloth and ashes
🔄 Turned means a real change in direction
❤️ Something real stood behind the signs
📖 God weighed actions, not appearance

## 🔄 God Repented Of The Evil That He Had Said He Would Do Unto Them

This does not mean God made a mistake or sinned.

It means He chose not to carry out the disaster He had announced.

The forty day warning never had to run its course.

Jonah believed this city deserved only judgment.

God's mercy reached it anyway.

The book's whole point lands right here.

🔄 God chose not to carry out the disaster
⏳ The forty day warning never had to finish
💔 Jonah believed Nineveh deserved only judgment
📖 God's mercy reached it anyway
`.trim();

export const JONAH_THREE_PERSONAL_SECTIONS = parseJonahThreeRawNotes(JONAH_THREE_RAW_NOTES);
