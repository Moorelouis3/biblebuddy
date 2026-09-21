export type SongOfSolomonSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonSevenRawNotes(rawText: string): SongOfSolomonSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 7:${startVerse}` : `Song of Solomon 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Song of Solomon 7 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_SEVEN_RAW_NOTES = `# SongOfSolomon 7:1-5
# 🔄 A Praise Poem In Reverse
---
## 👣 How Beautiful Are Thy Feet With Shoes

Chapter four already praised her from her head down to her hair.

This poem now starts at the opposite end, her feet.

Dancing sandals were part of a wedding celebration in that culture.

The reversal signals a brand new song, not a repeat.

👣 Chapter four praised her starting at the head

🔄 This poem starts at her feet instead

💃 Shoes point to a wedding dance

📖 The reversal signals a brand new song

## 👑 O Prince's Daughter

This title likely does not describe her actual rank in life.

Many love poems used royal language as a form of praise.

Calling her a prince's daughter elevates her in her lover's eyes.

Love often makes an ordinary person feel like royalty.

👑 Likely not her true title

💬 Royal language was common poetic praise

💖 Love elevates her in his eyes

📖 Love can make anyone feel like royalty

## 💎 The Joints Of Thy Thighs Are Like Jewels

"Joints" here means the curve and shape of her hips.

The phrase praises a shape as smooth as cut jewels.

"Cunning workman" means a highly skilled craftsman, not a deceptive one.

Her form is treated like a piece of fine art.

💎 Joints means the curve of her hips

🎨 Her shape compared to cut jewels

🛠️ Cunning meant skilled, not deceptive

📖 Her body praised like fine art

## 🍷 Thy Navel Is Like A Round Goblet

A "goblet" is a wide, rounded wine cup used at feasts.

This phrase pictures a perfectly shaped, rounded curve.

The next words call it a goblet "which wanteth not liquor."

That detail means the cup is never left empty.

🍷 Goblet means a rounded feast cup

⭕ The image pictures a smooth curve

💧 Wanteth not liquor means never empty

📖 The picture points to full abundance

## 🌾 Thy Belly Is Like An Heap Of Wheat

A "heap of wheat" pictures a golden mound piled high after harvest.

Wheat like this stood for wealth and a good harvest season.

Lilies ringed around the wheat add a soft white border.

Gold and white together paint a picture of rich abundance.

🌾 Heap of wheat pictures a golden harvest pile

💰 Wheat stood for wealth in that culture

🌷 Lilies ring the wheat with soft white

📖 Gold and white together picture abundance

## 🦌 Thy Two Breasts Are Like Two Young Roes

"Roes" are young gazelles, small and graceful animals.

Chapter four already used this exact comparison for her.

Calling them twins pictures a matched, even pair.

Repeating the image ties this poem back to that earlier praise.

🦌 Roes means young, graceful gazelles

🔁 Chapter four used this same image

👯 Twins pictures a matched, even pair

📖 The repeat ties back to that earlier praise

## 🗼 Thy Neck Is As A Tower Of Ivory

Chapter four already compared her neck to a tower, the tower of David.

This tower is made of ivory instead, smooth and pale.

Ivory was rare and costly in the ancient world.

The new material shifts the picture from strength to elegance.

🗼 Chapter four already used a neck tower

🤍 Ivory means smooth, pale, and costly

💎 Ivory was rare in the ancient world

📖 This tower pictures elegance, not just strength

## 👁️ Thine Eyes Like The Fishpools In Heshbon

Heshbon was a real city east of the Jordan River.

It was known for clear, calm reflecting pools.

Comparing her eyes to those pools means they are deep and clear.

"Gate of Bathrabbim" names the exact gate those pools sat near.

🏙️ Heshbon was a real city nearby

💧 It was known for clear pools

👁️ Her eyes are pictured as deep and clear

📖 Bathrabbim names the exact gate there

## 🗼 Thy Nose Is As The Tower Of Lebanon

A prominent, straight nose was a mark of beauty in that culture.

Lebanon was famous for tall towers looking out over the land.

Damascus was a major city visible from that direction.

The comparison pictures strength and a commanding, watchful presence.

👃 A straight nose was a beauty mark then

🗼 Lebanon was known for tall watchtowers

🏙️ Damascus was a major city nearby

📖 The image pictures a commanding presence

## ⛰️ Thine Head Upon Thee Is Like Carmel

Mount Carmel was a lush, green mountain on Israel's coast.

Other Bible writers used Carmel as a picture of beauty and majesty.

Comparing her head to Carmel praises her bearing and presence.

The mountain stood out above the land around it.

⛰️ Carmel was a lush, green mountain

👑 Other writers used it for majesty

😌 The image praises her bearing

📖 Carmel stood out above the land

## 🐚 The Hair Of Thine Head Like Purple

Purple dye came from a rare sea snail found near the coast.

Making it took huge amounts of shellfish for a small amount of dye.

Only kings and the very wealthy could afford real purple cloth.

Her dark hair is praised as if it were royal purple.

🐚 Purple dye came from a rare sea snail

💰 It cost a fortune to produce

👑 Only royalty could usually afford it

📖 Her hair is praised as royal purple

## 🔒 The King Is Held In The Galleries

"Galleries" here is an old word, usually meaning flowing locks of hair.

The king is pictured as captured by those very locks.

This is not a literal prison, it is the pull of love.

Even a powerful king can be held by someone he loves.

🔒 Galleries likely means her flowing locks of hair

👑 The king is pictured as captured by them

💘 This capture is love, not a real prison

📖 Love can hold even a powerful king

# SongOfSolomon 7:6-9
# 🌴 The Palm Tree And The Vine
---
## 📝 How Fair And How Pleasant Art Thou

This line steps back and sums up the whole praise poem so far.

"For delights" means she is a source of joy and pleasure to him.

The long list of images all lands on this one simple line.

Sometimes the plainest words carry the most weight.

📝 This line sums up the whole poem

🗣️ Art thou means you are

😊 For delights means she brings him joy

📖 All the praise lands on this one line

## 🌴 This Thy Stature Is Like To A Palm Tree

"Stature" means her height and the way she carries herself.

A palm tree stands tall, straight, and graceful.

Palm trees were common and admired in that region.

The comparison praises her posture and quiet strength.

📏 Stature means her height and bearing

🌴 Palm trees stand tall and straight

🌍 They were common trees in that region

📖 The image praises her posture and strength

## 🍇 Thy Breasts To Clusters Of Grapes

Grape clusters hang heavy and full from a healthy vine.

This image pictures fullness and natural beauty.

Palm trees and grapevines were both prized crops in that land.

Two different plants paint one complete picture of her.

🍇 Grape clusters hang full from the vine

🌱 The image pictures fullness and beauty

🌾 Palms and grapes were both prized crops

📖 Two plants together complete one picture

## 🧗 I Said, I Will Go Up To The Palm Tree

Climbing a palm tree took real effort and desire.

He is not literally climbing a tree here.

The palm from the verse before already pictured her.

Climbing it pictures his longing to be close to her.

🧗 Climbing a palm took real effort

🌴 The palm tree pictures her

💓 Climbing it pictures his longing

📖 He longs to be close to her

## 🌿 I Will Take Hold Of The Boughs Thereof

"Boughs" means the branches of the tree.

Taking hold of them pictures a close, gentle embrace.

This continues the picture of him reaching for her.

The tree image lets an intimate moment stay tasteful.

🌿 Boughs means the branches of a tree

🤗 Taking hold pictures a gentle embrace

🌴 The tree image continues from before

📖 It keeps an intimate moment tasteful

## 🍇 Thy Breasts Also Shall Be As Clusters Of The Vine

The verse before already compared her breasts to grape clusters.

This line repeats the same image using the word vine instead.

Repeating an image inside one poem was a common style then.

The repetition adds warmth rather than sounding lazy.

🍇 The verse before already used this image

🔁 This line repeats it with vine

📜 Repeating images was common in that style

📖 It adds warmth, not laziness

## 👃 The Smell Of Thy Nose Like Apples

This does not describe how her nose actually smells.

It pictures her breath as sweet, like ripe fruit.

A fragrant fruit like this already appeared back in chapter two.

The image ties this scene back to that earlier one.

👃 Not about how her nose smells

🍎 It pictures her breath as sweet

🔁 A similar fruit appeared in chapter two

📖 This ties back to that earlier scene

## 🍷 The Roof Of Thy Mouth Like The Best Wine

"Roof of thy mouth" points to her words and her kisses.

Comparing them to the best wine means they are rich and satisfying.

Wine in that culture stood for joy and celebration.

Her voice and her kiss are praised as the finest gift.

🍷 Roof of mouth means her words and kiss

😋 Best wine means rich and satisfying

🎉 Wine stood for joy and celebration

📖 Her kiss is praised as a fine gift

## 😴 Causing The Lips Of Those That Are Asleep To Speak

This phrase pictures wine so smooth it seems to glide by itself.

Some read it as wine so good it could wake a sleeper to speak.

Either way the point is an overwhelming, effortless sweetness.

Her kiss is praised as more powerful than the finest wine.

😴 Pictures wine so smooth it glides

🗣️ Some read it as waking a sleeper

❓ Scholars read this phrase in different ways

📖 Her kiss outshines the finest wine

# SongOfSolomon 7:10
# 💞 His Desire Is Toward Me
---
## 🔁 I Am My Beloved's

This exact phrase already appeared back in chapters two and six.

Each time it shows up, it sounds like a settled, confident vow.

She names herself as belonging fully to him.

Repeating this line across the poem strengthens the whole promise.

🔁 This phrase already appeared twice before

💍 It sounds like a settled vow

🤝 She names herself as fully his

📖 Repeating it strengthens the whole promise

## 🔄 And His Desire Is Toward Me

Earlier refrains said "my beloved is mine," a mutual claim.

This line changes the second half completely.

"Desire" here is a strong Hebrew word for deep longing.

That exact word appears only two other times in the whole Bible.

Now his passionate desire for her is what gets named.

🔄 The refrain changes from before

🔥 Desire means strong, deep longing

📚 This exact word is rare in scripture

📖 His passionate longing for her is now named

# SongOfSolomon 7:11-13
# 🌿 Come, Let Us Go Into The Field
---
## 🌻 Come, My Beloved, Let Us Go Forth Into The Field

She now speaks and invites him away from the city and the court.

Earlier verses used royal images, towers, ivory, and purple dye.

Now the poem shifts to a simple, open field.

Love here does not need a palace to be real.

🌻 She now invites him away from the court

🏙️ Earlier verses used royal, city images

🌾 Now the poem shifts to open fields

📖 Love needs no palace to be real

## 🌙 Let Us Lodge In The Villages

"Lodge" means to spend the night and rest there.

Villages were small, plain settlements outside the larger cities.

Choosing a village over a palace is a deliberate choice.

She wants closeness with him, not luxury.

🌙 Lodge means to spend the night

🏘️ Villages were small, plain settlements

🎯 Choosing a village is deliberate

📖 She wants closeness, not luxury

## 🌅 Let Us Get Up Early To The Vineyards

Getting up early was necessary for real vineyard work.

This is not a lazy, distant kind of love.

She invites him into active, shared work and life.

Real love welcomes ordinary labor together.

🌅 Getting up early fit real vineyard work

💪 This is not a distant, lazy love

🤝 She invites him into shared work

📖 Real love welcomes ordinary labor together

## 🌱 Let Us See If The Vine Flourish

This exact same phrase already appeared back in chapter six.

Checking budding plants meant checking whether spring had truly arrived.

Watching new growth outside becomes a picture of watching new love.

The couple checks on nature and on their own love at once.

🔁 This phrase already appeared in chapter six

🌱 Checking buds meant checking for spring

💐 New growth pictures new love

📖 They watch nature and love together

## 🎁 There Will I Give Thee My Loves

"My loves" here means her full expressions of love and affection.

She promises this gift will happen out in that open field.

The vineyard setting becomes the place for real intimacy.

Her promise is personal, deliberate, and freely given.

🎁 My loves means her full affection

🌿 She promises this out in the field

💞 The vineyard becomes a place for intimacy

📖 Her gift is deliberate and freely given

## 🌱 The Mandrakes Give A Smell

Mandrakes were a plant root believed to help with fertility.

Rachel and Leah once bargained over mandrakes back in Genesis chapter thirty.

Their strong scent filled the air around the couple.

The plant adds one more layer to this romantic setting.

🌱 Mandrakes were linked to fertility

📗 Genesis mentions a similar bargaining scene

👃 Their scent filled the air around them

📖 The plant adds a romantic layer here

## 🍯 All Manner Of Pleasant Fruits, New And Old

She has stored fruit from this season and fruit saved from before.

"New and old" pictures a complete, generous store of provisions.

"Laid up for thee" means she saved this specifically for him.

The poem closes with a picture of complete, prepared devotion.

🍯 She stored fruit from many seasons

🎁 New and old pictures complete provision

💝 She saved this specifically for him

📖 The poem closes on prepared devotion
`.trim();

export const SONG_OF_SOLOMON_SEVEN_PERSONAL_SECTIONS = parseSongOfSolomonSevenRawNotes(SONG_OF_SOLOMON_SEVEN_RAW_NOTES);
