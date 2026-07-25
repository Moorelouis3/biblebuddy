export type GenesisFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFiftyRawNotes(rawText: string): GenesisFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+50:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 50 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+50:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+50:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 50 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 50,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 50:${startVerse}` : `Genesis 50:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 50 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FIFTY_RAW_NOTES = `# Genesis 50:1-3

# 😭 Joseph Mourns His Father

---

## 😭 Joseph Fell Upon His Father's Face, And Wept Upon Him, And Kissed Him

Even as the second most powerful man in Egypt, Joseph's grief is raw and physical, falling on his father's body, weeping, kissing him. Power and position don't dull this loss at all.

😭 Joseph's grief is completely unguarded, despite his high position

---

## 💉 Commanded His Servants The Physicians To Embalm His Father

Embalming was a specialized Egyptian practice meant to preserve a body long-term, normally reserved for Egyptian royalty and nobility. Joseph orders this rare, costly honor for Jacob, a foreign shepherd, showing how deeply Jacob is honored because of Joseph's position.

💉 Embalming was normally reserved for Egyptian royalty and nobility

🏆 Jacob receives this rare honor because of Joseph's high standing

---

## 📅 Forty Days ... Threescore And Ten Days

Forty days was the standard time required for the embalming process itself. Threescore means sixty, so seventy days total, an unusually long formal mourning period, matching the kind of mourning normally given to Egyptian royalty.

📅 Forty days was the standard embalming period in Egyptian practice

🔟 Threescore means sixty, so seventy days of mourning total, a royal-level honor

# Genesis 50:4-6

# 🙏 Joseph Asks Permission To Bury Jacob

---

## 🙏 If Now I Have Found Grace In Your Eyes, Speak, I Pray You, In The Ears Of Pharaoh

Even as one of Egypt's most powerful officials, Joseph doesn't simply leave the country on his own authority. He goes through proper, respectful channels, asking Pharaoh's household to formally request permission on his behalf.

🙏 Joseph follows proper protocol rather than acting on his own authority alone

---

## ⚰️ My Father Made Me Swear ... In My Grave Which I Have Digged For Me

Joseph explains the oath from Genesis 49, that Jacob required a sworn promise to be buried in Canaan, not Egypt. Joseph presents this as a solemn obligation, not merely a personal wish.

⚰️ Joseph frames this as a binding oath, not a casual request

📖 This directly follows through on Jacob's sworn request from chapter 49

---

## ✅ Go Up, And Bury Thy Father, According As He Made Thee Swear

Pharaoh grants permission immediately and respectfully, honoring the seriousness of a sworn oath even though it involves Joseph, Egypt's chief administrator, leaving the country during an ongoing famine.

✅ Pharaoh honors the weight of a sworn oath without hesitation

# Genesis 50:7-9

# 🐎 A Massive Funeral Procession

---

## 👑 All The Servants Of Pharaoh, The Elders Of His House, And All The Elders Of The Land Of Egypt

This is an extraordinary honor: Egypt's own royal officials and elders personally join this funeral procession for a foreign shepherd. Jacob's burial becomes a state-level event because of Joseph's standing.

👑 Egyptian royal officials personally attend a foreign shepherd's funeral

---

## 🏡 Only Their Little Ones, And Their Flocks, And Their Herds, They Left In The Land Of Goshen

The children, livestock, and household goods stay behind in Goshen while the adults travel to Canaan. This was a practical decision, likely for safety and logistics on a long journey, not a lack of respect for Jacob.

🏡 Leaving the children and flocks behind was a practical travel decision

---

## 🐎 Chariots And Horsemen ... A Very Great Company

Military chariots and horsemen escort this procession, both as a mark of honor and as protection for such a large, wealthy traveling group. This is a massive, visible display, not a quiet family burial.

🐎 A military escort marks this as an honored, protected procession

# Genesis 50:10-11

# 🕊️ Mourning At The Threshingfloor Of Atad

---

## 🗺️ The Threshingfloor Of Atad, Which Is Beyond Jordan

The procession takes a route east of the Jordan River rather than a more direct path, possibly to avoid hostile territory along the shorter route. This detour shows real, careful planning for such a large company's safety.

🗺️ The route avoids the most direct path, likely for safety reasons

---

## 😭 A Great And Very Sore Lamentation ... Seven Days

Sore here means intense, severe. The company stops for a full seven days of visible, public mourning before even crossing into Canaan itself, an extended, dramatic display of grief and honor.

😭 Sore means intense or severe

📅 Seven days of public mourning happens even before reaching Canaan

---

## 🏷️ Abel-mizraim, Which Is Beyond Jordan

The Canaanite locals are so struck by the scale of Egyptian mourning that they rename the location Abel-mizraim, meaning "mourning of the Egyptians." Jacob's funeral becomes so significant that it permanently marks the local geography.

🏷️ Abel-mizraim means "mourning of the Egyptians"

🗺️ This event was significant enough to permanently rename the location

# Genesis 50:12-14

# ⚰️ Jacob Is Buried, Joseph Returns

---

## ✅ His Sons Did Unto Him According As He Commanded Them

The brothers follow through completely on Jacob's specific burial instructions from chapter 49, honoring their father's final wishes exactly as he laid them out.

✅ The sons carry out Jacob's exact instructions without deviation

---

## 🏛️ Buried Him In The Cave Of The Field Of Machpelah

This closes the promise made back in Genesis 49: Jacob rests in the same family tomb as Abraham, Sarah, Isaac, Rebekah, and Leah, purchased generations earlier as a permanent foothold in the promised land.

🏛️ Jacob joins Abraham, Isaac, and their wives in the same family tomb

---

## 🔙 Joseph Returned Into Egypt ... After He Had Buried His Father

Joseph keeps his word to Pharaoh completely, returning to Egypt as promised rather than staying in Canaan. Even in grief, Joseph honors both his father's oath and his own commitment to Pharaoh.

🔙 Joseph fulfills both his promise to his father and his promise to Pharaoh

# Genesis 50:15-18

# 😨 The Brothers Fear Joseph's Revenge

---

## 😨 Joseph Will Peradventure Hate Us

Peradventure means perhaps. With Jacob gone, the brothers' old fear resurfaces immediately, worried that Joseph's kindness up to now was only for their father's sake, and that real revenge might still be coming.

😨 Peradventure means perhaps

💭 The brothers assumed Joseph's mercy depended on Jacob still being alive

---

## 📜 Thy Father Did Command Before He Died

The brothers send word claiming Jacob left a specific instruction for Joseph to forgive them. Scripture never actually records Jacob giving this command earlier, which suggests the brothers may be inventing or exaggerating it out of real fear, not necessarily lying maliciously, but desperate.

📜 This claimed deathbed command is never recorded earlier in the text

😰 Genuine fear, more than dishonesty, likely drives this message

---

## 🙏 Forgive The Trespass Of The Servants Of The God Of Thy Father

Trespass means wrongdoing or sin. The brothers plead using covenant language, "the God of thy father," appealing to shared faith, not just family loyalty, as they beg for forgiveness.

🙏 Trespass means wrongdoing or sin

🕊️ Their appeal is framed in shared covenant faith, not just family ties

---

## 🙇 His Brethren Also Went And Fell Down Before His Face

The brothers physically bow before Joseph one final time. This is the last of several bowing scenes across these chapters, each one another quiet fulfillment of Joseph's boyhood dream from Genesis 37.

🙇 This is the final bowing scene, completing Joseph's boyhood dream

# Genesis 50:19-21

# ❤️ Joseph's Famous Forgiveness

---

## ⚖️ Fear Not: For Am I In The Place Of God?

Joseph refuses to act as his brothers' judge, recognizing that vengeance and final judgment belong to God, not to him personally, no matter how much power he holds.

⚖️ Joseph refuses to place himself in God's role as ultimate judge

---

## 🔄 Ye Thought Evil Against Me; But God Meant It Unto Good

This is one of the most quoted verses in the entire Bible. Joseph doesn't pretend his brothers' actions weren't genuinely evil, he names it plainly, "ye thought evil." But he also sees that God worked through that same evil to accomplish good, without excusing the sin itself.

🔄 Joseph names the brothers' sin honestly, without minimizing it

📖 God working good through evil doesn't mean the evil itself wasn't real

---

## 🌍 To Save Much People Alive

Joseph connects his personal story directly to the survival of an entire region during the famine. His years of suffering ultimately became the means of saving countless lives, not just his own family's.

🌍 Joseph's suffering became the means of saving a whole region from famine

---

## 💛 He Comforted Them, And Spake Kindly Unto Them

Joseph doesn't just declare forgiveness in a single formal statement, he follows through with ongoing comfort and gentle words. Real reconciliation shows up in continued kindness, not just a one-time announcement.

💛 Joseph's forgiveness continues in daily kindness, not just one declaration

# Genesis 50:22-23

# 👴 Joseph's Long Life

---

## 🎂 Joseph Lived An Hundred And Ten Years

Living to 110 was considered the ideal, complete lifespan in Egyptian culture, comparable to how some cultures view a perfect "100" today. This detail signals to an Egyptian audience that Joseph's life was seen as fully and completely blessed.

🎂 110 years was considered the ideal, complete lifespan in Egyptian culture

---

## 👶 Ephraim's Children Of The Third Generation ... Upon Joseph's Knees

Joseph lives long enough to see his great-grandchildren. "Brought up upon Joseph's knees" describes a formal custom of a patriarch accepting and blessing descendants as recognized members of the family line, not simply holding a baby.

👶 "Upon Joseph's knees" describes a formal act of accepting descendants into the family

⏳ Joseph lives to see four generations of his own family

# Genesis 50:24-26

# ⚰️ Joseph's Final Words And Death

---

## 🔮 I Die: And God Will Surely Visit You, And Bring You Out Of This Land

Joseph's final recorded words look forward, not backward. He prophesies that God will one day bring the family out of Egypt entirely, directly anticipating the events of the book of Exodus, generations before they happen.

🔮 Joseph prophesies the future Exodus generations before it happens

📖 This promise connects directly to the covenant given to Abraham, Isaac, and Jacob

---

## ⚰️ Ye Shall Carry Up My Bones From Hence

Joseph takes a sworn oath from his family that his bones will eventually be carried out of Egypt and buried in the promised land. This oath is honored generations later, referenced in Exodus 13:19 and finally fulfilled in Joshua 24:32.

⚰️ Joseph's family swears to eventually carry his bones out of Egypt

📖 This exact oath gets fulfilled much later, in Exodus and Joshua

---

## ⚱️ So Joseph Died ... And He Was Put In A Coffin In Egypt

Genesis ends not in the promised land, but with Joseph's body resting in an Egyptian coffin, still waiting for the promise to be completed. The whole book closes on a note of hope still pointing forward, not a fully resolved ending.

⚱️ Genesis ends with the promise still unfulfilled, not fully resolved

➡️ The story deliberately points forward to what Exodus will tell next`;

export const GENESIS_FIFTY_PERSONAL_SECTIONS = parseGenesisFiftyRawNotes(GENESIS_FIFTY_RAW_NOTES);
