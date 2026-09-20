export type PsalmsOneHundredThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyRawNotes(rawText: string): PsalmsOneHundredThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+130:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 130 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+130:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+130:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 130 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 130,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 130:${startVerse}` : `Psalms 130:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 130 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_RAW_NOTES = `# Psalms 130:1-4
# 🌊 Crying From The Depths
---
## 🌊 Out Of The Depths Have I Cried

"Depths" means water so deep it can pull someone under and drown them.

The psalmist pictures his trouble like the sea closing in over his head.

This song opens already in the middle of crisis.

He is not calm or reflective here.

He is going under.

🌊 Depths pictures drowning level trouble

😰 The psalmist feels overwhelmed already

🆘 This song opens mid crisis

📖 He cries out from real desperation

## 🚶 Unto Thee, O LORD

This whole psalm was sung by pilgrims walking up to Jerusalem.

Scholars group Psalms 120 through 134 together as pilgrim songs.

Families traveled together for the three great yearly feasts.

Singing on the road turned a hard journey into worship.

The word thee is not vague or generic here.

It points straight at the LORD.

🚶 Psalms 120 through 134 are pilgrim songs

🎉 Sung on the way to Jerusalem

🎶 Singing turned travel into worship

📖 Thee points straight at the LORD

## 👂 Let Thine Ears Be Attentive

"Supplications" means humble, urgent requests, not casual conversation.

The psalmist begs God not just to hear but to listen closely.

Attentive ears catch every detail, not just the loud parts.

He wants total focus in the middle of his crisis.

👂 Attentive means fully focused listening

🙏 Supplications are humble urgent requests

😥 He wants total focus now

📖 Real prayer asks for God's full attention

## ⚖️ If Thou, LORD, Shouldest Mark Iniquities

"Mark" means keeping a careful record against someone.

Picture a ledger where every debt gets written down in full.

If God kept that kind of ledger on sin, no one could pay it off.

"Who shall stand" expects the same answer every time.

Nobody could stand under that kind of scrutiny.

📒 Mark means keeping a careful record

⚖️ Sin recorded in full leaves nobody clean

❓ Who shall stand has one answer

📖 Nobody could survive that kind of judgment

## 🕊️ But There Is Forgiveness With Thee

Forgiveness is not something Israel has to earn or negotiate.

It already exists with God, ready and waiting.

The psalm turns from an impossible standard to open mercy in one line.

This is the hinge the whole psalm turns on.

🕊️ Forgiveness already exists with God

🔓 It is not earned or negotiated

🔄 The psalm turns from judgment to mercy

📖 Forgiveness is the hinge of this psalm

## 😨 That Thou Mayest Be Feared

This does not mean forgiveness makes sin feel small or unimportant.

A pardoned criminal does not suddenly stop respecting the judge.

Real forgiveness from God produces awe instead of carelessness.

To fear God here means to deeply reverence him.

A forgiving God earns more reverence than a raw display of power.

😨 Fear here means deep reverence

🚫 Forgiveness does not excuse sin

⚖️ Mercy still produces real awe

📖 A forgiving God earns more reverence than power

# Psalms 130:5-8
# 🌅 Waiting For The Morning
---
## ⏳ I Wait For The LORD, My Soul Doth Wait

Waiting here is not sitting around doing nothing.

It means holding onto a promise with full expectation.

The psalmist repeats the word wait twice in one line.

That repetition shows how completely he leans on God alone.

⏳ Wait means active expectant hope

🙌 Not empty sitting around

🔁 Wait is repeated for emphasis

📖 He leans on God completely

## 📜 In His Word Do I Hope

His word points to an actual promise God has spoken.

This hope is not vague optimism about how things might turn out.

The psalmist is trusting something specific, not a general feeling.

A promise gives hope a solid place to stand.

📜 His word means a spoken promise

🚫 Not vague or general optimism

🎯 Hope is aimed at something specific

📖 A promise gives hope solid ground

## 🌃 More Than They That Watch For The Morning

Ancient cities posted watchmen on the walls through the night.

Their whole shift depended on the sun finally rising.

Watching for dawn meant staring into the dark for hours.

Sunrise finally meant safety and the end of a long shift.

🌃 Watchmen guarded city walls at night

🌄 They waited for sunrise to end their shift

⏰ Hours of staring into total darkness

📖 Sunrise meant safety after a long wait

## 🔁 I Say, More Than They That Watch For The Morning

The psalmist repeats the exact same line twice in a row.

Hebrew poetry often repeats a line to add weight to it.

He is not being careless with words here.

He is doubling down on how badly he wants God.

🔁 The line is repeated on purpose

📣 Repetition adds weight in Hebrew poetry

💪 He is doubling down, not stalling

📖 His longing for God is intense

## 🇮🇱 Let Israel Hope In The LORD

The psalm now shifts from one voice to the whole nation.

What one person just modeled becomes a command for everyone.

Personal trust in God was never meant to stay private.

It becomes an example the whole community is invited to follow.

🇮🇱 The whole nation is now addressed

🗣️ One voice becomes a shared command

🤝 Personal trust becomes a public example

📖 The whole community is invited to hope

## 💗 With The LORD There Is Mercy

"Mercy" here points to God's loyal, covenant keeping love.

This is not a passing feeling of pity.

It is a steady commitment God has bound himself to keep.

Israel can count on this loyalty the way they trust the sunrise.

💗 Mercy means loyal covenant love

🚫 Not a passing feeling of pity

🔒 God bound himself to this commitment

📖 Israel can count on it always

## 💰 Plenteous Redemption

"Plenteous" means more than enough, with plenty left over.

"Redemption" means paying a price to set someone free.

In this culture, redemption often meant buying back a slave or land.

God's redemption covers more than the debt actually costs.

💰 Plenteous means more than enough

🔓 Redemption means paying to set free

🏡 It often meant buying back land or people

📖 God's redemption covers the whole debt

## 🔓 He Shall Redeem Israel From All His Iniquities

This redemption is not only rescue from enemies or hardship.

It reaches all the way down to the sin underneath it.

The psalm started with a cry about sin in verse three.

It ends with that exact sin fully paid for.

🔓 Redemption reaches sin, not just trouble

🔗 It answers the cry from verse three

💯 All means the whole debt, not part

📖 The psalm ends with sin fully paid for
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_RAW_NOTES
);
