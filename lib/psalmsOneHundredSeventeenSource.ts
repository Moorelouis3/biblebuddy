export type PsalmsOneHundredSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredSeventeenRawNotes(rawText: string): PsalmsOneHundredSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+117:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 117 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+117:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+117:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 117 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 117,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 117:${startVerse}` : `Psalms 117:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 1) {
    throw new Error("Expected 1 Psalms 117 section, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_SEVENTEEN_RAW_NOTES = `# Psalms 117:1-2
# 🌍 All Nations Praise The LORD
---
## 🌍 O Praise The LORD, All Ye Nations

Nations here means the Gentile peoples living outside Israel.

Most psalms call only Israel to praise the LORD.

This one throws the invitation open to every nation on earth.

Paul later quotes this exact verse in Romans chapter fifteen.

He uses it as proof that God always planned to include the Gentiles.

🌍 Nations means Gentile peoples outside Israel
📜 Most psalms addressed Israel alone
✉️ Paul quotes this verse in Romans
📖 Proof God always planned Gentile inclusion

## 📢 Praise Him, All Ye People

Hebrew poetry often says the same idea twice in different words.

This repetition is called parallelism.

Parallelism adds emphasis, not new information.

Nations and people are not two separate groups here.

They are the same call to worship stated twice for weight.

Repeating it this way makes the invitation impossible to miss.

📢 Parallelism repeats an idea for emphasis
🔁 Nations and people are not separate groups
🎯 Same call to worship, twice
📖 Repetition makes the invitation impossible to miss

## 🤝 His Merciful Kindness Is Great Toward Us

Merciful kindness translates one Hebrew word, chesed.

Chesed means loyal, steadfast love that keeps a promise.

It is not a passing feeling but a covenant commitment.

God's kindness toward Israel was never going to run out.

This is the reason the psalm can call all nations to praise.

🤝 Merciful kindness translates the word chesed
🔒 Chesed means loyal covenant love
⏳ Not a feeling but a lasting commitment
📖 That kindness is why all nations are called

## 🛡️ The Truth Of The LORD Endureth For Ever

Truth here does not mean simple factual accuracy.

It means faithfulness, God keeping every promise He has made.

Endureth for ever means this faithfulness never runs out or changes.

The nations are not being asked to praise a God who might fail them.

They are praising a God whose faithfulness has already proven reliable.

🛡️ Truth means faithfulness, not just facts
🤞 God keeps every promise He makes
⏳ Endureth forever means it never runs out
📖 The nations praise a proven, faithful God

## 🎉 Praise Ye The LORD

This phrase is the Hebrew word hallelujah, translated into English here.

Psalm 117 is the shortest chapter in the whole Bible.

It still ends the exact same way the psalms around it do.

Many Jewish traditions group Psalms 113 through 118 together as the Hallel.

A short psalm can still carry the same weight as a long one.

🎉 Hallelujah is Hebrew for praise the LORD
📜 Psalm 117 is the Bible's shortest chapter
🕎 Part of the Hallel, Psalms 113 to 118
📖 A short psalm still carries real weight
`.trim();

export const PSALMS_ONE_HUNDRED_SEVENTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredSeventeenRawNotes(
  PSALMS_ONE_HUNDRED_SEVENTEEN_RAW_NOTES
);
