export type ProverbsFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsFifteenRawNotes(rawText: string): ProverbsFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 15:${startVerse}` : `Proverbs 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Proverbs 15 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_FIFTEEN_RAW_NOTES = `# Proverbs 15:1-5
# 🕊️ A Soft Answer And A Watching God
---
## 🕊️ A Soft Answer Turneth Away Wrath

A soft answer means a calm, gentle reply, not a weak one.

It takes real strength to stay gentle when someone is angry.

"Turneth away" pictures a blow being deflected before it lands.

The right words can stop a fight before it even starts.

🕊️ Soft answer means a calm gentle reply

💪 Staying gentle under pressure takes real strength

🛡️ Turneth away pictures a deflected blow

📖 The right words can stop a fight

## 🔥 Grievous Words Stir Up Anger

"Grievous" means harsh and cutting, words meant to wound.

"Stir up" means to actively provoke, not just fail to calm.

This is the direct opposite of the soft answer just named.

The same mouth can either end a conflict or start one.

🔥 Grievous means harsh cutting words

⚡ Stir up means to actively provoke

🔄 This opposes the soft answer above

📖 The mouth can end or start a fight

## 🧠 The Tongue Of The Wise Useth Knowledge Aright

"Aright" means correctly, in the right way and the right time.

It is not enough to simply know something true.

The wise person also knows when and how to say it.

Knowledge only helps others once it is used well.

🧠 Aright means correctly and at the right time

✅ Knowing truth differs from using it well

🗣️ Wisdom includes when and how to speak

📖 Knowledge helps others once it is used well

## 🗑️ The Mouth Of Fools Poureth Out Foolishness

"Poureth out" means an uncontrolled gush, not a careful gift.

There is no filter between what a fool thinks and says.

This contrasts directly with the wise tongue just described.

Careless speech spills out with no thought for who hears it.

🗑️ Poureth out means an uncontrolled gush

🚫 No filter sits on a fool's words

🔄 This contrasts the careful tongue above

📖 Careless speech spills out unthinking

## 👁️ The Eyes Of The LORD Are In Every Place

This means God is actively watching, not merely present everywhere.

Ancient people sometimes pictured their gods as limited to one temple or land.

The LORD is described here as seeing every place at once.

Nothing that happens anywhere escapes His attention.

👁️ God is actively watching, not just present

🏛️ Other ancient gods were pictured as limited

🌍 The LORD sees every place at once

📖 Nothing escapes God's attention

## ⚖️ Beholding The Evil And The Good

"Beholding" means watching closely, taking full notice.

God does not only watch for wrongdoing to punish.

He notices good, quiet faithfulness just as closely.

Being seen by God cuts both ways, and both are real.

⚖️ Beholding means watching closely and fully

🚫 God does not only watch for wrongdoing

✅ He notices quiet faithfulness too

📖 Being seen by God cuts both ways

## 🌳 A Wholesome Tongue Is A Tree Of Life

"Wholesome" here means healing, speech that restores rather than harms.

"Tree of life" pictures something that gives lasting nourishment and health.

This same image appears earlier in Proverbs tied to wisdom itself.

Healthy words are shown here as something that actually feeds people.

🌳 Wholesome means healing restorative speech

🍃 Tree of life pictures lasting nourishment

🔁 This image already appeared tied to wisdom

📖 Healthy words actually feed people

## 💔 Perverseness Therein Is A Breach In The Spirit

"Perverseness" means twisted speech, words bent away from what is true.

"Breach" pictures a wall broken open, not just a small crack.

"Therein" points back to the tongue, the same source as verse one.

Careless words are shown here doing damage as deep as a wound.

💔 Perverseness means twisted bent speech

🧱 Breach pictures a wall broken open

👅 Therein points back to the tongue

📖 Careless words wound as deep as breaking

## 🙄 A Fool Despiseth His Father's Instruction

"Despiseth" means treats with contempt, not simple disagreement.

"Instruction" here means the ongoing teaching a father gives at home.

Rejecting this is shown as foolishness, not independence.

The rejection targets guidance meant to help, not control.

🙄 Despiseth means treats with contempt

👨‍👧 Instruction means ongoing teaching at home

🚫 Rejecting it is foolishness, not independence

📖 The rejected guidance was meant to help

## 🎯 He That Regardeth Reproof Is Prudent

"Regardeth" means takes seriously and actually acts on what is said.

"Reproof" means correction, being told something hard to hear.

"Prudent" means practically wise, skilled at making good decisions.

Taking correction well is treated here as a real skill.

🎯 Regardeth means takes seriously and acts

📢 Reproof means hard correction spoken aloud

🧠 Prudent means practically wise

📖 Taking correction well is a real skill

# Proverbs 15:6-10
# ⚖️ Treasure, Sacrifice, And The Weight Of Correction
---
## 💰 In The House Of The Righteous Is Much Treasure

"House" here means a family's whole estate, not one room.

"Treasure" may include wealth, but also peace, trust, and stability.

Righteous living is shown here producing lasting, gathered good.

What a family builds over time can genuinely add up.

💰 House means a family's whole estate

🕊️ Treasure includes peace and stability, not only money

🏗️ Righteous living gathers good over time

📖 What a family builds can add up

## 🌀 In The Revenues Of The Wicked Is Trouble

"Revenues" means income or gain, however it was obtained.

Gain built on dishonesty is shown here as unstable, not secure.

This directly opposes the gathered treasure just described.

Wealth without integrity carries a hidden cost that eventually shows.

🌀 Revenues means income however it was gained

⚠️ Dishonest gain is unstable, not secure

🔄 This opposes the treasure above

📖 Wealth without integrity carries hidden cost

## 🌾 The Lips Of The Wise Disperse Knowledge

"Disperse" means scatter widely, like a farmer sowing seed.

The wise do not hoard what they know for themselves.

Their words are pictured here spreading understanding to others.

Wisdom shared this way multiplies rather than shrinks.

🌾 Disperse means scatter widely like seed

🚫 The wise do not hoard knowledge

🗣️ Their words spread understanding to others

📖 Shared wisdom multiplies rather than shrinks

## 🕳️ The Heart Of The Foolish Doeth Not So

"Doeth not so" means the fool simply does not do this at all.

There is nothing gathered inside a fool's heart to scatter.

This is emptiness, not merely a failure to share.

A person cannot give out wisdom they never gathered in.

🕳️ Doeth not so means the fool skips this

🚫 Nothing is gathered inside to scatter

🪞 This is emptiness, not just silence

📖 A person cannot give what they never gathered

## 🙅 The Sacrifice Of The Wicked Is An Abomination To The LORD

"Abomination" means something God finds deeply offensive.

An offering was meant to come from a right heart, not just a ritual.

A wicked person's sacrifice is shown here as empty performance.

The outward act cannot cover for what is happening inside.

🙅 Abomination means deeply offensive to God

🎭 Sacrifice must come from a right heart

📦 A wicked offering is empty performance

📖 Outward acts cannot cover an inward state

## 💖 The Prayer Of The Upright Is His Delight

"Delight" means something God genuinely takes pleasure in.

This directly contrasts the wicked man's rejected sacrifice above.

Simple, honest prayer is valued here over elaborate ritual.

God cares more about the one praying than the performance.

💖 Delight means something God takes pleasure in

🔄 This contrasts the rejected sacrifice above

🗣️ Honest prayer is valued over ritual

📖 God cares about the one praying

## 🚫 The Way Of The Wicked Is An Abomination Unto The LORD

"Way" here means an entire lifestyle, not one action.

This repeats the same word used for the sacrifice in verse eight.

The pattern points to a whole direction of living, not a single choice.

God's judgment is shown here reaching further than isolated acts.

🚫 Way means an entire lifestyle

🔁 This repeats the word from verse eight

🛤️ It points to a whole direction of living

📖 God judges more than isolated acts

## ❤️ He Loveth Him That Followeth After Righteousness

"Followeth after" means actively pursuing, running toward something.

This is more than simply avoiding wrongdoing.

God's love is shown here responding to real pursuit, not passivity.

Righteousness is treated as a direction to chase, not a rule to keep.

❤️ Followeth after means actively pursuing

🏃 This is more than avoiding wrong

🎯 God responds to real pursuit

📖 Righteousness is a direction to chase

## 😖 Correction Is Grievous Unto Him That Forsaketh The Way

"Forsaketh" means has actually abandoned the right path already.

"Grievous" means painful and hard to bear, not mild annoyance.

Correction lands hardest on someone already walking away from wisdom.

The pain described here comes from resisting a needed course change.

😖 Forsaketh means has already abandoned the path

💢 Grievous means painful, not mild annoyance

🛑 Correction lands hardest on someone drifting

📖 The pain comes from resisting needed change

## ⚰️ He That Hateth Reproof Shall Die

"Hateth reproof" means rejecting correction completely, not just disliking it.

This is a stronger warning than the grievous correction just described.

The consequence named here is severe, not exaggerated for effect.

A pattern of refusing every warning eventually removes all warning left.

⚰️ Hateth reproof means rejecting correction completely

📈 This is stronger than the grievous case above

⚠️ The consequence is severe, not exaggeration

📖 Refusing every warning removes warning itself

# Proverbs 15:11-15
# 👁️ Hell Before The LORD, A Heart's True Weather
---
## 💀 Hell And Destruction Are Before The LORD

"Hell" here translates Sheol, the ancient Hebrew word for the realm of the dead.

"Destruction" pairs with it to picture the deepest, most hidden place.

Even that hidden realm is shown here fully open before God.

Nothing is too far removed or too dark for God to see.

💀 Hell translates Sheol, the realm of the dead

🕳️ Destruction pairs with it as the deepest place

👁️ Even Sheol is open before God

📖 Nothing is too dark for God to see

## 🫀 How Much More Then The Hearts Of The Children Of Men

"How much more" is a common Proverbs argument moving from greater to lesser.

If God already sees the hidden realm of the dead, hearts are simple by comparison.

"The children of men" simply means people in general.

This verse argues that no human heart can hide from God either.

🫀 How much more argues from greater to lesser

💀 If God sees Sheol, hearts are simple

👥 Children of men simply means people in general

📖 No human heart can hide from God

## 😤 A Scorner Loveth Not One That Reproveth Him

"Scorner" means someone who mocks correction, worse than simply being foolish.

"Loveth not" means actively dislikes, not just mild discomfort.

This person resents whoever points out their mistakes.

The scorner protects their pride instead of protecting their growth.

😤 Scorner mocks correction, worse than foolish

👎 Loveth not means active dislike

😠 This person resents being corrected

📖 Pride is protected instead of growth

## 🚪 Neither Will He Go Unto The Wise

This shows the scorner's problem is not accidental, it is a pattern of avoidance.

A person who resents correction naturally avoids places correction happens.

Staying away from wise company keeps the scorner comfortable but stuck.

Avoiding wisdom protects pride at the cost of ever growing.

🚪 The scorner's problem is avoidance, not accident

🙈 They avoid where correction happens

😌 Staying away feels comfortable but stuck

📖 Avoiding wisdom trades growth for comfort

## 😊 A Merry Heart Maketh A Cheerful Countenance

"Countenance" means the face, someone's outward expression.

Inner joy is shown here naturally showing up on the outside.

This is not about forcing a smile for others to see.

What fills the heart genuinely shapes what the face shows.

😊 Countenance means the face and expression

✨ Inner joy naturally shows outwardly

🚫 This is not a forced smile

📖 What fills the heart shapes the face

## 😔 By Sorrow Of The Heart The Spirit Is Broken

"Spirit is broken" means more than sadness, it means crushed inner strength.

This contrasts the cheerful face just described a moment before.

Deep grief can drain the energy a person needs simply to keep going.

The heart's true condition eventually surfaces one way or another.

😔 Spirit broken means crushed inner strength

🔄 This contrasts the cheerful face above

🔋 Grief can drain a person's energy

📖 The heart's condition eventually surfaces

## 🔍 The Heart Of Him That Hath Understanding Seeketh Knowledge

"Seeketh" means an ongoing search, not a single completed task.

Real understanding keeps a person hungry to keep learning.

This is presented as a lifelong habit, not a finished achievement.

Wisdom stays active rather than settling for what it already knows.

🔍 Seeketh means an ongoing search

🍽️ Understanding keeps a person hungry to learn

⏳ This is a lifelong habit

📖 Wisdom stays active, never settling

## 🍔 The Mouth Of Fools Feedeth On Foolishness

"Feedeth on" means consumes as a steady diet, not an occasional snack.

This pictures foolishness as something a fool actively craves.

It directly contrasts the hungry search for knowledge just described.

What a person keeps feeding themselves eventually becomes who they are.

🍔 Feedeth on means a steady diet

😋 Foolishness is something a fool craves

🔄 This contrasts the hungry search above

📖 What a person feeds on shapes them

## ☁️ All The Days Of The Afflicted Are Evil

"Afflicted" means someone under real, ongoing hardship or oppression.

This is describing a perspective, not literally every single day.

Hardship can color how a whole life feels from the inside.

The proverb takes real suffering seriously rather than minimizing it.

☁️ Afflicted means someone under real hardship

👁️ This describes a perspective, not literal fact

🎨 Hardship colors how a life feels

📖 The proverb takes suffering seriously

## 🎉 He That Is Of A Merry Heart Hath A Continual Feast

"Continual feast" pictures ongoing celebration, not one special meal.

This is an inner attitude, not a description of easy circumstances.

A settled, joyful heart can turn ordinary days into something rich.

The same hard world can feel very different depending on the heart inside it.

🎉 Continual feast pictures ongoing celebration

🎭 This is an attitude, not easy circumstances

🌟 A joyful heart enriches ordinary days

📖 The same world feels different by heart

# Proverbs 15:16-20
# 🍲 Better Is Little Than Trouble With Riches
---
## 🙏 Better Is Little With The Fear Of The LORD

"Better is" proverbs compare two things to teach what actually matters.

"Little" simply means a small, modest amount of resources.

Reverence for God is valued here above the size of a person's income.

This is not praise for poverty, it is praise for God at the center.

🙏 Better is proverbs compare what matters

💰 Little means a small modest amount

❤️ Reverence for God outweighs income

📖 This praises God at the center, not poverty

## 😰 Than Great Treasure And Trouble Therewith

"Trouble therewith" means anxiety and conflict that come bundled with wealth.

Great treasure often brings real worry about losing or protecting it.

This proverb is honest that riches are not automatically peaceful.

What surrounds wealth can cost more than the wealth is worth.

😰 Trouble therewith means anxiety bundled with wealth

🔒 Riches bring worry about losing them

🎭 Wealth is not automatically peaceful

📖 What surrounds wealth can cost more than it

## 🥗 Better Is A Dinner Of Herbs Where Love Is

"Dinner of herbs" pictures the simplest, humblest possible meal.

This is not a meal anyone would choose for its taste alone.

Love at the table is shown here making a plain meal genuinely good.

What matters most is who is present, not what is served.

🥗 Dinner of herbs pictures the simplest meal

🍽️ Nobody chooses it for taste alone

❤️ Love makes a plain meal genuinely good

📖 Who is present matters more than the menu

## 🐂 Than A Stalled Ox And Hatred Therewith

"Stalled ox" means a fattened animal, the richest possible feast.

This is the wealthiest meal a household could offer.

Hatred at that same table is shown ruining even the finest food.

No feast can fix a relationship that has turned bitter.

🐂 Stalled ox means a fattened rich animal

🎉 It is the wealthiest meal offered

💔 Hatred ruins even the finest food

📖 No feast fixes a bitter relationship

## 🔥 A Wrathful Man Stirreth Up Strife

"Wrathful" describes someone with a quick, hot temper as a pattern.

"Stirreth up" means actively provokes conflict, does not just stumble into it.

This kind of person tends to leave arguments wherever they go.

A hot temper spreads trouble beyond just the one who has it.

🔥 Wrathful means a quick hot temper

⚡ Stirreth up means actively provokes

🚶 This person leaves arguments wherever they go

📖 A hot temper spreads trouble beyond itself

## 🕊️ He That Is Slow To Anger Appeaseth Strife

"Slow to anger" means taking real time before reacting, not staying passive.

"Appeaseth" means actively calms conflict that has already started.

This is more than simply avoiding a fight in the first place.

Patience is shown here as a skill that can end trouble already in motion.

🕊️ Slow to anger means taking real time

🤝 Appeaseth means calming started conflict

🛠️ This is more than avoiding a fight

📖 Patience can end trouble already moving

## 🌵 The Way Of The Slothful Man Is As An Hedge Of Thorns

"Slothful" means habitually lazy, avoiding needed effort.

"Hedge of thorns" pictures every path forward as painful and blocked.

This is not because the road is actually harder for this person.

Laziness turns ordinary tasks into obstacles that feel impossible.

🌵 Slothful means habitually lazy

🌿 Hedge of thorns pictures a blocked path

🛤️ The road is not actually harder

📖 Laziness turns tasks into impossible obstacles

## 🛣️ The Way Of The Righteous Is Made Plain

"Made plain" pictures a clear, level road, easy to walk.

This is the same path, seen through a different kind of effort.

Diligence and honesty are shown here clearing obstacles the lazy imagine everywhere.

The difference is not the road, it is the person walking it.

🛣️ Made plain pictures a clear level road

🔄 This is the same path, different effort

🧹 Diligence clears obstacles the lazy imagine

📖 The difference is the person, not the road

## 😄 A Wise Son Maketh A Glad Father

This is a recurring theme across the book of Proverbs.

A child's wisdom is shown bringing real joy to a parent.

The verse assumes a father invested in his child's choices.

Wisdom is treated here as a gift a child can give their family.

😄 This theme recurs across Proverbs

👨‍👦 A child's wisdom brings a parent joy

❤️ The father is invested in the outcome

📖 Wisdom is a gift a child can give

## 😞 A Foolish Man Despiseth His Mother

Notice the shift here from a young "son" to a grown "man."

This shows foolish contempt for a mother can continue into adulthood.

"Despiseth" means treats with real contempt, not simple disagreement.

Foolishness is shown here as something that does not automatically fade with age.

😞 Notice the shift from son to man

⏳ Contempt can continue into adulthood

🙄 Despiseth means real contempt, not disagreement

📖 Foolishness does not automatically fade with age

# Proverbs 15:21-25
# 🧭 Counsel, Timing, And The Way Upward
---
## 🎈 Folly Is Joy To Him That Is Destitute Of Wisdom

"Destitute of wisdom" means someone utterly lacking any real understanding.

For this person, foolish choices genuinely feel good in the moment.

There is no wisdom framework in place to recognize the harm.

Foolishness can feel like freedom to someone who has never known better.

🎈 Destitute of wisdom means utterly lacking understanding

😊 Foolish choices genuinely feel good to them

🚫 No framework exists to spot the harm

📖 Folly can feel like freedom without wisdom

## 🚶 A Man Of Understanding Walketh Uprightly

"Walketh uprightly" pictures a steady, deliberate direction over time.

This contrasts the fleeting pleasure of folly just described.

Understanding does not just know the right path, it stays on it.

Steady direction is shown here outlasting momentary good feelings.

🚶 Walketh uprightly pictures steady direction

🔄 This contrasts the fleeting folly above

🛤️ Understanding stays on the path

📖 Steady direction outlasts momentary feelings

## 🌀 Without Counsel Purposes Are Disappointed

"Purposes" here means plans a person has made for themselves.

"Disappointed" means the plans actually fail, not merely feel discouraging.

Trying to plan entirely alone is shown here as a real risk.

Good intentions are not enough without outside perspective to test them.

🌀 Purposes means a person's own plans

📉 Disappointed means the plans actually fail

🚫 Planning entirely alone is a real risk

📖 Intentions need outside perspective to succeed

## 👥 In The Multitude Of Counsellors They Are Established

"Multitude of counsellors" means several wise advisors, not just one opinion.

"Established" means solid and successful, the opposite of disappointed.

More than one perspective helps catch blind spots a single mind misses.

Good plans are shown here growing stronger through honest outside input.

👥 Multitude of counsellors means several wise advisors

🏗️ Established means solid, opposite of failed

👀 More perspectives catch blind spots

📖 Plans grow stronger through honest input

## 😊 A Man Hath Joy By The Answer Of His Mouth

This describes the real satisfaction of giving a genuinely fitting reply.

Speaking well is shown here as its own small source of joy.

This is not pride in being clever, it is the pleasure of helping well.

A good answer benefits both the speaker and the one who receives it.

😊 This describes joy in a fitting reply

🗣️ Speaking well is its own source of joy

❤️ This is the pleasure of helping well

📖 A good answer benefits both people

## ⏰ A Word Spoken In Due Season, How Good Is It

"Due season" means the right moment, not simply the right content.

The exclamation at the end shows genuine delight in good timing.

Even true, wise words can land wrong if the timing is off.

This verse celebrates timing as its own real skill.

⏰ Due season means the right moment

❗ The exclamation shows delight in timing

⚠️ True words can land wrong with bad timing

📖 Timing itself is celebrated as a skill

## ⬆️ The Way Of Life Is Above To The Wise

"Above" and "beneath" later in this verse form a spatial picture.

The wise are described here as heading upward, toward life.

This is about the direction of daily choices, not only the afterlife.

Wisdom is pictured as a path that keeps climbing rather than sinking.

⬆️ Above and beneath form a spatial picture

🧗 The wise head upward, toward life

📆 This is about daily direction, not only later

📖 Wisdom keeps climbing rather than sinking

## ⬇️ That He May Depart From Hell Beneath

"Hell" here again translates Sheol, pictured here as the downward pull.

"Depart from" means actively avoid, a direction chosen on purpose.

This verse pairs with verse eleven, where Sheol lies open before God.

Present choices are shown here shaping which direction a life is heading.

⬇️ Hell translates Sheol, the downward pull

🚶 Depart from means avoiding it on purpose

🔁 This pairs with Sheol in verse eleven

📖 Present choices shape a life's direction

## 🏚️ The LORD Will Destroy The House Of The Proud

"House" here again means a whole family's estate and legacy.

"Proud" describes someone who has built that estate on self exaltation.

God is shown here actively opposing pride, not merely disliking it.

An impressive house built on pride is not shown as secure.

🏚️ House means a family's whole estate

👑 Proud means built on self exaltation

⚠️ God actively opposes pride, not just dislikes it

📖 A proud house is not secure

## 🛡️ He Will Establish The Border Of The Widow

"Border" here means a property line, a widow's small remaining land.

Widows in the ancient world had little legal power to defend their own land.

"Establish" means to firmly secure, the opposite of the destroyed house above.

God is shown here personally defending the person with no one else to defend her.

🛡️ Border means a widow's property line

⚖️ Widows had little legal power then

🏗️ Establish means secure, opposite of destroyed

📖 God defends those with no one else

# Proverbs 15:26-30
# 💭 Thoughts Weighed, Words Studied
---
## 🧠 The Thoughts Of The Wicked Are An Abomination To The LORD

This verse judges thoughts themselves, not only actions taken.

"Abomination" means something God finds deeply offensive.

A plan never carried out is still shown here as morally real.

God's evaluation reaches all the way to the inner life, not just behavior.

🧠 This judges thoughts, not only actions

🙅 Abomination means deeply offensive to God

📝 An unfulfilled plan is still morally real

📖 God's evaluation reaches the inner life

## 🕊️ The Words Of The Pure Are Pleasant Words

"Pure" describes a heart free from hidden, twisted motives.

"Pleasant" means genuinely pleasing, not merely polite on the surface.

This contrasts the abominable thoughts of the wicked just named.

What comes from a clean heart naturally sounds different to those who hear it.

🕊️ Pure means free from twisted motives

😊 Pleasant means genuinely pleasing, not polite

🔄 This contrasts the wicked thoughts above

📖 A clean heart sounds different when it speaks

## 💰 He That Is Greedy Of Gain Troubleth His Own House

"Greedy of gain" means grasping for profit without regard for how it is gotten.

This likely includes bribery, a repeated concern across Proverbs.

"His own house" shows the damage does not stay contained to the guilty person.

Dishonest gain is shown here spreading harm to the whole family around it.

💰 Greedy of gain grasps without regard

📜 This likely includes bribery, a Proverbs theme

🏠 The damage reaches the whole family

📖 Dishonest gain spreads harm beyond the guilty

## 🙌 He That Hateth Gifts Shall Live

"Gifts" here means bribes, payments meant to twist someone's judgment.

"Hateth" means refuses them outright, not merely resists occasionally.

"Shall live" ties integrity directly to real security and stability.

Refusing a bribe is shown here protecting far more than just money.

🙌 Gifts here means bribes

🚫 Hateth means refuses outright

🌱 Shall live ties integrity to security

📖 Refusing a bribe protects more than money

## 🤔 The Heart Of The Righteous Studieth To Answer

"Studieth" means deliberately thinks before speaking, not merely reacting.

This describes a habit of pausing, not a single careful moment.

Careful thought is shown here as part of righteousness itself.

The delay before speaking is treated as wisdom in action.

🤔 Studieth means deliberately thinks before speaking

⏸️ This describes a habit, not one moment

🧠 Careful thought is part of righteousness

📖 A pause before speaking is wisdom in action

## 💥 The Mouth Of The Wicked Poureth Out Evil Things

"Poureth out" repeats the same image used earlier in this chapter.

There is no studying or pausing described here at all.

Words are shown here spilling out unfiltered and unconsidered.

This directly contrasts the careful, deliberate answer just described.

💥 Poureth out repeats an earlier image

🚫 No pausing or studying happens here

🌊 Words spill out unfiltered

📖 This contrasts the careful answer above

## 🚧 The LORD Is Far From The Wicked

This distance is relational, not physical, since God sees every place.

This connects back to verse three, where God's eyes are everywhere.

Being seen by God does not mean having access to Him.

The wicked remain visible to God while remaining shut out from Him.

🚧 This distance is relational, not physical

🔁 This connects back to verse three

👁️ Being seen differs from having access

📖 The wicked are seen but shut out

## 👂 He Heareth The Prayer Of The Righteous

"Heareth" means actively listens and responds, not simply detects sound.

This directly contrasts the distance from the wicked just described.

Access to God is shown here as something righteousness opens up.

The same God who feels far to one person feels near to another.

👂 Heareth means actively listens and responds

🔄 This contrasts the distance above

🚪 Righteousness opens access to God

📖 The same God feels far or near

## ✨ The Light Of The Eyes Rejoiceth The Heart

"Light of the eyes" pictures a bright, joyful look on someone's face.

This is about the effect one person's joy has on another who sees it.

Seeing a genuinely happy face can lift the mood of an observer.

Joy is shown here as something that spreads simply by being visible.

✨ Light of the eyes pictures a joyful face

👀 This is joy's effect on an observer

😊 A happy face can lift another's mood

📖 Joy spreads simply by being seen

## 💪 A Good Report Maketh The Bones Fat

"Bones fat" was an ancient way of describing physical health and vigor.

Good news is described here as actually benefiting the body, not just the mood.

This proverb connects emotional relief to real physical wellbeing.

Ancient wisdom already understood a link modern medicine still studies.

💪 Bones fat described physical health then

🩺 Good news benefits the body, not the mood

🔗 This connects emotion to real wellbeing

📖 Ancient wisdom saw a link still studied

# Proverbs 15:31-33
# 👂 The Ear That Hears, The Fear That Founds
---
## 👂 The Ear That Heareth The Reproof Of Life

"Reproof of life" means correction that actually leads toward life.

This is not correction meant to harm or shame the hearer.

The phrase names what good correction is actually for.

Hard words, rightly given, are shown here aimed at someone's good.

👂 Reproof of life means correction toward life

🚫 It is not meant to harm or shame

🎯 It names what correction is actually for

📖 Hard words rightly given aim at someone's good

## 🏡 Abideth Among The Wise

"Abideth" means settles in permanently, not a brief passing visit.

This describes belonging, not merely occasional contact with wise people.

Willingness to hear correction is shown here as the entry point.

A person becomes part of that community by first learning to listen.

🏡 Abideth means settles in permanently

🤝 This describes belonging, not occasional contact

🚪 Willingness to listen is the entry point

📖 Listening well makes someone part of the wise

## 🙈 He That Refuseth Instruction Despiseth His Own Soul

"Refuseth" means actively rejects, closing the door on purpose.

"Despiseth his own soul" means the rejection actually harms the one refusing.

This names self harm, not merely stubbornness or independence.

Rejecting correction is shown here as an act against oneself.

🙈 Refuseth means actively rejects on purpose

💔 Despiseth his own soul means self harm

🎯 This names harm, not just stubbornness

📖 Rejecting correction acts against oneself

## 📈 He That Heareth Reproof Getteth Understanding

"Getteth" means actively gains, treating correction as something acquired.

This directly contrasts the self harm just described a moment before.

Correction is pictured here as a source of real growth, not humiliation.

What feels hard to hear can become something a person actually owns.

📈 Getteth means actively gains from it

🔄 This contrasts the self harm above

🌱 Correction is a source of real growth

📖 A hard word can become something owned

## 🙏 The Fear Of The LORD Is The Instruction Of Wisdom

This closing verse echoes the opening claim made back in Proverbs one.

"Fear of the LORD" means real reverence, taking God seriously.

This reverence is named here as wisdom's foundation, not one lesson among many.

Every proverb in this book ultimately rests on this one starting point.

🙏 This echoes the opening claim in Proverbs one

❤️ Fear of the LORD means real reverence

🏗️ This is wisdom's foundation, not one lesson

📖 Every proverb rests on this starting point

## 🌱 Before Honour Is Humility

"Honour" means being genuinely valued and respected by others.

This verse states the order plainly, humility comes first.

Many people try to reach honor without ever passing through humility.

The book's final proverb ends by naming the real path there.

🌱 Honour means being genuinely valued

🔢 The order is stated plainly here

🚫 Many skip humility to reach honor

📖 This proverb names the real path to honor
`.trim();

export const PROVERBS_FIFTEEN_PERSONAL_SECTIONS = parseProverbsFifteenRawNotes(PROVERBS_FIFTEEN_RAW_NOTES);
