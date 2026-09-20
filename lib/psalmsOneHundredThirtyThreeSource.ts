export type PsalmsOneHundredThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyThreeRawNotes(rawText: string): PsalmsOneHundredThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+133:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 133 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+133:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+133:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 133 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 133,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 133:${startVerse}` : `Psalms 133:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 1) {
    throw new Error("Expected 1 Psalms 133 section, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_THREE_RAW_NOTES = `# Psalms 133:1-3
# 🤝 Brothers Dwelling Together In Unity
---
## 📣 Behold, How Good And How Pleasant It Is

"Behold" tells the reader to stop and pay attention.

This is not a small aside tucked inside a longer sentence.

It opens the whole psalm, calling out something worth noticing.

"Good" and "pleasant" are paired on purpose here.

"Good" names what is right.

"Pleasant" names what feels good to experience.

Unity is not only the right choice.

It feels good too.

📣 Behold means stop and pay attention

✅ Good names what is right

😊 Pleasant names what feels good

📖 Unity is both right and enjoyable

## 🤝 For Brethren To Dwell Together In Unity

"Brethren" does not only mean blood brothers here.

This psalm belongs to a set called the Songs of Ascents.

Pilgrims sang these songs together on the road up to Jerusalem.

The word widens out to the whole worshiping family of Israel.

Families in this culture often shared land across generations.

Splitting apart over that shared land was a constant danger.

Staying together as one people was rare enough to celebrate.

🚶 Brethren widens beyond blood family

🎶 Sung on the road to Jerusalem

🏞️ Shared family land made unity fragile

📖 Staying united was rare enough to celebrate

## 🧴 The Precious Ointment Upon The Head

"Ointment" here means a specially made oil, not a modern skin cream.

This oil was mixed for one specific purpose, anointing a priest.

Exodus lists the exact spices used to make it.

Making that same recipe for ordinary use was forbidden under the law.

Pouring it on the head marked someone as set apart for God.

🧪 Ointment means a specially made oil

📜 Exodus lists its exact recipe

🚫 Making it for ordinary use was forbidden

📖 Pouring it set someone apart for God

## 👤 That Ran Down Upon The Beard, Even Aaron's Beard

This oil was poured out for one man alone, Aaron.

Aaron was Israel's first high priest.

He was also Moses's older brother.

Exodus and Leviticus describe this anointing at Aaron's ordination.

Naming "Aaron's beard" specifically ties this psalm to that real moment.

The oil running down showed how much was poured on him.

👑 Aaron was Israel's first high priest

👨‍👦 Aaron was Moses's older brother

📜 Exodus and Leviticus describe this anointing

📖 This ties the psalm to real history

## 🫗 That Went Down To The Skirts Of His Garments

"Skirts" here means the lower hem of Aaron's long robe.

It does not mean a woman's clothing.

The oil poured on his head ran all the way down to that hem.

That is an enormous amount of oil for one anointing.

The psalm borrows that real memory to make a picture.

Unity among God's people is pictured as that same overflowing abundance.

👘 Skirts means the hem of his robe

💧 Oil reached all the way down to it

🌊 That pictures overflowing abundance

📖 Unity is pictured the same way, overflowing

## 🏔️ As The Dew Of Hermon

Mount Hermon sits far to the north.

It was the tallest peak in that whole region.

Its snow capped heights produced unusually heavy dew each morning.

Travelers in this dry land would have known that reputation well.

Dew mattered because it kept crops alive during the long dry season.

Comparing something to Hermon's dew meant comparing it to rich abundance.

📏 Hermon was the region's tallest peak

❄️ Its snow produced heavy dew

🌾 Dew kept crops alive in dry seasons

📖 Hermon's dew pictured rich abundance

## 🗺️ That Descended Upon The Mountains Of Zion

This does not mean dew physically traveled from Hermon down to Zion.

Mount Hermon sits far north.

Zion sits far south in Jerusalem.

Hebrew poetry often places two images side by side to make one point.

The psalm borrows Hermon's famous abundance and lays it onto Zion instead.

Zion receives that same picture of overflowing blessing.

📍 Hermon and Zion sit far apart

🚫 The dew did not literally travel

🎭 Hebrew poetry pairs images to make one point

📖 Zion borrows Hermon's picture of abundance

## 📢 For There The LORD Commanded The Blessing, Even Life For Evermore

"Commanded" pictures God speaking a firm decree.

This is not a hope or a wish.

The blessing does not happen by accident where brothers live in unity.

God actively sends it there on purpose.

"Life for evermore" means blessing that does not run out.

The psalm ends where it began, naming unity as worth everything.

📜 Commanded means a firm decree

🎯 The blessing was sent on purpose

♾️ Life for evermore never runs out

📖 Unity is worth everything, start to finish
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_THREE_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyThreeRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_THREE_RAW_NOTES
);
