export type EzraThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraThreeRawNotes(rawText: string): EzraThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 3:${startVerse}` : `Ezra 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezra 3 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_THREE_RAW_NOTES = `# Ezra 3:1-3
# 🔥 The Altar Comes First
---
## 🤝 As One Man To Jerusalem

"As one man" does not mean one person actually showed up.

It means the whole group acted with one shared purpose.

The exiles had only recently returned from Babylon.

They were scattered across many different towns.

Yet when the seventh month came, they all converged on Jerusalem together.

No king ordered this gathering.

They chose this unity themselves.

🤝 As one man means shared purpose

🏙️ Exiles were scattered across many towns

📅 They converged for the seventh month

📖 They chose this unity themselves

## 📅 The Seventh Month Was Come

The seventh month refers to Tishri on the Hebrew calendar.

This was the most sacred month of the entire year.

It contained the Feast of Trumpets, the Day of Atonement, and the Feast of Tabernacles.

Returning exiles chose this exact month to restart worship in Jerusalem.

The timing was not random.

It lines up with the holiest season Israel had.

📅 Seventh month means Tishri

🎺 It held the Feast of Trumpets

🕊️ It held the Day of Atonement

📖 They restarted worship in the holiest season

## 👳 Jeshua The Son Of Jozadak

Jeshua was the high priest at the time of the return from exile.

His father Jozadak had been carried off to Babylon as a young man.

That deportation is recorded back in Second Kings twenty five.

Jeshua now stands in Jerusalem doing the priestly work his father never got to do.

A broken priestly line picks back up here.

👳 Jeshua served as high priest

⛓️ His father Jozadak was exiled

📜 Second Kings twenty five records that exile

📖 A broken priestly line resumes here

## 👑 Zerubbabel The Son Of Shealtiel

Zerubbabel was the governor appointed over the returning exiles.

He was also a grandson of Jehoiachin, the last king of Judah before the exile.

That makes him part of the royal line of David.

No king sits on a throne here.

Persia rules the region now.

Still, the promised family line has not disappeared.

👑 Zerubbabel governed the returning exiles

🌳 He descended from King Jehoiachin

📖 That places him in David's royal line

➡️ The promised line survives without a throne

## 🔥 Builded The Altar Of The God Of Israel

The altar came before anything else, even before the temple building itself.

Sacrifice mattered more to this returning community than construction did.

This same altar site had held Solomon's original altar generations earlier.

Rebuilding it first restored the one thing worship could not happen without.

Everything else about the temple could wait.

The relationship with God could not.

🔥 The altar came before the building

🙏 Sacrifice mattered most to this community

🏛️ This was Solomon's original altar site

📖 Worship restarted before construction did

## 😨 For Fear Was Upon Them Because Of The People Of Those Countries

The word "they" refers to foreign peoples who had settled the land during the exile.

Judah had sat mostly empty for about seventy years.

Other groups moved into the region during that time.

Those neighbors were not friendly toward this new group of returnees.

Fear did not stop the exiles from worshiping.

It just made the moment feel urgent instead of safe.

🌍 They refers to nearby foreign settlers

🕰️ Judah sat empty for about seventy years

😨 New neighbors were not friendly

📖 Fear did not stop their worship

# Ezra 3:4-5
# 🌿 The Feasts Resume
---
## 🌿 They Kept Also The Feast Of Tabernacles

The Feast of Tabernacles was a week long festival held every fall.

Families lived in temporary shelters made of branches during the feast.

It remembered the forty years Israel spent living in tents in the wilderness.

The phrase "as it is written" points back to the law of Moses.

The exiles were not inventing new worship.

They were restoring the exact commands God gave long before.

🌿 Tabernacles means temporary branch shelters

🏜️ It remembered forty years in the wilderness

📜 As it is written points to Moses

📖 They restored old commands, not new ones

## 🔥 Offered The Daily Burnt Offerings By Number

A burnt offering was completely consumed by fire on the altar.

None of the meat was kept back for the priests to eat.

"By number" means a fixed count was required for each day.

"The custom" refers to detailed instructions written in the law of Moses.

Worship here followed an exact pattern, not personal preference.

🔥 Burnt offerings were fully consumed

🚫 None of it was kept for food

🔢 By number means a fixed daily count

📖 Custom means the law's exact pattern

## 🌅 The Continual Burnt Offering

The continual burnt offering was sacrificed every morning and every evening.

It never stopped, no matter what else was happening that day.

New moons marked the start of each month on the Hebrew calendar.

Each new moon carried its own extra offering beyond the daily one.

Worship here was constant, not occasional.

🌅 Continual means morning and evening, daily

🌑 New moons marked each month's start

➕ Each new moon added its own offering

📖 Worship stayed constant, never occasional

## 🎁 Every One That Willingly Offered A Freewill Offering

A freewill offering was never required by law.

It came from a person's own choice, beyond anything commanded.

This shows the returning exiles were not just checking boxes.

Some of them wanted to give more than the minimum.

Obedience and genuine devotion both appear side by side here.

🎁 Freewill offerings were never required

❤️ They came from personal choice

➕ Some gave beyond the minimum

📖 Obedience and devotion appear together

# Ezra 3:6-7
# 🌲 Funding The Temple Work
---
## 🏛️ The Foundation Of The Temple Of The LORD Was Not Yet Laid

Worship had already restarted, but the temple building itself had not even begun.

The altar and the sacrifices came first.

Actual construction would take real time to organize.

God did not wait for a finished building before receiving worship.

The relationship with God never depended on a building at all.

🕰️ Worship began before construction did

🏛️ The building itself would take time

🙏 God did not wait for a finished temple

📖 The relationship never depended on a building

## 🪨 Money Also Unto The Masons And To The Carpenters

Masons cut and shaped the stone used in construction.

Carpenters worked with the wood, especially the cedar beams.

Both were skilled tradesmen, paid directly for their labor.

This mirrors exactly how Solomon funded the first temple generations earlier.

The pattern of building God's house repeats itself here.

🪨 Masons shaped the stone

🪵 Carpenters worked the wood

💰 Both were paid skilled workers

📖 This mirrors Solomon's first temple

## 🌊 Meat And Drink And Oil Unto Them Of Zidon And To Them Of Tyre

Zidon and Tyre were Phoenician port cities on the Mediterranean coast.

Their people were skilled at logging and shipping timber.

Food, wine, and oil served as payment instead of coined money.

Solomon paid these same cities the same way generations before.

This trade relationship was not new.

It picked up an old, working pattern.

🌊 Zidon and Tyre were Phoenician port cities

🪵 They specialized in shipping timber

🫒 Food, wine, and oil served as payment

📖 Solomon used this same trade pattern

## 🌲 Cedar Trees From Lebanon To The Sea Of Joppa

Cedar from Lebanon was famous across the ancient world for its strength and its scent.

It resisted rot far better than local wood.

Solomon's original temple had used the very same cedar.

Joppa was the nearest seaport, known today as Jaffa.

Logs floated down the coast by sea, then traveled inland to Jerusalem.

🌲 Cedar was famous for strength and scent

🏛️ Solomon's temple used this same wood

⚓ Joppa was the nearest seaport

📖 The same materials built both temples

## 👑 The Grant That They Had Of Cyrus King Of Persia

Cyrus was the Persian king who had conquered Babylon.

He issued a decree allowing the exiles to return and rebuild.

That decree is recorded at the very start of this book.

This grant means Cyrus had authorized funding for the project.

A pagan king's official approval made all of this legally possible.

👑 Cyrus conquered Babylon

📜 His decree allowed the return

💰 The grant means authorized funding

📖 A pagan king made this legally possible

# Ezra 3:8-9
# 🔨 The Builders Are Appointed
---
## 🕰️ The Second Year Of Their Coming Unto The House Of God

About a year had already passed since the exiles first arrived in Jerusalem.

The altar and the feasts described earlier took time to organize.

Now, in the second year, actual construction work finally began.

The timeline shows careful, deliberate progress, not instant results.

Rebuilding a nation does not happen overnight.

🕰️ About a year had already passed

🔥 Altar worship came first

🔨 Construction began in year two

📖 Rebuilding took deliberate, careful time

## 🌱 The Remnant Of Their Brethren The Priests And The Levites

"Remnant" means the surviving portion left after a much larger group was lost.

Not every priest or Levite who left Judah survived the exile in Babylon.

Only a fraction chose to make the difficult journey back at all.

This small remaining group now carried the weight of restarting temple worship.

A remnant can still carry forward an entire calling.

🌱 Remnant means the surviving portion left

⛓️ Many did not survive the exile

🚶 Only a fraction chose to return

📖 A remnant still carried the calling forward

## 🔽 Appointed The Levites From Twenty Years Old And Upward

The law of Moses had originally set the minimum age for Levite service at thirty.

Numbers chapter four records that original requirement.

Here the age is lowered to twenty instead.

Fewer Levites had returned from exile than were available in Moses' time.

Lowering the age let a smaller community still get the work done.

📜 The original minimum age was thirty

📖 Numbers four records that rule

🔽 Here the age drops to twenty

➡️ Fewer workers meant a lower bar

## 🧑‍🔧 The Sons Of Henadad With Their Sons And Their Brethren

These are family groups within the tribe of Levi, each named by their ancestor.

Kadmiel and Henadad were leaders of specific Levite family lines.

Naming each family by name mattered to the people keeping this record.

These men served as foremen, organizing the actual workmen at the site.

Ordinary families, remembered by name, carried out God's work.

👪 These are named Levite family lines

🧑‍🔧 Kadmiel and Henadad led specific groups

📋 Naming them mattered to the record

📖 Ordinary families carried out God's work

# Ezra 3:10-11
# 🎺 The Foundation Is Laid
---
## 🏛️ Laid The Foundation Of The Temple Of The LORD

This moment had been building since the very first chapter of this book.

Decades earlier, this same temple had been burned to the ground by Babylon.

Now its foundation stones were finally set back in place.

This was not just construction.

It marked God's presence returning to the land.

A long broken promise was visibly being kept.

🏛️ The foundation was finally set in place

🔥 The first temple had been burned by Babylon

🙏 This marked God's presence returning

📖 A broken promise was visibly being kept

## 👘 Priests In Their Apparel With Trumpets

"Apparel" here means the special priestly garments worn only for sacred duty.

Ordinary clothes were never used for this kind of ceremony.

Trumpets in scripture usually mark an announcement of something important.

Their sound called the entire community's attention to this exact moment.

Every detail here was intentional, not casual.

👘 Apparel means special priestly garments

🎺 Trumpets announced something important

👂 The sound gathered everyone's attention

📖 Every detail here was intentional

## 🎶 The Levites The Sons Of Asaph With Cymbals

Asaph was a Levite musician appointed generations earlier under King David.

His descendants carried on that same musical role.

Cymbals were used to keep rhythm during temple worship and processions.

This detail connects straight back to how David first organized temple music.

The same musical family still led worship after everything Judah had lost.

🎶 Asaph was David's appointed musician

👪 His descendants carried on the role

🥁 Cymbals kept rhythm during worship

📖 The same family still led worship

## 📜 After The Ordinance Of David King Of Israel

"Ordinance" here means an official pattern or set of instructions.

David had organized temple worship long before this temple even existed.

First Chronicles records David's detailed plans for music and priestly duty.

This new generation deliberately followed that same old pattern.

Nothing about this worship was invented on the spot.

📜 Ordinance means an official pattern

👑 David organized worship generations earlier

📖 First Chronicles records those plans

➡️ This generation followed the same pattern

## ❤️ His Mercy Endureth For Ever Toward Israel

This exact refrain appears throughout the Psalms as a worship response.

"Mercy" here means God's steady, loyal love, not just forgiveness for wrongdoing.

"Endureth" means it never runs out or wears down over time.

Singing this line connected this new generation to generations of worship before them.

Even after exile and loss, that same love was still being celebrated.

📖 This refrain appears throughout the Psalms

❤️ Mercy means steady, loyal love

♾️ Endureth means it never runs out

➡️ Loss did not end this celebration

# Ezra 3:12-13
# 😭 Weeping And Shouting As One
---
## 👴 Ancient Men That Had Seen The First House

These were elderly men old enough to remember Solomon's original temple.

That temple had been destroyed by Babylon about seventy years earlier.

Very few people alive could still remember what it actually looked like.

These men now watched a much smaller foundation being laid in its place.

Memory made this moment far more emotional for them than for anyone else.

👴 These men remembered Solomon's temple

🔥 Babylon destroyed it about seventy years earlier

📏 The new foundation looked far smaller

📖 Memory made this moment deeply emotional

## 😭 Wept With A Loud Voice

These men were not crying quietly to themselves.

"Loud voice" means their grief was heard by the entire crowd.

The prophet Haggai later confirms this new temple looked poor next to the old one.

Losing something beautiful can hurt even while something good is being rebuilt.

Grief and rebuilding happened here in the very same moment.

😭 Their grief was loud, not quiet

📖 Haggai later confirms the new temple's small size

💔 Loss can hurt during real rebuilding

➡️ Grief and rebuilding shared one moment

## 🎉 Many Shouted Aloud For Joy

A younger generation had no memory of the first temple to compare this one to.

For them, this foundation was not a disappointment.

It was the first real evidence that exile was truly over.

Two very different reactions rose from the same crowd at the same time.

Both responses were honest, and both were true.

🎉 Younger people had no old temple to compare

✨ For them, this was pure good news

🔀 Two different reactions rose together

📖 Both responses were honest and true

## 🔊 The Noise Was Heard Afar Off

Weeping and shouting blended into one loud, unified sound.

Nobody standing at a distance could tell the two apart.

That mixed sound became the honest picture of this moment.

Real faith often holds grief and joy together instead of choosing one.

This chapter ends on that exact, unresolved mixture.

🔊 Weeping and shouting blended together

👂 Listeners could not tell them apart

❤️ Real faith often holds both at once

📖 The chapter ends on that mixture
`.trim();

export const EZRA_THREE_PERSONAL_SECTIONS = parseEzraThreeRawNotes(EZRA_THREE_RAW_NOTES);
