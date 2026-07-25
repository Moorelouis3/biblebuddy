export type ExodusTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyRawNotes(rawText: string): ExodusTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 20:${startVerse}` : `Exodus 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 20 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_RAW_NOTES = `# Exodus 20:1-3

# 📜 No Other Gods

---

## 📜 I Am The LORD Thy God, Which Have Brought Thee Out Of The Land Of Egypt

Before giving a single command, God first identifies Himself by what He's already done, Israel's rescuer and deliverer. Obedience is grounded in relationship and gratitude, not simply raw authority or fear.

📜 God grounds these commands in relationship and rescue, not raw authority alone

---

## 🚫 Thou Shalt Have No Other Gods Before Me

This first commandment demands complete, exclusive loyalty to the LORD alone, directly confronting the reality that Egypt and every surrounding nation worshiped many different gods simultaneously.

🚫 This directly confronts the normal ancient practice of worshiping many gods at once

# Exodus 20:4-6

# 🚫 No Graven Images

---

## 🖼️ Thou Shalt Not Make Unto Thee Any Graven Image

A graven image means a carved idol or statue meant to represent a deity. This command bans not just worshiping other gods, but even creating physical images to represent the LORD Himself.

🖼️ A graven image is a carved idol or statue representing a deity

---

## 😠 I The LORD Thy God Am A Jealous God

Jealous here describes God's rightful, exclusive claim to Israel's worship, similar to a marriage covenant demanding exclusive faithfulness, not petty envy in the negative human sense.

😠 God's jealousy here means a rightful claim to exclusive devotion, like a marriage covenant

---

## 👨‍👩‍👧‍👦 Visiting The Iniquity Of The Fathers Upon The Children Unto The Third And Fourth Generation

This describes how sin's real consequences naturally ripple forward through families and generations, not that children are personally punished for a parent's specific individual guilt.

👨‍👩‍👧‍👦 This describes sin's rippling consequences across generations, not inherited personal guilt

# Exodus 20:7

# 🚫 The Name Of The LORD

---

## 🚫 Thou Shalt Not Take The Name Of The LORD Thy God In Vain

Taking God's name in vain means using it carelessly, dishonestly, or emptily, such as in false oaths or hollow religious claims, not simply as a casual curse word in the modern sense alone.

🚫 This means using God's name carelessly or dishonestly, especially in false oaths

---

## ⚖️ The LORD Will Not Hold Him Guiltless

This command comes with a specific warning attached, God takes misuse of His own name with real, serious weight, not treating it as a minor issue.

⚖️ This attached warning shows God treats misuse of His name with real seriousness

# Exodus 20:8-11

# 🛐 Remember The Sabbath

---

## 🛐 Remember The Sabbath Day, To Keep It Holy

Remember suggests this practice already existed informally since chapter 16's manna pattern, now being formally commanded and codified as a permanent, ongoing law.

🛐 "Remember" suggests this builds on the pattern already begun back in chapter 16

---

## 🏠 Thou, Nor Thy Son, Nor Thy Daughter ... Nor Thy Stranger That Is Within Thy Gates

This rest applies broadly across the entire household and community, including servants and even foreign visitors, not just the head of the family alone.

🏠 Sabbath rest extends to every member of the household, including servants and visitors

---

## 🌍 In Six Days The LORD Made Heaven And Earth ... And Rested The Seventh Day

The reason given directly ties back to the creation pattern from Genesis 1-2, God's own resting rhythm becoming the model and foundation for human rest as well.

🌍 This ties directly back to God's own creation pattern from Genesis 1-2

# Exodus 20:12

# 👨‍👩‍👧 Honor Your Parents

---

## 👨‍👩‍👧 Honour Thy Father And Thy Mother

This is the first commandment specifically addressing human relationships rather than the relationship with God directly, marking parents with a uniquely protected, honored status within the family.

👨‍👩‍👧 This is the first commandment addressing human relationships, not God directly

---

## 📅 That Thy Days May Be Long Upon The Land

This commandment comes with a specific attached promise, connecting family honor directly to the community's overall stability and lasting wellbeing in the promised land.

📅 This promise connects family honor to the whole community's long-term wellbeing

# Exodus 20:13-17

# ⚖️ Commandments About Others

---

## 🚫 Thou Shalt Not Kill

This specifically addresses unlawful killing, murder, rather than every possible instance of taking life, such as later permitted warfare or capital punishment described elsewhere in the Law.

🚫 This specifically prohibits murder, not every instance of taking life described elsewhere in the Law

---

## 💍 Thou Shalt Not Commit Adultery

This protects the marriage covenant specifically, treating faithfulness within marriage as something serious enough to warrant its own direct, standalone commandment.

💍 Marriage faithfulness receives its own direct, standalone commandment here

---

## 🗣️ Thou Shalt Not Bear False Witness Against Thy Neighbour

This specifically addresses dishonest testimony, particularly relevant within legal proceedings, protecting the community's system of justice from corruption through lies.

🗣️ This specifically protects legal proceedings from being corrupted by dishonest testimony

---

## 💭 Thou Shalt Not Covet ... Any Thing That Is Thy Neighbour's

Covet means to desire something belonging to someone else. This final commandment uniquely addresses internal desire and attitude directly, not just external, visible actions like the earlier commandments.

💭 Covet means desiring what belongs to someone else

🧠 This uniquely addresses internal desire, not just outward, visible actions

# Exodus 20:18-21

# 😨 The People's Fear

---

## 😨 The People Saw ... They Removed, And Stood Afar Off

The overwhelming, dramatic display of God's presence produces genuine terror, causing the people to physically retreat further away from the mountain out of real fear.

😨 The dramatic display produces genuine terror, causing physical retreat

---

## 🗣️ Speak Thou With Us ... But Let Not God Speak With Us, Lest We Die

The people specifically request Moses serve as an intermediary, unable to bear direct communication with God themselves, establishing his ongoing mediating role between them.

🗣️ The people request Moses as an intermediary, unable to bear direct contact with God

---

## 🎯 God Is Come To Prove You, And That His Fear May Be Before Your Faces, That Ye Sin Not

Moses explains the deeper purpose behind this overwhelming, frightening display, cultivating genuine, lasting reverence meant to actually help prevent future disobedience, not simply causing panic for its own sake.

🎯 This fear is meant to cultivate lasting reverence that helps prevent future sin

# Exodus 20:22-26

# 🏛️ Instructions For Altars

---

## 🥇 Ye Shall Not Make With Me Gods Of Silver, Neither Shall Ye Make Unto You Gods Of Gold

This repeats and reinforces the prohibition against idols, specifically naming valuable materials that made idol-crafting especially tempting and impressive-looking in the ancient world.

🥇 This specifically names valuable materials that made idols especially tempting to create

---

## 🏛️ An Altar Of Earth Thou Shalt Make Unto Me

God specifically requests a simple, humble altar made from plain earth, rather than something elaborate or artistically impressive, keeping the focus on worship itself rather than human craftsmanship.

🏛️ A simple earth altar keeps the focus on worship, not impressive human craftsmanship

---

## 🔨 If Thou Lift Up Thy Tool Upon It, Thou Hast Polluted It

Even stone altars must remain unworked and uncut by human tools, ensuring the altar's construction contributes nothing that could distract from or compete with genuine, humble worship of God alone.

🔨 Even stone altars stay uncut, preventing human craftsmanship from competing with worship

---

## 🚶 Neither Shalt Thou Go Up By Steps Unto Mine Altar, That Thy Nakedness Be Not Discovered Thereon

Ancient priestly garments were simple robes without undergarments, meaning climbing steps in front of onlookers below could cause real, accidental immodesty, a practical, culturally specific instruction protecting reverent dignity in worship.

🚶 This addresses real modesty concerns given the simple ancient priestly garments worn

⚖️ A practical instruction protecting reverent dignity during worship at the altar`;

export const EXODUS_TWENTY_PERSONAL_SECTIONS = parseExodusTwentyRawNotes(EXODUS_TWENTY_RAW_NOTES);
