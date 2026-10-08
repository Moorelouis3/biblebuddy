export type MatthewTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyFiveRawNotes(rawText: string): MatthewTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 25:${startVerse}` : `Matthew 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Matthew 25 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_FIVE_RAW_NOTES = `# Matthew 25:1-4
# 🪔 The Ten Virgins Wait For The Bridegroom
---
## 🪔 Took Their Lamps And Went Forth To Meet The Bridegroom

A Jewish wedding in this culture had no fixed hour.

The groom could arrive at any point, even late into the night.

Young women called virgins carried oil lamps to walk him in.

Meeting him this way was a place of honor.

Being chosen for it meant being trusted to stay ready.

🪔 Lamps lit the groom's arrival

🌙 The timing was never announced

👰 Carrying his lamp was an honor

➡️ Trust meant staying ready
---
## ⚖️ Five Were Wise And Five Were Foolish

Matthew splits the ten into two equal groups right away.

Wise here does not mean smarter or more clever.

It means one group planned ahead and the other did not.

The split comes before anything even happens in the story.

Jesus is naming two ways of waiting before showing what each one costs.

⚖️ Ten split into two equal groups

🧠 Wise means prepared, not clever

😴 Foolish means unprepared, not slow

➡️ The split comes before the cost does
---
## 🫙 Took No Oil With Them

Every lamp needed a steady supply of olive oil to keep burning.

The foolish virgins packed the lamp but forgot the fuel.

They assumed the short wait would not use much oil at all.

That assumption becomes the entire problem later in the story.

🫙 Oil kept these lamps burning

🪔 They packed lamps without fuel

⏳ They expected only a short wait

📖 One bad assumption shapes the whole parable
---
## 🏺 The Wise Took Oil In Their Vessels With Their Lamps

Vessels here means separate small jars or flasks, not the lamp itself.

The wise virgins carried extra oil beyond what their lamps already held.

They planned for a wait longer than anyone expected.

That one extra container becomes the whole difference between the two groups.

🏺 Vessels means separate oil flasks

🔋 Extra oil meant a longer wait

🧠 They planned past the expected time

➡️ One container decided the outcome
---
# Matthew 25:5-9
# ⏳ The Bridegroom Tarries
---
## ⏳ While The Bridegroom Tarried They All Slumbered And Slept

Tarried is an old word for delayed longer than expected.

Even the five wise virgins fell asleep during the wait.

Sleep itself was never the failure in this story.

Being ready when the moment came was what mattered.

The wait tested preparation, not endurance.

⏳ Tarried means delayed past expectation

😴 Even the wise virgins slept

🚫 Sleep itself was not the failure

📖 Preparation mattered more than endurance
---
## 🌑 At Midnight There Was A Cry Made

Midnight was the deepest, darkest part of the night in this culture.

A sudden shout broke the silence without any warning.

Ancient weddings often used a loud public announcement like this one.

The whole town would have heard it, not just the ten virgins.

🌑 Midnight meant the darkest hour

📢 The cry came without warning

🏘️ The announcement was loud and public

➡️ Nobody could claim they had more time
---
## ✂️ Then All The Virgins Arose And Trimmed Their Lamps

Trimmed means cutting back the burnt part of the wick.

A neglected wick would smoke and burn weak or uneven.

All ten virgins did this same simple task together.

The real difference between them had nothing to do with trimming.

It was about what each lamp still had left to burn.

✂️ Trimmed means cutting the burnt wick

🔥 A bad wick burns weak and uneven

🤝 All ten did this same step

📖 Oil decided what trimming could not
---
## 🙏 Give Us Of Your Oil For Our Lamps Are Gone Out

The foolish virgins finally see their lamps failing in real time.

They turn to the ones who planned ahead for help.

This is the first moment they ask instead of assume.

By now it is already far too late to fix it.

🪔 Their lamps are failing right now

🙏 They finally ask for help

⏰ The asking comes too late

➡️ Preparation cannot be borrowed last minute
---
## 🚫 Not So Lest There Be Not Enough For Us And You

This refusal sounds harsh, but it is not selfishness.

Oil here pictures something personal that cannot be transferred between people.

Splitting it would leave every lamp too weak to last.

Some things cannot be shared or borrowed at the last moment.

Readiness is one of them.

🚫 This refusal was not selfish

🫙 Oil pictures something deeply personal

⚖️ Splitting it would weaken every lamp

📖 Readiness cannot be borrowed from someone else
---
# Matthew 25:10-13
# 🚪 The Door Was Shut
---
## 🚪 They That Were Ready Went In With Him And The Door Was Shut

Ancient wedding feasts locked the door once the celebration began.

Latecomers were not allowed in no matter how sincere they were.

The shut door marks a moment that cannot be undone afterward.

This is the detail the whole parable has been building toward.

🚪 The door locked once the feast began

⏰ Latecomers had no way back in

🔒 This moment could not be undone

📖 The whole parable points to this door
---
## 🗣️ Lord Lord Open To Us

Saying Lord twice shows real desperation, not simple politeness.

The foolish virgins now believe they belong inside with everyone else.

Their words sound sincere, even urgent.

Sincerity by itself is not what the parable says was missing.

🗣️ Repeating Lord shows real desperation

🙏 They believed they belonged inside

❤️ Their words sound sincere

➡️ Sincerity was never the missing piece
---
## ❌ I Know You Not

This answer is shocking because it denies any relationship at all.

It does not simply mean they arrived a few minutes late.

Jesus uses this same phrase elsewhere for people who never truly knew him.

The lamp was only ever a picture of something deeper.

❌ The answer denies any relationship

⏰ This is more than simple lateness

🔁 Jesus uses this phrase elsewhere too

📖 The lamp pictured something deeper than timing
---
## 👀 Watch Therefore For Ye Know Neither The Day Nor The Hour

Watch here does not mean stay physically awake every moment.

Even the wise virgins had slept earlier in this same story.

Watching means living ready, with nothing left unprepared.

Nobody in the parable is ever told the exact moment to expect.

👀 Watch does not mean staying awake

😴 Even the wise virgins had slept

🧠 Watching means living already prepared

➡️ Nobody gets the exact moment in advance
---
# Matthew 25:14-18
# 💰 Talents Given According To Ability
---
## 🧳 Travelling Into A Far Country

Wealthy landowners in this period often left home for long stretches.

A trip like this could last months or even years.

The servants were left completely in charge during that whole time.

Nobody was watching over their shoulder when the master was away.

🧳 Long trips away were common then

📆 The absence could last months or years

🏠 Servants ran things without supervision

➡️ Trust was tested while no one watched
---
## 🔑 Delivered Unto Them His Goods

The master does not lock his wealth away during his absence.

He hands real control of it to his own servants.

This was a serious act of trust, not a small errand.

What they do with it will reveal who they really are.

🔑 Real control was handed over

🤝 This was a serious act of trust

🧪 The test was already starting

📖 What they did would reveal who they were
---
## ⚖️ Unto One He Gave Five Talents

A talent was not a coin but a unit of weight, usually silver or gold.

One single talent equaled many years of an ordinary laborer's wages.

Five talents was an almost unthinkable sum of money to receive.

This was never a small or casual test.

⚖️ A talent was a huge unit of weight

💰 One talent equaled years of wages

🤯 Five talents was a massive sum

📖 This test carried real weight
---
## 📏 To Every Man According To His Several Ability

Several here is an old way of saying each his own.

The master does not give identical amounts to every servant.

He matches the amount to what each one could actually handle.

Fairness in this story is about fit, not equal totals.

📏 Several means each his own portion

⚖️ Amounts were matched to ability

🎯 Fit mattered more than equal totals

➡️ Fairness here was never about matching sums
---
## 📈 Then He That Had Received The Five Talents Went And Traded With The Same

Trading meant putting the money to active use right away.

This servant risked the funds instead of simply storing them.

Ancient trade could include goods, loans, or business ventures.

Risk was the whole point of what the master wanted done.

📈 Trading meant putting money to work

🎲 This servant accepted real risk

🛒 Ancient trade covered goods and loans

📖 Risk was exactly what was expected
---
## 🔁 He Also That Had Received Two Talents He Also Gained Other Two

This servant starts with less, but acts with the same diligence.

He doubles his amount just as the first servant did.

The size of the starting sum was never the real test.

What mattered was what each servant chose to do with it.

🔁 Doubling happened with less to start

💪 He matched the first servant's effort

📏 Starting size was not the real test

📖 Choice mattered more than the amount
---
## ⛏️ But He That Had Received One Went And Digged In The Earth And Hid His Lord's Money

Burying money underground was a known way to keep it safe in this period.

This servant chooses total inaction instead of any risk at all.

He treats the gift as a burden to bury, not a trust to use.

That choice sets up everything that happens to him later.

⛏️ Burying money was a known safekeeping method

🚫 This servant chose total inaction

📦 He treated a trust like a burden

➡️ That choice decides his outcome later
---
# Matthew 25:19-23
# 🎉 Well Done Good And Faithful Servant
---
## ⏳ After A Long Time The Lord Of Those Servants Cometh

The master's return was never announced in advance.

A long time gave each servant plenty of room to act, or stall.

Reckoneth means the time has come to settle every account.

Nothing done quietly during the wait stays hidden any longer.

⏳ The return came after a long wait

🤫 No warning was given beforehand

📊 Reckoneth means settling every account

➡️ Nothing stayed hidden once he returned
---
## 📊 Thou Deliveredst Unto Me Five Talents Behold I Have Gained Beside Them Five Talents More

This servant reports his full result without hiding anything.

He gives the master all the credit for the original amount.

Doubling five talents was an enormous return by any measure.

His report is honest and complete, not boastful.

📊 He reports the full result plainly

🙏 The master gets credit for the start

💰 Doubling five talents was a huge return

📖 Honesty marked his whole report
---
## 🙌 Well Done Thou Good And Faithful Servant

Good describes his character, and faithful describes his conduct.

The master praises effort and loyalty, not the size of the result.

A smaller return from the two talent servant earns this exact same line later.

That repetition is not an accident in how Jesus tells the story.

🙌 Good describes character, faithful describes conduct

⚖️ Effort mattered more than the result's size

🔁 The two talent servant hears this too

📖 The repetition is not an accident
---
## 📈 I Will Make Thee Ruler Over Many Things Enter Thou Into The Joy Of Thy Lord

A small task done well leads to a much bigger one.

Ruler here describes a promotion in responsibility, not just a reward.

Entering the lord's joy pictures a shared celebration, not a private bonus.

Faithfulness opens a door forward instead of closing out an account.

📈 Small faithfulness led to bigger responsibility

👑 Ruler describes a real promotion

🎉 The joy was shared, not private

➡️ Faithfulness opens a door forward
---
## 🔁 He Also That Had Received Two Talents Came And Said

This servant brings the exact same report with half the starting amount.

The master answers him with the identical words used for the first servant.

Neither the size of the gift nor the size of the result decided the reward.

What decided it was whether each servant was faithful with what he had.

🔁 The same praise is repeated here

⚖️ Half the amount earned equal praise

🎯 Faithfulness decided the reward, not size

📖 The standard was the same for both
---
# Matthew 25:24-27
# 😨 The Wicked And Slothful Servant
---
## 😠 I Knew Thee That Thou Art An Hard Man

This servant opens by accusing his own master before explaining himself.

He claims the master profits from fields he never planted.

Reaping where he has not sown is an old way of describing an unfair profit.

The accusation is really an excuse dressed up as an observation.

😠 He accuses the master first

🌾 Reaping unsown fields means unfair profit

🎭 The accusation is really an excuse

📖 Fear often disguises itself as logic
---
## 😨 I Was Afraid And Went And Hid Thy Talent In The Earth

Fear, not evil intent, is what this servant names as his reason.

He protects the money from loss instead of putting it to any use.

Avoiding risk felt safer to him than ever trying and possibly failing.

That choice left the gift completely unused the entire time.

😨 Fear was his stated reason

🛡️ He protected the money from loss

🚫 Avoiding risk felt safer to him

➡️ Unused gifts still count as a choice
---
## 🗣️ Thou Wicked And Slothful Servant

The master answers using the servant's own excuse against him.

If the master really were that unfair, caution made even less sense.

Slothful names ordinary laziness, not some clever caution.

His own words end up proving his own guilt.

🗣️ The master quotes the servant's own words

🤔 The excuse undercuts its own logic

😴 Slothful simply means lazy

📖 His own defense convicts him
---
## 🏦 Thou Oughtest Therefore To Have Put My Money To The Exchangers

Exchangers were early bankers who paid modest interest on deposits.

This option required almost no risk and very little effort at all.

The master is not even asking for bold or risky investing here.

He is only asking for the smallest possible step of faithfulness.

🏦 Exchangers worked like early bankers

💵 This path carried almost no risk

🪜 It only required the smallest effort

➡️ Even minimal faithfulness would have been enough
---
# Matthew 25:28-30
# 🌑 Outer Darkness
---
## 🔄 Take Therefore The Talent From Him And Give It Unto Him Which Hath Ten Talents

The unused talent moves to the servant who has already proven faithful.

This looks unfair at first glance to modern ears.

The point is not reward for wealth but reward for use.

Resources in this story always follow faithfulness, not need or fairness.

🔄 The talent moves to a proven servant

🤨 This can look unfair at first

🎯 The point is use, not wealth

📖 Faithfulness decided where it went
---
## 🔁 Unto Every One That Hath Shall Be Given And From Him That Hath Not Shall Be Taken Away

This same hard principle shows up elsewhere in Matthew's gospel.

Having here means actually using what was given, not just holding it.

A gift left completely unused eventually stops functioning like a gift at all.

Growth and neglect both tend to multiply over time.

🔁 This principle repeats elsewhere in Matthew

🧰 Having means using, not just holding

📉 Unused gifts stop acting like gifts

📖 Growth and neglect both multiply
---
## 🌑 Cast Ye The Unprofitable Servant Into Outer Darkness

Outer darkness describes complete exclusion from the master's house and joy.

Weeping and gnashing of teeth is a phrase Jesus repeats across several parables.

It pictures real regret, not a minor disappointment.

This servant's fear of loss becomes the very loss he feared.

🌑 Outer darkness means complete exclusion

😭 Weeping and gnashing pictures real regret

🔁 Jesus repeats this phrase elsewhere

➡️ His fear became his own outcome
---
# Matthew 25:31-33
# 👑 The Son Of Man Comes In Glory
---
## 👑 When The Son Of Man Shall Come In His Glory And All The Holy Angels With Him

Son of man was Jesus's own favorite title for himself.

It comes from an old vision in Daniel of a figure given authority by God.

The same title that once described a suffering servant now describes a returning king.

Angels accompanying him mark this as a royal arrival, not a quiet visit.

👤 Son of man was Jesus's chosen title

📜 It comes from a vision in Daniel

👑 The suffering servant returns as king

📖 Angels mark this as a royal arrival
---
## 🌍 Before Him Shall Be Gathered All Nations

Every nation appears here, not just Israel or any single people group.

This judgment scene includes every person who has ever lived.

Nobody is exempted from standing in front of this gathering.

The scale of it is meant to feel total and final.

🌍 Every nation is included here

👥 No single group is singled out

🚫 Nobody is left out of this

➡️ The scale is meant to feel final
---
## 🐑 As A Shepherd Divideth His Sheep From The Goats

Shepherds in this region often grazed sheep and goats together during the day.

At night the two were separated since goats needed more shelter from the cold.

This was a familiar, everyday task to anyone listening to Jesus speak.

The picture works because the separating itself was already so ordinary.

🐑 Sheep and goats often grazed together

🐐 Goats needed more shelter at night

🧑‍🌾 Shepherds separated them as routine work

📖 An everyday task becomes the picture of judgment
---
# Matthew 25:34-36
# 🍞 Inherit The Kingdom Prepared For You
---
## 👨‍👩‍👧 Inherit The Kingdom Prepared For You From The Foundation Of The World

Inherit describes receiving something as family, not earning it as wages.

This kingdom was planned before the world itself was even made.

The reward was never a last minute decision based on this one scene.

God's plan for his people reaches back further than any of their own choices.

👨‍👩‍👧 Inherit means receiving as family

🏗️ The plan predates creation itself

⏳ This was never a last minute decision

📖 God's plan reaches back further than their choices
---
## 🍞 I Was An Hungred And Ye Gave Me Meat I Was Thirsty And Ye Gave Me Drink

These are the most basic human needs anyone can have.

Meat here is an old general word for food, not only animal meat.

Meeting needs this plain and physical still counts as meeting Jesus himself.

Faith in this scene shows up through ordinary kindness, not grand gestures.

🍞 Meat was an old word for food

💧 Thirst and hunger name basic needs

🙌 Plain kindness still counts as worship

➡️ Ordinary acts carried real weight
---
## 🧳 I Was A Stranger And Ye Took Me In

Stranger means a traveler or foreigner with no family nearby to help.

Public inns barely existed and were often unsafe in this period anyway.

Taking a stranger in was considered a serious moral duty, not just kindness.

Refusing hospitality back then could leave a traveler with nowhere safe to go.

🧳 Stranger means a traveler with no family nearby

🏚️ Inns were rare and often unsafe

🤝 Hospitality was treated as a moral duty

📖 Refusing it could leave someone stranded
---
## 🧥 Naked And Ye Clothed Me I Was Sick And Ye Visited Me

Nakedness here usually means ragged or insufficient clothing, not total exposure.

Sickness in this period often meant isolation, since little real medical care existed.

Visiting the sick meant showing up when most people would simply stay away.

Both acts cost the giver real time, not only money.

🧥 Naked usually meant ragged clothing

🤒 Sickness often meant real isolation

🚶 Visiting meant showing up anyway

➡️ Both acts cost real time
---
## ⛓️ I Was In Prison And Ye Came Unto Me

Ancient prisons rarely provided food, blankets, or any basic care at all.

Prisoners depended entirely on outside visitors just to survive day to day.

Visiting one could also be risky, since it meant being linked to a convicted person.

This act asked for real courage, not only compassion.

⛓️ Prisons rarely provided real care

🍽️ Prisoners depended on outside visitors

⚠️ Visiting carried real social risk

📖 Courage mattered here as much as compassion
---
# Matthew 25:37-40
# ❓ Inasmuch As Ye Have Done It Unto One Of These
---
## ❓ Lord When Saw We Thee An Hungred And Fed Thee

The righteous genuinely do not remember doing any of this for Jesus himself.

Their good came from instinct and habit, not from chasing a reward.

That surprise is actually the whole point of their reaction here.

Real kindness in this story does not perform for an audience.

❓ They genuinely do not remember

💪 Their kindness was pure instinct

🎭 They were not performing for reward

📖 Real kindness does not seek an audience
---
## 🔗 Inasmuch As Ye Have Done It Unto One Of The Least Of These My Brethren Ye Have Done It Unto Me

Least of these points to the most overlooked and powerless people around.

Brethren likely points first toward Jesus's own followers facing real hardship.

Jesus still ties his own identity directly to how the vulnerable get treated.

Treatment of the powerless becomes treatment of Jesus in this scene.

👇 Least of these means the overlooked

👪 Brethren points to Jesus's own followers

🔗 Jesus ties his identity to this

📖 How we treat the powerless matters
---
# Matthew 25:41-46
# 🔥 Depart From Me Ye Cursed
---
## 🔥 Depart From Me Ye Cursed Into Everlasting Fire Prepared For The Devil And His Angels

This fire was never originally made for human beings at all.

It was prepared for the devil and the angels who rebelled with him.

People end up there only by their own rejection, not God's original design.

That distinction matters for understanding what this verdict actually means.

🔥 This fire was made for the devil

👿 Angels who rebelled share this fate

🚶 People arrive there by their own choice

📖 Design and outcome are not the same thing
---
## 🔁 I Was An Hungred And Ye Gave Me No Meat

This list mirrors the earlier one given to the righteous almost word for word.

Every category of need repeats, just with the opposite response each time.

Nothing dramatic or violent is named as their failure here.

Their failure was simply walking past need without stopping to help.

🔁 This list mirrors the earlier one

🔄 Only the response changes each time

🚶 Their failure was simply walking past

📖 Doing nothing was still a choice
---
## ❓ Lord When Saw We Thee An Hungred Or Athirst And Did Not Minister Unto Thee

This group is also surprised, but for a very different reason.

The righteous forgot their good deeds because kindness came naturally to them.

This group never noticed the need in the first place.

Never seeing a person in need is itself part of the failure.

❓ Surprise shows up in both groups

🙌 The righteous forgot out of habit

🙈 This group never noticed at all

📖 Not seeing need was its own failure
---
## 🔗 Inasmuch As Ye Did It Not To One Of The Least Of These Ye Did It Not To Me

This verse mirrors verse forty almost word for word, with not added in.

The same identification with the powerless now cuts the opposite direction.

Ignoring the vulnerable is treated here as ignoring Jesus directly.

One small word changes an entire verdict.

🔁 This mirrors verse forty closely

🔗 The identification cuts both directions

🙈 Ignoring the vulnerable means ignoring Jesus

📖 One small word changed the verdict
---
## ♾️ These Shall Go Away Into Everlasting Punishment But The Righteous Into Life Eternal

The same original word behind everlasting describes both halves of this verse.

Whatever length applies to eternal life also applies to this punishment.

Jesus never suggests the two halves use different kinds of forever.

This final line closes the parable with maximum weight on every word.

⚖️ The same word covers both halves

♾️ One forever matches the other forever

🚫 Jesus never splits the meaning

📖 Every word here carries maximum weight
`.trim();

export const MATTHEW_TWENTY_FIVE_PERSONAL_SECTIONS = parseMatthewTwentyFiveRawNotes(MATTHEW_TWENTY_FIVE_RAW_NOTES);
