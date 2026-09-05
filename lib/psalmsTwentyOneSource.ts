export type PsalmsTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyOneRawNotes(rawText: string): PsalmsTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 21:${startVerse}` : `Psalms 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 21 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_ONE_RAW_NOTES = `# Psalms 21:1-4
# 🙌 The King's Prayer Is Answered
---
## 💪 The King Shall Joy In Thy Strength

The king here is likely David himself, writing about his own reign.

His joy does not come from his own power or army.

It comes from strength that belongs to God alone.

Psalms twenty prayed for the king's victory before a battle.

Many read this psalm as the victory song that followed.

💪 The king is likely David
🙏 His joy is not his own strength
🔁 Psalms twenty prayed for this same victory
📖 This psalm sings after that victory

## 🎉 In Thy Salvation How Greatly Shall He Rejoice

"Salvation" in this verse does not point toward eternal life in heaven.

It means being rescued from defeat in battle.

The king already knows what that rescue feels like.

His joy is not quiet or reserved.

The verse pictures him rejoicing loudly and openly.

🎉 Salvation here means rescue in battle
🚫 Not a picture of eternal life
😄 His joy is loud, not quiet
📖 Real rescue produces real celebration

## 🙏 Thou Hast Given Him His Heart's Desire

"Heart's desire" means the deepest longing a person carries, not a passing wish.

God has already granted this specific king exactly what he most wanted.

The next line makes the promise even stronger.

Not one request from his lips was left unanswered.

🙏 Heart's desire means his deepest longing
✅ God already granted what he wanted
🗣️ His lips asked, God answered
📖 Not one request was left out

## ⏸️ Selah

Selah appears again here, just as it did in Psalms twenty.

It most likely marked a pause in the singing.

The blessing just named deserves that pause.

God has already answered before the king even finished asking.

⏸️ Selah likely marked a pause
🎵 It gave the singers a breath
🙏 The blessing already named deserves it
📖 Answered prayer is worth pausing over

## 👑 Thou Preventest Him With The Blessings Of Goodness

"Preventest" is an old word that does not mean stopping something.

In this older English, it means going before someone or arriving first.

God arrived with blessings before the king even had to ask for them.

Grace here comes ahead of the request, not after it.

👑 Preventest means going before, not stopping
🎁 Blessings arrived before he even asked
⏰ Grace came first, not second
📖 God moves ahead of the request

## 🏆 Thou Settest A Crown Of Pure Gold On His Head

A crown of pure gold marked a king as set apart from everyone else.

Gold was the most valuable metal available in the ancient world.

This was not a gift the king earned through conquest alone.

The text credits God with setting the crown there Himself.

🏆 A gold crown marked royal status
💰 Gold was the most valuable metal
🙅 Not something the king earned alone
📖 God Himself set the crown there

## 🙌 He Asked Life Of Thee, And Thou Gavest It Him

This request for life likely points to a real danger the king faced.

Kings in this era often risked death in battle or through betrayal.

Asking for life meant asking simply to survive another day.

God did not just spare him, He answered fully.

🙌 Asking for life meant asking to survive
⚔️ Kings faced real danger in this era
✅ God did not just spare him
📖 God answered the request fully

## ♾️ Even Length Of Days For Ever And Ever

No mortal king actually reigns forever.

Even the best king's reign eventually ends.

This phrase reaches past David's own lifetime toward something greater.

Many readers see this line pointing toward the eternal kingdom of Christ.

A human throne could never fulfill words this large on its own.

♾️ No mortal king reigns forever
👑 This phrase reaches past David's life
✝️ Many see this pointing toward Christ
📖 Only an eternal King fits this promise

# Psalms 21:5-7
# 👑 Glory, Honour, And Unshaken Trust
---
## ✨ His Glory Is Great In Thy Salvation

"Glory" here means visible weight and honor, not just a feeling of pride.

The king's greatness is tied directly to what God did for him.

He did not build this glory through his own name or army.

God's saving action is the actual source of his greatness.

✨ Glory means visible weight and honor
🔗 His greatness ties to God's action
🚫 Not built by his own name
📖 God's saving act is the source

## 🎖️ Honour And Majesty Hast Thou Laid Upon Him

"Honour" and "majesty" were words reserved for kings and for God Himself.

These were not qualities the king manufactured on his own.

The verse pictures God physically placing them onto him, like the crown earlier.

Royal dignity here is a gift laid on, not a title seized.

🎖️ Honour and majesty were royal words
🙅 Not manufactured by the king himself
👐 Pictured as gifts laid onto him
📖 Dignity is given, never seized

## 🙌 Thou Hast Made Him Most Blessed For Ever

"Most blessed" describes the fullest possible measure of God's favor.

This is not a partial or temporary blessing.

The phrase for ever echoes the same promise already made back in verse four.

Repeating that promise here shows how completely God intends to keep it.

🙌 Most blessed means fullest favor
⏳ Not partial or temporary at all
🔁 For ever echoes verse four's promise
📖 God fully intends to keep it

## 😊 Made Him Exceeding Glad With Thy Countenance

"Countenance" means the look on a face, especially what that look reveals.

Here it means God's own face turned toward him in favor.

A parent's smile can make a child's whole day.

God's smile here fills the king with real, deep gladness.

😊 Countenance means the look on a face
🙂 Here it is God's own face
👶 Like a parent's smile to a child
📖 God's favor brings deep gladness

## 🙏 The King Trusteth In The LORD

Trust here means leaning fully on God instead of on human strength.

The king could have leaned on his army, his gold, or his own name.

Instead the text says plainly where his confidence actually comes from.

That choice is what keeps him steady through danger.

🙏 Trust means leaning on God fully
🚫 Not leaning on army or gold
🎯 His confidence points to one source
📖 That choice keeps him steady

## 🕊️ Through The Mercy Of The Most High

"The most High" is a title for God that stresses His position above every other power.

Mercy here means God's kindness toward someone who does not earn it.

The king's security rests on that mercy, not on his own record.

Even a king needs grace he cannot purchase for himself.

🕊️ The most High stresses God's position above all
💗 Mercy means kindness that is not earned
🚫 Not resting on his own record
📖 Even kings need grace they cannot buy

## 🛡️ He Shall Not Be Moved

"Not be moved" is an old way of describing something completely stable and secure.

Think of a tree with roots so deep no storm can knock it down.

The king's stability does not come from his own strength.

It comes from resting on God's mercy just named in the line before.

🛡️ Not moved means stable and secure
🌳 Like a tree with deep roots
🚫 Not stable from his own strength
📖 Stability rests on God's mercy

# Psalms 21:8-10
# 🔥 No Enemy Escapes His Reach
---
## ✋ Thine Hand Shall Find Out All Thine Enemies

The psalm shifts here from talking about the king to talking directly to him.

Verses one through seven describe God's gifts to "him."

Starting here, the text speaks straight to "thee," the king himself.

"Find out" means to track down and reach, not simply to notice.

✋ The psalm now speaks to the king directly
🔀 Verses one through seven used "him"
🎯 Find out means track down and reach
📖 No enemy is out of reach

## 💪 Thy Right Hand Shall Find Out Those That Hate Thee

This line repeats the idea from the line just before it.

Hebrew poetry often says one truth twice, using slightly different words.

Saying the same thing twice this way makes the point feel certain.

"Right hand" pictures God's own strength acting for the king.

💪 This repeats the line just before it
📜 Hebrew poetry often repeats ideas twice
✅ Repetition here signals certainty
📖 Right hand pictures God's own strength

## 🔥 Thou Shalt Make Them As A Fiery Oven

Ancient ovens were often small clay pits built into the ground.

They were heated until the walls themselves glowed with fire.

Nothing placed inside one of those ovens escaped its heat.

The verse pictures the king's enemies facing that same inescapable judgment.

This is not a small fire that can be escaped.

🔥 Ancient ovens were heated clay pits
🚫 Nothing inside escaped the heat
⚖️ Enemies face total, inescapable judgment
📖 This fire cannot simply be escaped

## 😈 The LORD Shall Swallow Them Up In His Wrath

"Swallow up" is a strong old idiom for total, complete destruction.

It does not describe a partial defeat or a temporary setback.

The image is of something disappearing entirely, leaving nothing behind.

Fire finishes the same picture in the very next phrase.

😈 Swallow up means total destruction
🚫 Not a partial or temporary defeat
🫥 The image shows nothing left behind
📖 Fire finishes the same picture

## 👶 Their Fruit Shalt Thou Destroy From The Earth

"Fruit" here is a word picture for children and future descendants.

Destroying an enemy's fruit meant ending his entire family line.

In this culture, having no descendants meant a person's name simply disappeared.

This judgment reaches far beyond a single battle.

👶 Fruit means children and descendants
🚫 It ends an entire family line
🫥 No descendants meant a name disappeared
📖 This judgment reaches beyond one battle

## 🌱 Their Seed From Among The Children Of Men

"Seed" repeats the same idea as "fruit" in the line just before it.

Hebrew poetry often says one true thing twice, using two different pictures.

Here the pictures are a plant's fruit and a plant's seed.

Both point to the same total ending of the family line.

🌱 Seed repeats the same idea as fruit
📜 Hebrew poetry often uses two pictures
🌾 Fruit and seed are both plant images
📖 Both point to the same total ending

# Psalms 21:11-13
# 🏹 Failed Plots And Rising Praise
---
## 😈 For They Intended Evil Against Thee

"Intended" means the enemies planned this on purpose, not by accident.

Their hostility was not a spur of the moment mistake.

This was a deliberate, thought out plan against the king.

Naming it as intentional makes the coming judgment make more sense.

😈 Intended means done on purpose
🚫 Not an accidental mistake
📋 This was a deliberate plan
📖 Naming intent explains the judgment

## 🗡️ They Imagined A Mischievous Device, Which They Are Not Able To Perform

"Device" here means a scheme or a plot, not a machine or a tool.

The enemies worked out a careful plan meant to harm the king.

The verse ends by saying plainly that the plan will never actually happen.

God stops it before it can even begin.

🗡️ Device means a scheme or a plot
📝 The enemies worked out a careful plan
🚫 The plan will never actually happen
📖 God stops it before it begins

## 🏃 Therefore Shalt Thou Make Them Turn Their Back

Turning your back to an enemy in battle meant retreating in open defeat.

In this culture, that was considered a deep public shame.

No warrior wanted to be remembered running away from a fight.

God is the one who forces that shameful retreat here.

🏃 Turning the back meant open defeat
😳 That retreat was a public shame
🚫 No warrior wanted to be seen fleeing
📖 God forces the retreat Himself

## 🏹 When Thou Shalt Make Ready Thine Arrows Upon Thy Strings

An archer in this era pulled the arrow back against the bowstring before firing.

"Make ready" pictures that exact moment right before the shot is released.

The arrows are aimed against the face of them.

That means the very enemies who were just fleeing.

Hitting a fleeing man in the face pictures total, overwhelming defeat.

🏹 An archer pulls the string back first
🏃 Aimed at enemies already fleeing
🎯 A face shot pictures total defeat
📖 There is no narrow escape here

## 🎉 Be Thou Exalted, LORD, In Thine Own Strength

This final section circles back to the very first line of the psalm.

The psalm opened with the king rejoicing in God's strength.

It now closes by asking God Himself to be lifted high in that same strength.

The whole psalm forms a circle, starting and ending on the same note.

🎉 This circles back to verse one
💪 Both verses point to God's strength
🔁 The psalm forms a full circle
📖 Praise ends exactly where it began

## 🎶 So Will We Sing And Praise Thy Power

The voice shifts here from the king alone to the whole congregation, "we."

Every earlier verse in this psalm spoke about or to the king himself.

The final line hands the response over to everyone watching and listening.

One man's victory becomes a song the whole nation gets to sing.

🎶 The voice shifts to the whole nation
👑 Earlier verses focused on the king alone
🎤 Everyone gets to join the response
📖 One victory becomes everyone's song
`.trim();

export const PSALMS_TWENTY_ONE_PERSONAL_SECTIONS = parsePsalmsTwentyOneRawNotes(PSALMS_TWENTY_ONE_RAW_NOTES);
