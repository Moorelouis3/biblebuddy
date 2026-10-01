export type JeremiahFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyOneRawNotes(rawText: string): JeremiahFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 41:${startVerse}` : `Jeremiah 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 41 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_ONE_RAW_NOTES = `# Jeremiah 41:1-3
# ⚔️ Ishmael Murders Gedaliah
---
## 👑 Of The Seed Royal

"Seed royal" means Ishmael descended directly from Judah's royal line.

He likely carried blood ties to the house of David itself.

That makes this murder a political act, not a random crime.

A rival to Gedaliah's rule saw his chance and seized it.

👑 Seed royal means true royal blood
🗡️ Ishmael held a rival's claim
🎯 This murder was political, not random
➡️ A rival saw his chance and struck

## 🍞 They Did Eat Bread Together In Mizpah

Sharing a meal together signaled trust and peace in this culture.

Guests who ate at your table were not expected to turn on you.

Ishmael broke that unspoken rule in the worst possible way.

He accepted Gedaliah's hospitality with murder already planned.

🍞 Shared meals meant trusted peace
🤝 Guests were never expected to attack
💔 Ishmael broke that trust completely
➡️ Murder was already being planned

## 🏛️ Whom The King Of Babylon Had Made Governor

"Governor" means Babylon placed Gedaliah in charge after Jerusalem fell.

He was not a king but an appointed official reporting to Babylon.

Chapter forty already recorded Johanan's warning that this plot was coming.

Gedaliah refused to believe his own officers and paid with his life.

🏛️ Governor meant Babylon's appointed ruler
⚠️ Johanan warned Gedaliah of this plot
🙅 Gedaliah refused to believe the warning
➡️ Ignoring warnings cost him his life

## ⚔️ The Chaldeans That Were Found There

"Chaldeans" refers to Babylonian soldiers stationed in Judah after the conquest.

Ishmael killed them alongside the Jewish officials loyal to Gedaliah.

This was not just a coup against one governor.

It was an attack aimed straight at Babylon's own garrison.

🪖 Chaldeans means Babylon's own soldiers
🎯 Ishmael killed Babylon's garrison too
🚫 This went beyond one man's murder
➡️ Babylon would see this as rebellion

# Jeremiah 41:4-7
# 😢 Fake Tears, Real Slaughter
---
## 🤐 And No Man Knew It

Ishmael kept the murder of Gedaliah completely secret for one full day.

Nobody outside Mizpah had any idea their governor was already dead.

That silence let him set a second trap before news could spread.

Secrecy was the whole key to his plan working twice.

🤫 Ishmael hid the murder for a day
📅 Nobody outside Mizpah knew yet
🪤 Silence let him set another trap
➡️ Secrecy made his second trap possible

## ✂️ Having Their Beards Shaven, And Their Clothes Rent

These eighty men were practicing public mourning rites for the temple's ruin.

Shaving the beard and tearing the clothes were outward signs of grief.

"Rent" means torn deliberately, not damaged by accident.

Some even cut their own skin, a custom Israelite law later forbids.

Their mourning was real, even if their journey ended in a trap.

😢 Fourscore means eighty mourners
✂️ Shaven beards showed public grief
👕 Rent means deliberately torn clothing
➡️ Real grief walked into a trap

## 🕯️ With Offerings And Incense In Their Hand

This does not mean the temple in Jerusalem was still standing.

Chapter fifty two already records Nebuzaradan burning it completely.

These men likely planned to offer sacrifices among its ruins anyway.

Devotion to God outlasted the building itself.

🏛️ The temple itself was already destroyed
🔥 Nebuzaradan had burned it completely
🙏 They still brought offerings to its ruins
➡️ Devotion outlasted the building itself

## 😭 Weeping All Along As He Went

Ishmael staged tears to look like a mourner himself.

Real grief was walking straight toward him without any suspicion.

He used sorrow as a weapon to lower their guard.

Fake tears can disguise real danger.

😭 Ishmael faked tears on purpose
🎭 He posed as a fellow mourner
🛡️ Fake grief lowered their guard
➡️ Sorrow became his weapon here

## 🕳️ Cast Them Into The Midst Of The Pit

Ishmael murdered the eighty men inside the city gates.

Their bodies were thrown into a large pit nearby.

The next section explains exactly where that pit came from.

One ordinary cistern became a mass grave in a single afternoon.

🩸 Eighty men were slaughtered inside Mizpah
🕳️ Bodies were dumped into one pit
📜 The pit's history comes next
➡️ A cistern became a grave in hours

# Jeremiah 41:8-10
# 🕳️ The Pit And The Spared Ten
---
## 🌾 We Have Treasures In The Field

Ten men offered Ishmael hidden stores of wheat, barley, oil, and honey.

Families often buried food supplies in fields during times of war.

That buried stockpile bought these ten men their lives.

Ishmael spared them, but only because they had something he wanted.

🌾 Treasures meant buried food supplies
⚔️ Burying food was common during war
💰 Supplies bought these ten men mercy
➡️ Ishmael spared only what served him

## 🕳️ Which Asa The King Had Made For Fear Of Baasha

This pit was not new.

King Asa dug it centuries earlier.

Asa feared invasion from Baasha, a rival king of Israel.

That old defensive cistern is described back in the book of Kings.

A structure built for protection became a tool for murder instead.

🕳️ The pit was centuries old
👑 Asa feared Baasha's invasion
📚 Kings already describes this cistern
➡️ Protection became a tool for murder

## 👸 Even The King's Daughters

These were royal princesses still living after Jerusalem's fall.

Nebuzaradan had placed them under Gedaliah's protection back in chapter forty.

Their father's throne was gone, but their danger was not.

Ishmael now held the last visible pieces of Judah's royal family.

👑 These were surviving royal princesses
🛡️ Gedaliah had been their protector
⚠️ Danger followed them even after the fall
➡️ Ishmael now controlled Judah's last royals

## 🐪 Departed To Go Over To The Ammonites

Chapter forty already named Baalis, king of the Ammonites, behind this plot.

Ishmael now runs straight to the man who likely sent him.

This was never a random outburst of anger.

It was a planned attack with a planned escape route.

🗺️ Ammon was the plot's true backer
🏃 Ishmael fled to his own sponsor
📋 Nothing about this was random
➡️ The whole plan had an exit planned

# Jeremiah 41:11-15
# 🏃 Johanan Rescues The Captives
---
## 🎖️ Johanan The Son Of Kareah

Johanan already appears in chapter forty as the captain who warned Gedaliah.

Gedaliah dismissed that warning and refused to act on it.

Now Johanan gathers the remaining forces to correct that mistake.

His earlier warning turns out to have been exactly right.

🎖️ Johanan warned Gedaliah back in chapter forty
🙅 Gedaliah refused to act on it
⚔️ Johanan now leads the response
➡️ His warning turns out correct

## 🌊 By The Great Waters That Are In Gibeon

Gibeon sat a few miles northwest of Jerusalem.

Its "great waters" were a large pool used for the town's water supply.

That same pool already appeared in battles generations earlier in the book of Samuel.

Ishmael was caught in a place already soaked in conflict.

🗺️ Gibeon sat near Jerusalem
💧 Great waters meant the town's main pool
⚔️ Samuel already describes battles there
➡️ Ishmael was caught in a familiar battlefield

## 🙌 Then They Were Glad

This does not mean the captives supported Ishmael's rebellion.

They were taken away against their will back in verse ten.

Seeing Johanan's army felt like rescue, not a change of loyalty.

Relief like this reveals who the real enemy actually was.

🙅 They never supported Ishmael's plan
⛓️ They had been taken as captives
🥹 Johanan's arrival felt like rescue
➡️ Their relief reveals the real enemy

## 🏃 Escaped From Johanan With Eight Men

Ishmael began this story with ten men at his side.

Only eight remained by the time he fled toward Ammon.

Some of his own men likely scattered during the chase.

Justice does not catch him here, but his power keeps shrinking.

🔟 Ishmael started with ten men
📉 Only eight men stayed with him
🏃 His forces shrank during the chase
➡️ He escapes here, but weakened

# Jeremiah 41:16-18
# 🛣️ Fear Drives Them Toward Egypt
---
## 👳 Mighty Men Of War, And The Women, And The Children, And The Eunuchs

"Eunuchs" were men who served in the royal court, often castrated for that role.

This list covers soldiers, mothers, children, and royal servants together.

Johanan rescued the whole community, not just a few fighters.

Every kind of person Ishmael had taken is named here as freed.

👳 Eunuchs served inside the royal court
👨‍👩‍👧 The whole community was recovered
🎖️ Johanan freed more than soldiers
➡️ Everyone taken by Ishmael was freed

## 🏘️ The Habitation Of Chimham, Which Is By Bethlehem

Chimham was a waystation named after a man from the book of Samuel.

He had once been rewarded by King David for his father's loyalty.

This stop sat near Bethlehem, a town known mostly for King David's birth.

Centuries later, it would also become known as the birthplace of Jesus.

🏘️ Chimham was named after a loyal family
👑 David once rewarded that family
📍 Bethlehem sat nearby on their route
➡️ Bethlehem later became Jesus' birthplace

## 🇪🇬 To Go To Enter Into Egypt

Fleeing to Egypt meant leaving the promised land completely.

Fear of Babylon's revenge was driving this decision, not a careful plan.

The next few chapters follow this exact journey closely.

Jeremiah will soon warn them directly against this very choice.

🇪🇬 Egypt meant leaving the promised land
😨 Fear was driving this choice
📖 The next chapters follow this journey
➡️ Jeremiah will soon warn against it

## 😨 For They Were Afraid Of Them

The word them refers to Babylon's soldiers and officials.

Gedaliah had been Babylon's appointed governor over Judah.

His death looked like an open act of rebellion against Babylon.

These survivors feared being blamed for a crime they did not commit.

🪖 Them refers to Babylon's forces
👑 Gedaliah was Babylon's own governor
⚔️ His death looked like rebellion
➡️ Innocent people feared Babylon's revenge
`.trim();

export const JEREMIAH_FORTY_ONE_PERSONAL_SECTIONS = parseJeremiahFortyOneRawNotes(JEREMIAH_FORTY_ONE_RAW_NOTES);
