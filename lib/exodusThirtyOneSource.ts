export type ExodusThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyOneRawNotes(rawText: string): ExodusThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 31:${startVerse}` : `Exodus 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Exodus 31 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_ONE_RAW_NOTES = `# Exodus 31:1-6

# 🔨 God Calls Bezaleel And Aholiab

---

## 👤 The LORD Spake Unto Moses, Saying, See, I Have Called By Name Bezaleel

For six chapters God has been describing objects — the ark, the table, the lampstand, the altars, the garments, the oil. Now, for the first time, He names the actual man who will build them.

**"Called by name"** is not a small detail. It means Bezaleel is not a random volunteer or the best hand Moses happened to find; God personally singled him out before any hammer was lifted. The blueprint mattered enough to God that He chose the builder Himself.

👤 God names a specific individual, not just a job description

🔨 Bezaleel is chosen personally, before construction ever begins

📖 The One who designed the tabernacle also hand-picked who would build it

➡️ His family line matters too

---

## 🌳 The Son Of Uri, The Son Of Hur, Of The Tribe Of Judah

Bezaleel's grandfather is Hur — very likely the same Hur who, alongside Aaron, held up Moses' tired arms during the battle with Amalek back in Exodus 17. If so, this family already has a history of quietly supporting God's work without getting the spotlight.

Judah is the tribe that will later produce Israel's kings, and eventually the Messiah. It's worth noticing that the man chosen to build God's house comes from this same significant tribal line, generations before that line becomes famous for anything else.

🌳 Hur may be the same man who helped hold up Moses' hands in Exodus 17

👑 Judah is the tribe of Israel's future kings

📖 God's choice of builder reaches back into a family's quiet history

➡️ God explains exactly what has been placed in him

---

## 🔥 I Have Filled Him With The Spirit Of God, In Wisdom, And In Understanding, And In Knowledge, And In All Manner Of Workmanship

This is one of the earliest places in Scripture where being **"filled with the Spirit of God"** has nothing to do with prophecy, leadership, or battle — it describes a craftsman's hands. Skilled work with gold, wood, and stone is treated here as a genuine spiritual gift, not a lesser, merely human talent.

**"Wisdom,"** **"understanding,"** and **"knowledge"** stack together to describe something bigger than raw ability: Bezaleel can design, reason through a problem, and execute it, all at once. **"Workmanship"** simply means skilled craft or handiwork.

🔥 Being Spirit-filled here means gifted for skilled physical work, not prophecy

🛠️ Wisdom, understanding, and knowledge together cover design, judgment, and execution

📖 Craftsmanship is treated as a real gift from God, not a separate "secular" skill

➡️ God lists exactly what kind of work this gift covers

---

## 🥇 To Devise Cunning Works, To Work In Gold, And In Silver, And In Brass, And In Cutting Of Stones, To Set Them, And In Carving Of Timber

**"Cunning"** in the KJV does not mean sneaky or deceptive, which is how the word is almost always used today. Here it simply means highly skillful or ingeniously clever — "cunning works" are masterfully crafted works, nothing underhanded about them.

The list itself is wide: metalworking in three different metals, gem-cutting and setting, and woodcarving. One man is expected to be expert across several completely different trades, which is exactly why this needed to be a Spirit-given gift rather than something learned overnight.

🥇 "Cunning" here means highly skillful, not sly or deceitful

⚒️ The skill set spans metalworking, gem-setting, and woodcarving all at once

📖 This range of mastery is presented as supernatural giftedness, not just training

➡️ Bezaleel is given a partner for the work

---

## 🤝 I Have Given With Him Aholiab, The Son Of Ahisamach, Of The Tribe Of Dan: And In The Hearts Of All That Are Wise Hearted I Have Put Wisdom

Aholiab comes from Dan, one of the smaller, less prominent tribes — a striking pairing next to Bezaleel from prominent Judah. God does not build His house through one important tribe alone; a "lesser" family stands shoulder to shoulder with a "greater" one on the same sacred project.

**"Wise hearted"** is a KJV idiom that doesn't mean intellectually smart; it means skilled and gifted with the hands, the same sense as "wisdom" back in verse 3. And the gifting doesn't stop at two men — God says He has placed this skill in the hearts of "all" who are wise hearted, meaning a whole team of unnamed craftspeople is quietly included here too.

🤝 Judah and Dan, a prominent tribe and a lesser one, work side by side

💡 "Wise hearted" means skilled with the hands, not merely intelligent

👥 The gifted team is bigger than just the two named men

➡️ God lists everything this team is about to build

# Exodus 31:7-11

# 🏛️ Everything They Will Build

---

## ⚱️ The Tabernacle Of The Congregation, And The Ark Of The Testimony, And The Mercy Seat That Is Thereupon

God now runs back through the entire building list from chapters 25-30, starting with the holiest object first. **"Thereupon"** is an old word simply meaning "on top of it" — the mercy seat sits directly on top of the ark, as its solid gold lid.

The ark and mercy seat were described all the way back in chapter 25, at the very start of these instructions. Naming them again here, at the very end, closes a loop: everything described is now handed to real builders instead of staying words on a mountain.

⚱️ "Thereupon" means on top of it — the mercy seat is the ark's lid

📖 Chapter 25 first described these; now real craftsmen will make them

🔄 The list runs from the holiest object outward, just as it was first given

➡️ The list moves out to the furniture of the holy place

---

## 🕯️ The Table And His Furniture, And The Pure Candlestick With All His Furniture, And The Altar Of Incense

**"Furniture"** here is a false friend for modern readers — it does not mean chairs and couches. In the KJV it means the accompanying equipment and utensils that belong to an object, like the bowls and spoons that went with the showbread table.

The table (for showbread) and the candlestick (the golden lampstand) both come from chapter 25; the altar of incense was just given in chapter 30. All three stood inside the holy place, the room just outside the innermost curtain.

🕯️ "Furniture" means an object's accompanying equipment, not chairs and couches

🍞 The table and candlestick were first described back in chapter 25

💨 The incense altar was the most recently given instruction, in chapter 30

➡️ The list moves outward again, into the courtyard

---

## 🐂 The Altar Of Burnt Offering With All His Furniture, And The Laver And His Foot

The bronze altar for burnt offerings was first described in chapter 27; the washing basin, or laver, and its pedestal **"foot,"** were just given in chapter 30. Moving from the ark to the incense altar to the courtyard traces the exact same inside-to-outside path God used when He first gave these instructions.

🐂 The bronze altar goes back to chapter 27's original instructions

🥣 The laver and its "foot," or pedestal base, were given most recently, in chapter 30

📐 The order moves from the holiest space outward to the courtyard gate

➡️ The list turns from furniture to people

---

## 👕 The Cloths Of Service, And The Holy Garments For Aaron The Priest, And The Garments Of His Sons, To Minister In The Priest's Office

The **"cloths of service"** are the specially woven garments used while ministering, described in detail back in chapter 28 alongside Aaron's holy garments and his sons' priestly clothing. **"To minister in the priest's office"** means to formally serve in the officially appointed role of priest — not a casual task anyone could pick up.

👕 "Cloths of service" are the woven garments used while ministering

📖 Chapter 28 already described these garments in full detail

⛪ "Priest's office" is a formal, appointed role, not an informal duty

➡️ The final items on the list are the two holy formulas

---

## 🧴 The Anointing Oil, And Sweet Incense For The Holy Place: According To All That I Have Commanded Thee Shall They Do

The anointing oil and the incense recipe, both given in chapter 30 with strict warnings against copying or misusing them, round out the list. The closing line, **"according to all that I have commanded thee shall they do,"** is a quiet but firm reminder: skilled and Spirit-filled as they are, Bezaleel and Aholiab still must build exactly to God's specification, with no creative liberty on holy things.

🧴 The anointing oil and incense recipe both come from chapter 30

📋 Even gifted craftsmen must build exactly to the pattern given, not their own ideas

🔒 Skill was never meant to replace obedience in this project

➡️ God pivots from craftsmen to a command for the whole nation

# Exodus 31:12-17

# 🕊️ The Sabbath As A Sign

---

## 📢 Speak Thou Also Unto The Children Of Israel, Saying, Verily My Sabbaths Ye Shall Keep

**"Verily"** is an old word for "truly" or "certainly," used here to add solemn weight to the command. Notice the shift: everything up to now addressed two skilled craftsmen; this command addresses the whole nation. Even sacred construction, no matter how urgent or holy, must still stop for the Sabbath.

📢 "Verily" means truly or certainly, adding solemn weight to the command

👥 The audience shifts from two craftsmen to the entire nation

⏸️ Not even building God's own house was allowed to override the Sabbath

➡️ God explains what the Sabbath is meant to represent

---

## 🤝 For It Is A Sign Between Me And You Throughout Your Generations; That Ye May Know That I Am The LORD That Doth Sanctify You

A **"sign"** in this sense is a marker of a relationship, the same kind of language used for circumcision as "a token of the covenant" in Genesis 17:11. The Sabbath functions the same way — an ongoing, visible mark identifying Israel as God's own people, generation after generation.

**"Sanctify"** means to set apart for God's exclusive use, the same word already used for the tabernacle's furniture and priests in chapter 30. Now an entire nation, not just objects and priests, is described as something God is setting apart.

🤝 "Sign" here marks a relationship, much like circumcision in Genesis 17

✨ "Sanctify" means set apart for God, the same word used for holy objects

📖 The whole nation, not just the tabernacle, is being set apart here

➡️ The penalty for ignoring this sign is spelled out

---

## ⚠️ Ye Shall Keep The Sabbath Therefore; For It Is Holy Unto You: Every One That Defileth It Shall Surely Be Put To Death

**"Defileth"** means to violate or make unclean something that was set apart as holy. The penalty named here, death, matches the same severe weight already attached to misusing the holy anointing oil or incense back in chapter 30 — the Sabbath is placed in that same highest category of holiness.

⚠️ "Defileth" means to violate or make unclean something holy

⚖️ The penalty matches the severity already given for misusing holy oil or incense

📊 The Sabbath is placed in the same top tier of holiness as sacred objects

➡️ The command repeats itself for emphasis

---

## 🛌 Six Days May Work Be Done; But In The Seventh Is The Sabbath Of Rest, Holy To The LORD: Whosoever Doeth Any Work In The Sabbath Day, He Shall Surely Be Put To Death

This restates, almost word for word, the Sabbath command already given in the Ten Commandments at chapter 20. Repeating it here, right after the tabernacle instructions, shows this law was never meant to be quietly set aside just because holy construction work was underway.

🛌 This repeats the Ten Commandments' Sabbath law from chapter 20 almost exactly

🔁 Repetition here shows the rule wasn't suspended for tabernacle-building

⚠️ The death penalty is stated a second time for full clarity

➡️ God ties the whole command to the nation's ongoing identity

---

## 📜 Wherefore The Children Of Israel Shall Keep The Sabbath, To Observe The Sabbath Throughout Their Generations, For A Perpetual Covenant

A **"perpetual covenant"** is a permanent agreement, never scheduled to expire or be renegotiated by a later generation — the same "perpetual" language already used for the incense offering in chapter 30. This law was never meant for one generation alone.

📜 A "perpetual covenant" is a permanent agreement, not a temporary one

🔁 The same "perpetual" language already described the incense in chapter 30

👨‍👦‍👦 The command was written to outlast every single generation that received it

➡️ God grounds the whole command in the very beginning of the world

---

## 🌍 It Is A Sign Between Me And The Children Of Israel For Ever: For In Six Days The LORD Made Heaven And Earth, And On The Seventh Day He Rested, And Was Refreshed

The Sabbath is tied directly back to the creation week described in Genesis 2:2-3, long before Israel existed as a nation. **"Was refreshed"** doesn't mean God grew weary or ran out of strength; it pictures completion and satisfaction, the same rest Israel is now asked to imitate one day out of every seven.

🌍 The Sabbath is anchored in creation itself, from Genesis 2

😌 "Was refreshed" pictures satisfaction and completion, not divine weariness

🔁 Israel is asked to imitate God's own pattern of work and rest

➡️ The scene shifts back to Moses on the mountain

# Exodus 31:18

# 📜 Two Tables Of Stone

---

## 🗣️ When He Had Made An End Of Communing With Him Upon Mount Sinai

**"Communing"** is an old word for speaking directly with someone, a close conversation rather than a formal announcement. This single line quietly closes out an enormous block of instruction stretching all the way back to chapter 25 — the entire tabernacle blueprint, priesthood, and Sabbath law were given in one continuous conversation on the mountain.

🗣️ "Communing" means speaking directly, in close conversation

📖 This closes out everything God has been describing since chapter 25

⛰️ All of it was given during one extended meeting atop Mount Sinai

## 📖 He Gave Unto Moses Two Tables Of Testimony, Tables Of Stone, Written With The Finger Of God

The **"finger of God"** is the same phrase Egypt's own magicians used back in chapter 8 when they could no longer reproduce the plague of lice and admitted, "this is the finger of God." Here that same phrase describes tablets Moses did not write himself; God wrote them directly.

While this handoff is happening on the mountain, the people below are about to grow impatient and build a golden calf in the very next chapter. The tables of the covenant and Israel's first great betrayal of it happen almost at the same moment, on opposite sides of the same mountain.

📖 "Finger of God" is the same phrase Egypt's magicians used in chapter 8

✍️ These tablets were written directly by God, not copied out by Moses

⛰️ Chapter 32 opens with betrayal breaking out at the foot of this same mountain`;

export const EXODUS_THIRTY_ONE_PERSONAL_SECTIONS = parseExodusThirtyOneRawNotes(EXODUS_THIRTY_ONE_RAW_NOTES);
