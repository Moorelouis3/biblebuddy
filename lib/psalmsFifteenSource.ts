export type PsalmsFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFifteenRawNotes(rawText: string): PsalmsFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 15:${startVerse}` : `Psalms 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 15 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTEEN_RAW_NOTES = `# Psalms 15:1-2
# 🚪 Who May Dwell With God
---
## 🏕️ Who Shall Abide In Thy Tabernacle

"Abide" means to stay permanently, not to make a short visit.

The tabernacle was the tent where God's presence dwelt among Israel.

David is not asking who may enter the building once.

He is asking who may live in close fellowship with God.

That question sets up the entire psalm that follows.

🏕️ Tabernacle was where God dwelt

🛑 Abide means staying, not visiting

❓ David asks about lasting fellowship

📖 The rest of the psalm answers this

## ⛰️ Who Shall Dwell In Thy Holy Hill

The holy hill refers to Mount Zion in Jerusalem.

That was where the ark and later the temple stood.

Zion is not simply a piece of geography.

It marks the specific place where God chose to be present with His people.

Asking to dwell there means asking to stay near God Himself.

⛰️ Holy hill means Mount Zion

🏛️ Site of the ark and temple

📍 Zion marks God's chosen presence

📖 Dwelling there means staying near God

## 🚶 He That Walketh Uprightly

"Uprightly" means living with complete honesty and integrity.

It does not describe someone who never makes a mistake.

It describes a direction, a consistent path of honest living.

The Hebrew picture is of a straight road instead of a crooked one.

This is the first qualification David names for staying close to God.

🚶 Uprightly means honest, consistent living

🛣️ Pictures a straight road, not crooked

✅ Not perfection but a settled direction

📖 The first mark of nearness to God

## ⚖️ And Worketh Righteousness

This does not mean simply believing the right things about God.

"Righteousness" here means action that matches what is right.

Belief that never becomes action falls short of what this verse asks.

David pairs an honest walk with an active life of doing right.

Faith in this psalm shows up in daily behavior, not only in words.

⚖️ Righteousness means doing what is right

🚫 Belief alone is not enough here

🤝 Walk and work must go together

📖 Faith shows up in daily behavior

## 💬 And Speaketh The Truth In His Heart

"In his heart" points to something deeper than public speech.

This person is honest even in thoughts no one else can hear.

Many people can manage honest words in front of others.

Fewer are honest with themselves when no one is listening.

David is describing a truthfulness that goes all the way down.

💬 Truth in the heart means inward honesty

👥 Public honesty is easier to fake

🤫 This truthfulness holds up unseen

📖 It goes all the way down

# Psalms 15:3
# 🗣️ How He Treats His Neighbor
---
## 🐍 He That Backbiteth Not With His Tongue

"Backbite" means to slander someone behind their back.

It describes speaking harm about a person who is not there to answer.

This is different from confronting someone directly about a real problem.

Backbiting hides behind a person's absence to do damage.

David rules this out completely for someone who wants to stay near God.

🐍 Backbite means slander behind someone's back

🙈 Targets those unable to answer

🚪 Different from direct, honest confrontation

📖 This is ruled out entirely

## 💔 Nor Doeth Evil To His Neighbour

This line moves from words to actions.

Harming a neighbor through unfair or cruel treatment does real damage too.

"Neighbour" here means anyone within reach, not only a close friend.

The person who dwells with God guards both tongue and hands.

Real integrity covers everything a person says and does.

💔 Evil to a neighbor means real harm

🌍 Neighbor means anyone within reach

✋ Guards both tongue and hands

📖 Integrity covers words and actions

## 📢 Nor Taketh Up A Reproach Against His Neighbour

"Taketh up a reproach" means repeating a rumor someone else started.

This person did not invent the accusation.

He simply passed it along instead of stopping it.

Spreading someone else's slander causes the same damage as starting it.

David closes the loop on gossip by naming every way it travels.

📢 Taketh up a reproach means repeating rumors

🔁 The rumor did not start here

🚫 Passing it along still causes harm

📖 Every way gossip travels is named

# Psalms 15:4-5
# 💰 Integrity That Never Moves
---
## 👀 In Whose Eyes A Vile Person Is Contemned

"Vile" describes someone who openly rejects God and lives wickedly.

"Contemned" means viewed with genuine disapproval, not casual dislike.

This person does not celebrate wrongdoing to seem tolerant or agreeable.

He sees evil clearly and refuses to admire it.

Good judgment includes being honest about what is actually wrong.

👀 Vile means openly wicked living

🚫 Contemned means genuine disapproval

🙅 Refuses to admire wrongdoing

📖 Honest judgment names what is wrong

## 🤝 But He Honoureth Them That Fear The LORD

This is the other side of the same honest judgment.

He gladly respects those who genuinely honor God.

"Fear the LORD" describes reverence, not being afraid of Him.

Character is judged by God's standard, not by wealth or status.

Right judgment always points in two directions at once.

🤝 Honors those who fear the LORD

🙇 Fear here means reverence

⚖️ Judged by God's standard, not status

📖 Right judgment points both directions

## 🤞 He That Sweareth To His Own Hurt, And Changeth Not

This does not describe someone trapped by a careless promise.

It describes someone who keeps a promise even after it becomes costly.

Circumstances change, but this person's word does not.

Breaking a promise the moment it becomes inconvenient is common.

Keeping it anyway is what marks real integrity.

🤞 Keeps promises even when costly

💸 Circumstances change, the word does not

🚪 Breaking it would be easy

📖 Keeping it anyway marks integrity

## 💰 He That Putteth Not Out His Money To Usury

"Usury" means lending money at crushing interest rates to someone in need.

Ancient law allowed normal business lending but forbade preying on the poor this way.

This person refuses to profit off another person's desperation.

Money is treated as a tool, not a trap for the vulnerable.

How someone handles money reveals what they actually believe about people.

💰 Usury means predatory lending

🚫 Refuses to profit off desperation

🧰 Money used as tool, not trap

📖 Money reveals what a person believes

## ⚖️ Nor Taketh Reward Against The Innocent

"Reward" here means a bribe paid to twist a legal case.

This describes refusing money to falsely condemn someone who did nothing wrong.

Ancient courts were vulnerable to exactly this kind of corruption.

This person's integrity cannot be purchased at any price.

Justice matters more to him than personal gain.

⚖️ Reward here means a bribe

🚫 Refuses to condemn the innocent

🔒 Integrity cannot be purchased

📖 Justice matters more than personal gain

## 🪨 He That Doeth These Things Shall Never Be Moved

This is the promise attached to everything listed above.

"Never be moved" pictures something built on solid rock, not sand.

Life will still bring storms, failure, and uncertainty to this person too.

But his standing with God does not shake the way circumstances do.

The psalm that opened with a hard question ends with lasting stability.

🪨 Never moved means solid, unshaken

🌊 Storms still come to this life

🏔️ Standing with God does not shake

📖 A hard question ends in stability
`.trim();

export const PSALMS_FIFTEEN_PERSONAL_SECTIONS = parsePsalmsFifteenRawNotes(PSALMS_FIFTEEN_RAW_NOTES);
