export type SecondChroniclesFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesFourteenRawNotes(rawText: string): SecondChroniclesFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 14:${startVerse}` : `2 Chronicles 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Chronicles 14 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_FOURTEEN_RAW_NOTES = `# SecondChronicles 14:1-5
# 🙏 Asa's Reign Begins With Reform
---
## 😴 Slept With His Fathers

"Slept with his fathers" is a common way these books describe a king's death.

It does not mean anything mysterious about the afterlife.

It simply means Abijah died and joined the generations before him.

The phrase shows up so often that it becomes the normal way a king's story ends.

😴 Slept with his fathers means died
📜 It is a common royal death phrase
👑 It marks the end of a reign
📖 The next king's story begins now

## 🏙️ Buried Him In The City Of David

"The city of David" refers to Jerusalem, specifically the older fortified section David once captured.

Kings from David's family were regularly buried there as a mark of honor.

Abijah receiving this burial confirms he was recognized as a legitimate king in that line.

🏙️ City of David means old Jerusalem
👑 Royal kings were buried there
✅ It confirmed Abijah's legitimate reign
📖 Honor followed him even in death

## 🕊️ The Land Was Quiet Ten Years

Ten years without war was rare for a small kingdom with hostile neighbors nearby.

This quiet did not happen by accident.

Chronicles consistently ties peace in the land to a king who honors God.

Asa's reign opens with the kind of rest that sets up everything he builds next.

🕊️ Ten quiet years was unusually rare
🌍 Judah had hostile neighbors nearby
🙏 Chronicles ties peace to faithful kings
📖 This rest set up what came next

## ⚖️ That Which Was Good And Right

"Good and right in the eyes of the LORD" is this book's standard measuring line for a king.

It does not mean Asa was popular or successful by human standards.

It means his choices lined up with what God actually commanded.

Chronicles will use almost this exact phrase to praise or condemn king after king.

⚖️ Good and right means God's own standard
🚫 Not the same as popular or successful
📏 Chronicles reuses this measuring line often
📖 Every king gets judged by it

## 🛐 Took Away The Altars Of The Strange Gods

"Strange gods" means foreign gods worshiped instead of, or alongside, the LORD.

Altars to these gods had likely been set up under Asa's father and grandfather.

Removing them was not a quiet gesture behind the scenes.

It was a public, physical break from the way the kingdom had been worshiping.

🛐 Strange gods means foreign idols
👨‍👦 They dated back earlier generations
🔨 Removing them was a public act
📖 Asa broke publicly with the past

## ⛰️ The High Places, And Brake Down The Images

"High places" were hilltop shrines, often borrowed from Canaanite religion.

Some high places were technically used to worship the LORD.

Chronicles still counts every one of them as a problem here.

"Images" here means carved stone pillars tied to pagan worship.

⛰️ High places were hilltop worship shrines
🙅 Even LORD worship there was rejected
🗿 Images means pagan stone pillars
📖 Asa had them physically smashed

## 🌳 Cut Down The Groves

"Groves" translates a word for wooden poles tied to the worship of a Canaanite goddess.

Cutting them down meant destroying something planted and grown, not just a building.

This detail shows how deeply pagan worship had rooted itself into the land.

Asa was not just closing temples, he was pulling out what had taken root.

🌳 Groves means Asherah worship poles
👸 Asherah was a Canaanite goddess
🪓 Cutting them meant real destruction
📖 Pagan worship had literally taken root

## 🎯 Commanded Judah To Seek The LORD

Asa did not just remove what was wrong.

He actively commanded the nation to do what was right.

"Seek the LORD" means an active pursuit, not a belief held quietly.

Reform that only tears down without building something new rarely lasts.

🎯 Asa did not just remove, he commanded
🔍 Seek means active pursuit, not belief
🏗️ He built up what he tore down
📖 Lasting reform replaces, not just removes

## 📜 To Do The Law And The Commandment

"The law and the commandment" points back to the covenant God gave Israel through Moses.

By Asa's time, that law had likely been neglected for a generation or more.

Naming it specifically shows Asa was returning the nation to something old, not new.

📜 Law and commandment means Moses' covenant
😶 It had likely been neglected for years
🔙 Asa returned to something old, not new
📖 True reform often means going back

## 🔁 The Kingdom Was Quiet Before Him

This repeats almost the exact wording from verse one.

Chronicles wants the reader to connect the dots directly.

Faithfulness at the start of Asa's reign produced the peace that followed.

The order matters, obedience came first and quiet came after.

🔁 Repeats the wording from verse one
🔗 Chronicles wants the connection noticed
🙏 Obedience came before the peace
📖 The order matters

# SecondChronicles 14:6-8
# 🏰 Building Cities And Raising An Army
---
## 🏰 He Built Fenced Cities In Judah

"Fenced cities" means towns protected by real walls, not just open villages.

Building projects like this took years of labor, materials, and money.

A kingdom under threat of war could rarely spare the resources to build like this.

Asa's construction boom was only possible because of the peace already described.

🏰 Fenced cities means walled towns
⏳ Building this took years of resources
⚔️ War usually blocks this kind of project
📖 Peace made the building possible

## 🕊️ For The Land Had Rest

The text repeats the word rest here, tying it directly back to God.

"Because the LORD had given him rest" removes any doubt about the source of the peace.

Asa is never credited alone for this calm decade.

🕊️ Rest is repeated on purpose here
🙌 The LORD is named as the source
🚫 Not credited to luck or diplomacy
📖 God gets the credit for the peace

## ⏰ While The Land Is Yet Before Us

Asa urges Judah to act now, while the chance for peaceful building still exists.

He knows firsthand that the current calm will not last forever in that world.

The phrase carries real urgency, not a leisurely suggestion.

⏰ Yet before us means the window is open
🌍 Calm rarely lasted long in that world
🏃 Asa urges action, not delay
📖 He treats peace as a chance

## 🔍 We Have Sought Him, And He Hath Given Us Rest

Asa states the cause and effect out loud for the whole nation to hear.

Seeking God came first.

Rest followed as the result, not the other way around.

This is the same pattern already seen twice already in this chapter.

🔍 Seeking God came first
🕊️ Rest followed as the result
🔁 The same pattern repeats a third time
📖 Obedience, then rest, every time

## 🔱 Bare Targets And Spears

A "target" here is an old word for a small handheld shield.

Judah's soldiers fought at close range, spears paired with these smaller shields.

This detail names Judah's own portion of the combined army by its equipment.

🔱 Target means a small handheld shield
⚔️ Judah fought with spears up close
🛡️ Their gear favored close combat
📖 Judah's soldiers carried their own trade

## 🏹 Shields And Drew Bows

Benjamin's soldiers carried a larger shield than Judah's targets and specialized in archery.

They fought from a distance instead of hand to hand.

The two tribes brought different, complementary combat skills to the same army.

🏹 Benjamin specialized in archery
🛡️ Their shields differed from Judah's
🤝 Two tribes brought different skills
📖 The army combined near and far fighters

## 🔢 Three Hundred Thousand... Two Hundred And Fourscore Thousand

"Fourscore" is an old way of saying eighty.

Two hundred and fourscore thousand means two hundred eighty thousand men from Benjamin.

Combined with Judah's men, the whole force neared six hundred thousand.

Numbers this large in this book often show the scale of God's blessing on a faithful king.

🔢 Fourscore is an old word for eighty
➕ Combined armies neared six hundred thousand
✨ Large numbers often show God's blessing
📖 Peace allowed time to build this army

# SecondChronicles 14:9-12
# ⚔️ Zerah Attacks And Asa Prays
---
## 🌍 Zerah The Ethiopian

"Ethiopian" here likely refers to Cush, a region south of Egypt, not the modern nation.

Zerah is not named anywhere else in the Bible outside this account.

He arrives leading one of the largest invading forces described anywhere in the Old Testament.

🌍 Ethiopian likely means the region of Cush
❓ Zerah appears nowhere else in scripture
⚔️ He leads a massive invading force
📖 A sudden, overwhelming threat arrives

## 💥 An Host Of A Thousand Thousand

"A thousand thousand" means one million, a staggering number for an ancient army.

Whether meant literally or as a way to say countless, the point lands the same.

Judah's six hundred thousand men had suddenly become the smaller army.

Asa's peaceful decade is about to face its hardest test.

🔢 A thousand thousand means one million
😨 Judah's army was suddenly outnumbered
⚖️ The point is an overwhelming force
📖 Peace is about to be tested hard

## 🐎 Three Hundred Chariots

Chariots worked like the ancient version of an armored vehicle, fast and hard to stop.

Three hundred of them added serious striking power beyond the size of Zerah's infantry.

Judah had no chariot force mentioned anywhere to match it.

🐎 Chariots worked like ancient armored vehicles
⚡ They added speed and striking power
🚫 Judah had no matching chariot force
📖 The odds looked worse than the numbers

## ⚔️ Set The Battle In Array

"Set in array" means the armies formed organized battle lines rather than fighting in chaos.

Both sides prepared for a real, structured engagement, not a skirmish.

The valley of Zephathah at Mareshah becomes the fixed location for this coming battle.

⚔️ Set in array means organized battle lines
📍 Zephathah at Mareshah is the location
🎯 Both sides prepared for real battle
📖 The stage is now set

## 🙏 It Is Nothing With Thee To Help

Asa's prayer opens by naming what God can already do before asking for anything.

"Nothing with thee" means it costs God no effort at all to help.

Asa is not trying to talk God into something difficult.

He is simply asking God to do what is already easy.

🙏 Asa names God's power before asking
⚡ Nothing with thee means it costs God nothing
🚫 Asa is not convincing a reluctant God
📖 He asks for what is already easy

## ⚖️ Whether With Many, Or With Them That Have No Power

This line does not mean Judah's size did not matter at all.

It means God's ability to save is not limited by how strong the people asking are.

Asa openly admits Judah is the weaker side in this exact fight.

⚖️ Not about size mattering nothing at all
💪 God's power is not limited by strength
🙋 Asa admits Judah is the weaker side
📖 Weakness does not block God's help

## 🙏 For We Rest On Thee

"Rest on thee" pictures leaning full weight onto something for support.

Asa uses the same word rest that has already appeared several times in this chapter.

Now he aims it directly at God, in prayer, instead of at circumstances.

⚖️ Rest on thee means leaning full weight
🔁 The word rest returns again here
🙏 Peace becomes confidence in this prayer
📖 What God gave, Asa now leans on

## 🛡️ Let Not Man Prevail Against Thee

Asa's final line reframes the whole battle.

He does not just ask God to save Judah.

He asks God to defend His own honor against Zerah's massive army.

The fight stops being only about survival and becomes about who God really is.

🙌 Asa reframes the whole battle
🛡️ He asks God to defend His own honor
⚔️ Not just about Judah's survival
📖 The fight becomes about who God is

## ⚡ The LORD Smote The Ethiopians

The battle report is remarkably short compared to the size of the army just described.

No lengthy description of Judah's fighting technique or strategy is given here.

This book credits the LORD directly with striking down the enemy, not Asa's army.

⚡ The battle report is surprisingly short
🚫 No credit given to strategy or skill
🙌 The LORD is credited with the strike
📖 God answered the prayer directly

## 🏃 The Ethiopians Fled

An army of a million men, with three hundred chariots, breaks and runs.

The number that looked impossible in verse nine collapses instantly here.

Asa's prayer becomes the turning point of the entire chapter.

🏃 A massive army suddenly breaks and runs
📉 The impossible number collapses instantly
🙏 The prayer becomes the chapter's turning point
📖 God's answer matched the size of the threat

# SecondChronicles 14:13-15
# 🏆 The Lord Routs The Ethiopians
---
## 🗺️ Pursued Them Unto Gerar

Gerar was a Philistine city well southwest of Judah, near the border of Egypt.

Chasing a fleeing army that far shows Judah pressed the victory rather than just surviving it.

The battle turns into a rout that covers real distance.

🗺️ Gerar sat southwest, near Egypt's border
🏃 Judah pursued the retreat that far
🎯 They pressed the victory, not just survived
📖 A rout, not a narrow escape

## 💥 Could Not Recover Themselves

This phrase means the Ethiopian army was broken so completely it never regrouped to fight.

There is no second wave, no counterattack described anywhere in this account.

The one battle at Zephathah ends the entire invasion.

💥 Could not recover means totally broken
🚫 No counterattack is ever described
🏁 One battle ended the whole invasion
📖 Total defeat, not a temporary retreat

## 💰 They Carried Away Very Much Spoil

"Spoil" means goods, livestock, and valuables taken from a defeated enemy as the victor's reward.

This detail confirms the scale of the victory in practical terms, not just numbers.

Judah left richer than it entered the battle, despite facing the larger army.

💰 Spoil means goods taken from the defeated
📈 It confirms the victory's real scale
🎁 Judah left richer, not poorer
📖 God's rescue included real provision

## 😨 The Fear Of The LORD Came Upon Them

This phrase describes the surrounding cities near Gerar, not the Ethiopian army itself.

News of what happened at Zephathah traveled ahead of Judah's army into the region.

Entire cities yielded to fear rather than face what had just happened to Zerah.

😨 Fear of the LORD gripped nearby cities
📰 News of the battle traveled ahead
🏳️ Cities yielded rather than fight
📖 Reputation from one battle spread wide

## 📈 They Spoiled All The Cities

Judah's raid expands well beyond the original battlefield.

What began as defending against an invasion turns into a much larger victory.

The single answered prayer in verse eleven keeps producing results verses later.

📈 The victory expanded beyond one battlefield
🔄 Defense turned into a regional victory
🙏 One prayer kept producing results
📖 God's answers often outgrow the ask

## ⛺ Tents Of Cattle

"Tents of cattle" refers to herdsmen's camps set up to manage livestock.

These camps held sheep and camels, valuable and portable wealth for anyone nearby.

Even herding communities near Gerar were touched by this campaign.

⛺ Tents of cattle means herding camps
🐑 Sheep and camels were valuable wealth
🏜️ Herding communities were affected too
📖 The victory reached every corner

## 🏠 Returned To Jerusalem

The chapter that opened with ten quiet years closes with Judah heading home victorious.

Asa's reforms, his building projects, and his desperate prayer all connect into one story.

The chapter's real message is not about military strategy.

It is that seeking the LORD produces both peace and deliverance.

🏠 The army returns home after victory
🔗 Reforms, building, and prayer all connect
🙏 The message is not about strategy
📖 Seeking the LORD brings peace and deliverance
`.trim();

export const SECOND_CHRONICLES_FOURTEEN_PERSONAL_SECTIONS = parseSecondChroniclesFourteenRawNotes(SECOND_CHRONICLES_FOURTEEN_RAW_NOTES);
