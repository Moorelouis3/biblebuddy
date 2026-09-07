export type PsalmsFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyNineRawNotes(rawText: string): PsalmsFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+49:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 49 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+49:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+49:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 49 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 49,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 49:${startVerse}` : `Psalms 49:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 49 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_NINE_RAW_NOTES = `# Psalms 49:1-4
# 🎻 A Wise Saying For The Whole World
---
## 📢 Hear This, All Ye People

"Hear this" is a formal summons, not a casual invitation.

Wisdom psalms often open like a public sermon calling everyone to stop and listen.

The psalmist speaks as a teacher, not merely a poet.

This kind of opening line signals that something important is coming.

📢 Hear this is a formal summons

🎓 The psalmist speaks like a teacher

🛑 The audience is told to stop and listen

📖 Something important is coming next

## 🌍 All Ye Inhabitants Of The World

This message is not aimed at Israel alone.

The psalmist widens his audience to everyone on earth.

Wisdom about wealth and death applies to every nation.

Few psalms open with a claim this wide.

🌍 The audience widens beyond Israel

👥 Wisdom applies to every nation

⚖️ Wealth and death touch everyone equally

📖 This truth is for the whole world

## ⚖️ Both Low And High, Rich And Poor, Together

"Low and high" is a merism.

A merism uses two extremes to mean everyone in between.

Rich and poor repeats the same idea a second way.

This message is written for every social class at once.

⚖️ Low and high is a merism

🔤 A merism means everyone in between

💰 Rich and poor repeats the idea

📖 This message is for every class

## 🗣️ My Mouth Shall Speak Of Wisdom

The mouth speaking wisdom means the psalmist has thought this through, not simply reacting.

Wisdom here refers to skill for living well, not raw intelligence.

In the Old Testament, wisdom is a fear of the LORD applied to daily choices.

This introduction marks the psalm as a wisdom psalm.

🗣️ Mouth speaking wisdom means careful thought

📏 Wisdom means skill for living well

🙏 Wisdom starts with fearing the LORD

📖 This verse marks a wisdom psalm

## 🧠 The Meditation Of My Heart Shall Be Of Understanding

"Meditation" here means careful, repeated thinking, not emptying the mind.

The heart in Hebrew thought was the center of will and reasoning, not just emotion.

Speech and inner thought are paired here on purpose.

The psalmist is teaching with both his words and his mind.

🧠 Meditation means careful repeated thinking

❤️ The heart meant will and reasoning

🔗 Speech and thought are paired here

📖 Both mouth and mind teach together

## 👂 I Will Incline Mine Ear To A Parable

A parable here means a proverb or a wise saying, not a story with characters.

The Hebrew word is mashal, a short saying meant to be turned over in the mind.

Inclining the ear means leaning in to listen closely.

The psalmist listens first, then teaches.

👂 Parable means a proverb or saying

📜 Mashal is the Hebrew word here

👀 Inclining the ear means listening closely

📖 The psalmist listens before he teaches

## 🎻 I Will Open My Dark Saying Upon The Harp

A "dark saying" is a riddle, a truth whose meaning is not obvious at first.

The Hebrew word is chidah, the same word used for Samson's riddle in Judges.

Setting it to the harp means this wisdom was sung, not just spoken.

Music helped the whole community remember and carry a hard truth.

🎻 Dark saying means a hidden riddle

📜 Chidah is the Hebrew word used

🎶 The harp means this was sung

📖 Music helped people remember hard truth

# Psalms 49:5-9
# 💰 Wealth Cannot Buy Back A Life
---
## 😨 Wherefore Should I Fear In The Days Of Evil

"Days of evil" means seasons of danger or trouble, not everyday sin.

The psalmist asks why he should be afraid during those seasons.

His confidence is not in his own strength.

The answer comes later in the psalm, once he explains what he trusts instead.

😨 Days of evil means seasons of danger

❓ The psalmist asks why fear at all

💪 His confidence is not self reliance

📖 The full answer comes later in the psalm

## 👣 When The Iniquity Of My Heels Shall Compass Me About

"Heels" is a strange word here, and scholars read it a few different ways.

Many scholars believe it points to enemies who trip others up or supplant them.

The name Jacob comes from this same idea, since he grabbed Esau's heel at birth.

"Compass me about" means these enemies surround him on every side.

👣 Heels likely means those who trip others up

🤼 Jacob's name carries this same picture

🔄 Compass about means surrounded on every side

📖 Deceitful enemies are the real threat here

## 💰 They That Trust In Their Wealth

This names the exact group the psalmist is not afraid of.

Trusting in wealth means treating money like a source of real safety.

Money can buy comfort, but it cannot buy protection from death.

That gap is the whole argument of this psalm.

💰 This names the group he does not fear

🛡️ Trusting wealth means treating it as safety

⚰️ Money cannot buy protection from death

📖 That gap drives the whole psalm

## 📣 Boast Themselves In The Multitude Of Their Riches

"Boast" means bragging openly about how much a person owns.

"Multitude of riches" simply means a large amount of wealth.

In the ancient world, visible wealth was often read as proof of a person's worth.

The psalm quietly rejects that assumption before the reasons are given.

📣 Boast means bragging about wealth openly

🔢 Multitude of riches means a large amount

👑 Wealth was often read as personal worth

📖 The psalm rejects that idea outright

## 🚫 None Of Them Can By Any Means Redeem His Brother

"Redeem" means to pay a price that buys someone back from danger or death.

"Brother" here means a fellow human, not only a blood relative.

"Nor give to God a ransom for him" repeats the same idea a second way.

No amount of money can purchase another person's life from death.

🚫 Redeem means to pay and buy back

🤝 Brother means any fellow human here

💵 A ransom is the same idea repeated

📖 No price can purchase a life

## 💎 The Redemption Of Their Soul Is Precious

"Precious" here does not mean valuable in a good way.

It means the price required is impossibly high.

No sum of money is large enough to buy back a soul from death.

The cost is simply out of reach for any human being.

💎 Precious here means impossibly costly

🚫 No sum can cover this price

⚰️ The soul cannot be bought from death

📖 This cost is out of human reach

## ⏹️ It Ceaseth For Ever

"Ceaseth" means the effort stops and never starts again.

Every attempt to buy back a life from death eventually fails and gives up.

This is not one failed attempt among many successes.

It is a permanent, universal dead end.

⏹️ Ceaseth means the effort stops for good

🔁 Every attempt to buy a life fails

🚧 This failure is not occasional

📖 It is a permanent dead end

## ♾️ That He Should Still Live For Ever

This names the goal underneath all that wealth, escaping death completely.

No one in this psalm actually reaches that goal through money.

The desire for endless life is treated here as completely natural.

The psalm will later say only God can actually grant it.

♾️ The goal is living forever

🚫 Money never actually reaches that goal

❤️ Wanting endless life is treated as natural

📖 Only God can grant it later

## 🪦 And Not See Corruption

"Corruption" means the decay a body goes through after death.

"Not see corruption" means never experiencing that decay at all.

This exact phrase appears again in Psalm 16, later applied to Christ's resurrection.

Here it names a hope no wealthy person could ever purchase.

🪦 Corruption means the body's decay

👀 Not seeing it means escaping decay entirely

📜 Psalm 16 uses this same phrase

📖 Wealth could never purchase this hope

# Psalms 49:10-15
# 🐑 Death Levels The Wise And The Fool
---
## ⚰️ For He Seeth That Wise Men Die

This verse states the plain fact death does not skip the wise.

Being wise never bought anyone an exemption from dying.

The psalmist wants this fact faced directly, not softened.

Facing it honestly is the first step of real wisdom.

⚰️ Wise men die like everyone else

🚫 Wisdom never earns an exemption

👀 The psalmist faces this fact directly

📖 Facing death honestly is real wisdom

## 🐂 Likewise The Fool And The Brutish Person Perish

"Brutish" comes from a Hebrew word related to cattle or beasts.

It describes a person who lives without any real spiritual understanding.

Wise, foolish, and brutish all end at the very same grave.

Death is the one place status never protects anyone.

🐂 Brutish relates to the word for cattle

🧠 It means no spiritual understanding at all

⚖️ Wise and foolish share the same grave

📖 Death is where status stops mattering

## 🏦 And Leave Their Wealth To Others

Every fortune eventually passes into someone else's hands.

The person who earned it does not get to keep it.

This detail quietly undercuts the whole point of chasing riches.

What felt permanent while alive becomes someone else's the moment death arrives.

🏦 Wealth always passes to someone else

🙅 The owner never keeps it in the end

🎯 This undercuts the whole point of chasing riches

📖 Death hands your fortune to another

## 🏠 Their Houses Shall Continue For Ever

"Inward thought" means a private belief these people hold about themselves.

They quietly assume their family estate will simply last forever.

No family or house actually lasts forever, no matter how wealthy.

This assumption is the same folly the psalm keeps naming.

🏠 Inward thought means a private belief

♾️ They assume their estate lasts forever

🚫 No house actually lasts that long

📖 This belief is the same recurring folly

## 🏷️ They Call Their Lands After Their Own Names

Naming land after yourself was a real practice in the ancient world.

The hope was that your name would outlive you through the land itself.

This is an early attempt at the same thing a legacy tries to do today.

The psalm treats this attempt as ultimately empty.

🏷️ Naming land after yourself was real practice

📛 The goal was a name that outlives you

🏛️ It works like an ancient legacy attempt

📖 The psalm calls this attempt empty

## 👑 Man Being In Honour Abideth Not

"Abideth not" means does not remain or last.

Even someone at the very top of society still dies on schedule.

Honor and status do not slow death down even slightly.

This exact line returns again at the very end of the psalm.

👑 Abideth not means it does not last

⏳ Honor does not slow death down

🔁 This line returns at the psalm's end

📖 No status delays the grave

## 🐑 He Is Like The Beasts That Perish

This comparison would have stung a proud, powerful reader.

An animal dies without any legacy, memory, or meaning attached.

The psalm says an unwise, wealthy person ends up exactly the same way.

Understanding, not status, is what actually separates a person from an animal.

🐑 Beasts die without legacy or memory

😳 This comparison would sting a proud reader

🧠 Understanding is the real difference here

📖 Without it, status changes nothing

## 🙈 This Their Way Is Their Folly

"Folly" here does not mean a silly mistake.

It means building a whole life on a foundation that cannot hold.

Trusting wealth to outlast death is the folly being named.

The word choice here is deliberately harsh.

🙈 Folly means a life built on nothing

🏗️ Trusting wealth is the foundation that fails

⚠️ The word choice here is deliberately harsh

📖 A whole life gets misspent this way

## 🔁 Yet Their Posterity Approve Their Sayings

"Posterity" means the children and generations that come after someone.

Each generation keeps repeating the same mistaken values as the last.

Nobody stops to question the pattern before passing it on again.

"Selah" likely marks a pause here, letting singers sit with that warning.

🔁 Posterity means the generations that follow

👶 Each generation repeats the same mistake

🛑 Nobody questions the pattern before passing it on

📖 Selah pauses right on this warning

## 🐑 Like Sheep They Are Laid In The Grave

This pictures death leading people the way a shepherd leads a flock.

Sheep do not choose where they are led.

The image strips away any sense of control these people thought they had.

All that confidence in wealth ends in the same quiet pasture, the grave.

🐑 Death leads people like a shepherd

🚶 Sheep do not choose their own path

🎯 This strips away any real control

📖 Confidence in wealth ends in the grave

## 💀 Death Shall Feed On Them

Death is pictured here as a shepherd, but a cruel one.

Instead of feeding the sheep, this shepherd feeds on them.

The image reverses what a shepherd is supposed to do completely.

It is one of the darkest pictures of death in the whole psalm.

💀 Death is a shepherd here, but cruel

🔄 It feeds on the flock instead

😱 This reverses a shepherd's normal role

📖 It is the psalm's darkest image

## 🌅 The Upright Shall Have Dominion Over Them In The Morning

"Dominion" means ruling authority, a complete reversal of position.

"In the morning" often pictures a coming day when wrongs get set right.

Many readers connect this line to a future resurrection hope.

The people who trusted God end up ruling over those who trusted wealth.

🌅 In the morning pictures a future reversal

👑 Dominion means a complete reversal of power

✝️ Many read this as resurrection hope

📖 The faithful end up ruling the proud

## 🥀 Their Beauty Shall Consume In The Grave From Their Dwelling

"Beauty" here likely means status, glory, or an impressive appearance.

"Consume" means to be worn away or completely used up.

Whatever looked impressive while a person lived does not survive burial.

The grave erases the very thing these people trusted in.

🥀 Beauty means status or glory here

🔥 Consume means worn away completely

⚰️ Nothing impressive survives the grave

📖 The grave erases what they trusted

## ✝️ God Will Redeem My Soul From The Power Of The Grave

This directly answers the problem raised earlier in the psalm.

No human could redeem a soul back in verse seven.

God is named here as the one who actually can.

"Power of the grave" means the grip death holds over every living thing.

✝️ This answers the earlier problem directly

🚫 No human could do this in verse seven

✅ God is named as the one who can

📖 The grave's grip is not the final word

## 🙌 For He Shall Receive Me. Selah

"Receive" is the same word used for Enoch being taken by God.

It is also used later for Elijah being carried away instead of dying.

The psalmist is claiming that same kind of hope for himself.

"Selah" pauses right after the psalm's biggest claim so far.

🙌 Receive echoes Enoch being taken by God

🔥 It also echoes Elijah's departure later

🙋 The psalmist claims this hope himself

📖 Selah lands on the psalm's biggest claim

# Psalms 49:16-20
# 🧠 Understanding, Not Wealth, Is What Lasts
---
## 😌 Be Not Thou Afraid When One Is Made Rich

This command directly answers the question asked back in verse five.

The psalmist now speaks straight to the reader, not about others.

Watching someone else grow wealthy can quietly plant envy or fear.

This verse cuts that reaction off before it takes root.

😌 This answers the question from verse five

🗣️ The psalmist now speaks straight to the reader

😟 Watching others grow rich can plant envy

📖 This verse cuts envy off early

## 🏰 When The Glory Of His House Is Increased

"Glory of his house" means a family's growing wealth and reputation.

This is exactly the kind of household described earlier in the psalm.

From the outside, this growth can look like real success.

The next verse explains why that appearance does not hold up.

🏰 Glory of his house means growing wealth

👀 It looks like real success from outside

⚠️ It is the same household from earlier

📖 The next verse breaks that appearance

## 🎒 For When He Dieth He Shall Carry Nothing Away

Every possession a wealthy person owns simply stays behind at death.

Some ancient cultures buried people with belongings for an afterlife journey.

This verse quietly denies that any of it actually travels with a person.

"His glory shall not descend after him" repeats the same point a second way.

🎒 Nothing travels with a person at death

🏺 Some cultures buried goods for an afterlife

🚫 This verse denies any of it works

📖 Glory stays behind, it does not follow

## 🪞 Though While He Lived He Blessed His Soul

"Blessed his soul" means he congratulated himself while he was alive.

He told himself his choices were working out just fine.

Self approval is not the same thing as being right.

The psalm lets this claim stand only long enough to challenge it.

🪞 Blessed his soul means self congratulation

✅ He believed his own choices were fine

❌ Self approval is not the same as truth

📖 The psalm is about to challenge this

## 👏 And Men Will Praise Thee, When Thou Doest Well To Thyself

This line carries a bitter, ironic edge.

People flatter someone who spends freely on personal comfort.

That praise says nothing true about whether the person's life is actually going well.

Crowds cheering someone on is never proof that person is right.

👏 This line is meant to sound ironic

💬 People flatter self indulgent success

🚫 Praise from a crowd proves nothing true

📖 Applause is not the same as being right

## 🪦 He Shall Go To The Generation Of His Fathers

This phrase is a common Old Testament way of saying someone died.

It pictures joining ancestors who have already passed on.

Abraham and others are described the same way elsewhere in scripture.

The phrase softens the fact without changing what actually happens.

🪦 This phrase is an idiom for dying

👴 It pictures joining ancestors already gone

📜 Abraham is described this same way

📖 The soft phrase does not change the outcome

## 🌑 They Shall Never See Light

"Light" here means the light of the living world.

The grave is pictured as complete and total darkness.

There is no return trip described here, only a one way ending.

This is the psalm's plainest statement about how final death actually is.

🌑 Light means life in the world above

⚫ The grave is pictured as total darkness

🚪 There is no return trip described

📖 Death is stated here as final

## 🧩 Man That Is In Honour, And Understandeth Not

This repeats the line from verse twelve almost word for word.

One key phrase gets added this time, "understandeth not."

That missing understanding is named as the real problem all along.

Wealth was never the real danger, refusing to understand this truth was.

🧩 This repeats verse twelve almost exactly

➕ Understandeth not is the one addition

🎯 Missing understanding was the real problem

📖 That refusal, not wealth, was the danger

## 🐑 Is Like The Beasts That Perish

This closing line matches the ending of verse twelve exactly.

Repeating it this way frames the whole middle of the psalm.

Everything between these two matching lines explains why this comparison is true.

Wisdom, not wealth or status, is what separates a person from an animal.

🐑 This line closes the psalm's frame

🔁 It matches verse twelve exactly

📚 Everything between explains why it is true

📖 Wisdom is the real difference in the end
`.trim();

export const PSALMS_FORTY_NINE_PERSONAL_SECTIONS = parsePsalmsFortyNineRawNotes(PSALMS_FORTY_NINE_RAW_NOTES);
