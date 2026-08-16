export type FirstChroniclesTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentySevenRawNotes(rawText: string): FirstChroniclesTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 27:${startVerse}` : `1 Chronicles 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Chronicles 27 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_SEVEN_RAW_NOTES = `# FirstChronicles 27:1-3
# 🗓️ The Army Divides Into Twelve Courses
---
## The Chief Fathers And Captains Of Thousands And Hundreds

"Captains of thousands and hundreds" were exact military ranks, not vague titles.

A captain of a thousand led one thousand soldiers.

A captain of a hundred led one hundred.

These same ranks organized David's army from its very beginning.

🎖️ Captain names an exact military rank
🔢 One rank led a thousand men
🔟 Another rank led a hundred men
📖 The whole army used these ranks

---
## Which Came In And Went Out Month By Month

Each division served for exactly one month out of the year.

After that month ended, a brand new division took over.

No single group of soldiers stayed on duty all year long.

This kept a huge army ready without wearing out any one group.

🗓️ Each division served one month
🔁 A new division replaced the last
🚫 No group served the whole year
📖 Rotation kept the whole army fresh

---
## Of Every Course Were Twenty And Four Thousand

"Twenty and four thousand" means twenty four thousand soldiers filled each monthly division.

Twelve divisions times twenty four thousand equals about two hundred eighty eight thousand men total.

That total never actually gathered together on a battlefield at once.

This was closer to a reserve system than a standing army.

🔢 Twenty four thousand served each month
✖️ Twelve months totaled two hundred eighty eight thousand
🛡️ This worked like a reserve system
📖 The whole army never gathered at once

---
## Jashobeam The Son Of Zabdiel

Many scholars identify this Jashobeam with the same man named chief of the mighty men in First Chronicles eleven.

He now leads the very first monthly division, keeping that same top ranking.

"Perez" names a clan within the tribe of Judah, tracing back to Judah's own son in Genesis.

The most honored soldier fittingly received the most honored assignment, the first month.

🥇 Possibly the same man from chapter eleven
📜 He again holds the top ranking
👪 Perez traces back to Judah's own son
📖 Top honor matched the first month

# FirstChronicles 27:4-8
# ⚔️ Captains Lead The Second Through Fifth Months
---
## Over The Course Of The Second Month Was Dodai An Ahohite

Dodai officially commanded the second month's entire division.

"Ahohite" marks him as a descendant of Ahoah, from the tribe of Benjamin.

The text adds one more name, Mikloth also the ruler, right after his.

Two names sit over one division, an official commander and a working leader.

📛 Dodai held the official command
👪 Ahohite traces back to Benjamin
🧭 Mikloth also led this division
📖 One post, two different roles

---
## Benaiah The Son Of Jehoiada, A Chief Priest

This does not mean Benaiah actually served as a priest in the temple.

First Chronicles eleven already described him as one of David's mightiest warriors.

Some translations render this title as a leading officer instead of priest.

The exact meaning of the title stayed uncertain even to careful translators.

⚔️ Benaiah was a warrior, not a priest
📜 Chapter eleven names his fighting record
🔤 Translators disagree on this exact title
📖 A title can outlive its clear meaning

---
## Who Was Mighty Among The Thirty, And Above The Thirty

"The thirty" names David's second tier of elite warriors, just below his top three.

Benaiah ranked mighty even among that already elite group.

He then rose above the thirty entirely, a rare and higher honor.

His son Ammizabad is named right alongside him in this same verse.

🥈 The thirty were David's elite warriors
🏆 Benaiah outranked that whole group
👑 He rose even above the thirty
📖 A father's honor named beside his son

---
## The Fourth Captain For The Fourth Month Was Asahel The Brother Of Joab

Asahel was Joab's own brother, famous for his incredible speed as a runner.

Second Samuel two records Asahel's death, killed by Abner years before this list.

His division still carries his name long after he died in that battle.

"Zebadiah his son after him" means his son eventually led the division instead.

🏃 Asahel was known for his speed
⚔️ Second Samuel two records his death
🎖️ His division still bore his name
📖 A son continued his father's honor

---
## The Fifth Captain For The Fifth Month Was Shamhuth The Izrahite

Many scholars believe Shamhuth is another name for Shammah, one of David's mighty men.

Ancient records often used more than one name for the same person.

"Izrahite" simply names the family or clan Shamhuth belonged to.

Even a name easy to overlook still held its own place in David's army.

🔤 Shamhuth may be another name
🎖️ Possibly the same man as Shammah
👪 Izrahite names his clan or family
📖 Every division still had a leader

# FirstChronicles 27:9-15
# 🛡️ Captains Lead The Sixth Through Twelfth Months
---
## The Sixth Captain For The Sixth Month Was Ira The Son Of Ikkesh The Tekoite

Ikkesh the Tekoite already appeared back in First Chronicles eleven as father of Ira.

"Tekoite" means Ira came from Tekoa, a small town south of Bethlehem.

Tekoa later became the hometown of the prophet Amos.

This same family stayed active in David's service for years.

📜 Chapter eleven already named his father
🏘️ Tekoite means Ira came from Tekoa
🗣️ Amos later came from that same town
📖 One family served across many years

---
## Of The Zarhites

"Zarhites" names descendants of Zerah, one of Judah's twin sons in Genesis.

Both Sibbecai and Maharai, months eight and ten, come from this same clan.

Judah's family produced far more than just the royal line through David.

One clan supplied trusted leaders for more than one month that year.

👪 Zerah was one of Judah's sons
🔀 Sibbecai and Maharai share this clan
👑 Judah's family reached beyond David's line
📖 One clan filled more than one post

---
## The Eighth Captain For The Eighth Month Was Sibbecai The Hushathite

First Chronicles twenty already told how Sibbecai killed a giant named Sippai.

That victory happened during Israel's ongoing wars with the Philistines.

"Hushathite" names the town or clan Sibbecai came from.

A proven giant killer earned a place leading an entire monthly division.

🗡️ Sibbecai once killed a giant
📜 Chapter twenty already told that story
🏘️ Hushathite names his hometown or clan
📖 A hero's past earned a real command

---
## The Twelfth Captain For The Twelfth Month Was Heldai The Netophathite, Of Othniel

"Netophathite" names Heldai's hometown, a small town near Bethlehem.

"Of Othniel" links Heldai to the family line of Othniel, Israel's very first judge.

Judges three already told how Othniel delivered Israel from its first foreign oppressor.

A judge's family line was still producing faithful leaders generations later.

🏘️ Netophathite names his hometown near Bethlehem
⚖️ Othniel was Israel's first judge
📜 Judges three already told his story
📖 One family's faithfulness spanned generations

---
## In His Course Were Twenty And Four Thousand

The same line, in his course were twenty and four thousand, repeats seven times in this one section.

Ancient record keepers used repetition on purpose, not out of laziness.

Repeating the same number for every month proved the whole year stayed fully covered.

No month in David's kingdom was ever left short of soldiers.

🔁 The same number repeats seven times
📝 Ancient records repeated numbers on purpose
🗓️ Every single month stayed fully staffed
📖 Repetition here proved complete coverage

# FirstChronicles 27:16-22
# 🏛️ Rulers Are Named Over Every Tribe
---
## Over The Tribes Of Israel

This list shifts from military captains to civil rulers over each tribe.

Every tribe of Israel received its own named representative here.

Military command and tribal leadership were treated as two separate jobs.

Both systems answered to David at the very top.

🔀 The list shifts to civil rulers
👪 Each tribe received its own name
⚖️ Military and tribal roles stayed separate
📖 Both systems still answered to David

---
## The Ruler Of The Reubenites Was Eliezer The Son Of Zichri

Reuben and Simeon were Jacob's first and second sons in Genesis.

Their tribes still appear first in this list, following that same birth order.

Birth order still shaped how lists like this one were arranged generations later.

Old patterns from Genesis kept echoing through Israel's later history.

👴 Reuben and Simeon were Jacob's first sons
🔢 This list follows their birth order
📜 Old patterns from Genesis still echoed
📖 Genealogy shaped even a military list

---
## Of The Levites, Hashabiah The Son Of Kemuel, Of The Aaronites, Zadok

Levites normally received no land, yet one still led them as a tribal ruler.

"Aaronites" names the priestly family descended from Aaron specifically.

Zadok already served as a leading priest earlier in this book.

Even the priestly family received its own separate civil representative here.

🚫 Levites owned no land of their own
🙏 Aaronites means Aaron's priestly descendants
📜 Zadok already appeared earlier in Chronicles
📖 Even priests received a civil ruler

---
## Of Judah, Elihu, One Of The Brethren Of David

Many scholars believe Elihu is another name for Eliab, David's oldest brother.

First Samuel sixteen already named Eliab first among Jesse's sons.

David's own family represented the tribe of Judah on this list.

The king's brother held real responsibility, not just a royal title.

👪 Elihu was likely David's brother Eliab
📜 First Samuel sixteen named him first
👑 David's family represented all of Judah
📖 Royal family still carried real duty

---
## Of The Half Tribe Of Manasseh, Joel The Son Of Pedaiah

Manasseh's tribe famously split into two halves living in two different regions.

One half settled west of the Jordan River with the rest of Israel.

The other half settled east, across the Jordan, in the region of Gilead.

Each half needed its own separate ruler because of that real distance.

✂️ Manasseh split into two separate halves
🌊 One half lived west of the Jordan
🏞️ The other half lived east in Gilead
📖 Distance required two separate rulers

---
## These Were The Princes Of The Tribes Of Israel

This line closes the whole list of tribal rulers.

Two tribes, Gad and Asher, never actually appear anywhere in this list.

The text does not tell us plainly why those two names are missing.

Even a careful record like this one still leaves real questions unanswered.

🏁 This line closes the tribal list
❓ Gad and Asher are both missing
🤷 The text never explains the gap
📖 Even good records leave real questions

# FirstChronicles 27:23-24
# ⚠️ The Census David Never Finished
---
## David Took Not The Number Of Them From Twenty Years Old And Under

David deliberately left out everyone younger than twenty years old.

God's own promise to Abraham said Israel would grow like the stars of heaven.

Counting a promise meant to be uncountable seemed to miss the point entirely.

David drew that line on purpose, not by accident.

🔢 Men under twenty were left uncounted
✨ God promised Israel like countless stars
🚫 Counting the promise seemed to miss it
📖 David drew this line on purpose

---
## Joab The Son Of Zeruiah Began To Number, But He Finished Not

This verse points back to the census story told earlier in First Chronicles twenty one.

Joab actually tried to talk David out of counting the fighting men at all.

God still viewed that census as a sin and sent a deadly plague on Israel.

Joab stopped the count partway through once the plague had already begun.

📜 Chapter twenty one already told this story
🗣️ Joab warned David against the count
☠️ God sent a plague over that sin
📖 The count stopped once judgment fell

---
## There Fell Wrath For It Against Israel

"Wrath" here names God's own anger responding directly to the census.

Many scholars believe the sin was David trusting his army's size over trusting God.

A king's pride in numbers replaced simple faith in God's protection.

The whole nation suffered consequences for one man's decision.

🔥 Wrath means God's own righteous anger
👑 Pride in numbers replaced trust in God
😢 A king's choice affected the whole nation
📖 Sin rarely stays contained to one person

---
## Neither Was The Number Put In The Account Of The Chronicles Of King David

"The chronicles" here means the official royal records kept during David's reign.

Leaving the number out was a deliberate choice, not a simple oversight.

Removing tainted data was one way of disowning a sin that already happened.

Even official history can quietly choose what it refuses to record.

📚 Chronicles means official royal records
🚫 Leaving it out was a deliberate choice
🙈 It disowned a sin already committed
📖 History can choose what it leaves out

# FirstChronicles 27:25-31
# 🌾 Stewards Manage The King's Land And Herds
---
## Over The King's Treasures Was Azmaveth

Azmaveth managed the central treasury holding David's own personal royal wealth.

This role differed from the temple treasury already described in First Chronicles twenty six.

A king's household required its own separate financial management.

Royal wealth and God's house were tracked by two completely different treasurers.

💰 Azmaveth managed the king's own treasury
🏛️ Chapter twenty six covered the temple's treasury
👑 A king needed his own financial system
📖 Royal wealth and worship stayed separate

---
## In The Fields, In The Cities, And In The Villages, And In The Castles

This kingdom stored its resources in more than one kind of location.

Fields and villages held local supplies close to where crops grew.

Cities and fortified castles held supplies meant to last through hard times.

A wise kingdom never kept all of its resources in one single place.

🌾 Fields and villages held local supplies
🏰 Castles held supplies for hard times
🗺️ Storage spread across the whole kingdom
📖 Spreading resources out reduced real risk

---
## Over Them That Did The Work Of The Field For Tillage Of The Ground Was Ezri The Son Of Chelub

Ezri managed the farm workers who actually tilled Israel's ground.

"Tillage" simply means the work of preparing and planting soil for crops.

A kingdom this size needed organized farming just as much as organized soldiers.

Growing food mattered enough to earn its very own royal office.

🌱 Ezri managed the kingdom's farm workers
🚜 Tillage means preparing ground for crops
🍞 Food mattered as much as defense
📖 Everyday work earned real recognition

---
## Over The Vineyards Was Shimei The Ramathite

One official managed the vineyards where the grapes actually grew.

A completely different official managed the wine cellars where the finished wine was stored.

Growing a crop and storing its final product were treated as two separate skills.

This kind of specialized division ran throughout David's whole administration.

🍇 Shimei managed the growing vineyards
🍷 Zabdi managed the finished wine storage
🔀 Growing and storing were separate jobs
📖 Specialized roles ran through this whole list

---
## Over The Olive Trees And The Sycomore Trees That Were In The Low Plains Was Baalhanan The Gederite

Olive oil served as light for lamps, food for cooking, and oil for anointing kings.

"Sycomore trees" grew a common, everyday type of fig used widely in this region.

Baalhanan managed the actual trees, while Joash managed the oil once it was pressed.

One valuable resource still needed two separate people to manage it well.

🫒 Olive oil served light, food, and worship
🌳 Sycomore trees were common regional fig trees
🔀 Growing and pressing were two separate jobs
📖 Valuable resources needed careful management

---
## Over The Herds That Fed In Sharon Was Shitrai The Sharonite

"Sharon" names a wide, fertile plain along Israel's coast, perfect for grazing.

Shitrai managed the herds living there, while Shaphat managed herds in the valleys.

Different landscapes suited different kinds of livestock across the kingdom.

David's wealth in animals matched his wealth in land and grain.

🌿 Sharon was a fertile coastal plain
🐄 Shitrai managed the herds living there
⛰️ Shaphat managed herds in the valleys
📖 The right land grew the right herd

---
## Over The Camels Also Was Obil The Ishmaelite

Ishmaelites were widely known across the ancient Near East as camel traders and herders.

Genesis thirty seven already showed Ishmaelite traders traveling by camel toward Egypt.

Hiring Obil for this specific job used his people's real expertise.

David filled each role with whoever actually knew that work best.

🐫 Ishmaelites were known camel traders
📜 Genesis thirty seven already showed this trade
🎯 Obil's background matched the job
📖 The right skill filled the right role

# FirstChronicles 27:32-34
# 🤝 The Men Closest To The King
---
## Jonathan David's Uncle Was A Counsellor, A Wise Man, And A Scribe

This Jonathan is a different man entirely from Saul's son of the same name.

Many scholars believe "uncle" here may actually mean a wider kinsman, not a literal father's brother.

"Counsellor" and "scribe" both point to careful, trusted advisory work.

Jehiel served a separate role, watching over and guiding the king's own sons.

👴 A different Jonathan than Saul's son
🤝 Uncle may mean a wider kinsman
📜 Scribe means trusted written record work
📖 Family filled David's closest circle

---
## Ahithophel Was The King's Counsellor

Ahithophel served as David's wisest and most trusted counselor for years.

Second Samuel fifteen tells how Ahithophel later betrayed David and joined Absalom's rebellion.

His advice was so respected that losing it felt like losing a battle already.

A trusted friend's betrayal ended in Ahithophel taking his own life.

🧠 Ahithophel was David's wisest counselor
💔 He later betrayed David for Absalom
⚔️ His counsel carried real strategic weight
📖 Trusted loyalty can still turn to betrayal

---
## Hushai The Archite Was The King's Companion

"Companion" names a close personal friend, a different role than an official counselor.

Second Samuel fifteen through seventeen tells how Hushai stayed loyal during Absalom's rebellion.

Hushai deliberately gave Absalom bad advice to protect David from a distance.

A quiet friend's loyalty ended up saving the kingdom during its darkest moment.

🤝 Companion means a close personal friend
🎭 Hushai secretly stayed loyal to David
🗣️ He gave Absalom deliberately bad advice
📖 One friend's loyalty saved a kingdom

---
## The General Of The King's Army Was Joab

Joab closes this list as the commander of David's entire army.

This same chapter already showed Joab starting the census that angered God.

Joab's record throughout this book always mixed real loyalty with real failure.

The list ends on the one man who shaped nearly all of it.

🛡️ Joab commanded the whole army
📜 This chapter already named his flawed census
⚖️ His record mixed loyalty and failure
📖 One complicated man closes this list
`.trim();

export const FIRST_CHRONICLES_TWENTY_SEVEN_PERSONAL_SECTIONS = parseFirstChroniclesTwentySevenRawNotes(
  FIRST_CHRONICLES_TWENTY_SEVEN_RAW_NOTES
);
