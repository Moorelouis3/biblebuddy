export type SecondKingsFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsFifteenRawNotes(rawText: string): SecondKingsFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsFifteen\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsFifteen\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsFifteen\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 15:${startVerse}` : `2 Kings 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 15 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_FIFTEEN_RAW_NOTES = `# SecondKingsFifteen 15:1-7
# 👑 Azariah Begins To Reign, Then Is Struck With Leprosy
---
## 📅 In The Twenty And Seventh Year Of Jeroboam King Of Israel

Azariah's start date lands years into Jeroboam's long reign in Israel, not at its beginning.

Jeroboam here is Jeroboam the second, already well into a forty one year reign.

That gap points to a stretch when Azariah ruled jointly with his father Amaziah.

Kings of Judah and Israel often shared power before a father's reign fully ended.

📅 Dated deep into Jeroboam's reign

👑 Jeroboam here is Jeroboam the second

🤝 Points to joint rule with Amaziah

📖 Two kingdoms, one shared clock

## ⏳ Sixteen Years Old Was He When He Began To Reign

Fifty two years makes this the longest reign of any king of Judah.

History remembers him by a second name, Uzziah, more than by Azariah.

Kings often carried two names, one for official record and one in common use.

Sixteen years old meant he began as a young co regent alongside his father.

⏳ Longest reign of any king of Judah

🏷️ Also known to history as Uzziah

👦 Began around age sixteen

📖 A long reign, later a hard ending

## 👩 Jecholiah Of Jerusalem

Judah's kings almost always have their mother's name recorded in the text.

Jecholiah came from Jerusalem itself, the capital city, not some distant town.

That detail signals a marriage that stayed close to the royal court.

This same family line is the one Azariah's son Jotham will come from later.

👩 Jecholiah was Azariah's mother

🏙️ She came from Jerusalem itself

👑 Close to the royal court

📖 Sets up Jotham's family line

## ✅ That Which Was Right In The Sight Of The Lord

This grades Azariah's reign as good, but only by comparison to his father.

Amaziah's own record in the chapter before this one was already a mixed one.

Copying a partly faithful father still counts as an improvement over any king of Israel.

Good compared to Amaziah is not the same thing as fully faithful.

✅ Graded good, but by comparison

⚖️ Amaziah's record was already mixed

📈 Still better than any king of Israel

📖 Good is not the same as faithful

## ⛰️ Howbeit The High Places Were Not Removed

High places were local hilltop shrines used for sacrifice and burning incense.

God had commanded that worship stay centered at the temple in Jerusalem.

This same line has now followed nearly every king of Judah in a row.

Even a king remembered as mostly good repeats this one failure.

⛰️ High places were hilltop shrines

🕍 Worship belonged at the temple

🔁 This line follows king after king

📖 Even good kings repeated this failure

## 🩹 The Lord Smote The King, So That He Was A Leper

Leprosy was a severe skin disease that made a person ceremonially unclean.

Second Kings never explains why this specific judgment fell on Azariah.

Second Chronicles fills that gap, saying he burned incense in the temple himself.

Only priests were allowed to perform that one act of worship.

🩹 Leprosy made a person unclean

❓ Second Kings does not explain why

📜 Second Chronicles gives the reason

📖 A visible sign followed his overreach

## 🏠 Dwelt In A Several House

A several house means a separate house, set apart from everyone else.

The law of Moses required anyone with this disease to live outside the normal camp.

Even a king was not exempt from that same isolation law.

Being unclean cut Azariah off from both the temple and his own palace.

🏠 Several house means a separate house

📜 The law required this isolation

👑 Even a king was not exempt

📖 The law overruled his own power

## 🏛️ Jotham The King's Son Was Over The House

Azariah's isolation left the daily work of ruling to someone else.

Jotham was his son, introduced here by name for the first time in Kings.

Over the house means Jotham ran the palace and government in his father's place.

This arrangement functioned as a working co regency for the rest of Azariah's reign.

🏛️ Jotham ran the government instead

👑 Over the house means daily rule

🤝 A working co regency began

📖 Jotham's own reign comes later

# SecondKingsFifteen 15:8-12
# 🗡️ Zachariah's Fall Fulfills The Word To Jehu
---
## 👑 Zachariah The Son Of Jeroboam Reigned Over Israel Six Months

Zachariah was the son of Jeroboam the second, Israel's longest reigning king.

His father's forty one years end here, followed by a reign of only six months.

That sharp contrast shows how quickly a strong kingdom could turn unstable.

Zachariah becomes the last king from the dynasty founded by Jehu.

👑 Zachariah was Jeroboam the second's son

⏳ His reign lasted only six months

🔚 Last king of Jehu's dynasty

📖 A stable reign did not pass down

## 🐂 He Did That Which Was Evil, As His Fathers Had Done

This same sin, worshiping golden calves, now spans five kings in one family.

Jeroboam the son of Nebat set this pattern generations earlier, at Israel's very start.

Every king since has kept that pattern without a single reversal.

A sin left unaddressed by one generation rarely corrects itself in the next.

🐂 The same calf worship continues

👴 Traces back to the first Jeroboam

🔁 Five kings, one unbroken sin

📖 Unaddressed sin becomes an identity

## 🗡️ Smote Him Before The People

Conspired means Shallum planned this killing in secret before he acted.

Before the people means the attack itself happened out in the open, not hidden.

Killing a king publicly was a bold and dangerous act of open rebellion.

Public violence like this reveals how fragile Israel's throne had truly become.

🗡️ Conspired means planned in secret

👀 Before the people means done openly

😨 A bold, public act of rebellion

📖 Israel's throne was fragile

## 📜 This Was The Word Of The Lord Which He Spake Unto Jehu

This promise was first given all the way back in chapter ten.

God told Jehu his own sons would sit on Israel's throne for four generations.

Jehoahaz, Jehoash, and Jeroboam the second were the first three kings of that line.

Zachariah is the fourth generation, exactly where the promise said the line would stop.

📜 First given to Jehu in chapter ten

🔢 Four generations were promised

👑 Zachariah is the fourth

📖 The promise lands exactly on time

## ✅ And So It Came To Pass

This short line closes a promise made generations before Zachariah was even born.

Jehu could not have known exactly how the promise would end this way.

God's word did not need Jehu's understanding in order to still come true.

The dynasty ends in the same kind of violence with which it began.

✅ Closes a promise from chapter ten

🕰️ Fulfilled generations after it was spoken

🗡️ The dynasty ends in violence too

📖 Delayed promises still land true

# SecondKingsFifteen 15:13-16
# 🔥 Shallum's One Month, Menahem's Brutal Rise
---
## 📆 Reigned A Full Month In Samaria

A full month meant Shallum's reign as king lasted about thirty days.

That makes him the shortest reigning king in all of Israel's history.

Israel has now had three different kings within a single chapter.

Each change came through murder, not through any peaceful transfer of power.

📆 Reigned about thirty days

🥇 Shortest reign in Israel's history

🗡️ Third king change in one chapter

📖 The kingdom was unraveling fast

## 📚 His Conspiracy Which He Made

Most closing formulas in this chapter mention only a king's acts in general.

This one specifically calls out Shallum's conspiracy as its own recorded event.

Israel's official record apparently included palace intrigue, not just battles or building projects.

That detail hints at how normal violent coups had become in Israel's history.

📚 This formula names his conspiracy directly

🗡️ Coups got recorded, not hidden

✍️ Even a month left a record

📖 Violence had become normal history

## 🏙️ Menahem The Son Of Gadi Went Up From Tirzah

Tirzah once served as Israel's capital before Omri built Samaria generations earlier.

Menahem rises from that older city to challenge the new king in Samaria.

Going up describes travel toward a more significant or elevated location.

He arrives ready for battle, not for a peaceful transfer of power.

🏙️ Tirzah was Israel's earlier capital

👤 Menahem rose from that city

⬆️ Going up means traveling to attack

📖 The old capital challenged the new

## 💔 The Women Therein That Were With Child He Ripped Up

This is one of the most brutal single acts recorded in the book of Kings.

Ancient Near Eastern armies sometimes used this exact atrocity to terrorize a city into surrender.

Scripture records this fact plainly without adding a single word of approval.

The Bible often reports history honestly, even the parts that are horrifying.

💔 One of Kings's most brutal verses

⚔️ A known ancient war tactic

🚫 Recorded honestly, never endorsed

📖 Scripture reports it, does not approve it

# SecondKingsFifteen 15:17-22
# 💰 Menahem Buys Assyria's Support
---
## ⏳ Menahem Reigned Ten Years In Samaria

Menahem seized his throne through the brutal violence described in the verses before this.

Despite that beginning, he manages to hold onto power for a full ten years.

That is a far longer reign than either king he replaced.

Violence secured his throne, but it did not have to end his reign quickly.

⏳ He still reigned ten years

👑 Power seized through violence

📉 Longer than the two kings before him

📖 A violent start did not doom him

## 📆 He Departed Not All His Days From The Sins Of Jeroboam

All his days means Menahem never once turned from this sin during his entire reign.

Other kings in this chapter get milder language about their failures.

This phrase leaves no room for even a partial correction.

A violent usurper turns out to be just as committed to the old idolatry.

📆 All his days means never, not once

⚖️ Stronger language than other kings get

🐂 Fully committed to the old idolatry

📖 New power, same old direction

## 🦁 Pul The King Of Assyria Came Against The Land

Pul is another name for Tiglathpileser the third, king of the Assyrian empire.

Assyria was the rising superpower that would eventually destroy Israel completely.

This is the first time in Kings that Assyria presses directly against Israel's land.

Menahem's shaky throne made him an easy target for a much larger power.

👑 Pul is Tiglathpileser the third

🦁 Assyria was the coming superpower

🎯 First direct Assyrian pressure on Israel

📖 Marks the start of Assyria's shadow

## 💰 A Thousand Talents Of Silver, To Confirm The Kingdom In His Hand

A talent was a large unit of weight, close to seventy five pounds of silver.

A thousand talents was an enormous fortune, paid out to buy Assyrian support.

Confirm the kingdom in his hand means securing Menahem's own shaky throne.

He needed a foreign king's backing more than he needed his own people's trust.

⚖️ A talent was about seventy five pounds

💰 A thousand talents was a fortune

👑 It secured Menahem's shaky throne

📖 Foreign backing over local trust

## 💼 Of All The Mighty Men Of Wealth

Mighty men of wealth refers to Israel's richest and most powerful citizens.

Menahem targeted this group specifically, rather than taxing every household equally.

Wealthy men were the ones most able to pay without their households collapsing.

This choice also kept ordinary Israelites from bearing the heaviest cost of tribute.

💼 Mighty men of wealth means the rich

🎯 Menahem targeted this group specifically

👥 Ordinary Israelites were spared the worst

📖 Even harsh policy had strategy

## ⚖️ Fifty Shekels Of Silver, To Give To The King Of Assyria

A shekel was a much smaller unit of weight than a talent.

Fifty shekels from each wealthy man added up to the fortune Menahem needed.

This is Israel's first recorded tribute payment to the Assyrian empire.

It would not be the last, and later payments would not buy the same peace.

⚖️ A shekel was far smaller than a talent

💰 Individual payments added up fast

🎯 Israel's first tribute to Assyria

📖 A pattern with no easy end

## ↩️ So The King Of Assyria Turned Back, And Stayed Not There

Turned back means the Assyrian army withdrew without conquering the land outright.

Stayed not there in the land confirms this was only a temporary retreat.

The silver bought Israel a real, if costly, season of peace.

That peace depended on Israel continuing to pay whatever Assyria demanded next.

↩️ Turned back means Assyria withdrew

⏳ Only a temporary retreat, not defeat

💰 Peace was bought, not won

📖 Bought relief rarely stays cheap

# SecondKingsFifteen 15:23-26
# 🗡️ Pekahiah Murdered By His Own Captain
---
## 👑 Pekahiah...Reigned Two Years

Pekahiah inherits the throne his father Menahem had bought with heavy tribute money.

Two years is a short reign, even by this chapter's unstable standard.

The insecurity that built his father's throne carries straight into his own.

A shaky foundation rarely produces a lasting reign for the next generation.

👑 Inherited Menahem's bought throne

⏳ Reigned only two years

📉 His father's insecurity carried over

📖 A shaky foundation rarely lasts

## 🔁 He Departed Not From The Sins Of Jeroboam

This is now the fourth king in a row measured against this exact same sin.

Each new king promises a fresh start and delivers the same old failure.

Pekahiah had every chance to break the pattern and did not take it.

By this point the sin has outlasted four separate kings and two dynasties.

🔁 Fourth king in a row, same sin

🚪 A fresh start, an old failure

👑 Two dynasties, one unbroken sin

📖 Kings change, the problem does not

## 🎖️ Pekah The Son Of Remaliah, A Captain Of His, Conspired

A captain was a trusted military officer, often close to the king himself.

Pekah held that exact position before he turned against Pekahiah.

Betrayal from a soldier sworn to protect the king was especially dangerous.

The very men meant to guard the throne could just as easily end it.

🎖️ A captain was a trusted officer

🗡️ Pekah held that trusted role

😨 The guard became the threat

📖 Trust did not guarantee safety

## 🗺️ With Him Fifty Men Of The Gileadites

The Gileadites came from Gilead, a rugged region east of the Jordan River.

That region was known for producing tough, capable fighting men.

Fifty armed men inside the palace itself made this attack impossible to stop.

Naming Argob and Arieh shows this murder was remembered in specific, deliberate detail.

🗺️ Gilead sat east of the Jordan

⚔️ Known for tough fighting men

🏰 Fifty men struck inside the palace

📖 A planned, deliberate ambush

## 🏠 And He Killed Him, And Reigned In His Room

Room here is an old way of saying place or position, not a literal chamber.

Most of this chapter uses the phrase reigned in his stead instead.

Both phrases mean exactly the same thing, took his position as king.

Older English used several different words for this same simple idea.

🏠 Room here means place or position

🔄 Same meaning as reigned in his stead

🔤 Older English varied its wording

📖 Not a clue to deeper meaning

# SecondKingsFifteen 15:27-31
# ⚔️ Assyria Begins Taking Israel's Land
---
## ⏳ Pekah...Reigned Twenty Years

Twenty years makes Pekah's reign one of the longer ones in this chapter.

Some of the dates given for these kings overlap in ways scholars still debate.

The most likely explanation involves rival rule happening in different parts of Israel at once.

Even without a perfect timeline, the pattern of instability stays completely clear.

⏳ One of the longer reigns here

🧩 Some dates overlap and remain debated

🗺️ Possibly rival rule in different areas

📖 Length did not mean real strength

## 🐂 He Did That Which Was Evil In The Sight Of The Lord

This is now the fifth straight king of Israel measured by this exact same standard.

Two different dynasties and one violent coup have not changed a single thing.

The specific sin never shifts, only the names of the men repeating it.

A nation can grow numb to its own recurring failure.

🔁 Fifth king in a row, same sin

👑 Two dynasties, no real change

🐂 Only the names keep changing

📖 A nation grew numb to failure

## 👑 In The Days Of Pekah Came Tiglathpileser King Of Assyria

Tiglathpileser is the same Assyrian king already introduced earlier in this chapter as Pul.

Kings sometimes used a personal name and a throne name at different times.

This time Assyria does not just collect tribute, it takes territory outright.

What began as a payoff to Menahem has now become open conquest.

👑 Same king already called Pul

🏷️ Kings could carry two different names

⚔️ This time Assyria takes land, not silver

📖 A payoff becomes open conquest

## 🏰 Took Ijon, And Abelbethmaachah, And Janoah, And Kedesh, And Hazor

These were fortified cities across Israel's northern territory, near modern day Lebanon.

Hazor was once the largest fortified city in the land, conquered generations earlier under Joshua.

Losing a city with that much history showed how far Israel had fallen.

One by one, Assyria began peeling away Israel's most defended positions.

🏰 Fortified cities in Israel's north

🏛️ Hazor was once Israel's largest city

📉 Even strong cities could not hold

📖 Old defenses met a new empire

## 🗺️ And Galilee, All The Land Of Naphtali

Galilee and the land of Naphtali sat along Israel's far northern border.

Losing this entire region meant Israel's kingdom was collapsing from its edges inward.

This is the same Galilee that will later matter deeply in the New Testament.

Centuries before Jesus ever walked there, this land already belonged to someone else.

🗺️ Galilee sat on the northern border

📉 The kingdom collapsed from its edges

🏔️ Hardest to defend, first to fall

📖 Same Galilee from the New Testament later

## 🚚 Carried Them Captive To Assyria

Carried them captive means the people of these regions were forcibly removed from their homes.

Assyria used mass deportation as a deliberate strategy to prevent future rebellion.

Moving a population far from home made organizing a revolt far harder.

This is the first mass exile mentioned in Israel's story, not the last.

🚚 Forced removal from their homes

🛡️ Assyria's strategy to prevent revolt

🔗 Exile made rebellion far harder

📖 The first exile, not the last

## 👑 Hoshea The Son Of Elah Made A Conspiracy Against Pekah

Hoshea will turn out to be the very last king Israel ever has.

Conspiracy against Pekah continues the exact same pattern seen throughout this chapter.

Notice this event is dated by Judah's king Jotham, not by any king of Israel.

That shift in dating hints at how unstable Israel's own throne had become.

👑 Hoshea becomes Israel's last king

🔁 Same coup pattern continues

📅 Dated by Judah's king instead

📖 One step closer to collapse

# SecondKingsFifteen 15:32-38
# 🚪 Jotham Reigns Well, Trouble Begins For Judah
---
## 🤝 In The Second Year Of Pekah, Jotham Began To Reign

Jotham had already been running Judah's government for years, back in verse five.

This verse marks the moment his father Uzziah's long isolation finally ends in death.

Jotham now holds the throne fully, not just the daily duties of ruling.

A functioning co regency here becomes a clean, peaceful transfer of power.

👑 Jotham already ran the government

⚰️ Marks Uzziah's death

🤝 A peaceful, clean transition

📖 Unlike Israel's violent transitions

## 🎓 Five And Twenty Years Old, Reigned Sixteen Years

Twenty five years old means Jotham was already an experienced ruler by this point.

Sixteen years becomes the length of his full, independent reign in Jerusalem.

That number does not count the years he already spent as co regent.

Judah gains real stability from a king who had years of practice before this.

👦 Twenty five years old here

⏳ Sixteen years as full king

🎓 Already experienced from co regency

📖 Practice before the crown steadied him

## 👩 Jerusha, The Daughter Of Zadok

Jerusha the daughter of Zadok is named as Jotham's mother.

Zadok was also the name of a famous priestly family from David's own time.

The text does not confirm this is the very same family line.

Judah's habit of recording each queen mother continues here without a break.

👩 Jerusha was Jotham's mother

🕍 Zadok was also a priestly family name

❓ The text does not confirm a link

📖 Judah kept naming every queen mother

## ✅ According To All That His Father Uzziah Had Done

Jotham is measured against his father Uzziah, the same way Uzziah was measured against Amaziah.

Uzziah's own record was good, right up until his overreach into the priest's role.

Jotham follows the good pattern without repeating that specific failure.

He avoids his father's one costly mistake while keeping his father's overall faithfulness.

👴 Measured against his father Uzziah

✅ Keeps the good, avoids the failure

🚫 Never repeats the priestly overreach

📖 Learning from a parent's mistake

## 🚪 He Built The Higher Gate Of The House Of The Lord

The higher gate was a specific gate at the temple, rebuilt or expanded under Jotham.

Most kings in this chapter only get the same recycled formula about their reign.

Jotham instead leaves one concrete, physical mark of his devotion behind.

A building project like this took real time, planning, and resources to complete.

🚪 The higher gate was at the temple

🏗️ A real building project

🙏 A concrete mark of devotion

📖 Faithfulness shown in stone

## ⚔️ The Lord Began To Send Against Judah Rezin And Pekah

Rezin ruled Syria, based in the city of Damascus to Judah's northeast.

Pekah is the same king of Israel already reigning through the rest of this chapter.

These two kings begin working together against Judah during Jotham's own lifetime.

Jotham's steady reign absorbs this pressure without the crisis fully breaking out yet.

👑 Rezin ruled Syria from Damascus

🤝 Rezin and Pekah worked together

🛡️ Pressure began during Jotham's reign

📖 Sets up the crisis for Ahaz next

## 📉 Ahaz His Son Reigned In His Stead

Jotham dies and is buried with the same honor given to Judah's other faithful kings.

Ahaz his son now takes the throne of Judah.

Ahaz will turn out to be one of the worst kings in Judah's entire history.

A steady, faithful reign is about to be followed by a sharp and sudden decline.

⚰️ Jotham buried with honor

👑 Ahaz his son reigns next

📉 Ahaz becomes one of Judah's worst

📖 Chapter sixteen opens with that decline
`.trim();

export const SECOND_KINGS_FIFTEEN_PERSONAL_SECTIONS = parseSecondKingsFifteenRawNotes(SECOND_KINGS_FIFTEEN_RAW_NOTES);
