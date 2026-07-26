export type ExodusTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentySixRawNotes(rawText: string): ExodusTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 26:${startVerse}` : `Exodus 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 26 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_SIX_RAW_NOTES = `# Exodus 26:1-6

# 🧵 The Linen Curtains

---

## 🎨 Ten Curtains Of Fine Twined Linen... With Cherubims Of Cunning Work Shalt Thou Make Them

**"Cunning work"** is an old phrase for highly skilled, artistic craftsmanship, not trickery or deceit. This first, innermost layer of the tabernacle had cherubim actually woven directly into the fabric itself, so the same guardian figures overshadowing the mercy seat in chapter 25 were also built into the walls and ceiling surrounding it, on every side.

🎨 "Cunning work" means expert, artistic craftsmanship, not trickery

👼 Cherubim were woven directly into this innermost layer of fabric

🏠 The same guardian imagery from the mercy seat now surrounds the whole space

---

## 📏 The Length Of One Curtain Shall Be Eight And Twenty Cubits, And The Breadth... Four Cubits

At roughly a foot and a half per cubit, each curtain measured about forty-two feet long and six feet wide. Ten of these curtains, sewn together in two groups of five, formed the entire inner ceiling and wall lining of the tabernacle, an enormous amount of skilled weaving for a people living in tents in the desert.

📏 Each curtain measured roughly 42 feet long and 6 feet wide

🧵 Ten curtains together formed the tabernacle's entire inner lining

🏕️ This was an enormous weaving project for a nomadic desert nation

---

## 🔗 Fifty Taches Of Gold... Couple The Curtains Together... It Shall Be One Tabernacle

**"Taches"** is an old word for clasps or hooks. Fifty golden clasps locked the two sets of five curtains into a single, seamless covering, and the text makes a point of saying the result "shall be one tabernacle," not two halves joined together. Unity, not just decoration, was the goal of this design.

🔗 Taches are clasps or hooks, here made of gold

🧩 Fifty gold clasps joined two sets of curtains into a single seamless whole

☝️ The text specifically emphasizes "one tabernacle," not two halves

# Exodus 26:7-14

# 🐐 The Outer Coverings

---

## 🐐 Curtains Of Goats' Hair... Eleven Curtains Shalt Thou Make

A second, plainer layer went directly over the beautiful linen curtains: coarse goats' hair, the standard material for ordinary desert tents. Notice there are eleven of these instead of ten, one more than the inner layer, and that extra curtain becomes important two verses later.

🐐 Goats' hair was the standard, plain material used for ordinary desert tents

🔢 There are eleven goat-hair curtains, one more than the ten linen curtains

👀 That one extra curtain has a specific purpose coming up next

---

## ➕ Double The Sixth Curtain In The Forefront Of The Tabernacle

**"Forefront"** means the front, facing entrance. That extra eleventh curtain was folded double at the entrance, giving the doorway area extra thickness and coverage where the tent would be handled most and exposed to the weather most directly.

➕ "Forefront" simply means the front-facing entrance

🚪 The extra curtain was folded double specifically at the entrance

🌧️ This gave the most-used, most-exposed area extra protection

---

## 🥉 Fifty Taches Of Brass, And Put The Taches Into The Loops

The clasps joining this second layer were brass, not gold. This matches a pattern already seen with the sanctuary's furniture: gold marks what's closest to God's presence, and brass marks the outer, more exposed layers, even down to the small clasps holding curtains together.

🥉 These clasps were brass, not gold, unlike the inner linen layer's clasps

📉 Brass consistently marks the outer, more exposed layers of the tabernacle

🔁 This is the same gold-to-brass gradient already seen in the furniture in chapter 25

---

## 🐏 Rams' Skins Dyed Red... A Covering Above Of Badgers' Skins

Two more layers went on top of the goats' hair: red-dyed ram hide, then a tough, waterproof outer layer, likely the hide of a sea creature like a dugong, on top of everything. From the inside out, the tabernacle had four total layers, from cherubim-woven linen down to a plain, weatherproof hide roof that gave no hint at all of the glory hidden underneath.

🐏 Two more layers, dyed ram hide and a tough waterproof hide, went on top

🎭 The plain outer layer gave no hint of the beauty hidden inside

✨ Four total layers ran from glorious linen inward to weatherproof hide outward

# Exodus 26:15-25

# 🪵 The Standing Boards

---

## 🪵 Boards For The Tabernacle Of Shittim Wood Standing Up

Underneath all those curtain layers stood the actual walls: solid, upright boards of shittim (acacia) wood, the same rot-resistant desert timber used for the ark and table in chapter 25. This was the structural skeleton the curtains were draped over, not a simple cloth tent held up by poles alone.

🪵 Shittim (acacia) wood boards formed the tabernacle's actual structural walls

🏗️ The curtains were draped over this wooden skeleton, not just poles

🔁 This is the same durable wood already used for the ark and table

---

## 📐 Ten Cubits Shall Be The Length Of A Board, And A Cubit And A Half The Breadth

At roughly a foot and a half per cubit, each board stood about fifteen feet tall and just over two feet wide. Twenty of these boards lined each long side, meaning the finished structure had real height and real walls, not a low, sagging tent.

📐 Each board stood about 15 feet tall and just over 2 feet wide

🧱 Twenty boards lined each of the two long sides of the tabernacle

🏠 The result was a structure with genuine height, not a low, sagging tent

---

## 🔩 Two Tenons Shall There Be In One Board, Set In Order One Against Another

**"Tenons"** are wooden projections carved into the bottom of each board, designed to fit precisely into matching sockets below, the same basic joinery principle still used in fine woodworking today. Every single board had to be shaped to fit its exact place, like puzzle pieces engineered thousands of years before modern tools existed.

🔩 Tenons are wooden pegs carved to fit precisely into sockets below

🧩 Every board was shaped like a puzzle piece to fit its exact spot

🛠️ This is the same basic joinery principle still used in woodworking today

---

## 🥈 Forty Sockets Of Silver Under The Twenty Boards

Each board rested on two silver sockets, meaning the entire wooden frame of God's house literally stood on a foundation of silver. Exodus 30:11-16 later explains where this silver came from: a required "atonement money" collected from every Israelite counted in the census, so the tabernacle's very foundation was funded by money tied to redemption, not general taxation.

🥈 Every board rested on two silver sockets as its literal foundation

💰 Exodus 30 explains this silver came from required "atonement money"

🩸 The tabernacle's foundation was funded by redemption money, not ordinary taxes

# Exodus 26:26-30

# 🔗 The Connecting Bars

---

## 🪵 Bars Of Shittim Wood; Five For The Boards Of The One Side

Long horizontal bars, also of acacia wood, threaded through rings attached to the boards, running the length of each wall to lock the upright boards together side to side. Without these bars, each board would have stood alone; with them, the whole wall became one rigid, connected unit.

🪵 Horizontal bars threaded through rings to connect the boards side to side

🔗 Without these bars, each board would have stood alone and unstable

🧱 Together they turned individual boards into one rigid wall

---

## 🎯 The Middle Bar In The Midst Of The Boards Shall Reach From End To End

**"Midst"** simply means the middle. Unlike the other bars, which may have run in shorter connected sections, this one central bar appears to have run the entire length of each wall in a single piece, hidden from view inside the boards themselves, reinforcing the whole structure at its core.

🎯 "Midst" simply means the middle

📏 This central bar ran the full length of the wall in one piece

👁️ It stayed hidden inside the boards, unseen but structurally essential

---

## ✨ Overlay The Boards With Gold... Overlay The Bars With Gold

Once again, even the hidden bars running inside the wooden frame were covered in gold, just like the unseen inner surface of the ark back in chapter 25. The standard for this house was never "gold where people will see it," but gold throughout, regardless of visibility.

✨ Even the hidden internal bars were covered in gold, not just visible surfaces

🔁 This matches the ark's gold overlay on surfaces no one would ever see

🎯 The standard was gold throughout, not gold only where it would be seen

---

## 📐 Rear Up The Tabernacle According To The Fashion Thereof Which Was Shewed Thee In The Mount

This is the third time this exact instruction repeats almost word for word, after verse 9 of chapter 25 and its own echo there. **"Fashion"** here simply means design or shape. By the third repetition, the point is unmistakable: absolutely nothing about this building's structure was left open to human creativity.

📐 "Fashion" here simply means design or shape

🔁 This is the third near-identical repetition of the same instruction

🛠️ The repetition makes clear nothing here was left to human creativity

# Exodus 26:31-35

# 🚪 The Veil

---

## 🎨 A Vail Of Blue, And Purple, And Scarlet, And Fine Twined Linen Of Cunning Work: With Cherubims Shall It Be Made

**"Vail"** is the old spelling of veil. This curtain used the exact same royal materials and cherubim imagery as the innermost linen layer over the whole tabernacle, marking it as the most sacred barrier inside the building, on the same level of craftsmanship as the walls surrounding the ark itself.

🎨 "Vail" is simply the old spelling of veil

👑 It used the same royal colors and cherubim imagery as the inner tent lining

🚧 This marked it as the most sacred barrier inside the entire structure

---

## 🚧 The Vail Shall Divide Unto You Between The Holy Place And The Most Holy

This single sentence names the tabernacle's two inner rooms. The **"holy place"** was the outer room, where the table and candlestick from chapter 25 stood; the **"most holy"** (also called the Holy of Holies) was the innermost room, containing only the ark, entered by only one man, once a year.

🚧 This verse names the tabernacle's two inner rooms directly

🍞 The "holy place" held the table and candlestick from chapter 25

📦 The "most holy" held only the ark, entered by one man, once a year

---

## 📦 Put The Mercy Seat Upon The Ark Of The Testimony In The Most Holy Place

This confirms exactly where the ark and its golden lid, described back in chapter 25, actually sat once the whole structure was assembled: behind this veil, in total isolation from everyone but the high priest on the Day of Atonement.

📦 This confirms the ark's final resting place inside the completed structure

🔒 It sat in total isolation, hidden by the veil from everyone else

📅 Only the high priest could pass through, and only once a year

---

## ✂️ Compared To The Veil Torn At The Death Of Jesus

Matthew 27:51 records that at the moment Jesus died, "the veil of the temple was rent in twain from the top to the bottom," the later temple's version of this exact curtain. Hebrews 10:19-20 explains the meaning directly: that torn veil pictured a permanently opened way into God's presence, made possible through Christ's body, ending the need for a single yearly, single-man entrance.

✂️ Matthew 27:51 records this same kind of veil tearing at Jesus's death

🕊️ Hebrews 10 explains the tear as open access to God through Christ

🔓 It ended the need for a single yearly, single-priest entrance

# Exodus 26:36-37

# 🚪 The Door Of The Tent

---

## 🪡 An Hanging For The Door Of The Tent... Wrought With Needlework

**"Wrought with needlework"** describes embroidery, but a simpler skill level than the "cunning work" used on the inner veil and linen ceiling. The entrance screen, the part every ordinary Israelite priest would actually see and pass through regularly, used the same rich colors as the veil but with less elaborate craftsmanship than the parts hidden deepest inside.

🪡 "Wrought with needlework" means embroidered work

📉 This was a simpler skill level than the "cunning work" used deeper inside

🚪 The most publicly seen entrance used less elaborate craft than the hidden veil

---

## 🥉 Five Pillars Of Shittim Wood... Sockets Of Brass

These entrance pillars stood on brass sockets, not the silver sockets holding up the tabernacle's side walls. Read together with chapter 25's gold furniture, this chapter's silver-footed walls, and now this brass-footed doorway, the entire structure follows one consistent rule from the first offering listed clear through to the final pillar: gold nearest God, silver in between, and brass at the outer edge where the general public would stand.

🥉 The entrance pillars stood on brass sockets, unlike the silver-footed walls

📊 Gold, silver, and brass mark a consistent gradient from innermost to outermost

🎯 That same gradient was set all the way back in the offering list of chapter 25`;

export const EXODUS_TWENTY_SIX_PERSONAL_SECTIONS = parseExodusTwentySixRawNotes(EXODUS_TWENTY_SIX_RAW_NOTES);
