export type JeremiahFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyFiveRawNotes(rawText: string): JeremiahFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 45:${startVerse}` : `Jeremiah 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Jeremiah 45 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_FIVE_RAW_NOTES = `# Jeremiah 45:1-3
# 🖋️ A Private Word For Baruch
---
## 📜 The Word That Jeremiah The Prophet Spake Unto Baruch

Baruch was not a prophet himself.

He was Jeremiah's personal scribe and close companion.

Most of Jeremiah's words survive today because Baruch copied them down.

This chapter is the only one in the whole book addressed to Baruch alone.

📜 Baruch served as Jeremiah's scribe

🤝 He was a close companion, not a prophet

✍️ He preserved Jeremiah's words in writing

📖 This chapter speaks to him personally

---
## 📛 The Son Of Neriah

Son of Neriah tells readers which family Baruch belonged to.

Ancient Israelites commonly used a father's name to tell people apart.

Archaeologists have even found ancient clay seals stamped with his name.

One reads Baruch son of Neriah the scribe, matching this exact man.

📛 Son of Neriah names his father

👪 Fathers' names identified Israelite sons

🏺 Clay seals bearing his name have been found

📖 Archaeology lines up with this verse

---
## 🗣️ In A Book At The Mouth Of Jeremiah

At the mouth of means Baruch wrote down Jeremiah's spoken words.

Jeremiah did not write with his own hand very often.

He spoke the message aloud while Baruch sat and recorded it.

This same method produced the famous scroll burned by King Jehoiakim in chapter thirty six.

🗣️ At the mouth means spoken aloud

✍️ Baruch wrote while Jeremiah dictated

📜 The same method filled an entire scroll

📖 Chapter thirty six tells what happened to it

---
## 📅 In The Fourth Year Of Jehoiakim

This date ties Baruch's complaint to one specific year, around 605 BC.

That same year opens chapter thirty six of this book.

There Jeremiah first dictated his long scroll to Baruch.

King Jehoiakim later cut that scroll apart and burned it.

📅 This happened around 605 BC

🔥 The same year the scroll was burned

📜 Jeremiah first dictated that scroll to Baruch

📖 He heard this word amid that crisis

---
## 😔 Woe Is Me Now

Woe is me now is an old way of crying out in despair.

Baruch is not hiding his pain or performing strength for Jeremiah.

He admits flatly that this calling has become more than he can bear.

Scripture rarely lets us hear a scribe's own private complaint this directly.

😔 Woe is me means deep despair

🙈 Baruch does not hide his pain

💬 He admits the calling feels unbearable

📖 This is a rare personal complaint in scripture

---
## ➕ The LORD Hath Added Grief To My Sorrow

Added grief to my sorrow means fresh pain stacked on top of pain already there.

Baruch already carried sorrow before this message even came.

He is not describing one problem but two layers of suffering at once.

Serving a prophet whose warnings nobody wanted to hear took a real toll.

➕ Grief added means pain stacked on pain

😞 Baruch already carried sorrow

🗣️ He served a prophet few wanted to hear

📖 Two layers of suffering piled up at once

---
## 😩 I Fainted In My Sighing, And I Find No Rest

Fainted here pictures complete physical and emotional exhaustion, not just tiredness.

Sighing describes the heavy, repeated groaning of someone worn all the way down.

No rest means his body and mind never get to stop and recover.

Baruch sounds like a man at the very end of what he can carry.

😩 Fainted means complete exhaustion

😓 Sighing pictures heavy repeated groaning

🛌 No rest means no relief at all

📖 Baruch sounds utterly worn down

# Jeremiah 45:4-5
# ⚖️ God's Answer To Baruch's Complaint
---
## 🏗️ That Which I Have Built Will I Break Down

This phrase echoes God's call to Jeremiah back in chapter one, verse ten.

There God said Jeremiah's work would include both building and plucking up.

Here God applies that same pattern to the whole land of Judah.

God is not punishing Baruch personally.

This coming judgment is far bigger than one man.

🏗️ This echoes Jeremiah's call in chapter one

🌾 Build and pluck up describe the same pattern

🇮🇱 Judah itself is what God is tearing down

📖 Baruch is not the target of this judgment

---
## 🎯 Seekest Thou Great Things For Thyself

Seekest thou great things means do you keep chasing status or success for yourself.

This is not a general command against all ambition.

It is a direct warning for one specific moment in history.

Judah was about to fall.

Personal advancement was the wrong goal to chase right then.

🎯 Seekest great things means chasing status

🚫 This is not a ban on all ambition

⏳ The timing made ambition the wrong focus

📖 A falling nation was no time to climb

---
## 🌍 I Will Bring Evil Upon All Flesh

All flesh means every nation, not only Judah and Jerusalem.

The chapters right after this one pronounce judgment on Egypt, Babylon, and several other nations.

Baruch's personal grief sat inside a much larger, world sized judgment.

His own trouble was real.

It was also part of something far bigger.

🌍 All flesh means every nation on earth

⚔️ Egypt and Babylon face judgment next

🔎 Baruch's grief sat inside a global judgment

📖 His pain was real, not the whole story

---
## 🏃 Thy Life Will I Give Unto Thee For A Prey

"For a prey" is a Hebrew idiom meaning a hunted thing that still gets away alive.

God used this exact same phrase for Ebedmelech back in chapter thirty nine.

It means Baruch would survive the coming disaster.

Everything around him would still fall apart.

Surviving was never going to feel safe or comfortable, only alive.

🏃 For a prey means escaping alive

🔁 The same promise was given to Ebedmelech

💔 Everything around Baruch would still collapse

📖 God promised survival, not comfort
`.trim();

export const JEREMIAH_FORTY_FIVE_PERSONAL_SECTIONS = parseJeremiahFortyFiveRawNotes(JEREMIAH_FORTY_FIVE_RAW_NOTES);
