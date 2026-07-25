export type ExodusEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusEightRawNotes(rawText: string): ExodusEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 8:${startVerse}` : `Exodus 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 8 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_EIGHT_RAW_NOTES = `# Exodus 8:1-4

# 🐸 The Plague Of Frogs Is Threatened

---

## 🐸 I Will Smite All Thy Borders With Frogs

Frogs were connected to Heqet, an Egyptian goddess of fertility and childbirth, often depicted with a frog's head. This plague turns something Egypt associated with a goddess's blessing into an overwhelming, unbearable curse instead.

🐸 Frogs were linked to Heqet, an Egyptian fertility goddess

🔄 The plague turns a symbol of blessing into an unbearable curse

---

## 🛏️ Into Thine House ... Upon Thy Bed ... Into Thine Ovens, And Into Thy Kneadingtroughs

The plague is described invading every part of daily life, bedrooms, cooking spaces, food preparation. Kneadingtroughs were containers used for mixing bread dough. Nothing in Egyptian domestic life stays untouched.

🛏️ Kneadingtroughs were containers used for mixing bread dough

🏠 The plague reaches into every corner of ordinary daily life, sparing nothing

# Exodus 8:5-7

# 🐸 Frogs Cover The Land

---

## 🐸 The Frogs Came Up, And Covered The Land Of Egypt

The threat becomes reality exactly as described, an overwhelming, visible plague covering the entire nation, following Aaron's action with the rod exactly as God commanded.

🐸 The plague unfolds exactly as threatened, with no delay or reduction

---

## 🔮 The Magicians Did So With Their Enchantments, And Brought Up Frogs

The magicians manage to replicate producing more frogs, which ironically only adds to Egypt's problem rather than solving anything. They can copy the plague, but notably never manage to reverse or remove one.

🔮 The magicians can add to the plague but never once remove or reverse one

# Exodus 8:8-11

# 🙏 Pharaoh Begs For Relief

---

## 🙏 Intreat The LORD, That He May Take Away The Frogs ... I Will Let The People Go

For the first time, Pharaoh directly asks for prayer and offers to release Israel, showing the plague has genuinely broken through his resistance, at least temporarily.

🙏 This is Pharaoh's first genuine request for relief and offer to release Israel

---

## ⏰ Glory Over Me: When Shall I Intreat For Thee?

Moses gives Pharaoh the remarkable opportunity to choose exactly when the frogs will be removed, letting Pharaoh set the timing himself, removing any excuse that the timing was rigged or coincidental.

⏰ Moses lets Pharaoh personally choose the timing, removing any excuse of coincidence

---

## 🌟 That Thou Mayest Know That There Is None Like Unto The LORD Our God

The stated purpose behind letting Pharaoh choose the timing is theological: proving beyond doubt that this power belongs uniquely to the LORD, not chance or Egyptian magic.

🌟 The precise timing itself becomes proof of God's unique power

# Exodus 8:12-15

# 💔 Relief Comes, Then Pharaoh Hardens Again

---

## 💀 The Frogs Died Out Of The Houses, Out Of The Villages, And Out Of The Fields

The frogs don't simply vanish or return to the river as Pharaoh may have expected, they die everywhere at once, creating an entirely new problem out of the plague's removal.

💀 The frogs dying everywhere at once creates a whole new problem

---

## 🤢 They Gathered Them Together Upon Heaps: And The Land Stank

Heaps means large piles. The dead frogs are gathered into massive rotting piles across the land, filling Egypt with an overwhelming stench even after the plague technically ends.

🤢 Heaps means large piles, and the rotting frogs leave a lasting stench

---

## 🪨 When Pharaoh Saw That There Was Respite, He Hardened His Heart

Respite means relief or a break from hardship. The instant the immediate pressure lifts, Pharaoh reverses his promise completely, revealing his earlier offer was driven purely by momentary panic, not any real change of heart.

🪨 Respite means relief, and the instant it comes, Pharaoh breaks his word

😔 This reveals Pharaoh's earlier promise was panic, not genuine change

# Exodus 8:16-19

# 🦟 The Plague Of Lice

---

## 🦟 Smite The Dust Of The Land, That It May Become Lice

Unlike the previous two plagues, this one comes with no advance warning to Pharaoh at all, striking suddenly and without any prior negotiation, converting the very ground of Egypt itself into a source of torment.

🦟 This plague comes without any advance warning, unlike the first two

---

## 🚫 The Magicians Did So ... But They Could Not

For the first time, Egypt's magicians completely fail to replicate a sign at all. Their counterfeit power reaches its clear limit here, unable to match God's power over the smallest details of creation itself.

🚫 This is the first plague the magicians cannot copy at all

⚖️ Egypt's counterfeit power finally hits its clear, visible limit

---

## ✋ This Is The Finger Of God

Even Pharaoh's own magicians are forced to admit this power comes from a real, divine source, calling it "the finger of God," a phrase describing direct, personal divine action. Yet even this admission from his own advisors doesn't move Pharaoh.

✋ "The finger of God" describes direct, personal divine action

😔 Even his own magicians' admission doesn't change Pharaoh's hardened response

# Exodus 8:20-24

# 🪰 The Plague Of Flies

---

## 🪰 I Will Send Swarms Of Flies Upon Thee

The fourth plague returns to giving Pharaoh advance warning, continuing the escalating pattern of pressure and opportunity to repent that runs throughout these confrontations.

🪰 This plague returns to giving Pharaoh advance warning, unlike the lice

---

## 🗺️ I Will Sever ... The Land Of Goshen ... That No Swarms Of Flies Shall Be There

For the first time, God explicitly protects Israel's specific territory from a plague's effects, creating an unmistakable, visible distinction between Egypt's suffering and Israel's safety.

🗺️ This is the first plague to spare Goshen specifically and visibly

---

## ⚖️ I Will Put A Division Between My People And Thy People

This deliberate division proves the plagues aren't random natural disasters affecting everyone equally, they're targeted, purposeful acts distinguishing between Pharaoh's people and God's own covenant people.

⚖️ The targeted division proves these are purposeful acts, not random disasters

---

## 🏚️ The Land Was Corrupted By Reason Of The Swarm Of Flies

Corrupted here means ruined or devastated. The infestation is severe enough to genuinely damage the land and daily life across Egypt, not merely an annoying inconvenience.

🏚️ Corrupted means ruined or devastated, describing real, serious damage

# Exodus 8:25-28

# 🤝 Pharaoh Tries A Partial Compromise

---

## 🏠 Go Ye, Sacrifice To Your God In The Land

Pharaoh offers a compromise, permission to worship, but only while still remaining inside Egypt, rather than actually letting Israel leave as God specifically commanded.

🏠 Pharaoh offers only a partial, compromised version of what God commanded

---

## 🚫 We Shall Sacrifice The Abomination Of The Egyptians ... Will They Not Stone Us?

Moses explains a real danger: the animals Israel would sacrifice were considered sacred in Egyptian religion, and doing so openly in Egypt itself could provoke deadly violence from offended Egyptians.

🚫 Animals sacred to Egyptian religion were exactly what Israel needed to sacrifice

⚠️ Sacrificing them openly in Egypt risked real, deadly violence

---

## 🚶 We Will Go Three Days' Journey Into The Wilderness

Moses firmly restates the original, specific request from chapter 3, refusing to accept Pharaoh's partial compromise as good enough, holding the line on what God actually commanded.

🚶 Moses refuses to accept a partial compromise, holding to God's original command

# Exodus 8:29-32

# 🔁 Deceit Continues

---

## ⚠️ Let Not Pharaoh Deal Deceitfully Any More

Moses directly names the pattern that's already happened twice now, Pharaoh promising release, then reversing it once the pressure lifts, calling it out honestly before agreeing to intercede again.

⚠️ Moses directly names Pharaoh's repeated pattern of deceit before acting again

---

## 🪰 There Remained Not One

Every single fly is removed completely, leaving absolutely no trace of the plague behind, an unmistakably total and complete answer to Moses' prayer.

🪰 The removal is total and complete, not partial or gradual

---

## 🪨 Pharaoh Hardened His Heart At This Time Also, Neither Would He Let The People Go

Exactly as Moses warned, Pharaoh breaks his word yet again the moment relief arrives, continuing the same repeating cycle that will carry through the remaining plagues still to come.

🪨 The exact same cycle repeats again, precisely as Moses had warned`;

export const EXODUS_EIGHT_PERSONAL_SECTIONS = parseExodusEightRawNotes(EXODUS_EIGHT_RAW_NOTES);
