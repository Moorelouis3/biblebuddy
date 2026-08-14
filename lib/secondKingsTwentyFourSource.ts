export type SecondKingsTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyFourRawNotes(rawText: string): SecondKingsTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwentyFour\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwentyFour\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwentyFour\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 24:${startVerse}` : `2 Kings 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Kings 24 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_FOUR_RAW_NOTES = `# SecondKingsTwentyFour 24:1-2
# 👑 Jehoiakim Rebels Against Babylon
---
## 👑 Nebuchadnezzar King Of Babylon Came Up

Nebuchadnezzar ruled Babylon during the years it grew into the region's strongest power.

He had already crushed Egypt's army at the battle of Carchemish a few years earlier.

That victory left Judah with no strong ally left to lean on.

Babylon's rise here shapes the rest of Judah's story.

👑 Nebuchadnezzar ruled the region's strongest power

⚔️ He had already crushed Egypt at Carchemish

🤝 Judah had no strong ally left

📖 Babylon's rise shapes Judah's final story

## 🤝 Jehoiakim Became His Servant Three Years

Becoming a servant here means Jehoiakim submitted as a vassal king.

A vassal still ruled his own land.

He still paid heavy yearly tribute to Babylon.

Refusing tribute or breaking submission was treated as an act of war.

Three years of submission bought Judah only a fragile peace.

🤝 Servant means a vassal king under tribute

💰 Vassals paid heavy tribute to survive

⚔️ Rebellion was treated as an act of war

📖 Three years bought only fragile peace

## 🔄 Then He Turned And Rebelled Against Him

Jehoiakim stopped paying tribute and broke his sworn submission.

The prophet Jeremiah had already warned against trusting Egypt over Babylon.

Jehoiakim gambled that Egypt could still protect Judah.

That gamble sets this whole chapter's disaster in motion.

🔄 Jehoiakim stopped paying tribute to Babylon

🗣️ Jeremiah had already warned against this

🇪🇬 He gambled on Egypt's protection instead

📖 That gamble starts this chapter's disaster

## 🗺️ Bands Of The Chaldees, And Bands Of The Syrians, And Bands Of The Moabites, And Bands Of The Children Of Ammon

Chaldees was simply another name for the Babylonians themselves.

Syria, Moab, and Ammon were smaller kingdoms bordering Judah on every side.

A band meant a raiding party, not Babylon's full royal army.

Nations that once paid tribute to Solomon now helped destroy his descendants.

⚔️ Chaldees means the Babylonians themselves

🗺️ Syria, Moab, and Ammon bordered Judah

🏹 A band means a smaller raiding party

📖 Old tributary nations helped destroy Judah

## 📜 According To The Word Of The LORD, Which He Spake By His Servants The Prophets

This ties the invasion directly back to earlier prophetic warnings.

Isaiah and Jeremiah had both predicted judgment for persistent idolatry.

The raiding bands were not random chance or simple bad luck.

Scripture frames this destruction as a fulfilled word, not a surprise.

📜 Prophets had long predicted this judgment

🗣️ Isaiah and Jeremiah both gave warnings

🎯 The invasion was not random chance

📖 A fulfilled word, not a surprise

# SecondKingsTwentyFour 24:3-4
# ⚖️ Judgment For Manasseh's Sins
---
## ⚖️ Surely At The Commandment Of The LORD Came This Upon Judah

This invasion was not simply Babylonian politics or bad timing.

Scripture states plainly that God himself commanded this judgment.

Jehoiakim's rebellion was only the trigger.

God's decree was the true cause behind it.

⚖️ Not simply politics or bad timing

📜 Scripture says God commanded this judgment

🔄 Rebellion was the trigger, not the cause

📖 God's decree stands behind the politics

## 👁️ To Remove Them Out Of His Sight

This phrase describes exile, being sent away from the promised land.

God's sight represents his presence and blessing resting on his people.

Losing that presence was the deepest loss of the exile, deeper than losing land.

Removal from his sight meant removal from everything the covenant promised.

👁️ His sight means God's presence and blessing

🚶 Removal meant exile from the land

💔 This was the deepest loss of exile

📖 Removal meant losing the covenant itself

## 👴 For The Sins Of Manasseh, According To All That He Did

Manasseh was Josiah's grandfather and one of Judah's most evil kings.

He filled Jerusalem with idols and even sacrificed his own son.

Chapter twenty one of this same book records his whole reign.

Decades later, his sin still explains why this judgment finally lands.

👴 Manasseh was Josiah's evil grandfather

🛐 He filled Jerusalem with idols

⏳ His old sin still waited to land

📖 Chapter twenty one records his whole reign

## 🩸 The Innocent Blood That He Shed

Manasseh murdered prophets and likely his own son in the fire.

Filling Jerusalem with innocent blood means this violence was widespread, not rare.

Second Kings twenty one already described how far this went.

This specific sin gets named again here, generations after Manasseh died.

🩸 Manasseh murdered prophets and his own son

🏙️ Innocent blood filled the whole city

⏳ The sin is named again generations later

📖 Second Kings twenty one already told this

## 🚫 Which The LORD Would Not Pardon

Second Chronicles records that Manasseh personally repented before he died.

His own soul found forgiveness.

The nation still faced the consequences of what he had done.

Personal forgiveness did not erase national damage already set in motion.

🚫 Not pardoned means the debt still stood

🙏 Manasseh himself later found personal forgiveness

🏙️ The nation still faced the consequences

📖 Personal mercy did not erase national judgment

# SecondKingsTwentyFour 24:5-7
# 🏺 Jehoiakim's End, Egypt's Retreat
---
## 📚 The Book Of The Chronicles Of The Kings Of Judah

This was an official royal record, separate from the Bible books we read today.

Many events from each king's reign were kept there.

Not all of them became part of scripture.

Referencing it reminds the reader that scripture chooses what actually matters most.

📚 An official record outside our Bible

📝 Not every event made it into scripture

🎯 Scripture chooses what actually matters most

📖 Jehoiakim's fuller story stayed unrecorded here

## 😴 Jehoiakim Slept With His Fathers

Sleeping with his fathers is the Bible's gentle phrase for death.

The prophet Jeremiah had predicted a much harsher end for this king.

Jeremiah said Jehoiakim would be buried like a donkey, dragged outside the gates.

This verse stays quiet on how his burial actually happened.

😴 Sleeping with his fathers means he died

🗣️ Jeremiah predicted a harsher end

🐴 Burial like a donkey, dragged outside

📖 This verse stays quiet on the details

## 👑 Jehoiachin His Son Reigned In His Stead

Jehoiachin is also called Jeconiah and Coniah in other parts of scripture.

He inherits a kingdom already trapped between Egypt and Babylon.

His reign is about to become the shortest one recorded so far.

The throne changes hands right as the greater crisis is closing in.

👑 Also called Jeconiah and Coniah elsewhere

🗺️ He inherits a kingdom trapped between empires

⏳ His reign becomes the shortest one yet

📖 The crisis is closing in as he begins

## 🇪🇬 The King Of Egypt Came Not Again Any More Out Of His Land

This king of Egypt was Pharaohnecho, defeated by Babylon at Carchemish.

That battle broke Egypt's power in the region for good.

Egypt never again marched out to challenge Babylon in this area.

Jehoiakim's earlier gamble on Egyptian help had already failed before this chapter began.

🇪🇬 Pharaohnecho lost badly at Carchemish

🗺️ Egypt's regional power was broken for good

🚫 Egypt never challenged Babylon here again

📖 Jehoiakim's gamble on Egypt had already failed

## 🗺️ From The River Of Egypt Unto The River Euphrates

This phrase names the entire stretch of land Egypt used to control.

The river of Egypt likely refers to a stream near its northeast border.

The Euphrates lay far north, deep in Babylon's own territory.

Naming both ends shows just how completely Babylon now dominated the region.

🗺️ Names the whole territory Egypt once held

🌊 The river of Egypt marked its border

🏞️ The Euphrates lay deep in the north

📖 Babylon now dominated the whole region

# SecondKingsTwentyFour 24:8-9
# 👑 A King For Three Months
---
## 🔢 Eighteen Years Old When He Began To Reign

Jehoiachin was still a young man when the crown fell to him.

He takes the throne in the middle of Babylon's growing pressure on Judah.

His youth leaves him little room to change the course already set in motion.

A young king inherits a crisis he did not create.

🔢 Eighteen years old, still a young man

⚔️ He inherits Babylon's growing pressure

😟 His youth leaves little room to change course

📖 He inherits a crisis not his own

## 📆 Reigned In Jerusalem Three Months

Three months makes this one of the shortest reigns in Judah's history.

Jehoahaz, two kings earlier, also reigned for exactly three months.

Two kings in a row rule for the exact same short span.

Babylon and Egypt were now the ones deciding how long a king of Judah could last.

📆 One of the shortest reigns in Judah

🔁 Jehoahaz also reigned exactly three months

👑 Two kings in a row share this length

📖 Foreign powers now decided a king's lifespan

## 👤 Nehushta, The Daughter Of Elnathan Of Jerusalem

Nehushta was Jehoiachin's mother and queen mother during his short reign.

Elnathan may be the same official named later in the book of Jeremiah.

That Elnathan once tried to stop one of Jeremiah's scrolls from being destroyed.

Naming her father ties this brief reign to the wider prophetic story around it.

👤 Nehushta was Jehoiachin's mother and queen mother

📜 Elnathan may appear later in Jeremiah

🔥 That official once defended one of Jeremiah's scrolls

📖 A brief reign ties into a wider story

## 😔 According To All That His Father Had Done

Jehoiachin copies his father Jehoiakim's evil pattern despite his short time on the throne.

Three months was not long enough to reverse decades of national idolatry.

Judgment in this chapter falls on more than one generation of kings.

A short reign still carries the weight of a long pattern of sin.

😔 He copies his father's evil pattern

⏳ Three months was too short to reverse decades

👑 Judgment falls on more than one king

📖 A short reign still carries an old pattern

# SecondKingsTwentyFour 24:10-12
# 🏙️ Jerusalem Besieged And Surrendered
---
## 🏙️ The City Was Besieged

A siege means an army surrounds a city and cuts off its supplies.

No food or reinforcements could reach the people trapped inside the walls.

A siege starves a city into surrender instead of quick destruction.

Jerusalem now faces the exact pressure Babylon had used against other cities before it.

🏙️ A siege means an army surrounds a city

🚫 No food or help could reach the people

⏳ Starvation, not battle, breaks the city first

📖 Jerusalem faces the same pressure as other cities

## ⚔️ Nebuchadnezzar King Of Babylon Came Against The City, And His Servants Did Besiege It

This time Nebuchadnezzar arrives in person instead of sending only his officers.

His personal presence signals how seriously Babylon is treating this rebellion.

Verse two only mentioned Babylon's raiding bands operating from a distance.

Now the empire's own king stands directly outside Jerusalem's walls.

⚔️ Nebuchadnezzar comes in person this time

🎯 His presence shows how serious this is

🗺️ Earlier verses only mentioned distant raiding bands

📖 The empire's own king stands at the gates

## 🚶 Jehoiachin The King Of Judah Went Out To The King Of Babylon

Going out to surrender meant leaving the protected walls voluntarily.

Jehoiachin chose surrender over the destruction a longer siege would eventually bring.

This decision likely spared Jerusalem from being burned at this exact moment.

A king's humility here delays the coming disaster.

It does not cancel it.

🚶 Surrender meant leaving the walls voluntarily

🔥 It likely spared Jerusalem from burning now

⏳ Humility here only delays the disaster

📖 It does not cancel what is still coming

## 👨‍👩‍👧 He, And His Mother, And His Servants, And His Princes, And His Officers

The entire royal household surrenders together rather than scattering apart.

His mother Nehushta held real influence and goes into captivity alongside him.

Taking the whole court at once strips Judah of its leadership in a single day.

Nothing is left behind that could quietly rebuild a resistance later.

👨‍👩‍👧 The whole royal household surrenders together

👑 His mother goes into captivity too

🏛️ Judah loses its leadership in one day

📖 Nothing is left to rebuild resistance later

## 🔢 In The Eighth Year Of His Reign

This dates the surrender to Nebuchadnezzar's own reign, not Jehoiachin's.

Historians place this around the year five hundred ninety seven before Christ.

Counting by a foreign king's reign shows exactly who controlled the region now.

Judah's own calendar no longer set the pace of its own history.

🔢 Dated by Nebuchadnezzar's reign, not Jehoiachin's

📅 Historians date this near five ninety seven BC

👑 A foreign king's calendar now set the pace

📖 Judah no longer controlled its own history

# SecondKingsTwentyFour 24:13-14
# 💰 The Temple Plundered
---
## 💰 All The Treasures Of The House Of The LORD

The temple treasury held gold, silver, and gifts collected over centuries.

Kings before Jehoiachin had already stripped some of it away in earlier crises.

This time Babylon empties whatever still remained inside the temple.

The house built for worship now becomes a source of war payments.

💰 The temple held centuries of gold and gifts

👑 Earlier kings had already stripped some away

🏛️ Babylon empties whatever still remained

📖 A house of worship becomes war payment

## 🔨 Cut In Pieces All The Vessels Of Gold Which Solomon King Of Israel Had Made, As The LORD Had Said

Solomon had crafted these golden vessels centuries earlier for temple worship.

Cutting them in pieces made them easier to melt down and transport.

These objects connect this moment all the way back to Solomon's original temple.

This exact loss had already been promised to Hezekiah generations before.

A promise made long ago now comes true in exact detail.

🔨 Solomon's own gold objects get cut apart

📦 Cutting them made them easier to transport

👑 These vessels dated back to Solomon's temple

📖 A promise made to Hezekiah comes true here

## 🔢 Even Ten Thousand Captives

Ten thousand people is a massive number for a small ancient kingdom.

This single deportation likely removed a large share of Jerusalem's population.

Losing this many people all at once crippled the city for years.

A whole generation of Jerusalem's leaders and workers vanishes in one event.

🔢 Ten thousand is massive for a small kingdom

🏙️ A large share of Jerusalem's people leave

😞 The city is crippled for years after

📖 A whole generation vanishes in one event

## 🛠️ All The Craftsmen And Smiths

Craftsmen and smiths were the skilled workers of ancient Judah.

They built the tools and weapons the kingdom depended on.

Removing them stripped Judah of its ability to rebuild or arm itself.

Babylon targets skill on purpose, not just wealth or random people.

🛠️ Craftsmen and smiths were highly skilled workers

🚫 Removing them crippled Judah's ability to rebuild

🎯 Babylon targeted skill, not just random people

📖 A nation without workers cannot recover alone

## 😞 None Remained, Save The Poorest

Only the poorest residents were left behind in Jerusalem after this.

Babylon judged the poor too unskilled and too powerless to threaten its control.

A once great city is left with almost none of its former strength.

This remnant becomes the seed of everything that happens in the chapters ahead.

😞 Only the poorest residents remained

🚫 Babylon saw them as no real threat

🏙️ A great city loses almost all its strength

📖 This remnant seeds the story still ahead

# SecondKingsTwentyFour 24:15-16
# 🚶 Judah's Elite Taken Captive
---
## 🚶 He Carried Away Jehoiachin To Babylon, And The King's Mother, And The King's Wives

The entire royal family travels together into a foreign land.

Ancient kings often kept multiple wives, and all of them go into exile here.

Jehoiachin will spend decades in Babylon, later even eating at its king's table.

Second Kings closes its whole story by returning to this exact detail.

🚶 The whole royal family goes into exile

👑 Ancient kings kept multiple wives, all exiled

⏳ Jehoiachin spends decades as a captive there

📖 Second Kings closes by returning to this

## 👑 The Mighty Of The Land

This phrase names Judah's landed nobility, its wealthiest and most powerful families.

These were the people with the resources to fund any future rebellion.

Removing them left no organized leadership capable of resisting Babylon later.

Babylon strips away power at every level, not just the royal house.

👑 Names Judah's wealthiest, most powerful families

💰 They had resources to fund rebellion

🚫 Their removal left no organized resistance

📖 Babylon strips power at every level

## 🔢 All The Men Of Might, Even Seven Thousand

This second number likely counts able bodied men beyond the ten thousand already named.

Scholars read these two totals as covering different, overlapping groups of exiles.

Either way, the numbers describe a deportation on a massive scale.

Judah's fighting population is gutted in this single campaign.

🔢 A second count of able bodied men

📊 Scholars read the totals as overlapping groups

📉 Either way, the scale is massive

📖 Judah's fighting population is gutted here

## ⚔️ Craftsmen And Smiths A Thousand, All That Were Strong And Apt For War

Apt for war means physically capable of fighting in Judah's own defense.

Babylon removes exactly the people who could have armed or led resistance later.

This is the second time craftsmen and smiths are named in this chapter.

Every category of person Judah needed to recover is taken in this one deportation.

⚔️ Apt for war means fit to fight

🎯 Babylon removes future resistance on purpose

🔁 Craftsmen and smiths are named a second time

📖 Every category needed for recovery is taken

# SecondKingsTwentyFour 24:17-18
# 👑 Zedekiah Installed
---
## 👨‍👦 Made Mattaniah His Father's Brother King In His Stead

Mattaniah was Josiah's third son, making him Jehoiachin's uncle, not his father.

Babylon skips Jehoiachin's own line entirely and picks a different branch of the family.

This keeps the throne technically inside Judah's royal family, but fully under Babylonian control.

The king who follows owes his crown entirely to a foreign power.

👨‍👦 Mattaniah was Jehoiachin's uncle, not his father

🌳 Babylon skips Jehoiachin's own family line

👑 The throne stays technically inside the family

📖 This king owes his crown to Babylon

## ✍️ Changed His Name To Zedekiah

Renaming a king was a common way for a stronger power to show control.

Mattaniah means gift of the LORD.

Zedekiah means the LORD is righteous.

Babylon had done this exact thing to Eliakim back in the chapter before this one.

✍️ Renaming showed a stronger power's control

📜 Mattaniah means gift of the LORD

⚖️ Zedekiah means the LORD is righteous

➡️ The name becomes painfully ironic later

## 🔢 Twenty And One Years Old, And He Reigned Eleven Years In Jerusalem

Zedekiah becomes Judah's last king before Jerusalem finally falls.

Eleven years is the longest reign among these final chaotic kings.

A longer reign gives him more time.

It does not give him more faithfulness to God.

🔢 Judah's last king before Jerusalem falls

📆 Eleven years, the longest of these final kings

⏳ More time did not mean more faithfulness

📖 The kingdom's story ends in the next chapter

## 👤 Hamutal, The Daughter Of Jeremiah Of Libnah

Hamutal was also the mother of Jehoahaz, named back in chapter twenty three.

That makes Zedekiah and Jehoahaz full brothers, not just half brothers.

Two of Hamutal's sons end up ruling Judah, and both end up captives.

This family detail quietly ties two of Judah's final kings together.

👤 Also the mother of Jehoahaz earlier

👬 Zedekiah and Jehoahaz were full brothers

⛓️ Both of her sons became captives

📖 One family ties two final kings together

# SecondKingsTwentyFour 24:19-20
# 🔥 Zedekiah Rebels
---
## 😔 He Did That Which Was Evil In The Sight Of The LORD, According To All That Jehoiakim Had Done

Zedekiah was not Jehoiakim's son, yet he still copies his pattern exactly.

Babylon had personally chosen Zedekiah, expecting loyalty in return for the crown.

Instead he follows the same idolatry that doomed the king before him.

A handpicked replacement still chooses the very sin Babylon hoped to prevent.

😔 Zedekiah copies Jehoiakim despite not being his son

👑 Babylon expected loyalty for the crown given

🛐 He follows the same idolatry instead

📖 A handpicked king still chooses the same sin

## 🔥 Through The Anger Of The LORD

This phrase again places God's judgment behind the political events unfolding.

The same framing opened this chapter back in verse three.

Zedekiah's rebellion looks political on the surface.

Scripture names a deeper cause first.

🔥 God's judgment sits behind these events again

🔁 The same framing opened this chapter

🎯 Scripture names a deeper cause first

📖 Human choice and divine judgment move together

## 🚪 Until He Had Cast Them Out From His Presence

This line looks ahead to the final exile still coming in the next chapter.

Every event so far in this chapter has only been a partial judgment.

Casting out means complete removal from the land and from God's presence both.

The worst of Judah's story has not happened yet.

🚪 Looks ahead to the final exile coming

⏳ Everything so far has been partial judgment

🌍 Casting out means removal from land and presence

📖 The worst of the story is still ahead

## ⚔️ Zedekiah Rebelled Against The King Of Babylon

Zedekiah breaks the very oath that had placed him on the throne.

The prophet Ezekiel later condemns this broken oath directly as a sin against God.

Rebelling against Babylon now guarantees the final siege of Jerusalem.

This decision sets up the destruction described in the very next chapter.

⚔️ He breaks the oath that made him king

📜 Ezekiel later condemns this broken oath

🏙️ Rebellion guarantees the final siege of Jerusalem

📖 This sets up the next chapter's destruction`.trim();

export const SECOND_KINGS_TWENTY_FOUR_PERSONAL_SECTIONS = parseSecondKingsTwentyFourRawNotes(SECOND_KINGS_TWENTY_FOUR_RAW_NOTES);
