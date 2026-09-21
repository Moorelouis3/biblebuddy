export type SongOfSolomonTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonTwoRawNotes(rawText: string): SongOfSolomonTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 2:${startVerse}` : `Song of Solomon 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Song of Solomon 2 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_TWO_RAW_NOTES = `# SongOfSolomon 2:1-3
# 🌹 I Am The Rose Of Sharon
---
## 🌸 I Am The Rose Of Sharon

Rose here does not mean the flower people picture today.

The Hebrew word most likely names a wild crocus or meadow flower.

Sharon was the fertile coastal plain between Joppa and Mount Carmel.

Wildflowers covered that whole plain every spring.

She calls herself ordinary, one flower among a large open field.

🌸 Rose likely names a wild crocus
🌾 Sharon was a fertile coastal plain
🌼 Wildflowers filled that plain each spring
📖 She names herself as ordinary

## 🌷 The Lily Of The Valleys

Lily here likely names a lotus or wild anemone, not today's lily.

Valleys means the low fertile ground where such flowers grew wild.

Both words in verse one describe common flowers, not rare ones.

She is still speaking with humility about her own beauty.

The king is about to answer her very differently.

🌷 Lily likely means a lotus or anemone
🏞️ Valleys means low fertile ground
🌱 Both flowers were common, not rare
➡️ The king answers her differently next

## 🥀 As The Lily Among Thorns

The king now answers her, and lifts her comparison higher.

Thorns here pictures the other young women in Jerusalem, not something ugly.

A single lily standing out among sharp thorns is unmistakable.

He says she stands out completely among every other woman.

Her low view of herself gets turned into the highest praise.

🥀 Thorns pictures the other women
👑 A lily stands out among thorns
🌟 She stands out among every woman
📖 Her humility becomes his highest praise

## 🍎 As The Apple Tree Among The Trees Of The Wood

She answers him back with the very same kind of compliment.

Apple tree likely means a fruit tree, maybe an apricot or quince.

Trees of the wood means the ordinary wild trees of the forest.

Wild forest trees gave shade but never gave fruit.

Only he, among every man she could compare him to, gives both.

🍎 Apple tree likely means an apricot
🌲 Trees of the wood were wild
🍂 Wild trees gave shade but no fruit
📖 Only he gives shade and fruit

## 🌳 I Sat Down Under His Shadow With Great Delight

Shadow here means shade, a real comfort in this hot climate.

Sitting in a tree's shade was rest after a long, tiring day.

She pictures resting in his presence the same way.

Delight shows this rest brought her real joy, not just relief.

His presence is described as both protection and pleasure.

🌳 Shadow means cool shade
☀️ Shade gave rest from heat
😌 She rests in his presence
📖 His presence brings protection and joy

## 🍯 His Fruit Was Sweet To My Taste

Fruit continues the apple tree picture from the line before.

Tasting sweet fruit pictures real closeness, not just admiration from far away.

In this culture, shared food often pictured shared intimacy.

She is describing enjoyment, not simply watching him from a distance.

The whole verse moves from shade, to rest, to taste.

🍯 Fruit continues the tree picture
👅 Sweet taste pictures real closeness
🍽️ Shared food pictured shared intimacy
📖 The verse moves from shade to taste

# SongOfSolomon 2:4-6
# 🏛️ He Brought Me To The Banqueting House
---
## 🏛️ The Banqueting House

Banqueting house translates a Hebrew phrase meaning house of wine.

This was a place for feasting and public celebration, not a private room.

Being brought there in public was itself a sign of honor.

The king is not hiding her away, he is putting her on display.

Their love is shown as something celebrated openly, not kept secret.

🏛️ Banqueting house means house of wine
🎉 A place for public celebration
👀 Being brought there was an honor
📖 Their love is celebrated openly

## 🚩 His Banner Over Me Was Love

A banner was a large flag raised over an army or camp.

Everyone nearby could see whose banner was flying.

They would know at a glance who was in charge.

Here the banner flying over her is love itself, not a flag of war.

The image claims her publicly, the same way an army claims ground.

Love is described as something visible, not something hidden.

🚩 A banner marked an army or camp
👁️ Everyone could see whose banner flew
❤️ Love is the banner over her
📖 Love is public, not hidden

## 🍇 Stay Me With Flagons

Flagons here does not mean containers of wine, despite the English word.

The Hebrew word points to pressed raisin cakes, a rich, sweet food.

Raisin cakes were used to strengthen someone who felt weak or faint.

She is asking for something to revive her, not simply a drink.

The request pictures being overwhelmed, not casual enjoyment.

🍇 Flagons likely means raisin cakes
💪 Raisin cakes revived someone weak
😵 She asks to be revived
📖 The request pictures being overwhelmed

## 💔 I Am Sick Of Love

Sick of love is a real idiom in this poem, not modern illness.

It describes being overwhelmed by longing, faint with how strongly she feels.

Comfort me with apples repeats the same request as the raisin cakes.

Apples were also believed to have a strengthening, fragrant quality.

The whole verse shows love strong enough to feel physical.

💔 Sick of love means overwhelmed longing
🍎 Apples were believed to strengthen
😌 Comfort me repeats her request
📖 Love here feels physically strong

## 🤲 His Left Hand Is Under My Head

This line pictures a real embrace, not a poetic exaggeration only.

A hand under the head describes rest, closeness, and support together.

The same picture returns later in the book, in chapter eight.

Repeating an image like this marks it as a key picture of security.

She is describing safety inside his arms, not distance.

🤲 Pictures a real physical embrace
🛏️ A hand under the head means rest
🔁 The same picture returns later
📖 She describes safety in his arms

## 🫂 His Right Hand Doth Embrace Me

Doth is an old form of does, used constantly in this translation.

The right hand in this culture often pictured strength and favor.

Both hands together complete one full, secure embrace.

The verse ends the scene on closeness, not distance.

This is the picture the daughters of Jerusalem are warned not to rush.

🫂 Doth is an old form of does
💪 The right hand pictured strength
🤝 Both hands complete one embrace
📖 This closeness should not be rushed

# SongOfSolomon 2:7-9
# 🦌 Till He Please
---
## ⚖️ I Charge You O Ye Daughters Of Jerusalem

Charge here means a serious, formal request, almost like an oath.

Daughters of Jerusalem names a group of young women in the poem.

They act like a chorus, listening in on the story as it unfolds.

This exact charge repeats two more times later in the book.

Its repetition marks it as one of the poem's central warnings.

⚖️ Charge means a serious formal request
👭 Daughters of Jerusalem names a chorus
🔁 This charge repeats twice more
📖 It marks a central warning

## 🦌 By The Roes And By The Hinds Of The Field

Roes and hinds name swift wild deer, male and female.

Normal Hebrew oaths swore by God's own name, not by animals.

These two animal names sound close to two Hebrew names for God.

The line may be a quiet oath that never says God's name directly.

That fits a book that never mentions God's name outright even once.

🦌 Roes and hinds are wild deer
🗣️ Normal oaths swore by God's name
🔤 These words echo two names for God
📖 The book never names God outright

## ⏳ Stir Not Up Nor Awake My Love Till He Please

This is the warning itself, the point of the whole charge.

Love here is treated like something asleep that can be woken too soon.

The daughters are told not to force or rush it.

Real love is pictured as something with its own right timing.

The poem values patience as much as it values passion.

⏳ Love is pictured as asleep
🚫 Do not force or rush it
⏰ Love has its own timing
📖 Patience matters as much as passion

## 🗣️ The Voice Of My Beloved

She hears him before she sees him, and names the sound first.

Behold signals a sudden, exciting shift in the scene.

The poem moves from waiting to action in a single line.

Sound announces him before sight ever does.

Her attention is completely fixed on him arriving.

🗣️ She hears him before she sees him
❗ Behold signals a sudden shift
🏃 The scene shifts from waiting to action
📖 Her attention fixes on his arrival

## 🏔️ Leaping Upon The Mountains Skipping Upon The Hills

This pictures him moving fast and eager, not calm or slow.

Mountains and hills describe the hill country landscape of Israel.

Leaping over rough ground shows how little distance is stopping him.

The picture is energy and urgency, not a leisurely walk.

He is coming to her as quickly as the ground allows.

🏔️ Mountains and hills describe Israel's hill country
🏃 He moves fast, not slow
⛰️ Rough ground does not stop him
📖 The picture is urgency and eagerness

## 🦌 Like A Roe Or A Young Hart

The same swift animals from her earlier oath now describe him.

Roe and hart both name graceful, alert, quick moving deer.

Calling him this pictures agility and eager energy, not just beauty.

The comparison links back directly to verse seven.

The poem often reuses its own images this way.

🦌 Roe and hart are quick deer
⚡ Pictures agility and eager energy
🔗 Links back to the earlier oath
📖 The poem reuses its own images

## 🪟 Shewing Himself Through The Lattice

Shewing is an old spelling of showing.

A lattice was a crosshatched wooden screen covering a window opening.

It let in air and light for the room.

It also gave whoever sat inside some privacy.

He is pictured peeking through it, half seen and playful.

The moment captures eager anticipation more than a full arrival.

🪟 Shewing is an old spelling of showing
🌬️ A lattice let in air and light
😊 He peeks through it, half seen
📖 The moment captures eager anticipation

# SongOfSolomon 2:10-13
# 🌷 Rise Up My Love
---
## 💬 My Beloved Spake And Said Unto Me

Spake is an old form of spoke.

This line signals a shift into his direct words to her.

Up to now the poem described him, now he speaks for himself.

What follows is an invitation, not a command.

The next verses are his own voice, quoted directly.

💬 Spake is an old form of spoke
🔀 The poem shifts to his own voice
🎁 What follows is an invitation
📖 His words are quoted directly

## 🌅 Rise Up My Love My Fair One And Come Away

This exact line repeats again in verse thirteen, just after this section.

Fair one means beautiful, spoken as a term of affection.

Come away invites her outdoors, away from wherever she is now.

The invitation opens the description of spring that follows.

He calls her out into a new season, not just a new place.

🌅 This exact line repeats in verse 13
🌸 Fair one means beautiful
🚶 Come away invites her outdoors
📖 He calls her into a new season

## ❄️ The Winter Is Past

Winter in Israel was the rainy season, arriving each year from November to March.

Rain over and gone marks the shift into the dry growing season.

This is not only a comment about the weather.

The changing season becomes a picture of a new season in their love.

What was cold and closed is opening into something warm and alive.

❄️ Winter was Israel's rainy season
🌦️ Rain over and gone marks a shift
🌱 The season becomes a picture of love
📖 Cold and closed opens into warmth

## 🌼 The Flowers Appear On The Earth

This is the first visible sign that winter has actually ended.

Wildflowers across Israel bloom quickly once the rains stop.

The image matches the flowers she compared herself to back in verse one.

The whole landscape now mirrors what the king already called her.

Spring outside begins to match the love growing inside the poem.

🌼 Flowers are the first sign of spring
🌷 Wildflowers bloom fast after the rains
🔁 It echoes the flowers from verse 1
📖 Spring outside mirrors love inside

## 🐦 The Voice Of The Turtle Is Heard In Our Land

Turtle here does not mean a turtle, it means a turtledove.

Turtledoves migrate, so their return each year was a natural calendar.

Hearing their call again told people spring had truly arrived.

The detail is not decoration, it is a real seasonal marker.

Even the birds are announcing what the two lovers already know.

🐦 Turtle here means a turtledove
🗓️ Their return marked the change of season
🎶 Their call announced spring's arrival
📖 Even the birds announce the season

## 🌱 The Fig Tree Putteth Forth Her Green Figs

Putteth forth is an old way of saying puts out or produces.

Green figs are the early, unripe fruit that appear before the main crop.

Seeing them on the tree was another clear sign of the new season.

Farmers and travelers alike would have recognized this sign instantly.

The poem keeps grounding its love story in real, observable details.

🌱 Putteth forth means puts out
🍏 Green figs are early unripe fruit
👀 A clear, recognizable sign of spring
📖 The poem grounds love in real details

## 🍇 The Vines With The Tender Grape Give A Good Smell

Grapevines produce small blossoms in spring before any fruit forms.

Those blossoms carry a strong, sweet fragrance across the vineyard.

Tender grape points to young, newly forming fruit, not a ripe harvest yet.

This is the third seasonal sign in a row, after flowers and figs.

The verse repeats rise up my love, and come away, to close the invitation.

🍇 Vine blossoms carried a sweet fragrance
🌾 Tender grape means young forming fruit
🎯 The third seasonal sign in a row
📖 The invitation repeats to close the scene

# SongOfSolomon 2:14-17
# 🕊️ O My Dove
---
## 🕊️ O My Dove That Art In The Clefts Of The Rock

Dove echoes back to the doves eyes he named earlier in chapter one.

Clefts of the rock means narrow gaps and crevices in a cliff face.

Doves often nested in exactly this kind of hidden, rocky gap.

The picture shows her tucked away, shy, and hard to reach.

He is calling her out of hiding, not leaving her there.

🕊️ Dove echoes chapter one's doves eyes
🪨 Clefts of the rock means rocky gaps
🐦 Doves nested in gaps like this
📖 He calls her out of hiding

## 🪜 In The Secret Places Of The Stairs

This likely pictures a steep, hidden path along a cliff face.

It does not describe a staircase inside a house.

Secret places means somewhere tucked away, hard for others to find.

The image continues the same idea as the clefts of the rock.

She is pictured in a place only he would know to look.

🪜 Likely a hidden path, not a staircase
🙈 Secret places means tucked away
🪨 Continues the picture from the clefts
📖 Only he would know where to look

## 😊 Let Me See Thy Countenance Let Me Hear Thy Voice

Countenance is an old word for face or facial expression.

He wants to see her face and hear her voice both.

This mirrors verse eight, where she named his voice before she saw him.

Now he wants the same closeness returned to him.

Sight and sound together picture complete, unguarded presence.

😊 Countenance is an old word for face
👂 He wants to see and hear her
🔁 Mirrors her words about his voice
📖 Sight and sound picture full presence

## 🦊 Take Us The Foxes The Little Foxes

This is a real vineyard problem, not just a poetic image.

Young foxes damaged tender vines by digging and gnawing at new growth.

Tender grapes here echoes the same word used back in verse thirteen.

Many readers also take this as a picture of small things that ruin love.

Left unchecked, small problems can spoil something still tender and growing.

🦊 Young foxes damaged tender vines
🌱 Echoes the tender grape from verse 13
💔 A picture of small things that ruin love
📖 Small problems left unchecked can spoil love

## 💞 My Beloved Is Mine And I Am His

This is the clearest line in the poem about mutual belonging.

Neither side owns the other without also belonging back in return.

The same idea returns twice more later in the book, reversed each time.

Love here is shown as fully shared, not one sided.

This line stands near the heart of the whole song's message.

💞 Mutual belonging, fully shared both ways
🔁 The same idea returns twice more
⚖️ Love here is never one sided
📖 This line is the heart of the song

## 🌸 He Feedeth Among The Lilies

Feedeth is an old word meaning to graze or pasture.

Lilies were the very flowers she compared herself to in verse one.

The picture returns to shepherd imagery used earlier in the poem.

Him resting among lilies pictures him at home among her own beauty.

The chapter closes its opening image by bringing it back around.

🌸 Feedeth means to graze or pasture
🐑 Continues the shepherd imagery
🔁 Lilies echo the flowers from verse one
📖 The chapter's opening image returns

## 🌄 Until The Day Break And The Shadows Flee Away

This describes the approach of dawn, when darkness finally lifts.

Shadows flee away pictures night retreating as the sun rises.

The line may ask for their time together to last through the night.

Ending scenes at dawn or evening is common in this kind of poem.

Time itself becomes part of the poem's imagery here.

🌄 Describes the approach of dawn
🌒 Shadows flee pictures night retreating
⏰ May ask for the night to last
📖 Time itself becomes part of the imagery

## ⛰️ The Mountains Of Bether

Bether is not clearly identified as any known place on a map.

In Hebrew the word can mean division or separation.

Some readers take it as an actual mountain range with rough, cleft terrain.

Others read it as a quiet picture of two lovers parting for a while.

The text does not tell us which reading is certain.

⛰️ Bether is not a clearly known place
🔤 The word can mean separation
🏔️ May describe rough, cleft terrain
📖 The text does not tell us for certain
`.trim();

export const SONG_OF_SOLOMON_TWO_PERSONAL_SECTIONS = parseSongOfSolomonTwoRawNotes(SONG_OF_SOLOMON_TWO_RAW_NOTES);
