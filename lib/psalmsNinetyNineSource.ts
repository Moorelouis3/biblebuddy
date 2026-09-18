export type PsalmsNinetyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyNineRawNotes(rawText: string): PsalmsNinetyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+99:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 99 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+99:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+99:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 99 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 99,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 99:${startVerse}` : `Psalms 99:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 99 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_NINE_RAW_NOTES = `# Psalms 99:1-3
# 👑 The LORD Reigns, Enthroned In Zion
---
## 👑 The LORD Reigneth

"Reigneth" is a present tense claim, not a future hope.

This psalm does not wait for God to become king someday.

It declares he already rules, right now, over everything.

Psalm 96 pictured kings still waiting to be judged.

This psalm opens already standing on that finished truth.

👑 Reigneth means ruling right now
⏳ Not a future hope
🏛️ Builds past Psalm 96's coming judgment
📖 God's rule is already complete

## 😨 Let The People Tremble

"Tremble" here does not mean panic or blind terror.

It describes the right response to standing before a true king.

Ancient subjects reacted this way when a ruler entered the room.

The command matches the mood of a coronation, not a threat.

Reverence, not fear, is the point being made.

😨 Tremble means reverent awe
🚫 Not panic or terror
👑 Fits a coronation scene
📖 A true king deserves this response

## 🕊️ He Sitteth Between The Cherubims

"Cherubims" were the two winged figures carved above the ark of the covenant.

They faced each other with wings stretched over the mercy seat.

That space between them pictured God's throne resting on earth.

The image ties a real object in the temple to unseen splendor above it.

Israel could point to an exact place and say, there he reigns.

🕊️ Cherubims sat above the ark
👑 That space pictured God's throne
🏛️ Ties a real object to unseen splendor
📖 Israel could point to where he reigns

## 🌍 Let The Earth Be Moved

This does not contradict Psalm 93, which said the world cannot be moved.

That earlier psalm was describing the world's foundation, permanently secure.

This line describes the world's reaction, trembling before its king.

A stable planet can still shake at the sight of real power.

Foundation and reaction are two different things entirely.

🌍 Not a contradiction of Psalm 93
🏗️ That psalm meant a fixed foundation
📢 This means the world's trembling reaction
📖 Stability and reaction differ completely

## 📍 The LORD Is Great In Zion

"Zion" was the hill in Jerusalem where the temple stood.

Naming Zion ties God's universal reign to one specific address.

He was not just a distant, unreached, cosmic ruler.

His greatness had an actual home that Israel could visit.

📍 Zion was the temple's hill
🏙️ Ties a cosmic ruler to Jerusalem
🚫 Not just a distant abstract king
📖 His greatness had an actual home

## 🌐 High Above All The People

"All the people" widens this praise past just the nation of Israel.

The word behind it often points to the nations, not one crowd alone.

Zion was his home, but his rule reached everyone outside it too.

Local presence and universal authority are stated back to back.

🌐 People here often means the nations
🏠 Zion was his home not his limit
🌍 His rule reaches far past Israel
📖 Local presence pairs with universal rule

## 😮 Thy Great And Terrible Name

"Terrible" in the King James Bible does not mean bad or unpleasant.

It means something that inspires real awe and dread.

Calling God's name terrible means it commands genuine reverence.

The section ends by naming the reason for all of it, for it is holy.

That single word holy will close each part of this psalm three separate times.

😮 Terrible means awe inspiring here
🚫 Not bad or unpleasant
👑 His name commands real reverence
📖 Holy will repeat three times in this psalm

# Psalms 99:4-5
# ⚖️ A King Who Loves Justice
---
## ⚖️ The King's Strength Also Loveth Judgment

"Judgment" here does not mean a sentence handed down in anger.

It means the ability to rule with justice and set things right.

A king's strength meant little if he could not be trusted to judge well.

This king's power and his love for fairness are named together on purpose.

⚖️ Judgment means ruling with justice
🚫 Not an angry sentence
💪 Strength without fairness means little
📖 Power and fairness are named together

## 🛡️ Thou Dost Establish Equity

"Equity" means fairness applied the same way to everyone, no favorites.

A king could easily bend judgment toward the powerful.

Establishing equity means refusing to let that happen.

This king's rule is described as actively securing fairness, not just wishing for it.

🛡️ Equity means fairness for all
🚫 No favoritism toward the powerful
💪 He actively secures fairness
📖 A settled rule, not just a wish

## 🏷️ Executest Judgment And Righteousness In Jacob

"Jacob" here is simply another name for the nation of Israel.

Old Testament poetry often names Israel after its ancestor this way.

Judgment and righteousness are paired here as two sides of one rule.

One is a fair process, and the other is a right outcome.

🏷️ Jacob means the nation Israel
📜 A common poetic name for Israel
⚖️ Judgment and righteousness are paired
📖 Fair process and right outcome together

## ⬆️ Exalt Ye The LORD Our God

"Exalt" means to lift someone up in honor, higher than before.

This command is given to the whole worshiping community, not one person.

The same word appears again at the very end of this psalm.

Repeating a command this way ties the whole psalm's shape together.

⬆️ Exalt means lift up in honor
👥 Commanded to the whole community
🔁 The same word closes this psalm
📖 Repetition ties the psalm together

## 🦶 Worship At His Footstool

A "footstool" pictures the resting place in front of a king's throne.

Here the ark of the covenant fills that role for God's throne.

Worshipers bowed not only toward heaven but toward this earthly object.

The psalm will close on a holy hill, another physical dwelling place.

Together they trace one throne room, cherubim to footstool to hill.

🦶 Footstool pictures a throne's resting place
📦 The ark filled that role here
🙇 Worship faced an earthly object
📖 One throne room, cherubim to hill

# Psalms 99:6-9
# 🙏 Voices That Called And Were Answered
---
## 👥 Moses And Aaron Among His Priests

Moses is grouped here with priests even though he held no priestly office.

Aaron held the actual priestly office, offering sacrifices for the people.

Moses earns the label through his constant work standing between God and Israel.

The verse groups these men by their function as mediators, not their titles.

👥 Moses was not an ordained priest
🕯️ Aaron held the formal priestly office
🙏 Moses mediated for Israel constantly
📖 Grouped here by function, not title

## 📣 Samuel Among Them That Call Upon His Name

Samuel is remembered mainly as a prophet and judge over Israel.

This verse lifts up a different role, the one Moses and Aaron also played.

Samuel repeatedly prayed for the nation and God answered him.

All three men are named here for calling on God, not for their titles.

📣 Samuel is usually known as a prophet
🙏 Here he is named as an intercessor
👥 Joins Moses and Aaron in that role
📖 Named for calling on God, not titles

## ☁️ He Spake Unto Them In The Cloudy Pillar

The "cloudy pillar" was the visible cloud that led Israel through the wilderness.

God spoke to Moses directly from inside that same cloud.

This was not a vague word delivered from far away.

These three intercessors received real, direct communication from God himself.

☁️ Cloudy pillar led Israel through the desert
🗣️ God spoke to Moses from inside it
🚫 Not a distant or vague word
📖 They received real direct communication

## 🙌 Thou Wast A God That Forgavest Them

This forgiveness covered a nation that failed God again and again in the wilderness.

Israel complained, rebelled, and worshiped a golden calf during this same stretch of years.

None of that erased God's willingness to forgive them.

The psalm remembers mercy right alongside remembering real failure.

🙌 Forgiveness covered repeated failure
🐂 Israel even worshiped a golden calf
💞 None of it erased God's mercy
📖 Mercy and failure remembered together

## 🔧 Thou Tookest Vengeance Of Their Inventions

"Inventions" here does not mean clever new gadgets or ideas.

It means the sinful schemes and idols Israel devised on their own.

God forgave the people themselves but still judged those specific deeds.

Forgiveness for a nation did not erase consequences for particular sins.

🔧 Inventions means sinful schemes, not gadgets
🐂 Points to idols Israel devised
⚖️ Forgiveness did not erase consequences
📖 People forgiven, specific sins still judged

## ⛰️ Worship At His Holy Hill

"His holy hill" points back to Zion, the same hill named in verse two.

The psalm has now named a throne, a footstool, and a hill.

Together they trace one path from heaven's throne down to an actual mountain.

This is the third and final time the word holy closes a section.

That repeated word holy is the whole point of everything this psalm has said.

⛰️ Holy hill is Zion again
🪑 Throne, footstool, and hill form one path
🔁 Holy closes a section a third time
📖 Holy is the whole point of this psalm
`.trim();

export const PSALMS_NINETY_NINE_PERSONAL_SECTIONS = parsePsalmsNinetyNineRawNotes(PSALMS_NINETY_NINE_RAW_NOTES);
