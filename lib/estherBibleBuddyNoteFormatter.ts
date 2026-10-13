const bannedParagraphPatterns = [
  /The wording here matters because[^\n]*(?:\n[^\n]*)?/gi,
  /This verse keeps the reader inside Persian power\.[\s\S]*?The verse is showing the scene from inside that world:\s*\*\*[^*]*\*\*/gi,
  /This verse belongs to the movement of \*\*[^*]+\*\*\.[\s\S]*?The verse helps the scene keep moving:\s*\*\*[^*]*\*\*/gi,
  /This verse uses the language of law, command, or written authority\.[\s\S]*?the pressure in the story:\s*\*\*[^*]*\*\*/gi,
  /This verse pulls the focus toward the Jewish people[\s\S]*?inside the larger crisis:\s*\*\*[^*]*\*\*/gi,
];

const chapterSceneFocus: Record<number, Record<string, string[]>> = {
  2: {
    "The Search for a New Queen": [
      "👑 The king's regret does not undo Vashti's removal.",
      "🏛️ The palace turns the king's desire into a system.",
      "👩 The women are gathered by empire power, not romance.",
      "🧭 Esther is about to enter a world she did not create.",
    ],
    "Mordecai and Esther Are Introduced": [
      "🧬 The story narrows from Persia to one Jewish family in exile.",
      "💔 Esther's orphan story matters before her crown ever appears.",
      "🤐 Hidden identity becomes part of survival.",
      "🕯️ God is already preserving the line quietly.",
    ],
    "Esther Is Chosen": [
      "👸 Esther gains favor, but favor does not mean the system is safe.",
      "🧴 The beauty preparation shows how controlled palace life was.",
      "👑 The crown is placement, not just promotion.",
      "🧭 Her position will later become responsibility.",
    ],
    "Mordecai Saves the King": [
      "🚪 The king's gate is a place of official business.",
      "🗡️ Mordecai uncovers danger before he is rewarded.",
      "📜 The record is written down and then seems forgotten.",
      "🔁 That forgotten record becomes the seed of reversal later.",
    ],
  },
  3: {
    "Mordecai Refuses to Bow": [
      "😡 Haman's pride cannot tolerate one man standing apart.",
      "🙇 Bowing was public honor, not a casual greeting.",
      "🧬 Mordecai's Jewish identity raises the stakes.",
      "🔥 Personal offense begins turning into public violence.",
    ],
    "Haman Plans Genocide": [
      "🎲 The lot makes evil look planned and official.",
      "💰 Silver is offered to make destruction profitable.",
      "📜 The king's ring turns hatred into law.",
      "🩸 Haman targets a whole people because one man wounded his pride.",
    ],
    "The Decree Is Sent": [
      "🐎 The empire moves quickly once a decree is sealed.",
      "🏙️ Shushan is confused while the king and Haman sit down to drink.",
      "😨 The Jews now live under a dated death sentence.",
      "🕯️ The crisis is visible, but God's rescue is still hidden.",
    ],
  },
  4: {
    "Mourning in Sackcloth": [
      "😢 Mordecai's grief becomes public.",
      "🧵 Sackcloth and ashes show deep mourning and distress.",
      "🚪 Palace boundaries keep grief outside the gate.",
      "💔 The decree has become personal for every Jewish family.",
    ],
    "Mordecai Challenges Esther": [
      "👸 Esther is inside the palace, but she is not automatically safe.",
      "⚖️ The golden scepter shows the danger of approaching the king.",
      "🧠 Mordecai presses Esther to see purpose in her position.",
      "🔥 Hidden identity cannot stay hidden forever.",
    ],
    "Esther Chooses Courage": [
      "🙏 Esther calls for fasting before action.",
      "👑 She chooses to approach the king without being called.",
      "⚰️ If I perish, I perish is courage with the cost fully visible.",
      "🧭 Esther moves from survival into responsibility.",
    ],
  },
  5: {
    "Esther Approaches the King": [
      "👸 Esther steps into the court after three days of fasting.",
      "⚖️ The scepter means her life is spared.",
      "🍷 The banquet strategy shows patience under pressure.",
      "🧠 Courage here is careful, not careless.",
    ],
    "Haman Builds the Gallows": [
      "😡 Haman cannot enjoy honor while Mordecai remains unmoved.",
      "🏠 His home becomes an echo chamber for pride.",
      "🏗️ The gallows are built before the reversal arrives.",
      "🔁 What Haman prepares for Mordecai will return on his own head.",
    ],
  },
  6: {
    "The Sleepless King": [
      "😴 A sleepless night becomes the hinge of the story.",
      "📜 The chronicles bring forgotten loyalty back into view.",
      "🕯️ God is not named, but the timing is too exact to ignore.",
      "🔁 Reversal begins quietly before anyone in the palace understands it.",
    ],
    "Haman Honors Mordecai": [
      "👑 Haman thinks the king wants to honor him.",
      "🐎 Royal clothing and the king's horse mean public honor.",
      "😳 Haman must celebrate the man he came to destroy.",
      "🔥 Pride is being humiliated in front of the city.",
    ],
    "Haman's Fall Begins": [
      "💔 Haman returns home covered in shame.",
      "🧠 His own advisors can see the direction of the story now.",
      "⚠️ If Mordecai is Jewish, Haman's fall is already underway.",
      "🍷 The second banquet pulls him toward exposure.",
    ],
  },
  7: {
    "Esther Exposes Haman": [
      "👸 Esther finally names her people and her danger.",
      "🩸 The decree is exposed as a death sentence.",
      "😨 Haman realizes the queen is one of the people he targeted.",
      "⚖️ Truth spoken at the right time changes the room.",
    ],
    "Haman Is Executed": [
      "👑 The king's anger turns against Haman.",
      "🛏️ Haman's begging is misread as another violation.",
      "🏗️ The gallows built for Mordecai become Haman's end.",
      "🔁 Esther's reversal is now public.",
    ],
  },
  8: {
    "Mordecai Is Elevated": [
      "👑 Haman's house and ring move into Esther and Mordecai's hands.",
      "📜 The old decree still cannot simply be erased.",
      "😭 Esther pleads again because danger remains.",
      "🧭 Removing the enemy is not the same as undoing the damage.",
    ],
    "The Jews Are Given The Right To Defend Themselves": [
      "🐎 The king's messengers carry a new decree quickly.",
      "⚔️ The Jews are permitted to gather and stand for their lives.",
      "🎉 Mourning begins turning into joy.",
      "🌍 Fear across the empire shifts direction.",
    ],
  },
  9: {
    "The Jews Defend Themselves": [
      "⚔️ The day meant for destruction becomes a day of reversal.",
      "🛡️ The Jews stand for their lives against enemies.",
      "🚫 The repeated no-spoil detail shows this is defense, not greed.",
      "🎉 Survival turns into rest and gladness.",
    ],
    "Purim Is Remembered": [
      "📜 Mordecai writes the story down so rescue is not forgotten.",
      "🎲 Purim remembers the lot Haman cast.",
      "🎁 Joy becomes feasting, gifts, and care for the poor.",
      "🧬 Memory is passed to the next generation.",
    ],
  },
  10: {
    "Mordecai's Legacy": [
      "👑 Mordecai remains near the king, but he serves his people.",
      "📜 His greatness is recorded in Persian chronicles.",
      "🕊️ He seeks peace for the Jews.",
      "🎬 Esther ends quietly, but the people are alive.",
    ],
  },
};

