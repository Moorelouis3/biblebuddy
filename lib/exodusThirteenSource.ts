export type ExodusThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirteenRawNotes(rawText: string): ExodusThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 13:${startVerse}` : `Exodus 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 13 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTEEN_RAW_NOTES = `# Exodus 13:1-2

# 👶 Sanctify The Firstborn

---

## ✨ Sanctify Unto Me All The Firstborn ... It Is Mine

Sanctify means to set apart as holy for a special purpose. God claims every firstborn male, both human and animal, as belonging specifically to Him, directly connected to how He spared Israel's firstborn during the final plague.

✨ Sanctify means to set apart as holy for a special purpose

🩸 This directly connects to God sparing Israel's firstborn during the Passover

---

## 👶 Whatsoever Openeth The Womb

This phrase specifically means the first offspring born to any mother, human or animal, marking firstborn status clearly and precisely, not simply the oldest child in a household overall.

👶 This precisely means the very first birth from any mother, human or animal

# Exodus 13:3-7

# 🍞 Remember This Day

---

## 🏠 Out Of The House Of Bondage

Bondage means slavery. This phrase becomes a standard, repeated description throughout the rest of the Old Testament for Egypt, Israel's identity is now permanently shaped by having once been slaves there.

🏠 Bondage means slavery, and this phrase becomes Egypt's standard description going forward

---

## 📅 This Day Came Ye Out In The Month Abib

Abib was the original Hebrew name for the first month of the year, later called Nisan. This specific month becomes permanently tied to Israel's national memory of freedom.

📅 Abib was the original name for the first month, later called Nisan

---

## 🍞 Seven Days Thou Shalt Eat Unleavened Bread

This repeats and confirms the unleavened bread command from chapter 12, cementing it as the practical, physical reminder woven into an entire week each year, not just a single meal.

🍞 This repeats and confirms the unleavened bread command from chapter 12

# Exodus 13:8-10

# 👨‍👦 Teaching Your Son

---

## 👨‍👦 Thou Shalt Shew Thy Son In That Day

Shew is an old spelling of "show." Parents are directly commanded to actively explain these events to their children, not simply hope they figure it out or absorb it passively over time.

👨‍👦 Shew means show, and parents are commanded to actively explain, not assume

---

## ✋ A Sign Unto Thee Upon Thine Hand, And For A Memorial Between Thine Eyes

This poetic language describes keeping God's actions constantly in mind and visible in daily life, later understood literally by some Jewish traditions as wearing small boxes containing Scripture, called phylacteries, on the hand and forehead.

✋ This describes keeping God's actions constantly visible in daily life

📖 Some later Jewish traditions took this literally, wearing small Scripture boxes

# Exodus 13:11-13

# 🐑 Redeeming The Firstborn

---

## 🐑 Every Firstling That Cometh Of A Beast ... The Males Shall Be The LORD'S

Firstling means the first offspring born to an animal. Male firstborn animals specifically belong to God, connected directly to His claim over the firstborn established earlier in this same chapter.

🐑 Firstling means the first offspring born to an animal

---

## 🔄 Every Firstling Of An Ass Thou Shalt Redeem With A Lamb

Redeem means to buy back or substitute something else in its place. Donkeys weren't considered acceptable sacrificial animals, so a lamb takes its place instead, or the donkey's neck is broken if not redeemed.

🔄 Redeem means to buy back, here by substituting one thing for another

---

## 👶 All The Firstborn Of Man Among Thy Children Shalt Thou Redeem

Human firstborn sons are never sacrificed. Instead, they're symbolically redeemed, a practice continued later through the tribe of Levi serving in the place of every family's firstborn son.

👶 Human firstborn sons are always redeemed, never sacrificed

📖 The tribe of Levi later serves as a substitute for every family's firstborn

# Exodus 13:14-16

# 👨‍👦 Teaching Continues

---

## ❓ When Thy Son Asketh Thee In Time To Come, Saying, What Is This?

This repeats the same built-in teaching pattern from chapter 12, ensuring the story of the exodus and the reason for firstborn redemption gets explained accurately across every future generation.

❓ This repeats the same built-in teaching pattern established in chapter 12

---

## 💀 The LORD Slew All The Firstborn In The Land Of Egypt

Parents are instructed to tell their children plainly and honestly about the tenth plague itself, not softening or hiding the severity of what actually happened in Egypt.

💀 Parents are told to explain the tenth plague honestly, not soften it

---

## ✋ A Token Upon Thine Hand, And For Frontlets Between Thine Eyes

Frontlets means ornaments worn on the forehead. This repeats the same symbolic language from earlier in the chapter, reinforcing how deeply these events are meant to shape daily identity and memory.

✋ Frontlets means ornaments worn on the forehead, repeating the earlier imagery

# Exodus 13:17-18

# 🗺️ God Chooses A Different Path

---

## 🛣️ God Led Them Not Through The Way Of The Land Of The Philistines, Although That Was Near

The shortest route to Canaan ran directly through Philistine territory, but God deliberately avoids it, choosing a longer, less direct path instead for a specific, protective reason.

🛣️ God deliberately avoids the shortest, most direct route to Canaan

---

## ⚔️ Lest Peradventure The People Repent When They See War, And They Return To Egypt

Peradventure means perhaps. God anticipates that facing armed conflict immediately might discourage this newly freed people so badly they'd want to return to slavery rather than face war.

⚔️ Peradventure means perhaps

😨 God protects the people from an immediate test they aren't yet ready to face

---

## 🌊 God Led The People About, Through The Way Of The Wilderness Of The Red Sea

Instead, God guides Israel on a longer route through the wilderness toward the Red Sea, a path setting up the dramatic crossing that happens just two chapters later.

🌊 This longer wilderness route sets up the dramatic Red Sea crossing soon to come

# Exodus 13:19

# ⚰️ Joseph's Bones Are Carried Out

---

## ⚰️ Moses Took The Bones Of Joseph With Him ... God Will Surely Visit You

This directly fulfills the oath Joseph required from his family back at the very end of Genesis, over three hundred years earlier, that his bones would eventually be carried out of Egypt to the promised land.

⚰️ This fulfills Joseph's oath from the very end of Genesis, centuries earlier

📖 A promise spoken generations before is finally being kept in this exact moment

# Exodus 13:20-22

# ☁️ The Pillar Of Cloud And Fire

---

## ☁️ The LORD Went Before Them By Day In A Pillar Of A Cloud

God provides a visible, physical sign of His presence and guidance, a cloud formation leading the people during daylight hours, an unmistakable, ever-present marker of direction.

☁️ God provides a visible cloud formation to physically guide the people by day

---

## 🔥 By Night In A Pillar Of Fire, To Give Them Light

At night, the same guiding presence becomes visible as fire instead, providing both direction and light through the darkness, meeting the people's need at every hour, day and night alike.

🔥 The same guidance appears as fire at night, providing both direction and light

---

## 🚫 He Took Not Away The Pillar ... From Before The People

This guiding presence remains constant and unbroken, emphasizing God's continuous, reliable presence with Israel throughout their entire journey, never once disappearing when needed most.

🚫 God's guiding presence remains constant, never disappearing throughout the journey`;

export const EXODUS_THIRTEEN_PERSONAL_SECTIONS = parseExodusThirteenRawNotes(EXODUS_THIRTEEN_RAW_NOTES);
