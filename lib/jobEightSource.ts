export type JobEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobEightRawNotes(rawText: string): JobEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 8:${startVerse}` : `Job 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 8 sections, received " + sections.length);
  }

  return sections;
}

const JOB_EIGHT_RAW_NOTES = `# Job 8:1-4
# 💨 Words Like A Strong Wind
---
## 🗣️ Bildad The Shuhite

Bildad is the second of Job's three friends to speak.

He already appeared briefly back in chapter two.

Shuhite ties him to Shuah, one of Abraham's sons born through Keturah.

That family line settled in a region east of Israel, likely in Arabia.

Bildad now speaks with the confidence of old, settled tribal wisdom.

🗣️ Bildad is the second friend to speak
📜 Shuhite links him to Abraham's son Shuah
🗺️ That family settled east, likely in Arabia
📖 Bildad speaks from old inherited wisdom

## ❓ How Long Wilt Thou Speak These Things

Bildad opens with two sharp rhetorical questions, not real requests for information.

He is not curious about how long Job will talk.

He wants Job to simply stop.

This kind of question is meant to shame, not to invite an answer.

Bildad speaks first, before offering Job a single word of comfort.

❓ Two questions open with sharp impatience
🤐 Bildad wants Job to simply stop
😠 The question is meant to shame
📖 Comfort comes only after correction here

## 💨 Like A Strong Wind

Bildad compares Job's words to a strong, blowing wind.

Wind in this image carries plenty of noise but nothing solid.

It cannot be grabbed, weighed, or trusted.

Bildad is calling Job's grief filled speech empty air.

This is the same wind image Job used about his own life back in chapter seven.

💨 Wind pictures noise without any substance
🗯️ Bildad calls Job's words empty air
🔁 Job used this same image in chapter seven
📖 Bildad throws Job's own words back at him

## ⚖️ Doth God Pervert Judgment

Pervert here means to twist something straight into something crooked.

Bildad asks whether God bends justice for His own purposes.

The expected answer is an obvious no.

Job never claimed God was unjust, only that his own suffering felt unfair.

Bildad answers a charge Job never actually made.

⚖️ Pervert means to twist something straight
❓ Bildad asks if God bends justice
🙅 The expected answer is a clear no
📖 Job never made the charge Bildad answers

## 👑 The Almighty

Almighty translates the Hebrew title Shaddai.

It points to God's total power over every part of creation.

Job's friends use this title often through the whole book.

Calling God Almighty here raises the stakes of Bildad's question.

A God with that much power could never need to cheat anyone.

👑 Almighty translates the Hebrew title Shaddai
💪 It names God's total power over creation
🔁 Job's friends repeat this title often
📖 Real power has no need to cheat

## 💔 If Thy Children Have Sinned Against Him

Job's ten children died together when a storm collapsed their house back in chapter one.

Bildad now suggests, without proof, that their own sin caused that death.

This is the cruelest line in his entire speech.

Bildad turns a grieving father's tragedy into an accusation.

Nothing earlier in the book supports this claim about the children.

💔 Job's ten children died in chapter one
🗯️ Bildad blames their own sin, unproven
😢 Grief becomes an accusation in this line
📖 The text never supports Bildad's claim here

# Job 8:5-7
# 🌅 Seek Unto God Betimes
---
## ⏰ If Thou Wouldest Seek Unto God Betimes

Betimes is an old word meaning early, without delay.

Bildad tells Job to turn back to God right away, not later.

The word carries urgency, as if time still matters for Job's case.

Underneath this advice sits an assumption that Job has drifted from God.

Job never actually stopped seeking God, even in his loudest complaints.

⏰ Betimes means early, without delay
🌅 Bildad urges Job to turn back now
⌛ The word adds urgency to his advice
📖 Job never really stopped seeking God

## 😴 Surely Now He Would Awake For Thee

Awake here does not mean God was literally asleep.

It pictures God suddenly acting on Job's behalf, like someone jumping up to help.

Bildad promises quick action if Job meets the right conditions first.

This is Bildad's whole argument in miniature.

Be good, and God will respond fast.

Real life, including Job's own story, moves slower and stranger than that formula.

😴 Awake does not mean literal sleep
🏃 It pictures God rushing in to help
⚡ Bildad promises fast results for good behavior
📖 Job's real story moves slower than that

## 🏡 Make The Habitation Of Thy Righteousness Prosperous

Habitation simply means home or dwelling place.

Bildad promises that righteous living will make Job's home thrive again.

This reflects a common ancient belief.

Good behavior was expected to guarantee good outcomes.

The book of Job as a whole pushes back hard against that formula.

Job's suffering happens for reasons far bigger than any sin of his own.

🏡 Habitation means home or dwelling place
🌾 Bildad promises a thriving home again
⚖️ Ancient belief linked goodness to blessing
📖 Job's story pushes back on that formula

## 📈 Thy Latter End Should Greatly Increase

Latter end means the final stretch of Job's life, not just next week.

Bildad promises growth on the far side of Job's suffering.

He means this as a conditional reward for repentance.

Chapter forty two later says Job's latter end was blessed even more than his beginning.

The ending arrives, but not for the reason Bildad expected.

📈 Latter end means the final stretch of life
🌱 Bildad promises growth after suffering ends
🔮 Chapter forty two later fulfills this exact word
📖 The blessing comes, but not Bildad's way

# Job 8:8-10
# 📜 Enquire Of The Former Age
---
## 📜 Enquire Of The Former Age

Enquire means to ask or search out carefully.

Former age points to earlier generations who lived and died before Job's time.

Ancient cultures leaned heavily on inherited tradition rather than personal experience.

Bildad tells Job to trust that older, tested wisdom over his own complaints.

This is an appeal to authority, not fresh evidence about Job's actual case.

📜 Enquire means to search out carefully
👴 Former age means earlier generations
🏛️ Ancient cultures trusted old tradition
📖 This appeals to authority, not new evidence

## 👶 We Are But Of Yesterday, And Know Nothing

Of yesterday is a phrase describing how brief and recent a human life feels.

Bildad admits that his own generation lacks the depth of the ancestors.

Know nothing is an overstatement meant to press the point hard.

This is one of the few humble moments in Bildad's speech.

He humbles his own generation only to lift up the wisdom of the past.

👶 Of yesterday pictures a brief human life
🙇 Bildad admits his own generation lacks depth
📉 Know nothing is deliberate overstatement
📖 This humility only serves to praise the past

## 🌒 Our Days Upon Earth Are A Shadow

A shadow moves fast, changes shape, and disappears the moment the light shifts.

Bildad uses it as a picture of how quickly a lifetime passes.

This same shadow image shows up often across the book of Job.

It reminds the reader that no single generation sees the whole picture.

That is exactly why Bildad leans on the age before him instead.

🌒 A shadow moves and disappears fast
⏳ It pictures how quickly life passes
🔁 This image repeats often in Job
📖 No single generation sees the whole picture

## 💬 Utter Words Out Of Their Heart

Uttering words out of the heart means speaking with sincere, tested conviction.

Bildad claims the ancestors did not just repeat empty sayings.

Their words came from lived experience, not guesswork.

Bildad is building his whole case on secondhand authority before he says one new thing.

The chapter has not yet offered Job any fresh evidence of his own.

💬 Out of their heart means sincere conviction
🧓 Bildad trusts lived experience, not guesswork
🏗️ His whole case rests on old authority
📖 No fresh evidence has entered the speech yet

# Job 8:11-15
# 🕸️ The Hypocrite's Hope Shall Perish
---
## 🌾 Can The Rush Grow Up Without Mire

Rush and flag both name marsh plants that grow only in wet ground.

Mire means thick, wet mud, the kind found at a riverbank or swamp edge.

Neither plant can survive planted in dry soil.

Bildad opens a nature illustration to make his next point land harder.

The image is simple on purpose, easy for anyone to picture.

🌾 Rush and flag are marsh plants
💧 Mire means thick, wet mud
🚫 Neither plant survives in dry soil
📖 Bildad builds toward a bigger point

## 🥀 It Withereth Before Any Other Herb

Withereth is an old form of withers, meaning it dries up and dies.

A marsh plant looks strong and green right up until its water disappears.

Once the water is gone, it dies faster than ordinary plants that never needed as much.

The speed of the collapse is the whole point of the image.

Bildad is setting up a comparison to something that looks strong but is not.

🥀 Withereth means it dries up and dies
💦 It looks strong until the water stops
⚡ The collapse happens fast, not slowly
📖 Bildad is building toward a comparison

## 🚶 The Paths Of All That Forget God

Paths here means the whole direction and pattern of a person's life.

Bildad now applies the wilting plant image directly to people.

Forgetting God does not always mean open rebellion.

It can simply mean living as though God does not matter day to day.

Bildad says that kind of life eventually collapses like the thirsty reed.

🚶 Paths means the whole direction of a life
🌾 Bildad applies the wilting image to people
🙈 Forgetting God can be quiet neglect
📖 That kind of life eventually collapses

## 💭 The Hypocrite's Hope Shall Perish

Hypocrite in this older sense means someone godless, not simply a pretender.

Perish means the hope collapses completely, with nothing left standing.

Bildad is not describing an actor putting on a show.

He means someone who has quietly cut God out of daily life.

Their confidence looks solid right up until the moment it fails.

🎭 Hypocrite here means godless, not just fake
💥 Perish means total collapse of that hope
🙅 This is not about play acting
📖 Confidence fails right when it is tested

## 🕸️ Whose Trust Shall Be A Spider's Web

A spider's web looks intricate and carefully built from a distance.

Up close, it tears apart with almost no force at all.

Bildad compares false confidence to that same fragile structure.

It can hold a small fly but nothing more.

Trust built on the wrong foundation cannot bear real weight.

🕸️ A web looks strong from a distance
👌 It tears apart with almost no force
🪰 It can hold only something small
📖 False trust cannot bear real weight

## 🏚️ He Shall Lean Upon His House, But It Shall Not Stand

Leaning on a house pictures someone resting their full weight on what feels solid.

Bildad pictures that same house giving way at the exact moment it is tested.

The image shifts from a web to a building, but the point stays the same.

What looks secure on the outside can still be empty on the inside.

Job's own house literally collapsed in chapter one, which makes this image especially sharp.

🏚️ Leaning pictures resting full weight on it
💢 The house gives way when tested
🏗️ The image shifts from web to building
📖 Job's own house already collapsed once

## ✊ Hold It Fast, But It Shall Not Endure

Holding fast means gripping something tightly on purpose.

Endure means to last or hold up over time.

Bildad repeats the same warning in a slightly different picture.

Gripping tighter cannot fix a foundation that was never sound.

Effort alone cannot save something built on the wrong thing.

✊ Holding fast means gripping on purpose
⏳ Endure means lasting over time
🔁 Bildad repeats the warning differently
📖 Effort cannot fix a bad foundation

# Job 8:16-19
# 🌱 Green Before The Sun
---
## 🌱 He Is Green Before The Sun

Green before the sun pictures a plant thriving in full daylight.

Bildad now paints someone who looks completely healthy and rooted.

Branches spread out well beyond the plant's own garden space.

This looks like the opposite of the wilting reed from before.

The turn is intentional, since the next verses reveal it is just as fragile.

🌱 Green before the sun means thriving
🌿 Branches spread beyond the garden itself
🔄 This looks like the opposite of wilting
📖 The next verses reveal the same fragility

## 🪨 His Roots Are Wrapped About The Heap

The heap likely means a pile of rocks or stones in a garden.

Wrapped about pictures roots winding tightly around whatever they can find.

This plant is not rooted in deep, rich soil at all.

It survives only by clinging to loose stones instead.

A support this shallow cannot hold when real pressure comes.

🪨 The heap means a pile of stones
🌿 Roots wind tightly around loose rocks
🌍 There is no deep soil underneath at all
📖 Shallow support fails under real pressure

## 🙈 It Shall Deny Him, Saying, I Have Not Seen Thee

Bildad pictures the very ground speaking, as if it could talk.

The place itself claims it never knew this person at all.

This is total, complete erasure, not simply death.

Even the dirt he grew from acts like a stranger now.

Bildad's warning is that a false life leaves no lasting mark anywhere.

🗣️ Bildad pictures the ground itself speaking
🙈 The place claims it never knew him
🕳️ This is total erasure, not just death
📖 A false life leaves no lasting mark

## 🌿 Out Of The Earth Shall Others Grow

New plants grow up in exactly the same spot without pause.

The garden itself does not mourn or remember what stood there before.

Bildad's point is that the world simply moves on without the wicked.

Nature keeps producing life, indifferent to any single plant that failed.

This is meant as a warning aimed straight at Job.

🌿 New plants grow in the very same spot
😐 The garden does not mourn what is gone
🔄 The world moves on without the wicked
📖 Bildad aims this warning straight at Job

# Job 8:20-22
# 😊 God Will Not Cast Away A Perfect Man
---
## 🙌 God Will Not Cast Away A Perfect Man

Perfect here means blameless or complete, not flawless in every possible way.

Bildad states his core belief plainly.

God stays loyal to people of real integrity.

This is meant to comfort Job, if he truly is upright.

The word choice quietly questions whether Job actually qualifies.

Bildad's comfort always arrives with a condition attached.

🙌 Perfect means blameless, not flawless
🤝 God stays loyal to real integrity
❓ This quietly questions if Job qualifies
📖 Bildad's comfort always carries a condition

## 🚫 Neither Will He Help The Evil Doers

Evil doers here means people who live in open, ongoing wrongdoing.

Bildad draws a clean, simple line between the righteous and the wicked.

Job's own experience does not fit neatly on either side of that line.

The book of Job spends its later chapters complicating this exact claim.

Life rarely sorts people this cleanly in Bildad's world or in ours.

🚫 Evil doers means people in open wrongdoing
⚖️ Bildad draws a clean line between groups
🧩 Job does not fit neatly on either side
📖 Later chapters complicate this exact claim

## 😄 Fill Thy Mouth With Laughing

This pictures sudden, visible joy replacing Job's current grief.

Bildad promises restoration will show up on Job's very face and voice.

The offer sounds warm, but it still depends on Job accepting Bildad's terms first.

Real comfort should not come with strings attached like this.

Job will get his laughter back eventually, just not through this exact deal.

😄 This pictures sudden, visible joy returning
🗣️ Restoration shows on his face and voice
🧵 The offer still comes with strings attached
📖 Real joy returns later, not through this deal

## 😳 Clothed With Shame

Clothed with shame pictures shame worn like a garment, visible to everyone.

In this culture, clothing often showed a person's status at a glance.

Bildad promises that Job's enemies will wear public disgrace instead.

The image works because everyone could see clothing immediately.

There is no hiding a garment, and in this picture, no hiding the shame either.

👕 Shame here is worn like clothing
👀 Clothing showed status at a glance
😳 Enemies will wear public disgrace instead
📖 There is no hiding a garment like that

## 🔥 The Dwelling Place Of The Wicked Shall Come To Nought

Come to nought means reduced completely to nothing.

Dwelling place points back to the collapsing house image from earlier in the chapter.

Bildad ends his speech exactly where he began it, with a warning about houses.

He offers Job a clear choice between two possible endings.

Job never asked for a formula, only for someone willing to listen.

🔥 Come to nought means reduced to nothing
🏚️ Dwelling place echoes the house image
🔁 Bildad ends where his speech began
📖 Job wanted a listener, not a formula
`.trim();

export const JOB_EIGHT_PERSONAL_SECTIONS = parseJobEightRawNotes(JOB_EIGHT_RAW_NOTES);
