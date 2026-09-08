export type PsalmsFiftyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyFourRawNotes(rawText: string): PsalmsFiftyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+54:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 54 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+54:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+54:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 54 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 54,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 54:${startVerse}` : `Psalms 54:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 54 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_FOUR_RAW_NOTES = `# Psalms 54:1-3
# 🆘 A Cry For Rescue
---
## 🙏 Save Me, O God, By Thy Name

"By thy name" does not mean David expects magic in a word.

In the Old Testament, a name stood for someone's whole character.

David is asking God to act like the God He has already shown Himself to be.

This is an appeal to God's own reputation.

"Judge me by thy strength" repeats the same plea.

This time David appeals to God's power instead of His name.

🙏 Appeals to God's revealed character

🔁 The plea repeats in the next line

🕊️ David trusts who God already is

📖 God's name means character, not magic

## ⚖️ Judge Me By Thy Strength

In English, the word "judge" usually sounds like a verdict against someone.

In the Old Testament, judging can also mean ruling in someone's favor.

David is asking God to act as a judge who clears the accused.

He wants God's strength to prove him innocent in front of his accusers.

This is closer to a legal defense than a punishment.

⚖️ Judge here can mean rule in favor

🛡️ God's strength defends the accused

📜 This pictures a courtroom, not a curse

📖 David asks to be proven innocent

## 👂 Give Ear To The Words Of My Mouth

"Give ear" is an old way of asking someone to listen closely.

It pictures leaning in toward the sound, not just hearing in passing.

David is not making small talk with God.

He wants God's full attention on exactly what he is about to say.

This kind of urgent request shows up often in the psalms of lament.

👂 Give ear means listen closely

🎯 It pictures full attention, not passing notice

🗣️ David wants to be truly heard

📖 This urgency marks a psalm of lament

## ⚔️ Strangers Are Risen Up Against Me

"Strangers" here does not mean people David had simply never met.

It describes people who acted like outsiders to God's covenant.

Many scholars connect this psalm to the Ziphites.

1 Samuel 23 says they betrayed David's hiding place to Saul.

The Ziphites lived in Judah, David's own territory.

Betrayal from people who should have been allies cuts deeper than an open enemy.

⚔️ Strangers means covenant outsiders, not unknown people

🗺️ Likely refers to the Ziphites

📜 1 Samuel 23 records their betrayal

📖 Betrayal from allies wounds the deepest

## 🎯 Oppressors Seek After My Soul

"Seek after my soul" sounds like a peaceful phrase in English.

It is not.

In Hebrew idiom, seeking someone's soul means hunting them down to kill them.

David is not describing rivals who simply disagree with him.

He is describing men who are actively trying to end his life.

This same phrase appears elsewhere in the psalms whenever David is in real danger.

🎯 Seeking the soul means hunting to kill

💀 This is not a gentle complaint

🏹 Real enemies were pursuing David's life

📖 This phrase marks genuine danger

## 🙈 They Have Not Set God Before Them

This line does not claim David's enemies were atheists.

"Setting God before them" means living with His presence and judgment in mind.

These men were not confused about whether God exists.

They simply lived as though His opinion did not matter.

That choice, not their beliefs, is what made them dangerous.

🙈 Not atheism, but ignoring God's presence

⚖️ They lived without regard for judgment

🚫 Their choice made them dangerous

📖 Practical unbelief shows in how we live

# Psalms 54:4-7
# 🛡️ Confidence And Praise
---
## 🤝 God Is Mine Helper

"Behold" signals a sudden shift from fear to confidence.

David has just described real enemies hunting him.

Now he states a simple fact that changes everything.

"Helper" pictures someone who steps in to assist, not a distant observer.

David is not hoping God will help.

He is stating that God already is his helper.

👀 Behold marks a sudden shift in tone

🤝 Helper means an active, present ally

🔀 Fear turns to confidence in one line

📖 David states this as present fact

## 🫂 The Lord Is With Them That Uphold My Soul

"Uphold my soul" is an idiom for keeping someone standing when they could collapse.

Picture someone catching a friend before they fall.

David is not just naming God as a friend.

He is naming the people God has placed around him to help carry the weight.

The Lord works through real people, not only through direct miracles.

🫂 Uphold means keep from falling

🤲 Pictures someone catching a friend

🧑 God works through real people

📖 Support often comes through others

## 💥 He Shall Reward Evil Unto Mine Enemies

This line can sound like David wants personal revenge.

In the psalms, "reward" language usually appeals to God's justice, not David's own hands.

David is asking God to judge, not asking permission to attack anyone himself.

David hands the judgment to God instead of taking revenge himself.

This kind of prayer is called an imprecation, a request for God's justice against evil.

⚖️ David hands judgment over to God

🚫 This is not personal revenge

🙏 Handing it to God was the godly path

📖 This is called an imprecatory prayer

## ✂️ Cut Them Off In Thy Truth

"Cut them off" means to bring someone's harmful influence to a complete end.

It does not describe a slow decline.

It pictures a decisive, final stop.

"In thy truth" means this request lines up with who God actually is, not personal anger.

David is asking for justice that matches God's own faithfulness.

✂️ Cut off means a final end

⏱️ Not a slow decline, a decisive stop

⚖️ Grounded in God's truth, not anger

📖 David asks for justice that fits God's nature

## 🕊️ I Will Freely Sacrifice Unto Thee

"Freely" here does not mean the sacrifice cost David nothing.

It describes a freewill offering, one given by choice, not required by law.

Most Old Testament offerings were commanded.

This one was voluntary, given purely out of gratitude.

David is not paying a debt to God.

He is choosing to give out of thankfulness.

🕊️ Freely means voluntary, not required

🎁 A freewill offering, given by choice

📜 Most offerings in the law were commanded

📖 David gives this one from gratitude

## 🎶 I Will Praise Thy Name, O LORD

Praising God's name means praising who He actually is, not just saying His title.

David already asked God to act "by thy name" back in verse one.

Now he circles back to that same name in praise.

The psalm moves from appealing to God's character to celebrating it.

"For it is good" names the reason for that praise.

God's name itself is trustworthy and worth celebrating.

🎶 Praise focuses on who God is

🔁 Echoes David's plea from verse one

📈 The psalm moves from asking to praising

📖 God's name itself is good and trustworthy

## 🙌 He Hath Delivered Me Out Of All Trouble

Notice the tense change here.

David spent the whole psalm asking God to act.

Suddenly he speaks as if the rescue has already happened.

This shift is common in psalms that move from request to confidence.

David is not confused about his timeline.

He is expressing certainty that God will answer before the answer even arrives.

⏳ Notice the shift from future to past tense

🙌 David speaks as if rescue already happened

🎵 This pattern is common in the psalms

📖 Confidence can arrive before the answer does

## 👁️ Mine Eye Hath Seen His Desire Upon Mine Enemies

This is a Hebrew idiom, not a description of literal eyesight.

"Mine eye hath seen my desire" means David has personally witnessed his enemies' defeat.

It is not a wish for cruelty.

It is a statement that justice was actually carried out.

The psalm that opened with a cry for rescue ends with rescue confirmed.

👁️ An idiom, not literal eyesight

✅ David has witnessed real justice

🚫 Not a wish for cruelty

📖 The psalm ends with rescue confirmed
`.trim();

export const PSALMS_FIFTY_FOUR_PERSONAL_SECTIONS = parsePsalmsFiftyFourRawNotes(PSALMS_FIFTY_FOUR_RAW_NOTES);
