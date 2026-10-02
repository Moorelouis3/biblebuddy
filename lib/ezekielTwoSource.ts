export type EzekielTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwoRawNotes(rawText: string): EzekielTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 2:${startVerse}` : `Ezekiel 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Ezekiel 2 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWO_RAW_NOTES = `# Ezekiel 2:1-3
# 🧍 Stand Upon Thy Feet
---
## 🧍 Son Of Man

Son of man simply means a human being, a mortal person.

God uses this title for Ezekiel more than ninety times in this book.

It sets him apart from the glowing throne he just saw in chapter one.

Ezekiel is flesh and dust, not an angel or a heavenly being.

The same title appears later for Daniel, and finally for Jesus himself.

A mortal man is the one chosen to carry God's words.

🧍 Son of man means a mortal human

🔢 Used for Ezekiel over ninety times

👑 Contrasts him with the glorious throne

📖 God chooses a mortal to speak for Him

## 🦶 Stand Upon Thy Feet

Standing up here is not just a change in body position.

Ezekiel had been lying facedown since the vision in chapter one.

God calls him to rise because his mission is about to begin.

He does not leave Ezekiel overwhelmed on the ground.

A true calling always comes with a command to get up.

🙇 Ezekiel had fallen facedown in chapter one

🧍 Standing marks the start of his mission

👂 God calls him up to listen

➡️ A calling comes with a command to rise

## 💨 The Spirit Entered Into Me

Ezekiel could not stand up under his own strength.

The Spirit entering him means God's own power lifted him to his feet.

This is not Ezekiel's willpower taking over.

It is God supplying exactly what the moment required.

The same Spirit that moved over creation now moves in one man.

💨 The Spirit lifted Ezekiel to his feet

🙅 This was not his own willpower

🛠️ God supplied what the moment required

📖 God's Spirit still enables the called

## 💔 A Rebellious Nation That Hath Rebelled Against Me

The children of Israel here means the exiled nation around Ezekiel in Babylon.

Rebelled means they broke their covenant with God again and again.

Their fathers did this long before them.

Ezekiel's generation inherited the same stubborn pattern.

God sends Ezekiel straight into this generations long pattern of rebellion.

👥 Children of Israel means the exiled nation

💔 Rebelled means they broke the covenant

📜 Their fathers rebelled the same way

➡️ Generations of rebellion led to this exile

# Ezekiel 2:4-5
# 😤 Impudent Children And Stiffhearted
---
## 😒 Impudent Children And Stiffhearted

Impudent means shameless, without any respect for authority.

Stiffhearted means stubborn, unwilling to change no matter what they hear.

Together the words describe a people both disrespectful and unmovable.

God names their exact condition before Ezekiel even opens his mouth.

He is not sending Ezekiel to an easy audience.

😒 Impudent means shameless and disrespectful

🪨 Stiffhearted means stubborn and unmovable

🗣️ God names their condition up front

➡️ Ezekiel faces a genuinely hard audience

## 📯 Thus Saith The Lord GOD

This phrase is not a throwaway introduction.

It means Ezekiel speaks with full divine authority behind every word.

The message is not his own opinion or personal insight.

It belongs to the Lord GOD, and Ezekiel only delivers it.

This exact phrase repeats again and again through the whole book.

📯 Thus saith means full divine authority

🙅 Not Ezekiel's own opinion

📦 Ezekiel only delivers the message

📖 This phrase repeats as a mark of authority

## 👂 They Shall Know That There Hath Been A Prophet Among Them

Success here is not measured by whether Israel actually listens.

God tells Ezekiel plainly that they may refuse to hear him.

Even refusal still proves a true prophet stood among them.

Ezekiel's job is faithfulness to the message, not control over the outcome.

👂 Hearing him is not guaranteed

🚫 Their response is out of his control

🎯 Faithfulness is the real measure of success

📖 A messenger is not judged by the reply

# Ezekiel 2:6-7
# 🦂 Be Not Afraid
---
## 🦂 Briers And Thorns Be With Thee, And Thou Dost Dwell Among Scorpions

Briers and thorns picture a painful, hostile path to walk through.

Scorpions picture people whose words sting like a dangerous creature's attack.

God is warning Ezekiel that hostility is coming, not promising him comfort.

He prepares Ezekiel for real resistance before it ever happens.

🌵 Briers and thorns mean a painful path

🦂 Scorpions mean stinging, hostile people

⚠️ God warns him before the resistance comes

➡️ Preparation comes before the danger

## 😨 Be Not Afraid Of Their Words, Nor Be Dismayed At Their Looks

God repeats the command not to fear three separate times in two verses.

That repetition reveals how real the pressure to be afraid actually was.

Their looks means the hostile expressions Ezekiel will see on their faces.

The command never promises an easy audience, only courage in a hard one.

🔁 Fear is addressed three times here

😨 Repetition reveals how real the pressure was

😠 Their looks means hostile expressions

➡️ Courage, not comfort, is promised here

## 🙉 Whether They Will Hear, Or Whether They Will Forbear

Forbear here means refuse to listen, not simply wait patiently.

God names both possible outcomes before Ezekiel even begins speaking.

Either way, Ezekiel's instruction stays exactly the same, speak the words anyway.

The message does not change based on the expected response.

🙉 Forbear means refuse to listen

🔀 Both outcomes are named in advance

🗣️ Ezekiel speaks regardless of the response

📖 The message never bends to the audience

# Ezekiel 2:8-10
# 📦 Eat The Roll
---
## 🔄 Be Not Thou Rebellious Like That Rebellious House

God turns the warning directly onto Ezekiel himself for a moment.

The very word used for Israel's rebellion now becomes a warning to him.

A messenger can fail in the same way his audience does.

Ezekiel is told to obey before he is ever told to speak.

🔄 The warning turns onto Ezekiel himself

🪞 The same word used for Israel's sin

⚠️ A messenger can fail like his audience

➡️ Obedience comes before the speaking

## 🍽️ Open Thy Mouth, And Eat That I Give Thee

This is not a normal meal or a hunger being satisfied.

Eating here is a symbolic act of taking the message fully inside himself.

Ezekiel must receive God's word before he can ever deliver it.

A prophet cannot hand out what he has not first taken in.

🍽️ Eating here is symbolic, not literal hunger

📥 He takes the message fully inside himself

🗣️ Receiving comes before delivering

📖 A messenger must absorb the word first

## 📜 A Roll Of A Book

A roll of a book means a scroll, the normal form of a book in this era.

Scrolls were normally written on one side only.

This scroll was written within and without, on both sides.

That detail signals an unusually full and weighty message.

📜 A roll of a book means a scroll

📄 Scrolls were normally written on one side

🔄 This one was written on both sides

➡️ Fullness signals an unusually heavy message

## 😢 Lamentations, And Mourning, And Woe

These three words describe the entire content of the scroll.

Lamentations are songs of grief over loss.

Mourning is the outward expression of deep sorrow.

Woe is a warning cry of coming judgment.

There is no good news written on this scroll at all.

😢 Lamentations means songs of grief

🖤 Mourning means outward sorrow

⚠️ Woe means a warning of judgment

📖 This scroll carries no good news
`.trim();

export const EZEKIEL_TWO_PERSONAL_SECTIONS = parseEzekielTwoRawNotes(EZEKIEL_TWO_RAW_NOTES);
