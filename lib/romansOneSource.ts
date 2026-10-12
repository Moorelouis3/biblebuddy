export type RomansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansOneRawNotes(rawText: string): RomansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 1:${startVerse}` : `Romans 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 1 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_ONE_RAW_NOTES = `# Romans 1:1-7
# ✉️ Paul Introduces Himself
---
## 🙇 A Servant Of Jesus Christ

"Servant" here means much more than an employee.

The Greek word points to a bondservant, someone fully owned by their master.

Paul opens his most important letter by naming himself a slave of Christ before anything else.

That title was not a put down in his mind.

It was the highest honor he could claim.

🙇 Servant means bondservant, not employee
👑 Paul belongs fully to Christ
📜 He names this before any other title
📖 Ownership by Christ is Paul's highest honor

## 📯 Called To Be An Apostle

An apostle is someone sent out with authority to speak for another.

Paul was not self appointed to this role.

He describes it as a calling, something God initiated and Paul received.

This matters because false teachers in Rome would later question whether Paul had real authority.

📯 Apostle means a sent representative
🙋 Paul did not choose this role himself
✋ God initiated the calling
📖 Authority came from God, not ambition

## 🌍 Separated Unto The Gospel Of God

"Separated" means set apart for a specific purpose.

Paul uses a word closely tied to the name Pharisee, which also carries the idea of being set apart.

He had once been set apart to guard the old law.

Now he is set apart to carry the good news about Jesus instead.

🌍 Separated means set apart on purpose
📚 Paul was once set apart for the law
✝️ Now set apart for the gospel instead
📖 A new purpose replaced the old one

## 📰 The Gospel Of God

"Gospel" simply means good news, not a complicated theological term.

In the Roman world, this same word was sometimes used to announce a new emperor's reign.

Paul borrows ordinary language and applies it to something far greater than any emperor.

This good news belongs to God, not to Rome.

📰 Gospel means good news in plain language
🏛️ Romans used the word for imperial announcements
✝️ Paul applies it to something greater
📖 This news belongs to God, not Caesar

## 📅 Promised Afore By His Prophets

The word afore simply means beforehand.

Paul insists this good news is not a new invention.

Old Testament prophets had already promised a coming Messiah long before Jesus arrived.

The holy scriptures Paul means here are what Christians now call the Old Testament.

📅 Afore means beforehand
📜 The gospel was promised long before Jesus
🕯️ Prophets spoke of it in advance
📖 The holy scriptures are the Old Testament

## 👑 Made Of The Seed Of David

"Seed" means descendant, offspring carried forward through a bloodline.

This phrase ties Jesus to King David's royal family line.

The promised Messiah was expected to come from David's descendants, a promise stretching back centuries.

According to the flesh points to Jesus's full and real humanity.

👑 Seed means bloodline descendant
🏰 Jesus descends from King David
📜 This fulfills an old royal promise
📖 According to the flesh means truly human

## 👑 Jesus Christ Our Lord

"Lord" was a politically loaded word in the Roman Empire.

Caesar himself was often called lord by his subjects.

Calling Jesus Lord quietly placed him above any earthly ruler, including Caesar.

This was not a safe thing to say out loud in Rome.

👑 Lord was a title claimed by Caesar
✝️ Paul applies it to Jesus instead
⚠️ This was a bold, risky claim
📖 Jesus outranks every earthly ruler

## ⚡ Declared To Be The Son Of God With Power

This does not mean Jesus became God's Son at this moment.

He already was the Son before this happened.

"Declared" means publicly shown and proven, not newly created.

Power here points to the display of divine strength behind the proof.

⚡ Declared means proven, not newly made
✝️ Jesus was already the Son of God
💪 Power points to divine strength on display
📖 Proof, not origin, is what changed

## 🪦 By The Resurrection From The Dead

This phrase names the exact proof behind that declaration.

Jesus rising from death was the clearest possible sign of who he truly was.

No ordinary teacher comes back from the grave under his own power.

The empty tomb became Paul's strongest evidence for Jesus's divine identity.

🪦 Resurrection means rising from death
🔑 It proves Jesus's true identity
🚫 No ordinary teacher does this
📖 The empty tomb is Paul's strongest evidence

## 🎁 Grace And Apostleship

Grace means an unearned gift, something given freely with no payment required.

Paul links two gifts together here, saved by grace and sent as an apostle by grace.

Neither one was something Paul worked his way into.

Both came from God's free choice toward him.

🎁 Grace means an unearned gift
📯 Apostleship was also a gift, not a reward
🙅 Paul did not earn either one
📖 Both came from God's free choice

## 🌐 Obedience To The Faith Among All Nations

This phrase links two words that might seem opposite, obedience and faith.

True faith is never just a private feeling.

It shows up as a changed, obedient life.

Among all nations signals that this gospel was never meant for Israel alone.

🌐 Obedience and faith belong together
❤️ Faith always shows itself in action
🌏 All nations means every people group
📖 The gospel was never for Israel alone

## 🙋 The Called Of Jesus Christ

The word called here points to more than an invitation.

It describes God's effective summons that actually brings someone to faith.

The believers in Rome did not simply choose Christ on their own initiative.

They were called, and they responded.

🙋 Called means summoned, not merely invited
✝️ The call comes from Christ
🏛️ This describes the Roman believers
📖 God's summons leads to their response

## 💌 Beloved Of God, Called To Be Saints

"Saints" does not mean especially holy superstars.

It simply means people set apart as belonging to God.

Every believer in Rome, however ordinary, carried that title.

Being beloved of God came first, and being called saints followed from it.

💌 Beloved means deeply loved by God
🙏 Saints means set apart, not flawless
🏛️ Every believer in Rome held this title
📖 Love from God comes before the calling

## 🕊️ Grace To You And Peace

Paul blends two cultures into one greeting here.

Grace echoes the normal Greek letter greeting of his day.

Peace echoes the Hebrew word shalom, the standard Jewish greeting.

By combining them, Paul greets a church made up of both Jewish and Gentile believers.

🕊️ Grace reflects the Greek greeting
🤝 Peace reflects the Hebrew shalom
🏛️ Rome's church held both Jews and Gentiles
📖 One greeting welcomes everyone in the room

# Romans 1:8-13
# 🙏 Paul's Longing To Visit Rome
---
## 🙏 I Thank My God Through Jesus Christ

Paul does not pray straight to God without any mediator.

He prays through Jesus Christ, treating prayer itself as something made possible by Christ.

This becomes a pattern across all of Paul's letters.

Every prayer passes through the same open door.

🙏 Paul prays through Christ, not around him
🚪 Christ opens the way to pray
📜 This pattern repeats across Paul's letters
📖 Every believer's prayer passes through Jesus

## 🌍 Spoken Of Throughout The Whole World

This is not a literal claim about every continent on earth.

"The whole world" here means the known Roman world, the empire Paul and his readers lived inside.

Rome sat at the center of that world, connected by roads and trade routes to everywhere else.

News of a thriving church there would travel fast.

🌍 The whole world means the Roman world
🛣️ Rome connected to everywhere by roads and trade
📢 News from Rome spread quickly
📖 A church at the center gets noticed

## ✋ God Is My Witness

This is an oath formula, not a casual phrase.

No one else could verify Paul's private prayer life from the outside.

So Paul calls on God himself as the only witness who truly knows.

It is a serious claim, not a throwaway line.

✋ This is a formal oath, not small talk
👁️ Only God can see private prayer
🤝 Paul calls God as his witness
📖 A serious claim about a hidden life

## ⏳ Without Ceasing I Make Mention Of You

"Without ceasing" does not mean every single second.

It means steadily and repeatedly, a settled habit rather than a one time event.

Paul kept the Roman believers in his regular pattern of prayer.

They were never far from his mind.

⏳ Without ceasing means a steady habit
🔁 Not literally every second
💭 Rome stayed in Paul's regular thoughts
📖 Faithful prayer is repeated, not occasional

## 🛤️ A Prosperous Journey By The Will Of God

Paul wanted to visit Rome for years before writing this.

He frames the trip as something only God's will can grant, not his own planning.

Years later, Paul finally did reach Rome, but as a prisoner on trial, not as a free visitor.

God answered the prayer in a way Paul never expected.

🛤️ Paul longed to visit Rome
🙌 The trip depends on God's will
⛓️ He later arrived as a prisoner instead
📖 God answers prayer in unexpected ways

## 🎁 Impart Unto You Some Spiritual Gift

"Impart" means to share or give a portion of something.

Paul wanted to personally strengthen the Roman church through some spiritual gift he could bring them.

He does not specify exactly what gift he means here.

The goal was their growth, not his own credit.

🎁 Impart means to share a portion
💪 Paul wanted to strengthen the church
❓ The exact gift is not named
📖 Their growth was always the goal

## 🏗️ That Ye May Be Established

"Established" means made firm and stable, like a building on solid ground.

Paul's goal was not just to impress the Roman believers.

He wanted to leave them stronger and steadier in their faith than before.

A visit from Paul was meant to build them up, not just entertain them.

🏗️ Established means made firm and stable
🎯 Paul's goal was their strength, not applause
🏠 Faith was meant to be built up
📖 A visit was meant to leave them steadier

## 🤝 Comforted Together By The Mutual Faith

"Mutual" means shared by both sides equally.

Paul expected to receive encouragement from the Romans, not only to give it.

This flips the usual picture of an apostle only teaching down to a church.

Even Paul needed the faith of others to be strengthened.

🤝 Mutual means shared both ways
🔄 Paul expected to receive, not only give
👥 Even an apostle needs encouragement
📖 Faith strengthens in both directions

## 🔁 Oftentimes I Purposed To Come Unto You

"Oftentimes" means this was not a single failed plan.

Paul had repeatedly intended to visit Rome and repeatedly been unable to go.

This shows real, long standing desire rather than a passing thought.

🔁 Oftentimes means repeatedly, not once
📝 Paul kept planning this trip
⏰ The delay was not for lack of desire
📖 Long patience sat behind this letter

## 🚧 But Was Let Hitherto

"Let" in this verse is an old word trap.

Today let usually means allowed, but here it means hindered or blocked.

Paul is saying something stopped him, the opposite of permission.

"Hitherto" simply means up until this point in time.

🚧 Let here means hindered, not allowed
🔄 This is the opposite of its modern meaning
⏱️ Hitherto means up until now
📖 Something real blocked Paul's plans

# Romans 1:14-17
# 🔥 Not Ashamed Of The Gospel
---
## 💳 Debtor Both To The Greeks And To The Barbarians

A debtor owes something that must be repaid.

Paul says he owes the gospel to people, not money.

"Barbarians" in this context does not mean savage or uncivilized.

It simply meant anyone who did not speak Greek, a foreign language speaker from Rome's point of view.

💳 Debtor means something owed, not money
🗣️ Barbarians meant non Greek speakers
🌍 Paul owed the gospel to every culture
📖 No group was outside his debt

## 🎯 I Am Ready To Preach The Gospel

"As much as in me is" is an old way of saying to the best of my ability.

Paul is not promising something effortless.

He is promising full commitment with whatever strength he has.

🎯 Means giving full effort
💪 Paul commits his full strength
🤲 Readiness meant commitment, not ease
📖 The gospel deserves full effort

## 🏛️ To You That Are At Rome Also

Paul had already preached across much of the eastern Mediterranean world.

Rome was the capital of the empire and sat at the center of power.

"Also" shows Rome was not Paul's first stop, but it was never left out of his plan.

Reaching the capital mattered because the gospel was meant to reach every corner.

🏛️ Rome was the empire's capital
🗺️ Paul had already preached elsewhere first
➕ Also shows Rome was still included
📖 The gospel was meant for every corner

## 🛡️ Not Ashamed Of The Gospel

In the Roman world, crucifixion was a mark of shame, reserved for criminals and slaves.

A message centered on a crucified man could easily sound shameful to educated Roman ears.

Paul states plainly that he feels no shame about it at all.

This single line sets the tone for the entire letter.

🛡️ Crucifixion carried deep shame in Rome
✝️ The gospel centers on a crucified man
🙅 Paul refuses to feel ashamed
📖 This line sets the tone for Romans

## 💪 The Power Of God Unto Salvation

The gospel is not just information to think about.

Paul calls it power, something active and working, not passive.

Salvation here means rescue, being saved from real danger.

The good news does not simply describe rescue, it carries the power to perform it.

💪 Power means active, working strength
📰 The gospel is not mere information
🆘 Salvation means real rescue from danger
📖 This message actually performs the rescue

## 🥇 To The Jew First, And Also To The Greek

"First" here describes order, not an exclusive club.

The gospel reached the Jewish people before anyone else, following God's own promises to Israel.

"Also to the Greek" opens the door immediately afterward to every other nation.

First does not mean only.

🥇 First means order, not an only group
📜 Israel received the promise first historically
🌐 Greek represents every other nation here
📖 The door opens wide right after

## ⚖️ The Righteousness Of God Revealed

Righteousness means being right and just, fully in line with God's own standard.

This phrase does not describe a demand God makes of us first.

It describes something God reveals and gives through the gospel itself.

This single idea becomes the main subject of the whole letter of Romans.

⚖️ Righteousness means being fully right and just
🎁 This is revealed and given, not demanded first
📜 It becomes the theme of the whole letter
📖 Romans unpacks this one phrase for chapters

## 📜 The Just Shall Live By Faith

This exact line is quoted from the prophet Habakkuk, written centuries earlier.

"The just" means a person declared righteous before God.

Faith here means trust, not simply believing facts are true.

Centuries later, this verse became a key spark behind the Protestant Reformation.

📜 This line quotes the prophet Habakkuk
⚖️ The just means one declared righteous
🤲 Faith means trust, not bare facts
📖 This verse later sparked the Reformation

# Romans 1:18-23
# ⚡ The Wrath Of God Against Idolatry
---
## ⚡ The Wrath Of God Is Revealed

Wrath here does not mean an out of control temper.

It means God's settled, just response to sin, not a sudden emotional outburst.

"Is revealed" is present tense, describing something already unfolding, not only a future event.

Paul says this process is already happening in the world around him.

⚡ Wrath means settled justice, not a tantrum
⏳ Is revealed means happening now, not only later
🌍 Paul sees it already at work
📖 Judgment is a present process, not only future

## 🔒 Hold The Truth In Unrighteousness

"Hold" here does not mean simply possessing something.

It carries the sense of holding something down, suppressing it on purpose.

These people knew some truth about God but actively pushed it away.

This is willful suppression, not innocent ignorance.

🔒 Hold means suppress, not merely possess
🚫 They knew truth and pushed it down
🙈 This is willful, not innocent
📖 Suppressed truth still carries guilt

## 👁️ That Which May Be Known Of God Is Manifest In Them

"Manifest" means clearly shown, out in the open for anyone to see.

Paul claims a basic awareness of God is built into every person.

This is sometimes called general revelation, knowledge available before anyone opens a Bible.

No one starts out with a completely blank slate about God.

👁️ Manifest means clearly shown, not hidden
🧠 A basic awareness of God is built in
🚫 No one starts with a blank slate
📖 This is called general revelation

## 🌌 Clearly Seen By The Things That Are Made

Paul points to creation itself as a kind of evidence.

The order and design in the world point back to a maker.

"Eternal power and Godhead" means God's endless strength and divine nature.

Nature was never meant to stand alone as an accident.

🌌 Creation points back to its maker
💪 Eternal power means God's endless strength
👑 Godhead means his divine nature
📖 Design was never meant to look accidental

## 🚫 Without Excuse

This is a legal term, like a defense that fails to hold up in court.

Paul is saying no one can honestly claim total ignorance of God.

The evidence in creation was always available to see.

A failed defense still carries the full weight of the verdict.

🚫 Without excuse is a legal term
⚖️ No honest claim of total ignorance stands
🌍 The evidence was always available
📖 A failed defense still carries the verdict

## 🙇 Glorified Him Not As God

To glorify God means to give him the honor and worship he is due.

These people had some awareness of God but refused to treat him as God.

Neither were thankful points to a second failure, no gratitude for what they had received.

Knowledge without worship or thanks curdles quickly.

🙇 Glorify means to give proper honor
🚫 They knew God but refused him honor
🙅 They also failed to give thanks
📖 Knowledge without worship curdles fast

## 💭 Became Vain In Their Imaginations

"Vain" means empty or worthless, leading nowhere good.

"Imaginations" here means their reasoning and thinking, not daydreams.

Their thinking about God and the world became empty and twisted once they turned away from him.

Wrong thinking about God rarely stays contained to one subject.

💭 Vain means empty and worthless
🧠 Imaginations means reasoning, not daydreams
🌀 Their thinking twisted after turning from God
📖 Wrong thinking about God rarely stays contained

## 🌑 Their Foolish Heart Was Darkened

In Hebrew thought, the heart is the center of thinking and deciding, not just feeling.

A darkened heart means clouded judgment, not clouded emotion.

Foolish here is a moral word, not a comment on intelligence.

Rejecting what is known tends to spread and corrupt the rest of a person's thinking.

🌑 Heart means the center of thought and will
🌫️ Darkened means clouded judgment
🙄 Foolish is a moral word here
📖 Rejected truth corrupts the rest of the mind

## 🃏 Professing Themselves To Be Wise, They Became Fools

"Professing" means openly claiming, often in public.

The irony here is sharp, those claiming the most wisdom ended up the most foolish.

Self proclaimed wisdom without God quietly collapses on itself.

Real wisdom and godless confidence are not the same thing.

🃏 Professing means an open public claim
🔄 The claim to wisdom flips into folly
💨 Self made wisdom collapses on itself
📖 True wisdom cannot exist without God

## 🗿 Changed The Glory Of The Uncorruptible God Into An Image

"Uncorruptible" means incapable of decaying or dying, unlike everything else.

Paul lists the downgrade on purpose, man, then birds, then fourfooted beasts, then creeping things.

Each step trades something greater for something smaller and lower.

Idolatry always shrinks God down to fit something manageable.

🗿 Uncorruptible means incapable of decay
📉 Moves from high to low on purpose
🔽 Each swap trades greater for smaller
📖 Idolatry always shrinks God to fit

# Romans 1:24-27
# 🔄 God Gave Them Up
---
## 🔄 God Also Gave Them Up

"Gave them up" describes a judicial release, not a shrug of indifference.

This exact phrase repeats three times across this chapter, in verses 24, 26, and 28.

Each repetition marks another stage of the same downward pattern.

God's wrath here looks like stepping back, not only striking out.

🔄 Gave up means a judicial release
🔁 This phrase repeats three times in the chapter
📉 Each repeat marks another downward stage
📖 Wrath can look like stepping back

## 💔 To Dishonour Their Own Bodies

This phrase names a result, not the root cause.

The lusts of their own hearts came first, and this consequence followed after.

Dishonour means a loss of proper honor and value.

Sin's damage lands first and hardest on the sinner's own body.

💔 Dishonour means a loss of proper value
🔁 This is a result, not the cause
❤️‍🔥 The root was disordered desire
📖 Sin's damage lands on the sinner first

## 🤥 Changed The Truth Of God Into A Lie

This line summarizes the whole chapter's diagnosis of idolatry in one sentence.

Truth and lie stand directly opposed here, not just slightly different shades.

Idolatry is not merely a mistake, it is an active trade of truth for falsehood.

Something real gets exchanged for something false, on purpose.

🤥 Truth and lie stand fully opposed
🔁 Idolatry is a trade, not just an error
🎭 The exchange happens on purpose
📖 This line summarizes the chapter's diagnosis

## 🙏 Served The Creature More Than The Creator

"Creature" simply means anything created, not a monster.

Worship was built for the Creator alone, never for what he made.

Serving a creature instead of the Creator gets the order of the universe backward.

Paul adds a line of praise right after this as a quiet correction.

🙏 Creature means anything created, not a monster
🔄 Worship belongs to the Creator alone
🔃 This flips the true order backward
📖 Paul redirects praise back to God

## 🙌 Blessed For Ever

Paul interrupts his own sentence here with a burst of praise.

Even while describing humanity's worst idolatry, he cannot help pausing to honor God.

"Amen" follows right after, a word meaning let it be so, a note of firm agreement.

This short phrase reminds the reader who still deserves worship.

🙌 Paul interrupts himself with sudden praise
🛑 Even describing sin, he pauses to honor God
✅ Amen means let it be so
📖 A reminder of who still deserves worship

## ⚠️ Vile Affections

"Affections" here means strong desires or passions, not simple emotions.

"Vile" marks these desires as degrading, not just disapproved of casually.

Paul names this as a direct consequence of the idolatry already described.

One wrong turn tends to open the door to another.

⚠️ Affections means strong desires, not feelings
📉 Vile means degrading, not mildly disliked
🚪 This follows directly from idolatry
📖 One wrong turn opens the door to more

## 🔀 Against Nature

"Nature" here points to the created order God designed.

Paul describes both the women and the men in this verse abandoning that created design.

"Natural use" refers to the pattern built into creation from the beginning.

This phrase names a departure from that original design.

🔀 Nature means the created design itself
♀️ Both groups named abandon that design
🧩 Natural use means the original intended pattern
📖 This describes a departure from design

## ⚖️ That Recompence Of Their Error Which Was Meet

"Recompence" means a fitting payback or consequence.

"Meet" is an old word meaning fitting or appropriate, not related to food at all.

Paul is saying the consequence matched the choice that produced it.

Nothing here was random or excessive.

⚖️ Recompence means a fitting payback
🍽️ Meet means fitting, not food
🧮 The consequence matched the choice
📖 Nothing here was random

# Romans 1:28-32
# ⚖️ A Reprobate Mind And Its Fruit
---
## 🚫 Did Not Like To Retain God In Their Knowledge

"Did not like" points to an unwillingness, not an inability.

These people were capable of knowing God but chose not to hold onto that knowledge.

Retain means to keep and hold onto something, not merely notice it once.

This is rejection by choice, not a tragic accident.

🚫 Did not like means unwillingness, not inability
🧠 They could know God but chose otherwise
✋ Retain means to keep hold
📖 Rejection here was a choice, not an accident

## 🔧 A Reprobate Mind

"Reprobate" was originally a term for metal that failed a quality test and got rejected.

Applied to a mind, it means a mind that has stopped properly testing right from wrong.

God gave them over to that failed condition as a consequence, not a punishment he invented from nothing.

The mind itself became the instrument of further sin.

🔧 Reprobate originally described failed, rejected metal
🧠 A mind that fails its own tests
🔁 This is a consequence, not random punishment
📖 A failed mind becomes its own tool

## 🚫 Things Which Are Not Convenient

"Convenient" in this verse does not mean easy or handy.

It means fitting or proper, the opposite of what these behaviors actually are.

A reprobate mind starts approving things that do not fit how people were designed to live.

The word is another old trap, since its modern meaning is almost the opposite.

🚫 Convenient here means fitting, not easy
🔄 Modern convenient means almost the opposite
🧩 These behaviors do not fit human design
📖 Old words can quietly flip their meaning

## 📋 Filled With All Unrighteousness

This verse opens a long list of sins, not a vague mood.

Fornication means sexual sin outside marriage.

Covetousness means craving what belongs to someone else.

Malignity means a deep desire to harm other people.

Whisperers spread gossip and accusations in secret.

📋 A list of specific sins
🗣️ Gossip spreads through whisperers
💰 Covetousness craves what is not yours
📖 Vague labels become named sins here

## 🗣️ Haters Of God, Despiteful, Proud, Boasters

The list continues with heavier words.

Backbiters slander other people behind their backs.

Despiteful means a spiteful, contemptuous attitude.

Proud and boasters both exalt the self.

Disobedient to parents breaks the most basic family bond.

🗣️ Backbiters slander in secret
😤 Despiteful means spiteful contempt
👑 Pride and boasting exalt the self
📖 Family breakdown follows personal vice

## 🧩 Without Natural Affection, Implacable, Unmerciful

The list closes with its coldest words.

Without understanding means a lost sense of right and wrong.

Covenantbreakers are those who break their sworn word.

Without natural affection means a loss of normal family love.

Implacable and unmerciful both mean refusing mercy.

🧩 Lost sense of right and wrong
💔 Lost natural love for family
🧊 Refusing mercy and reconciliation
📖 This list ends in total coldness

## ⚰️ Worthy Of Death

This is a legal and moral verdict, not simply Paul's personal opinion.

"Knowing the judgment of God" shows these people were not confused about right and wrong.

They understood the seriousness of what they were doing and continued anyway.

Clear knowledge makes the choice heavier, not lighter.

⚰️ Worthy of death is a legal verdict
🧠 They understood the judgment already
🚶 They continued despite that knowledge
📖 Clear knowledge makes guilt heavier

## 👏 Have Pleasure In Them That Do Them

This final line adds a second group to the first.

It is not only those who commit these sins who are guilty.

Those who approve of and enjoy watching others commit them share that same guilt.

Cheering on sin from the sidelines is not a safe, neutral position.

👏 A second group appears here, the approvers
🙋 Approving sin shares in its guilt
🪑 Watching from the sidelines is not neutral
➡️ Chapter one ends on a universal verdict
`.trim();

export const ROMANS_ONE_PERSONAL_SECTIONS = parseRomansOneRawNotes(ROMANS_ONE_RAW_NOTES);
