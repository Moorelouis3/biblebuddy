export type PsalmsOneHundredThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyFourRawNotes(rawText: string): PsalmsOneHundredThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+134:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 134 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+134:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+134:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 134 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 134,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 134:${startVerse}` : `Psalms 134:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 1) {
    throw new Error("Expected 1 Psalms 134 section, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_FOUR_RAW_NOTES = `# Psalms 134:1-3
# 🌙 The Last Song Of Ascents
---
## 📣 Behold, Bless Ye The LORD

"Behold" calls the reader to stop and pay attention.

This is the last of fifteen Songs of Ascents.

Pilgrims sang these songs together walking up to Jerusalem.

"Bless the LORD" does not mean giving God something He lacks.

It means praising Him and speaking well of Him.

This whole psalm is written as a spoken blessing.

📣 Behold means stop and pay attention

🎶 This closes the Songs of Ascents

🙏 Bless the LORD means praise Him

📖 The psalm is a spoken blessing

## ⚙️ All Ye Servants Of The LORD

The phrase "servants of the LORD" points to a specific group.

It is not a general title for every believer here.

Other Psalms describe Levites keeping watch through the night at the temple.

First Chronicles lists a full nighttime rotation of gatekeepers and singers.

These servants worked in shifts around the clock.

The temple was never left unattended.

⚙️ Servants points to the temple night staff

🌙 Levites kept watch through the night

📜 First Chronicles lists their rotations

📖 Their unseen work still mattered to God

## 🧍 Which By Night Stand In The House Of The LORD

"Stand" here means actively serving, not standing idle.

The same word can describe a servant ready before a king.

"By night" points to hours most people spent asleep.

Someone still had to keep the temple running after dark.

This verse blesses exactly the people doing that unseen work.

🧍 Stand means serving, not standing idle

👑 Like a servant ready before a king

🌃 By night means hours most people slept

📖 This blesses work most people never saw

## 🙌 Lift Up Your Hands In The Sanctuary

Lifting up hands was not a casual gesture in worship.

It was the normal posture for prayer and blessing.

Open palms pictured receiving from God and offering praise back.

"The sanctuary" names the temple's holy space, not the whole building.

Only those serving there could stand in that space and pray.

This verse pictures the night watch lifting their hands toward God.

🙌 Lifting hands was the normal prayer posture

📿 Open palms pictured praise and receiving

🏛️ Sanctuary names the temple's holy space

📖 The night watch prayed there directly

## 🔁 And Bless The LORD

This is the second time in two verses this psalm says "bless."

Short repeated words like this often build a refrain for singing.

Temple crowds likely sang psalms like this one back and forth.

One group may have called out a line.

Another group would have answered it back.

Repetition here is not filler.

It shows this refrain was meant to be sung aloud.

🔁 Bless is repeated on purpose

🎤 Repetition built a refrain for singing

🗣️ Groups may have sung it back and forth

📖 This refrain was meant to be sung aloud

## 🌌 The LORD That Made Heaven And Earth

This exact phrase already appeared in Psalm 121 and Psalm 124.

The Songs of Ascents return to this title again and again.

Naming God as maker of heaven and earth was not decoration.

It reminded pilgrims that their helper was strong enough for anything.

Ending on that title ties this final song back to the ones before it.

🌌 A repeated title for God

🔗 It ties back to Psalm 121 and 124

💪 It reminded pilgrims God was strong enough

📖 This song closes with that same confidence

## 🔄 Bless Thee Out Of Zion

Every earlier blessing in this psalm used the plural word "ye."

"Thee" here switches suddenly to a single person.

This looks like the night watch answering back with a blessing of their own.

The pilgrims who just praised God now receive a blessing in return.

"Out of Zion" names Jerusalem as the source of that blessing.

The psalm ends the way this whole pilgrim journey began.

Blessing was exchanged before the pilgrims went home.

🔄 Thee switches from plural to singular

🙏 The night watch blesses the pilgrims back

🏔️ Zion names Jerusalem as the source

📖 Blessing is exchanged before pilgrims go home
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_FOUR_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyFourRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_FOUR_RAW_NOTES
);
