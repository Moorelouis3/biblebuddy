export type ProverbsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwelveRawNotes(rawText: string): ProverbsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 12:${startVerse}` : `Proverbs 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 12 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWELVE_RAW_NOTES = `# Proverbs 12:1-4
# 🎓 Instruction, Favour, And A Virtuous Wife
---
## 🎓 Whoso Loveth Instruction Loveth Knowledge

"Instruction" here means correction, being told plainly where you went wrong.

Loving instruction means welcoming that correction instead of resenting it.

This proverb ties love of knowledge directly to a willingness to be corrected.

A person cannot want to learn and refuse to be told the truth at the same time.

🎓 Instruction means correction, not just teaching

❤️ Loving it means welcoming being corrected

🔗 Knowledge and correction are tied together

📖 Wanting truth means accepting correction too

## 🐴 He That Hateth Reproof Is Brutish

"Reproof" is the same idea as instruction, being shown a fault.

"Brutish" means acting like an animal, without reason or reflection.

This is a strong word on purpose, refusing correction is pictured as less than human.

The verse pairs love of learning with a refusal to learn in the sharpest terms it has.

🪞 Reproof means being shown a fault

🐴 Brutish means acting without reason

⚔️ This is a strong word on purpose

📖 Refusing correction is pictured as less than human

## 🙏 A Good Man Obtaineth Favour Of The LORD

This proverb states plainly that God notices and responds to a good life.

"Favour" means God's kindness and approval resting on someone.

"Obtaineth" pictures favour as something actually gained, not simply hoped for.

Goodness is treated here as something that genuinely reaches God.

🙏 Favour means God's kindness and approval

✅ Obtaineth means favour is actually gained

👀 God notices and responds to goodness

📖 A good life genuinely reaches God

## ⚖️ A Man Of Wicked Devices Will He Condemn

"Devices" means schemes, plans made on purpose to do harm.

"Condemn" means God judges that person guilty and responds accordingly.

This is the opposite outcome from the good man in the first half of the verse.

Planning evil is treated here as seriously as doing it.

🧠 Devices means schemes planned on purpose

⚖️ Condemn means judged guilty by God

🔄 This opposes the good man's favour

📖 Planning evil is punished like doing it

## 🏛️ A Man Shall Not Be Established By Wickedness

"Established" means built to last, firmly set in place.

Wickedness might look like it builds something for a while.

This proverb insists that foundation will not actually hold.

A life built on wrongdoing is shown here as unstable no matter how it looks.

🏛️ Established means built to last

👀 Wickedness can look stable for a while

💥 This proverb says that foundation will not hold

📖 Wrongdoing builds something unstable

## 🌳 The Root Of The Righteous Shall Not Be Moved

"Root" pictures a tree anchored deep in the ground.

"Shall not be moved" means nothing can shake it loose.

Think of a storm that snaps branches but cannot uproot a deep tree.

Righteousness is pictured here as that kind of lasting stability.

🌳 Root pictures a tree anchored deep

🌬️ Nothing can shake it loose

🌪️ A storm snaps branches, not deep roots

📖 Righteousness is pictured as lasting stability

## 👑 A Virtuous Woman Is A Crown To Her Husband

"Virtuous" means strong, capable, and of excellent character, not simply nice.

A "crown" was a public sign of honor, worn where everyone could see it.

This proverb pictures her character as something that visibly honors her husband.

Her worth is shown here as a public good, not only a private blessing.

💪 Virtuous means strong and of excellent character

👑 A crown was a public sign of honor

👀 Her character visibly honors her husband

📖 Her worth is shown as a public good

## 🦴 She That Maketh Ashamed Is As Rottenness In His Bones

"Maketh ashamed" means bringing public disgrace onto someone through bad behavior.

"Rottenness in his bones" pictures decay from the inside, slow and hidden at first.

Bones were the strongest part of the body in this culture's thinking, the deep support structure.

This kind of shame is pictured here as weakening a husband from within.

😳 Maketh ashamed means bringing public disgrace

🦴 Rottenness in his bones pictures inner decay

🏗️ Bones pictured the body's deep support

📖 This shame weakens a husband from within

# Proverbs 12:5-9
# 🏠 Thoughts, Words, And A House That Stands
---
## ⚖️ The Thoughts Of The Righteous Are Right

"Thoughts" here means a person's inner plans and intentions, not stray ideas.

"Right" means just, fair, aligned with what is actually good.

This proverb reaches past outward behavior into the mind where a plan begins.

A righteous life is shown here starting long before any action is taken.

🧠 Thoughts means a person's inner plans

✅ Right means just and fair

🌱 Righteousness starts before any action

📖 A good life begins in the mind

## 🎭 The Counsels Of The Wicked Are Deceit

"Counsels" means the advice and plans a person forms, the same idea as thoughts.

"Deceit" here means the wicked person's own plans are built on lies, even to themselves.

This is not only about deceiving others, it includes self deception.

The wicked person's inner life is shown here as crooked at its own root.

🧠 Counsels means the plans a person forms

🎭 Deceit means those plans are built on lies

🪞 This includes deceiving themselves, not just others

📖 The wicked mind is crooked at its root

## 🗡️ The Words Of The Wicked Are To Lie In Wait For Blood

"Lie in wait" pictures an ambush, waiting hidden to attack someone unaware.

This does not always mean a literal murder plot.

It can mean speech used to trap, ruin, or destroy another person's life.

Words here are treated as a real weapon, not harmless talk.

🗡️ Lie in wait pictures an ambush

🚫 This is not always a literal murder plot

🎯 Speech can trap or ruin a person

📖 Words are treated as a real weapon

## 🛟 The Mouth Of The Upright Shall Deliver Them

"Deliver" means to rescue from real danger.

This is the opposite of the ambushing words just described.

Honest speech is pictured here as something that can actually save a life.

The same body part that can destroy in one half of the verse can rescue in the other.

🛟 Deliver means rescue from real danger

🔄 This opposes the ambushing words just described

🗣️ Honest speech can actually save a life

📖 The same mouth destroys or rescues

## 💥 The Wicked Are Overthrown, And Are Not

"Overthrown" means violently brought down, not a quiet fall.

"Are not" is a blunt way of saying they simply cease to exist anymore.

This is one of the starkest endings given to the wicked anywhere in this chapter.

Their downfall is described here as total, not partial.

💥 Overthrown means violently brought down

🕳️ Are not means they simply cease

⚔️ This is a stark, blunt ending

📖 Their downfall is described as total

## 🏠 The House Of The Righteous Shall Stand

"House" here means a family's whole household, not just a building.

"Shall stand" means it remains standing after the storm that took down the wicked.

This continues the same picture from verse three, something built to last.

A righteous family is shown here outlasting whatever tears down the wicked.

🏠 House means a whole household

🌪️ Shall stand means it survives the storm

🔁 This repeats the picture from verse three

📖 A righteous family outlasts the wicked

## 🏅 A Man Shall Be Commended According To His Wisdom

"Commended" means publicly praised or approved by others.

This proverb ties a person's public reputation to actual wisdom, not luck or looks.

Wise choices, over time, earn real respect in a community.

Praise here is shown as something earned, not simply given.

🏅 Commended means publicly praised

🧠 Reputation is tied to actual wisdom

⏳ Wise choices earn respect over time

📖 Praise here is something earned

## 👎 He That Is Of A Perverse Heart Shall Be Despised

"Perverse heart" means a will twisted toward wrong on purpose.

"Despised" means looked down on, held in contempt by others.

This is the opposite outcome from the wisdom praised in the first half of the verse.

A crooked inner life eventually shows itself and costs a person real respect.

🌀 Perverse heart means a will twisted toward wrong

👎 Despised means held in contempt

🔄 This opposes being commended for wisdom

📖 A crooked inner life costs real respect

## 🤷 He That Is Despised, And Hath A Servant

This does not mean status alone makes a person valuable.

"Despised" here likely points to someone poor or of low social standing.

Even so, having a servant meant this person still had real, practical means.

The verse sets up a surprising comparison before finishing its point in the second half.

🤷 Status alone does not make someone valuable

📉 Despised here points to low social standing

🛠️ Having a servant meant real practical means

📖 The verse sets up a surprising comparison

## 🍞 Is Better Than He That Honoureth Himself, And Lacketh Bread

"Honoureth himself" means someone who thinks highly of his own status.

"Lacketh bread" means he does not actually have enough to eat.

This proverb values real substance over empty self regard.

Appearance without provision is worth less than humility with real means.

🎭 Honoureth himself means overrating his own status

🍞 Lacketh bread means not having enough to eat

⚖️ This values real substance over empty pride

📖 Appearance without provision is worth less

# Proverbs 12:10-14
# 🌾 A Righteous Man And His Beast, His Land, His Mouth
---
## 🐴 A Righteous Man Regardeth The Life Of His Beast

"Regardeth" means to care about and pay real attention to something.

"Beast" here means livestock, animals a family depended on for work and food.

This proverb extends righteousness beyond people to how someone treats an animal.

Godly character is shown here reaching into the smallest daily decisions.

👀 Regardeth means caring about something

🐴 Beast means livestock the family depended on

🌱 Righteousness extends even to animals

📖 Godly character reaches small daily decisions

## 💔 The Tender Mercies Of The Wicked Are Cruel

This does not describe the wicked as having no mercy at all.

Even their best, gentlest impulse is still twisted toward harm.

"Tender mercies" is the very word usually used for real kindness, turned on its head here.

This is one of the sharpest lines in the chapter about how deep wickedness runs.

🤷 This is not about having zero mercy

🌀 Even their gentlest impulse is twisted

🔄 A word for kindness gets twisted

📖 This shows how deep wickedness runs

## 🌾 He That Tilleth His Land Shall Be Satisfied With Bread

"Tilleth" means working the ground, plowing and planting by hand.

"Satisfied with bread" means having real, sufficient food as a result.

Steady, ordinary labor is pictured here as leading to a real, dependable outcome.

This is practical wisdom about work, not only a spiritual metaphor.

🌾 Tilleth means working the ground by hand

🍞 Satisfied with bread means having enough food

⏳ Steady labor leads to a real outcome

📖 This is practical wisdom about work

## 🚫 He That Followeth Vain Persons Is Void Of Understanding

"Vain persons" means people who chase empty, worthless pursuits with no real substance.

"Void of understanding" means genuinely lacking good judgment, not simply unlucky.

This is the opposite of the diligent farmer in the first half of the verse.

Choosing who to follow is shown here as a real test of wisdom.

💨 Vain persons means those chasing empty pursuits

🕳️ Void of understanding means lacking good judgment

🔄 This opposes the diligent farmer just named

📖 Who a person follows tests real wisdom

## 🪤 The Wicked Desireth The Net Of Evil Men

"Net" here pictures a trap used to catch prey, often by deceit.

"Desireth" means the wicked actually want this kind of scheme, not stumble into it.

This proverb pictures wrongdoing as something actively sought after, like hunting gear.

Wanting to trap others is shown here as a deliberate choice, not an accident.

🪤 Net pictures a trap used to catch prey

🎯 Desireth means actively wanting this scheme

🏹 Wrongdoing is pictured like hunting gear

📖 Trapping others is shown as deliberate

## 🌳 The Root Of The Righteous Yieldeth Fruit

"Root" repeats the same picture from verse three, something anchored and alive.

"Yieldeth fruit" means it actually produces something good over time.

This contrasts the wicked person's trap with the righteous person's harvest.

One life sets snares, the other grows something worth eating.

🌳 Root repeats the picture from verse three

🍇 Yieldeth fruit means it produces something good

⚖️ This contrasts a trap with a harvest

📖 One life snares, the other grows fruit

## 🪤 The Wicked Is Snared By The Transgression Of His Lips

"Transgression of his lips" means sinful speech, lies or careless talk.

"Snared" means caught, the same trap image used earlier in this chapter.

The very tool the wicked used to trap others becomes the thing that traps them.

Words are shown here circling back on the person who spoke them.

🗣️ Transgression of his lips means sinful speech

🪤 Snared means caught, echoing the earlier trap

🔄 Their own tool becomes their trap

📖 Words circle back on the speaker

## 🛟 The Just Shall Come Out Of Trouble

"Come out of trouble" means an actual escape, not staying stuck in it.

This does not promise the just never face trouble at all.

It promises trouble will not be the final word over their life.

This is the same pattern already seen for the righteous earlier in this book.

🚪 Come out of trouble means an actual escape

🚫 This does not promise trouble never comes

🏁 Trouble is not the final word

📖 This repeats a pattern seen earlier

## 🍞 A Man Shall Be Satisfied With Good By The Fruit Of His Mouth

"Fruit of his mouth" means the results that come from what someone says.

Good, honest words are pictured here as something that actually feeds a person's life.

This repeats the same fruit image used for the righteous just a few verses earlier.

What comes out of a mouth is shown here shaping what comes back to its owner.

🗣️ Fruit of his mouth means results from speech

🍞 Good words are pictured as nourishing

🔁 This repeats the fruit image from before

📖 What a mouth says shapes what returns

## ✋ The Recompence Of A Man's Hands Shall Be Rendered Unto Him

"Recompence" means payment, whatever a person actually earns through their actions.

"Rendered unto him" means it comes back and is given directly to that person.

This pairs speech in the first half of the verse with action in the second.

Words and deeds are both shown here returning to the one who produced them.

💰 Recompence means payment a person earns

✋ Rendered unto him means it returns to them

🔗 This pairs speech with action in one verse

📖 Words and deeds both return to their source

# Proverbs 12:15-19
# 🗣️ The Fool's Way And The Tongue's Power
---
## 👁️ The Way Of A Fool Is Right In His Own Eyes

"Right in his own eyes" is an idiom meaning a person is fully convinced by their own judgment.

It does not mean their way is actually right, only that they believe it is.

A fool here trusts personal opinion over any outside correction.

This sets up the direct contrast in the second half of the verse.

👁️ Right in his own eyes means self convinced

🤷 This does not mean the way is right

🚫 A fool trusts opinion over correction

📖 This sets up the coming contrast

## 👂 He That Hearkeneth Unto Counsel Is Wise

"Hearkeneth" means to listen closely and actually take advice to heart.

"Counsel" means wise guidance offered by someone else.

This is the opposite of the fool trusting only his own eyes.

Wisdom here is shown as a willingness to be taught, not raw cleverness.

👂 Hearkeneth means listening and taking advice to heart

🗣️ Counsel means wise guidance from someone else

🔄 This opposes trusting only one's own eyes

📖 Wisdom means being willing to be taught

## 😠 A Fool's Wrath Is Presently Known

"Wrath" here means anger, a strong emotional reaction.

"Presently known" means it shows up immediately, with no attempt to hide it.

A fool is pictured here as someone who cannot manage a strong feeling.

Their anger is on full display the moment it happens.

😠 Wrath means a strong emotional reaction

⚡ Presently known means it shows up immediately

🎭 A fool cannot manage a strong feeling

📖 Their anger is on full display

## 🤐 A Prudent Man Covereth Shame

"Prudent" means someone who thinks carefully before reacting.

"Covereth shame" means choosing not to broadcast an insult or embarrassing moment.

This directly contrasts the fool's public outburst just described.

Self control here is shown as a form of real wisdom.

🧠 Prudent means thinking carefully before reacting

🤐 Covereth shame means not broadcasting an insult

🔄 This contrasts the fool's outburst

📖 Self control is shown as real wisdom

## ✅ He That Speaketh Truth Sheweth Forth Righteousness

"Sheweth forth" is an old way of saying displays or reveals openly.

Speaking truth is pictured here as evidence of a person's actual character.

Honesty is not just a rule being followed, it is character on display.

What comes out of a person's mouth reveals what is already inside them.

✅ Sheweth forth means displays openly

🗣️ Speaking truth reveals actual character

👀 Honesty is character on display

📖 A mouth reveals what is inside

## 🎭 A False Witness Deceit

This short phrase completes the contrast started in the first half of the verse.

A "false witness" is someone who lies, especially in a legal or public setting.

Where truth reveals righteousness, false testimony reveals and spreads deceit.

This chapter keeps pairing truthful speech with real, positive results.

⚖️ This completes the verse's contrast

🎭 A false witness means someone who lies publicly

🔄 False testimony spreads deceit instead

📖 Truthful speech keeps producing real results

## 🗡️ There Is That Speaketh Like The Piercings Of A Sword

"Piercings of a sword" pictures words that wound as sharply as a blade.

This is not describing a literal weapon, it describes reckless or cruel speech.

Careless words are shown here doing real damage, even without touching anyone.

Speech in this book is treated as genuinely capable of harm.

🗡️ Piercings of a sword pictures wounding words

🚫 This is not a literal weapon

💔 Careless words do real damage

📖 Speech is treated as capable of harm

## 🩹 The Tongue Of The Wise Is Health

"Health" here means healing, restoring what was hurt or broken.

This is the opposite image from the wounding sword just described.

Wise speech is pictured here as medicine, not simply the absence of harm.

The same tongue that could wound instead brings healing.

🩹 Health here means healing what was broken

🔄 This opposes the wounding sword image

💊 Wise speech is pictured as medicine

📖 The same tongue can bring healing

## ⏳ The Lip Of Truth Shall Be Established For Ever

"Established for ever" means lasting permanently, never being overturned.

Truthful speech is pictured here as something built to outlast time itself.

This gives truth a kind of durability that nothing false can share.

What is honest keeps standing long after everything else fades.

⏳ Established for ever means lasting permanently

🏛️ Truth is pictured as built to outlast time

💎 This gives truth real durability

📖 What is honest keeps standing over time

## 💨 A Lying Tongue Is But For A Moment

"But for a moment" means it lasts only briefly before it fails.

This directly contrasts the permanence of truth just described.

A lie might work for a short time, but it always runs out.

Time itself is shown here exposing what is false.

💨 But for a moment means it lasts briefly

🔄 This contrasts the permanence of truth

⏱️ A lie always eventually runs out

📖 Time exposes what is false

# Proverbs 12:20-24
# ⚖️ Deceit, Delight, And The Diligent Hand
---
## 🎭 Deceit Is In The Heart Of Them That Imagine Evil

"Imagine evil" means actively planning harm in one's mind, not a passing thought.

"Deceit" here describes the inner state of someone plotting against others.

This proverb locates the problem in the heart, before any action is taken.

Wrongdoing is traced here back to its actual starting point.

🧠 Imagine evil means actively planning harm

🎭 Deceit describes the mind of someone plotting

🌱 The problem starts in the heart

📖 Wrongdoing is traced to its starting point

## 😊 To The Counsellors Of Peace Is Joy

"Counsellors of peace" means people who work to bring calm and resolve conflict.

"Joy" here means genuine gladness that comes from that kind of work.

This opposes the plotting mind described in the first half of the verse.

Working for peace is shown here as something that brings real happiness to the one doing it.

🕊️ Counsellors of peace work to resolve conflict

😊 Joy means genuine gladness from that work

🔄 This opposes the plotting mind just named

📖 Working for peace brings real happiness

## 🛡️ There Shall No Evil Happen To The Just

This does not promise the just will never suffer hardship at all.

Other proverbs in this book already show the righteous facing real trouble.

This likely means no lasting, final harm can actually undo a just person.

God's ultimate protection is being promised here, not a trouble free life.

🤷 This is not a promise of zero hardship

📜 Other proverbs already show the righteous facing trouble

🛡️ No lasting harm can truly undo them

📖 God promises ultimate protection, not an easy life

## 😈 The Wicked Shall Be Filled With Mischief

"Mischief" here is a strong old word for real harm and trouble, not childish pranks.

"Filled with" pictures trouble as something that completely surrounds a wicked life.

This is the opposite outcome from the protection just promised to the just.

What a person sows is shown here filling their own life in return.

😈 Mischief means real harm, not childish pranks

🌊 Filled with pictures trouble surrounding a life

🔄 This opposes the protection just promised

📖 A person's life fills with what they sow

## 🤢 Lying Lips Are Abomination To The LORD

"Abomination" repeats the strongest word this book uses for something God finds truly disgusting.

This same word already appeared for the rigged scale back in chapter eleven.

Dishonest speech is placed here in that same serious category.

God treats lying as more than a small slip.

It offends the LORD deeply.

🤢 Abomination repeats the strongest word for disgust

⚖️ The same word covered the rigged scale before

🗣️ Dishonest speech is in that same category

📖 Lying offends the LORD, not lightly

## 🤝 They That Deal Truly Are His Delight

"Deal truly" means acting honestly in everyday dealings with other people.

"Delight" repeats the same word used for the just weight back in chapter eleven.

This closes the loop between honest business and honest speech across both chapters.

Ordinary honesty is treated here as something that brings God real pleasure.

🤝 Deal truly means acting honestly with others

❤️ Delight repeats the word from chapter eleven

🔗 This links honest business with honest speech

📖 Ordinary honesty brings God real pleasure

## 🤫 A Prudent Man Concealeth Knowledge

This does not mean hiding truth or refusing to help someone.

"Concealeth knowledge" means not showing off everything a person knows.

A prudent person speaks carefully, at the right time, not constantly.

Restraint with words is shown here as a mark of real wisdom.

🤷 This is not about hiding truth

🤫 Concealeth knowledge means not showing off

⏳ A prudent person speaks at the right time

📖 Restraint with words is real wisdom

## 📢 The Heart Of Fools Proclaimeth Foolishness

"Proclaimeth" means announcing loudly and openly, the opposite of concealing.

A fool broadcasts every thought without discernment or restraint.

This directly contrasts the careful, quiet wisdom just described.

What fills a person's heart eventually comes out for everyone to hear.

📢 Proclaimeth means announcing loudly and openly

🌀 A fool broadcasts every thought without restraint

🔄 This contrasts the careful wisdom just named

📖 What fills the heart comes out eventually

## ✋ The Hand Of The Diligent Shall Bear Rule

"Diligent" means hardworking and consistent in effort over time.

"Bear rule" means gaining real authority and leadership over others or over circumstances.

Hard work is pictured here leading naturally to influence and responsibility.

Effort, not luck, is shown as the path to real leadership.

💪 Diligent means hardworking over time

👑 Bear rule means gaining real authority

🌱 Hard work leads naturally to influence

📖 Effort, not luck, leads to leadership

## ⛓️ The Slothful Shall Be Under Tribute

"Slothful" means lazy, unwilling to put in consistent effort.

"Under tribute" means forced to serve or pay someone else, losing real independence.

This is the opposite outcome from the leadership just promised to the diligent.

Laziness is shown here costing a person their own freedom.

😴 Slothful means unwilling to put in effort

⛓️ Under tribute means losing real independence

🔄 This opposes the leadership just promised

📖 Laziness costs a person their freedom

# Proverbs 12:25-28
# 🛤️ A Heavy Heart, A Lazy Hunter, And The Path Of Life
---
## 😔 Heaviness In The Heart Of Man Maketh It Stoop

"Heaviness" means real emotional weight, grief, worry, or anxiety.

"Maketh it stoop" pictures the heart bending low, like something carrying too much weight.

This proverb takes ordinary sadness seriously as a real, physical sounding burden.

Emotional pain is treated here as genuinely heavy, not something to just shrug off.

😔 Heaviness means real emotional weight

🎒 Maketh it stoop pictures a heart bending low

⚖️ Sadness is taken seriously as a real burden

📖 Emotional pain is treated as genuinely heavy

## 😊 A Good Word Maketh It Glad

"Good word" means kind, encouraging speech offered to someone.

"Maketh it glad" means it actually lifts a heavy heart back up.

This directly answers the weight just described in the first half of the verse.

Simple words are shown here as genuinely powerful enough to change how someone feels.

😊 A good word means kind encouraging speech

⬆️ Maketh it glad means it lifts the heart

🔄 This answers the weight just described

📖 Simple words are genuinely powerful

## 👑 The Righteous Is More Excellent Than His Neighbour

"More excellent" means genuinely better in character, not just luckier or richer.

This proverb makes a direct comparison between two people living side by side.

A "neighbour" here means an ordinary person in the same community, not an enemy.

Godly character is shown here as something that actually sets a person apart.

👑 More excellent means genuinely better in character

🏘️ This compares two people living side by side

🤝 Neighbour means an ordinary person nearby

📖 Godly character sets a person apart

## 🌀 The Way Of The Wicked Seduceth Them

"Seduceth" means leads astray, gently at first, until it is too late to notice.

"Way" here means a whole pattern of living, not one single choice.

The wicked are pictured here as being led, not only choosing on their own.

Sin is shown here working slowly, pulling a person off course a little at a time.

🌀 Seduceth means leads astray gradually

🛤️ Way means a whole pattern of living

🥾 The wicked are pictured as being led

📖 Sin pulls a person off course slowly

## 🏹 The Slothful Man Roasteth Not That Which He Took In Hunting

This pictures a hunter who caught real game but never finished the job.

"Roasteth not" means failing to actually cook and use what was already caught.

Laziness here is not about never starting, it is about never finishing.

Effort spent halfway is shown here as effort wasted.

🏹 This pictures a hunter who caught real game

🔥 Roasteth not means never finishing the job

🛑 Laziness here means never finishing, not never starting

📖 Effort spent halfway is effort wasted

## 💎 The Substance Of A Diligent Man Is Precious

"Substance" here means real wealth, possessions actually gained through labor.

"Precious" means genuinely valuable, worth having and keeping.

This closes the hunting picture, the diligent finish what the slothful abandon.

Finished effort is shown here as the thing that actually produces lasting value.

💎 Substance means real wealth gained through labor

✨ Precious means genuinely valuable

🏁 The diligent finish what the slothful abandon

📖 Finished effort produces lasting value

## 🛤️ In The Way Of Righteousness Is Life

"Way of righteousness" means a whole life lived rightly before God, not one good deed.

"Life" here means real flourishing, the same fuller meaning already seen earlier in this chapter.

This proverb closes the chapter by naming a whole life direction.

Righteousness is pictured one final time here as a road that actually leads somewhere good.

🛤️ Way of righteousness means a whole life

🌿 Life means real flourishing, not just staying alive

🧭 This names a direction, not one choice

📖 Righteousness is a road leading somewhere good

## ⚰️ In The Pathway Thereof There Is No Death

"Pathway thereof" means that same road of righteousness just named.

"No death" repeats the fuller meaning already used elsewhere in this book, no ultimate ruin.

This is the very last line of a chapter built entirely on two roads.

Proverbs twelve ends where it began, comparing what lasts against what does not.

🛤️ Pathway thereof means that same road of righteousness

⚰️ No death means no ultimate ruin

🏁 This is the chapter's very last line

📖 The chapter ends comparing what lasts
`.trim();

export const PROVERBS_TWELVE_PERSONAL_SECTIONS = parseProverbsTwelveRawNotes(PROVERBS_TWELVE_RAW_NOTES);
