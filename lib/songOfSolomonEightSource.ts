export type SongOfSolomonEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonEightRawNotes(rawText: string): SongOfSolomonEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 8:${startVerse}` : `Song of Solomon 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Song of Solomon 8 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_EIGHT_RAW_NOTES = `# SongOfSolomon 8:1-4
# 🫂 A Wish To Love Him Openly
---
## 🚫 As My Brother, That Sucked The Breasts Of My Mother

This does not mean she wishes he were her actual blood brother.

In this culture, unmarried lovers could not touch or kiss in public without scandal.

Brothers and sisters could embrace freely with no shame attached.

She wishes for that same freedom to show her love openly.

🚫 Not a wish for real kinship

👭 Siblings could embrace without shame

💔 Lovers could not touch in public

📖 She longs to love him openly

## 🏘️ When I Should Find Thee Without, I Would Kiss Thee

"Without" here means outside, in the open street.

A kiss in public between an unmarried couple invited gossip and shame.

She imagines a world where she could greet him that way without fear.

The wish reveals how hidden their love still is from public view.

🏘️ Without means out in public

😳 Public affection invited real gossip

🤫 Their love still stays hidden

➡️ She longs for it to be seen

## 👎 I Should Not Be Despised

"Despised" means looked down on or mocked.

A young unmarried woman showing affection in the street risked being shamed by onlookers.

She is not ashamed of loving him.

She is only afraid of how the culture around her would judge it.

👎 Despised means mocked or scorned

😔 Public affection risked real shame

❤️ Her love itself is not the problem

📖 Culture, not love, is the obstacle

## 🏠 Into My Mother's House, Who Would Instruct Me

The mother's house already appeared earlier in this book, back in chapter three.

There it was the place love was guided, not hidden.

A mother in this culture often taught a daughter about marriage and love.

Bringing him there means bringing him into the safest place she knows.

This is not about secrecy.

It is about doing love the right way, inside her family's care.

🏠 Mother's house appears earlier in the book

👩 Mothers taught daughters about marriage

🛡️ It was the safest place for love

📖 Love done right, not love done secretly

## 🍎 Spiced Wine Of The Juice Of My Pomegranate

Pomegranates appear throughout this book as a picture of her own beauty.

Spiced wine was a rare luxury, made by mixing wine with costly spices.

She offers him her most treasured gift, not an ordinary drink.

The image ties back to the fruit and garden language used since chapter four.

🍎 Pomegranates symbolize her beauty

🍷 Spiced wine was a rare luxury

🎁 She offers her most treasured gift

📖 The image echoes chapter four's garden

## 🤲 His Left Hand Should Be Under My Head, And His Right Hand Should Embrace Me

This exact embrace already appeared earlier in the book, in chapter two.

There it was described as already happening.

Here it is only wished for, not yet real.

The change from present to wish shows how far apart the couple still feel.

🤲 Same embrace as chapter two

⏳ Now spoken only as a wish

💭 Shows the couple's current distance

📖 Longing replaces the earlier closeness

## 🔁 Stir Not Up, Nor Awake My Love, Until He Please

This exact warning has already appeared twice before, in chapters two and three.

It tells the daughters of Jerusalem not to force love before it is ready.

Real love follows its own timing.

It cannot be rushed or manufactured on command.

🔁 Third time this warning appears

⏰ Love follows its own timing

🚫 It cannot be forced or rushed

📖 Patience protects real love

# SongOfSolomon 8:5-7
# 🔥 Love As Strong As Death
---
## ❓ Who Is This That Cometh Up From The Wilderness, Leaning Upon Her Beloved

This same question was already asked once before, in chapter three.

There she was pictured arriving alone in a cloud of smoke.

Here she arrives leaning on the one she loves.

The picture has shifted from a grand procession to quiet togetherness.

❓ Same question as chapter three

🚶 Earlier she arrived alone

🤝 Now she leans on her beloved

📖 Grand procession becomes quiet closeness

## 🍏 I Raised Thee Up Under The Apple Tree

The apple tree already appeared earlier in this book as a picture of desire waking up.

Here it becomes the place where their love itself first began.

The tree ties the couple's story back to where it started.

Love that now feels strong as death once began in one small, ordinary place.

🍏 Apple tree recalls chapter two

🌱 It marks where love began

🔁 Ties the ending back to the start

📖 Even great love starts somewhere small

## 🔁 There Thy Mother Brought Thee Forth

This same line is said twice in a row on purpose.

Hebrew poetry often repeats a line for emphasis rather than by mistake.

The repetition grounds her in an ordinary human birth, not a legend.

Even the most praised woman in this poem was once simply born to a mother.

🔁 The line repeats on purpose

📜 Hebrew poetry repeats for emphasis

👶 She was born like anyone else

📖 Even great beauty starts as an ordinary birth

## 🔏 Set Me As A Seal Upon Thine Heart, As A Seal Upon Thine Arm

A "seal" was a small stamp used to prove ownership.

It was often worn on a cord or a ring.

Pressing it into wax or clay marked something as belonging to one person alone.

She asks to be marked that permanently on his heart and his arm.

The heart stands for his inner devotion.

The arm stands for his outward strength.

🔏 Seal means a personal ownership stamp

💍 Worn on a cord or ring

❤️ Heart stands for inner devotion

📖 Arm stands for outward strength

## ⚰️ Love Is Strong As Death

Death is the one force that nothing in this world can stop or outrun.

She compares her love to that exact same unstoppable power.

This is the strongest claim about love in the entire book.

Love, like death, comes for everyone and cannot be talked out of arriving.

⚰️ Death cannot be stopped or outrun

🔥 Love is compared to that same power

📈 The strongest claim in the whole book

📖 Real love arrives and will not be denied

## 💚 Jealousy Is Cruel As The Grave

"Jealousy" here does not mean petty envy over small things.

It means a fierce, exclusive devotion that will not share what it loves.

"The grave" refers to Sheol, the realm of the dead that never releases anyone.

Her jealousy holds onto him with that same unyielding grip.

💚 Jealousy means fierce devotion here

🚫 Not petty envy over small things

⚰️ The grave never releases anyone

📖 Her love holds on the same way

## 🔥 The Coals Thereof Are Coals Of Fire, Which Hath A Most Vehement Flame

"Vehement" means intense and overwhelming.

Some scholars believe the original Hebrew phrase here can be read as "the flame of the LORD."

If that reading is right, this love does not just resemble fire.

It traces back to God as its actual source.

🔥 Vehement means intense and overwhelming

📜 Hebrew may read flame of the LORD

🙏 That would trace love back to God

📖 Real love may burn with God's own fire

## 🌊 Many Waters Cannot Quench Love, Neither Can The Floods Drown It

Floods in the ancient world stood for total, uncontrollable disaster.

A flood could wipe out a whole town without warning.

She says love survives even that level of destruction.

Nothing this world can throw at real love is enough to put it out.

🌊 Floods pictured total disaster

🏚️ A flood could destroy a whole town

🔥 Love survives even that level of loss

📖 Nothing can put out real love

## 💰 If A Man Would Give All The Substance Of His House For Love, It Would Utterly Be Contemned

"Substance of his house" means everything a man owns, his entire fortune.

"Contemned" means rejected with scorn.

A man could not buy real love with any amount of money.

Trying to purchase it would only get the offer laughed out of the room.

💰 Substance of his house means total wealth

👎 Contemned means rejected with scorn

🚫 Love cannot be bought at any price

📖 Real love is never for sale

# SongOfSolomon 8:8-10
# 🏰 The Little Sister And The Wall
---
## 👨‍👩‍👧 We Have A Little Sister, And She Hath No Breasts

The speakers shift here to her brothers, the same brothers introduced back in chapter one.

"No breasts" simply means she has not yet physically reached marrying age.

They are not mocking her.

They are thinking ahead to a responsibility they will eventually carry.

👨‍👩‍👧 Speakers shift to her brothers

👧 No breasts means not yet grown

🚫 They are not mocking her

📖 They are planning ahead for her future

## 💍 What Shall We Do For Our Sister In The Day When She Shall Be Spoken For

"Spoken for" means the day a suitor formally asks for her in marriage.

Brothers in this culture often held real responsibility for protecting an unmarried sister.

They are asking how to prepare her long before that day ever arrives.

Real care plans ahead instead of waiting for the crisis to show up.

💍 Spoken for means a marriage proposal

🛡️ Brothers protected unmarried sisters

📅 They plan years before it happens

📖 Real care prepares ahead of time

## 🧱 If She Be A Wall, We Will Build Upon Her A Palace Of Silver

A "wall" here pictures a woman who stays firm against pressure.

If she grows up strong and unmoved, her brothers promise to honor her.

A "palace of silver" means a reward of real value and protection.

Firmness, in their eyes, earns real honor.

🧱 Wall pictures firm resistance

💪 Staying firm like a wall

🏰 Palace of silver means real honor

📖 Firmness earns real reward

## 🚪 If She Be A Door, We Will Inclose Her With Boards Of Cedar

A "door" here pictures the opposite, someone who opens easily to pressure.

"Boards of cedar" means the brothers would add extra protection around her.

This is not punishment.

It is the brothers stepping in to guard someone more vulnerable to being pushed into something.

🚪 Door pictures being easily persuaded

🌲 Cedar boards mean extra protection

🚫 This is not punishment

📖 Vulnerability gets more guarding, not shame

## 🧱 I Am A Wall, And My Breasts Like Towers

She answers her brothers' question about herself directly.

She claims to be the wall, firm and unmoved through her whole courtship.

"Towers" pictures her now grown and matured, strong rather than fragile.

She proved to be exactly what her brothers hoped for.

🧱 She claims to be the wall

💪 Firm and unmoved through courtship

🗼 Towers picture her full maturity

📖 She became what her brothers hoped

## ✅ Then Was I In His Eyes As One That Found Favour

"Found favour" means she gained genuine approval and delight in his eyes.

Her firmness through the whole courtship was not wasted effort.

It became the very thing that won his love.

What could have looked like resistance turned out to be the path to real intimacy.

✅ Found favour means real approval

💪 Her firmness was not wasted

❤️ It became the path to his love

📖 Resistance led to real intimacy

# SongOfSolomon 8:11-14
# 🌿 The Vineyard And The Final Call
---
## 🍇 Solomon Had A Vineyard At Baalhamon

"Baalhamon" likely means "lord of abundance," fitting for one of Solomon's many properties.

This vineyard belonged to Solomon himself, a literal piece of his vast wealth.

Earlier in this book, "my vineyard" was used as a picture for the woman herself.

The poem is about to compare Solomon's real vineyard to that deeper image.

🍇 Baalhamon likely means place of abundance

👑 A literal piece of Solomon's wealth

🌿 Vineyard was used as an image for her

📖 Two vineyards are about to be compared

## 🌱 He Let Out The Vineyard Unto Keepers

Wealthy vineyard owners commonly leased their land out to hired keepers.

The keepers tended the vines and paid the owner from the harvest.

This was ordinary business for a king with many properties.

Solomon manages this vineyard the same practical way he manages everything else he owns.

🌱 Keepers commonly leased vineyard land

🍇 They tended vines and paid rent

💼 This was ordinary ancient business

📖 Solomon treats it like any other asset

## 💰 Every One For The Fruit Thereof Was To Bring A Thousand Pieces Of Silver

A thousand pieces of silver was an enormous sum in the ancient world.

This was the standard rent each keeper owed Solomon from his share of the harvest.

The number is meant to sound impressive.

It sets up a sharp contrast with what comes next in her own answer.

💰 A thousand pieces was an enormous sum

🍇 Standard rent owed to Solomon

📈 The number is meant to impress

📖 It sets up her coming contrast

## 🔁 My Vineyard, Which Is Mine, Is Before Me

Back in chapter one, she said she had not kept her own vineyard.

Here, at the very end of the book, that has completely changed.

"My vineyard" is her own way of speaking about herself and her love.

She now stands in full ownership of herself, ready to give her love by choice.

🔁 Recalls her words from chapter one

🌿 My vineyard means her own self

🙋 She now stands in full ownership

📖 Her love is given by her own choice

## 💰 Thou, O Solomon, Must Have A Thousand, And Those That Keep The Fruit Thereof Two Hundred

She matches Solomon's own rent price exactly, a thousand pieces of silver.

She even adds extra for the keepers, two hundred more than the standard share.

The point is not really about money at all.

She gives herself freely, the opposite of being bought or sold like a crop.

💰 She matches Solomon's own price

🎁 She adds extra for the keepers

🚫 The point is not about money

📖 She gives herself freely, never sold

## 🌿 Thou That Dwellest In The Gardens, The Companions Hearken To Thy Voice

"The gardens" have pictured their love throughout this whole book.

"The companions" are friends who have been listening in on their story the entire time.

Even people outside the relationship find joy in hearing this love spoken.

A love this real naturally draws others in to listen.

🌿 Gardens have pictured their love throughout

👥 Companions are friends listening in

😊 Others find joy in this love

📖 Real love naturally draws others in

## 🗣️ Cause Me To Hear It

This is her closing request in the entire book, spoken to him directly.

She does not ask for a gift or a promise.

She simply wants to keep hearing his voice.

The whole book ends on a longing for continued closeness, not a finished ending.

🗣️ Her final request in the book

🎁 Not a gift, just his voice

❤️ She wants continued closeness

📖 The book ends on ongoing longing

## 🔁 Make Haste, My Beloved

This same urgent request already appeared once before, in chapter two.

"Make haste" means come quickly, without delay.

The longing that opened their love story returns to close it.

Their love has grown much deeper over time.

Yet the eagerness for each other never faded.

🔁 Echoes the same line from chapter two

⏩ Make haste means come quickly

🔥 The eagerness never faded

📖 Deep love still runs after the beloved

## 🦌 Be Thou Like To A Roe Or To A Young Hart Upon The Mountains Of Spices

The roe and young hart already pictured him earlier in this book.

Both animals move fast and eagerly toward the one they love.

"Mountains of spices" recalls the "mountain of myrrh" from chapter four, an image for her own self.

The last line of the whole book calls him to keep pursuing her without pause.

Song of Solomon does not end with a quiet close.

It ends with love still running toward love.

🦌 Roe and hart already pictured him

🏔️ Mountains of spices recalls chapter four

🏃 The last line calls him to keep pursuing

📖 The book ends with love still running
`.trim();

export const SONG_OF_SOLOMON_EIGHT_PERSONAL_SECTIONS = parseSongOfSolomonEightRawNotes(SONG_OF_SOLOMON_EIGHT_RAW_NOTES);
