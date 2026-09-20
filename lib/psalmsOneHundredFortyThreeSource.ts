export type PsalmsOneHundredFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyThreeRawNotes(rawText: string): PsalmsOneHundredFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+143:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 143 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+143:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+143:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 143 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 143,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 143:${startVerse}` : `Psalms 143:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 143 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_THREE_RAW_NOTES = `# Psalms 143:1-2
# 🙏 A Prayer That Leans On God's Character
---
## 👂 Give Ear To My Supplications

"Give ear" is an old way of saying listen closely.

David is not just praying.

He is begging.

"Supplications" means an urgent, humble request.

Think of someone begging before a king.

Saying both prayer and supplications shows real desperation.

👂 Give ear means listen closely
🙏 Supplications means an urgent humble plea
👑 Like begging before a king
📖 Two words together show real desperation

## 🤝 In Thy Faithfulness Answer Me, And In Thy Righteousness

David does not base this request on his own goodness.

He appeals to two things about God instead.

"Faithfulness" means God always keeps His promises.

"Righteousness" means God always does what is right.

David is asking God to act like Himself.

🙅 Not based on David's own goodness
🤝 Faithfulness means God keeps His promises
⚖️ Righteousness means God does what is right
📖 David appeals to God's character

## ⚖️ Enter Not Into Judgment With Thy Servant

"Enter into judgment" pictures a courtroom trial.

David asks God not to put him on trial.

Strict judgment would leave David guilty.

David wants mercy instead of a verdict.

⚖️ Enter into judgment means a courtroom trial
🙅 David asks God not to try him
📉 Strict judgment would leave him guilty
📖 He wants mercy, not a verdict

## 👤 Shall No Man Living Be Justified

"Justified" means declared right and innocent.

No living person could pass that test.

That includes David himself.

Every human being falls short of God's standard.

This truth explains why David begs for mercy.

👤 Justified means declared right and innocent
🙅 No living person passes that test
😳 Even David includes himself
📖 Mercy matters more than a fair trial

# Psalms 143:3-4
# 😔 Crushed Down And Overwhelmed
---
## 🏹 The Enemy Hath Persecuted My Soul

"Persecuted" means hunted down without mercy.

This is not simple teasing or unfair treatment.

David describes a real, ongoing pursuit against his life.

Someone wanted him destroyed, not just annoyed.

🏹 Persecuted means hunted without mercy
🚫 Not simple teasing or unfairness
🎯 A real pursuit against his life
📖 The enemy wanted him destroyed

## 📉 Smitten My Life Down To The Ground

"Smitten" means struck down hard.

David pictures himself pressed flat, defeated completely.

This is not a small setback.

He describes total defeat, as low as a person can go.

📉 Smitten means struck down hard
🥊 David pictures total defeat
⬇️ As low as a person can go
📖 Not a small setback

## ⚰️ Made Me To Dwell In Darkness, As Those That Have Been Long Dead

David compares his situation to living in a tomb.

"Long dead" pictures bodies buried a long time ago.

They have already been forgotten by the living.

David feels forgotten in the same way.

Being alive can still feel like being buried.

⚰️ Darkness pictures living in a tomb
💀 Long dead means buried and forgotten
😔 David feels forgotten too
📖 Being alive can still feel buried

## 😵 My Spirit Overwhelmed Within Me

"Overwhelmed" means fainting, like someone about to collapse.

David is describing a total loss of strength.

This is not just a bad mood.

Everything in him feels like it is shutting down.

Even in that state, David keeps speaking to God.

😵 Overwhelmed means near collapse
🔋 A total loss of strength
🚫 Not just a bad mood
📖 Even collapsed, David keeps praying

## 💔 My Heart Within Me Is Desolate

"Desolate" means empty and ruined, like an abandoned house.

David is not hiding how bad things feel.

He names the emptiness out loud instead of pretending.

Honest prayer does not require a brave face.

💔 Desolate means empty and ruined
🏚️ Like an abandoned house
🗣️ David names the emptiness out loud
📖 Honest prayer needs no brave face

# Psalms 143:5-6
# 💭 Remembering And Thirsting
---
## 📜 I Remember The Days Of Old

David does not stay stuck in his pain.

He deliberately turns his mind to God's past faithfulness.

"Days of old" means the years already behind him.

They were filled with times God came through.

Remembering the past can steady a person in the present.

📜 Days of old means years already lived
🔁 Filled with times God came through
🧠 David deliberately remembers on purpose
📖 The past can steady the present

## 🤔 I Meditate On All Thy Works, I Muse On The Work Of Thy Hands

Hebrew poetry often repeats one idea in two different lines.

"Meditate" means thinking deeply on something.

"Muse" means turning it over slowly in the mind.

Both words describe the same slow, deliberate thinking.

David is not glancing at God's works.

He is studying them closely.

🔁 Poetry often repeats one idea twice
🤔 Meditate means thinking deeply
💭 Muse means turning something over slowly
📖 David studies God's works, not just glances

## 🙌 I Stretch Forth My Hands Unto Thee

Lifting the hands upward was a common prayer posture in David's time.

It pictured empty, open hands lifted toward heaven.

The gesture said something words alone could not.

David was surrendering completely, holding nothing back.

🙌 Stretched hands was a common prayer posture
🖐️ Pictured empty hands lifted to heaven
🗣️ A gesture words alone could not say
📖 David surrendered completely to God

## 🏜️ My Soul Thirsteth After Thee, As A Thirsty Land

"Thirsteth" is an old way of saying thirsts intensely.

David compares his need for God to a cracked, dry desert ground.

That kind of ground does not just want water.

It cannot survive without it.

David is saying he cannot survive without God either.

🏜️ Thirsteth means an intense thirst
🏞️ Compared to cracked desert ground
💧 Dry ground cannot survive without water
📖 David cannot survive without God

## 🎵 Selah

"Selah" appears often in the Psalms but never inside a normal sentence.

Many scholars believe it was a musical pause.

It may have marked a moment to let the words sink in.

No one alive today knows its exact meaning for certain.

It still invites the reader to slow down and think.

🎵 Selah appears often in the Psalms
⏸️ Many scholars believe it marked a pause
❓ Its exact meaning is not fully known
📖 It still invites the reader to slow down

# Psalms 143:7-8
# 🌅 Mercy In The Morning
---
## ⏱️ Hear Me Speedily, O LORD, My Spirit Faileth

"Speedily" means without delay, right now.

David is not asking for help someday.

He needs it immediately.

"Spirit faileth" means his strength is running out fast.

The urgency here matches the darkness described earlier in the psalm.

⏱️ Speedily means without delay
🚨 David needs help immediately
🔋 Spirit faileth means strength is running out
📖 Urgency matches the darkness already described

## 🙈 Hide Not Thy Face From Me

In the Bible, God's face often represents His attention and favor.

For God to hide His face means He seems distant or silent.

David is not afraid of God's anger here.

He is afraid of God's silence.

🙈 God's face represents His attention
❄️ Hiding it means feeling distant or silent
😨 David fears silence more than anger
📖 Distance from God feels unbearable

## 🕳️ Lest I Be Like Unto Them That Go Down Into The Pit

"The pit" is a common Old Testament picture for the grave.

David is not being dramatic for effect.

He genuinely believes he is close to death.

This request is a matter of life and death, not just discomfort.

🕳️ The pit pictures the grave
⚰️ David feels close to death
🚨 This is life and death, not discomfort
📖 Real danger, not exaggeration

## 🌅 Cause Me To Hear Thy Lovingkindness In The Morning

"Lovingkindness" translates a Hebrew word meaning loyal, covenant love.

It is love that keeps a promise no matter what.

Morning was a common Old Testament picture for new mercy after a hard night.

David is asking to wake up to that love again.

🌅 Morning pictures new mercy after hardship
🤝 Lovingkindness means loyal, covenant love
📜 It keeps a promise no matter what
📖 David asks to wake up to that love

## 🧭 Cause Me To Know The Way Wherein I Should Walk

David is not only asking to be rescued.

He is asking for direction on what to do next.

"The way" pictures a clear path instead of confusion.

Rescue without direction can still leave a person lost.

🧭 David asks for direction, not just rescue
🛤️ The way pictures a clear path
🤷 Without direction, rescue can still feel lost
📖 David wants both safety and clarity

## 🙌 For I Lift Up My Soul Unto Thee

"Lift up my soul" means offering his whole self to God.

This is not a casual phrase.

David used nearly the same words in Psalm twenty five, years earlier.

The same trust from that earlier prayer carries into this one.

🙌 Lift up my soul means full surrender
🔁 Nearly the same words as Psalm twenty five
📆 The same trust across many years
📖 Ongoing trust, not a one time phrase

# Psalms 143:9-10
# 🧭 Refuge And Guidance
---
## 🏃 I Flee Unto Thee To Hide Me

"Flee" pictures someone running for their life, not casually walking away.

David does not run to a physical hiding place.

He runs straight to God instead.

God Himself becomes the hiding place his enemies cannot reach.

🏃 Flee means running for one's life
🙅 Not a physical hiding place
🛡️ God Himself is the hiding place
📖 Enemies cannot reach him there

## 📖 Teach Me To Do Thy Will

David does not only want to survive his enemies.

He wants to actually live the right way afterward.

"Thy will" means what God wants, not what David prefers.

Rescue was never meant to be the whole goal.

📖 David wants more than survival
🎯 He wants to live rightly afterward
🙏 Thy will means what God wants
➡️ Rescue was never the whole goal

## 🕊️ Thy Spirit Is Good

This is one of the clearer Old Testament mentions of God's own Spirit.

David does not just want guidance from a rulebook.

He wants the living presence of God to lead him personally.

"Good" here means trustworthy, not just kind.

🕊️ An early mention of God's own Spirit
📜 More than a rulebook
🤝 A living presence, not just rules
📖 Good here means trustworthy

## 🗺️ Lead Me Into The Land Of Uprightness

"Uprightness" means living in a way that is honest and right before God.

Verse four described David dwelling in darkness like the dead.

That darkness is not where this psalm ends.

David asks God to lead him toward the opposite instead.

🗺️ Uprightness means living honestly before God
😔 Verse four described dwelling in darkness
🔀 That darkness is not the end
📖 David is led toward the opposite

# Psalms 143:11-12
# ⚖️ For His Own Name's Sake
---
## 💨 Quicken Me, O LORD, For Thy Name's Sake

"Quicken" is an old word meaning to make alive or revive.

David is asking for new strength, not just relief from danger.

He does not base the request on his own record.

He bases it on God's name, meaning God's own reputation and honor.

💨 Quicken means to make alive again
💪 David asks for new strength
🙅 Not based on his own record
📖 Based on God's reputation instead

## 🛡️ For Thy Righteousness' Sake Bring My Soul Out Of Trouble

David repeats the same appeal from verse one.

This is not God bending the rules.

This is God simply being who He already is.

Righteousness and rescue are not opposites here.

🔁 Repeats the appeal from verse one
🙅 Not God bending any rules
✅ God simply being who He is
📖 Righteousness and rescue are not opposites

## 🔥 Cut Off Mine Enemies, And Destroy All Them That Afflict My Soul

This request can sound harsh to modern ears.

David is not asking to personally take revenge.

He is asking God, the rightful judge, to bring real justice.

David hands the outcome to God.

🔥 Can sound harsh to modern readers
🙅 Not David taking revenge himself
⚖️ God is asked to bring justice
📖 David hands the outcome to God

## 🙏 For I Am Thy Servant

David ends the psalm exactly where he began it, calling himself God's servant.

That same word appeared back in verse two.

A servant does not get to demand.

A servant simply trusts the master.

The whole prayer rests on that one identity.

🙏 Servant repeats the word from verse two
🙅 A servant does not demand
🤝 A servant trusts the master
📖 The whole prayer rests on that identity
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_THREE_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyThreeRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_THREE_RAW_NOTES,
);
