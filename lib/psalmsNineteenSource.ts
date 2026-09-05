export type PsalmsNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNineteenRawNotes(rawText: string): PsalmsNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 19:${startVerse}` : `Psalms 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 19 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETEEN_RAW_NOTES = `# Psalms 19:1-3
# 🌌 Creation's Silent Sermon
---
## 📢 The Heavens Declare The Glory Of God

To declare means far more than just existing quietly.

It means announcing something out loud on purpose, the way a herald might shout news in a city square.

David says the sky itself acts like that herald.

Every sunrise and every set of stars becomes a public announcement about God.

Nobody has to point a telescope at anything to hear this message.

📢 Declare means announce out loud
🌌 The heavens act like a herald
🌅 Every sunrise repeats the announcement
📖 God's glory is always on display

## 🌤️ The Firmament Sheweth His Handywork

"Firmament" is an old word for the sky stretched out overhead.

Ancient readers pictured it almost like a huge dome holding everything in place above the earth.

"Handywork" means something a craftsman actually shaped with his own hands.

David is not describing empty space.

He is describing a finished piece of work, made on purpose by someone skilled.

🌤️ Firmament means the sky overhead
🏛️ Ancient readers pictured it as a dome
🔨 Handywork means something crafted by hand
📖 The sky is a finished work of art

## 💧 Day Unto Day Uttereth Speech

Uttereth means to pour out words, the way water pours from a full cup.

Each day is pictured passing its message on to the next day, like a relay.

This is a common pattern in Hebrew poetry called parallelism.

One line restates an idea a second way right after the first.

Verse two repeats the same idea using night instead of day.

The whole sky keeps preaching the same sermon in an endless loop.

💧 Uttereth means words pouring out
🔁 Each day passes the message onward
📜 This is Hebrew poetic parallelism
📖 Creation preaches the same sermon endlessly

## 👁️ Night Unto Night Sheweth Knowledge

"Sheweth" is an old way of saying reveals or makes visible.

Daytime shows God's glory through the sun's light.

Nighttime shows the same glory through countless stars scattered across the sky.

Together day and night cover every single hour with the same testimony.

Nobody on earth ever experiences total silence from this message.

👁️ Sheweth means reveals or shows
☀️ Day reveals glory through sunlight
🌠 Night reveals glory through stars
📖 Every hour carries the same testimony

## 🗣️ There Is No Speech Nor Language, Where Their Voice Is Not Heard

This does not mean the heavens use actual human words.

David has just described sunlight and stars as speech and voice.

Now he explains that this "voice" needs no translator.

Every culture, in every language on earth, still receives the same silent message from the sky.

Nobody has ever been born too far away or spoken the wrong language to miss it.

🙅 Not literal human words being spoken
🌍 Every culture receives the same message
🗣️ No translator is ever needed
📖 Creation's testimony excludes no one

# Psalms 19:4-6
# ☀️ The Sun's Daily Race
---
## 🔗 Their Line Is Gone Out Through All The Earth

The word their points back to the heavens and the days and nights already described.

A "line" in this culture usually meant a measuring cord used to mark out land.

Think of a surveyor marking a property boundary today.

David pictures God's message being staked out across the entire earth like a claim nobody can dispute.

No border and no distance stops this message from reaching somewhere.

🔗 Their refers to the heavens and days
📏 Line means a measuring cord
🗺️ The message claims the whole earth
📖 No border stops this message

## ⛺ In Them Hath He Set A Tabernacle For The Sun

"Tabernacle" here means a tent, a temporary dwelling place.

David pictures the sky as a home built just for the sun.

Israel already knew the word tabernacle well from their own portable tent of worship.

Using that same word here pictures the sun resting in its own dwelling before rising again each morning.

⛺ Tabernacle means a tent dwelling
🏠 The sky is pictured as the sun's home
🌅 The sun rests before it rises again
📖 Israel knew this word from daily worship

## 🤵 As A Bridegroom Coming Out Of His Chamber

A bridegroom in this culture did not sneak quietly out of his wedding chamber.

He walked out dressed in his finest clothes, glowing with joy in front of the whole community.

David compares the sunrise to that exact moment.

Every single morning, the sun bursts out with the same fresh joy and confidence.

🤵 Bridegroom means a groom at his wedding
✨ He emerged dressed in his finest
😊 Sunrise is compared to that joy
📖 Every morning repeats that fresh joy

## 🏃 Rejoiceth As A Strong Man To Run A Race

A strong man preparing to run a race does not drag his feet.

He is eager, confident, and ready to use every bit of his strength.

David pictures the sun the same way, racing across the sky with total confidence every single day.

Nothing about the sun's daily path looks tired or reluctant.

🏃 A strong man runs eager and ready
💪 He uses his full strength gladly
☀️ The sun is pictured the same way
📖 Creation obeys God with joy, not reluctance

## 🔄 His Circuit Unto The Ends Of It

"Circuit" means the whole path something travels before it comes back to where it started.

David describes the sun's daily route from one end of the sky to the other.

Verse six adds one more detail, "there is nothing hid from the heat thereof."

No shadow and no hiding place escapes the sun's reach.

🔄 Circuit means the whole travel route
🌅 The sun crosses from end to end
🔥 Nothing escapes the sun's heat
📖 God's reach covers the whole earth

# Psalms 19:7-8
# 📜 The Perfect Law Of The LORD
---
## 🔄 The Law Of The LORD Is Perfect, Converting The Soul

The Hebrew word behind "law" here is torah, which means instruction or teaching, not just a list of rules.

"Converting" in this old English sense means restoring or turning something back to where it should be.

David is saying God's teaching brings a tired or wandering soul back to life.

The psalm has just spent six verses on the sky.

Now it turns to something even more valuable, the words God actually speaks.

🔄 Converting means restoring or turning back
📜 Law means instruction, not just rules
💧 God's teaching refreshes a tired soul
➡️ Words from God outrank the sky above

## 📜 The Testimony Of The LORD Is Sure, Making Wise The Simple

"Testimony" here means a solemn statement someone can fully rely on, similar to reliable evidence given under oath.

"Sure" means it never fails and never changes.

"Simple" in this verse does not mean foolish.

It means someone untrained or inexperienced, still learning how the world works.

David says God's word can make even that person genuinely wise.

📜 Testimony means a trustworthy witness statement
🔒 Sure means fully reliable, never changing
🌱 Simple means untrained, not foolish
📖 God's word makes the untrained wise

## 📋 The Statutes Of The LORD Are Right, Rejoicing The Heart

"Statutes" means specific rules or decrees, more detailed than the broader word law used in verse seven.

David keeps switching to a new word for God's word in almost every line.

That is on purpose, not repetition.

Each word highlights a different quality, instruction, evidence, decree, command.

Here the decrees are called "right," meaning they line up exactly the way they should.

Following them brings real joy, not just obligation.

📋 Statutes means specific rules or decrees
🔀 Each line uses a new word on purpose
😊 Right decrees bring real joy
📖 God's decrees line up exactly correct

## 💡 The Commandment Of The LORD Is Pure, Enlightening The Eyes

"Pure" means completely unmixed, with nothing false blended in.

A commandment described this way can be trusted without any doubt mixed into it.

"Enlightening the eyes" is a picture of light suddenly showing someone something they could not see before.

God's command does not confuse people.

It clears up confusion the way light clears up a dark room.

💯 Pure means completely unmixed
🧾 A command with no false mixture
💡 Enlightening means giving sudden clear sight
📖 God's word clears up confusion

# Psalms 19:9-11
# 🍯 Sweeter Than Honey
---
## 🙏 The Fear Of The LORD Is Clean, Enduring For Ever

"Fear of the LORD" does not mean being scared of God like a threat.

It means a deep reverence and respect for who He is.

"Clean" here means there is nothing shameful or corrupt mixed into it.

Human customs and rules change generation after generation.

This kind of reverence never goes out of date and never needs replacing.

🙏 Fear of the LORD means reverence, not terror
✨ Clean means nothing shameful mixed in
⏳ Human rules change over time
📖 Reverence for God never goes out of date

## ⚖️ The Judgments Of The LORD Are True And Righteous Altogether

"Judgments" here means God's rulings, similar to verdicts handed down by a judge.

"Altogether" means every single one, without a single exception.

A human court sometimes gets a verdict wrong.

David says God's rulings never carry that risk.

Every single one lines up with what is actually true and fair.

⚖️ Judgments means God's rulings or verdicts
💯 Altogether means every single one
🚫 Human courts can get it wrong
📖 God's rulings are always fair

## 💰 More To Be Desired Are They Than Gold, Yea, Than Much Fine Gold

Gold was the most valuable material most people in this culture could imagine owning.

"Fine gold" means gold refined until every impurity was removed, the purest and most expensive kind available.

David says God's words are worth even more than that.

Someone could gain all the gold in the world and still miss out on what actually matters most.

💰 Gold was the ultimate ancient treasure
✨ Fine gold means refined and pure
📈 God's words outvalue even that
📖 True wealth is found in God's word

## 🍯 Sweeter Also Than Honey And The Honeycomb

Honey was the main source of sweetness in the ancient world, long before sugar existed.

Honey straight from the honeycomb was considered the freshest and sweetest kind available.

David moves from value, gold, to taste, honey, to describe the same thing two different ways.

God's words satisfy like nothing else can.

🍯 Honey was the ancient world's main sweetener
🐝 Honeycomb means honey in its freshest form
🔀 David switches from value to taste
📖 God's word satisfies completely

## 🚨 By Them Is Thy Servant Warned

To be warned means being alerted to danger before it actually happens.

Think of a lighthouse flashing a light long before a ship ever gets close to the rocks.

David says God's words work the same way in his life.

They alert him to danger before he ever makes the mistake.

🚨 Warned means alerted before danger hits
🗼 Think of a lighthouse warning ships early
🛡️ Obedience prevents damage before it happens
📖 God's word warns before mistakes happen

## 🔑 In Keeping Of Them There Is Great Reward

"Keeping" means actually living by these words, not just agreeing with them in theory.

David is not talking about a future prize handed out somewhere else.

Obeying God's word carries its own reward built directly into the obedience itself.

A wise, protected, satisfied life is the reward, not a separate payment.

🔑 Keeping means actually living by God's word
🚫 Not just agreeing with it in theory
🎁 The reward is built into obedience itself
📖 A wise, protected life is the reward

# Psalms 19:12-14
# 🙏 A Prayer For A Clean Heart
---
## ❓ Who Can Understand His Errors?

This question does not expect a real answer.

It is David's way of admitting that nobody can spot every mistake they make.

"Errors" here means unintentional wrongs, things done without even realizing they were wrong.

The psalm has just praised a perfect law.

Now David turns that same standard on himself and comes up short.

❓ This question expects no real answer
🙈 Errors means unintentional wrongs
🪞 David turns the standard on himself
📖 Even sincere people miss their own faults

## 🙈 Cleanse Thou Me From Secret Faults

"Secret faults" does not mean sins David is deliberately hiding from other people.

It means faults hidden even from David's own awareness.

He asks God to clean out mistakes he cannot even see in himself.

That kind of honesty requires trusting God to know him better than he knows himself.

🙈 Secret faults are hidden from oneself
🚫 Not deliberately hidden wrongdoing
🧼 David asks God to clean him fully
📖 God knows a person better than they know

## 😤 Keep Back Thy Servant Also From Presumptuous Sins

"Presumptuous" describes sin done on purpose, with full knowledge it is wrong.

That is very different from the secret faults just mentioned in the verse before.

Unintentional mistakes are one danger.

Willful, prideful defiance is a much bigger one.

David asks God to physically hold him back before he ever crosses that second line.

😤 Presumptuous means done on purpose
🆚 Different from unintentional errors
🚧 David asks God to hold him back
📖 Willful sin is a bigger danger than accidents

## 👑 Let Them Not Have Dominion Over Me

"Dominion" means ruling control, the kind a master has over a slave.

David is not just asking to avoid a single bad choice.

He is asking that sin never gain that level of permanent control over his life.

A sin that rules someone is far more dangerous than a sin that only tempts them once.

👑 Dominion means ruling control
⛓️ Like a master ruling over a slave
🔂 David fears sin becoming permanent control
📖 One mistake differs from being ruled by sin

## 📏 Then Shall I Be Upright, And I Shall Be Innocent From The Great Transgression

"Upright" means walking a straight, honest path instead of a crooked one.

"The great transgression" most likely points back to the presumptuous sin just described two lines earlier.

David is not claiming to become flawless.

He is asking to be kept safe from one specific kind of devastating, willful rebellion.

📏 Upright means walking a straight path
🎯 Great transgression points back to willful sin
🙅 David does not claim to be flawless
📖 One sin kept back protects the whole life

## 💭 Let The Words Of My Mouth, And The Meditation Of My Heart

"Meditation" means quiet, repeated thinking, turning something over in the mind on purpose.

David asks God to examine two different things at once, his spoken words and his private, unspoken thoughts.

Many people are careful about the first and careless about the second.

David wants both to hold up under God's inspection.

💭 Meditation means deliberate, repeated thinking
🗣️ Spoken words are examined here
🧠 David includes his private thoughts too
📖 Speech and thought both matter to God

## ✅ Be Acceptable In Thy Sight, O LORD, My Strength, And My Redeemer

"Acceptable" means pleasing and fully approved, not just barely tolerated.

"Redeemer" describes someone who personally pays the price to rescue another person from debt or slavery.

David closes the same way he opened, calling God his strength.

Now he adds one more title, the one who rescues him.

The psalm started with the sky silently preaching.

It ends with one man personally asking to be made right with God.

✅ Acceptable means pleasing and fully approved
💵 Redeemer means one who pays to rescue another
🔁 David repeats the title strength from the start
📖 The psalm moves from sky to heart
`.trim();

export const PSALMS_NINETEEN_PERSONAL_SECTIONS = parsePsalmsNineteenRawNotes(PSALMS_NINETEEN_RAW_NOTES);
