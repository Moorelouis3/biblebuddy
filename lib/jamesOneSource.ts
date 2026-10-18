export type JamesOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJamesOneRawNotes(rawText: string): JamesOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JamesOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*James\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing James 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+James\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+James\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing James 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `James 1:${startVerse}` : `James 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 James 1 sections, received " + sections.length);
  }

  return sections;
}

const JAMES_ONE_RAW_NOTES = `# James 1:1
# 🧎 A Servant Of God And Of The Lord Jesus Christ
---
## 🧎 A Servant Of God And Of The Lord Jesus Christ

"Servant" here translates the Greek word doulos.

Doulos means a slave who belongs completely to a master.

James calls himself that word, not an apostle.

He was likely a half brother of Jesus in the flesh.

He still claims no higher title than slave.

🧎 Servant means doulos, a slave
👨‍👦 James was likely Jesus's half brother
🚫 He claims no apostle title
📖 The lowest title becomes an honor

## 🌍 To The Twelve Tribes Which Are Scattered Abroad

"Scattered abroad" translates the Greek word diaspora.

It describes Jewish believers living outside the land of Israel.

Persecution and migration had pushed many of them from their homes.

James writes to these scattered believers as one family.

Distance from home never put them outside God's reach.

🌍 Scattered abroad means diaspora
🕊️ These were Jews outside Israel
🔥 Persecution had pushed many from home
📖 Distance never put them outside God's reach

# James 1:2-4
# 🧮 Count It All Joy When Ye Fall Into Divers Temptations
---
## 🧮 Count It All Joy When Ye Fall Into Divers Temptations

This does not mean trials are supposed to feel pleasant.

"Count" means a deliberate decision, not a feeling.

"Divers temptations" means trials of many different kinds.

The same Greek word here can mean both trial and temptation.

Joy here is choosing the purpose, not enjoying the pain.

🧮 Count means a deliberate decision
🎭 Joy is not about feeling pleasant
🌀 Divers means many different kinds
📖 Joy chooses the purpose not the pain

## 🔥 The Trying Of Your Faith Worketh Patience

"Trying" means a testing process, the way fire tests metal.

Ancient metalworkers heated ore to burn away its impurities.

Faith goes through that same kind of proving under pressure.

"Patience" here means steady endurance, not quiet waiting.

What survives the testing comes out stronger than before.

🔥 Trying means testing like fire
⚒️ Metalworkers burned away impurities this way
💪 Patience means steady endurance
📖 What survives testing comes out stronger

## 🌱 Let Patience Have Her Perfect Work

"Perfect" here does not mean flawless.

It means complete, fully grown into what it should be.

Patience needs time to finish that work in a person.

Cutting a trial short also cuts off what patience could build.

"Entire, wanting nothing" means nothing left undeveloped.

🌱 Perfect means complete, not flawless
⏳ Patience needs time to finish
✂️ Cutting trials short stops growth
📖 Wanting nothing means nothing undeveloped

# James 1:5-8
# 🧠 If Any Of You Lack Wisdom, Let Him Ask Of God
---
## 🧠 If Any Of You Lack Wisdom, Let Him Ask Of God

Wisdom here does not mean raw intelligence.

It means the practical skill of living well under pressure.

James has just described a hard trial in the lines before.

Asking God comes before trying to guess alone.

God is the one source named for this wisdom.

🧠 Wisdom means skill for living well
🌩️ This follows right after a hard trial
🙋 Asking comes before guessing alone
📖 God is the one named source

## 🎁 That Giveth To All Men Liberally, And Upbraideth Not

"Liberally" means generously, holding nothing back.

"Upbraideth not" means God never scolds someone for asking again.

Some ancient teachers pictured the gods as stingy and easily angered.

This verse pictures the opposite kind of giver.

A request for wisdom is never an inconvenience to God.

🎁 Liberally means generous, holding nothing back
🙅 Upbraideth not means never scolding
⚡ Some pictured the gods as stingy
📖 Asking God is never an inconvenience

## 🌊 Let Him Ask In Faith, Nothing Wavering

"Wavering" means doubting back and forth between two choices.

