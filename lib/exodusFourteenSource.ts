export type ExodusFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFourteenRawNotes(rawText: string): ExodusFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 14:${startVerse}` : `Exodus 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 14 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FOURTEEN_RAW_NOTES = `# Exodus 14:1-4

# 🗺️ God's Strategic Positioning

---

## 🗺️ Encamp Before Pi-hahiroth, Between Migdol And The Sea

God gives Moses very specific, named locations for Israel to camp, real, identifiable geography, not a vague wilderness location. This precision shows deliberate strategic planning, not random wandering.

🗺️ God specifies exact, real locations, showing deliberate strategic planning

---

## 🪤 They Are Entangled In The Land, The Wilderness Hath Shut Them In

God predicts exactly what Pharaoh will think, that Israel appears trapped with no escape route, boxed in by geography. This apparent vulnerability is actually intentional bait.

🪤 Israel's apparent vulnerability here is deliberate bait, not a real mistake

---

## 💪 I Will Be Honoured Upon Pharaoh, And Upon All His Host

God states His purpose plainly in advance: this entire situation is engineered to bring one final, decisive display of His power over Pharaoh's entire military force.

💪 This confrontation is deliberately engineered for one final display of God's power

# Exodus 14:5-9

# 🐎 Pharaoh Pursues With His Army

---

## 😠 Why Have We Done This, That We Have Let Israel Go?

Pharaoh's heart shifts yet again, immediately regretting his own decision to release Israel now that the economic and labor loss becomes fully real to him.

😠 Pharaoh instantly regrets releasing Israel once the practical loss sinks in

---

## 🐎 Six Hundred Chosen Chariots, And All The Chariots Of Egypt

Chosen chariots means Egypt's elite, specially selected military units, not just ordinary forces. Pharaoh commits Egypt's very best, most powerful military assets to this pursuit.

🐎 Chosen chariots were Egypt's elite, specially selected military forces

---

## ✋ The Children Of Israel Went Out With An High Hand

This idiom describes Israel leaving boldly and confidently, not sneaking away in fear or shame, but departing openly and triumphantly after everything they'd witnessed.

✋ "An high hand" means leaving boldly and confidently, not in secret or shame

# Exodus 14:10-12

# 😨 Israel's Fear And Complaint

---

## 😨 They Were Sore Afraid: And The Children Of Israel Cried Out Unto The LORD

Trapped between the sea and Pharaoh's approaching army, Israel's fear is genuine and understandable, crying out to God even while also turning to blame Moses in the very next breath.

😨 Israel's terror here is completely understandable, given their trapped position

---

## ⚰️ Because There Were No Graves In Egypt, Hast Thou Taken Us Away To Die

This bitter, sarcastic complaint accuses Moses of leading them to a worse death in the wilderness than anything Egypt could have offered, revealing how quickly fear can distort perspective and gratitude.

⚰️ This sarcastic complaint shows how quickly fear can distort clear thinking

---

## 🔁 Better For Us To Serve The Egyptians, Than That We Should Die In The Wilderness

Facing real danger, some in Israel would rather return to the certainty of slavery than face the uncertainty of freedom, a struggle that will actually repeat itself many more times throughout the wilderness years ahead.

🔁 This tension between slavery's certainty and freedom's risk repeats throughout Exodus

# Exodus 14:13-14

# 🛑 Moses Reassures The People

---

## 🛑 Fear Ye Not, Stand Still, And See The Salvation Of The LORD

Moses responds to panic with calm confidence, urging the people to stop and trust rather than react in fear or try to fight or flee on their own.

🛑 Moses calls for calm trust, not panic-driven action

---

## ⚔️ The LORD Shall Fight For You, And Ye Shall Hold Your Peace

Moses makes clear this battle belongs entirely to God, not to Israel's own military strength, which barely exists at this point. Their role is trust, not combat.

⚔️ This battle belongs entirely to God, since Israel has essentially no army

# Exodus 14:15-18

# 📢 God Instructs Moses

---

## ❓ Wherefore Criest Thou Unto Me? Speak Unto The Children Of Israel, That They Go Forward

God's response is surprising, less prayer, more action. The moment for crying out has passed, now it's time to move forward in faith and obedience.

❓ God calls for forward action now, not more prayer alone

---

## 🌊 Lift Thou Up Thy Rod, And Stretch Out Thine Hand Over The Sea, And Divide It

God gives Moses the specific, physical action required, using the same staff that performed earlier signs throughout the plagues, now used for this culminating, defining miracle.

🌊 The same staff from the plagues now performs this defining, culminating miracle

---

## 💪 I Will Get Me Honour Upon Pharaoh ... That The Egyptians Shall Know That I Am The LORD

God restates His larger purpose one final time, this decisive moment exists to prove His identity and power beyond any possible doubt, to Egypt and to Israel both.

💪 This moment exists to prove God's identity beyond any possible doubt

# Exodus 14:19-20

# ☁️ The Pillar Moves Behind Them

---

## 🕊️ The Angel Of God ... Removed And Went Behind Them

The guiding presence that had been leading Israel now repositions itself protectively behind them instead, standing directly between Israel and the approaching Egyptian army.

🕊️ God's presence repositions itself as a protective barrier, not just a guide

---

## 🌑 A Cloud And Darkness To Them, But It Gave Light By Night To These

Remarkably, the very same pillar produces opposite effects simultaneously, confusion and darkness for the Egyptians, while providing clear light for Israel, an intentional, targeted miracle.

🌑 The same pillar creates darkness for Egypt and light for Israel at once

# Exodus 14:21-22

# 🌊 The Sea Divides

---

## 🌬️ The LORD Caused The Sea To Go Back By A Strong East Wind All That Night

God uses a real, natural mechanism, sustained wind blowing all night long, to accomplish this miracle, again showing His power working through creation rather than bypassing it.

🌬️ God uses a real, sustained natural wind to accomplish this defining miracle

---

## 🧱 The Waters Were A Wall Unto Them On Their Right Hand, And On Their Left

The water doesn't simply part and drain away, it stands upright like solid walls on either side, an image of miraculous, structural stability defying normal physics entirely.

🧱 The water stands like structural walls, not simply draining away

# Exodus 14:23-25

# 😰 The Egyptians Follow Into The Sea

---

## 🐎 The Egyptians Pursued, And Went In After Them To The Midst Of The Sea

Pharaoh's entire army follows Israel directly into the seabed itself, walking straight into the exact trap God had described from the very beginning of this chapter.

🐎 Pharaoh's army walks directly into the trap God described from the start

---

## 🎡 Took Off Their Chariot Wheels, That They Drave Them Heavily

God disables Egypt's most powerful military technology, their chariots, at exactly the critical moment, turning their greatest strength into a helpless liability.

🎡 God disables Egypt's chariots, its greatest military strength, at the crucial moment

---

## 🏳️ Let Us Flee From The Face Of Israel; For The LORD Fighteth For Them

Even the Egyptian soldiers themselves recognize what's actually happening, this isn't Israel's own military strength, it's God Himself fighting directly against them.

🏳️ Even Egyptian soldiers recognize this is God fighting, not Israel's own strength

# Exodus 14:26-29

# 💀 The Sea Returns

---

## 🌊 The Sea Returned To His Strength ... The LORD Overthrew The Egyptians

The same water that stood as protective walls now becomes the very instrument of Egypt's complete military destruction, closing in exactly when God commands it.

🌊 The same protective walls become the instrument of Egypt's total destruction

---

## 💀 There Remained Not So Much As One Of Them

The devastation of Pharaoh's pursuing army is total and complete, not a single soldier survives this final confrontation, ending Egypt's military threat to Israel entirely.

💀 The destruction is completely total, with no survivors from the pursuing army

---

## 🚶 The Children Of Israel Walked Upon Dry Land In The Midst Of The Sea

While Egypt's army drowns completely, Israel walks through on genuinely dry ground the entire time, the same miraculous path protecting them from beginning to end.

🚶 Israel crosses on dry ground throughout, while Egypt's army is completely destroyed

# Exodus 14:30-31

# 🙌 Israel Believes

---

## 👀 Israel Saw The Egyptians Dead Upon The Sea Shore

Israel doesn't just hear about their enemy's defeat secondhand, they see it directly with their own eyes, undeniable, visible proof of God's complete deliverance.

👀 Israel witnesses their complete deliverance directly, not just by report

---

## 🙏 The People Feared The LORD, And Believed The LORD, And His Servant Moses

This moment produces genuine faith in both God and Moses' leadership, a high point of trust that, as later chapters will show, doesn't yet last as consistently as this verse might suggest.

🙏 This is a genuine high point of faith, though it won't remain constant

🔮 Later wilderness chapters will show this trust wavering again and again`;

export const EXODUS_FOURTEEN_PERSONAL_SECTIONS = parseExodusFourteenRawNotes(EXODUS_FOURTEEN_RAW_NOTES);
