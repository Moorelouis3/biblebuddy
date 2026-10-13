export type FirstCorinthiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansThreeRawNotes(rawText: string): FirstCorinthiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 3:${startVerse}` : `1 Corinthians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 First Corinthians 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_THREE_RAW_NOTES = `# FirstCorinthians 3:1-4
# 🍼 Still Drinking Milk, Not Meat
---
## 👶 As Unto Babes In Christ

Babes here means new believers, not an insult about intelligence.

A newborn cannot eat solid food and needs only milk.

Paul says the Corinthians are still at that early stage.

They have believed for years but have not grown the way they should.

👶 Babes means new believers, not insult
🍼 A newborn can only handle milk
⏳ Years as believers did not bring growth
📖 Spiritual growth is expected, not optional

## 🥛 Fed You With Milk, And Not With Meat

Milk pictures the basic truths of the gospel, simple enough for anyone to grasp.

Meat pictures the deeper teaching that takes maturity to digest.

Paul had to keep feeding them milk because meat would have overwhelmed them.

The problem was not the teacher.

It was the readiness of the hearers.

🥛 Milk means simple, basic gospel truth
🥩 Meat means deeper teaching for the mature
🍽️ Paul kept them on milk, not meat
📖 Readiness, not teaching, was the problem

## 🧍 For Ye Are Yet Carnal

Carnal means living by human instinct instead of the Spirit's leading.

Yet signals this problem has not changed since Paul's last visit.

Believers can have the Spirit and still act in carnal ways.

Carnal is not the same as unsaved.

It describes a believer stuck in old patterns.

🧍 Carnal means led by instinct, not Spirit
🔁 Yet means the problem has not changed
✅ Carnal believers are still believers
📖 They are stuck, not lost

## ⚔️ Envying, And Strife, And Divisions

Envying means wanting what another person or teacher has.

Strife means open quarreling that grows out of that envy.

Divisions means the church splitting into separate loyal camps.

Chapter one already named these exact camps forming around different teachers.

😒 Envying means wanting another's place
⚔️ Strife means quarreling grows out of envy
🧩 Divisions means splitting into camps
📖 Chapter one already named these camps

## 🚶 Are Ye Not Carnal, And Walk As Men

Men here means ordinary humans, not a comment about gender.

Walking as men means living by human wisdom instead of the Spirit.

Paul uses their own behavior as proof of his point.

Jealousy and quarreling are common human patterns, not Spirit led ones.

🧑 Men here means ordinary humans
🚶 Walking as men means living by human wisdom
❓ Paul uses their actions as proof
📖 Jealousy is human, not Spirit led

## 👥 I Am Of Paul, And I Am Of Apollos

These are not two belief systems.

They are loyalty to two different teachers.

Paul started the church.

Apollos later taught there with a different style.

Corinth was already famous for ranking public speakers against each other.

Picking a favorite teacher had split a single church into rival camps.

👥 Not two beliefs, two favorite teachers
🏛️ Paul planted, Apollos later taught
🎤 Corinth loved ranking public speakers
📖 One church split into rival camps

# FirstCorinthians 3:5-9
# 🌱 Planting, Watering, And Who Gets The Credit
---
## 🧑‍🍳 Ministers By Whom Ye Believed

Minister here means a servant, not a ruler over the church.

Paul and Apollos were simply the ones God used to bring the message.

Neither man is the point.

The one who sent them is.

Ranking servants against each other misses who actually did the work.

🧑‍🍳 Minister means servant, not ruler
📨 They were simply God's messengers
🙅 Neither man is the real point
📖 Ranking servants misses who did the work

## 🌾 I Have Planted, Apollos Watered

Paul uses farming to picture his own role in Corinth.

Planting means starting the church by first preaching the gospel there.

Watering means Apollos continuing to teach after Paul had already left.

Both jobs mattered.

Neither one could grow the plant alone.

🌾 Farming pictures Paul's role in Corinth
🌱 Planting means starting the church
💧 Watering means Apollos continuing the work
📖 Neither job alone grows a plant

## 🌱 God Gave The Increase

Increase here means the actual growth, the part no farmer can force.

A farmer can plant and water a seed perfectly.

He still cannot force that seed to grow.

That hidden growth belongs to God alone.

Crediting Paul or Apollos for it was the entire mistake in Corinth.

🌾 Increase means growth no one can force
🙌 Only God makes a seed grow
🧑‍🌾 Farmers plant, they cannot grow it
📖 Credit for growth belongs to God

## 🔁 Neither Is He That Planteth Any Thing

Paul restates his point to make sure it lands.

Planting and watering without growth would accomplish nothing on their own.

Calling the planter or waterer unimportant would go too far.

The point is that growth itself is God's job alone.

🔁 Paul restates the point on purpose
🌱 Planting alone grows nothing
💧 Watering alone grows nothing
📖 Growth itself is God's job alone

## 🤝 He That Planteth And He That Watereth Are One

One here means united in purpose, working toward the same goal.

Paul and Apollos were never actually competing.

The Corinthians treated them like rivals anyway.

Each worker still receives a reward based on his own labor.

A shared purpose does not erase personal responsibility for the work done.

🤝 One means united in purpose
🚫 Paul and Apollos were never competing
🏆 Each still gets a reward for labor
📖 Shared purpose does not erase responsibility

## 🤲 Labourers Together With God

Labourers together means working alongside God, not working for him as hired help.

That is a strikingly high honor for ordinary preachers to receive.

It also means the real power behind their work was never their own.

Every believer who serves the church shares in that same partnership.

🤲 Labourers together means working alongside God
🎖️ A high honor for ordinary preachers
⚡ The real power was never their own
📖 Every believer shares this partnership

## 🚜 Ye Are God's Husbandry, Ye Are God's Building

Husbandry means a cultivated field or farm, tended with care.

Building shifts the picture from a living field to a constructed structure.

Both images describe the same church from two different angles.

The Corinthians belong to God either way, not to Paul or Apollos.

🚜 Husbandry means a carefully tended field
🏗️ Building means a constructed structure
🔄 Both describe the same church
📖 They belong to God, not to a teacher

# FirstCorinthians 3:10-15
# 🏗️ Building On The Only Foundation That Holds
---
## 🏛️ As A Wise Masterbuilder

Masterbuilder means the chief architect who designs and oversees a project.

Paul claims that role for himself in Corinth, by God's grace, not his own skill.

He is not boasting about talent.

He is describing a gift he was given.

Every builder after him has to work from the plan he already laid.

🏛️ Masterbuilder means the chief architect
🎁 Paul credits grace, not his own skill
📐 He laid the plan others build on
📖 Later builders work from his foundation

## 🧱 I Have Laid The Foundation

A foundation is the part of a building no one ever sees once construction finishes.

It carries the weight of everything built above it.

Paul's foundation in Corinth was the gospel itself, preached first and plainly.

A building can only be as strong as the foundation hidden underneath it.

🧱 Foundation is unseen once building finishes
⚖️ It carries the weight above it
📣 Paul's foundation was the gospel itself
📖 Strength depends on what lies beneath

## 👀 Let Every Man Take Heed How He Buildeth Thereupon

Take heed means pay careful attention, the way a builder double checks each beam.

Thereupon means on top of the foundation Paul already laid.

Every teacher after Paul is responsible for what they add to that foundation.

Careless building on a solid foundation can still ruin the whole structure.

👀 Take heed means pay careful attention
🔼 Thereupon means built on Paul's foundation
🧑‍🏭 Later teachers answer for what they add
📖 Careless building can ruin a solid base

## ✝️ Other Foundation Can No Man Lay Than That Is Laid, Which Is Jesus Christ

This closes off any other option before listing the different building materials.

Jesus Christ himself, not a doctrine or a method, is the only true foundation.

Any church, teaching, or ministry not built on him is building on nothing.

Every material listed next only matters once this foundation is already settled.

🚫 No other foundation is possible
✝️ Jesus Christ alone is the foundation
🕳️ Anything else is building on nothing
📖 The materials next only matter after this

## 💰 Gold, Silver, Precious Stones, Wood, Hay, Stubble

These six materials split into two groups, lasting and flammable.

Gold, silver, and precious stones all survive fire.

They come out of the fire purified, not destroyed.

Wood, hay, and stubble are cheap and common.

All three burn away completely in fire.

The materials picture the quality of ministry built on the one true foundation.

💰 Gold, silver, stones survive fire
🔥 Wood, hay, stubble burn away
⚖️ Two groups, lasting and flammable
📖 Materials picture the quality of ministry

## 📅 The Day Shall Declare It, Because It Shall Be Revealed By Fire

The day refers to the day believers stand before Christ to be evaluated.

Declare means that day will make the truth about each person's work plain.

Fire here is not punishment.

It is a test that burns away anything false or careless.

What survives that fire shows what was genuinely built well.

📅 The day means standing before Christ
🔎 Declare means the truth comes out
🔥 Fire tests, it does not punish here
📖 What survives shows real quality

## 🎖️ If Any Man's Work Abide, He Shall Receive A Reward

Abide means the work survives the fire fully intact.

This pictures faithful, careful ministry that was genuinely built to last.

Reward here is a real prize given for work well done.

God notices quality, not just activity or effort.

🏗️ Abide means surviving the fire intact
🙌 Pictures faithful, careful ministry
🎖️ Reward is a real prize
📖 God notices quality, not just effort

## 🔥 If Any Man's Work Shall Be Burned, He Shall Suffer Loss

Burned means that person's specific work did not survive the testing fire.

Loss here means losing a reward, not losing salvation itself.

The next phrase makes that difference unmistakably clear.

Careless ministry still costs something, even for a genuine believer.

🔥 Burned means the work did not survive
💔 Loss means a missing reward
🙅 Not the same as losing salvation
📖 Careless ministry still costs something

## 🏃 Yet So As By Fire

This pictures someone running out of a burning building with nothing but their own life.

Everything they built is gone, but they themselves are safe.

It is a narrow escape, not a comfortable outcome.

Salvation stays secure even when a person's work completely fails.

🏃 Pictures escaping a fire with nothing
🔥 Everything built is lost
🛟 The person themselves is safe
📖 Salvation stays secure even when work fails

# FirstCorinthians 3:16-17
# 🏛️ You Are God's Temple
---
## 🕍 Know Ye Not That Ye Are The Temple Of God

Temple here does not mean a single person.

It means the whole church together.

A temple in that world was the one place where a god's presence actually lived.

Paul uses the exact word for Jerusalem's own temple, on purpose.

Calling the Corinthian church that word was a massive claim about who they were.

🏛️ Temple here means the whole church
🕍 A temple housed a god's presence
🎯 Paul deliberately uses Jerusalem's own word
📖 This was a massive claim about them

## 🏠 The Spirit Of God Dwelleth In You

Dwelleth means living there permanently, not just visiting occasionally.

This explains why the church can be called God's temple at all.

God's presence inside them is the entire reason their divisions were so serious.

A house with God actually living in it deserves better care than Corinth was giving it.

🏠 Dwelleth means living there permanently
🔑 This is why they are called a temple
⚡ God's presence raises the stakes
📖 This house deserved better care

## 🚫 If Any Man Defile The Temple Of God

Defile means to corrupt or ruin something that was set apart as holy.

The divisions and quarreling from earlier in the chapter count as this kind of defiling.

Tearing the church apart is treated as an attack on the building itself.

What looked like ordinary church politics carried far more weight than that.

🚫 Defile means corrupting something holy
⚔️ The earlier divisions count as this
🏛️ It is treated as attacking the temple
📖 Church politics carried real weight here

## ⚠️ Him Shall God Destroy, For The Temple Of God Is Holy

This is a serious warning, matched to a serious offense.

Holy means set apart, belonging fully to God and nothing else.

Harming something that holy brings consequences, because it was never common property.

The warning protects the church.

It is not Paul venting personal anger.

⚠️ A serious warning for a serious offense
✨ Holy means set apart for God alone
🔒 Harming it brings real consequences
📖 The warning protects the church

# FirstCorinthians 3:18-23
# 🙃 Foolish Enough To Be Truly Wise
---
## 🎭 Let No Man Deceive Himself

Deceive here means talking yourself into believing something false about your own wisdom.

Paul warns against the specific trap Corinth kept falling into.

Believing you are wise by the world's standards is the deception in view.

This self deception is sneaky because it feels like confidence, not error.

🎭 Deceive means fooling yourself
🪤 This is Corinth's specific recurring trap
🧠 Worldly wisdom felt like confidence
📖 It was actually error in disguise

## 💭 If Any Man Among You Seemeth To Be Wise In This World

Seemeth means appears to be, not actually is.

This world points to human standards of cleverness, the kind Corinth admired.

That kind of wisdom can look impressive and still be worthless to God.

Appearance and reality do not always match, even inside the church.

👀 Seemeth means only appears to be
🏛️ This world means human cleverness
💭 It can look impressive and still fail
📖 Appearance and reality do not always match

## 🤡 Let Him Become A Fool, That He May Be Wise

Fool here means willing to look foolish by the world's standards.

This echoes chapter one's claim that the cross looks foolish to outsiders.

Choosing God's wisdom over Corinth's polished speech will look like a step down.

Real wisdom sometimes requires giving up the appearance of being wise.

🤡 Fool means looking foolish to the world
🔁 This echoes chapter one's point
✝️ The cross already looked foolish there
📖 Real wisdom can look like a step down

## 🔄 The Wisdom Of This World Is Foolishness With God

This flips the Corinthians' entire value system upside down.

What the culture prized as clever, God simply calls foolish.

The standard that actually matters was never the one Corinth was using.

Measuring wisdom God's way changes who looks impressive and who does not.

🔄 This flips Corinth's values upside down
🏛️ Cultural cleverness is called foolish here
📏 God uses a different standard
📖 It changes who looks impressive

## 🪤 He Taketh The Wise In Their Own Craftiness

This quotes Job, where clever people trip over their own cleverness.

Craftiness means scheming or manipulative cleverness, not simple intelligence.

Their own plans end up being the very thing that catches them.

Human scheming cannot outmaneuver God no matter how clever it looks.

📜 This quotes the book of Job
🪤 Craftiness means scheming cleverness
🔄 Their own plans end up catching them
📖 Human scheming cannot outmaneuver God

## 💨 The Lord Knoweth The Thoughts Of The Wise, That They Are Vain

This second quotation comes from the Psalms.

Vain means empty or pointless, not simply mistaken.

God sees straight through clever reasoning to how empty it actually is.

Nothing about human cleverness is hidden from him.

💨 Vain means empty, not just mistaken
👁️ God sees through clever reasoning
📜 This quote comes from the Psalms
📖 Nothing is hidden from him

## 🏆 Therefore Let No Man Glory In Men

Glory here means taking pride in and boasting about a person.

This directly addresses the Paul versus Apollos rivalry from the start of the chapter.

No single teacher deserves that level of loyalty or praise.

The chapter's main problem gets named clearly one final time before it closes.

🏆 Glory means boasting about a person
⚔️ This targets the Paul versus Apollos rivalry
🙅 No teacher deserves that loyalty
📖 The chapter's problem gets named once more

## 🎁 For All Things Are Yours

This sounds like an overstatement until Paul explains exactly what he means next.

Believers do not need to pick one teacher as their personal property.

Every faithful teacher's work actually belongs to the whole church, including them.

Fighting over ownership of a teacher misses a far bigger inheritance already theirs.

🎁 Sounds huge until Paul explains it
🙅 No need to claim one teacher
🤝 Every teacher's work belongs to the church
📖 Fighting over this misses a bigger gift

## 🧑‍🦳 Whether Paul, Or Apollos, Or Cephas

Cephas is another name for the apostle Peter.

Paul lists all three rival teachers by name, on purpose.

None of these three belongs to one faction more than another.

Claiming any one of them as personal property was always the wrong move.

🧑‍🦳 Cephas is another name for Peter
📝 Paul names all three rivals on purpose
🚫 None belongs to one faction
📖 Claiming one as property was wrong

## 🌍 Or The World, Or Life, Or Death, Or Things Present, Or Things To Come

Paul widens the list from rival teachers to the entire scope of existence.

Even death itself is included in what belongs to a believer in Christ.

This list answers the small minded fighting over teachers with a massive inheritance.

Nothing a believer actually needs was ever missing from this list.

🌍 The list widens past rival teachers
☠️ Even death is included here
🔭 It answers small fighting with a big inheritance
📖 Nothing a believer needs is missing

## ✝️ Ye Are Christ's, And Christ Is God's

This closes the whole argument with the one loyalty that actually matters.

Belonging to Christ settles every question about belonging to a human teacher.

Christ himself answers to God, completing the chain of who truly owns what.

The Corinthians were never Paul's or Apollos's to begin with.

✝️ Belonging to Christ settles the question
🔗 Christ answers to God completing the chain
🙅 They were never Paul's or Apollos's
📖 This closes the whole chapter's argument
`.trim();

export const FIRST_CORINTHIANS_THREE_PERSONAL_SECTIONS = parseFirstCorinthiansThreeRawNotes(FIRST_CORINTHIANS_THREE_RAW_NOTES);
