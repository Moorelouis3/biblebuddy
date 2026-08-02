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
## 📐 An Altar Of Shittim Wood, Five Cubits Long, And Five Cubits Broad

**"Shittim"** means acacia, a hard wood that grew across the Sinai desert.

A cubit measured about eighteen inches, close to a man's forearm.

Five cubits long and five cubits broad comes to about seven and a half feet square.

The height of three cubits in this same verse adds up to about four and a half feet tall.

This altar stood first, right where the court began.

🌳 Shittim means acacia, a hard desert wood
📏 A cubit was about eighteen inches
🟫 About seven and a half feet square
📖 This altar stood first, at the entrance

---

## 👑 The Horns Of It Upon The Four Corners Thereof

**"Horns"** were pointed pieces built up at each of the altar's four corners.

They were not decoration.

Blood from sin offerings was applied directly to these horns in Leviticus four.

Later, in First Kings one, a man in danger grabs the altar's horns as a plea for mercy.

The horns turned a piece of furniture into a place of refuge.

👑 Horns rose from the altar's four corners
🩸 Sin offering blood touched these horns directly
🙏 Grabbing the horns became a plea for mercy
📖 The horns doubled as a place of refuge

---

## 🍽️ His Basons, And His Fleshhooks, And His Firepans

**"Basons"** meant bowls, used here to catch the blood of the sacrifice.

**"Fleshhooks"** were large forks for lifting meat off the fire.

**"Firepans"** carried hot coals from place to place.

Every tool needed to run this altar was listed before the altar was even built.

All of them were made of the same brass as the altar itself.

🥣 Basons were bowls that caught the blood
🍴 Fleshhooks were forks for handling meat
🔥 Firepans carried hot coals
📖 Every tool matched the altar in brass

---

## 🕸️ A Grate Of Network Of Brass

**"Grate"** here means a lattice, a metal grid much like a barbecue rack.

It sat inside the hollow altar, letting air reach the fire and ashes fall through.

Four rings were cast onto its corners.

Poles slid through those rings so the altar could be carried without anyone touching the fire itself.

🕸️ A grate was a metal lattice
🔥 It let air reach the fire inside
💍 Four rings were cast onto its corners
📖 Poles let the altar travel without touching fire

---

## 🕳️ Hollow With Boards Shalt Thou Make It

Unlike the solid gold ark, this altar was hollow, built from boards, not a solid block of metal.

That matches the simpler altar instructions God already gave back in Exodus twenty.

It was likely packed with earth or stones once it stood on site.

A hollow altar this size was far lighter to carry than a solid one would have been.

🕳️ The altar was hollow, built from boards
🔁 This matches Exodus twenty's simpler pattern
🪨 It was likely filled with earth on site
📖 A hollow design made it lighter to carry

# Exodus 27:9-13
# 🏛️ The Court's Boundary
---
## 🧵 Hangings For The Court Of Fine Twined Linen Of An Hundred Cubits Long

**"Twined"** linen was thread spun tightly from several strands, stronger than a single loose thread.

A hundred cubits comes to about a hundred and fifty feet.

That was the length of the court's long north and south sides.

This fence surrounded the whole tabernacle tent and its altar.

It marked out sacred ground before anyone ever reached the tent itself.

🧵 Twined linen was thread spun from several strands
📏 About a hundred and fifty feet long
🏛️ This measured the court's long sides
📖 The fence marked sacred ground before the tent

---

## 🥈 Their Fillets Shall Be Of Silver

**"Fillets"** were connecting rods that linked the tops of the pillars, like a rail along a fence.

The pillars themselves stood in sockets of brass, right at ground level.

Above the ground, their hooks and fillets were finished in silver.

That same gold, silver, and brass gradient already ran through the tabernacle's furniture and walls.

Now it reached all the way out to the court's outer fence.

🥈 Fillets were connecting rods linking pillar tops
🥉 Pillars stood in brass sockets at ground level
📊 Hooks and fillets above were finished in silver
📖 The same gradient now reached the outer fence

---

## 🧭 Likewise For The North Side

The north side of the court repeated the exact same measurements as the south.

A hundred cubits of linen, twenty pillars, and twenty brass sockets, just like verse nine.

God did not describe the north side in new detail because it needed none.

Symmetry itself was the instruction.

🧭 The north side matched the south exactly
📐 Same length, same pillars, same sockets
🔁 No new detail was needed to repeat it
📖 Symmetry itself was the instruction

---

## 🌅 The Breadth Of The Court On The East Side Eastward Shall Be Fifty Cubits

