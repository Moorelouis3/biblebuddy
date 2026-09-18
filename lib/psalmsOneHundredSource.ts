export type PsalmsOneHundredPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredRawNotes(rawText: string): PsalmsOneHundredPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+100:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 100 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+100:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+100:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 100 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 100,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 100:${startVerse}` : `Psalms 100:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 100 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_RAW_NOTES = `# Psalms 100:1-2
# 📣 A Joyful Noise To All The Earth
---
## 📣 Make A Joyful Noise

"Joyful noise" names a specific act of loud worship.

It is not shouting for no reason.

The same phrase shows up again in Psalms 95 through 98.

It describes loud, unrestrained praise directed straight at God.

Quiet reverence is not the only right way to worship him.

Sometimes worship is meant to be loud enough for everyone nearby to hear.

📣 Joyful noise means loud praise
🔁 The phrase repeats through Psalms 95 to 98
🙌 Loud worship is not disrespectful
📖 Worship can be loud and joyful

## 🌍 All Ye Lands

"All ye lands" does not mean just the nation of Israel.

It calls every nation on earth to worship the LORD.

Earlier psalms like Psalm 96 already made this same wide invitation.

This psalm is not written for one people only.

It expects the whole world to eventually recognize God as king.

🌍 All ye lands means every nation
🚫 Not addressed to Israel alone
🔁 Same wide call as Psalm 96
📖 God's worship reaches beyond one nation

## 😊 Serve The LORD With Gladness

"Serve" means offering worship freely, not forced labor.

It describes worship given the way a subject serves a king he loves.

"Gladness" names the emotion that should come with that service.

Worship commanded here is not a heavy duty to endure.

It is meant to feel like genuine joy, not obligation.

😊 Serve here means willing worship
🚫 Not forced labor or slavery
👑 Like a subject serving a loved king
📖 Worship is joy, not a burden

## 🎶 Come Before His Presence With Singing

Approaching a king's presence in the ancient world required ceremony and care.

Common people did not simply walk up to a throne uninvited.

This verse pictures worshipers approaching God the same formal way.

Singing is the specific form that approach takes here.

Music turns a formal approach into a joyful one.

🎶 Singing was the form of approach
👑 Approaching a king normally required ceremony
🚪 Worshipers approach God's presence directly
📖 Formal approach becomes joyful through song

# Psalms 100:3
# 🐑 Whose People We Are
---
## 🙏 Know Ye That The LORD He Is God

This line commands a settled conviction, not a passing feeling.

"Know" means being fully convinced, not just guessing or hoping.

The whole psalm rests on this one fact being true.

Everything commanded before this verse only makes sense because God really is God.

Worship without this conviction would just be empty routine.

🙏 Know means full conviction
🏛️ This fact anchors the whole psalm
🚫 Not a guess or a hope
📖 True worship rests on this truth

## 🙌 And Not We Ourselves

This line answers a question nobody asked out loud, who made us.

It is easy for a nation to start crediting its own strength for its blessings.

This verse cuts that idea off directly.

Israel did not create itself, its land, or its identity.

God alone is credited as the maker of his people.

🙌 Answers who really made us
🚫 Not our own strength or effort
🏛️ Israel did not create itself
📖 God alone gets the credit

## 🐑 The Sheep Of His Pasture

Sheep depend completely on a shepherd for food, safety, and direction.

Calling Israel sheep describes total dependence on God, not weakness.

"Pasture" is the shepherd's own land where the sheep are kept and fed.

This same picture appears earlier in Psalm 95.

Belonging to God's pasture means being cared for, not left to wander alone.

🐑 Sheep depend on a shepherd fully
🌾 Pasture is the shepherd's own land
🔁 Same image used in Psalm 95
📖 God's people are cared for, not abandoned

# Psalms 100:4-5
# 🚪 Thanksgiving At His Gates
---
## 🚪 Enter Into His Gates With Thanksgiving

"Gates" and "courts" describe two different areas of the ancient temple.

The gates were the outer entrance any worshiper could pass through.

The courts sat further inside, closer to where sacrifices and worship happened.

This verse pictures a worshiper moving inward, gate first, still giving thanks.

Coming to God is described here as a real physical journey, not just a feeling.

🚪 Gates were the temple's outer entrance
🏛️ Courts sat further inside the temple
🚶 The verse pictures moving inward in worship
📖 Coming to God was a real journey

## 🙏 Bless His Name

"Bless" here does not mean God needs anything added to him.

It means speaking well of him and honoring who he is out loud.

"His name" stands for his whole character and reputation, not just a label.

Blessing God is simply praise put into words.

The command moves from feeling thankful to actually saying it.

🙏 Bless means speaking well of him
🏷️ His name stands for his character
🗣️ Blessing turns feeling into words
📖 Thankfulness is meant to be spoken

## 💞 His Mercy Is Everlasting

"Mercy" here translates a Hebrew word about loyal, covenant love.

It describes a commitment that keeps showing up even when it is not earned.

"Everlasting" means this loyalty never runs out or expires.

The psalm gives a reason for all its earlier commands right here.

God's people are asked to praise him because his love toward them never stops.

💞 Mercy means loyal covenant love
🔁 Everlasting means it never runs out
🎁 Not something Israel had to earn
📖 God's unstoppable love is the reason for praise

## 📜 His Truth Endureth To All Generations

"Truth" here means faithfulness, God keeping his word over time.

"Endureth" means it continues without weakening or fading away.

One generation can trust the same promises the last generation trusted.

Nothing in this psalm depends on God changing his mind later.

The psalm ends by anchoring worship in something that never runs out.

📜 Truth means faithfulness to his word
⏳ Endureth means it never fades
👪 Each generation inherits the same promise
📖 Worship rests on a faithfulness that never ends
`.trim();

export const PSALMS_ONE_HUNDRED_PERSONAL_SECTIONS = parsePsalmsOneHundredRawNotes(PSALMS_ONE_HUNDRED_RAW_NOTES);
