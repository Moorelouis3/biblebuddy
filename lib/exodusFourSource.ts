export type ExodusFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFourRawNotes(rawText: string): ExodusFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 4:${startVerse}` : `Exodus 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 4 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FOUR_RAW_NOTES = `# Exodus 4:1-5

# 🐍 The Rod Becomes A Serpent

---

## 😟 They Will Not Believe Me, Nor Hearken Unto My Voice

Moses raises a real, practical concern: why would Israel simply take his word that God appeared to him with no proof at all. This isn't defiance, it's a legitimate worry about being taken seriously.

😟 Moses raises a genuine, practical concern, not simple defiance

---

## 🐍 Cast It On The Ground ... It Became A Serpent

God gives Moses a miraculous sign using something completely ordinary, his own shepherd's staff. Moses reacts with real fear, fleeing from the very snake God just created, showing this sign genuinely startled him too.

🐍 The sign uses something completely ordinary, Moses' own walking staff

😨 Even Moses is startled by his own miraculous sign

---

## ✋ Take It By The Tail ... It Became A Rod In His Hand

Grabbing a snake by the tail was actually the least safe way to handle it under normal circumstances, making Moses' obedience here an act of real trust despite his fear. The staff returns to normal the moment he obeys.

✋ Grabbing a snake by the tail required real trust, not natural caution

# Exodus 4:6-9

# 🤲 Two More Signs

---

## 🤍 His Hand Was Leprous As Snow

Leprosy was a serious, greatly feared skin disease in the ancient world, often making a person ritually unclean and socially isolated. God gives Moses this vivid, frightening sign, then immediately reverses it, demonstrating power over disease itself.

🤍 Leprosy was a severe, feared disease causing ritual uncleanness and isolation

⚡ God demonstrates power to both cause and instantly reverse the condition

---

## 🔄 It Was Turned Again As His Other Flesh

The instant healing shows this sign wasn't a trick or illusion, it was a real, reversible miracle, proof that the same power that caused the leprosy could just as easily remove it completely.

🔄 The instant reversal proves genuine miraculous power, not illusion

---

## 🩸 The Water ... Shall Become Blood Upon The Dry Land

God provides a third sign in advance, water from the Nile turning to blood, in case the first two signs still aren't convincing enough. This foreshadows the very first plague that will strike Egypt in the chapters ahead.

🩸 This directly foreshadows the first plague still to come in Exodus 7

📈 Three separate signs show God anticipating exactly how much convincing is needed

# Exodus 4:10-12

# 🗣️ Moses Objects: I Am Not Eloquent

---

## 🗣️ I Am Not Eloquent ... Slow Of Speech, And Of A Slow Tongue

Moses raises a second objection, this time about his own speaking ability, describing himself as having some kind of speech difficulty or lack of confident public speaking skill.

🗣️ Moses raises a second, different objection about his speaking ability

---

## 👁️ Who Hath Made Man's Mouth? ... Have Not I The LORD?

God's answer reframes the entire question. The same God who designed human speech, sight, and hearing in the first place is more than capable of working through Moses' specific limitation, whatever it actually was.

👁️ God points out He personally designed human speech and every ability tied to it

---

## 🎓 I Will Be With Thy Mouth, And Teach Thee What Thou Shalt Say

God promises ongoing, real-time help with Moses' speaking, not simply removing the difficulty entirely. The solution is God's continued presence and guidance, not a sudden personality change in Moses himself.

🎓 God promises ongoing help, not necessarily a complete personal transformation

# Exodus 4:13-17

# 😠 Aaron Is Appointed As Moses' Spokesman

---

## 🙏 Send, I Pray Thee, By The Hand Of Him Whom Thou Wilt Send

After multiple objections already answered, Moses essentially asks God to simply choose someone else entirely for this mission. This finally pushes past reasonable concern into genuine reluctance.

🙏 This request moves past legitimate concern into Moses simply not wanting to go

---

## 😠 The Anger Of The LORD Was Kindled Against Moses

This is one of the only times in Scripture that God's anger is described as directly provoked by Moses. Even so, God doesn't withdraw the calling, He adjusts the plan instead, providing Aaron as help rather than abandoning Moses.

😠 God's anger here is real, yet doesn't cancel Moses' calling

🤝 God adapts the plan rather than giving up on Moses entirely

---

## 🗣️ He Shall Be To Thee Instead Of A Mouth, And Thou Shalt Be To Him Instead Of God

Aaron will speak Moses' words publicly, while Moses relays what God tells him privately, creating an unusual chain: God to Moses, Moses to Aaron, Aaron to the people and eventually Pharaoh.

🗣️ This sets up a specific communication chain: God, then Moses, then Aaron

# Exodus 4:18-20

# 🚶 Moses Leaves Midian

---

## 🙏 Let Me Go, I Pray Thee, And Return Unto My Brethren

Moses respectfully asks Jethro's permission before leaving, without revealing the full, extraordinary story of the burning bush yet. He simply frames it as wanting to check on his family's wellbeing back in Egypt.

🙏 Moses asks permission respectfully without yet explaining the full situation

---

## 💀 All The Men Are Dead Which Sought Thy Life

God confirms it's now safe to return, the specific threat from decades earlier, the Pharaoh who wanted Moses executed for killing the Egyptian, is no longer a danger.

💀 The original danger that forced Moses to flee no longer exists

---

## 🐴 Moses Took The Rod Of God In His Hand

The staff Moses has carried simply as a shepherd's tool is now called "the rod of God," marking it as an instrument now dedicated to God's purposes and miraculous signs.

🐴 The same ordinary shepherd's staff is now called "the rod of God"

# Exodus 4:21-23

# ⚖️ Israel Is God's Firstborn Son

---

## 🪨 I Will Harden His Heart, That He Shall Not Let The People Go

God tells Moses in advance that Pharaoh's resistance will be severe and prolonged, part of the larger unfolding confrontation still to come, not a sudden failure of Moses' mission.

🪨 God prepares Moses for a long, difficult confrontation, not a quick success

---

## 👨‍👦 Israel Is My Son, Even My Firstborn

God describes His entire nation using deeply personal, familial language, a firstborn son, His most treasured relationship. This elevates Israel's identity far beyond simply being an enslaved labor force.

👨‍👦 Calling Israel "firstborn son" reflects deep, personal covenant relationship

---

## ⚠️ I Will Slay Thy Son, Even Thy Firstborn

God delivers a specific, direct warning to Pharaoh, tied to the exact language Pharaoh once used against Israel's own sons back in chapter 1. This foreshadows the final, most severe plague still to come.

⚠️ This warning directly foreshadows the tenth and final plague

🔄 It also mirrors Pharaoh's own earlier decree against Israel's baby boys

# Exodus 4:24-26

# 🗡️ The Strange Encounter At The Inn

---

## 🗡️ The LORD Met Him, And Sought To Kill Him

This is one of the most difficult, puzzling passages in the whole Old Testament. The most widely accepted reading connects it to circumcision, the covenant sign God commanded for every male descendant of Abraham back in Genesis 17, which Moses had apparently neglected for his own son.

🗡️ This puzzling passage is widely connected to the covenant sign of circumcision

📖 Circumcision was commanded for every male descendant back in Genesis 17

---

## 🪨 Zipporah Took A Sharp Stone, And Cut Off The Foreskin Of Her Son

Zipporah acts quickly and decisively, performing the circumcision herself in an emergency, addressing what seems to be Moses' failure to keep this covenant sign for his own family before returning to lead God's covenant people.

🪨 Zipporah personally performs the circumcision in an urgent emergency

⚖️ The man about to confront Pharaoh over God's covenant had neglected that same covenant in his own home

---

## 🩸 A Bloody Husband Art Thou To Me

Zipporah's exact words remain debated among scholars, but they clearly connect directly to the blood of the circumcision just performed, marking this as a serious covenant moment, not a minor family incident.

🩸 Zipporah's words connect directly to the covenant blood just shed

# Exodus 4:27-31

# 🙌 Aaron And Moses Unite Israel

---

## 👋 He Went, And Met Him In The Mount Of God, And Kissed Him

Aaron, sent by God, travels out to meet Moses and greets him warmly with a kiss, a mark of genuine brotherly affection after what may have been many years apart.

👋 Aaron's kiss shows genuine warmth after a long separation

---

## 🗣️ Moses Told Aaron All The Words Of The LORD ... And All The Signs

Moses fully briefs Aaron on everything God said and every miraculous sign given, making sure Aaron understands the complete plan before they approach Israel's elders together.

🗣️ Moses ensures Aaron is fully informed before they act together

---

## 🙌 The People Believed ... They Bowed Their Heads And Worshipped

After generations of suffering and silence, Israel finally believes that God has genuinely noticed their affliction, responding with worship. This moment of hope stands in sharp contrast to the harsh confrontation with Pharaoh still to come.

🙌 The people respond with genuine worship after generations of silence

⚖️ This hopeful moment sets up the difficult confrontation with Pharaoh next`;

export const EXODUS_FOUR_PERSONAL_SECTIONS = parseExodusFourRawNotes(EXODUS_FOUR_RAW_NOTES);
