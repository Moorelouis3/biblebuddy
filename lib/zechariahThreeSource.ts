export type ZechariahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahThreeRawNotes(rawText: string): ZechariahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 3:${startVerse}` : `Zechariah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 3 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_THREE_RAW_NOTES = `# Zechariah 3:1-2
# ⚖️ Satan Accuses The High Priest
---
## 🧍 Joshua The High Priest Standing Before The Angel Of The LORD

Joshua here is not the famous Joshua who led Israel into the land long before.

This Joshua lived centuries later, serving as high priest after the Babylonian exile.

The high priest was the one man allowed to represent the whole nation before God.

Standing before the angel of the LORD puts him in the highest court that exists.

This scene plays out like a trial, and Joshua stands as the one on trial.

🧍 Not the Joshua from the conquest
⏳ Lived centuries later after the exile
👳 High priest represented the whole nation
📖 This scene plays out like a trial

## ⚔️ Satan Standing At His Right Hand To Resist Him

Satan means adversary, someone who stands against another in open opposition.

The right hand was the position of a prosecutor in an ancient court.

Satan takes that exact spot here.

He brings a formal accusation against Joshua.

This is not a quiet temptation scene.

It is a courtroom confrontation out in the open.

⚔️ Satan means adversary or accuser
⚖️ Right hand was the prosecutor's spot
📣 Satan formally accuses Joshua here
➡️ This is confrontation, not temptation

## 🛑 The LORD Rebuke Thee, O Satan

Rebuke means to speak out sharply to stop something.

The LORD repeats this exact rebuke twice in the same breath.

Repeating a command like this was a way to show absolute authority.

God also calls himself the one who chose Jerusalem.

That choice is a promise already made, not a new judgment on Joshua.

Satan's accusation cannot undo a promise God already gave.

🔁 LORD repeats the rebuke twice
👑 Repetition shows absolute authority here
🏙️ God chose Jerusalem long before this
📖 A promise outweighs any accusation

## 🔥 Is Not This A Brand Plucked Out Of The Fire

A brand is a burning stick pulled out of a fire before it turns to ash.

The LORD uses this picture to describe Joshua and the whole nation after exile.

Judah had already been through the fire of Babylon's destruction.

The nation nearly lost everything in that disaster.

God is saying Joshua was rescued at the very last moment.

This image turns Satan's accusation into proof of God's mercy instead.

🔥 A brand is a burning stick
💥 Pictures Judah after Babylon's destruction
🙌 Joshua was rescued at the last moment
📖 Mercy, not merit, saved him

# Zechariah 3:3-5
# 🧥 Filthy Garments Become Clean
---
## 🧥 Joshua Was Clothed With Filthy Garments

Filthy here does not mean just a little dusty or wrinkled.

The word pictures garments stained with human waste, the lowest kind of uncleanness.

Priests were required to wear spotless clothing to serve in God's presence.

Joshua standing there in filthy garments pictures guilt, not poor hygiene.

This is the courtroom picture of sin itself, displayed for everyone to see.

🧥 Filthy means stained with waste
🚫 Priests required spotless clothing to serve
⚖️ Pictures guilt, not poor hygiene
📖 Sin itself stands on display

## ✋ Take Away The Filthy Garments From Him

This command comes in the middle of Satan's own accusation.

Removing the garments means removing the guilt they represented.

It is not simply a change of clothes.

The command comes before Joshua does anything to earn it.

God acts first, and Joshua simply stands there while it happens.

🗣️ A command spoken mid accusation
♻️ Removes guilt, not just garments
⏳ Comes before Joshua earns it
➡️ God acts first, Joshua just stands

## ⚖️ I Have Caused Thine Iniquity To Pass From Thee

Iniquity means guilt that comes from real wrongdoing.

To pass from thee pictures guilt being physically carried away.

God states this as something already finished.

Joshua never asks for this, God simply declares it done.

This same picture gets developed fully later in the Day of Atonement rituals.

⚖️ Iniquity means real guilt from sin
🚶 Pictures guilt carried away completely
✅ Already done, not something requested
📖 Echoes the Day of Atonement

## 👔 Clothe Thee With Change Of Raiment

Raiment simply means clothing, often something fine or formal.

A change of raiment pictures a full change of status.

It is more than a fresh outfit.

Clean clothing after removed guilt shows the exchange is already complete.

Joshua moves from accused to approved without doing anything himself in between.

👔 Raiment means fine formal clothing
🔄 Pictures a full change of status
✅ Shows the exchange already complete
➡️ Joshua moves from accused to approved

## 👑 Set A Fair Mitre Upon His Head

A mitre was a special turban worn only by the high priest.

Fair here means clean and beautiful, not merely acceptable.

The mitre held a gold plate inscribed with words set apart to the LORD.

Putting it back on Joshua restores him fully to his priestly office.

👑 Mitre was the high priest's turban
✨ Fair means clean and beautiful
🏷️ Gold plate marked him set apart
📖 Fully restores his priestly office

## 👀 The Angel Of The LORD Stood By

Stood by means he remained present, watching the whole scene unfold.

He does not leave once the robing finishes.

His presence through the entire change signals approval of what just happened.

The one who first defended Joshua stays to confirm his restoration.

👀 Stood by means stayed present
⏳ Watched the whole change happen
✅ His presence signals full approval
📖 Confirms Joshua's complete restoration

# Zechariah 3:6-7
# 📜 The Charge To Walk In God's Ways
---
## 📜 The Angel Of The LORD Protested Unto Joshua

Protested here is an old word meaning to solemnly charge or instruct.

It does not mean to object or complain.

This formal charge comes right after Joshua's restoration, not before it.

Being clothed with clean garments comes with real responsibility attached.

Grace here is not the end of the story.

It leads straight into a calling.

📜 Protested means to solemnly charge
⚠️ A formal charge, not an objection
🧥 Comes right after his restoration
➡️ Grace leads into a calling

## 🚶 If Thou Wilt Walk In My Ways

Walking in God's ways means living by his commands day after day.

This phrase sets a real condition on everything just promised to Joshua.

Being restored does not erase the need to actually obey going forward.

The calling now matches the office Joshua has just been given back.

🚶 Walking means daily obedience
⚖️ A real condition, not a formality
🔄 Restoration does not erase obedience
📖 The calling matches the office

## 🏛️ Judge My House, And Shalt Also Keep My Courts

My house refers to the temple, the center of worship in Jerusalem.

Judging the house means overseeing right worship and right conduct there.

Keeping the courts means guarding who enters and how they behave inside.

Joshua is being handed real daily authority, not just a title.

🏛️ My house means the temple
⚖️ Judging means overseeing right worship
🚪 Keeping the courts means guarding access
📖 Real authority, not just a title

## 👼 Places To Walk Among These That Stand By

Those that stand by refers to the angels present in this very scene.

God promises Joshua access into that same company.

That is a remarkable honor for a human priest to receive.

This is not a demotion back to ordinary duty.

It is a promotion into company Joshua could never have earned alone.

👼 Those that stand by are angels
🙌 Joshua gains access to their company
⬆️ A promotion, not ordinary duty
➡️ Honor Joshua could never earn alone

# Zechariah 3:8-10
# 🌿 The Branch And The Stone
---
## 🔮 They Are Men Wondered At

They refers to the other priests serving alongside Joshua, called his fellows in this verse.

Wondered at means they themselves stand as a sign pointing to something greater.

Their presence is not random.

It hints at a bigger promise about to be named.

Watching them should make a person ask what exactly they are signs of.

👥 They means the other priests
🔮 Wondered at means they are signs
➡️ They point to a bigger promise
📖 Their presence raises a real question

## 🌿 I Will Bring Forth My Servant The BRANCH

The Branch is a title for a coming king from David's own family line.

Other prophets use this same title for the same promised figure.

Branch pictures new growth springing up from a tree that looked finished.

This promise points far beyond Joshua to someone still to come.

🌿 Branch names a coming king
👑 From David's own family line
🌳 Pictures new growth from old roots
📖 Points beyond Joshua to someone greater

## 🪨 The Stone That I Have Laid Before Joshua

This stone is a separate symbol from the Branch just promised.

Laying a stone pictures starting a major building project.

It often pictures a temple or a foundation.

God himself is the one who lays it, not Joshua or any human builder.

The whole promise rests on a foundation God provides.

🪨 Stone symbolizes a building project
🏗️ Often pictures a temple foundation
🙌 God lays it, not Joshua
📖 The foundation comes from God

## 👁️ Upon One Stone Shall Be Seven Eyes

Seven in scripture often pictures completeness, not a literal count of seven items.

Eyes picture watching, so seven eyes picture total and perfect watchfulness.

Nothing about this stone's foundation will be missed or left unguarded.

God's attention over this plan is as complete as the plan itself.

🔢 Seven pictures completeness in scripture
👁️ Eyes picture careful watching
🔍 Nothing about this stone is missed
📖 God's attention matches his plan

## ✍️ I Will Engrave The Graving Thereof

Engraving means cutting words or images permanently into stone or metal.

Priests already wore engraved stones on their garments, so this picture was familiar.

Here God himself does the engraving.

That makes the mark permanent and his own.

This is not decoration, it is a lasting seal of ownership.

🔨 Engraving cuts marks permanently
💎 Priests already wore engraved stones
✍️ God himself does this engraving
📖 A permanent seal of ownership

## 🌍 Remove The Iniquity Of That Land In One Day

This promise widens from Joshua's own guilt out to the whole land.

One day points to a single decisive moment, not a slow process.

Many readers connect this moment to the future work pictured by the Branch.

A guilt that took centuries to build up gets erased in an instant.

🌍 Widens from Joshua to the whole land
⏱️ One day means a single moment
🌿 Connects to the Branch promised above
📖 Centuries of guilt erased instantly

## 🍇 Every Man His Neighbour Under The Vine And Under The Fig Tree

Sitting under your own vine and fig tree was a common picture of peace and safety.

It meant having land, a home, and enough time to simply rest there.

Neighbours sharing this picture together points to peace across the whole community.

The chapter that opened with an accusation closes on a picture of total rest.

🍇 Vine and fig tree picture peace
🏡 Having land and time to rest
🤝 Peace reaches the whole community
📖 Accusation ends in total rest
`.trim();

export const ZECHARIAH_THREE_PERSONAL_SECTIONS = parseZechariahThreeRawNotes(ZECHARIAH_THREE_RAW_NOTES);
