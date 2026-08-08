export type JoshuaTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwentyRawNotes(rawText: string): JoshuaTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 20:${startVerse}` : `Joshua 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Joshua 20 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWENTY_RAW_NOTES = `# Joshua 20:1-3
# 🛡️ God Sets Up Cities Of Refuge
---
## 📣 The LORD Also Spake Unto Joshua

This chapter opens with a fresh command, not more land division.

The LORD had just finished speaking through the tribal boundaries in the last six chapters.

Now He speaks straight to Joshua again, the same way He did at the very start of the book.

That opening line in Joshua chapter one used this same wording.

A story that began with God speaking to Joshua is now closing that same way.

📣 God speaks straight to Joshua again
🗺️ Land division has just finished
🔁 This echoes chapter one's opening line
📖 The story is closing the way it opened

## 🏙️ Appoint Out For You Cities Of Refuge

Cities of refuge means designated safe cities where a person could run for protection.

Appoint out means Joshua had to formally select and set apart six specific cities for this purpose.

Ancient Near Eastern cultures did not have police or courts the way cities do today.

Without a safe place to run, a family could take justice into their own hands immediately.

These cities gave someone time to reach a fair hearing instead of facing instant revenge.

🏙️ Cities of refuge means safe cities
✋ Joshua had to set six apart
⚔️ Ancient justice was often immediate
📖 Refuge gave time for a fair hearing

## 📜 Whereof I Spake Unto You By The Hand Of Moses

By the hand of Moses means this law was already given years earlier, not invented now.

Numbers chapter thirty five and Deuteronomy chapter nineteen both recorded this same command.

Moses gave the law in the wilderness, long before Israel ever crossed into Canaan.

Joshua's job here is not to write new law but to finally carry out an old one.

A promise made through Moses is now becoming a real, working system on the ground.

📜 This law came from Moses earlier
📚 Numbers and Deuteronomy both recorded it
🏜️ Moses gave it in the wilderness
📖 An old promise becomes a real system

## 🗡️ That The Slayer That Killeth Any Person Unawares And Unwittingly

Slayer here means someone who has killed another person, without saying yet whether it was murder.

Unawares means the death happened by accident, without the person even realizing danger was there.

Unwittingly means without any intention or plan to kill.

Together these two words draw a hard line between an accident and a deliberate murder.

The rest of this law only protects the first kind of killing, never the second.

🗡️ Slayer just means someone who killed
❓ Unawares means it happened by accident
🎯 Unwittingly means there was no intent
📖 This law never protects real murder

## 👤 They Shall Be Your Refuge From The Avenger Of Blood

Avenger of blood was the closest male relative of the person who had been killed.

That relative carried a family duty to track down and kill whoever caused the death.

This custom existed across the ancient Near East long before Israel had any court system.

A city of refuge stepped between that relative's raw anger and the accused person.

It gave the case a chance to be judged instead of settled by a blood feud.

👤 The avenger was the victim's nearest relative
🗡️ His family duty was to avenge blood
🌍 This custom was common in that era
📖 Refuge stopped a feud from taking over

# Joshua 20:4-6
# ⚖️ Judgment Comes Before Safety
---
## 🚪 Stand At The Entering Of The Gate Of The City

The gate of an ancient city was not just an entrance, it also worked as the courtroom.

Elders sat there daily to hear disputes and decide local legal matters.

A person fleeing for refuge had to publicly present himself there, not just hide inside.

Standing at the gate meant submitting to judgment, not escaping it.

The safest place in the city was also the place where his case would be tested first.

🚪 The gate doubled as the courtroom
👴 Elders sat there to judge disputes
🙋 He had to present himself publicly
📖 Refuge meant judgment, not hiding

## 🗣️ Declare His Cause In The Ears Of The Elders

Declare his cause means he had to explain out loud exactly what happened.

The elders were the respected older leaders who governed daily life in each city.

This was a first hearing, not yet a full trial.

It only decided whether he could enter the city at all.

Refuge was never automatic.

Someone always had to listen to his story first.

🗣️ He had to explain what happened
👴 Elders governed daily life locally
🚪 This decided entry, not guilt
📖 Refuge was never automatic

## 🛡️ They Shall Not Deliver The Slayer Up Into His Hand

This is the actual moment of legal protection kicking in.

Once inside, the city had to physically shield him from the avenger.

The avenger of blood had no legal right to enter and take him by force.

This protection only applied inside the refuge city itself, nowhere else.

Step outside its walls and that same protection disappeared instantly.

🛡️ Protection began once he was inside
🚫 The avenger could not force entry
🏙️ It only applied within that city
📖 Stepping outside removed the protection

## 💔 Hated Him Not Beforetime

Beforetime means before the killing ever happened.

This phrase checks for a history of hatred between the two men.

If they had never had bad blood before, that supports the story of an accident.

A hidden grudge discovered later could unravel the whole claim of innocence.

Motive mattered as much as the moment of the killing itself.

⏳ Beforetime means before it happened
💔 This checks for a prior grudge
🔍 A hidden grudge could undo the claim
➡️ Motive mattered, not just the moment

## 🏛️ Until He Stand Before The Congregation For Judgment

Congregation means the larger assembly of Israel, not just the city elders.

This was a second, formal stage beyond the earlier gate hearing.

Refuge bought time.

It never replaced an actual trial.

Nobody stayed protected without eventually facing this fuller judgment.

🏛️ Congregation means Israel's wider assembly
⏱️ This stage came after the gate hearing
⌛ Refuge bought time, not exemption
📖 A fuller trial still had to happen

## ⏳ Until The Death Of The High Priest

This set a real, but unpredictable, end date to his time in exile.

Nobody knew in advance when the high priest would die.

When the high priest did die, the slayer was free to go home permanently.

Many readers see something even bigger in this detail.

One death opening the way to a full return echoes what Jesus would later do for sinners.

⏳ Release came only at his death
❓ Nobody knew when that would happen
🏠 His death opened the way home
📖 Many see this pointing toward Jesus

# Joshua 20:7-8
# 🗺️ Six Cities Named For Refuge
---
## 📛 Kedesh In Galilee In Mount Naphtali

Kedesh had already appeared in the last chapter as a city inside Naphtali's territory.

Its name means holy or set apart, fitting for a city with this sacred legal role.

Kedesh was also one of the cities later given to the Levites to live in.

A city built to shelter the accused was also home to the priestly tribe.

That combination of roles was not an accident.

📛 Kedesh means holy or set apart
🗺️ It sat in Naphtali's territory
⛪ Levites also lived in Kedesh
📖 A refuge city, also a priest city

## ⛺ Shechem In Mount Ephraim

Shechem was already one of the most historic cities in the whole Bible by this point.

Abraham built his very first altar in Canaan at this same place.

Jacob later bought land and dug a well here that still bears his name.

Joseph's bones were eventually buried at Shechem, back in the land his family once left.

A city full of family history now also became a place of legal safety.

⛺ Abraham built his first Canaan altar here
🪣 Jacob dug a well at this site
⚰️ Joseph's bones were buried here
📖 History and refuge met in one city

## 📛 Kirjatharba Which Is Hebron

Kirjatharba was the older name for the city, meaning city of Arba.

The text explains it is the same place readers already know as Hebron.

Abraham, Isaac, and Jacob were all buried nearby in the cave of Machpelah.

Caleb had already received Hebron as his own personal inheritance back in chapter fourteen.

A city holding the patriarchs' graves also became a shelter for the living.

📛 Kirjatharba meant city of Arba
⚰️ The patriarchs were buried nearby
🙋 Caleb had inherited this city
📖 A burial ground became a shelter

## 🧭 On The Other Side Jordan By Jericho Eastward

This phrase marks a shift to the three cities across the Jordan river.

By Jericho eastward locates them relative to the famous city readers already know.

These lands belonged to Reuben, Gad, and half of Manasseh, the tribes who settled early.

Those tribes had asked for this territory even before the conquest of Canaan began.

Their earlier request in Numbers thirty two is being fulfilled here.

🧭 This marks the eastern side cities
🏙️ Jericho anchors the reader's location
🐑 Reuben, Gad, and Manasseh settled here
📖 Numbers thirty two is fulfilled here

## 🏜️ Bezer In The Wilderness Out Of The Tribe Of Reuben

Bezer sat out in open wilderness land, far less settled than cities west of the Jordan.

It belonged to the tribe of Reuben, Jacob's firstborn son.

Very little else is recorded about this city anywhere else in the Bible.

Even a city with almost no other story still mattered enough to protect the innocent.

Not every important place leaves behind a famous story.

🏜️ Bezer sat in open wilderness land
🐑 It belonged to the tribe of Reuben
📚 Little else is recorded about it
➡️ Even a quiet city mattered here

## ⚔️ Ramoth In Gilead Out Of The Tribe Of Gad

Ramoth in Gilead became famous generations later for a very different reason.

King Ahab was killed in battle there while trying to reclaim the city from Syria.

That battle is recorded fully in first Kings chapter twenty two.

A city first known for protecting the innocent later became a battlefield for a king.

The same ground carried two very different stories across the centuries.

⚔️ Ahab was later killed near Ramoth
👑 He died trying to retake the city
📚 First Kings twenty two tells that story
📖 One city, two very different stories

## 🗺️ Golan In Bashan Out Of The Tribe Of Manasseh

Golan sat in Bashan, a region of Manasseh's territory east of the Jordan.

This is the same name behind the modern Golan Heights region today.

An ancient refuge city's name has survived on maps for thousands of years.

Not every name from Joshua's time disappeared into history.

Some still mark real ground people argue over even now.

🗺️ Golan sat in Bashan, in Manasseh's land
🏔️ Its name survives as the Golan Heights
⏳ The name outlasted thousands of years
➡️ Old ground still matters today

# Joshua 20:9
# 🕊️ Refuge Reaches Every Israelite And Stranger
---
## 🌍 For The Stranger That Sojourneth Among Them

Stranger here means a foreigner living among Israel without being born into the nation.

Sojourn means to live somewhere temporarily, as a resident rather than a citizen.

This law protected that foreigner exactly the same as it protected a born Israelite.

Many ancient legal systems only protected their own citizens, not outsiders.

God's justice here reached further than the culture around Israel normally allowed.

🌍 Stranger means a foreigner living among them
🏕️ Sojourn means living there temporarily
⚖️ Foreigners got the same protection
📖 God's justice reached beyond Israel alone

## 💀 Not Die By The Hand Of The Avenger Of Blood

This closing verse repeats the exact danger named back at the start of the chapter.

That repetition was not careless writing.

Ancient authors often used repeats like this on purpose.

Without these cities, an accidental death could still end in a second death.

The whole chapter exists to stop that second death from happening.

🔁 This danger was named back in verse three
✍️ Repetition here was likely intentional
💀 Without refuge, one death could cause another
📖 The chapter exists to stop that

## 🔁 Until He Stood Before The Congregation

This same requirement already appeared once, back in verse six.

Even the last verse refuses to treat refuge as automatic freedom.

A trial before the wider assembly was always still coming.

Hebrews chapter six later borrows this same picture of fleeing for refuge.

It pictures believers fleeing to Christ the very same way.

🔁 This echoes the requirement from verse six
🚫 Refuge was never automatic freedom
⛪ Hebrews six echoes this same picture
📖 Believers flee to Christ the same way
`.trim();

export const JOSHUA_TWENTY_PERSONAL_SECTIONS = parseJoshuaTwentyRawNotes(JOSHUA_TWENTY_RAW_NOTES);
