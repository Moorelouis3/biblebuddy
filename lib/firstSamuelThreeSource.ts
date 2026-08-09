export type FirstSamuelThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelThreeRawNotes(rawText: string): FirstSamuelThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 3:${startVerse}` : `1 Samuel 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_THREE_RAW_NOTES = `# FirstSamuel 3:1-3
# 🕯️ The Lamp Not Yet Gone Out
---
## 🍼 The Child Samuel Ministered Unto The LORD Before Eli

"Ministered" means Samuel already had real daily duties inside the tabernacle.

He was still a boy, yet he carried responsibility that normally belonged to grown priests.

This line picks up right where chapter two left off.

Faithful service came first, before God ever spoke to him directly.

🍼 Ministered means real daily tabernacle duties

👦 Samuel was still just a boy

🔁 Picks up right where chapter two ended

📖 Faithful service came before God's direct voice

## 📯 The Word Of The LORD Was Precious In Those Days

"Precious" here means rare, not treasured like gold.

Direct messages from God through a true prophet were uncommon at this point in Israel's story.

No prophet had spoken clearly to the nation for a long stretch of time.

That silence sets up why the events of this chapter feel so unusual.

📯 Precious here means rare, not cherished

🤐 Direct words from God were uncommon

⏳ No prophet had spoken in a long time

📖 That silence makes this chapter unusual

## 👀 There Was No Open Vision

An "open vision" was a clear, direct message straight from God.

Moses had once received messages like this generations earlier.

This does not mean people were literally blind.

It means that clear channel from God had gone quiet for a season.

Eli's own fading eyesight in the next verse pictures that same quiet.

👀 Open vision means a clear direct message

🕰️ Moses once received messages like this

🚫 It does not mean people were blind

📖 Eli's fading eyes mirror that same quiet

## 😔 His Eyes Began To Wax Dim, That He Could Not See

"Wax dim" is an old way of saying grow weak or grow dark.

Eyesight naturally fades like this with old age.

Eli was old enough now that his whole household was failing too.

This physical fading sits right next to the spiritual dimness named one verse earlier.

The old priest could no longer see clearly, in more ways than one.

😔 Wax dim means fading eyesight

👴 Eli's whole household was failing too

🔗 It echoes the spiritual dimness just named

📖 He could no longer see clearly either way

## 🕯️ Ere The Lamp Of God Went Out In The Temple Of The LORD

"Ere" is an old word for before.

The "lamp of God" was the golden lampstand kept burning through the night inside the tabernacle.

Priests were required to keep it lit from evening until morning.

A lamp burning this low meant the night was almost over.

This detail is not decoration.

It marks the exact hour the story is happening.

🕯️ Ere is an old word for before

🪔 The lamp burned inside the tabernacle overnight

🌅 A low flame signals it was near dawn

📖 The detail marks the exact hour

## 📦 Where The Ark Of God Was

The "ark of God" was the gold covered chest holding the stone tablets of the law.

It sat in the innermost, most holy room of the tabernacle.

Most priests never even entered that inner room in their whole lives.

Naming its location shows Samuel was sleeping very near that most sacred space.

God is about to speak from the one place He promised to meet His people.

📦 Ark held the stone tablets of the law

🚪 Most priests never entered that inner room

😴 Samuel slept very close to that space

📖 God speaks from His promised meeting place

## 😴 Samuel Was Laid Down To Sleep

Sleeping this close to the ark was likely a mark of deep trust.

A child resting near Israel's most sacred object shows how fully Samuel belonged to tabernacle life.

Nothing in the text suggests he expected anything unusual that night.

An ordinary night is about to change the whole direction of his life.

😴 Sleeping there showed deep trust

🧒 Samuel fully belonged to tabernacle life

🌙 He expected only an ordinary night

📖 That ordinary night changed his whole life

# FirstSamuel 3:4-9
# 👂 A Voice He Does Not Yet Know
---
## 👂 The LORD Called Samuel: And He Answered, Here Am I

This is the first time in the Bible the LORD calls Samuel by name directly.

"Here am I" was a standard way of answering when someone called your name.

Abraham and Moses both answered God with this exact same phrase earlier in scripture.

Samuel naturally assumed the voice belonged to a person, since he had no reason to expect otherwise.

👂 First time God calls Samuel by name

🙋 Here am I was a normal answer

📜 Abraham and Moses answered God the same way

📖 Samuel assumed the voice was human

## 🏃 He Ran Unto Eli, And Said, Here Am I

Running instead of walking shows Samuel came instantly, without hesitation.

Eli was the only adult voice Samuel had ever known calling him at night.

It made sense for a boy raised in Eli's household to assume it was him.

Samuel's quick obedience is a small detail that says a lot about his character.

🏃 Running shows instant, willing obedience

👴 Eli was the only voice he knew

🤔 Assuming it was Eli made sense

📖 Quick obedience reveals his character

## 🛌 I Called Not, My Son, Lie Down Again

Eli's answer is patient, not annoyed, even though he was woken twice already.

"My son" was a term of affection, not just a formal address.

Eli genuinely had no idea yet that this was God speaking to the boy.

His patience here matters, since patience with his own sons is exactly what he lacked.

🛌 Eli answers with patience, not anger

❤️ My son was a term of affection

❓ Eli had no idea it was God

📖 This patience contrasts his failures with his sons

## 🤷 Samuel Did Not Yet Know The LORD

This does not mean Samuel lacked faith in God.

It means he had never personally heard God speak before this night.

Growing up near the tabernacle was not the same as hearing God's own voice.

Every prophet has a first time.

This night was about to become Samuel's.

🤷 Not a lack of faith

🆕 He had never heard God speak before

🏛️ Nearness to the tabernacle was not enough

📖 Every prophet has a first time

## 🔁 The LORD Called Samuel Again The Third Time

God calls a third time, patiently repeating Himself.

Samuel's confusion is not treated as a failure on his part.

Three trips to Eli in one night shows real persistence, not carelessness.

This repetition is what finally leads Eli to understand what is happening.

🔁 God patiently repeats Himself a third time

🙅 Samuel's confusion is not treated as failure

🏃 Three trips to Eli shows real persistence

📖 The repetition leads Eli to understand

## 💡 Eli Perceived That The LORD Had Called The Child

"Perceived" means Eli finally put the pieces together and understood what was happening.

Despite his own failures as a father, Eli still recognized the voice of God at work.

This is a moment of real spiritual insight from an otherwise weak leader.

Eli's story in this book is complicated, not simply good or simply bad.

💡 Perceived means he finally understood

🧠 Eli recognized God's voice at work

⚖️ A moment of insight from a weak leader

📖 Eli's story is complicated, not simple

## 🗣️ For Thy Servant Heareth

Eli teaches Samuel the exact words to say if the voice calls again.

"Servant" is the posture Eli tells him to take, ready to listen and obey.

This is the same word "hearken" that Eli's own sons refused to practice one chapter earlier.

Samuel is being trained into the very obedience Hophni and Phinehas rejected.

🗣️ Eli gives Samuel the exact words to say

🙏 Servant means ready to listen and obey

🔗 It echoes the hearkening his sons refused

📖 Samuel is trained into the obedience they rejected

# FirstSamuel 3:10-14
# ⚖️ Judgment Spoken Against Eli's House
---
## 🌌 The LORD Came, And Stood, And Called As At Other Times

This time the text says the LORD "came and stood," not just called from a distance.

That small detail suggests something closer to a personal appearance than the earlier three calls.

"As at other times" tells the reader this is still the same familiar voice from before.

Samuel is finally ready to answer as himself instead of running to Eli again.

🌌 The LORD came and stood this time

📏 That suggests a closer, personal appearance

🔁 As at other times confirms the same voice

📖 Samuel finally answers on his own

## 👂 Both The Ears Of Every One That Heareth It Shall Tingle

"Tingle" pictures a sharp physical reaction to genuinely shocking news.

This same phrase is used elsewhere in scripture to describe news of national disaster.

God is warning Samuel up front that what follows is severe, not gentle correction.

A boy is about to receive one of the hardest messages any prophet ever carried.

👂 Tingle pictures a shocked physical reaction

📰 The same phrase describes national disaster elsewhere

⚠️ God warns Samuel this news is severe

📖 A boy carries one of the hardest messages

## ⏳ When I Begin, I Will Also Make An End

This line promises the judgment will be carried out completely, not partway.

God is not threatening a warning shot that Eli's family might still escape.

Once this process starts, nothing will stop it from finishing.

The certainty here matches how clearly Eli's sons had already been warned and ignored it.

⏳ The judgment will be carried out fully

🚫 It is not just a warning shot

🔒 Nothing will stop it once it starts

📖 The certainty matches the ignored warnings

## 📜 For The Iniquity Which He Knoweth

"Iniquity" means willful, ongoing sin, not an honest mistake.

God specifically says Eli already knew about his sons' sin.

Not stopping wrong once you know about it is treated as its own guilt.

Eli cannot claim ignorance as an excuse for what happened in his house.

📜 Iniquity means willful, ongoing sin

👀 Eli already knew what his sons did

⚖️ Not stopping known sin is its own guilt

📖 Eli has no excuse of ignorance

## 🐄 His Sons Made Themselves Vile, And He Restrained Them Not

"Vile" is the same idea as "sons of Belial" from the previous chapter, meaning worthless and wicked.

"Restrained" means Eli had the authority to stop them and did not use it.

The blame here rests on their own choices, not just Eli's weakness.

Eli's failure was letting known evil continue unchecked, not causing the evil himself.

🐄 Vile echoes sons of Belial from before

🚫 Restrained means Eli had power to stop them

👥 The sons made their own choices

📖 Eli's failure was letting evil go unchecked

## 🩸 The Iniquity Of Eli's House Shall Not Be Purged With Sacrifice Nor Offering

Normally, sacrifices could cover sin and restore a person's standing with God.

"Purged" means cleansed or wiped away, the whole purpose of the offering system.

This sin is different because it was willful and repeated, not accidental.

No ritual can fix what only genuine repentance and change could have addressed.

🩸 Sacrifice normally covered and restored sin

🧼 Purged means cleansed or wiped away

🔁 This sin was willful, not accidental

📖 No ritual replaces real repentance

# FirstSamuel 3:15-18
# 🌅 Samuel Tells Eli Everything
---
## 🚪 Opened The Doors Of The House Of The LORD

Opening the doors was one of Samuel's regular morning duties.

He performed this ordinary task the very same morning he received an enormous message.

Life continues on with its normal routines even after something enormous happens.

Samuel does his job before he tells anyone what he heard.

🚪 One of Samuel's regular morning duties

😮 Done the same morning as the message

🔄 Life continued with its normal routines

📖 He worked before he told anyone

## 😨 Samuel Feared To Shew Eli The Vision

"Shew" is an old spelling of show, meaning to tell or reveal.

Samuel is afraid, even though he did nothing wrong himself.

The fear makes sense, since the message was harsh judgment against Eli's own family.

Telling the truth can be frightening even when the truth is not your fault.

😨 Shew is an old word for show

🙅 Samuel had done nothing wrong himself

⚠️ The message was harsh judgment on Eli's family

📖 Truth can be frightening even when innocent

## 👴 Samuel, My Son

Eli still calls Samuel "my son," gentle language even in a tense moment.

This is the same warm title Eli used earlier in the chapter.

Eli senses something happened and presses Samuel for the truth.

The relationship between them stays tender even as the conversation turns serious.

👴 My son is warm, affectionate language

🔁 The same title Eli used earlier

❓ Eli senses something happened

📖 Their bond stays tender under pressure

## 🤞 God Do So To Thee, And More Also

This was a common ancient way of swearing a serious oath.

The phrase calls down a curse on the speaker if they break their word.

Eli is not casually asking.

He is demanding the full truth under oath.

A high priest using this formula shows how seriously he takes God's message.

🤞 A common ancient oath formula

⚠️ It calls down a curse if broken

❗ Eli demands the full truth

📖 He takes God's message seriously

## 🗝️ Samuel Told Him Every Whit, And Hid Nothing From Him

"Every whit" is an old phrase meaning every single part.

Samuel could have softened the message.

That would have meant leaving out the part naming Eli's own sons.

Instead he gave the complete, honest report.

That included the parts that hurt to say.

Full honesty here contrasts sharply with Eli's own softness toward his sons.

🗝️ Every whit means every single part

😬 He could have softened the message

✅ He gave the complete honest report instead

📖 His honesty contrasts Eli's past softness

## 🙏 It Is The LORD: Let Him Do What Seemeth Him Good

Eli's response here is real submission.

This is different from the weak protest he gave his sons earlier.

"Seemeth him good" means whatever God decides is right.

That includes decisions that are painful.

This is the strongest, most faithful line Eli speaks in the whole book.

Accepting hard news well does not erase past failures.

It still matters on its own.

🙏 Eli responds with real submission

😌 Seemeth him good means God decides right

💪 His strongest, most faithful line in the book

📖 Accepting hard news still matters

# FirstSamuel 3:19-21
# 📣 Established As A Prophet
---
## 🎯 Did Let None Of His Words Fall To The Ground

This is an old idiom meaning every word Samuel spoke as a prophet came true.

Nothing he said failed or fell short of happening.

This is a strong claim, since a false prophecy carried serious consequences under God's law.

Samuel's reliability becomes the foundation for the trust Israel places in him next.

🎯 An idiom for words that all came true

✅ Nothing he said ever failed

⚖️ False prophecy carried serious consequences

📖 His reliability built Israel's trust in him

## 🗺️ All Israel From Dan Even To Beersheba

"Dan" was a town in the far north of Israel, "Beersheba" in the far south.

Naming both together was a common way of saying the whole land, end to end.

This phrase appears elsewhere in the Old Testament for the same purpose.

Samuel's reputation had reached every corner of the nation, not just his own town.

🗺️ Dan marks the far north

🏜️ Beersheba marks the far south

🌍 Together they mean the whole land

📖 Samuel's reputation reached every corner

## 👑 Established To Be A Prophet Of The LORD

"Established" means confirmed and trusted.

It was not just something Samuel could claim for himself.

Israel had gone a long stretch without a reliable prophet.

This title placed Samuel in the same category as Moses before him.

A boy who once mistook God's voice for Eli's is now recognized nationwide.

👑 Established means confirmed and trusted

🚫 Not something he could claim himself

📉 Israel had lacked a reliable prophet

📖 A confused boy is now recognized nationwide

## 🏕️ The LORD Appeared Again In Shiloh

"Again" points back to verse one, when visions from God were rare.

Shiloh was the town where the tabernacle stood during this whole period of Israel's history.

What began as one strange night for one boy becomes an ongoing pattern.

The silence named at the start of the chapter has now been broken.

🏕️ Again points back to verse one

📍 Shiloh housed the tabernacle at this time

🔁 One strange night becomes an ongoing pattern

📖 The chapter's opening silence is broken

## 📖 By The Word Of The LORD

God appeared here through spoken revelation.

This was not a physical, visible form like a burning bush.

The chapter opened in complete silence.

It closes with God speaking clearly and often.

Samuel's story does not end at this chapter.

It is only just beginning.

📖 God appeared through spoken revelation

🚫 Not a visible, physical form

🔇 The chapter opened in silence

➡️ Samuel's story is only beginning
`.trim();

export const FIRST_SAMUEL_THREE_PERSONAL_SECTIONS = parseFirstSamuelThreeRawNotes(FIRST_SAMUEL_THREE_RAW_NOTES);
