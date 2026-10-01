export type JeremiahThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyNineRawNotes(rawText: string): JeremiahThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 39:${startVerse}` : `Jeremiah 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 39 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_NINE_RAW_NOTES = `# Jeremiah 39:1-3
# 🏙️ The City Falls
---
## 👑 Came Nebuchadrezzar King Of Babylon

"Nebuchadrezzar" is another spelling of "Nebuchadnezzar."

Jeremiah uses both spellings for the same Babylonian king.

This siege had been threatened for years before this chapter opens.

Babylon's army now surrounds Jerusalem for the final time.

The ninth year of Zedekiah places this near 588 BC.

What was once only a threat is now reality at the gates.

👑 Nebuchadrezzar and Nebuchadnezzar name the same king

📅 The ninth year points to about 588 BC

⚔️ Babylon's final siege begins here

📖 A long threatened judgment arrives

---

## 🧱 The City Was Broken Up

"Broken up" means the wall was finally breached.

The siege had lasted about eighteen months by this point.

Food inside the city had likely run out long before this day.

The exact date, the eleventh year, fourth month, ninth day, is recorded on purpose.

Later chapters return to this same date more than once.

Jerusalem's long resistance ends on this single day.

🧱 Broken up means the wall gave way

⏳ The siege lasted about eighteen months

📅 A precise date marks this fall

📖 A long resistance finally ends

---

## 🚪 Sat In The Middle Gate

In this culture, a city's gate was not just an entrance.

The gate was where officials met and conducted business.

Taking a seat there was how conquerors claimed a captured city.

These Babylonian officials take the one place that had belonged to Judah's own leaders.

This is a quiet but very visible changing of hands.

🚪 Gate meant a place of business

👑 Sitting there claimed the city's authority

🔄 Power passes to Babylon here

📖 A visible sign of new control

---

## 📜 Nergalsharezer, Rabmag

This list names more than one man, not one man repeated.

"Nergalsharezer" appears twice in this verse because two separate officials shared that name.

"Rabmag" and "Rabsaris" are not personal names but official titles.

Ancient records often identified a man by his title more than by his name.

A long list like this shows how many officials took part in this moment.

👥 Two different men share one name here

🏷️ Rabmag and Rabsaris name official titles

📜 Titles marked rank in Babylon's court

📖 Many officials witnessed Jerusalem's fall

# Jeremiah 39:4-7
# 😢 Zedekiah Is Captured
---
## 🌃 Fled By Night, By The Way Of The King's Garden

Zedekiah tries to escape through a hidden route out of the city.

The king's garden sat near the southern end of Jerusalem, close to the Kidron Valley.

The gate "betwixt the two walls" was a narrow passage between two defensive walls.

It was built for exactly this kind of quiet exit.

Fleeing at night was the king's last attempt to avoid capture.

🌃 Zedekiah flees the city at night

🌿 The king's garden sat near the Kidron Valley

🚪 A hidden gate linked two walls

📖 Even this escape could not succeed

---

## 🗺️ Overtook Zedekiah In The Plains Of Jericho

The plains of Jericho sit about twenty miles east of Jerusalem.

Zedekiah was likely heading toward the Jordan River for safety.

"Chaldeans" is simply another name for the Babylonians in this book.

Babylon's riders easily outran a king fleeing on foot or by donkey.

He is caught only a short distance from possible safety.

🗺️ Jericho sits about twenty miles east of Jerusalem

🏇 Babylon's army could outrun his escape

⚔️ Chaldeans is another name for the Babylonians

📖 He is caught just short of safety

---

## 🏕️ Riblah In The Land Of Hamath

Riblah sat far north, in Syria, near Hamath.

Nebuchadnezzar used it as his military headquarters.

Bringing Zedekiah there meant a long journey away from his own land.

Another king of Judah had faced judgment in this same city before, in 2 Kings.

"Gave judgment upon him" means Nebuchadnezzar personally decided his punishment.

Zedekiah stands trial before the very king he had rebelled against.

🗺️ Riblah sat far north, near Hamath

🏕️ It served as Babylon's military base

⚖️ Nebuchadnezzar judged him there himself

📖 Zedekiah answers to the king he defied

---

## 💔 Slew The Sons Of Zedekiah Before His Eyes

This punishment was designed to be the worst thing Zedekiah could witness.

Killing his sons ends any hope of his own family ruling again.

Doing it in front of him makes the grief part of the punishment.

Babylon also kills Judah's nobles here, removing the leadership class in one stroke.

Rebellion against Babylon carried a cost far beyond the king's own life.

💔 Zedekiah watches his own sons die

👑 His family's chance to rule ends here

⚔️ Judah's noble class is wiped out too

📖 Rebellion against Babylon cost everything

---

## 👁️ Put Out Zedekiah's Eyes

Blinding a defeated king was a known punishment for a rebellious vassal.

It served two purposes at once, cruelty and a permanent end to his rule.

The last thing Zedekiah ever sees is his own sons being killed.

He is then bound in chains and taken captive to Babylon.

This fulfills a warning Jeremiah had already given Zedekiah back in chapter thirty four.

👁️ Blinding ended his ability to rule again

💔 His sons die right before him

⛓️ Chains mark him as Babylon's prisoner now

📖 Jeremiah's earlier warning comes true exactly

# Jeremiah 39:8-10
# 🔥 Jerusalem Is Burned
---
## 🔥 Burned The King's House, And The Houses Of The People

This is not random destruction but a deliberate plan to erase the city's power.

The king's house represented Judah's whole government, now reduced to ashes.

Ordinary homes burn too, not only the palace.

Breaking down the walls removes any chance the city could defend itself again soon.

Jerusalem's physical strength is dismantled piece by piece.

🔥 The palace burns along with ordinary homes

🏛️ This destroys Judah's whole government

🧱 The walls are torn down on purpose

📖 Jerusalem's strength is erased completely

---

## 👥 Carried Away Captive Into Babylon The Remnant Of The People

"The remnant" means everyone still left in the city after the siege and famine.

Nebuzaradan was the officer in charge of carrying out Babylon's orders after the fall.

"Those that fell away" refers to people who had already defected to Babylon during the siege.

Even those earlier defectors are not spared from being taken away.

Exile reaches the very people the walls had failed to protect.

👥 The remnant means everyone left after the siege

🪖 Nebuzaradan carried out Babylon's orders

🔄 Even earlier defectors are taken captive

📖 Exile reaches everyone left in the city

---

## 🌱 Gave Them Vineyards And Fields

Not every outcome of Babylon's conquest here was pure cruelty.

The poorest people, who owned nothing, are left behind instead of taken away.

Babylon gives them vineyards and fields that once belonged to families now gone.

This was likely a practical move to keep the land producing food.

The poorest people in Judah end up with more land than before the siege.

🌱 The poor are left behind, not exiled

🍇 They receive vineyards and fields to work

🧮 This likely served Babylon's own needs

📖 The lowest in Judah gain the most land

# Jeremiah 39:11-14
# 🛡️ Jeremiah Is Set Free
---
## 👑 Gave Charge Concerning Jeremiah

Nebuchadnezzar himself gives this order, not a lower official.

Babylon's king had likely heard that Jeremiah urged surrender instead of resistance.

From Babylon's view, Jeremiah's message had actually helped their own cause.

That makes Jeremiah someone Babylon wants to protect rather than punish.

A foreign king treats God's prophet better than his own people had.

👑 Nebuchadnezzar personally orders his protection

🗣️ Jeremiah's surrender message had aided Babylon

🛡️ Babylon protects him instead of punishing him

📖 A foreign king honors God's prophet

---

## 🤝 Do Him No Harm

This order goes beyond simply sparing Jeremiah's life.

Nebuchadnezzar tells his officer to grant Jeremiah whatever he actually requests.

This is the most favorable treatment Jeremiah receives anywhere in this book.

After years of threats from his own people, rescue comes from the conquering army instead.

God had promised Jeremiah protection back in chapter one.

This moment fulfills that very promise.

🤝 Jeremiah may ask for what he needs

🏆 This is his best treatment in the book

🔄 Rescue comes from Babylon, not Judah

📖 God's promise from chapter one comes true

---

## 🏠 Committed Him Unto Gedaliah The Son Of Ahikam

This Gedaliah will soon govern the small Jewish community left in the land.

His father Ahikam had protected Jeremiah once before, back in chapter twenty six.

His grandfather Shaphan was a trusted scribe under King Josiah.

Jeremiah is placed with a family already proven friendly toward him.

"So he dwelt among the people" means Jeremiah stays in Judah instead of Babylon.

👤 Gedaliah will soon govern Judah's remnant

🛡️ His father Ahikam once protected Jeremiah too

📜 His grandfather Shaphan served under King Josiah

📖 Jeremiah stays home instead of exile

# Jeremiah 39:15-18
# 🪢 The Promise To Ebedmelech
---
## ⏪ While He Was Shut Up In The Court Of The Prison

This word from God actually came earlier, while the siege was still happening.

The court of the prison is the same place Jeremiah was held in chapter thirty eight.

The book places this word here, after the city's fall, not in its exact order.

That choice lets this chapter close on a promise kept, not only a promise made.

Readers see the whole outcome before learning how one small kindness was repaid.

⏪ This word came before the city fell

🏛️ The same prison returns from chapter thirty eight

🔀 Events appear here out of order

📖 A promise is shown already kept

---

## 🌍 Ebedmelech The Ethiopian

Ebedmelech is the official who pulled Jeremiah out of the muddy cistern in chapter thirty eight.

"Ethiopian" here points to Cush, the region south of Egypt.

Ebedmelech served in Judah's court as a foreigner from that land.

God sends this personal message through Jeremiah because of what Ebedmelech already did.

One small act of courage from an outsider earns a direct word from God.

🪢 Ebedmelech rescued Jeremiah in chapter thirty eight

🌍 Ethiopian points to Cush, south of Egypt

🎁 His kindness earns a personal word from God

📖 Courage from an outsider is rewarded

---

## 🔥 I Will Bring My Words Upon This City For Evil

God confirms the destruction readers already watched happen earlier in this chapter.

"For evil, and not for good" means this judgment was not an accident.

Jerusalem's fall fulfills warnings God had given for years through Jeremiah.

This hard truth is stated plainly before any good news for Ebedmelech.

🔥 God confirms the judgment already happened

⚖️ This outcome was intended, not accidental

📅 Years of warnings finally come true

📖 Judgment is named honestly before the promise

---

## 🛡️ Not Be Given Into The Hand Of The Men Of Whom Thou Art Afraid

Ebedmelech had reason to fear what would happen once the city fell to Babylon.

He was a foreign official who had openly helped God's prophet.

Soldiers in the chaos of a captured city could easily have made him a target.

God promises him specific, personal safety in that exact kind of danger.

This mirrors the same specific protection Jeremiah himself was promised just before.

😨 Ebedmelech feared the city's fall

🛡️ God promises him specific personal safety

🔄 His protection mirrors Jeremiah's own promise

📖 God protects those who protect His people

---

## 🙏 Because Thou Hast Put Thy Trust In Me

This is the reason God gives for sparing Ebedmelech, stated directly.

"Thy life shall be for a prey" is an old phrase.

It means he will escape with nothing but his own life.

Think of a soldier escaping a battle with no spoils, only himself, alive.

That alone counts as a reward here.

Ebedmelech's trust was shown through one specific action.

He climbed down and lifted Jeremiah out of the mud.

The chapter that opened with a city's destruction closes with one life saved by faith.

🙏 Trust in God is why he is spared

🏃 His life alone becomes the prize

🪢 His trust was shown through one real action

📖 One act of faith outlasts a city's fall
`.trim();

export const JEREMIAH_THIRTY_NINE_PERSONAL_SECTIONS = parseJeremiahThirtyNineRawNotes(JEREMIAH_THIRTY_NINE_RAW_NOTES);
