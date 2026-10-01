export type JeremiahFiftyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFiftyTwoRawNotes(rawText: string): JeremiahFiftyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFiftyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+52:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 52 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+52:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+52:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 52 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 52,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 52:${startVerse}` : `Jeremiah 52:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Jeremiah 52 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FIFTY_TWO_RAW_NOTES = `# Jeremiah 52:1-3
# 👑 Zedekiah's Evil Reign
---
## 👤 His Mother's Name Was Hamutal The Daughter Of Jeremiah Of Libnah

This Jeremiah is not the prophet who wrote this book.

It was a common name, and here it simply names Zedekiah's grandfather.

The Bible does not connect this man to the prophet in any way.

One name can belong to two very different people in the same story.

👤 This Jeremiah is not the prophet himself

📛 It was simply a common name

🙅 The Bible draws no connection between them

📖 Shared names do not mean shared identities

---
## 📜 According To All That Jehoiakim Had Done

Jehoiakim was an earlier king and Zedekiah's own brother.

He had already burned one of Jeremiah's scrolls and rebelled against Babylon himself.

Zedekiah is measured against that same failed pattern.

A family history of rebellion repeats itself here one more time.

📜 Jehoiakim was Zedekiah's own brother

🔥 He had burned Jeremiah's scroll before

⚔️ He had already rebelled against Babylon

📖 Zedekiah repeats a pattern already proven to fail

---
## ⚖️ Till He Had Cast Them Out From His Presence

This verse explains the whole chapter before the story even begins.

The coming disaster is not a surprise twist in the plot.

God's judgment had already been decided long before Zedekiah's rebellion.

Everything that follows is simply that decision playing out in real events.

⚖️ Judgment was decided before the story starts

📖 This verse explains the whole chapter in advance

🎬 Nothing that follows is a surprise twist

➡️ Real events just carry out a settled decision

---
## ⛓️ Zedekiah Rebelled Against The King Of Babylon

Nebuchadnezzar had placed Zedekiah on the throne as a loyal vassal king.

A vassal king ruled his own people but answered to a stronger empire.

Zedekiah had sworn an oath of loyalty as part of that arrangement.

Breaking that oath is what rebellion means here, not simply disagreement.

⛓️ Babylon placed Zedekiah on the throne

🤝 A vassal king still answered to Babylon

✍️ Zedekiah had sworn a personal oath

📖 Rebellion here means breaking a sworn promise

---
# Jeremiah 52:4-6
# 🏰 The Siege And The Famine
---
## 🏗️ Built Forts Against It Round About

Ancient armies could not simply knock down a strong city wall.

Forts here were siege works, earth ramps and towers built to surround a city.

Building them meant cutting off every road in and out of Jerusalem.

A siege was less a single battle and more a slow strangling.

🏗️ Forts were siege ramps and towers

🚧 They cut off every road in or out

⏳ A siege worked slowly, not all at once

📖 Jerusalem was strangled long before it fell

---
## 🕰️ The City Was Besieged Unto The Eleventh Year

The siege began in Zedekiah's ninth year and ended in his eleventh.

Counting the months in between shows this lasted about a year and a half.

The exact months and days recorded here read like a real military record.

Prophecy fulfilled in dated, checkable detail is harder to dismiss as legend.

🕰️ The siege ran about eighteen months

📋 Exact dates are recorded, not vague ones

🪖 This reads like a real military record

📖 Dated fulfillment is hard to dismiss as legend

---
## 🍞 The Famine Was Sore In The City

Sore here does not mean mildly uncomfortable.

It describes suffering so severe that bread disappeared from the city entirely.

Jeremiah's own book of Lamentations describes this same famine in painful detail.

A long siege eventually starves a city before any army breaks its gate.

🍞 Sore means severe, not mild discomfort

🚫 Bread disappeared from the city completely

📖 Lamentations records this same famine in detail

➡️ Starvation often comes before the final battle

---
# Jeremiah 52:7-9
# 🏃 The City Broken Up
---
## 🧱 The City Was Broken Up

This describes an actual physical breach, not a figure of speech.

After a long siege, a section of Jerusalem's wall finally gave way.

Once that happened, the city's defense was effectively over.

A broken wall meant there was nothing left standing between the enemy and the people.

🧱 This was a real breach in the wall

⏳ It came after a long siege

🛡️ The city's defense was effectively over

📖 A fallen wall left the people exposed

---
## 🚪 By The Way Of The Gate Between The Two Walls

This is a specific, named escape route near the king's own garden.

The same exact location is recorded again in the book of Second Kings.

That kind of matching detail points to real eyewitnesses, not a retold legend.

Zedekiah's own soldiers tried to use the king's private garden to vanish quietly.

🚪 This names one specific gate and route

📖 Second Kings records this same exact detail

👀 Matching details point to real eyewitnesses

➡️ Even the king's escape route is remembered

---
## 🏜️ Overtook Zedekiah In The Plains Of Jericho

Jericho sits near the Jordan River, well east of Jerusalem.

Zedekiah's men were trying to reach safety far from the capital.

Babylon's army caught him before he ever crossed to safety.

His own soldiers scattered and left him alone the moment they were caught.

🏜️ Jericho sat far east toward the Jordan

🏃 Zedekiah was trying to flee to safety

🎯 Babylon's army caught him before he escaped

📖 His own army scattered and left him alone

---
## 🗺️ Carried Him Up Unto The King Of Babylon To Riblah

Riblah was not the city of Babylon itself.

It was Nebuchadnezzar's military headquarters, far north in the land of Hamath.

Zedekiah faced judgment from the king in person before ever seeing Babylon.

The real sentence against him was handed down on a battlefield, not in a palace.

🗺️ Riblah was a military camp, not Babylon

🪖 It served as Nebuchadnezzar's headquarters

⚖️ Zedekiah faced him there in person

📖 His sentence came on a battlefield, not Babylon

---
# Jeremiah 52:10-11
# 😢 Zedekiah's Punishment
---
## 😢 Slew The Sons Of Zedekiah Before His Eyes

This cruelty was deliberate, not incidental to the execution.

The king of Babylon made sure Zedekiah watched his own sons die first.

What happens to Zedekiah next makes the purpose of this order clear.

The last image burned into his memory was chosen on purpose.

😢 This cruelty was planned, not incidental

👀 Zedekiah was forced to watch it happen

🧠 His memory of it would never fade

📖 The order's purpose becomes clear right after

---
## 👁️ Put Out The Eyes Of Zedekiah

Blinding a defeated king was a known punishment in the ancient Near East.

It stripped away both his sight and his royal dignity at once.

Because of the order just before, his sons' deaths became his final sight.

This was punishment designed to be remembered forever, not simply carried out.

👁️ Blinding defeated kings was a known practice

👑 It stripped away sight and royal dignity

💔 His sons' deaths became his last sight

📖 The punishment was built to never be forgotten

---
## ⛓️ Bound Him In Chains, And Carried Him To Babylon

Jeremiah had already warned Zedekiah years earlier that this exact fate awaited him.

That warning appears back in chapters thirty two and thirty four of this book.

Every detail here matches what the prophet had already spoken.

God's word proved reliable down to the chains and the prison cell.

⛓️ Jeremiah had already warned him of this

📖 That warning appears earlier in this book

🎯 Every detail matches what was spoken

➡️ God's word proved reliable to the smallest detail

---
# Jeremiah 52:12-14
# 🔥 The Temple And City Burned
---
## 🪖 Nebuzaradan, Captain Of The Guard

Nebuzaradan led Nebuchadnezzar's royal guard and carried out his harshest orders.

He appears again later in this same book showing surprising kindness to Jeremiah himself.

The man who burned Jerusalem is not a flat, one note villain in scripture.

Scripture tends to describe real people rather than simple stock characters.

🪖 Nebuzaradan led the royal guard

🔥 He carried out Babylon's harshest orders

🤝 He later shows kindness to Jeremiah

📖 Scripture remembers real people, not flat villains

---
## 🏛️ Burned The House Of The LORD

Solomon's Temple had stood in Jerusalem for about four hundred years.

It was the center of Israel's worship since the days of Solomon's own reign.

In a single act, that entire history went up in flames.

Losing it meant losing far more than a building.

🏛️ The temple had stood about four centuries

🙏 It was the center of Israel's worship

🔥 It was destroyed in a single act

📖 Its loss meant losing far more than stone

---
## 🧱 Brake Down All The Walls Of Jerusalem Round About

Walls were not just decoration, they were a city's entire defense.

Tearing every wall down was a deliberate choice, not simple destruction.

Without walls, Jerusalem could not rebuild itself into a future threat.

Babylon was making absolutely sure this rebellion could never happen again.

🧱 Walls were a city's entire defense

🎯 Removing all of them was deliberate

🚫 No walls meant no future threat

📖 Babylon ruled out any future rebellion

---
# Jeremiah 52:15-16
# 🌾 The Captives And The Poor Left Behind
---
## 🏃 Carried Away Captive Certain Of The Poor Of The People

Not everyone in Jerusalem was deported after the city fell.

Babylon's strategy targeted the people most able to lead another rebellion.

Skilled leaders, officials, and soldiers were the ones taken away first.

Removing leadership was a more effective strategy than removing everyone.

🏃 Not everyone in Jerusalem was deported

🎯 Babylon targeted likely future leaders

👥 Officials and soldiers were taken first

📖 Removing leadership was the real strategy

---
## 🏘️ Residue Of The People That Remained In The City

This phrase names a second group distinct from the deported captives.

Some residents simply survived the siege and stayed in the ruined city.

Not every fate after a conquest looks the same.

Scripture bothers to separate these groups instead of lumping everyone together.

🏘️ This names a second, separate group

🏚️ Some residents stayed in the ruined city

🧩 Not every fate after conquest matched

📖 Scripture carefully separates these two groups

---
## 🚶 Those That Fell Away, That Fell To The King Of Babylon

This phrase likely names Judeans who defected to Babylon during the siege.

Switching sides during a losing war was a real and recorded choice.

Even people who had defected were not automatically trusted or safe afterward.

Choosing the winning side did not guarantee a better outcome.

🚶 These were Judeans who defected mid siege

⚔️ Switching sides was a real wartime choice

❓ Even defectors were not automatically safe

📖 Choosing the winner did not guarantee safety

---
## 🍇 Left Certain Of The Poor Of The Land For Vinedressers And For Husbandmen

Vinedressers tended grapevines, and husbandmen worked the general farmland.

Babylon needed someone left behind to keep the land producing food.

The very poorest were judged useful for labor but not for leadership.

Even in judgment, the land itself was not left to go entirely to waste.

🍇 Vinedressers tended grapevines for a living

🌾 Husbandmen worked the general farmland

👥 The poor were kept for labor, not leadership

📖 Even ruined land was not left to waste

---
# Jeremiah 52:17-19
# 🏺 The Temple Vessels Taken
---
## 🌊 The Brasen Sea That Was In The House Of The LORD

The brasen sea was a massive bronze basin built for the temple's priestly washing.

First Kings describes it holding water for the priests to cleanse themselves before service.

A single bronze object once that large had to be broken apart to move.

A fixture built for daily worship became scrap metal in a single afternoon.

🌊 The brasen sea was a huge bronze basin

🙏 Priests washed there before temple service

🔨 It had to be broken apart to move

📖 Worship furniture became ordinary scrap metal

---
## 🔨 The Chaldeans Brake, And Carried All The Brass Of Them To Babylon

Chaldeans is another name for the Babylonians themselves.

These objects were not kept intact as trophies of victory.

They were deliberately broken down into raw, reusable metal instead.

The goal was melted value, not preserved memory of what they once were.

🔨 Chaldeans means the Babylonians themselves

🏆 These were not kept as intact trophies

♻️ They were broken down for raw metal

📖 Value mattered more to them than memory

---
## 🕯️ The Caldrons Also, And The Shovels, And The Snuffers

These were ordinary tools priests used every day inside the temple.

Caldrons were large pots, shovels cleared ashes, and snuffers trimmed lamp wicks.

None of these objects were rare or especially valuable on their own.

Even the smallest, most everyday tools of worship were stripped away completely.

🕯️ These were everyday temple tools

🍲 Caldrons were simply large cooking pots

🧹 Shovels and snuffers handled ashes and wicks

📖 Even the smallest tools were taken

---
## 🥇 That Which Was Of Gold In Gold, And That Which Was Of Silver In Silver

The candlesticks mentioned here recall the golden lampstand first made back in Exodus.

That lampstand had been a unique symbol of God's covenant light in Israel.

Babylon's soldiers still carefully sorted every piece by its exact material.

Even a conquering army kept organized records of exactly what it took.

🥇 Candlesticks recall the lampstand from Exodus

💡 It once symbolized God's covenant light

📋 Soldiers sorted each piece by material

📖 Even conquest here was carefully recorded

---
# Jeremiah 52:20-23
# 🏛️ The Pillars And Their Dimensions
---
## 👑 Which King Solomon Had Made In The House Of The LORD

These pillars had stood in the temple since Solomon first built it.

That reign came about four hundred years before this chapter's events.

An object that old carried centuries of history inside a single structure.

Centuries of history were erased here in a single military campaign.

👑 Solomon built these pillars originally

🕰️ That was about four centuries earlier

📜 The pillars carried centuries of history

📖 One campaign erased centuries in a moment

---
## 🐂 Twelve Brasen Bulls That Were Under The Bases

First Kings describes these same twelve bronze bulls supporting the great basin.

Bulls pictured strength and stability holding something precious steady above them.

Even sturdy, symbolic bronze supports were broken apart along with everything else.

No piece of temple art was considered too significant to destroy.

🐂 First Kings records these same twelve bulls

💪 Bulls symbolized strength and stability

🔨 Even symbolic art was broken apart

📖 Nothing was judged too significant to destroy

---
## 📏 The Height Of One Pillar Was Eighteen Cubits

A cubit measured about the length of a man's forearm, close to eighteen inches.

Eighteen cubits works out to around twenty seven feet of solid bronze.

A detail like this is easy to skim past without picturing it.

Picturing the true scale makes the pillar's destruction feel far more real.

📏 A cubit was about eighteen inches long

📐 Eighteen cubits equals about twenty seven feet

🏗️ That is a massive column of bronze

📖 Picturing the scale makes the loss feel real

---
## 🌰 Ninety And Six Pomegranates On A Side

Pomegranates decorated the pillars in rows, matching the description back in First Kings.

Counting ninety six on one side alone shows remarkably careful craftsmanship.

Recording this exact number sounds almost bureaucratic, like a conqueror's inventory list.

That same careful counting also proves this account was not invented later.

🌰 Pomegranates decorated the pillars in rows

🎨 Ninety six on one side alone

📋 This reads like a conqueror's inventory

📖 Careful counting supports a real, recorded event

---
# Jeremiah 52:24-27
# ⚔️ The Officials Executed At Riblah
---
## 🙏 Seraiah The Chief Priest, And Zephaniah The Second Priest

Seraiah held the highest priestly office in Judah at this moment.

His own descendants reappear later leading the return from exile in the book of Ezra.

Executing him effectively ended this line's priestly service in Jerusalem for a generation.

A single execution here reaches forward into a story still decades away.

🙏 Seraiah held Judah's highest priestly office

👨‍👩‍👧 His descendants reappear later in Ezra

🚫 His death paused this family's temple service

📖 One event here reaches decades forward

---
## ✍️ The Principal Scribe Of The Host, Who Mustered The People Of The Land

This scribe's role was military administration, not religious record keeping.

Mustering the people of the land meant organizing the draft for war.

His execution shows Babylon targeted military organizers just as much as priests.

Judgment here fell on administrators as much as on soldiers themselves.

✍️ This scribe handled military administration

📋 Mustering meant organizing the draft for war

⚔️ Babylon targeted organizers, not only priests

📖 Judgment reached administrators as much as soldiers

---
## 🕊️ Thus Judah Was Carried Away Captive Out Of His Own Land

This single sentence closes the story of Judah as an independent nation.

Centuries of kings, a temple, and a homeland end in one plain line.

The verses right before this one are full of names and small details.

A quiet closing sentence can carry more weight than a dramatic one.

🕊️ This sentence closes Judah's story as a nation

👑 Centuries of kings and history end here

📜 It follows a list of small, named details

📖 A quiet line can carry the heaviest weight

---
# Jeremiah 52:28-30
# 📊 The Numbers Of The Captives
---
## 📊 This Is The People Whom Nebuchadrezzar Carried Away Captive

What follows is a precise, three part headcount across different years.

Three separate deportations happened in the seventh, eighteenth, and twenty third years.

This reads like an administrative ledger, not a storyteller's rounded estimate.

A detail this exact is a mark of real history, not legend.

📊 This introduces a precise three part headcount

🗓️ Three separate deportations are listed by year

📋 It reads like an administrative ledger

📖 Precise numbers mark real history, not legend

---
## 🗓️ In The Eighteenth Year Of Nebuchadrezzar

Chapter twelve of this same book dated the temple's burning to his nineteenth year.

This verse dates the related deportation to his eighteenth year instead.

Babylon and Judah sometimes counted a king's reign by slightly different calendars.

A one year gap between these dates reflects counting method, not contradiction.

🗓️ Verse twelve names the nineteenth year

📆 This verse names the eighteenth year instead

🧮 The two nations counted reigns differently

📖 A dating gap is not a contradiction

---
## 🔢 All The Persons Were Four Thousand And Six Hundred

This final total feels smaller than popular imagination often pictures.

The number likely counts only certain heads of households, not every single resident.

Smaller than expected does not mean less historically real or reliable.

A careful number beats a dramatic but invented one every time.

🔢 This total seems smaller than expected

🏠 It likely counts heads of households

✅ Smaller does not mean less reliable

📖 A careful count beats a dramatic guess

---
# Jeremiah 52:31-34
# 🍽️ Jehoiachin Lifted Up
---
## 📅 In The Seven And Thirtieth Year Of The Captivity Of Jehoiachin

Jehoiachin was an earlier king, exiled to Babylon decades before Zedekiah ever reigned.

He had spent thirty seven years as a prisoner in a foreign land.

This closing scene suddenly jumps forward decades past everything just described.

An old, nearly forgotten captive reappears at the very end of the book.

📅 Jehoiachin was exiled decades before Zedekiah reigned

⛓️ He spent thirty seven years imprisoned

⏩ This scene jumps forward past everything described

📖 A forgotten captive reappears at the very end

---
## 🙌 Lifted Up The Head Of Jehoiachin King Of Judah

Lifted up the head is an old idiom for releasing from prison.

It does not describe a physical motion done to his actual head.

Evilmerodach set Jehoiachin's seat above the other captive kings in Babylon.

A prisoner once forgotten was suddenly given real honor by a new king.

🙌 This idiom means being released from prison

🙅 It is not a literal physical motion

🪑 His seat was placed above other kings

📖 A forgotten prisoner received real honor

---
## 🍞 Did Continually Eat Bread Before Him All The Days Of His Life

The chapter closes on an unexpected note of mercy rather than ruin.

Jehoiachin spent the rest of his life eating at the king's own table.

David's royal line had seemed completely finished earlier in this same chapter.

One surviving thread of hope stays open even after everything else falls.

🍞 He ate at the king's table for life

🕊️ The chapter ends on mercy, not ruin

👑 David's line had seemed completely finished

📖 One thread of hope survives the fall
`.trim();

export const JEREMIAH_FIFTY_TWO_PERSONAL_SECTIONS = parseJeremiahFiftyTwoRawNotes(JEREMIAH_FIFTY_TWO_RAW_NOTES);
