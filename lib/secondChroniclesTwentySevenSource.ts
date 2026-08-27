export type SecondChroniclesTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentySevenRawNotes(rawText: string): SecondChroniclesTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 27:${startVerse}` : `2 Chronicles 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Chronicles 27 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_SEVEN_RAW_NOTES = `# SecondChronicles 27:1-2
# 👑 A King Who Learned From His Father's Fall
---
## 👑 Twenty And Five Years Old When He Began To Reign

Jotham was twenty five when he began to reign alone.

That is nine years older than Uzziah was at his own start.

Uzziah took the throne at sixteen right after his father was murdered.

Jotham's rise was calmer than that.

He had already been running the kingdom for years.

Uzziah lived apart as a leper during that time.

This new reign mostly made an existing arrangement official.

👑 Jotham begins to reign at twenty five

⏳ Uzziah started nine years younger

🩹 He already ran the kingdom for Uzziah

📖 This reign made it official

## 👩 His Mother's Name Also Was Jerushah, The Daughter Of Zadok

Naming the queen mother was standard at the start of a king's story.

Chronicles does this for nearly every king of Judah.

Jerushah's father was named Zadok.

This Zadok is not the famous priest who anointed Solomon generations earlier.

The text never claims any connection between them.

The detail simply grounds Jotham's family in a real, named household.

👩 Jerushah was Jotham's mother

📜 Naming the mother was standard practice

🙅 This Zadok is not the famous priest

📖 The detail grounds a real family

## 🔁 According To All That His Father Uzziah Did

This exact phrase was used about Uzziah too, describing his father Amaziah.

Chronicles repeats this line on purpose from king to king.

It measures each new king against the one before him.

Uzziah started well by that same measure and still ended in pride.

The phrase is praise, but it is not yet a guarantee.

Whether Jotham avoids that same ending is the real question this chapter answers.

🔁 This phrase repeats from king to king

📏 It measures Jotham against Uzziah

💔 Uzziah started well and still fell

➡️ Whether Jotham repeats that fall is the question

## 🚫 Howbeit He Entered Not Into The Temple Of The Lord

"Howbeit" is an old word that means however or but.

This one word draws a sharp line between Jotham and his father.

Uzziah walked into the temple himself to burn incense.

God struck him with leprosy for that exact act.

Jotham never made that same move.

One boundary he respected spared him that same disaster.

🚫 Howbeit means however or but

🔥 Uzziah once burned incense himself

🩹 That act cost him leprosy

➡️ Jotham respected the boundary his father broke

## 😔 And The People Did Yet Corruptly

A good king does not automatically produce a good nation.

"Corruptly" means the people kept worshipping in ways God had not approved.

Earlier chapters describe local high places used for that kind of worship.

Jotham's own choices did not undo that pattern.

One faithful leader was not enough to change everyone under him.

🗣️ Corruptly means improper worship

👥 Local high places were still used

😔 Jotham's faithfulness did not fix everyone

➡️ One king cannot change a whole nation

# SecondChronicles 27:3-6
# 🏗️ Walls, Towers, And Tribute
---
## 🚪 He Built The High Gate Of The House Of The Lord

The high gate was a specific entrance into the temple complex.

It appears again later in the book of Jeremiah.

Prophets writing generations later still knew this gate by name.

Building a temple gate was treated as a lasting legacy project.

Jotham invested in God's house early in his reign.

🚪 The high gate led into the temple

📜 Jeremiah later mentions this same gate

🏛️ Temple gates were lasting legacy projects

📖 Jotham invested in God's house early

## ⛰️ On The Wall Of Ophel He Built Much

Ophel was a narrow ridge just south of the temple mount.

The name likely comes from a word meaning a swelling or a raised hill.

Its walls connected the temple area to the rest of the city's defenses.

Later kings and even Nehemiah continue building on this same ridge.

Jotham's work here strengthened one of Jerusalem's most important connecting points.

⛰️ Ophel was a ridge below the temple

🧱 The name likely means a raised hill

🔗 It connected the temple to the city

📖 Jotham reinforced a key connecting point

## 🏘️ He Built Cities In The Mountains Of Judah

These were not brand new settlements built from nothing.

Most were existing towns that Jotham expanded, fortified, or resupplied.

The mountains of Judah refers to the hill country south of Jerusalem.

Strengthening these towns protected Judah's interior, not just its outer borders.

A kingdom is only as strong as the towns spread across it.

🏘️ These were existing towns, not new ones

🗺️ The mountains of Judah means the hill country

🛡️ Strengthening them protected Judah's interior

📖 A kingdom depends on more than its capital

## 🏰 In The Forests He Built Castles And Towers

"Castles" here does not mean medieval stone castles with moats.

The word describes fortified outposts and garrisoned strongholds.

Towers were built for lookout and defense, not decoration.

Judah had wooded hill country that needed its own protection.

These structures guarded that terrain from raiders and invading armies.

🏰 Castles means fortified outposts, not medieval castles

🗼 Towers were built for lookout duty

🌲 Judah's forests needed their own defense

📖 Every part of the land was protected

## ⚔️ He Fought Also With The King Of The Ammonites, And Prevailed Against Them

The Ammonites lived east of the Jordan River.

They were a longtime rival nation to Judah and Israel.

"Prevailed" means Jotham won this conflict decisively.

This was not Judah's first war with this neighbor.

A king this successful in battle earned respect across the region.

🗺️ Ammon sat east of the Jordan

⚔️ Prevailed means Jotham won decisively

🔁 Judah and Ammon had fought before

📖 Military success earned regional respect

## 💰 An Hundred Talents Of Silver, And Ten Thousand Measures Of Wheat, And Ten Thousand Of Barley

A talent of silver weighed about seventy five pounds.

A hundred talents of silver was an enormous sum of wealth.

A measure here likely refers to a cor, a large unit of dry volume.

Ten thousand measures each of wheat and barley could feed a nation for a season.

This was not a token gift.

It was crushing tribute forced by defeat.

💰 A talent weighed about seventy five pounds

🌾 A measure meant a cor, a huge amount

😰 This tribute was massive, not symbolic

📖 Ammon paid dearly for losing

## 🔁 So Much Did The Children Of Ammon Pay Unto Him, Both The Second Year, And The Third

This tribute did not stop after one payment.

Ammon paid the same massive amount for three straight years.

That pattern signals real, ongoing submission, not a single moment of defeat.

Judah gained a steady stream of wealth from a former enemy.

Jotham's military strength was paying for itself year after year.

🔁 Ammon paid this tribute three years

📉 Ongoing submission, not one payment

💵 Judah gained years of steady income

📖 His strength kept paying for itself

## 💪 So Jotham Became Mighty, Because He Prepared His Ways Before The Lord His God

This sentence is the same formula chapter twenty six used for Uzziah.

"Prepared his ways before the Lord" means he ordered his life around obeying God.

Chronicles ties strength directly to that kind of preparation, not luck or talent.

Uzziah followed this same pattern early, then abandoned it through pride.

This chapter never records Jotham repeating that fall.

The formula that started Uzziah's story ends Jotham's on a steadier note.

🔁 This formula also described Uzziah

🧭 Prepared his ways means he obeyed God

💪 Chronicles ties strength to that obedience

📖 Jotham never repeated Uzziah's fall

# SecondChronicles 27:7-9
# ⚰️ A Reign Recorded, A Warning Passed On
---
## 📚 They Are Written In The Book Of The Kings Of Israel And Judah

Chronicles repeats this exact kind of citation for nearly every king.

The book of the kings of Israel and Judah was a real royal record.

That record has not survived to modern times.

Chronicles itself was written using sources like this one.

The Bible openly points to a source outside itself here.

📚 This citation formula repeats for many kings

📜 It names a real, lost royal record

🕵️ That record has not survived

📖 Chronicles used sources like this one

## 🔁 He Was Five And Twenty Years Old When He Began To Reign, And Reigned Sixteen Years

This is the exact same detail already given back in verse one.

Chronicles often repeats a king's opening stats right before closing his story.

This creates a frame around everything told about that king.

The repetition is not a mistake or a copying error.

It signals that Jotham's reign summary is now complete.

🔁 This repeats verse one on purpose

📐 Chronicles often frames a reign this way

🚫 It is not a copying mistake

📖 It signals the reign summary is done

## 😴 Jotham Slept With His Fathers

"Slept with his fathers" is a common Bible way of saying someone died.

It pictures death as a peaceful rest, joining ancestors who died before.

This phrase is reserved for kings who died of natural causes.

Jotham's own father Uzziah also gets this same phrase.

His grandfather Amaziah does not, because Amaziah was assassinated.

😴 Slept with his fathers means died peacefully

🕊️ It pictures death as joining ancestors

✅ It is reserved for natural deaths

📖 Amaziah does not get this phrase

## 🏙️ They Buried Him In The City Of David

The city of David was the oldest, original part of Jerusalem.

Kings of Judah were normally buried there in a family tomb.

Uzziah, Jotham's own father, did not get that full honor.

His leprosy kept him buried nearby but not inside the royal tombs.

Jotham was never sick that way.

He received the full royal burial his father missed.

🏙️ City of David was Jerusalem's oldest section

👑 Kings were normally buried there together

🩹 Uzziah missed that full honor

📖 Jotham received the burial his father lost

## ➡️ Ahaz His Son Reigned In His Stead

"In his stead" means Ahaz took over in his father's place.

Ahaz becomes one of the worst kings in the entire book of Chronicles.

He will close the temple doors and lead Judah into open idolatry.

The steady, faithful reign of Jotham ends right here.

The very next chapter turns in an entirely different direction.

👑 In his stead means took his place

💔 Ahaz becomes one of Judah's worst kings

🚪 He later shuts the temple doors

➡️ The next chapter turns sharply worse
`.trim();

export const SECOND_CHRONICLES_TWENTY_SEVEN_PERSONAL_SECTIONS = parseSecondChroniclesTwentySevenRawNotes(
  SECOND_CHRONICLES_TWENTY_SEVEN_RAW_NOTES,
);
