export type ExodusNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusNineteenRawNotes(rawText: string): ExodusNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 19:${startVerse}` : `Exodus 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 19 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_NINETEEN_RAW_NOTES = `# Exodus 19:1-2

# ⛰️ Israel Arrives At Sinai

---

## 📅 In The Third Month ... The Same Day Came They Into The Wilderness Of Sinai

This precise timing places Israel's arrival at Sinai exactly seven weeks after leaving Egypt, later becoming the basis for the Jewish festival of Pentecost, celebrated fifty days after Passover.

📅 This timing later becomes the basis for the festival of Pentecost

---

## ⛰️ Israel Camped Before The Mount

Israel settles directly at the base of the very mountain where Moses first met God at the burning bush back in chapter 3, the journey's true destination finally reached.

⛰️ This is the same mountain from Moses' burning bush encounter in chapter 3

# Exodus 19:3-6

# 🦅 God's Covenant Proposal

---

## 🦅 I Bare You On Eagles' Wings, And Brought You Unto Myself

This vivid image pictures God carrying Israel to safety the way an eagle carries its young, strong, swift, and protective, describing the exodus journey as personal, careful rescue rather than distant management.

🦅 This image pictures God's personal, protective care, like an eagle carrying its young

---

## 💎 Ye Shall Be A Peculiar Treasure Unto Me Above All People

Peculiar here means specially chosen or set apart, not strange or odd in the modern sense. God offers Israel a uniquely valued relationship, conditioned specifically on their obedience and faithfulness to the covenant.

💎 Peculiar means specially chosen, not strange or unusual

⚖️ This uniquely valued status is conditioned on obedience, not automatic

---

## 👑 A Kingdom Of Priests, And An Holy Nation

This describes Israel's larger purpose, functioning collectively like priests who mediate between God and other nations, an identity later echoed in the New Testament describing believers generally.

👑 Israel's role as a "kingdom of priests" gets echoed later in the New Testament

# Exodus 19:7-9

# ✅ The People Agree

---

## ✅ All That The LORD Hath Spoken We Will Do

The people respond with immediate, unified, complete agreement, though this early confident promise will be seriously tested by their actual behavior in the chapters that follow.

✅ This confident promise will be seriously tested by events soon to follow

---

## ☁️ I Come Unto Thee In A Thick Cloud, That The People May Hear ... And Believe Thee For Ever

God explains His purpose for the dramatic, visible display about to happen, establishing Moses' credibility as a genuine mediator permanently, for the whole nation to witness directly.

☁️ This dramatic display is meant to permanently establish Moses' credibility

# Exodus 19:10-13

# 🚧 Boundaries And Preparation

---

## 🧼 Sanctify Them To Day And To Morrow, And Let Them Wash Their Clothes

Sanctify means to set apart as holy through ritual preparation. Washing clothes here serves as a physical, outward symbol of inward spiritual readiness before meeting with God.

🧼 Sanctify means to set apart as holy through ritual preparation

👕 Washing clothes symbolizes physical, outward readiness for this holy encounter

---

## 🚫 Whosoever Toucheth The Mount Shall Be Surely Put To Death

This severe boundary emphasizes the overwhelming holiness and danger of God's direct presence, not casual accessibility, teaching reverence through serious, real consequence.

🚫 This severe boundary teaches reverence for God's overwhelming holiness

---

## 🎺 When The Trumpet Soundeth Long, They Shall Come Up To The Mount

A specific trumpet signal will indicate exactly when it becomes safe to approach, showing this boundary is temporary and purposeful, not a permanent, unexplained restriction.

🎺 A specific signal will indicate when approach becomes safe, showing this is purposeful

# Exodus 19:14-15

# 🧼 Moses Prepares The People

---

## 🧼 Moses Went Down From The Mount Unto The People, And Sanctified The People

Moses personally oversees this preparation process, moving between the mountain and the camp as the essential mediator connecting God's instructions to the people's actual obedience.

🧼 Moses personally oversees preparation, serving as the connecting mediator throughout

---

## 🚫 Come Not At Your Wives

This instruction called for temporary abstinence, part of a broader pattern of ritual purity and focused preparation before this uniquely significant encounter with God.

🚫 This temporary instruction was part of broader ritual purity preparation

# Exodus 19:16-19

# ⚡ God Descends In Fire And Smoke

---

## ⚡ Thunders And Lightnings, And A Thick Cloud Upon The Mount

The theophany, a visible appearance of God, arrives with overwhelming natural intensity, engaging multiple senses at once to communicate the true weight and reality of what's happening.

⚡ A theophany means a visible appearance of God's presence

---

## 🔥 Mount Sinai Was Altogether On A Smoke ... As The Smoke Of A Furnace

The mountain itself appears to be burning, comparing the scene directly to industrial furnace smoke, vivid, tangible imagery a wilderness audience would immediately understand and feel.

🔥 This furnace comparison gives vivid, immediately understandable imagery of God's power

---

## 🌍 The Whole Mount Quaked Greatly

Even the physical earth itself trembles in response to God's presence, nature responding directly and visibly to the Creator's arrival at this specific place.

🌍 The earth itself trembles, nature visibly responding to God's presence

# Exodus 19:20-22

# 👥 Moses Called Up The Mountain

---

## ⛰️ The LORD Called Moses Up To The Top Of The Mount; And Moses Went Up

Moses alone ascends to the very summit, a uniquely close encounter setting him apart from the rest of the camp, who remain at the base under strict boundary.

⛰️ Moses alone ascends to the summit, uniquely set apart from the rest of the camp

---

## ⚠️ Charge The People, Lest They Break Through Unto The LORD To Gaze, And Many Of Them Perish

God expresses real concern that overwhelming curiosity might tempt some people to cross the boundary anyway, risking real, serious consequences if they approach carelessly.

⚠️ God anticipates real danger from curious people ignoring the boundary

---

## 🙏 Let The Priests Also ... Sanctify Themselves, Lest The LORD Break Forth Upon Them

Even the priests, who hold a role of closer access, still require their own careful preparation and sanctification, no one is automatically exempt from proper reverence here.

🙏 Even priests require their own preparation, with no automatic exemption

# Exodus 19:23-25

# 🔄 Moses' Objection And Final Instructions

---

## 🗣️ The People Cannot Come Up To Mount Sinai: For Thou Chargedst Us

Moses respectfully points out that the boundary is already firmly established and well understood, questioning whether the additional warning is even necessary at this point.

🗣️ Moses respectfully questions whether an additional warning is truly needed

---

## 👥 Thou Shalt Come Up, Thou, And Aaron With Thee

God clarifies the specific exception: Moses and Aaron alone receive permission for this closer access, maintaining the strict boundary for everyone else without exception.

👥 Only Moses and Aaron receive this specific, closer access exception

---

## 🔽 Moses Went Down Unto The People, And Spake Unto Them

The chapter closes with Moses once again descending to relay God's final instructions, completing this careful, repeated pattern of preparation before the covenant law is actually delivered in the next chapter.

🔽 This completes the careful preparation pattern before the covenant law arrives next`;

export const EXODUS_NINETEEN_PERSONAL_SECTIONS = parseExodusNineteenRawNotes(EXODUS_NINETEEN_RAW_NOTES);
