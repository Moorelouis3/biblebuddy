export type FirstCorinthiansSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansSixRawNotes(rawText: string): FirstCorinthiansSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 6:${startVerse}` : `1 Corinthians 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 First Corinthians 6 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_SIX_RAW_NOTES = `# FirstCorinthians 6:1-6
# ⚖️ Taking Believers To Court
---
## Go To Law Before The Unjust

Unjust here does not mean every Roman judge was personally corrupt.

It means a court system built outside God's own people.

Corinth was a busy Roman colony with courts for every civil dispute.

Taking a believer there put the church's private business before total strangers.

Paul is stunned that believers would reach for a courthouse before reaching for each other.

⚖️ Unjust means outside God's community

🏛️ Corinth's courts were a civil option

👀 Public lawsuits aired church business

📖 Family disputes deserve a family answer

## The Saints Shall Judge The World

Believers are told here they will one day join God in judging the world itself.

That is a bigger responsibility than any believer usually imagines for themselves.

Today's small lawsuits look tiny once that future role is in view.

A church headed toward judging the world should be able to settle its own disputes now.

👑 Believers will judge the world

🌍 A bigger task than most imagine

🤏 Small disputes look tiny by comparison

➡️ A future role answers today's problem

## We Shall Judge Angels

Paul raises the stakes even higher than verse two.

He says believers will one day judge angels, not just people.

Many scholars believe this points toward fallen angels, the spiritual powers already judged through Christ's victory.

If believers will weigh in on something that large, ordinary daily disagreements should be easy to settle.

👼 Judging angels tops judging the world

⚔️ Likely points to fallen angels

🏆 Christ's victory already judged them

📖 Daily disagreements are small by comparison

## Who Are Least Esteemed In The Church

Paul does not mean to insult anyone here.

He means that even the church member with the least standing could be trusted to judge a real dispute.

That is a higher compliment to the church than it first sounds.

It assumes every believer already carries real spiritual wisdom worth using.

🙋 Least esteemed means lowest standing member

🤝 Even they could judge well

💎 A hidden compliment to the church

📖 Every believer carries real wisdom

## Brother Goeth To Law With Brother

"I speak to your shame" is Paul's blunt way of saying this situation is embarrassing.

He cannot believe not one wise person exists in the whole church to settle a dispute privately.

Instead, one believer drags another believer into a courtroom full of unbelievers.

The word brother makes this especially painful to watch.

Family should never need outsiders to settle what family itself should resolve.

😳 Paul calls this truly shameful

🙅 Not one wise mediator steps up

👥 Unbelievers now judge church matters

📖 Family should not sue family publicly

# FirstCorinthians 6:7-8
# 💔 Better To Suffer Wrong
---
## Why Do Ye Not Rather Take Wrong

Winning a lawsuit against a brother is already a loss in a deeper sense.

Paul asks why believers will not simply absorb the wrong instead of fighting for it in court.

This does not erase real justice.

It just reorders what matters most, the relationship over the verdict.

⚖️ Lawsuits already count as failure

🤕 Absorbing wrong can be the stronger choice

❤️ Relationship matters more than winning

📖 Justice is not the only goal here

## Ye Do Wrong, And Defraud

"Defraud" means deliberately taking what belongs to someone else through deception.

Some believers in Corinth were not just suing each other.

They were actually cheating each other outright.

Worse, the victims were fellow believers who should have been protected, not exploited.

😠 Defraud means deliberate deception

💰 Some members are cheating others

🙏 Victims are their own brethren

📖 Family trust was broken, not just rules

# FirstCorinthians 6:9-11
# 🚫 Who Will Not Inherit The Kingdom
---
## Be Not Deceived

Paul interrupts himself with a warning before the list even starts.

"Be not deceived" means do not let anyone talk you out of this truth.

Some in Corinth were apparently excusing sin by claiming grace covered any lifestyle.

Grace was never meant to excuse a lifestyle that never changes.

🚨 Deceived means talked out of truth

🗣️ Some were excusing ongoing sin

🛑 Paul shuts that idea down fast

📖 Grace was never a cover for sin

## Fornicators, Nor Idolaters, Nor Adulterers

This list names specific patterns of life, not single mistakes.

"Fornicators" means those living in ongoing sexual sin outside marriage.

"Idolaters" means those worshiping anything other than the true God.

"Adulterers" means those breaking a marriage covenant through sexual sin with someone else.

Each pattern describes a direction a life can go, not one accidental slip.

💍 Fornicators means ongoing sexual sin

🗿 Idolaters means worshiping false gods

💔 Adulterers means breaking a marriage vow

📖 Each is a direction, not one slip

## Abusers Of Themselves With Mankind

This phrase names a specific practice from the ancient world.

Many scholars believe it describes an exploitative same sex practice common in that world.

Paul lists it as one sin among several the gospel can change.

No sin named here is too specific for grace to reach.

🔍 Names a specific ancient practice

⚖️ Often exploitative in that culture

🌍 Common in Corinth's wider world

📖 No sin is too specific for grace

## Thieves, Nor Covetous, Nor Drunkards

"Covetous" means a constant hunger for more than you already have.

"Revilers" means those who habitually insult and tear others down with words.

"Extortioners" means those who use pressure or threats to take money unfairly.

Ordinary sins like these matter just as much as the more shocking ones already named.

🤑 Covetous means always wanting more

🗯️ Revilers means habitual verbal attacks

💸 Extortioners means pressuring people for money

➡️ Ordinary sins matter just as much

## But Ye Are Washed

Paul suddenly shifts from accusation to identity.

"Such were some of you" means this list used to describe people now sitting in this very church.

"Washed" pictures sin being cleaned away completely, not managed or hidden.

"Sanctified" means set apart as holy for God's own purposes.

"Justified" means declared fully right with God through Jesus and the Spirit.

That past tense changes everything about how this whole chapter should be read.

🚿 Washed means sin cleaned away

✝️ Sanctified means set apart as holy

⚖️ Justified means declared right with God

📖 Their past no longer defines them

# FirstCorinthians 6:12-14
# 🍽️ All Things Lawful But Not All Expedient
---
## All Things Are Lawful Unto Me

Paul quotes a slogan some in Corinth were using to excuse anything.

"Lawful" here means technically permitted, not against any specific command.

Paul does not reject the slogan outright.

He simply limits how far it goes.

Something can be technically allowed and still be unwise or even enslaving.

📜 Lawful means technically permitted

🗣️ A slogan some were misusing

⚠️ Permitted is not the same as wise

📖 Freedom can still become a trap

## I Will Not Be Brought Under The Power Of Any

"Expedient" means genuinely helpful, not just technically allowed.

Paul adds that second limit after the lawful slogan from the verse before.

He refuses to let anything, even something lawful, end up controlling him.

A habit that quietly controls someone has already become their master.

That is true no matter how legal it technically is.

✅ Expedient means truly helpful

⛓️ Paul refuses to be controlled

🎛️ Lawful things can still become masters

📖 Real freedom never creates a new slavery

## Meats For The Belly, And The Belly For Meats

Paul quotes another slogan, probably used to excuse sexual sin by comparing it to eating.

The logic claimed the body's urges exist simply to be satisfied, the way food exists for hunger.

Paul agrees that both food and stomach are temporary, since God will one day end that whole system.

He uses that comparison only to reject it for the body as a whole.

🍽️ Meats and belly were a slogan

⏳ Food and stomach are both temporary

🚫 Paul rejects that same logic for sex

📖 Temporary urges do not define the body

## The Body Is Not For Fornication, But For The Lord

Paul states the real purpose of the body plainly.

It was never designed to chase every sexual urge it feels.

It belongs to the Lord, the same way the Lord is devoted to it.

That mutual belonging reframes the whole question of sexual sin.

🙏 The body belongs to the Lord

🚫 Not designed for chasing every urge

🔁 The Lord is devoted to the body too

📖 Belonging reframes the whole question

## Raised Up The Lord, And Will Also Raise Up Us

Paul grounds this entire argument in the resurrection.

Christ's own body was raised, not discarded, proving the body matters to God permanently.

Believers' bodies will be raised the same way, by that same power.

A body with that kind of future deserves more respect than a quick impulse.

✝️ Christ's body was raised, not discarded

🔮 Believers will be raised too

💪 Same power raises both

📖 A future like that deserves respect now

# FirstCorinthians 6:15-17
# 🔗 Joined To The Lord
---
## Your Bodies Are The Members Of Christ

"Members" here means body parts, like a hand or an arm.

Paul pictures every believer's body as one part of Christ's own larger body.

Taking that same body part into sexual sin with a prostitute pulls Christ into the act by association.

"God forbid" is Paul's strongest possible way of rejecting that idea.

🖐️ Members means body parts

✝️ Believers are part of Christ's body

😨 Sexual sin pulls Christ into it

📖 Paul rejects the idea completely

## Joined To An Harlot Is One Body

Paul quotes Genesis two on marriage, two becoming one flesh.

He applies that same one flesh principle to any sexual union, not only marriage.

Sex was designed by God to create a real and lasting union.

That is exactly why casual sex still leaves real damage behind.

A physical act like this is never just physical, by God's own design.

📜 Quotes Genesis on becoming one flesh

🔗 Sex always creates real union

💔 That is why casual sex still wounds

📖 God designed it to never be casual

## Joined Unto The Lord Is One Spirit

Paul sets up a direct contrast with the verse before it.

Physical union with a harlot creates one body.

Spiritual union with the Lord creates one spirit.

That deeper union is the real identity every believer actually carries.

🤝 Union with the Lord is spiritual

⚖️ Contrasts directly with verse sixteen

🕊️ One spirit outranks one body

📖 This union is a believer's true identity

# FirstCorinthians 6:18-20
# 🏛️ Flee Fornication, Glorify God
---
## Flee Fornication

"Flee" is a command to run away immediately, not to stand and reason with temptation.

Paul does not suggest debating the issue or slowly resisting it.

Other sins happen through the body.

This sin happens directly against the body itself.

The warning is urgent on purpose.

Some temptations are only won by leaving the room entirely.

🏃 Flee means run away now

🚫 Not a call to reason with it

🎯 This sin targets the body directly

➡️ Urgency is the whole point here

## Sinneth Against His Own Body

Paul singles out sexual sin as uniquely self targeting.

Most sins use the body to harm something outside it, the way a lie uses words to hurt someone.

Sexual sin turns the body's own design against itself.

The body was built for union and belonging, not casual use.

That is why Paul treats it with this level of seriousness.

🎯 This sin targets the self

🗣️ Other sins harm things outside the body

🔄 This one turns design against itself

📖 Seriousness here is not an overreaction

## Your Body Is The Temple Of The Holy Ghost

A "temple" was the one place God's presence was understood to dwell.

Paul says that exact presence now lives inside an ordinary believer's body.

That is a staggering upgrade from a building in Jerusalem to a human being anywhere.

It means a believer's body is never just their own private property.

🏛️ Temple means where God dwells

🕊️ The Holy Ghost lives in believers

🔁 A huge upgrade from a building

📖 The body carries God's own presence

## Ye Are Bought With A Price

"Bought with a price" points back to Christ's death as the payment.

Believers once belonged to sin, the way property belongs to whoever bought it.

Ownership has changed hands completely, and that new ownership is the reason given for pursuing purity.

The call to "glorify God in your body" is not random.

It follows directly from this one truth about ownership.

Purity becomes a way of honoring who truly owns you now.

💰 Bought with a price means Christ's death

🔁 Ownership changed from sin to God

🙏 Purity flows from being owned by Him

📖 Glorify God because you belong to Him
`.trim();

export const FIRST_CORINTHIANS_SIX_PERSONAL_SECTIONS = parseFirstCorinthiansSixRawNotes(FIRST_CORINTHIANS_SIX_RAW_NOTES);
