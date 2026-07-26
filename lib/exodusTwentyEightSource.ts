export type ExodusTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyEightRawNotes(rawText: string): ExodusTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 28:${startVerse}` : `Exodus 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 28 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_EIGHT_RAW_NOTES = `# Exodus 28:1-5

# 👑 Garments For Glory And Beauty

---

## 👨‍👦 Aaron Thy Brother... Nadab And Abihu, Eleazar And Ithamar, Aaron's Sons

Every son is named individually before a single garment is even described, making the priesthood personal from the very first verse, not just an office. Nadab and Abihu are named here in honor, the same two sons who stood on the mountain in chapter 24; Leviticus 10 will later record both of them dying for offering "strange fire" in this very priesthood being established for them now.

👨‍👦 Every one of Aaron's sons is named individually before any garment is described

🏔️ Nadab and Abihu already appeared with Moses on the mountain in chapter 24

😔 Leviticus 10 later records both of them dying within this same priesthood

---

## ✨ Holy Garments For Aaron Thy Brother For Glory And For Beauty

**"Glory"** here means weight, dignity, and honor, while **"beauty"** means genuine visual loveliness. Both words are used deliberately: these clothes were never meant to be plain, functional uniforms. They were designed to make the priesthood look as dignified and beautiful as the holy work it represented.

✨ "Glory" means weight and dignity; "beauty" means genuine visual loveliness

🎨 Both qualities were intentional design goals, not accidents

👔 The clothes were meant to visually match the dignity of the priestly work

---

## 🧠 All That Are Wise Hearted, Whom I Have Filled With The Spirit Of Wisdom

"Wisdom" here does not mean intellectual knowledge; it means hands-on skill, the kind of practical craftsmanship needed for fine metalwork, weaving, and engraving. This same phrase reappears in chapter 31 when Bezaleel and Aholiab are named as the specific craftsmen filled with this Spirit-given skill to build these very garments.

🧠 "Wisdom" here means hands-on craftsmanship skill, not intellectual knowledge

🎨 This is skill described as a gift directly from God's Spirit

🔨 Chapter 31 later names Bezaleel and Aholiab as these gifted craftsmen

---

## 👘 A Breastplate, And An Ephod, And A Robe, And A Broidered Coat, A Mitre, And A Girdle

Six specific garments are listed by name here. **"Ephod"** was an apron-like vest; **"broidered coat"** meant an embroidered inner tunic; **"mitre"** was a wrapped turban-style headdress; and **"girdle"** simply meant a sash or belt. Every garment named in this opening list gets its own detailed instructions later in the chapter.

👘 Six named garments are listed here, each detailed later in the chapter

🧥 A broidered coat is an embroidered inner tunic

👳 A mitre is a wrapped, turban-style headdress; a girdle is a sash or belt

# Exodus 28:6-14

# 🥋 The Ephod And Its Onyx Stones

---

## 🎨 They Shall Make The Ephod Of Gold, Of Blue, And Of Purple, Of Scarlet, And Fine Twined Linen, With Cunning Work

The ephod was made from the exact same royal materials, gold thread woven with blue, purple, and scarlet, as the tabernacle's own inner curtains and veil from chapters 26. This was not a coincidence; it visually tied the high priest's body to the sanctuary he served inside, dressing him like a walking piece of the tabernacle itself.

🎨 The ephod used the exact same royal colors as the tabernacle's curtains and veil

🏠 This visually tied the high priest's body to the sanctuary he served in

👤 Aaron effectively wore a piece of the tabernacle on his own body

---

## 🧣 The Curious Girdle Of The Ephod

**"Curious"** is an old word meaning skillfully or carefully made, not strange or odd. This attached, woven band cinched the ephod's front and back panels together at the waist, made of the same gold-and-royal-color thread as the rest of the garment, functioning as both a fastener and a decoration.

🧣 "Curious" here means skillfully made, not strange

🔗 This woven band cinched the ephod's two panels together at the waist

🎨 It was made of the same royal thread as the rest of the ephod

---

## 💎 Two Onyx Stones... Six Of Their Names On One Stone, And The Other Six... On The Other, According To Their Birth

The twelve tribes' names were split evenly across two stones, one on each of Aaron's shoulders, and listed **"according to their birth,"** meaning in actual birth order rather than any later ranking. Every engraving was cut "like the engravings of a signet," meaning as precisely and legibly as an official seal used to stamp legal documents.

💎 Twelve tribe names were split six-and-six across two shoulder stones

📅 They were listed in actual birth order, not later rank or importance

🔏 A signet was an official seal-stamp, showing the engraving demanded real precision

---

## 🥇 Set In Ouches Of Gold... Fasten The Wreathen Chains To The Ouches

**"Ouches"** is an old English word for gold settings or mountings that held a gemstone securely in place, a word that has since disappeared from the language entirely. **"Wreathen work"** describes gold chain twisted or braided like a rope rather than simple linked loops, an intricate decorative technique connecting the shoulder stones to the breastplate below.

🥇 Ouches were gold settings that held a gemstone in place, a now-vanished word

⛓️ Wreathen work means gold twisted or braided like rope, not simple chain links

🔗 These chains physically connected the shoulder stones down to the breastplate

---

## 💪 Aaron Shall Bear Their Names Before The Lord Upon His Two Shoulders For A Memorial

The shoulders are the part of the body associated with carrying weight and strength. By wearing the tribes' names there, Aaron literally carried the burden and identity of the whole nation into God's presence every time he served, a physical picture of representing an entire people rather than himself alone.

💪 Shoulders are associated with carrying weight and bearing burdens

🇮🇱 Aaron physically carried the whole nation's identity into God's presence

🕊️ This pictures the high priest as a representative, not a private individual

# Exodus 28:15-21

# 💎 The Breastplate Of Judgment

---

## ⚖️ The Breastplate Of Judgment... After The Work Of The Ephod

This breastplate gets its name, "of judgment," because it would soon hold the Urim and Thummim, objects used to seek God's direct verdict on national questions. It was made to match the ephod's exact same craftsmanship and materials, keeping the whole priestly outfit visually unified.

⚖️ "Of judgment" refers to its role in seeking God's direct verdicts

🎨 It was made to match the ephod's exact same materials and skill level

👔 This kept the entire priestly outfit visually unified as one set

---

## 📐 Foursquare It Shall Be Being Doubled; A Span Shall Be The Length Thereof

A **"span"** was an ancient measurement, the width of a spread hand from thumb to little finger, roughly nine inches. **"Being doubled"** means the fabric was folded over to form an actual pouch, about nine inches square, which is what allowed the Urim and Thummim to be carried inside it rather than simply pinned to the surface.

📐 A span was the width of a spread hand, roughly nine inches

📦 "Doubled" means the breastplate was folded to form an actual pouch

🎒 That pouch is what let it carry the Urim and Thummim inside

---

## 💠 Four Rows Of Stones: Sardius, A Topaz, And A Carbuncle... Ligure, An Agate, And An Amethyst

Twelve different gemstones were set in four rows of three. Some, like a **sardius** (a deep reddish-orange stone) and a **carbuncle** (an old name for a red garnet-type gem, unrelated to the modern medical term), are reasonably well identified today, while a few others, like the **ligure**, are stones scholars still debate the exact modern identity of after thousands of years.

💠 Twelve gemstones filled four rows of three across the breastplate

🔴 A sardius and a carbuncle were both deep red or reddish-orange stones

❓ A few stones, like the ligure, still have debated exact modern identities

---

## 🏷️ The Stones Shall Be With The Names Of The Children Of Israel, Twelve, According To Their Names... Every One With His Name

Unlike the shoulder stones, which grouped six names together on each stone, here every single tribe received its own individual, dedicated gem. The shoulders carried the nation as one united burden; the breastplate carried each tribe as its own distinct, named identity.

🏷️ Each tribe here got its own separate, individually engraved stone

💪 The shoulder stones grouped names together; the breastplate kept them distinct

🇮🇱 Together the two pictures show Israel as both one people and twelve names

# Exodus 28:22-30

# 🔗 Binding The Breastplate To The Ephod

---

## ⛓️ Two Rings Of Gold... Fasten The Two Wreathen Chains In The Two Ouches, And Put Them On The Shoulderpieces

The top of the breastplate attached to the shoulder stones above by these twisted gold chains, while a second, separate system of rings and cord attached its bottom corners to the ephod's waist below. Two independent attachment points, top and bottom, kept the whole piece locked firmly in place rather than swinging loose.

⛓️ Gold chains attached the breastplate's top corners to the shoulder stones

🔗 A separate ring-and-cord system anchored its bottom corners as well

🔒 Two independent attachment points kept it locked firmly in place

---

## 🎗️ A Lace Of Blue, That It May Be Above The Curious Girdle Of The Ephod, And That The Breastplate Be Not Loosed From The Ephod

A **"lace"** here simply means a cord or ribbon. The text states outright why all this engineering mattered: so the breastplate could never come loose or fall off during service, showing real, practical concern for how this sacred object would actually be worn and used, not just how it would look on paper.

🎗️ A "lace" here simply means a cord or ribbon

🛠️ The text explains its purpose directly: keeping the breastplate from falling off

👔 This reflects practical concern for real use, not just appearance

---

## ❤️ Aaron Shall Bear The Names Of The Children Of Israel In The Breastplate Of Judgment Upon His Heart... For A Memorial Before The Lord Continually

Where the shoulders pictured strength and burden-bearing, the heart pictures something different: intimate care and love. Aaron carried the same twelve names in two places at once, powerfully carried by strength on his shoulders and tenderly held near his heart, at the same time.

❤️ The heart symbolizes intimate care, unlike the shoulders' picture of strength

🔁 The same twelve tribal names appear in both places, worn simultaneously

🤲 Together they picture a priesthood that both carries and cares for its people

---

## 🎲 The Urim And The Thummim... Aaron Shall Bear The Judgment Of The Children Of Israel Upon His Heart Before The Lord Continually

**"Urim"** and **"Thummim"** are Hebrew words often translated roughly as "lights" and "perfections" or "truths." Scripture never describes exactly what they looked like or precisely how they worked, only that they were kept inside the breastplate's pouch and used to seek God's direct guidance on major national decisions, as seen later in Numbers 27:21 and 1 Samuel 28:6.

🎲 Urim and Thummim mean roughly "lights" and "perfections" or "truths"

❓ Scripture never describes their exact appearance or mechanism

📜 Numbers 27 and 1 Samuel 28 both show them used to seek God's direct guidance

# Exodus 28:31-35

# 🔔 The Robe, Bells, And Pomegranates

---

## 💙 The Robe Of The Ephod All Of Blue

Unlike the ephod and breastplate's mix of gold and royal colors, the robe worn underneath was a single, solid blue, the color already associated with heaven and royalty throughout the tabernacle's design. This simpler garment formed the base layer the more elaborate ephod and breastplate were worn over.

💙 The robe was solid blue, unlike the multicolored ephod and breastplate

👑 Blue was already tied to heaven and royalty throughout the tabernacle

👕 It served as the simpler base layer worn underneath the other garments

---

## 🥋 An Hole In The Top Of It... A Binding Of Woven Work... As It Were The Hole Of An Habergeon, That It Be Not Rent

A **"habergeon"** was a coat of chain mail armor. Comparing the robe's neck opening to armor means it was reinforced with a tightly woven binding so it would not tear from being repeatedly pulled on and off over the head, a small but very practical piece of engineering hidden inside a garment otherwise focused on appearance.

🥋 A habergeon was a coat of chain mail armor

🧵 The neck opening was reinforced like armor so it would not tear

🔁 This solved the practical problem of a garment worn on and off constantly

---

## 🍎 Pomegranates Of Blue, And Of Purple, And Of Scarlet, Round About The Hem Thereof; And Bells Of Gold Between Them

Fabric pomegranates and solid gold bells alternated all the way around the robe's lower hem. Pomegranates were a common ancient symbol of fruitfulness and abundance, so this hem visually paired that symbol of a fruitful life with the actual sound of a working bell, both surrounding the priest at every step he took.

🍎 Pomegranates and gold bells alternated all the way around the robe's hem

🌱 Pomegranates were an ancient symbol of fruitfulness and abundance

🔔 Both a visual symbol and an audible sound accompanied every step Aaron took

---

## 🔊 His Sound Shall Be Heard When He Goeth In Unto The Holy Place Before The Lord, And When He Cometh Out, That He Die Not

The bells were not just decoration; they served as an audible safety check. Others waiting outside the Holy Place could hear the priest was still moving inside, still alive, while he ministered in God's presence, since approaching carelessly or unworthily carried real, deadly risk.

🔊 The bells functioned as an audible safety check, not just decoration

👂 Others outside could hear the priest was still alive and moving inside

⚠️ Silence would have been an alarming sign that something had gone wrong

# Exodus 28:36-38

# 🏷️ The Golden Plate

---

## 🥇 A Plate Of Pure Gold, And Grave Upon It... HOLINESS TO THE LORD

A **"plate"** here means a thin, flat sheet of gold, distinct from the thicker settings used elsewhere on the garments. This engraved phrase, "Holiness to the Lord," became one of the most quoted lines associated with the entire tabernacle system, summarizing its whole purpose in three words worn directly on the high priest's forehead.

🥇 A plate is a thin, flat sheet of gold, unlike the thicker gem settings

✍️ "Holiness to the Lord" summarized the tabernacle's whole purpose in three words

🧠 This phrase was worn directly, visibly, on the high priest's forehead

---

## 👳 Put It On A Blue Lace, That It May Be Upon The Mitre; Upon The Forefront Of The Mitre It Shall Be

The gold plate was tied with a blue cord to the front of the mitre, the wrapped turban-style headdress named back in verse 4. Its placement at the very front, at eye level for anyone facing the priest, meant this three-word declaration was the first thing anyone would see when they looked at Aaron's face.

👳 The plate was tied with blue cord to the front of the mitre

👁️ Its front-and-center placement put it at eye level for anyone facing Aaron

🥇 It was designed to be the first thing anyone noticed about him

---

## 🩹 That Aaron May Bear The Iniquity Of The Holy Things... That They May Be Accepted Before The Lord

Even Israel's most sincere gifts and offerings carried some unavoidable flaw in how imperfect people gave them. Remarkably, this verse says Aaron's forehead plate somehow covered that gap, so that flawed gifts, brought with a right heart, could still be accepted by God rather than rejected for their imperfection.

🩹 Even sincere offerings carried unavoidable human flaws in how they were given

🥇 Aaron's forehead plate is described as covering that gap

✅ This let imperfect gifts still be accepted rather than rejected

# Exodus 28:39-43

# 🧵 Garments For All The Priests

---

## 🧵 Embroider The Coat Of Fine Linen, And Thou Shalt Make The Mitre Of Fine Linen, And Thou Shalt Make The Girdle Of Needlework

This verse finishes Aaron's personal set of garments in fine linen and skilled needlework, gathering together several fabric-work terms already introduced earlier in the chapter into one finished outfit, ready to be assembled and worn.

🧵 This finishes Aaron's own personal set of garments in fine linen

🪡 It gathers several fabric-work terms from earlier in the chapter together

👔 Aaron's full outfit is now complete and ready to be worn

---

## 👳 For Aaron's Sons Thou Shalt Make Coats, And Girdles, And Bonnets... For Glory And For Beauty

Ordinary priests, Aaron's sons, received their own coats, sashes, and **"bonnets,"** a simpler style of headdress distinct from Aaron's more elaborate "mitre." Even the vocabulary marks a rank difference: the high priest alone wore a mitre, while the rest of the priestly family wore the plainer bonnet.

👳 Bonnets were a simpler headdress, distinct in name from Aaron's mitre

📊 The different words themselves mark a rank difference between the two roles

✨ Both sets still shared the same purpose: glory and beauty in service

---

## 🕊️ Anoint Them, And Consecrate Them, And Sanctify Them

These three words describe three related but distinct steps of ordination. **"Anoint"** means to pour oil on someone as a sign of appointment; **"consecrate"** means to formally dedicate someone to a specific task; **"sanctify"** means to set someone apart as holy. Together they move a man from ordinary life into a fully set-apart priestly role.

🕊️ Anoint means pouring oil on as a sign of appointment

📜 Consecrate means formally dedicating someone to a specific task

✨ Sanctify means setting someone apart as holy

---

## 🩲 Linen Breeches To Cover Their Nakedness... A Statute For Ever Unto Him And His Seed After Him

**"Breeches"** were simple linen undergarments, and **"loins"** and **"thighs"** describe where they covered. This detail connects back to Exodus 20:26, which had already banned altar steps specifically to prevent any accidental exposure; even underwear was treated as a serious, permanent requirement, "a statute for ever," for approaching God's presence without shame.

🩲 Breeches were simple linen undergarments covering the lower body

🚫 This connects back to Exodus 20:26, which already banned exposing altar steps

📜 Even this detail was made a permanent, unchanging requirement`;

export const EXODUS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseExodusTwentyEightRawNotes(EXODUS_TWENTY_EIGHT_RAW_NOTES);
