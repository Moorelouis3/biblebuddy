export type SongOfSolomonOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonOneRawNotes(rawText: string): SongOfSolomonOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 1:${startVerse}` : `Song of Solomon 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Song of Solomon 1 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_ONE_RAW_NOTES = `# SongOfSolomon 1:1-3
# 📜 The Song Of Songs Begins
---
## 📜 The Song Of Songs

Song of songs is a title built the same way as holy of holies.

Hebrew repeats a word like this to mark the highest example of its kind.

A song of songs means the greatest song of all songs.

The whole book introduces itself as poetry at its finest.

No other book in the Bible opens by calling itself the best of its kind.

📜 Song of songs means best of songs

👑 Same pattern as holy of holies

🎶 Hebrew doubles a word for emphasis

📖 This poem is presented as supreme poetry

## 🖋️ Which Is Solomon's

This phrase names the person the song is connected to.

In Hebrew it can mean by Solomon or for Solomon or about Solomon.

Solomon reigned as Israel's wisest and wealthiest king.

Many scholars believe Solomon wrote it himself in his younger years.

Others believe it was written in his honor using his name.

Either way the song carries a king's authority behind it.

🖋️ Names Solomon as the song's source

🔀 Hebrew allows by, for, or about him

👑 Solomon was Israel's wisest king

📖 The song carries royal weight

## 💋 Let Him Kiss Me With The Kisses Of His Mouth

The bride opens the poem speaking about the king before speaking to him.

She begins in the third person, as if describing him to someone else.

Within the same breath she shifts to speaking straight to him.

That shift from talking about him to talking to him mirrors longing that cannot wait.

A kiss here pictures open, unguarded affection between two people in love.

💋 She speaks about him first

🔄 Then shifts to speaking to him

⏳ The shift mirrors eager longing

📖 A kiss pictures open affection

## 🍷 Thy Love Is Better Than Wine

Wine was the ordinary symbol of joy and celebration in this culture.

Calling his love better than wine ranks it above the best pleasure people knew.

This is not a small compliment inside a wedding poem.

It sets the tone for the entire song as a celebration of love itself.

🍷 Wine symbolized joy and celebration

📈 His love outranks the best pleasure

💍 Sets the tone for the song

📖 Love is celebrated from the first line

## 🫙 Thy Name Is As Ointment Poured Forth

Name here means reputation and character, not just what someone is called.

In Hebrew the word for name, shem, sounds like the word for oil, shemen.

That wordplay links a person's character to a fragrance that fills a room.

Poured forth ointment could not be called back once it was released.

A good name, like poured oil, spreads and cannot be taken back either.

🫙 Name means reputation and character

🔤 Shem and shemen sound alike

🌬️ A good name spreads like scent

📖 Character cannot be called back once known

## 👩 Therefore Do The Virgins Love Thee

Virgins here refers to the young women of the royal court.

These women naturally admired a king known for wisdom, wealth, and charm.

Their admiration was public, matching how his fame was already public.

The bride is not claiming to be the only one who notices him.

She is saying his appeal is real and obvious to everyone.

👩 Virgins means young women of the court

👑 They admired a famous, wise king

📣 Their admiration was public knowledge

📖 His appeal was obvious to everyone

# SongOfSolomon 1:4-6
# 🏜️ I Am Black But Comely
---
## 🏃 Draw Me, We Will Run After Thee

The bride asks to be drawn toward the king, not dragged against her will.

Drawing someone in courtship language pictures gentle, willing attraction.

Her words shift from I to we partway through the line.

That shift may include her friends joining her eagerness to follow him.

Either way the whole verse pictures joyful pursuit, not reluctant duty.

🏃 Drawn means gently attracted, not forced

🔀 Her words shift from I to we

👭 Friends may be joining her longing

📖 The verse pictures joyful pursuit

## 🏰 The King Hath Brought Me Into His Chambers

Chambers means his private, inner rooms, not a public hall.

Being brought into someone's private chambers pictures closeness and trust.

In this culture a king's inner rooms were reserved for his closest circle.

The bride is describing intimacy that belongs only to the two of them.

🏰 Chambers means private inner rooms

🔑 Only his closest circle entered there

🤝 Pictures real closeness and trust

📖 Intimacy belongs to the two of them

## ⚖️ The Upright Love Thee

Upright describes people of real integrity, not just people who like someone.

The bride claims that even honest, discerning people recognize the king's worth.

This is not blind infatuation speaking.

Her love is backed up by the judgment of people with good character.

⚖️ Upright means people of integrity

👀 Even discerning people admire him

💔 This is not blind infatuation

📖 Good character backs up her love

## 🏕️ I Am Black, But Comely

Comely simply means beautiful or pleasing to look at.

The word but does not set up a real contradiction here.

She is not saying black despite being beautiful, as if the two clash.

She names a fact about her skin and a fact about her beauty in the same breath.

Her dark skin came from long days working outdoors, explained in the next verse.

🏕️ Comely means beautiful to look at

🚫 But does not signal real contradiction

☀️ Her skin was darkened by the sun

📖 She names both facts without shame

## ⛺ As The Tents Of Kedar, As The Curtains Of Solomon

Kedar was a nomadic desert tribe descended from Ishmael.

Their tents were black goat hair, weathered by sun and wind.

Curtains of Solomon likely pictures rich, costly palace tapestries by contrast.

She compares herself to both a rough desert tent and a royal curtain at once.

Weathered on the outside, she is still worth a king's finest fabric.

⛺ Kedar's tents were dark goat hair

🏜️ Weathered by sun and desert wind

🏰 Curtains of Solomon means costly palace fabric

📖 Weathered outside, royal in worth

## 😠 My Mother's Children Were Angry With Me

Mother's children means her brothers, likely half brothers from the same mother.

In this family they held authority over her and gave her hard outdoor work.

Their anger, not her own choice, put her out in the sun each day.

The verse quietly explains why she looks different, without excusing how she was treated.

😠 Her brothers held authority over her

🌾 They forced her into outdoor labor

☀️ Their choice caused her darkened skin

📖 The verse explains without excusing them

## 🍇 Mine Own Vineyard Have I Not Kept

She was assigned to guard the family vineyards, real fields that grew grapes.

Own vineyard also works as a picture for her own person and appearance.

Busy protecting everyone else's fields, she had no time left to care for herself.

The line carries both a literal job and a quiet complaint about being overworked.

🍇 She guarded the family's grape fields

🪞 Own vineyard also pictures herself

⏳ No time left to care for herself

📖 A literal job and a quiet complaint

# SongOfSolomon 1:7-8
# 🐑 Tell Me Where Thou Feedest
---
## 🐑 Where Thou Feedest, Where Thou Makest Thy Flock To Rest At Noon

The bride pictures her beloved as a shepherd caring for his flock.

Feedest is an old word simply meaning to pasture or graze the sheep.

Shepherds moved flocks to shade and rest during the hottest part of the day.

Calling the king a shepherd was a common, honoring picture in this culture.

Israel's own kings, including David, were remembered as shepherds before they were kings.

🐑 Feedest means to pasture the flock

☀️ Noon rest avoided the hottest sun

👑 Kings were often pictured as shepherds

📖 David himself began as a shepherd

## 🚶 As One That Turneth Aside By The Flocks Of Thy Companions

Turneth aside pictures a woman wandering alone from flock to flock.

In this culture a woman doing that risked being mistaken for someone available to anyone.

The bride is asking for clear directions so she avoids that misunderstanding.

Her concern protects her reputation, not just her convenience.

🚶 Turneth aside means wandering alone

👀 Wandering risked being misread by others

🛡️ She wants to protect her reputation

📖 Clear direction avoids misunderstanding

## 🌟 O Thou Fairest Among Women

This line answers her question, most likely spoken by her beloved.

Fairest among women is the strongest possible compliment in this kind of poem.

It ranks her above every other woman he could compare her to.

He answers her worry about wandering with reassurance, not correction.

🌟 Fairest means the most beautiful of all

👑 The strongest compliment the poem offers

💬 Likely spoken by her beloved

📖 He answers worry with reassurance

## 🐾 Go Thy Way Forth By The Footsteps Of The Flock

He gives her practical, simple directions instead of leaving her guessing.

Footsteps of the flock means the trail already worn by sheep traveling that path.

Following an existing trail was the normal way to find a shepherd in open country.

Even in the middle of a love poem, the answer is refreshingly ordinary.

🐾 Footsteps means the trail sheep left

🗺️ Following trails was the normal method

🐑 Sheep trails led straight to shepherds

📖 A practical answer inside a love poem

## 🐐 Feed Thy Kids Beside The Shepherds' Tents

Kids here means young goats, common animals herded alongside sheep.

Shepherds' tents marks where other shepherds camped while watching their own flocks.

The directions place her right in the middle of ordinary shepherd life.

Nothing about this scene is distant or make believe.

🐐 Kids means young goats

⛺ Shepherds camped near their flocks

🌍 The scene is grounded in daily life

📖 Nothing here is distant or make believe

# SongOfSolomon 1:9-11
# 🐎 A Company Of Horses
---
## 🐎 A Company Of Horses In Pharaoh's Chariots

This comparison sounds strange to modern ears but was a high compliment then.

Egyptian chariot horses were famous across the ancient world for their beauty and training.

Pharaoh's own horses were among the most admired animals anyone could picture.

A single striking mare stood out even among Pharaoh's finest, drawing every eye.

The beloved is comparing her to something unmatched, not something plain.

🐎 Egypt's chariot horses were world famous

👑 Pharaoh owned the finest horses known

👀 A striking mare drew every eye

📖 She is compared to something unmatched

## 💎 Thy Cheeks Are Comely With Rows Of Jewels

Rows of jewels likely describes a customary headdress or face ornament worn by brides.

Such ornaments hung in lines across the cheeks and forehead.

The comparison praises how naturally her face carries beauty, jewels or not.

Real jewelry becomes the measuring stick for describing her natural features.

💎 Rows of jewels describes bridal ornaments

👰 Worn across the cheeks and forehead

✨ Her natural beauty is the real jewel

📖 Jewelry becomes the measuring stick

## ⛓️ Thy Neck With Chains Of Gold

Chains of gold were valuable necklaces, a clear sign of wealth and status.

Wearing gold at the neck was reserved for people of real means.

The beloved pictures her as already dressed like royalty before any gift arrives.

Her worth is described as evident, not something jewelry needs to create.

⛓️ Gold chains signaled wealth and status

👑 Reserved for people of real means

🎁 She is pictured as already royal

📖 Jewelry does not create her worth

## 🥈 We Will Make Thee Borders Of Gold With Studs Of Silver

The speaker shifts to we, most likely friends or companions joining the promise.

Borders of gold pictures decorative trim added to a garment or headpiece.

Studs of silver adds small raised ornaments set into that trim.

This is a group promising to keep adding beauty to what she already has.

🥈 We signals friends joining the promise

🧵 Borders means decorative trim on clothing

⚪ Studs means small raised ornaments

📖 A community adds to her beauty

# SongOfSolomon 1:12-14
# 🌸 My Beloved Is Unto Me
---
## 🍽️ While The King Sitteth At His Table

This line pictures a banquet, a shared meal in close company.

Sitting at table together marked genuine closeness in this culture.

The bride speaks as someone present at his table, not watching from a distance.

The scene grounds the poem's romance in an ordinary, shared moment.

🍽️ A banquet pictures close company

🤝 Shared meals marked real closeness

👀 She speaks as someone present

📖 Romance grounded in an ordinary moment

## 🌿 My Spikenard Sendeth Forth The Smell Thereof

Spikenard was an extremely costly perfume oil imported from distant mountains.

Just a small amount of it filled a whole room with fragrance.

Centuries later Mary would pour spikenard on Jesus as an act of costly devotion.

Naming this specific perfume tells the reader she is offering something genuinely valuable.

🌿 Spikenard was a costly imported oil

🏔️ It came from distant mountain regions

🕯️ Mary later poured it on Jesus

📖 She offers something genuinely valuable

## 🌰 A Bundle Of Myrrh Is My Well Beloved Unto Me

Myrrh was a fragrant resin often carried in a small cloth sachet.

Women commonly wore a sachet of myrrh on a cord resting near the chest.

Calling her beloved a bundle of myrrh means he stays close to her constantly.

The image is about nearness and comfort, not anything meant to embarrass the reader.

🌰 Myrrh was worn as a small sachet

📿 Carried on a cord near the chest

🤗 Pictures her beloved staying close

📖 The image is about nearness and comfort

## 🌼 As A Cluster Of Camphire In The Vineyards Of Engedi

Camphire refers to henna, a plant with small, fragrant white and yellow flowers.

Engedi was a lush oasis beside the Dead Sea, fed by fresh springs.

Surrounding Engedi was some of the driest, harshest desert in the region.

Comparing her beloved to a flowering cluster there pictures rare beauty in an unlikely place.

🌼 Camphire means fragrant henna flowers

💧 Engedi was a spring fed oasis

🏜️ Surrounded by harsh desert

📖 Rare beauty in an unlikely place

# SongOfSolomon 1:15-17
# 🕊️ Thou Art Fair, My Love
---
## 🌟 Behold, Thou Art Fair, My Love

Behold calls the reader to stop and pay close attention to what follows.

The beloved speaks first this time, praising her directly.

Fair here means beautiful in the fullest sense, not just pleasant to look at.

Calling her my love uses tender, personal language, not formal address.

🌟 Behold means stop and pay attention

💬 The beloved speaks first this time

🌸 Fair means beautiful in the fullest sense

📖 My love is tender, personal language

## 🕊️ Thou Hast Doves' Eyes

Doves in this culture pictured gentleness, purity, and a steady gaze.

Comparing her eyes to a dove is not about their shape or color.

It describes the quality of her gaze, calm and completely fixed on him.

The picture is about attention and devotion, not appearance alone.

🕊️ Doves pictured gentleness and purity

👀 Describes the quality of her gaze

🎯 Her attention stays fixed on him

📖 About devotion, not appearance alone

## 🔁 Behold, Thou Art Fair, My Beloved

She answers him with almost the same words he just used for her.

Repeating his own praise back to him is a poetic form of agreement.

This kind of echo appears throughout the song as the two voices answer each other.

Love in this poem is shown as something spoken back and forth.

🔁 She echoes his own words back

🤝 Echoing shows agreement in this poem

🎶 The song repeats this call and answer

📖 Love is shown as back and forth

## 🌿 Also Our Bed Is Green

Green here pictures a grassy, living resting place, not a piece of furniture.

The two speak of resting together outdoors, surrounded by growing plants.

Nature itself becomes the setting for their love throughout this poem.

A living, green resting place fits a song built entirely from garden imagery.

🌿 Green pictures a grassy resting place

🌳 They picture resting together outdoors

🌍 Nature becomes their setting

📖 Fits a song built from garden imagery

## 🌲 The Beams Of Our House Are Cedar, And Our Rafters Of Fir

Cedar and fir were prized building woods, often shipped from Lebanon's forests.

These same woods were later used to build Solomon's temple in Jerusalem.

Here the two speak of their shared love as if it were their own house.

Calling nature's trees their beams and rafters turns the outdoors into a home.

🌲 Cedar and fir came from Lebanon

🏛️ The same woods built Solomon's temple

🏡 Their love is pictured as a house

📖 The outdoors becomes their home
`.trim();

export const SONG_OF_SOLOMON_ONE_PERSONAL_SECTIONS = parseSongOfSolomonOneRawNotes(SONG_OF_SOLOMON_ONE_RAW_NOTES);
