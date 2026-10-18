export type JamesThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJamesThreeRawNotes(rawText: string): JamesThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JamesThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*James\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing James 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+James\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+James\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing James 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `James 3:${startVerse}` : `James 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 James 3 sections, received " + sections.length);
  }

  return sections;
}

const JAMES_THREE_RAW_NOTES = `# James 3:1-2
# 🎓 Teachers Answer To A Higher Standard
---
## Be Not Many Masters

"Masters" here means teachers, not people who own slaves.

James is warning against too many believers rushing into that role.

Teaching looks like an easy way to gain influence and respect.

James wants the reader to count the cost before stepping into it.

🎓 Masters here means teachers, not owners

⚠️ James warns against rushing into teaching

👀 Teaching looks like an easy path to respect

📖 Count the cost before stepping into it

## The Greater Condemnation

"The greater condemnation" means teachers face a stricter judgment than others.

That is because a teacher's words can lead whole groups astray.

More influence brings more responsibility for how that influence is used.

James is not discouraging teaching itself, only reckless teaching.

⚖️ Condemnation means a stricter judgment

📢 Bad teaching can lead many astray

💪 More influence brings more responsibility

➡️ Warns against careless teaching only

## If Any Man Offend Not In Word

"Offend" here means to stumble or sin, not simply to upset someone.

The tongue is usually the easiest place for anyone to slip.

Someone who can control their speech has already proven real self control.

James calls that person a perfect man, meaning mature, not sinless.

🗣️ Offend means to stumble or sin

🎯 The tongue is the easiest place to slip

💪 Controlling speech proves real maturity

📖 Perfect here means mature not sinless

## Able Also To Bridle The Whole Body

A bridle is the gear used to steer and control a horse.

This verse ties control over the tongue to control over the whole body.

Someone who can rule their speech usually has the rest of their life in hand.

James is about to build on that same picture with a horse and its bit.

🐴 Bridle means the gear that steers a horse

🔗 Controlling the tongue controls the whole body

🧭 Ruling speech usually means ruling the whole life

➡️ James now pictures a horse and its bit

# James 3:3-5
# 🐴 Small Things That Steer Something Big
---
## Bits In The Horses' Mouths

A bit is a small piece placed in a horse's mouth to steer it.

Horses are far stronger than the rider holding the reins.

Yet one small bit still decides where the horse goes.

James picks this picture because the tongue works the same way.

🐴 A bit is small but steers a horse

💪 Horses are far stronger than the rider

🗣️ The tongue works the same way

📖 Something small can steer something far bigger

## Turned About With A Very Small Helm

A helm is the rudder that steers a large ship.

Big ships still get pushed around by strong winds at sea.

Yet a small rudder in the steersman's hands turns the whole ship.

That is the second picture James gives before naming the tongue directly.

⛵ Helm means the rudder that steers a ship

🌊 Strong winds push against a great ship

🎯 A small rudder still turns the whole ship

➡️ James is building toward the tongue itself

## The Tongue Is A Little Member

"Member" here means a body part, like a hand or an eye.

The tongue barely weighs anything compared to the rest of the body.

The bit and the helm were small too, on purpose.

James has now connected all three pictures to the same point.

👅 Member means a body part

⚖️ The tongue barely weighs anything at all

🔗 Each picture here is small by design

📖 Small size does not mean small power

## Boasteth Great Things

"Boasteth" means brags or speaks with great pride.

The tongue takes credit for things far bigger than its actual size.

A few careless words can start a conflict among many people.

The size of the tongue never matches the size of its damage.

🗣️ Boasteth means brags with great pride

📢 A tiny body part claims a huge voice

💥 A few words can start a wide conflict

📖 Size and damage are never equal here

## How Great A Matter A Little Fire Kindleth

A tiny spark can burn down an entire forest.

"Kindleth" means sets alight or starts burning.

One careless sentence can do that same kind of damage.

James is about to name exactly how destructive that spark can be.

🔥 Kindleth means starts a fire

🌲 A tiny spark can burn a whole forest

💬 One careless sentence can do the same damage

➡️ James now names how destructive that fire gets

# James 3:6
# 🔥 The Tongue Is A Fire
---
## A World Of Iniquity

"Iniquity" means wrongdoing or sin of every kind.

Calling the tongue a world of iniquity means it holds a universe of sin inside it.

That is a massive claim about something so small.

James is not exaggerating when he says this.

📦 Iniquity means wrongdoing or sin

🌍 World of iniquity means sin without limit

⚖️ A huge claim about something tiny

📖 James means this claim fully

## Defileth The Whole Body

"Defileth" means makes unclean or corrupts.

