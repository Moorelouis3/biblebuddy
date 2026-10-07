export type MatthewSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewSixRawNotes(rawText: string): MatthewSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 6:${startVerse}` : `Matthew 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 6 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_SIX_RAW_NOTES = `# Matthew 6:1-4
# 🤫 Giving In Secret
---
## 🪙 Take Heed That Ye Do Not Your Alms Before Men

"Alms" means money or goods given to help someone poor.

"Take heed" means pay careful attention, watch yourself closely.

Jesus is not condemning generosity itself in this verse.

He is targeting why the giving happens, not that it happens.

🪙 Alms means giving to help the poor

👀 Take heed means watch yourself closely

❤️ Generosity itself is not the problem

📖 Jesus targets the reason behind the giving

---

## 🎁 Otherwise Ye Have No Reward Of Your Father

This phrase sets up two very different kinds of reward.

One reward comes from people noticing and praising you now.

The other reward comes from your Father later, in heaven.

Jesus says you cannot collect both for the same act.

Choosing to be seen by people trades away the greater reward.

⚖️ Two different rewards are being compared

👀 One reward is human praise right now

🎁 The other reward comes from the Father

📖 You cannot collect both for one act

---

## 📯 Do Not Sound A Trumpet Before Thee

This phrase pictures someone announcing their own generosity loudly.

No evidence shows an actual trumpet sounded during real almsgiving.

Jesus exaggerates on purpose to describe a very public display.

The image makes the hidden motive impossible to miss.

📯 This pictures loud self announcement

🔍 No real trumpet custom is recorded here

🎭 Jesus exaggerates to describe a public display

📖 The image exposes a hidden motive

---

## 🎭 As The Hypocrites Do In The Synagogues And In The Streets

A "hypocrite" was originally an actor playing a part on stage.

Jesus borrows that image for someone performing goodness instead of living it.

Synagogues and streets were the most crowded, visible places in town.

The hypocrite picks the biggest possible audience on purpose.

🎭 Hypocrite originally meant a stage actor

👤 It describes performing goodness, not living it

🏛️ Synagogues and streets were crowded public places

📖 The hypocrite picks the biggest audience

---

## 🏆 That They May Have Glory Of Men

"Glory" here means praise, honor, and admiration from other people.

This is the actual goal hiding behind the public display.

Jesus says plainly that this is exactly what they get.

Human applause is real, but it runs out fast.

It never reaches all the way to God's reward.

🏆 Glory means praise and admiration

🎯 This was the real goal all along

⏳ Human applause runs out fast

📖 It never reaches God's reward

---

## 🤲 Let Not Thy Left Hand Know What Thy Right Hand Doeth

This is a vivid way of describing total secrecy.

No one, not even yourself in a sense, should keep score.

Jesus is correcting a wrong assumption that private giving needs witnesses.

Giving quietly removes the temptation to feel proud about it later.

🤲 This pictures total secrecy

🙅 Do not keep score of your own giving

🚫 Private giving needs no witness

📖 Secrecy removes the temptation toward pride

---

## 🎯 That Thine Alms May Be In Secret

This purpose clause explains the entire point of the instruction.

The goal was never to hide for its own sake.

The goal was keeping the motive pointed only toward God.

Secrecy here protects the heart, not just the action.

🎯 This explains the whole point of hiding

🤍 Hiding protects the motive, not the act

🙏 The aim is pointing toward God alone

📖 Secrecy guards the heart

---

## 👀 Thy Father Which Seeth In Secret Himself Shall Reward Thee Openly

God sees what no human audience will ever witness.

"Himself" emphasizes that God personally takes notice of hidden giving.

The reward promised here will one day be shown openly.

What stays hidden now will not stay hidden forever.

👀 God sees what people never see

🙋 Himself stresses God personally notices

🎁 The reward will one day be shown

📖 Hidden faithfulness will not stay hidden

# Matthew 6:5-8
# 🙏 Praying In Secret
---
## 🔁 Thou Shalt Not Be As The Hypocrites Are

Jesus moves from giving straight into the exact same warning about prayer.

The hypocrite problem was never only about money.

It applies just as easily to something as sacred as prayer.

Any spiritual practice can be twisted into a performance.

🔁 Jesus repeats the same warning for prayer

💰 The hypocrite problem was never only money

🙏 Even prayer can become a performance

📖 Any spiritual practice can be twisted

---

## 🧍 They Love To Pray Standing In The Synagogues And In The Corners Of The Streets

Standing to pray was a completely normal posture in this culture.

The problem was never the posture or the location by themselves.

The problem was choosing a spot specifically because people would notice.

Street corners offered the widest possible audience passing by.

🧍 Standing to pray was a normal posture

📍 Posture and location were never the real issue

👀 The spot was chosen to be noticed

📖 Corners gave the widest possible audience

---

## 🔁 That They May Be Seen Of Men

This is the second time this exact closing line appears in the chapter.

It already appeared once after the warning about giving in secret.

Jesus is building a pattern across giving, prayer, and soon fasting.

Each hidden discipline gets the same temptation and the same warning.

🔁 This is the second matching refrain

🪙 It already appeared with giving

📿 Jesus builds the same pattern for prayer

📖 A third match is still coming

---

## 🚪 Enter Into Thy Closet, And Shut Thy Door

A "closet" here means a small private room, not a clothes closet.

Most homes of this era had at least one such inner room.

Shutting the door removes every possible audience from the room.

Prayer here has nowhere left to perform for anyone.

🚪 Closet means a small private room

🏠 Most homes had a room like this

🔒 Shutting the door removes any audience

📖 Prayer here has no one to perform for

---

## 🙏 Thy Father Which Seeth In Secret Shall Reward Thee Openly

This is the second time this closing promise appears in the chapter.

The wording matches the ending used earlier for secret giving.

Jesus ties private prayer to the exact same kind of future reward.

God rewards what nobody else was ever meant to see.

🔁 This matches the earlier promise for giving

🙏 Private prayer gets the same reward promise

🎁 God rewards what no one else saw

📖 One more match is still coming for fasting

---

## 🌀 Use Not Vain Repetitions, As The Heathen Do

"Vain" here means empty or pointless, not simply untrue.

Many ancient religions used repeated chants believing the words carried power.

The heathen treated prayer like a spell needing exact words.

Jesus rejects that whole way of thinking about prayer.

🌀 Vain means empty or pointless here

📿 Some religions used chants like spells

🔮 They treated prayer like magic words

📖 Jesus rejects that entire approach

---

## 📏 They Think That They Shall Be Heard For Their Much Speaking

This assumption measures prayer by quantity instead of sincerity.

More words were thought to force a result from the gods.

Jesus flips that assumption completely upside down.

God is not persuaded by volume or length.

📏 This measures prayer by word count

🗣️ More words were thought to force results

🔄 Jesus flips that assumption over

📖 God is not moved by volume

---

## 🧠 Your Father Knoweth What Things Ye Have Need Of, Before Ye Ask Him

God already knows every need before any request is spoken.

Prayer is not informing God of something he does not already know.

Prayer is still asked for, out of relationship, not information transfer.

Knowing this should remove the pressure to perform or impress.

🧠 God knows needs before they are asked

📨 Prayer is not informing God of news

🤝 Prayer still matters for the relationship

📖 This removes pressure to perform

# Matthew 6:9-13
# 👨‍👧 The Lord's Prayer
---
## 🧭 After This Manner Therefore Pray Ye

"Manner" here means pattern or model, not an exact script.

Jesus gives his disciples a shape for prayer to follow.

This prayer was meant to be prayed and also imitated.

Christians have repeated this exact model for about two thousand years.

🧭 Manner means pattern, not an exact script

🙏 Jesus gives a model to follow

🔁 It can be prayed and imitated

📖 This model has lasted two thousand years

---

## 👨‍👧 Our Father Which Art In Heaven

Calling God "Father" directly was an unusually close way to address him.

Most Jewish prayers of this time used formal, distant titles for God.

"Our" ties every person praying this prayer into one shared family.

Heaven names God's complete, unmatched authority, not just a place in the sky.

👨‍👧 Father was an unusually close address

📜 Most prayers used more formal titles

👥 Our ties everyone into one family

📖 Heaven names God's complete authority

---

## ✨ Hallowed Be Thy Name

"Hallowed" means treated as holy, set apart from everything ordinary.

This is the very first request in the entire prayer.

Before asking for anything personal, the prayer asks God's name be honored.

Priorities in prayer start with God, not with personal need.

✨ Hallowed means treated as holy

🥇 This is the prayer's first request

🙏 God's name comes before personal need

📖 Prayer priorities start with God

---

## 👑 Thy Kingdom Come

The "kingdom" is God's reign breaking fully into the world.

This is not a request to simply go to heaven someday.

It asks for God's rule to arrive here, now, among people.

The prayer looks forward to something still coming in full.

👑 Kingdom means God's reign breaking in

🌍 This is not only about heaven someday

📍 It asks God's rule to arrive here

📖 The prayer looks forward to its fullness

---

## ☁️ Thy Will Be Done In Earth, As It Is In Heaven

In heaven, God's will is already followed completely and without resistance.

This line asks earth to start matching that same complete obedience.

It is a request for the praying person's own life too.

Heaven becomes the standard earth is being asked to reach.

☁️ Heaven follows God's will completely

🌍 Earth is asked to match that

🙋 This includes the one praying

📖 Heaven sets the standard for earth

---

## 🍞 Give Us This Day Our Daily Bread

This request asks only for today, not for a stockpile.

It echoes how Israel once gathered manna fresh each single day.

Hoarding food was never allowed under that older arrangement either.

This prayer trains a person toward daily trust instead of stockpiling.

🍞 This asks only for today

📜 It echoes the daily manna in the wilderness

🚫 Hoarding was never part of the plan

📖 This trains daily trust in God

---

## 📒 Forgive Us Our Debts, As We Forgive Our Debtors

"Debts" pictures sin as something owed to God, not yet paid back.

This request ties receiving forgiveness directly to giving forgiveness to others.

It is not earning forgiveness through good behavior toward people.

It is describing what a forgiven life naturally looks like.

📒 Debts pictures sin as something owed

🔗 Receiving and giving forgiveness are tied together

🚫 This is not earning forgiveness by being nice

📖 It describes what a forgiven life looks like

---

## 🙅 Lead Us Not Into Temptation

This line does not mean God tempts people toward sin.

James later states plainly that God tempts no one that way.

This is instead a request for protection from trial and testing.

It asks God to keep a person away from failure, not to cause it.

🙅 God does not tempt people to sin

📜 James says the same thing plainly

🛡️ This asks for protection from testing

📖 It asks to be kept from failure

---

## ⚠️ Deliver Us From Evil

"Evil" here might mean evil in general.

It might also point to the devil directly.

Many scholars read both meanings as true together.

Either way, this line asks God for rescue, not just avoidance.

The prayer closes its requests by turning back to God's protection.

⚠️ Evil may mean evil in general

👹 It may also point to the devil directly

🙏 Many scholars hold both readings

📖 This asks for rescue, not just avoidance

---

## 🙌 For Thine Is The Kingdom, And The Power, And The Glory, For Ever

This closing line is often called a doxology, a short burst of praise.

Many of the oldest Greek manuscripts of Matthew do not include this line.

It was likely added early on for use in church worship services.

Even so, it captures exactly where this whole prayer has been pointing.

🙌 This closing is called a doxology

📜 The oldest manuscripts often leave it out

⛪ It was likely added for worship use

📖 It still captures the prayer's whole direction

# Matthew 6:14-15
# 🔁 Forgiveness For Forgiveness
---
## 📝 If Ye Forgive Men Their Trespasses

"Trespasses" means wrongs or offenses committed against another person.

This picks up directly from the debts request just prayed a moment earlier.

Jesus pauses the prayer's flow to explain this one line further.

Out of the whole prayer, this is the line he immediately returns to.

📝 Trespasses means wrongs against another person

🔗 This picks up the earlier debts request

⏸️ Jesus pauses to explain this one line

📖 This is the line he returns to

---

## 🎁 Your Heavenly Father Will Also Forgive You

This promise directly answers the forgiveness request inside the prayer itself.

Forgiving others is shown here as something a forgiven life produces.

It is described as a pattern, not a bargain struck with God.

A forgiving heart and a forgiven heart move together.

🎁 This answers the prayer's own request

🌱 Forgiving others grows from being forgiven

🤝 This is a pattern, not a bargain

📖 A forgiving heart and forgiven heart move together

---

## 🔄 If Ye Forgive Not Men Their Trespasses

This verse states the same idea again, now from its opposite side.

Refusing to forgive blocks your own forgiveness from reaching you.

Jesus states this warning flatly, without softening it at all.

He wants the warning to be impossible to miss or explain away.

🔄 This states the same idea in reverse

🚧 Refusing to forgive blocks your own forgiveness

⚠️ Jesus states this warning flatly

📖 He wants the warning impossible to miss

---

## ⚠️ Neither Will Your Father Forgive Your Trespasses

This is the most sobering line in the entire prayer's explanation.

Withholding forgiveness from others puts a person's own standing with God at risk.

Jesus does not attach a softer exception anywhere in this warning.

Receiving mercy and extending mercy are never fully separated from each other.

⚠️ This is the prayer's most sobering line

🚧 Withholding forgiveness risks your own standing

🙅 No softer exception is attached here

📖 Receiving and extending mercy stay connected

# Matthew 6:16-18
# 😐 Fasting In Secret
---
## 😐 Be Not, As The Hypocrites, Of A Sad Countenance

"Countenance" means facial expression, the look on someone's face.

"Fasting" means voluntarily going without food for a spiritual purpose.

A sad countenance here was a performance of suffering for an audience.

Jesus completes the same warning already given for giving and prayer.

😐 Countenance means facial expression

🍽️ Fasting means going without food on purpose

🎭 A sad face here was a performance

📖 This completes the same warning pattern

---

## 🎭 They Disfigure Their Faces, That They May Appear Unto Men To Fast

Some in this culture smeared ash or dust on their faces while fasting.

Others left their faces deliberately unwashed to look like they were suffering.

This is the third time the exact same reward refrain appears in this chapter.

Giving, praying, and now fasting all get this identical warning and ending.

🎭 Some smeared ash or dust on purpose

🙅 Others stayed deliberately unwashed looking

🔁 This is the third matching refrain

📖 Giving, prayer, and fasting all match

---

## 🧴 Anoint Thine Head

Putting oil on the head was ordinary daily grooming in this culture.

It was not a luxury reserved only for celebrations or special events.

Jesus tells his listener to keep doing this ordinary act while fasting.

Looking normal on the outside while sorrowing inside was exactly the point.

🧴 Oil on the head was ordinary grooming

🎉 It was not reserved for celebrations

🙂 Jesus says to keep doing this

📖 Looking normal outside was the point

---

## 💧 And Wash Thy Face

Washing the face was another basic, everyday act of hygiene.

Skipping it on purpose was how a hypocrite advertised their fasting.

Jesus pairs normal grooming with normal washing to erase that advertisement.

Fasting here stays entirely between the person and God.

💧 Washing the face was basic hygiene

📢 Skipping it advertised the fast

🙈 Jesus erases that advertisement on purpose

📖 Fasting stays between the person and God

---

## 🔁 That Thou Appear Not Unto Men To Fast, But Unto Thy Father Which Is In Secret

This closes the third and final version of the chapter's repeated pattern.

Giving, prayer, and fasting have each now been hidden from a human audience.

Each one is instead placed in front of God alone.

Each one carries the exact same promise of a reward given openly later.

🔁 This closes the third matching pattern

🪙 Giving, prayer, and fasting all match now

👁️ Each one is placed before God alone

📖 Each one still carries the same promise

# Matthew 6:19-21
# 💰 Where Your Treasure Is
---
## 💰 Lay Not Up For Yourselves Treasures Upon Earth

"Treasures" means wealth or valuable possessions gathered up and stored away.

Jesus is not condemning having money or owning things outright.

He is warning against making earthly wealth a person's main security.

Anything stored only on earth eventually faces decay or loss.

💰 Treasure means wealth gathered and stored

🚫 Owning things is not condemned here

⚠️ The warning is against earthly security

📖 Earthly storage always faces decay or loss

---

## 🦋 Where Moth And Rust Doth Corrupt

A "moth" is an insect that eats through stored fabric and clothing.

Clothing itself was a major, expensive form of wealth in this era.

"Rust" describes corrosion that slowly eats away at stored metal.

Even careful storage could not fully protect wealth from decay.

🦋 Moth describes an insect that eats fabric

👗 Clothing was a major form of wealth

🔧 Rust describes metal slowly corroding

📖 Careful storage still could not stop decay

---

## 🧱 And Where Thieves Break Through And Steal

Many homes in this region were built from mud brick walls.

A determined thief could literally dig straight through a wall like that.

Earthly wealth stayed vulnerable even when it was locked away carefully.

No earthly storage method offered complete, lasting protection.

🧱 Homes were often built from mud brick

🔨 Thieves could dig straight through a wall

🔒 Locked storage was still not safe

📖 No earthly method gave full protection

---

## 👑 Lay Up For Yourselves Treasures In Heaven

This is the direct contrast to the earthly treasure just described.

Heavenly treasure faces no decay, no rust, and no thief.

Jesus is not describing how to literally send money to heaven.

He means a life invested in what God values lasts forever.

👑 This contrasts with earthly treasure

🛡️ Heavenly treasure faces no decay or theft

🙏 This is not about literally sending money

📖 A life invested in God's values lasts

---

## 🎯 For Where Your Treasure Is, There Will Your Heart Be Also

This line names the actual point behind the whole illustration.

What a person treasures ends up shaping what that person loves.

Spending and saving patterns quietly reveal a person's real priorities.

The heart follows the treasure, not the other way around.

🎯 This names the point of the illustration

💭 Treasure shapes what a person loves

💳 Spending reveals real priorities

📖 The heart follows the treasure

# Matthew 6:22-24
# 👁️ The Eye And Two Masters
---
## 👁️ The Light Of The Body Is The Eye

In this culture, the eye was pictured as a gateway letting light fill a person.

This is not a statement about how eyes work biologically.

It is a word picture about spiritual focus and direction.

What a person fixes their attention on fills their whole life.

👁️ The eye pictures a gateway for light

🔬 This is not about eye biology

🧭 It pictures spiritual focus and direction

📖 Attention fills a person's whole life

---

## 🎯 If Therefore Thine Eye Be Single, Thy Whole Body Shall Be Full Of Light

"Single" here means healthy, clear, and focused on one thing.

This continues the money theme from the verses just before it.

An undivided focus on God fills a person's whole life with light.

A divided focus, split between God and money, cannot do the same.

🎯 Single means clear, undivided focus

🔗 This continues the money theme

💡 Undivided focus on God brings light

📖 Divided focus cannot do the same

---

## 🚫 But If Thine Eye Be Evil, Thy Whole Body Shall Be Full Of Darkness

This does not describe an ancient superstition about a curse.

"Evil" here means a greedy or divided focus turned away from God.

That wrong focus spreads its effect through a person's entire life.

A corrupted inner compass leads the whole person in the wrong direction.

🚫 This is not about superstition

💰 Evil means a greedy, divided focus

🌑 The wrong focus spreads through the whole life

📖 A corrupted compass leads the wrong way

---

## ⚠️ If The Light That Is In Thee Be Darkness, How Great Is That Darkness

This warns about a worse problem than simple ignorance.

Ignorance at least knows it needs more light to see clearly.

A corrupted inner guide trusts itself while leading a person astray.

That combination makes the resulting darkness far greater than plain ignorance.

⚠️ This warns past simple ignorance

🤷 Ignorance at least knows it lacks light

🧭 A corrupted guide trusts itself anyway

📖 That combination makes darkness far greater

---

## 🏠 No Man Can Serve Two Masters

In this culture, a servant's full obedience belonged to one master alone.

Serving two masters with competing demands was not realistically possible.

Jesus uses this familiar household picture to describe loyalty itself.

Full devotion cannot be split evenly between two rival claims.

🏠 A servant obeyed one master fully

⚖️ Serving two masters was not realistic

🙏 Jesus uses this picture for loyalty

📖 Devotion cannot split between rivals

---

## 💰 Ye Cannot Serve God And Mammon

"Mammon" is an Aramaic word for wealth, money, and material riches.

Jesus treats mammon here as if it were a rival master.

Money becomes a master when it demands the loyalty only God deserves.

This verse names the real competition running underneath the whole chapter.

💰 Mammon means wealth or material riches

👑 Jesus treats it like a rival master

🎯 Money becomes a master demanding loyalty

📖 This names the chapter's real competition

# Matthew 6:25-30
# 🐦 Birds, Lilies, And Worry
---
## 😟 Take No Thought For Your Life

This old phrase means do not be consumed by anxious worry.

It does not mean never thinking ahead or making any plans.

Jesus is targeting anxiety, not ordinary responsibility or preparation.

This verse moves straight from money into the worry money produces.

😟 This means do not be consumed by worry

📅 It does not forbid thinking ahead

🎯 Jesus targets anxiety, not planning

📖 Money and worry are directly linked here

---

## ⚖️ Is Not The Life More Than Meat, And The Body Than Raiment

"Meat" means food in general here, not only animal flesh.

"Raiment" means clothing, an old word still used in this period.

This question weighs something small against something far larger.

Food is the small thing in the comparison.

Life itself is the much larger thing being weighed.

If God already handles the larger need, the smaller need is not the real worry.

🍖 Meat means food in general here

👗 Raiment means clothing

⚖️ Life itself outweighs food and clothing

📖 The larger need settles the smaller worry

---

## 🐦 Behold The Fowls Of The Air

"Fowls" is an old word simply meaning birds.

These are the common, ordinary birds visible right then in the sky.

Jesus points to something his listeners could see immediately as he spoke.

The example was not abstract or hard to picture at all.

🐦 Fowls is an old word for birds

👀 These were common, ordinary birds nearby

☁️ Listeners could see them right then

📖 The example was easy to picture

---

## 🌱 They Sow Not, Neither Do They Reap, Nor Gather Into Barns

"Sow" means planting seed, and "reap" means harvesting a crop.

Birds do none of the normal farming work people rely on.

They also keep no stored supply the way a barn does.

Yet they are fed anyway, day after day, without any of that effort.

🌱 Sow means planting seed

🌾 Reap means harvesting a crop

🏚️ Birds keep no stored supply

📖 They are fed without farming or storing

---

## ❓ Are Ye Not Much Better Than They

God already cares for creatures with no eternal worth compared to people.

People carry far more value to God than any bird ever could.

This question pushes listeners to compare their worry against that fact.

If birds are cared for this well, people have even less reason to worry.

🐦 Birds already receive God's daily care

👤 People carry far more value to God

❓ This question challenges the listener directly

📖 People have even less reason to worry

---

## 📏 Which Of You By Taking Thought Can Add One Cubit Unto His Stature

A "cubit" was an ancient measurement close to the length of a forearm.

"Stature" means a person's height.

Worry cannot physically add even this small an amount to anyone's body.

This proves worry is powerless over the very things it worries about.

📏 A cubit was about a forearm's length

📐 Stature means height

🚫 Worry cannot add even this small amount

📖 Worry is powerless over what it fears

---

## 🌸 Consider The Lilies Of The Field, How They Grow

"Lilies of the field" describes common wildflowers across the hillsides of Galilee.

These were not planted, tended, or cared for by anyone.

Jesus points again to something ordinary and already familiar to his listeners.

Beauty here appears without any human effort behind it at all.

🌸 Lilies were common Galilean wildflowers

🙅 No one planted or tended them

👀 This was familiar to every listener

📖 Their beauty required no human effort

---

## 🧵 They Toil Not, Neither Do They Spin

"Toil" means hard manual labor, and "spin" means making thread for cloth.

Spinning thread by hand was slow, exhausting work every person knew well.

Lilies skip both tasks completely and still end up looking stunning.

Their beauty was never the product of effort or labor.

💪 Toil means hard manual labor

🧵 Spin means making thread for cloth

🌸 Lilies skip both tasks entirely

📖 Their beauty was never earned by labor

---

## 👑 Even Solomon In All His Glory Was Not Arrayed Like One Of These

Solomon was famous across the ancient world for enormous wealth and luxury.

"Arrayed" means dressed or clothed, often used for fine, impressive clothing.

Jesus compares Solomon's legendary royal clothing directly to a simple wildflower.

The wildflower wins that comparison without even trying.

👑 Solomon was famous for enormous wealth

👗 Arrayed means dressed in fine clothing

🌸 Jesus compares him to a simple flower

📖 The wildflower wins without even trying

---

## 🔥 If God So Clothe The Grass Of The Field, Which Today Is, And Tomorrow Is Cast Into The Oven

This grass lived only one single day before being burned as fuel.

Ovens in this culture were often fueled with dried grass instead of wood.

Even something this short lived and disposable gets clothed beautifully by God.

God's care reaches even what people would consider the least important thing.

🔥 This grass was burned as oven fuel

🌾 Dried grass was common fuel in this era

🌸 Even this gets clothed beautifully by God

📖 God's care reaches the least important things

---

## 🎯 Shall He Not Much More Clothe You, O Ye Of Little Faith

This question lands the entire argument built across these six verses.

If God dresses short lived grass this well, people matter even more to him.

People also last far longer than a single day of grass ever does.

"Little faith" names worry as what it actually is, not just caution.

🎯 This lands the whole argument

🌸 People matter more to God than grass

⏳ People also last far longer than grass

📖 Little faith names worry for what it is

# Matthew 6:31-34
# 👑 Seek First The Kingdom
---
## 🔁 Take No Thought, Saying, What Shall We Eat

This repeats the same three worries named earlier in the chapter.

Food, drink, and clothing stand in for basic daily survival needs.

Jesus restates them together here as one final summary.

Repeating them this way drives the main point home one last time.

🔁 This repeats the earlier three worries

🍽️ Food, drink, and clothing represent basic needs

📋 Jesus restates them as one summary

📖 Repetition drives the point home

---

## 🌍 For After All These Things Do The Gentiles Seek

"Gentiles" here means people outside a covenant relationship with God.

Chasing food, drink, and clothing as the main goal in life marks that outlook.

A life with no bigger story to trust ends up anxious by default.

Jesus contrasts that outlook with the life his disciples are meant to live.

🌍 Gentiles means people outside covenant with God

🏃 Chasing basics becomes their main goal

😟 That outlook ends up anxious by default

📖 Jesus contrasts this with his disciples' life

---

## 👨‍👧 Your Heavenly Father Knoweth That Ye Have Need Of All These Things

This repeats the same promise already given earlier in the chapter.

Disciples already have a Father who knows their needs before they ask.

That security is exactly what the Gentiles' anxious chase is missing.

Knowing this is meant to replace worry with trust.

🔁 This repeats an earlier promise

👨‍👧 The Father already knows every need

🔒 This security is what the Gentiles miss

📖 Trust is meant to replace worry

---

## 🥇 Seek Ye First The Kingdom Of God, And His Righteousness

"Seek first" means make this the top priority, not the only concern.

This verse names the real cure for the anxious chase just described.

"Righteousness" here means living in right relationship with God and others.

Priorities placed in the right order change everything that follows.

🥇 Seek first means top priority

💊 This verse names the real cure

⚖️ Righteousness means right relationship with God

📖 Right priorities change everything after

---

## 🎁 And All These Things Shall Be Added Unto You

This promise does not guarantee wealth or a life free of hardship.

It promises that daily needs will be met along the way.

Provision here follows the pursuit of God's kingdom, not the other way around.

This verse answers the entire worry problem raised across this passage.

🎁 This does not promise guaranteed wealth

🍞 It promises daily needs will be met

🔄 Provision follows seeking the kingdom

📖 This answers the chapter's whole worry problem

---

## 📅 Take Therefore No Thought For The Morrow

"Morrow" is an old word simply meaning tomorrow.

This instruction asks a person not to borrow tomorrow's worry today.

Today already carries enough of its own weight to deal with.

Jesus closes the chapter by bringing the worry teaching into the present moment.

📅 Morrow is an old word for tomorrow

🙅 This means do not borrow tomorrow's worry

⚖️ Today carries its own weight already

📖 Jesus closes by returning to today

---

## 🗣️ For The Morrow Shall Take Thought For The Things Of Itself

This line pictures tomorrow almost like a person with its own problems.

Tomorrow will bring its own concerns when it actually arrives.

There is no need to carry those concerns in advance.

This is a vivid way of saying stay in the present day.

🗣️ Tomorrow is pictured almost like a person

📦 It brings its own concerns when it arrives

🚫 There is no need to carry it early

📖 This means staying in the present day

---

## ⚖️ Sufficient Unto The Day Is The Evil Thereof

"Evil" here means trouble or hardship, not necessarily wrongdoing.

Each day already carries enough trouble of its own to deal with.

Adding tomorrow's imagined trouble on top only doubles the real burden.

This final line closes the chapter's entire argument against anxious worry.

⚖️ Evil here means trouble, not wrongdoing

📆 Each day already carries enough trouble

➕ Adding tomorrow's trouble doubles the burden

📖 This closes the chapter's whole argument
`.trim();

export const MATTHEW_SIX_PERSONAL_SECTIONS = parseMatthewSixRawNotes(MATTHEW_SIX_RAW_NOTES);
