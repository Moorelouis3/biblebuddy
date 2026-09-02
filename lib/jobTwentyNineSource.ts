export type JobTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyNineRawNotes(rawText: string): JobTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 29:${startVerse}` : `Job 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 29 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_NINE_RAW_NOTES = `# Job 29:1-3
# 🕯️ Job Remembers The Light Of God's Blessing
---
## 📜 Job Continued His Parable

A parable here does not mean a short fictional story.

It means a weighty, poetic speech meant to be taken seriously.

Job is not telling a fable.

He is delivering a formal final argument about his life.

📜 Parable means a formal weighty speech

🚫 Not a short fictional story

⚖️ Job is making a serious argument

📖 His words carry real weight

## 🕰️ As In Months Past

Job wishes he could return to how life used to be.

He is not talking about last week.

He means years earlier, before everything he loved was taken.

This whole chapter looks backward before looking forward again in chapter thirty.

🕰️ Months past means years earlier

😢 Job longs for his old life

💔 Everything he loved was taken

➡️ This chapter looks backward first

## 🛡️ As In The Days When God Preserved Me

Preserved means kept safe and protected.

Job remembers a time when he felt guarded by God at every turn.

That feeling of safety is exactly what he now feels he has lost.

Naming it here shows how sharp that loss still feels.

🛡️ Preserved means kept safe

🙏 Job once felt guarded by God

😔 That safety now feels gone

📖 Loss sharpens what Job remembers

## 🕯️ His Candle Shined Upon My Head

A candle in this verse means an oil lamp, not a wax candle.

Job pictures God's blessing as a light shining directly over him.

That light stood for guidance, favor, and God's attention on his life.

🕯️ Candle means an oil lamp

✨ It pictures God's blessing as light

👤 The light shone over Job himself

📖 God's favor once felt visible

## 🌑 By His Light I Walked Through Darkness

Darkness here does not only mean nighttime.

It stands for danger, confusion, or hardship in general.

Job says God's light once guided him safely through those hard seasons.

He is not describing one night but a whole season of life.

🌑 Darkness stands for danger or hardship

🕯️ God's light guided him through it

🚶 Job walked safely through hard times

➡️ One image covers a whole season

# Job 29:4-6
# 🌿 The Days Of Youth And Plenty
---
## 🤝 The Secret Of God Was Upon My Tabernacle

Secret here means close, trusted friendship, not a hidden fact.

Tabernacle simply means Job's own tent, his household.

Job describes a season when God's friendship rested over his whole home.

That kind of closeness is different from simply believing God exists.

🤝 Secret means close trusted friendship

⛺ Tabernacle means Job's own tent

🏡 God's friendship covered his household

📖 Closeness with God once felt constant

## 💪 When The Almighty Was Yet With Me

Job names God directly here as the Almighty.

He remembers a season when he felt God's nearness without question.

That confidence stands in sharp contrast to how alone Job feels now.

💪 Almighty is a direct name for God

🙏 Job once felt God nearby

😔 That confidence is gone now

➡️ The contrast with today is sharp

## 👨‍👩‍👧‍👦 When My Children Were About Me

This line points back to the sons and daughters Job lost.

Earlier in the book, all ten of his children died in one disaster.

Naming them here is not casual memory.

It is grief surfacing again in the middle of his speech.

👨‍👩‍👧‍👦 This recalls Job's ten children

💔 All of them died earlier in the book

😢 Naming them stirs fresh grief

📖 Loss returns even mid speech

## 🧈 I Washed My Steps With Butter

This line is not a literal daily habit.

It is a dramatic picture of overflowing wealth.

Butter here means rich curdled milk, a sign of a well fed household.

Job is describing prosperity so large it felt like walking through abundance.

🧈 Butter pictures overflowing wealth

🐄 It signals a well fed household

🚶 Job pictures walking through abundance

➡️ The image is exaggeration on purpose

## 🫒 The Rock Poured Me Out Rivers Of Oil

Olive trees in this region often grew on rocky hillsides.

Rivers of oil describes an enormous, overflowing olive harvest.

Even stony ground produced abundance for Job in those years.

The picture matches the exaggerated wealth already shown in the line before it.

🫒 Olive trees grew on rocky hills

🌊 Rivers of oil means a huge harvest

🪨 Even stony ground gave abundance

📖 Wealth once poured out everywhere

# Job 29:7-10
# 🚪 Respect At The City Gate
---
## 🚪 I Went Out To The Gate Through The City

The city gate was not just an entrance.

It was where elders met to settle disputes and conduct business.

Walking to the gate meant Job was heading to a public place of authority.

🚪 The gate was a public meeting place

⚖️ Elders settled disputes there

🏙️ It sat at the heart of the city

📖 Job held real public standing

## 🪑 I Prepared My Seat In The Street

Seats near the gate were not first come first served.

A respected man had his own recognized place to sit.

Job describes claiming his usual seat of honor among the leaders.

🪑 A seat marked a person's status

👑 Job had his own place of honor

🏙️ He sat among the city's leaders

➡️ Respect showed in where a man sat

## 🙈 The Young Men Saw Me, And Hid Themselves

Young men stepping out of sight was a sign of deep respect.

It was not fear of danger.

It showed they considered themselves unworthy to stand in Job's way.

🙈 Hiding here means stepping aside in respect

🚫 It was not fear of danger

👦 Younger men deferred to Job

📖 Respect shaped how people moved

## 👴 The Aged Arose, And Stood Up

In this culture, elders were normally the ones others stood for.

Here the elders themselves stood up when Job arrived.

That reversal shows just how highly Job was regarded.

👴 Elders usually received respect, not gave it

🔁 Here the elders stood for Job

🙌 This reversal shows his high standing

➡️ Even the oldest men honored him

## 🤐 The Princes Refrained Talking

Refrained means they deliberately held themselves back.

Princes here means local leaders or officials, not royal sons.

They stopped their own conversations out of respect when Job spoke.

🤐 Refrained means held back on purpose

👔 Princes means local leaders

🗣️ They paused their own talking

📖 Silence itself became a form of honor

## ✋ Laid Their Hand On Their Mouth

This was a physical gesture, not just a figure of speech.

Covering the mouth showed a person was choosing not to speak.

Leaders used this gesture to signal Job's words came first.

✋ Hand on mouth was a real gesture

🤫 It signaled a choice to stay silent

🥇 Job's words were given priority

➡️ A gesture communicated as clearly as words

## 👅 Their Tongue Cleaved To The Roof Of Their Mouth

Cleaved means stuck fast, unable to move freely.

This is a vivid way of describing complete, stunned silence.

Even the most confident leaders in the city had nothing to add.

👅 Cleaved means stuck fast

😶 It pictures total stunned silence

👔 Even confident leaders stayed quiet

📖 Job's presence silenced the room

# Job 29:11-14
# 👂 A Witness To Job's Good Name
---
## 👂 The Ear Heard Me, Then It Blessed Me

This line uses the ear to stand in for the whole listener.

Anyone who heard Job speak came away speaking well of him.

His reputation was built on what people actually heard him say and do.

👂 The ear stands for the whole listener

🗣️ Hearers spoke well of Job

🏆 His reputation matched his words

📖 A good name grows from real actions

## 👀 The Eye Saw Me, It Gave Witness To Me

The eye works the same way the ear did in the line before.

Anyone who watched Job's life became a witness in his favor.

His actions, not just his words, backed up his good name.

👀 The eye stands for any onlooker

✅ Watching Job confirmed his character

🤝 Actions backed up his reputation

➡️ A life can testify like a witness

## 🙏 I Delivered The Poor That Cried

Job is not describing a single act of charity.

He is describing a habit that defined how he lived.

He stepped in whenever someone poor and desperate called out for help.

🙏 This was a habit, not one act

😢 Job responded to those crying out

🤲 He helped the poor directly

📖 Justice was part of daily life

## 👶 The Fatherless, And Him That Had None To Help Him

Fatherless means a child who had lost his father, an orphan.

Orphans in this culture had no legal protector of their own.

Job became that protector for people who otherwise had none.

👶 Fatherless means an orphaned child

🚫 Orphans had no legal protector

🛡️ Job filled that role himself

➡️ He defended those nobody else defended

## ⚰️ The Blessing Of Him That Was Ready To Perish

Ready to perish describes someone near death from poverty or illness.

That person's gratitude for Job's help is described as an actual blessing.

Job counts their thanks among his greatest rewards.

⚰️ Ready to perish means near death

🙏 Their gratitude became a real blessing

❤️ Job valued their thanks deeply

📖 Kindness to the dying still mattered

## 👩 I Caused The Widow's Heart To Sing For Joy

Widows in this world had little income and few legal rights.

Losing a husband often meant losing financial security completely.

Job's help was significant enough to turn a widow's grief into joy.

👩 Widows had little income or protection

💰 Losing a husband meant losing security

🎶 Job's help turned grief into joy

➡️ Real help changes real hardship

## 👑 My Judgment Was As A Robe And A Diadem

A diadem is a decorated headband or crown worn by someone in authority.

Job describes his sense of justice as something he wore, not just believed.

A robe and a diadem both showed rank at a glance in that culture.

👑 Diadem means a decorated crown or headband

🧥 A robe also signaled rank

⚖️ Job wore justice like his identity

📖 What he valued was visible to everyone

# Job 29:15-17
# 👁️ Eyes For The Blind, Feet For The Lame
---
## 👁️ I Was Eyes To The Blind

Job did not literally give anyone new eyesight.

He means he guided blind people who could not see danger or a path themselves.

He acted as the sight they were missing.

👁️ This is a figure of speech

🦯 Job guided the blind personally

🧭 He acted as their missing sight

📖 He filled a real practical need

## 🦶 Feet Was I To The Lame

The same pattern continues from the line before it.

Job became the legs for someone who could not walk on their own.

He carried out tasks and errands the disabled could not do themselves.

🦶 This matches the eyes to the blind image

🚶 Job acted as someone's legs

🤝 He carried out tasks for the disabled

➡️ He gave what was missing, not just pity

## 👨‍👧 I Was A Father To The Poor

This does not mean Job adopted anyone.

It means he provided the protection and care a father normally gives.

The poor in his community could count on him the way children count on a parent.

👨‍👧 Job acted like a father figure

🛡️ He gave protection, not adoption

🤲 The poor could count on him

📖 Care can look like family loyalty

## ⚖️ The Cause Which I Knew Not I Searched Out

Cause here means a legal case or dispute.

Job did not only judge cases that were easy or already clear to him.

He investigated unfamiliar situations instead of guessing or ignoring them.

⚖️ Cause means a legal dispute

🔍 Job investigated unclear situations

🚫 He never guessed or ignored a case

➡️ Justice took real effort, not shortcuts

## 🦁 I Brake The Jaws Of The Wicked

This pictures a predator with prey caught in its teeth.

Breaking its jaws is the only way to force it to let go.

Job describes stopping oppressors from harming the people they were targeting.

🦁 The wicked are pictured as a predator

🦷 Breaking the jaws forces it to release

🛑 Job stopped oppressors directly

📖 Justice sometimes requires real force

## 🎯 Plucked The Spoil Out Of His Teeth

Spoil means whatever the predator had already taken as prey.

Job did not just stop the attack.

He also rescued whatever had already been stolen or harmed.

🎯 Spoil means stolen prey or goods

🦷 Job pulled it from the predator's grip

🆘 He rescued victims after the harm began

➡️ Justice included recovery, not just prevention

# Job 29:18-20
# 🌳 Confidence For The Years Ahead
---
## 🪺 I Shall Die In My Nest

A nest here pictures a safe, settled home.

Job expected to grow old peacefully in the same secure place.

This was a picture of a calm, honored death, not a sudden or violent one.

🪺 A nest pictures a safe home

🕊️ Job expected a peaceful old age

😌 He imagined a calm, honored death

📖 Security once felt guaranteed to him

## 🏖️ I Shall Multiply My Days As The Sand

Nobody can count the grains of sand on a shore.

Job uses that image to describe an almost endless number of years.

He believed his life still had a very long road ahead of it.

🏖️ Sand pictures an uncountable number

📆 Job expected many more years

🛣️ He saw a long road ahead

➡️ Confidence, not just hope, shaped this line

## 🌳 My Root Was Spread Out By The Waters

Job compares himself to a tree planted right beside a water source.

A tree like that rarely dries up, even in a drought.

The image describes stability that felt permanent at the time.

🌳 Job compares himself to a planted tree

💧 The tree sits beside water

🏜️ Such a tree survives drought

📖 His stability once felt unshakable

## 🌙 The Dew Lay All Night Upon My Branch

Dew provided real moisture in a dry climate with little rainfall.

Job pictures that gentle overnight refreshment landing on his own branch.

It is another image of quiet, steady blessing rather than dramatic rescue.

🌙 Dew formed overnight in a dry climate

💦 It gave real, needed moisture

🌿 Job pictures it landing on his branch

➡️ Blessing here is quiet, not dramatic

## 🏹 My Bow Was Renewed In My Hand

A bow in this culture was a symbol of strength and readiness.

Renewed means restored to full working condition, not simply kept.

Job describes feeling like his strength kept refreshing itself instead of fading.

🏹 A bow symbolized strength and readiness

🔄 Renewed means restored, not just kept

💪 Job felt his strength kept refreshing

📖 He once expected strength to last

# Job 29:21-25
# 👑 The Man Whose Words Carried Weight
---
## 🧠 Men Gave Ear, And Waited, And Kept Silence At My Counsel

Counsel here means advice or guidance in a serious decision.

People stopped talking on purpose before Job even began to speak.

That silence showed how much weight his words already carried.

🧠 Counsel means serious advice or guidance

🤫 Listeners went silent before he spoke

⚖️ His reputation carried real weight

📖 Respect was earned before the words came

## 💧 My Speech Dropped Upon Them

This pictures Job's words falling gently, like something dropping from above.

It connects directly to the rain imagery that follows in the next line.

His advice felt refreshing and welcome, not forced or demanding.

💧 Speech is pictured as gently falling

🌧️ It connects to the rain image next

🤝 His words felt welcome, not forced

➡️ Good counsel can feel like relief

## 🌧️ They Waited For Me As For The Rain

Rain in this dry farming region was never taken for granted.

Waiting for rain meant waiting for something the whole community truly needed.

Job's counsel was valued with that same real dependence.

🌧️ Rain was never taken for granted

🌾 The whole community depended on it

🗣️ Job's counsel was valued the same way

📖 People genuinely needed what he offered

## 🌱 They Opened Their Mouth Wide As For The Latter Rain

The latter rain fell in spring, right before harvest, and was essential for a good crop.

Farmers watched eagerly for it because so much depended on its timing.

Job's listeners waited on his words with that same eager anticipation.

🌱 Latter rain fell right before harvest

🌾 A good harvest depended on it

👄 People waited eagerly for Job's words

➡️ Anticipation, not obligation, drove the crowd

## 😲 If I Laughed On Them, They Believed It Not

Job's approval was rare enough that people almost could not believe it when it came.

A smile from him carried real, noticeable weight.

That kind of reaction usually only happens around someone deeply respected.

😲 Job's approval was rare and valued

😀 A smile from him meant a lot

🏆 This shows deep public respect

📖 Small gestures carried large meaning

## 🙂 The Light Of My Countenance They Cast Not Down

Countenance means the expression on a person's face.

Job's face reflected his mood, whether encouraging or serious.

Nobody dismissed the message his expression was sending.

🙂 Countenance means a person's facial expression

👀 People watched Job's face closely

🚫 Nobody dismissed what it showed

➡️ A look could carry a message

## 🥇 I Sat Chief, And Dwelt As A King In The Army

Chief here means the leading, most honored position among a group.

Job compares his standing to a king surrounded by his own soldiers.

This is one of the strongest pictures of authority in the whole chapter.

🥇 Chief means the leading position

👑 Job compares himself to a king

🪖 The army image shows real authority

📖 His standing was unmatched at the time

## 🕊️ As One That Comforteth The Mourners

This closes the chapter on Job as the strong one, the comforter.

It is worth noticing because Job himself is desperate for comfort right now.

The man who once eased everyone else's grief now sits in his own.

That contrast is exactly what makes this whole chapter so painful to read.

🕊️ Job once comforted others in grief

🔄 Now Job needs comfort himself

💔 The role reversal is painful

📖 The chapter closes on real irony
`.trim();

export const JOB_TWENTY_NINE_PERSONAL_SECTIONS = parseJobTwentyNineRawNotes(JOB_TWENTY_NINE_RAW_NOTES);
