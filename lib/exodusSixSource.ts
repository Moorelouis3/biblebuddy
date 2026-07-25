export type ExodusSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSixRawNotes(rawText: string): ExodusSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 6:${startVerse}` : `Exodus 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 6 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SIX_RAW_NOTES = `# Exodus 6:1-5

# ✨ God Reveals The Name JEHOVAH

---

## 💪 With A Strong Hand Shall He Let Them Go

God tells Moses plainly that Pharaoh's eventual release of Israel will only come through overwhelming, forceful pressure, not persuasion or gradual change of heart. This prepares Moses for a long, hard road still ahead.

💪 God prepares Moses for a forced release, not a change of heart

---

## 📛 By My Name JEHOVAH Was I Not Known To Them

Abraham, Isaac, and Jacob knew God primarily as God Almighty, but not with the same depth of personal, covenant relationship now being revealed through the name JEHOVAH, connected to the "I AM" name given in chapter 3. God is revealing a fuller, deeper dimension of who He is for this new stage of Israel's story.

📛 The patriarchs knew God mainly as God Almighty, not by this fuller name

📖 This connects directly to the "I AM" name revealed back in chapter 3

---

## 🏕️ The Land Of Their Pilgrimage, Wherein They Were Strangers

Pilgrimage here means a temporary journey through a land not yet permanently possessed. Abraham, Isaac, and Jacob all lived in Canaan as outsiders, never actually owning it outright, only holding the promise that their descendants eventually would.

🏕️ The patriarchs lived in Canaan as outsiders, never fully possessing it themselves

---

## 👂 I Have Also Heard The Groaning Of The Children Of Israel

God directly connects His response to Israel's specific suffering under Egyptian slavery to the ancient covenant promise, showing these two things, present suffering and ancient promise, were never separate from each other.

👂 God ties Israel's present suffering directly to His ancient covenant promise

# Exodus 6:6-8

# 🗣️ Seven "I Will" Promises

---

## 🦾 I Will Redeem You With A Stretched Out Arm, And With Great Judgments

Redeem means to rescue by paying a price or exerting real power on someone's behalf. A stretched out arm is a vivid image of deliberate, powerful action, not passive rescue. Great judgments foreshadows the plagues about to unfold against Egypt.

🦾 Redeem means to rescue through a deliberate, costly, powerful act

🌪️ "Great judgments" foreshadows the plagues still to come

---

## 🤝 I Will Take You To Me For A People, And I Will Be To You A God

This is covenant language, a formal, binding relationship being established between God and the entire nation, not simply a rescue mission. Israel is being formed into God's own people through this moment.

🤝 This formally establishes Israel as God's own covenant people

---

## 🏡 I Will Bring You In Unto The Land ... I Will Give It You For An Heritage

God lists a complete sequence of promises: rescue from slavery, covenant relationship, and finally, permanent inheritance of the promised land. Heritage means a lasting possession passed down through generations, not a temporary gift.

🏡 Heritage means a lasting possession, not a temporary or borrowed gift

📖 This completes the full sequence: rescue, relationship, and inheritance

# Exodus 6:9

# 😔 Israel Cannot Hear It

---

## 😔 They Hearkened Not Unto Moses For Anguish Of Spirit, And For Cruel Bondage

Even this beautiful, complete set of promises fails to reach a people utterly crushed by exhaustion and suffering. Anguish of spirit describes deep, overwhelming emotional distress, so severe that even good news struggles to break through.

😔 Anguish of spirit means overwhelming emotional and mental distress

💔 Severe suffering can make even genuinely good news hard to receive or believe

# Exodus 6:10-13

# 🙋 Moses Doubts Himself Again

---

## 🗣️ Go In, Speak Unto Pharaoh King Of Egypt

God repeats the same command from before, sending Moses directly to Pharaoh again, undeterred by Israel's inability to receive the message or the failed first attempt.

🗣️ God repeats His command, undeterred by the setback that just happened

---

## 👄 Of Uncircumcised Lips

This is an idiom describing someone who feels inadequate or unfit at speaking, similar to Moses' earlier complaint in chapter 4 about being slow of speech. Moses reasons that if his own suffering people wouldn't listen to him, Pharaoh certainly won't either.

👄 "Uncircumcised lips" is an idiom describing a sense of inadequacy at speaking

🔁 This echoes Moses' earlier objection about his speaking ability from chapter 4

---

## 📜 The LORD ... Gave Them A Charge Unto The Children Of Israel, And Unto Pharaoh

Despite Moses' doubts, God formally commissions both Moses and Aaron together for this specific task, addressing both the Israelites and Pharaoh as the full scope of their mission.

📜 God formally commissions both Moses and Aaron together for this task

# Exodus 6:14-19

# 📜 The Family Line Of Reuben, Simeon, And Levi

---

## 📜 These Be The Heads Of Their Fathers' Houses

The narrative pauses here for a genealogy, specifically tracing the tribes of Reuben, Simeon, and Levi, before quickly zooming in on Levi's line in particular, since that's the tribe Moses and Aaron themselves belong to.

📜 This genealogy specifically sets up Levi's line, leading directly to Moses and Aaron

---

## ⏳ The Years Of The Life Of Levi Were An Hundred Thirty And Seven Years

Genesis-style lifespan notes continue here into Exodus, marking Levi's long life and tracing the direct generational distance between Jacob's original family and Moses' own generation, born into slavery in Egypt.

⏳ Lifespan notes help trace the generations between Jacob's family and Moses

# Exodus 6:20-25

# 👨‍👩‍👦 Moses And Aaron's Immediate Family

---

## 👨‍👩‍👦 Amram Took Him Jochebed His Father's Sister To Wife ... She Bare Him Aaron And Moses

This finally names Moses' parents directly: Amram and Jochebed, the same unnamed couple described back in chapter 2. Notably, Jochebed was Amram's aunt, a marriage pattern later specifically forbidden once the Law is given at Sinai, showing this happened before those laws existed.

👨‍👩‍👦 This names Moses' parents directly for the first time: Amram and Jochebed

⚖️ This marriage pattern is later forbidden once the Law is given, showing it predates it

---

## 👨‍👩‍👦 Aaron Took Him Elisheba ... She Bare Him Nadab, And Abihu, Eleazar, And Ithamar

Aaron's own sons are named here, establishing the priestly line that continues throughout the rest of the Old Testament. Nadab and Abihu will later die for a serious act of disobedience in Leviticus, while Eleazar's line continues the priesthood forward.

👨‍👩‍👦 This establishes the priestly family line continuing through the Old Testament

🔮 Nadab and Abihu's names foreshadow a serious event later told in Leviticus

---

## 👤 Eleazar Aaron's Son ... She Bare Him Phinehas

Phinehas, named here as part of this genealogy, later becomes a especially significant figure himself, known in the book of Numbers for his zealous defense of God's holiness among the people.

👤 Phinehas becomes a notably significant priestly figure later in Numbers

# Exodus 6:26-27

# ✅ Confirming Moses And Aaron's Identity

---

## ✅ These Are That Aaron And Moses ... These Are That Moses And Aaron

The text deliberately repeats and confirms, after the genealogy, that this Moses and Aaron are exactly the same men who confronted Pharaoh. The genealogy wasn't a random detour, it was establishing exactly who these two leaders really are.

✅ The genealogy exists specifically to confirm Moses and Aaron's identity and lineage

# Exodus 6:28-30

# 🔁 The Objection Repeats

---

## 🔁 I Am The LORD: Speak Thou Unto Pharaoh King Of Egypt All That I Say Unto Thee

God repeats His command once more, bringing the narrative back to exactly where it left off before the genealogy, preparing to move the story forward into the confrontation with Pharaoh and the plagues.

🔁 The narrative returns to exactly where it paused before the genealogy

---

## 👄 I Am Of Uncircumcised Lips, And How Shall Pharaoh Hearken Unto Me?

Moses repeats his self-doubt about speaking ability once more, word for word similar to his earlier objection, setting up God's patient, repeated reassurance and the plan to work through Aaron, continuing into the next chapter.

👄 Moses repeats the same self-doubt, almost word for word, from earlier

➡️ This sets up God's continued plan through Aaron in the chapter ahead`;

export const EXODUS_SIX_PERSONAL_SECTIONS = parseExodusSixRawNotes(EXODUS_SIX_RAW_NOTES);
