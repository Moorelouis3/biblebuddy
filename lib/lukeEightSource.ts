export type LukeEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeEightRawNotes(rawText: string): LukeEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 8:${startVerse}` : `Luke 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Luke 8 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_EIGHT_RAW_NOTES = `# Luke 8:1-3
# 👣 The Women Who Followed Him
---
## Throughout Every City And Village

Jesus did not settle down with one crowd for long.

He moved from town to town, preaching as he went.

The twelve disciples traveled with him on this circuit.

Luke now reveals who else was quietly supporting the journey.

🚶 Jesus kept moving city to village
🗣️ He preached the kingdom everywhere he went
👥 The twelve traveled with him
📖 Luke now names who supported the mission

## Mary Called Magdalene, Out Of Whom Went Seven Devils

Mary Magdalene was named for her hometown, Magdala.

Magdala was a fishing town on the Sea of Galilee.

Seven devils means many evil spirits had controlled her before.

Jesus freed her, and she now followed him as a committed disciple.

🏘️ Magdala was her home fishing town
👹 Seven devils means many evil spirits
🙌 Jesus freed her completely
📖 She followed him as a changed woman

## Which Ministered Unto Him Of Their Substance

Joanna was married to Chuza, a steward in Herod's own court.

A steward managed Herod's household money and property.

Susanna and other women are named only here in the whole Bible.

These women used their own money to support Jesus and the twelve.

👑 Joanna's husband worked inside Herod's court
💼 A steward managed royal household money
📜 Susanna appears only in this verse
📖 Their wealth quietly funded Jesus's ministry

# Luke 8:4-8
# 🌱 The Parable Of The Sower
---
## He Spake By A Parable

A parable is a short, everyday story that carries a deeper spiritual meaning.

Jesus used this method with the crowd instead of a direct explanation.

Farming was familiar to nearly everyone listening that day.

He builds the whole lesson on a picture they already understood.

📝 A parable teaches through an everyday story
🌾 Jesus picked a farming scene
👥 The crowd already knew this world
📖 He taught through a familiar picture

## Some Fell By The Way Side

The way side was the hard packed path alongside a farmer's field.

Seed landed there because sowing was done by hand, scattered widely.

Packed soil could not let the seed sink in at all.

Birds found it before it ever had a chance to grow.

🛣️ The way side was a packed path
🌾 Hand sowing scattered seed widely
🚫 Packed ground could not absorb it
📖 Birds took it before it could grow

## Fell Upon A Rock

This rock was a layer of bedrock hidden under a thin layer of soil.

The seed could sprout quickly because the shallow soil warmed fast.

It had no room underneath to grow a deep root system.

Without deep roots, the sun alone was enough to kill it.

🪨 Bedrock sat just under thin soil
🌱 Shallow soil let it sprout fast
🌞 No deep roots formed underneath
📖 The same sun that helped it killed it

## Fell Among Thorns

Thorn roots were already alive in the soil before the seed landed.

Both plants grew up together at the same time.

The thorns grew faster and choked the smaller plant.

This seed never got a real chance to produce anything.

🌵 Thorn roots were already in the soil
🌱 Both plants grew up together
💪 Thorns choked the smaller plant
📖 This seed never got a chance

## Bare Fruit An Hundredfold

Good ground let the seed sink in deep with nothing to block it.

An hundredfold means the harvest multiplied one hundred times over.

A normal good harvest in that world was closer to ten times the seed.

This result was far beyond anything a farmer would expect.

🌾 Good ground let roots go deep
💯 Hundredfold means a hundred times the harvest
📊 Normal yields were far smaller
📖 This harvest was beyond expectation

## He That Hath Ears To Hear, Let Him Hear

Everyone in the crowd physically had working ears.

Jesus means something deeper, a willingness to actually listen and respond.

This line is a challenge, not a simple statement of fact.

He is inviting the crowd to ask what the story really means.

👂 Everyone there could physically hear
🤔 Jesus means a willingness to respond
❗ This line is a challenge
📖 He invites them to seek the meaning

# Luke 8:9-15
# 🌾 What The Parable Means
---
## What Might This Parable Be

The disciples did not understand the story any better than the crowd did.

They waited until they were alone with Jesus to ask him directly.

Their question shows real humility about what they did not yet know.

Jesus only explains the parable after someone actually asks.

🤷 The disciples were also confused
🙋 They asked him privately
🙏 Their question showed humility
📖 Jesus explained it once asked

## Unto You It Is Given To Know The Mysteries

A mystery here means a truth that stays hidden until God chooses to reveal it.

The disciples were given direct access to that hidden meaning.

This was a gift, not something they earned through cleverness.

Not everyone listening that day received the same explanation.

🔐 Mystery means a truth kept hidden
🎁 This understanding was a gift
🙇 They did not earn it
📖 Not everyone received the same explanation

## That Seeing They Might Not See, And Hearing They Might Not Understand

Jesus is quoting words the prophet Isaiah once spoke to Israel.

Some people in the crowd saw and heard the same parable as the disciples.

Their own closed hearts kept them from grasping what it meant.

The parable reveals truth to some and conceals it from others at the same time.

📜 Jesus echoes the prophet Isaiah
👥 Some heard the very same words
🔒 Closed hearts blocked understanding
📖 One story can reveal and conceal

## The Seed Is The Word Of God

Jesus now explains the parable piece by piece, starting with the seed itself.

The seed stands for God's word being spoken or taught.

Every detail that follows explains what happens to that word in different people.

The soil, not the seed, is what makes the real difference.

🌾 The seed represents God's word
🗣️ It gets spoken into different lives
🧭 Jesus explains each piece in turn
📖 The soil decides the outcome

## Then Cometh The Devil, And Taketh Away The Word

The way side people hear the word, but it never gets a chance to settle.

The devil moves in immediately, before real belief can take root.

Taketh away means the message is pulled out of their hearts entirely.

This is the fastest and easiest way to lose the word completely.

👂 They heard the word briefly
😈 The devil moved in fast
🧹 The message gets pulled out
📖 Quick loss is still real loss

## These Have No Root

This group receives the word with real, immediate joy at first.

Having no root means their faith never grows down deep enough to last.

Temptation here means pressure, hardship, or difficulty that tests their commitment.

Their joy fades the moment real difficulty actually arrives.

😊 They start out joyful
🌱 No root means shallow faith
⚡ Temptation means real pressure
📖 Joy faded once hardship came

## Choked With Cares And Riches And Pleasures Of This Life

This soil pictures people who hear the word but stay distracted by life.

Cares means the ordinary worries that quietly compete for attention.

Riches means the pull of money and comfort.

Pleasures means the ordinary enjoyments that crowd out anything deeper.

😟 Cares means ordinary daily worries
💰 Riches means chasing money and comfort
🎭 Pleasures means ordinary distractions
📖 None looked dangerous, but together they choked growth

## An Honest And Good Heart

This final soil represents people who actually let the word take hold inside them.

Honest here means sincere, without pretending or hiding from the truth.

Keep means they hold onto the word instead of letting it slip away.

Patience is what turns a single moment of hearing into a lasting harvest.

❤️ An honest heart receives sincerely
🤲 They keep the word, not just hear it
⏳ Patience carries it to harvest
📖 Lasting fruit takes time to grow

# Luke 8:16-18
# 🕯️ Take Heed How Ye Hear
---
## Setteth It On A Candlestick

A candlestick in that world was a simple stand that lifted a lamp up high.

No one lit a lamp just to immediately hide it under a container or a bed.

The whole purpose of light is for it to be seen by others.

Jesus ties this picture directly to the truth he is teaching.

🕯️ A candlestick lifted the lamp up
🚫 No one hid a lit lamp
💡 Light exists to be seen
📖 Jesus connects this to his teaching

## Nothing Is Secret, That Shall Not Be Made Manifest

Manifest means brought out into the open where everyone can see it clearly.

Jesus says every hidden thing will eventually come to light.

This includes both the truth he is teaching and the state of each listener's heart.

Nothing stays hidden from God forever, no matter how well it is covered.

👁️ Manifest means brought into full view
🔍 Hidden things eventually surface
❤️ This includes the state of hearts
📖 Nothing stays hidden from God

## Take Heed Therefore How Ye Hear

Take heed means pay careful, deliberate attention, not a casual glance.

How ye hear matters just as much as whether someone hears at all.

This connects straight back to the four kinds of soil in the parable.

Jesus is asking each listener to examine their own heart honestly.

👂 Take heed means pay careful attention
🌱 How you hear matters, not just if
🔗 This echoes the soils in the parable
📖 Jesus asks for honest self examination

## Whosoever Hath, To Him Shall Be Given

This sounds backward, since it seems to reward people who already have plenty.

Hath here means someone who actually received and valued the word.

That person's understanding keeps growing because they put it to use.

Someone who ignored the word loses even what little they seemed to have.

🤔 This sounds backward at first
🌱 Hath means truly valuing the word
📈 Use of it leads to more
📖 Neglect leads to real loss

# Luke 8:19-21
# 👪 Who Is My Family
---
## Could Not Come At Him For The Press

The press means the crowd was packed in too tightly to move through.

Jesus's mother and brothers physically could not reach him in person.

This detail shows just how large and dense the crowd had become.

Even his own family had to wait on the outside.

👥 The press means a packed crowd
🚶 His family could not get through
📏 It shows how large the crowd was
📖 Even family waited outside

## Thy Brethren Stand Without, Desiring To See Thee

Without here means standing outside, not refusing to come in.

Someone had to pass this message to Jesus through the crowd itself.

His family wanted to see him, but the moment did not pause for them.

Jesus answers by making a larger point to everyone listening.

🚪 Without means standing outside
📣 Someone relayed the message inward
👀 They simply wanted to see him
📖 Jesus used the moment to teach

## Which Hear The Word Of God, And Do It

Jesus is not rejecting his actual mother and brothers here.

He is widening the definition of family to anyone who truly obeys God's word.

Hearing alone is not enough without action to match it.

Spiritual family, in this picture, is built by obedience, not blood alone.

❤️ He is not rejecting his family
🌍 He widens who counts as family
✅ Hearing must lead to doing
📖 Obedience builds this family, not blood

# Luke 8:22-25
# 🌊 Master, We Perish
---
## Let Us Go Over Unto The Other Side Of The Lake

The lake was the Sea of Galilee, which could turn dangerous without warning.

Jesus proposes this crossing himself, not the disciples.

Sudden storms were common because of the hills surrounding the water.

The calm start of this trip makes the coming danger even more sudden.

🌊 The lake was the Sea of Galilee
🧭 Jesus chose this crossing himself
🏔️ Hills around it caused sudden storms
📖 Calm beginnings can turn fast

## There Came Down A Storm Of Wind On The Lake

Several of the disciples were experienced fishermen on this very lake.

Their fear shows just how violent and sudden this storm really was.

Filled with water means the boat was close to actually sinking.

Jeopardy means they believed their lives were genuinely in danger.

🎣 Several disciples were seasoned fishermen
😨 Their fear shows how violent it was
🚤 The boat was taking on water
📖 Jeopardy means real danger of death

## He Rebuked The Wind And The Raging Of The Water

Jesus had been fully asleep through the start of the storm.

Rebuked means he spoke to the storm the way he would speak to a person.

The storm did not fade slowly.

It stopped immediately at his word.

😴 Jesus had been fully asleep
🗣️ He spoke to the storm directly
⚡ It stopped immediately, not slowly
📖 Only God holds this authority

## What Manner Of Man Is This

The disciples feared the storm, but now they fear something greater.

This new fear comes from witnessing power no ordinary man could have.

Even the wind and water obeyed him without hesitation.

Their question lingers without a full answer, waiting for the rest of the story.

😟 Their fear shifted to something greater
🌬️ Even wind and water obeyed him
❓ Their question has no answer yet
📖 The rest of the story will answer it

# Luke 8:26-33
# ⛓️ Legion
---
## The Country Of The Gadarenes

This region sat on the eastern shore, across the lake from Galilee.

It was largely Gentile territory, not strictly Jewish land.

That detail explains why a herd of pigs even existed there.

Jewish law treated pigs as unclean animals.

🗺️ Gadarenes sat on the eastern shore
🌍 It was mostly Gentile territory
🐷 That explains the herd of pigs
📖 Jewish law treated pigs as unclean

## Ware No Clothes, Neither Abode In Any House

Ware is an old way of saying wore, as in wearing clothing.

Going without clothes in public showed how far this man had fallen.

He lived among the tombs instead of inside the town with other people.

Tombs in that region were caves cut into rock outside the city.

👕 Ware is an old word for wore
🚫 He wore no clothing at all
🏚️ He lived outside normal society
📖 Tombs were caves cut into rock

## Thou Son Of God Most High

The demon inside this man recognizes Jesus immediately, before anyone introduces him.

Son of God most high was a title acknowledging real divine authority.

I beseech thee means begging, not a polite or casual request.

Torment me not reveals the demon already expects to be defeated.

👹 The demon recognized Jesus at once
👑 This title acknowledged divine authority
🙏 Beseech means desperate begging
📖 The demon already expected defeat

## Kept Bound With Chains And In Fetters

Fetters were iron restraints locked specifically around the ankles.

People in that town had already tried to physically control him.

He broke free of chains and fetters again and again.

No human effort before this moment had ever actually helped him.

⛓️ Fetters were iron ankle restraints
💪 He broke free again and again
🏘️ The town had already tried to help
📖 No human effort had worked before

## Legion, Because Many Devils Were Entered Into Him

A legion in the Roman army numbered several thousand soldiers.

Naming the demon Legion shows just how many spirits controlled this one man.

This single answer reveals the true scale of his suffering all at once.

No ordinary exorcism language could have captured what Jesus was actually facing.

⚔️ A legion meant thousands of soldiers
👹 This name revealed many demons
📏 It showed the scale of suffering
📖 Jesus faced more than one spirit

## An Herd Of Many Swine Feeding On The Mountain

Swine means pigs, animals considered unclean under Jewish law.

A Gentile region could raise and sell them without any religious objection.

The demons ask to enter this herd instead of leaving the area entirely.

Jesus allows the request, and the outcome speaks louder than words.

🐷 Swine means pigs, considered unclean
🌍 A Gentile region could raise them freely
👹 The demons asked to enter the herd
📖 Jesus allowed it, and the result spoke clearly

## Ran Violently Down A Steep Place Into The Lake

Two thousand pigs are named later in Mark's version of this same event.

The demons that once controlled a man could not even control the animals.

Every single pig drowned in the lake within moments.

The destructive power that once filled one man is now plainly visible to everyone.

🐷 A huge herd rushed into the lake
👹 The demons could not control the animals
🌊 Every pig drowned within moments
📖 Their destructive power became visible to all

# Luke 8:34-39
# 🏠 Return To Thine Own House
---
## They Fled, And Told It In The City And In The Country

The men watching the pigs ran to spread the news immediately.

Their fear pushed them to tell everyone nearby instead of staying to investigate.

Word of this event reached the whole surrounding region within a short time.

This news is what drew the crowd back out to Jesus.

🏃 The herdsmen ran to spread news
😨 Fear pushed them to tell everyone
📣 Word spread across the region
📖 This news drew the crowd back

## Sitting At The Feet Of Jesus, Clothed, And In His Right Mind

This same man had once worn no clothes and lived among the tombs.

Clothed and sitting calmly describes a complete transformation from before.

In his right mind means his thinking was now clear and whole again.

The crowd is seeing the exact opposite of the man they once avoided.

👕 He was clothed, not naked
🧠 His mind was now clear
📍 Sitting calmly replaced wild wandering
📖 The crowd saw a complete change

## Besought Him To Depart From Them

The crowd reacts with fear rather than celebration at this miracle.

Losing a valuable herd of pigs likely shaped their reaction too.

Instead of asking Jesus to stay, they beg him to leave.

Power this real made them uncomfortable instead of grateful.

😨 Fear, not joy, was their reaction
💰 Losing the herd mattered to them
🚪 They asked Jesus to leave
📖 His power unsettled them instead

## Besought Him That He Might Be With Him

The healed man wants to leave everything behind and follow Jesus directly.

His request is completely understandable after everything he has just survived.

Jesus still sends him away instead of keeping him close.

His next assignment is to go back home and tell his own story.

🙏 He wanted to follow Jesus directly
💭 His wish made complete sense
🏠 Jesus sent him home instead
📖 His story became his assignment

## Shew How Great Things God Hath Done Unto Thee

Jesus gives him a mission instead of a traveling role.

Shew means to make known or tell plainly to others.

His own changed life becomes the proof of what God has done.

He obeys, and the whole city hears what happened to him.

📣 Shew means to tell plainly
🏠 His assignment was his own city
🔁 His changed life was the proof
📖 He obeyed, and the city heard

## By What Means He That Was Possessed Was Healed

Eyewitnesses from the tombs explained exactly what they had seen happen.

Their account gave the returning crowd a clear explanation, not just rumor.

This detail confirms the healing was witnessed, not just claimed later.

Multiple separate people now carried the same consistent story.

👀 Eyewitnesses explained what they saw
🗣️ Their account was not just rumor
✅ The healing was directly witnessed
📖 Multiple people told the same story

# Luke 8:40-44
# 🩸 Two Desperate Needs
---
## They Were All Waiting For Him

Jesus had just left a region that begged him to leave.

This crowd welcomes him home with the exact opposite reaction.

Gladly received shows real excitement and relief at his return.

The contrast between these two receptions could not be sharper.

😨 One region had begged him to leave
😊 This crowd welcomed him gladly
🏠 He had just returned home
📖 The contrast between receptions was sharp

## Jairus, A Ruler Of The Synagogue

A ruler of the synagogue oversaw worship and teaching in the local community.

This was a respected, official religious position within the town.

Jairus falls at Jesus's feet, a posture of total desperation, not formality.

A man with real status still comes with nothing but a request.

🏛️ A synagogue ruler oversaw local worship
👑 It was a respected position
🙇 He fell down in desperation
📖 Status did not stop his need

## One Only Daughter, About Twelve Years Of Age, And She Lay A Dying

An only daughter made this loss even more devastating for the family.

Twelve years old meant she was right at the edge of adulthood in that culture.

Lay a dying means she was still alive, but fading quickly.

Every moment Jairus spent asking for help felt like time he did not have.

👧 She was his only daughter
🎂 Twelve was the edge of adulthood
⏳ She was fading, not already gone
📖 Every moment felt urgent to him

## An Issue Of Blood Twelve Years

This woman had bled for twelve years straight.

Jewish law treated this condition as a source of ceremonial uncleanness.

That uncleanness meant isolation from community life for over a decade.

Her suffering had lasted exactly as long as Jairus's daughter had been alive.

🩸 She had bled for twelve years
🚫 The law called this uncleanness
🚪 It isolated her for a decade
📖 Her years matched the girl's whole life

## Spent All Her Living Upon Physicians

She had already used her entire savings trying to find a cure.

Physicians in that era had very limited real medical understanding.

Neither could be healed means none of them succeeded despite her money.

She came to Jesus with nothing left to lose financially or physically.

💰 She spent her whole savings
⚕️ Doctors then knew very little
❌ None of them could help her
📖 She had nothing left to lose

# Luke 8:45-48
# ✋ Touched And Known
---
## Who Touched Me

Jesus asks this question in the middle of a large, pressing crowd.

Many people were touching him by accident at that exact moment.

He is not confused.

He already knows something unusual just happened.

This question is meant to draw the woman out into the open.

👥 Many people touched him by accident
❓ Jesus was not actually confused
🎯 He already knew something had happened
📖 His question drew her forward

## The Multitude Throng Thee And Press Thee

Throng and press both describe a dense, crushing crowd pushing in from every side.

Peter's reaction shows he finds the question strange at first.

From Peter's perspective, nearly everyone there had technically touched Jesus already.

He has not yet realized one touch was completely different from the rest.

👥 Throng and press mean a crushing crowd
🤔 Peter found the question strange
🙋 Everyone there had technically touched him
📖 One touch was still different

## Virtue Is Gone Out Of Me

Virtue here means healing power, not moral character.

Jesus physically perceived power leaving his own body at that exact moment.

This detail shows the healing cost him something real and tangible.

It was not a magic trick, it was power actually transferred.

⚡ Virtue means healing power here
📍 Jesus felt it leave him
💪 The healing cost him something
📖 Power was truly transferred to her

## Thy Faith Hath Made Thee Whole, Go In Peace

Whole here means completely healed in body, not just free of symptoms.

Her faith, not the fabric of his clothing, is named as the real cause.

Go in peace sends her away with dignity, not shame for approaching him.

She leaves healed in body and fully restored in her standing before others.

💯 Whole means completely healed
🙏 Faith, not fabric, caused it
🕊️ Go in peace restored her dignity
📖 She left healed and restored

# Luke 8:49-56
# ✨ Maid, Arise
---
## Thy Daughter Is Dead

This news arrives while Jesus is still busy with the bleeding woman.

Trouble not the Master suggests the situation is now considered hopeless.

The messenger assumes there is nothing left Jesus can actually do.

Timing makes this moment feel especially cruel for Jairus.

💔 The news interrupted an urgent moment
🙅 The messenger assumed hope was gone
⏳ Timing made the moment feel cruel
📖 Jairus faced the worst possible news

## Fear Not, Believe Only, And She Shall Be Made Whole

Jesus responds to devastating news with calm instead of alarm.

Believe only asks Jairus to trust him even after hope seems gone.

Jesus speaks as if death itself has not actually changed anything.

His confidence does not waver even in front of a grieving father.

😌 Jesus responded with calm, not alarm
🙏 Believe only means trust despite hope
⚡ Death had not changed his plan
📖 His confidence never wavered

## Save Peter, And James, And John

Jesus limits who witnesses this particular miracle to a small, trusted group.

These same three disciples appear together at other major moments later in the gospels.

The girl's own parents are allowed to stay as well.

Jesus controls carefully who gets to see this kind of power up close.

👥 Only three disciples were allowed in
🔑 These three appear at other key moments
👪 Her parents stayed too
📖 Jesus controlled who witnessed this

## She Is Not Dead, But Sleepeth

Jesus is not denying that she has actually died.

Sleepeth describes death from his perspective, as something temporary and reversible.

The mourners in the room understand this as plain denial of reality.

What looks final to everyone else is not final to him at all.

😴 Sleepeth means temporary, not permanent
👀 Mourners took it as denial
⏳ What seemed final was not
📖 His perspective was not theirs

## Laughed Him To Scorn

The mourners mock Jesus openly, certain that he is simply wrong.

Scorn means open, public mockery, not quiet private doubt.

Their confidence came from direct, firsthand knowledge that she was truly dead.

Their certainty makes the coming miracle even more undeniable.

😂 They mocked him openly
👥 Scorn meant public mockery
✅ They were certain she was dead
📖 Their certainty made the miracle undeniable

## Maid, Arise

Jesus clears the room before he acts, keeping this moment private.

Maid was simply a word for a young girl.

He takes her hand before speaking a single word.

His command is short, direct, and carries full authority over death.

🚪 He cleared the room first
🤝 He took her hand first
🗣️ His command was short and direct
📖 His words carried full authority

## He Commanded To Give Her Meat

Her spirit returning and rising immediately proves this was full, genuine restoration.

Meat here simply means food of any kind, not meat specifically.

Asking for food proves her body was completely, physically normal again.

Jesus pays attention to this small, practical need right after the miracle itself.

🙆 She rose immediately and fully
🍞 Meat meant food in general
💯 Needing food proved full recovery
📖 Jesus cared about this small detail

## He Charged Them That They Should Tell No Man

Jesus asks the parents to keep this miracle quiet, at least for now.

This request matches a pattern he repeats throughout Luke's gospel.

Spreading this news too quickly could draw the wrong kind of attention to him.

His mission still had a timing he intended to control carefully.

🤫 He asked them to stay quiet
🔁 This matches a pattern in Luke
⚠️ Attention could come too soon
📖 Jesus controlled his own timing
`.trim();

export const LUKE_EIGHT_PERSONAL_SECTIONS = parseLukeEightRawNotes(LUKE_EIGHT_RAW_NOTES);
