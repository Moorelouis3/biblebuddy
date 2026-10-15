export type ColossiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseColossiansThreeRawNotes(rawText: string): ColossiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ColossiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Colossians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Colossians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Colossians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Colossians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Colossians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Colossians 3:${startVerse}` : `Colossians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Colossians 3 sections, received " + sections.length);
  }

  return sections;
}

const COLOSSIANS_THREE_RAW_NOTES = `# Colossians 3:1-4
# ⬆️ Seeking What Is Above
---
## ⚰️ If Ye Then Be Risen With Christ

"Risen" here does not mean a vague feeling of improvement.

Paul means something that already happened to them in baptism.

Colossians two already described going under the water and coming back up.

That image pictured dying with Christ and rising with him.

Paul is not asking them to achieve this now.

He is asking them to live out what already took place.

⚰️ Risen means something that already happened

💧 Baptism already pictured this death

🔄 Paul assumes an identity already given

➡️ Live out what already took place

## 🧭 Seek Those Things Which Are Above

"Seek" means an active pursuit, not a passing thought.

Paul chose a verb used for a journey toward a goal.

Heaven is described as the direction a believer's whole life now points.

This does not mean ignoring work or family here on earth.

It means refusing to let earthly life become the final goal.

🧭 Seek means active ongoing pursuit

🎯 Heaven is the believer's new direction

🏡 Earthly life is not ignored

📖 Earth is not the final goal

## 👑 Where Christ Sitteth On The Right Hand Of God

The right hand was the highest seat of honor in any royal court.

Sitting there pictures Christ ruling with complete authority, not resting idle.

This image already appeared in Psalm one hundred ten, long before Colossians was written.

No false teacher in Colossae could claim that kind of authority.

👑 Right hand means the seat of honor

⚡ Christ rules with full authority

📜 Psalm one hundred ten pictures this already

📖 No rival claims this authority

## 🧠 Set Your Affection On Things Above

"Affection" means the constant direction of someone's thinking.

Paul is not condemning normal life, work, or family.

He is warning against letting earthly concerns become the main focus.

Colossae's false teachers offered extra rules about food, festivals, and strict rituals.

None of that was ever the real goal Paul wanted this church chasing.

🧠 Affection means constant direction of thought

🏠 Normal life is not condemned here

⚠️ Earthly concerns should not become the focus

📖 Rules and rituals were never the real goal

## ⚰️ Ye Are Dead, And Your Life Is Hid With Christ In God

Being "dead" here is already finished, not a future goal.

"Hid" pictures something precious locked away safely, far from danger.

A thief cannot steal a treasure buried where no one can reach it.

The old self claimed by sin no longer has the final word.

⚰️ Dead to sin is already finished

🔒 Hid means safely locked away

💎 Like treasure no thief can reach

📖 Sin no longer has the final word

## 🌅 Then Shall Ye Also Appear With Him In Glory

"Appear" points forward to Christ returning in plain sight of everyone.

Right now, this new identity is hidden, visible only through faith.

On that day it will be shown openly for the first time.

Glory here means being fully and finally made like Christ himself.

🌅 Appear means Christ returning visibly

🙈 This identity is hidden for now

💡 It will be shown openly then

📖 Glory means becoming fully like Christ

# Colossians 3:5-8
# ⚔️ Putting Sin To Death
---
## ⚔️ Mortify Therefore Your Members Which Are Upon The Earth

"Mortify" means to kill something completely, not simply control it.

Paul pictures sin as something still alive inside a believer that must die.

"Members" here means the parts of the body that sin uses to act.

This is active and ongoing work, not a single decision made once.

⚔️ Mortify means to kill completely

🫀 Sin still lives inside believers

🦵 Members means the body's acting parts

➡️ Killing sin is ongoing work

## 💔 Fornication, Uncleanness, Inordinate Affection

"Fornication" means sexual sin outside of marriage.

"Uncleanness" covers any kind of sexual impurity, not just the act itself.

"Inordinate affection" means a desire that has grown far beyond its proper limits.

Paul names each one specifically instead of using one vague word for sin.

💔 Fornication means sex outside marriage

🚫 Uncleanness means broader sexual impurity

🔥 Inordinate affection means desire out of control

📖 Paul names sins specifically, not vaguely

## 🔥 Evil Concupiscence, And Covetousness, Which Is Idolatry

"Concupiscence" means a strong desire that controls a person completely.

"Covetousness" means always wanting more than what someone already has.

Paul calls that wanting "idolatry" because it replaces God as the heart's true treasure.

Whatever a person constantly chases becomes the thing they actually worship.

🔥 Concupiscence means an overpowering desire

🙏 Covetousness means always wanting more

🗿 Covetousness is called idolatry here

📖 What people chase reveals what they worship

## 👶 The Wrath Of God Cometh On The Children Of Disobedience

"Children of disobedience" describes people whose whole life pattern is disobeying God.

It is not calling out one single bad choice.

"Wrath" here means God's settled, right response to sin, not a sudden outburst of temper.

Paul names this consequence before listing the sins, so the warning lands first.

👶 Children of disobedience means a life pattern

⚖️ Wrath means God's settled right response

🚫 Not a sudden angry outburst

📖 The warning comes before the sin list

## 🚶 Ye Also Walked Some Time, When Ye Lived In Them

"Walked" is a common Bible word picture for someone's ongoing way of life.

Paul is reminding this church that these sins used to describe their own normal life.

"Some time" means for a period in the past, not forever.

Their old life is named honestly here, before moving to what changed.

🚶 Walked means an ongoing way of life

🪞 This used to be their own normal

⏳ Some time means a past period

📖 Honesty about the past prepares for change

## 👕 But Now Ye Also Put Off All These

"Put off" pictures removing a piece of clothing and leaving it behind.

Paul uses the same picture people used for taking off old, dirty work clothes.

"But now" marks a clean break from the life just described.

This picture sets up the matching "put on" language coming in verse ten.

👕 Put off means removing old clothing

🧹 Like taking off dirty work clothes

🔄 But now marks a clean break

➡️ This sets up put on later

## 😠 Anger, Wrath, Malice, Blasphemy, Filthy Communication

"Anger" and "wrath" describe sudden rage and a longer simmering resentment.

"Malice" means a deliberate wish to see someone else harmed.

"Blasphemy" here means abusive speech against people, not only against God.

"Filthy communication" means talk no one would want repeated in front of their own family.

😠 Anger and wrath name two kinds of rage

💔 Malice means wishing someone harm

🗣️ Blasphemy here means abusive speech

📖 Filthy talk has no place among believers

# Colossians 3:9-11
# 🔄 Old Man, New Man
---
## 🤥 Lie Not One To Another

Lying is named here as a leftover habit from the old self.

Paul just said that old self was already put off like old clothing.

Continuing to lie means still wearing a piece of clothing meant to be gone.

Truth telling marks the new identity that replaces it.

🤥 Lying belongs to the old self

👕 That old self was already removed

⚠️ Lying means still wearing it

📖 Truth marks the new identity

## 🧍 Ye Have Put Off The Old Man With His Deeds

"The old man" means the person someone used to be before Christ.

"His deeds" means the habits and choices that belonged to that old identity.

Paul describes this as already finished, like clothing already removed.

The old identity does not get managed, it gets completely set aside.

🧍 Old man means the former self

📋 His deeds means old habits and choices

✅ This removal is already finished

📖 The old self is set aside, not managed

## 🆕 Put On The New Man, Which Is Renewed In Knowledge

"Renewed" means made new again, not just patched or improved.

"Knowledge" here means a true understanding of God, not simply facts.

This new identity grows to look more and more like the one who made it.

Paul is describing an ongoing process, not a finished product on day one.

🆕 Renewed means made new, not patched

🧠 Knowledge means true understanding of God

🌱 This new self keeps growing

📖 Growth is ongoing, not finished at once

## 🧑 After The Image Of Him That Created Him

"Him that created him" points back to God making humanity in Genesis one.

Humanity was originally made to reflect God's own image.

Sin damaged that image badly, though it never fully erased it.

Being "renewed" means that original likeness is being restored and sharpened again.

🧑 Him that created him means God

🪞 Humanity was made to reflect God

💔 Sin damaged that original image

📖 Renewal restores what sin damaged

## 🌍 Where There Is Neither Greek Nor Jew

Greek and Jew marks the biggest ethnic divide in the world Paul lived in.

Jewish people saw themselves as set apart by God's law.

Greeks represented the wider, non Jewish world around them.

In Christ, Paul says, that whole dividing line no longer decides anyone's standing.

🌍 Greek and Jew names a major divide

📜 Jews were set apart by the law

🏛️ Greeks represented the wider world

📖 That divide no longer decides standing

## ✂️ Circumcision Nor Uncircumcision, Barbarian, Scythian, Bond Nor Free

"Circumcision" and "uncircumcision" point back to the same Jewish and Gentile divide.

"Barbarian" meant anyone who did not speak Greek, considered rough and uncivilized.

"Scythian" named a specific group seen as the most savage barbarians of all.

"Bond nor free" means slave and free citizen, the deepest social divide of that world.

✂️ Circumcision repeats the Jew Gentile divide

🗣️ Barbarian meant anyone outside Greek culture

⚔️ Scythian named the most looked down group

📖 Bond and free covers the deepest social divide

## 🧱 But Christ Is All, And In All

Every divide just listed, ethnic, religious, cultural, and social, gets erased here.

"Christ is all" means he matters more than any of those old categories.

"And in all" means he lives inside every believer equally, no matter their background.

No label from the old world decides anyone's worth inside this new family.

🧱 Every old divide gets erased here

👑 Christ is all means he outranks every label

🕊️ Christ in all means equal access for everyone

📖 No old label decides worth anymore

# Colossians 3:12-14
# ❤️ Putting On Love
---
## ✅ As The Elect Of God, Holy And Beloved

"Elect" means chosen, a term first used for Israel as God's chosen people.

Paul now applies that same identity to this mostly Gentile church.

"Holy" means set apart for God's own use and purpose.

"Beloved" means deeply and personally loved, not loved as part of a crowd.

✅ Elect means chosen by God

🌍 This identity now includes Gentiles too

🕊️ Holy means set apart for God

📖 Beloved means loved personally, not generally

## 🫀 Bowels Of Mercies, Kindness

"Bowels" named the seat of deep emotion in this culture.

A modern reader would say heart instead.

"Mercies" means genuine compassion felt for someone else's pain.

"Kindness" means that compassion acted out in real, practical help.

🫀 Bowels meant the seat of emotion

💞 Mercies means compassion for others' pain

🤲 Kindness means compassion put into action

📖 Feeling and action are named together

## 🙇 Humbleness Of Mind, Meekness, Longsuffering

"Humbleness of mind" was seen as weakness, not virtue, in Roman culture.

Paul flips that assumption and makes it a mark of Christian character.

"Meekness" means controlled strength, not a lack of strength.

"Longsuffering" means staying patient with difficult people over a long stretch of time.

🙇 Humbleness of mind was called weakness

🔁 Paul reverses that cultural assumption

💪 Meekness means controlled strength, not weakness

📖 Longsuffering means patience over a long time

## 🧘 Forbearing One Another, And Forgiving One Another

"Forbearing" means putting up with someone's ongoing flaws without constant complaint.

"Forgiving" goes one step further and actually cancels the debt of a specific wrong.

Paul expects both, since real community always includes both kinds of friction.

Neither word pretends the hurt was not real.

🧘 Forbearing means tolerating ongoing flaws

✅ Forgiving means canceling a specific wrong

👪 Community life needs both of these

📖 Neither word pretends the hurt was not real

## 📏 Even As Christ Forgave You, So Also Do Ye

Christ's forgiveness becomes the measuring line for every believer's own forgiveness.

He forgave people who had done nothing to deserve it.

That same posture is now expected toward other people in the church.

This standard is high on purpose, not a casual suggestion.

📏 Christ's forgiveness is the measuring line

🎁 He forgave the undeserving first

👥 The same posture is expected now

📖 This standard is deliberately high

## ❤️ Above All These Things Put On Charity, Which Is The Bond Of Perfectness

"Charity" here means selfless, active love, not money given to the poor.

"Bond" means the thing that physically ties separate pieces together.

Without love, every other virtue on this list can still fall apart.

Love is what holds the whole list together into one complete character.

❤️ Charity means selfless active love

🔗 Bond means what ties pieces together

⚠️ Without love the list falls apart

📖 Love holds every virtue together

# Colossians 3:15-17
# 🕊️ Peace, The Word, And Thanks
---
## 🏟️ Let The Peace Of God Rule In Your Hearts

"Rule" was a word used for an umpire making the final call in a game.

Paul pictures God's peace settling every internal argument a believer has.

That peace gets the final word over fear, anger, or anxious thoughts.

This is an active decision, not a passive feeling that just shows up.

🏟️ Rule pictures an umpire's final call

⚖️ God's peace settles inner conflict

🧠 Peace outranks fear and anxiety

📖 Peace is a decision, not a feeling

## 👥 Called In One Body

"One body" refers to the church, people from different backgrounds joined as one.

Chapter three already erased the old divides between them.

Peace is only possible because that unity is already real, not just a nice idea.

Being thankful follows naturally once that unity is actually understood.

👥 One body means the whole church

🧩 Old divides were already erased

🤝 Unity makes real peace possible

📖 Thankfulness follows from real unity

## 🏠 Let The Word Of Christ Dwell In You Richly

"Dwell" means to live somewhere permanently, not just visit sometimes.

Paul wants Christ's teaching settled deep inside, not kept on a shelf.

"Richly" means it should shape someone's whole life, not just a few habits.

"In all wisdom" means this teaching should guide real decisions, not stay abstract.

🏠 Dwell means living somewhere permanently

📚 Christ's word should sink in deeply

💰 Richly means shaping the whole life

📖 Wisdom means guiding real decisions

## 📜 Teaching And Admonishing One Another In Psalms And Hymns And Spiritual Songs

"Psalms" likely meant songs drawn from the Old Testament book of Psalms.

"Hymns" meant songs of praise written for the church itself.

"Spiritual songs" may describe songs composed in the moment, inspired by the Spirit.

Paul expects ordinary believers, not only trained leaders, to teach each other this way.

📜 Psalms likely drew from the Old Testament

🎶 Hymns meant written songs of praise

✨ Spiritual songs may be spontaneous

📖 Ordinary believers teach each other through song

## 🗣️ Whatsoever Ye Do In Word Or Deed

"Word or deed" covers everything someone says and everything someone does.

Paul leaves no corner of daily life outside this instruction.

Work, conversation, and ordinary decisions all fall inside this one command.

Faith was never meant to stay confined to a single day or room.

🗣️ Word or deed covers all of life

🏠 Nothing is left outside this command

💼 Work and conversation both count

📖 Faith is not confined to one room

## 🖋️ Do All In The Name Of The Lord Jesus

"In the name of" means acting with someone's authority, not just saying their name.

A representative who acts in someone's name carries their reputation along with them.

Every action becomes a small representation of who Jesus actually is.

Giving thanks "by him" means that gratitude also flows through Christ to God.

🖋️ In the name of means acting with authority

🎭 Representatives carry another person's reputation

👤 Every action represents Jesus himself

📖 Thanks flows through Christ to God

# Colossians 3:18-21
# 👪 Instructions For The Household
---
## 🏠 Wives, Submit Yourselves Unto Your Own Husbands

This command is not aimed at every woman toward every man in general.

It is specifically about a wife's relationship with her own husband.

Ancient household codes like this one were common across the Roman world.

Paul reshapes a familiar structure instead of inventing a brand new one.

🏠 This applies to one's own husband only

🌍 Household codes were common in Rome

🔄 Paul reshapes an existing structure

📖 This is not a general command

## 🙏 As It Is Fit In The Lord

"Fit in the Lord" means appropriate within a Christ centered marriage.

This small phrase changes the entire meaning of the command.

Any version of submission that does not fit under Christ is not what Paul means.

The standard is not culture or convenience.

It is Christ himself.

🙏 Fit in the Lord means Christ centered

🔄 This phrase reshapes the whole command

🚫 Submission must fit under Christ

📖 Christ is the real standard here

## 📜 Husbands, Love Your Wives, And Be Not Bitter Against Them

Most Roman household codes gave husbands authority without any matching responsibility.

Paul breaks that pattern by commanding husbands to love, not just lead.

"Bitter" means a harsh, resentful attitude that builds up over time.

This command balances the one just given to wives with a real responsibility.

📜 Roman codes rarely instructed husbands

❤️ Paul commands love, not just authority

😡 Bitter means built up resentment

📖 Both sides carry real responsibility

## ✅ Children, Obey Your Parents In All Things

"Obey" is a stronger word than "honor," which appears elsewhere for adult children.

This verse addresses children still living under their parents' direct care.

"In all things" means full obedience, within the limits of what is right.

Paul assumes parents are generally leading their children toward good, not harm.

✅ Obey is stronger than honor

🏠 This addresses children under parental care

📏 In all things means full obedience

📖 Parents are assumed to lead toward good

## 🔥 Fathers, Provoke Not Your Children To Anger

"Provoke" means deliberately stirring someone up until they react in anger.

Roman fathers legally held almost unlimited power over their own children.

Paul limits that power by warning against using it carelessly or harshly.

Authority without restraint can do real damage to a child.

🔥 Provoke means deliberately stirring up anger

⚖️ Roman fathers held near unlimited power

🛑 Paul limits that power here

📖 Unrestrained authority can harm a child

## 😔 Lest They Be Discouraged

"Discouraged" pictures a spirit that has simply given up trying.

Harsh, unpredictable authority teaches a child that effort does not matter.

Paul is naming a real emotional cost, not just a behavior problem.

A home can win obedience and still lose a child's heart.

😔 Discouraged means giving up on trying

⚡ Harsh authority teaches effort is pointless

💔 This names a real emotional cost

📖 A home can win obedience, lose the heart

# Colossians 3:22-25
# ⛓️ Servants And Masters
---
## ⛓️ Servants, Obey In All Things Your Masters According To The Flesh

"Servants" here means slaves, a normal part of the Roman economy.

"According to the flesh" marks this as an earthly, limited authority only.

Paul does not endorse slavery as right.

He is simply addressing people already living inside it.

⛓️ Servants here means slaves

🌍 Slavery was common in the Roman world

🚫 Paul does not endorse the system

📖 Earthly masters lack final authority

## 👀 Not With Eyeservice, As Menpleasers

"Eyeservice" means working hard only while someone happens to be watching.

"Menpleasers" means living only to impress the people in charge.

Paul calls for a deeper kind of honesty than fear of punishment produces.

This applies just as easily to any job today, not only ancient slavery.

👀 Eyeservice means working only when watched

🙂 Menpleasers means living to impress people

🧭 Paul calls for deeper honesty

📖 This still applies to work today

## 🎯 In Singleness Of Heart, Fearing God

"Singleness of heart" means one consistent motive, not a performance that changes.

"Fearing God" means living with real awareness that God sees everything, always.

That awareness becomes the real motivation, bigger than any human boss watching.

Work done this way stays the same whether anyone human is present or not.

🎯 Singleness of heart means one true motive

👁️ Fearing God means God always sees

💪 This outweighs any human supervisor

📖 True work stays the same unwatched

## 💪 Whatsoever Ye Do, Do It Heartily, As To The Lord

"Heartily" means putting real effort and care into the work itself.

"As to the Lord" means treating ordinary work like a direct offering to God.

This completely reframes what counts as meaningful work.

Even work with no human recognition attached still matters to God.

💪 Heartily means real effort and care

🙏 As to the Lord means work as offering

🔄 This reframes meaningful work entirely

📖 Unseen work still matters to God

## 🎁 Ye Shall Receive The Reward Of The Inheritance

Roman slaves legally could not inherit property under normal law.

Paul promises these same servants a real inheritance from God himself.

"Reward" here is not a wage earned.

It is a gift given freely.

For someone with no legal claim to anything, this promise meant everything.

⛓️ Slaves could not legally inherit property

🎁 Paul promises a real inheritance from God

💰 Reward here is a gift, not a wage

📖 This promise meant everything to a slave

## ⚖️ There Is No Respect Of Persons

"Respect of persons" means favoring someone because of their rank or status.

Masters and slaves stood on completely different levels in Roman society.

God's judgment ignores that entire social ladder.

Everyone answers to the same standard, regardless of position on earth.

⚖️ Respect of persons means favoring by rank

🏛️ Masters and slaves held different ranks

🚫 God ignores that social ladder

📖 Everyone answers to the same standard
`.trim();

export const COLOSSIANS_THREE_PERSONAL_SECTIONS = parseColossiansThreeRawNotes(COLOSSIANS_THREE_RAW_NOTES);
