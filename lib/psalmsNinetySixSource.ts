export type PsalmsNinetySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetySixRawNotes(rawText: string): PsalmsNinetySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+96:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 96 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+96:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+96:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 96 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 96,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 96:${startVerse}` : `Psalms 96:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 96 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_SIX_RAW_NOTES = `# Psalms 96:1-3
# 🎶 A New Song For All The Earth
---
## 🎶 O Sing Unto The LORD A New Song

"A new song" was a specific kind of praise in ancient Israel.

It marked a brand new act of God.

That fresh act needed words no old song had already captured.

This exact psalm appears again almost word for word in 1 Chronicles 16.

There it was sung the day the ark was brought into Jerusalem.

A new act of God deserved new words, not a recycled prayer.

🎶 A new song answers God's fresh act
📜 This psalm also appears in 1 Chronicles 16
🏛️ First sung when the ark reached Jerusalem
📖 New mercies call for new words

## 🌍 Sing Unto The LORD, All The Earth

This call was never meant for Israel alone.

The invitation now stretches outward from the temple to the whole world.

Earlier songs often praised the LORD as Israel's own God.

Psalm 96 goes further and calls every nation on earth to sing.

That is a missionary heartbeat sitting inside a song of Israel's worship.

🌍 The call spreads beyond Israel
🎤 The whole earth is invited to sing
🕊️ This carries a missionary heartbeat
📖 Every nation belongs to God's praise

## 🙌 Bless His Name

"Bless" here does not mean giving God something he lacks.

It means speaking well of him, praising who he is out loud.

"His name" stands for God's whole character, not just a title people call him.

To bless his name is to speak the truth about who God is.

🙌 Bless means speaking well of someone
🏷️ His name stands for his character
🗣️ Blessing God means praising him out loud
📖 It speaks the truth about who he is

## ☀️ Shew Forth His Salvation From Day To Day

"Shew forth" is an old way of saying openly announce or display.

"Salvation" here is broader than eternal life alone.

It covers every way God rescues, provides, and protects his people.

"From day to day" turns this into a daily habit, not a once a year event.

Praise was meant to be part of ordinary life, not a special occasion.

☀️ Shew forth means openly announce
🛟 Salvation covers every kind of rescue
📅 From day to day means a daily habit
📖 Praise belongs in ordinary life

## 📯 Declare His Glory Among The Heathen

"Heathen" is an old word for people outside the nation of Israel.

It carried no special insult here, only a plain label for other nations.

"Declare" means to tell someone something they do not already know.

Israel is being sent outward with a message, not just keeping it inside.

This same missionary note runs through the rest of the psalm.

📯 Heathen means the nations outside Israel
📣 Declare means tell someone something new
✉️ Israel is sent outward with a message
📖 The missionary note continues through the psalm

## ✨ His Wonders Among All People

"Wonders" points to God's mighty acts, not ordinary events.

The exodus from Egypt was one of those wonders.

So was the parting of the sea.

This line repeats the idea from earlier in the same verse.

Hebrew poetry often repeats an idea in new words to press it home.

✨ Wonders means God's mighty acts
🌊 The parting of the sea was one
🔁 This repeats verse 3's earlier idea
📖 Hebrew poetry repeats ideas to press them home

# Psalms 96:4-6
# 👑 Great Above Every Idol
---
## 👑 The LORD Is Great, And Greatly To Be Praised

God's greatness is not up for debate in this line.

It is simply stated as a plain fact, the same way the sky is blue.

"Greatly to be praised" means his greatness deserves a response.

Praise is the right reaction to something true, not just a feeling.

👑 God's greatness is stated as fact
🎯 It is not argued, just announced
🙌 Praise is the right response
📖 Greatness that big deserves a loud response

## 😨 He Is To Be Feared Above All Gods

This does not mean God is a frightening figure to run from.

"Feared" here means deep reverence, the respect owed to someone truly powerful.

Ancient nations surrounding Israel worshipped many different gods.

This verse ranks the LORD above every one of them.

😨 Feared here means deep reverence
🚫 It does not mean run away in terror
🗿 Many nations worshipped other gods
📖 The LORD ranks above every one of them

## 🗿 All The Gods Of The Nations Are Idols

"Idols" translates a Hebrew word that means worthless things, almost nothing at all.

It sounds close to the Hebrew word for God, but means the exact opposite.

Calling other nations' gods idols was a direct insult to their worship.

The next line explains why the LORD stands so far above them.

🗿 Idols means worthless, almost nothing
🔤 The word echoes the Hebrew word for God
💔 Calling them idols insulted their worship
📖 The next line explains why he is different

## 🌌 The LORD Made The Heavens

Idols were carved or cast by human hands.

They could not make anything, only be made.

The LORD stands on the opposite side of that line completely.

He made the heavens themselves, the place ancient people considered highest and most powerful.

🔨 Idols were made by human hands
🚫 Idols cannot make anything themselves
🌌 The LORD made the heavens
📖 Maker and made are opposites

## 💎 Honour And Majesty Are Before Him

This line pictures a royal court more than an empty compliment.

"Honour" and "majesty" describe the dignity and splendor surrounding a great king.

Think of the guards and rich decorations that surround a throne room.

That same dignity is described as always standing right in front of God.

💎 Honour and majesty describe royal dignity
🏰 Picture the splendor around a throne room
🧍 This dignity stands directly before God
📖 God is pictured as a great king

## 🏛️ Strength And Beauty Are In His Sanctuary

"Sanctuary" refers to the tabernacle, and later the temple, where Israel worshipped.

"Strength" and "beauty" describe the atmosphere inside that holy space.

It was not simply a place of comfort or plain function.

Power and glory were both meant to be felt there at once.

🏛️ Sanctuary means the tabernacle or temple
💪 Strength describes power felt in that space
✨ Beauty describes glory felt in that space
📖 Power and glory met there together

# Psalms 96:7-9
# 🎁 Bring An Offering And Worship
---
## 👪 Kindreds Of The People

"Kindreds" means families, clans, or tribal groups.

"Of the people" widens that out to every nation, not just Israel's own tribes.

This same call to worship appears in Psalm 29, aimed at heavenly beings instead.

Here it is aimed at every family of every nation on earth.

👪 Kindreds means families or clans
🌍 Of the people means every nation
🔁 Psalm 29 uses similar language for heavenly beings
📖 Here the call reaches every family on earth

## 💪 Give Unto The LORD Glory And Strength

This does not mean people can hand God something he is missing.

"Give" here means to acknowledge and credit him with what is already true.

"Glory" means the weight of who God is.

"Strength" means his power, already real, simply being recognized out loud.

🙌 Give means acknowledge, not hand over
✨ Glory means the weight of who God is
💪 Strength means power already real
📖 Both are recognized, not created

## 🎁 Bring An Offering, And Come Into His Courts

An offering was a physical gift brought to God, not just a feeling.

Worshippers commonly brought grain, animals, or other goods as an act of devotion.

"His courts" refers to the outer areas of the tabernacle or temple grounds.

Coming into the courts meant physically approaching, not staying at a distance.

🎁 An offering was a physical gift
🐑 Grain and animals were common offerings
🏛️ His courts means the temple grounds
📖 Worship meant physically drawing near

## ✨ O Worship The LORD In The Beauty Of Holiness

This exact phrase also appears in Psalm 29 and 1 Chronicles 16.

Many scholars believe it points to holy garments worn for worship.

Others believe it points to the splendor and purity of God's own holiness.

The text itself does not settle which picture is meant.

Either way, worship here is tied to something set apart and pure.

✨ This phrase also appears in Psalm 29
👕 It may point to holy garments
💎 It may point to God's own splendor
📖 Worship is tied to what is set apart

## 🌍 Fear Before Him, All The Earth

"Fear" again means reverence, not terror.

This closes the section the same way it opened, with the whole earth in view.

Every nation, not only Israel, is called to that same reverence.

The circle that started in verse 1 comes back around here.

😌 Fear means reverence, not terror
🌍 The whole earth is addressed again
🔄 This echoes the call from verse 1
📖 Every nation is called to reverence

# Psalms 96:10-13
# ⚖️ The LORD Comes To Judge The Earth
---
## 👑 Say Among The Heathen That The LORD Reigneth

This is a message meant to travel outward, not stay inside Israel.

"Reigneth" means the LORD actively rules right now, not merely that he exists.

Nations that worshipped their own kings and gods needed to hear this claim directly.

The message is an announcement to be spoken out loud, not a private opinion.

📣 This message is meant to travel outward
👑 Reigneth means actively rules right now
🗣️ Nations needed to hear this claim
📖 It is announced, not just believed quietly

## 🌏 The World Shall Not Be Moved

This is not a claim about the physical planet staying still.

It pictures the created order as stable and secure under God's rule.

Ancient people often worried about chaos undoing the world they knew.

This line answers that fear with settled confidence.

🌏 This is not about the physical planet
🏗️ It pictures the world as stable
😟 Ancient people feared chaos undoing order
📖 God's rule answers that fear

## ⚖️ He Shall Judge The People Righteously

"Judge" here does not only mean punish.

It means rule with fairness, setting right what has gone wrong.

"Righteously" means that ruling matches what is actually right, not personal preference.

A king who judges this way is good news, not a threat.

⚖️ Judge means rule with fairness
✅ Righteously means matching what is truly right
👑 This kind of ruling sets wrongs right
📖 A righteous judge is good news

## 🎉 Let The Heavens Rejoice, And Let The Earth Be Glad

The sky and the ground are pictured here as if they could feel joy.

This is a common tool in Hebrew poetry called personification.

Giving human emotion to nature makes the response to God's rule feel enormous.

Even the parts of creation that cannot speak are pictured praising him.

🌤️ Heavens and earth are given human emotion
📝 This tool is called personification
🌎 It makes God's rule feel enormous
📖 Even silent creation is pictured praising him

## 🌊 Let The Sea Roar, And The Fulness Thereof

"Roar" pictures the sea's sound as a shout of praise, not danger.

"The fulness thereof" means everything that lives inside the sea.

Fish and every hidden creature under the water are included in that praise.

Even the parts of the world people could not see joined in.

🌊 Roar pictures the sea shouting praise
🐟 Fulness thereof means everything inside the sea
👁️ This includes creatures no one could see
📖 Even the hidden world joins the praise

## 🌳 Then Shall All The Trees Of The Wood Rejoice

The picture keeps expanding outward, from sea to field to forest.

Trees cannot literally clap or sing.

The psalm still describes them joining the celebration anyway.

Nothing in creation is left out of this picture of joy.

🌳 The picture expands from sea to forest
🙌 Trees are pictured joining the celebration
🌍 Nothing in creation is left out
📖 All creation shares in this joy

## 🔁 For He Cometh, For He Cometh To Judge The Earth

This phrase is repeated twice in a row on purpose.

Hebrew poetry often repeats a line for emphasis, not by accident.

"He cometh" pictures God arriving to take his throne.

Think of a king processing into his own city.

This may echo the ark's procession into Jerusalem in David's time.

It also points forward to a final day when God's rule is fully revealed.

🔁 The phrase repeats twice for emphasis
👑 He cometh pictures a king arriving
🏛️ It may echo the ark entering Jerusalem
📖 It also points to a final day ahead

## ✅ He Shall Judge The World With Righteousness, And The People With His Truth

This line closes the psalm the way it built up to this point.

"Righteousness" means his judgment matches what is truly right.

"Truth" means his judgment is never based on a lie or a mistake.

Together they describe a judge no one needs to fear being treated unfairly by.

⚖️ Righteousness means judgment that is truly right
✅ Truth means judgment free from lies or mistakes
🙅 No one needs to fear unfair treatment
📖 The psalm closes on a judge worth trusting
`.trim();

export const PSALMS_NINETY_SIX_PERSONAL_SECTIONS = parsePsalmsNinetySixRawNotes(PSALMS_NINETY_SIX_RAW_NOTES);
