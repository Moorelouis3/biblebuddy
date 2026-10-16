export type SecondThessaloniansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondThessaloniansThreeRawNotes(rawText: string): SecondThessaloniansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondThessaloniansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Thessalonians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Thessalonians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Thessalonians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Thessalonians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Thessalonians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Thessalonians 3:${startVerse}` : `2 Thessalonians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Thessalonians 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_THESSALONIANS_THREE_RAW_NOTES = `# 2 Thessalonians 3:1-2
# 🙏 Pray For Us
---
## 🙏 Finally, Brethren, Pray For Us

"Finally" does not mean this is a quick afterthought.

Paul uses the word to turn toward his last concerns in this letter.

He asks for prayer before giving any further instruction.

Prayer comes first, even for an apostle writing with full authority.

🙏 Finally signals the letter's last concerns
📝 Paul asks for prayer first
👑 Even an apostle depends on prayer
📖 Prayer comes before every instruction that follows

## 🏃 That The Word Of The Lord May Have Free Course, And Be Glorified

"Free course" means moving forward without being blocked or slowed down.

Paul pictures the gospel message as something that can run or get stuck.

He is not asking for his own comfort here.

He is asking that the message itself keep spreading.

🏃 Free course means moving without being blocked
📜 The gospel is pictured as something that runs
🙅 Not a prayer for Paul's comfort
📖 The request is for the message to spread

## ⚠️ Delivered From Unreasonable And Wicked Men

Unreasonable men are not simply difficult to deal with.

They act in ways that are hostile without real cause.

Paul faced this kind of organized opposition nearly everywhere he preached.

Naming a real danger plainly is not the same as fear.

⚠️ Unreasonable means hostile without real cause
🗺️ Paul faced this almost everywhere he preached
😨 Naming danger plainly is not fear
📖 Opposition was a real ongoing threat

## 🙅 For All Men Have Not Faith

Not everyone who hears the gospel will choose to believe it.

Paul states this as a plain fact, not a complaint.

Rejection by some was expected.

It did not mean Paul had failed.

🙅 Not everyone who hears will believe
📊 Paul states this as plain fact
🚫 Not a complaint about his ministry
📖 Rejection did not mean Paul had failed

# 2 Thessalonians 3:3-5
# 🙌 The Lord Is Faithful
---
## 🙌 But The Lord Is Faithful

"Faithful" means God keeps every promise, without exception.

Paul shifts here from human unfaithfulness to God's faithfulness.

This word answers directly the threat named in the verse before.

Men may reject the truth, but God does not change.

🙌 Faithful means God keeps every promise
🔄 Answers the threat named just before
🧱 God does not change like people do
📖 Human unfaithfulness never shakes God's faithfulness

## 🛡️ Who Shall Stablish You, And Keep You From Evil

"Stablish" is an old form of the word establish.

It means God will make them firm and steady.

"Keep" here means to guard or protect over time.

Both promises answer real fears this young church was facing.

🛡️ Stablish is an old form of establish
🧍 It means being made firm and steady
🔒 Keep means to guard over time
📖 Both promises answer this church's real fears

## 🤝 We Have Confidence In The Lord Touching You

"Touching you" is an old way of saying concerning you.

Paul is not confident in their own strength.

His confidence rests fully in what the Lord will do in them.

This small phrase quietly shifts the credit away from human effort.

🤝 Touching you means concerning you
🙅 Not confidence in their own strength
🙏 Confidence rests in what the Lord will do
📖 Credit shifts away from human effort

## ✅ That Ye Both Do And Will Do The Things Which We Command You

Paul expects obedience now and obedience that continues later.

"Do" covers their present actions.

"Will do" covers what is still ahead of them.

This is confidence, not merely a hope.

✅ Do covers present obedience
⏳ Will do covers future obedience
🙌 Paul expects, not just hopes
📖 Confidence, not just a wish

## ❤️ The Lord Direct Your Hearts Into The Love Of God

"Direct" means to guide or steer toward a destination.

Paul prays that God himself would guide their hearts.

The destination named here is love for God himself.

This is not something they could manufacture in their own effort.

❤️ Direct means to guide toward a destination
🧭 God himself does the guiding
🎯 The destination is love for God
📖 Not something they could manufacture alone

## ⏳ And Into The Patient Waiting For Christ

"Patient waiting" names a settled endurance, not restless watching.

Paul pairs love for God with hope for Christ's return.

Both come from the same source, God's own direction of the heart.

A healthy wait for Christ grows out of love, not fear.

⏳ Patient waiting means settled endurance
🤝 Paired here with love for God
🧭 Both flow from God's direction
📖 Healthy waiting grows from love, not fear

# 2 Thessalonians 3:6-10
# 🛑 Withdraw From The Disorderly
---
## 📯 In The Name Of Our Lord Jesus Christ

Paul commands this church using Christ's own authority, not his own.

This phrase appears often in his letters to mark serious instruction.

It signals that what follows is not merely Paul's personal opinion.

The weight behind the command comes from Christ himself.

📯 Paul commands using Christ's authority
📜 A phrase marking serious instruction
🙅 Not Paul's personal opinion
📖 The weight comes from Christ himself

## 🚶 That Ye Withdraw Yourselves From Every Brother That Walketh Disorderly

"Withdraw" means to pull back from close fellowship, not to attack.

"Disorderly" describes a lifestyle, not a single mistake.

Paul is addressing a pattern of behavior already known to this church.

This separation is meant to correct, not to punish.

🚶 Withdraw means pulling back, not attacking
🔁 Disorderly describes a pattern, not one mistake
👥 Addressed to a known situation in this church
📖 Meant to correct, not to punish

## 📜 Not After The Tradition Which He Received Of Us

"Tradition" here means the teaching Paul had personally handed down.

It does not mean manmade custom invented later.

Paul had already taught this church how believers should live and work.

Some members were simply ignoring what they had already been told.

📜 Tradition means teaching Paul handed down
🙅 Not manmade custom invented later
🗣️ Already taught to this church before
📖 Some were ignoring known instruction

## 💼 We Behaved Not Ourselves Disorderly Among You

Paul points back to his own time living among this church.

He never modeled the lazy behavior he is now correcting.

This gives him real standing to confront it directly.

A command carries more weight when the one giving it lived it first.

💼 Paul points to his own example
🚫 He never modeled this behavior
💪 This gives him standing to correct it
📖 A lived example carries more weight

## 🍞 Neither Did We Eat Any Man's Bread For Nought

"For nought" means without paying for it or earning it.

Paul refused to be fed by others without contributing anything himself.

This was a deliberate choice, not a lack of options.

He wanted his conduct to match the standard he was about to set.

🍞 For nought means without earning it
🙅 Paul refused to be fed for free
🎯 A deliberate choice, not necessity
📖 His conduct matched the standard he set

## 🔨 But Wrought With Labour And Travail Night And Day

"Wrought" is an old form of the word worked.

"Travail" adds the sense of real hardship, not light effort.

Paul worked long hours so he would not burden this church financially.

An apostle still did ordinary labor to support himself.

🔨 Wrought is an old form of worked
😓 Travail means real hardship, not light effort
💰 Done so he would not burden the church
📖 Even an apostle did ordinary labor

## 🎯 Not Because We Have Not Power

Paul clarifies he had every right to ask this church for support.

Other apostles regularly received support from the churches they served.

He is not claiming poverty forced his hand.

His choice to work was deliberate, not required.

🎯 Paul had every right to ask for support
🤝 Other apostles received support elsewhere
🙅 Not forced into this by poverty
📖 A deliberate choice, not a requirement

## 🪞 To Make Ourselves An Ensample Unto You To Follow Us

"Ensample" is an old spelling of the word example.

Paul deliberately gave up a right so he could model something.

He wanted this church to imitate his habits, not just hear his words.

Teaching by example carries further than teaching by instruction alone.

🪞 Ensample is an old spelling of example
🙌 Paul gave up a right on purpose
👀 He wanted to be imitated, not just heard
📖 Example teaches further than instruction alone

## ⚖️ If Any Would Not Work, Neither Should He Eat

This was not a new rule invented on the spot.

Paul says he already commanded this in person, before this letter.

The statement is blunt on purpose, with no exceptions offered.

Able bodied refusal to work, not inability, is the target here.

⚖️ Not a new rule, taught in person before
🗣️ Stated bluntly, with no exceptions offered
🙅 Refusal to work, not inability, is the target
📖 A command repeated because it still applied

# 2 Thessalonians 3:11-13
# 👂 Busybodies Not Workers
---
## 👂 We Hear That There Are Some Which Walk Among You Disorderly

Paul is responding to a specific report he received.

This is not a vague rumor reaching him secondhand.

Someone in this church was clearly misbehaving in a known way.

Paul addresses it directly instead of letting it slide.

👂 Paul responds to a specific report
🙅 Not a vague or secondhand rumor
👤 Someone was misbehaving in a known way
📖 Paul addresses it directly, not letting it slide

## 💤 Working Not At All, But Are Busybodies

"Busybodies" describes people meddling in others' affairs.

The word pictures someone constantly interfering, not simply idle.

Idleness and meddling often grow together in the same person.

Paul names both problems instead of only one.

💤 Busybodies means meddling in others' affairs
🔁 Pictures someone constantly interfering, not just idle
🌱 Idleness and meddling often grow together
📖 Paul names both problems at once

## 📯 We Command And Exhort By Our Lord Jesus Christ

Paul uses two different words here on purpose.

"Command" carries real authority.

"Exhort" carries encouragement and personal appeal.

Correction here still comes wrapped in genuine care.

📯 Two different words used on purpose
👑 Command carries real authority
🤲 Exhort carries encouragement and appeal
📖 Correction still comes wrapped in care

## 🤫 That With Quietness They Work, And Eat Their Own Bread

"Quietness" here means a calm and settled way of living.

The opposite of being a busybody is simply steady, honest work.

Eating their own bread means supporting themselves instead of depending on others.

The cure for meddling is ordinary responsibility.

🤫 Quietness means a settled unintrusive life
⚖️ The opposite of meddling is steady work
🍞 Eat their own bread means self support
📖 The cure for meddling is responsibility

## 💪 Be Not Weary In Well Doing

"Weary" means growing tired or discouraged over time.

Paul shifts his attention to the rest of the church here.

Dealing with a few lazy members can tempt faithful people to give up too.

Paul will not let frustration with a few excuse giving up on doing good.

💪 Weary means growing tired over time
😤 A few lazy members can discourage everyone
🙌 Addressed to the faithful majority here
📖 Frustration with others never excuses giving up

# 2 Thessalonians 3:14-15
# ✍️ Note That Man
---
## ✍️ If Any Man Obey Not Our Word By This Epistle

Paul anticipates that someone might simply ignore this letter.

"This epistle" means the very letter being read right now.

He builds in a response ahead of time.

He does not simply hope it works out.

Clear instruction still needs a plan for when it gets ignored.

✍️ Paul expects this letter might be ignored
📜 This epistle means the letter being read now
🗺️ A plan built in ahead of time
📖 Instruction needs a plan for being ignored

## 🚫 Note That Man, And Have No Company With Him

"Note" means to mark or identify someone publicly within the church.

This is a visible, known response, not a quiet grudge.

"Have no company with him" means limiting ordinary social closeness.

It is not a complete excommunication from the church itself.

🚫 Note means marking someone publicly
👀 A visible response, not a quiet grudge
🙅 Limits ordinary social closeness
📖 Not a full removal from the church

## 😳 That He May Be Ashamed

The goal named here is shame, not permanent punishment.

"Ashamed" means feeling the weight of his own wrong choice.

Paul hopes distance will produce reflection, not simply pain.

The purpose behind this discipline is restoration, not revenge.

😳 The goal is shame, not punishment
🪞 Ashamed means feeling the weight of wrong
🔁 Distance aims at reflection, not pain
📖 The purpose is restoration, not revenge

## 🤝 Yet Count Him Not As An Enemy, But Admonish Him As A Brother

Paul immediately limits how far this discipline should go.

"Enemy" and "brother" describe two completely different postures toward someone.

"Admonish" means to warn someone firmly out of real concern.

Discipline here stays inside family love, not outside it.

🤝 Limits how far discipline should go
⚖️ Enemy and brother are opposite postures
⚠️ Admonish means a firm warning from concern
📖 Discipline stays inside family love

# 2 Thessalonians 3:16-18
# 🕊️ Peace And Paul's Own Hand
---
## 🕊️ The Lord Of Peace Himself Give You Peace Always By All Means

Paul calls God directly "the Lord of peace" here.

"Always by all means" rules out any exception to this blessing.

This peace does not depend on circumstances staying calm.

It is meant to reach a church still facing real conflict within it.

🕊️ Lord of peace is a name for God
♾️ Always by all means rules out exceptions
🌊 Peace does not depend on calm circumstances
📖 Meant to reach a church still in conflict

## 🤲 The Lord Be With You All

"With you all" includes even the disorderly members just discussed.

This simple blessing closes out the concerns Paul has raised.

Correction and blessing are not opposites in this letter.

Paul disciplines and blesses the same people in the same breath.

🤲 Closes the concerns Paul has raised
👥 With you all includes the disorderly too
🤝 Correction and blessing are not opposites
📖 Paul disciplines and blesses in the same breath

## ✋ The Salutation Of Paul With Mine Own Hand

Most of this letter was likely dictated to a secretary.

Paul takes the pen himself for this final line.

A personal signature was how he proved a letter truly came from him.

This small detail answers the fear raised earlier about forged letters.

✋ Most of the letter was likely dictated
✍️ Paul personally writes this closing line
🖊️ A signature proved the letter was genuine
📖 This answers the earlier fear of forged letters

## 🔏 Which Is The Token In Every Epistle

"Token" means a sign used to prove something is genuine.

Paul used this same handwriting mark in his other letters too.

It let churches verify they were reading real apostolic teaching.

A simple signature guarded against real confusion in the early church.

🔏 Token means a proof of genuineness
🖋️ The same mark used in his other letters
✅ Let churches verify real apostolic teaching
📖 A signature guarded against real confusion

## 🙏 The Grace Of Our Lord Jesus Christ Be With You All. Amen

Paul ends almost every letter with this same blessing of grace.

"Grace" means God's favor given freely, not earned by good behavior.

"Amen" means so be it, a firm agreement with what was just said.

The letter that opened with grace closes the same way.

🙏 Grace closes nearly every letter Paul wrote
🎁 Grace means favor that is not earned
✅ Amen means firm agreement with what was said
📖 The letter opens and closes on grace
`.trim();

export const SECOND_THESSALONIANS_THREE_PERSONAL_SECTIONS = parseSecondThessaloniansThreeRawNotes(
  SECOND_THESSALONIANS_THREE_RAW_NOTES
);
