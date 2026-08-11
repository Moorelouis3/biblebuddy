export type SecondSamuelEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelEightRawNotes(rawText: string): SecondSamuelEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 8:${startVerse}` : `2 Samuel 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 8 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_EIGHT_RAW_NOTES = `
# SecondSamuel 8:1-2
# 🗡️ David Subdues Philistines And Moab
---
## ⚔️ Smote The Philistines, And Subdued Them

Smote is an old word for struck down hard in battle.

This was not one skirmish but a whole campaign.

David had fought Philistines since he was a boy facing Goliath.

Here that lifelong threat finally comes to an end.

⚔️ Smote means struck down in battle

🛡️ This was a full campaign, not one fight

👦 David fought Philistines from boyhood onward

📖 A lifelong enemy is finally subdued

## 🐴 Took Methegammah Out Of The Hand Of The Philistines

Methegammah means the bridle of the mother city.

The mother city was Gath, the leading Philistine city.

Grabbing its bridle is a picture of taking full control of it.

First Chronicles names this same city plainly as Gath.

🐴 Methegammah means bridle of the mother city

🏙️ The mother city was Gath

✋ David took full control of it

📖 Chronicles names the city as Gath

## 📏 Measured Them With A Line

David uses a measuring line to sort the defeated Moabites into groups.

Two out of every three men were put to death.

One out of every three was spared and kept alive.

This was a harsh way that ancient kings judged a conquered people.

📏 A line sorted the defeated Moabites

⚰️ Two of three groups were killed

🧍 One of three groups was spared

📖 Ancient warfare showed little mercy

## 🤝 The Moabites Became David's Servants, And Brought Gifts

Gifts here means tribute, a required payment owed to a stronger king.

David once sent his own father and mother to Moab for safety.

That old friendly relationship is gone by this chapter.

Moab now pays yearly tribute to the very family it once sheltered.

🤝 Gifts means required tribute payments

🏃 David once sent his parents to Moab

💔 That old friendship no longer holds

📖 Moab now serves the king it once sheltered

# SecondSamuel 8:3-4
# 🐎 Victory Over Zobah
---
## 🗺️ Hadadezer, The Son Of Rehob, King Of Zobah

Zobah was an Aramean kingdom north of Israel, in modern day Syria.

Hadadezer ruled it as a growing rival power in the region.

He was marching toward the Euphrates River to expand his own border.

David stops that expansion before Hadadezer can finish it.

🗺️ Zobah was an Aramean kingdom to the north

👑 Hadadezer ruled it as a rival king

🛑 David stopped that expansion cold

📖 A rival king meets his match

## 🐴 A Thousand Chariots, And Seven Hundred Horsemen, And Twenty Thousand Footmen

These numbers describe the size of the army David defeated.

A chariot force this large belonged to a serious regional power.

Losing it all in one battle was a massive blow to Zobah.

David's smaller kingdom had just beaten a major military machine.

🔢 The numbers describe Hadadezer's army size

🏇 A chariot force this size meant real power

💥 Losing it all was a massive blow

📖 David's kingdom beat a major power

## 🐎 David Houghed All The Chariot Horses

Houghed means the leg tendons of the horses were cut.

That crippled the horses so they could never pull a war chariot again.

Israel's law warned kings against building up horses and chariots for themselves.

David kept back only enough horses for a hundred chariots.

🐎 Houghed means the leg tendons were cut

🚫 Crippled horses cannot pull a chariot

💯 Only a hundred chariots worth were kept

📖 Israel's law warned against trusting in horses

# SecondSamuel 8:5-6
# 🏙️ Damascus Falls
---
## 🏙️ Syrians Of Damascus Came To Succour Hadadezer

Succour is an old word meaning to come and help someone in trouble.

Damascus was another major Aramean city, allied closely with Zobah.

They send an army to rescue Hadadezer, but arrive too late to save him.

David defeats this second army in the very same campaign.

🤝 Succour means to come and help

🏙️ Damascus was allied with Zobah

⚔️ David defeated this second army too

📖 Their help arrived too late to matter

## 🙏 The LORD Preserved David Whithersoever He Went

Whithersoever is an old word simply meaning wherever.

This line does not credit David's own military skill.

It credits every one of these victories directly to God.

The chapter repeats this exact line again later, in verse fourteen.

🧭 Whithersoever means wherever

🙏 The victories are credited to God

🔁 This same line repeats in verse fourteen

📖 God, not skill, wins these battles

# SecondSamuel 8:7-8
# 🏆 Gold And Brass To Jerusalem
---
## 🛡️ The Shields Of Gold That Were On The Servants Of Hadadezer

These were not ordinary shields carried by common soldiers.

Gold shields like these marked Hadadezer's own royal guard or officers.

David captures the very symbols of the enemy king's honor.

Bringing them to Jerusalem makes the victory visible to everyone at home.

🛡️ These marked Hadadezer's royal guard

👑 They were symbols of his royal honor

🏙️ David brought them to Jerusalem

📖 A visible sign of victory at home

## 🔧 From Betah, And From Berothai... King David Took Exceeding Much Brass

Betah and Berothai were cities that belonged to Hadadezer.

Brass here means bronze, used for tools, weapons, and temple furnishings.

This same bronze is later used by David's son Solomon to build the temple.

A war David fought quietly supplies a building project decades later.

🏙️ Betah and Berothai belonged to Hadadezer

🔧 Brass means bronze, used for many things

🏛️ Solomon later used this bronze for the temple

📖 War plunder becomes worship material

# SecondSamuel 8:9-12
# 🎁 Toi's Gifts Dedicated To The Lord
---
## 🗺️ Toi King Of Hamath Heard...Smitten All The Host Of Hadadezer

Hamath was another Aramean kingdom, further north than Zobah.

Toi had his own long history of wars against Hadadezer.

David defeating his enemy is welcome news for Toi, not a threat.

News of a shared enemy's defeat can turn a stranger into an ally.

🗺️ Hamath was a kingdom north of Zobah

⚔️ Toi had his own wars with Hadadezer

😌 Hadadezer's defeat was good news for Toi

📖 A shared enemy created a new ally

## 👦 Toi Sent Joram His Son...To Salute Him, And To Bless Him

Sending his own son shows this greeting was serious, not casual.

Salute here means to formally greet a king in peace.

Bless means wishing David well and honoring his victory.

Joram carries this message along with gifts of real value.

👦 Sending his son showed real seriousness

🤝 Salute means a formal peaceful greeting

🙏 Bless means honoring David's victory

📖 Joram carried gifts alongside the message

## 🏺 Vessels Of Silver, And Vessels Of Gold, And Vessels Of Brass

Vessels here means bowls, cups, and containers fit for a royal household.

Naming all three metals shows the value and range of this gift.

This was a gift fit for one king to send another.

Toi is buying goodwill with genuine wealth, not empty words.

🏺 Vessels means bowls and containers

💰 Three metals show real value

👑 A gift fit for king to king

📖 Real wealth backed Toi's goodwill

## 🙏 Which Also King David Did Dedicate Unto The LORD

David does not keep this wealth for his own household.

He sets it apart for God, along with spoils from every nation he defeated.

Syria, Moab, Ammon, Philistia, and Amalek are all named in this list.

Every battle in this chapter ends the exact same way, pointed back toward God.

🙏 Dedicate means set apart for God

🌍 Spoils came from every defeated nation

📜 Syria, Moab, Ammon, Philistia, Amalek named

📖 Every victory points back to God

# SecondSamuel 8:13-14
# 🧂 The Valley Of Salt
---
## 🏆 David Gat Him A Name... In The Valley Of Salt, Being Eighteen Thousand Men

Gat him a name means David became famous for this specific victory.

The valley of salt sat near the Dead Sea, close to the border of Edom.

This verse calls the defeated men Syrians, but the next verse turns to Edom.

The parallel account in First Chronicles instead names the defeated people as Edomites.

Many scholars believe a copyist mixed up two similar Hebrew words for Aram and Edom.

🏆 Gat him a name means became famous

🧂 The valley of salt sat near Edom

📜 Chronicles names Edom, not Syria

📖 A copied word may explain the mismatch

## 🪖 He Put Garrisons In Edom...The LORD Preserved David Whithersoever He Went

Garrisons means stationed troops that kept control of a conquered region.

Edom sat south of the Dead Sea, another neighboring kingdom now under David.

This exact line about the LORD preserving David already appeared back in verse six.

Repeating it ties every campaign in this chapter to the same source.

🪖 Garrisons means stationed control troops

🗺️ Edom lay south, near the Dead Sea

🔁 This line already appeared in verse six

📖 One source stands behind every victory

# SecondSamuel 8:15-18
# 👑 David's Royal Cabinet
---
## ⚖️ David Reigned Over All Israel...Executed Judgment And Justice

This line marks a shift from the battlefield to the throne room.

Judgment and justice means David ruled his people with real fairness, not just power.

A king who wins wars still has to govern well at home.

The chapter pairs military victory with responsible leadership.

👑 The focus shifts to David's throne

⚖️ Judgment and justice means fair rule

🏛️ Winning wars was not enough alone

📖 Victory is paired with responsible rule

## 📜 Joab...Was Over The Host, And Jehoshaphat...Was Recorder

Host here means the army, and Joab commanded every part of it.

A recorder was a high state official who kept the official royal records.

Think of the recorder as part historian, part chief of protocol.

David's kingdom now runs with real government structure, not just a warband.

⚔️ Host means the army, led by Joab

📜 A recorder kept the official records

🏛️ Part historian, part chief of protocol

📖 A real government, not just a warband

## 🙏 Zadok...And Ahimelech The Son Of Abiathar, Were The Priests

This verse lists the priestly names in a surprising order.

Elsewhere in scripture Abiathar is the son of Ahimelech, not the reverse.

Many scholars believe a later copyist swapped the two names by mistake.

Zadok and Abiathar serving together as priests matters later in David's story.

🙏 The names appear reversed in this verse

👨‍👦 Abiathar was really the son of Ahimelech

📜 A copyist likely swapped the order

📖 Zadok and Abiathar both matter later

## 🛡️ Benaiah...Was Over Both The Cherethites And The Pelethites

The Cherethites and Pelethites formed David's own personal bodyguard.

Many scholars believe these were foreign soldiers, possibly from Crete and Philistia.

They answered directly to David, not the regular army chain of command.

A king once hunted by Saul now keeps his own trusted guard close.

🛡️ David's own personal bodyguard unit

🌍 Likely foreign soldiers, not Israelites

👑 They answered directly to David

📖 A hunted man now guards himself well

## 👨‍👦 David's Sons Were Chief Rulers

The Hebrew word behind chief rulers can also be read as priests.

David's sons were not Levites, so an actual priestly role would break the normal rule.

The parallel account in Chronicles instead calls them chief officials at the king's side.

Most scholars read this as a title of high honor, not a priesthood.

🚫 David's sons were not Levites

📜 Chronicles calls them chief officials

👑 A title of honor, not priesthood

📖 The word can also mean priests
`.trim();

export const SECOND_SAMUEL_EIGHT_PERSONAL_SECTIONS = parseSecondSamuelEightRawNotes(SECOND_SAMUEL_EIGHT_RAW_NOTES);
