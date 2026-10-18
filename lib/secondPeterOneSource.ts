export type SecondPeterOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondPeterOneRawNotes(rawText: string): SecondPeterOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondPeterOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondPeter\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Peter 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondPeter\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondPeter\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Peter 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Peter 1:${startVerse}` : `2 Peter 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Peter 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_PETER_ONE_RAW_NOTES = `# SecondPeter 1:1-3
# 🤝 An Equal Gift To Every Believer
---
## 🧎 Simon Peter, A Servant And An Apostle

"Servant" is the Greek word for a bondservant.

That person belonged fully to someone else.

Peter calls himself a servant before he calls himself an apostle.

"Apostle" means someone personally sent out with Christ's own authority.

Peter lists humility first and authority second.

🙇 Servant means a bondservant
📨 Apostle means sent with authority
🔁 Servant comes before apostle here
📖 Humility leads, authority follows

## ⚖️ Like Precious Faith With Us

"Like precious" means equal in value.

Peter is writing mostly to Gentile believers.

They never walked with Jesus the way the apostles did.

Peter tells them their faith carries the same worth.

No believer gets a smaller share of faith.

⚖️ Like precious means equal value
🌍 Written mostly to Gentile believers
🚫 Their faith is not second rate
📖 Every believer shares the same faith

## ✝️ The Righteousness Of God And Our Saviour Jesus Christ

This phrase names one person two different ways.

Jesus is called both God and Savior together.

Peter states this directly in his very first sentence.

Most Jews of that time never called a man God.

This is a bold claim about who Jesus really is.

📝 One phrase, two titles, one person
✝️ Jesus is named God and Savior
💬 Peter states it in his first sentence
📖 A bold claim about who Jesus is

## 📈 Grace And Peace Be Multiplied

Most New Testament letters simply say grace and peace be unto you.

Peter instead prays that grace and peace would be multiplied.

"Multiplied" means a growing supply, not a flat gift.

Peter wants this grace to increase over time.

✉️ Normal greetings say be unto you
📈 Peter prays for multiplied grace
🔁 Multiplied means growing, not flat
➡️ Peter wants ongoing increase

## 🧠 Through The Knowledge Of God, And Of Jesus Our Lord

"Knowledge" here means a full, personal knowing.

It is not simply facts memorized about God.

It is closer to knowing a close friend than knowing a fact.

Grace and peace grow as that personal knowledge grows.

🧠 Knowledge means personal knowing
📚 Not just facts memorized
🤝 Like knowing a friend closely
📖 Growth comes through knowing God

## 🎁 His Divine Power Hath Given Unto Us All Things

"Hath given" is already finished, past tense.

Everything needed for life and godliness was already supplied.

This happened before the reader even started trying.

Nobody has to earn these things one at a time.

God's own power did the giving.

🎁 Hath given means already supplied
⏳ This happened before any effort
🚫 Nothing here is earned
📖 God's own power provided it

## 🏛️ Called Us To Glory And Virtue

"Virtue" translates the Greek word arete.

That word meant moral excellence and courage to Peter's readers.

It was a word borrowed from everyday Greek culture.

"Glory" points forward to what believers will become.

Virtue points to how they should live right now.

🏛️ Virtue means moral excellence
🌍 Borrowed from Greek culture
✨ Glory points to the future
📖 Virtue shapes life now

# SecondPeter 1:4-7
# 🪜 Building The Ladder Of Character
---
## 💎 Exceeding Great And Precious Promises

Peter stacks three words together on purpose.

"Exceeding," "great," and "precious" are not one ordinary blessing.

These promises are valuable beyond normal description.

They are the reason the gift in verse three matters.

📜 Three words stack for emphasis
💎 Precious means extremely valuable
🔗 These promises connect to verse three
📖 Ordinary words barely hold their value

## ❤️ Partakers Of The Divine Nature

This does not mean a believer becomes God.

It means sharing in God's own moral character.

That includes His holiness, love, and goodness.

Early Christians used this phrase for real inner transformation.

God actually changes what a believer is like inside.

🚫 Does not mean becoming God
❤️ Means sharing God's character
🔄 Describes real inner change
📖 Transformation, not just status

## 🍂 Escaped The Corruption That Is In The World Through Lust

"Corruption" means decay, the same word used for rot.

"Lust" here means any strong, wrong desire.

It is not limited to sexual desire alone.

The world's corruption spreads through that kind of desire.

Believers are described as already escaped from it.

🍂 Corruption means decay or rot
🔥 Lust means strong wrong desire
🌍 Desire spreads the world's decay
📖 Believers already escaped it

## 🏃 Giving All Diligence

"Diligence" means urgent, focused effort.

Peter just said God's power already supplied everything needed.

Now he tells the reader to still put in real effort.

Both things are true together in this letter.

🏃 Diligence means urgent effort
⚡ God already supplied the power
💪 Believers still must work
📖 Both truths stand together

## 🧱 Add To Your Faith Virtue

"Add" pictures one thing building onto another.

Think of adding a new room onto a house.

Faith is the foundation that starts this whole list.

Virtue builds on top of that foundation next.

🏠 Add pictures building something on
🧱 Faith is the foundation
🏛️ Virtue builds on top of it
📖 Faith alone stays unfinished here

## 🧩 To Virtue Knowledge

This "knowledge" uses a different Greek word than verse three.

Here it means practical wisdom.

It means knowing how to apply what is right.

Moral courage without wisdom can still act clumsily.

🧩 A different word than verse three
🛠️ Means practical, usable wisdom
🏛️ Sharpens virtue into action
📖 Right intent still needs wisdom

## 🛑 To Knowledge Temperance

"Temperance" means self control over desire and impulse.

Knowing the right thing is not the same as doing it.

Self control carries knowledge into real action.

Without it, good knowledge can still lead to a bad choice.

🛑 Temperance means self control
🧠 Knowing right is not enough
🏃 Self control carries it into action
📖 Without it, knowledge can fail

## ⏳ To Temperance Patience

"Patience" here means steady endurance under pressure.

It is more than simply waiting quietly.

Self control handles a single moment of temptation.

Patience holds that same control steady over time.

⏳ Patience means steady endurance
⚡ Self control handles one moment
🛤️ Patience holds it over time
📖 Character grows slowly, not quickly

## 🙏 To Patience Godliness

"Godliness" means a life shaped around reverence for God.

Enduring hardship alone does not guarantee a godly life.

Someone can be tough without ever becoming godly.

Patience has to aim at God to become godliness.

🙏 Godliness means a God shaped life
💪 Toughness alone is not enough
🎯 Patience must aim at God
📖 Endurance needs a right direction

## 👨‍👩‍👧 To Godliness Brotherly Kindness

"Brotherly kindness" translates the Greek word philadelphia.

That word comes from the word for family love between siblings.

A life turned toward God naturally turns toward other believers next.

Godliness was never meant to stay private.

👨‍👩‍👧 Philadelphia means family style love
🙏 Follows directly after godliness
⛪ Aimed at fellow believers
📖 Godliness turns outward, not inward

## 🌍 To Brotherly Kindness Charity

"Charity" translates agape, the broadest love in the New Testament.

Brotherly kindness loves people who already feel like family.

Agape stretches that same love toward everyone else.

That includes people who are hard to love.

The whole chain in these verses ends on the widest love there is.

❤️ Charity translates agape love
👨‍👩‍👧 Wider than family style affection
🌍 Reaches people hard to love
📖 The chain ends on the widest love

# SecondPeter 1:8-11
# 🌳 Bearing Real Fruit
---
## 📈 Be In You, And Abound

Peter is not satisfied with these qualities in small amounts.

"Abound" means overflowing, not barely present.

The whole chain from verses five through seven is meant to grow.

A faith that never grows was never the goal.

📈 Abound means overflowing growth
🚫 Not satisfied with a small amount
🪜 The whole chain is meant to grow
📖 A stagnant faith misses the goal

## 🌾 Neither Be Barren Nor Unfruitful

"Barren" pictures a field that produces nothing at all.

"Unfruitful" pictures a tree that grows but bears no fruit.

Peter uses both pictures so no excuse is left standing.

Real knowledge of Jesus always shows up as something visible.

🌾 Barren means a field with nothing
🌳 Unfruitful means a tree with no fruit
🚫 Two pictures leave no excuse
📖 Real knowledge shows visible fruit

## 🙈 He That Lacketh These Things Is Blind

Peter now describes the opposite kind of person.

"Blind" does not mean never having had sight at all.

It pictures someone missing something that should be obvious.

Lacking these qualities clouds a believer's own spiritual vision.

🙈 Blind means missing the obvious
🔄 The opposite case from verse eight
👁️ Not total blindness from birth
📖 Missing growth clouds spiritual sight

## 🔭 Cannot See Afar Off

This phrase adds a second layer to the blindness.

"Afar off" means beyond what is right in front of someone.

This person loses sight of their future hope and purpose.

This shortsightedness is spiritual, not physical.

🔭 Afar off means the bigger picture
🚫 Lost sight beyond right now
🧭 Loses future hope and purpose
📖 A spiritual shortsightedness

## 🧼 Hath Forgotten That He Was Purged From His Old Sins

"Purged" means cleansed, washed completely clean.

This person was genuinely forgiven once.

Peter says they forgot that cleansing, not that it never happened.

Forgetting what Jesus already did leads back to spiritual blindness.

🧼 Purged means cleansed completely
✅ Real forgiveness happened once
🙈 They have forgotten that cleansing
📖 Forgetting leads back to blindness

## 🎯 Give Diligence To Make Your Calling And Election Sure

"Calling" is God's invitation into faith.

"Election" is God's own choosing of His people.

Both already belong to every true believer from God's side.

Peter tells them to make it sure through real effort.

📯 Calling means God's invitation
🎯 Election means God's own choosing
✅ Both already stand true from God
➡️ Effort makes it sure day to day

## 🛡️ Ye Shall Never Fall

This is not a promise that life will stay painless.

It is a promise against total spiritual collapse.

Someone actively growing in these qualities will not quietly drift away.

Growth itself becomes the believer's protection.

🛡️ Not a promise of an easy life
🚫 A promise against total collapse
🌱 Growth prevents quiet drifting
📖 Growth itself protects the believer

## 🚪 An Entrance Shall Be Ministered Unto You Abundantly

"Ministered" means a grand, generous welcome.

Think of a hero given an honored entrance into a city.

"Abundantly" means this welcome will not be small or quiet.

Peter is painting the believer's arrival into eternity as a celebration.

This is the finish line the whole ladder was building toward.

🚪 Ministered pictures a grand welcome
🎉 Abundantly means no small entrance
🏙️ Like a hero entering a city
📖 The whole ladder built toward this

# SecondPeter 1:12-15
# ⛺ Preparing For His Own Departure
---
## 🔁 I Will Not Be Negligent To Put You Always In Remembrance

Peter is not teaching something brand new here.

He is repeating truth they already know on purpose.

"Negligent" means careless or lazy about the job.

Reminding people of what they already know is still real work.

🔁 Peter repeats known truth on purpose
🚫 Negligent means careless or lazy
👨‍🏫 Reminding is still real teaching
📖 Known truth still needs repeating

## 🏗️ Though Ye Know Them, And Be Established In The Present Truth

"Established" means firmly grounded, like a building on solid rock.

Peter admits plainly that his readers already stand on solid truth.

He still believes they need the reminder anyway.

Firm believers can drift if nobody keeps reminding them.

🏗️ Established means firmly grounded
✅ Peter admits they already know this
🔁 He still gives the reminder
📖 Even firm believers need reminding

## ⛺ As Long As I Am In This Tabernacle

"Tabernacle" here means a tent.

Peter is using it to describe his own body.

A tent is temporary housing, built to be taken down one day.

His urgency in this letter comes from knowing his time is short.

⛺ Tabernacle here means a tent
🏠 A tent is temporary, not permanent
⏳ Peter calls his own body temporary
📖 Urgency flows from limited time

## ⏰ To Stir You Up By Putting You In Remembrance

"Stir up" pictures waking someone from sleep.

Peter's goal is not just handing over information.

He wants his readers active and alert, not drowsy.

A good reminder wakes people up instead of lulling them back to sleep.

⏰ Stir up pictures waking someone
🚫 Not just handing over information
👀 The goal is active alertness
📖 A good reminder wakes people up

## ⏳ Knowing That Shortly I Must Put Off This My Tabernacle

"Put off" continues the tent picture, taking the tent down for good.

Peter is saying plainly that his death is coming soon.

Tradition holds that Peter was executed under the emperor Nero.

He writes this letter already knowing the end is near.

⛺ Put off means taking the tent down
⏳ Peter expects death soon
👑 Tradition points to Nero's persecution
📖 He writes knowing the end is near

## 👁️ Even As Our Lord Jesus Christ Hath Shewed Me

Peter says Jesus Himself revealed this coming death to him.

This likely points back to a moment in John chapter twenty one.

There Jesus told Peter plainly how his life would end.

Peter had carried that knowledge for years by the time he wrote this.

👁️ Jesus revealed this to Peter directly
🔗 Points back to John chapter twenty one
⏳ Peter carried this news for years
📖 Scripture connects across two books

## 📜 After My Decease To Have These Things Always In Remembrance

"Decease" is a plain word for death.

Peter uses it instead of anything more dramatic.

He is planning past his own death on purpose.

He wants this letter itself to keep reminding readers once he is gone.

That is exactly what is still happening as this letter is read today.

⚰️ Decease simply means death
📝 Peter plans past his own death
📜 The letter outlives the writer
📖 This reminder still works today

# SecondPeter 1:16-18
# 🏔️ Eyewitnesses On The Mountain
---
## 📚 We Have Not Followed Cunningly Devised Fables

"Cunningly devised fables" means cleverly made up stories.

These were myths dressed up to sound believable.

Some false teachers in Peter's day were already spreading tales like this.

Peter directly denies that his own message is one of those stories.

📚 Fables means cleverly made up myths
⚠️ False teachers already spread these
🚫 Peter denies this is his message
➡️ He is about to prove why

## 👑 The Power And Coming Of Our Lord Jesus Christ

"Coming" here is the Greek word parousia.

That word was used for a king's grand arrival.

Peter is not only talking about Jesus's first arrival on earth.

He also means Christ's future return in glory.

What Peter saw on the mountain was a preview of that glory.

👑 Parousia means a king's grand arrival
🌍 Points to Christ's future return
🏔️ The mountain was a preview
📖 Future glory, glimpsed early

## 👀 We Were Eyewitnesses Of His Majesty

"Eyewitnesses" means they personally saw this happen.

Peter is pointing to the Transfiguration, recorded in three gospels.

Peter, James, and John all saw Jesus transformed in glory there.

This is Peter's strongest proof against the charge of inventing stories.

👀 Eyewitnesses means they saw it firsthand
🏔️ Points to the Transfiguration
👥 Peter, James, and John were there
📖 Firsthand proof against invented tales

## 🎯 He Received From God The Father Honour And Glory

This describes one specific moment, not a general statement.

God the Father is pictured publicly honoring the Son.

The glory Jesus received there was visible, not only symbolic.

Peter watched it happen with his own eyes.

🎯 Describes one specific moment
👑 God the Father honors the Son
✨ The glory was visibly seen
📖 Peter personally watched it

## 🔁 This Is My Beloved Son, In Whom I Am Well Pleased

These exact words were also spoken at Jesus's baptism.

Hearing them again on the mountain confirms this was not one time only.

God the Father directly names Jesus as His Son here.

No human testimony could outweigh the Father's own voice.

🔁 The same words as His baptism
✅ Confirms this was not one time only
👨‍👦 God names Jesus as His Son
📖 No testimony outweighs God's own voice

## 👂 This Voice Which Came From Heaven We Heard

Peter stresses direct, personal experience again, we heard it.

This was not a story passed down through others.

He stood close enough to hear God's own voice.

Peter's whole argument rests on being there, not on hearsay.

👂 We heard stresses direct experience
🚫 Not a secondhand story
📍 Peter stood close enough to hear
📖 His proof rests on being there

## 🏔️ When We Were With Him In The Holy Mount

"The holy mount" likely refers to a mountain near Caesarea Philippi.

Some scholars point to Mount Hermon specifically.

It is called holy because of what happened there, not beforehand.

Peter anchors his testimony to a real place he personally stood.

🏔️ Likely the Mount Hermon area
✨ Called holy because of the event
📍 Not holy as a shrine beforehand
📖 Real testimony tied to a real place

# SecondPeter 1:19-21
# 🌟 A Light Until The Morning
---
## 📜 A More Sure Word Of Prophecy

Peter just described his own eyewitness experience on the mountain.

Now he says scripture itself is even more sure than that experience.

Personal experience can fade or be doubted over time.

Written scripture stands as a steadier foundation than one person's memory.

👀 Even stronger than his own experience
📜 Points to scripture itself
🧠 Memory and experience can fade
📖 Scripture stands as the steadier ground

## 💡 A Light That Shineth In A Dark Place

Peter pictures scripture as a light source in total darkness.

A reader walking through confusion needs exactly that kind of light.

The darkness here represents a world still confused about the truth.

Scripture does not answer every question but shows the next step.

💡 Scripture pictured as a light
🌑 Darkness means a confused world
🚶 Light guides the next step
📖 Not every question answered at once

## 🌟 Until The Day Dawn, And The Day Star Arise In Your Hearts

"Day star" means the morning star, the brightest light before sunrise.

Peter is picturing the full arrival of Christ at His return.

Scripture is the light needed for the waiting.

Christ's own coming is the full sunrise.

🌟 Day star means the morning star
🌅 Pictures Christ's full return
💡 Scripture lights the waiting period
📖 The lamp points toward the sunrise

## 🙅 No Prophecy Of The Scripture Is Of Any Private Interpretation

"Private interpretation" means a reading from one person's own imagination alone.

Peter is not saying scripture cannot be understood personally.

He means true prophecy never originated from a human author's own idea.

Its true source was never one person's private mind.

🙅 Private interpretation means one person's own idea
🔍 Scripture can still be understood personally
🚫 Prophecy did not originate that way
➡️ Its true source was never one private mind

## 🧠 The Prophecy Came Not In Old Time By The Will Of Man

"Will of man" means human choice or human invention.

Peter denies that any Old Testament prophet simply invented their own words.

The source of true prophecy was never a human decision.

This directly answers the warning about fables back in verse sixteen.

🧠 Will of man means human invention
🚫 Prophets did not invent their own ideas
🔗 Answers the fables warning from verse sixteen
📖 True prophecy never started with a human choice

## ⛵ Holy Men Of God Spake As They Were Moved By The Holy Ghost

"Moved" pictures a ship carried forward by wind filling its sails.

The human writers kept their own style and their own words.

The Holy Spirit was the one actually directing where the message went.

Scripture is fully human in its writing and fully divine in its source.

⛵ Moved pictures wind filling a sail
✍️ Human writers kept their own style
🕊️ The Holy Spirit directed the message
📖 Scripture is human written, divine sourced
`.trim();

export const SECOND_PETER_ONE_PERSONAL_SECTIONS = parseSecondPeterOneRawNotes(SECOND_PETER_ONE_RAW_NOTES);
