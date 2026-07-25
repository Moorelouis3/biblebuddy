export type GenesisFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyNineRawNotes(rawText: string): GenesisFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+49:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 49 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+49:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+49:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 49 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 49,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 49:${startVerse}` : `Genesis 49:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Genesis 49 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_NINE_RAW_NOTES = `# Genesis 49:1-2

# 📢 Jacob Gathers His Sons

---

## 📢 Gather Yourselves Together, That I May Tell You That Which Shall Befall You In The Last Days

Jacob, dying, calls all twelve sons together for a final message. "The last days" here means the future generally, what's coming for each of their tribal lines, not necessarily the end of the world. This is prophecy about their descendants' futures, not just fatherly advice.

📢 "The last days" refers to the future ahead for each tribe, not the end of the world

🔮 What follows is prophetic, not just personal blessing

---

## 👂 Hearken Unto Israel Your Father

Hearken means listen carefully. Jacob is called both by his birth name and his covenant name, Israel, in the same short passage, reminding the sons that this moment carries the weight of the whole covenant story, not just family history.

👂 Hearken means listen carefully

📖 Being called "Israel" here ties this moment to God's covenant with the whole family

# Genesis 49:3-4

# 👴 Reuben Loses His Birthright

---

## 👑 My Firstborn, My Might ... The Excellency Of Dignity, And The Excellency Of Power

Jacob acknowledges Reuben's rightful status: firstborn son, meaning he should have received a double inheritance and the family's leadership. Jacob names exactly what Reuben was entitled to before explaining why he won't receive it.

👑 As firstborn, Reuben should have received double inheritance and leadership

---

## 🌊 Unstable As Water, Thou Shalt Not Excel

This is an old idiom describing someone who can't be relied on, shifting and uncontrolled like water instead of solid like a rock. Because of this instability, Jacob says Reuben will not "excel," meaning he won't rise to the leadership his birth order should have given him.

🌊 "Unstable as water" describes someone unreliable, not physically weak

📉 Reuben forfeits the leadership his birthright should have given him

---

## 🛏️ Thou Wentest Up To Thy Father's Bed ... He Went Up To My Couch

This is a direct reference to Reuben's affair with Bilhah, Jacob's concubine, back in Genesis 35:22. Jacob never confronted it directly at the time, but here, at the very end of his life, the consequence finally arrives. Reuben's actions, not an accident of fate, cost him his birthright.

🛏️ This recalls Reuben's affair with Bilhah from Genesis 35:22

⚖️ The consequence for this sin arrives decades later, but it does arrive

# Genesis 49:5-7

# ⚔️ Simeon And Levi Are Cursed For Violence

---

## ⚔️ Instruments Of Cruelty Are In Their Habitations

Jacob describes Simeon and Levi as men whose homes are filled with tools of violence. This isn't a compliment about strength, it's a warning about their character.

⚔️ Jacob describes Simeon and Levi as defined by violence, not honored for it

---

## 🩸 In Their Anger They Slew A Man, And In Their Selfwill They Digged Down A Wall

This directly references the massacre at Shechem in Genesis 34, when Simeon and Levi killed the men of an entire city in revenge for their sister Dinah's assault. Selfwill here means stubborn, uncontrolled willfulness, acting on their own fury without restraint.

🩸 This recalls the massacre at Shechem from Genesis 34

😤 Selfwill means stubborn, uncontrolled willfulness

---

## 🌪️ Cursed Be Their Anger ... I Will Divide Them In Jacob, And Scatter Them In Israel

Jacob pronounces that Simeon and Levi's descendants won't receive a single unified territory like the other tribes, they'll be scattered. This literally comes true: Simeon's territory ends up absorbed inside Judah's land, and Levi's descendants become priests scattered among all the other tribes with no land of their own.

🌪️ Both tribes end up scattered rather than holding one unified territory

📖 Levi's "scattering" later becomes the priesthood, spread through Israel to serve every tribe

# Genesis 49:8-12

# 🦁 Judah Receives The Royal Blessing

---

## 🙌 Judah, Thou Art He Whom Thy Brethren Shall Praise

Judah's own name sounds like the Hebrew word for "praise." Jacob's blessing plays directly on Judah's name, promising that his brothers will one day honor and follow him.

🙌 Judah's name itself sounds like the Hebrew word for "praise"

---

## ✋ Thy Hand Shall Be In The Neck Of Thine Enemies

This pictures total military victory, a hand on the back of a defeated enemy's neck. Jacob is prophesying that Judah's descendants will conquer and hold real power among the tribes.

✋ This pictures complete victory over enemies in battle

---

## 🦁 Judah Is A Lion's Whelp ... He Couched As A Lion

Whelp means a young lion cub. Jacob pictures Judah's tribe growing from a young lion into a full, powerful lion, feared and respected, resting confidently because no one dares provoke it.

🦁 Whelp means a young lion cub

👑 The lion becomes a lasting royal symbol connected to Judah's tribe

---

## 👑 The Sceptre Shall Not Depart From Judah, Nor A Lawgiver From Between His Feet

A sceptre is a ceremonial staff symbolizing royal authority. Jacob is prophesying that kingship will belong to Judah's tribal line specifically. This comes true centuries later when David, from the tribe of Judah, becomes king of Israel.

👑 A sceptre is a staff symbolizing royal authority

📖 This prophecy is fulfilled when King David, from Judah's tribe, takes the throne

---

## ✨ Until Shiloh Come; And Unto Him Shall The Gathering Of The People Be

This is one of the most significant messianic prophecies in the whole Old Testament. Shiloh is widely understood to point toward a future ruler, ultimately fulfilled in Jesus, who Christians believe descended from the tribe of Judah, to whom "the gathering of the people" would belong. Jacob is prophesying kingship not just for a season, but ultimately arriving in one final, permanent ruler.

✨ Shiloh points toward a future ruler that Christians identify with Jesus

📖 This is one of the clearest messianic prophecies in the book of Genesis

---

## 🍷 He Washed His Garments In Wine ... His Eyes Shall Be Red With Wine, And His Teeth White With Milk

This poetic imagery pictures overwhelming abundance, wine and milk so plentiful that Judah's territory could practically wash clothes in it. This is a picture of a rich, fertile, prosperous inheritance for Judah's tribe.

🍷 This imagery pictures extreme abundance and prosperity, not literal washing

# Genesis 49:13-15

# ⚓ Zebulun And Issachar

---

## ⚓ Zebulun Shall Dwell At The Haven Of The Sea ... An Haven Of Ships

Haven means a harbor or safe port. Jacob prophesies that Zebulun's tribe will settle near the coast and become associated with maritime trade and shipping, bordering Zidon, a well-known Phoenician trading city.

⚓ Haven means a harbor, a safe place for ships

🌊 Zebulun's tribe is tied to coastal trade and shipping

---

## 🐴 Issachar Is A Strong Ass Couching Down Between Two Burdens

This pictures a strong, hardworking pack animal that settles down to carry heavy loads rather than resist them. Jacob is describing Issachar's tribe as capable and strong, but content to work rather than fight for dominance.

🐴 This imagery pictures a strong worker who accepts heavy labor rather than resisting it

---

## 🏞️ He Saw That Rest Was Good ... Became A Servant Unto Tribute

Issachar's tribe is prophesied to value peaceful, comfortable land so much that they'll accept paying tribute, a kind of tax or submission payment, rather than fight to remain fully independent. Comfort wins out over conquest for this tribe.

🏞️ Issachar's tribe chooses comfortable land over fighting for full independence

💰 Tribute means a required payment made in submission to another power

# Genesis 49:16-18

# 🐍 Dan's Cunning Strength

---

## ⚖️ Dan Shall Judge His People, As One Of The Tribes Of Israel

Dan's name means "judge" in Hebrew. Jacob's blessing plays on Dan's own name, promising that his tribe will hold real authority and leadership, standing as a full equal among the tribes of Israel.

⚖️ Dan's name itself means "judge" in Hebrew

---

## 🐍 Dan Shall Be A Serpent By The Way, An Adder In The Path

An adder is a venomous snake. Jacob pictures Dan's tribe as small but dangerous, striking unexpectedly rather than fighting head-on, using cunning and surprise rather than raw size or strength.

🐍 An adder is a venomous snake

🎯 This imagery pictures cunning, unexpected strikes rather than open, large-scale battle

---

## 🙏 I Have Waited For Thy Salvation, O LORD

In the middle of these tribal prophecies, Jacob suddenly breaks into direct prayer. This short, personal cry shows that even while speaking prophetically about the future, Jacob's heart is still fixed on God's ultimate rescue and faithfulness, not just his sons' futures.

🙏 Jacob briefly interrupts the tribal blessings with a direct, personal prayer

💛 Even at the point of death, Jacob's hope rests in God's salvation, not his own sons

# Genesis 49:19-21

# 🛡️ Gad, Asher, And Naphtali

---

## 🛡️ Gad, A Troop Shall Overcome Him: But He Shall Overcome At The Last

Jacob predicts Gad's tribe will face real attacks and setbacks, but ultimately come out victorious in the end. This is a picture of resilience, surviving hardship rather than avoiding it entirely.

🛡️ Gad's tribe is prophesied to face setbacks but ultimately triumph

---

## 🍞 Out Of Asher His Bread Shall Be Fat, And He Shall Yield Royal Dainties

Dainties means fine, delicious foods, the kind fit for a king's table. Jacob prophesies that Asher's tribal land will be especially rich and fertile, producing food good enough to supply royalty.

🍞 Dainties means fine foods fit for royalty

🌾 Asher's tribe is tied to unusually rich, fertile land

---

## 🦌 Naphtali Is A Hind Let Loose: He Giveth Goodly Words

A hind is a female deer, known for grace and swiftness. Jacob pictures Naphtali's tribe as free, graceful, and articulate, associated with beautiful, skillful speech.

🦌 A hind is a female deer, symbolizing grace and swiftness

🗣️ This imagery connects Naphtali's tribe with eloquent, skillful speech

# Genesis 49:22-26

# 🌳 Joseph Receives The Richest Blessing

---

## 🌳 Joseph Is A Fruitful Bough ... Whose Branches Run Over The Wall

A bough is a tree branch. Jacob pictures Joseph as a tree planted right by a water source, so fruitful that its branches spread out beyond any wall meant to contain it. This pictures blessing so large it can't be confined or limited.

🌳 A bough is a tree branch

💧 Being planted "by a well" pictures constant access to life-giving provision

---

## 🏹 The Archers Have Sorely Grieved Him, And Shot At Him, And Hated Him

This pictures real, painful attacks against Joseph, fitting his actual life story: his brothers' betrayal, Potiphar's wife's false accusation, and years of unjust imprisonment. Jacob doesn't skip over Joseph's suffering, he names it directly inside the blessing.

🏹 This imagery reflects Joseph's real betrayals and hardships throughout his life

📖 The blessing doesn't erase Joseph's suffering, it acknowledges it directly

---

## 💪 His Bow Abode In Strength ... By The Hands Of The Mighty God Of Jacob

Despite every attack, Joseph's strength held firm, and Jacob credits this directly to God, not to Joseph's own willpower or cleverness. Every hardship Joseph survived, he survived because of God's power working through him.

💪 Joseph's endurance through hardship is credited directly to God's strength

---

## 🐑 The Shepherd, The Stone Of Israel

These are two powerful titles for God tucked into Joseph's blessing: a shepherd who guides and protects, and a stone, meaning a firm, unshakable foundation. Both titles describe exactly what God had been for Joseph through every twist of his story.

🐑 Shepherd and stone are both titles describing God's protection and steadiness

---

## 🌌 Blessings Of Heaven Above, Blessings Of The Deep That Lieth Under, Blessings Of The Breasts, And Of The Womb

Jacob's blessing over Joseph covers every category possible: blessings from the sky above, blessings from the waters below, and blessings of fertility and family. This is the most comprehensive, complete blessing Jacob gives to any of his twelve sons.

🌌 This blessing covers sky, earth, and family fertility, holding nothing back

🏆 Joseph receives the most complete, far-reaching blessing of all twelve sons

---

## 👑 Separate From His Brethren

This phrase describes Joseph as set apart from his brothers, both through his unique suffering and his unique exaltation. His story never matched theirs, and his blessing reflects that his path was always distinct.

👑 Joseph's entire story set him apart from his brothers' path, for better and worse

# Genesis 49:27-28

# 🐺 Benjamin And The Twelve Tribes

---

## 🐺 Benjamin Shall Ravin As A Wolf: In The Morning He Shall Devour The Prey, And At Night He Shall Divide The Spoil

Ravin means to hunt and devour ravenously. Jacob pictures Benjamin's tribe as fierce and warlike, constantly active from morning to night. This proves accurate later in Israel's history, Benjamin's tribe produces notably skilled warriors, including Israel's first king, Saul.

🐺 Ravin means to hunt and devour ravenously

⚔️ Benjamin's tribe later becomes known for skilled warriors, including King Saul

---

## 📜 All These Are The Twelve Tribes Of Israel ... Every One According To His Blessing He Blessed Them

The narrator confirms that each son received a blessing suited specifically to him, not a generic, identical message repeated twelve times. This entire chapter is personal prophecy, tailored individually to each son's own character and future.

📜 Each blessing was personally suited to that specific son, not generic or repeated

# Genesis 49:29-33

# ⚰️ Jacob's Final Instructions And Death

---

## ⚰️ I Am To Be Gathered Unto My People: Bury Me With My Fathers

"Gathered unto my people" is an old idiom for death, picturing reunion with ancestors who died before. Jacob's very last instructions are about where his body should rest, showing how much the promised land still mattered to him at the very end.

⚰️ "Gathered unto my people" is an idiom for death and reunion with ancestors

🏡 Jacob's last words are still focused on the promised land, not Egypt

---

## 🏛️ The Cave That Is In The Field Of Machpelah, Which Is Before Mamre

Machpelah was the family burial cave Abraham purchased generations earlier, back in Genesis 23, as a permanent possession in Canaan. Jacob names the exact location precisely, leaving no room for confusion about where he's to be buried.

🏛️ Machpelah was the family tomb Abraham purchased in Genesis 23

---

## 👨‍👩‍👧‍👦 There They Buried Abraham And Sarah ... Isaac And Rebekah ... And There I Buried Leah

Jacob lists exactly who already rests in this family tomb: his grandparents, his parents, and his first wife Leah. Notably absent is Rachel, Joseph and Benjamin's mother, who died and was buried separately near Bethlehem, as explained back in Genesis 35.

👨‍👩‍👧‍👦 Three generations of the covenant family already rest in this one tomb

💭 Rachel is missing from this list because she was buried separately, near Bethlehem

---

## 🤝 The Purchase Of The Field And Of The Cave ... Was From The Children Of Heth

Jacob repeats the detail that this land was legally purchased, not simply claimed, from the Hittites (children of Heth), reinforcing that the family's foothold in the promised land began with an honest, legitimate transaction, not a land grab.

🤝 The family's land claim in Canaan began with a fair, legitimate purchase

---

## 💔 He Gathered Up His Feet Into The Bed, And Yielded Up The Ghost

This describes Jacob's actual death, lying back fully onto the bed and breathing his last breath. After 147 years, dozens of chapters of struggle, deception, wrestling, grief, and eventually reconciliation, Jacob's long story closes quietly and peacefully, surrounded by his sons.

💔 This is a plain, physical description of the moment of Jacob's death

📖 A long, difficult life ends peacefully, with his family gathered around him`;

export const GENESIS_FORTY_NINE_PERSONAL_SECTIONS = parseGenesisFortyNineRawNotes(GENESIS_FORTY_NINE_RAW_NOTES);
