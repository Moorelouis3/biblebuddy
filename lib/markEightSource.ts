export type MarkEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkEightRawNotes(rawText: string): MarkEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 8:${startVerse}` : `Mark 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Mark 8 sections, received " + sections.length);
  }

  return sections;
}

const MARK_EIGHT_RAW_NOTES = `# Mark 8:1-5
# 🍞 Compassion For The Hungry Crowd
---
## 👥 In Those Days The Multitude Being Very Great

"Multitude" means a huge crowd, far more than could fit in one house.

This crowd had already been following Jesus for days in a remote area.

Mark just finished telling of healings and travels through Gentile territory.

This new crowd shows how far Jesus's reputation had already spread.

👥 Multitude means a huge crowd
🗺️ They gathered in a remote area
📢 His reputation kept drawing people
📖 Another great need is about to appear

---
## 🔁 Having Nothing To Eat

This sounds like the feeding from Mark chapter six, but it is not.

Jesus already fed five thousand people with five loaves earlier in this gospel.

Here a different crowd, in a different place, faces the exact same need.

Mark records both miracles on purpose, not by mistake or repetition.

🔁 This mirrors an earlier feeding
🙅 It is not the same event retold
🍞 A new crowd faces the same need
📖 Mark records both on purpose

---
## ❤️ I Have Compassion On The Multitude

"Compassion" means a deep concern that moves a person to act, not just feel sorry.

Jesus does not simply notice the hunger and move on.

He names it as his own reason for what happens next.

This same word describes his reaction to crowds earlier in Mark's gospel.

❤️ Compassion means concern that leads to action
👀 Jesus names the need himself
🔁 The same word appears earlier in Mark
📖 His compassion drives what happens next

---
## 📅 Now Been With Me Three Days

This crowd had stayed near Jesus for three full days already.

No shops or homes existed nearby in this remote location.

Whatever food people carried with them had long since run out.

Their hunger was real, not a minor inconvenience Jesus simply noticed.

📅 Three days means a long stay
🏕️ No food was available nearby
🍽️ Supplies had already run out
📖 Their hunger was serious and real

---
## 🚶 And If I Send Them Away Fasting To Their Own Houses, They Will Faint By The Way

"Fasting" here simply means going without food, not a religious practice.

"Faint" means collapsing from physical weakness, not simply feeling tired.

Jesus is worried about a real physical danger on a long walk home.

He thinks ahead to what happens after the crowd leaves his presence.

🍽️ Fasting here just means no food
😵 Faint means collapsing from weakness
🚶 A long walk home made it risky
📖 Jesus plans ahead for their safety

---
## 📜 For Divers Of Them Came From Far

"Divers" is an old word that simply means various or many.

Some in this crowd had traveled a considerable distance to be here.

A journey home on an empty stomach could genuinely endanger them.

This small detail explains why Jesus treats the problem as urgent.

📜 Divers is an old word for many
🚶 Some traveled a long distance here
⚠️ An empty stomach made travel risky
📖 This explains Jesus's urgency

---
## ❓ From Whence Can A Man Satisfy These Men With Bread Here In The Wilderness

The disciples ask this question as if no solution could possibly exist.

They had already watched Jesus feed five thousand people in Mark chapter six.

Their memory of that miracle seems to have faded strangely fast.

Jesus is about to remind them, through action, of exactly what he can do.

❓ The disciples sound genuinely stuck
🧠 They seem to forget the earlier miracle
🔁 Jesus will remind them through action
📖 Their memory faded faster than expected

---
## 🔢 How Many Loaves Have Ye

Jesus asks a simple, practical question before doing anything else.

The disciples answer that they have seven loaves on hand.

Seven is two more than the five loaves used in the earlier miracle.

Jesus always starts with what is actually available, however small.

🍞 Seven loaves here, five loaves before
🔢 The numbers will matter again later
🤲 Jesus starts with what is on hand
📖 Small supplies are never the limit

# Mark 8:6-9
# 🍞 Seven Loaves, Four Thousand Fed
---
## 🙏 He Took The Seven Loaves, And Gave Thanks, And Brake

Giving thanks before a meal was a normal Jewish custom of this time.

Jesus follows this custom even while about to work a miracle.

"Brake" simply means he broke the bread into pieces to share it.

The miracle happens quietly inside an ordinary, familiar routine.

🙏 Giving thanks before meals was custom
✂️ Brake means broke into pieces
🍞 The miracle hides inside the ordinary
📖 Jesus multiplies through simple obedience

---
## 🧺 Took Up Of The Broken Meat That Was Left Seven Baskets

Mark actually uses a different Greek word for basket here than in chapter six.

That earlier word described a smaller basket more familiar to Jewish travelers.

This word describes a larger basket more commonly used by Gentiles.

Many scholars believe this small detail quietly points toward Gentile territory.

🧺 A different basket word is used here
🌍 This basket type suits Gentile areas
🔁 Mark chose his words with care
📖 Even baskets can carry meaning

---
## ⚖️ They That Had Eaten Were About Four Thousand

Four thousand people is a smaller number than the five thousand fed earlier.

The miracle itself is no smaller or less complete because of that.

Jesus provides fully for whoever is actually in front of him.

The size of the need never limits what Jesus is able to do.

🔢 Four thousand were fed completely
⚖️ Size never limits a miracle
🤲 Jesus meets whoever is present
📖 Full provision, not a lesser one

# Mark 8:10-13
# 🚢 No Sign For This Generation
---
## 📍 Came Into The Parts Of Dalmanutha

"Dalmanutha" was a small, now largely unidentified area near the Sea of Galilee.

Its exact location has been lost to history, unlike nearby towns such as Capernaum.

Mark still names it precisely, treating the detail as worth remembering.

Jesus moves straight from a miracle among Gentiles back into Jewish territory.

📍 Dalmanutha sat near the Sea of Galilee
❓ Its exact site is now unknown
📝 Mark still names it exactly
📖 Jesus returns to Jewish territory

---
## 🎯 The Pharisees Came Forth, And Began To Question With Him

This question is not an honest search for truth.

The Pharisees have already decided what they think about Jesus.

They are testing him, hoping he will fail or expose himself.

Mark names their motive plainly before describing their request.

🎯 This is a test, not honest curiosity
🧠 Their minds are already made up
⚖️ They hope Jesus will fail
📖 Mark names the motive up front

---
## ⚡ Seeking Of Him A Sign From Heaven, Tempting Him

A "sign from heaven" meant proof so dramatic no one could question it.

Jesus had already performed many miracles the Pharisees simply ignored.

"Tempting" here means testing him, trying to trap him in a mistake.

No amount of evidence was ever going to satisfy a request made this way.

⚡ Sign from heaven meant undeniable proof
🙈 They already ignored many miracles
🪤 Tempting means testing to trap him
📖 No evidence would have satisfied them

---
## 😮‍💨 He Sighed Deeply In His Spirit

"Sighed deeply" describes a heavy, groaning reaction, not a simple breath.

Jesus feels genuine weariness at a demand made in bad faith.

This same kind of deep sigh appears earlier in Mark's gospel too.

His frustration comes from their unwillingness, not from any limit on his power.

😮‍💨 Sighed deeply means a heavy groan
💔 Jesus feels real weariness here
🔁 This echoes an earlier moment in Mark
📖 Their unwillingness frustrates him, not his power

---
## 🚫 There Shall No Sign Be Given Unto This Generation

Jesus refuses to perform on demand for people testing him in bad faith.

This refusal is not a lack of power or evidence on his part.

Genuine faith was never meant to wait on one more dramatic proof.

The miracles already given were always enough for anyone willing to see.

🚫 Jesus refuses to perform on demand
⚡ This is not a lack of power
🙏 Faith should not wait on more proof
📖 What was already given was enough

# Mark 8:14-21
# 🥖 Bread Still Misunderstood
---
## 🍞 The Disciples Had Forgotten To Take Bread

This oversight happens right after watching two separate miracles involving bread.

The disciples still worry about practical shortage like anyone else would.

Their forgetfulness sets up the entire conversation that follows.

A small mistake becomes the door into a much bigger lesson.

🍞 They forgot bread after two miracles
😟 Ordinary worry still affects them
🚪 This mistake opens a bigger lesson
📖 A small gap leads somewhere large

---
## 🧺 Neither Had They In The Ship With Them More Than One Loaf

One loaf for an entire boat of grown men was barely anything at all.

This detail makes their coming conversation about bread feel almost ordinary.

The men who just saw thousands fed now worry over a single loaf.

Jesus is about to use this small moment to teach something much larger.

🍞 One loaf was barely anything
😟 Their worry feels oddly small
🧠 They just witnessed two miracles
📖 Jesus uses the moment to teach

---
## ⚠️ Beware Of The Leaven Of The Pharisees, And Of The Leaven Of Herod

"Leaven" is the substance that makes bread rise and spread through the whole loaf.

Jesus is not talking about actual bread or an actual ingredient here.

He means a harmful influence that quietly spreads through a person's thinking.

Naming both the Pharisees and Herod links two very different groups to the same danger.

🍞 Leaven spreads through a whole loaf
🧠 Jesus means a harmful influence
⚠️ It spreads quietly, not all at once
📖 Two different groups share one danger

---
## 🙅 They Reasoned Among Themselves, Saying, It Is Because We Have No Bread

The disciples completely miss what Jesus actually means by leaven.

They assume he is scolding them over a literal shortage of food.

Their minds stay stuck on the physical problem right in front of them.

Jesus is about to correct that misunderstanding directly.

🙅 They misread his warning completely
🍞 They think he means real bread
🧠 Their minds stay on the physical need
📖 Jesus is about to correct them

---
## 🧱 Perceive Ye Not Yet, Neither Understand, Have Ye Your Heart Yet Hardened

A "hardened heart" describes a mind that resists seeing what is plainly in front of it.

Jesus is not accusing the disciples of rejecting him on purpose.

He is pointing out how slow their understanding has been, even after so much evidence.

This question echoes the same hardness he just confronted in the Pharisees.

🧱 Hardened heart means resistant understanding
👀 Not rejection, but slowness to see
🔁 This echoes the Pharisees' own hardness
📖 Even disciples can grow slow to see

---
## 👀 Having Eyes, See Ye Not, And Having Ears, Hear Ye Not

The disciples have working eyes and ears, the same as anyone else.

Jesus is asking about a deeper kind of seeing and hearing.

Physical senses alone were never going to be enough to grasp his meaning.

Real understanding here depends on more than ordinary perception.

👀 Their eyes and ears work fine
🧠 Jesus means a deeper perception
⚡ Senses alone cannot grasp his point
📖 Real understanding needs more than sight

---
## 🔁 When I Brake The Five Loaves Among Five Thousand

Jesus deliberately points the disciples back to the first feeding in Mark chapter six.

He asks exactly how many baskets of fragments were gathered that day.

Twelve full baskets were left over after that earlier miracle.

Their own hands had already proven what he was capable of providing.

🔁 Jesus points back to the first feeding
🧺 Twelve baskets were left that day
✋ Their own hands gathered the proof
📖 They already held the evidence

---
## 🔢 And When The Seven Among Four Thousand

Jesus now adds the second feeding to the same short memory test.

He asks the same kind of question about this more recent miracle.

Seven baskets were left over after that feeding too.

Two separate events, two separate crowds, and two complete, documented provisions.

🔢 A second miracle, a second count
🍞 Two crowds, two complete provisions
📊 The evidence is not the problem
📖 Trust is the actual shortage

---
## ❓ How Is It That Ye Do Not Understand

Jesus ends this exchange with a direct, personal question, not a lecture.

He wants the disciples to feel the gap for themselves, not just hear about it.

Twice already he has fed thousands from almost nothing in their own hands.

Worrying over one loaf after that should feel impossible, not ordinary.

❓ Jesus asks them directly, not lecturing
🪞 He wants them to feel the gap
🍞 Two miracles already sit behind them
📖 Worry over one loaf should feel strange

# Mark 8:22-26
# 👁️ Sight Returns In Two Stages
---
## 🐟 He Cometh To Bethsaida

Bethsaida was a fishing town on the north shore of the Sea of Galilee.

Several of Jesus's own disciples came from this same town originally.

Jesus had already rebuked this town earlier for its lack of real faith.

He returns here anyway, still willing to meet real need when it comes.

🐟 Bethsaida was a fishing town
👥 Some disciples came from here
⚠️ Jesus had rebuked it before
📖 He still meets need there anyway

---
## 🙏 They Bring A Blind Man Unto Him, And Besought Him To Touch Him

"Besought" means they begged earnestly, not a casual, passing request.

Other people bring this man, since he cannot find his own way there.

The request specifically asks for touch, a known way people sought healing.

Community effort, not the blind man's own initiative, brings him to Jesus.

🙏 Besought means they begged earnestly
🤝 Others bring him, not himself
🤲 Touch was a familiar healing request
📖 Community effort brings him to Jesus

---
## 🤝 He Took The Blind Man By The Hand, And Led Him Out Of The Town

Jesus personally guides a man who cannot see the way himself.

Leading him outside of town removes him from public spectacle.

This matches a similar choice Jesus made for the deaf man in the previous chapter.

Privacy and personal care shape the method before any healing even happens.

🤝 Jesus personally guides the man
🚶 Leaving town avoids public spectacle
🔁 This echoes the deaf man's healing
📖 Privacy shapes the method again

---
## 🧴 He Had Spit On His Eyes, And Put His Hands Upon Him

Spit was a commonly used substance in healing customs of this time and place.

Jesus again chooses a method the man himself can physically feel.

Touch gives this man something real to hold onto before his sight returns.

Faith does not need to understand the method to receive the result.

🧴 Spit was a common healing custom
✋ Touch gives him something to feel
🙏 He need not understand the method
📖 Faith receives before full understanding

---
## 🌳 I See Men As Trees, Walking

This answer is not a failed miracle or an incomplete healing.

It is an honest report of exactly what the man sees in this exact moment.

Shapes are visible now, but detail and clarity have not fully returned yet.

Mark records this partial stage instead of skipping straight to the full result.

👁️ This is not a failed healing
🌳 Shapes appear, but not full detail
⏳ Sight is returning in stages
📖 Mark records the honest middle step

---
## 🤲 He Put His Hands Again Upon His Eyes, And Saw Every Man Clearly

Jesus does not stop after the first, partial improvement.

A second touch completes what the first touch only began.

This is the only miracle in the Gospels healed in two clear stages.

Some of God's work in a life arrives gradually rather than all at once.

🤲 A second touch completes the healing
🔢 This is the only two stage miracle
⏳ Growth can arrive gradually
📖 Not every work is finished instantly

---
## 🤫 Neither Go Into The Town, Nor Tell It To Any In The Town

Jesus again asks for quiet, as he has at other points in this gospel.

Bethsaida had already shown little real faith earlier in Jesus's ministry.

A public spectacle here would likely draw curiosity rather than genuine belief.

Jesus continues to control how and where his identity gets revealed.

🤫 Jesus again asks for quiet
⚠️ Bethsaida had shown little faith
👀 Spectacle would draw curiosity, not belief
📖 Jesus controls his own reveal

# Mark 8:27-30
# ✝️ Thou Art The Christ
---
## 🏔️ Into The Towns Of Caesarea Philippi

Caesarea Philippi sat far north, near the base of Mount Hermon.

This region was Gentile territory, filled with pagan temples and shrines.

One shrine nearby was dedicated to the Greek god Pan at a rocky spring.

Jesus asks his biggest identity question yet in a place built for other gods.

🏔️ Caesarea Philippi sat near Mount Hermon
🛕 The region held many pagan shrines
🐐 One shrine honored the god Pan
📖 He asks his question among other gods

---
## ❓ Whom Do Men Say That I Am

Jesus is not asking because he needs the information himself.

He wants the disciples to say out loud what they have been hearing.

Public opinion has clearly been circulating about who Jesus might be.

This question sets up the far more personal one that follows it.

❓ Jesus already knows the answer
🗣️ He wants it said out loud
📢 Public opinion has been circulating
📖 This sets up a more personal question

---
## 📜 John The Baptist, But Some Say Elias, And Others, One Of The Prophets

"Elias" is simply the Greek form of the name Elijah.

All three guesses share one thing in common with each other.

Each one treats Jesus as someone preparing the way for a greater figure still to come.

None of these popular guesses actually land on who Jesus really is.

📜 Elias is the Greek form of Elijah
🔁 All three guesses share one pattern
➡️ Each treats Jesus as a forerunner
📖 None of them reach the real answer

---
## 🎯 But Whom Say Ye That I Am

Jesus shifts from a general survey to a direct, personal question.

Public opinion no longer matters at this specific moment.

He wants to know what the disciples themselves actually believe.

This question has waited the entire gospel of Mark to be asked plainly.

🎯 Jesus makes it personal now
📢 Public opinion stops mattering here
🧠 He wants their own belief
📖 This question has waited the whole gospel

---
## ✝️ Peter Answereth And Saith Unto Him, Thou Art The Christ

"Christ" means the Anointed One, the promised deliverer Israel had waited for.

Peter speaks for the group, giving the first full, correct answer in Mark's gospel.

This moment marks a clear turning point in how the disciples understand Jesus.

Everything in the second half of this gospel builds from this one confession.

✝️ Christ means the Anointed One
🗣️ Peter answers for the whole group
🔄 This marks a clear turning point
📖 The rest of Mark builds from here

---
## 🤫 He Charged Them That They Should Tell No Man Of Him

Jesus asks for silence immediately after receiving the correct answer.

The title Christ carried political and military expectations among many Jewish people.

A public announcement now could easily spark the wrong kind of movement.

Jesus still needs to explain what kind of Christ he actually came to be.

🤫 Jesus asks for silence right away
⚔️ Christ carried political expectations too
⚠️ Announcing it now risked the wrong movement
📖 He still must explain what kind of Christ

# Mark 8:31-33
# ⛔ Get Thee Behind Me Satan
---
## 👤 He Began To Teach Them, That The Son Of Man Must Suffer Many Things

"Son of man" is a title Jesus uses for himself throughout Mark's gospel.

It points back to a figure of authority described in the book of Daniel.

Right after Peter's confession, Jesus immediately redefines what that title will mean.

Suffering, not conquest, comes first in his own description of his mission.

👤 Son of man is Jesus's chosen title
📜 It echoes a figure from Daniel
🔄 He redefines it right after Peter's answer
📖 Suffering comes before conquest here

---
## 🏛️ Rejected Of The Elders, And Of The Chief Priests, And Scribes, And Be Killed

These three groups together made up the full religious leadership of Israel.

Jesus names the exact people who will eventually reject and condemn him.

This is not a vague danger from distant strangers or foreign soldiers.

The opposition will come from the very top of his own people's leadership.

🏛️ These groups led Israel's religious life
🎯 Jesus names his future opponents exactly
🙅 This is not a vague, distant threat
📖 Opposition comes from his own leaders

---
## ⏳ After Three Days Rise Again

Jesus does not end this hard prediction on suffering and death alone.

He adds the promise of rising again in the very same sentence.

"Three days" becomes a fixed detail Jesus repeats more than once later.

Death in this prediction is real, but it is never the final word.

⚰️ Suffering and death are both real
⏳ Three days becomes a repeated detail
🌅 Rising again finishes the sentence
📖 Death is never the final word here

---
## 🗣️ Peter Took Him, And Began To Rebuke Him

Peter is not simply disagreeing with Jesus here.

"Rebuke" means he actually tries to correct and silence him.

Just moments after confessing Jesus as the Christ, Peter rejects part of what that means.

A right confession did not automatically come with full understanding attached.

🗣️ Rebuke means correcting, not disagreeing
⏳ This happens right after his confession
🧠 Right belief did not bring full understanding
📖 Confession and understanding are not the same

---
## 🔄 Get Thee Behind Me, Satan, For Thou Savourest Not The Things That Be Of God, But The Things That Be Of Men

Jesus turns this rebuke back toward Peter with startling force.

"Savourest" means Peter's whole mindset favors human comfort over God's actual plan.

Calling Peter "Satan" does not mean Peter is possessed or evil.

It means Peter is unknowingly repeating the same temptation Jesus faced in the wilderness.

🔄 Jesus turns the rebuke back on Peter
🧠 Savourest means his mindset favors comfort
🙅 Satan here does not mean possession
📖 Peter echoes an old wilderness temptation

# Mark 8:34-38
# 💔 Lose Your Life To Find It
---
## 🙅 Whosoever Will Come After Me, Let Him Deny Himself

Jesus opens this call to the entire crowd, not only to his closest disciples.

"Deny himself" means setting aside personal comfort, status, and even safety.

This is not about giving up small habits or minor pleasures.

It is a complete shift in what a person treats as most important.

👥 Jesus calls the whole crowd here
🙅 Deny himself means setting self aside
⚖️ This goes beyond small habits
📖 It reshapes a person's whole priority

---
## ⚰️ Take Up His Cross, And Follow Me

A cross in this culture meant a Roman method of execution for criminals.

Everyone listening would have personally seen condemned men carrying their own crosses.

Jesus uses the most shameful, costly image available to his audience.

Following him could genuinely cost someone their life, not just their comfort.

⚰️ A cross meant Roman execution
👀 The crowd had seen this firsthand
💔 Jesus chose the costliest image
📖 Following him could cost everything

---
## 🧭 For Whosoever Will Save His Life Shall Lose It

This does not mean every believer will be physically killed for their faith.

"Life" here points to a person's whole direction and purpose, not just survival.

Clinging tightly to personal comfort and safety ultimately empties a life of meaning.

Holding on too tightly becomes its own kind of loss.

🙅 This is not about physical death only
🧭 Life means direction and purpose here
✊ Clinging tightly empties life of meaning
📖 Holding too tight becomes its own loss

---
## 🔄 But Whosoever Shall Lose His Life For My Sake And The Gospel's, The Same Shall Save It

Losing life here means giving up control for the sake of Jesus and his message.

This sounds like a trade that costs everything and gains nothing in return.

Jesus reverses that logic completely in the very same sentence.

What looks like loss becomes the actual path to real, lasting life.

🔄 Losing control becomes the real gain
📖 Jesus names his message as the reason
⚖️ A costly trade reverses the logic
➡️ Real life follows surrendered control

---
## 📊 For What Shall It Profit A Man, If He Shall Gain The Whole World, And Lose His Own Soul

"Profit" here means a net gain after everything is weighed and measured.

"Soul" points to a person's true, eternal self, not just their body or mind.

Gaining the whole world sounds impossible, but Jesus still uses it as the extreme case.

Even that much gain could never balance out losing the one thing that truly matters.

📊 Profit means a net gain, honestly weighed
🫀 Soul means a person's true self
🌍 Even the whole world could not balance it
📖 One loss outweighs every possible gain

---
## ❓ Or What Shall A Man Give In Exchange For His Soul

Jesus follows the first question with an even sharper second one.

No price, payment, or achievement can buy back a lost soul.

This is not a question with a hidden, clever answer.

It is meant to sit with the listener as genuinely unanswerable.

❓ A second, sharper question follows
💰 No price can buy a soul back
🧠 There is no clever hidden answer
📖 It is meant to feel unanswerable

---
## 💔 Whosoever Shall Be Ashamed Of Me And Of My Words In This Adulterous And Sinful Generation

"Adulterous" here is not describing marriage, but spiritual unfaithfulness to God.

Israel's prophets often used this same picture for a nation that drifted from its covenant.

Jesus applies that old prophetic language directly to the people hearing him now.

Being ashamed of Jesus in a setting like this carries real, lasting consequences.

💔 Adulterous here means spiritual unfaithfulness
📜 Prophets used this picture before
🎯 Jesus applies it to his own generation
📖 Shame now carries lasting consequences

---
## ✨ Of Him Also Shall The Son Of Man Be Ashamed, When He Cometh In The Glory Of His Father With The Holy Angels

This verse looks far beyond the suffering Jesus just finished predicting.

It points to a future moment when Jesus returns in full, visible glory.

The same Son of man who must first suffer will one day be openly honored.

How a person responds to Jesus now shapes how that future moment goes for them.

⏳ This looks beyond the suffering ahead
✨ Jesus returns in full glory later
🔄 The same title holds both suffering and glory
📖 Today's response shapes that future moment
`.trim();

export const MARK_EIGHT_PERSONAL_SECTIONS = parseMarkEightRawNotes(MARK_EIGHT_RAW_NOTES);
