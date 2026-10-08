export type MatthewThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewThirteenRawNotes(rawText: string): MatthewThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 13:${startVerse}` : `Matthew 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Matthew 13 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_THIRTEEN_RAW_NOTES = `# Matthew 13:1-4
# 🌱 The Sower Went Forth To Sow
---
## 🏠 The Same Day Went Jesus Out Of The House

"The same day" points back to the house scene that just happened.

Jesus had just finished redefining his true family inside that house.

Now he walks straight out and down toward the water.

Matthew is tracking one long, continuous day, not a new unrelated story.

🏠 Same day links back to the house scene
👪 Jesus had just redefined his family
🌊 He now walks toward the water
📖 One long day keeps unfolding

---

## 🚢 He Went Into A Ship, And Sat

Jesus did not climb into the boat to escape the crowd.

Sitting just offshore let his voice carry across still water to everyone standing on the shore.

The beach near Galilee curves like a natural bowl that holds sound well.

Teachers in this culture normally sat down to teach.

The crowd was expected to stand and listen.

🚢 Jesus sat in the boat on purpose
🌊 Water carried his voice to the shore
🏛️ Galilee's beach acts like a natural bowl
📖 He used the best stage available

---

## 📚 He Spake Many Things Unto Them In Parables

A "parable" is an earthly story carrying a heavenly meaning underneath it.

It was not a complicated puzzle meant to confuse people on purpose.

A parable reveals truth to someone willing to think, and hides it from someone who refuses to.

Jesus had used short parables before, but never this many in a row.

This chapter marks a clear shift in how he now teaches the crowds.

📚 Parable means an earthly story, heavenly meaning
🧠 It was not a puzzle to confuse
🔓 It reveals truth to a willing heart
📖 This chapter marks a clear shift

---

## 🛤️ Some Seeds Fell By The Way Side, And The Fowls Came And Devoured Them Up

The "way side" was the footpath worn hard by feet walking along the edge of a field.

Packed, hardened ground like that could not let a seed sink in at all.

Birds overhead could already see every exposed seed sitting right on top of the dirt.

This pictures a heart so hardened that truth never even gets a chance to take hold.

🛤️ Way side means a hard worn footpath
🚫 Packed ground could not hold a seed
🐦 Exposed seed sat in plain sight
📖 This pictures a hardened closed heart

---

# Matthew 13:5-9
# 🌾 Four Soils, One Seed
---
## 🪨 Some Fell Upon Stony Places, Where They Had Not Much Earth

"Stony places" means ground with a shelf of limestone rock just under a thin layer of soil.

A seed there sprouts fast, because shallow soil warms quickly in the sun.

But the roots hit solid rock within days and can never dig any deeper.

Fast growth with no root is not the same thing as real growth.

🪨 Stony places means rock under thin soil
🌱 Shallow soil makes seeds sprout fast
🚧 Roots hit rock and cannot go deeper
📖 Fast growth without root is not real growth

---

## 💧 Because They Had No Root, They Withered Away

A root is what pulls water deep underground up into a growing plant.

Without one, a plant survives only as long as surface moisture lasts.

The sun that helps good plants grow is the same sun that kills rootless ones.

Jesus is describing a person whose faith never grew a real root underneath.

💧 Root pulls water from deep underground
☀️ No root means surface moisture only
🔥 The same sun helps and kills
📖 Faith needs a real root underneath

---

## 🌿 The Thorns Sprung Up, And Choked Them

Thorny ground already has deep, established roots fighting for the same water and light.

A new seed sprouts fine at first, right alongside those older thorn roots.

Over time the thorns grow faster and choke the smaller plant to death.

This pictures a slow crowding out of someone's faith, not a sudden death.

🌿 Thorny ground already has established roots
🌱 A new seed sprouts right alongside them
🥀 Thorns eventually choke the smaller plant
📖 This pictures a slow crowding out of faith

---

## 🌾 Other Fell Into Good Ground, And Brought Forth Fruit, Some An Hundredfold

Good ground means soil that is soft and deep.

It is also clear of rocks and thorns.

A farmer in this culture normally expected a harvest of about five to ten times what he planted.

An "hundredfold" means the seed multiplied one hundred times over.

That kind of harvest was never normal.

It was a sign of something supernatural at work underneath the surface.

🌾 Good ground means soft, deep soil
🚫 It was clear of rocks and thorns
💯 Hundredfold means a hundred times the seed
📖 This yield signals something supernatural

---

## 👂 Who Hath Ears To Hear, Let Him Hear

This is not a comment about anyone's physical hearing ability.

Everyone standing on that shore had working ears.

The phrase is an invitation to actually listen and let the meaning sink in.

Jesus repeats this exact line later in the chapter, after the hardest warning in verse 43.

Hearing, in this sense, means choosing to receive what is being said.

👂 This is not about physical hearing
🌊 Everyone on the shore could hear fine
🎯 It means choosing to really listen
📖 Jesus repeats this line again later

# Matthew 13:10-17
# 🤔 Why Speakest Thou Unto Them In Parables
---
## 🙋 Why Speakest Thou Unto Them In Parables?

The disciples pull Jesus aside with a direct question about his method.

They had heard him teach plainly before, without stories like this.

Something about this shift in teaching style caught their attention immediately.

His answer will reveal something important about how people actually receive truth.

🙋 Disciples ask about his new method
📣 He used to teach more plainly
👀 The shift caught their attention
📖 His answer reveals how people receive truth

---

## 🔐 It Is Given Unto You To Know The Mysteries Of The Kingdom Of Heaven

A "mystery" here does not mean something spooky or impossible to solve.

It means a truth that stayed hidden until God chose the right time to reveal it.

The disciples are being let in on something people could not fully understand before now.

Being allowed to understand is itself a gift, not something anyone earned.

🔐 Mystery does not mean spooky or scary
⏳ It means truth hidden until the right time
🎁 Understanding it is a gift
📖 The disciples are let in on this

---

## 🙅 But To Them It Is Not Given

This does not mean God randomly blocked some people from ever understanding.

The crowd had already seen miracle after miracle and still refused to believe.

Closing your own eyes again and again eventually hardens into not being able to see at all.

Jesus is describing a result of their own repeated refusal, not an arbitrary decision.

🙅 This is not random exclusion by God
👀 They had already seen many miracles
🔒 Repeated refusal hardens into not seeing
📖 This describes their own choice, not God's

---

## 💪 Whosoever Hath, To Him Shall Be Given

Understanding works like a muscle that grows stronger the more it gets used.

Someone who acts on truth they already have gets handed even more.

That growth was already happening in the disciples, right in front of the crowd.

Spiritual insight is never static.

It either grows or it fades.

💪 Understanding grows like an exercised muscle
➕ Using truth brings even more truth
👀 The disciples were already growing this way
📖 Spiritual insight never stays still

---

## 📉 From Him Shall Be Taken Away Even That He Hath

This is the uncomfortable flip side of the same principle.

Someone who ignores the truth they already have slowly loses even that.

Refusing to use what little light you have does not preserve it.

The crowd that rejected Jesus was actually losing ground, not staying neutral.

📉 Ignored truth slowly disappears
🕯️ Unused light is not preserved
⚖️ Standing still was never neutral
📖 The crowd was losing ground, not staying put

---

## 👁️ They Seeing See Not, And Hearing They Hear Not

This sounds like a contradiction, but it is describing two different things.

Their physical eyes and ears worked completely fine that day.

What failed was something deeper, understanding itself, not the senses.

A person can watch a miracle happen and still refuse to let it change anything inside.

👁️ Their eyes and ears worked fine
🧠 Understanding is what actually failed
🔒 A closed heart can watch and still refuse
📖 Senses are not the same as understanding

---

## 📜 Fulfilled The Prophecy Of Esaias

"Esaias" is simply the Greek form of the Hebrew name Isaiah.

Isaiah had written this exact warning about Israel hundreds of years earlier.

He predicted a generation that would see and hear without ever truly understanding.

Matthew is showing that what is happening right now was not a surprise to God.

📜 Esaias is the Greek form of Isaiah
⏳ Isaiah wrote this centuries beforehand
🎯 He predicted this exact kind of hardness
📖 None of this surprised God

---

## 👀 Blessed Are Your Eyes, For They See

Jesus turns from the crowd's hardness to his own disciples directly.

Their eyes and ears were receiving something many people never got to receive.

Many prophets and righteous men had longed to see this exact moment.

David and Isaiah died waiting for a day the disciples were now living inside.

👀 Jesus turns to address his disciples
🎁 They were receiving a rare gift
⏳ Prophets longed to see this moment
📖 The disciples were living inside that promise

# Matthew 13:18-23
# 🌾 The Parable Of The Sower Explained
---
## 🔑 Hear Ye Therefore The Parable Of The Sower

Jesus now does something he rarely does in the Gospels.

He explains his own parable, phrase by phrase, instead of leaving it a mystery.

This interpretation becomes the key that unlocks how to read every parable after it.

Readers today still rely on this exact explanation to understand the parable correctly.

🔑 Jesus rarely explains his own parables
🗣️ He explains this one in full
🗝️ It becomes the key to reading the rest
➡️ We still rely on this explanation today

---

## 😈 Then Cometh The Wicked One, And Catcheth Away That Which Was Sown In His Heart

The "wicked one" is a direct name for Satan, not a vague force.

The seed sown by the way side never even gets the chance to sink in.

A hardened heart lets truth sit right on the surface, exposed and unprotected.

Satan does not need to fight hard against truth that was never allowed to take root.

😈 The wicked one names Satan directly
🛤️ This is the way side seed again
🚫 A hard heart leaves truth unprotected
📖 Unrooted truth is an easy target

---

## ⏱️ Anon With Joy Receiveth It

"Anon" is an old word that simply means right away or immediately.

This person's excitement is real, but it has nothing holding it up underneath.

Joy without depth looks exactly like faith at first glance.

The difference only shows up once real pressure arrives.

⏱️ Anon means right away
😊 The excitement here is genuine
🏗️ Nothing holds it up underneath
📖 Depth only shows up under pressure

---

## 🌪️ When Tribulation Or Persecution Ariseth Because Of The Word, By And By He Is Offended

"Tribulation" means hard pressure or suffering from circumstances.

"Persecution" means being specifically targeted and mistreated for following Jesus.

To be "offended" here means something closer to stumbling and falling away completely.

A faith with no root cannot survive the weight of either one.

🌪️ Tribulation means hard outside pressure
🎯 Persecution means being targeted for faith
🪨 Offended here means falling away
📖 Rootless faith cannot survive the weight

---

## 💰 The Care Of This World, And The Deceitfulness Of Riches, Choke The Word

"Deceitfulness of riches" means money's false promise that it can cover every need.

Wealth can buy comfort, but it cannot buy peace, meaning, or eternal security.

The care of this world covers everyday worry, bills, status, and endless distraction.

Both slowly crowd out room for the word to keep growing.

💰 Riches falsely promise to cover every need
😌 Money cannot buy real peace
📋 Worldly care means worry and distraction
📖 Both slowly crowd out the word

---

## 🌾 Which Also Beareth Fruit, And Bringeth Forth, Some An Hundredfold

Good ground in this parable means someone who both hears and actually understands.

Hearing alone was never the point of any of these four types of soil.

Real fruit is the only proof that the word ever truly took root.

The whole parable comes down to one question, what finally happens to the seed.

🌾 Good ground means hearing and understanding
🍇 Fruit is the proof it took root
❓ Hearing alone was never the real point
📖 The parable ends on this one question

# Matthew 13:24-30
# 🌾 The Wheat And The Tares
---
## 🌾 The Kingdom Of Heaven Is Likened Unto A Man Which Sowed Good Seed In His Field

Jesus starts a brand new parable with a familiar farming scene.

A man plants good seed, expecting a normal, healthy harvest later.

Nothing in this opening line hints at the trouble still coming.

The peaceful setup makes the next verse land even harder.

🌾 A new parable opens calmly
🌱 Good seed is planted with normal hope
😌 Nothing yet hints at trouble
📖 The calm setup makes trouble land harder

---

## 🌙 While Men Slept, His Enemy Came And Sowed Tares Among The Wheat

"Tares" is an old word for a specific weed called darnel.

Darnel looks almost exactly like wheat until both plants are nearly grown.

The enemy strikes at night, when the field feels safest.

This enemy is not named yet, but the picture of sabotage is already clear.

🌾 Tares is an old word for darnel
👀 Darnel looks just like wheat early on
🌙 The enemy strikes when it feels safest
📖 Sabotage is already pictured here

---

## 🌱 When The Blade Was Sprung Up, And Brought Forth Fruit, Then Appeared The Tares Also

"Blade" here simply means the first green shoot pushing up out of the ground.

Up to this point, nobody could tell wheat and weed apart at all.

Only once the plants matured and formed grain heads did the difference finally show.

This explains why the servants did not catch the problem immediately.

🌱 Blade means the first green shoot
👁️ Wheat and weed looked identical at first
🌾 Grain heads finally revealed the difference
📖 This explains the servants' delay

---

## 🙋 Wilt Thou Then That We Go And Gather Them Up?

The servants want to fix this problem the moment they spot it.

Their instinct is understandable.

Nobody likes a damaged field.

Jesus is about to correct an urge that feels responsible but is not.

Good intentions are not the same thing as good timing.

🙋 Servants want to fix it immediately
❤️ Their instinct feels responsible
🛑 Jesus is about to correct that urge
📖 Good intentions are not good timing

---

## 🌱 Lest While Ye Gather Up The Tares, Ye Root Up Also The Wheat With Them

Wheat and darnel do not just look alike above the ground.

Their roots actually tangle together underneath the soil as both plants grow.

Pulling one up early risks tearing out the good plant right along with it.

Patience here protects the wheat as much as it delays judging the weed.

🌱 Darnel and wheat tangle roots underground
⚠️ Pulling one risks tearing out the other
⏳ Patience protects the good plant
📖 Waiting is not the same as ignoring

---

## 🏠 Let Both Grow Together Until The Harvest

This is the householder's final decision, and Jesus's deeper point underneath it.

God allows the genuine and the false to grow side by side for a season.

Sorting people out now is not our job and was never meant to be.

Final judgment belongs to a harvest time that has not arrived yet.

🏠 This is the householder's final decision
🌾 God lets both grow for a season
🙅 Sorting people out is not our job
📖 Final judgment waits for harvest time

---

## 🔥 Gather Ye Together First The Tares, And Bind Them In Bundles To Burn Them, But Gather The Wheat Into My Barn

The harvest here pictures final judgment at the end of time.

Tares get bundled up and burned.

That pictures a real and final destruction.

Wheat gets carried safely into the barn.

That same harvest moment holds both an ending and a beginning.

🔥 Tares are bundled and burned
🏚️ That means real, final destruction
🌾 Wheat is carried safely into the barn
📖 One harvest holds an ending and a start

# Matthew 13:31-35
# 🌰 The Mustard Seed, The Leaven, And Hidden Things Made Known
---
## 🌰 The Kingdom Of Heaven Is Like To A Grain Of Mustard Seed

A "mustard seed" in this region was known as one of the smallest seeds a farmer handled.

Jesus picks the smallest possible seed on purpose for this comparison.

The kingdom does not need to start big to end up enormous.

Small, faithful beginnings are exactly how this kingdom grows.

🌰 Mustard seed was known as tiny
🎯 Jesus picks it on purpose
🌳 Small starts can end up enormous
📖 Faithful beginnings are how this kingdom grows

---

## 🤏 Is The Least Of All Seeds

This line makes sure nobody misses just how small the starting point is.

A single mustard seed barely weighs anything in the hand.

Nothing about its size suggests it could ever become something large.

That gap between the start and the end is the whole point.

🤏 The seed is genuinely tiny
✋ It barely weighs anything at all
🙅 Nothing hints at its future size
📖 The gap itself is the whole point

---

## 🌳 When It Is Grown, It Is The Greatest Among Herbs, And Becometh A Tree

What starts as the smallest seed becomes the largest plant in the garden.

Mustard plants in this region could grow tall enough to look like a small tree.

Birds actually nested and rested in its branches, just as the verse describes.

The kingdom follows that same pattern of small beginning, large and lasting result.

🌳 Smallest seed becomes the largest plant
🐦 Birds could rest in its branches
📏 It could grow as tall as a tree
📖 Small beginnings lead to lasting results

---

## 🍞 The Kingdom Of Heaven Is Like Unto Leaven, Which A Woman Took, And Hid In Three Measures Of Meal

"Leaven" is an old word for yeast, the ingredient that makes bread rise.

Through most of the Old Testament, leaven actually pictured something corrupting, not something good.

Here Jesus flips that picture and uses leaven in a positive sense.

Three measures of meal was an unusually large batch, enough to feed about a hundred people.

A tiny amount of yeast was enough to transform that entire batch.

🍞 Leaven is an old word for yeast
🔄 Jesus flips its usual negative picture
🥣 Three measures was a huge batch of flour
📖 A little yeast transformed the whole batch

---

## ✍️ Without A Parable Spake He Not Unto Them

Matthew pauses the story to point out something about Jesus's whole teaching style that day.

Every single thing Jesus said to the crowd that day came wrapped in a story.

Not one plain, direct lecture escaped the parable form during this stretch of teaching.

This level of consistency was deliberate, not accidental.

✍️ Matthew pauses to note this pattern
📚 Every word came wrapped in a story
🚫 Not one plain lecture slipped through
📖 The consistency here was deliberate

---

## 📜 I Will Utter Things Which Have Been Kept Secret From The Foundation Of The World

This line is a direct quote from an old psalm, not a new saying of Jesus.

Psalm seventy eight begins the exact same way, written many centuries earlier.

"Secret" here does not mean hidden forever.

It means hidden until the right time to reveal it.

Matthew keeps showing that Jesus fulfills scripture instead of just quoting it for effect.

📜 This line quotes an old psalm directly
⏳ Psalm seventy eight said this first
🔓 Secret means hidden until the right time
📖 Jesus keeps fulfilling scripture, not just quoting it

# Matthew 13:36-43
# 🔥 The Tares Explained
---
## 🚪 Declare Unto Us The Parable Of The Tares Of The Field

Jesus leaves the crowd and steps inside the house with his disciples alone.

They immediately ask him to unpack the one parable that confused them most.

This request shows the disciples caring enough to ask instead of silently wondering.

What follows is the clearest, most detailed explanation in the whole chapter.

🚪 Jesus steps inside with his disciples
🙋 They ask about the tares parable
❓ They ask instead of wondering silently
📖 This becomes the clearest explanation in the chapter

---

## 🌱 He That Soweth The Good Seed Is The Son Of Man

Jesus answers his own parable by naming himself as the sower first.

"Son of man" was his favorite way of referring to himself.

He is claiming direct, personal responsibility for planting good seed in the world.

Nothing about this explanation is vague or symbolic for Jesus's own role.

🌱 Jesus names himself as the sower
🏷️ Son of man was his favorite title
✋ He claims direct responsibility here
📖 His own role is stated plainly

---

## 🔑 The Field Is The World, The Good Seed Are The Children Of The Kingdom

Jesus now decodes the parable piece by piece, like a key unlocking a lock.

The field is not one farm.

It is the entire world.

Good seed means genuine believers, people who actually belong to God's kingdom.

Every detail in the original story now gets a specific, named meaning.

🔑 Jesus decodes the parable piece by piece
🌍 The field means the whole world
🌱 Good seed means genuine believers
📖 Every detail gets a specific meaning

---

## 😈 The Tares Are The Children Of The Wicked One

The tares are not outsiders who never heard the message at all.

They look like genuine believers growing in the same visible field.

Underneath the surface, their loyalty belongs to the wicked one instead of God.

This is a hard warning that appearance alone can be deceiving.

🌾 Tares are not obvious outsiders
👀 They look just like real believers
😈 Their loyalty secretly belongs elsewhere
📖 Appearance alone can deceive

---

## 👼 The Enemy That Sowed Them Is The Devil, The Harvest Is The End Of The World, And The Reapers Are The Angels

Three more symbols get a direct, named meaning in this single verse.

The enemy who planted the tares is named plainly as the devil.

The harvest marks the end of the world, not an ordinary farming season.

The reapers doing the gathering are named as angels, not human judges.

😈 The enemy is named as the devil
⏳ The harvest means the end of the world
👼 The reapers are named as angels
📖 Every symbol here gets a direct name

---

## 🪤 They Shall Gather Out Of His Kingdom All Things That Offend, And Them Which Do Iniquity

"Offend" here means something closer to a trap or stumbling block, not hurt feelings.

"Iniquity" means willful sin, wrongdoing done on purpose.

Angels will remove both the traps people set and the people setting them.

This is a cleanup of the kingdom, not a random act of anger.

🪤 Offend means a trap or stumbling block
⚖️ Iniquity means willful, deliberate sin
🧹 Angels remove both traps and trap setters
📖 This is a cleanup, not random anger

---

## 🔥 Shall Cast Them Into A Furnace Of Fire, There Shall Be Wailing And Gnashing Of Teeth

This exact phrase about wailing and gnashing of teeth appears several times in Matthew's Gospel.

"Furnace of fire" pictures total, final judgment, not a temporary punishment.

Wailing pictures real, lasting anguish.

Gnashing of teeth pictures real regret.

Jesus is not softening this warning to make it easier to hear.

🔥 Furnace of fire pictures final judgment
😭 Wailing pictures real, lasting anguish
🦷 Gnashing of teeth pictures real regret
📖 Jesus does not soften this warning

---

## ☀️ Then Shall The Righteous Shine Forth As The Sun In The Kingdom Of Their Father

This verse flips from the darkest warning in the chapter to its brightest image.

Shining like the sun pictures open, unmistakable glory, not quiet survival.

The righteous are not merely saved from judgment.

They are openly honored instead.

This is the reward side of the same harvest that judged the tares.

☀️ Righteous shine forth like the sun
🏆 This pictures open, unmistakable glory
🎉 They are honored, not just spared
📖 This is the harvest's reward side

# Matthew 13:44-46
# 💎 The Hidden Treasure And The Pearl Of Great Price
---
## 🏦 The Kingdom Of Heaven Is Like Unto Treasure Hid In A Field

Banks did not exist the way they do now in this region and time.

People often buried valuables in the ground to protect them from war or theft.

Sometimes an owner died or moved away before ever digging the treasure back up.

That left real, forgotten treasure sitting under ordinary looking farmland for anyone to find.

🏦 Banks did not exist back then
🕳️ People buried valuables to protect them
⚰️ Some owners never returned for it
📖 Forgotten treasure could sit under ordinary land

---

## 😊 For Joy Thereof Goeth And Selleth All That He Hath, And Buyeth That Field

This man does not sell everything out of fear or reluctant obligation.

Joy is the reason named directly in the verse itself.

He sells his whole life's belongings because the treasure is worth far more.

The kingdom asks for everything, but it gives back something worth the whole price.

😊 Joy is his stated reason
💰 He sells everything he owns
⚖️ The treasure outweighs the whole cost
📖 The kingdom is worth the full price

---

## 🦪 Seeking Goodly Pearls

Pearls in the ancient world were rarer and more costly than they are today.

Finding one required a diver risking real danger under open water.

A merchant who dealt in pearls like this had real money and real knowledge.

This parable describes someone deliberately searching, not stumbling onto something by accident.

🦪 Pearls were rare and very costly
🤿 Divers risked danger to find them
💼 This merchant had real expertise
📖 He was searching, not stumbling by accident

---

## 👁️ Found One Pearl Of Great Price, Went And Sold All That He Had, And Bought It

This merchant spent years training his eye before he ever found this pearl.

That is the real difference between this story and the one just before it.

One man stumbled onto treasure by accident.

The other found it after years of searching.

Both parables end the exact same way, with everything sold for one thing.

👁️ This merchant trained his eye for years
🔀 One found treasure by accident
🔍 The other found it through searching
📖 Both end with everything sold for one thing

# Matthew 13:47-52
# 🎣 The Net, And New And Old Treasures
---
## 🎣 The Kingdom Of Heaven Is Like Unto A Net, That Was Cast Into The Sea, And Gathered Of Every Kind

This describes a dragnet, a large net dragged through the water behind a boat.

A dragnet does not choose what it catches.

It pulls in everything at once.

Good fish and worthless fish all end up tangled together in the same haul.

The visible kingdom, like a church gathering, works the exact same indiscriminate way.

🎣 A dragnet pulls in everything at once
🐟 Good and worthless fish both get caught
⛪ The visible kingdom works the same way
📖 Nothing gets filtered out at the start

---

## ⏳ They Gathered The Good Into Vessels, But Cast The Bad Away

Sorting happens only after the net is completely full and pulled to shore.

This is not a mid process decision.

It happens at the very end.

Good fish get kept, but bad or unclean fish get thrown back out.

That sorting moment pictures the final judgment at the end of the age.

⏳ Sorting happens only once the net is full
✅ Good fish get kept
🚫 Bad fish get thrown back out
📖 This pictures the final judgment

---

## 🔁 The Angels Shall Come Forth, And Sever The Wicked From Among The Just

This is the exact same picture already given in the tares parable earlier.

Angels, not people, carry out this final separation.

"Sever" means to cut apart completely and permanently.

Matthew repeats this image on purpose so the reader cannot miss it.

🔁 This repeats the tares parable's picture
👼 Angels carry out this separation
✂️ Sever means cut apart completely
📖 Matthew repeats this so no one misses it

---

## ❓ Have Ye Understood All These Things? They Say Unto Him, Yea, Lord

Jesus stops to check whether his explanation actually landed.

The disciples answer with confidence, not confusion this time.

That confidence will be tested soon enough by how they actually live it out.

Understanding a parable and living it out are two very different things.

❓ Jesus checks their understanding directly
✅ They answer with real confidence
🧪 Their confidence will soon be tested
📖 Understanding and living it out differ

---

## 📚 Every Scribe Which Is Instructed Unto The Kingdom Of Heaven

A "scribe" was a trained Jewish teacher who studied and copied the law carefully.

Scribes usually guarded old tradition and resisted anything that looked new.

This scribe is different, trained in the kingdom Jesus is actually describing.

Jesus is describing his own disciples, not the scribes who opposed him.

📚 Scribe means a trained teacher of the law
🛑 Scribes usually resisted anything new
🎓 This scribe is trained in God's kingdom
📖 Jesus is describing his own disciples

---

## 📜 Bringeth Forth Out Of His Treasure Things New And Old

A well trained disciple holds onto old scripture and new revelation at the same time.

"Old" means the Hebrew scriptures that came before Jesus ever arrived.

"New" means everything Jesus himself just finished teaching in these parables.

This closes the parables with one final image of treasure, just like the two before it.

📜 Old means the scriptures before Jesus
✨ New means what Jesus just taught
🗄️ A disciple holds onto both
📖 Treasure closes this chapter one last time

# Matthew 13:53-58
# 🏠 Rejected In His Own Country
---
## 🏡 When He Was Come Into His Own Country

"His own country" here means Nazareth, the town where Jesus actually grew up.

These are neighbors who watched him work as a child and a young man.

Nobody in this crowd is a stranger meeting Jesus for the first time.

Familiarity is about to work against him instead of helping him.

🏡 His own country means Nazareth
👀 These neighbors watched him grow up
🙅 Nobody here is a stranger
📖 Familiarity works against him here

---

## 🕍 He Taught Them In Their Synagogue

A "synagogue" was the local Jewish gathering place for prayer and scripture reading.

It was not the Temple.

Every town had a synagogue, but only Jerusalem had the Temple.

People who grew up with Jesus are now hearing him teach with real authority.

That contrast between the boy they knew and the teacher in front of them causes the trouble ahead.

🕍 Synagogue means the local gathering place
🏛️ It was not the same as the Temple
👦 They knew him as a boy
📖 That contrast causes the trouble ahead

---

## 🔨 Is Not This The Carpenter's Son?

"Carpenter" meant a general craftsman working with wood and stone, not just furniture.

This was a respected but completely ordinary trade in that culture.

The question is not really curious.

It carries real contempt underneath it.

Their own familiarity with his ordinary upbringing is exactly what blinds them.

🔨 Carpenter meant a general craftsman
👔 It was a respected, ordinary trade
😒 The question carries real contempt
📖 Familiarity with him is what blinds them

---

## 👪 Is Not His Mother Called Mary? And His Brethren, James, And Joses, And Simon, And Judas?

"Brethren" here most likely means Jesus's own younger half siblings through Mary and Joseph.

Chapter twelve already introduced this detail when his family came looking for him.

The crowd names four brothers specifically, proving they know this family well.

Knowing someone's whole family does not mean you actually know who they are.

👪 Brethren likely means his half siblings
🔁 Chapter twelve already introduced this
📋 Four brothers are named specifically
📖 Knowing a family is not knowing a person

---

## 📜 A Prophet Is Not Without Honour, Save In His Own Country, And In His Own House

Jesus answers their contempt with a proverb everyone listening would already recognize.

People outside his hometown could see him clearly for who he actually was.

The very people closest to him for the longest time saw him the least clearly.

Closeness does not guarantee clear sight.

Sometimes it blocks sight completely.

📜 Jesus answers with a known proverb
👀 Outsiders saw him more clearly
🏡 His closest neighbors saw him the least
📖 Closeness can block clear sight

---

## 🙅 He Did Not Many Mighty Works There Because Of Their Unbelief

This does not mean Jesus suddenly lost his power in his hometown.

The limit here sits on their side, not on his ability to heal.

Unbelief closed a door that faith had opened everywhere else in this chapter.

The chapter that opened with seed falling on different soils ends the exact same way.

🙅 Jesus did not lose his power
🚪 Unbelief closed a door here
🌱 This chapter opened with seed and soil
📖 It ends on the same exact idea
`.trim();

export const MATTHEW_THIRTEEN_PERSONAL_SECTIONS = parseMatthewThirteenRawNotes(MATTHEW_THIRTEEN_RAW_NOTES);
