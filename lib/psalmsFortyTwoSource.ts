export type PsalmsFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyTwoRawNotes(rawText: string): PsalmsFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 42:${startVerse}` : `Psalms 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 42 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_TWO_RAW_NOTES = `# Psalms 42:1-2
# 🦌 Thirsting For The Living God
---
## 🦌 As The Hart Panteth After The Water Brooks

A hart is a deer, specifically a full grown male deer.

Panteth pictures heavy, urgent breathing after a hard chase.

The dry hill country of Judea often left streams and brooks completely dry.

A deer that cannot find water there grows desperate fast.

The psalmist compares that same desperate thirst to his hunger for God.

🦌 Hart means a full grown deer

💦 Panteth means desperate heavy breathing

🏜️ Judean hills often had dry streambeds

📖 That desperate thirst pictures hunger for God

## 🙏 My Soul Thirsteth For God, For The Living God

This thirst is not physical thirst.

It describes a deep hunger for God's presence.

The title living God sets Israel's God apart from other gods.

Ancient idols were only carved wood or stone.

They could not move, speak, or act.

The living God can hear, answer, and act.

🙏 Thirst here means hunger for God

🗿 Idols were only carved wood or stone

🤐 Idols could not move or speak

📖 The living God hears, answers, and acts

## 🕍 When Shall I Come And Appear Before God

This question points to Israel's three yearly pilgrimage feasts.

Worshippers traveled to the temple in Jerusalem to appear before God there.

The psalmist is likely far from Jerusalem when he writes this.

He is not asking a calendar question.

He is longing to stand in God's presence again.

🕍 Israel held three yearly pilgrimage feasts

🚶 Worshippers traveled to the temple in Jerusalem

😔 The psalmist writes while far from home

📖 He longs to stand before God again

# Psalms 42:3-4
# 😢 Tears By Day And Night
---
## 🍞 My Tears Have Been My Meat Day And Night

In the King James Bible, meat simply means food.

Tears have replaced food as what fills his days.

Day and night stresses how constant this grief has become.

This is not one bad afternoon.

It is grief that never seems to let up.

🍞 Meat here simply means food

😢 Tears have replaced actual food

⏳ Day and night means constant grief

➡️ This grief shows no sign of stopping

## 🗣️ Where Is Thy God

This question is not sincere curiosity.

It is a taunt aimed at the psalmist's faith.

His enemies use his suffering as proof that God has abandoned him.

The question is designed to wound, not to inform.

It will return again later in this same psalm.

🗣️ This question is really a taunt

🎯 Enemies use his suffering as proof

💔 The words are meant to wound

📖 The same taunt returns later in the psalm

## 💧 I Pour Out My Soul In Me

To pour out the soul means to let every feeling spill out at once.

It is not a calm, controlled prayer.

It is raw, unfiltered honesty before God.

David holds nothing back here.

This kind of honesty is itself an act of trust.

💧 Pour out the soul means total honesty

🙊 This is not a calm prayer

🔓 David holds nothing back here

📖 Honest grief can be an act of trust

## 📅 With A Multitude That Kept Holyday

A holyday here means an old religious feast day, not a modern holiday.

The psalmist remembers walking to the temple with a joyful crowd.

That crowd sang and celebrated together on the way.

He once led that same procession himself.

Now he can only remember it from far away.

📅 Holyday means an old religious feast day

🎶 The crowd sang and celebrated together

🚶 He once led that same procession

➡️ Now the memory only deepens his longing

# Psalms 42:5
# 💔 Why Art Thou Cast Down
---
## 🗣️ Why Art Thou Cast Down, O My Soul

David is speaking directly to his own soul here.

He is questioning his own despair out loud.

This shows a mind actively working through grief instead of drowning in it.

Naming a feeling out loud can loosen its grip.

This verse repeats again at the very end of the psalm.

🗣️ David speaks directly to his soul

❓ He questions his own despair

🧠 Naming grief can loosen its grip

➡️ This exact line returns at the end

## 🌪️ Why Art Thou Disquieted In Me

Disquieted means stirred up, restless, and unsettled inside.

David is naming an inward turmoil, not outward danger.

This word appears elsewhere in the Psalms during seasons of deep distress.

He is not hiding what he feels.

He is examining it instead.

🌪️ Disquieted means restless and unsettled

🎯 The trouble here is inward, not outward

🔍 David examines his feelings instead of hiding them

📖 Naming trouble is the first step to hope

## 🎯 Hope Thou In God

Biblical hope is not wishful thinking.

It means placing confident trust in God's character.

David commands his own soul to do this.

Hope here is a choice, not just a feeling.

He chooses trust before his circumstances actually change.

🎯 Hope here means confident trust

🗣️ David commands his own soul

✅ Hope is a choice, not only a feeling

📖 Trust comes before circumstances change

## 🙂 I Shall Yet Praise Him For The Help Of His Countenance

Countenance means the look on someone's face, especially their expression toward you.

The help of his countenance points to God's smile of favor and comfort.

David does not feel that comfort yet in this exact moment.

He still commits to praising God for it in advance.

Faith here reaches forward before feelings catch up.

🙂 Countenance means the look on a face

😊 God's countenance pictures his favor and comfort

⏳ David does not feel it yet

📖 He praises God in advance of feeling it

# Psalms 42:6-8
# 🌊 Deep Calls To Deep
---
## 🏔️ From The Land Of Jordan, And Of The Hermonites, From The Hill Mizar

These are real places far north of Jerusalem, near Mount Hermon.

The Jordan River begins in that same northern region.

Mizar was likely a smaller peak near Hermon.

Its exact location is not fully known today.

Being this far from the temple made David's longing physical, not just emotional.

🏔️ Hermon and Jordan sit far north

📍 Mizar was likely a smaller nearby peak

🗺️ Its exact location remains uncertain today

📖 Real distance made his longing for God physical

## 💦 Deep Calleth Unto Deep At The Noise Of Thy Waterspouts

Waterspouts here likely describes waterfalls or rushing mountain streams.

Deep calling to deep pictures one crashing wave answered by another.

The image describes overwhelming trouble piling on top of more trouble.

Nature's roar becomes a picture of his own inner chaos.

The outer world mirrors what David feels inside.

💦 Waterspouts likely means rushing waterfalls

🌊 Deep calling to deep means overwhelming trouble

🔁 One wave of trouble follows another

➡️ Nature's roar mirrors his inner chaos

## 🌊 All Thy Waves And Thy Billows Are Gone Over Me

Billows means large, heavy ocean waves.

This is the language of nearly drowning.

David feels completely submerged by his troubles.

He is not exaggerating for effect here.

He is describing what total overwhelm actually feels like.

🌊 Billows means large heavy waves

🏊 The image pictures nearly drowning

😰 David feels completely submerged

📖 This describes total emotional overwhelm

## ❤️ The LORD Will Command His Lovingkindness In The Day Time

Lovingkindness translates a rich Hebrew word, hesed.

Hesed describes God's loyal, covenant keeping love.

To command it means God actively directs that love toward someone.

This is not a passive feeling on God's part.

It is a deliberate act of covenant loyalty.

❤️ Lovingkindness translates the Hebrew word hesed

🤝 Hesed means loyal, covenant keeping love

🎯 God actively directs this love

📖 God's love here is a deliberate act

## 🌙 In The Night His Song Shall Be With Me

Night in this psalm has already meant fear and isolation.

Here it becomes the setting for an unexpected song.

This song is aimed at the God of his life, not at the darkness itself.

Praise in this verse does not wait for daylight or comfort.

It rises even in the middle of the hardest hours.

🌙 Night earlier meant fear and isolation

🎵 Here night becomes the setting for song

🙏 The song is aimed at God himself

➡️ Praise does not wait for daylight

# Psalms 42:9-10
# ⚔️ Enemies And Honest Lament
---
## 🪨 I Will Say Unto God My Rock

Calling God a rock pictures something solid, stable, and unmovable.

Ancient armies often defended their positions from high rocky ground.

Naming God this way is itself an act of trust.

David says this even while still in real pain.

Trust and honest pain can exist together in the same verse.

🪨 Rock pictures something solid and unmovable

🛡️ Ancient armies defended high rocky ground

🙏 Naming God this way shows real trust

📖 Trust and pain can exist together

## 😢 Why Hast Thou Forgotten Me

This is honest lament, not a statement of fact.

David does not believe God has truly forgotten him.

He is describing exactly how his situation currently feels.

Scripture allows this kind of raw, honest question.

Feelings can be spoken to God even when they are not fully accurate.

😢 This is honest lament, not fact

🙅 David does not truly believe this

🎭 He describes how the moment feels

📖 Honest feelings can be spoken to God

## ⚔️ As With A Sword In My Bones

This idiom pictures physical pain caused entirely by words.

The mockery of his enemies feels as sharp as a blade.

Bones represent the deepest, most sensitive part of a person.

Insults here are not just annoying, they wound like real injuries.

Grief this deep can register in the body itself.

⚔️ This idiom pictures pain from words

🎯 Mockery feels as sharp as a blade

🦴 Bones represent his deepest, most sensitive part

📖 Emotional pain can feel physical

## 🔁 They Say Daily Unto Me, Where Is Thy God

This same taunt already appeared back in verse three.

There it was described as continual, now it is daily.

The mockery has settled into a steady, repeated pattern.

Constant insult can wear down even strong faith.

David names the pattern instead of pretending it does not affect him.

🔁 This taunt already appeared in verse three

📆 Continual has now become daily

⏳ The mockery has become a steady pattern

➡️ Constant insult can wear down real faith

# Psalms 42:11
# 🎵 The Refrain Returns
---
## 🔁 Disquieted Within Me

This exact question already appeared in verse five.

There the wording was disquieted in me.

Here it shifts slightly to disquieted within me.

The small change deepens the sense of an inward struggle.

Repeating a line with a slight change is a common feature of Hebrew poetry.

🔁 This question already appeared in verse five

✏️ The wording shifts slightly here

🎯 Within deepens the sense of inward struggle

📖 Hebrew poetry often repeats lines with small changes

## 🙌 Who Is The Health Of My Countenance, And My God

Verse five ended with the help of his countenance.

This verse ends with the health of my countenance, and my God.

The wording grows more personal and more confident here.

David is no longer just describing God from a distance.

He now claims God directly as his own.

🔄 The wording changes from verse five

💪 Health replaces help in this closing line

🙌 The words grow more personal and confident

📖 David claims God as his own
`.trim();

export const PSALMS_FORTY_TWO_PERSONAL_SECTIONS = parsePsalmsFortyTwoRawNotes(PSALMS_FORTY_TWO_RAW_NOTES);
