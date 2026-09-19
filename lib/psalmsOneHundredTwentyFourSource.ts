export type PsalmsOneHundredTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyFourRawNotes(rawText: string): PsalmsOneHundredTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+124:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 124 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+124:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+124:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 124 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 124,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 124:${startVerse}` : `Psalms 124:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 124 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_FOUR_RAW_NOTES = `# Psalms 124:1-5
# 🌊 If It Had Not Been The LORD
---
## 🛡️ If It Had Not Been The LORD Who Was On Our Side

"On our side" means God fighting for Israel, not just standing near them.

This line pictures a disaster that never actually happened.

Verse two repeats the same line again on purpose.

Hebrew poetry repeats a line like this to show real weight.

Psalms 124 is one of the Songs of Ascents credited to David.

🛡️ On our side means God fighting for them
🔁 The line repeats for real emphasis
🎵 Part of the pilgrim Songs of Ascents
📖 Tradition credits this song to David

## 👥 Now May Israel Say

Israel here means the whole nation, not one person speaking alone.

Songs like this were sung together by pilgrims traveling up to Jerusalem.

Everyone repeating the same words turned one deliverance into a shared memory.

The whole community owns this rescue together, not just a single survivor.

👥 Israel means the whole nation
🚶 Pilgrims sang this song together
🤝 Shared words made a shared memory
📖 The rescue belongs to everyone

## ⚔️ When Men Rose Up Against Us

Rose up against us describes enemies preparing to attack Israel directly.

The psalm never names which enemy or which specific battle this was.

Leaving it unnamed lets every generation apply the same rescue to its own danger.

The focus stays on what God did, not on a history lesson.

⚔️ Rose up against us means attacking enemies
❓ No enemy is named here
🔄 Left open so any generation can relate
📖 The point is God's rescue, not history

## 🕳️ Then They Had Swallowed Us Up Quick

"Quick" here is an old word for alive, not fast.

Swallowed up quick pictures being taken while still fully alive and aware.

The same wording describes rebels swallowed alive by the ground back in Numbers 16.

Israel is saying their enemies wanted total, sudden destruction.

Only God stopped that ending from happening.

😱 Quick means alive, not fast
🕳️ Pictures being swallowed while still alive
📜 The same wording appears in Numbers 16
📖 God stopped total destruction from happening

## 🌊 The Waters Had Overwhelmed Us, The Stream Had Gone Over Our Soul

Waters and a flooding stream are pictures of danger, not an actual flood.

Ancient poetry often used deep water to picture chaos and being overwhelmed.

Soul here means the whole person, not just an inner feeling.

The image says the danger threatened to drown their entire life, not just their body.

🌊 Waters here picture overwhelming danger
😵 Not an actual flood of water
🫀 Soul means the whole person
📖 The threat aimed at their whole life

## 👹 The Proud Waters Had Gone Over Our Soul

This line repeats the picture from verse four with one new word added.

"Proud" describes the waters as violent and arrogant, not just deep.

Calling the water proud pictures the enemy's arrogance behind the attack.

Repeating the flood image twice shows how close the danger truly came.

🌊 Repeats the flood picture again
😤 Proud means violent and arrogant
👹 The water pictures the enemy's pride
📖 Told twice to show how close it came

# Psalms 124:6-8
# 🕊️ Escaped Like A Bird From The Snare
---
## 🦷 Blessed Be The LORD, Who Hath Not Given Us As A Prey To Their Teeth

Blessed be the LORD means the danger has passed and thanks begins here.

A prey means an animal caught and eaten by a stronger predator.

Their teeth pictures the enemy as a wild animal ready to devour Israel.

God stopped Israel from becoming something torn apart and eaten.

🙌 Blessed be the LORD opens the thanks
🦌 Prey means the hunted animal
🦷 Teeth pictures a predator ready to devour
📖 God stopped Israel from being devoured

## 🪶 Our Soul Is Escaped As A Bird Out Of The Snare Of The Fowlers

A fowler was someone whose trade was trapping wild birds.

A snare was a hidden trap, often a net or a looped cord.

Comparing Israel to an escaped bird pictures a trap sprung just before it worked.

The escape looks small and sudden, exactly like a bird slipping free at the last second.

🪶 Fowler means a bird trapper
🕸️ Snare means a hidden trap
🐦 Israel escaped like a freed bird
📖 The escape came at the last second

## 🔨 The Snare Is Broken, And We Are Escaped

This does not just mean Israel avoided the trap.

It means the trap itself was broken and ruined.

A broken snare can never catch anyone again.

God did not only rescue His people once.

He disabled the danger for good.

🕸️ Not just avoided, the trap broke
🔨 A broken snare cannot be reused
🙏 God disabled the danger completely
📖 The rescue was total, not partial

## 🏷️ Our Help Is In The Name Of The LORD, Who Made Heaven And Earth

The name of the LORD means God's own character, not just a word.

This exact closing phrase, who made heaven and earth, also ended Psalm 121.

Both pilgrim songs end by pointing past the danger to the Creator himself.

Israel's help never depended on their own strength.

Their help was always tied to the one who made everything that exists.

🏷️ The name means God's own character
🔁 The same line closed Psalm 121
🌍 God made heaven and earth
📖 Help never came from Israel's own strength
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_FOUR_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyFourRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_FOUR_RAW_NOTES
);
