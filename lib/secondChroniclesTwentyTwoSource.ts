export type SecondChroniclesTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyTwoRawNotes(rawText: string): SecondChroniclesTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 22:${startVerse}` : `2 Chronicles 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Chronicles 22 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_TWO_RAW_NOTES = `# SecondChronicles 22:1-2
# 👑 Only One Son Left
---
## 👑 Made Ahaziah His Youngest Son King

Ahaziah was not next in line by age.

Every one of his older brothers had just been murdered.

The raiders in the previous chapter had already wiped out his rivals for the throne.

He became king only because no other son of Jehoram remained alive.

👑 Ahaziah was the youngest surviving son
💀 Older brothers were already dead
📜 Chapter twenty one describes their deaths
📖 One survivor filled an empty throne

## 💀 Had Slain All The Eldest

This phrase points back to the invasion at the very end of the previous chapter.

God had stirred up Philistine and Arabian raiders against wicked King Jehoram.

Those same raiders killed every one of Jehoram's older sons in the attack.

The judgment on one wicked king reached all the way into the next reign.

🎯 God stirred up those raiders earlier
🗺️ Philistines and Arabians carried out the raid
💀 They killed every older brother
📖 One king's judgment shaped the next reign

## 🔢 Forty And Two Years Old Was Ahaziah

This number creates a real problem in the text.

Ahaziah's own father Jehoram died at only forty years old.

A son cannot be older than the father he replaced.

Many scholars believe a copyist changed twenty and two into forty and two.

The parallel account in Second Kings chapter eight gives his age as twenty and two.

🔢 Forty and two creates a math problem
👴 His father died at only forty
📜 Kings records his age as twenty two
📖 A small copying slip likely crept in

## 📆 He Reigned One Year In Jerusalem

Ahaziah's entire reign lasted only one year.

That makes it one of the shortest reigns of any king of Judah.

Chronicles has just spent an entire chapter on his father's eight troubled years.

His own turn on the throne barely gets started before it ends.

📆 Only one year on the throne
⏳ One of Judah's shortest reigns
🔁 His father ruled eight years before him
📖 A short reign, a short chapter

## 👴 The Daughter Of Omri

Athaliah is named here as the daughter of Omri.

The previous chapter already called her the daughter of Ahab instead.

Omri was Ahab's own father, an earlier king of Israel.

Hebrew family language often used daughter loosely to mean a female descendant.

Athaliah was almost certainly Ahab's actual daughter and Omri's granddaughter.

Either title still ties her straight back to Israel's most idolatrous royal family.

👴 Omri was Ahab's own father
🔀 Daughter could mean a wider descendant
👰 She was likely Ahab's true daughter
📖 Either way, Ahab's family shaped her

# SecondChronicles 22:3-6
# ⚔️ Bad Counsel, Worse War
---
## 🗣️ His Mother Was His Counsellor To Do Wickedly

A counsellor was a trusted adviser a king relied on for decisions.

Most kings had many counsellors, both good and bad.

Athaliah made sure her own influence on her son pushed only one direction.

She used her position as queen mother to steer him toward evil on purpose.

🗣️ Counsellor means a trusted royal adviser
👑 Athaliah held that position over her son
🎯 Her advice pushed only one way
📖 A mother's influence shaped his sin

## 👴 They Were His Counsellors After The Death Of His Father

Once Jehoram died, Ahaziah lost the one voice that might have balanced Athaliah's.

They refers to relatives connected to Ahab's family who filled that gap.

The text says plainly that their advice led straight to his destruction.

Bad counsel is named here as the actual cause of what happens next in this chapter.

👴 His father's death removed a check
👪 Ahab's relatives filled the gap
⚠️ Their advice is named as his ruin
📖 Bad counsel caused his destruction

## 🗺️ To War Against Hazael King Of Syria

Ramothgilead was a border city fought over again and again between Israel and Syria.

Ahab himself, Jehoram's father, died fighting for this very city in an earlier war.

Hazael later becomes king of Syria after being anointed by the prophet Elisha.

That anointing was itself part of God's plan to judge Ahab's whole family.

Ahaziah walks straight into a battle tied to God's judgment on the house he married into.

🗺️ Ramothgilead was a repeated battleground
👴 Ahab died fighting for this city
🔮 Elisha anointed Hazael as a future king
📖 Ahaziah entered a battle tied to judgment

## 🔤 The Syrians Smote Joram

Joram and Jehoram are the same name, Joram is simply the shorter form.

This Joram is the king of Israel, Ahab's own son, not Ahaziah's father.

Judah's own king had also been named Jehoram, which the text just finished describing.

Two different kings shared the very same name at the very same time.

🔤 Joram is a shorter form of Jehoram
👑 This Joram ruled the northern kingdom
🔀 Judah had its own king named Jehoram
📖 Two kings, one shared name

## 🏙️ Returned To Be Healed In Jezreel

Jezreel was a royal city belonging to Ahab's own family.

Naboth's vineyard, the site of one of Ahab's worst sins, sat just outside it.

Jezebel herself would later die there exactly as Elijah had foretold.

Joram retreats to recover in a city already soaked in his family's judgment.

🏙️ Jezreel belonged to Ahab's family
🍇 Naboth's vineyard sat near this city
💀 Jezebel's judgment happened here too
📖 Joram heals in a city under judgment

## ❓ Azariah The Son Of Jehoram King Of Judah

This name is unexpected since Ahaziah was already named in verse one.

Azariah and Ahaziah both start with the same three Hebrew letters.

Many scholars believe this is simply another way of writing the very same name.

The man visiting Jezreel is almost certainly Ahaziah himself, not a different relative.

❓ A different name appears here suddenly
🔤 Azariah and Ahaziah share the same root
📜 Many scholars call this one name, two spellings
📖 The visitor is still Ahaziah

# SecondChronicles 22:7-9
# ⚖️ Jehu's Judgment Catches Up
---
## 🎯 The Destruction Of Ahaziah Was Of God

This visit looked like an ordinary act of family concern.

Scripture states plainly that God himself was behind the timing.

The trip to see a sick relative became the very trap that ended his life.

God can use an ordinary decision to carry out a judgment already announced.

🎯 God controlled the timing of this visit
🤝 It looked like simple family concern
🪤 The visit became a fatal trap
📖 God works even through ordinary choices

## 🛢️ Jehu The Son Of Nimshi, Whom The LORD Had Anointed

Jehu was anointed specifically to wipe out Ahab's entire dynasty.

That anointing came from Elisha, fulfilling a judgment God first announced through Elijah.

Ahab and Jezebel's sins against Naboth had set this judgment in motion years earlier.

Ahaziah's marriage ties to that family now placed him directly inside that judgment's path.

🛢️ Jehu was anointed to end Ahab's line
🔥 Elijah first announced this judgment
🍇 Naboth's murder set it all in motion
📖 Ahaziah's family ties pulled him in

## 👥 The Princes Of Judah, And The Sons Of The Brethren Of Ahaziah

These were officials and extended royal relatives who had traveled with Ahaziah.

They were not targets of Jehu's mission on their own.

They simply happened to be standing beside Ahab's family when judgment fell.

Being in the wrong company at the wrong moment cost them their lives.

👥 Judah's officials traveled with the king
👪 Extended relatives came along too
⚠️ Wrong company brought them into danger
📖 Judgment did not stop to sort them out

## 🏙️ He Was Hid In Samaria

Samaria was the capital city of the northern kingdom, Ahab's own family seat.

Ahaziah likely fled there hoping his mother's family could shelter him.

Instead he was hiding inside the very dynasty Jehu had come to destroy.

The safest place he could think of turned out to be the most dangerous one.

🏙️ Samaria was Ahab's own capital city
👪 He hoped family there would protect him
⚠️ That family was the one being destroyed
📖 His safest choice became his downfall

## ⚔️ Because He Is The Son Of Jehoshaphat

Jehu's men still kill Ahaziah, since he is tied to Ahab's family by marriage.

They still choose to bury him instead of leaving him exposed.

That small mercy comes only because of his grandfather Jehoshaphat's own faithful reputation.

A godly grandfather's legacy still reached forward into a grandson's disgraceful death.

⚔️ Jehu's men killed him anyway
🪦 They still gave him a burial
👴 Jehoshaphat's reputation earned that mercy
📖 A godly legacy still reached forward

## 🚪 The House Of Ahaziah Had No Power To Keep Still The Kingdom

This line closes the story of Ahaziah's own reign.

It also opens the door to the crisis in the very next verse.

With the king dead, no clear strong hand remained to hold the throne.

That gap in power is exactly what Athaliah moves to fill next.

🚪 This line closes Ahaziah's own story
🕳️ It leaves a real gap in power
👑 No strong hand remained to rule
📖 Athaliah moves to fill that gap

# SecondChronicles 22:10-12
# 🗡️ A Massacre And A Hidden King
---
## 👵 She Arose And Destroyed All The Seed Royal Of The House Of Judah

Athaliah is Ahaziah's own mother, and these victims are her own grandchildren.

Seed royal means every remaining member of David's royal bloodline.

She kills her own family to seize the throne entirely for herself.

Her own mother Jezebel had used violence this same way back in the northern kingdom.

👵 Athaliah killed her own grandchildren
👑 Seed royal means the whole bloodline
🎯 She wanted the throne for herself
📖 Jezebel's ruthlessness passed to her daughter

## 👸 Jehoshabeath, The Daughter Of The King

Jehoshabeath was a daughter of King Jehoram, making her Ahaziah's own sister.

She does not appear to share Athaliah's ruthless nature or her loyalty to Baal.

Her position inside the royal family gave her access no outsider could have had.

One woman's courage becomes the one thing standing between Athaliah and total success.

👸 Jehoshabeath was Ahaziah's own sister
👪 She was King Jehoram's daughter
🔑 Her royal access made the rescue possible
📖 One woman's courage changed everything

## 👶 Stole Him From Among The King's Sons That Were Slain

Jehoshabeath pulled the infant Joash out from the middle of the massacre itself.

This was not a quiet rescue planned ahead of time.

It happened in the chaos of the killing, at enormous personal risk.

One baby was smuggled out while his cousins were being murdered around him.

👶 Joash was pulled from the massacre
⏱️ The rescue happened in the moment
⚠️ Enormous risk was involved
📖 One child survived the slaughter

## ⛪ The Wife Of Jehoiada The Priest

Jehoiada was the high priest serving at the temple in Jerusalem.

Jehoshabeath's marriage to him connected the royal family directly to the priesthood.

That connection is exactly why the temple, the house of God, became a safe hiding place.

Jehoiada's role here sets up his much larger part in the very next chapter.

⛪ Jehoiada served as the high priest
💍 His marriage linked royalty and priesthood
🏠 That link made the temple safe
📖 Jehoiada's role grows in the next chapter

## 🏠 Hid Him In The House Of God Six Years

The house of God was the temple, the one place Athaliah's reach could not easily follow.

Six years is a long time for a secret this dangerous to hold.

Every one of those years, one hidden child was the only future king of David's line.

The previous chapter already promised David's lamp would never fully go out.

🏠 The temple hid the child safely
📆 Six years the secret held
🕯️ David's promised lamp barely survived
📖 One hidden child kept the promise alive

## 👑 Athaliah Reigned Over The Land

For the first and only time, someone outside David's bloodline sat on Judah's throne.

Athaliah brought her own family's Baal worship with her into power.

Every king before her had come from the line God promised to David.

That promise now rested entirely on one child hidden inside the temple.

👑 Athaliah broke David's unbroken line
🛐 She brought Baal worship with her
📜 Every earlier king came from David
📖 One hidden child now carried hope
`.trim();

export const SECOND_CHRONICLES_TWENTY_TWO_PERSONAL_SECTIONS = parseSecondChroniclesTwentyTwoRawNotes(SECOND_CHRONICLES_TWENTY_TWO_RAW_NOTES);
