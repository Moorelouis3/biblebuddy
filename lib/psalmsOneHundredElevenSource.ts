export type PsalmsOneHundredElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredElevenRawNotes(rawText: string): PsalmsOneHundredElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+111:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 111 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+111:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+111:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 111 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 111,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 111:${startVerse}` : `Psalms 111:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 111 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_ELEVEN_RAW_NOTES = `# Psalms 111:1-3
# 🎶 I Will Praise The LORD With My Whole Heart
---
## 🎶 Praise Ye The LORD

"Praise ye the LORD" translates the Hebrew word Hallelujah.

This psalm and the next one share an unusual form.

In the original Hebrew, each line opens with a new letter.

The letters move in strict alphabetical order.

That structure made the psalm far easier to memorize.

It also let praise cover the entire Hebrew alphabet.

🎶 Praise ye the LORD means Hallelujah

🔤 Each line opens a new Hebrew letter

📜 Letters move in strict alphabetical order

📖 Praise covers the entire alphabet

## 💛 With My Whole Heart

"Whole heart" is a common Hebrew idiom.

It means devotion that holds nothing back.

A person could praise God with divided attention.

This verse rules that divided praise out.

The same phrase describes obedience elsewhere in the Old Testament.

Deuteronomy uses it for loving God completely.

💛 Whole heart means undivided devotion

🚫 Nothing about this praise is divided

🔄 Same phrase describes obedience elsewhere

📖 Deuteronomy uses it for loving God

## 🏛️ In The Assembly Of The Upright, And In The Congregation

"Upright" describes people who live rightly before God.

"Assembly" and "congregation" both point to Israel gathered together.

This psalm pairs the two words on purpose.

Hebrew poetry often repeats one idea in different words.

That repetition adds weight to the point being made.

Praise here happens out loud among God's people.

✅ Upright means living rightly before God

🏛️ Assembly and congregation both mean Israel gathered

🔁 Repeating an idea adds weight

📖 Praise happens among God's people

## 🌟 The Works Of The LORD Are Great

"Works" means God's actions in history.

It does not mean creation alone.

This line introduces the entire rest of the psalm.

Nearly every verse after this names one specific work.

The Exodus, the wilderness, and the covenant all follow.

Greatness here gets proven with real examples.

🌟 Works means God's actions in history

📋 This line introduces the whole psalm

📜 Exodus, wilderness, and covenant follow

📖 Greatness is proven with real examples

## 🔍 Sought Out Of All Them That Have Pleasure Therein

"Sought out" is an old way of saying studied closely.

It pictures someone examining God's works like a scholar studies a text.

"Have pleasure therein" describes people who genuinely enjoy that study.

This is not a chore done out of duty.

God's works reward the person who stops to look closely.

🔍 Sought out means studied closely

📖 Pictures careful, close examination

😊 Pleasure therein means real enjoyment

➡️ Careful study gets rewarded

## 🎗️ His Work Is Honourable And Glorious

"Honourable" and "glorious" describe the same basic idea.

Hebrew poetry often states one idea twice in different words.

This technique is called parallelism.

It appears constantly throughout the Psalms.

Repeating an idea this way makes it land with more weight.

🎗️ Honourable and glorious repeat one idea

🔁 This technique is called parallelism

📜 Common throughout the Psalms

📖 Repetition adds weight to the point

## ♾️ His Righteousness Endureth For Ever

"Righteousness" means God's consistent moral rightness.

"Endureth for ever" means it never fades or weakens.

Human character can shift with circumstances or with age.

God's righteousness is pictured as permanently fixed instead.

This same theme returns again at the very end of the psalm.

⚖️ Righteousness means consistent moral rightness

♾️ Endureth for ever means it never fades

👴 Human character shifts with age

📖 This theme returns at the end

# Psalms 111:4-6
# 🍞 He Hath Given Meat Unto Them That Fear Him
---
## 🕯️ His Wonderful Works To Be Remembered

God's people were told to remember specific events.

Remembering mattered more than simply believing in general.

The Passover feast existed to keep one such memory alive every year.

"Wonderful works" points back to the plagues and the parting of the sea.

Forgetting these events was treated as a real danger.

🕯️ Remembering was built into yearly ritual

🐑 Passover kept one memory alive

🌊 Wonderful works recalls the Exodus

📖 Forgetting was treated as a danger

## 💛 The LORD Is Gracious And Full Of Compassion

This exact phrase echoes an earlier moment in Exodus.

God spoke these words about himself directly to Moses at Sinai.

"Gracious" means giving kindness that was not earned.

"Full of compassion" means moved by real pity toward suffering people.

This psalm is quoting God's own description of his character.

💛 Gracious means kindness that is not earned

😢 Compassion means moved by real pity

📜 Echoes God's words to Moses at Sinai

📖 This is God describing himself

## 🍞 He Hath Given Meat Unto Them That Fear Him

"Meat" in this older English simply means food in general.

It does not point to animal flesh specifically.

This line recalls manna, the bread God sent daily in the wilderness.

"Them that fear him" names the people who receive this provision.

Fear here means deep reverence, not being afraid of God.

🍞 Meat means food in general

🌾 Recalls manna in the wilderness

😊 Fear means reverence, not terror

📖 God provides for those who revere him

## 🤝 Ever Be Mindful Of His Covenant

A covenant is a binding promise between two parties.

God's covenant with Israel began generations earlier with Abraham.

"Ever mindful" means God never forgets a promise once made.

Human memory fades over time.

This verse pictures God's memory as permanent instead.

That permanence is why the earlier provision could be trusted.

🤝 Covenant means a binding promise

📜 Traces back to Abraham

🧠 Ever mindful means never forgetting

📖 God's memory is permanent

## 💪 Shewed His People The Power Of His Works

"Shewed" is simply an older spelling of showed.

This line points to visible, public displays of God's strength.

The ten plagues fit here.

So does the parting of the Red Sea.

These were not private, hidden acts.

The whole nation of Egypt witnessed them happen.

💪 Shewed is an older spelling of showed

⚡ Points to the ten plagues

🌊 And the parting of the Red Sea

📖 Egypt witnessed these acts publicly

## 🗺️ That He May Give Them The Heritage Of The Heathen

"Heathen" here means the nations living outside Israel.

"Heritage" means an inheritance, land passed down and possessed.

This line points to the conquest of Canaan under Joshua.

That land already belonged to other nations before Israel arrived.

God's power made that transfer of land possible.

🗺️ Heathen means nations outside Israel

🏡 Heritage means land passed down

⚔️ Points to Joshua's conquest of Canaan

📖 God's power made the transfer possible

# Psalms 111:7-8
# ⚖️ The Works Of His Hands Are Verity And Judgment
---
## ⚖️ The Works Of His Hands Are Verity And Judgment

"Verity" is an old word for truth or reliability.

"Judgment" here means fair, right ruling, not condemnation.

Together the two words describe actions that are honest and just.

God's actions are being measured against these two standards.

Nothing God does fails either test.

📖 Verity means truth or reliability

⚖️ Judgment means fair, right ruling

✅ God's actions are honest and just

➡️ Nothing God does fails this test

## 🔒 All His Commandments Are Sure

"Sure" here means trustworthy and dependable.

It means more than simply certain to happen.

A commandment could be clear but still turn out unreliable.

This verse rules that possibility out completely.

Every command God gives can actually be relied on.

🔒 Sure means trustworthy, not just certain

🚫 Rules out unreliable commands

✅ Every command can be relied on

📖 Reliability makes obedience reasonable

## 🏔️ They Stand Fast For Ever And Ever

"They" refers back to the commandments named in the line before.

"Stand fast" pictures something fixed and immovable, like a mountain.

Laws made by people get rewritten constantly.

These commandments never need that kind of change.

Their permanence outlasts every human system built around them.

🏔️ Stand fast pictures something immovable

👥 They refers to God's commandments

🔄 Human laws get rewritten constantly

📖 God's commandments never need that change

## 🤍 Done In Truth And Uprightness

"Truth" and "uprightness" describe how these commandments were made.

God did not issue laws carelessly or unfairly.

Uprightness means done in a straight, honest way.

The commandments reflect the same character as the one who gave them.

A crooked source cannot give a straight law.

🤍 Describes how the commandments were made

📏 Uprightness means straight, honest dealing

🪞 Commandments reflect God's own character

➡️ A crooked source gives no straight law

# Psalms 111:9-10
# 👑 The Fear Of The LORD Is The Beginning Of Wisdom
---
## 💰 He Sent Redemption Unto His People

"Redemption" is an old word for buying something back.

In ancient Israel, a close relative could redeem land from debt.

A close relative could also redeem a person out of slavery.

This word pictures God acting as Israel's own close relative.

The Exodus is the clearest example of this redemption.

💰 Redemption means buying something back

👨‍👩‍👧 Pictures God as a close relative

⛓️ Includes redeeming people out of slavery

📖 The Exodus is the clearest example

## 📜 He Hath Commanded His Covenant For Ever

This repeats the covenant idea already named back in verse five.

"Commanded" means God fixed the covenant by his own authority.

It was not a proposal open to negotiation.

"For ever" removes any future expiration date from the agreement.

The covenant stands because God himself established it that way.

📜 Repeats the covenant idea from verse five

👑 Commanded means fixed by God's authority

🚫 Not open to negotiation

📖 For ever removes any expiration date

## 👑 Holy And Reverend Is His Name

"Reverend" here does not refer to a church title.

It is an old adjective meaning worthy of deep respect.

This is the only place the King James Bible uses the word this way.

God's own name is being described as holy and worthy of awe.

Later religious titles borrowed this same word.

This verse itself is naming no office at all.

👑 Reverend means worthy of deep respect

🚫 Not a reference to a church title

✅ Describes God's name, not an office

📖 Unique King James use of this word

## 🦉 The Fear Of The LORD Is The Beginning Of Wisdom

"Fear" here means reverent awe, not terror.

It is not about being afraid to come near God.

"Beginning" means the starting point wisdom has to grow from.

A person can gather facts without this kind of fear.

This verse claims that facts alone are not wisdom.

The same line appears almost word for word in Proverbs and in Job.

🦉 Fear means reverent awe, not terror

🚪 Beginning means the starting point

🧠 Facts alone are not wisdom

📖 Same line appears in Proverbs and Job

## 🧩 A Good Understanding Have All They That Do His Commandments

"Understanding" here is tied directly to obedience.

It is not tied to study alone.

Someone could know every commandment perfectly and still lack this understanding.

"Do his commandments" means actually living them out in practice.

Wisdom in this psalm gets lived, not only learned.

🧩 Understanding is tied to obedience

📚 Knowing commandments is not enough

🏃 Do means living them out

📖 Wisdom is lived, not only learned

## ♾️ His Praise Endureth For Ever

This exact phrase closes the psalm the way verse three closed its line.

There, God's righteousness was said to endure for ever.

Here, it is his praise that endures the same way.

The psalm opened by calling the reader to praise God right now.

It closes by picturing that praise continuing without end.

🔁 Echoes the same phrase from verse three

⚖️ There it was righteousness enduring

🎶 Here it is praise enduring

📖 Praise continues without end
`.trim();

export const PSALMS_ONE_HUNDRED_ELEVEN_PERSONAL_SECTIONS = parsePsalmsOneHundredElevenRawNotes(PSALMS_ONE_HUNDRED_ELEVEN_RAW_NOTES);
