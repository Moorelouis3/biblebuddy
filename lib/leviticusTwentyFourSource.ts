export type LeviticusTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyFourRawNotes(rawText: string): LeviticusTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 24:${startVerse}` : `Leviticus 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 24 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_FOUR_RAW_NOTES = `# Leviticus 24:1-4
# 🕯️ Oil For The Lamps
---
## 🗣️ And The LORD Spake Unto Moses, Saying

This same introduction already opened five laws in Leviticus twenty three.

Repeating it here signals a fresh topic, not another festival rule.

The subject now shifts to a single lamp inside the tabernacle.

It had to stay lit every night without fail.

🗣️ Same formula opened five festival laws

📜 Here it signals a new topic

🕯️ The subject becomes the nightly lamp

📖 Moses never invents these commands himself

## 🫒 Pure Oil Olive Beaten For The Light

Beaten oil means olives crushed gently, not pressed hard with machines.

This gentle method produced the clearest oil with almost no sediment.

Ordinary oil, pressed harder from the pulp, burned smokier and dirtier.

Only the purest grade could go into a lamp that stood before the LORD.

🫒 Beaten oil means olives crushed gently

✨ It produced the clearest, cleanest oil

🔥 Cheaper oil burned smokier and dirtier

📖 Only the purest oil served this lamp

## 🔥 To Cause The Lamps To Burn Continually

Continually does not mean the flame literally never went dark for a second.

Verse three makes clear it burned only from evening until morning.

The word describes a routine repeated every single night, not a nonstop flame.

Aaron simply could never let one night pass without lighting it.

🔥 Continually does not mean nonstop

🌙 It burned from evening to morning

🔁 An unbroken nightly routine, not one flame

📖 No single night could ever be skipped

## 🚪 Without The Vail Of The Testimony

The vail was the inner curtain separating two rooms inside the tabernacle.

Without the vail means just outside it, in the holy place.

That put the lamp one room away from the Most Holy Place.

The testimony refers to the stone tablets of the Ten Commandments.

Those tablets sat inside the ark, behind that very curtain.

🚪 The vail was the inner curtain

📍 The lamp stood just outside it

📜 The testimony means the stone tablets

📖 They sat behind that same curtain

## 🕯️ The Pure Candlestick

The pure candlestick refers to the lampstand already designed back in Exodus twenty five.

It was hammered from one solid piece of gold, shaped like a blooming almond tree.

Seven branches held seven separate lamps in one connected stand.

This chapter does not redesign it, only assigns Aaron to tend it daily.

🕯️ Already designed back in Exodus

🌳 Branches shaped like a blooming almond tree

🔨 Hammered from one solid piece of gold

📖 Aaron's daily job, not a new design

## 📜 A Statute For Ever In Your Generations

This lamp duty was never meant to be temporary.

The same closing phrase already appeared after several festival laws in chapter twenty three.

Applying it here means the duty had to continue long after Moses and Aaron were gone.

A small daily chore received the same lasting weight as a major feast.

📜 Already used across chapter twenty three

🔁 The lamp duty was never temporary

⏳ Meant to outlast Moses and Aaron

📖 A small chore got a feast's weight

## ⛺ In The Tabernacle Of The Congregation

This is the book of Leviticus's regular name for the whole portable sanctuary.

It was a large tent, not a permanent building of any kind.

Every offering and duty in this book happens in or around this one tent.

God's meeting place with Israel traveled with the people through the wilderness.

⛺ Leviticus's standard name for the sanctuary

🎪 A large tent, not a building

🤝 God's meeting place with His people

📖 It traveled with Israel in the wilderness

# Leviticus 24:5-9
# 🍞 The Bread Of The Presence
---
## 🌾 Bake Twelve Cakes Thereof

Twelve cakes matched the twelve tribes of Israel exactly.

This loaf was not ordinary food for the priests to eat.

It stood for the whole nation resting continually before God.

Every tribe had a physical place on this one table at all times.

🌾 Twelve cakes matched twelve tribes

🤝 The whole nation stood before God

🍞 Not ordinary food, but a national symbol

📖 Every tribe had a place here

## 📏 Two Tenth Deals Shall Be In One Cake

A tenth deal was a dry measure, about two quarts by weight of grain.

This same unit already measured the firstfruits offering back in chapter twenty three.

Two tenth deals per cake made each loaf large, not a small wafer.

These were substantial loaves, heavy enough to feel like a real gift.

📏 A tenth deal means about two quarts

🔗 The same unit measured firstfruits earlier

🍞 Two tenth deals made each loaf large

📖 These were substantial loaves, not wafers

## 📊 Set Them In Two Rows, Six On A Row

This arrangement was specified exactly, not left to guesswork.

Six loaves per row, two rows, made twelve loaves total every time.

Nothing about this display was casual or thrown together.

The same fixed pattern repeated week after week without change.

📊 Six loaves per row, two rows

🔁 Rebuilt the same way every week

📋 Precision mattered even in a display

📖 Order reflected how seriously God was honored

## 🍞 Upon The Pure Table Before The LORD

The pure table refers to the golden table designed in Exodus twenty five.

It stood across from the lampstand, inside the holy place.

Later tradition gave this display the name shewbread.

Shewbread simply meant bread that was kept on display, not hidden away.

🍞 The same golden table from Exodus

📍 It stood across from the lampstand

🏷️ Later called shewbread by tradition

📖 Shewbread means bread kept on display

## 🌬️ Pure Frankincense Upon Each Row

Frankincense was a fragrant resin taken from certain desert trees.

It sat on top of the loaves, never baked inside the bread.

The scent stayed there the whole week the loaves remained on display.

It was burned separately later as its own small offering.

🌬️ Frankincense is a fragrant tree resin

🍞 Placed on top, never baked inside

📅 Stayed there the whole display week

📖 Burned separately as its own offering

## 🧠 For A Memorial, Even An Offering Made By Fire

A memorial portion was a small piece that stood for the whole gift.

Chapter two already used this same idea for the grain offering.

Here the frankincense served as that token piece from the bread display.

That handful was the part actually burned on the altar.

🧠 A memorial stands for the whole gift

🔗 Chapter two already used this idea

🌬️ The frankincense played that role here

📖 That token piece is what got burned

## 📅 Every Sabbath He Shall Set It In Order

Fresh bread replaced the old loaves once every single week.

This swap happened specifically on the Sabbath, not any random day.

Aaron carried out this weekly exchange personally, without exception.

That timing tied a tabernacle duty to the same weekly rhythm running through chapter twenty three.

📅 Fresh loaves replaced weekly, on schedule

😴 Timed specifically to the Sabbath

👤 Aaron carried out the exchange himself

📖 It echoed chapter twenty three's weekly rhythm

## 🤝 By An Everlasting Covenant

Calling this weekly exchange a covenant raised it above a simple chore.

A covenant was a binding promise, not a casual habit.

This one bound Israel to keep providing fresh bread, generation after generation.

Faithfulness here showed up in something as plain as baked bread.

🤝 A covenant is a binding promise

📜 This was never meant to lapse

🍞 Faithfulness shown through plain bread

📖 Small acts can carry covenant weight

## 👤 It Shall Be Aaron's And His Sons'

Once the week old loaves came off the table, they became food.

That food belonged to Aaron and his sons specifically, no one else.

They had to eat it inside the holy place itself.

It could never be carried home like ordinary leftovers.

👤 Removed loaves fed Aaron's family only

🚫 No one outside the priesthood ate it

📍 Eaten only inside the holy place

📖 Holiness here came with real limits

## ⭐ Most Holy Unto Him Of The Offerings Of The LORD Made By Fire

Most holy was the highest ranking Leviticus ever assigns to anything.

The sin offering back in chapter six received that exact same rank.

Only priests were ever allowed near something ranked this sacred.

This bread sat at the very top of Israel's system of holiness.

⭐ Most holy is Leviticus's highest ranking

🔗 The sin offering shared this rank

🚫 Only priests could touch something this sacred

📖 This bread sat at the very top

# Leviticus 24:10-12
# 😡 A Fight Breaks Out In The Camp
---
## 👤 The Son Of An Israelitish Woman, Whose Father Was An Egyptian

This man had one Israelite parent and one Egyptian parent.

He was almost certainly part of the mixed multitude mentioned in Exodus twelve.

Those were non Israelites who left Egypt together with God's people at the exodus.

He was living day to day among the tribes of Israel.

👤 One Israelite parent, one Egyptian parent

🇪🇬 Likely part of Exodus twelve's mixed multitude

⛺ Living daily among the Israelite tribes

📖 His split heritage sets up this story

## 🚶 Went Out Among The Children Of Israel

This does not describe a stranger passing through for one day.

It means he was already living and moving inside the Israelite camp.

His mixed heritage never kept him physically apart from everyone else.

That closeness is exactly why the coming fight happened at all.

🚶 Describes daily life in the camp

🏡 He was not a visitor passing through

🤝 Heritage did not keep him separate

📖 That closeness led straight to the fight

## 👊 Strove Together In The Camp

Strove means they physically fought or argued with real hostility.

This was not a quiet disagreement settled with calm words.

The text never explains what started the argument between them.

The story's real focus begins with what happened after the fight.

👊 Strove means an actual physical fight

❓ The original cause is never explained

🎯 The focus shifts to what came next

📖 What follows matters more than the fight

## 🗯️ Blasphemed The Name Of The Lord, And Cursed

The Name here means the LORD's own personal, sacred name.

This was not a general insult thrown at gods or authority.

It was a direct misuse of God's own covenant name.

This is the only time this exact offense is narrated anywhere in the Bible.

🗯️ The Name means the LORD's own name

⚠️ A direct insult, not a general one

❗ It made this fight far more serious

📖 The only narrated case of this offense

## 👩 His Mother's Name Was Shelomith, The Daughter Of Dibri, Of The Tribe Of Dan

Naming the mother instead of the father here is unusual on purpose.

His father was Egyptian, so he had no tribal claim through him.

His only real connection to Israel ran through his mother's side.

That is exactly why her name and her tribe get written down.

👩 Naming the mother is unusual here

🔗 His Israelite tie ran through her only

🏷️ That is why her tribe is named

📖 Identity in Israel often ran through lineage

## 🔒 They Put Him In Ward, That The Mind Of The LORD Might Be Shewed Them

Ward means custody, holding someone while waiting for an official ruling.

No existing law yet covered exactly this kind of blasphemy.

A very similar gap appears later with the sabbath breaker in Numbers fifteen.

Moses held the man and asked God directly instead of guessing at a punishment.

🔒 Ward means custody, held for judgment

🆕 No existing law covered this crime yet

🔗 Numbers fifteen later mirrors this same gap

📖 Moses asked God instead of guessing

# Leviticus 24:13-16
# ⚖️ The Sentence For Blasphemy
---
## 🚷 Bring Forth Him That Hath Cursed Without The Camp

This ruling comes directly from God, answering the question raised back in verse twelve.

Executions took place outside the camp boundary, never inside it.

The disposal of certain sacrifices in chapter four followed that same pattern.

Serious sin stayed apart from daily life inside the camp.

🚷 God's direct answer to verse twelve

🏕️ Executions happened outside the camp

🔗 The same pattern as chapter four's sacrifices

📖 Serious sin stayed apart from daily life

## ✋ Let All That Heard Him Lay Their Hands Upon His Head

Hand laying usually transfers guilt onto a sacrificial animal, as in chapter one.

Here it works differently, since no animal is involved at all.

The witnesses place their hands to formally own their own testimony.

It marks accountability for the accusation, not a transfer of sin onto him.

✋ Hand laying often transfers guilt to animals

🎯 Here witnesses own their own testimony

⚖️ It marks accountability, not sin transfer

📖 Even accusers had a serious duty here

## 🪨 Let All The Congregation Stone Him

Stoning made this execution a shared act, not one person's job.

Everyone present had to participate in carrying it out.

No single hired executioner could absorb the weight of ending a life.

The whole community took collective ownership of enforcing the law.

🪨 Carried out by the whole community

🚫 No single hired executioner did it alone

🤝 Everyone shared ownership of the sentence

📖 The law's weight belonged to everyone

## 😔 Whosoever Curseth His God Shall Bear His Sin

This line covers cursing God in a more general sense.

It names a real wrong that carries guilt before God.

On its own, though, this offense does not carry a death sentence.

The next verse narrows in on something far more specific.

😔 Covers a more general kind of cursing

⚖️ Real guilt, but not a death penalty

🎯 Sets up a sharper line ahead

📖 Not every wrong carries the same weight

## 💀 He That Blasphemeth The Name Of The LORD, He Shall Surely Be Put To Death

This second line narrows sharply to misusing God's own personal covenant name.

That specific name is the LORD, written in Hebrew as YHWH.

This narrower, more direct offense is the one that carries the death penalty.

The difference between verse fifteen and this verse is deliberate, not repetition.

💀 Misusing God's own covenant name, YHWH

⚖️ This offense carries the death penalty

🎯 A deliberate escalation from verse fifteen

📖 Precise wording mattered in this law

## 🌍 As Well The Stranger, As He That Is Born In The Land

This line answers the exact situation that started the whole story.

The accused man was himself half Egyptian, half Israelite.

Being part foreign neither excused him nor singled him out unfairly.

One identical standard applied to every person living in the camp.

🌍 Answers the mixed heritage case directly

⚖️ Being part foreign changed nothing here

🤝 One standard for every camp resident

📖 Justice did not depend on ancestry

# Leviticus 24:17-22
# 🦷 Life For Life, Eye For Eye
---
## ⚔️ He That Killeth Any Man Shall Surely Be Put To Death

A human life carries a value no payment could ever replace.

This law states murder's penalty before covering any other kind of loss.

Everything that follows in this section gets measured against this one fact.

Money can fix broken property, but it can never fix a human life.

⚔️ States murder's penalty first and plainly

💰 No payment could replace a human life

🎯 Every comparison that follows starts here

📖 Property and life are never equal

## 🐑 He That Killeth A Beast Shall Make It Good

Killing someone else's animal required financial restitution, not execution.

The owner had to be paid back for what was actually lost.

This sits right next to the death penalty for murder on purpose.

The gap between property and human life could not be clearer.

🐑 Killing an animal required repayment

💰 The owner was simply paid back

🎯 Placed beside murder for contrast

📖 The gap between the two is deliberate

## ⚖️ Beast For Beast

Beast for beast means the payment had to match the loss exactly.

The guilty party owed an equal animal, not extra and not less.

This kept restitution fair on both sides of the loss.

A wronged owner could not use the law to demand more than was fair.

⚖️ The payment had to match exactly

🚫 No extra penalty and no shortfall

🤝 Fair to both the owner and offender

📖 Even property law followed real limits

## 🤕 If A Man Cause A Blemish In His Neighbour

A blemish here means a real physical injury, not a small scrape.

It describes lasting harm that would visibly change someone's body.

This law moves from animals back to harm done between people.

That shift keeps human injury separate from simple property loss.

🤕 Blemish means a real, lasting injury

👤 Harm done between two people

🔀 Moves the topic back to people

📖 Human injury stayed in its own category

## ⚖️ Breach For Breach, Eye For Eye, Tooth For Tooth

This is the same principle explained back in Exodus twenty one.

It sets a ceiling on punishment, not a floor.

The punishment could never exceed the harm actually done.

It was never meant as permission for personal revenge to escalate.

⚖️ The same principle from Exodus twenty one

🚧 A ceiling on punishment, not a floor

🚫 Never permission for personal revenge

📖 It stopped small harms from growing bigger

## 📐 So Shall It Be Done To Him Again

This repeats the principle in stronger, more absolute language.

It applied without exception, no matter who the offender was.

Many other ancient law codes scaled punishment by social class instead.

Israel's law measured the injury itself, not the rank of the people involved.

📐 Repeats the principle in absolute terms

👥 Applied without exception to anyone

⚖️ Israel measured the injury, not rank

📖 Other ancient codes scaled by class instead

## 🔁 He That Killeth A Beast, He Shall Restore It

This restates the section's opening contrast almost word for word.

An animal loss still gets simple restitution, nothing more.

A human life lost still gets the death penalty, nothing less.

Repeating it here locks the point in as the section closes.

🔁 Repeats the opening contrast again

🐑 Animal loss still means restitution

⚔️ Human life still means death

📖 Repetition locks the point in place

## 🌍 Ye Shall Have One Manner Of Law

This equal treatment rule already answered the blasphemy case back in verse sixteen.

Here it becomes a general rule covering this whole section of laws.

Foreigners living among Israel received the exact same legal system.

No one got a harsher or softer standard because of where they were born.

🌍 Restates the rule from verse sixteen

⚖️ Foreigners got the identical legal system

🚫 Birthplace changed nothing about the standard

📖 One law applied to the whole camp

## 🙏 For I Am The LORD Your God

This grounds all of Israel's justice in God's own character.

The reasoning is not social order or keeping the peace alone.

Fairness in these laws was meant to reflect who God actually is.

That is the real reason behind the law itself.

🙏 Grounds justice in God's own character

⚖️ Fairness reflects who God actually is

🎯 The reason behind the law itself

📖 God's identity anchors Israel's justice

# Leviticus 24:23
# 🪨 Israel Obeys
---
## 📢 Moses Spake To The Children Of Israel, That They Should Bring Forth Him That Had Cursed

Moses does not hesitate once God's ruling actually arrives.

He relays the exact instructions to the whole community right away.

No debate or protest from the people is ever recorded here.

A hard case gets a fast, direct answer instead of delay.

📢 Moses relays the ruling immediately

🤝 No protest from the people is recorded

🎯 A hard case gets a fast answer

📖 Obedience followed as soon as God spoke

## 🪨 Stone Him With Stones

Repeating stone as both the action and the object is a common Hebrew pattern.

It is used here for emphasis, not because the sentence had to be said twice.

This construction underlines that the sentence was carried out fully.

No softened version or lighter substitute was ever used.

🪨 A Hebrew pattern repeating one word

📣 Used here for real emphasis

✅ The sentence was carried out fully

📖 No softened substitute replaced it

## ✅ The Children Of Israel Did As The LORD Commanded Moses

This exact closing phrase repeats throughout the tabernacle's construction in Exodus.

There it described following a building plan down to the smallest detail.

Here it describes something far harder, carrying out a painful command.

The same formula covers obedience in both easy work and hard work.

✅ The same formula closes Exodus's building chapters

🔨 There it meant following a building plan

⚖️ Here it meant a hard, painful command

📖 One formula fits both kinds of obedience
`.trim();

export const LEVITICUS_TWENTY_FOUR_PERSONAL_SECTIONS = parseLeviticusTwentyFourRawNotes(
  LEVITICUS_TWENTY_FOUR_RAW_NOTES,
);