A single wrong word can taint how a person's whole character is seen.

Hidden sin in the mouth spreads outward into everything else.

Nothing about a person stays separate from their speech.

🧼 Defileth means makes unclean

👤 One bad word can taint a whole character

🌊 Sin in the mouth spreads outward

📖 Speech and character are never separate

## Setteth On Fire The Course Of Nature

"Course of nature" means the whole ongoing pattern of a person's life.

The tongue does not only damage one moment.

It can scorch the whole shape of a life over time.

A single unchecked habit of speech can define someone's entire reputation.

🔥 Course of nature means a whole life pattern

⏳ The tongue can damage more than one moment

📜 It can shape someone's whole reputation

📖 Unchecked speech can define an entire life

## Set On Fire Of Hell

This fire does not start by accident.

James traces its true source all the way back to hell itself.

The damage from careless words is spiritual at its root.

That is the most serious warning in the chapter so far.

🔥 This fire has a real starting point

👹 James traces it back to hell itself

⚠️ The root of this damage is spiritual

📖 This is the chapter's most serious warning yet

# James 3:7-8
# 🐍 The One Thing No One Can Tame
---
## Hath Been Tamed Of Mankind

"Tamed" means brought fully under human control.

People have learned to control wild animals of every kind.

That mastery over nature is a real human achievement.

James sets this up on purpose before his next statement.

🐾 Tamed means brought under full control

🌍 People have tamed animals everywhere

🏆 That mastery is a real achievement

➡️ James is building to his next point

## The Tongue Can No Man Tame

No human being has ever fully mastered their own tongue.

That is a sharp contrast with verse seven, where people tame every wild creature.

Humans can cage a lion but still lose control of their own words.

The tongue is harder to rule than anything in the natural world.

🚫 No person has fully mastered their own tongue

🦁 People tame lions but not their own words

🐾 Wild animals submit easier than the tongue does

📖 The tongue outlasts every other attempt at taming

## An Unruly Evil

"Unruly" means resistant to control or correction.

Calling the tongue evil is not an exaggeration.

It names exactly what an uncontrolled tongue actually becomes.

Nothing about this verse is meant to be softened.

🚫 Unruly means resistant to control

⚠️ Calling it evil is not exaggeration

🎯 This names what it truly becomes

📖 Nothing here is meant to be softened

## Full Of Deadly Poison

The tongue is compared here to a venomous snake.

A snake does not need to bite often to cause fatal harm.

One poisonous sentence can spread harm long after it is spoken.

James wants the reader to respect how dangerous a careless word really is.

🐍 This compares the tongue to a venomous snake

☠️ A single bite can be fatal

💬 One harmful sentence can spread widely

📖 James wants real respect for this danger

# James 3:9-12
# 🌊 One Mouth, Two Opposite Streams
---
## Bless We God, Even The Father

"Bless" here means to speak well of and give thanks to someone.

Every believer uses their tongue to worship God as the Father.

That same mouth is about to be used a very different way.

James is building directly toward a jarring contrast.

🙏 Bless means to speak well and give thanks

🗣️ This tongue is used to worship God

⚠️ The same mouth is about to turn

➡️ James is building toward a sharp contrast

## Made After The Similitude Of God

"Similitude" means likeness or resemblance.

Every person, no matter how difficult, carries God's own likeness.

Cursing another person means attacking something made to resemble God himself.

That connection is exactly why James finds this contradiction so troubling.

👤 Similitude means likeness or resemblance

✨ Every person carries God's own likeness

💔 Cursing someone attacks God's own image

📖 That is why this contradiction troubles James

## Out Of The Same Mouth Proceedeth Blessing And Cursing

One mouth is never meant to carry two completely opposite messages.

Worship and insult should not come from the exact same source.

James names this problem plainly.

The inconsistency itself is the whole problem.

🗣️ One mouth carries two opposite messages

⚖️ Worship and insult should not share a source

🎯 James names this problem plainly

📖 The inconsistency itself is the problem

## Sweet Water And Bitter

A fountain only produces one kind of water, not two.

Think of a spring you trust for clean water.

It would be alarming if that spring suddenly ran bitter instead.

A mouth that blesses and curses is exactly that kind of broken fountain.

⛲ A fountain produces only one kind of water

💧 Think of a spring you trust completely

⚠️ A sudden change would be alarming

📖 A mixed mouth is a broken fountain

## Can The Fig Tree Bear Olive Berries

A fig tree can only grow figs, never olives.

A vine can only grow grapes, never figs.

Fruit always matches the nature of what produced it.

A person's words work by that same rule.

🌳 A fig tree can only grow figs

