export type ActsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwelveRawNotes(rawText: string): ActsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 12:${startVerse}` : `Acts 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Acts 12 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWELVE_RAW_NOTES = `# Acts 12:1-3
# ⚖️ Herod Turns Against The Church
---
## 👑 Herod The King Stretched Forth His Hand

This Herod was Herod Agrippa the First.

He was the grandson of Herod the Great, the king from the Christmas story.

He was also the nephew of Herod Antipas, who had executed John the Baptist.

Rome had placed him over Judea only a few years before this.

Three different men named Herod appear across the New Testament.

Each one brought fresh trouble for God's people.

👑 This Herod was Agrippa the First
🌳 He was Herod the Great's grandson
⚔️ Rome had given him power over Judea
📖 A new Herod now opposed the church

## 🩸 To Vex Certain Of The Church

"Vex" means to attack and cause real harm, not simply to annoy.

Herod began arresting and mistreating believers inside the Jerusalem church.

This was a new kind of threat.

Earlier persecution had come from Jewish leaders alone.

Now the full power of Roman government was turned against the believers.

🩸 Vex means real harm, not annoyance
🏛️ Herod used his government power
⚠️ This was a new kind of threat
📖 Persecution had reached the top of government

## ⚔️ He Killed James The Brother Of John With The Sword

This James was one of the twelve apostles.

He was the brother of John and the son of Zebedee.

He is not the same James who later led the Jerusalem church.

That other James was a half brother of Jesus himself.

James and John had followed Jesus from His earliest days.

Both men had watched Jesus transfigured on the mountain.

⚔️ James was John's brother, son of Zebedee
👥 A different James led the Jerusalem church
🏔️ James had seen Jesus transfigured
📖 He was the first apostle recorded as martyred

## 🎯 Because He Saw It Pleased The Jews

Herod was not acting from personal religious conviction.

He ruled only because Rome allowed it.

He needed the support of local Jewish leaders to stay secure in power.

Killing James won him approval from the same leaders who had opposed Jesus and Stephen.

Persecuting the church was simply good politics for Herod.

👑 Herod ruled only by Rome's favor
🤝 He needed Jewish leaders' support
🎯 Killing James won him their approval
📖 Persecution was good politics for Herod

## 📈 He Proceeded Further To Take Peter Also

Public approval made Herod bolder.

Peter was the most visible leader among the apostles.

Arresting him promised even greater political reward than killing James had.

One success tempted Herod toward a far bigger target.

📈 Approval made Herod more aggressive
🎙️ Peter was the most visible apostle
🎯 Arresting him meant greater political reward
➡️ Success tempted Herod toward a bigger target

## 🍞 Then Were The Days Of Unleavened Bread

The Days of Unleavened Bread were the seven days right after Passover.

During this feast, Jews ate bread made without yeast.

The bread recalled the hurried exodus out of Egypt long ago.

Jerusalem would have been packed with pilgrims for the festival.

Herod likely timed his arrests for maximum attention during this visible season.

🍞 Unleavened Bread followed Passover week
🏙️ Jerusalem was full of pilgrims
📅 Herod timed his move for the festival
📖 God would soon deliver again at this feast

# Acts 12:4-5
# 🔗 Peter Bound In Prison
---
## 🔗 Delivered Him To Four Quaternions Of Soldiers

A quaternion was a squad of four Roman soldiers.

Herod assigned four separate squads to guard Peter around the clock.

Two soldiers stayed chained to him at all times, and two guarded the door.

Shifts rotated so Peter was never left with any opening to escape.

This was sixteen trained soldiers guarding a single prisoner.

🔗 A quaternion was a squad of four
🔄 Guards rotated in constant shifts
🚫 Escape looked completely impossible
📖 Sixteen soldiers guarded one man

## 🗓️ Intending After Easter To Bring Him Forth

The word translated "Easter" here does not mean the Christian holiday.

The original word is "Passover," the Jewish feast happening at that very time.

Herod was waiting for the festival crowds to thin out before executing Peter publicly.

He wanted maximum attention without the complication of festival customs getting in the way.

🗓️ The word here actually means Passover
👀 Herod wanted Peter executed publicly
⏳ He was simply waiting for the right moment
📖 Herod's timing was about politics, not mercy

## 🙏 Prayer Was Made Without Ceasing Of The Church Unto God For Him

"Without ceasing" describes prayer that continued constantly, not an occasional request.

The church had no soldiers and no political power of its own.

Prayer was the one weapon available to them, and they used it fully.

What looked like helplessness was actually the church's greatest strength.

🙏 Without ceasing means constant, not occasional
⚔️ Prayer was the church's only weapon
🤲 They used it with everything they had
📖 Helplessness in Herod's eyes was strength in God's

# Acts 12:6-11
# ✨ An Angel Sets Peter Free
---
## 😴 The Same Night Peter Was Sleeping Between Two Soldiers

Peter's execution was expected the very next morning.

Most people facing death the next day would be too afraid to sleep at all.

Peter slept soundly, chained between two guards, completely at peace.

His calm came from trusting God with an outcome he could not control.

😴 Peter slept the night before his execution
⛓️ He was chained between two guards
🕊️ His peace did not depend on his situation
📖 Trust let Peter rest even here

## ⛓️ Bound With Two Chains

Two separate chains bound Peter's wrists to the soldiers on either side.

This level of restraint left no physical way for him to slip free alone.

Human effort could not explain what was about to happen to Peter.

Only direct, miraculous help could get him out of this.

⛓️ Two chains bound him to two guards
🚫 No human escape was possible
🧍 Peter could not free himself
➡️ Only God could get him out

## ✨ The Angel Of The Lord Came Upon Him, And A Light Shined In The Prison

An angel arrived suddenly, without warning or buildup.

A bright light filled the prison cell in the middle of the night.

This same kind of sudden light had once knocked Saul to the ground on the Damascus road.

God's presence repeatedly breaks into dark, hopeless places throughout the book of Acts.

✨ The angel arrived without warning
💡 Light suddenly filled a dark cell
🔄 God had used light like this before
📖 Darkness is never the final word

## 👐 He Smote Peter On The Side, And Raised Him Up

The angel's touch was firm enough to wake a sleeping man quickly.

This was not a gentle tap but a purposeful, urgent nudge.

There was no time to waste explaining the situation slowly.

God's rescue often requires the person being rescued to get moving immediately.

👐 The angel's touch was firm and urgent
⏰ There was no time to waste
🏃 Peter needed to act right away
➡️ Rescue still required Peter to move

## 🔓 Arise Up Quickly. And His Chains Fell Off From His Hands

The chains did not loosen gradually or require any human effort.

They simply fell away the moment the angel acted.

No lock was picked, and no soldier was bribed or outsmarted.

This detail makes clear the escape was entirely God's doing, start to finish.

🔓 The chains fell off instantly
🙅 No lock was picked by anyone
🧍 No soldier helped or was fooled
📖 This rescue was entirely God's doing

## 👕 Gird Thyself, And Bind On Thy Sandals

The angel gave Peter simple, practical instructions, not mystical riddles.

"Gird thyself" meant tightening his loose outer robe for walking.

Binding on sandals meant preparing his feet for a real journey ahead.

These ordinary details show this was happening in the real world, not only in Peter's mind.

👕 Gird meant tightening his robe to walk
👟 Sandals prepared his feet for travel
🧍 These were ordinary, practical instructions
📖 This rescue was happening in reality

## 😵 Wist Not That It Was True, But Thought He Saw A Vision

"Wist" is an old word meaning to know for certain.

Peter did not yet know this was really happening.

He assumed he was experiencing a vision, like one of his earlier spiritual experiences.

Confusion in the middle of a miracle is a very human reaction.

😵 Wist means to know for certain
❓ Peter did not know this was real
💭 He assumed it was only a vision
📖 Even miracles can feel unreal while happening

## 🚧 When They Were Past The First And The Second Ward

A "ward" was a guard post or checkpoint along the prison's inner halls.

Peter and the angel walked straight past two separate layers of armed guards.

Not one soldier noticed, stopped them, or raised any alarm.

Every human obstacle between Peter and freedom simply failed to work.

🚧 A ward was an armed guard post
👁️ Two separate checkpoints saw nothing
🚫 No alarm was ever raised
➡️ Every obstacle in the way failed

## 🚪 They Came Unto The Iron Gate That Opened To Them Of His Own Accord

This heavy iron gate led directly out into the city streets.

It required no key, no guard, and no human hand to move it.

It opened on its own, exactly when Peter needed it to.

God removed the very last barrier standing between Peter and the open street.

🚪 The iron gate opened by itself
🔑 No key or guard was needed
⏰ It opened exactly when needed
📖 God removed the final barrier himself

## 🙌 Now I Know Of A Surety, That The Lord Hath Sent His Angel

"Surety" means certainty, the opposite of doubt or guesswork.

Peter finally realized, once alone on the street, that this had truly happened.

The confusion from the prison cell gave way to full, settled confidence.

What began as a dazed, dreamlike moment ended in real clarity about God's rescue.

🙌 Surety means certainty, not doubt
🚶 Peter realized the truth once alone
💡 Confusion gave way to full clarity
📖 God's rescue became undeniably real to him

# Acts 12:12-17
# 🚪 Rhoda At The Gate
---
## 🏠 He Came To The House Of Mary The Mother Of John, Whose Surname Was Mark

This Mary was a separate woman from Jesus's mother and from Mary Magdalene.

Her son John Mark later wrote the Gospel of Mark.

He was also a cousin of Barnabas, which connects several threads across the book of Acts.

Her home had clearly become a known gathering place for believers in Jerusalem.

🏠 This was a different Mary entirely
📜 Her son John Mark wrote a Gospel
👨‍👩‍👦 He was also Barnabas's cousin
📖 Her house was a known gathering place

## 🙏 Many Were Gathered Together Praying

This was very likely the same prayer meeting mentioned back in verse five.

The believers had kept praying without stopping, even late into the night.

They had no way of knowing their prayer was already being answered outside.

Persistent prayer continued long after any visible hope seemed to remain.

🙏 This was likely the same prayer meeting
🌙 They prayed on, late into the night
❓ They did not know it was already answered
📖 Persistent prayer continued without visible hope

## 🚪 A Damsel Came To Hearken, Named Rhoda

A "damsel" was a young female servant, likely still a teenager.

To "hearken" means to listen carefully, in this case at the locked gate.

Rhoda's job was simply to check who was knocking before anyone opened the door.

Her name means "rose" in Greek, a small detail preserved alongside a great miracle.

🚪 Damsel means a young servant girl
👂 Hearken means to listen carefully
🔒 Her job was to check the gate
📖 Even her name was preserved by Luke

## 😄 She Opened Not The Gate For Gladness, But Ran In

Rhoda recognized Peter's voice through the closed gate immediately.

Her joy was so sudden and overwhelming that she forgot to let him in.

She left Peter standing outside while she ran to tell everyone the news.

This small, human mistake makes the whole scene feel completely real.

😄 She recognized Peter's voice at once
🏃 Joy made her forget to open the gate
🚶 Peter was left standing outside
📖 This human detail makes the story feel real

## 🙄 It Is His Angel

Many Jews believed that each person had a guardian angel watching over them.

Some believed that angel could appear looking like the person it protected.

The believers assumed Rhoda was mistaken, even after their own prayers had been answered.

The very people praying for Peter struggled to believe God had actually done it.

🙄 Many believed in personal guardian angels
👻 They assumed it looked like Peter
😲 They doubted their own answered prayer
➡️ Faith and doubt can exist together

## 🚪 Peter Continued Knocking

While the believers argued inside, Peter simply kept knocking at the gate.

He had just escaped armed guards and a locked prison.

Now he stood outside a house full of friends who would not let him in.

The miracle of his escape was followed by this small, almost comic delay.

🚪 Peter kept knocking patiently outside
⛓️ He had just escaped armed guards
🏠 Friends kept him waiting at their own door
📖 Even miracles come with ordinary moments

## 📣 Go Shew These Things Unto James, And To The Brethren

This James is not the apostle killed earlier in the chapter.

This is James the brother of Jesus, who now led the Jerusalem church.

Peter's message needed to reach the church's recognized leadership right away.

The church kept functioning with real structure, even in the middle of a crisis.

📣 This James led the Jerusalem church
👥 He was Jesus's brother, not the apostle
🏛️ Leadership needed to hear this first
📖 The church had real structure, even in crisis

## 🚶 He Departed, And Went Into Another Place

Peter did not stay to celebrate or linger in Jerusalem.

Herod would search for him immediately once the escape was discovered.

Wisdom meant disappearing quickly rather than risking recapture out of pride.

Faith in God's rescue did not remove the need for ordinary caution.

🚶 Peter left quickly, without delay
🔎 Herod would search for him soon
🧠 Wisdom meant caution, not recklessness
➡️ Trusting God did not mean ignoring danger

# Acts 12:18-19
# 🪖 Herod's Fury
---
## 😨 There Was No Small Stir Among The Soldiers

"No small stir" is a KJV way of saying there was a great commotion.

The soldiers guarding Peter woke to find him gone and no explanation available.

Losing a high profile prisoner under heavy guard was a career ending disaster for them.

Fear, not curiosity, is what drove the panic that morning.

😨 No small stir means a great commotion
🔗 Peter had vanished under heavy guard
💼 This threatened the soldiers' lives and careers
📖 Fear drove the panic that morning

## ⚖️ He Examined The Keepers, And Commanded That They Should Be Put To Death

Roman military law held guards personally responsible for prisoners who escaped.

A guard who lost a prisoner could face the very penalty meant for that prisoner.

These soldiers paid with their lives for something they could not have prevented.

Herod's cruelty toward the church now extended to men who had simply failed him.

⚖️ Roman law held guards personally responsible
🔗 A missing prisoner could cost a guard's life
😢 These men died for something beyond their control
📖 Herod's cruelty spread even to his own soldiers

## 🏖️ He Went Down From Judaea To Caesarea

Caesarea sat on the Mediterranean coast and served as Rome's administrative center in the region.

Herod likely left Jerusalem both embarrassed and to attend to other government business.

The city later becomes important again when Paul is held there years afterward.

Herod's humiliation over Peter did not end his reign, at least not yet.

🏖️ Caesarea was Rome's regional headquarters
🚶 Herod left Jerusalem embarrassed
🔗 Caesarea later matters again for Paul
➡️ Herod's power continued a little longer

# Acts 12:20-23
# 💀 Herod's Final Pride
---
## ⚔️ Herod Was Highly Displeased With Them Of Tyre And Sidon

Tyre and Sidon were wealthy coastal cities, both outside Herod's direct rule.

The exact cause of the dispute is not recorded in the text.

What is clear is that these cities depended on Herod's territory for food supplies.

That dependence gave Herod real leverage to pressure them.

⚔️ Tyre and Sidon were wealthy coastal cities
❓ The text does not record the cause
🌾 These cities needed food from Herod's land
📖 That need gave Herod leverage over them

## 🤝 Having Made Blastus The King's Chamberlain Their Friend

A chamberlain managed the king's household and had direct, personal access to him.

Winning Blastus over meant winning a shortcut straight to Herod's ear.

This was political influence bought through personal favor, not official channels.

Ancient courts often worked less through policy and more through exactly this kind of access.

🤝 A chamberlain had direct access to the king
🔑 Blastus was a shortcut to Herod
💰 Influence came through favor, not policy
📖 Access mattered more than official process

## 👑 Arrayed In Royal Apparel, Sat Upon His Throne

The ancient historian Josephus records this same event in separate detail.

He describes Herod's robe as woven with silver thread that caught the sunlight brightly.

Herod staged this appearance carefully, dressed to look as dazzling as possible.

The scene was built entirely around impressing and overwhelming the watching crowd.

👑 Josephus also records this same event
✨ His robe shone brightly with silver
🎭 Herod staged the moment deliberately
📖 It was built to overwhelm the crowd

## 😲 It Is The Voice Of A God, And Not Of A Man

The crowd's flattery crossed a serious line from admiration into outright worship.

Calling a ruler divine was common flattery across the ancient world at the time.

Herod said nothing to correct them or turn the praise back toward God.

His silence was not humility, since silence here meant full acceptance of the praise.

😲 The crowd crossed into open worship
🌍 This kind of flattery was common then
🤫 Herod said nothing to correct it
📖 His silence accepted the worship fully

## ⚡ The Angel Of The Lord Smote Him, Because He Gave Not God The Glory

Judgment came immediately, with no delay between the sin and its consequence.

The same phrase, "the angel of the Lord," had just freed Peter earlier in this chapter.

One angelic visit brought rescue, and the other brought judgment, within the same chapter.

Herod's pride is answered the same way James's sword and Peter's chains once were.

⚡ Judgment came immediately, with no delay
🔄 The same angel phrase freed Peter earlier
⚖️ Rescue and judgment appear side by side
📖 Pride before God never ends well

## 🪱 He Was Eaten Of Worms, And Gave Up The Ghost

Josephus separately records that Herod suffered days of severe stomach pain before dying.

"Eaten of worms" likely describes a real and genuinely painful parasitic illness.

"Gave up the ghost" is an older way of simply saying he died.

A king who accepted worship as a god died from an entirely human disease.

🪱 Josephus records days of severe pain
🦠 This was likely a real illness
💀 Gave up the ghost simply means died
📖 A would be god died a human death

# Acts 12:24-25
# 🌱 The Word Of God Grew
---
## 🌱 But The Word Of God Grew And Multiplied

Herod is dead, but the gospel is not.

A king who killed an apostle and silenced a church could not silence this.

Luke places this sentence immediately after Herod's death on purpose.

Human power rises and falls, but the word of God keeps spreading regardless.

🌱 Herod died, but the gospel did not
👑 Even kings cannot silence this word
🔄 Luke placed this right after Herod's death
📖 Human power fades, God's word spreads on

## 🔙 Barnabas And Saul Returned From Jerusalem, When They Had Fulfilled Their Ministry

This ministry was the famine relief mission described back in Acts eleven.

They had delivered the Antioch church's gift safely to the believers in Jerusalem.

Their task finished, they now head back to continue the work waiting for them.

The chapter closes on ordinary faithfulness, not on anything dramatic at all.

🔙 This was the famine relief mission
🎁 They had delivered the gift safely
✅ Their task in Jerusalem was finished
📖 The chapter ends on quiet faithfulness

## 👦 And Took With Them John, Whose Surname Was Mark

This is the same John Mark from Mary's house earlier in this chapter.

He now joins Barnabas and Saul as a companion in ministry.

He later travels with them on the first missionary journey described soon after this.

A young man present for a late night miracle now steps into a much larger story.

👦 This is the same John Mark from before
🧍 He joins Barnabas and Saul directly
✈️ He later joins the first missionary journey
➡️ A small role grows into a larger one
`.trim();

export const ACTS_TWELVE_PERSONAL_SECTIONS = parseActsTwelveRawNotes(ACTS_TWELVE_RAW_NOTES);
