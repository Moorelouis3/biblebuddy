export type ProverbsTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentyEightRawNotes(rawText: string): ProverbsTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 28:${startVerse}` : `Proverbs 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Proverbs 28 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_EIGHT_RAW_NOTES = `# Proverbs 28:1-3
# 🦁 Boldness, Instability, And Oppression
---
## 🏃 The Wicked Flee When No Man Pursueth

Fleeing here does not mean the wicked are simply cowards.

Guilt itself creates fear even when nothing is actually chasing them.

A clear conscience never needs to look over its shoulder.

Think of someone who jumps at a sound for no reason.

That jump reveals something already sitting inside them.

Guilt manufactures its own danger.

🏃 Flee does not mean cowardice alone
😨 Guilt creates fear with no real threat
🚪 A guilty jump reveals inner unease
📖 Guilt manufactures its own danger

## 🦁 The Righteous Are Bold As A Lion

Boldness here does not mean recklessness or lack of caution.

It means confidence that comes from having nothing to hide.

A lion does not slink around watching for danger behind it.

It moves through its territory like it owns the ground.

Nothing chases a person who has nothing to run from.

🦁 Boldness does not mean recklessness
🔓 Confidence comes from nothing to hide
🚶 A lion moves like it owns the ground
📖 Righteousness produces settled confidence

## 🏛️ For The Transgression Of A Land Many Are The Princes Thereof

A land full of sin often cycles through rulers quickly.

Widespread corruption breeds instability at the very top.

Many scholars connect this to coups, assassinations, and constant power struggles.

A man of understanding and knowledge is the flip side of that chaos.

One wise leader can stabilize what corruption keeps breaking apart.

Prolonged here means the nation's order lasts longer under wisdom.

🏛️ Sinful nations cycle through rulers fast
⚔️ Corruption breeds instability at the top
🧠 One wise leader stabilizes the chaos
📖 Wisdom prolongs what corruption breaks

## 🌧️ A Poor Man That Oppresseth The Poor Is Like A Sweeping Rain Which Leaveth No Food

This pictures a heavy rain that floods fields instead of watering them.

Normal rain grows food, but a violent storm can wash the crop away entirely.

A poor man oppressing another poor man works the same way.

He should understand poverty better than anyone, yet still causes harm.

Shared hardship does not automatically produce shared mercy.

🌧️ Sweeping rain floods fields instead of feeding them
😟 A poor oppressor should know better
💔 Shared hardship does not guarantee mercy
📖 Hardship does not excuse causing harm

# Proverbs 28:4-6
# ⚖️ The Law And True Wealth
---
## 📜 They That Forsake The Law Praise The Wicked

Forsaking the law does more than break a rule.

It changes what a person is willing to celebrate.

Someone who abandons God's standard starts admiring people who ignore it too.

Those who keep the law respond the opposite way, they push back instead.

Contend means actively resisting, not just quietly disagreeing.

What someone praises or resists reveals where their heart already stands.

📜 Forsaking the law changes what you praise
👏 Praise reveals what someone truly values
⚔️ Keeping the law means actively pushing back
📖 Where the heart stands shows in both

## ⚖️ Evil Men Understand Not Judgment

Judgment here means the ability to tell right from wrong clearly.

Evil is not just about bad choices, it clouds basic perception.

A person can grow so used to wrongdoing that fairness stops making sense to them.

Seeking the LORD works the opposite direction.

That pursuit sharpens a person's ability to see clearly again.

⚖️ Judgment means telling right from wrong
🌫️ Evil clouds basic moral perception
🔍 Seeking God sharpens moral clarity
📖 Clarity and blindness both grow from pursuit

## 🧍 Better Is The Poor That Walketh In His Uprightness

This is a direct ranking, not just a nice sentiment.

Uprightness means living with consistent honesty, not sudden goodness.

Poverty paired with integrity still outranks the alternative in this proverb.

Character sets the value here, not income.

⚖️ This is a direct ranking statement
🧭 Uprightness means consistent honest living
💰 Poverty with integrity still outranks the alternative
📖 Character sets the value, not income

## 💸 Than He That Is Perverse In His Ways, Though He Be Rich

Perverse here means twisted or crooked in daily conduct, not a single mistake.

Though he be rich shows wealth cannot buy back what crooked living costs.

Riches in this proverb never outweigh the wrong used to get them.

A rich life built on crooked ways is not actually worth more.

🌀 Perverse means twisted, ongoing conduct
💸 Wealth cannot buy back that cost
⚖️ Riches never outweigh the wrong beneath them
📖 A crooked rich life is not worth more

# Proverbs 28:7-9
# 👨‍👦 Sons, Usury, And An Ignored Law
---
## 👨‍👦 Whoso Keepeth The Law Is A Wise Son

Wisdom here is measured by obedience, not intelligence.

A son who honors God's law brings credit to his family.

A companion of riotous men does the opposite, and shames his father instead.

Riotous here means living wastefully among reckless, undisciplined company.

A father's reputation was closely tied to his children's choices in this culture.

🧠 Wisdom is measured by obedience here
👨‍👦 A father's name rode on his sons
🎭 Riotous means reckless, wasteful living
📖 Private choices become publicly visible

## 💰 He That By Usury And Unjust Gain Increaseth His Substance

Usury means charging excessive interest, especially against the poor.

The law of Moses forbade this kind of predatory lending among God's people.

Unjust gain covers any wealth built through dishonest means.

That wealth does not stay with the person who gained it wrongly.

Scripture pictures it eventually passing into hands that actually pity the poor.

💰 Usury means predatory, excessive interest
📜 Unjust gain means dishonestly built wealth
🔄 That wealth does not stay put
📖 Justice unfolds slowly, not immediately

## 👂 He That Turneth Away His Ear From Hearing The Law, Even His Prayer Shall Be Abomination

Turning away the ear pictures a deliberate refusal to listen, not simple forgetfulness.

Abomination is a strong word, describing something God finds deeply offensive.

Ignoring God's instruction while still expecting God to answer prayer does not fit together.

A relationship with God cannot run only in one direction.

Listening and praying are meant to work together, not separately.

👂 Turning away means deliberate refusal
🚫 Abomination means deeply offensive to God
🔄 You cannot ignore God and still expect answers
📖 Listening and praying work together

# Proverbs 28:10-12
# 🕳️ Traps, Conceit, And Hidden Men
---
## 🕳️ Whoso Causeth The Righteous To Go Astray In An Evil Way, He Shall Fall Himself Into His Own Pit

Astray here means being deliberately lured off the right path.

The trap set for someone else becomes the trapper's own downfall.

This pictures poetic justice, not random misfortune.

Evil schemes tend to circle back on the person who built them.

🧭 Astray means deliberately lured off course
🕳️ The trap becomes the trapper's downfall
⚖️ This is poetic justice, not chance
📖 Evil schemes circle back on their makers

## 🎁 The Upright Shall Have Good Things In Possession

Possession here means something actually kept, not just promised.

The contrast is sharp, one person falls, another one keeps good things.

Uprightness is protected even while someone else schemes against it.

Integrity outlasts the traps built to destroy it.

🎁 Possession means actually kept, not promised
⚖️ The contrast here is sharp and deliberate
🛡️ Uprightness stays protected under attack
📖 Integrity outlasts the traps against it

## 🧠 The Rich Man Is Wise In His Own Conceit

Conceit means an inflated opinion of one's own wisdom.

Wealth can convince a person that their judgment must also be superior.

The poor that hath understanding sees through that false confidence.

Searcheth him out pictures careful, patient investigation, not a lucky guess.

Money cannot hide bad judgment from someone paying close attention.

💰 Conceit means an inflated self opinion
🧠 Wealth does not equal wisdom
🔎 Real understanding sees through false confidence
📖 Insight belongs to anyone looking closely

## 🎉 When Righteous Men Do Rejoice, There Is Great Glory

Glory here means visible honor and flourishing for the whole community.

When good people are free to lead, everyone benefits openly.

Righteous rejoicing is not private, it shows up publicly.

A healthy community reflects who actually holds influence in it.

🎉 Righteous rejoicing shows up publicly
🏛️ Good leadership brings visible community honor
👥 Everyone benefits when good people lead
📖 A community reflects who holds influence

## 🙈 But When The Wicked Rise, A Man Is Hidden

A man is hidden pictures people retreating out of fear or shame.

When corrupt people gain power, honest citizens often disappear from public life.

This same warning repeats later in this very chapter.

Who rises in leadership changes how safe people feel being seen.

🙈 Hidden pictures people retreating in fear
😨 Corrupt leaders push honest people into hiding
🔁 This warning repeats later in the chapter
📖 Leadership shapes how safe people feel

# Proverbs 28:13-14
# 🙏 Confession And Constant Fear
---
## 🙈 He That Covereth His Sins Shall Not Prosper

Covering here means hiding or denying wrongdoing instead of dealing with it.

Hidden sin does not disappear just because no one else sees it.

It keeps quietly working against the person carrying it.

Prosperity here includes more than just money, it includes peace.

🙈 Covering means hiding, not resolving
🌱 Hidden sin keeps working unseen
💔 It blocks more than just finances
📖 Real prosperity includes real peace

## 🗣️ Whoso Confesseth And Forsaketh Them Shall Have Mercy

Confessing means naming the sin honestly, not just feeling bad about it.

Forsaking means actually turning away from it, not just admitting it happened.

Both steps are required, confession alone is not the same as change.

Mercy meets the person who does both, not just one.

🗣️ Confessing means naming sin honestly
🚶 Forsaking means actually turning away
🔗 Both steps are required together
📖 Mercy meets confession plus change

## 😌 Happy Is The Man That Feareth Alway

Fear here does not mean constant anxiety or nervous dread.

It means staying alert to God and taking sin seriously at all times.

That kind of watchfulness keeps a person from growing careless.

Happiness here grows out of humility, not out of comfort.

😌 Fear here is not anxious dread
👀 It means staying alert to God
🛡️ Watchfulness prevents careless living
📖 Happiness grows out of humility

## 🧱 But He That Hardeneth His Heart Shall Fall Into Mischief

Hardening the heart means gradually losing sensitivity to conviction.

It rarely happens in one dramatic moment.

Small ignored warnings add up into a heart that stops listening.

Mischief here means real, lasting harm, not a minor slip.

🧱 Hardening means losing sensitivity slowly
🐢 It builds up from small ignored warnings
💥 Mischief here means lasting real harm
📖 A hardened heart stops hearing warnings

# Proverbs 28:15-18
# 🐻 Wicked Rulers And The Straight Path
---
## 🦁 As A Roaring Lion, And A Ranging Bear, So Is A Wicked Ruler Over The Poor People

A roaring lion and a hunting bear were two of the deadliest threats in this world.

Ranging here means actively prowling and searching for prey.

A wicked ruler over the poor is compared to both threats at once.

The poor had the least protection against powerful predators of any kind.

Leadership without mercy becomes a form of open predation.

🦁 A roaring lion was a deadly threat
🐻 Ranging means actively prowling for prey
😨 The poor had the least protection
📖 Leadership without mercy becomes predation

## 📉 The Prince That Wanteth Understanding Is Also A Great Oppressor

Wanteth here means lacking, not desiring.

A ruler without wisdom does not need to be cruel on purpose to cause harm.

He that hateth covetousness is the opposite kind of leader.

Covetousness means grasping for more, especially through unfair advantage.

That kind of restraint earns something better than riches, a lasting rule.

📉 Wanteth means lacking, not desiring
🤷 Ignorant leadership harms without intending to
🚫 Refusing covetousness earns lasting stability
📖 Restraint builds what greed never can

## 🩸 A Man That Doeth Violence To The Blood Of Any Person Shall Flee To The Pit, Let No Man Stay Him

Blood here refers to taking a human life unlawfully.

Fleeing to the pit pictures someone driven by guilt, running toward their own ruin.

Let no man stay him means no one should intervene to protect him from justice.

This is a rare command in Proverbs to let consequences run their course.

🩸 Blood here means unlawful killing
🕳️ Fleeing to the pit pictures self ruin
✋ No one should shield him from justice
📖 Some consequences must run their course

## 🚶 Whoso Walketh Uprightly Shall Be Saved

Walking uprightly means a consistent pattern of honest living, not perfection.

Saved here can mean protection from real, practical danger.

A steady, honest life tends to avoid many traps other paths fall into.

Integrity functions as its own kind of protection.

🚶 Walking uprightly means consistent honesty
🛡️ Saved here means real protection
🧭 Steady honesty avoids many hidden traps
📖 Integrity protects on its own

## 💥 But He That Is Perverse In His Ways Shall Fall At Once

Perverse here means twisted, crooked conduct chosen again and again.

Fall at once suggests a sudden, decisive collapse, not a slow decline.

Crooked paths eventually run out of room to maneuver.

What looked stable can collapse without warning.

🌀 Perverse means repeated crooked conduct
💥 Fall at once means sudden collapse
🛣️ Crooked paths run out of room
📖 Stability can collapse without warning

# Proverbs 28:19-21
# 🌾 Diligence, Haste, And Favoritism
---
## 🌾 He That Tilleth His Land Shall Have Plenty Of Bread

Tilling meant the slow, unglamorous work of preparing soil for planting.

This is not a promise of overnight wealth.

Following after vain persons describes chasing empty schemes instead of real work.

That kind of shortcut trades steady labor for a payoff that never comes.

Poverty enough carries a tone of built in, deserved consequence.

🌾 Tilling meant slow, unglamorous soil work
💨 Vain persons chase empty schemes
🔀 Shortcuts trade labor for empty payoff
📖 Steady work and shortcuts end differently

## 🤝 A Faithful Man Shall Abound With Blessings

Faithful here means reliable and consistent over a long stretch of time.

Abound means overflowing, more than just getting by.

Blessings here are not limited to money alone.

Consistency over time produces more than any single lucky moment.

🤝 Faithful means reliable over time
🌊 Abound means overflowing, not just enough
🎁 Blessings here go beyond money
📖 Consistency outperforms any lucky moment

## 🏃 But He That Maketh Haste To Be Rich Shall Not Be Innocent

Making haste means chasing wealth through shortcuts instead of steady work.

This same warning repeats again a few verses later in this chapter.

Not innocent implies the shortcuts usually involve some form of dishonesty.

Speed toward riches and integrity rarely travel together.

🏃 Making haste means chasing shortcuts
🔁 This warning repeats later in the chapter
⚠️ Not innocent implies hidden dishonesty
📖 Speed and integrity rarely travel together

## 👀 To Have Respect Of Persons Is Not Good

Respect of persons here means favoritism based on status, not real character.

Judges and leaders were especially warned against this throughout Proverbs.

For a piece of bread that man will transgress shows how cheaply favoritism sells out fairness.

Even a small bribe was enough to bend someone's judgment.

Justice loses all its value the moment it can be bought.

👀 Respect of persons means status based favoritism
⚖️ Leaders were warned against this often
🍞 A small bribe was enough to bend judgment
📖 Bought justice loses all its value

# Proverbs 28:22-24
# 👁️ The Evil Eye And A Broken Family
---
## 👁️ He That Hasteth To Be Rich Hath An Evil Eye

Evil eye here is a Hebrew idiom for stinginess and envy, not literal sight.

Someone with an evil eye resents sharing and begrudges other people's success.

Considereth not means willfully refusing to think ahead.

The rush toward riches blinds a person to the risk they are taking.

Poverty is presented here as a real, likely outcome, not a distant fear.

👁️ Evil eye is Hebrew for stinginess
🙈 Considereth not means refusing to think ahead
🌀 Rushing blinds a person to real risk
📖 Greed can cost what it was chasing

## ⏳ He That Rebuketh A Man Afterwards Shall Find More Favour Than He That Flattereth With The Tongue

Afterwards is the key word in this whole verse.

Rebuke often feels worse in the moment than flattery does.

Over time, the person who was honest tends to earn more real trust.

Flattery pleases briefly but rarely leaves anything lasting behind it.

⏳ Afterwards is the key word here
🗣️ Honest rebuke feels worse at first
🤝 Honesty earns more trust over time
📖 Flattery pleases but leaves nothing lasting

## 👪 Whoso Robbeth His Father Or His Mother, And Saith, It Is No Transgression, The Same Is The Companion Of A Destroyer

Robbing parents likely describes taking an inheritance early or through deception.

Saying it is no transgression shows a conscience that has already excused itself.

Companion of a destroyer places this sin in violent, criminal company.

Justifying wrong before doing it is a warning sign, not a defense.

👪 Robbing parents likely means taking inheritance early
🗣️ The excuse reveals an already justified conscience
💥 This sin joins violent, criminal company
📖 Self justification is a warning, not a defense

# Proverbs 28:25-28
# 🎈 Pride, Trust, And Giving To The Poor
---
## 🎈 He That Is Of A Proud Heart Stirreth Up Strife

A proud heart assumes it is always right, and rarely yields.

Strife here means ongoing conflict, not a single disagreement.

Pride refuses correction, and that refusal keeps conflict alive.

Most lasting conflict traces back to someone unwilling to bend.

🎈 Pride assumes it is always right
⚔️ Strife means ongoing, repeated conflict
🚫 Pride refuses correction from anyone
📖 Most lasting conflict traces back to pride

## 🐂 But He That Putteth His Trust In The LORD Shall Be Made Fat

Made fat is an old picture of thriving and being well provided for.

It contrasts sharply with the emptiness pride eventually produces.

Trusting the LORD means depending on Him instead of personal certainty.

A humble, dependent life tends to end up more full, not less.

🐂 Made fat pictures thriving and provision
🎈 It contrasts with pride's emptiness
🙏 Trust means depending on God, not self
📖 Humility ends up fuller than pride

## ❤️ He That Trusteth In His Own Heart Is A Fool

Trusting your own heart means treating personal feelings as always reliable.

Feelings shift with mood, circumstance, and self interest.

Scripture consistently warns that the heart can deceive the person carrying it.

Calling this trust foolish is a direct, unflattering label.

❤️ Trusting your heart means trusting shifting feelings
🌀 Feelings shift with mood and interest
⚠️ Scripture warns the heart can deceive
📖 This trust earns a direct, unflattering label

## 🧭 But Whoso Walketh Wisely, He Shall Be Delivered

Walking wisely means testing feelings against something outside yourself, like God's word.

Wisdom does not ignore emotion, it just refuses to be ruled by it alone.

Delivered here suggests rescue from real, practical danger.

An outside standard protects a person from their own blind spots.

🧭 Walking wisely tests feelings against truth
⚖️ Wisdom does not ignore emotion entirely
🛟 Delivered means rescue from real danger
📖 An outside standard covers blind spots

## 🤲 He That Giveth Unto The Poor Shall Not Lack

This is not a formula guaranteeing instant wealth for every giver.

It describes a general pattern of generosity being met with provision.

Giving to the poor reflects the character of God Himself.

A generous life tends to be a provided for life.

🤲 This is not a formula for instant wealth
🔄 It describes a general pattern of provision
❤️ Giving reflects God's own character
📖 A generous life tends to be provided for

## 🙈 But He That Hideth His Eyes Shall Have Many A Curse

Hiding the eyes pictures a deliberate refusal to see someone in need.

It is not simply failing to notice, it is choosing not to look.

Many a curse suggests repeated hardship, not a single misfortune.

Closing your eyes to need does not make the need disappear.

🙈 Hiding the eyes means deliberate refusal
👀 It is choosing not to look
🔁 Many a curse suggests repeated hardship
📖 Ignoring need does not erase it

## 🔁 When The Wicked Rise, Men Hide Themselves, But When They Perish, The Righteous Increase

This verse repeats the same idea from verse twelve almost exactly.

Repeating it here closes the chapter on the same warning it carried throughout.

Who is in power shapes how safe ordinary people feel.

When the wicked fall, honest people are finally free to grow again.

🔁 This repeats the warning from verse twelve
😨 Power in wrong hands makes people hide
🌱 The righteous grow once the wicked fall
📖 Leadership shapes whether a community shrinks or grows
`.trim();

export const PROVERBS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseProverbsTwentyEightRawNotes(PROVERBS_TWENTY_EIGHT_RAW_NOTES);
