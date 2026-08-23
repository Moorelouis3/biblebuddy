export type SecondChroniclesTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyFourRawNotes(rawText: string): SecondChroniclesTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 24:${startVerse}` : `2 Chronicles 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 24 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_FOUR_RAW_NOTES = `# SecondChronicles 24:1-3
# 👦 The Boy King Under Jehoiada
---
## 👶 Was Seven Years Old

Joash was hidden from his own murderous grandmother Athaliah as a baby.

Chapter twenty three already told that whole rescue story in full.

Now, at only seven years old, he finally becomes king in public.

A child this young could not possibly rule the kingdom alone.

Everything in this chapter depends on who stands beside him.

👶 Joash became king at only seven

🏃 He had been hidden as a baby

📜 Chapter twenty three tells that rescue

➡️ His reign depends on wise guidance

## 🗺️ Zibiah Of Beersheba

Zibiah was Joash's mother, named here for the historical record.

Beersheba sat at the far southern edge of Judah, well outside Jerusalem.

Kings in Chronicles are regularly introduced by their mother's name and hometown.

That small detail was never filler for the original readers.

It rooted the new king's identity in a real family and a real place.

👩 Zibiah was Joash's mother

🗺️ Beersheba lay in southern Judah

📜 Chronicles regularly names each king's mother

📖 Real names root the story in history

## ⏳ All The Days Of Jehoiada The Priest

This phrase is a warning tucked quietly inside a compliment.

Joash's goodness is tied to a length of time, not to his own character.

As long as Jehoiada guided him, Joash did what was right.

The rest of this chapter will show what happens once that guidance ends.

A borrowed faith can look strong right up until the person holding it up is removed.

✅ Joash did right under guidance

⏳ The praise carries a time limit

👴 Jehoiada was the one guiding him

📖 Borrowed faith still needs its own root

## 👴 Jehoiada Took For Him Two Wives

Jehoiada, not Joash's birth father, arranges these marriages for him.

Joash had been raised inside the temple under Jehoiada's care since infancy.

Taking two wives followed the common royal custom of that era.

It also protected the line of David by giving Joash more heirs.

Jehoiada is still acting like a father to the king he once saved.

👴 Jehoiada arranged the marriages

🏛️ Joash grew up inside the temple

👑 Royal custom allowed multiple wives

📖 Jehoiada still cared like a father

## 👶 Begat Sons And Daughters

Joash's family line continues safely because of this marriage.

One of these sons, Amaziah, will become the next king of Judah.

Chronicles records this quietly, with almost no extra detail.

It matters because Athaliah once tried to wipe out this whole family.

A line she nearly destroyed keeps right on growing here.

👶 Sons and daughters are born

👑 Amaziah becomes the next king

🗡️ Athaliah once tried to end this line

📖 The threatened family survives and grows

# SecondChronicles 24:4-9
# 💰 Raising Money To Repair God's House
---
## 🛠️ Minded To Repair The House Of The LORD

"Minded" here means Joash firmly decided, not that he casually considered it.

The temple had sat damaged and neglected for years under the wicked kings before him.

Athaliah's own sons had broken into it and handed its holy items over to Baal worship.

Joash, now grown, makes fixing God's house his first major project as king.

This one decision begins reversing years of the very corruption Jehoiada rescued him from.

🛠️ Minded means Joash firmly decided

🏚️ The temple had been damaged for years

🙏 Repairing it was his first big project

📖 It began reversing years of corruption

## 📜 Gather Of All Israel Money To Repair The House Of Your God

Moses had already commanded a yearly collection for the tabernacle centuries earlier.

Joash simply restarts that same old command for the newly repaired temple.

Priests and Levites were sent out to every single city in Judah to collect it.

This giving was meant to happen every year, not just as a one time gift.

📜 Moses commanded this collection long ago

🏙️ Levites traveled through every city

📅 It was meant to happen yearly

📖 Joash revives an old command

## 🐌 Howbeit The Levites Hastened It Not

"Hastened" means to hurry something along quickly.

The very men placed in charge of collecting the money dragged their feet instead.

This sets up a real conflict between the king's urgency and the Levites' delay.

Even good leadership can stall when the people responsible are not truly willing.

🐌 Hastened means to hurry along

😐 The Levites did not hurry

⚔️ Their delay creates real conflict

📖 Leadership can stall without willing hands

## ⛺ The Tabernacle Of Witness

The "tabernacle of witness" is another name for the tent of meeting from Moses' own time.

It carried that name because it held the stone tablets, the physical proof of God's covenant.

By this chapter, Solomon's temple has long since replaced that tent as the place of worship.

Joash reaches all the way back to that ancient command to justify collecting the tax now.

⛺ Tabernacle of witness means the tent of meeting

📜 It held the tablets of the covenant

🏛️ The temple later replaced that tent

📖 Joash reaches back to Moses' own command

## 👴 The King Called For Jehoiada The Chief

Joash goes straight to Jehoiada, not to the Levites themselves, to fix the delay.

This shows Joash still leans on Jehoiada's authority to get things done.

The student is beginning to act, but the teacher still holds real influence.

Joash's own leadership is growing here, even while Jehoiada remains close by.

👴 Joash calls on Jehoiada directly

🎓 The student still leans on the teacher

📈 Joash's leadership is growing here

➡️ Real change still needs real authority

## 👵 The Sons Of Athaliah, That Wicked Woman

Athaliah was Joash's own grandmother, the queen who once tried to kill every royal child.

Her other sons, Joash's uncles, had ruled before her and let the temple fall into ruin.

Chronicles names her plainly as wicked, not just careless or weak.

This one line explains exactly why the temple needed repair in the first place.

👵 Athaliah was Joash's own grandmother

🗡️ She once tried to kill every royal child

🏚️ Her sons let the temple decay

📖 This explains why repair was needed

## ⚡ Bestow Upon Baalim

"Baalim" is the plural form of Baal, a false Canaanite storm god widely worshiped nearby.

The holy items meant only for the LORD's worship had been handed over to Baal's temples instead.

This was not simple neglect, it was a direct theft of what belonged only to God.

Joash's repair project undoes that specific insult, not just broken stones and walls.

⚡ Baalim means the false god Baal

🔀 Holy items were given to Baal instead

🚫 This was theft, not just neglect

📖 Joash undoes a direct insult to God

## 📦 They Made A Chest, And Set It Without At The Gate

This chest worked like a public offering box placed just outside the temple gate.

Anyone entering to worship could drop money into it on the way in.

Placing it outside the gate, instead of requiring a private appointment, made giving simple for everyone.

A practical fix like this solved the problem the reluctant Levites had left unsolved.

📦 The chest was a public offering box

🚪 It sat just outside the temple gate

🙌 Giving became simple for everyone

📖 A practical fix solved a real problem

## 💰 Laid Upon Israel In The Wilderness

This "collection" was the half shekel tax every man over twenty once paid during the wilderness years.

Exodus describes that same tax as a way to number the people and fund the tabernacle.

Joash's proclamation reminds all of Judah that this is an old, God given command, not a new tax he invented.

Tying it to Moses gave the whole collection real weight in the people's eyes.

💰 The tax was the wilderness half shekel

📜 Exodus first describes this same command

🏛️ It once funded the tabernacle

📖 Old authority backed Joash's new proclamation

# SecondChronicles 24:10-14
# 🔨 The Temple Is Restored
---
## 😊 All The Princes And All The People Rejoiced

Giving here is not treated as a burden the people grudgingly accept.

Princes and common people alike respond with real joy, not just duty.

"Until they had made an end" means they kept giving until the chest was completely full.

The whole nation, not only the king, wanted this repair to succeed.

😊 The people gave with real joy

👑 Princes and commoners gave together

📦 They filled the chest completely

📖 The whole nation wanted this repair

## ✍️ The King's Scribe And The High Priest's Officer

A scribe kept official written records for the crown.

This officer represented the high priest's own staff at the same meeting.

Having both men present when the chest was emptied kept the count honest.

Neither the king's side nor the priest's side could quietly keep money for themselves.

✍️ The scribe kept official records

👮 The officer represented the high priest

🤝 Both watched the money together

📖 Honesty protected the whole project

## 📈 Gathered Money In Abundance

"Day by day" means this collection did not happen once, it kept repeating.

The chest kept filling faster than anyone likely expected.

What began as a stalled, ignored command turns into overflowing generosity.

God's house was never going to stay broken once the people were finally asked properly.

📅 Day by day means it kept happening

📈 Giving grew faster than expected

🔄 A stalled command became overflowing generosity

➡️ Proper asking unlocked real generosity

## 🧱 Hired Masons And Carpenters

Masons worked with stone, and carpenters worked with wood, the temple's two main materials.

Workers skilled in iron and brass handled the temple's fittings and tools.

Every kind of skilled trade needed for the job gets hired and paid.

This was a full scale construction project, not a quick patch job.

🧱 Masons worked with stone

🪵 Carpenters worked with wood

🔨 Iron and brass workers handled fittings

📖 This was full repair, not a patch

## 💪 Set The House Of God In His State, And Strengthened It

This does not just mean the temple looked the way it used to look.

"Strengthened" means the workers made it sturdier than a simple repair required.

The goal was not to patch over Athaliah's damage, but to leave the building better able to last.

Careful, complete work replaces years of neglect from before.

🏛️ The temple was restored to its state

💪 Strengthened means made sturdier too

🛠️ The goal went beyond a simple patch

📖 Careful work undid years of neglect

## 🥄 Vessels To Minister, And To Offer Withal

These vessels were the bowls, spoons, and tools priests used to prepare offerings.

Leftover repair money was not returned or wasted, it was turned into new equipment for worship.

Gold and silver vessels replaced whatever Athaliah's sons had handed over to Baal earlier in this chapter.

The temple now had both a restored building and the tools to actually use it.

🥄 Vessels were tools for offerings

💰 Leftover money funded new equipment

🔀 This replaced what was given to Baal

📖 A restored building still needed working tools

## 🔁 Continually All The Days Of Jehoiada

This phrase echoes the same warning already given earlier in this chapter.

Worship here is described as continual, but only for as long as Jehoiada lives.

The writer of Chronicles repeats this exact phrase on purpose, not by accident.

Readers are quietly being prepared for what happens once Jehoiada is gone.

🔁 This echoes an earlier warning

⏳ Continual worship still has a limit

✍️ Chronicles repeats this phrase on purpose

📖 Readers are prepared for what comes next

# SecondChronicles 24:15-19
# ⚰️ After Jehoiada Died
---
## 🌒 Waxed Old, And Was Full Of Days

"Waxed old" simply means he grew old, the way the moon waxes as it grows fuller.

"Full of days" is a way of saying he lived a long and satisfied life.

Jehoiada dies peacefully here, unlike so many other figures in this violent chapter.

His peaceful death stands in sharp contrast to the short, troubled reign about to follow.

🌒 Waxed old means grew old

📅 Full of days means a long life

🕊️ Jehoiada dies peacefully

📖 His peace contrasts what follows

## 🔢 An Hundred And Thirty Years Old

That age was already unusual, even by Old Testament standards.

It placed Jehoiada among the oldest, most honored figures recorded in scripture.

Chronicles records the exact number to show how deeply he was respected.

A life this long gave him decades to shape Joash and protect the kingdom.

🔢 An unusually long recorded age

🏆 It marked deep honor and respect

📜 Chronicles records the exact number

📖 Decades of influence shaped Joash's reign

## 🏙️ Buried Him In The City Of David Among The Kings

Jehoiada was a priest, not a king, yet he receives a king's burial honor.

Being buried among royalty in the city of David was normally reserved for the royal family alone.

The text explains plainly why, because of the good he did for God and for the king's own house.

No other priest in the book of Chronicles receives this kind of honor.

👑 Jehoiada was a priest, not a king

🏙️ He was buried among royalty anyway

✅ His good deeds earned that honor

📖 No other priest is honored this way

## 🙇 Made Obeisance To The King

"Obeisance" means a deep, formal bow showing respect or submission.

These same princes flatter Joash the moment his protector is finally gone.

"Hearkened" means Joash listened and actually followed their advice.

The very people bowing lowest are about to lead Joash into his worst decision.

🙇 Obeisance means a deep formal bow

🎭 The princes flatter Joash suddenly

👂 Hearkened means he listened to them

📖 Flattery here leads to disaster

## 🌳 Served Groves And Idols

"Groves" refers to Asherah poles, wooden symbols of a Canaanite goddess set up for worship.

This is the exact same idolatry Jehoiada had spent his whole life fighting against.

The turn happens almost immediately once his steady influence is removed.

Everything rebuilt in the first half of this chapter starts unraveling in the second half.

🌳 Groves means Asherah worship poles

⚔️ Jehoiada had fought this his whole life

⏱️ The turn happens almost immediately

📖 Rebuilding unravels once guidance is gone

## ⚖️ Wrath Came Upon Judah And Jerusalem For This Their Trespass

"Trespass" here means a serious offense against God, not a small mistake.

God's response is described plainly as wrath, not mild disappointment.

This sets up the real consequences the rest of the chapter will show playing out.

Turning from God after being rescued and restored carries a heavier weight than never knowing Him at all.

⚖️ Trespass means a serious offense

😠 Wrath describes God's real response

➡️ Consequences follow through the chapter

📖 Turning away after rescue carries weight

## 📣 He Sent Prophets To Them, To Bring Them Again Unto The LORD

God does not punish first without any warning.

Prophets are sent specifically to call the nation back before judgment falls.

"Testified against them" means these prophets spoke hard truth, not comfortable words.

Mercy comes before judgment here, exactly as it usually does throughout the Old Testament.

📣 Prophets warned before judgment came

🗣️ They spoke hard truth plainly

⏳ Mercy is offered before judgment

📖 Warning always comes before punishment

## 👂 They Would Not Give Ear

"Give ear" is an old way of saying to actually listen and respond.

The people hear the warning but choose to ignore it completely.

This sets up the final, tragic confrontation only a few verses later.

Refusing to listen here is a real choice, not an accident.

👂 Give ear means to actually listen

🙉 The people ignore the warning

➡️ This sets up the coming confrontation

📖 Refusing to hear is a real choice

# SecondChronicles 24:20-22
# 🪨 The Murder Of Zechariah
---
## 👨‍👦 Zechariah The Son Of Jehoiada The Priest

This Zechariah is Jehoiada's own son, not the later prophet who wrote his own Old Testament book.

He grew up watching his father rescue and raise the very king he now confronts.

The Spirit of God coming upon someone marks a moment of direct, urgent prophecy.

Zechariah is not speaking his own opinion, he is delivering God's own words.

👨‍👦 Zechariah was Jehoiada's own son

📚 A different Zechariah than the prophet

🕊️ God's Spirit marks urgent prophecy

📖 His words come directly from God

## 📈 Why Transgress Ye The Commandments Of The LORD

"Prosper" was a word tied closely to obedience throughout the whole book of Chronicles.

Zechariah is asking the nation to see a connection they are choosing to ignore.

Breaking God's commands, not simple bad luck, is why things are about to fall apart.

This is the same warning his own father spent a lifetime teaching.

📈 Prosper connects closely to obedience

❓ Zechariah names the real cause

🚫 Not bad luck, but broken commands

📖 This echoes his father's lifelong message

## 🪨 Stoned Him With Stones At The Commandment Of The King

Stoning was carried out as a group execution, ordered here directly by Joash himself.

It happens inside the temple courtyard, the very ground Jehoiada spent his life protecting.

Joash gives this command against the son of the man who saved his own life as a baby.

This is the single most shocking act of ingratitude in the entire chapter.

🪨 Stoning was a group execution

🏛️ It happened inside the temple courtyard

👑 Joash himself gave the order

📖 Shocking ingratitude toward his own rescuer

## 😔 Remembered Not The Kindness Which Jehoiada His Father Had Done To Him

Joash calls Jehoiada "his father" here, not because Jehoiada was his birth father.

Jehoiada had raised, protected, crowned, and guided Joash since he was a hidden infant.

Despite all of that, Joash forgets every bit of that kindness in this one moment.

Gratitude can fade completely once the person who earned it is no longer present to remind you.

👨‍👦 Jehoiada was called his father in care

🛡️ He had raised and protected Joash

😔 Joash forgets all of that kindness

📖 Gratitude can fade without a reminder

## 🙏 The LORD Look Upon It, And Require It

These are Zechariah's final words as he dies.

"Require it" means asking God to hold someone accountable for what was done.

Centuries later, Jesus points back to this exact murder as the last one named in the Hebrew scriptures.

Zechariah's dying request for justice does not go unanswered, as the rest of this chapter will show.

🙏 Zechariah's final words as he died

⚖️ Require it means seeking accountability

📖 Jesus later points back to this murder

➡️ Justice for Zechariah is coming

# SecondChronicles 24:23-27
# ⚔️ Judgment Falls On Joash
---
## 📅 At The End Of The Year

This invasion arrives within the very same year Zechariah was murdered.

The timing is too close to be treated as a coincidence in the way Chronicles tells this story.

Judgment does not wait a whole generation here, it arrives almost immediately.

The consequence follows the crime with startling speed.

📅 This happens within the same year

⏱️ Judgment arrives almost immediately

🎯 The timing is not a coincidence

📖 Consequence follows crime quickly

## 👑 Destroyed All The Princes Of The People

These princes are very likely the same men who flattered Joash earlier in this chapter.

The advisors who led Joash away from God are the ones who now pay for it first.

Their influence over the king ends exactly where it began, with disaster.

The people who caused the fall are among the first to fall themselves.

👑 These were likely the same flattering princes

⚔️ They influenced Joash toward idolatry

💥 Their influence ends in disaster

📖 Those who caused the fall, fall first

## ⚔️ The LORD Delivered A Very Great Host Into Their Hand

Judah's army badly outnumbers the small Syrian force in this battle.

Yet Judah loses anyway, and Chronicles credits that loss directly to the LORD.

This detail rules out simple bad military luck as the real explanation.

A small army winning proves the outcome was judgment, not chance.

⚔️ Judah's army greatly outnumbered Syria

📉 Judah still lost the battle

🎯 Chronicles credits this loss to God

📖 A small army winning proves judgment

## ⚖️ So They Executed Judgment Against Joash

"Executed judgment" means this defeat was a deliberate punishment, not a random event.

The invasion connects directly back to the murder of Zechariah a few verses earlier.

Chronicles wants readers to see the cause and the consequence sitting side by side.

God's patience with Joash ran out once his rebellion turned this violent.

⚖️ Executed judgment means deliberate punishment

🔗 It connects directly to Zechariah's murder

👀 Chronicles shows cause and consequence together

📖 God's patience had a real limit

## 🤕 They Left Him In Great Diseases

The Syrian army leaves Joash alive but severely wounded or sick.

This weakened state leaves him defenseless against what happens next.

The very battle meant as judgment also creates the opening for his final downfall.

His weakness becomes the doorway for the final act of this chapter.

🤕 Joash was left badly wounded

🛡️ This left him defenseless

🚪 It opened the door to what follows

📖 Weakness becomes the final doorway

## 🗡️ For The Blood Of The Sons Of Jehoiada The Priest

Only one son, Zechariah, was named as murdered earlier in this chapter.

"Sons" here may include others harmed with him, or reflect how deeply the whole family was wronged.

Either way, Joash's own servants frame this murder as direct payback for that earlier killing.

The king who once received such loyalty is killed by the very people meant to protect him.

👦 Zechariah was the one named victim

👪 Sons may include his whole wronged family

🗡️ His own servants carried out revenge

📖 Loyalty turned to payback in the end

## 🏙️ They Buried Him Not In The Sepulchres Of The Kings

Joash is buried in the same city as the kings, but pointedly not in their special tombs.

Compare this directly to Jehoiada earlier in this chapter, who was buried among kings as an honor.

Joash, an actual king, is denied the very honor his own priest received instead.

The final resting place mirrors exactly how each man had lived.

🏙️ Joash was buried in the city of David

🚫 But not in the honored royal tombs

🔁 This mirrors Jehoiada's honored burial

📖 His burial matched how he had lived

## 📛 Zabad The Son Of Shimeath An Ammonitess, And Jehozabad The Son Of Shimrith A Moabitess

Both conspirators are named here, along with their mothers, which was unusual in these royal records.

Ammon and Moab were neighboring nations, both descended from Lot, and both often at odds with Israel.

Naming their foreign mothers may be the writer's way of showing how far Joash's own household had drifted.

Even the king's inner circle now reflects the very idolatry Zechariah had warned against.

📛 Both conspirators are named plainly

🌍 Ammon and Moab were neighboring nations

👩 Their foreign mothers are noted too

📖 Joash's own household had drifted far

## 📚 Written In The Story Of The Book Of The Kings

Chronicles regularly points to an outside source document for more detail than it includes itself.

That original book has not survived, only Chronicles' own summary of it remains today.

This closing formula signals that Joash's story, as the writer sees it, is finished.

Not every detail of a king's life made it into the Bible's final version.

📚 Chronicles points to an outside source

📉 That original record did not survive

✅ This formula signals the story is done

📖 Not every detail made the final text

## 👑 Amaziah His Son Reigned In His Stead

The throne passes to Amaziah, one of the sons mentioned earlier in this chapter.

Athaliah's line of destruction is now fully replaced by three generations, Jehoiada, Joash, and his own son.

This short line closes one story and quietly opens the next chapter's.

The family Athaliah once tried to erase keeps moving forward.

👑 Amaziah becomes the next king

👨‍👦 He was one of Joash's own sons

🔁 This closes one story, opens another

📖 The family Athaliah targeted survives
`.trim();

export const SECOND_CHRONICLES_TWENTY_FOUR_PERSONAL_SECTIONS = parseSecondChroniclesTwentyFourRawNotes(
  SECOND_CHRONICLES_TWENTY_FOUR_RAW_NOTES
);
