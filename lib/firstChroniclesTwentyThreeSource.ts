export type FirstChroniclesTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyThreeRawNotes(rawText: string): FirstChroniclesTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 23:${startVerse}` : `1 Chronicles 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Chronicles 23 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_THREE_RAW_NOTES = `# FirstChronicles 23:1-6
# 👑 Solomon Crowned, The Levites Are Counted
---
## ⏳ Old And Full Of Days

"Full of days" is an old way of saying someone lived a long, complete life.

It does not just mean David reached an old age.

It means his life had reached a natural, satisfying end.

Abraham and Job are both described the same way elsewhere in the Bible.

⏳ Full of days means a complete life
👴 It is more than just old age
📜 Abraham and Job are described this way too
📖 David's story is closing with contentment

---

## 👑 He Made Solomon His Son King Over Israel

David crowns Solomon king while he himself is still alive.

For a time, father and son rule together.

David's own son Adonijah had already tried to seize the throne earlier.

Crowning Solomon now settles who rules next before David dies.

👑 David crowns Solomon while still alive
🤝 Father and son rule together for a time
⚔️ Adonijah had already tried to seize power
📖 A clear successor avoids a future fight

---

## 📯 Gathered Together All The Princes Of Israel

David calls together every leader in the nation for this moment.

"Princes" here means tribal and military leaders, not royal children.

Priests and Levites are gathered too, since this decision affects their work directly.

This chapter opens with a national assembly, not a private family talk.

📯 David calls the whole nation's leaders
👥 Princes means tribal and military leaders
🙏 Priests and Levites are included too
📖 This is a national moment, not private

---

## 🔢 Numbered From The Age Of Thirty Years And Upward

David orders a census of every Levite man aged thirty and older.

That starting age matched the rule already set back in the book of Numbers.

The total comes to thirty eight thousand men.

This becomes the last full Levite census taken under David's own reign.

🔢 Levites are numbered starting at thirty
📜 Numbers already set that same starting age
👥 The total reaches thirty eight thousand men
📖 This is David's final Levite census

---

## 🏗️ Twenty And Four Thousand Were To Set Forward The Work

David splits the thirty eight thousand Levites into specific jobs.

Twenty four thousand oversee the actual work of the house of the LORD.

Six thousand more serve as officers and judges among the people.

Every Levite now has one clear assignment instead of one shared duty.

🏗️ Most oversee work in the LORD's house
⚖️ Six thousand serve as officers and judges
📋 Every Levite gets one clear assignment
📖 Organization replaces one shared duty

---

## 🚪 Four Thousand Were Porters

"Porters" here does not mean people who carry luggage.

It means gatekeepers, the men who guarded the entrances to God's house.

Four thousand men are set aside for this one job alone.

Guarding the entrances was treated as a real, honored assignment.

🚪 Porters means gatekeepers, not luggage carriers
🛡️ They guarded the entrances to God's house
👥 Four thousand men filled this one role
📖 Guarding the entrance was an honored job

---

## 🎶 Praised The LORD With The Instruments Which I Made, Said David

David suddenly speaks in his own words inside this list of numbers.

He personally designed instruments for the Levites to use in worship.

This connects back to the singers and musicians David organized earlier in this book.

Worship music was not an afterthought to David, he built it by hand.

🎶 David speaks in his own words here
🛠️ He personally designed worship instruments
📜 This connects to David's earlier singers and musicians
📖 Worship music mattered enough to build by hand

---

## 🗂️ David Divided Them Into Courses

A "course" here means a rotating work group, not a school class or a meal.

Each course took its turn serving for a set period of time.

David splits all the Levites among Levi's three sons, Gershon, Kohath, and Merari.

This same three way family split goes all the way back to Exodus.

🗂️ A course means a rotating work group
🔁 Each group served for a set time
👨‍👦 Levites split by Gershon, Kohath, and Merari
📖 This three way split goes back to Exodus

# FirstChronicles 23:7-11
# 👨‍👦 The Sons Of Gershon
---
## 👨‍👦 Of The Gershonites Were Laadan And Shimei

Gershon was the oldest of Levi's three sons.

His descendants are called the Gershonites.

Two men lead this branch of the family, Laadan and Shimei.

Genealogies like this one track exactly which family did which job in the tabernacle.

👨‍👦 Gershon was Levi's oldest son
🏷️ His descendants are called Gershonites
👥 Laadan and Shimei lead this branch
📖 Genealogies track who did which job

---

## 👑 The Sons Of Laadan, The Chief Was Jehiel

Naming a "chief" among brothers marks who led that specific family group.

Jehiel leads this branch, with Zetham and Joel named alongside him.

Being listed first often signals birth order or leadership rank.

These small details mattered for organizing tabernacle work in an orderly way.

👑 Chief marks the leader of a family group
👦 Jehiel leads, with Zetham and Joel named too
🔢 List order often signals rank or birth
📖 These details kept the work organized

---

## 👥 These Were The Chief Of The Fathers Of Laadan

A second man named Shimei appears here, listed under Laadan's family.

This is not the same Shimei named as Gershon's other son back in verse seven.

Shimei was a common name, which makes Bible genealogies easy to misread.

Careful reading, not assumption, keeps these family lines straight.

👥 A second Shimei appears in this verse
🔀 He is not the Shimei from verse seven
🏷️ Shimei was a very common name
📖 Careful reading keeps family lines straight

---

## 👨‍👩‍👧‍👦 These Four Were The Sons Of Shimei

This verse moves to the other Shimei, Gershon's actual second son from verse seven.

His four sons are Jahath, Zina, Jeush, and Beriah.

Two different Shimeis appearing so close together shows why Bible genealogies often add extra family details.

Those extra details exist to prevent exactly this kind of confusion.

👨‍👩‍👧‍👦 This Shimei is Gershon's own son
🔢 He has four named sons here
🧩 Two Shimeis so close together is confusing
📖 Extra genealogy details prevent mix ups

---

## 📜 They Were In One Reckoning According To Their Father's House

Jahath is named chief, with Zizah as second in rank.

Jeush and Beriah did not have many sons of their own.

Because their families stayed small, they were counted together as one household instead of two.

"Reckoning" here simply means how a family was counted and organized for service.

📜 Jahath was chief, Zizah was second
👨‍👦 Jeush and Beriah had few sons
🧮 Small families were counted as one house
📖 Reckoning means how a family was organized

# FirstChronicles 23:12-14
# 🕊️ The Sons Of Kohath, Aaron Set Apart
---
## 👨‍👦‍👦 The Sons Of Kohath: Amram, Izhar, Hebron, And Uzziel

Kohath was Levi's second son, and his family line matters enormously.

Moses and Aaron both come from Kohath's branch, through his son Amram.

Four sons are named here, and each one becomes the head of his own family group.

This one verse sets up the rest of the chapter's Kohathite genealogy.

👨‍👦‍👦 Kohath was Levi's second son
🙌 Moses and Aaron descend from this line
🔢 Four sons head four family groups
📖 This verse sets up the chapter

---

## 🙏 Aaron Was Separated That He Should Sanctify The Most Holy Things

"Separated" here means set apart for a unique, permanent role.

Aaron alone, out of all of Levi's descendants, is chosen to handle the most sacred objects.

"Sanctify" means to make something holy or set apart for God's use.

This separation was not earned, it was assigned by God.

🙏 Separated means set apart for a role
✨ Aaron alone handles the most sacred items
🎯 This role was assigned, not earned
📖 Sanctify means made holy for God's use

---

## 🔥 To Burn Incense Before The LORD, And To Bless In His Name For Ever

Burning incense and blessing the people in God's name become Aaron's permanent family duties.

"For ever" here means this role stays with Aaron's descendants going forward.

This is the starting point for the entire line of Israelite priests.

Every high priest after Aaron traces back to this one assignment.

🔥 Burning incense becomes Aaron's family duty
♾️ For ever means this passes to his descendants
👨‍👦 This starts the whole priestly line
📖 Every later priest traces back to Aaron

---

## 📜 His Sons Were Named Of The Tribe Of Levi

Moses is called "the man of God," a title of deep honor.

Even so, his own sons do not inherit the priesthood or any special rank.

They are simply counted as regular Levites, like any other family in the tribe.

God's plan for Israel's priesthood ran through Aaron's line, not through Moses' own children.

📜 Moses is called the man of God
🚫 His sons get no special leadership rank
👥 They are counted as ordinary Levites
📖 The priesthood ran through Aaron, not Moses

# FirstChronicles 23:15-20
# 🌳 The Rest Of Kohath's Family Line
---
## 👦 The Sons Of Moses Were Gershom And Eliezer

Moses had two sons, Gershom and Eliezer.

Gershom's name means "a stranger there," chosen back in Exodus during Moses' years away from Egypt.

Eliezer's name means "God is my help," tied to Moses' own escape from Pharaoh.

Both names carry the story of Moses' exile inside them.

👦 Moses had two sons, Gershom and Eliezer
🌍 Gershom's name means a stranger there
🙏 Eliezer's name means God is my help
📖 Both names carry Moses' own story

---

## 👑 Of The Sons Of Gershom, Shebuel Was The Chief

Shebuel leads the family line descending from Gershom.

He is the only son of Gershom named here.

A short entry like this still matters, since it keeps the family record complete.

Not every branch of a family tree needs a long list to matter.

👑 Shebuel leads Gershom's family line
👦 He is the only son named here
📋 Short entries still keep the record complete
📖 A short branch can still matter

---

## 👨‍👦‍👦 The Sons Of Rehabiah Were Very Many

Eliezer had only one son, Rehabiah.

Despite that thin start, Rehabiah's own descendants multiplied into a very large family.

This shows how one generation's small line can grow enormously in the next.

A single name in a genealogy can still hold a whole future family inside it.

👨‍👦‍👦 Eliezer had just one son, Rehabiah
📈 Rehabiah's own descendants grew very large
🌱 One generation's small line can grow fast
📖 A single name can hold a whole future

---

## 👑 Of The Sons Of Izhar, Shelomith The Chief

Izhar was one of Kohath's four sons named back in verse twelve.

Shelomith leads this particular branch of the Kohathite family.

The name Shelomith comes from the same root as "shalom," meaning peace.

Names like this one often carried real meaning for the family that chose them.

👑 Shelomith leads Izhar's family branch
🔗 Izhar was one of Kohath's four sons
🕊️ Shelomith shares its root with shalom
📖 Names often carried real meaning

---

## 🔢 Jeriah The First, Amariah The Second, Jahaziel The Third, And Jekameam The Fourth

Hebron's four sons are listed here in a fixed order.

Hebron is also the name of a city.

That city later becomes one of the towns given to the Levites.

A name can belong to a person or a place without being the same thing.

🔢 Four sons are listed in birth order
🏙️ Hebron is also the name of a city
🏘️ That city later goes to the Levites
📖 One name, a person or a place

---

## 🔢 Of The Sons Of Uzziel, Micah The First, And Jesiah The Second

Uzziel was the fourth and youngest of Kohath's sons.

His own family line is shorter than his brothers', with only two sons named.

Micah leads the line, with Jesiah named second.

The length of a list in these chapters is not a measure of importance.

🔢 Uzziel was Kohath's fourth son
👦 Only two sons are named here
👑 Micah leads, Jesiah is named second
📖 A shorter list does not mean smaller importance

# FirstChronicles 23:21-23
# 👨‍👦 The Sons Of Merari
---
## 👨‍👦 The Sons Of Merari, Mahli, And Mushi

Merari was the youngest of Levi's three sons.

His two sons, Mahli and Mushi, start the final branch of the Levite family tree.

Mahli's own sons, Eleazar and Kish, are named right away.

This verse moves quickly because the real story comes in the next verse.

👨‍👦 Merari was Levi's youngest son
🌳 Mahli and Mushi start his branch
👦 Mahli's sons are Eleazar and Kish
📖 The real story comes next

---

## 👧 Eleazar Died, And Had No Sons, But Daughters

Eleazar's family line has no sons to carry it forward.

His daughters instead marry within their own extended family, their cousins, the sons of Kish.

Marrying close relatives like this kept property and tribal identity inside the same family line.

This custom explains how Eleazar's name and inheritance still survive despite having no sons.

👧 Eleazar's line has daughters, not sons
💍 His daughters marry their cousins, Kish's sons
🏠 This kept inheritance inside the family
📖 A name can survive without a son

---

## 👨‍👦‍👦 The Sons Of Mushi Were Mahli, Eder, And Jeremoth

Mushi's three sons close out the Merari family record.

Notice that the name Mahli appears twice in this chapter.

It names Merari's own grandson here, and it also names an earlier son of Mahli's own line.

Repeated names across a genealogy are common and are not a mistake in the text.

👨‍👦‍👦 Mushi's three sons close this record
🔁 The name Mahli appears more than once
✅ Repeated names are common, not errors
📖 Following the father keeps the line straight

# FirstChronicles 23:24-27
# 📋 Counted For A New Kind Of Service
---
## 🔢 Counted By Number Of Names By Their Polls

"Polls" here is an old word for individual heads, as in counting head by head.

This entire chapter has been building toward this one summary verse.

Every name listed so far gets folded into this final total.

Counting by polls meant nobody in the tribe went uncounted or unnamed.

🔢 Polls means counting head by head
📋 This verse summarizes the whole chapter
👥 Every earlier name is folded into the count
📖 Nobody in the tribe went unnamed

---

## 🏙️ The LORD God Of Israel Hath Given Rest Unto His People

David explains why the Levites' job is about to change.

For generations, Israel moved constantly, and the tabernacle had to move with them.

Now the nation is settled in Jerusalem, with no more wandering ahead.

A settled king in a settled city changes what the Levites are actually needed for.

🏙️ Israel is finally settled in Jerusalem
🚶 Wandering years are now over
🏛️ A settled nation needed new duties
📖 Rest changes what the Levites are needed for

---

## 🚫 They Shall No More Carry The Tabernacle

For centuries, a whole division of Levites existed just to carry the tabernacle and its furniture.

That entire job is now ending, since the tabernacle no longer moves from place to place.

This is a major shift in what it even means to be a Levite.

An old, physically demanding duty is being replaced by something new.

🚫 Carrying the tabernacle is no longer needed
🏕️ The tabernacle used to move constantly
🔄 This is a major shift for the Levites
📖 An old duty made room for new work

---

## 🔢 Numbered From Twenty Years Old And Above

Verse three set the counting age at thirty years old.

This verse lowers it to twenty, and that is not a contradiction.

With the moving and carrying work gone, younger men could now help with music and worship.

Lowering the age simply matched the lighter, more accessible new duties.

🔢 The age drops from thirty to twenty
🚫 This is not a contradiction of verse three
🎶 New duties needed less physical strength
📖 The age matched the new kind of work

# FirstChronicles 23:28-32
# ⛪ The New Work Of The Levites
---
## 🙏 Their Office Was To Wait On The Sons Of Aaron

"Wait on" here means to serve and assist, not to sit and do nothing.

The Levites now support the priests directly instead of hauling tabernacle equipment.

This includes helping in the courts and chambers, the outer and inner areas of God's house.

Assisting was still real, important work, just a different kind than before.

🙏 Wait on means to serve and assist
🤝 Levites now support the priests directly
🏛️ Courts and chambers means the temple's spaces
📖 Assisting was still real, important work

---

## ✨ In The Purifying Of All Holy Things

"Purifying" means making something ceremonially clean and fit for sacred use.

Holy objects could become unfit for worship through normal contact or use over time.

Levites are given the ongoing job of keeping every sacred item ready for service.

This kind of careful maintenance protected the holiness of the whole worship system.

✨ Purifying means making something ceremonially clean
🧹 Sacred items needed regular upkeep
🛡️ Levites protected the whole worship system
📖 Holiness required ongoing careful maintenance

---

## 🍞 For The Shewbread, And For The Fine Flour For Meat Offering

"Shewbread" was twelve loaves of bread kept on a special table inside the tabernacle.

The loaves represented the twelve tribes of Israel.

"Meat offering" in the King James Bible does not mean meat.

It means a grain offering made from fine flour.

🍞 Shewbread was twelve loaves for the twelve tribes
🌾 Meat offering here means a grain offering
👨‍🍳 Levites regularly prepared these food offerings
📖 Feeding worship mattered as much as guarding it

---

## 🌅 To Stand Every Morning To Thank And Praise The LORD

This creates a fixed daily rhythm of worship, every single morning.

"Likewise at even" means the same thanks and praise happened again at night.

Worship here is not a once a week event.

It is a daily practice built directly into the schedule.

🌅 Morning praise happens every single day
🌇 Evening praise mirrors the morning
📅 Worship became a daily rhythm, not weekly
📖 Steady praise became part of normal life

---

## 📅 In The Sabbaths, In The New Moons, And On The Set Feasts

Beyond the daily rhythm, Levites also served at Israel's larger scheduled worship times.

"New moons" marked the start of each month and were treated as their own small holy day.

"Set feasts" refers to the yearly festivals commanded back in Leviticus, like Passover.

Every layer of Israel's calendar, daily, monthly, and yearly, had Levites serving inside it.

📅 Levites served daily, monthly, and yearly events
🌙 New moons marked the start of each month
🎉 Set feasts means the yearly festivals from Leviticus
📖 Every layer of the calendar had Levites serving

---

## 🔑 The Charge Of The Sons Of Aaron Their Brethren

The chapter closes by naming three layers of responsibility together.

The tabernacle of the congregation, the holy place, and the priests themselves.

"Charge" means a duty someone is trusted and responsible to keep.

The Levites' whole new identity is now built around faithfully keeping these three trusts.

🔑 Charge means a trusted, watched over duty
🏕️ The tabernacle itself is the first trust
⛪ The holy place is the second trust
📖 Serving the priests completes the new identity
`.trim();

export const FIRST_CHRONICLES_TWENTY_THREE_PERSONAL_SECTIONS = parseFirstChroniclesTwentyThreeRawNotes(
  FIRST_CHRONICLES_TWENTY_THREE_RAW_NOTES,
);
