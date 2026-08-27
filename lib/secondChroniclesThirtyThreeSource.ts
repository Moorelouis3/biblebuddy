export type SecondChroniclesThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyThreeRawNotes(rawText: string): SecondChroniclesThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 33:${startVerse}` : `2 Chronicles 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Second Chronicles 33 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_THREE_RAW_NOTES = `# SecondChronicles 33:1-4
# 👑 Manasseh Undoes His Father's Reforms
---
## Twelve Years Old When He Began To Reign

A twelve year old boy now sits on the throne of Judah.

His father Hezekiah spent his whole reign tearing down idols.

Manasseh grows up as king before he can learn that legacy for himself.

A throne inherited too young can undo years of reform in one generation.

👶 Manasseh was only twelve years old

👑 He inherited Hezekiah's reformed kingdom

📉 A young king can undo years of reform

📖 Legacy is never automatically passed down

---

## Reigned Fifty And Five Years In Jerusalem

Manasseh's reign lasts fifty five years.

That is the longest reign of any king in Judah's whole history.

Long life does not always mean a good life before God.

Judah lives under his idolatry for over half a century.

📆 Fifty five years is the longest reign

👑 Longer than any king of Judah

💔 Long life did not mean godliness

📖 Judah suffered idolatry for decades

---

## Like Unto The Abominations Of The Heathen

"Heathen" refers to the nations who lived in Canaan before Israel arrived.

"Abominations" means practices God considered utterly detestable.

God had removed those nations from the land specifically because of practices like these.

Manasseh brings back the very sins the land was cleared of generations earlier.

🌍 Heathen means the nations before Israel

🚫 Abominations means detestable practices

🏞️ God removed nations for these sins

📖 Manasseh revives what was already judged

---

## Built Again The High Places Which Hezekiah His Father Had Broken Down

"High places" were hilltop shrines used for pagan worship.

Hezekiah tore every one of them down during his reign.

Manasseh personally rebuilds what his own father destroyed.

This is not passive drift into sin.

It is a deliberate reversal of his father's legacy.

⛰️ High places means hilltop pagan shrines

🔨 Hezekiah had torn them all down

🔁 Manasseh rebuilds what his father destroyed

📖 This reversal was deliberate, not accidental

---

## Reared Up Altars For Baalim, And Made Groves

"Baalim" is the plural of Baal, a storm and fertility god worshiped across Canaan.

"Groves" refers to wooden poles or trees dedicated to Asherah, a Canaanite goddess.

Together these were the two most common pagan altars in the ancient Near East.

Manasseh does not invent new sins here.

He revives the oldest ones Israel was warned about from the beginning.

⛈️ Baalim means the many local Baal gods

🌳 Groves means wooden poles for Asherah

🏺 These were the oldest Canaanite idols

📖 Manasseh revived Israel's earliest temptation

---

## Worshipped All The Host Of Heaven

"Host of heaven" means the sun, moon, and stars.

Worshiping the sky was common across the Assyrian empire.

Assyria controlled Judah's politics during this exact period.

Manasseh's religion mirrors the empire Judah now lived under.

Political submission had turned into spiritual submission as well.

⭐ Host of heaven means sun, moon, stars

🏛️ Assyria ruled the region politically

🤝 Judah was under Assyrian control

📖 Political submission became spiritual submission

---

## Built Altars In The House Of The LORD

Manasseh does not stop at hilltop shrines outside the city.

He brings pagan altars directly into God's own temple.

This was the most direct insult a king of Judah could offer God.

The place built for God's name now hosted the gods God had condemned.

🏛️ Pagan altars enter the temple itself

⚡ This was the most direct insult

🚫 God's house held condemned gods

📖 Worship space itself became corrupted

---

## In Jerusalem Shall My Name Be For Ever

This is God's own promise, spoken earlier to David and to Solomon.

God chose Jerusalem to hold His name forever.

The temple was that specific chosen place.

Manasseh fills that exact promised space with idols instead.

The place meant to honor God's name forever now dishonors it directly.

🕊️ God once promised His name would stay

🏛️ Jerusalem was that chosen place

💔 Manasseh filled it with idols instead

📖 The promised place was directly defiled

# SecondChronicles 33:5-6
# 🔥 The Worst King Judah Had Seen
---
## Altars For All The Host Of Heaven In The Two Courts

The temple had two courts, one inner and one outer.

Priests used the inner court, and the people used the outer one.

Manasseh fills both of them with altars to the sun, moon, and stars.

This was not one act of rebellion tucked away quietly.

It filled every space of public worship with idolatry.

🏛️ The temple had two separate courts

⭐ Star worship altars filled both courts

👥 Priests and common people both saw it

📖 Idolatry became fully public, not hidden

---

## Caused His Children To Pass Through The Fire

This describes child sacrifice, offered to a god named Molech.

It happened in the valley of Hinnom, just outside Jerusalem's walls.

That same valley later became the New Testament image for judgment, called Gehenna.

A place tied to burning children became the Bible's picture of judgment itself.

🔥 This describes child sacrifice to Molech

🏞️ It happened in the valley of Hinnom

⚰️ That valley later became Gehenna

📖 Judgment imagery grew from this horror

---

## Observed Times, And Used Enchantments

"Observed times" means reading omens from the sky or events to predict the future.

"Enchantments" means practicing sorcery or magic spells.

Both practices were specifically forbidden in the law Moses gave Israel.

Manasseh turns to exactly what God had warned his people to avoid.

🌙 Observed times means reading omens

✨ Enchantments means sorcery and spells

📜 Both were forbidden under Moses' law

📖 Manasseh chose what God warned against

---

## Dealt With A Familiar Spirit, And With Wizards

A "familiar spirit" refers to a spirit believed to relay messages from the dead.

"Wizards" were people who claimed to speak with the dead for someone else.

King Saul once secretly consulted a medium just like this.

That choice ended in disaster for him.

Manasseh does openly what even Saul only tried in secret.

👻 Familiar spirit means a spirit of the dead

🔮 Wizards means mediums who claimed contact

👑 Saul once did this in secret

📖 Manasseh did it openly as king

# SecondChronicles 33:7-9
# 🗿 The Idol In God's Own House
---
## Set A Carved Image In The House Of God

Manasseh places a carved idol inside the temple building itself.

This was not an altar in the courtyard anymore.

It was an idol standing where God's own presence was meant to dwell.

No earlier king of Judah had ever gone this far.

🗿 A carved idol enters the temple building

🏛️ Not the courtyard, the building itself

👑 No earlier king had gone this far

📖 The idol replaced God's own presence

---

## Will I Put My Name For Ever

God made this promise to David and to Solomon specifically about this temple.

Jerusalem was chosen out of every tribe of Israel to hold God's name.

Manasseh sets an idol in the very place that promise was made about.

Judah's most sacred promise is now openly ignored.

🕊️ God promised His name would stay here

👑 The promise was made to David and Solomon

🌍 Jerusalem was chosen from every tribe

📖 That promise is now openly ignored

---

## Neither Will I Any More Remove The Foot Of Israel

God also promised Israel a lasting hold on the promised land.

That promise depended on Israel actually obeying God's commands.

It was never an unconditional guarantee no matter what Israel did.

Manasseh's actions now put that very promise at risk.

🏞️ God promised the land would stay theirs

⚖️ That promise depended on obedience

🚫 It was never unconditional

📖 Manasseh's sin threatened the land itself

---

## According To The Whole Law And The Statutes And The Ordinances

"Law" refers to the broad teaching and instruction Moses gave Israel.

"Statutes" means fixed rules engraved as permanent decrees.

"Ordinances" means specific case by case judgments applied to real situations.

Together these three words cover the entire body of instruction Moses handed down.

📜 Law means Moses' broad instruction

🪨 Statutes means fixed, engraved rules

⚖️ Ordinances means specific case judgments

📖 Together they cover all of Moses' teaching

---

## To Do Worse Than The Heathen

The heathen nations were the very people God removed from Canaan for their sin.

Manasseh leads Judah to sin more severely than the nations God had already judged.

That is a remarkable line for Chronicles to state so plainly.

Judah becomes worse than the very example it was supposed to replace.

🌍 Heathen means the nations already judged

📉 Judah now sins worse than them

😔 Chronicles states this plainly

📖 Judah's example became worse than the original

# SecondChronicles 33:10-13
# ⛓️ Manasseh's Capture And Repentance
---
## The LORD Spake To Manasseh, And To His People

God's warning was not aimed at the king alone.

It reached the ordinary people of Judah as well.

Second Kings names specific prophets God sent during this time.

A whole nation had the chance to turn back before judgment came.

🗣️ The warning reached the whole nation

👑 Not just Manasseh, but his people too

📜 Prophets carried this warning at the time

📖 A whole nation had the chance to turn

---

## But They Would Not Hearken

"Hearken" means to listen and actually respond, not just hear.

Judah heard the warning and chose to ignore it anyway.

This refusal is what finally brings God's judgment through Assyria.

A warning ignored long enough eventually becomes a consequence.

👂 Hearken means to listen and obey

🙉 Judah heard but refused to respond

⚠️ Refusal led directly to judgment

📖 Ignored warnings become real consequences

---

## Captains Of The Host Of The King Of Assyria

"Host" here means an army.

Assyria was the dominant empire controlling this whole region at the time.

Assyrian records outside the Bible actually name Manasseh directly.

He appears there as a vassal king who paid tribute to them.

God used this real political power to bring Manasseh low.

⚔️ Host means an army

🏛️ Assyria ruled the region politically

📜 Assyrian records even name Manasseh

📖 God used real power to judge him

---

## Took Manasseh Among The Thorns

This unusual phrase likely describes Manasseh being caught while hiding.

Some translations describe this as being taken with hooks.

That was a known Assyrian method for leading captives away.

Either way, the image is the same, a king caught with no dignity left.

Judah's most powerful man was captured like a common criminal.

🌵 Thorns suggests capture while hiding or fleeing

🪝 Some translations describe hooks used on captives

😳 The image shows total loss of dignity

📖 Judah's most powerful man was caught

---

## Bound Him With Fetters, And Carried Him To Babylon

"Fetters" means bronze shackles used to restrain prisoners.

Babylon was under Assyrian control at this point in history.

It was used here as a place of exile.

The king who filled God's temple with idols is now dragged away in chains.

⛓️ Fetters means bronze shackles

🏛️ Babylon was under Assyrian control then

👑 Judah's king now wears chains himself

📖 The idol maker becomes a prisoner

---

## Besought The LORD His God, And Humbled Himself Greatly

"Besought" means he pleaded earnestly.

Exile and captivity finally bring Manasseh to genuine repentance.

Notice the wording here.

He turns back to the God of his fathers, not a foreign god.

The worst king in Judah's history still finds his way back to God.

🙏 Besought means to plead earnestly

⛓️ Captivity led to real repentance

👴 He returned to his fathers' God

📖 Even the worst king could turn back

---

## Then Manasseh Knew That The LORD He Was God

This is the turning point of Manasseh's whole story.

Decades of idolatry had never taught him this simple truth.

It took losing his throne, his freedom, and his dignity for him to finally see it.

Sometimes the loudest lesson only lands after everything else is stripped away.

💡 This marks Manasseh's true turning point

👑 Decades of idolatry taught him nothing

⛓️ Losing everything finally opened his eyes

📖 Hard loss can teach what comfort could not

# SecondChronicles 33:14-17
# 🧱 Manasseh Tries To Undo The Damage
---
## Built A Wall Without The City Of David

"Without" here is an old word meaning outside, not lacking something.

Manasseh strengthens Jerusalem's defenses after returning from captivity.

This mirrors the same defensive work his father Hezekiah once did.

A king once conquered now spends his second chance preparing for the next threat.

🧱 Without means outside, not lacking

🏙️ Manasseh strengthens Jerusalem's defenses

👴 This mirrors Hezekiah's earlier preparations

📖 His second chance went toward real preparation

---

## Compassed About Ophel, And Raised It Up A Very Great Height

"Ophel" was a specific raised section of Jerusalem near the temple.

"Compassed about" means he built the wall all the way around it.

Building it to a great height shows real, costly investment.

This was serious work, not a quick patch job.

🏙️ Ophel was a raised area near the temple

🧱 Compassed about means built all the way around

📏 A great height meant real investment

📖 This was serious work, not a patch

---

## Put Captains Of War In All The Fenced Cities Of Judah

"Fenced cities" means cities protected by walls, Judah's fortified towns.

Manasseh stations military commanders throughout the whole kingdom.

This reaches far beyond the capital city alone.

This was a national defense strategy, not a single city project.

🏰 Fenced cities means walled, fortified towns

🪖 Commanders were placed nationwide

🗺️ This covered the whole kingdom

📖 National defense followed his repentance

---

## Took Away The Strange Gods, And The Idol

Manasseh personally removes the very idols he once installed himself.

"The idol" here points back to the carved image he set up in verse seven.

He physically undoes the worst act of his own reign.

Nothing about this reversal was symbolic only.

🗑️ Manasseh removes his own idols

🗿 The idol recalls verse seven's image

🔄 He personally undoes his worst act

📖 Repentance included real, physical action

---

## Repaired The Altar Of The LORD

The true altar had been neglected during years of idol worship.

Manasseh restores it and offers sacrifices there again.

"Peace offerings" and "thank offerings" expressed restored relationship and gratitude toward God.

Proper worship was finally returning to its rightful place.

🛠️ The true altar had been neglected

🕊️ Peace offerings expressed restored relationship

🙏 Thank offerings expressed gratitude

📖 Proper worship returned to its place

---

## Yet Unto The LORD Their God Only

The people keep sacrificing at hilltop shrines instead of the temple alone.

That practice still broke God's actual instructions for worship.

Notice one important detail though.

They still directed that worship to the true God, not to idols.

Manasseh's reform was real, but it was not complete.

⛰️ People still worshiped at high places

📜 That practice broke God's instructions

🙏 They worshiped the true God there though

📖 Real reform can still be incomplete

# SecondChronicles 33:18-20
# 📜 Manasseh's Legacy And Death
---
## The Words Of The Seers That Spake To Him

"Seers" is an older word for prophets, people who received messages from God.

Multiple prophetic voices spoke directly to Manasseh during his reign.

This happened not just before or after his repentance, but throughout it.

Even the worst king in Judah's history still received warning.

👁️ Seers means prophets who spoke for God

🗣️ Several seers spoke directly to Manasseh

⚠️ He was never left without warning

📖 God kept sending voices, even to him

---

## Written In The Book Of The Kings Of Israel

This is not the biblical book of Kings that we read today.

Chronicles regularly points to outside historical records that no longer exist.

These events were documented in real time.

They were not invented after the fact.

📚 This is a lost historical record

🚫 Not the biblical book of Kings

🕰️ Chronicles often cites now lost sources

📖 These events were documented as they happened

---

## His Prayer Also, And How God Was Intreated Of Him

"Intreated" means God was moved and persuaded to respond by his pleading.

The exact words of Manasseh's prayer are not preserved anywhere in scripture.

Later Jewish and Christian writers found this story deeply moving.

They eventually wrote their own version of what that prayer might have said.

The event mattered even without its exact wording being recorded.

🙏 Intreated means God was moved to respond

📝 The prayer's exact words are not in scripture

✍️ Later writers imagined their own version of it

📖 The event mattered more than its wording

---

## Before He Was Humbled

This phrase marks a clear line in Manasseh's story.

Everything listed before it belongs to his years of sin.

Everything after it belongs to his years of repentance.

Scripture does not blur those two seasons of his life together.

📏 This phrase marks a clear turning line

💔 Before it were his years of sin

🙏 After it came real repentance

📖 Scripture keeps both seasons distinct

---

## They Buried Him In His Own House

Judah's kings were normally buried in the royal tombs of David's line.

Manasseh instead was buried in his own house, a smaller, more private place.

Even after real repentance, some earthly consequences still followed him.

His story ends with mercy, but not without cost.

👑 Kings were normally buried in royal tombs

🏠 Manasseh was buried in his own house instead

💔 Consequences outlasted his repentance

📖 Forgiveness does not erase every earthly cost

# SecondChronicles 33:21-25
# ⚔️ Amon's Short, Evil Reign
---
## Reigned Two Years In Jerusalem

Amon's entire reign lasts only two years.

Compare that to his father Manasseh's fifty five years on the same throne.

A short reign here is not a small mercy.

It simply shows how quickly this story ends.

📆 Amon reigned only two years

👑 His father reigned fifty five years

⏳ This reign ends very quickly

📖 Length of reign does not equal favor

---

## As Did Manasseh His Father

Amon copies his father's early years exactly.

He grows up watching decades of idolatry before Manasseh's late repentance ever happened.

Manasseh's repentance came too late to shape his son's example.

Children often inherit the sins they grew up watching.

👨‍👦 Amon copied his father's early pattern

👀 He grew up watching years of idolatry

⏰ Repentance came too late to teach him

📖 They inherit habits, not late lessons

---

## The Carved Images Which Manasseh His Father Had Made

Manasseh had removed idols from the temple.

He apparently did not destroy every image he ever made.

Some carved images survived somewhere for Amon to bring back into use.

Reform that stops short can leave an easy path back to sin.

🗿 Some old idols apparently survived Manasseh's reform

🔄 Amon simply reactivates his father's old images

⚠️ Incomplete reform left an easy path back

📖 Half finished repentance still leaves a door open

---

## Humbled Not Himself Before The LORD

This is the exact same phrase used for Manasseh's repentance in verse twelve.

Here it is stated in the negative instead.

Amon faces the very same choice his father once faced.

He simply refuses to make the same turn his father eventually made.

🔁 The same phrase describes Manasseh's repentance

🚫 Amon faces the same choice

❌ He refuses the turn his father made

📖 The open door was simply ignored

---

## Trespassed More And More

"Trespassed" means to sin or offend against God's law.

Amon does not simply repeat his father's early sin.

He escalates it even further than before.

Manasseh eventually stopped and turned back.

Amon just keeps going deeper instead.

⚖️ Trespassed means sinning against God's law

📈 Amon's sin only grew worse over time

🛑 Manasseh eventually stopped, Amon never did

📖 Some paths get harder to leave over time

---

## His Servants Conspired Against Him

"Conspired" means his own officials secretly planned to kill him.

This threat came from inside his own royal household.

It was not an outside enemy at all.

A king who offered no real loyalty ultimately finds none in return.

🗡️ Conspired means a secret plot to kill

🏠 The threat came from his own household

👥 His own officials turned against him

📖 Loyalty was never earned, and none was given

---

## The People Of The Land

This phrase refers to the free landowning citizens of Judah.

They acted together as a political body.

They step in immediately after the conspirators strike.

Ordinary citizens, not just royal officials, decide who leads the nation next.

🌍 People of the land means Judah's citizens

⚖️ They acted as a political body

👥 Ordinary citizens shaped the outcome here

📖 The nation, not just the court, decided

---

## Made Josiah His Son King In His Stead

Josiah becomes king as a child after this sudden chaos.

He grows up to become one of the most faithful kings in Judah's history.

Two generations of idolatry do not get the final word here.

God's plan for Judah is not finished yet.

👑 Josiah becomes king after this chaos

🌟 He becomes one of Judah's most faithful kings

🔄 Two bad generations did not end God's plan

📖 God's plan continued through unexpected beginnings
`.trim();

export const SECOND_CHRONICLES_THIRTY_THREE_PERSONAL_SECTIONS = parseSecondChroniclesThirtyThreeRawNotes(
  SECOND_CHRONICLES_THIRTY_THREE_RAW_NOTES,
);
