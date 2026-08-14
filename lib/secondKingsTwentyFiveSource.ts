export type SecondKingsTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyFiveRawNotes(rawText: string): SecondKingsTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwentyFive\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwentyFive\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwentyFive\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 25:${startVerse}` : `2 Kings 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Kings 25 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_FIVE_RAW_NOTES = `# SecondKingsTwentyFive 25:1-3
# ⛺ The Final Siege Begins
---
## 👑 In The Ninth Year Of His Reign

The word his refers to Zedekiah, the last king of Judah.

Ancient kings dated events by the number of years they had reigned.

This chapter opens in Zedekiah's ninth year on the throne.

Judah's kings had rebelled against Babylon again and again by this point.

This date marks the start of the end for Jerusalem.

👑 His refers to King Zedekiah

📆 Years were counted by a king's reign

🏙️ Zedekiah's ninth year begins this chapter

📖 The end of Jerusalem starts here

## 📅 In The Tenth Month, In The Tenth Day Of The Month

Jewish months followed a lunar calendar, counted from the spring new year.

The tenth month lines up close to modern December.

Marking the exact day shows how precisely this national tragedy was remembered.

Later Jewish tradition turned this very date into a yearly fast, still kept today.

📅 Jewish months followed the lunar calendar

❄️ The tenth month falls near December

📿 This day was later fasted every year

📖 A tragedy remembered down to the day

## ⛺ Pitched Against It

"Pitched" means the Babylonian army set up camp right outside the city.

This was not a quick raid or a single battle.

Nebuchadnezzar intended to stay until Jerusalem could not hold out any longer.

A siege wins by patience, not by a single charge.

⛺ Pitched means the army camped there

🕰️ This was not a quick raid

🏙️ Babylon planned to outlast the city

📖 Patience was the weapon here

## 🧱 Built Forts Against It Round About

These "forts" were siege mounds, ramps of earth and timber built against the wall.

Soldiers used them to reach the top of the wall with rams and archers.

Building them all the way around the city cut off every escape route.

Jerusalem was now completely sealed in.

🧱 Forts were earth ramps built for attack

🏹 Soldiers used them to reach the wall

🚫 Every escape route was cut off

📖 The city was fully sealed in

## ⏳ Besieged Unto The Eleventh Year

The siege lasted from Zedekiah's ninth year to his eleventh.

That is close to a year and a half of no way in or out.

Food, water, and hope all ran out slowly over that stretch of time.

Scripture wants the reader to feel how long this suffering dragged on.

⏳ The siege lasted about eighteen months

🚪 No one could safely leave or enter

😔 Hope wore down slowly over time

📖 Scripture marks how long this dragged on

## 🍞 The Famine Prevailed In The City

"Prevailed" means the famine grew stronger than anything the people could do about it.

A long siege was designed to starve a city into surrender.

Stored grain and animals inside the walls eventually ran out completely.

Nebuchadnezzar did not need to break down the gates himself.

Hunger did that work for him.

🍞 Prevailed means the famine won out

⛺ Sieges were built to starve a city

📉 Stored food eventually ran out completely

📖 Hunger opened the gates before soldiers did

## 🚫 No Bread For The People Of The Land

This does not mean only actual loaves of bread had run out.

"Bread" stood for food in general in this culture.

The text is saying the whole city had nothing left to eat.

Later in this chapter this desperation drives the king himself to flee at night.

🍞 Bread here means food in general

📉 The whole city had nothing left

😢 Real starvation, not just one shortage

➡️ This desperation pushes the king to flee

# SecondKingsTwentyFive 25:4-7
# 🏃 Zedekiah Is Captured And Blinded
---
## 💥 The City Was Broken Up

"Broken up" means the wall was finally breached after eighteen months of siege.

Once the wall gave way, there was nothing left holding the invaders back.

That same night, the king and his soldiers tried to escape in the chaos.

A city wall failing was the last line of defense in the ancient world.

💥 Broken up means the wall gave way

🌙 The escape happened that same night

🛡️ The wall was the last real defense

📖 One breach ended eighteen months of holding on

## 🚪 Fled By Night By The Way Of The Gate Between Two Walls

This gate sat in a hidden passage on the south side of the city.

Fleeing at night let the king slip past the Babylonian watch in the dark.

The king's garden nearby gave cover close to the palace grounds.

Even a desperate escape needed the smallest advantage it could find.

🌙 Night gave cover for the escape

🚪 The gate sat in a hidden passage

🌳 The king's garden lay close by

📖 Desperation still looked for any edge

## 🏞️ The King Went The Way Toward The Plain

"The plain" refers to the Jordan Valley, the flat land east of Jerusalem.

Zedekiah was heading away from the hill country toward that open lowland.

He was likely trying to reach the region east of the Jordan River.

Open, flat ground offered speed but also nowhere to hide.

🏞️ The plain means the Jordan Valley

🧭 Zedekiah fled toward open lowland

🏃 He was likely aiming to cross the Jordan

📖 Speed came with no place to hide

## 🐎 Overtook Him In The Plains Of Jericho

Jericho sits about seventeen miles from Jerusalem, near the Jordan River.

Babylon's soldiers on horses easily outran a king fleeing on foot or by cart.

Zedekiah nearly made it out of Judah's territory before he was caught.

He was captured just short of the border he was running toward.

🏞️ Jericho lay near the Jordan River

🐎 Mounted soldiers easily outran the king

🧭 He was almost out of Judah's land

📖 Capture came just short of the border

## 💨 All His Army Were Scattered From Him

"Scattered" means his remaining soldiers ran off in every direction to save themselves.

Zedekiah was left completely alone once the chase caught up to him.

No bodyguard, no army, no one left to fight for him anymore.

The king who once commanded Judah's forces now stood utterly exposed.

💨 Scattered means his men ran off

😔 Zedekiah stood completely alone

🛡️ No one remained to defend him

📖 Power can vanish in a single night

## ⚔️ Slew The Sons Of Zedekiah Before His Eyes

Zedekiah's own sons were executed right in front of him.

This was meant as the very last thing his eyes would ever see.

Killing the sons also erased any heir who might later reclaim the throne.

Babylon wanted Judah's royal line to end completely.

⚔️ His sons were killed in front of him

👁️ This was the last sight he was given

👑 Killing the heirs ended the royal line

📖 Babylon meant this to be final

## 👁️ Put Out The Eyes Of Zedekiah

Blinding a defeated king was a common punishment in the ancient Near East.

It stripped away any chance he could ever lead a rebellion again.

It also carried a private cruelty, forcing that last image to be his final one.

Zedekiah would carry that memory in darkness for the rest of his life.

👁️ Blinding was a common ancient punishment

🚫 It ended any hope of future rebellion

🕯️ His sons' death became his last sight

📖 Cruelty and strategy went together here

## ⛓️ Bound Him With Fetters Of Brass

"Fetters" were shackles used to bind a prisoner's hands or feet.

Brass fetters were common for high value captives marched a long distance.

The last king of Judah now walked to Babylon in chains.

This is the final humbling of David's royal line described in this book.

⛓️ Fetters means metal shackles

🔒 Brass shackles were used for high value captives

👑 Judah's last king was marched away

📖 The royal line reaches its lowest point

# SecondKingsTwentyFive 25:8-10
# 🔥 Jerusalem And The Temple Are Burned
---
## 📅 In The Fifth Month, On The Seventh Day Of The Month

About a month passed between the wall breaking and this new arrival.

That gap let Babylon decide exactly how to deal with the conquered city.

Jewish tradition later fasted on this date too, mourning the temple's fall.

Two national tragedies from this chapter both became yearly fasts.

📅 About a month passed after the wall broke

🏛️ Babylon was deciding the city's fate

📿 This date also became a yearly fast

📖 Two tragedies here still get remembered yearly

## 👑 The Nineteenth Year Of King Nebuchadnezzar

Babylon counted this year by its own king, not by Zedekiah's reign.

Judah's calendar no longer mattered because Judah no longer ruled itself.

From this point forward, Babylon's dates are the only ones that count.

The nation naming the years is the nation actually in control.

👑 Babylon now sets the calendar

🏙️ Judah no longer rules itself

📆 Nebuchadnezzar's year, not Zedekiah's

📖 Whoever names the years holds the power

## 🛡️ Nebuzaradan, Captain Of The Guard

Nebuzaradan commanded Nebuchadnezzar's royal bodyguard and elite soldiers.

He was trusted enough to be sent to finish Jerusalem himself.

This same officer appears again later in this chapter carrying out deportations.

His name honors Nebo, one of Babylon's gods.

🛡️ He commanded the royal bodyguard

🤝 Nebuchadnezzar trusted him with this task

🔁 He returns later in this chapter

📖 His name honors a Babylonian god

## 🔥 He Burnt The House Of The LORD

Solomon's temple, standing for close to four hundred years, was set on fire.

This was the place Israel believed God's presence dwelled among His people.

Its destruction was not just a building lost, it was a national trauma.

The rest of the Old Testament writes toward the hope of this temple rebuilt.

🔥 Solomon's temple is burned down

🏛️ It stood close to four hundred years

💔 Israel loses its center of worship

📖 Hope for a rebuilt temple begins here

## 🏘️ Every Great Man's House Burnt He With Fire

"Great man" meant a noble, an official, or anyone wealthy and prominent.

Babylon was not only punishing the king or the priests.

Every leading family in the city lost their home that same day.

This fire reached everyone who had any standing left in Jerusalem.

🏘️ Great man means a noble or official

🔥 Their homes burned along with the temple

👥 No leading family was spared

📖 The judgment reached everyone with standing

## 🧱 Brake Down The Walls Of Jerusalem Round About

Tearing down the walls left the city with no way to defend itself again.

A city without walls in the ancient world could not survive an attack.

Nehemiah would later rebuild these very walls generations after this moment.

Right now, Jerusalem is left completely open and unprotected.

🧱 The walls were torn down completely

🛡️ A city without walls could not defend itself

🏗️ Nehemiah rebuilds these same walls later

📖 Jerusalem is left fully exposed

# SecondKingsTwentyFive 25:11-12
# 🌾 The People Are Carried Away
---
## 🏃 The Fugitives That Fell Away To The King Of Babylon

"Fell away" here means people who had defected, siding with Babylon during the siege.

Some in Jerusalem believed surrender was wiser than continuing to resist.

Even those who cooperated with Babylon were still taken away in the end.

Choosing the winning side did not buy anyone real safety here.

🏃 Fell away means those who defected

🤝 Some sided with Babylon during the siege

🚫 Cooperation still did not save them

📖 No side of this war stayed safe

## 👥 The Remnant Of The Multitude

"Remnant" usually means a small surviving group left after a disaster.

Here it points to whoever in the city had survived the famine and the fire.

This word appears again and again in the prophets about Judah's future.

A remnant surviving is exactly what later gives Judah any hope of return.

👥 Remnant means those who survived

🔥 They lived through the famine and fire

📚 This word carries weight in the prophets

📖 A remnant is where later hope begins

## 🌾 Left Of The Poor Of The Land

Babylon deported the leaders, priests, and skilled workers, but not everyone.

The poorest residents were judged not worth the cost of moving.

Being overlooked here was actually a strange kind of mercy.

These were the people who stayed and kept the land alive.

🌾 Only the poorest were left behind

🚫 Babylon judged them not worth deporting

🕊️ Being overlooked became a quiet mercy

📖 The land was not left completely empty

## 🍇 To Be Vinedressers And Husbandmen

A "vinedresser" tended grapevines, and a "husbandman" farmed the land generally.

Babylon needed someone left behind to keep the land producing food and wine.

This was practical policy, not kindness toward the poor.

Judah's land kept being worked even after Judah's kingdom ended.

🍇 Vinedresser means someone who tends grapevines

🌾 Husbandman means a farmer of the land

💰 Babylon wanted the land still producing

📖 The land outlasted the kingdom that lost it

# SecondKingsTwentyFive 25:13-17
# 🏛️ The Temple Treasures Are Stripped
---
## 🏛️ The Pillars Of Brass That Were In The House Of The LORD

These were two massive bronze pillars standing at the entrance of the temple.

First Kings names them Jachin and Boaz when Solomon first built them.

They were not just decoration, they were among the most recognized pieces in the temple.

Babylon smashed them down along with the rest.

🏛️ Two huge bronze pillars stood at the entrance

📛 First Kings names them Jachin and Boaz

👀 They were instantly recognizable temple landmarks

📖 Even the most iconic pieces were destroyed

## ⚖️ Carried The Brass Of Them To Babylon

The bronze was not simply left broken in the rubble.

It was valuable raw metal, worth hauling all the way back to Babylon.

Babylon's economy grew richer from this plunder.

Judah's temple was left standing in ruins.

Even the scraps of Israel's worship became someone else's wealth.

⚖️ The bronze was valuable raw metal

🚚 It was hauled all the way to Babylon

💰 Babylon's wealth grew from the temple's loss

📖 Even the scraps became spoils of war

## 🌊 The Brasen Sea That Was In The House Of The LORD

The "brasen sea" was a massive bronze basin used for priestly washing.

First Kings describes it resting on twelve bronze oxen and holding a huge volume of water.

Its size alone made it one of Solomon's most impressive achievements.

Even something built to last generations did not survive this day.

🌊 The brasen sea was a giant bronze basin

🐂 It rested on twelve bronze oxen

🏗️ It was one of Solomon's greatest works

📖 Even the grandest pieces were destroyed

## 🍲 Vessels Of Brass Wherewith They Ministered

"Wherewith they ministered" means these tools were used daily in temple worship.

Pots, shovels, snuffers, and spoons all served ordinary, practical purposes.

Even small everyday temple objects, not just the famous ones, were stripped away.

Worship itself lost its physical tools that day, not only its grand symbols.

🍲 These were tools used in daily worship

🔥 Pots, shovels, snuffers, and spoons among them

📉 Even small ordinary items were taken

📖 Worship lost its everyday tools too

## 🪙 Such Things As Were Of Gold, In Gold, And Of Silver, In Silver

This phrase means each item was sorted by its own material.

Gold pieces were separated from silver pieces before being carried off.

Babylon was not just destroying the temple, it was carefully counting its plunder.

Conquest here was organized and calculated, not just chaotic violence.

🪙 Gold and silver items were sorted separately

📋 Babylon carefully counted its plunder

🧮 This was calculated, not random destruction

📖 Even the looting followed a system

## 👑 Which Solomon Had Made

These pillars and the great basin were not ordinary furnishings.

Solomon himself commissioned them close to four hundred years earlier.

Naming Solomon here reminds the reader how far the kingdom had fallen.

What one king built in glory, another generation's sin brought down.

👑 Solomon originally commissioned these pieces

📆 They stood close to four hundred years

📉 Naming him shows how far Judah fell

📖 One generation's sin undid another's glory

## ⚖️ The Brass Of All These Vessels Was Without Weight

"Without weight" means there was too much bronze to bother weighing it.

First Kings already said the original amount was too great to measure.

The sheer scale of the temple's wealth is being emphasized one last time.

Something too vast to measure was carried off anyway.

⚖️ Without weight means too much to measure

📚 First Kings already called it immeasurable

🏛️ The temple's wealth was genuinely vast

📖 Even the immeasurable was taken away

## 📏 The Height Of The One Pillar Was Eighteen Cubits

A cubit measured close to eighteen inches, about a forearm's length.

Eighteen cubits equals about twenty seven feet tall.

That is close to the height of a three story building.

A pillar this massive being smashed shows the true scale of this loss.

📏 A cubit was close to eighteen inches

🏗️ Eighteen cubits equals about twenty seven feet

🏢 That equals about a three story building

📖 A pillar this massive still could not stand

## 👑 The Chapiter Upon It Was Brass

A "chapiter" was the decorative crown or capital sitting on top of a pillar.

This one alone stood three cubits tall, close to four and a half feet.

"Wreathen work" describes an interwoven, chain like pattern carved into the bronze.

Pomegranates were added as a repeating decorative shape circling the whole crown.

Two identical pillars once framed the temple entrance in matching detail like this.

👑 Chapiter means the decorative top of a pillar

📏 It stood four and a half feet tall

🔗 Wreathen work means an interwoven carved pattern

📖 Two matching pillars once framed the entrance

# SecondKingsTwentyFive 25:18-21
# ⚔️ The Leaders Are Executed At Riblah
---
## ⚱️ Seraiah The Chief Priest, And Zephaniah The Second Priest

Seraiah held the highest priestly office in all of Judah.

He was actually an ancestor of Ezra the scribe, named generations later.

Zephaniah served just under him as the second highest ranking priest.

Removing both men at once ended Judah's entire priestly leadership at the top.

⚱️ Seraiah was Judah's chief priest

📜 He was an ancestor of Ezra

🥈 Zephaniah served as second priest

📖 Judah's top priestly leadership was wiped out

## 🚪 The Three Keepers Of The Door

These men guarded the temple's entrances, controlling who could come in.

It was a trusted position, not a minor or low ranking job.

Even the guardians of sacred space could not protect it in the end.

No one stationed at the temple's door survived this purge.

🚪 They guarded the temple's entrances

🔑 This was a trusted, important role

🛡️ Even the guards could not protect it

📖 No one at the door survived

## ⚔️ An Officer That Was Set Over The Men Of War

This was the top military commander left in Jerusalem.

He would have overseen whatever defense the city had left during the siege.

Capturing him removed any chance of the city ever organizing another fight.

Babylon was thorough about eliminating every layer of leadership.

⚔️ He commanded Jerusalem's remaining soldiers

🛡️ He led whatever defense was left

🚫 His capture ended any future resistance

📖 Babylon eliminated every layer of leadership

## 👥 Five Men Of Them That Were In The King's Presence

These were close royal advisors who had regular access to Zedekiah.

Being near the king usually meant influence and protection.

Here it meant the opposite, being close enough to be found and taken.

Proximity to power became a danger instead of a shield.

👥 These were close royal advisors

👑 They normally had regular access to the king

⚠️ Nearness to the king brought no safety

📖 Closeness to power became a danger

## 📜 The Principal Scribe Of The Host, Which Mustered The People Of The Land

This scribe's job was recording who could be drafted for Judah's army.

He kept the official lists of every able bodied man in the kingdom.

Babylon wanted him gone precisely because he understood Judah's manpower best.

Knowledge of a nation's strength was itself dangerous to leave alive.

📜 He recorded who could serve in the army

📋 He knew Judah's exact manpower

🧠 That knowledge made him a target

📖 Even record keepers were seen as threats

## 👥 Threescore Men Of The People Of The Land

"Threescore" is an old way of saying sixty.

These were ordinary citizens, not officials or priests or soldiers.

Babylon's purge reached well past the palace and the temple.

Everyday people were caught up in the punishment too.

🔢 Threescore means sixty

👥 These were ordinary, everyday citizens

🏙️ The purge reached past the palace walls

📖 Judgment fell on common people too

## 🏛️ Brought Them To The King Of Babylon To Riblah

Riblah sat in Syria, far north of Jerusalem near Hamath.

Nebuchadnezzar had set up his war headquarters there during this campaign.

Every major decision about Judah's fate was made far from Judah itself.

This is the same place Zedekiah was sentenced earlier in this chapter.

🗺️ Riblah was in Syria, near Hamath

🏕️ Nebuchadnezzar's war headquarters sat there

🧭 Judah's fate was decided far away

📖 Zedekiah was sentenced at this same place

## ⚔️ So Judah Was Carried Away Out Of Their Land

This short sentence closes out close to four hundred years of the kingdom of Judah.

The line of kings promised through David now sits broken and exiled.

Yet God's promise to David was never that a king would sit unbroken forever.

It was that the line itself would never fully end.

📉 Judah's kingdom formally ends here

👑 David's royal line now sits exiled

🕊️ God's promise was the line, not unbroken kings

📖 A promise can survive even a fallen throne

# SecondKingsTwentyFive 25:22-24
# 🕊️ Gedaliah Is Made Governor
---
## 👨‍👦 Gedaliah The Son Of Ahikam, The Son Of Shaphan

This family line was well known and trusted even before this moment.

Ahikam, Gedaliah's father, had once protected the prophet Jeremiah from execution.

Shaphan, his grandfather, was the scribe who found the book of the law under King Josiah.

Babylon chose a governor whose own family had a history of following God's word.

👨‍👦 Gedaliah came from a trusted family

🛡️ His father Ahikam once protected Jeremiah

📖 His grandfather found the book of the law

➡️ Babylon picked a governor with a godly history

## 🏙️ Whom Nebuchadnezzar King Of Babylon Had Left

This phrase refers to whoever survived the famine, the fire, and the deportations.

Babylon did not want Judah left completely empty.

A governor and a working population still served Babylon's own interests.

Even in judgment, some kind of ordinary life was allowed to continue.

🏙️ These were the survivors left behind

💰 An empty land served no one's interest

🌾 Ordinary life was allowed to continue

📖 Even judgment left room for survival

## ⚔️ The Captains Of The Armies

These were Judah's remaining military leaders who had escaped capture during the siege.

They had likely been hiding in the countryside instead of surrendering with the king.

Their choice now was to accept Gedaliah's rule or keep resisting on their own.

How they answered this decision shapes the rest of the chapter.

⚔️ These were Judah's surviving commanders

🌲 They had hidden instead of surrendered

🤔 They had to choose submission or resistance

📖 Their choice shapes what happens next

## 🗺️ There Came To Gedaliah To Mizpah

Mizpah sat just north of the ruined city of Jerusalem.

It became the new center of Judah's government since the capital lay in ruins.

A city once used for gathering armies now became the seat of a broken nation.

Even a small town can carry a nation's last hope.

🗺️ Mizpah sat north of Jerusalem

🏛️ It became the new center of government

📉 Jerusalem's ruins could no longer serve that role

📖 A small town carried the nation's last hope

## 👑 Even Ishmael The Son Of Nethaniah

Ishmael came from Judah's royal family line, related to the house of David.

He arrives here looking cooperative, willing to submit to Gedaliah like the others.

That appearance will not last, as the next part of this chapter reveals.

Scripture often introduces danger quietly before it fully shows itself.

👑 Ishmael belonged to the royal family

🤝 He arrives looking cooperative here

⚠️ His appearance will soon change completely

📖 Danger often enters quietly at first

## 🤝 Fear Not To Be The Servants Of The Chaldees

Gedaliah is telling these commanders that submission is not shameful, only survival.

Resisting further would only invite Babylon to return and finish what remained.

His advice was practical, accept the new reality and stay alive.

Not every act of survival requires a fight.

🤝 Submission was framed as survival, not shame

⚔️ More resistance risked total destruction

🧠 Gedaliah's advice was purely practical

📖 Survival does not always require a fight

## 🕊️ Dwell In The Land, And Serve The King Of Babylon

This is the same promise God gave earlier through the prophet Jeremiah.

Jeremiah had urged the people to accept exile instead of fighting Babylon.

Gedaliah's words echo that same prophetic counsel almost exactly.

Peace was still possible, even after everything Judah had already lost.

📜 This echoes Jeremiah's own counsel

🕊️ Jeremiah urged acceptance over more war

🔁 Gedaliah repeats that same message

📖 Peace remained possible after great loss

# SecondKingsTwentyFive 25:25-26
# 🗡️ Gedaliah Is Murdered
---
## 📅 In The Seventh Month

This murder happened only about two months after Jerusalem's walls fell.

Barely any time passed before Judah's fragile new peace collapsed.

Jewish tradition later marked this date with its own yearly fast as well.

A third tragedy from this single chapter became a remembered day.

📅 About two months after the wall fell

💔 Judah's fragile peace collapsed almost instantly

📿 This date also became a yearly fast

📖 A third tragedy this chapter still remembers

## 👑 Of The Seed Royal

"Seed royal" means Ishmael descended from the royal house of David.

He may have resented a non royal governor ruling in his place.

Babylon's own choice of Gedaliah likely felt like an insult to him.

Jealousy over lost status helped fuel this violence.

👑 Seed royal means descended from David's house

😠 A non royal governor may have offended him

💔 Lost status can breed real resentment

📖 Jealousy helped fuel this violence

## 🗡️ Smote Gedaliah, That He Died

The one leader trying to hold Judah together was murdered without warning.

Gedaliah had trusted Ishmael enough to welcome him, and it cost him his life.

This single act ended any real hope of a peaceful, self led community.

Trust extended in good faith was met with betrayal here.

🗡️ Gedaliah was murdered without warning

🤝 He had trusted Ishmael's welcome

💔 Judah's hope for peace died with him

📖 Good faith trust met betrayal

## ⚔️ The Jews And The Chaldees That Were With Him At Mizpah

Babylonian soldiers stationed at Mizpah were killed in this same attack.

Ishmael was not just settling a personal grudge against one man.

Killing Babylon's own soldiers guaranteed a harsh response was coming.

This attack sealed the fate of everyone left in the land.

⚔️ Babylonian soldiers died in the same attack

😠 This was more than a personal grudge

🔥 It guaranteed a harsh response from Babylon

📖 One attack sealed everyone's fate

## 😨 For They Were Afraid Of The Chaldees

The people knew Babylon would blame the whole community for Ishmael's crime.

Rather than wait to be punished for someone else's violence, they fled to Egypt.

This reverses the exodus story, God's people running back toward Egypt instead of away from it.

Fear, not faith, is what drove this final decision.

😨 They feared collective punishment

🏃 They fled to Egypt instead of waiting

🔁 This reverses the original exodus story

📖 Fear made the final decision here

# SecondKingsTwentyFive 25:27-30
# 🍽️ Jehoiachin Is Freed In Babylon
---
## 📆 The Seven And Thirtieth Year Of The Captivity Of Jehoiachin

Jehoiachin was the young king taken captive in the chapter before this one.

Thirty seven years have now passed since that first deportation to Babylon.

This closing scene jumps far past Jerusalem's fall to end the whole book on him.

Second Kings began with a divided kingdom and ends with a king still in exile.

👑 Jehoiachin was taken captive earlier in this book

📆 Thirty seven years have now passed

📚 This closing scene jumps far into the future

📖 The book ends where an exiled king waits

## 👑 Evilmerodach King Of Babylon

Evilmerodach became king of Babylon after his father Nebuchadnezzar died.

His name honors Marduk, Babylon's chief god.

A new king often reversed old policies to mark a fresh start.

Freeing a rival nation's captive king was one such gesture of new beginnings.

👑 He became king after Nebuchadnezzar died

📛 His name honors the god Marduk

🔄 New kings often reversed old policies

📖 Freeing Jehoiachin marked a fresh start

## 🔓 Lift Up The Head Of Jehoiachin

"Lift up the head" is an old idiom meaning to release someone and restore honor.

Jehoiachin had spent decades as a captive with no clear hope of freedom.

This phrase signals more than release, it signals dignity being returned to him.

After a lifetime in exile, this counted as an enormous turn of events.

🔓 Lift up the head means release with honor

⛓️ He had spent decades as a captive

🎖️ Dignity, not just freedom, is being returned

📖 A lifetime of exile finally shifts

## 🗣️ He Spake Kindly To Him

This was no small courtesy toward a foreign captive king.

Kind words from a Babylonian king to a Judean prisoner were not expected.

Something in Jehoiachin's decades long captivity had earned this rare respect.

Even in exile, God's promise to preserve David's line quietly continued.

🗣️ Kind words were not expected here

👑 A Babylonian king honored a captive rival

🕊️ Respect grew even across decades of exile

📖 David's line was quietly preserved

## 👑 Set His Throne Above The Throne Of The Kings

Other captive kings lived in Babylon alongside Jehoiachin under similar exile.

Giving him the highest seat among them was a clear public honor.

This detail is confirmed outside the Bible by ancient Babylonian ration records naming Jehoiachin.

History outside scripture actually backs up what this verse describes.

👑 Other exiled kings also lived in Babylon

🥇 Jehoiachin received the highest seat among them

📜 Ancient Babylonian records confirm this detail

📖 History outside the Bible backs this up

## 👘 Changed His Prison Garments

Prisoners in the ancient world wore distinct clothing marking their captive status.

Removing those garments visibly ended his identity as a prisoner.

New clothing signaled a completely new chapter in how he would live.

What he wore now matched the honor he had just been given.

👘 Prison clothing marked a captive's status

🔄 New clothes ended that identity visibly

🎖️ His appearance now matched his new honor

📖 A changed life started with changed clothes

## 🍽️ Did Eat Bread Continually Before Him

This means Jehoiachin now regularly ate at the king's own table.

Sharing a king's table was a rare and significant honor in this culture.

It meant steady provision instead of the uncertainty of prison food.

A once starving nation's exiled king now eats without fear of hunger.

🍽️ He ate regularly at the king's table

👑 Sharing that table was a rare honor

🥖 Steady food replaced prison uncertainty

📖 An exiled king no longer feared hunger

## 📜 A Daily Rate For Every Day

Jehoiachin received a fixed provision from the king for the rest of his life.

Second Kings chooses to end its whole story on this quiet detail of daily care.

Not on a rebuilt temple, not on a king restored to his own throne.

Just steady mercy shown to an exiled descendant of David.

The book closes on hope still alive, even in captivity.

📜 A fixed daily provision for life

📚 The whole book ends on this detail

🕊️ Not restoration, just steady mercy

📖 Hope survives even inside captivity
`.trim();

export const SECOND_KINGS_TWENTY_FIVE_PERSONAL_SECTIONS = parseSecondKingsTwentyFiveRawNotes(SECOND_KINGS_TWENTY_FIVE_RAW_NOTES);
