export type IsaiahTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyRawNotes(rawText: string): IsaiahTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 20:${startVerse}` : `Isaiah 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Isaiah 20 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_RAW_NOTES = `# Isaiah 20:1-2
# ⚔️ Assyria Marches And Isaiah Obeys
---
## 🎖️ Tartan Came Unto Ashdod

"Tartan" is not a personal name here.

It is an Assyrian military title, something like commander in chief.

The same title appears again later for the officer Assyria sends to threaten Jerusalem.

A whole army with a professional command structure now stands outside Ashdod.

This is not a raid.

It is an empire on the move.

🎖️ Tartan means a military commander
📯 The Assyrian army now surrounds Ashdod
🔁 Same title used later in Kings
📖 A whole empire is closing in

---
## 👑 Sargon The King Of Assyria

Sargon actually ruled Assyria, though he is named only this once in the whole Bible.

For a long time some doubted a king by that name ever existed at all.

Then archaeologists uncovered Sargon's own palace, filled with his own inscriptions.

Those inscriptions describe this very attack on Ashdod.

A single verse in Isaiah turned out to be confirmed by stone.

👑 Sargon is named only here in scripture
🏛️ His own palace was later found
📜 The palace inscriptions confirm this attack
📖 Archaeology backs up this one line

---
## 🏙️ Fought Against Ashdod, And Took It

Ashdod was one of five major Philistine cities along the coast.

Whoever held these coastal cities controlled the road between Assyria and Egypt.

Losing Ashdod meant Assyria now stood one step closer to Egypt's own border.

That is exactly why this chapter turns toward Egypt next.

🏙️ Ashdod was a major Philistine city
🛣️ Coastal cities controlled the route south
⚔️ Assyria now stood near Egypt's border
➡️ This sets up the warning to Egypt

---
## 🪢 Loose The Sackcloth From Off Thy Loins

"Sackcloth" was a rough, scratchy cloth normally worn during mourning or by a prophet at work.

Isaiah had likely been wearing it as his everyday prophetic dress.

God now tells him to take off that familiar, respectable garment.

The command itself is strange before the reader even learns why.

Something bigger than a wardrobe change is about to happen.

🪢 Sackcloth was rough mourning cloth
👳 Isaiah likely wore it daily
🚫 God tells him to remove it
📖 A strange command opens a bigger sign

---
## 👣 Put Off Thy Shoe From Thy Foot

Removing sandals stripped away another mark of a respectable, settled life.

In this culture, going barefoot in public usually signaled poverty, mourning, or captivity.

Isaiah is told to give up both signs of dignity at once.

Every detail of this command points toward humiliation, not comfort.

👣 Removing sandals meant losing dignity
🥲 Bare feet signaled poverty or mourning
🎭 Isaiah gives up two signs of status
📖 The command points straight at humiliation

---
## 👤 Walking Naked And Barefoot

"Naked" here likely does not mean fully unclothed.

Many scholars believe Isaiah was stripped down to his innermost garment.

That was the same state a captured slave or prisoner would be in.

Anyone who saw him would instantly recognize that image.

He becomes a walking picture of a defeated prisoner years before the defeat happens.

👤 Naked likely means stripped down
⛓️ Isaiah dressed like a captured slave
👀 Onlookers would recognize that image
📖 A living picture of defeat to come

# Isaiah 20:3-4
# ⏳ Three Years As A Living Warning
---
## 🙋 My Servant Isaiah

The LORD calls Isaiah "my servant" here, a title of honor, not lowly status.

Later chapters use that same title for a far greater servant still to come.

For now it simply marks Isaiah as someone doing exactly what God commanded.

His obedience, however strange it looked, was never in question.

🙋 Servant is a title of honor
🔮 Later chapters reuse this same title
✅ Isaiah obeyed exactly what God said
📖 Obedience mattered more than dignity

---
## 👁️ For A Sign And Wonder

A "sign" acted out a message the eyes could see, not just the ears could hear.

Other prophets did this too.

Jeremiah once wore a wooden yoke as a warning.

Ezekiel acted out a siege in the middle of a city.

Isaiah's version lasted three whole years, not just one afternoon.

That length forced the whole city to keep noticing him.

👁️ A sign is a message acted out
📯 Jeremiah and Ezekiel used signs too
⏳ Isaiah's sign lasted three whole years
📖 A message this long could not be ignored

---
## 🗺️ The Egyptians Prisoners, And The Ethiopians Captives

"Ethiopia" here means Cush, the kingdom south of Egypt, in the area now called Sudan.

At this exact time, a Cushite dynasty actually ruled over Egypt itself.

That is why Egypt and Ethiopia are named together throughout this chapter.

Judah had been eyeing this very kingdom as a possible ally against Assyria.

Isaiah's warning targets that hope directly, before it can even take hold.

🗺️ Ethiopia means Cush, south of Egypt
👑 A Cushite dynasty then ruled Egypt
🤝 Judah eyed this kingdom as an ally
📖 Isaiah warns against trusting that hope

---
## 😳 With Their Buttocks Uncovered

Captives marched into exile were often stripped bare as a public humiliation.

Assyrian palace art actually shows rows of prisoners paraded this exact way.

This detail is not shock for its own sake.

It is the literal fate Isaiah has been silently acting out for three years.

😳 Stripped captives were a real practice
🖼️ Assyrian art shows exactly this scene
🎭 Isaiah acted out this fate himself
📖 The sign act matches the real future

# Isaiah 20:5-6
# 😨 Judah's False Hope Falls Apart
---
## 🙏 Ethiopia Their Expectation, And Of Egypt Their Glory

"Their expectation" and "their glory" both point at the same false hope.

Judah and its neighbors had been counting on Egypt and Cush for rescue.

Those two nations looked strong, wealthy, and glorious from the outside.

Isaiah has just shown exactly what will happen to that so called glory.

Trusting a captive to save you from captivity was never a real plan.

🙏 Expectation and glory both mean false hope
💰 Egypt and Cush looked strong and rich
⛓️ That strength is about to be captured
📖 A defeated ally cannot rescue anyone

---
## 🏝️ The Inhabitant Of This Isle

"Isle" here does not mean a literal island out in the ocean.

The Hebrew word points more broadly at a coastland region, like the Philistine coast.

People living along that coast are watching Assyria conquer their neighbors one by one.

Their reaction becomes the voice of this whole final scene.

🏝️ Isle here means a coastal region
👀 These people watch Assyria's conquests nearby
🗣️ Their reaction closes out the chapter
📖 Fear spreads along the whole coastline

---
## ❓ How Shall We Escape

This closing question is not really about Assyria at all.

It is about where anyone can turn when a trusted ally falls first.

Egypt could not even save itself from Assyria's advance.

It could never have saved Judah either.

Isaiah 20 ends by quietly pointing the reader toward a better place to put their trust.

❓ The question is really about trust
🏚️ Egypt could not even save itself
🚫 A fallen ally cannot rescue anyone else
📖 Real security was never found in Egypt
`.trim();

export const ISAIAH_TWENTY_PERSONAL_SECTIONS = parseIsaiahTwentyRawNotes(ISAIAH_TWENTY_RAW_NOTES);
