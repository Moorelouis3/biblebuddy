export type EcclesiastesElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesElevenRawNotes(rawText: string): EcclesiastesElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 11:${startVerse}` : `Ecclesiastes 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Ecclesiastes 11 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_ELEVEN_RAW_NOTES = `# Ecclesiastes 11:1-2
# 🍞 Bread Cast Upon The Waters
---
## 🍞 Cast Thy Bread Upon The Waters

This is not a literal instruction about feeding bread to a river.

Many scholars believe it pictures sending goods out by ship, a risky kind of trade.

A merchant would send grain or cargo across the sea without knowing if it would return.

The image describes giving or investing when the outcome is not guaranteed.

The Preacher is describing generosity that takes a real risk.

🍞 Bread pictures goods sent out

🚢 Likely describes risky sea trade

⏳ The return is not guaranteed

📖 Generosity can mean taking a risk

## ⏳ Thou Shalt Find It After Many Days

The reward for this kind of generosity does not come right away.

Trade ships in the ancient world could be gone for months before returning.

The Preacher is not promising an immediate payoff.

He is promising a payoff that shows up later, in its own time.

Patience is part of what makes the risk worth taking.

⏳ The reward is delayed, not instant

🚢 Trade ships stayed gone for months

🎁 The payoff comes on its own time

📖 Patience makes the risk worth it

## 🔢 Give A Portion To Seven, And Also To Eight

This is a Hebrew way of saying give to as many people as you can.

Counting up from seven to eight is not a literal headcount.

It is a pattern used elsewhere in the Bible to mean the full amount.

The point is to spread generosity widely, not narrowly.

Do not stop giving after helping just one or two people.

🔢 Seven to eight is a set pattern

🤲 It means give to many, not few

🚫 Do not stop after one gift

📖 Generosity should spread widely

## 🌪️ Thou Knowest Not What Evil Shall Be Upon The Earth

No one can predict what disaster might strike next.

A famine, a war, or a bad harvest could wipe out what is saved in one place.

This is the reason to give to seven and also to eight.

Spreading generosity is also a way of spreading risk.

You cannot control the future, but you can still choose to be generous now.

🌪️ No one can predict disaster

🔀 Spreading gifts also spreads risk

🛡️ Give now, before disaster strikes

📖 Generosity outlasts an uncertain future

# Ecclesiastes 11:3-6
# 🌧️ Wind And Clouds You Cannot Control
---
## 🌧️ The Clouds Be Full Of Rain, They Empty Themselves

Clouds full of rain do only one thing, they let the rain fall.

Nothing stops that process once the clouds are full.

The Preacher uses this as a picture of how nature runs on its own fixed rules.

People do not get to argue with a rainstorm or reason it out of falling.

Some things simply happen because that is how the world works.

🌧️ Full clouds always release rain

🔁 Nature follows fixed patterns

🙅 No one can argue with a storm

📖 Some outcomes are simply set

## 🌳 In The Place Where The Tree Falleth, There It Shall Be

This is not only advice about lumber or falling branches.

Once a tree falls, it stays exactly where it landed.

It cannot get back up and fall somewhere else.

Many readers see this as a picture of a life whose course is now fixed.

A choice made and finished cannot simply be taken back.

🌳 Not just advice about trees

📍 A fallen tree stays put

🔒 Some outcomes cannot be undone

➡️ What is settled stays settled

## 🌬️ He That Observeth The Wind Shall Not Sow

A farmer who waits for perfectly calm weather will never plant anything.

Wind and clouds are part of every growing season.

They never fully go away.

Waiting for ideal conditions becomes an excuse to never act at all.

The same is true for regarding the clouds and refusing to reap.

Useful work requires moving forward despite conditions you cannot control.

🌬️ Waiting for calm wind never plants

☁️ Conditions are never perfectly ideal

⏸️ Excess caution becomes an excuse

📖 Work requires moving despite uncertainty

## 🦴 How The Bones Do Grow In The Womb

Ancient people had almost no understanding of how a baby forms before birth.

The growth of bones inside the womb was a complete mystery to them.

The Preacher uses this as an example of something ordinary that still cannot be explained.

If something this common is beyond understanding, much more is beyond human reach.

Human knowledge has real limits, even about everyday life.

🦴 Bone growth in the womb was a mystery

🤰 Even ordinary life defies explanation

🧠 Human understanding has real limits

📖 Small mysteries point to bigger ones

## 🌌 Thou Knowest Not The Works Of God Who Maketh All

This is the main point behind both the wind and the womb.

Ordinary processes in nature and the body are already beyond full understanding.

God's work goes even further beyond that.

The Preacher is not asking the reader to stop working or stop living.

He is asking the reader to stop expecting to understand everything first.

Trust does not require full understanding.

🌌 God's work goes beyond nature's mysteries

🙅 Full understanding is not required

🔨 Keep working without knowing everything

📖 Faith moves before answers do

## 🌅 In The Morning Sow Thy Seed

"Withhold" means to hold something back instead of using it.

This verse pictures a full day of steady work, from morning until evening.

The farmer does not sow only once and then stop for the rest of the day.

He keeps working through every part of the day that is available to him.

Consistent effort matters more than a single burst of activity.

🌅 Withhold means to hold back

🌱 Morning to evening pictures full effort

🚜 Do not stop after one planting

📖 Steady effort beats a single burst

## 🌱 Thou Knowest Not Whether Shall Prosper

The farmer plants in the morning and again in the evening.

He cannot predict which planting will pay off.

It might be one, both, or neither.

Uncertainty is not a reason to plant less.

It is a reason to plant more.

This same idea already applied to generosity earlier in the chapter.

🌱 Farmers cannot predict which crop succeeds

🎲 It might be one, both, or neither

➕ Uncertainty is a reason to do more

📖 The same idea applies to generosity

# Ecclesiastes 11:7-8
# ☀️ The Light Is Sweet
---
## ☀️ Truly The Light Is Sweet

"Light" here stands for being alive, not just physical daylight.

Throughout the Bible, darkness often pictures death or the grave.

Seeing the sun is a simple stand in for the whole experience of living.

The Preacher is stating something plain.

Life itself is good.

Even in a book full of hard questions, this joy is not denied.

☀️ Light stands for being alive

🌑 Darkness often pictures the grave

👀 Seeing the sun pictures living itself

📖 Life itself is called good

## 🌑 Let Him Remember The Days Of Darkness

"The days of darkness" means death and the time spent in the grave.

Even someone who lives a long, joyful life should keep this in mind.

The grave will last far longer than any number of years lived on earth.

This is not meant to ruin the joy from the verse before it.

It is meant to keep that joy honest and clear eyed.

🌑 Darkness here means death and the grave

⏳ The grave lasts longer than life does

😊 This does not cancel the earlier joy

📖 Joy and honesty about death can coexist

## 💨 All That Cometh Is Vanity

"Vanity" in this book means fleeting or hard to hold onto, not worthless.

Everything that happens in life, the good and the hard, passes quickly.

This is the Preacher's summary line for the whole chapter so far.

Every image in this chapter keeps moving and changing.

Life does not sit still long enough to be fully grasped.

💨 Vanity means fleeting, not worthless

🔄 Everything here keeps moving and changing

📜 This line summarizes the chapter so far

📖 Life cannot be fully grasped or held

# Ecclesiastes 11:9-10
# 🎉 Rejoice In Your Youth
---
## 🎉 Rejoice, O Young Man, In Thy Youth

This is a direct command to enjoy the strength and freedom of being young.

The Preacher spent earlier chapters describing how short and uncertain life is.

Here he turns that same truth into a reason for real joy, not despair.

Youth carries energy and possibility that does not last forever.

Enjoying it now is not wasted time.

It is wise timing.

🎉 A direct command to enjoy youth

⏳ Life is short, chapters before said so

⚡ Youth carries real energy and possibility

📖 Enjoying youth now is wise timing

## 🎯 Walk In The Ways Of Thine Heart

This can sound like permission to chase absolutely anything a person wants.

The same verse also says to follow the sight of thine eyes.

Read alongside the rest of Ecclesiastes, this points to enjoying life's honest pleasures, not every impulse.

Work, food, friendship, and rest are gifts this book already calls good elsewhere.

The very next line in this same verse adds an important limit.

Freedom here is real.

It is not freedom without any limit.

🎯 Not permission to chase every impulse

🎁 Points to life's honest pleasures

🍞 Ecclesiastes already calls these gifts good

📖 Real freedom still has a limit

## ⚖️ God Will Bring Thee Into Judgment

This is the limit the verse just promised.

Every choice made in youth, even the enjoyable ones, will be reviewed by God.

Judgment here is not only a future courtroom scene.

It means every choice carries real weight, now and later.

Freedom and accountability are not opposites in this verse.

They sit side by side.

⚖️ God reviews every choice made in youth

🚪 Judgment is not only a future scene

🏋️ Every choice carries real weight

📖 Freedom and accountability sit together

## 💭 Remove Sorrow From Thy Heart

"Sorrow" here points to needless bitterness or anxiety that eats at the mind.

This is not the healthy grief from mourning something real.

It describes a nagging heaviness that keeps a person from living well.

The Preacher tells the reader to actively remove it, not just endure it.

Youth is too short to spend it weighed down for no reason.

💭 Sorrow means needless bitterness or anxiety

🙅 Different from healthy grief over loss

⚖️ It keeps a person from living well

📖 Youth is too short to carry it

## 🚫 Put Away Evil From Thy Flesh

This command pairs with the one just before it.

One guards the mind, this one guards the body and its choices.

"Evil" here points to harmful living, not just criminal acts.

Youth is often when reckless choices with the body feel most tempting.

Guarding both the heart and the body protects the whole person.

🚫 Evil here means harmful living

🫀 This command guards the body

⚡ Youth makes reckless choices feel tempting

📖 Guarding both protects the whole person

## 🕰️ Childhood And Youth Are Vanity

"Vanity" returns here, meaning quickly passing, not worthless.

Childhood and youth do not last nearly as long as they feel like they will.

This is the reason the chapter opened with rejoicing instead of waiting.

A short season used wisely is worth more than a short season wasted.

The whole chapter has been building toward this one urgent point.

⏳ Youth passes faster than it feels

💨 Vanity returns, still meaning quickly passing

🎯 A short season is worth using wisely

📖 This urgency is the chapter's whole point
`.trim();

export const ECCLESIASTES_ELEVEN_PERSONAL_SECTIONS = parseEcclesiastesElevenRawNotes(ECCLESIASTES_ELEVEN_RAW_NOTES);
