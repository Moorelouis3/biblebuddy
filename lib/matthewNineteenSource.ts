export type MatthewNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewNineteenRawNotes(rawText: string): MatthewNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 19:${startVerse}` : `Matthew 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Matthew 19 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_NINETEEN_RAW_NOTES = `# Matthew 19:1-2
# 🚶 Jesus Leaves Galilee For Judaea
---
## 📜 When Jesus Had Finished These Sayings

This phrase closes out the teaching Jesus just finished.

"These sayings" points back to forgiveness and children in Matthew eighteen.

Matthew uses this exact closing phrase five times in his whole gospel.

Each time it marks a major shift to something new.

📜 These sayings close out chapter eighteen
🔁 Matthew repeats this phrase five times
🚩 Each time marks a major shift
➡️ New setting, same ongoing mission

## 🗺️ Coasts Of Judaea Beyond Jordan

"Coasts" here means a region or border area, not a beach.

This is the land of Judea on the far side of the Jordan River.

That area was also called Perea.

Jesus is leaving Galilee in the north and heading south toward Jerusalem.

🗺️ Coasts means a region, not a beach
🧭 This land was also called Perea
🚶 Jesus now heads toward Jerusalem
📖 His final journey has begun

## 🌊 Great Multitudes Followed Him

Crowds do not stop gathering just because Jesus changed regions.

His reputation as a healer and teacher had already spread widely.

People kept bringing their needs to him in this new place too.

🌊 Crowds follow him into new territory
📣 His reputation had already spread
🙏 People keep bringing their needs
➡️ Fame does not slow his mission

# Matthew 19:3-6
# ⚖️ Pharisees Test Him On Divorce
---
## 🕵️ Tempting Him

"Tempting" here means testing him to try to trap him in his words.

It is not about tempting him toward sin.

The Pharisees already know this question splits two rival schools of Jewish teaching.

Whatever Jesus says, one side will call it wrong.

🕵️ Tempting means testing, not seducing
⚖️ The question is a legal trap
🎓 Two rival schools already disagree
➡️ Any answer risks making an enemy

## ❓ Put Away His Wife For Every Cause

Jewish teachers at this time were split into two famous schools on divorce.

Rabbi Hillel's school allowed divorce for almost any reason.

Even something as small as burning dinner was enough for that school.

Rabbi Shammai's school allowed it only for serious unfaithfulness.

❓ Two rabbinic schools disagreed sharply
🍽️ Hillel's school allowed divorce for small reasons
🔒 Shammai's school allowed it only for unfaithfulness
📖 Jesus is asked to pick a side

## 📖 Have Ye Not Read

Jesus skips the rabbinic debate entirely.

He points the Pharisees straight back to Genesis instead.

The question was never meant to be settled by comparing two human opinions.

📖 Jesus bypasses the rabbinic debate
🌱 He points back to Genesis
🎯 Design matters more than opinion
➡️ Origins settle the real question

## 👫 Made Them Male And Female

This quotes Genesis chapter one, where God creates two distinct sexes from the start.

Marriage was never an accident or a later human invention.

It was part of God's original design for humanity.

👫 Male and female from creation
🌟 Marriage was part of the design
🚫 Not a later human invention
📖 Genesis anchors Jesus's whole answer

## 💍 Leave Father And Mother, And Shall Cleave To His Wife

This quotes Genesis chapter two, describing marriage as its own new household.

"Cleave" means to stick closely to someone.

It forms a bond stronger than the old family ties.

A new, primary loyalty forms the moment a marriage begins.

💍 Leave means starting a new household
🔗 Cleave means a strong, close bond
👪 A new loyalty replaces the old one
📖 Marriage creates a new primary bond

## 🧩 They Twain Shall Be One Flesh

"Twain" is an old word for two.

Two separate people are described as becoming one united whole.

This is not only physical union.

It also pictures a shared life and identity.

🧩 Twain means two
🔗 Two become one united whole
❤️ It pictures a shared life
📖 Marriage unites more than bodies

## ✂️ What God Hath Joined Together, Let Not Man Put Asunder

"Asunder" means torn apart or separated.

Jesus names marriage as something God forms, not something people merely agree to.

God is the one who joins the couple together.

That means no human has the right to split it apart.

✂️ Asunder means torn apart
🤝 God forms the marriage, not just people
🚫 No human has the right to split it
📖 What God joins carries divine weight

# Matthew 19:7-9
# 💔 Moses And The Hardness Of Heart
---
## 📜 A Writing Of Divorcement

This refers to Deuteronomy chapter twenty four, the law Moses actually gave about divorce.

It was a legal document that formally ended a marriage.

That document also let a divorced woman remarry.

The Pharisees use this law to challenge what Jesus just said.

📜 Writing of divorcement means a legal document
⚖️ It comes from Deuteronomy twenty four
🔄 It let a divorced woman remarry
➡️ The Pharisees use it to push back

## 💔 Hardness Of Your Hearts

"Hardness of heart" means a stubborn refusal to follow God's original design.

Jesus says Moses allowed divorce as a concession to human sin.

It was never God's ideal plan.

The law managed a broken reality.

It never defined the real goal.

💔 Hardness means stubborn resistance to God
📋 Moses allowed a concession, not an ideal
🔧 The law managed brokenness
📖 A concession is not a design

## 🌱 From The Beginning It Was Not So

Jesus repeats the same word used back in verse four, "beginning."

He keeps anchoring the real standard to Genesis, not to Moses's later concession.

What God designed at creation outranks what the law later permitted.

🌱 Beginning repeats the creation anchor
📖 Genesis outranks the later concession
⚖️ Design outranks permission
➡️ Jesus returns to the original standard

## 🚫 Except It Be For Fornication

"Fornication" here points to sexual unfaithfulness within the marriage.

Jesus allows one narrow exception to the permanence he just described.

Bible teachers have debated the exact scope of this exception for centuries.

The text still clearly limits remarriage after an unlawful divorce.

🚫 Fornication means sexual unfaithfulness
🔑 One narrow exception is allowed
📚 Teachers have long debated its scope
📖 Few verses are argued over more

## 💍 Committeth Adultery

Jesus calls an unlawful remarriage adultery, a surprisingly strict ruling for his time.

Jewish law at that time did not usually call a legal remarriage adultery.

Jesus raises the moral weight of marriage higher than the culture around him expected.

💍 Remarriage after unlawful divorce named adultery
😮 Stricter than the culture expected
⬆️ Jesus raises marriage's moral weight
📖 The standard is higher than Moses allowed

# Matthew 19:10-12
# ✝️ Eunuchs For The Kingdom's Sake
---
## 😮 It Is Not Good To Marry

The disciples hear Jesus's strict teaching and react with shock.

If divorce is this restricted, staying single starts to sound safer to them.

Their response shows just how high Jesus set the bar on marriage.

😮 The disciples react with shock
🔒 Marriage now sounds riskier to them
📈 The bar on marriage was set high
➡️ Shock reveals how strict it felt

## 🎯 Save They To Whom It Is Given

Jesus says voluntary singleness is not for everyone.

It is a specific calling given to some people.

It is not a rule forced on all.

Trying to live it without that calling usually leads to struggle, not holiness.

🎯 Singleness is a specific calling
🙅 It is not forced on everyone
⚠️ Forcing it without the calling causes struggle
📖 God gives the calling that fits

## 👶 So Born From Their Mother's Womb

This first group of "eunuchs" describes men born without the ability to have children.

It was simply their natural condition from birth.

It was not a choice they made.

👶 Born this way from birth
🚫 Not a personal choice
📖 A natural condition, not a sin
➡️ Jesus names this group without judgment

## ⚔️ Made Eunuchs Of Men

This second group describes men who were castrated by other people.

Ancient kings sometimes used eunuchs to run their households.

Eunuchs also guarded royal harems safely.

They posed no threat to a king's own family line.

⚔️ Castrated by other people, not by choice
👑 Often served in royal households
🔒 Posed no threat to the family line
📖 A documented ancient practice

## ✝️ Eunuchs For The Kingdom Of Heaven's Sake

This third group chooses celibacy on purpose in order to serve God more fully.

Paul later describes this same calling in his letters.

He chose singleness to focus entirely on ministry.

This is the group Jesus has been describing throughout this whole conversation.

✝️ A chosen celibacy for God's sake
📖 Paul describes this same calling later
🎯 Full focus given to ministry
➡️ This is the group Jesus means

# Matthew 19:13-15
# 👶 Suffer The Little Children
---
## 🙏 That He Should Put His Hands On Them, And Pray

Laying on hands was a common way to ask for God's blessing on someone.

Parents brought their children to Jesus specifically hoping for this blessing.

This was an ordinary, expected request in that culture.

🙏 Laying on hands asked for blessing
👶 Parents wanted this for their children
🤲 An ordinary request in that culture
➡️ A normal hope met with resistance

## 🙅 The Disciples Rebuked Them

Children held very little social status in this culture.

The disciples likely saw this as a distraction from Jesus's more important work.

Their rebuke reveals an assumption Jesus is about to correct firmly.

🙅 Disciples saw children as a distraction
📉 Children had low social status then
❌ An assumption about who matters
➡️ Jesus is about to correct it

## 🚫 Suffer Little Children, And Forbid Them Not

"Suffer" here is an old word meaning "allow" or "permit."

Jesus directly reverses his disciples' rebuke in front of everyone.

Children are not an interruption to his mission.

They are part of it.

🚫 Suffer means allow or permit
🔄 Jesus reverses the disciples' rebuke
👶 Children are part of his mission
📖 Access to Jesus is never blocked

## 👑 Of Such Is The Kingdom Of Heaven

Jesus does not say children earn the kingdom through innocence or merit.

He points to their total dependence as the real picture.

That picture shows how anyone actually enters the kingdom.

Nobody comes to God by their own importance or achievement.

👑 Not about innocence or merit
🙌 Dependence pictures how anyone enters
🚫 Not earned by status or achievement
📖 Chapter eighteen used a child too

## 🔁 He Laid His Hands On Them, And Departed Thence

Jesus does exactly what the parents originally hoped for.

He blesses each child personally before moving on.

This small act closes the scene gently right before a much harder conversation begins.

The kindness shown to children stands in sharp contrast with what comes next.

🔁 Jesus personally blesses each child
🕊️ A gentle close to this scene
⚖️ Contrasts with the harder scene ahead
➡️ Easy welcome, hard conversation next

# Matthew 19:16-22
# 💰 The Rich Young Man
---
## 🙋 Good Master, What Good Thing Shall I Do

The man believes eternal life can be earned through one more good deed.

He is treating goodness like a checklist instead of a relationship with God.

His very question reveals the assumption Jesus is about to challenge.

🙋 He treats goodness like a checklist
📝 One more deed, he assumes
❌ A wrong assumption about earning life
➡️ Jesus is about to challenge it

## ❓ Why Callest Thou Me Good

Jesus is not denying that he is good.

He is pressing the man to think carefully about what the word "good" really means.

If only God is truly good, calling Jesus good says more than the man realizes.

❓ Jesus is not denying his goodness
🤔 He presses the man to think
👑 Only God is truly good
📖 The man says more than he knows

## 📋 Keep The Commandments

Jesus starts with the law the man already claims to follow.

This is not Jesus's final answer.

It exposes where the man's confidence actually comes from.

A person who truly kept these perfectly would still face what comes next.

📋 Jesus starts with the familiar law
🔍 This exposes the man's confidence
⚠️ Not yet Jesus's final answer
➡️ More is coming in this story

## 🔢 Thou Shalt Do No Murder, Thou Shalt Not Commit Adultery, Thou Shalt Not Steal

Jesus lists several of the Ten Commandments from Exodus chapter twenty.

These particular commandments are about how to treat other people.

They are not the ones about loving God directly.

He starts where the man can most easily check himself.

🔢 These come from the Ten Commandments
👥 These concern how to treat people
🪞 Easy commandments to self check
📖 A starting point, not the finish

## 👨‍👩‍👧 Honour Thy Father And Mother, And Love Thy Neighbour As Thyself

Jesus closes the list with the command to love others as much as oneself.

This command summarizes the whole second half of the Ten Commandments.

It quietly raises the bar from simply avoiding wrong to actively loving others well.

👨‍👩‍👧 Honour and love close the list
📜 This summarizes the commandments about people
⬆️ Raises the bar from avoiding to loving
➡️ Setting up the next question

## 🧑 The Young Man

Matthew specifically calls this person a young man.

Mark and Luke also describe him as a ruler.

That title suggests he held some position of authority despite his youth.

Great wealth at a young age likely made this decision even harder.

🧑 Matthew calls him a young man
👑 Other gospels also call him a ruler
💰 Young wealth made the choice harder
➡️ Age and status raised the stakes

## 📈 All These Things Have I Kept

The young man genuinely believes he has fully obeyed every one of these commands.

His confidence is sincere, not simply arrogant showing off.

"What lack I yet" reveals he still senses something missing deep down.

📈 He sincerely believes he has obeyed fully
🙂 His confidence is genuine, not fake
❓ He still senses something missing
➡️ A real gap under real confidence

## 💰 Sell That Thou Hast, And Give To The Poor

Jesus names the one thing standing between this man and total devotion.

That one thing is his wealth.

This is not a universal command for every follower to sell everything.

It is a specific test aimed at this specific man's attachment.

💰 Wealth is this man's specific obstacle
🎯 Not a universal command for everyone
🔍 A test aimed at his attachment
📖 Jesus sees what the law could not expose

## 🏦 Thou Shalt Have Treasure In Heaven

Jesus promises a trade, not just a loss.

Giving up earthly wealth was never meant to leave the man with nothing.

The reward simply moves from an account on earth to one that lasts forever.

🏦 A trade, not just a loss
💎 Earthly wealth exchanged for eternal reward
⏳ One account lasts forever
📖 Generosity to God is never a true loss

## 🚶 Come And Follow Me

Giving up wealth was never the whole command.

Jesus also calls the man to become his actual follower.

That means walking with him daily, not just giving something away once.

This matches the same call given to the fishermen back in chapter four.

🚶 Following was the second half of the call
🎯 Giving up wealth was only the first part
🔁 Matches the call given in chapter four
📖 The call was always personal, not just financial

## 🏃 He Went Away Sorrowful

The man came running with excitement and leaves in sadness.

His great possessions outweighed his desire for eternal life.

That became clear once the real cost was named.

The commandments felt achievable, but surrendering his wealth did not.

🏃 He arrives excited, leaves sorrowful
⚖️ Wealth outweighed his desire for life
📏 Commandments felt easy, surrender did not
📖 The true cost is finally revealed

# Matthew 19:23-26
# 🐫 Easier For A Camel
---
## 💰 A Rich Man Shall Hardly Enter

"Hardly" here means with great difficulty, not impossible.

Jesus is building directly on what just happened with the man who walked away.

Wealth becomes dangerous the moment it competes with trust in God.

💰 Hardly means difficult, not impossible
🔗 Built directly on the man who just left
⚠️ Wealth can compete with trust in God
➡️ A hard truth, not a closed door

## 🐫 Easier For A Camel To Go Through The Eye Of A Needle

This is deliberate exaggeration, a teaching tool called hyperbole.

A sewing needle and a camel make an impossible, almost comic picture on purpose.

Some later legends claimed Jerusalem had a small gate nicknamed the needle's eye.

No real evidence supports that story.

🐫 This is deliberate exaggeration
😄 An impossible, almost comic picture
🚫 No needle shaped gate ever existed
📖 The point is plain impossibility

## 🔀 Kingdom Of Heaven Compared With Kingdom Of God

Verse twenty three says "kingdom of heaven."

Verse twenty four says "kingdom of God."

Matthew uses "kingdom of heaven" far more often than the other gospel writers.

Both phrases describe the exact same reality, God's reign over his people.

🔀 Two phrases appear back to back
📖 Matthew prefers kingdom of heaven
🟰 Both phrases mean the same reign
➡️ Same truth, different wording

## 😲 Who Then Can Be Saved

The disciples are stunned by this teaching.

Wealth was widely seen as a sign of God's blessing at that time.

Wealthy people seemed guaranteed a place in the kingdom.

If even they struggle, salvation suddenly feels impossible for anyone.

😲 Wealth seemed like proof of blessing
😨 Wealthy people seemed guaranteed a place
❌ A popular assumption gets exposed
➡️ The question opens the door to grace

## 🙌 With God All Things Are Possible

Jesus does not soften the difficulty.

He changes where the power comes from instead.

Salvation was never something a person achieves through their own effort or wealth.

It depends entirely on what God makes possible.

🙌 Jesus shifts the power to God
🚫 Never earned by effort or wealth
🔑 Salvation depends on God's power
📖 Impossible for man, possible for God

## 👀 Jesus Beheld Them

"Beheld" means Jesus looked at them with full attention.

It was not a quick glance.

He pauses before easing their fear with the truth about God's power.

This same word describes Jesus's focused looks at other key moments in the Gospels.

👀 Beheld means a focused, full look
⏸️ He pauses before answering their fear
🔁 The same word marks other key moments
➡️ Full attention comes before a hard truth

# Matthew 19:27-30
# 🔄 The First Shall Be Last
---
## 🙋 We Have Forsaken All, And Followed Thee

Peter contrasts the disciples directly with the rich young man who just walked away.

Unlike that man, the twelve actually gave up their old lives to follow Jesus.

Peter's question is fair, what do they get for that real sacrifice.

🙋 Peter contrasts with the rich young man
✅ The twelve actually gave up their lives
❓ A fair question about real sacrifice
➡️ Jesus answers with a real promise

## 👑 In The Regeneration

"Regeneration" here means the full renewal of all things at the end of the age.

This points forward to a future restored world.

It is not just a personal change of heart.

Jesus is answering Peter with a promise about the future, not the present.

👑 Regeneration means the world's full renewal
🌍 A future restored world, not a feeling
⏳ A promise about what is coming
📖 Jesus looks past the present moment

## 🪑 Twelve Thrones, Judging The Twelve Tribes Of Israel

This promises the twelve disciples a specific future role of authority.

"Twelve tribes" recalls the twelve sons of Jacob, the original foundation of Israel.

Judas is still among the twelve when this promise is spoken.

That detail later becomes its own story.

🪑 Twelve disciples promised future authority
🔢 Twelve tribes recalls Jacob's twelve sons
⚠️ Judas is still counted here
📖 Sacrifice now, reward promised later

## 👪 Forsaken Houses, Brethren, Sisters, Father, Mother, Wife, Or Children

Jesus lists nearly every category of family relationship and property a person could have.

The promise of reward covers every kind of sacrifice made for his sake.

It is not just about money.

Nothing given up for Jesus goes unnoticed.

👪 Lists nearly every family relationship
🏠 Covers property and people both
👁️ Nothing given up goes unnoticed
📖 Every sacrifice is seen by God

## 💯 Shall Receive An Hundredfold

This widens the promise beyond the twelve disciples to every believer who sacrifices for Jesus.

Whatever is given up for him comes back multiplied many times over.

This is not a guarantee of earthly riches.

The next phrase names the real prize.

💯 The promise widens to every believer
📈 What is given up comes back multiplied
🚫 Not a guarantee of earthly riches
📖 Everlasting life is named as the real prize

## 🔄 The First Shall Be Last, And The Last Shall Be First

This line flips the world's usual scoreboard upside down.

Status, wealth, and position earned on earth do not guarantee first place with God.

Matthew places this exact saying again at the end of a parable.

That parable opens the very next chapter.

🔄 Flips the world's usual scoreboard
🏆 Earthly status brings no guarantee with God
🔁 The same saying closes chapter twenty's parable
➡️ A bridge into the very next story
`.trim();

export const MATTHEW_NINETEEN_PERSONAL_SECTIONS = parseMatthewNineteenRawNotes(MATTHEW_NINETEEN_RAW_NOTES);
