export type PsalmsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneRawNotes(rawText: string): PsalmsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 1:${startVerse}` : `Psalms 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 1 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_RAW_NOTES = `# Psalms 1:1-3
# 🌳 The Blessed Man
---
## 😊 Blessed Is The Man

Blessed here means far more than simply feeling happy in the moment.

It describes a person who is deeply favored and rightly aligned with God.

This opening line sets the tone for the entire book of Psalms.

Every psalm that follows measures a life against this one description.

😊 Blessed means favored, not simply happy
📚 It opens the entire book of Psalms
⚖️ Every later psalm echoes this measure
📖 The psalm now defines that life

## 🚶 Walketh Not In The Counsel Of The Ungodly

Three verbs in this verse trace a slow slide into wrong living.

Walking pictures someone who is only passing through a place briefly.

Counsel means advice or a plan for how someone should live.

Following bad advice, even briefly, is where this warning begins.

🚶 Walketh pictures someone passing through briefly
🗣️ Counsel means advice or a life plan
⚠️ Even brief influence counts here
📖 This warning starts small and builds

## 🧍 Standeth In The Way Of Sinners

Standing describes someone who has stopped to linger in this path.

This step goes further than simply passing through.

The way of sinners means a manner of life built around wrongdoing.

Lingering in a lifestyle takes more than a passing glance.

🧍 Standeth means stopping to linger
🛤️ Way of sinners means a sinful lifestyle
⬆️ This step goes deeper than the first
📖 Comfort with wrong grows the longer someone stays

## 🪑 Sitteth In The Seat Of The Scornful

Sitting pictures someone who has settled in and made a home here.

A seat suggests a lasting and permanent place.

The scornful are people who openly mock what is right and true.

Walking, standing, and sitting trace sin moving from a glance into an identity.

🪑 Sitteth means settling in permanently
😏 The scornful openly mock what is right
📈 Walk, stand, and sit trace a downward path
📖 Sin can grow into a full identity

## ❤️ His Delight Is In The Law Of The LORD

Delight means real joy, not forced obedience through gritted teeth.

The blessed man is not only avoiding wrong.

He is drawn toward something entirely good.

The law of the LORD means God's own instructions for living well.

This verse turns from what he avoids toward what he now loves.

❤️ Delight means real joy, not forced duty
📜 The law means God's instructions for living
🔄 The verse shifts from avoiding to loving
📖 Real change starts with what someone loves

## 🗣️ In His Law Doth He Meditate Day And Night

Meditate does not mean sitting quietly with an empty mind.

The original word pictures someone softly repeating words, almost like a low mutter.

Day and night shows that this is a constant habit.

This steady habit is exactly what shapes the tree pictured next.

🗣️ Meditate meant quietly repeating words
🔁 Day and night shows a constant habit
🌳 This habit shapes what comes next
📖 What someone returns to shapes them

## 🌳 Like A Tree Planted By The Rivers Of Water

Planted means placed there on purpose, not grown wild by chance.

Someone chose this spot because it had a steady water supply.

Rivers of water pictures a constant source of life, not occasional rain.

The blessed man's steady habits are compared to this planted, watered tree.

🌳 Planted means placed there on purpose
💧 Rivers of water means a constant supply
🎲 This is not wild, chance growth
📖 Steady habits work like steady water

## 🍎 Bringeth Forth His Fruit In His Season

This tree does not force fruit early or produce it out of order.

In his season means the fruit comes at the right and expected time.

A well watered tree naturally produces fruit when the time is ready.

A life rooted in God's law grows fruit that same steady way.

🍎 Fruit comes in season, not forced early
⏳ Right timing matters as much as growth
🌊 A watered tree fruits naturally
📖 A rooted life bears fruit in time

## 🍂 His Leaf Also Shall Not Wither

A withered leaf is a sign that a plant is running dry.

This tree stays healthy even through a season of drought.

The image promises endurance, not just one good harvest.

Deep roots keep a person healthy even during hard seasons.

🍂 A withered leaf signals a dry plant
💪 This tree endures even a dry season
🌦️ The promise is about endurance, not luck
📖 Deep roots carry someone through hard times

## 🌱 Whatsoever He Doeth Shall Prosper

This is not a promise that every plan will succeed exactly as pictured.

The word behind prosper points to something moving steadily forward.

It describes a fruitful life lived under God's own care.

This does not mean hardship never touches the blessed man's life.

🌱 Prosper means moving steadily forward
🚫 Not a promise every plan succeeds
🌳 It describes a fruitful life under God's care
📖 The point is fruit, not ease

# Psalms 1:4-6
# 💨 The Fate Of The Ungodly
---
## ↩️ The Ungodly Are Not So

That short phrase draws a direct line back to everything just described.

Not so means the ungodly share none of that same stability.

There is no gradual middle ground offered between these two paths.

The psalm now turns from a rooted tree to something far less solid.

↩️ Not so points back to the blessed man
🌳 The ungodly share none of that stability
🚫 No middle path exists here
📖 The contrast is total, not partial

## 🌾 Like The Chaff Which The Wind Driveth Away

Chaff is the light, useless husk left over after grain is threshed.

Farmers tossed grain into the air so wind could carry the chaff off.

Unlike the deeply rooted tree, chaff has no roots and no real weight.

One picture stays planted and enduring, the other is gone in a moment.

🌾 Chaff is the useless husk after threshing
💨 Wind easily carries it away
🌳 The tree has roots, chaff has none
📖 One image endures, the other disappears

## ⚖️ Shall Not Stand In The Judgment

Stand here pictures being able to remain steady under review.

The judgment refers to a moment of being weighed and held accountable.

Chaff cannot hold its ground once it is tested by the wind.

The ungodly face that same inability to hold up under God's judgment.

⚖️ Stand means holding steady under review
💨 Chaff cannot hold up when tested
🌬️ The judgment tests what a life holds
📖 What has no root cannot stand

## 👥 Nor Sinners In The Congregation Of The Righteous

The congregation of the righteous means the assembled community of God's people.

This is not only about a final judgment far in the future.

It also describes being shut out from real belonging right now.

The blessed man's path leads toward community, the other path leads away.

👥 Congregation means the assembled righteous
⏳ This is not only about the future
🚪 It also describes belonging in the present
📖 One path leads to community, the other away

## 👀 The LORD Knoweth The Way Of The Righteous

Knoweth here means far more than simply being aware of someone.

It describes God's close, watchful care over the righteous person's path.

The same word describes close relationships elsewhere in scripture.

This is a promise of relationship, not just observation from a distance.

👀 Knoweth means intimate care, not distant awareness
🤝 The same word describes close relationships
🛤️ God watches closely over the righteous path
📖 This is relationship, not mere observation

## ⚰️ The Way Of The Ungodly Shall Perish

Perish means to come to a complete and final end.

This is the last word of the psalm, and it carries full weight.

The tree from the opening verses keeps bearing fruit long after planting.

The chaff and the path it pictures simply vanish in the end.

⚰️ Perish means a complete final end
🌳 The tree keeps bearing fruit over time
💨 The other path simply vanishes
📖 The psalm ends with a final warning
`.trim();

export const PSALMS_ONE_PERSONAL_SECTIONS = parsePsalmsOneRawNotes(PSALMS_ONE_RAW_NOTES);
