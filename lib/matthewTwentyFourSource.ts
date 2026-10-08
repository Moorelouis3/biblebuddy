export type MatthewTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentyFourRawNotes(rawText: string): MatthewTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 24:${startVerse}` : `Matthew 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Matthew 24 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_FOUR_RAW_NOTES = `# Matthew 24:1-3
# 🏛️ Not One Stone Shall Remain
---
## His Disciples Came To Him For To Shew Him The Buildings Of The Temple

This temple was not the plain building Solomon first built centuries earlier.

Herod the Great had expanded it into one of the largest religious complexes in the ancient world.

Its stones were enormous, some reports describe blocks weighing many tons each.

The disciples are pointing out something genuinely astonishing to look at.

This massive, celebrated building is exactly what Jesus is about to say will not survive.

🏛️ Herod expanded the temple hugely
🪨 Its stones were massive
👀 Disciples admired its grandeur
📖 This building will not survive

## See Ye Not All These Things

Jesus points to the same buildings the disciples just admired.

He is forcing them to look squarely at the thing they are most proud of.

That pride is exactly what is about to be overturned.

The question sets up the hard prediction that follows immediately after it.

👀 Jesus directs their attention deliberately
💔 Their pride is about to be challenged
⚠️ The question sets up a hard warning
📖 What they admire will not last

## There Shall Not Be Left Here One Stone Upon Another

This is not a vague warning about something far off and uncertain.

Jesus names total, physical destruction, stone by stone.

Roman soldiers under the general Titus destroyed the temple in the year seventy.

Historical accounts describe the building being torn apart exactly as Jesus described.

The prediction ties directly to a real, datable event in the disciples' own lifetime.

🏛️ Not vague, a specific destruction
🔥 Rome destroyed the temple in year seventy
⏳ It happened in the disciples' own lifetime
📖 The prediction matched real history exactly

## The Mount Of Olives

The Mount of Olives sits across a small valley east of Jerusalem.

From its slope, the entire temple could be seen in full view.

Jesus had used this same hill before, including during his final days in the city.

Speaking about the temple's fall from this exact spot was not an accident.

The place matched the subject perfectly.

🏔️ A hill just east of Jerusalem
👀 The temple was visible from its slope
📍 Jesus used this hill before
📖 The setting matched the subject

## Tell Us, When Shall These Things Be

The disciples are asking about the temple's destruction Jesus just predicted.

They want a timeline attached to the warning.

This question is really two questions pressed together in their minds.

One is about the temple falling, the other about something much bigger.

The next verse makes the second question explicit.

❓ They ask about timing
🏛️ Tied to the temple's fall
🔀 Two questions blur into one
📖 The next verse splits them apart

## What Shall Be The Sign Of Thy Coming, And Of The End Of The World

The word coming here translates a Greek word meaning a ruler's arrival or formal appearing.

The word world does not mean the planet.

It translates a different word meaning an age, a whole stretch of time.

The disciples are asking what will mark the end of this present age.

They also want the sign that marks Jesus arriving as its true ruler.

This double question shapes everything Jesus says for the rest of the chapter.

🔤 Coming means a ruler's arrival
🌍 World means an age, not the planet
❓ They ask about the end of this age
📖 This question shapes the whole chapter

# Matthew 24:4-8
# ⚔️ Wars And Rumours Of Wars
---
## Take Heed That No Man Deceive You

Jesus opens this long answer with a warning, not a timeline.

Take heed means pay close, careful attention, stay on guard.

Before naming a single sign, he warns that people will try to mislead them.

That warning sets the tone for everything that follows.

⚠️ Opens with a warning, not a timeline
👀 Take heed means stay on guard
🚫 People will try to mislead them
📖 This warning shapes the whole answer

## Many Shall Come In My Name, Saying, I Am Christ

This does not describe obvious frauds nobody would believe.

These figures claim to speak and act with Jesus's own authority.

History records many people across the centuries who claimed exactly this kind of role.

The danger is not an obvious lie, it is a convincing one.

🎭 They claim Jesus's own authority
📜 History records many such claims
⚠️ The danger is a convincing lie
📖 Not every claim should be trusted

## Ye Shall Hear Of Wars And Rumours Of Wars

A rumour of war is a report of fighting that has not yet been confirmed.

News like this would travel slowly and unevenly across the ancient world.

Jesus says these reports will keep coming.

He also says they are not, by themselves, the sign of the end.

📰 Rumours mean unconfirmed reports
🗺️ News traveled slowly back then
🔁 These reports keep repeating
📖 War alone is not the sign

## See That Ye Be Not Troubled, For The End Is Not Yet

Jesus tells them directly not to panic when they hear this news.

Troubled here means thrown into fear or alarm.

The phrase the end is not yet is a patience instruction, not a delay in the plan.

Ordinary conflict is not a countdown clock.

🙅 A direct command not to panic
😟 Troubled means thrown into fear
⏳ Not yet means stay patient
📖 War is not a countdown clock

## Nation Shall Rise Against Nation, And Kingdom Against Kingdom

This phrase describes widespread political conflict, not one isolated battle.

Nation and kingdom repeats the same idea twice for emphasis, a common pattern in Hebrew style.

The scale is broad, reaching across many peoples at once.

This kind of conflict has repeated throughout history since.

🌍 Describes widespread conflict, not one battle
🔁 Repeated phrasing adds emphasis
📈 The scale reaches many peoples
📖 This pattern has repeated throughout history

## Famines, And Pestilences, And Earthquakes, In Divers Places

Famine means a severe, widespread shortage of food.

Pestilence means a deadly, fast spreading disease.

Divers is an old word simply meaning various or many different ones.

These are natural disasters, listed alongside human conflict as part of the same unsettled picture.

🌾 Famine means severe food shortage
🦠 Pestilence means fast spreading disease
🗺️ Divers means many different places
📖 Natural disasters join human conflict

## All These Are The Beginning Of Sorrows

The word sorrows here is often translated birth pains elsewhere in the New Testament.

Birth pains start small, then grow sharper and closer together as the moment nears.

Jesus is not describing random, meaningless suffering.

He is describing the early stages of something building toward an outcome.

🤰 Sorrows often means birth pains
📈 Birth pains intensify over time
🎯 These events are building toward something
📖 Not random suffering, but a pattern

# Matthew 24:9-14
# 😢 Hated Of All Nations
---
## Then Shall They Deliver You Up To Be Afflicted

Deliver up here means handed over to an authority for judgment or punishment.

This describes being formally arrested, not simply treated unkindly.

The book of Acts records the apostles facing exactly this kind of arrest.

Jesus is warning his own followers specifically, not describing a stranger's trouble.

⛓️ Deliver up means formally arrested
📜 Acts records this happening to the apostles
👥 Jesus warns his own followers
➡️ This trouble was personal, not distant

## And Ye Shall Be Hated Of All Nations For My Name's Sake

This hatred is not random or accidental.

It is tied directly to carrying Jesus's name and belonging to him.

The phrase for my name's sake ties the suffering to identity, not bad luck.

Persecution here is the cost of being known as his.

💔 The hatred is not random
🏷️ Tied directly to Jesus's name
🎯 Suffering is tied to identity
📖 Persecution is the cost of belonging to him

## Then Shall Many Be Offended, And Shall Betray One Another

Offended here means caused to stumble or fall away from faith.

Betray means to hand someone over to danger, often someone trusted.

Pressure like this does not just come from outside enemies.

It fractures trust among believers themselves.

🙃 Offended means caused to stumble
🗡️ Betray means handed over by someone trusted
💔 Pressure fractures trust from within
📖 The threat is not only from outside

## And Many False Prophets Shall Rise, And Shall Deceive Many

A false Christ claims to be the promised savior himself.

A false prophet claims only to speak truthfully for God.

Both figures were already named earlier in this same chapter.

Deception can wear a religious face without ever claiming to be the messiah.

👤 False Christs claim to be the savior
📢 False prophets claim to speak for God
🔁 Both were already warned about
📖 Deception can wear a religious face

## Because Iniquity Shall Abound, The Love Of Many Shall Wax Cold

Iniquity means sin or wickedness, especially when it spreads widely.

Abound means to increase and multiply.

Wax cold means to gradually cool, the way a fire dies down slowly.

Love does not vanish all at once here, it fades under pressure.

⚖️ Iniquity means widespread sin
📈 Abound means increasing and multiplying
🔥 Wax cold means slowly cooling
📖 Love fades gradually, not all at once

## But He That Shall Endure Unto The End, The Same Shall Be Saved

Endure means to remain faithful through hardship, not merely to survive it.

The end here points to the end of this specific period of trial.

Saved in this verse carries the sense of being preserved and brought safely through.

Staying faithful through pressure is the point, not simply outlasting the clock.

💪 Endure means staying faithful, not just surviving
⏳ The end means this period of trial
🛡️ Saved means preserved and brought through
📖 Faithfulness through pressure is the point

## This Gospel Of The Kingdom Shall Be Preached In All The World For A Witness

Witness here means a public testimony, offered whether or not people accept it.

The gospel's job is to reach everyone, not to convince everyone.

This spreading of the message is tied directly to the timing of the end.

The goal is global reach, not universal agreement.

📢 Witness means public testimony, accepted or not
🌍 The gospel's goal is global reach
⏳ Its spread is tied to the timing
📖 Reach matters more than agreement here

# Matthew 24:15-22
# 🏃 Flee Into The Mountains
---
## The Abomination Of Desolation, Spoken Of By Daniel The Prophet

This phrase comes from the book of Daniel, written centuries earlier.

It describes something sacrilegious set up where it has no right to be.

Centuries before Jesus, a foreign ruler had already defiled the temple once in a similar way.

Jesus points his disciples back to that old prophecy as the pattern about to repeat.

📜 The phrase comes from Daniel
🚫 It means something sacrilegious set up wrongly
🔁 A similar defilement already happened once
📖 Jesus points to an old pattern repeating

## Stand In The Holy Place

The holy place refers to the temple itself, the most sacred site in the city.

Something was never supposed to stand there in defiance of what the place was for.

Many connect this warning to events surrounding Jerusalem's fall in the year seventy.

The warning names a location, not a vague future symbol.

🏛️ Holy place means the temple itself
🚫 Something defiles where it should not stand
📅 Many tie this to the year seventy
📖 A real location, not a vague symbol

## Whoso Readeth, Let Him Understand

This short line breaks from the flow of the speech directly to the reader.

It signals that something real and urgent is being described, not abstract symbolism.

The instruction asks for careful attention, not quick skimming.

A warning this important was meant to be acted on, not simply admired.

✋ Breaks directly to the reader
⚠️ Signals real urgency, not symbolism
👀 Asks for careful attention
📖 Meant to be acted on

## Then Let Them Which Be In Judaea Flee Into The Mountains

This is a concrete, practical instruction, not a spiritual metaphor.

When the sign described above appears, the command is to run immediately.

The mountains outside Jerusalem offered real shelter and distance from the coming danger.

Some early accounts describe Christians leaving the city before its fall because of this very warning.

🏃 A practical command, not a metaphor
⛰️ Mountains offered real shelter nearby
⏱️ The instruction is to run immediately
📖 Some reportedly fled before the city fell

## Let Him Which Is On The Housetop Not Come Down To Take Any Thing Out Of His House

Housetops in this culture were flat and used daily for ordinary life.

Climbing down normally meant using an outside stairway, a slower path than it sounds.

The instruction is to skip that stairway entirely.

Do not pause to gather belongings on the way out.

Speed matters more here than anything a person might want to grab.

🏠 Housetops were flat, used daily
🪜 Climbing down meant an outside stairway
⏱️ Skip it rather than pause for things
📖 Speed matters more than belongings

## And Woe Unto Them That Are With Child, And To Them That Give Suck

Give suck means nursing a baby.

Fleeing quickly would be brutally hard for a pregnant or nursing woman.

This line names a real, physical cost of the urgency just described.

The warning does not ignore the weakest and most vulnerable in the crowd.

🤱 Give suck means nursing a baby
🏃 Fleeing fast would be brutally hard
💔 Names a real human cost
📖 The vulnerable are not overlooked here

## But Pray Ye That Your Flight Be Not In The Winter, Neither On The Sabbath Day

Winter brought harsh weather and flooded paths that could slow down any escape.

The sabbath restricted how far a faithful traveler would normally go on foot.

City gates might also close or stay guarded on that day.

Both details name real, practical obstacles to a fast escape.

🌧️ Winter meant harsh travel conditions
🚶 Sabbath limited how far one could travel
🚪 City gates added another obstacle
📖 Both name real obstacles to escape

## For Then Shall Be Great Tribulation, Such As Was Not Since The Beginning Of The World

Tribulation means severe, crushing distress.

This line claims a suffering without precedent up to this point in history.

The ancient historian Josephus later described the siege of Jerusalem in horrifying detail.

Many readers connect this warning directly to that very event.

💥 Tribulation means severe, crushing distress
📏 Claims suffering without precedent
📜 Josephus later described the siege in detail
📖 Many tie this to that event

## For The Elect's Sake Those Days Shall Be Shortened

Elect means those chosen by God.

This line names a limit placed on the suffering just described.

The tribulation is severe, but it is not open ended.

God's mercy toward his own people sets the boundary on how long it lasts.

🙏 Elect means those chosen by God
⏳ A real limit is placed on the suffering
🚫 Not open ended or endless
📖 Mercy sets the boundary here

# Matthew 24:23-28
# ⚡ As The Lightning Cometh
---
## Then If Any Man Shall Say Unto You, Lo, Here Is Christ, Or There, Believe It Not

This repeats the warning from earlier in the chapter, now with a direct instruction attached.

Lo here or lo there both point to a specific, visible location someone claims to show you.

The instruction is simple, refuse to believe a location based claim.

Certainty about a place is exactly what should raise suspicion.

🔁 Repeats an earlier warning directly
📍 Points to a specific claimed location
🙅 The instruction is simply refuse to believe
📖 Certainty about a place raises suspicion

## For There Shall Arise False Christs, And False Prophets, And Shall Shew Great Signs And Wonders

Signs and wonders means visible miracles meant to prove someone's authority.

A miracle alone does not prove that a claim is true.

Scripture elsewhere warns that real power can still serve a false purpose.

Impressive does not automatically mean trustworthy.

✨ Signs and wonders means visible miracles
🚫 A miracle does not prove truth
⚠️ Real power can serve a false purpose
📖 Impressive is not the same as trustworthy

## Behold, I Have Told You Before

Jesus is deliberately building a pattern of advance warning throughout this speech.

When deception eventually comes, it should feel familiar.

It should not come as a shock.

A warned mind reacts differently than a surprised one.

Advance warning is itself a form of protection.

🔁 Builds a pattern of advance warning
😮 Should feel familiar, not shocking
🧠 A warned mind reacts differently
📖 Warning itself is a form of protection

## Wherefore If They Shall Say Unto You, Behold, He Is In The Desert, Go Not Forth

The desert here means open wilderness, far from any city.

Some false claims in this period gathered followers out in remote, empty places.

The instruction is not to travel out looking for a hidden, lonely appearing.

A true arrival will not require a long trip into nowhere.

🏜️ Desert means open wilderness
🚶 Some claims gathered followers remotely
🙅 Do not travel out looking for it
📖 A true arrival needs no long trip

## Behold, He Is In The Secret Chambers, Believe It Not

Secret chambers means hidden, private inner rooms.

This is the opposite extreme from the desert.

It is a quiet, closed off claim instead of a public one.

Both locations are ruled out by the very next verse.

A real event this significant will not be a secret only a few people are shown.

🚪 Secret chambers means hidden inner rooms
↔️ The opposite extreme from the desert
🚫 Both locations get ruled out
📖 Something this big will not stay hidden

## For As The Lightning Cometh Out Of The East, And Shineth Even Unto The West

Lightning does not need to be pointed out or explained to anyone.

It is visible everywhere at once, instantly, without travel or delay.

Jesus uses this picture to describe how his own coming will appear.

No one will need a guide to go find it.

⚡ Lightning needs no explaining
🌍 Visible everywhere at once
⏱️ No travel or delay involved
📖 No guide will be needed to find it

## For Wheresoever The Carcase Is, There Will The Eagles Be Gathered Together

Carcase means a dead body.

The birds here are most likely vultures, not eagles.

This line repeats a common proverb from everyday rural life.

Wherever the outcome has happened, the evidence gathers and becomes obvious to everyone.

No one has to search for a secret location to see what occurred.

🦴 Carcase means a dead body
🦅 Likely vultures, not eagles literally
👀 The outcome becomes obvious to everyone
📖 No secret search will be needed

# Matthew 24:29-31
# 🌑 The Sign Of The Son Of Man
---
## Immediately After The Tribulation Of Those Days

Those days points directly back to the tribulation just described in the verses before this one.

This is not a separate, far off event with no connection to what came before it.

The cosmic signs that follow are tied tightly to that same timeline.

Nothing here starts a brand new, unrelated story.

🔗 Those days ties back to the tribulation
⏱️ Not a separate, far off event
📏 Tied tightly to the same timeline
📖 Nothing here starts a new story

## The Sun Shall Be Darkened, And The Moon Shall Not Give Her Light, And The Stars Shall Fall

Darkened sun, failing moon, and falling stars were standard prophetic language for a nation under judgment.

Older prophets used this exact kind of picture long before this chapter was written.

It does not necessarily describe literal astronomy breaking down.

The picture communicates upheaval and judgment on a massive scale.

🌑 Darkened sun signals judgment, a known pattern
📜 Older prophets used this same picture
🌌 Not necessarily literal astronomy
📖 Communicates massive scale upheaval

## And Then Shall Appear The Sign Of The Son Of Man In Heaven

This exact phrase appears only here in the whole Bible.

Many understand the sign and the person as the very same event.

Jesus himself becomes visible, instead of some separate signal appearing before him.

His own arrival is the sign everyone has been watching for.

🔎 This phrase is unique to this verse
🙋 The sign and the person may match
👁️ Jesus himself becomes visible
📖 His arrival is the sign itself

## And Then Shall All The Tribes Of The Earth Mourn

Mourn here carries grief mixed with dread, not simple sadness.

Tribes of the earth means every people group, not one nation alone.

This reaction belongs to those caught unprepared by what they are seeing.

A sudden, unmistakable arrival forces an honest reaction from everyone watching.

😨 Mourn means grief mixed with dread
🌍 Tribes means every people group
🙁 Belongs to those caught unprepared
📖 Forces an honest reaction from everyone

## Coming In The Clouds Of Heaven With Power And Great Glory

This picture echoes an old vision from the book of Daniel.

That vision described one like a son of man arriving on the clouds.

Jesus is directly connecting his own words to that older prophecy.

Power and glory describe open, undeniable authority, not a quiet arrival.

The link to Daniel tells the disciples exactly who this figure is.

📜 Echoes an old vision from Daniel
☁️ Describes one arriving on the clouds
💪 Power and glory mean undeniable authority
📖 Daniel tells us exactly who this is

## And He Shall Send His Angels With A Great Sound Of A Trumpet

A trumpet sound in scripture usually signals a major, public announcement.

Four winds is an old way of saying every direction at once.

No distance anywhere on earth can separate the elect from being gathered.

The angels carry out a search with no limit and no exceptions.

📯 A trumpet signals a public announcement
🧭 Four winds means every direction
🌍 No distance can separate the elect
📖 The gathering has no limit at all

# Matthew 24:32-35
# 🌳 Learn From The Fig Tree
---
## Now Learn A Parable Of The Fig Tree, When His Branch Is Yet Tender

Fig trees in this region lose all their leaves completely during winter.

New leaves on a bare branch are an easy, unmistakable signal that spring is close.

Jesus chooses a picture that anyone tending a garden would already recognize.

Tender here simply means soft and new growth.

🌳 Fig trees go fully bare in winter
🍃 New leaves are an easy signal
👨‍🌾 A picture anyone would recognize
📖 Tender means soft, new growth

## Ye Know That Summer Is Nigh

No one has to guess or calculate once the leaves appear.

The sign itself does the explaining, plainly and immediately.

This is the whole point of choosing such an ordinary, visible picture.

A clear signal does not require special training to read.

🍃 The leaves need no explaining
⏱️ The sign reads itself immediately
🌞 Nigh means close, almost here
📖 Clear signals need no special training

## When Ye Shall See All These Things, Know That It Is Near, Even At The Doors

All these things points back to the long list of signs named earlier in the chapter.

Jesus applies the fig tree picture directly to that same list.

At the doors pictures someone already standing right outside, about to arrive.

The warning signs are meant to be read the same way the leaves are.

🔗 Points back to the earlier signs
🌳 Applies the fig tree picture directly
🚪 At the doors means already arriving
📖 Signs are meant to be read plainly

## This Generation Shall Not Pass, Till All These Things Be Fulfilled

Readers have long debated exactly which generation this phrase names.

Some tie it to the people alive when Jesus spoke, matching the temple's fall about forty years later.

Others tie it to whichever generation sees the final signs actually appear.

The text does not settle every detail, but it ties the promise to something genuinely near.

❓ Readers debate which generation is meant
📅 One view ties it to the temple's fall
🔮 Another ties it to the final signs
📖 Either way, the promise stays near

## Heaven And Earth Shall Pass Away, But My Words Shall Not Pass Away

Heaven and earth passing away describes the end of the physical universe itself.

Jesus claims his own words will outlast that ending entirely.

This is an enormous claim about his own authority and permanence.

Nothing in creation is more lasting than what he has just spoken.

🌌 Heaven and earth means the whole universe
🗣️ His words will outlast that ending
👑 A huge claim about his own authority
📖 Nothing outlasts what he has spoken

# Matthew 24:36-39
# 🌊 As The Days Of Noe Were
---
## But Of That Day And Hour Knoweth No Man

Jesus shifts suddenly from signs that can be read to a date that cannot be known.

No man here includes every single human being without exception.

This line discourages any attempt to calculate an exact date.

The signs point to nearness, never to a specific day.

🔀 Shifts from signs to an unknown date
🚫 No man means absolutely no exceptions
📅 Discourages calculating an exact date
📖 Signs point to nearness, never a date

## No, Not The Angels Of Heaven, But My Father Only

Even the angels, who serve closest to God, do not hold this information.

Jesus names his own knowledge as limited here as well.

The timing is kept with the Father alone.

This detail removes any excuse for claiming special, secret knowledge of the date.

👼 Even the angels do not know
🙋 Jesus names his own knowledge as limited
🔒 The Father alone holds this timing
📖 No excuse remains for secret knowledge claims

## For As The Days Of Noe Were, So Shall Also The Coming Of The Son Of Man Be

Noe is simply a different spelling of Noah, the same man from the flood story.

Jesus draws a direct comparison between that old flood and his own return.

This comparison repeats twice more within these same few verses.

A story the disciples already knew well becomes the model for something still to come.

📖 Noe is the same Noah from Genesis
🌊 Jesus compares his return to that flood
🔁 The comparison repeats twice more here
➡️ A familiar story becomes the model

## For As In The Days Before The Flood They Were Eating And Drinking, Marrying And Giving In Marriage

Eating, drinking, and marrying are not described here as sins.

These are entirely ordinary parts of daily life.

Life continued exactly as normal right up until the flood actually began.

The real danger named here is distraction, not wickedness alone.

🍽️ Eating and drinking are ordinary, not sinful
💍 Marrying is normal daily life too
⏱️ Life continued right up to the flood
📖 The real danger is distraction

## And Knew Not Until The Flood Came, And Took Them All Away

This does not mean no warning ever existed before the flood arrived.

Noah had already preached and built the ark for a long stretch of years.

People simply did not treat that warning as something urgent or real.

Ignoring a warning and never hearing one are two very different things.

📢 A warning did already exist
🔨 Noah had built the ark for years
🙉 People just did not take it seriously
📖 Ignoring a warning is not ignorance

# Matthew 24:40-44
# 👬 Two In The Field
---
## Then Shall Two Be In The Field, The One Shall Be Taken, And The Other Left

This verse does not say which fate is the better one.

Taken echoes the same word used for the flood sweeping people away earlier in this chapter.

Read that way, taken plausibly means removed in judgment, not rescued safely.

That is the opposite of a popular modern reading of this verse.

❓ The text never says which fate is better
🌊 Taken echoes the flood language from earlier
⚖️ It may mean removed in judgment
📖 The opposite of a common modern reading

## Two Women Shall Be Grinding At The Mill

Grinding grain by hand was ordinary daily work usually shared by two women together.

This picture repeats the same separation already described in the field a moment earlier.

The division happens in the middle of completely normal, unremarkable life.

Nothing dramatic has to be happening for the moment to arrive.

🌾 Grinding grain was shared daily work
🔁 Repeats the same separation as before
🏠 Happens during normal, unremarkable life
📖 Nothing dramatic has to be happening first

## Watch Therefore, For Ye Know Not What Hour Your Lord Doth Come

Watch means staying alert and ready, not simply waiting around passively.

Doth come is an old way of simply saying comes or arrives.

Not knowing the hour is the entire reason given for staying watchful.

Uncertainty about timing becomes a reason for readiness, not anxiety.

👀 Watch means staying alert, not passive
🕰️ Doth come simply means arrives
❓ Not knowing the hour is the reason given
📖 Uncertainty should produce readiness, not fear

## If The Goodman Of The House Had Known In What Watch The Thief Would Come, He Would Have Watched

Goodman here means the male head of a household.

A watch was one of the set time periods used to divide up the night.

No homeowner plans his guarding around a thief's convenient schedule.

The whole comparison only works because a thief's timing is never announced ahead.

🏠 Goodman means the head of a household
🕰️ A watch was a set period of night
🚫 No one plans around a thief's schedule
📖 A thief's timing is never announced

## And Would Not Have Suffered His House To Be Broken Up

Suffered here means allowed or permitted, an older use of the word.

Broken up means forced open by a thief breaking in.

The homeowner's hypothetical readiness would have prevented real, costly damage.

Watchfulness is being pictured here as a form of protection, not simply caution.

✅ Suffered means allowed or permitted
🚪 Broken up means forced open by a thief
🛡️ Readiness would have prevented real damage
📖 Watchfulness protects, it is not just caution

## Therefore Be Ye Also Ready, For In Such An Hour As Ye Think Not The Son Of Man Cometh

This line closes the whole point of the thief comparison just given.

Readiness here is not about correctly guessing a date in advance.

It is about never letting ordinary life lower a person's guard completely.

The hour arrives precisely when it is least expected.

🔒 Closes the point of the thief comparison
📅 Not about guessing the date correctly
😴 About never fully lowering one's guard
📖 It arrives when least expected

# Matthew 24:45-51
# 🍽️ The Faithful And The Evil Servant
---
## Who Then Is A Faithful And Wise Servant, Whom His Lord Hath Made Ruler Over His Household

This servant is not a lowly worker with no real responsibility.

He has been placed in charge of the entire household.

This happens during the master's absence.

Faithful and wise together describe someone trustworthy.

They also describe someone genuinely capable in the role.

Real authority has been placed in this servant's hands.

🏠 Placed in charge of the whole household
👑 Given real authority, not menial work
🤝 Faithful means trustworthy
📖 Wise means genuinely capable too

## To Give Them Meat In Due Season

Meat in this older sense simply means food in general, not only animal flesh.

Due season means the right, expected time, not whenever happens to be convenient.

The servant's job continues on schedule, even without anyone checking on him.

Consistency without supervision is exactly what is being tested here.

🍞 Meat means food in general here
⏰ Due season means the right, expected time
👀 The job continues without supervision
📖 Consistency is being tested, not one moment

## Blessed Is That Servant, Whom His Lord When He Cometh Shall Find So Doing

The reward described here is for being caught doing the job consistently.

It is not a reward for one good moment timed around an expected inspection.

So doing points back to the steady, daily feeding work just described.

Faithfulness over time is what gets noticed and rewarded.

🏆 Blessed for consistent work, not one moment
🚫 Not timed around an expected inspection
🔁 So doing means the steady daily work
📖 Faithfulness over time gets rewarded

## But And If That Evil Servant Shall Say In His Heart, My Lord Delayeth His Coming

This evil servant is the exact same role described moments earlier, just gone wrong.

The corruption begins privately, inside his own thinking, before it ever shows outwardly.

Delayeth simply means is taking longer than expected to return.

A private assumption about delay becomes the seed of everything that follows.

🔄 The same role, gone wrong
🧠 Corruption starts privately, in his thinking
⏳ Delayeth means taking longer than expected
📖 A private assumption becomes the seed of ruin

## And Shall Begin To Smite His Fellowservants

Smite means to strike or beat, a real act of physical harm.

Fellowservants means the other workers he was supposed to be caring for.

Assuming the master is gone for good, he turns on the very people in his charge.

Authority without accountability curdles quickly into abuse.

✊ Smite means to strike or beat
🤝 Fellowservants are the people in his care
🔄 He turns on those he should protect
📖 Authority without accountability turns to abuse

## And To Eat And Drink With The Drunken

This servant stops working and starts indulging himself instead.

Drunken describes people given over to excess, not one isolated slip.

His confidence that the master will not return soon fuels this indulgence.

Assumed delay becomes an excuse for abandoning the job entirely.

🍷 He indulges himself instead of working
🔁 Drunken means habitual excess, not one slip
😌 False confidence fuels the indulgence
📖 Assumed delay becomes an excuse

## The Lord Of That Servant Shall Come In A Day When He Looketh Not For Him

The very delay this servant was counting on becomes the exact thing that exposes him.

Looketh not for him means caught completely off guard, with no warning felt at all.

Confidence in delay is precisely what dooms him in the end.

The timing that seemed safest turns out to be the most dangerous.

🎯 The expected delay becomes the exposure
😲 Caught completely off guard
💀 His own confidence dooms him
📖 The safest seeming moment was the most dangerous

## And Shall Cut Him Asunder, And Appoint Him His Portion With The Hypocrites

Hypocrites means those who outwardly performed faithfulness.

They never truly lived it themselves.

Gnashing of teeth is a phrase used repeatedly in Matthew for intense anguish and furious regret.

This servant's punishment matches the group he has truly belonged to all along.

The ending names a real, specific consequence.

It is not a vague warning.

🎭 Hypocrites means performing faith without living it
😖 Gnashing of teeth means intense anguish
🔁 This phrase repeats often in Matthew
📖 A real consequence, not a vague warning
`.trim();

export const MATTHEW_TWENTY_FOUR_PERSONAL_SECTIONS = parseMatthewTwentyFourRawNotes(MATTHEW_TWENTY_FOUR_RAW_NOTES);
