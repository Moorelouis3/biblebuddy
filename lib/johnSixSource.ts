export type JohnSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnSixRawNotes(rawText: string): JohnSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 6:${startVerse}` : `John 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 John 6 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_SIX_RAW_NOTES = `# John 6:1-4
# 🌊 Jesus Crosses The Sea Of Galilee
---

## 🌊 Over The Sea Of Galilee, Which Is The Sea Of Tiberias

The Sea of Galilee is a large freshwater lake in northern Israel.

Tiberias was a Roman city built on its western shore.

John gives readers both names because many Gentile readers only knew it as Tiberias.

Jewish readers already knew the lake by its older name.

🌊 Sea of Galilee is a large lake
🏛️ Tiberias was a Roman city on its shore
📍 John gives both names for his readers
📖 The same lake carries two names

## 👥 A Great Multitude Followed Him

Crowds followed Jesus wherever he traveled around Galilee.

John explains their motive plainly in this verse.

They came because they had seen his healing miracles.

Curiosity about a miracle worker drew bigger crowds than his teaching alone.

This sets up the massive crowd that needs feeding later in the chapter.

👥 Crowds followed Jesus around Galilee
🩹 They came because of his healing miracles
🎯 Miracles drew bigger crowds than teaching
📖 This crowd will need feeding soon

## ⛰️ Jesus Went Up Into A Mountain

This phrase does not describe one single named peak.

It simply means Jesus climbed up into the hills near the lake.

Teachers in this era often sat down to instruct their students.

Sitting with his disciples here signals a quiet moment of teaching.

That calm setting is about to be interrupted by a huge crowd.

⛰️ A mountain here means nearby hills
📚 Teachers often sat down to instruct
🤝 Jesus sits closely with his disciples
📖 This quiet moment is about to end

## 📅 The Passover, A Feast Of The Jews, Was Nigh

Nigh is an old word that simply means near.

Passover celebrated Israel's escape from slavery in Egypt.

Entire towns emptied out as families traveled to Jerusalem for the feast.

John marks time this way throughout his whole gospel.

This detail quietly explains why such a massive crowd gathered in one place.

📅 Nigh is an old word for near
🐑 Passover celebrated the escape from Egypt
🚶 Crowds traveled toward Jerusalem for the feast
📖 This explains why such a crowd gathered

# John 6:5-9
# 🍞 Testing Philip
---

## ❓ Whence Shall We Buy Bread, That These May Eat

Whence is an old word that simply means from where.

Jesus asks Philip a very practical, almost impossible question.

Feeding a crowd this size required far more food than anyone carried.

The question forces Philip to face the size of the problem out loud.

❓ Whence is an old word for from where
🍞 Jesus asks about feeding the crowd
😮 The need is far bigger than it seems
📖 Philip must face the problem out loud

## 🎯 This He Said To Prove Him

Jesus already knew exactly what he planned to do next.

Prove here means to test, not to tempt him into sin.

The question was never really about finding an answer from Philip.

It was about showing Philip how small his own faith still was.

🎯 Jesus already knew his plan
🧪 Prove means test, not tempt
🔍 The question was not about an answer
📖 It revealed the size of Philip's faith

## 💰 Two Hundred Pennyworth Of Bread Is Not Sufficient

A pennyworth refers to a single day's wage for an ordinary laborer.

Two hundred pennyworth equals almost a year of work for one man.

Philip does the math and still comes up far short.

Even that much money could not feed this particular crowd.

💰 A pennyworth was one day's wage
📅 Two hundred pennyworth was almost a year's pay
➗ Philip's math still falls short
📖 Even that money could not feed them

## 👤 Andrew, Simon Peter's Brother

Andrew already appears earlier in John's gospel as one of the first disciples called.

John often identifies Andrew by naming his more famous brother.

Peter is not even present in this particular scene.

Andrew notices a small detail that the other disciples missed entirely.

👤 Andrew was one of the first disciples
🔗 John identifies him through his brother Peter
👀 Andrew notices a detail others missed
📖 A small observation becomes important here

## 🧒 A Lad Here, Which Hath Five Barley Loaves, And Two Small Fishes

A lad simply means a young boy, likely a servant carrying food.

Barley loaves were the cheapest, most common bread of the poor.

Wheat bread was considered finer and cost far more to buy.

This boy's lunch was ordinary, small, and easy to overlook.

🧒 A lad means a young boy
🍞 Barley bread was common and cheap
🐟 Two small fish rounded out the meal
📖 This small lunch was easy to overlook

## 😕 But What Are They Among So Many

Andrew voices the same doubt that Philip already raised.

He brings the boy forward but still does not expect much to come of it.

Five loaves and two fish look tiny next to five thousand people.

The miracle has not happened yet, only the raw materials have arrived.

😕 Andrew still doubts it will help
🙋 He brings the boy forward anyway
⚖️ The food looks tiny next to the crowd
📖 Only the raw materials have arrived

# John 6:10-13
# 🧺 Five Loaves Feed Five Thousand
---

## 🪑 Make The Men Sit Down

Sitting down for a meal was the normal custom at a shared table.

There was much grass in that place, soft ground perfect for a crowd.

Jesus organizes the crowd before he does anything miraculous.

Order comes before the miracle, not after it.

🪑 Sitting down was the normal custom
🌱 Soft grass made a natural table
📋 Jesus organizes the crowd first
📖 Order comes before the miracle

## 🔢 In Number About Five Thousand

This count almost certainly includes only the men present.

Women and children following the custom of the day likely went uncounted.

The real crowd that day may have been far larger than five thousand.

Feeding even the stated number already required a genuine miracle.

🔢 Five thousand likely counted only men
👧 Women and children were likely uncounted
📈 The real crowd may have been larger
📖 Feeding even this many was still a miracle

## 🙏 When He Had Given Thanks, He Distributed

Giving thanks before a meal was standard Jewish practice.

Jesus blesses the food before anything multiplies.

He hands the bread to the disciples, not directly to the crowd.

The disciples become the ones who carry the miracle outward.

🙏 Giving thanks before eating was standard
🍞 Jesus blesses the food first
🤲 He hands it through the disciples
📖 The disciples carry the miracle outward

## 🧺 Gather Up The Fragments That Remain, That Nothing Be Lost

Fragments means the broken pieces left over after everyone had eaten.

Jesus commands that none of this food go to waste.

Wasting food, even leftovers, went against careful Jewish practice.

Abundance from God is never a reason for carelessness.

🧺 Fragments means leftover broken pieces
🚫 Jesus commands that none be wasted
🍞 Wasting food broke careful Jewish practice
📖 Abundance is no excuse for carelessness

## 🧺 Filled Twelve Baskets With The Fragments

Twelve baskets likely connects to the twelve apostles, each filling one.

Some see a second connection to the twelve tribes of Israel.

There was more food left over than the original five loaves.

The leftovers proved the miracle was real, not simply enough to go around.

🧺 Twelve baskets may match twelve apostles
📜 It may also echo the twelve tribes
📈 Leftovers outweighed the original five loaves
📖 The leftovers proved the miracle real

# John 6:14-15
# 👑 That Prophet, Made A King
---

## 📜 This Is Of A Truth That Prophet

That prophet points back to a promise Moses made in Deuteronomy.

Moses said God would one day raise up a prophet like himself.

The crowd connects this miracle directly to that old prophecy.

They are right about who Jesus is, but still wrong about what he came to do.

📜 That prophet points to Moses's promise
🥖 This miracle fits that old prophecy
✅ The crowd gets the identity right
📖 They still misunderstand his mission

## 👑 Take Him By Force, To Make Him A King

The crowd wants to crown Jesus as a political and military leader.

They are thinking of a king who feeds them and fights for them.

Jesus never came to seize an earthly throne by force.

This temptation toward power returns again later in his ministry.

👑 The crowd wants an earthly king
⚔️ They imagine a leader who fights for them
🙅 Jesus never sought that kind of throne
📖 This same temptation returns later

## 🚶 He Departed Again Into A Mountain Himself Alone

Jesus deliberately removes himself from the crowd's growing excitement.

Being alone here likely means time spent in prayer.

He refuses the shortcut to power that the crowd is offering.

True authority, for Jesus, never came from a crowd's applause.

🚶 Jesus removes himself from the crowd
🙏 Alone time likely meant prayer
🙅 He refuses this shortcut to power
📖 True authority never came from applause

# John 6:16-21
# 🌊 Walking On The Sea
---

## 🌅 His Disciples Went Down Unto The Sea

Evening in this region meant the workday and travel were ending.

The disciples head back toward the boats without Jesus at first.

They expect to cross the lake back toward Capernaum.

Jesus stays behind, still alone in the hills.

🌅 Evening meant the day was ending
⛵ The disciples head toward the boats
🏘️ Capernaum was their destination
📖 Jesus remains alone in the hills

## 🌑 It Was Now Dark, And Jesus Was Not Come To Them

The disciples set out without waiting for Jesus to join them.

Darkness on open water made travel more dangerous.

John notes plainly that Jesus was not with them yet.

That absence sets up exactly what happens next on the water.

🌑 Darkness made the crossing dangerous
⛵ They set out without Jesus
👀 John notes his absence plainly
📖 That absence sets up what follows

## 🌬️ The Sea Arose By Reason Of A Great Wind

The Sea of Galilee sits in a bowl surrounded by hills.

Sudden, violent storms could form there with very little warning.

Experienced fishermen among the disciples would have known real danger from a wind like this.

Fear, not simple discomfort, is the right word for this moment.

🌬️ Sudden storms were common on this lake
⛰️ Hills around it could trap fierce wind
🎣 Even experienced fishermen recognized real danger
📖 Fear fits this moment, not discomfort

## 😨 They See Jesus Walking On The Sea, And They Were Afraid

Walking on the sea was never meant to look like a magic trick.

Only God, in the Old Testament, is described as treading on the waves.

The disciples are terrified because they sense exactly what that means.

This sign points straight at who Jesus actually is.

🌊 Walking on water echoes God's own power
📜 Only God treads the sea in scripture
😨 The disciples sense what this means
📖 The sign points to who Jesus is

## 🗣️ It Is I, Be Not Afraid

It is I translates a phrase that can also simply mean I am.

That same phrase echoes God's own name revealed to Moses.

Jesus calms their fear with his identity, not with an explanation.

Knowing who he is settles the fear inside them before the storm outside ever stops.

🗣️ It is I may echo I am
🔥 That phrase recalls God's name to Moses
❤️ His identity calms their fear
📖 Knowing him settles fear before the storm does

## ⚡ Immediately The Ship Was At The Land

The other gospels describe a long, exhausting struggle against the wind.

John simply records that the boat arrived immediately once Jesus came aboard.

This sudden shift suggests another quiet miracle folded into the storm.

Jesus does not just calm storms, he can also end the distance itself.

⛵ Other gospels describe a long struggle
⚡ John records a sudden arrival instead
🌊 This suggests another quiet miracle
📖 Jesus can end distance, not just storms

# John 6:22-27
# 🔍 Seeking Loaves, Not Signs
---

## ⛵ There Was None Other Boat There

The crowd left behind notices there was only one boat the night before.

They know the disciples left without Jesus in that single boat.

This detail makes Jesus's disappearance genuinely puzzling to them.

Confusion about how he left will eventually push them to go looking for him.

⛵ Only one boat had left the shore
🤔 Jesus was not in that boat
❓ His disappearance confuses the crowd
📖 Confusion sends them looking for him

## 🏛️ There Came Other Boats From Tiberias

Tiberias sat a short distance along the same shoreline.

These boats arrive later, offering the crowd a way across the lake.

John includes this small detail to explain how the crowd could follow at all.

Even minor details in this gospel usually serve the larger story.

🏛️ Tiberias sat nearby on the shore
⛵ New boats gave the crowd a ride
🧩 This explains how they could follow
📖 Small details often serve the larger story

## ⛵ They Also Took Shipping, And Came To Capernaum, Seeking For Jesus

The crowd crosses the lake specifically to track Jesus down.

Capernaum served as his home base for much of his ministry.

Seeking him here looks like devotion on the surface.

Their real motive comes out clearly just a few verses later.

⛵ The crowd crosses the lake to find him
🏘️ Capernaum was his home base
🙏 Their search looks devoted at first
📖 Their true motive comes out soon

## 📚 Rabbi, When Camest Thou Hither

Rabbi was a respectful Jewish title meaning teacher.

Camest thou hither is an old way of asking when did you get here.

Their question focuses entirely on the logistics of his travel.

Jesus will answer a very different question than the one they actually asked.

📚 Rabbi is a respectful title for teacher
❓ Camest thou hither means when did you arrive
🚶 Their question focuses on travel logistics
📖 Jesus answers a deeper question instead

## 🍞 Ye Did Eat Of The Loaves, And Were Filled

Jesus names their real motive without any softening.

They are not following him because of what the miracle revealed about God.

They are following him because their stomachs were satisfied for free.

Jesus wants them hungry for something that free bread can never satisfy.

🍞 They followed for a free meal
🙅 It was not about what the sign revealed
😋 Full stomachs, not faith, drove them
📖 Jesus wants a deeper hunger in them

## 🍞 Labour Not For The Meat Which Perisheth

Meat here is an old word for food in general, not just flesh.

Perisheth means it spoils, runs out, or simply does not last.

Jesus contrasts that ordinary food with food that lasts into eternal life.

God the Father has personally approved the Son to give this lasting food.

🍞 Meat here simply means food
⏳ Perisheth means it does not last
🌱 Eternal food is the real contrast
📖 The Father approved the Son to give it

# John 6:28-33
# 🍞 True Bread From Heaven
---

## ✅ What Shall We Do, That We Might Work The Works Of God

The crowd assumes pleasing God means completing a checklist of good deeds.

Their question treats salvation like a job with tasks to finish.

This is the natural, human way to think about earning favor with God.

Jesus is about to completely reframe their question.

✅ They assume God wants a checklist
💼 Salvation feels like a job to them
🤔 This is the normal human instinct
📖 Jesus is about to reframe it

## 🙏 This Is The Work Of God, That Ye Believe On Him Whom He Hath Sent

Jesus answers a question about many works with a single word, believe.

Belief here means trust placed in a person, not a task completed.

He points their trust directly toward himself, the one God sent.

Every other good work flows out from that one act of trust.

🙏 Believe replaces a checklist of works
❤️ Trust is placed in a person
🎯 That person is the one God sent
📖 Other good works flow from this trust

## 📜 What Sign Shewest Thou Then, That We May See, And Believe Thee

Shewest is an old word that simply means show.

The crowd just ate bread multiplied from almost nothing the day before.

Somehow they still ask for a sign to prove who Jesus is.

Their request for proof exposes how quickly yesterday's miracle has already faded from their minds.

📜 Shewest is an old word for show
🍞 They just witnessed a feeding miracle
❓ Yet they still demand more proof
➡️ Yesterday's miracle has already faded

## 🍞 Our Fathers Did Eat Manna In The Desert

Manna was the bread God provided daily during Israel's forty years in the wilderness.

The crowd brings up this old story to raise the bar for Jesus.

They expect a sign that matches or beats what Moses once did.

Quoting scripture does not always mean understanding what it was pointing toward.

🍞 Manna fed Israel in the wilderness
📈 The crowd wants a bigger sign
📜 They expect Jesus to beat Moses
📖 Quoting scripture is not understanding it

## 🙅 Moses Gave You Not That Bread From Heaven

Jesus corrects a popular assumption about where the manna truly came from.

Moses was never the real source of that bread, only its messenger.

God himself provided the manna through Moses the whole time.

Jesus is quietly separating the gift from the one who delivered it.

🙅 Moses was not the true source
📬 He only delivered what God provided
👑 God himself gave the manna
📖 Jesus separates the gift from the messenger

## 🍞 The Bread Of God Is He Which Cometh Down From Heaven

Jesus shifts the conversation from bread as food to bread as a person.

This true bread gives life to the whole world, not just Israel.

The gift Moses gave pointed forward to a far greater gift.

Jesus is describing himself here, though he has not said so outright yet.

🍞 Bread now means a person, not food
🌍 This bread gives life to the world
👉 Moses's gift pointed toward a greater one
📖 Jesus is quietly describing himself

# John 6:34-40
# 🍞 I Am The Bread Of Life
---

## 🍞 Lord, Evermore Give Us This Bread

The crowd asks for this bread the same way they asked for free loaves earlier.

They still think in terms of a food that needs to be eaten daily.

Jesus is about to answer with something far bigger than their request.

Misunderstanding him here shapes the entire discourse that follows.

🍞 They picture ordinary bread again
🔁 They want food they can keep eating
🎯 Jesus answers with something bigger
📖 This misunderstanding shapes the discourse ahead

## 🍞 I Am The Bread Of Life

Jesus finally states directly what the manna and the loaves pointed toward.

Bread was the most basic, universal food in that culture.

Calling himself bread means he is as necessary as food itself.

Coming to him ends a hunger no meal could ever satisfy.

A person, not a product, truly satisfies that hunger.

🍞 Bread was the most basic food
❤️ Jesus claims to be that necessary
🚫 Coming to him ends spiritual hunger
📖 A person, not a product, satisfies it

## 👀 Ye Also Have Seen Me, And Believe Not

Jesus points out a painful contradiction in the crowd standing before him.

They witnessed real miracles with their own eyes just the day before.

Seeing was never going to be enough to produce real belief.

Evidence alone cannot force a person's heart to trust.

👀 They saw real miracles firsthand
🙅 Seeing did not produce belief
❤️ Belief is a matter of the heart
📖 Evidence alone cannot force trust

## 🤝 All That The Father Giveth Me Shall Come To Me

Jesus describes coming to him as something the Father enables.

This idea of the Father giving people to the Son returns later in this chapter.

It does not erase human choice, it grounds that choice in God's initiative.

No one who truly comes to Jesus will ever be turned away.

🤝 The Father enables people to come
🔁 This idea returns later in the chapter
🙏 Human choice rests on God's initiative
📖 No one who comes is turned away

## 🚫 Him That Cometh To Me I Will In No Wise Cast Out

In no wise is an old way of saying not under any circumstances.

This is one of the strongest promises Jesus makes in this entire gospel.

Past failures or doubts do not disqualify someone who comes to him.

The invitation stays open no matter what someone brings with them.

🚫 In no wise means never, no exceptions
💪 This is one of his strongest promises
❤️ Past failure does not disqualify anyone
📖 The invitation stays open for everyone

## 👑 I Came Down From Heaven, Not To Do Mine Own Will

Jesus claims a heavenly origin that no mere human teacher could claim.

He also makes clear his mission follows the Father's will, not his own preference.

Perfect obedience, not independence, defines his entire purpose on earth.

This claim builds directly on the bread from heaven he mentioned earlier.

👑 Jesus claims a heavenly origin
🎯 His mission follows the Father's will
🙏 Obedience defines his purpose here
📖 This builds on the bread from heaven

## 🤲 That I Should Lose Nothing, But Should Raise It Up Again At The Last Day

The Father has given Jesus a specific group of people to keep safe.

Losing nothing means not one of them will ultimately slip away from him.

The last day refers to the final resurrection at the end of time.

Jesus personally guarantees their future, not just their present.

🤲 The Father entrusted people to Jesus
🔒 Losing nothing means none slip away
⏳ The last day means the final resurrection
📖 Jesus guarantees their future, not just today

## 👀 Every One Which Seeth The Son, And Believeth On Him, May Have Everlasting Life

Seeing the Son here means recognizing who Jesus truly is, not simply looking at him.

Believing adds trust on top of that recognition.

Both together lead to a life that never ends.

Jesus repeats the promise to raise believers up at the last day for emphasis.

This verse closes the first half of the bread of life teaching.

👀 Seeing means recognizing who Jesus is
🙏 Belief adds trust to that recognition
♾️ Together they lead to everlasting life
📖 This closes the first half of the teaching

# John 6:41-46
# 😠 The Jews Murmur
---

## 😠 The Jews Then Murmured At Him

Murmured means they complained in low, grumbling voices, not open argument.

This same word describes Israel's complaints against God in the wilderness long ago.

John deliberately echoes that old story here.

A new generation is repeating an old pattern of doubt.

😠 Murmured means grumbling complaints
📜 The same word describes Israel's old complaints
🔁 John echoes that old story on purpose
📖 A new generation repeats an old pattern

## 👪 Is Not This Jesus, The Son Of Joseph, Whose Father And Mother We Know

The crowd knows Jesus only by his earthly, human family.

They assume a familiar background rules out any heavenly origin.

Familiarity becomes the very thing that blinds them here.

Knowing someone's hometown does not mean knowing who they truly are.

👪 They know his human family
🙅 Familiarity blinds them to more
🏘️ A familiar hometown misleads them
📖 Knowing someone's past is not knowing them

## 🗣️ Murmur Not Among Yourselves

Jesus addresses their complaints directly instead of ignoring them.

He does not try to prove his heavenly origin with more arguments right away.

Instead he explains why some people believe and others do not.

The next few verses answer the deeper question behind their grumbling.

🗣️ Jesus addresses the complaints directly
🙅 He skips a long argument for now
🔍 He explains belief and unbelief instead
📖 The next verses answer their real question

## 🧲 No Man Can Come To Me, Except The Father Draw Him

Coming to Jesus is never purely a matter of human willpower alone.

Draw here pictures God actively pulling a person toward belief.

This does not erase a person's own choice to respond.

It means God moves first, before anyone ever reaches toward him.

🧲 Draw pictures God pulling someone close
🙏 Belief is never pure willpower alone
🤝 Choice still matters in the response
📖 God moves first, before anyone reaches

## 📜 It Is Written In The Prophets, And They Shall Be All Taught Of God

Jesus quotes language echoing the prophets Isaiah and Jeremiah here.

Those prophets promised a future where God himself would teach his people directly.

Learning from the Father and coming to Jesus turn out to be the same thing.

An old promise is quietly being fulfilled in this very conversation.

📜 This echoes promises from the prophets
🎓 God himself would teach his people
🔗 Learning from the Father leads to Jesus
📖 An old promise is being fulfilled now

## 🙅 Not That Any Man Hath Seen The Father

Jesus is not claiming that anyone has physically seen God the Father.

Only Jesus himself, who comes from God, has truly seen him.

This protects his earlier claim from being misunderstood as ordinary mysticism.

His unique access to the Father backs up everything he has taught so far.

🙅 No one has physically seen the Father
👁️ Only Jesus has truly seen him
🔒 This protects his claim from confusion
📖 His access backs up his teaching

# John 6:47-51
# 🍞 Living Bread From Heaven
---

## ⏳ He That Believeth On Me Hath Everlasting Life

Jesus states this promise in the present tense, not the future.

Everlasting life begins the moment someone truly believes, not after death.

This repeats a promise already made earlier in this same discourse.

Repetition here signals just how central this truth really is.

⏳ Life begins now, not just later
🙏 Belief is the condition stated here
🔁 This repeats an earlier promise
📖 Repetition shows how central this truth is

## 🍞 I Am That Bread Of Life

Jesus restates his earlier claim before pushing the image further.

This repetition anchors everything he is about to say about eating this bread.

The image is about to move from a title into something far more vivid.

What sounds strange next only makes sense once this claim is remembered.

🍞 Jesus restates his earlier claim
⚓ This claim anchors what comes next
🔀 The image is about to grow stranger
📖 Remembering this claim keeps it clear

## 🍞 Your Fathers Did Eat Manna In The Wilderness, And Are Dead

Manna kept Israel's ancestors alive only for a single lifetime.

Every one of them still eventually died like everyone else.

Jesus draws a sharp line between that old bread and himself.

Physical bread, no matter how miraculous, could never defeat death itself.

🍞 Manna only sustained one lifetime
⚰️ Every ancestor who ate it still died
🔀 Jesus draws a sharp contrast here
📖 No physical bread can defeat death

## 📖 This Is The Bread Which Cometh Down From Heaven, That A Man May Eat Thereof, And Not Die

Thereof is an old word that simply means of it.

This bread does what manna never could.

It defeats death permanently.

Eating here already hints at more than ordinary food.

Jesus is building toward a claim that will shock his listeners.

📖 Thereof is an old word for of it
💀 This bread defeats death permanently
🍞 Eating hints at more than food
➡️ A shocking claim is coming next

## ♾️ If Any Man Eat Of This Bread, He Shall Live For Ever

Living forever here means a life that death simply cannot end.

This promise is offered to any man, with no exceptions listed.

The offer is wide open, not limited to any one group of people.

Jesus is about to explain exactly what this bread actually is.

♾️ Living forever means death cannot end it
🌍 Any man means no exceptions
🚪 The offer is wide open to all
📖 Jesus is about to explain the bread

## 🎁 The Bread That I Will Give Is My Flesh

Jesus finally names the bread plainly, and the claim is startling.

He is speaking here about his own body, given for others.

This looks forward directly to his coming death on the cross.

His death is described here as a gift given for the entire world, not only for Israel.

😮 The claim is startling and plain
✝️ This points toward his coming death
🎁 His death is described as a gift
📖 This gift reaches the entire world

# John 6:52-59
# 🍷 Eat My Flesh, Drink My Blood
---

## 😤 The Jews Therefore Strove Among Themselves

Strove means they argued sharply with each other, not just grumbled quietly.

Jesus's words about eating his flesh sound shocking and even repulsive to them.

Jewish law strictly forbade drinking any blood at all.

Their confusion makes sense, taken only at face value.

😤 Strove means sharp arguing, not grumbling
🚫 Jewish law forbade drinking blood
😳 His words sound shocking and strange
📖 Their confusion makes sense at face value

## 🚫 Except Ye Eat The Flesh Of The Son Of Man, Ye Have No Life In You

Jesus refuses to soften or explain away his hard words here.

Eating and drinking picture receiving him completely, not merely admiring him from a distance.

This language later shapes how the church understands communion.

Without this kind of total reception, Jesus says there is no real life at all.

🚫 Jesus does not soften this saying
🤲 Eating pictures fully receiving him
🍞 This shapes later Christian communion
📖 Without receiving him there is no life

## 🔁 Whoso Eateth My Flesh, And Drinketh My Blood, Hath Eternal Life

Jesus restates the same hard truth from a positive direction this time.

Eternal life and being raised at the last day are tied directly together here.

This is the fourth time in this discourse that he repeats this exact promise.

Repetition this heavy ensures no one misses the point.

🔁 He restates the same truth positively
⏳ Eternal life ties to the last day
🔢 This is the fourth repeated promise
📖 Heavy repetition ensures no one misses it

## 🍞 My Flesh Is Meat, And My Blood Is Drink

Jesus insists his flesh and blood are real nourishment, not just a symbol.

Meat here is an old word for food in general.

This claim pushes past metaphor into something his listeners found hard to accept.

Real nourishment, in his language, now comes from a person, not a product.

🍞 Meat is an old word for food
💪 He insists this nourishment is real
😳 Listeners found this hard to accept
📖 Real nourishment now comes from a person

## 📖 He That Eateth My Flesh, And Drinketh My Blood, Dwelleth In Me

Dwelleth is an old word that simply means lives or remains.

This pictures a relationship far closer than simple belief or agreement.

Jesus describes a mutual, ongoing closeness between himself and the believer.

This same language of mutual dwelling returns later in John's gospel.

📖 Dwelleth is an old word for remains
🤝 This pictures a close, mutual relationship
🔁 Belief grows into lasting closeness
➡️ This language returns later in John

## 🔗 As The Living Father Hath Sent Me, And I Live By The Father

Jesus ties his own life directly to his relationship with the Father.

He draws a parallel between that bond and the believer's bond with him.

Just as the Son depends on the Father, the believer depends on the Son.

This chain of dependence runs all the way from God to the believer.

🔗 Jesus ties his life to the Father
⚖️ He draws a direct parallel
🤝 Believers depend on him the same way
📖 Dependence runs from God to believer

## 🍞 This Is That Bread Which Came Down From Heaven

Jesus closes this section by contrasting himself with manna one final time.

Manna fed people for a day and still ended in death.

This bread feeds a believer forever and ends in life.

The whole bread of life teaching lands on this one sharp contrast.

🍞 Jesus closes with one final contrast
⏳ Manna fed for only a day
♾️ This bread feeds a believer forever
📖 The whole teaching lands on this contrast

## 🏛️ These Things Said He In The Synagogue, As He Taught In Capernaum

A synagogue was the local Jewish gathering place for worship and teaching.

John anchors this entire difficult teaching to a specific place and moment.

These were not private words shared with only a few close friends.

Jesus taught this publicly, to a crowd able to react to him directly.

🏛️ A synagogue was the local worship place
📍 John anchors this to one real moment
🗣️ This was public, not private, teaching
📖 The crowd could react to him directly

# John 6:60-65
# 😳 A Hard Saying
---

## 😕 This Is An Hard Saying, Who Can Hear It

An hard saying means a teaching that is difficult to accept, not difficult to understand.

Many who had followed Jesus closely now openly admit their struggle.

Their complaint is honest confusion, not outright rejection just yet.

Hard teaching often separates curious followers from committed ones.

😕 Hard saying means hard to accept
🗣️ Many disciples openly admit struggling
🤔 This is honest confusion, not rejection yet
📖 Hard teaching separates curious from committed

## 👀 Doth This Offend You

Jesus notices their murmuring without needing anyone to tell him directly.

Offend here means to cause someone to stumble or turn away.

He asks the question instead of softening his earlier words.

Jesus never once backs away from a hard teaching to keep a crowd.

👀 Jesus senses their murmuring directly
🚫 Offend means causing someone to stumble
🗣️ He asks instead of softening his words
📖 Jesus never waters down truth for a crowd

## ⬆️ What And If Ye Shall See The Son Of Man Ascend Up Where He Was Before

Jesus points forward to his own return to heaven after his death.

This claim is even harder to accept than eating his flesh.

If his flesh and blood language confused them, his heavenly origin confuses them further.

Jesus is preparing them for truths far bigger than this single moment.

⬆️ Jesus points to his future ascension
😳 This claim is even harder to accept
🤯 His heavenly origin confuses them further
📖 Jesus prepares them for bigger truths

## 📖 It Is The Spirit That Quickeneth, The Flesh Profiteth Nothing

Quickeneth is an old word that simply means gives life.

Profiteth nothing means it accomplishes nothing of real spiritual value.

Jesus clarifies that he never meant eating literal human flesh.

His words carry spirit and life, not instructions for cannibalism.

📖 Quickeneth is an old word for gives life
🚫 Profiteth nothing means no real value
🙅 He never meant literal human flesh
➡️ His words carry spirit and life

## 👁️ Jesus Knew From The Beginning Who They Were That Believed Not

Jesus was never caught off guard by anyone's unbelief.

This includes a direct, early mention of his coming betrayer.

John wants readers to know that Judas's betrayal was never a surprise to Jesus.

Foreknowledge like this runs throughout the entire gospel of John.

👁️ Jesus was never caught off guard
🗣️ This hints at his coming betrayer
🔮 Judas's betrayal was no surprise to him
📖 Foreknowledge runs through this whole gospel

## 🔁 No Man Can Come Unto Me, Except It Were Given Unto Him Of My Father

Jesus repeats the same truth about the Father's role that he stated earlier.

This repetition closes the loop on why some believe and others do not.

Human choice and God's initiative sit together here, not against each other.

This hard teaching rests on the same foundation as everything else he has said.

🔁 Jesus repeats the Father's role again
🔒 This closes the loop on belief
🤝 Choice and God's initiative sit together
📖 This rests on the same foundation as before

# John 6:66-69
# 🚶 Many Walked No More With Him
---

## 👥 Many Of His Disciples Went Back, And Walked No More With Him

Disciples here refers to a wider group of followers, not only the twelve apostles.

This is the clearest moment in the gospels where a crowd of followers simply leaves.

The hard teaching about eating his flesh and drinking his blood costs Jesus real numbers.

Jesus allows this loss.

He does not chase the crowd back with easier words.

👥 Disciples here means a wider group
🚶 Many followers simply walk away now
📉 The hard teaching costs him real numbers
📖 Jesus never softens his words for anyone

## 👥 Will Ye Also Go Away

Jesus turns directly to the twelve after watching the larger crowd leave.

He does not beg them to stay or soften what he just taught.

The question leaves the choice entirely open and genuinely theirs to make.

Real faith was never going to be built on pressure or guilt.

👥 Jesus turns to the twelve directly
🙅 He does not beg them to stay
🚪 The choice is left genuinely open
📖 Real faith is never built on pressure

## 🗣️ Lord, To Whom Shall We Go? Thou Hast The Words Of Eternal Life

Peter answers for the group, as he often does throughout the gospels.

His answer admits he does not fully understand the hard teaching either.

What keeps him there is not full understanding.

It is trust in who Jesus is.

There was nowhere else worth going, even with real confusion unsettled.

🗣️ Peter speaks for the whole group
🤔 He admits he does not fully understand
❤️ Trust keeps him there, not full clarity
📖 There was nowhere else worth going

## 👑 We Believe And Are Sure That Thou Art That Christ, The Son Of The Living God

Christ means the anointed one, the promised deliverer Israel had long awaited.

Peter's confession names both Jesus's role and his true identity together.

This moment mirrors Peter's fuller confession later recorded in Matthew's gospel.

A hard teaching that emptied the crowd deepens the faith of those who stayed.

👑 Christ means the promised anointed one
🗣️ Peter names Jesus's role and identity
🔁 This mirrors Peter's confession in Matthew
📖 Hard teaching deepened the faith that remained

# John 6:70-71
# 😈 One Of You Is A Devil
---

## 🤲 Have Not I Chosen You Twelve, And One Of You Is A Devil

Jesus reminds the twelve that he personally chose each one of them.

Even that personal choice did not guarantee every single heart was faithful.

Calling someone a devil here points to a nature opposed to God, not literal possession.

This warning sits right beside Peter's beautiful confession just one verse earlier.

🤲 Jesus personally chose all twelve
💔 Chosen status did not guarantee faithfulness
😈 Devil here means opposed to God
📖 This warning follows Peter's confession closely

## 🗣️ He Spake Of Judas Iscariot, For He It Was That Should Betray Him

John names Judas plainly so no reader is left guessing.

Iscariot likely identifies the town or family Judas came from.

John adds that Judas was counted among the twelve, which makes the betrayal worse.

A hard teaching, a mass departure, and a coming betrayal all converge in this one chapter.

🗣️ John names Judas plainly here
📍 Iscariot likely names his town or family
💔 Judas was counted among the twelve
📖 Betrayal, departure, and hard teaching converge here`.trim();

export const JOHN_SIX_PERSONAL_SECTIONS = parseJohnSixRawNotes(JOHN_SIX_RAW_NOTES);
