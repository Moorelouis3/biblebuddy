export type PsalmsOneHundredThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyOneRawNotes(rawText: string): PsalmsOneHundredThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+131:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 131 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+131:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+131:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 131 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 131,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 131:${startVerse}` : `Psalms 131:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 1) {
    throw new Error("Expected 1 Psalms 131 section, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_ONE_RAW_NOTES = `# Psalms 131:1-3
# 🧘 A Weaned Child's Quiet Trust
---
## 💔 My Heart Is Not Haughty

"Haughty" means proud in a way that looks down on other people.

This psalm's heading says it was written by David.

David starts by examining his own heart, not anyone else's.

He is checking his own pride before he checks anyone else's sin.

💔 Haughty means proud and looking down

📜 The heading credits this psalm to David

🪞 He examines his own heart first

📖 Pride gets checked before anything else

## 👀 Nor Mine Eyes Lofty

"Lofty eyes" describes a proud, superior look on someone's face.

In this culture, the eyes were treated as a window into someone's true attitude.

Proverbs uses this same picture to describe the pride God resists.

David rules out an arrogant heart and an arrogant face in the same breath.

👀 Lofty eyes means a proud look

🪟 Eyes revealed a person's true attitude

📜 Proverbs uses this same picture

📖 Pride is ruled out inside and out

## 🙅 Things Too High For Me

This does not mean David avoided responsibility as king.

"Great matters" points to matters far above his own calling and place.

David ran a kingdom, so this is not a man dodging hard work.

He refused to grasp after glory or status God never gave him.

Contentment here means staying inside the calling God actually gave.

👑 David still ruled as king daily

🚫 This is not laziness or dodging work

🙅 He refused reaching for extra status

📖 Contentment stays inside God's calling

## 🍼 As A Child That Is Weaned Of His Mother

"Weaned" means a child no longer nurses at its mother.

In this culture, that happened around age three, far later than modern readers expect.

A weaned child no longer cries out for milk in a panic.

David compares his soul to that settled stage, not a crying infant.

He no longer demands answers from God like a hungry child.

🍼 Weaned means no longer nursing

😌 A weaned child no longer panics

🤱 The child rests without demanding milk

📖 David's soul rests the same way

## 🔁 My Soul Is Even As A Weaned Child

This line repeats the same picture instead of moving to something new.

Hebrew poetry often repeats a line to press the point home.

The repeat shows this contentment is not a fluke or a passing mood.

It is now a settled condition, not a passing feeling.

🔁 The picture repeats on purpose

📣 Hebrew poetry repeats for emphasis

⚓ Contentment here is settled, not a mood

📖 This is now David's steady condition

## 🇮🇱 Let Israel Hope In The LORD From Henceforth And For Ever

The psalm suddenly shifts from David's own voice to the whole nation.

David's own trust becomes a command for everyone to imitate.

"Henceforth" means starting now, without a future expiration.

This hope is not for one season or one crisis alone.

Israel is called to rest in God the way David rested his own soul.

🇮🇱 The whole nation is now addressed

⏰ Henceforth means starting right now

♾️ This hope has no expiration date

📖 Israel is called to that same rest
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_ONE_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyOneRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_ONE_RAW_NOTES
);
