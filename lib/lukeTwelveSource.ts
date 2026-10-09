export type LukeTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwelveRawNotes(rawText: string): LukeTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 12:${startVerse}` : `Luke 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Luke 12 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWELVE_RAW_NOTES = `# Luke 12:1-3
# 🥖 Beware The Leaven Of Hypocrisy
---
## 👣 An Innumerable Multitude Of People

"Innumerable" means a crowd too large to count.

This crowd pressed in so tightly that people stepped on one another.

Jesus had just left a dinner where religious leaders plotted against him.

He turns from that private danger to teach a massive public crowd.

The next warning is aimed at everyone listening, not just his close followers.

👣 Innumerable means too large to count
🤼 People stepped on one another
🍽️ Jesus had just faced hostile leaders
📖 His warning now reaches the whole crowd

## 🍞 Beware Ye Of The Leaven Of The Pharisees

"Leaven" means yeast, a tiny ingredient that spreads through an entire batch of dough.

Jesus uses it here to picture how hypocrisy spreads through a whole community.

The Pharisees looked holy on the outside while hiding pride and cruelty underneath.

That hidden attitude was contagious, not harmless.

A little hypocrisy left unchecked quietly shapes everyone who tolerates it.

🍞 Leaven means yeast that spreads everywhere
🎭 Hypocrisy means hidden pride and cruelty
🦠 Hidden attitudes spread like leaven does
📖 Small hypocrisy quietly shapes a whole group

## 🔦 Nothing Covered, That Shall Not Be Revealed

Nothing hidden now will stay hidden forever.

Jesus has just warned about hypocrisy, a private attitude hiding behind a public mask.

This verse promises that every hidden motive eventually comes into the light.

That truth should comfort anyone being wronged in secret.

It should also warn anyone hiding something they have not dealt with.

🔦 Nothing hidden stays hidden forever
🎭 This follows the warning about hypocrisy
🤝 Comfort for anyone wronged in secret
📖 A warning for anyone hiding sin

## 🏠 Proclaimed Upon The Housetops

Houses in this culture had flat roofs people could stand on.

Neighbors used those rooftops to make public announcements to the whole town.

A "closet" here means a small private inner room, not a clothes closet.

Whatever was whispered privately in that room would one day be announced from a rooftop.

Private words were never going to stay private forever.

🏠 Housetops were flat public rooftops
🤫 Closets meant small private rooms
📢 Rooftops were used for announcements
📖 Private words would not stay private

# Luke 12:4-7
# 🐦 Of More Value Than Many Sparrows
---
## 👥 Be Not Afraid Of Them That Kill The Body

Jesus calls his listeners "my friends," a rare and personal title in his teaching.

He tells them not to fear anyone who can only harm the body.

A person's body is not the whole of who they are.

Human power to harm has a hard limit that stops at physical death.

Fear aimed at the wrong thing can control a person's whole life.

👥 Friends is a rare personal title here
🚫 Human power stops at physical death
🧍 The body is not all a person is
📖 Wrong fears can control a whole life

## 👆 Fear Him, Which After He Hath Killed Hath Power To Cast Into Hell

This "him" is God, not the people who might kill the body.

God alone holds power over a person's life after death.

Jesus repeats "fear him" twice in one breath to make the point impossible to miss.

This is not fear of punishment for its own sake.

It is a call to take God more seriously than any human threat.

👆 Him here means God, not people
⚖️ God alone controls life after death
🔁 Fear him is repeated for emphasis
📖 Take God more seriously than any threat

## 🪙 Five Sparrows Sold For Two Farthings

A "farthing" was a small copper coin, worth very little money.

Five sparrows for two farthings means these birds were cheap, almost worthless to sell.

Even so, God still takes notice when a single sparrow falls.

If God pays attention to something that cheap, he is not ignoring the people he loves.

🪙 Farthing means a small copper coin
🐦 Sparrows were cheap, nearly worthless birds
👀 God still notices one falling sparrow
📖 God is not ignoring the people he loves

## 🔢 The Very Hairs Of Your Head Are All Numbered

This is an old way of saying God's care reaches the smallest details of a person's life.

Nobody keeps an actual count of their own hairs.

God does, and the image is meant to feel almost absurdly thorough.

If God tracks something that small, nothing about a person is too small for him to notice.

🔢 Numbered means God tracks every detail
🙋 Nobody counts their own hairs
🧵 The image shows thorough, careful care
📖 Nothing about a person is too small

# Luke 12:8-12
# 🕊️ Confess Me Before Men
---
## 🗣️ Whosoever Shall Confess Me Before Men

To "confess" means openly claiming Jesus as Lord.

Doing this in public could bring real risk in this culture.

Jesus promises that this kind of public loyalty gets noticed in heaven.

The Son of man will confess that same person before God's angels.

Public faithfulness on earth is matched by public honor in heaven.

🗣️ Confess means openly claiming Jesus
⚠️ Public loyalty could bring real risk
👼 Jesus confesses that person to the angels
📖 Public faithfulness is met with public honor

## 😨 Denieth Me Before Men Shall Be Denied

This is not about one moment of fear or failure.

Peter himself later denies Jesus three times and is still forgiven.

This verse describes a settled, final refusal to ever claim Jesus at all.

The contrast with verse eight is deliberate, open loyalty against open denial.

😨 Not about one moment of fear
🔁 Peter's denial was later forgiven
🚫 This means a final, settled refusal
📖 Open loyalty contrasts with open denial

## 🤷 It Shall Be Forgiven Him

Speaking against Jesus during his earthly life could still be forgiven.

Many people misunderstood who he was before they saw the full picture.

Confusion about Jesus himself was not treated as the unforgivable line.

That grace covers honest doubt, not just quiet disagreement.

🤷 Confusion about Jesus could be forgiven
👁️ Many misunderstood him before seeing clearly
🙏 Honest doubt is covered by grace
📖 This is not yet the unforgivable line

## 🗣️ Blasphemeth Against The Holy Ghost

"Blasphemeth" means to speak with contempt against something sacred.

This sin is different from doubting Jesus or misunderstanding him.

It means a hardened, final rejection of the Holy Spirit's own witness to the truth.

That kind of rejection refuses forgiveness itself, so it cannot be forgiven.

🗣️ Blasphemeth means speaking with contempt
🙅 This differs from doubting Jesus
🛑 It rejects the Spirit's own witness
📖 Refusing forgiveness itself cannot be forgiven

## 🕍 Unto The Synagogues, And Unto Magistrates, And Powers

"Synagogues" were local Jewish places of worship and community gathering.

"Magistrates" were local civil officials with legal authority.

"Powers" refers to higher ranking government authorities.

Jesus names all three because his followers would face accusation in every level of society.

No single safe space would exist for the gospel to go unchallenged.

🕍 Synagogues were Jewish worship gatherings
⚖️ Magistrates were local civil officials
🏛️ Powers meant higher government authorities
📖 Accusation could come from any level

## 😰 The Holy Ghost Shall Teach You In The Same Hour

Facing trial before religious and civil courts was a frightening prospect.

Jesus promises his followers will not have to prepare a defense alone ahead of time.

The Holy Ghost would supply the right words in the exact moment they were needed.

This promise turns fear of the courtroom into confidence in God's presence there.

😰 Trial before courts was genuinely frightening
🕊️ The Holy Ghost supplies the words
⏱️ Help arrives in the exact moment
📖 God's presence replaces fear of courtrooms

# Luke 12:13-15
# ⚖️ Beware Of Covetousness
---
## 👨‍⚖️ Speak To My Brother, That He Divide The Inheritance With Me

Jewish teachers were commonly asked to settle family disputes like this one.

This man wants Jesus to use his authority to force his brother to split the family estate.

He is treating Jesus like a legal referee instead of a teacher of God's kingdom.

The request interrupts Jesus mid lesson, showing how easily greed can hijack a sacred moment.

👨‍⚖️ Teachers often settled family disputes
💰 He wants Jesus to force a split
🙏 Jesus is treated like a legal referee
📖 Greed interrupted a sacred teaching moment

## 🙅 Who Made Me A Judge Or A Divider Over You

Jesus refuses to take on this role.

His mission was never to settle property disputes between brothers.

By declining, he draws a clear line between his kingdom work and worldly legal matters.

The refusal itself becomes the lesson, pointing past the money to the heart behind the request.

🙅 Jesus declines this family dispute
🎯 His mission was not property law
🧭 He separates kingdom work from legal matters
📖 The refusal points past money to the heart

## 💸 Beware Of Covetousness

"Covetousness" means an unhealthy craving for more money or possessions than a person needs.

It rarely feels like greed to the person caught in it.

It usually feels like a reasonable claim to something owed.

Jesus warns against it right after watching it play out in front of him.

💸 Covetousness means craving more than needed
🙈 It rarely feels like greed inside
⚖️ It often feels like a fair claim
📖 Jesus warns right after seeing it happen

## 📦 A Man's Life Consisteth Not In The Abundance Of The Things Which He Possesseth

"Abundance" simply means a large amount.

"Possesseth" means owns.

This verse states plainly that a full life and a full bank account are not the same thing.

Jesus is about to tell a story that proves exactly this point.

The warning sets up the parable that follows.

📦 Abundance means a large amount
🏦 Possesseth means owns
❤️ A full life is not a full account
📖 A story is coming to prove this

# Luke 12:16-21
# 🌾 The Parable Of The Rich Fool
---
## 🌾 The Ground Of A Certain Rich Man Brought Forth Plentifully

This parable begins with a genuine blessing, not a crime.

The man's land produced more than anyone expected.

Nothing about his wealth so far came from cheating or theft.

The story is not a warning against being rich.

It is a warning about what a rich man does next with his heart.

🌾 The harvest was a real blessing
🚫 Nothing here involves cheating or theft
💰 The story does not condemn wealth
📖 It warns about the heart behind wealth

## 🏗️ I Will Pull Down My Barns, And Build Greater

"Barns" were storage buildings used to hold grain and goods.

The man's problem is a good one, too much blessing to store.

His solution is to expand his storage instead of considering anyone else.

Notice how often he says "my" in this short planning speech.

Every solution he imagines keeps the harvest entirely to himself.

🏗️ Barns were buildings used for storage
📈 His problem is too much blessing
🙋 He says my again and again
📖 Every plan keeps the harvest to himself

## 🗣️ Soul, Thou Hast Much Goods Laid Up For Many Years

This does not mean the man is simply being thrifty or wise.

He is talking to his own soul as if goods could satisfy it.

A soul is not the kind of thing stored grain can feed.

He has confused having enough for years with being secure forever.

🗣️ He speaks to his own soul
🌾 Goods cannot actually feed a soul
📆 Years of supply is not forever
📖 He confused comfort with real security

## 🛋️ Take Thine Ease, Eat, Drink, And Be Merry

This is the life he planned for himself, rest and comfort with no more work.

Nowhere in this plan does he mention God, his family, or anyone in need.

His whole future is built around his own comfort alone.

That plan is about to be interrupted that very night.

🛋️ He planned a life of ease
🙈 God is absent from his plan
🙋 His comfort is the only goal
📖 That plan ends that very night

## 📋 Thou Fool, This Night Thy Soul Shall Be Required Of Thee

"Required" here means demanded back, the way a loan gets called in.

The man's life was never fully his own to plan around.

He assumed he had many years ahead to enjoy his wealth.

Instead his life ends on the very night he felt most secure.

📋 Required means demanded back like a loan
⏳ He assumed he had many years left
💀 His life ends that same night
📖 Security felt is not security guaranteed

## 💰 Not Rich Toward God

The man died rich by every human measure.

By God's measure, he died with nothing stored up at all.

Being "rich toward God" means investing in what actually outlasts a lifetime.

This parable answers the warning back in verse fifteen about covetousness.

A full barn and a full life are not the same thing.

💰 Rich by human measure alone
🙌 Rich toward God means lasting investment
🌾 His barns outlasted his own life
📖 A full barn is not a full life

# Luke 12:22-26
# 🐦‍⬛ Consider The Ravens
---
## 🙅 Take No Thought For Your Life, What Ye Shall Eat

This is not a command to be careless or stop planning entirely.

"Take no thought" here means do not let anxious worry run your life.

Jesus just finished a story about a man who worried about nothing but supply.

Now he turns to the opposite danger, worrying that supply will never come.

🙅 Not a command to be careless
😟 Take no thought means do not fret
🔄 This answers the rich fool's opposite fear
📖 Jesus addresses anxious worry directly

## 🍲 The Life Is More Than Meat, And The Body Is More Than Raiment

"Meat" here means food in general, not just animal flesh.

"Raiment" means clothing.

A person's worth was never meant to be measured by food and clothing alone.

If life itself is a gift, the God who gave it can be trusted to sustain it.

🍲 Meat here means food in general
👕 Raiment means clothing
❤️ Worth is not measured by supply
📖 The giver of life sustains it

## 🐦‍⬛ Consider The Ravens

Ravens were considered unclean birds under Jewish law, not valued or kept by anyone.

They do not farm, store crops, or plan ahead the way people do.

God still feeds them without any effort on their part.

If God provides for a bird nobody values, he will provide for the people he loves.

🐦‍⬛ Ravens were considered unclean birds
🚫 They do not farm or store food
🍽️ God still feeds them anyway
📖 God values people far above birds

## 📏 Add To His Stature One Cubit

A "cubit" was an ancient unit of length, about the distance from an elbow to a fingertip.

No amount of worry has ever added even that much to a person's height.

Jesus uses this small, impossible example to show how useless anxious worry actually is.

Worry feels productive, but it changes nothing about the outcome.

📏 A cubit measured elbow to fingertip
🚫 Worry cannot add even that much
🪞 The example shows worry achieves nothing
📖 Worry feels productive but changes nothing

## 🚫 Not Able To Do That Thing Which Is Least

If worry cannot even add a few inches to someone's height, it is the smallest possible task.

Food and clothing are much bigger concerns than height.

If the small task is already impossible through worry, the bigger one will not work either.

This closes the argument Jesus has been building since verse twenty two.

📏 Height is the smallest possible task
🍲 Food and clothing are bigger concerns
🚫 Worry fails at the small task too
📖 This closes Jesus's whole argument here

# Luke 12:27-31
# 🌷 Consider The Lilies
---
## 🌷 Consider The Lilies How They Grow

Lilies do no work at all, no spinning thread and no weaving cloth.

They simply grow where they are planted.

Their color and shape come entirely from how God made them, not from any effort of their own.

Jesus points to something this ordinary to make an extraordinary point about worry.

🌷 Lilies do no work at all
🎨 Their beauty comes from God alone
🌱 They simply grow where planted
📖 An ordinary flower makes an extraordinary point

## 👑 Solomon In All His Glory Was Not Arrayed Like One Of These

Solomon was Israel's richest king, famous across the ancient world for his wealth and fine clothing.

Even his best robes could not match the simple beauty of a wildflower.

Human effort at its most impressive still falls short of what God makes without effort.

That comparison should humble anyone chasing security through wealth alone.

👑 Solomon was Israel's richest, finest dressed king
🌷 A flower still outshines his robes
💪 Human effort falls short of God's work
📖 Wealth alone cannot buy this kind of beauty

## 🔥 To Day In The Field, And To Morrow Is Cast Into The Oven

Dried grass and wildflowers were commonly gathered and burned as fuel for ovens.

This flower's entire life lasts only a single day before it becomes fuel.

God still dresses it beautifully for that one short day.

People last far longer than a single day of grass.

God's care for something so temporary says even more about his care for people.

🔥 Dried grass was burned as fuel
🌼 This flower's life lasts only a day
👗 God dresses it beautifully anyway
📖 God's care for people outlasts this flower

## 🌀 Neither Be Ye Of Doubtful Mind

A "doubtful mind" means a mind that keeps wavering back and forth in anxious uncertainty.

This is not the same as having real questions or honest doubt.

It describes a restless worry that never settles, always circling the same fear.

Jesus addresses that restless cycle directly, not just the worry's content.

🌀 Doubtful mind means constant anxious wavering
❓ Different from honest questions or doubt
🔄 It circles the same fear endlessly
📖 Jesus addresses the restless cycle itself

## 🌍 Your Father Knoweth That Ye Have Need Of These Things

"Nations of the world" means people who do not yet know God as Father.

Their worry comes from believing provision depends entirely on their own effort.

Jesus points his listeners to a Father who already knows what they need before they ask.

That knowledge changes worry into trust.

🌍 Nations here means people without God as Father
😟 Their worry assumes provision depends on effort
👁️ The Father already knows every need
📖 Knowledge like that turns worry into trust

## 🔑 Seek Ye The Kingdom Of God

This is the alternative Jesus offers to anxious worry.

Instead of chasing food and clothing first, his followers are told to chase God's kingdom first.

The promise is not that worry disappears automatically.

It is that daily needs get added in while the bigger pursuit takes priority.

🔑 This is the alternative to worry
👑 Seek God's kingdom before anything else
➕ Daily needs get added along the way
📖 Priority changes everything about daily life

# Luke 12:32-34
# 💰 Where Your Treasure Is
---
## 🐑 Fear Not, Little Flock

"Little flock" is a warm, personal title for Jesus's small group of followers.

A flock depends completely on its shepherd for safety and direction.

Calling them little admits they were genuinely small and vulnerable in the world around them.

Jesus pairs that honesty with a command not to be afraid.

🐑 Little flock names Jesus's small followers
🧑‍🌾 A flock depends fully on its shepherd
🤏 Little admits they were genuinely small
📖 Honesty about weakness meets a call to courage

## 🤲 Sell That Ye Have, And Give Alms

"Alms" means money or goods given directly to help the poor.

This is a direct, practical command, not just a feeling of generosity.

Jesus connects letting go of earthly security with trusting the kingdom he just promised them.

Generosity becomes proof that the fear from verse thirty two has actually been dealt with.

🤲 Alms means giving directly to the poor
📋 This is a practical command, not a feeling
🔗 Generosity is tied to trusting the kingdom
📖 Giving proves fear has been dealt with

## 📈 Bags Which Wax Not Old

"Wax" here means to grow or become.

A bag that does not wax old is one that never wears out.

Earthly purses eventually rot, get stolen, or simply wear through.

Jesus describes a kind of treasure that none of those threats can touch.

📈 Wax means grow or become
👜 A bag that never wears out
🕳️ Earthly purses rot or get stolen
📖 Heavenly treasure escapes every threat

## 🧭 Where Your Treasure Is, There Will Your Heart Be Also

This sentence sums up everything said since the rich fool's parable.

A person's heart naturally follows whatever they treat as most valuable.

Choosing where to invest is really choosing where the heart will live.

This line closes the entire teaching on worry and wealth that began back in verse thirteen.

🧭 This sums up the whole teaching
❤️ The heart follows what it treasures
💰 Choosing investment chooses the heart's home
📖 This closes the teaching on worry

# Luke 12:35-40
# 🕯️ Let Your Loins Be Girded
---
## 👘 Let Your Loins Be Girded About, And Your Lights Burning

Men in this culture wore long, loose robes for daily life.

"Girding the loins" meant tucking that robe up into a belt to move quickly and work freely.

Keeping a lamp burning meant staying ready through the night, not just the day.

Both pictures describe the same idea, staying alert and prepared at all times.

👘 Loose robes were tucked up to move freely
🏃 Girded loins meant ready to act quickly
🕯️ A burning lamp meant staying ready at night
📖 Both pictures describe constant readiness

## 💍 Wait For Their Lord, When He Will Return From The Wedding

Wedding celebrations in this culture often ran very late into the night.

A master attending one could return home at almost any hour.

His servants were expected to stay awake and ready for his knock, however late it came.

Jesus compares his own return to that same unpredictable homecoming.

💍 Weddings often ran late into the night
🚪 A master could return at any hour
👂 Servants waited ready for his knock
📖 Jesus compares his return to this homecoming

## 👀 Blessed Are Those Servants, Whom The Lord Shall Find Watching

This blessing belongs to the servants who are still alert whenever the master actually arrives.

It does not reward servants who guess the right hour correctly.

It rewards servants who simply stayed ready the entire time.

Readiness, not prediction, is what earns this blessing.

👀 Blessing goes to servants found watching
🎯 Not about guessing the right hour
⏳ It rewards staying ready the whole time
📖 Readiness earns the blessing, not prediction

## 🔄 He Shall Gird Himself, And Make Them To Sit Down To Meat

Normally the servants would be the ones serving the master's meal.

Here the master ties on an apron and serves them instead.

This small detail pictures Jesus honoring faithful servants in a way nobody would expect.

The roles of master and servant get reversed as the reward itself.

🔄 Normally servants serve, not the master
🧑‍🍳 Here the master serves the meal himself
🎁 This reversal is itself the reward
📖 Jesus honors faithful servants unexpectedly

## 🌙 Come In The Second Watch, Or Come In The Third Watch

The night was divided into set periods called "watches" for keeping guard.

The second and third watches covered the middle of the night, the hours people sleep hardest.

Jesus specifically names the hardest hours to stay awake.

Faithfulness that holds up in those hours is the kind that counts most.

🌙 Watches were set periods of the night
😴 Second and third watch were the hardest hours
💪 Jesus names the hardest hours on purpose
📖 Faithfulness in hard hours counts most

## 🏠 If The Goodman Of The House Had Known What Hour The Thief Would Come

"Goodman" simply means the head of the household.

No homeowner would leave their house unguarded if they knew exactly when a thief was coming.

The comparison is not flattering to the thief, it is a picture of complete unpredictability.

Jesus uses that same unpredictability to describe his own return.

🏠 Goodman means the head of the house
🔓 Nobody leaves a house unguarded knowingly
❓ The thief pictures total unpredictability
📖 Jesus describes his return the same way

## ⏰ The Son Of Man Cometh At An Hour When Ye Think Not

This is the direct point behind every picture in this section.

Nobody gets a warning before the moment actually arrives.

The call is not to guess the date but to live ready every single day.

Readiness was always the real point, not prediction.

⏰ The direct point behind every picture here
🚫 No warning arrives before the moment
📅 Live ready every day, not guessing dates
📖 Readiness was always the real point

# Luke 12:41-48
# 📏 The Faithful And Wise Steward
---
## 🙋 Speakest Thou This Parable Unto Us, Or Even To All

Peter wants to know if this warning about readiness applies only to the twelve apostles.

He may be hoping for a more exclusive answer than the one he gets.

Jesus does not give Peter a simple yes or no.

Instead he answers with another parable that applies the lesson even more broadly.

🙋 Peter asks who this warning applies to
🎯 He may want an exclusive answer
🚫 Jesus does not give a simple answer
📖 A wider parable follows instead

## 🏠 That Faithful And Wise Steward

A "steward" managed a master's household and property while the master was away.

This role required real trust, since the steward controlled things that belonged to someone else.

"Faithful" describes someone trustworthy with what is not their own.

"Wise" describes someone who manages that trust well, not just honestly.

🏠 Steward means manager of a household
🤝 Real trust over someone else's property
✅ Faithful means trustworthy with what is not theirs
📖 Wise means managing that trust well

## 🍽️ To Give Them Their Portion Of Meat In Due Season

"Portion of meat" here means the household's regular food allowance, not a special treat.

"In due season" means at the right time, not early or late.

A good steward keeps the household fed on a reliable schedule.

This pictures faithful, ongoing care, not one dramatic act of service.

🍽️ Portion of meat means the food allowance
⏰ Due season means the right time
📋 A good steward keeps a reliable schedule
📖 Faithfulness looks like ongoing care

## ✅ Blessed Is That Servant, Whom His Lord Shall Find So Doing

This blessing belongs to the steward who is still doing his job well when the master arrives.

"So doing" means caught in the act of faithful, ordinary service, not some dramatic rescue.

The reward is not for one great moment but for consistent daily faithfulness.

This mirrors the blessing already given to watching servants earlier in the chapter.

✅ Blessing goes to a servant still working
📋 So doing means faithful daily service
🎖️ The reward is for consistency, not drama
📖 This echoes the earlier watching servants

## 📈 He Will Make Him Ruler Over All That He Hath

The reward for faithfulness here is more responsibility, not retirement.

A steward trusted with a household is now trusted with everything the master owns.

Faithfulness in small daily duties becomes the doorway to much larger responsibility.

This sets up the sharp contrast with the unfaithful steward described next.

📈 Faithfulness is rewarded with more responsibility
🏠 Trusted with a household, now trusted with all
🚪 Small faithfulness opens the door to more
📖 This sets up the coming contrast

## ⏳ My Lord Delayeth His Coming

This thought alone is not sinful, since nobody knows the exact hour anyway.

The danger is what the servant decides to do because of that thought.

He uses the delay as an excuse to abuse the very people he was trusted to care for.

A delay becomes dangerous the moment it becomes a justification for cruelty.

⏳ The thought itself is not the sin
⚠️ The danger is what he does next
😡 He uses delay to justify cruelty
📖 Delay becomes dangerous as a justification

## ⚔️ Will Cut Him In Sunder

"Cut in sunder" is a vivid phrase for a severe, decisive punishment.

It is not meant to be taken as a literal instruction on execution methods.

It communicates the seriousness of betraying a position of trust.

Jesus uses shocking language on purpose so the warning cannot be softened or ignored.

⚔️ Cut in sunder pictures severe punishment
🚫 Not a literal execution instruction
🔑 It shows how serious betraying trust is
📖 Shocking language keeps the warning sharp

## 🎭 His Portion With The Unbelievers

This unfaithful steward claimed to serve the master the whole time.

His actions in the master's absence revealed what he actually believed.

Being grouped "with the unbelievers" means his true loyalty is finally exposed.

Behavior in private eventually reveals belief that words alone could hide.

🎭 He claimed loyalty the whole time
🔍 His actions revealed his real belief
👥 Grouped with unbelievers means exposed loyalty
📖 Private behavior eventually reveals belief

## 🩹 Shall Be Beaten With Many Stripes

"Stripes" means lash marks from a beating, a common ancient punishment.

This servant knew exactly what his master expected of him.

Knowing the standard and still ignoring it carries a heavier consequence than simple ignorance.

Clear knowledge raises the weight of responsibility.

🩹 Stripes means lash marks from punishment
📖 He knew exactly what was expected
⚖️ Clear knowledge raises real responsibility
➡️ Ignoring a known standard carries more weight

## 🤷 Shall Be Beaten With Few Stripes

Ignorance does not erase all responsibility.

A person who truly did not know still faces real consequences for genuine wrongdoing.

The punishment is lighter, not absent, because less was known and expected.

This contrast makes the earlier warning about clear knowledge even sharper.

🤷 Ignorance does not erase responsibility
⚖️ Real wrongdoing still brings real consequence
📉 Lighter punishment fits lesser knowledge
📖 This sharpens the earlier warning about knowledge

## ⚖️ To Whomsoever Much Is Given, Of Him Shall Be Much Required

This is the summarizing principle behind the entire parable.

Greater knowledge, greater resources, or greater position all raise the standard of accountability.

This is not a punishment for being blessed.

It is a reminder that blessing always comes paired with responsibility.

The next section shows exactly how seriously Jesus takes that responsibility.

⚖️ The summarizing principle of this parable
📈 More given means more required
🚫 Not a punishment for being blessed
📖 Blessing always comes with responsibility

# Luke 12:49-53
# 🔥 Not Peace, But Division
---
## 🔥 I Am Come To Send Fire On The Earth

This fire does not describe random destruction.

Fire in scripture often pictures testing, purifying, or judgment rather than simple ruin.

Jesus is describing the pressure his coming would put on every person and every loyalty.

That pressure would force a decision that could no longer be avoided.

🔥 Not a picture of random destruction
🧪 Fire often pictures testing or judgment
⚖️ His coming forces a real decision
📖 That decision could not be avoided

## 💧 I Have A Baptism To Be Baptized With

This "baptism" is not the water baptism Jesus received from John earlier.

It pictures his coming suffering and death, a trial he had to pass through fully.

"Straitened" means under intense pressure, like being squeezed from every side.

Jesus feels the weight of that coming trial even as he teaches.

💧 Not the same as his water baptism
⚰️ It pictures his coming suffering and death
🤐 Straitened means intense pressure from every side
📖 Jesus already feels that coming weight

## 🕊️ Suppose Ye That I Am Come To Give Peace On Earth

Many expected the Messiah to bring immediate, comfortable peace for everyone.

Jesus corrects that expectation directly and plainly.

His arrival forces a choice, and choices always create division among people who disagree.

Peace with God does not always mean peace with everyone around you.

🕊️ Many expected immediate, comfortable peace
🚫 Jesus corrects that expectation directly
⚔️ His arrival forces a dividing choice
📖 Peace with God is not peace with everyone

## 🏠 Five In One House Divided, Three Against Two

This describes a single household splitting over belief in Jesus.

Family loyalty was one of the strongest bonds in this culture.

Following Jesus could cost a person that very bond.

The specific numbers make the division feel real and personal, not abstract.

🏠 One household splits over belief
👪 Family loyalty was a powerful bond
💔 Following Jesus could cost that bond
📖 Specific numbers make division feel personal

## 📜 The Mother In Law Against Her Daughter In Law

This exact pairing of family members echoes an old prophecy from the book of Micah.

Jesus is showing that this painful division was foreseen long before he arrived.

It was not a surprising side effect of his ministry.

It was always part of what following him would cost some families.

📜 This echoes an old prophecy from Micah
🔮 The division was foreseen long before
🚫 Not a surprising side effect
📖 This cost was always part of the call

# Luke 12:54-59
# 🌥️ Discern This Time
---
## 🧭 When Ye See A Cloud Rise Out Of The West

West of Israel lies the Mediterranean Sea.

A cloud rising from that direction reliably brought rain.

People in this region had learned to read that pattern without needing to think twice.

Jesus starts with something his audience already understood perfectly well.

🧭 West of Israel lies the Mediterranean Sea
🌧️ Clouds from the west reliably brought rain
👀 People read this pattern easily
📖 Jesus starts with familiar ground

## 🔥 When Ye See The South Wind Blow

South of Israel lies a dry desert region.

Wind blowing from that direction reliably brought heat, not rain.

Farmers and travelers relied on these simple weather signs every single day.

Jesus is building toward a comparison, not teaching a weather lesson for its own sake.

🧭 South of Israel lies dry desert
🔥 South winds reliably brought heat
🌾 Farmers relied on these signs daily
📖 A bigger comparison is coming next

## 🔍 Ye Can Discern The Face Of The Sky And Of The Earth

"Discern" means to read and correctly understand what is really happening.

The crowd could read weather signs with real skill and confidence.

Jesus names that skill honestly before making his sharper point.

The very next line turns that same skill into a pointed accusation.

🔍 Discern means to read correctly
🌤️ The crowd read weather with real skill
👍 Jesus names that skill honestly
📖 A sharper point follows right after

## 🙈 How Is It That Ye Do Not Discern This Time

These same people who read clouds and wind could not read what was happening right in front of them.

Jesus himself, his miracles, and his teaching were the clearest sign of all.

Skill at reading nature did not carry over into recognizing God at work.

Jesus calls that gap hypocrisy, not simple confusion.

🌤️ They could read clouds and wind
🙈 They missed what stood right before them
✨ Jesus himself was the clearest sign
📖 Jesus calls this gap hypocrisy

## 🔄 Why Even Of Yourselves Judge Ye Not What Is Right

Jesus turns from outward observation to inward responsibility.

Reading the weather only requires watching, not deciding anything.

Judging what is right requires an actual choice.

This question sets up the practical example that follows about settling a debt.

🔄 Jesus turns from watching to deciding
🌤️ Weather reading only requires watching
⚖️ Right judgment requires an actual choice
📖 This sets up the next example

## ⏱️ Give Diligence That Thou Mayest Be Delivered From Him

"Diligence" means careful, urgent effort.

"Adversary" here means the other party in a legal dispute, like someone you owe money to.

Jesus pictures someone on the way to court who still has a chance to settle quietly.

Acting quickly, before reaching the judge, was the wiser path.

⏱️ Diligence means careful, urgent effort
⚖️ Adversary means the other party owed
🚶 He is still on the way to court
📖 Settling early was the wiser path

## 🧷 Lest He Hale Thee To The Judge

"Hale" is an old word meaning to drag or forcibly pull someone along.

Once a case reaches the judge, the outcome is no longer in the debtor's hands.

From there a judge, an officer, and a prison cell follow in that order.

Jesus pictures the exact chain of consequence that follows a missed chance to settle.

🧷 Hale means to drag or pull forcibly
⚖️ Control is lost once a judge is involved
🔗 Judge, officer, and prison follow in order
📖 This pictures the cost of a missed chance

## 🪙 Till Thou Hast Paid The Very Last Mite

A "mite" was the smallest coin in common use, worth almost nothing on its own.

Paying down to the very last mite meant the entire debt, with nothing forgiven or overlooked.

Jesus has moved from reading clouds to reading the state of a person's own soul before God.

Settling accounts with God is the real debt behind this whole parable.

🪙 A mite was the smallest coin
💯 Every last mite meant the whole debt
🙏 This points to accounts settled with God
📖 That debt is the real point here
`.trim();

export const LUKE_TWELVE_PERSONAL_SECTIONS = parseLukeTwelveRawNotes(LUKE_TWELVE_RAW_NOTES);
