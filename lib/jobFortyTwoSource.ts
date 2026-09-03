export type JobFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFortyTwoRawNotes(rawText: string): JobFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 42:${startVerse}` : `Job 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 42 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FORTY_TWO_RAW_NOTES = `# Job 42:1-6
# 🙏 Job's Answer To God
---
## 🌍 I Know That Thou Canst Do Every Thing

God's power has no limit anywhere in creation.

Job argued his case for chapters as if God owed him an explanation.

Now he finally says something he could have said on day one.

This is not a new fact to Job.

Hearing God speak made an old truth feel real for the first time.

🌍 God's power has no limit
🗣️ Job finally agrees without a fight
👂 Hearing God changed everything
📖 Truth becomes real through encounter

## 🧩 No Thought Can Be Withholden From Thee

This means no plan of God can ever be stopped or ruined.

Job had spent the whole book fearing his suffering had no purpose.

He now admits that every plan God makes will come to pass.

Nothing that happened to Job caught God off guard or broke His plan.

🧩 No thought means no plan of God
🛑 Nothing can stop what God intends
😔 Job feared his pain had no purpose
📖 God's plans always reach their end

## ❓ Who Is He That Hideth Counsel Without Knowledge

Job quotes God's own question back to himself here.

God first asked this in chapter thirty eight to challenge Job directly.

Job now repeats it as an honest confession, not an argument.

He is admitting he was the one speaking without real knowledge.

❓ God asked this first, in chapter thirty eight
🔁 Job repeats it as his own confession
🗣️ He admits he lacked real knowledge
📖 Honest people can repeat a hard truth

## 🌌 Things Too Wonderful For Me, Which I Knew Not

Job admits he spoke about matters far beyond his understanding.

For chapters he demanded answers about how God runs the universe.

Now he sees those answers were never his to demand.

Some things about God are simply too vast for a human mind to hold.

🌌 Wonderful here means beyond human grasp
🗣️ Job spoke about things he did not understand
🙇 He drops his demand for full answers
📖 Some truths stay bigger than any question

## 🗣️ I Will Demand Of Thee, And Declare Thou Unto Me

God used this same challenge to open His first speech to Job.

Job now turns the exact words back toward himself instead of God.

He is no longer demanding God explain Himself.

He is finally ready to be the one who listens and answers.

🗣️ God first used these words to challenge Job
🔁 Job turns the challenge back on himself
👂 He shifts from demanding to listening
📖 Real change means facing your own words

## 👂 I Have Heard Of Thee By The Hearing Of The Ear

Job describes his old faith as something he only heard about from others.

That kind of faith is real but secondhand.

It is the difference between hearing a story about a place and going there.

Job had believed in God his whole life before this moment.

👂 Hearing of the ear means secondhand faith
📚 Job knew God through what others taught
🚶 Secondhand faith is still real faith
📖 It is not the deepest kind

## 👁️ But Now Mine Eye Seeth Thee

Job moves from secondhand knowledge to a direct encounter with God.

Seeing here does not mean he saw God's literal form.

It means he experienced God's presence and power directly, not through a story.

That direct experience is what finally settles every question Job had.

👁️ Seeing means direct experience of God
🚫 Not a claim to see God's literal form
🤝 Direct encounter settles what stories cannot
📖 Personal encounter outweighs secondhand belief

## 😔 I Abhor Myself

To abhor means to feel deep disgust, stronger than simple regret.

Job is not being dramatic or performing sadness for an audience.

Seeing God clearly makes his earlier complaints look small and out of place.

This reaction only comes after real encounter, not before it.

😔 Abhor means deep disgust, not mild regret
🎭 This is not performed sadness
🔍 Seeing God exposes his earlier complaints
📖 Real encounter produces real humility

## 🌑 Repent In Dust And Ashes

Sitting in dust and ashes was a well known mourning custom in this culture.

Job had already been sitting in ashes since chapter two, scraping his sores.

Now that same posture takes on a new meaning.

What began as physical suffering ends as a sign of surrendered pride.

🌑 Dust and ashes was a mourning custom
🩹 Job sat in ashes since chapter two
🔄 The same posture gains new meaning
📖 Suffering becomes surrender by the end

# Job 42:7-9
# 😠 God Answers The Friends
---
## 🔥 My Wrath Is Kindled Against Thee, And Against Thy Two Friends

God speaks directly to Eliphaz, naming him first among the three friends.

"Thy two friends" points to Bildad and Zophar standing beside him.

Notice that Elihu, the younger man who spoke last, is never rebuked here.

God's anger lands specifically on the three who claimed to defend Him.

🔥 Eliphaz is addressed first and directly
👥 Thy two friends means Bildad and Zophar
🙅 Elihu is never rebuked in this scene
📖 God judges those who spoke wrongly of Him

## ⚖️ Ye Have Not Spoken Of Me The Thing That Is Right

For chapters the three friends insisted Job's suffering proved hidden sin.

Their tidy explanation sounded wise but did not match reality.

Job's honest questions, even his angry ones, are called right instead.

God prefers raw honesty directed at Him over comfortable lies about Him.

⚖️ The friends' tidy theory was declared wrong
🗣️ Job's honest questions are called right
😤 Anger aimed at God beat comfortable lies
📖 Honesty matters more than sounding wise

## 🐂 Seven Bullocks And Seven Rams

Seven animals of each kind made this an unusually large and costly offering.

The number seven often marks completeness in scripture.

This was not a small apology sacrifice.

It matched the size of the wrong that needed to be corrected.

🐂 Seven of each kind was a large offering
🔢 Seven often signals completeness in scripture
💰 The cost matched the size of the wrong
📖 A real offense called for a real offering

## 🙏 My Servant Job Shall Pray For You

The three friends came at the start of the book to comfort Job.

Instead they spent chapters accusing him of secret sin.

Now they need Job's prayer to be spared from God's own anger.

The roles between comforter and sufferer have completely reversed.

🙏 Job now prays for his accusers
🔄 Comforter and sufferer have switched places
😳 The friends need Job's help to be spared
📖 God can reverse who needs whom

## ✅ For Him Will I Accept

God states plainly that Job's prayer, not just the sacrifice, is what matters.

The bullocks and rams alone would not have been enough.

Job's willingness to pray for men who wronged him completes the offering.

Forgiveness given by Job becomes part of the friends' own rescue.

✅ Job's prayer completes the offering
🐂 The sacrifice alone was not enough
🤝 Job's forgiveness helps rescue his accusers
📖 Mercy given can become mercy received

## 🙌 The LORD Also Accepted Job

This is the first time in the whole book Job intercedes for someone else.

Earlier chapters showed Job offering sacrifices for his own children out of caution.

Here he prays for grown men who spent chapters wrongly accusing him.

God accepting that prayer restores Job's standing before he receives anything back.

🙌 Job intercedes for others here first
👨‍👧‍👦 He once offered sacrifices only for his children
🗣️ Now he prays for his accusers
📖 Restoration starts with Job's own faithfulness

# Job 42:10-11
# 🔄 Job's Fortunes Turn
---
## 🔄 The LORD Turned The Captivity Of Job

This phrase is an old idiom, not a claim that Job was literally imprisoned.

It means his fortunes were completely reversed for the better.

The same wording appears elsewhere in scripture for a nation's full restoration.

Job's entire situation turns around, not just one piece of it.

🔄 Turned the captivity means fortunes reversed
🚫 Job was never literally a prisoner
🌍 This wording elsewhere describes a nation's restoration
📖 Job's whole life turns, not one piece

## 🙏 When He Prayed For His Friends

The turning point is tied directly to Job's prayer, not simply to time passing.

Job's restoration begins the moment he lets go of his own grievance.

Praying for the very men who wronged him becomes the hinge of the story.

Forgiveness comes before blessing, not after it.

🙏 Restoration is tied to Job's prayer
⏳ It is not simply the passing of time
🔓 Letting go of grievance opens the door
📖 Forgiveness comes before blessing here

## 💰 Twice As Much As He Had Before

Ancient law often required a thief to repay double what was stolen.

Job never stole anything, yet God repays him as if a great wrong occurred.

Doubling here signals full and generous restitution, not simple replacement.

God treats Job's suffering as a debt owed, and pays it in full.

💰 Doubling echoes the ancient law of restitution
🚫 Job never stole, yet still receives double
🎁 This signals generous repayment, not replacement
📖 God treats Job's loss as a debt

## 👨‍👩‍👧 All His Brethren, And All His Sisters

None of Job's siblings appear anywhere earlier in the book, not even once.

During his worst suffering, family stayed distant while only friends showed up.

Now that the trial is over, they finally return to his side.

Their absence during hardship stands out against their presence now.

👨‍👩‍👧 Siblings never appear earlier in the book
🚪 Family stayed away during the hardest chapters
🔙 They return only once the trial ends
📖 Their timing stands out against their presence now

## 🍞 Bemoaned Him, And Comforted Him

Back in chapter two, the three friends came for this exact purpose and failed.

They sat with Job for a week but soon turned to accusation instead.

Here, finally, someone actually bemoans and comforts Job the way friends first tried to.

Real comfort finally arrives, just from a different group of people.

🍞 The friends tried and failed, in chapter two
😢 Bemoaned means to mourn with someone openly
🤝 Real comfort finally arrives here
📖 It comes from a different group than expected

## 🪙 A Piece Of Money, And An Earring Of Gold

A "piece of money" refers to an ancient unit of currency called a kesitah.

Its exact value today is not fully known, but it was a meaningful gift.

Gold earrings were valuable jewelry, often part of a person's real wealth.

Every visitor helps rebuild what Job lost, not just offer kind words.

🪙 A piece of money means an ancient coin
💍 Gold earrings were valuable personal wealth
🎁 Every gift helps rebuild what was lost
📖 Comfort here comes with real generosity

# Job 42:12-15
# 🎁 A Doubled Blessing
---
## 📈 Blessed The Latter End Of Job More Than His Beginning

This line states the theme of the entire book in one sentence.

Job's story does not end at his lowest point, in the ashes.

His later years hold more blessing than the prosperous life he had at first.

Suffering was real, but it was never the final word over Job's life.

📈 This line sums up the whole book
🌑 Job's story does not end in the ashes
🌅 His later years exceed his earlier ones
📖 Suffering was real but never the final word

## 🐑 Fourteen Thousand Sheep, And Six Thousand Camels

Chapter one recorded Job's original wealth as seven thousand sheep and three thousand camels.

Every number here is exactly double what Job had before he lost everything.

The same pattern continues with a thousand yoke of oxen and a thousand donkeys.

God did not simply replace what Job lost, He doubled it precisely.

🐑 Chapter one listed seven thousand sheep
🔢 Every number here is exactly doubled
🐫 Camels, oxen, and donkeys all match the pattern
📖 God doubled the loss, not just replaced it

## 👨‍👩‍👧‍👦 Seven Sons And Three Daughters

Job's ten children died in chapter one, and this number is not doubled.

Unlike the livestock, children are never treated as property to be replaced.

Many readers see this as Job's first family still counted as his own.

Grief for the first ten never disappears just because new children arrive.

👨‍👩‍👧‍👦 Ten children died, this count is not doubled
🚫 Children are never treated like property
💔 The first ten are never simply replaced
📖 New joy does not erase old grief

## 🌸 Jemima, Kezia, And Kerenhappuch

Job names all three of his new daughters, which the text never did before.

Jemima likely points to something bright, like daylight or a dove.

Kezia names a fragrant spice related to cinnamon, prized in the ancient world.

Kerenhappuch refers to a container for eye paint, a beauty item of the time.

🌸 Job names his daughters for the first time
🕊️ Jemima likely points to daylight or a dove
🌿 Kezia names a fragrant spice
📖 Each name carries a note of beauty

## 👑 No Women Found So Fair As The Daughters Of Job

Scripture rarely comments on a woman's appearance this directly.

Naming Job's daughters as the most beautiful in the land is a high honor.

It signals Job's complete restoration, down to the honor given his own family.

Beauty here stands for the full favor now surrounding Job's household.

👑 Scripture rarely praises beauty this directly
🌍 They are called the fairest in the land
🏡 It signals honor restored to Job's whole family
📖 Favor now surrounds everything about Job

## 🤝 Gave Them Inheritance Among Their Brethren

In this culture, daughters normally did not inherit land alongside living sons.

Job was not legally required to give his daughters any share at all.

He gives Jemima, Kezia, and Kerenhappuch a full portion anyway, alongside their brothers.

Job's restored life includes restored fairness toward the daughters he loves.

🤝 Daughters did not normally inherit with sons
📜 Job was not required to include them
👧 He gives his daughters a full share anyway
📖 Restoration reaches how Job treats his own family

# Job 42:16-17
# ⏳ Job's Long Life
---
## 📆 An Hundred And Forty Years

"An hundred" is simply an old way of saying "a hundred."

Job lives a hundred and forty years after this moment, on top of his earlier life.

Many patriarchs in scripture lived long lives as a visible sign of blessing.

A famously long life becomes the final proof that God restored Job completely.

📆 An hundred means simply a hundred
⏳ Job lives one hundred forty more years
👴 Long life often signaled blessing in scripture
📖 A long life becomes proof of full restoration

## 👨‍👦 His Sons, And His Sons' Sons, Even Four Generations

Job lives long enough to meet his great grandchildren, not just his own children.

Four generations under one roof was rare and highly honored in the ancient world.

This detail mirrors the long, full lives of Abraham, Isaac, and Jacob.

Job's story ends inside the same pattern of blessing given to the patriarchs.

👨‍👦 Job meets his own great grandchildren
🏡 Four generations together was rare and honored
🔁 This mirrors the patriarchs before him
📖 Job's ending matches the patriarchs' pattern

## 🕊️ Old, And Full Of Days

This exact phrase also describes Abraham's death in the book of Genesis.

"Full of days" means a life that felt complete, not just long.

It is different from simply dying old and worn out.

Job's story closes the same way the greatest patriarchs' stories close, at peace.

🕊️ This same phrase describes Abraham's death
📏 Full of days means a complete life
🚫 Not the same as just growing old
📖 Job's story closes in that same peace
`.trim();

export const JOB_FORTY_TWO_PERSONAL_SECTIONS = parseJobFortyTwoRawNotes(JOB_FORTY_TWO_RAW_NOTES);
