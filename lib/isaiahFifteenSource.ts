export type IsaiahFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFifteenRawNotes(rawText: string): IsaiahFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 15:${startVerse}` : `Isaiah 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Isaiah 15 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTEEN_RAW_NOTES = `# Isaiah 15:1-3
# 😭 Moab's Cities Mourn By Night
---
## 📜 The Burden Of Moab

"Burden" here means a message announcing coming judgment on a nation.

Isaiah used this same word to open his message against Babylon back in chapter thirteen.

That same pattern now turns toward Moab, a nation just east of the Dead Sea.

This chapter is one more burden in a long series against Israel's neighbors.

🎯 Burden means a judgment message
📜 Chapter thirteen targeted Babylon first
🗺️ Moab sits east of the Dead Sea
📖 This burden continues that same pattern

## 🌙 In The Night Ar Of Moab Is Laid Waste

"Ar" was one of Moab's chief cities, likely along the Arnon River.

Being destroyed "in the night" means the attack came with no warning at all.

"Brought to silence" pictures a once busy city gone completely quiet.

Sudden disaster left no time to prepare or escape.

🏙️ Ar was a chief Moabite city
🌙 The attack came with no warning
🤫 Brought to silence means the city goes quiet
📖 Sudden disaster allowed no time to prepare

## 🏰 Kir Of Moab Is Laid Waste

"Kir" was Moab's other major fortified city, likely the place known today as Kerak.

Naming both Ar and Kir together doubles the emphasis on total destruction.

These were not minor towns, but two of Moab's strongest defended cities.

If both major strongholds fall in one night, nowhere in Moab was truly safe.

🏰 Kir was Moab's other major fortress
🤝 Ar and Kir together mean total loss
🛡️ Both were Moab's strongest defended cities
📖 Nowhere in Moab was truly safe

## ⛰️ Gone Up To Bajith, And To Dibon, The High Places, To Weep

"High places" were hilltop shrines used for worshiping other gods.

Bajith and Dibon were places where some of Moab's own worship sites stood.

The people rush there to weep, hoping their gods can still help them.

Isaiah lets the reader watch that hope fail in real time.

⛰️ High places means hilltop worship shrines
🙏 Bajith and Dibon held Moab's shrines
😭 The people weep at these sites
📖 Their gods cannot save them here

## 🏘️ Moab Shall Howl Over Nebo, And Over Medeba

Nebo and Medeba were two more well known Moabite towns.

Naming exact places instead of speaking in general terms makes the disaster feel real.

A Moabite reader would have recognized each town by name instantly.

Grief was not confined to one city.

It spread from town to town.

🏘️ Nebo and Medeba were real towns
📍 Naming places makes the loss feel real
👂 Moabites would know each name at once
📖 Grief spread from town to town

## 😭 Every One Shall Howl, Weeping Abundantly

"Sackcloth" was a coarse, rough cloth worn as a public sign of grief.

Ancient rooftops were flat and often used for gatherings, not just storage.

People climbed up there so their mourning could be seen and heard by everyone.

"Weeping abundantly" describes loud, uncontrolled grief, not a few quiet tears.

The whole city became one continuous sound of sorrow.

🪢 Sackcloth was coarse, public mourning cloth
🏠 Rooftops were flat gathering spaces
📢 People mourned loudly from up there
📖 The whole city sounded like sorrow

# Isaiah 15:4-6
# 📢 The Cry Spreads Across Moab
---
## 🗺️ Heshbon Shall Cry, And Elealeh

Heshbon sat right on the border Moab shared with Israel's territory.

Elealeh stood close by, just north of Heshbon.

A border town used to political tension now cries out in genuine grief.

The disaster keeps spreading from town to town without stopping.

🏘️ Heshbon and Elealeh join the mourning
🗺️ Heshbon sat near Moab's border
⚔️ A border town usually braced for conflict
📖 Grief kept spreading without stopping

## 📢 Their Voice Shall Be Heard Even Unto Jahaz

Jahaz was another town, farther off from Heshbon and Elealeh.

Hearing the cry "even unto Jahaz" stresses just how far this sound traveled.

A reader might miss that this describes real distance, not exaggeration.

The scale of the mourning matched the scale of the destruction.

📍 Jahaz sat farther away from the rest
📏 Even unto Jahaz stresses real distance
🔊 The cry traveled a long way
📖 Mourning matched the scale of loss

## ⚔️ The Armed Soldiers Of Moab Shall Cry Out

Soldiers were trained to stay calm and steady, even in danger.

Even they break down and cry out here.

"His life shall be grievous unto him" means life itself now feels unbearable.

When trained fighters lose their composure, the disaster has reached everyone.

⚔️ Soldiers usually stayed calm under pressure
😭 Even they cry out here
💔 Grievous means life feels unbearable
📖 The disaster has reached everyone

## 💔 My Heart Shall Cry Out For Moab

This is not a gloating message over an enemy's downfall.

The speaker, likely Isaiah speaking for God, genuinely grieves for Moab.

Chapter fourteen mocked the king of Babylon with a taunt.

This chapter carries real sorrow instead.

💔 This is not gloating over Moab
😢 The speaker genuinely grieves for Moab
⚖️ Chapter fourteen taunted, this chapter mourns
📖 Judgment and compassion can coexist

## 🏃 His Fugitives Shall Flee Unto Zoar, An Heifer Of Three Years Old

Zoar was the small town Lot once fled to when Sodom was destroyed.

Refugees from Moab now run there for safety in that same way.

"An heifer of three years old" is a difficult old phrase.

Many scholars believe it was simply another name Zoar was known by at the time.

🏘️ Zoar was Lot's old refuge city
🏃 Moab's refugees now flee there too
🐄 Heifer phrase was likely another name
📖 Zoar becomes a place of escape

## 🛤️ By The Mounting Up Of Luhith With Weeping

Luhith and Horonaim were both roads leading out of Moab.

"Mounting up" describes a steep climb, with refugees weeping as they struggled uphill.

Both routes get named because real people actually used them to escape.

Every road out of Moab carried the same sound of crying.

🛤️ Luhith and Horonaim were escape roads
⛰️ Mounting up means a steep climb
😭 Refugees wept while they climbed
📖 Every road carried the same cry

## 💧 The Waters Of Nimrim Shall Be Desolate

Nimrim was known for reliable water in an otherwise dry region.

"Desolate" here means that water source has completely dried up or been ruined.

Losing water in this climate threatened survival itself, not just comfort.

Even Moab's most dependable resource fails in this judgment.

💧 Nimrim was known for reliable water
🏜️ Desolate means the source is ruined
⚠️ Losing water threatened survival itself
📖 Even the most reliable resource fails

## 🌾 The Hay Is Withered Away, The Grass Faileth

These three phrases all describe the same total collapse from different angles.

Withered hay meant no feed left for animals.

Failing grass meant no pasture left to graze.

"No green thing" closes the list with total, complete loss.

🌾 Hay withering meant no animal feed
🐑 Grass failing meant no pasture
🍂 No green thing means total loss
📖 Three phrases describe one full collapse

# Isaiah 15:7-9
# 🦁 No Safety Even For Survivors
---
## 💰 Carry Away To The Brook Of The Willows

Moabites grab whatever wealth and stored goods they can carry.

The "brook of the willows" was likely a stream marking Moab's southern border.

Crossing that border meant leaving their homeland behind for good.

Even years of gathered wealth becomes just a heavy load to run with.

💰 They grab whatever wealth remains
🌊 The brook marked Moab's southern border
🚶 Crossing it meant leaving home for good
📖 Wealth becomes only a heavy load

## 🧭 The Cry Is Gone Round About The Borders Of Moab

This is not grief in one city anymore.

"Round about the borders" means the sorrow has reached every edge of the nation.

There is no untouched corner left in all of Moab.

The judgment described since verse one has now touched the whole land.

🗺️ Grief now covers every border
🚫 No untouched corner remains
🔁 This began small and spread wide
📖 Judgment has touched the whole land

## 📯 The Howling Thereof Unto Eglaim, And The Howling Thereof Unto Beerelim

Eglaim and Beerelim were towns sitting at opposite edges of Moab.

Naming both towns together marks the full reach of the disaster.

A reader familiar with the map would recognize just how far apart these places were.

Nothing between them was spared either.

🧭 Eglaim and Beerelim sat far apart
🗺️ Naming both shows the full reach
📏 The distance between them was real
📖 Nothing between them was spared

## 🩸 The Waters Of Dimon Shall Be Full Of Blood

"Dimon" sounds very close to the Hebrew word for blood.

Isaiah likely chose this name on purpose to make the wordplay land harder.

Water that once sustained life now pictures death instead.

The image itself becomes part of the warning.

🩸 Dimon sounds like the word for blood
✍️ Isaiah likely chose this on purpose
💧 Water now pictures death, not life
📖 The wordplay becomes part of the warning

## 🗣️ I Will Bring More Upon Dimon

God speaks directly here, promising the judgment is not finished yet.

Whatever already happened to Moab, more is still coming.

This removes any doubt about who is really behind this disaster.

The one true God, not chance or politics, is driving these events.

🗣️ God speaks directly in this line
➕ More judgment is still coming
❓ This removes doubt about the cause
📖 God, not chance, drives this disaster

## 🦁 Lions Upon Him That Escapeth Of Moab

Some Moabites do manage to survive the initial destruction.

Even those survivors are not promised safety afterward.

"Lions" pictures a very real danger waiting in unfamiliar, wild territory.

The chapter ends without a clean escape for anyone.

🦁 Lions threaten Moab's surviving refugees
🏃 Escaping the first disaster is not safety
🌾 Wild territory brought its own danger
📖 No clean escape closes this chapter`.trim();

export const ISAIAH_FIFTEEN_PERSONAL_SECTIONS = parseIsaiahFifteenRawNotes(ISAIAH_FIFTEEN_RAW_NOTES);
