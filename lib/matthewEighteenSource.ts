export type MatthewEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewEighteenRawNotes(rawText: string): MatthewEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 18:${startVerse}` : `Matthew 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Matthew 18 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_EIGHTEEN_RAW_NOTES = `# Matthew 18:1-5
# 👶 Become As Little Children
---
## 🤔 Who Is The Greatest In The Kingdom Of Heaven

The disciples were not asking an idle question.

Jewish teachers of this time argued constantly about who ranked above whom.

The disciples wanted to know where each of them stood in Jesus's coming kingdom.

They assumed that kingdom would work like every other kingdom they knew.

Jesus is about to overturn the whole question.

🤔 The disciples ask about rank
📜 Teachers often argued about status
👑 They expect a normal kingdom
📖 Jesus is about to overturn their question

## 👶 Jesus Called A Little Child Unto Him

A child in this culture held almost no status at all.

Children could not vote, teach, or speak in a synagogue.

They depended completely on someone else for food, safety, and care.

Jesus sets this exact kind of person in the middle of a status argument.

The choice itself is already an answer.

👶 A child held almost no status
🏠 Children depended on others for everything
✋ They could not teach or lead
📖 Jesus answers with his choice itself

## 🔄 Except Ye Be Converted

"Converted" here means turned around, not simply convinced.

The Greek word pictures someone changing direction entirely.

Jesus is not asking for a new fact to agree with.

He is asking for a different posture toward life itself.

Without that turn the kingdom stays out of reach.

🔄 Converted means turned around
🧭 It pictures a change of direction
💭 Not just a new fact to accept
📖 Without that turn the kingdom stays shut

## 🧒 Become As Little Children

This does not mean acting silly or immature.

Children in this culture did not scheme for rank or title.

They simply trusted the people who cared for them.

Jesus wants that same simple trust turned toward God.

Status seeking has no place in this kind of kingdom.

🚫 Not about acting immature
🤝 Children trusted without scheming
🙏 Jesus wants that same trust
📖 Status seeking has no place here

## 📉 Whosoever Therefore Shall Humble Himself As This Little Child

To humble yourself means lowering your own status on purpose.

Nobody forces a child to let go of rank and title.

A child simply has none to defend in the first place.

Jesus calls the disciples to give up their own claims the same way.

Greatness here starts with letting go, not climbing higher.

📉 Humble means lowering yourself on purpose
🧒 A child has no status to defend
🤲 Disciples are asked to let go too
📖 Greatness starts with letting go

## 👑 The Same Is Greatest In The Kingdom Of Heaven

Jesus flips the disciples' entire question upside down.

They wanted to know who ranks highest.

He tells them the one who stops competing ranks highest.

This is not how any human kingdom works.

In this kingdom the lowest seat is the highest one.

🔃 Jesus flips the question upside down
🏆 The one who stops competing wins
👑 No human kingdom works this way
📖 The lowest seat is the highest

## 🏷️ Whoso Shall Receive One Such Little Child In My Name

"In my name" means doing this for Jesus's sake, as his representative.

Welcoming someone with no status back then earned no credit or reward.

There was nothing to gain from being kind to a child.

Jesus says that very act still reaches him personally.

Nothing done for the overlooked goes unnoticed.

🏷️ In my name means for Jesus's sake
🙅 Welcoming a child earned no credit
❤️ Kindness to the overlooked still matters
📖 Nothing done for them goes unnoticed

## 🔗 Receiveth Me

Jesus ties himself directly to the person nobody else would notice.

Whatever is done for that person is counted as done for him.

This is the same link Jesus draws later about the hungry and the stranger.

God does not watch the overlooked from a distance.

He stands with them personally.

🔗 Jesus links himself to the overlooked
🤝 Done for them counted as done for him
🍞 The same link appears again later
📖 God stands with the overlooked personally

# Matthew 18:6-9
# ⚠️ Woe Unto The World Because Of Offences
---
## ⚠️ Whoso Shall Offend One Of These Little Ones

"Offend" here means to cause someone to stumble into sin.

It is a far stronger word than simply hurting someone's feelings.

"Little ones" now includes anyone young or new in trusting Jesus.

Leading someone like that away from faith is treated with total seriousness.

⚠️ Offend means causing someone to stumble
💔 It is stronger than hurt feelings
🌱 Little ones includes new believers too
📖 Leading them astray is taken seriously

## 🪨 A Millstone Were Hanged About His Neck

This was not a small handheld stone used for grinding grain.

A millstone this size was normally turned by a donkey.

Tying one around a person's neck and dropping them in the sea guaranteed death.

Drowning this way was also considered a shameful death in this culture.

Jesus picks the harshest image available to make his point land.

🪨 This millstone was donkey sized, not small
🌊 Tied to the neck, it guaranteed death
😔 Drowning was seen as a shameful end
📖 Jesus picks the harshest image available

## 😢 Woe Unto The World Because Of Offences

"Woe" is a cry of grief and warning at the same time.

It is the word used over cities about to face judgment.

Jesus uses it here for the entire world, not one person.

Causing others to stumble carries weight far beyond a private mistake.

😢 Woe means grief and warning together
🏙️ The same word is used over judged cities
🌍 Jesus aims it at the whole world
📖 Causing others to stumble is never private

## 🌐 It Must Needs Be That Offences Come

Jesus admits that temptation to sin will always exist somewhere.

That admission is not an excuse for the person who creates it.

A broken world guarantees opportunities for sin.

It never guarantees who has to be the one who provides them.

🌐 Temptation will always exist somewhere
🚫 That is not an excuse for anyone
🎯 Someone still chooses to cause it
📖 The world's brokenness is not a shield

## 🙅 If Thy Hand Or Thy Foot Offend Thee, Cut Them Off

Jesus is not commanding actual self harm here.

Jewish teachers often used extreme exaggeration to make a point unforgettable.

The real message is to remove whatever leads you into sin.

Do that no matter the cost.

A hand or a foot stands for any habit or relationship that drags you down.

🙅 Not a command for real self harm
📢 Teachers used extreme exaggeration on purpose
✂️ Remove whatever leads you into sin
📖 A hand stands for any harmful habit

## 🦵 Better For Thee To Enter Into Life Halt Or Maimed

"Halt" is an old word for limping or lame.

"Maimed" means missing a limb altogether.

Jesus says a limited life with God still beats a whole life without him.

No earthly loss compares to missing eternity with God.

🦵 Halt is an old word for limping
🖐️ Maimed means missing a limb
⚖️ A limited life with God still wins
📖 No earthly loss compares to missing God

## 👁️ If Thine Eye Offend Thee, Pluck It Out

Jesus already used this same picture back in chapter five.

The eye there stood for desire that leads a person into sin.

He repeats the picture here for the same reason.

Whatever feeds that desire has to go, no matter how painful removing it feels.

👁️ The eye pictures desire that leads to sin
🔁 Jesus repeats this picture from chapter five
✂️ Whatever feeds that desire has to go
📖 Removing it may hurt, keeping it costs more

## 🔥 Cast Into Hell Fire

The word behind "hell" here is Gehenna.

Gehenna was a real valley outside Jerusalem.

It had a history of child sacrifice and later became a place for burning trash.

Jesus uses that valley's ugly history as a picture of final judgment.

Entering life matters more than keeping anything that leads there instead.

🔥 Hell here is named Gehenna
🗑️ It was a valley once used for trash
⚱️ Its history included child sacrifice
📖 Life with God matters more than anything else

# Matthew 18:10-14
# 🐑 The Parable Of The Lost Sheep
---
## 👀 Take Heed That Ye Despise Not One Of These Little Ones

"Despise" means treating someone as unimportant or beneath notice.

Jesus already warned about leading little ones into sin.

Now he warns against something quieter, simply looking down on them.

Both failures come from the same wrong view of who matters.

👀 Despise means treating someone as unimportant
🤫 This warning is quieter than the last one
⚖️ Both failures share the same wrong view
📖 Everyone matters to Jesus, not just some

## 👼 Their Angels Do Always Behold The Face Of My Father

Many Jewish teachers of this time believed each person had an angel assigned to them.

Jesus builds on that idea here.

These particular angels stand constantly in God's own presence.

Overlooking a little one means overlooking someone with that kind of standing in heaven.

👼 Jewish teachers believed in personal angels
🏛️ These angels stand before God always
🙇 A little one has real standing in heaven
📖 Overlooking them overlooks someone God watches closely

## 👤 The Son Of Man Is Come To Save That Which Was Lost

"The Son of man" is the title Jesus most often uses for himself.

It points back to a prophecy in the book of Daniel.

Some of the oldest manuscripts do not include this exact verse.

Either way it matches exactly what Jesus does throughout this whole Gospel.

👤 Son of man is Jesus's own title
📜 It points back to the prophet Daniel
📚 Some old manuscripts leave this verse out
📖 It still matches Jesus's whole mission

## 🐑 If A Man Have An Hundred Sheep

A hundred sheep represented a sizable, valuable flock for this time.

A hired shepherd often watched flocks this size for someone else.

Every single animal still counted, even inside a flock that large.

Jesus starts the story with real shepherding, not an abstract idea.

🐑 A hundred sheep was a valuable flock
👨‍🌾 Shepherds often worked for someone else
🔢 Every single animal still counted
📖 Jesus starts with real shepherding, not theory

## 👣 One Of Them Be Gone Astray

"Gone astray" means wandering off without any intention of being lost.

Sheep do not usually run away on purpose.

They simply drift, one step at a time, until they are far from the flock.

The picture fits people who slowly wander from faith the exact same way.

🐑 Astray means wandering without meaning to
👣 Sheep drift one step at a time
🚶 People can wander from faith the same way
📖 Small drifting adds up to real distance

## 🎉 He Rejoiceth More Of That Sheep

The shepherd's joy here is not calm or restrained.

"Rejoiceth" describes real, visible celebration.

One recovered sheep means more to him in this moment than the ninety nine that stayed safe.

That is not because the other sheep matter less.

It is because rescue always brings a different kind of joy.

🎉 Rejoiceth means real, visible celebration
🐑 One recovered sheep brings huge joy
❤️ The other sheep still matter too
📖 Rescue brings its own kind of joy

## 🐏 Than Of The Ninety And Nine Which Went Not Astray

The ninety nine sheep were never forgotten in this story.

They stayed safely in the shepherd's view the entire time.

His search for the one does not come at their expense.

God's attention does not run out when he focuses on someone far from him.

🐏 The ninety nine were never forgotten
👀 They stayed in the shepherd's view
🔍 Searching for one costs the others nothing
📖 God's attention never runs out

## 👨 It Is Not The Will Of Your Father Which Is In Heaven, That One Of These Little Ones Should Perish

Jesus names exactly who the parable was about all along.

"Your Father" makes this personal, not a general moral lesson.

"Perish" means complete and final loss, not a minor setback.

God's will leans toward keeping people, not losing them.

👨 Your Father makes this personal
💔 Perish means complete, final loss
🙏 God's will leans toward keeping people
📖 Not losing them is the whole point

# Matthew 18:15-17
# 🗣️ If Thy Brother Trespass Against Thee
---
## ⚔️ If Thy Brother Shall Trespass Against Thee

"Trespass" here means a specific wrong done against you personally.

This is not the general sin everyone struggles with privately.

Jesus is addressing a direct conflict between two people.

The steps that follow only make sense once the wrong is actually personal.

⚔️ Trespass means a specific personal wrong
🙍 Not sin in general, a direct conflict
🤝 Two specific people are in view
📖 The next steps depend on that

## 🤫 Tell Him His Fault Between Thee And Him Alone

Jesus gives the smallest possible circle first, just the two people involved.

Going private protects the other person's reputation.

Things can still be fixed quietly at this stage.

Skipping straight to gossip or public complaint was never the first step Jesus gave.

Most conflicts were meant to end right here.

🤫 Start with just the two people
🛡️ Privacy protects the other person's reputation
🚫 Gossip was never the first step
📖 Most conflicts should end right here

## 🏆 Thou Hast Gained Thy Brother

"Gained" does not mean winning an argument.

It means the relationship itself is restored.

The goal of the whole conversation was never to be proven right.

A brother back in right relationship is worth more than being right alone.

🏆 Gained does not mean winning an argument
🤝 It means the relationship is restored
🎯 Being right was never the goal
📖 A restored brother is worth more

## ➕ Take With Thee One Or Two More

This second step only happens if the private conversation fails.

The extra people are not there to gang up on anyone.

They confirm what actually happened and help both sides hear each other clearly.

Conflict resolution in Jesus's teaching moves slowly, not all at once.

➕ This step only follows a failed talk
🙅 Witnesses do not gang up on anyone
👂 They help both sides hear clearly
📖 Resolution moves slowly, step by step

## 📜 In The Mouth Of Two Or Three Witnesses

This exact phrase comes from a legal rule written in Deuteronomy.

No single accusation could settle a serious dispute on its own.

Multiple witnesses protected against one person's word being used unfairly.

Jesus applies this same ancient safeguard to conflict inside the church.

📜 This phrase comes from Deuteronomy
⚖️ One accusation alone could not settle a case
🛡️ Multiple witnesses protected against unfair blame
📖 Jesus applies this safeguard to the church

## 🏛️ Tell It Unto The Church

"The church" here means the whole local gathering of believers.

This is the last step, only reached after two failed attempts at peace.

The goal even now is restoration, not punishment for its own sake.

A wider circle hears the matter only because a smaller one could not resolve it.

🏛️ Church means the local gathering of believers
🔁 This step follows two failed attempts
🎯 Restoration is still the real goal
📖 A wider circle only hears if needed

## 🌍 Let Him Be Unto Thee As An Heathen Man And A Publican

A "heathen" was someone considered outside God's covenant people.

A "publican" was a tax collector, widely hated for working with Rome.

Treating someone this way meant no longer pretending the relationship was fine.

It was not cruelty for its own sake.

It was honesty about a broken relationship.

🌍 Heathen meant an outsider to the covenant
💰 Publican meant a hated tax collector
🚪 This meant naming the relationship as broken
📖 Honesty, not cruelty, was the point

# Matthew 18:18-20
# 🔓 Bound In Heaven
---
## 🔗 Whatsoever Ye Shall Bind On Earth Shall Be Bound In Heaven

"Bind" and "loose" were common rabbinic terms for declaring something forbidden or allowed.

Jewish teachers used this exact language constantly in their rulings.

Jesus gives his followers real authority to make these calls too.

Heaven backs up decisions made rightly in his name.

🔗 Bind and loose were rabbinic terms
📜 They meant forbidding or allowing something
🗝️ Jesus gives his followers this authority
📖 Heaven backs decisions made in his name

## 🔓 Whatsoever Ye Shall Loose On Earth Shall Be Loosed In Heaven

"Loose" is the other half of the same rabbinic pair.

It can mean declaring something permitted or releasing someone from an obligation.

In this context it likely connects directly to the forgiveness process just described.

Restoring a repentant brother is itself an act heaven stands behind.

🔓 Loose means permitting or releasing
🤝 It connects to the forgiveness just described
🙏 Restoring a brother is backed by heaven
📖 Forgiveness carries real spiritual weight

## 🤝 If Two Of You Shall Agree On Earth

"Agree" here does not describe just any wish two people happen to share.

The surrounding context is about the church settling conflict and praying together.

Shared, aligned prayer carries weight that a lone request does not.

This is a promise about unity, not a formula for getting anything requested.

🤝 Agree means aligned, not just shared
🙏 The context is the church praying together
💪 Aligned prayer carries real weight
📖 This is about unity, not a formula

## 🔢 Where Two Or Three Are Gathered Together In My Name

Jewish tradition already taught that ten men were needed to form an official place of prayer.

Jesus drops that number dramatically, down to two or three.

"In my name" means gathered specifically around who Jesus is.

The size of the gathering was never what mattered most to him.

🔢 Jewish tradition required ten for formal prayer
📉 Jesus drops that number to two or three
🏷️ In my name means gathered around him
📖 Size was never what mattered most

## 🤲 There Am I In The Midst Of Them

Jesus promises his own presence, not just his approval from a distance.

"In the midst" pictures him standing right there among them.

No temple, building, or large crowd is required for this to be true.

Wherever his name gathers people he is already there.

🤲 Jesus promises presence, not distant approval
📍 In the midst means standing right there
🏛️ No temple or crowd is required
📖 His presence does not depend on size

# Matthew 18:21-22
# 🔢 Until Seventy Times Seven
---
## 📜 How Oft Shall My Brother Sin Against Me, And I Forgive Him

Jewish teaching at this time commonly limited forgiveness to three times.

Peter is about to offer more than double that limit.

He likely expects Jesus to call this generous.

Peter has no idea how far Jesus is about to move the number.

📜 Jewish teaching often capped forgiveness at three
➕ Peter offers more than double that
😊 He expects to sound generous
📖 Jesus is about to move the number far

## 😊 Till Seven Times

Seven already felt like a generous, complete number to Peter.

In Jewish thought, seven often symbolized wholeness or completeness.

Peter is proposing what feels like full, complete forgiveness.

He is still thinking inside a countable limit.

😊 Seven felt complete and generous
✅ Seven often symbolized wholeness
🔢 Peter still proposes a countable limit
📖 Jesus is not thinking in limits at all

## ❌ I Say Not Unto Thee, Until Seven Times

Jesus answers Peter's specific number directly.

He does not soften it or negotiate upward slightly.

He rejects the entire idea of counting at all.

Forgiveness was never meant to run on a scoreboard.

❌ Jesus rejects Peter's exact number
🙅 He does not just raise it slightly
🧮 He rejects counting altogether
📖 Forgiveness was never a scoreboard

## ➗ Until Seventy Times Seven

This number is not a literal math problem to solve.

The phrase deliberately produces a number too large to track.

It quietly echoes an old boast about revenge in the book of Genesis.

Jesus takes that same extreme language and turns it toward mercy instead.

➗ Not a literal number to calculate
🔢 It is deliberately too large to track
📜 It echoes an old boast about revenge
📖 Jesus turns extreme language toward mercy

# Matthew 18:23-27
# 💰 The King Forgives The Debt
---
## 💬 The Kingdom Of Heaven Likened Unto A Certain King

Jesus answers Peter's question about forgiveness with a full story.

Parables like this use an everyday situation to explain something about God.

Here the everyday situation is a king settling his accounts.

The king in this story stands in for God himself.

💬 Jesus answers Peter with a full story
👑 A king settling accounts starts it
🏛️ The king pictures God himself
➡️ The lesson is about forgiveness itself

## 📋 Take Account Of His Servants

"Take account" describes a formal settling of debts and records.

Kings and officials did this regularly to manage their kingdoms.

Servants in this story are not slaves at the bottom of society.

These are officials who managed large amounts of the king's money.

📋 Take account means settling debts formally
👑 Kings did this to manage their kingdoms
💼 These servants were officials, not laborers
📖 They managed large sums of money

## 💰 One Was Brought Unto Him, Which Owed Him Ten Thousand Talents

A single talent equaled about twenty years of an average laborer's wages.

Ten thousand talents is a debt no ordinary person could ever repay.

Some estimates put the total near what an entire small nation collected in tax yearly.

Jesus picks a number designed to sound completely impossible.

💰 One talent was about twenty years of wages
🔢 Ten thousand talents was an impossible sum
🏛️ It rivaled a small nation's yearly taxes
📖 Jesus picks a number meant to stun

## 📜 Forasmuch As He Had Not To Pay

"Forasmuch" is an old word meaning since or because.

The servant simply has no way to cover a debt this large.

No amount of effort on his part could close that gap.

The story depends entirely on this debt being impossible to repay.

📜 Forasmuch is an old word for since
🚫 He has no way to pay it
🧮 No effort could close that gap
📖 The debt is designed to be impossible

## ⛓️ Commanded Him To Be Sold, And His Wife, And Children

Debt slavery was a real, legal practice in the ancient world.

A man who could not pay could be sold, along with his whole household.

This was not an exaggeration for effect.

It reflects exactly how unpaid debt was handled at this time.

⛓️ Debt slavery was a real, legal practice
👨‍👩‍👧 His whole household could be sold too
📜 This was not an exaggeration
📖 It shows how serious the debt was

## 🙏 Lord, Have Patience With Me, And I Will Pay Thee All

The servant promises something he has no actual ability to deliver.

He cannot repay this debt no matter how much time he gets.

His plea is honest about his desperation, not about his math.

⏳ More time will not fix this debt
🙏 He promises something he cannot deliver
😟 His plea is honest desperation
📖 He asks for mercy, not a loan

## ❤️ Moved With Compassion, And Loosed Him

"Compassion" here describes a deep, gut level pity, not polite sympathy.

The king was under no obligation to feel this at all.

He had full legal right to carry out the original sentence.

Instead, mercy interrupts what the law technically allowed.

❤️ Compassion means deep, gut level pity
⚖️ The king had full legal right to punish
🛑 Mercy interrupts what the law allowed
📖 He was not required to feel this

## 🎁 Forgave Him The Debt

The king does not lower the debt or set up a payment plan.

He cancels the entire impossible sum completely.

Nothing is left for the servant to pay back later.

This is the picture of grace the whole parable is building toward.

🧾 The debt is not reduced, it is cancelled
🙅 Nothing is left to repay
🎁 This pictures grace, not a discount
📖 The whole parable builds toward this moment

# Matthew 18:28-35
# ⚖️ The Unforgiving Servant
---
## 🪙 Found One Of His Fellowservants, Which Owed Him An Hundred Pence

A "pence" here is a denarius, about one day's wage for a laborer.

One hundred pence was a small, repayable amount of money.

It was nothing compared to the ten thousand talents just forgiven.

This servant owes a debt that could realistically be paid back.

🪙 A pence was about a day's wage
💵 A hundred pence was a small debt
⚖️ It was nothing next to ten thousand talents
📖 This debt could realistically be repaid

## ✊ Laid Hands On Him, And Took Him By The Throat

This servant uses physical force to demand payment.

Grabbing someone by the throat was a known way to intimidate a debtor publicly.

He does this only moments after being forgiven an enormous debt himself.

The contrast exposes exactly how little the mercy he received had changed him.

✊ He uses physical force to demand payment
😤 Grabbing the throat was public intimidation
⏱️ This happens right after his own forgiveness
📖 Mercy received had not changed him at all

## 🔁 Have Patience With Me, And I Will Pay Thee All

This is the exact same plea the servant made to the king earlier.

He is hearing his own desperate words repeated back to him.

The fellow servant is asking for precisely what he himself received.

He has every reason to recognize this moment immediately.

🔁 These are his own exact words
🪞 He hears his own plea repeated back
🤝 The fellow servant asks for the same mercy
📖 He should recognize this moment instantly

## 🛑 He Would Not

Three short words carry the entire turn of the story.

This is not confusion or forgetfulness.

The servant understands the request perfectly and refuses anyway.

The refusal is a choice, made in full awareness.

🛑 Three words carry the whole turn
🧠 This is not confusion or forgetting
❌ He refuses with full understanding
📖 The refusal is a deliberate choice

## 🔒 Cast Him Into Prison, Till He Should Pay The Debt

Debtor's prison was meant to pressure family or friends into paying instead.

A man locked away could not work to earn the money himself.

The punishment made repayment less likely, not more likely.

This detail quietly highlights how senseless the servant's unforgiveness really is.

🔒 Prison pressured family to pay instead
🚫 A prisoner could not work to repay
🔄 This made repayment less likely, not more
📖 Unforgiveness here makes no real sense

## 😟 They Were Very Sorry

The other servants are not indifferent to what they just watched.

Genuine distress spreads through the whole group.

Their response leads directly to the king hearing about it.

Community around a wrong rarely stays silent for long in this story.

😟 The other servants feel real distress
👥 Distress spreads through the whole group
📢 Their reaction leads to the king hearing
📖 Community did not stay silent here

## 🔥 O Thou Wicked Servant

The king's tone shifts completely from the earlier scene.

"Wicked" here names a specific moral failure, not a general insult.

The failure is clear, receiving mercy and refusing to pass it on.

The king names the hypocrisy directly, without softening it.

🔥 The king's tone shifts completely
⚖️ Wicked names a specific moral failure
🪞 He received mercy and withheld it
📖 The king names this without softening

## 🧾 I Forgave Thee All That Debt

The king restates exactly what he once cancelled.

This was not a partial reduction or a payment plan.

The entire impossible sum was wiped away completely.

The servant is being reminded of a mercy he has already forgotten.

🧾 The king restates what he cancelled
💯 It was the entire impossible sum
🙈 The servant had already forgotten this
📖 He is reminded of forgotten mercy

## 📜 Shouldest Not Thou Also Have Had Compassion On Thy Fellowservant

"Shouldest" is simply the old form of should.

The king is not asking a real question here.

He is naming an obligation the servant clearly ignored.

Receiving mercy was always meant to shape how he treated others.

📜 Shouldest is the old form of should
❓ This is not a real question
⚖️ It names an ignored obligation
📖 Mercy received should shape how we treat others

## 😠 His Lord Was Wroth

"Wroth" is an old word for deep, forceful anger.

It is stronger than simple irritation or disappointment.

This anger responds directly to the servant's refusal to show mercy.

God's patience is real, but it is not the same as approval.

😠 Wroth means deep, forceful anger
📈 It is stronger than irritation
🪞 It responds to the refusal to forgive
📖 Patience is not the same as approval

## ⛓️ Delivered Him To The Tormentors

"Tormentors" refers to jailers known for harsh treatment of prisoners.

This punishment is harsher than the one the servant first threatened.

The mercy the servant once received is now fully withdrawn.

What was given freely can also be taken away.

⛓️ Tormentors were especially harsh jailers
📈 This punishment is harsher than before
🔄 The earlier mercy is now withdrawn
📖 What was given freely can be withdrawn

## ❤️ If Ye From Your Hearts Forgive Not Every One His Brother

"From your hearts" rules out forgiveness that is only spoken out loud.

Jesus is not asking for polite words alone.

Resentment can still hide underneath words like that.

Genuine forgiveness changes how a person actually treats someone afterward.

The whole parable was never really about the debt itself.

It was about what forgiven people owe each other.

❤️ From your hearts rules out fake words
🗣️ Resentment hiding underneath is not forgiveness
🔄 Real forgiveness changes how we treat others
📖 Forgiven people owe mercy to others
`.trim();

export const MATTHEW_EIGHTEEN_PERSONAL_SECTIONS = parseMatthewEighteenRawNotes(MATTHEW_EIGHTEEN_RAW_NOTES);
