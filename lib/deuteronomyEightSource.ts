export type DeuteronomyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyEightRawNotes(rawText: string): DeuteronomyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 8:${startVerse}` : `Deuteronomy 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 8 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_EIGHT_RAW_NOTES = `# Deuteronomy 8:1-2
# 📜 Remembering The Wilderness Years
---
## 📜 Observe To Do That Ye May Live

Moses opens with a single command word, observe.

That word means guard carefully, not just hear once.

Three promises follow obedience directly, life, growth, and the land itself.

None of the three arrive automatically.

📜 Observe means guard carefully
🌱 Obedience was tied to life and growth
🗺️ The land itself was part of the promise
➡️ None of it came automatically

---
## 🧭 Remember All The Way Which The Lord Thy God Led Thee

To remember here means more than recalling facts.

It means letting the past shape how you live now.

Forty years in the wilderness was not wasted time.

God used it to test what was really in Israel's heart.

🧭 Remember means let the past shape you
⏳ Forty years was not wasted time
🔍 God tested what was in their heart
📖 The wilderness was a classroom, not a delay

---
## 🧪 To Humble Thee, And To Prove Thee

"Humble" means to lower someone's pride until they depend on God again.

"Prove" means to test something to reveal what it is really made of.

God used hunger and hardship to strip away Israel's self reliance.

The test was never about punishment.

It revealed the truth already inside them.

👇 Humble means lowered pride and dependence
🧪 Prove means tested to reveal truth
🍞 Hunger stripped away self reliance
📖 The test revealed what was already there

# Deuteronomy 8:3-5
# 🍞 Bread And Every Word
---
## 🍞 Fed Thee With Manna, Which Thou Knewest Not

Manna was something Israel had never seen before this journey.

It appeared fresh on the ground each morning like a fine frost.

Neither Israel nor their fathers had any name for it beforehand.

God was teaching them to depend on food they could not explain.

🍞 Manna means bread Israel had never seen
❄️ It appeared fresh like morning frost
❓ No one had a name for it before
📖 Israel learned to depend on the unexplained

---
## 📜 Man Doth Not Live By Bread Only, But By Every Word

This line answers the real reason behind the hunger and the manna.

Physical bread keeps the body alive for a day.

Obedience to God's word sustains something bread cannot reach.

Jesus later quotes this exact verse in Matthew four.

He uses it to resist Satan in the wilderness.

🍞 Bread alone was never the full answer
📜 God's word sustains more than the body
⚔️ Jesus quoted this verse against Satan
➡️ The lesson outlasted the wilderness itself

---
## 👕 Thy Raiment Waxed Not Old Upon Thee

"Raiment" is an old word for clothing.

"Waxed old" means gradually wore out through everyday use.

For forty years of walking, Israel's clothes and sandals simply did not fail.

That small detail was still worth God preserving on purpose.

👕 Raiment is an old word for clothing
⏳ Waxed old means gradually wore out
🥾 Clothes and sandals lasted forty years
📖 God cared for even the smallest needs

---
## 🛠️ As A Man Chasteneth His Son

"Chasten" means to discipline someone out of love, not out of cruelty.

Think of a father correcting a child about to touch something dangerous.

The correction feels hard in the moment.

Its purpose is protection, not punishment for its own sake.

🛠️ Chasten means loving discipline
👨‍👦 Like a father protecting his child
🔥 Correction feels hard in the moment
📖 The purpose was protection, not punishment

# Deuteronomy 8:6-10
# 🌾 A Good Land
---
## 🚶 Keep The Commandments Of The Lord Thy God, To Walk In His Ways

Moses moves from looking backward to looking forward.

The first five verses explained why obedience mattered.

Now the command sets the pattern for the future.

Walk in his ways, and fear him.

🔙 The verses before this looked backward
🚶 Walk in his ways names the pattern
🙏 Fear him names the other half
➡️ A past lesson becomes a future instruction

---
## 💧 A Land Of Brooks Of Water, Of Fountains And Depths

This description directly answers the drought just survived in the wilderness.

Brooks, fountains, and springs meant water was no longer scarce or uncertain.

Depths that spring out of valleys and hills means underground springs feeding the land.

The land itself was the opposite of everywhere Israel had just walked.

💧 This land held real water, unlike the wilderness
🏞️ Brooks and fountains meant reliable water
⛰️ Springs fed valleys and hills naturally
📖 The land reversed forty years of scarcity

---
## 🌾 A Land Of Wheat, And Barley, And Vines, And Fig Trees, And Pomegranates

Moses names the actual crops waiting in this new land.

Wheat and barley meant daily bread.

Vines, fig trees, and pomegranates meant real fruit.

Olive trees for oil are named right after, in the very next verse.

This was not a vague promise.

It was a specific, familiar list a farmer could picture.

🍞 Named crops covered daily food
🍷 Grapes covered fruit and wine
🫒 Olive trees provided the region's oil
📖 The promise was specific, not vague

---
## 🍞 A Land Wherein Thou Shalt Eat Bread Without Scarceness

"Scarceness" means a shortage or a lack of enough.

This land promised food without that fear hanging over every meal.

The description goes further than crops alone.

Even the ground itself held iron in its stones and brass in its hills.

🍞 Scarceness means a real shortage
😌 No more fear of running out
⛏️ Stones held iron, hills held brass
📖 Richness went above and below ground

---
## 🙏 When Thou Hast Eaten And Art Full, Then Thou Shalt Bless The Lord Thy God

Moses attaches a command to one specific moment, right after the meal.

Blessing God was meant to follow satisfaction, not just hunger or crisis.

It is easy to pray when desperate.

This command asks for gratitude at the exact moment it becomes easiest to forget God.

🍽️ Blessing God was tied to a full stomach
🙏 Gratitude was commanded, not optional
😌 Fullness is when people forget fastest
📖 This verse sets up the warning ahead

# Deuteronomy 8:11-14
# ⚠️ The Danger Of Full Bellies
---
## ⚠️ Beware That Thou Forget Not The Lord Thy God

"Beware" is a strong word for pay close attention and guard yourself.

Moses just described real blessing, full bellies, good land, real wealth.

This warning arrives at the exact moment things start going well.

Forgetting God rarely happens during hardship.

It happens once life gets comfortable.

⚠️ Beware means guard yourself closely
🌾 The warning follows real blessing
😌 Comfort, not hardship, breeds forgetting
➡️ The danger arrives once life gets easy

---
## 🏠 Built Goodly Houses, And Dwelt Therein

"Goodly" means fine or well built, not just adequate.

For forty years, Israel lived in tents that moved with them constantly.

Permanent, comfortable houses would be a completely new experience.

The new comfort itself was never the real danger.

Forgetting where it came from was.

🏠 Goodly means fine and well built
⛺ Tents defined the last forty years
🆕 Permanent houses were something new
➡️ The comfort was not the real danger

---
## 💰 Thy Herds And Thy Flocks Multiply, And Thy Silver And Thy Gold Is Multiplied

Moses stacks four kinds of growth in a single verse.

Herds, flocks, silver, and gold all multiply at once.

Four kinds of growth together paint a picture of total prosperity.

Success this complete makes pride easy to justify.

🐄 Herds and flocks stand for growing wealth
💰 Silver and gold stand for growing riches
🔁 Four kinds of growth stack in one verse
📖 Total success makes pride easy to justify

---
## 📈 Then Thine Heart Be Lifted Up, And Thou Forget The Lord Thy God

"Heart lifted up" describes pride swelling until it crowds everything else out.

Moses names exactly what that pride leads to, forgetting the God who rescued them.

He specifically recalls where they came from, the house of bondage in Egypt.

Prosperity has a way of erasing memory of who provided it.

📈 Heart lifted up describes swelling pride
🚫 Pride crowds out memory of God
⛓️ House of bondage recalls Egypt directly
📖 Prosperity can erase memory of rescue

# Deuteronomy 8:15-16
# 🪨 Water From Flint
---
## 🐍 That Great And Terrible Wilderness, Wherein Were Fiery Serpents, And Scorpions

Moses names the specific dangers Israel actually survived.

"Fiery serpents" likely means venomous snakes whose bite caused burning pain.

The same danger was already described back in Numbers twenty one.

Scorpions and total drought added even more threats to an already brutal journey.

🐍 Fiery serpents means venomous, burning bites
🦂 Scorpions added another daily danger
🏜️ Drought meant no water for miles
➡️ These threats were real, not exaggerated

---
## 🪨 Who Brought Thee Forth Water Out Of The Rock Of Flint

"Flint" is an extremely hard stone, the last place anyone expects water.

This recalls the miracle already told in Exodus seventeen and Numbers twenty.

Moses struck a rock in the desert.

Water poured out where nothing should have been.

🪨 Flint is an extremely hard stone
💧 Water from rock was never natural
📜 This recalls Exodus and Numbers directly
📖 God provided when nothing else could

---
## 🎯 That He Might Humble Thee, And That He Might Prove Thee, To Do Thee Good At Thy Latter End

This verse repeats the purpose already named in verse two.

That purpose was to humble and to test.

One new phrase gets added here, to do thee good at thy latter end.

The hardship was never the final goal.

It was preparation aimed at Israel's future, not punishment for its own sake.

🔁 This repeats the purpose from verse two
🎯 Latter end means the future ahead
🧪 Testing was preparation, not punishment
📖 Hardship aimed at future good

# Deuteronomy 8:17-18
# 💪 Who Gives The Power To Get Wealth
---
## 💭 My Power And The Might Of Mine Hand Hath Gotten Me This Wealth

Moses puts the exact wrong thought into words before it can happen.

This is precisely the pride already warned against back in verse fourteen.

Crediting personal strength for wealth was the real coming temptation.

Naming a temptation clearly makes it harder to slip into unnoticed.

💭 Moses names the coming temptation directly
📈 This is verse fourteen's pride in full form
💪 Crediting self for wealth was the danger
➡️ Naming a temptation makes it easier to spot

---
## 💪 For It Is He That Giveth Thee Power To Get Wealth

Moses answers the false thought from the verse before it.

Even the ability to work, plan, and earn comes from God first.

"Power to get wealth" means the raw capacity to succeed, not the wealth itself.

The gift was never just the harvest.

It was the strength to produce it at all.

🔄 Moses answers the false thought immediately
💪 Power to get wealth means the ability itself
🎁 Even the capacity to earn was a gift
📖 The gift was strength, not just harvest

---
## 🤝 That He May Establish His Covenant Which He Sware Unto Thy Fathers

Israel's prosperity was never just for Israel's own comfort.

It served a larger purpose, keeping the promise sworn generations earlier to the fathers.

Wealth here functioned as proof that an ancient oath was still being kept.

Every full harvest quietly pointed back to a promise older than anyone alive.

📜 Prosperity served a covenant, not just comfort
🤝 The oath traced back to the fathers
🌾 Every harvest proved the promise active
📖 Wealth pointed back to an ancient oath

# Deuteronomy 8:19-20
# ☠️ The Warning Of Perishing
---
## 🚶 If Thou Do At All Forget The Lord Thy God, And Walk After Other Gods

Moses states this warning without softening it.

"Walk after other gods" means actively pursuing and following them, not a passing thought.

Forgetting God was never described as harmless or private.

The text ties it directly to worship and real allegiance.

⚠️ Moses states this warning plainly
🚶 Walk after means actively following
🚫 Forgetting God was never harmless
➡️ A shift in allegiance brings real consequences

---
## ⚖️ I Testify Against You This Day That Ye Shall Surely Perish

"Testify" is legal language, the same word used for evidence given in court.

Moses places this warning on the record, witnessed and undeniable.

No one could later claim they were never warned.

The consequence was stated plainly, not hidden in vague language.

⚖️ Testify means give formal legal evidence
📋 This warning went on the record
🚫 No one could claim ignorance later
📖 The consequence was stated plainly

---
## 💔 As The Nations Which The Lord Destroyeth Before Your Face, So Shall Ye Perish

Chapter seven already described the total destruction coming for the nations in Canaan.

Moses now warns Israel that the same fate applies to them.

Being chosen and loved, as chapter seven already explained, never meant being exempt from consequences.

Obedience, not status alone, decided who stayed in the land.

💔 Chapter seven described that same destruction
⚖️ Israel faced the identical warning
🚫 Being chosen never meant being exempt
📖 Obedience, not status, decided who remained
`.trim();

export const DEUTERONOMY_EIGHT_PERSONAL_SECTIONS = parseDeuteronomyEightRawNotes(DEUTERONOMY_EIGHT_RAW_NOTES);
