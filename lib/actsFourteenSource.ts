export type ActsFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsFourteenRawNotes(rawText: string): ActsFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 14:${startVerse}` : `Acts 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 14 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_FOURTEEN_RAW_NOTES = `# Acts 14:1-4
# 🗣️ A City Splits Over The Gospel
---
## It Came To Pass In Iconium

Iconium was a Roman city in the region of Lycaonia, in what is now central Turkey.

Paul and Barnabas had just been thrown out of Antioch in Pisidia one chapter earlier.

They did not slow down after that rejection.

They walked straight into the next city and preached again.

🏙️ Iconium sat in the region of Lycaonia

🗺️ It is now part of modern Turkey

🚶 They had just been forced out of Antioch

📖 Rejection did not stop their mission

---

## Went Both Together Into The Synagogue

A synagogue was the local Jewish meeting place for prayer and the reading of scripture.

Paul almost always started preaching there first in a new city.

It gave him listeners who already knew the Hebrew scriptures his message was built on.

Barnabas went in with him rather than splitting up to cover more ground.

🏛️ Synagogue means the Jewish meeting house

📜 It held people who already knew scripture

🤝 Barnabas stood beside him, not apart

➡️ Shared scripture made the message land faster

---

## Stirred Up The Gentiles

"Stirred up" means they deliberately provoked anger and suspicion that was not already there.

The unbelieving Jews could not win the argument using scripture.

So they worked on emotion instead of evidence.

Turning the Gentiles against the message was easier than answering it.

🔥 Stirred up means deliberately provoked

🗯️ They could not win the argument honestly

😠 Emotion replaced evidence in their attack

📖 Opposition often targets feelings instead of truth

---

## Evil Affected Against The Brethren

"Evil affected" means their minds were turned sour and hostile.

"The brethren" refers to the new believers in Iconium, not just Paul and Barnabas.

This was not simple disagreement.

It was a planted hostility aimed at a whole new church family.

💔 Evil affected means turned hostile

👨‍👩‍👧 Brethren means the new believers there

🎯 The attack targeted a whole community

📖 Attacks can aim past leaders to people

---

## Signs And Wonders To Be Done By Their Hands

God backed up their bold preaching with visible miracles.

"Signs and wonders" means acts only God could perform, done as proof of His message.

Paul and Barnabas held no such power on their own.

Chapter thirteen already showed this same pattern in Cyprus and in Antioch of Pisidia.

✨ Signs and wonders means real miracles

💪 Paul and Barnabas held no such power

🔁 Chapter thirteen already showed this pattern

📖 God backed their preaching with real proof

---

## The Multitude Of The City Was Divided

The city split into two camps over the message.

Some sided with the Jewish leaders who rejected Paul.

Others sided with the apostles and their message.

A clear gospel message rarely leaves a crowd neutral.

⚖️ The city split into two camps

👥 Some sided with the Jewish leaders

🙌 Others sided with the apostles

📖 Truth tends to divide a crowd

# Acts 14:5-7
# 🏃 Fleeing But Not Stopping
---
## Use Them Despitefully

"Despitefully" means with deliberate cruelty and contempt.

This was no longer just an argument.

Jews and Gentiles who normally distrusted each other joined forces for one purpose.

Hatred of the gospel united two groups who agreed on almost nothing else.

😡 Despitefully means with deliberate cruelty

🤝 Two normally hostile groups united

⚔️ Jews and Gentiles joined forces here

📖 Hatred can unite unlikely allies

---

## To Stone Them

Stoning was the ancient method of execution by crowd, not just injury.

This was a plan to kill Paul and Barnabas outright.

The threat was real enough that they chose to flee rather than stay and face it.

Fleeing here was wisdom, not fear.

🪨 Stoning meant death, not just harm

⚠️ The plan was to kill them

🏃 They chose to flee the threat

📖 Fleeing danger can be wisdom

---

## They Were Ware Of It

"Ware" means aware or informed ahead of time.

Someone warned Paul and Barnabas before the mob could act.

That early warning gave them time to escape instead of being caught by surprise.

They were not stumbling into danger blind.

👀 Ware means aware or informed

🗣️ Someone warned them in advance

⏱️ Early warning bought them time

📖 God's people were not caught by surprise

---

## Fled Unto Lystra And Derbe

Lystra and Derbe were smaller cities in the region of Lycaonia.

They sat further inland, away from larger cities like Iconium.

Moving to a smaller city for safety did not mean the mission paused.

These smaller cities mattered just as much as the ones they left.

🗺️ Lystra and Derbe sat in Lycaonia

🏘️ Both were smaller, less central cities

🚶 Moving did not mean stopping

➡️ Even in hiding, the mission continued

---

## There They Preached The Gospel

Paul and Barnabas kept doing the one thing that had made them targets.

They did not quiet down after being nearly killed in Iconium.

A fresh city simply meant a fresh audience for the same message.

Fear never got the final word in their plans.

🗣️ They preached again right away

🔁 Same message, a brand new city

💪 Danger did not silence them

📖 The mission outlasted the threat

# Acts 14:8-10
# 🦵 A Lifelong Cripple Walks
---
## Impotent In His Feet

"Impotent" here means powerless or without strength, not able to move at all.

His feet could not support his weight or carry him anywhere.

This was not a limp or a minor injury.

It was complete disability from his legs down.

🦵 Impotent means powerless or without strength

🚫 His feet could not hold him up

❌ This was complete disability, not a limp

📖 This man's condition was beyond ordinary help

---

## A Cripple From His Mother's Womb

This man had never once walked in his entire life.

His condition went back to birth, not an accident or illness later on.

Everyone in Lystra likely already knew his story.

Decades of total disability made this healing impossible to fake.

👶 Disabled since the moment of birth

📆 Likely decades without ever walking

🏙️ His story was already known in Lystra

📖 A healing this old could not be faked

---

## Stedfastly Beholding Him

"Stedfastly beholding" means Paul looked at him with a fixed, steady gaze.

He was not glancing past the man in the crowd.

Paul was reading something in him before he ever spoke a word.

Real attention often comes before real change.

👁️ Stedfastly beholding means a fixed, steady look

🙅 Not a passing glance in a crowd

🤔 Paul was studying him closely

📖 Attention came before the miracle

---

## Perceiving That He Had Faith To Be Healed

Paul somehow recognized faith in this man before doing anything at all.

That faith likely grew from hearing Paul preach just moments earlier.

The healing was not random.

It responded to something real already happening inside the man.

🔍 Paul perceived faith before acting

👂 That faith grew from hearing him preach

🎯 The healing was not random

📖 Faith often grows while someone listens

---

## Stand Upright On Thy Feet

This was a direct command, not a gentle suggestion or a quiet prayer.

Paul spoke with a loud voice on purpose, so the whole crowd could hear it.

A public command made the coming miracle impossible to hide later.

The whole city was meant to witness this.

📢 A direct command, not a prayer

🔊 Spoken loudly for the whole crowd

👀 Made public on purpose

📖 A public miracle cannot be denied later

---

## He Leaped And Walked

The healing was instant and complete, not a slow recovery over days.

He did not just stand carefully.

He leaped, using legs that had never once held him before.

God left no room for doubt in how this happened.

⚡ The healing happened instantly

🦵 Legs that never worked now carried him

🤸 He leaped, he did not just stand

📖 God's power left no room for doubt

# Acts 14:11-13
# 🏛️ Mistaken For Gods
---
## In The Speech Of Lycaonia

Lycaonia had its own local language, separate from the Greek most cities used for trade.

Paul and Barnabas likely did not understand what the crowd was shouting among themselves.

That language gap meant a misunderstanding could grow before anyone could correct it.

🗣️ Lycaonia had its own local language

🌐 Different from the common Greek of trade

🙉 Paul may not have understood the shouting

📖 A language gap let confusion spread

---

## The Gods Are Come Down To Us In The Likeness Of Men

This does not mean the crowd mistook Paul for a figure sent by the one true God.

Greek and local mythology told stories of gods visiting earth disguised as ordinary people.

A sudden miracle fit that old story perfectly in their minds.

So they assumed two gods had simply walked into their city.

📚 Greek myths told of gods visiting as men

🧠 The miracle fit a story they already believed

🙅 Not a claim about the one true God

📖 A real miracle got the wrong story

---

## They Called Barnabas, Jupiter

Jupiter was the chief god in Roman mythology, ruler over all the other gods.

Barnabas likely appeared older or more commanding in presence.

That alone was enough for the crowd to hand him their highest title.

⚡ Jupiter was the chief Roman god

👑 Ruler over all the other gods

🤔 Barnabas looked the part to this crowd

📖 A crowd's guess was still badly wrong

---

## And Paul, Mercurius

Mercurius, known in Greek as Hermes, was the messenger god, famous for speaking for the others.

Paul was the one who had actually done the talking.

That detail alone was enough for the crowd to name him the messenger god.

🪽 Mercurius was the messenger god

🗣️ Paul had done most of the speaking

🎭 The crowd matched roles to Roman myth

📖 Being the speaker earned him that title

---

## The Priest Of Jupiter

Every major city this size kept its own temple with an assigned priest.

Lystra had a standing temple dedicated to Jupiter, their chief god.

That priest's involvement meant this was not a passing rumor.

It was about to become an organized act of worship.

⛪ Lystra had a temple to Jupiter

🧑‍⚖️ A priest led worship there

📢 His involvement made this official

📖 Mistaken worship was about to be formalized

---

## Brought Oxen And Garlands Unto The Gates

Oxen were valuable animals, offered as the highest kind of sacrifice available.

Garlands were decorative wreaths, used to crown both an offering and the person being honored.

Bringing both to the city gates meant this sacrifice was about to happen publicly.

🐂 Oxen were the costliest kind of offering

🌿 Garlands were decorative wreaths of honor

🚪 Done publicly at the city gates

📖 Paul and Barnabas were about to be worshiped

# Acts 14:14-18
# 🙌 Only Men, Not Gods
---
## They Rent Their Clothes

"Rent" means tore, not borrowed or arranged.

Tearing your own clothes was a dramatic Jewish sign of horror or grief.

Paul and Barnabas reacted to being worshiped the same way they would react to blasphemy.

👕 Rent means tore apart

😱 A dramatic sign of horror or grief

🙏 Worship aimed at them felt like blasphemy

📖 Their reaction rejected the worship outright

---

## Ran In Among The People, Crying Out

They did not calmly explain themselves from a distance.

They physically pushed into the crowd before the sacrifice could begin.

Every second mattered once oxen and a priest were already at the gate.

🏃 They ran straight into the crowd

⏱️ Every second mattered before the sacrifice

🚫 Not a calm explanation from a distance

📖 Urgency showed how seriously they took this

---

## Men Of Like Passions With You

This does not mean Paul and Barnabas were being falsely humble.

"Passions" here means ordinary human nature, including weakness and need.

They were plainly saying they were not gods, just two men like anyone else in the crowd.

🙅 Not false humility on their part

👤 Passions means ordinary human nature

🤝 They claimed to be just like the crowd

📖 Honesty mattered more than being worshiped

---

## Turn From These Vanities Unto The Living God

"Vanities" means empty, worthless things, here referring to lifeless idols the city worshiped.

Jupiter and Mercurius could not see, hear, or act.

"The living God" stands in direct contrast, a God who actually made everything that exists.

🗑️ Vanities means empty, worthless things

🗿 Idols could not see, hear, or act

🌍 The living God actually made everything

📖 A lifeless idol stands against a living God

---

## Suffered All Nations To Walk In Their Own Ways

"Suffered" here means allowed or permitted, not experienced pain.

God let other nations follow their own paths for a long stretch of history.

This was not approval of what they did.

It was patience, giving space before judgment or correction came.

🚦 Suffered means allowed, not endured

⏳ God gave nations a long stretch of time

🙅 Not approval of their paths

📖 Patience is not the same as agreement

---

## Left Not Himself Without Witness

Even nations with no scripture still had reasons to recognize God.

Paul points to ordinary, visible proof instead of a holy book they had never seen.

Creation itself was testifying to God long before any missionary arrived.

🌦️ Even without scripture, proof was visible

☁️ Rain and harvest were that proof

📜 No holy book was required to see it

📖 Creation testified before any preacher arrived

---

## Filling Our Hearts With Food And Gladness

God's goodness toward every nation shows up in something as basic as a full stomach.

A good harvest was never random luck in Paul's thinking.

It was a quiet gift, repeated every season, from a God most of the crowd had never named.

🌾 A good harvest was never random

🍽️ Food and joy came from God's hand

🔁 This gift repeated every single season

📖 Ordinary blessings pointed to an unnamed giver

---

## Scarce Restrained They The People

"Scarce restrained" means they barely succeeded, not that it was easy.

The crowd still wanted to go through with the sacrifice even after hearing the correction.

Good preaching does not always change a crowd's mind right away.

🙌 Scarce restrained means barely succeeded

😬 The crowd still wanted to sacrifice

🗣️ Hearing truth did not erase old belief

📖 Correction can be heard and still resisted

# Acts 14:19-20
# 🪨 Stoned And Still Standing
---
## Certain Jews From Antioch And Iconium

These were not new enemies.

They were the same opponents who had already driven Paul out of two earlier cities.

They traveled a real distance just to finish what they had started.

🚶 The same enemies from two earlier cities

🗺️ They traveled far to keep opposing him

🎯 Their hostility followed him on purpose

📖 Some opposition does not stay behind

---

## Having Stoned Paul, Drew Him Out Of The City, Supposing He Had Been Dead

This was a real stoning, meant to kill, not just frighten him.

Those who dragged his body out believed he had already died.

Paul later wrote about scars he carried from attacks like this for the rest of his life.

🪨 A real attempt to kill him

💀 They believed he was already dead

🩹 Paul carried lasting scars from attacks like this

📖 This mission carried a real physical cost

---

## As The Disciples Stood Round About Him

A small group of new believers in Lystra gathered around Paul's body.

They had only just come to faith days earlier.

Standing over what looked like a corpse took real courage for brand new believers.

👥 New believers gathered around his body

📆 They had only just come to faith

💪 Standing there took real courage

📖 Young faith can still act bravely

---

## The Next Day He Departed With Barnabas To Derbe

Paul did not rest for weeks to recover.

He walked back into the city that had just tried to kill him.

Then he left for the next city the very next day.

That pace reveals how urgent this mission felt to him.

🚶 He kept moving the very next day

🏙️ He walked back into the hostile city

⏱️ No long recovery before the next stop

📖 Urgency outweighed his own safety

# Acts 14:21-23
# 🧑‍🤝‍🧑 Strengthening What They Started
---
## They Returned Again To Lystra, And To Iconium, And Antioch

These were the exact three cities where Paul had just been persecuted and nearly killed.

Most people would avoid a place that had tried to stone them.

Paul walked straight back in to strengthen the believers he had left behind.

🔁 The same three hostile cities

🙅 Most people would avoid returning there

💪 Paul went back to strengthen believers

📖 New faith mattered more than old danger

---

## Confirming The Souls Of The Disciples

"Confirming" means strengthening something already standing, not starting from zero.

These new believers had faith, but it was still young and untested.

Paul's return visit gave them a second dose of teaching to hold onto.

🏗️ Confirming means strengthening, not starting over

🌱 Their faith was still young

📚 A return visit added needed teaching

📖 New believers need more than a start

---

## Through Much Tribulation Enter Into The Kingdom Of God

Paul had just been stoned and nearly killed in one of these very cities.

He was not hiding that cost from the new believers to make the message sound easier.

He told them plainly that hardship was a normal part of following God.

🪨 Paul had just lived this himself

🙅 He did not soften the warning

⚠️ Hardship was presented as normal

📖 Suffering does not mean God has failed

---

## Ordained Them Elders In Every Church

"Ordained" means formally appointed to a position of responsibility.

"Elders" were mature believers given the job of leading and teaching a local church.

Paul did not plan to stay in any of these cities permanently.

Appointing local leaders meant the church could keep growing after he left.

📋 Ordained means formally appointed

🧑‍🤝‍🧑 Elders led and taught locally

🚶 Paul was not staying permanently

📖 Local leadership let the church outlast his visit

---

## Prayed With Fasting

Fasting means going without food for a set time to focus fully on prayer.

This was a serious, deliberate act, not a quick blessing said in passing.

Appointing elders was treated as a weighty decision, not a casual one.

🍽️ Fasting means going without food to focus

🙏 Paired here with serious prayer

⚖️ Leadership was treated as a weighty choice

📖 Important decisions got real attention

---

## Commended Them To The Lord

"Commended" means entrusted or handed over for safekeeping.

Paul was leaving the city, but he was not leaving these churches unprotected.

He placed their ongoing care directly into God's hands rather than his own.

🤲 Commended means entrusted for safekeeping

🚶 Paul was about to leave the city

🙏 He placed their care in God's hands

📖 Human leaders leave, God's care does not

# Acts 14:24-28
# 🚪 A Door Opened For The Gentiles
---
## Passed Throughout Pisidia

Pisidia was the same mountainous region where Antioch of Pisidia sat, a city from earlier in this journey.

Paul and Barnabas were retracing their own route home.

They were not taking a new, safer path.

🏔️ Pisidia was the same mountain region from before

🔁 They were retracing their own route

🙅 Not a safer new path

📖 They returned the way the danger had been

---

## Preached The Word In Perga

Perga was a city they had passed through quickly on the way out, back in chapter thirteen.

This time they stopped and actually preached there.

A city once skipped over got a second chance to hear the message.

🏙️ Perga was skipped quickly the first time

🔁 This time they stopped to preach

⏳ A second chance to hear the gospel

📖 No city was written off permanently

---

## Sailed To Antioch

This Antioch is Antioch in Syria, the church that had originally sent Paul and Barnabas out.

Sailing there by ship marked the real end point of the trip.

They were coming home to report, not starting something new.

⛵ Sailed to Antioch in Syria

🏠 The church that had sent them out

🔁 The trip's true ending point

📖 Missionaries report back to those who sent them

---

## Recommended To The Grace Of God

"Recommended" means formally entrusted into someone's care, like a letter of reference.

The Antioch church had placed Paul and Barnabas directly into God's grace before they ever left.

That same grace had carried them through riots, a stoning, and what looked like death.

📨 Recommended means formally entrusted

🙏 The church placed them in God's care

🪨 That grace carried them through real danger

📖 What was promised at the start held true

---

## Gathered The Church Together

Paul and Barnabas did not just quietly resume their old routine.

They called a specific meeting to report what had happened.

A sending church deserves to hear the real story of what its missionaries faced.

📣 They called a specific meeting

🏠 The sending church deserved a full report

🗣️ Not a quiet, private return

📖 Sending a missionary means staying informed

---

## Rehearsed All That God Had Done With Them

"Rehearsed" means told the whole story in order, not a quick summary.

Riots, a healing, a false worship scare, and a stoning all got told in full.

Nothing about this journey was softened for the home church.

🗣️ Rehearsed means told the whole story

🪨 Danger and miracles were both included

🙅 Nothing was softened for the home church

📖 A full report honored what God had done

---

## Opened The Door Of Faith Unto The Gentiles

"Opened the door" means God made it genuinely possible for non Jews to belong to the faith.

This was a brand new era for the church, not just one successful trip.

The healed man in Lystra and the near riot in Iconium were both part of this same door opening.

🚪 Opened the door means made it possible

🌍 Gentiles could now belong fully

🔗 Every event in this chapter fed into it

📖 One journey opened a door for the world

---

## Abode Long Time With The Disciples

After months of preaching and real danger, they finally stopped moving for a while.

Resting with the believers in Antioch was not laziness.

Even a demanding mission needs a season of real rest.

🛑 They finally stopped moving for a while

🏠 Rest came with their home church

😮‍💨 Even their mission needed a pause

📖 Rest is part of a sustainable mission
`.trim();

export const ACTS_FOURTEEN_PERSONAL_SECTIONS = parseActsFourteenRawNotes(ACTS_FOURTEEN_RAW_NOTES);
