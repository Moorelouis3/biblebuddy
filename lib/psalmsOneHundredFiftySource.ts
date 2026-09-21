export type PsalmsOneHundredFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFiftyRawNotes(rawText: string): PsalmsOneHundredFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+150:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 150 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+150:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+150:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 150 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 150,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 150:${startVerse}` : `Psalms 150:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 150 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FIFTY_RAW_NOTES = `# Psalms 150:1-3
# 🎺 Praise Him Everywhere, With Everything
---
## 🎉 Praise Ye The LORD

"Praise ye the LORD" translates the Hebrew word hallelujah.

This exact phrase opens Psalm 150.

It is also the very last psalm in the whole book of Psalms.

The last word of the entire Psalter is a command to praise.

🎉 Hallelujah means praise ye the LORD
📜 This phrase also opens the psalm
🔚 This is the Bible's very last psalm
📖 The whole Psalter ends on praise

## 🏛️ Praise God In His Sanctuary

"Sanctuary" here means the temple in Jerusalem.

This was the earthly place where God's presence dwelt among his people.

It was the center of Israel's public worship.

The next phrase moves from this earthly sanctuary out to the heavens themselves.

🏛️ Sanctuary means the Jerusalem temple
🙏 Israel worshipped publicly at this place
🌌 The next line moves toward heaven
📖 Praise starts where God's presence dwelt

## 🌌 In The Firmament Of His Power

"Firmament" is the same word used for the sky in the creation story.

It describes the vast sky stretched out above the earth.

This pairs the earthly sanctuary with the heavens above it.

No single place limits where God can be praised.

🌌 Firmament means the sky above
🏗️ The word also appears in creation
🌍 Sanctuary and heaven are paired here
📖 No place limits where God is praised

## 💪 For His Mighty Acts

"Mighty acts" points to specific things God has done in history.

This includes rescuing Israel out of Egypt.

It also includes parting the Red Sea for Israel to escape through.

Praise here is grounded in real history.

The next phrase turns from what God has done to who God is.

💪 Mighty acts means specific historical deeds
🏃 It includes rescuing Israel from Egypt
🌊 It also includes parting the Red Sea
➡️ The next line turns to who God is

## 👑 According To His Excellent Greatness

"Excellent greatness" does not describe one more thing God did.

It describes the size and weight of who God simply is.

The line before this one praised God's actions.

This line praises God's very nature instead.

👑 Excellent greatness describes who God is
⚖️ It differs from a single action
🔀 The psalm now praises God's nature
📖 Both God's deeds and being deserve praise

## 📯 With The Sound Of The Trumpet

This trumpet was a shofar, a horn made from a ram's horn.

It was blown to call Israel together or to announce a battle.

It also marked Israel's holy days and the start of a new month.

Praise here opens with a sound once used to summon the whole nation.

📯 Trumpet means a ram's horn shofar
📢 It called Israel together or to battle
🗓️ It also marked Israel's holy days
📖 Praise opens with a sound that summons everyone

## 🎻 With The Psaltery And Harp

A "psaltery" was a stringed instrument played by plucking with the fingers.

It was similar to a small harp.

The harp itself was closely tied to David throughout the psalms.

Levites played both instruments as part of temple worship.

🎻 Psaltery means a small plucked instrument
🎶 It was similar to a harp
🎵 The harp was closely tied to David
📖 Levites played both in temple worship

# Psalms 150:4-6
# 🌍 Every Instrument, Every Living Thing
---
## 🥁 With The Timbrel And Dance

A "timbrel" was a small hand held drum, similar to a tambourine.

It was usually played by women and paired with dancing as worship.

Miriam played this same instrument after Israel crossed the Red Sea.

Worship here uses the whole body, not just the voice.

🥁 Timbrel means a small hand held drum
💃 It was usually played by women
🌊 Miriam used it after the Red Sea
📖 Worship here uses the whole body

## 🎋 With Stringed Instruments And Organs

"Organs" here does not mean the large keyboard instrument in a modern church.

It translates a Hebrew word for a simple wind instrument, closer to a pipe.

Paired with stringed instruments, this line covers two whole families of instruments.

Almost every kind of instrument Israel owned appears somewhere in this psalm.

🎹 Organs does not mean a keyboard
🎋 It means a simple wind instrument
🎻 This line pairs strings with wind instruments
📖 Nearly every instrument Israel had appears here

## 🥏 Upon The Loud Cymbals

These were likely small cymbals, clapped together for a sharp beat.

The Hebrew word behind "loud" points to a crashing, percussive sound.

This same kind of instrument kept rhythm for the dancing and singing already named.

Praise here carries a beat, not only a melody.

🥏 Loud cymbals were small and clapped together
💥 The word points to a crashing sound
🕺 They kept rhythm for dancing and singing
📖 Praise here carries a beat too

## 🔔 Upon The High Sounding Cymbals

Hebrew poetry often repeats one idea using two different words.

Many scholars believe this line describes a larger, more resonant cymbal.

Naming two kinds of cymbals stacks up every possible sound of praise.

By this point in the psalm, no instrument has been left out.

🔁 Hebrew poetry often repeats an idea
🔔 This cymbal was likely larger and resonant
🎼 Two kinds of cymbals stack every sound
📖 By now no instrument is left out

## 🌍 Let Every Thing That Hath Breath Praise The LORD

Every earlier verse in this psalm named an instrument or a place.

This verse suddenly names every living creature instead.

The call to praise widens from Israel's temple to every breathing thing on earth.

The psalm then closes with the exact words that opened it.

Those same words also close the entire book of Psalms.

🌍 Every thing that hath breath means all creatures
📈 The call widens from temple to all creation
🔁 The psalm closes with its own opening words
📖 Those words also close the whole Psalter
`.trim();

export const PSALMS_ONE_HUNDRED_FIFTY_PERSONAL_SECTIONS = parsePsalmsOneHundredFiftyRawNotes(
  PSALMS_ONE_HUNDRED_FIFTY_RAW_NOTES,
);
