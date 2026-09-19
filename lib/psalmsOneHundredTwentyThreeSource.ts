export type PsalmsOneHundredTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyThreeRawNotes(rawText: string): PsalmsOneHundredTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+123:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 123 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+123:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+123:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 123 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 123,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 123:${startVerse}` : `Psalms 123:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 123 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_THREE_RAW_NOTES = `# Psalms 123:1-2
# 🙏 Eyes Lifted To The One In Heaven
---
## 🙏 Unto Thee Lift I Up Mine Eyes

To lift up mine eyes means turning full attention toward someone for help.

Psalms 121 opened the very same way, lifting eyes unto the hills.

This psalm skips the hills and looks straight to God enthroned above them.

The answer this time comes higher and clearer.

🙏 Lifting eyes means watching for help
⛰️ Psalms 121 lifted eyes to hills first
👑 This psalm looks straight to God
📖 Same phrase now points higher

## 👑 O Thou That Dwellest In The Heavens

Dwellest in the heavens means God rules from a place higher than any earthly throne.

Ancient people pictured the sky as God's royal court, far above kings and armies.

Naming God this way answers the psalm's real question before it is even asked.

No power on earth outranks the one who lives above it.

🌌 Dwellest means enthroned above the earth
⚔️ Higher than any king or army
👑 This naming answers the real question
📖 Nothing on earth outranks this God

## 🤲 As The Eyes Of Servants Look Unto The Hand Of Their Masters

A servant here means someone bound to work for one household, sometimes to pay off a debt.

Watching the hand meant reading small signals instead of waiting for spoken orders.

A raised finger or an open palm could give an instant command.

That kind of constant attention pictures how closely the psalmist wants to watch God.

🤲 Servants watched hands not just words
👋 A gesture could give a command
👀 Constant attention was always expected
📖 That attentiveness pictures watching God

## 👩 As The Eyes Of A Maiden Unto The Hand Of Her Mistress, So Our Eyes Wait Upon The LORD Our God

A maiden means a female servant working inside her mistress's household.

The verse pairs servant with master, then maiden with mistress.

Hebrew poetry often repeats one idea using matching pairs like this.

The psalm then shifts from one person's eyes to our eyes.

That shift moves from the individual to the whole worshipping community.

👩 Maiden means a female household servant
⚖️ Two pairs picture the same idea
📜 Hebrew poetry repeats ideas in pairs
➡️ Our eyes moves from one to many

# Psalms 123:3-4
# 😔 Filled With Contempt, Waiting For Mercy
---
## 🙌 Have Mercy Upon Us, O LORD, Have Mercy Upon Us

Mercy here means compassion shown to someone who cannot fix their own trouble.

Repeating the same plea twice in one line is a Hebrew way of showing urgency.

This is not a routine line recited out of habit.

Real desperation drives this prayer, not tradition alone.

🙏 Mercy means compassion for real trouble
🔁 Repeating the plea shows real urgency
❤️ Real desperation, not empty routine
📖 Genuine need drives this prayer

## 😣 For We Are Exceedingly Filled With Contempt

Contempt means being looked down on and treated as worthless.

Exceedingly filled pictures a cup poured past its brim.

The psalmist and his people have taken more scorn than they can bear.

Real suffering sits behind this simple prayer.

👎 Contempt means being treated as worthless
🥤 Filled pictures a cup overflowing
😣 More scorn than they can bear
📖 Real suffering sits behind this prayer

## 🛋️ The Scorning Of Those That Are At Ease

Those that are at ease means people living comfortably, untouched by real trouble.

Many scholars link the Songs of Ascents to the years just after the exile.

Israel returned home poor and rebuilding.

Comfortable neighbors mocked that struggle instead of helping.

🛋️ At ease means living comfortably
🏚️ Likely written after Israel's exile
😏 Comfortable neighbors mocked their struggle
📖 Comfort does not always bring kindness

## 😤 The Contempt Of The Proud

Proud here means people who look down on others because they think themselves better.

The psalm ends without an answer to its own prayer.

Only the plea remains, with no promised resolution.

Waiting on God, even without an answer yet, is still the whole point of this psalm.

😤 Proud means looking down on others
❓ The psalm ends without answering itself
🙏 Only the plea remains here
📖 Waiting on God is still the point
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_THREE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyThreeRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_THREE_RAW_NOTES
);