function addSceneFocus(note: string, chapter: number) {
  const sceneMap = chapterSceneFocus[chapter] ?? {};

  return note.replace(/## 📖 ([^\n]+)\n\n(> \*\*)/g, (match, heading: string, verseStart: string) => {
    const focus = sceneMap[heading.trim()];
    if (!focus) return match;

    return `## 📖 ${heading}\n\n${verseStart}`;
  }).replace(/(## 📖 ([^\n]+)\n\n(?:> \*\*[^\n]+\n\n?)+)/g, (match, _full: string, heading: string) => {
    const focus = sceneMap[heading.trim()];
    if (!focus) return match;

    return `${match}### 🎯 What To Notice\n\n${focus.map((item) => `* ${item}`).join("\n")}\n\n`;
  });
}

function replaceRoboticHeadings(note: string) {
  return note
    .replace(/### 🎯 What To Notice/g, "### 👀 What This Scene Shows")
    .replace(/### 👀 What Is Happening Here/g, "")
    .replace(/### 📜 Words And Phrases To Understand/g, "### 📖 Key Words Right Here")
    .replace(/### ⚖️ The Pressure In The Scene/g, "### ⚖️ Why This Is Heavy")
    .replace(/### 🧭 How The Story Is Moving/g, "")
    .replace(/### 🔎 Walking Through The Verses/g, "")
    .replace(/### 🔎 Verse \d+/g, "")
    .replace(/# Bible Buddy Deep Takeaways/g, "# Final Thought")
    .replace(/# What To Carry Forward/g, "# Carry This Forward")
    .replace(/# The Big Lesson/g, "# The Big Lesson");
}

function removeRoboticParagraphs(note: string) {
  return bannedParagraphPatterns.reduce((updated, pattern) => updated.replace(pattern, ""), note);
}

function tightenSpacing(note: string) {
  return note
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/### 📍 Verse (\d+)\n\n\s*\n/g, "### 📍 Verse $1\n\n")
    .trim();
}

export function formatEstherBibleBuddyNote(note: string, chapter: number) {
  if (chapter === 1) return note;

  return tightenSpacing(removeRoboticParagraphs(replaceRoboticHeadings(addSceneFocus(note, chapter))));
}