James pictures a wave of the sea driven by wind.

Think of a small boat with no anchor in a storm.

It drifts wherever the wind happens to push it.

A prayer offered without trust drifts the same way.

🌊 Wavering means doubting back and forth
⛵ James pictures a wave in the wind
⚓ A boat with no anchor drifts
📖 Prayer without trust drifts the same way

## 🪞 A Double Minded Man Is Unstable In All His Ways

"Double minded" translates a Greek word meaning two souled.

It describes someone serving two loyalties at the same time.

That person asks God for help but still trusts themselves more.

Instability here is not occasional.

It touches every area of life.

A mind split between two masters cannot stand firm.

🪞 Double minded means two souled
⚔️ Serving two loyalties at once
🏚️ Instability touches every area of life
📖 A split mind cannot stand firm

# James 1:9-11
# 💰 Let The Brother Of Low Degree Rejoice In That He Is Exalted
---
## 💰 Let The Brother Of Low Degree Rejoice In That He Is Exalted

"Low degree" means poor or low in social standing.

This does not celebrate poverty itself.

In Christ, a poor believer already holds a high standing.

That standing never depends on anyone's bank account.

God's family flips the world's usual ranking.

💰 Low degree means poor standing
🙏 This praises standing in Christ
👑 A poor believer is already exalted
📖 God's family flips the world's ranking

## 🙇 But The Rich, In That He Is Made Low

This does not condemn every rich person.

It means wealth earns no special standing before God.

A rich believer is called to see himself the same way.

Riches cannot buy a higher rank in God's family.

The ground before God is level for rich and poor.

🙇 Wealth earns no special standing
💵 Riches cannot buy a higher rank
⚖️ The ground before God is level
📖 Rich and poor stand there together

## 🌸 As The Flower Of The Grass He Shall Pass Away

Wildflowers in that region bloomed quickly after spring rain.

A hot desert wind could wither them within a single day.

James compares the rich man's life to that same flower.

What looked impressive in the morning was gone by evening.

Wealth that feels permanent can vanish just as fast.

🌸 Flowers there bloomed fast and died fast
🔥 A desert wind withered them in a day
💼 His life is compared to that flower
📖 What feels permanent can vanish fast

# James 1:12-15
# 💪 Blessed Is The Man That Endureth Temptation
---
## 💪 Blessed Is The Man That Endureth Temptation

"Endureth" means standing firm under pressure, not avoiding it.

"Tried" echoes the same testing pictured earlier in this chapter.

"The crown of life" was a victor's wreath from ancient games.

It was not a king's crown but a prize for finishing.

Enduring well earns a prize, not an excuse to quit.

💪 Endureth means standing firm
🏃 Tried echoes the earlier testing
🏆 Crown of life was a victor's wreath
📖 Finishing well earns the prize

## 😇 Let No Man Say When He Is Tempted, I Am Tempted Of God

This corrects a wrong excuse some people made.

God cannot be tempted with evil and tempts no one toward it.

One Greek word in this chapter covers both trial and temptation.

A trial that tests faith is not a temptation to sin.

God sends the first kind, never the second.

😇 This corrects a common excuse
🙅 God tempts no one toward evil
🔀 One Greek word covers both meanings
📖 God tests faith, never tempts toward sin

## 🎣 Every Man Is Tempted, When He Is Drawn Away Of His Own Lust

"Lust" here means a strong desire pulling the wrong direction.

"Drawn away" pictures bait pulling a fish from safety.

"Enticed" adds the picture of a trap baited to look appealing.

The source of temptation named here is internal.

Blame for sin starts with the desire already inside.

🎣 Drawn away pictures bait pulling a fish
🪤 Enticed pictures a baited trap
💭 Lust is a desire already inside
📖 Temptation's source starts inside not outside

## 🤰 When Lust Hath Conceived, It Bringeth Forth Sin

James pictures lust like a pregnancy moving toward birth.

Sin is pictured as the child that desire gives birth to.

That sin then gives birth to death in turn.

Each stage follows naturally from the one before it.

Nothing in this chain happens without warning.

🤰 Lust is pictured like a pregnancy
👶 Sin is the child it bears
💀 Sin then gives birth to death
📖 Nothing in this chain is sudden

