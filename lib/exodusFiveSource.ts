export type ExodusFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFiveRawNotes(rawText: string): ExodusFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 5:${startVerse}` : `Exodus 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 5 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FIVE_RAW_NOTES = `# Exodus 5:1-3

# 🗣️ Moses And Aaron Confront Pharaoh

---

## 🎉 Let My People Go, That They May Hold A Feast Unto Me In The Wilderness

Notice the initial request is specifically about worship, a religious feast, not yet a demand for full, permanent freedom. This matches the modest three-day request God described back in chapter 3, testing Pharaoh's response before any larger confrontation.

🎉 The first request is about worship, not yet full, permanent freedom

📖 This matches the modest plan God described back in chapter 3

---

## ❓ Who Is The LORD, That I Should Obey His Voice? I Know Not The LORD

Pharaoh dismisses the LORD outright, treating Him as just another foreign, unfamiliar god with no claim on Egypt's ruler. This arrogant dismissal sets up the dramatic irony of the chapters ahead, where Pharaoh will come to know exactly who the LORD is.

❓ Pharaoh dismisses God as simply unknown and irrelevant to him

🔮 This sets up dramatic irony for everything about to unfold in Egypt

---

## ⚔️ Lest He Fall Upon Us With Pestilence, Or With The Sword

Moses and Aaron add an urgent warning about consequences for disobedience, pestilence meaning deadly disease. This is meant to persuade Pharaoh through fear of consequences, not just simple request.

⚔️ Pestilence means deadly, widespread disease

# Exodus 5:4-5

# 😤 Pharaoh's Dismissive Response

---

## 🏋️ Get You Unto Your Burdens

Pharaoh responds with contempt, treating this entire request as a lazy excuse to skip forced labor rather than a genuine religious matter. He directs his frustration at Moses and Aaron personally for stirring up trouble.

🏋️ Pharaoh treats the request as a lazy excuse, not genuine worship

---

## 📈 The People Of The Land Now Are Many, And Ye Make Them Rest From Their Burdens

Pharaoh repeats the same population anxiety first raised back in chapter 1, worried about Israel's large numbers, now framing any rest from labor as a dangerous threat to Egyptian control.

📈 This repeats Pharaoh's original fear about Israel's population size

# Exodus 5:6-9

# 🧱 Pharaoh Withholds Straw

---

## 🌾 Ye Shall No More Give The People Straw To Make Brick

Straw was mixed into wet mud as a binding material, making mudbricks stronger and easier to form and dry. Removing this vital ingredient without reducing the required output makes the exact same daily quota drastically harder and more time-consuming to meet.

🌾 Straw was mixed into mud bricks as a binding material, essential to production

⏳ The same quota now requires far more time and effort without it

---

## 🔢 The Tale Of The Bricks ... Ye Shall Not Diminish Ought Thereof

Tale here means the counted quota or total number required. Diminish means reduce. Pharaoh demands the workers gather their own straw while still producing the exact same brick count as before, with no allowance for the added difficulty.

🔢 Tale means the required quota or count

📉 Diminish means reduce, and Pharaoh refuses to allow any reduction

---

## 🗯️ Let Them Not Regard Vain Words

Vain words dismisses Israel's request to worship God as empty, meaningless talk. Pharaoh's strategy is deliberate: keep the people so exhausted and overworked that they have no time or energy left to even think about worship or freedom.

🗯️ Pharaoh dismisses their worship request as meaningless, empty talk

🧠 Overwhelming exhaustion is a deliberate strategy to crush hope and resistance

# Exodus 5:10-14

# 😫 The People Scramble For Straw

---

## 🌾 Go Ye, Get You Straw Where Ye Can Find It

The taskmasters relay Pharaoh's order exactly, offering no help finding materials, only the unchanged demand for full production despite this new, added burden.

🌾 The people receive the burden with zero additional support or resources

---

## 🌾 The People Were Scattered Abroad ... To Gather Stubble Instead Of Straw

Stubble means dry, leftover plant stalks left in harvested fields, an inferior substitute for proper straw. The Israelites are forced to spread out across the entire land searching for any usable material at all.

🌾 Stubble is a poor, inferior substitute for real straw

🗺️ The people are scattered across the whole land searching for anything usable

---

## 😣 The Officers Of The Children Of Israel ... Were Beaten

These officers were Hebrew men themselves, appointed by Egyptian taskmasters to directly supervise their own people's work. When quotas inevitably aren't met under these impossible new conditions, these Israelite officers are physically beaten for it, caught painfully between their own people and Egyptian authority.

😣 These Israelite officers are caught between their own people and Egyptian power

⚖️ They're punished personally for conditions completely outside their control

# Exodus 5:15-19

# 📢 The Officers Plead With Pharaoh

---

## 📢 Wherefore Dealest Thou Thus With Thy Servants?

The Israelite officers appeal directly to Pharaoh himself, explaining reasonably that the fault lies with Egypt's own system, not with the workers, hoping for a fair hearing.

📢 The officers make a reasonable, direct appeal straight to Pharaoh

---

## 😠 Ye Are Idle, Ye Are Idle

Pharaoh repeats the accusation of laziness twice for emphasis, flatly refusing to acknowledge any legitimate problem with his own harsh, contradictory demands.

😠 Pharaoh doubles down on blaming the victims rather than his own system

---

## 😔 The Officers ... Did See That They Were In Evil Case

Evil case here means a genuinely desperate, hopeless situation. The officers now fully understand there will be no relief or fair hearing from Pharaoh at all, their appeal has completely failed.

😔 "Evil case" means a truly desperate, hopeless situation

# Exodus 5:20-21

# 😡 The Officers Confront Moses And Aaron

---

## ⚖️ The LORD Look Upon You, And Judge

The frustrated officers turn their anger directly on Moses and Aaron, essentially calling down God's judgment against the very men who came promising deliverance, blaming them for making everything worse instead of better.

⚖️ The officers blame Moses and Aaron rather than Pharaoh for their suffering

---

## 👃 Ye Have Made Our Savour To Be Abhorred

Savour here means reputation or standing, like a smell that lingers. The officers accuse Moses and Aaron of making Israel even more hated and despised in Pharaoh's eyes than before, putting the whole people in greater danger.

👃 Savour means reputation, like the lingering impression of a smell

😬 The officers believe things have only grown worse since Moses arrived

# Exodus 5:22-23

# 🙏 Moses Cries Out To God

---

## 🙏 Lord, Wherefore Hast Thou So Evil Entreated This People?

Moses brings his raw, honest frustration directly to God, questioning why things have gotten harder instead of better since he obeyed God's call. This is genuine complaint, not polished, comfortable prayer.

🙏 Moses brings raw, honest frustration directly to God, not polished prayer

---

## 😟 Neither Hast Thou Delivered Thy People At All

Moses voices what looks, from his current perspective, like total failure, no deliverance has happened yet, only increased suffering. This sets up God's reassuring response that opens the very next chapter, that deliverance is still fully underway, even though it doesn't feel like it yet.

😟 From Moses' view in this moment, the mission looks like a total failure

➡️ God's reassuring response comes immediately in the next chapter`;

export const EXODUS_FIVE_PERSONAL_SECTIONS = parseExodusFiveRawNotes(EXODUS_FIVE_RAW_NOTES);
