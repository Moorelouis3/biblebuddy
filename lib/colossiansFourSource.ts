export type ColossiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseColossiansFourRawNotes(rawText: string): ColossiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ColossiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Colossians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Colossians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Colossians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Colossians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Colossians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Colossians 4:${startVerse}` : `Colossians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Colossians 4 sections, received " + sections.length);
  }

  return sections;
}

const COLOSSIANS_FOUR_RAW_NOTES = `# Colossians 4:1-2
# ⚖️ Masters And Watchful Prayer
---
## ⚖️ Masters, Give Unto Your Servants That Which Is Just And Equal

"Just and equal" names two separate standards, not one vague idea.

"Just" means treating a servant according to what is fair and right.

"Equal" means consistent treatment, not favoring one servant over another.

Roman law gave masters almost total power over slaves with no such requirement.

Paul places this same chapter three logic back onto the master's side.

No master escapes accountability simply because he holds more power.

⚖️ Just means fair treatment

🤝 Equal means consistent treatment

🏛️ Roman law gave masters total power

📖 No master escapes this accountability

## 👑 Knowing That Ye Also Have A Master In Heaven

Every earthly master answers to someone higher than himself.

Paul reminds masters that their own authority is borrowed, not owned.

A master who forgets this can easily begin to abuse his power.

This same warning closes out the entire household code from chapter three.

👑 Masters answer to God too

🎯 Earthly authority is borrowed, not owned

⚠️ Forgetting this invites abuse of power

📖 This closes the whole household code

## 🔁 Continue In Prayer

"Continue" means staying persistent, not praying once and moving on.

Paul uses the same word for sticking with a hard task over time.

This command sits right after serious instructions about masters and servants.

Prayer becomes the posture that sustains every relationship just described.

🔁 Continue means staying persistent

💪 The same word fits a hard task

🏠 This follows the household instructions

📖 Prayer sustains every relationship named

## 👁️ Watch In The Same With Thanksgiving

"Watch" means staying alert, the word used for a soldier on guard duty.

Paul pairs prayer with staying awake to it, not drifting into autopilot.

"Thanksgiving" keeps that watchfulness from turning into anxious, joyless duty.

Gratitude and alertness work together here, not against each other.

👁️ Watch means staying alert

🪖 It pictures a soldier on guard

🙏 Thanksgiving prevents anxious duty

📖 Alertness and gratitude work together

# Colossians 4:3-4
# 🚪 A Door For The Word
---
## 👥 Praying Also For Us

"Us" includes Paul and the coworkers traveling with him.

Paul just asked the Colossians to keep praying.

Now he asks them to aim some of that prayer at his own mission.

Even an apostle depended on the prayers of ordinary believers.

👥 Us means Paul and his coworkers

🔁 This follows his call to pray

🙏 Paul asks for prayer for himself

📖 Even an apostle needed others praying

## 🚪 That God Would Open Unto Us A Door Of Utterance

A "door" in this phrase pictures an opportunity opening up to speak.

"Utterance" means the actual words and the chance to say them.

Paul is not asking for comfort or an easier situation.

He is asking for more chances to preach, even from inside prison.

🚪 Door pictures an opening opportunity

🗣️ Utterance means the words and chance

⛓️ Paul prays this from prison

📖 He wants more chances to preach

## 🔓 To Speak The Mystery Of Christ, For Which I Am Also In Bonds

Colossians one already named this mystery as Christ living in every believer.

Gentiles receiving that same promise once given to Israel shocked many people.

"Bonds" means Paul is writing this letter from an actual prison chain.

He is in prison precisely because he kept preaching that message anyway.

🔓 Mystery of Christ was named in chapter one

🌍 Gentiles sharing the promise shocked people

⛓️ Bonds means real prison chains

📖 Paul is jailed for this very message

## 💡 That I May Make It Manifest, As I Ought To Speak

"Manifest" means making something fully clear and visible, not hidden anymore.

Paul already called the gospel to the Gentiles a mystery once hidden.

"As I ought to speak" admits that even Paul felt the weight of saying it right.

Clear preaching mattered enough to become something Paul prayed for himself.

💡 Manifest means made fully clear

🔓 Paul calls the gospel once hidden

😟 Even Paul felt pressure to speak well

📖 Clear preaching was worth praying for

# Colossians 4:5-6
# 🧂 Wisdom Toward Outsiders
---
## 🚶 Walk In Wisdom Toward Them That Are Without

"Them that are without" means people outside the church, not yet believers.

"Walk" is Paul's common picture for someone's everyday way of living.

Wisdom here means thinking carefully about how daily actions look to watching eyes.

A believer's life was often the only sermon an outsider ever saw.

🚶 Walk means everyday way of living

🌍 Without means people outside the church

👀 Outsiders watch how believers live

📖 Daily life preached its own sermon

## 💰 Redeeming The Time

"Redeeming" means buying back something at a cost, the same word used for a ransom.

Paul pictures time itself as valuable and easily wasted.

Present opportunities will not wait around forever.

This command sits right next to how believers treat outsiders.

💰 Redeeming means buying back at a cost

⏳ Time is treated as valuable

⌛ Opportunities will not wait forever

📖 This connects directly to reaching outsiders

## 🧂 Let Your Speech Be Alway With Grace, Seasoned With Salt

Salt in the ancient world added flavor and also kept food from spoiling.

"Seasoned with salt" pictures speech that stays appealing and never turns rotten.

"Grace" means speech marked by kindness, not harshness or careless words.

Paul wants conversation that is both pleasant to hear and never wasted.

🧂 Salt added flavor and preserved food

🗣️ Seasoned speech stays appealing, not rotten

💛 Grace means kind, not harsh, words

📖 Speech should be pleasant and useful

## 🧠 That Ye May Know How Ye Ought To Answer Every Man

Paul expects believers to actually think before they respond to people.

"Every man" covers any person, friendly or hostile, who asks a hard question.

Wise, gracious speech was meant to be ready, not improvised under pressure.

Good answers take the same kind of preparation as good living does.

🧠 Believers should think before responding

👤 Every man includes hostile questioners

🎯 Good answers need real preparation

📖 Wise speech takes preparation like wise living

# Colossians 4:7-9
# ✉️ Tychicus And Onesimus
---
## ✉️ All My State Shall Tychicus Declare Unto You

Tychicus was one of Paul's trusted traveling companions on several journeys.

"My state" means Paul's current situation, including his imprisonment and his needs.

Letters alone could not carry every detail Paul wanted the church to know.

Tychicus was trusted to fill in the rest in person.

✉️ Tychicus was a trusted companion

📋 My state means Paul's current situation

📜 Letters could not carry every detail

📖 Tychicus filled in the rest in person

## ❤️ A Beloved Brother, And A Faithful Minister And Fellowservant In The Lord

"Beloved brother" names real personal affection, not a formal church title.

"Faithful minister" means someone reliable enough to be trusted with real responsibility.

"Fellowservant" places Tychicus on equal footing with Paul himself, not beneath him.

Three different words describe the same trusted friend from three different angles.

❤️ Beloved brother means real affection

✅ Faithful minister means proven reliability

🤝 Fellowservant means equal standing with Paul

📖 Three words describe one trusted friend

## 🎯 Whom I Have Sent Unto You For The Same Purpose

"The same purpose" points back to verse seven, informing the church and encouraging them.

Paul deliberately sent Tychicus instead of simply hoping news would travel there.

Sending a trusted person in person carried more weight than any letter alone.

This detail shows how seriously Paul took staying connected to this church.

🎯 Same purpose means informing and encouraging

📨 Paul chose to send him deliberately

🤝 A person in person carried more weight

📖 Paul took staying connected seriously

## 📊 That He Might Know Your Estate, And Comfort Your Hearts

"Your estate" means how the Colossians were actually doing as a church.

Paul wanted real information, not just a general greeting exchanged politely.

"Comfort your hearts" means Tychicus brought encouragement along with the information.

News and encouragement traveled together in a single trusted visit.

📊 Estate means how the church was doing

📰 Paul wanted real information, not formality

💛 Comfort your hearts means real encouragement

📖 News and encouragement traveled together

## 🏃 With Onesimus, A Faithful And Beloved Brother, Who Is One Of You

Onesimus was a runaway slave from Colosse named in Paul's letter to Philemon.

He had become a believer and was now returning to his own household.

Paul calls him "one of you," a Colossian, despite his past as a runaway slave.

Calling a former runaway slave a "beloved brother" was a bold claim in that world.

🏃 Onesimus was a runaway slave

📜 He is named in Philemon

🏠 One of you means a Colossian

📖 Beloved brother was a bold claim

## 📍 They Shall Make Known Unto You All Things Which Are Done Here

"Here" means wherever Paul is writing from, likely a Roman prison.

Two trusted messengers, not just one, were sent to share the full report.

Sending a pair of witnesses matched a pattern seen elsewhere in scripture.

The Colossians would get a complete and reliable account of Paul's situation.

📍 Here means Paul's place of imprisonment

👥 Two messengers confirmed the same report

📏 Pairs of witnesses matched scripture's pattern

📖 The church received a reliable account

# Colossians 4:10-13
# 🤝 Paul's Companions Named
---
## 🧳 Aristarchus My Fellowprisoner Saluteth You

Aristarchus was a Macedonian believer who traveled with Paul through earlier chapters of Acts.

"Fellowprisoner" means he shared Paul's imprisonment, not just his ministry.

Few companions stayed loyal enough to risk being jailed alongside Paul.

His name here quietly testifies to real, costly friendship.

🧳 Aristarchus traveled with Paul in Acts

⛓️ Fellowprisoner means he shared the jail time

💔 Few companions risked that kind of loyalty

📖 His name testifies to real friendship

## 📖 Marcus, Sister's Son To Barnabas

"Marcus" is John Mark, later remembered for writing the Gospel of Mark.

He is identified here as Barnabas's cousin, through Barnabas's sister.

Years earlier, Mark had abandoned Paul partway through a missionary journey.

That rift once caused a sharp split between Paul and Barnabas themselves.

✍️ Marcus is John Mark, the Gospel writer

👪 He was Barnabas's cousin

🚪 Mark once abandoned Paul mid journey

📖 That split once divided Paul and Barnabas

## 🤝 Touching Whom Ye Received Commandments, If He Come Unto You, Receive Him

Paul had apparently already sent earlier instructions preparing the church for Mark's visit.

"Receive him" means welcome him fully, without suspicion from his past failure.

This single line quietly reveals that Paul and Mark had fully reconciled.

A broken relationship years earlier did not define Mark's story forever.

📨 Paul had already sent instructions ahead

🤝 Receive him means welcome without suspicion

🔄 This reveals a full reconciliation

📖 A past failure did not define Mark forever

## 🏷️ Jesus, Which Is Called Justus, Who Are Of The Circumcision

This companion shared the common name Jesus, so Paul adds "Justus" to distinguish him.

"Of the circumcision" means he was Jewish by birth, not a Gentile convert.

Paul names him alongside Aristarchus and Mark as one of very few Jewish coworkers left.

That detail hints at how isolated Paul sometimes felt among his own people.

🏷️ Justus distinguished him from others named Jesus

📜 Of the circumcision means Jewish by birth

😔 Few Jewish coworkers remained with Paul

📖 Paul felt isolated from his own people

## 🔢 These Only Are My Fellowworkers Unto The Kingdom Of God

"These only" means just these three Jewish believers stayed working closely with Paul.

Most of his fellow Jewish believers had apparently drifted from his mission by this point.

"A comfort unto me" shows real personal gratitude, not formal politeness.

Even an apostle needed to name the handful of people who stood by him.

🔢 These only names just three people

😔 Most Jewish believers had drifted away

💛 Comfort shows real personal gratitude

📖 Even an apostle needed loyal friends

## 🌱 Epaphras, Who Is One Of You, A Servant Of Christ, Saluteth You

Epaphras likely first brought the gospel to Colosse, as chapter one already mentioned.

"One of you" confirms he was a native Colossian, not an outsider sent in.

He is with Paul now, likely sharing in his imprisonment as well.

His greeting here carries the weight of someone who planted this very church.

🌱 Epaphras likely planted this church

🏠 One of you means a native Colossian

⛓️ He is with Paul, possibly imprisoned too

📖 His greeting carries real weight here

## 💪 Always Labouring Fervently For You In Prayers

"Labouring" is the same word used for exhausting physical work, not casual effort.

"Fervently" pictures intense heat, like water brought all the way to a boil.

Epaphras treated prayer as real, demanding work, not a quick habit before bed.

His distance from Colosse never weakened how hard he prayed for them.

💪 Labouring means exhausting hard work

🔥 Fervently pictures boiling intensity

🙏 Prayer was treated as real work

📖 Distance never weakened his prayer

## 🌳 That Ye May Stand Perfect And Complete In All The Will Of God

"Perfect" here means mature and fully grown, not flawless or sinless.

"Complete" means lacking nothing needed to fully know and do God's will.

Epaphras prayed for exactly what the false teachers in Colosse claimed to offer.

His prayer directly answered the very danger this whole letter was written to confront.

🌳 Perfect means mature, not flawless

✅ Complete means lacking nothing needed

⚠️ False teachers claimed to offer this

📖 This prayer answers the letter's main danger

## ✍️ I Bear Him Record, That He Hath A Great Zeal For You

"I bear him record" means Paul personally vouches for what he is about to say.

"Zeal" means intense, burning devotion, not a mild or passing concern.

Paul backs up Epaphras's hard work with his own personal testimony.

A leader's word carried real weight when it vouched for someone else's character.

✍️ Bear him record means Paul vouches personally

🔥 Zeal means intense burning devotion

🤝 Paul backs Epaphras with his testimony

📖 A leader's word carried real weight

## 🗺️ And Them That Are In Laodicea, And Them In Hierapolis

Laodicea and Hierapolis were nearby cities in the same river valley as Colosse.

All three cities likely received the gospel around the same time, through the same mission.

Epaphras cared about these neighboring churches just as much as his own hometown.

This detail explains why Paul mentions Laodicea again later in this very chapter.

🗺️ Laodicea and Hierapolis were nearby cities

🌊 All three sat in one river valley

❤️ Epaphras cared about all three churches

📖 This sets up Laodicea's mention later

# Colossians 4:14-15
# ⚕️ Luke, Demas, And A House Church
---
## ✍️ Luke, The Beloved Physician

This Luke is the same Luke who wrote the Gospel of Luke and the book of Acts.

"Physician" names his actual trade, a doctor trained in ancient medicine.

He stayed with Paul through much of his imprisonment, based on Paul's other letters.

A doctor's steady presence would have mattered greatly to a prisoner's health.

✍️ Luke wrote the Gospel and Acts

⚕️ Physician names his actual trade

⛓️ He stayed through Paul's imprisonment

📖 A doctor's presence mattered to a prisoner

## 👤 And Demas, Greet You

Demas appears here as just another name among Paul's companions.

Later letters tell a very different story about him.

Second Timothy says Demas abandoned Paul, loving this present world instead.

This ordinary greeting becomes sad in hindsight, once the rest of his story is known.

👤 Demas seems ordinary in this verse

📉 Later he abandoned Paul

🌍 He loved the present world instead

📖 This greeting turns sad in hindsight

## 🗺️ Salute The Brethren Which Are In Laodicea

Laodicea sat near Colosse, in the same river valley.

The two churches stayed in regular contact with each other.

Paul already named this city back in verse thirteen, alongside Epaphras's prayers.

He will mention Laodicea again just two verses from now.

🗺️ Laodicea was a nearby city

🤝 The two churches stayed in contact

🔁 Paul already named it in verse 13

📖 He mentions it again soon

## 🏠 And Nymphas, And The Church Which Is In His House

Early churches had no special buildings and met inside ordinary homes.

Nymphas was likely a wealthy believer whose house was large enough to host the group.

Hosting a church like this required real sacrifice of space, privacy, and resources.

A Christian's home could quietly become a center of ministry for an entire area.

🏠 Early churches met in homes

💰 Nymphas likely had a large house

🤲 Hosting required real sacrifice

📖 A home could become a ministry center

# Colossians 4:16-17
# 📜 Circulate This Letter
---
## 📜 Cause That It Be Read Also In The Church Of The Laodiceans

Paul expected this letter to circulate beyond just one congregation.

Copying a letter by hand took real time.

Sharing it with another church took real effort too.

He wanted the same teaching about Christ to reach the neighboring church too.

This single instruction explains how so many of Paul's letters survived and spread at all.

📜 Paul expected wide circulation

✍️ Copying letters took real effort

🔁 He wanted the teaching to spread

📖 This explains how his letters survived

## 📭 That Ye Likewise Read The Epistle From Laodicea

This mentions a letter to the Laodiceans that has not survived to today.

Scholars have proposed a few different theories about what that letter actually was.

Some believe it may be the same letter known today as Ephesians.

Not every letter Paul wrote made it into the Bible that exists now.

📭 This letter has not survived today

🤔 Scholars debate what it actually was

💡 Some think it may be Ephesians

➡️ Not all of Paul's letters survived

## 👤 Say To Archippus, Take Heed To The Ministry Which Thou Hast Received

Archippus is also named in Paul's letter to Philemon, likely a member of that household.

"Take heed" means pay careful attention, as if something could easily be neglected.

"Ministry which thou hast received" means a role given to him, not one he claimed himself.

Paul addresses him publicly, through the whole church, not privately alone.

👤 Archippus is named in Philemon

⚠️ Take heed means pay careful attention

🎁 His ministry was given, not claimed

📖 Paul addressed him publicly

## 👑 In The Lord, That Thou Fulfil It

"In the Lord" means this assignment came through Christ's own authority, not Paul's opinion.

"Fulfil" means complete it fully, not simply begin it and drift away.

Public accountability like this made it harder for Archippus to quietly let the role slide.

Every believer's calling, however small it looks, still carries this same weight to finish it.

👑 In the Lord means Christ's own authority

✅ Fulfil means complete it fully

👥 Public naming added real accountability

📖 Every calling carries weight to finish

# Colossians 4:18
# 🖋️ Paul's Own Hand
---
## 🖋️ The Salutation By The Hand Of Me Paul

Paul normally dictated his letters out loud to a scribe who wrote them down.

At the very end, he often took the pen himself to add a final personal line.

That closing line in his own handwriting proved the letter truly came from him.

Forged letters claiming to be from Paul were apparently already a real concern.

🖋️ Paul usually dictated to a scribe

✍️ He signed the ending himself

🔏 His handwriting proved the letter real

📖 Forged letters were a real concern

## ⛓️ Remember My Bonds

"Bonds" again means Paul's actual chains, mentioned earlier in this same chapter.

This short line was not meant to produce guilt or pity.

Paul wanted the church to keep praying and standing firm because of his situation.

His imprisonment becomes the very last thing on his mind as the letter ends.

⛓️ Bonds means his actual chains

💭 Not meant to produce guilt

🙏 He wanted ongoing prayer and support

📖 His imprisonment closes the letter

## 🔄 Grace Be With You. Amen.

Paul opened this letter with grace and peace back in chapter one.

He closes it the exact same way, with grace one final time.

"Amen" means let it be so, a word borrowed from Jewish worship and prayer.

The whole letter is framed by this one word from beginning to end.

🔄 Grace opened and closes the letter

🙏 Amen means let it be so

📜 Amen came from Jewish worship

📖 Grace frames the whole letter
`.trim();

export const COLOSSIANS_FOUR_PERSONAL_SECTIONS = parseColossiansFourRawNotes(COLOSSIANS_FOUR_RAW_NOTES);
