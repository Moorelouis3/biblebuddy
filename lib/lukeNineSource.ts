export type LukeNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeNineRawNotes(rawText: string): LukeNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 9:${startVerse}` : `Luke 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 16) {
    throw new Error("Expected 16 Luke 9 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_NINE_RAW_NOTES = `# Luke 9:1-6
# 📡 Sent Out With Nothing
---
## 👑 Power And Authority Over All Devils

Power means the raw ability to do something.

Authority means the right to do it.

Jesus gives his twelve disciples both at once over evil spirits.

Their power to cast out devils is borrowed, not their own.

💪 Power means ability to act
👑 Authority means the right to act
👹 Both were given over devils
📖 Their power came from Jesus, not themselves

## 🩺 To Cure Diseases

Cure here means healing ordinary physical sickness.

This gift is separate from the power over evil spirits just given.

Doctors in that world could do very little for most diseases.

A healed body became visible proof that God's kingdom had actually arrived.

🩺 Cure means healing sickness
🔀 This differs from power over devils
⚕️ Doctors then could help little
📖 Healed bodies proved the kingdom had come

## 🗣️ To Preach The Kingdom Of God

Preach means to announce something publicly, not just discuss it quietly.

The kingdom of God is God's rule breaking into the world through Jesus.

The twelve are now sent to say this out loud in every town.

Jesus multiplies his own mission by sending others to carry it.

📣 Preach means announce it publicly
👑 The kingdom is God's rule arriving
🚶 They carried the message town to town
📖 Jesus multiplied his mission through them

## 🎒 Neither Staves, Nor Scrip

A staff was a walking stick used for support on long journeys.

Scrip was a small traveling bag for carrying food and supplies.

Jesus tells them to leave behind even these basic traveling tools.

Trusting God for daily needs was the whole point of this trip.

🚶 Staves means a walking stick
🎒 Scrip means a small travel bag
🚫 Both were left behind on purpose
📖 The trip tested trust in God

## 🍞 Neither Bread, Neither Money

Bread was the basic food anyone would normally pack for a trip.

Money would have let them simply buy whatever they needed along the way.

Taking neither forced them to depend on the people they visited.

Ministry here could not run on being fully self sufficient.

🍞 Bread meant their basic food
💰 Money would have bought supplies
🤝 Neither was allowed, on purpose
📖 They had to depend on others

## 🧥 Two Coats Apiece

A coat in that world doubled as a blanket at night.

Carrying a spare coat was simply normal planning for a trip like this.

Jesus forbids even that one reasonable extra.

The rule pushes them past caution into real dependence on God.

🧥 A coat doubled as a blanket
🎒 A spare was normal planning
🚫 Jesus forbade even that extra
📖 Dependence on God replaced caution

## 🏠 There Abide, And Thence Depart

Abide means to stay put in one place.

Once welcomed into a house, they were not to go looking for a better one.

Moving between houses in the same town would have looked greedy or ungrateful.

Staying put let their focus remain on the mission, not on comfort.

🏠 Abide means to stay put
🚫 No searching for a better house
🙏 Moving around looked ungrateful
📖 Comfort was never the point

## 👣 Shake Off The Very Dust From Your Feet

Dust clung to bare feet on the dry roads of that region.

Shaking it off in public was a clear, visible act, not a private feeling.

The gesture said this town's welcome, or refusal, had been formally noted.

It separated the messenger from any responsibility for that town's response.

👣 Dust clung to the roads there
👀 Shaking it off was a visible act
📝 It formally noted the town's refusal
📖 The messenger was no longer responsible

## ⚖️ For A Testimony Against Them

Testimony here means evidence used later, not a passing complaint.

Rejecting God's messengers was treated as rejecting God himself.

The dust shaken off became that evidence, carried forward into judgment.

A town's welcome, or lack of it, would matter beyond that single day.

⚖️ Testimony means evidence for later
🙅 Rejecting them meant rejecting God
👣 The dust itself became the evidence
📖 Choices that day carried lasting weight

## 🩹 Preaching The Gospel, And Healing Every Where

Gospel means good news, specifically the news that God's kingdom had arrived.

The disciples carried out exactly what Jesus had just commanded them.

Preaching and healing traveled together everywhere they went, never one without the other.

Luke sums up a whole mission trip in a single short verse.

📣 Gospel means good news of the kingdom
🩹 Healing went everywhere with the preaching
🔁 Word and deed stayed together
📖 One verse summed up the whole trip

# Luke 9:7-9
# 😕 Herod Is Perplexed
---
## 👑 Herod The Tetrarch Heard

A tetrarch ruled only a fourth part of a larger kingdom, not the whole thing.

Herod here is Herod Antipas, son of the Herod from Jesus's birth story.

News of Jesus and his disciples traveling and healing had reached even the ruler's court.

Herod's reaction reveals a troubled conscience, not simple curiosity.

👑 Tetrarch means ruler of one part
👶 This is Herod Antipas, not his father
📣 News of Jesus reached the ruler's court
📖 His reaction showed a troubled conscience

## 💀 John Was Risen From The Dead

Herod had ordered John the Baptist beheaded not long before this.

Some in the crowd wondered if John had somehow come back to life.

The rumor reveals how much power people still sensed behind Jesus's works.

Herod himself cannot shake the guilt tied to this particular rumor.

💀 Herod had already beheaded John
🗣️ Some thought John had returned
⚡ The rumor showed Jesus's power was obvious
📖 Herod could not escape his own guilt

## 📜 Elias Had Appeared

Elias is the Greek form of the name Elijah, a major Hebrew prophet.

Jewish tradition expected Elijah to return before God's final day arrived.

Seeing Jesus work miracles made some assume the old prophet had come back.

Each guess tried to fit Jesus into a familiar box from the past.

📜 Elias is the Greek name for Elijah
⏳ Jewish tradition expected Elijah's return
🤔 His miracles fit that old expectation
📖 People tried to fit Jesus into the past

## 💀 John Have I Beheaded

Herod states this fact flatly, already certain of what he did.

Beheaded was a swift, final form of execution in that time.

Herod is not asking who John is, he already knows that answer.

His own flat confession makes the next question even heavier.

💀 Herod stated this flatly
⚔️ Beheading was swift and final
✅ He was certain of this fact
📖 His confession made his question heavier

## ❓ He Desired To See Him

Desired to see him shows curiosity mixed with real unease.

Herod already knows John is dead, so this new figure unsettles him.

He never actually arranges a meeting here, not until Jesus stands trial much later.

Herod wants answers but never admits what he is truly afraid of.

😟 Herod felt curiosity and unease together
😨 This new figure unsettled him
⏳ No meeting happened at this point
📖 His fear stayed hidden behind curiosity

# Luke 9:10-13
# 🍞 Give Ye Them To Eat
---
## 🙌 Told Him All That They Had Done

The apostles return from the mission trip Jesus sent them on at the start of this chapter.

They report back before resting, showing real accountability to Jesus.

This debrief pattern appears elsewhere in the gospels after a sent out mission.

Ministry here always circles back to Jesus, not just outward activity.

🙌 The apostles returned from their trip
📣 They reported back to Jesus
🔁 This debrief pattern repeats elsewhere
📖 Ministry circled back to Jesus

## 🏜️ A Desert Place Belonging To The City Called Bethsaida

Desert here means an empty, unpopulated area, not necessarily sand.

Bethsaida was a fishing town on the north shore of the Sea of Galilee.

Jesus withdraws there hoping for rest with his returning disciples.

That quiet plan does not survive contact with the crowd for long.

🏜️ Desert meant empty, not sandy
🎣 Bethsaida was a fishing town
😴 Jesus wanted quiet rest there
📖 That plan did not last long

## 👥 Spake Unto Them Of The Kingdom Of God

The crowd that finds Jesus gets his full attention anyway.

He keeps teaching the same core message he sent the twelve out to preach.

Healing and teaching happen side by side here, just as earlier in this chapter.

His own need for rest never outweighs the needs standing in front of him.

👥 The crowd found him anyway
👑 He kept teaching the same message
🩹 Healing and teaching happened together
📖 Their need outweighed his own rest

## 🌇 Send The Multitude Away

The day began to wear away means evening was approaching fast.

The disciples suggest a practical solution, sending people to buy food nearby.

Their plan sounds reasonable given how large and hungry the crowd had become.

Jesus is about to show them a very different plan entirely.

🌇 Evening was closing in fast
🍽️ The crowd needed food soon
🧭 Disciples suggested sending them away
📖 Jesus had a different plan

## 🏘️ Lodge, And Get Victuals

Victuals simply means food and provisions for the journey.

The disciples picture the crowd scattering into nearby towns to buy and eat.

That plan assumes the problem belongs to the crowd, not to Jesus.

Jesus is about to flip that assumption completely.

🏘️ Lodge meant finding a place to stay
🍞 Victuals meant food and provisions
🙋 The disciples saw it as the crowd's problem
📖 Jesus was about to flip that

## 🍞 Give Ye Them To Eat

Jesus hands the problem straight back to his own disciples.

This command sounds impossible given what they are about to say they have.

Jesus already knows what he intends to do before they even answer.

He is testing their faith, not asking for a supply report.

🍞 Jesus handed the problem back to them
😳 The command sounded impossible
🧠 Jesus already knew his plan
📖 He was testing their faith, not numbers

## 🐟 Five Loaves And Two Fishes

Five loaves of bread and two small fish were a modest lunch at best.

This amount was clearly meant for one person or a small group, not thousands.

The disciples name the exact shortage so the coming miracle cannot be mistaken for luck.

A small, specific number makes the coming multiplication unmistakable.

🐟 Five loaves and two fish
🍽️ This was food for very few
🔢 The exact number ruled out luck
📖 A small number made the miracle unmistakable

# Luke 9:14-17
# 🧺 Twelve Baskets Left Over
---
## 👨‍👩‍👧 About Five Thousand Men

This count includes only the men, not women and children also present.

The real crowd being fed that day was likely far larger than five thousand.

Naming a specific number again makes the coming miracle verifiable, not vague.

The size of the need matches the size of the miracle about to happen.

🔢 This counted only the men
👨‍👩‍👧 Women and children likely added more
✅ A specific number made it verifiable
📖 A huge need met a huge miracle

## 🪑 Sit Down By Fifties In A Company

Fifty in a company means organizing the massive crowd into small, countable groups.

This structure let everyone see exactly how much food was actually being given out.

Order like this also made serving thousands of people possible for just twelve men.

God's miracles here come wrapped in ordinary planning, not chaos.

🪑 Fifty formed one countable group
👀 Groups let everyone track the food
🧮 Order made serving thousands possible
📖 The miracle came wrapped in planning

## 🙆 Made Them All Sit Down

The disciples obey a plan that still made no obvious sense with so little food.

Their obedience happens before they see any proof it will work.

Sitting the crowd down treated the coming meal as already real.

Faith here looked like following instructions, not waiting for certainty first.

🙆 They obeyed before seeing proof
🪑 Sitting them down treated the meal as real
🧠 Faith looked like obedience here
📖 Certainty came after obedience, not before

## 🙏 Looking Up To Heaven, He Blessed Them

Looking up to heaven was a visible sign of where this food was really coming from.

Blessed here means giving thanks to God over the food before using it.

Jesus credits the Father publicly before a single person is fed.

Every miracle in this chapter points back to God, not to Jesus acting alone.

🙏 Looking up pointed to the source
🙌 Blessed meant giving thanks first
👑 Jesus credited the Father publicly
📖 Every miracle pointed back to God

## ✂️ Brake, And Gave To The Disciples

Brake simply means broke, the normal way bread was divided to share.

The miracle itself happens somewhere inside this ordinary, repeated action of breaking and handing out.

The text never describes the multiplication directly, only its result.

God's power often hides inside completely ordinary actions.

✂️ Brake means broke, for sharing
🔁 The disciples kept handing out bread
👀 The multiplication itself stays unseen
📖 God's power hid inside ordinary action

## 🧺 Twelve Baskets

Twelve baskets of leftovers matched the number of the twelve disciples who gathered them.

This was not a small miracle that barely stretched far enough.

Abundance, not just enough, was the actual point being made.

God provided more than enough, even after everyone present had already eaten their fill.

🧺 Twelve baskets matched the twelve disciples
📈 This was abundance, not barely enough
😋 Everyone had already eaten their fill
📖 God provided more than enough

# Luke 9:18-20
# ✝️ Whom Say Ye That I Am
---
## 🙏 As He Was Alone Praying

Jesus often withdraws to pray right before major turning points in Luke's gospel.

His disciples stay nearby even during this private time of prayer.

This same pattern happened before he chose the twelve disciples earlier in the book.

A major moment in the story is about to follow this prayer, just like before.

🙏 Jesus prayed before key moments
👥 His disciples stayed close by
🔁 This pattern repeats across Luke
📖 A major moment was about to follow

## 👥 Whom Say The People That I Am

Jesus asks what the crowds are saying about him, not what he already knows.

This question sets up a sharper, more personal one aimed only at the disciples.

Public opinion about Jesus varied widely across the region by this point.

Jesus wants his own followers to move past secondhand opinions.

👥 He asked about public opinion first
🗣️ Opinions about him varied widely
🎯 This set up a sharper question
📖 Jesus wanted more than secondhand opinions

## 📜 John The Baptist, Elias, Or One Of The Old Prophets

These three answers all guess that Jesus is someone returning from the past.

None of the crowd's guesses reach the actual truth about who Jesus is.

Every guess still treats Jesus as a forerunner, not as the one being prepared for.

Correct information about Jesus was circulating, but the right conclusion was still missing.

📜 All three guesses looked to the past
❌ None reached the full truth
🚶 Each treated Jesus as a forerunner
📖 Information was there, the conclusion was not

## 🙋 Whom Say Ye That I Am

Ye here is plural, aimed at every disciple standing there, not just one.

This question cannot be answered secondhand, from a rumor or a guess.

Peter speaks up, but the question was addressed to the whole group.

Every reader of this chapter eventually faces this same personal question.

🙋 Ye meant all the disciples
🚫 No secondhand answer would do
🗣️ Peter answered for the group
📖 Every reader faces this question too

## 👑 The Christ Of God

Christ is the Greek word for the Hebrew title Messiah, God's chosen anointed king.

Peter's answer goes far beyond the earlier guesses about returning prophets.

This is the clearest confession of who Jesus is given so far in Luke.

Jesus immediately moves to explain what kind of Christ he actually came to be.

👑 Christ means Messiah, God's anointed king
📈 Peter's answer went far beyond the guesses
✅ This was Luke's clearest confession yet
📖 Jesus explained what kind of Christ he was

# Luke 9:21-22
# ⚰️ The Son Of Man Must Suffer
---
## 🤫 Straitly Charged Them To Tell No Man

Straitly means strictly or firmly, stronger than a simple request.

Jesus silences the disciples right after Peter's huge confession, not before it.

The timing was not yet right for this truth to spread publicly.

Jesus controls when and how this news gets revealed.

🤫 Straitly means strictly ordered
⏳ This came right after Peter's confession
🙅 The timing was not yet right
📖 Jesus controlled when this spread

## 😔 The Son Of Man Must Suffer Many Things

Son of man is a title Jesus often uses for himself, pointing to his humanity and his coming authority.

Must here means this suffering is required, not simply one possible outcome.

This directly contradicts any idea of a Christ who only conquers and never suffers.

Jesus begins preparing his disciples for a very different kind of king.

👤 Son of man was Jesus's own title
📌 Must means required, not optional
💔 A suffering Christ broke expectations
📖 Jesus prepared them for a different king

## ⚖️ Rejected Of The Elders And Chief Priests And Scribes

Elders, chief priests, and scribes together formed the religious leadership of Israel.

Rejected here means these leaders would actively refuse and oppose him.

This prediction comes true across the final chapters of Luke's gospel.

The very people expected to recognize the Christ would instead reject him.

⚖️ These three groups led religious Israel
🙅 Rejected meant active, open opposition
📅 This came true later in Luke
📖 Expected recognition turned into rejection

## 🌅 Be Slain, And Be Raised The Third Day

Slain means killed, stated here as plainly as possible.

The third day points forward to the resurrection, not a vague future idea.

Jesus names his death and his return to life in the very same breath.

Suffering in this prediction is never the end of the story.

⚰️ Slain means killed, stated plainly
🌅 The third day points to resurrection
🔗 Death and rising are named together
📖 Suffering was never the end

# Luke 9:23-27
# 🪵 Take Up His Cross Daily
---
## 🙋 If Any Man Will Come After Me

Any man means this invitation is open to everyone listening, not a chosen few.

Come after me describes following as a continuing way of life, not a single decision.

Jesus states the cost up front instead of hiding it.

The invitation is wide open, but it is never offered cheaply.

🙋 Any man means open to everyone
🚶 Come after me means a way of life
💬 Jesus stated the cost up front
📖 The invitation was wide but never cheap

## 🙅 Let Him Deny Himself

Deny himself means refusing to put your own comfort or desires first.

This is not the same thing as simply giving up one object or one habit.

The whole self, not just a single behavior, is what gets surrendered here.

Following Jesus starts with this inward decision before anything outward changes.

🙅 Deny means refusing self first
🧠 This is a whole self, not one habit
🔄 It is an inward decision first
📖 Everything outward follows from this choice

## 🪵 Take Up His Cross Daily

A cross in that world was the Roman method used to execute criminals.

Carrying one publicly marked a person as condemned, already as good as dead.

Daily turns this from a single dramatic moment into a repeated, ordinary choice.

Following Jesus means choosing this death to self again and again, not just once.

🪵 A cross meant Roman execution
💀 Carrying it marked someone as condemned
🔁 Daily made it a repeated choice
📖 Death to self repeats, not just once

## 💔 Whosoever Will Save His Life Shall Lose It

Save his life here means clinging to comfort and self protection above all else.

Jesus states this as a stark reversal, almost a riddle at first hearing.

Clinging tightly to this life actually costs a person everything that matters most.

The very thing someone is trying to protect ends up being the thing they lose.

💔 Saving means clinging to comfort
🔄 Jesus stated a stark reversal
🙌 Clinging tightly costs everything
📖 What they tried to protect, they lost

## 🤲 Lose His Life For My Sake

Lose here does not always mean physical death, though it can include it.

For my sake means giving up comfort, safety, or status because of loyalty to Jesus.

This kind of loss is named as the path to actually saving one's life.

The reversal from the verse before continues and sharpens here.

🤲 Lose means giving up comfort or status
🙏 For my sake means loyalty to Jesus
🔄 This loss leads to saving, not losing
📖 The reversal sharpens here

## 🌍 Gain The Whole World, And Lose Himself

Gain the whole world pictures total success by every worldly measure available.

Lose himself means losing the one thing that actually makes a person who they are.

Jesus compares the largest possible worldly prize against the deepest possible personal loss.

No amount of outward success can make up for that inward loss.

🌍 The whole world pictures total success
😶 Lose himself means losing who you are
⚖️ Jesus weighed the biggest prize against the loss
📖 No success replaces that loss

## 😳 Ashamed Of Me And Of My Words

Ashamed here means publicly disowning Jesus out of fear or embarrassment.

This includes rejecting his actual teaching, not only rejecting him as a person.

The warning points toward a future reckoning, not just present social discomfort.

What someone does with Jesus's words now will matter again later.

😳 Ashamed meant disowning him publicly
📖 This included rejecting his words
⏳ A future reckoning was coming
➡️ Present choices would matter later

## ✨ Come In His Own Glory, And In His Father's

Glory here means visible, unmistakable majesty, not quiet or hidden.

His own glory and his Father's glory are named together, side by side.

This moment points forward to Jesus's eventual return, far beyond his hidden ministry now.

The modest teacher in front of them now will not stay hidden forever.

✨ Glory means unmistakable majesty
🤝 His glory and the Father's are linked
🔮 This points to his future return
📖 The hidden teacher will not stay hidden

## ⏳ Not Taste Of Death, Till They See The Kingdom Of God

Taste of death is simply an old way of saying die.

Some standing here points to specific people in that very crowd.

Many readers link this promise to the transfiguration happening just days later in this chapter.

Jesus gives a timeline that some listening would live to see fulfilled.

⏳ Taste of death simply means dying
👥 Some there would witness this
🔗 Many link it to what follows
📖 Jesus gave a timeline, not a vague promise

# Luke 9:28-31
# ✨ His Raiment Was White And Glistering
---
## ⛰️ About An Eight Days After These Sayings

Luke ties this event directly to the sayings Jesus had just finished teaching.

Eight days gives a real, specific gap, not a vague amount of time later.

Matthew and Mark both record this same event as six days later instead.

Luke likely counted the first and last days of a shorter span differently.

📅 Luke tied this to recent teaching
🔢 Eight days was a specific gap
📖 Matthew and Mark say six days
➡️ Counting methods likely explain the difference

## 🙏 Went Up Into A Mountain To Pray

Mountains throughout the Bible are often the setting for major encounters with God.

Jesus brings only Peter, James, and John along this time, not the whole group.

Prayer, once again, comes right before something significant happens.

The same pattern from earlier in the chapter repeats here.

⛰️ Mountains often host major encounters
👥 Only three disciples came along
🙏 Prayer again preceded something major
📖 The same pattern repeated here

## 🔆 The Fashion Of His Countenance Was Altered

Fashion of his countenance simply means the appearance of his face.

Altered means it visibly changed right in front of the watching disciples.

This was not imagined or described secondhand, the three men actually witnessed it.

Something hidden about who Jesus truly is briefly broke through into plain sight.

🔆 Countenance simply means his face
👀 It visibly changed before them
✅ Three witnesses actually saw this
📖 His hidden identity briefly broke through

## 👕 His Raiment Was White And Glistering

Raiment is an old word for clothing or garments.

Glistering describes a brightness that seemed to shine from within, not sunlight reflecting.

Ordinary cloth does not behave this way under any natural lighting.

This detail confirms something supernatural was happening, not a trick of the light.

👕 Raiment is an old word for clothing
✨ Glistering meant shining from within
🚫 Ordinary cloth does not do this
📖 Something supernatural was clearly happening

## 👴 Moses And Elias

Moses represents the law given to Israel long before this moment.

Elias, or Elijah, represents the prophets who spoke for God across the centuries.

Both men appearing together links Jesus to the entire story of Israel's faith.

Jesus is shown here as the one both the law and the prophets were pointing toward.

📜 Moses represented the law
🔥 Elias represented the prophets
🔗 Together they linked Jesus to Israel's story
📖 Jesus was what both had pointed toward

## 🗣️ Spake Of His Decease Which He Should Accomplish At Jerusalem

Decease is a formal, gentle way of saying death.

Accomplish treats his death as a mission completed, not a tragedy suffered.

Jerusalem is named specifically as the city where this would happen.

Moses and Elijah discuss this future death as something already planned and purposeful.

⚰️ Decease is a gentle word for death
🎯 Accomplish treated death as a mission
🏙️ Jerusalem was named specifically
📖 His death was planned, not just suffered

# Luke 9:32-36
# ☁️ This Is My Beloved Son
---
## 😴 Heavy With Sleep

Heavy with sleep describes the disciples struggling against real physical exhaustion.

This same weakness shows up again later when Jesus prays before his arrest.

Their tired bodies almost miss one of the most important moments in the whole gospel.

Spiritual significance and ordinary human tiredness sit right next to each other here.

😴 Heavy with sleep meant real exhaustion
🔁 This same weakness returns later in Luke
⚠️ They nearly missed this whole moment
📖 Tiredness and significance sat side by side

## 👀 They Saw His Glory

Awake here means the disciples are no longer fighting off sleep.

Saw his glory means they witnessed the full scene, not just a quick glimpse.

Two men stood with Jesus, later confirmed by name as Moses and Elias.

This vision was given to real, awake witnesses, not imagined by exhausted minds.

😴 They finally shook off the sleep
👀 They witnessed the full scene clearly
👴 Two men stood beside Jesus
📖 Real witnesses saw this, not tired minds

## 🏕️ Let Us Make Three Tabernacles

Tabernacles here means temporary shelters, like simple tents.

Peter may be thinking of the ancient Feast of Tabernacles, a festival built around temporary dwellings.

Luke adds that Peter did not really know what he was saying.

Peter wants to extend this glorious moment rather than let it end.

🏕️ Tabernacles meant simple temporary shelters
📅 Peter may be echoing an old festival
🤷 Luke says Peter did not understand himself
📖 Peter wanted the moment to last

## ☁️ A Cloud Overshadowed Them

Throughout the Bible, a cloud often signals God's own direct presence.

This same kind of cloud once covered the tabernacle in the Old Testament.

The disciples feared as they entered the cloud, overwhelmed by what was happening.

This was not ordinary weather, it was a clear and visible sign of God.

☁️ A cloud often signals God's presence
📜 The same sign covered the old tabernacle
😨 They feared entering this cloud
📖 This was no ordinary weather

## 🔊 This Is My Beloved Son: Hear Him

This is my beloved Son echoes the same words spoken at Jesus's baptism earlier in Luke.

Hear him is a direct command, not a quiet suggestion.

The voice settles any confusion sparked by Peter's earlier offer to build shelters.

God himself points attention away from Moses and Elijah and fully onto Jesus.

🔊 The same words came at his baptism
📢 Hear him was a direct command
❓ It answered Peter's confused offer
📖 God pointed attention fully onto Jesus

## 👤 Jesus Was Found Alone

When the voice stopped, Moses and Elijah had already departed.

Jesus alone remained standing there with his three stunned disciples.

This detail confirms the vision had a clear beginning and a clear end.

Only Jesus himself continues forward from this mountain, carrying the mission onward.

👤 Moses and Elijah had departed
⛰️ Jesus alone remained on the mountain
⏳ The vision had a clear end
📖 Only Jesus carried the mission onward

## 🤐 Told No Man In Those Days

Kept it close means the disciples deliberately stayed silent about what they saw.

This matches the same pattern of controlled timing seen earlier in the chapter.

They likely did not fully understand what they had just witnessed either.

Full understanding of this moment would only come much later, after the resurrection.

🤐 They deliberately stayed silent
🔁 This matched the chapter's earlier pattern
❓ They likely did not fully understand
📖 Full understanding came after the resurrection

# Luke 9:37-40
# 😢 Master, I Beseech Thee
---
## ⛰️ Much People Met Him

This crowd waits below at the base of the mountain Jesus just came down from.

The contrast between the glory just witnessed and this ordinary need is sharp.

Jesus moves immediately from a mountaintop vision back into human suffering.

His mission never pauses to simply savor a glorious moment.

⛰️ The crowd waited at the mountain's base
✨ Glory above met ordinary need below
🏃 Jesus moved straight into that need
📖 His mission never paused to rest

## 😢 Master, I Beseech Thee, Look Upon My Son

Beseech means begging, a far more desperate word than simply asking.

A father cries out publicly on behalf of a child he cannot help himself.

This desperate request echoes other urgent appeals made to Jesus earlier in Luke.

Public, desperate pleading is how real faith often shows up in this gospel.

😢 Beseech meant desperate begging
👨 A father pleaded for his son
🔁 This echoes earlier urgent appeals
📖 Desperate faith often looked like this

## 👶 Mine Only Child

Only child makes this father's loss, if it happens, uniquely devastating.

This detail increases the emotional weight of the whole scene.

Luke often highlights an only child in his most urgent healing stories.

A single father's grief stands in for the pain of the entire watching crowd.

👶 Only child meant no other heirs
💔 This raised the emotional stakes
🔁 Luke repeats this detail elsewhere
📖 One father's grief stood for the crowd's

## 👹 A Spirit Taketh Him

Spirit here refers to an evil, unclean spirit controlling the boy's body.

Taketh him describes sudden, violent seizures with no warning beforehand.

The description matches physical symptoms a modern reader might recognize as a seizure.

Luke still names a spiritual cause behind this specific physical suffering.

👹 Spirit meant an unclean spirit
⚡ Taketh him meant sudden seizures
🩺 Symptoms resemble a modern seizure
📖 Luke named a spiritual cause behind it

## 🙏 I Besought Thy Disciples To Cast Him Out

Besought again means the father desperately asked for help.

The disciples had already tried and clearly failed to help this boy.

Their failure sets up Jesus's frustrated response in the very next verse.

A father's hope had already been disappointed once before reaching Jesus himself.

🙏 Besought meant desperate asking again
❌ The disciples had already failed
😔 Their failure set up what came next
📖 Hope had already been disappointed once

# Luke 9:41-43
# ⚡ O Faithless And Perverse Generation
---
## 😤 O Faithless And Perverse Generation

Faithless means lacking real trust in God's power.

Perverse means twisted away from what is right and true.

Jesus directs this sharp rebuke at the surrounding crowd, not only at his own disciples.

His frustration reveals real weariness after constant unbelief despite seeing so many miracles.

😤 Faithless meant lacking real trust
🔀 Perverse meant twisted from what is right
👥 The rebuke targeted the whole crowd
📖 Constant unbelief wore on Jesus

## ⏳ How Long Shall I Be With You

This question carries real emotional weight, almost like exhaustion spoken aloud.

Jesus knows his time with them in this visible, physical form is limited.

The weight of his coming death, named earlier in this chapter, sits behind this question.

Even Jesus's patience had a cost that the text does not hide.

⏳ The question carried real weight
📅 His time with them was limited
⚰️ His coming death sat behind it
📖 Jesus's patience had a visible cost

## 👦 Bring Thy Son Hither

Hither is an old word simply meaning here, to this place.

Jesus moves straight from rebuking the crowd into directly helping the suffering child.

His frustration with unbelief never stops him from acting in compassion.

Judgment and mercy appear side by side in these few short verses.

📍 Hither is an old word for here
🙋 Jesus moved straight into helping
❤️ Frustration did not block his compassion
📖 Judgment and mercy sat side by side

## ⚡ The Devil Threw Him Down, And Tare Him

Tare is an old spelling of the word tore.

The spirit makes one last, violent show of resistance before being forced out.

Jesus rebukes the unclean spirit directly, speaking to it the way he spoke to the storm earlier in Luke.

The healing is immediate and complete, with the boy delivered back to his own father.

⚡ Tare is an old spelling of tore
👹 The spirit resisted violently one last time
🗣️ Jesus rebuked it directly, like the storm
📖 He was healed and returned to his father

## 😲 Amazed At The Mighty Power Of God

Amazed describes genuine astonishment, not simple polite approval.

The crowd credits this power specifically to God, not merely to Jesus's own skill.

This public reaction stands in contrast to Herod's private unease earlier in the chapter.

A chapter that opened with sending power out now closes this scene by showing that power on full display.

😲 Amazed meant genuine astonishment
👑 They credited the power to God
🔀 This contrasts with Herod's earlier unease
📖 The chapter's opening power was now visible

# Luke 9:44-45
# 👂 Let These Sayings Sink Down
---
## 👂 Let These Sayings Sink Down Into Your Ears

Sink down pictures truth settling deep, not just passing briefly through the mind.

Jesus repeats his earlier prediction of suffering from this same chapter almost word for word.

Repetition here signals how important this truth is for the disciples to actually grasp.

A lesson taught once in this chapter was clearly not considered enough.

👂 Sink down meant truth settling deep
🔁 Jesus repeated his earlier prediction
❗ Repetition signaled real importance
📖 One telling was not enough

## ✋ Delivered Into The Hands Of Men

Delivered means handed over, often used for a betrayal or an arrest.

Hands of men contrasts human power acting against the very Son of man himself.

This phrase quietly points forward to the coming arrest in Jerusalem.

Jesus names his own betrayal before it has even happened.

✋ Delivered meant handed over
👤 Hands of men acted against God's own Son
🔮 This pointed forward to the arrest
📖 Jesus named his betrayal in advance

## 🙈 They Understood Not This Saying

Understood not shows a real gap between what Jesus said and what the disciples grasped.

Their minds may have still been shaped by expectations of a conquering, not a suffering, Christ.

This confusion matches their earlier struggle to understand the parable of the sower.

Hearing clear words is not the same thing as actually understanding them.

🙈 A real gap existed in their understanding
👑 Old expectations of a conquering Christ lingered
🔁 This echoes their earlier confusion
📖 Hearing words differs from understanding them

## 😟 Feared To Ask Him

Fear here kept the disciples from simply asking Jesus to explain himself.

This was hidden from them suggests something beyond ordinary human confusion was at work.

Their silence left real questions sitting unresolved for a while longer.

Confusion about Jesus's death would only lift much later, after it actually happened.

😟 Fear blocked them from asking
🙈 Something beyond ordinary confusion was at work
🤐 Real questions went unresolved
📖 Clarity came only after his death

# Luke 9:46-48
# 👶 Which Of Them Should Be Greatest
---
## 🤔 Then There Arose A Reasoning Among Them

Reasoning here means a private debate or argument among the disciples themselves.

This argument comes right after Jesus just finished talking about his own coming suffering.

Their focus on rank and status seems completely out of step with that warning.

Their timing reveals just how little they had actually absorbed what Jesus said.

🤔 Reasoning meant a private debate
⚰️ This followed talk of his suffering
🏆 Their focus was rank, not his warning
📖 Bad timing revealed what they missed

## 🧠 Perceiving The Thought Of Their Heart

Perceiving means Jesus knew their silent argument without anyone telling him directly.

This detail shows Jesus had full awareness of what was happening inside each disciple.

Nothing about this private debate stays hidden from him.

Jesus chooses to correct the problem gently, through action, rather than through a harsh lecture.

🧠 Perceiving meant knowing it silently
👁️ Jesus saw what was hidden
🤫 Nothing stayed hidden from him
📖 He corrected it gently, through action

## 👶 Took A Child, And Set Him By Him

A child in that culture held very little status or social power.

Jesus places this small, powerless figure right at the center of the entire lesson.

The object lesson directly answers the disciples' competitive question about greatness.

Greatness, in Jesus's picture, looks nothing like the disciples had assumed.

👶 A child held little status then
🎯 Jesus placed the child at the center
❓ This answered their competitive question
📖 Greatness looked nothing like they assumed

## 🤲 Whosoever Shall Receive This Child In My Name

Receive here means welcoming someone with genuine care, not simply tolerating their presence.

In my name ties this small act of welcome directly to welcoming Jesus himself.

The chain continues further still, linking that welcome all the way back to God the Father.

A single kind act toward someone small reaches all the way up to God.

🤲 Receive meant genuine welcome
🙏 In my name linked it to Jesus
🔗 The chain reached back to the Father
📖 A small act reached up to God

## 🏆 He That Is Least Among You All, The Same Shall Be Great

Least here does not mean weak or unimportant in ability.

It means choosing humility and service over chasing status and recognition.

This flips the disciples' whole argument about rank completely upside down.

True greatness in God's kingdom looks like serving others, not outranking them.

🏆 Least meant humble, not weak
🙇 It meant choosing service over status
🔄 This flipped their whole argument
📖 Greatness meant serving, not outranking

# Luke 9:49-50
# 🔥 He That Is Not Against Us
---
## 👹 We Saw One Casting Out Devils In Thy Name

In thy name means this unnamed man was using Jesus's own authority to do this work.

He was not part of the twelve disciples traveling directly with Jesus.

John reports this to Jesus almost like a complaint about an outsider.

The man's success itself seems to bother the disciples more than help them.

👹 He cast out devils in Jesus's name
🚫 He was not one of the twelve
😠 John reported it like a complaint
📖 His success itself seemed to bother them

## 🙅 We Forbad Him, Because He Followeth Not With Us

Forbad means the disciples actively tried to stop this man from continuing.

Followeth not with us reveals the real reason behind their objection, not belonging to their specific group.

Their complaint was about boundaries and belonging, not about whether the man's work was false.

The disciples guard their own group more closely than they guard the actual truth.

🙅 Forbad meant actively stopping him
👥 Their reason was group loyalty
❓ They never questioned if his work was false
📖 They guarded their group over the truth

## 🔥 Forbid Him Not

Jesus corrects the disciples plainly and without hesitation.

His answer reshapes how they should think about anyone doing genuine good in his name.

Group loyalty was never meant to override a wider, more generous view of God's work.

Jesus widens the circle his disciples had just tried to narrow.

🔥 Jesus corrected them plainly
🔄 He reshaped their thinking on this
🚪 Loyalty should not narrow God's work
📖 Jesus widened what they had narrowed

## 🤝 He That Is Not Against Us Is For Us

This saying flips the disciples' exclusive instinct completely around.

Not actively opposing Jesus's mission counts for something real and meaningful here.

This does not erase every real difference between genuine followers and others entirely.

It simply refuses to treat every outsider automatically as a threat or an enemy.

🤝 This flipped their exclusive instinct
✅ Not opposing counted for something real
⚖️ Real differences still existed elsewhere
📖 Outsiders were not automatically enemies

# Luke 9:51-56
# 🚶 Stedfastly Set His Face To Jerusalem
---
## ⏳ The Time Was Come That He Should Be Received Up

Received up points forward to Jesus's ascension back to heaven after the resurrection.

This single phrase quietly covers everything still ahead, the cross, the resurrection, and the ascension together.

Luke marks this moment as a clear hinge point in the whole gospel's structure.

Everything from this verse forward moves steadily toward Jerusalem and the events waiting there.

⏳ Received up pointed to the ascension
🔗 One phrase covered the cross and beyond
📍 Luke marked this as a hinge point
📖 Everything now moved toward Jerusalem

## 🚶 Stedfastly Set His Face To Go To Jerusalem

Stedfastly means with firm, unwavering resolve, not a casual or uncertain decision.

Set his face is an old expression for being completely determined about a direction.

Jerusalem was the city where Jesus's suffering, already named earlier in this chapter, would take place.

He walks toward that suffering by his own clear choice, not as a trapped victim.

🚶 Stedfastly meant firm, unwavering resolve
📍 Set his face meant full determination
🏙️ Jerusalem was where his suffering waited
📖 He chose this path himself

## 🕎 Entered Into A Village Of The Samaritans

Samaritans and Jews shared deep, long standing religious and ethnic tension in this period.

Messengers go ahead of Jesus to prepare lodging and supplies for his group's visit.

This detail shows Jesus's mission was never limited only to Jewish towns and villages.

Choosing this route itself already crossed a boundary most people avoided.

🕎 Jews and Samaritans had deep tension
📣 Messengers prepared ahead of his arrival
🌍 His mission was not Jews only
📖 This route crossed a boundary most avoided

## 🚪 They Did Not Receive Him

This rejection directly echoes the warning Jesus gave his own disciples earlier in this chapter.

Samaritans often refused travelers who were clearly heading toward Jerusalem for worship.

Old religious tension, not personal hostility toward Jesus specifically, likely drove this refusal.

Jesus experiences firsthand the same kind of rejection he had already warned his disciples about.

🚪 This echoed Jesus's earlier warning
🕎 Samaritans often refused Jerusalem bound travelers
⚖️ Old tension likely drove the refusal
📖 Jesus faced the rejection he had warned about

## 🔥 Command Fire To Come Down From Heaven

James and John suggest calling down fire, much like the prophet Elijah once did.

Elijah himself appeared earlier in this very chapter, during the transfiguration.

Their suggestion reveals they still misunderstand what kind of kingdom Jesus actually came to bring.

Zeal without real understanding can quickly turn dangerous and harmful.

🔥 They wanted fire like Elijah called down
👴 Elijah had appeared earlier in this chapter
❓ Their idea misread Jesus's kingdom
📖 Zeal without understanding turns dangerous

## 🙅 Ye Know Not What Manner Of Spirit Ye Are Of

Jesus rebukes James and John directly for this violent suggestion.

Manner of spirit points to the whole attitude driving their harsh request.

This moment contrasts sharply with the gentler instruction given earlier in this chapter about simply moving on.

Jesus consistently chooses mercy over destruction throughout this entire chapter.

🙅 Jesus rebuked the violent suggestion
❤️ Manner of spirit meant their whole attitude
🔀 This contrasts with his gentler instruction
📖 Jesus chose mercy over destruction

## 🚶 The Son Of Man Is Not Come To Destroy Men's Lives, But To Save Them

This line states Jesus's entire mission as plainly as any verse in this chapter.

Destroy and save are placed side by side on purpose, as a direct contrast.

The Samaritan village's rejection does not provoke the violent response James and John wanted.

Jesus and his group simply move on to another village instead.

🚶 This plainly stated his whole mission
⚖️ Destroy and save were deliberately contrasted
🙅 Rejection did not provoke violence
📖 They simply moved to another village

# Luke 9:57-62
# 🦊 Foxes Have Holes
---
## 🙋 I Will Follow Thee Whithersoever Thou Goest

Whithersoever is an old word meaning wherever, to any place at all.

This man offers Jesus an apparently unconditional, wholehearted commitment.

Jesus responds with a warning rather than simple praise for this bold offer.

The cost of following is about to be stated plainly, not softened.

🙋 Whithersoever meant wherever at all
🙌 He offered an unconditional commitment
⚠️ Jesus answered with a warning
📖 The real cost was about to be named

## 🦊 Foxes Have Holes, And Birds Of The Air Have Nests

Foxes and birds both have a fixed, settled place that belongs to them.

Jesus draws a clear picture most listeners in that culture would instantly recognize.

Even simple animals have more settled security than Jesus himself currently has.

This image prepares the man for what following Jesus will actually require.

🦊 Foxes have a settled home
🐦 Birds also have a settled nest
🔀 Jesus had less security than they did
📖 This prepared the man for the real cost

## 🛏️ The Son Of Man Hath Not Where To Lay His Head

Lay his head is a simple, physical picture of having no permanent, settled home.

Jesus lives without the basic security most people take completely for granted.

Following him could mean sharing in that same ongoing homelessness and instability.

The cost named here is real and immediate, not just symbolic or distant.

🛏️ Lay his head meant having no home
🏠 Jesus lacked basic settled security
🔗 Followers might share that instability
📖 This cost was real, not symbolic

## ⚰️ Suffer Me First To Go And Bury My Father

Suffer here is an old word meaning allow or permit, not pain.

Burying a father was considered one of the most serious family duties in that culture.

This request sounds completely reasonable by any normal human standard.

Jesus is about to respond in a surprisingly sharp, urgent way regardless.

⚰️ Suffer meant allow, not pain
👨 Burying a father was a serious duty
✅ The request sounded completely reasonable
📖 Jesus still answered with real urgency

## 💀 Let The Dead Bury Their Dead

This saying likely means the spiritually dead can handle ordinary family duties like burial.

Jesus is not literally telling the man to abandon his own father's funeral entirely.

He is stating that the kingdom's call carries an urgency that outweighs even this.

Following Jesus sometimes means choosing his mission over an otherwise reasonable delay.

💀 Dead here meant spiritually dead
❌ Jesus was not rejecting the funeral itself
⏳ The kingdom's call carried real urgency
📖 Delay lost out to the mission

## 🗣️ Go Thou And Preach The Kingdom Of God

Jesus gives this man a clear, specific mission instead of simply granting his delay.

Preach the kingdom of God connects this man directly back to the mission given to the twelve.

The call to follow Jesus always comes paired with a real task to carry out.

Following was never meant to be passive waiting around.

🗣️ Jesus gave him a clear mission
🔗 This echoed the mission given earlier
🏃 Following always paired with a task
📖 Following was never passive waiting

## 👋 Let Me First Go Bid Them Farewell

Bid them farewell sounds like a brief, simple, completely reasonable request.

This echoes a very similar request the prophet Elisha once made before following Elijah.

Jesus responds more sharply here than Elijah ever did in that older story.

The urgency of God's kingdom now exceeds even its own Old Testament pattern.

👋 Bidding farewell sounded simple enough
📜 This echoed the prophet Elisha's own story
🔀 Jesus answered more sharply than Elijah did
📖 The kingdom's urgency now exceeded that old pattern

## 🌾 Having Put His Hand To The Plough, And Looking Back

A plough required full, constant attention to cut a straight, even furrow.

Looking back while ploughing would immediately ruin the row being cut.

Jesus uses an image every farmer listening would understand without any explanation.

Divided attention, Jesus says plainly, is simply not fit for God's kingdom work.

🌾 A plough needed full attention
👀 Looking back would ruin the row
🧑‍🌾 Every farmer understood this image
📖 Divided attention was not fit for the kingdom
`.trim();

export const LUKE_NINE_PERSONAL_SECTIONS = parseLukeNineRawNotes(LUKE_NINE_RAW_NOTES);
