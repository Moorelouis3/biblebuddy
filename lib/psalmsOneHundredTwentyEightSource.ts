export type PsalmsOneHundredTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyEightRawNotes(rawText: string): PsalmsOneHundredTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+128:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 128 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+128:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+128:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 128 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 128,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 128:${startVerse}` : `Psalms 128:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 128 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_EIGHT_RAW_NOTES = `# Psalms 128:1-4
# 🍇 A Fruitful Home
---
## 😲 Blessed Is Every One That Feareth The LORD

"Feareth" does not mean being scared of God.

It means holding God in deep respect and awe.

This kind of fear leads to obedience, not to hiding.

The psalm opens by naming the source of every blessing that follows.

😲 Feareth means awe, not terror

🙇 Respect for God shapes daily choices

🌟 Blessing starts with this kind of fear

📖 The psalm builds every promise on this line

## 🚶 That Walketh In His Ways

"Walketh" pictures an ongoing journey, not a single choice.

"His ways" means the commands and character of God.

Fearing God is the attitude behind this walk.

Walking it out is fear turned into action.

Real reverence always shows up in how a person lives.

🚶 Walketh pictures an ongoing journey

🧭 His ways means God's commands and character

❤️ Fear is the attitude behind the walk

📖 Real reverence shows in daily living

## 🌾 Thou Shalt Eat The Labour Of Thine Hands

This promise means enjoying the results of your own hard work.

In the ancient world, invaders often stole a farmer's harvest before he could eat it.

Deuteronomy names that same loss as a curse, planting and never tasting the fruit.

This blessing reverses that curse completely.

The man who fears God gets to keep what he earns.

🌾 Labour of thine hands means your own harvest

🚫 Invaders often stole a farmer's harvest first

📜 Deuteronomy names that same loss as a curse

📖 This blessing reverses that curse completely

## 😊 Happy Shalt Thou Be, And It Shall Be Well With Thee

This verse promises two different things, not one.

"Happy" points to a feeling of inner contentment.

"Well with thee" points to outward circumstances going right.

Together they promise a full kind of blessing, inside and out.

Fearing God touches both the heart and daily life.

😊 Happy points to inner contentment

🌤️ Well with thee points to outward circumstances

💛 Together they promise a full blessing

📖 Fearing God touches heart and daily life

## 🍇 Thy Wife Shall Be As A Fruitful Vine By The Sides Of Thine House

A "vine" here is a picture, not a literal plant.

Grape vines were often trained to grow along the inside walls of a house.

A vine planted there was safe and produced fruit year after year.

Comparing a wife to this vine pictures stability and life inside the home.

"Fruitful" points forward to the children named in the next line.

🍇 A vine pictures stability and life

🏠 Vines were trained along inside walls

🌱 Fruitful points forward to children

📖 The wife brings life into the home

## 🫒 Thy Children Like Olive Plants Round About Thy Table

An olive tree takes years to grow before it produces fruit.

Once it matures, it keeps producing fruit for generations.

Young olive shoots often grow up in a circle around an older tree.

That image pictures children surrounding the family table as they grow.

The comparison points to patience now and a lasting family later.

🫒 Olive trees take years to bear fruit

🌿 Young shoots grow up around an older tree

🍽️ Children pictured surrounding the family table

📖 The image points to a lasting family

## 👀 Behold, That Thus Shall The Man Be Blessed

"Behold" is an old word that means pay close attention.

This line repeats the psalm's opening promise on purpose.

Fearing the LORD is named again as the reason for every blessing already listed.

Repeating the point here marks the end of the psalm's first half.

👀 Behold means pay close attention

🔁 This line repeats the opening promise

🙏 Fearing God is named as the reason

📖 The fruitful home flows from fearing God

# Psalms 128:5-6
# 🕊️ Peace For Generations
---
## 🏛️ The LORD Shall Bless Thee Out Of Zion

"Zion" was the hill in Jerusalem where the temple stood.

It was the place where God's presence was understood to dwell among his people.

The psalm now shifts from blessing on one home to blessing that flows from Zion.

Personal life and the life of worship were never meant to stay separate.

🏛️ Zion was the temple hill in Jerusalem

🙌 It was where God's presence dwelled

🔗 Personal blessing connects to communal worship

📖 Home and worship are never separate

## ⏳ Thou Shalt See The Good Of Jerusalem All The Days Of Thy Life

This is a promise of a long life, not just a good one.

"See the good of Jerusalem" means watching the city and its people prosper.

The blessing on one home is now tied to the health of the whole community.

A person's fear of the LORD ends up serving a much bigger picture.

⏳ This promises a long life

🏙️ Seeing Jerusalem's good means watching it prosper

🤝 One home's blessing ties to the community

📖 Personal faith serves a bigger picture

## 👵 Thou Shalt See Thy Children's Children

Seeing your grandchildren was considered one of the greatest rewards of a long life.

It meant living long enough to watch a family grow into a new generation.

This picture completes the promise of children made earlier in the psalm.

The fruitful vine and the young olive plants have now grown into a full family line.

👵 Seeing grandchildren marked a full life

📈 It meant living into a new generation

🌳 This completes the earlier promise of children

📖 The family line has grown full circle

## 🕊️ Peace Upon Israel

"Peace" here means far more than the absence of war.

The Hebrew idea behind it, shalom, includes wholeness, safety, and wellbeing.

The psalm ends by widening its view one final time.

It moves outward from one home, to Jerusalem, to the peace of a whole nation.

Every blessing named in this psalm was always meant to reach beyond one household.

🕊️ Peace means far more than no war

🌍 Shalom includes wholeness, safety, and wellbeing

📢 The psalm widens from home to nation

📖 Every blessing reaches beyond one house
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyEightRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_EIGHT_RAW_NOTES
);
