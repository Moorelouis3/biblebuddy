export type PsalmsFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyThreeRawNotes(rawText: string): PsalmsFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+43:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 43 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+43:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+43:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 43 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 43,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 43:${startVerse}` : `Psalms 43:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 43 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_THREE_RAW_NOTES = `# Psalms 43:1-2
# ⚖️ Judge Me, O God
---
## ⚖️ Judge Me, O God, And Plead My Cause

"Judge" and "plead my cause" are both legal courtroom terms.

David pictures God as the judge in his own defense.

He is not asking to be punished.

He wants God to argue his case and clear his name.

David trusts God enough to ask for a fair hearing.

⚖️ Judge means a legal courtroom term

🗣️ Plead my cause means argue his case

🙅 David does not want punishment

📖 Real trust asks God for justice

## 🌍 Against An Ungodly Nation

"Ungodly nation" likely points to a hostile foreign people.

Many scholars believe it could also mean disloyal countrymen.

Either way, David faces real hostility from people who reject God.

He frames this as more than a personal grudge.

It becomes a conflict between two very different ways of life.

🌍 Ungodly nation may mean hostile foreigners

🤔 Or it could mean disloyal countrymen

⚔️ Either way real hostility surrounds David

📖 This becomes a conflict of two ways

## 😈 The Deceitful And Unjust Man

This phrase likely names one specific enemy leader, not the whole nation.

"Deceitful" means someone who lies and manipulates to get ahead.

"Unjust" means someone who treats others unfairly on purpose.

He trusts God to handle one man's evil personally.

😈 This names one specific enemy leader

🤥 Deceitful means someone who lies and manipulates

⚖️ Unjust means someone who treats others unfairly

📖 God handles evil David cannot control

## 💪 Thou Art The God Of My Strength

David calls God the source of his strength before asking his hard question.

He grounds his complaint in something true he already knows.

This is not doubt replacing faith.

It is faith wrestling honestly with pain.

💪 God is called David's true strength

🙏 David grounds his complaint in truth

🤝 This is not doubt replacing faith

📖 It is faith wrestling honestly with pain

## ❓ Why Dost Thou Cast Me Off

This exact question already appeared in Psalms forty two.

David is not stating a fact about God abandoning him.

He is describing exactly how this moment feels.

Scripture allows this kind of honest, unfiltered question.

🔁 This question already appeared in Psalms forty two

🙅 David is not stating a fact

🎭 He describes how this moment feels

📖 Scripture allows this kind of honest question

## 😔 Why Go I Mourning Because Of The Oppression Of The Enemy

Mourning here means grieving with real, visible signs like tears.

Oppression means being pressed down hard by someone stronger.

This grief comes from real ongoing pressure, not vague sadness.

David names his pain honestly instead of hiding it.

😢 Mourning means grieving with visible signs

👊 Oppression means being pressed down hard

🌧️ This grief comes from real ongoing pressure

📖 Naming pain honestly is not weakness

# Psalms 43:3-4
# 💡 Send Out Thy Light And Truth
---
## 💡 Send Out Thy Light And Thy Truth

Light and truth are pictured here as two messengers sent by God.

David asks them to guide him the way a guide leads a traveler.

Light pictures guidance out of darkness and confusion.

Together they show him the way back to God.

💡 Light and truth are pictured as messengers

🧭 David asks them to guide him

🌑 Light pictures guidance out of darkness

📖 God's truth leads him home

## ⛰️ Bring Me Unto Thy Holy Hill, And To Thy Tabernacles

The holy hill refers to Mount Zion in Jerusalem.

Tabernacles here means God's dwelling place, not simple tents.

David longs to worship God in the temple again.

This mirrors the same longing already expressed in Psalms forty two.

⛰️ Holy hill refers to Mount Zion

🏕️ Tabernacles means God's dwelling place

🙏 David longs to worship there again

📖 This echoes his longing from Psalms forty two

## 🎉 Unto God My Exceeding Joy

Exceeding joy means joy that overflows far past the ordinary.

David is not just picturing relief from trouble.

He is picturing real delight in God himself.

Worship here is the goal, not just an escape from pain.

🎉 Exceeding joy means joy that overflows

😊 David does not picture only relief

❤️ He pictures real delight in God

📖 Worship is the goal not an escape

## 🎵 Upon The Harp Will I Praise Thee

The harp was a common stringed instrument used in temple worship.

David often paired instruments with his prayers and psalms.

Praise here is a planned decision, not just a passing feeling.

He commits to worship before he even reaches the temple.

🎵 Harp was a common temple instrument

🎶 David often paired music with prayer

📅 Praise here is a planned decision

📖 He commits to worship before arriving

# Psalms 43:5
# 🎶 One Song In Two Halves
---
## 🔁 Why Art Thou Cast Down, O My Soul

This exact line already appeared twice before, in Psalms forty two.

Many scholars believe Psalms forty two and forty three were originally one single psalm.

Psalms forty three also has no title of its own, unlike almost every psalm around it.

The repeated refrain ties both halves back together as one song.

🔁 This refrain already appeared twice before

📜 Many scholars see one original psalm

🚫 Psalms forty three lacks its own title

📖 The refrain ties both halves together

## 🎯 Hope In God, For I Shall Yet Praise Him

Hope here means confident trust, not wishful thinking.

David commands his own soul to trust again, just as he did in Psalms forty two.

He commits to praise before his circumstances actually change.

The psalm ends the same way it was always heading, in trust.

🎯 Hope means confident trust not wishing

🗣️ David commands his own soul again

⏳ He commits to praise before circumstances change

📖 The psalm ends exactly where trust begins
`.trim();

export const PSALMS_FORTY_THREE_PERSONAL_SECTIONS = parsePsalmsFortyThreeRawNotes(PSALMS_FORTY_THREE_RAW_NOTES);
