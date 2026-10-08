export type MarkFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkFourRawNotes(rawText: string): MarkFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 4:${startVerse}` : `Mark 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Mark 4 sections, received " + sections.length);
  }

  return sections;
}

const MARK_FOUR_RAW_NOTES = `# Mark 4:1-4
# 🌾 Jesus Tells The Parable Of The Sower
---
## ⛵ He Entered Into A Ship, And Sat In The Sea

The crowd on the shore had grown too large for Jesus to simply stand among them.

Sitting in the ship meant sitting in a boat anchored just off the beach, still on the Sea of Galilee.

Water carries sound further and more clearly than open ground does.

The boat was not an escape from the crowd, it was a way to reach all of it.

⛵ The ship was a boat just offshore

🌊 Water helped his voice carry further

👥 The crowd had grown too large for land

📖 He used the setting to reach everyone

## 📚 He Taught Them Many Things By Parables

A parable means an earthly story placed next to a spiritual truth to explain it.

The word behind it in the original language means something set alongside something else for comparison.

Jesus did not use parables only to make his point simpler.

The very same story could open understanding for one listener and leave another just as confused.

📚 Parable means a story placed beside a truth

🌾 Earthly pictures explain spiritual realities

🔑 The same story can reveal or conceal

➡️ Parables sort listeners by how they respond

## 👂 Hearken

Hearken is an old word that means listen closely, not just hear in passing.

Jesus opens the parable with a command before he even begins the story.

He wants active attention, not a half interested crowd.

The instruction itself is already part of the lesson.

👂 Hearken means listen closely, not casually

🗣️ Jesus commands attention before he teaches

🎯 Active listening matters before understanding can start

📖 The command is part of the lesson

## 🌾 There Went Out A Sower To Sow

A sower in this story means a farmer scattering seed across his own field.

Farmers at this time usually sowed by walking the field and casting seed out by hand.

This happened before the ground was plowed, not after it.

One single pass of scattering could land seed on a footpath, rocky ground, or weeds.

That same pass could also land seed on good, ready soil.

🌾 A sower is a farmer sowing seed

🚶 Farmers sowed by hand before plowing

🎯 One pass could hit several different soils

📖 Four outcomes come from a single sower's walk

## 🛤️ Some Fell By The Way Side, And The Fowls Of The Air Came And Devoured It Up

The way side was a footpath worn hard by feet walking across the field.

Packed dirt like that could not let a seed sink in or take root.

Seed left sitting on the surface was an easy, visible meal.

Birds found it before it ever had a chance to grow.

🛤️ Way side means a hard worn footpath

🚫 Hard dirt could not absorb the seed

🐦 Exposed seed became an easy meal

➡️ Some hearts never let the word sink in
---
# Mark 4:5-9
# 🌱 Three More Kinds Of Ground
---
## 🪨 Some Fell On Stony Ground

Stony ground here does not mean a field full of visible rocks on top.

It means a shallow layer of soil sitting directly over a hidden shelf of bedrock.

A farmer walking the field at planting time might not even notice the rock underneath.

The real problem stayed invisible until the plant actually started to grow.

🪨 Stony ground hides rock beneath thin soil

👀 The danger was not visible at first

🌱 The soil looked fine on the surface

➡️ Some problems only show up later

## ☀️ Immediately It Sprang Up, Because It Had No Depth Of Earth

Thin soil over rock warms up fast in the sun.

A seed planted there sprouts quickly, faster than seed in deeper ground.

That quick start looks like success at first.

Speed here is actually a warning sign, not a strength.

☀️ Shallow soil warms and sprouts fast

⚡ Quick growth looked like early success

🚩 Fast growth was actually a warning sign

➡️ Depth matters more than speed

## 🔥 When The Sun Was Up, It Was Scorched, And Because It Had No Root, It Withered Away

Scorched means the heat burned the plant because its roots never reached real soil.

Without rock in the way, roots can reach deep water during dry heat.

This plant had nowhere to go but up, so the heat killed it fast.

A plant can look alive right up until the moment it cannot survive.

🔥 Scorched means burned from shallow roots

💧 Deep roots would have reached water

🌱 This plant had nowhere to grow but up

📖 Fast growth without depth cannot last

## 🌿 Some Fell Among Thorns, And The Thorns Grew Up, And Choked It, And It Yielded No Fruit

Thorns here means weeds and thistles already living in that patch of ground.

Nobody had cleared those weeds out before the sower scattered his seed.

Grain and weeds grew up together, fighting for the same light and water.

The weeds won, and the grain never produced a single head of fruit.

🌿 Thorns are weeds already in the soil

⚔️ Grain and weeds competed for the same light

🚫 The weeds won that fight completely

➡️ Some growth gets strangled slowly, not stopped

## 🌱 Other Fell On Good Ground, And Did Yield Fruit That Sprang Up And Increased, Some Thirty, And Some Sixty, And Some An Hundred

A normal grain harvest in this region often returned about seven times what was planted.

Thirty, sixty, or a hundred times the seed sown was far beyond a normal yield.

Good ground is the only soil in the story that finishes what it started.

The size of this harvest marks it as something more than ordinary farming.

🌱 Good ground actually produced a harvest

📈 Thirtyfold to a hundredfold was far above normal

🏁 Good ground is the only soil that finishes

📖 This harvest points past ordinary farming

## 👂 He That Hath Ears To Hear, Let Him Hear

Everyone listening that day already had working ears.

This sentence is not about physical hearing at all.

It is an invitation to actually absorb what the story means, not just let the words go by.

The same call closes this parable and returns later in the chapter.

👂 This is not about physical hearing

🧠 It calls for real understanding, not just sound

🔁 The same call repeats later in the chapter

➡️ Hearing words differs from hearing the point
---
# Mark 4:10-12
# 🔑 Why Jesus Taught In Parables
---
## 👥 They That Were About Him With The Twelve Asked Him Of The Parable

This moment happens away from the crowd, not right after the public teaching.

The group asking is not only the twelve, a wider circle of committed followers was also there.

Private access came from staying close, not from any special rank.

Jesus answers this question only once the crowd has already gone.

👥 More than the twelve were present here

🚪 Private explanation required staying close to Jesus

🕊️ Access came from presence, not rank

📖 This explanation only comes once the crowd leaves

## 🔑 Unto You It Is Given To Know The Mystery Of The Kingdom Of God

Mystery in this verse does not mean a puzzle meant to stay unsolved.

It means a truth that was once hidden and is now being opened up to those who follow.

The disciples are not smarter than the crowd.

They are simply given access the crowd does not yet have.

🔑 Mystery means a hidden truth now revealed

🎁 The truth was given, not discovered

👣 Closeness to Jesus brought this access

➡️ Understanding here is a gift, not a reward

## 🚪 Unto Them That Are Without, All These Things Are Done In Parables

Without here means everyone outside the circle of people actually following Jesus.

The same parable that opens understanding for one group leaves the other group outside it.

Parables were never meant to work the same way for every listener.

A story can teach and filter at the very same time.

🚪 Without means outside the circle of followers

🌗 The same parable works two different ways

🔍 Parables reveal to some and filter others

📖 One story, two very different outcomes

## 👁️ That Seeing They May See, And Not Perceive, And Hearing They May Hear, And Not Understand

This does not mean Jesus wants people to stay confused out of spite.

These words echo a warning from the prophet Isaiah about hearts that had already hardened against the truth.

People who kept refusing to respond eventually lost the ability to respond at all.

Rejecting the truth repeatedly is what closes a heart, not Jesus speaking in parables.

👁️ This is not Jesus wanting confusion

📜 The words echo a warning from Isaiah

🚫 Repeated rejection hardens a heart over time

➡️ Closed hearts close themselves first
---
# Mark 4:13-20
# 🌱 The Sower Explained
---
## 🔑 Know Ye Not This Parable? And How Then Will Ye Know All Parables?

Jesus treats the sower as the starting point for understanding every parable that follows.

If this one does not make sense, the rest of his teaching will not either.

This is a gentle correction, not an insult toward the disciples.

He is about to walk them through the meaning piece by piece.

🔑 The sower unlocks every later parable

📘 This parable works like a starting lesson

🙂 The question corrects gently, not harshly

📖 Jesus is about to explain it fully

## 🌾 The Sower Soweth The Word

The seed in this story stands for the message about God's kingdom, not literal grain.

Sowing the word means speaking or teaching that message to someone.

Every soil type that follows is really a picture of a different kind of listener.

The farmer changes nothing about the seed, only the ground decides what happens to it.

🌾 The seed represents God's message

🗣️ Sowing means speaking that message aloud

👂 Each soil pictures a different listener

➡️ The seed stays the same, the ground changes

## 🛤️ These Are They By The Way Side, Where The Word Is Sown, But Satan Cometh Immediately, And Taketh Away The Word

This listener hears the message, but it never sinks past the surface.

A hardened heart works just like a footpath, nothing penetrates it.

Satan's role here is removal, taking the word away before it can do anything at all.

The loss happens almost instantly, not after a long struggle.

🛤️ A hardened heart cannot absorb the word

⚡ The loss happens almost immediately

🚫 Satan removes the word before it takes hold

➡️ Some hearts never give the word a chance

## 😊 Sown On Stony Ground, Who, When They Have Heard The Word, Immediately Receive It With Gladness

This listener responds with real excitement the moment they hear the message.

Gladness here is genuine, not performed for show.

The problem is not the response, it is what is missing underneath it.

Quick joy with no depth behind it rarely survives what comes next.

😊 This listener's joy is real at first

⚡ The response is fast and enthusiastic

🪨 Nothing solid exists underneath that joy

➡️ Quick joy alone rarely survives pressure

## 🌱 Have No Root In Themselves, And So Endure But For A Time

Root here means a settled, lasting commitment underneath the surface excitement.

Without that root, the response has no way to survive hard conditions.

Endure but for a time means this falling away is only a matter of when, not if.

A plant without roots was never going to make it through real heat.

🌱 Root means a lasting inward commitment

⏳ No root means a short lifespan for faith

🔥 Hard conditions were always coming

📖 Depth decides who actually lasts

## ⚡ Afterward, When Affliction Or Persecution Ariseth For The Word's Sake, Immediately They Are Offended

Affliction and persecution here mean real hardship aimed specifically at someone's faith.

Offended does not mean hurt feelings, it means stumbling and falling away completely.

This listener's commitment was tied to comfort, not to the truth of the message itself.

The moment comfort disappears, so does the commitment.

⚡ Persecution here targets faith directly

🧱 Offended means falling away, not feeling hurt

💭 Commitment was tied to comfort, not truth

➡️ Remove comfort, and this faith disappears

## 🌿 The Cares Of This World, And The Deceitfulness Of Riches, And The Lusts Of Other Things

This listener hears the word, but three separate things choke it out slowly over time.

They are:
Worry over everyday life and its problems.
The false promise that wealth brings real security.
Wanting other things more than the truth itself.

None of these looks dangerous by itself, which is exactly how all three succeed.

🌿 Three things choke this listener's faith

💰 Riches promise security they cannot give

😮 Desire for other things crowds out the word

➡️ Slow distractions are still fatal distractions

## 🚫 Choke The Word, And It Becometh Unfruitful

Choke means a slow strangling, not a sudden cutting off.

Unfruitful means the word technically stayed, but it never produced anything real.

This listener can look fine from the outside for a long time.

Nothing visible breaks, the growth just quietly stops.

🚫 Choking is slow, not a sudden stop

🌾 Unfruitful means nothing real was ever produced

👀 This listener can look fine for years

➡️ Quiet stagnation is still spiritual failure

## 🌾 These Are They Which Are Sown On Good Ground, Such As Hear The Word, And Receive It, And Bring Forth Fruit, Some Thirtyfold, Some Sixty, And Some An Hundred

This is the only soil in the whole parable that completes every step.

Hearing is not enough on its own, three other soils heard the word too.

Receiving means actually letting the message take root and change something.

Fruit is the proof that hearing and receiving both actually happened.

🌾 This is the only soil that finishes

👂 Hearing alone was never the finish line

🌱 Receiving means letting the word take root

📖 Fruit proves the word actually worked
---
# Mark 4:21-25
# 🕯️ Light And Measure
---
## 🕯️ Is A Candle Brought To Be Put Under A Bushel, Or Under A Bed?

A candle here means a small oil lamp, the normal household light source.

A bushel was a container used to measure out grain, large enough to smother a flame completely.

Hiding a lit lamp under a measuring bucket or a bed makes no practical sense at all.

Jesus asks this as a rhetorical question with an obvious answer.

🕯️ Candle means a small household oil lamp

📦 Bushel was a grain measuring container

🙅 Hiding a lit lamp serves no purpose

📖 The answer is obviously no

## 🔆 Not To Be Set On A Candlestick?

A candlestick in this verse means a stand built to hold a lamp up high.

Putting a lamp there lets its light reach the whole room at once.

Light only does its job when it is placed where it can be seen.

The expected place for a lit lamp was always up, never hidden.

🔆 Candlestick means a stand that lifts the lamp

🏠 A raised lamp lights the whole room

👀 Light must be placed to be useful

➡️ Truth works the same way light does

## 📣 There Is Nothing Hid, Which Shall Not Be Manifested

Manifested means brought out into the open where everyone can see it.

Jesus is describing the private explanations he is giving right now, in this very conversation.

What stays quiet today will not stay quiet forever.

The disciples' private understanding has a future public purpose.

📣 Manifested means brought fully into the open

🤫 This refers to the private explanations happening now

⏳ Hidden truth here is temporary, not permanent

📖 Today's private lesson has a future public purpose

## 🎯 Take Heed What Ye Hear

Take heed means pay careful, deliberate attention, more than simply listening.

This phrase turns the lesson back onto the listener's own responsibility.

How a person listens shapes how much they will actually understand.

Careless hearing produces careless understanding.

🎯 Take heed means deliberate, careful attention

🪞 The responsibility shifts onto the listener here

🧠 How you listen shapes what you understand

➡️ Careless hearing leads to careless understanding

## ⚖️ With What Measure Ye Mete, It Shall Be Measured To You

Mete is an old word that means to measure something out.

This describes a kind of spiritual proportion, effort given in understanding comes back in kind.

Someone who listens carelessly should not expect deep understanding in return.

Someone who listens with real attention receives more because they gave more.

⚖️ Mete means to measure something out

🔁 Effort in listening returns in kind

📉 Careless listening returns little understanding

📖 Attention given determines understanding received

## 📈 He That Hath, To Him Shall Be Given, And He That Hath Not, From Him Shall Be Taken Even That Which He Hath

This describes a real spiritual pattern, not an unfair rule.

Understanding that gets used tends to grow into even more understanding.

Understanding that gets ignored tends to fade until it disappears completely.

Spiritual growth is never neutral, it always moves in one direction or the other.

📈 Used understanding tends to keep growing

📉 Ignored understanding tends to fade away

⚖️ This is a pattern, not an unfair rule

➡️ Spiritual growth never stays neutral
---
# Mark 4:26-29
# 🌾 The Parable Of The Growing Seed
---
## 🌱 So Is The Kingdom Of God, As If A Man Should Cast Seed Into The Ground

This parable appears only in the Gospel of Mark, nowhere else in the Bible.

It pictures God's kingdom as something a person starts but does not actually grow.

The man's only job in the story is to scatter the seed.

Everything that happens after that belongs to a different, hidden power.

🌱 This parable is found only in Mark

👤 The man only starts the process

🌾 Growth belongs to a power beyond him

📖 Starting is not the same as growing

## 😴 Should Sleep, And Rise Night And Day, And The Seed Should Spring And Grow Up, He Knoweth Not How

The farmer keeps living his normal life while the seed grows completely out of his sight.

He knoweth not how is the actual point of this line, not a gap in the story.

No human effort or understanding makes a seed turn into a plant.

God's kingdom grows the same hidden way, whether or not anyone can explain it.

😴 The farmer's daily life continues normally

❓ Not knowing how is the actual point

🌱 No human effort makes a seed grow

📖 The kingdom grows by a hidden power

## 🌍 The Earth Bringeth Forth Fruit Of Herself

This phrase means the ground produces growth on its own, without the farmer managing each step.

It does not mean plants grow with absolutely no cause at all.

It means the real cause is not something the farmer is doing or controlling.

Growth here is given, not manufactured.

🌍 The earth produces growth on its own

🙅 This does not mean growth has no cause

👤 The cause is simply not the farmer's doing

➡️ Growth here is given, not manufactured

## 🌾 First The Blade, Then The Ear, After That The Full Corn In The Ear

These three stages are:
The blade, a thin shoot barely out of the ground.
The ear, the head of grain beginning to form.
The full corn, the ripe grain ready for harvest.

Each stage looks nothing like the one before it.

Yet every stage was still necessary for the harvest to come.

🌾 Three stages mark the seed's growth

👣 Each stage looks different from the last

🧩 Every stage was still necessary

➡️ Spiritual growth also moves in stages

## 🔪 Immediately He Putteth In The Sickle, Because The Harvest Is Come

A sickle was a short curved blade used by hand to cut ripe grain.

The farmer's long wait ends the instant the harvest is actually ready.

He was never in control of the growing, but he is fully active again at the harvest.

Patience through unseen growth leads directly into decisive action at the right time.

🔪 Sickle means a hand blade for cutting grain

⏳ The farmer's waiting ends exactly on time

👤 Harvest brings the farmer back into action

📖 Patience and timing both matter to God's plan
---
# Mark 4:30-34
# 🌳 The Mustard Seed And Parables For All
---
## 🤔 Whereunto Shall We Liken The Kingdom Of God? Or With What Comparison Shall We Compare It?

Jesus asks this almost like he is thinking out loud in front of the crowd.

He is searching for the clearest possible earthly picture, not picking a random story.

The kingdom of God has no single, simple definition.

A good comparison can teach what a plain description cannot.

🤔 Jesus searches for the clearest picture available

🙅 This is not a random story choice

📖 The kingdom resists a single simple definition

➡️ A good comparison teaches what words alone cannot

## 🌱 It Is Like A Grain Of Mustard Seed, Which, When It Is Sown In The Earth, Is Less Than All The Seeds That Be In The Earth

A mustard seed was proverbially the smallest seed a farmer in that region regularly planted.

Jesus is not making a scientific claim about every seed on earth.

He is using a well known example of smallness that his audience already recognized instantly.

The whole point of the comparison depends on just how small this seed really was.

🌱 Mustard seed was proverbially a tiny seed

🙅 Not a scientific claim about all seeds

👥 The audience already knew this example well

➡️ The comparison depends on real smallness

## 🌳 Becometh Greater Than All Herbs, And Shooteth Out Great Branches

A mustard plant was technically a garden herb, not a true tree.

In good conditions it could still grow into a thick, woody shrub several feet tall.

That growth from a tiny seed to a treelike plant happened within a single season.

The size jump itself is the whole point of the comparison.

🌳 Mustard plants could grow treelike and tall

🌱 One season was enough for this growth

⚡ The size jump happened surprisingly fast

📖 Small beginnings do not predict small endings

## 🐦 So That The Fowls Of The Air May Lodge Under The Shadow Of It

Birds nesting in a tree's branches is a picture already used in the Old Testament.

Prophets like Ezekiel and Daniel used that same image for a great kingdom sheltering many nations.

Jesus reaches for that same familiar picture here on purpose.

A kingdom that started with a handful of followers was always meant to shelter far more.

🐦 Birds nesting pictures shelter for many

📜 The image also appears in Ezekiel and Daniel

🌍 It originally pictured a kingdom sheltering nations

➡️ This small kingdom was built to grow large

## 🗣️ With Many Such Parables Spake He The Word Unto Them, As They Were Able To Hear It

Jesus paced his public teaching to match what each crowd could actually absorb.

As they were able to hear it means he was not holding back truth out of secrecy.

He was measuring how much a listener could actually receive at one time.

Good teaching meets people where they currently are, not where a teacher wishes they were.

🗣️ Jesus paced his teaching to his audience

🙅 This was not truth withheld out of secrecy

📏 He measured what listeners could actually receive

➡️ Good teaching starts where the listener is

## 🔓 But Without A Parable Spake He Not Unto Them, And When They Were Alone, He Expounded All Things To His Disciples

Parables were Jesus's standard method for teaching the public crowds, not his only teaching method.

Expounded means he explained the full meaning in plain, direct language.

That complete explanation stayed reserved for his closest followers in private.

Two different levels of teaching were happening side by side, every single day.

🔓 Expounded means explained in full and plainly

👥 Parables were the normal method for public crowds

🔑 Full explanation stayed reserved for close followers

📖 Two levels of teaching ran side by side
---
# Mark 4:35-41
# ⛵ Jesus Calms The Storm
---
## 🌅 Let Us Pass Over Unto The Other Side

The other side of the Sea of Galilee was mostly Gentile territory, not Jewish land.

Jesus is choosing to travel somewhere his own culture did not expect him to go.

This short instruction sets up a deliberate crossing, not an accident.

Where Jesus decided to go mattered just as much as what he taught.

🌅 The other side was mostly Gentile territory

🧭 This crossing was deliberate, not accidental

🚶 Jesus went where he was not expected

➡️ Jesus's direction mattered as much as his words

## ⛵ They Took Him Even As He Was In The Ship

This phrase signals that they left immediately, with no stop for supplies.

Jesus simply stayed in the same boat he had been teaching from all day.

The disciples acted fast once he gave the instruction to go.

A sudden departure like this makes the coming storm feel even more unexpected.

⛵ They left immediately, with no preparation

🚫 No stop was made for supplies

⚡ The disciples acted on the instruction fast

➡️ A sudden departure made the storm feel worse

## 🚣 There Were Also With Him Other Little Ships

This detail is easy to miss, but it matters for what happens later.

Other boats were following along on the same crossing, not just the one carrying Jesus.

Their presence means more than the twelve witnessed what is about to happen.

Small details like this one often confirm a story rather than decorate it.

🚣 Other boats followed on the same crossing

👥 More than the twelve witnessed this storm

📖 Small details here confirm the event

➡️ Mark includes witnesses beyond the inner circle

## 🌬️ There Arose A Great Storm Of Wind

The Sea of Galilee sits in a low basin, surrounded by higher hills.

Cool air rushing down from those hills can crash into warm air sitting over the water.

That collision can create a sudden, violent storm with almost no warning.

Experienced local fishermen among the disciples still found this storm genuinely terrifying.

🌬️ The sea sits in a low surrounded basin

⚡ Colliding air causes sudden, violent storms

⏱️ Almost no warning came before this one

📖 Even experienced fishermen found this storm terrifying

## 🛏️ He Was In The Hinder Part Of The Ship, Asleep On A Pillow

The hinder part of the ship means the back, or stern, where the steering happened.

A pillow here was likely a simple leather or wooden headrest, not a soft cushion.

Jesus sleeping through a violent storm shows a real, physical human exhaustion.

This is not a symbolic detail.

It is an ordinary, tired body asleep in an extraordinary moment.

🛏️ Hinder part means the back of the boat

🪵 The pillow was a simple, firm headrest

😴 Jesus's sleep shows real human exhaustion

➡️ Ordinary tiredness and an extraordinary storm collided

## 😨 Master, Carest Thou Not That We Perish?

This question comes out as a desperate, almost accusing cry, not a calm request.

Several of these disciples were experienced fishermen who understood exactly how dangerous this storm was.

Their fear was not an overreaction, the danger was completely real.

Waking Jesus was their last option after their own skill had already failed them.

😨 The cry is desperate, almost accusing

🎣 Experienced fishermen recognized real danger here

✅ Their fear matched a genuinely real threat

➡️ Jesus was their last option, not their first

## 🗣️ Peace, Be Still

This is a direct command spoken straight at the wind and the sea themselves.

Jesus is not praying and asking for calm from somewhere else.

He speaks to creation the same way he speaks to a person.

Only one brief sentence was needed to issue the command.

🗣️ This is a command, not a prayer

🌊 Jesus speaks directly to wind and sea

💪 One short sentence carried full authority

📖 He commands creation the way he commands people

## 🤫 The Wind Ceased, And There Was A Great Calm

The stillness here is instant, not a storm slowly winding down over time.

Great calm describes total, complete stillness, not just calmer conditions.

Nature itself responded the moment Jesus gave the command.

A storm that could not be outlasted was gone the instant he spoke.

🤫 The calm arrived instantly, not gradually

🌊 Great calm means total stillness

⚡ Nature responded the moment he spoke

📖 Instant obedience marks this as more than luck

## ❓ Why Are Ye So Fearful? How Is It That Ye Have No Faith?

Jesus is not saying the danger they felt was imaginary.

He is pointing out that fear had completely taken over where trust in him should have been.

Faith here does not mean denying real danger exists.

It means trusting Jesus even while the danger is still happening.

❓ The danger was real, not imagined

⚖️ Fear had crowded out trust in him

🙏 Faith does not mean denying real danger

➡️ Faith means trusting him inside the danger

## 😳 What Manner Of Man Is This, That Even The Wind And The Sea Obey Him?

In the Old Testament, only God himself is ever described as having full authority over the sea.

The disciples already knew Psalms and stories where God alone commands the waters to be still.

Their fear after the storm ends is actually bigger than their fear during the storm.

They are not afraid of drowning anymore, they are afraid of exactly who is sitting in their boat.

😳 Only God commands the sea in scripture

📜 The disciples already knew this old pattern

🔄 Their fear grew after the storm ended

📖 The real question is who Jesus is
`.trim();

export const MARK_FOUR_PERSONAL_SECTIONS = parseMarkFourRawNotes(MARK_FOUR_RAW_NOTES);
