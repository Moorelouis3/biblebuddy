export type RomansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansFiveRawNotes(rawText: string): RomansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 5:${startVerse}` : `Romans 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 5 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_FIVE_RAW_NOTES = `# Romans 5:1-5
# 🕊️ Peace With God Through Faith
---
## Being Justified By Faith, We Have Peace With God

Paul now states the result of everything he just proved.

Justified means declared right in God's sight, not guilty anymore.

Peace with God replaces the hostility sin created between God and people.

This peace comes only through Jesus Christ, not through any work.

The verdict changes, and so does the relationship.

⚖️ Justified means declared right with God
🕊️ Peace replaces the old hostility
✝️ Peace comes only through Christ
📖 The verdict changes the relationship

## We Have Access By Faith Into This Grace

Access means the right to approach someone, not just information about them.

Before this, sinful people had no legal way to approach a holy God.

Faith opened a door that was closed before.

Grace describes the space believers now get to stand in.

This is not a visit.

It is a permanent standing place.

🚪 Access means the right to approach
🙅 Sinners had no door to God
🔑 Faith opened the door
📖 Grace is a permanent standing place

## Rejoice In Hope Of The Glory Of God

Hope here is not wishful thinking.

It is confident expectation of something God already promised.

The glory of God means sharing in His own radiant presence someday.

Believers can celebrate that future now, before it even arrives.

Joy does not wait for the promise to be kept.

🙏 Hope means confident expectation, not wishing
✨ Glory means sharing God's radiant presence
🎉 Believers can celebrate this now
📖 Joy does not wait for fulfillment

## We Glory In Tribulations Also, Knowing That Tribulation Worketh Patience

This does not mean Paul enjoyed suffering for its own sake.

Tribulations means hardships, trials, and pressure from outside circumstances.

Worketh patience means those hardships actually produce endurance over time.

Paul is naming a process, not praising pain itself.

The suffering is not the point.

What it produces is the point.

😣 Tribulations means hardships and pressure
⏳ Worketh patience means it produces endurance
🔄 Paul names a process, not praise
📖 What suffering produces is the point

## Patience, Experience, And Experience, Hope

Paul traces a chain, one step leading to the next.

Patience means the endurance already named in the verse before.

Experience here means proven character, the kind only testing can produce.

That proven character is what feeds a confident hope.

Each link in this chain depends on the one before it.

🔗 Paul traces a chain of growth
⏳ Patience means endurance under pressure
🏅 Experience means proven character
📖 Proven character feeds confident hope

## Hope Maketh Not Ashamed

Ashamed here means being let down, left looking foolish for trusting.

Hope built on God's own promise will never end that way.

A hope resting on wishful thinking can disappoint someone badly.

A hope resting on God's word carries no such risk.

This hope has a guarantee standing behind it.

😳 Ashamed means being let down badly
🙏 This hope rests on God's promise
⚠️ Wishful thinking can disappoint someone
📖 God's word guarantees this hope

## The Love Of God Is Shed Abroad In Our Hearts By The Holy Ghost

Shed abroad means poured out generously, like water flooding a field.

This is not people working up love for God on their own.

The Holy Ghost personally places that love inside the believer's heart.

This love is the proof behind the hope just described.

The guarantee is not a feeling.

It is God's own Spirit living inside.

🌊 Shed abroad means poured out generously
🙅 Not love people worked up themselves
🕊️ The Holy Ghost places this love
📖 God's own Spirit is the guarantee

# Romans 5:6-11
# 💔 While We Were Yet Sinners
---
## When We Were Yet Without Strength, In Due Time Christ Died For The Ungodly

Without strength means completely unable to save themselves, not just weak.

Ungodly means openly opposed to God, not simply imperfect.

Christ did not wait for people to improve before He died for them.

In due time means at the exact moment God had planned.

He died for people who were still God's enemies.

🚫 Without strength means unable to save oneself
😈 Ungodly means openly opposed to God
⏰ Christ died at God's planned moment
📖 He died for people still against Him

## Scarcely For A Righteous Man Will One Die, Yet Peradventure For A Good Man Some Would Even Dare To Die

Peradventure means perhaps, something rare and uncertain.

Even dying for a truly good person would be unusual courage.

Paul sets up the normal human limit.

Then he shows how far God went past it.

Most people will not risk their life for someone they merely respect.

❓ Peradventure means perhaps, something uncertain
🦸 Dying for a good person is rare
📏 Paul sets the normal human limit
📖 This sets up a shocking contrast

## While We Were Yet Sinners, Christ Died For Us

God's love is proven by its timing, not just its existence.

Most love waits for someone to become lovable first.

God's love reached people while they were still sinning against Him.

Commendeth means proves or puts on display for everyone to see.

The cross is not a reward.

It is a rescue sent while nothing deserved it.

⏰ Love proven by timing, not merit
🙅 Most love waits to be deserved
💔 God's love reached active sinners
📖 The cross is a rescue, not a reward

## Being Now Justified By His Blood, We Shall Be Saved From Wrath

Wrath here means God's settled judgment against sin, not a flash of anger.

Justified by His blood means the penalty was already paid in full.

Much more then is an argument from the lesser to the greater.

If Christ died for enemies, saving already justified friends is certain.

The hardest part is already finished.

⚖️ Wrath means God's settled judgment
🩸 Justified by blood means paid in full
📈 Lesser to greater makes this certain
📖 The hardest part is already finished

## When We Were Enemies, We Were Reconciled To God By The Death Of His Son

Enemies here is not a mild word.

It means active opposition to God.

Reconciled means a broken relationship was fully restored.

That restoration cost the death of God's own Son.

Peace with an enemy always costs someone something.

⚔️ Enemies means active opposition to God
🤝 Reconciled means a broken relationship restored
✝️ Restoration cost God's own Son
📖 Peace with an enemy always costs something

## Much More, Being Reconciled, We Shall Be Saved By His Life

Paul moves from the cross to the resurrection in one sentence.

Christ's death reconciled believers to God.

Christ's ongoing life now keeps them saved day by day.

A living Christ, not just a finished event, secures the believer.

This salvation is not a single transaction.

✝️ Paul moves from death to life
🔄 Christ's death reconciled believers once
🌱 Christ's life keeps them saved daily
📖 This salvation is not a single moment

## By Whom We Have Now Received The Atonement

Atonement means the covering that makes two estranged parties one again.

This is the only place in the whole King James New Testament that uses this exact word.

Paul does not only mean relief from punishment.

He also means joy in God Himself.

This joy is the proof that the relationship is truly restored.

🔏 Atonement means two parties made one
📜 A rare word in the New Testament
😊 Paul means joy, not only relief
📖 This joy proves a restored relationship

# Romans 5:12-14
# 🍎 Sin Entered By One Man
---
## By One Man Sin Entered Into The World, And Death By Sin

One man refers to Adam, named directly a few verses later.

Sin entered means it came in from outside, not something humanity invented alone.

Death followed sin the way a shadow follows an object in light.

Paul is building a parallel he will complete later in the chapter.

One man opened the door that let both sin and death in.

🍎 One man refers to Adam directly
🚪 Sin entered the world from outside
💀 Death followed sin like a shadow
📖 One man opened the door for both

## So Death Passed Upon All Men, For That All Have Sinned

This is not saying people die only because Adam sinned once.

Death passed to everyone because everyone, without exception, sinned personally too.

Adam's sin opened the path death would travel on.

Every person's own sin is what death reaches them for.

One truth opened the door.

The other truth means everyone walked through it.

🚫 Not only because Adam sinned once
🌍 Everyone sinned personally too
🛣️ Adam opened the path for death
📖 Each person still walked through that door

## Until The Law Sin Was In The World, But Sin Is Not Imputed When There Is No Law

Imputed means formally charged against someone, like a debt on a ledger.

Sin was already present in the world before the law of Moses existed.

Without a written law, sin was real but not yet formally charged.

This is the same word used for crediting Abraham's faith in chapter four.

The law did not create sin.

It gave sin a name and a charge.

📒 Imputed means formally charged, like a debt
🌍 Sin existed before the law of Moses
📜 Same word used for Abraham's faith
📖 The law gave sin its name

## Death Reigned From Adam To Moses, Even Over Them That Had Not Sinned After The Similitude Of Adam's Transgression

Similitude means likeness or exact copy, the same shape repeated.

Even people who never broke a specific command like Adam's still died.

Death reigned the entire stretch between Adam and the giving of the law.

This proves death spread from Adam's one act, not from each person's own list of sins.

Death was already king long before anyone could measure sin by a written rule.

👑 Death reigned from Adam to Moses
🧩 Similitude means an exact likeness
💀 People died without Adam's specific sin
📖 Death spread from one act, not many

## Who Is The Figure Of Him That Was To Come

The word who refers to Adam, not the last name mentioned before it.

Figure here means a type, an early pattern pointing to someone greater later.

Him that was to come refers to Jesus Christ, still centuries away.

Adam represented all humanity in one act of disobedience.

Adam is the shadow.

Christ is the substance the shadow was pointing toward.

👤 Who refers to Adam, not Moses
🧩 Figure means an early pattern or type
✝️ Him to come means Jesus Christ
📖 Christ is the substance Adam pointed to

# Romans 5:15-17
# 🎁 The Free Gift Abounds
---
## Not As The Offence, So Also Is The Free Gift

Paul now begins comparing Adam's sin and Christ's gift side by side.

Offence here means Adam's one act of disobedience in the garden.

The free gift means what Christ freely provided through His own obedience.

These two things look similar in shape but are not equal in weight.

The gift is bigger than the offence ever was.

⚖️ Paul compares offence and gift
🍎 Offence means Adam's one act
🎁 Free gift means Christ's provision
📖 The gift outweighs the offence

## Hath Abounded Unto Many

Abounded means overflowed far beyond what was needed.

One man's sin brought death to many people.

One man's obedience brought grace that overflowed to many people too.

The word many on both sides keeps the comparison direct.

Grace did not only answer sin.

It outran sin by far.

🌊 Abounded means overflowed far beyond need
💀 One man's sin brought death to many
🎁 One man's grace overflowed to many
📖 Grace outran sin by far

## The Judgment Was By One To Condemnation

One single sin was enough to bring a formal guilty verdict on everyone.

Judgment here means a legal decision, not just a feeling of guilt.

Condemnation means the sentence that decision carried, separation from God.

It took only one offence to trigger that sentence for the whole human race.

One act was all it took to condemn everyone born after it.

⚖️ Judgment means a formal legal decision
🔒 Condemnation means the sentence that followed
🎯 One offence triggered it for everyone
📖 One act condemned the whole human race

## The Free Gift Is Of Many Offences Unto Justification

Christ's gift does something even harder than Adam's offence did.

It does not cancel only one sin.

It answers many offences at once.

Justification means a declaration of right standing, the opposite of condemnation.

One gift covers a lifetime of offences, not a single sin.

Grace does more than sin ever did.

🎁 Christ's gift answers many offences
🙅 Not just one sin cancelled
⚖️ Justification means declared right standing
📖 Grace does more than sin ever did

## By One Man's Offence Death Reigned By One

Paul repeats the word reigned to build toward a bigger contrast.

One man's offence put death on the throne over the whole human race.

This reign of death touched every single person after Adam.

It set the stage for an even greater reign to come.

Death ruling through one man is the problem the next line solves.

👑 Death reigned through one man's offence
🌍 This reign touched the whole race
⚔️ Paul sets up a bigger contrast
📖 This reign is the problem to be solved

## Shall Reign In Life By One, Jesus Christ

Believers do not only escape death's reign.

They also gain a reign of their own.

Abundance of grace means far more than enough, with plenty left over.

Reign in life describes a new kind of rule under Christ, not under death.

Much more repeats a pattern Paul has used throughout this chapter.

What Christ gives always outweighs what Adam cost.

👑 Believers gain a reign of their own
🌊 Abundance of grace means more than enough
✝️ This new reign exists under Christ
📖 What Christ gives outweighs what Adam cost

# Romans 5:18-21
# 👑 Grace Reigns Through Righteousness
---
## By The Offence Of One Judgment Came Upon All Men To Condemnation

Paul now states the full comparison in its clearest form yet.

One offence was enough to bring judgment on the entire human race.

Condemnation here means every person born after Adam inherited that guilty verdict.

No one had to personally repeat Adam's exact sin to be included.

The whole race stood condemned because of what one man did.

📜 Paul states the comparison clearly
⚖️ One offence brought judgment on all
🌍 The whole race inherited that verdict
📖 One man's act condemned everyone

## By The Righteousness Of One The Free Gift Came Upon All Men Unto Justification Of Life

The other side of the comparison is just as wide as the first.

One man's righteousness, Christ's own obedience, made this free gift possible.

Justification of life means a right standing that leads to real life.

All men here describes the gift's reach, not an automatic guarantee without faith.

The gift is offered as wide as the condemnation ever was.

✝️ Christ's righteousness makes the gift possible
🎁 Justification of life means real life
📏 All men shows the gift's wide reach
📖 The gift matches the condemnation's reach

## By One Man's Disobedience Many Were Made Sinners

Paul restates the comparison a third time, each time sharpening it.

Disobedience here points to one specific moment, eating the forbidden fruit.

Made sinners means the whole human race was shaped by that choice.

This is not about imitating Adam's bad example.

It is about actually being born into his broken condition.

🔁 Paul restates the comparison a third time
🍎 Disobedience points to the forbidden fruit
🧬 Made sinners means shaped by that choice
📖 This is inheritance, not imitation

## So By The Obedience Of One Shall Many Be Made Righteous

Christ's one act of obedience works the same way Adam's disobedience did, in reverse.

Made righteous means actually becoming right with God, not merely excused.

This happens through Christ's obedience, especially His willingness to die on the cross.

The same pattern that spread sin now spreads righteousness instead.

One man's choice still shapes the many.

This time it is for good.

✝️ Christ's obedience reverses Adam's pattern
🙏 Made righteous means truly right with God
🔁 The same pattern now spreads righteousness
📖 One man's choice still shapes the many

## The Law Entered, That The Offence Might Abound

This does not mean the law caused people to sin more often.

The law entered means it arrived later, after sin was already present.

Might abound means the law made existing sin visible and measurable.

A command does not create the desire to break it.

It exposes what was already there.

🚫 Not saying the law caused more sin
⏳ The law entered after sin existed
🔍 The law made sin visible and measurable
📖 Commands expose sin, they do not create it

## Where Sin Abounded, Grace Did Much More Abound

This is the turning point sentence of the entire chapter.

Wherever sin grew the largest, grace grew even larger there.

Much more abound means grace never just matches sin.

It always outpaces sin instead.

This is not a close contest between two equal forces.

Grace wins by more than it takes to simply cover the debt.

🔑 This is the chapter's turning point
🌱 Grace grew larger wherever sin grew
📈 Grace always outpaces sin, never ties it
📖 Grace wins by more than enough

## Sin Hath Reigned Unto Death, Even So Might Grace Reign Through Righteousness Unto Eternal Life

The chapter closes with the same word it has used from the start, reigned.

Sin's reign ended in death, the exact opposite of what it promised.

Grace's reign works through righteousness, not around it.

That reign ends in eternal life, not a temporary relief from guilt.

Two kingdoms stand side by side, with two very different endings.

👑 The chapter closes on reigned again
💀 Sin's reign ended in death
✝️ Grace reigns through righteousness, not around it
📖 Two kingdoms, one ending in eternal life
`.trim();

export const ROMANS_FIVE_PERSONAL_SECTIONS = parseRomansFiveRawNotes(ROMANS_FIVE_RAW_NOTES);
