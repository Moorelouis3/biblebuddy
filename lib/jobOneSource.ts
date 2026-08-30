export type JobOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobOneRawNotes(rawText: string): JobOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 1:${startVerse}` : `Job 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Job 1 sections, received " + sections.length);
  }

  return sections;
}

const JOB_ONE_RAW_NOTES = `# Job 1:1-3
# 🏜️ Job, A Man In Uz
---
## 🗺️ There Was A Man In The Land Of Uz

Uz was a real region, likely east of Israel, possibly near Edom.

Job was probably not an Israelite at all.

The Bible does not tie Job's story to Israel's history or law.

This book speaks to universal human suffering, not one nation's story.

🗺️ Uz sat east of Israel

🌍 Job was likely not an Israelite

📜 The book skips Israel's history

📖 Job's story speaks to everyone

## 🧩 Perfect And Upright

Perfect here does not mean without any flaw.

It means whole, complete, and fully devoted to God.

Upright means his life matched what he claimed to believe.

Job was not sinless, but his character was solid all the way through.

🧩 Perfect means whole and complete

🎯 Upright means consistent character

🚫 Not the same as sinless

📖 Job's integrity ran all the way through

## 🙏 One That Feared God, And Eschewed Evil

Fearing God does not mean living in constant terror of Him.

It means taking God seriously enough to obey and honor Him.

Eschewed is an old word meaning he deliberately turned away from evil.

Job's respect for God shaped every choice he made.

🙏 Fear of God means deep reverence

🚫 Eschewed means deliberately avoided

⚖️ Job's respect shaped his choices

📖 Reverence guided his whole life

## 🔟 Seven Sons And Three Daughters

Seven and three add up to ten.

Ten often signals completeness in the Bible.

A full set of sons and daughters marked a fully blessed household.

This detail sets up exactly how much Job stood to lose.

🔟 Seven plus three equals ten

✅ Ten often signals completeness

👨‍👩‍👧‍👦 A full, blessed household

📖 This sets up how much he could lose

## 👑 The Greatest Of All The Men Of The East

This phrase names Job as the wealthiest man in his entire region.

The east likely refers to the desert lands beyond the Jordan River.

No one nearby could match his flocks, his herds, or his household.

The story is about to test exactly how much this greatness can survive.

👑 Job was the wealthiest man around

🧭 The east means desert lands beyond Jordan

🐑 No one matched his flocks and herds

📖 His greatness is about to be tested

## 🐫 A Very Great Household

Wealth back then was counted in living animals, not coins or cash.

Job owned seven thousand sheep and three thousand camels.

He also had five hundred oxen and five hundred donkeys.

His household staff was too large to count individually.

That much wealth made him a very important man in his region.

🐑 Sheep and camels by the thousands

🐂 Oxen and donkeys by the hundreds

👥 A household too large to count

📖 Wealth measured in living animals

# Job 1:4-5
# 🍷 A Father's Quiet Worry
---
## 🏠 Went And Feasted In Their Houses, Every One His Day

Each son hosted a feast in his own home on his own turn.

This suggests a warm, close family that enjoyed being together often.

The rotation moved from house to house throughout the year.

Wealth gave this family the freedom to celebrate often and generously.

🏠 Each son took a turn hosting

🔄 The feasts rotated house to house

💰 Wealth allowed frequent celebration

📖 This was a close, generous family

## 👧 Sent And Called For Their Three Sisters

The brothers made sure to include their sisters in every feast.

Daughters were not always guaranteed a place at gatherings like this in the ancient world.

This family treated all ten children as equally welcome.

👧 Sisters were included every time

🤝 Not every family did this

👨‍👩‍👧‍👦 All ten children belonged equally

📖 This closeness sets up the coming loss

## 🧼 Job Sent And Sanctified Them

Sanctified means made ceremonially clean and set apart for God.

Job acted as a kind of priest for his own family.

No formal priesthood existed yet in Job's part of the world.

A father took on that spiritual responsibility himself.

🧼 Sanctified means made ceremonially clean

🙏 Job acted as his family's priest

📜 No formal priesthood existed yet

📖 Job carried spiritual duty for his home

## 🔥 Offered Burnt Offerings According To The Number Of Them All

A burnt offering was a sacrifice completely burned up on the altar.

Nothing was kept back for the family to eat afterward.

Job offered one for each of his ten children individually.

The full sacrifice showed his complete devotion, not a partial gesture.

🔥 A burnt offering was fully consumed

🍽️ None of it was eaten

🔟 One offering for each child

📖 Full sacrifice showed full devotion

## 💭 It May Be That My Sons Have Sinned, And Cursed God In Their Hearts

Job worried about sin his children never spoke out loud.

Cursing God in the heart means a private, hidden disrespect toward Him.

Job took invisible sin as seriously as an obvious one.

His faith was not only about actions people could see.

💭 Heart sin means hidden disrespect

👀 Job worried about what he could not see

⚖️ He treated hidden sin seriously

📖 True faith reaches beyond visible actions

## 🔁 Thus Did Job Continually

This was not just one prayer after one feast.

Job repeated this same offering after every round of celebrations.

His devotion to God was steady, not occasional.

The next verses will test exactly how deep that steady faith goes.

🔁 Job repeated this every time

📅 His devotion was steady, not occasional

🙏 Continually means without fail

📖 Steady faith is about to be tested

# Job 1:6-8
# ⚖️ The Heavenly Court
---
## 👼 The Sons Of God Came To Present Themselves Before The LORD

Sons of God here refers to angelic beings, not literal children.

This pictures a heavenly council meeting before God's throne.

Ancient readers understood royal courts where officials reported to a king.

Heaven has its own order, and even angels answer to God.

👼 Sons of God means angelic beings

🏛️ This pictures a heavenly council

👑 Angels report like officials to a king

📖 Even heaven has order under God

## ⚖️ Satan Came Also Among Them

Satan is a title meaning the accuser or the adversary.

He appears here as a prosecutor bringing a case, not a rival king.

He can only enter this scene because God allows it.

His power here comes with real limits from the start.

⚖️ Satan means the accuser

🗣️ He plays a prosecutor role

🔒 His presence requires God's permission

📖 Limits are built in from the start

## ❓ Whence Comest Thou

God is not asking because He lacks the answer.

The question opens a conversation and draws Satan's claim into the open.

God controls the pace of this whole scene.

❓ God already knows the answer

🗣️ The question opens the conversation

🎛️ God controls the pace here

📖 Nothing catches God off guard

## 🌍 From Going To And Fro In The Earth

This phrase means restless roaming across the whole earth.

Satan describes himself constantly patrolling, watching, looking for an opening.

He is not resting or settled anywhere.

This restlessness pictures how accusation is always on the move.

🌍 Going to and fro means roaming

👀 Satan is always watching for openings

🚶 He never settles anywhere

📖 Accusation is always on the move

## 🙌 Hast Thou Considered My Servant Job

God brings up Job first, without any prompting from Satan.

Calling Job my servant is a title of honor, not just a label.

God openly praises Job's character in front of the whole heavenly court.

This sets the entire test in motion.

🙌 God brings up Job first

🏅 My servant is a title of honor

🗣️ God praises Job publicly

📖 This starts the whole test

# Job 1:9-12
# 🤝 The Wager Over Job's Faith
---
## 💰 Doth Job Fear God For Nought

For nought means for nothing, without any personal benefit.

Satan accuses Job of loving God only because it pays off.

This turns the whole question of Job's faith into a business deal.

The real question becomes whether Job would still worship God with nothing to gain.

💰 For nought means for nothing

🎯 Satan claims Job's faith is selfish

🤔 Faith becomes a business question

📖 True faith needs no reward

## 🌵 Hast Not Thou Made An Hedge About Him

A hedge was a thick, thorny barrier used to protect fields and flocks.

Satan admits God has surrounded Job with total protection.

Nothing bad can reach Job without God allowing it first.

Even Satan's accusation confirms how completely God has guarded him.

🌵 A hedge means a thorny barrier

🛡️ God has fully protected Job

🚧 Nothing reaches Job without permission

📖 Even the accusation proves God's care

## 🙌 Thou Hast Blessed The Work Of His Hands

Satan admits that Job's wealth actually came from God's blessing.

This confirms what the story already said back in verse three.

Even the accuser cannot deny where the blessing came from.

The disagreement is not about the source of the wealth, only about Job's motive.

🙌 Satan admits God caused the blessing

🔁 This matches verse three exactly

🤐 Even Satan cannot deny it

📖 The real dispute is about motive

## 🎯 Put Forth Thine Hand Now, And Touch All That He Hath

Satan proposes a specific test, take away everything Job owns.

He believes Job's faith depends entirely on his comfort and wealth.

This is Satan's theory about to be put on trial.

🎯 Satan proposes removing Job's wealth

🧠 He believes faith depends on comfort

⚗️ This is a theory about to be tested

📖 The test targets his belongings, not himself

## 🗣️ He Will Curse Thee To Thy Face

Satan predicts total failure, that Job will openly turn against God.

To curse God to His face means public, direct rejection.

This is a bold, confident wager on Satan's part.

The rest of the book will prove whether this prediction comes true.

🗣️ Curse to His face means open rejection

🎲 Satan makes a confident bet

📉 He predicts total failure

📖 The book will test this prediction

## 🚧 Only Upon Himself Put Not Forth Thine Hand

God allows the test but sets a clear boundary immediately.

Satan may touch Job's belongings but not his body.

This proves Satan operates only within limits God allows.

Even in permitting suffering, God stays fully in control.

🚧 God sets a clear boundary

🙅 Job's body stays protected for now

🔒 Satan works only within limits

📖 God stays in control even here

# Job 1:13-15
# 🐫 The First Blow
---
## 🍷 There Was A Day When His Sons And His Daughters Were Eating And Drinking Wine

This ordinary family feast looks exactly like the ones described back in verse four.

Nothing about this day looked different or dangerous at first.

Disaster often arrives in the middle of a completely normal moment.

🍷 A normal family feast, like before

😌 Nothing seemed unusual at first

⚡ Disaster struck without warning

📖 Ordinary moments can turn suddenly

## 🐂 The Oxen Were Plowing, And The Asses Feeding Beside Them

This scene describes normal farm work happening far from the family feast.

The servants were simply doing their everyday jobs.

Two completely separate places were about to be struck at once.

🐂 Oxen were plowing the fields

🐴 Donkeys grazed close by

📍 Two places, one single disaster

📖 Everyday work was interrupted by tragedy

## ⚔️ The Sabeans Fell Upon Them, And Took Them Away

The Sabeans were raiders from a region likely in Arabia.

They attacked without warning and stole the animals outright.

This was the first of several tragedies about to hit Job in a single day.

⚔️ Sabeans were raiders from Arabia

🐂 They stole the oxen and donkeys

💥 This was the first of many blows

📖 Loss arrived without any warning

## 💔 Slain The Servants With The Edge Of The Sword

This tragedy is not only about lost animals.

Real workers, real people, lost their lives in this raid.

Job's grief here includes human loss, not just financial loss.

⚔️ Servants were killed, not just robbed

😢 This loss was deeply human

💰 Financial loss was not the whole story

📖 People mattered more than property

## 🔁 I Only Am Escaped Alone To Tell Thee

This exact sentence repeats four times across this chapter.

Each messenger survives only to deliver more devastating news.

The repetition builds a wall of tragedy that lands on Job all at once.

🔁 This exact line repeats four times

🗣️ Each messenger barely survives

🧱 Bad news stacks up quickly

📖 One disaster after another, without pause

# Job 1:16-17
# 🔥 Fire And Raiders
---
## ⚡ The Fire Of God Is Fallen From Heaven

This phrase likely describes a massive lightning strike.

In this culture, dramatic weather was often described as coming from God.

The messenger is not necessarily claiming God personally targeted Job.

The text records the messenger's own words, not a confirmed explanation from God.

⚡ Likely describes a huge lightning strike

🌩️ Dramatic weather was linked to God

🗣️ This is the messenger's own claim

📖 The text does not confirm the cause

## 🔥 Burned Up The Sheep, And The Servants, And Consumed Them

This second disaster wipes out Job's entire flock of sheep.

More servants lose their lives in this same event.

Two major losses land within moments of the first messenger's report.

🔥 The whole flock of sheep is destroyed

😢 More servants lose their lives here

⏱️ This lands right after the first blow

📖 The losses keep compounding quickly

## 🗺️ The Chaldeans Made Out Three Bands

The Chaldeans were raiders associated with the region later known as Babylon.

Three bands means they split into three separate raiding groups.

Splitting into groups let them surround and overwhelm the camels at once.

🗺️ Chaldeans came from the Babylon region

👥 Three bands means three raiding groups

🎯 Splitting up overwhelmed the camels

📖 A coordinated attack, not a random one

## 🐫 Fell Upon The Camels, And Have Carried Them Away

This third disaster removes the very last major asset from Job's wealth.

Livestock, servants, and now transportation are all gone in one day.

Everything listed back in verse three has now been stripped away.

🐫 The camels are stolen this time

📉 Nearly everything from verse three is gone

🔁 Verse three's wealth list unravels here

📖 One day undid a lifetime of blessing

# Job 1:18-19
# 🌪️ The Final Blow
---
## 🏠 Thy Sons And Thy Daughters Were Eating And Drinking Wine In Their Eldest Brother's House

This messenger describes the exact same feast mentioned back in verse thirteen.

All ten children were gathered together in one place at one time.

That gathering is about to become the site of the worst tragedy yet.

🏠 Same feast described back in verse thirteen

👨‍👩‍👧‍👦 All ten children were together

⚠️ One place, about to face disaster

📖 Togetherness could not prevent this loss

## 🏜️ There Came A Great Wind From The Wilderness

The wilderness here likely refers to the desert region east of Job's land.

A great wind suggests something like a violent desert storm.

Nature itself becomes the final instrument of this catastrophe.

🏜️ The wilderness means the desert east of Job

🌪️ A great wind suggests a violent storm

🌍 Nature itself strikes this final blow

📖 No human enemy caused this one

## 🏚️ Smote The Four Corners Of The House, And It Fell Upon The Young Men

The storm struck the house from every direction at once.

No corner offered any safety for those gathered inside.

All ten of Job's children die in this single collapse.

This is the heaviest loss in a day already full of loss.

🏚️ The storm hit all four corners

🚫 No safe corner existed inside

💔 All ten children die together

📖 The heaviest loss of a heavy day

## 🔢 And They Are Dead, And I Only Am Escaped Alone To Tell Thee

This closing line, repeated a fourth time now, ends the messenger pattern.

Four separate disasters arrived back to back without any pause between them.

Job has now lost his wealth, his servants, and every one of his children.

🔢 Four disasters struck without pause

💔 Wealth, servants, and every child gone

😢 Loss came from every direction

📖 Job's whole world collapsed in one day

# Job 1:20-22
# 🙏 Job's Response
---
## 👕 Then Job Arose, And Rent His Mantle, And Shaved His Head

Rending a mantle means tearing an outer robe as a sign of grief.

Shaving the head was another public mourning custom in this culture.

Both actions announced Job's grief to everyone who saw him.

Job mourns immediately and openly, without hiding his pain.

👕 Rending a mantle meant tearing a robe

✂️ Shaving the head signaled deep grief

😢 Both actions were public mourning customs

📖 Job's grief was honest, not hidden

## 🙇 Fell Down Upon The Ground, And Worshipped

Falling to the ground here is not a collapse of despair.

It is a deliberate posture of worship before God.

Job mourns and worships in the very same moment.

This is not a fake calm, it is real faith carrying real grief.

🙇 Falling down was a worship posture

🙏 Mourning and worship happened together

💔 Grief and faith were not opposites

📖 Real faith can carry real pain

## 👶 Naked Came I Out Of My Mother's Womb

Job admits he brought nothing into the world and owns nothing forever.

Every possession he lost was always temporary, never permanently his.

This honest perspective helps explain his shocking calm in this moment.

👶 Job arrived with nothing at birth

⏳ Every possession was always temporary

🧘 This honesty explains his calm

📖 Nothing owned was ever truly permanent

## 🙌 The LORD Gave, And The LORD Hath Taken Away, Blessed Be The Name Of The LORD

Job credits God as the source of both his blessing and his loss.

He does not blame the raiders, the fire, or the storm directly.

Blessing God's name here means Job still honors God despite the pain.

This line becomes one of the most quoted lines in the whole book.

🙌 God gets credit for both gain and loss

🚫 Job does not blame the raiders

📖 Blessing God's name means honoring Him still

➡️ Faith held steady through the pain

## ✅ In All This Job Sinned Not, Nor Charged God Foolishly

This closing verse gives readers a verdict before the story continues.

Job passes this first test completely, without sinning against God.

Charging God foolishly would mean blaming Him unfairly or wrongly.

The real test is not over, this is only the first round.

✅ Job passes this first test

🚫 He does not sin against God

⚖️ Charging God means blaming Him unfairly

📖 This is only the first round
`.trim();

export const JOB_ONE_PERSONAL_SECTIONS = parseJobOneRawNotes(JOB_ONE_RAW_NOTES);
