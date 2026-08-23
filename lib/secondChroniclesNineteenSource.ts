export type SecondChroniclesNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesNineteenRawNotes(rawText: string): SecondChroniclesNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 19:${startVerse}` : `2 Chronicles 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Chronicles 19 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_NINETEEN_RAW_NOTES = `# SecondChronicles 19:1-3
# ⚖️ Jehu Confronts The King
---
## 🛡️ Returned To His House In Peace

"In peace" is not a throwaway detail here.

Chapter eighteen just showed Jehoshaphat disguised and nearly killed by mistake at Ramoth Gilead.

He walked straight into that danger by allying with wicked King Ahab.

Coming home alive at all was a close call, not a routine trip.

🛡️ Jehoshaphat barely survived the battle

⚔️ Chapter eighteen showed the near fatal mistake

🤝 That danger came from allying with Ahab

📖 Peace here means a narrow escape

## 👤 Shouldest Thou Help The Ungodly

Jehu here is a prophet, not the later king of Israel who shares his name.

He is the son of Hanani, the seer who once rebuked King Asa back in chapter sixteen.

His question is not really a question.

It is an accusation that Jehoshaphat should never have joined Ahab in that war.

👤 Jehu here is a prophet, not a king

📜 His father Hanani rebuked Asa earlier

❓ The question is really an accusation

📖 Jehoshaphat should not have joined Ahab

## ⚡ Wrath Upon Thee From Before The LORD

Alliances have consequences even when they seem to work out fine.

Jehoshaphat survived the battle, but the choice to ally with Ahab still angered God.

Surviving something is not the same as being approved for it.

That same wrath resurfaces a few chapters later.

Jehoshaphat's next alliance, this time with wicked King Ahaziah, ends in disaster.

⚡ Surviving is not the same as approval

🤝 The alliance with Ahab caused this anger

⏳ The consequence surfaces again later

📖 Wrong partnerships carry a real cost

## 🌳 Taken Away The Groves Out Of The Land

"Groves" here does not mean ordinary trees.

It refers to Asherah poles, wooden objects set up for worship of a false goddess.

Jehoshaphat had already torn these down earlier in his reign.

Removing them was a direct rejection of the false worship his own father once tolerated.

🌳 Groves means Asherah worship poles

🪓 Jehoshaphat had already removed them

👴 His father allowed things he now rejects

📖 One right choice still gets named here

## 🧭 Prepared Thine Heart To Seek God

"Prepared thine heart" is an old way of describing a settled, deliberate decision.

It does not mean a passing good feeling.

Jehoshaphat had actually organized his life and his choices around seeking God.

That steady commitment is what balances out the rebuke he just received.

🧭 Prepared heart means a settled decision

🚫 Not just a passing feeling

🙏 Jehoshaphat organized his life around God

📖 Real devotion balances the rebuke
# SecondChronicles 19:4-7
# 👨‍⚖️ Jehoshaphat Reforms The Judges
---
## 🗺️ From Beersheba To Mount Ephraim

Beersheba sits at the far southern edge of Judah's own territory.

Mount Ephraim sits well to the north, inside land that once belonged to all twelve tribes together.

Naming both places together is a way of saying Jehoshaphat traveled the entire length of his reach.

This was not a short trip to one nearby town.

🗺️ Beersheba marks the southern edge

⛰️ Mount Ephraim marks the northern edge

🚶 Together they cover his whole reach

📖 This was a full reform tour

## 🙏 Brought Them Back Unto The LORD God Of Their Fathers

Jehoshaphat was not just inspecting the kingdom on this trip.

He was actively calling people back to a faith they had drifted from.

"The LORD God of their fathers" points back to the promise made to Abraham, Isaac, and Jacob.

This was a reform mission, not a routine royal visit.

🙏 Jehoshaphat called people back to God

📜 Their fathers points to the old promise

🚶 This was a reform mission

📖 Not a routine royal visit

## 🧱 Throughout All The Fenced Cities

"Fenced cities" means towns protected by defensive walls.

These were the larger, established towns spread across Judah, not scattered farms.

Jehoshaphat placed a local judge in each one of them.

This decentralized justice so people did not have to travel far for a fair ruling.

🧱 Fenced cities means walled towns

🏘️ These were Judah's larger towns

👨‍⚖️ Each city received its own judge

📖 Justice became available close to home

## ⚖️ Ye Judge Not For Man, But For The LORD

This is the exact reason the judges were warned to take heed.

A human court decision can feel like the final word on a matter.

God says otherwise here.

Every ruling made in His name is really made on His behalf, not the judge's own.

⚖️ Judges act on God's behalf

👤 Not simply serving human authority

🗣️ Rulings carry God's own name

📖 Every verdict answers to Him first

## 💰 No Respect Of Persons, Nor Taking Of Gifts

"Respect of persons" means judging someone by status instead of the facts.

"Taking of gifts" means accepting a bribe to sway a decision.

A rich man and a poor man were expected to receive the exact same fair hearing.

Naming both dangers out loud shows they were real and tempting, not just hypothetical.

💰 Respect of persons means favoritism

💵 Taking of gifts means accepting bribes

🙅 Every person deserved equal treatment

📖 Honest judgment could not be bought
# SecondChronicles 19:8-11
# 🏛️ The Two Courts Of Jerusalem
---
## 🏛️ Levites, And Of The Priests, And Of The Chief Of The Fathers

This new court in Jerusalem was different from the city judges just described.

It combined Levites, priests, and family leaders together into one central panel.

Judah now had two levels of justice, local courts in each city and one high court in the capital.

Difficult cases could be sent up to Jerusalem for a final decision.

🏛️ This court sat in Jerusalem

👥 Levites, priests, and leaders served together

🧱 Local courts still handled city cases

📖 Hard cases could rise to this court

## ❤️ With A Perfect Heart

"A perfect heart" does not mean a sinless or flawless heart.

It means wholehearted and undivided, fully committed rather than half interested.

Jehoshaphat wanted judges who genuinely cared about justice, not just the appearance of doing their job.

❤️ Perfect heart means fully committed

🚫 Not the same as sinless

👨‍⚖️ Judges needed real devotion, not appearance

📖 God wants wholehearted service

## 🩸 Between Blood And Blood

"Between blood and blood" refers to cases involving bloodshed, most likely murder or manslaughter.

These were the most serious cases a judge could ever face.

Pairing that with law, commandment, statutes, and judgments shows the judges handled everything from capital crimes down to smaller disputes.

🩸 Blood and blood means bloodshed cases

⚖️ These were the most serious crimes

📜 Statutes and judgments cover smaller disputes

📖 Judges handled the full range of cases

## 👥 Amariah The Chief Priest Is Over You

Amariah the chief priest led decisions about matters of the LORD, meaning worship and religious cases.

Zebadiah, a leader from the tribe of Judah, led decisions about the king's matters, meaning civil and political cases.

Splitting leadership this way kept religious and royal authority working side by side.

Neither office was allowed to swallow up the other.

🙏 Amariah led religious matters

🏛️ Zebadiah led civil matters

🤝 Two leaders shared the responsibility

📖 Faith and government stayed balanced

## 💪 Deal Courageously, And The LORD Shall Be With The Good

This is Jehoshaphat's final charge to every judge he just appointed.

Doing what is right will not always be easy or popular.

The promise attached to that courage is God's own presence with anyone who does good.

Justice, in the end, was never meant to rest on human courage alone.

💪 Deal courageously means do not back down

😬 Right choices are not always easy

🙌 God stands with those who do good

📖 Justice rests on God, not willpower
`.trim();

export const SECOND_CHRONICLES_NINETEEN_PERSONAL_SECTIONS = parseSecondChroniclesNineteenRawNotes(SECOND_CHRONICLES_NINETEEN_RAW_NOTES);
