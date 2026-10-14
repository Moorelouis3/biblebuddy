export type GalatiansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansOneRawNotes(rawText: string): GalatiansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 1:${startVerse}` : `Galatians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Galatians 1 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_ONE_RAW_NOTES = `# Galatians 1:1-5
# 🗣️ Paul's Authority And The Gospel's Source
---
## 🗣️ Paul, An Apostle

"Apostle" means someone sent with the full authority of the one who sent them.

Paul opens the letter by stating that title before anything else.

He wants the Galatians to remember who is speaking before he confronts them.

This whole letter rests on that authority holding up.

⚓ Apostle means sent with real authority

🔑 Paul states this before anything else

🥊 He is about to confront the Galatians

📖 The letter rests on this authority

## 🙅 Not Of Men, Neither By Man

This is not one denial. It is two stacked together.

"Of men" denies a human origin for his call.

"By man" denies a human messenger delivering it.

Paul rules out every possible human source at once.

No council and no individual commissioned him.

God alone stands behind his apostleship.

🙅 Two denials stacked in one phrase

🧬 Of men denies a human origin

✋ By man denies a human messenger

📖 God alone stands behind his calling

## ✝️ But By Jesus Christ, And God The Father, Who Raised Him From The Dead

Paul now states where his authority actually came from.

Jesus Christ and God the Father together commissioned him.

Naming the resurrection here is not an accident.

A dead teacher could not have sent Paul anywhere.

Paul's whole message depends on a risen Christ being real.

✝️ Christ and the Father commissioned Paul

🪦 The resurrection is named on purpose

💀 A dead teacher sends no apostles

📖 Paul's authority depends on a risen Christ

## 🗺️ Unto The Churches Of Galatia

"Galatia" was a Roman province in the highlands of what is now central Turkey.

Paul is not writing to one congregation.

He addresses several churches scattered across that region at once.

Other believers traveling with Paul join him in sending this letter.

Paul was never a lone operator building his own following.

🗺️ Galatia was a Roman province in Turkey

📬 Paul addresses several churches at once

🤝 Other believers join him in writing

📖 Paul worked within a wider community

## 🕊️ Grace Be To You And Peace

This greeting combines two different cultural traditions in one line.

"Grace" was the normal opening word in a Greek letter.

"Peace" translates the Hebrew word shalom, the normal Jewish greeting.

Paul blends both worlds into a single blessing.

The gospel was always meant to reach Jew and Gentile alike.

🕊️ Grace was the normal Greek greeting

🤲 Peace translates the Hebrew word shalom

🌍 Paul blends both cultures in one line

📖 The gospel reaches Jew and Gentile alike

## 💔 Who Gave Himself For Our Sins

Paul states the heart of the gospel in one short line.

Christ did not die by accident or by force.

He gave himself, a willing and deliberate act.

"For our sins" names exactly what that sacrifice addressed.

Nothing here depends on human effort or achievement.

💔 Christ gave himself willingly

🎯 For our sins names the purpose

🙅 No human effort is involved

📖 This point shapes the whole letter

## 🆘 That He Might Deliver Us From This Present Evil World

"This present evil world" does not simply mean the physical planet.

It names the current age, the broken order sin has produced.

"Deliver" means a rescue out of danger, not a gentle improvement.

Christ did not come to decorate the old order.

He came to pull people out of it entirely.

That rescue already started.

🆘 Deliver means a rescue not an upgrade

🌍 This evil world names the current age

🚪 Christ pulls people out of it

📖 The rescue has already started

## 📯 To Whom Be Glory For Ever And Ever. Amen

Paul breaks into praise before the letter has barely started.

A doxology this early is unusual in Paul's other letters.

He is already bracing for the hard conversation ahead.

Naming God's glory first sets the right posture before any correction begins.

📯 Paul praises God this early on purpose

⏰ A doxology this soon is unusual

🥊 He is bracing for a hard conversation

📖 Worship comes before any correction

# Galatians 1:6-9
# 😲 Astonished At A Fast Betrayal
---
## 😲 I Marvel That Ye Are So Soon Removed

"Marvel" means Paul is genuinely shocked, not making a complaint for effect.

"So soon" points to how little time had passed since Paul left them.

"Removed" pictures someone being physically moved off solid ground.

Paul expected this church to be the last to drift.

😲 Marvel means genuine shock

⏱️ So soon stresses how little time passed

🪨 Removed pictures moving off solid ground

📖 Their speed surprises him most

## 📣 From Him That Called You Into The Grace Of Christ

"Him that called you" points back to God, not to Paul himself.

The Galatians did not invent their own faith.

God actively called them into it.

"The grace of Christ" names the ground they are now leaving.

📣 Him that called you means God

🙋 Their faith began with God's call

🪂 Grace of Christ is the ground

📖 Leaving grace means leaving the caller

## ⚠️ Which Is Not Another

Paul just used the word "gospel" to describe what these teachers are selling.

This line immediately denies that counterfeit deserves the name at all.

A real gospel cannot be swapped out for a different one.

What they are being offered is not actually good news.

⚠️ This denies the fake its name

🏷️ Teachers were selling a counterfeit

🚫 A true gospel cannot be swapped

📖 Their message is not good news

## 😤 There Be Some That Trouble You

Paul names real people, not a vague danger.

"Trouble" describes active agitation, stirring up confusion on purpose.

These teachers were not confused bystanders.

They were deliberately working to unsettle the Galatians' faith.

😤 Paul names real troublemakers

🌀 Trouble means deliberate agitation

🎯 This was not an accident

📖 They worked to unsettle the Galatians

## 🔀 Would Pervert The Gospel Of Christ

"Pervert" means to twist something into the opposite of what it was.

These teachers were not offering a slightly different gospel.

They were turning the real gospel into something that could not save anyone.

A twisted gospel can sound almost identical to the true one.

🔀 Pervert means twist into the opposite

🚱 A twisted gospel cannot save anyone

🎭 It can sound almost identical

📖 That similarity makes it dangerous

## 👼 Though We, Or An Angel From Heaven, Preach Any Other Gospel

Paul raises the most extreme possible source on purpose.

Not even an angel from heaven gets a pass here.

Not even Paul himself gets a pass.

A messenger's status cannot rescue a false message.

👼 Not even an angel is exempt

🙋 Not even Paul himself is exempt

🎤 Truth never depends on the speaker

📖 Status cannot rescue a false message

## ⛔ Let Him Be Accursed

"Accursed" translates the Greek word anathema, meaning handed over to God's judgment.

Paul repeats this exact sentence twice in two verses.

That repetition is not an accident or a slip of anger.

False teaching about the gospel carries real consequences.

⛔ Accursed means handed to God's judgment

🔁 Paul repeats the warning twice

📢 The repetition is deliberate

📖 False teaching carries real consequences

# Galatians 1:10-12
# 🪞 Whose Approval Actually Matters
---
## 🙋 Do I Now Persuade Men, Or God?

Paul asks this as a real question, not a rhetorical flourish.

His critics had apparently accused him of being a people pleaser.

"Persuade" here means currying favor, not simply convincing someone.

Paul is pointing out whose approval actually matters to him.

🙋 Paul answers a real accusation

🎭 Persuade here means currying favor

⚖️ He asks whose approval matters

📖 The answer is obvious

## ⚔️ For If I Yet Pleased Men, I Should Not Be The Servant Of Christ

Paul draws a hard line between two masters.

Pleasing people and serving Christ pull in opposite directions.

"Servant" translates a word meaning a bondslave, someone fully owned by a master.

Paul cannot serve both an audience and a Lord at the same time.

⚔️ Two masters pull opposite directions

⛓️ Servant means a fully owned bondslave

👑 One owner only

📖 Paul cannot serve both at once

## 🧭 The Gospel Which Was Preached Of Me Is Not After Man

"After man" means shaped by ordinary human invention or tradition.

Paul insists his message did not come from a human committee.

It was not adjusted to fit anyone's expectations.

Its origin sets it apart from every rival teaching in Galatia.

🧭 After man means human invention

🚫 Paul's gospel was not adjusted

🏛️ No committee produced it

📖 Its origin sets it apart

## 💡 I Neither Received It Of Man, Neither Was I Taught It, But By The Revelation Of Jesus Christ

Paul stacks two denials and one real source in a single sentence.

He did not receive the gospel secondhand from another apostle.

He was not taught it the way a student learns from a teacher.

"Revelation" means Christ himself made it directly known to Paul.

💡 Revelation means Christ made it known directly

📪 Not received secondhand from anyone

🎓 Not learned like a classroom lesson

📖 This encounter grounds everything that follows

# Galatians 1:13-17
# 🔄 From Persecutor To Preacher
---
## 📜 My Conversation In Time Past In The Jews' Religion

"Conversation" in King James English means conduct, not talking.

Paul now points back to his life before following Christ.

"The Jews' religion" names formal Judaism as it was practiced in his day.

He is about to describe exactly what that life looked like.

📜 Conversation means conduct in old English

⏮️ Paul points back to his old life

✡️ Jews' religion names formal Judaism

📖 He is about to describe it

## 😨 Beyond Measure I Persecuted The Church Of God, And Wasted It

"Beyond measure" means to an extreme Paul cannot even quantify.

"Persecuted" describes active, organized hunting of believers, not casual dislike.

"Wasted" pictures devastation, the same word used for ravaging a city.

Paul names his own record as plainly and harshly as it actually was.

😨 Beyond measure means extreme and unmeasured

🏹 Persecuted means organized hunting of believers

🔥 Wasted pictures real devastation

📖 Paul does not soften his record

## 📈 Profited In The Jews' Religion Above Many My Equals

"Profited" means Paul was advancing and excelling, not gaining money.

"Mine equals" points to others his own age training alongside him.

Paul was not a minor figure in this persecution.

He was outperforming his peers at it.

📈 Profited means advancing and excelling

🤝 Mine equals means peers his own age

🏆 Paul was outperforming them

📖 He was no minor figure here

## 🔥 Being More Exceedingly Zealous Of The Traditions Of My Fathers

"Zealous" means intensely devoted, willing to act on that devotion.

"Traditions of my fathers" names the inherited customs built up around the law.

Paul's zeal was the actual engine behind his persecution.

Genuine religious passion once fueled real harm in his life.

🔥 Zealous means intensely devoted

📚 Traditions of my fathers means inherited customs

⚙️ Zeal fueled his persecution

📖 Passion itself caused real harm

## 🌱 Who Separated Me From My Mother's Womb, And Called Me By His Grace

Paul claims God marked him out before he was even born.

This was not a reward for good behavior.

"Called me by his grace" means the call itself was a gift, not a payment.

God's plan for Paul predates anything Paul ever did.

🌱 Marked out before birth

🎁 Called by grace means a gift

🙅 Not a reward for behavior

📖 God's plan came before Paul's actions

## 🌍 To Reveal His Son In Me, That I Might Preach Him Among The Heathen

"Heathen" means the Gentiles, people outside the Jewish nation.

God's purpose for Paul was never private.

The revelation of Christ in Paul was meant to go public immediately.

His calling and his mission were the same event, not two separate steps.

🌍 Heathen means Gentiles outside Israel

📢 God's purpose was never private

🤝 Calling and mission were one event

📖 Revelation led straight to preaching

## 🚫 Immediately I Conferred Not With Flesh And Blood

"Flesh and blood" is a Hebrew way of saying any human being.

Paul did not run his new calling past anyone for approval.

He is building the case that his gospel owes nothing to human committees.

This detail will matter later when he describes finally meeting the apostles.

🚫 Flesh and blood means any human

🙅 Paul sought no human approval

🧱 This builds his larger case

📖 It sets up the Jerusalem visit later

## 🏜️ I Went Into Arabia, And Returned Again Unto Damascus

"Arabia" here likely means the nearby Nabataean kingdom, not the whole peninsula.

Paul vanishes from the public record for a stretch of time here.

Luke's account in Acts does not mention this detour at all.

Paul seems to use this time before beginning his public ministry.

🏜️ Arabia likely means the nearby Nabataean kingdom

🕳️ Paul vanishes from the record here

⏳ He takes time before his public ministry

📖 Acts does not mention this detour

# Galatians 1:18-24
# 👋 The First Visit To Jerusalem
---
## ⏳ After Three Years I Went Up To Jerusalem To See Peter

"Three years" likely counts from Paul's conversion near Damascus.

This is Paul's first contact with any Jerusalem apostle after that event.

"To see" means to visit and get to know someone.

It does not mean a quick, casual meeting.

That gap proves Paul's gospel had already formed before this visit.

⏳ Three years from his conversion

🤝 His first contact with an apostle

👀 To see means getting to know

📖 His gospel had already formed

## 🏠 Abode With Him Fifteen Days

"Abode" means Paul stayed and lodged with Peter.

Fifteen days is long enough for real conversation, not a brief courtesy call.

It is also short enough to prove Paul was not trained there.

Paul wants the Galatians to see both facts at once.

🏠 Abode means stayed and lodged

📆 Fifteen days allowed real conversation

⏱️ Too short to count as training

📖 Paul wants both facts noticed

## 👥 But Other Of The Apostles Saw I None, Save James The Lord's Brother

Paul met only two leaders on this visit, not the whole apostolic group.

"James the Lord's brother" refers to Jesus' half brother, not the apostle James son of Zebedee.

This James later became a key leader in the Jerusalem church.

Paul is being precise about exactly who confirmed his account.

👥 Only two leaders met him

👪 James here is Jesus' half brother

🏛️ James later led the Jerusalem church

📖 Paul is precise about witnesses

## ⚖️ Before God, I Lie Not

Paul stops to swear an oath in the middle of his own story.

This level of insistence signals real accusations were circulating against him.

Someone had apparently claimed Paul invented parts of his account.

Paul answers that charge directly instead of ignoring it.

⚖️ Paul swears an oath here

🗣️ Real accusations were circulating

🙅 Someone claimed he invented his story

📖 Paul answers the charge directly

## 🗺️ I Came Into The Regions Of Syria And Cilicia

Cilicia was Paul's home region, including his native city of Tarsus.

Paul moves north after his short Jerusalem visit, not deeper into Judea.

This path keeps him away from the churches that already knew him as a persecutor.

Geography itself supports Paul's claim that Judea barely knew him at this point.

🗺️ Cilicia includes Paul's hometown Tarsus

➡️ He moves north, not into Judea

🙈 This keeps him away from Judea's churches

📖 Geography backs up his claim

## 🙈 Was Unknown By Face Unto The Churches Of Judaea

Judean believers had never actually seen Paul's face at this point.

They only knew of him through reports passed along by others.

That detail rules out any claim that Judea trained or supervised him.

Paul's credibility rests on a gap that anyone could check at the time.

🙈 Judea had never seen his face

📰 They only knew him by report

🚫 This rules out Judean training

📖 This gap was publicly checkable

## 🔄 He Which Persecuted Us In Times Past Now Preacheth The Faith

This is the report that actually reached the Judean churches.

"The faith" here means the body of Christian belief itself, not simply trust.

Paul's reputation traveled as a summary, not a detailed account.

The reversal in that one sentence was the whole story people needed to hear.

🔄 Persecutor to preacher is the whole report

📖 The faith means Christian belief itself

📰 His reputation traveled as a summary

➡️ One reversal told the whole story

## 🙌 They Glorified God In Me

The churches did not praise Paul himself for this change.

They praised God, since only God could explain such a reversal.

Paul ends the chapter pointing every bit of credit away from himself.

That is the same target his whole defense has aimed at from verse one.

🙌 They praised God, not Paul

💡 Only God explained the reversal

👐 Paul deflects credit from himself

📖 This defends God's authority, not his own
`.trim();

export const GALATIANS_ONE_PERSONAL_SECTIONS = parseGalatiansOneRawNotes(GALATIANS_ONE_RAW_NOTES);
