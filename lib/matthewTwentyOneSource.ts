export type MatthewTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyOneRawNotes(rawText: string): MatthewTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 21:${startVerse}` : `Matthew 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 21 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_ONE_RAW_NOTES = `# Matthew 21:1-5
# 🫏 The King Approaches Jerusalem
---
## 🏘️ Bethphage, Unto The Mount Of Olives

Bethphage was a small village on the Mount of Olives.

It sat on the final stretch of road into Jerusalem.

The Mount of Olives rises just east of the city.

A deep valley separates the mountain from Jerusalem's walls.

🏘️ Bethphage sat near Jerusalem's edge
⛰️ Mount of Olives lies east of the city
🕳️ A valley divides it from Jerusalem
➡️ Jesus is nearly at the city

## 🐴 An Ass Tied, And A Colt With Her

Jesus asks for two animals, a donkey and her colt.

Kings riding into battle usually rode on horses.

A donkey signaled peace instead of conquest.

Jesus enters Jerusalem announcing a peaceful kind of king.

🐴 Two animals, a donkey and her colt
⚔️ Horses pictured a king at war
🕊️ Donkeys pictured a king of peace
📖 Jesus comes announcing peace, not war

## 🔑 The Lord Hath Need Of Them

Jesus tells the disciples exactly what to say if questioned.

This phrase works like a password already arranged ahead of time.

It shows Jesus planned this moment with full knowledge.

Nothing here happens by accident or surprise.

🔑 A prearranged password for the owner
🧠 Jesus planned this moment in advance
👁️ Nothing catches him off guard
📖 Full knowledge guides every step

## 📜 That It Might Be Fulfilled Which Was Spoken By The Prophet

Matthew often pauses the story to point back to prophecy.

This exact phrase appears again and again in his Gospel.

He wants readers to see Jesus fulfilling old promises.

The prophet being quoted here is Zechariah.

📜 Matthew repeats this fulfillment phrase often
🔁 It links Jesus to old promises
✍️ The prophet quoted is Zechariah
📖 Jesus fulfills what was written long ago

## 👩 Tell Ye The Daughter Of Sion

Daughter of Zion is an old way of addressing Jerusalem.

Prophets speak to the city as if it were a person.

Sion, or Zion, is another name for Jerusalem itself.

The whole city is being called to pay attention.

👩 Daughter of Zion means Jerusalem itself
📣 Prophets address the city like a person
🏙️ Sion is another name for Jerusalem
📖 The whole city is being addressed

## 🤲 Thy King Cometh Unto Thee, Meek

Meek means gentle and free from pride, not weak.

A meek king does not force his way in by threat.

This king comes to serve, not to conquer.

His gentleness is strength held in check.

🤲 Meek means gentle, not weak
🚫 He does not force his way in
🙏 He comes to serve, not conquer
📖 His gentleness is strength under control

## 📝 Sitting Upon An Ass, And A Colt The Foal Of An Ass

This line comes from Zechariah's prophecy word for word.

Hebrew poetry often restates one idea in two different lines.

The prophet describes a single donkey two different ways.

He is not describing two separate animals ridden at once.

📝 Quoted directly from Zechariah's prophecy
🔁 Hebrew poetry restates ideas twice
🐴 One donkey, described two ways
📖 Not two animals ridden together

# Matthew 21:6-11
# 🌿 Hosanna To The Son Of David
---
## 👘 Put On Them Their Clothes

The disciples lay their own cloaks across the donkey's back.

This makeshift saddle turns a workhorse into a throne.

Ordinary men give up their own comfort for this moment.

Small gestures of honor build up around Jesus as he rides.

👘 Cloaks become a makeshift saddle
👑 A humble animal becomes a throne
🙌 Disciples give up their own comfort
📖 Honor builds up around Jesus

## 🧥 Spread Their Garments In The Way

Crowds lay their own clothes down on the road itself.

Years earlier, people did this same thing for a new king named Jehu.

Spreading a garment under someone's feet was a sign of submission.

The people are treating Jesus like a king without being told to.

🧥 Garments spread across the road
👑 Jehu received this same honor once
🙇 Garments under feet showed submission
📖 The crowd crowns Jesus on its own

## 🌿 Cut Down Branches From The Trees

Some in the crowd wave branches instead of laying down cloaks.

Branches were used to welcome victorious kings and leaders.

Waving branches was also tied to festival celebrations in Israel.

Every detail in this scene points toward celebrating a king.

🌿 Branches welcomed victorious leaders
🎉 Branches also marked festival celebration
🛣️ They cover the road like cloaks
📖 The whole scene honors a king

## 🙏 Hosanna To The Son Of David

Hosanna means save now or save please in Hebrew.

It began as a cry for rescue, not just praise.

Son of David names Jesus as the promised king from David's line.

The crowd is begging for rescue and announcing a king at once.

🙏 Hosanna means save now or please
👑 Son of David names the promised king
📣 Crowds cry out for rescue
📖 Rescue and kingship arrive together

## 📖 Blessed Is He That Cometh In The Name Of The Lord

This exact line comes from Psalm 118.

Pilgrims once sang it to bless travelers arriving for a feast.

The crowd now applies that same blessing straight to Jesus.

An old song of welcome becomes a claim about who Jesus is.

📖 Quoted straight from Psalm 118
🎶 Once sung to bless arriving pilgrims
🙌 Now sung directly over Jesus
➡️ An old song becomes a claim

## 🌍 All The City Was Moved

Moved here means shaken or stirred, not simply impressed.

The same word describes the shaking of an earthquake elsewhere.

Jerusalem reacts to Jesus the way a city reacts to a tremor.

This is not a quiet or calm response.

🌍 Moved can describe an earthquake
😮 Jerusalem reacts with real shock
📣 This is no quiet response
➡️ The whole city feels the impact

## ❓ Who Is This?

The city asks a question the crowd already answered with Hosanna.

Many in Jerusalem have never seen Jesus before this day.

Recognition and understanding are two very different things.

Praise is loud, but real belief is still missing in the city.

❓ Jerusalem does not know Jesus yet
👥 Many see him for the first time
🙌 Praise is loud but shallow
➡️ Belief has not caught up yet

## 📉 Jesus The Prophet Of Nazareth Of Galilee

The crowd answers with a smaller title than Son of David.

Galilee was seen by many as a plain, unimportant region.

Calling Jesus a prophet is true but still falls short.

The full truth about Jesus is bigger than this answer.

📉 Prophet is a smaller title than king
🌾 Galilee was seen as unimportant
✅ The answer is true but incomplete
📖 The full truth is still bigger

# Matthew 21:12-14
# 🐑 Jesus Cleanses The Temple
---
## 🏛️ Cast Out All Them That Sold And Bought In The Temple

This buying and selling happened in the Court of the Gentiles.

That court was the only place non Jewish worshippers could pray.

Loud trading filled the one space set aside for them.

Jesus clears out what was crowding out prayer itself.

🏛️ Trading filled the Court of the Gentiles
🙏 That court was for Gentile prayer
📢 Noise crowded out quiet worship
➡️ Jesus clears space for prayer

## 🪙 Overthrew The Tables Of The Moneychangers

Roman coins carried images that felt idolatrous inside the temple.

Moneychangers swapped that coin for an approved temple coin.

This exchange was required to pay the yearly temple tax.

Many changers charged steep fees that quietly robbed pilgrims.

🪙 Roman coin was unfit for the temple
🔄 Changers swapped it for temple coin
💰 Exchange fees were often steep
📖 Pilgrims paid a hidden cost

## 🕊️ The Seats Of Them That Sold Doves

Doves were the offering allowed for families too poor for a lamb.

This option existed so poverty would never block worship.

Sellers marked up dove prices right inside the temple courts.

The very provision meant for the poor became a way to profit from them.

🕊️ Doves were the offering for the poor
💸 Prices were marked up on doves
😔 The poor paid the steepest cost
➡️ Mercy turned into profit

## 📜 My House Shall Be Called The House Of Prayer

Jesus quotes this line straight from the prophet Isaiah.

The full verse in Isaiah adds for all nations.

The temple was always meant to welcome outsiders too.

Jesus is restoring the temple's original purpose.

📜 Quoted from the prophet Isaiah
🌍 Isaiah adds for all nations
🚪 The temple was meant to welcome outsiders
📖 Jesus restores its original purpose

## 🕳️ Ye Have Made It A Den Of Thieves

Jesus quotes this phrase from the prophet Jeremiah.

A den is a hideout where thieves feel safe after a crime.

Jesus means the temple had become a shelter for corrupt practice.

Religious cover was being used to protect wrongdoing.

🕳️ Quoted from the prophet Jeremiah
🏚️ A den is a hideout for thieves
🛡️ Religion was shielding real corruption
📖 Worship became a cover for wrong

## 🚫 The Blind And The Lame Came To Him In The Temple

Some Jewish tradition kept the blind and the lame from parts of the temple.

That restriction traced back to an old story about King David's enemies.

Jesus welcomes these very people right into the temple courts.

He heals them in the place some would keep them out of.

🚫 Some traditions excluded the blind and lame
👑 That idea traced back to King David's day
🤲 Jesus welcomes them in instead
📖 Healing happens where exclusion once stood

# Matthew 21:15-17
# 😡 Out Of The Mouth Of Babes
---
## 👶 The Children Crying In The Temple

Children keep shouting the same praise the crowd shouted outside the city.

Their young voices carry the same message adults are now debating.

Innocent voices confirm what the leaders are trying to deny.

A child's praise needs no political calculation behind it.

👶 Children repeat the crowd's praise
🗣️ Their voices confirm the message
🙅 Leaders want to deny it
📖 A child's praise needs no agenda

## 📏 They Were Sore Displeased

Sore here means deeply or severely, not physically sore.

This is far stronger than simple annoyance.

The leaders are genuinely threatened by what they are hearing.

Their anger reveals how seriously they take this claim.

📏 Sore means deeply, not physically
😠 Far stronger than mild annoyance
⚠️ The leaders feel truly threatened
➡️ Their anger reveals real fear

## 🤫 Hearest Thou What These Say?

The leaders demand that Jesus silence these children.

They expect him to correct what they see as a dangerous claim.

Instead of rebuking the praise, Jesus defends it.

Their trap backfires the moment he answers.

🤫 Leaders want the children silenced
⚠️ They expect Jesus to correct it
🛡️ Jesus defends the praise instead
➡️ Their trap backfires at once

## 👶 Out Of The Mouth Of Babes And Sucklings Thou Hast Perfected Praise

Jesus quotes this line from Psalm 8.

Babes and sucklings means very young children, even infants.

God can bring out praise from the simplest, smallest voices.

The educated leaders missed what little children understood at once.

👶 Quoted directly from Psalm 8
🍼 Babes and sucklings means young children
😳 Leaders missed what children saw
📖 God perfects praise through small voices

## 🏡 He Left Them, And Went Out Of The City Into Bethany

Bethany was a small village close to Jerusalem.

Jesus stayed there with friends during this final week.

Mary, Martha, and Lazarus lived in this same village.

Each day Jesus enters the city, then returns to rest at Bethany.

🏡 Bethany sat close to Jerusalem
👪 Home of Mary, Martha, and Lazarus
🌙 Jesus rests there each night
📖 A daily pattern of entering and resting

# Matthew 21:18-22
# 🌳 The Withered Fig Tree
---
## 🍽️ He Hungered

Jesus feels real, ordinary human hunger on this morning.

This small detail shows his full humanity plainly.

The miracle that follows grows out of an everyday need.

Even the Son of God gets hungry like anyone else.

🍽️ Jesus feels real human hunger
👤 His full humanity shows plainly
🌱 An everyday need starts this scene
📖 Even the Son of God gets hungry

## 🌿 Found Nothing Thereon, But Leaves Only

Fig trees in this region often grow early fruit before full leaves appear.

A tree full of leaves usually promised fruit nearby.

This tree makes a promise its branches do not keep.

Its leafy show without fruit pictures empty religious show.

🌿 Leaves usually promised nearby fruit
🚫 This tree breaks that promise
🎭 Leafy show, but nothing real
📖 Pictures worship without real fruit

## 🎭 Let No Fruit Grow On Thee Henceforward For Ever

Old Testament prophets often acted out a message instead of only speaking it.

Jesus does the same thing here using a living tree.

This is a judgment on fruitlessness, not anger over one snack.

The tree becomes a living picture of a deeper warning.

🎭 Prophets often acted out their message
🌳 Jesus uses a tree the same way
⚖️ This is judgment, not a tantrum
📖 A living picture of a warning

## ⏱️ Presently The Fig Tree Withered Away

Presently in this old English means immediately, not currently.

The tree does not fade slowly over days or weeks.

Its death happens right in front of the disciples.

Judgment here lands fast and visibly.

⏱️ Presently means immediately here
🍂 The tree dies right away
👀 Disciples watch it happen live
➡️ Judgment lands fast and visible

## 😲 How Soon Is The Fig Tree Withered Away

The disciples are stunned by how fast the tree died.

They expected decay to take time, not minutes.

Their amazement sets up the lesson Jesus is about to teach.

A strange event becomes a teaching moment.

😲 Disciples are stunned by the speed
⏳ They expected decay to take time
🎓 Their shock sets up a lesson
➡️ A strange sight becomes a teaching

## 🌳 If Ye Have Faith, And Doubt Not

Jesus turns from the tree to a lesson about faith.

Doubt here means a divided heart, trusting and distrusting at once.

Confident trust in God is the real subject now.

The withered tree becomes proof that such faith works.

🌳 The tree becomes living proof
💭 Doubt means a divided, unsure heart
🙏 Confident trust is the real topic
📖 Faith like this truly moves things

## ⛰️ Say Unto This Mountain, Be Thou Removed

The Mount of Olives likely stands in view as Jesus speaks.

Moving a mountain was a common way to describe an impossible task.

Jewish teachers often used this exact kind of picture.

Jesus is not promising a literal landslide on command.

⛰️ The Mount of Olives stands nearby
🗣️ Moving mountains pictured impossible tasks
📚 Teachers used this picture often
➡️ Not a promise of a literal landslide

## 🙏 Whatsoever Ye Shall Ask In Prayer, Believing, Ye Shall Receive

This promise is tied to prayer offered in real, confident trust.

It is not a blank check for any random wish.

Believing prayer lines up with what God is already doing.

Real faith reaches toward God, not toward control over him.

🙏 Prayer here means real confident trust
🚫 Not a blank check for anything
🤝 Faith lines up with God's will
📖 Faith reaches toward God, not control

# Matthew 21:23-27
# ❓ By What Authority?
---
## 🏛️ The Chief Priests And The Elders Of The People

Chief priests ran temple worship and held real religious power.

Elders were respected heads of leading families in Jerusalem.

Together they formed a large part of the ruling council.

This is an official challenge from Israel's top leadership.

🏛️ Chief priests ran temple worship
👴 Elders led respected families
⚖️ Together they formed the ruling council
📖 Official leaders now confront Jesus

## 🏛️ By What Authority Doest Thou These Things?

They mean both the temple cleansing and his daily teaching.

Rabbis normally needed recognized training to teach publicly.

Jesus never trained under their approved system.

They are demanding he name where his power comes from.

🏛️ They mean the temple and his teaching
📚 Rabbis usually needed approved training
🚫 Jesus trained under no such system
➡️ They demand he name his source

## 🔄 I Also Will Ask You One Thing

Jesus answers their question with a counter question of his own.

This was a normal and respected method among Jewish teachers.

It is not an escape from their question.

It is a real test of their own honesty.

🔄 A counter question answers theirs
📚 A normal method among Jewish teachers
🎯 Not an escape from the question
📖 A real test of their honesty

## 📍 The Baptism Of John, Whence Was It?

Whence simply means from where in this old English.

Jesus ties his own authority to John's authority.

John had already testified publicly that Jesus was the promised one.

Answering about John means answering about Jesus too.

📍 Whence means from where
🔗 Jesus ties his authority to John's
🗣️ John had already testified about Jesus
➡️ One answer settles both questions

## ☁️ If We Shall Say, From Heaven

Admitting John came from heaven creates a serious problem for them.

John had already pointed the crowds straight toward Jesus.

Accepting John's authority would mean accepting his witness about Jesus.

Their own trap closes in on them.

☁️ Admitting heaven creates a problem
👉 John pointed crowds toward Jesus
🪤 Accepting John means accepting Jesus
➡️ Their own trap closes in

## 😨 We Fear The People

The leaders fear public backlash more than they fear being wrong.

Many people already view John as a true prophet.

Political safety matters more to them than honest truth.

Their decision is driven by fear, not sincere conviction.

😨 They fear the crowd's reaction
👥 Many view John as a prophet
🛡️ Political safety outweighs truth for them
➡️ Fear drives their decision, not honesty

## 🤐 We Cannot Tell

The leaders choose dishonesty over admitting an answer either way.

Refusing to answer is itself a kind of answer.

Their silence exposes that truth is not their real goal.

Unwillingness to be honest costs them more than they realize.

🤐 They refuse to answer honestly
🪞 Silence reveals their real goal
💔 Truth is not what they want
➡️ Their dishonesty costs them later

## 🚫 Neither Tell I You By What Authority I Do These Things

Jesus will not hand over an answer to people unwilling to be honest.

This is not evasion on his part.

It matches their own refusal to answer honestly.

Truth is withheld from those who reject it on purpose.

🚫 Jesus withholds the answer in turn
⚖️ A fair response to their refusal
🪞 Matches their own unwillingness to answer
📖 Truth is withheld from the dishonest

# Matthew 21:28-32
# 👪 Two Sons Sent To The Vineyard
---
## 🧠 What Think Ye?

Jesus keeps teaching right where the authority question just ended.

He invites the leaders to judge the story for themselves.

This question will make their own words convict them later.

Jesus often uses this method throughout his ministry.

🧠 He invites them to judge the story
🪞 Their own words will convict them
🔁 Jesus uses this method often
➡️ A trap set through their own answer

## 🍇 Go Work To Day In My Vineyard

A vineyard regularly pictures Israel and God's own work in scripture.

The father asks his son to do normal family labor.

This is an everyday request inside an ordinary household.

The story starts small before it grows into something larger.

🍇 Vineyard often pictures Israel's calling
🏠 An ordinary request inside a family
📋 The story starts small and grows
➡️ A bigger lesson is coming

## 🙅 I Will Not, But Afterward He Repented, And Went

The first son refuses his father to his face.

Repented here means he changed his mind and then acted on it.

Real repentance always shows up as changed action, not just feeling.

His final behavior matters more than his first answer.

🙅 He refuses his father at first
🔄 Repented means his mind truly changed
🚶 He backs up his change with action
📖 Final action matters more than words

## 🙇 I Go, Sir, And Went Not

The second son answers with perfect, polite obedience.

His words promise exactly what his father asked for.

He never actually walks out to the vineyard at all.

Polite words without action are still disobedience.

🙇 He answers with polite words
🗣️ His promise sounds exactly right
🚫 He never actually goes to work
📖 Polite words can still be disobedience

## 🔢 Whether Of Them Twain Did The Will Of His Father?

Twain is an old word simply meaning the two of them.

Jesus forces the leaders to answer their own trap question.

There is only one honest answer to give here.

Their answer is about to work against them.

🔢 Twain simply means the two
🎯 Jesus forces an honest answer
✅ Only one true answer exists
➡️ Their answer will work against them

## 💰 The Publicans And The Harlots Go Into The Kingdom Of God Before You

Publicans collected taxes for Rome and were viewed as traitors to their own people.

Harlots were women who sold their bodies for money.

Both groups ranked at the very bottom of social respect.

Jesus names society's most despised people ahead of the religious leaders.

💰 Publicans collected taxes for Rome
🙇 Seen as traitors to their people
📉 Both groups ranked at the bottom
📖 Jesus ranks them above the leaders

## 📣 John Came Unto You In The Way Of Righteousness

John preached a real call toward genuine repentance.

His message demanded an honest change of life, not empty ritual.

The religious leaders heard this same message clearly.

Hearing it is not the same as responding to it.

📣 John preached genuine repentance
🔄 He demanded real change, not ritual
👂 Leaders heard this message clearly
➡️ Hearing is not the same as believing

## 🙌 The Publicans And The Harlots Believed Him

The most despised people in society responded to John's message.

They humbled themselves and changed direction because of his preaching.

Their response stands in sharp contrast to the religious leaders.

The outsiders ended up closer to God than the insiders.

🙌 Despised people responded to John
🔄 They truly changed direction
⚖️ A sharp contrast with the leaders
📖 Outsiders end up closer to God

## 👀 Repented Not Afterward, That Ye Might Believe Him

The leaders watched despised sinners change their lives right in front of them.

Even that example never moved the leaders to believe.

Seeing proof firsthand is still not the same as accepting it.

Their stubbornness holds even after watching it happen to others.

👀 Leaders watched sinners truly change
💔 That proof still did not move them
🙈 Seeing is not the same as accepting
➡️ Stubbornness outlasts even clear proof

# Matthew 21:33-39
# 🍇 The Wicked Husbandmen, Part One
---
## 📜 Planted A Vineyard, And Hedged It Round About

This parable echoes an older song about a vineyard in Isaiah.

In that song, the vineyard clearly pictures the nation of Israel.

A hedge was a thick wall of thorns keeping animals out.

The owner protects his investment with real, careful effort.

📜 Echoes Isaiah's older vineyard song
📍 The vineyard pictures Israel
🌵 Hedges were thorn walls for protection
📖 The owner protects his investment with care

## 🍷 Digged A Winepress In It, And Built A Tower

A winepress was a carved out pit for crushing grapes.

A tower gave guards a high place to watch for thieves.

Both of these took real time, money, and planning.

The owner holds back nothing in preparing this vineyard.

🍷 Winepress crushed grapes into juice
🗼 Tower let guards watch for thieves
💰 Both cost real time and money
📖 The owner spares no expense

## 🌾 Let It Out To Husbandmen, And Went Into A Far Country

Renting land to tenant farmers was a common arrangement.

Husbandmen means the tenant farmers who worked the land.

The owner expected a fair share of the harvest as rent.

In the story, husbandmen stand for Israel's religious leaders.

🌾 Husbandmen means tenant farmers
🤝 Rent was a share of the harvest
🏛️ They picture Israel's religious leaders
➡️ Trust is placed in their hands

## 📜 Sent His Servants To The Husbandmen

Servants here stand for the prophets God sent across history.

Each one came asking the leaders to honor their agreement.

God kept reaching out long before sending anyone greater.

This first wave of messengers meets open resistance.

📜 Servants picture God's many prophets
📢 Each one calls for honesty
🔁 God reaches out again and again
➡️ This first wave meets resistance

## 🪨 Beat One, And Killed Another, And Stoned Another

Stoning was the punishment prescribed for certain serious offenses.

Using it here shows real, violent rejection of God's messengers.

History records prophets like Zechariah treated this same way.

The violence only grows worse as the story continues.

🪨 Stoning was a serious punishment
😡 It shows violent rejection here
📖 Prophets like Zechariah faced this
➡️ The violence only keeps growing

## 🕊️ Again, He Sent Other Servants More Than The First

The owner responds to violence with patience, not retaliation.

He sends an even larger group of servants this time.

This second wave pictures a later generation of prophets.

God's patience stretches far longer than expected.

🕊️ Patience answers violence here
👥 A larger group is sent
📜 Pictures a later wave of prophets
📖 God's patience stretches surprisingly far

## 👑 Last Of All He Sent Unto Them His Son

The story escalates from servants to the owner's own son.

In the parable, the son clearly represents Jesus himself.

Sending the son is the owner's final and greatest offer.

Nothing higher than this could be sent.

👑 The son represents Jesus himself
📈 The story escalates to its highest point
🎁 The son is the owner's final offer
➡️ Nothing greater could be sent

## 🤞 They Will Reverence My Son

The owner expects basic respect for his own son's position.

Reverence here means treating him with the honor he deserves.

This expectation is reasonable by any normal standard.

The coming response will break that reasonable expectation completely.

🤞 The owner expects basic respect
🎖️ Reverence means proper honor shown
📏 A reasonable expectation by any standard
➡️ That expectation is about to break

## 📜 This Is The Heir, Come, Let Us Seize On His Inheritance

Under some ancient inheritance customs, unclaimed land could pass to whoever held it.

The tenants seem to believe killing the heir clears their claim.

Greed twists their thinking into a plan for murder.

They want the vineyard without ever honoring its true owner.

📜 Old customs shaped their twisted plan
⚰️ They think killing clears their claim
💰 Greed drives this murderous logic
➡️ They want the land without the owner

## 🚪 Cast Him Out Of The Vineyard, And Slew Him

The son is killed outside the vineyard's own boundaries.

Jesus himself was later crucified just outside Jerusalem's walls.

The parable quietly predicts his own coming death.

The husbandmen's crime in the story becomes complete.

🚪 He is killed outside the vineyard
⛰️ Jesus died outside Jerusalem's walls too
🔮 The parable predicts his own death
📖 The crime in the story is complete

# Matthew 21:40-46
# ⚖️ The Stone The Builders Rejected
---
## ❓ When The Lord Therefore Of The Vineyard Cometh

Jesus turns back to the leaders with a direct question.

He wants them to pronounce the story's ending themselves.

This mirrors the same method used in the parable of the two sons.

Their own mouths are about to judge their own choices.

❓ Jesus asks them to finish the story
🪞 The same method as the two sons
🗣️ Their own mouths will judge them
➡️ A verdict is about to land

## 😮 He Will Miserably Destroy Those Wicked Men

The leaders answer honestly without realizing who the story is about.

Their harsh judgment on the husbandmen fits their own future.

They condemn themselves before they even notice it.

The trap closes the same way it did earlier in this chapter.

😮 They answer without realizing the target
⚖️ Their harsh judgment fits their own case
🪤 They condemn themselves unknowingly
➡️ The same trap closes again

## 🌱 Let Out His Vineyard Unto Other Husbandmen

New caretakers will now be given responsibility over God's vineyard.

This points toward believers gathered from every nation, not one ethnic group.

The change is about faithfulness, not about replacing one people with another.

Whoever bears real fruit now carries the responsibility forward.

🌱 New caretakers take up the vineyard
🌍 Believers from every nation are pictured
🚫 Not one people replacing another
📖 Fruit, not ethnicity, decides the caretaker

## 🧱 The Stone Which The Builders Rejected

Jesus quotes this line from Psalm 118.

Builders in the psalm examine a stone and set it aside as useless.

They judge it unfit for the project they are building.

Jesus applies this picture directly to himself.

🧱 Quoted straight from Psalm 118
🔨 Builders set the stone aside
🚫 Judged unfit for their project
➡️ Jesus applies this to himself

## 🧱 The Same Is Become The Head Of The Corner

Head of the corner means the cornerstone of a building.

A cornerstone sets the exact angle for every wall around it.

The stone the builders threw away becomes the most important piece.

Rejection by experts does not decide the truth.

🧱 Head of the corner means cornerstone
📐 It sets the angle for every wall
🔄 The rejected stone becomes essential
📖 Expert rejection does not decide truth

## 🙌 This Is The Lord's Doing, And It Is Marvellous In Our Eyes

This reversal happens entirely through God's own plan.

No human strategy produces an outcome this surprising.

Marvellous here means amazing beyond normal expectation.

Human rejection and God's plan can move in completely different directions.

🙌 This reversal is God's own doing
😲 No human plan explains it
✨ Marvellous means amazing beyond expectation
📖 God's plan can defy human rejection

## ⚠️ The Kingdom Of God Shall Be Taken From You

Jesus states the direct consequence facing these leaders.

Their stewardship over God's work is coming to an end.

This is about lost responsibility, not lost salvation for individuals.

Leadership is being handed to people who will actually bear fruit.

⚠️ A direct consequence for the leaders
📉 Their stewardship is coming to an end
🔄 About lost responsibility, not people's salvation
➡️ Fruitful leadership replaces fruitless leadership

## 🌾 Given To A Nation Bringing Forth The Fruits Thereof

Nation here means a fruit bearing people, not one single ethnic group.

The church gathers believers from every nation and background.

Fruit, not ancestry, becomes the real mark of belonging.

This new people is defined by obedience, not by birth.

🌾 Nation means a fruit bearing people
🌍 Gathered from every nation and background
🍇 Fruit marks real belonging now
📖 Obedience defines this people, not birth

## 🧱 Whosoever Shall Fall On This Stone Shall Be Broken

Stumbling over Jesus brings real but survivable brokenness.

This pictures someone who trips and resists what Jesus says.

The fall hurts, but it still leaves room for repentance.

Being broken here is painful, not final.

🧱 Stumbling over Jesus causes real pain
🤕 This brokenness is painful but survivable
🔄 Room for repentance still remains
➡️ Not yet the final judgment

## 💥 On Whomsoever It Shall Fall, It Will Grind Him To Powder

This second image pictures total, final destruction instead.

A stone falling from above crushes everything beneath it completely.

Unlike the first image, no recovery follows this one.

Rejecting Jesus forever carries a far heavier ending.

💥 Pictures total, final destruction
🪨 A falling stone crushes completely
🚫 No recovery follows this image
📖 Final rejection carries a heavy ending

## 💡 They Perceived That He Spake Of Them

The leaders finally understand they are the husbandmen in the story.

Jesus has described their own actions back to their faces.

There is no way left to misunderstand the point.

Recognition arrives, but it does not yet lead to repentance.

💡 They recognize themselves in the story
🪞 Jesus describes their own actions
🎯 The point lands with full clarity
➡️ Recognition without repentance follows

## 😨 They Feared The Multitude, Because They Took Him For A Prophet

Political fear stops the leaders from acting, not honest conviction.

The crowd still views Jesus as a true prophet of God.

That public opinion offers Jesus protection for a little while longer.

The leaders' hostility is only delayed, not resolved.

😨 Fear of the crowd holds them back
👥 The crowd still honors Jesus as a prophet
🛡️ Public opinion protects Jesus for now
📖 Hostility is delayed, not resolved
`.trim();

export const MATTHEW_TWENTY_ONE_PERSONAL_SECTIONS = parseMatthewTwentyOneRawNotes(MATTHEW_TWENTY_ONE_RAW_NOTES);
