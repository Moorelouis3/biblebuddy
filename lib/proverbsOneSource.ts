export type ProverbsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsOneRawNotes(rawText: string): ProverbsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 1:${startVerse}` : `Proverbs 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 1 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_ONE_RAW_NOTES = `# Proverbs 1:1-4
# 📜 The Purpose Of The Proverbs
---
## 📜 The Proverbs Of Solomon The Son Of David

A proverb is a short saying that packs a big truth into few words.

Solomon wrote most of the proverbs collected in this book.

He was David's son and Israel's third king.

God gave Solomon wisdom beyond any king before him.

This book collects that wisdom for anyone willing to read it.

🗒️ A proverb packs truth into few words

👑 Solomon was David's son and heir

🕊️ God gave him unmatched wisdom

📖 This book preserves that wisdom for readers

---

## 🧠 To Know Wisdom And Instruction

"Wisdom" means the skill of living well, not just knowing facts.

"Instruction" means correction that shapes character over time.

The book pairs the two on purpose.

Head knowledge alone was never the goal here.

The goal is a changed life.

🧠 Wisdom means skill for living well

🛠️ Instruction means shaping correction

🤝 The two are paired on purpose

📖 The goal is a changed life

---

## 👂 To Perceive The Words Of Understanding

"Perceive" means more than hearing words.

It means grasping what those words actually mean.

A reader can hear a proverb and still miss its point.

Solomon wants readers who catch the deeper meaning, not just the sound.

That takes real attention, not just listening.

👂 Perceive means more than hearing

🔍 It means grasping the real meaning

😶 Hearing alone can miss the point

➡️ Real attention catches deeper meaning

---

## ⚖️ Wisdom, Justice, And Judgment, And Equity

These four words come from the courtroom.

"Judgment" means weighing a case with justice.

"Equity" means treating every person the same regardless of status.

Solomon was famous for exactly this kind of wise judging.

First Kings tells of two women who both claimed one baby.

His ruling on that case proved his wisdom to the whole nation.

⚖️ Judgment means weighing a case with justice

🤝 Equity treats everyone the same

👶 He judged the famous baby dispute

📖 That case proved his wisdom nationwide

---

## 🐍 Subtilty To The Simple

"Subtilty" does not mean trickery here.

In Genesis, the serpent's subtilty was cunning used for evil.

Here it means sharp discernment used for good.

"The simple" are not stupid people.

They are inexperienced people who have not yet learned to spot danger.

This proverb offers them the discernment they lack.

🐍 Subtilty was cunning in Genesis

✅ Here it means good discernment

🌱 Simple means inexperienced not unintelligent

📖 This proverb offers them discernment

---

## 🎯 The Young Man Knowledge And Discretion

"Discretion" means making a wise call on your own.

Knowledge alone does not produce good decisions.

A person can know facts and still choose poorly.

Discretion turns knowledge into good judgment in the moment.

Solomon aims this book at a young man.

This skill must be trained.

It does not arrive by birth.

🎯 Discretion means a wise call on your own

📚 Knowledge alone does not guarantee good choices

🛠️ Discretion turns knowledge into judgment

📖 This skill is trained, not inherited

# Proverbs 1:5-7
# 🔑 The Foundation Of Wisdom
---
## 👂 A Wise Man Will Hear, And Will Increase Learning

Being wise is never a finished state.

A wise person keeps hearing and keeps learning.

Only a fool assumes they have already arrived.

This verse describes an ongoing habit, not a one time achievement.

Even a person of understanding keeps seeking wise counsel.

👂 Wisdom keeps hearing and learning

🚫 Wisdom is never a finished state

🙋 Even wise people seek more counsel

➡️ Growth never really stops

---

## 🌑 Dark Sayings

"Dark sayings" does not mean evil or sinister.

It means a riddle or a saying with a hidden meaning underneath.

The proverbs are built to make readers slow down and think.

A quick reading misses the deeper layer on purpose.

This is wisdom literature meant to be chewed on, not skimmed.

🌑 Dark sayings means riddles, not evil

🐢 They are built to slow readers down

🧩 A hidden meaning sits underneath

📖 Proverbs rewards slow, careful reading

---

## 🙏 The Fear Of The LORD Is The Beginning Of Knowledge

"Fear" here does not mean being afraid of God like an enemy.

It means deep reverence and respect for who He is.

This single line sets the tone for the entire book.

Real wisdom starts with how a person relates to God.

A person can be brilliant and still be a fool here.

That happens the moment God is left out.

🙏 Fear means reverence, not terror

🎯 This line sets the whole book's tone

🧠 Intelligence alone does not equal wisdom

📖 Wisdom starts with God, not raw smarts

---

## 🚫 Fools Despise Wisdom And Instruction

In Proverbs, "fool" is not about low intelligence.

It describes someone who knows better and rejects it anyway.

A fool hears correction and pushes it away on purpose.

This is a moral choice, not a mental limit.

The book uses this word often, always in that same sense.

🚫 Fool means a moral choice, not low IQ

👂 A fool hears correction and rejects it

🔁 This word repeats throughout the book

📖 Foolishness is chosen, not born

# Proverbs 1:8-9
# 👨‍👩‍👦 Instruction From Father And Mother
---
## 👨‍👦 My Son

This phrase opens many sections throughout the book.

It reads like a father speaking directly to his own child.

Many scholars believe this also echoes royal court training.

An older official taught a younger one this same way.

The tone stays personal and warm, never distant or academic.

👨‍👦 My son opens many sections

❤️ The tone is personal, not academic

🏛️ It may echo royal court training

📖 Wisdom passed from teacher to student

---

## 👩 Forsake Not The Law Of Thy Mother

A modern reader might assume only the father's word carried weight here.

This verse names the mother's teaching with equal authority.

That was notable in a culture built around the father as head of the household.

"Forsake" means to abandon or walk away from something you were given.

The son is told not to walk away from either parent's teaching.

👩 Mother's teaching gets equal authority

🏠 Notable in a father led culture

🚶 Forsake means walking away from something

📖 Both parents' teaching matters equally

---

## 💍 An Ornament Of Grace Unto Thy Head, And Chains About Thy Neck

Gold chains and fine jewelry marked wealth and honor in the ancient world.

This verse compares parental instruction to the finest things a person could wear.

Think of a graduate proudly wearing an honor cord at graduation.

The cord itself is small, but everyone can see what it represents.

Obedience to wise instruction is pictured the same way, visible and valuable.

💍 Chains marked wealth and honor

🎓 Like an honor cord worn with pride

👀 Obedience becomes visible to others

📖 Wise instruction is treated as treasure

# Proverbs 1:10-14
# 🗡️ Sinners Entice
---
## 🎣 If Sinners Entice Thee

"Entice" means to lure someone toward something harmful by making it sound appealing.

The book's very first warning is not about idols or false teaching.

It is about peer pressure from violent friends.

That choice shows how practical this book intends to be.

Temptation here comes wrapped in the offer of belonging, not obvious evil.

🎣 Entice means luring toward harm

👥 The first warning is peer pressure

🗡️ It targets violent, criminal company

📖 Temptation often looks like belonging

---

## 🩸 Lay Wait For Blood

This phrase describes an ambush, not an accident.

"Blood" here means murder, planned in advance.

The gang openly invites the son into organized violence.

Nothing here is exaggerated or symbolic.

This is a literal invitation to become a criminal.

🩸 Blood here means planned murder

🕳️ Lay wait means setting an ambush

🚫 Nothing symbolic, this is literal

➡️ The invitation is real and violent

---

## 🤫 Lurk Privily For The Innocent Without Cause

"Privily" is an old word for secretly.

These men hide and wait for victims who did nothing to deserve it.

"Without cause" removes any excuse of revenge or fairness.

This is random, predatory violence for profit.

The text names the injustice plainly before Solomon ever comments on it.

🤫 Privily means secretly

😇 Innocent victims did nothing wrong

🎲 The violence is random, not justified

📖 The text names the injustice directly

---

## ⚰️ Swallow Them Up Alive As The Grave

This is deliberately dramatic language, not a literal claim.

"The grave" here translates a word for the realm of the dead.

The gang compares their greed to a grave that swallows people whole.

Think of an appetite so total that nothing is left over.

Their greed is pictured as something almost supernatural in its hunger.

⚰️ The grave pictures total consumption

🍽️ Their greed acts like an endless appetite

🎭 The language is dramatic on purpose

📖 Greed is pictured as bottomless hunger

---

## 🎲 Cast In Thy Lot Among Us

Casting lots was a common ancient way to divide up plunder equally.

The gang promises the son an equal share of whatever they steal.

"One purse" means all the stolen wealth gets pooled together.

This is the actual bait in the whole invitation.

Belonging and an equal cut are offered before any of the crime happens.

🎲 Casting lots divided ancient plunder

🤝 The gang offers an equal share

💰 One purse means pooled stolen wealth

📖 Belonging is the real bait offered

# Proverbs 1:15-19
# 🕸️ The Trap That Catches Its Makers
---
## 🛤️ Walk Not Thou In The Way With Them

"The way" is a common wisdom picture.

It means the whole direction of a life.

This is not advice about one bad afternoon.

It is advice about choosing a different path entirely.

Small choices about company add up over time.

Proverbs returns to this picture again and again.

🛤️ The way pictures a life's direction

🚫 Not about one bad afternoon

🧭 It is about choosing a different path

📖 Proverbs repeats this picture often

---

## 🕸️ In Vain The Net Is Spread In The Sight Of Any Bird

This line is itself a small proverb about traps.

Any bird that sees a net being set simply flies away.

Nets only work when they stay hidden from their target.

These men set an obvious trap and still expect people to walk into it.

Even a bird has more sense than that.

🕸️ A bird avoids a trap it can see

🙈 These men expect people to miss the obvious

🐦 Even birds are smarter than that

➡️ Wisdom means noticing obvious danger

---

## 🔄 They Lay Wait For Their Own Blood

This sounds confusing at first since these men were hunting others.

The irony is the point of this line.

The trap set for someone else ends up catching the ones who set it.

Violence tends to circle back on the people who start it.

Solomon states this as a pattern, not just a hopeful guess.

🔄 The trap catches its own makers

🎯 Violence circles back on its source

😲 The irony is the whole point

📖 This is a pattern, not a hope

---

## 💰 Greedy Of Gain, Which Taketh Away The Life Of The Owners Thereof

This line steps back from the story to name the lesson plainly.

Greed for quick gain destroyed the very people chasing it.

"The owners thereof" means the greedy people themselves, not their victims.

The whole warning ends on this one sharp reversal.

What looked like a shortcut to wealth becomes the road to ruin.

💰 Greed for gain destroyed the greedy

🔄 Owners thereof means the criminals themselves

🛣️ Their shortcut became their ruin

📖 The whole warning ends on this reversal

# Proverbs 1:20-23
# 📣 Wisdom Cries Out
---
## 👩 Wisdom Crieth Without

Starting here, wisdom is pictured as a woman calling out in public.

This is a literary device, not a claim about a literal person.

Proverbs returns to this personified wisdom many times in the chapters ahead.

"Without" simply means outside, out in the open streets.

Wisdom is not hiding in a temple or a private school.

👩 Wisdom is pictured as a woman here

🔁 This device repeats through later chapters

🌆 Without means out in the open

📖 Wisdom is public, not hidden

---

## 🏛️ The Chief Place Of Concourse, In The Openings Of The Gates

Ancient city gates were not just entrances.

They worked as court, marketplace, and town square together.

Business deals, trials, and public news all happened right there.

Wisdom chooses the busiest, most important spot in the city.

She is not whispering to a few people in a corner.

🏛️ Gates were court, market, and square

📢 Wisdom speaks where decisions get made

🚶 The busiest spot in the city

📖 She addresses everyone, not a few

---

## 🌱 How Long, Ye Simple Ones, Will Ye Love Simplicity

This verse names three different ways people reject wisdom.

The simple are inexperienced and still undecided.

The scorner mocks wisdom openly and enjoys it.

The fool has settled into rejecting wisdom as a way of life.

This chapter speaks to all three at once.

🌱 Simple means inexperienced, still undecided

😏 Scorner mocks wisdom and enjoys it

🧱 Fool has settled into rejecting it

📖 Wisdom speaks to all three types

---

## 🔄 Turn You At My Reproof

"Reproof" means correction meant to change direction, not just criticism to hurt.

Wisdom's appeal here is still an invitation, not yet a punishment.

"I will pour out my spirit" promises real understanding to anyone who listens.

The door is still wide open at this point in the chapter.

That will not stay true for long.

🔄 Reproof means correction, not just criticism

🚪 The invitation is still open here

💧 Pour out my spirit means real understanding

➡️ This open door will not last

# Proverbs 1:24-28
# 🌪️ The Door Closes
---
## 🤲 I Have Stretched Out My Hand, And No Man Regarded

A stretched out hand is a picture of a genuine offer.

Think of someone reaching out to help another person up.

"No man regarded" means the offer was flatly ignored.

This was not a one time invitation either.

Wisdom describes calling out again and again, only to be brushed aside every time.

🤲 A stretched hand means a real offer

🙅 No man regarded means it was ignored

🔁 The offer came again and again

📖 The offer was refused every time

---

## 😢 I Also Will Laugh At Your Calamity

This does not mean wisdom takes pleasure in someone's suffering.

The laughing pictures how obvious the coming trouble will look in hindsight.

Warnings that were ignored will look painfully clear once disaster arrives.

This is the language of cause and effect, not cruelty.

Wisdom already explained exactly what would happen.

😢 Not literal pleasure in suffering

🔍 The danger becomes obvious too late

⚖️ This is cause and effect, not cruelty

📖 Wisdom already warned them plainly

---

## 🌪️ Your Destruction Cometh As A Whirlwind

A whirlwind is a sudden, violent storm that gives almost no warning.

This image appears often in the Old Testament for swift disaster.

The point is speed, not just severity.

Trouble that looked far away can arrive all at once.

By the time it hits, there is no more time to prepare.

🌪️ A whirlwind strikes fast and hard

📖 A common Old Testament disaster image

⏱️ The point is speed, not just size

➡️ No time to prepare once it hits

---

## ⏳ They Shall Seek Me Early, But They Shall Not Find Me

This is the hardest line in the whole chapter.

It describes a moment when it becomes too late to change course.

Continual rejection of wisdom eventually closes a door that was once open.

This is not about God being unwilling to forgive.

It is about a pattern of ignoring wisdom finally catching up.

⏳ Describes a point of no return

🚪 A once open door finally closes

🔁 Continual rejection has real consequences

📖 The pattern catches up eventually

# Proverbs 1:29-33
# 🌾 Fruit Of Their Own Way
---
## 🌾 They Shall Eat Of The Fruit Of Their Own Way

This pictures consequences as a harvest.

Whatever a person plants with their choices eventually grows into their result.

Think of a farmer who only ever plants weeds.

No one is surprised when the harvest is weeds too.

Their own choices, not bad luck, produced this outcome.

🌾 Consequences are pictured as a harvest

🌱 A person reaps what they plant

🚜 A farmer of weeds gets weeds

📖 Their choices caused their own result

---

## 💰 The Prosperity Of Fools Shall Destroy Them

This line is easy to misread as only hardship destroying fools.

It actually says the opposite can be just as dangerous.

Comfort and ease can make a person stop listening to wisdom entirely.

A fool who never suffers may never feel a reason to change.

Ease itself becomes the trap in that case.

💰 Even comfort can be dangerous

😴 Ease can end the search for wisdom

🚫 No pain can mean no change

📖 Comfort itself becomes the trap

---

## 👂 Whoso Hearkeneth Unto Me Shall Dwell Safely

"Hearkeneth" means listening in a way that leads to obeying.

This verse is the other half of the chapter's choice.

Everything before this was warning.

This is the promise sitting right next to it.

The chapter does not end on fear.

It ends on the safety wisdom offers.

👂 Hearkeneth means listening that leads to obeying

⚖️ Warning and promise sit side by side

🛡️ Wisdom offers real safety, not just fear

📖 The chapter ends on hope, not dread
`.trim();

export const PROVERBS_ONE_PERSONAL_SECTIONS = parseProverbsOneRawNotes(PROVERBS_ONE_RAW_NOTES);
