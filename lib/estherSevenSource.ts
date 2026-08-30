export type EstherSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherSevenRawNotes(rawText: string): EstherSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 7:${startVerse}` : `Esther 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Esther 7 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_SEVEN_RAW_NOTES = `# Esther 7:1-2
# 🍷 The King Presses For An Answer
---
## 🍷 So The King And Haman Came To Banquet

This is the second time Esther has invited only the king and Haman to a private banquet.

The first banquet in chapter five ended without Esther naming her request.

Haman still believes he is the most honored man in the whole kingdom.

He has no idea he is walking straight into the trap Esther has been building.

🍷 Second private banquet for the king and Haman

🎭 Haman feels honored, not threatened

⏳ Esther delayed her request once already

📖 The trap has been building since chapter five

## 🍇 On The Second Day At The Banquet Of Wine

A banquet of wine was a formal Persian feast centered on drinking.

Persian kings often made major decisions during these wine banquets.

Esther chose this exact setting on purpose.

The same setting shaped Vashti's downfall and Esther's own rise to queen.

Waiting for the right moment mattered as much as what she would say.

🍇 A banquet of wine centered on drinking

👑 Major royal decisions often happened here

🔁 The same setting shaped Vashti and Esther

📖 Esther chose her timing with care

## ❓ What Is Thy Petition, And It Shall Be Granted Thee

The king asks Esther the same question he already asked at the first banquet.

This time he sounds more insistent.

He expects a real answer at last.

A petition is a formal request brought directly to the king.

He commits himself publicly to grant it before he even hears what it is.

❓ The king repeats his earlier question

⏰ He expects a real answer now

📜 A petition is a formal royal request

➡️ He commits before hearing the request

## 👑 Even To The Half Of The Kingdom

This exact phrase already appeared twice before, in chapter five.

It was a common royal saying for extreme generosity.

It did not mean a literal offer to split the empire.

Ancient rulers used this kind of exaggerated promise to show favor.

The king signals that whatever Esther wants, he intends to give it fully.

👑 A royal phrase of extreme generosity

🚫 Not a literal offer to split the kingdom

🔁 The same phrase appeared in chapter five

📖 The king signals full willingness to give

# Esther 7:3-4
# 😢 Esther Names The Threat
---
## 🙏 If I Have Found Favour In Thy Sight, O King

Esther opens with the same humble language she used in chapter five.

That kind of phrase was standard court speech for approaching a king.

Using it again shows Esther is still being careful.

She has been invited twice now, but she has not grown careless.

🙏 Formal court language for a request

🔁 Esther used this phrase before

🎯 She stays careful even now

➡️ Humility still guides her approach

## 😨 Let My Life Be Given Me At My Petition

This is the moment the king learns Esther's own life is in danger.

He still does not know she is Jewish.

Her life and her people's lives are now tied together in one sentence.

The king who loves her is suddenly hearing that someone wants her dead.

😨 The king learns her life is threatened

🤐 He still does not know she is Jewish

🔗 Her fate and her people's fate are joined

📖 The threat lands as personal, not political

## ⚔️ To Be Destroyed, To Be Slain, And To Perish

Esther piles up three different words for death in a row.

Haman's original decree in chapter three used this same stacked language.

Repeating it here forces the king to hear his own decree spoken aloud.

He is about to realize what he actually approved.

⚔️ Three words for death, stacked together

📜 This matches Haman's decree from chapter three

👂 The king hears his own decree again

📖 He starts to see what he approved

## 💰 The Enemy Could Not Countervail The King's Damage

Countervail means to make up for or equal in value.

Esther says Haman's silver could never cover the true cost of this loss.

If her people had only been sold as slaves, she would have stayed silent.

Genocide is a loss no payment could ever balance out.

💰 Countervail means to equal in value

🪙 Haman's silver could not cover this

🤐 Slavery alone she would have accepted

📖 No payment could balance this loss

# Esther 7:5-6
# 😱 Haman Is Unmasked
---
## 😠 Who Is He, And Where Is He

The king does not yet realize the guilty man is sitting right beside him.

He demands an immediate answer to protect his own queen.

Ahasuerus approved Haman's decree back in chapter three without reading it closely.

He is about to discover that his own signature made this threat possible.

😠 The king does not know the truth yet

👀 Haman is sitting right beside him

📜 He approved the decree without reading closely

📖 His own signature enabled this threat

## 💢 That Durst Presume In His Heart To Do So

Durst is an old word meaning dared.

The king cannot imagine anyone being bold enough to threaten his queen.

His fury grows the longer the guilty man stays unnamed.

Every second of silence raises the tension in the room.

💢 Durst means dared

😡 The king cannot believe anyone would dare this

⏳ His fury grows before the name is given

➡️ The silence raises the tension further

## 🎯 The Adversary And Enemy Is This Wicked Haman

Esther finally says Haman's name directly to his face.

This is the first time in the whole book that Esther confronts him herself.

She waited through two banquets to build the courage for this one sentence.

Every earlier scene in the book has been building toward this accusation.

🎯 Esther names Haman directly

🗣️ Her first direct confrontation with him

⏳ Two banquets built toward this moment

📖 The whole book aims at this line

## 😰 Haman Was Afraid Before The King And The Queen

Haman goes from the second most powerful man in Persia to a terrified prisoner.

Moments earlier he expected to celebrate his enemy Mordecai's death.

Now his own life hangs on the king's next words.

This same reversal shapes the whole book of Esther.

😰 Haman's power collapses instantly

🔄 Moments earlier he expected a celebration

⚖️ His own life now hangs in the balance

📖 Reversal is the whole book's pattern

# Esther 7:7-8
# 🌿 The King's Wrath In The Garden
---
## 🌿 Arising From The Banquet, In His Wrath, Went Into The Palace Garden

The king cannot stay seated once he understands what Haman has done.

Persian gardens were often built right next to the banquet hall.

Stepping outside gives him space to decide Haman's fate.

His wrath needs room the banquet hall cannot give him.

🌿 The king cannot stay seated

🏛️ Persian gardens sat right beside banquet halls

🤔 He needs space to decide Haman's fate

➡️ His anger needs room to breathe

## 🙇 Haman Stood Up To Make Request For His Life To Esther

Haman now begs for mercy from the woman he tried to destroy.

Only hours earlier he planned a celebration for hanging her cousin Mordecai.

His confidence from earlier in the book is completely gone.

He has nowhere left to turn but the queen herself.

🙇 Haman begs the woman he tried to destroy

⏳ Hours earlier he planned a celebration

😨 His earlier confidence is completely gone

📖 Esther is his only remaining hope

## 🛏️ Haman Was Fallen Upon The Bed Whereon Esther Was

Ancient banquets were often eaten while reclining on low couches.

Haman falls across Esther's couch while begging for his life.

The king walks back in at the exact moment this looks worst.

Bad timing turns a desperate plea into what looks like an assault.

🛏️ Guests reclined on couches at banquets

🙏 Haman was begging, not attacking

⏰ The king returns at the worst moment

📖 Bad timing makes it look like an assault

## 😡 Will He Force The Queen Also Before Me In The House

The king reads Haman's posture as a final, unforgivable insult.

This misunderstanding gives the king the final push to condemn Haman.

As soon as the words leave his mouth, servants cover Haman's face.

Covering a condemned man's face was an ancient signal of a sealed fate.

😡 The king assumes the worst

⚖️ This seals the king's decision

🫥 Servants immediately cover Haman's face

📖 A covered face meant his fate was sealed

# Esther 7:9-10
# 🪓 Haman's Own Trap Closes
---
## 🗣️ Harbonah, One Of The Chamberlains

Harbonah was briefly named back in chapter one as a royal servant.

He had clearly been watching Haman's plot against Mordecai the whole time.

The instant Haman falls from favor, Harbonah speaks against him.

Court servants often survived by knowing when to switch sides.

🗣️ Harbonah appeared briefly in chapter one

👀 He had been watching Haman's plot

⚡ He speaks up the instant Haman falls

📖 Survival in court meant reading the moment

## 📏 The Gallows Fifty Cubits High

A cubit measured about eighteen inches, from an elbow to a fingertip.

Fifty cubits comes out to about seventy five feet.

That is taller than most buildings in the ancient city.

Haman built it huge on purpose.

He wanted the whole city to see Mordecai die.

The same gallows built for public humiliation is about to be used on Haman himself.

📏 A cubit was about eighteen inches

🏗️ Fifty cubits reached about seventy five feet

👁️ Haman wanted the whole city watching

📖 That gallows now waits for Haman

## 🪓 Made For Mordecai, Who Had Spoken Good For The King

This is the exact gallows Haman built back in chapter five.

Chapter six already showed why Mordecai's loyalty could not be ignored anymore.

Mordecai once exposed a real assassination plot against the king.

That old, unpaid debt now works squarely against Haman.

🪓 The gallows is from chapter five

🔁 Chapter six already raised his loyalty

🛡️ Mordecai exposed a real assassination plot

📖 That debt now works against Haman

## ⚖️ Hang Him Thereon

The king gives this order the instant he understands everything.

There is no trial or appeal.

Haman is executed on the very structure he built for his enemy.

Justice moves as fast as Haman's own plans once did.

⚖️ The king orders execution immediately

🚫 No trial or appeal is given

🪓 Haman dies on his own gallows

📖 His own plan turns against him

## 🕊️ Then Was The King's Wrath Pacified

Only Haman's death satisfies the king's anger.

The whole story began with Haman plotting a nation's destruction over one man's refusal to bow.

It ends with Haman destroyed by the very trap he built for someone else.

The book of Esther keeps repeating this same pattern.

Reversal runs from the first threat to this final verse.

🕊️ Only Haman's death ends the king's anger

🔄 The story began with Haman's plot

🪤 It ends with his own trap

📖 Esther is a story built on reversal
`.trim();

export const ESTHER_SEVEN_PERSONAL_SECTIONS = parseEstherSevenRawNotes(ESTHER_SEVEN_RAW_NOTES);