Fifty cubits comes to about seventy five feet, the width of the court's shorter sides.

Together with the hundred cubit length already given, the court formed a rectangle.

The east side specifically held the entrance gate.

Numbers two later organizes Israel's entire camp to face this same eastward entrance.

📏 Fifty cubits was about seventy five feet
📐 The court was twice as long as wide
🌅 The east side held the entrance gate
📖 Numbers two later orients the whole camp eastward

# Exodus 27:14-19
# 🚪 The Gate And The Court's Furnishings
---
## 🚪 The Hangings Of One Side Of The Gate Shall Be Fifteen Cubits

Two matching screens of plain linen flanked the entrance, fifteen cubits each.

Fifteen cubits comes to about twenty two feet.

Combined with the twenty cubit gate opening between them, the total reaches fifty cubits.

That matches the width already given for the east side.

🚪 Two linen screens flanked the entrance
📏 Fifteen cubits was about twenty two feet
➕ Screens plus the gate opening equal fifty cubits
📖 The math from verse thirteen checks out

---

## 🎨 An Hanging Of Twenty Cubits, Of Blue, And Purple, And Scarlet

The rest of the court's fence stayed plain white linen.

Only the gate itself burst into blue, purple, and scarlet.

Those were the same royal colors used on the tabernacle's door and inner veil.

In an otherwise plain white boundary, that splash of color marked the one true entrance.

⬜ Every other part of the fence stayed white
🎨 Only the gate used blue, purple, and scarlet
🚪 Those match the tabernacle's door and veil colors
📖 Color made the one true entrance visible

---

## 🔁 All The Pillars Round About The Court Shall Be Filleted With Silver

This verse restates the exact metal pattern already given for the fence.

Brass touched the ground at every socket.

Silver covered every hook and fillet above it.

By this point in Exodus, that same gradient covers the furniture, the walls, and now the court.

🔁 This restates the fence's existing pattern
🥉 Brass touched the ground at every socket
🥈 Silver covered every hook and fillet above
📖 The gradient now covers furniture, walls, and court

---

## 📏 The Height Five Cubits Of Fine Twined Linen

Five cubits comes to about seven and a half feet tall.

That was tall enough to block a casual view in or out.

It was still noticeably shorter than the tabernacle tent rising behind it.

The court marked off sacred space without competing with the tent itself.

📏 About seven and a half feet tall
👁️ That blocked a casual view in or out
🏠 It stood shorter than the tent behind it
📖 The fence marked space without rivaling the tent

---

## 🔨 All The Pins Thereof, And All The Pins Of The Court, Shall Be Of Brass

**"Pins"** were tent stakes, driven into the ground to anchor the ropes and curtains.

Every pin, every tool, and every vessel used anywhere in the tabernacle's service shared the same material.

Nothing here was gold or silver.

Brass was the metal of ground level contact, the parts that touched dirt, wind, and daily wear.

🔨 Pins were tent stakes anchoring ropes and curtains
🧰 Every tool and vessel shared one material
🥉 None of it was gold or silver
📖 Brass belonged to whatever touched the ground

# Exodus 27:20-21
# 🕯️ Oil For The Lamp
---
## 🫒 Pure Oil Olive Beaten For The Light, To Cause The Lamp To Burn Always

**"Beaten"** oil was the purest grade, crushed gently by hand instead of ground under a millstone.

That gentler process kept out the bitter pulp, producing the cleanest burning fuel available.

This oil fueled the golden lampstand built back in chapter twenty five.

The lamp finally had fuel to match its careful design.

🫒 Beaten oil was the purest grade, hand crushed
🕯️ Hand crushing kept the fuel clean burning
💡 This oil fueled the golden lampstand
📖 The lamp finally had fuel for its design

---

## 🌙 Aaron And His Sons Shall Order It From Evening To Morning

Verse twenty said the lamp would **"burn always."**

This verse defines what that actually meant.

The lamp was tended nightly, evening to morning, not left burning unattended around the clock.

**"Statute for ever"** meant a permanent, standing law, not a one time instruction for this first setup.

That made the nightly duty a permanent job for Aaron's family line.

🌙 Burn always meant tended nightly, evening to morning
📜 Statute for ever meant a permanent, standing law
👨‍👦 This duty belonged to Aaron's priestly line
📖 One instruction became a responsibility for every generation`.trim();

export const EXODUS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseExodusTwentySevenRawNotes(EXODUS_TWENTY_SEVEN_RAW_NOTES);
