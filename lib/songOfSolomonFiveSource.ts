export type SongOfSolomonFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonFiveRawNotes(rawText: string): SongOfSolomonFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 5:${startVerse}` : `Song of Solomon 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Song of Solomon 5 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_FIVE_RAW_NOTES = `# SongOfSolomon 5:1
# 🍇 The Feast Begins
---
## 🌷 I Am Come Into My Garden, My Sister, My Spouse

He immediately answers the invitation she just gave at the end of chapter four.

Come into my garden means he has arrived, not merely promised to visit.

My sister my spouse repeats his own exact words from that earlier chapter.

The break between chapters hides how closely this verse follows right after hers.

🌷 He answers her chapter four invitation
🚪 Come into means he has arrived
🔁 Sister spouse repeats his own words
📖 The two chapters connect as one scene

## 🌿 I Have Gathered My Myrrh With My Spice

Gathered means he has already taken what the garden offered him.

Myrrh and spice were the very spices just listed filling her garden.

The verb gathered shows the invitation was accepted, not only heard.

The garden imagery now moves from description into actual enjoyment.

🌿 Myrrh and spice link back to chapter four
🖐️ Gathered means he already took it
🌷 The invitation became real action
📖 Description now turns into enjoyment

## 🍯 I Have Eaten My Honeycomb With My Honey, I Have Drunk My Wine With My Milk

Four different pleasures are named together, food and drink both included.

Honeycomb and honey already echoed her lips back in chapter four.

Wine was already linked to love and desire back in chapter one.

Naming four gifts at once pictures complete satisfaction, not just one taste.

🍯 Honeycomb echoes her lips from chapter four
🍷 Wine already stood for love in chapter one
🥛 Milk pairs with honey for sweetness
📖 Four gifts together picture full satisfaction

## 🗣️ Eat, O Friends, Drink, Yea, Drink Abundantly, O Beloved

This line does not come from either the man or the woman speaking to each other.

Many scholars believe an outside voice, perhaps a wedding chorus, speaks these words.

Friends and beloved together name both the wedding guests and the couple themselves.

The voice blesses their love openly instead of interrupting the scene.

🗣️ A separate voice speaks this line
🎉 Many scholars hear a wedding chorus
🤝 Friends and beloved names guests and couple
📖 The blessing celebrates love openly

# SongOfSolomon 5:2-3
# 😴 A Dream At The Door
---
## 😴 I Sleep, But My Heart Waketh

This line opens what most readers understand as a dream sequence.

Her body rests, but her heart stays alert to her beloved.

Chapter three already used a similar night search built the very same way.

The paradox signals a scene taking place somewhere between sleep and memory.

😴 Her body rests but her heart wakes
🌙 The scene likely unfolds as a dream
🔁 Chapter three already used a night search
📖 Sleep and awareness blur together here

## 🕊️ My Sister, My Love, My Dove, My Undefiled

He stacks four different terms of affection into a single breath.

Dove already described her eyes back in chapter one and chapter four.

Undefiled means pure and without moral blame, not simply untouched.

Piling up titles this way shows overflowing affection, not a routine greeting.

🕊️ Dove already described her eyes before
✨ Undefiled means pure and without blame
💞 Four titles stack in one breath
📖 The overflow shows deep affection

## 💧 My Head Is Filled With Dew, And My Locks With The Drops Of The Night

Dew and night drops describe heavy moisture that collects late at night.

A traveler out that late would already be damp and uncomfortable.

He mentions this to show how long he had waited outside her door.

His devotion cost him real discomfort long before she ever answered.

💧 Dew means heavy nighttime moisture
🌙 It shows how late the hour was
🚪 He waited outside before she answered
📖 His devotion came at a real cost

## 👘 I Have Put Off My Coat, How Shall I Put It On

Coat here names the outer garment worn for sleeping, already removed for the night.

Her question sounds like a small excuse rather than a real problem.

Getting dressed again to open a door was a minor, ordinary inconvenience.

The excuse hints at hesitation even though her heart was already awake.

👘 Coat means her outer sleeping garment
❓ Her question sounds like a small excuse
😬 Hesitation creeps in despite her waking heart
📖 A tiny excuse delays a real reunion

## 🦶 I Have Washed My Feet, How Shall I Defile Them

Washing feet before sleep was a common, practical habit in that culture.

Floors and roads were dusty, so clean feet would not stay clean for long.

Defile here simply means to get dirty again, not a moral failure.

A second small excuse follows the first, delaying the door even longer.

🦶 Washing feet before bed was common
🌫️ Floors were dusty, feet stayed dirty easily
🚫 Defile just means to get dirty
📖 A second excuse delays the door

# SongOfSolomon 5:4-6
# 🚪 Too Late To The Door
---
## ✋ My Beloved Put In His Hand By The Hole Of The Door

Ancient doors often had a small hole for reaching in to lift the latch.

His hand reaching through that hole shows his own longing to be let in.

He is not simply waiting outside, he is trying to close the distance himself.

The gesture matches how eager he already sounded back in verse two.

🚪 Ancient doors had a latch reaching hole
✋ His hand reaching shows real longing
🏃 He tries to close the distance himself
📖 His eagerness matches verse two

## 💓 My Bowels Were Moved For Him

Bowels in this older English names the seat of deep inward feeling, not the digestive organs.

The phrase describes a sudden rush of longing and compassion.

Her hesitation from the verses before is breaking apart in this single moment.

Real feeling cannot stay hidden behind small excuses for very long.

💓 Bowels meant deep inward feeling
🌊 A sudden rush of longing hits her
🔓 Her earlier hesitation breaks apart
📖 Real feeling outlasts small excuses

## 🌿 My Hands Dropped With Myrrh, And My Fingers With Sweet Smelling Myrrh

She had myrrh perfumed oil ready on her hands for this very moment.

Myrrh already described her beloved back in chapter one as a bundle resting on her.

Even the door handle now carries that same rich scent.

The whole scene stays soaked in the perfume already tied to their love.

🌿 Myrrh already described him in chapter one
🖐️ Her hands were perfumed and ready
🚪 Even the door handle picks up the scent
📖 The whole scene stays soaked in myrrh

## 🚶 But My Beloved Had Withdrawn Himself, And Was Gone

By the time she finally opens the door, he has already left.

Her small hesitations from before had a real consequence after all.

Withdrawn means he pulled back and walked away, not that he vanished by magic.

A moment she was not ready to answer for cannot be recovered by wishing.

🚪 He is already gone when she opens
⏳ Her earlier hesitation had a real cost
🚶 Withdrawn means he simply walked away
📖 A missed moment cannot be undone by wishing

## 😔 My Soul Failed When He Spake

Failed here means overwhelmed, close to fainting from strong emotion, not literal death.

Hearing that he had already spoken and gone overwhelms her completely.

The strength of her reaction shows how much this moment actually meant to her.

Grief this heavy only comes from love that was already real.

😔 Failed here means overwhelmed by emotion
🗣️ Hearing he had gone overwhelms her
💔 Her reaction shows how much she cared
📖 Heavy grief proves real love

## 📢 I Sought Him, But I Could Not Find Him, I Called Him, But He Gave Me No Answer

This line closely echoes her search from chapter three, word for word in places.

Calling him and getting no answer adds a new layer of pain this time.

The poem repeats this search on purpose, not from a lack of imagination.

Longing for someone absent is shown here as a real, recurring struggle.

🔁 This echoes her search from chapter three
📢 Calling with no answer adds new pain
🎭 The repeated search is intentional, not lazy
📖 Longing for an absent love feels real

# SongOfSolomon 5:7-8
# 🩸 Wounded By The Watchmen
---
## 👮 The Watchmen That Went About The City Found Me

Watchmen already appeared once before, back in chapter three.

In chapter three they were simply asked a question and caused no harm.

This time the watchmen turn violent, a sharp change from before.

Searching for love at night has become genuinely dangerous now.

👮 Watchmen already appeared in chapter three
🕊️ They were harmless there
⚔️ This time they turn violent
📖 The search has grown genuinely dangerous

## 👊 They Smote Me, They Wounded Me

Smote and wounded both describe real, physical blows, not gentle handling.

Many scholars read this as the dream expressing how painful separation actually felt.

A search that began with hope has turned into real suffering.

The poem does not shy away from showing love's cost, not only its joy.

👊 Smote and wounded mean real blows
😢 The pain pictures how separation felt
⚠️ Hope turned into real suffering
📖 The poem shows love's cost too

## 🧕 The Keepers Of The Walls Took Away My Veil From Me

A veil in that culture covered a woman's head and signaled modesty in public.

Having it torn away in the street was a public humiliation, not a small loss.

The keepers of the walls acted with the same harshness as the watchmen.

The dream pictures her stripped of protection while searching for love.

🧕 A veil signaled modesty in public
😳 Losing it was a real humiliation
🏰 Wall keepers acted just as harshly
📖 The search stripped away her protection

## ✉️ I Charge You, O Daughters Of Jerusalem, If Ye Find My Beloved

The daughters of Jerusalem have been charged before, back in chapter two and chapter three.

Those earlier charges warned them not to wake up love too soon.

This charge asks something completely different, to carry a message to him.

A familiar refrain returns here with a new purpose instead of its usual warning.

👭 Daughters of Jerusalem were charged before
🤫 Earlier charges warned against waking love
✉️ This charge asks them to carry a message
📖 A familiar line returns with new purpose

## 💔 That I Am Sick Of Love

This exact phrase already appeared once before, in chapter two.

Sick of love means overwhelmed by longing, not physically ill.

Repeating it here shows her longing has only grown stronger since then.

The whole search in this chapter grows out of that one aching feeling.

🔁 This phrase already appeared in chapter two
💔 Sick of love means overwhelmed by longing
📈 Her longing has only grown stronger
📖 One feeling drives this whole search

# SongOfSolomon 5:9
# ❓ What Makes Him Different
---
## ❓ What Is Thy Beloved More Than Another Beloved

The daughters of Jerusalem answer her charge with a question of their own.

Repeating the same question twice shows genuine curiosity, not mockery.

Their question sets up the long description that fills the rest of this chapter.

She now has to explain what makes her beloved worth searching for.

❓ The daughters respond with a question
🔁 Repeating it shows real curiosity
📜 This sets up the chapter's long description
📖 She must explain why he is worth it

## 👑 O Thou Fairest Among Women

This exact title was already used once before, in chapter one.

Fairest among women calls her the most beautiful woman present.

The poem lets both partners receive praise, not only one of them.

Even while she describes him, her own beauty is not forgotten.

👑 Fairest among women appeared in chapter one
💃 It names her as the most beautiful present
🤝 Both partners receive praise in this poem
📖 Her beauty is not forgotten here

# SongOfSolomon 5:10-12
# 🥇 Head Of Fine Gold
---
## ✨ My Beloved Is White And Ruddy

White here pictures a bright, healthy glow, not paleness or sickness.

Ruddy describes a healthy reddish color in the skin, the same word later used for David.

Together the two words picture vigor and health, not one exact skin tone.

This description opens the fullest physical praise of a man anywhere in the Bible.

✨ White pictures a bright healthy glow
❤️ Ruddy is the same word used for David
💪 Together they picture youthful vigor
📖 The Bible's fullest praise of a man

## 🥇 The Chiefest Among Ten Thousand

Chiefest means first in rank, standing above every other option.

Ten thousand functions as a round number for an enormous crowd, not an exact count.

Out of every possible man, he stands out completely to her.

The phrase answers the daughters' question before the details even begin.

🥇 Chiefest means first in rank
🔟 Ten thousand pictures an enormous crowd
👤 He stands out above every option
📖 This answers the daughters before details begin

## 👑 His Head Is As The Most Fine Gold

Fine gold was the purest and most valuable form of that metal.

Comparing his head to gold pictures dignity and worth, not a color.

This description moves from head to feet, the same pattern chapter four used for her.

Naming the head first sets that same structure in motion right away.

🥇 Fine gold pictures dignity and worth
👑 The comparison is about worth, not color
🔁 This mirrors chapter four's description of her
📖 The poem now moves from head to feet

## 🦅 His Locks Are Bushy, And Black As A Raven

Bushy describes hair that is thick and full, not thin or sparse.

A raven is a bird known for deep, glossy black feathers.

Thick, black hair without any gray pictured youth and full strength.

The image keeps building a picture of vigor from the head downward.

🦅 A raven pictures deep glossy black
💇 Bushy means thick, full hair
🌟 Black hair without gray pictured youth
📖 Vigor keeps building from the head down

## 🕊️ His Eyes Are As The Eyes Of Doves By The Rivers Of Waters

Dove imagery already described her eyes back in chapter one and chapter four.

Now that same picture praises his eyes instead of hers.

Washed with milk pictures bright, clear whites around the eye.

Fitly set simply means his eyes were well placed and in proportion.

🕊️ Dove imagery earlier described her eyes
🔄 Now the same picture praises him
🥛 Washed with milk pictures bright clear eyes
📖 Fitly set means well proportioned

# SongOfSolomon 5:13-14
# 🌹 Cheeks, Lips, And Hands
---
## 🌿 His Cheeks Are As A Bed Of Spices, As Sweet Flowers

A bed of spices pictures a garden plot planted with fragrant herbs.

Sweet flowers adds color and pleasant scent to the very same picture.

Garden imagery has run through this whole poem since chapter four.

His face is now described using that same garden language once used for her.

🌿 A bed of spices pictures a fragrant garden
🌸 Sweet flowers adds color and scent
🔁 Garden imagery has run through the poem
📖 The same language now praises his face

## 🌷 His Lips Like Lilies, Dropping Sweet Smelling Myrrh

Lilies already pictured the garden where he feeds back in chapter two.

Myrrh has scented this whole poem ever since chapter one.

Dropping myrrh pictures his words as rich and pleasant to hear.

Both images gathered here have already appeared earlier in the book.

🌷 Lilies already appeared in chapter two
🌿 Myrrh has scented the poem since chapter one
🗣️ Dropping myrrh pictures pleasant words
📖 Familiar images now describe him

## 💍 His Hands Are As Gold Rings Set With The Beryl

Beryl was a precious gemstone, likely a greenish blue color.

Gold rings set with beryl describes fine, expensive jewelry.

His fingers are pictured as smooth and valuable as that jewelry.

Even a small detail like hands gets treated as worth real praise.

💍 Beryl was a precious greenish stone
🥇 Gold rings pictured fine jewelry
✋ His fingers are pictured that valuable
📖 Even small details get real praise

## 🐘 His Belly Is As Bright Ivory Overlaid With Sapphires

Ivory was a smooth, pale, expensive material carved from tusks.

Sapphires were prized blue gemstones used to decorate fine objects.

The picture likely describes a smooth midsection with a richly decorated belt.

Precious materials keep stacking up as this description continues.

🐘 Ivory was smooth pale carved material
💎 Sapphires were prized blue gemstones
👔 The image likely pictures a decorated belt
📖 Precious materials keep stacking up

# SongOfSolomon 5:15-16
# 🏛️ Pillars Of Marble, A True Friend
---
## 🏛️ His Legs Are As Pillars Of Marble, Set Upon Sockets Of Fine Gold

Marble pillars pictured strength and stability in ancient buildings.

Sockets of fine gold names the base where each pillar stood.

Together the image pictures strong, well set legs and feet.

Temple like language keeps building a picture of dignity, not just strength.

🏛️ Marble pillars pictured strength and stability
🥇 Gold sockets named the pillar's base
🦵 The image pictures strong, steady legs
📖 Temple language adds dignity, not just strength

## 🌲 His Countenance Is As Lebanon, Excellent As The Cedars

Countenance means the look and presence of someone's face, already explained earlier in this book.

Lebanon and its cedars were famous across the ancient world for height and strength.

Chapter three already used cedar from Lebanon to describe Solomon's own chariot.

Comparing his presence to Lebanon pictures someone impressive to be near.

🙂 Countenance means someone's face and presence
🌲 Lebanon's cedars were famous for height
🔁 Chapter three already used Lebanon's cedar
📖 His presence is pictured as impressive

## 🏁 His Mouth Is Most Sweet, Yea, He Is Altogether Lovely

This line closes the long head to foot description that began back in verse ten.

Altogether lovely means completely desirable, with nothing left to criticize.

Chapter four already closed her description the very same way, calling her all fair.

Both descriptions in this book end the exact same way, in total praise.

🏁 This closes the description begun in verse ten
💯 Altogether lovely means completely desirable
🔁 Chapter four closed her description the same way
📖 Both descriptions end in total praise

## 🤝 This Is My Beloved, And This Is My Friend, O Daughters Of Jerusalem

This line finally answers the question the daughters asked back in verse nine.

Friend is a new title, not used for him before this point.

Calling him a friend shows their love includes real companionship, not only attraction.

The whole long description was simply her honest answer to one simple question.

❓ This answers the question from verse nine
🤝 Friend is a new title for him
💞 It shows real companionship, not just attraction
📖 A long praise answers one simple question
`.trim();

export const SONG_OF_SOLOMON_FIVE_PERSONAL_SECTIONS = parseSongOfSolomonFiveRawNotes(SONG_OF_SOLOMON_FIVE_RAW_NOTES);
