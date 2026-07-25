export type ExodusSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSeventeenRawNotes(rawText: string): ExodusSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 17:${startVerse}` : `Exodus 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 17 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SEVENTEEN_RAW_NOTES = `# Exodus 17:1-3

# 💧 No Water At Rephidim

---

## 🏕️ Pitched In Rephidim: And There Was No Water For The People To Drink

Pitched means camped. Israel arrives at a new location following God's own guidance, yet still faces a genuine, urgent survival crisis, no water available for the entire community.

🏕️ Pitched means camped, and this crisis happens even while following God's own guidance

---

## 😠 The People Did Chide With Moses ... Wherefore Do Ye Tempt The LORD?

Chide means to quarrel or scold sharply. Moses reframes their complaint as something more serious, tempting God, meaning testing Him, questioning His care in a way that doubts His character rather than simply expressing need.

😠 Chide means to quarrel or scold sharply

⚖️ Moses distinguishes expressing real need from testing God's character itself

---

## 🐄 To Kill Us And Our Children And Our Cattle With Thirst

The people's fear here is entirely legitimate, real thirst threatens not just themselves but their children and livestock too, explaining the intensity and desperation behind their complaint.

🐄 The threat here is genuinely severe, covering people, children, and animals alike

# Exodus 17:4-7

# 🪨 Water From The Rock

---

## 😨 They Be Almost Ready To Stone Me

Moses reports the situation's severity honestly to God, admitting real physical danger from his own people's growing anger, not exaggerating the crisis he's facing as a leader.

😨 Moses admits genuine physical danger from the people's escalating anger

---

## 🪨 Thou Shalt Smite The Rock, And There Shall Come Water Out Of It

God provides another miraculous provision, water flowing directly from solid rock, using the same rod that performed the plagues and parted the Red Sea, now providing life-sustaining water instead.

🪨 The same rod from the plagues and Red Sea now provides water instead

---

## 🏷️ Massah, And Meribah ... Because They Tempted The LORD

Massah means "testing" and Meribah means "quarreling" or "strife." Moses names this location permanently after Israel's specific failure here, a lasting geographic reminder of this moment of doubt.

🏷️ Massah means testing; Meribah means quarreling or strife

📍 This location's name permanently marks Israel's doubt at this moment

---

## ❓ Is The LORD Among Us, Or Not?

This question captures the real heart of Israel's complaint, not simply thirst itself, but genuine doubt about whether God's presence and care are actually real and active among them.

❓ This question reveals the deeper doubt underneath the surface complaint about thirst

# Exodus 17:8-10

# ⚔️ Amalek Attacks

---

## ⚔️ Amalek, And Fought With Israel In Rephidim

Amalek was a nomadic people descended from Esau's grandson, and this marks the beginning of a long, hostile relationship between Amalek and Israel that continues across many future books of the Old Testament.

⚔️ Amalek descended from Esau's grandson, beginning a long hostile relationship with Israel

---

## 🗡️ Moses Said Unto Joshua, Choose Us Out Men, And Go Out, Fight With Amalek

This is Joshua's very first appearance in Scripture, introduced here as a military leader chosen personally by Moses, setting up his much larger role later as Moses' eventual successor.

🗡️ This is Joshua's first appearance in Scripture, later becoming Moses' successor

---

## ⛰️ Moses, Aaron, And Hur Went Up To The Top Of The Hill

Hur appears here for the first time too, joining Aaron in a supporting role. Moses positions himself visibly on the hilltop overlooking the actual battle happening below.

⛰️ Moses watches from the hilltop while Joshua leads the actual battle below

# Exodus 17:11-13

# ✋ Moses' Hands Held Up

---

## ✋ When Moses Held Up His Hand, That Israel Prevailed: And When He Let Down His Hand, Amalek Prevailed

The battle's outcome is directly tied to Moses' raised hands, likely holding the rod of God, visibly connecting Israel's military success to reliance on God's power rather than human strength alone.

✋ The battle's outcome ties directly to Moses' raised hands, not military skill alone

---

## 🪨 They Took A Stone, And Put It Under Him ... Aaron And Hur Stayed Up His Hands

When Moses' own strength fails from simple physical exhaustion, Aaron and Hur step in practically, seating him and physically supporting his arms, a vivid picture of community members helping sustain someone else's faithfulness.

🪨 Aaron and Hur physically support Moses when his own strength gives out

🤝 This pictures how community support can help sustain someone else's faithfulness

---

## 🌅 His Hands Were Steady Until The Going Down Of The Sun

The support continues for the entire length of the battle, all day until sunset, ensuring the victory holds firm through consistent, sustained effort rather than a brief, temporary boost.

🌅 The support continues consistently through the whole day, not just briefly

# Exodus 17:14-16

# 📜 A Memorial, And Jehovah-nissi

---

## 📜 Write This For A Memorial In A Book, And Rehearse It In The Ears Of Joshua

Rehearse means to repeat or recount aloud. God commands this victory be both written down permanently and spoken directly to Joshua, ensuring the lesson survives through both written record and personal teaching.

📜 Rehearse means to repeat aloud, ensuring the lesson passes through both writing and speech

---

## 🏛️ Moses Built An Altar, And Called The Name Of It Jehovah-nissi

Jehovah-nissi means "the LORD is my banner," a banner being a military flag rallying troops in battle. Moses commemorates this victory by naming God directly as the true source and rallying point of their success.

🏛️ Jehovah-nissi means "the LORD is my banner"

🚩 A banner was a military rallying flag, crediting God as the true source of victory

---

## ⚔️ The LORD Will Have War With Amalek From Generation To Generation

This declares an ongoing, long-term conflict extending far beyond this single battle, setting up Amalek's recurring role as an antagonist throughout many of Israel's future stories in later books.

⚔️ This sets up Amalek's recurring hostile role throughout many future books of the Bible`;

export const EXODUS_SEVENTEEN_PERSONAL_SECTIONS = parseExodusSeventeenRawNotes(EXODUS_SEVENTEEN_RAW_NOTES);
