export type DanielTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielTwelveRawNotes(rawText: string): DanielTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 12:${startVerse}` : `Daniel 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Daniel 12 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_TWELVE_RAW_NOTES = `# Daniel 12:1-2
# 👼 Michael And The Resurrection
---
## 🛡️ The Great Prince Which Standeth For The Children Of Thy People

Michael is an archangel named as the guardian prince assigned to Israel.

Daniel already met him earlier in this book, fighting for Israel against hostile spiritual powers.

Here he stands up, a phrase that means he rises to act, not simply to watch.

His standing up signals that God is about to step in for His people at the worst possible moment.

🛡️ Michael guards the nation Israel

⚔️ He already fought for Israel before

🧍 Standing up means rising to act

📖 God intervenes through His appointed guardian

## 😰 A Time Of Trouble

Trouble here means suffering worse than the nation had ever faced before.

Daniel had already lived through Babylon's conquest and the painful exile that followed.

This moment is described as even harder than that national disaster.

Many Bible teachers connect it to one final, severe tribulation before God's full victory.

😰 Trouble worse than any before it

🏛️ Babylon's exile was already severe

⏳ This points to a future tribulation

📖 Worse suffering comes before final victory

## 📜 Every One That Shall Be Found Written In The Book

The book here is the record of everyone who truly belongs to God.

Older parts of the Bible already mention a book kept by God with the names of His people.

Moses once asked to be removed from this same book, back in Exodus thirty two.

Being written in the book is what decides who gets delivered when trouble comes.

📜 The book lists God's true people

🏺 Exodus already mentions this same book

✍️ Moses once asked to be removed from it

📖 Being written in it brings deliverance

## 💤 Many Of Them That Sleep In The Dust Of The Earth Shall Awake

Sleep here is a gentle way of saying death.

Dust recalls how God formed Adam from the ground in Genesis.

The body returns to the ground when someone dies.

Awake means these dead will rise again, body and all.

This is one of the clearest promises of resurrection found in the Old Testament.

💤 Sleep is a gentle word for death

🌍 Dust recalls Adam formed from ground

⚰️ Bodies return to the ground in death

📖 This promises real bodily resurrection

## 🌓 Some To Everlasting Life And Some To Shame And Everlasting Contempt

Everlasting here means without end, in both directions, blessing and punishment alike.

Some rise to a reward that never runs out.

Others rise to a shame and contempt that never runs out either.

This is one of the clearest Old Testament statements that life continues after death in two opposite directions.

⚖️ Everlasting means lasting without end

🌟 Some receive a reward that never ends

😔 Others receive a shame that never ends

📖 Life after death has two outcomes

# Daniel 12:3-4
# ✨ Shining Like The Stars
---
## ✨ They That Be Wise Shall Shine As The Brightness Of The Firmament

The firmament is the sky itself, the dome of light stretching overhead.

Comparing the wise to that brightness means their faithful lives will be seen clearly, like light in open sky.

This is a reward for people who stayed faithful through the trouble described earlier in the chapter.

Their light does not fade after death, it keeps shining.

🌌 Firmament means the sky itself

💡 The wise shine with clear light

🙏 This rewards those who stayed faithful

➡️ Faithful light never fades after death

## 🌟 They That Turn Many To Righteousness As The Stars For Ever And Ever

Turning others to righteousness means helping people choose to live God's way.

The comparison to stars points to something that keeps shining long after a person is gone.

Teachers and leaders who guide others toward God receive this same lasting reward.

Daniel himself spent his whole life doing exactly this in a foreign empire.

🌟 Turning others means guiding them to God

⭐ Stars keep shining long after death

👨‍🏫 Teachers who guide others share this reward

📖 Daniel lived this example his whole life

## 🔒 Shut Up The Words And Seal The Book

Ancient scrolls were sealed with wax or clay so no one could open them without breaking the seal.

Daniel is told to close up this prophecy instead of explaining it further.

Sealing the book means the full meaning would wait until its time arrived.

Revelation later tells John to leave his scroll unsealed instead.

By John's day the time of the end was already near.

📜 Ancient scrolls were sealed with wax

🔒 Daniel must close up this prophecy

⏳ Its meaning waits for the right time

📖 Revelation later leaves its scroll unsealed

## 🏃 Many Shall Run To And Fro And Knowledge Shall Be Increased

Run to and fro is an old way of describing people moving about quickly and restlessly.

Knowledge increasing could mean a flood of understanding once the prophecy's time finally comes.

Many Bible teachers disagree about whether this points to searching for truth or simply busy, chaotic travel.

The text does not tell us exactly which meaning Daniel intended.

🏃 Run to and fro means restless movement

💡 Knowledge may flood in at the right time

🤔 Scholars read this phrase differently

➡️ The text leaves the exact meaning open

# Daniel 12:5-7
# 🌊 The Man Clothed In Linen
---
## 👥 The One On This Side Of The Bank Of The River

These two figures are heavenly beings, not human bystanders.

Daniel already described a man clothed in linen earlier in chapter ten, likely appearing again here.

One stands on each bank of the river, framing the scene like a solemn court.

Their presence shows Daniel is watching a conversation happening above the human world.

🌊 These figures are heavenly, not human

👤 Daniel already met a figure like this

⚖️ They frame the scene like a court

📖 Daniel watches a conversation beyond the human world

## 👔 The Man Clothed In Linen

Linen was the fabric worn by priests serving in the temple.

Dressing this messenger in linen marks him as someone holy, set apart for God's own work.

Standing upon the waters shows he has authority even over the river itself.

This same figure already appeared to Daniel in chapter ten, overwhelming him with its brightness.

👔 Linen was priestly clothing

💧 Standing on water shows real authority

✨ This figure already appeared in chapter ten

📖 A holy messenger carries God's own authority

## ⏳ How Long Shall It Be To The End Of These Wonders

This question comes from one of the two figures standing by the river.

It is the same question anyone suffering through hard times eventually asks, how much longer.

Wonders here means the stunning, world shaking events already described in Daniel's visions.

Even heavenly beings want to know when God will finally bring the suffering to a close.

⏳ The question is simply how long

😣 It echoes a cry from every sufferer

🌍 Wonders means the world shaking events shown

📖 Even heaven wants the suffering to end

## 🤚 A Time, Times, And An Half

Swearing by the one who lives forever was the strongest oath a person could make.

Time, times, and an half means three and a half years.

That same length of time shows up again later in Revelation.

Revelation describes it as forty two months, or twelve hundred sixty days.

Three and a half is exactly half of seven, a number that usually points to completeness in the Bible.

🤚 Swearing by God was the strongest oath

🔢 The phrase means three and a half years

📅 Revelation later repeats this same time span

📖 Half of seven points to incompleteness

## 💔 To Scatter The Power Of The Holy People

Scattering the power of the holy people means persecuting and breaking down God's faithful ones.

It does not mean the holy people are wiped out completely.

This sounds like defeat, but it is actually a signal the end is near.

Once this persecution runs its course, the vision's events are complete.

Suffering here has a real limit, it does not go on forever.

💔 Scattering means persecuting God's faithful people

🚫 It does not mean total destruction

🏁 This signals the end is near

📖 Suffering has a real limit here

# Daniel 12:8-10
# 🤷 I Heard But Understood Not
---
## 👂 I Heard But I Understood Not

Confusion in the face of prophecy is not a failure of faith.

Daniel says plainly that he heard everything but did not grasp what it meant.

This is one of the most honest moments in the whole book of Daniel.

Even a prophet who saw these visions firsthand could not fully grasp their meaning.

👂 Daniel openly admits his confusion

🙋 This is an honest, humble moment

🔭 Even the prophet could not grasp it all

📖 Confusion does not mean weak faith

## 🔏 The Words Are Closed Up And Sealed Till The Time Of The End

God tells Daniel plainly that he will not get to see this prophecy explained in his own lifetime.

Closed up and sealed repeats the same idea already given back in verse four.

Daniel is told to simply move forward with his life despite not having every answer.

Trusting God does not require understanding everything God has planned.

🔏 Daniel will not see this explained

⏳ Closed and sealed repeats verse four

🚶 Daniel is told to move forward

📖 Trust does not require full understanding

## ⚪ Many Shall Be Purified And Made White And Tried

Purified and made white are both pictures borrowed from refining metal and washing cloth.

Tried means tested, the same word used for proving metal is genuine by fire.

These three pictures together describe people whose faith grows stronger through real hardship.

The trouble described earlier in the chapter actually produces something good in God's people.

⚪ Purified and white picture refining and cleansing

🔥 Tried means tested like metal in fire

💪 Hardship can make real faith stronger

📖 Trouble produces something good in God's people

## 😈 The Wicked Shall Do Wickedly And None Of The Wicked Shall Understand

Hardened hearts do not soften just because the end is near.

The wicked keep sinning the same way, all the way to the very end.

They do not understand the prophecy, no matter how clearly it gets explained.

This is not because the words are too hard.

It is because their hearts are closed.

Understanding here is a gift reserved for the wise, not an automatic result of hearing the words.

😈 Hardened hearts stay hardened to the end

🙉 They cannot understand the prophecy

🔒 Their hearts stay closed not their ears

📖 Understanding is a gift for the wise

# Daniel 12:11-13
# ⏳ Blessed Is He That Waiteth
---
## 🗿 The Abomination That Maketh Desolate

The daily sacrifice was the regular offering priests made every morning and evening.

Taking it away means temple worship itself gets shut down by force.

The abomination that maketh desolate means something is placed in the temple that makes it unfit for worship.

Daniel already described this same abomination back in chapter eleven.

History records a pagan altar placed in this very temple a little over a century after Daniel wrote.

🕯️ Daily sacrifice was the regular temple offering

🚫 Taking it away shuts down worship

🗿 The abomination makes the temple unfit

📖 History later saw a pagan altar placed there

## 🔢 There Shall Be A Thousand Two Hundred And Ninety Days

Twelve hundred ninety days is close to three and a half years.

That is about one month longer than the time, times, and an half from verse seven.

This slightly longer number has puzzled many careful readers.

Many scholars believe the extra month allows time for events to fully play out after the main period ends.

The text does not give a certain answer for the exact gap.

🔢 About three and a half years plus extra

❓ This slightly longer number puzzles readers

🤔 Scholars suggest extra time for events to finish

📖 The text leaves the exact reason unclear

## 🙌 Blessed Is He That Waiteth

Blessed here does not mean an easy life.

It means God's own favor rests on someone who stays faithful.

Waiting for the full thirteen hundred thirty five days is itself an act of faithfulness.

That number stretches forty five days beyond the one given just before it.

The reward for waiting it out is promised.

It is simply not explained in detail.

🙌 Thirteen thirty five is forty five days further

⏳ Waiting itself becomes an act of faith

💛 Blessed means resting under God's favor

📖 A reward is promised but not explained

## 🧎 Stand In Thy Lot At The End Of The Days

Daniel is told a second time to simply continue living out his life.

Rest here means the peaceful rest of death, not a lack of activity.

Stand in thy lot means Daniel will receive his own promised inheritance when the resurrection finally comes.

The book of Daniel closes not with every answer given, but with a personal promise kept just for him.

🧎 Daniel is told to keep living

😌 Rest means the peaceful rest of death

🎁 Stand in thy lot means his own inheritance

📖 Daniel's story ends with a personal promise
`.trim();

export const DANIEL_TWELVE_PERSONAL_SECTIONS = parseDanielTwelveRawNotes(DANIEL_TWELVE_RAW_NOTES);
