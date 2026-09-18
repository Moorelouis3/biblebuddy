export type PsalmsNinetyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyThreeRawNotes(rawText: string): PsalmsNinetyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+93:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 93 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+93:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+93:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 93 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 93,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 93:${startVerse}` : `Psalms 93:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 93 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_THREE_RAW_NOTES = `# Psalms 93:1
# 👑 The LORD Takes His Throne
---
## 👑 The LORD Reigneth

"Reigneth" means ruling as king starting immediately.

This is not a future hope waiting to happen.

The Hebrew verb pictures a king who has already taken his throne.

That settled fact opens the entire psalm.

Every line that follows builds on it.

👑 Reigneth means ruling as king now

⏳ Not a future hope but present fact

🪑 Pictures a king already on his throne

📖 The whole psalm builds on this fact

## 🧥 Clothed With Majesty

"Clothed" pictures someone putting on a royal robe.

Majesty describes visible splendor that everyone around can see.

Ancient kings wore rich robes so their rank was obvious to everyone watching.

God is pictured wearing that same unmistakable royal display.

Nobody could mistake him for anything less than King.

🧥 Clothed pictures putting on a royal robe

👀 Majesty means splendor everyone can see

👘 Kings wore robes to show rank

📖 God wears that same royal display

## 💪 Girded Himself With Strength

"Girded" means tying a belt tight around the waist.

Soldiers and workers girded themselves before hard physical action.

Strength pictured as a belt shows power that is worn on purpose.

God did not put on strength by accident.

He deliberately displayed it, like a warrior preparing for battle.

💪 Girded means tying a tight belt

⚔️ Soldiers girded themselves before hard action

🎯 Strength here is worn on purpose

📖 God displays power like a warrior

## 🌍 The World Also Is Stablished, That It Cannot Be Moved

"Stablished" is an older spelling of established, meaning firmly fixed.

The created world sits on a foundation that will not shift.

"Cannot be moved" describes total stability, not just present calm.

God's rule over creation is the reason the world holds together.

A king in charge like this guarantees real, lasting order.

🌍 Stablished means firmly and permanently fixed

🪨 The world sits on a sure foundation

🔒 Cannot be moved means total stability

📖 God's rule holds creation together

# Psalms 93:2-3
# 🌊 An Eternal Throne Meets Rising Floods
---
## ⏳ Thy Throne Is Established Of Old

"Established of old" means God's throne was never newly built.

It has been standing since before human history began.

A king who inherits a throne can lose it to a rival.

God's throne was never founded by anyone but himself.

It has no starting point a person could point back to.

⏳ Established of old means always existing

🏛️ God's throne was never newly built

👑 No rival ever gave him this rule

📖 His throne has no starting point

## ♾️ Thou Art From Everlasting

"Everlasting" describes existing without any beginning or end.

This is not simply a very long life.

It means time itself does not measure God at all.

Verse one already said God reigns right now.

This verse adds that his rule stretches backward with no edge.

♾️ Everlasting means no beginning or end

⏰ This is more than a long life

🌌 Time does not measure God at all

📖 His rule stretches back with no edge

## 🌊 The Floods Have Lifted Up Their Voice

"Floods" pictures rivers and seas in a raging, unpredictable state.

Ancient people often saw the sea as chaos itself, wild and untamed.

"Lifting up their voice" pictures a loud roar, almost like a shout.

That phrase gets repeated three times in a row for emphasis.

Something powerful and threatening is being described on purpose.

🌊 Floods pictures seas in a raging state

😱 Ancient people saw the sea as chaos

📢 Lifting up voice pictures a loud roar

📖 The repeated phrase signals real threat

# Psalms 93:4-5
# 🛡️ Stronger Than The Sea, Forever Holy
---
## ⚡ The LORD On High Is Mightier Than The Noise Of Many Waters

"On high" pictures God ruling from above all creation.

"Mightier" means stronger, not just loud in a different way.

The noise of many waters pictures a roaring flood or crashing sea.

No matter how loud that danger sounds, God's power is louder still.

The threat from the verse before gets answered directly right here.

⚡ On high pictures God ruling above

💪 Mightier means stronger, not just louder

🌊 Many waters pictures a roaring flood

📖 God answers that threat directly here

## 🌀 Than The Mighty Waves Of The Sea

Waves were one of the most feared, uncontrollable forces in the ancient world.

Sailors and fishermen depended on the sea yet could never fully trust it.

Calling God mightier than the sea's waves names the most powerful threat people knew.

No wave, however massive, is stronger than he is.

This verse names the very thing people feared most and puts it under his power.

🌊 Waves were the most feared ancient danger

🎣 Sailors depended on the sea but feared it

🐋 God is named mightier than the sea

📖 The greatest known danger is under his power

## 📜 Thy Testimonies Are Very Sure

"Testimonies" means God's written words and promises, laid out plainly.

"Very sure" means completely reliable, never shifting or uncertain.

The same God whose power controls the sea also keeps his promises.

Strength and truth are pictured together in this one verse.

A powerful God who could not be trusted would still be frightening.

This verse makes sure the reader never has to wonder about that.

📜 Testimonies means God's written promises

🔒 Very sure means completely reliable

💪 Power and truth appear together here

📖 A powerful God here is also trustworthy

## 🏠 Holiness Becometh Thine House, O LORD, For Ever

"Becometh" is an older word meaning fits or suits perfectly.

"Thine house" names the temple, the center of Israel's worship.

Holiness fitting God's house means nothing impure belonged inside it.

"For ever" closes the psalm the same way verse two opened it.

The psalm that began with an eternal throne ends with eternal holiness.

🏠 Becometh means fits or suits perfectly

⛪ Thine house names Israel's temple

✨ Holiness meant nothing impure belonged there

📖 The psalm ends where it began, eternal
`.trim();

export const PSALMS_NINETY_THREE_PERSONAL_SECTIONS = parsePsalmsNinetyThreeRawNotes(PSALMS_NINETY_THREE_RAW_NOTES);
