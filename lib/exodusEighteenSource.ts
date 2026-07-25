export type ExodusEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusEighteenRawNotes(rawText: string): ExodusEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 18:${startVerse}` : `Exodus 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 18 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_EIGHTEEN_RAW_NOTES = `# Exodus 18:1-6

# 👨‍👩‍👧 Jethro Brings Moses' Family

---

## 👨‍👩‍👧 Jethro ... Took Zipporah, Moses' Wife, After He Had Sent Her Back

This reveals Moses had sent his wife and sons back to stay with Jethro at some earlier point, likely for their safety during the intense confrontation with Pharaoh, and now the family is finally being reunited.

👨‍👩‍👧 Moses had sent his family to safety during the confrontation with Pharaoh

---

## 🌍 Gershom; For He Said, I Have Been An Alien In A Strange Land

This repeats the meaning of Gershom's name already given back in chapter 2, reinforcing Moses' own sense of displacement during his years as a fugitive shepherd in Midian.

🌍 This repeats Gershom's meaning from chapter 2, reinforcing Moses' years as an outsider

---

## 🙏 Eliezer; For The God Of My Father ... Was Mine Help, And Delivered Me From The Sword Of Pharaoh

Eliezer means "my God is my help." This second son's name, given here for the first time, specifically credits God with personally protecting Moses from Pharaoh's earlier attempt to kill him back in chapter 2.

🙏 Eliezer means "my God is my help"

📖 This name specifically credits God with protecting Moses from Pharaoh's death threat

# Exodus 18:7-9

# 🤗 A Warm Reunion

---

## 🤗 Moses Went Out To Meet His Father In Law, And Did Obeisance, And Kissed Him

Obeisance means a deep, respectful bow. Moses shows real honor to Jethro despite his own newfound position of leadership, a warm, humble family reunion rather than a formal, distant meeting.

🤗 Obeisance means a deep, respectful bow, showing genuine honor and humility

---

## 🗣️ Moses Told His Father In Law All That The LORD Had Done ... And All The Travail

Travail means hardship or suffering. Moses gives a full, honest account, both the triumphant victories and the real difficulties endured along the way, not just a highlight reel of success.

🗣️ Travail means hardship, and Moses shares both victories and real struggles honestly

---

## 😊 Jethro Rejoiced For All The Goodness Which The LORD Had Done To Israel

Jethro, an outsider to Israel's covenant, responds with genuine joy at hearing what God has done, showing real personal investment in Israel's wellbeing beyond simple family obligation.

😊 Jethro's genuine joy shows real personal investment, not just polite family courtesy

# Exodus 18:10-12

# 🙏 Jethro Worships And Feasts

---

## 🙏 Blessed Be The LORD ... Now I Know That The LORD Is Greater Than All Gods

Jethro, a Midianite priest with his own religious background, arrives at genuine conviction about the LORD's supremacy over every other god, based on the evidence he's just heard described.

🙏 Jethro reaches genuine conviction about God's supremacy, based on real evidence

---

## 🐑 Jethro ... Took A Burnt Offering And Sacrifices For God

Jethro personally participates in formal worship, offering sacrifices himself, showing active spiritual engagement rather than simply being an impressed outside observer.

🐑 Jethro actively worships himself, not just observing from a distance

---

## 🍞 Aaron Came, And All The Elders Of Israel, To Eat Bread ... Before God

Sharing a meal together was a significant act of fellowship and covenant bonding in this culture. Israel's leadership formally welcomes Jethro into genuine community, not just a polite visit.

🍞 Sharing this meal together marked genuine fellowship and covenant bonding

# Exodus 18:13-16

# ⚖️ Moses Judges Alone

---

## ⚖️ Moses Sat To Judge The People: And The People Stood By Moses From The Morning Unto The Evening

Moses personally handles every single dispute and question from the entire nation by himself, an exhausting, unsustainable system that Jethro immediately notices as a serious problem.

⚖️ Moses handles every dispute personally, an unsustainable system for one man alone

---

## 🙏 The People Come Unto Me To Enquire Of God

Moses explains his role, that people come specifically seeking God's guidance and judgment through him, showing this wasn't just administrative work but spiritual mediation as well.

🙏 Moses' role includes spiritual mediation, not just administrative decisions

# Exodus 18:17-18

# 😟 Jethro's Honest Critique

---

## 😟 The Thing That Thou Doest Is Not Good

Jethro speaks honestly and directly, not softening his real concern out of politeness, willing to challenge Moses' current approach even as a respected leader.

😟 Jethro offers direct, honest criticism rather than polite silence

---

## 😩 Thou Wilt Surely Wear Away ... This Thing Is Too Heavy For Thee

Jethro warns this unsustainable pace will eventually exhaust and break Moses completely, using the image of something too heavy to carry alone, a burden requiring shared weight.

😩 Jethro warns this pace will eventually completely exhaust and break Moses

# Exodus 18:19-23

# 💡 Jethro's Wise Advice

---

## 🙏 Be Thou For The People To God-ward, That Thou Mayest Bring The Causes Unto God

Jethro doesn't suggest Moses abandon his spiritual role entirely, only that he refocus specifically on representing the people before God, rather than personally handling every single dispute himself.

🙏 Jethro suggests refocusing Moses' role, not abandoning his spiritual leadership

---

## 👥 Provide ... Able Men, Such As Fear God, Men Of Truth, Hating Covetousness

Jethro outlines specific, real qualifications for new leaders: genuine capability, sincere faith, honesty, and resistance to greed, covetousness meaning excessive desire for others' possessions or bribes.

👥 Covetousness means greed or desire for what belongs to others, including bribes

📋 These specific qualifications describe genuine capability and moral integrity

---

## 🔢 Rulers Of Thousands, And Rulers Of Hundreds, Rulers Of Fifties, And Rulers Of Tens

Jethro proposes a structured, tiered system of leadership, distributing responsibility across multiple levels rather than concentrating every decision in one single person.

🔢 This tiered structure distributes responsibility across multiple levels of leadership

---

## ⚖️ Every Great Matter They Shall Bring Unto Thee, But Every Small Matter They Shall Judge

Jethro's plan preserves Moses' role for the most significant, difficult cases specifically, while freeing him from the overwhelming volume of smaller, everyday disputes.

⚖️ Moses keeps the hardest cases while smaller disputes get handled by others

# Exodus 18:24-27

# ✅ Moses Implements The Plan

---

## ✅ Moses Hearkened To The Voice Of His Father In Law, And Did All That He Had Said

Moses responds to this criticism and advice with genuine humility, fully implementing Jethro's suggestion without resistance or wounded pride, a notable example of receiving correction well.

✅ Moses humbly accepts correction and fully implements the suggested change

---

## 👥 Moses Chose Able Men Out Of All Israel, And Made Them Heads Over The People

Moses puts the plan into action immediately and completely, appointing capable leaders across the entire nation according to exactly the structure Jethro recommended.

👥 Moses fully implements the exact leadership structure Jethro recommended

---

## 🚶 Moses Let His Father In Law Depart; And He Went His Way Into His Own Land

The chapter closes with Jethro returning home to Midian, his visit accomplishing something significant for Israel's entire future organizational structure before he leaves.

🚶 Jethro's visit leaves a lasting structural impact before he returns home`;

export const EXODUS_EIGHTEEN_PERSONAL_SECTIONS = parseExodusEighteenRawNotes(EXODUS_EIGHTEEN_RAW_NOTES);
