export type SongOfSolomonSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonSixRawNotes(rawText: string): SongOfSolomonSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 6:${startVerse}` : `Song of Solomon 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Song of Solomon 6 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_SIX_RAW_NOTES = `# SongOfSolomon 6:1-3
# 🔍 Seeking Where He Went
---
## 🔍 Whither Is Thy Beloved Gone

"Whither" means to what place, an old way of asking where.

The daughters of Jerusalem ask this question, not the woman.

In chapter five they doubted her love was anything special.

Now they want to help her search for him.

Her praise poem in chapter five changed their minds completely.

🔍 Whither means to what place
😲 The daughters ask, not her
🔁 They doubted him back in chapter five
📖 Her praise poem won them over

## 🤝 That We May Seek Him With Thee

The daughters now offer real help, not doubt.

They are not taking over the search for him.

They simply want to walk beside her now.

Genuine love like this draws others in.

🤝 The daughters now offer real help
🚫 Not doubt, not skepticism anymore
👣 They want to walk beside her
📖 Real love draws others toward it

## 🌷 Gone Down Into His Garden

Chapters four and five already used garden to mean their marriage.

She is not describing a place he physically walked to.

The beds of spices picture closeness, not literal plants.

He gathers lilies, the same image used for his lips in chapter five.

🌷 Garden already means their marriage
🚫 Not a literal place he walked to
🌿 Beds of spices picture closeness
📖 Lilies echo his lips from chapter five

## 🔁 I Am My Beloved's, And My Beloved Is Mine

This exact line first appeared back in chapter two.

She repeats it here with total confidence.

Saying it again is not empty repetition.

A promise repeated over time only grows stronger.

🔁 This line first appeared in chapter two
💍 She repeats her vow with confidence
🔂 Repetition is not empty here
📖 A promise repeated only grows stronger

## 🐑 He Feedeth Among The Lilies

"Feedeth" means he grazes there, calm and unhurried.

Chapter two first used this exact picture for him.

Lilies are soft and fragrant, nothing like a battlefield.

Their marriage is where he finally rests.

🐑 Feedeth means he grazes calmly
🔁 Chapter two used this image first
🌸 Lilies are soft and fragrant
📖 Their marriage is where he rests

# SongOfSolomon 6:4-7
# 😍 His Praise Returns
---
## 🏙️ Beautiful As Tirzah

Tirzah was a real city, once the capital of the northern kingdom.

Ancient readers would know it as a byword for beauty.

Comparing a woman to a famous city was high praise.

He reaches for the finest image he can think of.

🏙️ Tirzah was a real northern capital
👑 Ancient readers knew it as beautiful
📣 Comparing her to a city was high praise
📖 He reaches for the finest image he knows

## 🏛️ Comely As Jerusalem

"Comely" means pleasant to look at.

Jerusalem was the capital of the southern kingdom.

Naming both capitals together is a doubled compliment.

Northern beauty and southern grandeur, both applied to her.

🏛️ Comely means pleasant to look at
🗺️ Jerusalem was the southern capital
✨ Naming both cities doubles the compliment
📖 Her beauty spans a divided kingdom

## ⚔️ Terrible As An Army With Banners

"Terrible" here does not mean scary.

It means awe inspiring, powerful enough to stop people in their tracks.

A banner was a raised flag marking an army's position.

Her beauty has that same overwhelming, commanding presence.

⚔️ Terrible here does not mean scary
🎌 It means awe inspiring and powerful
🚩 A banner marked an army's position
📖 Her beauty commands that same presence

## 😳 Turn Away Thine Eyes From Me

Here the man admits her gaze overwhelms him.

"They have overcome me" means her eyes have conquered him completely.

This flips the usual pattern of the poem.

For one line, she is the strong one and he yields.

😳 Her gaze overwhelms him here
💥 Overcome means her eyes conquered him
🔄 This flips the usual pattern
📖 For once, she holds the power

## 🐐 Thy Hair Is As A Flock Of Goats

This exact picture first appeared in chapter four.

Goats in that region were often black, flowing down a hillside.

From a distance her dark hair moves the same way.

Repeating the image is intentional, not a shortage of new ones.

🐐 This image repeats from chapter four
⛰️ Goats moved down hillsides in dark herds
🌑 Her hair mirrors that same flow
📖 The repeat is intentional, not lazy

## 🐑 Thy Teeth Are As A Flock Of Sheep

Chapter four used this exact comparison first.

Freshly washed sheep looked clean and bright white.

"Every one beareth twins" pictures a complete, matched set.

"Not one barren" means no tooth is missing or broken.

🐑 This comparison repeats from chapter four
🧼 Washed sheep looked clean and white
👯 Twins pictures a matched, complete set
📖 Not one barren means nothing missing

## 🍎 As A Piece Of A Pomegranate Are Thy Temples

"Temples" here means the sides of her forehead.

A cut pomegranate shows deep red seeds inside pale flesh.

Chapter four used this same picture for her blush.

The color shows through her hair like fruit through a veil.

🍎 Temples means the sides of her forehead
🔴 A cut pomegranate shows deep red seeds
🔁 Chapter four used this picture first
📖 Fruit color shows through her veil

# SongOfSolomon 6:8-9
# 🕊️ But One Among Many
---
## 👑 Threescore Queens, And Fourscore Concubines

"Threescore" means sixty, and "fourscore" means eighty.

That pictures a king with a very large royal household.

Solomon himself would later have far more than this number.

The poem uses these figures to set up a contrast.

👑 Threescore means sixty, fourscore means eighty
🏰 This pictures a huge royal household
📈 Solomon later had even more wives
📖 The numbers set up a contrast

## 🕊️ My Dove, My Undefiled Is But One

"Undefiled" means pure, without blemish or compromise.

Surrounded by sixty queens and eighty concubines, she still stands apart.

"But one" means unmatched, not simply unmarried.

Numbers cannot outweigh the kind of love this is.

🕊️ Undefiled means pure and unblemished
🔢 Surrounded by many, she stands apart
🎯 But one means unmatched, not lonely
📖 Numbers cannot outweigh real love

## 👧 She Is The Only One Of Her Mother

This likely does not mean she had no siblings.

It means she was treasured as if she were the only one.

A mother's whole attention pictures total, focused love.

That same focused love is now turned toward her by him.

👧 Probably not a literal only child
💝 It means treasured like an only one
🤱 A mother's full attention pictures that love
📖 Now that focus is turned toward her

## 👀 The Daughters Saw Her, And Blessed Her

These are the same daughters who doubted her back in chapter five.

Seeing her clearly changes their minds completely.

"Blessed" here means they spoke well of her, out loud.

Genuine love eventually silences even the skeptics.

👀 These are the same doubting daughters
🔁 Seeing her changes their minds
🗣️ Blessed means they spoke well of her
📖 Real love eventually silences skeptics

## 👑 The Queens And The Concubines, And They Praised Her

Even the women who could be her rivals praise her here.

Nothing in this poem shows jealousy from that royal household.

That is not how real households usually worked.

The poem paints an ideal picture of love without envy.

👑 Even possible rivals praise her here
🚫 No jealousy shows up in this poem
🏰 Real royal households rarely worked this way
📖 This pictures love with no envy

# SongOfSolomon 6:10
# 🌅 Who Is She
---
## 🌅 Who Is She That Looketh Forth As The Morning

This question likely comes from the daughters watching her.

"Looketh forth" pictures the sun just beginning to rise.

She is not fully revealed yet, only beginning to appear.

Her arrival draws every eye before she is even seen.

🌅 Likely spoken by the watching daughters
🌄 Looketh forth pictures a sunrise beginning
👁️ She is only beginning to appear
📖 Her arrival draws every eye first

## ☀️ Fair As The Moon, Clear As The Sun

The poem stacks three huge images in a row.

Moon, sun, and army with banners each stood for something grand.

"Terrible as an army with banners" already appeared back in verse four.

Repeating it here bookends the whole praise section.

Three images together say one thing, she is overwhelming to look at.

☀️ Three grand images stack together here
🌙 Moon and sun both stood for greatness
🔁 Army with banners repeats from verse four
📖 Together they say she is overwhelming

# SongOfSolomon 6:11-12
# 🌰 The Garden Of Nuts
---
## 🌰 I Went Down Into The Garden Of Nuts

"Nuts" here most likely means walnut trees, common in that region.

Going down into a garden pictures stepping into new growth.

Many scholars debate whether this is her voice or his.

Either way, the image points to checking on new love.

🌰 Nuts likely means walnut trees here
🌱 Going down pictures stepping into growth
❓ Scholars debate whose voice this is
📖 The image points to checking new love

## 🍇 To See Whether The Vine Flourished

Checking budding grapes and pomegranates meant checking on spring itself.

Farmers watched these signs to know the season had truly turned.

This same phrase returns again in chapter seven.

Watching plants bloom becomes a picture of watching love grow.

🍇 Budding grapes signaled spring's arrival
🌱 Farmers watched for the season turning
🔁 This phrase returns again in chapter seven
📖 Blooming plants picture growing love

## 🐎 My Soul Made Me Like The Chariots Of Amminadib

"Or ever" is an old way of saying before.

"Amminadib" appears nowhere else in the Bible.

Many scholars believe it names a person known for fast chariots.

The text itself does not explain who that person was.

Either way, the point is a sudden rush of overwhelming feeling.

🐎 Or ever means before, an old phrase
❓ Amminadib appears nowhere else in scripture
🏇 Many scholars link it to fast chariots
📖 The point is a sudden rush of feeling

# SongOfSolomon 6:13
# 💃 Return, O Shulamite
---
## 💃 Return, Return, O Shulamite

"Shulamite" is a title used only here in the whole Bible.

It likely connects to the town of Shunem.

Some scholars think it is simply a feminine form of Solomon's name.

Either reading points to her as his intended bride.

💃 Shulamite appears only here in scripture
🏘️ It may connect to the town Shunem
🔤 It may mirror Solomon's own name
📖 Either way, it names her as his bride

## 👥 That We May Look Upon Thee

The crowd now wants to see her, not just hear about her.

Being asked to return means she had begun to step away.

Public attention can feel heavy right after a private, intimate scene.

She is being pulled from private love into a public moment.

👥 The crowd wants to see her now
🔙 Return means she had stepped away
😮 Attention feels heavy after intimacy
📖 Private love now meets public eyes

## ❓ What Will Ye See In The Shulamite

This question is likely her own voice, not the crowd's.

She seems surprised that anyone wants to look at her at all.

Genuine humility often follows genuine praise.

She does not see herself the way others just described her.

❓ Likely her own surprised question
😳 She does not expect this attention
🙏 Humility follows right after praise
📖 She sees herself differently than they do

## 🕺 As It Were The Company Of Two Armies

This phrase describes a dance, not a literal battle.

"Two armies" likely names a place called Mahanaim, tied to Jacob's story.

The line does not explain the dance fully here.

Chapter seven picks up this exact scene and describes it.

🕺 This describes a dance, not a battle
📍 Two armies may name the place Mahanaim
🔜 The scene is not fully explained yet
📖 Chapter seven picks up right here
`.trim();

export const SONG_OF_SOLOMON_SIX_PERSONAL_SECTIONS = parseSongOfSolomonSixRawNotes(SONG_OF_SOLOMON_SIX_RAW_NOTES);
