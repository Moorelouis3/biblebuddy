export type FirstChroniclesTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentySixRawNotes(rawText: string): FirstChroniclesTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 26:${startVerse}` : `1 Chronicles 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Chronicles 26 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_SIX_RAW_NOTES = `# FirstChronicles 26:1-3
# 🚪 The Gatekeepers Are Organized By Family
---
## 🚪 Concerning The Divisions Of The Porters

"Porters" here means gatekeepers, not people who carry belongings.

These men guarded every entrance into the house of the LORD.

The last two chapters organized the priests and then the musicians.

This chapter turns to the Levites who guarded the doors.

🚪 Porters means gatekeepers, not carriers
📜 Chapter twenty four organized the priests
🎶 Chapter twenty five organized the musicians
📖 Now the doors receive their own order

---

## ⚔️ Of The Korhites Was Meshelemiah The Son Of Kore

"Korhites" means descendants of a Levite named Korah.

Korah once led a rebellion against Moses in the wilderness.

The earth opened and swallowed him for that rebellion in Numbers sixteen.

His family line did not end there.

By David's time a descendant of Korah guarded the doors of God's house.

⚔️ Korah led a rebellion against Moses
🌍 The earth swallowed Korah in Numbers sixteen
👪 His family line continued after him
📖 A rebel's descendants later served faithfully

---

## 🎶 Of The Sons Of Asaph

This Asaph is not the famous musician from chapter twenty five.

Many scholars believe this name is short for Ebiasaph, an ancestor in Korah's line.

First Chronicles chapter six lists Ebiasaph among Korah's own descendants.

Two different men in this book share a similar sounding name.

🎶 Not the musician Asaph from chapter twenty five
📜 Likely short for Ebiasaph, Korah's descendant
🗺️ First Chronicles six lists that family line
📖 One name, two different men

---

## 🔢 Zechariah The Firstborn, Jediael The Second

Meshelemiah had seven sons, and the text lists them in birth order.

Birth order mattered in these lists because it decided inheritance and honor.

Even the seventh son, Elioenai, still receives a name of his own.

No son in this family goes unrecorded, no matter how far down the list.

🔢 Seven sons are listed in birth order
👑 Birth order shaped inheritance and honor
📝 Even the seventh son gets a name
📖 No son in this family went unrecorded

# FirstChronicles 26:4-8
# 📦 Obededom's House Is Blessed With Sons
---
## 📜 The Sons Of Obededom Were

This Obededom is the same man who once housed the Ark of the Covenant.

Second Samuel six tells how David left the Ark at his house for three months.

During that time, the LORD blessed Obededom and his household.

This chapter shows exactly what that blessing looked like years later.

📜 Obededom once housed the Ark of the Covenant
⏳ The Ark stayed with him three months
🙏 The LORD blessed his household during that time
📖 This chapter shows that blessing still growing

---

## 🙏 For God Blessed Him

Obededom had eight sons, more than Meshelemiah's seven.

The text stops to explain why, for God blessed him.

That reason points directly back to the blessing in Second Samuel six.

A large family in this culture was seen as evidence of God's favor.

🔢 Obededom had eight sons in all
🙏 The text names the reason, God's blessing
📜 This echoes the blessing from Second Samuel six
📖 A large family was seen as God's favor

---

## 💪 Mighty Men Of Valour

"Mighty men of valour" is a title for proven, capable warriors.

Shemaiah's own sons earned this title even though their work was guarding doors.

Guarding a gate at God's house required real strength and courage.

This was never a job for men who could not be trusted.

💪 Mighty men of valour means proven warriors
🚪 These men earned that title as gatekeepers
🛡️ Guarding God's house took real strength
📖 A door could demand real courage

---

## 🔢 Threescore And Two Of Obededom

"Threescore" is an old word for sixty.

Threescore and two means sixty two men in total.

That count includes his sons, grandsons, and other able relatives.

One blessed household grew into a small army of gatekeepers.

🔢 Threescore is an old word for sixty
➕ The total comes to sixty two men
👪 The count includes sons and grandsons
📖 One blessing multiplied across generations

# FirstChronicles 26:9-11
# ⚖️ A Father Chooses His Own Chief
---
## 🔢 Meshelemiah Had Sons And Brethren, Strong Men, Eighteen

Meshelemiah's household added up to eighteen strong men in total.

That count includes both his own sons and his wider family.

Obededom's family had reached sixty two men.

This family was smaller than Obededom's.

Every family's size shaped how gate duties were divided.

🔢 Meshelemiah's family totaled eighteen strong men
👪 The count includes sons and brethren
⚖️ Smaller than Obededom's family of sixty two
📖 Every family size still found its place

---

## 👪 Also Hosah, Of The Children Of Merari

Merari was one of Levi's three sons, alongside Kohath and Gershon.

Meshelemiah's line traced back through Kohath.

Hosah's family traced back through Merari instead.

All three Levite branches now share the work of guarding the gates.

👪 Merari was one of Levi's three sons
🔀 A different branch from Meshelemiah's family
🚪 All three branches now guard the gates
📖 God spread this duty across the tribe

---

## 🥇 Yet His Father Made Him The Chief

Simri was not Hosah's oldest son by birth.

His father still chose him to lead the family.

This breaks the normal rule that the firstborn always led.

Scripture records other fathers making this same choice before this chapter.

🥇 Simri was not the actual firstborn
👨 His father still made him chief
🔄 This overturns the usual birth order
📖 A father's choice could outweigh birth order

# FirstChronicles 26:12-19
# 🎲 The Gates Are Assigned By Lot
---
## 🔄 Having Wards One Against Another

A "ward" here means an assigned shift of duty, not a jail cell.

"One against another" means the shifts rotated between families.

No single family stood guard every single day without rest.

This kept every gate covered without wearing out any one household.

🔄 Ward means an assigned shift of duty
⏰ Families rotated so no one served alone
🛡️ Every gate stayed covered at all times
📖 The system protected the guards too

---

## 🎲 They Cast Lots, As Well The Small As The Great

This repeats the same fairness rule already used for the priests and musicians.

Casting lots let chance decide instead of rank or reputation.

Small and great families received the exact same odds.

By this point, the method was standard for every Levite assignment.

🎲 Lots decided by chance, not rank
⚖️ Small and great families had equal odds
📜 The same method organized priests and musicians
📖 Fairness was a repeated pattern here

---

## 🌅 The Lot Eastward Fell To Shelemiah

"Shelemiah" is simply a shorter form of the name Meshelemiah from verse one.

Hebrew names were sometimes written in both a full and a short form.

The east gate faced the rising sun, the most visible entrance to the temple.

Meshelemiah's family drew the most prominent position by chance, not by asking for it.

🔤 Shelemiah is short for Meshelemiah
🌅 The east gate faced the rising sun
👑 It was the temple's most visible entrance
📖 Even the top spot came by chance

---

## 🧠 Then For Zechariah His Son, A Wise Counsellor

Zechariah is singled out here with a title none of the other gatekeepers receive.

A "counsellor" is an advisor whose judgment other people trusted.

A gatekeeper could still be known for wisdom beyond standing at a door.

God's house valued a wise mind as much as a strong body.

🧠 Counsellor means a trusted advisor
🚪 Zechariah was also a working gatekeeper
🎖️ He alone receives this added title
📖 Wisdom and gatekeeping were not separate here

---

## 📦 The House Of Asuppim

"Asuppim" likely names a storage area, possibly for supplies or offerings.

The word comes from a Hebrew root meaning to gather or collect.

Obededom's sons guarded this storage area instead of a main gate.

Not every assignment in this chapter involved standing at an entrance.

📦 Asuppim likely means a storage area
🗃️ The word relates to gathering things
🚪 Not every post was a main gate
📖 Guarding supplies mattered just as much

---

## 🗑️ The Gate Shallecheth, By The Causeway Of The Going Up

"Shallecheth" comes from a Hebrew word meaning to cast out or throw away.

Many scholars believe this gate was used for removing ashes or waste from the temple.

A "causeway" was a raised road built for climbing up to the temple.

Even a gate for waste had its own name and its own place in the order.

🗑️ Shallecheth may mean cast out
🛣️ A causeway was a raised road for climbing
⛰️ The temple sat on higher ground
📖 Even a waste gate had real order

---

## 🔁 Ward Against Ward

This exact phrase already appeared back in verse twelve.

Repeating it here ties this whole list back to that opening rule.

Every gate, no matter its purpose, followed the same rotating system.

One fair pattern covered every single gate in the house.

🔁 This phrase repeats from verse twelve
🚪 It applies the same rule to every gate
🔄 Shifts rotated no matter the gate's purpose
📖 One pattern governed the whole system

---

## 🔢 Eastward Were Six Levites, Northward Four A Day

These numbers list exactly how many guards stood at each gate.

The east gate, the busiest and most visible, received the most guards.

The other directions received fewer men based on real traffic.

This was planned staffing, not numbers handed out evenly.

🔢 East received six guards, the most of all
🧭 North and south each received four
📉 Staffing matched each gate's real traffic
📖 This was planned, not handed out evenly

---

## 🏛️ At Parbar Westward, Four At The Causeway, And Two At Parbar

"Parbar" is a rare word, likely naming a court or colonnade on the temple's west side.

It appears almost nowhere else in the Bible.

Even this obscure area received its own guards and its own count.

No corner of the temple grounds was left unwatched.

🏛️ Parbar likely names a court or colonnade
📍 It sat on the temple's west side
🔍 The word rarely appears elsewhere in scripture
📖 No corner of the temple went unwatched

---

## 🔗 Among The Sons Of Kore, And Among The Sons Of Merari

This verse closes the whole gate assignment list.

"Sons of Kore" points back to Meshelemiah's family from verse one.

"Sons of Merari" points back to Hosah's family from verse ten.

Together these two families covered the entire gatekeeping assignment.

🔗 Sons of Kore points to Meshelemiah's family
👪 Sons of Merari points to Hosah's family
🚪 Together they covered the whole assignment
📖 The chapter opened and closed on these names

# FirstChronicles 26:20-24
# 🏦 The Treasurers Over God's House
---
## 💰 Ahijah Was Over The Treasures Of The House Of God

This introduces a new kind of assignment beyond gates and music.

Someone had to manage and protect the wealth stored inside God's house.

Ahijah oversaw the ordinary treasury used for the temple's daily needs.

The next verses describe a second, separate kind of treasure entirely.

💰 Ahijah managed the house of God's treasury
🏠 This treasury covered ordinary daily needs
🚪 A new role beyond gates and music
📖 Wealth needed guarding as much as doorways

---

## 🎁 The Treasures Of The Dedicated Things

This is a separate category from the ordinary treasury named just before it.

"Dedicated things" were gifts set apart and given to God.

Once something was dedicated, it could not be spent like ordinary funds.

Later verses explain exactly where these dedicated gifts came from.

🎁 Dedicated things were gifts set apart for God
🚫 They could not be spent like ordinary funds
🏦 This was separate from the daily treasury
📖 Not all wealth here served one purpose

---

## 👪 Even Of Laadan The Gershonite, Were Jehieli

Gershon was another of Levi's three sons, alongside Kohath and Merari.

This verse introduces a family from the third Levite branch.

Laadan descended from Gershon, and his sons are named as chief fathers.

By now all three branches of Levi appear somewhere in this chapter.

👪 Gershon was Levi's third son
🔀 Laadan's family belongs to the Gershonite branch
🏦 They took on treasury work here
📖 All three Levite branches share real duties

---

## 👨‍👦 Shebuel The Son Of Gershom, The Son Of Moses

This Shebuel was a direct descendant of Moses himself.

Moses's own family did not inherit the priesthood.

That honor belonged to Aaron's line instead.

One of Moses's own descendants ended up managing the temple treasury.

👨‍👦 Shebuel descended directly from Moses
⚖️ Aaron's line held the priesthood, not Moses's
💰 Moses's descendant served as a treasurer instead
📖 Serving God did not require power


# FirstChronicles 26:25-28
# ⚔️ The Dedicated Spoils Of War
---
## 🪖 The Captains Over Thousands And Hundreds

This describes Israel's military, organized in units of a thousand and a hundred.

Officers at every level of the army contributed to the dedicated treasure.

This was not only a handful of kings giving gifts.

Ordinary military leadership across the whole army took part.

🪖 The army was organized by thousands and hundreds
🎖️ Officers at every rank contributed spoils
👑 It was not only kings who gave
📖 This custom reached every rank of leadership

---

## ⚔️ The Spoils Won In Battles Did They Dedicate

"Spoils" are goods and valuables captured after a battle.

When Israel's armies won a battle, part of what they captured was set apart for God.

This custom went back generations before David.

Setting aside part of a victory gave credit for the win back to God.

⚔️ Spoils are goods captured after battle
🎁 Victory spoils were set apart for God
📜 This custom predated David by generations
📖 Victory itself was credited back to God

---

## 📜 Samuel The Seer, And Saul The Son Of Kish

This verse lists past leaders whose war spoils are still on record.

Samuel was the prophet and judge who anointed both Saul and David.

Saul was Israel's first king, and Abner led his armies.

Joab led David's own armies later on.

📜 Samuel anointed both Saul and David
👑 Saul was Israel's first king
🛡️ Abner and Joab led their armies
📖 Decades of victories filled this one treasury

---

## ✋ Under The Hand Of Shelomith, And Of His Brethren

"Under the hand of" means under someone's direct care and oversight.

Shelomith and his relatives were personally responsible for this entire treasury.

Generations of accumulated war spoils sat under the watch of one family.

That level of trust was not handed out lightly in this culture.

✋ Under the hand means under direct oversight
👪 Shelomith's family managed the whole treasury
⏳ It held generations of accumulated spoils
📖 That trust was never handed out lightly

# FirstChronicles 26:29-32
# 🏛️ Levites Serve As Officers And Judges
---
## 🏛️ For The Outward Business Over Israel, For Officers And Judges

"Outward business" means civil matters outside the temple itself.

Chenaniah and his sons served as judges and officers among the wider nation.

Levites were not limited to religious duties inside the temple walls.

This chapter shows their responsibility reaching into everyday government and law.

🏛️ Outward business means civil, non temple matters
⚖️ Chenaniah's family served as judges and officers
🚪 Levites worked far beyond the temple walls
📖 Serving God reached into everyday government

---

## 🔢 A Thousand And Seven Hundred, Were Officers

This is a large number of Levites serving in civil administration.

Seventeen hundred Hebronite men managed both the LORD's business and the king's business.

Religious and civil responsibility were treated as connected, not separate.

A number this large shows how deeply Levites shaped daily national life.

🔢 Seventeen hundred Hebronites served as officers
🤝 They managed the LORD's and the king's business
🔗 Religious and civil duty were treated as one
📖 This was a massive organized workforce

---

## 📅 In The Fortieth Year Of The Reign Of David

This dates the events in this chapter to near the end of David's reign.

David ruled Israel for a total of forty years.

This detail places these Levite assignments among his final decisions.

David spent even his last year organizing for the next generation.

📅 David reigned a total of forty years
⏳ This places the chapter near his reign's end
👑 Even his final year went toward organizing
📖 He built for the next generation

---

## 🗺️ Mighty Men Of Valour At Jazer Of Gilead

Jazer was a city east of the Jordan River, in the region of Gilead.

Gilead sat across the Jordan, outside the main land of Israel.

David's men searched that distant region and still found capable Levites there.

Even far from Jerusalem, God still had capable men serving there.

🗺️ Jazer sat east of the Jordan River
🏞️ Gilead was land across the Jordan
🔍 Capable men were found even far away
📖 God's work reached far beyond Jerusalem

---

## 🏞️ Rulers Over The Reubenites, The Gadites, And The Half Tribe Of Manasseh

These three tribes settled east of the Jordan River, apart from the other nine.

Levites owned no land of their own, so they could serve any tribe freely.

Placing Levites as rulers here kept these separated tribes connected to Israel.

Distance from Jerusalem never excused a tribe from having real leadership.

🏞️ Three tribes settled east of the Jordan
🚫 Levites owned no land, so they served freely
🔗 They connected these tribes back to Israel
📖 Levites held a divided land together

---

## 🙏 For Every Matter Pertaining To God, And Affairs Of The King

This closing phrase repeats the same two categories named back in verse thirty.

Every assignment across this whole chapter fits under one of these two headings.

Gatekeeping, treasury work, and justice all served this same purpose.

The chapter never truly separates worship from daily national life.

🔁 This repeats the phrase from verse thirty
🙏 One heading covers matters pertaining to God
👑 The other covers the affairs of the king
📖 Worship and daily life were never separated
`.trim();

export const FIRST_CHRONICLES_TWENTY_SIX_PERSONAL_SECTIONS = parseFirstChroniclesTwentySixRawNotes(
  FIRST_CHRONICLES_TWENTY_SIX_RAW_NOTES
);
