export type NumbersOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersOneRawNotes(rawText: string): NumbersOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 1:${startVerse}` : `Numbers 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Numbers 1 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_ONE_RAW_NOTES = `# Numbers 1:1-4
# 📋 The Census Command
---
## ⛺ In The Wilderness Of Sinai, In The Tabernacle Of The Congregation

Israel is still camped at Mount Sinai.

This is the same mountain where they received the Ten Commandments.

The tabernacle was the tent where God's presence lived among the people.

It had only been standing for one month.

This whole book takes its name from what happens here.

A full head count of the nation is about to begin.

⛺ Still camped at the same mountain

📜 The Ten Commandments were given here

🕍 The tabernacle was only one month old

📖 This book takes its name from this count

## 📆 The First Day Of The Second Month, In The Second Year

This census happens on a very specific date.

It falls in the second year after Israel left Egypt.

The tabernacle had been standing for exactly one month by this point.

Exodus forty already recorded its completion on the first day of the first month.

The timing shows how central this new tent had already become to Israel's life.

📆 A precise date opens this book

🗓️ The second year after leaving Egypt

🕍 One month after the tabernacle's completion

📖 God puts the new tabernacle straight to work

## 🔢 Take Ye The Sum Of All The Congregation

"Sum" here means an exact head count, not a guess.

This census would count individuals, not just households.

The result becomes the very reason the book is called Numbers.

A precise number was about to replace a general description of a nation.

🔢 Sum means an exact head count

👤 Every individual gets counted, not households

📚 This count gives the book its name

📖 A precise number now defines the nation

## 👣 Every Male By Their Polls

"Polls" is an old word for the head.

Counting "by their polls" means literally counting head by head.

This is where the modern word poll, as in a vote, comes from.

Each person mattered enough to be individually recorded.

👣 Polls is an old word for head

🗳️ The word poll still means this today

🔢 Every person was counted individually

📖 Each name mattered enough to record

## ⚔️ Able To Go Forth To War

This census counted only men twenty years old and up.

It excluded anyone too young or too old to serve.

The purpose was military, a fighting force, not a general head count.

Numbers twenty six repeats this same count decades later, right before entering the promised land.

⚔️ Only men twenty and older counted

🚫 Too young or too old excluded

🪖 This built a fighting force

📖 Numbers twenty six repeats this count later

## 👪 A Man Of Every Tribe

Moses and Aaron could not count six hundred thousand people alone.

God assigns one leader from each tribe to help with the count.

"Head of the house of his fathers" means the leading elder of that family line.

This structure of shared leadership shows up again through the rest of the book.

👪 One helper chosen from each tribe

👴 Head of the house means the leading elder

🤝 Moses and Aaron could not count alone

📖 Shared leadership shapes the rest of the book

# Numbers 1:5-16
# 👑 The Twelve Princes
---
## 🗣️ These Are The Names Of The Men That Shall Stand With You

Twelve men are named here, one from each tribe.

"Stand with you" means they would work alongside Moses during the count.

The Hebrew word behind "prince" here means a leader or head, not a king.

Each tribe needed its own trusted representative present for the count to be trusted.

🗣️ Twelve leaders named, one per tribe

🤝 They stood alongside Moses in the count

👑 Prince here means leader, not king

📖 Trusted representatives made the count trustworthy

## 👴 Of The Tribe Of Reuben, Elizur The Son Of Shedeur

Reuben was Jacob's firstborn son, listed first here out of birth order.

By this point Reuben had already lost his birthright for a serious sin back in Genesis thirty five.

"The son of Shedeur" simply names Elizur's father, a common way to identify someone in this culture.

Being listed first was a mark of honor, not a restored birthright.

👴 Reuben was Jacob's firstborn son

💔 He had already lost his birthright

📛 Son of Shedeur names his father

📖 Birth order still gave him first place

## 📛 Of Judah, Nahshon The Son Of Amminadab

Nahshon leads the tribe of Judah in this count.

He is an ancestor of King David.

He is also an ancestor of Jesus, through the genealogy in Matthew one.

His sister Elisheba was married to Aaron the high priest.

A name that seems minor here turns out to matter for the whole Bible.

📛 Nahshon leads the tribe of Judah

👑 An ancestor of King David

✝️ Also an ancestor of Jesus

📖 A small name with a huge legacy

## 👬 Of The Children Of Joseph: Of Ephraim, Of Manasseh

Joseph does not get his own single tribe here.

Instead his two sons, Ephraim and Manasseh, each become a full tribe.

This goes back to Jacob adopting both boys as his own sons in Genesis forty eight.

That is also why the tribe list can total twelve, even though Levi is left out below.

👬 Joseph split into two full tribes

👶 Jacob adopted Ephraim and Manasseh as sons

🔢 This keeps the tribe count at twelve

📖 Levi being set apart made room for both

## 🌾 These Were The Renowned Of The Congregation

"Renowned" means well known and respected, not just important on paper.

These twelve men were also called "heads of thousands," military commanders over large groups.

The order they are listed in here is not random.

Numbers two, the very next chapter, uses this exact order to arrange the whole camp.

🌾 Renowned means well known and respected

⚔️ Heads of thousands means military commanders

🔢 Their listed order was not random

📖 Numbers two follows this same order

# Numbers 1:17-19
# 📜 Moses And Aaron Take The Census
---
## 👥 They Assembled All The Congregation Together

Getting an entire nation into one place was a massive logistical task.

Every tribe had to bring every man of fighting age to be counted in person.

There was no way to fake a number or hide from this process.

The whole nation stood accountable together on this single day.

👥 The whole nation gathered together

📋 Every fighting age man had to appear

🚫 No one could hide from the count

📖 The nation stood accountable as one

## 📜 Declared Their Pedigrees After Their Families

"Pedigree" here means a person's family line, traced back through their ancestors.

Every man had to prove which tribe and family he actually belonged to.

This mattered because land in Canaan would later be divided by tribe and family.

A wrong or unclear family record could cost a family its future inheritance.

📜 Pedigree means a traced family line

🏠 Everyone had to prove their family

🗺️ Land would later be divided by family

📖 Family records protected future inheritance

## ✅ As The LORD Commanded Moses, So He Numbered Them

This exact phrase repeats often throughout the book of Numbers.

It marks Moses carrying out God's instructions precisely, without adding or leaving anything out.

The census itself becomes an act of obedience, not just an administrative task.

Every number that follows in this chapter rests on that same simple obedience.

✅ This phrase repeats often in Numbers

🎯 Moses followed the instructions exactly

🙏 The count itself was an act of obedience

📖 Obedience stands behind every number here

# Numbers 1:20-27
# ⚔️ The First Four Tribes Counted
---
## 👴 Israel's Eldest Son

Reuben is called Israel's eldest son here, a formal reminder of his birth order.

Genealogy titles like this stayed attached to a man even after he lost real standing.

First Chronicles five later explains plainly that his birthright was given to Joseph's sons instead.

The title stayed even though the honor that once came with it did not.

👴 Eldest son was Reuben's formal title

💔 His birthright had already been given away

📖 First Chronicles explains the birthright transfer

➡️ A title can outlast the honor behind it

## 🔢 Fifty And Nine Thousand And Three Hundred

Simeon counts fifty nine thousand three hundred fighting men here.

That makes it one of the larger tribes at this point.

By the second census decades later, in Numbers twenty six, Simeon crashes to barely twenty two thousand.

That collapse likely connects to Simeon's role in the plague at Baalpeor near the end of the book.

🔢 Fifty nine thousand fighting men counted

📈 One of the largest tribes right now

📉 Simeon later crashes to the smallest tribe

📖 A steep fall recorded decades later in Numbers

## ➕ Forty And Five Thousand Six Hundred And Fifty

Gad's total does not round neatly to the nearest fifty like most of the others.

That uneven number is a small clue that this was a real head count, not a stylized figure.

Someone genuinely walked through the camp and added up real people.

The awkward number is actually evidence that the record can be trusted.

➕ Gad's total does not round evenly

🔍 An uneven number suggests a real count

🚶 Someone actually walked through and counted

📖 A messy number can be a trustworthy one

## 🦁 Threescore And Fourteen Thousand And Six Hundred

"Threescore" is an old way of saying sixty.

Judah's total of seventy four thousand six hundred makes it the largest tribe counted so far.

That size matches Judah's coming role, marching first when the camp moves out in Numbers two.

It also points toward Judah's larger place in the story, the tribe of David and eventually Jesus.

🦁 Threescore is an old word for sixty

📏 Judah is the largest tribe so far

🚩 Judah will march first in Numbers two

📖 Judah's line leads to David and Jesus

# Numbers 1:28-35
# 🌾 Issachar Through Manasseh
---
## 🌾 Fifty And Four Thousand And Four Hundred

Issachar's men number fifty four thousand four hundred here.

Issachar was one of Leah's sons, born after a long stretch without children.

Genesis thirty explains the story behind his name and birth in detail.

A quiet tribe in this list, but a real family story sits behind the number.

🌾 Fifty four thousand counted for Issachar

👶 Issachar was one of Leah's sons

📖 Genesis thirty tells his birth story

➡️ Every number here has a family behind it

## ⛵ Fifty And Seven Thousand And Four Hundred

Zebulun's total comes in slightly higher than his older brother Issachar's.

Birth order in Genesis did not decide tribal size here.

Jacob's blessing in Genesis forty nine even pictured Zebulun as a tribe that would dwell by the sea.

The wilderness numbers already hint at each tribe's coming character.

⛵ Zebulun edges out his older brother

🔢 Birth order did not decide tribe size

🌊 Jacob's blessing pictured Zebulun near the sea

📖 Numbers already hints at each tribe's future

## 👦 Of The Children Of Ephraim

Ephraim was Joseph's younger son, yet he is listed and counted ahead of Manasseh here.

Genesis forty eight already explained why, Jacob crossed his hands to bless Ephraim first.

Ephraim's count of forty thousand five hundred stays slightly ahead of his older brother's for now.

A blessing spoken years earlier is already showing up in these numbers.

👦 Ephraim was Joseph's younger son

🤲 Jacob crossed his hands to bless him first

🔢 Ephraim edges out Manasseh in this count

📖 An old blessing already shapes these numbers

## 👨 Of The Children Of Manasseh

Manasseh was Joseph's firstborn son, yet he lands behind Ephraim in this count.

His total here is the smaller of the two.

That will not last forever.

By the second census in Numbers twenty six, Manasseh grows into the larger of the two tribes.

👨 Manasseh was Joseph's firstborn son

📉 His number is the smaller of the two

⏳ The gap will not last forever

📖 Manasseh later grows past Ephraim in size

# Numbers 1:36-43
# 🏕️ Benjamin Through Naphtali
---
## 👶 Thirty And Five Thousand And Four Hundred

Benjamin's count here is thirty five thousand four hundred.

He was Rachel's youngest son and Joseph's only full brother.

This tribe stays small and vulnerable through much of Israel's later history.

Judges twenty even records Benjamin nearly wiped out completely in a civil war.

👶 Benjamin was Rachel's youngest son

🤝 Joseph's only full brother in the family

⚠️ A small tribe through much of history

📖 Judges twenty shows Benjamin nearly destroyed

## 🐎 Threescore And Two Thousand And Seven Hundred

Dan's total of sixty two thousand seven hundred makes it the second largest tribe here.

Dan was born to Bilhah, Rachel's handmaid, not to Rachel herself.

Family status at birth did not limit how large this tribe would grow.

Size in this census depended on God's blessing, not on a mother's status.

🐎 Dan is the second largest tribe

👶 Dan was born to Rachel's handmaid Bilhah

📈 Family status did not limit tribal growth

📖 Growth here came from blessing, not status

## 😊 Forty And One Thousand And Five Hundred

Asher's name itself means happy or blessed.

Leah's servant Zilpah gave him that name after his birth in Genesis thirty.

His count here lands in the middle of the twelve tribes, neither the largest nor the smallest.

A name given in a moment of joy still marked this family generations later.

😊 Asher's name means happy or blessed

👩 Zilpah named him after his birth

⚖️ His tribe lands in the middle

📖 A joyful name outlasted generations

## 🏹 Fifty And Three Thousand And Four Hundred

Naphtali closes out the list of twelve tribal totals.

His count of fifty three thousand four hundred lands comfortably in the middle of the pack.

Genesis thirty explains his name, meaning wrestling, tied to Rachel's own words at his birth.

Twelve very different family stories now stand behind twelve very different numbers.

🏹 Naphtali closes out the twelve totals

🤼 His name means wrestling

📖 Genesis thirty explains the name's origin

➡️ Twelve family stories stand behind these numbers

# Numbers 1:44-47
# 🔢 The Grand Total
---
## 👑 The Princes Of Israel, Being Twelve Men

Twelve leaders stood with Moses and Aaron through this entire count.

That number holds even though Levi is left out and Joseph became two tribes instead of one.

The math balances out exactly to twelve, the same number promised to Jacob's family generations earlier.

Structure like this rarely happens by accident in scripture.

👑 Twelve leaders stood with Moses

🔢 Levi's absence and Joseph's split balance out

🧮 The number twelve holds steady

📖 This structure was not an accident

## 🔢 Six Hundred Thousand And Three Thousand And Five Hundred And Fifty

The final total lands at six hundred three thousand five hundred fifty fighting men.

Exodus twelve already described this same crowd leaving Egypt as about six hundred thousand on foot.

This census now turns that earlier estimate into an exact, confirmed number.

A whole nation had grown from just seventy people who first went down to Egypt.

🔢 The total reaches six hundred three thousand

📜 Exodus already estimated about this many

✅ This count confirms that earlier estimate

📖 Seventy people grew into a whole nation

## 🕍 The Levites Were Not Numbered Among Them

Every tribe above gets counted for war, except one.

The Levites are left out of this military census entirely.

That is not a punishment or an oversight.

The next few verses explain exactly why they were set apart for something else.

🕍 Every tribe counted except one

🚫 Levites are left out on purpose

🎯 This was not a punishment

📖 The next verses explain their real role

# Numbers 1:48-54
# 🕍 The Levites Take Their Post
---
## 🚫 Thou Shalt Not Number The Tribe Of Levi

God gives Moses a direct, separate instruction about the Levites.

They are not left out because they do not matter.

They are left out because their assignment was never military in the first place.

Their job was to serve at the tabernacle, not to fight in the army.

🚫 Levites are excluded from this count

🎯 Their calling was never military

🕍 Their assignment centered on the tabernacle

📖 Different roles need different kinds of counting

## 🛠️ Appoint The Levites Over The Tabernacle Of Testimony

"Tabernacle of testimony" refers to the tent that held the stone tablets of the law.

The Levites become the tabernacle's full time caretakers.

They carry it, set it up, take it down, and guard it wherever Israel camps.

This job never stops, unlike a battle that eventually ends.

🛠️ Testimony refers to the stone tablets

🧳 Levites carry and set up the tabernacle

🔁 Their job never really stops

📖 A permanent role, not a seasonal one

## ⚠️ The Stranger That Cometh Nigh Shall Be Put To Death

"Stranger" here does not mean a foreigner from another nation.

It means anyone outside the tribe of Levi who tries to approach the tabernacle's holy items.

That warning sounds harsh, but it protects something serious, God's own holy presence.

Unauthorized access to something that holy carried real danger, not just broken rules.

⚠️ Stranger means anyone outside the Levites

🚷 Approaching the holy items uninvited was dangerous

🛡️ This rule protected something genuinely holy

📖 God's presence demanded careful boundaries

## 🚩 Every Man By His Own Standard

A "standard" here means a tribal banner or flag.

Each tribe would camp and march under its own recognizable symbol.

This detail sets up the next chapter, where the whole camp gets arranged around the tabernacle.

Order, not chaos, would mark how this massive nation moved together.

🚩 Standard means a tribal banner

🏕️ Each tribe camped under its own flag

🗺️ Numbers two arranges the whole camp

📖 Order marked how this nation moved

## 🕍 The Levites Shall Pitch Round About The Tabernacle Of Testimony

The Levites camp in a ring surrounding the tabernacle itself.

Every other tribe camps farther out, beyond that inner ring.

This arrangement puts God's presence at the literal center of the whole nation's life.

Everything about this camp was built around staying close to God.

🕍 Levites camped in a ring around it

🏕️ Every other tribe camped farther out

🎯 God's presence sat at the very center

📖 The camp was built around nearness to God
`.trim();

export const NUMBERS_ONE_PERSONAL_SECTIONS = parseNumbersOneRawNotes(NUMBERS_ONE_RAW_NOTES);
