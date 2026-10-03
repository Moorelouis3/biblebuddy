export type EzekielTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentySixRawNotes(rawText: string): EzekielTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 26:${startVerse}` : `Ezekiel 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 26 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_SIX_RAW_NOTES = `# Ezekiel 26:1-3
# 💰 Tyre Smells Profit In Jerusalem's Fall
---
## 📅 In The Eleventh Year

Ezekiel dated this message precisely, to the eleventh year of king Jehoiachin's exile.

That same year lines up with Jerusalem's fall to Babylon.

Tyre's gloating word in the next verse came almost immediately after.

A trading city watching a neighbor collapse wasted no time calculating the profit.

Greed in Tyre moved faster than grief ever could.

📅 Dated to the eleventh year of exile
🏛️ Same year Jerusalem fell to Babylon
💰 Tyre reacted almost immediately
📖 The date marks how fast greed moved

## 😏 Aha, She Is Broken That Was The Gates Of The People

Aha here is satisfaction, not shock.

Gates of the people pictures Jerusalem as a doorway merchants had to pass through.

Jerusalem controlled trade routes linking Arabia and the east to the Mediterranean coast.

A broken gate meant one less toll for merchants to pay.

Ammon and Moab mocked Jerusalem out of old hatred.

Tyre's mockery came from profit instead.

😏 Aha means satisfaction, not shock
🚪 Gates of the people pictures a trade doorway
🛣️ Jerusalem sat on key trade routes
📖 Tyre's motive was profit, not old hatred

## 📦 I Shall Be Replenished, Now She Is Laid Waste

Replenished means filled back up, restocked with wealth.

Tyre expected Jerusalem's ruin to redirect her customers.

One city's collapse looked like pure opportunity to Tyre.

God heard that calculation before Tyre ever acted on it.

The very next verse gives God's own answer.

📦 Replenished means restocked with wealth
💹 Tyre expected to gain Jerusalem's trade
⚖️ One city's fall looked like profit
📖 God answered that calculation directly

## ⚔️ Behold, I Am Against Thee, O Tyrus

I am against thee is some of the most direct opposition language in the Bible.

God is not simply disappointed with Tyre.

He has made Himself her enemy.

Many nations get compared to the sea's waves rising against her.

Tyre sat protected on a rocky island, safe from most ordinary attackers.

Waves from many directions meant no single defense would work this time.

⚔️ I am against thee is direct opposition
🌊 Many nations pictured as rising waves
🏝️ Tyre's island location once protected her
📖 No single defense covers every direction

# Ezekiel 26:4-6
# 🪨 Scraped Bare Like A Rock
---
## 🧱 Destroy The Walls Of Tyrus, And Break Down Her Towers

Tyre's walls were famous across the ancient world for their strength.

Towers gave defenders height, a place to see and strike attackers early.

Both get named here specifically because both were about to fail completely.

No defense holds forever once God Himself declares it broken.

Walls built for centuries fell exactly on schedule here.

🧱 Tyre's walls were famously strong
🗼 Towers gave defenders height and sight
💥 Both are named because both failed
📖 No defense survives when God declares it

## 🪨 Scrape Her Dust From Her, And Make Her Like The Top Of A Rock

Scrape pictures a knife cleaning every last bit of soil off bare stone.

Tyre's mainland city would be left standing on nothing but rock.

Many Bible teachers connect this detail to Alexander the Great, centuries later.

Alexander later tore down the ruined mainland city completely.

He used its stones to build a causeway reaching the island.

A prophecy about Babylon ended up describing a conqueror who did not exist yet.

🪨 Scrape pictures stripping a stone bare
🏜️ Mainland city left as bare rock
⚔️ Many connect this to Alexander's later conquest
📖 One prophecy describes two separate conquerors

## 🎣 A Place For The Spreading Of Nets In The Midst Of The Sea

Fishermen spread their nets out on open rocks to dry in the sun.

Tyre was one of the richest trade cities anywhere in the ancient world.

This image reduces that wealthy city to a spot where poor fishermen dry their gear.

The irony itself carries the whole weight of the judgment.

The city that once commanded the sea ends up used by its smallest workers.

🎣 Nets were spread on rocks to dry
💎 Tyre was one of the richest cities
🪢 She becomes a drying spot for fishermen
📖 The irony itself is the judgment

## 👧 Her Daughters Which Are In The Field Shall Be Slain By The Sword

Daughters here does not mean actual children.

It is a common Old Testament way to describe smaller towns depending on a main city.

In the field marks these as mainland settlements, not the fortified island itself.

Those undefended towns fell first, before the siege ever reached the city's core.

They shall know that I am the LORD closes the section.

The same refrain answered Ammon, Moab, Edom, and Philistia in the last chapter.

👧 Daughters means satellite towns, not children
🌾 In the field marks mainland settlements
⚔️ Smaller towns fell before the siege
📖 The same refrain returns from before

# Ezekiel 26:7-11
# ⚔️ Nebuchadnezzar's Siege Begins
---
## 👑 Nebuchadrezzar King Of Babylon, A King Of Kings

Nebuchadrezzar is simply a different spelling of Nebuchadnezzar, the same Babylonian king.

King of kings here is a title, not a divine claim.

It means he ruled over many lesser kings as his own vassals.

History records Nebuchadnezzar laying siege to mainland Tyre for about thirteen years.

Even a slow siege still fulfilled exactly what God had spoken here.

👑 Nebuchadrezzar is Nebuchadnezzar, same king
🤴 King of kings means ruler over kings
⏳ History records a thirteen year siege
📖 A slow siege still fulfilled God's word

## ⚙️ He Shall Set Engines Of War Against Thy Walls

Engines of war were large machines built to break through stone defenses.

Battering rams swung heavy beams again and again into the same weak point.

Siege towers let attacking soldiers climb level with the top of a wall.

Axes finished what the machines started, cutting through broken towers piece by piece.

This was not a quick raid.

It was slow and built to never fail.

⚙️ Engines of war broke through stone walls
🔨 Battering rams struck one weak point
🪜 Siege towers reached the top of walls
📖 The attack was slow by design

## 📯 Thy Walls Shall Shake At The Noise Of The Horsemen

This line describes fear building before a single wall even falls.

Thousands of horses, chariots, and wheels moving together made a noise the city had never heard.

Verse 10 compares it to soldiers entering a city already broken open.

The noise alone told Tyre's people what was coming before they saw it.

Terror arrived ahead of the army itself.

📯 Walls shook before they even fell
🐎 Thousands of horses created the noise
🚪 Verse 10 pictures entering a broken city
📖 Terror arrived before the army did

## 🐴 With The Hoofs Of His Horses Shall He Tread Down All Thy Streets

This pictures cavalry riding straight through the city's streets, not around them.

Streets built for merchants and carts were never meant to hold charging horses.

Strong garrisons names the trained soldiers stationed to protect the city.

Those same defenders are the ones described falling to the ground.

A city built for trade became a battlefield instead.

🐴 Cavalry rode straight through the streets
🏙️ Streets were built for trade, not war
🛡️ Garrisons were the trained defenders
📖 A trading city became a battlefield

# Ezekiel 26:12-14
# 🌊 Stones Cast Into The Sea
---
## 🧱 They Shall Lay Thy Stones And Thy Timber And Thy Dust In The Midst Of The Water

This line describes the city's own building materials ending up in the sea.

Stones, timber, and even dust, the whole structure, get thrown into the water.

Many connect this detail to Alexander the Great, centuries after Nebuchadnezzar.

Alexander later used the rubble of the ruined mainland city to build a causeway.

A strange detail in Ezekiel's day became exact history generations later.

🧱 The city's own materials end in the sea
🪨 Stones, timber, and dust are all named
⚔️ Alexander later finished what this verse describes
📖 A strange detail became exact history

## 🎵 I Will Cause The Noise Of Thy Songs To Cease

Tyre was known across the ancient world for music and festivity.

Her harps were not just entertainment.

They marked successful trade deals too.

Silence here means more than just quiet streets.

It means the entire culture built around wealth and festivity is gone.

A city defined by noise ends this chapter in total silence.

🎵 Tyre was known for music and festivity
🎻 Harps marked successful trade deals
🤫 Silence means more than quiet streets
📖 A loud city ends in total silence

## 🚫 Thou Shalt Be Built No More

This is a permanent statement, not a temporary setback.

Mainland Tyre really was left in ruins after Nebuchadnezzar's long siege.

The island city nearby lasted longer, until Alexander's later conquest finished the job.

For I the LORD have spoken it closes the promise with God's own authority.

The judgment did not need one single conqueror.

It just needed time.

🚫 Built no more means permanent, not temporary
🏚️ Mainland Tyre was left in ruins
⏳ The island city fell later, to Alexander
📖 The judgment needed time, not one event

# Ezekiel 26:15-18
# 👑 The Princes Of The Sea Mourn
---
## 🏝️ Shall Not The Isles Shake At The Sound Of Thy Fall

Isles here names the coastal regions and islands that traded with Tyre.

Tyre's economy touched nearly every port across the ancient Mediterranean world.

Her fall was not a local event.

It rippled through every trading partner she had.

The wounded crying and the slaughter describe the siege itself, heard from far away.

A city's fall can shake places that never saw the battle firsthand.

🏝️ Isles names Tyre's distant trading partners
🌍 Her economy touched nearly every port
📉 Her fall rippled through every partner
📖 A fall can shake distant places too

## 👑 Princes Of The Sea Shall Come Down From Their Thrones

These princes ruled coastal cities and islands that depended on Tyre's trade.

Coming down from a throne pictures a ruler stepping out of power and comfort.

Removing royal robes was a public act of grief, not just a private feeling.

Broidered garments names finely embroidered royal clothing, the opposite of mourning dress.

Rulers who normally displayed wealth chose to display grief instead.

👑 Princes of the sea ruled coastal cities
🪑 Coming down pictures stepping out of power
👘 Removing robes was a public act of grief
📖 Wealth was traded for visible grief

## 👔 They Shall Clothe Themselves With Trembling

Trembling here is not described as a feeling.

It is described instead like a piece of clothing.

The fear covers them completely, the way a garment covers the whole body.

Sitting on the ground was a recognized mourning posture in the ancient world.

These same rulers now feared the same fate was coming for their own cities.

Tyre's fall was a warning every port city understood instantly.

👔 Trembling is pictured as clothing worn
🌍 Fear covered them completely
🪵 Sitting on the ground was mourning custom
📖 Tyre's fall warned every other port

## 🎼 They Shall Take Up A Lamentation For Thee

A lamentation is a formal funeral song, not a casual expression of sadness.

The same kind of song was normally sung over a dead person, not a city.

Treating Tyre like a dead body shows just how total her destruction was.

Renowned means famous and celebrated, a word choice that makes the fall land harder.

The greatest trade city in the world got a funeral instead of a headline.

🎼 A lamentation is a formal funeral song
⚰️ Normally sung over a person, not a city
🏆 Renowned means famous and celebrated
📖 The greatest trade city got a funeral

# Ezekiel 26:19-21
# 🪦 Sought For, Never Found
---
## 🌊 When I Shall Bring Up The Deep Upon Thee

The deep names the sea itself, treated here like a living force under God's command.

Tyre built her entire identity on ruling the sea safely.

This verse pictures that same sea rising up against her instead of serving her.

The source of her wealth becomes the very instrument of her ruin.

What a city trusts most can become exactly what God uses against it.

🌊 The deep names the sea itself
⚓ Tyre built her identity on the sea
🔄 The sea now rises against her
📖 A city's trust became its ruin

## ⚰️ With Them That Descend Into The Pit, With The People Of Old Time

The pit is a common Old Testament picture for the grave, the place of the dead.

People of old time refers to the long dead, people from ancient generations already buried.

Tyre is pictured joining that same company, placed among nations and cities long gone.

Desolate of old means these are not new ruins.

They are places already forgotten for ages.

Tyre would not just fall.

She would be filed away with the long forgotten.

🪦 The pit is a picture of the grave
👴 People of old time means the long dead
🏚️ Tyre joins nations already long gone
📖 She would be filed among the forgotten

## 🔍 Though Thou Be Sought For, Yet Shalt Thou Never Be Found Again

This line pictures someone searching for Tyre long after her fall and finding nothing.

Sought for means actively searched, not simply remembered with sadness.

A city this wealthy and famous should have left some trace behind.

God promises there will not even be that much left.

Greed opened this chapter.

Erasure closes it.

🔍 Sought for means actively searched
💎 A city this famous should leave a trace
🚫 God promises not even a trace remains
📖 Greed opened this chapter, erasure closes it
`.trim();

export const EZEKIEL_TWENTY_SIX_PERSONAL_SECTIONS = parseEzekielTwentySixRawNotes(EZEKIEL_TWENTY_SIX_RAW_NOTES);
