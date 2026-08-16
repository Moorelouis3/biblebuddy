export type FirstChroniclesTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyFourRawNotes(rawText: string): FirstChroniclesTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 24:${startVerse}` : `1 Chronicles 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Chronicles 24 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_FOUR_RAW_NOTES = `# FirstChronicles 24:1-6
# 👑 Organizing Aaron's Priests
---
## 📋 The Divisions Of The Sons Of Aaron

"Divisions" here does not mean family splits or arguments.

It means organized work groups, each given a turn to serve.

Chapter twenty three already grouped the wider tribe of Levi this same way.

This chapter narrows the focus down to Aaron's own priestly family.

📋 Divisions means organized work groups
⏳ Each group served on a rotation
👨‍👦 This chapter covers Aaron's own family
📖 Chapter twenty three set this pattern

---

## 👶 Nadab, And Abihu, Eleazar, And Ithamar

These four are Aaron's actual sons, named here in birth order.

Nadab and Abihu were the two oldest.

Leviticus ten already told their story.

They offered fire to God in a way He had not commanded.

That choice cost them their lives.

👶 Named here in the order they were born
🔥 Nadab and Abihu offered forbidden fire
⚱️ That fire cost them their lives
📖 Leviticus ten already told this story

---

## 🚫 Had No Children

Having no children mattered enormously for a priestly family.

Without sons, a family's branch could not produce future priests.

That left the whole priesthood to flow through two brothers alone.

One moment of disobedience closed off an entire family line.

🚫 No sons ends a family's priestly line
👥 Nadab and Abihu's branch produces no priests
🙏 Eleazar and Ithamar carry the line alone
📖 One choice affected generations to come

---

## ⚖️ Executed The Priest's Office

"Executed" here is an old word for carried out or performed.

Eleazar and Ithamar are the two who actually did the priestly work.

Eleazar later became the next high priest of Israel, right after Aaron.

Ithamar's descendants kept serving for many generations afterward.

⚖️ Executed means carried out or performed
🙏 Eleazar and Ithamar did the priestly work
👑 Eleazar became the next high priest
📖 Both brothers carried the priesthood forward

---

## 🙏 Zadok Of The Sons Of Eleazar, And Ahimelech Of The Sons Of Ithamar

Zadok represented Eleazar's family.

He later became Solomon's high priest.

The man called Ahimelech here represented Ithamar's family instead.

Verse six calls him Ahimelech the son of Abiathar.

That reverses what most readers already know from first Samuel.

There, Ahimelech was the priest at Nob, and Abiathar was his son.

Many scholars believe an early copyist swapped the two names.

🙏 Zadok represented Eleazar's family
👑 Zadok later became Solomon's high priest
🔀 The names appear reversed from first Samuel
📖 Many scholars believe copyists swapped the names

---

## 🔢 More Chief Men Found Of The Sons Of Eleazar

Eleazar's family had grown to sixteen leading households.

Ithamar's family had only eight.

That is exactly twice as many on one side as the other.

A fair process was about to matter more than family size.

🔢 Eleazar's family had sixteen leading households
👥 Ithamar's family had only eight
⚖️ One side was twice as large
📖 A fair process mattered more than headcount

---

## 🎲 Divided By Lot, One Sort With Another

Casting lots was an ancient way of letting chance decide, not people.

Many believe it involved marked stones drawn from a container.

Using a lot meant no leader could accuse David of favoritism.

The smaller family of Ithamar received the same fair chance as the larger family of Eleazar.

🎲 A lot let chance decide, not people
🪨 Likely involved marked stones drawn out
🚫 No one could accuse David of favoritism
📖 Both families got an equal fair chance

---

## 🏛️ Governors Of The Sanctuary, And Governors Of The House Of God

"Governors" here means the men who held the top leadership roles.

The sanctuary was the most sacred part of the building.

The house of God was the wider structure surrounding it.

Leaders from both Eleazar's family and Ithamar's family filled roles in each area.

🏛️ Governors means the top leadership roles
✨ Sanctuary is the most sacred part
🕍 House of God is the wider structure
📖 Both families led in every area

---

## ✍️ Shemaiah The Son Of Nethaneel The Scribe

A scribe's job was to write down official records for the future.

Shemaiah recorded this list in front of the king and the officials.

Zadok and the other priests witnessed the same recording.

Writing it down in public made the assignments official and unchangeable.

✍️ A scribe recorded official documents
👑 This happened in front of the king
👀 Priests and officials witnessed it too
📖 A public record could not be disputed

---

## 🔄 One Principal Household Being Taken For Eleazar, And One Taken For Ithamar

This line explains exactly how sixteen and eight got combined evenly.

Officials likely alternated, drawing one household from each family in turn.

That pattern would need two full rounds through Ithamar's eight households.

The result was twenty four total assignments, evenly spread between both families.

🔄 Households were likely drawn by turns
🔁 Ithamar's eight got used twice over
➕ Sixteen plus eight combine to twenty four
📖 The result balanced both families evenly

# FirstChronicles 24:7-13
# 🎲 Casting Lots For The First Courses
---
## 🎯 The First Lot Came Forth To Jehoiarib

The first lot came forth means Jehoiarib's family drew first of all twenty four.

Being first did not make his family more important than the rest.

It only decided the order of an already equal assignment.

Centuries later, a famous Jewish priestly family traced its roots back to Jehoiarib.

🎲 First lot means first in the drawing order
⚖️ Order did not mean higher importance
🕎 A later priestly family traced back to him
📖 This list mattered for centuries afterward

---

## 📜 The Third To Harim

Harim's family name shows up again hundreds of years later.

The book of Ezra lists a family called Harim among the priests who returned from exile.

That family identity survived war, exile, and years of change.

These twenty four courses were not just for David's own time.

📜 Harim reappears in the book of Ezra
🏠 That family returned from exile in Babylon
🕰️ The same family survived for centuries
📖 This list outlasted David by generations

---

## 📅 The Fifth To Malchijah, The Sixth To Mijamin

Each of these twenty four courses served one week at a time.

That happened twice every year.

The ancient historian Josephus later confirmed this same pattern.

Priests returned home to their normal lives between duty weeks.

📅 Each course served one week at a time
📚 That happened twice every year
🏠 Priests returned home between duty weeks
📖 A rotation covered constant temple need

---

## 👶 The Eighth To Abijah

Abijah's course became the eighth turn in the rotation.

This name resurfaces far later in the New Testament.

Zacharias, the father of John the Baptist, belonged to what Luke calls the course of Abia.

A short list of names in Chronicles connects directly to the opening of Luke's gospel.

🎯 Abijah received the eighth turn
👴 Zacharias belonged to this exact course
👶 His son became John the Baptist
📖 An old list reaches into the New Testament

---

## ❓ The Ninth To Jeshuah, The Tenth To Shecaniah

Most of these men appear only once in the whole Bible, right here.

Nothing else is recorded about their individual lives.

Being written down at all still meant something real.

God's people believed even a quiet name deserved a permanent place in this record.

❓ Most of these men appear only here
📜 No other story is told about them
✍️ Being recorded still had real value
📖 Every name held a permanent place

# FirstChronicles 24:14-19
# 📜 Finishing The Twenty Four Courses
---
## 🪦 The Seventeenth To Hezir

Hezir's family name did not stay only inside this list.

An ancient tomb still standing in Jerusalem carries the inscription, sons of Hezir.

It sits in the Kidron Valley, near the old city.

A single name in a temple roster left a mark that outlasted the temple itself.

🪦 An ancient tomb still bears his family name
🏛️ It sits in Jerusalem's Kidron Valley
🔍 Archaeologists have dated it centuries later
📖 One name outlasted the building it served

---

## 🏛️ The One And Twentieth To Jachin

This Jachin is a man, not the giant bronze pillar from Solomon's temple.

First Kings names one of the two great pillars at the temple's entrance Jachin as well.

The man and the pillar are not connected.

They simply share the same name.

Ancient Israelites often reused meaningful words as names.

👤 Jachin here is a man's name
🏛️ A temple pillar later shared that name
🚫 The man and the pillar are unrelated
📖 Meaningful words often became names too

---

## 🔢 The Four And Twentieth To Maaziah

Maaziah completes the full count of twenty four courses.

Sixteen families from Eleazar and eight from Ithamar are now all listed.

The number twenty four appears again later in scripture.

It describes twenty four elders gathered around God's throne in Revelation.

Many readers have noticed the echo between this list and that heavenly picture.

🔢 Maaziah completes all twenty four courses
✅ Every family from verse four is listed
👑 Twenty four elders appear later in Revelation
📖 An earthly pattern echoes a heavenly one

---

## 📅 These Were The Orderings Of Them In Their Service To Come Into The House Of The LORD

"Orderings" means the official schedule for taking turns.

Each course served for a set period, then stepped aside for the next one.

Zacharias was in the middle of his own course's turn in Luke chapter one.

This schedule from David's time was still running centuries later.

📅 Orderings means an official turn schedule
🔁 Each course served, then stepped aside
👴 Zacharias was serving his course in Luke
📖 A schedule set once lasted for centuries

---

## 🙏 As The LORD God Of Israel Had Commanded Him

This does not mean God specifically commanded twenty four courses at Mount Sinai.

The original command to Aaron was simply that his family would serve as priests.

David is the one who later organized that service into this detailed rotation.

Following God still leaves room for wisdom in working out the details.

📜 God's command to Aaron was general
👑 David designed this specific rotation
🙏 Obedience still leaves room for wisdom
📖 Faithfulness works out the details too

# FirstChronicles 24:20-25
# 👪 The Rest Of The Levite Families
---
## 🌳 The Rest Of The Sons Of Levi

The chapter now shifts away from Aaron's priestly line completely.

Chapter twenty three already introduced the wider tribe of Levi.

That tribe splits into three branches, Gershon, Kohath, and Merari.

This section names the grandsons and great grandsons inside those branches.

🌳 The focus shifts to the wider tribe
👪 Gershon, Kohath, and Merari all appear again
🔍 The priesthood was only one branch of many
📖 Chapter twenty three set up this pattern

---

## 👴 Of The Sons Of Amram

Amram was the father of Moses and Aaron, back in the book of Exodus.

This Shubael descends from Amram's branch through Moses, not through Aaron.

Chapter twenty three already named a different Shubael, a grandson of Moses.

Ancient Israelite families often reused the same names across different branches.

👴 Amram was the father of Moses and Aaron
🔀 This Shubael descends through Moses, not Aaron
🔁 The same name appeared in chapter twenty three
📖 Reused names were common, not a mistake

---

## 🏙️ The Sons Of Hebron

"Hebron" here is a man's name, not the famous city.

He was one of Kohath's own sons, already introduced in chapter twenty three.

Abraham was buried in a different place also called Hebron.

The same word can name both a person and a city.

👤 Hebron here names a man, not the city
👴 He was one of Kohath's sons
🏙️ Abraham was buried in the city called Hebron
📖 Same word, two very different things

---

## 🔁 The Brother Of Michah Was Isshiah

This is a second man named Isshiah in this same short chapter.

Verse twenty one already named a different Isshiah, the son of Rehabiah.

This one is Michah's brother, from a completely different family branch.

Matching names in a genealogy almost never mean the same person.

🔁 A second, different man named Isshiah
👤 Verse twenty one named a different Isshiah
👪 This one belongs to Michah's family instead
📖 Same name rarely means the same person

# FirstChronicles 24:26-31
# 🎲 Fair Lots For Every Family
---
## 👤 Of Mahli Came Eleazar, Who Had No Sons

This Eleazar shares a name with the famous high priest.

He actually comes from Merari's family, not Aaron's.

Having no sons meant his own household could not continue alone.

Chapter twenty three already explained what happened next.

His daughters married their cousins, the sons of Kish.

That is exactly why Kish appears in the very next verse.

👤 A different Eleazar, from Merari's family
🚫 No sons meant his line needed help
👰 His daughters married their cousins in Kish's family
📖 That is why Kish appears next

---

## 🏠 These Were The Sons Of The Levites After The House Of Their Fathers

"After the house of their fathers" means organized by ancestral family line.

This exact phrase appears again and again throughout the book of Chronicles.

It was how ancient Israel tracked identity, land, and duty across generations.

A family's history mattered as much as any single person's story.

🏠 Means organized by ancestral family line
🔁 This phrase repeats throughout Chronicles
🗺️ It tracked identity, land, and duty
📖 Family history mattered as much as one life

---

## 🎲 These Likewise Cast Lots Over Against Their Brethren

The word likewise ties this section back to the priests at the start.

The wider Levite families received the exact same fair lot process.

No family's size or importance decided the outcome.

This was the same fairness already shown to Aaron's own sons.

🔗 Likewise connects back to the priests
🎲 The same fair process covered every family
⚖️ Size and importance did not decide the result
📖 One fair standard covered the entire tribe

---

## 👴 Even The Principal Fathers Over Against Their Younger Brethren

"Principal fathers" means the oldest, highest ranking family leaders.

Even they submitted to the very same lot as their own relatives.

Rank and birth order gave no one an advantage in this process.

The chapter closes the same way it began.

Fairness reached every level of God's house.

👴 Principal fathers means the highest ranking leaders
🤝 Even they used the same fair lot
🚫 Rank gave no one an advantage
📖 Fairness held from top to bottom
`.trim();

export const FIRST_CHRONICLES_TWENTY_FOUR_PERSONAL_SECTIONS = parseFirstChroniclesTwentyFourRawNotes(
  FIRST_CHRONICLES_TWENTY_FOUR_RAW_NOTES
);
