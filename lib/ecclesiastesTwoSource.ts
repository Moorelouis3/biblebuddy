export type EcclesiastesTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesTwoRawNotes(rawText: string): EcclesiastesTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 2:${startVerse}` : `Ecclesiastes 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ecclesiastes 2 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_TWO_RAW_NOTES = `# Ecclesiastes 2:1-3
# 🎭 Testing Pleasure
---
## 🗣️ Go To Now

"Go to now" is an old expression.

It means something like come, let us begin.

The Preacher is announcing an experiment to himself.

He decides to test what pleasure can actually deliver.

🗣️ Go to now means come let us begin
🧪 The Preacher announces a personal experiment
😄 He will test what pleasure delivers
📖 This continues the search from chapter one

## 🔬 I Will Prove Thee With Mirth

"Prove" here means to test, not to confirm something already known.

"Mirth" means laughter and cheerful enjoyment.

The Preacher speaks to his own heart as if putting it on trial.

He wants to know whether chasing enjoyment actually satisfies a person.

🔬 Prove means to test something
😂 Mirth means laughter and cheerful enjoyment
❤️ He puts his own heart on trial
📖 Does enjoyment truly satisfy a person

## 🔮 Behold, This Also Is Vanity

The Preacher names his conclusion before the experiment even starts.

Pleasure will turn out to be vapor, just like everything else in chapter one.

Stating the ending early is not laziness.

It shows how confident the Preacher already is in what he will find.

🔮 The conclusion comes before the test
💨 Vanity again means vapor, not pride
🔁 Matches chapter one's whole argument
➡️ The Preacher already expects this outcome

## 😆 I Said Of Laughter, It Is Mad

The Preacher calls laughter "mad," meaning foolish or without lasting purpose.

He is not against enjoying a joke or a good moment.

He is questioning whether laughter alone can carry the weight of a whole life.

A moment of fun cannot answer his bigger question about lasting profit.

😆 Mad here means foolish, not insane
🙂 He does not reject enjoying a laugh
⚖️ Laughter cannot carry a whole life
📖 Fun alone cannot answer the profit question

## 🍷 Acquainting Mine Heart With Wisdom

The Preacher gives himself to wine, but wisdom stays close the whole time.

He is not losing control or becoming reckless.

He is running a careful, sober experiment.

Wisdom never leaves the room during the test.

🍷 He gives himself to wine deliberately
🧠 Wisdom still guides him the whole time
🔬 This is a careful test, not recklessness
📖 Wisdom watches even the pleasure experiment

# Ecclesiastes 2:4-8
# 🏗️ Building Everything
---
## 🏛️ I Builded Me Houses

Solomon's building projects were famous across the ancient world.

He built the first temple in Jerusalem, along with palaces and other structures.

This verse lists that building spree as part of his larger experiment.

Every project was a test of whether achievement could fill his heart.

🏛️ Solomon's building projects were famous
🕍 He built the first temple
🧪 Building itself was part of the test
➡️ Could achievement fill his heart

## 🍇 I Planted Me Vineyards

A vineyard took years of patient work before it produced anything.

Planting one was a long term investment, not a quick pleasure.

The Preacher was not chasing only instant enjoyment.

He was building a whole world of lasting pleasures around himself.

🍇 Vineyards took years to produce fruit
⏳ This was long term investment
🚫 Not only instant pleasure
➡️ He built a whole world of pleasures

## 🌳 I Made Me Gardens And Orchards

Ancient kings sometimes built elaborate parks filled with rare trees and plants.

These gardens showed off wealth and control over nature itself.

The Preacher planted trees "of all kind of fruits," meaning every variety he could gather.

Nothing was left untried in this pursuit.

🌳 Ancient kings built elaborate parks
👑 Gardens showed wealth and power
🍎 Every kind of fruit tree was planted
➡️ Nothing was left untried here

## 💧 I Made Me Pools Of Water

These pools were engineered reservoirs, not casual ponds.

They watered "the wood that bringeth forth trees," meaning the young orchards just planted.

Building pools required real planning and real labor.

The Preacher was investing in his own pleasure project.

💧 Pools were engineered reservoirs
🌲 They watered the new orchards
🛠️ Real planning and labor went in
📖 Infrastructure built for his own pleasure

## 🏠 Servants Born In My House

Buying servants was common, but servants "born in my house" were different.

They were born into his household already, often seen as more loyal.

The Preacher had both kinds, showing the size of his household.

His herds of cattle outgrew everyone else who had ever lived in Jerusalem.

🏠 Servants born in his house were different
🤝 Often seen as more loyal
🐄 His herds outgrew everyone in Jerusalem
📖 The scale here was enormous

## 👑 The Peculiar Treasure Of Kings

"Peculiar treasure" means the special tribute other kings paid him.

First Kings and Second Chronicles both describe this kind of gift.

Other rulers sent Solomon tribute freely.

It was wealth flowing in from nations that recognized his power.

👑 Peculiar treasure means tribute paid to him
🌍 Other nations sent gifts and tribute
💰 Wealth flowed in from outside too
📖 His power reached beyond his own kingdom

## 🎶 Men Singers And Women Singers

The Preacher adds entertainment to his list of pleasures.

Musical instruments here likely describes a wide variety, more than any court had gathered.

He calls this "the delights of the sons of men," meaning whatever people typically desire.

Every category of pleasure available to a human being got tested.

🎶 Singers and music filled his court
🎻 A wide variety of instruments
❤️ Delights means what people desire most
➡️ Every category of pleasure got tested

# Ecclesiastes 2:9-11
# ⚖️ Great, Yet Empty
---
## 📈 So I Was Great, And Increased

The Preacher openly claims he outgrew every king before him in Jerusalem.

This is not idle boasting.

The historical record backs up Solomon's unmatched wealth and fame.

Even with all this greatness, his wisdom remained with him.

📈 He outgrew every king before him
📚 History backs up this claim
🧠 His wisdom stayed clear throughout
➡️ He kept the ability to judge it all

## 👁️ Whatsoever Mine Eyes Desired I Kept Not From Them

The Preacher refused himself nothing his eyes wanted to see or own.

He also refused his heart no joy it wanted to feel.

This was total access, not a partial experiment.

Nobody could ever say he did not really try pleasure fully.

👁️ He denied his eyes nothing
❤️ He denied his heart no joy
🔓 This was total, unlimited access
📖 No one could say he held back

## 😊 My Heart Rejoiced In All My Labour

For a time, the work itself brought real, genuine joy.

"This was my portion" means the enjoyment became his actual reward for laboring.

The pleasure was not fake or forced in the moment.

It would not last forever.

😊 The work itself brought real joy
🎁 Portion means the reward he received
✅ The pleasure was genuine, not fake
➡️ But it would not last

## 💨 Vanity And Vexation Of Spirit

The Preacher steps back and looks at everything he built with fresh eyes.

"Vexation of spirit" means chasing after wind, the same phrase from chapter one.

Every project, every pleasure, every possession gets the exact same verdict.

Vapor cannot be held onto, no matter how impressive it looked.

👀 He steps back and reviews it all
💨 Vexation of spirit means chasing wind
⚖️ Every project gets the same verdict
📖 Impressive still means impossible to hold

## ❓ There Was No Profit Under The Sun

This answers the exact question the Preacher asked back in chapter one.

What does a person actually keep after all the labor.

The answer, after the most extreme test possible, is nothing lasting.

A king with unlimited resources found the same emptiness anyone else would find.

❓ This answers chapter one's opening question
💰 What a person actually keeps after labor
🚫 The answer is nothing lasting
📖 Even unlimited resources could not change it

# Ecclesiastes 2:12-14
# 🧠 Wisdom Excels Folly
---
## 🔍 I Turned Myself To Behold Wisdom, And Madness, And Folly

The Preacher shifts his experiment from pleasure to a direct comparison.

He puts wisdom, madness, and folly side by side to study them honestly.

No successor to the king could ever repeat an experiment this large.

The Preacher had resources nobody else would ever have again.

🔍 He compares wisdom, madness, and folly
👑 No successor could repeat this test
💎 His resources were one of a kind
📖 This experiment could not be redone

## 💡 Wisdom Excelleth Folly, As Far As Light Excelleth Darkness

The Preacher gives a clear, direct verdict, wisdom really is better than folly.

He pictures the difference using light and darkness.

A room lit clearly lets a person see where they are going.

A dark room hides danger until someone walks straight into it.

💡 Wisdom is genuinely better than folly
🌑 The picture is light against darkness
👀 Light lets a person see clearly
➡️ Darkness hides danger until too late

## 👁️ The Wise Man's Eyes Are In His Head

This idiom means the wise person actually pays attention to what is happening.

The fool "walketh in darkness," meaning he stumbles through life without noticing what matters.

The contrast is sharp and simple.

One person sees clearly, the other one does not.

👁️ Eyes in his head means real attention
🌑 The fool stumbles without noticing
⚖️ A sharp, simple contrast
📖 One sees clearly, one does not

## ⚠️ One Event Happeneth To Them All

Here comes the twist the Preacher cannot avoid.

Wisdom is genuinely better, yet the wise person and the fool share one ending.

Both die.

That single fact threatens to erase the whole advantage wisdom seemed to offer.

⚠️ A hard twist the Preacher cannot avoid
⚰️ Wise and foolish share one ending
😔 That ending threatens wisdom's advantage
📖 Death treats every person the same

# Ecclesiastes 2:15-17
# 😔 Wisdom's Discouraging Limit
---
## ❓ Why Was I Then More Wise

The Preacher asks himself an honest, painful question.

If death treats the wise and the foolish exactly the same, what was the point.

He does not pretend the question has an easy answer.

He names it plainly as vanity, vapor that slips away either way.

❓ An honest, painful question
⚰️ Death treats both the same
🤷 The point of wisdom feels unclear
📖 He names it plainly as vanity

## 🕳️ No Remembrance Of The Wise More Than Of The Fool

This repeats an idea already raised in chapter one about being forgotten.

Even a brilliant, wise life eventually fades from memory like anyone else's.

Future generations will not sort people into remembered wise and forgotten fool.

Time forgets almost everyone equally.

🕳️ Repeats chapter one's forgetting theme
🧠 Even brilliant lives fade from memory
👥 Future generations forget most people
➡️ Time forgets almost everyone equally

## 💀 How Dieth The Wise Man? As The Fool

The Preacher states the hardest part of his discovery as a blunt question.

Wisdom cannot buy a different kind of death.

The wise man's funeral looks the same as the fool's funeral.

This is the fact driving his whole crisis in this chapter.

❓ A blunt question and answer
💀 Wisdom cannot buy a different death
⚰️ Both funerals look the same
📖 This fact drives the whole crisis

## 😞 Therefore I Hated Life

This is a strong, honest statement, not exaggeration for effect.

"Grievous" means deeply painful or hard to bear.

The Preacher is not suicidal here.

He is confessing genuine despair over work that seems to lead nowhere permanent.

😞 A strong, honest statement
😣 Grievous means deeply painful
🚫 Not a wish to die
📖 Genuine despair over work leading nowhere

# Ecclesiastes 2:18-21
# 💔 Leaving It To Another
---
## 🏗️ I Should Leave It Unto The Man That Shall Be After Me

Everything the Preacher built will eventually pass to someone else.

He cannot take any of it with him or control it forever.

That fact alone turns his life's work into something he cannot fully enjoy.

Ownership always has an ending point built into it.

🏗️ Everything built passes to someone else
🚫 He cannot control it forever
😔 That fact ruins full enjoyment
➡️ Ownership always has an expiration date

## 👑 Who Knoweth Whether He Shall Be A Wise Man Or A Fool

Solomon likely has his own son in mind here, and history is not kind to that worry.

His son Rehoboam later made poor decisions that split the kingdom in two.

The Preacher cannot control who inherits his labor or how they will handle it.

That uncertainty is part of what makes his work feel like vanity.

👑 Solomon likely thinks of his own heir
📜 History shows Rehoboam split the kingdom
🎲 He cannot control the next ruler
📖 Uncertainty adds to the vanity

## 😔 I Went About To Cause My Heart To Despair

The Preacher describes actively working himself into hopelessness, not simply feeling sad by accident.

He looked honestly at where all his labor was headed.

Facing that truth head on produced real despair.

He is modeling honest confrontation with a hard fact.

😔 He works himself toward despair on purpose
👀 He faces the truth honestly
💔 Real despair follows real honesty
➡️ Not avoidance, but confrontation

## ⚖️ Labour Is In Wisdom, And In Knowledge, And In Equity

"Equity" means fairness and skill applied rightly.

Picture someone who works with real wisdom and real knowledge.

They also work with real integrity, doing everything the right way.

That person still is not guaranteed to keep what they built.

⚖️ Equity means fairness and skill
🧠 Real wisdom and knowledge in the work
🎁 No guarantee of keeping what is built
📖 Effort and character carry no lasting guarantee

# Ecclesiastes 2:22-23
# 😩 Sorrow By Day And Night
---
## 🔁 What Hath Man Of All His Labour

The Preacher circles back to his original question from chapter one, now sharpened.

He is not asking out of curiosity anymore.

He is asking out of genuine exhaustion after testing everything himself.

The question has grown heavier with every verse of this chapter.

🔁 Circles back to chapter one's question
😩 Now sharpened by real pain
🧪 Asked after testing everything himself
📖 The question has grown heavier

## 🤰 All His Days Are Sorrows, And His Travail Grief

"Travail" again means exhausting, painful labor, the same word used for childbirth.

The Preacher describes daily life itself as sorrow, not just the occasional hard day.

Grief attaches itself to ordinary work, not just tragedy.

That is a heavy claim about what normal life actually feels like.

🤰 Travail means painful, exhausting labor
😢 Sorrow describes ordinary daily life
💔 Grief attaches to routine work too
📖 A heavy claim about daily life

## 🌙 His Heart Taketh Not Rest In The Night

Even sleep offers no real escape from this weight.

The worry the Preacher describes follows him after the workday ends.

Nighttime should be the one place a tired person finds relief.

Instead, the heaviness of his search follows him there too.

🌙 Even night brings no real rest
😟 Worry follows him after work ends
😴 Sleep should offer relief
📖 The search follows him into the night

# Ecclesiastes 2:24-26
# 🍽️ Eat, Drink, And Receive
---
## 🍽️ Nothing Better For A Man Than That He Should Eat And Drink

After all his testing, the Preacher lands on something small and ordinary.

Simple daily enjoyment, a meal, honest work, matters more than grand achievement.

This is not the Preacher giving up his search.

It is the first real, workable answer he has found in the book so far.

🍽️ Simple daily enjoyment matters most
🥂 A meal, honest work, ordinary life
🔍 Not giving up the search
📖 His first workable answer so far

## 🙌 This Also I Saw, That It Was From The Hand Of God

The Preacher makes an important turn here.

Even ordinary enjoyment is not something a person grabs alone.

It is described as a gift that comes from God's hand.

The simple pleasures of eating and working are not owed.

They are given.

🙌 An important turn in his thinking
🎁 Enjoyment comes as a gift from God
🚫 It is not something to grab
📖 Simple pleasures are given, not owed

## 🏃 Who Can Eat, Or Who Else Can Hasten Hereunto, More Than I

"Hasten hereunto" means to pursue or chase after something eagerly.

The Preacher points back to himself as the ultimate test case for this book.

Nobody had more resources or more freedom to chase enjoyment than he did.

If pursuit alone could satisfy anyone, it would have satisfied him first.

🏃 Hasten hereunto means to chase eagerly
👑 He was the ultimate test case
💎 No one had more resources to chase pleasure
📖 Even he could not escape this truth

## 🎁 To A Man That Is Good In His Sight Wisdom, And Knowledge, And Joy

The Preacher describes two very different paths at the end of the chapter.

One person receives wisdom, knowledge, and joy directly from God.

The other, called the sinner, works hard only to gather wealth for someone else.

The chapter closes by tying real satisfaction back to a relationship with God.

🎁 One path receives wisdom and joy from God
😔 The other labors just to gather wealth
🔁 The sinner's gain passes to someone else
📖 Real satisfaction ties back to God

## 💨 This Also Is Vanity And A Great Evil

The chapter ends with the same word it kept returning to throughout, vanity.

Even the Preacher's workable answer sits inside a world still marked by injustice.

"A great evil" adds real weight, not just disappointment but genuine wrong.

Ecclesiastes never rushes toward a tidy, comfortable ending, and this chapter proves it.

💨 The chapter ends back on vanity
⚖️ Injustice still marks this world
😔 A great evil means genuine wrong
📖 The book refuses a tidy ending
`.trim();

export const ECCLESIASTES_TWO_PERSONAL_SECTIONS = parseEcclesiastesTwoRawNotes(ECCLESIASTES_TWO_RAW_NOTES);
