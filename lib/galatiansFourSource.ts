export type GalatiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansFourRawNotes(rawText: string): GalatiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 4:${startVerse}` : `Galatians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Galatians 4 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_FOUR_RAW_NOTES = `# Galatians 4:1-7
# 👨‍👦 From Servant To Son
---
## 👶 The Heir Differeth Nothing From A Servant

An heir here means a child who will one day own everything his father has.

But until he grows up, his daily life looks no different from a servant's life.

He eats the same food, follows the same rules, and answers to the same people.

The ownership is real but it is not yet active.

👶 Heir means the future owner

🧹 His daily life looks like a servant's

🧾 Ownership exists before it is active

📖 Paul will use this to describe us

## 👑 Though He Be Lord Of All

The child already owns everything by right, even though he cannot use any of it yet.

Nothing is missing from his future inheritance.

Only the timing is missing.

Paul wants the Galatians to feel that same tension before he explains why it matters.

👑 He already owns everything by right

🧩 Nothing is missing from the inheritance

⏳ Only the timing is missing

📖 Paul builds tension before the explanation

## 🧑‍🏫 Under Tutors And Governors

"Tutors" and "governors" were not teachers in a classroom.

They were household managers a father appointed to raise and guard his heir until he was grown.

These men had real authority over the child.

That authority never belonged to them permanently.

A son living under them still looked like someone being controlled.

Not yet like someone who owned anything.

🧑‍🏫 Tutors and governors were household guardians

🛡️ They guarded the heir, not owned him

⏳ Their authority was real but temporary

📖 Control for a season, not forever

## 📅 Until The Time Appointed Of The Father

The father sets the date, not the child.

A son cannot speed up his own coming of age no matter how ready he feels.

Paul uses this detail to describe God's own timeline for sending Christ.

God alone decided when the world was ready.

📅 The father sets the date

🧑 The child cannot speed up the date

✝️ God set His own timeline this way

📖 God decided when the world was ready

## 🧒 When We Were Children, We Were In Bondage

"Children" here does not just mean young in age.

It means spiritually immature, unable yet to receive the fulness of the promise.

Paul includes himself in this word, we.

Everyone, Jew and Gentile alike, once lived in this same immature state.

🧒 Children means spiritually immature here

🔒 Immaturity kept everyone in bondage

🤝 Paul includes himself in this word

📖 Jew and Gentile shared this state

## 🔤 Under The Elements Of The World

"Elements" pictures the basic building blocks of something, like letters before words.

It describes elementary religious rules that only prepare a person for something greater.

These rules were never meant to be the final lesson.

They were the alphabet, not the whole book.

🔤 Elements means basic building blocks

📏 These were elementary religious rules

📚 They prepared people for something greater

📖 The alphabet, not the whole book

## ⏳ When The Fulness Of The Time Was Come

God had been counting toward this exact moment the entire time.

Nothing about the timing of Christ's coming was random or rushed.

History, politics, and prophecy all converged at once.

God moves history toward a point, not just through it.

⏳ God counted toward this exact moment

🌍 History and prophecy converged together

🎯 Nothing about the timing was random

📖 God moves history toward a point

## 👶 God Sent Forth His Son, Made Of A Woman

"Made of a woman" insists that God's Son became fully human.

He was not a vision or a message appearing from nowhere.

He had a real mother and a real birth, like every other human being.

This detail protects the real, physical nature of the incarnation.

👶 Made of a woman means fully human

🤱 He had a real mother, a real birth

🛡️ This protects the incarnation itself

📖 God's Son entered human history for real

## ⚖️ Made Under The Law

This does not mean Jesus was ever guilty of breaking the law.

It means He placed Himself fully under its requirements.

The very law that condemned humanity now had authority over Him too.

He entered the system He came to free people from.

⚖️ Made under the law means fully subject

🚫 Not guilty, but still under its weight

🔓 He entered the system to free us

📖 Christ submitted to what condemned us

## 💰 To Redeem Them That Were Under The Law

"Redeem" is a word from the slave market, the same word used earlier in this letter.

It means a price was paid to legally free someone from captivity.

Christ's death was that price, paid specifically for those trapped under the law.

Freedom here was bought, not simply announced.

💰 Redeem means a price paid in full

⛓️ It frees someone from captivity

✝️ Christ's death was that exact price

📖 Freedom was bought, not just announced

## 📜 That We Might Receive The Adoption Of Sons

"Adoption" in the Roman world was a formal, legal act.

An adopted son gained every right of a natural born son, including the full inheritance.

Old debts and old family ties were legally erased at adoption.

Paul uses this exact legal picture to describe what happens to every believer.

📜 Adoption was a formal legal act

👨‍👩‍👧 Adopted sons gained full inheritance rights

🧾 Old debts were legally erased

📖 This pictures what happens to believers

## 👶 The Spirit Of His Son Into Your Hearts, Crying, Abba, Father

"Abba" is an intimate Aramaic word a small child used for a father.

It is not a formal or distant title.

The Spirit Himself is the one crying out this word inside the believer.

This is not forced politeness but a close family bond given from the inside.

👶 Abba is an intimate word for father

🗣️ The Spirit cries this out within us

❤️ This is closeness, not formal distance

📖 Family bond is given from inside

## 🔄 No More A Servant, But A Son

The legal status has fully changed, not just the feeling.

A servant can be dismissed.

A son never loses his place in the family.

Paul wants this change to feel as solid as it legally is.

Identity, not performance, now defines the relationship.

🔄 Status has changed, not just the feeling

🏠 A son never loses his place

🆔 Identity now defines the relationship

📖 This change is legal, not just emotional

## 👑 An Heir Of God Through Christ

Every believer now holds the same legal standing Christ holds as Son.

The inheritance is not earned labor but a shared family right.

This closes the opening question of the whole chapter.

The child who once differed nothing from a servant now owns everything through Christ.

👑 Every believer shares Christ's standing

🎁 The inheritance is a family right

🔁 This answers the chapter's opening question

📖 The servant now owns everything

# Galatians 4:8-11
# 🔙 Turning Back To Weak Elements
---
## 🗿 Ye Did Service Unto Them Which By Nature Are No Gods

Before Christ, the Galatians worshiped idols that held no real power at all.

"By nature are no gods" means these idols were never gods to begin with.

Paul reminds them plainly where they started before judging where they are headed.

Their old worship cost them real devotion for nothing in return.

🗿 Idols held no real power at all

❌ By nature means never truly gods

🔁 Paul reminds them of their start

📖 Old worship gave nothing back

## ✍️ After That Ye Have Known God, Or Rather Are Known Of God

Paul quickly corrects his own sentence as he says it.

Knowing God sounds like something the Galatians achieved on their own.

Being known by God puts the emphasis back on God's initiative.

The relationship always started on His side first.

✍️ Paul corrects his own sentence here

🙋 Knowing God sounds self achieved

🙏 Known by God shows His initiative

📖 The relationship started on His side

## 💪 How Turn Ye Again To The Weak And Beggarly Elements

"Weak" means powerless to actually change anyone on the inside.

"Beggarly" means poor, with nothing real to offer.

Paul is stunned that anyone would trade a rich gift for empty rules.

These elements can describe behavior but cannot transform a life.

💪 Weak means powerless to change anyone

🪙 Beggarly means poor, with nothing real

😮 Paul is stunned by the trade

📖 Rules cannot transform a life

## ❓ Whereunto Ye Desire Again To Be In Bondage

The most puzzling part of this verse is the word desire.

Nobody forced the Galatians back toward these rules.

They were choosing slavery as if it were an upgrade.

Paul names the strangeness of that choice out loud.

❓ Desire is the strangest word here

🚫 Nobody forced them back toward rules

⬇️ They chose slavery as an upgrade

📖 Paul names the strangeness out loud

## 📅 Ye Observe Days, And Months, And Times, And Years

This lists a religious calendar of special days and festivals.

Keeping it was becoming a way to earn favor with God through routine.

Paul is not against calendars themselves.

He is against trusting a calendar to do what only grace can do.

📅 This lists a religious calendar

🏆 Keeping it felt like earning favor

🙅 Paul is not against calendars themselves

📖 Only grace can do grace's job

## 😟 I Am Afraid Of You, Lest I Have Bestowed Upon You Labour In Vain

Paul names his own fear directly instead of hiding it.

"Bestowed labour" points back to his months of teaching and personal risk among them.

"In vain" means all of it could turn out worthless.

His fear is personal, not just theological disappointment.

😟 Paul names his own fear directly

🛠️ Bestowed labour means his months of work

💨 In vain means worthless in the end

📖 This fear is personal, not abstract

# Galatians 4:12-16
# 💔 Where Is The Blessedness
---
## 🔄 Be As I Am, For I Am As Ye Are

Paul is not asking them to become Jewish like he once was.

He means the opposite, he became free from the law the way they once were.

He gave up his old privileges to meet them exactly where they stood.

Now he begs them not to walk backward into what he already left.

🔄 Paul means becoming free, not Jewish

🎁 He gave up his old privileges

🚶 He met them where they stood

📖 He begs them not to reverse it

## 🙅 Ye Have Not Injured Me At All

Paul removes any suspicion that this letter is about a personal grudge.

This is not wounded pride talking.

Whatever is wrong here is about truth, not Paul's feelings.

He clears that question before pressing his real concern.

🙅 This is not a personal grudge

💔 Not wounded pride talking here

🎯 The real issue is truth

📖 Paul clears this before his real point

## 🤒 Through Infirmity Of The Flesh I Preached The Gospel Unto You At The First

"Infirmity of the flesh" points to a real physical illness Paul had on his first visit.

Many scholars believe this may connect to the thorn in the flesh Paul mentions elsewhere.

The gospel did not arrive through an impressive messenger.

It arrived through a weak and struggling one instead.

🤒 Infirmity points to a real illness

📜 This may connect to his thorn elsewhere

🙋 The messenger was weak, not impressive

📖 The gospel still arrived through him

## ⚠️ My Temptation Which Was In My Flesh Ye Despised Not, Nor Rejected

"Temptation" here means a trial or hardship, not a tempting sin.

A weak and sickly preacher could easily have been laughed out of town.

Instead, the Galatians chose compassion over contempt.

Their first response to Paul was love, not judgment.

⚠️ Temptation here means hardship, not sin

😔 He could have been easily rejected

❤️ They chose compassion over contempt

📖 Their first response was love

## 👼 Received Me As An Angel Of God, Even As Christ Jesus

This was the highest possible honor one person could give another.

They treated Paul's weak and sickly body as if God Himself had sent a messenger.

That level of welcome makes their later coldness even harder to understand.

Paul is reminding them how far they have drifted.

👼 This was the highest possible honor

🙇 They welcomed him as God's own messenger

❄️ Their coldness now is hard to understand

📖 Paul shows them how far they drifted

## ❓ Where Is Then The Blessedness Ye Spake Of?

Paul asks what happened to the joy they once felt together.

Something real existed between them once, not just an idea.

That joy has clearly gone missing now.

Paul wants them to feel the loss before he explains why it happened.

❓ Paul asks what happened to their joy

💞 Something real existed between them once

📉 That joy has clearly gone missing

📖 He wants them to feel the loss

## 👁️ Ye Would Have Plucked Out Your Own Eyes, And Have Given Them To Me

This is an extreme exaggeration meant to show the depth of their earlier devotion.

Some scholars believe Paul struggled with his own eyesight here.

That would make this exaggeration even sharper.

Either way, the Galatians once would have given up something precious for Paul's sake.

That kind of love is now nowhere to be found.

👁️ This exaggerates their earlier devotion

🤔 Paul may have struggled with his eyesight

🎁 They once gave up something precious

📖 That love is nowhere to be found now

## 🗣️ Am I Therefore Become Your Enemy, Because I Tell You The Truth?

Telling the truth should never be the thing that costs a friendship.

Paul points out the strange logic of punishing honesty with distance.

Something has clearly twisted their sense of who the real enemy is.

The false teachers, not Paul, are the ones working against them.

🗣️ Truth should not cost a friendship

🔀 Their sense of enemy is twisted

🎯 The false teachers are the real threat

📖 Honesty should never be punished like this

# Galatians 4:17-20
# 🔥 Jealous For You
---
## 🔥 They Zealously Affect You, But Not Well

"Zealously affect" means to pursue someone with intense, eager attention.

The false teachers are not lazy or uninterested in the Galatians.

Their energy is real.

Their purpose behind it is corrupt.

Zeal by itself is not proof that something is good.

🔥 Zealously affect means intense eager pursuit

⚠️ Their energy is real but corrupt

❌ Zeal alone does not prove good

📖 Motive matters more than energy

## ✂️ They Would Exclude You, That Ye Might Affect Them

This is not about excluding the Galatians from the church entirely.

It means cutting them off from Paul and his influence specifically.

The goal was control, pulling the Galatians toward loyalty to these new teachers.

Isolating someone from their first teacher is an old and effective tactic.

✂️ This means cutting them off from Paul

🎯 The real goal was control

🧲 They wanted loyalty pulled toward themselves

📖 Isolating a student is an old tactic

## 🔥 It Is Good To Be Zealously Affected Always In A Good Thing

Paul is not against passion or intensity itself.

He is against passion aimed at the wrong target.

Good zeal stays steady, not just when someone important is watching.

The test of real zeal is whether it holds up when the crowd is gone.

🔥 Paul is not against passion itself

🎯 He is against passion aimed wrongly

⏰ Good zeal stays steady, always

📖 Real zeal holds up unwatched

## 🤰 My Little Children, Of Whom I Travail In Birth Again

"Travail" describes the pain of labor, the hard work of childbirth.

Paul already went through this pain once when the Galatians first believed.

Now their drift back toward the law forces him through that same labor again.

He is not scolding from a distance, he is suffering with them.

🤰 Travail means the pain of labor

🔁 Paul already went through this once

😣 Their drift forces this pain again

📖 He suffers with them, not above them

## 🎯 Until Christ Be Formed In You

Paul's goal was never agreement with his own opinions.

He wanted Christ's own character actually shaped inside each believer.

That shaping is not finished the moment someone first believes.

It is the ongoing labor Paul describes as his own personal travail.

🎯 The goal was never Paul's opinions

✝️ Christ's character shapes each believer

⏳ This shaping is never instantly finished

📖 Paul calls this his own travail

## 🗣️ I Desire To Be Present With You Now, And To Change My Voice

"Change my voice" likely means shifting tone, from a hard written rebuke to a gentler spoken appeal.

Paul knows that written words alone can sound harsher than he intends.

Being there in person would let him soften the delivery without softening the truth.

Tone can carry as much weight as the words themselves.

🗣️ Change my voice means shifting tone

📝 Written words can sound harsher than meant

🤝 Being present softens delivery, not truth

📖 Tone can carry real weight

## ❓ I Stand In Doubt Of You

Paul admits real uncertainty about how this will end.

Even an apostle does not always know how a hard conversation will land.

This honesty makes his earlier appeals feel even more genuine.

Confidence in the gospel does not require pretending to feel certain about people.

❓ Paul admits real uncertainty here

🙋 Even an apostle feels unsure sometimes

💯 This honesty makes him feel genuine

📖 Certainty in truth, not in outcomes

# Galatians 4:21-27
# 👪 Hagar And Sarah, Two Covenants
---
## 👂 Tell Me, Ye That Desire To Be Under The Law, Do Ye Not Hear The Law?

Paul is not asking if they have read the law's commands before.

He is asking if they have ever really listened to what the law's own story teaches.

The people demanding law keeping are about to be shown a story from their own scripture.

Paul turns their favorite book against their current argument.

👂 Hear the law means truly listen

🔄 Their own book argues against them

🎯 Paul turns the law on itself

📖 A story is about to prove his point

## 👩 Abraham Had Two Sons, The One By A Bondmaid, The Other By A Freewoman

The bondmaid is Hagar, Sarah's servant, mother of Ishmael.

The freewoman is Sarah herself, mother of Isaac, the promised son.

Paul does not need to name them because his readers already know the story.

Two mothers, two sons, two very different beginnings.

👩 The bondmaid is Hagar, mother of Ishmael

👰 The freewoman is Sarah, mother of Isaac

📚 Readers already knew this family story

📖 Two sons, two very different beginnings

## 💪 He Who Was Of The Bondwoman Was Born After The Flesh

"After the flesh" means born through ordinary human effort and planning.

Ishmael came from Sarah and Abraham's own scheme to force the promise along early.

Nothing about his birth required God to step in and act.

Human effort alone was enough to produce this son.

💪 After the flesh means human effort

🧠 Ishmael came from a human scheme

🙅 God did not need to intervene

📖 Effort alone produced this son

## 🙏 He Of The Freewoman Was By Promise

"By promise" means Isaac's birth required God to act in a way nature alone never could.

Sarah was long past the age of having children when Isaac was born.

Only God's own word made that birth possible.

Promise, not planning, produced this son.

🙏 By promise means only God could act

👵 Sarah was long past childbearing age

✨ God's word made the birth possible

📖 Promise, not planning, produced this son

## 🎭 Which Things Are An Allegory

"Allegory" means a story that carries a second, deeper meaning underneath the plain one.

Paul is not denying that Hagar, Sarah, Ishmael, and Isaac were real, historical people.

He is saying their real story also pictures something larger happening right now.

The history is true and it also teaches.

🎭 Allegory means a story with deeper meaning

✅ The people and events were still real

🔍 Their story pictures something larger now

📖 History can be true and teach too

## 👩 For These Are The Two Covenants

Each mother in the old story now stands for an entire system of relating to God.

One covenant tries to earn standing through law keeping.

The other covenant receives standing as a pure gift.

Paul has turned a family story into a map of two religions.

👩 Each mother stands for a covenant

⚖️ One covenant tries to earn standing

🎁 The other receives standing as a gift

📖 A family story becomes a map

## 🏔️ The One From The Mount Sinai, Which Gendereth To Bondage, Which Is Agar

Agar is simply another spelling of Hagar, the bondwoman from Genesis.

Mount Sinai is where Moses received the law.

Paul links Hagar directly to the law given at Sinai.

Both, Paul argues, lead to the same place, bondage.

🏔️ Sinai is where Moses received the law

👩 Agar is another spelling of Hagar

🔗 Paul links Hagar directly to Sinai

📖 Both lead toward bondage

## 🔗 This Agar Is Mount Sinai In Arabia, And Answereth To Jerusalem Which Now Is

"Answereth to" means corresponds to, or matches up with.

Paul connects Sinai, Hagar, and the earthly city of Jerusalem into one single picture.

The physical Jerusalem of Paul's own day was still operating under the law given at Sinai.

All three point to the same system, not three separate ideas.

🔗 Answereth to means corresponds with

🏙️ Earthly Jerusalem still operated under Sinai's law

🧩 Three images form one single picture

📖 One system, not three separate ideas

## 🔒 Is In Bondage With Her Children

Everyone living under this law centered system shares the same captive condition.

This is not an insult aimed at one city or one group of people.

It describes an entire way of relating to God that cannot free anyone.

Bondage here is structural, built into the system itself.

🔒 Everyone under this system is captive

🙅 This is not an insult at one group

🏗️ Bondage is built into the system

📖 The system itself cannot free anyone

## 🌌 Jerusalem Which Is Above Is Free

This Jerusalem is not a city on a map.

It describes the heavenly reality believers belong to right now through faith.

Freedom defines this city the way bondage defined the earthly one.

Citizenship here is never earned through law keeping.

🌌 This Jerusalem is not on a map

🗽 Freedom defines this heavenly city

🏛️ Believers belong here through faith

📖 Citizenship here is never earned

## 👪 Which Is The Mother Of Us All

Paul gives every believer a new, shared point of origin.

Bloodline, nationality, and law keeping have nothing to do with this family.

Every believer, no matter where they started, traces their identity back to this one mother.

The allegory lands exactly where Paul wanted it to land.

👪 Every believer shares one new origin

🧬 Bloodline has nothing to do with it

🌍 This mother claims every believer equally

📖 The allegory lands exactly here

## 📜 Rejoice, Thou Barren That Bearest Not

Paul quotes a promise originally spoken through the prophet Isaiah.

"Barren" describes a woman unable to have children, a source of deep shame in that culture.

This line pictures Sarah, who waited decades for a promised son who seemed impossible.

Paul applies the same unlikely joy to the Galatian believers now.

📜 Paul quotes the prophet Isaiah here

😔 Barren carried deep shame in that culture

👵 This pictures Sarah's long impossible wait

📖 Unlikely joy now belongs to believers

## 🔄 The Desolate Hath Many More Children Than She Which Hath An Husband

This sounds backward by every normal measure of family and childbearing.

The woman who looked abandoned ends up with more children than the one who looked secure.

Paul uses this reversal to describe how grace outproduces human effort every time.

The ones who looked left out of the covenant turn out to be its biggest family.

🔄 This reversal sounds backward at first

👨‍👩‍👧 The abandoned woman gains the most children

🎁 Grace outproduces human effort every time

📖 The left out become the biggest family

# Galatians 4:28-31
# 🚪 Cast Out The Bondwoman
---
## ✅ Now We, Brethren, As Isaac Was, Are The Children Of Promise

Paul finally applies the whole allegory directly to his readers.

Every believer now shares Isaac's exact identity, a child born from promise, not effort.

This is not a comparison anymore, it is a direct identification.

The ancient story becomes the Galatians' own story.

✅ Paul applies the allegory directly now

👶 Believers share Isaac's exact identity

🔗 This is identification, not just comparison

📖 The ancient story becomes their story

## 👦 He That Was Born After The Flesh Persecuted Him That Was Born After The Spirit

Genesis records Ishmael mocking young Isaac, an early sign of this exact tension.

The one relying on human effort resented the one who simply received a gift.

That old family conflict becomes a pattern that repeats far beyond that one household.

Jealousy often grows fastest toward a gift someone did not earn.

👦 Genesis records Ishmael mocking Isaac

💪 Human effort resented the unearned gift

🔁 This conflict becomes a repeating pattern

📖 Jealousy grows fastest toward unearned gifts

## 👉 Even So It Is Now

Paul points straight at his own moment in Galatia.

The false teachers pushing law keeping are playing Ishmael's old role all over again.

The believers trusting grace alone are playing Isaac's role.

Ancient family conflict and current church conflict share the exact same shape.

👉 Paul points at his own moment

🔁 False teachers repeat Ishmael's old role

🙏 Grace believers repeat Isaac's role

📖 Ancient and current conflict share one shape

## 📜 Cast Out The Bondwoman And Her Son

This line quotes Sarah's own demand to Abraham back in Genesis.

It sounds harsh taken on its own.

Paul is not using it to command cruelty toward any actual person.

He uses it to insist that law based religion cannot share a house with grace.

📜 This quotes Sarah's demand in Genesis

😬 It sounds harsh taken alone

🙅 Paul is not commanding real cruelty

📖 Law religion cannot share a house with grace

## ⚖️ The Son Of The Bondwoman Shall Not Be Heir With The Son Of The Freewoman

Two systems cannot both receive the same inheritance at the same time.

Trying to mix law keeping and grace does not blend them into something better.

One of them has to give way completely.

Paul insists that grace alone holds the inheritance.

⚖️ Two systems cannot share one inheritance

🚫 Mixing law and grace does not work

⚠️ One system must give way completely

📖 Grace alone holds the inheritance

## 🏁 So Then, Brethren, We Are Not Children Of The Bondwoman, But Of The Free

"But of the free" lands the whole chapter's argument in one final line.

Identity, not effort, decides where a believer belongs.

The chapter opened with a child indistinguishable from a servant.

It closes with that same child standing fully free, fully a son.

🏁 This line lands the whole argument

🆔 Identity decides where believers belong

🔓 The chapter closes on full freedom

📖 Servant becomes son, fully free
`.trim();

export const GALATIANS_FOUR_PERSONAL_SECTIONS = parseGalatiansFourRawNotes(GALATIANS_FOUR_RAW_NOTES);
