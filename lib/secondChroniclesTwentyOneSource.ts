export type SecondChroniclesTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyOneRawNotes(rawText: string): SecondChroniclesTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 21:${startVerse}` : `2 Chronicles 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 21 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_ONE_RAW_NOTES = `# SecondChronicles 21:1-4
# 🗡️ A Bloody Start To The Throne
---
## 😴 Slept With His Fathers

"Slept with his fathers" is a common way the Bible describes a king dying.

It does not mean a peaceful nap.

It means Jehoshaphat died and joined the long line of kings before him.

This same phrase marks the death of nearly every king in Kings and Chronicles.

A shared phrase for death tied every king to the same royal line.

😴 Sleeping with fathers means dying
👑 Used for nearly every king
📜 Marks Jehoshaphat's place in that line
📖 Death did not erase his legacy

## 🏙️ Buried With His Fathers In The City Of David

The city of David was the oldest part of Jerusalem, the hill David first captured.

Kings of Judah were regularly buried there, inside the royal family tomb.

Being buried among his fathers meant Jehoshaphat received full royal honor at his death.

That honor becomes important later in this same chapter, when one king does not receive it.

🏙️ City of David is Jerusalem's oldest hill
👑 Kings of Judah were buried there
🪦 Jehoshaphat received full royal honor
➡️ That honor is withheld later in this chapter

## 👪 Azariah, And Jehiel, And Zechariah, And Azariah, And Michael, And Shephatiah

These six men were Jehoram's own brothers, all sons of Jehoshaphat.

Two of them share the exact same name, Azariah.

Repeated names were common in large royal families in the ancient world.

Every name here belongs to a son who will not survive this chapter.

👪 All six were Jehoram's brothers
🔁 Two brothers were both named Azariah
👑 Repeated names were common then
➡️ None of these brothers survive the chapter

## 💰 Great Gifts Of Silver, And Of Gold, And Of Precious Things, With Fenced Cities In Judah

Jehoshaphat gave each younger son real wealth and land before he died.

"Fenced cities" means walled, fortified towns built for defense.

Giving each brother a city provided for sons who would not inherit the throne.

This generosity was meant to keep the family secure after their father was gone.

💰 Silver, gold, and valuables for each son
🏰 Fenced cities means walled, defended towns
👪 Provided for sons who would not rule
📖 Meant to keep the family secure

## 👑 The Kingdom Gave He To Jehoram, Because He Was The Firstborn

Only the throne itself went to Jehoram, the oldest son.

Passing the kingdom to the firstborn was the normal practice in Judah.

Jehoshaphat followed that custom even though it left five brothers with land but no crown.

That single decision is what Jehoram moves to protect in the very next verse.

👑 The throne went to the firstborn son
📜 Firstborn inheritance was the normal custom
👪 Five brothers received land, not the crown
➡️ Jehoram acts to protect this decision next

## 🗡️ He Strengthened Himself, And Slew All His Brethren With The Sword

Jehoram did not wait for a rival to rise up against him.

He killed every one of his own brothers to remove any threat to his throne.

The text adds that he also killed some of Judah's officials along with them.

"Strengthened himself" sounds like security, but here it describes murder used as a power move.

A throne secured by killing family was never real strength.

🗡️ Jehoram killed all his own brothers
👑 Removed every possible rival to the throne
⚠️ Some of Judah's officials died too
📖 Killing for power is not real strength

# SecondChronicles 21:5-7
# 👑 A King Like Ahab's House
---
## 🎂 Jehoram Was Thirty And Two Years Old When He Began To Reign

Chronicles regularly records a king's age at the start of his reign.

Jehoram took the throne already a grown man, thirty two years old.

He then ruled for eight years in Jerusalem before his death.

These details anchor the story in real, datable history rather than legend.

🎂 Jehoram began ruling at thirty two
📅 He reigned eight years in Jerusalem
📜 Chronicles records ages to mark real history
📖 This account is history, not legend

## 👑 He Walked In The Way Of The Kings Of Israel, Like As Did The House Of Ahab

"The kings of Israel" here means the northern kingdom, not Judah.

The house of Ahab was infamous for idol worship led by Ahab and his wife Jezebel.

Comparing a king of Judah to that house was the worst insult Chronicles could give.

Jehoram is being measured against the very worst example in the whole divided kingdom.

🗺️ Israel here means the northern kingdom
👑 Ahab's house was infamous for idolatry
📉 This comparison was the worst possible insult
📖 Jehoram is judged against the worst example

## 👰 He Had The Daughter Of Ahab To Wife

This wife was Athaliah, though she is not named until later chapters.

Marrying into Ahab's family brought Baal worship straight into Judah's palace.

Political marriages like this one were common ways to seal an alliance between kingdoms.

This particular alliance would cost Judah dearly for two more generations.

👰 His wife was Athaliah, Ahab's daughter
🛐 She brought Baal worship into Judah
🤝 Marriage sealed an alliance between kingdoms
📖 This alliance cost Judah for generations

## 🔄 Howbeit The LORD Would Not Destroy The House Of David

"Howbeit" signals a turn, mercy shown in spite of everything just described.

Jehoram did everything that should have ended his family's rule.

God still chose not to wipe out David's dynasty because of Jehoram's sin.

Judgment fell on Jehoram personally, but the promise to David's line held firm.

🔄 Howbeit signals a turn toward mercy
⚠️ Jehoram's sin deserved the family's end
🛡️ God protected David's dynasty anyway
📖 The promise outlasted the failing king

## 🕯️ A Light To Him And To His Sons For Ever

"Light" here is an image for a lamp that keeps burning in a family's house.

A lamp going out pictured a family line coming to an end.

God promised David that his lamp, his line of kings, would never fully go out.

That old promise is the real reason Jehoram's throne survives his own failures.

🕯️ Light pictures a lamp staying lit
👪 A dead lamp meant a family's end
📜 God promised David's lamp would stay lit
➡️ That promise is why the throne survives

# SecondChronicles 21:8-11
# 🔥 Revolt And Ruin
---
## 🗺️ In His Days The Edomites Revolted From Under The Dominion Of Judah

Edom had been a subject nation under Judah's control since the days of King David.

"Revolted" means Edom threw off that control and refused to obey Judah any longer.

This was the first major loss of territory recorded under any king since David's conquests.

Losing Edom on Jehoram's watch was a visible sign that something had gone badly wrong.

🗺️ Edom had been under Judah since David
🚩 Revolted means they threw off control
📉 This was Judah's first major territorial loss
📖 A visible sign something had gone wrong

## 🌙 He Rose Up By Night, And Smote The Edomites Which Compassed Him In

Jehoram's army had been surrounded, "compassed in" by Edomite forces.

He led a night attack and broke through that encirclement to escape.

Breaking free was a real, if costly, military success in the moment.

The very next verse makes clear that surviving the ambush did not win back Edom.

🌙 Jehoram struck by night to break out
⚔️ Compassed in means his army was surrounded
🏃 He escaped the ambush successfully
📖 Escaping was not the same as winning

## 🗺️ Libnah Revolt From Under His Hand

Libnah was a city in the lowlands of Judah, once set apart for the priests.

Losing Libnah meant Jehoram could not hold even a city inside his own territory.

Edom was a distant vassal, but Libnah's revolt struck much closer to home.

Two rebellions in one reign showed how far Jehoram's grip on the kingdom had slipped.

🗺️ Libnah was a city inside Judah
⛪ It had once belonged to the priests
📉 This loss struck closer to home
📖 Two revolts showed Jehoram's grip slipping

## 🙅 Because He Had Forsaken The LORD God Of His Fathers

Chronicles gives the real reason behind both revolts in one plain sentence.

The losses were not just bad luck or weak leadership.

Jehoram had abandoned the God his own father and grandfather had served.

Political disaster followed directly from spiritual unfaithfulness.

📖 Chronicles names the real cause plainly
🚫 Not bad luck or weak leadership
🙅 Jehoram had abandoned his fathers' God
➡️ Spiritual failure led to political disaster

## ⛰️ He Made High Places In The Mountains Of Judah

"High places" were hilltop shrines used for worship outside the temple in Jerusalem.

Some kings tolerated old high places without adding new ones.

Jehoram went further and actively built new ones himself.

Building new shrines showed this was not neglect, it was a deliberate choice.

⛰️ High places were hilltop worship shrines
🏗️ Jehoram built new ones himself
🚫 This went beyond simple neglect
📖 It was a deliberate spiritual choice

## 🛐 Caused The Inhabitants Of Jerusalem To Commit Fornication

This "fornication" does not describe ordinary sexual sin among the people.

Scripture regularly uses that word as an image for worshiping other gods.

Jehoram pushed Jerusalem itself into idol worship, not just the countryside.

The text adds that he compelled Judah into it, meaning this was forced, not optional.

🛐 Fornication here is an image for idolatry
🏙️ Jerusalem itself was pushed into it
💪 Compelled means Judah was forced
📖 The king forced the whole nation astray

# SecondChronicles 21:12-15
# ✉️ A Letter From Elijah
---
## ✉️ A Writing To Him From Elijah The Prophet

Elijah's ministry is normally tied to the northern kingdom of Israel, confronting Ahab and Jezebel.

This is the only place in Scripture where Elijah sends a direct message to a king of Judah.

A letter, not a spoken confrontation, delivered this particular warning.

Even a prophet mostly known in Israel spoke into what was happening in Judah.

🔥 Elijah usually confronted Israel, not Judah
✉️ This is his only writing to Judah
🗺️ God's word was not limited to Israel
📖 A written warning still carried full weight

## 👴 Because Thou Hast Not Walked In The Ways Of Jehoshaphat Thy Father, Nor In The Ways Of Asa

Jehoshaphat was Jehoram's own father, described earlier in Chronicles as a mostly faithful king.

Asa was Jehoram's grandfather, also remembered for real reform, though he stumbled late in life.

Naming two generations back makes clear this failure was not a small slip.

Jehoram broke a pattern of faithfulness that had held for two kings before him.

👴 Jehoshaphat was Jehoram's own father
🧓 Asa was his grandfather before that
📜 Both were remembered as faithful kings
📖 Jehoram broke a family pattern

## 🗡️ Hast Slain Thy Brethren Of Thy Father's House, Which Were Better Than Thyself

Elijah's letter references the very murders from the start of this chapter.

"Better than thyself" is a direct, personal insult inside a prophetic warning.

The prophecy is not vague, it names the exact sin and judges it directly.

God's word had been watching that act of murder the entire time.

🗡️ This recalls the murders from verse four
😤 Better than thyself is a direct insult
🎯 The warning names this exact sin
📖 God saw the murders all along

## ⚠️ With A Great Plague Will The LORD Smite Thy People

This judgment does not fall on Jehoram alone.

It reaches his people, his children, his wives, and everything he owns.

Sin committed by one king still had consequences for everyone connected to him.

The rest of this chapter shows this exact prophecy coming true, piece by piece.

⚠️ Judgment reaches beyond Jehoram alone
👪 His people, children, and wives are named
💰 His goods are included in the loss
➡️ The rest of the chapter fulfills this

## 🤢 Thy Bowels Fall Out By Reason Of The Sickness Day By Day

This graphic prophecy describes a disease attacking Jehoram's intestines.

Ancient readers would have understood this as one of the most painful, humiliating ways to die.

"Day by day" means this would be a slow decline, not a quick death.

The prophecy is specific enough that its fulfillment later in the chapter cannot be mistaken.

🤢 The disease attacked his intestines
😖 This was painful and humiliating
📆 Day by day means a slow decline
📖 The specific prophecy is fulfilled exactly

# SecondChronicles 21:16-17
# ⚔️ Invasion Strips The Palace
---
## 🎯 The LORD Stirred Up Against Jehoram The Spirit Of The Philistines, And Of The Arabians

This invasion did not happen by accident or coincidence.

The text says plainly that God himself stirred these nations to attack.

The Philistines lived along the coast west of Judah.

The Arabians here lived near the Ethiopian region, to the south.

Enemies from two different directions moved against Judah at the very same time.

🎯 God himself stirred up this attack
🗺️ Philistines came from the west
🐫 Arabians came from the south
📖 Two directions of attack, one cause

## 💰 Carried Away All The Substance That Was Found In The King's House

"Substance" means the wealth and valuable goods kept inside the palace.

Invaders stripped the royal house of everything worth taking.

This is the same kind of wealth Jehoshaphat had once given his sons back in verse three.

What one generation gathered, the next generation's sin gave away.

💰 Substance means the palace's wealth
🏰 The royal house was stripped bare
🔁 This echoes the gifts from verse three
📖 One king's sin gave away another's gift

## 👶 Save Jehoahaz, The Youngest Of His Sons

Every son of Jehoram except one was carried off in this raid.

Jehoahaz, the youngest, was the only one spared.

This same son appears again later in Chronicles under another name, Ahaziah.

One surviving son was all that was left to carry David's line forward.

👶 Jehoahaz was the only son spared
🔎 He reappears later as Ahaziah
👪 The rest of the sons were lost
📖 One survivor carried the line forward

# SecondChronicles 21:18-20
# ⚰️ A Death Without Honor
---
## 🤢 The LORD Smote Him In His Bowels With An Incurable Disease

This is the exact disease Elijah's letter described years earlier.

"Incurable" means no treatment of that time could stop it.

The word "smote" makes clear this was not natural illness alone.

God's own hand carried out the judgment His prophet had already announced.

✉️ This fulfills Elijah's earlier letter
🚫 Incurable means nothing could stop it
✋ Smote points to God's own hand
📖 The judgment matched the prophecy exactly

## 📆 His Bowels Fell Out By Reason Of His Sickness

Two full years passed between the diagnosis and this final stage.

Most scholars believe this describes a severe intestinal disease or prolapse.

The slow timeline matches the "day by day" language from Elijah's warning.

This was as painful and undignified a death as the ancient world could imagine for a king.

📆 Two years passed before this stage
🤢 Likely a severe intestinal disease
⏳ The slow timeline matched the warning
📖 A painful, undignified end for a king

## 🔥 His People Made No Burning For Him, Like The Burning Of His Fathers

Royal funerals in Judah often included burning fragrant spices in honor of the king.

Chronicles later records this same honor given to good King Asa.

Jehoram's own people refused to give him that same tribute.

Withholding a custom everyone expected was its own quiet verdict on his reign.

🔥 Burning spices was a normal honor
👴 Asa received this honor before him
🚫 Jehoram's people withheld it from him
📖 Silence itself became a verdict

## 😐 He Departed Without Being Desired

This short line is Chronicles' own verdict on Jehoram's entire reign.

No one grieved his death or wished he had stayed king longer.

Compare this to the honor shown earlier to Jehoshaphat, a father genuinely missed.

A king can hold a throne for years and still leave no one who wanted him there.

📖 Chronicles states this as its verdict
😐 No one mourned or wanted him back
🔁 Contrast this with Jehoshaphat's honored death
➡️ No one wanted him, even as king

## 🪦 Not In The Sepulchres Of The Kings

Jehoram was still buried in the city of David, the royal burial ground.

But he was denied a place inside the actual tombs reserved for kings.

That distinction mattered deeply in a culture that honored kings even after death.

The bloody rise this chapter opened with ends in a grave marked by disgrace, not honor.

🪦 Buried in the city, not the tombs
👑 Royal tombs were reserved for honored kings
⚠️ This distinction was a real, visible shame
📖 A bloody reign ended in shame
`.trim();

export const SECOND_CHRONICLES_TWENTY_ONE_PERSONAL_SECTIONS = parseSecondChroniclesTwentyOneRawNotes(SECOND_CHRONICLES_TWENTY_ONE_RAW_NOTES);
