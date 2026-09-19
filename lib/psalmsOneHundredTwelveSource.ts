export type PsalmsOneHundredTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwelveRawNotes(rawText: string): PsalmsOneHundredTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+112:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 112 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+112:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+112:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 112 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 112,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 112:${startVerse}` : `Psalms 112:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 112 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWELVE_RAW_NOTES = `# Psalms 112:1-3
# 🙏 Blessed Is The Man That Feareth The LORD
---
## 🎶 Praise Ye The LORD

Psalm 112 opens with the exact same words as Psalm 111.

The two psalms are a matched pair.

Psalm 111 praised the LORD for his own works.

Psalm 112 now praises the kind of man that fear of the LORD produces.

Both psalms also share the same acrostic pattern in Hebrew.

Each line begins with the next letter of the alphabet.

🎶 Praise ye the LORD opens Psalm 111 too

👥 The two psalms form a matched pair

📜 One praises God, one praises his follower

📖 Both share the same Hebrew acrostic pattern

## 🙏 Blessed Is The Man That Feareth The LORD

"Feareth" means holding God in deep reverence, not being afraid of him.

Psalm 111 already called this fear the beginning of wisdom.

This psalm now shows what a life built on that fear looks like.

The blessing described is not a private feeling.

It plays out in a person's family, wealth, and reputation.

🙏 Feareth means deep reverence, not terror

🧠 Psalm 111 called fear the start of wisdom

🏡 This psalm shows fear of God lived out

📖 Blessing shows up in real, visible ways

## 😊 That Delighteth Greatly In His Commandments

"Delighteth" means finding real joy in something, not just tolerating it.

A person can obey rules out of pure duty alone.

This verse describes something different.

The commandments themselves become a source of pleasure.

That kind of delight cannot be faked for very long.

😊 Delighteth means finding real joy

📏 More than obeying out of duty

💛 Commandments become a source of pleasure

➡️ This joy cannot be faked for long

## 👨‍👩‍👧 His Seed Shall Be Mighty Upon Earth

"Seed" is an old word for children and descendants.

"Mighty" here points to strength, influence, and a good standing in the community.

Ancient Israel valued a strong family line as a visible sign of God's favor.

Children were seen as a legacy that outlived a person's own life.

👨‍👩‍👧 Seed means children and descendants

💪 Mighty points to strength and standing

🏛️ A strong family line was a visible blessing

📖 Children carried a legacy forward

## ✅ The Generation Of The Upright Shall Be Blessed

"Upright" describes people who live rightly before God.

"Generation" here means the entire line of people who share that same character.

The blessing is not tied to one lucky person.

It follows a whole pattern of life passed down through a family.

✅ Upright means living rightly before God

👨‍👩‍👧‍👦 Generation means the whole family line

🔄 Blessing follows a pattern of life

📖 Not luck, but character passed down

## 💰 Wealth And Riches Shall Be In His House

"House" here means a household, not just a building.

This line reads like a general proverb about the righteous life, not a guaranteed formula.

Psalms and Proverbs often describe the normal shape of a godly life this way.

They are not promising every godly person will become rich.

💰 House means a household, not a building

📜 This reads as a general proverb

⚖️ Not a guaranteed formula for wealth

📖 Describes the normal shape of a godly life

## ♾️ His Righteousness Endureth For Ever

This exact phrase already described the LORD himself in Psalm 111.

There, it was God's own righteousness that endured for ever.

Here, the same words describe a man who fears God.

A godly life mirrors the very character of the God it follows.

♾️ Same phrase used for God in Psalm 111

🪞 A godly man mirrors God's own character

🔁 The two psalms echo each other on purpose

📖 Righteousness that lasts is borrowed, not invented

# Psalms 112:4-6
# 🕯️ Unto The Upright There Ariseth Light In The Darkness
---
## 🕯️ There Ariseth Light In The Darkness

Darkness in the Psalms often pictures trouble, confusion, or grief.

"Ariseth" means the light comes up on its own, like a sunrise.

The upright person is not promised a life with no darkness at all.

Instead, light is promised to break through whatever darkness comes.

🕯️ Darkness pictures trouble or grief

🌅 Ariseth pictures a sunrise breaking through

🙏 Darkness still comes to the upright

📖 Light is promised inside the darkness

## 💛 He Is Gracious, And Full Of Compassion, And Righteous

This exact description of the LORD appeared already in Psalm 111.

There, God himself was called gracious and full of compassion.

Here, those same three words describe a man instead.

The upright person is being described as reflecting God's own character.

💛 Same words described God in Psalm 111

🪞 Now they describe a man instead

🎯 A reflection of God's own character

📖 Godliness means imitating God

## 🤲 A Good Man Sheweth Favour, And Lendeth

"Sheweth" is an older spelling of shows.

"Favour" means generosity, especially kindness shown without expecting equal payback.

Old Testament law told Israel to lend to the poor without charging interest.

Lending here is an act of mercy, not a business deal.

🤲 Sheweth means shows

🎁 Favour means generosity without expecting payback

📜 The law banned interest on poor loans

➡️ Lending here is mercy, not business

## 🧭 He Will Guide His Affairs With Discretion

"Affairs" means the practical, everyday matters of life and work.

"Discretion" means careful, wise judgment.

Generosity in this psalm is not the same as carelessness.

A godly person gives wisely instead of giving foolishly.

🧭 Affairs means everyday matters of life

🧠 Discretion means careful, wise judgment

⚖️ Generosity is not the same as carelessness

➡️ Wisdom and giving go together here

## 🏔️ Surely He Shall Not Be Moved For Ever

"Moved" pictures something being shaken loose from its foundation.

The image is of a tree or a building that will not topple.

Circumstances can shake a person without actually uprooting them.

This verse promises the second kind of stability, not a life free of storms.

🏔️ Moved pictures being shaken loose

🌳 Like a tree that will not topple

🌪️ Storms can come without uprooting him

➡️ Stability, not a storm free life

## 🕯️ The Righteous Shall Be In Everlasting Remembrance

"Remembrance" means being kept alive in other people's memory.

Many people are forgotten within a generation or two of their death.

This verse promises the opposite for the righteous.

Their legacy outlasts the ordinary fade of memory over time.

🕯️ Remembrance means living on in memory

⏳ Most people fade from memory quickly

👥 The righteous are promised the opposite

📖 A legacy that outlasts time

# Psalms 112:7-8
# 🛡️ His Heart Is Fixed, Trusting In The LORD
---
## 📰 He Shall Not Be Afraid Of Evil Tidings

"Tidings" is an old word for news or a report.

"Evil tidings" means bad news, the kind that would normally cause panic.

This verse is not claiming bad news will never come.

It claims the righteous person will not be controlled by fear of it.

📰 Tidings means news or a report

😨 Evil tidings means bad news

🙏 Bad news is not ruled out

📖 Fear of it is ruled out instead

## 🛡️ His Heart Is Fixed, Trusting In The LORD

"Fixed" pictures something firmly anchored in place.

An anchored heart does not drift with every rumor or setback.

The anchor named here is specific.

Trust is placed in the LORD, not in circumstances staying calm.

🛡️ Fixed pictures something firmly anchored

⚓ An anchored heart does not drift

🌊 Circumstances are not the anchor

📖 The LORD himself is the anchor

## 🏛️ His Heart Is Established

Hebrew poetry often repeats one idea using slightly different words.

Verse seven already said his heart was fixed.

This line repeats that same idea using the word established instead.

The repetition itself is doing the teaching here.

🏛️ Established repeats the idea of fixed

🔁 Hebrew poetry often repeats an idea twice

📜 Same steadiness, stated a second way

📖 Repetition adds weight to the point

## 👀 Until He See His Desire Upon His Enemies

This phrase does not describe personal revenge.

It pictures someone confident enough to watch a conflict resolve without panic.

The confidence comes from trusting God's justice, not from plotting payback.

Fear of enemies has already been ruled out earlier in this same verse.

👀 Pictures confidence, not personal revenge

⚖️ Trust in God's justice, not plotting

🚫 Fear of enemies was already ruled out

➡️ Confidence, not vengeance, is the point

# Psalms 112:9-10
# 👑 His Horn Shall Be Exalted With Honour
---
## 🤲 He Hath Dispersed, He Hath Given To The Poor

"Dispersed" means scattered generosity, given out freely in many directions.

This is not one large gift given once.

It pictures a habit of ongoing giving to those in need.

The apostle Paul quotes this exact line centuries later.

He uses it in Second Corinthians to describe cheerful, generous giving.

🤲 Dispersed means generosity scattered freely

🔄 A habit, not a single gift

📜 Paul quotes this line in Second Corinthians

📖 An Old Testament verse describing New Testament giving

## 👑 His Horn Shall Be Exalted With Honour

A "horn" in the ancient world was a symbol of strength and dignity.

The image comes from an animal like an ox or a ram.

Its horn was both its weapon and its pride.

"Exalted with honour" means lifted up and given public respect.

This verse repeats his righteousness endureth for ever one more time.

That phrase has now described both God and this man.

The generous man's honor grows because his righteousness never runs out.

👑 Horn symbolizes strength and dignity

🐂 Pictured like an animal's horn

⬆️ Exalted with honour means publicly lifted up

📖 Lasting righteousness produces lasting honor

## 😠 The Wicked Shall See It, And Be Grieved

"Grieved" here means bitterly displeased, not sorrowful in a gentle way.

The wicked person watches the righteous man blessed, honored, and secure.

That sight itself becomes painful to someone who resents it.

Envy is being pictured as a kind of self inflicted suffering.

😠 Grieved means bitterly displeased

👀 The wicked watches the righteous blessed

💔 That sight causes real pain

➡️ Envy is suffering turned inward

## 😤 He Shall Gnash With His Teeth, And Melt Away

"Gnash" means grinding the teeth together in rage or anguish.

"Melt away" pictures something solid wasting down to nothing.

This is the exact opposite of the righteous man in verse six.

He was promised he shall not be moved for ever.

The wicked person gets no such stability.

😤 Gnash means grinding teeth in rage

💧 Melt away pictures wasting to nothing

🏔️ Opposite of the righteous man's stability

➡️ No anchor holds the wicked in place

## 💨 The Desire Of The Wicked Shall Perish

This closing line answers the psalm's opening line.

The righteous man delighted greatly in God's commandments.

The wicked man's own desires are what finally destroy him.

Psalm one closes with almost this same sentence, the way of the ungodly shall perish.

These two psalms bookend the whole Psalter with the same warning.

💨 Desire here means the wicked man's own wants

🔁 Answers the psalm's opening line

📜 Psalm one closes with nearly the same words

📖 A warning bookends the whole Psalter
`.trim();

export const PSALMS_ONE_HUNDRED_TWELVE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwelveRawNotes(
  PSALMS_ONE_HUNDRED_TWELVE_RAW_NOTES
);
