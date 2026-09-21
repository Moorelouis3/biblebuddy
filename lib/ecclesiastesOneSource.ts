export type EcclesiastesOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesOneRawNotes(rawText: string): EcclesiastesOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 1:${startVerse}` : `Ecclesiastes 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ecclesiastes 1 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_ONE_RAW_NOTES = `# Ecclesiastes 1:1-3
# 📜 Meet The Preacher
---
## 📜 The Words Of The Preacher

Preacher is not describing a pulpit speaker the way that word sounds today.

It translates a Hebrew word, Qoheleth.

Qoheleth means one who gathers an assembly together to teach them.

Picture someone calling a crowd together to share hard learned wisdom.

The whole book that follows is written as that teacher's collected words.

📜 Preacher translates the Hebrew word Qoheleth

👥 Qoheleth means one who gathers an assembly

🎓 He gathers people together to teach

📖 This book records his collected teaching

## 👑 The Son Of David, King In Jerusalem

This phrase points to Solomon without stating his name directly.

Solomon was David's son and Israel's third king.

He ruled from Jerusalem, the capital of the whole kingdom.

He was famous for wisdom, wealth, and building the first temple.

Many scholars believe Solomon wrote this book near the end of his life.

Some scholars believe a later writer composed it in his voice instead.

Either way, the book speaks with the authority of Israel's wisest king.

👑 Points to Solomon without naming him

🏛️ Solomon built the first temple

💰 He was famous for wisdom and wealth

📖 The book carries a wise king's authority

## 💨 Vanity Of Vanities

Vanity does not mean pride or self admiration the way it does today.

The Hebrew word behind it is hevel.

Hevel literally means vapor or breath.

Think of the mist your breath makes on a cold morning.

It is there for a second, then it is completely gone.

That fleeting feeling is exactly what the Preacher means by vanity.

💨 Vanity does not mean pride here

🌬️ The Hebrew word hevel means vapor

🥶 Like breath on a cold morning

📖 Real but impossible to hold onto

## 🔁 All Is Vanity

Saying vanity of vanities doubles the word for emphasis.

Hebrew does this with its strongest, most important ideas.

Holy of holies and King of kings use the very same pattern.

Doubling a word this way marks the most vapor like thing there is.

The Preacher names his whole conclusion before he even argues for it.

🔁 Doubling the word signals strongest emphasis

👑 Same pattern as Holy of holies

⚖️ Hebrew doubles words for emphasis

➡️ The conclusion arrives before the argument

## ❓ What Profit Hath A Man

The Preacher opens with a genuine question, not a rhetorical trick.

Profit is a word borrowed from business.

It means what is left over after the cost.

He is asking what a person actually keeps after a whole life of hard work.

This question sets up the entire investigation that fills the rest of the book.

❓ A real question, not just rhetoric

💰 Profit means what is left over

⚖️ What does a life of labor keep

📖 This question drives the whole book

## 🔭 Under The Sun

This phrase appears again and again throughout Ecclesiastes.

It describes life viewed only from an earthly, limited point of view.

Nothing beyond this life, no eternity, no heaven, gets counted in that view.

The Preacher is testing what life means if this world is all there is.

Watching for this phrase unlocks most of the book's hardest sounding conclusions.

🔭 Marks an earthly, limited viewpoint

🚫 Leaves eternity out of the picture

🔁 Repeats again and again in Ecclesiastes

📖 Unlocks the book's hardest conclusions

# Ecclesiastes 1:4-7
# 🌀 The Tired Old World
---
## 👶 One Generation Passeth Away

People are born, grow old, and die in an endless, repeating pattern.

No single generation gets to stay and watch how the story finally ends.

Everyone eventually hands the world off to someone else.

That handoff has been happening since the very first family.

👶 Generations are born and pass away

🔁 The pattern repeats without stopping

🤝 Everyone hands the world to the next

📖 No one stays to see the ending

## 🌍 The Earth Abideth For Ever

Unlike the people living on it, the earth itself does not go anywhere.

That sounds like stability, something solid to hold onto.

But the Preacher is not praising the earth here.

He is pointing out that even the most permanent seeming thing outlasts every person.

Permanence without meaning is still part of the puzzle he is chasing.

🌍 The earth outlasts every generation

🪨 It sounds stable and permanent

😔 But permanence alone brings no meaning

📖 Even lasting things fit the puzzle

## ☀️ The Sun Also Ariseth, And The Sun Goeth Down

The sun becomes the next example in this pattern of repetition.

Every single day it rises, crosses the sky, and sets again.

Nothing about that daily motion ever actually changes anything.

The Preacher uses the sky itself to make his point feel bigger than just people.

☀️ The sun rises and sets daily

🔁 Nothing about the motion changes

🌌 The sky joins the pattern too

➡️ The point grows bigger than people

## 🏃 Hasteth To His Place Where He Arose

Hasteth is an old word meaning to hurry or rush.

The Preacher pictures the sun as eager to get back to its starting point.

That image makes the sun's daily circuit feel tiring instead of majestic.

Even the sky seems worn out by its own endless routine.

🏃 Hasteth means hurries or rushes

😩 The sun is pictured as tired

🔄 It rushes back to where it began

📖 Even the sky seems worn out

## 🧭 According To His Circuits

Circuits means fixed paths that loop back to where they started.

The wind in this verse blows south, then north, then back around again.

It never actually goes anywhere new, no matter how far it seems to travel.

The whirling motion mirrors the same tired cycle as the sunrise before it.

🧭 Circuits means fixed looping paths

💨 Wind blows south, then north, then back

🌪️ It never truly goes anywhere new

📖 Matches the sun's tired cycle

## 🌊 Yet The Sea Is Not Full

Every river on earth constantly empties into the sea.

Somehow the sea itself never rises or overflows from all that water.

That is a small, everyday mystery of endless input with no visible change.

The Preacher uses it as a picture for desire that never reaches full.

🌊 Rivers constantly pour into the sea

📏 The sea itself never overflows

🔁 Endless input, no visible change

📖 A picture of desire never satisfied

## 🗺️ Thither They Return Again

Thither is an old word simply meaning to that place.

Ancient people already understood that water somehow finds its way back to the rivers.

The Preacher did not have modern science to explain evaporation and rainfall.

He still accurately noticed the cycle just by watching the world closely.

🗺️ Thither means to that place

💧 Water finds its way back again

👀 Noticed just by watching closely

📖 Accurate long before modern science

# Ecclesiastes 1:8-11
# 🗣️ Nothing New To Say
---
## 😓 Full Of Labour

Labour here means more than just hard work.

It carries the idea of exhausting, wearisome effort that leaves a person worn out.

The Preacher says all things carry that same tiring weight.

Even ordinary daily life is described as heavy, not light.

😓 Labour means wearisome, tiring effort

🏋️ All things carry that weight

📉 Even ordinary life feels heavy

📖 Nothing here is described as light

## 🗣️ Man Cannot Utter It

The weariness the Preacher describes is too large to put fully into words.

Anyone who has felt genuinely exhausted by life knows it is hard to explain.

Language itself runs out before the feeling does.

That gap between the feeling and the words is part of his whole point.

🗣️ Words fail to capture the feeling

😞 Real exhaustion is hard to explain

📏 Language runs out before feeling does

📖 The gap itself makes his point

## 👁️ The Eye Is Not Satisfied With Seeing, Nor The Ear Filled With Hearing

This is a common Hebrew poetry pattern called parallelism.

Two lines say almost the same idea in two different ways.

Here the eye seeing and the ear hearing both describe an unsatisfied craving.

No matter how much a person sees or hears, it never feels like enough.

That restlessness lines up with the rivers that never fill the sea.

👁️ Eye and ear repeat one idea twice

🎭 A Hebrew poetry pattern called parallelism

😩 Seeing and hearing never feel like enough

📖 Matches the sea that never fills

## 📢 There Is No New Thing Under The Sun

This is the most quoted line in the whole book.

The Preacher states his conclusion flatly, with no softening.

Whatever a person experiences has already happened to someone before, in some form.

History does not feel like it is building toward something brand new.

Instead it feels like the same patterns showing up again and again.

📢 The book's single most quoted line

🔁 Every experience has already happened before

🌀 History repeats familiar patterns

📖 Nothing here is truly brand new

## ❓ It Hath Been Already Of Old Time

The Preacher expects readers to push back and name something they think is new.

His answer comes before anyone even asks the question.

Whatever feels new usually just feels that way because no one remembers it before.

Old ideas keep returning wearing new looking clothes.

❓ Anticipates the reader's objection early

🕰️ What feels new already happened before

👕 Old ideas wear new looking clothes

📖 Memory is shorter than the pattern

## 🕳️ No Remembrance Of Former Things

People and events from the past quietly fade from memory over time.

The same fading will eventually happen to everything happening right now too.

Future generations will not remember most of what feels urgent today.

That forgetting is part of why the Preacher questions any lasting profit at all.

🕳️ The past fades from memory

⏳ The present will fade the same way

👥 Future generations will forget today too

📖 Forgetting raises the profit question again

# Ecclesiastes 1:12-15
# 🔍 The King's Experiment
---
## 👑 King Over Israel In Jerusalem

The voice in the book shifts here to a direct, personal account.

The speaker confirms he ruled as king over Israel from Jerusalem.

That detail matters because a king had every possible resource to test his questions.

Most people never get to chase every pleasure, project, or possession they want.

This king did, which makes his final conclusion carry much more weight.

👑 The voice becomes personal and direct

🏛️ He ruled from Jerusalem as king

💎 A king could test every resource

📖 His conclusion carries extra weight

## ❤️ Gave My Heart To Seek And Search Out By Wisdom

This is an old way of saying he devoted himself completely to a task.

He did not casually wonder about life.

He committed himself to a full, deliberate investigation.

All things done under heaven means his search covered everything, not one small question.

❤️ Gave my heart means full devotion

🔎 A deliberate, ongoing investigation

🌐 Covered everything under heaven

➡️ This was not casual wondering

## ⚠️ This Sore Travail

Sore is an old word meaning severe or heavy, not a physical wound.

Travail means painful, exhausting labor.

It is the same word sometimes used for childbirth.

God gave humanity this difficult task of trying to make sense of life.

It is described here as a burden, not a pleasant hobby.

⚠️ Sore means severe or heavy

🤰 Travail means painful, exhausting labor

🎁 God gave this task to mankind

📖 A burden, not a hobby

## 💨 Vexation Of Spirit

The Hebrew phrase behind this literally means feeding on wind or chasing wind.

Picture trying to grab a handful of wind and hold onto it.

No matter how hard someone tries, nothing solid stays in their hand.

That is exactly how the Preacher describes everything he has seen under the sun.

💨 Literally means chasing after wind

✊ Like grabbing wind with an empty hand

🚫 Nothing solid is ever left behind

📖 Describes everything under the sun

## 🌀 That Which Is Crooked Cannot Be Made Straight

Some problems in life simply cannot be fixed, no matter how much wisdom is applied.

This is not the Preacher giving up early.

It is an honest limit he discovered through real experience.

Wisdom can explain a great deal, but it cannot repair everything broken.

🌀 Some things cannot be fixed

🚫 Not the Preacher giving up

🧠 A limit found through real experience

📖 Wisdom explains, but cannot repair everything

## ❓ That Which Is Wanting Cannot Be Numbered

Wanting here means lacking or missing, not desiring something.

Whatever is genuinely missing from a situation cannot simply be counted or measured.

Some gaps in life do not have a clean, countable answer.

That incompleteness is part of what makes the search feel so heavy.

❓ Wanting means lacking, not desiring

🔢 Missing things cannot be counted

🕳️ Some gaps have no clean answer

📖 Incompleteness adds to the heaviness

# Ecclesiastes 1:16-18
# 😔 Wisdom's Heavy Price
---
## 🗣️ I Communed With Mine Own Heart

This is an old idiom for having an honest conversation with yourself.

The Preacher is not talking to another person in this verse.

He is reasoning quietly through his own thoughts and conclusions.

This kind of private reflection appears often throughout the book.

🗣️ An old idiom for self reflection

🤔 Talking honestly with himself

📝 Reasoning through his own conclusions

📖 A pattern repeated through the book

## 🏞️ Come To Great Estate

Estate here does not mean land or property like it might sound today.

It means position, greatness, or standing among other people.

The Preacher is saying he reached a level few others ever reach.

That claim sets up everything he says next about wisdom.

🏞️ Estate does not mean land here

👑 It means position and greatness

📈 He reached a rare level

➡️ This sets up his next claim

## 🤨 More Wisdom Than All They That Have Been Before Me In Jerusalem

This line can sound like boasting to a modern reader.

In its original setting it is closer to a factual claim than a brag.

The Preacher is establishing why his conclusions deserve real attention.

A king with unmatched wisdom testing a question makes the answer worth taking seriously.

🤨 Sounds like boasting to modern ears

📊 Closer to a plain, factual claim

🎓 Establishes why his answer matters

📖 A wise king's test carries weight

## 🧠 To Know Madness And Folly

The Preacher did not only study wisdom from a safe distance.

He deliberately studied foolishness and madness too, to compare them honestly.

This was not him losing his mind or acting recklessly.

He wanted his conclusion built on the whole picture, not just half of it.

🧠 Studied wisdom and folly both

⚖️ A deliberate, honest comparison

🚫 Not losing his mind himself

📖 Wanted the whole picture, not half

## 📚 In Much Wisdom Is Much Grief

This is the chapter's final, flat statement, with no softening added.

Learning more about how the world actually works often reveals painful truths.

Seeing clearly can hurt more than staying comfortably unaware ever did.

The Preacher closes his very first chapter admitting knowledge came with real sorrow.

📚 The chapter's final, flat statement

😢 Clarity often reveals painful truths

👀 Seeing clearly can hurt more

📖 Knowledge came with real sorrow
`.trim();

export const ECCLESIASTES_ONE_PERSONAL_SECTIONS = parseEcclesiastesOneRawNotes(ECCLESIASTES_ONE_RAW_NOTES);
