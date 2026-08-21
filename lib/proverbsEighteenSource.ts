export type ProverbsEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsEighteenRawNotes(rawText: string): ProverbsEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 18:${startVerse}` : `Proverbs 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 18 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_EIGHTEEN_RAW_NOTES = `# Proverbs 18:1-4
# 🌊 The Isolated Fool And Deep Words
---
## 🚪 Through Desire A Man, Having Separated Himself

"Desire" here means a man's own selfish want.

This man cuts himself off from other people on purpose.

He chases only what he personally wants.

Community advice and correction get pushed aside first.

🚪 Desire means his own selfish want

👤 He separates himself from others

🎯 He chases only his own goal

📖 Isolation often comes before bad judgment

## ⚔️ Seeketh And Intermeddleth With All Wisdom

"Intermeddleth" means picks a fight with something.

He does not look for wisdom to learn from it.

He argues against good advice instead.

Real wisdom almost always comes through other people.

⚔️ Intermeddleth means picks a fight

🙉 He does not seek wisdom to learn

🚫 He argues against good advice

📖 Wisdom usually comes through other people

## 🙄 A Fool Hath No Delight In Understanding

A "fool" in Proverbs means someone who rejects wisdom on purpose.

This fool feels no real joy in understanding anything.

Learning does not interest him at all.

He would rather talk than listen.

🙄 Fool means someone who rejects wisdom

😐 He feels no joy in understanding

🚫 Learning does not interest him

📖 He would rather talk than listen

## 🗣️ But That His Heart May Discover Itself

"Discover" here is an old word for reveal or expose.

The fool only wants to show off his own opinions.

He is not asking questions to grow.

He is performing his own thoughts for an audience.

🔎 Discover here means reveal or expose

🗣️ He wants to show off his opinions

❌ He is not asking questions to grow

📖 He performs his thoughts for an audience

## 😤 When The Wicked Cometh, Then Cometh Also Contempt

"Contempt" means open scorn toward someone.

Wicked behavior does not stay hidden for long.

People around it start to notice and look down on it.

Scorn follows wickedness the way smoke follows fire.

😤 Contempt means open scorn

👀 Wicked behavior does not stay hidden

🙅 People start looking down on it

📖 Scorn follows wickedness like smoke follows fire

## 😳 And With Ignominy Reproach

"Ignominy" means public shame and disgrace.

"Reproach" means sharp criticism spoken openly.

This pairs private wickedness with a public consequence.

What happens in secret eventually gets said out loud.

😳 Ignominy means public shame

🗯️ Reproach means open criticism

🔗 Private wickedness gets public consequences

📖 Secret sin eventually gets said aloud

## 🌊 The Words Of A Man's Mouth Are As Deep Waters

"Deep waters" pictures something with a hidden bottom.

Deep water is hard to see to the bottom of.

Some people's words hide more meaning than they show.

A careful listener has to look past the surface.

🌊 Deep waters pictures a hidden bottom

🕳️ Some words are hard to read fully

🗣️ A speaker may mean more than he says

📖 Careful listeners look past the surface

## 💧 And The Wellspring Of Wisdom As A Flowing Brook

A wellspring is a natural spring where water rises from the ground.

A brook is a small stream that keeps moving.

Wisdom is pictured as fresh water that keeps moving.

Real wisdom stays active and useful.

💧 Wellspring means a natural spring of water

🏞️ A brook is a small moving stream

🌿 Wisdom is pictured as fresh moving water

📖 Real wisdom stays active and useful
# Proverbs 18:5-9
# ⚖️ Favoritism, A Fool's Mouth, And Gossip
---
## ⚖️ To Accept The Person Of The Wicked

"Accept the person" is an old idiom for favoritism.

It means judging someone by status instead of facts.

A judge who does this already picked a side.

Real justice cannot survive that kind of favoritism.

⚖️ Accept the person means favoritism

👑 Judging by status instead of facts

🙈 A judge already picked a side

📖 Justice cannot survive favoritism

## 🧑‍⚖️ To Overthrow The Righteous In Judgment

"Overthrow" here means to wrongly defeat someone in court.

The righteous person loses, not because of guilt.

He loses because the judge already favored someone else.

Proverbs treats this as a direct attack on justice.

⚔️ Overthrow means wrongly defeat in court

😔 The righteous person loses without guilt

🎭 A biased judge caused the loss

📖 Favoritism is an attack on justice

## 🗣️ A Fool's Lips Enter Into Contention

"Contention" means an ongoing argument or quarrel.

A fool's talk does not stay calm for long.

His words pull him and others into conflict.

Arguing becomes a habit instead of an exception.

🗣️ Contention means an ongoing quarrel

🔥 A fool's talk rarely stays calm

🤼 His words pull others into conflict

📖 Arguing becomes his habit

## 👊 And His Mouth Calleth For Strokes

"Strokes" here means physical blows or a beating.

In this culture certain offenses were punished with a beating.

The fool's own words are shown provoking that punishment.

His mouth causes trouble his body ends up paying for.

👊 Strokes means physical blows

⚖️ Some offenses were punished by beating

🗯️ His words provoke the punishment

📖 His mouth causes what his body pays for

## 💥 A Fool's Mouth Is His Destruction

A fool does not need an outside enemy to ruin him.

His own words are strong enough to do it.

Careless speech becomes its own kind of self harm.

Destruction here comes from inside, not from an attacker.

🙅 A fool needs no outside enemy

🗣️ His own words are strong enough

💥 Careless speech becomes self harm

📖 Destruction here comes from inside

## 🪤 And His Lips Are The Snare Of His Soul

A "snare" is a trap used to catch an animal by surprise.

This pictures a fool's own words trapping him.

He does not see the danger until it closes on him.

The very thing he uses to defend himself becomes the trap.

🪤 Snare means a trap for an animal

🗣️ His own words become the trap

👁️ He does not see it coming

📖 His defense becomes his downfall

## 🗣️ The Words Of A Talebearer Are As Wounds

A "talebearer" is someone who spreads gossip and rumors.

This compares gossip to a physical wound.

Gossip does not just entertain.

It injures real people even when spoken quietly.

🗣️ Talebearer means someone who spreads gossip

🩹 Gossip is compared to a wound

🎭 Gossip is not harmless entertainment

📖 Quiet gossip still injures people

## 🍽️ And They Go Down Into The Innermost Parts Of The Belly

"Innermost parts of the belly" is a Hebrew way of saying deep inside a person.

The idea is gossip being swallowed like food.

People often enjoy hearing gossip more than they admit.

What gets taken in this easily is hard to forget.

🍽️ Innermost parts of the belly means deep inside

⬇️ Gossip is pictured as swallowed food

😋 People enjoy gossip more than they admit

📖 What is swallowed easily is hard to forget

## 🐌 He Also That Is Slothful In His Work

"Slothful" means lazy and unwilling to work.

This describes someone who lets tasks slide.

Nothing gets destroyed on purpose here.

Neglect alone is enough to cause damage.

🐌 Slothful means lazy and unwilling to work

📉 He lets tasks slide

🚫 Nothing is destroyed on purpose

📖 Neglect alone causes damage

## 💣 Is Brother To Him That Is A Great Waster

A "waster" actively destroys or ruins what he has.

Proverbs calls the lazy man kin to that destroyer.

Laziness and active destruction end up in the same place.

Doing nothing can cost as much as doing harm.

💣 Waster means someone who actively destroys

👨‍👩‍👦 Proverbs calls laziness kin to destruction

🎯 Both end up in the same place

📖 Doing nothing can cost as much as harm
# Proverbs 18:10-13
# 🗼 Two Fortresses And Two Hearts
---
## 🗼 The Name Of The LORD Is A Strong Tower

A "strong tower" was a fortified place people ran to for safety.

Ancient cities built these towers into their walls for defense.

God's name here stands for His full character and power.

Trusting God is compared to running inside a real fortress.

🗼 Strong tower means a fortified refuge

🏰 Ancient cities built these for defense

🙏 God's name stands for His character

📖 Trusting God is like entering a fortress

## 🏃 The Righteous Runneth Into It, And Is Safe

"Runneth" means moving fast and with real purpose.

Someone in danger does not casually stroll toward safety.

The righteous person turns to God the moment trouble comes.

Safety here arrives immediately, without a long wait.

🏃 Runneth means moving fast with purpose

⚡ Danger makes someone move fast

🙏 Trust happens the moment trouble comes

📖 Safety here arrives immediately

## 🏙️ The Rich Man's Wealth Is His Strong City

A "strong city" here echoes the strong tower from verse ten.

This rich man trusts his money instead of God.

His wealth becomes a substitute fortress.

The foundation underneath that fortress is different.

🏙️ This echoes the strong tower before it

💰 Wealth replaces God as protector here

🏯 His money becomes a substitute fortress

📖 The foundation underneath is different

## 🧠 And As An High Wall In His Own Conceit

"Conceit" here is an old word for his own imagination or opinion.

The wall he trusts may only be strong in his own mind.

Wealth can feel like real protection and still fail.

What feels secure is not always what is secure.

🧠 Conceit means his own imagination

🧱 The wall may only exist in his mind

💸 Wealth can feel secure and still fail

📖 Feeling secure is not being secure

## 🙄 Before Destruction The Heart Of Man Is Haughty

"Haughty" means proud and looking down on other people.

This proverb notices a pattern, not a guarantee.

Pride often shows up right before a fall.

The proud heart usually cannot see the fall coming.

🙄 Haughty means proud and looking down

🔁 This describes a pattern, not a rule

📉 Pride often comes before a fall

📖 The proud rarely see the fall coming

## 🙇 And Before Honour Is Humility

Humility means putting yourself lower than you have to.

The pattern from the line before now runs in reverse.

Humility is pictured arriving first.

Honor is shown following after it.

🙇 Humility means putting yourself lower

🔄 The earlier pattern now runs in reverse

🥇 Humility arrives first here

📖 Honor tends to follow humility

## ✋ He That Answereth A Matter Before He Heareth It

Answering early means forming a verdict too soon.

He responds with only part of the story in hand.

This happens often in arguments and in gossip alike.

Speaking first can feel confident and still be wrong.

✋ Answering early means forming a verdict too soon

🧩 He responds with only part of the story

🗯️ This happens in arguments and gossip

📖 Confidence is not the same as being right

## 🙈 It Is Folly And Shame Unto Him

"Folly" means a failure in judgment.

"Shame" means public embarrassment that follows that failure.

Both consequences land on the person who spoke too soon.

Listening fully protects a person from both of them.

🙈 Folly means a failure in judgment

😳 Shame means public embarrassment

🎯 Both consequences land on the speaker

📖 Listening fully prevents both
# Proverbs 18:14-17
# 💔 A Wounded Spirit And A Careful Ear
---
## 🤒 The Spirit Of A Man Will Sustain His Infirmity

"Infirmity" means physical sickness or weakness.

A person's inner attitude can carry them through real illness.

Hope and resolve are shown acting like an inner strength.

The body can suffer and the will can still hold on.

🤒 Infirmity means physical sickness or weakness

💪 Inner attitude can carry someone through illness

🕯️ Hope acts like an inner strength

📖 The will can outlast the suffering body

## 💔 But A Wounded Spirit Who Can Bear

A "wounded spirit" means being crushed emotionally or mentally.

Proverbs asks this as a genuine unanswered question.

Physical sickness has a limit that a broken spirit may not.

Some pain goes deeper than the body can measure.

💔 Wounded spirit means crushed emotionally or mentally

❓ Proverbs asks this as a real question

⚠️ A broken spirit may have no limit

📖 Some pain goes deeper than the body

## 🧠 The Heart Of The Prudent Getteth Knowledge

"Prudent" means careful and sensible in making decisions.

A prudent heart is shown actively gathering knowledge.

Wisdom here is not passive.

It has to be pursued on purpose.

🧠 Prudent means careful and sensible

📚 The prudent heart actively gathers knowledge

🚶 Wisdom is not passive here

📖 Knowledge has to be pursued on purpose

## 👂 And The Ear Of The Wise Seeketh Knowledge

"Seeketh" means actively searches, not just happens to hear.

A wise person's ear is treated like a tool for finding truth.

Hearing sound alone is not the same as listening.

The wise treat every conversation as a chance to learn.

👂 Seeketh means actively searches

🔍 The ear works like a tool for truth

🎧 Hearing is not the same as listening

📖 Every conversation is a chance to learn

## 🎁 A Man's Gift Maketh Room For Him

In this culture a gift was often given before a request.

The gift opened the door to a conversation.

This custom explains many gift stories throughout the Bible.

A gift here is a tool, not an act of pure generosity.

🎁 Gifts were often given before a request

🚪 The gift opened the door to talk

📜 This custom appears throughout the Bible

📖 The gift here is a tool

## 👑 And Bringeth Him Before Great Men

"Great men" means people with real power or authority.

The gift is shown gaining access, not guaranteeing character.

Proverbs simply observes how this world tends to work.

It is not necessarily approving the practice.

👑 Great men means people with real power

🔑 The gift gains access, not character

👁️ Proverbs observes how the world works

📖 Observation is not the same as approval

## 🗣️ He That Is First In His Own Cause Seemeth Just

One story, told alone, almost always sounds convincing.

The person speaking first controls the whole picture.

A listener has no way yet to test what they hear.

Sounding right and being right are not the same thing.

🗣️ One story alone almost always sounds convincing

🎤 The first speaker controls the picture

❓ A listener cannot test it yet

📖 Sounding right is not being right

## 🔎 But His Neighbour Cometh And Searcheth Him

"Searcheth" means examines closely.

This is like a cross questioning of the first story.

The second side of the story finally gets heard.

Wisdom waits to judge until both sides speak.

🔎 Searcheth means examines closely

👥 The second side finally gets heard

🔄 New details can change the picture

📖 Wisdom waits for both sides
# Proverbs 18:18-21
# 🎲 The Lot, The Bars, And The Tongue
---
## 🎲 The Lot Causeth Contentions To Cease

Casting the lot meant using an object like a stone to make a decision by chance.

Ancient Israel treated the outcome as God's decision, not luck.

A method both sides accepted could end a stubborn argument.

The lot gave people a way to stop arguing and move on.

🎲 The lot meant deciding by chance

🙏 Israel treated it as God's decision

🤝 Both sides accepted the outcome

📖 It gave arguments a real ending

## 💪 And Parteth Between The Mighty

"The mighty" means powerful and strong willed people.

Even the powerful accepted this method to end conflict.

Status did not exempt anyone from the same process.

A shared rule can settle what stubbornness cannot.

💪 The mighty means powerful, strong willed people

🎲 Even they accepted this method

🚫 Status did not exempt anyone

📖 A shared rule settles what pride cannot

## 🏰 A Brother Offended Is Harder To Be Won Than A Strong City

A "strong city" was protected by thick walls built to survive a siege.

This compares winning back a hurt family member to breaking through those walls.

Family wounds do not heal just because time passes.

Some relationships take more effort to repair than a war.

🏰 A strong city had walls built for siege

💔 Winning back a brother is like a siege

⏳ Time alone does not heal family wounds

📖 Some relationships take more effort than war

## 🔒 And Their Contentions Are Like The Bars Of A Castle

"Bars" here means the iron bars that locked a gate shut.

This pictures a real barrier, not just hurt feelings.

Ongoing family conflict can lock people out that firmly.

What starts as an argument can end as a permanent wall.

🚪 Bars means the iron locks on a gate

🔒 This pictures a real barrier

🧱 Conflict can lock people out that firmly

📖 An argument can end as a permanent wall

## 🍽️ A Man's Belly Shall Be Satisfied With The Fruit Of His Mouth

"Fruit of his mouth" pictures words as something a person eats.

What someone says is treated like food he will later swallow.

A person ends up living with the results of his own speech.

Careless words and careful words both come back to feed the speaker.

🍽️ Fruit of his mouth pictures words as food

🔁 A person later swallows what he says

🌾 Speech produces results a person lives with

📖 Speech feeds the one who speaks it

## 📈 And With The Increase Of His Lips Shall He Be Filled

"Increase" here means whatever a person's words produce over time.

The picture from the line before repeats here in new words.

Hebrew poetry often says one idea twice for emphasis.

Speech is treated here as something a person harvests.

📈 Increase means what words produce over time

🔁 The earlier picture repeats here in new words

✍️ Hebrew poetry often repeats for emphasis

📖 A person harvests what he has said

## 💚 Death And Life Are In The Power Of The Tongue

Words can genuinely heal, encourage, or build someone up.

Words can also genuinely wound, discourage, or destroy someone.

The tongue itself carries no built in direction.

Proverbs gives speech the same weight as life and death.

💚 Words can heal or build someone up

💔 Words can also wound or destroy someone

⚖️ The tongue carries no built in direction

📖 Speech carries the weight of life and death

## 🗣️ And They That Love It Shall Eat The Fruit Thereof

"Love it" here means loving the tongue's power to speak freely.

This does not just mean talking a lot.

It means enjoying the effect words have on other people.

Whoever depends on that power will live with what it produces.

🗣️ Love it means loving the tongue's power

🚫 This is not simply talking a lot

🎯 It means enjoying the effect on others

📖 A person lives with what his words produce
# Proverbs 18:22-24
# 💍 A Wife, A Friend, And How We Speak
---
## 🔍 Whoso Findeth A Wife Findeth A Good Thing

"Findeth" pictures active searching, not something accidental.

Marriage in Proverbs is treated as worth actively seeking.

A good marriage is named here as a real blessing.

It is not treated as a burden or a trap.

🔍 Findeth pictures active searching

🎯 Marriage is worth actively seeking

💍 A good marriage is a real blessing

📖 It is not treated as a burden

## 🙏 And Obtaineth Favour Of The LORD

"Favour" here means God's kindness or approval.

A good marriage is connected here to God's blessing directly.

Marriage is not only a private personal matter.

Scripture treats it as something God is genuinely involved in.

🙏 Favour means God's kindness or approval

🔗 A good marriage connects to God's blessing

👥 Marriage is not only a private matter

📖 God is genuinely involved in marriage

## 🙏 The Poor Useth Intreaties

"Intreaties" means humble pleading requests.

A poor person often has to ask carefully and repeatedly.

Need can force someone into a weaker bargaining position.

Proverbs simply names this social reality plainly.

🙏 Intreaties means humble pleading requests

🗣️ The poor often must ask carefully

⚖️ Need weakens a person's position

📖 Proverbs names this reality plainly

## 😠 But The Rich Answereth

Wealth here can sound hard and impatient.

A person with power does not have to soften his tone.

Proverbs only observes this pattern here.

It does not praise that kind of harshness.

😠 Wealth can sound hard and impatient

💰 Power removes the need to soften speech

👁️ Proverbs only observes the pattern

📖 Observing is not the same as approving

## 🤝 A Man That Hath Friends Must Shew Himself Friendly

"Shew himself friendly" means acting like a real friend.

Friendship in this proverb takes effort, not just luck.

A person who wants close friends has to offer that closeness first.

Good friendships are shown as something built, not something found.

🤝 Shew himself friendly means acting like a friend

💪 Friendship takes real effort here

🎁 Offering closeness usually comes first

📖 Friendships are built, not just found

## 💎 And There Is A Friend That Sticketh Closer Than A Brother

In this culture a brother carried the strongest possible family loyalty.

This names a friendship that can outdo even that loyalty.

Some friends stay faithful even closer than blood family does.

Many readers later connected this verse to Christ's own faithfulness.

👨‍👩‍👧 A brother carried the strongest family loyalty

🤝 Some friends can outdo that loyalty

💎 True friendship can outlast blood ties

📖 Many readers connect this to Christ's faithfulness
`.trim();

export const PROVERBS_EIGHTEEN_PERSONAL_SECTIONS = parseProverbsEighteenRawNotes(PROVERBS_EIGHTEEN_RAW_NOTES);
