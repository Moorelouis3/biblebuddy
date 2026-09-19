export type PsalmsOneHundredFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFifteenRawNotes(rawText: string): PsalmsOneHundredFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+115:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 115 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+115:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+115:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 115 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 115,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 115:${startVerse}` : `Psalms 115:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 115 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FIFTEEN_RAW_NOTES = `# Psalms 115:1-2
# 🙏 Not Unto Us O LORD
---
## 🙏 Not Unto Us O LORD

The psalm opens with Israel refusing to take credit for anything good that happened.

Repeating not unto us twice makes the refusal impossible to miss.

This line was likely sung after a victory the nation could not explain any other way.

The glory could easily have gone to Israel's army or its king.

Instead the whole nation points somewhere else immediately.

🙏 Not unto us repeats twice for emphasis

⚔️ Possibly written after a battle

👑 Israel could have claimed the glory

📖 The nation points to God instead

## 🏷️ But Unto Thy Name Give Glory

God's name means far more than a name we might use today.

In the Bible a name captures someone's whole character and reputation.

Giving glory to God's name means honoring exactly who he is.

Israel had just refused credit for itself in the line before this one.

Here the psalm names exactly where that credit belongs instead.

🏷️ Name means someone's whole character

👑 Glory belongs to God alone

🙅 Israel already refused the credit

📖 This line names where it belongs

## 💗 For Thy Mercy And For Thy Truth's Sake

Mercy here means God's steady love that does not run out.

Truth here means God's faithfulness, keeping every promise he made.

These two words appear together often in the Old Testament as a pair.

Together they describe the loyalty a family member shows, not simply being nice.

Israel is asking God to act for the sake of his own character, not because Israel earned it.

💗 Mercy means God's steady love

🤝 Truth means God's faithfulness

📜 The pair appears often together

📖 God acts for his own sake

## 🌍 Where Is Now Their God

Heathen is an old word for nations who did not worship the LORD.

These outside nations sometimes mocked Israel when hard times made God's help look doubtful.

Ancient nations judged a god's power by how well that nation was doing.

If Israel struggled, it looked to onlookers like Israel's God was absent or weak.

This taunt is exactly what the psalm is written to answer.

🌍 Heathen means nations without the LORD

😏 Outside nations sometimes mocked Israel

⚖️ A god's power was judged by results

📖 This taunt is what the psalm answers

# Psalms 115:3-4
# 🌌 But Our God Is In The Heavens
---
## 🌌 But Our God Is In The Heavens

This verse answers the taunt from the line before it.

Israel's God cannot be pinned to one place the way an idol sits in a temple.

Heaven here points to God's rule over everything, not just a location far away.

No enemy could point to a fallen statue and claim Israel's God had failed.

The answer to where is your God is that he is not confined anywhere.

☁️ Answers the taunt from before

🗺️ Heaven means God's rule everywhere

🏛️ Unlike an idol stuck in one place

📖 God cannot be shown as defeated

## 🕊️ He Hath Done Whatsoever He Hath Pleased

This line states God's total freedom to act.

Nothing outside God limits what he chooses to do.

An idol has no will of its own and cannot act at all.

The true God acts because he wants to, not because he has to.

This sets up the direct contrast with the powerless idols in the next verse.

🕊️ States God's freedom to act

🚫 Nothing outside God limits him

🪆 An idol cannot act at all

📖 Sets up the contrast with idols

## 🪙 Their Idols Are Silver And Gold

Idols here means statues made to represent a false god.

Silver and gold made an idol valuable but never made it alive.

Wealthy materials could not give a lifeless object any real power.

Many nations around Israel carved gods out of precious metal and stone.

Expensive does not mean powerful, no matter how the statue looked.

🪙 Idols are statues of false gods

💰 Silver and gold made them valuable

🪨 Valuable does not mean alive

📖 Expensive does not mean powerful

## 🔨 The Work Of Men's Hands

This phrase names exactly who actually made these gods.

A craftsman shaped the idol with ordinary human tools.

Something made by human hands cannot be greater than the person who made it.

This is the core argument this whole psalm makes against idol worship.

The true God made people.

Idols never made anyone.

🔨 A craftsman shaped this idol

🖐️ Made only by human hands

⚖️ Something made cannot outrank its maker

📖 God made people, idols made none

# Psalms 115:5-8
# 👄 They Have Mouths But They Speak Not
---
## 👄 They Have Mouths But They Speak Not

This section mocks idols by listing everything they cannot do.

A carved mouth looks real but produces no sound at all.

The same statue also has carved eyes that cannot actually see anything.

Ancient worshipers prayed to statues that could not hear a single word they said.

The craftsmanship could be beautiful and the idol would still be completely empty inside.

👄 Mouths carved but cannot speak

👀 Eyes carved but cannot see

🎭 Looks real but has no life

📖 Beautiful craftsmanship does not mean power

## 👂 They Have Ears But They Hear Not

The mockery keeps building organ by organ.

Carved ears cannot actually hear a single prayer spoken to them.

A carved nose cannot smell the incense burned right in front of it.

Ancient worship often included burning incense as an offering to the gods.

An idol misses even the offering made directly to it.

👂 Ears carved but cannot hear

👃 Nose carved but cannot smell

🕯️ Incense was a common offering

📖 The idol misses its own offering

## 🖐️ They Have Hands But They Handle Not

The list moves from the senses to the ability to act.

Carved hands cannot pick up or hold anything at all.

Carved feet cannot walk anywhere, even one single step.

The verse even adds that the idol cannot make a sound through its throat.

This final detail circles back to the mouth mentioned at the very start of the list.

🖐️ Hands carved but cannot hold

🦶 Feet carved but cannot walk

🗣️ Throat carved but makes no sound

📖 The list circles back to the mouth

## ⚠️ They That Make Them Are Like Unto Them

This line turns the mockery into a warning aimed at people, not statues.

Whoever trusts a lifeless idol slowly becomes just as lifeless.

A person who worships something deaf and blind can grow spiritually deaf and blind.

This is not a curse God places on people.

It is simply what happens.

What people worship shapes what people become.

⚠️ Turns mockery into a warning

🌀 Trusting a lifeless idol makes you lifeless

🙈 Worship shapes what a person becomes

📖 This is simply what happens

# Psalms 115:9-11
# 🤝 O Israel Trust Thou In The LORD
---
## 🤝 O Israel Trust Thou In The LORD

This verse opens a threefold call to trust God instead of idols.

Israel here means the whole nation, every tribe together.

Trust means relying on God completely, not just believing facts about him.

The command comes right after watching idol worship fail in every way.

The whole nation is called first before any smaller group is named.

🇮🇱 Israel means the whole nation

🤝 Trust means relying on God fully

🪞 Comes right after idols are exposed

📖 The whole nation is called first

## 🛐 O House Of Aaron Trust In The LORD

House of Aaron means the priests, descendants of Moses's brother Aaron.

Aaron was appointed Israel's first high priest at Mount Sinai.

Priests led Israel's worship and offered sacrifices on the nation's behalf.

Even the priests, who worked closest to God's presence, needed this same reminder.

No one is too close to God to still need to trust him.

🛐 Aaron was Israel's first priest

🕍 Priests led Israel's worship

🙏 Even priests needed this reminder

📖 No one is too close to skip trust

## 😌 Ye That Fear The LORD Trust In The LORD

This third group is defined only by reverence, not bloodline.

Fear of the LORD means deep reverence and awe, not being scared of God.

This likely includes non Israelites who had come to worship Israel's God.

The circle of trust now widens from the whole nation, to the priests, to anyone who reveres God.

Trust in the LORD is for everyone who honors him, not one tribe alone.

😌 Fear here means reverence not fright

🌍 Likely includes outsiders who worship God

📈 Trust circle widens with each verse

📖 God is for everyone who honors him

## 🔁 He Is Their Help And Their Shield

This exact sentence repeats after each of the three groups above.

Help means God acts on their behalf in real trouble.

Shield means God protects them from danger before it even arrives.

Repeating the same line three times in a row is a common feature of Hebrew poetry.

The repetition itself makes the promise impossible to forget.

🔁 Repeats after each group named

🆘 Help means God acts for them

🛡️ Shield means God protects them

📖 Repetition makes the promise memorable

# Psalms 115:12-15
# ✨ The LORD Hath Been Mindful Of Us
---
## ✨ The LORD Hath Been Mindful Of Us

Mindful means God has been paying attention and remembering his people.

This is not a distant, occasional glance.

The psalm shifts from a request into a settled confidence.

Verses one through eleven were a request.

This verse says God already answered.

God's attention never had to be earned in the first place.

👁️ Mindful means God is paying attention

🙏 Verses one through eleven were a request

✅ This verse says God already answered

📖 God's attention was never earned

## ⚖️ He Will Bless Them That Fear The LORD Both Small And Great

This repeats the same three groups from the verses just before it.

Small and great is an old way of saying every single person, no matter their status.

A poor farmer and a wealthy landowner receive the exact same blessing here.

Status inside Israel never changed how much of God's favor a person could receive.

The blessing is not ranked by importance.

⚖️ Repeats the same three groups

👥 Small and great means everyone

🌾 A farmer and a landowner are equal

📖 The blessing is not ranked

## 👶 The LORD Shall Increase You More And More

This is a promise about growing family and future generations.

You and your children ties this blessing to descendants, not just the people alive that day.

A growing family in the ancient world meant more workers, more protection, and more future.

This promise echoes God's covenant promise to Abraham about descendants as many as the stars.

The blessing was never meant to stop with the people standing there that day.

👶 A promise about future generations

👨‍👩‍👧 Ties the blessing to descendants

⭐ Echoes God's promise to Abraham

📖 The blessing was not meant to stop

## 🌌 Ye Are Blessed Of The LORD Which Made Heaven And Earth

This line names exactly which God is doing the blessing.

The LORD is described here as the maker of heaven and earth itself.

This directly contrasts the idols from earlier, which were only the work of human hands.

A God who made everything cannot be compared to a god that had to be carved.

This title for God sets up exactly what the next verses go on to describe.

🌌 Names which God is blessing them

🌍 Called the maker of heaven and earth

🪨 Unlike idols made by human hands

📖 Sets up what comes next

# Psalms 115:16-18
# 🌠 The Heaven, Even The Heavens, Are The LORD's
---
## 🌠 The Heaven, Even The Heavens, Are The LORD's

Heaven here means God's own domain, set apart above everything else.

Even the heavens repeats the same word for emphasis.

Ancient poetry often repeats a word this way to strengthen a point.

This line claims the sky itself as uniquely God's own possession.

No other god could make this same claim about anything, let alone the sky.

🌌 Heaven means God's own domain

🔁 The heavens repeats for emphasis

📜 A common feature of Hebrew poetry

📖 The sky is God's own claim

## 🌍 But The Earth Hath He Given To The Children Of Men

This half of the verse hands the earth over to people.

God keeps the heavens for himself and gives the earth to humanity to care for.

This echoes the very first command God gave in Genesis, to fill the earth and rule over it.

Children of men is an old way of saying humanity as a whole.

The earth was placed in human hands on purpose, not by accident.

🌍 Hands the earth to people

🧑‍🌾 Given to humanity to care for

📗 Echoes God's first command in Genesis

📖 The earth was placed here on purpose

## 🪦 The Dead Praise Not The LORD

Silence here is an old way of describing the grave.

Ancient Israel did not yet have the full picture of life after death.

This verse simply says the dead can no longer join in worship on earth.

That single fact becomes the reason for what the psalm says next.

Praise belongs to the living who still have breath.

🪦 Silence means the grave

🤷 Israel had a limited view of death

🙊 The dead cannot join in worship

📖 Praise belongs to the living

## 🔥 We Will Bless The LORD From This Time Forth

This is Israel's answer to the doubt about death from the line before it.

No individual person can praise God forever.

But someone among the living always can, generation after generation.

This turns the vow from one person's promise into the whole nation's ongoing job.

Forth means starting from this very moment and continuing on.

The nation commits to an unending job, not a single prayer.

🔥 Answers the doubt about death

🕰️ No one person praises forever

🌱 But someone always can, generation after generation

📖 The whole nation takes on this job

## 🎉 Praise The LORD

Praise the LORD here is one word in Hebrew, hallelujah.

This exact word closes many psalms as a final shout of celebration.

The whole psalm has moved from a taunt about God's existence to this single joyful word.

Every argument in this psalm has led toward this one closing command.

The psalm that opened by defending God's honor ends by simply celebrating him.

🎉 Hallelujah is one word in Hebrew

📚 Closes many psalms this same way

🔄 The psalm moves from defense to joy

📖 It ends by simply celebrating God
`.trim();

export const PSALMS_ONE_HUNDRED_FIFTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredFifteenRawNotes(
  PSALMS_ONE_HUNDRED_FIFTEEN_RAW_NOTES
);
