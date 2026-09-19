export type PsalmsOneHundredTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentyOneRawNotes(rawText: string): PsalmsOneHundredTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+121:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 121 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+121:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+121:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 121 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 121,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 121:${startVerse}` : `Psalms 121:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 121 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_ONE_RAW_NOTES = `# Psalms 121:1-2
# ⛰️ Looking To The Hills
---
## 🧭 I Will Lift Up Mine Eyes Unto The Hills

This does not mean the hills themselves are the source of help.

Pilgrims sang this song on the road up to Jerusalem for the yearly feasts.

A trip through those hills could mean steep bandit filled roads or altars built to false gods.

The psalm opens with a real question, not an answer yet.

Verse two supplies the actual answer.

🧭 Opens the road toward Jerusalem
⛰️ Hills could mean danger or false gods
❓ The psalm opens with a real question
📖 The true answer arrives in verse two

## ❓ From Whence Cometh My Help

Whence is an old word meaning from where.

The psalmist asks himself where real help actually comes from.

He does not yet name the source in this line.

The tension sets up the answer that follows immediately.

❓ Whence means from where
🤔 He asks where help truly comes from
⏳ The source is not named yet
➡️ The answer follows right away

## 🌍 Which Made Heaven And Earth

The answer finally arrives in this line.

Help comes from the LORD.

It does not come from the hills themselves.

Calling Him the maker of heaven and earth names Him as the strongest possible protector.

No hill, no pagan altar, and no bandit can outrank the Creator.

🙌 The answer finally arrives
🌍 Help comes from the LORD alone
🚫 Not from the hills themselves
📖 The Creator outranks every false hope

# Psalms 121:3-4
# 🛡️ A Guard Who Never Sleeps
---
## 📜 He Will Not Suffer Thy Foot To Be Moved

Suffer here is an old word meaning allow or permit.

This is not talk about pain or hardship at all.

Mountain roads on the way to Jerusalem were narrow and rocky.

One loose stone could send a tired traveler tumbling.

God promises to guard against exactly that kind of fall.

📜 Suffer means allow, not pain
🥾 Not a promise about hardship
⛰️ Mountain roads were narrow and rocky
📖 God guards against a sudden fall

## 👁️ He That Keepeth Thee Will Not Slumber

Keepeth is an old word meaning watches over and guards closely.

Slumber here means a light doze, not deep sleep.

Other nations worshipped gods that prophets openly mocked as sleepy.

Elijah once taunted the prophets of Baal by suggesting their god was napping.

The LORD is announced here as nothing like that kind of god.

👁️ Keepeth means watches over closely
😴 Slumber means a light doze
🗿 Other gods were mocked as sleepy
📖 The LORD is nothing like that

## 📢 Behold He That Keepeth Israel

Behold is a word used to grab the reader's full attention.

The psalm has spoken only about one traveler up to this point.

This line suddenly widens the promise to all of Israel.

The same watchful care covers one pilgrim and an entire nation at once.

📢 Behold grabs the reader's attention
🧍 The psalm was about one traveler
🌍 Now it widens to all Israel
📖 One promise covers the whole nation

## 🔁 Shall Neither Slumber Nor Sleep

Hebrew poetry often says the same idea twice in different words.

Slumber and sleep here name the same rest in two ways.

Repeating it removes any doubt about how constant this care truly is.

This is not partial protection with occasional gaps.

It is protection that never once looks away.

🔁 Hebrew poetry often repeats one idea
😴 Slumber and sleep name the same rest
🚫 No gaps and no exceptions
➡️ Protection that never looks away

# Psalms 121:5-6
# ☀️ Shade From Sun And Moon
---
## 🔑 The LORD Is Thy Keeper

Keeper repeats an idea already used twice just before this line.

The underlying Hebrew word behind keep and preserve is the same root.

That root appears six times across this short eight verse psalm.

Repetition here is not lazy writing.

It is emphasis built on purpose.

🔑 Keeper repeats an idea from before
📜 Keep and preserve share one Hebrew root
🔢 That root appears six times in this psalm
📖 Repetition here means deliberate emphasis

## 🗡️ Thy Shade Upon Thy Right Hand

The right hand was normally a person's weapon hand in battle.

Standing at someone's right side meant guarding their most exposed spot.

Shade pictures relief from brutal daytime heat on an exposed road.

God is pictured here as a bodyguard and a shelter at the same time.

🗡️ Right hand was the weapon hand
🛡️ Standing there means guarding the exposed side
🌳 Shade means relief from brutal heat
📖 God is bodyguard and shelter together

## ☀️ The Sun Shall Not Smite Thee By Day

Smite here means a real physical strike, not a mild inconvenience.

Pilgrim roads climbing toward Jerusalem offered little natural shade.

Sun exposure on a long uphill walk could genuinely injure a traveler.

This line promises protection from an actual physical danger, not a poetic one.

☀️ Smite means a real physical strike
🥾 Mountain roads offered little shade
🥵 Sun exposure could genuinely injure travelers
📖 The danger named here was real

## 🌙 Nor The Moon By Night

Many ancient people believed moonlight itself could cause sickness or madness.

The English word lunacy actually comes from luna, the Latin word for moon.

This line answers that old fear directly.

God's watch covers the traveler by day and by night without a single gap.

🌙 Many believed moonlight caused sickness
🗣️ Lunacy comes from luna, the word for moon
🌗 This verse answers that old fear
📖 God watches day and night without a gap

# Psalms 121:7-8
# 🕊️ A Blessing For The Whole Journey
---
## 🛡️ The LORD Shall Preserve Thee From All Evil

Preserve here means to actively protect from harm, not just to keep something around.

All evil covers danger in every form, not only physical threats.

This is the widest promise in the whole psalm so far.

Nothing is excluded from this kind of watchful care.

🛡️ Preserve means active protection from harm
🌍 All evil covers every kind of danger
📏 The widest promise in the psalm
📖 Nothing is left outside this care

## 💗 He Shall Preserve Thy Soul

Soul here means the deepest part of a person, not only the body.

Earlier verses already covered feet, sun, and moon, all physical dangers.

This line adds a deeper layer beyond just the physical body.

The promise reaches all the way into a person's inner life.

💗 Soul means the deepest part of a person
🦶 Earlier verses covered physical dangers
🌊 This adds a deeper layer of care
📖 The promise reaches the inner life

## 🔤 Thy Going Out And Thy Coming In

This phrase is a figure of speech called a merism.

A merism names two opposite ends to mean everything between them.

Going out and coming in covers a person's whole daily life.

The same phrase appears elsewhere in the Old Testament as a blessing.

🔤 This phrase is called a merism
🔄 It names two ends to mean everything between
📅 It covers a person's whole daily life
📖 The same phrase blesses life elsewhere too

## ⏳ Even For Evermore

This closing line stretches the promise across all of time.

The psalm began with a pilgrim looking up at distant hills.

It ends with a promise that reaches far beyond that one journey.

The road up to Jerusalem was only ever the beginning of the story.

⏳ The promise stretches across all time
⛰️ The psalm began with a pilgrim's journey
🛣️ It ends reaching far beyond that road
📖 God's care outlasts the whole journey
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_ONE_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentyOneRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_ONE_RAW_NOTES
);
