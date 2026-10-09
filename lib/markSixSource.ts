export type MarkSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkSixRawNotes(rawText: string): MarkSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 6:${startVerse}` : `Mark 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Mark 6 sections, received " + sections.length);
  }

  return sections;
}

const MARK_SIX_RAW_NOTES = `# Mark 6:1-6
# 🏠 Without Honour In His Own Country
---
## 🏠 Came Into His Own Country

Jesus returns to Nazareth, the town where he grew up.

This is not a mission trip to strangers.

These are the neighbors who watched him grow up.

Familiarity is about to work against him instead of for him.

🏠 His own country means Nazareth
👀 These neighbors watched him grow up
😕 Familiarity will soon work against him
➡️ Rejection is about to begin at home

---
## 😲 From Whence Hath This Man These Things

This question sounds like honest wonder.

Underneath it carries real doubt.

The townspeople cannot explain Jesus apart from what they already know of him.

A carpenter's household does not usually produce a teacher like this, in their minds.

That gap is exactly what trips them up.

❓ The question hides doubt under curiosity
👪 They judge him by his family
🪵 A carpenter rarely becomes a teacher, they assume
📖 Doubt can disguise itself as a question

---
## 🪵 Is Not This The Carpenter

"Carpenter" means someone who builds and repairs things using wood.

Sometimes the same worker handled stone as well.

It was honest work, but never seen as impressive.

The town remembers Jesus doing this kind of labor.

That memory makes his wisdom now feel impossible to them.

🪵 Carpenter means a builder who works with wood
🙂 Common, honest, unimpressive work back then
🧠 They remember him only as a worker
📖 Low status made his wisdom hard to accept

---
## 👩 The Son Of Mary

Sons in this culture were almost always identified by their father's name.

Calling Jesus "the son of Mary" breaks that normal pattern.

Many scholars believe this hints that Joseph had already died by this point.

Others hear it as a quiet insult about his father.

Either way, the title was not meant kindly.

👨 Sons were normally named after their fathers
👩 Mary's name alone breaks that pattern
⚰️ Joseph may have already died by now
📖 The title carried an edge, not warmth

---
## 👪 The Brother Of James, And Joses, And Of Juda, And Simon

Mark names four brothers of Jesus here.

The text also mentions sisters, without naming them.

This is Jesus's own household, the family he grew up inside.

They knew him longer and more closely than anyone else in town.

That closeness is exactly why they struggle to see him clearly now.

👪 Four brothers are named here
👭 Sisters are mentioned but left unnamed
🏠 This is Jesus's own childhood household
📖 Closeness can blind people to the obvious

---
## 😤 They Were Offended At Him

"Offended" here means something stronger than simply annoyed.

The original word pictures someone tripping over an obstacle.

Jesus became that obstacle for his own neighbors.

They could not get past what they already assumed about him.

Their familiarity became the very thing standing in their way.

😤 Offended means they stumbled over him
🪨 Jesus became an obstacle to his hometown
🧱 Old assumptions blocked their way
📖 Familiarity became a stumbling block

---
## 🗣️ A Prophet Is Not Without Honour

This was already a well known saying in Jesus's day.

People will often trust a stranger's wisdom faster than a neighbor's.

Distance can make someone look wiser than they really are.

Closeness can make that same person look ordinary instead.

Jesus names this pattern instead of acting surprised by what just happened.

🗣️ This was already a known proverb
🧳 Strangers often seem wiser than neighbors
👀 Closeness can hide real wisdom
📖 Jesus names the pattern instead of fighting it

---
## 🤲 Could There Do No Mighty Work

This does not mean Jesus lost his power in Nazareth.

Earlier chapters already show that same power healing the sick and casting out spirits.

Unbelief did not disable Jesus, but it did close a door.

Fewer miracles happen where people refuse to trust him.

The limitation sits with the town, not with him.

🙅 Jesus did not lose his power here
🚪 Unbelief closed a door, not his ability
🏘️ The limit belonged to the town
📖 Trust opens what doubt shuts

---
## 😮 He Marvelled Because Of Their Unbelief

Scripture rarely says Jesus was surprised by anything.

Here it says plainly that their unbelief caught him off guard.

Only one other moment shows him marvelling, and that time it is at great faith.

Here the reaction comes from the opposite extreme.

Deep unbelief surprised him more than any need or danger before it.

😮 Marvelled means genuinely caught off guard
🙌 Jesus rarely reacts with surprise
🔁 He also marvels once at great faith
📖 Unbelief surprised him as much as faith did

# Mark 6:7-13
# 👣 Sent Forth Two By Two
---
## 👬 Send Them Forth By Two And Two

Jesus pairs the twelve instead of sending them alone.

Jewish law already required two witnesses to confirm anything important.

A partner also meant support on a hard and uncertain journey.

Ministry here is never meant to be a solo task.

👬 Pairs match the law's two witness rule
🤝 Partners carried each other through hardship
🚫 Nobody is sent out completely alone
📖 Ministry was built for partnership, not solitude

---
## 🔑 Gave Them Power Over Unclean Spirits

This authority comes directly from Jesus, not from the disciples themselves.

"Unclean spirits" refers to demonic forces that Mark has already shown Jesus confronting.

The same power that worked through Jesus now extends through ordinary men.

None of them earned this ability on their own.

🔑 Authority is given, not earned
👻 Unclean spirits means demonic forces
🔁 The same power now works through others
📖 Borrowed authority still carries real force

---
## 🦯 Take Nothing For Their Journey, Save A Staff Only

A staff was a simple wooden walking stick, useful for support and for defense.

Jesus allows almost nothing else for the road.

This was not about traveling comfortably.

It was about depending on God and on the people they would meet.

🦯 A staff was a basic walking stick
🚫 Almost nothing else was allowed
🙏 Comfort was never the point
📖 Dependence was the whole design

---
## 🎒 No Scrip, No Bread, No Money In Their Purse

"Scrip" was a small travel bag used to carry food or coins.

Jesus tells them to leave home without any of these backups.

No spare food, no spending money, no safety net of any kind.

They would have to rely on God and on the hospitality of strangers.

🎒 Scrip means a small travel bag
🚫 No backup food, money, or supplies
🙏 Reliance on God replaces self sufficiency
📖 Trust takes the place of planning

---
## 🩴 Be Shod With Sandals, And Not Put On Two Coats

Sandals were the normal, practical footwear for long walking.

A second coat would have meant packing a spare for comfort or for colder nights.

Jesus rules out that extra coat entirely.

Traveling light was the whole point of this mission.

🩴 Sandals were normal, practical footwear
🧥 A spare coat meant unnecessary comfort
🚫 Extra comfort was ruled out completely
➡️ Light travel matched urgent purpose

---
## 🏠 There Abide Till Ye Depart

Jesus tells them to settle with one host instead of hunting for a better offer.

This protected the host from feeling used or compared to someone else.

It also kept the disciples focused on the work instead of their own comfort.

Staying put showed respect for whoever took them in.

🏠 Settle with one host, not many
🙏 This protected the host's dignity
🎯 Focus stayed on the work, not comfort
📖 Staying put showed real respect

---
## 👣 Shake Off The Dust Under Your Feet

This was a visible, symbolic act, not just wiping off dirt.

Shaking off dust declared that a town had rejected God's own message.

It also showed the disciples were no longer responsible for that town's response.

The gesture spoke louder than any argument could.

👣 Dust shaking was a visible, symbolic act
🚪 It marked a town's rejection of the message
🙅 The disciples were no longer responsible for it
📖 Some messages must simply be left behind

---
## ⚖️ More Tolerable For Sodom And Gomorrha

Sodom and Gomorrha were ancient cities destroyed for their open wickedness, back in Genesis.

Jesus says rejecting this message will be judged even more harshly than that destruction.

Those cities never had someone like Jesus or his disciples walk through their gates.

Hearing the truth and refusing it carries a heavier weight than never hearing it at all.

⚖️ Sodom and Gomorrha were destroyed for wickedness
📏 Rejecting this message is judged more harshly
🚪 Those cities never heard a message like this
📖 Hearing truth raises the stakes of refusal

---
## 🔁 Preached That Men Should Repent

"Repent" means far more than simply feeling sorry.

It means turning around and heading in a completely different direction.

The disciples carried the same core message Jesus had already been preaching.

Their mission matched his own message exactly.

Jesus himself stayed behind this time.

🔁 Repent means turning in a new direction
🙏 It is more than feeling sorry
🤝 Their message matched Jesus's own message
📖 Turning around is the real meaning of repentance

---
## 🫙 Anointed With Oil Many That Were Sick

Oil was a common, practical remedy used across the ancient world, not a magic potion.

The disciples combined this ordinary practice with real, God given healing power.

Later, James's letter describes elders doing this same thing for the sick.

The physical act and the spiritual power worked together, not separately.

🫙 Oil was an ordinary ancient remedy
🙏 God's power worked through a normal practice
📜 James later describes this same custom
📖 The physical and the spiritual worked together

# Mark 6:14-20
# 👑 Herod's Guilty Conscience
---
## 👑 King Herod Heard Of Him

This Herod is Herod Antipas, a ruler over Galilee, not the Herod from Jesus's birth story.

"King" is used loosely here, since Antipas actually ruled as a tetrarch under Rome.

Jesus's growing fame had finally reached the regional palace.

That fame arrives tangled up with old guilt Herod never resolved.

👑 This is Herod Antipas, not Herod the Great
🏛️ Tetrarch was his real, smaller title
📢 Jesus's fame had reached the palace
📖 Old guilt met new fame here

---
## 👻 That John The Baptist Was Risen From The Dead

Herod had already had John executed, a fact revealed later in this very passage.

This theory reveals exactly whose death was haunting him.

Guilt can invent strange explanations rather than face a hard truth directly.

Herod would rather believe in a resurrection than admit what he had done.

👻 Herod imagines John's return from death
😨 This reveals exactly whose death haunts him
🙈 Guilt invents explanations instead of facing truth
📖 Avoiding guilt can distort what someone believes

---
## 🔥 Others Said, That It Is Elias

Many Jews expected the prophet Elijah to return before the Messiah arrived.

That expectation came from a promise near the end of the book of Malachi.

Confusing Jesus with Elijah shows how much excitement was building around him.

Nobody yet understood exactly who Jesus really was.

🔥 Elijah's return was a real expectation
📜 Malachi's prophecy fed that expectation
🌟 Excitement was building around Jesus
📖 Confusion often comes before clarity

---
## ⚔️ It Is John, Whom I Beheaded

Herod cuts through the other theories with blunt, guilty certainty.

He does not question whether John could be alive.

He simply assumes the worst explanation, driven by his own conscience.

Guilt tends to interpret mysteries through its own fear.

⚔️ Herod rejects the other theories outright
😬 His guilt supplies the answer instantly
🧠 Fear shaped how he explained the mystery
📖 A guilty conscience colors every explanation

---
## ⛓️ Laid Hold Upon John, And Bound Him In Prison

Mark now pauses the story to explain how John ended up dead.

Herod had John arrested and chained up well before this moment.

This flashback fills in the backstory behind Herod's guilty reaction.

Nothing about John's arrest came from Jesus or his disciples at all.

⛓️ Mark pauses to explain the backstory
👮 Herod ordered John's arrest himself
⏪ This is a flashback, not a new event
📖 Context explains why Herod reacted this way

---
## 💍 His Brother Philip's Wife

Herodias had been married to Herod's own brother before this.

Marrying a living brother's wife broke a clear command in the law of Moses.

John did not stay silent about this, even though it put him in danger.

This single marriage set the entire rest of the chapter in motion.

💍 Herodias was married to Herod's brother first
📜 The law of Moses forbade this marriage
🗣️ John spoke against it anyway
📖 One marriage set this whole story moving

---
## 📜 It Is Not Lawful For Thee To Have Thy Brother's Wife

John confronts a king directly, at real personal risk.

He does not soften the charge or offer Herod an easier way to hear it.

The law he quotes comes straight from Leviticus, not from John's own opinion.

Prophets in Israel were expected to speak this way, even to rulers.

📜 John quotes the law of Moses directly
👑 He confronts a king without softening it
⚠️ This put him in real danger
📖 Prophets answered to God before kings

---
## 😠 Herodias Had A Quarrel Against Him

"Quarrel" here means a deep, lasting grudge, not a passing argument.

Herodias cannot forgive John for naming her marriage publicly as wrong.

She wants John dead long before the events later in this chapter.

Her anger has been building quietly in the background the whole time.

😠 Quarrel means a lasting grudge here
🤐 She cannot forgive his public rebuke
⏳ Her anger had been building for a while
📖 Hidden grudges often surface later

---
## 😨 Herod Feared John, Knowing That He Was A Just Man

Herod respected John as "just," meaning right living and honest.

Fear and respect sit side by side here in an uneasy mix.

That same fear is exactly what kept John alive as long as it did.

Herod protected the very man whose message convicted him most.

😨 Just means honest and right living
🤝 Fear and respect mixed together here
🛡️ That fear protected John for a time
📖 Conviction and protection came from the same man

---
## 👂 Heard Him Gladly

Herod did not simply tolerate John's preaching out of obligation.

Something in him genuinely wanted to keep listening.

Conviction and enjoyment can exist in the same person at once.

That tension is exactly what makes his next decision so costly.

👂 Herod actually enjoyed listening to John
🎭 Conviction and enjoyment mixed in him
⚖️ That inner tension never got resolved
📖 Enjoying truth differs from obeying it

# Mark 6:21-25
# 🎭 Herod's Rash Promise
---
## 🍽️ Made A Supper To His Lords, High Captains, And Chief Estates

Herod throws a birthday feast for the most powerful men in the region.

"Lords" points to political nobles under his rule.

"High captains" points to military officers serving him.

"Chief estates" points to the wealthiest, most influential citizens of Galilee.

This was a room full of people Herod needed to impress.

🍽️ A birthday feast for powerful guests
🏛️ Lords and captains were political and military leaders
💰 Chief estates were the wealthiest citizens
📖 Image mattered as much as celebration

---
## 💃 The Daughter Of The Said Herodias Came In, And Danced

Herodias's daughter performs in front of her stepfather and his most important guests.

A royal daughter dancing for a room full of men was unusual and bold.

This moment was carefully timed, not a spontaneous request.

Herodias appears to have planned this opportunity in advance.

💃 Her dance was unusual and bold
🎯 The timing looks carefully planned
🧠 Herodias likely planned this in advance
📖 A performance opened the door to tragedy

---
## 🎁 Ask Of Me Whatsoever Thou Wilt

Herod makes an extravagant, public promise in front of all his guests.

Offers like this were meant to show off wealth and generosity.

He has no idea yet what this promise is about to cost him.

Pride made the offer before wisdom could stop it.

🎁 An extravagant promise made in public
💰 Meant to display wealth and generosity
😬 He has no idea what it will cost
📖 Pride spoke before wisdom could step in

---
## 🤝 Unto The Half Of My Kingdom

Herod ruled only as a tetrarch, a smaller regional governor under Rome.

He could never have actually handed over half of anything that size.

The promise is exaggerated, the kind of thing said in the heat of a celebration.

Herod will soon be trapped by words he never should have said so loosely.

🤝 Herod was only a regional tetrarch
🚫 He could not truly give half a kingdom
🗣️ The offer was exaggerated celebration talk
📖 Loose words are about to trap him

---
## 😳 What Shall I Ask

The daughter does not answer on her own.

She runs straight to her mother for the real decision.

That detail reveals who was actually driving this entire plan.

Herodias had clearly been waiting for an opening exactly like this one.

😳 She checks with her mother first
🎯 This reveals who was really in charge
⏳ Herodias had been waiting for this chance
📖 The real plan belonged to Herodias

---
## 🗣️ The Head Of John The Baptist

Herodias answers instantly, without a moment of hesitation.

This was not a sudden idea born out of anger.

It was a request she had clearly been holding onto for a long time.

Her grudge from verse nineteen finally finds its opening.

🗣️ Her answer comes without hesitation
⏳ This request had been waiting a long time
😠 Her old grudge finally finds its moment
📖 Patience can make hatred more dangerous

---
## 🍽️ In A Charger

A "charger" was a large serving platter normally used for food at a feast.

Asking for a severed head to be delivered on one is a chilling, deliberate image.

The request turns the celebration itself into the method of the killing.

Nothing about this moment was left to chance.

🍽️ Charger means a large serving platter
😨 A gruesome request dressed as a meal
🎭 The feast itself becomes the weapon
📖 Deliberate cruelty hides behind ordinary objects

---

# Mark 6:26-29
# 🗡️ The Death Of John The Baptist
---
## 😔 The King Was Exceeding Sorry, Yet For His Oath's Sake

Herod regrets the request the moment he hears it.

Regret alone is not enough to make him change course.

Protecting his reputation in front of his guests matters more to him than John's life.

Pride wins out over conscience in this single decision.

😔 Herod genuinely regrets the request
🎭 Reputation still outweighs his regret
⚖️ Pride wins over conscience here
📖 Image mattered more than a man's life

---
## 🗡️ Sent An Executioner

Herod does not personally carry out this act.

He delegates the killing the same way he might delegate any other order.

Distance from the act does not remove his responsibility for it.

Ordering a death is still choosing a death.

🗡️ Herod delegates the execution itself
🙋 Distance does not remove responsibility
⚖️ Ordering it is still choosing it
📖 Guilt does not require your own hands

---
## 🙋 Gave It To The Damsel, And The Damsel Gave It To Her Mother

The head passes from the executioner to the daughter, then straight to Herodias.

Each hand in this chain carries its own share of the guilt.

Herodias receives exactly what she asked for, with no delay.

The plan she had quietly built finally reaches its intended end.

🙋 The head passes through three hands
⚖️ Each hand shares in the guilt
🎯 Herodias gets exactly what she wanted
📖 A quiet plan reaches its cruel end

---
## ⚰️ Took Up His Corpse, And Laid It In A Tomb

John's own disciples step in once the danger has passed.

Giving him a proper burial was a final act of loyalty and respect.

They risked associating themselves with a man Herod had just executed.

Even in death, John was not abandoned by everyone.

⚰️ His disciples handle the burial
🙏 Burial was an act of loyalty
⚠️ They risked real danger doing it
📖 John was not abandoned in death

# Mark 6:30-34
# 🐑 Compassion On The Crowd
---
## 📣 Told Him All Things, Both What They Had Done, And What They Had Taught

The twelve return from the mission trip Jesus sent them on earlier in this chapter.

They report back in full, both their actions and their teaching.

This moment closes the loop that opened back in verse seven.

Jesus hears a full account before deciding what comes next.

📣 The twelve return from their mission
🔁 This closes the loop from verse seven
📝 They report both actions and teaching
📖 A full report comes before the next step

---
## 🏞️ Come Ye Yourselves Apart Into A Desert Place, And Rest A While

"Desert place" means a quiet, remote location, not necessarily a sandy wasteland.

Jesus notices that his disciples are worn out from constant ministry.

Rest here is not optional or a sign of weakness.

Jesus actively calls his closest followers away to recover.

🏞️ Desert place means a quiet, remote spot
😴 The disciples were genuinely worn out
🙏 Rest was Jesus's own idea, not theirs
📖 Rest is part of following Jesus

---
## ⛵ Departed Into A Desert Place By Ship Privately

Jesus and the disciples try to slip away quietly by boat.

A boat was the fastest way to leave without a crowd following on foot.

"Privately" shows this was meant to be a genuine retreat, not another public appearance.

Even Jesus pursued rest deliberately instead of letting it happen by accident.

⛵ A boat offered a quick, quiet exit
🤫 Privately means this was a real retreat
😮‍💨 Even Jesus needed deliberate rest
📖 Rest had to be planned, not hoped for

---
## 🏃 Ran Afoot Thither Out Of All Cities, And Outwent Them

Crowds from multiple towns race around the shoreline on foot.

Walking around the lake could actually beat a boat crossing it, depending on the wind and the route.

The planned retreat collapses before it even properly begins.

Jesus's popularity makes privacy almost impossible to find.

🏃 Crowds race around the shoreline on foot
⛵ They actually beat the boat there
😮 The retreat collapses almost immediately
📖 Popularity made privacy nearly impossible

---
## 💗 Moved With Compassion Toward Them

"Compassion" here means a deep, gut level ache for someone else's need.

Jesus feels this immediately, even though his own planned rest has just been interrupted.

His response is not frustration at the lost privacy.

It is care for the very people who interrupted it.

💗 Compassion means a deep, gut level ache
😮‍💨 His rest had just been interrupted
🙏 His response is care, not frustration
📖 Their need mattered more than his plan

---
## 🐑 As Sheep Not Having A Shepherd

This image comes straight from the Old Testament, especially from Ezekiel's warning about failed leaders.

Sheep without a shepherd wander, scatter, and stay exposed to danger.

Jesus looks at the crowd and sees people without real spiritual leadership.

That is exactly the gap Jesus steps in to fill.

🐑 Sheep without a shepherd wander and scatter
📜 This image echoes Ezekiel's warning
👥 The crowd lacked real spiritual leadership
📖 Jesus steps into that exact gap

# Mark 6:35-38
# 🍞 Give Ye Them To Eat
---
## 🏜️ This Is A Desert Place, And Now The Time Is Far Passed

The disciples point out two practical problems at once, location and time.

Evening is approaching and there is nowhere nearby to buy food.

Their concern is reasonable and completely understandable.

They have no idea what Jesus is about to do with that problem.

🏜️ Two problems stack up, place and time
🌇 Evening is approaching with no food nearby
🤷 Their concern is completely reasonable
📖 They cannot yet see what is coming

---
## 🛒 Buy Themselves Bread, For They Have Nothing To Eat

The disciples' solution is practical and obvious, send the people away to buy food.

That plan assumes the only way to solve hunger is nearby shops or towns.

Jesus is about to reject that entire assumption.

The answer he has in mind does not involve sending anyone away at all.

🛒 Their plan was to send the crowd away
🏘️ It assumed shops were the only solution
🚫 Jesus rejects that assumption completely
📖 His answer needed no shops at all

---
## 🍞 Give Ye Them To Eat

Jesus hands the problem straight back to his disciples instead of solving it himself first.

This command sounds almost impossible given what they have on hand.

He is testing what they believe is possible, before showing them what actually is.

Faith often gets tested with a task before it gets the full picture.

🍞 Jesus hands the problem to them
😳 The command sounds impossible on its face
🧪 He tests their faith before revealing the plan
📖 Faith is often tested before it is proven

---
## 💰 Two Hundred Pennyworth Of Bread

A "pennyworth" in this translation refers to a denarius, about a full day's wage for a laborer.

Two hundred pennyworth adds up to about two hundred days of ordinary work.

The disciples name an enormous sum to make the task sound impossible.

Their math is correct, but it misses what Jesus is about to do.

💰 A pennyworth was a full day's wage
🔢 Two hundred of them meant real wealth
😳 They name a huge sum on purpose
📖 Correct math still misses the real point

---
## 🐟 Five, And Two Fishes

The disciples count what little they actually have on hand.

Five loaves and two fish were barely enough for one small group, let alone thousands.

Naming the small number makes the coming miracle impossible to miss.

Jesus starts with almost nothing and that is exactly the point.

🐟 Five loaves and two fish, barely anything
👥 Nowhere near enough for the crowd
🔢 Naming the number sets up the miracle
📖 Almost nothing becomes exactly enough

# Mark 6:39-44
# 🌾 Five Loaves And Two Fishes
---
## 🌱 Sit Down By Companies Upon The Green Grass

"Companies" simply means organized groups, the same word used for travel groups or crowds.

"Green grass" is a small detail that places this miracle near springtime in Galilee.

Jesus brings order to what could easily have become total chaos.

Even a miracle this large starts with a calm, organized plan.

🌱 Companies means organized groups of people
🌿 Green grass hints at the season
🗂️ Jesus brings order before the miracle
📖 Even miracles start with calm planning

---
## 🔢 In Ranks, By Hundreds, And By Fifties

This exact kind of grouping echoes how Israel once organized its camp in the wilderness.

Dividing thousands of people into smaller units made the moment manageable.

It also made it far easier to count exactly how many were fed later.

Order here serves both practical need and a deeper, familiar pattern.

🔢 This grouping echoes Israel's wilderness camp
🗂️ Smaller units made the crowd manageable
🧮 It also made counting the crowd possible
📖 Order served both purpose and pattern

---
## 🙏 Looked Up To Heaven, And Blessed

Jewish meals traditionally began with a spoken blessing over the food, thanking God first.

Jesus follows that same familiar custom before anything unusual happens.

The miracle does not begin with a dramatic gesture.

It begins with an ordinary prayer of thanks.

🙏 A blessing opened ordinary Jewish meals
🍞 Jesus follows that familiar custom
✨ The miracle starts in an ordinary moment
📖 Thanks came before the miracle, not after

---
## 🍞 Brake The Loaves, And Gave Them To His Disciples

Jesus does the breaking and blessing, but the disciples do the distributing.

The miracle happens somewhere in that handoff, not fully shown to any single witness.

Everyone still plays a real part in getting the food to the crowd.

Jesus multiplies what the disciples then carry out to the people.

🍞 Jesus breaks and blesses the bread
🙋 Disciples carry out the actual distributing
✨ The multiplying happens in that handoff
📖 Jesus provides, and people still carry it out

---
## 😋 Did All Eat, And Were Filled

Every single person in a crowd this large ate until they were satisfied.

"Filled" means genuinely full, not just given a small taste.

Five loaves and two fish should never have stretched this far.

The miracle is measured in full stomachs, not leftover mystery.

😋 Filled means genuinely full, not a taste
👥 Every person in the crowd ate well
🍞 Five loaves should never stretch this far
📖 The miracle is measured in full stomachs

---
## 🧺 Twelve Baskets Full Of The Fragments

Twelve baskets recalls the twelve apostles and the twelve tribes of Israel, a number already loaded with meaning.

Leftovers this large prove the miracle provided far more than the minimum needed.

Nothing was wasted, even in the middle of abundance.

Abundance and carefulness show up together here.

🧺 Twelve baskets echoes a meaningful number
📦 Leftovers prove far more than enough was made
♻️ Nothing was wasted despite the abundance
📖 Abundance and carefulness showed up together

---
## 👨 About Five Thousand Men

This count only includes men, following the custom of counting heads of households.

Women and children likely raised the real total much higher.

Five thousand men alone already represents an enormous crowd for one hillside.

The true scale of this miracle was almost certainly larger than the number states.

👨 The count includes men only
👩 Women and children were likely not counted
🏔️ Five thousand alone was already enormous
📖 The real number was likely even higher

# Mark 6:45-52
# 🌊 Walking On The Sea
---
## ⛵ Constrained His Disciples To Get Into The Ship

"Constrained" means Jesus firmly insisted, not a gentle suggestion.

The disciples apparently needed real pushing to leave the scene of this miracle.

Jesus sends them toward Bethsaida while he stays behind to finish up alone.

Even his own closest followers sometimes needed a firm push forward.

⛵ Constrained means a firm insistence
🙅 They clearly did not want to leave
🧭 Jesus sends them toward Bethsaida
📖 Even disciples sometimes need a push

---
## ⛰️ Departed Into A Mountain To Pray

Jesus deliberately seeks solitude after a long, draining day of ministry.

Mountains often served as quiet, private places away from crowds in this region.

Prayer here is not an emergency measure, it is Jesus's regular practice.

Even the Son of God made time alone with the Father a priority.

⛰️ Mountains offered quiet, private space
🙏 Prayer was Jesus's regular practice
🔋 Rest and prayer followed a draining day
📖 Even Jesus prioritized time with the Father

---
## 🌊 He Alone On The Land

Jesus intentionally separates himself from the disciples for a time.

The disciples are left to face a dangerous crossing completely on their own.

Being physically alone never means Jesus has lost track of them.

What happens next proves he is watching even from a distance.

🌊 Jesus stays behind on the land
⛵ The disciples face the crossing alone
👀 Being alone never meant being forgotten
📖 Distance does not limit his awareness

---
## 🕐 About The Fourth Watch Of The Night

Roman timekeeping split the night into four watches of about three hours each.

The fourth watch covers the darkest, most exhausting hours before dawn.

The disciples have likely been rowing against the wind for most of the night by now.

Jesus arrives at the exact moment their strength is running out.

🕐 Night was split into four watches
🌑 The fourth watch covered the darkest hours
😴 The disciples had been rowing for hours
📖 Help arrived right as strength ran out

---
## 🚶 Walking Upon The Sea, And Would Have Passed By Them

Walking on open water breaks every normal rule of nature on purpose.

"Would have passed by them" echoes old language used when God appeared to Moses and Elijah.

This miracle is not random, it points straight back to how God revealed himself before.

Jesus is not simply helping his friends, he is showing them exactly who he is.

🚶 Walking on water broke nature's normal rules
📜 This echoes how God once appeared to Moses
🔁 Old patterns point to who Jesus really is
📖 The miracle reveals identity, not just power

---
## 👻 Supposed It Had Been A Spirit

Fear made the disciples misread what they were actually looking at.

A figure walking on water at night looked more like a ghost than a friend.

Their minds reached for the frightening explanation first.

Fear often distorts what is right in front of a person.

👻 Fear made them misread what they saw
🌙 A nighttime figure looked like a ghost
🧠 Their minds jumped to the scary option
📖 Fear can distort what is right there

---
## 🗣️ Be Of Good Cheer, It Is I, Be Not Afraid

"It is I" in the original language echoes the way God once named himself to Moses.

Jesus calms their fear with both his words and his identity at once.

This phrase says far more than "do not worry."

It quietly claims the same authority behind that ancient divine name.

🗣️ It is I echoes God's own name
🧘 Words alone did not calm them, identity did
👑 The phrase claims real, divine authority
📖 Comfort here comes from who is speaking

---
## 🤯 Sore Amazed In Themselves Beyond Measure

The disciples react with overwhelming, almost disbelieving shock.

This is not a mild surprise or a polite reaction.

Their response measures just how far outside normal experience this moment felt.

Something this far beyond nature deserved exactly this kind of reaction.

🤯 Their shock was overwhelming, not mild
😲 This went far beyond a polite reaction
📏 Their reaction measured the size of the miracle
📖 Some moments deserve total astonishment

---
## 💔 For Their Heart Was Hardened

"Heart" in this context means their whole inner understanding, not just emotion.

The feeding of the crowd should have already prepared them to expect something like this.

Instead the miracle on the water catches them completely off guard again.

Spiritual slowness, not a lack of evidence, is the real problem Mark points to here.

💔 Heart here means inner understanding
🍞 The earlier miracle should have prepared them
😶 They are caught off guard again anyway
📖 Slowness to understand was the deeper issue

# Mark 6:53-56
# 🏥 Healing At Gennesaret
---
## 🌾 Came Into The Land Of Gennesaret

Gennesaret was a fertile plain along the northwest shore of the Sea of Galilee.

This region was known for rich soil and heavy traffic between towns.

Jesus and his disciples finally reach solid ground after the night on the water.

A dangerous crossing ends safely on familiar, productive land.

🌾 Gennesaret was a fertile lakeside region
🏞️ It was known for rich soil
⛵ The dangerous crossing finally ends here
📖 Safety followed a night of real danger

---
## 🏃 Straightway They Knew Him

Jesus's reputation now spreads faster than he can travel.

People recognize him the moment he steps off the boat.

This immediate recognition shows just how far his fame has already reached.

Privacy becomes harder to find with every chapter of this book.

🏃 His reputation now travels ahead of him
👀 People recognize him instantly
📢 His fame has clearly spread far
📖 Privacy keeps shrinking as his fame grows

---
## 🛏️ Ran Through That Whole Region Round About

Word of Jesus's arrival spreads through the whole countryside almost immediately.

People begin gathering the sick from every nearby town and village.

This was not one quiet healing, it quickly becomes a regional event.

Need, once it hears good news, tends to travel fast.

🛏️ News of his arrival spreads instantly
🏘️ The sick are gathered from nearby towns
🌍 One healing becomes a regional event
📖 Need travels fast once hope arrives

---
## 🧵 But The Border Of His Garment

The "border" refers to the tassel worn on the edge of a Jewish prayer garment.

This exact detail already appeared earlier, when a sick woman touched it in Mark five.

That single story has apparently spread and inspired the whole region's hope.

Faith here looks small on the outside, reaching for nothing more than a fringe.

🧵 Border means the tassel on his garment
🔁 This echoes the woman from Mark five
📢 Her story clearly spread through the region
📖 Small faith still reached for something real

---
## ✅ As Many As Touched Him Were Made Whole

This closing line describes healing on a massive, almost uncountable scale.

Every single person who reached out in faith received the same result.

Mark ends this chapter on overwhelming mercy, not on the earlier doubt from Nazareth.

The chapter that opened with unbelief in one town closes with faith spreading through a whole region.

✅ Healing reaches everyone who reaches out
🙌 No one who touched him was turned away
🔄 The chapter ends in mercy, not doubt
📖 Nazareth's unbelief gives way to a region's faith
`.trim();

export const MARK_SIX_PERSONAL_SECTIONS = parseMarkSixRawNotes(MARK_SIX_RAW_NOTES);
