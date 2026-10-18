export type SecondPeterThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondPeterThreeRawNotes(rawText: string): SecondPeterThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondPeterThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondPeter\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Peter 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondPeter\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondPeter\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Peter 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Peter 3:${startVerse}` : `2 Peter 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Peter 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_PETER_THREE_RAW_NOTES = `# SecondPeter 3:1-4
# 😏 Scoffers Mock The Promise
---
## 📜 This Second Epistle

"This second epistle" names the letter itself, confirming Peter wrote it as a follow up letter.

It connects directly back to his first letter, known today as First Peter.

Both letters share one goal, protecting believers from being pulled away from the truth.

Peter writes as someone running out of time, not someone writing casually.

📜 Second epistle means this very letter
🔗 It follows Peter's first letter
🎯 Both guard believers from error
📖 Peter writes with real urgency

## 🧠 Stir Up Your Pure Minds By Way Of Remembrance

"Stir up" means to wake up something that has gone sluggish or forgotten.

Peter is not teaching anything new in this chapter.

He is jogging memory, pointing back to truth these readers already learned.

A pure mind is one not clouded by the scoffers he is about to describe.

🧠 Stir up means to wake up memory
📚 Peter teaches nothing new here
🔁 He reminds them of old truth
📖 A clear mind resists being fooled

## 📖 Spoken Before By The Holy Prophets

The holy prophets refers to the Old Testament writers who spoke for God centuries earlier.

Peter is reminding the church that this warning is not a brand new idea.

Men like Isaiah and Daniel already warned about mockers and a coming judgment.

Scripture has always prepared readers for this exact moment.

📜 Holy prophets means Old Testament writers
⏳ Their warnings came centuries earlier
🔁 This warning is nothing new
📖 Scripture always prepared readers for this

## 🕊️ The Commandment Of Us The Apostles Of The Lord And Saviour

Peter places apostolic teaching on the same level as the Old Testament prophets.

The "commandment" is the authoritative teaching Jesus gave through His sent apostles.

Readers are being told to trust two sources together, not one over the other.

Old promise and new teaching point in the exact same direction.

🕊️ Apostles speak with the Lord's authority
⚖️ Old prophets and apostles stand together
🤝 Two sources, one trusted direction
📖 Both point toward the same truth

## ❗ Knowing This First

"Knowing this first" signals the single most important truth Peter wants remembered.

Everything that follows in this chapter builds on this one warning.

Peter is not casually mentioning something here.

He is flagging it as essential information.

A reader who skips this line misses the whole point of the chapter.

❗ Knowing this first means pay attention
🏗️ Everything that follows builds on this
🎯 Peter flags this as essential
📖 Missing this misses the whole point

## 😏 Scoffers, Walking After Their Own Lusts

A scoffer is someone who mocks and refuses to take a warning seriously.

These scoffers are not neutral skeptics asking honest questions.

"Walking after their own lusts" means their doubt is driven by desire, not logic.

They want freedom from accountability, so disbelief becomes convenient.

😏 Scoffer means someone who mocks warnings
🤷 Not honest doubt, but desire
🔓 They want freedom from accountability
📖 Convenient disbelief is still disbelief

## ❓ Where Is The Promise Of His Coming

This is the scoffers' core argument stated as a taunting question.

They are asking why Jesus has not returned as promised.

The delay, in their eyes, is proof the promise was never real.

Scripture's whole point, however, is that delay is not denial.

❓ Their question doubts Christ's return
⏳ Delay felt like proof to them
🚫 Delay is not the same as denial
📖 The promise still stands unbroken

## 😴 Since The Fathers Fell Asleep

"Fell asleep" is a common Bible way of describing death without using the harsher word.

"The fathers" likely means earlier generations of believers, possibly reaching back to the patriarchs.

Scoffers point out that none of those who died have seen Christ return yet.

To them, a long silence feels like permanent proof nothing is coming.

😴 Fell asleep is a gentle word for death
👴 Fathers means earlier generations of believers
⏳ None of them saw Christ return
📖 Silence is not the same as proof

## 🌍 All Things Continue As They Were From The Beginning Of The Creation

This is the scoffers' deeper claim.

They say the world simply runs on its own, unchanged forever.

Nature itself, they argue, proves nothing ever interrupts it.

Peter is about to answer this claim with real history.

The world has already been interrupted once.

It will be interrupted again.

🌍 Scoffers claim nothing ever changes
🧭 Nature alone, they say, proves it
📚 Peter answers this with real history
📖 The world has already been interrupted

# SecondPeter 3:5-7
# 🌊 Water Then, Fire Still To Come
---
## 🙈 Willingly Are Ignorant Of This

"Willingly ignorant" does not mean the scoffers lack information.

It means they choose not to look at it honestly.

Peter is naming a decision, not a simple mistake.

Refusing truth on purpose is different from never hearing it.

🙈 Willingly ignorant means choosing not to look
🚫 This is not a lack of information
✋ Peter names a deliberate decision
📖 Refusing truth differs from never hearing it

## 🏔️ By The Word Of God The Heavens Were Of Old

Peter points back to Genesis, where God simply spoke the world into existence.

No tools or struggle were needed, only His word.

That same creating word is about to matter again later in this chapter.

What made the world can also judge it.

🏔️ God's word alone made the heavens
🛠️ No tools or struggle were needed
🔁 This same word returns later here
📖 What made the world can judge it

## 💧 The Earth Standing Out Of The Water And In The Water

This phrase describes dry land being pulled up out of the surrounding waters.

It echoes Genesis, where God gathered the waters so land could appear.

The earth was shaped by water from its very first days.

That same water will matter again just one verse later.

💧 Earth rose out of the waters
📜 This echoes Genesis forming dry land
🌊 Water shaped the earth from the start
📖 The same water returns one verse later

## 🌊 Being Overflowed With Water, Perished

This verse names the flood from the days of Noah directly.

"The world that then was" means the ordered world of that time, not the planet itself.

That world did not simply fade away.

It was destroyed by water.

History already proved God's word can undo an entire world.

🌊 This verse names Noah's flood directly
🌍 World then was means that era's order
💥 That world did not fade away
📖 God's word already undid one world

## 🔥 Kept In Store, Reserved Unto Fire

"Kept in store" means the present world is being preserved on purpose, not by accident.

The same word that once judged with water now holds the world for a different ending.

This time the judgment waiting ahead is fire, not flood.

Nothing about the next judgment is random or without warning.

🔥 Kept in store means preserved on purpose
🌊 Water judged before, fire waits now
⏳ Reserved means set aside deliberately
📖 This judgment will not be random

## ⚖️ Against The Day Of Judgment And Perdition Of Ungodly Men

"Perdition" means complete and final ruin.

This judgment is aimed specifically at those who reject God.

Peter is not describing a vague future threat.

He is naming an exact day with an exact outcome.

⚖️ Perdition means complete and final ruin
🎯 This judgment targets those who reject God
📅 Peter names an exact coming day
📖 The outcome is already decided

# SecondPeter 3:8-10
# ⏳ The Day Of The Lord Comes Like A Thief
---
## 📆 One Day Is With The Lord As A Thousand Years

Peter quotes an idea already stated in the Psalms.

God does not experience time the way people do.

A single day can carry the weight of a thousand years to Him.

This verse answers the scoffers' complaint about a long delay.

📜 Peter echoes an idea from the Psalms
⏳ God experiences time differently than people
📆 One day can equal a thousand years
📖 This answers the scoffers' delay complaint

## 🔁 A Thousand Years As One Day

Peter states the comparison in reverse to make the point land twice.

A thousand years to people can feel brief to God instead.

This is not saying time is meaningless to God.

It is saying His patience cannot be measured by a human calendar.

🔁 Peter repeats the point in reverse
⏳ A long wait feels brief to God
📏 Time is not meaningless to Him
📖 Patience cannot be measured by a calendar

## 🐢 The Lord Is Not Slack Concerning His Promise

"Slack" means late or careless about keeping a commitment.

Peter flatly denies that charge here.

God has not forgotten or lost track of His promise.

What looks like delay to us is not delay to Him.

🐢 Slack means late or careless
🙅 Peter flatly denies that charge
🧭 God has not lost track of anything
📖 Our delay is not His delay

## ⏳ Not Willing That Any Should Perish

God's patience is not passive waiting.

It has a clear purpose behind it.

"Longsuffering" means choosing patience even when a faster response seems fair.

He is giving space for people to repent before judgment falls.

Delay, for God, is an act of mercy.

⏳ Patience has a clear purpose
🤲 Longsuffering means choosing patience on purpose
🚪 God gives space to repent first
📖 Delay here is mercy, not neglect

## 🕵️ The Day Of The Lord Will Come As A Thief In The Night

A thief gives no warning before breaking in.

Peter uses that picture to describe how sudden this day will be.

Nobody will get a countdown or a final signal first.

The warning has already been given.

The timing has not.

🕵️ A thief gives no warning first
⚡ This day arrives suddenly, not gradually
🔇 No countdown will be given
📖 The warning came already, the timing did not

## 💥 The Heavens Shall Pass Away With A Great Noise

Peter describes the visible sky itself coming apart.

"Great noise" pictures something violent and impossible to miss.

This is not a quiet fading.

It is a dramatic ending.

Nothing about that day will happen unnoticed.

💥 The sky itself comes apart
📢 Great noise means something violent
🚫 This is not a quiet ending
📖 Nothing that day goes unnoticed

## 🔥 The Elements Shall Melt With Fervent Heat

"Elements" here means the basic physical materials that make up the world.

"Fervent heat" describes an intensity far beyond any normal fire.

Peter is picturing matter itself being undone, not just surface damage.

This is total, not partial, destruction.

🔥 Elements means the basic materials of the world
🌡️ Fervent heat means extreme intensity
💢 Matter itself is being undone
📖 This destruction is total, not partial

## 🌍 The Earth Also And The Works That Are Therein Shall Be Burned Up

"The works that are therein" means everything humans have built on the earth.

Every structure, system, and achievement is included in this picture.

Nothing people are proud of survives this moment unchanged.

Peter is describing a complete ending, not a partial one.

🌍 Works therein means everything humans built
🏗️ Every structure and system is included
🔥 Nothing survives this moment unchanged
📖 This ending is complete, not partial

# SecondPeter 3:11-13
# ✨ Living Toward A New Heaven And Earth
---
## 🔮 Seeing Then That All These Things Shall Be Dissolved

Peter now turns from prediction to application.

Everything just described is certain, not a maybe.

That certainty is meant to change how people live right now.

Truth about the future should shape choices in the present.

🔮 Peter turns from prediction to application
✅ This certainty is not a maybe
🧭 The future should shape present choices
📖 Truth about tomorrow guides today

## 🙏 What Manner Of Persons Ought Ye To Be In All Holy Conversation And Godliness

"Conversation" in the King James Bible means conduct, a person's whole way of living.

Peter is asking what kind of people this coming judgment should produce.

"Holy" and "godliness" point toward a life that actually looks like God's character.

Knowing the ending should change the way someone lives today.

🗣️ Conversation here means conduct, not talk
❓ Peter asks what kind of people
✨ Holy and godliness picture God's character
📖 The ending should shape today's living

## ⏩ Looking For And Hasting Unto The Coming Of The Day Of God

"Looking for" means watching with real expectation, not idle curiosity.

"Hasting unto" means actively living in a way that moves toward that day.

Peter wants active anticipation, not passive waiting around.

Belief in a coming day should show up in daily choices.

⏩ Looking for means real expectation
🏃 Hasting unto means actively moving toward it
🚫 Not passive waiting, active living
📖 Belief shows up in daily choices

## ☄️ Wherein The Heavens Being On Fire Shall Be Dissolved

This repeats the same fiery ending described back in verse ten.

Peter is not introducing a new idea here.

He is anchoring the reader's hope to that same certain event.

The ending described earlier is the very thing believers are watching for.

🔁 This repeats verse ten's fiery ending
🔗 Peter anchors hope to that event
👀 Believers watch for this same day
📖 The ending and the hope are linked

## 🌅 According To His Promise, Look For New Heavens And A New Earth

Peter points to a promise made through the prophets, especially in Isaiah.

The destruction described earlier is not the final word.

Something new is promised to replace what is torn down.

Judgment and renewal are part of the very same plan.

🌅 Peter points to Isaiah's promise
🔚 Destruction is not the final word
🌱 Something new replaces what is torn down
📖 Judgment and renewal share one plan

## 🕊️ Wherein Dwelleth Righteousness

The new heavens and new earth are defined by one quality above all.

Righteousness means everything there finally lines up with God's character.

Nothing wicked gets carried over into that new world.

This is the hope Peter wants his readers to hold onto.

🕊️ Righteousness defines the new creation
✅ Everything there matches God's character
🚫 Nothing wicked carries over there
📖 This hope is worth holding onto

# SecondPeter 3:14-16
# ✍️ Diligence And Paul's Hard Sayings
---
## 🕊️ Be Diligent That Ye May Be Found Of Him In Peace, Without Spot, And Blameless

"Diligent" means actively working at something, not sitting back and hoping.

Peter gives a clear goal, being found ready whenever Christ returns.

"Without spot, and blameless" describes a life marked by integrity, not perfection.

Waiting for Christ is meant to be active, not lazy.

🕊️ Diligent means actively working at this
🎯 The goal is being found ready
✨ Without spot pictures a life of integrity
📖 Waiting on Christ is active, not lazy

## 🙏 Account That The Longsuffering Of Our Lord Is Salvation

Peter wants the delay reinterpreted, not resented.

God's patience is not a withheld blessing.

It is the very thing giving people time to be saved.

Every extra day is an open door, not a broken promise.

🙏 Peter reinterprets the delay here
🚪 Patience is not withheld blessing
⏳ Extra time gives room to be saved
📖 Delay is mercy, not a broken promise

## ✍️ Our Beloved Brother Paul According To The Wisdom Given Unto Him

Peter openly commends Paul's writings as trustworthy and wise.

This matters because the two apostles did not always travel the same path.

Peter still recognizes Paul's letters as carrying real, God given insight.

Two different voices can still point toward the exact same truth.

✍️ Peter commends Paul's writings here
🤝 The two apostles did not always agree
📚 Paul's letters still carry real insight
📖 Different voices still share one truth

## 🤔 Some Things Hard To Be Understood

Peter admits plainly that not everything Paul wrote is simple to follow.

This honesty is not a weakness in Scripture.

An apostle could admit a hard passage out loud without shame.

Hard passages are a real feature of the text, not a flaw to hide.

🤔 Peter admits some writing is hard
💡 This honesty is not a weakness
🗣️ An apostle could admit this freely
📖 Hard passages are a real feature

## 🌀 Unlearned And Unstable Wrest

"Wrest" means to twist something forcefully out of its original shape.

Peter is not criticizing honest confusion here.

He is warning against people who bend Scripture to say what they want.

That kind of twisting leads somewhere destructive, not just somewhere wrong.

🌀 Wrest means twisting something out of shape
🎯 This is not honest confusion
🙅 It is bending Scripture on purpose
📖 Twisting Scripture leads somewhere destructive

## 📚 As They Do Also The Other Scriptures

Peter calls Paul's letters scriptures here, placing them beside the Old Testament.

That single word choice is a significant moment in church history.

Paul's writings are not treated as merely helpful advice.

They are treated as carrying the same God given authority.

📚 Peter calls Paul's letters scriptures
🏛️ Old and new writings stand together
⚖️ Not just advice, but authority
📖 Paul's letters carry God given weight

# SecondPeter 3:17-18
# 🌱 Grow In Grace, Keep Your Footing
---
## ⚠️ Seeing Ye Know These Things Before

Peter reminds readers they have already been warned clearly.

Nobody reading this letter can claim they never saw it coming.

Warning in advance removes any excuse for being caught off guard.

Knowledge received ahead of time carries real responsibility.

⚠️ Readers were already warned clearly
🙅 Nobody here can claim surprise
🧭 Advance warning removes any excuse
📖 Knowing ahead brings real responsibility

## 🧲 Beware Lest Ye Also Be Led Away With The Error Of The Wicked

"Beware" is a direct command to stay alert, not a gentle suggestion.

"Led away" pictures someone slowly pulled off course, not suddenly knocked down.

Error rarely announces itself.

It usually looks reasonable at first.

Staying firm requires noticing the pull before it succeeds.

🧲 Beware is a direct command
🌊 Led away means pulled off course slowly
🎭 Error usually looks reasonable at first
📖 Staying firm means noticing the pull

## 🏔️ Fall From Your Own Stedfastness

"Stedfastness" is an older spelling of steadfastness, meaning firm, settled footing.

Peter pictures faith like solid ground that can still be lost.

This falling is not a single sudden event most of the time.

It usually happens one small compromise at a time.

🏔️ Stedfastness means firm, settled footing
🪨 Faith is pictured as solid ground
🐾 Falling usually happens slowly, not suddenly
📖 One small compromise at a time

## 🌱 Grow In Grace, And In The Knowledge Of Our Lord And Saviour Jesus Christ

Peter ends the whole letter with a positive command, not just a warning.

"Grow" assumes faith is alive and meant to keep developing.

Growing "in grace" means relying more on God's help, not personal effort.

Growing "in knowledge" means continuing to actually know Christ, not just facts about Him.

🌱 Peter ends with a positive command
📈 Faith is meant to keep growing
🤲 Grace means relying on God's help
📖 Knowledge here means truly knowing Christ

## 🙌 To Him Be Glory Both Now And For Ever. Amen

This is the last line Peter ever wrote in Scripture.

A doxology like this gives God credit before the letter even ends.

"For ever" shows that glory given to God never has an expiration date.

"Amen" means let it be so, a final word of agreement.

🙌 Peter's final written words in Scripture
🎉 A doxology gives God credit first
♾️ For ever means glory without an end
📖 Amen means let it be so
`.trim();

export const SECOND_PETER_THREE_PERSONAL_SECTIONS = parseSecondPeterThreeRawNotes(SECOND_PETER_THREE_RAW_NOTES);
