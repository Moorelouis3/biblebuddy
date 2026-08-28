export type EzraFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraFourRawNotes(rawText: string): EzraFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 4:${startVerse}` : `Ezra 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezra 4 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_FOUR_RAW_NOTES = `# Ezra 4:1-3
# 🏛️ We Seek Your God, As Ye Do
---
## 😠 The Adversaries Of Judah And Benjamin

The word adversaries means people who work against you on purpose.

These were not foreign invaders from far away.

They were people already living in the land around Jerusalem.

Many of their ancestors were foreigners resettled there generations earlier by Assyrian kings.

They watched the exiles rebuild and saw a threat to their own position.

😠 Adversaries means people working against you

🏘️ They already lived near Jerusalem

📜 Assyria had resettled their ancestors there

📖 They saw the rebuilding as a threat

---
## 🏛️ Children Of The Captivity

This phrase means the Jews who had just returned from exile in Babylon.

The captivity refers to the seventy years the nation spent removed from its own land.

Calling them children of the captivity marks them as a generation shaped by exile.

They grew up displaced, and now they were finally home.

🏛️ Children of the captivity means returned exiles

⏳ Refers to the seventy years in Babylon

🏠 A generation shaped by displacement

📖 Now finally home in their land

---
## 🤝 Chief Of The Fathers

The chief of the fathers were the heads of Israel's family clans.

Israel was organized by tribe, then by clan, then by individual household.

These leaders carried authority passed down through generations.

When decisions affected the whole community, the family heads spoke for their people.

🤝 Chief of the fathers means clan leaders

🏘️ Israel was organized by tribe and clan

👴 Authority passed down through generations

📖 They spoke for their people

---
## 🙏 We Seek Your God, As Ye Do

This sounds like an honest offer of shared faith.

It was not.

Second Kings explains that these same people worshipped the LORD alongside their own gods.

They feared the LORD, but they also served idols they had brought from their homelands.

Their worship mixed true faith with pagan practice, which the Bible calls syncretism.

Zerubbabel could hear the difference even if the offer sounded friendly.

🙏 The offer sounded like shared faith

🎭 It masked a mixed form of worship

⚖️ They combined the LORD with idols

📖 Zerubbabel could hear the real difference

---
## 📜 Since The Days Of Esarhaddon King Of Assur

Esarhaddon ruled the Assyrian empire more than a century before this scene.

He continued a policy of moving conquered peoples into the northern land of Israel.

Those transplanted families intermarried with the few Israelites left behind after Assyria's conquest.

Their descendants became the mixed population now offering to help rebuild the temple.

📜 Esarhaddon ruled Assyria long before this scene

🚚 He moved conquered peoples into Israel

👪 Those families intermarried with those left behind

📖 Their descendants now offer to help

---
## 🚫 Ye Have Nothing To Do With Us To Build An House

Zerubbabel drew a clear line and did not soften it.

This was not rudeness for its own sake.

The temple belonged to the covenant people God had brought home, not to a mixed population.

Letting outsiders share the work risked letting outsiders shape the worship itself.

🚫 Zerubbabel drew a firm boundary

🏛️ The temple belonged to the covenant people

🎭 Mixed worship could not share the work

📖 Protecting the work protected true worship

---
## 🏗️ We Ourselves Together Will Build

Zerubbabel did not just refuse help.

He restated exactly who was responsible for the work.

The phrase together will build shows unity inside the returned community itself.

Their authority came from one place only, the decree of King Cyrus.

🏗️ He restated who was responsible

🤝 Together shows unity among the exiles

📜 Their authority came from Cyrus alone

📖 One clear source of legitimacy

---
# Ezra 4:4-5
# 😔 Weakened The Hands
---
## 😔 Weakened The Hands Of The People Of Judah

This is a Hebrew idiom for discouragement.

Weak hands cannot lift tools or carry stone.

The neighboring peoples worked to drain the exiles of energy and hope for the project.

Discouragement can stop a work just as effectively as an army can.

😔 Weakened hands is an idiom for discouragement

🛠️ Weak hands cannot do the work

😞 They drained the exiles' hope and energy

📖 Discouragement can stop work like an army

---
## 🧨 Troubled Them In Building

Trouble here goes beyond mere words of discouragement.

It describes active interference with the actual construction.

This likely included harassment, false reports, and small acts meant to slow the work.

The opposition was not just emotional, it was practical and ongoing.

🧨 Trouble means active interference, not just words

🧱 They disrupted the actual construction

📢 False reports and harassment likely followed

📖 Opposition was practical, not only emotional

---
## 💰 Hired Counsellors Against Them

Persian officials could be persuaded with money.

Hiring counsellors against them means the neighboring peoples bribed local officials to stall the project.

This was quiet political sabotage.

It never became open attack.

Money moved the decision makers long before soldiers ever needed to.

💰 Counsellors could be bribed with money

🤫 This was quiet political sabotage

📋 Officials were persuaded to stall the work

📖 Money moved decisions before force did

---
## ⏳ Until The Reign Of Darius King Of Persia

This single verse covers a span of decades.

Cyrus began the return around 538 BC, and Darius did not take the throne until near 522 BC.

Opposition to the temple did not last a season, it lasted an entire generation.

Only new leadership in Persia finally allowed the work to move forward again.

⏳ This verse spans decades of history

👑 Cyrus began, Darius took the throne later

😔 Opposition lasted almost a generation

📖 New leadership finally allowed progress

---
# Ezra 4:6-7
# ⏳ A Jump Forward In Time
---
## 👑 In The Reign Of Ahasuerus

Ahasuerus is the same king known elsewhere in the Bible as the husband of Esther.

Most scholars identify him with Xerxes the First, who ruled Persia decades after Darius.

This verse suddenly jumps past the king named just one sentence earlier.

Ezra is not telling the story in strict order here.

👑 Ahasuerus is Esther's husband elsewhere

📅 Usually identified as Xerxes the First

⏭️ The verse jumps past Darius suddenly

📖 Ezra is not writing in strict order

---
## 📜 Wrote They An Accusation

This is the first of two separate opposition letters mentioned in this chapter.

An accusation here means a formal written complaint sent to the royal court.

The target was the same, the Jewish community rebuilding in Jerusalem.

Opposition did not stop with one generation, it kept renewing itself under new kings.

📜 A formal written complaint to the king

🎯 Aimed at the Jewish community again

🔁 Opposition renewed itself under new kings

📖 A pattern repeats across generations

---
## 👑 In The Days Of Artaxerxes

Artaxerxes the First ruled even later than Ahasuerus, close to forty years after Darius.

This is the second and much longer letter that fills the rest of this chapter.

The subject of this letter is different too, as verse twelve will reveal.

Ezra is building a case about ongoing opposition before returning to his main story.

👑 Artaxerxes ruled even later than Ahasuerus

📄 Introduces the chapter's second, longer letter

🔍 A different subject than the first letter

📖 Ezra builds his case before returning

---
## 🗣️ Written In The Syrian Tongue

The Syrian tongue means Aramaic, the common language of Persian government business.

Aramaic worked across the empire the way a shared trade language works today.

Starting here, the book of Ezra itself actually switches into Aramaic for several chapters.

That shift is a real feature of the ancient text, not a translation choice.

🗣️ Syrian tongue means Aramaic

🏛️ The common language of Persian government

🔤 A real feature of the ancient document

📖 Ezra's own text shifts into Aramaic here

---
# Ezra 4:8-10
# ✍️ Rehum And Shimshai Write
---
## ✍️ Rehum The Chancellor And Shimshai The Scribe

A chancellor was a senior government official, similar to a regional governor's chief officer.

A scribe was a trained professional who drafted official documents and kept records.

These two men led the effort to put the complaint in writing.

Naming them shows this was an organized government action, not a rumor.

✍️ Chancellor was a senior government officer

📝 Scribe drafted official documents and records

🏛️ They led an organized government effort

📖 This was policy, not just rumor

---
## 😠 Wrote A Letter Against Jerusalem

The letter's target is named plainly, the city of Jerusalem itself.

This was not a private grievance between neighbors.

It was a formal appeal meant to reach the king of Persia directly.

The goal was to use imperial power to stop the rebuilding for good.

😠 Jerusalem itself was the named target

📨 A formal appeal, not a private complaint

👑 Aimed straight at the Persian king

📖 The goal was to stop the work

---
## 🌍 The Rest Of Their Companions

This phrase closes a long list of peoples joining the complaint.

Assyria and Babylon had both resettled conquered populations into this region over many years.

Naming so many different groups shows how broad this coalition against Jerusalem really was.

A single letter carried the weight of many transplanted nations.

🌍 Closes a long list of peoples

🚚 Assyria and Babylon resettled many groups here

🤝 Shows how broad the coalition was

📖 One letter carried many nations' weight

---
## 👑 The Great And Noble Asnapper

Many scholars identify Asnapper with Ashurbanipal, a powerful king of Assyria.

He continued the practice of moving conquered peoples into the land of Israel.

Calling him great and noble is not the Bible's own judgment, it is how these accusers described him.

The title reveals whose side these writers were really on.

👑 Likely the Assyrian king Ashurbanipal

🚚 He continued resettling peoples into Israel

🗣️ Great and noble was the accusers' own praise

📖 The title reveals whose side they were on

---
## 🌊 On This Side The River

This phrase is Persian administrative language for the region west of the Euphrates.

From the king's palace far to the east, that whole region simply sat on this side.

It included Israel, Syria, and Phoenicia inside one large governing district.

The same phrase repeats through this chapter because it is the letter's official language.

🌊 Persian term for land west of the Euphrates

🗺️ Named from the palace far to the east

🏛️ One large governing district for the region

📖 Official language repeated through the letter

---
# Ezra 4:11-16
# 📜 The Letter To Artaxerxes
---
## 📋 This Is The Copy Of The Letter

Ancient officials often opened formal letters by announcing that a copy follows.

This phrasing signals the writer is now quoting the document word for word.

Ezra preserves the actual letter here instead of only summarizing it.

That choice lets today's reader see the accusation exactly as the king received it.

📋 Signals a word for word quotation

📜 A real preserved government document

👀 The reader sees the original wording

📖 Not summarized, but shown directly

---
## 🤝 Thy Servants The Men

Calling themselves the king's servants was a standard way to open a loyal petition.

It reminded the king that these men answered to him, not to Jerusalem.

The phrase frames the whole letter as loyalty protecting the crown's interest.

Every accusation that follows rests on this claim of faithful service.

🤝 A standard opening for a loyal petition

👑 Reminds the king who they answer to

🛡️ Frames the letter as protecting the crown

📖 Loyalty is the foundation of their case

---
## 🏙️ The Rebellious And The Bad City

This description was not neutral, it was chosen to provoke alarm.

Jerusalem did have a real history of revolt against earlier empires.

Naming it rebellious before the king had even heard the facts stacked the case from the start.

Words alone were doing much of the persuading here.

🏙️ A description chosen to provoke alarm

⚖️ The case was stacked before the facts

🗣️ Words did much of the persuading

📖 Jerusalem did have a history of revolt

---
## 🧱 Set Up The Walls Thereof

This detail changes what the whole letter is actually about.

It is not the temple these accusers are describing, it is the city's defensive walls.

That makes this a different building project than the one from chapter three.

It confirms this letter belongs to a later moment, likely closer to Nehemiah's own time.

🧱 The subject here is walls, not the temple

🏗️ A different building project entirely

⏳ Points to a later time period

📖 Likely closer to Nehemiah's own mission

---
## 💰 Toll, Tribute, And Custom

These were three separate kinds of Persian taxation, not one blended fee.

Toll was a tax on goods moving through a region.

Tribute was a required payment owed directly to the crown.

Custom was a duty charged on trade at a border or gate.

💰 Three separate kinds of Persian taxation

🚚 Toll taxed goods moving through

👑 Tribute was owed to the crown

📖 Custom was a trade duty at the gate

---
## 📉 Endamage The Revenue Of The Kings

Endamage is an old word that simply means to damage or harm.

The accusers were not really worried about spiritual rebellion.

They were warning that a fortified Jerusalem would stop paying its full share of taxes.

Framing the complaint around money was far more likely to move a king to act.

📉 Endamage means to damage or harm

💸 The real worry was lost tax income

🎯 Money moves a king faster than religion

📖 The complaint was framed around revenue

---
## 🏛️ We Have Maintenance From The King's Palace

Maintenance here means these officials drew their own salary from the royal treasury.

That detail exposes their motive plainly.

Protecting the king's revenue also protected their personal income.

Their loyalty and their paycheck were pointing in the exact same direction.

🏛️ Maintenance means their salary from the crown

💵 Their income depended on the king's revenue

🎯 Loyalty and personal gain lined up

📖 Their motive was plainly self interest

---
## 📚 The Book Of The Records

Persian kings kept detailed written archives of past events across their empire.

Appealing to written records was the ancient version of asking someone to check the file.

The accusers were confident the archive would support their version of events.

That confidence turns out to be justified later in the chapter.

📚 Persian kings kept detailed written archives

🔍 An ancient way of saying check the record

🤞 They were confident the archive backed them

📖 Their confidence proves justified later on

---
## 🔥 For Which Cause Was This City Destroyed

This line points back to real history, the fall of Jerusalem to Babylon.

Second Kings records that Jerusalem's own rebellion against Babylon led to its destruction.

The accusers were not inventing this part, they were using true history for their own purpose.

Real facts can still be used to serve an unfair goal.

🔥 Points back to Jerusalem's destruction by Babylon

🎯 Used to serve the accusers' own goal

⚖️ True facts still served an unfair aim

📖 The history itself was true

---
## ⚠️ No Portion On This Side The River

This closing threat was a dramatic overstatement.

The accusers claimed the king would lose the entire region if Jerusalem rebuilt its walls.

One city's walls were never going to cost an empire an entire province.

Exaggeration was the final push to get the king's attention.

⚠️ A dramatic, exaggerated threat

🏙️ One city's walls could not cost a province

📢 Meant to grab the king's full attention

📖 Exaggeration was their final persuasive push

---
# Ezra 4:17-22
# 👑 The King's Reply
---
## 🕊️ Peace, And At Such A Time

Peace here was a standard formal greeting, not necessarily warm feeling.

Ancient royal letters opened with set phrases the same way a modern letter opens with dear sir.

At such a time was a placeholder marking where an exact date would normally appear.

The greeting tells the reader this is an official document, not a personal note.

🕊️ Peace was a standard formal greeting

✉️ Ancient letters opened with set phrases

📅 A placeholder for an exact date

📖 Signals an official document, not a personal note

---
## 📖 Plainly Read Before Me

The original complaint likely arrived written in Aramaic.

Reading it plainly before the king meant it was translated and read aloud in his presence.

Persian kings relied on interpreters and scribes to manage documents from every corner of the empire.

This detail shows how the letter actually reached the king's ears.

📖 Likely translated and read aloud

🗣️ Persian kings relied on interpreters

🏛️ The empire spanned many languages

➡️ This is how the letter reached him

---
## 🔍 Search Hath Been Made

The king did not simply take the accusers at their word.

He ordered his own officials to check the royal archives first.

This step shows Persian administration took written history seriously before acting.

Verifying claims first also protected the king from acting on a lie.

🔍 The king ordered his own investigation

📚 He checked the royal archives first

🏛️ Persian administration valued written proof

📖 Verifying claims protected against a lie

---
## 👑 Mighty Kings Also Over Jerusalem

This is a reference to David and Solomon, whose kingdom once stretched wide.

The archive search actually confirmed something true, Jerusalem really had ruled a large territory before.

What was meant as a warning also doubled as an unintended compliment.

Jerusalem's old greatness was real, even centuries later in a foreign court's own records.

👑 Points back to David and Solomon's kingdom

📚 The archive confirmed this was true

🎯 A warning that became an unintended compliment

📖 Jerusalem's old greatness still stood in the record

---
## 💰 Toll, Tribute, And Custom, Was Paid Unto Them

This confirms that Jerusalem once collected the very same taxes now being fought over.

The irony would not have been lost on a careful reader.

The city now called rebellious once stood on the receiving end of tribute, not the paying end.

History had simply turned in the other direction.

💰 Jerusalem once collected these same taxes

🔄 An ironic twist for a careful reader

👑 It once received tribute, not paid it

📖 History had simply turned around

---
## 🛑 Cause These Men To Cease

This is the king's actual order, not just a warning.

Work on Jerusalem's walls was to stop immediately by royal command.

The order used real imperial authority, backed by soldiers if needed.

A single sentence from Artaxerxes could halt years of local effort.

🛑 The king's actual order to stop

🏛️ Backed by real imperial authority

⚔️ Soldiers stood ready to enforce it

📖 One sentence could halt years of work

---
## ⏳ Until Another Commandment

This detail is easy to miss but matters a great deal.

The king did not end the project permanently, only for now.

That single word until leaves the door open for a future reversal.

Nehemiah later returns to this very city with permission to finish exactly this wall.

⏳ The halt was temporary, not permanent

🚪 Until leaves the door open

🔮 Foreshadows a later reversal

📖 Nehemiah later finishes this very wall

---
## 🚨 Take Heed Now That Ye Fail Not

The king closes with urgency, not a casual request.

He repeats the same financial worry that opened the whole complaint.

Why should damage grow makes the king's real motive plain one more time.

Money, not theology, was driving the final word on this matter.

🚨 The closing tone is urgent, not casual

💰 Repeats the same financial worry again

🎯 Reveals the king's real motive plainly

📖 Money, not theology, drove the final word

---
# Ezra 4:23-24
# 🛑 The Work Ceased
---
## ⚔️ By Force And Power

This was not a polite delivery of a royal memo.

Rehum and Shimshai rushed to Jerusalem with soldiers, not just paperwork.

Force and power means the stop order was carried out physically, if necessary.

Opposition had moved from letters all the way to armed enforcement.

⚔️ Not a polite delivery of a memo

🏃 They rushed to Jerusalem with soldiers

✋ The order was enforced physically

📖 Opposition escalated from letters to force

---
## 🛑 Then Ceased The Work

The word then signals the narrative is snapping back into place.

Everything from verse six through twenty three was a flash forward about a later letter.

Now the story returns to where verse five actually left off.

This is Ezra's way of showing a pattern of opposition before continuing the real timeline.

🛑 Then signals the story snapping back

⏮️ Verses six through twenty three flash forward

🔄 The timeline now returns to verse five

📖 A pattern shown, then the real story continues

---
## 🔄 Until The Second Year Of Darius

This closes the loop opened back in verse five of this chapter.

The temple work had been stalled from the days of Cyrus all the way through this point.

Darius's second year lines up with close to 520 BC, when Haggai and Zechariah begin preaching.

Their preaching is exactly what restarts the work in the very next chapter.

🔄 Closes the loop from verse five

⏳ Stalled from Cyrus's days until now

📢 Haggai and Zechariah begin preaching here

📖 Their preaching restarts the work next
`.trim();

export const EZRA_FOUR_PERSONAL_SECTIONS = parseEzraFourRawNotes(EZRA_FOUR_RAW_NOTES);
