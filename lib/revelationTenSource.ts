export type RevelationTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTenRawNotes(rawText: string): RevelationTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 10:${startVerse}` : `Revelation 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Revelation 10 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TEN_RAW_NOTES = `# Revelation 10:1-2
# 🌈 Another Mighty Angel
---
## 👼 Another Mighty Angel Come Down From Heaven

The word another points back to an earlier mighty angel already seen in this book.

Revelation already introduced one in chapter five.

This new angel is clearly a separate and very powerful being.

His size and brightness mark him as no ordinary messenger.

Something enormous is about to happen on earth.

John is watching the next great scene begin.

👼 Another points back to an earlier angel

📜 Revelation already showed one in chapter five

💪 This angel is separate and very powerful

📖 Something enormous is about to begin

## ☁️ Clothed With A Cloud, And A Rainbow Was Upon His Head

To be clothed with a cloud means wrapped in a sign of God's own presence.

Clouds appear again and again when God draws near in the Old Testament.

A rainbow calls back to the sign God gave Noah after the flood.

That same rainbow already circled God's throne back in chapter four.

This angel carries heaven's own marks of glory and promise.

☁️ A cloud pictures God's own presence

🌧️ Clouds appear often when God draws near

🌈 A rainbow recalls the sign given to Noah

📖 This angel carries heaven's marks of glory

## ☀️ His Face Was As It Were The Sun, And His Feet As Pillars Of Fire

A face like the sun means it is too bright to look at directly.

Feet like fire pillars look solid, heavy, and impossible to ignore.

Jesus appeared with this same blazing brightness back in chapter one.

This angel reflects the very glory of the one who sent him.

Whatever this angel carries next deserves full attention.

☀️ A face like the sun is too bright

🔥 Feet like fire pillars look solid and bright

🔁 Jesus appeared this same way in chapter one

📖 This angel reflects the glory of God

## 📘 He Had In His Hand A Little Book Open

The little book is smaller than the sealed scroll from chapter five.

That larger scroll held the full plan of coming judgment.

This smaller book carries a different and more personal message.

It is already open, not sealed shut like the first one.

John is about to receive something meant for him directly.

📘 Smaller than the chapter five scroll

🔓 The larger scroll held the full judgment plan

📬 This book carries a different personal message

➡️ It is already open, not sealed

# Revelation 10:3-4
# ⚡ Seven Thunders Sealed
---
## 🦁 Cried With A Loud Voice, As When A Lion Roareth

The angel's voice was so loud it is compared to a roaring lion.

A lion's roar carries across great distances and demands attention.

This cry was meant to be heard by everyone nearby.

Seven thunders answered back the instant this cry rang out.

Heaven itself was responding to this mighty voice.

🦁 The voice is compared to a roaring lion

📢 A lion's roar carries across great distances

⚡ Seven thunders answered back immediately

📖 Heaven itself was responding to this voice

## ❓ Seven Thunders Uttered Their Voices

The seven thunders are never named or explained anywhere in this book.

They speak with their own voices, as if delivering a real message.

The number seven ties them to the other complete sets in Revelation.

Seven seals, seven trumpets, and seven bowls already shape this entire book.

Something important was said here, and readers are never told what.

❓ The seven thunders are never explained

🗣️ They speak with their own voices

🔢 Seven ties them to Revelation's other sets

📖 Something was said that readers never learn

## ✍️ I Was About To Write

John served as the one recording everything he saw and heard in this book.

He reached for his pen the moment the thunders finished speaking.

Writing down every detail had been John's task since chapter one.

This time a voice from heaven stopped him before he could begin.

Not everything revealed to John was meant to reach the reader.

✍️ John normally records everything he sees

📝 He reached to write the instant thunders spoke

🛑 A voice from heaven stopped him this time

📖 Not everything shown to John reached the reader

## 🔒 Seal Up Those Things Which The Seven Thunders Uttered, And Write Them Not

To seal up something means to lock it away and keep it hidden.

Daniel was once told to seal up a prophecy until a future time.

Here the command goes even further than Daniel's.

John is told to never write these words down at all.

God keeps some things hidden even from his own prophets.

🔒 Seal up means locking something away hidden

📜 Daniel once sealed a prophecy for later

🚫 This command goes further than Daniel's

📖 God keeps some things hidden even from prophets

# Revelation 10:5-7
# ⏳ Time No Longer
---
## 🙌 The Angel Lifted Up His Hand To Heaven

Raising a hand toward heaven was the normal posture for taking a solemn oath.

Old Testament figures used this same gesture when swearing before God.

The angel is not making a casual promise here.

He is about to swear something with complete certainty.

What comes next is guaranteed, not just predicted.

🙌 Raising a hand was an oath gesture

📜 Old Testament figures swore this same way

⚖️ This is not a casual promise

📖 What follows is guaranteed, not predicted

## 🤝 Sware By Him That Liveth For Ever And Ever

To swear means binding oneself to a promise by calling on a higher authority.

The angel swears by God himself, the one who lives forever.

He also names God as the creator of heaven, earth, and sea.

Naming God as creator proves he has full authority to keep this promise.

The one making this promise is also the one who made everything.

🤝 To swear means binding a promise

⏰ The angel swears by the eternal God

🌍 God is named as creator of everything

📖 The one promising also made everything

## ⏳ That There Should Be Time No Longer

This does not mean that time itself will simply stop existing.

It means there will be no more delay before God's plan finishes.

The waiting that believers have endured is about to end.

Every remaining promise is about to be fulfilled without further delay.

The long pause in God's plan is finally over.

⏳ This is not time itself ending

⏭️ It means no more delay remains

⏱️ The long wait is about to end

📖 God's plan finishes without more postponement

## 🔐 The Mystery Of God Should Be Finished

A mystery in scripture is a truth once hidden but now about to be revealed.

God's mystery here points to his complete plan for the world.

Paul often used this same word for Christ and the gospel.

Once this mystery finishes, nothing about God's plan remains hidden.

What God has been working toward is finally coming into full view.

🔐 Mystery means a truth once hidden

📋 This mystery is God's complete plan

✉️ Paul used this same word for Christ

📖 God's plan is coming into full view

# Revelation 10:8-11
# 📖 Eat The Little Book
---
## 🗣️ Go And Take The Little Book

This command comes from the same voice John heard back in verse four.

John is told to go directly to the angel himself.

He must ask for the book instead of waiting for it.

Taking this book is an active step, not something simply handed to him.

God is inviting John to participate, not just observe.

🗣️ The same voice from verse four speaks

🚶 John must go directly to the angel

🙏 He asks for the book himself

📖 God invites John to participate, not just watch

## 🍯 It Shall Make Thy Belly Bitter, But It Shall Be In Thy Mouth Sweet As Honey

Sweet in the mouth pictures the joy of receiving God's own word.

Bitter in the stomach pictures the hard truth that word often carries.

Ezekiel was given an almost identical scroll to eat centuries earlier.

Good news and hard news often arrive wrapped inside the same message.

God's word can taste wonderful and still cost something painful.

🍯 Sweet pictures the joy of God's word

😣 Bitter pictures the hard truth inside it

📜 Ezekiel ate a nearly identical scroll before

📖 God's word can be wonderful and painful

## ✅ As Soon As I Had Eaten It, My Belly Was Bitter

John experiences exactly what the angel already promised would happen.

The sweetness comes first, the way receiving a message from God should feel.

Then the weight of what it means settles in and turns heavy.

This book likely contains hard news about judgment still to come.

Knowing God's plan can still be a painful thing to carry.

✅ John experiences exactly what was promised

🍯 Sweetness comes first, like receiving God's word

⚖️ The weight of the message settles in after

📖 Knowing God's plan can still be painful

## 🌍 Thou Must Prophesy Again Before Many Peoples, And Nations, And Tongues, And Kings

To prophesy means to speak out God's message to others.

The word again shows John had already been prophesying before this moment.

This new assignment reaches far beyond Israel alone.

Peoples, nations, tongues, and kings cover the entire world, not one nation.

John's message was always meant to reach every corner of the earth.

🗣️ Prophesy means speaking out God's message

🔁 Again shows John prophesied before this

🌍 This assignment reaches far beyond Israel

📖 The message was meant for the whole earth
`.trim();

export const REVELATION_TEN_PERSONAL_SECTIONS = parseRevelationTenRawNotes(REVELATION_TEN_RAW_NOTES);
