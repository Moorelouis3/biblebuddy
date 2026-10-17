export type SecondTimothyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondTimothyThreeRawNotes(rawText: string): SecondTimothyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondTimothyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Timothy\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Timothy 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Timothy\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Timothy\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Timothy 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Timothy 3:${startVerse}` : `2 Timothy 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Timothy 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_TIMOTHY_THREE_RAW_NOTES = `# 2 Timothy 3:1-5
# ⏳ Perilous Times Shall Come
---
## ⏳ In The Last Days Perilous Times Shall Come

"Perilous" means dangerous, not just difficult or uncomfortable.

Paul is not predicting one single violent event on a calendar.

He means a long stretch of time marked by real spiritual danger.

That danger comes from the character of the people living through it.

Timothy needed to recognize the danger before he could ever resist it.

⏳ Last days means a long stretch of time

⚠️ Perilous means truly dangerous

👥 The danger comes from people's character

📖 Recognizing danger comes before resisting it

## 💛 Lovers Of Their Own Selves, Covetous

These two words open an eighteen word list describing people in the last days.

"Lovers of their own selves" means loving yourself so much it crowds out everyone else.

"Covetous" means a restless craving for more money or more things.

It is never satisfied, no matter how much it already has.

Paul starts this whole list with the self on purpose.

💛 Lovers of self means extreme self focus

💰 Covetous means always wanting more

🎯 Both vices center on the self

📖 The list begins with self love

## 🗣️ Boasters, Proud, Blasphemers

"Boasters" means loudly claiming credit for things that are not really true.

"Proud" here means looking down on other people as beneath you.

"Blasphemers" means speaking against God without any reverence at all.

Each word moves the same root problem one step further outward.

Pride starts inside a person and ends up attacking God himself.

🗣️ Boasters means false bragging

👑 Proud means looking down on others

⚡ Blasphemers means disrespecting God directly

📖 Pride grows until it reaches God

## 👪 Disobedient To Parents, Unthankful, Unholy

Honoring parents was one of the oldest commands in scripture, going back to the ten commandments.

"Disobedient to parents" describes people who openly reject that command.

"Unthankful" means never recognizing a gift or kindness from anyone.

"Unholy" means living with no regard for anything set apart as sacred.

These three failures move from family, to gratitude, to God.

👪 Disobedient to parents breaks an old command

🙅 Unthankful means never recognizing a gift

🕯️ Unholy means no regard for the sacred

📖 Family failure spreads outward toward faith

## ❄️ Without Natural Affection, Trucebreakers, False Accusers

"Without natural affection" describes coldness even toward one's own family.

That coldness is the opposite of normal, expected love.

"Trucebreakers" means breaking a promise without any hesitation.

"False accusers" means slandering someone on purpose, knowing it is not true.

Each of these three vices destroys a different kind of trust.

❄️ Without natural affection means coldness toward family

🤝 Trucebreakers means breaking promises easily

🗣️ False accusers means slander on purpose

📖 Trust breaks down in every direction

## 🚫 Incontinent, Fierce, Despisers Of Those That Are Good

"Incontinent" here does not describe a physical condition.

It means a total lack of control over one's own desires.

"Fierce" means harsh and untamed, acting without any gentleness.

"Despisers of those that are good" means actively hating people who do right.

A gentle, self controlled person becomes a target instead of an example.

🚫 Incontinent means no self control

🐺 Fierce means harsh and untamed

😠 Despisers hate people who do good

📖 Goodness becomes a target, not a model

## 🗡️ Traitors, Heady, Highminded

"Traitors" means betraying people who trusted you completely.

"Heady" means reckless, acting on impulse without thinking it through.

"Highminded" means so full of pride that reality stops registering clearly.

Reckless pride blinds a person to the damage their betrayal actually causes.

🗡️ Traitors means betraying real trust

💨 Heady means reckless and impulsive

🎈 Highminded means blinded by pride

📖 Pride hides the damage betrayal causes

## 👑 Lovers Of Pleasures More Than Lovers Of God

This is not a simple ban on enjoying anything pleasant.

The problem is the comparison Paul draws here.

Pleasure gets placed above God in actual daily priority.

A person can enjoy good things and still love God the most.

This phrase describes someone who quietly let pleasure take God's place instead.

🎭 Not a ban on enjoying good things

⚖️ The problem is wrong priority

👑 Pleasure had replaced God's place

📖 What a person loves most reveals the heart

## 🎭 Having A Form Of Godliness, But Denying The Power Thereof

"Form" means the outward shape of something, without the substance behind it.

These people still looked religious, still used the right words and habits.

"Denying the power thereof" means refusing to let any of it actually change how they lived.

Real godliness changes behavior, not just appearance.

A costume is not the same thing as a real transformation.

🎭 Form means outward appearance only

🚫 They denied any real inward power

🔄 Real godliness changes actual behavior

📖 A costume is not transformation

## 🙅 From Such Turn Away

This does not mean cutting off every relationship with a difficult person.

Paul tells Timothy elsewhere to correct people gently and patiently.

"Turn away" here means refusing to be shaped by this pattern of life.

Timothy could still love these people without copying them.

🙅 Not a command to abandon people

🤲 Gentle correction was still expected elsewhere

🚶 Turn away means refuse their influence

📖 Love someone without copying their pattern

# 2 Timothy 3:6-9
# 🚪 Creep Into Houses
---
## 🐍 Creep Into Houses

"Creep" pictures sneaking in quietly, not arriving boldly or openly.

These false teachers did not argue their case out in public.

They targeted private homes instead, one household at a time.

A quiet approach let them avoid open questions and open opposition.

🐍 Creep means sneaking in quietly

🏠 Houses means private homes, not public debate

🙈 A quiet approach avoided real scrutiny

📖 False teaching often avoids the open light

## 🎯 Lead Captive Silly Women Laden With Sins

This verse names a specific group these teachers targeted, not women in general.

"Silly" here is an old word for someone easily persuaded, not foolish in the modern sense.

"Laden with sins" means already weighed down by guilt.

That mix of guilt and a hunger for answers made this group an easier target.

🎯 This names a specific targeted group

🗣️ Silly here means easily persuaded

⚖️ Laden with sins means weighed down by guilt

📖 Guilt and searching made them a target

## 🔀 Led Away With Divers Lusts

"Divers" is an old spelling of diverse, meaning many different kinds.

This was not one single temptation but a whole mix of desires pulling at once.

Being pulled in several directions made solid footing even harder to find.

Confusion, not just desire alone, kept these people stuck.

🔀 Divers means many different kinds

🎯 Multiple desires pulled at once

😕 Confusion kept them stuck in place

📖 Being pulled many ways prevents footing

## 📚 Ever Learning, And Never Able To Come To The Knowledge Of The Truth

These people kept attending every new teaching that came along.

Yet none of it ever actually landed as settled, confident truth.

Constant learning without real conviction is its own kind of trap.

Activity can look like growth while nothing underneath actually changes.

📚 Ever learning means constant new teaching

❓ Never arriving at settled truth

🔄 Busy activity is not real growth

📖 Motion is not the same as progress

## 📜 Jannes And Jambres Withstood Moses

Jannes and Jambres are not named anywhere in the book of Exodus.

Jewish tradition outside the Bible identifies them as two magicians in Pharaoh's court.

Those magicians copied some of Moses's miracles for a while before failing completely.

Paul expects Timothy to already know that old story.

📜 Jannes and Jambres are not in Exodus

🧙 Tradition names them Pharaoh's magicians

❌ They copied Moses before failing

📖 Old stories still carry real warning

## 🧠 Men Of Corrupt Minds, Reprobate Concerning The Faith

"Corrupt minds" means a way of thinking that has gone rotten from the inside.

"Reprobate" means failing a test, rejected as unfit after being examined.

These teachers did not just believe wrong things by accident.

Something deeper in how they thought had already broken down.

🧠 Corrupt minds means rotten thinking

❌ Reprobate means failed and rejected

🔍 This goes deeper than one wrong belief

📖 Broken thinking produces broken teaching

## 🛑 They Shall Proceed No Further

Paul promises these false teachers a real limit, not unlimited success.

Their influence might spread for a while, but it will not spread forever.

God sets a ceiling on how far deception can actually travel.

🛑 Paul promises a real limit here

📈 Their influence can spread for a time

🚧 A ceiling still exists above it

📖 Deception never travels without limit

## 🎭 Their Folly Shall Be Manifest Unto All Men, As Theirs Also Was

"Folly" means foolishness that looks clever only until it gets tested.

"Manifest" means it will eventually become plain and obvious to everyone watching.

"As theirs also was" points back to Jannes and Jambres, exposed the same way centuries earlier.

False teaching has a short shelf life, even when it looks convincing at first.

🎭 Folly means foolishness disguised as wisdom

👀 Manifest means eventually exposed to all

🔁 Jannes and Jambres were exposed the same way

📖 Deception has a short shelf life

# 2 Timothy 3:10-13
# 🛡️ Persecutions Which I Endured
---
## 📖 My Doctrine, Manner Of Life, Purpose

Paul lists three things Timothy had personally watched over the years.

"Doctrine" means what Paul actually taught and believed.

"Manner of life" means how Paul actually lived day to day, not just what he said.

"Purpose" means the clear direction Paul had set his whole life toward.

Timothy had a living example, not just a stack of letters.

📖 Doctrine means what Paul taught

🚶 Manner of life means daily conduct

🎯 Purpose means Paul's set direction

➡️ Timothy watched it all firsthand

## 🙏 Faith, Longsuffering, Charity, Patience

This second group of four words names Paul's inner character under pressure.

"Longsuffering" means enduring a hard situation for a long time without giving up.

"Charity" means selfless love acted out toward other people, not just felt.

"Patience" here means steady endurance through difficulty.

Together these four describe a man who stayed the same person through hardship.

🙏 Faith means steady trust in God

⏳ Longsuffering means enduring hardship a long time

❤️ Charity means love acted out

➡️ Patience means steady endurance under pressure

## 🗺️ Persecutions, Afflictions, Which Came Unto Me At Antioch, At Iconium, At Lystra

These three cities sit along the route of Paul's first missionary journey.

Acts thirteen and fourteen record what actually happened in each one.

Paul was nearly killed by a mob in every single place named here.

Timothy likely grew up in or near this same region.

He may well have witnessed some of it himself.

🗺️ Three real cities from Paul's travels

📖 Acts thirteen and fourteen record this

😨 Paul faced real danger in each one

➡️ Timothy may have witnessed it firsthand

## 🗣️ What Persecutions I Endured

Paul does not minimize what actually happened to him in those cities.

He names it plainly instead of brushing past it quickly.

Being honest about real suffering is not the same thing as complaining.

🗣️ Paul names the suffering plainly

🚫 He does not minimize what happened

⚖️ Honesty about pain is not complaining

📖 Real suffering deserves an honest account

## 🙌 Out Of Them All The Lord Delivered Me

"All" covers every single one of those dangerous moments, not just some of them.

Paul is not claiming he avoided suffering entirely.

He is claiming God brought him through every time it happened.

Deliverance here means survival with purpose, not a life free of danger.

🙌 All means every dangerous moment

🚫 Not a promise of avoiding danger

🛡️ God brought him through each time

📖 Deliverance means survival with purpose

## 📏 All That Will Live Godly In Christ Jesus Shall Suffer Persecution

Paul states this as a flat, settled fact, not a possibility.

A godly life in a hostile world will draw real opposition sooner or later.

This was never meant to discourage Timothy from pursuing that life anyway.

It was meant to prepare him so the opposition would not catch him by surprise.

📏 Stated as settled fact, not a maybe

⚔️ Godly living draws real opposition

🛡️ This prepares Timothy, rather than discouraging him

📖 Surprise makes suffering harder to bear

## 📉 Evil Men And Seducers Shall Wax Worse And Worse

"Seducers" here means people who lead others astray through false teaching.

"Wax worse and worse" means getting progressively worse over time, like a slow downward slide.

Paul is warning Timothy not to expect this problem to fix itself.

🗣️ Seducers means false teachers leading others astray

📉 Wax worse means a slow downward slide

🚫 This problem will not fix itself

📖 Timothy needed to expect decline, not relief

## 🎭 Deceiving, And Being Deceived

These false teachers were not cold, calculating liars in every case.

Many of them had come to believe their own false teaching by this point.

Deceiving others and being deceived had become the same ongoing cycle.

A deceiver can lose track of where the lie started and the belief began.

🎭 Not every false teacher lies coldly

🔄 Deceiving and being deceived form one cycle

😵 Many believed their own false teaching

📖 A lie can swallow the liar too

# 2 Timothy 3:14-17
# 📖 All Scripture Is Given By Inspiration Of God
---
## 🚶 Continue Thou In The Things Which Thou Hast Learned

"Continue" means staying the course, not starting something brand new.

Timothy did not need new teaching at this point in his life.

He needed to keep standing firm on what he had already received.

Faithfulness often looks like steady repetition, not constant novelty.

🚶 Continue means staying the course

🆕 Timothy did not need new teaching

🪨 He needed to stand firm on the old

📖 Faithfulness often means steady repetition

## 👥 Knowing Of Whom Thou Hast Learned Them

Paul points Timothy back to the actual people who taught him.

That list almost certainly includes Paul himself, along with Timothy's mother and grandmother.

Knowing the source gave Timothy real confidence in what he had been taught.

Trusted teachers make a teaching easier to trust.

👥 Points back to real, known teachers

👵 Likely includes his mother and grandmother

🤝 Known sources build real confidence

📖 Trusted teachers make teaching trustworthy

## 👵 From A Child Thou Hast Known The Holy Scriptures

Paul already named Timothy's grandmother Lois and mother Eunice earlier in this same letter.

That earlier verse explained where this childhood training in scripture actually came from.

Timothy's foundation in scripture started at home, long before Paul ever met him.

👵 Lois and Eunice already named earlier

🏠 Scripture training began at home

📆 This started long before Paul arrived

📖 Early teaching built a lasting foundation

## 🙏 Able To Make Thee Wise Unto Salvation Through Faith

Scripture by itself does not automatically save anyone who reads it.

"Through faith which is in Christ Jesus" names the one thing that actually makes it effective for salvation.

The scriptures point toward Christ, and faith in him is what that pointing is for.

📖 Scripture alone does not automatically save

🙏 Faith in Christ makes it effective

🎯 Scripture points toward Christ himself

➡️ Reading and believing serve one goal

## 💨 All Scripture Is Given By Inspiration Of God

"Inspiration" here means God breathed, a word Paul coins specifically for this verse.

Scripture is not simply wise human writing about God.

God himself stands behind every word of it as its true source.

This is one of the clearest statements in the whole Bible about where scripture actually comes from.

💨 Inspiration means God breathed

✍️ Not merely wise human writing

🙌 God stands behind every word

📖 A clear statement of scripture's true source

## 📝 Profitable For Doctrine, For Reproof, For Correction, For Instruction In Righteousness

Paul lists four distinct jobs scripture does for the reader.

"Doctrine" teaches what is true.

"Reproof" shows what is wrong.

"Correction" shows how to fix what is wrong.

"Instruction in righteousness" trains the habit of living it out.

Those four jobs move in order, truth first, then fault, then repair, then practice.

📘 Doctrine teaches what is true

⚠️ Reproof points out what is wrong

🔧 Correction shows how to fix it

📖 Truth moves toward practice in this order

## 🧩 That The Man Of God May Be Perfect

"Perfect" here does not mean flawless or never making a mistake.

It means complete, fully grown into what someone is meant to become.

Scripture is the tool God uses to grow a person toward that completeness.

This is a process across a whole life, not a single achievement.

🧩 Perfect here means complete, not flawless

🌱 It describes full spiritual growth

📖 Scripture is the tool for that growth

➡️ This happens across a whole life

## 🧰 Throughly Furnished Unto All Good Works

"Throughly" is an old spelling of thoroughly, meaning completely equipped with nothing missing.

"Furnished" pictures a house stocked with everything actually needed to function well.

Scripture does not just inform the man of God, it equips him to act.

The whole chapter ends on that same practical note, truth that leads straight into action.

🧰 Throughly means completely equipped

🏠 Furnished pictures a fully stocked house

🙌 Scripture equips action, not just knowledge

📖 Truth here ends in good works
`.trim();

export const SECOND_TIMOTHY_THREE_PERSONAL_SECTIONS = parseSecondTimothyThreeRawNotes(SECOND_TIMOTHY_THREE_RAW_NOTES);
