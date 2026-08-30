export type EstherEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherEightRawNotes(rawText: string): EstherEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 8:${startVerse}` : `Esther 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Esther 8 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_EIGHT_RAW_NOTES = `# Esther 8:1-2
# 👑 Mordecai Rises To Haman's Place
---
## 🏠 The King Gave The House Of Haman Unto Esther

A traitor's estate legally reverted to the crown once he was executed.

The king could then grant that estate to whoever he chose.

Handing the whole house to Esther publicly rewards the queen who exposed the plot.

It also strips away every trace of Haman's power in a single stroke.

🏠 Haman's estate reverted to the crown
👑 The king granted it to Esther
🎁 It rewards her for exposing Haman
📖 It erases Haman's power at once

## 💍 The King Took Off His Ring, Which He Had Taken From Haman

This is the same signet ring from chapter three that once sealed Haman's decree of death.

Whoever held that ring could write law in the king's own name.

The king now gives that authority to Mordecai instead.

The exact object once used to threaten the Jews is handed to the Jew who saved the king's life.

💍 The signet ring sealed royal decrees
📜 It once sealed Haman's death decree
🔁 The same ring now goes to Mordecai
📖 The threat's tool becomes the rescue's tool

## 🚪 Esther Set Mordecai Over The House Of Haman

Mordecai now manages the estate that Esther legally owns.

He moves in one step from a mourner at the palace gate to the head of a great household.

Nothing in the text explains exactly how the two divided that authority.

The story only cares that Haman's power has fully passed to the two people he tried hardest to destroy.

🚪 Mordecai now runs Haman's household
📈 He rose from mourner to master
🤝 Esther and Mordecai share the reversal
📖 Haman's power lands on his intended victims

# Esther 8:3-6
# 😢 Esther Pleads A Second Time
---
## 😢 Esther Spake Yet Again Before The King, And Fell Down At His Feet

Esther already exposed Haman and won his execution in chapter seven.

That victory did not undo the actual decree ordering the Jews destroyed.

She must return to the king a second time and beg for something much harder to fix.

Removing a man was simple next to reversing a sealed law.

😢 Haman's death did not cancel the decree
📜 The law against the Jews still stood
🔁 Esther must plead a second time
📖 A law outlasts the man who made it

## 🖐️ The King Held Out The Golden Sceptre Toward Esther

This same gesture already saved Esther's life back in chapter five.

Approaching the king unsummoned still carried the death penalty at this point in the story.

The sceptre grants her permission and safety to speak again.

Repeating this exact scene shows how much courage this second approach still required.

🖐️ The gold sceptre granted safe approach
⚠️ Approaching unsummoned still risked death
🔁 The same gesture as chapter five
📖 The risk had not gone away

## 🔥 To Put Away The Mischief Of Haman The Agagite

Mischief here means a deliberately planned harm, not a small accident.

Agagite ties Haman back to Agag, the old enemy king from Israel's past.

Naming that ancestry again reminds the reader this hatred was generations old.

Esther is not asking for a minor adjustment but for the undoing of a planned genocide.

🔥 Mischief means deliberate, planned harm
👑 Agagite links Haman to king Agag
⏳ This hatred stretched back generations
📖 Esther asks to undo a planned genocide

## ⚖️ How Can I Endure To See The Destruction Of My Kindred

Esther shifts from a formal legal request to raw personal grief.

Kindred means her own blood relatives, the Jewish people she was born into.

She is no longer speaking only as a queen advising a king.

She speaks as a woman who would lose her own family if the decree stands.

⚖️ Esther moves from legal request to grief
🩸 Kindred means her own blood relatives
👑 She is not only speaking as queen
📖 She speaks as family about to lose family

# Esther 8:7-8
# 📜 A Decree That Cannot Be Unwritten
---
## ⚖️ Behold, I Have Given Esther The House Of Haman

The king reminds Esther and Mordecai what he has already done for them.

He points to Haman's death and estate as proof of how far his favor already reached.

From his view, he has already solved the danger by removing the man behind it.

He has not yet grasped that the written law still stands on its own.

⚖️ The king lists what he already gave
🪓 He points to Haman's death as proof
🤔 He assumes the danger is already solved
📖 He has not yet solved the actual law

## 🚫 The Writing Which Is Written In The King's Name May No Man Reverse

Persian law held that a decree sealed with the king's ring could never be canceled.

Not even the king himself could cancel it once it was sealed.

This detail already mattered once before, in chapter one with Vashti's decree.

That same rigid rule now threatens to doom the Jews no matter what anyone wants to change.

The king cannot simply say the word and erase Haman's decree.

🚫 A sealed Persian decree could not be canceled
🔁 The same rule shaped Vashti's decree
⚠️ That rule now threatens the Jews
📖 Even the king cannot erase it directly

## ✍️ Write Ye Also For The Jews, As It Liketh You

Since the first decree cannot be undone, the king offers a workaround instead.

He hands Mordecai and Esther full authority to write a second decree of their own.

A second law sealed with the same ring carries the same unbreakable force as the first.

The solution is not cancellation but a counter law standing beside it.

✍️ The first decree cannot be canceled
🔑 The king grants power to write anew
💍 The new decree carries equal force
📖 The fix is a counter law, not erasure

# Esther 8:9-14
# 🐎 The Counter Decree Rides Out
---
## 📅 In The Third Month, That Is, The Month Sivan

The narrator dates this new decree with the same careful precision used for Haman's decree in chapter three.

Sivan falls around late spring on the modern calendar.

About two months have passed since Haman's original decree went out in the first month.

That gap becomes important later, since the Jews now have months to prepare before the danger arrives.

📅 Sivan names the exact month
🔁 Same careful dating as Haman's decree
⏳ About two months after the first decree
📖 The gap gives the Jews time to prepare

## 🌍 Unto Every Province According To The Writing Thereof, And Unto Every People After Their Language

The empire stretched across many nations, each with its own script and spoken language.

Sending Haman's decree of death required this same wide translation effort in chapter three.

Using it again for a decree of rescue shows the same royal machinery now working in the opposite direction.

The very system built to destroy the Jews now carries their protection.

🌍 The empire held many languages and scripts
📜 The same translation effort sent Haman's decree
🔁 Now that machinery works in reverse
📖 The system built to destroy now protects

## ⚔️ To Destroy, To Slay, And To Cause To Perish, All The Power Of The People That Would Assault Them

This is the same triple stack of words for death used in Haman's original decree.

The new decree does not simply cancel the old threat.

It grants the Jews the right to fight back against anyone who attacks them.

Repeating Haman's own language turns his exact words into their legal defense.

⚔️ The same triple phrase as Haman's decree
🛡️ The Jews gain a right to self defense
🔄 The threat is answered, not just removed
📖 Haman's own words become their defense

## 🐫 Sent Letters By Posts On Horseback, And Riders On Mules, Camels, And Young Dromedaries

Persia kept a famous royal postal system built for speed across a huge empire.

A dromedary is a fast one humped camel bred for long distance travel.

The text lists several kinds of animals to stress how urgently this message had to travel.

Every one of the seventy five days before Haman's date still mattered, so speed could not wait.

🐫 A dromedary is a fast riding camel
📬 Persia ran a famous royal postal system
⏱️ Multiple animals stress the urgency
📖 Every day before the deadline mattered

# Esther 8:15-17
# 🎉 The City Rejoices
---
## 👑 Mordecai Went Out In Royal Apparel Of Blue And White, With A Great Crown Of Gold

Blue and white were royal colors reserved for the king's own household.

This same robe once belonged only to the king in chapter one.

Mordecai's rise is now visible to the entire city without a single word spoken.

The mourning clothes he wore back in chapter four are completely gone.

👑 Blue and white marked royal colors
🔁 Only the king wore this in chapter one
👀 Mordecai's rise is now visible to all
📖 His sackcloth from chapter four is gone

## 😄 The City Of Shushan Rejoiced And Was Glad

Chapter three ended with this same city thrown into confusion after Haman's decree.

Now the same city celebrates the opposite news.

The narrator repeats the phrase on purpose to mark how completely the story has flipped.

Even people with no stake in the outcome can feel a city change its mood this fast.

😄 The city once stood confused after Haman's decree
🔁 Now it celebrates the opposite outcome
📖 The same city marks the story's reversal
➡️ A city's mood can turn just as fast

## ✨ The Jews Had Light, And Gladness, And Joy, And Honour

This verse stacks four different words for celebration in a row.

Light was often used to picture relief after a season of fear and darkness.

The buildup answers the fear and mourning that filled chapter four.

Every word Haman's decree threatened to erase now returns in full.

✨ Four words for celebration are stacked here
💡 Light pictures relief after fear
🔁 It answers the mourning from chapter four
📖 What Haman threatened now returns in full

## 🕎 Many Of The People Of The Land Became Jews, For The Fear Of The Jews Fell Upon Them

This does not mean people converted for spiritual reasons alone.

Some among the nations chose to align with the Jews once their new legal power became clear.

Fear here works like respect that comes from seeing a group protected at the highest level.

The chapter began with a death decree against the Jews.

It ends with outsiders wanting to belong to that very people.

🕎 Some aligned themselves with the Jews
⚖️ Their new legal power made the difference
😨 Fear here means fearful respect, not terror
📖 The decree's targets end the chapter admired
`.trim();

export const ESTHER_EIGHT_PERSONAL_SECTIONS = parseEstherEightRawNotes(ESTHER_EIGHT_RAW_NOTES);
