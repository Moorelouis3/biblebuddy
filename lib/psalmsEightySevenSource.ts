export type PsalmsEightySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightySevenRawNotes(rawText: string): PsalmsEightySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+87:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 87 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+87:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+87:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 87 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 87,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 87:${startVerse}` : `Psalms 87:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 87 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_SEVEN_RAW_NOTES = `# Psalms 87:1-3
# 🏔️ God's Foundation In Zion
---
## 🏔️ His Foundation Is In The Holy Mountains

"Foundation" here means the very base God built the city on.

Jerusalem sits on real mountains, especially Mount Zion and Mount Moriah.

"Holy" marks those mountains as set apart, not ordinary ground.

The psalm opens by saying God himself chose this exact place.

🏔️ Foundation means the city's very base

⛰️ Zion and Moriah are the holy mountains

✨ Holy means set apart, not ordinary

📖 God chose this exact place on purpose

## 🚪 The LORD Loveth The Gates Of Zion

"Gates" here stands for the entire city of Zion.

City gates were where leaders judged cases and news arrived.

Naming the gates is a way of naming the whole place.

God's love singles out this one city above the rest.

🚪 Gates stands for the whole city

⚖️ Gates were where leaders judged and met

🏙️ Naming the gates means naming Zion itself

📖 God singles out this city with his love

## 👤 More Than All The Dwellings Of Jacob

"Jacob" here refers to the whole nation of Israel.

"Dwellings of Jacob" means every other town where Israelites lived.

Those other towns were not unloved or forgotten by God.

Zion still holds first place above every one of them.

👤 Jacob here means the whole nation

🏘️ Dwellings of Jacob means Israel's other towns

❤️ Those towns were not unloved by God

📖 Zion still ranks first among them all

## 🏆 Glorious Things Are Spoken Of Thee

"Glorious things" means many specific praises spoken about this city.

Other psalms and prophets add their own praises of Jerusalem too.

The glory belongs to God, not to stone walls or buildings.

Zion is famous because the God who lives there is famous.

🏆 Glorious things means many specific praises

📜 Other scripture praises Jerusalem too

🧱 The glory belongs to God, not stone

📖 Zion is famous because God is famous

## ⏸️ Selah

"Selah" appears often in the Psalms at a natural pause point.

No one today knows its exact meaning with full certainty.

Many scholars believe it signaled a musical interlude or a pause to reflect.

The word invites the reader to stop and let the line sink in.

⏸️ Selah marks a pause in the psalm

❓ Its exact meaning is not fully known

🎵 It may signal a musical interlude

📖 It invites the reader to stop and reflect

# Psalms 87:4-6
# 🌍 Foreign Nations Counted As Zion's Own
---
## 🏺 I Will Make Mention Of Rahab And Babylon

"Rahab" here is a poetic name used for Egypt, not the woman from Jericho.

Babylon was another great and powerful empire far to the east.

God himself is the one speaking in this verse.

He is about to name nations who were once Israel's enemies.

🏺 Rahab here is a nickname for Egypt

🏛️ Babylon was a great eastern power

🗣️ God himself speaks this verse

📖 He is about to name former enemies

## 🙌 To Them That Know Me

"Them that know me" means people who acknowledge and worship the true God.

This phrase is not limited to Israelites by birth.

It reaches anyone from any nation who turns to him.

God's family already appears wider than one single bloodline here.

🙌 Them that know me means true worshippers

🌐 It is not limited to Israelites by birth

🤝 Anyone from any nation can belong

📖 God's family reaches wider than one bloodline

## ⚔️ Behold Philistia, And Tyre, With Ethiopia

Philistia was Israel's frequent enemy along the western coast.

Tyre was a wealthy trading city to the north, in Phoenicia.

Ethiopia, also called Cush, lay far away to the south.

Together these nations point toward every direction on the map.

⚔️ Philistia was Israel's frequent western enemy

⛵ Tyre was a wealthy trading city

🏝️ Ethiopia lay far to the south

📖 These nations point in every direction

## 🚫 This Man Was Born There

This does not mean these foreigners were physically born inside Zion.

It is a formal way of counting someone as a citizen.

Being "born" in Zion here means belonging to God's own people.

A person's birth nation no longer decides who truly belongs to God.

🚫 Not a claim of physical birth in Zion

📋 It means being counted as a citizen

🏙️ Born in Zion means belonging to God

📖 Birth nation no longer decides who belongs

## 👑 The Highest Himself Shall Establish Her

"The highest" is a title for God, meaning the one above all others.

"Establish" means to make something permanent and secure.

God himself, not an army or a king, guarantees Zion's future.

Her lasting strength rests entirely on who holds her up.

👑 The highest is a title for God

🏗️ Establish means made permanent and secure

🛡️ God himself guarantees Zion's future

📖 Her strength rests on who holds her

## 📝 The LORD Shall Count, When He Writeth Up The People

This pictures God keeping an official written record of his people.

Think of a census that lists every citizen of a nation by name.

In that record, God adds names from Egypt, Babylon, and beyond.

The word "Selah" returns here, asking the reader to pause once more.

📝 God keeps a written record of his people

🧾 Think of a census listing every citizen

🌍 He adds names from foreign nations too

📖 Selah returns, asking for another pause

# Psalms 87:7
# 🎶 All My Springs Are In Thee
---
## 🎤 As Well The Singers As The Players On Instruments

This pictures a joyful scene of worship happening at Zion.

"Singers" and "players on instruments" cover both voice and music.

Temple worship regularly combined choirs with harps, cymbals, and trumpets.

The whole city celebrates together, not one quiet worshipper alone.

🎤 Singers and musicians both take part

🎶 Both voice and instruments are pictured here

🏛️ Temple worship combined choirs and instruments

📖 The whole city celebrates together

## 💧 All My Springs Are In Thee

"Springs" were the natural water source every ancient city depended on.

Without one, a city could not survive for long.

The psalmist says every source of his life comes from Zion.

Everything that sustains and refreshes him is found in God's presence there.

💧 Springs were the water source a city needed

🏙️ Without one, a city could not survive

🙌 The psalmist's whole life flows from Zion

📖 Every refreshment he has comes from God's presence
`.trim();

export const PSALMS_EIGHTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsEightySevenRawNotes(PSALMS_EIGHTY_SEVEN_RAW_NOTES);
