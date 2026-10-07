export type MalachiFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMalachiFourRawNotes(rawText: string): MalachiFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MalachiFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Malachi\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Malachi 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Malachi\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Malachi\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Malachi 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Malachi 4:${startVerse}` : `Malachi 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Malachi 4 sections, received " + sections.length);
  }

  return sections;
}

const MALACHI_FOUR_RAW_NOTES = `# Malachi 4:1-3
# 🔥 The Burning Day And The Healing Sun
---
## Shall Burn As An Oven

An oven here means a sealed clay furnace, not a modern kitchen stove.

Bakers packed it with fuel and let the heat grow fierce inside.

This coming day of judgment gets pictured as that same furnace heat.

Nothing survives inside an oven burning at full strength.

The proud and the wicked are pictured here as the fuel itself.

🔥 Oven means a sealed clay furnace
🪵 Bakers packed it full of fuel
💀 Nothing survives inside full heat
📖 The proud become the fuel itself

## All That Do Wickedly Shall Be Stubble

Stubble means the dry leftover stalks after a field gets harvested.

Stubble has no value of its own and burns away in seconds.

Pride and wickedness are grouped together here as the same problem.

They are not treated as two separate sins.

The verse does not single out obvious criminals only.

Arrogance against God counts here just as much as open wrongdoing.

🌾 Stubble means dried harvest leftovers
🔥 Stubble burns away in seconds
💔 Pride and wickedness are grouped together
📖 Arrogance counts as much as wrongdoing

## Neither Root Nor Branch

Root and branch together describe an entire plant, both the unseen and seen parts.

Removing a root ensures nothing can ever grow back again.

Removing a branch takes away any future growth as well.

Together they picture a destruction with no survivors and no future generation.

This is the harshest possible way to describe an ending.

🌱 Root pictures the hidden unseen part
🌿 Branch pictures the visible growing part
🚫 Together they mean total destruction
📖 No survivors and no future generation

## The Sun Of Righteousness

Sun of righteousness is a title for God Himself, arriving to heal and restore.

Many readers through history have connected this image directly to the coming of Jesus.

A sunrise breaks the darkness instantly after a long night.

That same instant change is pictured for the faithful here.

Judgment in the verse before and healing in this verse happen as the very same event.

☀️ Sun of righteousness pictures God arriving
✝️ Many connect this image to Jesus
🌅 Sunrise breaks the darkness instantly
📖 Judgment and healing are the same event

## Healing In His Wings

This does not mean God literally has bird like wings.

Wings here likely pictures the edges or corners of a long garment.

Ancient robes often had tassels that caught the sunlight at the edges.

The sunrise image from the line before continues directly into this phrase.

Healing means real relief, not just comfort.

🕊️ Not literal bird like wings here
👘 Wings may picture a garment's edges
☀️ The sunrise image continues here
📖 Healing promises real relief, not just comfort

## Grow Up As Calves Of The Stall

A calf of the stall is a young cow kept penned and well fed.

Penned calves build up energy from being kept inside so long.

When finally released, they leap and kick with wild joy.

That same overflowing joy is promised to the faithful here.

This is not quiet relief but bursting, physical celebration.

🐄 A calf of the stall is penned up
⚡ Penned calves build up pure energy
🎉 Released calves leap with wild joy
📖 This same joy is promised to the faithful

## Tread Down The Wicked

Treading down pictures walking over a defeated enemy on the ground.

This reverses chapter three's complaint that the wicked seemed to win.

The faithful are given an active role here, not a rescued bystander role.

Victory here is not quiet.

It is pictured as physical and complete.

👣 Treading means walking over a defeated enemy
🔄 This reverses the complaint about the wicked winning
🏆 The faithful get an active role here
📖 Victory is pictured as complete

## Ashes Under The Soles Of Your Feet

Ashes are what remains after a fire burns something down completely.

The oven imagery from the start of this chapter returns here directly.

What was once a threatening enemy becomes something easily stepped over.

Soles of your feet pictures something low, crushed, and powerless.

The proud who looked unstoppable end up this small.

🔥 Ashes are what fire leaves behind
🔁 This connects back to the oven earlier
👟 Soles picture something crushed and powerless
📖 The unstoppable proud end up this small

# Malachi 4:4-6
# 📜 Remember Moses, Expect Elijah
---
## Remember Ye The Law Of Moses

Remember here means more than simply recalling a fact.

It means returning to real obedience, not just memory.

Moses received this law centuries earlier, yet it still applies now.

This command closes the Old Testament on a familiar note.

That note is faithfulness to God's word already given.

🧠 Remember means return to obedience, not memory
📜 Moses received this law centuries earlier
🔚 This closes the Old Testament on familiar ground
📖 Faithfulness to God's word was already given

## In Horeb

Horeb is another name for Mount Sinai.

That is the same mountain where Moses received the Ten Commandments.

Naming the mountain ties this command to that specific historic moment.

The law was not a vague idea floating in the air.

It was given at one real place, to one real generation, for all Israel.

⛰️ Horeb is another name for Sinai
📜 This is where the Ten Commandments were given
📍 Naming the mountain ties it to history
📖 The law was given at one real place

## Statutes And Judgments

Statutes generally means fixed rules about worship and daily conduct.

Judgments means rulings that settled disputes between neighbors.

Together the two words cover the whole body of the law.

They are not just part of it.

Mentioning both closes any loophole about which commands still mattered.

Every part of what Moses taught still carried weight for them.

📏 Statutes covered worship and daily conduct
⚖️ Judgments covered settling disputes
📚 Together they cover the whole law
📖 Every part still carried weight

## I Will Send You Elijah The Prophet

Elijah was a famous prophet who never actually died but was taken up to heaven.

Sending him back names a specific, startling promise, not a vague future hope.

The New Testament identifies John the Baptist as the fulfillment of this exact promise.

John did not literally become Elijah again.

He came in the same spirit and power that Elijah carried.

🔥 Elijah was a prophet taken to heaven
❗ This promise is specific, not vague
✝️ This points to John the Baptist later
📖 John came in Elijah's spirit and power

## The Great And Dreadful Day Of The LORD

The Day of the LORD is a phrase the prophets use for a decisive moment of judgment.

Great describes its importance.

Dreadful describes how terrifying it feels to anyone unprepared.

The same day can be rescue for the faithful and ruin for the proud at once.

That double meaning has run through this entire chapter already.

📅 Day of the LORD means decisive judgment
👑 Great describes its importance
😱 Dreadful describes how terrifying it feels
📖 The same day rescues some and ruins others

## Turn The Heart Of The Fathers To The Children

This pictures a real reconciliation inside families, not just a nice feeling.

Generations had drifted apart, likely over faith itself.

Both the older and younger generations needed to turn back toward each other.

Family unity gets tied directly to spiritual readiness here.

A nation cannot turn back to God with its families still broken apart.

👨‍👧 This pictures real family reconciliation
💔 Generations had drifted apart over faith
🔄 Both sides needed to turn back together
📖 Family unity reflects spiritual readiness

## Lest I Come And Smite The Earth With A Curse

Lest means otherwise.

It warns of what happens if nothing changes.

Smite means to strike with force.

It is often used for serious judgment in scripture.

Curse here means complete destruction, not ordinary misfortune.

This is a serious and final kind of judgment.

This is the very last line of the entire Old Testament.

It ends on a warning so the New Testament can open with the answer.

⚠️ Lest means otherwise, a warning
💥 Smite means to strike with force
🚫 Curse means complete destruction
📖 This closes the Old Testament on a warning
`.trim();

export const MALACHI_FOUR_PERSONAL_SECTIONS = parseMalachiFourRawNotes(MALACHI_FOUR_RAW_NOTES);
