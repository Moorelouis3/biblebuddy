export type MalachiThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMalachiThreeRawNotes(rawText: string): MalachiThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MalachiThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Malachi\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Malachi 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Malachi\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Malachi\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Malachi 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Malachi 3:${startVerse}` : `Malachi 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Malachi 3 sections, received " + sections.length);
  }

  return sections;
}

const MALACHI_THREE_RAW_NOTES = `# Malachi 3:1-3
# 🔥 The Messenger And The Refiner's Fire
---
## I Will Send My Messenger

A messenger here means someone sent ahead with an announcement, not a letter carrier.

The New Testament quotes this exact line to describe John the Baptist.

Mark and Matthew both trace his ministry straight back to this promise.

The challenge that closed chapter two finally gets a real answer here.

God heard their doubt, and He is already answering it.

📯 Messenger means an announcer sent ahead

✝️ New Testament applies this to John the Baptist

🔁 Mark and Matthew trace it back here

📖 Chapter two's challenge gets its answer

## Prepare The Way Before Me

In the ancient world, kings sent workers ahead before any royal visit.

Those workers cleared rocks, filled holes, and smoothed the road itself.

The messenger here does the same work, spiritually instead of physically.

He clears away whatever blocks people from meeting God honestly.

This is not about a smoother highway, but a changed heart.

🚧 Kings sent workers to prepare roads

🪨 They cleared rocks and filled holes

❤️ This messenger prepares hearts, not highways

➡️ The real obstacle was never the road

## Shall Suddenly Come To His Temple

The very temple criticized back in chapters one and two is where God arrives.

Priests had mishandled offerings there and treated God's table with contempt.

God is not avoiding that corrupt place.

He is walking straight into the middle of it.

Suddenly means without the delay they might have hoped for.

The place of their failure becomes the very place of His arrival.

🏛️ The corrupt temple is exactly where God goes

🙈 God does not avoid the corruption

⏰ Suddenly means no advance warning

📖 Failure becomes the very place of arrival

## The Messenger Of The Covenant

This phrase names a second messenger.

He is not the one from the start of the verse.

That first messenger clears the way.

This one is the LORD Himself, arriving in person.

A covenant is a binding promise.

This title ties the messenger directly to that promise.

One figure announces the arrival.

The other one is the arrival.

📯 This is a second, different messenger

👑 This one is the LORD Himself

🤝 Covenant means a binding promise

📖 The forerunner announces, the LORD arrives

## Who May Abide The Day Of His Coming

This question does not expect an answer.

It already assumes the answer is no one.

The people had been begging for God to show up and judge the wicked.

Now they learn that arrival will not feel comfortable.

Abide means to stand firm and survive something overwhelming.

Wanting judgment is easy until the judgment includes you too.

❓ A question with no real answer

🙅 The answer assumed here is no one

🏋️ Abide means to stand firm and survive

📖 Wanting judgment is easy until it is yours

## Like A Refiner's Fire

A refiner heats metal until it melts completely.

Melting forces the impurities inside the metal to rise to the surface.

The refiner skims those impurities away until only the pure metal is left.

This coming is pictured as that same intense heat, not a gentle visit.

Fire in scripture usually means purification through real pressure, not comfort.

🔥 A refiner melts metal completely

⚗️ Melting forces impurities to the surface

🧹 The refiner skims the impurities away

📖 This is purification through real pressure

## Like Fullers' Soap

A fuller was a tradesman who cleaned and whitened raw wool or cloth.

Fullers used harsh soap and often trampled the cloth underfoot to work it in.

The process was rough, not a delicate rinse.

Stains that looked permanent came out under that harsh treatment.

God's coming works the same way on people, not just on metal.

🧼 A fuller cleaned and whitened cloth

👣 Fullers trampled cloth to work in soap

😖 The process was rough, not gentle

📖 God's coming cleans people the same way

## He Shall Sit As A Refiner And Purifier Of Silver

Sitting pictures patience.

A refiner does not walk away from the fire.

Silver refining took careful, constant attention to get right.

The refiner watches until he can see his own reflection in the metal.

That reflection was the ancient sign that every impurity was finally gone.

God gives His people that same careful, watchful attention.

🪞 Sitting means patient, careful attention

🔥 A refiner never leaves the fire unattended

✨ A clear reflection meant the silver was pure

📖 God gives His people that same attention

## Purge Them As Gold And Silver

The sons of Levi were the priestly tribe already rebuked in chapter two.

Purge means to burn away whatever is worthless until only value remains.

This is not punishment for its own sake.

It is preparation, making the priests fit to serve again.

Chapter two listed the corruption.

Chapter three announces the cure.

👨‍👦 Sons of Levi are the priestly tribe

🔥 Purge means burning away the worthless part

🛠️ This prepares priests, it does not just punish

📖 Chapter two's corruption meets chapter three's cure

## An Offering In Righteousness

Chapter one opened with God rejecting the offerings brought to Him.

Blemished animals and halfhearted gifts had filled the altar for years.

Righteousness here means an offering that finally matches a changed heart.

Purified priests will finally bring something God can actually accept.

The fix was never the ritual.

It was the people performing it.

🙅 Chapter one showed God rejecting offerings

🐑 Blemished animals had filled the altar

❤️ Righteousness means an offering matching the heart

📖 The fix was the people, not the ritual

# Malachi 3:4-5
# ⚖️ Pleasant Offerings And Coming Judgment
---
## Pleasant Unto The LORD

Chapter one already named the problem.

God had no pleasure in their offerings.

Pleasant here is the exact reversal of that earlier rejection.

The same altar that disgusted God will finally please Him.

Nothing about the altar itself changed.

The people bringing their gifts did.

A cleaned up heart changes how God receives an ordinary gift.

🙅 Chapter one showed God displeased

🔄 Pleasant reverses that earlier rejection

🪨 The altar did not change

📖 A changed heart changes the gift

## As In The Days Of Old

This phrase looks back to an earlier time when worship actually honored God.

The text does not name an exact date or king for that golden age.

Many scholars point to the reigns of David or Solomon as the likely picture.

The exact year matters less than the pattern.

True worship happened once, and it can happen again.

Hope in scripture often points backward before it points forward.

🕰️ Looks back to an earlier faithful era

❓ No exact date is named here

👑 Many point to David or Solomon's reign

📖 True worship happened before, it can return

## I Will Come Near To You To Judgment

Judgment is not pictured here as a distant courtroom.

God says He is coming near, right into the middle of their lives.

That nearness should have felt like relief for the honest and dread for the guilty.

Both reactions are correct at the same time.

Closeness to God is never a neutral thing.

⚖️ Judgment is not a distant courtroom

🚶 God comes near, not far away

🎭 Nearness means relief for some, dread for others

📖 Closeness to God is never neutral

## A Swift Witness

A witness in court testifies to what actually happened.

Swift here means the testimony comes quickly, with no long delay.

God is not describing a slow trial with years of appeals.

He already knows the truth and is ready to state it.

Certainty, not speed for its own sake, is the real point.

⚡ Swift means quick, not slow

🧑‍⚖️ A witness testifies to what happened

🚫 Not a trial with years of appeals

📖 God already knows the truth

## The Hireling In His Wages

A hireling is a day laborer, paid at the end of each work day.

Mosaic law required that payment before sundown, not weeks later.

Withholding a poor worker's wages left him unable to buy food that night.

God lists this specific sin alongside sorcery and adultery, not as something smaller.

Economic cruelty matters to God as much as ritual sin does.

💰 A hireling is a paid day laborer

🌇 Law required payment before sundown

🍞 Unpaid wages meant no food that night

📖 God ranks this with sorcery and adultery

## The Widow, And The Fatherless

These two groups had no husband or father to earn income or defend them legally.

Mosaic law repeatedly commands special protection for exactly these two groups.

Oppressing them was treated as one of the clearest tests of real faith.

Isaiah and James, centuries apart, both repeat this same concern.

God measures a society by how it treats people who cannot fight back.

👩 Widows had no husband to provide

🧒 The fatherless had no father to provide

⚖️ Law demanded their special protection

📖 God judges by how the weak are treated

## Turn Aside The Stranger From His Right

Stranger here means a foreigner living among Israel without family land or status.

These foreigners could easily be cheated since they had no local protector.

The law gave them specific legal rights anyway.

That included equal treatment under Israel's own courts.

Turning them aside means denying a foreigner the fair hearing the law promised.

Justice in Israel was never meant to be only for citizens.

🌍 Stranger means a foreigner with no protector

📜 The law still gave them real rights

🚫 Turning them aside meant denying fair treatment

📖 Justice was never only for citizens

# Malachi 3:6-7
# 🔄 I Change Not
---
## I Am The LORD, I Change Not

God names His own unchanging nature as the reason anything survives at all.

If God shifted the way people do, Israel would already be gone.

The covenant had been broken often enough to justify that.

His character stays fixed even while human faithfulness rises and falls.

This is not a cold fact.

It is the reason mercy keeps showing up.

🔄 God names His own unchanging nature

💔 Israel broke the covenant enough to deserve judgment

🛡️ His fixed character held the relationship together

📖 Unchanging mercy explains their survival

## Sons Of Jacob Are Not Consumed

Consumed means wiped out completely, the way fire burns something to nothing.

Jacob's descendants deserved that outcome many times over across their history.

Chapter two alone listed broken covenants, corrupt priests, and faithless marriages.

They are still here only because God did not act the way they acted.

Survival itself is evidence of God's own unchanging promise, not their own record.

🔥 Consumed means wiped out completely

📜 Their history earned that outcome many times

🛡️ They survived because of God, not themselves

📖 Survival proves His unchanging promise

## Gone Away From Mine Ordinances

Ordinances means the specific commands God gave His people to live by.

This pattern of ignoring them did not start with this generation.

The text says it reaches back to the days of your fathers.

Rebellion here is generational, inherited like a family habit no one questioned.

Naming a problem as old does not make it any less serious.

📜 Ordinances means God's specific commands

🔁 This pattern goes back generations

👨‍👨‍👦 Inherited like an unquestioned family habit

📖 Being old does not make it less serious

## Return Unto Me, And I Will Return Unto You

This is not a cold legal demand.

It reads like an open invitation.

God offers to meet them exactly as far as they are willing to come.

Return here means more than feeling sorry.

It means actually changing direction.

The offer stays open even after generations of the pattern just described.

God's patience outlasts their track record every single time.

🤝 This reads as an invitation, not a demand

🔄 Return means changing direction, not just feeling sorry

⏳ The offer stays open after generations of failure

📖 God's patience outlasts their track record

## Wherein Shall We Return?

This question sounds innocent, but it is really a denial.

They are asking God to prove they ever left in the first place.

This exact pattern repeats throughout Malachi, a charge met with a defensive question.

Chapter one asked wherein have we despised, and this chapter keeps asking the same shape of question.

Pretending confusion is easier than admitting the obvious.

❓ Sounds innocent, but it is a denial

🙈 They ask God to prove they ever left

🔁 The same defensive pattern repeats all through Malachi

📖 Pretending confusion dodges the obvious truth

# Malachi 3:8-12
# 💰 Robbing God Through Tithes
---
## Will A Man Rob God?

This question sounds absurd on purpose.

Nobody pictures themselves literally robbing God.

The shock is intentional.

It forces people to actually listen.

Robbery means taking something that rightfully belongs to someone else.

What follows names exactly how they had done it without noticing.

😲 The question sounds absurd on purpose

👂 Shock forces people to listen

🫳 Robbery means taking what belongs to another

📖 What follows names exactly how they did it

## Wherein Have We Robbed Thee?

This is the same defensive pattern already seen earlier in the book.

Chapter one already asked wherein have we despised.

Chapter two raised a similar denial of its own.

Now the exact same denial returns around the subject of money.

Claiming innocence was easier than opening the ledger and checking it.

The very next line answers their question directly and plainly.

🔁 The same denial pattern as before

📜 Chapter one and two already did this

💸 This time the denial is about money

📖 The very next line answers it directly

## In Tithes And Offerings

A tithe means a tenth, one part out of every ten of a person's harvest or income.

The law set this amount aside to support the priests and the Levites.

Those two tribes had no farmland inheritance of their own to live on.

Offerings cover additional gifts given beyond that required tenth.

Withholding the tithe left the very people who served the temple without support.

🔟 Tithe means one tenth of income

👨‍👦 It supported priests and Levites directly

🌾 Levites had no farmland of their own

📖 Withholding it left temple workers unsupported

## Ye Are Cursed With A Curse

Hebrew often repeats a word for emphasis instead of adding a new word.

Cursed with a curse means completely and thoroughly cursed, no partial version.

This was not one person's penalty.

The whole nation shared it together.

A shared sin among the people produced a shared consequence for everyone.

🔁 Hebrew repeats words for emphasis

💯 This means completely and thoroughly cursed

🌍 The whole nation shared this, not one person

📖 Shared sin produced a shared consequence

## Bring Ye All The Tithes Into The Storehouse

The storehouse was a real physical room attached to the temple complex.

Grain, wine, and oil were stored there for the priests and Levites to use.

Bringing it required actual effort, not just a feeling of generosity.

God ties an obedience that can be measured to a blessing that can be tested.

🏬 Storehouse was a real temple storage room

🌾 Grain, wine, and oil were stored there

💪 Bringing it required real, measurable effort

📖 Measurable obedience meets a measurable blessing

## The Windows Of Heaven

This exact phrase appears earlier in Genesis, describing the floodgates that opened for Noah's flood.

There it pictured overwhelming destruction pouring down on the earth.

Here the same picture gets used for overwhelming blessing instead.

The same force that once brought judgment can also bring abundance.

God is not limited to one use for His own power.

🌊 This phrase first appeared at Noah's flood

💥 There it pictured overwhelming destruction

🌧️ Here it pictures overwhelming blessing instead

📖 The same power can judge or bless

## Prove Me Now Herewith

God rarely invites people to test Him directly anywhere else in scripture.

Herewith means specifically through this one act, bringing the full tithe.

This is not a blank promise to test God about anything at all.

The test stays narrow and specific.

It is tied to one clear act of obedience.

🧪 God rarely invites a direct test like this

🎯 Herewith means through this one specific act

🚫 Not a blank promise to test anything

📖 Obedience and blessing are tied together here

## I Will Rebuke The Devourer

The devourer most likely refers to locusts or insects that destroyed crops.

These pests could wipe out an entire year's harvest within days.

God promises to personally rebuke that threat on the people's behalf.

Protection, not just one blessing, becomes part of the same promise.

🦗 Devourer likely means locusts or crop pests

🌾 Pests could wipe out a whole harvest

🛡️ God promises to rebuke that threat Himself

📖 Protection joins blessing in this one promise

## All Nations Shall Call You Blessed

This promise reaches far beyond Israel's own borders.

Other nations were meant to notice and comment on what they saw.

This echoes God's original promise to Abraham, that his family would bless the whole earth.

Obedience was never meant to stay private between Israel and God alone.

🌍 This promise reaches beyond Israel itself

👀 Other nations were meant to notice

📜 This echoes God's original promise to Abraham

📖 Obedience was never meant to stay private

## A Delightsome Land

Delightsome means genuinely pleasant to look at and live in.

The same land once threatened with a curse is pictured here as thriving instead.

This closes the whole tithe section on contrast, not just promise.

What was cursed and empty becomes delightful and full.

🌸 Delightsome means genuinely pleasant to live in

🔄 Cursed land is pictured as thriving instead

⚖️ Closes the section on real contrast

📖 Cursed and empty becomes delightful and full

# Malachi 3:13-15
# 🗣️ Stout Words Against God
---
## Your Words Have Been Stout Against Me

Stout here means harsh, defiant, and full of attitude, not simply loud.

God is quoting their own private complaints back to them directly.

They likely never expected those words to actually reach His ears.

Nothing spoken in private stays hidden from God.

🗣️ Stout means harsh and defiant

👂 God quotes their private words back

🤫 They never expected Him to hear it

📖 Nothing stays hidden from God

## What Have We Spoken So Much Against Thee?

This is the same defensive pattern already seen earlier in the book.

Chapter one already asked wherein have we despised.

Chapter two raised a similar denial of its own.

Now the exact same denial returns around their own complaining.

Repeating the pattern this many times removes any excuse of ignorance.

🔁 At least the fourth denial in this book

📜 Chapters one, two, and three all repeat it

🎭 Practiced confusion follows every charge

📖 Repetition removes any excuse of ignorance

## It Is Vain To Serve God

Vain here means pointless, a complete waste of effort.

This complaint says obedience brought no visible reward at all.

The people are measuring faith the way they would measure a business deal.

Faith built only on visible payoff collapses the moment payoff disappears.

🙅 Vain means pointless and a waste

💼 They measure faith like a business deal

📉 No visible payoff felt like proof

📖 Faith needs more than visible payoff

## Walked Mournfully Before The LORD

This likely describes visible mourning practices done as part of worship.

That could include fasting, rough clothing, or a generally somber posture.

They are saying even their sadness and sacrifice changed nothing.

Going through religious motions is not the same as a changed heart.

😔 Mournfully means visible, somber worship practices

🥗 This likely included fasting and rough clothing

🤷 They felt their sacrifice changed nothing

📖 Motions differ from a changed heart

## We Call The Proud Happy

This is the same bitter question Job and the Psalms both wrestle with.

Why does arrogance so often look like it is winning.

The faithful were doing everything right and seeing none of the reward.

Watching that gap grow can quietly poison real faith over time.

❓ The same question Job and Psalms ask

🏆 Arrogance often looks like it is winning

😞 The faithful saw none of the reward

📖 Watching that gap can poison real faith

## They That Tempt God Are Even Delivered

Tempt here means to test or provoke God on purpose.

These are not accidental sinners.

They deliberately push the limits on purpose.

From where the people stood, even that defiance seemed to pay off.

Chapter three answers this exact complaint before the chapter even ends.

😤 Tempt means testing or provoking God

🎯 Not accidental sin, but deliberate defiance

👀 Defiance looked like it was paying off

📖 This chapter answers that complaint directly

# Malachi 3:16-18
# 📖 The Book Of Remembrance
---
## They That Feared The LORD Spake Often One To Another

While others complained bitterly, a smaller group encouraged each other quietly.

Fearing the LORD means holding Him in deep reverence, not being afraid of Him.

This is the first mention of any faithful remnant in the whole book.

Faithful people often need each other's encouragement to keep going.

🤝 A faithful remnant encouraged each other

🙏 Fearing the LORD means deep reverence

🌱 The first remnant named in this book

📖 Faithful people need each other's encouragement

## The LORD Hearkened, And Heard It

Hearkened means God paid close, active attention, not passive overhearing.

Their quiet conversation might have seemed small to everyone else.

God names it as something He deliberately listened to and heard.

Nothing spoken in faith goes unnoticed.

The same is true of every complaint from earlier in the chapter.

👂 Hearkened means active, deliberate attention

🤏 Their talk seemed small to everyone else

✅ God names it as heard and noticed

📖 Nothing spoken in faith goes unnoticed

## A Book Of Remembrance

Ancient kings kept official chronicles recording loyal service and important events.

This verse pictures God keeping that same kind of royal record.

Every quiet, faithful conversation gets written down and remembered on purpose.

Nobody praised these people publicly, but God still kept the record.

📚 Kings kept official chronicles of events

👑 God is pictured keeping a royal record

✍️ Quiet faithfulness gets written down anyway

📖 No public praise, but God still remembers

## They Shall Be Mine

This is simple, direct ownership language.

God claims this faithful group as personally His own.

Belonging to God was the real reward, bigger than any visible blessing.

Everything this chapter chased after started with this one simple claim.

🙌 Direct, simple ownership language here

❤️ God claims them as His own

🎁 Belonging to God was the real reward

📖 One simple claim anchors the whole promise

## When I Make Up My Jewels

Jewels here pictures a treasured, carefully collected personal possession.

The imagery suggests something valuable being gathered and counted with real care.

God is not describing property, He is describing a treasured people.

Being valued this way answers the earlier complaint that faithfulness earned nothing.

💎 Jewels means a treasured possession

🧮 Gathered and counted with real care

❤️ God treasures people, not just property

📖 This answers the complaint that faithfulness earned nothing

## As A Man Spareth His Own Son

Sparing here pictures a father choosing mercy over deserved punishment.

Every son fails his father at some point, yet fathers rarely give up.

God compares His own mercy to that same ordinary, fatherly compassion.

Mercy is not a loophole here.

It is pictured as a father's instinct.

👨‍👦 Sparing means mercy over deserved punishment

💔 Every son fails, yet fathers rarely quit

❤️ God compares His mercy to a father's

📖 Mercy here is instinct, not a loophole

## Discern Between The Righteous And The Wicked

This final verse directly answers the complaint raised back in verse fifteen.

The people said the wicked seemed to prosper with no real difference showing.

God promises a day when that difference becomes completely unmistakable.

The whole chapter has been building toward exactly this moment of clarity.

What looks confused and unfair now will not stay that way forever.

⚖️ This answers the complaint from verse fifteen

👀 No visible difference seemed to exist before

✨ God promises an unmistakable difference ahead

📖 Confusion now does not mean confusion forever
`.trim();

export const MALACHI_THREE_PERSONAL_SECTIONS = parseMalachiThreeRawNotes(MALACHI_THREE_RAW_NOTES);
