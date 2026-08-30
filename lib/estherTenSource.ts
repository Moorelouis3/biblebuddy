export type EstherTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherTenRawNotes(rawText: string): EstherTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 10:${startVerse}` : `Esther 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Esther 10 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_TEN_RAW_NOTES = `# Esther 10:1-2
# 🏛️ The Empire Keeps Its Records
---
## 💰 Laid A Tribute Upon The Land

"Tribute" means a required tax paid to a ruling empire.

This was never a friendly gift.

It was a legal debt owed under threat of imperial power.

Conquered and subject lands across the empire all owed this same tax.

The empire's daily business continued exactly as before, even after Esther's story ended.

🏛️ Tribute means a required tax
👑 It was owed under imperial power
🗺️ Conquered lands owed this same tax
📖 Life in the empire went on unaffected

## 🌊 Upon The Isles Of The Sea

"Isles of the sea" was a Hebrew way of naming distant coastlands.

It did not always mean actual islands.

The phrase often described any far shore beyond the empire's center.

Prophets used this same phrase to describe the edges of the known world.

Even those distant coastal regions answered to Ahasuerus and paid this tax.

🌊 Isles of the sea meant coastlands
🗺️ Not always literal islands
📜 Prophets used this phrase often
📖 Persia's reach touched the world's far edges

## 📜 All The Acts Of His Power And Of His Might

This line sounds like an invitation to read more.

It is actually a standard formula used to close a king's story.

The books of Kings end king after king with this same line.

Esther borrows that same formula for Ahasuerus here.

The narrator steps back from Esther's story to the bigger imperial picture.

📜 This line is a standard formula
👑 Kings used this same closing often
🔁 Esther borrows that formula here
📖 The narrator zooms out to the bigger picture

## 📚 The Book Of The Chronicles Of The Kings Of Media And Persia

This exact record already appeared twice earlier in the book.

It saved Mordecai once already, back in chapter six.

That record revealed his forgotten act of loyalty at just the right moment.

Now his own achievements are written into that same official record.

The record that once nearly overlooked him now guarantees he is remembered forever.

📚 This record was named twice before
🛡️ It once saved Mordecai's life
✍️ Now his achievements are written there
📖 The record that overlooked him now preserves him

# Esther 10:3
# 👑 Mordecai's Legacy Recorded
---
## 👑 Mordecai The Jew Was Next Unto King Ahasuerus

"Next unto the king" meant second in command in the whole empire.

Joseph held this exact same rank centuries earlier in Egypt.

Both men were foreign born Jews who rose to the very top of a pagan empire.

Mordecai began this book sitting in sackcloth at the palace gate.

He ends the book holding the second highest office in the empire.

👑 Next unto the king means second rank
🌾 Joseph held this same rank in Egypt
😢 Mordecai began the book mourning at the gate
📖 He ends it holding the empire's second seat

## ❤️ Great Among The Jews

This is not describing his political rank again.

That rank was already named in the line before.

"Great" here describes how his own people viewed him.

Many powerful officials in history are feared rather than loved.

Mordecai's own people saw him as genuinely great.

Real greatness includes how the people closest to you actually see you.

👑 This greatness is separate from his rank
❤️ It describes how his own people saw him
😨 Many rulers are feared, not loved
📖 True greatness includes how those closest see you

## 🤝 Accepted Of The Multitude Of His Brethren

"Accepted of" is an old way of saying approved by.

"Multitude" means a large group of people.

Here it means the whole Jewish community across the empire.

"Brethren" means fellow Jews rather than blood relatives only.

Mordecai's rise to power was public and could have bred envy instead.

His own people chose to embrace his success rather than resent it.

✅ Accepted of means approved by
👥 Multitude means the whole community
🤝 Brethren means his fellow Jews
📖 His people embraced his rise, not envy

## 💰 Seeking The Wealth Of His People, And Speaking Peace To All His Seed

"Wealth" here does not mean money.

It is an old word for well being and welfare.

Mordecai spent his power pursuing his people's good instead of his own fortune.

"Seed" is the old word for descendants.

It points to generations still to come.

"Speaking peace" meant working for their safety.

It was more than just kind words in conversation.

The last word on Mordecai names exactly what he did with his power.

💰 Wealth here means welfare, not money
👨‍👩‍👧‍👦 Seed means future descendants
🕊️ Speaking peace meant working for safety
📖 Power was aimed at his people's good
`.trim();

export const ESTHER_TEN_PERSONAL_SECTIONS = parseEstherTenRawNotes(ESTHER_TEN_RAW_NOTES);
