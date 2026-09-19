export type PsalmsOneHundredTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyRawNotes(rawText: string): PsalmsOneHundredTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+120:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 120 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+120:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+120:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 120 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 120,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 120:${startVerse}` : `Psalms 120:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 120 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_RAW_NOTES = `# Psalms 120:1-2
# 🆘 In My Distress I Cried Unto The LORD
---
## 🆘 In My Distress I Cried Unto The LORD

Distress here means a real crisis, not a passing bad mood.

This psalm opens a set of fifteen songs called the Songs Of Ascents.

Pilgrims sang them on the road up to Jerusalem for the yearly feasts.

The psalmist is not just describing a feeling.

He is reporting exactly what happened when he cried out.

The LORD heard him, and he says so plainly.

🧭 Opens the Songs Of Ascents

🚶 Pilgrims sang these walking to Jerusalem

🆘 Distress means a real crisis

📖 The LORD heard him and answered

## 🗣️ Deliver My Soul From Lying Lips

Lying lips means speech built to deceive on purpose.

A deceitful tongue adds a second image for the same problem.

Hebrew poetry often says one idea twice in different words.

This pattern is called parallelism, and it is not empty repetition.

Each half sharpens the picture a little further.

The psalmist is asking God to rescue him from slander, not from a weapon.

🗣️ Lying lips means deliberate deceptive speech

🔁 Deceitful tongue repeats the same idea

📜 Hebrew poetry restates ideas for emphasis

📖 He asks rescue from slander not weapons
# Psalms 120:3-4
# ⚖️ What Shall Be Given Unto Thee
---
## ⚖️ What Shall Be Given Unto Thee

Thee here refers to the false tongue from the verse before, not to God.

What shall be given unto thee is an old courtroom style question.

It asks what punishment actually fits this particular crime.

The psalmist is not confused about who he means.

He is putting the liar on trial in the middle of a song.

Even inside a song, he wants the liar named and judged.

⚖️ The question addresses the false tongue

❓ It asks what punishment fits

🏛️ Courts used this kind of formula

📖 He wants the liar named and judged

## 🏹 Sharp Arrows Of The Mighty

Sharp arrows of the mighty is the answer to the question just asked.

Mighty means a trained, skilled warrior, not just a strong man.

Arrows shot by that kind of warrior travel further and strike harder.

Many scholars believe the arrows picture the punishment coming for the liar.

Others believe they picture how much damage the lies themselves already cause.

Either reading points at the same danger, a weapon that wounds from a distance.

🏹 Arrows answer the question from before

💪 Mighty means a trained skilled warrior

🗣️ Lies wound like arrows from far away

📖 A weapon that strikes without warning

## 🔥 Coals Of Juniper

Juniper here names a specific desert shrub burned for fuel.

Many scholars believe it refers to the broom tree, called retem in Hebrew.

Broom wood burns unusually hot and keeps its coals glowing long after the flame dies.

Desert travelers prized it for cooking fires that lasted through the night.

Pairing arrows with juniper coals pictures a punishment that wounds fast and then keeps burning.

The false tongue is warned it will not get off with a quick sting.

🌵 Juniper likely means the desert broom tree

🔥 Its coals burn long after the flame

🏕️ Travelers used it for lasting fires

📖 The punishment wounds fast then keeps burning
# Psalms 120:5
# 😖 Woe Is Me That I Sojourn In Mesech
---
## 😖 Woe Is Me

Woe is me is a cry of real grief, not a small complaint.

To sojourn means to live somewhere as an outsider, not as a citizen.

The psalmist describes feeling stuck among people who do not share his values.

That kind of isolation wears a person down slowly, day after day.

Even his loneliness becomes something he brings honestly to God.

😖 Woe is me signals real grief

🏕️ Sojourn means living there as an outsider

💭 He feels surrounded by opposite values

📖 His loneliness becomes part of his prayer

## 🗺️ That I Sojourn In Mesech

Mesech refers to a people descended from Japheth, one of Noah's sons.

Ancient records place them far to the north, near the Black Sea region.

A reader in Israel would picture rough distant tribes, not friendly neighbors.

The name works here more as a symbol than a literal address.

It stands for everything foreign and hostile to a worshipper of the LORD.

🗺️ Mesech descended from Japheth's line

🧭 Ancient sources place them far north

🚩 The name symbolizes distant hostility

📖 It stands for whatever opposes the LORD's people

## 🏜️ That I Dwell In The Tents Of Kedar

Kedar refers to a nomadic Arab tribe descended from Ishmael.

Their territory sat in the desert, far to the south and east of Israel.

Mesech and Kedar sit at opposite ends of the map from each other.

No one could literally sojourn in both places at the same time.

This does not mean the psalmist moved between two real addresses.

The pairing is a figure of speech for feeling surrounded by hostility everywhere.

🏜️ Kedar was a nomadic Arab tribe

🧭 Their land sat far to the southeast

🔄 Mesech and Kedar are opposite directions

📖 Together they mean hostility on every side
# Psalms 120:6-7
# ☮️ My Soul Hath Long Dwelt With Him That Hateth Peace
---
## ☮️ My Soul Hath Long Dwelt With Him That Hateth Peace

Long here does not mean a single bad week.

The psalmist has lived surrounded by hostility for a real stretch of time.

Him that hateth peace describes people who prefer conflict over resolution.

Living around that kind of person wears a person down slowly.

The verse names that weariness honestly instead of rushing past it.

⏳ Long means a real stretch of time

💔 He lives among people who love conflict

😔 That kind of company wears him down

📖 The psalm names the weariness honestly

## 🕊️ I Am For Peace

I am for peace is a plain statement of where the psalmist stands.

He is not neutral or unsure about what he wants.

Peace here carries the weight of the Hebrew word shalom.

Shalom means wholeness and right relationship, not just an absence of fighting.

He wants that deeper kind of peace, not merely a truce.

🕊️ He plainly states he wants peace

🤝 Peace translates the Hebrew word shalom

🧩 Shalom means wholeness not just no fighting

📖 He wants real peace not a truce

## ⚔️ But When I Speak They Are For War

This line closes the psalm without a happy resolution.

Every time he speaks up for peace, the answer comes back as war.

The psalm does not pretend the conflict got solved.

It ends honestly, still surrounded by people who want to fight.

That honesty makes room for prayers that do not wrap up neatly.

Not every psalm in the Bible ends in triumph, and this one does not pretend otherwise.

🗣️ Every peace offer gets answered with war

🚫 The psalm does not end in victory

🙏 It stays honest about unresolved conflict

📖 Not every prayer ties up neatly
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_RAW_NOTES
);