# James 1:16-18
# 🙅 Do Not Err, My Beloved Brethren
---
## 🙅 Do Not Err, My Beloved Brethren

"Err" means being deceived or led astray in thinking.

James has just corrected a wrong idea about temptation.

This short warning signals that the next lines matter too.

"Beloved brethren" softens the correction with real affection.

A warning given in love still lands as a warning.

🙅 Err means being deceived in thinking
🔄 This follows the correction just given
❤️ Beloved brethren shows real affection
📖 Love does not soften the warning

## 🎁 Every Good Gift And Every Perfect Gift Is From Above

This verse answers where good things actually come from.

"From above" means from God, not from chance.

"Good gift" and "perfect gift" point to the same source.

Nothing good a person receives started somewhere else first.

Credit for every good thing belongs to God alone.

🎁 Good and perfect gift share one source
⬆️ From above means from God
🚫 Nothing good started somewhere else
📖 Credit for good things belongs to God

## ☀️ The Father Of Lights, With Whom Is No Variableness, Neither Shadow Of Turning

"Father of lights" pictures God as maker of sun, moon, and stars.

Those lights visibly shift position and brightness through the day.

"No variableness" means God himself never shifts that way.

"Shadow of turning" pictures the shifting shadow a sunset creates.

Those lights move, but God's character never changes.

☀️ Father of lights made sun, moon, stars
🌓 Those lights change position daily
🪨 No variableness means God never shifts
📖 God stays constant as lights move

## 👶 Of His Own Will Begat He Us With The Word Of Truth

"Begat" means to give birth to, used of spiritual new birth.

"The word of truth" is the gospel that produced that birth.

"His own will" means God chose this, nothing forced his hand.

"Firstfruits" named the first and best part of a harvest.

Being called firstfruits means a larger harvest is still coming.

👶 Begat means a spiritual new birth
📜 Word of truth is the gospel
🌾 Firstfruits was the first harvest portion
📖 A larger harvest is still coming

# James 1:19-21
# 👂 Let Every Man Be Swift To Hear, Slow To Speak, Slow To Wrath
---
## 👂 Let Every Man Be Swift To Hear, Slow To Speak, Slow To Wrath

These three commands come in a deliberate order.

Listening well comes first, before anyone opens their mouth.

Speaking slowly gives real listening time to work.

Slowness to wrath follows once the first two are practiced.

Quick anger usually means skipping the first two steps.

👂 Listening is placed first on purpose
🗣️ Slow speech gives listening time to work
😠 Wrath follows once the first two are kept
📖 Quick anger usually skips real listening

## 😤 The Wrath Of Man Worketh Not The Righteousness Of God

This does not mean all anger is automatically sinful.

It means human anger, left unchecked, cannot produce God's righteousness.

Anger can feel righteous in the moment.

That feeling is not the same as doing God's will.

A patient response builds what a heated one cannot.

😤 Human anger is not automatically sinful
🚫 It cannot produce God's righteousness
🎭 Anger can feel righteous without being it
📖 Patience builds what anger cannot

## 🧥 Lay Apart All Filthiness And Superfluity Of Naughtiness

"Filthiness" pictures moral dirt removed like soiled clothing.

"Superfluity of naughtiness" means an extra pile of wickedness on top.

"Lay apart" pictures taking off a garment on purpose.

This is an active choice, not something automatic.

Removing it first makes room for what comes next.

🧥 Filthiness pictures moral dirt like clothing
🗑️ Superfluity means an extra pile of wickedness
✋ Lay apart means an active choice
📖 Removing it makes room for what is next

## 🌿 Receive With Meekness The Engrafted Word

"Engrafted" pictures a branch grafted permanently into a tree.

A grafted branch becomes part of the plant itself.

"Meekness" means a humble willingness to be taught.

This word is able to save the soul that receives it.

A word only heard in passing never grafts in that way.

🌿 Engrafted pictures a branch grafted into a tree
🤲 Meekness means humble willingness to learn
🔗 A grafted word becomes part of a person
📖 This word is able to save souls

