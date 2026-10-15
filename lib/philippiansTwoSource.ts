export type PhilippiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePhilippiansTwoRawNotes(rawText: string): PhilippiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PhilippiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Philippians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Philippians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Philippians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Philippians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Philippians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Philippians 2:${startVerse}` : `Philippians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Philippians 2 sections, received " + sections.length);
  }

  return sections;
}

const PHILIPPIANS_TWO_RAW_NOTES = `# Philippians 2:1-4
# 🤝 Likeminded In One Accord
---
## ❤️ Any Bowels And Mercies

"Bowels" does not mean the physical organs inside the body.

In the Bible, bowels names the seat of deep feeling.

A modern reader would call that same feeling compassion.

It is close to a gut level tenderness toward someone else.

Paul pairs it here with mercy.

That proves his love for the Philippians runs deep, not polite.

Real unity has to start from that same kind of feeling.

❤️ Bowels means deep inner compassion

🫂 It sits next to mercy here

🙏 Paul's love for them runs deep

📖 Real unity starts from real feeling

## 🤝 Being Of One Accord

"One accord" means everyone moving in the same direction together.

Paul is not asking for forced sameness in every opinion.

He is asking for a shared purpose that holds a church together.

Likeminded here points to shared love and shared goal, not identical personality.

A church can hold different people and still move as one body.

🤝 One accord means shared direction

💞 Same love matters more than sameness

🎯 Unity is shared purpose, not personality

📖 Many people can still move as one

## 😤 Strife Or Vainglory

"Vainglory" means a hollow kind of pride that only wants to be admired.

"Strife" describes conflict that comes from competing for status.

Paul names both together because they come from the same root.

Each one puts self above the group.

😤 Vainglory means empty, attention seeking pride

⚔️ Strife means status driven conflict

🌱 Both grow from the same root

📖 Self interest divides a group quickly

## 🙇 Esteem Other Better Than Themselves

"Lowliness of mind" does not mean thinking poorly of yourself.

It means genuinely valuing someone else's needs above your own comfort.

Esteeming another better does not require pretending they are flawless.

It means choosing to serve them first anyway.

🙇 Lowliness means valuing others genuinely

🎁 It serves someone else's needs first

🚫 It does not mean self hatred

📖 Humility chooses to serve first

## 👀 The Things Of Others

Paul is not telling the Philippians to ignore their own needs completely.

He is correcting a default habit of looking only at personal concerns.

Looking also on the things of others means noticing what someone else needs.

That kind of attention does not happen by accident.

👀 Paul corrects a self focused habit

🔍 Noticing others takes real attention

🙋 Their needs deserve real notice too

➡️ Love pays attention on purpose

# Philippians 2:5-8
# ✨ Christ Empties Himself
---
## 🧠 Let This Mind Be In You

Paul has just described humility among believers.

Now he points to the ultimate example of that humility.

"This mind" means the same mindset just described, thinking of others first.

Jesus Christ is about to be shown as the pattern for it.

What follows is not a comparison among equals.

It is the Creator choosing the lowest possible place.

🧠 This mind means others first thinking

👑 Christ becomes the ultimate example

🪞 Believers are told to copy Him

📖 Humility finds its pattern in Jesus

## 👑 Being In The Form Of God

"Form" here does not mean a temporary appearance or disguise.

It points to the real nature and glory that belong to God alone.

Jesus already existed with that nature before He was ever born on earth.

This verse assumes His full deity before anything else is said about Him.

👑 Form means Christ's real divine nature

🌌 He had this nature before birth

✝️ His deity comes before His humility

📖 Christ was fully God from eternity

## ⚖️ Thought It Not Robbery To Be Equal With God

This phrase does not mean Jesus wrongly claimed something that was not His.

Equality with God was already rightfully His own.

"Robbery" pictures someone grabbing a title that does not belong to them.

Jesus never had to grab for that title, because He already held it.

⚖️ Robbery means wrongly grabbing a title

✅ Equality with God was rightfully His

🙅 He never had to claim it falsely

📖 His glory was real, not stolen

## 🎭 Made Himself Of No Reputation

This phrase describes Christ choosing to set His glory aside.

He did not lose His divine nature.

He chose not to display it the way He could have.

A king stepping out of royal robes into plain clothes keeps his identity.

He simply hides the appearance of it for a time.

👑 Christ set His visible glory aside

🎭 He did not lose His nature

🧥 Like a king in plain clothes

📖 Humility hid His glory, not His identity

## 🧑‍🌾 The Form Of A Servant

"Servant" here describes the lowest possible social position in that world.

A servant owned nothing and served fully at another's command.

The Creator took on that exact position by choice.

He was also made in the likeness of men.

That means a real human body, not just an appearance.

🧑‍🌾 Servant means the lowest social rank

🙇 Servants served fully at another's command

👶 Christ took on a real human body

📖 The Creator chose the lowest place

## 👤 Found In Fashion As A Man

"Fashion" means outward appearance, the way Jesus looked and lived.

Up to this point Paul has described what Christ gave up.

Now he describes what Christ became, visibly, among people.

He walked, ate, grew tired, and was seen as any other man.

Nothing about His outward life revealed the glory hidden underneath.

👤 Fashion means His outward appearance

🚶 He lived visibly as one of us

🙈 His glory stayed hidden underneath

📖 True identity is not always visible

## ⛓️ Obedient Unto Death, Even The Death Of The Cross

Crucifixion was not a dignified way to die in the ancient world.

Rome reserved the cross for slaves, criminals, and rebels.

It was built to humiliate someone publicly, not simply to kill them.

Christ's obedience did not stop at becoming human.

It carried all the way down to the most shameful death available.

⛓️ Crucifixion was Rome's most shameful death

🚫 It was built for slaves and criminals

🩸 Christ's obedience went all the way down

📖 His humility had no floor

# Philippians 2:9-11
# 👑 Every Knee Shall Bow
---
## ⬆️ Highly Exalted Him

"Wherefore" means because of this.

It ties this verse to the humility just described.

God's response to that humility was not silence.

He lifted Jesus to the highest possible place.

The lower Christ went, the higher God raised Him.

⬇️ Wherefore ties this to His humility

⬆️ God raised Christ to the highest place

🔄 The lowest place led to the highest

📖 Humility and exaltation move together

## 🏷️ A Name Which Is Above Every Name

In this culture, a name carried someone's authority and reputation together.

This is not just a title God handed to Jesus.

It places Jesus above every ruler, every force, and every being that exists.

Nothing outranks the name Jesus now carries.

🏷️ A name means real authority

👑 Jesus now outranks every other power

🌌 Nothing in creation stands above Him

📖 His authority has no equal

## 🙇 Every Knee Should Bow

Bowing the knee was a universal sign of submission in the ancient world.

Paul lists three realms, heaven, earth, and under the earth.

That covers every possible kind of being, without exception.

Angels, humans, and every defeated power are included in that bow.

🙇 Bowing shows total submission

🌌 Heaven, earth, and under the earth

♾️ Every kind of being is included

📖 No one stands outside this bow

## 🗣️ Every Tongue Should Confess

Confessing here means publicly declaring something to be true.

This is not a private, quiet opinion about Jesus.

Every tongue, in every language, will one day say the same thing.

Jesus Christ is Lord, and that confession ends in glory to the Father.

The chapter's most beautiful truth is that worship always points back to God.

🗣️ Confess means to publicly declare

🌍 Every language will say the same thing

👑 Jesus Christ is Lord

📖 Worship always returns glory to the Father

# Philippians 2:12-13
# 💪 Working Out Salvation
---
## 😟 Work Out Your Own Salvation With Fear And Trembling

This does not mean a person earns salvation through their own effort.

"Work out" means to carry something already given to its full, lived result.

Salvation here is already theirs, given by grace.

"Fear and trembling" describes serious, careful reverence, not terror of losing it.

Paul wants them to take their faith seriously, every single day.

🚫 Work out does not mean earn it

🌱 It means living out a gift already given

😟 Fear and trembling means serious reverence

📖 Faith is lived out carefully, not earned

## ⚙️ God Which Worketh In You

This verse answers a question the last one might raise.

If believers must work it out, where does the strength come from.

God is the one actually working inside them the whole time.

He shapes both the desire to obey and the ability to follow through.

Human effort and God's power are not opposites here.

They work together, the same way they do throughout this whole chapter.

❓ Where does the strength come from

⚙️ God works inside the believer

🎯 He shapes both desire and ability

📖 Effort and grace work together

# Philippians 2:14-16
# 🌟 Lights In The World
---
## 🤫 Without Murmurings And Disputings

"Murmurings" means complaining quietly under your breath.

"Disputings" means open arguing out loud.

Paul names both the hidden kind and the public kind of complaint.

Together they cover every way frustration can leak out.

🤫 Murmurings means quiet complaining

🗣️ Disputings means open arguing

🙊 Both hidden and open complaint are named

📖 Attitude matters as much as action

## ✅ Blameless And Harmless, The Sons Of God

"Blameless" means no one can rightly accuse them of wrongdoing.

"Harmless" means they bring no damage to the people around them.

Being called sons of God ties their behavior to their identity.

A family's name is at stake in how its members act.

✅ Blameless means no rightful accusation sticks

🕊️ Harmless means causing no damage to others

👨‍👩‍👧 Being God's children raises the stakes

📖 Identity shapes how a family acts

## 🌙 A Crooked And Perverse Nation

This phrase originally described Israel's own generation wandering in the wilderness.

Paul borrows it to describe the wider world the Philippians lived in.

That world twisted what was right and called it normal.

Believers are told to shine like lights against that kind of darkness.

A light is only noticeable because the space around it is dark.

🌙 Crooked and perverse means morally twisted

🌍 It describes the wider world around them

💡 Lights are noticed because of darkness

📖 Contrast makes faithfulness visible

## 🎁 Holding Forth The Word Of Life

"Holding forth" means offering something out for others to take.

The word of life is the message of the gospel itself.

Paul is not just telling them to live well privately.

He wants them actively offering that life to others.

His own joy on the day of Christ depends on their faithfulness now.

🎁 Holding forth means offering it outward

📖 The word of life is the gospel

🙌 Private faithfulness was never the whole goal

➡️ Their faithfulness becomes Paul's joy later

# Philippians 2:17-18
# 🍷 Poured Out In Sacrifice
---
## 🍷 The Sacrifice And Service Of Your Faith

Old Testament offerings were sometimes accompanied by a poured out drink offering.

Paul pictures his own life as that kind of poured out offering.

Their faith is the main sacrifice.

Paul's life is simply poured out alongside it.

Even his own death would not sadden him if it served their faith.

🍷 Drink offerings were poured out beside sacrifices

❤️ Their faith is the real sacrifice

💧 Paul offers his life alongside it

📖 He finds joy even in that cost

## 😊 For The Same Cause Also Do Ye Joy

Paul is not asking them to feel sorry for him.

He wants them to share his joy instead.

Suffering for the gospel and rejoicing are not opposites in this letter.

Joy here does not depend on comfortable circumstances.

It depends on what the suffering is actually for.

😊 Paul wants shared joy, not pity

🔄 Suffering and rejoicing are not opposites

🎯 Joy depends on the purpose, not comfort

📖 Hard circumstances do not cancel real joy

# Philippians 2:19-24
# ✉️ Sending Timothy
---
## 🧑 To Send Timotheus Shortly Unto You

Timotheus is Timothy, a close coworker Paul trusted deeply.

Paul could not travel himself from where he was being held.

Sending Timothy was the next best way to check on the Philippians.

Paul's own comfort was tied to hearing how they were doing.

🧑 Timotheus is Timothy, Paul's trusted coworker

🔒 Paul could not travel there himself

📨 Timothy became Paul's trusted messenger

📖 Paul's comfort depended on their wellbeing

## 🤝 No Man Likeminded

Paul is not saying every other believer around him was useless.

He means no one else shared his specific depth of care for this church.

Timothy's concern for the Philippians was rare, not common.

That is exactly why Paul chose to send him instead of someone else.

🤝 No one matched Paul's depth of care

💎 Timothy's concern was genuinely rare

🎯 That rarity is why Paul chose him

📖 Rare devotion deserves to be noticed

## 😕 All Seek Their Own

This is a hard, honest line about the people around Paul.

Many of them were more concerned with their own interests.

That does not mean they were enemies of the gospel.

It means they simply were not willing to sacrifice like Timothy was.

😕 Many around Paul chased their own interests

🚫 They were not necessarily enemies

⚖️ They just would not sacrifice like Timothy

📖 Real devotion is rarer than it sounds

## 👨‍👦 As A Son With The Father

This phrase pictures a son working loyally alongside his father.

Timothy was not just an employee following Paul's orders.

He served the gospel out of the same loyalty a son shows a father.

That relationship had been proven over real time together.

👨‍👦 A son works loyally beside a father

🤝 Timothy served out of real loyalty

⏳ Their bond had been proven over time

📖 Loyalty like this is earned, not assumed

## 📨 I Also Myself Shall Come Shortly

Paul plans to send Timothy first, as soon as he knows his own situation.

He also still hopes, trusting in the Lord, to visit them himself soon.

Paul's confidence rests in the Lord's timing, not in his own circumstances.

Even while facing an uncertain future, his hope stays steady.

📨 Timothy goes first, as plans allow

🙏 Paul still hopes to visit himself

⚖️ His confidence rests in the Lord

📖 Hope can stay steady in uncertainty

# Philippians 2:25-30
# 🤕 Epaphroditus Comes Home
---
## 🙏 My Brother, And Companion In Labour, And Fellowsoldier

Paul stacks three titles on top of each other for Epaphroditus.

"Brother" names a shared faith.

"Companion in labour" names someone who worked hard alongside Paul.

"Fellowsoldier" names someone who faced real danger standing beside him.

Epaphroditus was also the Philippians' own messenger, sent to care for Paul's needs.

🙏 Brother means a shared faith

💪 Companion in labour means shared hard work

⚔️ Fellowsoldier means shared danger

📖 Epaphroditus carried their care to Paul

## 😟 Full Of Heaviness

"Heaviness" describes deep emotional distress, more than simple worry.

Epaphroditus was not anxious about his own sickness.

The Philippians had heard he was sick.

He knew they were likely worried about him.

His concern was pointed outward, toward people he cared about.

😟 Heaviness means deep emotional distress

🤒 His sickness was already real

❤️ He worried about them, not himself

📖 Real love worries outward, not inward

## ⚠️ Sick Nigh Unto Death

"Nigh unto death" means almost dying.

This was not a mild illness or passing complaint.

Paul wants the seriousness of what happened to be fully understood.

The danger was real, not exaggerated for effect.

⚠️ Nigh unto death means almost dying

🤒 This illness was severe, not minor

📣 Paul wants the danger understood clearly

📖 Real danger deserves real honesty

## 🙏 God Had Mercy On Him

Paul does not credit luck or good medicine for the recovery.

He names God directly as the one who had mercy.

That mercy was not only for Epaphroditus.

Paul says it spared him from even greater sorrow himself.

One person's healing carried relief for more than just that person.

🙏 God gets credit, not luck

❤️ Mercy reached Epaphroditus directly

🤝 Paul's own sorrow was spared too

📖 One healing relieved more than one person

## 🎉 Hold Such In Reputation

Paul asks the church to welcome Epaphroditus home with real joy.

"Hold such in reputation" means give people like him real honor.

Epaphroditus risked his life carrying out his assignment faithfully.

That kind of sacrifice deserves to be noticed publicly, not quietly ignored.

🎉 Welcome him home with real joy

🏅 Hold in reputation means give real honor

⚠️ He risked his life for this task

📖 Faithful sacrifice deserves public honor

## ⚠️ Not Regarding His Life

This phrase means Epaphroditus did not treat his own safety as the priority.

He risked everything to finish what the Philippians could not do themselves.

Paul frames this as service the church owed him, now returned through Epaphroditus.

The chapter opened by asking believers to care for others above themselves.

Epaphroditus is the living example of that exact command, lived out in full.

⚠️ He did not prioritize his own safety

🎯 He finished what they could not do

🔁 The chapter's opening command becomes real here

📖 Epaphroditus lived out verse four himself
`.trim();

export const PHILIPPIANS_TWO_PERSONAL_SECTIONS = parsePhilippiansTwoRawNotes(PHILIPPIANS_TWO_RAW_NOTES);
