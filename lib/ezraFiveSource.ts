export type EzraFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraFiveRawNotes(rawText: string): EzraFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 5:${startVerse}` : `Ezra 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezra 5 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_FIVE_RAW_NOTES = `# Ezra 5:1-2
# 📢 The Prophets Restart The Work
---
## 🗣️ Haggai The Prophet

Haggai was one of the last prophets God sent to Israel.

He began preaching in the second year of King Darius.

That was around the year 520 BC, the same year as this chapter.

His whole message survives in a short book named after him.

The people had built comfortable homes for themselves.

God's house still sat unfinished nearby.

🕎 One of the last Old Testament prophets

⏳ Preached around 520 BC

🏠 People had homes, God's house waited

📖 His preaching restarts the temple work

---
## 📜 Zechariah The Son Of Iddo

Zechariah was a younger contemporary of Haggai.

He began prophesying about two months after Haggai started.

His book is full of strange visions.

Those visions point toward the same goal as Haggai's message.

Iddo was Zechariah's grandfather.

Zechariah is also called a priest elsewhere in scripture.

He carried both callings, priest and prophet, into his ministry.

🔮 A younger contemporary of Haggai

📅 Began preaching two months after him

👁️ His book is full of strange visions

📖 He was both a priest and a prophet

---
## 🙏 In The Name Of The God Of Israel

To speak in someone's name means to speak with their authority.

Haggai and Zechariah were not sharing personal opinions.

They stood before the people as God's own messengers.

The title the God of Israel points back to the covenant.

It recalls the promises made to this specific nation.

These prophets were reminding Judah of an old promise, not inventing a new one.

🗣️ Speaking in a name means speaking with authority

👤 The prophets carried God's authority, not their own

📜 The God of Israel recalls the covenant

📖 They renewed an old promise again

---
## 👑 Zerubbabel The Son Of Shealtiel

Zerubbabel was the governor over the returned exiles.

He was a descendant of King David through the royal line.

That made him the political leader of the new community.

His name means seed of Babylon, since he was born there in exile.

A descendant of David leading the people again carried real weight.

It kept the promise of David's line alive.

👑 Governor over the returned exiles

🌳 A descendant of King David

🍼 His name means seed of Babylon

📖 David's royal line was still alive

---
## ⚖️ Jeshua The Son Of Jozadak

Jeshua was the high priest over the returned community.

His father Jozadak had been carried to Babylon during the exile.

Jeshua represented the priestly, worship side of Israel's leadership.

Zerubbabel led the government.

Jeshua led the temple and its worship.

Together the two covered both halves of Israel's life.

🙏 Jeshua was the high priest

👨 His father Jozadak was exiled to Babylon

⚖️ Zerubbabel led government, Jeshua led worship

📖 Together they covered all of Israel's life

---
## 🏗️ Began To Build The House Of God

The word then marks a turning point after years of silence.

Chapter four ended with the work stopped by royal order.

Building started again for the first time in over a decade.

Nothing about the political situation had actually changed.

No new decree had arrived from the king.

The prophets' preaching alone was enough to move these leaders to act.

⏸️ Work had been stopped for over a decade

🔥 Preaching alone restarted the building

🚫 No new royal decree had arrived

➡️ Obedience came before permission this time

---
## 🙌 The Prophets Of God Helping Them

Helping here does not mean Haggai and Zechariah picked up tools.

Their help was spiritual, not physical labor.

They stood alongside the builders and kept preaching as the work went on.

Encouragement can matter as much to a project as materials do.

A discouraged people had stopped building once already.

This time preaching kept their courage from running out again.

🙌 Their help was spiritual, not physical labor

📢 They kept preaching as the work continued

💪 Encouragement can matter as much as materials

➡️ Courage kept the builders from stalling again

---
# Ezra 5:3-5
# 🔍 Tatnai's Investigation
---
## 🏛️ Tatnai, Governor On This Side The River, And Shetharboznai

Tatnai was the Persian governor over the region west of the Euphrates.

That territory included Israel, Syria, and Phoenicia in one large district.

Persian records outside the Bible even mention an official by this name.

Shetharboznai was a second official traveling with him.

Officials like this rarely worked alone.

Traveling as a pair added weight to an official inquiry.

🏛️ Tatnai governed the region west of the Euphrates

📜 Outside Persian records confirm his name

👥 Shetharboznai traveled with him as a second official

📖 Traveling as a pair added official weight

---
## ❓ Who Hath Commanded You To Build This House

This question echoes the one asked back in chapter four.

The tone here is different.

Tatnai was not accusing anyone of rebellion.

He was asking a fair administrative question, who authorized this project.

Persian law required new construction to have a legal basis.

Without proof, Tatnai could not simply let the project continue unchecked.

❓ Echoes a question from chapter four

⚖️ This time the tone was neutral

📋 Persian law required proof of authorization

➡️ Tatnai needed a legal basis to allow it

---
## 🧱 To Make Up This Wall

This wall does not mean the city walls of Jerusalem.

The context here is clearly the temple building itself.

Ancient temples often had a surrounding wall marking off sacred space.

That wall separated ordinary ground from the area set apart for worship.

Confusing this with Nehemiah's later city wall project is an easy mistake.

Those are two separate building efforts, decades apart.

🏛️ This is the temple's wall, not the city's

🧱 Temples had walls marking off sacred space

⚠️ Easy to confuse with Nehemiah's later wall

📖 These are two separate projects, decades apart

---
## 👁️ What Are The Names Of The Men

The word we is a signal worth noticing.

Ezra is quoting directly from Tatnai's own report.

For a stretch of this chapter, the text speaks in the voice of Persian officials.

It is not the narrator's own words anymore.

Asking for names was standard procedure.

Officials wanted individual builders accountable, not just a faceless crowd.

👁️ Ezra quotes Tatnai's report directly

🗣️ The voice shifts to the Persian officials

📋 Asking for names was standard procedure

📖 Officials wanted individuals accountable, not a crowd

---
## 👀 The Eye Of Their God Was Upon The Elders

This is a picture of God watching over His people with care.

The same image shows up in the Psalms.

Psalm 33 says the LORD's eye is on those who fear Him.

Here that watching kept the elders safe during an official investigation.

Nothing about Tatnai's visit was left to chance.

👀 A picture of God's watchful care

📜 The same image appears in the Psalms

🛡️ God's watching protected the elders here

➡️ Nothing was left to chance here

---
## ⏸️ They Could Not Cause Them To Cease

This detail marks a real change from chapter four.

Back then, opposition actually succeeded in stopping the work.

This time, Tatnai's investigation never shut the project down.

The builders kept working the entire time they were being questioned.

🔄 A real change from chapter four

⛔ Opposition succeeded once before, not now

🏗️ Builders kept working during the investigation

📖 God's protection made the difference

---
## 👑 Till The Matter Came To Darius

Tatnai did not have the authority to make this call alone.

Persian administration ran on careful process, not snap decisions by local governors.

The matter had to travel all the way to the king himself.

That process took time, but it also protected the Jews from an unfair local ruling.

A fair hearing at the top was better than a hasty verdict nearby.

📤 Tatnai sent the matter up the chain

⚖️ Persian process avoided snap local decisions

👑 Only Darius could give the final word

➡️ A slower process could be a fairer one

---
# Ezra 5:6-10
# 📜 The Report To Darius
---
## 📋 The Copy Of The Letter

Ancient officials often opened formal letters by announcing that a copy follows.

This phrasing signals the writer is now quoting the document word for word.

Ezra preserves the actual letter here instead of only summarizing it.

That choice lets today's reader see the report exactly as the king received it.

📋 Signals a word for word quotation

📜 A real preserved government document

👀 The reader sees the original wording

📖 Not summarized, but shown directly

---
## 🏛️ The Apharsachites

The Apharsachites were a group or class of Persian officials.

Their exact role is not fully certain from outside sources.

Some scholars think the term describes an office, not a tribe.

Naming this group shows how many layers of Persian bureaucracy were involved.

🏛️ A group or class of Persian officials

❓ Their exact role is not fully certain

📜 Possibly a title, not a tribe

📖 Shows the many layers of Persian bureaucracy

---
## 🕊️ Unto Darius The King, All Peace

Peace here was a standard formal greeting, not a declaration of friendship.

Ancient royal letters opened with set phrases.

It reads much like a modern letter opening with dear sir.

This greeting is calm and respectful, unlike the hostile letter in chapter four.

The difference in tone hints that this report was written in good faith.

🕊️ A standard formal greeting, not friendship

✉️ Ancient letters opened with set phrases

⚖️ Calmer in tone than chapter four's letter

➡️ This report reads as more fair

---
## 🗺️ The Province Of Judea

Judea was the official Persian name for the territory of Judah.

Under Persian rule, the old kingdom became one small province among many.

The empire was divided into large regions, and each region held smaller provinces inside it.

Judea was a modest piece of a much larger Persian puzzle.

🗺️ Judea was Persia's name for Judah

🏛️ Judah became one small province

📦 Provinces sat inside larger imperial regions

📖 One small piece of a vast empire

---
## 🏛️ The House Of The Great God

Tatnai was a pagan Persian official, not a worshiper of Israel's God.

Calling this building the house of the great God stands out coming from him.

It suggests Tatnai's report was honest and not written to mock the Jews.

Even an outside official could recognize something real about this God.

🏛️ Tatnai was not a worshiper of Israel's God

👀 He still called it the great God's house

🤝 His report reads as honest, not mocking

📖 Even an outsider could sense something real here

---
## 🧱 Builded With Great Stones, And Timber Is Laid In The Walls

This detail describes real construction, not just plans on paper.

Great stones formed a strong, heavy foundation for the building.

Timber laid in the walls means wooden beams were built into the stone framework.

That combination of stone and wood was standard for major buildings in this region.

Tatnai's report confirms visible, physical progress on the temple.

🧱 Real construction, not just plans

🪨 Great stones formed a strong foundation

🪵 Timber beams were built into the walls

📖 The report confirms real physical progress

---
## 🏗️ This Work Goeth Fast On, And Prospereth

Goeth and prospereth are old verb forms of go and prosper.

The report says the work moves quickly and succeeds.

This is a strikingly positive statement from a Persian official investigating a foreign project.

Chapter four's letter tried to stop the work with fear.

This letter simply states what Tatnai actually saw.

🏗️ Goeth and prospereth mean go and prosper

🚀 The work moved quickly and succeeded

😲 A surprisingly positive report from an official

📖 This letter just states what he saw

---
## 📝 To Certify Thee

To certify thee means to confirm something for the king's official record.

This was a legal term, not a casual promise.

Officials needed proof they could stand behind if questioned later.

Careful language protected everyone involved in the report.

📝 Certify means to confirm for the record

⚖️ A legal term, not a casual promise

🛡️ Proof they could stand behind later

📖 Careful language protected everyone involved

---
## 📜 The Chief Of Them

Writing down the chief men's names created a clear paper trail.

These were the heads of the family clans among the returned exiles.

If anything went wrong later, the king would know exactly who to ask.

Naming leaders made the whole community accountable, not just anonymous.

📜 Names created a clear paper trail

👴 The heads of the family clans

🎯 The king would know who to ask

📖 Leaders made the whole community accountable

---
# Ezra 5:11-13
# 🏛️ The Elders Tell Their History
---
## 🙏 We Are The Servants Of The God Of Heaven And Earth

This title for God appears often in official Persian court settings.

Calling Him the God of heaven and earth stresses His power over everything, not just one nation.

The elders were not shrinking their God down to fit a foreign court.

They stated His full authority plainly, even while under investigation.

🙏 A title used often in Persian courts

🌍 Stresses God's power over everything

🗣️ The elders did not shrink their God down

📖 They stated His authority plainly under investigation

---
## 👑 Which A Great King Of Israel Builded And Set Up

This great king refers to Solomon, without naming him directly.

Solomon built the first temple centuries earlier, around 960 BC.

The elders were reminding Darius that this project had deep, ancient roots.

This was not some new or suspicious building scheme.

👑 The great king refers to Solomon

🏛️ Solomon built the first temple around 960 BC

🌳 The elders stressed the project's ancient roots

➡️ This was not a new or suspicious scheme

---
## 💔 Provoked The God Of Heaven Unto Wrath

This is a striking moment of honesty in an official letter.

The elders openly admitted their ancestors caused their own exile.

They did not blame Babylon or make excuses for what happened.

Wrath here means God's just anger at persistent, willful sin.

Owning the nation's own failure was part of telling the story rightly.

💔 The elders openly admitted their own guilt

🙅 No blame placed on Babylon instead

🔥 Wrath means God's just anger at sin

📖 They told their history honestly, faults included

---
## 🏺 Nebuchadnezzar The King Of Babylon, The Chaldean

Nebuchadnezzar was the Babylonian king who destroyed Jerusalem's first temple.

Chaldean refers to the ruling ethnic group that controlled Babylon at this time.

Calling him a Chaldean marks exactly which Babylonian dynasty this was.

This same king is well known from the book of Daniel too.

🏺 Nebuchadnezzar destroyed the first temple

🌍 Chaldean names his ruling ethnic group

👑 Marks exactly which Babylonian dynasty this was

📖 This king also appears in Daniel

---
## ⛓️ Carried The People Away Into Babylon

This phrase describes the Babylonian exile in one plain line.

Thousands of Jews were forced from their homeland and resettled far away.

Families, workers, and skilled craftsmen were taken, not just soldiers or leaders.

The exile lasted around seventy years before anyone returned.

⛓️ A plain summary of the exile

🚶 Thousands were forced from their homeland

👪 Families and workers were taken, not just leaders

📖 The exile lasted around seventy years

---
## 📅 The First Year Of Cyrus The King Of Babylon

Calling Cyrus king of Babylon is a specific historical detail.

Cyrus conquered Babylon in 539 BC and inherited its empire.

His first year over that new territory came soon after his conquest.

This dates the decree precisely within known Persian history.

📅 A precise historical marker of time

⚔️ Cyrus conquered Babylon in 539 BC

👑 His first year came right after

📖 This dates the decree in real history

---
## 📜 Made A Decree To Build This House Of God

This decree is the same one described back in Ezra chapter one.

Cyrus allowed the exiles to return home and rebuild their temple.

The elders were pointing to a real, legal document, not a rumor.

Their whole defense rested on a decision the king's own predecessor had made.

📜 The same decree from Ezra chapter one

🏠 Cyrus allowed the exiles to return home

⚖️ A real legal document, not a rumor

📖 Their defense rested on a king's own decision

---
# Ezra 5:14-17
# 🏺 Sheshbazzar And The King's Records
---
## 🥇 The Vessels Also Of Gold And Silver

These vessels were bowls, basins, and other objects used in temple worship.

Ancient conquerors commonly seized a defeated nation's sacred objects as trophies.

Taking them was not only about wealth, it was also a statement of power.

Returning them later would carry the opposite meaning entirely.

🥇 Bowls and basins used in worship

🏆 Conquerors often seized sacred objects as trophies

💪 Taking them was a statement of power

➡️ Returning them would mean the opposite

---
## 🏯 The Temple Of Babylon

Babylon had its own temple, dedicated to its chief god Marduk.

Placing Israel's holy vessels there was meant to shame Israel's God.

It suggested Marduk had defeated the LORD in the conquerors' minds.

Cyrus removing the vessels from that temple quietly reversed that old insult.

🏯 Babylon's temple honored the god Marduk

😔 Meant to shame Israel's God

⚔️ It suggested Marduk had won

📖 Cyrus quietly reversed that old insult

---
## 👤 Sheshbazzar, Whom He Had Made Governor

Sheshbazzar was appointed governor by Cyrus to lead the first return.

Some readers wonder how he relates to Zerubbabel, since both get credit for the temple's start.

Many scholars believe Sheshbazzar led the earliest stage, and Zerubbabel carried the work forward.

Both roles fit together into one continuous story of return and rebuilding.

👤 Appointed governor by Cyrus

❓ His link to Zerubbabel puzzles some readers

🤝 Likely led the earliest stage of return

📖 One continuous story of return and rebuilding

---
## 🏠 Let The House Of God Be Builded In His Place

In his place means on the same site as the first temple.

Cyrus was not authorizing a new location or a different design.

Rebuilding on the original ground connected the new temple to the old one.

The place itself carried memory and meaning for the returning exiles.

🏠 In his place means the same site

📍 Not a new location or design

🔗 Connected the new temple to the old

➡️ The place itself carried real meaning

---
## 🧱 Laid The Foundation Of The House Of God

This detail helps explain an apparent puzzle across the book of Ezra.

Chapter three credits the foundation to Zerubbabel and the people together.

This verse credits it to Sheshbazzar instead.

Sheshbazzar may have laid the first stones, and Zerubbabel later led a fuller ceremony.

Both descriptions can be true of the same long process.

🧩 An apparent puzzle across the book

🧱 Chapter three credits Zerubbabel and the people

👤 This verse credits Sheshbazzar instead

📖 Both descriptions fit one long process

---
## ⏳ Even Until Now Hath It Been In Building, And Yet It Is Not Finished

This is a remarkably honest line for an official report.

The elders did not hide or excuse the long delay.

Building had dragged on for well over a decade at this point.

Stating the plain truth was safer than letting Tatnai guess at reasons.

⏳ An honest admission of a long delay

🐢 Building had dragged on for over a decade

🗣️ Plain truth was safer than guessing

➡️ Honesty strengthened their case before the king

---
## 🙇 If It Seem Good To The King

This is a formal, deferential phrase used in royal petitions.

It leaves the final decision entirely in the king's hands.

The elders were not demanding anything from Darius.

They were simply asking him to confirm what Cyrus had already decided.

🙇 A formal, deferential phrase for a king

👑 Left the final decision with Darius

🚫 The elders were not demanding anything

📖 They only asked him to confirm Cyrus's decree

---
## 📚 Search Made In The King's Treasure House

The treasure house was not only a place for gold and silver.

Persian kings also stored official documents and archives there.

Searching it was the ancient equivalent of checking a filing cabinet.

The elders trusted that a true record of Cyrus's decree still existed.

📚 Held documents as well as treasure

🗄️ The ancient version of a filing cabinet

🔍 A place to verify the elders' claim

📖 They trusted the true record still existed

---
## 👑 Let The King Send His Pleasure

His pleasure here does not mean simple enjoyment.

It means his will, his decision, or his official verdict.

The phrase was standard court language for a formal ruling.

The elders closed their letter by placing the outcome entirely in Darius's hands.

👑 Pleasure here means his official decision

⚖️ Standard court language for a ruling

🤲 The elders placed the outcome in his hands

📖 The next chapter reveals his answer
`.trim();

export const EZRA_FIVE_PERSONAL_SECTIONS = parseEzraFiveRawNotes(EZRA_FIVE_RAW_NOTES);
