export type JobThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyTwoRawNotes(rawText: string): JobThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 32:${startVerse}` : `Job 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 32 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_TWO_RAW_NOTES = `# Job 32:1-3
# 🔥 Elihu Grows Angry
---
## 🤐 So These Three Men Ceased To Answer Job

Job's three friends finally ran out of arguments against him.

They had spent many chapters accusing Job of secret sin.

None of their speeches ever changed Job's mind about his own innocence.

So they simply stopped talking, unable to say anything new.

🤐 The three friends ran out of arguments

📜 They had accused Job for many chapters

🚫 Nothing they said changed Job's mind

📖 Silence opens the door for a new voice

## ⚖️ Because He Was Righteous In His Own Eyes

This phrase describes how Job saw himself, not how God saw him.

Job kept insisting he had done nothing to deserve this suffering.

His friends could not disprove that claim, so they gave up trying.

The phrase leaves open whether Job's self view was fully accurate.

⚖️ Righteous in his own eyes means self assessment

🗣️ Job kept insisting he was innocent

🤷 His friends could not disprove him

📖 The chapter leaves that claim open to question

## 😠 Then Was Kindled The Wrath Of Elihu The Son Of Barachel The Buzite

A new character enters the story for the first time here.

Elihu is introduced with his father's name and his family group.

Buzite likely points back to Buz, a relative of Abraham's brother Nahor.

Wrath kindled means his anger caught fire suddenly, like a flame lit.

🆕 Elihu enters the story for the first time

📛 Barachel was Elihu's father

🌍 Buzite ties him to Abraham's extended family

📖 Kindled wrath means sudden burning anger

## 🌳 Of The Kindred Of Ram

Ram identifies which branch of the wider family Elihu belonged to.

Scholars connect this Ram to the line associated with Abraham's brother Nahor.

Naming a person's clan told ancient readers instantly where they fit.

This detail marks Elihu as an outsider to Job's immediate circle of friends.

🌳 Ram names Elihu's wider family branch

🔗 Many connect this line to Abraham's brother Nahor

🗺️ Clan names told readers where someone fit

📖 Elihu stands apart from Job's three friends

## 💢 Against Job Was His Wrath Kindled, Because He Justified Himself Rather Than God

Elihu's first target of anger was Job himself.

Justified himself means Job kept defending his own innocence loudly.

Elihu believed Job crossed a line by valuing his own case above God's.

This sets up the sharp challenge Elihu is about to bring.

💢 Elihu's anger first fell on Job

🗣️ Justified himself means defending his own innocence

⚠️ Job seemed to rank his case above God

📖 This sets up Elihu's coming challenge

## 😡 Also Against His Three Friends Was His Wrath Kindled

Elihu's anger did not stop with Job.

He was frustrated with Eliphaz, Bildad, and Zophar as well.

Their many speeches had failed to settle the argument.

Elihu saw a failure on both sides of the debate.

😡 Elihu's anger reached the three friends too

👥 Their names were Eliphaz, Bildad, and Zophar

📉 Their speeches failed to settle anything

📖 Elihu saw both sides had failed

## 🚫 Because They Had Found No Answer, And Yet Had Condemned Job

The friends never actually proved their case against Job.

Yet they kept treating him as guilty anyway.

Elihu found that combination dishonest and unfair.

Confidently condemning someone without proof frustrated him deeply.

🚫 The friends never proved their case

⚖️ They still treated Job as guilty

🤨 Elihu found that combination unfair

📖 Confident blame without proof troubled him

# Job 32:4-5
# ⏳ Elihu Waits His Turn
---
## ⏳ Now Elihu Had Waited Till Job Had Spoken

Elihu held his tongue through the entire debate so far.

He let Job and all three friends finish speaking first.

This shows real self control despite his rising frustration.

His patience makes his eventual outburst carry more weight.

⏳ Elihu stayed silent through the whole debate

🗣️ He let everyone else speak first

💪 His patience shows real self control

📖 That patience gives his words more weight

## 👴 Because They Were Elder Than He

In this culture, age was expected to come with wisdom.

Younger men customarily let older men speak before offering their own view.

Elihu followed that custom even though he clearly disagreed with the older men.

His restraint was a matter of respect, not agreement.

👴 Age was expected to bring wisdom

🤐 Younger men waited for elders to speak

🙇 Elihu followed this custom out of respect

📖 Respect did not mean he agreed with them

## 👀 When Elihu Saw That There Was No Answer In The Mouth Of These Three Men

Elihu had been watching closely, waiting for someone to answer Job well.

No answer in the mouth means the friends had nothing left to say.

Their silence told Elihu the debate had reached a dead end.

That dead end is exactly what finally moved him to speak.

👀 Elihu watched closely for a good answer

🤷 The friends had nothing left to say

🛑 Their silence signaled a dead end

📖 That dead end moved Elihu to act

## 🔥 Then His Wrath Was Kindled

This is the third time the text says Elihu's wrath was kindled.

Repeating the phrase drives home just how deeply the silence troubled him.

His anger was not sudden bad temper but frustrated conviction breaking loose.

Job 32 wants the reader to feel that buildup before Elihu speaks.

🔁 This is the third mention of his anger

📢 Repetition shows how deeply this troubled him

💥 It was frustrated conviction, not bad temper

📖 The chapter builds toward Elihu finally speaking

# Job 32:6-10
# 🗣️ Days Should Speak
---
## 👶 I Am Young, And Ye Are Very Old

Elihu opens by naming the obvious gap between himself and the others.

In that culture, a young man rarely challenged his elders openly.

Naming the gap first was a way of asking permission to speak.

It also makes his coming challenge to their wisdom even bolder.

👶 Elihu names the age gap right away

🙅 Young men rarely challenged elders openly

🙏 Naming it first was like asking permission

📖 It makes his challenge even bolder

## 😨 Wherefore I Was Afraid, And Durst Not Shew You Mine Opinion

Durst is an old word that simply means dared.

Elihu admits he was too afraid to speak up until now.

Shew is an old spelling of show, meaning to reveal or share.

His fear came from deep respect for their age, not weakness.

📜 Durst is an old word for dared

😨 Elihu admits he was afraid to speak

👁️ Shew is an old spelling of show

📖 His fear came from respect, not weakness

## 📅 I Said, Days Should Speak, And Multitude Of Years Should Teach Wisdom

This was the common saying of Elihu's culture about age and wisdom.

More years of life were assumed to naturally produce more understanding.

Elihu states this old assumption before he challenges it directly.

He wants the reader to hear the traditional view before hearing his own.

📅 This was a common saying about age

📈 More years were assumed to bring wisdom

🗣️ Elihu states this view before challenging it

➡️ He sets up his own answer next

## 🌬️ But There Is A Spirit In Man

Here Elihu begins to push back against the old assumption.

He points to something deeper than simple years lived.

Every person carries a spirit placed there by God himself.

That spirit, not age alone, is the real source of insight.

🔄 Elihu now pushes back on that assumption

🌬️ Every person carries a spirit from God

🧠 That spirit shapes real insight

➡️ Wisdom does not depend on age alone

## 💡 And The Inspiration Of The Almighty Giveth Them Understanding

Inspiration here means God breathing understanding into a person.

The Almighty is one of the oldest titles for God in Job.

This means true wisdom is a gift, not something earned by growing old.

Elihu is claiming this gift for himself, even though he is young.

💨 Inspiration means God breathing in understanding

👑 The Almighty is an ancient title for God

🎁 Wisdom is a gift, not something earned

📖 Elihu claims this gift despite his youth

## 🧓 Great Men Are Not Always Wise

Elihu names the exception to the old assumption directly.

Being great or important does not guarantee good judgment.

Position and wealth can exist right alongside foolishness.

This clears space for a young man's voice to matter.

🧓 Greatness does not guarantee wisdom

👑 Position and wealth can hide foolishness

🚪 This clears space for a younger voice

📖 Wisdom is not about status

## ⚖️ Neither Do The Aged Understand Judgment

Judgment here means the ability to weigh a matter with honesty.

Elihu says age alone does not guarantee that skill either.

His three older friends are the living proof of his point.

They talked for chapters without settling anything.

⚖️ Judgment means weighing a matter with honesty

👴 Age alone does not guarantee that skill

👥 The three friends prove his point

📖 They talked for chapters without settling it

## 🙋 Therefore I Said, Hearken To Me

Hearken is an old word that means listen closely.

Elihu now formally asks for the floor after his long buildup.

He is not barging in, he is requesting a hearing.

This request completes his opening defense for why he will speak.

📜 Hearken is an old word for listen

🙋 Elihu formally asks for the floor

🚪 He requests a hearing, not barges in

📖 This completes his defense for speaking

# Job 32:11-14
# 👂 None Of You Convinced Job
---
## 👂 Behold, I Waited For Your Words

Elihu describes how carefully he listened during the whole debate.

He did not tune out while the older men were speaking.

His patience was active listening, not passive silence.

That careful listening gives weight to what he says next.

👂 Elihu listened carefully through the debate

🧠 He was not tuning out the others

👀 His patience was active, not passive

📖 That listening gives weight to his words

## 🎧 I Gave Ear To Your Reasons, Whilst Ye Searched Out What To Say

Giving ear is an old phrase for paying close attention.

Whilst is an old word that simply means while.

Elihu even noticed the friends struggling to find their next argument.

He watched their search for words come up empty.

🎧 Giving ear means paying close attention

📜 Whilst is an old word for while

🔍 Elihu noticed them struggling for words

📖 Their search for an answer came up empty

## 🤝 Yea, I Attended Unto You

Yea is an old word that simply means yes.

Attended unto means Elihu gave the friends his full focus.

He is stressing, once again, how seriously he took their words.

This repeated emphasis builds toward the verdict he is about to give.

📜 Yea is an old word for yes

🤝 Attended unto means giving full focus

🔁 Elihu stresses this point again

➡️ It builds toward his coming verdict

## ❌ There Was None Of You That Convinced Job, Or That Answered His Words

Here is the verdict Elihu has been building toward.

None of the three friends actually won the argument.

They never gave Job a real answer to his questions.

Elihu's whole speech grows out of this one hard observation.

❌ None of the friends won the argument

🗣️ They never truly answered Job's questions

🧾 This is Elihu's central verdict

📖 His whole speech grows from this point

## 🙅 Lest Ye Should Say, We Have Found Out Wisdom: God Thrusteth Him Down, Not Man

Elihu imagines an excuse the friends might use for their failure.

Thrusteth him down means striking Job down or defeating him.

He warns them not to hide behind God's judgment instead of real arguments.

Blaming God for their own lack of a real answer would be dishonest.

🙅 Elihu warns against a coming excuse

💥 Thrusteth him down means striking down

🙈 They could hide behind God's judgment

📖 That excuse would avoid real arguments

## 🎯 Now He Hath Not Directed His Words Against Me

Elihu points out that Job never argued directly against him before now.

That means the old arguments the friends used will not automatically work.

Elihu plans to answer Job with fresh reasoning of his own.

He refuses to simply repeat what the three friends already said.

🎯 Job never argued directly against Elihu

🆕 Old arguments will not automatically work here

🧠 Elihu plans fresh reasoning of his own

➡️ He will not just repeat the others

# Job 32:15-17
# 🤐 They Left Off Speaking
---
## 😲 They Were Amazed, They Answered No More

Amazed here means the friends were stunned into silence.

They had run completely out of things to say to Job.

Answered no more shows their argument had truly ended.

Elihu is watching this collapse happen in real time.

😲 Amazed means stunned into silence

🛑 The friends ran out of things to say

🏳️ Their argument had truly ended

📖 Elihu watches this collapse happen

## 🧍 For They Spake Not, But Stood Still, And Answered No More

Elihu explains exactly why he finally decided to speak.

The friends were not just quiet, they stood frozen in place.

That total stillness told him no more words were coming.

Their silence is what finally gives Elihu his opening.

🧍 The friends stood frozen, not just quiet

🤐 Their stillness meant no more words

🚪 This silence gives Elihu his opening

📖 He waited for the right moment to speak

## 🙋 I Said, I Will Answer Also My Part

Elihu finally steps forward into the silence left by the others.

My part suggests he sees his own distinct contribution to make.

He is not trying to replace the three friends' arguments.

He is adding a voice that has not spoken yet.

🙋 Elihu steps into the silence

🧩 My part means his own distinct contribution

🚫 He is not replacing the other three

➡️ He adds a voice not yet heard

# Job 32:18-22
# 🍷 Ready To Burst Like New Bottles
---
## 💬 For I Am Full Of Matter

Matter here means Elihu has a great deal to say.

He pictures himself as completely filled up with things to speak.

Silence has been building pressure inside him this whole time.

He can hold it in no longer.

💬 Matter means he has much to say

📦 Elihu feels completely filled with words

⏱️ Silence has built pressure inside him

📖 He cannot hold it in any longer

## 🌬️ The Spirit Within Me Constraineth Me

Constraineth is an old word that means to press or force.

Elihu feels an inner urge that will not let him stay quiet.

This inner pressure feels bigger than his own choice to speak.

He describes it almost like something pushing him from the inside.

📜 Constraineth is an old word for presses

🌬️ An inner urge will not stay quiet

💪 The pressure feels bigger than his choice

📖 It pushes him to speak from within

## 🍷 Behold, My Belly Is As Wine Which Hath No Vent

Ancient wine was stored in animal skin bags, not glass bottles.

As new wine fermented, gas built up and needed somewhere to escape.

A vent let that pressure out safely before the skin split open.

Elihu compares himself to wine with no way to release that pressure.

🍷 Ancient wine was stored in skin bags

💨 Fermenting wine built up pressure inside

🕳️ A vent let that pressure escape safely

📖 Elihu feels that same trapped pressure

## 💥 It Is Ready To Burst Like New Bottles

New bottles here means fresh skin bags, not glass containers.

A skin bag with no vent could actually split apart under pressure.

Elihu says he feels exactly that close to bursting.

His long silence has finally reached its breaking point.

💥 New bottles means fresh skin bags

🎈 A sealed skin bag could split apart

😤 Elihu feels that close to bursting

📖 His silence has reached its breaking point

## 🗣️ I Will Speak, That I May Be Refreshed

Refreshed means relieved, like pressure finally being let out.

Elihu expects speaking to bring him real relief.

Open my lips pictures him finally letting the words out.

He is ready to answer both Job and the three friends.

🗣️ Refreshed means relief after pressure

😌 Speaking will finally bring him relief

👄 Open my lips pictures words being released

➡️ He is ready to answer everyone

## 🚫 Let Me Not, I Pray You, Accept Any Man's Person

Accepting a man's person is an old idiom for showing favoritism.

It pictures judging someone by status instead of by the truth.

Elihu promises not to play favorites with Job or with the friends.

This vow sets the tone for the fair speech he is about to give.

🚫 Accepting a person means showing favoritism

👑 It means judging by status, not truth

⚖️ Elihu promises not to play favorites

📖 This sets the tone for a fair speech

## 🙅 Neither Let Me Give Flattering Titles Unto Man

Flattering titles means praising someone falsely to win their favor.

Elihu refuses to soften the truth just to please powerful men.

He wants his coming words to be honest, not polite performance.

That honesty is exactly what he felt was missing from the friends.

🙅 Flattering titles means false praise for favor

🎭 Elihu refuses to just please powerful men

🎯 He wants honest words, not performance

📖 That honesty was missing from the friends

## 😨 For I Know Not To Give Flattering Titles

Elihu admits he simply does not have the skill for empty flattery.

My maker refers to God, the one who created him.

He fears that flattering people would offend the God who made him.

That fear of God, not fear of man, will steady his words.

😨 Elihu admits he cannot fake flattery

👑 My maker refers to God himself

⚠️ Flattery would offend the God who made him

📖 Fear of God steadies his coming words
`.trim();

export const JOB_THIRTY_TWO_PERSONAL_SECTIONS = parseJobThirtyTwoRawNotes(JOB_THIRTY_TWO_RAW_NOTES);
