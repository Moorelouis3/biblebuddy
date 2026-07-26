export type ExodusTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentySevenRawNotes(rawText: string): ExodusTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 27:${startVerse}` : `Exodus 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Exodus 27 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_SEVEN_RAW_NOTES = `# Exodus 27:1-8

# 🔥 The Bronze Altar

---

## 📐 An Altar Of Shittim Wood, Five Cubits Long, And Five Cubits Broad... Foursquare... Height Three Cubits

At roughly a foot and a half per cubit, this altar measured about seven and a half feet square and four and a half feet tall. **"Foursquare"** just means square-shaped on all four sides. This is a different altar entirely from the small, gold-covered incense altar described later in chapter 30; this one, covered in brass rather than gold, is the altar of burnt offering, the very first object anyone would meet upon entering the court.

📐 The altar measured about 7.5 feet square and 4.5 feet tall

⬜ "Foursquare" simply means square-shaped on all four sides

🚪 This brass altar is the first object anyone would meet entering the court

---

## 👑 The Horns Of It Upon The Four Corners Thereof... Overlay It With Brass

**"Horns"** were projecting pieces built up at each of the altar's four corners, and they carried real weight in Israel's worship: blood from sin offerings was applied directly to these horns in Leviticus 4, and later in 1 Kings 1:50, a man in danger grabs hold of the altar's horns as a desperate plea for mercy and protection.

👑 Horns were raised projections built at each of the altar's four corners

🩸 Blood from sin offerings was applied directly to these horns

🙏 Later in 1 Kings 1, grabbing the altar's horns becomes a plea for protection

---

## 🍽️ Pans To Receive His Ashes, And His Shovels, And His Basons, And His Fleshhooks, And His Firepans

**"Fleshhooks"** were large forks used to handle meat on the altar, and **"basons"** meant bowls, here used for catching sacrificial blood. Every single tool needed to run this altar day after day, ash removal, blood collection, meat handling, and carrying fire, was specified in advance, all made of the same brass as the altar itself.

🍽️ Fleshhooks were large forks for handling meat on the altar

🥣 Basons meant bowls, here used to catch sacrificial blood

🔧 Every daily-use tool was specified in advance, matching the altar's brass

---

## 🕳️ Hollow With Boards Shalt Thou Make It

Unlike the solid gold ark or mercy seat, this altar was hollow, built from boards rather than solid metal. This matches God's earlier, simpler instruction for altars back in Exodus 20:24-25, and it was likely filled with earth or stones once set up on-site, making it far lighter to transport than a solid block that size would have been.

🕳️ The altar was hollow, built from boards, not a solid block

🔁 This matches the simpler altar instructions already given in Exodus 20

🚚 A hollow design, likely filled on-site, made it far lighter to transport

# Exodus 27:9-13

# 🏛️ The Court's Boundary

---

## 🧵 The Court Of The Tabernacle... Hangings For The Court Of Fine Twined Linen Of An Hundred Cubits Long

At roughly a foot and a half per cubit, this outer courtyard measured about a hundred and fifty feet long on its north and south sides. This fenced-in yard surrounded the entire tabernacle tent and its altar, marking out sacred ground before a worshipper ever reached the tent itself.

🧵 The court's long sides measured roughly 150 feet, using plain white linen

🏛️ This fence surrounded the whole tabernacle tent and its altar

🚧 It marked out sacred ground before anyone even reached the tent

---

## 🥈 Twenty Pillars Thereof And Their Twenty Sockets Shall Be Of Brass; The Hooks Of The Pillars And Their Fillets Shall Be Of Silver

**"Fillets"** were connecting rods or bands that linked the tops of the pillars together, like a rail running along a fence line. The pillars stood in brass sockets at ground level but were finished with silver hooks and fillets above, continuing the same metal gradient already seen throughout the tabernacle's construction.

🥈 Fillets were connecting rods linking the tops of the pillars together

🥉 Pillars stood in brass sockets at ground level, silver-finished above

📊 This continues the same gold-silver-brass gradient seen throughout

---

## 📏 The Breadth Of The Court On The West Side... Fifty Cubits... On The East Side Eastward... Fifty Cubits

At about seventy-five feet, the shorter east and west sides completed a rectangle roughly a hundred and fifty feet by seventy-five feet, twice as long as it was wide. The entrance specifically faced east, the same direction the whole camp of Israel would later organize itself around according to Numbers 2.

📏 The shorter sides measured about 75 feet, forming a 2-to-1 rectangle

🧭 The court's entrance specifically faced east

🏕️ Numbers 2 later organizes Israel's entire camp around this same east-facing layout

# Exodus 27:14-19

# 🚪 The Gate And The Fence

---

## 🚪 The Hangings Of One Side Of The Gate Shall Be Fifteen Cubits... On The Other Side... Fifteen Cubits

Two matching fifteen-cubit screens of plain linen flanked the entrance on either side, each about twenty-two feet long. Combined with the twenty-cubit gate opening between them, this accounts for the full fifty-cubit width already given for the east side back in verse 13.

🚪 Two matching linen screens, each about 22 feet, flanked the entrance

➕ Combined with the gate opening, they account for the full east-side width

🧮 The math from verse 13 checks out exactly across these two verses

---

## 🎨 The Gate Of The Court Shall Be An Hanging Of Twenty Cubits, Of Blue, And Purple, And Scarlet, And Fine Twined Linen, Wrought With Needlework

While the rest of the court's fence was plain white linen, the entrance gate itself burst into the same royal blue, purple, and scarlet colors used on the tabernacle's door and inner veil. In an otherwise plain white boundary wall, this splash of color made the one true entrance impossible to miss from a distance.

🎨 Only the gate used the royal blue, purple, and scarlet colors

⬜ Every other part of the court fence stayed plain white linen

👁️ The color made the one true entrance visible from a distance

---

## 🥈 All The Pillars Round About The Court Shall Be Filleted With Silver; Their Hooks Shall Be Of Silver, And Their Sockets Of Brass

This verse restates the metal pattern for the entire boundary fence: brass sockets touching the ground, silver above at the hooks and connecting fillets. By this point in Exodus, that exact gold-silver-brass gradient has now been applied consistently to the furniture, the walls, and the court itself.

🥈 Brass stayed at ground level, silver above, for every pillar in the court

🔁 This is a direct restatement of the pattern already set for the boards

📊 The gradient now covers furniture, walls, and the outer court alike

---

## 📏 The Height Five Cubits... And Their Sockets Of Brass

At about seven and a half feet, this fence was tall enough to block a casual view in or out, but noticeably shorter than the tabernacle tent rising behind it. The court's boundary was meant to mark off sacred space, not to compete with the tabernacle itself as the visually dominant structure.

📏 The fence stood about 7.5 feet tall, blocking casual outside view

🏠 It was shorter than the tabernacle tent rising behind it

🎯 The fence marked sacred space without competing with the tent visually

# Exodus 27:20-21

# 🕯️ Oil For The Lamp

---

## 🫒 Pure Oil Olive Beaten For The Light, To Cause The Lamp To Burn Always

**"Beaten"** oil describes the purest grade, made from olives gently crushed by hand rather than ground under a heavy millstone, producing the cleanest, clearest-burning fuel available. This oil fueled the golden candlestick built back in chapter 25, finally putting fuel into the lampstand whose shape had already been so carefully specified.

🫒 "Beaten" oil is the purest grade, hand-crushed rather than millstone-ground

💡 This fuel is specifically for the golden candlestick built in chapter 25

✨ It produced the cleanest, clearest-burning light available

---

## 🌙 Aaron And His Sons Shall Order It From Evening To Morning Before The Lord: It Shall Be A Statute For Ever

Verse 21 clarifies what "burn always" in verse 20 actually meant: the lamp was tended nightly, evening to morning, not literally left burning without any human attention around the clock. **"Statute for ever"** means a permanent, standing law, making this nightly duty a fixed responsibility for Aaron's priestly line for all future generations, not a one-time instruction for this first setup.

🌙 "Burn always" is defined here as tended nightly, evening to morning

📜 "Statute for ever" means a permanent, standing law, not a one-time task

👨‍👦 This nightly duty became Aaron's priestly line's ongoing responsibility`;

export const EXODUS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseExodusTwentySevenRawNotes(EXODUS_TWENTY_SEVEN_RAW_NOTES);
