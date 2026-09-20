export type PsalmsOneHundredTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyFiveRawNotes(rawText: string): PsalmsOneHundredTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+125:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 125 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+125:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+125:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 125 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 125,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 125:${startVerse}` : `Psalms 125:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 125 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_FIVE_RAW_NOTES = `# Psalms 125:1-2
# 🏔️ As Mount Zion
---
## 🏔️ They That Trust In The LORD Shall Be As Mount Zion

"Mount Zion" means the hill in Jerusalem where the temple stood.

Zion was known for being solid rock, not loose ground that could slide.

Comparing trust in the LORD to mount Zion pictures a security nothing can shake loose.

The mountain never wandered from its place under the city.

A person who trusts the LORD gets that same kind of settled ground.

🏔️ Mount Zion means Jerusalem's temple hill
🪨 Zion was solid, unmovable rock
⚓ Trust in the LORD gives that same security
📖 Nothing can shake a person anchored in God

## 🗻 So The LORD Is Round About His People

Jerusalem sat inside a natural ring of mountains on every side.

An enemy could not simply walk straight up to the city from any direction.

That geography becomes a picture here for how the LORD surrounds His people.

He is not watching from a distance.

He is stationed on every side, the same way those mountains stood.

"From henceforth even for ever" means this protection never runs out.

🗻 Jerusalem sat ringed by mountains
🛡️ That ring pictures the LORD's protection
⏳ Henceforth even for ever means no end
📖 His protection surrounds His people always

# Psalms 125:3-5
# ⚖️ The Rod Of The Wicked
---
## 👑 The Rod Of The Wicked Shall Not Rest Upon The Lot Of The Righteous

"Rod" here pictures a ruler's staff, a symbol of power to control or punish.

"Lot" means the portion of land each family inherited in Israel.

This verse promises that wicked rule will not stay resting on that inheritance forever.

Oppression might come for a season.

It will not become the permanent condition of the righteous.

👑 Rod pictures a ruler's power to punish
🗺️ Lot means each family's inherited land
⏳ Wicked rule will not stay permanent
📖 The righteous keep their promised inheritance

## ✋ Lest The Righteous Put Forth Their Hands Unto Iniquity

This line explains why God limits how long the wicked get to rule.

Long suffering under an unfair ruler can tempt even good people to sin.

"Put forth their hands unto iniquity" means giving in and joining the wrong side.

God's limit protects the righteous from that exact temptation.

It guards them from becoming what they are enduring.

😤 Long oppression can tempt anyone to sin
✋ Put forth their hands means giving in
🛡️ God limits how long the pressure lasts
📖 He protects them from copying evil

## 🙏 Do Good, O LORD, Unto Those That Be Good

This is a short, direct prayer asking for fairness.

The psalmist asks God to bless those who are genuinely good.

It is not a demand.

It is a request that matches how God already promised to act.

🙏 A short direct prayer for fairness
✅ Asks blessing for the genuinely good
🤝 Matches how God already promised to act
📖 Simple trust, not a demand

## 🛤️ Such As Turn Aside Unto Their Crooked Ways

"Crooked ways" is an old way of describing a dishonest, twisted path in life.

It pictures someone leaving the straight road and choosing wrongdoing on purpose.

The LORD groups these people with the workers of iniquity named right after.

Turning aside here was a choice, not an accident.

🛤️ Crooked ways means a dishonest path
🚶 Turning aside was a deliberate choice
👥 Grouped with the workers of iniquity
📖 The path chosen decides the outcome

## 🕊️ But Peace Shall Be Upon Israel

The psalm opened by picturing Israel secure like mount Zion.

It closes the same way, with peace resting on the whole nation.

The wicked get led away with those who do wrong.

Israel gets peace instead.

That contrast is the whole point of this psalm.

🕊️ The psalm closes on peace
⚖️ The wicked are led away with evildoers
🏔️ Echoes the mount Zion security from verse one
📖 Peace is the outcome for God's people
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_FIVE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyFiveRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_FIVE_RAW_NOTES
);
