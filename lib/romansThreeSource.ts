export type RomansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansThreeRawNotes(rawText: string): RomansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 3:${startVerse}` : `Romans 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Romans 3 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_THREE_RAW_NOTES = `# Romans 3:1-4
# ❓ Does Being A Jew Even Matter
---
## What Advantage Then Hath The Jew

Chapter two just argued that circumcision alone does not make a person right with God.

That conclusion raises an obvious question for a Jewish reader.

"Advantage" means a real benefit gained over someone else.

Paul asks the hard question himself before anyone else can.

He is not dismissing Jewish identity.

He is about to explain what it is actually worth.

❓ Paul raises his own objection first
⚖️ Advantage means a real benefit
🤔 Circumcision alone does not save
📖 Jewish identity still carries real weight

## What Profit Is There Of Circumcision

"Profit" asks the same question as "advantage" in slightly different words.

Circumcision marked a Jewish male as part of God's covenant people.

Chapter two already said the sign means nothing without obedience behind it.

So Paul pushes the question even further here.

Does the sign itself still carry any value at all.

Paul answers yes, just not the way a proud reader expects.

🩹 Profit repeats the question as advantage
✂️ Circumcision marked covenant belonging
🚫 The sign alone does not save
📖 Paul still says yes, it has value

## Much Every Way

Paul answers his own question before elaborating on it.

"Much every way" means the benefit is real and sizable.

This is not one narrow advantage.

It is a whole list of benefits.

The next phrase names the first and greatest one on that list.

💪 Much every way means real and large
🙅 Not one narrow advantage
📋 A whole list of benefits follows
📖 Chief among them comes next

## Chiefly Because Unto Them Were Committed The Oracles Of God

"Committed" means something valuable was placed into their trust and care.

"Oracles" means the actual words spoken directly by God.

Israel received the law, the prophets, and the promises in written form first.

No other nation had been given God's own words this way.

This is the first and greatest advantage Paul names.

📦 Committed means entrusted with something valuable
🗣️ Oracles means God's own spoken words
📜 Israel received the law and prophets first
📖 No other nation had this gift

## What If Some Did Not Believe

Paul raises a real problem head on.

Not every Israelite actually believed the promises God gave them.

Someone could use that fact to argue God's own word had failed.

Paul refuses to let human unbelief become an accusation against God.

❓ A real problem raised directly
🙅 Not every Israelite believed
⚖️ Human failure could look like God's failure
📖 Unbelief never becomes an accusation against God

## Shall Their Unbelief Make The Faith Of God Without Effect

"The faith of God" here means God's own faithfulness, not human belief in him.

"Without effect" means cancelled or made powerless.

Paul asks if human unfaithfulness could cancel God's faithfulness.

One person breaking a promise does not unmake the character of the one who kept it.

God's faithfulness never depends on how anyone else responds to it.

🙏 Faith of God means his faithfulness
🚫 Without effect means cancelled out
⚖️ Human failure cannot cancel God's truth
📖 God's faithfulness never depends on us

## God Forbid

This phrase is Paul's strongest possible no.

It does not mean a polite disagreement.

It means the idea is unthinkable and must be rejected outright.

Paul will repeat this same reaction several more times in Romans.

Each time it shuts down a wrong conclusion before it can take root.

🚫 God's strongest possible no
🙅 Not a polite disagreement
🌱 Shuts down a wrong idea early
📖 Paul repeats this phrase often in Romans

## Let God Be True, But Every Man A Liar

Paul sets up a sharp contrast here.

One side says God stays true no matter what.

The other side says every human being is the one who fails.

Paul picks the first option without hesitation.

God's character never bends to match human failure.

⚖️ A sharp contrast is set up
🙏 God stays true no matter what
👤 Humans are the ones who fail
📖 God's character never bends to failure

## That Thou Mightest Be Justified In Thy Sayings

This line is a direct quote from Psalm fifty one.

David wrote it after Nathan confronted him over his sin with Bathsheba.

"Justified in thy sayings" means God is proven right in what he said.

Even human failure ends up proving God's words true.

David's own confession becomes proof of exactly that.

📖 A direct quote from Psalm fifty one
👑 David wrote it after his sin was exposed
✅ Justified means proven right
➡️ Human failure still proves God's words true

## Mightest Overcome When Thou Art Judged

"Overcome" here pictures a courtroom victory.

God wins his case completely when humanity's failure is placed on trial.

This is not God overcoming a human opponent in a fight.

It is God's own record standing up perfectly under judgment.

No accusation against God can ever actually stick.

⚖️ Overcome pictures a courtroom victory
🏆 God's case wins completely
🙅 Not a fight against a person
📖 No accusation against God can stick

# Romans 3:5-8
# 🤔 Twisting Grace Into An Excuse
---
## If Our Unrighteousness Commend The Righteousness Of God

Paul raises a twisted argument someone might actually try to make.

"Commend" means to make something look good by comparison.

The logic goes, our sin makes God's goodness shine even brighter.

So maybe sin actually helps God's reputation.

🤔 A twisted argument raised on purpose
✨ Commend means to make something look good
🌓 Sin supposedly makes God's goodness shine
➡️ Paul is about to tear this down

## Is God Unrighteous Who Taketh Vengeance

"Taketh vengeance" means carrying out deserved punishment.

The question asks if punishing sin makes God himself unfair.

Paul adds a quick aside here, "I speak as a man."

He admits this is a flawed way humans might reason.

God's justice is never unfair just because it responds to sin.

⚔️ Taketh vengeance means deserved punishment
🗣️ I speak as a man is an aside
🙅 Admits this is flawed human reasoning
📖 God's justice is never unfair

## God Forbid, For Then How Shall God Judge The World

Paul rejects the idea completely again.

If sin actually helped God somehow, God could never rightly judge anyone.

A judge cannot punish a crime that secretly benefits him.

God's role as judge over the world depends on him never needing sin.

The whole idea falls apart on its own.

🚫 Rejects the idea completely
⚖️ A judge cannot benefit from the crime
🌍 God judges the whole world justly
📖 The idea falls apart on its own

## If The Truth Of God Hath More Abounded Through My Lie

Paul pushes the twisted logic one step further to show how absurd it gets.

"Abounded" means increased or overflowed.

The argument claims a lie somehow makes God's truth stand out more.

By that logic, lying would actually serve God's glory.

Paul is building this argument up only to knock it down completely.

📈 Abounded means increased or overflowed
🤥 A lie supposedly highlights God's truth
🏗️ Paul builds the logic up on purpose
➡️ He is about to knock it down

## Why Yet Am I Also Judged As A Sinner

This finishes the twisted question from the first half of the verse.

If a lie serves God's glory, why would the liar still face judgment.

Paul is showing where this kind of reasoning always ends up.

It tries to turn personal sin into an excuse instead of a fault.

No one escapes judgment by claiming their sin accidentally helped God.

❓ Finishes the twisted question
🙅 Sin cannot become an excuse
🔁 Shows where this reasoning always leads
📖 No one escapes judgment this way

## As We Be Slanderously Reported

"Slanderously" means falsely accused on purpose to damage a reputation.

Paul reveals that people were actually twisting his own teaching this way.

Some apparently claimed Paul himself taught sin was fine.

Paul stops to correct the record before continuing his argument.

Being misquoted did not make him abandon the point he was making.

🗣️ Slanderously means falsely accused on purpose
😠 People twisted Paul's own teaching
📝 Paul stops to correct the record
➡️ He keeps building his argument anyway

## Let Us Do Evil, That Good May Come

This is the false teaching some accused Paul of actually preaching.

It claims sin is fine as long as something good eventually results.

Paul never said this and never implies it anywhere in his letters.

Grace is never a license to sin on purpose.

The next phrase shows exactly how seriously Paul takes this accusation.

🙅 A false teaching Paul never taught
🎭 Claims sin is fine if good follows
🚫 Grace is never a license to sin
➡️ Paul takes this accusation seriously

## Whose Damnation Is Just

"Damnation" here means a deserved sentence of judgment.

Paul says this fate is right and fitting for anyone who actually teaches that twisted idea.

This is some of the strongest language Paul uses in the whole letter.

Twisting grace into permission for sin carries real and serious consequences.

Grace was never meant to excuse the very thing it forgives.

⚖️ Damnation means a deserved sentence
🔥 Strong language used here on purpose
🚫 Twisting grace has real consequences
📖 Grace was never meant to excuse sin

# Romans 3:9-12
# ⚖️ No One Is Better, No One Is Good
---
## Are We Better Than They? No, In No Wise

Paul asks if Jews have some natural edge over Gentiles after all this argument.

"No, in no wise" is the strongest possible denial, meaning not at all.

Both groups already stand proven guilty from chapters one and two.

Neither background gives anyone a head start out of sin.

The ground is level before this verdict is announced.

❓ Asks if Jews have a natural edge
🚫 No in no wise means not at all
⚖️ Both groups already proven guilty
📖 The ground is level before God

## All Under Sin

"Under sin" pictures sin as a ruling power, not just a list of bad acts.

Everyone without exception lives under this same rule.

Jew and Gentile share the identical problem, even though their histories differ completely.

This verse functions as the hinge for everything that follows.

Paul now backs up this claim with a chain of Old Testament quotes.

👑 Under sin pictures a ruling power
🌍 Everyone lives under this same rule
🔗 Jew and Gentile share one problem
➡️ A chain of Old Testament quotes follows

## There Is None Righteous, No, Not One

Paul begins quoting a string of Old Testament verses, mostly from the Psalms.

"Righteous" means fully right and good before God's own standard.

This line is absolute on purpose, leaving no exceptions at all.

Every single person outside of Christ fits this description equally.

📜 Begins a string of Old Testament quotes
⚖️ Righteous means fully right before God
🚫 No exceptions are allowed here
📖 Everyone outside Christ fits this description

## There Is None That Understandeth

"Understandeth" here means grasping spiritual truth, not simple intelligence.

This is not an insult about human intelligence or education.

It describes a deeper blindness toward God that sin produces in everyone.

No one naturally reasons their own way to God on their own.

🧠 Understandeth means grasping spiritual truth
🚫 Not about intelligence or education
🕶️ Describes a spiritual blindness sin causes
📖 No one reasons their way to God alone

## There Is None That Seeketh After God

This describes the human starting position without God's own initiative first.

Left alone, people drift away from God rather than toward him.

Any real seeking after God only begins because God moved first.

This sets up the good news Paul announces later in the chapter.

🚶 Describes the human starting position
↩️ People drift away without help
🙏 Real seeking begins with God first
➡️ Sets up the good news ahead

## They Are All Gone Out Of The Way

This pictures a road that everyone has wandered off of together.

"The way" means the right path God intended people to walk.

This is not a few scattered individuals losing their footing.

The whole human race has drifted off course together.

🛣️ Pictures a road people wandered off
✅ The way means God's intended path
👥 Not just a few scattered people
📖 The whole human race drifted together

## Together Become Unprofitable

"Unprofitable" means worthless for the purpose something was made for.

Think of milk that has gone sour and can no longer be used.

Humanity was made to reflect God's own goodness into the world.

Sin left that purpose spoiled across the entire human race.

🥛 Unprofitable means worthless for its purpose
🧴 Like milk that has gone sour
🎯 Humans were made to reflect God
📖 Sin spoiled that purpose everywhere

## There Is None That Doeth Good, No, Not One

This repeats the same absolute claim from verse ten, now about actions instead of status.

"Doeth good" means genuinely good in God's own sight, not simply decent by human standards.

Someone can still be kind, generous, or admirable by every human measure.

None of that reaches the full standard God actually requires.

🔁 Repeats the absolute claim from verse ten
🎯 Doeth good means good by God's standard
👏 Kindness by human measures still falls short
📖 No one meets God's full requirement

# Romans 3:13-18
# 🐍 A Portrait Of Sin From Head To Foot
---
## Their Throat Is An Open Sepulchre

"Sepulchre" means a tomb, a place that holds death and decay.

An open tomb gives off a foul smell no one can hide.

This pictures words that sound fine at first but carry death inside them.

What comes out of the throat reveals what is actually inside a person.

⚰️ Sepulchre means a tomb
👃 An open tomb gives off decay
🗣️ Pictures words that hide death inside
📖 Speech reveals what is inside a person

## With Their Tongues They Have Used Deceit

"Deceit" means using words on purpose to mislead someone.

This is not an accidental mistake or a careless exaggeration.

The tongue becomes a tool aimed deliberately at fooling another person.

Quoted from Psalm five, this verse shows how old this pattern of sin really is.

🤥 Deceit means deliberately misleading someone
🛠️ The tongue becomes a tool for this
📜 Quoted from Psalm five
📖 This pattern of sin is very old

## The Poison Of Asps Is Under Their Lips

An "asp" is a venomous snake, likely a small desert cobra.

Its poison kills quietly, often before the victim even notices the bite.

Words can carry the same hidden, deadly danger as a snake's venom.

What sounds smooth and harmless on the surface can still destroy someone underneath.

🐍 Asp means a venomous snake
💀 Its poison kills quietly and fast
🗣️ Words can carry the same danger
📖 Smooth speech can still destroy someone

## Whose Mouth Is Full Of Cursing And Bitterness

"Cursing" here means calling down harm or judgment on someone else.

"Bitterness" describes a long held resentment that has settled deep inside.

Together they describe speech that flows from a genuinely wounded, angry heart.

What fills the mouth usually started by filling the heart first.

😤 Cursing means calling down harm on someone
💔 Bitterness means deep settled resentment
🗣️ Speech flows from the heart behind it
📖 The mouth reveals what filled the heart first

## Their Feet Are Swift To Shed Blood

"Swift" means quick, without hesitation or delay.

This moves the picture from words to actual violent action.

Feet usually picture direction, where a person is actively headed in life.

Here they are headed toward harming someone else without a second thought.

🏃 Swift means quick without hesitation
🗣️ Moves from words to real violence
🧭 Feet picture where a life is headed
📖 Here that direction leads to harm

## Destruction Is In Their Ways

"Destruction" names the damage this habitual path leaves behind.

"Ways" means the repeated pattern or direction a life naturally takes.

This path does not just risk harm occasionally.

It produces real harm on a regular basis.

A pattern of sin reliably produces damage over time.

💥 Destruction names real damage done
🛣️ Ways means a repeated pattern of life
🔁 This pattern produces harm regularly
📖 Sin reliably produces real damage

## Misery Is In Their Ways

"Misery" describes genuine suffering and distress.

This path does not only hurt other people.

It also hurts the very person walking it.

Sin promises satisfaction but regularly delivers suffering instead.

😢 Misery means real suffering and distress
🔄 Sin harms the one doing it too
🎭 Sin promises satisfaction, delivers suffering
📖 No sin stays contained to one person

## The Way Of Peace Have They Not Known

"Known" here means more than simple awareness, it means real familiarity through experience.

This describes people who have never actually walked a path of real peace.

Peace here means wholeness with God, not just the absence of conflict.

Without God, that kind of peace stays permanently out of reach.

🧭 Known means familiarity through experience
🚶 Never walked a path of real peace
🕊️ Peace means wholeness with God
📖 Without God that peace stays out of reach

## There Is No Fear Of God Before Their Eyes

"Fear of God" means a deep, healthy respect for who God actually is.

This is the final verse in the whole chain of quotes.

It names the actual root behind everything listed before it.

Every sin described above starts with losing sight of God first.

Remove reverence for God, and every other collapse follows close behind.

🙏 Fear of God means deep real respect
🔚 The final verse in this chain of quotes
🌱 Names the root behind everything else
📖 Losing sight of God starts the collapse

# Romans 3:19-20
# 🤐 Every Mouth Stopped
---
## What Things Soever The Law Saith, It Saith To Them Who Are Under The Law

Paul now explains who that long chain of Old Testament quotes was actually aimed at.

"The law" here includes the whole Old Testament, not only the five books of Moses.

Those verses were written to and about Israel, the people under the law directly.

If even Israel stands guilty, no one else has an exemption either.

📜 Explains who those quotes targeted
📚 The law here means the whole Old Testament
🇮🇱 Written to Israel, the people under it
📖 If Israel is guilty no one is exempt

## That Every Mouth May Be Stopped

This pictures a courtroom where every excuse finally runs out.

No one is left with an argument to make in their own defense.

Every attempt at self justification gets silenced completely.

The whole human case for innocence collapses at this point.

⚖️ Pictures a courtroom scene
🤐 Every excuse finally runs out
🙅 Self justification gets silenced
📖 The case for innocence collapses

## All The World May Become Guilty Before God

"The world" widens the verdict from Israel out to every single person.

"Guilty" here is a legal word, meaning answerable before a judge.

This closes the long argument Paul has been building since chapter one.

Jew and Gentile now stand in the exact same courtroom together.

🌍 The world widens the verdict to everyone
⚖️ Guilty means legally answerable to a judge
🔚 Closes the argument from chapter one
📖 Jew and Gentile share one courtroom

## By The Deeds Of The Law There Shall No Flesh Be Justified

"Deeds of the law" means actually performing what the law commands.

"No flesh" means absolutely no human being, without exception.

Trying hard to keep the law was never going to be enough for anyone.

This verse shuts the door on earning a right standing through effort alone.

📜 Deeds of the law means obeying its commands
🙅 No flesh means no human being at all
🚪 Shuts the door on earning a standing
📖 Effort alone was never going to be enough

## By The Law Is The Knowledge Of Sin

This states what the law was actually designed to do.

A law can show someone exactly where the line is.

It does not give anyone the power to stay inside that line.

Think of a speed limit sign.

It reveals the limit, but it cannot make a car slow down.

The law's real job was always to expose sin, not remove it.

🎯 States what the law was designed to do
🚦 Like a speed limit sign
👁️ It reveals sin, it cannot remove it
📖 Exposing sin was always its real job

# Romans 3:21-26
# ✝️ The Righteousness Of God Revealed
---
## But Now The Righteousness Of God Without The Law Is Manifested

"But now" marks the biggest turning point in the entire letter so far.

Everything before this verse described the problem.

This verse introduces the solution.

"Manifested" means something hidden has now been clearly revealed and put on display.

"Without the law" means this righteousness does not come from keeping commands.

🔄 But now marks the biggest turning point
❌ Everything before described the problem
💡 Manifested means clearly revealed
📖 This righteousness does not come from the law

## Being Witnessed By The Law And The Prophets

"Witnessed" means testified to in advance, like evidence given ahead of time.

"The law and the prophets" was a common Jewish way of naming the whole Old Testament.

This new solution is not actually new at all.

The Old Testament had been pointing toward it the entire time.

📜 Witnessed means testified to in advance
📚 Law and prophets means the whole Old Testament
🆕 This solution is not actually new
📖 The Old Testament pointed toward it all along

## The Righteousness Of God Which Is By Faith Of Jesus Christ

"Righteousness of God" means a right standing that comes from God himself, not from human effort.

"By faith of Jesus Christ" means this standing comes through trusting in Jesus.

It is received, not achieved through personal performance.

This flips the entire approach Paul has been dismantling since chapter one.

⚖️ Righteousness means a right standing from God
🙏 By faith means received through trust in Jesus
🎁 Received, not achieved through performance
📖 This flips the approach Paul has dismantled

## Unto All And Upon All Them That Believe

"Unto all" points to the offer being made available to every single person.

"Upon all" points to the offer actually landing on whoever actually believes.

The offer goes out universally, but it only lands by faith.

No background or nationality changes who qualifies for this offer.

🌍 Unto all means offered to everyone
🎯 Upon all means it lands through belief
📬 Offered universally, received by faith
📖 No background changes who qualifies

## For There Is No Difference

This phrase closes the long argument that Jew and Gentile share the same problem.

It now reveals they also share the exact same solution.

Neither group gets a shortcut.

Neither group gets left out either.

Faith levels the ground completely.

🔁 Closes the argument about shared guilt
🤝 Jew and Gentile share the same solution
🚫 No shortcut and no exclusion
📖 Faith levels the ground completely

## All Have Sinned, And Come Short Of The Glory Of God

"Come short" pictures an arrow falling short of its target.

"The glory of God" means the full weight of who God actually is.

Every person misses that target, though by very different distances.

This is one of the most quoted verses in the whole Bible.

It summarizes the entire human problem in a single line.

🎯 Come short pictures an arrow missing
✨ The glory of God means his full weight
📏 Everyone misses by different distances
📖 This verse summarizes the whole problem

## Being Justified Freely By His Grace

"Justified" means declared legally right, not simply forgiven.

"Freely" means given at no cost to the person receiving it.

"Grace" means favor given to someone who has not earned it.

The cost was real.

It was simply not paid by the person receiving the gift.

⚖️ Justified means declared legally right
🎁 Freely means given at no cost
💝 Grace means favor that was not earned
📖 The cost was real but paid by another

## Through The Redemption That Is In Christ Jesus

"Redemption" was a word used for buying a slave out of slavery.

It pictures a price paid to set someone free from bondage.

Here the bondage is sin, and the price was paid by Christ himself.

Freedom in this verse was never free of cost, only free to the one set free.

⛓️ Redemption meant buying a slave free
💰 A price paid to end bondage
✝️ Christ paid the price here
📖 Free to us, costly to him

## Whom God Hath Set Forth To Be A Propitiation

"Set forth" means publicly displayed out in the open.

"Propitiation" means a sacrifice that satisfies deserved wrath.

Think of a debt that is fully paid off, not simply overlooked.

God's own justice is satisfied, not ignored, through what Christ did.

📣 Set forth means publicly displayed
🕊️ Propitiation means a sacrifice that satisfies wrath
💳 Like a debt fully paid off
📖 God's justice is satisfied, not ignored

## Through Faith In His Blood

"His blood" points directly to Christ's actual death on the cross.

Blood throughout the Old Testament always represented a life given up.

This sacrifice is received through faith, not earned through ritual or effort.

Trusting in what Christ did replaces trying to earn standing on your own.

🩸 His blood points to Christ's death
📜 Blood represented a life given up
🙏 Received through faith, not effort
📖 Trust replaces trying to earn it

## For The Remission Of Sins That Are Past

"Remission" means an official release from a debt or a charge.

"Sins that are past" points to sins committed before Christ.

It reaches all the way back to the Old Testament.

God had been patient, holding off full judgment, for centuries before this moment.

The cross finally accounts for sins God had already been patiently overlooking.

📝 Remission means official release from a debt
⏳ Sins that are past means Old Testament sins
🕰️ God had been patient for centuries
📖 The cross accounts for sins already overlooked

## Through The Forbearance Of God

"Forbearance" means holding back a punishment that could rightly be given.

This same word already appeared back in chapter two.

God's patience was never a sign that sin did not matter.

It was always leading toward this exact moment at the cross.

⏳ Forbearance means holding back deserved punishment
🔁 This word already appeared in chapter two
🚫 Patience never meant sin did not matter
📖 It was leading toward the cross

## That He Might Be Just, And The Justifier Of Him Which Believeth In Jesus

How could God stay perfectly just and still forgive guilty people.

That question could have had no real answer.

"Just" means God's own standard of right is never compromised.

"Justifier" means God is also the one who declares the believer righteous.

At the cross, justice and mercy meet without either one being abandoned.

❓ Solves what seemed like an impossible problem
⚖️ Just means God's standard stays intact
🙌 Justifier means God declares believers righteous
📖 Justice and mercy meet at the cross

# Romans 3:27-31
# 🙏 Faith Levels The Ground
---
## Where Is Boasting Then? It Is Excluded

"Boasting" here means claiming personal credit for your own salvation.

If justification comes by faith alone, no one has grounds left to brag.

"Excluded" means shut out completely, with no room left to sneak back in.

Grace removes every possible reason for human pride.

🗣️ Boasting means claiming personal credit
🚪 Excluded means shut out completely
🙅 No grounds left for bragging
📖 Grace removes every reason for pride

## By What Law? Of Works? Nay, But By The Law Of Faith

Paul asks which system of rules would allow for boasting.

A system based on works would leave room for someone to take credit.

"The law of faith" describes a completely different system, one built on trust.

Faith by its very nature has nothing left to boast about.

❓ Asks which system allows boasting
🏗️ Works based systems leave room for credit
🙏 Law of faith means trust, not performance
📖 Faith has nothing left to boast about

## A Man Is Justified By Faith Without The Deeds Of The Law

"Therefore" signals Paul's main conclusion after this entire argument.

"Without the deeds of the law" means law keeping adds nothing to this verdict.

Faith alone connects a person to what Christ already accomplished.

This single sentence became the center of the Reformation centuries later.

✅ Therefore signals the main conclusion
🚫 Deeds of the law add nothing here
🙏 Faith alone connects a person to Christ
📖 This sentence shaped the Reformation later

## Is He The God Of The Jews Only

Paul widens the lens from doctrine out to God's own identity.

If justification required keeping the Jewish law perfectly, God would belong to one nation only.

That idea contradicts everything the Old Testament actually says about God.

God always intended to bless every nation, all the way back to Abraham.

🔍 Widens the lens to God's own identity
🇮🇱 That idea would make God one nation's God
🌍 Contradicts the Old Testament's own witness
📖 God always intended to bless every nation

## Is He Not Also Of The Gentiles? Yes, Of The Gentiles Also

Paul answers his own question immediately and firmly.

God was never a tribal or regional deity confined to one people.

The promise to Abraham always included blessing for every nation on earth.

Faith opens the same door to Jew and Gentile alike.

✅ Paul answers his own question firmly
🌍 God was never confined to one people
🤝 Abraham's promise always included every nation
📖 Faith opens the same door to all

## Seeing It Is One God

"One God" was the central truth that separated Israel from every surrounding nation.

Paul uses this core belief to prove his point about Jew and Gentile together.

One God naturally means one single way back to him.

Two separate paths to God would require two separate gods.

☝️ One God separated Israel from its neighbors
🧩 Proves the point about Jew and Gentile
🚪 One God means one way back to him
📖 Two paths would require two gods

## Which Shall Justify The Circumcision By Faith, And Uncircumcision Through Faith

"The circumcision" is Paul's shorthand for Jewish believers.

"Uncircumcision" is his shorthand for Gentile believers.

Both groups are justified through the exact same faith, not two different paths.

The method never changes, no matter who is walking through the door.

✡️ Circumcision means Jewish believers
🌍 Uncircumcision means Gentile believers
🔁 Both justified through the same faith
📖 The method never changes for anyone

## Do We Then Make Void The Law Through Faith

Paul raises one final objection before closing the chapter.

"Make void" means cancel out or render completely useless.

If faith alone saves, does the law become pointless or obsolete.

Paul is about to give his sharpest possible answer to this.

❓ Raises one final objection
🚫 Make void means cancel out completely
📜 Asks if the law becomes pointless
➡️ A sharp answer comes right away

## God Forbid, Yea, We Establish The Law

This is the third "God forbid" in this chapter alone.

"Establish" means to confirm and strengthen, the exact opposite of canceling something.

Faith does not throw out the law's purpose.

It actually fulfills what the law always pointed toward.

The law exposed sin, and faith now answers the very problem it exposed.

🚫 The third God forbid in this chapter
🏗️ Establish means confirm and strengthen
🎯 The opposite of canceling the law
📖 Faith fulfills what the law pointed toward
`.trim();

export const ROMANS_THREE_PERSONAL_SECTIONS = parseRomansThreeRawNotes(ROMANS_THREE_RAW_NOTES);
