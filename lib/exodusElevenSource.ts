export type ExodusElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusElevenRawNotes(rawText: string): ExodusElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 11:${startVerse}` : `Exodus 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Exodus 11 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_ELEVEN_RAW_NOTES = `# Exodus 11:1-3

# 💍 One More Plague, And Preparation

---

## 1️⃣ Yet Will I Bring One Plague More Upon Pharaoh

God tells Moses privately, in advance, that only one final plague remains before Pharaoh finally releases Israel, giving Moses certainty about how close the end of this confrontation truly is.

1️⃣ God confirms in advance this is the very last plague needed

---

## 🚪 He Shall Surely Thrust You Out Hence Altogether

God predicts Pharaoh's response will shift from refusal to actively driving Israel out urgently, a complete reversal from clinging to them as forced labor to desperately wanting them gone.

🚪 Pharaoh will go from refusing to release Israel to urgently expelling them

---

## 💍 Let Every Man Borrow Of His Neighbour ... Jewels Of Silver, And Jewels Of Gold

This directly fulfills God's promise back in chapter 3, that Israel would leave Egypt with real wealth. Borrow here functions more like requesting or asking, since these gifts were never expected to be returned.

💍 This fulfills God's earlier promise in chapter 3 about Israel's wealth leaving Egypt

📖 "Borrow" here means request or ask, not literally something returned later

---

## ⭐ The Man Moses Was Very Great In The Land Of Egypt

After nine devastating plagues, Moses' reputation and standing among ordinary Egyptians has grown immensely, a remarkable shift from an unknown fugitive shepherd to a figure of genuine respect and awe.

⭐ Moses' standing has grown enormously through the plagues, even among Egyptians

# Exodus 11:4-6

# 💀 The Tenth Plague Is Announced

---

## 🌙 About Midnight Will I Go Out Into The Midst Of Egypt

Midnight specifically marks the timing of this final, most severe plague, adding a sense of dread and inevitability, a fixed appointment that cannot be avoided or negotiated away.

🌙 A specific, fixed time is named, adding certainty and inevitability

---

## 👑 From The Firstborn Of Pharaoh ... Even Unto The Firstborn Of The Maidservant That Is Behind The Mill

This plague crosses every social class completely, from the royal palace to the lowest household servant grinding grain by hand. No wealth, status, or position offers any protection at all.

👑 This plague affects every social class, from the throne to the lowest servant

⚖️ Social status and wealth offer no protection whatsoever from this plague

---

## 😭 There Shall Be A Great Cry Throughout All The Land Of Egypt

The scale of grief is described as unmatched, before or after, in Egyptian history, capturing the depth of universal, simultaneous mourning about to strike every single household.

😭 This describes a uniquely severe, universal grief unmatched in Egyptian history

# Exodus 11:7-8

# 🐕 A Clear Distinction, And Righteous Anger

---

## 🐕 Not A Dog Move His Tongue ... That Ye May Know How That The LORD Doth Put A Difference

This vivid idiom means not even the smallest disturbance will happen among Israel, not even a dog barking. The stark contrast between chaos in Egypt and total peace in Israel's homes proves God's deliberate, personal protection.

🐕 Not even a dog barking pictures complete, undisturbed peace for Israel

⚖️ The sharp contrast between the two households proves deliberate divine protection

---

## 😠 He Went Out From Pharaoh In A Great Anger

Moses leaves this final confrontation visibly and genuinely angry, a righteous, human response to Pharaoh's relentless, stubborn cruelty toward an entire enslaved nation.

😠 Moses' anger here is a genuine, righteous human response to ongoing cruelty

# Exodus 11:9-10

# 📖 The Pattern Is Complete

---

## 🌟 That My Wonders May Be Multiplied In The Land Of Egypt

God reaffirms His purpose one final time before the last plague strikes, that these many miraculous signs serve a larger purpose than simply freeing Israel, revealing God's power fully and unmistakably.

🌟 God's stated purpose covers the full scope of all the plagues together

---

## 📖 Moses And Aaron Did All These Wonders Before Pharaoh

This verse functions as a summary statement, closing out the entire plague narrative as a complete unit, right before the story moves into the specific instructions for Passover in the very next chapter.

📖 This closing summary wraps up the entire plague sequence as one complete unit

➡️ The story now shifts directly into detailed Passover instructions next`;

export const EXODUS_ELEVEN_PERSONAL_SECTIONS = parseExodusElevenRawNotes(EXODUS_ELEVEN_RAW_NOTES);
