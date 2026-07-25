export type ExodusSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSevenRawNotes(rawText: string): ExodusSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 7:${startVerse}` : `Exodus 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 7 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SEVEN_RAW_NOTES = `# Exodus 7:1-5

# 👑 God Restates The Plan

---

## 👑 I Have Made Thee A God To Pharaoh: And Aaron Thy Brother Shall Be Thy Prophet

This doesn't mean Moses literally becomes divine. It means Moses will represent God's authority to Pharaoh, while Aaron functions as a prophet, someone who speaks on another's behalf, relaying Moses' words the way a prophet relays God's words.

👑 Moses represents God's authority to Pharaoh, without becoming divine himself

🗣️ A prophet is someone who speaks on another's behalf, which is Aaron's role here

---

## 🪨 I Will Harden Pharaoh's Heart, And Multiply My Signs And My Wonders

God states plainly in advance that this confrontation will involve repeated, escalating miraculous signs, not a single quick event. Pharaoh's resistance is treated as an expected, even necessary, part of how God will display His power.

🪨 Repeated, escalating signs are planned in advance, not a single quick event

---

## 🌍 The Egyptians Shall Know That I Am The LORD

The ultimate goal reaches beyond Israel's freedom alone, Egypt itself will come to recognize the LORD's power and identity through these events, a nation that currently worships many different gods entirely unfamiliar with Him.

🌍 Egypt coming to know the LORD is itself a stated goal of these events

# Exodus 7:6-7

# ⏳ Moses And Aaron's Ages

---

## ⏳ Moses Was Fourscore Years Old, And Aaron Fourscore And Three Years Old

Fourscore means eighty. Moses is eighty and Aaron eighty-three when this confrontation with Pharaoh actually begins. This is a significant detail, both men are elderly by the time this mission truly starts, not young, brash leaders.

⏳ Fourscore means eighty

👴 Both Moses and Aaron are elderly, not young leaders, when this mission begins

# Exodus 7:8-13

# 🐍 The Rod Becomes A Serpent Before Pharaoh

---

## 🐍 Take Thy Rod, And Cast It Before Pharaoh, And It Shall Become A Serpent

God instructs that this same sign from chapter 4 be repeated publicly and formally before Pharaoh himself, as the first official proof of divine authority behind Moses and Aaron's message.

🐍 This is the same sign from chapter 4, now performed formally before Pharaoh

---

## 🔮 The Magicians Of Egypt, They Also Did In Like Manner With Their Enchantments

Egyptian magicians were able to imitate this sign through their own enchantments, meaning trained occult or ritual practices. This shows Pharaoh had real access to some form of counterfeit power, making the confrontation genuinely uncertain to onlookers at first.

🔮 Enchantments means trained occult or ritual practices, not simple trickery

---

## 🐍 Aaron's Rod Swallowed Up Their Rods

Despite the magicians' apparent success, Aaron's serpent consumes theirs entirely, a clear, visible sign that God's power decisively outmatches Egypt's counterfeit imitation, even when Egypt can copy the trick's surface appearance.

🐍 Aaron's serpent swallowing theirs shows clear, decisive superiority

⚖️ God's power outlasts and overpowers Egypt's counterfeit imitation

---

## 🪨 He Hardened Pharaoh's Heart, That He Hearkened Not Unto Them

Even after witnessing this clear sign, Pharaoh's heart remains hardened exactly as God predicted back in verse 3. The pattern of resistance despite evidence begins here and will repeat throughout the plagues ahead.

🪨 This first hardening happens exactly as God predicted just verses earlier

# Exodus 7:14-18

# 🩸 God Announces The First Plague

---

## 🌅 Get Thee Unto Pharaoh In The Morning; Lo, He Goeth Out Unto The Water

Pharaoh apparently had a regular morning routine involving the Nile, possibly religious ritual, since Egyptians worshiped the Nile as connected to the god Hapi. Moses is told exactly where and when to intercept him.

🌅 Pharaoh's morning routine at the Nile likely connects to Egyptian river worship

---

## 🩸 I Will Smite With The Rod ... Upon The Waters ... And They Shall Be Turned To Blood

The very first plague targets the Nile River directly, the exact source Egypt worshiped as divine and depended on completely for water, food, and transportation. This plague strikes at the heart of Egyptian religious and economic life simultaneously.

🩸 This plague strikes Egypt's primary water source and a worshiped deity together

---

## 🐟 The Fish ... Shall Die ... The River Shall Stink

The plague's consequences are described in vivid, sensory detail: dead fish, a foul smell, and undrinkable water. This isn't a symbolic gesture, it's a real, immediate ecological and humanitarian crisis for the entire nation.

🐟 The plague causes an immediate, real ecological and humanitarian crisis

# Exodus 7:19-21

# 💧 The Plague Strikes All Egyptian Water

---

## 💧 Upon Their Streams, Upon Their Rivers, And Upon Their Ponds, And Upon All Their Pools Of Water

The plague deliberately spreads beyond just the Nile itself to every water source across Egypt, sparing nothing. Even water already stored inside wooden and stone containers turns to blood, showing this reaches every corner of Egyptian daily life.

💧 The plague affects every water source in Egypt, not just the river itself

🏺 Even stored water in containers is affected, missing nothing

---

## 👁️ In The Sight Of Pharaoh, And In The Sight Of His Servants

The miracle happens publicly and visibly, directly in front of Pharaoh and his officials, leaving no room to dismiss it as rumor or exaggeration. Everyone present witnesses it firsthand.

👁️ The plague happens publicly, witnessed directly by Pharaoh and his court

# Exodus 7:22-25

# 🚫 Pharaoh Remains Unmoved

---

## 🔮 The Magicians Of Egypt Did So With Their Enchantments

The magicians manage some kind of imitation again, though the text doesn't explain exactly how, given all the water is already blood. This may have been a smaller-scale copy, enough to give Pharaoh an excuse to dismiss the plague's significance.

🔮 The magicians' imitation gives Pharaoh an excuse to dismiss the plague's weight

---

## 🚪 Pharaoh Turned And Went Into His House, Neither Did He Set His Heart To This Also

Pharaoh simply walks away and returns home, refusing to genuinely engage with what just happened. "Set his heart" means to take something seriously or to heart, and Pharaoh deliberately chooses not to.

🚪 "Set his heart" means to take something seriously, which Pharaoh refuses to do

---

## ⛏️ All The Egyptians Digged Round About The River For Water To Drink

While Pharaoh dismisses the crisis, his own people suffer the real, practical consequences, digging desperately for any drinkable water. The gap between Pharaoh's denial and his people's suffering grows wider with each plague.

⛏️ Ordinary Egyptians suffer real consequences even as Pharaoh denies the problem

📅 Seven full days pass with the Nile in this ruined state before anything changes`;

export const EXODUS_SEVEN_PERSONAL_SECTIONS = parseExodusSevenRawNotes(EXODUS_SEVEN_RAW_NOTES);
