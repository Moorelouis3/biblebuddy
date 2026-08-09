export type FirstSamuelFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelFiveRawNotes(rawText: string): FirstSamuelFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 5:${startVerse}` : `1 Samuel 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Samuel 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_FIVE_RAW_NOTES = `# FirstSamuel 5:1-2
# 🏛️ The Ark Enters Dagon's Temple
---
## 🪨 From Ebenezer

"Ebenezer" was the spot where the Philistines just defeated Israel and captured the ark.

The name itself means stone of help.

Israel later returns to this same spot and renames it after an actual victory.

That renaming has not happened yet.

🪨 Ebenezer means stone of help

⚔️ The site of Israel's fresh defeat

⏳ Renamed later after a true win

📖 That renaming has not happened yet

## 🏙️ Unto Ashdod

"Ashdod" was one of the five major Philistine cities.

Each of those five cities had its own ruling lord.

Ashdod also served as the home of Dagon, the chief Philistine god.

Bringing the ark of Israel's God straight into that city was no accident.

🏙️ Ashdod was a major Philistine city

👑 One of five cities, each with a lord

🗿 Home of Dagon, their chief god

📖 Bringing the ark there was no accident

## 🏛️ Brought It Into The House Of Dagon

"Dagon" was the chief god of the Philistines.

He was linked to grain and to the sea.

The "house of Dagon" was his main temple.

Capturing an enemy's sacred object counted as defeating their god.

The Philistines are not hiding the ark away.

They are showing it off as a captured prisoner.

🌾 Dagon was linked to grain and sea

🏛️ House of Dagon means his main temple

🏆 Capturing it counted as defeating their god

📖 They display it as a captured prisoner

## 👑 Set It By Dagon

The Philistines place the ark right next to their own idol.

That placement was meant to show Dagon ruling over Israel's God.

Verse three will completely reverse that picture the very next morning.

The one who looks defeated here is about to prove otherwise.

👑 Placed beside Dagon on purpose

🏆 Meant to show Dagon's rule

🔄 Verse three reverses that picture

📖 The "defeated" God proves otherwise

# FirstSamuel 5:3-5
# ⚡ Dagon Falls Before The Ark
---
## 😵 Dagon Was Fallen Upon His Face To The Earth

The people of Ashdod wake up and find their god lying face down.

Falling on your face was the exact posture used to worship a king or a god.

Dagon's own statue ends up bowing to the ark of the true God.

Nobody moved the statue.

It fell on its own.

😵 Dagon is found face down

🙇 That posture meant worship or surrender

🔄 Dagon ends up bowing to the true God

📖 It fell with no one touching it

## 🔧 Set Him In His Place Again

The people try to fix the problem by lifting Dagon back up.

That response treats the fall as an accident, not a message.

They never stop to ask why their god ended up on the ground.

The next morning will make the message impossible to miss.

🔧 They lift Dagon back into place

🤷 They treat the fall as an accident

❓ Nobody asks why it happened

📖 The next morning removes all doubt

## ✂️ The Head Of Dagon And Both The Palms Of His Hands Were Cut Off

This time Dagon falls again, and it is far worse.

His head and his hands break off completely.

Cutting off an enemy's head and hands after battle was an ancient way to prove total victory.

Dagon himself now looks like a defeated enemy soldier, not a god.

✂️ Head and hands broke off

⚔️ That matched how defeated enemies were treated

🗿 Dagon looks like a beaten soldier

📖 The true God needed no army to win

## 🗿 Only The Stump Of Dagon Was Left

"Stump" means the leftover base of something broken apart.

All that remains of Dagon now is a lifeless block.

This did not happen by accident once.

It happened a second time, right there in his own temple.

🗿 Stump means the broken leftover base

💔 Only a lifeless block remains

🔁 This happened twice, not once

📖 His own priests watched it happen

## 🚪 Tread On The Threshold Of Dagon In Ashdod Unto This Day

"Threshold" is the raised strip of stone or wood at the bottom of a doorway.

That is the exact spot where Dagon's head and hands were found.

Because of what happened there, Dagon's own priests refused to step on it ever again.

"Unto this day" means the custom was still kept when this book was written.

That was long after the event itself.

🚪 Threshold means the base of a doorway

🎯 Dagon's head and hands landed there

🚫 Priests refused to step on it

📖 The custom lasted for generations

# FirstSamuel 5:6-9
# 🖐️ The Hand Of The Lord Spreads To Gath
---
## 🖐️ The Hand Of The LORD Was Heavy

"The hand of the LORD" is a common Bible phrase for God's direct action in the world.

Here that hand does not save Israel.

It strikes down the very people who took the ark by force.

The same power that terrifies Israel's enemies had just failed to save Israel's own army.

🖐️ Hand of the LORD means His direct action

⚡ This time it strikes the Philistines

🏹 They took the ark by force

📖 The same power once did not save Israel

## 🩹 Smote Them With Emerods

"Emerods" is an old word for painful growths or sores on the body.

Many scholars believe this describes a plague that spread through the region.

Whatever the exact illness was, it was sudden, physical, and impossible to ignore.

This was not bad luck.

It arrived right after the ark entered the city.

🩹 Emerods means painful growths or sores

🦠 Many scholars believe it was a plague

⚡ Sudden and impossible to ignore

📖 It arrived right after the ark did

## 🗺️ Ashdod, And The Coasts Thereof

"Coasts" here does not mean beaches.

It means the whole surrounding territory controlled by that city.

The suffering was not limited to the city walls.

Everyone living in Ashdod's territory felt the same disaster.

🗺️ Coasts means the surrounding territory

🏙️ Not just the city, but the region

😣 Everyone in that territory suffered

📖 The disaster reached beyond the walls

## 😣 His Hand Is Sore Upon Us

The men of Ashdod finally say out loud what everyone already suspects.

"Sore" here is an old word for severe, not simply painful.

They connect their own suffering directly to the ark's presence.

They even admit their own god, Dagon, has already lost.

😣 Sore means severe, not just painful

🔗 They connect the suffering to the ark

🗣️ They finally say it out loud

📖 They admit Dagon has already lost

## 🏹 Carried About Unto Gath

The Philistine lords hold a meeting to decide what to do.

Their answer is to move the ark to another city instead of returning it.

"Gath" was another major Philistine city, later known as the home of Goliath.

Passing the problem along does not make it go away.

🏹 The lords decide to move the ark

🏙️ Gath was another major Philistine city

🥊 Later known as Goliath's home city

📖 Passing the problem did not fix it

## ⚖️ Both Small And Great

This phrase means everyone in the city, regardless of rank or wealth.

Common people and city leaders suffered the exact same affliction.

Status offered no protection at all.

⚖️ Small and great means everyone, regardless of rank

👥 Leaders and common people suffered alike

🚫 Status offered no protection

📖 God's hand made no exceptions

## 🤕 Emerods In Their Secret Parts

"Secret parts" is the Bible's gentle way of describing a private area of the body.

The affliction from verse six now hits an even more personal, humiliating spot.

This was not a distant, mild inconvenience.

It was intimate and constant suffering for the whole city.

🤕 Secret parts means a private area

🎯 The affliction gets more personal here

😖 Not mild, but intimate suffering

📖 The whole city felt it

# FirstSamuel 5:10-12
# 😱 Terror Reaches Ekron
---
## 📦 Sent The Ark Of God To Ekron

The Philistines are now on their third city in this chapter.

Each time the ark moves, the disaster follows it exactly.

Nobody in Philistia can keep the ark and stay safe.

📦 Ekron is the third city tried

🔁 The disaster follows the ark each time

🚫 No city can keep it safely

📖 The pattern repeats itself again

## 😨 To Slay Us, And Our People

The Ekronites react in fear before the ark even arrives in their city.

Word of what happened in Ashdod and Gath had already reached them.

Reputation alone was enough to cause panic.

😨 Ekron fears the ark before it arrives

📰 News of Ashdod and Gath spread fast

😱 Reputation alone caused real panic

📖 They already knew what was coming

## 🙏 Let It Go Again To His Own Place

The Philistine lords finally agree on one thing.

The ark needs to go back to Israel immediately.

Three cities and multiple plagues later, they are ready to admit defeat.

🙏 The lords agree to send it back

🏠 It needs to return to Israel

🏳️ Three cities later, they admit defeat

📖 They finally give up the fight

## ☠️ A Deadly Destruction Throughout All The City

This is the strongest language used so far in the chapter.

Earlier cities suffered emerods and disruption.

Ekron faces something worse, actual deaths across the whole city.

☠️ The strongest language in the chapter

📈 Worse than what earlier cities faced

💀 Actual deaths spread across the city

📖 The suffering keeps escalating

## 🖐️ The Hand Of God Was Very Heavy There

This exact phrase, "the hand of the LORD," first appeared back in verse six.

The same description now returns for the third city in a row.

The repetition is not an accident.

It ties every city's suffering back to the very same cause.

🖐️ The same phrase returns from verse six

🔁 Repeated for the third city now

🎯 The repetition is not an accident

📖 One cause behind every city's suffering

## 📢 The Cry Of The City Went Up To Heaven

The whole city cries out together in desperation.

Dagon never answered when his own people needed him.

Nobody in that cry is praying to Israel's God on purpose.

But it still reaches the one God who actually hears.

📢 The whole city cries out together

🗿 Dagon never answered his own people

👂 This cry reaches the God who hears

📖 Even Philistia's pain does not escape Him
`.trim();

export const FIRST_SAMUEL_FIVE_PERSONAL_SECTIONS = parseFirstSamuelFiveRawNotes(FIRST_SAMUEL_FIVE_RAW_NOTES);
