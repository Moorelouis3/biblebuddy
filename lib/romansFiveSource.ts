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

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 5 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_FIVE_RAW_NOTES = `# Romans 5:1-5
# 🕊️ Peace With God Through Hope
---
## Therefore Being Justified By Faith, We Have Peace With God

"Peace with God" does not mean a calm feeling inside a person.

It means the hostility between God and the sinner is actually over.

Paul spent four whole chapters proving how that peace gets made.

Now the letter turns from the verdict itself to what that verdict produces.

Everything that follows in this chapter grows out of this one peace.

🕊️ Peace means hostility is over, not calm feelings
⚖️ Four chapters proved how this peace was made
🔁 The letter now turns to what peace produces
📖 Every verse ahead grows from this one peace

## By Whom Also We Have Access By Faith Into This Grace Wherein We Stand

"Access" means being granted entry into a place once closed off.

Think of a visitor finally allowed past a guarded door into a throne room.

Faith is what opens that door, not personal worthiness or performance.

"Wherein we stand" means this is not a visit, it is a settled position.

Believers do not sneak into God's presence, they stand there permanently now.

🚪 Access means entry into a once closed place
👑 Like a visitor let into a throne room
🙏 Faith opens the door, not personal merit
📖 Believers stand there permanently, not just visit

## We Glory In Tribulations Also

This does not mean Christians are supposed to enjoy pain itself.

"Glory" here means a confident boasting, the same word used for Abraham's hope.

Paul is not praising suffering, he is praising what suffering produces.

The next three words in this verse start a chain worth following closely.

🚫 Not praising pain itself as something good
💪 Glory means confident boasting, like Abraham's hope
🔄 Praising what suffering produces, not suffering alone
📖 A chain of growth starts next verse

## Tribulation Worketh Patience

"Tribulation" means real pressure and trouble, not minor inconvenience.

"Worketh" means produces, the same way pressure on grapes produces juice.

"Patience" here means endurance under pressure, not simply waiting quietly.

Trouble does not just happen to a believer, it builds something inside them.

⚖️ Tribulation means real pressure, not small annoyance
🍇 Worketh means produces, like pressure makes juice
🧱 Patience means endurance, not just waiting
📖 Trouble builds something instead of just happening

## And Patience, Experience, And Experience, Hope

"Experience" here does not mean simply living through something.

It means proven character, the kind only pressure can actually test.

Endurance under pressure eventually proves a person's trust is real and solid.

That proven trust is what grows into a confident, forward looking hope.

Each link in this chain depends completely on the one before it.

🧪 Experience means proven character, not just living through
🔍 Pressure is the only thing that proves it
🌱 Proven trust grows into confident hope
📖 Each link depends on the one before it

## Hope Maketh Not Ashamed

"Ashamed" here means to be publicly let down, proven wrong in the end.

This hope is not a nervous wish that might fall apart later.

It is a certainty guaranteed to prove true when it is finally tested.

Every link in the chain before this verse was building toward this certainty.

😳 Ashamed means publicly proven wrong later
🎯 Not a nervous wish that might fail
🔒 A certainty guaranteed to hold up
📖 The whole chain was building to this

## The Love Of God Is Shed Abroad In Our Hearts By The Holy Ghost

"Shed abroad" means poured out generously, the way rain floods a dry field.

This is not a small measured amount, it is an overwhelming flood.

The Holy Ghost is the one who actually delivers this love into a believer.

This is the reason the hope in the verse before this one cannot fail.

🌧️ Shed abroad means poured out generously
🌊 Not measured small, but an overwhelming flood
🕊️ The Holy Ghost delivers this love
📖 This is why that hope cannot fail

# Romans 5:6-8
# ✝️ Christ Died For The Ungodly
---
## When We Were Yet Without Strength

"Without strength" means completely unable to save or fix ourselves.

This is not a minor weakness that a little more effort could overcome.

Paul describes total helplessness, not a partial deficiency needing a boost.

Christ did not arrive to assist people who were almost there already.

🚫 Without strength means totally unable to help ourselves
🏥 Not a minor weakness fixed with more effort
🆘 Total helplessness, not a partial deficiency
📖 Christ did not just assist the almost ready

## In Due Time Christ Died For The Ungodly

"In due time" means at the exact moment God had planned all along.

This was never a rushed rescue or a change of plan.

"Ungodly" names the actual condition of the people Christ died for.

He did not wait for people to become godly first.

⏳ Due time means God's own planned moment
📅 Never a rushed rescue or sudden change
💔 Ungodly names the real condition of the people
📖 He did not wait for them to improve

## Scarcely For A Righteous Man Will One Die

Paul appeals to ordinary human experience before making his point about Christ.

"Scarcely" means rarely, almost never, even for someone who deserves rescue.

Dying for a genuinely righteous person is already an extreme, rare act.

Most people will not take that risk even for someone who earned it.

🙋 Paul appeals to common human experience first
📉 Scarcely means rarely, almost never happening
⚖️ Dying for the righteous is already extreme
📖 Most will not risk it even then

## Peradventure For A Good Man Some Would Even Dare To Die

"Peradventure" means perhaps, maybe, with real uncertainty attached to it.

"Good" here is slightly softer than "righteous," someone likeable rather than flawless.

Even for a well liked person, dying for them stays a rare, daring act.

Paul is building the smallest possible human comparison before verse eight breaks it.

🤔 Peradventure means perhaps, with real uncertainty
😊 Good means likeable, softer than righteous
🎲 Dying for a likeable person stays rare
📖 This sets up the comparison in verse eight

## God Commendeth His Love Toward Us

"Commendeth" means proves and puts on clear display for everyone to see.

God does not simply claim to love people, he demonstrates it in a specific act.

This is the clearest, most direct kind of proof available.

The next phrase names exactly where that proof happened.

📢 Commendeth means proved and put on display
🎯 Not a claim, but a specific demonstrated act
🔑 The clearest proof available of real love
📖 The next phrase names where it happened

## While We Were Yet Sinners, Christ Died For Us

This verse answers the small human examples from verses six and seven directly.

No one would normally die for a sinner, only for the righteous or the good.

Christ died for people who were still actively sinning, not reformed first.

This is the exact opposite of ordinary human love, and that is the whole point.

🔁 Directly answers verses six and seven
🚫 No one dies for sinners, only the good
✝️ Christ died for people still actively sinning
📖 This is the opposite of ordinary human love

# Romans 5:9-11
# 🙌 Saved, Reconciled, And Rejoicing
---
## Much More Then, Being Now Justified By His Blood

"Much more" is Paul's favorite phrase in this whole chapter, used again and again.

Each use argues from something already proven to something even more certain.

"Justified by his blood" points back to the actual cost of that verdict.

Blood names a real death, not a legal technicality or a symbol only.

🔁 Much more is Paul's repeated phrase this chapter
⬆️ Each use argues toward something even more certain
🩸 Blood points to an actual death
📖 Justification was never just a legal technicality

## We Shall Be Saved From Wrath Through Him

"Wrath" names God's settled judgment against sin, not a passing mood.

Justification already happened in the past, a finished legal verdict.

Being saved from wrath points forward to a future deliverance still to come.

The same Christ who secured the verdict also secures the future rescue.

⚡ Wrath means settled judgment, not a mood
✅ Justification already happened, a finished verdict
🔮 Salvation from wrath still points forward
📖 The same Christ secures both verdict and rescue

## When We Were Enemies, We Were Reconciled To God

"Enemies" describes real hostility, not a simple misunderstanding between two parties.

"Reconciled" means that hostility has actually been ended and resolved.

God did not meet people halfway while they stayed hostile toward him.

The hostility was fully dealt with before any change happened in the sinner.

⚔️ Enemies means real hostility, not confusion
🤝 Reconciled means that hostility is actually ended
🚫 God did not just meet people halfway
📖 Hostility was dealt with before we changed

## Much More, Being Reconciled, We Shall Be Saved By His Life

Paul repeats the much more pattern, from a weaker proof to a stronger certainty.

Reconciliation came through the death of Christ, an already finished fact.

Ongoing salvation comes through the life of Christ, meaning his continued activity now.

A Savior who died to reconcile also now lives to keep that rescue going.

🔁 Repeats the much more pattern again
🪦 Reconciliation came through Christ's finished death
🌱 Ongoing rescue comes through his continuing life
📖 A living Savior keeps the rescue going

## We Also Joy In God Through Our Lord Jesus Christ

"Joy" here is an active rejoicing, not a quiet background feeling.

This joy is directed at God himself, not merely at the benefits received.

Earlier in the chapter believers gloried in tribulation, now they glory in God directly.

The relationship itself has become something to actively celebrate.

🎉 Joy means active rejoicing, not quiet feeling
🎯 Aimed at God himself, not just the benefits
🔗 Builds on the earlier glorying in tribulation
📖 The relationship itself is now celebrated

## By Whom We Have Now Received The Atonement

"Atonement" means the covering that makes two estranged parties one again.

"Received" means this is a gift accepted, not something earned through effort.

"Now" marks this as a present possession, already settled and already held.

This single word closes the whole argument that began back in chapter one.

🤝 Atonement means being made one again
🎁 Received means a gift accepted, not earned
⏰ Now marks a present, already settled possession
📖 This closes the argument started in chapter one

# Romans 5:12-14
# 🍎 Sin And Death Enter Through One Man
---
## As By One Man Sin Entered Into The World

"One man" names Adam, the first human being, going back to Genesis three.

Sin is pictured here as an outside intruder, not something the world started with.

Before Adam's choice, sin had no entry point into human experience.

One single act opened a door that every person after him walked through.

🍎 One man names Adam, from Genesis three
🚪 Sin is pictured as an outside intruder
🔓 One act opened a door for everyone
📖 Every person after him walked through it

## Death By Sin, And So Death Passed Upon All Men

Death is not a natural, neutral part of the created world in Paul's picture.

Death arrived specifically as a consequence that sin brought with it.

"Passed upon all men" means every single person after Adam inherited that same consequence.

This happens whether or not a person ever consciously chooses to sin the same way.

💀 Death is not a neutral natural event here
⚖️ Death arrived as a consequence of sin
🌍 Every person after Adam inherits that consequence
📖 It happens whether or not we choose it

## Until The Law Sin Was In The World

"The law" refers to the law given through Moses, centuries after Adam.

Sin was already present in the world long before that law ever existed.

People were doing wrong even without a written code naming it directly.

Paul is setting up a careful distinction between sin itself and sin clearly defined.

📜 The law means the law given through Moses
⏳ Sin existed long before that law arrived
🙅 Wrongdoing happened with no written code yet
📖 Sin itself differs from sin clearly defined

## Sin Is Not Imputed When There Is No Law

"Imputed" means formally charged against someone's account, like Romans four's wording for faith.

Without a stated command, sin could not be charged in that specific, formal way.

This does not mean people were innocent during that stretch of history.

It means their guilt had not yet been measured against a clear written standard.

📒 Imputed means formally charged, as in Romans four
🚫 No command meant nothing to formally charge
🙅 This does not mean people were innocent
📖 Guilt was not yet measured clearly

## Death Reigned From Adam To Moses

"Reigned" pictures death as a king ruling over every single person in that era.

This long stretch covers centuries before the law of Moses ever arrived.

Even those without a clear written law to break still died, every one of them.

That universal death proves something deeper was wrong than just broken rules.

👑 Reigned pictures death ruling like a king
⏳ Covers centuries before the law arrived
💀 Even lawbreakers without a code still died
📖 Universal death points to a deeper problem

## Who Is The Figure Of Him That Was To Come

"Figure" means a pattern or preview, a sketch pointing toward someone greater.

Adam here becomes a preview of Christ, not a flattering comparison.

One man's single act shaped the destiny of everyone who came after him.

That exact pattern is about to repeat, but in the opposite direction, through Christ.

🖼️ Figure means a pattern or preview
🍎 Adam previews Christ, not flatteringly
🔁 One man's act shaped everyone after him
📖 The same pattern repeats in reverse through Christ

# Romans 5:15-17
# ⚖️ The Offence And The Free Gift
---
## Not As The Offence, So Also Is The Free Gift

"Offence" names Adam's sin, the specific act that brought death to everyone.

"Free gift" names what Christ provides, and Paul insists the two do not match evenly.

The gift is not simply an equal and opposite reversal of the offence.

The next several verses explain exactly how the gift outweighs the offence.

💔 Offence names Adam's specific sinful act
🎁 Free gift names what Christ provides instead
⚖️ The two are not an equal trade
📖 The gift outweighs the offence, not matches it

## Through The Offence Of One Many Be Dead

"Many" here means the whole human race, everyone descended from Adam.

One man's single choice produced consequences for every person who came after.

This is not Adam's private tragedy, it becomes everyone's inherited condition.

Paul states this plainly before showing how much bigger the solution is.

🌍 Many means the whole human race here
🍎 One choice produced consequences for everyone after
🧬 Not a private tragedy, but an inherited condition
📖 The solution ahead is shown to be bigger

## The Grace Of God Hath Abounded Unto Many

"Abounded" means overflowed far past what was strictly needed to fix the problem.

Grace does not just cancel Adam's damage and stop there.

It floods past that point into something bigger than the original loss.

This is the much more pattern from earlier in the chapter, stated again plainly.

🌊 Abounded means overflowed past what was needed
➕ Grace does not just cancel the damage
📈 It floods past the original loss entirely
📖 This repeats the much more pattern again

## The Judgment Was By One To Condemnation

"Judgment" names the legal verdict that followed Adam's single offence.

"Condemnation" is the specific sentence handed down inside that verdict.

One single act was enough to produce one single, sweeping sentence.

Paul sets this up carefully before contrasting it with how the gift actually works.

⚖️ Judgment names the verdict after Adam's act
🔨 Condemnation is the sentence inside that verdict
☝️ One single act produced one sweeping sentence
📖 The gift works differently, shown next

## The Free Gift Is Of Many Offences Unto Justification

Condemnation came from one single offence, Adam's own first sin.

Justification deals with many offences, the whole pile of every sin committed since.

The gift does not just undo one act, it covers an entire lifetime of acts.

This is a far bigger problem solved by a far bigger gift.

🍎 Condemnation came from one single offence
📚 Justification covers many offences, a whole pile
🎁 The gift covers a lifetime, not one act
📖 A bigger problem meets a bigger gift

## Death Reigned By One

This repeats the king image from verse fourteen, death ruling as a tyrant.

One man's offence was enough to install that tyrant over the whole human race.

Paul keeps returning to the phrase "by one" to stress how small the cause was.

A single act, not a long accumulation of sin, started this reign.

👑 Repeats the king image from verse fourteen
☝️ One offence installed death as tyrant
🔁 By one stresses how small the cause was
📖 A single act started this whole reign

## They Which Receive Abundance Of Grace Shall Reign In Life

Paul flips the king image completely, from death reigning to believers reigning.

"Receive" means this is accepted as a gift, never achieved by effort.

"Abundance" repeats the overflow idea from earlier in this same section.

Believers do not just escape death's reign, they are given a reign of their own.

🔄 Flips the king image from death to believers
🎁 Receive means accepted, never achieved by effort
🌊 Abundance repeats the overflow idea again
📖 Believers get a reign, not just an escape

# Romans 5:18-21
# 👑 Grace Reigns Through Righteousness
---
## By The Offence Of One Judgment Came Upon All Men

Paul now summarizes the whole argument from verses twelve through seventeen in two tight verses.

"All men" here means every single human being without exception.

One man's offence was enough to bring judgment on the entire race.

Nothing anyone did personally was required to be included under that judgment.

📝 Paul summarizes the whole argument in two verses
🌍 All men means every human without exception
☝️ One offence brought judgment on the entire race
📖 Personal action was not required to be included

## By The Righteousness Of One The Free Gift Came Upon All Men

This verse mirrors the structure of the one just before it exactly.

"Righteousness of one" points to Christ's obedience, not the believer's own effort.

"Justification of life" means a verdict that leads directly into actual living, not just a pardon.

The same scope, all men, now applies to an offer rather than an automatic sentence.

🔁 Mirrors the exact structure of the verse before
✝️ Righteousness of one points to Christ's obedience
🌱 Justification of life leads into actual living
📖 The same scope now describes an offer

## By One Man's Disobedience Many Were Made Sinners

"Disobedience" names exactly what happened in Eden, a direct refusal of God's command.

"Made sinners" means something was actually changed in the human condition, not just one act counted.

Every person born after Adam inherits this condition, not merely Adam's example.

This is the deepest reason people sin, deeper than any bad influence or choice.

🚫 Disobedience names the direct refusal in Eden
🧬 Made sinners means a changed condition
👶 Every person after Adam inherits this condition
📖 This explains sin deeper than bad influence

## By The Obedience Of One Shall Many Be Made Righteous

Christ's obedience answers Adam's disobedience point for point in this verse.

"Made righteous" matches "made sinners," a real change, not a legal fiction only.

Christ's one act of obedience reaches as many people as Adam's one act of disobedience did.

Paul has now stated his whole Adam and Christ comparison as plainly as possible.

✝️ Christ's obedience answers Adam's disobedience directly
🔁 Made righteous matches made sinners, a real change
☝️ Christ's one act reaches just as many
📖 The whole Adam and Christ comparison is stated

## The Law Entered, That The Offence Might Abound

"The law" again means the law given through Moses, centuries after Adam.

The law did not create sin, since sin already existed before it arrived.

What the law did was expose sin clearly, naming it as a specific transgression.

"Abound" here means sin's true scale became visible once it had a clear standard to break.

📜 The law means the law given through Moses
🙅 The law did not create sin itself
🔍 The law exposed sin, naming it clearly
📖 Sin's true scale became visible once named

## Where Sin Abounded, Grace Did Much More Abound

This is the much more pattern returning one final time to close the chapter's argument.

Sin's increase through the law never came close to outpacing grace.

Grace does not merely keep up with sin, it overtakes it completely.

Whatever scale sin reached, grace was always already larger.

🔁 The much more pattern returns one last time
📈 Sin's increase never outpaced grace
🌊 Grace overtakes sin completely, not just keeps up
📖 Grace was always already larger than sin

## Grace Reign Through Righteousness Unto Eternal Life By Jesus Christ Our Lord

The chapter closes by setting two kingdoms side by side one final time.

Sin reigned, and its territory was death, exactly as verse seventeen stated earlier.

Grace now reigns, and its territory is eternal life, not merely a pardon.

"Through righteousness" means this reign rests on a settled legal basis, not random mercy.

Every believer now lives inside that second kingdom instead of the first one.

👑 Two kingdoms are set side by side
💀 Sin's kingdom ruled toward death
🌿 Grace's kingdom rules toward eternal life
📖 Righteousness gives that reign a legal basis
`.trim();

export const ROMANS_FIVE_PERSONAL_SECTIONS = parseRomansFiveRawNotes(ROMANS_FIVE_RAW_NOTES);
