export type JobTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyFiveRawNotes(rawText: string): JobTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 25:${startVerse}` : `Job 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Job 25 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_FIVE_RAW_NOTES = `# Job 25:1-3
# 🌌 Bildad Describes God's Reach Over The Heavens
---
## 🗺️ Bildad The Shuhite

This is Bildad's third and final speech in the whole book of Job.

It is also the shortest speech any of the three friends gives.

Job's friends have grown more frustrated with each new round of arguing.

Many scholars notice that Zophar never gets a third turn to answer.

The friends' whole case against Job is starting to run dry.

🗺️ Bildad speaks for the third time
📉 This is his shortest speech yet
🤐 Zophar never gets a third turn
📖 The friends' case is running dry

## 👑 Dominion And Fear Are With Him

"Dominion" means complete and supreme authority to rule.

"Fear" here does not mean fright, but reverent awe and dread.

Bildad is describing power that rightly makes everyone tremble before it.

This dominion belongs to God alone, not to any earthly king.

Bildad opens his speech by naming God's total authority first.

👑 Dominion means complete supreme authority
😨 Fear means reverent awe not fright
🌍 This describes God's rule alone
📖 Bildad opens with God's total power

## 🌌 He Maketh Peace In His High Places

"High places" here means the heavens, far above the earth.

Many ancient peoples believed unseen powers still contended for control up there.

Bildad says God has already settled that struggle completely.

There is no contest left in the heavens, only God's order.

Even the sky reflects God's total and final rule.

🌌 High places means the heavens above
⚔️ Ancient peoples imagined powers contending there
✅ God already settled that struggle
📖 Even the sky reflects God's rule

## 👼 Is There Any Number Of His Armies

"His armies" refers to God's heavenly host, not human soldiers.

This host may mean angels, or the stars themselves, or both.

Bildad's question expects one clear answer.

No one can count that army.

An army this vast makes human armies look small by comparison.

👼 His armies means God's heavenly host
🌟 This may mean angels or stars
❓ No one can count them
📖 Human armies look small in comparison

## ☀️ Upon Whom Doth Not His Light Arise

"His light" here refers to the sun.

The sun stands for God's providence and care as well.

No person on earth is left outside its reach.

The sun rises daily on the faithful and the wicked alike.

Bildad's point widens from armies in the sky to care spread over the earth.

God's rule is not distant.

It touches every single life.

☀️ His light means the sun's reach
🌍 It also pictures God's care
🙌 No one is left outside it
📖 Care spreads as wide as the sky

# Job 25:4-6
# 🪱 No One Is Pure Before God
---
## ⚖️ How Then Can Man Be Justified With God

"Justified" is a courtroom word meaning declared innocent by a judge.

Bildad asks how any person could win that kind of verdict against God.

This is not a new question in the book of Job.

Eliphaz asked something close to this back in chapter four.

The friends keep circling the same unanswered problem.

⚖️ Justified means declared innocent by a judge
❓ Bildad asks who could win that verdict
🔁 Eliphaz asked something similar earlier
📖 The friends keep circling this question

## 👶 Clean That Is Born Of A Woman

This phrase does not single out women as the problem.

"Born of a woman" was a common way to say every human being.

It points to how every person enters the world already fragile and mortal.

Job later repeats this exact phrase almost word for word.

Bildad is describing the human condition, not making an insult.

👶 Born of a woman means every human
🌍 It points to shared human frailty
🔁 Job repeats this phrase later
📖 This describes our condition not an insult

## 🌙 Even To The Moon, And It Shineth Not

Bildad now compares God's purity to the brightest lights in the sky.

Even the moon, one of the brightest things people could see, falls short.

Some nearby nations at this time worshiped the moon as a god.

Bildad's point strips the moon of that kind of glory.

Next to God, even the moon has no light worth mentioning.

🌙 The moon was one of the brightest lights
🛐 Some nations worshiped the moon as a god
📉 Bildad strips it of that glory
📖 Nothing outshines God, not even the moon

## ⭐ The Stars Are Not Pure In His Sight

Stars round out Bildad's picture of the brightest things in creation.

"Pure" here means morally clean, not simply bright or shining.

If even starlight falls short of God's purity, nothing in creation compares.

Bildad is building toward the question he asks next about mankind.

The greater the light, the smaller it looks next to God.

⭐ Stars finish this picture of brightness
🧼 Pure here means morally clean
📉 Even starlight falls short of God
➡️ This sets up his next question

## 🐛 How Much Less Man, That Is A Worm

Bildad now shifts from the sky down to mankind itself.

"Worm" here pictures something small, weak, and easily crushed.

If even the moon and stars are not pure, man has even less claim to it.

This is Bildad's harshest description of human beings in his whole speech.

The comparison is meant to humble Job, not simply insult him.

🐛 Worm means small and easily crushed
⬇️ Man ranks lower than moon or stars
😔 This humbles man, not insults him
➡️ Bildad now shifts to mankind itself

## 💀 The Son Of Man, Which Is A Worm

Bildad repeats the word worm from the verse before.

Many scholars note that the original word here is different.

This second word points specifically to a maggot, not a garden worm.

A maggot is what feeds on a body after death.

The image gets worse, showing just how low Bildad ranks mankind.

This is the last time any of the three friends speaks in the book.

Only Job will answer from here to the very end of his story.

💀 It means maggot, not garden worm
📉 The image intensifies, not just repeats
🐛 Worm here is a different word than before
📖 This is the friends' final word in Job
`.trim();

export const JOB_TWENTY_FIVE_PERSONAL_SECTIONS = parseJobTwentyFiveRawNotes(JOB_TWENTY_FIVE_RAW_NOTES);
