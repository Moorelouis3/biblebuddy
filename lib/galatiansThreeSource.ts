export type GalatiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansThreeRawNotes(rawText: string): GalatiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 3:${startVerse}` : `Galatians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Galatians 3 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_THREE_RAW_NOTES = `# Galatians 3:1-5
# 🪄 Bewitched By False Teachers
---
## 😵 O Foolish Galatians

"Foolish" here does not mean stupid or slow.

The word points to failing to use the mind God gave you.

Paul is saying the Galatians stopped thinking clearly about what they already knew.

They had heard the true gospel and were now acting as if they never understood it.

😵 Foolish means failing to think clearly

🧠 Not the same as stupid

📖 They already knew the true gospel

➡️ Paul calls them back to their senses

## 🪄 Who Hath Bewitched You

"Bewitched" pictures someone casting a magic spell over another person.

Paul chooses this strong word on purpose.

False teachers had crept in after Paul left and started changing the gospel.

Their teaching worked like a spell, clouding minds that once saw the truth clearly.

🪄 Bewitched pictures a magic spell

🎯 Paul chooses this word on purpose

🕵️ False teachers crept in after Paul left

📖 Their teaching clouded clear minds

## 👁️ Jesus Christ Hath Been Evidently Set Forth, Crucified Among You

"Evidently set forth" means publicly displayed in plain view.

Paul preached the cross so clearly it felt like watching the crucifixion happen in front of them.

Public executions in that world were often announced on a written notice naming the charge.

Paul's preaching worked the same way, naming exactly what Christ's death accomplished.

👁️ Evidently set forth means displayed in plain view

🪧 Preaching worked like a public notice

✝️ The cross was described in vivid detail

📖 Nothing about it was hidden or vague

## 🕊️ Received Ye The Spirit

Receiving the Spirit marked the actual moment someone became a believer.

Paul asks about something the Galatians could remember with certainty.

It was not a vague feeling but a real, known event in their own experience.

Paul appeals to their own story before making his argument.

🕊️ Receiving the Spirit marked conversion

🙋 It was a real, known event

🧠 Paul appeals to their own memory

📖 Experience itself becomes evidence here

## ⚖️ By The Works Of The Law, Or By The Hearing Of Faith

"Works of the law" means earning standing with God through obedience to its commands.

"Hearing of faith" means simply trusting the message Paul preached.

This one question is what the whole chapter will answer.

Only one of these two actually produced the Spirit in their lives.

⚖️ Works of the law means earning standing

👂 Hearing of faith means simply trusting

🎯 Only one path actually worked

📖 The Spirit came through faith alone

## 🏗️ Having Begun In The Spirit, Are Ye Now Made Perfect By The Flesh

"Began in the Spirit" names how their new life with God actually started.

"Made perfect by the flesh" means trying to finish that life through law keeping and effort.

Paul pictures them starting to build one way and switching methods halfway through.

Paul finds the switch absurd, not just risky.

🏗️ They began one way, in the Spirit

🔁 Now they try to switch methods

💪 Made perfect by flesh means human effort

📖 Paul finds the switch absurd

## 😣 Have Ye Suffered So Many Things In Vain

"Suffered" likely points to real persecution the Galatians faced for believing the gospel.

Paul asks whether all of that was for nothing.

Abandoning the true gospel now would make their earlier suffering pointless.

He still holds out hope their answer could be no, that it was not in vain.

😣 Suffered points to real persecution faced

❓ Paul asks if it was wasted

⚠️ Abandoning the gospel makes it pointless

📖 Paul still holds out hope

## 🙌 He Therefore That Ministereth To You The Spirit

"Ministereth" means continually supplies, not a one time gift already finished.

God kept giving the Spirit to the Galatians again and again.

This was an ongoing relationship, not a single transaction in the past.

Paul points to something still happening among them right now.

🙌 Ministereth means continually supplies

🔁 God kept giving, again and again

⏳ This was ongoing, not one time

📖 It was still happening right now

## ✨ Worketh Miracles Among You

God backed the true gospel with visible, undeniable acts of power.

These were not quiet, private experiences only one person could confirm.

The whole community had watched these miracles happen in plain sight.

Paul treats this as hard evidence, not a matter of opinion.

✨ Miracles were visible and undeniable

👥 The whole community witnessed them

🔍 This was evidence, not opinion

📖 God himself backed the true gospel

## 🔂 Doeth He It By The Works Of The Law, Or By The Hearing Of Faith

Paul repeats the exact question from verse two on purpose.

Repetition was a common teaching tool in arguments like this one.

He wants the answer to sink in a second time before moving on.

The Galatians already know the right answer from their own experience.

🔂 Paul repeats the question on purpose

🗣️ Repetition was a common teaching tool

🎯 He wants the answer to sink in

📖 Their own experience already answers it

# Galatians 3:6-9
# 📜 Abraham Believed God
---
## 🤝 Even As Abraham Believed God

Paul suddenly shifts his argument from the Galatians to Abraham himself.

This quotes Genesis, where Abraham trusted God's promise long before the law existed.

Abraham had nothing but God's own word to stand on.

Paul uses the oldest, most respected example in Jewish history to make his point.

🤝 Paul shifts the focus to Abraham

📜 This quotes Genesis directly

🗣️ Abraham had only God's word to stand on

📖 He uses history's oldest example

## 📒 And It Was Accounted To Him For Righteousness

"Accounted" is a word from bookkeeping and ledgers.

It means something was credited to Abraham that he did not earn by work.

God counted Abraham's trust itself as right standing, not his actions.

This is the exact pattern Paul says now applies to the Galatians too.

📒 Accounted is a bookkeeping word

💳 Trust was credited, not earned

🙏 God counted faith as righteousness

📖 The same pattern applies today

## 👪 They Which Are Of Faith, The Same Are The Children Of Abraham

Paul redefines who actually counts as Abraham's family.

Physical descent from Abraham is not what this verse is about.

Anyone who trusts God the way Abraham did belongs to that same family.

This was a bold claim for Jewish readers who assumed bloodline settled the question.

👪 Abraham's family is redefined here

🧬 Bloodline is not the real marker

🙏 Faith like Abraham's is the marker

📖 This claim challenged old assumptions

## 🔮 The Scripture, Foreseeing That God Would Justify The Heathen Through Faith

"Foreseeing" means scripture already looked ahead to something not yet visible.

"The heathen" simply means the Gentiles, people outside the Jewish nation.

The promise to Abraham already had Gentiles in view, long before Christ came.

God's plan to include them was never a late addition.

🔮 Foreseeing means scripture saw ahead

🌍 Heathen means the Gentile nations

📜 Gentiles were always part of the plan

📖 This was never a late addition

## 📣 Preached Before The Gospel Unto Abraham

"Preached before" means announced ahead of time, long before Christ walked the earth.

Paul makes a bold claim that Abraham actually heard a form of the gospel.

The promise itself carried good news inside it from the very start.

Abraham believed a preview of the same gospel Paul now preaches.

📣 Preached before means announced ahead of time

⏳ Abraham heard a preview of it

🎁 Good news was inside the promise

📖 Abraham believed the same gospel

## 🌍 In Thee Shall All Nations Be Blessed

This line quotes God's original promise to Abraham in Genesis.

"All nations" was always meant to reach far beyond Abraham's own family line.

The blessing was global from the moment it was first spoken.

Paul uses this one line to prove Gentile inclusion was God's plan all along.

🌍 All nations points beyond one family

🗣️ This quotes God's original promise

🎁 The blessing was global from the start

📖 Gentile inclusion was always the plan

## 🙏 So Then They Which Be Of Faith Are Blessed With Faithful Abraham

Paul lands his conclusion after building the case verse by verse.

"Faithful Abraham" became a kind of title, a name people respected.

Anyone who trusts God today shares that same blessing with him.

The blessing was never locked inside one bloodline or one nation.

🙏 Paul lands his conclusion here

🏷️ Faithful Abraham became a respected title

🤝 Believers share his blessing today

📖 The blessing was never locked to one line

# Galatians 3:10-14
# ⚖️ Redeemed From The Curse
---
## ⛓️ As Many As Are Of The Works Of The Law Are Under The Curse

Trying to be made right with God by keeping the law puts a person under its curse.

This sounds backward until Paul explains why in the next line.

The law demands something no one can actually deliver.

Relying on law keeping for righteousness guarantees failure, not safety.

⛓️ Law keeping puts a person under curse

❓ This sounds backward at first

💪 The law demands perfect obedience

📖 Relying on it guarantees failure

## 📜 Cursed Is Every One That Continueth Not In All Things Written In The Law

Paul quotes Deuteronomy directly to prove his point.

"Continueth not in all things" sets the bar at total, unbroken obedience.

Breaking even one command anywhere in the law brings the full curse.

No one in history has ever kept that standard perfectly.

📜 Paul quotes Deuteronomy here

💯 The bar is total obedience

⚠️ One broken command brings the curse

📖 Nobody has ever kept it perfectly

## ❌ No Man Is Justified By The Law In The Sight Of God

Paul states the obvious conclusion from the quote he just gave.

Perfect obedience was required, and no one has ever achieved it.

So the law cannot make anyone right with God.

"It is evident" means Paul treats this as already proven, not a new claim.

❌ The law cannot justify anyone

🧮 Perfect obedience was never achieved

✅ Paul treats this as already proven

📖 The math does not work

## 🙏 The Just Shall Live By Faith

This line quotes the prophet Habakkuk from the Old Testament.

"The just" means the person who stands right before God.

Their life and standing rest on faith, not law keeping.

This single verse becomes one of Paul's favorite proof texts.

🙏 This quotes the prophet Habakkuk

⚖️ The just means one right before God

🎯 Life rests on faith, not law

📖 Paul reuses this verse often

## 📏 The Law Is Not Of Faith

Law and faith work on two completely different principles.

Faith means trusting a promise you did not earn.

Law means doing the work yourself to earn the result.

Paul refuses to blend these two systems together.

📏 Law and faith run on different rules

🙏 Faith means trusting a promise

💪 Law means earning it yourself

📖 Paul keeps the two separate

## 🛠️ The Man That Doeth Them Shall Live In Them

Paul quotes Leviticus to describe the law's own stated terms.

"Doeth them" means actually performing every command, not just agreeing with them.

Life under this system comes only through perfect action.

This is the law's own promise, and its own trap.

🛠️ This quotes Leviticus directly

💯 Doeth them means perfect performance

⚙️ Life comes only through action here

📖 The law's promise becomes its trap

## 💰 Christ Hath Redeemed Us From The Curse Of The Law

"Redeemed" is a word from the slave market.

It means a price was paid to buy someone out of bondage.

Christ paid that price to free people from the law's curse.

This was not a loophole but an actual transaction.

💰 Redeemed is a slave market word

⛓️ It means buying someone out of bondage

✝️ Christ paid the price himself

📖 This was a real transaction

## ✝️ Being Made A Curse For Us

Christ did not just pay a fee from a distance.

He personally took the curse that belonged to everyone else.

This is substitution, one person standing in another's place.

The curse that should have landed on us landed on him instead.

✝️ Christ took the curse personally

🔄 This is substitution, one for another

⚖️ The curse belonged to everyone else

📖 It landed on him instead

## 🌳 Cursed Is Every One That Hangeth On A Tree

Paul quotes Deuteronomy again, this time about execution by hanging.

"Tree" in that context pointed to a wooden execution device, including crosses later.

Crucifixion fit this curse formula exactly in the eyes of Jewish law.

Christ's death on a cross was not an accident of Roman punishment alone.

🌳 Tree points to a wooden execution device

📜 Paul quotes Deuteronomy again

✝️ Crucifixion matched this curse formula

📖 This was not an accident

## 🌍 That The Blessing Of Abraham Might Come On The Gentiles

Paul names the purpose behind Christ bearing the curse.

The blessing promised to Abraham could now legally reach the Gentiles.

Nothing blocked that blessing from crossing ethnic lines any longer.

Christ's death on the cross was the door that opened it.

🌍 The purpose was reaching the Gentiles

🚧 Nothing blocks the blessing anymore

🚪 The cross opened this door

📖 Abraham's blessing now reaches everyone

## 🕊️ That We Might Receive The Promise Of The Spirit Through Faith

Paul names the Spirit as the actual content of the promised blessing.

This ties directly back to verses two and five in this same chapter.

The Spirit is not a side benefit but the main gift itself.

Faith remains the only way to receive it, from beginning to end.

🕊️ The Spirit is the promised gift

🔁 This ties back to earlier verses

🎁 It is the main gift, not a bonus

📖 Faith receives it, start to finish

# Galatians 3:15-18
# 📝 A Covenant Already Sealed
---
## 🗣️ I Speak After The Manner Of Men

"After the manner of men" means Paul is about to use an ordinary, everyday example.

He reaches for a legal illustration anyone in that culture would recognize.

This phrase signals that a comparison from daily life is coming next.

Paul wants his argument to be simple enough for anyone to follow.

🗣️ Paul uses an everyday example

⚖️ It is a legal comparison

💡 A simple comparison is coming

📖 He wants anyone to follow it

## 📝 Though It Be But A Man's Covenant, No Man Disannulleth, Or Addeth Thereto

"Disannulleth" means cancel, and "addeth thereto" means add new conditions later.

Paul describes a basic legal principle about contracts and wills.

Once a human agreement is formally confirmed, no one can change its terms.

If this is true for ordinary agreements, it is far more true for God's own promise.

📝 A confirmed agreement cannot be changed

❌ Disannulleth means to cancel it

➕ Addeth thereto means adding new terms

📖 This applies even more to God

## 🌱 To Abraham And His Seed Were The Promises Made

Paul points back to exactly who received God's original promise.

"Seed" is the key word his whole argument will turn on.

In Hebrew and Greek, this word can describe one descendant or many.

Paul is about to make a careful point out of that detail.

🌱 Seed is the key word here

👤 It can mean one descendant

👥 It can also mean many

📖 Paul is about to use this detail

## 🔢 He Saith Not, And To Seeds, As Of Many, But As Of One

Paul notices that scripture uses the singular form of this word, not the plural.

This is not a grammar trick invented to win an argument unfairly.

Paul is reading the promise exactly as it was written down.

The singular form opens the door to his next claim.

🔢 Seed appears in the singular

📏 Paul reads the text exactly as written

🚪 This opens the door to his claim

📖 It is not a grammar trick

## ✝️ And To Thy Seed, Which Is Christ

Paul names the one descendant the promise ultimately points to.

Every other reading of "seed" in this chapter flows from this one claim.

Christ himself becomes the true heir of Abraham's promise.

Anyone united to Christ later shares in that same inheritance.

✝️ Christ is the promised seed

🌱 This is the true heir of Abraham

🔗 Union with Christ shares the inheritance

📖 Every later claim flows from this

## 📜 The Covenant, That Was Confirmed Before Of God In Christ

"Confirmed before" means God settled the terms long before the law ever existed.

Paul states plainly that God already had Christ in view at the time of this covenant.

This covenant was never a temporary or tentative arrangement.

God committed to this plan from a very early point in the story.

📜 God already had Christ in view

⏳ This covenant came before the law

🔒 It was never temporary

📖 God committed early in the story

## 🗓️ The Law, Which Was Four Hundred And Thirty Years After

Paul gives an exact length of time between the promise and the law.

Four hundred and thirty years covers the span many scholars place between Abraham and the exodus.

That is a long gap for the promise to stand alone, unaided by any formal law.

The timeline itself becomes part of Paul's argument.

🗓️ Four hundred thirty years separates them

📍 It spans Abraham to the exodus

⏳ The promise stood alone that whole time

📖 The timeline supports Paul's point

## 🚫 Cannot Disannul, That It Should Make The Promise Of None Effect

"Of none effect" means stripped of all force or value.

Paul applies the legal principle from verse fifteen directly here.

A later agreement cannot cancel an earlier one that was already confirmed.

The law, arriving centuries later, has no power to erase the promise.

🚫 A later law cannot cancel an earlier promise

⚖️ This follows the legal rule from before

💪 The promise keeps its full force

📖 Of none effect means stripped of value

## 🎁 If The Inheritance Be Of The Law, It Is No More Of Promise

Paul presents these two paths as mutually exclusive.

Inheritance by law keeping would mean earning the gift through obedience.

Inheritance by promise means receiving a gift that was never earned at all.

These two systems cannot both be true at the same time.

⚖️ Law and promise cannot both apply

💪 Law keeping means earning the gift

🎁 Promise means receiving it unearned

📖 Only one system can be true

## 🙏 God Gave It To Abraham By Promise

"Gave" is a gift word, not a wage or a payment for labor.

Paul closes this section by restating how Abraham actually received everything.

Abraham did nothing to earn what God handed him.

This same pattern of pure gift still stands for believers today.

🙏 Gave is a gift word

💪 Not a wage or payment

🎁 Abraham earned nothing of it

📖 The same gift pattern stands today

# Galatians 3:19-22
# 🔑 Why The Law Was Given
---
## ❓ Wherefore Then Serveth The Law

Paul asks the question his own argument just raised.

If the promise alone saves, it seems fair to wonder why the law exists at all.

Paul does not dodge this question or brush it aside.

He is about to give the law a real, important purpose.

❓ Paul raises his own hard question

🤔 Why have a law at all

🎯 Paul does not dodge it

📖 The law gets a real purpose

## ⚠️ It Was Added Because Of Transgressions

"Added" means it came later, as an extra piece, not the main plan.

The law was never meant to be the way people earn righteousness.

Its job was to name and expose sin clearly, like a line marking a boundary.

Without a clear law, people cannot fully see how far they have fallen short.

⚠️ The law exposes sin clearly

➕ Added means it came as an extra piece

📏 It marks where people cross the line

📖 Never a way to earn it

## ⏳ Till The Seed Should Come To Whom The Promise Was Made

Paul gives the law a clear expiration point built in from the start.

"The seed" again points back to Christ, named earlier in this chapter.

The law's assignment always had a finish line waiting ahead of it.

Once Christ arrived, that particular assignment was complete.

⏳ The law had a built in end point

✝️ The seed again points to Christ

🏁 Its assignment had a finish line

📖 Christ's arrival completed that assignment

## 👼 Ordained By Angels In The Hand Of A Mediator

Jewish tradition held that angels were present when the law was given at Sinai.

"In the hand of a mediator" points to Moses, who stood between God and the people.

The promise to Abraham, by contrast, came to him directly from God.

Paul uses this difference to show the law arrived through an extra layer.

👼 Angels were present at Sinai, tradition says

🧑 Moses stood as the mediator

🔀 The law came through an extra layer

📖 Abraham's promise came directly from God

## 🤝 A Mediator Is Not A Mediator Of One, But God Is One

A mediator only makes sense when two separate parties need to be brought together.

This line is dense, but the logic is simple once unpacked.

The promise to Abraham involved no mediator because God acted alone.

That makes the promise more direct and more secure than the law ever was.

🤝 A mediator implies two separate parties

🙏 God alone made the promise

🔒 No go between was needed

📖 This made the promise more secure

## 🚫 Is The Law Then Against The Promises Of God

Paul anticipates an objection readers might raise after his last few points.

If the law and the promise seem so different, do they actually fight each other.

Paul answers his own question before it can spread as a wrong conclusion.

He refuses to let the law be painted as God's enemy.

🚫 Paul anticipates this objection

⚔️ Do law and promise conflict

🛡️ Paul answers before it spreads

📖 The law is not God's enemy

## ❌ God Forbid

This short phrase is Paul's strongest possible denial.

He uses it elsewhere in his letters whenever an idea must be rejected outright.

The law and the promise are not actually at war with each other.

They simply serve two different roles in the same larger plan.

❌ God forbid is Paul's strongest denial

🔁 He uses it to reject bad ideas

🤝 Law and promise are not at war

📖 They serve different roles, same plan

## 💭 For If There Had Been A Law Given Which Could Have Given Life

"Given life" means producing real righteousness and right standing with God.

Paul sets up a hypothetical, a what if, to make his point clearly.

If any law could have done that job, Paul would say so plainly.

He builds the case carefully before revealing the actual answer.

💭 Paul sets up a hypothetical

❤️ Given life means real righteousness

✅ He would admit it if true

📖 The real answer comes next

## ⚖️ Verily Righteousness Should Have Been By The Law

"Verily" is an old word simply meaning truly or certainly.

Paul finishes his hypothetical with the honest answer, that it never happened.

No law in history has ever actually produced righteousness in anyone.

The hypothetical stays a hypothetical because reality never matched it.

⚖️ Verily means truly or certainly

❌ No law ever produced righteousness

🧪 The hypothetical never became reality

📖 Reality never matched this condition

## 🔒 The Scripture Hath Concluded All Under Sin

"Concluded" here is closer to a legal verdict than a casual summary.

It pictures scripture locking every single person inside one shared verdict of guilt.

No one gets an exception, whether they had the law or not.

This universal verdict clears the ground for only one remaining way out.

🔒 Concluded means a legal verdict

⚖️ Everyone is locked under guilt

🌍 No one gets an exception

📖 Only one way out remains

## 🎁 That The Promise By Faith Of Jesus Christ Might Be Given To Them That Believe

Paul names that one remaining way out directly.

Universal guilt was never the end of the story Paul is telling.

The same promise given to Abraham now reaches anyone who simply believes.

Faith becomes the single door left open after every other one closed.

🎁 Faith is the one remaining door

🔁 It reaches back to Abraham's promise

🙏 Anyone who believes may enter

📖 Every other door had closed

# Galatians 3:23-29
# 👨‍🏫 From Schoolmaster To Sons
---
## 🔒 Before Faith Came, We Were Kept Under The Law

"Kept" here carries the sense of being guarded, almost like a prisoner under watch.

This was not cruel punishment but careful protection during a waiting period.

The law held people in place until the right moment arrived.

That moment was faith in Christ, now finally revealed.

🔒 Kept means guarded under watch

🛡️ This was protection, not punishment

⏳ People waited for the right moment

📖 That moment was faith in Christ

## 🚪 Shut Up Unto The Faith Which Should Afterwards Be Revealed

"Shut up" repeats the same image of being enclosed or confined.

This confinement always pointed forward to something not yet arrived.

The law was never meant to be a permanent home.

It existed to hold the place until faith could be revealed.

🚪 Shut up means enclosed or confined

➡️ It pointed toward something future

🏠 The law was never a permanent home

📖 It held the place until faith arrived

## 🎒 The Law Was Our Schoolmaster To Bring Us Unto Christ

"Schoolmaster" translates a word for a household servant, not a classroom teacher.

That servant's job was walking children safely to school each day.

He held real authority over the child, but only for a season.

The law played that same escorting role, leading people toward Christ.

🎒 Schoolmaster means an escorting servant

🚶 He walked children safely to school

⏳ His authority lasted only a season

📖 The law escorted people to Christ

## ✅ That We Might Be Justified By Faith

Paul names the destination this escort was always walking people toward.

The schoolmaster's whole job existed only to reach this one goal.

Once faith arrives, the escorting job is finished.

Nothing about the law's purpose gets lost once its task is complete.

✅ Justified by faith is the destination

🎯 The escort existed to reach this

🏁 The job finishes once faith arrives

📖 Nothing is lost when the task ends

## 🎓 After That Faith Is Come, We Are No Longer Under A Schoolmaster

Paul describes graduation out of the escort's supervision.

This does not mean the law was ever bad or wrong to have.

It simply means its specific job with each believer is now finished.

Believers now relate to God directly, through faith in Christ.

🎓 This pictures graduation from supervision

👍 The law was never bad

🏁 Its specific job is now finished

📖 Believers now relate to God directly

## 👨‍👩‍👧 Ye Are All The Children Of God By Faith In Christ Jesus

"Children of God" names a real adoption into God's own family.

Paul uses family language to describe the believer's new status.

This status comes through faith, not through bloodline or law keeping.

Every believer, whatever their background, receives this exact same standing.

👨‍👩‍👧 Children of God names a real adoption

🙏 Faith, not bloodline, grants this

⚖️ Law keeping was never the path

📖 Every believer shares this standing

## 👕 As Many Of You As Have Been Baptized Into Christ Have Put On Christ

"Put on" borrows the picture of putting on a new garment.

Baptism here marks the moment someone publicly identified with Christ.

The new garment was Christ's own identity, covering the old one completely.

This image describes a real change, not just an outward ceremony.

👕 Put on pictures a new garment

🙋 Baptism marked public identity with Christ

🔄 The old identity gets covered over

📖 This was a real change

## 🌍 There Is Neither Jew Nor Greek

Paul begins listing the deepest divisions people recognized in that world.

Jew and Greek marked the sharpest ethnic and religious line of the time.

In Christ, that line no longer determines someone's standing before God.

Both groups now stand on exactly equal footing.

🌍 Jew and Greek marked a deep divide

⚖️ That line no longer decides standing

🤝 Both groups stand equal in Christ

📖 Ethnic identity does not change this

## ⛓️ There Is Neither Bond Nor Free

"Bond" means enslaved, and "free" means not enslaved under Roman law.

This was one of the largest social divides in the ancient world.

A slave and a slave owner shared identical standing before God in Christ.

Social rank, like ethnicity, carries no weight in this new family.

⛓️ Bond means enslaved under Roman law

🏛️ This was a huge social divide

🤝 Slave and owner share equal standing

📖 Social rank carries no weight here

## 🚻 There Is Neither Male Nor Female

Paul closes this list with the most basic human distinction of all.

This does not erase real differences between men and women.

It means both have equal access to God and equal standing in Christ.

No category anyone belongs to changes this one shared identity.

🚻 Male and female remain real

🚪 Both have equal access to God

⚖️ Standing in Christ is equal

📖 No category changes this identity

## 🤝 For Ye Are All One In Christ Jesus

Paul summarizes the whole list with one simple word, one.

Every division named above gets folded into a single new identity.

This oneness does not erase anyone's background or history.

It means none of those things divide people before God any longer.

🤝 One word summarizes the whole list

🧩 Every division folds into one identity

📜 Backgrounds are not erased

📖 Nothing divides people before God now

## 🌱 If Ye Be Christ's, Then Are Ye Abraham's Seed

Paul closes the loop back to his argument from earlier in the chapter.

Belonging to Christ is what actually makes someone Abraham's true descendant.

This has nothing to do with physical bloodline at all.

Every believer, Jew or Gentile, now shares this one identity.

🌱 Belonging to Christ grants this identity

🧬 Bloodline has nothing to do with it

🔁 This closes the loop from earlier

📖 Every believer shares Abraham's identity

## 👑 Heirs According To The Promise

"Heirs" closes the chapter with inheritance language used throughout.

An heir receives what was promised, not what was earned through labor.

This status was never about bloodline, nationality, or law keeping.

Every believer now stands as a full inheritor of God's original promise to Abraham.

👑 Heirs receive what was promised

💪 Not earned through labor or law

🌍 Open to every believer everywhere

📖 This fulfills Abraham's original promise
`.trim();

export const GALATIANS_THREE_PERSONAL_SECTIONS = parseGalatiansThreeRawNotes(GALATIANS_THREE_RAW_NOTES);
