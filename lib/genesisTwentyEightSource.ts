export type GenesisTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyEightRawNotes(rawText: string): GenesisTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 28:${startVerse}` : `Genesis 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Genesis 28 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_EIGHT_RAW_NOTES = `# Genesis 28:1–9

# 👣 Jacob Sent To Padan-aram

---

## 🙏 Isaac Called Jacob And Blessed Him

Isaac calls Jacob before he leaves.

This blessing is different from the one Jacob received through deception in Genesis 27.

There, Isaac thought he was blessing Esau.

Now Isaac knowingly blesses Jacob.

He accepts that Jacob is the one God has chosen to carry Abraham's covenant.

🙏 Isaac intentionally blesses Jacob

👨‍👦 He now accepts God's plan

📖 Jacob is confirmed as the covenant heir

➡️ Isaac gives Jacob instructions

---

## 🚫 Thou Shalt Not Take A Wife Of The Daughters Of Canaan

Isaac tells Jacob not to marry a Canaanite woman.

This is the same instruction Abraham gave when he sent his servant to find Rebekah.

The concern wasn't race or nationality.

It was worship.

The Canaanites followed false gods, and marrying into those families often led people away from the Lord.

🚫 Do not marry a Canaanite woman

🙏 The concern is remaining faithful to God

📖 Abraham gave Isaac the same instruction years earlier

➡️ Isaac tells Jacob where to go

---

## 🏠 Arise, Go To Padan-aram

**Padan-aram** was in Mesopotamia, far to the northeast of Canaan.

This is where Rebekah's family still lived.

Years earlier, Abraham's servant traveled there and found Rebekah for Isaac.

Now Jacob is making the very same journey.

🏠 Padan-aram is Rebekah's homeland

🗺️ Abraham's servant traveled there in Genesis 24

👣 Jacob now follows the same path

➡️ Isaac tells him exactly where to stay

---

## 👨 To The House Of Bethuel Thy Mother's Father...Take Thee A Wife Of The Daughters Of Laban Thy Mother's Brother

Bethuel is Rebekah's father.

Laban is Rebekah's brother.

That makes Laban Jacob's **uncle**.

Isaac tells Jacob to find a wife from among his uncle Laban's daughters.

In that culture, marriages were often arranged within the extended family to preserve family ties and shared faith.

👴 Bethuel is Jacob's grandfather

👨 Laban is Jacob's uncle

💍 Jacob is to marry from his mother's family

➡️ Isaac gives the covenant blessing

---

## 🌱 God Almighty Bless Thee, And Make Thee Fruitful, And Multiply Thee...That Thou Mayest Be A Multitude Of People

Isaac prays that God will continue His promise through Jacob.

**Fruitful** means Jacob's family will continue to grow.

**Multiply thee** means his descendants will become a great nation.

This is the same promise God first gave Abraham.

🌱 God will grow Jacob's family

👨‍👩‍👧‍👦 His descendants will become a great nation

📖 The covenant continues through Jacob

➡️ Isaac passes on Abraham's blessing

---

## 📖 Give Thee The Blessing Of Abraham...To Thee And Thy Seed With Thee...That Thou Mayest Inherit The Land Wherein Thou Art A Stranger

This is the official passing of Abraham's covenant to Jacob.

Isaac is no longer speaking by mistake.

He intentionally gives Jacob:

- 🌎 The land of Canaan
- 👨‍👩‍👧‍👦 The promise of countless descendants
- 🙏 The covenant God made with Abraham

Jacob is now the next covenant bearer.

📖 Isaac confirms Abraham's covenant

🌎 Jacob will inherit the promised land

🙏 God's promises now continue through Jacob

➡️ Jacob leaves home

---

## 🐪 Isaac Sent Away Jacob...And He Went To Padan-aram

Jacob leaves Canaan and begins the long journey north to his uncle Laban's home.

Although Isaac sends him to find a wife, Rebekah also knows this journey will protect Jacob from Esau's plan to kill him.

What everyone expects to be a short trip will actually last about **20 years**.

🐪 Jacob begins his journey

🏃 He is escaping Esau's anger

💍 He is also searching for a wife

➡️ Esau notices what is happening

---

## 👀 When Esau Saw That Isaac Had Blessed Jacob...And Sent Him Away To Padan-aram To Take Him A Wife

Esau notices several things.

He sees that:

- Jacob has received Isaac's blessing.
- Jacob has been sent to find a wife.
- Isaac specifically told Jacob **not** to marry a Canaanite woman.

For the first time, Esau realizes how much his parents disliked his own Canaanite marriages.

👀 Esau pays attention to Isaac's instructions

💡 He realizes his marriages displeased his parents

➡️ Esau tries to fix the problem

---

## 👂 He Gave Him A Charge...Thou Shalt Not Take A Wife Of The Daughters Of Canaan...And Jacob Obeyed His Father And His Mother

A **charge** is a serious instruction or command.

Jacob obeys both Isaac and Rebekah.

He leaves home exactly as they instructed.

This stands in contrast to Esau, who had already ignored his parents' wishes by marrying Hittite women.

👂 A charge is a serious command

✅ Jacob obeys his parents

📖 His obedience continues God's plan

➡️ Esau makes another decision

---

## 💍 Esau Seeing That The Daughters Of Canaan Pleased Not Isaac His Father...Then Went Esau Unto Ishmael, And Took...Mahalath The Daughter Of Ishmael

Esau does **not** divorce his Hittite wives.

The Bible says he took Mahalath **"unto the wives which he had."**

In other words, he **added another wife**.

Mahalath was the daughter of Ishmael, Abraham's son.

That made her **Esau's cousin**, since Ishmael was Isaac's half-brother.

Esau seems to think,

*"If my Canaanite wives upset my parents, maybe marrying someone from Abraham's family will make things better."*

But the problem wasn't simply finding another wife.

He had already ignored his parents' instructions, and adding another wife did not undo those earlier choices.

💍 Esau adds a third wife

👨‍👩‍👧 Mahalath is Ishmael's daughter and Esau's cousin

⚠️ Esau tries to please his parents after the fact

📖 Outward changes cannot undo earlier disobedience

# Genesis 28:10–19

# 🪜 Jacob Has A Dream

---

## 🚶 Jacob Went Out From Beersheba

Jacob leaves **Beersheba**, where Isaac and Rebekah had been living, and begins the long journey toward **Haran**.

Haran was over **500 miles (800 km)** away in Mesopotamia, where Abraham's relatives lived. This is the same place Abraham's servant traveled to find Rebekah years earlier.

Jacob is leaving home to escape Esau and find a wife among his mother's family.

🏃 Jacob leaves home

🌍 Traveling to Haran

👨‍👩‍👦 Going to his mother's relatives

🛤️ Beginning a journey of hundreds of miles

---

## 🌅 He Lighted Upon A Certain Place

"Lighted upon" simply means **he came to** or **arrived at** a certain place.

Jacob was not looking for a special location. Night had fallen, so he stopped to rest because traveling after sunset was dangerous.

What looked like an ordinary campsite would soon become one of the most important places in Jacob's life.

🌅 Jacob arrives at a place to rest

🌙 The sun has set

🏕️ An ordinary place becomes extraordinary

---

## 🌙 He Tarried There All Night

To **tarry** means **to stay** or **remain**.

Jacob spends the entire night there because darkness has fallen.

Without hotels or inns nearby, travelers often slept outdoors during long journeys.

🌙 Jacob spends the night there

🛌 Sleeping outside

🚶 Continuing his journey the next morning

---

## 🪨 He Took The Stones Of That Place

Jacob gathers stones from the ground and uses one as a headrest while he sleeps.

This shows how little he has with him. The grandson of Abraham, who would inherit God's covenant, is sleeping alone in the wilderness with nothing more than a stone beneath his head.

🪨 A stone becomes his pillow

🏕️ Jacob sleeps in the open

🙏 God meets him in the wilderness

---

## 🪜 A Ladder Reached To Heaven

Jacob dreams of a ladder (or stairway) stretching from earth to heaven.

He sees the angels of God continually ascending and descending upon it.

The ladder pictures heaven and earth being connected. The angels show that God is constantly at work, carrying out His will on earth.

Jacob thought he was alone, but God shows him that heaven has been watching over him the entire time.

🪜 A stairway connects heaven and earth

👼 Angels move between heaven and earth

🙌 God is actively working

---

## 👑 I Am The Lord God Of Abraham Thy Father

God speaks directly to Jacob.

He identifies Himself as the God of Abraham and Isaac, confirming that the covenant now continues through Jacob.

Although Abraham was Jacob's grandfather, the Bible often uses the word **father** to refer to ancestors. Likewise, descendants are often called **sons**, even generations later.

God is reminding Jacob that He is the same God who made promises to Abraham and Isaac.

👴 "Father" often means ancestor

📖 The covenant continues

🤝 God now speaks directly to Jacob

---

## 🌎 To Thee Will I Give It

God promises Jacob that the land where he is lying will belong to him and his descendants.

This is the same covenant God gave to Abraham and later confirmed to Isaac.

Here, God confirms that Jacob is now the one through whom the covenant will continue.

🌍 The land is promised to Jacob

📖 The covenant continues through him

👑 Jacob becomes the covenant heir

---

## ⭐ Thy Seed Shall Be As The Dust Of The Earth

God promises that Jacob's descendants will become too numerous to count.

They will spread to the west, east, north, and south.

From Jacob will come the twelve tribes of Israel, King David, and ultimately Jesus Christ, through whom all nations are blessed.

⭐ Countless descendants

🌍 Israel spreads in every direction

✝️ The promise ultimately leads to Christ

---

## 🛡️ I Am With Thee

God gives Jacob a personal promise.

He promises to protect him wherever he goes, bring him safely back to this land, and never leave him until every promise has been fulfilled.

Jacob is leaving home, but he is not traveling alone.

🛡️ God promises protection

🏠 God promises to bring Jacob home

🙏 God will never leave him

---

## 😲 Surely The Lord Is In This Place

Jacob wakes from his dream amazed.

He realizes that God had been present all along, even though he did not know it.

Jacob is not saying God only lives there. He is recognizing that God met him in a place he thought was ordinary.

😲 Jacob is amazed

🙌 God was present all along

👀 God meets people wherever they are

---

## 😨 How Dreadful Is This Place

"Dreadful" here means **awesome**, **holy**, or **filled with reverence**, not frightening in an evil sense.

Jacob is overwhelmed by God's presence.

He calls it "the house of God" and "the gate of heaven" because this is where God revealed Himself to him.

😨 Jacob stands in holy awe

🏛️ God's presence makes the place special

🙏 An ordinary place becomes sacred

---

## 🪨 He Set It Up For A Pillar

Jacob stands the stone upright as a memorial and pours oil on it.

In the Old Testament, pouring oil on something often symbolized setting it apart for God's purposes.

Jacob wants to remember forever what God revealed to him at this place.

🪨 The stone becomes a memorial

🫒 Oil sets it apart

📖 Jacob remembers God's promise

---

## 🏛️ He Called The Name Of The Place Bethel

Jacob renames the place **Bethel**, which means **"House of God."**

Before this, the city had been called **Luz**.

Jacob is not building a new city. He is giving the place a new name because of his encounter with God there.

🏛️ Bethel means "House of God"

📍 The place was formerly called Luz

✨ Jacob renames it after meeting God

# Genesis 28:20–22

# 🤝 Jacob's Vow

---

## 🤝 Jacob Vowed A Vow

A **vow** is a serious promise made to God.

To "vowed a vow" simply means Jacob made a solemn commitment before the Lord.

Unlike a casual promise, a vow was considered sacred. Once someone made a vow to God, they were expected to keep it.

Jacob has just received God's covenant in a dream. Now he responds by making a personal commitment to God.

🙏 A vow is a sacred promise

🤝 Jacob responds to God's promises

⚖️ A vow was expected to be kept

---

## 🍞 If God Will Be With Me

Jacob says,

"If God will be with me...keep me...give me bread to eat and clothing to wear..."

Jacob is asking God to do exactly what He had just promised in the dream.

He is asking for:

- Protection on the journey
- Food to eat
- Clothes to wear
- A safe return home

This is not a request for riches or luxury.

Jacob simply asks God to provide his daily needs.

🛡️ Protection

🍞 Daily food

👕 Clothing

🏠 A safe journey home

---

## 🙏 Then Shall The Lord Be My God

At first glance, this can sound like Jacob is giving God an ultimatum:

"Protect me or You won't be my God."

But that's probably not what's happening.

God had already chosen Jacob and had already promised to bless him.

Jacob is responding in faith to those promises.

In other words, he is saying,

"If God truly does everything He has promised, then I will worship Him for the rest of my life."

This marks a turning point.

Until now, Jacob has known about the God of Abraham and Isaac.

Now Jacob is making that relationship personal.

🙏 Jacob embraces God personally

🤝 He responds to God's promises

❤️ The God of his fathers becomes his God

---

## 🪨 This Stone Shall Be God's House

Jacob is not saying the stone itself is God's house.

He means this place will become a memorial where he met God.

Years later, Bethel would become an important place of worship for Israel because this is where God revealed Himself to Jacob.

The stone stands as a reminder of God's covenant and God's presence.

🪨 A memorial of God's promise

📍 Marking the place where God appeared

🏛️ Bethel becomes a place remembered for worship

---

## 💰 I Will Surely Give The Tenth Unto Thee

Jacob promises that if God blesses him, he will give **one-tenth** (a tithe) of everything God gives him back to God.

A **tenth** means **10 percent**.

This is the first time someone in Scripture personally promises to give God a regular tenth of their increase.

Jacob recognizes that everything he receives ultimately comes from God.

His tithe is an act of worship and gratitude, acknowledging God's provision.

💰 A tenth means 10 percent

🙌 Everything comes from God

❤️ Giving becomes an act of worship and thankfulness`;

export const GENESIS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseGenesisTwentyEightRawNotes(GENESIS_TWENTY_EIGHT_RAW_NOTES);
