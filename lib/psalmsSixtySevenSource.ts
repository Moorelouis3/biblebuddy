export type PsalmsSixtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtySevenRawNotes(rawText: string): PsalmsSixtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+67:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 67 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+67:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+67:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 67 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 67,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 67:${startVerse}` : `Psalms 67:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 67 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_SEVEN_RAW_NOTES = `# Psalms 67:1-2
# 🙏 A Blessing Meant To Travel
---
## 🙏 God Be Merciful Unto Us, And Bless Us

"Merciful" here means kindness freely given, not something earned.

This opening line echoes the ancient blessing priests spoke over Israel.

Numbers 6 records nearly the same words, spoken by Aaron and his sons.

The whole psalm builds outward from this one small personal request.

What starts as a prayer for Israel ends up reaching the whole earth.

🙏 Merciful means kindness freely given
📜 Numbers 6 records nearly the same words
🌱 One small prayer starts the whole psalm
📖 It ends up reaching the whole earth

## 😊 Cause His Face To Shine Upon Us

A shining face pictures someone looking at you with warmth and delight.

Think of how a parent's face lights up seeing a child they love.

A hidden or turned away face pictured the opposite, anger or rejection.

This phrase asks for God's full attention and warm approval.

It is not a request for physical light, but personal closeness.

😊 A shining face means warm delight
👶 Like a parent's face lighting up
😠 A hidden face pictured anger instead
📖 This asks for closeness, not sunlight

## ⏸️ Selah

"Selah" is a word whose exact meaning is no longer fully known.

Most scholars believe it marked a pause in the music or singing.

It likely told the singers or musicians to stop and reflect.

This word appears again later in this same short psalm.

Its placement invites the listener to sit with what was just prayed.

⏸️ Selah likely marked a pause
🎼 It may have guided musicians
🤔 Its exact meaning is not fully known
📖 It invites reflection on what was prayed

## 🛤️ That Thy Way May Be Known Upon Earth

"Thy way" here does not mean a physical road or direction.

It means God's own character and how he treats his people.

The psalmist wants that reputation to spread past Israel's own borders.

Blessing Israel was never meant to stop with Israel alone.

The rest of the world was always part of the plan.

🛤️ Thy way means God's character, not a road
🌍 It should spread past Israel's borders
🎯 Blessing Israel was never the whole plan
📖 The whole world was always included

## 💊 Thy Saving Health Among All Nations

"Saving health" is an older way of saying salvation or rescue.

It does not refer to physical healing or medical health.

"Among all nations" makes the target clear, every people on earth.

This request looks far beyond Israel's own physical safety.

The psalmist is asking God's rescue to become known worldwide.

💊 Saving health means salvation, not medicine
🌐 Among all nations means every people
🔭 This looks past Israel's own safety
📖 God's rescue was meant to go worldwide

# Psalms 67:3-4
# 🎉 Let The Nations Sing For Joy
---
## 🔁 Let The People Praise Thee, O God

This exact line appears twice in a row within one verse.

Repeating a line back to back was a common way to add emphasis.

"The people" most likely refers to Israel, God's own covenant nation.

This same refrain returns again, word for word, in verse five.

🔁 The same line repeats twice in one verse
📣 Repetition added emphasis in Hebrew poetry
👥 The people likely means Israel here
📖 This refrain returns again in verse five

## 🌍 O Let The Nations Be Glad And Sing For Joy

The psalm now widens its request beyond Israel to every nation.

"Be glad" and "sing for joy" describe real celebration, not polite approval.

This is not a request that other nations merely tolerate Israel's God.

It asks that they actually rejoice in him for themselves.

🌍 The request now widens to every nation
🎉 Be glad pictures real celebration
🙅 Not polite tolerance of Israel's God
📖 Other nations are asked to rejoice too

## ⚖️ Thou Shalt Judge The People Righteously

"Judge" here does not mean condemn or punish people.

In this context, it means rule with fairness and correct what is wrong.

Ancient judges were expected to protect the weak from abuse.

This verse pictures God ruling every nation that same honest way.

⚖️ Judge here means ruling with justice
🛡️ Ancient judges protected the weak
👑 God is pictured ruling this same way
📖 Fair judgment is good news for the oppressed

## 🧭 And Govern The Nations Upon Earth

"Govern" pictures active, ongoing leadership, not a single decision.

It describes the same kind of steady guidance a shepherd gives a flock.

This request pairs the fairness from the line before with real authority.

The psalm asks for both justice and the strength to carry it out.

🧭 Govern pictures ongoing guidance
🐑 Like a shepherd leading a flock
💪 This pairs fairness with real authority
📖 Justice needs power to carry it out

# Psalms 67:5
# 🔁 The Refrain Returns
---
## 🔁 Let All The People Praise Thee

This entire line already appeared, word for word, back in verse three.

Ancient poets often used a return like this on purpose.

It marks this psalm's own structure, folding back toward where it began.

Verse four sits at the center, framed by these two refrains.

🔁 This line repeats verse three exactly
🪢 Ancient poets used repeats to mark structure
🎯 It frames verse four as the center
📖 The whole psalm folds around one prayer

# Psalms 67:6-7
# 🌾 The Earth Responds With Increase
---
## 🌾 Then Shall The Earth Yield Her Increase

"Increase" here means the harvest a field or vineyard produces.

A good harvest was seen as real proof of God's favor.

The psalm ties the nations praising God to the land's own fruit.

Worship and abundance are pictured moving together here, not apart.

🌾 Increase means the harvest a field produces
✅ Harvest was seen as proof of favor
🔗 Worship and the land's fruit are tied together
📖 Blessing and worship move together here

## 🙌 God, Even Our Own God, Shall Bless Us

Naming God twice in one line was a way to add real weight.

"Our own God" points to Israel's specific covenant relationship with him.

This is not a distant, generic higher power being described here.

The psalm insists on a God who is personally, specifically theirs.

🔁 Naming God twice added real weight
🤝 Our own God points to the covenant
🙅 Not a distant, generic power
📖 This God is personally theirs

## ✅ God Shall Bless Us

This short line echoes the very first words of the psalm.

Verse one opened by asking for exactly this same blessing.

What was asked for at the start is now stated as settled.

The psalm moves from request to confidence by its final lines.

🔁 This echoes the psalm's opening line
🙏 Verse one asked for this same blessing
✅ The request now sounds settled, certain
📖 The psalm ends more confident than it began

## 😌 All The Ends Of The Earth Shall Fear Him

"Fear" here does not mean being afraid of punishment.

It means deep reverence, the kind that leads someone to bow low.

"The ends of the earth" describes the farthest, most distant nations possible.

The prayer opened by asking mercy for Israel alone.

It closes by turning to the whole world instead.

😌 Fear here means reverence, not terror
🌍 Ends of the earth means every distant nation
🔄 The psalm moves from Israel to the world
📖 One nation's blessing becomes hope for everyone
`.trim();

export const PSALMS_SIXTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsSixtySevenRawNotes(PSALMS_SIXTY_SEVEN_RAW_NOTES);
