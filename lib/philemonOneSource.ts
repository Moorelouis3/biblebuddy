export type PhilemonOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePhilemonOneRawNotes(rawText: string): PhilemonOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PhilemonOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Philemon\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Philemon 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Philemon\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Philemon\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Philemon 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Philemon 1:${startVerse}` : `Philemon 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Philemon 1 sections, received " + sections.length);
  }

  return sections;
}

const PHILEMON_ONE_RAW_NOTES = `# Philemon 1:1-3
# 📜 A Personal Letter To A Friend And His House
---
## ⛓️ Paul, A Prisoner Of Jesus Christ

Paul was writing from a prison cell, not a church office.

He calls himself a prisoner of Jesus Christ, not of Rome.

Rome held the chains, but Christ held Paul's calling.

That small choice of words sets the tone for everything after it.

⛓️ Paul wrote this letter from prison
✝️ He names Christ as his real master
🏛️ Rome only held the chains
📖 The whole letter grows from that choice

---
## 🤝 Timothy Our Brother

Paul did not write this letter completely alone.

Timothy's name appears beside his own at the very top.

Timothy traveled with Paul for years and helped write several of his other letters.

Naming him here shows this was not a private note, but a shared one.

🤝 Timothy joined Paul in writing this letter
🧳 Timothy traveled with Paul often
✍️ He is named at the top
📖 This letter was shared, not private

---
## 🏙️ Philemon Our Dearly Beloved, And Fellowlabourer

Philemon was a real person living in the city of Colosse.

He was likely a man of some wealth, able to host a church.

"Fellowlabourer" means someone who works side by side in the same gospel work.

Paul is not writing to a stranger here, but to a true partner in ministry.

🏙️ Philemon lived in the city of Colosse
🏠 He likely had wealth and a large home
🤲 Fellowlabourer means a true gospel partner
📖 Paul wrote to a trusted friend

---
## 👩 Apphia, And Archippus Our Fellowsoldier

Apphia and Archippus were named right alongside Philemon.

Many scholars believe Apphia was Philemon's wife.

Archippus is called a fellow soldier, but not in a real army.

That word pictures the hard, disciplined work of serving Christ.

Elsewhere Paul describes Archippus as a man with his own ministry to fulfill.

👩 Apphia was likely Philemon's wife
🎯 Archippus served in gospel work, not an army
💪 Fellowsoldier pictures disciplined service to Christ
📖 Archippus had his own ministry to finish

---
## 🏠 The Church In Thy House

Early Christians did not yet have church buildings.

Believers gathered inside the homes of members who had room to host them.

Philemon's house held one of these early gatherings.

That made his home a center of worship, not just a private residence.

🏠 Early churches met inside homes
🚪 Philemon's house hosted believers
🛐 His home became a place of worship
📖 Hosting the church was a real ministry

---
## 🎁 Grace To You, And Peace

Paul opens almost every letter with this exact pairing.

"Grace" was the common Greek greeting, meaning undeserved kindness.

"Peace" was the common Jewish greeting, meaning wholeness and right relationship.

Paul joins both greetings and roots them in God and Christ together.

🎁 Grace means kindness that was not earned
☮️ Peace means wholeness and right relationship
🌍 Paul joins a Greek and a Jewish greeting
📖 Both gifts come from God and Christ

# Philemon 1:4-7
# 🙏 Thanksgiving For A Faithful Friend
---
## 🙏 I Thank My God, Making Mention Of Thee Always In My Prayers

Paul did not just pray for people in general terms.

He names Philemon specifically, by name, in his own private prayers.

"Always" shows this was a regular habit, not a one time mention.

Paul's prayer life included real people he cared about personally.

🙏 Paul prayed for Philemon by name
🔁 Always means a regular habit
❤️ Paul's prayers included real people
📖 This was personal, not generic prayer

---
## 📰 Hearing Of Thy Love And Faith

Paul heard reports about Philemon from other believers who had visited him.

Philemon's faith pointed straight up toward the Lord Jesus.

Philemon's love pointed outward toward all the saints around him.

Those two directions, up and out, described a complete Christian life.

📰 Paul heard reports about Philemon
⬆️ Faith was aimed at the Lord Jesus
➡️ Love was aimed at fellow believers
📖 Together they described a full Christian life

---
## 💬 The Communication Of Thy Faith

"Communication" here is old English for sharing or fellowship, not talking.

Philemon's faith was not kept to himself.

It actively flowed out and touched the people around him.

That kind of faith was never meant to stay private.

💬 Communication means sharing, not talking
🌊 Philemon's faith flowed outward
🙌 Faith touched the people around him
📖 Faith was never meant to stay private

---
## ⚡ May Become Effectual By The Acknowledging Of Every Good Thing

"Effectual" means something has become fully active, not just believed quietly.

Paul prays that Philemon's faith would actually produce real results.

"Acknowledging" means recognizing and naming the good things God had already done.

Faith was meant to be seen working, not only felt inside.

⚡ Effectual means fully active, not quiet belief
🙏 Paul prays for faith to produce results
👀 Acknowledging means recognizing God's good gifts
📖 Faith was meant to be seen working

---
## 😊 We Have Great Joy And Consolation In Thy Love

Philemon's love did not just help strangers far away.

It brought real joy and comfort back to Paul himself.

"Consolation" means comfort given to someone carrying a burden.

Paul felt the effects of Philemon's character personally.

😊 Philemon's love brought Paul real joy
🤗 Consolation means comfort for a burden
❤️ Paul felt this love personally
📖 Character always reaches beyond itself

---
## 💗 The Bowels Of The Saints Are Refreshed By Thee

"Bowels" in the King James Bible means the deepest feelings, not the stomach.

Ancient people believed strong emotion was felt deep inside the body.

Today we might say "heart" to describe that same inner feeling.

Philemon had brought real relief to other believers' inner lives.

💗 Bowels here means deep inner feelings
🫀 Ancient people located emotion in the body
🧡 Today we would say heart instead
📖 Philemon brought real relief to believers

---
## 💧 Refreshed By Thee, Brother

"Refreshed" pictures someone tired and worn out finally getting rest.

Philemon's kindness acted like water for people who were spiritually thirsty.

Paul calls him "brother," placing them on completely equal footing.

A wealthy host and a traveling apostle shared the same family in Christ.

💧 Refreshed pictures rest after being worn out
🚶 Philemon gave relief like water to the thirsty
🤝 Brother means equal footing in Christ
📖 Wealth and apostleship still shared one family

# Philemon 1:8-14
# 🙇 An Appeal, Not A Command
---
## 📏 Though I Might Be Much Bold In Christ To Enjoin Thee

"Enjoin" means to give a direct command or order.

Paul had the authority as an apostle to simply order Philemon to act.

He makes a point of naming that authority before setting it aside.

Paul wanted Philemon to see the choice ahead as a gift, not a demand.

📏 Enjoin means to give a direct order
👑 Paul had real authority to command
🎯 He names that authority on purpose
📖 He wanted to set it aside instead

---
## 🙏 Yet For Love's Sake I Rather Beseech Thee

Paul chooses to ask instead of command.

"Beseech" means to plead earnestly, almost like begging.

Love, not rank, becomes the reason behind the whole request.

Paul models the same gentleness he once urged Titus to show others.

🙏 Beseech means to plead earnestly
❤️ Love became Paul's real reason
🎯 He chose asking over commanding
📖 Paul modeled the gentleness he taught elsewhere

---
## 👴 Being Such An One As Paul The Aged

Paul points to his own age as part of this appeal.

An older man's request carried real weight in that culture.

He had also spent years building trust with people like Philemon.

Paul leans on relationship and respect, not on his title as an apostle.

👴 Paul names his own age here
🏛️ Age carried real weight in that culture
🤝 Years of trust backed this appeal
📖 Paul leans on relationship, not title

---
## 🏃 I Beseech Thee For My Son Onesimus

Onesimus was Philemon's slave before this letter was written.

At some point Onesimus ran away from Philemon's household.

Paul now calls him "my son," a term for someone he helped bring to faith.

A runaway slave and a Roman citizen's apostle now shared the same spiritual family.

🏃 Onesimus had run away from Philemon
👨‍👦 Paul calls him his own son
✝️ That title points to a new faith
📖 A runaway and an apostle shared one family

---
## 👶 Whom I Have Begotten In My Bonds

"Begotten" means fathered, used here for a spiritual birth, not a physical one.

Onesimus came to faith in Christ while visiting Paul in prison.

"My bonds" reminds the reader that Paul was still chained when this happened.

Even in chains, Paul's ministry kept producing real spiritual family.

👶 Begotten here means spiritual fathering
⛓️ Onesimus believed while Paul was in prison
🔗 Bonds means Paul's actual chains
📖 Chains never stopped Paul's ministry

---
## 🏷️ Which In Time Past Was To Thee Unprofitable, But Now Profitable

"Onesimus" was a common name in that world meaning useful or profitable.

Before his escape, Onesimus had become the opposite of his own name.

After coming to faith, Paul says that meaning finally fit him again.

Paul builds this whole sentence around a quiet play on Onesimus's own name.

🏷️ Onesimus means useful or profitable
❌ He once lived as his name's opposite
✅ Faith made his name true again
📖 Paul builds a quiet play on the name

---
## ⚠️ Whom I Have Sent Again

Returning a runaway slave was not a small or safe decision.

Roman law allowed harsh punishment for slaves who had fled their masters.

Paul sends Onesimus back anyway, trusting Philemon with his life.

This letter itself was meant to protect Onesimus on that return trip.

⚠️ Returning a runaway slave was risky
⚖️ Roman law allowed harsh punishment
🤝 Paul trusted Philemon with Onesimus's life
📖 This letter was meant to protect him

---
## 🚪 Thou Therefore Receive Him, That Is, Mine Own Bowels

Paul asks Philemon to welcome Onesimus the way he would welcome Paul.

"Mine own bowels" repeats the same idiom for deep affection from verse seven.

Paul is saying Onesimus now carries a piece of his own heart.

How Philemon treats Onesimus becomes how he treats Paul himself.

🚪 Receive him means welcome him fully
💗 Bowels again means deep affection
🧡 Onesimus carried a piece of Paul's heart
📖 Treating Onesimus well meant treating Paul well

---
## 🙋 That In Thy Stead He Might Have Ministered Unto Me

Paul admits he wanted to keep Onesimus close in prison.

Onesimus could have served Paul there in Philemon's place.

"In thy stead" means standing in for someone, filling their role.

Paul gave up something he genuinely wanted for Philemon's sake.

🙋 Paul wanted to keep Onesimus near him
🔄 In thy stead means filling someone's role
🎁 Paul gave up his own wish
📖 He did it for Philemon's sake

---
## 🚫 Without Thy Mind Would I Do Nothing

Paul refuses to decide Philemon's response for him.

He will not force this choice, even though he could have.

The next phrase explains why, naming willingness over necessity.

Paul wanted a free choice, not one squeezed out of guilt.

🚫 Paul refuses to force the decision
🗳️ He leaves the real choice to Philemon
💭 Willingness mattered more than compliance
📖 A forced gift is not really a gift

# Philemon 1:15-18
# 👨‍👦 No Longer A Servant, But A Brother
---
## 🏃 For Perhaps He Therefore Departed For A Season

Paul chooses a soft word for what Onesimus actually did.

"Departed" sounds gentler than the plain truth, that he ran away.

Paul is not hiding the facts, only framing them with grace.

He treats even Onesimus's failure as part of a larger story.

🏃 Departed softens the word for running away
🙈 Paul does not hide the facts
🎯 He frames the failure with grace
📖 Even failure became part of a bigger story

---
## ⏳ That Thou Shouldest Receive Him For Ever

Onesimus left Philemon's house for only a short time.

Paul says the result will last forever instead.

A temporary loss turned into a permanent, eternal relationship.

What looked like running away became the start of real family.

⏳ The leaving was only temporary
♾️ The gain Paul describes is permanent
👨‍👦 A slave became permanent family
📖 Temporary loss became eternal gain

---
## ⛓️ Not Now As A Servant, But Above A Servant

"Servant" here is a soft translation of the Greek word for slave.

Slaves in that world were legally treated as property, not people.

Paul says Onesimus now stands above that old legal status entirely.

Faith gave Onesimus a position Roman law never could have given him.

⛓️ Servant here actually means slave
📜 Slaves were treated as property under Roman law
⬆️ Onesimus now stood above that status
📖 Faith gave him what law never could

---
## ❤️ A Brother Beloved, Specially To Me

Paul does not just tolerate Onesimus now.

He calls him beloved, a word for real affection.

Paul admits Onesimus is now specially dear to him personally.

This was not a polite word choice but a true change of heart.

❤️ Beloved means real affection, not politeness
🙋 Onesimus became specially dear to Paul
🔄 This was a true change of heart
📖 Paul's words matched a real relationship

---
## 🧍 Both In The Flesh, And In The Lord

"In the flesh" points to their actual, physical, everyday relationship.

"In the Lord" points to their shared spiritual family in Christ.

Paul says both layers now apply to Philemon and Onesimus.

A master and his slave were now also brothers inside the church.

🧍 In the flesh means the everyday relationship
✝️ In the Lord means their shared faith
🔗 Both layers applied at the same time
📖 A master and slave became brothers too

---
## 🤝 If Thou Count Me Therefore A Partner

"Partner" was a word for someone sharing fully in the same work.

Paul asks Philemon to treat their friendship as a real partnership.

That partnership becomes the measuring stick for how to treat Onesimus.

Paul ties his own standing directly to Onesimus's future treatment.

🤝 Partner means someone sharing the same work
📏 Their partnership becomes the measuring stick
🔗 Paul ties his name to Onesimus
📖 How Onesimus is treated reflects on Paul

---
## 🪞 Receive Him As Myself

Paul asks for the warmest welcome he can imagine.

Philemon is told to greet Onesimus the same way he would greet Paul.

No lesser welcome, no second class treatment, is being asked for here.

This single line raises Onesimus's status higher than almost any other line in the letter.

🪞 Paul asks for the warmest welcome
🔄 Treat Onesimus exactly like Paul
🙅 No lesser welcome was acceptable
📖 This line raised Onesimus's status highest

---
## 💰 If He Hath Wronged Thee, Or Oweth Thee Ought

Paul does not pretend Onesimus did nothing wrong.

Running away may have also meant stealing money or goods.

Paul names the possibility honestly instead of glossing over it.

He deals with the debt directly rather than ignoring it.

🙈 Paul does not pretend nothing happened
💰 Running away may have meant stolen goods
📣 Paul names the possibility honestly
📖 He deals with the debt directly

# Philemon 1:19-22
# ✍️ Paul's Personal Promise
---
## ✍️ I Paul Have Written It With Mine Own Hand

Paul usually dictated his letters to someone else who wrote them down.

Here he switches to his own handwriting for emphasis.

A personal signature made this promise legally and personally binding.

Paul treats this line almost like signing a contract.

✍️ Paul usually dictated his letters
✋ He switches to his own handwriting here
📝 A signature made the promise binding
📖 Paul treats this like signing a contract

---
## 💳 I Will Repay It

Paul personally guarantees to cover whatever Onesimus owes.

"Put that on mine account" was a real financial expression.

Paul offers himself as security for someone else's debt.

That offer pictures exactly what Christ later did for every believer.

💳 Paul guarantees Onesimus's debt himself
📑 Put on mine account is a financial term
🤲 Paul becomes security for someone else
📖 This pictures what Christ did for believers

---
## 💭 Thou Owest Unto Me Even Thine Own Self

Paul gently reminds Philemon of a much bigger debt.

Many scholars believe Paul was the one who first led Philemon to faith.

If that is true, Philemon owed Paul his entire new life.

Any money Onesimus owed shrinks compared to that kind of debt.

💭 Paul reminds Philemon of a bigger debt
✝️ Paul may have led Philemon to faith
⚖️ That debt outweighs any money owed
📖 A new life is the greater gift

---
## 😊 Let Me Have Joy Of Thee In The Lord

Paul asks for something simple here, his own joy.

He is not demanding proof or asking for a formal reply.

A right response from Philemon would bring Paul real happiness.

Paul's request stays personal all the way to the end.

😊 Paul asks simply for his own joy
🙅 He does not demand formal proof
❤️ A right response would make Paul happy
📖 The request stayed personal throughout

---
## 💗 Refresh My Bowels In The Lord

Paul uses the same word for deep feeling found in verse seven.

There Philemon refreshed other believers with his kindness.

Here Paul asks for that same refreshment for himself.

Paul is not above needing the comfort he praised in others.

🔁 The same word appears again from verse seven
💗 Bowels still means deep inner feeling
🙏 Paul now asks for that same comfort
📖 Even Paul needed the comfort he praised

---
## 💭 Knowing That Thou Wilt Also Do More Than I Say

Paul hints at something bigger than he states outright.

Many readers through history have believed Paul was hinting at freedom for Onesimus.

Paul never actually commands Philemon to free him in this letter.

He trusts Philemon's own conscience to go further than any direct order could.

💭 Paul hints at more than he states
🕊️ Many believe this points toward freedom
🙅 Paul never gives a direct command
📖 He trusts Philemon's own conscience instead

---
## 🏠 Prepare Me Also A Lodging

Paul expects to be set free from prison soon.

He asks Philemon to get a guest room ready for him.

This was a real travel plan, not a vague wish.

Paul planned to see this relationship through in person, not just by letter.

🏠 Paul asks for a guest room
🔓 He expects to be freed soon
🗺️ This was a real travel plan
📖 Paul planned to follow up in person

# Philemon 1:23-25
# 🙏 Final Greetings And A Blessing
---
## 👋 There Salute Thee Epaphras

"Salute" is old English for sending a warm personal greeting.

Epaphras was a real person, not just a name on a list.

He is remembered elsewhere as the one who first brought the gospel to Colosse.

Even a short greeting carries a specific person's whole ministry behind it.

👋 Salute means a warm personal greeting
🏙️ Epaphras first brought the gospel to Colosse
🙋 Not just a name on a list
📖 One greeting carried a whole ministry behind it

---
## ⛓️ My Fellowprisoner In Christ Jesus

"Fellowprisoner" suggests Epaphras shared some form of imprisonment with Paul.

Scholars are not fully certain if this means literal chains or shared hardship.

Either way, Epaphras stood with Paul even when it cost him something.

Loyalty to Paul's ministry sometimes came with a real personal price.

⛓️ Fellowprisoner suggests shared imprisonment
❓ Scholars are not fully certain of the details
🤝 Epaphras stood with Paul regardless
📖 Loyalty sometimes carried a real cost

---
## ✍️ Marcus, Aristarchus, Demas, Lucas, My Fellowlabourers

Paul closes with four named coworkers, not just a list of names.

Marcus likely wrote the Gospel of Mark.

Aristarchus had traveled with Paul for years on several journeys.

Demas later deserted Paul for love of the present world.

Lucas the physician stayed faithful all the way to the end.

That contrast between Demas and Lucas carries a quiet warning for every reader.

✍️ Marcus likely wrote the Gospel of Mark
🧳 Aristarchus traveled with Paul for years
⚠️ Demas later deserted Paul completely
📖 Not every name on this list stayed faithful

---
## 🙏 The Grace Of Our Lord Jesus Christ Be With Your Spirit

The letter closes the same way it opened, with grace.

"Your spirit" is singular, even though others besides Philemon were listening.

That detail keeps the blessing deeply personal to Philemon himself.

"Amen" means let it be so, sealing the whole letter.

🙏 Grace closes the letter as it opened
🎯 Your spirit keeps the blessing personal
🤝 Other listeners still heard this personal word
📖 Amen seals the whole letter
`.trim();

export const PHILEMON_ONE_PERSONAL_SECTIONS = parsePhilemonOneRawNotes(PHILEMON_ONE_RAW_NOTES);
