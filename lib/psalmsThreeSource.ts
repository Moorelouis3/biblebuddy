export type PsalmsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThreeRawNotes(rawText: string): PsalmsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 3:${startVerse}` : `Psalms 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 3 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THREE_RAW_NOTES = `# Psalms 3:1-2
# 😰 Surrounded On Every Side
---
## 🔎 Lord, How Are They Increased That Trouble Me

This verse uses "Lord" with only the first letter capitalized.

That specific capitalization marks the Hebrew word Adonai, meaning Master.

Later in this same psalm, "LORD" appears fully capitalized instead.

Full capitals like that always mark the personal name of God, YHWH.

David addresses God two different ways within one short prayer.

🔎 Lord with one capital marks the word Adonai

👑 Adonai means Master or Sovereign

✨ LORD in full capitals marks God's own name

📖 David addresses God two different ways here

## 😰 Many Are They That Rise Up Against Me

This psalm carries a heading identifying it as David's psalm from the days of Absalom's rebellion.

Absalom was David's own son, and that revolt is told in full in Second Samuel fifteen through eighteen.

"Rise up" pictures people standing in open, active opposition.

Some of these people were once David's own loyal supporters.

😰 This psalm comes from Absalom's rebellion

👨‍👦 Absalom was David's own son

🧍 Rise up means open, active opposition

📖 Even loyal allies can defect

## 🚫 There Is No Help For Him In God

This attack targets David's faith, not only his throne.

His enemies claim God has already abandoned him completely.

That claim is designed to break David's trust before any battle even starts.

Words aimed at someone's faith can wound as deeply as a weapon.

🗣️ Enemies attack David's faith directly

🚫 They claim God has abandoned him

💭 The goal is to break his trust

📖 Words can wound like a weapon

## 🎵 Selah

"Selah" appears three times in this short psalm alone.

No one knows its exact meaning for certain today.

Many scholars believe it marked a pause, maybe for music or quiet reflection.

It invites the reader to stop and sit with what was just said.

🎵 Selah appears three times in this psalm

❓ Its exact meaning is not fully known

⏸️ Many scholars believe it marked a pause

📖 It invites a moment to reflect

# Psalms 3:3-4
# 🛡️ But Thou, O LORD
---
## 🛡️ But Thou, O LORD, Art A Shield For Me

The word "but" marks a sharp turn from verse two.

The enemies just said God offers no help at all.

David answers that claim directly and immediately.

A shield was carried to block real, physical blows in battle.

David pictures God standing directly between himself and every attack.

🔄 But marks a sharp turn here

🗣️ David answers the enemies directly

🛡️ A shield blocked real blows in battle

📖 God stands between David and every attack

## 🙌 My Glory, And The Lifter Up Of Mine Head

"Glory" here means David's honor and reputation, not physical light.

A bowed, downcast head was a picture of shame or deep sorrow.

"The lifter up of mine head" means God restores that honor personally.

David pictures God's own hand reaching down to lift his head back up.

👑 Glory means David's honor and reputation

😔 A bowed head pictured shame or sorrow

🙌 God personally lifts that head back up

📖 God restores honor David could not restore alone

## 🗣️ I Cried Unto The LORD With My Voice

This was not a quiet, private thought.

David prayed out loud, with real sound.

Crying out loud takes a different kind of honesty than a silent prayer.

He was not ashamed to be heard asking for help.

🗣️ David prayed out loud, not silently

😢 Cried pictures real, audible desperation

💪 Honest prayer does not hide the need

📖 He was not ashamed to ask for help

## 🏔️ He Heard Me Out Of His Holy Hill

"His holy hill" points to Zion, the hill in Jerusalem where the ark of the covenant rested.

David had just fled that very city because of Absalom's rebellion.

Even far from Zion, David trusted that God's attention was not limited by distance.

God heard him no matter how far from home he actually was.

🏔️ Holy hill means Zion in Jerusalem

🏃 David had just fled that very city

📏 Distance did not limit God's attention

📖 God heard him far from home

# Psalms 3:5-6
# 😴 Fearless In The Middle Of Danger
---
## 😴 I Laid Me Down And Slept

Sleep here is not a small, ordinary detail.

David was a hunted king in the middle of an active rebellion.

Falling into deep, undefended sleep took real trust, not recklessness.

Fear usually keeps a person wide awake, not resting peacefully.

😴 Sleep here is not a small detail

👑 David was a hunted king at the time

🛌 Deep sleep here took real trust

📖 Fear usually keeps people awake, not resting

## 🤲 I Awaked, For The LORD Sustained Me

Waking up safely was not something David could guarantee for himself.

"Sustained" means God actively held him up through the whole night.

David gives credit for his own survival to God, not to luck.

The same God who let him sleep also kept him breathing until morning.

⏰ Waking up safely was never guaranteed

🤲 Sustained means God actively held him up

🙌 David credits God, not luck

📖 God kept him safe through the night

## 🔢 I Will Not Be Afraid Of Ten Thousands Of People

"Ten thousands" is not meant as an exact headcount.

It pictures an overwhelming, almost impossible number of enemies.

David is not claiming to feel nothing at all.

He is choosing trust in God over the fear those numbers would normally cause.

🔢 Ten thousands pictures an overwhelming number

😨 David is not claiming to feel nothing

🤝 He chooses trust over natural fear

📖 Courage here comes from trust, not numbers

# Psalms 3:7-8
# 🙏 Salvation Belongs To The LORD
---
## ⬆️ Arise, O LORD

"Arise" pictures someone standing up, ready to act.

This is the same word used for the enemies rising up back in verse one.

David takes that same word and points it straight at God.

He is asking God to stand up and personally get involved.

⬆️ Arise pictures someone standing to act

🔁 This echoes the rising enemies from verse one

🎯 David points that same word at God

📖 He asks God to get personally involved

## 🙏 Save Me, O My God

David does not simply ask God to watch from a distance.

He asks to be personally rescued, not just comforted.

"O my God" keeps this request deeply personal, not a general prayer.

This is the same closeness claimed all through this short psalm.

🙏 David asks to be personally rescued

🤲 Not comfort alone, real rescue

❤️ My God keeps this deeply personal

📖 Personal closeness runs through this whole psalm

## 👋 Thou Hast Smitten All Mine Enemies Upon The Cheek Bone

Striking someone on the cheek was a public insult in this culture.

Here the insult is reversed completely, and it lands on David's enemies instead.

David speaks about this as if God had already finished the job.

His confidence in this prayer is already treated as settled fact.

👋 A cheek strike was a public insult

🔄 That insult now lands on David's enemies

✅ David speaks as if it is already done

📖 His confidence outruns the actual battle

## 🦷 Thou Hast Broken The Teeth Of The Ungodly

Teeth here picture an animal's power to bite and tear.

Breaking an attacker's teeth pictures removing its power to do harm.

"Ungodly" simply means those who live without regard for God.

David is not just asking for safety, he pictures his enemies made harmless.

🦷 Teeth picture the power to bite and harm

🚫 Broken teeth means that power is removed

😈 Ungodly means living without regard for God

📖 David pictures his enemies made harmless

## 🏆 Salvation Belongeth Unto The LORD

This is the whole psalm's conclusion in one line.

David never once claims he saved himself.

"Belongeth" means salvation is something only God actually owns and gives.

The psalm that opened in panic ends in calm, settled confidence.

It closes by turning outward, blessing not just David but all of God's people.

🏆 Salvation belongs to God alone

🙅 David never claims he saved himself

🔄 The psalm moves from panic to confidence

📖 It ends blessing God's whole people
`.trim();

export const PSALMS_THREE_PERSONAL_SECTIONS = parsePsalmsThreeRawNotes(PSALMS_THREE_RAW_NOTES);
