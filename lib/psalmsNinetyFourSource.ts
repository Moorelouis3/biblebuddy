export type PsalmsNinetyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyFourRawNotes(rawText: string): PsalmsNinetyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+94:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 94 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+94:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+94:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 94 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 94,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 94:${startVerse}` : `Psalms 94:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 94 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_FOUR_RAW_NOTES = `# Psalms 94:1-3
# ⚖️ A Cry For The Judge To Act
---
## ⚖️ O Lord God, To Whom Vengeance Belongeth

"Vengeance" means paying back a wrong with equal and rightful punishment.

This psalm opens by naming that vengeance as something that belongs to God alone.

The phrase repeats twice in one verse for emphasis.

Ancient readers were never meant to grab vengeance for themselves.

That right stays only with God.

⚖️ Vengeance means rightful payback for wrong
🔁 The phrase repeats twice for emphasis
🚫 Personal revenge is never the reader's right
📖 Vengeance belongs to God alone

## 👁️ Shew Thyself

"Shew thyself" is an old way of saying make yourself plainly seen.

The psalmist is not asking God to simply exist.

He is asking God to step in and act where everyone can see it.

This is a courtroom picture, the judge finally arriving.

The plea assumes God has stayed silent long enough already.

👁️ Shew thyself means make yourself seen
🙏 The psalmist wants God to act now
⚖️ Pictures a judge finally arriving
📖 The plea assumes God has stayed silent

## 🪑 Lift Up Thyself, Thou Judge Of The Earth

"Judge of the earth" names God as ruler over all nations, not only Israel.

"Lift up thyself" pictures a judge rising from his seat to pronounce sentence.

Ancient judges sat while hearing a case and stood to deliver the verdict.

That standing motion signals the waiting is finally over.

The psalmist wants that verdict now.

🌍 Judge of the earth means ruler over all
🪑 Lift up thyself pictures rising to sentence
🔔 Standing signals the verdict is ready
📖 The psalmist wants that verdict now

## 💰 Render A Reward To The Proud

"Reward" here does not mean a prize.

It means fair payment for what someone has done, in this case punishment.

"The proud" names people who act with no regard for God or others.

The psalmist wants their arrogance met with real consequences.

Justice, not applause, is the reward being asked for here.

💰 Reward here means repayment, not a prize
😤 Proud means acting with no regard for God
⚖️ The plea asks for real consequences
📖 Justice, not applause, is the reward

## 😣 How Long Shall The Wicked Triumph

"Triumph" means celebrating a clear and open victory.

The question "how long" appears twice in one verse.

That repetition is not an accident.

It pictures someone worn down by injustice.

The words spill out twice before the thought even finishes.

The wicked are not just active here.

They are winning, in plain sight, for now.

😣 How long repeats twice for emphasis
🏆 Triumph means an open, celebrated victory
😔 The repetition pictures being worn down
📖 The wicked are winning, for now

# Psalms 94:4-7
# 💔 They Crush The Weak And Deny It
---
## 🛠️ Workers Of Iniquity Boast Themselves

"Workers of iniquity" is a repeated Psalms phrase for people who actively practice evil.

It is not a one time slip.

The word pictures evil as a job someone shows up to do.

"Boast themselves" means bragging openly about what they have done.

There is no shame in their wrongdoing, only pride.

🛠️ Workers of iniquity means practiced evil
😏 Boast themselves means bragging openly
🚫 There is no shame in their sin
📖 Their pride replaces any guilt

## 💔 They Break In Pieces Thy People

"Break in pieces" pictures shattering something solid into fragments.

Applied to people, it describes violent, crushing harm.

"Thy people" names Israel as belonging to God, not to the ones attacking them.

The attackers are not just hurting strangers.

They are crushing something that already belongs to someone else.

💔 Break in pieces means violent crushing harm
👥 Thy people names Israel as God's own
🪨 The picture is something solid, shattered
📖 The victims already belonged to God

## 🎁 And Afflict Thine Heritage

"Afflict" means causing ongoing pain and distress, not a single blow.

"Heritage" describes something inherited, passed down and treasured.

God calls Israel his heritage, his own inherited possession.

Harming God's heritage is not a small offense.

It strikes at what God himself values and keeps.

😖 Afflict means ongoing pain, not one blow
🎁 Heritage means an inherited, treasured possession
👑 God calls Israel his own heritage
📖 This harm strikes at what God values

## 👩 They Slay The Widow And The Stranger, And Murder The Fatherless

Widows, strangers, and the fatherless were the three most vulnerable groups in ancient Israel.

The law repeatedly commanded that they be protected, not preyed upon.

"Slay" and "murder" both describe deliberate killing, not accident.

The wicked here are targeting the very people God's law singled out for care.

That choice makes the crime even worse.

👩 Widows, strangers, fatherless were the most vulnerable
📜 The law commanded they be protected
🗡️ Slay and murder both mean deliberate killing
📖 They targeted the people God's law protected

## 🙈 The LORD Shall Not See

This is not a true statement about God.

It is what the wicked tell themselves to feel safe.

They assume delay means they are safe.

The rest of the psalm answers this claim directly.

God sees everything, including this exact lie.

🙈 This is the wicked's false claim
😌 They assume delay means they are safe
👁️ The rest of the psalm answers this
📖 God sees this exact lie

## 🤝 Neither Shall The God Of Jacob Regard It

"Regard" means paying close attention to something.

The wicked claim God will not even notice, let alone act.

"The God of Jacob" ties this directly to Israel's own covenant history.

Jacob was the man God renamed Israel and bound himself to by promise.

Doubting that this same God notices is doubting the whole covenant.

👀 Regard means paying close attention
🙉 The claim is that God will not notice
🤝 God of Jacob names Israel's covenant history
📖 Doubting this doubts the whole covenant

# Psalms 94:8-11
# 👁️ The God Who Sees And Hears
---
## 🐂 Ye Brutish Among The People

"Brutish" describes acting like an unthinking animal rather than a reasoning person.

It is a sharp insult aimed at the very people who just made that claim.

God is not attacking outsiders here.

He is confronting his own people for thinking so poorly of him.

The rebuke is meant to wake them up.

🐂 Brutish means acting like an unthinking animal
😳 The insult targets God's own people
🚨 The rebuke aims to wake them up
📖 Thinking poorly of God is the real problem

## 🧠 Ye Fools, When Will Ye Be Wise

In the Psalms, "fool" is a moral word, not a word about intelligence.

A fool here is someone who lives like God does not see.

"When will ye be wise" is not really a question expecting an answer.

It is a challenge meant to sting.

Wisdom, in this sense, starts with taking God seriously.

🧠 Fool here is a moral word, not intelligence
🙄 A fool lives like God does not see
❗ The question is really a challenge
📖 Wisdom starts with taking God seriously

## 👂 He That Planted The Ear, Shall He Not Hear

This is a simple but powerful piece of logic.

God designed the human ear.

It makes no sense to think the one who built hearing itself cannot hear.

The wicked assumed God was silent and unaware.

This verse answers that assumption directly, using the very organ they take for granted.

👂 God designed the human ear
🤔 The logic is simple, the maker hears
🙅 This answers the wicked's assumption
📖 God is not unaware of anything

## 👁️ He That Formed The Eye, Shall He Not See

This verse repeats the same argument from the line before, now with sight instead of hearing.

God formed the human eye.

Claiming he cannot see is claiming the inventor of sight is somehow blind.

The repetition doubles the force of the point.

Nothing escapes the notice of the one who designed noticing itself.

👁️ God formed the human eye
🔁 This repeats the hearing argument with sight
🚫 The inventor of sight is not blind
📖 Nothing escapes God's notice

## 📏 He That Chastiseth The Heathen, Shall Not He Correct

"Chastiseth" means disciplining or correcting someone who has done wrong.

"Heathen" refers to the nations outside Israel.

The verse argues that the same God who disciplines whole nations can certainly correct individuals.

His authority is not limited to Israel alone.

Every nation answers to him, whether they acknowledge it or not.

📏 Chastiseth means disciplining someone who did wrong
🌍 Heathen refers to nations outside Israel
👑 God's authority covers every nation
📖 All nations answer to him

## 💨 The Thoughts Of Man, That They Are Vanity

"Vanity" means empty, fleeting, and without lasting weight.

This is the same word used throughout the book of Ecclesiastes.

Human thoughts, left on their own, do not hold up to scrutiny.

God already knows this about people.

That is part of why he stays patient with them.

The verse is not cruel, it is honest.

💨 Vanity means empty and without weight
📚 The same word appears throughout Ecclesiastes
🧠 Human thoughts do not hold up alone
➡️ God's patience grows from this honesty

# Psalms 94:12-15
# 🎓 Discipline That Leads To Rest
---
## 👨‍👧 Blessed Is The Man Whom Thou Chastenest

"Chastenest" means disciplining someone out of love, the way a parent corrects a child.

It is not the same as punishing someone in anger.

Calling this person "blessed" sounds strange at first.

The discipline is proof that God has not given up on him.

Being corrected by God is actually a sign of being cared for.

👨‍👧 Chastenest means loving discipline, not anger
❓ Blessed sounds strange paired with discipline
🤲 The discipline proves God has not given up
📖 Correction is a sign of being cared for

## 🤝 Teachest Him Out Of Thy Law

Discipline in this verse never stands alone.

It is paired directly with teaching.

"Thy law" refers to God's instruction, not just a list of rules to obey.

Correction without teaching would only produce pain.

Correction paired with teaching produces someone who actually understands why.

🤝 Discipline and teaching are paired together
📜 Thy law means God's instruction, not just rules
😣 Correction alone would only produce pain
📖 Teaching gives the correction its meaning

## 🌧️ Rest From The Days Of Adversity

"Adversity" describes a season of real hardship and trouble.

The verse promises rest, not a life with no hardship at all.

That rest comes specifically from being taught by God during hard days.

The next line explains why that rest can be trusted.

Even the wicked have an ending point.

🌧️ Adversity means a season of real hardship
😌 The promise is rest, not an easy life
🎓 Rest comes from being taught during hard days
📖 The wicked have an ending point too

## 🗑️ The LORD Will Not Cast Off His People

"Cast off" means abandoning something completely, throwing it away for good.

The psalm has just described real suffering and real injustice.

This line answers that suffering with a flat promise.

God's people are not being forgotten in the middle of their pain.

The relationship holds even when circumstances look like it should not.

🗑️ Cast off means abandoning something for good
😢 This answers the suffering described earlier
🤍 God's people are not forgotten
📖 The relationship holds despite circumstances

## ⚖️ Judgment Shall Return Unto Righteousness

Right now, in this psalm, judgment looks bent and unfair.

This verse promises that bend is temporary.

"Return unto righteousness" pictures judgment swinging back to where it belongs.

It is not a new kind of justice.

It is the same justice restored to its proper shape.

That restoration is a promise, not yet a finished fact.

⚖️ Judgment currently looks bent and unfair
🔄 Return unto righteousness pictures a swing back
🛠️ This is restoration, not a new justice
📖 The promise is not yet finished

## ❤️ The Upright In Heart Shall Follow It

"Upright in heart" describes someone whose inner life matches their outward behavior.

"Follow it" means walking in step with that restored judgment once it comes.

Not everyone will recognize justice when it finally arrives.

The upright in heart are the ones who will.

Their character is what lets them follow rightly.

❤️ Upright in heart means inner life matches actions
👣 Follow it means walking in step with justice
🙈 Not everyone will recognize justice arriving
📖 Character is what lets them follow rightly

# Psalms 94:16-19
# 🤲 Held Up When The Foot Slips
---
## 🙋 Who Will Rise Up For Me Against The Evildoers

This question sounds like it is looking for a human volunteer.

The rest of the psalm makes clear no human ally showed up.

"Rise up" pictures someone standing to fight on another's behalf.

The psalmist asked around and came up empty.

That empty search sets up the answer in the very next line.

🙋 The question looks for a human volunteer
🤷 No human ally actually showed up
⚔️ Rise up pictures standing to fight for someone
📖 The empty search sets up the next verse

## 😰 Unless The LORD Had Been My Help

This line admits how close the psalmist came to disaster.

"Unless" signals a real, not hypothetical, danger.

Without God stepping in, the ending would have been very different.

The psalmist is not exaggerating for effect here.

He genuinely believes he would not have survived on his own.

😰 Unless signals real, not hypothetical danger
🆘 The psalmist nearly did not survive
🙏 Only God's help changed the outcome
📖 This is not exaggeration for effect

## 🤫 My Soul Had Almost Dwelt In Silence

"Dwelt in silence" is a gentle, older way of describing death.

The grave is pictured as a place with no more voice and no more sound.

"Almost" is the key word in this line.

The psalmist came right up to that edge without actually crossing it.

God's help arrived before silence became permanent.

🤫 Dwelt in silence means death, gently put
⚰️ The grave is pictured as voiceless
🫧 Almost is the key word here
📖 Help arrived before silence became permanent

## 🧊 My Foot Slippeth

"Slippeth" pictures a foot losing its footing on unstable ground.

It is a small phrase describing a large feeling, the moment right before a fall.

Anyone who has slipped on ice knows that instant of panic.

The psalmist felt his own strength giving way.

That is exactly the moment God's mercy stepped in.

🧊 Slippeth pictures a foot losing footing
😨 It describes the instant before a fall
💪 The psalmist felt his strength giving way
📖 That is when God's mercy stepped in

## 🤲 Thy Mercy, O LORD, Held Me Up

"Held me up" pictures a hand catching someone mid fall.

Mercy here is not just a feeling.

It is an action.

The same mercy that forgives sin also catches a stumbling foot.

This verse answers the slipping foot from the line before it.

God's mercy arrived exactly when it was needed, not after.

🤲 Held me up pictures a catching hand
❤️ Mercy is an action here, not a feeling
🔗 This answers the slipping foot before it
📖 Mercy arrived exactly when needed

## 🌀 In The Multitude Of My Thoughts Within Me Thy Comforts Delight My Soul

"Multitude of my thoughts" describes a mind crowded with worry.

Anxious thoughts do not arrive one at a time.

They pile up instead.

"Comforts" here means God's own reassurance, actively given.

Even in a crowded mind, that reassurance can still bring real delight.

The noise does not win.

🌀 Multitude of thoughts means a crowded, worried mind
📚 Anxious thoughts pile up instead of trickle
🤗 Comforts means God's own active reassurance
📖 Real delight can survive a crowded mind

# Psalms 94:20-23
# 🛡️ The Rock Outlasts The Corrupt Throne
---
## 👑 The Throne Of Iniquity

"Throne" pictures a seat of real, official power.

"Iniquity" means deep, deliberate wrongdoing.

Putting the two words together describes corrupt rulers using their real authority for evil.

This is not a lone criminal acting in secret.

This is power itself turned rotten.

👑 Throne pictures a seat of real power
💔 Iniquity means deep, deliberate wrongdoing
🏛️ Together they describe corrupt rulers in office
📖 This is power itself turned rotten

## 🛠️ Which Frameth Mischief By A Law

"Frameth" means constructing something carefully, piece by piece.

This is not lawless chaos being described here.

It is injustice built on purpose, using the legal system itself.

Laws are supposed to protect people, not to legally harm them.

This verse names one of the worst kinds of corruption.

It is evil that wears the appearance of order.

🛠️ Frameth means building something carefully
⚖️ This injustice uses the legal system itself
🚫 Laws are meant to protect, not harm
📖 This is evil wearing the appearance of order

## ⚖️ They Condemn The Innocent Blood

"Condemn" means officially declaring someone guilty.

"Innocent blood" is a phrase used throughout the Bible for the killing of someone who did nothing wrong.

Here it happens through a corrupt legal process, not open violence.

The victim is punished by the very system meant to protect them.

That betrayal is part of what makes this so serious.

⚖️ Condemn means officially declaring someone guilty
🩸 Innocent blood means killing someone guiltless
🏛️ This happens through a corrupt legal process
📖 The system meant to protect instead betrays

## 🛡️ The LORD Is My Defence

"Defence" pictures a wall or shield that protects someone from attack.

Human courts have just been shown to be corrupt and dangerous.

Against that backdrop, the psalmist turns somewhere else entirely.

God is named as a defense no corrupt law can touch.

The contrast between the verse before and this verse is deliberate.

🛡️ Defence pictures a wall that protects
⚖️ Human courts were just shown corrupt
🔀 The psalmist turns somewhere else entirely
📖 No corrupt law can touch this defense

## 🪨 My God Is The Rock Of My Refuge

"Rock" pictures something solid, immovable, and safe to stand on.

"Refuge" describes a place someone runs to for safety.

Put together, the image is a fortress built into solid stone.

Corrupt courts can be bribed or pressured.

A rock of refuge cannot be moved by anyone.

🪨 Rock pictures something solid and immovable
🏰 Refuge describes a place to run for safety
💰 Corrupt courts can be bribed or pressured
📖 A rock of refuge cannot be moved

## 🔄 He Shall Bring Upon Them Their Own Iniquity

This is not random punishment.

It is their own wrongdoing, returned to them directly.

The harm they planned for others becomes the harm that lands on them.

This pattern appears often across the Psalms.

Justice here means the crime finally reaching its own source.

🔄 Their own wrongdoing returns to them
🎯 Planned harm lands back on its source
📚 This pattern repeats often in the Psalms
📖 Justice means the crime reaching its source

## ✂️ The LORD Our God Shall Cut Them Off

"Cut them off" means ending something completely, with no continuation.

This is the same vengeance asked for all the way back in verse one.

The psalm opened with a cry for God to act.

It closes with the confidence that he will.

What began as a desperate question ends as a settled certainty.

✂️ Cut them off means ending something completely
🔁 This answers the cry from verse one
✅ The psalm moves from question to certainty
📖 What was desperate becomes settled confidence
`.trim();

export const PSALMS_NINETY_FOUR_PERSONAL_SECTIONS = parsePsalmsNinetyFourRawNotes(PSALMS_NINETY_FOUR_RAW_NOTES);
