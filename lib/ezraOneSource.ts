export type EzraOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraOneRawNotes(rawText: string): EzraOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 1:${startVerse}` : `Ezra 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Ezra 1 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_ONE_RAW_NOTES = `# Ezra 1:1-4
# 📜 Cyrus's Proclamation
---
## In The First Year Of Cyrus King Of Persia

First year marks Cyrus's first year ruling over Babylon, not over Persia itself.

Cyrus had already been king of Persia for years before this.

He conquered Babylon in 539 BC, the same year this decree went out.

Daniel had been serving in Babylon's court right up until this takeover.

The exiles' whole future changed within Cyrus's very first year in charge.

👑 First year means his first year over Babylon
⚔️ Cyrus conquered Babylon in 539 BC
📚 Daniel had served in Babylon's court
📖 The exiles' future turned in that year

## That The Word Of The Lord By The Mouth Of Jeremiah Might Be Fulfilled

Jeremiah had prophesied decades earlier that the exile would last seventy years.

That prophecy is named directly here as the reason Cyrus's decree happened.

The seventy years counted from Judah's first deportations to this decree's release.

God had already announced the ending before anyone could see it coming.

A pagan king's decree was really the last page of a promise made long ago.

📜 Jeremiah foretold a seventy year exile
⏳ The seventy years ran out here
🗣️ God named the reason plainly
📖 A promise was kept before anyone noticed

## The Lord God Of Heaven Hath Given Me All The Kingdoms Of The Earth

This does not mean Cyrus had become a true worshiper of Israel's God.

Persian kings routinely credited their conquests to whatever god a local nation served.

An ancient artifact called the Cyrus Cylinder shows this same policy toward Babylon's own gods.

Cyrus was not converted to Israel's faith.

He was being strategic to keep conquered peoples loyal.

God can still speak true words through a king who does not know Him.

🏛️ This claim did not make Cyrus a believer
📜 Persian kings credited conquests to local gods
🗿 The Cyrus Cylinder confirms this same policy
📖 God can speak through an unbelieving king

## Whosoever Remaineth In Any Place Where He Sojourneth

To sojourn means to live somewhere temporarily, not to belong there permanently.

Many Jewish exiles had built full lives in Babylon over two generations.

Verse four assumes some of them will choose to stay instead of returning.

Those who stayed were expected to fund the ones who did go.

Freewill offerings, silver, gold, and even livestock were all included in that support.

Staying behind did not mean stepping away from the mission.

🏘️ Sojourn means living somewhere temporarily
👥 Many exiles had settled into Babylon
💰 Those who stayed funded those who left
📖 Staying behind still served the mission

# Ezra 1:5-6
# 🙌 Judah Rises To Go
---
## Rose Up The Chief Of The Fathers Of Judah And Benjamin

Judah and Benjamin were the two tribes that made up the southern kingdom.

The other ten tribes had been scattered by Assyria over a century earlier.

Those northern tribes never returned as identifiable groups the way Judah did.

The chiefs mentioned here were the heads of leading family lines within these two tribes.

The remnant that returned was far smaller than the nation had once been.

It was not gone.

🕎 Judah and Benjamin made the southern kingdom
🌪️ Assyria had scattered the other ten tribes
👴 Chiefs led their own family lines
📖 A smaller remnant was still not gone

## Whose Spirit God Had Raised

Not every exile in Babylon chose to return to Jerusalem.

This phrase singles out only the ones God stirred to actually go.

The same word used for Cyrus's stirred spirit back in verse one is used again here.

God moved a pagan king and His own people with the very same kind of nudge.

Willingness, not just opportunity, is what carried this remnant home.

🔥 Not every exile chose to return
🙌 God stirred specific hearts to go
🔁 The same word describes Cyrus in verse one
📖 Willingness carried this remnant home

## Strengthened Their Hands With Vessels Of Silver

Neighbors who stayed behind in Babylon helped equip those who were leaving.

This mirrors what happened when Israel left Egypt centuries earlier.

In Exodus, the Egyptians sent the Israelites away loaded with silver and gold.

Both departures show God providing for His people through the very nations that had held them.

Every exodus in Scripture ends with God's people leaving richer than they arrived.

🤝 Neighbors equipped those who were leaving
🏺 This mirrors Israel leaving Egypt
✨ Egyptians once sent Israel away with wealth
📖 God's people left richer than they came

# Ezra 1:7-11
# 🏺 The Temple Vessels Return
---
## Cyrus Brought Forth The Vessels Of The House Of The Lord

These vessels were the same sacred vessels Nebuchadnezzar had stolen when Jerusalem fell.

2 Chronicles ended with that theft.

Ezra opens with its reversal.

Cyrus did not only release the exiles.

He also returned what Babylon had taken.

The story that ended in loss was beginning to end in restoration.

🏺 These vessels were stolen by Nebuchadnezzar
📖 2 Chronicles ends where Ezra begins
👑 Cyrus returned what Babylon had taken
➡️ Loss was turning into restoration

## Numbered Them Unto Sheshbazzar The Prince Of Judah

Sheshbazzar was the official leader entrusted with this first return.

Many scholars believe he was Zerubbabel's uncle.

He would have been a surviving member of David's royal line.

Ezra 5:14 later calls him governor.

This was an official Persian appointment, not a casual errand.

A descendant of David's own family carried the temple treasures home.

👑 Sheshbazzar led this first return
🌳 Many think he was Zerubbabel's uncle
📜 Ezra 5:14 calls him governor
📖 David's own line carried the treasures home

## This Is The Number Of Them

A charger was a large shallow platter used for temple offerings and service.

Verses nine and ten list an itemized inventory of every vessel that came back.

Ancient reports often listed exact numbers to prove nothing had been lost or swapped.

This kind of list protected everyone involved from later accusations of theft.

Even a dry inventory here was evidence that the promise had been kept in full.

🍽️ A charger was a shallow temple platter
🔢 Verses nine and ten list every vessel
✅ Exact counts guarded against later accusations
📖 The inventory proved the promise was kept

## All These Did Sheshbazzar Bring Up With Them Of The Captivity

This verse closes the chapter by tallying everyone who made the journey home.

"Bring up" repeats the same phrase Cyrus used back in verse three.

The word "captivity" names exactly what this whole chapter is undoing.

Every vessel and every person listed here had once seemed lost for good.

Ezra 1 ends with a caravan of returning exiles, not a graveyard of hope.

🧾 This verse tallies everyone making the trip
🔁 Bring up repeats Cyrus's own words
⛓️ Captivity names what this chapter undoes
📖 Ezra 1 ends with return, not loss
`.trim();

export const EZRA_ONE_PERSONAL_SECTIONS = parseEzraOneRawNotes(EZRA_ONE_RAW_NOTES);
