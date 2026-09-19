export type PsalmsOneHundredTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyTwoRawNotes(rawText: string): PsalmsOneHundredTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+122:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 122 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+122:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+122:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 122 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 122,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 122:${startVerse}` : `Psalms 122:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 122 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_TWO_RAW_NOTES = `# Psalms 122:1-2
# 🚶 The Joy Of Going Up
---
## 🎵 I Was Glad When They Said Unto Me

The word they refers to fellow travelers announcing it was time to go.

This psalm is the third of fifteen Songs of Ascents.

Pilgrims sang these songs while walking up to Jerusalem for the yearly feasts.

Their simple invitation was enough to spark real joy before the trip even began.

🎵 Third of fifteen Songs of Ascents
🚶 Pilgrims sang while walking to Jerusalem
🗣️ They refers to fellow travelers
📖 An invitation alone sparked real joy

## 🏛️ Let Us Go Into The House Of The LORD

House of the LORD means the temple in Jerusalem, Israel's one central place of worship.

Every tribe traveled from scattered towns to this same single location.

The word us shows this invitation was shared, not private.

Traveling together mattered as much as the destination itself.

🏛️ House of the LORD means the temple
🗺️ Every tribe traveled to one place
🤝 Us shows this invitation was shared
➡️ Traveling together mattered as much as arriving

## 🦶 Our Feet Shall Stand Within Thy Gates, O Jerusalem

This verse marks the actual arrival, not just the plan to go.

Feet emphasizes the physical journey finally ending at the city gates.

Thy speaks directly to Jerusalem itself, as though the city could listen.

The psalm moves from gladness at the invitation to gladness at arrival.

🦶 Feet marks the journey's physical end
🚪 Gates were the city's entry point
🗣️ Thy addresses Jerusalem directly
📖 Anticipation gives way to real arrival

# Psalms 122:3-5
# 🏛️ A City Built For Unity And Justice
---
## 🧱 Jerusalem Is Builded As A City That Is Compact Together

Builded is an old form of the word built.

Compact together means tightly joined, with no gaps between buildings.

A city built this way was easier to defend behind its walls.

The tight construction pictures the unity of the tribes who gathered inside it.

🏗️ Builded is an old form of built
🧱 Compact together means tightly joined
🛡️ Tight building helped defend the city
➡️ Unity in stone reflects the tribes' unity

## 🧭 Whither The Tribes Go Up, The Tribes Of The LORD

Whither is an old word meaning to where.

The tribes refers to the twelve tribes descended from Jacob's sons.

Go up describes climbing toward Jerusalem, since the city sits on a hill.

The climb turned twelve separate tribes into one worshipping nation.

🧭 Whither means to where
👥 Tribes means the twelve tribes of Israel
⛰️ Go up describes climbing to the city
📖 The climb united twelve tribes as one

## 📜 Unto The Testimony Of Israel

Testimony here does not mean a personal story someone tells.

It refers to the covenant law God gave Israel at Sinai.

That law was kept inside the ark within the temple itself.

Traveling to Jerusalem meant renewing loyalty to that same covenant.

📜 Testimony means the covenant law itself
🏔️ It was first given at Sinai
📦 The law was kept inside the ark
➡️ The trip renewed loyalty to that covenant

## ⚖️ There Are Set Thrones Of Judgment, The Thrones Of The House Of David

Thrones of judgment means official seats where legal cases were decided.

Jerusalem functioned as the nation's highest court, not only its temple city.

The house of David names the ongoing royal line descended from King David.

Justice and worship both centered in this one city.

⚖️ Thrones of judgment means official court seats
🏙️ Jerusalem served as the nation's high court
👑 House of David names his royal line
📖 Justice and worship centered in one city

# Psalms 122:6-7
# 🕊️ Pray For The Peace Of Jerusalem
---
## 🕊️ Pray For The Peace Of Jerusalem

Peace here translates the Hebrew word shalom.

Shalom means far more than an absence of conflict.

It carries the idea of wholeness, safety, and genuine well being.

The city's very name carries the peace it is asked to have.

🕊️ Peace translates the Hebrew word shalom
🌿 Shalom means far more than no conflict
✨ It includes wholeness and real well being
📖 The city's name carries its own peace

## ❤️ They Shall Prosper That Love Thee

This promise is tied to loving the city, not merely living inside it.

Thee here addresses Jerusalem directly, continuing from the verse before.

Genuine love for God's people shows itself in wanting their good.

Prosperity follows love, not the other way around.

❤️ Prosper is promised to those who love
🏙️ Thee still addresses Jerusalem directly
🤲 Love shows itself in wanting their good
➡️ Love comes first, prosperity follows after

## 🧱 Peace Be Within Thy Walls, And Prosperity Within Thy Palaces

This blessing is meant to reach every social class in the city.

Walls protected every ordinary person living inside the city.

Palaces housed the king and the wealthiest households.

Naming both together shows peace was meant for everyone, not just the powerful.

🧱 Walls represent every ordinary resident
🏰 Palaces represent the king and wealthy
🌍 Peace was meant to reach everyone
📖 No one was left out of this blessing

# Psalms 122:8-9
# ❤️ Peace For Their Sakes
---
## 👥 For My Brethren And Companions' Sakes

Brethren here means fellow Israelites, not only blood relatives.

Companions refers to fellow pilgrims who made this same journey.

The psalmist's motive shifts from the city itself to the people inside it.

Blessing the city was really about blessing the people he loved.

👥 Brethren means fellow Israelites broadly
🚶 Companions means fellow pilgrims on the road
❤️ The motive shifts toward people, not stone
📖 Loving the city meant loving its people

## ⏳ I Will Now Say, Peace Be Within Thee

Now marks a personal decision, not a repeated formula.

Verse six was a general prayer offered on behalf of everyone.

This line makes that same prayer personal and immediate.

The psalmist commits himself to the blessing he asked others to pray.

⏳ Now marks a personal, immediate choice
🗣️ Verse six was a general communal prayer
🔁 This line makes it personal instead
📖 He commits to the blessing himself

## 🔁 Because Of The House Of The LORD Our God I Will Seek Thy Good

This verse returns to the same house of the LORD named in verse one.

That repetition forms an inclusio, framing the whole psalm with one phrase.

God's presence, not civic pride, is the psalmist's final reason for seeking Jerusalem's good.

The psalm that opened with gladness closes with a lasting commitment.

🔁 House of the LORD returns again
🖼️ Repetition frames the whole psalm
🙏 God's presence is the real reason
📖 Gladness becomes lasting commitment by the end
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_TWO_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyTwoRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_TWO_RAW_NOTES
);
