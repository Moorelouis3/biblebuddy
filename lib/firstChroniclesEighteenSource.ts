export type FirstChroniclesEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesEighteenRawNotes(rawText: string): FirstChroniclesEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 18:${startVerse}` : `1 Chronicles 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 18 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_EIGHTEEN_RAW_NOTES = `# FirstChronicles 18:1-2
# ⚔️ David Subdues Philistines And Moab
---
## ⚔️ David Smote The Philistines

Smote means struck down in a decisive battle, not a minor skirmish.

This continues a fight that stretches back across several earlier chapters.

The Philistines had threatened Israel since the days of the judges.

Here that long standing threat is finally broken under David's leadership.

⚔️ Smote means a decisive military defeat
📜 The conflict had lasted for generations
👑 David finally breaks their power
📖 God gives Israel rest from an old enemy

---

## 🏰 Took Gath And Her Towns Out Of The Hand Of The Philistines

Gath was one of the five major Philistine cities and the hometown of Goliath.

"Her towns" means the smaller villages that depended on Gath for protection and trade.

Capturing the main city brought its whole surrounding region under Israel's control.

This is the same city David once fled to for safety from Saul.

🏰 Gath was a major Philistine city
🗿 It was Goliath's hometown
🏘️ Her towns means the surrounding villages
📖 David once fled to this very city

---

## 🐴 He Smote Moab

Moab sat east of the Dead Sea and traced its ancestry back to Lot.

Israel and Moab had a long, tangled history of both kinship and conflict.

Ruth, David's own great grandmother, had come from this very nation.

David's family history makes this victory more complicated than a simple conquest.

🐴 Moab lay east of the Dead Sea
👪 Moab descended from Lot
💍 Ruth, David's ancestor, was a Moabite
📖 This victory touches David's own family line

---

## 🎁 The Moabites Became David's Servants, And Brought Gifts

Becoming a servant here means Moab was now a subject nation paying tribute.

"Brought gifts" is the polite word for a required, ongoing tax to Israel's king.

Conquered nations kept some self rule as long as the tribute kept arriving.

This pattern of tribute repeats through the rest of the chapter.

🎁 Servant here means a subject nation
💰 Gifts means required tribute payments
🏳️ Moab kept self rule under Israel
➡️ This tribute pattern repeats through the chapter

# FirstChronicles 18:3-6
# 🛡️ Victory Over Hadarezer And The Syrians
---
## 👑 Hadarezer King Of Zobah

Zobah was a powerful Aramean kingdom to the north and east of Israel.

Hadarezer ruled it and was one of the strongest kings in the region.

Defeating a king this powerful was a major turning point for David's growing kingdom.

Zobah's fall opens the door to everything else described in this chapter.

👑 Zobah was a strong Aramean kingdom
🗡️ Hadarezer was its powerful king
📈 His defeat marks a turning point
📖 The rest of the chapter follows from it

---

## 🏞️ As He Went To Stablish His Dominion By The River Euphrates

"Stablish" is an older spelling of establish, meaning to make firm and lasting.

Hadarezer was expanding his own territory north toward the Euphrates when David stopped him.

The Euphrates marked the far northern edge of the land God promised to Abraham.

Israel briefly reaches that promised boundary here for the first time.

🏞️ Stablish means to make lasting
🗺️ Hadarezer was expanding his own territory
📜 The Euphrates was Abraham's promised boundary
📖 Israel briefly reaches that far edge

---

## 🐎 A Thousand Chariots, And Seven Thousand Horsemen, And Twenty Thousand Footmen

Chariots and horsemen formed the most expensive, elite part of an ancient army.

Footmen were ordinary foot soldiers, the largest and least costly part of any force.

These numbers describe one of the biggest armies David had faced up to now.

The scale of the army makes the coming victory even more striking.

🐎 Chariots and horsemen were elite forces
🚶 Footmen were ordinary foot soldiers
📊 This was a massive enemy army
📖 The size makes the victory more striking

---

## ✂️ David Also Houghed All The Chariot Horses

To hough an animal means to cut the tendons in its legs, disabling it.

This stopped captured chariot horses from ever being used in battle again.

Israel's law never envisioned the king building a large chariot force of his own.

David is deliberately limiting his own future temptation toward that kind of army.

✂️ Houghed means cutting the leg tendons
🚫 It permanently disabled the horses
📜 Israel's law warned against relying on chariots
📖 David limits his own future temptation

---

## 🐴 Reserved Of Them An Hundred Chariots

Out of the entire captured force, David kept only a small number for himself.

A hundred chariots was a modest reserve compared to the thousand he had captured.

That choice reflects restraint.

It was not an appetite for a massive war machine.

The bulk of the army's strength is deliberately removed instead of absorbed.

🐴 Only a hundred chariots were kept
📉 That was a small fraction of the total
🧭 It shows restraint, not ambition
📖 Most of the captured strength was removed

---

## 🤝 The Syrians Of Damascus Came To Help Hadarezer

Damascus was the capital of a separate Aramean kingdom south of Zobah.

These Syrians arrived as reinforcements once their fellow Arameans came under attack.

Regional kingdoms often banded together against a common rising threat like David.

Their alliance was not enough to change the outcome of this battle.

🤝 Damascus was a separate Aramean city
🏹 They arrived as reinforcements for Zobah
🌍 Neighboring kingdoms often allied together
📖 Their alliance still could not save Zobah

---

## 💀 David Slew Of The Syrians Two And Twenty Thousand Men

This is the KJV way of writing twenty two thousand.

The number shows this was not a small skirmish but a major battlefield defeat.

Losing this many soldiers crippled Damascus as a military power for years.

David's kingdom is expanding largely through the collapse of these northern rivals.

💀 Two and twenty thousand means twenty two thousand
📉 This was a crushing military loss
🏙️ Damascus was crippled for years
📖 David's kingdom grows as northern rivals fall

---

## 🏯 Put Garrisons In Syriadamascus

A garrison is a permanent stationed force left behind to hold captured territory.

Winning a battle and holding the land afterward are two different tasks.

Placing troops directly inside Damascus turned a defeated rival into occupied territory.

The Syrians named here become long term subjects.

This was not just a one time conquest.

🏯 A garrison is a permanent occupying force
🏆 Winning battles and holding land differ
🏙️ Damascus itself now houses Israelite troops
📖 Defeat becomes lasting control

# FirstChronicles 18:7-8
# 🏺 Plunder Brought To Jerusalem
---
## 🥇 The Shields Of Gold That Were On The Servants Of Hadarezer

These gold shields belonged to Hadarezer's royal bodyguard, not his ordinary soldiers.

Ordinary soldiers carried plain bronze instead.

Carrying gold marked these men as an elite honor guard.

Capturing a king's personal guard equipment was a public sign of total defeat.

Solomon later hangs similar gold shields in his own palace as a display of wealth.

🥇 Gold shields marked an elite guard
👑 They belonged to Hadarezer's honor troops
🏆 Capturing them signaled total defeat
📖 Solomon later displays gold shields of his own

---

## 🏙️ From Tibhath, And From Chun, Cities Of Hadarezer

Tibhath and Chun were smaller cities under Hadarezer's control, not major capitals.

The parallel account in 2 Samuel calls these same two cities by different names.

Ancient cities were often known by more than one name depending on the source.

Either way, the point is the same land changing hands from Zobah to Israel.

🏙️ Tibhath and Chun were minor cities
📚 2 Samuel records different names for them
🔤 Ancient cities often had more than one name
📖 The land itself passes to Israel either way

---

## 🌊 Very Much Brass, Wherewith Solomon Made The Brasen Sea

Brass here means bronze, a much stronger and more valuable metal than plain copper.

The brasen sea was an enormous bronze basin used later for priestly washing.

That basin would not exist yet at this point in the story.

Chronicles is pausing to explain where the raw material for it ultimately came from.

🌊 Brass here means bronze
🛁 The brasen sea was a huge washing basin
⏳ It was not built until Solomon's reign
📖 Chronicles traces the metal back to this victory

---

## 🏛️ The Pillars, And The Vessels Of Brass

The pillars were two large bronze columns named Jachin and Boaz at the temple entrance.

Vessels means the many bronze bowls, basins, and tools used in temple worship.

None of these objects exist yet when David wins this battle.

This whole verse is really pointing forward to his son's future temple.

🏛️ The pillars stood at the temple entrance
🍶 Vessels were bronze bowls and tools
⏳ None of it existed yet under David
📖 The verse points forward to Solomon's temple

# FirstChronicles 18:9-11
# 🕊️ Tou Sends Gifts, David Dedicates Them To The LORD
---
## 👑 Tou King Of Hamath

Hamath was yet another Aramean kingdom, located further north than Zobah or Damascus.

Tou ruled Hamath and had his own long standing rivalry with Hadarezer of Zobah.

News of Hadarezer's crushing defeat reached even this distant northern kingdom.

David's victory is now shaping politics well beyond Israel's own borders.

👑 Hamath was a kingdom further north
⚔️ Tou was Hadarezer's own longtime rival
📰 News of the defeat traveled far
📖 David's victory reshapes regional politics

---

## 🤝 He Sent Hadoram His Son To King David, To Enquire Of His Welfare, And To Congratulate Him

Sending your own son as a messenger was a high honor in the ancient world.

"Enquire of his welfare" was formal language for a diplomatic goodwill visit.

Tou is not surrendering here, he is celebrating a shared enemy's downfall.

This kind of royal visit could open trade and alliance between two kingdoms.

🤝 Sending a son showed high honor
📜 Enquire of welfare meant a diplomatic visit
🎉 Tou is celebrating, not surrendering
📖 Royal visits often opened trade and alliance

---

## ⚔️ For Hadarezer Had War With Tou

This short line explains exactly why Tou is so pleased with David's victory.

Hadarezer had been Tou's enemy long before David ever entered the picture.

David did not create this conflict, he simply won a war Tou already had.

Understanding old regional feuds explains why a stranger's rival can feel like a friend.

⚔️ Hadarezer and Tou were already enemies
🗓️ Their rivalry predates David entirely
🎯 David simply won a war Tou already had
📖 An old feud explains a new friendship

---

## 🙏 King David Dedicated Unto The LORD

To dedicate something means setting it apart permanently, so it can never be used for ordinary purposes.

David does not keep this wealth for his own palace or treasury.

Dedicating war plunder to God was David's regular practice, not a one time gesture.

The credit for every victory in this chapter is quietly handed back to God.

🙏 Dedicate means set apart permanently
🏦 David did not keep the wealth himself
🔁 This was David's regular practice
📖 Every victory's credit returns to God

---

## 🌍 From Edom, And From Moab, And From The Children Of Ammon, And From The Philistines, And From Amalek

This verse lists five separate nations David had defeated over his reign.

Edom and Moab sat on either side of the Dead Sea.

Ammon lay further northeast, Philistia along the coast, and Amalek out in the desert.

Chronicles compresses many separate campaigns into one single sweeping verse.

🌍 Five nations are named together here
🧭 They surround Israel on every side
📋 Each represents a separate earlier campaign
📖 The list summarizes David's whole reign of conquest

# FirstChronicles 18:12-13
# 🧂 Abishai Defeats Edom
---
## 👤 Abishai The Son Of Zeruiah

Zeruiah was David's own sister, making Abishai the king's nephew.

Abishai and his brother Joab were both counted among David's most trusted commanders.

Family ties like this ran deep through David's inner circle of leadership.

Zeruiah's sons appear again and again across the books of Samuel and Chronicles.

👤 Abishai was David's own nephew
👪 Zeruiah, his mother, was David's sister
🗡️ He was one of David's top commanders
📖 Zeruiah's sons recur throughout Samuel and Chronicles

---

## 🧂 Slew Of The Edomites In The Valley Of Salt Eighteen Thousand

The valley of salt sat south of the Dead Sea near Edom's own territory.

Edom traced its ancestry back to Esau, Jacob's twin brother.

Eighteen thousand losses effectively broke Edom's ability to resist Israel for a generation.

The parallel account in 2 Samuel credits this same victory directly to David as king.

🧂 The valley of salt lay near Edom
👪 Edom descended from Esau
📉 This broke Edom's power for a generation
📖 Samuel credits the win to David as commander

---

## 🏰 He Put Garrisons In Edom

Just as with Damascus earlier in the chapter, occupation follows the battlefield win.

Edom sat on a key trade route running south toward the Red Sea.

Controlling Edom gave Israel access to valuable trade and, later, copper mining.

Solomon's later wealth partly depends on Israel holding this exact territory.

🏰 Garrisons again followed a battlefield win
🛣️ Edom sat on a key trade route
💰 It brought access to trade and mining
📖 Solomon's later wealth depends on this control

---

## 👥 All The Edomites Became David's Servants

This phrase repeats the exact pattern already used for Moab and Damascus.

Chronicles is showing the same outcome happening again and again across the chapter.

Every defeated nation lands in the same subject relationship to Israel's king.

The repetition itself is the point.

David's reach is becoming complete.

👥 The same phrase repeats from earlier
🔁 Moab, Damascus, and now Edom match
👑 Every enemy lands in the same place
📖 Repetition shows David's reach becoming complete

---

## 🛡️ Thus The LORD Preserved David Whithersoever He Went

This exact sentence already appeared once before, back in verse six.

Repeating a line word for word in Hebrew writing is a deliberate signal of emphasis.

The line frames the whole chapter's string of victories as God's doing, not David's skill.

Every conquest described from beginning to end traces back to this one simple sentence.

🛡️ This line already appeared in verse six
🔁 Repetition here signals real emphasis
🙌 It credits God, not David's own skill
📖 Every victory traces back to this line

# FirstChronicles 18:14-17
# 👥 David's Officials
---
## ⚖️ Executed Judgment And Justice Among All His People

A king's job was never only winning battles and collecting tribute.

Judgment and justice meant fair rulings in disputes between his own people.

Chronicles pauses the war narrative to note David also governed well at home.

Military success alone was never the whole measure of a faithful king.

⚖️ A king's job went beyond battle
🧑‍⚖️ Judgment meant fair rulings for his people
🏠 Chronicles notes his rule at home too
📖 Faithful kingship required more than conquest

---

## 🗡️ Joab The Son Of Zeruiah Was Over The Host

Joab was Abishai's brother, another of David's nephews through their mother Zeruiah.

"Over the host" means he served as commander in chief of Israel's whole army.

Joab held this powerful position for most of David's long reign as king.

Placing a family member over the army kept military power close to the throne.

🗡️ Joab was Abishai's own brother
👑 Over the host means commander in chief
📅 He led it for most of David's reign
📖 Family ties kept power close to the throne

---

## 📜 Jehoshaphat The Son Of Ahilud, Recorder

A recorder served as the kingdom's official historian and record keeper.

He documented royal decisions, events, and decrees for the palace archives.

This role required someone trusted enough to shape how David's reign would be remembered.

Ancient kingdoms relied on officials like this long before printed books existed.

📜 A recorder kept official royal records
🖋️ He documented decisions and events
🤝 The role required deep royal trust
📖 Ancient kingdoms depended on trusted record keepers

---

## 🕎 Zadok The Son Of Ahitub, And Abimelech The Son Of Abiathar, Were The Priests

David unusually had two men serving as high priest at the same time.

Zadok descended from Aaron's son Eleazar.

Abiathar's line came through Ithamar instead.

Two priestly lines serving side by side was a rare arrangement, not the ordinary pattern.

Solomon later resolves this by removing Abiathar's line and confirming Zadok alone.

🕎 Two men shared the high priesthood
👪 They descended from two different priestly lines
⚖️ This arrangement was unusual for Israel
📖 Solomon later confirms Zadok's line alone

---

## ✍️ Shavsha Was Scribe

A scribe managed the kingdom's official correspondence and written documents.

This job demanded literacy, a skill held by very few people in this era.

Other biblical passages spell this same official's name slightly differently, such as Seraiah.

Spelling differences like this are common when names pass through generations of copying.

✍️ A scribe handled official writing and letters
📚 Literacy itself was a rare skill then
🔤 His name appears spelled differently elsewhere
📖 Copying across generations often shifted spellings

---

## 🛡️ Benaiah The Son Of Jehoiada Was Over The Cherethites And The Pelethites

Benaiah commanded David's personal bodyguard, a role distinct from Joab's national army.

The Cherethites and Pelethites were foreign mercenary troops loyal only to the king himself.

Many scholars believe they had roots among the Philistines and nearby coastal peoples.

Foreign guards owed nothing to Israel's own tribal politics, which made them fiercely loyal.

🛡️ Benaiah led David's personal bodyguard
🌊 The Cherethites and Pelethites were foreign troops
🗺️ They likely came from coastal peoples nearby
📖 Outsiders made especially loyal royal guards

---

## 👑 The Sons Of David Were Chief About The King

This phrase describes David's own sons serving in a leading role at court.

The parallel account in 2 Samuel actually calls them chief rulers, not priests.

David's sons were not from the priestly tribe of Levi, so priest cannot be literal here.

Chronicles likely uses the word loosely for a position of high honor near the throne.

👑 David's sons held a leading court role
📚 2 Samuel calls them chief rulers instead
🚫 They were not from the priestly tribe
📖 The word here signals high honor, not priesthood
`.trim();

export const FIRST_CHRONICLES_EIGHTEEN_PERSONAL_SECTIONS = parseFirstChroniclesEighteenRawNotes(FIRST_CHRONICLES_EIGHTEEN_RAW_NOTES);
