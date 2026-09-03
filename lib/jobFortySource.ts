export type JobFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFortyRawNotes(rawText: string): JobFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 40:${startVerse}` : `Job 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 40 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FORTY_RAW_NOTES = `# Job 40:1-5
# 🤐 Job Chooses Silence
---
## 🗣️ The LORD Answered Job And Said

God is not finished speaking.

This line marks a short pause inside one long speech.

That speech began back in Job thirty eight.

The pause itself puts pressure on Job to respond.

🌪️ God's speech from Job thirty eight continues

⏸️ This verse marks a short pause

📢 The pause invites Job to respond

📖 Even silence from God carries weight

## ❓ He That Reproveth God Let Him Answer It

"Contendeth" means to argue or dispute with someone.

"Reproveth" means to criticize or find fault with someone.

Job used both against his friends throughout the book.

Now God turns that same challenge back on him.

⚔️ Contendeth means to argue or dispute

👎 Reproveth means to criticize or blame

🗣️ Job used both against his friends

📖 God turns the same challenge on Job

## 🗣️ Then Job Answered The LORD

For the first time in this entire book, Job speaks straight to God.

Every earlier speech in Job was aimed at his three friends or at Elihu.

Now the argument finally reaches the one Job wanted to face all along.

His answer is not the long defense he once promised to bring.

🗣️ Job now speaks straight to God

👥 Earlier speeches targeted friends and Elihu

🎯 The real conversation finally arrives

📖 Job's answer is not the defense he promised

## 😳 Behold I Am Vile

Many readers assume vile here means morally evil or disgusting.

The word actually points to being small, light, or unworthy.

Job is not confessing new secret sins in this line.

He is admitting he has no standing to argue with God.

😳 Vile does not mean morally evil

🪶 It points to being small or unworthy

🙊 Job is not confessing hidden sin

📖 Job admits he has no standing to argue

## 🤐 I Will Lay Mine Hand Upon My Mouth

Laying a hand over the mouth was an old gesture for silence.

It meant choosing not to speak another word.

Job had filled chapter after chapter with long, detailed arguments.

Here he finally chooses quiet instead of one more defense.

🤐 Laying a hand on the mouth means silence

🗣️ It means choosing not to speak

📚 Job had filled many chapters with arguments

📖 He finally chooses quiet over another defense

## 🔢 Once Have I Spoken But I Will Not Answer

The words once and twice form a Hebrew counting pattern for emphasis.

It does not mean exactly one time and then exactly two.

It means Job has spoken enough times already.

He commits here to stop arguing for good.

🔢 Once and twice form a counting pattern

📢 It signals repeated speech, not an exact count

🛑 Job has spoken more than enough already

📖 He commits to stop arguing for good

# Job 40:6-9
# 🌪️ The Second Whirlwind Speech Begins
---
## 🌪️ Then Answered The LORD Unto Job

This is God's second whirlwind speech in as many chapters.

Job's brief silence in verse five did not end the questioning.

God is not finished making his point yet.

An even harder round of questions is about to begin.

🌪️ God speaks a second time from the whirlwind

🤫 Job's silence did not end the questioning

📢 God still has more to say

📖 A harder round of questions begins now

## 💪 Gird Up Thy Loins Now Like A Man

God repeats the exact command already given back in Job thirty eight.

That phrase called for tucking up long robes to move and work.

Repeating it here frames both speeches as one connected challenge.

Job still owes God a straight answer, not another delay.

🔁 God repeats his command from Job thirty eight

👘 It pictures tucking up robes to work

🔗 The repeat links both speeches together

📖 Job still owes a straight answer

## ⚖️ Wilt Thou Disannul My Judgment

"Disannul" means to cancel or completely undo something official.

God asks whether Job wants to cancel God's own ruling.

Job would have to be right for that to work.

That would also mean God was wrong.

📜 Disannul means to cancel something official

⚖️ Job would need to cancel God's ruling

🙅 That would require God to be wrong

📖 Job cannot be right at God's expense

## ⚡ Hast Thou An Arm Like God

"Arm" here is an old way of saying raw power or strength.

God asks if Job's own strength compares to his.

"Thunder with a voice like him" pictures a voice as loud as a storm.

Nobody could honestly answer yes to either question.

💪 Arm is an old word for strength

❓ God asks if Job matches his power

⛈️ Thundering voice pictures storm level sound

📖 No honest answer to this is yes

# Job 40:10-14
# 👑 Array Thyself With Glory And Beauty
---
## 👑 Deck Thyself With Majesty And Excellency

"Majesty," "excellency," "glory," and "beauty" are all royal words.

God tells Job to put them on like clothing.

No human being actually owns any of these qualities.

The invitation exposes exactly what Job is missing.

👑 Majesty and excellency are royal words

👗 God tells Job to wear them

🚫 No human truly owns these qualities

📖 The offer exposes what Job lacks

## 💢 Cast Abroad The Rage Of Thy Wrath

"Cast abroad" means to scatter something out over a wide area.

"Abase" means to humble or bring someone low.

God challenges Job to punish every proud person on earth.

That kind of complete justice belongs to God alone.

🌪️ Cast abroad means scatter widely

📉 Abase means to bring someone low

👥 Job would need to judge every proud person

📖 Complete justice belongs to God alone

## 👣 Look On Every One That Is Proud

This verse repeats the same demand from the line before it.

Hebrew poetry often restates one idea in two different ways.

"Tread down in their place" means crushing them right where they stand.

The repetition makes the challenge impossible to miss.

🔁 This verse restates the same challenge

📝 Hebrew poetry often repeats an idea twice

👣 Tread down means crush them on the spot

📖 Repetition makes the challenge impossible to miss

## ⚰️ Hide Them In The Dust Together

"Hide them in the dust" pictures burying the proud completely.

"Bind their faces in secret" pictures covering their faces like a prisoner's.

God is describing total, final judgment here.

Job cannot deliver justice anywhere close to this.

⚰️ Hide in the dust means bury completely

🙈 Bind their faces pictures covering like a prisoner

⚖️ This describes total final judgment

📖 Job cannot deliver justice like this

## ✋ Thine Own Right Hand Can Save Thee

"Right hand" is another old way of naming personal power.

God says he would praise Job only if Job could save himself this way.

That condition can never actually be met.

The whole challenge proves Job needs a savior outside himself.

✋ Right hand means personal power

🏆 God offers praise only if Job saves himself

🚫 That condition can never be met

📖 Job needs a savior outside himself

# Job 40:15-19
# 🦛 Behold Now Behemoth
---
## 🦛 Behold Now Behemoth Which I Made With Thee

"Behemoth" is a Hebrew word built to mean something like a great beast.

Many scholars believe it points to a hippopotamus or a similar giant land animal.

"Made with thee" means God created this animal the same way he created Job.

Behemoth is a fellow creature, not a rival god.

🦛 Behemoth means something like a great beast

🐘 Many scholars picture a hippo or similar giant

🤝 Made with thee means a fellow creature

📖 Behemoth is not a rival god

## 🦴 His Strength Is In His Loins

"Loins" refers to the hips and lower back area of the body.

"The navel of his belly" points to the muscles across the stomach.

Both phrases describe raw core strength, not just big muscles anywhere.

This creature's power sits at its very center.

🦴 Loins means the hips and lower back

💪 Navel of his belly points to core muscles

🏋️ The power centers on the body's core

📖 This creature's strength sits at its center

## 🌲 He Moveth His Tail Like A Cedar

A cedar was one of the largest, strongest trees in the ancient world.

Comparing the tail to a cedar pictures something thick and powerful.

"The sinews of his stones" is an old way of describing the muscles of the thighs.

Every image in this verse points to unmatched physical strength.

🌲 A cedar was one of the largest trees

🐍 The tail comparison pictures great thickness

🦵 Sinews of his stones means thigh muscles

📖 Every detail points to unmatched strength

## 🔩 His Bones Are Like Bars Of Iron

Brass and iron both describe metals that do not bend or break easily.

Naming both together doubles the emphasis on the same idea.

The picture is a skeleton built like forged metal.

Behemoth is not just strong, he seems unbreakable.

🔩 Brass and iron both mean unbreakable metal

🔁 Naming both together doubles the emphasis

🦴 The skeleton is pictured as forged metal

📖 Behemoth seems built to be unbreakable

## 🏆 He Is The Chief Of The Ways Of God

"Chief of the ways of God" means the most impressive creature in this whole list.

Behemoth outranks the wild goats, ostrich, horse, and eagle already named.

"His sword" belongs to God, not to any human hunter.

Only the one who made this creature can ever control it.

🏆 Chief of the ways means most impressive

📋 Behemoth outranks every creature named before it

⚔️ His sword belongs to God alone

📖 Only the Creator can control this creature

# Job 40:20-24
# 🌊 Behemoth's Fearless Confidence
---
## ⛰️ The Mountains Bring Him Forth Food

A creature this size could easily be a danger to every animal nearby.

Instead the mountains simply supply his food without any conflict.

Other wild animals play freely in the very same space.

Size alone does not make this creature a threat to others.

⛰️ The mountains supply Behemoth's food

🕊️ Other animals play safely nearby

🚫 Size does not make him a threat

📖 A giant creature can still live at peace

## 🌾 In The Covert Of The Reed And Fens

"Covert" means a hidden, sheltered spot, often thick plant cover.

"Fens" are wet, marshy areas near rivers or lakes.

This creature rests in thick reeds beside the water.

The habitat described here fits a large water loving animal closely.

🌾 Covert means a hidden sheltered spot

💧 Fens means wet marshy land

🛌 Behemoth rests among reeds by water

📖 This habitat fits a water loving giant

## 🌳 The Willows Of The Brook Compass Him About

"Compass him about" means to surround something on every side.

Willows are trees that grow specifically along riverbanks and streams.

Shade and water surround this creature from every direction.

The picture is complete comfort inside its natural home.

🔄 Compass about means surrounded on every side

🌳 Willows grow along rivers and streams

🌤️ Shade and water surround him fully

📖 This is complete comfort in his home

## 🌊 He Trusteth That He Can Draw Up Jordan

This verse pictures a creature so calm that a flooding river does not scare him.

The Jordan river was known for rising fast during flood season.

Most animals would panic or flee from that kind of rushing water.

Behemoth simply trusts he can handle whatever the river brings.

🌊 A flooding river does not scare him

📈 The Jordan was known for rising fast

😨 Most animals would flee this kind of water

📖 Behemoth trusts he can handle the river

## 🪤 His Nose Pierceth Through Snares

"Snares" were traps hunters used to catch and hold wild animals.

This creature's nose can push straight through any snare set for it.

The very next chapter asks the same question about an even mightier creature, leviathan.

Some strength simply cannot be caged by human hands.

🪤 Snares were traps used to catch animals

💪 His nose pushes straight through any snare

🔮 Job forty one asks this again about leviathan

📖 Some strength cannot be caged by human hands
`.trim();

export const JOB_FORTY_PERSONAL_SECTIONS = parseJobFortyRawNotes(JOB_FORTY_RAW_NOTES);
