export type ProverbsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTenRawNotes(rawText: string): ProverbsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 10:${startVerse}` : `Proverbs 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 10 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TEN_RAW_NOTES = `# Proverbs 10:1-3
# 📜 The Proverbs Of Solomon Begin
---
## 📜 The Proverbs Of Solomon

A proverb is a short saying built to be remembered and repeated.

Chapters one through nine read like long connected poems about Wisdom herself.

Starting here the book shifts into hundreds of short standalone sayings.

Most of them stand alone, one verse holding a whole complete thought.

Reading one proverb at a time teaches more than rushing through many at once.

📜 A proverb is short and memorable

🔀 Chapters one through nine were connected poems

✂️ Chapter ten begins short standalone sayings

📖 Read one proverb at a time

---
## 👨 A Wise Son Maketh A Glad Father

A child's daily choices reach far beyond that child alone.

A wise son brings real joy into his father's life.

Wisdom in this book never means raw intelligence.

It means a life aimed at knowing and obeying God.

This proverb ties a parent's happiness to a child's character.

👨 A father's joy depends on his son

🧭 Wisdom means a life aimed at God

❤️ Character shapes a whole family

📖 This link is about character not luck

---
## 😢 A Foolish Son Is The Heaviness Of His Mother

Heaviness here means grief, a weight that presses down on someone.

A foolish son does not just embarrass his mother.

He brings a real, ongoing sorrow into her daily life.

The same choice that gladdens a father can crush a mother.

One child can bring two very different outcomes to the people who raised him.

⚖️ Heaviness means grief that presses down

😢 A foolish son brings ongoing sorrow

👩 His mother carries that weight daily

📖 One choice can affect a whole family

---
## 💰 Treasures Of Wickedness Profit Nothing

Wickedness here means gaining wealth through dishonest or sinful means.

Profit nothing does not mean the wealth simply disappears.

It means that wealth never actually secures what a person truly needs.

Money gained by sin cannot buy safety on the day it matters most.

💰 Wickedness means gaining wealth dishonestly

🚫 Profit nothing means it secures nothing real

⚖️ Sin cannot buy true safety

📖 What matters most is never for sale

---
## 🛟 Righteousness Delivereth From Death

This does not promise that righteous people never die.

Death here often pictures ruin, disaster, or being cut off from God.

This righteous life stands against the dishonest wealth from the first half of the verse.

One path leads nowhere useful, the other actually rescues someone.

⚰️ Death here often pictures ruin

🙏 Righteousness is set against dishonest wealth

🛟 One path actually rescues someone

📖 A godly life outlasts dishonest gain

---
## 🍞 The LORD Will Not Suffer The Soul Of The Righteous To Famish

Suffer here means allow, not endure.

Famish means to starve or go without what is needed to live.

This is a promise that God will not allow real need to go unmet.

It is not a promise that the righteous will never be hungry for a day.

It is a promise that God watches over their deepest needs.

🍞 Suffer here means allow

🍽️ Famish means to starve

🙏 God will not let real need go unmet

📖 God watches over deep needs, not every meal

---
## 💨 He Casteth Away The Substance Of The Wicked

Substance here means a person's wealth, property, and resources.

Casteth away pictures God actively emptying out what the wicked have gathered.

This is not random bad luck falling on them.

Scripture pictures it as a deliberate act of God.

💨 Substance means a person's wealth and goods

🌪️ Casteth away means actively emptied out

🙏 This is not random bad luck

📖 God is active in what the wicked lose

# Proverbs 10:4-7
# 🌾 Diligence, Blessing, And A Rotting Name
---
## 😴 He Becometh Poor That Dealeth With A Slack Hand

A slack hand pictures a hand that works loosely, without effort or care.

This is not about someone unable to work.

It describes someone who works but does not put real effort in.

Poverty here traces back to a daily habit, not simply bad circumstances.

😴 A slack hand means careless, weak effort

🙅 This is not about being unable to work

🔁 Poverty traces back to daily habits

📖 Small daily effort shapes the outcome

---
## 💪 The Hand Of The Diligent Maketh Rich

Diligent means steady, careful, and hardworking over time.

This is the direct opposite of the slack hand in the same verse.

The contrast is not about luck or talent.

It is about which kind of hand someone chooses to work with each day.

💪 Diligent means steady and hardworking

🔄 This is the opposite of a slack hand

🎲 The contrast is not about luck

📖 The choice is made daily

---
## ☀️ He That Gathereth In Summer Is A Wise Son

In this farming culture, summer was the short window to gather the harvest.

Gathering in summer meant working while the crop was actually ready.

A son who did this understood timing, not just effort.

Wisdom here means acting when the moment actually calls for it.

☀️ Summer was the short window to gather crops

🌾 Gathering meant working while the harvest was ready

⏰ Wisdom includes understanding timing

📖 Acting at the right moment is wisdom

---
## 😴 He That Sleepeth In Harvest Is A Son That Causeth Shame

Harvest was the busiest, most urgent season on a farm.

Sleeping through it meant letting the family's food supply rot in the field.

Shame here was not private embarrassment.

In this culture, a family's honor was tied to how its members were seen to work.

😴 Sleeping through harvest wasted the whole crop

🌾 Harvest was the most urgent season

👀 Family honor depended on visible effort

📖 Laziness at the wrong moment brings real shame

---
## 🙌 Blessings Are Upon The Head Of The Just

In this culture, blessing was often pictured as oil poured out on the head.

The phrase upon the head means the blessing rests visibly on that person.

A just person is someone who lives rightly, especially toward other people.

This is not a hidden reward, it is something others can see resting on them.

🙌 Blessing was pictured as oil on the head

👑 Upon the head means it rests visibly

⚖️ Just means living rightly toward others

📖 This blessing is visible, not hidden

---
## ⚔️ Violence Covereth The Mouth Of The Wicked

Covereth here pictures violence filling up someone's speech, almost like a mask.

A wicked person's words end up shaped by harm rather than truth.

This verse pairs a visible blessing with a mouth full of violence.

The contrast is between a life others can bless and a mouth others must fear.

⚔️ Covereth pictures violence filling their speech

🎭 Their words are shaped by harm

🙌 This is contrasted with the just person's blessing

📖 One life is blessed, the other feared

---
## 🌟 The Memory Of The Just Is Blessed

In a culture without photographs or written records for most people, being remembered mattered deeply.

A name that lived on after death was treated as a real kind of legacy.

The just person's memory becomes a source of blessing to those who remember them.

This is a promise about lasting reputation, not present comfort.

🌟 Being remembered mattered deeply in this culture

📜 A lasting name was a real legacy

🙌 Their memory becomes a blessing to others

📖 This is a promise about lasting reputation

---
## 🪦 The Name Of The Wicked Shall Rot

Rot pictures something once solid slowly decaying into nothing.

A name, in this culture, meant a person's whole reputation and legacy.

The wicked person's name does not simply fade, it decays into something unpleasant.

This is the exact opposite ending compared to the just person in the line before it.

🪦 Rot pictures slow decay into nothing

📛 A name meant a person's whole legacy

🤢 Their reputation decays into something unpleasant

📖 This is the opposite ending

# Proverbs 10:8-10
# 🗣️ The Prating Fool Falls
---
## 📚 The Wise In Heart Will Receive Commandments

Heart in this book usually means the center of a person's will and choices, not just emotion.

Receiving commandments means actually welcoming correction and instruction, not merely hearing it.

A wise person treats being taught as a gift, not an insult.

This willingness to be corrected is presented as proof of real wisdom.

📚 Heart means the center of a person's will

🎁 Receiving instruction means welcoming it

🙌 Correction is treated as a gift

📖 Willingness to be taught proves real wisdom

---
## 🗯️ A Prating Fool Shall Fall

Prating means talking constantly and carelessly, often without real content.

A prating fool is the opposite of the wise person from the first half of this verse.

This exact line about a prating fool appears again two verses later in this chapter.

Careless talk here is not harmless, it eventually brings the talker down.

🗯️ Prating means talking constantly and carelessly

🔄 This is the opposite of the wise person

🔁 This exact line repeats again in verse ten

📖 Careless talk eventually brings someone down

---
## 🛤️ He That Walketh Uprightly Walketh Surely

Walking is a common picture in this book for how a person lives day to day.

Uprightly means honestly, with integrity, not crookedly or in secret.

Surely means with real stability, not stumbling or living in fear of exposure.

An honest life does not need to watch its back.

🛤️ Walking pictures how a person lives daily

⚖️ Uprightly means honest and not crooked

🦶 Surely means stable, not stumbling

📖 An honest life does not fear exposure

---
## 🎭 He That Perverteth His Ways Shall Be Known

Perverteth means to twist or distort something away from what is right.

His ways describes a whole pattern of living, not one single choice.

Shall be known is a quiet warning, not an immediate threat.

Hidden crooked living does not stay hidden forever.

🎭 Perverteth means twisting away from what is right

🛤️ Ways describes a whole pattern of living

🕵️ Shall be known is a quiet warning

📖 Hidden crooked living does not stay hidden

---
## 😉 He That Winketh With The Eye Causeth Sorrow

A wink in this culture, as in ours, often signals a secret or dishonest message.

This is not a friendly gesture between two honest people.

It pictures someone sending a coded, deceptive signal to stir up trouble.

The prating fool from verse eight is named again here as the one who falls.

😉 A wink signals a secret dishonest message

🤫 This is not a friendly gesture here

🪤 It stirs up trouble through deception

📖 The same prating fool from verse eight returns

# Proverbs 10:11-14
# 💧 Mouths That Give Life, Hatred That Hides
---
## 💧 The Mouth Of A Righteous Man Is A Well Of Life

In this dry region, a well was one of the most valuable things a community could have.

A well meant survival itself, not just a convenience.

Comparing a righteous mouth to a well means their words actually sustain other people.

This same line about violence covering the wicked mouth already appeared back in verse six.

💧 A well meant survival in this region

🗣️ A righteous mouth is compared to a well

🌿 Their words sustain other people

📖 The wicked mouth from verse six returns here

---
## 💥 Hatred Stirreth Up Strifes

Strifes means ongoing quarrels and conflicts, not a single argument.

Hatred does not just cause one clash, it keeps generating new ones.

This proverb describes hatred as something that actively multiplies conflict over time.

The next line answers this problem directly.

💥 Strifes means ongoing quarrels and conflicts

🔥 Hatred multiplies conflict over time

🌊 This is presented as an active pattern

📖 The next line offers the direct answer

---
## ❤️ Love Covereth All Sins

Covereth here does not mean pretending sin never happened.

It means love chooses not to expose or dwell on another person's faults.

This is the same word used for violence covering the wicked mouth in verse six, used here for something good.

Love absorbs offense instead of multiplying it, the opposite of hatred in the line before it.

❤️ Covereth means choosing not to expose faults

🙈 This is not pretending sin never happened

🔄 The same word appears earlier for violence

📖 Love absorbs offense instead of multiplying it

---
## 💡 In The Lips Of Him That Hath Understanding Wisdom Is Found

Understanding here means real insight into how life and God actually work.

This is not about having many words or clever speech.

It means what someone says can actually be trusted as wise.

Their speech reflects something real happening inside them first.

💡 Understanding means real insight into life and God

🗣️ This is not about clever speech

✅ Their words can be trusted as wise

📖 Speech reflects what is real inside a person

---
## 🪵 A Rod Is For The Back Of Him That Is Void Of Understanding

Void of understanding means genuinely lacking sense, not simply young or inexperienced.

A rod was a common tool of physical correction in this culture.

This proverb reflects how discipline was commonly practiced in that world.

The point is that refusing wisdom in words eventually invites a harder kind of correction.

🪵 Void of understanding means lacking real sense

🪓 A rod was a tool of physical correction

🏺 This reflects discipline common in that culture

📖 Refusing wisdom invites harder correction later

---
## 📦 Wise Men Lay Up Knowledge

Lay up pictures storing something valuable for later use, like grain in a barn.

Knowledge here is treated as a resource worth deliberately saving and building over time.

A wise person gathers understanding the way a farmer gathers a harvest.

This is a slow, ongoing habit, not a single moment of learning.

📦 Lay up pictures storing something valuable

🌾 Knowledge is treated like a harvested resource

⏳ This is a slow ongoing habit

📖 Wisdom is built over time

---
## 💣 The Mouth Of The Foolish Is Near Destruction

Near destruction means close to real danger, not just embarrassment.

A foolish person's careless words keep putting them one step from real trouble.

This stands in direct contrast to the wise man quietly storing up knowledge.

One mouth builds a future, the other keeps risking it.

💣 Near destruction means close to real danger

🗣️ Careless words keep inviting trouble

🔄 This contrasts with the wise man's storing

📖 One mouth builds, the other risks everything

# Proverbs 10:15-19
# 🏰 Wealth, Labor, And The Multitude Of Words
---
## 🏰 The Rich Man's Wealth Is His Strong City

A strong city in this world meant thick walls and real protection from attack.

Comparing wealth to a strong city means it can function like a shield in hard times.

This proverb is describing how wealth works, not declaring that wealth equals righteousness.

Other proverbs in this same book warn just as clearly against trusting riches too much.

🏰 A strong city meant real protection

🛡️ Wealth can function like a shield

⚖️ This describes wealth, not moral worth

📖 Other proverbs warn against trusting riches too much

---
## 🕳️ The Destruction Of The Poor Is Their Poverty

This line is not calling poverty a sin or a personal failure.

It is naming a hard fact, poverty leaves a person without the protection wealth provides.

Without walls or resources, a poor person stands far more exposed to disaster.

This proverb describes vulnerability, and elsewhere this same book commands care for the poor.

🕳️ This names a fact, not a moral failure

🚪 Poverty leaves a person without protection

⚠️ Exposure to disaster is greater without resources

📖 Elsewhere this book commands care for the poor

---
## 🌱 The Labour Of The Righteous Tendeth To Life

Tendeth means leads toward or moves in a direction over time.

Labour here means everyday, ordinary work and effort.

This proverb says a righteous person's daily work is heading somewhere good.

Life here means real flourishing, not just staying alive.

🌱 Tendeth means moving toward something over time

💼 Labour means everyday ordinary work

🌿 Righteous work is heading somewhere good

📖 Life here means real flourishing

---
## 🍂 The Fruit Of The Wicked Tendeth To Sin

Fruit here pictures the natural result that grows out of a person's actions.

A tree is often judged by what it produces over time in this book.

The wicked person's daily choices are shown growing toward sin, not away from it.

The direction of a life, not one bad day, is what this proverb is naming.

🍂 Fruit pictures the natural result of actions

🌳 A life is judged by what it produces

📉 Their choices grow toward sin over time

📖 Direction matters more than one bad day

---
## 🛤️ He Is In The Way Of Life That Keepeth Instruction

The way of life is another picture of a path leading somewhere good.

Keepeth instruction means actually holding onto correction and living by it.

This is not about hearing good advice once and forgetting it.

Staying on this path requires returning to instruction again and again.

🛤️ The way of life is a picture

📚 Keepeth instruction means living by correction

🔁 This requires returning to it repeatedly

📖 One good moment of hearing is not enough

---
## 🌀 He That Refuseth Reproof Erreth

Reproof means direct correction, pointing out exactly where someone went wrong.

Erreth means to wander off course, to go astray.

Refusing correction does not simply keep someone in place.

It actively sends them further off the right path over time.

🌀 Reproof means direct, specific correction

🧭 Erreth means to wander off course

🚶 Refusing correction does not keep someone in place

📖 It sends them further off course over time

---
## 🎭 He That Hideth Hatred With Lying Lips

Hiding hatred behind lying lips means acting friendly while secretly holding a grudge.

This is different from simply feeling angry for a moment.

It describes a deliberate, ongoing performance of false kindness.

The verse calls this person a fool, not simply dishonest.

🎭 Hiding hatred means acting friendly falsely

😠 This is not a passing moment of anger

🎬 It is a deliberate ongoing performance

📖 Scripture calls this person a fool

---
## 🗣️ He That Uttereth A Slander Is A Fool

Uttereth simply means speaks out loud, puts into words.

Slander means spreading a false or damaging report about someone.

Pairing this with the hidden hatred in the same verse links two related sins.

Both dishonesty toward a person's face and dishonesty behind their back are named fool here.

🗣️ Uttereth means to speak something out loud

📢 Slander means spreading a false report

🔗 This links two related kinds of dishonesty

📖 Both are named fool in this verse

---
## 💬 In The Multitude Of Words There Wanteth Not Sin

Multitude means a large number, more than is necessary.

Wanteth not means is not lacking, meaning sin is present.

This is not a rule against ever speaking a lot.

It is a warning that careless, unfiltered talking makes sin easier to fall into.

💬 Multitude means far more words than needed

⚠️ Wanteth not means sin is present

🚫 This is not against speaking in general

📖 Unfiltered talking makes sin easier to fall into

---
## 🤐 He That Refraineth His Lips Is Wise

Refraineth means to hold back or restrain something on purpose.

This is not about staying silent out of fear or shyness.

It describes a deliberate choice to think before speaking.

The section began with wise men gathering knowledge, and it ends with wisdom guarding the mouth.

🤐 Refraineth means holding back on purpose

🧠 This is a deliberate choice, not shyness

🤔 It means thinking before speaking

📖 Wisdom both gathers knowledge and guards the mouth

# Proverbs 10:20-23
# 🥈 Choice Silver And The Sport Of Fools
---
## 🥈 The Tongue Of The Just Is As Choice Silver

Choice silver means silver that has been refined, purified of impurities.

Ordinary silver could still contain waste that lowered its value.

Comparing the just person's tongue to refined silver means their words are pure and worth something real.

Nothing about their speech needs to be filtered out by the listener.

🥈 Choice silver means refined, purified metal

🗣️ Their words are compared to pure metal

✅ Their speech is worth something real

📖 Nothing needs filtering by the listener

---
## 🪨 The Heart Of The Wicked Is Little Worth

Heart again means the center of a person's will and choices.

Little worth stands in sharp contrast to the choice silver in the same verse.

This is not describing the wicked person's usefulness or intelligence.

It is describing what is actually happening at the core of who they are.

🪨 Heart means the center of will and choices

⚖️ This contrasts directly with choice silver

🎭 This is not about usefulness or intelligence

📖 It describes what is real at their core

---
## 🍽️ The Lips Of The Righteous Feed Many

Feed many pictures someone providing real nourishment through their words, like a shepherd providing for a flock.

Wise, honest speech here is treated as something that can sustain other people.

This is the same well of life picture from verse eleven, now shown feeding a whole group.

Good words are not just harmless, they actively nourish a community.

🍽️ Feed many pictures words as real nourishment

🐑 Wise speech is compared to a shepherd's care

💧 This echoes the well of life

📖 Good words actively nourish a community

---
## 🕳️ Fools Die For Want Of Wisdom

Want of wisdom means lacking it, being without it.

This is a strong statement, tying the lack of wisdom directly to death.

Death here can mean literal death or a deeper kind of ruin.

Wisdom in this book is never optional decoration, it is presented as a matter of survival.

🕳️ Want of wisdom means lacking it entirely

⚰️ This ties lacking wisdom directly to death

🌀 Death here can mean literal ruin too

📖 Wisdom is treated as a matter of survival

---
## 💰 The Blessing Of The LORD, It Maketh Rich

This verse names God directly as the true source behind real riches.

The wealth pictured here is not the same as the dishonest gain from verse two.

This blessing comes as a gift, not as something earned or seized.

Wealth gained through wickedness was already shown to profit nothing back in verse two.

💰 God is named as the source of riches

🎁 This is a gift, not something seized

🔄 This contrasts with the dishonest gain earlier

📖 True wealth traces back to God

---
## 🕊️ He Addeth No Sorrow With It

Sorrow here means the regret, guilt, or grief that often follows how wealth was gained.

Wealth built through dishonesty or violence tends to bring hidden costs along with it.

The wealth God gives does not carry that same hidden weight.

This is the calm, settled kind of blessing, not one built on a guilty conscience.

🕊️ Sorrow here means the regret wealth can carry

⚠️ Dishonest wealth often hides a real cost

☮️ God's blessing carries no hidden weight

📖 This is a calm, guilt free blessing

---
## 🎲 It Is As Sport To A Fool To Do Mischief

Sport here means a game, something done purely for entertainment.

Mischief means deliberate wrongdoing, not innocent playfulness.

A fool treats causing harm the way other people treat a fun pastime.

A fool's sense of right and wrong has clearly drifted far off course.

🎲 Sport means a game done for entertainment

⚠️ Mischief means deliberate wrongdoing

🎭 A fool treats harm like fun

📖 This shows how far they have drifted

---
## 🧠 A Man Of Understanding Hath Wisdom

This line stands directly opposite the fool who treats mischief as sport.

Wisdom here is described almost like something a person possesses and carries with them.

Understanding and wisdom are shown here as partners, not separate qualities.

Where a fool finds entertainment in harm, this person finds direction in truth.

🧠 This stands opposite the fool from before

🎒 Wisdom is pictured as something carried

🤝 Understanding and wisdom are shown as partners

📖 One finds harm fun, the other finds truth

# Proverbs 10:24-28
# 🌪️ The Whirlwind And The Everlasting Foundation
---
## 😨 The Fear Of The Wicked, It Shall Come Upon Him

Fear here means the wicked person's own dread, the thing they are secretly afraid of.

This proverb says that dread eventually catches up with them.

It is not describing an outside punishment landing on them at random.

It describes their own deepest fear finally becoming reality.

😨 Fear here means their own private dread

⏳ This dread eventually catches up with them

🎯 This is not a random outside punishment

📖 Their own deepest fear becomes reality

---
## 🎁 The Desire Of The Righteous Shall Be Granted

Desire here means what a righteous person genuinely longs for.

This proverb pairs directly with the line before it about the wicked and their fear.

One group receives what they most dreaded, the other receives what they most hoped for.

This is not a promise about every wish, it is about a life aimed at what God wants.

🎁 Desire means what they genuinely long for

🔄 This pairs directly with the wicked's fear

⚖️ One group gets dread, the other gets hope

📖 This is about a life aimed at God

---
## 🌪️ As The Whirlwind Passeth, So Is The Wicked No More

A whirlwind was a familiar, terrifying storm in this region, capable of destroying everything in its path.

Whirlwinds were also known for arriving suddenly and passing quickly.

Comparing the wicked to a whirlwind means their power looks impressive but does not last.

Passeth means it moves on and is gone, leaving nothing permanent behind.

🌪️ A whirlwind was sudden and destructive

⏱️ Whirlwinds passed quickly, they did not linger

💨 The wicked's power looks impressive but fades

📖 Passeth means gone, leaving nothing permanent

---
## 🏛️ The Righteous Is An Everlasting Foundation

A foundation is the part of a building that does not move, the part everything else rests on.

Everlasting stands in direct contrast to the whirlwind that quickly passes.

This is not a promise of an easy life, it is a promise of a lasting one.

Where the wicked leave nothing behind, the righteous life is something that endures.

🏛️ A foundation is the part that stays

🔄 Everlasting contrasts with the passing whirlwind

🛤️ This promises lasting, not easy

📖 The righteous life is something that endures

---
## 🍋 As Vinegar To The Teeth, And As Smoke To The Eyes

Vinegar touching the teeth causes a sharp, unpleasant sting.

Smoke in the eyes causes a stinging, watering irritation that is hard to ignore.

Both images describe small but genuinely irritating discomforts from everyday life in this culture.

The proverb builds two familiar pictures before naming what they represent.

🍋 Vinegar on the teeth causes a sharp sting

💨 Smoke in the eyes causes stinging irritation

🏺 Both are familiar discomforts from daily life

📖 These pictures set up the next line's point

---
## 🐌 So Is The Sluggard To Them That Send Him

A sluggard means a lazy person who resists doing what needs to be done.

Send him pictures someone relying on the sluggard to run an errand or complete a task.

Just like vinegar and smoke, a sluggard is a constant, low grade irritation to depend on.

Laziness does not just hurt the lazy person, it frustrates everyone counting on them.

🐌 A sluggard means a lazy, resistant person

🏃 Send him pictures someone relying on them

😤 A sluggard is a constant irritation

📖 Laziness frustrates everyone counting on that person

---
## ⏳ The Fear Of The LORD Prolongeth Days

Fear of the LORD means taking God seriously enough to actually live differently because of him.

Prolongeth days means it tends to add length and stability to a life.

This is describing a general pattern across a life, not a guaranteed exact number of years.

A life oriented around God tends to avoid much of the ruin that shortens other lives.

⏳ Fear of the LORD means taking God seriously

📏 Prolongeth days means adding length and stability

🌀 This is a general pattern, not a guarantee

📖 A God centered life avoids much needless ruin

---
## ✂️ The Years Of The Wicked Shall Be Shortened

Shortened here does not mean every wicked person dies young.

It describes how a wicked life tends to run into consequences that cut it short.

Reckless choices, violence, and dishonesty carry real risks to health and safety over time.

This proverb names a pattern that plays out across many lives, not a fixed rule for every one.

✂️ Shortened does not mean dying young

⚠️ It describes a life running into consequences

🎲 Reckless choices carry real risks over time

📖 This names a pattern, not a fixed rule

---
## 😊 The Hope Of The Righteous Shall Be Gladness

Hope here means a confident expectation, not just a wish.

This proverb promises that the righteous person's confident expectation will actually be fulfilled with joy.

Gladness is the destination this hope is heading toward.

Waiting on God is shown here as something that ends well.

😊 Hope here means confident expectation

🎯 That expectation will be fulfilled with joy

🏁 Gladness is the destination of this hope

📖 Waiting on God is shown ending well

---
## 💨 The Expectation Of The Wicked Shall Perish

Expectation here means whatever the wicked person is counting on for the future.

Perish means to come to nothing, to be destroyed completely.

This stands in direct contrast to the gladness promised to the righteous just before it.

Whatever the wicked are banking on will not hold up in the end.

💨 Expectation means what they are counting on

🕳️ Perish means coming to nothing

⚖️ This contrasts with the righteous person's gladness

📖 What the wicked bank on will not hold

# Proverbs 10:29-32
# 🏔️ The Way Of The LORD Is Strength
---
## 🏔️ The Way Of The LORD Is Strength To The Upright

The way of the LORD means living according to how God has instructed his people to live.

Strength here means real protection and support along that path.

For the upright, this way is not a burden to carry, it is the very thing that holds them up.

The same path looks completely different depending on who is walking it.

🏔️ This way means living by God's instruction

💪 Strength means real protection and support

🛤️ For the upright, this path holds them up

📖 The same path looks different to different people

---
## 💥 Destruction Shall Be To The Workers Of Iniquity

Workers of iniquity means people who practice sin as an ongoing pattern, not a single mistake.

Destruction stands in direct contrast to the strength given to the upright in this same verse.

The same way of the LORD that supports one person becomes an obstacle to another.

This is not about one bad choice, it is about a pattern of living against God.

💥 Workers of iniquity means an ongoing pattern

⚖️ Destruction contrasts with the upright's strength

🧱 The same path becomes an obstacle to another

📖 This is about a pattern, not one mistake

---
## 🌳 The Righteous Shall Never Be Removed

Removed pictures being uprooted, like a tree torn out of the ground.

This promise is about stability that lasts, not about avoiding every hardship.

A righteous life is pictured as something planted deeply and firmly.

Storms may come, but the roots described here are not the kind that give way.

🌳 Removed pictures being uprooted like a tree

🌩️ This promises stability, not the absence of hardship

🌱 A righteous life is pictured as deeply planted

📖 These are roots that do not give way

---
## 🏜️ The Wicked Shall Not Inhabit The Earth

Inhabit means to live in and possess a place long term, not just visit it.

This does not mean the wicked never walk on the earth at all.

It means their hold on any place is never lasting or secure.

Where the righteous are pictured as rooted, the wicked are pictured as passing through.

🏜️ Inhabit means to possess long term

🚶 This does not deny them walking here

⏳ Their hold on any place is never lasting

📖 The righteous are rooted, the wicked pass through

---
## 🍯 The Mouth Of The Just Bringeth Forth Wisdom

Bringeth forth pictures wisdom growing and emerging naturally, the way fruit grows from a healthy tree.

This is not wisdom performed for an audience.

It is wisdom that comes out because it is genuinely present inside the speaker first.

A healthy inner life is shown here producing healthy, useful speech.

🍯 Bringeth forth pictures wisdom growing naturally

🌳 This is compared to fruit from a tree

🎭 This is not wisdom performed for show

📖 Healthy speech comes from a healthy inner life

---
## ✂️ The Froward Tongue Shall Be Cut Out

Froward means stubborn, twisted, and deliberately contrary to what is right.

Cut out is a strong image of that kind of speech being silenced completely.

This is the same tongue that could have offered choice silver back in verse twenty.

Instead of being refined, this tongue is removed entirely.

✂️ Froward means stubborn and deliberately twisted

🔇 Cut out pictures that speech silenced completely

🥈 This echoes the choice silver from verse twenty

📖 This tongue is removed instead of refined

---
## ✅ The Lips Of The Righteous Know What Is Acceptable

Acceptable here means what is fitting, pleasing, and appropriate to say in a given moment.

Knowing what is acceptable takes real discernment, not just good intentions.

This describes speech shaped by wisdom about timing and tone, not only content.

The righteous learn not just what to say, but when and how to say it.

✅ Acceptable means fitting and appropriate

🧠 This takes real discernment to know

⏰ It is about timing and tone too

📖 They learn what, when, and how to speak

---
## 🌀 The Mouth Of The Wicked Speaketh Frowardness

Frowardness is the noun form of froward, meaning stubborn and twisted speech.

This closes the chapter exactly where its themes began, contrasting two very different mouths.

Every proverb in this chapter has traced back to one question, which kind of mouth is being trained.

The whole chapter has been building toward this final, plain contrast.

🌀 Frowardness means stubborn, twisted speech

🔄 This closes the chapter on its opening theme

🗣️ The chapter has traced two kinds of mouths

📖 This is the chapter's final, plain contrast
`.trim();

export const PROVERBS_TEN_PERSONAL_SECTIONS = parseProverbsTenRawNotes(PROVERBS_TEN_RAW_NOTES);
