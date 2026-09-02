export type JobThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyFiveRawNotes(rawText: string): JobThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 35:${startVerse}` : `Job 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 35 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_FIVE_RAW_NOTES = `# Job 35:1-4
# 🤔 Elihu Questions Job's Claim
---
## 🗣️ Thinkest Thou This To Be Right

Elihu now opens his third and final speech to Job.

He begins with a challenge instead of a flat accusation.

Something Job said earlier still bothers Elihu the most.

Elihu wants Job to defend that claim in front of everyone.

🗣️ Elihu opens his third speech

❓ He challenges instead of accuses

🎯 One claim bothers him most

📖 Elihu wants it defended openly

## ⚖️ My Righteousness Is More Than God's

This is the exact claim Elihu quotes back to Job.

Job argued his own conduct was more justified than how God treated him.

That is a bold accusation.

Job was measuring himself directly against God.

Elihu treats this claim as the real problem underneath everything Job has said.

⚖️ Job claims he is more right

🎯 This is a bold accusation

👤 Job measures himself against God

📖 Elihu calls this the real problem

## 💰 What Profit Shall I Have, If I Be Cleansed From My Sin

Job had asked this same question twice in almost the same words.

First he asked what advantage it brought him.

Then he asked what profit he gained from being cleansed from his sin.

Hebrew poetry often repeats one idea in two different lines.

The repetition is not two separate claims.

It is one claim said twice for emphasis.

Job's real question was whether living rightly actually pays off.

❓ Job asked one question twice

📜 Advantage and profit mean the same thing

🎭 Hebrew poetry repeats for emphasis

📖 Job asks if goodness pays off

## 👥 I Will Answer Thee, And Thy Companions With Thee

Elihu now says he will answer more than just Job.

The word companions points to Job's three friends who spoke earlier.

Eliphaz, Bildad, and Zophar had argued with Job through most of the book.

Elihu believes their arguments never actually answered Job's complaint.

He now speaks to correct everyone in this conversation, not only Job.

👥 Elihu will answer more than Job

🗣️ Companions means Job's three friends

📚 They argued through most of the book

📖 Elihu now corrects everyone present

# Job 35:5-8
# ☁️ Your Sin Cannot Touch God
---
## ☁️ Behold The Clouds Which Are Higher Than Thou

Elihu tells Job to simply look up at the sky.

The clouds sit far above anything a person could reach or touch.

This is a picture, not a science lesson about weather.

God stands even higher above human life than the clouds stand above the earth.

Nothing Job does down here can rise up and change God's greatness.

👀 Elihu tells Job to look up

☁️ Clouds sit far beyond reach

🗼 The clouds picture God's greatness

📖 Nothing on earth can touch God's height

## ❓ If Thou Sinnest, What Doest Thou Against Him

This question sounds harsh, but it makes a real point.

Elihu asks what Job's sin actually does to God.

A person can sin again and again without shrinking God at all.

God's greatness does not rise or fall based on human behavior.

This is not permission to sin.

It corrects a wrong idea about who God is.

❓ Elihu asks what sin does to God

🧍 A person can sin repeatedly

⚖️ God's greatness never shrinks or grows

📖 This corrects a wrong idea about God

## 🤲 If Thou Be Righteous, What Givest Thou Him

Elihu flips the same question around toward Job's good behavior.

Job likely believed his own righteousness had earned him something from God.

God does not need anything a person can offer Him.

He was already complete before any person did a single right thing.

This is not an insult to good behavior.

It simply places good behavior in its correct spot.

🔄 Elihu flips the question around

🎁 Job assumed goodness earned credit with God

🙌 God needs nothing from anyone

📖 Good behavior still has its correct place

## 💔 Thy Wickedness May Hurt A Man As Thou Art

Elihu now explains who actually feels the weight of a person's choices.

Wickedness cannot reach God.

It can badly hurt another human being instead.

Righteousness works the same way in the opposite direction.

A person's right choices can genuinely help the people around them.

Sin and goodness both stay at the human level, not the divine one.

💔 Wickedness cannot touch God directly

🤕 It can hurt other people badly

🤝 Righteousness helps others the same way

📖 Sin and goodness stay at human level

# Job 35:9-13
# 😢 The Cry That Goes Unanswered
---
## 😢 They Cry Out By Reason Of The Arm Of The Mighty

Elihu shifts to describe people crushed under harsh rulers.

Oppression here means the cruel weight of someone stronger pressing down on someone weaker.

The arm of the mighty is a picture of raw physical power and force.

People cry out simply because the strong are hurting the weak.

This cry is a real and understandable reaction to real pain.

😢 People cry out under oppression

💪 Arm of the mighty means raw power

⚖️ The strong are hurting the weak

📖 This cry is a real reaction to pain

## 🌙 None Saith, Where Is God My Maker, Who Giveth Songs In The Night

People in pain rarely stop to actually ask where God is.

That is the real problem behind Job's whole complaint.

The title God my maker reminds Job that God personally formed each person.

Songs in the night is an image of hope showing up in the darkest hour.

People stop asking long before God ever stops answering.

🙋 People rarely stop to ask

🛠️ God my maker means God formed them

🎵 Songs in the night means hope in darkness

📖 The real problem is people stop asking

## 🧠 Who Teacheth Us More Than The Beasts Of The Earth

This continues the same thought from the verse before it.

God gave people something animals simply do not have.

Beasts of the earth and fowls of heaven represent the whole animal world.

Animals can survive by instinct alone, but people can actually reason and ask why.

That capacity to reason is itself a gift from God.

🧠 People got something animals never got

🐾 Beasts of the earth means all animals

🤔 People can reason and ask why

📖 The ability to reason is God's gift

## 🔇 There They Cry, But None Giveth Answer, Because Of The Pride Of Evil Men

This describes what happens to the very cry mentioned earlier.

The cry itself is genuine, but something is blocking the answer.

Pride of evil men points to the oppressors, not to God ignoring anyone.

Their arrogance is what created the suffering in the first place.

The silence people feel is not proof that God does not care.

🔇 The cry seems to go unanswered

😤 Pride of evil men means the oppressors' arrogance

🎯 Their pride caused the suffering

📖 Silence is not proof God stopped caring

## 🚫 Surely God Will Not Hear Vanity

Vanity here does not mean pride.

It means empty or worthless speech instead.

This is Elihu's answer to the question he raised earlier.

A complaint that never actually turns toward God still goes nowhere.

The Almighty regarding something means He pays real attention to it.

God is not ignoring pain, He is ignoring empty noise.

🚫 God will not hear vanity

📜 Vanity means empty or worthless speech

🙏 A complaint must actually turn to God

📖 God ignores empty noise, not real pain

# Job 35:14-16
# ⚖️ Job Speaks Without Knowledge
---
## 👁️ Although Thou Sayest Thou Shalt Not See Him

Job had complained earlier that he could not find or see God anywhere.

Elihu now responds directly to that specific complaint.

Not seeing God does not mean God is absent or unaware.

It only means Job cannot see Him with his own eyes right now.

Job's inability to see God is not proof that God is missing.

👁️ Job complained he could not see God

🗣️ Elihu answers that complaint directly

🙈 Not seeing God is not proof

📖 God can be present yet unseen

## 🤝 Yet Judgment Is Before Him, Therefore Trust Thou In Him

This is Elihu's actual encouragement inside a hard verse.

Judgment before him means God's justice is already active, not delayed.

Job does not have to see it happening to trust that it is real.

Trust here means relying on God's character even without visible proof.

Elihu wants Job to wait and not give up.

⚖️ Judgment before Him means justice is active

👀 Job cannot see it happening yet

🤝 Trust means relying on God's character

📖 Elihu asks Job to wait, not doubt

## 🧩 He Hath Visited In His Anger, Yet He Knoweth It Not In Great Extremity

This verse is one of the hardest to read plainly in the whole chapter.

Many scholars believe Elihu means Job wrongly assumes God has not truly judged him yet.

Great extremity refers to Job's own severe suffering.

Elihu suggests Job has misread God's patience as God's absence.

The text does not give a fully clear answer here.

That honesty matters more than a forced explanation.

🧩 This verse is genuinely hard to read

🤷 Many scholars read it differently

🔥 Great extremity means Job's severe suffering

📖 Elihu says Job misread God's patience

## 🗣️ Therefore Doth Job Open His Mouth In Vain

Elihu closes this part of his speech with a final verdict on Job.

Open his mouth in vain means Job has been talking without real substance behind it.

This does not mean Job is a bad person.

It means his complaints have outrun what he actually understands.

Multiplieth words without knowledge repeats the same charge in different words.

Elihu wants Job to stop talking and start listening instead.

🗣️ Elihu delivers his final verdict here

💨 Open his mouth in vain means empty talk

🚫 This is not calling Job a bad person

📖 Elihu wants Job to listen, not talk
`.trim();

export const JOB_THIRTY_FIVE_PERSONAL_SECTIONS = parseJobThirtyFiveRawNotes(JOB_THIRTY_FIVE_RAW_NOTES);
