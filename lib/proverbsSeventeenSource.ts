export type ProverbsSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsSeventeenRawNotes(rawText: string): ProverbsSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 17:${startVerse}` : `Proverbs 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 17 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_SEVENTEEN_RAW_NOTES = `# Proverbs 17:1-5
# 🔥 Quietness, A Tested Heart, And Mocking The Poor
---
## 🍞 Better Is A Dry Morsel, And Quietness Therewith

"Morsel" means a small plain piece of food.

This proverb weighs peace against comfort, not food.

A dry morsel eaten in quiet wins here.

Bare provision with peace is treated as real wealth.

🍞 Morsel means small plain food

🕊️ The proverb weighs peace against comfort

🤫 A quiet dry morsel wins here

📖 Peace with little is real wealth

## 🏠 Than An House Full Of Sacrifices With Strife

This does not mean the sacrifices caused the problem.

"Sacrifices" points to a home with plenty, even religious plenty.

Strife inside that home is shown ruining the abundance.

A full table cannot fix constant fighting around it.

🏠 Sacrifices means a home with plenty

⚔️ Strife ruins that same abundance

🍽️ A full table cannot fix fighting

📖 Peace matters more than a full house

## 👤 A Wise Servant Shall Have Rule Over A Son That Causeth Shame

In this culture a servant normally ranked below a son.

This verse describes a reversal that would surprise the first readers.

A wise servant's character is shown outweighing a low position.

Shameful behavior can cost even a son his expected place.

👤 A servant normally ranked below a son

😮 This reversal would surprise the first readers

🏆 Character outweighs a low starting position

📖 Shame can cost a son his place

## 📜 And Shall Have Part Of The Inheritance Among The Brethren

"Inheritance" means a real legal share of the family estate.

This is not just honor, it names actual property changing hands.

A wise servant is pictured receiving what a shamed son forfeits.

Wisdom is shown reaching into a family's actual standing.

📜 Inheritance means a real share of the estate

💰 This is property, not just honor

🔁 A wise servant receives what a son forfeits

📖 Wisdom can change a person's family standing

## 🔥 The Fining Pot Is For Silver, And The Furnace For Gold

A "fining pot" was a small clay vessel used to purify silver.

Intense heat burned away the impurities in the raw metal.

Silver and gold both needed this same refining process.

Precious metal only reached its true value after the fire.

🔥 Fining pot means a vessel for purifying silver

♨️ Heat burned away the metal's impurities

🥇 Gold needed the same refining process

📖 True value came only after the fire

## 🔍 But The LORD Trieth The Hearts

"Trieth" means tests closely, the same way fire tests metal.

This verse compares a furnace refining metal to God refining a person.

A person's heart is shown undergoing that same kind of test.

Nothing false inside a person stays hidden from that test.

🔍 Trieth means tests closely like fire

🫀 God is shown refining a person's heart

🚫 Nothing false stays hidden from that test

📖 God tests hearts the way fire tests metal

## 👂 A Wicked Doer Giveth Heed To False Lips

"Giveth heed" means listens closely and pays real attention.

This describes a wicked person choosing to listen to lies.

The wicked are shown here as willing consumers of falsehood.

What a person chooses to hear reveals what they already are.

👂 Giveth heed means listens closely

😈 A wicked person chooses to hear lies

🎯 The wicked are willing consumers of falsehood

📖 What someone hears reveals who they are

## 📛 And A Liar Giveth Ear To A Naughty Tongue

"Naughty" in this older English means wicked, not mischievous.

"Naughty tongue" describes speech meant to cause real damage.

This verse pairs the wicked listener with a liar as speaker.

Dishonest people are shown drawn toward other dishonest voices.

📛 Naughty here means wicked, not mischievous

🗣️ Naughty tongue means harmful speech

🔗 This pairs the listener with a liar

📖 Dishonest people are drawn to dishonest voices

## 😏 Whoso Mocketh The Poor Reproacheth His Maker

"Mocketh" means makes fun of with real contempt.

This verse ties mocking the poor directly to insulting God.

Every poor person was made by God, the same as anyone.

Contempt for the poor is treated as an attack on their Maker.

😏 Mocketh means makes fun of with contempt

🎯 Mocking the poor insults God directly

🙌 Every poor person was made by God

📖 Contempt for the poor attacks their Maker

## 💥 And He That Is Glad At Calamities Shall Not Be Unpunished

"Calamities" means disasters or serious misfortunes that fall on someone.

This describes a person who feels joy at another's suffering.

That reaction is treated as a real offense, not a small flaw.

God is shown holding people accountable for enjoying others' pain.

💥 Calamities means disasters or serious misfortune

😀 This describes joy at another's suffering

⚠️ That reaction is a real offense

📖 God holds people accountable for enjoying pain

# Proverbs 17:6-10
# 👑 Honor, Fitting Speech, And A Covered Fault
---
## 👑 Children's Children Are The Crown Of Old Men

A "crown" here pictures something worn with pride and honor.

Grandchildren are shown as that same honor for an elderly person.

This culture valued a large, thriving family across generations.

Seeing grandchildren was treated as a reward for a long life.

👑 Crown pictures something worn with honor

👶 Grandchildren are an elder's honor

👪 A thriving family across generations was valued

📖 Grandchildren were a reward for a long life

## 🔄 And The Glory Of Children Are Their Fathers

This half turns the honor in the opposite direction.

A child's own "glory" is tied here to their father.

A respected father passed real honor down to his children.

Family honor in this proverb moves in both directions.

🔄 This half turns honor the other way

🧑 A child's glory ties to their father

🏅 A respected father passed honor to children

📖 Family honor moved in both directions

## 👔 Excellent Speech Becometh Not A Fool

"Becometh" means fits or suits, like clothing matching its wearer.

Fine, eloquent speech is shown as a poor fit for a fool.

Words that sound wise ring false coming from a foolish life.

Speech is expected to match the character behind it.

👔 Becometh means fits or suits

🗣️ Fine speech is a poor fit

🎭 Wise sounding words ring false from a fool

📖 Speech is expected to match character

## 👑 Much Less Do Lying Lips A Prince

A "prince" here means a ruler or someone in authority.

This verse moves from a lesser case to a worse one.

If excellent speech misfits a fool, lying misfits a leader more.

A leader's word was expected to be trustworthy above all else.

👑 Prince means a ruler or leader

📈 This moves from a lesser case to worse

🚫 Lying misfits a leader even more

📖 A leader's word was expected to be trustworthy

## 💎 A Gift Is As A Precious Stone In The Eyes Of Him That Hath It

"Gift" in Proverbs often describes a payment given to gain favor.

The giver treats it like a valuable jewel, powerful and prized.

This line describes how a briber sees his own gift.

The verse observes a common belief rather than approving it.

💎 Gift often describes a payment for favor

😍 The giver treats it like a prized jewel

👀 This shows how the giver sees it

📖 The verse observes a belief, not approves it

## 🧭 Whithersoever It Turneth, It Prospereth

This line describes how bribery often seems to work.

"Whithersoever" means wherever the gift is used or turned.

The verse notes a gift's real world effect, not its rightness.

Proverbs elsewhere condemns this same practice as corrupt.

🧭 Whithersoever means wherever it is used

🍀 The gift often seems to succeed

👁️ The verse notes effect, not rightness

📖 Proverbs elsewhere condemns bribery as corrupt

## 🤲 He That Covereth A Transgression Seeketh Love

"Covereth" means chooses to overlook a wrong instead of exposing it.

This is not the same as pretending nothing happened.

Letting a small offense go is shown as an act of love.

Real friendship absorbs some faults instead of broadcasting every one.

🤲 Covereth means chooses to overlook a wrong

🚫 This is not pretending nothing happened

💗 Letting an offense go is loving

📖 Friendship absorbs faults instead of broadcasting them

## 🔁 But He That Repeateth A Matter Separateth Very Friends

"Repeateth a matter" means bringing up an old offense again.

"Very friends" means close friends who trusted each other deeply.

Constant reminders of a past wrong are shown breaking that trust.

The same offense can heal or destroy a friendship depending on how it is handled.

🔁 Repeateth a matter means old offenses again

🤝 Very friends means people who trusted deeply

💔 Reminders of old wrongs break that trust

📖 How an offense is handled matters most

## 🗣️ A Reproof Entereth More Into A Wise Man

"Reproof" means correction, a spoken warning about wrong behavior.

"Entereth" pictures the correction actually sinking in and taking hold.

A wise person is shown absorbing correction quickly and deeply.

One honest word can do real work in a ready heart.

🗣️ Reproof means spoken correction

🎯 Entereth pictures correction sinking in

🧠 A wise person absorbs correction quickly

📖 One honest word can do real work

## ⛓️ Than An Hundred Stripes Into A Fool

"Stripes" means physical blows, a harsh ancient punishment.

A fool is shown resisting even repeated, painful correction.

Words reach a willing heart faster than pain reaches a closed one.

Willingness to listen matters more than how hard a lesson lands.

⛓️ Stripes means physical blows as punishment

🚧 A fool resists even repeated pain

👂 Words reach a willing heart faster

📖 Willingness matters more than the lesson's force

# Proverbs 17:11-14
# 💧 Rebellion, A Robbed Bear, And Strife Let Loose
---
## 🎯 An Evil Man Seeketh Only Rebellion

"Seeketh only" means this is his main pursuit, not a lapse.

Rebellion here points to open defiance against authority and order.

This describes a settled pattern of life, not one bad choice.

Some people build their whole direction around resisting authority.

🎯 Seeketh only means his main pursuit

⚔️ Rebellion means open defiance of authority

🔁 This is a settled pattern, not one choice

📖 Some build their life around resisting authority

## 📨 Therefore A Cruel Messenger Shall Be Sent Against Him

"Cruel messenger" likely pictures a harsh agent of punishment.

This could describe an enemy, an official, or trouble itself.

Rebellion is shown here as inviting real consequence, not escape.

The verse links a chosen path to what eventually meets it.

📨 Cruel messenger pictures a harsh agent

🎭 It could be an enemy or trouble itself

⚠️ Rebellion invites real consequence, not escape

📖 A chosen path leads to what meets it

## 🐻 Let A Bear Robbed Of Her Whelps Meet A Man

A bear robbed of her cubs was a known picture of raw danger.

Such a bear would attack without warning and without mercy.

This proverb uses that fear to set up a worse comparison.

The reader is meant to feel danger before the next line lands.

🐻 A robbed bear pictured raw danger

⚠️ It would attack without warning

📈 This sets up an even worse comparison

📖 The reader feels danger before the point

## 🃏 Rather Than A Fool In His Folly

"Folly" means foolish, reckless behavior acted out in the moment.

A fool caught in folly is ranked more dangerous than a wild bear.

An animal's danger is at least predictable and understandable.

A fool's foolishness is shown here as unpredictable in a worse way.

🃏 Folly means reckless behavior in the moment

😬 A fool in folly outranks a wild bear

🐾 An animal's danger is at least predictable

📖 A fool's unpredictability is the worse danger

## 🔄 Whoso Rewardeth Evil For Good

"Rewardeth evil for good" means answering kindness with harm on purpose.

This describes betraying someone who had actually helped you.

It is treated as a serious inversion of how relationships work.

Paying back good with harm breaks a basic rule of decency.

🔄 Rewardeth evil for good means betraying kindness

🤝 This describes betraying someone who helped you

⚠️ It inverts how relationships should work

📖 Paying harm for good breaks basic decency

## 🏠 Evil Shall Not Depart From His House

This warns that such betrayal invites lasting trouble in return.

"His house" means his household and his ongoing life.

Evil is pictured here settling in rather than passing through.

Choices made toward others tend to circle back into a person's own life.

🏠 His house means the household and ongoing life

🐌 Evil is pictured settling in, not passing

🔁 Choices toward others circle back

📖 Betrayal invites lasting trouble in return

## 💧 The Beginning Of Strife Is As When One Letteth Out Water

"Letteth out water" pictures breaking a small hole in a dam.

A tiny leak can quickly widen into a flood no one stops.

Strife is compared here to that same small, growing break.

An argument often looks small and harmless right at its start.

💧 Letteth out water pictures breaking a dam

🌊 A tiny leak can widen into a flood

⚔️ Strife is compared to that same break

📖 An argument often looks small at first

## 🚪 Therefore Leave Off Contention, Before It Be Meddled With

"Meddled with" means stirred up further or gotten deeply involved in.

The wise move is shown as walking away early, not winning.

Once a conflict fully breaks open it becomes far harder to stop.

Timing matters more than being right when strife is just beginning.

🚪 Meddled with means stirred up further

🚶 Walking away early beats winning the fight

🌊 A fully open conflict is hard to stop

📖 Timing matters more than being right

# Proverbs 17:15-19
# 🤝 Twisted Judgment, A Friend At All Times, And Risky Surety
---
## ⚖️ He That Justifieth The Wicked, And He That Condemneth The Just

"Justifieth" means declares innocent, a term from the courtroom.

"Condemneth" means declares guilty, the opposite legal verdict.

This names two opposite kinds of corrupt judgment in one line.

Both errors twist the truth about who actually did right.

⚖️ Justifieth means declares innocent

🔨 Condemneth means declares guilty

🔄 This names two opposite corrupt judgments

📖 Both twist the truth about right and wrong

## 💔 Even They Both Are Abomination To The LORD

"Abomination" means something God finds deeply offensive.

Both errors are placed on the exact same level here.

Letting the guilty go free is treated as seriously as punishing the innocent.

God's standard for justice does not bend toward either side.

💔 Abomination means deeply offensive to God

⚖️ Both errors are placed on the same level

🚫 Freeing the guilty is as serious as punishing

📖 God's standard for justice does not bend

## 💰 Wherefore Is There A Price In The Hand Of A Fool To Get Wisdom

"Price" here likely means money set aside to pay a teacher.

The question pictures a fool who could actually afford real instruction.

Having the means to learn is shown as no guarantee of learning.

Money alone was never enough to buy actual wisdom.

💰 Price means money to pay for instruction

🃏 The fool here could afford instruction

🚫 Having the means is no guarantee of learning

📖 Money alone could never buy wisdom

## 🫀 Seeing He Hath No Heart To It

"No heart to it" means no real desire to learn.

The fool's problem is shown as desire, not opportunity.

A person can sit in front of wisdom and still walk away empty.

Willingness matters more than access when it comes to real learning.

🫀 No heart to it means no real desire

🚧 The problem is desire, not opportunity

🚶 A person can sit near wisdom empty

📖 Willingness matters more than access

## ⏳ A Friend Loveth At All Times

"At all times" rules out love that comes and goes.

Real friendship is described here as constant, not seasonal.

A friend who only shows up when things are easy fails this test.

This line sets a high, steady standard for friendship.

⏳ At all times rules out convenient love

🔁 Real friendship is constant, not seasonal

🚫 Fair weather friendship fails this test

📖 This sets a high standard for friendship

## 🌧️ And A Brother Is Born For Adversity

"Adversity" means hardship, trouble, or difficult circumstances.

This half describes family bonds proving themselves in hard times.

A brother's real value is shown appearing most clearly during trouble.

The verse pairs constant friendship with family loyalty tested by crisis.

🌧️ Adversity means hardship or difficult circumstances

🫂 Family bonds prove themselves in hard times

💪 A brother's value shows most in trouble

📖 This pairs constant friendship with tested loyalty

## 🤝 A Man Void Of Understanding Striketh Hands

"Striketh hands" was an ancient gesture sealing a financial agreement.

It worked much like signing a contract does today.

"Void of understanding" means someone acting without real thought.

This person is shown sealing a deal without weighing the risk.

🤝 Striketh hands sealed a financial agreement

📝 It worked like signing a contract today

🃏 Void of understanding means acting without thought

📖 This person seals a deal without weighing risk

## 📜 And Becometh Surety In The Presence Of His Friend

"Surety" means becoming legally responsible for another person's debt.

Doing this for a friend, in front of them, made refusal feel awkward.

Proverbs repeatedly warns against this exact kind of risky promise.

Social pressure is shown here pushing people past what wisdom would allow.

📜 Surety means legally responsible for someone's debt

🙈 Refusing felt awkward in front of a friend

⚠️ Proverbs repeatedly warns against this promise

📖 Social pressure can override wisdom

## ⚖️ He Loveth Transgression That Loveth Strife

"Transgression" means sin, a real crossing of a moral line.

Loving strife is shown here as more than a personality quirk.

A person who enjoys conflict is described as loving sin itself.

Strife and sin are tied together closely in this verse.

⚖️ Transgression means sin, a crossing of a line

😈 Loving strife is more than a quirk

🔗 Enjoying conflict is tied to loving sin

📖 Strife and sin are linked closely here

## 🚪 And He That Exalteth His Gate Seeketh Destruction

"Gate" likely pictures a grand entrance built to display wealth.

"Exalteth his gate" means building it unusually high or impressive.

This describes pride expressed through visible display, not just words.

Reaching for that kind of status is shown inviting real ruin.

🚪 Gate pictures a grand entrance for display

📈 Exalteth his gate means building it impressive

👀 This is pride shown through display

📖 Reaching for status this way invites ruin

# Proverbs 17:20-24
# 💊 A Merry Heart, A Hidden Bribe, And Wandering Eyes
---
## 😠 He That Hath A Froward Heart Findeth No Good

"Froward" means stubbornly contrary, twisted away from what is right.

This describes a settled condition of the heart, not one mood.

A crooked inner life is shown producing no real good outcome.

The heart's condition is treated as the source of a person's results.

😠 Froward means stubbornly contrary and twisted

🫀 This is a settled heart condition

🚫 A crooked heart produces no real good

📖 The heart shapes a person's results

## 🌀 And He That Hath A Perverse Tongue Falleth Into Mischief

"Perverse" means twisted away from truth and honesty.

This pairs a crooked heart from before with crooked speech here.

"Mischief" means real trouble or harm, not a small prank.

Twisted speech is shown leading its own speaker into trouble.

🌀 Perverse means twisted away from truth

🔗 This pairs a crooked heart with speech

⚠️ Mischief means real trouble, not a prank

📖 Twisted speech leads its speaker into trouble

## 👶 He That Begetteth A Fool Doeth It To His Sorrow

"Begetteth" means fathers or brings a child into the world.

This describes the ongoing grief of raising a foolish child.

The sorrow named here is not a moment but a lasting weight.

Parenting a fool is treated honestly as a real, lasting sorrow.

👶 Begetteth means fathers a child

😢 This describes ongoing grief over the child

⏳ The sorrow is lasting, not one moment

📖 Parenting a fool is a real weight

## 🔁 And The Father Of A Fool Hath No Joy

This half restates the same idea from a different angle.

"No joy" means the normal happiness of parenting is missing.

Hebrew poetry often repeats a truth twice for emphasis.

Foolishness in a child is shown touching a parent's whole life.

🔁 This restates the same idea again

😔 No joy means normal happiness is missing

📢 Hebrew poetry repeats truth for emphasis

📖 A child's folly touches a parent's life

## 💊 A Merry Heart Doeth Good Like A Medicine

This verse compares real joy directly to a healing medicine.

Ancient people connected emotional state closely to physical health.

A cheerful heart is shown here doing genuine good to the body.

Joy is treated as more than a feeling, it works like treatment.

💊 Joy is compared directly to medicine

🫀 Emotional state was tied to physical health

💪 A cheerful heart does real good

📖 Joy works like real treatment, not feeling

## 💔 But A Broken Spirit Drieth The Bones

"Broken spirit" means deep discouragement or crushed hope.

"Drieth the bones" pictures the whole body losing strength.

"Bones" here stands for a person's overall physical vitality.

Despair is shown draining a person the way illness would.

💔 Broken spirit means deep discouragement

🦴 Bones stands for overall physical vitality

📉 Drieth the bones pictures losing strength

📖 Despair drains a person like illness

## 👘 A Wicked Man Taketh A Gift Out Of The Bosom

"Bosom" here means the fold of a garment used as a pocket.

A gift taken from there pictures a bribe passed secretly.

This describes a deliberate, concealed act, not an open payment.

The secrecy itself signals that both parties knew it was wrong.

👘 Bosom means a hidden garment pocket

🤫 A hidden gift pictures a secret bribe

🎯 This is deliberate concealment, not an open act

📖 The secrecy shows both sides knew wrong

## 🌀 To Pervert The Ways Of Judgment

"Pervert" means twist or bend away from what is fair.

"Ways of judgment" means the normal process of deciding a case.

A bribe is shown here corrupting justice at its source.

The bribe does not just favor one side, it breaks the system.

🌀 Pervert means twist away from what is fair

⚖️ Ways of judgment means the process of deciding

💸 A bribe corrupts justice at its source

📖 A bribe breaks the whole system

## 👀 Wisdom Is Before Him That Hath Understanding

"Before him" pictures wisdom staying in clear, close view.

A person with real understanding keeps wisdom as an immediate focus.

This is not wisdom hidden far away or hard to find.

Understanding keeps its attention fixed on what is actually useful.

👀 Before him pictures wisdom in clear view

🎯 Understanding keeps wisdom as an immediate focus

📍 This is not wisdom far away or hidden

📖 Understanding stays fixed on what is useful

## 🌍 But The Eyes Of A Fool Are In The Ends Of The Earth

"Ends of the earth" pictures attention scattered on faraway things.

A fool is shown chasing distractions instead of what is near.

This contrasts sharply with the focused understanding just described.

Wandering attention is treated here as its own kind of foolishness.

🌍 Ends of the earth pictures scattered attention

🎈 A fool chases faraway distractions

🔄 This contrasts the focused understanding above

📖 Wandering attention is its own foolishness

# Proverbs 17:25-28
# 🤐 A Foolish Son's Grief, And Words Held Back
---
## 😢 A Foolish Son Is A Grief To His Father

"Grief" means deep, lasting sorrow, not a passing annoyance.

This verse returns to the same weight named earlier in the chapter.

A father's sorrow over a foolish child is treated as genuine.

The Bible does not soften how much a child's folly can cost a parent.

😢 Grief means deep lasting sorrow

🔁 This returns to a theme from earlier

🫀 A father's sorrow here is genuine

📖 A child's folly costs a parent deeply

## 👶 And Bitterness To Her That Bare Him

"Bare him" means gave birth to him, naming the mother.

"Bitterness" means a sharp, lasting emotional pain.

This verse names both parents, not just the father alone.

A mother's particular pain over a foolish child is honored here by name.

👶 Bare him means gave birth to him

💔 Bitterness means sharp lasting pain

👩 Both parents are named, not just the father

📖 A mother's pain is honored here by name

## ⚖️ Also To Punish The Just Is Not Good

"The just" means people who have actually done what is right.

Punishing someone innocent is named here as a clear moral failure.

This verse pairs with an earlier warning against condemning the just.

Justice fails completely the moment it turns against the innocent.

⚖️ The just means people who did right

🚫 Punishing the innocent is a clear failure

🔗 This pairs with an earlier warning

📖 Justice fails when it turns on the innocent

## ⚖️ Nor To Strike Princes For Equity

"Equity" here means fairness, doing what is right and just.

This describes punishing a leader specifically for doing right.

Such an act would punish the very virtue a ruler should have.

A just system cannot survive punishing the people who uphold it.

⚖️ Equity means fairness and doing right

👑 This punishes a leader for doing right

🚫 It punishes the virtue a ruler should have

📖 A system cannot survive punishing its own justice

## 🤐 He That Hath Knowledge Spareth His Words

"Spareth his words" means holds back from speaking more than necessary.

Real knowledge is shown producing restraint, not endless talking.

A person confident in what they know rarely needs to prove it loudly.

Few careful words often carry more weight than many careless ones.

🤐 Spareth his words means holding back speech

🧠 Real knowledge produces restraint, not talking

🤫 Confidence rarely needs to prove itself loudly

📖 Few careful words carry more weight

## 🕊️ And A Man Of Understanding Is Of An Excellent Spirit

"Excellent spirit" means a calm, steady, well governed disposition.

This links outward restraint in speech to an inward quality.

A cool, level temperament is shown as a mark of real understanding.

Understanding shapes not just what a person says but how they carry themselves.

🕊️ Excellent spirit means calm steady character

🔗 Restraint in speech links to inward quality

❄️ A level temperament marks real understanding

📖 Understanding shapes how a person carries themselves

## 🤫 Even A Fool, When He Holdeth His Peace, Is Counted Wise

"Holdeth his peace" means stays silent instead of speaking.

This verse gives silence real power, even for a fool.

A fool who says nothing is judged by appearance, not proven wisdom.

Silence alone can hide foolishness that speech would have exposed.

🤫 Holdeth his peace means staying silent

😮 Silence gives a fool a wise look

👀 A silent fool is judged by appearance

📖 Silence can hide what speech would expose

## 🔒 And He That Shutteth His Lips Is Esteemed A Man Of Understanding

"Shutteth his lips" repeats the same picture of chosen silence.

"Esteemed" means regarded or judged by others, whether truly deserved.

This verse closes the chapter with a plain warning about talk.

A closed mouth cannot prove wisdom, but an open one can prove folly fast.

🔒 Shutteth his lips repeats chosen silence

👥 Esteemed means regarded by others

🔁 This closes the chapter's warning about talk

📖 An open mouth can prove folly fast
`.trim();

export const PROVERBS_SEVENTEEN_PERSONAL_SECTIONS = parseProverbsSeventeenRawNotes(PROVERBS_SEVENTEEN_RAW_NOTES);
