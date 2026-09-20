export type PsalmsOneHundredTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyFiveRawNotes(rawText: string): PsalmsOneHundredTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+125:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 125 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+125:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+125:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 125 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 125,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 125:${startVerse}` : `Psalms 125:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 1) {
    throw new Error("Expected 1 Psalms 125 section, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_FIVE_RAW_NOTES = `# Psalms 125:1-5
# ⛰️ Trust That Cannot Be Moved
---
## ⛰️ They That Trust In The LORD Shall Be As Mount Zion

Mount Zion is one specific hill, not mountains in general.

It was the ridge where the city of Jerusalem and the Temple stood.

Zion sits on solid bedrock that does not shift or erode easily.

Comparing a person to Zion pictures something built on unshakeable ground.

Trusting the LORD gives a person that same kind of footing.

⛰️ Zion is one specific hill
🏛️ Jerusalem and the Temple stood there
🪨 Built on solid unmoving bedrock
📖 Trust gives that same footing

## ⚓ Which Cannot Be Removed, But Abideth For Ever

Abideth for ever means it will never stop being true.

The verse does not say trust removes every hardship.

It says the trust itself never gets removed.

Mountains erode over long enough time, but this promise does not.

The person who trusts the LORD is promised to stand, not to escape trouble.

⚓ Abideth for ever means permanent
🌪️ Trust does not remove hardship
🧍 The person is promised to stand
📖 Stability is lasting, not selective

## 🏔️ As The Mountains Are Round About Jerusalem

Jerusalem sits low, inside a bowl of higher hills.

The Mount of Olives is one of several hills ringing the city.

Pilgrims walking toward Jerusalem actually climbed down into it.

That is why these travel psalms are called Songs of Ascents.

The ring of hills was something pilgrims could see with their own eyes.

🏔️ Jerusalem sits inside a bowl of hills
🫒 The Mount of Olives is one of them
🚶 Pilgrims climbed down to reach the city
📖 This explains the title Song of Ascents

## 🛡️ So The LORD Is Round About His People

The hills around Jerusalem become a picture of God himself.

Round about means surrounding on every side, not just guarding the front.

There is no gap in the ring for danger to slip through.

The same word describes the hills back in the first half of the verse.

God's protection is pictured as just as complete as that ring of hills.

🛡️ God surrounds his people on every side
🚫 No gap is left open
🔁 Same picture as the hills already named
📖 God's protection is pictured as complete

## 👑 The Rod Of The Wicked

A rod here does not mean a stick used for punishment.

It is a symbol for a ruler's power, like a scepter.

The wicked's rod means an oppressive government ruling over Israel.

This could be a foreign king or an unjust ruler at home.

The psalm is talking about who holds power, not a physical object.

👑 Rod means a ruler's power
🚫 Not a stick for punishment
🏛️ Could be a foreign or unjust ruler
📖 The verse is about who holds power

## 🗺️ Shall Not Rest Upon The Lot Of The Righteous

A lot was the specific piece of land given to a family.

When Israel entered the promised land, it was divided by lot.

Each tribe and family received a fixed, lasting inheritance.

This verse promises that oppressive rule will not rest there forever.

God's people are promised relief on the very ground that belongs to them.

🗺️ A lot was a family's assigned land
🎲 Land was divided this way after Joshua
⏳ Oppressive rule will not stay forever
📖 Relief is promised on Israel's own ground

## ⚠️ Lest The Righteous Put Forth Their Hands Unto Iniquity

This does not mean the righteous will definitely sin.

It names a real danger, not a guaranteed outcome.

Put forth their hands unto iniquity means turning to wrongdoing.

Long enough oppression can tempt even faithful people toward it.

That danger is one reason God limits how long the wicked's rule lasts.

⚠️ Names a danger, not a certainty
✋ Put forth their hands means turning to sin
😔 Oppression can tempt even faithful people
📖 That risk is why God limits it

## ❤️ Upright In Their Hearts

Upright in their hearts describes sincerity, not just good behavior.

A person can act correctly in public while their heart stays crooked.

This phrase asks God to look past appearances entirely.

The prayer is for those whose obedience is real on the inside.

Good outward acts and an honest heart are not automatically the same thing.

❤️ Upright in heart means real sincerity
🎭 Not just good outward behavior
👁️ God is asked to look inside
📖 Obedience should be real, not just visible

## 🌀 Such As Turn Aside Unto Their Crooked Ways

Crooked ways means paths that twist away from what is right.

Hebrew poetry often pictures right living as a straight road.

Turning aside means leaving that road on purpose.

This is not someone who stumbles once by accident.

It describes a deliberate, ongoing choice to walk a different way.

🌀 Crooked ways means paths away from right
🛣️ Right living is pictured as a straight road
🚶 Turning aside is a deliberate choice
📖 It is not one accidental stumble

## 🕊️ But Peace Shall Be Upon Israel

Peace here translates the Hebrew word shalom.

Shalom means far more than the absence of conflict.

It pictures wholeness, safety, and everything being as it should be.

Psalm 122 already played on this same word inside the name Jerusalem.

This sixth Song of Ascents ends its journey the same place that one did.

🕊️ Peace translates the Hebrew shalom
🌿 Shalom means wholeness, not just no conflict
🔁 Psalm 122 played on this word too
📖 The pilgrim road ends in peace
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_FIVE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyFiveRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_FIVE_RAW_NOTES
);
