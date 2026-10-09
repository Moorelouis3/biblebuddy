export type LukeSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeSixRawNotes(rawText: string): LukeSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 6:${startVerse}` : `Luke 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Luke 6 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_SIX_RAW_NOTES = `# Luke 6:1-5
# 🌾 Jesus Defends The Sabbath
---
## On The Second Sabbath After The First

This odd phrase marks a specific sabbath inside a yearly cycle tied to the Passover season.

Luke is naming an exact day, not speaking in vague terms.

Scholars still debate exactly which sabbath this was.

The detail shows Luke anchoring the story to a real religious calendar.

📅 Marks a specific festival sabbath
🗓️ Luke names an exact day
❓ Scholars debate which sabbath exactly
📖 Luke anchors the story in time

## His Disciples Plucked The Ears Of Corn

Plucking grain from someone else's field was not stealing under Jewish law.

The Law in Deuteronomy allowed a hungry traveler to pick grain by hand while passing through.

What was forbidden was using a sickle to harvest someone else's crop for profit.

The disciples were doing something completely lawful by itself.

🌾 Picking grain by hand was legal
📜 Deuteronomy allowed hungry travelers this
🚫 Using a sickle was the line
📖 The disciples broke no actual law

## Why Do Ye That Which Is Not Lawful To Do On The Sabbath Days

The Pharisees were not objecting to the grain picking itself.

They were objecting to doing any kind of work on the sabbath.

Religious teachers had added many extra rules on top of the law of Moses over time.

Those man made rules, not scripture itself, classified plucking grain as harvesting work.

⚖️ Pharisees objected to sabbath work
📚 Extra rules went beyond Moses
🌾 Those rules labeled plucking as harvesting
📖 Man made rules were not scripture

## Did Take And Eat The Shewbread

The shewbread was twelve loaves of bread kept in the temple, one for each tribe of Israel.

It sat on a table before God and was replaced every week.

Normally only priests were allowed to eat the old loaves once they were removed.

David ate it anyway when he and his men were starving, and the priest allowed it.

🍞 Shewbread was twelve sacred loaves
⛪ Only priests could eat it
🍽️ David ate it while starving
📖 Human need outweighed the ritual rule

## The Son Of Man Is Lord Also Of The Sabbath

Jesus is making a direct claim about who he is, not just winning an argument about grain.

The sabbath itself belonged to God, and Jesus claims authority over it.

No ordinary teacher could say this without being accused of blasphemy.

Jesus is quietly stating that he is God in this one sentence.

👑 Jesus claims authority over the sabbath
⚡ This is a claim about his identity
🙏 Only God could rightly say this
📖 Jesus quietly claims to be God

# Luke 6:6-11
# 🖐️ Healing Stirs Up Fury
---
## His Right Hand Was Withered

Withered means the hand had shriveled up and lost its normal strength and function.

This was likely a lasting injury or disease, not a temporary problem.

A man with one working hand could still do most daily tasks in that culture.

Jesus did not have to heal him to save his life that day.

🖐️ Withered means shriveled and weak
🩹 This was a lasting condition
💼 He could still work and live
📖 Jesus healed him anyway that day

## Watched Him, Whether He Would Heal On The Sabbath Day

The scribes and Pharisees were not curious about whether Jesus could heal.

They were hunting for a technical violation they could use against him.

Healing itself was not against the law, but their traditions treated it as forbidden work.

They wanted evidence against him, not truth.

👀 They watched for a legal trap
🔍 They wanted an accusation, not truth
🚫 Tradition treated healing as forbidden work
📖 Their hearts were already against him

## He Knew Their Thoughts

Jesus did not need anyone to tell him what the Pharisees were secretly planning.

He could see straight into their hidden motives.

He brought the conflict out into the open on purpose instead of avoiding it.

He healed the man in front of everyone watching.

🧠 Jesus knew their hidden thoughts
👁️ He saw past their silence
🎯 He brought the conflict into the open
📖 Jesus never hid from confrontation

## Is It Lawful On The Sabbath Days To Do Good, Or To Do Evil

Jesus turns their trap into a question they cannot safely answer.

If healing is good, refusing to heal becomes the real evil here.

The Pharisees are forced to choose between admitting the obvious or staying silent.

They choose silence because the truth does not help their case.

❓ Jesus turns the trap around
✅ Healing is clearly the good choice
🤐 The Pharisees choose silence instead
📖 Silence exposed their real motive

## Stretch Forth Thy Hand

Jesus gives the man a simple, public command in front of his accusers.

The man has to act in faith before anything visibly changes.

The hand is already healed the moment he stretches it out.

Obedience and healing happen in the very same motion.

🙌 Jesus gives a simple command
🚶 The man obeys before seeing results
✨ Healing happens the moment he obeys
📖 Faith and obedience moved together

## Filled With Madness

Madness here does not mean they lost their minds in a literal sense.

It describes a boiling, uncontrolled rage at what they just watched.

A miracle that should have caused worship instead caused fury.

Their anger reveals how far their hearts were from God's intentions.

🔥 Madness means uncontrolled rage
😡 A miracle provoked fury, not worship
💔 Their hearts were far from God
📖 Good news can still provoke anger

## Communed One With Another What They Might Do To Jesus

This is the moment their private suspicion turns into an active plan.

Luke is quietly planting the seed of the plot that will end at the cross.

Their plan starts far earlier in the story than most readers expect.

The healing that should have proven who Jesus was instead sealed their decision against him.

🗣️ Private suspicion becomes an active plan
⚰️ This plot points toward the cross
🙅 Proof did not change their minds
📖 Rejection often grows in secret first

# Luke 6:12-16
# 🙏 Choosing The Twelve
---
## Went Out Into A Mountain To Pray

Jesus deliberately withdraws from the crowds before making a major decision.

Mountains in Luke's gospel are often where important moments happen.

This was not a quick prayer but a full night spent alone with God.

Every major decision Jesus made grew out of time spent with the Father.

⛰️ Mountains mark major moments in Luke
🌙 Jesus prayed through the whole night
🙏 Decisions grew out of prayer first
📖 Prayer came before the choice

## He Chose Twelve, Whom Also He Named Apostles

Disciple simply means a student or follower who learns from a teacher.

Apostle means one who is sent out with a specific mission and authority.

Jesus had many disciples, but he hand picked only twelve to carry his message.

Twelve echoes the twelve tribes of Israel, a new foundation being laid.

📚 Disciple means a learning follower
📨 Apostle means one sent with authority
🔢 Twelve recalls Israel's twelve tribes
📖 Jesus laid a new foundation

## Simon, Whom He Also Named Peter

Peter means rock, a brand new name Jesus gives to Simon.

Simon would spend years failing to live up to that name before finally growing into it.

Jesus often saw potential in people long before they saw it in themselves.

The name was a promise, not a description of who Simon already was.

🪨 Peter means rock
😳 Simon often fell short of that
🌱 Jesus named his future, not his past
📖 A new name can carry a promise

## Simon Called Zelotes

Zelotes marks Simon as part of a group pushing for armed revolt against Rome.

Zealots believed violence was justified to free Israel from foreign rule.

Jesus chose a former revolutionary and a former tax collector for the same small team.

Matthew had worked directly for the Roman system Simon wanted to overthrow.

🗡️ Zelotes points to armed revolt
🏛️ Zealots opposed Roman rule
💰 Matthew once worked for Rome
📖 Jesus united total opposites

## Judas Iscariot, Which Also Was The Traitor

Luke names the betrayal years before it actually happens in the story.

Every later mention of Judas will carry this same label.

Jesus chose him knowing exactly how the story would end.

Betrayal did not happen in secret from Jesus at any point.

⚠️ Luke names the betrayal early
🔮 Jesus already knew the outcome
🤝 Judas was still chosen anyway
📖 Nothing about this surprised Jesus

# Luke 6:17-19
# ✨ Power Went Out Of Him
---
## Stood In The Plain

Luke places this teaching on level ground, not up on a mountain.

Matthew's gospel records a similar sermon given on a mountainside.

These may be two different occasions, or two accounts of the same message.

Jesus taught the same truths in more than one setting either way.

🏔️ Matthew's version happens on a mountain
🌾 Luke places this one on a plain
🔁 Jesus likely repeated this message often
📖 The same truth reached different crowds

## Out Of All Judaea And Jerusalem, And From The Sea Coast Of Tyre And Sidon

Tyre and Sidon were Gentile cities outside the land of Israel.

People traveled from both Jewish territory and foreign territory to reach Jesus.

His reputation had already spread far beyond his own people.

This crowd was a small preview of a message meant for the whole world.

🗺️ Tyre and Sidon were Gentile cities
🚶 People traveled from Jewish and Gentile lands
📣 His reputation reached far and wide
📖 This hinted at a message for everyone

## Vexed With Unclean Spirits

Vexed means tormented or troubled without any rest.

Unclean spirits is the Bible's term for demons that oppressed people.

Luke treats sickness and spiritual oppression as two separate, real problems.

Jesus had full authority to heal both kinds of suffering.

😣 Vexed means tormented without rest
👻 Unclean spirits means demons
⚕️ Sickness and oppression differ in Luke
📖 Jesus had power over both

## There Went Virtue Out Of Him

Virtue here means power, not good moral character.

Healing drained something real out of Jesus physically.

This was not a magic trick performed at a distance.

Real power left him every single time someone was healed.

⚡ Virtue means power here
🔋 Healing cost Jesus something real
🙌 Power flowed out at his touch
📖 His healing was never a trick

# Luke 6:20-23
# 😊 Blessed Are You
---
## He Lifted Up His Eyes On His Disciples

Jesus turns his attention specifically to his followers before speaking.

The crowd is listening, but these words are aimed at the disciples first.

This sermon describes what following Jesus will actually cost and provide.

It is not a general philosophy for everyone watching from a distance.

👀 Jesus faces his disciples directly
🎯 These words target his followers first
💭 The crowd overhears a personal message
📖 Discipleship is the real subject here

## Blessed Be Ye Poor, For Yours Is The Kingdom Of God

Blessed does not mean happy in the way people use that word today.

It means truly favored by God, no matter how life looks right now.

Luke's version says simply poor, while Matthew's version says poor in spirit.

Both point to people who know they have nothing to offer God but need him completely.

😊 Blessed means favored by God
💰 Poor describes real lack here
🙏 It points to total need for God
📖 The kingdom belongs to the needy

## Ye That Hunger Now, For Ye Shall Be Filled

This hunger is physical, not only a spiritual hunger for God.

Jesus promises a real reversal, not a vague future comfort.

The kingdom of God turns present lack into future fullness.

What looks permanent now is not the final word.

🍽️ Hunger here is real and physical
🔄 God promises a real reversal
⏳ Present lack is not permanent
📖 The kingdom turns lack into fullness

## Cast Out Your Name As Evil

Being hated for following Jesus is treated here as something to expect, not something strange.

Separate you means being excluded from the community, a painful social punishment.

Cast out your name as evil means being publicly slandered and shamed.

Jesus names the real cost plainly instead of hiding it.

🚫 Being hated is expected, not strange
🙅 Separation meant real social exclusion
🗣️ Cast out your name means public slander
📖 Jesus names the real cost upfront

## In The Like Manner Did Their Fathers Unto The Prophets

Jesus connects this suffering to the Old Testament prophets.

Elijah and Jeremiah were both rejected by their own people for telling the truth.

This kind of suffering was never a new thing.

Rejoicing makes sense once you see this long, faithful pattern.

📜 Prophets faced this same rejection
🔥 Elijah and Jeremiah were both rejected
🔁 Suffering for truth is an old pattern
📖 Joy fits inside a long tradition

# Luke 6:24-26
# ⚠️ Woe To The Comfortable
---
## Woe Unto You That Are Rich, For Ye Have Received Your Consolation

Woe is the opposite of blessed, a warning of coming sorrow.

Consolation means comfort, the same comfort the poor were just promised.

Jesus is saying the rich already used up all the comfort they are going to get.

Wealth can quietly replace a person's need for God.

⚠️ Woe is the opposite of blessed
💰 Consolation means comfort, already spent
🏁 The rich already got their reward
📖 Wealth can crowd out need for God

## Woe Unto You That Are Full

Being full here describes a life with every comfort already satisfied.

Jesus warns that a future hunger is still coming for people like this.

Comfort now is not the same as being right with God.

A satisfied life can hide a deep, coming need.

🍽️ Full means every comfort met now
⏳ A future hunger is still coming
🚫 Comfort does not equal closeness to God
📖 Satisfaction now can mask real need

## Woe Unto You That Laugh Now

Laughing here points to a careless, untroubled kind of life.

Jesus is not condemning joy itself, only joy that ignores God completely.

A reckoning is coming that this kind of laughter cannot avoid.

The same reversal pattern from the blessings repeats here in reverse.

😂 Laughing here means careless living
🚫 Jesus is not condemning joy itself
⏳ A reckoning still waits ahead
📖 Blessings and woes mirror each other

## When All Men Shall Speak Well Of You

Universal approval sounds safe, but Jesus treats it as a warning sign.

False prophets were the ones everyone liked, since they said what people wanted to hear.

Real prophets were usually rejected, not praised, by the crowd.

Popularity is not proof that someone is speaking the truth.

👏 Universal praise is treated as a warning
🗣️ False prophets told people what they wanted
🙅 Real prophets were usually unpopular
📖 Popularity never proves the truth

# Luke 6:27-31
# ❤️ Love Your Enemies
---
## Love Your Enemies, Do Good To Them Which Hate You

Love here is not primarily a feeling, it is a choice to act for someone's good.

An enemy is someone actively working against you, not just someone you dislike.

Jesus commands active good deeds toward people who want to hurt you.

This was a radical command in a culture built around returning insult for insult.

❤️ Love means chosen action, not feeling
⚔️ An enemy actively works against you
🙌 Jesus commands real good deeds
📖 This broke the normal cultural pattern

## Pray For Them Which Despitefully Use You

Despitefully means treating someone with deliberate cruelty and contempt.

Jesus does not just say to tolerate these people, he says to pray for them.

Prayer changes the heart of the one praying just as much as anything else.

It is hard to stay bitter toward someone you are honestly praying for.

😠 Despitefully means deliberate cruelty
🙏 Jesus commands prayer, not just tolerance
💔 Prayer softens the one who prays
📖 Bitterness struggles to survive real prayer

## Smiteth Thee On The One Cheek Offer Also The Other

A backhanded slap on the cheek was a common insult meant to shame someone publicly.

Striking back would have been the expected, honorable response in that culture.

Offering the other cheek refuses to play by the rules of honor and revenge.

It is a deliberate choice to absorb the insult instead of returning it.

✋ A slap was meant to shame
⚔️ Striking back was the expected response
🕊️ The other cheek refuses that cycle
📖 Jesus chose absorbing insult over revenge

## Taketh Away Thy Cloak Forbid Not To Take Thy Coat Also

The cloak was the heavier outer garment, often someone's only protection at night.

The coat was the lighter inner garment worn underneath it.

Jesus describes giving up even the most essential item without a fight.

This pictures a generosity that goes beyond what is reasonable to expect.

🧥 Cloak was the essential outer garment
👕 Coat was the inner garment
🤲 Jesus pictures extreme generosity
📖 Generosity here outruns what is reasonable

## As Ye Would That Men Should Do To You, Do Ye Also To Them Likewise

This is the Golden Rule, stated here in its positive form.

Most cultures at the time taught a negative version, simply avoid harming others.

Jesus flips it into something active, do good first instead of only avoiding harm.

The standard is your own honest sense of what you would want.

🥇 This states the Golden Rule plainly
🚫 Most taught only avoiding harm
🙌 Jesus makes it active instead
📖 Your own wants become the standard

# Luke 6:32-36
# 🙌 Love Without Reward
---
## If Ye Love Them Which Love You, What Thank Have Ye

Thank here means credit or reward, not a simple thank you.

Loving people who already love you back takes no real faith or effort.

Jesus is asking what makes a disciple's love any different from anyone else's.

Ordinary reciprocal love earns no special credit with God.

🏆 Thank means credit or reward
🔁 Loving those who love back is easy
❓ Jesus asks what makes love distinct
📖 Ordinary love earns no special credit

## Sinners Also Love Those That Love Them

Jesus points out that even people who reject God manage this kind of love.

It is not a uniquely godly behavior at all.

Doing good only to people who do good back is just basic human instinct.

A disciple is called to something that actually stands out.

👥 Even sinners manage reciprocal love
🚫 This is not uniquely godly
🔄 It is basic human instinct
📖 Disciples are called to stand out

## If Ye Lend To Them Of Whom Ye Hope To Receive

Lending in that culture usually came with an expectation of being paid back in full.

Jesus describes lending as most people already practiced it, purely for personal benefit.

He is building toward a much harder standard than normal lending.

Expecting nothing back will be the real test that follows.

💰 Lending usually expected full repayment
🙋 Jesus describes normal self interested lending
📈 This sets up a harder standard
📖 Real generosity expects nothing back

## Love Ye Your Enemies, And Do Good, And Lend, Hoping For Nothing Again

Jesus repeats the hardest command of the whole passage one more time.

Hoping for nothing again means expecting absolutely no return on the gift.

This kind of giving mirrors how God gives, without keeping score.

The reward for this is great, but it comes from God, not from the person helped.

🔁 Jesus repeats the hardest command
🎁 Nothing again means no expected return
⚖️ This giving mirrors how God gives
📖 The real reward comes from God

## Kind Unto The Unthankful And To The Evil

God keeps blessing people who never thank him and never deserve it.

Unthankful describes someone who takes a gift and never acknowledges where it came from.

This kindness is not based on whether people earn or appreciate it.

Being called a child of God means reflecting this same kind of patience.

☀️ God blesses even the ungrateful
🙅 Unthankful means never acknowledging the gift
⚖️ God's kindness is not earned
📖 God's children reflect that same patience

# Luke 6:37-38
# ⚖️ Judge Not
---
## Judge Not, And Ye Shall Not Be Judged

Jesus is not banning all moral judgment or discernment between right and wrong.

He is warning against a harsh, condemning attitude toward other people's failures.

The measure someone uses on others tends to come back around on them.

This is a warning about posture, not a command to stop noticing sin.

⚖️ This warns against a harsh attitude
🚫 It does not ban all judgment
🔄 Harsh judgment tends to return
📖 Posture matters more than noticing sin

## Good Measure, Pressed Down, And Shaken Together, And Running Over

This pictures a merchant filling a grain measure as generously as possible.

Pressing it down and shaking it packs in even more grain before it overflows.

Running over means the measure is filled well past what was strictly required.

God's generosity toward a giving person is described using this exact same picture.

🌾 A grain measure is being filled
👐 Pressing and shaking packs in more
🎉 Running over means well past required
📖 God's generosity mirrors this picture

## With The Same Measure That Ye Mete Withal It Shall Be Measured To You Again

Mete simply means to measure something out.

Whatever standard of generosity or harshness someone uses on others gets applied back to them.

This is not a magic formula, it is a statement about how relationships actually work.

Generosity tends to multiply, and stinginess tends to shrink.

📏 Mete means to measure out
🔁 Your standard gets applied back to you
📈 Generosity tends to multiply over time
📖 How you give shapes how you receive

# Luke 6:39-42
# 👁️ The Mote And The Beam
---
## Can The Blind Lead The Blind

Jesus tells a short parable about two blind men trying to guide each other.

Anyone trying to lead others needs real sight themselves first.

This connects directly to the warning about harsh judgment just given.

A spiritually blind critic will only drag others down with him.

👁️ Two blind men cannot guide each other
🕳️ Both fall into the same ditch
🔗 This connects to the judging warning
📖 A blind critic drags others down

## The Disciple Is Not Above His Master

A student cannot expect to surpass the teacher they are still learning from.

Full maturity comes only after real training, not as a shortcut.

Jesus is warning against students who act like they already know more than they do.

Humility fits a disciple's actual position better than confidence does.

📚 A student should not outrank the teacher
⏳ Maturity takes real training and time
🚫 Jesus warns against premature confidence
📖 Humility fits a learner's real position

## The Mote That Is In Thy Brother's Eye

A mote is a tiny speck, like a bit of dust or a splinter.

It describes a small, often minor fault in someone else's life.

Jesus is not saying small faults do not matter at all.

He is pointing out how easily people notice tiny flaws in others.

🔍 Mote means a tiny speck
👤 It pictures a minor fault
👀 People notice specks in others easily
📖 Small faults still get plenty of attention

## The Beam That Is In Thine Own Eye

A beam is a large wooden plank, the kind used to support a roof.

Jesus uses an absurd, almost comic image on purpose.

Having a massive plank in your own eye while criticizing someone's speck is ridiculous.

The exaggeration makes the point impossible to miss.

🪵 A beam is a large wooden plank
😂 The image is absurd on purpose
🙈 A huge flaw can go unnoticed
📖 Exaggeration drives the point home

## Thou Hypocrite

Hypocrite originally described an actor wearing a mask on a stage.

It came to mean someone pretending to be something they are not.

Correcting someone else while ignoring a bigger problem in yourself is exactly that kind of acting.

Jesus names the behavior plainly instead of softening it.

🎭 Hypocrite originally meant a stage actor
🙊 It means pretending to be better
⚠️ Correcting others while ignoring yourself fits this
📖 Jesus names this plainly, not gently

## Cast Out First The Beam Out Of Thine Own Eye

Jesus does not forbid helping someone else see their fault clearly.

He insists on a specific order, deal with your own first.

Self examination has to come before correcting anyone else.

Clear sight only comes after that honest first step.

🔧 Helping others is not forbidden here
🔢 Order matters, self first
🪞 Self examination comes before correction
📖 Clear sight follows honest self check

# Luke 6:43-45
# 🌳 Known By Their Fruit
---
## A Good Tree Bringeth Not Forth Corrupt Fruit

Corrupt here means rotten or spoiled, not just imperfect.

A tree's nature decides what kind of fruit it will produce, not the other way around.

Jesus is describing character, using the fruit as the visible evidence of it.

What a person consistently produces reveals what they actually are inside.

🍎 Corrupt means rotten or spoiled
🌳 A tree's nature decides its fruit
🔍 Fruit is visible evidence of character
📖 What you produce reveals what you are

## Every Tree Is Known By His Own Fruit

This states the same principle as a simple, memorable rule.

Appearances and claims matter far less than consistent results over time.

Jesus trusts actions and patterns more than words and labels.

A person's real character eventually shows itself through what they actually do.

🌳 Trees are known by their fruit
🗣️ Claims matter less than consistent results
⏳ Patterns reveal character over time
📖 Actions eventually outweigh words

## Of Thorns Men Do Not Gather Figs, Nor Of A Bramble Bush Gather They Grapes

A bramble is a thorny, tangled wild bush, useless for growing real fruit.

Expecting sweet figs or grapes from a thorn bush is simply impossible.

Jesus uses an obviously absurd example to make the point unmissable.

A person's true nature cannot produce fruit that contradicts what they really are.

🌵 Bramble means a thorny wild bush
🚫 It cannot grow figs or grapes
😂 The example is deliberately absurd
📖 Nature limits what fruit is possible

## Out Of The Abundance Of The Heart His Mouth Speaketh

Abundance here means whatever is overflowing and filling up a person's heart.

What someone says under pressure often reveals what has been stored inside all along.

Careful words in calm moments do not always show the real heart.

Unplanned, unfiltered words usually tell the truth about what is really there.

💧 Abundance means what overflows the heart
🗣️ Speech reveals what is stored inside
🎭 Calm words can hide the real heart
📖 Unfiltered words tell the truth

# Luke 6:46-49
# 🏠 Built Upon The Rock
---
## Why Call Ye Me, Lord, Lord, And Do Not The Things Which I Say

Calling Jesus Lord twice shows strong, even enthusiastic, verbal devotion.

Jesus points out the gap between what people say and what they actually do.

A title given to Jesus means nothing without obedience behind it.

Words alone were never the point of following him.

🗣️ Calling him Lord shows verbal devotion
❓ Jesus points out the gap with action
🏷️ A title means nothing without obedience
📖 Words were never the real point

## Heareth My Sayings, And Doeth Them

Hearing alone was never meant to be the finish line.

Jesus links real faith directly to actually doing what he says.

Many people in the crowd heard the exact same sermon that day.

Only some of them would go on to actually live it out.

👂 Hearing alone was never the finish line
🏃 Real faith leads to real action
👥 Everyone heard the same sermon
📖 Few would actually live it out

## Digged Deep, And Laid The Foundation On A Rock

Builders in that region sometimes had to dig through loose soil to reach solid bedrock.

This extra digging took real time and extra effort before any building could begin.

A rushed builder would skip this step to finish faster.

A wise builder pays that upfront cost because it protects everything built later.

⛏️ Builders dug through loose soil
⏳ Reaching bedrock took real time
🏃 A rushed builder skips this step
📖 Upfront cost protects what is built

## The Flood Arose, The Stream Beat Vehemently Upon That House

The region around Galilee had dry riverbeds that could flood suddenly after heavy rain.

A flash flood like this could hit with real, sudden force.

A house built on rock had already been tested before the storm ever came.

The foundation decided the outcome long before the flood actually arrived.

🌊 Dry riverbeds could flood suddenly there
⚡ Flash floods hit with real force
🪨 A rock foundation was already tested
📖 The foundation decided the outcome early

## Without A Foundation Built An House Upon The Earth

Building directly on loose soil was faster and required far less work upfront.

It looked identical to the other house until the storm actually came.

The difference between the two builders was invisible until it mattered most.

Skipping the hard, unseen work eventually costs everything.

🏃 Building on soil was faster and easier
👀 The two houses looked the same at first
⚠️ The real difference stayed hidden until tested
📖 Skipped work eventually costs everything

## The Ruin Of That House Was Great

This is not a minor setback or a small crack in the wall.

Luke uses strong language to describe a total, complete collapse.

Jesus ends the whole sermon on this sobering warning instead of a gentle encouragement.

Hearing without doing ends the same way every single time.

💥 Ruin here means total collapse
📏 This was not a minor setback
⚠️ Jesus ends on a sobering warning
📖 Hearing without doing ends the same way
`.trim();

export const LUKE_SIX_PERSONAL_SECTIONS = parseLukeSixRawNotes(LUKE_SIX_RAW_NOTES);