🍇 A vine can only grow grapes

🍎 Fruit always matches its source

📖 Words work by that same rule

# James 3:13-16
# 🧠 Two Kinds Of Wisdom
---
## Who Is A Wise Man And Endued With Knowledge

"Endued" means equipped or filled with something.

James opens with a direct question aimed at the reader.

Real wisdom is about to be defined by actions, not claims.

Anyone can claim to be wise.

That claim alone proves nothing.

🎁 Endued means equipped or filled with something

❓ James opens with a direct question

🎭 A claim to wisdom alone proves nothing

📖 Real wisdom will be defined by action

## His Works With Meekness Of Wisdom

"Conversation" here means someone's whole way of living, not just talking.

"Meekness" means strength that stays gentle instead of forceful.

True wisdom shows up in a person's actual conduct.

It is proven through humility, not through winning arguments.

🚶 Conversation here means a whole way of living

🕊️ Meekness means strength held gently

👀 Wisdom shows up in real conduct

📖 Humility proves wisdom, not arguments

## Bitter Envying And Strife

"Envying" means resenting what someone else has.

"Strife" means ongoing conflict or rivalry between people.

James calls this combination bitter on purpose.

It poisons relationships from the inside out.

💔 Envying means resenting what others have

⚔️ Strife means ongoing conflict or rivalry

🍋 James calls this combination bitter

📖 It poisons relationships from the inside

## Earthly, Sensual, Devilish

"Earthly" means focused only on this physical world.

"Sensual" means driven by bodily desire instead of truth.

"Devilish" means rooted in demonic influence, not human error alone.

All three words trace this kind of wisdom back to the same source.

🌍 Earthly means focused only on this world

👅 Sensual means driven by bodily desire

👹 Devilish means rooted in demonic influence

📖 All three trace back to one source

## Confusion And Every Evil Work

"Confusion" here means disorder, not simple misunderstanding.

Wherever envy and rivalry take root, chaos follows close behind.

That chaos is not a side effect.

It is the direct result instead.

False wisdom always produces this same pattern wherever it grows.

🌀 Confusion means real disorder, not misunderstanding

🔥 Envy and rivalry bring chaos with them

⚙️ Chaos is the direct result, not an accident

📖 False wisdom always produces this same pattern

# James 3:17-18
# 🕊️ Wisdom That Comes From Above
---
## First Pure

"Pure" means wisdom from above never mixes evil in with good.

James lists this quality first for a reason.

Every other trait on this list depends on this one being true.

Without purity, none of the other qualities can be trusted.

✨ Pure means never mixing evil with good

🥇 This quality is named first on purpose

🔗 Every other trait depends on this one

📖 Without purity nothing else can be trusted

## Peaceable, Gentle, And Easy To Be Intreated

"Peaceable" means it seeks peace instead of conflict.

"Gentle" means it deals with people kindly, not harshly.

"Easy to be intreated" means open to being reasoned with and corrected.

This wisdom can be approached without fear.

🕊️ Peaceable means it seeks peace

🤲 Gentle means it treats people kindly

👂 Easy to be intreated means open to correction

📖 This wisdom can be approached without fear

## Full Of Mercy And Good Fruits

"Mercy" means kindness shown to someone who does not deserve it.

"Good fruits" means the real actions that this wisdom produces.

This wisdom is not just an attitude kept inside someone's head.

It shows up as real kindness other people can actually see.

❤️ Mercy means kindness that is not deserved

🍎 Good fruits means the real actions produced

👀 Wisdom here is visible, not just internal

📖 Real kindness is the proof of this wisdom

## Without Partiality, And Without Hypocrisy

"Partiality" means favoring some people over others unfairly.

"Hypocrisy" means pretending to be something a person is not.

This wisdom treats every person the same way, every time.

It never wears one face in public and another in private.

⚖️ Partiality means unfair favoritism

🎭 Hypocrisy means pretending to be something false

🙌 This wisdom treats everyone the same

📖 It never wears two different faces

## The Fruit Of Righteousness Is Sown In Peace

"Sown" means planted, like a seed placed in the ground.

Righteousness here is treated like a harvest that grows over time.

That harvest only grows in a field that peacemakers have prepared.

James closes the chapter on the same theme he opened it with.

The tongue can build peace or destroy it completely.

🌱 Sown means planted like a seed

🌾 Righteousness is pictured as a harvest

🕊️ That harvest grows only where peace is made

📖 The tongue can build or destroy a peace
`.trim();

export const JAMES_THREE_PERSONAL_SECTIONS = parseJamesThreeRawNotes(JAMES_THREE_RAW_NOTES);
