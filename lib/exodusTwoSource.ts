export type ExodusTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwoRawNotes(rawText: string): ExodusTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 2:${startVerse}` : `Exodus 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 2 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWO_RAW_NOTES = `# Exodus 2:1-4

# 🧺 Moses Is Hidden And Set Adrift

---

## 👨‍👩‍👦 A Man Of The House Of Levi ... A Daughter Of Levi

Moses' parents aren't named yet here, though later in Exodus 6 they're identified as Amram and Jochebed. Both come from the tribe of Levi, meaning Moses is born into the very tribe that will later become Israel's priesthood.

👨‍👩‍👦 Moses' parents, unnamed here, are later identified as Amram and Jochebed

📖 Moses is born into the tribe of Levi, Israel's future priestly line

---

## 👶 A Goodly Child ... She Hid Him Three Months

Goodly here means healthy, fine-looking. Moses' mother defies Pharaoh's decree to drown every Hebrew son by hiding him at great personal risk for three full months, as long as concealment was physically possible.

👶 Goodly means healthy or fine-looking

🛡️ Hiding Moses was a direct, ongoing act of defiance against Pharaoh's decree

---

## 🧺 An Ark Of Bulrushes ... Daubed It With Slime And With Pitch

Bulrushes were reed plants used to weave a small floating basket. Daubed means coated or sealed. Slime and pitch are tar-like waterproofing materials. The Hebrew word used for this "ark" is the same word used for Noah's ark in Genesis, both are vessels that carry someone through danger to safety.

🧺 Bulrushes are reed plants woven into a small basket

🌊 The same Hebrew word describes both Moses' basket and Noah's ark

---

## 👧 His Sister Stood Afar Off, To Wit What Would Be Done To Him

To wit means to find out or learn. Moses' sister, later revealed to be Miriam, watches from a safe distance, ready to act the moment an opportunity appears. The family doesn't simply abandon Moses to chance.

👧 To wit means to find out or learn

🎯 The family has a careful, watching plan, not just a desperate gamble

# Exodus 2:5-6

# 👑 Pharaoh's Daughter Finds The Baby

---

## 🚿 The Daughter Of Pharaoh Came Down To Wash Herself At The River

The very river Pharaoh commanded to be used for drowning Hebrew infants back in chapter 1 becomes, in a striking reversal, the exact place his own daughter rescues one of those infants instead.

🚿 The river meant for death becomes the place of rescue instead

🔄 This is a sharp, ironic reversal of Pharaoh's own decree

---

## 💛 She Had Compassion On Him, And Said, This Is One Of The Hebrews' Children

Pharaoh's daughter immediately recognizes the baby as Hebrew, likely from something distinctive in his appearance or the type of basket, yet chooses compassion over reporting him, directly defying her own father's command.

💛 Pharaoh's own daughter chooses mercy over obeying her father's decree

# Exodus 2:7-10

# 👩‍👦 Moses Is Named And Nursed By His Own Mother

---

## 🗣️ Shall I Go And Call To Thee A Nurse Of The Hebrew Women

Moses' sister steps forward with a bold, clever suggestion, offering to find a Hebrew nurse, setting up a plan to reunite Moses with his own mother without revealing the family connection to Pharaoh's daughter.

🗣️ Moses' sister engineers a way to reunite him with his own mother

---

## 💰 Take This Child Away, And Nurse It For Me, And I Will Give Thee Thy Wages

In an extraordinary turn, Moses' own mother ends up being paid by Pharaoh's own household to nurse and raise her own son during his earliest years, before he's eventually brought to live in the palace.

💰 Moses' mother is paid by Egypt's royal household to raise her own child

---

## 🏷️ She Called His Name Moses: Because I Drew Him Out Of The Water

The name Moses sounds like the Hebrew word meaning "to draw out." Pharaoh's daughter names him for the very act of pulling him from the river, a name that will later describe exactly what Moses does for his entire people.

🏷️ Moses' name is connected to the Hebrew word for "drawing out"

🔮 This name foreshadows Moses drawing his whole people out of Egypt later

# Exodus 2:11-12

# ⚔️ Moses Kills An Egyptian

---

## 👀 He Went Out Unto His Brethren, And Looked On Their Burdens

Despite being raised in Pharaoh's palace, adult Moses deliberately goes out to see his own people's suffering firsthand. He identifies with the enslaved Hebrews as "his brethren," not with the Egyptian royal family that raised him.

👀 Moses identifies with the enslaved Hebrews, not his Egyptian upbringing

---

## ⚔️ He Slew The Egyptian, And Hid Him In The Sand

Moses reacts to seeing an Egyptian beating a Hebrew slave with sudden, lethal violence, then tries to conceal the body and the crime. This is impulsive vigilante justice, not a calculated plan, and it will have serious consequences.

⚔️ Moses' violent reaction is impulsive, not part of any larger plan

😬 Hiding the body shows Moses already knows this act was wrong

# Exodus 2:13-15

# 🏃 Moses Flees To Midian

---

## ❓ Who Made Thee A Prince And A Judge Over Us?

When Moses tries to intervene in a fight between two Hebrews the next day, he's rejected sharply by his own people, the very people he risked everything for. This painful rejection foreshadows how Moses will later be doubted and challenged repeatedly by Israel in the wilderness.

❓ Moses is rejected by his own people, not thanked for defending them

🔮 This foreshadows Israel's repeated doubt of Moses later in the wilderness

---

## 😨 Moses Feared, And Said, Surely This Thing Is Known

Moses realizes his secret killing has already spread as common knowledge, meaning Pharaoh will inevitably hear of it. His fear here shows Moses acting on his own strength and timing, not yet as someone secure in God's calling.

😨 Moses' fear reflects that this was his own plan, not God's timing yet

---

## 🏜️ Moses Fled From The Face Of Pharaoh, And Dwelt In The Land Of Midian: And He Sat Down By A Well

Pharaoh seeks to execute Moses, forcing him to flee Egypt entirely. He settles by a well in Midian, a location loaded with meaning in Genesis, both Isaac's servant meeting Rebekah and Jacob meeting Rachel happened at wells like this one.

🏜️ Midian was likely northwest Arabia or the Sinai region, home to descendants of Abraham through Keturah

💧 Meeting a future wife at a well echoes earlier patriarchal stories in Genesis

# Exodus 2:16-19

# 🐑 Moses Defends The Priest's Daughters

---

## 👧 The Priest Of Midian Had Seven Daughters

Reuel, the priest of Midian, has seven daughters who do the physically demanding work of drawing water and watering their father's flocks themselves, showing this was a working family, not simply wealthy nobility.

👧 The daughters do hard physical labor themselves for their family's flocks

---

## 🛡️ The Shepherds Came And Drove Them Away: But Moses Stood Up And Helped Them

Other shepherds bully the young women away from the watering troughs, but Moses steps in to defend them and helps water their flock himself. This is the same defender's instinct that led Moses to intervene for the Hebrew slave earlier, this time it goes well.

🛡️ Moses shows the same instinct to protect the mistreated as before

✅ This time, unlike in Egypt, his intervention goes smoothly

---

## 🇪🇬 An Egyptian Delivered Us Out Of The Hand Of The Shepherds

The daughters describe Moses as "an Egyptian," based entirely on his clothing, accent, or appearance from growing up in Pharaoh's palace. Moses' true Hebrew identity is still invisible to outsiders at this point in his life.

🇪🇬 Moses is mistaken for an Egyptian based on his upbringing and appearance

# Exodus 2:20-22

# 💍 Moses Marries Zipporah

---

## 🍞 Why Is It That Ye Have Left The Man? Call Him, That He May Eat Bread

Reuel immediately extends hospitality to the stranger who helped his daughters, a mark of genuine Near Eastern honor culture, inviting Moses to share a meal rather than simply thanking him and moving on.

🍞 Sharing a meal was a meaningful act of honor and hospitality in this culture

---

## 💍 He Gave Moses Zipporah His Daughter

Moses settles into life in Midian, marrying Zipporah, one of Reuel's seven daughters. Moses' life takes a completely new direction, from Egyptian palace, to fugitive, to now a shepherd with a family of his own in a foreign land.

💍 Moses builds an entirely new life and family in Midian

---

## 🌍 Gershom: For He Said, I Have Been A Stranger In A Strange Land

Gershom sounds like the Hebrew phrase for "a stranger there." Moses names his son to mark his own deep sense of displacement, belonging fully to neither Egypt nor Midian, a man without a true home of his own yet.

🌍 Gershom's name reflects Moses feeling like an outsider everywhere he goes

💭 This name captures Moses' identity crisis at this point in his life

# Exodus 2:23-25

# 🙏 God Hears Israel's Cry

---

## 👑 The King Of Egypt Died ... The Children Of Israel Sighed By Reason Of The Bondage

Time passes, and Egypt gets a new ruler, yet Israel's slavery and suffering continue completely unchanged. A change in leadership brought no relief at all for the oppressed people.

👑 A new Egyptian king brings no actual change to Israel's suffering

---

## 🙏 Their Cry Came Up Unto God By Reason Of The Bondage

After generations of silence in the text about Israel's suffering, this verse marks the turning point where their pain is described as reaching God directly, setting up everything that happens for the rest of the book of Exodus.

🙏 This moment marks the turning point that sets up the rest of Exodus

---

## ❤️ God Heard Their Groaning, And God Remembered His Covenant

God's response is described in deliberate stages: hearing their pain, then remembering His covenant promise made generations earlier to Abraham, Isaac, and Jacob. This isn't God forgetting and suddenly recalling, it's the appointed moment for that ancient promise to begin moving forward.

❤️ God's response unfolds in stages: hearing, then acting on His covenant

📖 This directly connects back to the promises made throughout Genesis

---

## 👀 God Looked Upon The Children Of Israel, And God Had Respect Unto Them

"Had respect unto them" means God took real, personal notice of their suffering. Four distinct actions are listed for God in these two verses, hearing, remembering, looking, and respecting, emphasizing just how fully and personally God is now engaged with Israel's situation.

👀 "Had respect unto" means God took real, personal notice of their pain

🔢 Four distinct divine actions in two verses stress God's full engagement

➡️ This sets up God's direct call to Moses in the very next chapter`;

export const EXODUS_TWO_PERSONAL_SECTIONS = parseExodusTwoRawNotes(EXODUS_TWO_RAW_NOTES);
