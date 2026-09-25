export type IsaiahFiftySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftySixRawNotes(rawText: string): IsaiahFiftySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+56:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 56 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+56:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+56:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 56 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 56,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 56:${startVerse}` : `Isaiah 56:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 56 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_SIX_RAW_NOTES = `# Isaiah 56:1-2
# ⚖️ Keep Judgment, Do Justice
---
## Keep Ye Judgment, And Do Justice

"Judgment" here means making decisions the way God would make them.

"Justice" means treating other people in a fair way.

The LORD pairs the two together on purpose.

Right thinking without right action falls short of what God asks.

⚖️ Judgment means deciding the way God decides

🤝 Justice means fair action, not belief

🔗 God pairs right thinking with action

📖 Right belief without right action falls short

## For My Salvation Is Near To Come

"Near" describes something approaching, not something far away.

This salvation points forward to a rescue still on the way.

The command to keep judgment and justice carries real urgency.

God's people are told to live rightly because the moment is close.

⏳ Near means approaching, not far away

🌅 Salvation points to a coming rescue

⚡ Urgency drives this command to obey

📖 The moment to live rightly is close

## That Layeth Hold On It

The word "it" points back to keeping judgment and justice.

"Layeth hold" pictures someone gripping something tightly, refusing to let go.

This describes determined commitment, not a casual try.

Any ordinary person can choose this same commitment.

👉 It points back to judgment and justice

✊ Layeth hold means gripping tightly

💪 This pictures commitment, not a casual try

📖 Any ordinary person can choose it

## Keepeth The Sabbath From Polluting It

"Polluting" the sabbath means treating a set apart day as common.

The sabbath was meant to be different from every other day.

Guarding it from pollution meant guarding its set apart purpose.

Keeping the sabbath well pictures keeping the whole covenant well.

🗓️ Polluting means treating it as common

✨ The sabbath was meant to be different

🛡️ Guarding it protects its set apart purpose

📖 Keeping the sabbath pictures keeping the covenant

# Isaiah 56:3-5
# 🌳 Not Cut Off
---
## That Hath Joined Himself To The LORD

This phrase identifies who the "son of the stranger" really is.

He is a foreigner who has chosen to follow Israel's God.

This person is already worshiping among God's people.

God is about to answer a fear this convert has not even spoken.

👉 This identifies the son of the stranger

🌍 A foreigner who chose to follow God

🙏 He is already worshiping among God's people

📖 God answers his unspoken fear next

## The LORD Hath Utterly Separated Me From His People

This is the exact fear the foreigner is told not to speak.

Under the law, foreigners once faced real limits on belonging.

The convert assumes that pattern will always hold true for him.

God is about to overturn that assumption completely.

😟 The fear he is told not to speak

📜 Foreigners once faced real limits under the law

🤔 He assumes that pattern still applies to him

📖 God is about to overturn that assumption

## I Am A Dry Tree

A "eunuch" was a man who could not father children.

Having descendants was treated as one of life's greatest blessings.

"A dry tree" pictures a tree that bears no fruit and leaves nothing behind.

He assumes his story ends with nothing to show for it.

🌳 Eunuch means a man with no children

👶 Descendants were treated as a great blessing

🥀 A dry tree bears no fruit

📖 He assumes his story ends with nothing

## An Everlasting Name, That Shall Not Be Cut Off

God answers the eunuch's fear directly instead of ignoring it.

"An everlasting name" is a legacy that outlasts having children.

This name will never be cut off, the very fear he named.

What a bloodline could not give, God supplies Himself.

🏷️ God answers the eunuch's fear directly

♾️ An everlasting name outlasts having children

🔗 This name will never be cut off

📖 God supplies what a bloodline could not

# Isaiah 56:6-8
# 🏠 An House Of Prayer For All People
---
## That Join Themselves To The LORD

This repeats the same phrase used back in verse three.

"Join themselves" means a personal choice to belong, not an accident of birth.

Serving the LORD and loving His name mark this choice.

The chapter keeps insisting that belonging is chosen, not inherited.

🔁 This repeats the phrase from verse three

🤝 Join themselves means a personal choice

❤️ Serving and loving the LORD marks this

📖 Belonging is chosen, not only inherited

## Their Burnt Offerings And Their Sacrifices Shall Be Accepted

"Accepted" means God receives the worship as genuine.

Burnt offerings and sacrifices were the central acts of temple worship.

Foreigners offering these were once outside what the law allowed.

Here God welcomes their worship at His own altar.

🔥 Accepted means God receives it as genuine

🛐 Burnt offerings were central to temple worship

🚪 Foreigners were once outside this practice

📖 God welcomes their worship at His altar

## An House Of Prayer For All People

"Mine house" refers to the temple in Jerusalem.

The temple's purpose here reaches beyond just one nation.

"All people" includes the very foreigners and eunuchs just named.

Centuries later, Jesus quotes this exact line when He clears the temple.

🏛️ Mine house refers to the temple

🌍 Its purpose reaches beyond one nation

👥 All people includes foreigners and eunuchs

📖 Jesus later quotes this line directly

## Yet Will I Gather Others To Him

"Gathereth the outcasts" names God's ongoing work of bringing His people home.

"Others" points beyond that first group to people not yet gathered.

This promise widens the circle a second time in one verse.

God's gathering was never finished with just one group of people.

🧲 Gathereth the outcasts means bringing people home

➕ Others points beyond that first group

🔄 The circle widens a second time

📖 God's gathering was never finished with one group

# Isaiah 56:9-12
# 🐕 Blind Watchmen
---
## All Ye Beasts Of The Field, Come To Devour

The tone of the chapter suddenly shifts from promise to warning.

"Beasts of the field" pictures wild animals invited in to attack.

This is a vivid way of announcing judgment on Israel's own leaders.

The invitation itself signals that something has gone seriously wrong.

🔄 The tone shifts from promise to warning

🦁 Beasts of the field pictures animals attacking

⚠️ This announces judgment on Israel's leaders

📖 The invitation signals something gone wrong

## They Are All Dumb Dogs, They Cannot Bark

"Watchmen" were Israel's prophets and leaders, set to warn of danger.

Blind watchmen cannot see the threat they were placed there to spot.

A dog that "cannot bark" fails at the one job it exists to do.

The very people meant to protect Israel have stopped doing their job.

👁️ Watchmen were Israel's prophets and leaders

🙈 Blind watchmen cannot see coming danger

🐕 A dog that cannot bark fails its purpose

📖 The protectors have stopped protecting

## Greedy Dogs Which Can Never Have Enough

"Greedy" describes an appetite that no amount of gain satisfies.

These same watchmen are now compared to dogs driven only by hunger.

"Every one for his gain" names the real motive behind their failure.

Personal profit had replaced care for the people they were meant to guard.

🍖 Greedy means an appetite gain never satisfies

🐕 The watchmen are compared to hungry dogs

💰 Every one for his gain names their motive

📖 Profit replaced care for the people

## I Will Fetch Wine, And We Will Fill Ourselves With Strong Drink

These are the leaders' own words, quoted directly by God.

"Fetch wine" and "strong drink" describe chasing pleasure instead of duty.

"To morrow shall be as this day" reveals no concern for what is coming.

The chapter closes by naming exactly the leadership Israel was warned against.

🍷 Fetch wine pictures chasing pleasure over duty

😴 Tomorrow like today shows no concern

🎭 These are the leaders' own careless words

📖 This is the leadership Israel was warned against
`.trim();

export const ISAIAH_FIFTY_SIX_PERSONAL_SECTIONS = parseIsaiahFiftySixRawNotes(ISAIAH_FIFTY_SIX_RAW_NOTES);