# James 1:22-25
# 🛑 Be Ye Doers Of The Word, And Not Hearers Only
---
## 🛑 Be Ye Doers Of The Word, And Not Hearers Only

Hearing truth and living by it are two separate steps.

"Hearers only" describes someone who stops after the first step.

"Deceiving your own selves" warns this can happen unnoticed.

A person can feel informed without any real change.

The word was never meant to stop at the ears.

👂 Hearing and doing are two separate steps
🛑 Hearers only stop after step one
🪞 This deception can go unnoticed
📖 The word was not meant for ears only

## 🪞 He Is Like Unto A Man Beholding His Natural Face In A Glass

"Glass" here means a mirror, usually polished metal.

"Beholding" means taking a careful, deliberate look.

James compares hearing the word to looking in that mirror.

The mirror shows exactly what needs attention right then.

A mirror only helps when someone acts on it.

🪞 Glass here means a polished metal mirror
👀 Beholding means a careful deliberate look
📏 Hearing the word works the same way
➡️ A mirror only helps if someone acts

## ⏱️ Goeth His Way, And Straightway Forgetteth What Manner Of Man He Was

"Straightway" means almost immediately, with no delay.

The man sees clearly, then walks away and forgets.

This pictures hearing truth but taking no lasting impression.

The problem here is not a lack of information.

The problem is a memory that does not carry into action.

⏱️ Straightway means almost immediately
🚶 He walks away and simply forgets
🧠 The problem is not lack of information
📖 Memory that does not act fails him

## ⚖️ Whoso Looketh Into The Perfect Law Of Liberty, And Continueth Therein

"The perfect law of liberty" names God's law as freeing.

This contrasts the earlier man who glanced and walked away.

"Continueth therein" means staying with it, not one glance.

This describes the opposite of the forgetful hearer.

Blessing comes through the deed itself, not information alone.

⚖️ Perfect law of liberty means freeing
🔁 Continueth means staying, not one glance
✅ The opposite of the forgetful hearer
📖 Blessing comes through the deed itself

# James 1:26-27
# 🐴 If Any Man Among You Seem To Be Religious, And Bridleth Not His Tongue
---
## 🐴 If Any Man Among You Seem To Be Religious, And Bridleth Not His Tongue

"Bridleth" pictures the reins used to steer a horse.

An unbridled horse goes wherever its own impulse carries it.

An unbridled tongue works the same way.

"Seem to be religious" warns that outward appearance can hide this.

The damage lands first on the speaker's own heart.

🐴 Bridleth pictures reins steering a horse
🗣️ An unbridled tongue follows impulse
🎭 Outward religion can hide this problem
📖 The damage lands on the speaker's heart

## 🧼 Pure Religion And Undefiled Before God And The Father Is This

James now defines what real religion looks like.

"Pure" and "undefiled" both mean free from contamination.

This definition has nothing to do with rituals.

It names two concrete actions instead of a feeling.

Real religion in this verse shows up as something done.

🧼 Pure and undefiled mean uncontaminated
📜 This defines real religion in practice
🚫 It is not about ritual or ceremony
📖 Real religion shows up as action

## 👶 To Visit The Fatherless And Widows In Their Affliction

Orphans in this world had almost no legal protection.

Widows often had no income and no advocate either.

"Visit" here means far more than a short social call.

It means showing up to meet real needs over time.

Caring for the vulnerable was treated as true faith's heart.

👶 Orphans had little legal protection then
👵 Widows often had no income
🏠 Visit means ongoing practical help
📖 Caring for the vulnerable is faith's heart

## 👕 To Keep Himself Unspotted From The World

"Unspotted" pictures a garment kept free of stains.

"The world" means the sinful pressures of this present age.

Caring for others and staying personally clean are named together.

One without the other falls short of pure religion.

Real faith reaches outward in love and inward in holiness.

👕 Unspotted pictures a stain free garment
🌍 The world means this age's pressures
🔗 Outward care and inward purity are paired
📖 Faith reaches outward and inward together
`.trim();

export const JAMES_ONE_PERSONAL_SECTIONS = parseJamesOneRawNotes(JAMES_ONE_RAW_NOTES);
