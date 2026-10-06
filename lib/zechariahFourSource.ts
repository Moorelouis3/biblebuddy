export type ZechariahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahFourRawNotes(rawText: string): ZechariahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 4:${startVerse}` : `Zechariah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 4 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_FOUR_RAW_NOTES = `# Zechariah 4:1-3
# 🕎 A Candlestick All Of Gold
---
## 👼 The Angel That Talked With Me Came Again

This is the same angel who has been speaking to Zechariah since chapter one.

The visions in this book build one on top of another instead of standing alone.

Zechariah had been resting, worn out from everything he had already seen.

Waking him again means the angel has more to show him.

The vision continues a conversation already underway, not a new one.

👼 Same angel from chapter one
🔗 Visions connect to each other
😴 Zechariah had grown tired
📖 The angel still has more to show

## 🕯️ Behold A Candlestick All Of Gold

A candlestick here does not mean a simple holder for one candle.

It means a lampstand, the same furniture that stood in the tabernacle and temple.

That lampstand held burning oil lamps, not wax candles.

Gold marked it as something built only for God's own house.

Seeing it built from gold points straight to the temple Zerubbabel was rebuilding.

The vision opens on the very furniture of worship itself.

🕯️ Candlestick means a lampstand
🏛️ Same furniture used in the temple
🪔 Held oil lamps, not candles
📖 Points to the temple being rebuilt

## 🔥 Seven Pipes To The Seven Lamps

Seven in scripture often pictures fullness or completeness, not just a count.

Seven lamps on one lampstand pictures a complete, undivided light.

The pipes connected each lamp to the central bowl of oil.

That design let oil reach every lamp without anyone refilling them by hand.

The light stayed full and constant on its own.

This picture matters later when the two olive trees explain where the oil comes from.

🔢 Seven pictures completeness
🕯️ One light, not divided
🪔 Pipes carried oil to each lamp
➡️ Points ahead to where the oil comes from

## 🌳 Two Olive Trees By It

Two olive trees stand on either side of the lampstand, one on each side.

Olive trees were the source of the oil used to keep lamps burning in Israel.

Zechariah does not yet know who or what these trees represent.

He will ask about them directly later in this same chapter.

For now the vision simply places them there, framing the lampstand on both sides.

The oil supply for this light comes from something still left unexplained.

🌳 Two olive trees, one each side
🫒 Olive trees supplied lamp oil
❓ Zechariah does not know their meaning yet
📖 Their meaning comes later in the chapter

# Zechariah 4:4-7
# 💨 Not By Might, Nor By Power, But By My Spirit
---
## 🙋 What Are These, My Lord

Zechariah asks the angel directly instead of guessing at the meaning himself.

My lord is a respectful way of addressing someone with more knowledge or authority.

The angel answers with a question of his own, asking if Zechariah already knows.

Zechariah answers honestly that he does not know.

The prophet is not ashamed to admit when a vision goes beyond him.

Even a prophet needs the meaning explained rather than assumed on his own.

❓ Zechariah asks instead of guessing
🙇 My lord shows respect to the angel
🙋 He admits he does not know
📖 Even prophets need meaning explained

## 💨 Not By Might, Nor By Power, But By My Spirit

This is the central message the whole vision has been building toward.

Might pictures human strength, the kind an army or a strong leader relies on.

Power pictures outside resources, things like wealth or political backing.

Both get ruled out in the very same breath.

The temple will be finished by God's own spirit working through Zerubbabel.

The whole vision exists to make this one sentence land.

💪 Might means human strength
🏦 Power means outside resources
🚫 Both are ruled out here
📖 Only God's spirit finishes this work

## ⛰️ Who Art Thou, O Great Mountain

This mountain is not a literal piece of geography.

It pictures every obstacle standing in the way of finishing the temple.

Zerubbabel faced real opposition, discouragement, and a lack of resources during the rebuilding.

Calling it a great mountain names how large that obstacle must have felt.

The question itself cuts the mountain down to size before anything changes.

Naming the problem this directly is itself an act of confidence.

⛰️ Mountain means every obstacle
🧱 Opposition slowed the temple's rebuilding
❓ The question shrinks the obstacle
📖 Naming it is already confidence

## 🏔️ Before Zerubbabel Thou Shalt Become A Plain

A plain is flat, level ground, the exact opposite of a mountain.

The obstacle does not just shrink, it disappears entirely in front of Zerubbabel.

Zerubbabel himself does nothing to cause this change.

The flattening comes from God's spirit, the same spirit already named in verse six.

What looked impossible becomes nothing more than open, level ground.

The mountain was only ever as big as the opposition believed it was.

🏔️ Plain means flat, level ground
✨ The mountain disappears, not just shrinks
🙌 Zerubbabel does not cause this himself
📖 God's spirit flattens the obstacle

## 🎉 Grace, Grace Unto It

The headstone was the final capstone set in place when a building was finished.

Bringing it forth with shouting pictures the public celebration at the temple's completion.

Grace repeated twice in a row was a way ancient Hebrew showed overwhelming emphasis.

The shout credits the finished temple entirely to God's favor.

No one shouts about their own might or power at that moment.

The celebration proves the whole promise from verse six came true.

🧱 Headstone means the final capstone
🎉 Shouting pictures public celebration
🔁 Grace repeated shows overwhelming emphasis
📖 The shout credits God, not human effort

# Zechariah 4:8-10
# 🔭 The Day Of Small Things
---
## 🏗️ The Hands Of Zerubbabel Have Laid The Foundation

Zerubbabel had already begun the temple's foundation years before this vision.

The same hands that started the work are promised to finish it too.

That promise answers any doubt about whether the project would ever be completed.

The finishing is credited to Zerubbabel's own hands.

The power behind those hands is still God's spirit.

God works through the very hands he empowers, not around them.

🏗️ Zerubbabel laid the foundation
🙌 His hands are promised to finish it
❓ This answers doubt about completion
📖 God works through human hands

## 🔍 Who Hath Despised The Day Of Small Things

Small things here means the modest, unimpressive early stages of the rebuilding.

Some in Jerusalem compared this new temple to Solomon's much grander original and felt disappointed.

That disappointment is exactly what this question confronts.

A small beginning is not the same thing as a failed one.

Despising the small start means missing what God is actually doing in it.

God does not measure a beginning by how impressive it looks.

🔍 Small things means modest beginnings
😞 Some compared it to Solomon's temple
🚫 Small is not the same as failed
📖 God does not measure by appearance

## 📏 They Shall See The Plummet In The Hand Of Zerubbabel

A plummet is a weighted line builders used to check that a wall stood straight.

Seeing it in Zerubbabel's hand pictures the work actually underway, not just planned.

The same people who despised the small beginning now get to watch real progress.

Small things grow into something measurable and real when the work keeps going.

The plummet proves the small beginning was never the end of the story.

📏 Plummet checked a wall's straightness
🙌 Pictures real work in progress
👀 Doubters now watch it happen
📖 A small start was not the end

## 👁️ They Are The Eyes Of The LORD

Those seven ties this verse back to the seven lamps seen at the start of the vision.

Eyes that run to and fro picture constant watching, not an occasional glance.

Nothing happening anywhere on earth escapes that watching.

The small rebuilding project in Jerusalem is being watched by the very same eyes.

What looked small to people was never small to the eyes watching it.

🔗 Those seven ties back to the lamps
👁️ Eyes picture constant watching
🌍 Nothing on earth escapes it
📖 A small project, fully watched

# Zechariah 4:11-14
# 🫒 The Two Anointed Ones
---
## ❓ What Are These Two Olive Trees

Zechariah finally asks about the two olive trees first seen back in verse three.

The vision has moved through Zerubbabel, the mountain, and the plummet without yet answering this.

Zechariah does not let the earlier question simply drop.

Asking again shows these trees were never a minor detail in the vision.

The most important part of the vision is saved for the very end.

❓ Zechariah returns to his first question
🌳 Olive trees from verse three
⏳ The question waited through the whole vision
📖 Saved as the vision's final answer

## 🫒 Two Olive Branches Which Through The Two Golden Pipes

Zechariah asks a second, more specific question about two olive branches.

These branches empty golden oil straight out of themselves through golden pipes.

That oil is the very fuel feeding the lampstand's seven lamps.

The trees are not just standing near the lampstand, they are actively supplying it.

The light has never been running on its own power.

🫒 Two branches supply golden oil
🔗 Golden pipes carry it to the lamps
🔥 This oil fuels the light
📖 The light was never self powered

## 🔁 Knowest Thou Not What These Be

The angel asks Zechariah the exact same question asked back in verse five.

Zechariah gives the exact same honest answer, No, my lord.

Repeating this exchange shows the vision circling back to finish what it started.

The prophet still needs the meaning handed to him.

Even at the end, the explanation comes from the angel, not from Zechariah himself.

🔁 Same question asked back in verse five
🙋 Zechariah gives the same honest answer
🔄 The vision circles back to finish itself
📖 The meaning still comes from the angel

## 🏺 These Are The Two Anointed Ones

Anointed here points to someone set apart for a special office by God.

Many scholars connect the two olive trees to Zerubbabel the governor and Joshua the high priest.

Zerubbabel represented the civil leadership rebuilding the city.

Joshua represented the priesthood restored back in chapter three.

Together they stand by the LORD of the whole earth.

Both supply the oil that keeps the lampstand's light burning.

The whole vision ends by showing exactly where the light's true power comes from.

🏺 Anointed means set apart for office
🏛️ Zerubbabel led the civil rebuilding
👳 Joshua led the restored priesthood
📖 Together they supply the light's true power
`.trim();

export const ZECHARIAH_FOUR_PERSONAL_SECTIONS = parseZechariahFourRawNotes(ZECHARIAH_FOUR_RAW_NOTES);
